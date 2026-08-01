<script setup lang="ts">
// Typography: all heading font families are set globally in assets/scss/theme.scss.
// Do not override font-family anywhere in this file's scoped styles.

// ── SEO ──────────────────────────────────────────────────────
const { locale } = useI18n()

const seoTitle = computed(() =>
  locale.value === 'it'
    ? 'Contatti — Bar Romagna Cervia | Orari, Mappa & Telefono'
    : 'Contact — Bar Romagna Cervia | Opening Hours, Map & Phone'
)
const seoDesc = computed(() =>
  locale.value === 'it'
    ? 'Trova il Bar Romagna a Cervia: orari di apertura, indirizzo (Via Salara Statale 35/M), numero di telefono e mappa. Contatta Nadia o Mattia direttamente.'
    : 'Find Bar Romagna in Cervia: opening hours, address (Via Salara Statale 35/M), phone number and map. Contact Nadia or Mattia directly.'
)

useSeoMeta({
  title:              () => seoTitle.value,
  description:        () => seoDesc.value,
  ogTitle:            () => seoTitle.value,
  ogDescription:      () => seoDesc.value,
  ogUrl:              'https://www.barromagna.com/contacts',
  ogImage:            'https://www.barromagna.com/bar-view.jpg',
  ogImageAlt:         'Bar Romagna Cervia — contatti e orari',
  twitterTitle:       () => seoTitle.value,
  twitterDescription: () => seoDesc.value,
})

useHead({
  link: [{ rel: 'canonical', href: 'https://www.barromagna.com/contacts' }],
})

import { useSchedule } from '@/composables/useSchedule'
import { barSchedules } from '@/utils/schedule'

const { t } = useI18n()
const { barStatus, displaySchedule } = useSchedule(barSchedules)
const analytics = useAnalytics()

const openMaps = () => {
  analytics.trackDirections('contacts')
  window.open(
    'https://www.google.com/maps/place/Bar+Romagna/@44.2524022,12.3110341,11.82z/data=!4m6!3m5!1s0x132cb1f33caaf7d7:0xef2fc4fe22e8018e!8m2!3d44.2562331!4d12.2766308',
    '_blank'
  )
}

const callNadia   = () => { analytics.trackContact({ method: 'call', person: 'nadia', location: 'contacts' }); window.location.href = 'tel:+393395936104' }
const callMattia  = () => { analytics.trackContact({ method: 'call', person: 'mattia', location: 'contacts' }); window.location.href = 'tel:+393473746945' }
const sendEmail   = () => { analytics.trackContact({ method: 'email', person: 'generic', location: 'contacts' }); window.location.href = 'mailto:barromagna.cervia@gmail.com' }
const openWhatsAppNadia  = () => { analytics.trackContact({ method: 'whatsapp', person: 'nadia', location: 'contacts' }); window.open('https://wa.me/393395936104', '_blank') }
const openWhatsAppMattia = () => { analytics.trackContact({ method: 'whatsapp', person: 'mattia', location: 'contacts' }); window.open('https://wa.me/393473746945', '_blank') }

const goToMenu = () => { analytics.trackCta('menu', 'contacts_hero'); navigateTo('/menu') }
</script>

