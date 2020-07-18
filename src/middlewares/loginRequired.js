const jwt = require('jsonwebtoken');
const User = require('../model/UserModel');

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ error: 'Login requerido' });

  const [, token] = authorization.split(' ');

  try {
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);

    const { ra, email } = payload;

    const userModel = new User();

    const userNotFound = await userModel.userExists(ra);

    if (userNotFound)
      return res.status(401).json({ error: 'Usuário não existe' });

    req.userRA = ra;
    req.userEmail = email;

    return next();
  } catch (err) {
    return res.status(500).json({
      error: {
        name: err.name,
        message: err.message,
      },
    });
  }
};
