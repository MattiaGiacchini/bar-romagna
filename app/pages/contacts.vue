<script setup lang="ts">
import { useSchedule } from '@/composables/useSchedule'
import {barSchedules} from "@/utils/schedule";

// i18n
const t = {
  header: {
    title: 'Contatto'
  },
  hero: {
    title: 'Caffè al mattino,<br>Aperitivo al pomeriggio.',
    subtitle: 'Il tuo bar di fiducia a Cervia per una colazione, un aperitivo o una serata tra amici.'
  },
  actions: {
    call: 'Chiama',
    directions: 'Come arrivare'
  },
  schedule: {
    title: 'Orario di Apertura'
  },
  contact: {
    title: 'Contattaci',
    email: 'EMAIL',
    whatsapp: 'WhatsApp'
  },
  map: {
    title: 'Dove trovarci',
    address: 'Via Salara Statale, 35/M, Cervia (RA)',
  },
  footer: {
    social: 'Seguici sui social per eventi e novità'
  }
}


// Use schedule composable
const { barStatus, displaySchedule } = useSchedule(barSchedules)

const openMaps = () => {
  window.open('https://www.google.com/maps/place/Bar+Romagna/@44.2524022,12.3110341,11.82z/data=!4m6!3m5!1s0x132cb1f33caaf7d7:0xef2fc4fe22e8018e!8m2!3d44.2562331!4d12.2766308!16s%2Fg%2F11bxf1y8yn?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoKLDEwMDc5MjA2OUgBUAM%3D', '_blank')
}

const callNadia = () => {
  window.location.href = 'tel:+393395936104'
}

const callMattia = () => {
  window.location.href = 'tel:+393473746945'
}

const sendEmail = () => {
  window.location.href = 'mailto:barromagna.cervia@gmail.com'
}

const openWhatsAppNadia = () => {
  window.open('https://wa.me/393395936104', '_blank')
}

const openWhatsAppMattia = () => {
  window.open('https://wa.me/393473746945', '_blank')
}
</script>

<!-- ============================================ -->
<!-- CONTACT PAGE CONTAINER -->
<!-- ============================================ -->
<template>
  <div class="contact-page">

    <!-- ============================================ -->
    <!-- HERO BANNER SECTION -->
    <!-- Can be extracted to: components/HeroBanner.vue -->
    <!-- ============================================ -->
    <div class="hero-wrapper">
      <div class="hero-section">
        <img
            src="/bar-view.jpg"
            alt="Bar Romagna"
            class="hero-image"
        />
        <div class="hero-overlay">
          <Tag
              :value="barStatus.label"
              icon="pi pi-circle-fill"
              :severity="barStatus.severity"
              class="status-badge"
          />
          <div class="hero-content">
            <h1 class="hero-title" v-html="t.hero.title"></h1>
            <p class="hero-subtitle">
              {{ t.hero.subtitle }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- ============================================ -->
    <!-- ACTION BUTTONS (Mobile Only) -->
    <!-- Can be extracted to: components/QuickActions.vue -->
    <!-- ============================================ -->
    <div class="action-buttons-wrapper mobile-only">
      <div class="action-buttons">
        <Button
            :label="t.actions.call"
            icon="pi pi-phone"
            severity="warn"
            size="large"
            @click="callNadia"
        />
        <Button
            :label="t.actions.directions"
            icon="pi pi-map-marker"
            size="large"
            @click="openMaps"
        />
      </div>
    </div>

    <!-- ============================================ -->
    <!-- MAIN CONTENT - TWO COLUMN LAYOUT -->
    <!-- ============================================ -->
    <div class="contact-container">

      <!-- ============================================ -->
      <!-- LEFT COLUMN: Schedule + Contact Cards -->
      <!-- ============================================ -->
      <div class="left-column">

        <!-- ============================================ -->
        <!-- SCHEDULE CARD -->
        <!-- Can be extracted to: components/ScheduleCard.vue -->
        <!-- ============================================ -->
        <Card>
          <template #content>
            <div class="card-header">
              <div class="card-title-group">
                <i class="pi pi-clock"></i>
                <h3>{{ t.schedule.title }}</h3>
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
                <div class="schedule-day-wrapper">
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

        <!-- ============================================ -->
        <!-- CONTACT CARD -->
        <!-- Can be extracted to: components/ContactCard.vue -->
        <!-- ============================================ -->
        <Card>
          <template #content>
            <div class="card-header">
              <div class="card-title-group">
                <i class="pi pi-phone"></i>
                <h3>{{ t.contact.title }}</h3>
              </div>
            </div>

            <Divider />

            <!-- Email -->
            <div class="contact-item" @click="sendEmail">
              <div class="contact-info">
                <div class="contact-icon-circle email">
                  <i class="pi pi-envelope"></i>
                </div>
                <div class="contact-text">
                  <span class="contact-label">{{ t.contact.email }}</span>
                  <span class="contact-value">barromagna.cervia@gmail.com</span>
                </div>
              </div>
              <i class="pi pi-chevron-right contact-arrow"></i>
            </div>

            <Divider />

            <!-- Nadia Phone -->
            <div class="contact-item" @click="callNadia">
              <div class="contact-info">
                <div class="contact-icon-circle phone">
                  <i class="pi pi-phone"></i>
                </div>
                <div class="contact-text">
                  <span class="contact-label">NADIA</span>
                  <span class="contact-value">+39 339 59 36 104</span>
                </div>
              </div>
              <i class="pi pi-chevron-right contact-arrow"></i>
            </div>

            <Divider />

            <!-- Mattia Phone -->
            <div class="contact-item" @click="callMattia">
              <div class="contact-info">
                <div class="contact-icon-circle phone">
                  <i class="pi pi-phone"></i>
                </div>
                <div class="contact-text">
                  <span class="contact-label">MATTIA</span>
                  <span class="contact-value">+39 347 37 46 945</span>
                </div>
              </div>
              <i class="pi pi-chevron-right contact-arrow"></i>
            </div>
          </template>
        </Card>

        <!-- ============================================ -->
        <!-- WHATSAPP CARD -->
        <!-- Can be extracted to: components/WhatsAppCard.vue -->
        <!-- ============================================ -->
        <Card>
          <template #content>
            <div class="card-header">
              <div class="card-title-group">
                <i class="pi pi-whatsapp"></i>
                <h3>{{ t.contact.whatsapp }}</h3>
              </div>
            </div>

            <Divider />

            <div class="whatsapp-buttons">
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

      <!-- ============================================ -->
      <!-- RIGHT COLUMN: Map -->
      <!-- ============================================ -->
      <div class="right-column">

        <!-- ============================================ -->
        <!-- MAP CARD -->
        <!-- Can be extracted to: components/LocationMap.vue -->
        <!-- ============================================ -->
        <Card class="map-card">
          <template #content>
            <div class="map-container">
              <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14354.81212491558!2d12.269249098475342!3d44.25378708035667!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132cb1f33caaf7d7%3A0xef2fc4fe22e8018e!2sBar%20Romagna!5e0!3m2!1ses!2ses!4v1767721090967!5m2!1ses!2ses"
                  width="100%"
                  height="100%"
                  style="border:0;"
                  allowfullscreen=""
                  loading="lazy"
              ></iframe>
            </div>
            <div class="map-info">
              <div class="map-title-group">
                <i class="pi pi-map-marker"></i>
                <h3>{{ t.map.title }}</h3>
              </div>
              <p>{{ t.map.address }}</p>
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
  background-color: var(--surface-50); // Beige background
}

