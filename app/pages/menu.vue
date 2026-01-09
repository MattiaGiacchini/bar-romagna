<script setup lang="ts">
import { menuData } from '@/utils/menu'

// Using nuxt-i18n or vue-i18n
const { t } = useI18n()
</script>

<template>
  <div class="menu-page">

    <!-- ============================================ -->
    <!-- MENU CONTAINER - Two-column layout -->
    <!-- ============================================ -->
    <div class="menu-container">

      <!-- LEFT COLUMN - Caffetteria & Bevande -->
      <div class="left-column">

        <!-- Caffetteria Card -->
        <Card :id="menuData[0].tag">
          <template #content>
            <div class="card-content-wrapper">
              <!-- Floating mascot on desktop -->
              <div class="decorative-image-desktop caffetteria">
                <img src="/mascotte/mascotte-croissant.svg" alt="logo"/>
              </div>

              <h2 class="section-title">{{ t('menu.categories.' + menuData[0].id) }}</h2>

              <div
                  v-for="(section, idx) in menuData[0].sections"
                  :key="idx"
                  class="subsection"
              >
                <!-- Section title with price - now rendered as a regular item -->
                <div v-if="section.id !== 'no_title' && section.id !== 'altri' && section.price" class="menu-item section-item">
                  <span class="item-name section-name">{{ t('menu.sections.' + section.id) }}</span>
                  <span class="item-dots"></span>
                  <span class="item-price">
                    <span class="price-integer">{{ Math.floor(section.price) }}</span>
                    <span class="price-decimal">.{{ String((section.price % 1).toFixed(2)).slice(2) }}€</span>
                  </span>
                </div>

                <div class="menu-items">
                  <div
                      v-for="item in section.items"
                      :key="item.id"
                      class="menu-item"
                      :class="{ 'indent': item.indent, 'variant': item.isVariant }"
                  >
                    <span class="item-name">{{ t('menu.items.' + item.id) }}</span>
                    <span class="item-dots"></span>
                    <span class="item-price" v-if="item.price !== section.price || !item.isVariant">
                      <span class="price-integer">{{ Math.floor(item.price) }}</span>
                      <span class="price-decimal">.{{ String((item.price % 1).toFixed(2)).slice(2) }}€</span>
                    </span>
                  </div>
                </div>
              </div>

              <!-- Mascot on mobile at the end of the card -->
              <div class="decorative-image-mobile">
                <img src="/mascotte/mascotte-croissant.svg" alt="logo"/>
              </div>
            </div>
          </template>
        </Card>

        <!-- Bevande Card -->
        <Card :id="menuData[1].tag">
          <template #content>
            <h2 class="section-title">{{ t('menu.categories.' + menuData[1].id) }}</h2>

            <div
                v-for="(section, idx) in menuData[1].sections"
                :key="idx"
                class="subsection"
            >
              <div class="menu-items">
                <div
                    v-for="item in section.items"
                    :key="item.id"
                    class="menu-item"
                >
                  <span class="item-name">{{ t('menu.items.' + item.id) }}</span>
                  <span class="item-dots"></span>
                  <span class="item-price">
                    <span class="price-integer">{{ Math.floor(item.price) }}</span>
                    <span class="price-decimal">.{{ String((item.price % 1).toFixed(2)).slice(2) }}€</span>
                  </span>
                </div>
              </div>
            </div>
          </template>
        </Card>

      </div>

      <!-- RIGHT COLUMN - Alcolici -->
      <div class="right-column">

        <Card :id="menuData[2].tag">
          <template #content>
            <div class="card-content-wrapper">
              <!-- Floating mascot on desktop -->
              <div class="decorative-image-desktop alcolici">
                <img src="/mascotte/mascotte-alcohol.svg" alt="logo"/>
              </div>

              <h2 class="section-title">{{ t('menu.categories.' + menuData[2].id) }}</h2>

              <div
                  v-for="(section, idx) in menuData[2].sections"
                  :key="idx"
                  class="subsection"
              >
                <!-- Section title with price - now rendered as a regular item -->
                <div v-if="section.id && section.id !== 'no_title' && section.id !== 'altri' && section.price" class="menu-item section-item">
                  <span class="item-name section-name">{{ t('menu.sections.' + section.id) }}</span>
                  <span class="item-dots"></span>
                  <span class="item-price">
                    <span class="price-integer">{{ Math.floor(section.price) }}</span>
                    <span class="price-decimal">.{{ String((section.price % 1).toFixed(2)).slice(2) }}€</span>
                  </span>
                </div>

                <div class="menu-items">
                  <div
                      v-for="item in section.items"
                      :key="item.id"
                      class="menu-item"
                      :class="{ 'indent': item.indent, 'variant': item.isVariant }"
                  >
                    <span class="item-name">{{ t('menu.items.' + item.id) }}</span>
                    <span class="item-dots"></span>
                    <span class="item-price" v-if="item.price !== section.price || !item.isVariant">
                      <span class="price-integer">{{ Math.floor(item.price) }}</span>
                      <span class="price-decimal">.{{ String((item.price % 1).toFixed(2)).slice(2) }}€</span>
                    </span>
                  </div>
                </div>
              </div>

              <!-- Mascot on mobile at the end of the card -->
              <div class="decorative-image-mobile">
                <img src="/mascotte/mascotte-alcohol.svg" alt="logo"/>
              </div>
            </div>
          </template>
        </Card>

      </div>

    </div>

  </div>
