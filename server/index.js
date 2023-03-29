import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import chat from "./routes/chat.js";

/*INVOKE ASSETS*/

dotenv.config();
const app = express();
const router = express.Router();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("common"));
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(chat);

/*SERVER*/

const PORT = process.env.PORT || 9000; 

app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`)); 