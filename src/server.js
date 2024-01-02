import express from 'express';
import cors from 'cors'
import morgan from 'morgan';
import {indexRouter} from './router/index.js'
import errorHandler from './system/middlewares/errorHandler.js';

const app = express()
const port = 3000

app.use(cors())
app.use(morgan('tiny'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(indexRouter)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})