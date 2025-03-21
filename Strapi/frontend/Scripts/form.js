// Tab switching functionality
function openForm(formId) {
  // Hide all forms
  const forms = document.querySelectorAll('.form-content');
  forms.forEach(form => form.classList.remove('active'));

  // Show the selected form
  const activeForm = document.getElementById(formId);
  if (activeForm) {
    activeForm.classList.add('active');
  }

  // Update active tab button
  const buttons = document.querySelectorAll('.tab-button');
  buttons.forEach(button => button.classList.remove('active'));
  const activeButton = document.querySelector(`[onclick="openForm('${formId}')"]`);
  activeButton.classList.add('active');
}

// Form submission prevention and handling
document.getElementById('contact-us-form').addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent the default form submission
  
  // Get form data
  const formData = new FormData(this);
  const formObject = {};
  formData.forEach((value, key) => formObject[key] = value);

  console.log(formObject); // Optionally log form data to the console

  alert("Message sent successfully! We'll get back to you shortly.");

  // Optionally reset form after submission
  this.reset();
});

// Confirm visit for showroom
function confirmVisit() {
  const visitDate = document.getElementById('visit-date').value;
  if (visitDate) {
    alert(`Your visit is confirmed for ${visitDate}. We will make time for you!`);
  } else {
    alert('Please select a date for your visit.');
  }
}

// Clear the contact form fields
function clearForm() {
  document.getElementById('contact-us-form').reset();
}


document.getElementById('find-spa-btn').addEventListener('click', function() {
  document.getElementById('spa-form').style.display = 'block';
});

function findSpa() {
  const spaType = document.getElementById('spa-type').value;
  const budget = document.getElementById('spa-budget').value;
  alert(`We found the perfect ${spaType} for your budget of €${budget}.`);
  // You can integrate a recommendation system here
}
