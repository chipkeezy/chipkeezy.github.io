/*=========================================
MUSEUM GALLERY
=========================================*/

const gallery = document.getElementById("gallery-grid");

const viewer = document.getElementById("viewer");

function createGallery(){

    if(!gallery) return;

    gallery.innerHTML="";

    artworks.forEach((art,index)=>{

        gallery.innerHTML += `

        <article class="art-card">

            <div class="art-image">

                <img src="${art.image}" alt="${art.title}" loading="lazy">

                <span class="art-badge">${art.status}</span>

            </div>

            <div class="art-info">

                <h3>${art.title}</h3>

                <p>${art.medium}</p>

                <div class="art-meta">

                    <span>${art.size}</span>

                    <span>${art.year}</span>

                </div>

                <button class="view-artwork" onclick="openArtwork(${index})">

                    View Artwork →

                </button>

            </div>

        </article>

        `;

    });

}

createGallery();

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

}

document.querySelector(".close-viewer").addEventListener("click",()=>{

viewer.classList.remove("active");

});

viewer.addEventListener("click",(e)=>{

if(e.target===viewer){

viewer.classList.remove("active");

}

});
