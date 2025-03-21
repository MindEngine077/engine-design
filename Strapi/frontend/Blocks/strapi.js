const STRAPI_URL = "http://localhost:1337"; // Strapi draait hier

async function fetchPageContent() {
  try {
    console.log("🚀 Ophalen van data...");

    // Zorg dat je de juiste API-route gebruikt (pas aan als nodig)
    const response = await fetch(`${STRAPI_URL}/api/homepages?populate=*`);

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();
    console.log("🌍 API Full Response:", JSON.stringify(data, null, 2));

    if (!data || !data.data || data.data.length === 0) {
      console.warn("❌ Geen pagina gevonden in API-response!");
      return;
    }

    const page = data.data[0]; // Verwijderen van `.attributes` omdat het ontbreekt in de JSON

    console.log("✅ Page Content:", page);

    // Zet de titel correct (title in plaats van PageTitle)
    document.querySelector("h1").textContent = page.title || "Geen titel";

    // Laad de afbeelding als deze bestaat
    if (page.heroimage && page.heroimage.url) {
      document.querySelector(".hero-image").src = `${STRAPI_URL}${page.heroimage.url}`;
    } else {
      console.warn("⚠️ Geen afbeelding gevonden!");
    }
  } catch (error) {
    console.error("⚠️ Fout bij ophalen van data:", error);
  }
}
