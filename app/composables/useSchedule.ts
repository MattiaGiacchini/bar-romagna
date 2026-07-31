// composables/useSchedule.ts
// Composable for managing bar schedule logic — i18n aware

import { ref, computed, onMounted, onUnmounted } from 'vue'

export interface Schedule {
  open: string | null
  close: string | null
  name?: string
}

export interface WeeklySchedule {
  [key: number]: Schedule
}

export interface SpecialSchedules {
  [key: string]: Schedule
}

export const useSchedule = (schedules: { weekly: WeeklySchedule; special: SpecialSchedules }) => {
  const { t } = useI18n()
  const currentTime = ref(new Date())
  let intervalId: number | null = null

  const updateTime = () => { currentTime.value = new Date() }

  onMounted(() => { intervalId = window.setInterval(updateTime, 60000) })
  onUnmounted(() => { if (intervalId) clearInterval(intervalId) })

  const parseTimeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number)
    return hours * 60 + minutes
  }

  // Returns true when a date falls in summer season (June 1 – September 30)
  const isSummer = (date: Date): boolean => {
    const m = date.getMonth() + 1 // 1-based
    return m >= 6 && m <= 9
  }

  // Summer closing time override for Mon–Sat (Sunday stays 12:00)
  const SUMMER_CLOSE = '20:00'

  const getScheduleForDate = (date: Date): Schedule => {
    const dayOfWeek = date.getDay() === 0 ? 7 : date.getDay()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const year = date.getFullYear()

    const dateStart = new Date(date)
    dateStart.setHours(0, 0, 0, 0)
    const todayStart = new Date(currentTime.value)
    todayStart.setHours(0, 0, 0, 0)

    if (dateStart >= todayStart) {
      const specificDate = `${year}-${month}-${day}`
      if (schedules.special[specificDate]) return schedules.special[specificDate]

      const recurringDate = `${month}-${day}`
      if (schedules.special[recurringDate]) return schedules.special[recurringDate]
    }

    const base = schedules.weekly[dayOfWeek]

    // Apply summer hours: Mon–Sat (1–6) close at 21:00 instead of the default
    if (isSummer(date) && dayOfWeek >= 1 && dayOfWeek <= 6 && base.open) {
      return { ...base, close: SUMMER_CLOSE }
    }

    return base
  }

  // Map day-of-week number to i18n key
  const dayKeyMap: { [key: number]: string } = {
    1: 'schedule.days.monday',
    2: 'schedule.days.tuesday',
    3: 'schedule.days.wednesday',
    4: 'schedule.days.thursday',
    5: 'schedule.days.friday',
    6: 'schedule.days.saturday',
    7: 'schedule.days.sunday',
  }

  const barStatus = computed(() => {
    const now = currentTime.value
    const schedule = getScheduleForDate(now)

    if (!schedule.open || !schedule.close) {
      return { status: 'closed', label: t('status.closed'), severity: 'warn' as const }
    }

    const currentMinutes = now.getHours() * 60 + now.getMinutes()
    const openMinutes = parseTimeToMinutes(schedule.open)
    const closeMinutes = parseTimeToMinutes(schedule.close)
    const isOpen = currentMinutes >= openMinutes && currentMinutes < closeMinutes
    const opensSoon = currentMinutes >= openMinutes - 30 && currentMinutes < openMinutes
    const closesSoon = isOpen && currentMinutes >= closeMinutes - 30

    if (isOpen) {
      if (closesSoon) return { status: 'closingSoon', label: t('status.closingSoon'), severity: 'warn' as const }
      return { status: 'open', label: t('status.open'), severity: 'primary' as const }
    } else if (opensSoon) {
      return { status: 'openingSoon', label: t('status.openingSoon'), severity: 'warn' as const }
    } else {
      return { status: 'closed', label: t('status.closed'), severity: 'warn' as const }
    }
  })

  const displaySchedule = computed(() => {
    const todayStart = new Date(currentTime.value)
    todayStart.setHours(0, 0, 0, 0)

    const nextSevenDays: Array<{
      date: Date
      dayOfWeek: number
      dayName: string
      schedule: Schedule
      special: Schedule | null
      daysDifference: number
    }> = []

    for (let daysFromNow = 0; daysFromNow < 7; daysFromNow++) {
      const baseDate = new Date(todayStart)
      baseDate.setDate(baseDate.getDate() + daysFromNow)

      const dayOfWeek = baseDate.getDay() === 0 ? 7 : baseDate.getDay()
      const dayName = t(dayKeyMap[dayOfWeek])
      const schedule = getScheduleForDate(baseDate)

      const month = String(baseDate.getMonth() + 1).padStart(2, '0')
      const day = String(baseDate.getDate()).padStart(2, '0')
      const year = baseDate.getFullYear()
      const specificDate = `${year}-${month}-${day}`
      const recurringDate = `${month}-${day}`
      const special = schedules.special[specificDate] || schedules.special[recurringDate] || null

      nextSevenDays.push({ date: baseDate, dayOfWeek, dayName, schedule, special, daysDifference: daysFromNow })
    }

    nextSevenDays.sort((a, b) => a.dayOfWeek - b.dayOfWeek)

    const result: Array<{ days: string; hours: string; specialName?: string }> = []
    let currentGroup: { startDay: string; endDay: string; hours: string } | null = null

    for (const day of nextSevenDays) {
      const showSpecialName = day.special && day.daysDifference >= 0 && day.daysDifference <= 6 ? day.special.name : undefined

      if (!day.schedule?.open || !day.schedule?.close) {
        if (currentGroup) {
          result.push({
            days: currentGroup.startDay === currentGroup.endDay
              ? currentGroup.startDay
              : `${currentGroup.startDay} - ${currentGroup.endDay}`,
            hours: currentGroup.hours,
          })
          currentGroup = null
        }
        result.push({ days: day.dayName, hours: t('schedule.closed'), specialName: showSpecialName })
        continue
      }

      const hours = `${day.schedule.open} - ${day.schedule.close}`

      if (!currentGroup) {
        if (showSpecialName) {
          result.push({ days: day.dayName, hours, specialName: showSpecialName })
        } else {
          currentGroup = { startDay: day.dayName, endDay: day.dayName, hours }
        }
      } else if (currentGroup.hours === hours && !showSpecialName) {
        currentGroup.endDay = day.dayName
      } else {
        result.push({
          days: currentGroup.startDay === currentGroup.endDay
            ? currentGroup.startDay
            : `${currentGroup.startDay} - ${currentGroup.endDay}`,
          hours: currentGroup.hours,
        })
        if (showSpecialName) {
          result.push({ days: day.dayName, hours, specialName: showSpecialName })
          currentGroup = null
        } else {
          currentGroup = { startDay: day.dayName, endDay: day.dayName, hours }
        }
      }
    }

    if (currentGroup) {
      result.push({
        days: currentGroup.startDay === currentGroup.endDay
          ? currentGroup.startDay
          : `${currentGroup.startDay} - ${currentGroup.endDay}`,
        hours: currentGroup.hours,
      })
    }

    return result
  })

  return { currentTime, barStatus, displaySchedule, getScheduleForDate }
}
