const router = require('app/utils/express')();
const { assertNotNull } = require('app/utils/request-validator');

const authAction = require('app/actions/auth');

router.post('/', async (req, res) => {
  assertNotNull(req.body, 'username');
  assertNotNull(req.body, 'password');

  const result = await authAction.authenticate(
    req.body.username,
    req.body.password
  );

  res.json({ data: result });
});

router.use('/verify', require('./verify'));

module.exports = router.express();
