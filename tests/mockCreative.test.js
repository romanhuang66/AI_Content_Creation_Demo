import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';
import {describeIdea,generateMockStory,generateMockMedia} from '../src/mockCreative.js';
test('brief determines topic, title, scripts and alternative text',()=>{
 for(const [idea,theme] of [['云南旅行 Vlog，沿途风景','travel'],['无线耳机产品介绍','product'],['我的读书日常','daily'],['杭州咖啡店探店','cafe']]){
  assert.equal(describeIdea(idea).theme,theme);
  const story=generateMockStory(idea,'Healing');
  assert.ok(story.seed[0].script.includes(story.title));
  assert.ok(story.seed[0].alt.includes(story.title));
  if(theme!=='cafe')assert.ok(story.seed.every(s=>!s.script.includes('咖啡')));
 }
});
test('mock gallery uses stable unique IDs and local existing image files for each theme',()=>{
 for(const idea of ['咖啡店','旅行','耳机产品介绍','我的读书日常']){
  const assets=generateMockMedia(idea);
  assert.equal(assets.length,6);
  assert.equal(new Set(assets.map(m=>m.id)).size,6);
  assets.forEach(m=>{assert.equal(m.source,'generated');assert.ok(existsSync(`public${m.image}`))});
  assert.deepEqual(generateMockMedia(idea).map(m=>m.id),assets.map(m=>m.id));
 }
 assert.ok(generateMockMedia('耳机产品介绍').every(m=>m.image.includes('headphones')));
});
