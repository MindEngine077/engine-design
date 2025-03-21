document.addEventListener("DOMContentLoaded", function () {
    console.log("Initializing main.js...");

    // 1️⃣ Inject <head> content first
    injectBlock("/frontend/Blocks/head.html", "head", "beforeend", function () {
        console.log("Head loaded, injecting meta and CSS...");
        injectMetaAndCSS();
    });

    // 2️⃣ Inject header and footer
    injectBlock("/frontend/Blocks/header.html", "body", "afterbegin", function () {
        console.log("Header loaded, injecting global assets...");
        injectGlobalAssets();
    });

    injectBlock("/frontend/Blocks/footer.html", "body", "beforeend", function () {
        console.log("Footer loaded.");
    });

    window.addEventListener("scroll", function () {
      const header = document.querySelector("header");
      if (window.scrollY > 0) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
    });


    // 3️⃣ Inject contact form (on all pages)
    injectBlock("/frontend/Blocks/contact-form.html", "body", "beforeend", function () {
        console.log("Contact form loaded.");
    });

    // 4️⃣ Inject intro (ONLY on index.html and first visit)
    if (window.location.pathname === "/index.html" && !localStorage.getItem("languageSelected")) {
        console.log("Injecting intro (first visit)...");
        injectBlock("/frontend/Blocks/intro.html", "body", "afterbegin", function () {
            loadScript("/frontend/Scripts/intro.js");
        });
    }

    // 5️⃣ Inject find-spa (ONLY on models and range pages)
    const spaPages = ["/models.html", "/range.html"];
    if (spaPages.includes(window.location.pathname)) {
        console.log("Injecting find-spa...");
        injectBlock("/frontend/Blocks/find-spa.html", "body", "beforeend");
    }

    // 6️⃣ Inject slideshow (ONLY on about-us page)
    if (window.location.pathname === "/about-us.html") {
        console.log("Injecting slideshow...");
        injectBlock("/frontend/Blocks/slideshow.html", "body", "beforeend", function () {
            loadScript("/frontend/Scripts/slideshow.js");
        });
    }

    // 7️⃣ Initialize everything else
    setTimeout(() => {
        console.log("Initializing additional features...");
        handleHeroVideo();
        initTabNavigation();
    }, 500);
});

// 1️⃣ Function to dynamically inject HTML blocks
function injectBlock(filePath, target, position, callback = null) {
    fetch(filePath)
        .then(response => {
            if (!response.ok) throw new Error(`Failed to load ${filePath}`);
            return response.text();
        })
        .then(data => {
            document.querySelector(target).insertAdjacentHTML(position, data);
            console.log(`Loaded: ${filePath}`);
            if (callback) callback(); // Execute callback if provided
        })
        .catch(error => console.error(`Error loading ${filePath}:`, error));
}

// 2️⃣ Load external JavaScript files dynamically
function loadScript(scriptPath) {
    let script = document.createElement("script");
    script.src = scriptPath;
    script.defer = true;
    document.head.appendChild(script);
    console.log(`Loaded script: ${scriptPath}`);
}

// 3️⃣ Inject meta tags, CSS, and JS globally
function injectMetaAndCSS() {
    const head = document.head;

    // Meta Tags
    const metaTags = `
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta lang="en">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="Earth Spa is a wellness center that offers a variety of services to help you relax and rejuvenate.">
        <meta name="keywords" content="spa, wellness, relaxation, massage, therapy, health, beauty">
        <meta name="author" content="Team Mind Engine">
        <meta name="robots" content="index, follow">
        <link rel="icon" href="/frontend/Public/favicon.png" type="image/x-icon">
        <title>Earth Spas</title>
        <link rel="stylesheet" href="https://kit-free.fontawesome.com/releases/latest/css/free.min.css">
    `;
    head.insertAdjacentHTML("beforeend", metaTags);
}

// 4️⃣ Inject all CSS and JS files
function injectGlobalAssets() {
    const head = document.head;

    // CSS Files (All styles)
    const cssFiles = [
        "/frontend/Styles/main.css",
        "/frontend/Styles/header.css",
        "/frontend/Styles/footer.css",
        "/frontend/Styles/models.css",
        "/frontend/Styles/range.css",
        "/frontend/Styles/vars.css",
        "/frontend/Styles/parallax.css",
        "/frontend/Styles/contact.css",
        "/frontend/Styles/popup-form.css",
        "/frontend/Styles/forms.css",
        "/frontend/Styles/navigation.css"
    ];
    cssFiles.forEach(css => {
        let link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = css;
        head.appendChild(link);
        console.log(`Loaded CSS: ${css}`);
    });

    // JavaScript Files (All scripts)
    const jsFiles = [
        "/frontend/Scripts/models.js",
        "/frontend/Scripts/form.js",
        "/frontend/Scripts/navigation.js",
        "/frontend/Scripts/contactPopup.js",
        "/frontend/Scripts/slideshow.js"
    ];
    jsFiles.forEach(js => {
        loadScript(js);
    });
}

// 5️⃣ Handle hero video logic
function handleHeroVideo() {
    const headerVideoContainer = document.getElementById("header-video-container");
    const heroVideoContainer = document.getElementById("hero-video-container");

    if (window.location.pathname === "/index.html") {
        console.log("Index detected: Switching to hero video.");
        if (headerVideoContainer) headerVideoContainer.style.display = "none";
        if (heroVideoContainer) {
            heroVideoContainer.innerHTML = `
                <section class="hero">
                    <video autoplay loop muted class="hero-video">
                        <source src="/frontend/Assets/Video/Kouri-Corner.mp4" type="video/mp4" />
                    </video>
                </section>
            `;
        }
    } else {
        console.log("Other page detected: Using calm header video.");
        if (headerVideoContainer) {
            headerVideoContainer.innerHTML = `
                <video autoplay loop muted class="header-video">
                    <source src="/frontend/Assets/Video/Leafs.mp4" type="video/mp4" />
                </video>
            `;
        }
    }
}

// 6️⃣ Tab Navigation Fix
function initTabNavigation() {
    const tabs = document.querySelectorAll(".tab-button");
    const tabContents = document.querySelectorAll(".tabcontent");

    if (tabs.length > 0 && tabContents.length > 0) {
        console.log("Initializing tab navigation...");
        tabs.forEach(tab => {
            tab.addEventListener("click", function () {
                const targetTab = this.getAttribute("data-target");
                tabContents.forEach(content => content.style.display = "none");
                tabs.forEach(tab => tab.classList.remove("active"));
                document.getElementById(targetTab).style.display = "block";
                this.classList.add("active");
            });
        });
        tabs[0].click();
    }
}

// 7️⃣ Open & Close Contact Form
function openForm() {
    let form = document.getElementById("myForm");
    if (form) {
        form.style.display = "block";
        document.body.insertAdjacentHTML("beforeend", '<div class="overlay" id="overlay" onclick="closeForm()"></div>');
        document.getElementById("overlay").style.display = "block";
    }
}

function closeForm() {
    let form = document.getElementById("myForm");
    if (form) {
        form.style.display = "none";
        let overlay = document.getElementById("overlay");
        if (overlay) overlay.remove();
    }
}
