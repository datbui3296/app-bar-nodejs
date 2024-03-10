const Joi = require('joi')
const getDB = require('../config/mysqldb')
const baseModel = require('../utilities/BaseModel')
const Constants = require('../utilities/constants')
const tableNotifyTemplateName = "notifytempalte"
const createNotifyTemplate = async (data) => {
    try {
        const result = await baseModel.create(data, tableNotifyTemplateName)
        return result

    } catch (error) {
        console.log(error)
    }
}

const updateNotifyTemplate = async (data, id) => {
    try {
        const result = await baseModel.update(data, id, tableNotifyTemplateName)
        return result
    } catch (error) {
        console.log(error)
    }
}

const deleteNotifyTemplate = async (id) => {
    try {
        const result = await baseModel.deleteData(id, tableNotifyTemplateName)
        return result

    } catch (error) {
        console.log(error)
    }
}

const getNotifyTemplates = async (page, pageSize) => {
    try {
        const result = await baseModel.getAllWithPagination(page, pageSize, tableNotifyTemplateName)
        return result
    } catch (error) {
        console.log(error)
    }
}

const getNotifyTemplateById = async (id) => {
    try {
        const result = await baseModel.getById(id, tableNotifyTemplateName)
        return result
    } catch (error) {
        console.log(error)
    }
}

const getNotifyTemplateByName = async (name) => {
    try {
        const result = await baseModel.getDataByConditions(tableNotifyTemplateName, { Name: name })
        return result;
    } catch (error) {
        console.log(error)
    }
}

const getAllNotifyTemplates = async () => {
    try {
        const result = await baseModel.getAll(tableNotifyTemplateName)
        return result;
    } catch (error) {
        console.log(error)
    }
}



module.exports = {
    createNotifyTemplate,
    updateNotifyTemplate,
    deleteNotifyTemplate,
    getNotifyTemplates,
    getNotifyTemplateById,
    getNotifyTemplateByName,
    getAllNotifyTemplates
}