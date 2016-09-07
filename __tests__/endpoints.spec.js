'use strict';

/*===============================
=            MODULES            =
===============================*/

require('chai').should();
const app = require('./app.setup').app;

/*=====  End of MODULES  ======*/

const routeRegex = app._router.stack.filter(r => r.name === 'router').map(r => String(r.regexp));

describe('routes', () => {

  it('should have auth routes', () => {
    routeRegex.indexOf('/^\\/auth\\/?(?=\\/|$)/i').should.not.equal(-1);
  });

});

