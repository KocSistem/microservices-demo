const jsonResponse = require('../models/express/jsonResponse');
const st = require('../models/util/status');
const site = require('../models/util/site');
const express = require('express');
const path = require('path');
const redis = require('redis');
const redisHost = process.env.REDIS_HOST;
const redisPort = process.env.REDIS_PORT;
const router = express.Router();

const routename = path
  .basename(__filename)
  .replace('.js', ' default endpoint for ' + site.name);

/* Redis Client */

/* GET JSON :: Route Base Endpoint */
router.get('/', (req, res, next) => {
  jsonResponse.json(res, routename, st.OK.code, {});
});

router.post('/set/:key', (req, res, next) => {
  console.log('setting key ', req.params.key);
  console.log('data:', req.body);
  var inputKey = req.params.key.toString();
  var inputBody = JSON.stringify(req.body);
  var client = redis.createClient(redisPort, redisHost);
  client.set(inputKey, inputBody, (err, reply) => {
    if (!err) jsonResponse.json(res, st.OK.msg, st.OK.code, reply);
  });

});

router.get('/get/:key', (req, res, next) => {
  cacheGet(req.params.key, site.CACHE_GET_EVENT, (err, data) => {
    if (!err) jsonResponse.json(res, st.OK.msg, st.OK.code, data);
  });
});

function cacheGet(key, event, callback) {
  var client = redis.createClient(redisPort, redisHost);
  client.get(key, (err, data) => {
    // telemetry.trackEvent({name:event})
    callback(err, data);
  });
}

module.exports = router;
