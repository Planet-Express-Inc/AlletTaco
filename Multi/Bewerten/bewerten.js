const params = new URLSearchParams(window.location.search);
const sellerID = params.get('seller_id');

document.addEventListener("DOMContentLoaded", () => {
// Get the DOM Elemets
  const sterneContainer = document.getElementById('sterne-container');
  const sterneInput = document.getElementById('sterne-wert');
  const sterneSpans = sterneContainer.querySelectorAll('span');
  // Get the User from URL
  if (sellerID) {
  const titelElement = document.getElementById('verkaeuferName');
  titelElement.textContent = `Verkäufer: ${sellerID}`;
  }
  // Make Stars klickable
  sterneSpans.forEach(stern => {
    stern.addEventListener('click', () => {
      const wert = parseInt(stern.getAttribute('data-wert'));
      sterneInput.value = wert;

      sterneSpans.forEach(s => {
        const sWert = parseInt(s.getAttribute('data-wert'));
        s.classList.toggle('filled', sWert <= wert);
      });
    });
  });
});

document.getElementById('bewerten-form').addEventListener('submit', function (event) {
  event.preventDefault(); 
  // Get all Elements for the Post
  const description = document.getElementById('description').value.trim();
  const sterne = parseInt(document.getElementById('sterne-wert').value, 10);
  const user_id = sessionStorage.getItem("user_id");
  const roll = sessionStorage.getItem("roll");

  const productData = {
    bewerter_id: user_id,
    bewerteter_id: sellerID,
    kommentar: description,
    rolle_des_bewerteten: roll,
    sterne: sterne
  };
  // Send review to server    
  fetch(`https://allestaco.niclas-sieveneck.de:5000/v1/user/reviews`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(productData)
  })
  .then(response => response.json())
  .then(data => {
    console.log('Gespeichert:', data);
    document.getElementById('saveModal').style.display = 'flex';
  })
  .catch(error => {
    console.error('Fehler beim Senden:', error);
  });
});
