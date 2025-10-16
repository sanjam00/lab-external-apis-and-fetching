// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

function fetchWeatherAlerts(state) {

    fetch(`https://api.weather.gov/alerts/active?area=${state}`)
        .then(function (response) { //how you accept a positive result from fetch
            return response.json()
        })
        .then(function (data) {
            console.log(data)
            displayAlerts(data)
        })
        .catch(function (error) { //handles a negative result
            const errorMessage = document.getElementById("error-message")
            errorMessage.textContent = error.message
            errorMessage.classList.remove('hidden');
            console.error("Error occured fetching data:", error)
        })

}

function displayAlerts(data) {
    const errorMessage = document.getElementById("error-message")
    errorMessage.classList.add('hidden');
    errorMessage.textContent = ""
    
    const titleElement = document.createElement('p')
    titleElement.textContent = `${data.title}: ${data.features.length}`

    // console.log(titleElement.textContent);

    const alertsDisplay = document.getElementById("alerts-display")

    alertsDisplay.append(titleElement);
    // console.log(alertsDisplay);

    const featuresList = document.createElement("ul")

    data.features.forEach((feature) => {
        const newFeature = document.createElement("li")
        newFeature.textContent = feature.properties.headline
        featuresList.append(newFeature);
    })

    alertsDisplay.append(featuresList);

}

const button = document.querySelector("button")
button.addEventListener("click", () => {
    const input = document.getElementById("state-input").value
    fetchWeatherAlerts(input);
    document.getElementById("state-input").value = "" //clears the input bar after each submit

})