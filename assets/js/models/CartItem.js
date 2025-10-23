// Tehtävä 2
import { ValidationError } from '../utils/Errors.js';

export class CartItem {
    constructor(item, kpl) {
        if (!item || typeof item != 'object' || typeof item.id != 'number') {
            throw new ValidationError('item', 'Item pitää olla kelvollinen MenuItem-olio.');
        }
        if (typeof kpl != 'number' || kpl < 1) {
            throw new ValidationError('kpl', 'Määrän pitää olla vähintään 1.');
        }

        this.item = item;
        this.kpl = kpl;
    }

    get lineTotal() {
        return this.item.hinta * this.kpl;
    }
}