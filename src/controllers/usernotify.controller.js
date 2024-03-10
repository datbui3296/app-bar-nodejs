const { HttpStatusCode } = require("../../src/utilities/constants");
const UserNotifyService = require("../../src/services/usernotify.service");
const ms = require("ms");

const createUserNotify = async (req, res) => {
    try {

        const result = await UserNotifyService.createUserNotify(req, res);
        return res.status(!result.status ? HttpStatusCode.OK : result.status).json({ message: result?.message })

    } catch (error) {
        return res.status(HttpStatusCode.INTERNAL_SERVER).json({
            message: error.message
        })

    }
}

const getUserNotifies = async (req, res) => {
    try {
        const result = await UserNotifyService.getUserNotifies(req, res);
        return res.status(!result.status ? HttpStatusCode.OK : result.status).json({ data: result?.data })

    } catch (error) {
        return res.status(HttpStatusCode.INTERNAL_SERVER).json({
            message: error.message
        })

    }
}

const getUserNotifyById = async (req, res) => {
    try {

        const result = await UserNotifyService.getUserNotifyById(req, res);
        return res.status(!result.status ? HttpStatusCode.OK : result.status).json({ data: result?.data })

    } catch (error) {
        return res.status(HttpStatusCode.INTERNAL_SERVER).json({
            message: error.message
        })

    }
}

const updateUserNotify = async (req, res) => {
    try {

        const result = await UserNotifyService.updateUserNotify(req, res);
        return res.status(!result.status ? HttpStatusCode.OK : result.status).json({ message: result?.message })
    } catch (error) {
        return res.status(HttpStatusCode.INTERNAL_SERVER).json({
            message: error.message
        })

    }
}

const deleteUserNotify = async (req, res) => {
    try {

        const result = await UserNotifyService.deleteUserNotify(req, res);
        return res.status(!result.status ? HttpStatusCode.OK : result.status).json({ message: result?.message })
    } catch (error) {
        return res.status(HttpStatusCode.INTERNAL_SERVER).json({
            message: error.message
        })

    }
}

const getAllUserNotifies = async (req, res) => {
    try {
        const result = await UserNotifyService.getAllUserNotify(req, res);
        return res.status(!result.status ? HttpStatusCode.OK : result.status).json({ data: result?.data })

    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            message: error.message
        })

    }
}

const getUserNotifieByUserId = async (req, res) => {
    try {
        const result = await UserNotifyService.getUserNotifyByUserId(req, res);
        return res.status(!result.status ? HttpStatusCode.OK : result.status).json({ data: result?.data })

    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            message: error.message
        })

    }
}

module.exports = {
    createUserNotify,
    getUserNotifies,
    getUserNotifyById,
    updateUserNotify,
    deleteUserNotify,
    getAllUserNotifies,
    getUserNotifieByUserId,

}