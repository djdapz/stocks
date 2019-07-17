import {YahooFinanceQuote} from "./quotes";
import chalk from "chalk";

export const QUOTE_HEADER = "NAME    PRICE  CHANGE   PRCNT";

export interface Quote {
    change: number;
    changePercent: number;
    price: number;
    symbol: string;
}

export const quoteFromYahooFinance = (it: YahooFinanceQuote) => {
    const result = it.quoteResponse.result[0];
    const change = result.regularMarketChange;
    const changePercent = result.regularMarketChangePercent;
    const price = result.regularMarketPrice;
    const symbol = result.symbol;

    return {
        change,
        changePercent,
        price,
        symbol
    }
};

const formatNumer = (n: number) => n.toFixed(2).padStart(6);

export const printQuote = (quote: Quote) => {
    const color = quote.change > 0 ? chalk.green : chalk.red;
    const paddedSymbol = quote.symbol.padEnd(5);
    const paddedPrice = formatNumer(quote.price);
    const paddedChange = color(formatNumer(quote.change));
    const paddedChangePercent = color(formatNumer(quote.changePercent) + "%");
    return `${paddedSymbol}  ${paddedPrice}  ${paddedChange} ${paddedChangePercent}`
};

