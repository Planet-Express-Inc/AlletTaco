document.getElementById('product-form').addEventListener('submit', function (event) {
  //event.preventDefault(); // Verhindert echtes Absenden

  const title = document.getElementById('title').value.trim();
  const description = document.getElementById('description').value.trim();
  const price = parseFloat(document.getElementById('price').value);
  const amount = parseFloat(document.getElementById('amount').value);
  const imageInput = document.getElementById('image-upload');
  const file = imageInput.files[0];

  if (!file) {
    alert("Bitte ein Bild auswählen.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    const base64Image = reader.result

    const productData = {
      titel: title, 
      verkaeufer_id: 12, 
      beschreibung: description, 
      preis: price, 
      bild: base64Image,  
      status: "verfügbar", 
      bestand: amount, 
      kategorie: "Taco" 

    };

    // Ergebnis anzeigen oder an den Server senden
    console.log(JSON.stringify(productData, null, 2)); // Für Testzwecke

    // Optional: Senden an eine REST-API
    
    fetch('https://allestaco.niclas-sieveneck.de:5000/v1/article/add', {
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
    
  };

  reader.readAsDataURL(file); // Bild als Base64 einlesen
});





document.getElementById('image-upload').addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const preview = document.getElementById('preview');
      preview.src = e.target.result;
      preview.style.display = 'block';
    };
    reader.readAsDataURL(file);
  }
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