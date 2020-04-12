const destroySession = require('../helpers/destroySession').destroySession;

const handleSignOut = (req, res) => {
  const { authorization } = req.headers;
  const token = authorization.replace('Bearer ', '');
  return destroySession(token).then(resp => res.json(resp))
    .catch(err => res.status(401).json(err))
};

module.exports = {
  handleSignOut
};