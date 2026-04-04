<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import SiteNavBar from '../components/sections/SiteNavBar.vue'
import SiteFooter from '../components/sections/SiteFooter.vue'

const { t, tm } = useI18n()

const modules = computed(() => {
  const raw = tm('starterProject.modules')
  return Array.isArray(raw) ? raw : []
})

const steps = computed(() => {
  const raw = tm('starterProject.steps')
  return Array.isArray(raw) ? raw : []
})
</script>

<template>
  <div class="wyp">
    <SiteNavBar />

    <main class="starter-page">
      <section class="section section--mint starter-section">
        <div class="starter-inner">
          <router-link class="starter-project__back" to="/">
            <span class="starter-project__back-icon" aria-hidden="true">←</span>
            {{ t('starterProject.back') }}
          </router-link>

          <div class="starter-project__card">
            <div class="starter-project__segment">
              <span class="section__eyebrow">{{ t('starterProject.eyebrow') }}</span>
              <h1 class="starter-hero__title starter-project__title">{{ t('starterProject.title') }}</h1>
              <p class="starter-hero__lead starter-project__lead">{{ t('starterProject.lead') }}</p>
            </div>

            <hr class="starter-project__sep" aria-hidden="true" />

            <div class="starter-project__segment">
              <h2 class="starter-section__h2">{{ t('starterProject.introTitle') }}</h2>
              <p class="starter-section__text">{{ t('starterProject.introBody') }}</p>
            </div>

            <hr class="starter-project__sep" aria-hidden="true" />

            <div class="starter-project__segment">
              <h2 class="section__title">{{ t('starterProject.modulesTitle') }}</h2>
              <ul class="starter-modules starter-project__modules">
                <li v-for="(m, i) in modules" :key="i" class="starter-module">
                  <h3 class="starter-module__title">{{ m.title }}</h3>
                  <p class="starter-module__body">{{ m.body }}</p>
                </li>
              </ul>
            </div>

            <hr class="starter-project__sep" aria-hidden="true" />

            <div class="starter-project__segment">
              <h2 class="section__title">{{ t('starterProject.stepsTitle') }}</h2>
              <ol class="starter-steps">
                <li v-for="(s, i) in steps" :key="i" class="starter-steps__item">{{ s }}</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <div class="starter-cta">
        <router-link class="btn btn--primary btn--lg" to="/">
          {{ t('starterProject.ctaHome') }}
        </router-link>
        <router-link
          class="btn btn--outline-dark btn--lg"
          :to="{ path: '/', hash: '#contact' }"
        >
          {{ t('starterProject.ctaContact') }}
        </router-link>
      </div>
    </main>

    <SiteFooter />
  </div>
</template>

<style scoped>
.starter-project__back {
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

.starter-project__back:hover {
  opacity: 0.85;
}

.starter-project__back-icon {
  font-size: 1rem;
  line-height: 1;
}

.starter-project__card {
  max-width: var(--max);
  width: 100%;
  margin: 0 auto;
  padding: 2rem 1.5rem 2.25rem;
  background: var(--c-white);
  border-radius: var(--radius-lg);
  box-shadow: 0 8px 28px rgba(10, 25, 47, 0.06);
}

@media (min-width: 768px) {
  .starter-project__card {
    padding: 2.5rem 2.5rem 2.75rem;
  }
}

.starter-project__segment .section__title {
  margin-bottom: 1rem;
}

.starter-project__title {
  margin: 0.2rem 0 0.75rem;
  color: var(--c-primary);
}

.starter-project__lead {
  color: rgba(10, 25, 47, 0.82);
}

.starter-project__sep {
  margin: 2rem 0;
  border: none;
  border-top: 1px solid rgba(10, 25, 47, 0.1);
}

.starter-project__modules.starter-modules {
  margin-top: 1rem;
  grid-template-columns: 1fr;
}

.starter-project__modules .starter-module {
  background: transparent;
  box-shadow: none;
  padding: 0.35rem 0;
  border-radius: 0;
}

</style>
