const params = new URLSearchParams(window.location.search);
const productId = parseInt(params.get('id'), 10);

document.addEventListener("DOMContentLoaded", async () => {
    // 1. Holen der Produkt-ID aus der URL
    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get('id'), 10);
  
    if (isNaN(productId)) return;
  
    try {
        // 2. Holen der Produkt- und Verkäufer-Daten
        const [productRes, sellerRes] = await Promise.all([
            fetch('/Multi/articel.json'),
            fetch('/Multi/seller.json')
        ]);
  
        const [products, sellers] = await Promise.all([
            productRes.json(),
            sellerRes.json()
        ]);
  
        const product = products.find(p => p.id === productId);  
        const seller = sellers.find(s => s.id === product.sellerId);
  
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

function toggleDropdown() {
  document.getElementById("dropdown-menu").classList.toggle("show");
}

// Klick außerhalb schließt Dropdown
window.addEventListener("click", function(event) {
  if (!event.target.closest('.dropdown')) {
    document.getElementById("dropdown-menu").classList.remove("show");
  }
});