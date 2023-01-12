const express = require('express');
const app = express();
const path = require('path');

require('dotenv').config({path: path.resolve(__dirname, '../.env')});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
  next();
});


app.use('/api/opensea', require('./routes/opensea.js'));



const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Web server running on: http://localhost:${PORT}`);
});