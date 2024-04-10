// landing.js

const API_KEY = 'U0SqW35wEiSrMcVOGMHfmtu2p4WMQaJgZZU6rAG1';
const parksPerPage = 20;
let currentPage = 1;
let totalPages = 0;

function fetchParks() {
  const stateCode = document.getElementById("stateInput").value.trim().toUpperCase();
  if (!stateCode) {
    alert("Please enter a valid state code.");
    return;
  }

  const parkList = document.getElementById("parks");
  parkList.innerHTML = ""; // Clear previous list

  const offset = (currentPage - 1) * parksPerPage;

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

function updatePaginationButtons() {
  const prevButton = document.getElementById("prevPage");
  const nextButton = document.getElementById("nextPage");

  prevButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage === totalPages;
}

document.getElementById("prevPage").addEventListener("click", function() {
  if (currentPage > 1) {
    currentPage--;
    fetchParks();
  }
});

document.getElementById("nextPage").addEventListener("click", function() {
  if (currentPage < totalPages) {
    currentPage++;
    fetchParks();
  }
});

// Initialize the map (you can use any map library such as Leaflet, Google Maps, etc.)
// For simplicity, we're not including a real map here, just a placeholder
document.getElementById("map").innerHTML = "Map of the United States";

