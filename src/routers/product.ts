import express from 'express'
import { isAuth, isAdministrator } from '../services/auth'

import {
  createProduct,
  findById,
  deleteProduct,
  findAll,
  updateProduct,
} from '../controllers/product'

const router = express.Router()

// Every path we define here will get /api/v1/movies prefix
router.get('/', findAll)
router.get('/:productId', findById)
router.put('/:productId', updateProduct)
router.delete('/:productId', deleteProduct)
router.post('/', isAuth, isAdministrator, createProduct)

export default router
