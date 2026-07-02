// ==========================================
// 1. NAVBAR SCROLL EFFECT
// ==========================================
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// ==========================================
// 2. PAINTINGS DATA ARRAY
// ==========================================
const paintings = [
    {
        title: "The Last Ember II",
        image: "ember.jpeg",
        status: "AVAILABLE",
        medium: "Oil on Canvas",
        size: "60 × 80 cm",
        description: "A portrait exploring endurance, wisdom and memory."
    },
    {
        title: "The Morning Light",
        image: "masai.jpeg",
        status: "AVAILABLE",
        medium: "Oil on Canvas",
        size: "60 × 80 cm",
        description: "An atmospheric study of light and colour."
    },
    {
        title: "Last Shepherd of the Dawn",
        image: "boy.jpeg",
        status: "AVAILABLE",
        medium: "Oil on Canvas",
        size: "60 × 80 cm",
        description: "Inspired by hope and resilience."
    },
    {
        title: "The Feet That Carried a Continent",
        image: "feet.jpeg",
        status: "AVAILABLE",
        medium: "Oil on Canvas",
        size: "60 × 80 cm",
        description: "A symbolic celebration of heritage."
    },
    {
        title: "The Last Ember I",
        image: "The Last Ember 1.jpeg", // <-- Make sure this filename perfectly matches your uploaded file extension
        status: "SOLD",
        medium: "Oil on Canvas",
        size: "60 × 80 cm",
        description: "The first painting in the Last Ember series."
    }
];

// ==========================================
// 3. GENERATE GALLERY GRID DYNAMICALLY
// ==========================================
const gallery = document.getElementById("gallery-grid");

paintings.forEach((p, index) => {
    gallery.innerHTML += `
        <div class="art-card" data-index="${index}">
            <img src="${p.image}" alt="${p.title}" loading="lazy">
            <div class="art-info">
                <h3>${p.title}</h3>
                <span class="status ${p.status.toLowerCase()}">${p.status}</span>
            </div>
        </div>
    `;
});

// ==========================================
// 4. MUSEUM VIEWER (LIGHTBOX INTERACTIVITY)
// ==========================================
const lightbox = document.getElementById("lightbox");
const viewerImg = document.getElementById("viewer-img");
const viewerTitle = document.getElementById("viewer-title");
const viewerDescription = document.getElementById("viewer-description");
const viewerLink = document.getElementById("viewer-link");
const closeBtn = document.querySelector(".close");

// Open Lightbox when clicking an art card
document.querySelectorAll(".art-card").forEach(card => {
    card.addEventListener("click", () => {
        const index = card.getAttribute("data-index");
        const data = paintings[index];

        viewerImg.src = data.image;
        viewerTitle.innerText = data.title;
        
        // Build crisp typography detail layout inside viewer
        viewerDescription.innerHTML = `
            <p style="margin-bottom: 10px;"><strong>Medium:</strong> ${data.medium}</p>
            <p style="margin-bottom: 10px;"><strong>Dimensions:</strong> ${data.size}</p>
            <p style="margin-top: 20px; font-style: italic; color: #a09990;">"${data.description}"</p>
        `;

        // Handle structural WhatsApp business generation based on sale status
        if (data.status === "SOLD") {
            viewerLink.style.display = "none";
        } else {
            viewerLink.style.display = "inline-block";
            const message = encodeURIComponent(`Hello McDonald, I am interested in acquiring your original painting: "${data.title}".`);
            viewerLink.href = `https://wa.me/255692973059?text=${message}`;
            viewerLink.innerText = "Acquire Artwork";
        }

        lightbox.classList.add("active");
    });
});

// Close Lightbox mechanics
closeBtn.addEventListener("click", () => lightbox.classList.remove("active"));
lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) lightbox.classList.remove("active");
});

// ==========================================
// 5. SCROLL REVEAL MECHANIC (THE FIX)
// ==========================================
const revealElements = document.querySelectorAll(".reveal");

const checkReveal = () => {
    const triggerBottom = window.innerHeight * 0.85;
    revealElements.forEach(el => {
        const boxTop = el.getBoundingClientRect().top;
        if (boxTop < triggerBottom) {
            el.classList.add("active");
        }
    });
};

window.addEventListener("scroll", checkReveal);
// Run instantly on load to reveal elements already sitting on screen above the fold
checkReveal();
