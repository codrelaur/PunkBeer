window.addEventListener("DOMContentLoaded", onLoad);
function onLoad() {
  fetch("https://api.punkapi.com/v2/beers/random")
    .then((response) => response.json())
    .then((jsonResponse) => {
      fillRandomBeer(jsonResponse);
    });
}

function fillRandomBeer(data) {
  console.log(data);
  const title = document.querySelector("#headText");
  const info = document.querySelector("#paragraph");
  const image = document.querySelector("#randomImage");

  title.innerHTML = data[0].name;
  info.innerHTML = data[0].description;
  image.setAttribute(
    "src",
    data[0].image_url ? data[0].image_url : "./resources/default_beer.png"
  );
  image.setAttribute("width", "100px");
}
