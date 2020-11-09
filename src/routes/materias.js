const express = require('express');
const MateriasServices = require('./../services/materias');
const { nanoid } = require('nanoid');

const apiMaterias = (app) => {
  const router = express.Router();
  const materiasServices = new MateriasServices('materias');

  app.use('/api/materia' ,router);

  router.get('/', async (req, res, next) => {
    // const { id, name, promedio } = req.query;
    const { query } = req;
    try {
      const materias = await materiasServices.getMaterias(query);
      res.status(200).json({
        data: materias,
        message: 'Lista de materias'
      })
    } catch (error) {
      next(error);
    }
  });

  router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
      const materia = await materiasServices.getMateria(id);
      res.status(200).json({
        data: materia,
        message: 'Una materia'
      })
    } catch (error) {
      next(error);
    }
  });

  router.post('/', async (req, res, next) => {
    const { body: materia } = req;
    if (!materia.id) {
      materia.id = nanoid();
    }
    try {
      const createMateria = await materiasServices.createMateria(materia);
      res.status(200).json({
        data: createMateria,
        message: 'Materia Creada',
      });
    } catch (error) {
      next(error);
    }
  });

  router.put('/:id', async (req, res, next) => {
    const { id } = req.params;
    const { body: materia } = req;
    try {
      const updateMateria = await materiasServices.updateMateria(id, materia);
      if (updateMateria) {
        res.status(200).json({
          data: updateMateria,
          message: 'Materia Actualizada',
        });
      } else {
        res.status(404).json({
          data: {},
          message: 'No se pudo actualizar la materia',
        });
      }
    } catch (error) {
      next(error);
    }
  });

  router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
      const deleteMateria = await materiasServices.deleteMateria(id);
      if(deleteStudent){
        res.status(200).json({
          data: deleteMateria,
          message: 'Se elimino correctamente'
        })
      }else {
        res.status(404).json({
          data: {},
          message: 'No se pudo eliminar'
        })
      }
    } catch (error) {
      next(error);
    }
  });
}

module.exports = apiMaterias;
