const Store = require('../store/mysql');

class MateriaServices {
  table;
  store;
  constructor(table = 'materias') {
    this.table = table;
    this.store = new Store();
    this.store.createTable(this.table, `
      id VARCHAR(50) NOT NULL PRIMARY KEY,
      claveUEA NUMERIC(50),
      nombre VARCHAR(100)
    `);
  }

  async getMaterias(query){
    const table = await this.store.getList(this.table, query);
    return table || [];
  }

  async getMateria(id) {
    const Materias = await this.store.getOne(this.table, id);
    return Materias || {};
  }

  async createMateria(data){
    const Materia = await this.store.create(this.table, data);
    return Materia;
  }

  async updateMateria(id, data){
    const materia = await this.store.update(this.table, id, data);
    return materia;
  }

  async deleteMateria(id){
    const deleteMateria = await this.store.delete(this.table, id)
    return deleteMateria;
  }
}

module.exports = MateriaServices;