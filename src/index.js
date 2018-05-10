'use strict';
const express = require('express');
const mongoose = require('mongoose');
//const bodyParser = require('body-parser');
const Todo = require('./todo-model');
const Hapi = require('hapi');

const server = Hapi.server({
    port: 4000,
    host: '0.0.0.0'
});

server.route({
	config: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        }
    },
    method: 'GET',
    path: '/checkDB',
    handler: (request, h) => {

        return h.response().code(200);
    }
});

server.route({
	config: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        }
    },
    method: 'POST',
    path: '/generate',
    handler: (request, h) => {

        return h.response().code(200);;
    }
});

server.route({
	config: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        }
    },
    method: 'GET',
    path: '/queryTime',
    handler: (request, h) => {

        return '0.0023s';
    }
});

const init = async () => {

    await server.start();
    console.log(`HAPI running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();