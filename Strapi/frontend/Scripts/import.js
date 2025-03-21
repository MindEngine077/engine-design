document.addEventListener("DOMContentLoaded", function () {
  fetch("/frontend/Blocks/header.html")
    .then(response => response.text())
    .then(data => {
      document.body.insertAdjacentHTML("afterbegin", data);
      console.log("✅ Header geladen, nu media ophalen...");
      setTimeout(loadHeaderContent, 100);
    })
    .catch(error => console.error("⚠️ Fout bij het laden van de header:", error));
});

async function loadHeaderContent() {
  const STRAPI_URL = "http://localhost:1337";

  try {
    console.log("🚀 Ophalen van header-content...");

    const response = await fetch(`${STRAPI_URL}/api/pages?filters[slug][$eq]=home&populate=header_image,header_video,header_type`);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();
    console.log("🌍 Header API Response:", JSON.stringify(data, null, 2));

    if (!data || !data.data || data.data.length === 0) {
      console.warn("❌ Geen header-content gevonden!");
      return;
    }

    const page = data.data[0];
    const headerType = page.header_type;
    const headerImage = page.header_image?.url ? `${STRAPI_URL}${page.header_image.url}` : null;
    const headerVideo = page.header_video?.url ? `${STRAPI_URL}${page.header_video.url}` : null;

    console.log(`🛠️ Header Type: ${headerType}`);

    // Selecteer elementen met data-content attribuut
    const videoElement = document.querySelector("[data-content='header-video']");
    const imgElement = document.querySelector("[data-content='header-image']");

    if (headerType === "video" && headerVideo) {
      videoElement.querySelector("source").src = headerVideo;
      videoElement.load(); // Video opnieuw laden met nieuwe bron
      videoElement.style.display = "block";
      imgElement.style.display = "none";
      console.log(`🎥 Video geladen: ${headerVideo}`);
    } else if (headerType === "image" && headerImage) {
      imgElement.src = headerImage;
      imgElement.style.display = "block";
      videoElement.style.display = "none";
      console.log(`🖼️ Afbeelding geladen: ${headerImage}`);
    } else {
      console.warn("⚠️ Geen geldige header-media gevonden!");
    }
  } catch (error) {
    console.error("⚠️ Fout bij ophalen van header-content:", error);
  }
}
