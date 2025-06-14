document.addEventListener("DOMContentLoaded", () => {    /*laden der Daten nach laden der Website */
    
    function loadArticles () {
      const userId = parseInt(sessionStorage.getItem('user_id'), 10);
        fetch(`https://allestaco.niclas-sieveneck.de:5000/v1/article/user/${userId}`)  /*URL der API*/
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById('product-list');
            /*auslesen der JSON*/
            data.forEach(product => {
            const item = document.createElement('div');
            item.className = 'product';           

            /*hinzufügen der HTML Elemente in die vorhandene Website*/
            item.innerHTML = `
                <img src="https://allestaco.niclas-sieveneck.de:5000/v1/article/picture/${product.artikel_id}" alt="${product.titel}">   
                <div class="product-info">
                <h3 class="product-title">${product.titel}</h3>
                <p class="product-description">${product.beschreibung}</p>
                <p class="product-price">Preis: ${product.preis.replace('.', ',')} €</p>
                <p class="product-amount">Anzahl: ${product.bestand}</p>
                <button onclick="adjust(${product.artikel_id})" class="adjust">Bearbeiten</button>
                </div>
            `;

            item.addEventListener('click', () => {
                window.location.href = `/Multi/editProduct/editProduct.html?articelid=${product.artikel_id}`;
            });
            /*unten anhängen */
            list.appendChild(item);
            });
                const message = document.createElement('div');
                message.className = 'no-products-clickable';
                message.innerHTML = `
                    <p>Neue Produkte hinzufügen <span class="plus-icon">+</span> </p>
                `;

                message.addEventListener('click', () => {
                    window.location.href = '/Multi/newProduct/newProduct.html';
                });

                list.appendChild(message);
                return;
        })
        .catch(err => {
            console.error('Fehler beim Laden der Produkte:', err);
        });
    }
    loadArticles();
    userData();
  });

function userData (){
  // Werte aus dem Session Storage holen
      const username = sessionStorage.getItem('username');
      const role = sessionStorage.getItem('roll');

      // DOM-Elemente holen
      const userInfoEl = document.getElementById('user-info');
      const userRoleEl = document.getElementById('user-role');

      // Inhalte setzen
      if (username && userInfoEl) {
        userInfoEl.textContent = 'Angemeldet als: ' + username;
      }

      if (role && userRoleEl) {
        userRoleEl.textContent = `(${role})`;
      }
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