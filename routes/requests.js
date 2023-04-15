const express = require('express');
const router = express.Router();
const ReqUser = require('../models/requestModel.js');
const {request} = require("../controllers/request");

router.get('/Requests', (req, res, next) => {
    ReqUser.find()
      .then((data) => res.json(data))
      .catch(next);
  });
router.route("/Requests").post(request);
  
router.delete('/Requests/:id', (req, res, next) => {
    ReqUser.findOneAndDelete({ _id: req.params.id })
      .then((data) => res.json(data))
      .catch(next);
  });

module.exports = router;