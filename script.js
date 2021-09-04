//You can edit ALL of the code here
const rootElem = document.getElementById("root");

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  
  //rootElem.textContent = `Got ${episodeList.length} episode(s)`;

  episodeList.forEach(createCard)
}

function createCard(episode){
  let divContainer = document.createElement("div");
  divContainer.setAttribute("class", "container");


  let divName = document.createElement("div");
  divName.setAttribute("class", "name");
  divName.innerText = `${episode.name} - S${episode.season.toString().padStart(2, "0")}E${episode.number.toString().padStart(2, "0")}`;
  


  let divImg = document.createElement("div");
  divImg.setAttribute("class", "img");
  let imgEl = document.createElement("img");
  imgEl.src = episode.image.medium;
  divImg.appendChild(imgEl);


  let divSummary = document.createElement("div");
  divSummary.setAttribute("class", "summary");
  let pEl = document.createElement("p");
  pEl.innerHTML = episode.summary;
  divSummary.appendChild(pEl);

  divContainer.appendChild(divName);
  divContainer.appendChild(divImg);
  divContainer.appendChild(divSummary);
  rootElem.appendChild(divContainer);

}

window.onload = setup;
