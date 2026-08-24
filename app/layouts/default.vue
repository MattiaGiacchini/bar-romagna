<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from '#imports'
import { barSchedules } from '@/utils/schedule'
import { useSchedule } from '@/composables/useSchedule'

const { t, locale, locales, setLocale } = useI18n()
const { displaySchedule } = useSchedule(barSchedules)
const analytics = useAnalytics()

// Inject hreflang alternate links, canonical, og:locale and html[lang] dynamically
// based on the active locale. addSeoAttributes:true also sets og:locale.
const localeHead = useLocaleHead({ addSeoAttributes: true })
useHead(() => ({
  htmlAttrs: localeHead.value.htmlAttrs ?? {},
  link:      localeHead.value.link      ?? [],
  meta:      localeHead.value.meta      ?? [],
}))

// Keep the active locale attached as a super property on every event.
onMounted(() => analytics.setLocale(locale.value))

const navItems = computed(() => [
  { label: t('nav.home'), icon: 'pi pi-home', route: '/' },
  { label: t('nav.events'), icon: 'pi pi-calendar', route: '/events' },
  { label: t('nav.contacts'), icon: 'pi pi-phone', route: '/contacts' },
  { label: t('nav.menu'), icon: 'pi pi-book', route: '/menu' },
])

const mobileMenuVisible = ref(false)
const langMenuVisible = ref(false)

const toggleMobileMenu = () => { mobileMenuVisible.value = !mobileMenuVisible.value }
const closeMobileMenu = () => { mobileMenuVisible.value = false }
const goHome = () => { analytics.trackNav('logo', '/', 'desktop'); navigateTo('/') }

const goToRoute = (label: string, route: string, source: 'desktop' | 'mobile') => {
  analytics.trackNav(label, route, source)
  navigateTo(route)
}

// Maps locale code -> ISO 3166-1 alpha-2 country code for flag-icons
const countryCodeMap: Record<string, string> = {
  it: 'it',
  en: 'gb',
  es: 'es',
  de: 'de',
  fr: 'fr',
}

const getCountryCode = (code: string) => countryCodeMap[code] ?? code

const currentLocale = computed(() =>
  locales.value.find((l: { code: string }) => l.code === locale.value)
)

const switchLocale = (code: string) => {
  analytics.trackLanguageSwitch(locale.value, code)
  setLocale(code)
  langMenuVisible.value = false
}
</script>

<template>
  <div class="app-layout">

    <!-- ============================================ -->
    <!-- HEADER -->
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
            class="menu-toggle-btn"
            @click="toggleMobileMenu"
            aria-label="Menu"
          />
          <img
            src="/logo-horizontal.svg"
            alt="Bar Romagna"
            class="logo-mobile"
            @click="goHome"
          />
          <div class="spacer" />
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
              @click="() => goToRoute(item.label, item.route, 'desktop')"
            />
            <!-- Language switcher desktop -->
            <div class="lang-switcher">
              <button
                class="lang-btn-current"
                @click="langMenuVisible = !langMenuVisible"
              >
                <span :class="`fi fi-${getCountryCode(currentLocale?.code ?? '')} fi-lg`" class="lang-flag-icon" />
                <i class="pi pi-chevron-down lang-chevron" />
              </button>
              <div v-if="langMenuVisible" class="lang-dropdown">
                <button
                  v-for="loc in locales"
                  :key="loc.code"
                  class="lang-option"
                  :class="{ active: loc.code === locale }"
                  @click="switchLocale(loc.code)"
                >
                  <span :class="`fi fi-${getCountryCode(loc.code)} fi-lg`" class="lang-flag-icon" />
                  <span class="lang-name">{{ loc.name }}</span>
                </button>
              </div>
            </div>
          </nav>
        </div>

      </div>
    </header>

    <!-- Click-away overlay for lang dropdown -->
    <div
      v-if="langMenuVisible"
      class="lang-overlay"
      @click="langMenuVisible = false"
    />

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
          @click="analytics.trackNav(item.label, item.route, 'mobile'); closeMobileMenu()"
        >
          <i :class="item.icon" />
          <span>{{ item.label }}</span>
        </NuxtLink>
      </nav>

      <!-- Language switcher in sidebar -->
      <div class="sidebar-lang">
        <div class="sidebar-lang-title">
          <i class="pi pi-globe" />
          <span>Lingua / Language</span>
        </div>
        <div class="sidebar-lang-grid">
          <button
            v-for="loc in locales"
            :key="loc.code"
            class="sidebar-lang-option"
            :class="{ active: loc.code === locale }"
            @click="switchLocale(loc.code); closeMobileMenu()"
          >
            <span :class="`fi fi-${getCountryCode(loc.code)} fi-lg`" class="lang-flag-icon" />
            <span class="lang-name">{{ loc.name }}</span>
          </button>
        </div>
      </div>
    </Sidebar>

    <!-- ============================================ -->
    <!-- MAIN CONTENT -->
    <!-- ============================================ -->
    <main class="app-main">
      <div class="main-content">
        <slot />
      </div>
    </main>

    <!-- ============================================ -->
    <!-- FOOTER -->
    <!-- ============================================ -->
    <footer class="app-footer">
      <div class="footer-content">
        <div class="footer-grid">

          <!-- Orario -->
          <div class="footer-section">
            <div class="footer-title">{{ t('footer.schedule') }}</div>
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

          <!-- Contatti -->
          <div class="footer-section">
            <div class="footer-title">{{ t('footer.contacts') }}</div>
            <div class="footer-info">
              <a href="tel:+393395936104" class="contact-link" @click="analytics.trackContact({ method: 'call', person: 'nadia', location: 'footer' })">
                <i class="pi pi-phone" />
                Nadia: +39 339 593 6104
              </a>
              <a href="tel:+393473746945" class="contact-link" @click="analytics.trackContact({ method: 'call', person: 'mattia', location: 'footer' })">
                <i class="pi pi-phone" />
                Mattia: +39 347 37 46 945
              </a>
              <a href="mailto:barromagna.cervia@gmail.com" class="contact-link" @click="analytics.trackContact({ method: 'email', person: 'generic', location: 'footer' })">
                <i class="pi pi-envelope" />
                barromagna.cervia@gmail.com
              </a>
            </div>
          </div>

          <!-- Social -->
          <div class="footer-section">
            <div class="footer-title">{{ t('footer.social') }}</div>
            <div class="social-icons">
              <a
                href="https://www.facebook.com/p/Bar-Romagna-100094631556500/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                class="social-link"
                @click="analytics.trackSocial('facebook')"
              >
                <Button icon="pi pi-facebook" rounded severity="warn" aria-label="Facebook" />
              </a>
              <!-- Instagram hidden for now — set v-if to true to re-enable -->
              <a
                v-if="false"
                href="https://www.instagram.com/barromagna"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                class="social-link"
              >
                <Button icon="pi pi-instagram" rounded severity="warn" aria-label="Instagram" />
              </a>
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
// HEADER
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

