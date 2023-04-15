const express = require('express');
const router = express.Router();
const Ad = require('../models/adModel.js');
const {createAd} = require("../controllers/createAd");
const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./frontend/public/uploads/");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  }
})

const upload = multer({storage: storage});

router.get('/Ads', (req, res, next) => {
    Ad.find()
      .then((data) => res.json(data))
      .catch(next);
  });
router.post("/Ads", upload.single("picture"), (req,res) => {
  const newAd = new Ad({
    username: req.body.username, 
    description: req.body.description, 
    title: req.body.title, 
    owner: req.body.owner, 
    price: req.body.price, 
    address: req.body.address, 
    contact: req.body.contact,  
    picture: req.file.originalname
  });
  
  newAd.save()
    .then(() => res.json('Ad added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});
  
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
// router.put('/:id', async(req, res) => {
//     Ad.findByIdAndUpdate(req.params.id, req.body)
//       .then((data) => res.json(data))
//       .catch(err =>
//         res.status(400).json({ error: 'Unable to update the Database' })
//       );
 
//   });
module.exports = router;