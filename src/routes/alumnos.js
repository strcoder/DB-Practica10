const express = require('express');
const StudentServices = require('../services/alumnos');
const { nanoid } = require('nanoid');

const apiStudents = (app) => {
  const router = express.Router();
  const studentServices = new StudentServices('alumnos');

  app.use('/api/student' ,router);

  router.get('/', async (req, res, next) => {
    // const { id, name, promedio } = req.query;
    const { query } = req;
    try {
      const students = await studentServices.getStudents(query);
      res.status(200).json({
        data: students,
        message: 'Lista de estudiantes'
      })
    } catch (error) {
      next(error);
    }
  });

  router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
      const student = await studentServices.getStudent(id);
      res.status(200).json({
        data: student,
        message: 'Estudiante'
      })
    } catch (error) {
      next(error);
    }
  });

  router.post('/', async (req, res, next) => {
    const { body: student } = req;
    if (!student.id) {
      student.id = nanoid();
    }
    try {
      const createStudent = await studentServices.createStudent(student);
      res.status(200).json({
        data: createStudent,
        message: 'Creado',
      });
    } catch (error) {
      next(error);
    }
  });

  router.put('/:id', async (req, res, next) => {
    const { id } = req.params;
    const { body: student } = req;
    try {
      const updateStudent = await studentServices.updateStudent(id, student);
      if (updateStudent) {
        res.status(200).json({
          data: updateStudent,
          message: 'Actualizado',
        });
      } else {
        res.status(404).json({
          data: {},
          message: 'No se pudo actualizar',
        });
      }
    } catch (error) {
      next(error);
    }
  });

  router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
      const deleteStudent = await studentServices.deleteStudent(id);
      if(deleteStudent){
        res.status(200).json({
          data: deleteStudent,
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

module.exports = apiStudents;
