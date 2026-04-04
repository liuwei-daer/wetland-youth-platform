<script setup>
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import VisitorCounter from './components/VisitorCounter.vue'

const { t, locale } = useI18n()
const route = useRoute()

watch(
  () => [route.name, locale.value],
  () => {
    if (route.name === 'starter-project') {
      document.title = t('starterProject.metaTitle')
    } else if (route.name === 'wetland-distribution') {
      document.title = t('wetlandDistribution.metaTitle')
    } else if (route.name === 'about-us') {
      document.title = t('aboutUs.metaTitle')
    } else {
      document.title = t('meta.siteTitle')
    }
  },
  { immediate: true },
)
</script>

<template>
  <router-view />
  <VisitorCounter />
</template>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  font-family:
    'Inter',
    'Noto Sans SC',
    'PingFang SC',
    'Microsoft YaHei',
    sans-serif;
  -webkit-font-smoothing: antialiased;
}

#app {
  min-height: 100vh;
}
</style>
