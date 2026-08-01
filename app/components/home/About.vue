<script setup lang="ts">
// "Chi siamo" — two-column text + three owner photos (click to open in the lightbox).
import { ref } from 'vue'
import type { MediaItem } from '@/utils/events'

const { t } = useI18n()

const ownerPhotos: MediaItem[] = [
  { type: 'image', src: '/owners-photos/nadia-mattia-2024.JPG', alt: 'Nadia e Mattia — Bar Romagna Cervia 2024' },
  { type: 'image', src: '/owners-photos/nadia-mattia-2025.JPG', alt: 'Nadia e Mattia — Bar Romagna Cervia 2025' },
  { type: 'image', src: '/owners-photos/nadia-mattia-2007.jpeg', alt: 'Nadia e Mattia — Bar Romagna Cervia 2007' },
]

const lightboxOpen = ref(false)
const activeIndex = ref(0)

const open = (i: number) => { activeIndex.value = i; lightboxOpen.value = true }
</script>

<template>
  <div class="ab ab1">
    <div class="ab1-text">
      <span class="ab-tag">{{ t('home.about.tag') }}</span>
      <h2 class="ab-title">{{ t('home.about.title').split('\n')[0] }}<br>{{ t('home.about.title').split('\n')[1] }}</h2>
      <p class="ab-p">{{ t('home.about.p1') }}</p>
      <p class="ab-p">{{ t('home.about.p2') }}</p>
      <p class="ab-p">{{ t('home.about.p3') }}</p>
    </div>
    <div class="ab1-photos">
      <button type="button" class="ab1-photo-card ab1-photo-card--main" :aria-label="ownerPhotos[0].alt" @click="open(0)">
        <img :src="ownerPhotos[0].src" :alt="ownerPhotos[0].alt" class="ab1-photo" style="object-position: center center" data-allow-mismatch />
      </button>
      <button type="button" class="ab1-photo-card" :aria-label="ownerPhotos[1].alt" @click="open(1)">
        <img :src="ownerPhotos[1].src" :alt="ownerPhotos[1].alt" class="ab1-photo" style="object-position: center 10%" />
      </button>
      <button type="button" class="ab1-photo-card ab1-photo-card--historic" :aria-label="ownerPhotos[2].alt" @click="open(2)">
        <img :src="ownerPhotos[2].src" :alt="ownerPhotos[2].alt" class="ab1-photo" style="object-position: center 20%" />
      </button>
    </div>

    <CommonLightbox v-model:visible="lightboxOpen" v-model:index="activeIndex" :items="ownerPhotos" />
  </div>
</template>

<style scoped lang="scss">
// h2 — BigChunko from theme.scss. No font-family override.
$r:    16px;
$r-sm: 8px;

.ab-tag {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--p-orange-500);
  margin-bottom: 0.5rem;
}

.ab-title {
  margin: 0 0 1.25rem;
  color: var(--p-primary-color);
  font-size: clamp(1.75rem, 4.5vw, 2.75rem);
  line-height: 1.05;
}

.ab-p {
  margin: 0 0 0.875rem;
  font-size: 1rem;
  line-height: 1.7;
  color: var(--p-text-muted-color);
}

.ab1 { background: var(--p-surface-0); border: 1px solid var(--p-surface-200); border-radius: $r; padding: 2rem 1.75rem; display: grid; grid-template-columns: 1fr; gap: 2.5rem; @media (min-width: 768px) { grid-template-columns: 1fr 1fr; align-items: start; padding: 3rem; gap: 4rem; } }
.ab1-text { display: flex; flex-direction: column; }
.ab1-photos {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 0.625rem;
}
.ab1-photo-card {
  border: none;
  padding: 0;
  margin: 0;
  background: none;
  cursor: pointer;
  border-radius: $r-sm;
  overflow: hidden;
  position: relative;
  display: block;
  width: 100%;
  &--main { grid-column: span 2; }
}
.ab1-photo {
  width: 100%;
  height: 180px;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
  .ab1-photo-card--main & { height: 360px; }
  .ab1-photo-card:hover & { transform: scale(1.04); }
}
</style>
