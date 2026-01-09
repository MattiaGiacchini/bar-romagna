<script setup lang="ts">
import { ref } from 'vue'
import { barSchedules } from '@/utils/schedule'
import { useSchedule } from '@/composables/useSchedule'

// Use centralized schedules and i18n
const { displaySchedule } = useSchedule(barSchedules)

// i18n interno del layout
const t = {
  title: 'Bar Romagna',
  nav: {
    home: 'Inicio',
    contacts: 'Contatto',
    menu: 'Menu',
  },
  footer: {
    schedule: {
      title: 'Orario'
    },
    contact: {
      title: 'Contatti',
      phoneNadia: '+39 339 593 6104',
      phoneMattia: '+39 347 37 46 945',
      email: 'barromagna.cervia@gmail.com'
    },
    social: 'Seguici'
  }
}

// Navegación centralizada
const navItems = [
  { label: t.nav.home, icon: 'pi pi-home', route: '/' },
  { label: t.nav.contacts, icon: 'pi pi-phone', route: '/contacts' },
  { label: t.nav.menu, icon: 'pi pi-book', route: '/menu' }
]

// Mobile menu state
const mobileMenuVisible = ref(false)

const toggleMobileMenu = () => {
  mobileMenuVisible.value = !mobileMenuVisible.value
}

const closeMobileMenu = () => {
  mobileMenuVisible.value = false
}

const goHome = () => {
  navigateTo('/')
}
</script>

<template>
  <div class="app-layout">
    <!-- ============================================ -->
    <!-- HEADER - Fixed Height -->
    <!-- ============================================ -->
    <header class="app-header">
      <div class="header-content">
        <!-- Mobile Header -->
        <div class="header-mobile">
          <Button
              icon="pi pi-bars"
              text
              rounded
              severity="primary"
              @click="toggleMobileMenu"
              aria-label="Menu"
          />
          <img
              src="/logo-horizontal.svg"
              alt="Bar Romagna"
              class="logo-mobile"
              @click="goHome"
          />
          <div class="spacer"></div>
        </div>

        <!-- Desktop Header -->
        <div class="header-desktop">
          <img
              src="/logo-horizontal.svg"
              alt="Bar Romagna"
              class="logo-desktop"
              @click="goHome"
          />
          <nav class="nav-desktop">
            <Button
                v-for="item in navItems"
                :key="item.route"
                :label="item.label"
                :icon="item.icon"
                text
                iconPos="left"
                @click="() => navigateTo(item.route)"
            />
          </nav>
        </div>
      </div>
    </header>

    <!-- ============================================ -->
    <!-- MOBILE MENU SIDEBAR -->
    <!-- ============================================ -->
    <Sidebar v-model:visible="mobileMenuVisible" position="left">
      <template #header>
        <div class="sidebar-header">
          <img src="/logo-horizontal.svg" alt="Bar Romagna" class="sidebar-logo" />
        </div>
      </template>

      <nav class="mobile-nav">
        <NuxtLink
            v-for="item in navItems"
            :key="item.route"
            :to="item.route"
            class="mobile-nav-item"
            @click="closeMobileMenu"
        >
          <i :class="item.icon"></i>
          <span>{{ item.label }}</span>
        </NuxtLink>
      </nav>
    </Sidebar>

    <!-- ============================================ -->
    <!-- MAIN CONTENT with centralized padding -->
    <!-- ============================================ -->
    <main class="app-main">
      <div class="main-content">
        <slot />
      </div>
    </main>

    <!-- ============================================ -->
    <!-- FOOTER - Dark with Info -->
    <!-- ============================================ -->
    <footer class="app-footer">
      <div class="footer-content">
        <div class="footer-grid">
          <!-- Horarios (usando composable) -->
          <div class="footer-section">
            <div class="footer-title">{{ t.footer.schedule.title }}</div>
            <div class="footer-info">
              <div
                  v-for="(item, index) in displaySchedule"
                  :key="index"
                  class="info-row"
              >
                <span class="schedule-days">
                  {{ item.days }}
                  <Tag
                      v-if="item.specialName"
                      :value="item.specialName"
                      severity="warn"
                      class="special-tag-footer"
                  />
                </span>
                <span class="schedule-hours">{{ item.hours }}</span>
              </div>
            </div>
          </div>

          <!-- Contactos -->
          <div class="footer-section">
            <div class="footer-title">{{ t.footer.contact.title }}</div>
            <div class="footer-info">
              <a :href="`tel:${t.footer.contact.phoneNadia}`" class="contact-link">
                <i class="pi pi-phone"></i>
                Nadia: {{ t.footer.contact.phoneNadia }}
              </a>
              <a :href="`tel:${t.footer.contact.phoneMattia}`" class="contact-link">
                <i class="pi pi-phone"></i>
                Mattia: {{ t.footer.contact.phoneMattia }}
              </a>
              <a :href="`mailto:${t.footer.contact.email}`" class="contact-link">
                <i class="pi pi-envelope"></i>
                {{ t.footer.contact.email }}
              </a>
            </div>
          </div>

          <!-- Redes Sociales -->
          <div class="footer-section">
            <div class="footer-title">{{ t.footer.social }}</div>
            <div class="social-icons">
              <Button
                  icon="pi pi-facebook"
                  rounded
                  aria-label="Facebook"
                  severity="warn"
              />
              <Button
                  icon="pi pi-instagram"
                  rounded
                  aria-label="Instagram"
                  severity="warn"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--p-surface-50);
}

