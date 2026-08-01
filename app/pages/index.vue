<script setup lang="ts">
// Home page — orchestrates section components. Layout/markup lives in components/home/*.
import { useSchedule } from '@/composables/useSchedule'
import { barSchedules } from '@/utils/schedule'
import { upcomingEvents, type MediaItem } from '@/utils/events'
import { buildLocalBusinessJsonLd } from '@/utils/business'

// ── SEO ──────────────────────────────────────────────────────
const { locale, t } = useI18n()

const seoTitle = computed(() =>
  locale.value === 'it'
    ? 'Bar Romagna Cervia — Caffè, Aperitivo & Serate dal 2007'
    : 'Bar Romagna Cervia — Coffee, Aperitivo & Evenings since 2007'
)
const seoDesc = computed(() =>
  locale.value === 'it'
    ? 'Bar Romagna è il bar storico di Cervia dal 2007. Colazione con cappuccino e cornetto, aperitivo con Spritz e Negroni, serate tra amici. Gestito da Nadia e Mattia. Via Salara Statale 35/M.'
    : "Bar Romagna is Cervia's historic bar since 2007. Breakfast, aperitivo and evenings with friends. Run by Nadia and Mattia. Via Salara Statale 35/M, Cervia."
)

useSeoMeta({
  title:              () => seoTitle.value,
  description:        () => seoDesc.value,
  ogTitle:            () => seoTitle.value,
  ogDescription:      () => seoDesc.value,
  ogUrl:              'https://www.barromagna.com',
  ogImage:            'https://www.barromagna.com/bar-view.jpg',
  ogImageAlt:         'Bar Romagna Cervia — vista del bancone',
  twitterTitle:       () => seoTitle.value,
  twitterDescription: () => seoDesc.value,
})

useHead({
  link: [{ rel: 'canonical', href: 'https://www.barromagna.com' }],
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify(buildLocalBusinessJsonLd()),
  }],
})

// ── Schedule / status band ───────────────────────────────────
const { barStatus, displaySchedule } = useSchedule(barSchedules)

const todaySchedule = computed(() => displaySchedule.value[0] ?? null)
const isOpen = computed(() =>
  barStatus.value.status === 'open' || barStatus.value.status === 'closingSoon'
)
const statusText = computed(() => {
  const hours = todaySchedule.value?.hours ?? ''
  const [open, close] = hours.split(' - ')
  if (isOpen.value) return close ? `${t('home.status.openUntil')} ${close}` : barStatus.value.label
  return open ? `${t('home.status.closedUntil')} ${open}` : barStatus.value.label
})

// ── Next event ───────────────────────────────────────────────
const nextEvent = computed(() => upcomingEvents[0] ?? null)

// ── Gallery photos — shuffled on each page load ──────────────
const galleryPhotos = ref([
  { src: '/food-photos/cappucchino-with-croissants.JPG',   alt: 'Cappuccino con croissant — Bar Romagna Cervia' },
  { src: '/food-photos/cappucchino-with-croissants-2.JPG', alt: 'Cappuccino e cornetti — Bar Romagna Cervia' },
  { src: '/food-photos/cappuccino-with-bombolone.JPG',     alt: 'Cappuccino con bombolone — Bar Romagna Cervia' },
  { src: '/food-photos/coffee-heart.JPG',                  alt: 'Caffè latte art — Bar Romagna Cervia' },
  { src: '/food-photos/coffee.JPG',                        alt: 'Caffè espresso — Bar Romagna Cervia' },
  { src: '/food-photos/couple-breakfast.JPG',              alt: 'Colazione per due — Bar Romagna Cervia' },
  { src: '/food-photos/croissants-plate.JPG',              alt: 'Piatto di cornetti — Bar Romagna Cervia' },
  { src: '/food-photos/sandwiches.JPG',                    alt: 'Panini Bar Romagna Cervia' },
  { src: '/food-photos/sandwiches-2.JPG',                  alt: 'Selezione panini — Bar Romagna Cervia' },
  { src: '/food-photos/vitrina.JPG',                       alt: 'Vetrina Bar Romagna Cervia' },
])

onMounted(() => {
  galleryPhotos.value = [...galleryPhotos.value].sort(() => Math.random() - 0.5)
})

// Map to the MediaItem shape expected by EventGallery (adds the lightbox).
const galleryMedia = computed<MediaItem[]>(() =>
  galleryPhotos.value.map(p => ({ type: 'image', src: p.src, alt: p.alt }))
)
</script>

<template>
  <div class="page">
    <HomeHero :status="barStatus" />

    <HomeStatusBand :status="barStatus" :status-text="statusText" :hours="todaySchedule?.hours ?? '—'" />

    <CommonRevealOnScroll><HomeMoments /></CommonRevealOnScroll>

    <CommonRevealOnScroll><HomeAbout /></CommonRevealOnScroll>

    <CommonRevealOnScroll><HomeNextEvent :event="nextEvent" /></CommonRevealOnScroll>

    <CommonRevealOnScroll :threshold="0.05">
      <EventGallery :media="galleryMedia" :title="t('home.gallery.title')" layout="filmstrip" />
    </CommonRevealOnScroll>

    <HomeCta />
  </div>
</template>

<style scoped lang="scss">
.page {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
