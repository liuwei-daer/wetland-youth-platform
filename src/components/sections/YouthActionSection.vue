<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { SITE_IMAGES } from '../../site/siteImages'

const { t, tm } = useI18n()

const cards = computed(() => {
  const raw = tm('youthAction.cards')
  if (!Array.isArray(raw)) return []
  return raw.map((c) => ({
    ...c,
    image: SITE_IMAGES[c.imageKey] ?? SITE_IMAGES.field,
  }))
})
</script>

<template>
  <section class="section section--mint">
    <div class="section__head">
      <span class="section__eyebrow">{{ t('youthAction.eyebrow') }}</span>
      <h2 class="section__title">{{ t('youthAction.title') }}</h2>
      <p class="section__subtitle">{{ t('youthAction.subtitle') }}</p>
    </div>
    <div class="action-stack">
      <article
        v-for="(a, i) in cards"
        :key="i"
        class="action-card"
        :class="`action-card--${a.tone}`"
      >
        <div class="action-card__img">
          <img :src="a.image" :alt="a.title" loading="lazy" />
        </div>
        <div class="action-card__body">
          <span class="action-card__badge">{{ a.badge }}</span>
          <h3 class="action-card__title">{{ a.title }}</h3>
          <p class="action-card__text">{{ a.body }}</p>
          <div class="action-card__ctas">
            <router-link
              v-if="a.primaryRoute"
              class="btn btn--primary"
              :to="a.primaryRoute"
            >
              {{ a.primaryCta }}
            </router-link>
            <button v-else type="button" class="btn btn--primary">{{ a.primaryCta }}</button>
            <button
              type="button"
              class="btn"
              :class="a.tone === 'navy' ? 'btn--outline-light' : 'btn--outline-dark'"
            >
              {{ a.secondaryCta }}
            </button>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>
