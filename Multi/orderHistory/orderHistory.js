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
            console.log("Antwort von der API:", orders); //Fehersuche
            const orderHistory = document.getElementById("orderHistory");
            orderHistory.innerHTML = ""; // Alte Inhalte löschen

            // Gehe über alle Bestellungen im Array
            orders.forEach(async order => {
                const orderDiv = document.createElement("div");
                orderDiv.classList.add("order-item");
                const productCall = await fetch(apiBaseUrl + "article/" + order.artikel_id);
                const productArray = await productCall.json();
                const product = productArray[0];

                const verkauferCall = await fetch(apiBaseUrl + "user/info/" + product.verkaeufer_id);
                const verkauferArray = await verkauferCall.json();
                const verkaufer = verkauferArray[0];
                console.log("kauferCall-ID:", productArray); //Fehersuche
                orderDiv.innerHTML = `
                    <h3>Artikel: ${product ? product.titel : order.artikel_id}</h3>
                    <p>Kauf-ID: ${order.kauf_id}</p>
                    <p>Verkäufer: ${verkaufer ? verkaufer.vorname + ' '+ verkaufer.nachname : verorder.kaeufer_id}</p>
                    <p>Preis: ${order.kaufpreis} €</p>
                    <p>Versand: ${order.versanddaten}</p>
                `;
                orderHistory.appendChild(orderDiv);
            });
        })
        .catch(error => console.error("Fehler beim Laden der Bestellungen:", error));
});

fetch(apiBaseUrl+'system/status/api')
            .then(istAllesTaco => istAllesTaco.text())
            .then(data => {
                document.getElementById('istAllesTaco').textContent = data;
            })
            .catch(error => {
                document.getElementById('istAllesTaco').textContent = 'Fehler bei der Api' + error;
});