import express, { Request, Response } from 'express';
import relayerRouter from './routes/relayer.route';
import errorHandler from './middlewares/errorHandler';
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req: Request, res: Response) => res.send('API is working!'));
app.use('/api', relayerRouter);
app.use(errorHandler);

app.listen(port, () =>
    // eslint-disable-next-line no-console
    console.log(`Express is listening at http://localhost:${port}`)
);
