const { HttpStatusCode } = require("../../src/utilities/constants");
const articleService = require("../../src/services/article.service");
const ms = require("ms");

const createArticle = async (req, res) => {
    try {
        const result = await articleService.createArticle(req, res);
        return res.status(!result.status ? HttpStatusCode.OK : result.status).json({ message: result?.message })

    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            message: error.message
        })

    }
}

const updateArticle = async (req, res) => {
    try {
        const result = await articleService.updateArticle(req, res);
        return res.status(!result.status ? HttpStatusCode.OK : result.status).json({ message: result?.message })
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            message: error.message
        })

    }
}

const deleteArticle = async (req, res) => {
    try {
        const result = await articleService.deleteArticle(req, res);
        return res.status(!result.status ? HttpStatusCode.OK : result.status).json({ message: result?.message })

    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            message: error.message
        })

    }
}

const getArticles = async (req, res) => {
    try {
        const result = await articleService.getArticles(req, res);
        return res.status(!result.status ? HttpStatusCode.OK : result.status).json({ data: result?.data })

    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            message: error.message
        })

    }
}

const getArticleById = async (req, res) => {
    try {
        const result = await articleService.getArticleById(req, res);
        return res.status(!result.status ? HttpStatusCode.OK : result.status).json({ data: result?.data })

    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            message: error.message
        })

    }
}

const getAllArticle = async (req, res) => {
    try {
        const result = await articleService.getAllArticle(req, res);
        return res.status(!result.status ? HttpStatusCode.OK : result.status).json({ data: result?.data })

    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            message: error.message
        })

    }
}

module.exports = {
    createArticle,
    updateArticle,
    deleteArticle,
    getArticleById,
    getArticles,
    getAllArticle

}