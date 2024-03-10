
const articleModel = require("../models/article.model");
const { v4: uuidv4 } = require("uuid");
const { pick } = require("lodash");
const env = require("../config/environtment");
const { HttpStatusCode } = require("../../src/utilities/constants");
const path = require("path");
const baseModel = require('../utilities/BaseModel')

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
        if (req.files != null) {
            const file = req.files.file;
            const fileSize = file?.data?.length;
            const ext = path.extname(file.name);
            const fileName = file.md5 + ext;
            const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
            const allowedType = ['.png', '.jpg', '.jpeg'];
            if (!allowedType.includes(ext.toLowerCase())) return res.status(HttpStatusCode.INVALID_IMAGE).json({ mesage: "Invalid Images" });
            if (fileSize > 5000000) return res.status(HttpStatusCode.INVALID_IMAGE).json({ mesage: "Image must be less than 5 MB" });
            file.mv(`./src/uploads/${fileName}`).then((error, data) => {
                if (error) return {
                    status: HttpStatusCode.BAD_REQUEST,
                    message: `Upload file false`,
                    data: updateRes
                }
            })
            req.body = { ...req.body, Image: url }
        }
        let updateRes = await articleModel.createArticle(req.body)
        if (updateRes) {
            return {
                status: HttpStatusCode.OK,
                message: `Article create successfuly`,
                data: updateRes
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
        if (req.files != null) {
            const file = req.files.file;
            const fileSize = file?.data?.length;
            const ext = path.extname(file?.name);
            const fileName = file?.md5 + ext;
            const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
            const allowedType = ['.png', '.jpg', '.jpeg'];
            if (!allowedType.includes(ext.toLowerCase())) return res.status(HttpStatusCode.INVALID_IMAGE).json({ mesage: "Invalid Images" });
            if (fileSize > 5000000) return res.status(HttpStatusCode.INVALID_IMAGE).json({ mesage: "Image must be less than 5 MB" });
            file.mv(`./src/uploads/${fileName}`).then((error, data) => {
                if (error) return {
                    status: HttpStatusCode.BAD_REQUEST,
                    message: `Upload file false`,
                    data: updateRes
                }
            })
            req.body = { ...req.body, Image: url }
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

const getAllArticle = async (req, res) => {
    try {
        let result = await articleModel.getAllArticle()
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

const getActicleEventOrPreferential = async (req) => {
    try {
        let acticleTable = 'article'
        let catergoryId = parseInt(req.params.id, 10)
        let resultCategory = await baseModel.getDataByConditions(acticleTable, { CategoryId: catergoryId })
        if (resultCategory.length == 0) return { status: HttpStatusCode.BAD_REQUEST, mesage: `Article not found` }
        return { data: resultCategory }
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
    getArticleById,
    getAllArticle,
    getActicleEventOrPreferential
};