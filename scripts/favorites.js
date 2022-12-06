window.addEventListener("DOMContentLoaded", onLoad);

function onLoad() {
  fetch("https://api.punkapi.com/v2/beers")
    .then((response) => response.json())
    .then((jsonResponse) => {
      renderBeers(jsonResponse);
      selectButtons(jsonResponse);
    });
}

function selectButtons(beers) {
  const rButtons = document.querySelectorAll(".removeFavorites");

  rButtons.forEach((button, i) => {
    button.addEventListener("click", () => removeFromFavorites(beers[i]));
  });
}

// avand Id ul ca si parametru verificam care item din local storage array are id ul respectiv si facem remove la item

function removeFromFavorites(orice) {
  const favorites = localStorage.getItem("Favorites");
  const arrayFav = favorites ? JSON.parse(favorites) : [];
  const removeButton = document.querySelector(".codebar" + orice.id);

  removeButton.removeEventListener("click", removeFromFavorites());
  localStorage.removeItem("Favorites", JSON.stringify(arrayFav));
}

function renderBeers(information) {
  const allDiv = document.querySelector("#description");
  const lStorage = localStorage.getItem("Favorites");
  const viewMore = localStorage.getItem("beerID");

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

// aici folosind paratmetrul id verificam daca un item cu acest id exista in local storage
// daca exista return true daca nu return false
function verifyLocalStorage() {
  return true;
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
  let row = document.createElement("div");

  div.setAttribute("class", "row d-flex align-items-center");
  subDiv.setAttribute("class", "col-sm-10");
  row.setAttribute("class", "row");
  imgDiv.setAttribute("class", "col-sm-2");

  imgDiv.innerHTML = `
  <img src= ${img} width="60px"/>`;
  title.innerHTML = name;
  subtitle.innerHTML = tagline;
  p.innerHTML = description;
  row.innerHTML = `<div class="col-sm-6"> 
  <p class="mb-0 text-secondary"> 
   Alcohol Content: <span>${abv}</span> 
  </p>
  <p class="text-secondary">EBC unit: <span>${ebc}</span></p>
</div>
<div class="col-sm-6 d-flex justify-content-end">
<button class="btn btn-primary" onclick='localStorage.setItem("beerID", "${id}"); location.assign("file:///C:/Users/laure/OneDrive/Desktop/First%20Projects%20Hunt%20It/Punk%20Beer/PunkBeer/pages/beer.html")' type="button"> 
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
  subDiv.appendChild(row);
  div.appendChild(subDiv);
  card.appendChild(div);
}
