<script setup lang="ts">
// Events listing page — hero + category filter + upcoming/past grids.
import { pastEvents, upcomingEvents } from '@/utils/events'
import type { EventCategory } from '@/utils/events'

// ── SEO ──────────────────────────────────────────────────────
const { locale } = useI18n()

const seoTitle = computed(() =>
  locale.value === 'it'
    ? 'Eventi — Bar Romagna Cervia | Serate, Musica & Tornei'
    : 'Events — Bar Romagna Cervia | Evenings, Music & Tournaments'
)
const seoDesc = computed(() =>
  locale.value === 'it'
    ? 'Scopri gli eventi del Bar Romagna a Cervia: serate musicali, tornei, feste ed eventi speciali. Resta aggiornato sul prossimo appuntamento.'
    : 'Discover Bar Romagna events in Cervia: live music nights, tournaments and special events. Stay updated on the next event.'
)

useSeoMeta({
  title:              () => seoTitle.value,
  description:        () => seoDesc.value,
  ogTitle:            () => seoTitle.value,
  ogDescription:      () => seoDesc.value,
  ogUrl:              'https://www.barromagna.com/events',
  ogImage:            'https://www.barromagna.com/bar-view.jpg',
  ogImageAlt:         'Bar Romagna Cervia — eventi e serate',
  twitterTitle:       () => seoTitle.value,
  twitterDescription: () => seoDesc.value,
})

useHead({
  link: [{ rel: 'canonical', href: 'https://www.barromagna.com/events' }],
})

const { t } = useI18n()
const analytics = useAnalytics()

type FilterValue = EventCategory | 'all'

const activeFilter = ref<FilterValue>('all')

const setFilter = (value: FilterValue) => {
  activeFilter.value = value
  analytics.trackEventsFilter(value)
}

const filters: { value: FilterValue; labelKey: string }[] = [
  { value: 'all',    labelKey: 'events.filters.all' },
  { value: 'musica', labelKey: 'events.filters.musica' },
  { value: 'torneo', labelKey: 'events.filters.torneo' },
]

const filteredPast = computed(() =>
  activeFilter.value === 'all'
    ? pastEvents
    : pastEvents.filter(e => e.category === activeFilter.value)
)

const filteredUpcoming = computed(() =>
  activeFilter.value === 'all'
    ? upcomingEvents
    : upcomingEvents.filter(e => e.category === activeFilter.value)
)
</script>

<template>
  <div class="page">
    <EventsHero />

    <EventsFilters :filters="filters" :active="activeFilter" @select="setFilter" />

    <!-- Upcoming events (hidden until data exists) -->
    <section v-if="filteredUpcoming.length > 0" class="events-section">
      <h2 class="section-title section-title--upcoming">{{ t('events.sections.upcoming') }}</h2>
      <div class="events-grid">
        <EventsCard v-for="event in filteredUpcoming" :key="event.id" :event="event" />
      </div>
    </section>

    <!-- Past events -->
    <section class="events-section">
      <h2 class="section-title section-title--past">{{ t('events.sections.past') }}</h2>

      <div v-if="filteredPast.length > 0" class="events-grid">
        <EventsCard v-for="event in filteredPast" :key="event.id" :event="event" past />
      </div>

      <div v-else class="empty-state">
        <i class="pi pi-calendar empty-icon" />
        <p class="empty-text">{{ t('events.empty.past') }}</p>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
// h2 — BigChunko from theme.scss. No font-family override.

.page {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.events-section {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.section-title {
  margin: 0;

  &--upcoming { color: var(--p-primary-color); }
  &--past     { color: var(--p-text-muted-color); }
}

.events-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;

  @media (min-width: 640px)  { grid-template-columns: repeat(2, 1fr); }
  @media (min-width: 1024px) { grid-template-columns: repeat(3, 1fr); }
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 3rem 1rem;
  color: var(--p-text-muted-color);
  text-align: center;
}

.empty-icon {
  font-size: 2.5rem;
  opacity: 0.35;
}

.empty-text {
  margin: 0;
  font-size: 0.9375rem;
}
</style>
