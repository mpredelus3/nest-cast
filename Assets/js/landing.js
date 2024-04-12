// landing.js
// variables to link api key, and values
const API_KEY = 'U0SqW35wEiSrMcVOGMHfmtu2p4WMQaJgZZU6rAG1';
const parksPerPage = 20;
let currentPage = 1;
let totalPages = 0;

// function to pull the park information using the state code from the national park api
function fetchParks() {

  // takes input from search bar and return with an alert if the state code is not valid
  const stateCode = document.getElementById("stateInput").value.trim().toUpperCase();
  if (!stateCode) {
    alert("Please enter a valid state code.");
    return;
  }

  // variable that selects parks list and clears the old data
  const parkList = document.getElementById("parks");
  parkList.innerHTML = ""; // Clear previous list

  const offset = (currentPage - 1) * parksPerPage;

  // fetches the api data for state parks using the state code, and appends data to page
  fetch(`https://developer.nps.gov/api/v1/parks?stateCode=${stateCode}&limit=${parksPerPage}&start=${offset}&api_key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
      data.data.forEach(park => {
        const listItem = document.createElement("li");
        listItem.textContent = park.fullName;
        parkList.appendChild(listItem);
      });
      totalPages = Math.ceil(data.total / parksPerPage);
      updatePaginationButtons();
    })
    .catch(error => {
      console.error('Error fetching park data:', error);
    });
}

// creates buttons to show other results if there are more than 20 parks
function updatePaginationButtons() {
  const prevButton = document.getElementById("prevPage");
  const nextButton = document.getElementById("nextPage");

  prevButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage === totalPages;
}

// lets page count down by 1 when previous button is selected
document.getElementById("prevPage").addEventListener("click", function() {
  if (currentPage > 1) {
    currentPage--;
    fetchParks();
  }
});

// lets page count up by 1 when next button is selected
document.getElementById("nextPage").addEventListener("click", function() {
  if (currentPage < totalPages) {
    currentPage++;
    fetchParks();
  }
});

// Initialize the map (you can use any map library such as Leaflet, Google Maps, etc.)
// For simplicity, we're not including a real map here, just a placeholder
document.getElementById("map").innerHTML = "Map of the United States";

