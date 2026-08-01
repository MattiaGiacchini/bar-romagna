// composables/useCountdown.ts
// Live countdown to a target date. Client-only ticking (SSR renders the initial value),
// so it can be reused by the homepage and the event detail pages.

import { ref, computed, toValue, onMounted, onUnmounted, watch, type MaybeRefOrGetter } from 'vue'

export interface CountdownParts {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const ZERO: CountdownParts = { days: 0, hours: 0, minutes: 0, seconds: 0 }

export const useCountdown = (target: MaybeRefOrGetter<string | Date | null | undefined>) => {
  const countdown = ref<CountdownParts>({ ...ZERO })
  const isFinished = ref(false)
  let intervalId: ReturnType<typeof setInterval> | null = null

  const targetTime = computed(() => {
    const value = toValue(target)
    if (!value) return null
    const time = new Date(value).getTime()
    return Number.isNaN(time) ? null : time
  })

  const tick = () => {
    if (targetTime.value === null) {
      countdown.value = { ...ZERO }
      isFinished.value = false
      return
    }
    const diff = targetTime.value - Date.now()
    if (diff <= 0) {
      countdown.value = { ...ZERO }
      isFinished.value = true
      return
    }
    isFinished.value = false
    countdown.value = {
      days:    Math.floor(diff / 86_400_000),
      hours:   Math.floor((diff % 86_400_000) / 3_600_000),
      minutes: Math.floor((diff % 3_600_000) / 60_000),
      seconds: Math.floor((diff % 60_000) / 1_000),
    }
  }

  onMounted(() => {
    tick()
    intervalId = setInterval(tick, 1000)
  })

  onUnmounted(() => {
    if (intervalId) clearInterval(intervalId)
  })

  watch(targetTime, tick)

  return { countdown, isFinished }
}
