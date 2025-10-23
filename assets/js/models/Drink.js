// Drink ja Food perivät MenuItem (T1)
import { MenuItem } from './MenuItem.js';
import { ValidationError } from '../utils/Errors.js';

export class Drink extends MenuItem {
    constructor(nimi, hinta, kategoria, ml) {
        super(nimi, hinta, kategoria);

        if (typeof ml != 'number' || ml <= 0) {
            throw new ValidationError('ml', 'Juoman tilavuus pitää olla positiivinen numero.');
        }

        this.ml = ml;
    }

    toRowString() {
        return `${super.toRowString()};${this.ml}ml`;
    }
}