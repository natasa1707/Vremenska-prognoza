## Naziv projekta: Vremenska prognoza glavnih gradova zemalja bivše Jugoslavije

## Tip projekta: Završni projekat obuke za Front-End web programiranje

## Opis:

Sajt Vremenska prognoza je ono što sam naslov kaže, sajt koji prikazuje informacije o vremenskoj prognozi za glavne gradove bivše Jugoslavije.

## Kako se koristi:

- Prilikom učitavanja stranice prikazuje se kakvo će vreme biti danas u Beogradu.
- Korisnik može iz padajućeg menija “Izaberite grad” da izabere grad koji želi, a zatim će aplikacija prikazati podatke o vremenskoj prognozi tog grada.
-Osnovne karakteristike koje se prikazuju su: tačno vreme, datum, trenutna temperatura, ikonica koja opisuje vremenske uslove i kratak opis vremenskih uslova.
- Klikom na ikonicu  <img src="images/icons/today.png" alt="day" width="30px">prikazuju se detaljnije informacije prognoze za današnji dan: vlažnost vazduha, brzina vetra, vazdušni pritisak, vidljivost, vreme izlaska i zalaska sunca.
- Klikom na ikonicu <img src="images/icons/week.png" alt="week" width="30px"> otvara se modalni prozor i prikazuje se vremenska prognoza za narednih 5 dana u podne. Prikazuju se dan, datum, ikonica koja opisuje vremenske uslove i temperatura.

**Dodatni opis:**

Pozadinska slika aplikacije se menja u zavisnosti od izabranog grada, za vremensku prognozu za Beograd, prikazuje se pozadinska slika Beograda.

Ukoliko korisnik proverava vremenske uslove nakon zalaska sunca, pozadinska slika će biti slika izabranog grada noću.

## Ikonice
Korišćene ikonice za prikaz vremenskih uslova:

<img src="https://i.imgur.com/7xUrigP.jpg" alt="icons" width="50%">

## Struktura sajta:
Sajt se sastoji od jedne web stranica.
Sadrži sledeće elemente:
- Naslov (caption)
- Padajući meni (dropdown menu)
- Sadržaj:
    1. današnja prognoza (weather)
    2. detaljnije informacije o današnjoj prognozi (today)
    3. prognoza za narednih 5-dana (modalni prozor) 
- Klik za detalje (report)
- Footer
- Pozadina (background)

## Korišćene tehnologije:
* HTML
* CSS
* JavaScript
* JQuery
* JSON


## JSON fajl – conditions.json
Kreiran json fajl, objekat koji sadrži parove kodova vremenskih uslova i prevod stanja, kako bi vremenski uslovi bili prikazani na našem jeziku.

## OpenWeatherMap API
Vremenska prognoza kao izvor informacija koristi OpenWeatherMap API (https://openweathermap.org/api).
Za dobijanje vremenskih podataka za određeni grad u JSON-u, korišćeni su jedinstveni identifikacioni brojevi gradova.
OpenWeatherMap API vraća JSON objekat koji sadrži niz prognoza za danas i narednih 5 dana.

## Responzivni dizajn:
Prezentacija je optimizovana za prikaz na različitim veličinama ekrana.

## SEO
Za ovaj sajt urađena je osnovna optimizacija sajta za pretraživače – SEO (title, meta description i meta keywords).

