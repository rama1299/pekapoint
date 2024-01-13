import express from 'express'
import productRouter from '../app/product/router/productRouter.js'
import userRouter from '../app/user/router/userRouter.js'
import hpVariantRouter from '../app/hp_variant/router/hpVariantRouter.js'
import productUrlRewriteRouter from '../app/product_url_rewrite/router/productUrlRewriteRouter.js'

const router = express.Router()

router.use('/api', productRouter)
router.use('/api', userRouter)
router.use('/api', hpVariantRouter)
router.use('/api', productUrlRewriteRouter)

export {router as indexRouter}
