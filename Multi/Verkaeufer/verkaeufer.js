document.addEventListener("DOMContentLoaded", () => {    /*laden der Daten nach laden der Website */
    
    function loadArticles () {
        fetch('verkaeufer.json')  /*URL der API*/
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById('product-list');
    

    

            /*auslesen der JSON*/
            data.forEach(product => {
            const item = document.createElement('div');
            item.className = 'product';           

            /*hinzufügen der HTML Elemente in die vorhandene Website*/
            item.innerHTML = `
                <img src="${product.image_url}" alt="${product.title}">   
                <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-description">${product.description}</p>
                <p class="product-price">Preis: ${product.price} €</p>
                <p class="product-amount">Anzahl: ${product.amount}</p>
                <button onclick="adjust(${product.id})" class="adjust">Bearbeiten</button>
                </div>
            `;

            item.addEventListener('click', () => {
                window.location.href = `/Multi/editProduct/editProduct.html?articelid=${product.id}`;
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
  });





function toggleDropdown() {
  document.getElementById("dropdown-menu").classList.toggle("show");
}

// Klick außerhalb schließt Dropdown
window.addEventListener("click", function(event) {
  if (!event.target.closest('.dropdown')) {
    document.getElementById("dropdown-menu").classList.remove("show");
  }
});