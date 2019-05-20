var express = require('express');
var router = express.Router();
var fetch = require('cross-fetch');
var config = require('../config');

var API_URL = config.API_DOMAIN + config.API_PATH;

router.post('/', (req, res, next) => {
  console.log(req.body);
  var resStatus = 500;

  fetch(API_URL, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(req.body), // body data 
  })
    .then(fetchRes => {
      resStatus = fetchRes.status;
      return fetchRes.text();
    })
    .then(obj => {
      res.status(resStatus).send(obj);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
});

module.exports = router;
