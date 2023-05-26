const withAuth = (req, res, next) => {
    if (!req.session.logged_in) {
      res.redirect('/login-or-signup');
    } else {
      next();
    }
  };
  
  module.exports = withAuth;