window.addEventListener("DOMContentLoaded", onLoad);

// This function takes information from the Local Storage and using callback functions it creates cards with the wanted information
// Parameters: arrayfavorite - array;
// Returns the cards filled with the right information
function onLoad() {
  const lStorage = localStorage.getItem("Favorites");
  const arrayfavorite = lStorage ? JSON.parse(lStorage) : [];

  renderBeers(arrayfavorite);
  selectButtons(arrayfavorite);
}

// This function adds event Listeners to each specified HTML button
// Parameters: beerCards - object; button - string; i - number
// Returns a new function that's using the callback function described on line 25 taking the paramter 'i' as the index
function selectButtons(beers) {
  const rButtons = document.querySelectorAll(".removeFavorites");

  rButtons.forEach((button, i) => {
    button.addEventListener("click", () => removeFromFavorites(beers[i]));
  });
}

// This function checks if there is an object in the Local Storage using the object's ID to determine wether if it can be removed or not
//Parameters: beer - object;
//Returns a button, depending if the wanted object exists in the Local Storage or not and removes the object if the object's button pressed whilst reloading the page
function removeFromFavorites(beer) {
  const favorites = localStorage.getItem("Favorites");
  const arrayFavorite = favorites ? JSON.parse(favorites) : [];

  const newArray = arrayFavorite.filter((y) => y.id != beer.id);
  console.log(newArray);

  localStorage.setItem("Favorites", JSON.stringify(newArray));
  location.reload();
}

// This function creates cards and using a callback function it creates HTML elements and fills each card with specific values
// Parameters: information - object; item - object
// Returns a filled card with received data from the API

function renderBeers(information) {
  const allDiv = document.querySelector("#description");

  information.forEach((item) => {
    const card = document.createElement("div");

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

    card.setAttribute("class", "card p-3 codebar" + item.id);
    allDiv.appendChild(card);
  });
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
  subDiv.setAttribute("class", "col-sm-10 col-xs-10");
  newRow.setAttribute("class", "row");
  imgDiv.setAttribute("class", "col-sm-2 col-xs-2");

  imgDiv.innerHTML = `
  <img src= ${img ? img : "../resources/default_beer.png"} width="60px"/>`;
  title.innerHTML = name;
  subtitle.innerHTML = tagline;
  p.innerHTML = description;
  newRow.innerHTML = `<div class="col-sm-6"> 
  <p class="mb-0 text-secondary"> 
   Alcohol Content: <span>${abv}</span> 
  </p>
  <p class="text-secondary">EBC unit: <span>${ebc}</span></p>
</div>
<div class="col-sm-6 d-flex justify-content-end">
<button class="btn btn-primary" onclick='localStorage.setItem("beerID", "${id}"); location.assign("../pages/beer.html")' type="button"> 
View More
  </button>
      <button class="btn btn-danger removeFavorites" type="button">
        Remove from Favorites
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
