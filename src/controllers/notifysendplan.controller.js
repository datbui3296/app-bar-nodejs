const { HttpStatusCode } = require("../../src/utilities/constants");
const notifySendPlanService = require("../../src/services/notifysendplan.service");
const ms = require("ms");

const createNotifySendPlan = async (req, res) => {
    try {

        const result = await notifySendPlanService.createNotifySendPlan(req, res);
        return res.status(!result.status ? HttpStatusCode.OK : result.status).json({ code: result?.status,message: result?.message })

    } catch (error) {
        return res.status(HttpStatusCode.INTERNAL_SERVER).json({
            message: error.message
        })

    }
}

const getNotifySendPlans = async (req, res) => {
    try {
        const result = await notifySendPlanService.getNotifySendPlans(req, res);
        return res.status(!result.status ? HttpStatusCode.OK : result.status).json({ data: result?.data })

    } catch (error) {
        return res.status(HttpStatusCode.INTERNAL_SERVER).json({
            message: error.message
        })

    }
}

const getNotifySendPlanById = async (req, res) => {
    try {

        const result = await notifySendPlanService.getNotifySendPlanById(req, res);
        return res.status(!result.status ? HttpStatusCode.OK : result.status).json({ data: result?.data })

    } catch (error) {
        return res.status(HttpStatusCode.INTERNAL_SERVER).json({
            message: error.message
        })

    }
}

const updateNotifySendPlan = async (req, res) => {
    try {

        const result = await notifySendPlanService.updateNotifySendPlan(req, res);
        return res.status(!result.status ? HttpStatusCode.OK : result.status).json({ code: result?.status,message: result?.message })
    } catch (error) {
        return res.status(HttpStatusCode.INTERNAL_SERVER).json({
            message: error.message
        })

    }
}

const deleteNotifySendPlan = async (req, res) => {
    try {

        const result = await notifySendPlanService.deleteNotifySendPlan(req, res);
        return res.status(!result.status ? HttpStatusCode.OK : result.status).json({ data: result?.message })
    } catch (error) {
        return res.status(HttpStatusCode.INTERNAL_SERVER).json({
            message: error.message
        })

    }
}

const getAllNotifySendPlans = async (req, res) => {
    try {
        const result = await notifySendPlanService.getAllNotifySendPlans(req, res);
        return res.status(!result.status ? HttpStatusCode.OK : result.status).json({ data: result?.data })

    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            message: error.message
        })

    }
}

const getUNotifySendPlanByNotifyId = async (req, res) => {
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
    createNotifySendPlan,
    getNotifySendPlans,
    getNotifySendPlanById,
    updateNotifySendPlan,
    deleteNotifySendPlan,
    getAllNotifySendPlans,
    getUNotifySendPlanByNotifyId,

}