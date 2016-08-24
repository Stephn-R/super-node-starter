'use strict';

require('babel-register');

/*===============================
=            MODULES            =
===============================*/

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

import http from 'http';
import app from './app';
import log from './config/logging';

/*=====  End of MODULES  ======*/

/*----------  BUILDING WEB SERVER  ----------*/
const appServer = http.createServer(app);
const port = process.env.PORT;

/*----------  EXECUTE SERVER  ----------*/
appServer.listen(port, () => {
  log.info(`Web Server Environment: ${process.env.NODE_ENV}`);
  log.info(`Web server listening on port ${process.env.PORT}`);
  log.info('Web server started');
});
