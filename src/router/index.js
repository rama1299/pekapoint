import express from 'express'
import productRouter from '../app/product/router/productRouter.js'

const router = express.Router()

router.use('/api', productRouter)

export {router as indexRouter}
