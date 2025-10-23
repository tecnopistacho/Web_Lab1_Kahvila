// Vk 6 - import all classes
import { Drink } from './models/Drink.js';
import { Food } from './models/Food.js';
import { Order } from './models/Order.js';
import { MenuService } from './services/MenuService.js';
import { Currency } from './utils/Currency.js';
import { ValidationError } from './utils/Errors.js';



// Osa A - Lämmittely - muuttujat ja funktio
console.log('Hei, JavaScript on nyt käytössä.'); // Tervehdys

// Tuotteen muuttujat
const tuoteNimi = 'Cortado';
const tuoteHinta = '2.50 €';

// Yhteenveto funktio
function teeYhteenveto(nimi, hinta) {
    return `${nimi} - ${hinta}`;
}

console.log(teeYhteenveto(tuoteNimi, tuoteHinta)); // Output


// Osa B - DOM sisällön muokkaus
// Lisätään tämän päivän päivämäärä etusivun otsikkoon (h1)
const otsikko = document.querySelector('h1');
if (otsikko) {
    const paiva = new Date().toLocaleDateString('fi-FI');
    otsikko.textContent += ' - ' + paiva;
}

// Lisätään numerot kortille, esim. 1. Paella, 2. Gazpacho jne. 
document.querySelectorAll('.card').forEach((el,i) => {
    const otsikko = el.querySelector('h3');
    if(otsikko) {
        otsikko.textContent = `${i + 1}. ${otsikko.textContent}`;
    }
});

// Lisätään uusi kappale (p) .container:n alle
const yhteenveto = teeYhteenveto(tuoteNimi, tuoteHinta);
const p = document.createElement('p');
p.textContent = 'Yhteenveto: ' + yhteenveto;
document.querySelector('.container')?.appendChild(p);


// Osa C - Tapahtumat ja interaktiot
// Näytä/Piilota
document.getElementById('toggleCards')?.addEventListener('click', () => {
    const cards = document.querySelector('.cards');
    if (cards) {
        cards.hidden = !cards.hidden;
    }
});

// Korosta
document.getElementById('korosta')?.addEventListener('click', () => {
    const ekaKortti = document.querySelector('.card');
    ekaKortti?.classList.toggle('highlight');
})


// Osa D - Lomake kevyt validointi
const form = document.querySelector('form#tilaus');
if (form) {
    const msg = document.createElement('p');
    form.prepend(msg);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const virheet = [];

        const nimi = form.querySelector('input[name="nimi"]')?.value.trim();
        const email = form.querySelector('input[name="email"]')?.value.trim();
        const valinta = form.querySelector('input[name="tuote"]')?.value;

        if (!nimi) virheet.push('Nimi puuttuu');
        if (!email || !email.includes('@')) virheet.push('Sähköposti virheellinen');
        if (!valinta) virheet.push('Tuotevalinta puuttuu');

        if (virheet.length) {
            msg.textContent = 'Tarkista lomake: ' + virheet.join(', ');
            msg.className = 'alert';
        }
        else {
            msg.textContent = 'Kiitos tilauksesta!';
            msg.className = 'success';
            form.reset();
        }
    });
}

// Vk 5
// Tehtävä 1 - Listan renderöinti (forEach/map/join)
/* const MENU = [
    { nimi: 'Paella', hinta: 15.90, kategoria: 'Pääuoka' },
    { nimi: 'Gazpacho', hinta: 8.50, kategoria: 'Pääuoka' },
    { nimi: 'Fideua', hinta: 14.90, kategoria: 'Pääuoka' },
    { nimi: 'Pan de Calatrava', hinta: 6.50, kategoria: 'Jälkiruoka' },
    { nimi: 'Tarta de la Abuela', hinta: 6.90, kategoria: 'Jälkiruoka' },
    { nimi: 'Sangria', hinta: 5.00, kategoria: 'Juoma' },
    { nimi: 'Coronita', hinta: 4.50, kategoria: 'Juoma' },
    { nimi: 'Valkoviini', hinta: 5.50, kategoria: 'Juoma' },
    { nimi: 'Cafe Bombon', hinta: 3.00, kategoria: 'Juoma' },
    { nimi: 'Cortado', hinta: 2.50, kategoria: 'Juoma' }
]; */

