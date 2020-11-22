#!/usr/bin/env node
const http = require('http');

const args = process.argv.slice(2)
const [method, key, value] = args;

const options = {
    host: 'localhost',
    path: '/' + key,
    port: process.env.PORT || '8080',
    method: method,
    headers: {
        'Content-Type': 'text/plain'
    },
};

function callback(response) {
    let str = ''
    response.on('data', (chunk) => {
        str += chunk;
    });

    response.on('end', () => {
        console.log(response.statusCode, str.toString());
    });
}

const req = http.request(options, callback);
if (value) {
    req.write(value);
}
req.end();
