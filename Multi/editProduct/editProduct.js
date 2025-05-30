let articelId = 0;

document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  articelId = parseInt(params.get('articelid'), 10);
  if (isNaN(articelId)) return;

  try {
    const productRes = await fetch('/editArticel.json');
    const products = await productRes.json();
    const product = products.find(p => p.id === articelId);
    if (!product) return;

    // Titel und Beschreibung
    document.getElementById('product-title').value = product.title;
    document.getElementById('product-description').textContent = product.description;
    document.getElementById('product-price').value = product.price;
    document.getElementById('product-amount').value = product.amount;
    const imageBase64 = product.image;
    document.getElementById('preview').src = product.image;
  } catch (error) {
    console.error("Fehler beim Laden:", error);
  }
});

// Für den Upload der neuen Eigenschaften
document.getElementById('product-form').addEventListener('submit', function (event) {
  event.preventDefault(); // Verhindert echtes Absenden
  const title = document.getElementById('product-title').value.trim();
  const description = document.getElementById('product-description').value.trim();
  const price = parseFloat(document.getElementById('product-price').value);
  const amount = parseFloat(document.getElementById('product-amount').value);
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
      id: articelId,
      title: title,
      description: description,
      price: price,
      amount: amount,
      image: base64Image  // Das Bild als Base64-String
    };

    // Ergebnis anzeigen oder an den Server senden
    console.log(JSON.stringify(productData, null, 2)); // Für Testzwecke

    // Optional: Senden an eine REST-API
    /*
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
    */
  };

  reader.readAsDataURL(file); // Bild als Base64 einlesen
});

// Bild vorschau
document.getElementById('image-upload').addEventListener('change', function (event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = function (e) {
    const base64Image = e.target.result; // z.B. "data:image/jpeg;base64,..."
    document.getElementById('preview').src = base64Image;
  };

  reader.readAsDataURL(file);
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