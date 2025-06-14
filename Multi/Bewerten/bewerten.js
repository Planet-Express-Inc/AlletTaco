document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const sellerName = params.get('name');
  const sterneContainer = document.getElementById('sterne-container');
  const sterneInput = document.getElementById('sterne-wert');
  const sterneSpans = sterneContainer.querySelectorAll('span');

    if (sellerName) {
    const titelElement = document.getElementById('verkaeuferName');
    titelElement.textContent = `Verkäufer: ${sellerName}`;
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

  const title = document.getElementById('title').value.trim();
  const description = document.getElementById('description').value.trim();
  const sterne = parseInt(document.getElementById('sterne-wert').value, 10);


    const productData = {
      title: title,
      description: description,
      sterne: sterne
    };

    // Ergebnis anzeigen oder an den Server senden
    console.log(JSON.stringify(productData, null, 2)); // Für Testzwecke

    // Optional: Senden an eine REST-API
    
    fetch('https://dein-server.de/api/produkte', {
      method: 'POST',
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
function toggleDropdown() {
  document.getElementById("dropdown-menu").classList.toggle("show");
}

// Klick außerhalb schließt Dropdown
window.addEventListener("click", function(event) {
  if (!event.target.closest('.dropdown')) {
    document.getElementById("dropdown-menu").classList.remove("show");
  }
});