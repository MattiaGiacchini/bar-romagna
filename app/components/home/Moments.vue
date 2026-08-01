<script setup lang="ts">
// "Momenti" — three mascotte cards (colazione / aperitivo / serata) with staggered reveal.
import { useRevealList } from '@/composables/useReveal'

const { t } = useI18n()
const { listRef: momentsList, visibleItems: momentsItems } = useRevealList(0.15)

const moments = computed(() => [
  { key: 'colazione', title: t('home.moments.colazione'), desc: t('home.moments.colazioneDesc'), mascotte: '/mascotte/mascotte-croissant.svg' },
  { key: 'aperitivo', title: t('home.moments.aperitivo'), desc: t('home.moments.aperitivoDesc'), mascotte: '/mascotte/mascotte-alcohol.svg' },
  { key: 'serata',    title: t('home.moments.serata'),    desc: t('home.moments.serataDesc'),    mascotte: '/mascotte/mascotte-main.svg' },
])
</script>

<template>
  <div class="mo mo1">
    <h2 class="mo-title">{{ t('home.moments.title') }}</h2>
    <div ref="momentsList" class="mo1-grid">
      <div
        v-for="(m, i) in moments"
        :key="m.key"
        class="mo1-card stagger-item"
        :class="{ visible: momentsItems.has(i) }"
      >
        <img :src="m.mascotte" :alt="m.title" class="mo1-mascotte" />
        <h3 class="mo1-name">{{ m.title }}</h3>
        <p class="mo1-desc">{{ m.desc }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
// h2 — BigChunko, h3 — Roboto (from theme.scss). No font-family override.
.mo-title {
  margin: 0 0 1.25rem;
  color: var(--p-primary-color);
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

.mo1-grid { display: grid; grid-template-columns: 1fr; gap: 1rem; @media (min-width: 640px) { grid-template-columns: repeat(3,1fr); } }
.mo1-card { background: var(--p-surface-500); border-radius: 16px; padding: 1.75rem 1.5rem; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 0.75rem; }
.mo1-mascotte { width: 72px; height: 72px; object-fit: contain; }
.mo1-name { margin: 0; font-weight: 700; color: var(--p-primary-color); }
.mo1-desc { margin: 0; font-size: 0.9rem; line-height: 1.55; color: var(--p-text-muted-color); }
</style>
