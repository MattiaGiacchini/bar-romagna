<script setup lang="ts">
import { menuData } from '@/utils/menu'
import { SITE_URL, business, postalAddressSchema } from '@/utils/business'

// ── SEO ──────────────────────────────────────────────────────
const { t } = useI18n()

useSeoMeta({
  title:              () => t('seo.menu.title'),
  description:        () => t('seo.menu.description'),
  ogTitle:            () => t('seo.menu.title'),
  ogDescription:      () => t('seo.menu.description'),
  ogUrl:              `${SITE_URL}/menu`,
  ogImage:            `${SITE_URL}/bar-view.jpg`,
  ogImageAlt:         'Bar Romagna Cervia — menu caffetteria e aperitivo',
  twitterTitle:       () => t('seo.menu.title'),
  twitterDescription: () => t('seo.menu.description'),
})

// FoodEstablishment + Menu schema — uses t() so item names are in the active locale
const menuJsonLd = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'FoodEstablishment',
  name: business.name,
  url: `${SITE_URL}/menu`,
  telephone: business.telephone,
  priceRange: business.priceRange,
  servesCuisine: ['Caffetteria', 'Aperitivo', 'Cocktail'],
  address: postalAddressSchema,
  hasMenu: {
    '@type': 'Menu',
    name: t('seo.menu.title'),
    url: `${SITE_URL}/menu`,
    hasMenuSection: menuData.map(category => ({
      '@type': 'MenuSection',
      name: t(`menu.categories.${category.id}`),
      hasMenuItem: category.sections.flatMap(section =>
        section.items.map(item => ({
          '@type': 'MenuItem',
          name: t(`menu.items.${item.id}`),
          offers: {
            '@type': 'Offer',
            price: item.price,
            priceCurrency: 'EUR',
          },
        }))
      ),
    })),
  },
}))

useHead(() => ({
  link: [{ rel: 'canonical', href: `${SITE_URL}/menu` }],
  script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(menuJsonLd.value) }],
}))
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
