const { io } = require('../../index');
const { logger } = require('../utils/logs.util');

io.on('connection', (socket) => {
  logger('info', 'User connected');
});
