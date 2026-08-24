<script setup lang="ts">
// Contacts page — hero + info panel (hours/contacts/whatsapp) + map.
import { useSchedule } from '@/composables/useSchedule'
import { barSchedules } from '@/utils/schedule'
import { SITE_URL, buildLocalBusinessJsonLd } from '@/utils/business'

// ── SEO ──────────────────────────────────────────────────────
const { t } = useI18n()

useSeoMeta({
  title:              () => t('seo.contacts.title'),
  description:        () => t('seo.contacts.description'),
  ogTitle:            () => t('seo.contacts.title'),
  ogDescription:      () => t('seo.contacts.description'),
  ogUrl:              `${SITE_URL}/contacts`,
  ogImage:            `${SITE_URL}/bar-view.jpg`,
  ogImageAlt:         'Bar Romagna Cervia — contatti e orari',
  twitterTitle:       () => t('seo.contacts.title'),
  twitterDescription: () => t('seo.contacts.description'),
})

// LocalBusiness schema on the contacts page — strongest NAP signal page
useHead({
  link: [{ rel: 'canonical', href: `${SITE_URL}/contacts` }],
  script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(buildLocalBusinessJsonLd()) }],
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
