function addUpdateDate(context)
{
  context.data.updateAt = new Date()
}

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [ addUpdateDate ],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
