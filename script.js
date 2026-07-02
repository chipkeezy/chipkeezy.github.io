document.addEventListener("DOMContentLoaded", function() {
    gsap.registerPlugin(ScrollTrigger);

    // ==========================================
    // ADD NEW PAINTINGS BELOW THIS LINE
    // ==========================================
    const paintings = [
        { 
            title: "The Last Ember 1", 
            image: "The Last Ember 1.jpeg", 
            status: "SOLD", 
            price: "Private Collection", 
            medium: "Oil on Canvas", 
            size: "60x80 cm", 
            description: `The painting reminds us that the strongest people are often those who have weathered the hardest storms and still find peace in the quiet moments.
Some men leave behind buildings; others leave behind stories that become the foundation of a people.` 
        },
        { 
            title: "The Shepherd of Tomorrow", 
            image: "boy.jpeg", 
            status: "AVAILABLE", 
            price: "$300", 
            medium: "Oil on Canvas", 
            size: "60x80 cm", 
            description: `The herd beneath him is the inheritance of his ancestors, while the mountain beyond him is a reminder that greatness is built through patience.` 
        },
        { 
            title: "Daughter of the Plains", 
            image: "masai.jpeg", 
            status: "AVAILABLE", 
            price: "$300", 
            medium: "Oil on Canvas", 
            size: "60x80 cm", 
            description: `She stands in silence, adorned not only with beads but with the legacy of generations. Her beauty is not measured by appearance alone.` 
        }
    ];
    // ==========================================
    // STOP EDITING HERE
    // ==========================================

    // --- Core Engine (Don't change this part) ---
    const tunnelWorld = document.getElementById("tunnel-world");
    if (tunnelWorld) {
        tunnelWorld.innerHTML = ""; // Clear existing
        paintings.forEach(function(p, index) {
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
        
        // ... Re-initializing GSAP for the new panels
        const panels = document.querySelectorAll('.art-panel');
        const zSpacing = 1600;
        panels.forEach((panel, i) => {
            gsap.set(panel, { z: -i * zSpacing, opacity: i === 0 ? 1 : 0 });
            // Breathing animation
            gsap.to(panel.querySelector('.tilt-img'), { y: 12, rotationZ: i % 2 === 0 ? 1 : -1, duration: 3.5, yoyo: true, repeat: -1, ease: "sine.inOut", delay: i * 0.4 });
        });
    }

    // Lightbox Logic
    const lightbox = document.getElementById("lightbox");
    document.addEventListener("click", function(e) {
        const panel = e.target.closest(".art-panel");
        if (panel) {
            const data = paintings[panel.getAttribute("data-index")];
            document.getElementById("viewer-img").src = data.image;
            document.getElementById("viewer-title").innerText = data.title;
            document.getElementById("viewer-description").innerHTML = `
                <p style="color: #d4af37;"><strong>Investment: ${data.price}</strong></p>
                <p><strong>Medium:</strong> ${data.medium}</p>
                <p style="white-space: pre-line;">"${data.description}"</p>`;
            
            const link = document.getElementById("viewer-link");
            link.href = data.status === "SOLD" 
                ? `https://wa.me/255692973059?text=I%20saw%20${encodeURIComponent(data.title)}%20sold.%20I%20want%20a%20commission.`
                : `https://wa.me/255692973059?text=I%20am%20interested%20in%20acquiring%20${encodeURIComponent(data.title)}%20for%20${encodeURIComponent(data.price)}.`;
            
            lightbox.classList.add("active");
        }
    });

    // Close lightbox
    document.querySelector(".close")?.addEventListener("click", () => lightbox.classList.remove("active"));
});
