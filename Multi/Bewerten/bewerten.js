const params = new URLSearchParams(window.location.search);
const sellerID = params.get('seller_id');

document.addEventListener("DOMContentLoaded", () => {

  const sterneContainer = document.getElementById('sterne-container');
  const sterneInput = document.getElementById('sterne-wert');
  const sterneSpans = sterneContainer.querySelectorAll('span');

    if (sellerID) {
    const titelElement = document.getElementById('verkaeuferName');
    titelElement.textContent = `Verkäufer: ${sellerID}`;
  }

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
  event.preventDefault(); // Verhindert echtes Absenden

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

    // Ergebnis anzeigen oder an den Server senden
    console.log(JSON.stringify(productData, null, 2)); // Für Testzwecke

    // Optional: Senden an eine REST-API
    
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
    })
    .catch(error => {
      console.error('Fehler beim Senden:', error);
    });
});
