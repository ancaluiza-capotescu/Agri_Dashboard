const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dailyStatusSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
  }
});

const DailyStatus = mongoose.model('dailyStatus', dailyStatusSchema);
module.exports = DailyStatus;
