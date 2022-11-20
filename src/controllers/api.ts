'use strict';

import { Response, Request, NextFunction } from 'express';
import { CoinPriceOptions, CoinType, ExchangeName } from '../models/Price.model';
import Container, { Service } from 'typedi';
import { PriceService } from '../services/price.service';
import { LoggerService } from '../util/logger';

@Service()
export default class ApiController {  

    loggerService: LoggerService = Container.get(LoggerService)
    priceService: PriceService = Container.get(PriceService)

    getPrice = async ({ params, query }: Request, res: Response): Promise<void> => {
        this.loggerService.info('ApiController getPrice');
        const options: CoinPriceOptions = {
            limit: query.limit ? Number(query.limit) : undefined,
            exchange: query.exchange as ExchangeName | ExchangeName.ALL
        };
        const priceIndex = await this.priceService.getPrice(params.base as CoinType, params.target as CoinType, options);
        res.send({
            priceIndex,
            exchange: options.exchange || ExchangeName.ALL
        });
    }

}

