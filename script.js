//You can edit ALL of the code here
const rootElem = document.getElementById("root");
const allEpisodes = getAllEpisodes();

function setup() {
  
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  rootElem.replaceChildren([]);
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

// level 200 addEventListener
let inputId = document.getElementById("search");
inputId.addEventListener("keyup",function (){
  //console.log(inputId.value)
  let searchedContent = allEpisodes.filter((episode) => {
    //console.log(episode.name)
    if (episode.name.toLowerCase().includes(inputId.value.toLowerCase()) || episode.summary.toLowerCase().includes(inputId.value.toLowerCase())){
      return true
    }
    
  });
  //console.log(searchedContent)
  let divSearch = document.querySelector(".search");
  let resultOfSearch = document.createElement("p");
  resultOfSearch.setAttribute("id","paragraph")
  //console.log("1: ", resultOfSearch)
  resultOfSearch.innerText = `Displaying ${searchedContent.length}/${allEpisodes.length} episodes`;
  if (inputId.value.length > 1){
    displayingEpisodes (searchedContent,allEpisodes)
  }
  
  divSearch.appendChild(resultOfSearch);
  makePageForEpisodes(searchedContent);
});

function displayingEpisodes (result,total){
  let idParagraph = document.getElementById("paragraph")
  idParagraph.remove();
  let resultOfSearch = document.createElement("p");
  resultOfSearch.innerText = `Displaying ${result.length}/${total.length} episodes`
  //console.log("2: ", resultOfSearch)
}

window.onload = setup;
