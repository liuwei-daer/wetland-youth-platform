<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()

const stats = computed(() => {
  const raw = tm('crisis.stats')
  return Array.isArray(raw) ? raw : []
})
</script>

<template>
  <section class="stats-banner">
    <p class="stats-banner__eyebrow">{{ t('crisis.eyebrow') }}</p>
    <h2 class="stats-banner__title">{{ t('crisis.title') }}</h2>
    <p class="stats-banner__lead">{{ t('crisis.lead') }}</p>
    <div class="stats-banner__grid">
      <div v-for="(b, i) in stats" :key="i" class="stats-banner__card">
        <span class="stats-banner__value">{{ b.value }}</span>
        <span class="stats-banner__label">{{ b.label }}</span>
      </div>
    </div>
  </section>
</template>
