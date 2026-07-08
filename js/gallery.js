/*=========================================
AUTO GALLERY
=========================================*/

const gallery = document.getElementById("gallery-grid");

function createGallery() {

    if (!gallery) return;

    gallery.innerHTML = "";

    artworks.forEach((art) => {

        gallery.innerHTML += `

        <article class="art-card">

            <div class="art-image">

                <img src="${art.image}" alt="${art.title}" loading="lazy">

                <div class="art-status ${art.status.toLowerCase()}">

                    ${art.status}

                </div>

            </div>

            <div class="art-info">

                <h3>${art.title}</h3>

                <p>${art.medium}</p>

                <span>${art.size}</span>

                <small>${art.year}</small>

                <button class="view-artwork">

                    View Artwork →

                </button>

            </div>

        </article>

        `;

    });

}

createGallery();
