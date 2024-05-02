import * as controller from '../controllers'
import express from 'express'
import uploadCloud from '../mid/cloudinary-upload';
const router = express.Router();


router.get('/getUser', controller.getUser)
router.get('/getCurentUser/:userId', controller.getCurent)

module.exports = router