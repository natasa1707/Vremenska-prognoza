# Vremenska-prognoza
<hr>
<b>Naziv projekta:</b> Vremenska prognoza glavnih gradova zemalja bivše Jugoslavije
<br>
<b>Tip projekta:</b> Završni projekat obuke za Front-End web programiranje
<hr>
<b>Opis</b>
<br>
<p>Sajt Vremenska prognoza je ono što sam naslov kaže, sajt koji prikazuje informacije o vremenskoj prognozi za glavne gradove bivše Jugoslavije.</p> 
<b>Kako se koristi:</b>
<ul>
<li>Prilikom učitavanja stranice prikazuje se kakvo će vreme biti danas u Beogradu.</li>
<li>Korisnik može iz padajućeg menija “Izaberite grad” da izabere grad koji želi, a zatim će aplikacija prikazati podatke o vremenskoj prognozi tog grada.</li>
<li>Osnovne karakteristike koje se prikazuju su: tačno vreme, datum, trenutna temperatura, ikonica koja opisuje vremenske uslove i kratak opis vremenskih uslova.</li>
<li>Klikom na ikonicu  <img src="images/icons/today.png" alt="day" width="20px">prikazuju se detaljnije informacije prognoze za današnji dan: vlažnost vazduha, brzina vetra, vazdušni pritisak, vidljivost, vreme izlaska i zalaska sunca.</li>
<li>Klikom na ikonicu <img src="images/icons/week.png" alt="week" width="20px"> otvara se modalni prozor i prikazuje se vremenska prognoza za narednih 5 dana u podne. Prikazuju se dan, datum, ikonica koja opisuje vremenske uslove i temperatura.</li>
</ul>
<b>Dodatni opis:</b>	
<p>Pozadinska slika aplikacije se menja u zavisnosti od izabranog grada, za vremensku prognozu za Beograd, prikazuje se pozadinska slika Beograda.
Ukoliko korisnik proverava vremenske uslove nakon zalaska sunca, pozadinska slika će biti slika izabranog grada noću.</p>
<hr>
<b>Ikonice</b>
<p>Korišćene ikonice za prikaz vremenskih uslova:</p>
<img src="https://i.imgur.com/7xUrigP.jpg" alt="icons" width="50%">
<hr>
<b>Struktura sajta:</p>
<p>Sajt se sastoji od jedne web stranica.</p>
<p>Sadrži sledeće elemente:</p>
<ul>
<li>Naslov (caption)</li>
<li>Padajući meni (dropdown menu)</li>
<li>Sadržaj:
    <ol>
        <li>današnja prognoza (weather)</li>
        <li>detaljnije informacije o današnjoj prognozi (today)</li>
        <li>prognoza za narednih 5-dana (modalni prozor)</li> 
    </ol>
</li>
<li>Footer</li>
<li>Pozadina (background)</li>
</ul>
<hr>
<B>Korišćene tehnologije:</B>
<ul>
<li>HTML</li>
<li>CSS</li>
<li>JavaScript</li>
<li>JQuery</li>
<li>JSON</li>
</ul>
<hr>
<b>JSON fajl – conditions.json</b>
<p>Kreiran json fajl, objekat koji sadrži parove kodova vremenskih uslova i prevod stanja, kako bi vremenski uslovi bili prikazani na našem jeziku.</p>
<hr>
<b>OpenWeatherMap API</b>
<p>Vremenska prognoza kao izvor informacija koristi OpenWeatherMap API (https://openweathermap.org/api).
Za dobijanje vremenskih podataka za određeni grad u JSON-u, korišćeni su jedinstveni identifikacioni brojevi gradova.</p>
<p>OpenWeatherMap API vraća JSON objekat koji sadrži niz prognoza za danas i narednih 5 dana.</p>
<hr>
<b>Responzivni dizajn:</b>
<p>Prezentacija je optimizovana za prikaz na različitim veličinama ekrana.</p>
<hr>
<b>SEO</b>
<p>Za ovaj sajt urađena je osnovna optimizacija sajta za pretraživače – SEO (title, meta description i meta keywords).</p>

