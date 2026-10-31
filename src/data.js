export const initialIdea = '帮我做一条杭州周末咖啡店探店视频，轻松、治愈、有生活感，大约30秒，适合发布到小红书和抖音。';
export const mediaSeed = [
  {id:1,name:'Storefront',cn:'街角的咖啡店',duration:'4.2',image:'/media/storefront.jpg',position:'center'},
  {id:2,name:'Entrance',cn:'推门，进入周末',duration:'3.8',image:'/media/cafe.jpg',position:'20% center'},
  {id:3,name:'Interior',cn:'温暖的木质空间',duration:'5.6',image:'/media/interior.jpg'},
  {id:4,name:'Coffee Making',cn:'一杯咖啡的诞生',duration:'7.1',image:'/media/making.jpg'},
  {id:5,name:'Coffee & Dessert',cn:'给生活加一点甜',duration:'6.4',image:'/media/coffee.jpg'},
  {id:6,name:'Window Seat',cn:'窗边的慢时光',duration:'6.2',image:'/media/cafe.jpg',position:'80% center'},
];
export const sceneSeed = [
 {id:1,role:'Hook',label:'一个让人停下来的开场',range:[0,4],media:[1],script:'周末不知道去哪？杭州这家藏在街角的咖啡店，真的太适合放空了。',alt:'把周末交给一杯咖啡吧。杭州街角的这家小店，藏着刚刚好的松弛感。'},
 {id:2,role:'Environment',label:'走进故事里的空间',range:[4,9],media:[2,3],script:'推开门就是暖暖的木质空间，整个节奏一下子慢了下来。',alt:'木质桌椅、柔和的光，推开门的那一刻，忙碌就被留在了门外。'},
 {id:3,role:'Detail',label:'捕捉治愈的小细节',range:[9,16],media:[4],script:'最治愈的还是看咖啡慢慢做好，光是这个过程就很舒服。',alt:'看热水缓缓落下，咖啡香一点点散开，原来快乐可以这么简单。'},
 {id:4,role:'Highlight',label:'留一段时间给自己',range:[16,24],media:[5,6],script:'点一杯咖啡，再配一个小甜点，坐在窗边什么都不用想。',alt:'一口咖啡，一口甜点，窗外是杭州的日常，窗内是属于自己的周末。'},
 {id:5,role:'Ending / CTA',label:'为下一次周末埋下期待',range:[24,30],media:[6],script:'如果你周末也想找个地方放空，这家可以先收藏起来。',alt:'下个周末，给自己安排这样一个下午吧。收藏起来，我们下次见。'}
];
