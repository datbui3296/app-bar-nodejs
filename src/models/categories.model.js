const Joi = require('joi')
const getDB = require('../config/mysqldb')
const baseModel = require('../utilities/BaseModel')
const Constants = require('../utilities/constants')
const tableCategoryName = "category"
const createCategory = async (data) => {
    try {

        let dataBody = {
            Name: data.Name,
            Description: data.Description,
            ParentId: data.ParentId,
            OrderBy: data.OrderBy,
            CreatedBy: data.CreatedBy,
            UpdatedBy: data.CreatedBy

        }

        const result = await baseModel.create(dataBody, tableCategoryName)
        return result

    } catch (error) {
        console.log(error)
    }
}

const updateCategory = async (data, id) => {
    try {
        const result = await baseModel.update(data, id, tableCategoryName)
        return result
    } catch (error) {
        console.log(error)
    }
}

const deleteCategory = async (id) => {
    try {
        const result = await baseModel.deleteData(id, tableCategoryName)
        return result

    } catch (error) {
        console.log(error)
    }
}

const getCategories = async (page, pageSize) => {
    try {
        const result = await baseModel.getAllWithPagination(page, pageSize, tableCategoryName)
        return result
    } catch (error) {
        console.log(error)
    }
}

const getCategoryById = async (id) => {
    try {
        const result = await baseModel.getById(id, tableCategoryName)
        return result
    } catch (error) {
        console.log(error)
    }
}

const getCategoryByName = async (name) => {
    try {
        const sql = `SELECT *FROM ${tableCategoryName} WHERE Name = ?`;
        let result = await getDB.excuteQuery(sql, [name]);
        return result;
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createCategory,
    updateCategory,
    deleteCategory,
    getCategories,
    getCategoryById,
    getCategoryByName
}