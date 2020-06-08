const express = require('express');
const idRouter = require('./routes/idRouter');
const app = express();

app.use('/generateId', idRouter);

const port = 4000;
app.listen(port, () => console.log(`listening on port ${port}`));
