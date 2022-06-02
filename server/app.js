const express = require('express');
const path = require('path');
const routes = require('./routes');

let app = express();

app.use(express.json());
// Include routes
app.use('/', routes.payslipRotes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  return res.status(404).send('not found');
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  err = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;
