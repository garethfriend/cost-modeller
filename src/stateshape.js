let state = {
    // exchange rates to USD obtained from API once on loading
    currency: {
        rates: {
            USD: 1,
            AED: 3.67,
            ARS: 73.51,
            AUD: 1.4,
            BGN: 1.66,
            BRL: 5.59,
            BSD: 1,
            CAD: 1.32,
            CHF: 0.912,
            CLP: 786.07,
            CNY: 6.92,
            COP: 3742.1,
            CZK: 22.1,
            DKK: 6.31,
            DOP: 57.91,
            EGP: 15.9,
            EUR: 0.848,
            FJD: 2.13,
            GBP: 0.762,
            GTQ: 7.69,
            HKD: 7.75,
            HRK: 6.39,
            HUF: 296.97,
            IDR: 14912.39,
            ILS: 3.4,
            INR: 74.94,
            ISK: 137.67,
            JPY: 105.77,
            KRW: 1191.2,
            KZT: 418,
            MVR: 15.4,
            MXN: 22.08,
            MYR: 4.18,
            NOK: 8.99,
            NZD: 1.53,
            PAB: 1,
            PEN: 3.58,
            PHP: 48.69,
            PKR: 167.91,
            PLN: 3.72,
            PYG: 7144,
            RON: 4.1,
            RUB: 74.41,
            SAR: 3.75,
            SEK: 8.79,
            SGD: 1.37,
            THB: 31.54,
            TRY: 7.3,
            TWD: 29.4,
            UAH: 27.32,
            UYU: 43.13,
            ZAR: 17.23
        },
        isLoading: false
    },
    errors: null,
    config: {
        // two options 'mass' or 'volume' is used to render the options in all the dropdowns across the app.
        unitType: 'mass',
        // output currency for the calculations, used inside all ingredient cost normalizations.
        baseCurrency: 'CAD',
        baseUnit: 'g',
    },
    // model is based on rule of mixtures equation: (fraction*costPerUnit) + (fraction*costPerUnit) + (fraction*costPerUnit) = cost
    // three sets of bracketed multiplications come from three collections:
    collections: {
        // this is what we are modelling the changes to
        variable: ['945-6647-9977'],
        // this portion's fraction does not change - no matter what else we mess with ingredients in here are fixed quantity
        fixed: ['154-6876-8443', '249-8388-8355', '033-0058-1111'],
        // this portion grows and shrinks to accomodate the changes in the variable quantity
        balance: ['158-2987-3546', '249-3888-8999'],
    },
    ingredients: [{
        id: '154-6876-8443',
        ingredientName: 'silicone',
        // properties combine as: {cost}{pricedInCurrency} per {numberOfunits}{units}
        pricedInCurrency: 'GBP',
        // could replace next three with cost per baseUnit but might be better to retain user inputs if persisting
        cost: 10,
        numberOfUnits: 15,
        unit: 'kg',
        // quantity in baseUnits 
        quantity: 27,
        // calculated: (baseCurrencyRate/priceInCurrencyRate)*mass(cost/numberOfUnits).from(unit).to(totalQuantity.baseUnit).value
        normalizedCost: 0.0011548553, // CAD/g
        // toggle create/edit modal
        editing: true
    },
    {
        etc...
    }]
}

// selectors