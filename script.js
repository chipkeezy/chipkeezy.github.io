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
// 3. BUILD 3D Z-AXIS TUNNEL
// ==========================================
gsap.registerPlugin(ScrollTrigger);

const tunnelWorld = document.getElementById("tunnel-world");
const zSpacing = 1600; // Distance between each painting in the void

paintings.forEach((p, index) => {
    tunnelWorld.innerHTML += `
        <div class="art-panel" data-index="${index}">
            <img src="${p.image}" alt="${p.title}" class="tilt-img">
            <div class="art-panel-info">
                <h3>${p.title}</h3>
                <p>${p.status}</p>
            </div>
        </div>
    `;
});

const panels = document.querySelectorAll('.art-panel');
const totalDepth = (panels.length - 1) * zSpacing;

panels.forEach((panel, i) => {
    // 1. Push every painting deep into the Z-axis mathematically
    gsap.set(panel, {
        z: -i * zSpacing,
        opacity: i === 0 ? 1 : 0
    });

    // 2. The Crazy Motion: Mouse Tilt Distortion
    const img = panel.querySelector('.tilt-img');
    panel.addEventListener('mousemove', (e) => {
        const rect = panel.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(img, {
            rotationY: x / 20, 
            rotationX: -y / 20, 
            duration: 0.4,
            ease: "power2.out"
        });
    });
    
    panel.addEventListener('mouseleave', () => {
        gsap.to(img, { rotationY: 0, rotationX: 0, duration: 0.7, ease: "power2.out" });
    });
});

// 3. Fly the camera forward tied to the scrollbar
gsap.to(".tunnel-world", {
    z: totalDepth,
    ease: "none",
    scrollTrigger: {
        trigger: ".tunnel-container",
        pin: true, // Lock screen in place during flight
        start: "top top",
        end: "+=" + (panels.length * 1200), // Flight speed/duration
        scrub: 1, // Smoothly link to scrollwheel
        onUpdate: (self) => {
            const currentZ = self.progress * totalDepth;
            
            panels.forEach((panel, i) => {
                const panelZ = i * zSpacing;
                const distance = Math.abs(currentZ - panelZ);
                const info = panel.querySelector('.art-panel-info');
                
                // Cinematic Fade & Typography slide-in when close
                if (distance < 600) {
                    gsap.to(panel, { opacity: 1, duration: 0.4 });
                    gsap.to(info, { opacity: 1, x: 30, duration: 0.4 });
                } else {
                    gsap.to(panel, { opacity: distance < 1800 ? 0.15 : 0, duration: 0.4 });
                    gsap.to(info, { opacity: 0, x: 0, duration: 0.4 });
                }
            });
        }
    }
});

// ==========================================
// 4. MUSEUM VIEWER (UPDATED FOR 3D PANELS)
// ==========================================
const lightbox = document.getElementById("lightbox");
const viewerImg = document.getElementById("viewer-img");
const viewerTitle = document.getElementById("viewer-title");
const viewerDescription = document.getElementById("viewer-description");
const viewerLink = document.getElementById("viewer-link");
const closeBtn = document.querySelector(".close");

document.querySelectorAll(".art-panel").forEach(card => {
    card.addEventListener("click", () => {
        const index = card.getAttribute("data-index");
        const data = paintings[index];

        viewerImg.src = data.image;
        viewerTitle.innerText = data.title;
        viewerDescription.innerHTML = `
            <p style="margin-bottom: 10px;"><strong>Medium:</strong> ${data.medium}</p>
            <p style="margin-bottom: 10px;"><strong>Dimensions:</strong> ${data.size}</p>
            <p style="margin-top: 20px; font-style: italic; color: #a09990;">"${data.description}"</p>
        `;

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
