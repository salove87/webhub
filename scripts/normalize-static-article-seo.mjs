import fs from 'node:fs/promises';
import path from 'node:path';
const root=process.cwd();
let slugs=[];
try{slugs=JSON.parse(await fs.readFile(path.join(root,'articles-static.json'),'utf8'))}catch{}
let changed=0;
for(const item of Array.isArray(slugs)?slugs:[]){
  const slug=typeof item==='string'?item:item?.slug;
  if(!slug)continue;
  const file=path.join(root,'articles',slug,'index.html');
  try{
    const before=await fs.readFile(file,'utf8');
    const after=before.replace(/(\s*\|\s*WebHub Jobs){2,}(?=<\/title>)/g,' | WebHub Jobs');
    if(after!==before){await fs.writeFile(file,after,'utf8');changed++}
  }catch{}
}
console.log(`Normalized SEO title on ${changed} article page(s)`);
