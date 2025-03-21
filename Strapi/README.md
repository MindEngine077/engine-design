# 📖 Strapi + Frontend Integratie (Dynamische Header met Video/Afbeelding)

🚀 **Deze gids legt stap voor stap uit hoe je Strapi koppelt aan je frontend en een dynamische header inlaadt met een video of afbeelding.**  

---

## 📌 Inhoudsopgave
1. **Strapi instellen**
2. **Content-types aanmaken in Strapi**
3. **Data invoeren in Strapi**
4. **Frontend structuur instellen**
5. **Header dynamisch inladen**
6. **Strapi-data ophalen in JavaScript**
7. **Testen en Debuggen**

---

## 1️⃣ Strapi instellen
### 📌 Installatie & Starten
Als je Strapi nog niet hebt geïnstalleerd, installeer het dan via npm of yarn:  
```sh
npx create-strapi-app backend --quickstart
```
🔹 **Navigeer naar de Strapi-map en start Strapi:**  
```sh
cd backend
yarn develop   # Of gebruik: npm run develop
```
✅ Strapi draait nu op **http://localhost:1337**

---

## 2️⃣ Content-types aanmaken in Strapi
📌 **Ga naar Strapi Admin (`http://localhost:1337/admin`) en volg deze stappen:**  
1. **Ga naar `Content-Type Builder`**  
2. **Klik op "Create new collection type"** en noem het `pages`
3. **Voeg de volgende velden toe:**
   - **`title` (Text, required)** → Pagina titel
   - **`slug` (UID, gebaseerd op `title`)** → URL-slug van de pagina
   - **`header_type` (Enumeration: `image`, `video`)** → Keuze tussen afbeelding of video
   - **`header_image` (Media, single)** → Afbeelding voor de header
   - **`header_video` (Media, single)** → Video voor de header
4. **Klik op "Save" en herstart Strapi (indien nodig)**  
   ```sh
   yarn develop   # of npm run develop
   ```

---

## 3️⃣ Data invoeren in Strapi
📌 **Ga naar `Content Manager` → `Pages` en voeg een nieuwe pagina toe:**  
- **Titel:** `Home`  
- **Slug:** `home`  
- **Header Type:** `image` of `video`  
- **Header Afbeelding:** (upload een afbeelding als `header_type = image`)  
- **Header Video:** (upload een video als `header_type = video`)  
- **Publiceer de pagina**  

✅ **API Testen:**  
Ga naar de volgende URL en controleer de JSON-output:  
```sh
http://localhost:1337/api/pages?filters[slug][$eq]=home&populate=header_image,header_video,header_type
```

---

## 4️⃣ Frontend Structuur instellen
📌 **Mappenstructuur voorbeeld:**
```
/frontend
 ├── /Assets
 │   ├── /CSS
 │   │   ├── style.css
 │   ├── /Logo
 │   │   ├── logo.png
 │   ├── /Video
 │   │   ├── default.mp4
 ├── /Blocks
 │   ├── header.html
 ├── /Scripts
 │   ├── import.js
 ├── home.html
```

### 📌 `header.html` (de dynamische header)
```html
<div class="header-container" id="header-script" data-content="header">
    <video autoplay loop muted class="header-video" id="header-video" data-content="header-video">
        <source src="" type="video/mp4">
    </video>
    <img class="header-image" id="header-image" src="" alt="Header Image" data-content="header-image">
</div>

<header class="header">
    <nav>
        <img src="/frontend/Assets/Logo/logo.png" class="header-logo" alt="Website Logo">
        <ul>
            <li><a href="/frontend/index.html">Home</a></li>
            <li><a href="/frontend/range.html">The Range</a></li>
            <li><a href="/frontend/models.html">All Models</a></li>
            <li><a href="/frontend/about-us.html">About us</a></li>
            <li><a href="/frontend/contact.html">Contact</a></li>
        </ul>
    </nav>
    <hr class="divider" />
</header>
```

---

## 5️⃣ Header dynamisch inladen
📌 **We injecteren `header.html` op alle pagina’s met `import.js`.**  

🔹 **Maak of open `/frontend/Scripts/import.js` en voeg deze code toe:**
```js
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

        const videoElement = document.querySelector("[data-content='header-video']");
        const imgElement = document.querySelector("[data-content='header-image']");

        if (headerType === "video" && headerVideo) {
            videoElement.querySelector("source").src = headerVideo;
            videoElement.load();
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
```
✅ **Je header wordt nu dynamisch ingeladen vanuit Strapi! 🚀**



postgresql://postgres:[YOUR-PASSWORD]@db.bozcsrgnfipbmlnbrgvj.supabase.co:5432/postgres