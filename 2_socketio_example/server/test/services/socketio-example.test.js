const assert = require('assert');
const app = require('../../src/app');

describe('\'socketio_example\' service', () => {
  it('registered the service', () => {
    const service = app.service('socketio-example');

    assert.ok(service, 'Registered the service');
  });
});
