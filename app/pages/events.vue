<script setup lang="ts">
// Typography: all heading font families are set globally in assets/scss/theme.scss.
// Do not override font-family anywhere in this file's scoped styles.
// h1/h2 → BigChunko  |  h3–h6 → Roboto

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

import { pastEvents, upcomingEvents } from '@/utils/events'
import type { EventCategory } from '@/utils/events'

const { t } = useI18n()

type FilterValue = EventCategory | 'all'

const activeFilter = ref<FilterValue>('all')

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

const categorySeverity: Record<EventCategory, string> = {
  musica: 'warn',
  torneo: 'info',
}

const formatDate = (iso: string): string => {
  const d = new Date(iso)
  return d.toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })
}
</script>

<template>
  <div class="page">

    <!-- ============================================================ -->
    <!-- HERO — MANIFESTO STYLE (same as contacts B)                  -->
    <!-- ============================================================ -->
    <section class="hero-wrap">
      <div class="hero">
        <!-- Left: editorial blue panel -->
        <div class="hero-panel">
          <div class="hero-body">
            <h1 class="hero-title">
              {{ t('events.hero.title').split('\n')[0] }}<br>
              {{ t('events.hero.title').split('\n')[1] }}
            </h1>
            <hr class="hero-rule" />
            <p class="hero-sub">{{ t('events.hero.subtitle') }}</p>
          </div>
        </div>
        <!-- Right: photo -->
        <div class="hero-photo">
          <img src="/bar-view.jpg" alt="Bar Romagna eventi" class="hero-img" />
        </div>
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- FILTER TABS                                                   -->
    <!-- ============================================================ -->
    <section class="filters-wrap">
      <div class="filters-row">
        <button
          v-for="f in filters"
          :key="f.value"
          class="filter-btn"
          :class="{ active: activeFilter === f.value }"
          @click="activeFilter = f.value"
        >
          {{ t(f.labelKey) }}
        </button>
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- UPCOMING EVENTS (hidden until data exists)                   -->
    <!-- ============================================================ -->
    <section v-if="filteredUpcoming.length > 0" class="events-section">
      <h2 class="section-title section-title--upcoming">{{ t('events.sections.upcoming') }}</h2>
      <div class="events-grid">
        <article v-for="event in filteredUpcoming" :key="event.id" class="event-card">
          <div class="card-photo-wrap">
            <img :src="event.image" :alt="event.title" class="card-photo" />
            <span class="card-badge card-badge--cat" :class="`card-cat--${event.category}`">
              {{ t(`events.filters.${event.category}`) }}
            </span>
            <img
              v-if="event.band?.logo"
              :src="event.band.logo"
              :alt="event.band.name"
              class="card-band-logo"
            />
          </div>
          <div class="card-body">
            <h3 class="card-title">{{ event.title }}</h3>
            <p class="card-date">
              <i class="pi pi-calendar card-date-icon" />
              {{ formatDate(event.date) }}
              <span v-if="event.time"> · {{ t('events.card.at') }} {{ event.time }}</span>
            </p>
            <p v-if="event.foodTime" class="card-meta">
              <i class="pi pi-clock card-meta-icon" />
              Cena dalle {{ event.foodTime }}
            </p>
            <p v-if="event.meetupTime" class="card-meta">
              <i class="pi pi-clock card-meta-icon" />
              Ritrovo alle {{ event.meetupTime }}
            </p>
            <div v-if="event.food || event.entryFee || event.prizes" class="card-price-block">
              <div class="card-price-row">
                <span v-if="event.food?.price" class="ps1-pill">{{ event.food.description.split('(')[0].trim() }} · €{{ event.food.price }}</span>
                <span v-else-if="event.food" class="ps1-food-plain">{{ event.food.description }}</span>
                <span v-if="event.entryFee" class="ps1-pill">Iscrizione · €{{ event.entryFee }}</span>
                <span v-if="event.prizes" class="ps1-prizes"><i class="pi pi-trophy" /> {{ event.prizes }}</span>
              </div>
            </div>
            <p class="card-desc">{{ event.description }}</p>
          </div>
        </article>
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- PAST EVENTS                                                   -->
    <!-- ============================================================ -->
    <section class="events-section">
      <h2 class="section-title section-title--past">{{ t('events.sections.past') }}</h2>

      <div v-if="filteredPast.length > 0" class="events-grid">
        <article v-for="event in filteredPast" :key="event.id" class="event-card event-card--past">
          <div class="card-photo-wrap">
            <img :src="event.image" :alt="event.title" class="card-photo card-photo--past" />
            <span class="card-badge card-badge--cat" :class="`card-cat--${event.category}`">
              {{ t(`events.filters.${event.category}`) }}
            </span>
            <img
              v-if="event.band?.logo"
              :src="event.band.logo"
              :alt="event.band.name"
              class="card-band-logo"
            />
          </div>
          <div class="card-body">
            <h3 class="card-title card-title--past">{{ event.title }}</h3>
            <p class="card-date">
              <i class="pi pi-calendar card-date-icon" />
              {{ formatDate(event.date) }}
              <span v-if="event.time"> · {{ t('events.card.at') }} {{ event.time }}</span>
            </p>
            <p v-if="event.foodTime" class="card-meta">
              <i class="pi pi-clock card-meta-icon" />
              Cena dalle {{ event.foodTime }}
            </p>
            <p v-if="event.meetupTime" class="card-meta">
              <i class="pi pi-clock card-meta-icon" />
              Ritrovo alle {{ event.meetupTime }}
            </p>
            <div v-if="event.food || event.entryFee || event.prizes" class="card-price-block">
              <div class="card-price-row">
                <span v-if="event.food?.price" class="ps1-pill">{{ event.food.description.split('(')[0].trim() }} · €{{ event.food.price }}</span>
                <span v-else-if="event.food" class="ps1-food-plain">{{ event.food.description }}</span>
                <span v-if="event.entryFee" class="ps1-pill">Iscrizione · €{{ event.entryFee }}</span>
                <span v-if="event.prizes" class="ps1-prizes"><i class="pi pi-trophy" /> {{ event.prizes }}</span>
              </div>
            </div>
            <p class="card-desc">{{ event.description }}</p>
          </div>
        </article>
      </div>

      <div v-else class="empty-state">
        <i class="pi pi-calendar empty-icon" />
        <p class="empty-text">{{ t('events.empty.past') }}</p>
      </div>
    </section>

  </div>
