<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()

const cards = computed(() => {
  const raw = tm('why.cards')
  return Array.isArray(raw) ? raw : []
})
</script>

<template>
  <section id="about-wetlands" class="section section--mint">
    <div class="section__head">
      <span class="section__icon" aria-hidden="true">
        <svg viewBox="0 0 32 32" width="40" height="40" fill="none">
          <circle cx="16" cy="16" r="14" stroke="var(--c-primary)" stroke-width="2" />
          <path
            d="M10 20c2-4 5-6 6-9 1 3 4 5 6 9"
            stroke="var(--c-primary)"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </span>
      <span class="section__eyebrow">{{ t('why.eyebrow') }}</span>
      <h2 class="section__title">{{ t('why.title') }}</h2>
      <p class="section__subtitle">{{ t('why.subtitle') }}</p>
    </div>
    <div class="why-grid">
      <article v-for="(c, i) in cards" :key="i" class="why-card">
        <div class="why-card__icon">{{ c.icon }}</div>
        <h3 class="why-card__title">{{ c.title }}</h3>
        <p class="why-card__text">{{ c.text }}</p>
      </article>
    </div>
  </section>
</template>
