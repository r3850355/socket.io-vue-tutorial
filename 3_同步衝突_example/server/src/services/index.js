const syncConflictsExample = require('./sync-conflicts-example/sync-conflicts-example.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(syncConflictsExample);
};
