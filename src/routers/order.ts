import express from 'express'
import { isAuth, isAdministrator } from '../services/auth'

import {
  createOrder,
  findById,
  deleteOrder,
  findAll,
  updateOrder,
} from '../controllers/order'

const router = express.Router()

// Every path we define here will get /api/v1/movies prefix
router.get('/', findAll)
router.get('/:orderId', findById)
router.put('/:orderId', updateOrder)
router.delete('/:orderId', deleteOrder)
router.post('/', isAuth, createOrder)

export default router
