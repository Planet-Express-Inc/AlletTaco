document.getElementById('product-form').addEventListener('submit', function (event) {
  event.preventDefault(); 

  const title = document.getElementById('title').value.trim();
  const description = document.getElementById('description').value.trim();
  const kategorie = document.getElementById('kategorie').value.trim();
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
    console.log(JSON.stringify(productData, null, 2)); 
    
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