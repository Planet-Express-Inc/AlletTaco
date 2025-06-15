document.addEventListener("DOMContentLoaded", () => {    // Daten laden nach Websiteaufruf
  showRoleBasedMenu();
  userData();

  // Profil aufrufen
  const profilLink = document.getElementById("profil-link");
if (profilLink) {
  profilLink.addEventListener("click", (e) => {
    e.preventDefault();

    const userId = sessionStorage.getItem("user_id");

    if (userId) {
      window.location.href = `/Multi/verkaeuferProfil/verkaeuferProfil.html?user_id=${encodeURIComponent(userId)}`;
    } else {
      alert("Keine Benutzer-ID gefunden.");
    }
  });
}
// Warenkorb aufrufen
const warenkorb = document.getElementById("warenkorb");
if (warenkorb) {
  warenkorb.addEventListener("click", (e) => {
    e.preventDefault();
    const userId = sessionStorage.getItem("user_id");
    if (userId) {
      // Leite mit Parameter weiter
      window.location.href = `/Multi/Warenkorb/warenkorb.html?user_id=${encodeURIComponent(userId)}`;
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

// Daten aus Session Storage auslesen
function userData (){
      const username = sessionStorage.getItem('username');
      const role = sessionStorage.getItem('roll');
      const userId = sessionStorage.getItem('user_id');

      // HTML Inhalte auslesen 
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

// Zeige Dropdownmenü
function showRoleBasedMenu() {
  const role = sessionStorage.getItem('roll');

  const allRoleSections = document.querySelectorAll('[data-role-content]');
  // alles verstecken
  allRoleSections.forEach(section => {
    section.style.display = 'none'; 
  });
  // Zeige nur das für die Rolle 
  if (role) {
    const visibleSection = document.querySelector(`[data-role-content="${role}"]`);
    if (visibleSection) {
      visibleSection.style.display = 'block'; 
    }
  }
}
// zeige das Dropdownmenü
function toggleDropdown() {
  document.getElementById("dropdown-menu").classList.toggle("show");
}

// Klick außerhalb schließt Dropdown
window.addEventListener("click", function(event) {
  if (!event.target.closest('.dropdown')) {
    document.getElementById("dropdown-menu").classList.remove("show");
  }
});

// Suche öffnen
function suche() {
  const input = document.getElementById("search-input");
  const query = input ? input.value.trim() : "";
  const roll = sessionStorage.getItem('roll'); 

  // Startseite des Käufers mit Suchanfrage öffnen
  if (roll == 'Käufer')
  {
    window.location.href = `/Multi/Kaeufer/kaeufer.html?query=${encodeURIComponent(query)}`;
  }
  // Startseite des Verkäufers mit Suchanfrage öffnen  
  if (roll == 'Verkäufer')
  {
    window.location.href = `/Multi/Kaeufer/kaeufer.html?query=${encodeURIComponent(query)}`;
  }
}




