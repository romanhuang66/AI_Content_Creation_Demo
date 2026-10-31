import {generateMockStory} from './mockCreative.js';
export const storyDirections=[
 {id:'diary',name:'个人体验',tag:'让人产生共鸣',description:'先进入场景，再分享细节和自己的感受。适合生活记录、旅行日记。',arc:'场景 → 细节 → 感受',opening:title=>`关于「${title}」，我想分享一个喜欢的瞬间。`},
 {id:'guide',name:'实用攻略',tag:'让人获得参考',description:'先说明能看到什么，再按观察点展开。适合探店参考、产品介绍。',arc:'问题 → 观察点 → 参考',opening:title=>`想了解「${title}」？先看这几个观察点。`},
 {id:'question',name:'悬念提问',tag:'邀请观众思考',description:'先抛出问题，逐步展示线索，最后给出个人看法。适合表达观点。',arc:'提问 → 线索 → 回答',opening:title=>`「${title}」最打动人的，究竟是什么？`},
];
export function buildCreativePlan(idea,style,direction='diary',director={}) {
 const base=generateMockStory(idea,style),option=storyDirections.find(d=>d.id===direction)||storyDirections[0];
 const {title}=base;
 const variants={
  diary:[option.opening(title),base.seed[1].script,base.seed[2].script,base.seed[3].script,'这是我眼中的这一刻。你也有类似的感受吗？'],
  guide:[option.opening(title),'先看整体环境或外观，确认它是不是你想了解的类型。','再观察一个具体细节，把值得注意的地方拍清楚。','最后说说自己的体验，让这些画面成为参考。','收藏这些观察点，下次体验时也可以对照看看。'],
  question:[option.opening(title),'第一眼看到的，未必就是这段故事的全部。','把镜头拉近，看看这个容易错过的细节。','看完这些画面，再说说自己的答案。','这是我的看法。换作你，会怎样选择？'],
 }[option.id];
 const concise=['从这一刻开始。','先看整体。','靠近一点，看细节。','说说自己的感受。','你会怎么选？'];
 if(director.focus?.trim())variants[3]=`我最想分享的是：${director.focus.trim()}。`;
 return {...base,originalIdea:idea,direction:option.id,director:{...director},note:`${option.name} · ${option.arc}。${director.focus?`创作重点：「${director.focus}」。`:''}不补写未提供的价格、地址或产品参数。`,seed:base.seed.map((s,i)=>({...s,script:variants[i],alt:i===3&&director.focus?`这次的重点是：${director.focus.trim()}。`:s.alt,concise:i===3&&director.focus?director.focus.trim():concise[i],role:['Hook',option.id==='guide'?'Overview':'Context',option.id==='question'?'Clue':'Detail','Highlight','Ending / CTA'][i]}))};
}
// Anchor the chosen hero in the highlight, while retaining coverage of all other assets.
export function anchorHero(scenes,heroId) {
 if(!heroId)return scenes;
 const target=scenes.find(s=>s.role==='Highlight'&&!s.protected)||scenes.find(s=>!s.protected);
 if(!target)return scenes;
 return scenes.map(s=>s.id===target.id?{...s,media:[heroId,...s.media.filter(id=>id!==heroId)]}:s);
}
export function applyDirection(scenes,plan) {
 return scenes.map(s=>{
  const candidate=plan.seed.find(x=>x.id===s.id);
  return s.protected||!candidate?s:{...s,script:candidate.script,alt:candidate.alt,concise:candidate.concise,role:candidate.role,label:candidate.label};
 });
}
export const spokenLength=text=>text.replace(/[\s，。？！、；：,.!?「」“”‘’]/g,'').length;
export function reviewStory(scenes,{duration,focus,heroId,selectedMedia=[]}) {
 const total=scenes.reduce((sum,s)=>sum+s.seconds,0),used=new Set(scenes.flatMap(s=>s.media));
 const missing=selectedMedia.filter(m=>!used.has(m.id));
 const dense=scenes.filter(s=>spokenLength(s.script)>s.seconds*6);
 const focusFound=!focus||scenes.some(s=>s.script.includes(focus.trim()));
 return [
  {id:'duration',title:'时长符合预期',ok:total===duration,detail:total===duration?`当前 ${total}s，与目标一致。`:`目标 ${duration}s，当前 ${total}s；调整节奏后请确认是否接受。`,action:'duration',actionText:'按目标分配时长'},
  {id:'reading',title:'旁白留有阅读时间',ok:!dense.length,detail:dense.length?`第 ${dense.map(s=>scenes.indexOf(s)+1).join('、')} 幕旁白偏长，按每秒 6 字的演示规则检查。`:'各幕文案均在演示阅读速度范围内。',action:'compact',actionText:'逐幕查看并精简',sceneId:dense[0]?.id},
  {id:'focus',title:'表达了你的创作重点',ok:focusFound,detail:!focus?'未填写重点，此项跳过；可在 Idea 页补充。':focusFound?`已包含「${focus}」。`:`尚未表达「${focus}」。`,action:'focus',actionText:'补回创作重点'},
  {id:'hero',title:'主角素材没有被遗漏',ok:!heroId||used.has(heroId),detail:!heroId?'未指定主角素材，此项跳过。':used.has(heroId)?'指定的主角素材已进入故事。':'主角素材在编辑后被移除。',action:'hero',actionText:'安排到重点幕'},
  {id:'coverage',title:'已选素材都有去处',ok:!missing.length,detail:missing.length?`${missing.length} 个素材未使用：${missing.map(m=>m.name).join('、')}`:`${selectedMedia.length} 个已选素材均已安排。`,action:'coverage',actionText:'补入未使用素材'},
 ];
}
export function fitDuration(scenes,target) {
 const fixed=scenes.filter(s=>s.protected).reduce((sum,s)=>sum+s.seconds,0);
 const free=scenes.filter(s=>!s.protected),remaining=target-fixed;
 if(!free.length||remaining<free.length)return null;
 const original=free.reduce((sum,s)=>sum+s.seconds,0);
 const seconds=free.map(s=>Math.max(1,Math.floor(s.seconds/original*remaining)));
 let delta=remaining-seconds.reduce((a,b)=>a+b,0);
 for(let i=0;delta!==0;i=(i+1)%free.length){if(delta>0){seconds[i]++;delta--}else if(seconds[i]>1){seconds[i]--;delta++}}
 let index=0;
 return scenes.map(s=>s.protected?s:{...s,seconds:seconds[index++]});
}
