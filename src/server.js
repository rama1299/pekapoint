import express from 'express';
import cors from 'cors'
import morgan from 'morgan';
import {indexRouter} from './router/index.js'
import errorHandler from './system/middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';
import { cronJobUpdateProductHome } from './system/services/cronUpdateProductHome.js'
import { cronJobUpdateExchangerates } from './system/services/cronExchangeRates.js'
import dotenv from 'dotenv'

dotenv.config() 


const app = express()
const port = process.env.VITE_PORT
const corsOrigin = process.env.VITE_CORS_ORIGIN

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || corsOrigin.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(cookieParser())

app.use(morgan('tiny'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/static', express.static("src/uploads"))
app.use(indexRouter)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  cronJobUpdateExchangerates.start()
  cronJobUpdateProductHome.start()
})

process.on('SIGTERM', () => {
  console.log('Received SIGTERM, stopping cronjob and server...');
  cronJobUpdateExchangerates.stop()
  cronJobUpdateProductHome.stop()
  server.close(() => {
    console.log('Server and cronjob stopped.');
    process.exit(0);
  });
})