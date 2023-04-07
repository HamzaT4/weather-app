const findBtn = document.querySelector(".find-button");
const locationName = document.querySelector('.location-name');
const tempElement = document.querySelector('.temp');
const condElement = document.querySelector('.cond');
const windElement = document.querySelector('.wind');
const humElement = document.querySelector('.hum');
const searchBar = document.querySelector('.find-bar');
const toggleBtn = document.querySelector('.temp-toggle');
const bodyElement = document.querySelector('body');
const loadingIcon = document.querySelector('.fa-spinner');
let tempUnit='C';
let finalData = {};



async function fetchApiWeather(location) {
    
    try {
        loadingIcon.style.visibility='visible';
    let apiResponse = await fetch(`https://api.weatherapi.com/v1/current.json?key=90c6a74a7fe1444cb73153941230504&q=${location}&aqi=no`); 
    let weatherData = await apiResponse.json();
    if (!apiResponse.ok) {
        throw new Error(weatherData.error.message);
    }
    console.log(weatherData);
    return weatherData;
    } catch (error) {
        console.error(error);
        return '';
    } finally{
        loadingIcon.style.visibility='hidden';
    }
    
}

(async () => {
	await getWeatherData('jordan');
    displayData();
})();





async function getWeatherData(loc) {
    const apiObject = await fetchApiWeather(loc);
    if (!apiObject==''){
        let country =apiObject.location.country;
        let city = apiObject.location.name;
        let tempC =  apiObject.current.temp_c;
        let tempF = apiObject.current.temp_f;
        let hum = apiObject.current.humidity;
        let isDay = apiObject.current.is_day;
        let wind = apiObject.current.wind_kph;
        let condition = apiObject.current.condition.text;
        console.log(apiObject);
        finalData =  {  country, city, tempC, tempF,  hum , isDay ,wind ,condition};
    }
    
    else if (apiObject==''){
        finalData= 'Please enter a real country';
    }
 
}


findBtn.addEventListener('click',async ()=>{
    await getWeatherData(searchBar.value);
     displayData();
});

searchBar.addEventListener('keypress',async (e)=>{

    if (e.keyCode === 13) {
    await getWeatherData(searchBar.value);
     displayData();
    }
    

});


function displayData() {

    if (typeof finalData == 'object') {

        locationName.textContent=`${finalData.city},${finalData.country}`;
        tempUnit == 'C' ? tempElement.textContent=`${finalData.tempC} °C` : tempElement.textContent=`${finalData.tempF} °F`
        condElement.textContent =  finalData.condition;
        humElement.textContent = "Humidity: " + finalData.hum+"%";
        windElement.textContent = "Wind: " +finalData.wind + " kph";
        finalData.isDay == 0 ? bodyElement.style.backgroundImage= "url('https://wallpaperaccess.com/full/682419.jpg')" :  bodyElement.style.backgroundImage= "url('https://wallpaperaccess.com/full/456182.jpg')";





    } else {
        locationName.innerHTML=`<h3>${finalData}</h3>`;
        condElement.textContent =  '';
        humElement.textContent = "";
        windElement.textContent = "";
        tempElement.textContent=``
        
    }
   
    
    
}

toggleBtn.addEventListener('click',tempToggle)

function tempToggle() {
    tempUnit == 'C'? tempUnit='F':tempUnit='C';
    tempUnit == 'C'? toggleBtn.innerHTML="<p>°F</p>":toggleBtn.innerHTML="<p>°C</p>";     ;
    displayData();
}

 



