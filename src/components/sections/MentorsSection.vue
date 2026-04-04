<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()

const items = computed(() => {
  const raw = tm('mentors.items')
  return Array.isArray(raw) ? raw : []
})
</script>

<template>
  <section id="mentors" class="section section--mint">
    <div class="section__head">
      <span class="section__eyebrow">{{ t('mentors.eyebrow') }}</span>
      <h2 class="section__title">{{ t('mentors.title') }}</h2>
      <p class="section__subtitle">{{ t('mentors.subtitle') }}</p>
    </div>
    <div class="sci-grid">
      <article v-for="(p, i) in items" :key="i" class="sci-card">
        <div class="sci-card__initial" aria-hidden="true">{{ p.initial }}</div>
        <h3 class="sci-card__name">{{ p.name }}</h3>
        <p class="sci-card__role">{{ p.role }}</p>
        <p class="sci-card__bio">{{ p.bio }}</p>
      </article>
    </div>
  </section>
</template>
