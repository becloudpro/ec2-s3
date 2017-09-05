const s3Client = require('./s3-client');
module.exports = createFileInBucket;

function createFileInBucket(bucketName, fileName, fileBody) {
  return s3Client
    .putObject({ Bucket: bucketName, Key: fileName, Body: fileBody })
    .promise()
    .then(() => fileName);
}

