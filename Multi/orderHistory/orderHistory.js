import { BASE_URL } from '../config.js';

document.addEventListener("DOMContentLoaded", function() {
    // API-URL wie im Screenshot
    fetch(BASE_URL +"/user/purchase", {
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
                const productCall = await fetch(BASE_URL + "/article/" + order.artikel_id);
                const productArray = await productCall.json();
                const product = productArray[0];

                const verkauferCall = await fetch(BASE_URL + "/user/info/" + product.verkaeufer_id);
                const verkauferArray = await verkauferCall.json();
                const verkaufer = verkauferArray[0];
                console.log("kauferCall-ID:", verkauferArray); //Fehersuche
                orderDiv.innerHTML = `
                    <h3>Artikel: ${product ? product.titel : order.artikel_id}</h3>
                    <p>Kauf-ID: ${order.kauf_id}</p>
                    <p>Verkäufer: ${verkaufer ? verkaufer.benutzername  : verorder.kaeufer_id}</p>
                    <p>Preis: ${order.kaufpreis.toString().replace('.', ',')} €</p>
                    <p>Anzahl: ${order.anzahl}</p>
                    <p>Versand: ${order.versanddaten}</p>
                    <p>Bestelldatum: ${order.day + "."+ order.month+"."+ order.year}</p>
                    <p>
                    <a href="/Multi/Bewerten/bewerten.html?seller_id=${verkaufer.benutzer_id}">Diese Bestellung bewerten</a>
                    </p>`
                orderHistory.appendChild(orderDiv);
            });
        })
        .catch(error => console.error("Fehler beim Laden der Bestellungen:", error));
});
