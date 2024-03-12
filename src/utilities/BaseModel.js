const { valuesIn } = require("lodash");
const database = require("../config/mysqldb");

const create = async (data, tableName) => {
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
const getById = async (id, tableName) => {
  try {
    const sql = `SELECT * FROM ${tableName} WHERE id = ?`;
    let result = await database.excuteQuery(sql, [id]);
    return result;
  } catch (error) {
    console.error("An error occurred:", error.message);
  }
}
const update = async (data, id, tableName) => {
  try {
    const setClause = Object.keys(data)
      .map((key) => `${key} = ?`)
      .join(", ");
    const values = Object.values(data);
    const sql = `UPDATE ${tableName} SET ${setClause} WHERE Id = ?`;
    let result = await database.executeTransaction(sql, [...values, id]);
    return result
  } catch (error) {
    console.error("An error occurred:", error.message);
  }
}
const deleteData = async (id, tableName) => {
  try {
    const sql = `DELETE FROM ${tableName} WHERE id = ?`;
    let result = await database.excuteQuery(sql, [id]);
    return result
  } catch (error) {
    console.error("An error occurred:", error.message);
  }
}

const getAll = async (tableName) => {
  try {
    const sql = `SELECT * FROM ${tableName}`;
    let result = await database.excuteQuery(sql, []);
    return result;
  } catch (error) {
    console.error("An error occurred:", error.message);
  }
}
const getAllWithPagination = async (page, pageSize, tableName) => {
  try {
    const offset = (page - 1) * pageSize;
    const countSql = `SELECT count(*) as count FROM ${tableName}`;
    let resultCount = await database.excuteQuery(countSql);
    let count = resultCount[0]?.count;
    let objectPage = { page, pageSize, totalItems: count, totalPages: Math.ceil(count / pageSize)};
    const sql = `SELECT * FROM ${tableName} LIMIT ?, ?`;
    const values = [offset, pageSize];
    const result = await database.excuteQuery(sql, values);
    return { result, ...objectPage };
  } catch (error) {
    console.error("An error occurred:", error.message);
  }
}
const search = async (query, page, pageSize, tableName) => {
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
const executeStoredProcedure = async (procedureName, parameters) => {
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
const executeQueryRawasync = async (sql, value) => {
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
      if (key != "conditionType") {
        conditionsArray.push(`${key} = ?`);
      }
    }
    let conditionType = Object.entries(conditions).find(([key, value]) => key === "conditionType");
    conditionType === "AND" || !conditionType ? query += conditionsArray.join(" AND ") : query += conditionsArray.join(" OR ");
  }

  return query;
}
const getQueryByColumn = async (sql, value) => {
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
//const searchConditions = {
// column1: 'search_value1',
//  column2: 'search_value2',
// Add other search conditions 
//};

//const sortBy = 'column1 DESC'; // Adjust the sorting based on your use case
//const page = 1; // Current page
//const pageSize = 10; // Number of items per page
//------------------------------------------------------------------------------------------------
const searchSortAndPaginateData = async (tableName, searchConditions, sortBy , page, pageSize) => {
  try {
    const searchKeys = Object.keys(searchConditions);
    const searchValues = Object.values(searchConditions);
    let whereClause = '';
    if (searchKeys.length > 0) {
      whereClause = 'WHERE ' + searchKeys.map((key) => `${key} = ?`).join(' AND ');
    }
    let orderByClause = '';
    if (sortBy) {
      orderByClause = `ORDER BY ${sortBy}`;
    }
    const limitClause = `LIMIT ${(page - 1) * pageSize}, ${pageSize}`;
    const sql = `SELECT * FROM ${tableName} ${whereClause} ${orderByClause} ${limitClause}`;

    try {
      const result = await database.excuteQuery(sql, searchValues);
      console.log('Data retrieved successfully');
      return result;
    } catch (error) {
      console.error('Error retrieving data:', error.message);
      throw error;
    }

  } catch (error) {
    console.error("An error occurred:", error.message);

  }
}

// const targetId = 1; // Set the ID of the row to update
// const updatedData = {
//     column1: 'new_value1',
//     column2: 'new_value2',
//     // Add other columns and values as needed
// };

// const conditionColumn = 'id'; // Adjust the condition column based on your use case
// const conditionValue = targetId;

// const condition = `${conditionColumn} = ?`;
// const conditionParams = [conditionValue];

const getDataByConditions = async (tableName, conditions) => {
  try {
    let sql = `SELECT * FROM ${tableName} WHERE `;
    const params = [];
    const keys = Object.keys(conditions);
    keys.forEach((key, index) => {
      if (index > 0) {
        sql += ' AND ';
      }
      sql += `${key} = ?`;
      params.push(conditions[key]);
    });
    const result = await database.excuteQuery(sql, params);
    console.log('Data retrieved successfully');
    return result;

  } catch (error) {
    console.error("An error occurred:", error.message);

  }
}

const getUpdateDataByConditions = async (tableName, updateFields, condition, conditionParams) => {
  const updateKeys = Object.keys(updateFields);
  const updateValues = Object.values(updateFields);

  const updateString = updateKeys.map((key) => `${key} = ?`).join(', ');
  const sql = `UPDATE ${tableName} SET ${updateString} WHERE ${condition}`;

  try {
    const result = await database.excuteQuery(sql, [...updateValues, ...conditionParams]);
    console.log('Data updated successfully');
    return result;
  } catch (error) {
    console.error('Error updating data:', error.message);
    throw error;
  }
}

const performDynamicQueryOperator = async (tableName, conditions) => {
  let sql = `SELECT * FROM ${tableName}`

  if (conditions && Object.keys(conditions).length > 0) {
    sql += ' WHERE ';
    const conditionsArray = [];

    // Iterate through the conditions object
    for (const key in conditions) {
      if (conditions.hasOwnProperty(key)) {
        const condition = conditions[key];
        conditionsArray.push(`${condition.column} ${condition.operator} ${connection.escape(condition.value)}`);
      }
    }
    sql += conditionsArray.join(' AND ');

  }
}

const executeQueryINRawasync = async (values, column, tableName) => {
  try {
    let sql = `SELECT * FROM ${tableName} WHERE ${column} IN (${values.join(',')})`
    const result = await database.excuteQuery(sql);
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
  executeStoredProcedure,
  searchSortAndPaginateData,
  getDataByConditions,
  getUpdateDataByConditions,
  performDynamicQueryOperator,
  executeQueryINRawasync

}
