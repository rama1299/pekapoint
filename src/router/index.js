import express from 'express'
import productRouter from '../app/product/router/productRouter.js'
import userRouter from '../app/user/router/userRouter.js'
import hpVariantRouter from '../app/hp_variant/router/hpVariantRouter.js'
import productUrlRewriteRouter from '../app/product_url_rewrite/router/productUrlRewriteRouter.js'
import exchangeratesRouter from '../app/exchangerates/router/exchangeratesRouter.js'
import homeProductRouter from '../app/home_product/router/homeProductRouter.js'
import csvRouter from '../app/csv/router/csvRouter.js'

const router = express.Router()

router.use('/api', productRouter)
router.use('/api', userRouter)
router.use('/api', hpVariantRouter)
router.use('/api', productUrlRewriteRouter)
router.use('/api', exchangeratesRouter)
router.use('/api', homeProductRouter)
router.use('/api', csvRouter)

export {router as indexRouter}
