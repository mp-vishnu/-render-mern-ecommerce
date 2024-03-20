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
 //token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZGUxOGIwMjdiM2JjODBjOGIzZWE2MCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzA5MTM4MDgwfQ.RN0Fat2RWO7yvBte6w35yhYqDuFbmxYnK8i4vCNI-rw"
 
  return token;
};