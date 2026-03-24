const { Tablero, Lista, Tarjeta } = require('../models');

exports.home = (req, res) => {
  res.render('home', {
    layout: 'layouts/layout',
    title: 'Inicio',
  });
};

exports.register = (req, res) => {
  res.render('register', {
    layout: 'layouts/layout',
    title: 'Registro',
  });
};

exports.procesarRegistro = (req, res) => {
  res.redirect('/login');
};

exports.login = (req, res) => {
  res.render('login', {
    layout: 'layouts/layout',
    title: 'Iniciar Sesión',
  });
};

exports.procesarLogin = (req, res) => {
  res.redirect('/login');
};

// el sv obtiene datos con sequelize y los pasa a la vista
exports.dashboard = async (req, res) => {
  try {
    const tableros = await Tablero.findAll({
      where: { usuarioId: req.usuario.id },
      include: [{ model: Lista, include: [Tarjeta] }],
    });

    const tableroActivo = tableros[0] || null;

    res.render('dashboard', {
      layout: 'layouts/layout',
      title: 'Dashboard',
      token: req.query.token,
      usuario: req.usuario.nombre,
      proyecto: {
        nombre: 'KanbanPro',
        descripcion: `Bienvenido, ${req.usuario.nombre}`,
      },
      tablero: tableroActivo
        ? {
            nombre: tableroActivo.nombre,
            listas: tableroActivo.listas.map((l) => ({
              id: l.id,
              nombre: l.nombre,
              tarjetas: l.tarjetas.map((t) => ({
                id: t.id,
                titulo: t.titulo,
                descripcion: t.descripcion,
                etiqueta: t.etiqueta,
              })),
            })),
          }
        : { nombre: 'Sin tableros', listas: [] },
    });
  } catch (error) {
    console.error('Error en dashboard:', error.message);
    res.status(500).send('Error al cargar el dashboard');
  }
};