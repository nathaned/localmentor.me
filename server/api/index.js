const { authApi } = require('./auth');
const { usersApi } = require('./users');
const { messagesApi } = require('./messages');
const { tagsApi } = require('./tags');
const { connectionsApi } = require('./connections');


module.exports = function api(server) {
  server.use('/', authApi);
  server.use('/', usersApi);
  server.use('/', messagesApi);
  server.use('/', tagsApi);
  server.use('/', connectionsApi);
}
