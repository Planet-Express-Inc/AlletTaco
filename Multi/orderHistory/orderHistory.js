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
        credentials: 'include'}
        )
        .then(response => response.json())
        .then(orders => {
            console.log("Antwort von der API:", orders); //Fehersuche
            const orderHistory = document.getElementById("orderHistory");
            orderHistory.innerHTML = ""; // Alte Inhalte löschen

            // Gehe über alle Bestellungen im Array
            orders.forEach(order => {
                const orderDiv = document.createElement("div");
                orderDiv.classList.add("order-item");
                orderDiv.innerHTML = `
                    <h3>Artikel-ID: ${order.artikel_id}</h3>
                    <p>Käufer-ID: ${order.kaeufer_id}</p>
                    <p>Kauf-ID: ${order.kauf_id}</p>
                    <p>Preis: ${order.kaupreis} €</p>
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