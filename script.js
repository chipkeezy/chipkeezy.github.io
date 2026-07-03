document.addEventListener("DOMContentLoaded", function() {
    gsap.registerPlugin(ScrollTrigger);

    // 1. INTRO
    const intro = document.getElementById("intro-screen");
    if(intro) {
        gsap.to(intro, { opacity: 0, duration: 1, delay: 1, onComplete: () => intro.style.display = "none" });
    }

    const paintings = [
        { title: "The Last Ember 1", image: "The Last Ember 1.jpeg", status: "SOLD", price: "Private Collection", medium: "Oil on Canvas", size: "60x80 cm", description: "..." },
        { title: "The Shepherd of Tomorrow", image: "boy.jpeg", status: "AVAILABLE", price: "$300", medium: "Oil on Canvas", size: "60x80 cm", description: "..." }
    ];

    const tunnel = document.getElementById("tunnel-world");
    
    paintings.forEach((p, i) => {
        tunnel.innerHTML += `
            <div class="art-panel" data-index="${i}">
                <img src="${p.image}" class="tilt-img">
                <div class="art-info-popup">
                    <h3>${p.title}</h3>
                    <p>${p.status}</p>
                </div>
            </div>`;
    });

    // 2. PINNING ENGINE
    const panels = gsap.utils.toArray('.art-panel');
    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: "#tunnel-world",
            pin: true,
            start: "top top",
            end: "+=" + (panels.length * 1000),
            scrub: 1
        }
    });

    panels.forEach((panel, i) => {
        gsap.set(panel, { z: -2000, opacity: 0 });
        tl.to(panel, { z: 400, opacity: 1, duration: 1 }, i * 0.5);
        tl.to(panel, { z: 1000, opacity: 0, duration: 0.5 }, (i * 0.5) + 0.5);
    });

    // 3. LIGHTBOX
    document.addEventListener("click", (e) => {
        if(e.target.closest(".art-panel")) {
            const index = e.target.closest(".art-panel").dataset.index;
            const data = paintings[index];
            document.getElementById("viewer-img").src = data.image;
            document.getElementById("viewer-title").innerText = data.title;
            document.getElementById("viewer-description").innerHTML = `
                <p>Investment: ${data.price}</p>
                <p>Medium: ${data.medium}</p>`;
            document.getElementById("lightbox").classList.add("active");
        }
    });
    
    document.querySelector(".close").onclick = () => document.getElementById("lightbox").classList.remove("active");
});
