const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  // intentamos obtener el token de la cabecera authorization o de las cookies
  const token =
    (req.headers['authorization'] || '').replace('Bearer ', '') ||
    (req.cookies && req.cookies.token);

  if (!token) {
    if (req.path.startsWith('/api') || req.xhr) {
      return res.status(401).json({ error: 'Token no proporcionado' });
    }
    return res.redirect('/login');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (error) {
    if (req.path.startsWith('/api') || req.xhr) {
      return res.status(403).json({ error: 'Token inválido o expirado' });
    }
    return res.redirect('/login');
  }
};

module.exports = { verifyToken };