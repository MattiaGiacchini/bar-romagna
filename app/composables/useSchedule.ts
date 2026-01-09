// composables/useSchedule.ts
// Composable for managing bar schedule logic
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
    const currentTime = ref(new Date())
    let intervalId: number | null = null

    // Update current time every minute
    const updateTime = () => {
        currentTime.value = new Date()
    }

    onMounted(() => {
        intervalId = window.setInterval(updateTime, 60000)
    })

    onUnmounted(() => {
        if (intervalId) {
            clearInterval(intervalId)
        }
    })

    // Parse time "HH:MM" to minutes from midnight
    const parseTimeToMinutes = (time: string): number => {
        const [hours, minutes] = time.split(':').map(Number)
        return hours * 60 + minutes
    }

    // Get schedule for a specific date
    const getScheduleForDate = (date: Date): Schedule => {
        const dayOfWeek = date.getDay() === 0 ? 7 : date.getDay() // Convert Sunday from 0 to 7
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        const year = date.getFullYear()

        // Check if this date is today or in the future
        const dateStart = new Date(date)
        dateStart.setHours(0, 0, 0, 0)
        const todayStart = new Date(currentTime.value)
        todayStart.setHours(0, 0, 0, 0)

        // Only apply special schedules for today or future dates
        if (dateStart >= todayStart) {
            // Check specific date first (YYYY-MM-DD)
            const specificDate = `${year}-${month}-${day}`
            if (schedules.special[specificDate]) {
                return schedules.special[specificDate]
            }

            // Check recurring date (MM-DD)
            const recurringDate = `${month}-${day}`
            if (schedules.special[recurringDate]) {
                return schedules.special[recurringDate]
            }
        }

        // Return weekly schedule for past dates or if no special schedule found
        return schedules.weekly[dayOfWeek]
    }

    // Compute bar status
    const barStatus = computed(() => {
        const now = currentTime.value
        const schedule = getScheduleForDate(now)

        // Check if closed
        if (!schedule.open || !schedule.close) {
            return { status: 'closed', label: 'CHIUSO', severity: 'warn' as const }
        }

        const currentMinutes = now.getHours() * 60 + now.getMinutes()
        const openMinutes = parseTimeToMinutes(schedule.open)
        const closeMinutes = parseTimeToMinutes(schedule.close)

        // Check if open
        const isOpen = currentMinutes >= openMinutes && currentMinutes < closeMinutes

        // Check if opening soon (30 minutes before)
        const opensSoonMinutes = openMinutes - 30
        const opensSoon = currentMinutes >= opensSoonMinutes && currentMinutes < openMinutes

        // Check if closing soon (30 minutes before close)
        const closesSoonMinutes = closeMinutes - 30
        const closesSoon = isOpen && currentMinutes >= closesSoonMinutes

        if (isOpen) {
            if (closesSoon) {
                return { status: 'closingSoon', label: 'CHIUDE TRA POCO', severity: 'warn' as const }
            }
            return { status: 'open', label: 'APERTO ORA', severity: 'primary' as const }
        } else if (opensSoon) {
            return { status: 'openingSoon', label: 'APRE TRA POCO', severity: 'warn' as const }
        } else {
            return { status: 'closed', label: 'CHIUSO', severity: 'warn' as const }
        }
    })

    // Display weekly schedule - show next 7 days in Monday-Sunday order
    const displaySchedule = computed(() => {
        const dayLabels: { [key: number]: string } = {
            1: 'Lunedì',
            2: 'Martedì',
            3: 'Mercoledì',
            4: 'Giovedì',
            5: 'Venerdì',
            6: 'Sabato',
            7: 'Domenica'
        }

        const todayStart = new Date(currentTime.value)
        todayStart.setHours(0, 0, 0, 0)

        // Collect next 7 days from today
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
            const dayName = dayLabels[dayOfWeek]
            const schedule = getScheduleForDate(baseDate)

            // Check for special date
            const month = String(baseDate.getMonth() + 1).padStart(2, '0')
            const day = String(baseDate.getDate()).padStart(2, '0')
            const year = baseDate.getFullYear()
            const specificDate = `${year}-${month}-${day}`
            const recurringDate = `${month}-${day}`
            const special = schedules.special[specificDate] || schedules.special[recurringDate] || null

            const daysDifference = daysFromNow

            nextSevenDays.push({
                date: baseDate,
                dayOfWeek,
                dayName,
                schedule,
                special,
                daysDifference
            })
        }

        // Sort by day of week (Monday=1 to Sunday=7)
        nextSevenDays.sort((a, b) => a.dayOfWeek - b.dayOfWeek)

        // Now build the result with grouping
        const result: Array<{
            days: string
            hours: string
            specialName?: string
        }> = []

        let currentGroup: {
            startDay: string
            endDay: string
            hours: string
        } | null = null

        for (const day of nextSevenDays) {
            // Show special name if it's within 0-6 days from today
            const showSpecialName = day.special && day.daysDifference >= 0 && day.daysDifference <= 6 ? day.special.name : undefined

            if (!day.schedule?.open || !day.schedule?.close) {
                if (currentGroup) {
                    result.push({
                        days: currentGroup.startDay === currentGroup.endDay
                            ? currentGroup.startDay
                            : `${currentGroup.startDay} - ${currentGroup.endDay}`,
                        hours: currentGroup.hours
                    })
                    currentGroup = null
                }
                result.push({
                    days: day.dayName,
                    hours: 'Chiuso',
                    specialName: showSpecialName
                })
                continue
            }

            const hours = `${day.schedule.open} - ${day.schedule.close}`

            if (!currentGroup) {
                currentGroup = {
                    startDay: day.dayName,
                    endDay: day.dayName,
                    hours
                }
                // If this day has special date, don't group it
                if (showSpecialName) {
                    result.push({
                        days: day.dayName,
                        hours,
                        specialName: showSpecialName
                    })
                    currentGroup = null
                }
            } else if (currentGroup.hours === hours && !showSpecialName) {
                // Can only group if current day doesn't have special date
                currentGroup.endDay = day.dayName
            } else {
                result.push({
                    days: currentGroup.startDay === currentGroup.endDay
                        ? currentGroup.startDay
                        : `${currentGroup.startDay} - ${currentGroup.endDay}`,
                    hours: currentGroup.hours
                })
                currentGroup = {
                    startDay: day.dayName,
                    endDay: day.dayName,
                    hours
                }
                // If this day has special date, don't group it
                if (showSpecialName) {
                    result.push({
                        days: day.dayName,
                        hours,
                        specialName: showSpecialName
                    })
                    currentGroup = null
                }
            }
        }

        if (currentGroup) {
            result.push({
                days: currentGroup.startDay === currentGroup.endDay
                    ? currentGroup.startDay
                    : `${currentGroup.startDay} - ${currentGroup.endDay}`,
                hours: currentGroup.hours
            })
        }

        return result
    })

    return {
        currentTime,
        barStatus,
        displaySchedule,
        getScheduleForDate
    }
}