const feathers = require('@feathersjs/feathers');
const socketio = require('@feathersjs/socketio-client');
const io = require('socket.io-client');
const auth = require('@feathersjs/authentication-client');

const socket = io('http://127.0.0.1:3030');
const app = feathers();


var options = {
  header: 'Authorization', // the default authorization header for REST
  path: '/authentication', // the server-side authentication service path
  jwtStrategy: 'jwt', // the name of the JWT authentication strategy 
  entity: 'user', // the entity you are authenticating (ie. a users)
  service: 'users', // the service to look up the entity
  cookie: 'feathers-jwt', // the name of the cookie to parse the JWT from when cookies are enabled server side
  storageKey: 'feathers-jwt', // the key to store the accessToken in localstorage or AsyncStorage on React Native
  storage: undefined // Passing a WebStorage-compatible object to enable automatic storage on the client.
}


const auth_api = feathers().configure(socketio(socket)).configure(auth(options))


export default auth_api

export const authenticate = auth_api.authenticate
export const logout = auth_api.logout


global.socket = socket