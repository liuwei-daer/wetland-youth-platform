<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { SITE_IMAGES } from '../../site/siteImages'

const { t, tm } = useI18n()

const items = computed(() => {
  const raw = tm('news.items')
  if (!Array.isArray(raw)) return []
  return raw.map((n) => ({
    ...n,
    image: SITE_IMAGES[n.imageKey] ?? SITE_IMAGES.marsh,
  }))
})
</script>

<template>
  <section id="news" class="section section--plain">
    <div class="news-head">
      <div class="news-head__titles">
        <span class="section__eyebrow">{{ t('news.eyebrow') }}</span>
        <h2 class="section__title section__title--left">{{ t('news.title') }}</h2>
      </div>
      <a class="news-head__more" href="#">{{ t('news.more') }}</a>
    </div>
    <div class="news-grid">
      <article v-for="(n, i) in items" :key="i" class="news-card">
        <div class="news-card__img">
          <img :src="n.image" :alt="n.title" loading="lazy" />
        </div>
        <div class="news-card__body">
          <span class="news-card__tag">{{ n.tag }}</span>
          <h3 class="news-card__title">{{ n.title }}</h3>
          <p class="news-card__excerpt">{{ n.excerpt }}</p>
          <a class="news-card__read" href="#">{{ t('news.read') }} <span aria-hidden="true">→</span></a>
        </div>
      </article>
    </div>
  </section>
</template>
