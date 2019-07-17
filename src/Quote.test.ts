import {printQuote, Quote} from "./Quote";

jest.mock('chalk', () => ({
    red: jest.fn().mockImplementation((it) => it),
    green: jest.fn().mockImplementation((it) => it)
}));

describe("Quote", () => {

    const positiveStock: Quote = {
        change: 6.6500,
        changePercent: 1.7816,
        price: 366.6000,
        symbol: "STOK",
    };

    const negativeStock: Quote = {
        change: -6.6500,
        changePercent: -1.7816,
        price: 366.6000,
        symbol: "SPY",
    };

    const superPositiveStock: Quote = {
        change: 16.6500,
        changePercent: 25.7816,
        price: 66.6000,
        symbol: "STOCK",
    };

    const superNegativeStock: Quote = {
        change: -16.6500,
        changePercent: -25.7816,
        price: 66.6000,
        symbol: "STOCK",
    };


    const expectedPositiveString = "STOK   366.60    6.65   1.78%";
    const expectedNegativeString = "SPY    366.60   -6.65  -1.78%";
    const expectedVPositiveString = "STOCK   66.60   16.65  25.78%";
    const expectedVNegativeString = "STOCK   66.60  -16.65 -25.78%";

    it('should print a quote with netative numbers in format', function () {
        expect(printQuote(negativeStock)).toEqual(expectedNegativeString)
    });

    it('should print a quote with positive numbers in format', function () {
        expect(printQuote(positiveStock)).toEqual(expectedPositiveString)
    });

    it('should print a quote with positive numbers in format', function () {
        expect(printQuote(superPositiveStock)).toEqual(expectedVPositiveString)
    });

    it('should print a quote with positive  numbers in format', function () {
        expect(printQuote(superNegativeStock)).toEqual(expectedVNegativeString)
    });
});
