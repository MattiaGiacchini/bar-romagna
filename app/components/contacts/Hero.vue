<script setup lang="ts">
// Contacts hero — "Manifesto" split: editorial blue panel left, photo right.
interface BarStatus { status: string; label: string; severity: 'warn' | 'primary' }

defineProps<{ status: BarStatus }>()

const { t } = useI18n()
const analytics = useAnalytics()

const MAPS_URL =
  'https://www.google.com/maps/place/Bar+Romagna/@44.2524022,12.3110341,11.82z/data=!4m6!3m5!1s0x132cb1f33caaf7d7:0xef2fc4fe22e8018e!8m2!3d44.2562331!4d12.2766308'

const goToMenu = () => { analytics.trackCta('menu', 'contacts_hero'); navigateTo('/menu') }
const openMaps = () => { analytics.trackDirections('contacts'); window.open(MAPS_URL, '_blank') }
</script>

<template>
  <section class="hero-wrap">
    <div class="hero hero-b">
      <!-- Left: editorial panel -->
      <div class="hero-b-panel">
        <Tag
          :value="status.label"
          icon="pi pi-circle-fill"
          :severity="status.severity"
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
</template>

<style scoped lang="scss">
// h1 — BigChunko from theme.scss. No font-family override.
$r: 16px;

.hero-wrap { padding: 0; }
.hero-badge { align-self: flex-start; }
.hero-ctas { display: flex; flex-wrap: wrap; gap: 0.75rem; }

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
  @media (min-width: 1280px) { padding: 3rem 3rem; }
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
</style>
