window.addEventListener("DOMContentLoaded", onLoad);

// This function takes information from the URL and adds the object's ID in order to show the right selected page
// Parameters: response - object; jsonResponse - object
// returns a resolved promise that resolves to the response object
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

// This function adds event Listeners to each specified HTML button
// Parameters: beerCards - object; button - string; i - number
// Returns a new function that's using the callback functions described on lines 32 and 52 taking parameter 'i' as the index of the object parameter 'beerCards'
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

//This function checks if there is an object in the Local Storage using the object's ID to determine wether if it can be removed or not
//Parameter: beer - object;
//Returns a button, depending if the wanted object exists in the Local Storage or not
function removeFromFavorites(beer) {
  const favorites = localStorage.getItem("Favorites");
  const arrayFav = favorites ? JSON.parse(favorites) : [];
  const removeButton = document.querySelector(
    ".codebar" + beer.id + " .removeFavorites"
  );
  const addButton = document.querySelector(
    ".codebar" + beer.id + " .addtofavorites"
  );
  removeButton.classList.add("hidden");
  addButton.classList.remove("hidden");

  const newArray = arrayFav.filter((y) => y.id != beer.id);

  localStorage.setItem("Favorites", JSON.stringify(newArray));
}

// This function checks if there is an object in the Local Storage using the object's ID to determine wether if it can be stored or not
//Parameters: beers - object;
//Returns a button, depending if the wanted object exists in the Local Storage or not
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

// This function creates a card and using a callback function it creates HTML elements and fills them with specific values
// Parameters: information - object; information.etc - every item described on lines 106-107
// Returns a filled card with received data from the API
function renderBeers(information) {
  const parent = document.querySelector(".parent");
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
  parent.appendChild(card);
}

// This function checks if there is an object in the LocalStorage Array named "Favorites" which has the "ID" property equal to the parameter
// Parameters: beerID - number
// Returns a boolean value
function verifyLocalStorage(beerID) {
  const ls = localStorage.getItem("Favorites");
  const arrayLS = ls ? JSON.parse(ls) : [];
  return arrayLS.some((element) => element.id === beerID);
}

// This function takes a specific array made out of objects and returns the wanted property of every object in that array
// Parameters: malt - Array; object - Object
// Returns a string
function determineMalts(malt) {
  const nameString = malt.map((object) => {
    return object.name;
  });
  return nameString;
}

// This function creates different elements in our HTML and sets specific attributes to each element and makes sure that each parameter will store a specific type of value
// Parameters: card - string ; img - string; name - string; tagline - string; description - string; brewed - string; abv - string; ebc - string; malts - array;
//             hops - array; yeast - string; foodpair - array; id - number;
// Returns the created html elements
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
  let newRow = document.createElement("div");
  let ingridients = document.createElement("div");
  let foodDiv = document.createElement("div");
  let alcoholInfo = document.createElement("div");

  foodDiv.setAttribute("class", "foodClass");
  parentDiv.setAttribute("class", "row");
  subDiv.setAttribute("class", "col-md-8 col-xs-8 justify-content-center mt-4");
  newRow.setAttribute("class", "row");
  imgDiv.setAttribute("class", "col-sm-4 col-xs-4");
  subtitle.setAttribute("class", "mb-4");
  ingridients.innerHTML = `<h2>Ingredients</h2>
  <h5>Malt: <span>${determineMalts(malts)}</span></h5>
  <h5>Hops: <span>${hops ? hops : hops + ","}</span></h5>
  <h5 class="mb-5">Yeast: <span>${yeast}</span></h5>`;

  foodDiv.innerHTML = `<h2>Food Pairing</h2>
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
                   width="200px"
                  height="auto"/>
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
  newRow.innerHTML = `
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
  subDiv.appendChild(foodDiv);
  subDiv.appendChild(newRow);
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
