/**
 * 纯静态站「累计访问」：优先使用自定义 URL（反代/其它服务），否则使用 CountAPI。
 *
 * 环境变量（Vite）：
 * - VITE_VISITOR_COUNTER_DISABLED=true     关闭悬浮计数
 * - VITE_VISITOR_COUNTER_CUSTOM_URL=      自定义接口（GET），返回 JSON，见下方 parseCountPayload
 * - VITE_VISITOR_COUNTER_NS / KEY        仅 CountAPI 使用
 *
 * 自定义接口约定：GET 后返回 JSON，且包含数字字段之一：value | count | visits | total
 * （用于 Nginx 反代、Cloudflare Worker、Supabase Edge、国内云函数等）
 */
const COUNTAPI_BASE = 'https://api.countapi.xyz'

export function isVisitorCounterEnabled() {
  return import.meta.env.VITE_VISITOR_COUNTER_DISABLED !== 'true'
}

function parseCountPayload(data) {
  if (data == null || typeof data !== 'object') {
    throw new Error('counter_bad_payload')
  }
  const n =
    typeof data.value === 'number'
      ? data.value
      : typeof data.count === 'number'
        ? data.count
        : typeof data.visits === 'number'
          ? data.visits
          : typeof data.total === 'number'
            ? data.total
            : NaN
  if (!Number.isFinite(n)) {
    throw new Error('counter_bad_payload')
  }
  return n
}

async function fetchCountFromUrl(url) {
  const res = await fetch(url, { method: 'GET', credentials: 'omit' })
  if (!res.ok) {
    throw new Error(`counter_${res.status}`)
  }
  const data = await res.json()
  return parseCountPayload(data)
}

export async function recordVisitAndGetCount() {
  const custom = import.meta.env.VITE_VISITOR_COUNTER_CUSTOM_URL?.trim()
  if (custom) {
    return fetchCountFromUrl(custom)
  }

  const ns = import.meta.env.VITE_VISITOR_COUNTER_NS || 'ywrn-wetland-youth'
  const key = import.meta.env.VITE_VISITOR_COUNTER_KEY || 'site-hits'
  const url = `${COUNTAPI_BASE}/hit/${encodeURIComponent(ns)}/${encodeURIComponent(key)}`
  return fetchCountFromUrl(url)
}
