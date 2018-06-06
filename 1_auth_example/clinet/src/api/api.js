const feathers = require('@feathersjs/feathers');
const socketio = require('@feathersjs/socketio-client');
const io = require('socket.io-client');

export const socket = io('http://192.168.20.64:3030')

const api = feathers().configure(socketio(socket))

export default api

export const users = api.service('users')

global.socket = socket