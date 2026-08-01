<script setup lang="ts">
// Typography: heading font families set globally in assets/scss/theme.scss.
// h1/h2 → BigChunko  |  h3–h6 → Roboto — do NOT override here.

import { useSchedule } from '@/composables/useSchedule'
import { useReveal, useRevealList } from '@/composables/useReveal'
import { barSchedules } from '@/utils/schedule'
import { upcomingEvents } from '@/utils/events'
import { menuData } from '@/utils/menu'
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

const route = useRoute()
const { barStatus, displaySchedule } = useSchedule(barSchedules)
const analytics = useAnalytics()

// ── CTA handlers (tracked) ────────────────────────────────────
const goToMenu = (location: string) => { analytics.trackCta('menu', location); navigateTo('/menu') }
const goToDirections = (location: string) => { analytics.trackCta('directions', location); navigateTo('/contacts#map') }
const goToEvents = (location: string) => { analytics.trackCta('next_event', location); navigateTo('/events') }

// ── Variant selectors ────────────────────────────────────────
// Use a client-only ref so SSR always renders defaults,
// preventing hydration mismatches from query param differences.
const heroV    = ref('1')
const statusV  = ref('1')
const menuV    = ref('1')
const momentsV = ref('1')
const aboutV   = ref('1')
const eventV   = ref('1')
const galleryV = ref('1')
const isDev    = process.env.NODE_ENV !== 'production'

onMounted(() => {
  const q = route.query
  if (q.status)  statusV.value  = q.status  as string
  if (q.moments) momentsV.value = q.moments as string
  if (q.about)   aboutV.value   = q.about   as string
  if (q.event)   eventV.value   = q.event   as string
  if (q.gallery) galleryV.value = q.gallery as string
})

watch(() => route.query, (q) => {
  if (q.status)  statusV.value  = q.status  as string
  if (q.moments) momentsV.value = q.moments as string
  if (q.about)   aboutV.value   = q.about   as string
  if (q.event)   eventV.value   = q.event   as string
  if (q.gallery) galleryV.value = q.gallery as string
})

// ── Schedule helpers ─────────────────────────────────────────
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

// ── Menu spotlight items (curated selection) ─────────────────
const spotlightItems = [
  { id: 'cappuccino', price: 1.80, img: '/img.png',      category: 'caffetteria' },
  { id: 'spritz',     price: 6.00, img: '/img_1.png',    category: 'alcolici' },
  { id: 'negroni',    price: 7.00, img: '/bar-view.jpg', category: 'alcolici' },
  { id: 'gin_tonic',  price: 8.00, img: '/img.png',      category: 'alcolici' },
  { id: 'cioccolata', price: 3.50, img: '/img_1.png',    category: 'caffetteria' },
  { id: 'spritz',     price: 6.00, img: '/img.png',      category: 'aperitivo' },
]

const activeMenuTab = ref<'caffetteria' | 'aperitivo' | 'alcolici'>('caffetteria')

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

const menuTabItems = computed(() => {
  if (activeMenuTab.value === 'caffetteria') {
    return [
      { nameKey: 'menu.items.cappuccino_normale', price: 1.80, img: '/img.png' },
      { nameKey: 'menu.items.caffe_shakerato',    price: 2.50, img: '/img_1.png' },
      { nameKey: 'menu.items.cioccolata',          price: 3.50, img: '/img.png' },
    ]
  } else if (activeMenuTab.value === 'aperitivo') {
    return [
      { nameKey: 'menu.items.spritz',       price: 6.00, img: '/img_1.png' },
      { nameKey: 'menu.items.tassoni_aperol', price: 5.00, img: '/img.png' },
      { nameKey: 'menu.items.americano',    price: 6.00, img: '/img_1.png' },
    ]
  } else {
    return [
      { nameKey: 'menu.items.gin_tonic',    price: 8.00, img: '/img.png' },
      { nameKey: 'menu.items.negroni',      price: 7.00, img: '/img_1.png' },
      { nameKey: 'menu.items.spritz',       price: 6.00, img: '/img.png' },
    ]
  }
})

// ── Next event + countdown ────────────────────────────────────
const nextEvent = computed(() => upcomingEvents[0] ?? null)

const countdown = ref({ days: 0, hours: 0, minutes: 0, seconds: 0 })
let countdownInterval: ReturnType<typeof setInterval> | null = null

const updateCountdown = () => {
  if (!nextEvent.value) return
  const diff = new Date(nextEvent.value.date).getTime() - Date.now()
  if (diff <= 0) { countdown.value = { days: 0, hours: 0, minutes: 0, seconds: 0 }; return }
  countdown.value = {
    days:    Math.floor(diff / 86400000),
    hours:   Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  }
}

onMounted(() => { updateCountdown(); countdownInterval = setInterval(updateCountdown, 1000) })
onUnmounted(() => { if (countdownInterval) clearInterval(countdownInterval) })

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })

// ── Moments data ──────────────────────────────────────────────
const moments = computed(() => [
  { key: 'colazione', title: t('home.moments.colazione'), desc: t('home.moments.colazioneDesc'), mascotte: '/mascotte/mascotte-croissant.svg' },
  { key: 'aperitivo', title: t('home.moments.aperitivo'), desc: t('home.moments.aperitivoDesc'), mascotte: '/mascotte/mascotte-alcohol.svg' },
  { key: 'serata',    title: t('home.moments.serata'),    desc: t('home.moments.serataDesc'),    mascotte: '/mascotte/mascotte-main.svg' },
])

// ── About timeline ────────────────────────────────────────────
const timeline = computed(() => [
  { year: t('home.about.timeline.t1year'), text: t('home.about.timeline.t1text') },
  { year: t('home.about.timeline.t2year'), text: t('home.about.timeline.t2text') },
  { year: t('home.about.timeline.t3year'), text: t('home.about.timeline.t3text') },
  { year: t('home.about.timeline.t4year'), text: t('home.about.timeline.t4text') },
])

// ── Scroll reveal refs ────────────────────────────────────────
const { revealRef: heroReveal,    isVisible: heroVisible }    = useReveal(0.05)
const { revealRef: momentsReveal, isVisible: momentsVisible } = useReveal(0.1)
const { revealRef: aboutReveal,   isVisible: aboutVisible }   = useReveal(0.1)
const { revealRef: menuReveal,    isVisible: menuVisible }    = useReveal(0.1)
const { revealRef: eventReveal,   isVisible: eventVisible }   = useReveal(0.1)
const { revealRef: galleryReveal, isVisible: galleryVisible } = useReveal(0.05)
const { listRef: momentsList,     visibleItems: momentsItems } = useRevealList(0.15)

// ── Marquee: status text repeated ────────────────────────────
const marqueeText = computed(() =>
  Array(8).fill(`${barStatus.value.label} · ${statusText.value} · Via Salara Statale 35/M · Cervia ·`).join('  ')
)
</script>

