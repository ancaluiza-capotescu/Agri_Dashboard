const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/users');
const routes_location = require('./routes/location');
const routes_dailyStatus = require('./routes/dailyStatus');
const routes_ad = require('./routes/ad');
const routes_request = require('./routes/requests');
const errorHandler = require("./middleware/error");
require('dotenv').config();
var cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
// Connect to the database
mongoose
  .connect(process.env.DB, { useNewUrlParser: true })
  .then(() => console.log(`Database connected successfully`))
  .catch((err) => console.log(err));
// Since mongoose's Promise is deprecated, we override it with Node's Promise
mongoose.Promise = global.Promise;
app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(bodyParser.json());
app.use('/users', routes);
app.use('/auth',require('./routes/auth'));
app.use('/locations',routes_location);
app.use('/dailyStatuses',routes_dailyStatus);
app.use('/ad',routes_ad);
app.use('/requests',routes_request);
app.use(errorHandler);
process.on("unhandledRejection",(err,promise)=>{
  console.log(`Logged Error: ${err}`);
  server.close(()=> process.exit(1));
  
});
app.use((err, req, res, next) => {
  console.log(err);
  next();
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});