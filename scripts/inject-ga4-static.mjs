import fs from 'node:fs/promises';
import path from 'node:path';

const MEASUREMENT_ID = 'G-ZQ69FR849J';
const GA4 = `<script async src="https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${MEASUREMENT_ID}');</script>`;
const root = process.cwd();

async function readManifest(file) {
  try {
    const data = JSON.parse(await fs.readFile(path.join(root, file), 'utf8'));
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

async function injectFile(file) {
  let html;
  try {
    html = await fs.readFile(file, 'utf8');
  } catch {
    return false;
  }
  if (html.includes(MEASUREMENT_ID)) return false;
  if (!html.includes('</head>')) throw new Error(`Missing </head>: ${file}`);
  await fs.writeFile(file, html.replace('</head>', `${GA4}</head>`), 'utf8');
  return true;
}

async function injectGroup(type) {
  const config = type === 'jobs'
    ? { manifest: 'jobs-static.json', dir: 'jobs' }
    : type === 'articles'
      ? { manifest: 'articles-static.json', dir: 'articles' }
      : null;
  if (!config) throw new Error('Usage: node scripts/inject-ga4-static.mjs jobs|articles');

  const rows = await readManifest(config.manifest);
  let changed = 0;
  for (const item of rows) {
    const slug = typeof item === 'string' ? item : item?.slug;
    if (!slug) continue;
    const file = path.join(root, config.dir, slug, 'index.html');
    if (await injectFile(file)) changed++;
  }
  console.log(`GA4 ${MEASUREMENT_ID}: injected into ${changed}/${rows.length} ${type} prerender page(s)`);
}

await injectGroup(process.argv[2]);
