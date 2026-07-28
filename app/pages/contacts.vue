<script setup lang="ts">
// Typography: all heading font families are set globally in assets/scss/theme.scss.
// Do not override font-family anywhere in this file's scoped styles.

import { useSchedule } from '@/composables/useSchedule'
import { barSchedules } from '@/utils/schedule'

const { t } = useI18n()
const { barStatus, displaySchedule } = useSchedule(barSchedules)
const route = useRoute()

const heroStyle = computed(() => (route.query.hero as string) ?? 'B')
const panelStyle = computed(() => (route.query.panel as string) ?? 'A')
const isDev = process.env.NODE_ENV !== 'production'

const openMaps = () =>
  window.open(
    'https://www.google.com/maps/place/Bar+Romagna/@44.2524022,12.3110341,11.82z/data=!4m6!3m5!1s0x132cb1f33caaf7d7:0xef2fc4fe22e8018e!8m2!3d44.2562331!4d12.2766308',
    '_blank'
  )

const callNadia   = () => { window.location.href = 'tel:+393395936104' }
const callMattia  = () => { window.location.href = 'tel:+393473746945' }
const sendEmail   = () => { window.location.href = 'mailto:barromagna.cervia@gmail.com' }
const openWhatsAppNadia  = () => window.open('https://wa.me/393395936104', '_blank')
const openWhatsAppMattia = () => window.open('https://wa.me/393473746945', '_blank')
</script>

