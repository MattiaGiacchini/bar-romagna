<script setup lang="ts">
// A single menu category card (caffetteria / bevande / alcolici).
// Renders section titles with base prices, item rows with dotted leaders,
// and an optional decorative mascotte (floating on desktop, centered on mobile).
import type { MenuCategory } from '@/utils/menu'

defineProps<{
  category: MenuCategory
  mascotte?: string
  mascotteVariant?: 'caffetteria' | 'alcolici'
}>()

const { t } = useI18n()

// "1.40" -> "40" (the two decimal digits shown after the integer part)
const decimals = (price: number) => String((price % 1).toFixed(2)).slice(2)
</script>

<template>
  <Card :id="category.tag">
    <template #content>
      <div :class="{ 'card-content-wrapper': mascotte }">
        <!-- Floating mascot on desktop -->
        <div v-if="mascotte" class="decorative-image-desktop" :class="mascotteVariant">
          <img :src="mascotte" alt="logo" />
        </div>

        <h2 class="section-title">{{ t('menu.categories.' + category.id) }}</h2>

        <div v-for="(section, idx) in category.sections" :key="idx" class="subsection">
          <!-- Section title with base price, rendered as a regular item -->
          <div
            v-if="section.id && section.id !== 'no_title' && section.id !== 'altri' && section.price"
            class="menu-item section-item"
          >
            <span class="item-name section-name">{{ t('menu.sections.' + section.id) }}</span>
            <span class="item-dots"></span>
            <span class="item-price">
              <span class="price-integer">{{ Math.floor(section.price) }}</span>
              <span class="price-decimal">.{{ decimals(section.price) }}€</span>
            </span>
          </div>

          <div class="menu-items">
            <div
              v-for="item in section.items"
              :key="item.id"
              class="menu-item"
              :class="{ indent: item.indent, variant: item.isVariant }"
            >
              <span class="item-name">{{ t('menu.items.' + item.id) }}</span>
              <span class="item-dots"></span>
              <span v-if="item.price !== section.price || !item.isVariant" class="item-price">
                <span class="price-integer">{{ Math.floor(item.price) }}</span>
                <span class="price-decimal">.{{ decimals(item.price) }}€</span>
              </span>
            </div>
          </div>
        </div>

        <!-- Mascot on mobile at the end of the card -->
        <div v-if="mascotte" class="decorative-image-mobile">
          <img :src="mascotte" alt="logo" />
        </div>
      </div>
    </template>
  </Card>
</template>

<style scoped lang="scss">
.card-content-wrapper {
  position: relative;
}

.section-title {
  color: var(--p-primary-color);
  margin: 0 0 0.75rem 0;
  padding-bottom: 0.5rem;
  font-size: 1.5rem;
  font-weight: 700;
}

.subsection {
  margin-bottom: 1.5rem;
  &:last-child { margin-bottom: 0; }
}

.section-item {
  margin-bottom: 0.5rem;

  .section-name {
    font-weight: 600 !important;
    font-size: 1.05rem !important;
  }
}

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
    .item-name { font-weight: 400; font-size: 0.95rem; }
  }

  &.variant {
    padding-left: 1.5rem;
    .item-name { font-weight: 400; font-size: 0.9rem; }
  }
}

.item-name {
  color: var(--p-primary-color);
  font-weight: 500;
  white-space: nowrap;
  position: relative;
  z-index: 3;
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
  z-index: 1;
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
  z-index: 3;
}

.price-integer {
  text-align: right;
  min-width: 20px;
  display: inline-block;
}

// ── Decorative mascots ──────────────────────────────────────
.decorative-image-mobile {
  display: block;
  margin-top: 2rem;
  margin-left: auto;
  margin-right: auto;
  max-width: 150px;
  opacity: 0.25;

  img { width: 100%; }

  @media (min-width: 768px) { display: none; }
}

.decorative-image-desktop {
  display: none;

  @media (min-width: 768px) {
    display: block;
    position: absolute;
    opacity: 0.15;
    z-index: 2;
    pointer-events: none;

    img { width: 100%; }
  }

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

.section-title,
.subsection,
.menu-items {
  position: relative;
  z-index: 3;
}
</style>