</template>

<style scoped lang="scss">
// Typography: heading font families set globally in assets/scss/theme.scss.
// h1/h2 → BigChunko  |  h3–h6 → Roboto — do NOT override here.

$r:    16px;
$r-sm: 10px;

// ── Page shell ───────────────────────────────────────────────
.page {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

// ============================================================
// HERO — MANIFESTO (mirrors contacts hero B)
// ============================================================
.hero-wrap { /* gutters from layout .main-content */ }

.hero {
  display: flex;
  flex-direction: column;
  border-radius: $r;
  overflow: hidden;

  @media (min-width: 768px) {
    flex-direction: row;
    height: 520px;
  }
  @media (min-width: 1280px) { height: 580px; }
}

.hero-panel {
  background: var(--p-primary-800);
  color: white;
  width: 100%;
  padding: 1.75rem 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.25rem;
  flex-shrink: 0;

  @media (min-width: 768px) {
    width: 48%;
    padding: 2.5rem;
    gap: 0;
  }
  @media (min-width: 1280px) { padding: 3rem; }
}

.hero-top { display: flex; align-items: center; gap: 0.75rem; }

.hero-eyebrow {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--p-orange-400);
}

.hero-body { display: flex; flex-direction: column; }

.hero-title {
  // h1 — BigChunko from theme.scss, no font-family override
  margin: 0 0 1rem;
  line-height: 1.0;
  font-size: clamp(1.75rem, 5.5vw, 3.5rem);
  color: white;
}

.hero-rule {
  border: none;
  border-top: 3px solid var(--p-orange-500);
  width: 64px;
  margin: 0 0 1.25rem;
}

.hero-sub {
  margin: 0;
  font-size: 0.9375rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.82);
  max-width: 380px;
}

.hero-photo {
  width: 100%;
  height: 240px;
  flex-shrink: 0;

  @media (min-width: 768px) {
    flex: 1;
    height: auto;
  }
}

.hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
}

// ============================================================
// FILTER TABS
// ============================================================
.filters-wrap { /* no extra padding — gap from .page handles spacing */ }

.filters-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  border-bottom: 1px solid var(--p-surface-200);
  padding-bottom: 0;
}

.filter-btn {
  background: transparent;
  border: none;
  border-bottom: 3px solid transparent;
  margin-bottom: -1px; // overlap the filters-row border
  padding: 0.5rem 1rem;
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--p-text-muted-color);
  cursor: pointer;
  transition: color 0.15s ease, border-color 0.15s ease;
  border-radius: 0;
  white-space: nowrap;

  &:hover { color: var(--p-text-color); }

  &.active {
    color: var(--p-primary-color);
    border-bottom-color: var(--p-primary-color);
    font-weight: 700;
  }
}

// ============================================================
// EVENTS SECTIONS
// ============================================================
.events-section {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.section-title {
  // h2 — BigChunko from theme.scss
  margin: 0;

  &--upcoming { color: var(--p-primary-color); }
  &--past     { color: var(--p-text-muted-color); }
}

// ============================================================
// EVENTS GRID
// ============================================================
.events-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;

  @media (min-width: 640px)  { grid-template-columns: repeat(2, 1fr); }
  @media (min-width: 1024px) { grid-template-columns: repeat(3, 1fr); }
}

