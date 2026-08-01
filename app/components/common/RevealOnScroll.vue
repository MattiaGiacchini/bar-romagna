<script setup lang="ts">
// Wraps content in a <section> that fades/slides in when scrolled into view.
// Reusable replacement for the per-page `.section-reveal` + useReveal boilerplate.
import { useReveal } from '@/composables/useReveal'

const props = withDefaults(defineProps<{ threshold?: number }>(), { threshold: 0.1 })
const { revealRef, isVisible } = useReveal(props.threshold)
</script>

<template>
  <section ref="revealRef" class="section-reveal" :class="{ revealed: isVisible }">
    <slot />
  </section>
</template>

<style scoped lang="scss">
.section-reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.6s ease, transform 0.6s ease;
  &.revealed { opacity: 1; transform: translateY(0); }
}
</style>
