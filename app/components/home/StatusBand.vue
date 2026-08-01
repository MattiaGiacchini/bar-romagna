<script setup lang="ts">
// Slim blue status band: live open/closed tag + today's hours.
interface BarStatus { status: string; label: string; severity: 'warn' | 'primary' }

defineProps<{
  status: BarStatus
  statusText: string
  hours: string
}>()

const { t } = useI18n()
</script>

<template>
  <section class="sb sb1">
    <div class="sb1-inner">
      <div class="sb1-left">
        <Tag :value="status.label" icon="pi pi-circle-fill" :severity="status.severity" />
        <span class="sb1-text">{{ statusText }}</span>
      </div>
      <div class="sb1-right">
        <i class="pi pi-clock sb1-icon" />
        <span class="sb1-hours">{{ t('home.status.todayHours') }}: {{ hours }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
$r: 16px;

.sb { border-radius: $r; overflow: hidden; }
.sb1 { background: var(--p-primary-800); padding: 0.875rem 1.5rem; }
.sb1-inner { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 0.75rem; }
.sb1-left { display: flex; align-items: center; gap: 0.75rem; }
.sb1-text { color: white; font-size: 0.9375rem; font-weight: 600; }
.sb1-right { display: flex; align-items: center; gap: 0.5rem; color: rgba(255,255,255,0.75); font-size: 0.875rem; }
.sb1-icon { color: var(--p-orange-400); }
.sb1-hours { color: rgba(255,255,255,0.9); }
</style>
