<script setup lang="ts">
// Related events grid shown at the bottom of an event detail page.
import type { BarEvent } from '@/utils/events'

defineProps<{ related: BarEvent[] }>()

const { t } = useI18n()
const analytics = useAnalytics()

const formatDate = (iso: string): string =>
  new Date(iso).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })
</script>

<template>
  <section v-if="related.length" class="related">
    <h2 class="related-title">{{ t('events.detail.relatedTitle') }}</h2>
    <div class="related-grid">
      <NuxtLink
        v-for="r in related"
        :key="r.id"
        :to="`/events/${r.slug}`"
        class="related-card"
        @click="analytics.trackEventCardClick(r, 'related')"
      >
        <div class="related-photo-wrap">
          <img :src="r.image" :alt="r.title" class="related-photo" />
          <span class="related-badge" :class="`card-cat--${r.category}`">
            {{ t(`events.filters.${r.category}`) }}
          </span>
        </div>
        <div class="related-body">
          <h3 class="related-name">{{ r.title }}</h3>
          <p class="related-date">{{ formatDate(r.date) }}</p>
        </div>
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped lang="scss">
// h2 — BigChunko, h3 — Roboto (from theme.scss). No font-family override.
$r: 16px;

.related { display: flex; flex-direction: column; gap: 1.25rem; }
.related-title { margin: 0; color: var(--p-text-muted-color); }
.related-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  @media (min-width: 640px)  { grid-template-columns: repeat(2, 1fr); }
  @media (min-width: 1024px) { grid-template-columns: repeat(3, 1fr); }
}
.related-card {
  background: var(--p-surface-0);
  border: 1px solid var(--p-surface-200);
  border-radius: $r;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
  &:hover { box-shadow: 0 6px 24px rgba(0,0,0,0.1); transform: translateY(-2px); }
}
.related-photo-wrap { position: relative; height: 140px; overflow: hidden; }
.related-photo { width: 100%; height: 100%; object-fit: cover; }
.related-badge {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  font-size: 0.6875rem;
  font-weight: 700;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  color: white;
}
.card-cat--musica { background: var(--p-primary-color); }
.card-cat--torneo { background: var(--p-orange-500); }
.related-body { padding: 0.875rem 1rem 1rem; display: flex; flex-direction: column; gap: 0.25rem; }
.related-name { margin: 0; font-size: 1rem; font-weight: 700; color: var(--p-text-color); line-height: 1.3; }
.related-date { margin: 0; font-size: 0.8125rem; color: var(--p-text-muted-color); }
</style>
