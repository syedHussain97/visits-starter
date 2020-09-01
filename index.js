const express = require('express');
const redis = require('redis');


const app = express();

const client = redis.createClient({
    //this redis-server is going to be replaced/redirected to the redis-server container
    host: 'redis-server',
    port: 6379
});
client.set('visits', 0);

app.get('/', (req, res) => {
    process.exit(0);
    client.get('visits', (error, visits) => {
        res.send('Number of visits is ' + visits);
        client.set('visits', parseInt(visits) + 1);
    })
});

app.listen(8081, () => {
    console.log('Listening on port 8081');
})
