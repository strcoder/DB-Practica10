const Store = require('../store/mysql');

class StudentServices {
  table;
  store;
  constructor(table = 'alumnos') {
    this.table = table;
    this.store = new Store();
    this.store.createTable(this.table, `
      id VARCHAR(25) NOT NULL PRIMARY KEY,
      matricula INT(10),
      nombre VARCHAR(50),
      apellido1 VARCHAR(50),
      apellido2 VARCHAR(50)
    `)
  }

  async getStudents(query){
    const table = await this.store.getList(this.table, query);
    return table || [];
  }

  async getStudent(id) {
    const students = await this.store.getOne(this.table, id);
    return students || {};
  }

  async createStudent(data){
    const student = await this.store.create(this.table, data);
    return student;
  }

  async updateStudent(id, data){
    const student = await this.store.update(this.table, id, data);
    return student;
  }

  async deleteStudent(id){
    const deleteS = await this.store.delete(this.table, id)
    return deleteS;
  }
}

module.exports = StudentServices;