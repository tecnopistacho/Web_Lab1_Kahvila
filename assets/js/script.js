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