const { HttpStatusCode } = require("../../src/utilities/constants");
const categoryService = require("../../src/services/categories.service");
const ms = require("ms");

const createCategory = async (req, res) => {
    try {

        const result = await categoryService.createCategory(req, res);
        return res.status(!result.status ? HttpStatusCode.OK : result.status).json({ message: result?.message })

    } catch (error) {
        return res.status(HttpStatusCode.INTERNAL_SERVER).json({
            message: error.message
        })

    }
}

const getCategories = async (req, res) => {
    try {
        const result = await categoryService.getCategories(req, res);
        return res.status(!result.status ? HttpStatusCode.OK : result.status).json({ data: result?.data })

    } catch (error) {
        return res.status(HttpStatusCode.INTERNAL_SERVER).json({
            message: error.message
        })

    }
}

const getCategoryById = async (req, res) => {
    try {

        const result = await categoryService.getCategoryById(req, res);
        return res.status(!result.status ? HttpStatusCode.OK : result.status).json({ data: result?.data })

    } catch (error) {
        return res.status(HttpStatusCode.INTERNAL_SERVER).json({
            message: error.message
        })

    }
}

const updateCategory = async (req, res) => {
    try {

        const result = await categoryService.updateCategory(req, res);
        return res.status(!result.status ? HttpStatusCode.OK : result.status).json({ message: result?.message })
    } catch (error) {
        return res.status(HttpStatusCode.INTERNAL_SERVER).json({
            message: error.message
        })

    }
}

const deleteCategory = async (req, res) => {
    try {

        const result = await categoryService.deleteCategory(req, res);
        return res.status(!result.status ? HttpStatusCode.OK : result.status).json({ data: result?.message })
    } catch (error) {
        return res.status(HttpStatusCode.INTERNAL_SERVER).json({
            message: error.message
        })

    }
}

module.exports = {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory

}