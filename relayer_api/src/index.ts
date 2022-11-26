import express, { Request, Response } from 'express';
import relayerRouter from './routes/relayer.route';
const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => res.send('API is working!'));
app.use('/api', relayerRouter);

app.listen(port, () =>
    // eslint-disable-next-line no-console
    console.log(`Express is listening at http://localhost:${port}`)
);