<template>
  <div class="page">

    <!-- ============================================================ -->
    <!-- HERO 1 — SCENA                                               -->
    <!-- Dark moody photo, cream panel floating in lower third       -->
    <!-- ============================================================ -->
    <section class="hero-wrap">
      <div class="h1-scena" ref="heroReveal" :class="{ revealed: heroVisible }">
        <img src="/bar-view.jpg" alt="Bar Romagna" class="h1-bg" />
        <div class="h1-overlay" />
        <div class="h1-top">
          <Tag :value="barStatus.label" icon="pi pi-circle-fill" :severity="barStatus.severity" />
        </div>
        <div class="h1-card">
          <h1 class="h1-title">
            {{ t('home.hero.title').split('\n')[0] }}<br>
            {{ t('home.hero.title').split('\n')[1] }}
          </h1>
          <p class="h1-sub">{{ t('home.hero.subtitle') }}</p>
          <div class="hero-ctas">
            <Button :label="t('home.cta.menu')" icon="pi pi-book" severity="warn" size="large" @click="goToMenu('home_hero')" />
            <Button :label="t('home.cta.directions')" icon="pi pi-map-marker" size="large" class="h1-outline-btn" @click="goToDirections('home_hero')" />
          </div>
        </div>
      </div>
    </section>


    <!-- ============================================================ -->
    <!-- STATUS BAND — SLIM BLUE                                     -->
    <!-- ============================================================ -->
    <section class="sb sb1">
      <div class="sb1-inner">
        <div class="sb1-left">
          <Tag :value="barStatus.label" icon="pi pi-circle-fill" :severity="barStatus.severity" />
          <span class="sb1-text">{{ statusText }}</span>
        </div>
        <div class="sb1-right">
          <i class="pi pi-clock sb1-icon" />
          <span class="sb1-hours">{{ t('home.status.todayHours') }}: {{ todaySchedule?.hours ?? '—' }}</span>
        </div>
      </div>
    </section>


    <!-- ============================================================ -->
    <!-- MOMENTI — CARDS WITH MASCOTTE                               -->
    <!-- ============================================================ -->
    <section class="section-reveal" ref="momentsReveal" :class="{ revealed: momentsVisible }">
      <div class="mo mo1">
        <h2 class="mo-title">{{ t('home.moments.title') }}</h2>
        <div class="mo1-grid" ref="momentsList">
          <div v-for="(m, i) in moments" :key="m.key" class="mo1-card stagger-item" :class="{ visible: momentsItems.has(i) }">
            <img :src="m.mascotte" :alt="m.title" class="mo1-mascotte" />
            <h3 class="mo1-name">{{ m.title }}</h3>
            <p class="mo1-desc">{{ m.desc }}</p>
          </div>
        </div>
      </div>
    </section>


    <!-- ============================================================ -->
    <!-- CHI SIAMO — TWO-COL + THREE PHOTOS                         -->
    <!-- ============================================================ -->
    <section class="section-reveal" ref="aboutReveal" :class="{ revealed: aboutVisible }">
      <div class="ab ab1">
        <div class="ab1-text">
          <span class="ab-tag">{{ t('home.about.tag') }}</span>
          <h2 class="ab-title">{{ t('home.about.title').split('\n')[0] }}<br>{{ t('home.about.title').split('\n')[1] }}</h2>
          <p class="ab-p">{{ t('home.about.p1') }}</p>
          <p class="ab-p">{{ t('home.about.p2') }}</p>
          <p class="ab-p">{{ t('home.about.p3') }}</p>
        </div>
        <div class="ab1-photos">
          <div class="ab1-photo-card ab1-photo-card--main">
            <img src="/owners-photos/nadia-mattia-2024.JPG" alt="Nadia e Mattia — Bar Romagna Cervia 2024" class="ab1-photo" style="object-position: center center" data-allow-mismatch />
          </div>
          <div class="ab1-photo-card">
            <img src="/owners-photos/nadia-mattia-2025.JPG" alt="Nadia e Mattia — Bar Romagna Cervia 2025" class="ab1-photo" style="object-position: center 10%" />
          </div>
          <div class="ab1-photo-card ab1-photo-card--historic">
            <img src="/owners-photos/nadia-mattia-2007.jpeg" alt="Nadia e Mattia — Bar Romagna Cervia 2007" class="ab1-photo" style="object-position: center 20%" />
          </div>
        </div>
      </div>
    </section>


    <!-- ============================================================ -->
    <!-- EVENTO — BANNER STRIP + MINI COUNTDOWN                     -->
    <!-- ============================================================ -->
    <section class="section-reveal" ref="eventReveal" :class="{ revealed: eventVisible }">

      <!-- Has upcoming event -->
      <div v-if="nextEvent" class="ev ev5">
        <div class="ev5-strip">
          <div class="ev5-left">
            <span class="ev5-tag">{{ t('home.nextEvent.tag') }}</span>
            <h2 class="ev5-title">{{ nextEvent.title }}</h2>
            <p class="ev5-date">{{ formatDate(nextEvent.date) }}<span v-if="nextEvent.time"> · {{ nextEvent.time }}</span></p>
            <p class="ev5-desc">{{ nextEvent.description }}</p>
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

    </section>


    <!-- ============================================================ -->
    <!-- GALLERY — FILMSTRIP SCROLL                                  -->
    <!-- ============================================================ -->
    <section class="section-reveal" ref="galleryReveal" :class="{ revealed: galleryVisible }">
      <div class="ga ga5">
        <h2 class="ga-title">{{ t('home.gallery.title') }}</h2>
        <div class="ga5-filmstrip">
          <div v-for="({ src, alt }, idx) in galleryPhotos" :key="`film-${idx}`" class="ga5-frame">
            <img :src="src" :alt="alt" class="ga5-img" />
          </div>
        </div>
      </div>
    </section>


    <!-- ============================================================ -->
    <!-- CTA — FULL BLEED PRIMARY BLUE                               -->
    <!-- ============================================================ -->
    <div class="ct ct4">
      <h2 class="ct4-title">{{ t('home.cta.title') }}</h2>
      <p class="ct4-sub">{{ t('home.cta.subtitle') }}</p>
      <div class="hero-ctas ct-btns">
        <Button :label="t('home.cta.menu')" icon="pi pi-book" severity="warn" size="large" @click="goToMenu('home_footer_cta')" />
        <Button :label="t('home.cta.directions')" icon="pi pi-map-marker" size="large" class="ct4-outline-btn" @click="goToDirections('home_footer_cta')" />
      </div>
    </div>

  </div>
</template>


<style scoped lang="scss">
// Typography: h1/h2 → BigChunko from theme.scss — do NOT override font-family here.