</template>

<style scoped lang="scss">
.menu-page {
  min-height: 100vh;
  background-color: var(--p-surface-50);
}

// ============================================
// MENU CONTAINER
// ============================================
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

// Wrapper to contain the floating mascot
.card-content-wrapper {
  position: relative;
}

// ============================================
// SECTION STYLES
// ============================================
.section-title {
  color: var(--p-primary-color);
  margin: 0 0 0.75rem 0; // Reduced from 1.5rem to 0.75rem
  padding-bottom: 0.5rem;
  font-size: 1.5rem;
  font-weight: 700;
}

.subsection {
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
}

// Section item (e.g. Coffee 1.40€) - same style as regular items
.section-item {
  margin-bottom: 0.5rem;

  .section-name {
    font-weight: 600 !important;
    font-size: 1.05rem !important;
  }
}

// ============================================
// MENU ITEMS - Price alignment by decimals
// ============================================
.menu-items {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.menu-item {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: baseline;
  gap: 0.5rem;

  &.indent {
    padding-left: 1.5rem;

    .item-name {
      font-weight: 400;
      font-size: 0.95rem;
    }
  }

  // Style for variants (e.g. decaf, with milk...)
  &.variant {
    padding-left: 1.5rem;

    .item-name {
      font-weight: 400;
      font-size: 0.9rem;
    }
  }
}

.item-name {
  color: var(--p-primary-color);
  font-weight: 500;
  white-space: nowrap;
  position: relative;
  z-index: 3; // Above the mascot
}

.item-dots {
  border-bottom: 2px dotted var(--p-primary-color);
  opacity: 0.3;
  min-width: 20px;
  margin: 0 0.25rem;
  height: 1px;
  align-self: flex-end;
  margin-bottom: 0.35rem;
  position: relative;
  z-index: 1; // Below the mascot (which has z-index: 2)
}

.item-price {
  display: inline-flex;
  align-items: baseline;
  color: var(--p-primary-color);
  font-weight: 600;
  white-space: nowrap;
  justify-content: flex-end;
  min-width: 65px;
  position: relative;
  z-index: 3; // Above the mascot
}

.price-integer {
  text-align: right;
  min-width: 20px;
  display: inline-block;
}

.price-decimal {
  // Same size as integer
}

// ============================================
// DECORATIVE IMAGES
// ============================================

// Mobile: at the end of each card
.decorative-image-mobile {
  display: block;
  margin-top: 2rem;
  margin-left: auto;
  margin-right: auto;
  max-width: 150px;
  opacity: 0.25;

  img {
    width: 100%;
  }

  @media (min-width: 768px) {
    display: none;
  }
}

// Desktop: floating inside the card
.decorative-image-desktop {
  display: none;

  @media (min-width: 768px) {
    display: block;
    position: absolute;
    opacity: 0.15;
    z-index: 2; // Above dots but below text
    pointer-events: none;

    img {
      width: 100%;
    }
  }

  // Caffetteria - centered inside the card
  &.caffetteria {
    @media (min-width: 768px) {
      left: 50%;
      transform: translateX(-50%) rotate(-5deg);
      top: 120px;
      width: 280px;
    }

    @media (min-width: 1024px) {
      top: 150px;
      width: 320px;
      transform: translateX(-50%) rotate(-8deg);
    }

    @media (min-width: 1400px) {
      top: 180px;
      width: 360px;
      transform: translateX(-50%) rotate(-10deg);
    }
  }

  // Alcolici - centered inside the card
  &.alcolici {
    @media (min-width: 768px) {
      left: 50%;
      transform: translateX(-50%) rotate(5deg);
      top: 150px;
      width: 280px;
    }

    @media (min-width: 1024px) {
      top: 180px;
      width: 320px;
      transform: translateX(-50%) rotate(8deg);
    }

    @media (min-width: 1400px) {
      top: 220px;
      width: 360px;
      transform: translateX(-50%) rotate(10deg);
    }
  }
}

// Ensure content stays above the mascot
.section-title,
.subsection,
.menu-items {
  position: relative;
  z-index: 3;
}
</style>