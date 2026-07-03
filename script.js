window.addEventListener("load",()=>{

setTimeout(()=>{
document.getElementById("intro").style.display="none";
},2500);

});

window.addEventListener("scroll",()=>{

document.querySelector(".navbar")
.classList.toggle("scrolled",window.scrollY>80);

document.querySelectorAll(".reveal").forEach(el=>{

if(el.getBoundingClientRect().top < window.innerHeight-100){
el.classList.add("active");
}

});

});

const paintings=[
{
title:"The Last Ember II",
image:"ember.jpeg",
desc:"Oil on Canvas • 60 × 80 cm • Available"
},
{
title:"The Morning Light",
image:"masai.jpeg",
desc:"Oil on Canvas • 60 × 80 cm • Available"
},
{
title:"Last Shepherd",
image:"boy.jpeg",
desc:"Oil on Canvas • 60 × 80 cm • Available"
},
{
title:"Feet of Heritage",
image:"feet.jpeg",
desc:"Oil on Canvas • 60 × 80 cm • Available"
}
];

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
document.getElementById("viewer-description").innerText=p.desc;

document.getElementById("viewer-link").href=
"https://wa.me/255692973059?text=Interested in "+p.title;

};

grid.appendChild(div);

});

document.querySelector(".close").onclick=()=>{
document.getElementById("lightbox").classList.remove("active");
};
