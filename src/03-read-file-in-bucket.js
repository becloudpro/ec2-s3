const s3Client = require('./s3-client');
module.exports = readFileInBucket;

function readFileInBucket(bucketName, fileName) {
  return s3Client
    .getObject({ Bucket: bucketName, Key: fileName })
    .promise()
    .then(result => result.Body);
}