
const categoryModel = require("../models/categories.model");
const { v4: uuidv4 } = require("uuid");
const { pick } = require("lodash");
const env = require("../config/environtment");
const { HttpStatusCode } = require("../../src/utilities/constants");

const createCategory = async (req) => {
    try {
        let name = req.body.Name;
        const category = await categoryModel.getCategoryByName(name)
        if (category.length > 0) {
            return {
                status: HttpStatusCode.NOT_FOUND,
                message: `Category Name is exirst`
            }
        }

        const res = await categoryModel.createCategory(req.body)
        if (res) {
            return {
                status: HttpStatusCode.OK,
                message: `Category create successfuly`,
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

const updateCategory = async (req) => {
    try {
        const id = parseInt(req.params.id, 10)
        let category = await categoryModel.getCategoryById(id)
        if (category.length == 0) {
            return {
                message: `Category not found`
            }
        }
        let res = await categoryModel.updateCategory(req.body, id)
        if (res.affectedRows > 0) {
            return {
                message: `Category update successfuly`,
            }
        }

    } catch (error) {
        return {
            status: HttpStatusCode.BAD_REQUEST,
            message: error.message
        }
    }
}



const deleteCategory = async (req) => {
    try {
        const id = parseInt(req.params.id, 10)
        let category = await categoryModel.getCategoryById(id)
        if (category.length == 0) {
            return {
                message: `Category not found`,
            }
        }
        let res = await categoryModel.deleteCategory(id)
        if (res.affectedRows > 0) {
            return {
                message: `Category delete successfuly`
            }
        }

    } catch (error) {
        return {
            status: HttpStatusCode.BAD_REQUEST,
            mesage: error.message
        }
    }

}


const getCategories = async (req) => {
    try {
        const page = parseInt(req.params.page, 10)
        const pageSize = parseInt(req.params.pageSize, 10)
        let result = await categoryModel.getCategories(page, pageSize)
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

const getCategoryById = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10)
        let result = await categoryModel.getCategoryById(id)
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
    createCategory,
    updateCategory,
    deleteCategory,
    getCategories,
    getCategoryById


};