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

    console.warn(
        "Navbar elements not found. Navigation features disabled."
    );

}

/* ==========================================================
   MOBILE MENU
========================================================== */

function openMenu() {

    if (!navLinks || !menuBtn) return;

    navLinks.classList.add("active");

    menuBtn.classList.add("active");

    document.body.classList.add("menu-open");

    menuBtn.setAttribute(
        "aria-expanded",
        "true"
    );

    menuBtn.setAttribute(
        "aria-label",
        "Close navigation"
    );

    menuBtn.innerHTML =
        '<i class="fa-solid fa-xmark" aria-hidden="true"></i>';

}


function closeMenu() {

    if (!navLinks || !menuBtn) return;

    navLinks.classList.remove("active");

    menuBtn.classList.remove("active");

    document.body.classList.remove("menu-open");

    menuBtn.setAttribute(
        "aria-expanded",
        "false"
    );

    menuBtn.setAttribute(
        "aria-label",
        "Open navigation"
    );

    menuBtn.innerHTML =
        '<i class="fa-solid fa-bars" aria-hidden="true"></i>';

}

/* ==========================================================
   TOGGLE MENU
========================================================== */

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

        if (navLinks.classList.contains("active")) {

            closeMenu();

        } else {

            openMenu();

        }

    });

}

/* ==========================================================
   CLOSE WHEN LINK CLICKED
========================================================== */

    navItems.forEach(link => {

        link.addEventListener("click", () => {

            if (menuBtn && navLinks) {
                closeMenu();
            }

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

    if (!navLinks) return;

    const clickedInsideNavbar =
        event.target.closest(".navbar");

    if (
        !clickedInsideNavbar &&
        navLinks.classList.contains("active")
    ) {

        closeMenu();

    }

});

/* ==========================================================
   STICKY HEADER
========================================================== */

function handleScroll() {

    if (!header) return;

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

    const path =
        window.location.pathname
            .replace(/\/+$/, "");

    const currentPage =
        path === "" || path === "/"
            ? "index.html"
            : path.split("/").pop();

    navItems.forEach(link => {

        const href =
            link.getAttribute("href");

        if (href === currentPage) {

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
        header
            ? header.offsetHeight
            : 0;

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
   INITIALIZE
========================================================== */

window.addEventListener("load", () => {

    handleScroll();

});

/* ==========================================================
   THEME ENGINE
========================================================== */

const themeToggle = document.getElementById("themeToggle");
const root = document.documentElement;

function setTheme(theme) {

    if (
        theme !== "light" &&
        theme !== "dark"
    ) {

        theme = "light";

    }


    root.setAttribute(
        "data-theme",
        theme
    );

    localStorage.setItem(
        "theme",
        theme
    );

    updateLogo(theme);

    updateBrowserTheme(theme);

    themeToggle?.setAttribute(
        "aria-pressed",
        theme === "dark"
    );


    const icon =
        themeToggle?.querySelector("i");


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

    const saved =
        localStorage.getItem("theme");


    if (
        saved === "light" ||
        saved === "dark"
    ) {

        return saved;

    }


    return window.matchMedia(
        "(prefers-color-scheme: dark)"
    ).matches
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

function updateBrowserTheme(theme) {

    const meta =
        document.querySelector(
            'meta[name="theme-color"]'
        );

    if (!meta) return;


    const root =
        document.documentElement;


    const styles =
        getComputedStyle(root);


    const background =
        styles
            .getPropertyValue("--background")
            .trim();


    const primary =
        styles
            .getPropertyValue("--primary")
            .trim();


    meta.setAttribute(
        "content",
        theme === "dark"
            ? background
            : primary
    );

}

/* ==========================================================
   END OF NAVBAR.JS
========================================================== */