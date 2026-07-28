<script setup lang="ts">
import { useSchedule } from '@/composables/useSchedule'
import { barSchedules } from '@/utils/schedule'

const { t } = useI18n()
const { barStatus, displaySchedule } = useSchedule(barSchedules)

const openMaps = () =>
  window.open(
    'https://www.google.com/maps/place/Bar+Romagna/@44.2524022,12.3110341,11.82z/data=!4m6!3m5!1s0x132cb1f33caaf7d7:0xef2fc4fe22e8018e!8m2!3d44.2562331!4d12.2766308',
    '_blank'
  )

const callNadia = () => { window.location.href = 'tel:+393395936104' }
const callMattia = () => { window.location.href = 'tel:+393473746945' }
const sendEmail = () => { window.location.href = 'mailto:barromagna.cervia@gmail.com' }
const openWhatsAppNadia = () => window.open('https://wa.me/393395936104', '_blank')
const openWhatsAppMattia = () => window.open('https://wa.me/393473746945', '_blank')
</script>

<template>
  <div class="page">

    <!-- ═══════════════════════════════════════════════ -->
    <!-- HERO                                            -->
    <!-- ═══════════════════════════════════════════════ -->
    <section class="hero-wrap">
      <div class="hero">
        <img src="/bar-view.jpg" alt="Bar Romagna" class="hero-img" />
        <div class="hero-overlay">

          <Tag
            :value="barStatus.label"
            icon="pi pi-circle-fill"
            :severity="barStatus.severity"
            class="hero-badge"
          />

          <div class="hero-body">
            <h1 class="hero-title">
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
                severity="secondary"
                variant="outlined"
                size="large"
                class="hero-directions-btn"
                @click="openMaps"
              />
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════ -->
    <!-- MAIN CONTENT GRID                               -->
    <!-- ═══════════════════════════════════════════════ -->
    <section class="content-wrap">
      <div class="content-grid">

        <!-- ─── LEFT: unified info panel ─── -->
        <div class="left-col">

          <!-- Opening hours -->
          <div class="panel">
            <div class="panel-header">
              <div class="panel-title-group">
                <div class="panel-icon-circle">
                  <i class="pi pi-clock" />
                </div>
                <h2 class="panel-title">{{ t('contacts.schedule.title') }}</h2>
              </div>
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
                  <Tag
                    v-if="item.specialName"
                    :value="item.specialName"
                    severity="warn"
                    class="special-tag"
                  />
                </div>
                <span class="schedule-time">{{ item.hours }}</span>
              </div>
            </div>
          </div>

          <!-- Divider -->
          <div class="panel-sep" />

          <!-- Contact info -->
          <div class="panel">
            <div class="panel-header">
              <div class="panel-title-group">
                <div class="panel-icon-circle">
                  <i class="pi pi-address-book" />
                </div>
                <h2 class="panel-title">{{ t('contacts.contact.title') }}</h2>
              </div>
            </div>

            <div class="contact-list">

              <button class="contact-row" @click="sendEmail">
                <div class="contact-icon-wrap email">
                  <i class="pi pi-envelope" />
                </div>
                <div class="contact-text">
                  <span class="contact-label">{{ t('contacts.contact.email') }}</span>
                  <span class="contact-value">barromagna.cervia@gmail.com</span>
                </div>
                <i class="pi pi-chevron-right arrow" />
              </button>

              <button class="contact-row" @click="callNadia">
                <div class="contact-icon-wrap phone">
                  <i class="pi pi-phone" />
                </div>
                <div class="contact-text">
                  <span class="contact-label">NADIA</span>
                  <span class="contact-value">+39 339 59 36 104</span>
                </div>
                <i class="pi pi-chevron-right arrow" />
              </button>

              <button class="contact-row" @click="callMattia">
                <div class="contact-icon-wrap phone">
                  <i class="pi pi-phone" />
                </div>
                <div class="contact-text">
                  <span class="contact-label">MATTIA</span>
                  <span class="contact-value">+39 347 37 46 945</span>
                </div>
                <i class="pi pi-chevron-right arrow" />
              </button>

            </div>
          </div>

          <!-- Divider -->
          <div class="panel-sep" />

          <!-- WhatsApp -->
          <div class="panel">
            <div class="panel-header">
              <div class="panel-title-group">
                <div class="panel-icon-circle whatsapp">
                  <i class="pi pi-whatsapp" />
                </div>
                <h2 class="panel-title">WhatsApp</h2>
              </div>
            </div>
            <div class="whatsapp-btns">
              <Button
                label="Nadia"
                icon="pi pi-whatsapp"
                severity="success"
                class="whatsapp-btn"
                @click="openWhatsAppNadia"
              />
              <Button
                label="Mattia"
                icon="pi pi-whatsapp"
                severity="success"
                class="whatsapp-btn"
                @click="openWhatsAppMattia"
              />
            </div>
          </div>

        </div>

        <!-- ─── RIGHT: map ─── -->
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
              <div class="map-address-block">
                <i class="pi pi-map-marker map-pin" />
                <div>
                  <p class="map-name">Bar Romagna</p>
                  <p class="map-addr">{{ t('contacts.map.address') }}</p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>

  </div>
