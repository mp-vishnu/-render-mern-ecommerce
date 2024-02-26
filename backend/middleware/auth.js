const passport = require('passport');

exports.isAuth = (req, res, done) => {
  return passport.authenticate('jwt')
};

exports.sanitizeUser = (user)=>{
    return {id:user.id, role:user.role}
}

exports.cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['jwt'];
  }
  //TODO : this is temporary token for testing without cookie
  token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZGI2MTExNzAzZDJlYThhNDEyOTlmYSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzA4ODc2MDQ5fQ.oc-bve04y85B97JE57C1r6pPN7qHPKHKfEP2vdfsN0U"
  return token;
};