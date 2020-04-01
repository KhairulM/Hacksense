const express = require('express');

class Router {
  constructor() {
    this._router = express.Router();
  }

  _define(method, endpoint, handler) {
    this._router[method](endpoint, async (req, res, next) => {
      try {
        await Promise.resolve(handler(req, res));
      } catch (err) {
        next(err);
      }
    });
  }

  _useWithMiddleware(endpoint, middleware, subRouter) {
    this._router.use(
      endpoint,
      (req, res, next) => {
        try {
          middleware(req);
          next();
        } catch (err) {
          next(err);
        }
      },
      subRouter instanceof Router ? subRouter.express() : subRouter
    );
  }

  _useWithoutMiddleware(endpoint, subRouter) {
    this._router.use(
      endpoint,
      subRouter instanceof Router ? subRouter.express() : subRouter
    );
  }

  get(endpoint, handler) {
    this._define('get', endpoint, handler);
  }

  post(endpoint, handler) {
    this._define('post', endpoint, handler);
  }

  put(endpoint, handler) {
    this._define('put', endpoint, handler);
  }

  delete(endpoint, handler) {
    this._define('delete', endpoint, handler);
  }

  use(arg1, arg2, arg3) {
    if (arg3 == null) {
      this._useWithoutMiddleware(arg1, arg2);
    } else {
      this._useWithMiddleware(arg1, arg2, arg3);
    }
  }

  express() {
    return this._router;
  }
}

module.exports = () => new Router();
