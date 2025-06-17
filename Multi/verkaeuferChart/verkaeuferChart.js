import { BASE_URL } from "../config.js";

const user_id = sessionStorage.getItem("user_id");

window.ladeVerkaeufe = async function () {
  const response = await fetch(BASE_URL + `/user/sales/${user_id}`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    console.error('Fehler beim Laden:', response.status);
    return;
  }

  const sellsArticleArray = await response.json();
  console.log(sellsArticleArray); 

  const months = new Array(12).fill(0);
  sellsArticleArray.forEach(element => {
    const month = parseInt(element.month);

    console.log(month);
    months[month-1] += element.anzahl;

  });

  console.log(months);
  return months;
}
ladeVerkaeufe();

window.loadChart = async function (){
    const canvas = document.getElementById('verkaufsChart');
    const ctx = canvas.getContext('2d');

    const labels = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];
    const data = await ladeVerkaeufe();
    console.log("Sie sind hier", data)

    const padding = 50;
    const chartWidth = canvas.width - 2 * padding;
    const chartHeight = canvas.height - 2 * padding;

    // Max width
    const maxValue = Math.max(...data);

    // Balkenbreite und Abstand
    const barWidth = chartWidth / data.length * 0.6;
    const barGap = (chartWidth / data.length) * 0.4;

    // Hintergrund weiß
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Achsen zeichnen
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    // Y-Achse
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.stroke();

    // Y-Achse Beschriftung
    ctx.fillStyle = '#000';
    ctx.font = '14px Arial';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';

    const yTicks = 5;
    for(let i = 0; i <= yTicks; i++) {
    const y = padding + (chartHeight / yTicks) * i;
    const value = Math.round(maxValue - (maxValue / yTicks) * i);
    ctx.fillText(value, padding - 10, y);
    // kleine Tick Markierung
    ctx.beginPath();
    ctx.moveTo(padding - 5, y);
    ctx.lineTo(padding, y);
    ctx.stroke();
    }

    // Balken und X-Achsen-Beschriftung zeichnen
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    for(let i = 0; i < data.length; i++) {
    const barHeight = (data[i] / maxValue) * chartHeight;
    const x = padding + i * (barWidth + barGap) + barGap / 2;
    const y = canvas.height - padding - barHeight;

    // Balken zeichnen
    ctx.fillStyle = '#B00B0E'; // orange
    ctx.fillRect(x, y, barWidth, barHeight);

    // Monatsnamen
    ctx.fillStyle = '#000';
    ctx.fillText(labels[i], x + barWidth / 2, canvas.height - padding + 5);
    }
}

loadChart();

