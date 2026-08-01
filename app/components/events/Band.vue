<script setup lang="ts">
// "Chi ha suonato / suonerà" — performer feature panel.
import type { BarEvent } from '@/utils/events'

const props = defineProps<{
  band: NonNullable<BarEvent['band']>
  past: boolean
}>()

const { t } = useI18n()
const analytics = useAnalytics()

const trackBandLink = (link: string) =>
  analytics.capture('band_link_click', { band: props.band.name, url: link })
</script>

<template>
  <div class="band">
    <h2 class="band-title">{{ past ? t('events.detail.performerTitlePast') : t('events.detail.performerTitleUpcoming') }}</h2>
    <div class="band-body">
      <img v-if="band.logo" :src="band.logo" :alt="band.name" class="band-logo" />
      <div class="band-info">
        <h3 class="band-name">{{ band.name }}</h3>
        <p v-if="band.tributeOf" class="band-meta">
          {{ t('events.detail.tributeTo') }} <strong>{{ band.tributeOf }}</strong>
        </p>
        <p v-if="band.genre" class="band-meta">{{ band.genre }}</p>
        <div v-if="band.sameAs && band.sameAs.length" class="band-links">
          <a
            v-for="link in band.sameAs"
            :key="link"
            :href="link"
            target="_blank"
            rel="noopener noreferrer"
            class="band-link"
            @click="trackBandLink(link)"
          >
            <i class="pi pi-external-link" /> {{ link.replace(/^https?:\/\/(www\.)?/, '').split('/')[0] }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
// h2 — BigChunko, h3 — Roboto (from theme.scss). No font-family override.
$r:    16px;
$r-sm: 10px;

.band {
  background: var(--p-primary-800);
  border-radius: $r;
  padding: 1.75rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}
.band-title { margin: 0; color: white; }
.band-body {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}
.band-logo {
  width: 72px;
  height: 72px;
  object-fit: contain;
  border-radius: $r-sm;
  background: white;
  padding: 6px;
  flex-shrink: 0;
}
.band-info { display: flex; flex-direction: column; gap: 0.3rem; }
.band-name { margin: 0; font-weight: 700; color: white; font-size: 1.25rem; }
.band-meta {
  margin: 0;
  font-size: 0.9375rem;
  color: rgba(255, 255, 255, 0.78);
  strong { color: var(--p-orange-400); font-weight: 700; }
}
.band-links { display: flex; flex-wrap: wrap; gap: 0.75rem; margin-top: 0.5rem; }
.band-link {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--p-orange-400);
  text-decoration: none;
  &:hover { text-decoration: underline; }
}
</style>
