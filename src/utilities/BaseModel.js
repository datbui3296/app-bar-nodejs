const database = require("../config/mysqldb");

const create = async (data, tableName) =>  {
    try {
      const keys = Object.keys(data).join(", ");
      const values = Object.values(data);
      let dataInput = Object.assign(data);
      const placeHolders = values.length;
      const sql = `INSERT INTO ${tableName} (${keys}) VALUES (${Array(
        placeHolders
      )
        .fill("? ")
        .join(",")})`;
      let result = await database.executeTransaction(sql, values);
      return { id: result.insertId, ...dataInput };
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  }
  const getById = async (id,tableName) => {
    try {
      const sql = `SELECT * FROM ${tableName} WHERE id = ?`;
      let result = await database.excuteQuery(sql, [id]);
      return result;
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  }
  const update = async (data,tableName) => {
    try {
      let id = data.id;
      delete data["id"];
      const setClause = Object.keys(data)
        .map((key) => `${key} = ?`)
        .join(", ");
      const values = Object.values(data);
      const sql = `UPDATE ${tableName} SET ${setClause} WHERE id = ?`;
      await database.executeTransaction(sql, [...values, id]);
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  }
  const deleteData =  async (id,tableName) => {
    try {
      const sql = `DELETE FROM ${tableName} WHERE id = ?`;
      await database.excuteQuery(sql, [id]);
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  }

  const getAll  =  async (tableName) => {
    try {
      const sql = `SELECT * FROM ${tableName}`;
      let result = await database.excuteQuery(sql, []);
      return result;
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  }
  const getAllWithPagination=  async (ge, pageSize,tableName) => {
    try {
      const offset = (page - 1) * pageSize;
      const countSql = `SELECT count(*) as count FROM ${tableName}`;
      let resultCount = await database.excuteQuery(countSql);
      let count = resultCount[0]?.count;
      let objectPage = { page, pageSize, count };
      const sql = `SELECT * FROM ${this.tableName} LIMIT ?, ?`;
      const values = [offset, pageSize];
      const result = await database.excuteQuery(sql, values);
      return { result, ...objectPage };
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  }
   const search =  async (query, page, pageSize,tableName) => {
    try {
      const offset = (page - 1) * pageSize;
      const sql = `SELECT * FROM ${tableName} WHERE column1 LIKE ? OR column2 LIKE ? LIMIT ?, ?`;
      const values = [`%${query}%`, `%${query}%`, offset, pageSize];
      const result = await database.excuteQuery(sql, values);
      return result;
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  }
  const executeStoredProcedure=  async (procedureName, parameters) => {
    try {
      const sql = `CALL ${procedureName}(${parameters
        .map(() => "?")
        .join(", ")})`;
      const result = await database.excuteQuery(sql, parameters);
      return result;
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  }
  const executeQueryRawasync = async (sql,value) => {
    try {
      const result = await database.excuteQuery(sql, [value]);
      return result;
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  }
   const generateSelectQuery = async (table, conditions) => {
    conditions = conditions || {};
    let query = `SELECT * FROM ${table}`;
    if (Object.keys(conditions).length > 0) {
      query += " WHERE ";
      const conditionsArray = [];
      for (const [key, value] of Object.entries(conditions)) {
        if(key != "conditionType"){
          conditionsArray.push(`${key} = ?`);
        }     
      }
      let conditionType = Object.entries(conditions).find(([key, value]) => key === "conditionType");
      conditionType === "AND" || !conditionType ? query += conditionsArray.join(" AND ") : query += conditionsArray.join(" OR ");
    }

    return query;
  }
  const getQueryByColumn = async (sql,value) => {
    try {
      let sqlQuery = generateSelectQuery(this.tableName, data);
      delete data["conditionType"];
      const values = Object.values(data);
      let result = await database.excuteQuery(sqlQuery, values);
      return result;
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  }


module.exports = {
    create,
    getById,
    update,
    deleteData,
    getAll,
    getAllWithPagination,
    search,
    executeQueryRawasync,
    generateSelectQuery,
    getQueryByColumn,
    executeStoredProcedure

};
