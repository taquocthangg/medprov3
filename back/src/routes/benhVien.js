import * as controller from '../controllers'
import express from 'express'
import uploadCloud from '../mid/cloudinary-upload';
const router = express.Router();


router.get('/getAllBenhVien', controller.getBenhVien);

module.exports = router
