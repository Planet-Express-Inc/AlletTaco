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

function loadArticles () {
  fetch('warenkorb.json')  /*URL der API*/
  .then(response => response.json())
  .then(data => {
    productsData = data;
    const list = document.getElementById('product-card');

    /*auslesen der JSON*/
    data.forEach(product => {
    const item = document.createElement('div');
    item.className = 'product';

    const basePrice = parseFloat(product.price); // ← WICHTIG  
        

    /*hinzufügen der HTML Elemente in die vorhandene Website*/
    item.innerHTML = `
        <img src="${product.image_url}" alt="${product.title}">

        <div class="product-info">
          <h3 class="product-title">${product.title}</h3>
          <p class="product-description">${product.description}</p>
          <p class="product-price" id="price-${product.id}">Preis: ${(parseFloat(product.price)).toFixed(2).replace('.', ',')} €</p>

          <div class="product-actions">
          <label for="quantity-${product.id}">Menge:</label>
          <select id="quantity-${product.id}" class="quantity-select">
              ${[...Array(product.amount)].map((_, i) => `<option value="${i + 1}">${i + 1}</option>`).join("")}
          </select>

          <button onclick="deleteArticel(${product.id})" class="delete-button">Löschen</button>
          </div>
        </div>
      `;

      // Listner für den dynamischen Preis
      const quantitySelect = item.querySelector(`#quantity-${product.id}`);
      const priceElement = item.querySelector(`#price-${product.id}`);

      quantitySelect.addEventListener('change', () => {
        const selectedQuantity = parseInt(quantitySelect.value, 10);
        const totalPrice = (basePrice * selectedQuantity).toFixed(2);
        priceElement.textContent = `Preis: ${totalPrice} €`;

      updateTotalPrice();
      });


    // unten anhängen 
    list.appendChild(item);
    });
    
    updateTotalPrice();
  })
  .catch(err => {
      console.error('Fehler beim Laden der Produkte:', err);
  });
}
loadArticles();
});

// Löscht Artikel aus Warenkorb
function deleteArticel (id){
const userId = sessionStorage.getItem('roll');
const productData = {
    warenkorbid: userId,
    articelId:id
  };
  console.log(productData)
  
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

