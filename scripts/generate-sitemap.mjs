import fs from 'node:fs/promises';
import path from 'node:path';
const root=process.cwd();
async function readJson(name){try{return JSON.parse(await fs.readFile(path.join(root,name),'utf8'))}catch{return[]}}
const articles=await readJson('articles-static.json');
const jobs=await readJson('jobs-static.json');
const articleSlugs=(Array.isArray(articles)?articles:[]).map(x=>typeof x==='string'?x:x?.slug).filter(Boolean);
const jobSlugs=(Array.isArray(jobs)?jobs:[]).map(x=>typeof x==='string'?x:x?.slug).filter(Boolean);
const entries=[
  ['https://webhub.asia/','daily','1.0'],
  ['https://webhub.asia/articles.html','daily','0.9'],
  ...jobSlugs.map(s=>[`https://webhub.asia/jobs/${encodeURIComponent(s)}/`,'daily','0.9']),
  ...articleSlugs.map(s=>[`https://webhub.asia/articles/${encodeURIComponent(s)}/`,'weekly','0.8'])
];
const seen=new Set();
const urls=entries.filter(([u])=>!seen.has(u)&&seen.add(u));
const xml=`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(([u,f,p])=>`  <url>\n    <loc>${u}</loc>\n    <changefreq>${f}</changefreq>\n    <priority>${p}</priority>\n  </url>`).join('\n')}\n</urlset>\n`;
await fs.writeFile(path.join(root,'sitemap.xml'),xml,'utf8');
console.log(`Generated unified sitemap: ${jobSlugs.length} jobs, ${articleSlugs.length} articles`);
