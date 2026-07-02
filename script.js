document.addEventListener("DOMContentLoaded", function() {
    // CINEMATIC INTRO
const intro = document.getElementById("intro-screen");
const tl = gsap.timeline();

tl.to(".intro-logo", { opacity: 1, duration: 1.5, ease: "power2.inOut" })
  .to(".intro-logo", { scale: 1.1, duration: 2, ease: "power2.inOut" })
  .to(intro, { opacity: 0, duration: 1, onComplete: () => intro.style.display = "none" });
    // 1. Register the GSAP tools
    gsap.registerPlugin(ScrollTrigger);

    // 2. Your Art List
    const paintings = [
        { title: "The Last Ember", image: "The Last Ember 1.jpeg", status: "AVAILABLE", medium: "Oil on Canvas", size: "24x36", description: "A study in light and warmth." },
        { title: "Boy", image: "boy.jpeg", status: "SOLD", medium: "Oil on Canvas", size: "18x24", description: "Portrait of a young spirit." },
        { title: "Ember", image: "ember.jpeg", status: "AVAILABLE", medium: "Oil on Canvas", size: "20x20", description: "Abstract fire series." },
        { title: "Feet", image: "feet.jpeg", status: "AVAILABLE", medium: "Oil on Canvas", size: "12x12", description: "Movement study." }
        // Add more items here if needed, just like the ones above
    ];

    const tunnelWorld = document.getElementById("tunnel-world");
    
    // Check if we are on the page with the tunnel
    if (tunnelWorld) {
        // Build the paintings
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

        // Setup the animation
        const panels = document.querySelectorAll('.art-panel');
        const zSpacing = 1600;
        const totalDepth = (panels.length - 1) * zSpacing;

        panels.forEach((panel, i) => {
            gsap.set(panel, { z: -i * zSpacing, opacity: i === 0 ? 1 : 0 });

            // Mouse Tilt Effect
            panel.addEventListener('mousemove', (e) => {
                const rect = panel.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                gsap.to(panel.querySelector('.tilt-img'), { rotationY: x / 20, rotationX: -y / 20, duration: 0.4 });
            });
            panel.addEventListener('mouseleave', () => {
                gsap.to(panel.querySelector('.tilt-img'), { rotationY: 0, rotationX: 0, duration: 0.7 });
            });
        });

        // The Scroll "Flight"
        gsap.to(".tunnel-world", {
            z: totalDepth,
            ease: "none",
            scrollTrigger: {
                trigger: ".tunnel-container",
                pin: true,
                start: "top top",
                end: "+=" + (panels.length * 1200),
                scrub: 1,
                onUpdate: (self) => {
                    const currentZ = self.progress * totalDepth;
                    panels.forEach((panel, i) => {
                        const distance = Math.abs(currentZ - (i * zSpacing));
                        const info = panel.querySelector('.art-panel-info');
                        if (distance < 600) {
                            gsap.to(panel, { opacity: 1 });
                            gsap.to(info, { opacity: 1, x: 30 });
                        } else {
                            gsap.to(panel, { opacity: distance < 1800 ? 0.15 : 0 });
                            gsap.to(info, { opacity: 0, x: 0 });
                        }
                    });
                }
            }
        });
    }

   // 3. Museum Viewer (Lightbox)
const lightbox = document.getElementById("lightbox");
const viewerImg = document.getElementById("viewer-img");
const viewerTitle = document.getElementById("viewer-title");
const viewerDescription = document.getElementById("viewer-description"); // Make sure this exists

document.querySelectorAll(".art-panel").forEach(card => {
    card.addEventListener("click", () => {
        const index = card.getAttribute("data-index");
        const data = paintings[index];

        // This injects the missing details back into the viewer
        viewerImg.src = data.image;
        viewerTitle.innerText = data.title;
        viewerDescription.innerHTML = `
            <p><strong>Medium:</strong> ${data.medium}</p>
            <p><strong>Dimensions:</strong> ${data.size}</p>
            <p style="margin-top: 15px; font-style: italic;">"${data.description}"</p>
        `;

        lightbox.classList.add("active");
    });
});

document.querySelector(".close").addEventListener("click", () => lightbox.classList.remove("active"));