<template>
  <div class="page">

    <!-- ============================================================ -->
    <!-- HERO B — MANIFESTO                                           -->
    <!-- Split: deep blue editorial panel left, photo right          -->
    <!-- ============================================================ -->
    <section class="hero-wrap">
      <div class="hero hero-b">
        <!-- Left: editorial panel -->
        <div class="hero-b-panel">
          <Tag
            :value="barStatus.label"
            icon="pi pi-circle-fill"
            :severity="barStatus.severity"
            class="hero-badge"
          />
          <div class="hero-b-content">
            <h1 class="hero-b-title">
              {{ t('contacts.hero.title').split('\n')[0] }}<br>
              {{ t('contacts.hero.title').split('\n')[1] }}
            </h1>
            <hr class="hero-b-rule" />
            <p class="hero-b-sub">{{ t('contacts.hero.subtitle') }}</p>
            <div class="hero-ctas">
              <Button
                :label="t('contacts.actions.viewMenu')"
                icon="pi pi-book"
                severity="warn"
                size="large"
                @click="goToMenu"
              />
              <Button
                :label="t('contacts.actions.directions')"
                icon="pi pi-map-marker"
                size="large"
                class="hero-b-outline-btn"
                @click="openMaps"
              />
            </div>
          </div>
        </div>
        <!-- Right: photo -->
        <div class="hero-b-photo">
          <img src="/bar-view.jpg" alt="Bar Romagna" class="hero-b-img" />
        </div>
      </div>
    </section>


    <!-- ============================================================ -->
    <!-- MAIN CONTENT GRID                                            -->
    <!-- ============================================================ -->
    <section class="content-wrap">
      <div class="content-grid">

        <!-- ========================================================= -->
        <!-- PANEL A — TRATTORIA                                        -->
        <!-- Warm cream background, amber rule separators, bold Italian -->
        <!-- ========================================================= -->
        <div class="left-col panel-a-col">

          <!-- Opening hours -->
          <div class="panel-a-section">
            <div class="panel-a-header">
              <h2 class="panel-a-title">{{ t('contacts.schedule.title') }}</h2>
              <Tag
                :value="barStatus.label"
                icon="pi pi-circle-fill"
                :severity="barStatus.severity"
              />
            </div>
            <div class="schedule-list">
              <div
                v-for="(item, i) in displaySchedule"
                :key="i"
                class="schedule-row"
                :class="{ 'is-closed': item.hours === t('schedule.closed') }"
              >
                <div class="schedule-day-wrap">
                  <span class="schedule-day">{{ item.days }}</span>
                  <Tag v-if="item.specialName" :value="item.specialName" severity="warn" class="special-tag" />
                </div>
                <span class="schedule-time">{{ item.hours }}</span>
              </div>
            </div>
          </div>

          <div class="panel-a-sep" />

          <!-- Contact info -->
          <div class="panel-a-section">
            <div class="panel-a-header">
              <h2 class="panel-a-title">{{ t('contacts.contact.title') }}</h2>
            </div>
            <div class="contact-list">
              <button class="contact-row-a" @click="sendEmail">
                <i class="pi pi-envelope contact-icon-a" />
                <div class="contact-text">
                  <span class="contact-label">{{ t('contacts.contact.email') }}</span>
                  <span class="contact-value">barromagna.cervia@gmail.com</span>
                </div>
                <i class="pi pi-chevron-right arrow" />
              </button>
              <button class="contact-row-a" @click="callNadia">
                <i class="pi pi-phone contact-icon-a" />
                <div class="contact-text">
                  <span class="contact-label">Nadia</span>
                  <span class="contact-value">+39 339 59 36 104</span>
                </div>
                <i class="pi pi-chevron-right arrow" />
              </button>
              <button class="contact-row-a" @click="callMattia">
                <i class="pi pi-phone contact-icon-a" />
                <div class="contact-text">
                  <span class="contact-label">Mattia</span>
                  <span class="contact-value">+39 347 37 46 945</span>
                </div>
                <i class="pi pi-chevron-right arrow" />
              </button>
            </div>
          </div>

          <div class="panel-a-sep" />

          <!-- WhatsApp -->
          <div class="panel-a-section">
            <div class="panel-a-header">
              <h2 class="panel-a-title">WhatsApp</h2>
            </div>
            <div class="whatsapp-btns">
              <Button label="Nadia" icon="pi pi-whatsapp" severity="success" class="whatsapp-btn" @click="openWhatsAppNadia" />
              <Button label="Mattia" icon="pi pi-whatsapp" severity="success" class="whatsapp-btn" @click="openWhatsAppMattia" />
            </div>
          </div>

        </div>


        <!-- ========================================================= -->
        <!-- RIGHT COLUMN — MAP                                        -->
        <!-- ========================================================= -->
        <div class="right-col">
          <div id="map" class="map-card">
            <div class="map-embed">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14354.81212491558!2d12.269249098475342!3d44.25378708035667!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132cb1f33caaf7d7%3A0xef2fc4fe22e8018e!2sBar%20Romagna!5e0!3m2!1sit!2sit!4v1767721090967!5m2!1sit!2sit"
                width="100%"
                height="100%"
                style="border:0"
                allowfullscreen
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                :title="t('contacts.map.title')"
              />
            </div>
            <div class="map-footer" @click="openMaps">
              <i class="pi pi-map-marker map-pin" />
              <div>
                <p class="map-name">Bar Romagna</p>
                <p class="map-addr">{{ t('contacts.map.address') }}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

  </div>
</template>


<style scoped lang="scss">
// ============================================================
// Typography: all heading font families (h1, h2) are set
// globally in assets/scss/theme.scss — do NOT override
// font-family anywhere in this file.
// h1/h2 → BigChunko   |   h3–h6 → Roboto
// ============================================================

// ── Spacing tokens ──────────────────────────────────────────
$px:      1rem;
$px-md:   2rem;
$gap:     1.25rem;
$gap-lg:  2rem;
$r:       16px;
$r-sm:    10px;

// ── Page shell ───────────────────────────────────────────────
.page {
  display: flex;
  flex-direction: column;
}

// ── Hero shared ──────────────────────────────────────────────
.hero-wrap {
  padding: 0;
}

.hero-badge { align-self: flex-start; }

.hero-ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}


// ============================================================
// HERO B — MANIFESTO
// Split screen: editorial blue panel left, photo right
// ============================================================
.hero {
  position: relative;
  width: 100%;
  border-radius: $r;
  overflow: hidden;
}

.hero-b {
  display: flex;
  flex-direction: column;
  height: auto;
  border-radius: $r;
  overflow: hidden;

  @media (min-width: 768px) {
    flex-direction: row;
    height: 560px;
  }
  @media (min-width: 1280px) { height: 620px; }
}

.hero-b-panel {
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
    padding: 2.5rem 2.5rem;
    gap: 0;
  }

  @media (min-width: 1280px) {
    padding: 3rem 3rem;
  }
}

