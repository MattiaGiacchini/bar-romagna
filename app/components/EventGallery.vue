<script setup lang="ts">
// EventGallery — responsive media grid (or horizontal filmstrip) + reusable lightbox.
// Supports images and locally-hosted videos (served from /public, no YouTube).
// Renders nothing when there is no media, so it's safe to always mount.

import { ref, computed } from 'vue'
import type { MediaItem } from '@/utils/events'

const props = withDefaults(defineProps<{
  media: MediaItem[]
  title?: string
  layout?: 'grid' | 'filmstrip'
}>(), { layout: 'grid' })

const analytics = useAnalytics()

const items = computed(() => props.media ?? [])
const hasMedia = computed(() => items.value.length > 0)

const lightboxOpen = ref(false)
const activeIndex = ref(0)

const open = (index: number) => {
  activeIndex.value = index
  lightboxOpen.value = true
  analytics.trackGalleryOpen(index, items.value[index]?.type ?? 'image', items.value.length)
}
</script>

<template>
  <section v-if="hasMedia" class="gallery">
    <h2 v-if="title" class="gallery-title">{{ title }}</h2>

    <div class="gallery-grid" :class="`gallery-grid--${layout}`">
      <button
        v-for="(item, i) in items"
        :key="item.src"
        type="button"
        class="gallery-cell"
        :aria-label="item.alt"
        @click="open(i)"
      >
        <img
          v-if="item.type === 'image'"
          :src="item.src"
          :alt="item.alt"
          class="gallery-media"
          loading="lazy"
        />
        <template v-else>
          <img
            v-if="item.poster"
            :src="item.poster"
            :alt="item.alt"
            class="gallery-media"
            loading="lazy"
          />
          <video
            v-else
            :src="item.src"
            class="gallery-media"
            preload="metadata"
            muted
            playsinline
          />
          <span class="gallery-play"><i class="pi pi-play" /></span>
        </template>
      </button>
    </div>

    <CommonLightbox
      v-model:visible="lightboxOpen"
      v-model:index="activeIndex"
      :items="items"
      @navigate="(dir) => analytics.trackGalleryNavigate(dir)"
    />
  </section>
</template>

<style scoped lang="scss">
// Typography: h2 heading font is set globally in theme.scss (BigChunko) — no override here.
$r-sm: 10px;

.gallery {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.gallery-title {
  margin: 0;
  color: var(--p-primary-color);
}

// ── Grid layout ──────────────────────────────────────────────
.gallery-grid--grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.625rem;

  @media (min-width: 640px)  { grid-template-columns: repeat(3, 1fr); }
  @media (min-width: 1024px) { grid-template-columns: repeat(4, 1fr); }
}

// ── Filmstrip layout — horizontal scroll, square cells ──────
.gallery-grid--filmstrip {
  display: flex;
  gap: 0.625rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  scrollbar-width: thin;
  cursor: grab;
  &:active { cursor: grabbing; }

  .gallery-cell {
    flex-shrink: 0;
    width: 180px;
    @media (min-width: 768px) { width: 240px; }
  }
}

.gallery-cell {
  position: relative;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  border-radius: $r-sm;
  overflow: hidden;
  aspect-ratio: 1 / 1;
  background: var(--p-surface-200);
  display: block;
}

.gallery-media {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;

  .gallery-cell:hover & { transform: scale(1.05); }
}

.gallery-play {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.25);
  color: white;
  pointer-events: none;

  i {
    font-size: 1rem;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.55);
    padding-left: 3px; // optically center the play triangle
  }
}
</style>
