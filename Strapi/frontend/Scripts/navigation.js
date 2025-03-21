document.addEventListener("DOMContentLoaded", function () {
    const tabLinks = document.querySelectorAll(".tablink");

    tabLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();

            const pageName = this.getAttribute("data-page");
            const modelId = this.getAttribute("data-model");

            openPage(pageName, this, modelId);
        });
    });
});
