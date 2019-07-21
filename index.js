const express = require('express');
const redis = require('redis');
const process = require('process');

const app = express();
const client = redis.createClient({
    host: 'redis-server',
    port: 6379
});
client.set('noOfUsers',0);

app.get('/', (req, res) => {
    process.exit(0);
    client.get('noOfUsers', (err, noOfUsers) => {
      res.send('Number of users is ' + noOfUsers);
      client.set('noOfUsers', parseInt(noOfUsers) + 1);
    });
  });

app.listen(8081, () => {
    console.log("Listening on port 8081");
})