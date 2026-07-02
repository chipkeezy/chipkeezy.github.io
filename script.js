// =========================
// NAVBAR
// =========================

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

if(window.scrollY>80){

navbar.classList.add("scrolled");

}else{

navbar.classList.remove("scrolled");

}

});

// =========================
// PAINTINGS
// =========================

const paintings=[

{

title:"The Last Ember II",

image:"ember.jpeg",

status:"AVAILABLE",

medium:"Oil on Canvas",

size:"60 × 80 cm",

description:"A portrait exploring endurance, wisdom and memory."

},

{

title:"The Morning Light",

image:"masai.jpeg",

status:"AVAILABLE",

medium:"Oil on Canvas",

size:"60 × 80 cm",

description:"An atmospheric study of light and colour."

},

{

title:"Last Shepherd of the Dawn",

image:"boy.jpeg",

status:"AVAILABLE",

medium:"Oil on Canvas",

size:"60 × 80 cm",

description:"Inspired by hope and resilience."

},

{

title:"The Feet That Carried a Continent",

image:"feet.jpeg",

status:"AVAILABLE",

medium:"Oil on Canvas",

size:"60 × 80 cm",

description:"A symbolic celebration of heritage."

},

{

title:"The Last Ember I",

image:"The Last Ember 1.jpeg",

status:"SOLD",

medium:"Oil on Canvas",

size:"60 × 80 cm",

description:"The first painting in the Last Ember series."

}

];

// =========================
// BUILD GALLERY
// =========================

const gallery=document.getElementById("gallery-grid");

paintings.forEach(p=>{

gallery.innerHTML+=`

<div class="art-card">

<img src="${p.image}" alt="${p.title}">

<div class="art-info">

<h3>${p.title}</h3>

<span class="status ${p.status.toLowerCase()}">

${p.status}

</span>

</div>

</div>

`;

});
