/* ==========================================================
   INTRUDERCODE
   NAVBAR.JS
========================================================== */

"use strict";

/* ==========================================================
   SELECT ELEMENTS
========================================================== */

const header = document.querySelector(".header");

const menuBtn = document.querySelector(".menu-btn");

const navLinks = document.querySelector(".nav-links");

const navItems = document.querySelectorAll(".nav-links a");

/* ==========================================================
   SAFETY CHECK
========================================================== */

if (!header || !menuBtn || !navLinks) {

    console.warn("Navbar elements not found.");

}

/* ==========================================================
   MOBILE MENU
========================================================== */

function openMenu() {

    navLinks.classList.add("active");

    menuBtn.classList.add("active");

    document.body.classList.add("menu-open");

    menuBtn.innerHTML =
        '<i class="fa-solid fa-xmark"></i>';

}

function closeMenu() {

    navLinks.classList.remove("active");

    menuBtn.classList.remove("active");

    document.body.classList.remove("menu-open");

    menuBtn.innerHTML =
        '<i class="fa-solid fa-bars"></i>';

}

/* ==========================================================
   TOGGLE MENU
========================================================== */

menuBtn.addEventListener("click", () => {

    if (navLinks.classList.contains("active")) {

        closeMenu();

    } else {

        openMenu();

    }

});

/* ==========================================================
   CLOSE WHEN LINK CLICKED
========================================================== */

navItems.forEach(link => {

    link.addEventListener("click", () => {

        closeMenu();

    });

});

/* ==========================================================
   ESC KEY SUPPORT
========================================================== */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        closeMenu();

    }

});

/* ==========================================================
   CLICK OUTSIDE TO CLOSE
========================================================== */

document.addEventListener("click", (event) => {

    const clickedInsideNavbar =
        event.target.closest(".navbar");

    if (!clickedInsideNavbar &&
        navLinks.classList.contains("active")) {

        closeMenu();

    }

});

/* ==========================================================
   STICKY HEADER
========================================================== */

function handleScroll() {

    if (window.scrollY > 80) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}

window.addEventListener("scroll", handleScroll);


/* ==========================================================
   ACTIVE PAGE
========================================================== */

const currentPage =
    window.location.pathname.split("/").pop() || "index.html";

navItems.forEach(link => {

    const href = link.getAttribute("href");

    if (href === currentPage) {

        navItems.forEach(item =>
            item.classList.remove("active")
        );

        link.classList.add("active");

    }

});


/* ==========================================================
   SMOOTH SCROLL
========================================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (event) {

        const targetId =
            this.getAttribute("href");

        if (targetId === "#") return;

        const target =
            document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        const headerHeight =
            header.offsetHeight;

        const targetPosition =
            target.offsetTop - headerHeight;

        window.scrollTo({

            top: targetPosition,

            behavior: "smooth"

        });

    });

});


/* ==========================================================
   CLOSE MENU ON RESIZE
========================================================== */

window.addEventListener("resize", () => {

    if (window.innerWidth > 992) {

        closeMenu();

    }

});


/* ==========================================================
   SCROLL SPY
========================================================== */

const sections =
    document.querySelectorAll("section[id]");

function updateActiveSection() {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 140;

        const sectionHeight =
            section.offsetHeight;

        if (

            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight

        ) {

            currentSection = section.getAttribute("id");

        }

    });

    navItems.forEach(link => {

        const href =
            link.getAttribute("href");

        if (

            href &&
            href.startsWith("#")

        ) {

            link.classList.remove("active");

            if (href === "#" + currentSection) {

                link.classList.add("active");

            }

        }

    });

}

window.addEventListener(
    "scroll",
    updateActiveSection
);


/* ==========================================================
   INITIALIZE
========================================================== */

window.addEventListener("load", () => {

    handleScroll();

    updateActiveSection();

});

/* ==========================================================
   THEME ENGINE
========================================================== */

const themeToggle = document.getElementById("themeToggle");
const root = document.documentElement;

function setTheme(theme) {

    root.setAttribute("data-theme", theme);

    localStorage.setItem("theme", theme);

    updateLogo(theme);

    updateBrowserTheme(theme);

    themeToggle?.setAttribute(
        "aria-pressed",
        theme === "dark"
    );

    const icon = themeToggle?.querySelector("i");

    if (icon) {

        icon.className =

            theme === "dark"

                ? "fa-solid fa-sun"

                : "fa-solid fa-moon";

    }

}

/* ==========================================================
   toogle switch light / dark
========================================================== */

function getPreferredTheme() {
    const saved = localStorage.getItem("theme");
    if (saved) return saved;

    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
}

const currentTheme = getPreferredTheme();
setTheme(currentTheme);

themeToggle?.addEventListener("click", () => {
    const nextTheme =
        root.getAttribute("data-theme") === "dark"
            ? "light"
            : "dark";

    setTheme(nextTheme);
});

function updateLogo(theme){

    const logo = document.getElementById("siteLogo");

    if(!logo) return;

    logo.src =

        theme==="dark"

        ? "images/dark.png"

        : "images/light.png";

}

function updateBrowserTheme(theme){

    const meta =

        document.querySelector(

            'meta[name="theme-color"]'

        );

    if(!meta) return;

    meta.setAttribute(

        "content",

        theme==="dark"

        ? "#0F172A"

        : "#FFFFFF"

    );

}

/* ==========================================================
   END OF NAVBAR.JS
========================================================== */