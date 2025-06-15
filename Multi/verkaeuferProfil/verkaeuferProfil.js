import { BASE_URL } from '../config.js';

const params = new URLSearchParams(window.location.search);
const sellerId = parseInt(params.get('user_id'), 10);

document.addEventListener("DOMContentLoaded", async () => {
    // 1. Holen der Produkt-ID aus der URL
    
    
  
    if (isNaN(sellerId)) return;

    const item = document.getElementById('seller-box');
    try
    {

        // Verkäuferdaten holen
        const sellerRes = await fetch(BASE_URL + `/user/info/${sellerId}`);
        const sellerArray = await sellerRes.json();
        const seller = sellerArray[0]; 
        console.log("Verkäuferdaten:", seller);


        item.innerHTML = `
                <p class="seller">Name: ${seller.benutzername}</p>
                <p class="seller-rating">${renderSterne((Math.round(seller.rating)))}</p>
            `;

        } catch (error) {
        console.error("Fehler beim Laden:", error);
        }
        loadBewertungen()
});


async function loadBewertungen() {
    try {
        // Bewertungen laden
        const response = await fetch(BASE_URL + `/user/reviews/${sellerId}`);
        const data = await response.json();

        const list = document.getElementById('bewertung-list');



        // Bewertungen verarbeiten
        data.forEach(bewertung => {
            const item = document.createElement('div');
            item.className = 'bewertung';
            
            item.innerHTML = `
                <p class="bewertung-user">Bewerter: ${bewertung.bewerter_id}</p>
                <p class="bewertung-user">Bewerteter: ${bewertung.bewerteter_id}</p>
                <p class="bewertung-sterne">${renderSterne(bewertung.sterne)}</p>
                <p class="bewertung-kommentar">Kommentar: ${bewertung.kommentar}</p>
            `;

            list.appendChild(item);
        });

    } catch (err) {
        console.error('Fehler beim Laden der Bewertungen:', err);
    }
}

function renderSterne(anzahl) {
  const maxSterne = 5;
  console.log(anzahl);
  const sterne = anzahl || 0;
  console.log(sterne);
  return '★'.repeat(sterne) + '☆'.repeat(maxSterne - sterne);
}
