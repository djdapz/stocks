import {getQuotes} from "./quotes";
import clear from 'clear'
import {printQuote, Quote, QUOTE_HEADER} from "./Quote";

const inputStocks = process.argv
    .slice(2)
    .filter(it => it.length > 0);

const printQuotes = (quotes: Quote[]) => {
    clear();
    console.log(QUOTE_HEADER);
    quotes
        .map(printQuote)
        .forEach(stockQuote => console.log(stockQuote));
};

const getStocks = () =>
    getQuotes(inputStocks)
        .then(printQuotes)
        .then(() => setTimeout(getStocks, 1000))
        .catch(console.error);

getStocks();
