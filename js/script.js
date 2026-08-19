/* ==========================================================
   INTRUDERCODE
   SCRIPT.JS
========================================================== */

"use strict";

let isTicking = false;

function handleGlobalScroll() {

    updateBackToTop();

}

/* ==========================================================
   WAIT FOR DOM
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeRevealAnimations();

    initializeFloatingCards();

    initializeDashboardAnimation();

    initializeHeroParallax();

    initializeHeroGlow();

    initializeCardHoverEffect();

    initializeContactForm();

    initializeFAQ();

});

/* ==========================================================
   REVEAL ANIMATION
========================================================== */

function initializeRevealAnimations() {

    const revealElements = document.querySelectorAll(

        ".section-heading," +
        ".trust-card," +
        ".solution-card," +
        ".industry-card," +
        ".case-card," +
        ".cta-box"

    );

    const observer = new IntersectionObserver(

        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                }

            });

        },

        {

            threshold:0.15

        }

    );

    revealElements.forEach(element => {

        element.classList.add("hidden-element");

        observer.observe(element);

    });

}

/* ==========================================================
   FLOATING CARDS
========================================================== */

function initializeFloatingCards() {

    const cards = document.querySelectorAll(".floating-card");

    cards.forEach((card,index)=>{

        card.style.animationDelay = `${index * 0.5}s`;

    });

}

/* ==========================================================
   DASHBOARD CARDS
========================================================== */

function initializeDashboardAnimation(){

    const statusCards =
        document.querySelectorAll(
            ".status-card, .dashboard-card"
        );

    statusCards.forEach((card,index)=>{

        card.classList.add("dashboard-card-enter");

        setTimeout(()=>{

            card.classList.add("show");

        },250 + (index * 150));

    });

}


/* ==========================================================
   HERO PARALLAX
========================================================== */

function initializeHeroParallax() {

    const hero =
        document.querySelector(".hero");

    const dashboard =
        document.querySelector(".dashboard");

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

    if (
        !hero ||
        !dashboard ||
        prefersReducedMotion
    ) {
        return;
    }

    let targetX = 0;
    let targetY = 0;

    let currentX = 0;
    let currentY = 0;

    const updateDashboardPosition = () => {

        currentX +=
            (targetX - currentX) * 0.08;

        currentY +=
            (targetY - currentY) * 0.08;

        dashboard.style.transform =
            `translate3d(${currentX}px, ${currentY}px, 0)`;

        requestAnimationFrame(
            updateDashboardPosition
        );

    };

    hero.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                hero.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            targetX =
                (x - rect.width / 2) / 40;

            targetY =
                (y - rect.height / 2) / 40;

        },
        { passive: true }
    );

    hero.addEventListener(
        "mouseleave",
        () => {

            targetX = 0;
            targetY = 0;

        }
    );

    updateDashboardPosition();

}


/* ==========================================================
   HERO GLOW
========================================================== */

function initializeHeroGlow() {

    const orbs =
        document.querySelectorAll(".gradient-orb");

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

    if (
        !orbs.length ||
        prefersReducedMotion
    ) {
        return;
    }

    let mouseX = 0;
    let mouseY = 0;

    let currentX = 0;
    let currentY = 0;

    const updateOrbPosition = () => {

        currentX +=
            (mouseX - currentX) * 0.08;

        currentY +=
            (mouseY - currentY) * 0.08;

        orbs.forEach((orb, index) => {

            const speed =
                (index + 1) * 0.01;

            const x =
                currentX * speed;

            const y =
                currentY * speed;

            orb.style.transform =
                `translate3d(${x}px, ${y}px, 0)`;

        });

        requestAnimationFrame(
            updateOrbPosition
        );

    };

    window.addEventListener(
        "mousemove",
        (event) => {

            mouseX = event.clientX;
            mouseY = event.clientY;

        },
        { passive: true }
    );

    updateOrbPosition();

}


/* ==========================================================
   SCROLL PROGRESS BAR
========================================================== */

function updateBackToTop(){

    if(window.scrollY>500){

        backToTop.classList.add("show");

    }

    else{

        backToTop.classList.remove("show");

    }

}

/* ==========================================================
   REQUEST ANIMATION FRAME
========================================================== */

