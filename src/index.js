'use strict';
const express = require('express');
const mongoose = require('mongoose');
//const bodyParser = require('body-parser');
var Boom    = require('boom');
var Joi     = require('joi');
const Books = require('./todo-model');
const Hapi = require('hapi');

const server = Hapi.server({
    port: 4000,
    host: '0.0.0.0'
});

var promise = mongoose.connect('mongodb://admin:admin@localhost:27017/admin',
								{ useMongoClient: true });

server.route({
	config: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        }
    },
    method: 'GET',
    path: '/checkDB',
    handler: (request, reply) => {
		if (mongoose.connection.readyState == 1) {
			return reply.response().code(200);
		}
		return reply.response().code(500);
    }
});

var event;
server.route({
	config: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        }
    },
    method: 'POST',
    path: '/generate',
    handler: (request, reply) => {
		var listDocuments= [
		{
        title: "test1",
        number_of_files: "100"
		},
		{
        title: "test2",
        number_of_files: "200"
		},
		{
        title: "test3",
        number_of_files: "300"
		}
	];

	Books.create(listDocuments, function (err, results) {
		reply.response(results);
	});
		//event = new Books();
		//event.title = 'bookName';
		//event.number_of_files = 123;
		//event.save(function (err) {
         //       if (!err) {
         //           reply.response().code(200);
         //       } else {
         //           reply.response().code(403);
         //       }
         //   });
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
    handler: (request, reply) => {
		Books.count( {}, 
		 function (err, result) {});
		return time;
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