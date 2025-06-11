const params = new URLSearchParams(window.location.search);
const productId = parseInt(params.get('id'), 10);

document.addEventListener("DOMContentLoaded", async () => {
    // 1. Holen der Produkt-ID aus der URL
    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get('id'), 10);
  
    if (isNaN(productId)) return;
  
    try {
        // 2. Holen der Produkt- und Verkäufer-Daten
        // fetch('https://allestaco.niclas-sieveneck.de:5000/v1/article/${productId}'),

        const [productRes, sellerRes] = await Promise.all([
            console.log(`https://allestaco.niclas-sieveneck.de:5000/v1/article/${productId}`),
            console.log(fetch(`https://allestaco.niclas-sieveneck.de:5000/v1/article/${productId}`)),
            fetch('/Multi/seller.json')
        ]);
  
        const [product, seller] = await Promise.all([
            productRes.json(),
            sellerRes.json()
        ]);
        
        console.log("Produkt:", product);
        console.log("Verkäufer:", seller);
  
        // 3. Füllen der Produktinformationen im HTML
        document.getElementById('product-image').src = product.image_url;
        document.getElementById('product-image').alt = product.title;
        document.getElementById('preis').textContent = "Preis: " + product.price.replace(".",",") + "€";
        document.getElementById('product-title').textContent = product.title;
        document.getElementById('product-description').textContent = product.description;
  
        document.getElementById('seller-name').textContent = "Name: " + seller.name;
        document.getElementById('seller-rating').textContent = "Bewertung: " + seller.rating;
        document.getElementById('seller-contact').textContent = "Email: " + seller.contact;

        const sellerBox = document.getElementById("seller-box");
        sellerBox.addEventListener('click', () => {
          window.location.href = `/Multi/verkaeuferProfil/verkaeuferProfil.html?user_id=${seller.id}`;
        });
        
    } catch (error) {
        console.error("Fehler beim Laden:", error);
    }

});

function addToCart(){
      const productData = {
      warenkorbId: 1,
      articelId: productId
    };
    console.log(productData);
}

