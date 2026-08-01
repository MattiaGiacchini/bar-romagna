<script setup lang="ts">
// Events page hero — "Manifesto" style: editorial blue panel + photo.
const { t } = useI18n()
</script>

<template>
  <section class="hero-wrap">
    <div class="hero">
      <div class="hero-panel">
        <div class="hero-body">
          <h1 class="hero-title">
            {{ t('events.hero.title').split('\n')[0] }}<br>
            {{ t('events.hero.title').split('\n')[1] }}
          </h1>
          <hr class="hero-rule" />
          <p class="hero-sub">{{ t('events.hero.subtitle') }}</p>
        </div>
      </div>
      <div class="hero-photo">
        <img src="/bar-view.jpg" alt="Bar Romagna eventi" class="hero-img" />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
// h1 — BigChunko from theme.scss. No font-family override.
$r: 16px;

.hero-wrap { /* gutters from layout .main-content */ }

.hero {
  display: flex;
  flex-direction: column;
  border-radius: $r;
  overflow: hidden;

  @media (min-width: 768px) {
    flex-direction: row;
    height: 520px;
  }
  @media (min-width: 1280px) { height: 580px; }
}

.hero-panel {
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
    padding: 2.5rem;
    gap: 0;
  }
  @media (min-width: 1280px) { padding: 3rem; }
}

.hero-body { display: flex; flex-direction: column; }

.hero-title {
  margin: 0 0 1rem;
  line-height: 1.0;
  font-size: clamp(1.75rem, 5.5vw, 3.5rem);
  color: white;
}

.hero-rule {
  border: none;
  border-top: 3px solid var(--p-orange-500);
  width: 64px;
  margin: 0 0 1.25rem;
}

.hero-sub {
  margin: 0;
  font-size: 0.9375rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.82);
  max-width: 380px;
}

.hero-photo {
  width: 100%;
  height: 240px;
  flex-shrink: 0;

  @media (min-width: 768px) {
    flex: 1;
    height: auto;
  }
}

.hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
}
</style>
