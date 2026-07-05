/*==================================================
McDonald Simon Portfolio V3
Gallery Engine
==================================================*/

gsap.registerPlugin(ScrollTrigger);

/*=========================================
ARTWORK DATABASE
Only edit this section in the future
=========================================*/

const artworks=[

{
id:1,
featured:true,
title:"The Last Ember II",
image:"images/ember.jpg",
story:"The strongest people are often those who have weathered the hardest storms yet continue to carry warmth for others.",
medium:"Oil on Canvas",
dimensions:"60 × 80 cm",
year:"2026",
price:"TZS 2,800,000",
status:"available"
},

{
id:2,
featured:false,
title:"The Feet That Carried A Continent",
image:"images/feet.jpg",
story:"A tribute to endurance, sacrifice and the silent journeys that shaped generations.",
medium:"Oil on Canvas",
dimensions:"60 × 80 cm",
year:"2026",
price:"TZS 2,300,000",
status:"available"
},

{
id:3,
featured:false,
title:"Last Shepherd Of The Dawn",
image:"images/boy.jpg",
story:"Hope often walks quietly before the rest of the world notices the sunrise.",
medium:"Oil on Canvas",
dimensions:"60 × 80 cm",
year:"2026",
price:"Reserved",
status:"reserved"
},

{
id:4,
featured:false,
title:"Old Soul",
image:"images/masai.jpg",
story:"A portrait exploring dignity, memory and timeless character.",
medium:"Oil on Canvas",
dimensions:"60 × 80 cm",
year:"2026",
price:"Private Collection",
status:"sold"
}

];

/*=========================================
INTRO
=========================================*/

window.addEventListener("load",()=>{

const intro=document.querySelector("#intro");

const tl=gsap.timeline();

tl.from(".intro-logo",{

opacity:0,
scale:.6,
duration:1.3,
ease:"power4.out"

})

.from(".intro-light",{

x:-900,
duration:1.8,
ease:"power2.out"

},"<")

.to("#intro",{

opacity:0,
duration:.8,
delay:.9,

onComplete(){

intro.remove();

}

});

});

/*=========================================
NAVBAR
=========================================*/

const navbar=document.querySelector(".navbar");

window.addEventListener("scroll",()=>{

navbar.classList.toggle(

"scrolled",

window.scrollY>50

);

});

/*=========================================
SCROLL REVEALS
=========================================*/

gsap.utils.toArray("section").forEach(section=>{

gsap.from(section,{

opacity:0,

y:80,

duration:1,

scrollTrigger:{

trigger:section,

start:"top 85%"

}

});

});