$r:    16px;
$r-sm: 8px;
$r-lg: 24px;

// ── Shared utilities ─────────────────────────────────────────
.page {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.hero-wrap { /* gutters from layout .main-content */ }

.hero-ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

// Scroll reveal base
.section-reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.6s ease, transform 0.6s ease;
  &.revealed { opacity: 1; transform: translateY(0); }
}

.stagger-item {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;
  &.visible { opacity: 1; transform: translateY(0); }
  @for $i from 0 through 4 {
    &:nth-child(#{$i + 1}) { transition-delay: #{$i * 0.12}s; }
  }
}

// Dev switcher
.dev-switcher {
  position: fixed;
  bottom: 0.75rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  background: var(--p-primary-900);
  color: white;
  padding: 0.4rem 0.875rem;
  border-radius: 999px;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.7rem;
  font-weight: 700;
  box-shadow: 0 4px 20px rgba(0,0,0,0.4);
  flex-wrap: wrap;
  justify-content: center;
  max-width: calc(100vw - 2rem);

  a {
    color: rgba(255,255,255,0.5);
    text-decoration: none;
    padding: 0.15rem 0.35rem;
    border-radius: 4px;
    transition: background 0.15s;
    &:hover  { background: rgba(255,255,255,0.15); color: white; }
    &.active { background: var(--p-orange-500); color: white; }
  }
}
.dev-lbl { color: rgba(255,255,255,0.4); font-size: 0.65rem; }
.dev-sep  { color: rgba(255,255,255,0.2); }

// Shared section labels
.ab-tag, .ev-tag {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--p-orange-500);
  margin-bottom: 0.5rem;
}

.ab-title {
  // h2 — BigChunko from theme.scss
  margin: 0 0 1.25rem;
  color: var(--p-primary-color);
  font-size: clamp(1.75rem, 4.5vw, 2.75rem);
  line-height: 1.05;
}

.ab-p {
  margin: 0 0 0.875rem;
  font-size: 1rem;
  line-height: 1.7;
  color: var(--p-text-muted-color);
}

.ev-title {
  // h2 — BigChunko from theme.scss
  margin: 0 0 0.5rem;
  color: var(--p-primary-color);
}
.ev-date { margin: 0 0 0.75rem; font-size: 0.875rem; color: var(--p-text-muted-color); display: flex; align-items: center; gap: 0.375rem; flex-wrap: wrap; }
.ev-icon { color: var(--p-orange-500); }
.ev-desc { margin: 0 0 1rem; font-size: 0.9375rem; line-height: 1.6; color: var(--p-text-muted-color); }
.ev-actions { display: flex; align-items: center; flex-wrap: wrap; gap: 0.75rem; }

.ga-title, .mo-title, .mp-title, .ct-title {
  // h2 — BigChunko from theme.scss
  margin: 0 0 1.25rem;
}
.ga-title { color: var(--p-text-muted-color); }
.mo-title { color: var(--p-primary-color); }
.mp-title { color: var(--p-primary-color); }
.ct-title { color: var(--p-primary-color); }
.ct-sub   { margin: 0 0 0.5rem; font-size: 1rem; line-height: 1.6; color: var(--p-text-muted-color); }
.ct-btns  { justify-content: center; }

.mp-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 1.25rem;
  gap: 1rem;
}
.mp-see-all {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--p-primary-color);
  text-decoration: none;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  &:hover { opacity: 0.75; }
}

// ============================================================
// HERO 1 — SCENA
// ============================================================
.h1-scena {
  position: relative;
  border-radius: $r;
  overflow: hidden;
  height: 88svh;
  min-height: 500px;
  max-height: 820px;
  opacity: 0;
  transform: scale(0.98);
  transition: opacity 0.8s ease, transform 0.8s ease;
  &.revealed { opacity: 1; transform: scale(1); }

  @media (min-width: 768px) and (max-width: 1023px) {
    height: calc(100svh - 70px - 4rem);
    max-height: none;
  }

  @media (min-width: 1024px) {
    height: calc(100svh - 70px - 4rem);
    max-height: none;
  }
}
.h1-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 30%;
}
.h1-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.65) 100%);
}
.h1-top {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  @media (min-width: 768px) { top: 2rem; left: 2.5rem; }
}
.h1-card {
  position: absolute;
  bottom: 2rem;
  left: 1.5rem;
  right: 1.5rem;
  background: rgba(255, 234, 190, 0.92);
  backdrop-filter: blur(12px);
  border-radius: $r;
  padding: 1.75rem;
  max-width: 560px;
  @media (min-width: 768px) { bottom: 2.5rem; left: 2.5rem; padding: 2.25rem; }
}
.h1-title {
  // h1 — BigChunko from theme.scss
  margin: 0 0 0.875rem;
  line-height: 1.0;
  font-size: clamp(2.25rem, 7vw, 3.25rem);
  color: var(--p-primary-800);
}
.h1-sub {
  margin: 0;
  font-size: 0.9375rem;
  line-height: 1.6;
  color: var(--p-text-color);
}
.h1-outline-btn {
  --p-button-secondary-border-color: var(--p-primary-color);
  --p-button-secondary-color: var(--p-primary-color);
  --p-button-secondary-background: transparent;
  --p-button-secondary-hover-background: var(--p-primary-50);
}

// ============================================================
// HERO 2 — GIORNALE
// ============================================================
.h2-giornale {
  background: var(--p-surface-500);
  border-radius: $r;
  padding: 2rem 1.75rem 0;
  overflow: hidden;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.7s ease, transform 0.7s ease;
  &.revealed { opacity: 1; transform: translateY(0); }
  @media (min-width: 768px) { padding: 2.5rem 3rem 0; }
}
.h2-headline-row {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  margin-bottom: 1.5rem;
}
.h2-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.h2-date {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--p-text-muted-color);
}
.h2-title {
  // h1 — BigChunko from theme.scss
  margin: 0;
  line-height: 0.88;
  font-size: clamp(3.5rem, 14vw, 9rem);
  color: var(--p-primary-800);
  letter-spacing: -0.02em;
  white-space: nowrap;
  overflow: hidden;
}
.h2-photo-strip {
  display: flex;
  flex-direction: column;
  gap: 0;
  @media (min-width: 768px) { flex-direction: row; height: 340px; }
}
.h2-photo {
  width: 100%;
  height: 220px;
  object-fit: cover;
  object-position: center 35%;
  @media (min-width: 768px) { flex: 1; height: 100%; }
}
.h2-caption-card {
  background: var(--p-primary-800);
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  @media (min-width: 768px) { width: 320px; flex-shrink: 0; padding: 2rem; }
}
.h2-sub {
  margin: 0;
  font-size: 0.9375rem;
  line-height: 1.6;
  color: rgba(255,255,255,0.85);
}

