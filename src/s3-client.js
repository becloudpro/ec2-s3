const AWS = require('aws-sdk');
const Promise = require('bluebird');

AWS.config.setPromisesDependency(Promise);

const s3Client = new AWS.S3({
  apiVersion: 'latest',
  region: 'eu-central-1',
});

module.exports = s3Client;