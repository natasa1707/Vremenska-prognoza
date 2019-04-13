// tačno vreme
const sat = document.getElementById('tacno-vreme');

setInterval(function() {
const danas = new Date();
let h = danas.getHours();
let m = danas.getMinutes();
let s = danas.getSeconds();
h = (h < 10 ? '0' : '') + h;
m = (m < 10 ? '0' : '') + m;
s = (s < 10 ? '0' : '') + s;
sat.textContent = `${h}:${m}:${s}`;
}, 1000);

let danasnjiDan = document.getElementById("dan");
let danasnjiDatum = document.getElementById("datum");


// PROGNOZA 
let trenutniGrad = document.getElementById("trenutni-grad");
let gradoviSRP = ["Beograd", "Ljubljana", "Skoplje", "Sarajevo", "Zagreb", "Podgorica"];
let gradoviEN = ["Belgrade,RS", "Ljubljana,SI", "Skopje,MK", "Sarajevo,BA", "Zagreb,HR", "Podgorica,ME"];

let grad = document.getElementsByClassName('grad');

// ucitavanjem stranice prikazuje se prognoza za Beograd
window.onload = function(){
    // Beograd
    trenutniGrad.innerHTML = gradoviSRP[0];
    // pozadina za Beograd
    document.body.style.backgroundImage = `url("images/background-gradovi/${gradoviSRP[0]}.jpg")`
    // podaci sa API-ja za Beograd
    getAPIDay(gradoviEN[0])
    getAPI(gradoviEN[0])
}

// izborom drugog grada iz padajućeg menija prikazuje se prognoza za taj grad
for (let i in grad) {
    grad[i].onclick = function () {
        document.getElementById("sakrij").style.display = "none";
        document.getElementById("prikazi").onmouseenter = function(){
            document.getElementById("sakrij").style.display = "block";
        };
        document.getElementById("sakrij").onmouseleave = function(){
            document.getElementById("sakrij").style.display = "none";
        };
      
        // GRAD
        trenutniGrad.innerHTML = gradoviSRP[i];
        //POZADINA ZA GRAD
        document.body.style.backgroundImage = `url("images/background-gradovi/${gradoviSRP[i]}.jpg")`;
        // ubacivanje podataka sa API-ja
        getAPIDay(gradoviEN[i])
        getAPI(gradoviEN[i])
    }
}


// funkcija za prikupljanje podataka sa API
const apiKey = 'APPID=f3244c91de515a8afa5193b51dba61d0';
function getAPIDay(city){
    $.getJSON(`http://api.openweathermap.org/data/2.5/weather?q=${city}&${apiKey}`,
        function(info){
            console.log(info)
            time(info.dt);
            celsius(info.main.temp)
            icon(info.weather[0].icon)
            stanje(info.weather[0].id)
            danasDetails(info)
            
        });
}

function getAPI(city) {
    $.getJSON(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&${apiKey}`,
        function (data) {
            console.log(data)
           

        });
        
}

function time(podatakT){
    let datumMS = new Date(podatakT * 1000);
    const days = ['Nedelja','Ponedeljak','Utorak','Sreda','Četvrtak','Petak','Subota'];
    danasnjiDan.innerHTML = days[datumMS.getDay()];
       
    let dd = datumMS.getDate();
    let mm = datumMS.getMonth() + 1;
    let yy = datumMS.getFullYear();
    danasnjiDatum.innerText = `${dd}.${mm}.${yy}.`;
}

//stepeni u C
let tempC = document.getElementById('stepeni');
function celsius(podatakK){
            let tempK = podatakK;
            tempC.innerText = `${(tempK - 273.15).toFixed()}°C`;
}

// ikonica
let wetherIcon = document.getElementById('stanje-ikonica');
function icon(podatakI){
    let description = podatakI;
    wetherIcon.innerHTML = `<img src="images/icons/${podatakI}.png" alt="${description}">`;
}

// kratak opis vremenskih uslova
let innerDescription = document.getElementById('stanje-tekst');
function stanje(podatakS){
    $.getJSON('conditions.json',
    function(id){
        for (let i in id) {
            if (podatakS == i) {
                innerDescription.innerText = id[i].label;
                break;
            }
        }
    })
}
let slideToday = document.getElementById("slide-today");
let slideFive = document.getElementById("slide-five");
document.getElementById("danas-detalji").style.display = "none";

function danasDetails(podatakD){
    slideToday.onclick = function(){
        console.log(podatakD.sys.sunrise)
        document.getElementById("danas-detalji").style.display = "flex";
        document.getElementById("danas-detalji").innerHTML = `<div>
        <div class="danas-p">
            <img src="images/icons/humidity.png" alt="vlaznost">
            <span id="vlaznost">${podatakD.main.humidity} %</span>
        </div>
        <div class="danas-p">
            <img src="images/icons/wind.png" alt="vetar">
            <span id="vetar">${podatakD.wind.speed} m/s</span>
        </div>
        <div class="danas-p">
            <img src="images/icons/pressure.png" alt="pritisak">
            <span id="pritisak">${podatakD.main.pressure} mb</span>
        </div>
    </div>
    <div>
        <div class="danas-p">
            <img src="images/icons/sunrise.png" alt="sunrise">
            <span id="izlazak">${izlazakSunca(podatakD.sys.sunrise)}</span>
        </div>
        <div class="danas-p">
            <img src="images/icons/sunset.png" alt="sunset">
            <span id="zalazak">${zalazakSunca(podatakD.sys.sunset)}</span>
        </div>
    </div>`

    }

}

// izlazak sunca
function izlazakSunca(podatakSunrise){
    let hours = (Math.ceil(podatakSunrise / 3600) % 24) + 1;
    let minutes = Math.floor(podatakSunrise / 60) % 60;
    
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    
    return `${hours}:${minutes}`;
}

// zalazak sunca
function zalazakSunca(podatakSunset){
    let hours = (Math.ceil(podatakSunset / 3600) % 24) + 1;
    let minutes = Math.floor(podatakSunset / 60) % 60;
    
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    
    return `${hours}:${minutes}`;
}







