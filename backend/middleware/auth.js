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
  token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZDA5YjA3N2ViYjZlZDhmYTY2Y2VmZCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzA4MTY5OTkxfQ.FtwXu7K8N4X8lrYR5y1cutMM3xhrTfQg4cdpCVhJpxU"
  return token;
};