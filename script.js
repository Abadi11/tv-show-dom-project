//You can edit ALL of the code here
const rootElem = document.getElementById("root");
//const allEpisodes = getAllEpisodes();
//const allEpisodes = [];
//level 400
const shows = getAllShows();
console.log("shows", shows)
function showsSelectCreate (showsList){
  showsList.forEach(createShow)
  eventListnerForShows(showsList)
}
showsSelectCreate (shows)
function createShow(show){
  let selectEl = document.getElementById("shows");
  let newOption = document.createElement("option");
  newOption.value = show.name;
  newOption.innerText = show.name
  selectEl.appendChild(newOption)
}

function eventListnerForShows(shows){
  let selectId = document.getElementById("shows");
  selectId.addEventListener("change", function(){
  let optionsElements = document.querySelectorAll("option");
  let names=[]
  optionsElements.forEach((option) => names.push(option.value));
  let selectedName = names.filter((name) => selectId.value === name);
  let oneShow = shows.filter((show) => show.name == selectedName)

  //console.log("id: ", oneShow[0].id)
    let id = oneShow[0].id;
    async function catchEpisodes (id){
  const response = await fetch(`https://api.tvmaze.com/shows/${id}/episodes`);
  const episodes = await response.json();
  
  
  makePageForEpisodes(episodes);
  eventInSearchBar (episodes)
  selectOptionElement (episodes);
}
catchEpisodes (id).catch(error => {console.error(error)});
  });
  
}


/*
fetch("https://api.tvmaze.com/shows/82/episodes").then(response => response.json()).then(episodes => {
  console.log(episodes);
  
  //episodes.forEach(episode => {
    //allEpisodes.push(episode)
  //});
  makePageForEpisodes(episodes);
  eventInSearchBar (episodes)
  selectOptionElement (episodes);
}).catch(error => {console.error(error)});
*/

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
  divName.innerText = `S${episode.season.toString().padStart(2, "0")}E${episode.number.toString().padStart(2, "0")} - ${episode.name}`;
  


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
function eventInSearchBar (episodes){
// create addEventListner to input text
  let paragraphID = document.getElementById("paragraph");
  paragraphID.innerText = `Displaying ${episodes.length}/${episodes.length} episodes`;
  let inputId = document.getElementById("searchbar");
  inputId.addEventListener("keyup",function (){

// create a new array with elements that have been researched 
  let searchedContent = episodes.filter(getResearchedEpisodes);
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
    newResultOfSearch.innerText = `Displaying ${searchedContent.length}/${episodes.length} episodes`;
  }else {
    paragraphID.remove();
    newResultOfSearch.innerText = `Displaying ${searchedContent.length}/${episodes.length} episodes`;
  }

  //console.log(inputId.value.length)
  divSearch.appendChild(newResultOfSearch);
  makePageForEpisodes(searchedContent);
});
function getResearchedEpisodes (episode){
  if (episode.name.toLowerCase().includes(inputId.value.toLowerCase()) || episode.summary.toLowerCase().includes(inputId.value.toLowerCase())){
      return true
    }
}
}




// level 300 select 

function selectOptionElement (episodes){
  episodes.forEach(selectAllEpisodes);
  eventInSelectElement (episodes);
}


function selectAllEpisodes (episode){
  let selectEl = document.getElementById("episodes");
  let newOption = document.createElement("option");
  newOption.value = episode.name;
  newOption.innerText = `S${episode.season.toString().padStart(2, "0")}E${episode.number.toString().padStart(2, "0")} - ${episode.name}`;
  selectEl.appendChild(newOption)
}

function eventInSelectElement (episodes){
let selectId = document.getElementById("episodes");

selectId.addEventListener("change", function(){
let optionsElements = document.querySelectorAll("option");
let names=[]
optionsElements.forEach((option) => names.push(option.value));
let selectedName = names.filter((name) => selectId.value === name);
let oneEpisode = episodes.filter((episode) => episode.name == selectedName)

if (oneEpisode.length === 1){
  makePageForEpisodes(oneEpisode);
}else{
  makePageForEpisodes(episodes);
}

});
}


window.onload = setup;
