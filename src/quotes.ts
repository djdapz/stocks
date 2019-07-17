import {Quote, quoteFromYahooFinance} from "./Quote";
import axios from 'axios'


interface QuoteResult {
    "regularMarketPrice": number,
    "regularMarketTime": number,
    "regularMarketChange": number,
    "regularMarketChangePercent": number,
    "regularMarketPreviousClose": number,
    "regularMarketOpen": number,
    "marketState": string,
    "exchange": string,
    "postMarketChangePercent": number,
    "postMarketTime": number,
    "postMarketPrice": number,
    "postMarketChange": number,
    "symbol": string
}

export interface YahooFinanceQuote {
    "quoteResponse": {
        result: QuoteResult[]
    }
}

export const getQuotes = (symbols: string[]): Promise<Quote[]> => Promise.all(symbols.map(quote));

export const quote = (stock: string): Promise<Quote> =>
    axios
        .get(`https://query1.finance.yahoo.com/v7/finance/quote?lang=en-US&region=US&corsDomain=finance.yahoo.com&symbols=${stock}`)
        .then(it => it.data)
        .then(quoteFromYahooFinance);