// ============================================================
// HERO 3 — BENTO
// ============================================================
.h3-bento {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 220px 180px;
  gap: 0.625rem;
  border-radius: $r;
  overflow: hidden;
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.7s ease, transform 0.7s ease;
  &.revealed { opacity: 1; transform: translateY(0); }

  @media (min-width: 768px) {
    grid-template-columns: 1.4fr 1fr 0.8fr;
    grid-template-rows: 280px 200px;
  }
}
.h3-cell { border-radius: $r-sm; overflow: hidden; }
.h3-cell--title {
  background: var(--p-primary-800);
  color: white;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  grid-column: span 2;
  @media (min-width: 768px) { grid-column: 1; grid-row: 1; padding: 2rem; }
}
.h3-title {
  // h1 — BigChunko from theme.scss
  margin: 0;
  font-size: clamp(1.5rem, 4.5vw, 3rem);
  line-height: 1.0;
  color: white;
}
.h3-cell--photo-main {
  grid-column: 1;
  @media (min-width: 768px) { grid-column: 2; grid-row: 1 / 3; }
}
.h3-cell--photo-food {
  grid-column: 2;
  @media (min-width: 768px) { grid-column: 1; grid-row: 2; }
}
.h3-img { width: 100%; height: 100%; object-fit: cover; }
.h3-cell--status {
  background: var(--p-surface-500);
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  @media (min-width: 768px) { grid-column: 3; grid-row: 1; }
}
.h3-status-text { margin: 0; font-size: 0.875rem; font-weight: 600; color: var(--p-primary-color); }
.h3-hours { margin: 0; font-size: 0.8125rem; color: var(--p-text-muted-color); margin-top: auto; }
.h3-cell--logo {
  background: var(--p-surface-0);
  border: 1px solid var(--p-surface-200);
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  @media (min-width: 768px) { grid-column: 3; grid-row: 2; }
}
.h3-logo { width: 80px; height: auto; }

// ============================================================
// HERO 4 — ONDA (diagonal clip-path)
// ============================================================
.h4-onda {
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: $r;
  overflow: hidden;
  min-height: 480px;
  opacity: 0;
  transform: translateX(-16px);
  transition: opacity 0.7s ease, transform 0.7s ease;
  &.revealed { opacity: 1; transform: translateX(0); }
  @media (min-width: 768px) {
    flex-direction: row;
    height: 560px;
  }
}
.h4-photo-side {
  width: 100%;
  height: 260px;
  flex-shrink: 0;
  overflow: hidden;
  @media (min-width: 768px) {
    flex: 1;
    height: auto;
    clip-path: polygon(0 0, 92% 0, 100% 100%, 0 100%);
  }
}
.h4-img { width: 100%; height: 100%; object-fit: cover; object-position: center 30%; }
.h4-text-side {
  background: var(--p-surface-500);
  padding: 2rem 1.75rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (min-width: 768px) {
    width: 44%;
    flex-shrink: 0;
    padding: 3rem 2.5rem 3rem 3rem;
    margin-left: -3%;
  }
}
.h4-badge { align-self: flex-start; margin-bottom: 1rem; }
.h4-title {
  // h1 — BigChunko from theme.scss
  margin: 0 0 0.875rem;
  font-size: clamp(1.75rem, 5vw, 3.25rem);
  line-height: 1.0;
  color: var(--p-primary-800);
}
.h4-rule { width: 56px; height: 3px; background: var(--p-orange-500); border-radius: 2px; margin: 0 0 1.25rem; }
.h4-sub { margin: 0; font-size: 0.9375rem; line-height: 1.6; color: var(--p-text-color); }

// ============================================================
// HERO 5 — SCROLL CINEMA
// ============================================================
.hero-wrap--cinema { overflow: hidden; }
.h5-cinema {
  position: relative;
  background: var(--p-surface-500);
  border-radius: $r;
  overflow: hidden;
  min-height: 520px;
}
.h5-title-layer {
  position: relative;
  z-index: 2;
  padding: 2.5rem 1.75rem 0;
  text-align: center;
  @media (min-width: 768px) { padding: 3.5rem 4rem 0; }
}
.h5-title {
  // h1 — BigChunko from theme.scss
  margin: 0;
  font-size: clamp(2.5rem, 9vw, 6rem);
  line-height: 0.95;
  color: var(--p-primary-800);
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), color 0.4s ease;
  &--up { transform: translateY(-12px); color: var(--p-primary-color); }
}
.h5-pre-sub {
  margin: 0.875rem 0 0;
  font-size: 0.8125rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--p-text-muted-color);
}
.h5-photo-layer {
  position: relative;
  z-index: 3;
  height: 0;
  overflow: hidden;
  border-radius: $r $r 0 0;
  transform: translateY(100%);
  transition: height 0s, transform 0.75s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: 0.1s;
  margin-top: 1.5rem;
  &--revealed {
    height: 420px;
    transform: translateY(0);
    @media (min-width: 768px) { height: 500px; }
  }
}
.h5-photo { width: 100%; height: 100%; object-fit: cover; object-position: center 30%; }
.h5-photo-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(175deg, transparent 30%, rgba(3,88,248,0.88) 100%);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (min-width: 768px) { padding: 2.5rem; }
}
.h5-overlay-body { color: white; max-width: 600px; }
.h5-sub { margin: 0; font-size: 1rem; line-height: 1.6; color: rgba(255,255,255,0.88); }
.h5-outline-btn {
  --p-button-secondary-border-color: rgba(255,255,255,0.5);
  --p-button-secondary-color: white;
  --p-button-secondary-background: transparent;
  --p-button-secondary-hover-background: rgba(255,255,255,0.12);
  --p-button-secondary-hover-border-color: white;
  --p-button-secondary-hover-color: white;
}

// ============================================================
// STATUS BANDS
// ============================================================
.sb { border-radius: $r; overflow: hidden; }

// SB1 — slim blue
.sb1 { background: var(--p-primary-800); padding: 0.875rem 1.5rem; }
.sb1-inner { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 0.75rem; }
.sb1-left { display: flex; align-items: center; gap: 0.75rem; }
.sb1-text { color: white; font-size: 0.9375rem; font-weight: 600; }
.sb1-right { display: flex; align-items: center; gap: 0.5rem; color: rgba(255,255,255,0.75); font-size: 0.875rem; }
.sb1-icon { color: var(--p-orange-400); }
.sb1-hours { color: rgba(255,255,255,0.9); }

