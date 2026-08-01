<script setup lang="ts">
// Contacts left panel — opening hours, contact rows and WhatsApp shortcuts.
interface BarStatus { status: string; label: string; severity: 'warn' | 'primary' }
interface ScheduleRow { days: string; hours: string; specialName?: string }

defineProps<{
  status: BarStatus
  schedule: ScheduleRow[]
}>()

const { t } = useI18n()
const analytics = useAnalytics()

const callNadia   = () => { analytics.trackContact({ method: 'call', person: 'nadia', location: 'contacts' }); window.location.href = 'tel:+393395936104' }
const callMattia  = () => { analytics.trackContact({ method: 'call', person: 'mattia', location: 'contacts' }); window.location.href = 'tel:+393473746945' }
const sendEmail   = () => { analytics.trackContact({ method: 'email', person: 'generic', location: 'contacts' }); window.location.href = 'mailto:barromagna.cervia@gmail.com' }
const openWhatsAppNadia  = () => { analytics.trackContact({ method: 'whatsapp', person: 'nadia', location: 'contacts' }); window.open('https://wa.me/393395936104', '_blank') }
const openWhatsAppMattia = () => { analytics.trackContact({ method: 'whatsapp', person: 'mattia', location: 'contacts' }); window.open('https://wa.me/393473746945', '_blank') }
</script>

<template>
  <div class="left-col panel-a-col">

    <!-- Opening hours -->
    <div class="panel-a-section">
      <div class="panel-a-header">
        <h2 class="panel-a-title">{{ t('contacts.schedule.title') }}</h2>
        <Tag :value="status.label" icon="pi pi-circle-fill" :severity="status.severity" />
      </div>
      <div class="schedule-list">
        <div
          v-for="(item, i) in schedule"
          :key="i"
          class="schedule-row"
          :class="{ 'is-closed': item.hours === t('schedule.closed') }"
        >
          <div class="schedule-day-wrap">
            <span class="schedule-day">{{ item.days }}</span>
            <Tag v-if="item.specialName" :value="item.specialName" severity="warn" class="special-tag" />
          </div>
          <span class="schedule-time">{{ item.hours }}</span>
        </div>
      </div>
    </div>

    <div class="panel-a-sep" />

    <!-- Contact info -->
    <div class="panel-a-section">
      <div class="panel-a-header">
        <h2 class="panel-a-title">{{ t('contacts.contact.title') }}</h2>
      </div>
      <div class="contact-list">
        <button class="contact-row-a" @click="sendEmail">
          <i class="pi pi-envelope contact-icon-a" />
          <div class="contact-text">
            <span class="contact-label">{{ t('contacts.contact.email') }}</span>
            <span class="contact-value">barromagna.cervia@gmail.com</span>
          </div>
          <i class="pi pi-chevron-right arrow" />
        </button>
        <button class="contact-row-a" @click="callNadia">
          <i class="pi pi-phone contact-icon-a" />
          <div class="contact-text">
            <span class="contact-label">Nadia</span>
            <span class="contact-value">+39 339 59 36 104</span>
          </div>
          <i class="pi pi-chevron-right arrow" />
        </button>
        <button class="contact-row-a" @click="callMattia">
          <i class="pi pi-phone contact-icon-a" />
          <div class="contact-text">
            <span class="contact-label">Mattia</span>
            <span class="contact-value">+39 347 37 46 945</span>
          </div>
          <i class="pi pi-chevron-right arrow" />
        </button>
      </div>
    </div>

    <div class="panel-a-sep" />

    <!-- WhatsApp -->
    <div class="panel-a-section">
      <div class="panel-a-header">
        <h2 class="panel-a-title">WhatsApp</h2>
      </div>
      <div class="whatsapp-btns">
        <Button label="Nadia" icon="pi pi-whatsapp" severity="success" class="whatsapp-btn" @click="openWhatsAppNadia" />
        <Button label="Mattia" icon="pi pi-whatsapp" severity="success" class="whatsapp-btn" @click="openWhatsAppMattia" />
      </div>
    </div>

  </div>
</template>

<style scoped lang="scss">
// h2 — BigChunko from theme.scss. No font-family override.
$r:    16px;
$r-sm: 10px;

.left-col {
  border-radius: $r;
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
}

.panel-a-col {
  background: var(--p-surface-0);
  border: 1px solid var(--p-surface-200);
  box-shadow: 0 2px 12px rgba(0,0,0,0.05);
}

.panel-a-section { display: flex; flex-direction: column; }

.panel-a-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.panel-a-title {
  margin: 0;
  color: var(--p-primary-color);
}

.panel-a-sep {
  height: 2px;
  background: var(--p-orange-500);
  margin: 1.5rem 0;
  opacity: 0.45;
  border-radius: 1px;
}

.schedule-list {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.schedule-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.5rem;
  border-radius: $r-sm;
  transition: background 0.1s ease;

  &.is-closed {
    .schedule-day  { color: var(--p-text-muted-color); }
    .schedule-time { color: var(--p-text-muted-color); font-weight: 400; }
  }
}

.schedule-day-wrap { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; }
.schedule-day  { font-weight: 500; font-size: 0.9375rem; }
.schedule-time { font-weight: 700; font-size: 0.9375rem; white-space: nowrap; }
.special-tag   { font-size: 0.7rem; }

.contact-list { display: flex; flex-direction: column; gap: 0.125rem; }

.contact-row-a {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  padding: 0.625rem 0.375rem;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: $r-sm;
  width: 100%;
  text-align: left;
  transition: background 0.15s ease;

  &:hover { background: rgba(3, 88, 248, 0.06); }
}

.contact-icon-a {
  font-size: 1.125rem;
  color: var(--p-primary-color);
  flex-shrink: 0;
  width: 20px;
  text-align: center;
}

.contact-text {
  display: flex;
  flex-direction: column;
  gap: 0.075rem;
  flex: 1;
  min-width: 0;
}

.contact-label {
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: var(--p-orange-500);
}

.contact-value {
  font-size: 0.9375rem;
  color: var(--p-text-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.arrow {
  color: var(--p-surface-600);
  font-size: 0.875rem;
  flex-shrink: 0;
}

.whatsapp-btns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.whatsapp-btn { width: 100%; }
</style>
