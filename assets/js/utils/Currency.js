// Tehtävä 3
export class Currency {
    static formatEUR(n) {
        if (typeof n != 'number') return '€0,00';

        return new Intl.NumberFormat('fi-FI', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(n);
    }
}