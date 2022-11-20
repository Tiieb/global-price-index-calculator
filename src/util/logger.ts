import winston, { Logger } from 'winston';
import { Service } from 'typedi';

@Service()
export class LoggerService {

    private _logger: Logger;

    constructor() {
        const options: winston.LoggerOptions = {
            transports: [new winston.transports.Console()]
        };
        this._logger = winston.createLogger(options);
        if (process.env.NODE_ENV !== 'production') {
            this._logger.debug('Logging initialized at debug level');
        }
    }
 
    get logger(): Logger {
        return this._logger;
    }

    info(message: string): void {
        this._logger.info(message);
    }

}
