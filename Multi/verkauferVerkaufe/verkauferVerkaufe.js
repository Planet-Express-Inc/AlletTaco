/**
 * Verkaufsübersicht für Verkäufer (verkaufsübersicht.js)
 *
 * Zeigt dem eingeloggten Verkäufer eine Liste seiner abgeschlossenen Verkäufe.
 *
 * Hauptfunktionen:
 * - Abrufen aller Verkaufsdaten des aktuellen Benutzers 
 * - Dynamisches Nachladen von Artikeldetails und Käufernamen für jede Bestellung
 * - Darstellung der Verkäufe mit Titel, Käufername, Kauf-ID, Preis und Anzahl auf der Webseite
 *
 * Voraussetzungen im HTML:
 * - Ein Container mit der ID `orderHistory` zur Anzeige der Verkäufe
 * - Ein eingeloggter Benutzer mit gespeicherter `user_id` im `sessionStorage`
 *
 * Hinweise:
 * - Für jede Bestellung werden zusätzliche API-Aufrufe durchgeführt, um Artikel- und Benutzerinformationen zu ergänzen
 */

import { BASE_URL } from '../config.js';

document.addEventListener("DOMContentLoaded", function() {
    const user_id = sessionStorage.getItem("user_id");
    // Get all sells
    fetch(BASE_URL +`/user/sales/${user_id}`, {
      method: 'GET',
      credentials: 'include'})   
        .then(response => response.json())
        .then(orders => {
            console.log(orders)
            const orderHistory = document.getElementById("orderHistory");
            orderHistory.innerHTML = ""; 

            // Show each sell on the html site
            orders.forEach(async order => {
                const orderDiv = document.createElement("div");
                orderDiv.classList.add("order-item");
                const productCall = await fetch(BASE_URL + "/article/" + order.artikel_id);
                const productArray = await productCall.json();
                const product = productArray[0];

                console.log(product);

                const kauferCall = await fetch(BASE_URL + "/user/info/" + order.kaeufer_id);
                const kauferArray = await kauferCall.json();
                const kaufer = kauferArray[0];
                console.log("kauferCall-ID:", kauferArray); 
                orderDiv.innerHTML = `
                    <h3>Artikel: ${product ? product.titel : order.artikel_id}</h3>
                    <p>Kauf-ID: ${order.kauf_id}</p>
                    <p>Käufer: ${kaufer ? kaufer.benutzername  : kaufer.kaeufer_id}</p>
                    <p>Preis: ${order.kaufpreis.toString().replace('.', ',')} €</p>
                    <p>Anzahl: ${order.anzahl}</p>`
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