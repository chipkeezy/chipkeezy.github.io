/*==================================================
McDonald Simon Portfolio V3
Gallery Engine
==================================================*/

gsap.registerPlugin(ScrollTrigger);

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
AUTOMATIC FEATURED ARTWORK
==================================================*/

const featured = artworks.find(a => a.featured);

if(featured){
  
document.querySelector("#featured h2").textContent = featured.title;

document.querySelector(".featured-image img").src = featured.image;

document.querySelector(".featured-image img").alt = featured.title;

document.querySelector(".featured-story").textContent = featured.story;

const labels = document.querySelectorAll(".museum-label .label strong");

labels[0].textContent = featured.status.toUpperCase();
labels[1].textContent = featured.medium;
labels[2].textContent = featured.dimensions;
labels[3].textContent = featured.price;

}

/*==================================================
HERO PARALLAX
==================================================*/

const hero=document.querySelector(".hero");

if(window.innerWidth>900){

window.addEventListener("mousemove",(e)=>{

const x=(e.clientX/window.innerWidth-.5)*12;

const y=(e.clientY/window.innerHeight-.5)*12;

hero.style.backgroundPosition=`calc(50% + ${x}px) calc(50% + ${y}px)`;

});

}

/*=========================================
MOBILE MENU
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

    const menuBtn = document.querySelector(".menu-btn");
    const mobileMenu = document.querySelector(".mobile-menu");

    if (!menuBtn || !mobileMenu) return;

    menuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("active");
        menuBtn.classList.toggle("active");
    });

    document.querySelectorAll(".mobile-menu a").forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("active");
            menuBtn.classList.remove("active");
        });
    });

});
