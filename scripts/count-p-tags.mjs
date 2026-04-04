/**
 * 统计 HTML 中 <p> 与 </p> 数量（去掉 <style>…</style>，避免 CSS 里的 `p {` 误计）
 * 用法: node scripts/count-p-tags.mjs [路径，默认 public/test2.html]
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const target = path.resolve(root, process.argv[2] || 'public/test2.html')

if (!fs.existsSync(target)) {
  console.error('文件不存在:', target)
  process.exit(1)
}

const raw = fs.readFileSync(target, 'utf8')
const withoutStyle = raw.replace(/<style\b[\s\S]*?<\/style>/gi, '')

const openTags = withoutStyle.match(/<p(?:\s[^>]*)?>/gi) || []
const closeTags = withoutStyle.match(/<\/p>/gi) || []

console.log('文件:', path.relative(root, target))
console.log('<p ...> 数量:', openTags.length)
console.log('</p> 数量:', closeTags.length)
console.log(
  openTags.length === closeTags.length
    ? '结论: 数量一致 ✓'
    : `结论: 相差 ${openTags.length - closeTags.length}（需检查未闭合或多余闭合）`,
)
