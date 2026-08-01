<script setup lang="ts">
// EventGallery — responsive media grid + lightbox.
// Supports images and locally-hosted videos (served from /public, no YouTube).
// Renders nothing when there is no media, so it's safe to always mount.

import { ref, computed, onBeforeUnmount, watch } from 'vue'
import type { MediaItem } from '@/utils/events'

const props = defineProps<{
  media: MediaItem[]
  title?: string
}>()

const analytics = useAnalytics()

const items = computed(() => props.media ?? [])
const hasMedia = computed(() => items.value.length > 0)

const lightboxOpen = ref(false)
const activeIndex = ref(0)

const activeItem = computed(() => items.value[activeIndex.value])

const open = (index: number) => {
  activeIndex.value = index
  lightboxOpen.value = true
  analytics.trackGalleryOpen(index, items.value[index]?.type ?? 'image', items.value.length)
}

const close = () => { lightboxOpen.value = false }

const next = () => {
  activeIndex.value = (activeIndex.value + 1) % items.value.length
  analytics.trackGalleryNavigate('next')
}
const prev = () => {
  activeIndex.value = (activeIndex.value - 1 + items.value.length) % items.value.length
  analytics.trackGalleryNavigate('prev')
}

const onKeydown = (e: KeyboardEvent) => {
  if (!lightboxOpen.value) return
  if (e.key === 'ArrowRight') next()
  else if (e.key === 'ArrowLeft') prev()
  else if (e.key === 'Escape') close()
}

watch(lightboxOpen, (isOpen) => {
  if (typeof window === 'undefined') return
  if (isOpen) window.addEventListener('keydown', onKeydown)
  else window.removeEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <section v-if="hasMedia" class="gallery">
    <h2 v-if="title" class="gallery-title">{{ title }}</h2>

    <div class="gallery-grid">
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

    <!-- Lightbox -->
    <Dialog
      v-model:visible="lightboxOpen"
      modal
      dismissableMask
      :showHeader="false"
      class="lightbox-dialog"
      :pt="{ root: { class: 'lightbox-root' }, mask: { class: 'lightbox-mask' } }"
    >
      <div v-if="activeItem" class="lightbox">
        <button type="button" class="lightbox-close" aria-label="Chiudi" @click="close">
          <i class="pi pi-times" />
        </button>

        <button
          v-if="items.length > 1"
          type="button"
          class="lightbox-nav lightbox-nav--prev"
          aria-label="Precedente"
          @click="prev"
        >
          <i class="pi pi-chevron-left" />
        </button>

        <div class="lightbox-stage">
          <img
            v-if="activeItem.type === 'image'"
            :src="activeItem.src"
            :alt="activeItem.alt"
            class="lightbox-media"
          />
          <video
            v-else
            :key="activeItem.src"
            :src="activeItem.src"
            :poster="activeItem.poster"
            class="lightbox-media"
            controls
            autoplay
            playsinline
          />
          <p v-if="activeItem.alt" class="lightbox-caption">{{ activeItem.alt }}</p>
        </div>

        <button
          v-if="items.length > 1"
          type="button"
          class="lightbox-nav lightbox-nav--next"
          aria-label="Successivo"
          @click="next"
        >
          <i class="pi pi-chevron-right" />
        </button>
      </div>
    </Dialog>
  </section>
</template>

<style scoped lang="scss">
// Typography: h2 heading font is set globally in theme.scss (BigChunko) — no override here.
$r: 16px;
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

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.625rem;

  @media (min-width: 640px)  { grid-template-columns: repeat(3, 1fr); }
  @media (min-width: 1024px) { grid-template-columns: repeat(4, 1fr); }
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

// ── Lightbox ─────────────────────────────────────────────────
.lightbox {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.lightbox-stage {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  max-width: 90vw;
}

.lightbox-media {
  max-width: 90vw;
  max-height: 80vh;
  width: auto;
  height: auto;
  border-radius: $r-sm;
  object-fit: contain;
  background: #000;
}

.lightbox-caption {
  margin: 0;
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.875rem;
  text-align: center;
  max-width: 90vw;
}

.lightbox-close {
  position: fixed;
  top: 1.25rem;
  right: 1.25rem;
  z-index: 2;
  width: 44px;
  height: 44px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s ease;

  &:hover { background: rgba(255, 255, 255, 0.25); }
}

.lightbox-nav {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.125rem;
  transition: background 0.15s ease;

  &:hover { background: rgba(255, 255, 255, 0.25); }

  &--prev { left: 1rem; }
  &--next { right: 1rem; }
}
</style>

<style lang="scss">
// Unscoped: style the PrimeVue Dialog shell used as a bare lightbox container.
.lightbox-root.p-dialog {
  background: transparent;
  box-shadow: none;
  border: none;
  max-width: 96vw;
}
.lightbox-root .p-dialog-content {
  background: transparent;
  padding: 0;
  overflow: visible;
}
.lightbox-mask.p-dialog-mask {
  background: rgba(0, 0, 0, 0.9);
}
</style>
