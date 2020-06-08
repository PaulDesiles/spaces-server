const express = require('express');
const helmet = require('helmet')
const idRouter = require('./routes/idRouter');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = express();
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"]
  }
}));

app.use('/generateId', idRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`listening on port ${port}`));