<template>
  <div class="page">

    <!-- ============================================================ -->
    <!-- DEV STYLE SWITCHER (hidden in production)                    -->
    <!-- ============================================================ -->
    <div v-if="isDev" class="dev-switcher">
      <span class="dev-label">HERO:</span>
      <NuxtLink :to="{ query: { ...$route.query, hero: 'A' } }" :class="{ active: heroStyle === 'A' }">A</NuxtLink>
      <NuxtLink :to="{ query: { ...$route.query, hero: 'B' } }" :class="{ active: heroStyle === 'B' }">B</NuxtLink>
      <NuxtLink :to="{ query: { ...$route.query, hero: 'C' } }" :class="{ active: heroStyle === 'C' }">C</NuxtLink>
      <span class="dev-sep">|</span>
      <span class="dev-label">PANEL:</span>
      <NuxtLink :to="{ query: { ...$route.query, panel: 'A' } }" :class="{ active: panelStyle === 'A' }">A</NuxtLink>
      <NuxtLink :to="{ query: { ...$route.query, panel: 'B' } }" :class="{ active: panelStyle === 'B' }">B</NuxtLink>
      <NuxtLink :to="{ query: { ...$route.query, panel: 'C' } }" :class="{ active: panelStyle === 'C' }">C</NuxtLink>
    </div>


    <!-- ============================================================ -->
    <!-- HERO A — TRAMONTO                                            -->
    <!-- Full-bleed photo, warm amber-to-blue gradient overlay        -->
    <!-- ============================================================ -->
    <section v-if="heroStyle === 'A'" class="hero-wrap">
      <div class="hero hero-a">
        <img src="/bar-view.jpg" alt="Bar Romagna" class="hero-img hero-a-img" />
        <div class="hero-a-overlay">
          <Tag
            :value="barStatus.label"
            icon="pi pi-circle-fill"
            :severity="barStatus.severity"
            class="hero-badge"
          />
          <div class="hero-body">
            <h1 class="hero-a-title">
              {{ t('contacts.hero.title').split('\n')[0] }}<br>
              {{ t('contacts.hero.title').split('\n')[1] }}
            </h1>
            <p class="hero-sub">{{ t('contacts.hero.subtitle') }}</p>
            <div class="hero-ctas">
              <Button
                :label="t('contacts.actions.viewMenu')"
                icon="pi pi-book"
                severity="warn"
                size="large"
                @click="() => navigateTo('/menu')"
              />
              <Button
                :label="t('contacts.actions.directions')"
                icon="pi pi-map-marker"
                size="large"
                class="hero-outline-btn"
                @click="openMaps"
              />
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- ============================================================ -->
    <!-- HERO B — MANIFESTO                                           -->
    <!-- Split: deep blue editorial panel left, photo right          -->
    <!-- ============================================================ -->
    <section v-else-if="heroStyle === 'B'" class="hero-wrap">
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
                @click="() => navigateTo('/menu')"
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
    <!-- HERO C — INSEGNA                                             -->
    <!-- Cream background, oversized shop-sign title, inset photo    -->
    <!-- ============================================================ -->
    <section v-else class="hero-wrap">
      <div class="hero-c">
        <div class="hero-c-text">
          <Tag
            :value="barStatus.label"
            icon="pi pi-circle-fill"
            :severity="barStatus.severity"
            class="hero-badge hero-c-badge"
          />
          <p class="hero-c-eyebrow">dal 1982 · Cervia, Romagna</p>
          <h1 class="hero-c-title">Bar<br>Romagna</h1>
          <div class="hero-c-rule" />
          <p class="hero-c-sub">{{ t('contacts.hero.subtitle') }}</p>
          <div class="hero-ctas">
            <Button
              :label="t('contacts.actions.viewMenu')"
              icon="pi pi-book"
              severity="warn"
              size="large"
              @click="() => navigateTo('/menu')"
            />
            <Button
              :label="t('contacts.actions.directions')"
              icon="pi pi-map-marker"
              severity="secondary"
              size="large"
              @click="openMaps"
            />
          </div>
        </div>
        <div class="hero-c-photo-wrap">
          <img src="/bar-view.jpg" alt="Bar Romagna" class="hero-c-photo" />
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
        <div v-if="panelStyle === 'A'" class="left-col panel-a-col">

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
        <!-- PANEL B — MINIMAL ITALIAN                                  -->
        <!-- White, typographic, numbered sections, left-border hover  -->
        <!-- ========================================================= -->
        <div v-else-if="panelStyle === 'B'" class="left-col panel-b-col">

          <!-- Opening hours -->
          <div class="panel-b-section">
            <div class="panel-b-header">
              <span class="panel-b-num">01</span>
              <h2 class="panel-b-title">{{ t('contacts.schedule.title') }}</h2>
              <Tag
                :value="barStatus.label"
                icon="pi pi-circle-fill"
                :severity="barStatus.severity"
                class="panel-b-tag"
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

          <hr class="panel-b-hr" />

          <!-- Contact info -->
          <div class="panel-b-section">
            <div class="panel-b-header">
              <span class="panel-b-num">02</span>
              <h2 class="panel-b-title">{{ t('contacts.contact.title') }}</h2>
            </div>
            <div class="contact-list">
              <button class="contact-row-b" @click="sendEmail">
                <i class="pi pi-envelope contact-icon-b" />
                <div class="contact-text">
                  <span class="contact-label">{{ t('contacts.contact.email') }}</span>
                  <span class="contact-value">barromagna.cervia@gmail.com</span>
                </div>
              </button>
              <button class="contact-row-b" @click="callNadia">
                <i class="pi pi-phone contact-icon-b" />
                <div class="contact-text">
                  <span class="contact-label">Nadia</span>
                  <span class="contact-value">+39 339 59 36 104</span>
                </div>
              </button>
              <button class="contact-row-b" @click="callMattia">
                <i class="pi pi-phone contact-icon-b" />
                <div class="contact-text">
                  <span class="contact-label">Mattia</span>
                  <span class="contact-value">+39 347 37 46 945</span>
                </div>
              </button>
            </div>
          </div>

          <hr class="panel-b-hr" />

          <!-- WhatsApp -->
          <div class="panel-b-section">
            <div class="panel-b-header">
              <span class="panel-b-num">03</span>
              <h2 class="panel-b-title">WhatsApp</h2>
            </div>
            <div class="whatsapp-btns">
              <Button label="Nadia" icon="pi pi-whatsapp" severity="success" class="whatsapp-btn" @click="openWhatsAppNadia" />
              <Button label="Mattia" icon="pi pi-whatsapp" severity="success" class="whatsapp-btn" @click="openWhatsAppMattia" />
            </div>
          </div>

        </div>


        <!-- ========================================================= -->
        <!-- PANEL C — NEWSPAPER                                        -->
        <!-- Warm tint, overline titles, two-column sub-grid at desktop -->
        <!-- ========================================================= -->
        <div v-else class="left-col panel-c-col">

          <!-- Two-column sub-grid: schedule | contacts -->
          <div class="panel-c-grid">

            <!-- Schedule -->
            <div class="panel-c-section">
              <h2 class="panel-c-title">{{ t('contacts.schedule.title') }}</h2>
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

            <!-- Contacts -->
            <div class="panel-c-section">
              <div class="panel-c-status-row">
                <h2 class="panel-c-title">{{ t('contacts.contact.title') }}</h2>
                <Tag
                  :value="barStatus.label"
                  icon="pi pi-circle-fill"
                  :severity="barStatus.severity"
                />
              </div>
              <div class="contact-list">
                <button class="contact-row-c" @click="sendEmail">
                  <i class="pi pi-envelope contact-icon-c" />
                  <div class="contact-text">
                    <span class="contact-label">{{ t('contacts.contact.email') }}</span>
                    <span class="contact-value">barromagna.cervia@gmail.com</span>
                  </div>
                </button>
                <button class="contact-row-c" @click="callNadia">
                  <i class="pi pi-phone contact-icon-c" />
                  <div class="contact-text">
                    <span class="contact-label">Nadia</span>
                    <span class="contact-value">+39 339 59 36 104</span>
                  </div>
                </button>
                <button class="contact-row-c" @click="callMattia">
                  <i class="pi pi-phone contact-icon-c" />
                  <div class="contact-text">
                    <span class="contact-label">Mattia</span>
                    <span class="contact-value">+39 347 37 46 945</span>
                  </div>
                </button>
              </div>
            </div>

          </div>

          <hr class="panel-c-hr" />

          <!-- WhatsApp -->
          <div class="panel-c-section panel-c-whatsapp">
            <h2 class="panel-c-title">WhatsApp</h2>
            <div class="whatsapp-btns">
              <Button label="Nadia" icon="pi pi-whatsapp" severity="success" class="whatsapp-btn" @click="openWhatsAppNadia" />
              <Button label="Mattia" icon="pi pi-whatsapp" severity="success" class="whatsapp-btn" @click="openWhatsAppMattia" />
            </div>
          </div>

        </div>


        <!-- ========================================================= -->
        <!-- RIGHT COLUMN — MAP (shared across all panel variants)     -->
        <!-- ========================================================= -->
        <div class="right-col">
          <div class="map-card">
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

