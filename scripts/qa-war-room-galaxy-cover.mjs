import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import { createRequire } from 'node:module';
const { chromium }=createRequire(import.meta.url)('playwright');
const base=process.env.BASE_URL||'http://127.0.0.1:4175';
const hash=data=>crypto.createHash('sha256').update(data).digest('hex');
const browser=await chromium.launch({channel:'msedge',headless:true});
try {
 for(const width of [1440,390,320,2560]){
  const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
  await page.goto(base+'/work',{waitUntil:'networkidle'});
  const card=page.locator('.project-entry a[href="/work/war-room"]').first();
  await card.scrollIntoViewIfNeeded();
  const image=card.locator('img');await image.evaluate(e=>e.decode());
  assert.match(await image.evaluate(e=>e.currentSrc),/war-room-galaxy-(640|1080|1600)\.webp/);
  assert.equal(await image.getAttribute('alt'),'Hero real do WAR ROOM com galáxia ilustrativa e rede de investigação interativa');
  for(const size of [640,1080,1600]){
   const file='images/projects/covers/war-room-galaxy-'+size+'.webp';
   const bytes=await page.evaluate(async file=>{const response=await fetch('/'+file);if(!response.ok)throw Error(response.status);return Array.from(new Uint8Array(await response.arrayBuffer()))},file);
   assert.equal(hash(Buffer.from(bytes)),hash(fs.readFileSync('public/'+file)));
  }
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  await page.screenshot({path:'outputs/war-room-galaxy-cover-'+width+'.png'});
  console.log('PASS: actual responsive galaxy cover, decode, alt, 3 SHA256 hashes, no overflow at '+width+'px');
  await page.close();
 }
}finally{await browser.close()}
