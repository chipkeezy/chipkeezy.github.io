const navbar=document.querySelector(".navbar");

window.addEventListener("scroll",()=>{

if(window.scrollY>80){

navbar.classList.add("scrolled");

}else{

navbar.classList.remove("scrolled");

}

document.querySelectorAll(".reveal").forEach(section=>{

const top=section.getBoundingClientRect().top;

if(top<window.innerHeight-120){

section.classList.add("active");

}

});

});

const lightbox=document.getElementById("lightbox");

const viewer=document.getElementById("viewer-img");

const title=document.getElementById("viewer-title");

const description=document.getElementById("viewer-description");

const link=document.getElementById("viewer-link");

document.querySelectorAll(".art-card").forEach(card=>{

card.onclick=()=>{

viewer.src=card.dataset.image;

title.innerText=card.dataset.title;

description.innerText=card.dataset.description;

link.href="https://wa.me/255692973059?text=Hello McDonald, I am interested in "+card.dataset.title;

lightbox.classList.add("active");

};

});

document.querySelector(".close").onclick=()=>{

lightbox.classList.remove("active");

};

lightbox.onclick=(e)=>{

if(e.target===lightbox){

lightbox.classList.remove("active");

}

};
