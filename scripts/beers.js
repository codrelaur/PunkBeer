window.addEventListener("DOMContentLoaded", onLoad);

// This function takes information from the Local Storage and using callback functions it creates cards with the wanted information
// Parameters: response - object; jsonResponse - object;
// Returns the cards filled with the right information
function onLoad() {
  fetch("https://api.punkapi.com/v2/beers")
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

// This function creates cards and using a callback function it creates HTML elements and fills each card with specific values
// Parameters: information - object; item - object; item.etc - object properties
// Returns a filled card with received data from the API
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

// This function verifies if in the Local Storage there is an object with a specific ID property
// Parameters: beerID - number;
// Returns the ID's value into a new key in the Local Storage
function verifyLocalStorage(beerID) {
  const localstorage = localStorage.getItem("Favorites");
  const arrayLS = localstorage ? JSON.parse(localstorage) : [];
  return arrayLS.some((x) => x.id === beerID);
}

// This function creates different elements in our HTML and sets specific attributes to each element and makes sure that each parameter will store a specific type of value
// Parameters: card - string ; img - string; name - string; tagline - string; description - string; brewed - string; abv - string; ebc - string;
//              id - number;
// Returns the created html elements
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
