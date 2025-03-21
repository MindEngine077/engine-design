"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var STRAPI_URL = "http://localhost:1337";

  function fetchPageContent() {
    var updateMetaTag, response, data, page, seo;
    return regeneratorRuntime.async(function fetchPageContent$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;

            updateMetaTag = function updateMetaTag(selector, content) {
              var element = document.querySelector(selector);

              if (element) {
                element.setAttribute("content", content);
                console.log("\u2705 Meta-tag aangepast: ".concat(selector, " \u2192 ").concat(content));
              } else {
                console.warn("\u26A0\uFE0F Meta-tag niet gevonden: ".concat(selector));
              }
            };

            console.log("🚀 Ophalen van data...");
            _context.next = 5;
            return regeneratorRuntime.awrap(fetch("".concat(STRAPI_URL, "/api/pages?filters[slug][$eq]=home&populate=seo")));

          case 5:
            response = _context.sent;

            if (response.ok) {
              _context.next = 8;
              break;
            }

            throw new Error("HTTP error! Status: ".concat(response.status));

          case 8:
            _context.next = 10;
            return regeneratorRuntime.awrap(response.json());

          case 10:
            data = _context.sent;
            console.log("🌍 API Full Response:", JSON.stringify(data, null, 2));

            if (!(!data || !data.data || data.data.length === 0)) {
              _context.next = 15;
              break;
            }

            console.warn("❌ Geen pagina gevonden in API-response!");
            return _context.abrupt("return");

          case 15:
            page = data.data[0];
            seo = page.seo;
            console.log("🛠️ SEO Data:", seo);
            document.title = seo.meta_title || "Fallback Titel";
            console.log("\u2705 Titel aangepast: ".concat(document.title));
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
            _context.next = 36;
            break;

          case 33:
            _context.prev = 33;
            _context.t0 = _context["catch"](0);
            console.error("⚠️ Fout bij ophalen van data:", _context.t0);

          case 36:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 33]]);
  }

  fetchPageContent();
});