let productsData = [];

document.addEventListener("DOMContentLoaded", () => {    /*laden der Daten nach laden der Website */
  const list = document.getElementById('product-card');
  const totalPriceElement = document.getElementById('total-price');

function updateTotalPrice() {
  let total = 0;
  // Holt sich eine Liste aller angezeigten Produkte
  const products = list.querySelectorAll('.product');
  products.forEach(product => {
    // Liest Preis pros Stück aus
    const priceText = product.querySelector('.product-price').textContent;
    // Wandelt Preis in Zahl um
    const priceMatch = priceText.match(/Preis:\s*([\d,.]+)\s*€/); // Sucht nach Preis Zahl € 
      let price = parseFloat(priceMatch[1].replace(',', '.')); // In Zahl umwandeln
      total += price;
  });
  // Ausgabe Gesamtpreis mit 2 Nachkommastelen
  totalPriceElement.textContent = total.toFixed(2).replace('.', ',') + ' €';
}

function loadArticles() {
  fetch(`https://allestaco.niclas-sieveneck.de:5000/v1/user/cart`, {
    method: 'GET',
    credentials: 'include'
  })
  .then(response => response.json())
  .then(async data => {  // <-- ACHTUNG: async hier
    productsData = data;
    console.log(data);
    const list = document.getElementById('product-card');

    for (const articels of data) {
      console.log(articels.artikel_id);
      const productRes = await fetch(`https://allestaco.niclas-sieveneck.de:5000/v1/article/${articels.artikel_id}`);
      const productArray = await productRes.json();
      const product = productArray[0]; 

      const item = document.createElement('div');
      item.className = 'product';

      const basePrice = parseFloat(articels.price);

      item.innerHTML = `
        <img src="https://allestaco.niclas-sieveneck.de:5000/v1/article/picture/${product.artikel_id}" alt="${product.titel}">
        <div class="product-info">
          <h3 class="product-title">${product.titel}</h3>
          <p class="product-description">${product.beschreibung}</p>
          <p class="product-price" id="price-${product.artikel_id}">Preis: ${(parseFloat(product.preis)).toFixed(2).replace('.', ',')} €</p>

          <div class="product-actions">
          <label for="quantity-${product.artikel_id}">Menge:</label>
          <select id="quantity-${product.artikel_id}" class="quantity-select">
              ${[...Array(product.amount)].map((_, i) => `<option value="${i + 1}">${i + 1}</option>`).join("")}
          </select>

          <button onclick="deleteArticel(${product.artikel_id})" class="delete-button">Löschen</button>
          </div>
        </div>
      `;

      const quantitySelect = item.querySelector(`#quantity-${product.artikel_id}`);
      const priceElement = item.querySelector(`#price-${product.artikel_id}`);

      quantitySelect.addEventListener('change', () => {
        const selectedQuantity = parseInt(quantitySelect.value, 10);
        const totalPrice = (basePrice * selectedQuantity).toFixed(2);
        priceElement.textContent = `Preis: ${totalPrice} €`;

        updateTotalPrice();
      });

      list.appendChild(item);
    }

    updateTotalPrice();
  })
  .catch(err => {
    console.error('Fehler beim Laden der Produkte:', err);
  });
}
loadArticles();
});
https://allestaco.niclas-sieveneck.de:5000/v1/user/cart/${id}

// Löscht Artikel aus Warenkorb
function deleteArticel (id) {
  fetch(`https://allestaco.niclas-sieveneck.de:5000/v1/user/cart/${id}`, {
    method: 'DELETE',
    credentials: 'include'
  })
  .then(response => {
    if (response.status === 204) {
      console.log('Erfolgreich gelöscht (204)');
      setTimeout(() => {
        location.reload();
      }, 1000);
    } else {
      console.error('Fehler beim Löschen: HTTP-Status', response.status);
      alert("Löschen fehlgeschlagen. Fehlercode: " + response.status);
    }
  })
  .catch(error => {
    console.error('Fehler beim Senden:', error);
    alert("Ein technischer Fehler ist aufgetreten.");
  });
}

// Zeigt Fenster nach Kauf an
function buy() {
  const modal = document.getElementById("review-modal");
  modal.style.display = "block";
}

function startseite() {
  window.location.href = "/Multi/Kaeufer/kaeufer.html";
}

function bestellhistorie() {
  window.location.href = "/Multi/orderHistory/orderHistory.html";
}

