window.addEventListener("DOMContentLoaded", onLoad);

function onLoad() {
  const lStorage = localStorage.getItem("beerID");
  const number = parseInt(lStorage);

  fetch("https://api.punkapi.com/v2/beers/" + number)
    .then((response) => response.json())
    .then((jsonResponse) => {
      renderBeers(jsonResponse);
      selectButtons(jsonResponse);
    });
}

function selectButtons(beers) {
  const buttons = document.querySelectorAll(".addtofavorites");
  const rButtons = document.querySelectorAll(".removeFavorites");
  buttons.forEach((button, i) => {
    button.addEventListener("click", () => addToFavorites(beers[i]));
  });

  rButtons.forEach((button, i) => {
    button.addEventListener("click", () => removeFromFavorites(beers[i]));
  });
}
// avand Id ul ca si parametru verificam care item din local storage array are id ul respectiv si facem remove la item

function removeFromFavorites(orice) {
  const favorites = localStorage.getItem("Favorites");
  const arrayFav = favorites ? JSON.parse(favorites) : [];
  const removeButton = document.querySelector(
    ".codebar" + orice.id + " .removeFavorites"
  );
  const addButton = document.querySelector(
    ".codebar" + orice.id + " .addtofavorites"
  );
  removeButton.classList.add("hidden");
  addButton.classList.remove("hidden");
  // console.log(arrayFav);

  const newArray = arrayFav.filter((y) => y.id != orice.id);
  // console.log(newArray);

  localStorage.setItem("Favorites", JSON.stringify(newArray));
}

function addToFavorites(altceva) {
  const lsFavorites = localStorage.getItem("Favorites");
  const arrayFavorites = lsFavorites ? JSON.parse(lsFavorites) : [];
  const addButton = document.querySelector(
    ".codebar" + altceva.id + " .addtofavorites"
  );
  const removeButton = document.querySelector(
    ".codebar" + altceva.id + " .removeFavorites"
  );
  removeButton.classList.remove("hidden");
  addButton.classList.add("hidden");

  arrayFavorites.push(altceva);
  localStorage.setItem("Favorites", JSON.stringify(arrayFavorites));
}

function renderBeers(information) {
  const allDiv = document.querySelector(".parent");
  const card = document.createElement("div");
  card.setAttribute("class", "row codebar" + information[0].id);

  createBeer(
    card,
    information[0].image_url,
    information[0].name,
    information[0].tagline,
    information[0].description,
    information[0].first_brewed,
    information[0].abv,
    information[0].ebc,
    information[0].ingredients.malt,
    information[0].ingredients.hops[0].name,
    information[0].ingredients.yeast,
    information[0].food_pairing,
    information[0].id
  );
  allDiv.appendChild(card);
  console.log(information[0].ingredients.malt);
}

// This function checks if there is an object in the LocalStorage Array named "Favorites" which has the "ID" property equal to the parameter
// Parameters: beerID - number
// Returns a boolean value
function verifyLocalStorage(beerID) {
  const ls = localStorage.getItem("Favorites");
  const arrayLS = ls ? JSON.parse(ls) : [];
  return arrayLS.some((x) => x.id === beerID);
}

function determineMalts(malt) {
  // console.log(malt);
  const solution = malt.map((x) => {
    return x.name;
  });
  return solution;
}

function createBeer(
  card,
  img,
  name,
  tagline,
  description,
  brewed,
  abv,
  ebc,
  malts,
  hops,
  yeast,
  foodpair,
  id
) {
  let parentDiv = document.createElement("div");
  let imgDiv = document.createElement("div");
  let subDiv = document.createElement("div");
  let title = document.createElement("h1");
  let subtitle = document.createElement("h2");
  let br = document.createElement("br");
  let p = document.createElement("p");
  let br2 = document.createElement("br");
  let row = document.createElement("div");
  let ingridients = document.createElement("div");
  let foodPairing = document.createElement("div");
  let alcoholInfo = document.createElement("div");

  // console.log(malts);
  console.log(foodpair);

  foodPairing.setAttribute("class", "foodClass");
  parentDiv.setAttribute("class", "row");
  subDiv.setAttribute("class", "col-md-8 justify-content-center mt-4");
  row.setAttribute("class", "row");
  imgDiv.setAttribute("class", "col-md-4");
  subtitle.setAttribute("class", "mb-4");
  ingridients.innerHTML = `<h2>Ingredients</h2>
  <h5>Malt: <span>${determineMalts(malts)}</span></h5>
  <h5>Hops: <span>${hops ? hops : hops + ","}</span></h5>
  <h5 class="mb-5">Yeast: <span>${yeast}</span></h5>`;

  foodPairing.innerHTML = `<h2>Food Pairing</h2>
    ${foodpair
      .map((food) => {
        return `<p class='mb-0'>${food}
              </p> `;
      })
      .join("")}
  `;

  imgDiv.innerHTML = `
  <img
                  class="rounded-start mx-5 my-5"
                  src= ${img ? img : "../resources/default_beer.png"} 
                  width="200px"/>
                  `;
  title.innerHTML = name;
  subtitle.innerHTML = tagline;
  p.innerHTML = description;
  alcoholInfo.innerHTML = `<p class="text-secondary mb-0">
  First Brewed: <span>${brewed}</span>
    </p> 
  <p class="mb-0 text-secondary"> 
   Alcohol Content: <span>${abv}</span> 
  </p>
  <p class="text-secondary mb-5">EBC unit: <span>${ebc}</span></p>
</div>`;
  row.innerHTML = `
<div class="d-grid  d-md-flex justify-content-md-end mb-5 mx-2">
<button 
                    onclick="history.back()"
                    class="btn btn-secondary me-md-2"
                    type="button"
                    id="back"
                  >
                    Back
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

  parentDiv.appendChild(imgDiv);
  subDiv.appendChild(title);
  subDiv.appendChild(subtitle);
  subDiv.appendChild(br);
  subDiv.appendChild(p);
  subDiv.appendChild(br2);
  subDiv.appendChild(alcoholInfo);
  subDiv.appendChild(ingridients);
  subDiv.appendChild(foodPairing);
  subDiv.appendChild(row);
  parentDiv.appendChild(subDiv);
  card.appendChild(parentDiv);
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
