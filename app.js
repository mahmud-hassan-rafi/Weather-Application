const imgStatus = document.querySelector("#imgStatus");
const temp = document.querySelector("#temp");
const nowButton = document.querySelector("#now");
const input = document.querySelector("#inp");
const button = document.querySelector("#searchBtn");
const statusIcon = document.querySelector(".section1 li img")
const address = document.querySelector("#location");
const status_text = document.querySelector("#status");
const infoSection = document.querySelector("#infoSection");

const apiKey = "46695e0320b14c229c754828251108"
let city = "dhaka";


async function getWeather() {
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;
    try {
        let request = await axios.get(url);
        return request.data;
    } catch (err) {
        console.log("your error: ", err);
        alert("No Location Found!");
        input.value = "";
        return null;
    }
}



async function setWeatherInDisplay() {
    let weather = await getWeather();

    if (!weather) return;

    let weatherIcon = weather.current.condition.icon;
    let temparature = weather.current.temp_c;
    let api_status = weather.current.condition.text;

    if ((city.toLowerCase() == weather.location.country.toLowerCase())) {
        address.style.fontSize = "16px";
        address.innerText = weather.location.country;

    } else {
        address.style.fontSize = "14px";
        address.innerText = `${weather.location.name}, ${weather.location.country}`;
    }

    statusIcon.setAttribute("src", weatherIcon);
    temp.innerText = `${temparature}°`;
    status_text.innerText = api_status;

    input.value = ""
    console.log(weather);
}


// button.addEventListener("click", () => {
//     setWeatherInDisplay();
// })

document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    city = input.value.trim();
    setWeatherInDisplay();
})

setWeatherInDisplay();