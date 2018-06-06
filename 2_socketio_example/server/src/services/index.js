const socketioExample = require('./socketio-example/socketio-example.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(socketioExample);
};
