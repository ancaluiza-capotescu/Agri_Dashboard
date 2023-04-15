const express = require('express');
const router = express.Router();
const Ad = require('../models/adModel.js');
const {createAd} = require("../controllers/createAd");

router.get('/Ads', (req, res, next) => {
    Ad.find()
      .then((data) => res.json(data))
      .catch(next);
  });
router.route("/Ads").post(createAd);
  
router.delete('/Ads/:id', (req, res, next) => {
    Ad.findOneAndDelete({ _id: req.params.id })
      .then((data) => res.json(data))
      .catch(next);
  });
router.get('/:id', (req, res) => {
    Ad.findById(req.params.id)
      .then((data) => res.json(data))
      .catch(err => res.status(404).json({ nouserfound: 'No Ads found' }));
  });
router.put('/:id', async(req, res) => {
    Ad.findByIdAndUpdate(req.params.id, req.body)
      .then((data) => res.json(data))
      .catch(err =>
        res.status(400).json({ error: 'Unable to update the Database' })
      );
 
  });
module.exports = router;