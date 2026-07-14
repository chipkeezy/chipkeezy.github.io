/*=========================================
MUSEUM GALLERY
=========================================*/

const gallery = document.getElementById("gallery-grid");
const viewer = document.getElementById("viewer");

function createGallery() {

    if (!gallery) return;

    gallery.innerHTML = "";

    artworks.forEach((art, index) => {

        gallery.innerHTML += `

        <article class="art-card">

            <div class="art-image">

                <img src="${art.image}" alt="${art.title}" loading="lazy">

                <span class="art-badge">${art.status}</span>

            </div>

           <div class="art-content">

                <h3>${art.title}</h3>

                <p>${art.medium}</p>

                <div class="art-details">

                   <div>
    <small>Dimensions</small>
    <strong>{art.dimensions}</strong>
</div>

<div>
    <small>Year</small>
    <strong>{art.year}</strong>
</div>

                <button class="view-artwork" onclick="openArtwork(${index})">

                    View Artwork →

                </button>

            </div>

        </article>

        `;

    });

}


/*=========================================
OPEN ARTWORK
=========================================*/

function openArtwork(index){

    const art = artworks[index];

    viewer.classList.add("active");

    document.body.style.overflow = "hidden";

    document.getElementById("viewerImg").src = art.image;
    document.getElementById("viewerTitle").textContent = art.title;
    document.getElementById("viewerStory").textContent = art.story;
    document.getElementById("viewerMedium").textContent = art.medium;
    document.getElementById("viewerdimensions").textContent = art.dimensions;
    document.getElementById("viewerYear").textContent = art.year;
    document.getElementById("viewerValue").textContent = art.price;
    document.getElementById("viewerStatus").textContent = art.status;

    const whatsappBtn = document.getElementById("viewerWhatsapp");

    if(art.status.toLowerCase() === "available"){

        whatsappBtn.textContent = "Acquire This Original";

        whatsappBtn.href =
        "https://wa.me/255692973059?text=" +
        encodeURIComponent(

`Hello McDonald Simon,

I am interested in acquiring your original artwork "${art.title}".

Could you please let me know if it is still available?`

        );

    }

    else if(art.status.toLowerCase() === "sold"){

        whatsappBtn.textContent = "Request a Similar Commission";

        whatsappBtn.href =
        "https://wa.me/255692973059?text=" +
        encodeURIComponent(

`Hello McDonald Simon,

I love your artwork "${art.title}".

Although I understand it has been sold, I would like to commission a similar masterpiece inspired by it.

Could we discuss the details?`

        );

    }

    else{

        whatsappBtn.textContent = "Enquire About This Artwork";

        whatsappBtn.href =
        "https://wa.me/255692973059?text=" +
        encodeURIComponent(

`Hello McDonald Simon,

I would like to enquire about your artwork "${art.title}".`

        );

    }

}


/*=========================================
CLOSE VIEWER
=========================================*/

function closeArtwork(){

    viewer.classList.remove("active");

    document.body.style.overflow = "auto";

}


const closeButton = document.querySelector(".close-viewer");

if(closeButton){

    closeButton.addEventListener("click", closeArtwork);

}


viewer.addEventListener("click", function(e){

    if(e.target === viewer){

        closeArtwork();

    }

});


document.addEventListener("keydown", function(e){

    if(e.key === "Escape"){

        closeArtwork();

    }

});
