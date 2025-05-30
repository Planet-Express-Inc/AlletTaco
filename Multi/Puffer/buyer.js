document.addEventListener("DOMContentLoaded", () => {    /*laden der Daten nach laden der Website */
    
    function loadArticles () {
        fetch('buyer.json')  /*URL der API*/
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
                </div>
            `;

            item.addEventListener('click', () => {
                window.location.href = `product.html?id=${product.id}`;
            });
            /*unten anhängen */
            list.appendChild(item);
            });
        })
        .catch(err => {
            console.error('Fehler beim Laden der Produkte:', err);
        });
    }
    loadArticles();
  });



  
  