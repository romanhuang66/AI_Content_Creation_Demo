import test from 'node:test';
import assert from 'node:assert/strict';
import {buildCreativePlan,applyDirection,anchorHero,reviewStory,fitDuration,storyDirections} from '../src/creatorLogic.js';
import {createScenes} from '../src/storyUtils.js';
const idea='杭州周末咖啡店探店',focus='下雪的窗边让我愿意多待一个下午';
const initial=()=>createScenes(buildCreativePlan(idea,'Healing').seed,30,['a','b','c','d','e']);
test('directions change structure and wording, not just labels',()=>{
 const plans=storyDirections.map(d=>buildCreativePlan(idea,'Healing',d.id,{focus,heroId:'e'}));
 assert.equal(new Set(plans.map(p=>p.seed[0].script)).size,3);
 assert.equal(plans[1].seed[1].role,'Overview');
 assert.equal(plans[2].seed[2].role,'Clue');
 plans.forEach(p=>{assert.ok(p.seed[3].script.includes(focus));assert.ok(p.seed[3].alt.includes(focus))});
});
test('direction changes preserve protected scenes, timing and every assigned asset',()=>{
 const scenes=anchorHero(initial(),'e').map((s,i)=>({...s,protected:i===0}));
 const next=applyDirection(scenes,buildCreativePlan(idea,'Healing','guide'),null);
 assert.equal(next[0],scenes[0]);
 assert.equal(next[1].role,'Overview');
 assert.deepEqual(next.map(s=>s.media),scenes.map(s=>s.media));
 assert.deepEqual(next.map(s=>s.seconds),scenes.map(s=>s.seconds));
});
test('hero anchoring preserves coverage and protected scenes',()=>{
 const scenes=initial();
 const next=anchorHero(scenes,'e');
 assert.equal(next.find(s=>s.role==='Highlight').media[0],'e');
 assert.deepEqual(new Set(next.flatMap(s=>s.media)),new Set(scenes.flatMap(s=>s.media)));
 assert.deepEqual(anchorHero(scenes.map(s=>({...s,protected:true})),'hero'),scenes.map(s=>({...s,protected:true})));
});
test('review derives explainable problems from actual scene state',()=>{
 const scenes=initial().map((s,i)=>({...s,media:['a'],script:i===0?'非常长的文案'.repeat(30):s.script}));
 const checks=reviewStory(scenes,{duration:15,focus,heroId:'e',selectedMedia:[{id:'a',name:'A'},{id:'e',name:'E'}]});
 for(const id of ['duration','reading','focus','hero','coverage'])assert.equal(checks.find(c=>c.id===id).ok,false);
 assert.equal(checks.find(c=>c.id==='reading').sceneId,1);
 const complete=anchorHero(initial(),'e').map((s,i)=>({...s,script:i===3?focus:'短文案'}));
 assert.ok(reviewStory(complete,{duration:30,focus,heroId:'e',selectedMedia:[{id:'e',name:'E'}]}).every(c=>c.ok));
});
test('fit duration uses exact seconds and never changes protected timing',()=>{
 const scenes=initial().map((s,i)=>({...s,protected:i===0}));
 for(const target of [15,30,60]){
  const next=fitDuration(scenes,target);
  assert.equal(next.reduce((sum,s)=>sum+s.seconds,0),target);
  assert.equal(next[0].seconds,scenes[0].seconds);
  assert.ok(next.every(s=>s.seconds>=1));
 }
 assert.equal(fitDuration(scenes,2),null);
 assert.equal(fitDuration(scenes.map(s=>({...s,protected:true})),30),null);
});
