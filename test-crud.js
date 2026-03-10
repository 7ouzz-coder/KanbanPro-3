require('dotenv').config();

const { sequelize, Tablero, Lista, Tarjeta } = require('./src/models');

async function runCRUD() {
  try {
    await sequelize.authenticate();
    console.log('Conexion a PostgreSQL establecida.\n');

    // CREATE
    console.log('Creando tarjeta de prueba...');
    const lista = await Lista.findOne();
    if (!lista) throw new Error('No hay listas. Ejecuta seed.js primero.');

    const nuevaTarjeta = await Tarjeta.create({
      titulo:      'Tarjeta de prueba CRUD',
      descripcion: 'Creada por test-crud.js',
      etiqueta:    'Testing',
      posicion:    99,
      listaId:     lista.id,
    });
    console.log('Tarjeta creada - ID:', nuevaTarjeta.id, '| listaId:', lista.id);

    // READ
    console.log('\nLeyendo datos del tablero con sus listas y tarjetas...');
    const tablero = await Tablero.findOne({
      include: [{
        model: Lista,
        include: [Tarjeta],
      }],
    });
    console.log('Tablero:', tablero.nombre);
    tablero.listas.forEach((l) => {
      console.log('  Lista:', l.nombre, '(' + l.tarjetas.length + ' tarjetas)');
      l.tarjetas.forEach((t) => console.log('    -', t.titulo));
    });

    // UPDATE
    console.log('\nActualizando el titulo de la tarjeta creada...');
    const tituloAnterior = nuevaTarjeta.titulo;
    await nuevaTarjeta.update({ titulo: 'Tarjeta actualizada por test-crud.js' });
    await nuevaTarjeta.reload();
    console.log('Antes:', tituloAnterior);
    console.log('Ahora:', nuevaTarjeta.titulo);

    // DELETE
    console.log('\nEliminando la tarjeta creada...');
    const idEliminado = nuevaTarjeta.id;
    await nuevaTarjeta.destroy();
    const verificacion = await Tarjeta.findByPk(idEliminado);
    console.log('Tarjeta ID', idEliminado, 'eliminada. Existe en BD:', verificacion !== null);

    console.log('\nCRUD completado.');
    process.exit(0);

  } catch (error) {
    console.error('Error en el archivo test-crud.js:', error.message);
    process.exit(1);
  }
}

runCRUD();