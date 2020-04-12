const getAuthTokenId = require('../helpers/getAuthTokenId').getAuthTokenId;
const createSession = require('../helpers/createSession').createSession;

const handleRegister = (db, bcrypt, req, res) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    return Promise.reject('incorrect form submission');
  }
  const hash = bcrypt.hashSync(password);
  return db.transaction(trx => {
    trx.insert({
      hash: hash,
      email: email
    })
      .into('login')
      .returning('email')
      .then(loginEmail => {
        return trx('users')
          .returning('*')
          .insert({
            email: loginEmail[0],
            name: name,
            joined: new Date()
          })
          .then(user => {
            return user[0]})
          .catch(() => Promise.reject('unable to get user'))
      })
      .then(trx.commit)
      .catch(() => Promise.reject(trx.rollback))
  })
    .catch(() => Promise.reject('unable to register'))
};

const registerAuthentication = (db, bcrypt) => (req, res) => {
  const { authorization } = req.headers;
  return authorization ? getAuthTokenId(req, res) :
    handleRegister(db, bcrypt, req, res)
      .then(data => {
        return data.id && data.email ? createSession(data) : Promise.reject(data)
      })
      .then(session => res.json(session))
      .catch(err => res.status(400).json(err))
};

module.exports = {
  handleRegister,
  registerAuthentication
};


