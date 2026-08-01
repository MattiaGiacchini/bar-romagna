<script setup lang="ts">
// Event card used in the events list (upcoming + past variants).
import type { BarEvent } from '@/utils/events'

const props = withDefaults(defineProps<{
  event: BarEvent
  past?: boolean
  source?: string
}>(), { past: false, source: 'events_list' })

const { t } = useI18n()
const analytics = useAnalytics()

const formatDate = (iso: string): string =>
  new Date(iso).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })

const onClick = () => analytics.trackEventCardClick(props.event, props.source)
</script>

<template>
  <NuxtLink
    :to="`/events/${event.slug}`"
    class="event-card"
    :class="{ 'event-card--past': past }"
    @click="onClick"
  >
    <div class="card-photo-wrap">
      <img :src="event.image" :alt="event.title" class="card-photo" :class="{ 'card-photo--past': past }" />
      <span class="card-badge card-badge--cat" :class="`card-cat--${event.category}`">
        {{ t(`events.filters.${event.category}`) }}
      </span>
      <img
        v-if="event.band?.logo"
        :src="event.band.logo"
        :alt="event.band.name"
        class="card-band-logo"
      />
    </div>
    <div class="card-body">
      <h3 class="card-title" :class="{ 'card-title--past': past }">{{ event.title }}</h3>
      <p class="card-date">
        <i class="pi pi-calendar card-date-icon" />
        {{ formatDate(event.date) }}
        <span v-if="event.time"> · {{ t('events.card.at') }} {{ event.time }}</span>
      </p>
      <p v-if="event.foodTime" class="card-meta">
        <i class="pi pi-clock card-meta-icon" />
        Cena dalle {{ event.foodTime }}
      </p>
      <p v-if="event.meetupTime" class="card-meta">
        <i class="pi pi-clock card-meta-icon" />
        Ritrovo alle {{ event.meetupTime }}
      </p>
      <div v-if="event.food || event.entryFee || event.prizes" class="card-price-block">
        <div class="card-price-row">
          <span v-if="event.food?.price" class="ps1-pill">{{ event.food.description.split('(')[0].trim() }} · €{{ event.food.price }}</span>
          <span v-else-if="event.food" class="ps1-food-plain">{{ event.food.description }}</span>
          <span v-if="event.entryFee" class="ps1-pill">Iscrizione · €{{ event.entryFee }}</span>
          <span v-if="event.prizes" class="ps1-prizes"><i class="pi pi-trophy" /> {{ event.prizes }}</span>
        </div>
      </div>
      <p class="card-desc">{{ event.description }}</p>
    </div>
  </NuxtLink>
</template>

<style scoped lang="scss">
// h3 — Roboto from theme.scss. No font-family override.
$r: 16px;

.event-card {
  background: var(--p-surface-0);
  border: 1px solid var(--p-surface-200);
  border-radius: $r;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  transition: box-shadow 0.2s ease, transform 0.2s ease;

  &:hover {
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }

  &--past {
    opacity: 0.82;
    &:hover { opacity: 1; }
  }
}

.card-photo-wrap {
  position: relative;
  height: 200px;
  overflow: hidden;
  flex-shrink: 0;
}

.card-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.3s ease;

  .event-card:hover & { transform: scale(1.03); }

  &--past {
    filter: grayscale(55%) brightness(0.88);
  }
}

.card-badge {
  position: absolute;
  font-size: 0.6875rem;
  font-weight: 700;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  line-height: 1.4;

  &--cat { top: 0.625rem; left: 0.625rem; }
}

.card-cat--musica {
  background: var(--p-primary-color);
  color: white;
}
.card-cat--torneo {
  background: var(--p-orange-500);
  color: white;
}

.card-body {
  padding: 1.125rem 1.25rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}

.card-title {
  margin: 0;
  font-size: 1.0625rem;
  font-weight: 700;
  color: var(--p-text-color);
  line-height: 1.3;

  &--past { color: var(--p-text-muted-color); }
}

.card-date {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--p-text-muted-color);
  display: flex;
  align-items: center;
  gap: 0.375rem;
  flex-wrap: wrap;
}

.card-date-icon {
  color: var(--p-orange-500);
  font-size: 0.875rem;
  flex-shrink: 0;
}

.card-desc {
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.55;
  color: var(--p-text-muted-color);
}

.card-band-logo {
  position: absolute;
  top: 0.625rem;
  right: 0.625rem;
  width: 48px;
  height: 48px;
  object-fit: contain;
  border-radius: 8px;
  background: rgba(255,255,255,0.92);
  padding: 4px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}

.card-meta {
  margin: 0;
  font-size: 0.8125rem;
  color: var(--p-text-muted-color);
  display: flex;
  align-items: center;
  gap: 0.375rem;
}

.card-meta-icon {
  color: var(--p-orange-500);
  font-size: 0.8125rem;
  flex-shrink: 0;
}

.card-price-block { display: flex; flex-direction: column; gap: 0.375rem; }
.card-price-row { display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem; }

.ps1-pill { background: var(--p-orange-500); color: white; font-size: 0.75rem; font-weight: 700; padding: 0.2rem 0.6rem; border-radius: 4px; }
.ps1-food-plain { font-size: 0.8125rem; color: var(--p-text-muted-color); }
.ps1-prizes { font-size: 0.8125rem; font-weight: 600; color: var(--p-orange-500); display: flex; align-items: center; gap: 0.25rem; }
</style>
