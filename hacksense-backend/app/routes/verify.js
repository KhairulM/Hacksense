const router = require('app/utils/express')();
const { assertNotNull } = require('app/utils/request-validator');
const props = require('app/utils/props');

const authAction = require('app/actions/auth');

router.post('/', async (req, res) => {
  assertNotNull(req.body, 'token');

  const result = await authAction.verify(req.body.token);

  res.json({
    data: props.include(result, ['id', 'type', 'exp'])
  });
});

module.exports = router.express();
