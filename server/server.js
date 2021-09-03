const express = require('express');
const path = require('path');
const PORT = 3333;
const cors = require('cors');
const dbRetriver = require('../models/dbRetriver');
const GQLController = require('./controller/GQLcontroller');
const injection = require('../models/injection.js')



const app = express();
app.use(cors());
// const bodyParser = require('body-parser');

// parse application/json
// app.use(bodyParser.json())

app.use(express.json());

// app.post('/', (req, res) => {
//   res.status(200).json(req.body);
// })

app.post('/', dbRetriver.main, (req, res) => {
  return res
    .status(200)
    .json({ fields: res.locals.db_data, tables: res.locals.db_tables });
});

app.post('/injection', injection, (req, res) => {
  return res.status(200)
});

app.post(
  '/qltest',
  dbRetriver.main,
  GQLController.createGQLSchema,
  (req, res) => {
    return res.status(200).json({ data: res.locals.GQLSchema });
  }
);

// global error handler
app.use(function (err, req, res, next) {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

module.exports = app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
