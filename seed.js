require('dotenv').config();

const { sequelize, Usuario, Tablero, Lista, Tarjeta } = require('./src/models');

async function seed() {
  try {
    await sequelize.sync({ force: true });
    console.log('Tablas creadas.');

    const [ana, pedro] = await Usuario.bulkCreate([
      { nombre: 'Ana Garcia',  email: 'ana@kanbanpro.cl',   password: 'hashed_password_1' },
      { nombre: 'Pedro Lopez', email: 'pedro@kanbanpro.cl', password: 'hashed_password_2' },
    ]);

    const [tb1, tb2, tb3] = await Tablero.bulkCreate([
      { nombre: 'Proyecto Web',    descripcion: 'Desarrollo del sitio corporativo',   usuarioId: ana.id   },
      { nombre: 'App Movil',       descripcion: 'Aplicacion Flutter para clientes',   usuarioId: ana.id   },
      { nombre: 'Infraestructura', descripcion: 'Gestion de servidores y despliegue', usuarioId: pedro.id },
    ]);

    const [l1, l2, l3] = await Lista.bulkCreate([
      { nombre: 'Por Hacer',   posicion: 0, tableroId: tb1.id },
      { nombre: 'En Progreso', posicion: 1, tableroId: tb1.id },
      { nombre: 'Completado',  posicion: 2, tableroId: tb1.id },
    ]);

    const [l4, l5] = await Lista.bulkCreate([
      { nombre: 'Backlog',     posicion: 0, tableroId: tb2.id },
      { nombre: 'En Revision', posicion: 1, tableroId: tb2.id },
    ]);

    const [l6] = await Lista.bulkCreate([
      { nombre: 'Pendiente', posicion: 0, tableroId: tb3.id },
    ]);

    await Tarjeta.bulkCreate([
      { titulo: 'Configurar entorno',          descripcion: 'Instalar Node.js y dependencias',      etiqueta: 'Setup',    posicion: 0, listaId: l1.id },
      { titulo: 'Disenar wireframes',          descripcion: 'Bocetos de las pantallas principales', etiqueta: 'Diseno',   posicion: 1, listaId: l1.id },
      { titulo: 'Implementar autenticacion',   descripcion: 'Login y registro con JWT',             etiqueta: 'Backend',  posicion: 2, listaId: l1.id },
      { titulo: 'Crear componentes UI',        descripcion: 'Navbar, Footer, Cards reutilizables',  etiqueta: 'Frontend', posicion: 0, listaId: l2.id },
      { titulo: 'Conectar con API REST',       descripcion: 'Integracion con backend de datos',     etiqueta: 'Backend',  posicion: 1, listaId: l2.id },
      { titulo: 'Crear repositorio GitHub',    descripcion: 'Inicializar el proyecto con Git',      etiqueta: 'Setup',    posicion: 0, listaId: l3.id },
      { titulo: 'Arquitectura Flutter',        descripcion: 'Elegir entre BLoC y Riverpod',         etiqueta: 'Diseno',   posicion: 0, listaId: l4.id },
      { titulo: 'Pantalla de login',           descripcion: 'UI y validaciones del formulario',     etiqueta: 'Frontend', posicion: 1, listaId: l4.id },
      { titulo: 'Pruebas de integracion',      descripcion: 'Tests E2E con Flutter Driver',         etiqueta: 'Testing',  posicion: 0, listaId: l5.id },
      { titulo: 'Configurar PostgreSQL',       descripcion: 'Instancia en Railway o Render',        etiqueta: 'Backend',  posicion: 0, listaId: l6.id },
    ]);

    console.log('Usuarios: ' + (await Usuario.count()));
    console.log('Tableros: ' + (await Tablero.count()));
    console.log('Listas:   ' + (await Lista.count()));
    console.log('Tarjetas: ' + (await Tarjeta.count()));
    console.log('Seed completado.');
    process.exit(0);

  } catch (error) {
    console.error('Error en seed:', error.message);
    process.exit(1);
  }
}

seed();