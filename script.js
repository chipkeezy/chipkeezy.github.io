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

    // 5. Dynamic Art Vault List
    const paintings = [
        { title: "The Last Ember", image: "The Last Ember 1.jpeg", status: "AVAILABLE", medium: "Oil on Canvas", size: "24x36 cm", description: "A study in light and warmth." },
        { title: "Boy", image: "boy.jpeg", status: "SOLD", medium: "Oil on Canvas", size: "18x24 cm", description: "Portrait of a young spirit." },
        { title: "Ember", image: "ember.jpeg", status: "AVAILABLE", medium: "Oil on Canvas", size: "20x20 cm", description: "Abstract fire series." },
        { title: "Feet", image: "feet.jpeg", status: "AVAILABLE", medium: "Oil on Canvas", size: "12x12 cm", description: "Movement study." }
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
                scrub: 1,
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

    // 7. Lightbox Museum Interface Handler
    const lightbox = document.getElementById("lightbox");
    const viewerImg = document.getElementById("viewer-img");
    const viewerTitle = document.getElementById("viewer-title");
    const viewerDescription = document.getElementById("viewer-description");
    const viewerLink = document.getElementById("viewer-link");

    if (lightbox) {
        // Use event delegation for dynamically created gallery panels
        document.addEventListener("click", function(e) {
            const panel = e.target.closest(".art-panel");
            if (panel) {
                const index = panel.getAttribute("data-index");
                const data = paintings[index];
                
                if (viewerImg) viewerImg.src = data.image;
                if (viewerTitle) viewerTitle.innerText = data.title;
                
                if (viewerDescription) {
                    viewerDescription.innerHTML = `
                        <p><strong>Medium:</strong> ${data.medium}</p>
                        <p><strong>Dimensions:</strong> ${data.size}</p>
                        <p style="margin-top: 15px; font-style: italic; color: #a09990;">"${data.description}"</p>
                    `;
                }

                if (viewerLink) {
                    viewerLink.href = `https://wa.me/255692973059?text=Hello%20McDonald,%20I%20am%20interested%20in%20acquiring%20your%20painting:%20"${encodeURIComponent(data.title)}".`;
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
