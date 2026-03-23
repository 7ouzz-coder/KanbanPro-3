const { Tablero, Lista, Tarjeta } = require('../models');

// ─── Tableros ────────────────────────────────────────────────────────────────

const getTableros = async (req, res) => {
  try {
    const tableros = await Tablero.findAll({
      where: { usuarioId: req.usuario.id },
      include: [{ model: Lista, include: [Tarjeta] }],
    });
    return res.status(200).json(tableros);
  } catch (error) {
    console.error('Error en getTableros:', error.message);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const createTablero = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;

    if (!nombre) {
      return res.status(400).json({ error: 'El nombre del tablero es obligatorio' });
    }

    const tablero = await Tablero.create({
      nombre,
      descripcion,
      usuarioId: req.usuario.id,
    });

    return res.status(201).json(tablero);
  } catch (error) {
    console.error('Error en createTablero:', error.message);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const updateTablero = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;

    const tablero = await Tablero.findOne({
      where: { id, usuarioId: req.usuario.id },
    });

    if (!tablero) {
      return res.status(404).json({ error: 'Tablero no encontrado' });
    }

    await tablero.update({ nombre, descripcion });
    return res.status(200).json(tablero);
  } catch (error) {
    console.error('Error en updateTablero:', error.message);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const deleteTablero = async (req, res) => {
  try {
    const { id } = req.params;

    const tablero = await Tablero.findOne({
      where: { id, usuarioId: req.usuario.id },
    });

    if (!tablero) {
      return res.status(404).json({ error: 'Tablero no encontrado' });
    }

    await tablero.destroy();
    return res.status(200).json({ mensaje: 'Tablero eliminado correctamente' });
  } catch (error) {
    console.error('Error en deleteTablero:', error.message);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// ─── Listas ──────────────────────────────────────────────────────────────────

const createLista = async (req, res) => {
  try {
    const { tableroId } = req.params;
    const { nombre, posicion } = req.body;

    if (!nombre) {
      return res.status(400).json({ error: 'El nombre de la lista es obligatorio' });
    }

    // verificar que el tablero pertenece al usuario
    const tablero = await Tablero.findOne({
      where: { id: tableroId, usuarioId: req.usuario.id },
    });

    if (!tablero) {
      return res.status(404).json({ error: 'Tablero no encontrado' });
    }

    const lista = await Lista.create({ nombre, posicion: posicion || 0, tableroId });
    return res.status(201).json(lista);
  } catch (error) {
    console.error('Error en createLista:', error.message);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const updateLista = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, posicion } = req.body;

    const lista = await Lista.findByPk(id, {
      include: [{ model: Tablero, where: { usuarioId: req.usuario.id } }],
    });

    if (!lista) {
      return res.status(404).json({ error: 'Lista no encontrada' });
    }

    await lista.update({ nombre, posicion });
    return res.status(200).json(lista);
  } catch (error) {
    console.error('Error en updateLista:', error.message);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const deleteLista = async (req, res) => {
  try {
    const { id } = req.params;

    const lista = await Lista.findByPk(id, {
      include: [{ model: Tablero, where: { usuarioId: req.usuario.id } }],
    });

    if (!lista) {
      return res.status(404).json({ error: 'Lista no encontrada' });
    }

    await lista.destroy();
    return res.status(200).json({ mensaje: 'Lista eliminada correctamente' });
  } catch (error) {
    console.error('Error en deleteLista:', error.message);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// ─── Tarjetas ─────────────────────────────────────────────────────────────────

const createTarjeta = async (req, res) => {
  try {
    const { listaId } = req.params;
    const { titulo, descripcion, etiqueta, posicion } = req.body;

    if (!titulo) {
      return res.status(400).json({ error: 'El título de la tarjeta es obligatorio' });
    }

    // verificar que la lista pertenece a un tablero del usuario
    const lista = await Lista.findByPk(listaId, {
      include: [{ model: Tablero, where: { usuarioId: req.usuario.id } }],
    });

    if (!lista) {
      return res.status(404).json({ error: 'Lista no encontrada' });
    }

    const tarjeta = await Tarjeta.create({
      titulo,
      descripcion,
      etiqueta: etiqueta || 'Setup',
      posicion: posicion || 0,
      listaId,
    });

    return res.status(201).json(tarjeta);
  } catch (error) {
    console.error('Error en createTarjeta:', error.message);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const updateTarjeta = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descripcion, etiqueta, posicion } = req.body;

    const tarjeta = await Tarjeta.findByPk(id, {
      include: [{
        model: Lista,
        include: [{ model: Tablero, where: { usuarioId: req.usuario.id } }],
      }],
    });

    if (!tarjeta) {
      return res.status(404).json({ error: 'Tarjeta no encontrada' });
    }

    await tarjeta.update({ titulo, descripcion, etiqueta, posicion });
    return res.status(200).json(tarjeta);
  } catch (error) {
    console.error('Error en updateTarjeta:', error.message);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const deleteTarjeta = async (req, res) => {
  try {
    const { id } = req.params;

    const tarjeta = await Tarjeta.findByPk(id, {
      include: [{
        model: Lista,
        include: [{ model: Tablero, where: { usuarioId: req.usuario.id } }],
      }],
    });

    if (!tarjeta) {
      return res.status(404).json({ error: 'Tarjeta no encontrada' });
    }

    await tarjeta.destroy();
    return res.status(200).json({ mensaje: 'Tarjeta eliminada correctamente' });
  } catch (error) {
    console.error('Error en deleteTarjeta:', error.message);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = { getTableros, createTablero, updateTablero, deleteTablero,createLista, updateLista, deleteLista, createTarjeta, updateTarjeta, deleteTarjeta };