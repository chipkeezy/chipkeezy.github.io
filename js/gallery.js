/*=========================================
AUTO GALLERY
=========================================*/

const gallery = document.getElementById("gallery-grid");

function createGallery(){

gallery.innerHTML="";

artworks.forEach((art,index)=>{

gallery.innerHTML+=`

<article class="art-card">

<div class="art-image">

<img src="${art.image}" loading="lazy">

<div class="art-status">

${art.status}

</div>

</div>

<div class="art-info">

<h3>${art.title}</h3>

<p>${art.medium}</p>

<span>${art.size}</span>

<small>${art.year}</small>

<button onclick="openArtwork(${index})" class="view-artwork">

View Artwork →

</button>

</div>

</article>

`;

});

}

createGallery();

const viewer=document.getElementById("viewer");

function openArtwork(i){

const art=artworks[i];

viewer.classList.add("active");

viewerImg.src=art.image;

viewerTitle.textContent=art.title;

viewerStory.textContent=art.story;

viewerMedium.textContent=art.medium;

viewerSize.textContent=art.size;

viewerYear.textContent=art.year;

viewerPrice.textContent=art.price;

viewerStatus.textContent=art.status;

}

document.querySelector(".close-viewer").onclick=()=>{

viewer.classList.remove("active");

};

viewer.onclick=(e)=>{

if(e.target===viewer){

viewer.classList.remove("active");

}

};

createGallery();
