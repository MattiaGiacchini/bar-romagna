<script setup lang="ts">
// Next-event banner strip with a mini live countdown. Falls back to a teaser when
// there are no upcoming events.
import type { BarEvent } from '@/utils/events'
import { useCountdown } from '@/composables/useCountdown'

const props = defineProps<{ event: BarEvent | null }>()

const { t } = useI18n()
const analytics = useAnalytics()

const { countdown } = useCountdown(() => props.event?.date ?? null)

const goToEvents = (location: string) => { analytics.trackCta('next_event', location); navigateTo('/events') }

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })
</script>

<template>
  <!-- Has upcoming event -->
  <div v-if="event" class="ev ev5">
    <div class="ev5-strip">
      <div class="ev5-left">
        <span class="ev5-tag">{{ t('home.nextEvent.tag') }}</span>
        <h2 class="ev5-title">{{ event.title }}</h2>
        <p class="ev5-date">{{ formatDate(event.date) }}<span v-if="event.time"> · {{ event.time }}</span></p>
        <p class="ev5-desc">{{ event.description }}</p>
        <div class="ev5-mini-countdown">
          <div class="ev5-mini-unit">
            <span class="ev5-mini-num">{{ String(countdown.days).padStart(2,'0') }}</span>
            <span class="ev5-mini-label">{{ t('home.countdown.days') }}</span>
          </div>
          <span class="ev5-mini-sep">:</span>
          <div class="ev5-mini-unit">
            <span class="ev5-mini-num">{{ String(countdown.hours).padStart(2,'0') }}</span>
            <span class="ev5-mini-label">{{ t('home.countdown.hours') }}</span>
          </div>
          <span class="ev5-mini-sep">:</span>
          <div class="ev5-mini-unit">
            <span class="ev5-mini-num">{{ String(countdown.minutes).padStart(2,'0') }}</span>
            <span class="ev5-mini-label">{{ t('home.countdown.minutes') }}</span>
          </div>
          <span class="ev5-mini-sep">:</span>
          <div class="ev5-mini-unit">
            <span class="ev5-mini-num">{{ String(countdown.seconds).padStart(2,'0') }}</span>
            <span class="ev5-mini-label">{{ t('home.countdown.seconds') }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="ev5-footer">
      <Button :label="t('home.nextEvent.cta')" icon="pi pi-arrow-right" iconPos="right" severity="warn" @click="goToEvents('home_next_event')" />
    </div>
  </div>

  <!-- No upcoming events — teaser -->
  <div v-else class="ev ev5-empty">
    <div class="ev5-empty-inner">
      <div class="ev5-empty-text">
        <span class="ev5-tag">{{ t('home.nextEvent.tag') }}</span>
        <h2 class="ev5-empty-title">{{ t('home.nextEvent.noEventsTitle') }}</h2>
        <p class="ev5-empty-sub">{{ t('home.nextEvent.noEventsSubtitle') }}</p>
      </div>
      <Button :label="t('home.nextEvent.noEventsCta')" icon="pi pi-arrow-right" iconPos="right" severity="warn" @click="goToEvents('home_no_events')" class="ev5-empty-cta" />
    </div>
  </div>
</template>

<style scoped lang="scss">
// h2 — BigChunko from theme.scss. No font-family override.
$r: 16px;

.ev5 {
  background: var(--p-primary-800);
  border-radius: $r;
  padding: 1.75rem 2rem;
  position: relative;

  @media (min-width: 768px) {
    padding-bottom: 4.5rem; // room for absolute-positioned button
  }
}
.ev5-strip { display: flex; flex-wrap: wrap; align-items: flex-start; gap: 1.25rem; }
.ev5-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 1.25rem;

  @media (min-width: 768px) {
    position: absolute;
    bottom: 1.75rem;
    right: 2rem;
    margin-top: 0;
  }
}
.ev5-left { display: flex; flex-direction: column; gap: 0.5rem; flex: 1; min-width: 0; }
.ev5-tag { color: var(--p-orange-400); font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; }
.ev5-title { margin: 0; color: white; font-size: clamp(1.25rem, 3.5vw, 2rem); }
.ev5-date { margin: 0; font-size: 0.9375rem; font-weight: 500; color: rgba(255,255,255,0.9); }
.ev5-desc { margin: 0; font-size: 0.9rem; line-height: 1.55; color: rgba(255,255,255,0.75); max-width: 480px; }

.ev5-empty {
  background: var(--p-primary-800);
  border-radius: $r;
  padding: 2rem;
  position: relative;

  @media (min-width: 640px) {
    padding-bottom: 4.5rem;
  }
}
.ev5-empty-inner {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}
.ev5-empty-text { display: flex; flex-direction: column; gap: 0.5rem; flex: 1; min-width: 0; }
.ev5-empty-cta {
  align-self: flex-start;

  @media (min-width: 640px) {
    position: absolute;
    bottom: 1.75rem;
    right: 2rem;
  }
}
.ev5-empty-title { margin: 0; color: white; font-size: clamp(1.125rem, 3vw, 1.75rem); }
.ev5-empty-sub { margin: 0; font-size: 0.9rem; line-height: 1.55; color: rgba(255,255,255,0.72); max-width: 480px; }

.ev5-mini-countdown {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  margin-top: 0.25rem;
}
.ev5-mini-unit {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.1rem;
}
.ev5-mini-num {
  font-size: 1.125rem;
  font-weight: 900;
  color: white;
  line-height: 1;
  font-variant-numeric: tabular-nums;
  background: rgba(255,255,255,0.12);
  border-radius: 4px;
  padding: 0.15rem 0.375rem;
  min-width: 2.25rem;
  text-align: center;
}
.ev5-mini-label {
  font-size: 0.5625rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(255,255,255,0.5);
}
.ev5-mini-sep {
  font-size: 1rem;
  font-weight: 700;
  color: var(--p-orange-400);
  align-self: flex-start;
  padding-top: 0.15rem;
  line-height: 1.4;
}
</style>
