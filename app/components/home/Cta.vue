<script setup lang="ts">
// Full-bleed primary-blue closing CTA (menu + directions).
const { t } = useI18n()
const analytics = useAnalytics()

const goToMenu = () => { analytics.trackCta('menu', 'home_footer_cta'); navigateTo('/menu') }
const goToDirections = () => { analytics.trackCta('directions', 'home_footer_cta'); navigateTo('/contacts#map') }
</script>

<template>
  <div class="ct ct4">
    <h2 class="ct4-title">{{ t('home.cta.title') }}</h2>
    <p class="ct4-sub">{{ t('home.cta.subtitle') }}</p>
    <div class="hero-ctas ct-btns">
      <Button :label="t('home.cta.menu')" icon="pi pi-book" severity="warn" size="large" @click="goToMenu" />
      <Button :label="t('home.cta.directions')" icon="pi pi-map-marker" size="large" class="ct4-outline-btn" @click="goToDirections" />
    </div>
  </div>
</template>

<style scoped lang="scss">
// h2 — BigChunko from theme.scss. No font-family override.
$r: 16px;

.hero-ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}
.ct-btns { justify-content: center; }

.ct4 { background: var(--p-surface-500); border-radius: $r; padding: 3.5rem 2rem; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 1rem; }
.ct4-title { margin: 0; color: var(--p-primary-800); font-size: clamp(1.75rem, 5vw, 3.25rem); }
.ct4-sub { margin: 0; font-size: 1rem; line-height: 1.6; color: var(--p-primary-800); max-width: 480px; }
.ct4-outline-btn {
  --p-button-secondary-border-color: rgba(255,255,255,0.5);
  --p-button-secondary-color: white;
  --p-button-secondary-background: transparent;
  --p-button-secondary-hover-background: rgba(255,255,255,0.12);
  --p-button-secondary-hover-border-color: white;
  --p-button-secondary-hover-color: white;
}
</style>
