const express = require('express');
const router = express.Router();
let Location = require('../models/locationModel');

router.get('/Locations', (req, res, next) => {
    Location.find()
      .then((data) => res.json(data))
      .catch(next);
  });
router.post('/Locations', (req, res) => {
    const username = req.body.username;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;

    const newLocation = new Location({
      username,
      latitude,
      longitude,
    });

    newLocation.save()
      .then(() => res.json('Location saved'))
      .catch(err => res.status(400).json('Error: ' + err));
  });  

  router.delete('/Locations/:username', (req, res, next) => {
    Location.findOneAndDelete({ username: req.params.username })
      .then((data) => res.json(data))
      .catch(next);
  });

  router.put('/Locations/:username', async(req, res) => {
    Location.findOneAndUpdate({ username: req.params.username}, {username: req.body.username, latitude: req.body.latitude, longitude: req.body.longitude})
      .then((data) => res.json(data))
      .catch(err =>
        res.status(400).json({ error: 'Unable to update the Database' })
      );
 
  });
module.exports = router;