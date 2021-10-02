//You can edit ALL of the code here
// The id of allEpisodes should be 1632 as the first choice of select bar of the titles

//console.log(allEpisodes)
const rootElem = document.getElementById("root");
const shows = getAllShows();

//level 400
showsSelectCreate(shows);
function showsSelectCreate(showsList) {
  showsList.forEach(createShow);
  getIdOfShow(showsList);
}

function createShow(show) {
  let selectEl = document.getElementById("shows");
  let newOption = document.createElement("option");
  newOption.value = show.name;
  newOption.innerText = show.name;
  selectEl.appendChild(newOption);
}

function getIdOfShow(shows) {
  let selectId = document.getElementById("shows");
  selectId.addEventListener("change", function () {
    let optionsElements = document.querySelectorAll("option");
    let names = [];
    optionsElements.forEach((option) => names.push(option.value));
    let selectedName = names.filter((name) => selectId.value === name);
    let oneShow = shows.filter((show) => show.name == selectedName);
    //console.log("id: ", oneShow[0].id)
    let id = oneShow[0].id;

    async function catchEpisodes(id) {
      const response = await fetch(
        `https://api.tvmaze.com/shows/${id}/episodes`
      );
      const episodes = await response.json();
      console.log(response);
      //console.log("Hello World");
      makePageForEpisodes(episodes);
      eventInSearchBox(episodes);
      //console.log("Hello World2")
      selectOptionElement(episodes);
    }
    catchEpisodes(id).catch((error) => {
      console.error(error);
    });
  });
}

function setup() {
  //const allEpisodes = [];
  fetch("https://api.tvmaze.com/shows/1632/episodes")
    .then((response) => response.json())
    .then((episodeList) => {
      makePageForEpisodes(episodeList);
      selectOptionElement(episodeList);
      eventInSearchBox(episodeList);
      //console.log(episodeList);
    });
    
  
}

function makePageForEpisodes(episodeList) {
  // create search box
  let section = document.createElement("section");
  rootElem.appendFirstChild(section);
  let divSearchContainer = document.createElement("div");
  divSearchContainer.className = "search";
  section.appendChild(divSearchContainer);

  let divSelectContainer = document.createElement("div");
  divSelectContainer.id = "select-options";
  section.appendChild(divSelectContainer);
  /*
  create drop down list for episodes
  let select = document.createElement("select");
  select.id = "episodes";
  section.appendChild(select);

  let option = document.createElement("option");
  option.value = "non-option";
  option.id = "non-option";
  option.innerText = "All Episodes"
  select.appendChild(option) */

  let inputId = document.createElement("input");
  inputId.type = "text";
  inputId.id = "searchBox";
  inputId.placeholder = "Your search item...";
  section.appendChild(inputId);

  let paragraphID = document.createElement("p");
  paragraphID.id = "paragraph";
  section.appendChild(paragraphID);
  
  rootElem.replaceChildren([]);
  episodeList.forEach(createCard);
  function createCard(episode) {
    let divContainer = document.createElement("div");
    divContainer.setAttribute("class", "container");

    let divName = document.createElement("div");
    divName.setAttribute("class", "name");
    divName.innerText = `S${episode.season
      .toString()
      .padStart(2, "0")}E${episode.number.toString().padStart(2, "0")} - ${
      episode.name
    }`;

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
}



// level 200 addEventListener

function eventInSearchBox(episodes) {
  
  // create addEventListner to input text
  let paragraphID = document.getElementById("paragraph");
  paragraphID.innerText = `Displaying ${episodes.length}/${episodes.length} episodes`;
  let inputId = document.getElementById("searchBox");
  inputId.addEventListener("keyup", function () {
    // create a new array with elements that have been researched
    let searchedContent = episodes.filter(getResearchedEpisodes);
    //console.log(searchedContent)
    function getResearchedEpisodes(episode) {
      if (
        episode.name.toLowerCase().includes(inputId.value.toLowerCase()) ||
        episode.summary.toLowerCase().includes(inputId.value.toLowerCase())
      ) {
        return true;
      }
    }
    makePageForEpisodes(searchedContent);

    // create displaying search (How many episodes mach the text)
    // declare variable to indicate to the div of search bar
    let divSearch = document.querySelector(".search");
    //declare variable to indicate to the p of displaying search
    let paragraphID = document.getElementById("paragraph");

    // create a new p after applying remove each time
    let newResultOfSearch = document.createElement("p");
    newResultOfSearch.setAttribute("id", "paragraph");

    if (inputId.value.length === 0) {
      paragraphID.remove();
      newResultOfSearch.innerText = `Displaying ${searchedContent.length}/${episodes.length} episodes`;
    } else {
      paragraphID.remove();
      newResultOfSearch.innerText = `Displaying ${searchedContent.length}/${episodes.length} episodes`;
    }

    //console.log(inputId.value.length)
    divSearch.appendChild(newResultOfSearch);
  });
}

// level 300 select
// search bar for episodes
function selectOptionElement(episodes) {
  // we refresh the list of searching bar for episodes when we select another title
  /*
  let refreshSelect = document.getElementById("episodes");
  refreshSelect.remove();
  let divSelect = document.getElementById("select-options");
  let selectEl = document.createElement("select");
  selectEl.setAttribute("id", "episodes");
  let option = document.createElement("option");
  option.value = "non-option";
  option.innerText = "All Episodes";
  selectEl.appendChild(option);
  divSelect.appendChild(selectEl);
  */
  let refreshSelect = document.getElementById("episodes");
  refreshSelect.replaceChildren([]);
  
  let nonOption = document.createElement("option");
  nonOption.value = "non-option";
  nonOption.innerText = "All Episodes";
  refreshSelect.appendChild(nonOption)
  // create the options of episodes
  episodes.forEach(createOptionsForEpisodes);
  eventInSelectElement(episodes);
}

function createOptionsForEpisodes(episode) {
  let selectEl = document.getElementById("episodes");
  let newOption = document.createElement("option");
  newOption.value = episode.name;
  /*
  newOption.innerText = `S${episode.season
    .toString()
    .padStart(2, "0")}E${episode.number.toString().padStart(2, "0")} - ${
    episode.name
  }`;
  */
  let seasonNum = episode.season.toString();
  if (seasonNum.length === 1){
    seasonNum = "0" + seasonNum;
  }

  let episodeNum = episode.number.toString()
  if (episodeNum.length === 1){
    episodeNum = "0" + episodeNum;
  }
  newOption.innerText =
    "S" + seasonNum + "E" + episodeNum + " - " + episode.name;
  
  selectEl.appendChild(newOption);
}

function eventInSelectElement(episodes) {
  let selectId = document.getElementById("episodes");

  selectId.addEventListener("change", function () {
    let optionsElements = document.querySelectorAll("option");
    console.log(optionsElements);
    let names = [];
    optionsElements.forEach((option) => names.push(option.value));
    let selectedName = names.filter((name) => selectId.value === name);
    let oneEpisode = episodes.filter((episode) => episode.name == selectedName);

    if (oneEpisode.length === 1) {
      makePageForEpisodes(oneEpisode);
    } else {
      makePageForEpisodes(episodes);
    }
  });
}

window.onload = setup;
