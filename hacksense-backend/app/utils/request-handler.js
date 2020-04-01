function createHandler(handler) {
  return async (req, res, next) => {
    try {
      await Promise.resolve(handler(req, res));
    } catch(err) {
      next(err);
    }
  };
}

module.exports = {
  createHandler
};
