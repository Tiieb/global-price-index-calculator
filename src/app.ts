import express from 'express';
import path from 'path';
import { Container } from 'typedi';
import ApiController from './controllers/api';

const app = express();

// Express config
app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 })
);

const apiController = Container.get(ApiController);

/**
 * API routes
 */
app.get('/api/price/:base/:target', apiController.getPrice);


export default app ;
