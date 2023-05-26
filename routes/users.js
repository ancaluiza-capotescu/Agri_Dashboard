const express = require('express');
const router = express.Router();
const User = require('../models/userModel.js');
const bcrypt = require("bcrypt");
const {register} = require("../controllers/register");
const {edit} = require("../controllers/edit");

router.get('/Users', (req, res, next) => {
    User.find()
      .then((data) => res.json(data))
      .catch(next);
  });
router.route("/register").post(register);

  
router.delete('/Users/:id', (req, res, next) => {
    User.findOneAndDelete({ _id: req.params.id })
      .then((data) => res.json(data))
      .catch(next);
  });
router.get('/:id', (req, res) => {
    User.findById(req.params.id)
      .then((data) => res.json(data))
      .catch(err => res.status(404).json({ nouserfound: 'No Users found' }));
  });
router.route("/:id").put(edit);

module.exports = router;