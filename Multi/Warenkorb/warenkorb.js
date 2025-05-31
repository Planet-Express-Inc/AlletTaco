let productsData = [];

document.addEventListener("DOMContentLoaded", () => {    /*laden der Daten nach laden der Website */
  const list = document.getElementById('product-card');
  const totalPriceElement = document.getElementById('total-price');

    function updateTotalPrice() {
    let total = 0;
    // Alle Produkte im DOM durchgehen
    const products = list.querySelectorAll('.product');
    products.forEach(product => {
      // Preis pro Stück
      const priceText = product.querySelector('.product-price').textContent;
      // Preis extrahieren (z.B. "Preis: 12.34 €")
      const priceMatch = priceText.match(/Preis:\s*([\d,.]+)\s*€/);
        let price = parseFloat(priceMatch[1].replace(',', '.'));
        total += price;
    });
    // Ausgabe mit 2 Nachkommastellen, deutsche Komma-Darstellung
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


            /*unten anhängen */
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


function bewerten() {
  const selected = document.querySelector('input[name="verkaeufer"]:checked');
  if (selected) {
    const verkaeuferId = selected.value;
    
    window.location.href = `/Multi//Bewerten/bewerten.html?id=${verkaeuferId}`;
  } else {
    alert("Bitte wählen Sie einen Verkäufer aus.");
  }
}

function buy() {
  const modal = document.getElementById("review-modal");
  const auswahlContainer = document.getElementById("verkaeufer-auswahl");

  // Alte Auswahl löschen
  auswahlContainer.innerHTML = "";

  // Eindeutige Verkäufer extrahieren (per Map)
  const uniqueSellers = new Map();

  productsData.forEach(product => {
    if (!uniqueSellers.has(product.sellerid)) {
      uniqueSellers.set(product.sellerid, product.seller);
    }
  });

  // Dynamisch Radio-Buttons erzeugen
  uniqueSellers.forEach((seller, id) => {
    const label = document.createElement("label");
    label.innerHTML = `
      <input type="radio" name="verkaeufer" value="${id}">
      ${seller}
    `;
    auswahlContainer.appendChild(label);
  });

  // Modal anzeigen
  modal.style.display = "block";
}

function startseite() {
  window.location.href = "/Multi/Kaeufer/kaeufer.html";
}

