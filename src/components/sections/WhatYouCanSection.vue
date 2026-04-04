<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()

const items = computed(() => {
  const raw = tm('whatYouCan.items')
  return Array.isArray(raw) ? raw : []
})

const steps = computed(() => {
  const raw = tm('whatYouCan.steps')
  return Array.isArray(raw) ? raw : []
})
</script>

<template>
  <section class="section section--mint section--tight-top">
    <div class="section__head">
      <span class="section__eyebrow">{{ t('whatYouCan.eyebrow') }}</span>
      <h2 class="section__title">{{ t('whatYouCan.title') }}</h2>
      <p class="section__subtitle">{{ t('whatYouCan.subtitle') }}</p>
    </div>
    <div class="what-grid">
      <article v-for="(w, i) in items" :key="i" class="what-card">
        <div class="what-card__icon">{{ w.icon }}</div>
        <h3 class="what-card__title">{{ w.title }}</h3>
        <p class="what-card__text">{{ w.text }}</p>
      </article>
    </div>
    <div class="what-split">
      <div class="what-list">
        <h3 class="what-list__title">{{ t('whatYouCan.pathTitle') }}</h3>
        <ul>
          <li v-for="(step, i) in steps" :key="i">
            <span class="what-list__num">{{ i + 1 }}</span>
            <span>{{ step }}</span>
          </li>
        </ul>
      </div>
      <div class="what-quote">
        <div class="what-quote__symbol" aria-hidden="true">{{ t('whatYouCan.quoteSymbol') }}</div>
        <p class="what-quote__text">{{ t('whatYouCan.quote') }}</p>
        <p class="what-quote__sub">{{ t('whatYouCan.quoteSub') }}</p>
        <a class="what-quote__link" href="#research-projects">
          {{ t('whatYouCan.quoteCta') }}
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  </section>
</template>
