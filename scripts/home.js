window.addEventListener("DOMContentLoaded", onLoad);

// This function takes information from the URL to show a random beer
// Parameters: response - object; jsonResponse - object
// returns a resolved promise that resolves to the response object
function onLoad() {
  fetch("https://api.punkapi.com/v2/beers/random")
    .then((response) => response.json())
    .then((jsonResponse) => {
      fillRandomBeer(jsonResponse);
    });
}

// This function fills the selcted HTML elements with the specific object properties and sets the wanted attributes
// Parameters: data - object;
// Returns the selected infromation from the API object
function fillRandomBeer(data) {
  const title = document.querySelector("#headText");
  const information = document.querySelector("#paragraph");
  const image = document.querySelector("#randomImage");
  const parent = document.querySelector(".parent");
  let id = document.createElement("div");

  id.innerHTML = `<button class="btn btn-primary viewmore" onclick='localStorage.setItem("beerID", "${data[0].id}"); location.assign("./pages/beer.html")'>View More</button>`;

  title.innerHTML = data[0].name;
  information.innerHTML = data[0].description;
  image.setAttribute(
    "src",
    data[0].image_url ? data[0].image_url : "./resources/default_beer.png"
  );
  image.setAttribute("width", "100px");
  parent.appendChild(id);
}
