/*=========================================
MUSEUM GALLERY
=========================================*/

const gallery = document.getElementById("gallery-grid");

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
