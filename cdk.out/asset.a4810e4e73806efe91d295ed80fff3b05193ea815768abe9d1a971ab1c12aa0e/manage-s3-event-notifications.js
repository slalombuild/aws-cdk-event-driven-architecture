const aws = require('aws-sdk');
const s3 = new aws.S3();
const url = require('url');
const https = require('https');

exports.handler = async function (event, context) {
    console.log("Hello from cdk lambda function!!")
};