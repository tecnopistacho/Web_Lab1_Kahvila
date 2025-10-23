// Vk 6 - Tehtävä 1
import { ValidationError } from '../utils/Errors.js';

let nextId = 1;

export class MenuItem {
    #id;

    constructor(nimi, hinta, kategoria) {
        if (typeof nimi != 'string' || nimi.trim() == '') {
            throw new ValidationError('nimi', 'Nimi ei saa olla tyhjä.');
        }
        if (typeof hinta != 'number' || hinta <= 0) {
            throw new ValidationError('hinta', 'Hinta pitää olla positiivinen numero.');
        }
        if (typeof kategoria != 'string' || kategoria.trim() == '') {
            throw new ValidationError('kategoria', 'Kategoria ei saa olla tyhjä.');
        }

        this.nimi = nimi.trim();
        this.hinta = hinta;
        this.kategoria = kategoria.trim();
        this.#id = nextId++;
    }

    get id() {
        return this.#id;
    }

    toRowString() {
        return `${this.nimi};${this.hinta};${this.kategoria}`;
    }
}