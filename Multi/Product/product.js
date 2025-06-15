import { BASE_URL } from '../config.js';

const params = new URLSearchParams(window.location.search);
const productId = parseInt(params.get('id'), 10);
let seller;

document.addEventListener("DOMContentLoaded", async () => {
  
  try {

    // Get already flown views
    const viewsRes = await fetch (BASE_URL + `/article/views/${productId}`);
    const viewArray = await viewsRes.json();
    const view = viewArray[0];
    const user = sessionStorage.getItem("user_id")

    // If first view
    let anzahl = 0;
    if (typeof view == 'undefined') {
      anzahl = 1;
      console.log("undefiniert")
    }
    else{
      anzahl = parseInt(view.anzahl,10) + 1;
    }
    
    // Increase views
      const productData = {
        anzahl: anzahl,
        artikel_id: productId,
        aufrufer_id: user
      };
    console.log(productData);

    // Remove old views
    await fetch(BASE_URL + `/article/views/${productId}`,{
      method: 'DELETE',
      credentials: 'include'
    })

    // Set new views
    await fetch(BASE_URL + `/article/views`,{
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
      body: JSON.stringify(productData)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Hinzugefügt:', data);
    })
    .catch(error => {
      console.error('Fehler beim Senden:', error);
    });

    // Get the product data
    const productRes = await fetch(BASE_URL + `/article/${productId}`);
    const productArray = await productRes.json();
    const product = productArray[0];  

    // Get the seller data
    const sellerId = product.verkaeufer_id;
    const sellerRes = await fetch(BASE_URL + `/user/info/${sellerId}`);
    const sellerArray = await sellerRes.json();
    seller = sellerArray[0]; 
    console.log("Verkäuferdaten:", seller);

    // Get the sellers rating
    const ratingRes = await fetch(BASE_URL + `/user/reviews/${sellerId}`);
    const ratingArray = await ratingRes.json();
    const summe = ratingArray.reduce((acc, ratingArray) => acc + ratingArray.sterne, 0);
    const durchschnitt = summe / ratingArray.length;
    const sternegerundet = Math.round(durchschnitt);

    // Show the results on DOM
    document.getElementById('product-image').src = BASE_URL +`/article/picture/${productId}`;
    document.getElementById('product-image').alt = product.titel;
    document.getElementById('preis').textContent = "Preis: " + product.preis.replace('.',',') + " €";
    document.getElementById('views').textContent = "Aufrufe: " + anzahl;
    document.getElementById('product-title').textContent = product.titel;
    document.getElementById('product-description').textContent = product.beschreibung;

    document.getElementById('seller-name').textContent = "Name: " + seller.benutzername;
    document.getElementById('seller-rating').textContent = "Bewertung: " + sternegerundet;
    document.getElementById('seller-contact').textContent = "Email: " + seller.email;

    const sellerBox = document.getElementById("seller-box");
    sellerBox.addEventListener('click', () => {
      window.location.href = `/Multi/verkaeuferProfil/verkaeuferProfil.html?user_id=${seller.benutzer_id}`;
    });
        
    } catch (error) {
        console.error("Fehler beim Laden:", error);
    }

});
// Add products to the shoping cart
window.addToCart = function (){
    const userId = parseInt(sessionStorage.getItem('user_id'), 10);
      const productData = {
      anzahl: 1,
      artikel_id: productId,
      benutzer_id: userId,
      verkaeufer_id: seller.benutzer_id
    };
    console.log(productData);

    fetch(BASE_URL + `/user/cart`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productData)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Hinzugefügt:', data);
      document.getElementById('saveModal').style.display = 'flex';
    })
    .catch(error => {
      console.error('Fehler beim Senden:', error);
    });
}

