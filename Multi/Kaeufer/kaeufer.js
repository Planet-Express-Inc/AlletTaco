import { BASE_URL } from '../config.js';
let startArticel = 0;
let endArticel = 10;
let noMoreArticel = false;

document.addEventListener("DOMContentLoaded", () => {
  // Get search query form URL
  const params = new URLSearchParams(window.location.search);
  const query = params.get("query") || ""; // Leerer String

  if (query == ""){
    // Load Articels when no query is found
    loadArticles(0,10)
  }else{
    // Load articels with search query
    loadQuery(query);
  }
});
// Load articels with search query
window.loadQuery = async function (query){
  const productRes = await fetch(BASE_URL + `/article/search/${encodeURIComponent(query)}`, {
    method:'GET',
    credentials:'include',
  })
  const productArray = await productRes.json();
  console.log(productArray);
  showOnHtml(productArray);
}


// Load Articels when no query is found
window.loadArticles = async function (start, end){
  const data = {
    "number": end,
    "offset": start
  }
  const productRes = await fetch(BASE_URL + `/article/multiple`, {
    method:'POST',
    credentials:'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  const productArray = await productRes.json();
  console.log(productArray);
  if (productArray.length%10 != 0){
    noMoreArticel = true;
  }
  showOnHtml(productArray);

}
// Show the array on the html site
window.showOnHtml = async function (productArray){
  const list = document.getElementById('product-list');
  list.innerHTML = ""; // 
  productArray.forEach(product => {
    const item = document.createElement('div');
      item.className = 'product';
      // Show on html
      item.innerHTML = `
        <img src="${BASE_URL}/article/picture/${product.artikel_id}" alt="${product.titel}">
        <div class="product-info">
          <h3 class="product-title">${product.titel}</h3>
          <p class="product-description">${product.beschreibung}</p>
          <p class="product-price">Preis: ${product.preis.replace('.', ',')} €</p>
        </div>
      `;
      // Eventlistener when pressed on articel
      item.addEventListener('click', () => {
        window.location.href = `/Multi/Product/product.html?id=${product.artikel_id}`;
      });
      list.appendChild(item);
  });
}
// Go 10 articels back
window.back = function (){
  // If there are no more articels
  if (startArticel==0){
    startArticel = 0;
    endArticel = 10;
    alert("Sie sind auf Seite 1");
}else{
  startArticel -= 10;
  endArticel -= 10;
  noMoreArticel = false;
  loadArticles(startArticel,endArticel);
  }
}
// Show the next 10 articels
window.forward = function (){
  // If there are no more articels
  if (noMoreArticel == true){
    alert("Sie sind auf der letzten Seite");
}else{
  startArticel += 10;
  endArticel += 10;
  loadArticles(startArticel,endArticel);
  }
}