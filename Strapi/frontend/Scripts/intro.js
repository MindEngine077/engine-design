// Function to set the language in the URL
function setLanguage(language) {
  // Add the language as a query parameter in the URL
  const currentUrl = window.location.href.split('?')[0];  // Remove any existing query parameters
  const newUrl = `${currentUrl}?lang=${language}`; // Add the new language query

  // Store the selected language in localStorage so it persists on page reload
  localStorage.setItem('language', language);

  // Reload the page with the selected language
  window.location.href = newUrl;
}

// Check which language is set when the page is loaded
window.onload = function() {
  // Check if there is a language parameter in the URL
  const urlParams = new URLSearchParams(window.location.search);
  const language = urlParams.get('lang') || localStorage.getItem('language') || 'en'; // Default to 'en' if no language is selected

  // Apply the selected language on the page
  setLanguageOnPage(language);
  
  // Show the intro
  showIntro();
}

// Function to apply the language to the page (e.g., through content or an API)
function setLanguageOnPage(language) {
  console.log("The selected language is: " + language);
  // You can implement additional logic here to load language files or replace text
}

// Function to show the intro
function showIntro() {
  const intro = document.getElementById('intro');
  if (intro) {
    intro.classList.add('active'); // Add the 'active' class to make the intro visible
  }
}

// Function to hide the intro after language selection
function hideIntro() {
  const intro = document.getElementById('intro');
  if (intro) {
    intro.classList.remove('active');  // Remove the active class to hide the intro
  }
}

// Add event listeners to hide the intro after selecting a language
document.querySelectorAll('.language-card').forEach(button => {
  button.addEventListener('click', () => {
    hideIntro(); // Hide the intro when a language is selected
  });
});


// Functie om de geselecteerde taal op te slaan
function setLanguage(language) {
  const currentUrl = window.location.href.split('?')[0]; // Verwijder oude queryparameters
  const newUrl = `${currentUrl}?lang=${language}`; // Voeg de nieuwe taal query toe

  // Bewaar de gekozen taal in localStorage zodat deze persistent blijft bij opnieuw laden
  localStorage.setItem('language', language);

  // Laad de pagina opnieuw met de geselecteerde taal
  window.location.href = newUrl;
}
