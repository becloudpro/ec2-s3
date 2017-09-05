const createBucket = require('./src/01-create-bucket');
const createFileInBucket = require('./src/02-create-file-in-bucket');
const readFileInBucket = require('./src/03-read-file-in-bucket');
const deleteBucket = require('./src/04-delete-bucket');

module.exports = function(app) {
  app.get('/', (req, res) => {
    res.send(`
      <html>
      <body>
        <h1>Be Cloud Pro!</h1>
        <form action="/create-bucket" method="POST">
          <label>Bucket Name Prefix: <input type="text" name="bucketNamePrefix" required /></label><br />
          <button>Create New Bucket</button>
        </form>
      </body>
      </html>
    `);
  });

  app.post('/create-bucket', (req, res, next) => {
    const { bucketNamePrefix } = req.body;

    createBucket(bucketNamePrefix).then(bucketName => {
      res.send(`
        <html>
        <body>
          <h1>You've sucessfully created a bucket "${bucketName}"</h1>
          <form action="/create-file" method="POST">
            <input type="hidden" name="bucketName" value="${bucketName}" />
            <label>File Name: <input type="text" name="fileName" required /></label><br />
            <label>File Body: <textarea name="fileBody" required></textarea></label><br />
            <button>Create New File</button>
          </form>
        </body>
        </html>
      `);
    }).catch(next);
  });

  app.post('/create-file', (req, res, next) => {
    const { bucketName, fileName, fileBody } = req.body;

    createFileInBucket(bucketName, fileName, fileBody).then(() => {
      res.send(`
        <html>
        <body>
          <h1>You've sucessfully created a file "${fileName}" in the bucket "${bucketName}"</h1>
          <a href="/bucket/${bucketName}/file/${fileName}">Read the file content</a>
        </body>
        </html>
      `);
    }).catch(next);
  });

  app.get('/bucket/:bucketName/file/:fileName', (req, res, next) => {
    const { bucketName, fileName } = req.params;

    readFileInBucket(bucketName, fileName).then(fileBody => {
      res.send(`
        <html>
        <body>
          <h1>You've sucessfully read the file "${fileName}" in the bucket "${bucketName}":</h1>
          <p>${fileBody}</p>
          <form action="/delete-bucket" method="POST">
            <input type="hidden" name="bucketName" value="${bucketName}" />
            <button>Delete the bucket now!...</button>
          </form>
        </body>
        </html>
      `);
    }).catch(next);
  });

  app.post('/delete-bucket', (req, res, next) => {
    const { bucketName } = req.body;

    deleteBucket(bucketName).then(() => {
      res.send(`
        <html>
        <body>
          <h1>You've sucessfully deleted the bucket "${bucketName}"</h1>
        </body>
        </html>
      `);
    }).catch(next);
  });
};