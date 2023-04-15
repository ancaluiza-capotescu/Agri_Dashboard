const express = require('express');
const router = express.Router();
let DailyStatus = require('../models/dailyStatusModel');
const {dailyStatus} = require("../controllers/dailyStatus");

router.get('/DailyStatuses', (req, res, next) => {
    DailyStatus.find()
      .then((data) => res.json(data))
      .catch(next);
  });

router.route("/DailyStatuses").post(dailyStatus);

  router.delete('/DailyStatuses/:username', (req, res, next) => {
    DailyStatus.findOneAndDelete({ username: req.params.username })
      .then((data) => res.json(data))
      .catch(next);
  });

module.exports = router;