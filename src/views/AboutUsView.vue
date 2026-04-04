<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import SiteNavBar from '../components/sections/SiteNavBar.vue'
import SiteFooter from '../components/sections/SiteFooter.vue'

const { t, tm } = useI18n()

const values = computed(() => {
  const raw = tm('aboutUs.values')
  return Array.isArray(raw) ? raw : []
})

const founderParagraphs = computed(() => {
  const raw = tm('aboutUs.founderParagraphs')
  return Array.isArray(raw) ? raw : []
})
</script>

<template>
  <div class="wyp">
    <SiteNavBar />

    <main class="starter-page">
      <section class="section section--mint starter-section">
        <div class="starter-inner">
          <router-link class="about-us__back" to="/">
            <span class="about-us__back-icon" aria-hidden="true">←</span>
            {{ t('aboutUs.back') }}
          </router-link>
          <div class="about-us__card">
            <div class="about-us__segment">
              <span class="section__eyebrow">{{ t('aboutUs.eyebrow') }}</span>
              <h1 class="starter-hero__title about-us__title">{{ t('aboutUs.title') }}</h1>
              <p class="starter-hero__lead about-us__lead">{{ t('aboutUs.lead') }}</p>
            </div>

            <hr class="about-us__sep" aria-hidden="true" />

            <div class="about-us__segment">
              <h2 class="starter-section__h2">{{ t('aboutUs.introTitle') }}</h2>
              <p class="starter-section__text">{{ t('aboutUs.introBody') }}</p>
            </div>

            <hr class="about-us__sep" aria-hidden="true" />

            <div class="about-us__segment">
              <h2 class="section__title">{{ t('aboutUs.whatMakesTitle') }}</h2>
              <div class="about-us__pair">
                <h3 class="starter-module__title">{{ t('aboutUs.visionTitle') }}</h3>
                <p class="starter-module__body">{{ t('aboutUs.visionBody') }}</p>
              </div>
              <div class="about-us__pair">
                <h3 class="starter-module__title">{{ t('aboutUs.missionTitle') }}</h3>
                <p class="starter-module__body">{{ t('aboutUs.missionBody') }}</p>
              </div>
            </div>

            <hr class="about-us__sep" aria-hidden="true" />

            <div class="about-us__segment">
              <h2 class="section__title">{{ t('aboutUs.valuesTitle') }}</h2>
              <ul class="starter-modules about-us__values">
                <li v-for="(v, i) in values" :key="i" class="starter-module">
                  <h3 class="starter-module__title">{{ v.title }}</h3>
                  <p class="starter-module__body">{{ v.body }}</p>
                </li>
              </ul>
            </div>

            <hr class="about-us__sep" aria-hidden="true" />

            <div class="about-us__segment">
              <h2 class="starter-section__h2">{{ t('aboutUs.storyTitle') }}</h2>
              <p class="starter-section__text">{{ t('aboutUs.storyBody') }}</p>
            </div>

            <hr class="about-us__sep" aria-hidden="true" />

            <div class="about-us__segment">
              <h2 class="section__title">{{ t('aboutUs.founderTitle') }}</h2>
              <p
                v-for="(p, i) in founderParagraphs"
                :key="i"
                class="starter-section__text about-us__founder-p"
              >
                {{ p }}
              </p>
            </div>

            <hr class="about-us__sep" aria-hidden="true" />

            <div class="about-us__segment">
              <h2 class="section__title">{{ t('aboutUs.contactTitle') }}</h2>
              <dl class="about-us__contact">
                <div class="about-us__contact-row">
                  <dt>{{ t('aboutUs.phoneLabel') }}</dt>
                  <dd>{{ t('aboutUs.phone') }}</dd>
                </div>
                <div class="about-us__contact-row">
                  <dt>{{ t('aboutUs.emailLabel') }}</dt>
                  <dd>
                    <a :href="'mailto:' + t('aboutUs.email')">{{ t('aboutUs.email') }}</a>
                  </dd>
                </div>
                <div class="about-us__contact-row">
                  <dt>{{ t('aboutUs.poBoxLabel') }}</dt>
                  <dd>{{ t('aboutUs.poBox') }}</dd>
                </div>
                <div class="about-us__contact-row">
                  <dt>{{ t('aboutUs.addressLabel') }}</dt>
                  <dd>{{ t('aboutUs.address') }}</dd>
                </div>
                <div class="about-us__contact-row">
                  <dt>{{ t('aboutUs.postalCodeLabel') }}</dt>
                  <dd>{{ t('aboutUs.postalCode') }}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <div class="starter-cta">
        <router-link class="btn btn--primary btn--lg" to="/">
          {{ t('aboutUs.ctaHome') }}
        </router-link>
        <!-- <router-link
          class="btn btn--outline-dark btn--lg"
          :to="{ path: '/', hash: '#contact' }"
        >
          {{ t('aboutUs.ctaContact') }}
        </router-link> -->
      </div>
    </main>

    <SiteFooter />
  </div>
</template>

<style scoped>
.about-us__back {
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

.about-us__back:hover {
  opacity: 0.85;
}

.about-us__back-icon {
  font-size: 1rem;
  line-height: 1;
}

.about-us__card {
  max-width: var(--max);
  width: 100%;
  margin: 0 auto;
  padding: 2rem 1.5rem 2.25rem;
  background: var(--c-white);
  border-radius: var(--radius-lg);
  box-shadow: 0 8px 28px rgba(10, 25, 47, 0.06);
}

@media (min-width: 768px) {
  .about-us__card {
    padding: 2.5rem 2.5rem 2.75rem;
  }
}

.about-us__segment .section__title {
  margin-bottom: 1rem;
}

.about-us__pair + .about-us__pair {
  margin-top: 1.75rem;
}

.about-us__title {
  margin: 0.2rem 0 0.75rem;
  color: var(--c-primary);
}

.about-us__lead {
  color: rgba(10, 25, 47, 0.82);
}

.about-us__founder-p {
  margin: 0;
}

.about-us__founder-p + .about-us__founder-p {
  margin-top: 1rem;
}

.about-us__sep {
  margin: 2rem 0;
  border: none;
  border-top: 1px solid rgba(10, 25, 47, 0.1);
}

.about-us__values.starter-modules {
  margin-top: 1rem;
}

.about-us__values .starter-module {
  background: transparent;
  box-shadow: none;
  padding: 0.35rem 0;
  border-radius: 0;
}

@media (min-width: 768px) {
  .about-us__values.starter-modules {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.about-us__contact {
  margin: 0.5rem 0 0;
  max-width: 40rem;
}

.about-us__contact-row {
  display: grid;
  grid-template-columns: minmax(6rem, 10rem) 1fr;
  gap: 0.5rem 1.25rem;
  padding: 0.65rem 0;
  border-bottom: 1px solid rgba(15, 40, 55, 0.12);
}

.about-us__contact-row:last-child {
  border-bottom: none;
}

.about-us__contact dt {
  margin: 0;
  font-weight: 600;
  color: var(--wyp-navy-2, #0f2837);
}

.about-us__contact dd {
  margin: 0;
}

.about-us__contact a {
  color: inherit;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.about-us__contact a:hover {
  opacity: 0.85;
}
</style>
