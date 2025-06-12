// Globale Variable zum Speichern der gewählten Rolle
let selectedRoll = "";
let apiBaseUrl  = "https://allestaco.niclas-sieveneck.de:5000/v1/"; //GrundURL für die API-Anfragen; HTTP WIRD BALD SEHR BALD IN HTTPS UMGEWANDELT

//Funktion zum Verarbeiten der Cookie-Optionen
function toggleCookies() {
    const choice = document.querySelector('input[name="cookie-choice"]:checked');
    if (!choice) {
        alert("Bitte wähle aus, ob du die Cookies akzeptieren oder ablehnen möchtest.");
        return;
    }

    if (choice.value === "accept") {
        alert("Cookies akzeptiert!");
        showRoll();
    } else {
        alert("Cookies abgelehnt! Aber Cookies sind doch lecker. Überleg nochmal, ob du sie nicht doch akzeptieren möchtest.");
    }
}

//Funktion zum Anzeigen des RollenWahl-Popups
function showRoll() {
    document.querySelector('.cookie-popup').style.display = 'none';
    document.querySelector('.roll-popup').style.display = 'block';
    document.querySelector('.login-popup').style.display = 'none';
    document.querySelector('.register-popup').style.display = 'none';

}
// Funktion zum Abrufen und Speichern der Rolle
function getRoll(){
    const rollButton = document.querySelector('input[name="roll-button"]:checked');
    if (!rollButton) {
        alert("Bitte wähle eine Rolle (Käufer oder Verkäufer) aus.");
        return false; // Rolle nicht ausgewählt
    }
    selectedRoll = rollButton.value;
   
    sessionStorage.setItem("roll", selectedRoll); 
    return true; // Rolle erfolgreich gespeichert
}

//Funktion zum Anzeigen des Login-Popups
function showLogin() {
    if (getRoll()) { // Prüft, ob Rolle ausgewählt wurde
        document.querySelector('.roll-popup').style.display = 'none';
        document.querySelector('.login-popup').style.display = 'block';
        document.querySelector('.register-popup').style.display = 'none';

        // Fügt eine dynamische Überschrift hinzu
        const loginPopup = document.querySelector('.login-popup h2');
        loginPopup.innerHTML = `Einloggen im <br>(${selectedRoll}-konto)`; //.innerHTML um <br> zeilenumbruch
    }
}
//Funktion zum Verarbeiten der Login Daten
async function onLogin() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    
    try {
        const response = await fetch(apiBaseUrl + 'user/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                benutzername: username,
                password_encrypt: password,
                rolle: selectedRoll
            })
        });

        const data = await response.json();

        if (response.ok) { //Response von Niclas abfragen
           // Prüfe, ob Antwort ein Array ist und mindestens ein Element enthält
        if (response.ok && Array.isArray(data) && data.length > 0) {
                // User-ID und username im Local Storage speichern

                const userData = data[0]; // Nimm das erste Element aus dem Array
                sessionStorage.setItem("user_id", userData.benutzer_id);
                sessionStorage.setItem("username", userData.benutzername);

                alert("Login erfolgreich! Benutzer-ID: " + userData.benutzer_id);

                
                if(selectedRoll == "Verkäufer"){
                    window.location.href = "/Multi/Verkaeufer/verkaeufer.html"; // Zielseite ist die verkäufer site
                   fetch(`https://allestaco.niclas-sieveneck.de:5000/v1/user/login`, {
                        method: 'GET',
                        credentials: 'include'
                        })
                        .then(response => {
                            return response.json();
                        })
                        .then(data => {
                            console.log(data);
                        })
                        .catch(error => {
                            console.error('Fehler:', error);
                        });
                }else{
                    window.location.href = "/Multi/Kaeufer/kaeufer.html"; // Zielseite ist die käufer site
                }
            } else {
                alert("Login fehlgeschlagen: Benutzer nicht gefunden oder Passwort falsch.");
                console.log("Server-Antwort:", data);
            }
        } else {
            alert("Fehler beim Login: " + response.statusText);
        }
    } catch (error) {
        alert("Netzwerkfehler: " + error.message);
    }
}
//Funktion zum Anzeigen des Registrieren-Popups
function showRegister() {
    document.querySelector('.login-popup').style.display = 'none';
    document.querySelector('.register-popup').style.display = 'block';
}
async function onRegister(){
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    const firstname = document.getElementById('register-firstname').value;
    const lastname = document.getElementById('register-lastname').value;
    const mail = document.getElementById('register-mail').value;
    const data = {
        benutzername: username,
        password_encrypt: password,
        vorname: firstname,
        nachname: lastname,
        email: mail,
        rolle: selectedRoll
    };
    const body = JSON.stringify(data);
    console.log(body); // Logge den JSON-String

    try {
            const response = await fetch(apiBaseUrl +'user/register', { // await = auf die Vervollständigung eines Promise wartet,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    vorname: firstname,
                    nachname: lastname,
                    benutzername: username,
                    email: mail,
                    rolle: selectedRoll,
                    password_encrypt: password
                })

            });
            

            if (response.ok) {
                alert("Registrierung erfolgreich!");
                showLogin();
            } else {
                alert("Fehler bei der Registrierung: " + response.statusText);
            }
        } catch (error) {
            alert("Netzwerkfehler: " + error.message);
        }
}
