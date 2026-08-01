<script setup lang="ts">
// Contacts map card — embedded Google map + footer that deep-links to directions.
const { t } = useI18n()
const analytics = useAnalytics()

const MAPS_URL =
  'https://www.google.com/maps/place/Bar+Romagna/@44.2524022,12.3110341,11.82z/data=!4m6!3m5!1s0x132cb1f33caaf7d7:0xef2fc4fe22e8018e!8m2!3d44.2562331!4d12.2766308'

const openMaps = () => { analytics.trackDirections('contacts'); window.open(MAPS_URL, '_blank') }
</script>

<template>
  <div class="right-col">
    <div id="map" class="map-card">
      <div class="map-embed">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14354.81212491558!2d12.269249098475342!3d44.25378708035667!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132cb1f33caaf7d7%3A0xef2fc4fe22e8018e!2sBar%20Romagna!5e0!3m2!1sit!2sit!4v1767721090967!5m2!1sit!2sit"
          width="100%"
          height="100%"
          style="border:0"
          allowfullscreen
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          :title="t('contacts.map.title')"
        />
      </div>
      <div class="map-footer" @click="openMaps">
        <i class="pi pi-map-marker map-pin" />
        <div>
          <p class="map-name">Bar Romagna</p>
          <p class="map-addr">{{ t('contacts.map.address') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$r: 16px;

.right-col {
  @media (min-width: 1024px) {
    position: sticky;
    top: 70px;
    height: calc(100vh - 70px - 2rem);
  }
}

.map-card {
  border-radius: $r;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: auto;
  border: 1px solid var(--p-surface-200);

  @media (min-width: 1024px) { height: 100%; }
}

.map-embed {
  flex-shrink: 0;
  height: 320px;

  @media (min-width: 768px) { height: 440px; }

  @media (min-width: 1024px) {
    flex: 1 1 0;
    height: 0;
    min-height: 0;
  }

  iframe {
    display: block;
    width: 100%;
    height: 100%;
  }
}

.map-footer {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  background: var(--p-surface-0);
  border-top: 1px solid var(--p-surface-200);
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover { background: var(--p-surface-50); }
}

.map-pin {
  font-size: 1.25rem;
  color: var(--p-orange-500);
  flex-shrink: 0;
}

.map-name {
  margin: 0 0 0.1rem;
  font-weight: 700;
  font-size: 0.9375rem;
  color: var(--p-text-color);
}

.map-addr {
  margin: 0;
  font-size: 0.875rem;
  color: var(--p-text-muted-color);
}
</style>
