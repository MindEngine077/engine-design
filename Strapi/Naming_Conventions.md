# 📖 Naamgevingsconventies voor Strapi + Frontend Integratie

🚀 **Deze gids legt uit hoe we namen gestructureerd toewijzen voor CSS, JavaScript en Strapi.**  
Door deze conventies aan te houden, blijft de code consistent, onderhoudbaar en eenvoudig uitbreidbaar.  

---

## 📌 Structuur voor naamgeving

| **Gebruik**        | **Attribuut**  | **Voorbeeld**         | **Beschrijving** |
|-------------------|--------------|----------------------|-----------------|
| **CSS**          | `class=""`    | `.header-container`  | Voor stijlen en layout |
| **JavaScript**   | `id=""`       | `#header-script`     | Voor unieke elementen die met scripts worden gemanipuleerd |
| **Strapi Content** | `data-*`      | `data-content="header-image"` | Voor dynamische content uit Strapi |
| **Formulieren**   | `name=""`     | `name="user_email"`  | Voor inputvelden en formulieren |

---

## 🎨 **1. CSS (class)**
📌 **Gebruik `class` voor styling en layout.**  

```html
<div class="header-container">
    <p class="page-content">Welkom op de website</p>
</div>
```
🔹 **CSS voorbeeld (`style.css`)**  
```css
.header-container {
    background-color: #f0f0f0;
}

.page-content {
    font-size: 16px;
    color: #333;
}
```
✅ **Gebruik altijd `class` voor styling, zodat je CSS herbruikbaar blijft!**  

---

## 🖥️ **2. JavaScript (id)**
📌 **Gebruik `id` voor unieke elementen die worden gemanipuleerd via scripts.**  

```html
<button id="toggle-menu">Menu</button>
```
🔹 **JavaScript voorbeeld (`script.js`)**  
```js
document.querySelector("#toggle-menu").addEventListener("click", function() {
    console.log("Menu geklikt!");
});
```
✅ **Gebruik `id` alleen voor unieke elementen, niet voor algemene styling!**  

---

## 🔗 **3. Strapi Content (data-*)**
📌 **Gebruik `data-*` attributen om content uit Strapi dynamisch te koppelen.**  

```html
<img class="header-image" id="header-image" data-content="header-image" src="" alt="Header Image" />
```
🔹 **JavaScript voorbeeld om Strapi-data in te laden (`import.js`)**  
```js
const imgElement = document.querySelector("[data-content='header-image']");
imgElement.src = "https://mijnwebsite.com/uploads/header.jpg";
```
✅ **Hierdoor blijft HTML schoon en kunnen we eenvoudig data uit Strapi ophalen!**  

---

## ✍️ **4. Formulieren (name)**
📌 **Gebruik `name` attributen voor inputvelden en formulieren.**  

```html
<form action="/submit" method="POST">
    <input type="text" name="user_email" placeholder="Voer je e-mail in">
</form>
```
🔹 **JavaScript voorbeeld om formuliergegevens te lezen (`form.js`)**  
```js
const emailInput = document.querySelector("[name='user_email']");
console.log("Gebruiker vult in:", emailInput.value);
```
✅ **Gebruik `name` voor formulieren en server-side verwerking!**  

---

## ✅ **Samenvatting: Welke naamgeving gebruik je waar?**

| **Waar?**       | **Attribuut**  | **Gebruik** |
|---------------|--------------|------------|
| **CSS Styling** | `class=""`  | `.header-container` |
| **JavaScript Functie** | `id=""` | `#toggle-menu` |
| **Strapi Content** | `data-*` | `data-content="header-image"` |
| **Formulieren** | `name=""` | `name="user_email"` |

✅ **Door deze conventies te volgen, blijft je project goed gestructureerd en makkelijk uit te breiden!** 🚀