let apiBaseUrl  = "https://allestaco.niclas-sieveneck.de:5000/v1/"; //GrundURL für die API-Anfragen; HTTP WIRD BALD SEHR BALD IN HTTPS UMGEWANDELT
function toggleDropdown() {
  document.getElementById("dropdown-menu").classList.toggle("show");
}

// Klick außerhalb schließt Dropdown
window.addEventListener("click", function(event) {
  if (!event.target.closest('.dropdown')) {
    document.getElementById("dropdown-menu").classList.remove("show");
  }
});

document.addEventListener("DOMContentLoaded", function() {
    // API-URL wie im Screenshot
    fetch(apiBaseUrl +"user/purchase", {
      method: 'GET',
      credentials: 'include'}) // Cookies mit senden)}

   
        .then(response => response.json())
        .then(orders => {
            // console.log("Antwort von der API:", orders); //Fehersuche
            const orderHistory = document.getElementById("orderHistory");
            orderHistory.innerHTML = ""; // Alte Inhalte löschen

            // Gehe über alle Bestellungen im Array
            orders.forEach(async order => {
                const orderDiv = document.createElement("div");
                orderDiv.classList.add("order-item");
                const productCall = await fetch(apiBaseUrl + "article/" + order.artikel_id);
                const productArray = await productCall.json();
                const product = productArray[0];

                const kauferCall = await fetch(apiBaseUrl + "user/info/" + order.kaeufer_id);
                const kauferArray = await kauferCall.json();
                const kaufer = kauferArray[0];
                console.log("kauferCall-ID:", kauferArray); //Fehersuche
                orderDiv.innerHTML = `
                    <h3>Artikel: ${product ? product.titel : order.artikel_id}</h3>
                    <p>Kauf-ID: ${order.kauf_id}</p>
                    <p>Verkäufer: ${kaufer ? kaufer.benutzername  : kaufer.kaeufer_id}</p>
                    <p>Preis: ${order.kaufpreis} €</p>
                    <p>Versand: ${order.versanddaten}</p>
                    <p><!-- Bewertung-Link -->
                    <a href="/Multi/Bewerten/bewerten.html?seller_id=${verkaufer.benutzer_id}">Diese Bestellung bewerten</a>
                    </p>`
                orderHistory.appendChild(orderDiv);
            });
        })
        .catch(error => console.error("Fehler beim Laden der Bestellungen:", error));
});



/* 
article-by-user alle Articles from a user.


GET
​/v1​/article​/user​/{user_id}
die in ein Array schreiben

dann einen Api call

Noch mal mit Niclas sprechen, verkäufer_id übergeben können wäre premium bei den verkäufen und dann alle zurückzubekommen smash 


*/