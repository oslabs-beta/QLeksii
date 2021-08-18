const express = require('express');
const path = require('path');
const PORT = 3333;
const cors = require('cors');
const dbRetriever = require('../models/dbRetriver');
const app = express();

app.get('/', dbRetriever, (req, res) => {
  res.status(200).json({fields:res.locals.db_data, tables: res.locals.db_tables});
});



app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
})