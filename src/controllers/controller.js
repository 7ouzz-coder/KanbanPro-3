const { Tablero, Lista, Tarjeta } = require('../models');

// rutas publicas sin protección
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
  // el registro lo hace auth controller esto solo redirige
  res.redirect('/login');
};

exports.login = (req, res) => {
  res.render('login', {
    layout: 'layouts/layout',
    title: 'Iniciar Sesión',
  });
};

exports.procesarLogin = (req, res) => {
  // el login lo hace auth controller esto solo redirige
  res.redirect('/dashboard');
};

// dashboard y creación de tarjetas con protección jwt
exports.dashboard = async (req, res) => {
  try {
    const usuarioId = req.usuario.id;

    const tableros = await Tablero.findAll({
      where: { usuarioId },
      include: [{ model: Lista, include: [Tarjeta] }],
    });

    // Si el usuario no tiene tableros, se muestra un mensaje en el dashboard
    const tableroActivo = tableros[0] || null;

    res.render('dashboard', {
      layout: 'layouts/layout',
      title: 'Dashboard',
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

exports.crearTarjeta = async (req, res) => {
  try {
    const { titulo, descripcion, etiqueta, listaId } = req.body;

    if (!titulo || !descripcion || !etiqueta || !listaId) {
      return res.status(400).send('Faltan datos obligatorios');
    }

    // verificar que la lista pertenece a un tablero del usuario
    const lista = await Lista.findByPk(listaId, {
      include: [{ model: Tablero, where: { usuarioId: req.usuario.id } }],
    });

    if (!lista) {
      return res.status(404).send('Lista no encontrada');
    }

    const posicion = await Tarjeta.count({ where: { listaId } });

    await Tarjeta.create({ titulo, descripcion, etiqueta, posicion, listaId });
    res.redirect('/dashboard');
  } catch (error) {
    console.error('Error en crearTarjeta:', error.message);
    res.status(500).send('Error al crear la tarjeta');
  }
};