// Vk 6 Menu array -> Objects with Drink and Food instances
const initialMenu = [
    new Food('Paella', 15.90, 'Pääruoka', false),
    new Food('Gazpacho', 8.50, 'Pääuoka', false),
    new Food('Fideua', 14.90, 'Pääuoka', false),
    new Food('Pan de Calatrava', 6.50, 'Jälkiruoka', true),
    new Food('Tarta de la Abuela', 6.90, 'Jälkiruoka', true),
    new Drink('Sangria', 5.00, 'Juoma', 250),
    new Drink('Coronita', 4.50, 'Juoma',330),
    new Drink('Valkoviini', 5.50, 'Juoma', 150),
    new Drink('Cafe Bombon', 3.00, 'Juoma', 100),
    new Drink('Cortado', 2.50, 'Juoma', 100)
];

const menuService = new MenuService(initialMenu);
const order = new Order();

function renderMenu(data, haku = '') {
    const ul = document.getElementById('menuList');
    if (!ul) return;

    const items = data.map(item => {
        let nimi = item.nimi;
        if (haku) {
            const re = new RegExp(haku, 'i');
            nimi = nimi.replace(re, match => `<mark>${match}</mark>`);
        }

        return `
            <li>
                ${nimi} - ${Currency.formatEUR(item.hinta)} (${item.kategoria})
                <button class="addToCart" data-id="${item.id}">Lisää koriin</button>
            </li>`;
    }).join('');

    ul.innerHTML = items;
}

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('addToCart')) {
        const id = parseInt(e.target.dataset.id);
        const item = menuService.list().find(i => i.id == id);
        if (!item) return;

        order.add(item);
        renderCart();
    }
});

function renderCart() {
    const ul = document.getElementById('cartList');
    const totalEl = document.getElementById('cartTotal');
    if (!ul || !totalEl) return;

    const items = order.toReportLines().split('\n').map(line => `<li>${line}</li>`).join('');
    ul.innerHTML = items;
    totalEl.textContent = `Yhteensä: ${Currency.formatEUR(order.total)}`;
}

/* csvBtn.addEventListener('click', () => {
    try {
        const raw = csvInput.value.trim();
        const item = menuService.addFromCsv(raw);
        renderMenu(menuService.list());
        csvMsg.textContent = `Tuote "${item.nimi}" lisätty onnistuneesti`;
        csvMsg.className = 'success';
        csvInput.value = '';
    }
    catch (err) {
        if (err instanceof ValidationError) {
            csvMsg.textContent = `Virhe (${err.field}): ${err.message}`;
            csvMsg.className = 'alert';
        }
        else {
            console.error(err);
        }
    }
}); */

 // let ostokori = []; // { nimi:string, hinta:number, kpl:number }

/* function renderMenu(data, haku = '') {
    const ul = document.getElementById('menuList');
    if (!ul) return;

    const items = data.map(item => {
        let nimi = item.nimi;
        if (haku) {
            const re = new RegExp(haku, 'i');
            nimi = nimi.replace(re, match => `<mark>${match}</mark>`);
        }

        // Tehtävä 4 - Ostoskori (Vk5)
        return `
        <li>
        ${nimi} - ${item.hinta.toFixed(2)} € (${item.kategoria})
        <button class="addToCart" data-nimi="${item.nimi}">Lisää koriin</button> 
        </li>`;
}).join('');

    ul.innerHTML = items;
    console.log(`renderMenu(): ${data.length} tuotteita`);
} 

renderMenu(MENU); */

