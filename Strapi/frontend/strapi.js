document.addEventListener("DOMContentLoaded", function () {
  const STRAPI_URL = "http://localhost:1337";

  async function fetchPageContent() {
    try {
      console.log("🚀 Ophalen van data...");

      const response = await fetch(`${STRAPI_URL}/api/pages?filters[slug][$eq]=home&populate=seo`);

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      console.log("🌍 API Full Response:", JSON.stringify(data, null, 2));

      if (!data || !data.data || data.data.length === 0) {
        console.warn("❌ Geen pagina gevonden in API-response!");
        return;
      }

      const page = data.data[0];
      const seo = page.seo;

      console.log("🛠️ SEO Data:", seo);

      function updateMetaTag(selector, content) {
        const element = document.querySelector(selector);
        if (element) {
          element.setAttribute("content", content);
          console.log(`✅ Meta-tag aangepast: ${selector} → ${content}`);
        } else {
          console.warn(`⚠️ Meta-tag niet gevonden: ${selector}`);
        }
      }

      document.title = seo.meta_title || "Fallback Titel";
      console.log(`✅ Titel aangepast: ${document.title}`);

      updateMetaTag("meta[name='description']", seo.meta_description);
      updateMetaTag("meta[name='robots']", seo.meta_robots);

      updateMetaTag("meta[property='og:title']", seo.og_title);
      updateMetaTag("meta[property='og:description']", seo.og_description);
      updateMetaTag("meta[property='og:url']", seo.og_url);
      updateMetaTag("meta[property='og:type']", seo.og_type);

      updateMetaTag("meta[name='twitter:card']", seo.twitter_card);
      updateMetaTag("meta[name='twitter:title']", seo.twitter_title);
      updateMetaTag("meta[name='twitter:description']", seo.twitter_description);
      updateMetaTag("meta[name='twitter:site']", seo.twitter_site);

      updateMetaTag("link[rel='canonical']", seo.canonical_URL);
    } catch (error) {
      console.error("⚠️ Fout bij ophalen van data:", error);
    }
  }

  fetchPageContent();
});
