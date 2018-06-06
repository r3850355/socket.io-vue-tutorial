const { authenticate } = require('@feathersjs/authentication').hooks;
const { required } = require('feathers-hooks-common');
const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;


async function checkuser(context){
  let user = context.data.account
  let isExist = await context.app.service('users').find({ query:{ account:user} }).then( res =>  res.total > 0 ? true : false )        
  if(isExist){ throw new Error('帳號 '+ user + ' 已經存在') }
} 

module.exports = {
  before: {
    all: [],
    find: [],
    get: [ authenticate('jwt') ],
    create: [ 
      required('account','password'), 
      hashPassword(),
      checkuser
    ],
    update: [ required('account','password'), hashPassword(),  authenticate('jwt') ],
    patch: [ required('account','password'), hashPassword(),  authenticate('jwt') ],
    remove: [ authenticate('jwt') ]
  },

  after: {
    all: [ 
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
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