// Tehtävä 4 - Ostoskori
/* document.addEventListener('click', (e) => {
    if (e.target.classList.contains('addToCart')) {
        const nimi = e.target.dataset.nimi;
        const tuote = MENU.find(t => t.nimi == nimi);
        if (!tuote) return;

        const rivit = ostokori.filter(t => t.nimi == nimi);
        if(rivit.length) {
            rivit[0].kpl += 1;
        }
        else {
            ostokori.push({ nimi: tuote.nimi, hinta: tuote.hinta, kpl: 1});
        }

        renderCart();
    }
}); */

// Tehtävä 2: Haku ja Korostus
const searchField = document.getElementById('search');
if(searchField) {
    searchField.addEventListener('input', () => {
        const haku = searchField.value.trim().toLowerCase();

        const suodatettu = menuService.search(haku);
        renderMenu(suodatettu, haku);
    });
}

// Tehtävä 5 - Järjestäminen
const sortSelect = document.getElementById('sortSelect');
if (sortSelect) {
    sortSelect.addEventListener('change', () => {
        const haku = searchField?.value.trim().toLowerCase() || '';
        let data = menuService.search(haku);

        const valinta = sortSelect.value;
        if (valinta == 'nimi' || valinta == 'hinta') {
            data = menuService.sortBy(valinta).filter(item =>
                item.nimi.toLowerCase().includes(haku)
            );
        }
        renderMenu(data, haku);
    });
}

// Tehtävä 3: CSV-tyylinen lisäys
const csvInput = document.getElementById('csvInput');
const csvBtn = document.getElementById('lisaaTuote');
const csvMsg = document.getElementById('csvMsg');

if (csvInput && csvBtn && csvMsg) {
    csvBtn.addEventListener('click', () => {
        // Lisää uusi tuote
        try {
            const raw = csvInput.value.trim();
            const item = menuService.addFromCsv(raw);
            renderMenu(menuService.list());
            csvMsg.textContent = `Tuote "${item.nimi}" lisätty onnistuneesti`;
            csvMsg.className = 'success';
            csvInput.value = '';
        } 
        catch (err) {
            if (err instanceof ValidationError) {
                csvMsg.textContent = `Virhe (${err.field}): ${err.message}`;
                csvMsg.className = 'alert';
            } 
            else {
                console.error(err);
            }
        }
    });
}

// Tehtävä 4 - Ostoskori
/*
function renderCart() {
    const ul = document.getElementById('cartList');
    const totalEl = document.getElementById('cartTotal');
    if (!ul || !totalEl) return;

    const items = ostokori.map(item =>
        `<li>${item.nimi} (${item.kpl} kpl) - ${(item.hinta * item.kpl).toFixed(2)} €</li>`
    ).join('');

    const total = ostokori.reduce((sum, item) => sum + item.hinta * item.kpl, 0);

    ul.innerHTML = items;
    totalEl.textContent = `Yhteensä: ${total.toFixed(2)} €`;
} */

// Tehtävä 6 - Raportti
const raporttiBtn = document.getElementById('luoRaportti');
const raporttiEl = document.getElementById('raporttiTeksti');

if (raporttiBtn && raporttiEl) {
    raporttiBtn.addEventListener('click', () => {
        const rivit = menuService.list().map(item =>
            `${item.nimi} (${item.kategoria}) - ${Currency.formatEUR(item.hinta)}`
        );

        const teksti = rivit.join('\n');
        raporttiEl.textContent = teksti;
        console.log('Raportti luotu');
    });
}

// Tehtävä 7 - Tallennus
const tallennaBtn = document.getElementById('tallennaRaportti');

if (tallennaBtn && raporttiEl) {
    tallennaBtn.addEventListener('click', () => {
        const teksti = raporttiEl.textContent;
        if (!teksti) return;

        const blob = new Blob([teksti], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const linkki = document.createElement('a');
        linkki.href = url;
        linkki.download = 'menu-raportti.txt';
        document.body.appendChild(linkki);
        linkki.click();
        document.body.removeChild(linkki);
        URL.revokeObjectURL(url);

        console.log('Raportti tallennettu');
    });
}

