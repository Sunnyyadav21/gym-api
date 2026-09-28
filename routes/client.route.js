const express = require('express')
const router = express.Router()

const { register, getclient, getclientbyid, deleteclient, getduesoon, markFeePaid, updateclient } = require('../controllers/client.controllers')


router.post('/register',register)
router.get('/getclient',getclient)
router.get('/duesoon',getduesoon)
router.get('/getclient/:id',getclientbyid)
router.delete('/deleteclient/:id',deleteclient)
router.patch('/markpaid/:id',markFeePaid)
router.put('/updateclient/:id', updateclient)

module.exports = router