const params = new URLSearchParams(window.location.search);
const sellerId = parseInt(params.get('user_id'), 10);

document.addEventListener("DOMContentLoaded", async () => {
    // 1. Holen der Produkt-ID aus der URL
    
    
  
    if (isNaN(sellerId)) return;

    const item = document.getElementById('seller-box');
    try
    {

        // Verkäuferdaten holen
        const sellerRes = await fetch(`https://allestaco.niclas-sieveneck.de:5000/v1/user/info/${sellerId}`);
        const sellerArray = await sellerRes.json();
        const seller = sellerArray[0]; 
        console.log("Verkäuferdaten:", seller);


        item.innerHTML = `
                <p class="seller">Name: ${seller.benutzername}</p>
                <p class="seller">Email: ${seller.email}</p>
                <p class="seller-rating">${renderSterne((Math.round(seller.rating)))}</p>
            `;

        } catch (error) {
        console.error("Fehler beim Laden:", error);
        }
        loadBewertungen()
});


    function loadBewertungen () {
        fetch(`https://allestaco.niclas-sieveneck.de:5000/v1/user/reviews/${sellerId}`)  /*URL der API*/
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById('bewertung-list');
    
            /*auslesen der JSON*/
            data.forEach(bewertung => {
            const item = document.createElement('div');
            item.className = 'bewertung';
                

            /*hinzufügen der HTML Elemente in die vorhandene Website*/
            item.innerHTML = `
                    <p class="bewertung-title">Titel: ${bewertung.id}</p>
                    <p class="bewertung-user">User: ${bewertung.bewerter_id}</p>
                    <p class="bewertung-user">User1: ${bewertung.bewertender_id}</p>
                    <p class="bewertung-sterne">${renderSterne(bewertung.sterne)}</p>
                    <p class="bewertung-kommentar">Kommentar: ${bewertung.kommentar}</p>
            `;
            /*unten anhängen */
            list.appendChild(item);
            });
        })
        .catch(err => {
            console.error('Fehler beim Laden der Produkte:', err);
        });
    }


function renderSterne(anzahl) {
  const maxSterne = 5;
  console.log(anzahl);
  const sterne = anzahl || 0;
  console.log(sterne);
  return '★'.repeat(sterne) + '☆'.repeat(maxSterne - sterne);
}
