const db = require('mysql');
const util = require("util");
const { mysql } = require ('../config');

class MySQL {
  promise;
  static connecction;
  constructor() {
    this.connection = db.createConnection(mysql);
    this.promise = util.promisify(this.connection.query).bind(this.connection);
    this.connect();
  }

  connect() {
    this.connection.connect((error) => {
      if (error) {
        console.log('[db-error]: ', error);
        setTimeout(this.connect(), 2000);
      } else {
        console.log('DB Connected');
      }
    });

    this.connection.on('error', (error) => {
      console.log('[db-error]: ', error);
      setTimeout(this.connect(), 2000);
      if (error.code === 'PROTOCOL_CONNECTION_LOST') {
        this.connect();
      } else {
        throw error;
      }
    })
  }

  async createTable(table, atributos) {
    const data = this.promise(`CREATE TABLE IF NOT EXISTS ${table} (${atributos})`);
    return data.values;
  }

  async getList(table, query) {
    try {
      if (Object.keys(query).length !== 0) {
        console.log(query);
        const data = await this.promise(`SELECT * FROM ${table} WHERE ?`, query);
        return data;
      }
      const data = await this.promise(`SELECT * FROM ${table}`);
      return data;
    } catch (error) {
      console.log(error.message);
    };
  };

  async getOne(table, id) {
    try {
      const [data] = await this.promise(`SELECT * FROM ${table} WHERE id='${id}'`);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  };

  async create(table, data) {
    try {
      const userCreate = await this.promise(`INSERT INTO ${table} SET ?`, data);
      return userCreate.values;
    } catch (error) {
      console.log(error.message);
    }
  };

  async update(table, id, data) {
    try {
      const object = await this.promise(`SELECT * FROM ${table} WHERE id='${id}'`);
      if (object.length === 0) {
        return false;
      } else {
        const updateData = await this.promise(`UPDATE ${table} SET ? WHERE id='${id}'`, data);
        return updateData;
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async delete(table, id) {
    try {
      const object = await this.promise(`SELECT * FROM ${table} WHERE id='${id}'`);
      if (object.length === 0) {
        return false;
      } else {
        const deletedData = await this.promise(`DELETE FROM ${table} WHERE id='${id}'`)
        return deletedData;
      }
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = MySQL;