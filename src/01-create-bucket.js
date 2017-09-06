const s3Client = require('./s3-client');
module.exports = createBucket;

function createBucket(bucketNamePrefix) {
  const uniqueBucketName = `${bucketNamePrefix.toLowerCase()}-${getTimestampInSeconds()}`;

  return s3Client
    .createBucket({ Bucket: uniqueBucketName })
    .promise()
    .then(() => uniqueBucketName);
}

function getTimestampInSeconds() {
  return Math.round(Date.now() / 1000);
}