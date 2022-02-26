import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { cardRouter } from './routes/CardsRoutes';
import { reviewRouter } from './routes/ReviewRoutes';

const PORT = process.env.PORT || 3000;
const app = express();
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, 'static')));
app.use('/tripleflash', cardRouter);
app.use('/tripleflash', reviewRouter);

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`)
})