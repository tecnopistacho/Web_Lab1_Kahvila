// Tehtävä 2
import { CartItem } from './CartItem.js';
import { ValidationError } from '../utils/Errors.js';

export class Order {
    #items = [];

    add(item, kpl = 1) {
        try {
            const cartItem = new CartItem(item, kpl);
            this.#items.push(cartItem);
        }
        catch (err) {
            if (err instanceof ValidationError) {
                console.error(`Virhe lisättäessä tuotetta: ${err.message}`);
            }
            else {
                throw err;
            }
        }
    }

    remove(itemId) {
        this.#items = this.#items.filter(ci => ci.item.id != itemId);
    }

    get total() {
        return this.#items.reduce((sum, ci) => sum + ci.lineTotal, 0);
    }

    toReportLines() {
        return this.#items
            .map(ci => `${ci.item.nimi};${ci.item.hinta};${ci.kpl};${ci.lineTotal}`)
            .join('\n');
    }
}