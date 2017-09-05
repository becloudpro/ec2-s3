const port = process.env.PORT || 3000;
const app = require('express')();

app.use(require('body-parser').urlencoded({extended: true}));
require('./app-routes')(app);

app.listen(port, () => {
  console.info(`EC2-S3 application is listening on port ${port}`)
});