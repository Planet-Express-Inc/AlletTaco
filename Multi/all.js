document.addEventListener("DOMContentLoaded", () => {    /*laden der Daten nach laden der Website */
  showRoleBasedMenu();
  userData();

  const profilLink = document.getElementById("profil-link");
if (profilLink) {
  profilLink.addEventListener("click", (e) => {
    e.preventDefault();

    const userId = sessionStorage.getItem("user_id");

    if (userId) {
      // Leite mit Parameter weiter
      window.location.href = `/Multi/verkaeuferProfil/verkaeuferProfil.html?user_id=${encodeURIComponent(userId)}`;
    } else {
      alert("Keine Benutzer-ID gefunden.");
    }
  });
}

  document.body.addEventListener("click", (e) => {
    const link = e.target.closest('[data-role]');
    if (!link) return;
    e.preventDefault();

    const role = link.getAttribute('data-role');
    const href = link.getAttribute('href');

    sessionStorage.setItem('roll', role);

    window.location.href = href;

  });
});


function userData (){
  // Werte aus dem Session Storage holen
      const username = sessionStorage.getItem('username');
      const role = sessionStorage.getItem('roll');
      const userId = sessionStorage.getItem('user_id');

      // DOM-Elemente holen
      const userInfoElement = document.getElementById('user-info');
      const userRoleElement = document.getElementById('user-role');

      // Inhalte setzen
      if (username && userInfoElement) {
        userInfoElement.textContent = 'Angemeldet als: ' + username;
      }

      if (role && userRoleElement) {
        userRoleElement.textContent = `(${role})`;
      }
}

function showRoleBasedMenu() {
  const role = sessionStorage.getItem('roll');

  const allRoleSections = document.querySelectorAll('[data-role-content]');
  allRoleSections.forEach(section => {
    section.style.display = 'none'; // Alles ausblenden
  });

  if (role) {
    const visibleSection = document.querySelector(`[data-role-content="${role}"]`);
    if (visibleSection) {
      visibleSection.style.display = 'block'; // Nur die passende Rolle anzeigen
    }
  }
}

function suche() {
  const query = document.getElementById('search-input').value;
  console.log(query);
  loadArticles(query); // übergibt den Suchbegriff oder "" an loadArticles
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

