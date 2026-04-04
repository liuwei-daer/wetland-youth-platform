<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { SITE_IMAGES } from '../../site/siteImages'

const { tm } = useI18n()

const blocks = computed(() => {
  const raw = tm('splits.blocks')
  if (!Array.isArray(raw)) return []
  return raw.map((b) => ({
    ...b,
    image: SITE_IMAGES[b.imageKey] ?? SITE_IMAGES.marsh,
  }))
})
</script>

<template>
  <section id="research-projects" class="section section--plain">
    <div
      v-for="(block, i) in blocks"
      :key="i"
      class="feature"
      :class="{ 'feature--reverse': block.reverse }"
    >
      <div class="feature__text">
        <p class="feature__eyebrow">{{ block.eyebrow }}</p>
        <h2 class="feature__title">{{ block.title }}</h2>
        <p class="feature__desc">{{ block.body }}</p>
        <div class="feature__actions">
          <router-link
            v-if="block.primaryRoute"
            class="btn btn--primary"
            :to="block.primaryRoute"
          >
            {{ block.primaryCta }}
          </router-link>
          <button v-else type="button" class="btn btn--primary">{{ block.primaryCta }}</button>
          <button v-if="block.secondaryCta" type="button" class="btn btn--outline-light">
            {{ block.secondaryCta }}
          </button>
        </div>
      </div>
      <div class="feature__media">
        <img :src="block.image" :alt="block.title" loading="lazy" />
      </div>
    </div>
  </section>
</template>

<style scoped>
/* 与 landing.css 配合：桌面端整条卡片约 440px 高，图片区裁切适配 */
.feature {
  align-items: stretch;
}

.feature__media {
  display: block;
}

.feature__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.feature__text {
  min-height: 0;
  justify-content: center;
}
</style>
