import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';
import { cardRouter } from './routes/CardsRoutes';
import { reviewRouter } from './routes/ReviewRoutes';
// const corsOptions = {
//   origin: 'https://ms4224.github.io',
//   optionsSuccessStatus: 200
// }


const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, 'static')));
app.use('/tripleflash', cardRouter);
app.use('/tripleflash', reviewRouter);

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`)
})