</template>

<style scoped lang="scss">
// ═══════════════════════════════════════════
// SPACING TOKENS — one source of truth
// ═══════════════════════════════════════════
$page-x:    1rem;
$page-x-md: 2rem;
$gap-sm:    1rem;
$gap-md:    1.25rem;
$gap-lg:    2rem;
$radius:    16px;
$radius-sm: 10px;

// ═══════════════════════════════════════════
// PAGE SHELL
// ═══════════════════════════════════════════
.page {
  // No min-height: 100vh — that was forcing the section to stretch
  // and creating the white gap between content and footer
  display: flex;
  flex-direction: column;
}

// ═══════════════════════════════════════════
// HERO
// ═══════════════════════════════════════════
.hero-wrap {
  padding: 0 $page-x;
  @media (min-width: 768px) { padding: 0 $page-x-md; }
}

.hero {
  position: relative;
  width: 100%;
  height: 480px;
  border-radius: $radius;
  overflow: hidden;

  @media (min-width: 768px)  { height: 520px; }
  @media (min-width: 1280px) { height: 580px; }
}

.hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 40%;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  // stronger gradient so text is always legible
  background: linear-gradient(
    160deg,
    rgba(0,0,0,0.18) 0%,
    rgba(3,88,248,0.75) 55%,
    rgba(3,88,248,0.92) 100%
  );
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (min-width: 768px)  { padding: 2.5rem; }
  @media (min-width: 1280px) { padding: 3rem; }
}

.hero-badge {
  align-self: flex-start;
}

.hero-body {
  color: white;
  max-width: 640px;
}

.hero-title {
  margin: 0 0 0.875rem;
  line-height: 1.1;
  font-size: clamp(1.875rem, 5vw, 3.25rem);
  // uses BigChunko from the design system
  font-family: 'BigChunko', system-ui, sans-serif;
  text-shadow: 0 2px 12px rgba(0,0,0,0.25);
}

.hero-sub {
  margin: 0 0 1.75rem;
  opacity: 0.93;
  font-size: clamp(0.9375rem, 2vw, 1.0625rem);
  line-height: 1.55;
  max-width: 520px;
}

.hero-ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.hero-directions-btn {
  // white outlined on the blue overlay
  --p-button-secondary-border-color: rgba(255,255,255,0.7);
  --p-button-secondary-color: white;
  --p-button-secondary-hover-background: rgba(255,255,255,0.15);
  --p-button-secondary-hover-border-color: white;
  --p-button-secondary-hover-color: white;
}

// ═══════════════════════════════════════════
// CONTENT GRID
// ═══════════════════════════════════════════
.content-wrap {
  padding: $gap-md $page-x $gap-md;

  @media (min-width: 768px) { padding: $gap-lg $page-x-md $gap-lg; }
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: $gap-md;
  align-items: start;

  @media (min-width: 1024px) {
    grid-template-columns: 420px 1fr;
    gap: $gap-lg;
    align-items: stretch;
  }

  @media (min-width: 1280px) {
    grid-template-columns: 460px 1fr;
  }
}