// SB2 — three cards
.sb2 { background: var(--p-surface-0); border: 1px solid var(--p-surface-200); padding: 1rem 1.25rem; }
.sb2-inner { display: grid; grid-template-columns: 1fr; gap: 0.75rem; @media (min-width: 640px) { grid-template-columns: repeat(3,1fr); } }
.sb2-card { display: flex; flex-direction: column; gap: 0.25rem; padding: 0.875rem; background: var(--p-surface-50); border-radius: $r-sm; }
.sb2-card--status { align-items: flex-start; gap: 0.5rem; }
.sb2-label { font-size: 0.6875rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--p-text-muted-color); }
.sb2-value { font-size: 0.9375rem; font-weight: 700; color: var(--p-text-color); }
.sb2-value--addr { font-weight: 500; }

// SB3 — marquee
.sb3 { background: var(--p-primary-800); padding: 0.75rem 0; overflow: hidden; }
.sb3-track-wrap { overflow: hidden; width: 100%; }
.sb3-track {
  display: flex;
  width: max-content;
  animation: marquee 28s linear infinite;
}
.sb3-content {
  white-space: nowrap;
  padding-right: 3rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: rgba(255,255,255,0.9);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

// SB4 — pill cluster
.sb4 { background: var(--p-surface-0); border: 1px solid var(--p-surface-200); padding: 0.875rem 1.25rem; }
.sb4-inner { display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem; }
.sb4-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.875rem;
  border-radius: 999px;
  font-size: 0.8125rem;
  font-weight: 600;
  background: var(--p-surface-100);
  color: var(--p-text-color);
  border: none;
  cursor: default;
  &--hours { color: var(--p-primary-color); background: var(--p-primary-50); }
  &--call  { color: white; background: var(--p-primary-color); text-decoration: none; cursor: pointer; }
  &--addr  { color: var(--p-text-muted-color); }
}

// SB5 — amber warm
.sb5 { background: var(--p-surface-500); padding: 0.875rem 1.5rem; border-radius: $r; }
.sb5-inner { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 0.75rem; }
.sb5-left { display: flex; align-items: center; gap: 0.75rem; }
.sb5-text { font-size: 0.9375rem; font-weight: 600; color: var(--p-text-color); }
.sb5-right { display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; color: var(--p-text-muted-color); }

// ============================================================
// MENU PREVIEW
// ============================================================
.mp { background: var(--p-surface-0); border: 1px solid var(--p-surface-200); border-radius: $r; padding: 1.5rem; box-shadow: 0 2px 12px rgba(0,0,0,0.04); @media (min-width: 768px) { padding: 2rem; } }

// MP1
.mp1-tabs { display: flex; gap: 0.25rem; border-bottom: 1px solid var(--p-surface-200); margin-bottom: 1rem; }
.mp1-tab {
  background: transparent; border: none; border-bottom: 3px solid transparent; margin-bottom: -1px;
  padding: 0.4rem 0.875rem; font-size: 0.875rem; font-weight: 500; color: var(--p-text-muted-color); cursor: pointer;
  transition: color 0.15s, border-color 0.15s;
  &:hover { color: var(--p-text-color); }
  &.active { color: var(--p-primary-color); border-bottom-color: var(--p-primary-color); font-weight: 700; }
}
.mp1-list { display: flex; flex-direction: column; gap: 0.125rem; }
.mp1-row {
  display: flex; align-items: center; gap: 0.875rem; padding: 0.625rem 0.375rem; border-radius: $r-sm;
  transition: background 0.15s; &:hover { background: var(--p-surface-50); }
}
.mp1-thumb { width: 44px; height: 44px; border-radius: $r-sm; object-fit: cover; flex-shrink: 0; }
.mp1-name { flex: 1; font-size: 0.9375rem; color: var(--p-text-color); }
.mp1-price { font-size: 1rem; font-weight: 700; color: var(--p-orange-500); white-space: nowrap; }

// MP2
.mp2-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 0.75rem; @media (min-width: 640px) { grid-template-columns: repeat(3,1fr); } }
.mp2-cell {
  border: 1px solid var(--p-surface-200); border-radius: $r-sm; padding: 1rem;
  display: flex; flex-direction: column; align-items: center; gap: 0.375rem; text-align: center;
  transition: border-color 0.15s; &:hover { border-color: var(--p-primary-color); }
}
.mp2-name { font-size: 0.875rem; color: var(--p-text-muted-color); }
.mp2-price { font-size: 1.125rem; font-weight: 800; color: var(--p-primary-color); }

// MP3
.mp3-layout { display: grid; grid-template-columns: 1fr; gap: 1rem; @media (min-width: 640px) { grid-template-columns: 1fr 1fr; } }
.mp3-featured { border-radius: $r-sm; overflow: hidden; position: relative; }
.mp3-featured-img { width: 100%; height: 200px; object-fit: cover; }
.mp3-featured-body { padding: 1rem; display: flex; flex-direction: column; gap: 0.375rem; }
.mp3-featured-name { // h3 — Roboto from theme.scss
  margin: 0; font-size: 1.125rem; font-weight: 700; color: var(--p-text-color); }
.mp3-featured-price { font-size: 1.5rem; font-weight: 800; color: var(--p-orange-500); }
.mp3-side { display: flex; flex-direction: column; justify-content: center; gap: 1rem; }
.mp3-side-row { display: flex; justify-content: space-between; align-items: center; padding: 0.875rem; border: 1px solid var(--p-surface-200); border-radius: $r-sm; }
.mp3-side-name { font-size: 0.9375rem; color: var(--p-text-color); }
.mp3-side-price { font-weight: 700; color: var(--p-orange-500); }

// MP4
.mp4-tabs { display: flex; gap: 0.25rem; border-bottom: 1px solid var(--p-surface-200); margin-bottom: 1rem; }
.mp4-tab { @extend .mp1-tab; }
.mp4-scroll { display: flex; gap: 0.875rem; overflow-x: auto; padding-bottom: 0.5rem; scrollbar-width: none; &::-webkit-scrollbar { display: none; } }
.mp4-card { flex-shrink: 0; width: 140px; border: 1px solid var(--p-surface-200); border-radius: $r-sm; overflow: hidden; }
.mp4-img { width: 100%; height: 100px; object-fit: cover; }
.mp4-name { display: block; padding: 0.5rem 0.625rem 0.25rem; font-size: 0.8125rem; color: var(--p-text-color); }
.mp4-price { display: block; padding: 0 0.625rem 0.625rem; font-size: 0.9375rem; font-weight: 700; color: var(--p-orange-500); }

// MP5
.mp5-cols { display: grid; grid-template-columns: 1fr; gap: 1.5rem; @media (min-width: 640px) { grid-template-columns: 1fr 1fr; } }
.mp5-col-title { font-size: 0.6875rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--p-orange-500); margin-bottom: 0.75rem; padding-bottom: 0.5rem; border-bottom: 1px solid var(--p-surface-200); }
.mp5-row { display: flex; align-items: baseline; gap: 0.25rem; padding: 0.375rem 0; border-bottom: 1px dotted var(--p-surface-300); &:last-child { border-bottom: none; } }
.mp5-name { font-size: 0.9375rem; color: var(--p-text-color); white-space: nowrap; }
.mp5-dots { flex: 1; border-bottom: 2px dotted var(--p-surface-300); margin: 0 0.375rem 0.25rem; min-width: 16px; }
.mp5-price { font-size: 0.9375rem; font-weight: 700; color: var(--p-primary-color); white-space: nowrap; }

