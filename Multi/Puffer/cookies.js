let totalRotations = 0;

function flipCoin() {
  const coin = document.getElementById('coin');
  const radios = document.getElementsByName('entscheidung');
  let selectedOption = null;

  // Auswahl prüfen
  for (const radio of radios) {
    if (radio.checked) {
      selectedOption = radio.value;
      break;
    }
  }

  if (!selectedOption) {
    alert("Bitte wähle zuerst 'Annehmen' oder 'Ablehnen'");
    return;
  }

  // Ergebnis berechnen (z.B. Kopf oder Zahl)
  isHeads = Math.random() < 0.5;
  baseRotation = isHeads ? 0 : 180;
  totalRotations += 3;
  finalRotation = baseRotation + totalRotations * 360;

  // Münze drehen
  coin.style.transform = `rotateY(${finalRotation}deg)`;

  // Nach 1 Sekunde die Münze ausblenden und Modal schließen
  setTimeout(() => {
    // Münze ausblenden
    coin.style.display = 'none';

    // Optional: Modal nach einer weiteren Verzögerung schließen
    document.getElementById('coinModal').style.display = 'none';
  }, 1500); // 1 Sekunde warten
}