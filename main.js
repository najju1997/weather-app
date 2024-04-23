
const search_btn = document.querySelector(".search-button");
const locationInput = document.querySelector(".search-input");

const info_container_div = document.querySelector(".info-container");
const location_div = document.querySelector("#location-info");
const time_div = document.querySelector("#time-info");
const temp_info_div = document.querySelector("#temp-info");
const condition_info_div = document.querySelector("#condition-info");
const feels_info_div = document.querySelector("#feels-info");



search_btn.addEventListener('click', getWeather); // Add event listener to the search button

async function getWeather() {
    try {
        const error_p = document.querySelector('#error-text');
        const location = document.querySelector(".search-input").value;
        const loadingIcon = document.querySelector('.loading-icon');

        // Show loading icon
        loadingIcon.style.display = 'block';

        const query = await fetch(`http://api.weatherapi.com/v1/current.json?key=a8e69f6b830e4ae7b4624052242304&q=${location}`);

        const info = await query.json();

        if (error_p) {
            info_container_div.removeChild(error_p);
        }

        fillUp(info);

    } catch (error) {
        const error_div = document.createElement('p');
        error_div.id = "error-text";
        error_div.textContent = "Invalid City"; // Display the error message
        info_container_div.appendChild(error_div);
    } finally {
        // Hide loading icon
        const loadingIcon = document.querySelector('.loading-icon');
        loadingIcon.style.display = 'none';

        // Clear the search field
        locationInput.value = '';
    }
}


// Fill data in div after getting the JSON from API
function fillUp(info) {
    const {
        location: { name },
        location: { localtime },
        current: { temp_c, condition: { text }, feelslike_c }
    } = info;

    location_div.textContent = name;
    time_div.textContent = localtime;
    temp_info_div.textContent = `${temp_c}°C`;
    condition_info_div.textContent = text;
    feels_info_div.textContent = `Feels like: ${feelslike_c}°C`;
}
