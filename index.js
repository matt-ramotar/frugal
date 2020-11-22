const express = require('express');
const app = require('./backend/server/server');
const { port } = require('./config');

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
