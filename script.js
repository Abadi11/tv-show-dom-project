//You can edit ALL of the code here
const rootElem = document.getElementById("root");
//const allEpisodes = getAllEpisodes();
const allEpisodes = [];
getEpisodes("https://api.tvmaze.com/shows/82/episodes")
console.log(allEpisodes.length)
function getEpisodes (episodesURL){
  //console.log("kkk")
  fetch(episodesURL).then(response => response.json()).then(episodes => {
  episodes.forEach(episode => allEpisodes.push(episode));
})
//let allEpisodes = JSON.parse(allEpisodesFetch);
//console.log(allEpisodes)
}
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
let paragraphID = document.getElementById("paragraph");
  paragraphID.innerText = `Displaying ${allEpisodes.length}/${allEpisodes.length} episodes`;
  console.log(allEpisodes.length)
// create addEventListner to input text
let inputId = document.getElementById("searchbar");
inputId.addEventListener("keyup",function (){
  //console.log(inputId.value)
console.log(allEpisodes.length)
  // create a new array with elements that have been researched 
  let searchedContent = allEpisodes.filter((episode) => {
    //console.log(episode.name)
    if (episode.name.toLowerCase().includes(inputId.value.toLowerCase()) || episode.summary.toLowerCase().includes(inputId.value.toLowerCase())){
      return true
    }
    
  });
  //console.log(searchedContent)

  // declare variable to indicate to the div of search bar 
  let divSearch = document.querySelector(".search");
  //declare variable to indicate to the p of displaying search 
  let paragraphID = document.getElementById("paragraph");
  
  // create a new p after applying remove each time 
  let newResultOfSearch = document.createElement("p");
  newResultOfSearch.setAttribute("id","paragraph");
  

  if(inputId.value.length === 0){
    paragraphID.remove();
    newResultOfSearch.innerText = `Displaying ${searchedContent.length}/${allEpisodes.length} episodes`;
  }else {
    paragraphID.remove();
    newResultOfSearch.innerText = `Displaying ${searchedContent.length}/${allEpisodes.length} episodes`;
  }

  //console.log(inputId.value.length)
  divSearch.appendChild(newResultOfSearch);
  makePageForEpisodes(searchedContent);
});



// level 300 select 
allEpisodes.forEach(selectAllEpisodes);

function selectAllEpisodes (episode){
  let selectEl = document.getElementById("episodes");
  let newOption = document.createElement("option");
  newOption.value = episode.name;
  newOption.innerText = `${episode.name} - S${episode.season.toString().padStart(2, "0")}E${episode.number.toString().padStart(2, "0")}`;

  selectEl.appendChild(newOption)
}


let selectId = document.querySelector("select");

selectId.addEventListener("change", function(){
let optionsElements = document.querySelectorAll("option");
let names=[]
optionsElements.forEach((option) => names.push(option.value));
let selectedName = names.filter((name) => selectId.value === name);
let oneEpisode = allEpisodes.filter((episode) => episode.name == selectedName)

if (oneEpisode.length === 1){
  makePageForEpisodes(oneEpisode);
}else{
  makePageForEpisodes(allEpisodes);
}

});
console.log(allEpisodes.length)
window.onload = setup;
