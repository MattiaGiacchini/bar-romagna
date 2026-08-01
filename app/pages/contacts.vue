<script setup lang="ts">
// Contacts page — hero + info panel (hours/contacts/whatsapp) + map.
import { useSchedule } from '@/composables/useSchedule'
import { barSchedules } from '@/utils/schedule'

// ── SEO ──────────────────────────────────────────────────────
const { locale } = useI18n()

const seoTitle = computed(() =>
  locale.value === 'it'
    ? 'Contatti — Bar Romagna Cervia | Orari, Mappa & Telefono'
    : 'Contact — Bar Romagna Cervia | Opening Hours, Map & Phone'
)
const seoDesc = computed(() =>
  locale.value === 'it'
    ? 'Trova il Bar Romagna a Cervia: orari di apertura, indirizzo (Via Salara Statale 35/M), numero di telefono e mappa. Contatta Nadia o Mattia direttamente.'
    : 'Find Bar Romagna in Cervia: opening hours, address (Via Salara Statale 35/M), phone number and map. Contact Nadia or Mattia directly.'
)

useSeoMeta({
  title:              () => seoTitle.value,
  description:        () => seoDesc.value,
  ogTitle:            () => seoTitle.value,
  ogDescription:      () => seoDesc.value,
  ogUrl:              'https://www.barromagna.com/contacts',
  ogImage:            'https://www.barromagna.com/bar-view.jpg',
  ogImageAlt:         'Bar Romagna Cervia — contatti e orari',
  twitterTitle:       () => seoTitle.value,
  twitterDescription: () => seoDesc.value,
})

useHead({
  link: [{ rel: 'canonical', href: 'https://www.barromagna.com/contacts' }],
})

const { barStatus, displaySchedule } = useSchedule(barSchedules)
</script>

<template>
  <div class="page">
    <ContactsHero :status="barStatus" />

    <section class="content-wrap">
      <div class="content-grid">
        <ContactsInfoPanel :status="barStatus" :schedule="displaySchedule" />
        <ContactsMap />
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
$gap:     1.25rem;
$gap-lg:  2rem;

.page {
  display: flex;
  flex-direction: column;
}

.content-wrap {
  margin-top: $gap;
  @media (min-width: 768px) { margin-top: $gap-lg; }
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: $gap;
  align-items: start;

  @media (min-width: 1024px) {
    grid-template-columns: 420px 1fr;
    gap: $gap-lg;
    align-items: start;
  }

  @media (min-width: 1280px) {
    grid-template-columns: 460px 1fr;
  }
}
</style>
