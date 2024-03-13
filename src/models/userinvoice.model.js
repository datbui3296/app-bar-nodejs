const Joi = require('joi')
const getDB = require('../config/mysqldb')
const baseModel = require('../utilities/BaseModel')
const Constants = require('../utilities/constants')
const tableUserInvoice = "userinvoice"
const createUserInvoice = async (data) => {
    try {
        const result = await baseModel.create(data, tableUserInvoice)
        return result

    } catch (error) {
        console.log(error)
    }
}

const updateUserInvoice = async (data, id) => {
    try {
        const result = await baseModel.update(data, id, tableUserInvoice)
        return result
    } catch (error) {
        console.log(error)
    }
}

const deleteUserInvoice = async (id) => {
    try {
        const result = await baseModel.deleteData(id, tableUserInvoice)
        return result

    } catch (error) {
        console.log(error)
    }
}

const getUserInvoices = async (page, pageSize) => {
    try {
        const result = await baseModel.getAllWithPagination(page, pageSize, tableUserInvoice)
        return result
    } catch (error) {
        console.log(error)
    }
}

const getUserInvoiceId = async (id) => {
    try {
        const result = await baseModel.getById(id, tableUserInvoice)
        return result
    } catch (error) {
        console.log(error)
    }
}


const getAllUserInvoices = async () => {
    try {
        const result = await baseModel.getAll(tableUserInvoice)
        return result;
    } catch (error) {
        console.log(error)
    }
}



module.exports = {
    createUserInvoice,
    updateUserInvoice,
    deleteUserInvoice,
    getUserInvoices,
    getUserInvoiceId,
    getAllUserInvoices
}