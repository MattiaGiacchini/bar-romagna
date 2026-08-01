<script setup lang="ts">
// Typography: heading font families are set globally in assets/scss/theme.scss.
// h1/h2 → BigChunko  |  h3–h6 → Roboto — do NOT override font-family here.

import { getEventBySlug, getRelatedEvents, isPastEvent } from '@/utils/events'
import { buildEventJsonLd, buildEventBreadcrumbJsonLd } from '@/utils/eventSchema'
import { business, SITE_URL } from '@/utils/business'
import { useCountdown } from '@/composables/useCountdown'

const { t } = useI18n()
const route = useRoute()
const analytics = useAnalytics()

const slug = computed(() => String(route.params.slug))
const event = computed(() => getEventBySlug(slug.value))

// Unknown slug → 404
if (!event.value) {
  throw createError({ statusCode: 404, statusMessage: 'Evento non trovato', fatal: true })
}

// Non-null helper (guarded above)
const ev = computed(() => event.value!)
const past = computed(() => isPastEvent(ev.value))
const related = computed(() => getRelatedEvents(ev.value))

const heroImage = computed(() => ev.value.poster ?? ev.value.image)
const year = computed(() => new Date(ev.value.date).getFullYear())
const canonicalUrl = computed(() => `${SITE_URL}/events/${ev.value.slug}`)

// Countdown for upcoming events (mirrors the homepage next-event countdown)
const eventTarget = computed(() => `${ev.value.date}T${ev.value.time || '00:00'}:00`)
const { countdown } = useCountdown(eventTarget)

const formatDate = (iso: string): string =>
  new Date(iso).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })

// ── SEO ──────────────────────────────────────────────────────
const seoTitle = computed(() => `${ev.value.title} — Bar Romagna, Castiglione di Cervia (${year.value})`)
const seoDesc = computed(() => ev.value.description)
const seoImage = computed(() =>
  heroImage.value.startsWith('http') ? heroImage.value : `${SITE_URL}${heroImage.value}`,
)

useSeoMeta({
  title:              () => seoTitle.value,
  description:        () => seoDesc.value,
  ogType:             'article',
  ogTitle:            () => seoTitle.value,
  ogDescription:      () => seoDesc.value,
  ogUrl:              () => canonicalUrl.value,
  ogImage:            () => seoImage.value,
  ogImageAlt:         () => `${ev.value.title} — Bar Romagna, Castiglione di Cervia`,
  twitterTitle:       () => seoTitle.value,
  twitterDescription: () => seoDesc.value,
  twitterImage:       () => seoImage.value,
})

useHead(() => ({
  link: [{ rel: 'canonical', href: canonicalUrl.value }],
  script: [
    { type: 'application/ld+json', innerHTML: JSON.stringify(buildEventJsonLd(ev.value)) },
    { type: 'application/ld+json', innerHTML: JSON.stringify(buildEventBreadcrumbJsonLd(ev.value)) },
  ],
}))

const openMaps = () => {
  analytics.trackDirections('event_detail')
  window.open(business.hasMap, '_blank')
}

// Track a rich "event_view" once the event is resolved (client-side).
onMounted(() => analytics.trackEventView(ev.value, past.value))

const trackBandLink = (link: string) =>
  analytics.capture('band_link_click', { band: ev.value.band?.name, url: link })
</script>

