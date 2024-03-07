
const userInvoiceModel = require("../models/userinvoice.model");
const { v4: uuidv4 } = require("uuid");
const { pick } = require("lodash");
const env = require("../config/environtment");
const { HttpStatusCode } = require("../../src/utilities/constants");
const baseModel = require('../utilities/BaseModel')

const createUserInvoice = async (req) => {
    try {
        const res = await userInvoiceModel.createUserInvoice(req.body)
        if (res) {
            return {
                status: HttpStatusCode.OK,
                message: `UserInvoice  create successfuly`,
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

const updateUserInvoice = async (req) => {
    try {
        const id = parseInt(req.params.id, 10)
        let userInvoices = await userInvoiceModel.getUserInvoiceId(id)
        if (userInvoices.length == 0) {
            return {
                message: `UserInvoice  not found`
            }
        }
        let res = await userInvoiceModel.updateUserInvoice(req.body, id)
        if (res.affectedRows > 0) {
            return {
                message: `UserInvoice  update successfuly`,
            }
        }

    } catch (error) {
        return {
            status: HttpStatusCode.BAD_REQUEST,
            message: error.message
        }
    }
}

const deleteUserInvoice = async (req) => {
    try {
        const id = parseInt(req.params.id, 10)
        let userInvoices = await userInvoiceModel.getUserInvoiceId(id)
        if (userInvoices.length == 0) {
            return {
                message: `UserInvoice  not found`,
            }
        }
        let res = await userInvoiceModel.deleteUserInvoice(id)
        if (res.affectedRows > 0) {
            return {
                message: `UserInvoice  delete successfuly`
            }
        }

    } catch (error) {
        return {
            status: HttpStatusCode.BAD_REQUEST,
            mesage: error.message
        }
    }

}

const getUserInvoices = async (req) => {
    try {
        const page = parseInt(req.params.page, 10)
        const pageSize = parseInt(req.params.pageSize, 10)
        let result = await userInvoiceModel.getUserInvoices(page, pageSize)
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

const getUserInvoiceId = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10)
        let result = await userInvoiceModel.getUserInvoiceId(id)
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

const getAllUserInvoices = async (req, res) => {
    try {
        let result = await userInvoiceModel.getAllUserInvoices()
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
    createUserInvoice,
    getUserInvoices,
    getUserInvoiceId,
    updateUserInvoice,
    deleteUserInvoice,
    getAllUserInvoices
};