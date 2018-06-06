// Initializes the `sync_conflicts_example` service on path `/sync-conflicts-example`
const createService = require('feathers-mongodb');
const hooks = require('./sync-conflicts-example.hooks');

module.exports = function (app) {
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/sync-conflicts-example', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('sync-conflicts-example');

  mongoClient.then(db => {
    service.Model = db.collection('sync-conflicts-example');
  });

  service.hooks(hooks);
};
