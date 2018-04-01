const { authApi } = require('./auth');
const { usersApi } = require('./users');
const { messagesApi } = require('./messages');

module.exports = function api(server) {
  server.use('/', authApi);
  server.use('/', usersApi);
  server.use('/', messagesApi);
}