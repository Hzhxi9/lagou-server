const login = (req, res, next) => {
  const { username, password } = req.body;
  res.render('success', {
    data: JSON.stringify({ username, password }),
  });
};

module.exports = login;
