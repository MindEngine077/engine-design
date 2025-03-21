// Functie om de juiste tab en model in te laden
function openPage(pageName, elmnt, modelId) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");

    // Verberg alle tabinhoud
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Reset de border-bottom van alle tablinks
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].style.borderBottom = "";  // Reset border-bottom
    }

    // Toon de inhoud van de huidige tab
    document.getElementById(pageName).style.display = "block";
    elmnt.style.borderBottom = "2px solid var(--primary-300)";  // Pas de border-bottom toe op de actieve tab

    // Laad de modelinhoud in de tab
    loadModelContent(modelId, pageName);
}

// Laad de modelinhoud dynamisch
function loadModelContent(modelId, pageName) {
    const contentContainer = document.getElementById(pageName);

    // Controleer of de inhoud al is geladen om meerdere verzoeken te vermijden
    if (contentContainer.innerHTML.trim() === '') {
        const url = `Models/${modelId}.html`;  // Correcte pad naar de models folder
        console.log(`Laad inhoud vanaf: ${url}`);  // Log de URL voor debuggen

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Kon de modelinhoud niet laden vanaf ${url}. Status: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                contentContainer.innerHTML = data; // Injecteer de modelinhoud in de tabinhoud
            })
            .catch(error => {
                console.error('Fout bij het laden van de modelinhoud:', error);
                contentContainer.innerHTML = `<p>Sorry, er was een fout bij het laden van de modelinhoud. Fout: ${error.message}</p>`;
            });
    }
}

// Standaard tab klikken om de eerste tab (model1) te tonen bij het laden van de pagina
document.addEventListener('DOMContentLoaded', function() {
    // Zoek de tab die standaard moet worden geopend (id="defaultOpen")
    const defaultTab = document.getElementById("defaultOpen");

    // Als de standaardtab bestaat, simuleer dan een klik
    if (defaultTab) {
        defaultTab.click();  // Trigger de klik voor de standaardtab
    }
});
