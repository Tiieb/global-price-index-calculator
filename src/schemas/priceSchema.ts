import Joi from 'joi';
import { CoinType } from '../models/Price.model';

export const priceSchema = Joi.object({
    query: Joi.object({
        base: Joi.string().allow(CoinType),
        target: Joi.string().allow(CoinType)
    })
});