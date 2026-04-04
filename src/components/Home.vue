<script setup>

import { watch } from 'vue'

import { useI18n } from 'vue-i18n'

import SiteNavBar from './sections/SiteNavBar.vue'

import SiteHero from './sections/SiteHero.vue'

import WhyWetlandsSection from './sections/WhyWetlandsSection.vue'

import SplitFeaturesSection from './sections/SplitFeaturesSection.vue'

import YouthActionSection from './sections/YouthActionSection.vue'

import WhatYouCanSection from './sections/WhatYouCanSection.vue'

import CrisisBannerSection from './sections/CrisisBannerSection.vue'

import NewsSection from './sections/NewsSection.vue'

import MentorsSection from './sections/MentorsSection.vue'

import SiteFooter from './sections/SiteFooter.vue'



const { locale } = useI18n()



watch(

  locale,

  (l) => {

    document.documentElement.lang = l === 'zh' ? 'zh-CN' : 'en'

  },

  { immediate: true },

)

</script>


<template>

  <div class="wyp">

    <SiteNavBar />

    <SiteHero />

    <WhyWetlandsSection />

    <SplitFeaturesSection />

    <YouthActionSection />

    <WhatYouCanSection />

    <CrisisBannerSection />

    <NewsSection />

    <MentorsSection />

    <SiteFooter />

  </div>

</template>

