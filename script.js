document.addEventListener("DOMContentLoaded", function() {
    // 1. Initial Tool Authorization
    gsap.registerPlugin(ScrollTrigger);

    // 2. Navigation Styling Shift on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Cinematic Entrance Screen Mechanism
    const intro = document.getElementById("intro-screen");
    if (intro) {
        const tl = gsap.timeline();
        tl.to(".intro-logo", { opacity: 1, duration: 1.5, ease: "power2.inOut" })
          .to(".intro-logo", { scale: 1.05, duration: 1.5, ease: "power2.inOut" })
          .to(intro, { 
              opacity: 0, 
              duration: 1, 
              onComplete: function() {
                  intro.style.display = "none";
                  ScrollTrigger.refresh();
              }
          });
    }

    // 4. Structural Content Reveal Trigger Loop
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(function(element) {
        ScrollTrigger.create({
            trigger: element,
            start: "top 85%",
            onEnter: function() {
                element.classList.add('active');
            }
        });
    });

    // 5. Dynamic Art Vault List (UPGRADED WITH PRICING FOR DIRECT SALES)
    const paintings = [
        { 
            title: "The Last Ember 1", 
            image: "The Last Ember 1.jpeg", 
            status: "SOLD", 
            price: "Private Collection", 
            medium: "Oil on Canvas", 
            size: "60x80 cm", 
            description: "The painting reminds us that the strongest people are often those who have weathered the hardest storms and still find peace in the quiet moments.
Some men leave behind buildings; others leave behind stories that become the foundation of a people.." 
        },
        { 
            title: "The Shepherd of Tomorrow", 
            image: "boy.jpeg", 
            status: "AVAILABLE", 
            price: "$300", 
            medium: "Oil on Canvas", 
            size: "60x80 cm", 
            description: "The herd beneath him is the inheritance of his ancestors, while the mountain beyond him is a reminder that greatness is built through patience. Though he is only a boy, his calm gaze carries the responsibility of generations.." 
        },
        { 
            title: "Tle Last Ember 2", 
            image: "ember.jpeg", 
            status: "AVAILABLE", 
            price: "$300", 
            medium: "Oil on Canvas", 
            size: "60x80 cm", 
            description: "The painting reminds us that the strongest people are often those who have weathered the hardest storms and still find peace in the quiet moments.
Some men leave behind buildings; others leave behind stories that become the foundation of a people.." 
        },
        { 
            title: "The Feet that carried a continet", 
            image: "feet.jpeg", 
            status: "AVAILABLE", 
            price: "$300", 
            medium: "Oil on Canvas", 
            size: "60x80 cm", 
            description: "Movement study." 
        },
         { 
            title: "Daughter of the Plains", 
            image: "masai.jpeg", 
            status: "AVAILABLE", 
            price: "$300", 
            medium: "Oil on Canvas", 
            size: "60x80 cm", 
            description: "She stands in silence, adorned not only with beads but with the legacy of generations. Her beauty is not measured by appearance alone—it is found in her courage, her wisdom, and her unwavering pride in who she is.
Her eyes look beyond the horizon, carrying the hopes of her ancestors and the promise of those yet to come.
She is more than a daughter of Africa; she is the heartbeat of its future.." 
        },
        
    ];

    // 6. Interactive 3D Tunnel Engineering
    const tunnelWorld = document.getElementById("tunnel-world");
    if (tunnelWorld) {
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
        const totalDepth = (panels.length - 1) * zSpacing;

        panels.forEach(function(panel, i) {
            gsap.set(panel, { z: -i * zSpacing, opacity: i === 0 ? 1 : 0 });

            // Mobile/Universal Breathing Animation
            gsap.to(panel.querySelector('.tilt-img'), {
                y: 12,
                rotationZ: i % 2 === 0 ? 1 : -1,
                duration: 3.5,
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut",
                delay: i * 0.4
            });

            // Desktop Mouse Tilt Effect
            panel.addEventListener('mousemove', function(e) {
                const rect = panel.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                gsap.to(panel.querySelector('.tilt-img'), { rotationY: x / 20, rotationX: -y / 20, duration: 0.4 });
            });
            panel.addEventListener('mouseleave', function() {
                gsap.to(panel.querySelector('.tilt-img'), { rotationY: 0, rotationX: 0, duration: 0.7 });
            });
        });

        gsap.to(".tunnel-world", {
            z: totalDepth,
            ease: "none",
            scrollTrigger: {
                trigger: ".tunnel-container",
                pin: true,
                start: "top top",
                end: "+=" + (panels.length * 1200),
                scrub: 2.5, // Smooth momentum for mobile
                onUpdate: function(self) {
                    const currentZ = self.progress * totalDepth;
                    panels.forEach(function(panel, i) {
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

    // 7. Lightbox Museum Interface Handler (UPGRADED FOR SALES)
    const lightbox = document.getElementById("lightbox");
    const viewerImg = document.getElementById("viewer-img");
    const viewerTitle = document.getElementById("viewer-title");
    const viewerDescription = document.getElementById("viewer-description");
    const viewerLink = document.getElementById("viewer-link");

    if (lightbox) {
        document.addEventListener("click", function(e) {
            const panel = e.target.closest(".art-panel");
            if (panel) {
                const index = panel.getAttribute("data-index");
                const data = paintings[index];
                
                if (viewerImg) viewerImg.src = data.image;
                if (viewerTitle) viewerTitle.innerText = data.title;
                
                // Injecting the Price, Medium, and Story into the Lightbox
                if (viewerDescription) {
                    viewerDescription.innerHTML = `
                        <p style="font-size: 1.1rem; color: #d4af37; margin-bottom: 10px; letter-spacing: 1px;">
                            <strong>Investment: ${data.price}</strong>
                        </p>
                        <p><strong>Medium:</strong> ${data.medium}</p>
                        <p><strong>Dimensions:</strong> ${data.size}</p>
                        <p style="margin-top: 15px; font-style: italic; color: #a09990; line-height: 1.6;">"${data.description}"</p>
                    `;
                }

                // Dynamic WhatsApp Link generation based on availability
                if (viewerLink) {
                    if (data.status === "SOLD") {
                        // If it's sold, change button to Commission Inquiry
                        viewerLink.innerText = "Request Similar Commission";
                        viewerLink.href = `https://wa.me/255692973059?text=Hello%20McDonald,%20I%20saw%20"${encodeURIComponent(data.title)}" did%20sell.%20I%20would%20love%20to%20discuss%20commissioning%20a%20similar%20piece.`;
                    } else {
                        // If available, standard acquisition link with price included
                        viewerLink.innerText = "Acquire This Piece";
                        viewerLink.href = `https://wa.me/255692973059?text=Hello%20McDonald,%20I%20am%20interested%20in%20acquiring%20your%20painting:%20"${encodeURIComponent(data.title)}"%20listed%20at%20${encodeURIComponent(data.price)}.`;
                    }
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
        
        lightbox.addEventListener("click", function(e) {
            if (e.target === lightbox) lightbox.classList.remove("active");
        });
    }
});
