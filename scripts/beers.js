window.addEventListener("DOMContentLoaded", onLoad);

function onLoad() {
  fetch("https://api.punkapi.com/v2/beers")
    .then((response) => response.json())
    .then((jsonResponse) => {
      renderBeers(jsonResponse);
      selectButtons(jsonResponse);
    });
}

function selectButtons(beerCards) {
  const buttons = document.querySelectorAll(".addtofavorites");
  const rButtons = document.querySelectorAll(".removeFavorites");

  buttons.forEach((button, i) => {
    button.addEventListener("click", () => addToFavorites(beerCards[i]));
  });

  rButtons.forEach((button, i) => {
    button.addEventListener("click", () => removeFromFavorites(beerCards[i]));
  });
}

function removeFromFavorites(beer) {
  const favorites = localStorage.getItem("Favorites");
  const arrayFavorite = favorites ? JSON.parse(favorites) : [];
  const removeButton = document.querySelector(
    ".codebar" + beer.id + " .removeFavorites"
  );
  const addButton = document.querySelector(
    ".codebar" + beer.id + " .addtofavorites"
  );
  removeButton.classList.add("hidden");
  addButton.classList.remove("hidden");

  const newArray = arrayFavorite.filter((y) => y.id != beer.id);

  localStorage.setItem("Favorites", JSON.stringify(newArray));
}

function addToFavorites(beers) {
  const lsFavorites = localStorage.getItem("Favorites");
  const arrayFavorites = lsFavorites ? JSON.parse(lsFavorites) : [];
  const addButton = document.querySelector(
    ".codebar" + beers.id + " .addtofavorites"
  );
  const removeButton = document.querySelector(
    ".codebar" + beers.id + " .removeFavorites"
  );
  removeButton.classList.remove("hidden");
  addButton.classList.add("hidden");

  arrayFavorites.push(beers);
  localStorage.setItem("Favorites", JSON.stringify(arrayFavorites));
}

function renderBeers(information) {
  const allDiv = document.querySelector("#description");

  information.forEach((item) => {
    const card = document.createElement("div");
    card.setAttribute("class", "card p-3 codebar" + item.id);

    createBeer(
      card,
      item.image_url,
      item.name,
      item.tagline,
      item.description,
      item.abv,
      item.ebc,
      item.id
    );

    allDiv.appendChild(card);
  });
}

function verifyLocalStorage(beerID) {
  const ls = localStorage.getItem("Favorites");
  const arrayLS = ls ? JSON.parse(ls) : [];
  return arrayLS.some((x) => x.id === beerID);
}

function createBeer(card, img, name, tagline, description, abv, ebc, id) {
  let div = document.createElement("div");
  let imgDiv = document.createElement("div");
  let subDiv = document.createElement("div");
  let title = document.createElement("h2");
  let subtitle = document.createElement("h4");
  let br = document.createElement("br");
  let p = document.createElement("p");
  let br2 = document.createElement("br");
  let newRow = document.createElement("div");

  div.setAttribute("class", "row d-flex align-items-center");
  subDiv.setAttribute("class", "col-xs-10 col-sm-10");
  newRow.setAttribute("class", "row");
  imgDiv.setAttribute("class", "col-xs-2 col-sm-2");

  imgDiv.innerHTML = `
  <img src= ${img} width="60px"/>`;
  title.innerHTML = name;
  subtitle.innerHTML = tagline;
  p.innerHTML = description;
  newRow.innerHTML = `<div class="col-xs-6 col-sm-6"> 
  <p class="mb-0 text-secondary"> 
   Alcohol Content: <span>${abv}</span> 
  </p>
  <p class="text-secondary">EBC unit: <span>${ebc}</span></p>
</div>
<div class="col-xs-6 col-sm-6 d-flex justify-content-end">
  <button class="btn btn-primary" onclick='localStorage.setItem("beerID", "${id}"); location.assign("../pages/beer.html")' type="button"> 
  View More
  </button>
    <button class="btn btn-danger removeFavorites ${
      verifyLocalStorage(id) ? "" : "hidden"
    } " type="button">
      Remove from Favorites
    </button>
    <button
    class="btn btn-primary addtofavorites ${
      verifyLocalStorage(id) ? "hidden" : ""
    }"
    type="button"
    >
   Add to favorites
    </button>
  
</div>`;

  div.appendChild(imgDiv);
  subDiv.appendChild(title);
  subDiv.appendChild(subtitle);
  subDiv.appendChild(br);
  subDiv.appendChild(p);
  subDiv.appendChild(br2);
  subDiv.appendChild(newRow);
  div.appendChild(subDiv);
  card.appendChild(div);
}
// export function createBeer(
//   card,
//   img,
//   name,
//   tagline,
//   description,
//   abv,
//   ebc,
//   id
// )  as createBeer (){}
