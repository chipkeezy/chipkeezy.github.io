document.addEventListener("DOMContentLoaded", function() {
    gsap.registerPlugin(ScrollTrigger);

    // ==========================================
    // 0. INTRO LOGO ANIMATION & RAISE THE CURTAIN
    // ==========================================
    const introScreen = document.getElementById("intro-screen");
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
                ScrollTrigger.refresh();
            }
        });
    }

    // ==========================================
    // 1. YOUR PAINTINGS
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
    // 2. STUDIO PROCESS
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
    // ENGINE: RENDERING
    // ==========================================
    
    const processGrid = document.getElementById("process-grid");
    if (processGrid) {
        processGrid.innerHTML = ""; 
        processImages.forEach(item => {
            processGrid.innerHTML += `
                <div class="process-item">
                    <img src="${item.image}" alt="${item.title}" style="width: 100%; height: auto; display: block; margin-bottom: 15px;">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
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
        
        // ==========================================
        // 3. THE RESTORED 3D DRIFT & PINNING ENGINE
        // ==========================================
        const panels = gsap.utils.toArray('.art-panel');
        
        // This is the timeline that "stops" the page and drifts through the paintings
        let galleryTl = gsap.timeline({
            scrollTrigger: {
                trigger: tunnelWorld,
                start: "top top", // Starts when gallery hits the top of the screen
                end: "+=" + (panels.length * 1000), // Scroll distance needed to see everything
                pin: true, // MAGIC WORD: Freezes the page here
                scrub: 1 // Creates the smooth drift effect
            }
        });

        panels.forEach((panel, i) => {
            // Setup: Hide paintings far in the background
            gsap.set(panel, { z: -3000, opacity: 0 });

            // Fly forward animation
            galleryTl.to(panel, {
                z: 400, // Fly past the camera
                opacity: 1,
                duration: 2,
                ease: "none"
            }, i * 0.8); // Stagger each painting

            // The Left-Side Info Popup Animation
            const infoBadge = panel.querySelector('.art-panel-info');
            if (infoBadge) {
                gsap.set(infoBadge, { opacity: 0, x: -50 }); // Start hidden to the left
                
                // Fade in and slide right when the painting is close
                galleryTl.to(infoBadge, { opacity: 1, x: 0, duration: 0.4 }, (i * 0.8) + 1.2);
                
                // Fade out right before the painting disappears
                galleryTl.to(infoBadge, { opacity: 0, duration: 0.2 }, (i * 0.8) + 1.8);
            }
        });
    }

    // ==========================================
    // 4. SCROLL REVEALS
    // ==========================================
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
        ScrollTrigger.refresh();
    }

    // ==========================================
    // RESTORED ORIGINAL LIGHTBOX LOGIC
    // ==========================================
    const lightbox = document.getElementById("lightbox");
    if (lightbox) {
        document.addEventListener("click", function(e) {
            const panel = e.target.closest(".art-panel");
            if (panel) {
                const data = paintings[panel.getAttribute("data-index")];
                document.getElementById("viewer-img").src = data.image;
                document.getElementById("viewer-title").innerText = data.title;
                
                // Restored exact original inline layout for the description!
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
