<script setup lang="ts">
// Event detail hero: poster/photo, category + status tags, title, date and (upcoming) countdown.
import type { BarEvent } from '@/utils/events'
import { useCountdown } from '@/composables/useCountdown'

const props = defineProps<{
  event: BarEvent
  past: boolean
}>()

const { t } = useI18n()

const heroImage = computed(() => props.event.poster ?? props.event.image)
const eventTarget = computed(() => `${props.event.date}T${props.event.time || '00:00'}:00`)
const { countdown } = useCountdown(eventTarget)

const formatDate = (iso: string): string =>
  new Date(iso).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })
</script>

<template>
  <section class="hero-wrap">
    <div class="hero">
      <img :src="heroImage" :alt="`${event.title} — Bar Romagna, Castiglione di Cervia`" class="hero-img" />
      <div class="hero-overlay" />
      <div class="hero-top">
        <Tag :value="t(`events.filters.${event.category}`)" :severity="event.category === 'musica' ? 'primary' : 'warn'" />
        <Tag
          :value="past ? t('events.detail.pastBadge') : t('events.detail.upcomingBadge')"
          :severity="past ? 'contrast' : 'success'"
        />
      </div>
      <div class="hero-card">
        <h1 class="hero-title">{{ event.title }}</h1>
        <p class="hero-date">
          <i class="pi pi-calendar" />
          {{ formatDate(event.date) }}
          <span v-if="event.time"> · {{ t('events.card.at') }} {{ event.time }}</span>
        </p>
        <div v-if="!past" class="hero-countdown">
          <div class="cd-unit">
            <span class="cd-num">{{ String(countdown.days).padStart(2, '0') }}</span>
            <span class="cd-label">{{ t('home.countdown.days') }}</span>
          </div>
          <span class="cd-sep">:</span>
          <div class="cd-unit">
            <span class="cd-num">{{ String(countdown.hours).padStart(2, '0') }}</span>
            <span class="cd-label">{{ t('home.countdown.hours') }}</span>
          </div>
          <span class="cd-sep">:</span>
          <div class="cd-unit">
            <span class="cd-num">{{ String(countdown.minutes).padStart(2, '0') }}</span>
            <span class="cd-label">{{ t('home.countdown.minutes') }}</span>
          </div>
          <span class="cd-sep">:</span>
          <div class="cd-unit">
            <span class="cd-num">{{ String(countdown.seconds).padStart(2, '0') }}</span>
            <span class="cd-label">{{ t('home.countdown.seconds') }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
// h1 — BigChunko from theme.scss. No font-family override.
$r: 16px;

.hero {
  position: relative;
  border-radius: $r;
  overflow: hidden;
  height: 60svh;
  min-height: 360px;
  max-height: 560px;
}
.hero-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 30%;
}
.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.7) 100%);
}
.hero-top {
  position: absolute;
  top: 1.25rem;
  left: 1.25rem;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  @media (min-width: 768px) { top: 1.75rem; left: 2rem; }
}
.hero-card {
  position: absolute;
  bottom: 1.5rem;
  left: 1.25rem;
  right: 1.25rem;
  @media (min-width: 768px) { bottom: 2rem; left: 2rem; right: 2rem; }
}
.hero-title {
  margin: 0 0 0.5rem;
  color: white;
  line-height: 1.02;
  font-size: clamp(1.75rem, 6vw, 3.25rem);
  text-shadow: 0 2px 16px rgba(0,0,0,0.4);
}
.hero-date {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  color: rgba(255,255,255,0.92);
  font-size: 0.9375rem;
  font-weight: 500;
  i { color: var(--p-orange-400); }
}
.hero-countdown {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  margin-top: 1rem;
}
.cd-unit {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
}
.cd-num {
  font-size: 1.375rem;
  font-weight: 900;
  color: white;
  line-height: 1;
  font-variant-numeric: tabular-nums;
  background: rgba(255,255,255,0.15);
  border-radius: 6px;
  padding: 0.35rem 0.5rem;
  min-width: 2.75rem;
  text-align: center;
}
.cd-label {
  font-size: 0.625rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(255,255,255,0.7);
}
.cd-sep {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--p-orange-400);
  padding-top: 0.35rem;
}
</style>
