document.addEventListener("DOMContentLoaded", function () {
    // Pagina's waar het formulier WEL moet verschijnen
    const allowedPages = ["/index.html", "/contact.html", "/showroom.html"]; // Pas deze lijst aan

    if (allowedPages.includes(window.location.pathname)) {
        // Formulier toevoegen aan de body
        let formHTML = `
            <div class="popup-form" id="myForm">
                <form action="#" method="post" class="contact-form" id="contact-form" autocomplete="off">
                    <fieldset>
                        <legend>Contact form</legend>
                        <img src="/frontend/Assets/Logo/es.png" alt="Spa logo" class="logo">
                        <label for="first-name">First name</label>
                        <input type="text" id="first-name" name="first-name" placeholder="Enter your name" required>
                        <label for="last-name">Last name</label>
                        <input type="text" id="last-name" name="last-name" placeholder="Enter your last name" required>
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="Enter your email" required>
                        <label for="textarea">Message</label>
                        <textarea id="textarea" name="message" placeholder="Your message" required></textarea>
                        <br>
                        <button type="button" class="button-action">Send</button>
                        <button type="button" class="btn cancel" onclick="closeForm()">Close</button>
                    </fieldset>
                </form>
            </div>
        `;
        document.body.insertAdjacentHTML("beforeend", formHTML);
    }
});

// Open het formulier
function openForm() {
    let form = document.getElementById("myForm");
    if (form) {
        form.style.display = "block";
        document.body.insertAdjacentHTML("beforeend", '<div class="overlay" id="overlay" onclick="closeForm()"></div>');
        document.getElementById("overlay").style.display = "block";
    }
}

// Sluit het formulier
function closeForm() {
    let form = document.getElementById("myForm");
    if (form) {
        form.style.display = "none";
        let overlay = document.getElementById("overlay");
        if (overlay) overlay.remove();
    }
}
