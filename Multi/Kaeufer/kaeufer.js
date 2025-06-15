import { BASE_URL } from '../config.js';


document.addEventListener("DOMContentLoaded", () => {
  // Get search query form URL
  const params = new URLSearchParams(window.location.search);
  const query = params.get("query") || ""; // Leerer String

  // Load articels with search query
  loadArticles(query);
});

function loadArticles(query) {
  const list = document.getElementById('product-list');
  const url = query.trim()
    ? BASE_URL + `/article/search/${encodeURIComponent(query)}`
    : BASE_URL + `/article/multiple/0/10`;
  // Holen der Json
  fetch(url)
  // Prüfung ob eine Json kommt
    .then(response => {
      return response.json();
    })
    // Prüfung ob Daten in der Json sind
    .then(data => {
      console.log(data);
      // Durchlaufen der Json Artikel
      data.forEach(product => {
        const item = document.createElement('div');
        item.className = 'product';
        // Ausgabe auf html
        item.innerHTML = `
          <img src="${BASE_URL}/article/picture/${product.artikel_id}" alt="${product.titel}">
          <div class="product-info">
            <h3 class="product-title">${product.titel}</h3>
            <p class="product-description">${product.beschreibung}</p>
          </div>
        `;
        // Eventlistener wenn auf ein Produkt geklickt wird
        item.addEventListener('click', () => {
          window.location.href = `/Multi/Product/product.html?id=${product.artikel_id}`;
        });

        list.appendChild(item);
      });
    })
    .catch(err => {
      console.error('Fehler beim Laden der Produkte:', err);
      list.innerHTML = "<p>Fehler beim Laden der Produkte.</p>";
    });
}

