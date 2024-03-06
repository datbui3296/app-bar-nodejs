const Joi = require('joi')
const getDB = require('../config/mysqldb')
const baseModel = require('../utilities/BaseModel')
const Constants = require('../utilities/constants')
const tableArticleName = "article"
const createArticle = async (data) => {
    try {
        const result = await baseModel.create(data, tableArticleName)
        return result

    } catch (error) {
        console.log(error)
    }
}

const updateArticle = async (data, id) => {
    try {
        const result = await baseModel.update(data, id, tableArticleName)
        return result
    } catch (error) {
        console.log(error)
    }
}

const deleteArticle = async (id) => {
    try {
        const result = await baseModel.deleteData(id, tableArticleName)
        return result

    } catch (error) {
        console.log(error)
    }
}

const getArticles = async (page, pageSize) => {
    try {
        const result = await baseModel.getAllWithPagination(page, pageSize, tableArticleName)
        return result
    } catch (error) {
        console.log(error)
    }
}

const getArticleById = async (id) => {
    try {
        const result = await baseModel.getById(id, tableArticleName)
        return result
    } catch (error) {
        console.log(error)
    }
}

const getArticleByName = async (title) => {
    try {
        const result = await baseModel.getDataByConditions(tableArticleName, { Title: title })
        return result;
    } catch (error) {
        console.log(error)
    }
}



module.exports = {
    createArticle,
    updateArticle,
    deleteArticle,
    getArticles,
    getArticleById,
    getArticleByName
}