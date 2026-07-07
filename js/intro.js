/*==================================================
McDonald Simon Portfolio
Cinematic Intro V1
==================================================*/

window.addEventListener("load", () => {

    if (sessionStorage.getItem("introPlayed")) {

        const intro = document.getElementById("intro");

        if (intro) intro.remove();

        return;

    }

    sessionStorage.setItem("introPlayed", "true");

    const tl = gsap.timeline();

    gsap.set("#logoReveal", {
        opacity: 0,
        scale: 0.75
    });

    gsap.set(".intro-light", {
        x: "-120%",
        opacity: 0
    });

    gsap.set("#brushReveal", {
        opacity: 0,
        x: "-40%",
        rotation: -8
    });

    tl

    .to(".intro-light", {
        opacity: 1,
        duration: .6
    })

    .to("#brushReveal", {
        opacity: 1,
        x: "0%",
        rotation: -2,
        duration: 1.8,
        ease: "power3.out"
    }, "-=.3")

    .to(".intro-light", {
        x: "180%",
        duration: 2.1,
        ease: "power2.inOut"
    }, "<")

    .to("#logoReveal", {
        opacity: 1,
        scale: 1,
        duration: .9,
        ease: "back.out(1.8)"
    }, "-=.9")

    .to("#logoReveal", {
        scale: 1.04,
        repeat: 1,
        yoyo: true,
        duration: .8,
        ease: "sine.inOut"
    })

    .to("#intro", {
        opacity: 0,
        duration: .9,
        ease: "power2.inOut",
        onComplete() {

            document.getElementById("intro").remove();

        }

    });

});
