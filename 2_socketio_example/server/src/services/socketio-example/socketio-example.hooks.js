

function setUpdateDate(context)
{
  context.data.updatedAt = new Date()
}

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [ setUpdateDate ],
    update: [ setUpdateDate ],
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
