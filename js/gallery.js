/*=========================================
AUTO GALLERY
=========================================*/

const viewer = document.getElementById("viewer");
const closeBtn = document.querySelector(".close-viewer");

function openArtwork(index){

const art = artworks[index];

viewer.classList.add("active");

document.getElementById("viewerImg").src = art.image;
document.getElementById("viewerTitle").textContent = art.title;
document.getElementById("viewerStory").textContent = art.story;
document.getElementById("viewerMedium").textContent = art.medium;
document.getElementById("viewerSize").textContent = art.size;
document.getElementById("viewerYear").textContent = art.year;
document.getElementById("viewerPrice").textContent = art.price;
document.getElementById("viewerStatus").textContent = art.status;

document.body.style.overflow="hidden";

}

function closeArtwork(){

viewer.classList.remove("active");

document.body.style.overflow="auto";

}

closeBtn.addEventListener("click",closeArtwork);

viewer.addEventListener("click",(e)=>{

if(e.target===viewer){

closeArtwork();

}

});

document.addEventListener("keydown",(e)=>{

if(e.key==="Escape"){

closeArtwork();

}

});

createGallery();
