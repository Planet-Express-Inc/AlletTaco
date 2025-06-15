document.addEventListener("DOMContentLoaded", () => { 
  // Load all articels from the seller       
  function loadArticles () {
    const userId = parseInt(sessionStorage.getItem('user_id'), 10);
    // Get all articel of the login user
    fetch(`https://allestaco.niclas-sieveneck.de:5000/v1/article/user/${userId}`)  
      .then(response => response.json())
      .then(data => {
        const list = document.getElementById('product-list');
        data.forEach(product => {
          const item = document.createElement('div');
          item.className = 'product';
          console.log(product);           

          // Get the views of an articel
          fetch(`https://allestaco.niclas-sieveneck.de:5000/v1/article/views/${product.artikel_id}`)
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
                <img src="https://allestaco.niclas-sieveneck.de:5000/v1/article/picture/${product.artikel_id}" alt="${product.titel}">   
                <div class="product-info">
                  <h3 class="product-title">${product.titel}</h3>
                  <p class="product-description">${product.beschreibung}</p>
                  <p class="product-price">Preis: ${product.preis.replace('.', ',')} €</p>
                  <p class="product-amount">Bestand: ${product.bestand}</p>
                  <p class="product-amount">Aufrufe: ${aufrufe}</p> 
                  <button onclick="adjust(${product.artikel_id})" class="adjust">Bearbeiten</button>
                </div>
              `;

              item.addEventListener('click', () => {
                window.location.href = `/Multi/editProduct/editProduct.html?articelid=${product.artikel_id}`;
              });

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

  loadArticles();
});
