const Joi = require('joi')
const getDB = require('../config/mysqldb')
const baseModel = require('../utilities/BaseModel')
const Constants = require('../utilities/constants')
const tableUserNotifyName = "usernotify"
const createUserNotify = async (data) => {
    try {
        const result = await baseModel.create(data, tableUserNotifyName)
        return result

    } catch (error) {
        console.log(error)
    }
}

const updateUserNotify = async (data, id) => {
    try {
        const result = await baseModel.update(data, id, tableUserNotifyName)
        return result
    } catch (error) {
        console.log(error)
    }
}

const deleteUserNotify = async (id) => {
    try {
        const result = await baseModel.deleteData(id, tableUserNotifyName)
        return result

    } catch (error) {
        console.log(error)
    }
}

const getUserNotifies = async (page, pageSize) => {
    try {
        const result = await baseModel.getAllWithPagination(page, pageSize, tableUserNotifyName)
        return result
    } catch (error) {
        console.log(error)
    }
}

const getUserNotifyById = async (id) => {
    try {
        const result = await baseModel.getById(id, tableUserNotifyName)
        return result
    } catch (error) {
        console.log(error)
    }
}

const getUserNotifyByName = async (title) => {
    try {
        const result = await baseModel.getDataByConditions(tableUserNotifyName, { Title: title })
        return result;
    } catch (error) {
        console.log(error)
    }
}

const getAllUserNotify = async () => {
    try {
        const result = await baseModel.getAll(tableUserNotifyName)
        return result;
    } catch (error) {
        console.log(error)
    }
}

const getUserNotifyByTitle = async(title) =>{
    try {
        const sql = `SELECT * FROM ${tableUserNotifyName} where Title LIKE '%${title}%'`
        const result = await getDB.excuteQuery(sql, [title])
        return result;
    } catch (error) {
        console.log(error)
    }

}



module.exports = {
    createUserNotify,
    updateUserNotify,
    deleteUserNotify,
    getUserNotifies,
    getUserNotifyById,
    getUserNotifyByName,
    getAllUserNotify
}