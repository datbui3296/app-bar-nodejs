const mysql = require("mysql2/promise");
const  config  = require("./environtment");

class Database {
  constructor() {
    this.pool = null;
  }

  async connect() {
    this.pool = mysql.createPool({
      host: config.DB_HOST,
      user: config.DB_USER,
      password: config.DB_PASSWORD,
      database: config.DB_NAME,
      waitForConnections: true,
      connectionLimit: 20,
      queueLimit: 0,
    });
  }

  async close() {
    if (this.pool) {
      await this.pool.end();
    }
  }

  async excuteQuery(sql, values) {
    const connection = await this.pool.getConnection();
    const [rows] = await connection.execute(sql, values);
    return rows;
  }

  async executeTransaction(sql, values) {
    const connection = await this.pool.getConnection();
    try {
      await connection.beginTransaction();
      const [rows] = await connection.execute(sql, values);
      await connection.commit();
      return rows;
    } catch (error) {
      await connection.rollback();
      throw error;
    }
  }
}

module.exports = new Database();
