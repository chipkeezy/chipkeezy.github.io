// INTRO
window.addEventListener("load",()=>{

setTimeout(()=>{
document.getElementById("intro").style.display="none";
},2000);

});

// NAV SCROLL
window.addEventListener("scroll",()=>{

document.querySelector(".navbar")
.classList.toggle("scrolled",window.scrollY>80);

});

// DATA
const paintings=[
{
title:"The Last Ember II",
image:"ember.jpeg",
description:"A reflection of resilience and memory.",
status:"AVAILABLE"
},
{
title:"The Morning Light",
image:"masai.jpeg",
description:"Light and atmosphere study.",
status:"AVAILABLE"
},
{
title:"Last Shepherd of the Dawn",
image:"boy.jpeg",
description:"Hope and endurance.",
status:"AVAILABLE"
},
{
title:"The Feet That Carried a Continent",
image:"feet.jpeg",
description:"Strength and heritage.",
status:"AVAILABLE"
}
];

// BUILD GALLERY
const grid=document.getElementById("gallery-grid");

paintings.forEach(p=>{

const div=document.createElement("div");
div.className="art-card";

div.innerHTML=`
<img src="${p.image}">
`;

div.onclick=()=>{

document.getElementById("lightbox").classList.add("active");
document.getElementById("viewer-img").src=p.image;
document.getElementById("viewer-title").innerText=p.title;
document.getElementById("viewer-description").innerText=p.description;

document.getElementById("viewer-link").href=
"https://wa.me/255692973059?text=Interested in "+p.title;

};

grid.appendChild(div);

});

// LIGHTBOX CLOSE
document.querySelector(".close").onclick=()=>{
document.getElementById("lightbox").classList.remove("active");
};

// REVEAL
window.addEventListener("scroll",()=>{

document.querySelectorAll(".reveal").forEach(el=>{

const top=el.getBoundingClientRect().top;

if(top<window.innerHeight-100){
el.classList.add("active");
}

});

});
