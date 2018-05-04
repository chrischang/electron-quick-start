// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const AWS = require('aws-sdk');
const cloudwatch = new AWS.CloudWatch({
    region: 'us-east-1',
    accessKeyId: process.env.ACCESS,
    secretAccessKey: process.env.SECRET
});

