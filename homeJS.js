const rootEl = document.getElementById("root");


function setup(){
 
fetch("https://api.tvmaze.com/shows")
  .then((response) => response.json())
  .then((shows) => {
    makePageForShows(shows);
    searchBox(shows);
    makeDropDownList(shows);
    clickOnTheName(shows);
  });
  
}

function makePageForShows (shows) {
  rootEl.replaceChildren([]);
  shows.forEach(createCard);
  // call episodes when you pick up or search for a show
  clickOnTheName(shows);

  
}

// create Card
  function createCard(show) {
    let divContainer = document.createElement("div");
    divContainer.setAttribute("class", "container");
    rootEl.appendChild(divContainer);

    let name = document.createElement("a");
    name.setAttribute("class", "name");
    name.id = show.name;
    name.innerText = show.name;
    name.href = "#";
    divContainer.appendChild(name);

    let imageEl = document.createElement("img");
    imageEl.setAttribute("class", "image");
    imageEl.src = show.image.medium;
    divContainer.appendChild(imageEl);

    let summaryEl = document.createElement("p");
    summaryEl.setAttribute("class", "summary");
    summaryEl.innerHTML = show.summary;
    divContainer.appendChild(summaryEl);

    // create INFORMATION div
    let divInformation = document.createElement("div");
    divInformation.setAttribute("class", "div-information");
    divContainer.appendChild(divInformation);

    let rate = document.createElement("p");
    rate.setAttribute("class", "rate");
    rate.innerText = `Rated: ${show.rating.average}`;
    divInformation.appendChild(rate);

    let genre = document.createElement("p");
    genre.setAttribute("class", "genre");
    let a = `Genres: ${show.genres[0]}`;
    for (let i = 1; i < show.genres.length; i++) {
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
    runtimeEl.innerText = `Runtime: ${show.runtime}`;
    divInformation.appendChild(runtimeEl);
  }

// create addEventListner to searchBox
function searchBox (shows){
 // create counter for shows before searching
 let counterBeforeSearch = document.getElementById("counter");
 counterBeforeSearch.innerText = `found ${shows.length} shows`;

 // create event listner for search box
 let inputId = document.getElementById("searchBox");
 inputId.addEventListener("keyup", function(){
  let searchedContent = shows.filter(filteredContent);
  function filteredContent(show){
   if (
     show.name.toLowerCase().includes(inputId.value.toLowerCase()) ||
     show.summary.toLowerCase().includes(inputId.value.toLowerCase())
   ) {
     return true;
   }
  }
  //console.log("afjlbg")
  //console.log(searchedContent)
  
   makePageForShows(searchedContent);
  
  

  // create counter for searched shows
  let counterEl = document.getElementById("counter");
  counterEl.innerText = `found ${searchedContent.length} shows`
 })
}

// create the list of shows in drop down list
function makeDropDownList (shows){
 shows.forEach(createList)
 function createList(show){
  let selectId = document.getElementById("searchBar");
  let newOption = document.createElement("option")
  newOption.value = show.name;
  newOption.innerText = show.name;
  selectId.appendChild(newOption)
 }

 // addEventListner
 searchDropDownList(shows);
}

// Create event Listner for drop down list
function searchDropDownList (shows){
 let selectId = document.getElementById("searchBar");
 
 selectId.addEventListener("change", function(){
  console.log(selectId.value);
  let pickedContent = shows.filter((show) =>
    show.name.includes(selectId.value)
  );
  //console.log(pickedContent);
  if (pickedContent.length === 1) {
    makePageForShows(pickedContent);

    
  } else {
    makePageForShows(shows);
  }
  
 })
}

// add event listner to the name of show

function clickOnTheName (shows){
 let nameId = document.querySelectorAll(".name");
 //console.log(nameId);
 shows.forEach((show) => {
  //console.log(show)
  let nameId = document.getElementById(show.name)
  //console.log(a)
  nameId.addEventListener("click", function (e) {
    // get the name of show by using path
    console.log(e.path[0].textContent);
    let title = e.path[0].textContent;
    //get the id of show from API that match the name clicked.
    let findShow = shows.filter((show) => show.name.includes(title));
    console.log(findShow);
    let showId = findShow[0].id;
    console.log(showId);
    // to get the episodes just add episodes to the URL: "https://api.tvmaze.com/shows/showId/episodes"
    /*
    // link script.js file with this
    let script = document.createElement("script");
    script.src = "script.js";
    document.body.appendChild(script);

    // link shows.js file with this
    let scriptShows = document.createElement("script");
    scriptShows.src = "shows.js";
    document.body.appendChild(scriptShows);
    */
    // now hid the shows list and present the episodes
    fetch(`https://api.tvmaze.com/shows/${showId}/episodes`)
      .then((response) => response.json())
      .then((episodes) => {
        makePageForEpisodes(episodes);
      });
  });
 });

}

window.onload = setup;