// ============================================================
// EVENT CARD
// ============================================================
.event-card {
  background: var(--p-surface-0);
  border: 1px solid var(--p-surface-200);
  border-radius: $r;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.2s ease, transform 0.2s ease;

  &:hover {
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }

  &--past {
    opacity: 0.82;
    &:hover { opacity: 1; }
  }
}

.card-photo-wrap {
  position: relative;
  height: 200px;
  overflow: hidden;
  flex-shrink: 0;
}

.card-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.3s ease;

  .event-card:hover & { transform: scale(1.03); }

  &--past {
    filter: grayscale(55%) brightness(0.88);
  }
}

// Badge positioning
.card-badge {
  position: absolute;
  font-size: 0.6875rem;
  font-weight: 700;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  line-height: 1.4;

  &--cat  { top: 0.625rem; left: 0.625rem; }
  &--entry { top: 0.625rem; right: 0.625rem; }
}

// Category colors — brand primary
.card-cat--musica {
  background: var(--p-primary-color);
  color: white;
}
.card-cat--torneo {
  background: var(--p-orange-500);
  color: white;
}

.card-body {
  padding: 1.125rem 1.25rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}

.card-title {
  // h3 — Roboto from theme.scss
  margin: 0;
  font-size: 1.0625rem;
  font-weight: 700;
  color: var(--p-text-color);
  line-height: 1.3;

  &--past { color: var(--p-text-muted-color); }
}

.card-date {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--p-text-muted-color);
  display: flex;
  align-items: center;
  gap: 0.375rem;
  flex-wrap: wrap;
}

.card-date-icon {
  color: var(--p-orange-500);
  font-size: 0.875rem;
  flex-shrink: 0;
}

.card-desc {
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.55;
  color: var(--p-text-muted-color);
}

// Band logo — top-right corner of card photo
.card-band-logo {
  position: absolute;
  top: 0.625rem;
  right: 0.625rem;
  width: 48px;
  height: 48px;
  object-fit: contain;
  border-radius: 8px;
  background: rgba(255,255,255,0.92);
  padding: 4px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}

.card-meta {
  margin: 0;
  font-size: 0.8125rem;
  color: var(--p-text-muted-color);
  display: flex;
  align-items: center;
  gap: 0.375rem;
}

.card-meta-icon {
  color: var(--p-orange-500);
  font-size: 0.8125rem;
  flex-shrink: 0;
}

.card-food {
  margin: 0;
  font-size: 0.8125rem;
  color: var(--p-text-muted-color);
  display: flex;
  align-items: flex-start;
  gap: 0.375rem;
  line-height: 1.45;
}

.card-food-price {
  font-weight: 700;
  color: var(--p-orange-500);
  white-space: nowrap;
}

.card-extras {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.125rem;
}

.card-entry-fee {
  font-size: 0.75rem;
  font-weight: 700;
  color: white;
  background: var(--p-orange-500);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
}

.card-prizes {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--p-orange-500);
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

// ============================================================
// PRICE STYLE SWITCHER (dev only)
// ============================================================
.price-switcher {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 9999;
  background: var(--p-primary-900);
  color: white;
  padding: 0.4rem 0.875rem;
  border-radius: 999px;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.75rem;
  font-weight: 700;
  box-shadow: 0 4px 16px rgba(0,0,0,0.35);

  a {
    color: rgba(255,255,255,0.5);
    text-decoration: none;
    padding: 0.15rem 0.4rem;
    border-radius: 4px;
    transition: background 0.15s;
    &:hover  { background: rgba(255,255,255,0.15); color: white; }
    &.active { background: var(--p-orange-500); color: white; }
  }
}
.price-sw-label { color: rgba(255,255,255,0.4); font-size: 0.65rem; }

// Shared
.card-price-block { display: flex; flex-direction: column; gap: 0.375rem; }
.card-price-row { display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem; }

// Style 1 — filled orange pill for everything
.ps1-pill { background: var(--p-orange-500); color: white; font-size: 0.75rem; font-weight: 700; padding: 0.2rem 0.6rem; border-radius: 4px; }
.ps1-food-plain { font-size: 0.8125rem; color: var(--p-text-muted-color); }
.ps1-prizes { font-size: 0.8125rem; font-weight: 600; color: var(--p-orange-500); display: flex; align-items: center; gap: 0.25rem; }

// Style 2 — outlined pill
.ps2-food { font-size: 0.8125rem; color: var(--p-text-muted-color); flex: 1; min-width: 0; }
.ps2-pill { border: 1.5px solid var(--p-orange-500); color: var(--p-orange-500); font-size: 0.75rem; font-weight: 700; padding: 0.15rem 0.5rem; border-radius: 4px; white-space: nowrap; }
.ps2-prizes { font-size: 0.8125rem; font-weight: 600; color: var(--p-orange-500); display: flex; align-items: center; gap: 0.25rem; }

