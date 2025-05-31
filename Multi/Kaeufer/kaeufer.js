document.addEventListener("DOMContentLoaded", () => {    /*laden der Daten nach laden der Website */
  loadArticles();
});

function loadArticles(query = "") {
  const list = document.getElementById('product-list');
  list.innerHTML = ""; // Liste immer zuerst leeren

  const url = query.trim()
    ? `/Multi/search-${encodeURIComponent(query)}.json`
    : `/Multi/buyer.json`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("Fehler beim Laden der Artikel.");
      }
      return response.json();
    })
    .then(data => {
      if (data.length === 0) {
        list.innerHTML = "<p>Keine Artikel gefunden.</p>";
        return;
      }

      data.forEach(product => {
        const item = document.createElement('div');
        item.className = 'product';

        item.innerHTML = `
          <img src="${product.image_url}" alt="${product.title}">
          <div class="product-info">
            <h3 class="product-title">${product.title}</h3>
            <p class="product-description">${product.description}</p>
          </div>
        `;

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

