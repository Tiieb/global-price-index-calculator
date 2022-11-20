import { BinanceResponse, HuobiResponse, KrakenResponse } from '../models/Exchange';
import { CoinType } from '../models/Price.model';

const mapPriceQuantity = (price: string, quantity: string): {price: number, quantity: number} => ({
    price: Number(price),
    quantity: Number(quantity)
});

export default {
    BINANCE : {
        constructUrl: (baseCoin: CoinType, targetCoin: CoinType, limit: number = 5000): string => {
            return `https://api.binance.com/api/v3/depth?limit=${limit}&symbol=${baseCoin.toUpperCase()}${targetCoin.toUpperCase()}`;
        },
        transform: (data: BinanceResponse) => ({
            bids: data.bids.map(([price, quantity]) => mapPriceQuantity(price, quantity)),
            asks: data.asks.map(([price, quantity]) => mapPriceQuantity(price, quantity))
        })
    },
    KRAKEN : {
        constructUrl: (baseCoin: CoinType, targetCoin: CoinType, limit: number = 500): string => {
            return `https://api.kraken.com/0/public/Depth?count=${limit}&pair=${baseCoin.toUpperCase()}${targetCoin.toUpperCase()}`;
        },
        transform: (data: KrakenResponse) => ({
            bids: data.result.XBTUSDT.bids.map(([price, quantity, ]) => mapPriceQuantity(price, quantity)),
            asks: data.result.XBTUSDT.asks.map(([price, quantity, ]) => mapPriceQuantity(price, quantity))
        })
    },
    HUOBI : {
        constructUrl: (baseCoin: CoinType, targetCoin: CoinType, limit: 5 | 10 | 20 = undefined): string => {
            return `https://api.huobi.pro/market/depth?${limit ? `depth=${limit}&` : ''}symbol=${baseCoin.toLowerCase()}${targetCoin.toLowerCase()}&type=step0`;
        },
        transform: (data: HuobiResponse) => ({
            bids: data.tick.bids.map(([price, quantity, ]) => mapPriceQuantity(price, quantity)),
            asks: data.tick.asks.map(([price, quantity, ]) => mapPriceQuantity(price, quantity))
        })
    }
} as any;

