// Drink ja Food perivät MenuItem (T1)
import { MenuItem } from './MenuItem.js';
import { ValidationError } from '../utils/Errors.js';

export class Food extends MenuItem {
    constructor(nimi, hinta, kategoria, makea) {
        super(nimi, hinta, kategoria);

        if (typeof makea != 'boolean') {
            throw new ValidationError('makea', 'Makea-arvon pitää olla totuusarvo (true/false).');
        }

        this.makea = makea;
    }

    toRowString() {
        const tyyppi = this.makea ? 'Makea' : 'Suolainen';
        return `${super.toRowString()};${tyyppi}`;
    }
}
