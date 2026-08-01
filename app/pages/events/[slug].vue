<script setup lang="ts">
// Event detail page — orchestrates hero, facts panel, description, band, gallery and related.
import { getEventBySlug, getRelatedEvents, isPastEvent } from '@/utils/events'
import { buildEventJsonLd, buildEventBreadcrumbJsonLd } from '@/utils/eventSchema'
import { SITE_URL } from '@/utils/business'

const { t } = useI18n()
const route = useRoute()

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

const analytics = useAnalytics()
// Track a rich "event_view" once the event is resolved (client-side).
onMounted(() => analytics.trackEventView(ev.value, past.value))
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

    <EventsDetailHero :event="ev" :past="past" />

    <!-- Facts panel + description -->
    <section class="content-grid">
      <EventsFactsPanel :event="ev" />

      <div class="content-main">
        <div class="prose">
          <p class="lead">{{ ev.description }}</p>
        </div>

        <div v-if="ev.recap" class="recap-block">
          <h2 class="recap-title">{{ t('events.detail.recapTitle') }}</h2>
          <p class="recap">{{ ev.recap }}</p>
        </div>

        <EventsBand v-if="ev.band" :band="ev.band" :past="past" />
      </div>
    </section>

    <!-- Gallery (renders nothing when there's no media) -->
    <EventGallery :media="ev.gallery ?? []" :title="t('events.detail.galleryTitle')" />

    <EventsRelated :related="related" />

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
// h2 — BigChunko from theme.scss. No font-family override.
$r: 16px;

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

// ── Back ─────────────────────────────────────────────────────
.back-wrap { display: flex; }
</style>
