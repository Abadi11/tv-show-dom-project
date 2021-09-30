const rootEl = document.getElementById("root");


function setup(){
fetch("https://api.tvmaze.com/shows")
  .then((response) => response.json())
  .then((shows) => {
    makePageForShows(shows);
  });
}

function makePageForShows (shows) {
 rootEl.replaceChildren([]);
 shows.forEach(createCard)
}

function createCard(show){
 let divContainer = document.createElement("div");
 divContainer.setAttribute("class", "container");
 rootEl.appendChild(divContainer);

 let name = document.createElement("h1")
 name.setAttribute("class","name");
 name.innerText = show.name;
 divContainer.appendChild(name);

 let imageEl = document.createElement("img")
 imageEl.setAttribute("class", "image");
 imageEl.src = show.image.medium;
 divContainer.appendChild(imageEl);

 let summaryEl = document.createElement("p");
 summaryEl.setAttribute("class","summary");
 summaryEl.innerHTML = show.summary;
 divContainer.appendChild(summaryEl);

 // create INFORMATION div
 let divInformation = document.createElement("div");
 divInformation.setAttribute("class","div-information");
 divContainer.appendChild(divInformation);

 let rate = document.createElement("p");
 rate.setAttribute("class","rate");
 rate.innerText = `Rated: ${show.rating.average}`
 divInformation.appendChild(rate);

 let genre = document.createElement("p");
 genre.setAttribute("class", "genre");
 let a = `Genres: ${show.genres[0]}`;
 for (let i = 1; i<show.genres.length; i++){
  a = a + ` | ${show.genres[i]}`;
 }
 genre.innerText = a;
 divInformation.appendChild(genre);

 let statusEl = document.createElement("p");
 statusEl.setAttribute("class", "status");
 statusEl.innerText = `Status: ${show.status}`;
 divInformation.appendChild(statusEl);

 let runtimeEl = document.createElement("p");
 runtimeEl.setAttribute("class", "runtime");
 runtimeEl.innerText = `Runtime: ${show.runtime}` ;
 divInformation.appendChild(runtimeEl);
}


window.onload = setup;