// ── Dev switcher ─────────────────────────────────────────────
.dev-switcher {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 9999;
  background: var(--p-primary-900);
  color: white;
  padding: 0.5rem 0.875rem;
  border-radius: 999px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  box-shadow: 0 4px 16px rgba(0,0,0,0.35);

  a {
    color: rgba(255,255,255,0.55);
    text-decoration: none;
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    transition: background 0.15s;

    &:hover { background: rgba(255,255,255,0.15); color: white; }
    &.active { background: var(--p-orange-500); color: white; }
  }
}

.dev-label { color: rgba(255,255,255,0.45); letter-spacing: 0.05em; }
.dev-sep   { color: rgba(255,255,255,0.25); }

// ── Hero shared ──────────────────────────────────────────────
.hero-wrap {
  // horizontal gutters handled by layout's .main-content
  padding: 0;
}

.hero-badge { align-self: flex-start; }

.hero-sub {
  margin: 0 0 1.75rem;
  opacity: 0.92;
  font-size: clamp(0.9375rem, 2vw, 1.0625rem);
  line-height: 1.55;
  max-width: 520px;
}

.hero-ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}


// ============================================================
// HERO A — TRAMONTO
// Full-bleed photo, warm amber-to-blue gradient
// ============================================================
.hero {
  position: relative;
  width: 100%;
  border-radius: $r;
  overflow: hidden; // hero-b overrides this via its own block
}

.hero-a {
  height: 480px;
  @media (min-width: 768px)  { height: 540px; }
  @media (min-width: 1280px) { height: 600px; }
}

.hero-a-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 35%;
}

.hero-a-overlay {
  position: absolute;
  inset: 0;
  // warm amber midtone bleeds into the deep primary blue at the bottom
  background: linear-gradient(
    175deg,
    rgba(0,0,0,0.08) 0%,
    rgba(227, 120, 10, 0.45) 38%,
    rgba(3, 88, 248, 0.82) 65%,
    rgba(3, 88, 248, 0.96) 100%
  );
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (min-width: 768px)  { padding: 2.5rem; }
  @media (min-width: 1280px) { padding: 3rem; }
}

.hero-body { color: white; max-width: 680px; }

.hero-a-title {
  // h1 — BigChunko comes from theme.scss, no font-family override here
  margin: 0 0 0.875rem;
  line-height: 1.05;
  font-size: clamp(2.25rem, 6vw, 4rem);
  color: white;
  text-shadow: 0 2px 20px rgba(0,0,0,0.3);
}

.hero-outline-btn {
  --p-button-secondary-border-color: rgba(255,255,255,0.65);
  --p-button-secondary-color: white;
  --p-button-secondary-background: transparent;
  --p-button-secondary-hover-background: rgba(255,255,255,0.15);
  --p-button-secondary-hover-border-color: white;
  --p-button-secondary-hover-color: white;
}


// ============================================================
// HERO B — MANIFESTO
// Split screen: editorial blue panel left, photo right
// ============================================================
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
  // ensure panel never shrinks below its content on mobile
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
  height: 260px; // visible photo strip on mobile
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

.hero-b-eyebrow {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--p-orange-400);
  margin-bottom: 0.875rem;
}

.hero-b-title {
  // h1 — BigChunko from theme.scss
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
// HERO C — INSEGNA
// Cream background, oversized shop-sign title, portrait photo
// ============================================================
.hero-c {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2.5rem $px;
  background: var(--p-surface-500);
  border-radius: $r;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    padding: 3rem $px-md;
    gap: 4rem;
  }
}

