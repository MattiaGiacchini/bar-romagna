<script setup lang="ts">
import { useSchedule } from '@/composables/useSchedule'
import { barSchedules } from '@/utils/schedule'

const { t } = useI18n()
const { barStatus, displaySchedule } = useSchedule(barSchedules)

const openMaps = () => {
  window.open(
    'https://www.google.com/maps/place/Bar+Romagna/@44.2524022,12.3110341,11.82z/data=!4m6!3m5!1s0x132cb1f33caaf7d7:0xef2fc4fe22e8018e!8m2!3d44.2562331!4d12.2766308!16s%2Fg%2F11bxf1y8yn',
    '_blank'
  )
}

const callNadia = () => { window.location.href = 'tel:+393395936104' }
const callMattia = () => { window.location.href = 'tel:+393473746945' }
const sendEmail = () => { window.location.href = 'mailto:barromagna.cervia@gmail.com' }
const openWhatsAppNadia = () => { window.open('https://wa.me/393395936104', '_blank') }
const openWhatsAppMattia = () => { window.open('https://wa.me/393473746945', '_blank') }
</script>

<template>
  <div class="contact-page">

    <!-- ============================================================ -->
    <!-- HERO -->
    <!-- ============================================================ -->
    <div class="hero-wrapper">
      <div class="hero-section">
        <img src="/bar-view.jpg" alt="Bar Romagna" class="hero-image" />
        <div class="hero-overlay">
          <Tag
            :value="barStatus.label"
            icon="pi pi-circle-fill"
            :severity="barStatus.severity"
            class="status-badge"
          />
          <div class="hero-content">
            <h1 class="hero-title">{{ t('contacts.hero.title').split('\n')[0] }}<br>{{ t('contacts.hero.title').split('\n')[1] }}</h1>
            <p class="hero-subtitle">{{ t('contacts.hero.subtitle') }}</p>
            <Button
              :label="t('contacts.actions.viewMenu')"
              icon="pi pi-book"
              severity="warn"
              class="hero-cta"
              @click="() => navigateTo('/menu')"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile quick actions -->
    <div class="quick-actions mobile-only">
      <Button
        :label="t('contacts.actions.call')"
        icon="pi pi-phone"
        severity="warn"
        size="large"
        @click="callNadia"
      />
      <Button
        :label="t('contacts.actions.directions')"
        icon="pi pi-map-marker"
        size="large"
        @click="openMaps"
      />
    </div>

    <!-- ============================================================ -->
    <!-- MAIN GRID -->
    <!-- ============================================================ -->
    <div class="contact-grid">

      <!-- LEFT COLUMN -->
      <div class="left-col">

        <!-- Opening hours -->
        <Card class="info-card">
          <template #content>
            <div class="card-header">
              <div class="card-title-group">
                <i class="pi pi-clock" />
                <h3>{{ t('contacts.schedule.title') }}</h3>
              </div>
              <Tag
                :value="barStatus.label"
                icon="pi pi-circle-fill"
                :severity="barStatus.severity"
              />
            </div>
            <Divider />
            <div class="schedule-list">
              <div
                v-for="(item, index) in displaySchedule"
                :key="index"
                class="schedule-row"
              >
                <div class="schedule-day-wrap">
                  <span class="schedule-day">{{ item.days }}</span>
                  <Tag
                    v-if="item.specialName"
                    :value="item.specialName"
                    severity="warn"
                    class="special-tag"
                  />
                </div>
                <span class="schedule-time">{{ item.hours }}</span>
              </div>
            </div>
          </template>
        </Card>

        <!-- Contact info -->
        <Card class="info-card">
          <template #content>
            <div class="card-header">
              <div class="card-title-group">
                <i class="pi pi-address-book" />
                <h3>{{ t('contacts.contact.title') }}</h3>
              </div>
            </div>
            <Divider />

            <!-- Email -->
            <button class="contact-row" @click="sendEmail">
              <div class="contact-icon email">
                <i class="pi pi-envelope" />
              </div>
              <div class="contact-text">
                <span class="contact-label">{{ t('contacts.contact.email') }}</span>
                <span class="contact-value">barromagna.cervia@gmail.com</span>
              </div>
              <i class="pi pi-chevron-right contact-arrow" />
            </button>

            <Divider />

            <!-- Nadia -->
            <button class="contact-row" @click="callNadia">
              <div class="contact-icon phone">
                <i class="pi pi-phone" />
              </div>
              <div class="contact-text">
                <span class="contact-label">NADIA</span>
                <span class="contact-value">+39 339 59 36 104</span>
              </div>
              <i class="pi pi-chevron-right contact-arrow" />
            </button>

            <Divider />

            <!-- Mattia -->
            <button class="contact-row" @click="callMattia">
              <div class="contact-icon phone">
                <i class="pi pi-phone" />
              </div>
              <div class="contact-text">
                <span class="contact-label">MATTIA</span>
                <span class="contact-value">+39 347 37 46 945</span>
              </div>
              <i class="pi pi-chevron-right contact-arrow" />
            </button>
          </template>
        </Card>

        <!-- WhatsApp -->
        <Card class="info-card">
          <template #content>
            <div class="card-header">
              <div class="card-title-group">
                <i class="pi pi-whatsapp" />
                <h3>{{ t('contacts.contact.whatsapp') }}</h3>
              </div>
            </div>
            <Divider />
            <div class="whatsapp-grid">
              <Button
                label="Nadia"
                icon="pi pi-whatsapp"
                severity="success"
                @click="openWhatsAppNadia"
              />
              <Button
                label="Mattia"
                icon="pi pi-whatsapp"
                severity="success"
                @click="openWhatsAppMattia"
              />
            </div>
          </template>
        </Card>

      </div>

      <!-- RIGHT COLUMN — map fills full height -->
      <div class="right-col">
        <Card class="map-card">
          <template #content>
            <div class="map-embed">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14354.81212491558!2d12.269249098475342!3d44.25378708035667!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132cb1f33caaf7d7%3A0xef2fc4fe22e8018e!2sBar%20Romagna!5e0!3m2!1sit!2sit!4v1767721090967!5m2!1sit!2sit"
                width="100%"
                height="100%"
                style="border: 0"
                allowfullscreen
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                :title="t('contacts.map.title')"
              />
            </div>

            <div class="map-footer">
              <div class="map-address">
                <i class="pi pi-map-marker" />
                <div>
                  <p class="map-place">Bar Romagna</p>
                  <p class="map-street">{{ t('contacts.map.address') }}</p>
                </div>
              </div>
              <Button
                :label="t('contacts.actions.directions')"
                icon="pi pi-directions"
                severity="primary"
                outlined
                @click="openMaps"
              />
            </div>
          </template>
        </Card>
      </div>

    </div>
  </div>
