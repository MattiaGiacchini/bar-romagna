<script setup lang="ts">
// Reusable fullscreen lightbox for images and locally-hosted videos.
// Controlled via v-model:visible + v-model:index. Handles prev/next + keyboard.
import { computed, onBeforeUnmount, watch } from 'vue'
import type { MediaItem } from '@/utils/events'

const props = defineProps<{ items: MediaItem[] }>()
const emit = defineEmits<{ navigate: ['next' | 'prev'] }>()

const visible = defineModel<boolean>('visible', { default: false })
const index = defineModel<number>('index', { default: 0 })

const activeItem = computed(() => props.items[index.value])

const close = () => { visible.value = false }

const next = () => {
  if (props.items.length < 2) return
  index.value = (index.value + 1) % props.items.length
  emit('navigate', 'next')
}
const prev = () => {
  if (props.items.length < 2) return
  index.value = (index.value - 1 + props.items.length) % props.items.length
  emit('navigate', 'prev')
}

const onKeydown = (e: KeyboardEvent) => {
  if (!visible.value) return
  if (e.key === 'ArrowRight') next()
  else if (e.key === 'ArrowLeft') prev()
  else if (e.key === 'Escape') close()
}

watch(visible, (isOpen) => {
  if (typeof window === 'undefined') return
  if (isOpen) window.addEventListener('keydown', onKeydown)
  else window.removeEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <Dialog
    v-model:visible="visible"
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
</template>

<style scoped lang="scss">
$r-sm: 10px;

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
