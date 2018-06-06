const assert = require('assert');
const app = require('../../src/app');

describe('\'sync_conflicts_example\' service', () => {
  it('registered the service', () => {
    const service = app.service('sync-conflicts-example');

    assert.ok(service, 'Registered the service');
  });
});
