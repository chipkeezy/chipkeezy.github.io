document.addEventListener("DOMContentLoaded", function() {
    // Register GSAP ScrollTrigger plugin safely
    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
    } else {
        console.error("GSAP or ScrollTrigger is not loaded properly.");
        return;
    }

    // ==========================================
    // 1. INTRO SCREEN CURTAIN ANIMATION
    // ==========================================
    const introScreen = document.getElementById("intro-screen");
    if (introScreen) {
        gsap.to(introScreen, {
            opacity: 0,
            duration: 1.5,
            delay: 0.5,
            ease: "power2.inOut",
            onComplete: () => {
                introScreen.style.display = "none";
                ScrollTrigger.refresh();
            }
        });
    }

    // ==========================================
    // 2. PAINTINGS DATA STRUCTURE
    // ==========================================
    const paintings = [
        { 
            title: "The Last Ember 1", 
            image: "The Last Ember 1.jpeg", 
            status: "SOLD", 
            price: "Private Collection", 
            medium: "Oil on Canvas", 
            size: "60x80 cm", 
            description: "The painting reminds us that the strongest people are often those who have weathered the hardest storms and still find peace in the quiet moments.\nSome men leave behind buildings; others leave behind stories that become the foundation of a people." 
        },
        { 
            title: "The Shepherd of Tomorrow", 
            image: "boy.jpeg", 
            status: "AVAILABLE", 
            price: "$300", 
            medium: "Oil on Canvas", 
            size: "60x80 cm", 
            description: "The herd beneath him is the inheritance of his ancestors, while the mountain beyond him is a reminder that greatness is built through patience." 
        },
        { 
            title: "Daughter of the Plains", 
            image: "masai.jpeg", 
            status: "AVAILABLE", 
            price: "$300", 
            medium: "Oil on Canvas", 
            size: "60x80 cm", 
            description: "She stands in silence, adorned not only with beads but with the legacy of generations. Her beauty is not measured by appearance alone." 
        }
    ];

    // ==========================================
    // 3. GENERATE 3D TUNNEL PANELS
    // ==========================================
    const tunnelWorld = document.getElementById("tunnel-world");
    if (tunnelWorld) {
        tunnelWorld.innerHTML = ""; // Clear out experimental markup
        
        paintings.forEach(function(p, index) {
            // Using your original clean structure so CSS matches exactly
            const panel = document.createElement("div");
            panel.className = "art-panel";
            panel.setAttribute("data-index", index);
            
            panel.innerHTML = `
                <img src="${p.image}" alt="${p.title}" class="tilt-img">
                <div class="art-panel-info">
                    <h3>${p.title}</h3>
                    <p class="badge">${p.status}</p>
                </div>
            `;
            tunnelWorld.appendChild(panel);
        });

        // ==========================================
        // 4. THE PINNED 3D DRIFT GALLERY ENGINE
        // ==========================================
        const panels = gsap.utils.toArray('.art-panel');
        
        // This timeline freezes the screen and handles the smooth Z-axis drift
        let galleryTl = gsap.timeline({
            scrollTrigger: {
                trigger: tunnelWorld,
                start: "top top",     // Lock when section hits top of screen
                end: "+=" + (panels.length * 1200), // Distance required to finish the drift
                pin: true,            // Freezes vertical scrolling
                scrub: 1,             // Links movement tightly to scroll position
                invalidateOnRefresh: true
            }
        });

        panels.forEach((panel, i) => {
            // Initial positioning deep inside the 3D field
            gsap.set(panel, { z: -2500, opacity: 0, transformPerspective: 1000 });

            // Drift Timeline: Move forward through the space past camera viewport
            galleryTl.to(panel, {
                z: 200, 
                opacity: 1,
                duration: 1,
                ease: "none"
            }, i * 0.8)
            .to(panel, {
                z: 1200, 
                opacity: 0,
                duration: 0.6,
                ease: "none"
            }, (i * 0.8) + 0.8);

            // Left-Side Info Pop-up Animations (.art-panel-info)
            const infoBadge = panel.querySelector('.art-panel-info');
            if (infoBadge) {
                gsap.set(infoBadge, { opacity: 0, x: -60 }); // Start tucked off-screen left
                
                galleryTl.to(infoBadge, { 
                    opacity: 1, 
                    x: 0, 
                    duration: 0.3,
                    ease: "power2.out"
                }, (i * 0.8) + 0.2)
                .to(infoBadge, { 
                    opacity: 0, 
                    x: -30, 
                    duration: 0.3,
                    ease: "power2.in"
                }, (i * 0.8) + 0.7);
            }
        });
    }

    // ==========================================
    // 5. LIGHTBOX MODAL LOGIC (Original Formats)
    // ==========================================
    const lightbox = document.getElementById("lightbox");
    if (lightbox) {
        document.addEventListener("click", function(e) {
            const panel = e.target.closest(".art-panel");
            if (panel) {
                const idx = panel.getAttribute("data-index");
                const data = paintings[idx];
                
                const viewerImg = document.getElementById("viewer-img");
                if (viewerImg) viewerImg.src = data.image;
                
                const viewerTitle = document.getElementById("viewer-title");
                if (viewerTitle) viewerTitle.innerText = data.title;
                
                // Pure textual data injection to respect your stylesheet rules
                const viewerDesc = document.getElementById("viewer-description");
                if (viewerDesc) {
                    viewerDesc.innerHTML = `
                        <p style="color: #d4af37; margin-bottom: 6px;"><strong>Investment: ${data.price}</strong></p>
                        <p style="color: #aaa; font-size: 0.9rem; margin-bottom: 12px;"><strong>Medium:</strong> ${data.medium} | <strong>Size:</strong> ${data.size}</p>
                        <p style="white-space: pre-line; line-height: 1.6;">${data.description}</p>
                    `;
                }
                
                const link = document.getElementById("viewer-link");
                if (link) {
                    link.innerText = data.status === "SOLD" ? "Commission Similar Work" : "Acquire Piece via WhatsApp";
                    link.href = data.status === "SOLD" 
                        ? `https://wa.me/255692973059?text=I%20saw%20${encodeURIComponent(data.title)}%20is%20sold.%20I%20would%20like%20to%20commission%20a%20similar%20original%20artwork.`
                        : `https://wa.me/255692973059?text=I%20am%20interested%20in%20acquiring%20the%20original%20painting%20${encodeURIComponent(data.title)}%20for%20${encodeURIComponent(data.price)}.`;
                }
                lightbox.classList.add("active");
            }
        });

        const closeBtn = document.querySelector(".close");
        if (closeBtn) {
            closeBtn.addEventListener("click", function() {
                lightbox.classList.remove("active");
            });
        }
    }
});
