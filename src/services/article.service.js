
const articleModel = require("../models/article.model");
const { v4: uuidv4 } = require("uuid");
const { pick } = require("lodash");
const env = require("../config/environtment");
const { HttpStatusCode } = require("../../src/utilities/constants");

const createArticle = async (req) => {
    try {
        let title = req.body.Title;
        const article = await articleModel.getArticleByName(title)
        if (article.length > 0) {
            return {
                status: HttpStatusCode.NOT_FOUND,
                message: `Article is exirst`
            }
        }

        const res = await articleModel.createArticle(req.body)
        if (res) {
            return {
                status: HttpStatusCode.OK,
                message: `Article create successfuly`,
                data: res
            }
        }

    } catch (error) {
        return {
            status: HttpStatusCode.BAD_REQUEST,
            message: error.message
        }
    }
}

const updateArticle = async (req) => {
    try {
        const id = parseInt(req.params.id, 10)
        let article = await articleModel.getArticleById(id)
        if (article.length == 0) {
            return {
                message: `Article not found`
            }
        }
        let res = await articleModel.updateArticle(req.body, id)
        if (res.affectedRows > 0) {
            return {
                message: `Article update successfuly`,
            }
        }

    } catch (error) {
        return {
            status: HttpStatusCode.BAD_REQUEST,
            message: error.message
        }
    }
}

const deleteArticle = async (req) => {
    try {
        const id = parseInt(req.params.id, 10)
        let category = await articleModel.getArticleById(id)
        if (category.length == 0) {
            return {
                message: `Article not found`,
            }
        }
        let res = await articleModel.deleteArticle(id)
        if (res.affectedRows > 0) {
            return {
                message: `Article delete successfuly`
            }
        }

    } catch (error) {
        return {
            status: HttpStatusCode.BAD_REQUEST,
            mesage: error.message
        }
    }

}

const getArticles = async (req) => {
    try {
        const page = parseInt(req.params.page, 10)
        const pageSize = parseInt(req.params.pageSize, 10)
        let result = await articleModel.getArticles(page, pageSize)
        return {
            data: result
        }

    } catch (error) {
        return {
            status: HttpStatusCode.BAD_REQUEST,
            mesage: error.message
        }
    }
}

const getArticleById = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10)
        let result = await articleModel.getArticleById(id)
        return {
            data: result
        }

    } catch (error) {
        return {
            status: HttpStatusCode.BAD_REQUEST,
            mesage: error.message
        }

    }
}

module.exports = {
    createArticle,
    updateArticle,
    deleteArticle,
    getArticles,
    getArticleById
};