// ═══════════════════════════════════════════
// LEFT COLUMN — unified panel card
// ═══════════════════════════════════════════
.left-col {
  background: var(--p-surface-0);
  border-radius: $radius;
  border: 1px solid var(--p-surface-200);
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
}

.panel-sep {
  height: 1px;
  background: var(--p-surface-200);
  margin: 1.25rem 0;
}

// Panel sections inside the card
.panel {}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.125rem;
}

.panel-title-group {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.panel-icon-circle {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--p-primary-50);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  i {
    font-size: 1rem;
    color: var(--p-primary-color);
  }

  &.whatsapp {
    background: #dcfce7;
    i { color: #16a34a; }
  }
}

// Title: use the design system h2 (BigChunko) — just set color, no font overrides
.panel-title {
  margin: 0;
  color: var(--p-text-color);
}

// Schedule
.schedule-list {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.schedule-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.625rem;
  border-radius: $radius-sm;
  transition: background 0.1s ease;

  &:hover { background: var(--p-surface-50); }

  &.is-closed {
    .schedule-day  { color: var(--p-text-muted-color); }
    .schedule-time { color: var(--p-text-muted-color); font-weight: 400; }
  }
}

.schedule-day-wrap {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.schedule-day  { font-weight: 500; font-size: 0.9375rem; }
.schedule-time { font-weight: 700; font-size: 0.9375rem; white-space: nowrap; }
.special-tag   { font-size: 0.7rem; }

// Contact list
.contact-list {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.contact-row {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  padding: 0.625rem 0.5rem;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: $radius-sm;
  width: 100%;
  text-align: left;
  transition: background 0.15s ease, transform 0.15s ease;

  &:hover {
    background: var(--p-surface-50);
    transform: translateX(3px);
  }
}

.contact-icon-wrap {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  i { font-size: 1.0625rem; }

  &.email {
    background: #fef9c3;
    i { color: #ca8a04; }
  }
  &.phone {
    background: var(--p-primary-50);
    i { color: var(--p-primary-color); }
  }
}

.contact-text {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  flex: 1;
  min-width: 0;
}

.contact-label {
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
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
  color: var(--p-surface-300);
  font-size: 0.875rem;
  flex-shrink: 0;
}

// WhatsApp
.whatsapp-btns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.whatsapp-btn { width: 100%; }

// ═══════════════════════════════════════════
// RIGHT COLUMN — MAP fills full height
// ═══════════════════════════════════════════
.right-col {
  @media (min-width: 1024px) {
    position: sticky;
    top: 86px;
    height: calc(100vh - 86px - 2rem);
  }
}

// overflow:hidden lives on .map-card so the entire card clips consistently —
// both the iframe top corners AND the footer bottom corners match $radius.
.map-card {
  background: var(--p-surface-0);
  border-radius: $radius;
  border: 1px solid var(--p-surface-200);
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  overflow: hidden; // single clip point — keeps top & bottom radius consistent
  display: flex;
  flex-direction: column;
  height: auto;

  @media (min-width: 1024px) { height: 100%; }
}

// The iframe is clipped by .map-card's overflow:hidden + border-radius.
// We extend the iframe beyond the card edges so the Google place-details
// overlay card (top-left corner) gets its own sharp corners eaten by our clip.
.map-embed {
  width: calc(100% + 32px);
  height: calc(320px + 16px);
  flex-shrink: 0;

  @media (min-width: 768px) { height: calc(440px + 16px); }

  @media (min-width: 1024px) {
    height: 0;
    flex: 1 1 0;
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
  gap: $gap-sm;
  padding: 1rem 1.25rem;
  border-top: 1px solid var(--p-surface-200);
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover { background: var(--p-surface-50); }
}

.map-address-block {
  display: flex;
  align-items: flex-start;
  gap: 0.625rem;
}

.map-pin {
  font-size: 1.25rem;
  color: var(--p-orange-500);
  margin-top: 0.1rem;
  flex-shrink: 0;
}

.map-name {
  margin: 0 0 0.125rem;
  font-weight: 700;
  font-size: 0.9375rem;
}

.map-addr {
  margin: 0;
  font-size: 0.875rem;
  color: var(--p-text-muted-color);
}
</style>
