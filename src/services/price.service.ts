import Container, { Service } from 'typedi';
import { LoggerService } from '../util/logger';
import axios from 'axios';
import { CoinPriceOptions, CoinType, defaultCoinPriceOptions, ExchangeName } from '../models/Price.model';
import exhangesInfo from '../util/exhanges.utils';
import io from 'socket.io-client';

@Service()
export class PriceService {

    loggerService: LoggerService = Container.get(LoggerService)

    getPrice = async (baseCoin: CoinType, targetCoin: CoinType, { exchange, limit }: CoinPriceOptions = defaultCoinPriceOptions): Promise<number> => {
        this.loggerService.info('get orderbook');
        if(exhangesInfo[exchange]) return this.getBidsAsks(baseCoin, targetCoin, { exchange, limit });
        
        const echangesPricesIndexes: Promise<number>[] = await Object.keys(exhangesInfo).map(async (exchange: ExchangeName) => {
            return await this.getBidsAsks(baseCoin, targetCoin, { exchange, limit });
        });
        try {
            const test = await Promise.all(echangesPricesIndexes) ;

        } catch(e: any) {
            console.log(e);
        }
        return (await Promise.all(echangesPricesIndexes)).reduce((acc: number, priceIndex: number) => (acc + priceIndex), 0) / Object.keys(exhangesInfo).length;
    }

    getBidsAsks = async (baseCoin: CoinType, targetCoin: CoinType, { exchange, limit }: CoinPriceOptions = defaultCoinPriceOptions): Promise<number> => {
        const url = exhangesInfo[exchange].constructUrl(baseCoin, targetCoin, limit);
        const orderbook = await exhangesInfo[exchange].transform((await axios.get(url)).data);
        const meanBids = orderbook.bids.reduce((acc: number, curr: any) => (acc + curr.price), 0) / orderbook.bids.length;
        const meanAsks = orderbook.asks.reduce((acc: number, curr: any) => (acc + curr.price), 0) / orderbook.asks.length;
        return (meanBids + meanAsks) / 2;
    }

    getLiveOrderbooks = () => {
        const socket = io('wss://stream.binance.com:9443/ws/bnbbtc@depth');
        socket.on('connect', () => {
            console.log('connected');
        });
        
        socket.on('data', (data) => { 
            console.log(data);
        });
    }
}