// Style 3 — plain bold orange
.ps3-food { margin: 0; font-size: 0.8125rem; color: var(--p-text-muted-color); display: flex; align-items: center; gap: 0.375rem; flex-wrap: wrap; }
.ps3-icon { color: var(--p-orange-500); font-size: 0.8125rem; flex-shrink: 0; }
.ps3-price { color: var(--p-orange-500); font-weight: 700; }
.ps3-prizes { margin: 0; font-size: 0.8125rem; font-weight: 600; color: var(--p-orange-500); display: flex; align-items: center; gap: 0.25rem; }

// Style 4 — grey chips
.ps4-food { margin: 0; font-size: 0.8125rem; color: var(--p-text-muted-color); }
.ps4-row { margin-top: 0.125rem; }
.ps4-chip { background: var(--p-surface-100); color: var(--p-text-color); border: 1px solid var(--p-surface-300); font-size: 0.75rem; font-weight: 600; padding: 0.2rem 0.5rem; border-radius: 4px; display: inline-flex; align-items: center; gap: 0.25rem; }
.ps4-chip--gold { background: var(--p-surface-100); color: var(--p-orange-500); border-color: var(--p-orange-200); }

// Style 5 — dedicated price row
.ps5-food { margin: 0; font-size: 0.8125rem; color: var(--p-text-muted-color); display: flex; align-items: center; gap: 0.375rem; }
.ps5-icon { color: var(--p-orange-500); font-size: 0.8125rem; flex-shrink: 0; }
.ps5-price-row { margin: 0; font-size: 1rem; font-weight: 800; color: var(--p-orange-500); display: flex; align-items: center; gap: 0.25rem; }
.ps5-prizes { margin: 0; font-size: 0.8125rem; font-weight: 600; color: var(--p-orange-500); display: flex; align-items: center; gap: 0.25rem; }

// Style 6 — menu style left/right
.ps6-row { display: flex; justify-content: space-between; align-items: baseline; gap: 0.5rem; }
.ps6-name { font-size: 0.8125rem; color: var(--p-text-muted-color); }
.ps6-price { font-size: 0.875rem; font-weight: 700; color: var(--p-orange-500); white-space: nowrap; }
.ps6-prizes { margin: 0; font-size: 0.8125rem; font-weight: 600; color: var(--p-orange-500); display: flex; align-items: center; gap: 0.25rem; }

// Style 7 — blue entry, orange food
.ps7-food { margin: 0; font-size: 0.8125rem; color: var(--p-text-muted-color); }
.ps7-pill { font-size: 0.75rem; font-weight: 700; padding: 0.2rem 0.6rem; border-radius: 4px; }
.ps7-pill--orange { background: var(--p-orange-500); color: white; }
.ps7-pill--blue { background: var(--p-primary-color); color: white; }
.ps7-prizes { font-size: 0.8125rem; font-weight: 600; color: var(--p-orange-500); display: flex; align-items: center; gap: 0.25rem; }

// Style 8 — neutral grey pill
.ps8-food { margin: 0; font-size: 0.8125rem; color: var(--p-text-muted-color); }
.ps8-pill { background: var(--p-surface-200); color: var(--p-text-color); font-size: 0.75rem; font-weight: 700; padding: 0.2rem 0.6rem; border-radius: 4px; }
.ps8-prizes { font-size: 0.8125rem; font-weight: 600; color: var(--p-orange-500); display: flex; align-items: center; gap: 0.25rem; }

// Style 9 — integrated bold text
.ps9-food { margin: 0; font-size: 0.8125rem; color: var(--p-text-muted-color); display: flex; align-items: center; gap: 0.375rem; flex-wrap: wrap; }
.ps9-icon { color: var(--p-orange-500); font-size: 0.8125rem; flex-shrink: 0; }
.ps9-price { color: var(--p-orange-500); }
.ps9-prizes { margin: 0; font-size: 0.8125rem; font-weight: 600; color: var(--p-orange-500); display: flex; align-items: center; gap: 0.25rem; }

// Style 10 — amber left border row
.ps10-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 0.5rem;
  border-left: 3px solid var(--p-orange-500);
  padding-left: 0.625rem;
}
.ps10-name { font-size: 0.8125rem; color: var(--p-text-muted-color); }
.ps10-price { font-size: 0.875rem; font-weight: 700; color: var(--p-orange-500); white-space: nowrap; }
.ps10-prizes { margin: 0; font-size: 0.8125rem; font-weight: 600; color: var(--p-orange-500); display: flex; align-items: center; gap: 0.25rem; padding-left: 0.875rem; }

// ============================================================
// EMPTY STATE
// ============================================================
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
