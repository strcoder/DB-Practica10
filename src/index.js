const express = require('express');
const { port } = require('./config');
const routeStudent = require('./routes/alumnos');
const routeMaterias = require('./routes/materias');

const app = express();

app.use(express.json());
routeStudent(app);
routeMaterias(app);


app.listen(port, () => {
  console.log(`\nApp listen in http://localhost:${port}\n`);
})