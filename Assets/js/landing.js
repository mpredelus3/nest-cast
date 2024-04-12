const API_KEY = 'U0SqW35wEiSrMcVOGMHfmtu2p4WMQaJgZZU6rAG1';
const urlParams = new URLSearchParams(window.location.search);
const parkCode = urlParams.get('parkCode');

// Fetch park details using park code
fetch(`https://developer.nps.gov/api/v1/parks?parkCode=${parkCode}&api_key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
        const park = data.data[0]; // Assuming only one park is returned
        // Populate the page with park details
        const parkDetailsDiv = document.getElementById("parkDetails");
        const parkDetailsBlock = document.createElement("div");
        parkDetailsBlock.innerHTML = `
            <h2>${park.fullName}</h2>
            <p>${park.description}</p>
            <!-- Add more details as needed -->
        `;
        parkDetailsDiv.appendChild(parkDetailsBlock);
    })
    .catch(error => {
        console.error('Error fetching park data:', error);
    });