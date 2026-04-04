<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

const { locale, t, tm } = useI18n()
const route = useRoute()

const navEl = ref(null)
const menuOpen = ref(false)

function syncNavHeight() {
  const h = navEl.value?.getBoundingClientRect().height
  if (h) {
    document.documentElement.style.setProperty('--site-nav-h', `${h}px`)
  }
}

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function closeMenu() {
  menuOpen.value = false
}

function handleResize() {
  syncNavHeight()
  if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
    menuOpen.value = false
  }
}

function onDocKeydown(e) {
  if (e.key === 'Escape') closeMenu()
}

const navLinks = computed(() => {
  const raw = tm('nav.links')
  return Array.isArray(raw) ? raw : []
})

const langLabel = computed(() => (locale.value === 'zh' ? 'EN' : '中文'))

function toggleLocale() {
  locale.value = locale.value === 'en' ? 'zh' : 'en'
}

onMounted(() => {
  nextTick(() => {
    syncNavHeight()
    requestAnimationFrame(syncNavHeight)
  })
  window.addEventListener('resize', handleResize)
  document.addEventListener('keydown', onDocKeydown)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  document.removeEventListener('keydown', onDocKeydown)
  document.documentElement.style.removeProperty('--site-nav-h')
})

watch(locale, () => nextTick(() => requestAnimationFrame(syncNavHeight)))

watch(
  () => route.fullPath,
  () => {
    closeMenu()
  },
)

watch(menuOpen, () => {
  nextTick(() => {
    syncNavHeight()
    requestAnimationFrame(syncNavHeight)
  })
})
</script>

<template>
  <header ref="navEl" class="site-nav" role="banner">
    <div class="site-nav__inner">
      <router-link class="site-nav__brand" to="/">
        <div class="site-nav__mark" aria-hidden="true">
          <svg
            class="site-nav__mark-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M12 2C8 8 4 14 4 20a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4c0-6-4-12-8-18z" />
          </svg>
        </div>
        <div class="site-nav__titles">
          <p class="site-nav__acronym">{{ t('nav.acronym') }}</p>
          <p class="site-nav__name">{{ t('nav.brand') }}</p>
        </div>
      </router-link>

      <nav class="site-nav__center" aria-label="Section">
        <ul class="site-nav__links">
          <li v-for="l in navLinks" :key="l.id">
            <router-link v-if="l.path" :to="l.path">{{ l.label }}</router-link>
            <router-link v-else :to="{ path: '/', hash: '#' + l.id }">{{ l.label }}</router-link>
          </li>
        </ul>
      </nav>

      <div class="site-nav__actions">
        <button
          type="button"
          class="site-nav__menu-btn"
          :aria-expanded="menuOpen"
          aria-controls="site-nav-mobile-dropdown"
          :aria-label="menuOpen ? t('nav.menuClose') : t('nav.menuOpen')"
          @click="toggleMenu"
        >
          <svg
            v-if="!menuOpen"
            class="site-nav__menu-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            aria-hidden="true"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg
            v-else
            class="site-nav__menu-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            aria-hidden="true"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
        <button
          type="button"
          class="site-nav__lang"
          :aria-label="t('nav.langAria')"
          @click="toggleLocale"
        >
          {{ langLabel }}
        </button>
      </div>
    </div>

    <div
      id="site-nav-mobile-dropdown"
      class="site-nav__mobile-dropdown"
      :class="{ 'is-open': menuOpen }"
      :aria-hidden="!menuOpen"
    >
      <nav class="site-nav__mobile-nav" aria-label="Section">
        <ul class="site-nav__mobile-links">
          <li v-for="l in navLinks" :key="'m-' + l.id">
            <router-link
              v-if="l.path"
              class="site-nav__mobile-link"
              :to="l.path"
              @click="closeMenu"
            >
              {{ l.label }}
            </router-link>
            <router-link
              v-else
              class="site-nav__mobile-link"
              :to="{ path: '/', hash: '#' + l.id }"
              @click="closeMenu"
            >
              {{ l.label }}
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>
