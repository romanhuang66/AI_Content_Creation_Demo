import {mediaSeed,sceneSeed} from './data.js';

export const ideaExamples = ['杭州周末咖啡店探店，轻松治愈，有生活感', '云南旅行 Vlog，记录山川与沿途风景', '介绍一款无线耳机，突出外观与日常使用体验'];
export function describeIdea(idea) {
  const text=idea.trim();
  const title=(text.replace(/^(请|帮我|我想|想要|制作|做一条|做一个|做|拍一条|拍一个|一条|一个|关于|视频：|视频:|视频|，|,|\s)+/g,'').split(/[，,。；;\n]/)[0] || text).slice(0,36);
  const theme=/咖啡|cafe|coffee/i.test(text)?'cafe':/旅行|旅游|风景|vlog|travel|山川|海边|徒步/i.test(text)?'travel':/产品|商品|耳机|手表|介绍|开箱|product|headphone/i.test(text)?'product':'daily';
  return {title,theme};
}
const themeAssets={
  travel:[['沿途山川','mountain'],['湖边停留','lake'],['自然细节','nature'],['远山视角','mountain'],['水边时光','lake'],['旅程收尾','nature']],
  product:[['产品全貌','watch'],['外观展示','headphones'],['产品细节','watch'],['日常搭配','daily'],['使用氛围','headphones'],['收尾定格','watch']],
  daily:[['生活片刻','daily'],['自然光影','nature'],['静谧远景','lake'],['日常细节','daily'],['慢下来','nature'],['结束画面','lake']],
};
export function generateMockMedia(idea) {
  const {title,theme}=describeIdea(idea);
  if(theme==='cafe')return mediaSeed.map(m=>({...m,id:`generated-cafe-${m.id}`,source:'generated',brief:title}));
  let assets=themeAssets[theme];
  if(theme==='product'&&/耳机|headphone/i.test(idea))assets=assets.map(([name])=>[name,'headphones']);
  if(theme==='product'&&/手表|watch/i.test(idea))assets=assets.map(([name])=>[name,'watch']);
  return assets.map(([name,file],i)=>({id:`generated-${theme}-${i}`,name,cn:name,duration:(4+i*.4).toFixed(1),image:`/media/themes/${file}.jpg`,position:i%2?'65% center':'center',source:'generated',brief:title}));
}
export function generateMockStory(idea,style) {
  const {title,theme}=describeIdea(idea);
  const tone={Healing:'轻松、治愈',Energetic:'轻快、有活力',Cinematic:'有画面感',Minimal:'简洁、直接'}[style]||'自然';
  const scripts={
    cafe:[`今天的主题是「${title}」，一起用一杯咖啡的时间，给生活按下慢放键。`,'先看一眼店铺和周围环境，记录第一眼吸引你的地方。','用近景留住喜欢的细节，让这次探店更有生活感。','把镜头交给自己的体验，挑一个最想分享的瞬间。','如果你也喜欢这样的片刻，收藏这份灵感，下次一起出发。'],
    travel:[`这次想和你分享「${title}」，一起看看路上的风景。`,'先用一个远景交代目的地，带大家走进这段旅程。','把镜头放近一点，记录途中值得停下来的小细节。','选一段最喜欢的风景，让这次旅行的记忆多停留几秒。','把这段旅程收藏起来，期待下次继续出发。'],
    product:[`这次来聊聊「${title}」，先从第一眼的印象开始。`,'先看整体外观，再用近景展示值得注意的设计细节。','放进日常使用场景里，看看它与生活如何搭配。','挑一个最想分享的体验，用画面说明自己的感受。','你最关注它的哪一点？把想了解的地方记下来，下次继续分享。'],
    daily:[`今天想记录「${title}」，用几个画面把这个想法分享给你。`,'先交代这次记录的背景，让观众知道故事从哪里开始。','靠近一点，看看画面里容易被忽略的小细节。','挑出最想分享的瞬间，让故事在这里多停留一下。','这就是今天的记录，期待下一次继续分享。'],
  }[theme];
  const labels=['用主题吸引注意','交代背景与整体','留住关键细节','突出最想分享的体验','完成故事与互动邀请'];
  const roles=['Hook','Context','Detail','Highlight','Ending / CTA'];
  return {title,theme,note:`围绕「${title}」，按${tone}的节奏组织开场、背景、细节、重点和结尾。素材按选择顺序分配，可逐幕调整。`,seed:sceneSeed.map((s,i)=>({...s,role:roles[i],label:labels[i],script:scripts[i],alt:[`换个角度看「${title}」，从这个瞬间开始。`,`关于「${title}」，先用这一组画面交代故事背景。`,`让镜头靠近「${title}」里的细节，留下更具体的感受。`,`这一幕是「${title}」里最想与你分享的片刻。`,`把「${title}」的灵感留下来，下一次继续分享。`][i]}))};
}
