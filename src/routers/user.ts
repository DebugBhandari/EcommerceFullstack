import express from 'express'

import {
  findById,
  deleteUser,
  findAll,
} from '../controllers/user'

const router = express.Router()

router.get('/', findAll)
router.get('/:userId', findById)
router.delete('/:userId', deleteUser)


export default router
