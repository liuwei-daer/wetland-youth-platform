<script setup>
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()

const newsletterEmail = ref('')

const columns = computed(() => {
  const raw = tm('footer.columns')
  return Array.isArray(raw) ? raw : []
})

const social = computed(() => {
  const raw = tm('footer.social')
  return Array.isArray(raw) ? raw : []
})

function submitNewsletter() {
  if (!newsletterEmail.value.trim()) return
  newsletterEmail.value = ''
}
</script>

<template>
  <footer id="contact" class="footer">
    <div class="footer__grid">
      <div class="footer__brand">
        <div class="footer__logo-row">
          <span class="nav__logo nav__logo--light" aria-hidden="true" />
          <span class="footer__brand-name">{{ t('nav.brand') }}</span>
        </div>
        <p class="footer__about">{{ t('footer.about') }}</p>
      </div>
      <div v-for="(col, i) in columns" :key="i" class="footer__col">
        <h4 class="footer__col-title">{{ col.title }}</h4>
        <ul>
          <li v-for="(link, j) in col.links" :key="j">
            <a href="#">{{ link }}</a>
          </li>
        </ul>
      </div>
      <div class="footer__contact">
        <h4 class="footer__col-title">{{ t('footer.contactTitle') }}</h4>
        <p>{{ t('footer.email', { at: '@' }) }}</p>
        <p>{{ t('footer.location') }}</p>
        <form class="footer__news" @submit.prevent="submitNewsletter">
          <label class="visually-hidden" for="news-email">{{ t('footer.newsletterLabel') }}</label>
          <input
            id="news-email"
            v-model="newsletterEmail"
            type="email"
            class="footer__input"
            :placeholder="t('footer.newsletterPlaceholder')"
            autocomplete="email"
          />
          <button type="submit" class="footer__submit" :aria-label="t('footer.newsletterLabel')">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
    <div class="footer__bottom">
      <p>© {{ new Date().getFullYear() }} {{ t('footer.copyright') }}</p>
      <div class="footer__social">
        <a v-for="(s, i) in social" :key="i" :href="s.href" :aria-label="s.label">{{ s.label }}</a>
      </div>
    </div>
  </footer>
</template>
