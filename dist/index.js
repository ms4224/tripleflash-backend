"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CardsRoutes_1 = require("./routes/CardsRoutes");
const ReviewRoutes_1 = require("./routes/ReviewRoutes");
const PORT = process.env.PORT || 3000;
const app = express_1.default();
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, 'static')));
app.use('/tripleflash', CardsRoutes_1.cardRouter);
app.use('/tripleflash', ReviewRoutes_1.reviewRouter);
app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map