let apiBaseUrl  = "https://allestaco.niclas-sieveneck.de:5000/v1/"; //GrundURL für die API-Anfragen;
function toggleDropdown() {
    document.getElementById("dropdown-menu").classList.toggle("show");
  }
  
  // Klick außerhalb schließt Dropdown
  window.addEventListener("click", function(event) {
    if (!event.target.closest('.dropdown')) {
      document.getElementById("dropdown-menu").classList.remove("show");
    }
  });
  
  document.addEventListener("DOMContentLoaded", function () {
    // Benutzerdaten laden
    
    fetch(apiBaseUrl +"user/info/" + sessionStorage.getItem("user_id") )
      
      .then(response => response.json())
      .then(users => {
        const user = users[0];
        console.log("Benutzerdaten:", user);
        const details = document.getElementById("userDetails");
        details.innerHTML = `
          <div><strong>Vorname:</strong> ${user.vorname}</div>
          <div><strong>Nachname:</strong> ${user.nachname}</div>
          <div><strong>Mail:</strong> ${user.email}</div>
          <div><strong>Benutzername:</strong> ${user.benutzername}</div>
          <div><strong>Rolle:</strong> ${sessionStorage.getItem("roll")}</div>
          
        `;
  
        // Wenn Rolle Verkäufer ist, Kommentare anzeigen
        if (sessionStorage.getItem("roll") === "Verkäufer") {
          document.getElementById("userCommentsSection").style.display = "block";
          document.getElementById("order-link-to-role").href = "/Multi/Verkaeufe/verkaeufe.html";
          document.getElementById("order-link-to-role").textContent = "Verkäufe";
          document.getElementById("order-link-to-role").style.display = "block";
          
          loadBewertungen();
        }else{
          document.getElementById("order-link-to-role").href = "/Multi/orderHistory/orderHistory.html";
          document.getElementById("order-link-to-role").textContent = "Bestellungen";
          document.getElementById("order-link-to-role").style.display = "block";
        }

      })
      .catch(error => console.error("Fehler beim Laden der Benutzerdaten:", error));
  });


  
    function loadBewertungen () {
        const sellerId = sessionStorage.getItem("user_id"); // Verkäufer-ID aus dem Session Storage hole
        fetch(`https://allestaco.niclas-sieveneck.de:5000/v1/user/reviews/${sellerId}`)  /*URL der API*/
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById('userComments');
    
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