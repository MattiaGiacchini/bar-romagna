<script setup lang="ts">
import { menuData } from '@/utils/menu'

// ── SEO ──────────────────────────────────────────────────────
const { locale } = useI18n()

const seoTitle = computed(() =>
  locale.value === 'it'
    ? 'Menu — Bar Romagna Cervia | Caffetteria, Aperitivo & Cocktail'
    : 'Menu — Bar Romagna Cervia | Coffee, Aperitivo & Cocktails'
)
const seoDesc = computed(() =>
  locale.value === 'it'
    ? 'Scopri il menu completo del Bar Romagna di Cervia: caffetteria, colazione, aperitivo con Spritz e Negroni, cocktail e bevande. Prezzi onesti, qualità artigianale.'
    : 'Explore the full menu of Bar Romagna in Cervia: coffee bar, breakfast, aperitivo with Spritz and Negroni, cocktails and drinks. Honest prices, artisan quality.'
)

useSeoMeta({
  title:              () => seoTitle.value,
  description:        () => seoDesc.value,
  ogTitle:            () => seoTitle.value,
  ogDescription:      () => seoDesc.value,
  ogUrl:              'https://www.barromagna.com/menu',
  ogImage:            'https://www.barromagna.com/bar-view.jpg',
  ogImageAlt:         'Bar Romagna Cervia — menu caffetteria e aperitivo',
  twitterTitle:       () => seoTitle.value,
  twitterDescription: () => seoDesc.value,
})

useHead({
  link: [{ rel: 'canonical', href: 'https://www.barromagna.com/menu' }],
})
</script>

<template>
  <div class="menu-page">
    <div class="menu-container">
      <!-- LEFT COLUMN — Caffetteria & Bevande -->
      <div class="left-column">
        <MenuCategoryCard :category="menuData[0]" mascotte="/mascotte/mascotte-croissant.svg" mascotte-variant="caffetteria" />
        <MenuCategoryCard :category="menuData[1]" />
      </div>

      <!-- RIGHT COLUMN — Alcolici -->
      <div class="right-column">
        <MenuCategoryCard :category="menuData[2]" mascotte="/mascotte/mascotte-alcohol.svg" mascotte-variant="alcolici" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.menu-page {
  min-height: 100vh;
  background-color: var(--p-surface-50);
}

.menu-container {
  max-width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 1024px) {
    flex-direction: row;
    padding: 0 2rem;
    gap: 2rem;
    align-items: flex-start;
  }

  @media (min-width: 1920px) {
    max-width: 1920px;
  }
}

.left-column,
.right-column {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 1024px) {
    flex: 1;
    gap: 1.5rem;
  }
}
</style>