// ============================================================
// MOMENTI
// ============================================================
// MO1 — mascotte cards
.mo1-grid { display: grid; grid-template-columns: 1fr; gap: 1rem; @media (min-width: 640px) { grid-template-columns: repeat(3,1fr); } }
.mo1-card { background: var(--p-surface-500); border-radius: $r; padding: 1.75rem 1.5rem; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 0.75rem; }
.mo1-mascotte { width: 72px; height: 72px; object-fit: contain; }
.mo1-name { // h3 — Roboto
  margin: 0; font-weight: 700; color: var(--p-primary-color); }
.mo1-desc { margin: 0; font-size: 0.9rem; line-height: 1.55; color: var(--p-text-muted-color); }

// MO2 — timeline
.mo2-timeline { display: flex; flex-direction: column; gap: 0; @media (min-width: 640px) { flex-direction: row; justify-content: space-between; } }
.mo2-step { display: flex; flex-direction: column; align-items: center; text-align: center; flex: 1; position: relative; padding: 1.5rem 1rem 0; }
.mo2-circle { width: 44px; height: 44px; border-radius: 50%; background: var(--p-primary-color); color: white; display: flex; align-items: center; justify-content: center; font-size: 1rem; font-weight: 700; flex-shrink: 0; }
.mo2-line { position: absolute; top: 46px; left: 50%; right: -50%; height: 2px; background: var(--p-surface-300); @media (max-width: 639px) { display: none; } }
.mo2-name { // h3 — Roboto
  margin: 0.875rem 0 0.375rem; font-weight: 700; color: var(--p-text-color); }
.mo2-desc { margin: 0; font-size: 0.875rem; line-height: 1.5; color: var(--p-text-muted-color); max-width: 200px; }

// MO3 — photo strips
.mo3-strips { display: flex; flex-direction: column; gap: 0.625rem; }
.mo3-strip { position: relative; height: 160px; border-radius: $r-sm; overflow: hidden; @media (min-width: 768px) { height: 200px; } }
.mo3-img { width: 100%; height: 100%; object-fit: cover; }
.mo3-overlay { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(3,88,248,0.8) 0%, rgba(3,88,248,0.3) 60%, transparent 100%); padding: 1.5rem; display: flex; flex-direction: column; justify-content: center; }
.mo3-name { // h3 — Roboto
  margin: 0 0 0.375rem; font-weight: 700; color: white; font-size: 1.125rem; }
.mo3-desc { margin: 0; font-size: 0.875rem; color: rgba(255,255,255,0.85); max-width: 360px; }

// MO4 — accordion
.mo4-list { display: flex; flex-direction: column; gap: 0.5rem; }
.mo4-item { background: var(--p-surface-50); border: 1px solid var(--p-surface-200); border-radius: $r-sm; overflow: hidden; }
.mo4-summary { display: flex; align-items: center; gap: 1rem; padding: 1rem 1.25rem; cursor: pointer; list-style: none; &::-webkit-details-marker { display: none; } }
.mo4-icon { width: 36px; height: 36px; object-fit: contain; flex-shrink: 0; }
.mo4-name { flex: 1; font-weight: 700; color: var(--p-text-color); }
.mo4-chevron { color: var(--p-text-muted-color); transition: transform 0.2s; details[open] & { transform: rotate(180deg); } }
.mo4-body { padding: 0 1.25rem 1.25rem; font-size: 0.9375rem; line-height: 1.6; color: var(--p-text-muted-color); }

// MO5 — number callout
.mo5-grid { display: grid; grid-template-columns: 1fr; gap: 1rem; @media (min-width: 640px) { grid-template-columns: repeat(3,1fr); } }
.mo5-card { position: relative; padding: 2rem 1.5rem 1.75rem; background: var(--p-surface-0); border: 1px solid var(--p-surface-200); border-radius: $r; overflow: hidden; }
.mo5-num { position: absolute; top: -0.5rem; right: 0.75rem; font-size: 5rem; font-weight: 900; color: var(--p-surface-200); line-height: 1; pointer-events: none; }
.mo5-name { // h3 — Roboto
  margin: 0 0 0.5rem; font-weight: 700; color: var(--p-primary-color); position: relative; }
.mo5-desc { margin: 0; font-size: 0.9rem; line-height: 1.55; color: var(--p-text-muted-color); position: relative; }

// ============================================================
// CHI SIAMO
// ============================================================
// AB1
.ab1 { background: var(--p-surface-0); border: 1px solid var(--p-surface-200); border-radius: $r; padding: 2rem 1.75rem; display: grid; grid-template-columns: 1fr; gap: 2.5rem; @media (min-width: 768px) { grid-template-columns: 1fr 1fr; align-items: start; padding: 3rem; gap: 4rem; } }
.ab1-text { display: flex; flex-direction: column; }
.ab1-photos {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 0.625rem;
}
.ab1-photo-card {
  border-radius: $r-sm;
  overflow: hidden;
  position: relative;
  &--main { grid-column: span 2; }
}
.ab1-photo {
  width: 100%;
  height: 180px;
  object-fit: cover;
  display: block;
  .ab1-photo-card--main & { height: 360px; }
}
.ab1-photo-year {
  position: absolute;
  bottom: 0.5rem;
  left: 0.625rem;
  background: rgba(0,0,0,0.55);
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  letter-spacing: 0.06em;
}

// AB2
.ab2 { position: relative; border-radius: $r; overflow: hidden; min-height: 400px; display: flex; align-items: center; justify-content: center; padding: 3rem 2rem; }
.ab2-bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.ab2-overlay { position: absolute; inset: 0; background: rgba(3,88,248,0.72); backdrop-filter: blur(4px); }
.ab2-content { position: relative; z-index: 1; max-width: 640px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 1rem; }
.ab2-tag { color: var(--p-orange-400); }
.ab2-quote { font-size: clamp(1.125rem, 3vw, 1.5rem); line-height: 1.5; color: white; font-style: italic; margin: 0; }
.ab2-author { font-size: 0.875rem; font-weight: 700; color: rgba(255,255,255,0.7); }
.ab2-sub { font-size: 0.9375rem; line-height: 1.6; color: rgba(255,255,255,0.8); margin: 0; max-width: 480px; }

