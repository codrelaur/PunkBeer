window.addEventListener("DOMContentLoaded", onLoad);

function onLoad() {
  const favoriteBeers = localStorage.getItem("Favorites");
  const favoriteArray = JSON.parse(favoriteBeers);
  renderBeers(favoriteArray);
}

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
      item.ebc
    );

    card.setAttribute("class", "card p-3");
    allDiv.appendChild(card);
  });
}

function createBeer(card, img, name, tagline, description, abv, ebc) {
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
<div class="d-grid gap-2 d-md-flex justify-content-md-end">
              <button class="btn btn-primary" type="button" id="remove">
                Remove from favorites
              </button>
            </div> `;

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
