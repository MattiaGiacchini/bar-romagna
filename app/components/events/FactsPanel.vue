<script setup lang="ts">
// Sticky facts panel for the event detail page: date/time/entry/food/band + directions button.
import type { BarEvent } from '@/utils/events'
import { business } from '@/utils/business'

defineProps<{ event: BarEvent }>()

const { t } = useI18n()
const analytics = useAnalytics()

const formatDate = (iso: string): string =>
  new Date(iso).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })

const openMaps = () => {
  analytics.trackDirections('event_detail')
  window.open(business.hasMap, '_blank')
}
</script>

<template>
  <aside class="facts-panel">
    <h2 class="facts-title">{{ t('events.detail.infoTitle') }}</h2>
    <dl class="facts-list">
      <div class="facts-row">
        <dt>{{ t('events.detail.dateLabel') }}</dt>
        <dd>{{ formatDate(event.date) }}</dd>
      </div>
      <div v-if="event.time" class="facts-row">
        <dt>{{ t('events.detail.timeLabel') }}</dt>
        <dd>{{ event.time }}<span v-if="event.endTime"> – {{ event.endTime }}</span></dd>
      </div>
      <div v-if="event.foodTime" class="facts-row">
        <dt>{{ t('events.detail.foodLabel') }}</dt>
        <dd>{{ event.foodTime }}</dd>
      </div>
      <div v-if="event.meetupTime" class="facts-row">
        <dt>{{ t('events.detail.meetupLabel') }}</dt>
        <dd>{{ event.meetupTime }}</dd>
      </div>
      <div class="facts-row">
        <dt>{{ t('events.detail.entryLabel') }}</dt>
        <dd>
          <span v-if="event.freeEntry" class="facts-free">{{ t('events.detail.freeEntry') }}</span>
          <span v-else-if="event.entryFee">€{{ event.entryFee }}</span>
          <span v-else>—</span>
        </dd>
      </div>
      <div v-if="event.food" class="facts-row">
        <dt>{{ t('events.detail.foodMenuLabel') }}</dt>
        <dd>{{ event.food.description }}<span v-if="event.food.price"> · €{{ event.food.price }}</span></dd>
      </div>
      <div v-if="event.prizes" class="facts-row">
        <dt>{{ t('events.detail.prizesLabel') }}</dt>
        <dd>{{ event.prizes }}</dd>
      </div>
      <div v-if="event.band" class="facts-row">
        <dt>{{ t('events.detail.bandLabel') }}</dt>
        <dd>{{ event.band.name }}</dd>
      </div>
    </dl>

    <div class="facts-actions">
      <Button
        :label="t('contacts.actions.directions')"
        icon="pi pi-map-marker"
        severity="warn"
        @click="openMaps"
      />
    </div>
  </aside>
</template>

<style scoped lang="scss">
// h2 — BigChunko from theme.scss. No font-family override.
$r: 16px;

.facts-panel {
  background: var(--p-surface-0);
  border: 1px solid var(--p-surface-200);
  border-radius: $r;
  padding: 1.5rem;
  box-shadow: 0 2px 12px rgba(0,0,0,0.05);

  @media (min-width: 1024px) {
    position: sticky;
    top: 86px;
    padding: 2rem;
  }
}
.facts-title {
  margin: 0 0 1rem;
  color: var(--p-primary-color);
}
.facts-list { margin: 0; display: flex; flex-direction: column; }
.facts-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1.5rem;
  padding: 0.8125rem 0;
  border-bottom: 1px dotted var(--p-surface-300);
  &:last-child { border-bottom: none; }

  dt {
    font-size: 0.6875rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: var(--p-orange-500);
    flex-shrink: 0;
  }
  dd {
    margin: 0;
    font-size: 0.9375rem;
    color: var(--p-text-color);
    text-align: right;
  }
}
.facts-free { color: var(--p-primary-color); font-weight: 700; }
.facts-actions { margin-top: 1.25rem; display: flex; }
.facts-actions :deep(.p-button) { width: 100%; }
</style>