.hero-b-photo {
  width: 100%;
  height: 260px;
  flex-shrink: 0;

  @media (min-width: 768px) {
    flex: 1;
    height: auto;
    flex-shrink: 1;
  }
}

.hero-b-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: right center;
}

.hero-b-content { display: flex; flex-direction: column; gap: 0; }

.hero-b-title {
  margin: 0 0 1rem;
  line-height: 1.0;
  font-size: clamp(1.75rem, 5.5vw, 3.5rem);
  color: white;
}

.hero-b-rule {
  border: none;
  border-top: 3px solid var(--p-orange-500);
  width: 64px;
  margin: 0 0 1.25rem;
}

.hero-b-sub {
  margin: 0 0 1.75rem;
  font-size: 0.9375rem;
  line-height: 1.6;
  color: rgba(255,255,255,0.82);
  max-width: 380px;
}

.hero-b-outline-btn {
  --p-button-secondary-border-color: rgba(255,255,255,0.5);
  --p-button-secondary-color: white;
  --p-button-secondary-background: transparent;
  --p-button-secondary-hover-background: rgba(255,255,255,0.12);
  --p-button-secondary-hover-border-color: white;
  --p-button-secondary-hover-color: white;
}


// ============================================================
// CONTENT GRID (shared)
// ============================================================
.content-wrap {
  margin-top: $gap;
  @media (min-width: 768px) { margin-top: $gap-lg; }
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: $gap;
  align-items: start;

  @media (min-width: 1024px) {
    grid-template-columns: 420px 1fr;
    gap: $gap-lg;
    align-items: start;
  }

  @media (min-width: 1280px) {
    grid-template-columns: 460px 1fr;
  }
}

.left-col {
  border-radius: $r;
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
}

// ============================================================
// Shared schedule / contact sub-components
// ============================================================
.schedule-list {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.schedule-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.5rem;
  border-radius: $r-sm;
  transition: background 0.1s ease;

  &.is-closed {
    .schedule-day  { color: var(--p-text-muted-color); }
    .schedule-time { color: var(--p-text-muted-color); font-weight: 400; }
  }
}

.schedule-day-wrap { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; }
.schedule-day  { font-weight: 500; font-size: 0.9375rem; }
.schedule-time { font-weight: 700; font-size: 0.9375rem; white-space: nowrap; }
.special-tag   { font-size: 0.7rem; }

.contact-list { display: flex; flex-direction: column; gap: 0.125rem; }

.contact-text {
  display: flex;
  flex-direction: column;
  gap: 0.075rem;
  flex: 1;
  min-width: 0;
}

.contact-label {
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: var(--p-orange-500);
}

.contact-value {
  font-size: 0.9375rem;
  color: var(--p-text-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.arrow {
  color: var(--p-surface-600);
  font-size: 0.875rem;
  flex-shrink: 0;
}

.whatsapp-btns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.whatsapp-btn { width: 100%; }


// ============================================================
// PANEL A — TRATTORIA
// Clean white, amber rules, BigChunko h2 titles in primary blue
// ============================================================
.panel-a-col {
  background: var(--p-surface-0);
  border: 1px solid var(--p-surface-200);
  box-shadow: 0 2px 12px rgba(0,0,0,0.05);
}

.panel-a-section { display: flex; flex-direction: column; }

.panel-a-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.panel-a-title {
  margin: 0;
  color: var(--p-primary-color);
}

.panel-a-sep {
  height: 2px;
  background: var(--p-orange-500);
  margin: 1.5rem 0;
  opacity: 0.45;
  border-radius: 1px;
}

.contact-row-a {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  padding: 0.625rem 0.375rem;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: $r-sm;
  width: 100%;
  text-align: left;
  transition: background 0.15s ease;

  &:hover { background: rgba(3, 88, 248, 0.06); }
}

.contact-icon-a {
  font-size: 1.125rem;
  color: var(--p-primary-color);
  flex-shrink: 0;
  width: 20px;
  text-align: center;
}


// ============================================================
// RIGHT COLUMN — MAP
// ============================================================
.right-col {
  @media (min-width: 1024px) {
    position: sticky;
    top: 70px;
    height: calc(100vh - 70px - 2rem);
  }
}

.map-card {
  border-radius: $r;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: auto;
  border: 1px solid var(--p-surface-200);

  @media (min-width: 1024px) { height: 100%; }
}

.map-embed {
  flex-shrink: 0;
  height: 320px;

  @media (min-width: 768px) { height: 440px; }

  @media (min-width: 1024px) {
    flex: 1 1 0;
    height: 0;
    min-height: 0;
  }

  iframe {
    display: block;
    width: 100%;
    height: 100%;
  }
}

.map-footer {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  background: var(--p-surface-0);
  border-top: 1px solid var(--p-surface-200);
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover { background: var(--p-surface-50); }
}

.map-pin {
  font-size: 1.25rem;
  color: var(--p-orange-500);
  flex-shrink: 0;
}

.map-name {
  margin: 0 0 0.1rem;
  font-weight: 700;
  font-size: 0.9375rem;
  color: var(--p-text-color);
}

.map-addr {
  margin: 0;
  font-size: 0.875rem;
  color: var(--p-text-muted-color);
}
</style>
