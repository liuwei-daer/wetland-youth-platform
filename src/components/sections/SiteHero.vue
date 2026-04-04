<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { SITE_IMAGES } from '../../site/siteImages'

const { t, tm } = useI18n()

const heroBg = SITE_IMAGES.hero

const stats = computed(() => {
  const raw = tm('hero.stats')
  return Array.isArray(raw) ? raw : []
})
</script>

<template>
  <section class="hero" :style="{ '--hero-img': `url(${heroBg})` }">
    <div id="home" class="hero__grid">
      <div class="hero__copy">
        <p class="hero__eyebrow">{{ t('hero.eyebrow') }}</p>
        <h1 class="hero__h1">{{ t('hero.title') }}</h1>
        <p class="hero__lead">{{ t('hero.body') }}</p>
        <div class="hero__ctas">
          <a class="btn btn--primary btn--lg" href="#about-wetlands">{{ t('hero.primaryCta') }}</a>
          <a class="btn btn--ghost btn--lg" href="#research-projects">{{ t('hero.secondaryCta') }}</a>
        </div>
      </div>
      <!-- <aside class="hero__card" :aria-label="t('hero.insightLabel')">
        <div v-for="(s, i) in stats" :key="i" class="hero__card-row">
          <span class="hero__card-value">{{ s.value }}</span>
          <span class="hero__card-label">{{ s.label }}</span>
        </div>
      </aside> -->
    </div>

    <p class="hero__strip-head">{{ t('hero.insightLabel') }}</p>
    <div class="hero__strip">
      <div v-for="(s, i) in stats" :key="i" class="hero__strip-item">
        <span class="hero__strip-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2L3 7v5c0 5 3.5 9.5 9 11 5.5-1.5 9-6 9-11V7l-9-5z" />
          </svg>
        </span>
        <span class="hero__strip-value">{{ s.value }}</span>
        <span class="hero__strip-label">{{ s.label }}</span>
      </div>
    </div>
  </section>
</template>
