<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import SiteNavBar from '../components/sections/SiteNavBar.vue'
import SiteFooter from '../components/sections/SiteFooter.vue'

const { t, tm } = useI18n()

const regions = computed(() => {
  const raw = tm('wetlandDistribution.regions')
  return Array.isArray(raw) ? raw : []
})

const tips = computed(() => {
  const raw = tm('wetlandDistribution.tips')
  return Array.isArray(raw) ? raw : []
})
</script>

<template>
  <div class="wyp">
    <SiteNavBar />

    <main class="starter-page">
      <section class="section section--mint starter-section">
        <div class="starter-inner">
          <router-link class="wetland-page__back" to="/">
            <span class="wetland-page__back-icon" aria-hidden="true">←</span>
            {{ t('wetlandDistribution.back') }}
          </router-link>

          <div class="wetland-page__card">
            <div class="wetland-page__segment">
              <span class="section__eyebrow">{{ t('wetlandDistribution.eyebrow') }}</span>
              <h1 class="starter-hero__title wetland-page__title">{{ t('wetlandDistribution.title') }}</h1>
              <p class="starter-hero__lead wetland-page__lead">{{ t('wetlandDistribution.lead') }}</p>
            </div>

            <hr class="wetland-page__sep" aria-hidden="true" />

            <div class="wetland-page__segment">
              <h2 class="starter-section__h2">{{ t('wetlandDistribution.introTitle') }}</h2>
              <p class="starter-section__text">{{ t('wetlandDistribution.introBody') }}</p>
            </div>

            <hr class="wetland-page__sep" aria-hidden="true" />

            <div class="wetland-page__segment">
              <h2 class="section__title">{{ t('wetlandDistribution.regionsTitle') }}</h2>
              <ul class="starter-modules wetland-page__modules">
                <li v-for="(r, i) in regions" :key="i" class="starter-module">
                  <h3 class="starter-module__title">{{ r.title }}</h3>
                  <p class="starter-module__body">{{ r.body }}</p>
                </li>
              </ul>
            </div>

            <hr class="wetland-page__sep" aria-hidden="true" />

            <div class="wetland-page__segment">
              <h2 class="starter-section__h2">{{ t('wetlandDistribution.chinaTitle') }}</h2>
              <p class="starter-section__text">{{ t('wetlandDistribution.chinaBody') }}</p>
            </div>

            <hr class="wetland-page__sep" aria-hidden="true" />

            <div class="wetland-page__segment">
              <h2 class="section__title">{{ t('wetlandDistribution.tipsTitle') }}</h2>
              <ol class="starter-steps">
                <li v-for="(tip, i) in tips" :key="i" class="starter-steps__item">{{ tip }}</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <div class="starter-cta">
        <router-link class="btn btn--primary btn--lg" to="/">
          {{ t('wetlandDistribution.ctaHome') }}
        </router-link>
        <router-link
          class="btn btn--outline-dark btn--lg"
          :to="{ path: '/', hash: '#contact' }"
        >
          {{ t('wetlandDistribution.ctaContact') }}
        </router-link>
      </div>
    </main>

    <SiteFooter />
  </div>
</template>

<style scoped>
.wetland-page__back {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin: 0 0 1.25rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--c-primary);
  text-decoration: none;
  transition: opacity 0.15s ease, color 0.15s ease;
}

.wetland-page__back:hover {
  opacity: 0.85;
}

.wetland-page__back-icon {
  font-size: 1rem;
  line-height: 1;
}

.wetland-page__card {
  max-width: var(--max);
  width: 100%;
  margin: 0 auto;
  padding: 2rem 1.5rem 2.25rem;
  background: var(--c-white);
  border-radius: var(--radius-lg);
  box-shadow: 0 8px 28px rgba(10, 25, 47, 0.06);
}

@media (min-width: 768px) {
  .wetland-page__card {
    padding: 2.5rem 2.5rem 2.75rem;
  }
}

.wetland-page__segment .section__title {
  margin-bottom: 1rem;
}

.wetland-page__title {
  margin: 0.2rem 0 0.75rem;
  color: var(--c-primary);
}

.wetland-page__lead {
  color: rgba(10, 25, 47, 0.82);
}

.wetland-page__sep {
  margin: 2rem 0;
  border: none;
  border-top: 1px solid rgba(10, 25, 47, 0.1);
}

.wetland-page__modules.starter-modules {
  margin-top: 1rem;
  grid-template-columns: 1fr;
}

.wetland-page__modules .starter-module {
  background: transparent;
  box-shadow: none;
  padding: 0.35rem 0;
  border-radius: 0;
}
</style>
