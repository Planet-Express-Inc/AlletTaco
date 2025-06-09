document.addEventListener("DOMContentLoaded", () => {
  // Suchbegriff aus URL auslesen
  const params = new URLSearchParams(window.location.search);
  const query = params.get("query") || ""; // Leerer String

  // Artikel mit Suchbegriff laden
  loadArticles(query);
});

function loadArticles(query) {
  const list = document.getElementById('product-list');
  // Test json 
  const url = query.trim()
    ? `/Multi/search-${encodeURIComponent(query)}.json`
    : `/Multi/buyer.json`;
  // Holen der Json
  fetch(url)
  // Prüfung ob eine Json kommt
    .then(response => {
      if (!response.ok) {
        throw new Error("Fehler beim Laden der Artikel.");
      }
      return response.json();
    })
    // Prüfung ob Daten in der Json sind
    .then(data => {
      if (data.length === 0) {
        list.innerHTML = "<p>Keine Artikel gefunden.</p>";
        return;
      }
      // Durchlaufen der Json Artikel
      data.forEach(product => {
        const item = document.createElement('div');
        item.className = 'product';
        // Ausgabe auf html
        item.innerHTML = `
          <img src="${product.image_url}" alt="${product.title}">
          <div class="product-info">
            <h3 class="product-title">${product.title}</h3>
            <p class="product-description">${product.description}</p>
          </div>
        `;
        // Eventlistener wenn auf ein Produkt geklickt wird
        item.addEventListener('click', () => {
          window.location.href = `/Multi/Product/product.html?id=${product.id}`;
        });

        list.appendChild(item);
      });
    })
    .catch(err => {
      console.error('Fehler beim Laden der Produkte:', err);
      list.innerHTML = "<p>Fehler beim Laden der Produkte.</p>";
    });
}

