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
    fetch("/api/user")
      .then(response => response.json())
      .then(user => {
        const details = document.getElementById("userDetails");
        details.innerHTML = `
          <div><strong>Vorname:</strong> ${user.vorname}</div>
          <div><strong>Nachname:</strong> ${user.nachname}</div>
          <div><strong>Mail:</strong> ${user.email}</div>
          <div><strong>Benutzername:</strong> ${user.benutzername}</div>
        `;
  
        // Wenn Rolle Verkäufer ist, Kommentare anzeigen
        if (user.rolle === "verkäufer") {
          document.getElementById("userCommentsSection").style.display = "block";
          fetch(`/api/comments/${user.id}`)
            .then(response => response.json())
            .then(comments => {
              const commentContainer = document.getElementById("userComments");
              comments.forEach(comment => {
                const div = document.createElement("div");
                div.classList.add("comment");
                div.innerHTML = `
                  <h3>${comment.titel} – ${"⭐".repeat(comment.sterne)}</h3>
                  <p>${comment.text}</p>
                  <small>Von: ${comment.verfasser}</small>
                `;
                commentContainer.appendChild(div);
              });
            })
            .catch(error => console.error("Fehler beim Laden der Kommentare:", error));
        }
      })
      .catch(error => console.error("Fehler beim Laden der Benutzerdaten:", error));
  
    // Bestellungen laden (bereits vorhanden)
    fetch("/api/orders")
      .then(response => response.json())
      .then(data => {
        const orderHistory = document.getElementById("orderHistory");
        orderHistory.innerHTML = "";
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