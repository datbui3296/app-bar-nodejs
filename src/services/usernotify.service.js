
const userNotifyModel = require("../models/usernotify.model");
const { v4: uuidv4 } = require("uuid");
const { pick } = require("lodash");
const env = require("../config/environtment");
const { HttpStatusCode } = require("../../src/utilities/constants");

const createUserNotify = async (req) => {
    try {
        let title = req.body.Title;
        const userNotifies  = await userNotifyModel.getUserNotifyByName(title)
        if (userNotifies.length > 0) {
            return {
                status: HttpStatusCode.NOT_FOUND,
                message: `UserNotify is exirst`
            }
        }

        const res = await userNotifyModel.createUserNotify(req.body)
        if (res) {
            return {
                status: HttpStatusCode.OK,
                message: `UserNotify create successfuly`,
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

const updateUserNotify = async (req) => {
    try {
        const id = parseInt(req.params.id, 10)
        let userNotifies = await userNotifyModel.getUserNotifyById(id)
        if (userNotifies.length == 0) {
            return {
                message: `UserNotify not found`
            }
        }
        let res = await userNotifyModel.updateUserNotify(req.body, id)
        if (res.affectedRows > 0) {
            return {
                message: `UserNotify update successfuly`,
            }
        }

    } catch (error) {
        return {
            status: HttpStatusCode.BAD_REQUEST,
            message: error.message
        }
    }
}

const deleteUserNotify = async (req) => {
    try {
        const id = parseInt(req.params.id, 10)
        let UserNotify = await userNotifyModel.getUserNotifyById(id)
        if (UserNotify.length == 0) {
            return {
                message: `UserNotify not found`,
            }
        }
        let res = await userNotifyModel.deleteUserNotify(id)
        if (res.affectedRows > 0) {
            return {
                message: `UserNotify delete successfuly`
            }
        }

    } catch (error) {
        return {
            status: HttpStatusCode.BAD_REQUEST,
            mesage: error.message
        }
    }

}

const getUserNotifies = async (req) => {
    try {
        const page = parseInt(req.params.page, 10)
        const pageSize = parseInt(req.params.pageSize, 10)
        let result = await userNotifyModel.getUserNotifies(page, pageSize)
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

const getUserNotifyById = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10)
        let result = await userNotifyModel.getUserNotifyById(id)
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

const getAllUserNotify = async (req, res) => {
    try {
        let result = await userNotifyModel.getAllUserNotify()
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
    createUserNotify,
    updateUserNotify,
    deleteUserNotify,
    getUserNotifies,
    getUserNotifyById,
    getAllUserNotify
};