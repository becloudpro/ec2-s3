const s3Client = require('./s3-client');
module.exports = deleteBucket;

function deleteBucket(bucketName) {
  return clearBucket(bucketName)
    .then(() => s3Client.deleteBucket({ Bucket: bucketName }));
}

function clearBucket(bucketName) {
  return s3Client
    .listObjects({ Bucket: bucketName })
    .promise()
    .then(data => data.Contents)
    .each(item => deleteFile(bucketName, item.Key));
}

function deleteFile(bucketName, fileName) {
  return s3Client
    .deleteObject({ Bucket: bucketName, Key: fileName })
    .promise();
}