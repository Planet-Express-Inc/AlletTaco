const params = new URLSearchParams(window.location.search);
const productId = parseInt(params.get('id'), 10);

document.addEventListener("DOMContentLoaded", async () => {
    // 1. Holen der Produkt-ID aus der URL
    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get('id'), 10);
  
    if (isNaN(productId)) return;
  
    try {

        console.log(fetch(`https://allestaco.niclas-sieveneck.de:5000/v1/article/${productId}`));

        // Produktdaten holen
        const productRes = await fetch(`https://allestaco.niclas-sieveneck.de:5000/v1/article/${productId}`);
        const productArray = await productRes.json();
        const product = productArray[0];  

        console.log("Produktdaten:", product);
        const sellerId = product.verkaeufer_id;

        // Verkäuferdaten holen
        const sellerRes = await fetch(`https://allestaco.niclas-sieveneck.de:5000/v1/user/info/${sellerId}`);
        const sellerArray = await sellerRes.json();
        const seller = sellerArray[0]; 
        console.log("Verkäuferdaten:", seller);

        const ratingRes = await fetch(`https://allestaco.niclas-sieveneck.de:5000/v1/user/reviews/${sellerId}`);
        const ratingArray = await ratingRes.json();
        const summe = ratingArray.reduce((acc, ratingArray) => acc + ratingArray.sterne, 0);
        const durchschnitt = summe / ratingArray.length;
        const sternegerundet = Math.round(durchschnitt);
        console.log("Durchschnittspreis:", durchschnitt)
  
        // 3. Füllen der Produktinformationen im HTML
        document.getElementById('product-image').src = `https://allestaco.niclas-sieveneck.de:5000/v1/article/picture/${productId}`;
        document.getElementById('product-image').alt = product.titel;
        document.getElementById('preis').textContent = "Preis: " + product.preis.replace('.',',') + " €";
        document.getElementById('product-title').textContent = product.titel;
        document.getElementById('product-description').textContent = product.beschreibung;
  
        document.getElementById('seller-name').textContent = "Name: " + seller.benutzername;
        document.getElementById('seller-rating').textContent = "Bewertung: " + sternegerundet;
        document.getElementById('seller-contact').textContent = "Email: " + seller.email;

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

