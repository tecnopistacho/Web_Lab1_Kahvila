// Tehtävä 4
import { Drink } from '../models/Drink.js';
import { Food } from '../models/Food.js';
import { ValidationError } from '../utils/Errors.js';

export class MenuService {
    constructor(initialItems = []) {
        this._items = [...initialItems];
    }

    list() {
        return [...this._items];
    }

    search(query) {
        const q = query.trim().toLowerCase();
        return this._items.filter(item =>
            item.nimi.toLowerCase().includes(q) ||
            item.kategoria.toLowerCase().includes(q)
        );
    }

    sortBy(field) {
        return [... this._items].sort((a, b) => {
            if (a[field] < b[field]) return -1;
            if (a[field] > b[field]) return 1;
            return 0;
        });
    }

    addFromCsv(line) {
        const parts = line.split(';').map(p => p.trim());
        if (parts.length < 3) {
            throw new ValidationError('csv', 'CSV-rivissä pitää olla vähintään 3 kenttä.');
        }

        const [nimi, hintaStr, kategoria, extra] = parts;
        const hinta = parseFloat(hintaStr.replace(',', '.'));

        if (isNaN(hinta) || hinta <= 0) {
            throw new ValidationError('hinta', 'Hinta pitää olla positiivinen numero.');
        }

        let item;
        if (/kahvi|juoma/i.test(kategoria)) {
            const ml = parseInt(extra);
            item = new Drink(nimi, hinta, kategoria, ml);
        }
        else if (/suolainen|makea/i.test(kategoria)) {
            const makea = /makea/i.test(kategoria);
            item = new Food(nimi, hinta, kategoria, makea);
        }
        else {
            throw new ValidationError('kategoria', 'Tuntematon kategoria.');
        }

        this._items.push(item);
        return item;
    }
}