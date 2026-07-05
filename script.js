/* ==========================================
   McDonald Simon | Version 3
   Gallery Engine
========================================== */

gsap.registerPlugin(ScrollTrigger);

/* =========================
   WEBSITE SETTINGS
========================= */

const whatsapp =
"255692973059";

const instagram =
"https://instagram.com/mc_ndokeji";

const email =
"mcchipkeezy@gmail.com";

/* =========================
   ARTWORK DATABASE
   (ONLY EDIT THIS SECTION)
========================= */

const artworks = [

{
id:1,

title:"The Last Ember II",

image:"images/ember.jpeg",

medium:"Oil on Canvas",

dimensions:"60 × 80 cm",

year:"2026",

price:"TZS 2,800,000",

status:"available",

story:"The strongest people are often those who have weathered the hardest storms yet still carry warmth within them."
},

{
id:2,

title:"The Feet That Carried A Continent",

image:"images/feet.jpeg",

medium:"Oil on Canvas",

dimensions:"60 × 80 cm",

year:"2026",

price:"TZS 2,300,000",

status:"available",

story:"A tribute to endurance, sacrifice and the silent journeys that shaped generations."
},

{
id:3,

title:"Last Shepherd Of The Dawn",

image:"images/boy.jpeg",

medium:"Oil on Canvas",

dimensions:"60 × 80 cm",

year:"2026",

price:"Reserved",

status:"reserved",

story:"Hope often walks quietly before the rest of the world notices the sunrise."
},

{
id:4,

title:"Old Soul",

image:"images/masai.jpeg",

medium:"Oil on Canvas",

dimensions:"60 × 80 cm",

year:"2026",

price:"Private Collection",

status:"sold",

story:"A portrait exploring dignity, memory and timeless character."
}

];

/* =========================
   INTRO
========================= */

window.addEventListener("load",()=>{

const tl=gsap.timeline();

tl.from(".intro-logo",{

opacity:0,

scale:.55,

duration:1.5,

ease:"power4.out"

})

.to("#intro::before",{
duration:0
})

.to("#intro",{

delay:1.2,

opacity:0,

duration:.9,

onComplete(){

document.getElementById("intro").remove();

}

});

});

/* =========================
   NAVBAR
========================= */

const navbar=document.querySelector(".navbar");

window.addEventListener("scroll",()=>{

if(window.scrollY>60){

navbar.classList.add("scrolled");

}else{

navbar.classList.remove("scrolled");

}

});

/* =========================
   BUILD GALLERY
========================= */

const gallery=document.getElementById("gallery-grid");

if(gallery){

artworks.forEach(art=>{

gallery.innerHTML+=`

<div class="art-card" data-id="${art.id}">

<div class="art-image">

<img src="${art.image}" alt="${art.title}">

</div>

<div class="art-content">

<div class="card-head">

<div class="badge ${art.status}">

${art.status.toUpperCase()}

</div>

<div class="card-year">

${art.year}

</div>

</div>

<h3>${art.title}</h3>

<p class="art-story">

${art.story}

</p>

<div class="art-meta">

<div class="meta">

<span>Medium</span>

<strong>${art.medium}</strong>

</div>

<div class="meta">

<span>Dimensions</span>

<strong>${art.dimensions}</strong>

</div>

<div class="meta">

<span>Collection Value</span>

<strong>${art.price}</strong>

</div>

<div class="meta">

<span>Status</span>

<strong>${art.status}</strong>

</div>

</div>

<button class="view-art">

View Artwork

</button>

</div>

</div>

`;

});

}

/* =========================
   SCROLL REVEAL
========================= */

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
