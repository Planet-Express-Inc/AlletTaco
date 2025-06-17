import { BASE_URL } from './config.js';

document.addEventListener("DOMContentLoaded", () => {    
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

  // open shopping cart
  const warenkorb = document.getElementById("warenkorb");
  if (warenkorb) {
    warenkorb.addEventListener("click", (e) => {
      e.preventDefault();
      const userId = sessionStorage.getItem("user_id");
      if (userId) {
        window.location.href = `/Multi/Warenkorb/warenkorb.html?user_id=${encodeURIComponent(userId)}`;
      } else {
        alert("Keine Benutzer-ID gefunden.");
      }
    });
  }


// Logoff User
const logoff = document.getElementById("logoff");
if (logoff) {
  logoff.addEventListener("click", (e) => {
    e.preventDefault();
    sessionStorage.clear();
    fetch(BASE_URL + `/user/logoff`)
      .then(response => response.json())
      .then(data => {
        console.log("Logout-Antwort:", data);
        console.log(data);
        window.location.href = "/index.html";
      });
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

// Get user data from session storage
function userData() {
  const username = sessionStorage.getItem('username');
  const role = sessionStorage.getItem('roll');
  const userId = sessionStorage.getItem('user_id');

  const userInfoElement = document.getElementById('user-info');
  const userRoleElement = document.getElementById('user-role');

  // Set the dynamic elements
  if (username && userInfoElement) {
    userInfoElement.textContent = 'Angemeldet als: ' + username;
  }

  if (role && userRoleElement) {
    userRoleElement.textContent = `(${role})`;
  }
}

// Create dropdown menu
function showRoleBasedMenu() {
  const role = sessionStorage.getItem('roll');

  const allRoleSections = document.querySelectorAll('[data-role-content]');
  // hide everything
  allRoleSections.forEach(section => {
    section.style.display = 'none'; 
  });
  // Only show the specific role 
  if (role) {
    const visibleSection = document.querySelector(`[data-role-content="${role}"]`);
    if (visibleSection) {
      visibleSection.style.display = 'block'; 
    }
  }
}

// Show dropdown menu
window.toggleDropdown = function() {
  document.getElementById("dropdown-menu").classList.toggle("show");
}

// Click outside the dropdown menu
window.addEventListener("click", function(event) {
  if (!event.target.closest('.dropdown')) {
    document.getElementById("dropdown-menu").classList.remove("show");
  }
});

// open search
window.suche = function () {
  const input = document.getElementById("search-input");
  const query = input ? input.value.trim() : "";
  const roll = sessionStorage.getItem('roll'); 

  // Open start site of käufer
  if (roll == 'Käufer') {
    window.location.href = `/Multi/Kaeufer/kaeufer.html?query=${encodeURIComponent(query)}`;
  }
  // Open start site of verkäufer 
  if (roll == 'Verkäufer') {
    window.location.href = `/Multi/Kaeufer/kaeufer.html?query=${encodeURIComponent(query)}`;
  }
}