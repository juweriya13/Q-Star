
import express from 'express';
const app = express();
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import cors from "cors"
import {connectDB} from './config/mongoose-connection.js'
import eventRoutes from './routes/eventRoutes.js'
import userRoutes from './routes/userRoutes.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use('/images/uploads', express.static(path.join(__dirname, 'public/images/uploads')));
app.use(cookieParser());

// app.set("view engine", "ejs")
app.use('/api', eventRoutes)
app.use('/api', userRoutes)

app.get('/', function(req, res){
    res.status(200).json({
        message: "Server is running..."
    })
})
app.listen(process.env.PORT , () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    connectDB();
})