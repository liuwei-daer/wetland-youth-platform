import { readdir } from 'node:fs/promises'
import { join, extname, basename } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const dir = join(__dirname, '../src/assets/images')
const exts = new Set(['.jpg', '.jpeg', '.png'])

const files = await readdir(dir)
/** 同名多格式时优先用 jpg/jpeg，避免 global-wetlands.jpg 与 .png 各转一次 */
const byStem = new Map()
for (const name of files) {
  const ext = extname(name).toLowerCase()
  if (!exts.has(ext)) continue
  const stem = basename(name, ext)
  const priority = ext === '.png' ? 1 : 2
  const cur = byStem.get(stem)
  if (!cur || priority > cur.priority) {
    byStem.set(stem, { name, priority })
  }
}

for (const [stem, { name }] of byStem) {
  const input = join(dir, name)
  const out = join(dir, `${stem}.webp`)
  await sharp(input).webp({ quality: 82 }).toFile(out)
  console.log('wrote', out)
}