window.addEventListener("scroll",()=>{

    if(!isTicking){

        requestAnimationFrame(()=>{

            handleGlobalScroll();

            isTicking=false;

        });

        isTicking=true;

    }

});

/* ==========================================================
   BACK TO TOP BUTTON
========================================================== */

const backToTop = document.createElement("button");

backToTop.className = "back-to-top";

backToTop.setAttribute("aria-label","Back to Top");

backToTop.innerHTML =

    '<i class="fa-solid fa-arrow-up"></i>';

document.body.appendChild(backToTop);

backToTop.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});


/* ==========================================================
   AUTO FOOTER YEAR
========================================================== */

const footerYear =
    document.getElementById("currentYear");

if (footerYear) {

    footerYear.textContent =
        new Date().getFullYear();

}

/* ==========================================================
   CARD HOVER EFFECT
========================================================== */

function initializeCardHoverEffect() {

    const cards = document.querySelectorAll(
        ".trust-card, .solution-card, .industry-card"
    );

    if (!cards.length) {
        return;
    }

    cards.forEach(card => {

        let mouseX = 0;
        let mouseY = 0;

        let framePending = false;

        const updateCardPosition = () => {

            card.style.setProperty(
                "--x",
                `${mouseX}px`
            );

            card.style.setProperty(
                "--y",
                `${mouseY}px`
            );

            framePending = false;

        };

        card.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    card.getBoundingClientRect();

                mouseX =
                    event.clientX - rect.left;

                mouseY =
                    event.clientY - rect.top;

                if (!framePending) {

                    framePending = true;

                    requestAnimationFrame(
                        updateCardPosition
                    );

                }

            },
            { passive: true }
        );

    });

}

/* ==========================================================
   ACCESSIBILITY
========================================================== */

document.addEventListener("keyup",(event)=>{

    if(event.key==="Tab"){

        document.body.classList.add("keyboard-user");

    }

});

document.addEventListener("mousedown",()=>{

    document.body.classList.remove("keyboard-user");

});

/* ==========================================================
   ERROR HANDLING
========================================================== */

window.addEventListener("error",(event)=>{

    console.error(

        "IntruderCode Error:",

        event.message

    );

});

/* ==========================================================
   CONTACT FORM
========================================================== */

function initializeContactForm(){

    const form =
        document.getElementById("contactForm");

    const status =
        document.getElementById("formStatus");

    if (!form || !status) {
        return;
    }


    form.addEventListener("submit", (event) => {

        event.preventDefault();


        status.textContent = "";
        status.className = "form-status";


        if (!form.checkValidity()) {

            form.reportValidity();

            status.textContent =
                "Please complete the required fields.";

            status.classList.add("error");

            return;

        }


        const submitButton =
            form.querySelector(".form-submit");


        if (submitButton) {

            submitButton.disabled = true;

            submitButton.setAttribute(
                "aria-busy",
                "true"
            );

        }


        status.textContent =
            "Your enquiry is ready to be submitted.";


        status.classList.add("success");


        /*
         * Backend submission will be connected
         * during the final Core Setup phase.
         */


        if (submitButton) {

            submitButton.disabled = false;

            submitButton.removeAttribute(
                "aria-busy"
            );

        }

    });

}

/* ==========================================================
   FAQ ACCORDION
========================================================== */

function initializeFAQ(){

    const questions =
        document.querySelectorAll(".faq-question");

    if (!questions.length) {
        return;
    }


    questions.forEach((question) => {

        question.addEventListener("click", () => {

            const answerId =
                question.getAttribute("aria-controls");

            const answer =
                document.getElementById(answerId);

            if (!answer) {
                return;
            }


            const isOpen =
                question.getAttribute("aria-expanded")
                === "true";


            questions.forEach((item) => {

                item.setAttribute(
                    "aria-expanded",
                    "false"
                );

                const itemAnswerId =
                    item.getAttribute("aria-controls");

                const itemAnswer =
                    document.getElementById(
                        itemAnswerId
                    );

                if (itemAnswer) {
                    itemAnswer.hidden = true;
                }

            });


            if (!isOpen) {

                question.setAttribute(
                    "aria-expanded",
                    "true"
                );

                answer.hidden = false;

            }

        });

    });

}

/* ==========================================================
   END OF SCRIPT.JS
========================================================== */