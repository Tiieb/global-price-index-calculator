export enum CoinType { BTC = 'BTC', USDT = 'USDT' }
export enum ExchangeName { ALL = 'ALL', BINANCE = 'BINANCE', KRAKEN = 'KRAKEN', HUOBI = 'HUOBI' }

export interface Coin {
    name: string;
}

export interface CoinPriceOptions {
    exchange: ExchangeName,
    limit: number
}

export const defaultCoinPriceOptions: CoinPriceOptions = {
    exchange: ExchangeName.ALL,
    limit: 5000
};
