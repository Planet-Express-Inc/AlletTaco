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
    fetch("/api/orders") // API Endpoint für abgeschlossene Käufe
        .then(response => response.json())
        .then(data => {
            const orderHistory = document.getElementById("orderHistory");
            orderHistory.innerHTML = ""; // Alte Inhalte löschen
            data.forEach(order => {
                const orderDiv = document.createElement("div");
                orderDiv.classList.add("order-item");
                orderDiv.innerHTML = `<h3>${order.produktname}</h3>
                                     <p>Preis: ${order.preis} €</p>
                                     <p>Versand: ${order.versanddaten}</p>`;
                orderHistory.appendChild(orderDiv);
            });
        })
        .catch(error => console.error("Fehler beim Laden der Bestellungen:", error));
});

fetch('http://allestaco.niclas-sieveneck.de:5000/v1/system/status/api')
            .then(istAllesTaco => istAllesTaco.text())
            .then(data => {
                document.getElementById('istAllesTaco').textContent = data;
            })
            .catch(error => {
                document.getElementById('istAllesTaco').textContent = 'Fehler bei der Api' + error;
});