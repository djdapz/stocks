import {getQuotes, quote} from "./quotes";
import axios from 'axios';
import {Quote} from "./Quote";

const getMock = jest.fn();

axios.get = getMock;

const getMockedReturn = ({
                             symbol = "STOCK",
                             price = 10.09,
                             percent = -1.6569208,
                             change = -0.17000008
                         }) =>
    ({
        data: {
            "quoteResponse": {
                "result": [
                    {
                        "language": "en-US",
                        "region": "US",
                        "quoteType": "EQUITY",
                        "quoteSourceName": "Delayed Quote",
                        "currency": "USD",
                        "regularMarketOpen": 10.3,
                        "regularMarketDayHigh": 10.31,
                        "regularMarketDayLow": 9.9901,
                        "regularMarketVolume": 3199292,
                        "bookValue": 4.824,
                        "fiftyDayAverage": 12.491177,
                        "fiftyDayAverageChange": -2.4011765,
                        "fiftyDayAverageChangePercent": -0.1922298,
                        "twoHundredDayAverage": 18.00522,
                        "twoHundredDayAverageChange": -7.9152203,
                        "twoHundredDayAverageChangePercent": -0.43960696,
                        "marketCap": 2743602176,
                        "forwardPE": 252.25002,
                        "priceToBook": 2.0916252,
                        "sourceInterval": 15,
                        "exchangeTimezoneName": "America/New_York",
                        "exchangeTimezoneShortName": "EDT",
                        "gmtOffSetMilliseconds": -14400000,
                        "marketState": "POSTPOST",
                        "postMarketPrice": 10.15,
                        "postMarketChange": 0.059999466,
                        "regularMarketChangePercent": percent,
                        "regularMarketDayRange": "9.9901 - 10.31",
                        "regularMarketPreviousClose": 10.26,
                        "bid": 10.09,
                        "ask": 10.05,
                        "bidSize": 40,
                        "askSize": 22,
                        "messageBoardId": "finmb_236608865",
                        "fullExchangeName": "NYSE",
                        "longName": "Pivotal Software, Inc.",
                        "financialCurrency": "USD",
                        "averageDailyVolume3Month": 2523404,
                        "averageDailyVolume10Day": 2642566,
                        "fiftyTwoWeekLowChange": 0.099900246,
                        "fiftyTwoWeekLowChangePercent": 0.009999924,
                        "fiftyTwoWeekRange": "9.9901 - 29.15",
                        "fiftyTwoWeekHighChange": -19.06,
                        "fiftyTwoWeekHighChangePercent": -0.6538593,
                        "fiftyTwoWeekLow": 9.9901,
                        "fiftyTwoWeekHigh": 29.15,
                        "earningsTimestamp": 1559703600,
                        "regularMarketPrice": price,
                        "regularMarketTime": 1563307322,
                        "regularMarketChange": change,
                        "priceHint": 2,
                        "postMarketChangePercent": 0.5946429,
                        "postMarketTime": 1563321467,
                        "shortName": "Pivotal Software, Inc.",
                        "market": "us_market",
                        "esgPopulated": false,
                        "tradeable": true,
                        "triggerable": true,
                        "epsTrailingTwelveMonths": -0.539,
                        "epsForward": 0.04,
                        "sharesOutstanding": 96398896,
                        "exchangeDataDelayedBy": 0,
                        "exchange": "NYQ",
                        "symbol": symbol
                    }
                ],
                "error": null
            }
        }
    });


const stockReturn = getMockedReturn({});

describe("fetchQuote", () => {

    beforeEach(function () {
        getMock.mockResolvedValueOnce(stockReturn);
    });

    it('should call axios to get the stock price', function () {
        quote("STOCK");
        expect(getMock).toHaveBeenCalledWith("https://query1.finance.yahoo.com/v7/finance/quote?lang=en-US&region=US&corsDomain=finance.yahoo.com&symbols=STOCK")
    });

    it('should return the price, symbol, change and changePercent', () => {
        const expected: Quote = {
            change: -0.17000008,
            changePercent: -1.6569208,
            price: 10.09,
            symbol: "STOCK",
        };

        const subject = quote("STOCK");

        subject
            .then(it => {
                return expect(it).toEqual(expected);
            })
            .catch(it => fail(it))
    });
});

describe("getQuotes", () => {

    const firstReturn = getMockedReturn({
        symbol: "AAA",
        price: 1,
        change: 10,
        percent: 100,
    });
    const secondReturn = getMockedReturn({
        symbol: "BBB",
        price: 2,
        change: 20,
        percent: 200,
    });

    beforeEach(function () {
        getMock
            .mockResolvedValueOnce(firstReturn)
            .mockResolvedValueOnce(secondReturn);
    });

    it('should map a list of symbols to a list of quotes', function () {
        const expectedQuotes: Quote[] = [
            {
                change: 10,
                changePercent: 100,
                price: 1,
                symbol: "AAA"
            },
            {
                change: 20,
                changePercent: 200,
                price: 2,
                symbol: "BBB"
            }
        ];

        return getQuotes(["AAA", "BBB"])
            .then(quotes => expect(quotes).toEqual(expectedQuotes))
    });
});