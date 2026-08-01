<script setup lang="ts">
// Tab-style category filter for the events list.
import type { EventCategory } from '@/utils/events'

type FilterValue = EventCategory | 'all'

defineProps<{
  filters: { value: FilterValue; labelKey: string }[]
  active: FilterValue
}>()

const emit = defineEmits<{ select: [value: FilterValue] }>()

const { t } = useI18n()
</script>

<template>
  <section class="filters-wrap">
    <div class="filters-row">
      <button
        v-for="f in filters"
        :key="f.value"
        class="filter-btn"
        :class="{ active: active === f.value }"
        @click="emit('select', f.value)"
      >
        {{ t(f.labelKey) }}
      </button>
    </div>
  </section>
</template>

<style scoped lang="scss">
.filters-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  border-bottom: 1px solid var(--p-surface-200);
  padding-bottom: 0;
}

.filter-btn {
  background: transparent;
  border: none;
  border-bottom: 3px solid transparent;
  margin-bottom: -1px; // overlap the filters-row border
  padding: 0.5rem 1rem;
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--p-text-muted-color);
  cursor: pointer;
  transition: color 0.15s ease, border-color 0.15s ease;
  border-radius: 0;
  white-space: nowrap;

  &:hover { color: var(--p-text-color); }

  &.active {
    color: var(--p-primary-color);
    border-bottom-color: var(--p-primary-color);
    font-weight: 700;
  }
}
</style>
