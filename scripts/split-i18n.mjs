/**
 * 将 src/locales/en.json、zh.json 按顶级 key 拆到 modules/<locale>/<key>.json，
 * 并生成 src/locales/en.js、zh.js 聚合导出（供 i18n 使用）。
 * 运行：node scripts/split-i18n.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const localesRoot = path.join(__dirname, '../src/locales')

function splitLocale(locale) {
  const srcPath = path.join(localesRoot, `${locale}.json`)
  if (!fs.existsSync(srcPath)) {
    console.error(`split-i18n: missing ${srcPath}; place merged ${locale}.json there first.`)
    process.exit(1)
  }
  const raw = fs.readFileSync(srcPath, 'utf8')
  const data = JSON.parse(raw)
  const keys = Object.keys(data).sort()
  const modDir = path.join(localesRoot, 'modules', locale)
  fs.mkdirSync(modDir, { recursive: true })

  for (const k of keys) {
    const chunk = { [k]: data[k] }
    const outPath = path.join(modDir, `${k}.json`)
    fs.writeFileSync(outPath, `${JSON.stringify(chunk, null, 2)}\n`, 'utf8')
  }

  const imports = keys.map((k) => `import ${k} from './modules/${locale}/${k}.json'`).join('\n')
  const body = keys.map((k) => `  ...${k},`).join('\n')
  const js = `${imports}\n\nexport default {\n${body}\n}\n`
  fs.writeFileSync(path.join(localesRoot, `${locale}.js`), js, 'utf8')
}

for (const locale of ['en', 'zh']) {
  splitLocale(locale)
}

console.log('split-i18n: wrote modules/en/*.json, modules/zh/*.json, en.js, zh.js')
