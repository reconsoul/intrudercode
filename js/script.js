/* ==========================================================
   INTRUDERCODE
   SCRIPT.JS
========================================================== */

"use strict";

let isTicking = false;

function handleGlobalScroll() {

    updateProgressBar();

    updateBackToTop();

}

/* ==========================================================
   WAIT FOR DOM
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeRevealAnimations();

    initializeFloatingCards();

    initializeDashboardAnimation();

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
   COUNTER ANIMATION
========================================================== */

function animateCounter(counter) {

    const target = parseInt(counter.dataset.target);

    let current = 0;

    const increment = Math.ceil(target / 80);

    function updateCounter() {

        current += increment;

        if (current >= target) {

            counter.innerText = target + "+";

            return;

        }

        counter.innerText = current + "+";

        requestAnimationFrame(updateCounter);

    }

    updateCounter();

}

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(

    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                animateCounter(entry.target);

                counterObserver.unobserve(entry.target);

            }

        });

    },

    {

        threshold:0.4

    }

);

counters.forEach(counter=>{

    counterObserver.observe(counter);

});


/* ==========================================================
   HERO PARALLAX
========================================================== */

const hero = document.querySelector(".hero");

const dashboard = document.querySelector(".dashboard");

if(hero && dashboard){

    hero.addEventListener("mousemove",(event)=>{

        const rect = hero.getBoundingClientRect();

        const x = event.clientX - rect.left;

        const y = event.clientY - rect.top;

        const moveX = (x - rect.width/2) / 40;

        const moveY = (y - rect.height/2) / 40;

        dashboard.style.transform =

            `translate(${moveX}px, ${moveY}px)`;

    });

    hero.addEventListener("mouseleave",()=>{

        dashboard.style.transform =

            "translate(0,0)";

    });

}


/* ==========================================================
   HERO GLOW
========================================================== */

const orbs = document.querySelectorAll(".gradient-orb");

window.addEventListener("mousemove",(event)=>{

    orbs.forEach((orb,index)=>{

        const speed = (index+1) * 0.01;

        const x = event.clientX * speed;

        const y = event.clientY * speed;

        orb.style.transform =

            `translate(${x}px,${y}px)`;

    });

});


/* ==========================================================
   SCROLL PROGRESS BAR
========================================================== */

const progressBar = document.createElement("div");

progressBar.className = "scroll-progress";

document.body.appendChild(progressBar);

function updateProgressBar(){

    const scrollTop = window.scrollY;

    const documentHeight =

        document.documentElement.scrollHeight -

        window.innerHeight;

    const progress =

        (scrollTop/documentHeight)*100;

    progressBar.style.width = progress + "%";

}

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
   IMAGE LAZY LOADING
========================================================== */

const lazyImages = document.querySelectorAll("img[data-src]");

if(lazyImages.length){

    const imageObserver = new IntersectionObserver(

        (entries,observer)=>{

            entries.forEach(entry=>{

                if(!entry.isIntersecting) return;

                const img = entry.target;

                img.src = img.dataset.src;

                img.onload = ()=>{

                    img.removeAttribute("data-src");

                };

                observer.unobserve(img);

            });

        },

        {

            threshold:.1

        }

    );

    lazyImages.forEach(image=>{

        imageObserver.observe(image);

    });

}


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

const cards = document.querySelectorAll(
    ".trust-card, .solution-card, .industry-card"
);

cards.forEach(card=>{

    card.addEventListener("mousemove",(event)=>{

        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;

        const y = event.clientY - rect.top;

        card.style.setProperty("--x",x+"px");

        card.style.setProperty("--y",y+"px");

    });

});

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
   PAGE LOADER
========================================================== */

window.addEventListener("load",()=>{

    document.body.classList.add("loaded");

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
   PERFORMANCE
========================================================== */

window.addEventListener(

    "pageshow",

    ()=>{

        console.log(

            "IntruderCode Loaded Successfully"

        );

    }

);

/* ==========================================================
   END OF SCRIPT.JS
========================================================== */