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
      .then(user => {
        const details = document.getElementById("userDetails");
        details.innerHTML = `
          <div><strong>Vorname:</strong> ${user.vorname}</div>
          <div><strong>Nachname:</strong> ${user.nachname}</div>
          <div><strong>Mail:</strong> ${user.email}</div>
          <div><strong>Benutzername:</strong> ${user.benutzername}</div>
          <div><strong>Rolle:</strong> ${sessionStorage.getItem("roll")}</div>
          
        `;
  
        // Wenn Rolle Verkäufer ist, Kommentare anzeigen
        if (sessionStorage.getItem("roll") === "verkäufer") {
          document.getElementById("userCommentsSection").style.display = "block";
          fetch(apiBaseUrl +'/user/reviews/${user.benutzer_id}')
            .then(response => response.json())
            .then(comments => {
              const commentContainer = document.getElementById("userComments");
              comments.forEach(comment => {
                const div = document.createElement("div");
                div.classList.add("comment");
                div.innerHTML = `
                  <p>${comment.kommentar} – ${"⭐".repeat(comment.sterne)}</p>
                  <small>Von: ${comment.bewerteter_id}</small>
                `;
                commentContainer.appendChild(div);
              });
            })
            .catch(error => console.error("Fehler beim Laden der Kommentare:", error));
        }
      })
      .catch(error => console.error("Fehler beim Laden der Benutzerdaten:", error));
  
    // verlinkungs knopf noch zur bestellhistorie /Multi/orderHistory/orderHistory.html
  });