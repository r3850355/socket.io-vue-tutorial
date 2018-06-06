// Initializes the `socketio_example` service on path `/socketio-example`
const createService = require('feathers-mongodb');
const hooks = require('./socketio-example.hooks');

module.exports = function (app) {
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/socketio-example', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('socketio-example');

  mongoClient.then(db => {
    service.Model = db.collection('socketio-example');
  });

  service.hooks(hooks);
};
