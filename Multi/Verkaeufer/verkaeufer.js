import { BASE_URL } from '../config.js';

document.addEventListener("DOMContentLoaded", () => {
  loadArticles();
});

  // Load all articels from the seller       
  function loadArticles () {
    const userId = parseInt(sessionStorage.getItem('user_id'), 10);
    // Get all articel of the login user
    fetch(BASE_URL + `/article/user/${userId}`)  
      .then(response => response.json())
      .then(data => {
        const list = document.getElementById('product-list');
        data.forEach(product => {
          const item = document.createElement('div');
          item.className = 'product';         

          // Get the views of an articel
          fetch(BASE_URL + `/article/views/${product.artikel_id}`)
            .then(views => views.json())
            .then(viewArray => {
              let aufrufe = 0;
              // Check if the views are 0
              if (viewArray.length > 0) {
                aufrufe = viewArray[0].anzahl;
              } else {
                aufrufe = 0;  
              }

              // Build new html Elements with the articels
              item.innerHTML = `
                <img src="${BASE_URL}/article/picture/${product.artikel_id}" alt="${product.titel}">   
                <div class="product-info">
                  <h3 class="product-title">${product.titel}</h3>
                  <p class="product-description">${product.beschreibung}</p>
                  <p class="product-price">Preis: ${product.preis.replace('.', ',')} €</p>
                  <p class="product-amount">Bestand: ${product.bestand}</p>
                  <p class="product-amount">Aufrufe: ${aufrufe}</p> 
                  <button onclick="edit(${product.artikel_id})" >Bearbeiten</button>
                  <button onclick="deleteArticel(${product.artikel_id})" >Löschen</button>
                </div>
              `;

              list.appendChild(item);
            })
            .catch(err => {
              console.error('Fehler beim Laden der Views:', err);
            });
        });

        // Field to add new articels
        const message = document.createElement('div');
        message.className = 'no-products-clickable';
        message.innerHTML = `
          <p>Neue Produkte hinzufügen <span class="plus-icon">+</span> </p>
        `;
        message.addEventListener('click', () => {
          window.location.href = '/Multi/newProduct/newProduct.html';
        });
        list.appendChild(message);
      })
      .catch(err => {
        console.error('Fehler beim Laden der Produkte:', err);
      });
  }

// Open an articel
window.edit = function (articel){
  window.location.href = `/Multi/editProduct/editProduct.html?articelid=${articel}`;
}
// Delete an articel
 window.deleteArticel = async function (id) {
  try {
    const response = await fetch(BASE_URL + `/article/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Fehler beim Löschen');
    }
    const data = await response.text();
    console.log('Erfolgreich gelöscht:', data);
    // Reload the site
    await new Promise(resolve => setTimeout(resolve, 500));
    window.location.href = `/Multi/Verkaeufer/verkaeufer.html`;
  } catch (error) {
    console.error('Fehler:', error);
  }
}