.hero-c-text {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.hero-c-badge { margin-bottom: 1.25rem; }

.hero-c-eyebrow {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--p-primary-color);
  margin-bottom: 0.5rem;
  opacity: 0.7;
}

.hero-c-title {
  // h1 — BigChunko from theme.scss
  margin: 0 0 0.5rem;
  line-height: 0.95;
  font-size: clamp(4rem, 12vw, 8rem);
  color: var(--p-primary-800);
  letter-spacing: -0.02em;
}

.hero-c-rule {
  width: 72px;
  height: 4px;
  background: var(--p-orange-500);
  border-radius: 2px;
  margin: 0.75rem 0 1.5rem;
}

.hero-c-sub {
  font-size: 1rem;
  line-height: 1.65;
  color: var(--p-text-color);
  max-width: 440px;
  margin-bottom: 2rem;
}

.hero-c-photo-wrap {
  width: 100%;
  max-height: 340px;
  border-radius: $r;
  overflow: hidden;
  box-shadow: 0 12px 40px rgba(3, 88, 248, 0.18);

  @media (min-width: 768px) {
    width: 340px;
    flex-shrink: 0;
    max-height: none;
    height: 420px;
  }

  @media (min-width: 1280px) {
    width: 400px;
    height: 480px;
  }
}

.hero-c-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 30%;
}


// ============================================================
// CONTENT GRID (shared)
// ============================================================
.content-wrap {
  // vertical spacing between hero and content grid
  // layout's .main-content already provides 2rem top/bottom
  // we only need the gap between the hero section and this section
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

// Shared left-col base
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
  // h2 — BigChunko from theme.scss, no override needed
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

// Contact rows — icon inline, no background circle
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
// PANEL B — MINIMAL ITALIAN
// White, typographic, numbered, left-border hover accent
// ============================================================
.panel-b-col {
  background: var(--p-surface-0);
  border: 1px solid var(--p-surface-200);
  box-shadow: 0 2px 12px rgba(0,0,0,0.05);
}

.panel-b-section { display: flex; flex-direction: column; }

.panel-b-header {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  margin-bottom: 1.125rem;
}

.panel-b-num {
  font-size: 0.75rem;
  font-weight: 900;
  color: var(--p-orange-500);
  letter-spacing: 0.06em;
  flex-shrink: 0;
  line-height: 1;
  padding-top: 0.2rem;
}

.panel-b-title {
  // h2 — BigChunko from theme.scss
  margin: 0;
  color: var(--p-text-color);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.panel-b-tag { margin-left: auto; }

.panel-b-hr {
  border: none;
  border-top: 1px solid var(--p-surface-200);
  margin: 1.5rem 0;
}

// Contact rows — left border slides in on hover
.contact-row-b {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  padding: 0.625rem 0.625rem 0.625rem 0.75rem;
  border: none;
  background: transparent;
  cursor: pointer;
  width: 100%;
  text-align: left;
  border-left: 3px solid transparent;
  transition: border-color 0.18s ease, padding-left 0.18s ease;

  &:hover {
    border-left-color: var(--p-primary-color);
    padding-left: 1.125rem;
  }
}

.contact-icon-b {
  font-size: 1.0625rem;
  color: var(--p-primary-color);
  flex-shrink: 0;
  width: 20px;
  text-align: center;
}


// ============================================================
// PANEL C — NEWSPAPER
// Warm tint, overline h2 titles, two-column sub-grid
// ============================================================
.panel-c-col {
  background: var(--p-surface-100);
  border: 1px solid var(--p-surface-300);
  gap: 0;
}

.panel-c-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
}

.panel-c-section { display: flex; flex-direction: column; }

.panel-c-status-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.panel-c-title {
  // h2 — BigChunko from theme.scss
  margin: 0 0 1rem;
  color: var(--p-primary-color);
  border-top: 3px solid var(--p-primary-color);
  padding-top: 0.625rem;
  font-variant: small-caps;
}

.panel-c-status-row .panel-c-title { margin-bottom: 0; }

.panel-c-hr {
  border: none;
  border-top: 1px solid var(--p-surface-300);
  margin: 1.5rem 0;
}

.panel-c-whatsapp { padding-top: 0; }

// Contact rows — minimal, editorial
.contact-row-c {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0;
  border: none;
  background: transparent;
  cursor: pointer;
  width: 100%;
  text-align: left;
  border-bottom: 1px solid var(--p-surface-300);
  transition: background 0.15s ease;

  &:last-child { border-bottom: none; }

  &:hover { background: var(--p-surface-200); margin: 0 -0.375rem; padding-left: 0.375rem; padding-right: 0.375rem; }
}

.contact-icon-c {
  font-size: 1rem;
  color: var(--p-orange-500);
  flex-shrink: 0;
  width: 18px;
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