</template>

<style scoped lang="scss">
.contact-page {
  min-height: 100vh;
}

// ============================================================
// HERO
// ============================================================
.hero-wrapper {
  padding: 0 1rem;

  @media (min-width: 768px) {
    padding: 0 2rem;
  }
}

.hero-section {
  position: relative;
  width: 100%;
  height: 420px;
  overflow: hidden;
  border-radius: 16px;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    height: 500px;
    margin-bottom: 2rem;
  }
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.25) 0%, rgba(3, 88, 248, 0.88) 100%);
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (min-width: 768px) {
    padding: 2.5rem;
  }
}

.status-badge {
  align-self: flex-start;
}

.hero-content {
  color: white;
}

.hero-title {
  margin: 0 0 0.75rem;
  line-height: 1.15;
  font-size: clamp(1.75rem, 5vw, 3rem);
}

.hero-subtitle {
  margin: 0 0 1.5rem;
  opacity: 0.95;
  max-width: 560px;
  font-size: 1rem;

  @media (min-width: 768px) {
    font-size: 1.0625rem;
  }
}

.hero-cta {
  align-self: flex-start;
}

// ============================================================
// MOBILE QUICK ACTIONS
// ============================================================
.quick-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  padding: 0 1rem 1rem;

  @media (min-width: 768px) {
    padding: 0 2rem 1.5rem;
  }
}

.mobile-only {
  @media (min-width: 1024px) {
    display: none;
  }
}

// ============================================================
// MAIN GRID
// ============================================================
.contact-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
  padding: 0 1rem;
  align-items: start;

  @media (min-width: 768px) {
    padding: 0 2rem;
  }

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  @media (min-width: 1280px) {
    grid-template-columns: 480px 1fr;
  }
}

// ============================================================
// LEFT COLUMN
// ============================================================
.left-col {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.info-card {
  width: 100%;
}

// Card header
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.card-title-group {
  display: flex;
  align-items: center;
  gap: 0.75rem;

  h3 {
    margin: 0;
    font-size: 1.0625rem;
  }

  i {
    font-size: 1.375rem;
    color: var(--p-primary-color);
  }
}

// Schedule
.schedule-list {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

.schedule-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
}

.schedule-day-wrap {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.schedule-day {
  font-weight: 500;
}

.schedule-time {
  font-weight: 600;
  white-space: nowrap;
}

.special-tag {
  font-size: 0.7rem;
}

// Contact rows
.contact-row {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  padding: 0.5rem 0;
  cursor: pointer;
  background: transparent;
  border: none;
  width: 100%;
  text-align: left;
  transition: transform 0.15s ease;

  &:hover {
    transform: translateX(3px);
  }
}

.contact-icon {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  i {
    font-size: 1.125rem;
  }

  &.email {
    background: #fef3c7;
    i { color: var(--p-orange-500); }
  }

  &.phone {
    background: #e0f2fe;
    i { color: var(--p-primary-color); }
  }
}

.contact-text {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  flex: 1;
  min-width: 0;
}

.contact-label {
  font-size: 0.6875rem;
  font-weight: 700;
  color: var(--p-orange-500);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.contact-value {
  font-size: 0.9375rem;
  color: var(--p-text-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.contact-arrow {
  color: var(--p-surface-300);
  font-size: 0.9rem;
  flex-shrink: 0;
}

// WhatsApp
.whatsapp-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

// ============================================================
// RIGHT COLUMN — MAP fills full height of left column
// ============================================================
.right-col {
  @media (min-width: 1024px) {
    position: sticky;
    top: 86px; // header height + gap
  }
}

.map-card {
  height: 100%;

  :deep(.p-card-body) {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  :deep(.p-card-content) {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 0;
  }
}

.map-embed {
  flex: 1;
  min-height: 320px;
  border-radius: 10px;
  overflow: hidden;

  @media (min-width: 1024px) {
    min-height: 520px;
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
  justify-content: space-between;
  gap: 1rem;
  padding: 1.25rem 1.25rem 0.25rem;
  flex-wrap: wrap;
}

.map-address {
  display: flex;
  align-items: flex-start;
  gap: 0.625rem;

  .pi-map-marker {
    font-size: 1.25rem;
    color: var(--p-orange-500);
    margin-top: 0.1rem;
    flex-shrink: 0;
  }
}

.map-place {
  margin: 0 0 0.125rem;
  font-weight: 700;
  font-size: 0.9375rem;
}

.map-street {
  margin: 0;
  font-size: 0.875rem;
  color: var(--p-text-muted-color);
}
</style>
