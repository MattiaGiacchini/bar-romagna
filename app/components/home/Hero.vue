<script setup lang="ts">
// Home hero — "Scena": dark moody photo with a floating cream card in the lower third.
// Owns its own scroll-reveal (scale-in).
import { useReveal } from '@/composables/useReveal'

interface BarStatus { status: string; label: string; severity: 'warn' | 'primary' }

defineProps<{ status: BarStatus }>()

const { t } = useI18n()
const analytics = useAnalytics()
const { revealRef, isVisible } = useReveal(0.05)

const goToMenu = () => { analytics.trackCta('menu', 'home_hero'); navigateTo('/menu') }
const goToDirections = () => { analytics.trackCta('directions', 'home_hero'); navigateTo('/contacts#map') }
</script>

<template>
  <section class="hero-wrap">
    <div ref="revealRef" class="h1-scena" :class="{ revealed: isVisible }">
      <img src="/bar-view.jpg" alt="Bar Romagna" class="h1-bg" />
      <div class="h1-overlay" />
      <div class="h1-top">
        <Tag :value="status.label" icon="pi pi-circle-fill" :severity="status.severity" />
      </div>
      <div class="h1-card">
        <h1 class="h1-title">
          {{ t('home.hero.title').split('\n')[0] }}<br>
          {{ t('home.hero.title').split('\n')[1] }}
        </h1>
        <p class="h1-sub">{{ t('home.hero.subtitle') }}</p>
        <div class="hero-ctas">
          <Button :label="t('home.cta.menu')" icon="pi pi-book" severity="warn" size="large" @click="goToMenu" />
          <Button :label="t('home.cta.directions')" icon="pi pi-map-marker" size="large" class="h1-outline-btn" @click="goToDirections" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
// h1 — BigChunko from theme.scss — do NOT override font-family here.
$r: 16px;

.hero-wrap { /* gutters from layout .main-content */ }

.hero-ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

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
</style>