<template>
  <div class="page">

    <!-- Breadcrumb -->
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <NuxtLink to="/" class="breadcrumb-link">{{ t('nav.home') }}</NuxtLink>
      <i class="pi pi-angle-right breadcrumb-sep" />
      <NuxtLink to="/events" class="breadcrumb-link">{{ t('nav.events') }}</NuxtLink>
      <i class="pi pi-angle-right breadcrumb-sep" />
      <span class="breadcrumb-current">{{ ev.title }}</span>
    </nav>

    <!-- ============================================================ -->
    <!-- HERO                                                         -->
    <!-- ============================================================ -->
    <section class="hero-wrap">
      <div class="hero">
        <img :src="heroImage" :alt="`${ev.title} — Bar Romagna, Castiglione di Cervia`" class="hero-img" />
        <div class="hero-overlay" />
        <div class="hero-top">
          <Tag :value="t(`events.filters.${ev.category}`)" :severity="ev.category === 'musica' ? 'primary' : 'warn'" />
          <Tag
            :value="past ? t('events.detail.pastBadge') : t('events.detail.upcomingBadge')"
            :severity="past ? 'contrast' : 'success'"
          />
        </div>
        <div class="hero-card">
          <h1 class="hero-title">{{ ev.title }}</h1>
          <p class="hero-date">
            <i class="pi pi-calendar" />
            {{ formatDate(ev.date) }}
            <span v-if="ev.time"> · {{ t('events.card.at') }} {{ ev.time }}</span>
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

    <!-- ============================================================ -->
    <!-- MAIN GRID: details panel + description                       -->
    <!-- ============================================================ -->
    <section class="content-grid">

      <!-- Facts panel -->
      <aside class="facts-panel">
        <h2 class="facts-title">{{ t('events.detail.infoTitle') }}</h2>
        <dl class="facts-list">
          <div class="facts-row">
            <dt>{{ t('events.detail.dateLabel') }}</dt>
            <dd>{{ formatDate(ev.date) }}</dd>
          </div>
          <div v-if="ev.time" class="facts-row">
            <dt>{{ t('events.detail.timeLabel') }}</dt>
            <dd>{{ ev.time }}<span v-if="ev.endTime"> – {{ ev.endTime }}</span></dd>
          </div>
          <div v-if="ev.foodTime" class="facts-row">
            <dt>{{ t('events.detail.foodLabel') }}</dt>
            <dd>{{ ev.foodTime }}</dd>
          </div>
          <div v-if="ev.meetupTime" class="facts-row">
            <dt>{{ t('events.detail.meetupLabel') }}</dt>
            <dd>{{ ev.meetupTime }}</dd>
          </div>
          <div class="facts-row">
            <dt>{{ t('events.detail.entryLabel') }}</dt>
            <dd>
              <span v-if="ev.freeEntry" class="facts-free">{{ t('events.detail.freeEntry') }}</span>
              <span v-else-if="ev.entryFee">€{{ ev.entryFee }}</span>
              <span v-else>—</span>
            </dd>
          </div>
          <div v-if="ev.food" class="facts-row">
            <dt>{{ t('events.detail.foodMenuLabel') }}</dt>
            <dd>{{ ev.food.description }}<span v-if="ev.food.price"> · €{{ ev.food.price }}</span></dd>
          </div>
          <div v-if="ev.prizes" class="facts-row">
            <dt>{{ t('events.detail.prizesLabel') }}</dt>
            <dd>{{ ev.prizes }}</dd>
          </div>
          <div v-if="ev.band" class="facts-row">
            <dt>{{ t('events.detail.bandLabel') }}</dt>
            <dd>{{ ev.band.name }}</dd>
          </div>
        </dl>

        <div class="facts-actions">
          <Button
            :label="t('contacts.actions.directions')"
            icon="pi pi-map-marker"
            severity="warn"
            @click="openMaps"
          />
        </div>
      </aside>

      <!-- Description + recap + band -->
      <div class="content-main">
        <div class="prose">
          <p class="lead">{{ ev.description }}</p>
        </div>

        <div v-if="ev.recap" class="recap-block">
          <h2 class="recap-title">{{ t('events.detail.recapTitle') }}</h2>
          <p class="recap">{{ ev.recap }}</p>
        </div>

        <!-- Chi ha suonato -->
        <div v-if="ev.band" class="band">
          <h2 class="band-title">{{ past ? t('events.detail.performerTitlePast') : t('events.detail.performerTitleUpcoming') }}</h2>
          <div class="band-body">
            <img v-if="ev.band.logo" :src="ev.band.logo" :alt="ev.band.name" class="band-logo" />
            <div class="band-info">
              <h3 class="band-name">{{ ev.band.name }}</h3>
              <p v-if="ev.band.tributeOf" class="band-meta">
                {{ t('events.detail.tributeTo') }} <strong>{{ ev.band.tributeOf }}</strong>
              </p>
              <p v-if="ev.band.genre" class="band-meta">{{ ev.band.genre }}</p>
              <div v-if="ev.band.sameAs && ev.band.sameAs.length" class="band-links">
                <a
                  v-for="link in ev.band.sameAs"
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
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- GALLERY (only if media exists)                               -->
    <!-- ============================================================ -->
    <EventGallery :media="ev.gallery ?? []" :title="t('events.detail.galleryTitle')" />

    <!-- ============================================================ -->
    <!-- RELATED EVENTS                                                -->
    <!-- ============================================================ -->
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

    <!-- Back link -->
    <div class="back-wrap">
      <Button
        :label="t('events.detail.back')"
        icon="pi pi-arrow-left"
        text
        @click="navigateTo('/events')"
      />
    </div>

  </div>