// ============================================
// HEADER - Sin límite hasta 4K
// ============================================
.app-header {
  background: var(--p-surface-0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
  height: 70px;
}

.header-content {
  max-width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
  height: 100%;

  @media (min-width: 1024px) {
    padding: 0 2rem;
  }

  @media (min-width: 1920px) {
    max-width: 1920px;
  }
}

// Mobile Header
.header-mobile {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  gap: 1rem;

  @media (min-width: 1024px) {
    display: none;
  }
}

.logo-mobile {
  height: 100%;
  width: auto;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
}

.spacer {
  width: 40px;
}

// Desktop Header
.header-desktop {
  display: none;
  height: 100%;

  @media (min-width: 1024px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
  }
}

.logo-desktop {
  height: 100%;
  width: auto;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
}

.nav-desktop {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

// ============================================
// MOBILE SIDEBAR
// ============================================
.sidebar-header {
  padding: 1rem 0;
}

.sidebar-logo {
  width: 100%;
  max-width: 200px;
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-top: 1rem;
}

.mobile-nav-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  text-decoration: none;
  color: var(--p-text-color);
  border-radius: 8px;
  transition: all 0.2s ease;

  i {
    font-size: 1.25rem;
  }

  span {
    font-size: 1rem;
    font-weight: 500;
  }

  &:hover {
    background: var(--p-surface-100);
    color: var(--p-primary-color);
  }

  &.router-link-active {
    background: var(--p-primary-50);
    color: var(--p-primary-color);
    font-weight: 600;
  }
}

// ============================================
// MAIN CONTENT - Sin límite hasta 4K
// ============================================
.app-main {
  flex: 1;
  width: 100%;
}

.main-content {
  padding: 1rem 0;

  @media (min-width: 768px) {
    padding: 2rem 0;
  }
}

// ============================================
// FOOTER - Sin límite hasta 4K
// ============================================
.app-footer {
  background: var(--p-primary-800);
  color: white;
  padding: 2.5rem 1rem;
  margin-top: 3rem;

  @media (min-width: 768px) {
    margin-top: 4rem;
  }
}

.footer-content {
  max-width: 100%;
  margin: 0 auto;
  padding: 0 1rem;

  @media (min-width: 1024px) {
    padding: 0 2rem;
  }

  @media (min-width: 1920px) {
    max-width: 1920px;
  }
}

.footer-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr auto;
    gap: 3rem;
  }
}

.footer-section {
  max-width: 350px;

  .footer-title {
    margin-bottom: 1rem;
    color: var(--p-orange-500);
    font-family: 'BigChunko', system-ui, sans-serif !important;
    font-size: 1.125rem;
    font-weight: normal;
    line-height: 1.3;
  }

  @media (min-width: 768px) {
    .footer-title {
      font-size: 1.25rem;
    }
  }

  &:last-child {
    max-width: none;
  }
}

.footer-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9375rem;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.schedule-days {
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.schedule-hours {
  font-weight: 600;
}

.special-tag-footer {
  font-size: 0.625rem;
  padding: 0.125rem 0.375rem;
}

.contact-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: white;
  font-size: 0.9375rem;
  transition: all 0.2s ease;

  i {
    font-size: 1rem;
    color: var(--p-orange-500);
  }

  &:hover {
    color: var(--p-orange-400);
  }
}

.social-icons {
  display: flex;
  gap: 0.75rem;
}
</style>