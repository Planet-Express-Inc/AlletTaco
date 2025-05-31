document.addEventListener("DOMContentLoaded", async () => {
    // 1. Holen der Produkt-ID aus der URL
    const params = new URLSearchParams(window.location.search);
    const sellerId = parseInt(params.get('user_id'), 10);
  
    if (isNaN(sellerId)) return;

    const item = document.getElementById('seller-box');
    try
    {
        const sellerRes = await fetch('/Multi/seller.json');
        const sellers = await sellerRes.json();

        // Beispiel: Zugriff auf einen bestimmten Verkäufer
        const seller = sellers.find(s => s.id === sellerId); // z. B. feste ID oder aus URL
 
        item.innerHTML = `
                <p class="seller">Name: ${seller.name}</p>
                <p class="seller">Email: ${seller.contact}</p>
                <p class="seller-rating">${renderSterne((Math.round(seller.rating)))}</p>
            `;

        } catch (error) {
        console.error("Fehler beim Laden:", error);
        }
        loadBewertungen()
});


    function loadBewertungen () {
        fetch('/Multi/bewertung.json')  /*URL der API*/
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
  return '★'.repeat(anzahl) + '☆'.repeat(maxSterne - anzahl);
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