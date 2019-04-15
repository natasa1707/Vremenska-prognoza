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
let danasDetaljnije = document.getElementById("danas-detalji");
let naredniDetaljnije = document.getElementById("naredni-detaljnije");
let tempC = document.getElementById('stepeni'); // temperetura u C u prvom DIV-u
let wetherIcon = document.getElementById('stanje-ikonica'); // ikonica u prvom DIV-u

// ucitavanjem stranice prikazuje se prognoza za Beograd
window.onload = function(){
    //sakrij div danas-detaljnije
    danasDetaljnije.style.display = "none";

    //sakrij div naredni-detaljnije
    naredniDetaljnije.style.display = "none";
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

        //sakrij danas-detaljnije
        danasDetaljnije.style.display = "none";
         //sakrij div naredni-detaljnije
         naredniDetaljnije.style.display = "none";
          
      
        // GRAD
        trenutniGrad.innerHTML = gradoviSRP[i];
        //POZADINA ZA GRAD
        document.body.style.backgroundImage = `url("images/background-gradovi/${gradoviSRP[i]}.jpg")`;
        // ubacivanje podataka sa API-ja
        getAPIDay(gradoviEN[i])
        getAPI(gradoviEN[i])
    }
}


// funkcija za prikupljanje podataka sa API za danasnji dan
const apiKey = 'APPID=f3244c91de515a8afa5193b51dba61d0';
function getAPIDay(city){
    $.getJSON(`https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?q=${city}&${apiKey}`,
        function(info){
            console.log(info)
            danasnjiDan.innerHTML = timeDay(info.dt)
            danasnjiDatum.innerText = timeDate(info.dt);
            tempC.innerHTML = celsius(info.main.temp)
            wetherIcon.innerHTML = icon(info.weather[0].icon, info.weather[0].description);
            stanje(info.weather[0].id)
            danasDetails(info)
            
        });
}

// funkcija za prikupljanje podataka sa API za narednih 5 dana
function getAPI(city) {
    $.getJSON(`https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/forecast?q=${city}&${apiKey}`,
        function (data) {
            console.log(data)
            naredniDetails(data)
           

        });
        
}

// dan u nedelji
function timeDay(podatakT){
    let datumMS = new Date(podatakT * 1000);
    const days = ['Nedelja','Ponedeljak','Utorak','Sreda','Četvrtak','Petak','Subota'];
    return days[datumMS.getDay()];
}

// dan u nedelji ** skraceno
function timeDay2(podatakT){
    let datumMS = new Date(podatakT * 1000);
    const days = ['NED','PON','UTO','SRE','ČET','PET','SUB'];
    return days[datumMS.getDay()];
}
// datum
function timeDate(podatakTD){
    let datumMS = new Date(podatakTD * 1000);
    let dd = datumMS.getDate();
    let mm = datumMS.getMonth() + 1;
    let yy = datumMS.getFullYear();
    return `${dd}.${mm}.${yy}.`;
}

// datum ** skraceno
function timeDate2(podatakTD){
    let datumMS = new Date(podatakTD * 1000);
    let dd = datumMS.getDate();
    let mm = datumMS.getMonth() + 1;
    let yy = datumMS.getFullYear();
    return `${dd}.${mm}.`;
}

//stepeni u C
function celsius(podatakK){
            let tempK = podatakK;
            return `${(tempK - 273.15).toFixed()}°C`;
}

// ikonica
function icon(podatakI1, podatakI2){
    return `<img src="images/icons/${podatakI1}.png" alt="${podatakI2}">`;
}


// kratak opis vremenskih uslova
let innerDescription = document.getElementById('stanje-tekst');
function stanje(podatakS){
    $.getJSON("conditions.js",
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


function danasDetails(podatakD){
    slideToday.onclick = function(){
        naredniDetaljnije.style.display = "none";
        danasDetaljnije.style.display = "flex";
        danasDetaljnije.innerHTML = `<div>
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
            <img src="images/icons/visibility.png" alt="sunrise">
            <span id="izlazak">${Math.round(podatakD.visibility/1000)} km</span>
        </div>
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

function naredniDetails(podatakN){
    slideFive.onclick = function(){
        naredniDetaljnije.innerHTML = " ";
        danasDetaljnije.style.display = "none";
        naredniDetaljnije.style.display = "flex";
        for(let i = 7; i < podatakN.list.length; i += 8){
            naredniDetaljnije.innerHTML += `<div class="naredni-dani-p">
            <p>${timeDay2(podatakN.list[i].dt)}</p>
            <p>${timeDate2(podatakN.list[i].dt)}</p>
            <p>${icon(podatakN.list[i].weather[0].icon, podatakN.list[i].weather[0].desription)}</p>
            <p>${celsius(podatakN.list[i].main.temp)}</p>
        </div>`
        }

    }
}







