document.addEventListener("DOMContentLoaded", () => {    /*laden der Daten nach laden der Website */
  loadArticles();
});

function loadArticles(query = "") {
  const list = document.getElementById('product-list');
  list.innerHTML = ""; // Liste immer zuerst leeren

  const url = query.trim()
    ? `/search-${encodeURIComponent(query)}.json`
    : `/buyer.json`;

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



function suche() {
  const query = document.getElementById('search-input').value;
  console.log(query);
  loadArticles(query); // übergibt den Suchbegriff oder "" an loadArticles
}



function toggleDropdown() {
  document.getElementById("dropdown-menu").classList.toggle("show");
}

// Klick außerhalb schließt Dropdown
window.addEventListener("click", function(event) {
  if (!event.target.closest('.dropdown')) {
    document.getElementById("dropdown-menu").classList.remove("show");
  }
});