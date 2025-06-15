let articelId = 0;

document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  articelId = parseInt(params.get('articelid'), 10);
  if (isNaN(articelId)) return;

  try {
    const productRes = await fetch(`https://allestaco.niclas-sieveneck.de:5000/v1/article/${articelId}`);
    const productArray = await productRes.json();
    const product = productArray[0];  

    // Titel und Beschreibung
    document.getElementById('product-title').value = product.titel;
    document.getElementById('product-description').textContent = product.beschreibung;
    document.getElementById('product-kategorie').value = product.kategorie;
    document.getElementById('product-price').value = product.preis;
    document.getElementById('product-amount').value = product.bestand;
    document.getElementById('preview').src = `https://allestaco.niclas-sieveneck.de:5000/v1/article/picture/${product.artikel_id}`
  } catch (error) {
    console.error("Fehler beim Laden:", error);
  }
});

// Für den Upload der neuen Eigenschaften
document.getElementById('product-form').addEventListener('submit', function (event) {
  event.preventDefault(); // Verhindert echtes Absenden
  const title = document.getElementById('product-title').value.trim();
  const description = document.getElementById('product-description').value.trim();
  const kategorie = document.getElementById('product-kategorie').value.trim();
  const price = parseFloat(document.getElementById('product-price').value);
  const amount = parseFloat(document.getElementById('product-amount').value);
  const imageInput = document.getElementById('image-upload');
  const file = imageInput.files[0];

  if (!file) {
    alert("Bitte ein neues Bild auswählen.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    const base64Image = reader.result
    const userId = parseInt(sessionStorage.getItem('user_id'), 10);

    const productData = {
      titel: title, 
      verkaeufer_id: userId, 
      beschreibung: description, 
      preis: price, 
      bild: base64Image,  
      status: "verfügbar", 
      bestand: amount, 
      kategorie: kategorie 

    };

    // Löscht das Produkt    
    fetch(`https://allestaco.niclas-sieveneck.de:5000/v1/article/${articelId}`, {
      method: 'DELETE',
      credentials: 'include'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Fehler beim Löschen');
      }
      return response.text();
    })
    .then(data => {
      console.log('Erfolgreich gelöscht:', data);
    })
    .catch(error => {
      console.error('Fehler:', error);
    });

    // Fügt das neue Produkt hinzu
    fetch(`https://allestaco.niclas-sieveneck.de:5000/v1/article`, {
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

