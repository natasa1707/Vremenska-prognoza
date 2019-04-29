/*** CONFIG ****/

const currentCity = document.getElementById('current-city');
const citiesSR = ['Beograd', 'Ljubljana', 'Skoplje', 'Sarajevo', 'Zagreb', 'Podgorica'];
const citiesId = [792680, 3196359, 785842, 3191281, 3337532, 3193044];

const city = document.getElementsByClassName('city');
const todayDetails = document.getElementById('today-details');
const apiKey = 'APPID=3e182224c9ad92c8e0e3a37269ecc247';
// const apiKey = 'APPID=f3244c91de515a8afa5193b51dba61d0'; // reserve
const cors = 'https://cors-anywhere.herokuapp.com';

/***** FUNCTIONS *****/

function exactTime() {
    const clock = document.getElementById('exact-time');
    const t = new Date();
    let h = t.getHours();
    let m = t.getMinutes();
    let s = t.getSeconds();
    h = (h < 10 ? '0' : '') + h;
    m = (m < 10 ? '0' : '') + m;
    s = (s < 10 ? '0' : '') + s;
    clock.textContent = `${h}:${m}:${s}`;
}
setInterval(exactTime, 1000);

// onload shows the forecast for Belgrade
(function forecastForBelgrade(){
    todayDetails.style.display = 'none';
    currentCity.innerHTML = citiesSR[0];

    // API data for Belgrade
    getAPIDay(citiesId[0]);
    getAPIWeek(citiesId[0]);
}());

// forecast for a selected city from the drop-down menu
for (let i = 0; i < city.length; i++) {
    const dropdownHide = document.getElementById('hide');
    const dropdownShow = document.getElementById('show');
    city[i].onclick = function () {
        dropdownHide.style.display = 'none';
        dropdownShow.onmouseenter = function () {
            dropdownHide.style.display = 'block';
        };
        dropdownHide.onmouseleave = function () {
            dropdownHide.style.display = 'none';
        };

        todayDetails.style.display = 'none';

        currentCity.innerHTML = citiesSR[i];

        // API data for cities
        getAPIDay(citiesId[i]);
        getAPIWeek(citiesId[i]);
    };
}

// API data for today
function getAPIDay(town) {
    const dayName = document.getElementById('day');
    const currentDate = document.getElementById('date');
    const tempC = document.getElementById('degrees');
    const wetherIcon = document.getElementById('condition-icon');

    $.getJSON(`${cors}/https://api.openweathermap.org/data/2.5/weather?id=${town}&${apiKey}`,
        function (info) {
            console.log(info);
            dayName.innerHTML = timeDay(info.dt);
            currentDate.innerText = timeDate(info.dt);
            tempC.innerHTML = celsius(info.main.temp);
            wetherIcon.innerHTML = icon(info.weather[0].icon, info.weather[0].description);
            condition(info.weather[0].id);
            detailsForToday(info);
            backgroundImage(info.sys.sunrise, info.sys.sunset, town);
        });
}

// API data for the next 5 days
function getAPIWeek(town) {
    $.getJSON(`${cors}/https://api.openweathermap.org/data/2.5/forecast?id=${town}&${apiKey}`,
        function (data) {
            console.log(data);
            let dataList = data.list;
            let newList = [];
            // next days forecast for noon
            for (let i in dataList) {
                if (+(data.list[i].dt_txt.split(' ')[1]).split(':')[0] === 12) {
                    newList.push(data.list[i]);
                }
            }
            weeklyForecast(newList);
        });
}

// day of the week
function timeDay(dataT){
    let dateMS = new Date(dataT * 1000);
    const days = ['Nedelja','Ponedeljak','Utorak','Sreda','Četvrtak','Petak','Subota'];
    return days[dateMS.getDay()];
}

