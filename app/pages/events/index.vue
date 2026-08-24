<script setup lang="ts">
// Events listing page — hero + category filter + upcoming/past grids.
import { pastEvents, upcomingEvents } from '@/utils/events'
import type { EventCategory } from '@/utils/events'
import { SITE_URL } from '@/utils/business'

// ── SEO ──────────────────────────────────────────────────────
const { t } = useI18n()
const analytics = useAnalytics()

useSeoMeta({
  title:              () => t('seo.events.title'),
  description:        () => t('seo.events.description'),
  ogTitle:            () => t('seo.events.title'),
  ogDescription:      () => t('seo.events.description'),
  ogUrl:              `${SITE_URL}/events`,
  ogImage:            `${SITE_URL}/bar-view.jpg`,
  ogImageAlt:         'Bar Romagna Cervia — eventi e serate',
  twitterTitle:       () => t('seo.events.title'),
  twitterDescription: () => t('seo.events.description'),
})

// ItemList schema — helps Google discover all event detail pages from the listing page
const allEvents = [...upcomingEvents, ...pastEvents]
const eventListJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Eventi Bar Romagna Cervia',
  url: `${SITE_URL}/events`,
  numberOfItems: allEvents.length,
  itemListElement: allEvents.map((ev, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: `${SITE_URL}/events/${ev.slug}`,
    name: ev.title,
  })),
}

useHead({
  link: [{ rel: 'canonical', href: `${SITE_URL}/events` }],
  script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(eventListJsonLd) }],
})

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
