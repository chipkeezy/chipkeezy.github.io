/*==========================================
McDonald Simon
Visual Artist
==========================================*/

const artworks = [

{
id:1,
title:"The Last Ember II",
image:"paintings/ember.jpg",
story:"The strongest people are often those who have weathered the hardest storms yet still carry warmth within them.",
medium:"Oil on Canvas",
dimensions:"60 × 80 cm",
year:"2026",
status:"available",
collectorPrice:"Price Upon Inquiry"
},

{
id:2,
title:"The Feet That Carried A Continent",
image:"paintings/feet.jpg",
story:"A tribute to endurance, sacrifice and the silent journeys that shaped generations.",
medium:"Oil on Canvas",
dimensions:"60 × 80 cm",
year:"2026",
status:"available",
collectorPrice:"Price Upon Inquiry"
},

{
id:3,
title:"Last Shepherd Of The Dawn",
image:"paintings/boy.jpg",
story:"Hope often walks quietly before the rest of the world notices the sunrise.",
medium:"Oil on Canvas",
dimensions:"60 × 80 cm",
year:"2026",
status:"reserved",
collectorPrice:"Reserved"
},

{
id:4,
title:"Old Soul",
image:"paintings/masai.jpg",
story:"A portrait exploring dignity, memory and timeless character.",
medium:"Oil on Canvas",
dimensions:"60 × 80 cm",
year:"2026",
status:"sold",
collectorPrice:"Private Collection"
}

];

/*==========================================
INTRO
==========================================*/

window.addEventListener("load",()=>{

const intro=document.getElementById("intro");

setTimeout(()=>{

intro.style.opacity="0";

setTimeout(()=>{

intro.style.display="none";

},900);

},2300);

});

/*==========================================
NAVBAR
==========================================*/

const navbar=document.querySelector(".navbar");

window.addEventListener("scroll",()=>{

if(window.scrollY>80){

navbar.classList.add("scrolled");

}else{

navbar.classList.remove("scrolled");

}

});

/*==========================================
MOBILE MENU
==========================================*/

const menuBtn=document.querySelector(".menu-btn");

const mobileMenu=document.querySelector(".mobile-menu");

if(menuBtn){

menuBtn.onclick=()=>{

mobileMenu.classList.toggle("active");

};

}

document.querySelectorAll(".mobile-menu a").forEach(link=>{

link.onclick=()=>{

mobileMenu.classList.remove("active");

};

});

/*==========================================
BUILD GALLERY
==========================================*/

const gallery=document.getElementById("gallery-grid");

if(gallery){

artworks.forEach(art=>{

gallery.innerHTML+=`

<div class="art-card" data-id="${art.id}">

<div class="art-image">

<img src="${art.image}" alt="${art.title}" loading="lazy">

</div>

<div class="art-content">

<div class="status ${art.status}">

${art.status.toUpperCase()}

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

<span>Size</span>

<strong>${art.dimensions}</strong>

</div>

<div class="meta">

<span>Year</span>

<strong>${art.year}</strong>

</div>

<div class="meta">

<span>Collector</span>

<strong>${art.collectorPrice}</strong>

</div>

</div>

<div class="view-link">

<span>View Artwork</span>

<span>→</span>

</div>

</div>

</div>

`;

});

}

/*==========================================
VIEWER
==========================================*/

const viewer=document.getElementById("museum-viewer");

document.addEventListener("click",(e)=>{

const card=e.target.closest(".art-card");

if(!card) return;

const id=Number(card.dataset.id);

const art=artworks.find(a=>a.id===id);

document.getElementById("viewer-img").src=art.image;

document.getElementById("viewer-title").innerText=art.title;

document.getElementById("viewer-description").innerText=art.story;

document.getElementById("viewer-medium").innerText=art.medium;

document.getElementById("viewer-dimensions").innerText=art.dimensions;

document.getElementById("viewer-year").innerText=art.year;

document.getElementById("viewer-price").innerText=art.collectorPrice;

const badge=document.getElementById("viewer-status");

badge.className="status "+art.status;

badge.innerText=art.status.toUpperCase();

document.getElementById("viewer-whatsapp").href=

`https://wa.me/255692973059?text=Hello McDonald, I am interested in "${art.title}".`;

viewer.classList.add("active");

});

/*==========================================
CLOSE VIEWER
==========================================*/

document.querySelector(".viewer-close").onclick=()=>{

viewer.classList.remove("active");

};

viewer.onclick=(e)=>{

if(e.target===viewer){

viewer.classList.remove("active");

}

};

/*==========================================
SCROLL REVEAL
==========================================*/

const reveal=document.querySelectorAll(".reveal");

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.animate([

{

opacity:0,

transform:"translateY(60px)"

},

{

opacity:1,

transform:"translateY(0)"

}

],{

duration:900,

fill:"forwards",

easing:"ease"

});

observer.unobserve(entry.target);

}

});

});

reveal.forEach(section=>{

observer.observe(section);

});