// AB3
.ab3 { background: var(--p-surface-0); border: 1px solid var(--p-surface-200); border-radius: $r; padding: 2rem 1.75rem; @media (min-width: 768px) { padding: 2.5rem 3rem; } }
.ab3-header { margin-bottom: 2rem; }
.ab3-timeline { display: flex; flex-direction: column; gap: 0; }
.ab3-item { display: grid; grid-template-columns: 60px 24px 1fr; gap: 0 1rem; align-items: start; padding-bottom: 1.5rem; &:last-child { padding-bottom: 0; } }
.ab3-year { font-size: 0.8125rem; font-weight: 700; color: var(--p-orange-500); padding-top: 2px; text-align: right; }
.ab3-connector { display: flex; flex-direction: column; align-items: center; }
.ab3-dot { width: 12px; height: 12px; border-radius: 50%; background: var(--p-primary-color); flex-shrink: 0; margin-top: 3px; }
.ab3-line { flex: 1; width: 2px; background: var(--p-surface-300); margin-top: 4px; min-height: 28px; }
.ab3-text { font-size: 0.9375rem; line-height: 1.6; color: var(--p-text-muted-color); padding-bottom: 0.25rem; }

// AB4
.ab4 { background: var(--p-surface-0); border: 1px solid var(--p-surface-200); border-radius: $r; padding: 2rem 1.75rem; display: grid; grid-template-columns: 1fr; gap: 2rem; @media (min-width: 768px) { grid-template-columns: 1fr 1fr; align-items: center; padding: 3rem; gap: 4rem; } }
.ab4-text { display: flex; flex-direction: column; }
.ab4-stats { display: flex; flex-direction: column; gap: 1.5rem; }
.ab4-stat { display: flex; flex-direction: column; gap: 0.25rem; padding-left: 1.25rem; border-left: 4px solid var(--p-orange-500); }
.ab4-stat-value { font-size: clamp(1.75rem, 4vw, 2.75rem); font-weight: 900; color: var(--p-primary-color); line-height: 1; }
.ab4-stat-label { font-size: 0.875rem; color: var(--p-text-muted-color); font-weight: 500; }

// AB5
.ab5 { position: relative; border-radius: $r; overflow: hidden; min-height: 360px; }
.ab5-img { width: 100%; height: 100%; object-fit: cover; object-position: center 20%; min-height: 360px; }
.ab5-overlay { position: absolute; inset: 0; background: linear-gradient(0deg, rgba(1,20,92,0.92) 0%, rgba(1,20,92,0.5) 50%, transparent 100%); padding: 2rem; display: flex; flex-direction: column; justify-content: flex-end; }
.ab5-tag { color: var(--p-orange-400); }
.ab5-title { // h2 — BigChunko
  margin: 0 0 0.75rem; color: white; font-size: clamp(1.75rem, 4.5vw, 2.75rem); line-height: 1.05; }
.ab5-p { margin: 0; font-size: 0.9375rem; line-height: 1.65; color: rgba(255,255,255,0.82); max-width: 520px; }

// ============================================================
// EVENTO
// ============================================================
// EV1
.ev1 { background: var(--p-surface-0); border: 1px solid var(--p-surface-200); border-radius: $r; overflow: hidden; display: flex; flex-direction: column; @media (min-width: 768px) { flex-direction: row; } }
.ev1-photo { width: 100%; height: 220px; flex-shrink: 0; overflow: hidden; @media (min-width: 768px) { width: 38%; height: auto; } }
.ev1-img { width: 100%; height: 100%; object-fit: cover; }
.ev1-body { padding: 1.75rem; display: flex; flex-direction: column; justify-content: center; @media (min-width: 768px) { padding: 2.5rem; } }

// EV2 — countdown
.ev2 { background: var(--p-primary-800); border-radius: $r; padding: 2.5rem 2rem; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 1.25rem; }
.ev2-title { color: white; }
.ev2-date { color: rgba(255,255,255,0.7); justify-content: center; }
.ev2-countdown { display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; }
.ev2-unit { display: flex; flex-direction: column; align-items: center; gap: 0.25rem; min-width: 64px; }
.ev2-num { font-size: 2.5rem; font-weight: 900; color: white; line-height: 1; font-variant-numeric: tabular-nums; }
.ev2-label { font-size: 0.6875rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--p-orange-400); }

// EV3 — poster
.ev3 { border-radius: $r; overflow: hidden; }
.ev3-poster { position: relative; height: 420px; @media (min-width: 768px) { height: 480px; } }
.ev3-bg { width: 100%; height: 100%; object-fit: cover; }
.ev3-overlay { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(3,88,248,0.85) 100%); padding: 1.75rem; display: flex; flex-direction: column; justify-content: space-between; }
.ev3-top { display: flex; align-items: center; gap: 0.75rem; }
.ev3-tag { color: var(--p-orange-400); }
.ev3-bottom { color: white; }
.ev3-title { // h2 — BigChunko
  margin: 0 0 0.5rem; color: white; font-size: clamp(1.75rem, 5vw, 3rem); }
.ev3-date { margin: 0 0 1rem; font-size: 0.9375rem; color: rgba(255,255,255,0.8); }

// EV4 — list
.ev4 { background: var(--p-surface-0); border: 1px solid var(--p-surface-200); border-radius: $r; padding: 1.75rem; display: flex; flex-direction: column; gap: 1rem; @media (min-width: 768px) { padding: 2rem; } }
.ev4-row { display: flex; align-items: flex-start; gap: 1.25rem; padding-bottom: 1rem; border-bottom: 1px solid var(--p-surface-200); &:last-of-type { border-bottom: none; } }
.ev4-date-col { text-align: center; flex-shrink: 0; width: 48px; padding-top: 2px; }
.ev4-day { display: block; font-size: 1.75rem; font-weight: 900; color: var(--p-primary-color); line-height: 1; }
.ev4-month { display: block; font-size: 0.6875rem; font-weight: 700; text-transform: uppercase; color: var(--p-orange-500); letter-spacing: 0.08em; }
.ev4-details { flex: 1; }
.ev4-name { // h3 — Roboto
  margin: 0 0 0.375rem; font-weight: 700; color: var(--p-text-color); }
.ev4-desc { margin: 0; font-size: 0.875rem; line-height: 1.5; color: var(--p-text-muted-color); }
.ev4-badge { flex-shrink: 0; }
.ev4-cta { align-self: flex-start; }

// EV5 — banner strip
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
.ev5-title { // h2 — BigChunko
  margin: 0; color: white; font-size: clamp(1.25rem, 3.5vw, 2rem); }
.ev5-date { margin: 0; font-size: 0.9375rem; font-weight: 500; color: rgba(255,255,255,0.9); }
.ev5-desc { margin: 0; font-size: 0.9rem; line-height: 1.55; color: rgba(255,255,255,0.75); max-width: 480px; }