// Mobile
.header-mobile {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  gap: 0.5rem;

  @media (min-width: 1024px) {
    display: none;
  }
}

.menu-toggle-btn {
  flex-shrink: 0;
}

.logo-mobile {
  height: 100%;
  max-height: none;
  width: auto;
  min-width: 0;
  max-width: calc(100% - 96px);
  cursor: pointer;
  transition: opacity 0.2s ease;
  object-fit: contain;
  &:hover { opacity: 0.8; }
}

.spacer {
  width: 40px;
  flex-shrink: 0;
}

// Desktop
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
  &:hover { opacity: 0.8; }
}

.nav-desktop {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

// ============================================
// LANGUAGE SWITCHER
// ============================================
.lang-switcher {
  position: relative;
}

.lang-btn-current {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.625rem;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 6px;
  color: var(--p-primary-color);
  font-size: 0.9rem;
  font-weight: 500;
  transition: background 0.15s ease;

  &:hover {
    background: var(--p-primary-50);
  }
}

.lang-chevron {
  font-size: 0.7rem;
  opacity: 0.7;
}

.lang-overlay {
  position: fixed;
  inset: 0;
  z-index: 99;
}

.lang-dropdown {
  position: absolute;
  right: 0;
  top: calc(100% + 0.5rem);
  background: var(--p-surface-0);
  border: 1px solid var(--p-surface-200);
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  min-width: 160px;
  overflow: hidden;
  z-index: 200;
  padding: 0.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.lang-option {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.5rem 0.75rem;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 6px;
  width: 100%;
  text-align: left;
  font-size: 0.9375rem;
  color: var(--p-text-color);
  transition: background 0.15s ease;

  &:hover {
    background: var(--p-surface-100);
  }

  &.active {
    background: var(--p-primary-50);
    color: var(--p-primary-color);
    font-weight: 600;
  }
}

.lang-flag-icon {
  display: inline-block;
  width: 1.33em;
  height: 1em;
  border-radius: 2px;
  flex-shrink: 0;
  vertical-align: middle;
  background-size: cover;
  background-position: center;
}

.lang-name {
  font-size: 0.9375rem;
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

  i { font-size: 1.25rem; }
  span { font-size: 1rem; font-weight: 500; }

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

// Language section inside sidebar
.sidebar-lang {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--p-surface-200);
}

.sidebar-lang-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--p-text-muted-color);
  margin-bottom: 0.75rem;
  padding: 0 0.25rem;

  i { font-size: 0.875rem; }
}

.sidebar-lang-grid {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.sidebar-lang-option {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem 1rem;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 8px;
  width: 100%;
  text-align: left;
  transition: background 0.15s ease;
  color: var(--p-text-color);

  &:hover {
    background: var(--p-surface-100);
  }

  &.active {
    background: var(--p-primary-50);
    color: var(--p-primary-color);
    font-weight: 600;
  }

  .lang-flag-icon { display: inline-block; width: 1.33em; height: 1em; background-size: cover; background-position: center; }
  .lang-name { font-size: 0.9375rem; }
}

// ============================================
// MAIN CONTENT
// ============================================
.app-main {
  flex: 1;
  width: 100%;
}

.main-content {
  padding: 1rem;

  @media (min-width: 768px) {
    padding: 2rem;
  }
}

// ============================================
// FOOTER
// ============================================
.app-footer {
  background: var(--p-primary-800);
  color: white;
  padding: 2.5rem 1rem;
  margin-top: 0;
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

  &:last-child {
    max-width: none;
  }

  .footer-title {
    margin-bottom: 1rem;
    color: var(--p-orange-500);
    font-family: 'BigChunko', system-ui, sans-serif !important;
    font-size: 1.125rem;
    font-weight: normal;
    line-height: 1.3;

    @media (min-width: 768px) {
      font-size: 1.25rem;
    }
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

.social-link {
  text-decoration: none;
}
</style>