// Hero Section Full Width with rounded corners
.hero-wrapper {
  padding: 0 1rem;

  @media (min-width: 768px) {
    padding: 0 2rem;
  }
}

.hero-section {
  position: relative;
  width: 100%;
  height: 400px;
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
  background: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(3,88,248,0.85));
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.status-badge {
  align-self: flex-start;
}

.hero-content {
  color: white;
}

.hero-title {
  margin: 0 0 1rem 0;
  line-height: 1.2;
}

.hero-subtitle {
  margin: 0;
  opacity: 0.95;
  max-width: 600px;
}

// Action Buttons (mobile only)
.action-buttons-wrapper {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1rem 1rem 1rem;

  @media (min-width: 768px) {
    padding: 0 2rem 2rem 2rem;
  }
}

.action-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.mobile-only {
  @media (min-width: 1024px) {
    display: none;
  }
}

// Container for columns
.contact-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 1024px) {
    flex-direction: row;
    padding: 0 2rem;
    gap: 2rem;
    align-items: flex-start;

    .left-column {
      flex: 1;
      max-width: 600px;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .right-column {
      flex: 1;
    }
  }

  .left-column {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    @media (min-width: 1024px) {
      gap: 1.5rem;
    }
  }
}

// Schedule Card
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
  }

  .pi-clock {
    font-size: 1.5rem;
  }

  .pi-phone {
    font-size: 1.5rem;
  }

  .pi-whatsapp {
    font-size: 1.5rem;
  }
}

.schedule-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.schedule-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
}

.schedule-day-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.schedule-day {
  font-weight: 500;
}

.schedule-time {
  font-weight: 600;
}

.today-tag {
  font-size: 0.75rem;
}

.special-tag {
  font-size: 0.75rem;
}

// Contact Card Items - REDUCED SIZE
.contact-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateX(4px);
  }
}

.contact-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
  min-width: 0;
}

.contact-icon-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: #e3f2fd;

  i {
    font-size: 1.125rem;
    color: var(--primary-color);
  }

  &.email {
    background: #fef3c7;

    i {
      color: var(--orange-500);
    }
  }
}

.contact-text {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  min-width: 0;
}

.contact-label {
  font-size: 0.6875rem;
  font-weight: 600;
  color: var(--orange-500);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.contact-value {
  font-size: 0.9375rem;
  color: var(--text-color);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.contact-arrow {
  color: #cbd5e1;
  font-size: 1rem;
  flex-shrink: 0;
}

// WhatsApp Card
.whatsapp-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

// Map Card
.map-card {
  min-height: 500px;

  @media (min-width: 1024px) {
    min-height: 700px;
  }
}

.map-container {
  position: relative;
  width: 100%;
  height: 400px;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 1rem;

  @media (min-width: 1024px) {
    height: 600px;
  }
}

.map-info {
  .map-title-group {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.5rem;

    h3 {
      margin: 0;
    }

    .pi-map-marker {
      font-size: 1.5rem;
      color: var(--orange-500);
    }
  }

  p {
    margin: 0;
  }
}

// Social Footer Full Width
.social-footer-full {
  width: 100%;
  text-align: center;
  padding: 2rem 1rem;
  margin-top: 2rem;

  p {
    margin: 0 0 1rem 0;
  }

  .social-icons {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }
}
</style>