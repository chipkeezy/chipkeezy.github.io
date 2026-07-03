document.addEventListener("DOMContentLoaded", function() {
    gsap.registerPlugin(ScrollTrigger);

    // ==========================================
    // 0. INTRO LOGO ANIMATION & RAISE THE CURTAIN
    // ==========================================
    const introScreen = document.getElementById("intro-screen");
    
    // Broadened selector: Looks for the class, OR any image/heading inside the intro screen
    const introLogo = document.querySelector(".intro-logo, #intro-screen img, #intro-screen h1");

    if (introScreen) {
        if (introLogo) {
            gsap.fromTo(introLogo, 
                { opacity: 0, scale: 0.5 }, 
                { opacity: 1, scale: 1, duration: 1.2, ease: "back.out(1.5)" }
            );
        }

        gsap.to(introScreen, {
            opacity: 0,
            duration: 1.5,
            delay: 1.5,
            ease: "power2.inOut",
            onComplete: () => {
                introScreen.style.display = "none";
                // CRITICAL FIX: Tell GSAP to recalculate the page height now that the curtain is gone
                ScrollTrigger.refresh();
            }
        });
    }

    // ==========================================
    // 1. YOUR PAINTINGS (Final Art)
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
    // 2. YOUR STUDIO PROCESS (Work in Progress)
    // ==========================================
    const processImages = [
        { 
            title: "Initial Sketch", 
            image: "sketch1.jpeg", 
            description: "The first vision of the piece." 
        },
        { 
            title: "First Layers", 
            image: "wip1.jpeg", 
            description: "Building the foundation." 
        }
    ];

    // ==========================================
    // ENGINE: RENDERING THE SECTIONS
    // ==========================================
    
    const processGrid = document.getElementById("process-grid");
    if (processGrid) {
        processGrid.innerHTML = ""; 
        processImages.forEach(item => {
            processGrid.innerHTML += `
                <div class="process-item" style="border: 1px solid #333; padding: 15px; text-align: center; border-radius: 8px; background: #111;">
                    <img src="${item.image}" alt="${item.title}" style="width: 100%; height: auto; display: block; margin-bottom: 15px; border-radius: 4px;">
                    <h3 style="font-size: 1.2rem; margin: 10px 0; font-family: serif;">${item.title}</h3>
                    <p style="font-size: 0.9rem; color: #aaa;">${item.description}</p>
                </div>
            `;
        });
    }

    const tunnelWorld = document.getElementById("tunnel-world");
    if (tunnelWorld) {
        tunnelWorld.innerHTML = ""; 
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
        
        const panels = document.querySelectorAll('.art-panel');
        const zSpacing = 1600; 

        function updateTunnelPositions() {
            let top = document.documentElement.scrollTop || window.pageYOffset;
            panels.forEach((panel, i) => {
                let zPosition = (-i * zSpacing) + (top * 1.5); 
                let opacity = zPosition > 400 ? 0 : (zPosition < -2500 ? 0 : 1);
                gsap.set(panel, { z: zPosition, opacity: opacity });
            });
        }

        window.addEventListener('scroll', updateTunnelPositions);
        updateTunnelPositions();

        panels.forEach((panel, i) => {
            gsap.to(panel.querySelector('.tilt-img'), { 
                y: 12, 
                rotationZ: i % 2 === 0 ? 1 : -1, 
                duration: 3.5, 
                yoyo: true, 
                repeat: -1, 
                ease: "sine.inOut", 
                delay: i * 0.4 
            });
        });
    }

    // ==========================================
    // 3. SCROLL REVEALS (Moved AFTER rendering)
    // ==========================================
    // We target broader tags like 'section' and 'header' to guarantee we catch your text
    const revealElements = document.querySelectorAll('.hero-content, .studio-content, .contact-card, .reveal, .process-item, section, header');
    
    if (revealElements.length > 0) {
        revealElements.forEach((el) => {
            gsap.fromTo(el, 
                { opacity: 0, y: 40 }, 
                { 
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    },
                    opacity: 1, 
                    y: 0, 
                    duration: 1.2, 
                    ease: "power3.out" 
                }
            );
        });
        
        // Final recalculation to ensure perfect math
        ScrollTrigger.refresh();
    }

    // ==========================================
    // LIGHTBOX POPUP LOGIC
    // ==========================================
    const lightbox = document.getElementById("lightbox");
    if (lightbox) {
        document.addEventListener("click", function(e) {
            const panel = e.target.closest(".art-panel");
            if (panel) {
                const data = paintings[panel.getAttribute("data-index")];
                document.getElementById("viewer-img").src = data.image;
                document.getElementById("viewer-title").innerText = data.title;
                document.getElementById("viewer-description").innerHTML = `
                    <p style="color: #d4af37; margin-bottom: 5px;"><strong>Investment: ${data.price}</strong></p>
                    <p style="color: #aaa; font-size: 0.9rem; margin-bottom: 10px;"><strong>Medium:</strong> ${data.medium} | <strong>Size:</strong> ${data.size}</p>
                    <p style="white-space: pre-line; italic;">"${data.description}"</p>`;
                
                const link = document.getElementById("viewer-link");
                if(link) {
                    link.innerText = data.status === "SOLD" ? "Commission Similar Work" : "Acquire Piece via WhatsApp";
                    link.href = data.status === "SOLD" 
                        ? `https://wa.me/255692973059?text=I%20saw%20${encodeURIComponent(data.title)}%20is%20sold.%20I%20would%20like%20to%20commission%20a%20similar%20original%20artwork.`
                        : `https://wa.me/255692973059?text=I%20am%20interested%20in%20acquiring%20the%20original%20painting%20${encodeURIComponent(data.title)}%20for%20${encodeURIComponent(data.price)}.`;
                }
                lightbox.classList.add("active");
            }
        });

        const closeBtn = document.querySelector(".close");
        if(closeBtn) {
            closeBtn.addEventListener("click", () => lightbox.classList.remove("active"));
        }
    }
});
