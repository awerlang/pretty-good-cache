# pretty-good-cache

A pretty, pretty, pretty, pretty good caching service

## Features

* In-memory storage
* Key/value as strings
* REST API
* Eviction policies: LRU (max items)

## Running

`npm start`

The service will listen on `http://localhost:8080`. To bind to a different port, set the environment variable `PORT`.

## Usage

The REST API implements the methods as follows:

* Retrieve a value for a key: `GET /key`
* Add a key/value: `POST /key {body}`
* Add or update a value: `PUT /key {body}`

When required, format body as `text/plain` and set the `Content-Type` header.

A local test client is provided:

`bin/client.js [method] [key] [value for POST/PUT]`

## Configuration

* `PORT`: to bind to a different port
* `LRU_MAX_ITEMS`: set to a number to use the LRU eviction policy

## Roadmap

* Use available/consumed memory to base eviction policies
* Allow keys to be set with a time-to-live
* Use persistent storage to allow for restarts
