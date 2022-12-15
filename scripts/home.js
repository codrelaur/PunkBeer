window.addEventListener("DOMContentLoaded", onLoad);
function onLoad() {
  fetch("https://api.punkapi.com/v2/beers/random")
    .then((response) => response.json())
    .then((jsonResponse) => {
      fillRandomBeer(jsonResponse);
      // createBeer(jsonResponse);
    });
}

function fillRandomBeer(data) {
  const title = document.querySelector("#headText");
  const info = document.querySelector("#paragraph");
  const image = document.querySelector("#randomImage");
  const parent = document.querySelector(".parent");
  let id = document.createElement("div");
  console.log(data);

  id.innerHTML = `<button class="btn btn-primary viewmore" onclick='localStorage.setItem("beerID", "${data[0].id}"); location.assign("file:///C:/Users/laure/OneDrive/Desktop/First%20Projects%20Hunt%20It/Punk%20Beer/PunkBeer/pages/beer.html")'>View More</button>`;

  title.innerHTML = data[0].name;
  info.innerHTML = data[0].description;
  image.setAttribute(
    "src",
    data[0].image_url ? data[0].image_url : "./resources/default_beer.png"
  );
  image.setAttribute("width", "100px");
  console.log(id);
  parent.appendChild(id);
}
// function createBeer(data) {
//   console.log(data);
//   let btn = document.createElement("div");
//   const div = document.querySelector(".btns");
//   console.log(id);
//   btn.innerHTML = `<button class="btn btn-primary viewmore" onclick='localStorage.setItem("beerID", "${id}"); location.assign("file:///C:/Users/laure/OneDrive/Desktop/First%20Projects%20Hunt%20It/Punk%20Beer/PunkBeer/pages/beer.html")'>View More</button>`;
//   div.appendChild(btn);
// }
