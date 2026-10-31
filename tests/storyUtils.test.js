import test from 'node:test';
import assert from 'node:assert/strict';
import {createScenes,withTiming,moveScene,contentKey,formatTime} from '../src/storyUtils.js';
import {sceneSeed} from '../src/data.js';
test('selected assets alone are used, at every duration',()=>{
 for(const duration of [15,30,60]){
  const scenes=createScenes(sceneSeed,duration,[2,99]);
  assert.ok(scenes.every(s=>s.media.length&&s.media.every(id=>[2,99].includes(id))));
  assert.equal(withTiming(scenes).at(-1).range[1],duration);
 }
});
test('reorder and duration edits preserve scene content and create contiguous timings',()=>{
 const original=createScenes(sceneSeed,30,[1,2,3,4,5,6]);
 const moved=moveScene(original,1,1);
 assert.equal(moved[1].id,1);
 assert.equal(moved[1].script,original[0].script);
 assert.equal(original[0].id,1);
 assert.equal(moveScene(original,1,-1),original);
 const timed=withTiming(moved.map(s=>s.id===1?{...s,seconds:5}:s));
 assert.equal(timed.at(-1).range[1],31);
 timed.slice(1).forEach((s,i)=>assert.equal(s.range[0],timed[i].range[1]));
});
test('file deduplication uses content independent of filename',async()=>{
 const bytes=new TextEncoder().encode('same uploaded photo');
 assert.equal(await contentKey(bytes),await contentKey(bytes.slice()));
 assert.notEqual(await contentKey(bytes),await contentKey(new TextEncoder().encode('other photo')));
});
test('duration display handles minutes',()=>assert.equal(formatTime(65),'01:05'));