</template>

<style scoped lang="scss">
// Typography: h1/h2 → BigChunko, h3–h6 → Roboto (from theme.scss). No font-family overrides.
$r:    16px;
$r-sm: 10px;

.page {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

// ── Breadcrumb ───────────────────────────────────────────────
.breadcrumb {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-size: 0.8125rem;
  color: var(--p-text-muted-color);
}
.breadcrumb-link {
  color: var(--p-primary-color);
  text-decoration: none;
  &:hover { text-decoration: underline; }
}
.breadcrumb-sep { font-size: 0.6875rem; opacity: 0.6; }
.breadcrumb-current {
  color: var(--p-text-muted-color);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 60vw;
}

// ── Hero ─────────────────────────────────────────────────────
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

// ── Content grid ─────────────────────────────────────────────
.content-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  align-items: start;

  @media (min-width: 1024px) {
    grid-template-columns: 400px 1fr;
    gap: 2.5rem;
  }
  @media (min-width: 1280px) {
    grid-template-columns: 440px 1fr;
    gap: 3rem;
  }
}

// Facts panel
.facts-panel {
  background: var(--p-surface-0);
  border: 1px solid var(--p-surface-200);
  border-radius: $r;
  padding: 1.5rem;
  box-shadow: 0 2px 12px rgba(0,0,0,0.05);

  @media (min-width: 1024px) {
    position: sticky;
    top: 86px;
    padding: 2rem;
  }
}
.facts-title {
  margin: 0 0 1rem;
  color: var(--p-primary-color);
}
.facts-list { margin: 0; display: flex; flex-direction: column; }
.facts-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1.5rem;
  padding: 0.8125rem 0;
  border-bottom: 1px dotted var(--p-surface-300);
  &:last-child { border-bottom: none; }

  dt {
    font-size: 0.6875rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: var(--p-orange-500);
    flex-shrink: 0;
  }
  dd {
    margin: 0;
    font-size: 0.9375rem;
    color: var(--p-text-color);
    text-align: right;
  }
}
.facts-free { color: var(--p-primary-color); font-weight: 700; }
.facts-actions { margin-top: 1.25rem; display: flex; }
.facts-actions :deep(.p-button) { width: 100%; }

// Main content
.content-main {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.prose { display: flex; flex-direction: column; gap: 1rem; }
.lead {
  margin: 0;
  font-size: 1rem;
  line-height: 1.7;
  color: var(--p-text-color);
}

// Recap ("Com'è andata")
.recap-block {
  background: var(--p-surface-500);
  border-radius: $r;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.recap-title {
  margin: 0;
  color: var(--p-primary-color);
}
.recap {
  margin: 0;
  font-size: 1rem;
  line-height: 1.7;
  color: var(--p-text-color);
}

// Band — deep blue feature panel with the title inside (mirrors the recap block)
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

// ── Related ──────────────────────────────────────────────────
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

// ── Back ─────────────────────────────────────────────────────
.back-wrap { display: flex; }
</style>
