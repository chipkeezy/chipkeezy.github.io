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
image:"images/ember.jpeg",
story:"The strongest people are often those who have weathered the hardest storms yet continue to carry warmth for others.",
medium:"Oil on Canvas",
dimensions:"60 × 80 cm",
year:"2026",
price:"$ 320",
status:"available"
},

{
id:2,
featured:false,
title:"The Feet That Carried A Continent",
image:"images/feet.jpeg",
story:"A tribute to endurance, sacrifice and the silent journeys that shaped generations.",
medium:"Oil on Canvas",
dimensions:"60 × 80 cm",
year:"2026",
price:"$ 300",
status:"available"
},

{
id:3,
featured:false,
title:"Last Shepherd Of The Dawn",
image:"images/boy.jpeg",
story:"Hope often walks quietly before the rest of the world notices the sunrise.",
medium:"Oil on Canvas",
dimensions:"60 × 80 cm",
year:"2026",
price:"$ 300",
status:"available"
},

{
id:4,
featured:false,
title:"Old Soul",
image:"images/masai.jpeg",
story:"A portrait exploring dignity, memory and timeless character.",
medium:"Oil on Canvas",
dimensions:"60 × 80 cm",
year:"2026",
price:"$ 300",
status:"available"
}

];

/*=========================================
CINEMATIC INTRO V2
=========================================*/

window.addEventListener("load",()=>{

const tl=gsap.timeline();

gsap.set("#brushReveal",{

scale:.9,

opacity:0

});

gsap.set("#logoReveal",{

opacity:0,

scale:.8

});

tl.to("#brushReveal",{

opacity:1,

duration:.6

})

.fromTo(

"#brushReveal",

{

drawSVG:"0%"

},

{

drawSVG:"100%",

duration:2,

ease:"power2.inOut"

}

)

.to(".intro-light",{

opacity:1,

duration:1

},"-=1.2")

.to("#logoReveal",{

opacity:1,

scale:1,

duration:.9,

ease:"back.out(1.8)"

},"-=1")

.to("#logoReveal",{

scale:1.05,

repeat:1,

yoyo:true,

duration:.8

})

.to("#intro",{

opacity:0,

duration:1,

delay:.5,

onComplete(){

document.getElementById("intro").remove();

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
/*==================================================
AUTOMATIC GALLERY
==================================================*/

const gallery=document.getElementById("gallery-grid");

if(gallery){

gallery.innerHTML="";

artworks.forEach((art,index)=>{

gallery.innerHTML+=`

<div class="art-card" data-index="${index}">

<div class="art-image">

<img src="${art.image}" alt="${art.title}" loading="lazy">

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

<strong>${art.status.toUpperCase()}</strong>

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

/*==================================================
AUTOMATIC FEATURED ARTWORK
==================================================*/

const featured=artworks.find(a=>a.featured);

if(featured){

document.querySelector("#featured h2").textContent=featured.title;

document.querySelector(".featured-image img").src=featured.image;

document.querySelector(".featured-image img").alt=featured.title;

document.querySelector(".featured-story").textContent=featured.story;

const labels=document.querySelectorAll(".museum-label .label strong");

labels[0].textContent=featured.status.toUpperCase();
labels[1].textContent=featured.medium;
labels[2].textContent=featured.dimensions;
labels[3].textContent=featured.price;

}

/*==================================================
MUSEUM VIEWER
==================================================*/

const viewer=document.getElementById("viewer");

const viewerImg=document.getElementById("viewerImg");

const viewerTitle=document.getElementById("viewerTitle");

const viewerStory=document.getElementById("viewerStory");

const viewerMedium=document.getElementById("viewerMedium");

const viewerDimensions=document.getElementById("viewerDimensions");

const viewerYear=document.getElementById("viewerYear");

const viewerPrice=document.getElementById("viewerPrice");

const viewerStatus=document.getElementById("viewerStatus");

const viewerWhatsapp=document.getElementById("viewerWhatsapp");

document.addEventListener("click",(e)=>{

const card=e.target.closest(".art-card");

if(!card) return;

const art=artworks[card.dataset.index];

viewer.classList.add("active");

document.body.style.overflow="hidden";

viewerImg.src=art.image;

viewerTitle.textContent=art.title;

viewerStory.textContent=art.story;

viewerMedium.textContent=art.medium;

viewerDimensions.textContent=art.dimensions;

viewerYear.textContent=art.year;

viewerPrice.textContent=art.price;

viewerStatus.className="badge "+art.status;

viewerStatus.textContent=art.status.toUpperCase();

viewerWhatsapp.href=

`https://wa.me/255692973059?text=Hello McDonald, I am interested in "${art.title}".`;

gsap.from(".viewer-window",{

scale:.92,

opacity:0,

duration:.45,

ease:"power3.out"

});

});

/*==================================================
CLOSE VIEWER
==================================================*/

document.getElementById("closeViewer").onclick=()=>{

viewer.classList.remove("active");

document.body.style.overflow="";

};

viewer.addEventListener("click",(e)=>{

if(e.target===viewer){

viewer.classList.remove("active");

document.body.style.overflow="";

}

});

document.addEventListener("keydown",(e)=>{

if(e.key==="Escape"){

viewer.classList.remove("active");

document.body.style.overflow="";

}

});

/*==================================================
HERO PARALLAX
==================================================*/

const hero=document.querySelector(".hero");

window.addEventListener("mousemove",(e)=>{

const x=(e.clientX/window.innerWidth-.5)*12;

const y=(e.clientY/window.innerHeight-.5)*12;

hero.style.backgroundPosition=`calc(50% + ${x}px) calc(50% + ${y}px)`;

});