// current date
function timeDate(dataTD){
    let datumMS = new Date(dataTD * 1000);
    let dd = datumMS.getDate();
    let mm = datumMS.getMonth() + 1;
    let yy = datumMS.getFullYear();
    return `${dd}.${mm}.${yy}.`;
}

// degrees in C
function celsius(dataK) {
    return `${(dataK - 273.15).toFixed()}°C`;
}

// condition icon
function icon(dataIcon1, dataIcon2){
    return `<img src='images/icons/${dataIcon1}.png' alt='${dataIcon2}'>`;
}

// a brief description of the weather conditions
function condition(dataC){
    const innerCondition = document.getElementById('condition-text');
    $.getJSON('conditions.json',
    function(id){
        for (let j in id) {
            if (dataC == j) {
                innerCondition.innerText = id[j].label;
                break;
            }
        }
    });
}

// sunrise & sunset
function sun(dataSun) {
    let hours = (Math.ceil(dataSun / 3600) % 24) + 1;
    let minutes = Math.floor(dataSun / 60) % 60;

    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;

    return `${hours}:${minutes}`;
}

function detailsForToday(dataD){
    const sliderToday = document.getElementById('slider-today');
    sliderToday.onclick = function(){
        todayDetails.style.display = 'flex';
        todayDetails.innerHTML = `<div>
        <div class='today-p flexbox'>
            <img src='images/icons/humidity.png' alt='vlaznost'>
            <span>${dataD.main.humidity} %</span>
        </div>
        <div class='today-p flexbox'>
            <img src='images/icons/wind.png' alt='vetar'>
            <span>${dataD.wind.speed} m/s</span>
        </div>
        <div class='today-p flexbox'>
            <img src='images/icons/pressure.png' alt='pritisak'>
            <span>${dataD.main.pressure} mb</span>
        </div>
    </div>
    <div>
        <div class='today-p flexbox'>
            <img src='images/icons/visibility.png' alt='izlazak_sunca'>
            <span>${Math.round(dataD.visibility/1000)} km</span>
        </div>
        <div class='today-p flexbox'>
            <img src='images/icons/sunrise.png' alt='zalazak_sunca'>
            <span>${sun(dataD.sys.sunrise)}</span>
        </div>
        <div class='today-p flexbox'>
            <img src='images/icons/sunset.png' alt='sunset'>
            <span>${sun(dataD.sys.sunset)}</span>
        </div>
    </div>`;
    };
}

function weeklyForecast(dataW) {
    const sliderFive = document.getElementById('slider-five');
    const weeklyModal = document.getElementById('modal');
    const weeklyDetails = document.getElementById('weekly-details');

    sliderFive.onclick = function () {
        weeklyDetails.innerHTML = ' ';
        weeklyModal.style.display = 'block';
        for (let i = 0; i < dataW.length; i++) {
            weeklyDetails.innerHTML += `<div class='five-days-p center borders'>
            <p>${timeDay(dataW[i].dt).slice(0, 3).toUpperCase()}</p>
            <p>${(timeDate(dataW[i].dt).split('.')).slice(0, 2).join('.')}.</p>
            <p>${icon(dataW[i].weather[0].icon, dataW[i].weather[0].desription)}</p>
            <p>${celsius(dataW[i].main.temp)}</p>
        </div>`;
        }
    };
    const close = document.getElementsByClassName("close")[0];
    close.onclick = function () {
        weeklyModal.style.display = "none";
    }
    window.onclick = function (event) {
        if (event.target == weeklyModal) {
            weeklyModal.style.display = "none";
        }
    }
}

function backgroundImage(dataSunrise, dataSunset, cityName) {
    let s = (new Date().getTime() / 1000).toFixed();
    if (s > +dataSunrise+3600 && s < +dataSunset+3600) {
        document.body.style.backgroundImage = `url('images/background-day/${cityName}.jpg')`;
    } else {
        document.body.style.backgroundImage = `url('images/background-night/${cityName}-n.jpg')`;
    }
}