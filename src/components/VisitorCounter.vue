<script setup>
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { isVisitorCounterEnabled, recordVisitAndGetCount } from '../lib/visitorCounter.js'

const { t } = useI18n()

const enabled = isVisitorCounterEnabled()
const count = ref(null)
const failed = ref(false)

onMounted(async () => {
  if (!enabled) return
  try {
    count.value = await recordVisitAndGetCount()
  } catch {
    failed.value = true
  }
})
</script>

<template>
  <div
    v-if="enabled"
    class="visitor-counter"
    role="status"
    :aria-label="t('visitorCounter.aria')"
  >
    <span class="visitor-counter__label">{{ t('visitorCounter.label') }}</span>
    <span v-if="failed" class="visitor-counter__value visitor-counter__value--muted">—</span>
    <span v-else-if="count === null" class="visitor-counter__value visitor-counter__value--muted">{{
      t('visitorCounter.loading')
    }}</span>
    <span v-else class="visitor-counter__value">{{ count.toLocaleString() }}</span>
  </div>
</template>

<style scoped>
.visitor-counter {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  z-index: 45;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.85rem;
  border-radius: 999px;
  font-size: 0.8125rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  background: rgba(12, 35, 64, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 8px 24px rgba(10, 25, 47, 0.2);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  pointer-events: none;
  max-width: calc(100vw - 2rem);
}

.visitor-counter__label {
  opacity: 0.88;
  white-space: nowrap;
}

.visitor-counter__value {
  font-variant-numeric: tabular-nums;
  color: #6ee7b7;
}

.visitor-counter__value--muted {
  color: rgba(255, 255, 255, 0.45);
}
</style>
