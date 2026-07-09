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

    const btn = document.getElementById("viewerWhatsapp");

    if(art.status.toLowerCase() === "available"){

        btn.textContent = "Acquire This Original";

        btn.href =
        "https://wa.me/255692973059?text=" +
        encodeURIComponent(
        `Hello McDonald Simon,

I am interested in acquiring your original artwork "${art.title}".

Could you please let me know if it is still available?`
        );

    }

    else if(art.status.toLowerCase() === "sold"){

        btn.textContent = "Request a Similar Commission";

        btn.href =
        "https://wa.me/255692973059?text=" +
        encodeURIComponent(
        `Hello McDonald Simon,

I love your artwork "${art.title}".

Although I understand it has been sold, I would like to commission a similar painting.

Could we discuss the details?`
        );

    }

    else{

        btn.textContent = "Enquire About This Artwork";

        btn.href =
        "https://wa.me/255692973059?text=" +
        encodeURIComponent(
        `Hello McDonald Simon,

I would like to enquire about "${art.title}".`
        );

    }

}