// EV5 empty state
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
.ev5-empty-title { // h2 — BigChunko
  margin: 0; color: white; font-size: clamp(1.125rem, 3vw, 1.75rem); }
.ev5-empty-sub { margin: 0; font-size: 0.9rem; line-height: 1.55; color: rgba(255,255,255,0.72); max-width: 480px; }

// Mini countdown inside EV5
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

// ============================================================
// GALLERY
// ============================================================
// GA1 — three column strip
.ga1-strip { display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 200px 200px; gap: 0.625rem; @media (min-width: 640px) { grid-template-columns: 1fr 2fr 1fr; grid-template-rows: 300px; } @media (min-width: 1024px) { grid-template-rows: 380px; } }
.ga1-item { border-radius: $r-sm; overflow: hidden; &--wide { grid-column: span 2; @media (min-width: 640px) { grid-column: 2; } } }
.ga1-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease; .ga1-item:hover & { transform: scale(1.04); } }

// GA2 — masonry
.ga2-masonry { display: grid; grid-template-columns: 1fr 1fr; gap: 0.625rem; }
.ga2-col { display: flex; flex-direction: column; gap: 0.625rem; }
.ga2-item { border-radius: $r-sm; overflow: hidden; height: 180px; &--tall { height: 280px; } @media (min-width: 640px) { height: 220px; &--tall { height: 340px; } } }
.ga2-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease; .ga2-item:hover & { transform: scale(1.04); } }

// GA3 — panoramic
.ga3-panoramic { border-radius: $r; overflow: hidden; height: 280px; @media (min-width: 768px) { height: 380px; } }
.ga3-img { width: 100%; height: 100%; object-fit: cover; object-position: center 35%; }

// GA4 — polaroid stack
.ga4-stack { position: relative; height: 320px; display: flex; align-items: center; justify-content: center; @media (min-width: 768px) { height: 400px; } }
.ga4-polaroid {
  position: absolute;
  background: white;
  padding: 8px 8px 32px;
  border-radius: 4px;
  box-shadow: 0 8px 28px rgba(0,0,0,0.18);
  width: 180px;
  height: 220px;
  transition: transform 0.3s ease, z-index 0s;
  cursor: pointer;
  @media (min-width: 640px) { width: 220px; height: 270px; }
  &:hover { transform: rotate(0deg) scale(1.08) !important; z-index: 10; }
  &--1 { transform: rotate(-8deg) translate(-80px, 10px); z-index: 1; }
  &--2 { transform: rotate(3deg) translate(0px, -15px); z-index: 4; }
  &--3 { transform: rotate(-4deg) translate(80px, 8px); z-index: 2; }
  &--4 { transform: rotate(7deg) translate(-20px, 20px); z-index: 3; }
}
.ga4-img { width: 100%; height: 100%; object-fit: cover; border-radius: 2px; }

// GA5 — filmstrip
.ga5-filmstrip { display: flex; gap: 0.625rem; overflow-x: auto; padding-bottom: 0.5rem; scrollbar-width: thin; scrollbar-color: var(--p-surface-400) transparent; cursor: grab; &:active { cursor: grabbing; } }
.ga5-frame { flex-shrink: 0; width: 240px; height: 180px; border-radius: $r-sm; overflow: hidden; @media (min-width: 768px) { width: 320px; height: 220px; } }
.ga5-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease; .ga5-frame:hover & { transform: scale(1.04); } }

// ============================================================
// CTA VARIANTS
// ============================================================
// CT1 — cream centered
.ct1 { background: var(--p-surface-500); border-radius: $r; padding: 3rem 2rem; text-align: center; }
.ct1-inner { max-width: 540px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; gap: 0.875rem; }

// CT2 — split panels
.ct2 { display: grid; grid-template-columns: 1fr; border-radius: $r; overflow: hidden; @media (min-width: 640px) { grid-template-columns: 1fr 1fr; } }
.ct2-panel {
  display: flex; flex-direction: column; align-items: flex-start; justify-content: space-between;
  gap: 1.5rem; padding: 2.5rem 2rem; border: none; cursor: pointer;
  transition: filter 0.2s ease;
  &:hover { filter: brightness(1.08); }
  &--menu { background: var(--p-primary-800); color: white; }
  &--directions { background: var(--p-surface-500); color: var(--p-text-color); }
}
.ct2-icon { font-size: 2rem; }
.ct2-panel-title { // h2 — BigChunko
  margin: 0; font-size: clamp(1.25rem, 3.5vw, 2rem);
  .ct2-panel--menu & { color: white; }
  .ct2-panel--directions & { color: var(--p-primary-color); }
}
.ct2-arrow { font-size: 1.25rem; align-self: flex-end; }

// CT3 — map preview
.ct3 { display: grid; grid-template-columns: 1fr; border-radius: $r; overflow: hidden; border: 1px solid var(--p-surface-200); @media (min-width: 768px) { grid-template-columns: 1fr 1fr; } }
.ct3-map { height: 280px; overflow: hidden; @media (min-width: 768px) { height: auto; } }
.ct3-info { padding: 2rem 1.75rem; display: flex; flex-direction: column; justify-content: center; gap: 0.75rem; background: var(--p-surface-0); }
.ct3-title { margin-bottom: 0.25rem; }

// CT4 — full bleed blue
.ct4 { background: var(--p-primary-800); border-radius: $r; padding: 3.5rem 2rem; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 1rem; }
.ct4-title { // h2 — BigChunko
  margin: 0; color: white; font-size: clamp(1.75rem, 5vw, 3.25rem); }
.ct4-sub { margin: 0; font-size: 1rem; line-height: 1.6; color: rgba(255,255,255,0.8); max-width: 480px; }
.ct4-outline-btn {
  --p-button-secondary-border-color: rgba(255,255,255,0.5);
  --p-button-secondary-color: white;
  --p-button-secondary-background: transparent;
  --p-button-secondary-hover-background: rgba(255,255,255,0.12);
  --p-button-secondary-hover-border-color: white;
  --p-button-secondary-hover-color: white;
}

// CT5 — minimal line
.ct5 { padding: 2.5rem 1rem; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 1.25rem; }
.ct5-title { font-size: clamp(1.5rem, 4vw, 2.5rem); }
.ct5-rule { border: none; border-top: 2px solid var(--p-surface-300); width: 80px; margin: 0; }
.ct5-links { display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap; justify-content: center; }
.ct5-link { background: transparent; border: none; font-size: 1rem; font-weight: 600; color: var(--p-primary-color); cursor: pointer; display: flex; align-items: center; gap: 0.375rem; text-decoration: none; transition: opacity 0.15s; &:hover { opacity: 0.7; } }
.ct5-sep { color: var(--p-surface-400); font-size: 1.25rem; }
</style>
