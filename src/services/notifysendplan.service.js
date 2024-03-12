
const notifySendPlanModel = require("../models/notifysendplan.model");
const { v4: uuidv4 } = require("uuid");
const { pick } = require("lodash");
const env = require("../config/environtment");
const { HttpStatusCode } = require("../../src/utilities/constants");
const baseModel = require('../utilities/BaseModel')

const createNotifySendPlan = async (req) => {
    try {
        let data = req.body;
        data = {...data, Receive : data.Receive.join(',')} 
        const res = await notifySendPlanModel.createNotifySendPlan(data)
        if (res) {
            return {
                status: HttpStatusCode.OK,
                message: `NotifySendPlan create successfuly`,
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

const updateNotifySendPlan = async (req) => {
    try {
        const id = parseInt(req.params.id, 10)
        let notifySendPlans = await notifySendPlanModel.getNotifySendPlanById(id)
        if (notifySendPlans.length == 0) {
            return {
                status: HttpStatusCode.BAD_REQUEST,
                message: `NotifySendPlan not found`
            }
        }
        let data = req.body;
        data = {...data, Receive : data.Receive.join(',')} 
        let res = await notifySendPlanModel.updateNotifySendPlan(data, id)
        if (res.affectedRows > 0) {
            return {
                status: HttpStatusCode.OK,
                message: `NotifySendPlan update successfuly`,
            }
        }

    } catch (error) {
        return {
            status: HttpStatusCode.BAD_REQUEST,
            message: error.message
        }
    }
}

const deleteNotifySendPlan = async (req) => {
    try {
        const id = parseInt(req.params.id, 10)
        let notifySendPlans = await notifySendPlanModel.getNotifySendPlanById(id)
        if (notifySendPlans.length == 0) {
            return {
                message: `NotifySendPlan not found`,
            }
        }
        let res = await notifySendPlanModel.deleteNotifySendPlan(id)
        if (res.affectedRows > 0) {
            return {
                message: `NotifySendPlan delete successfuly`
            }
        }

    } catch (error) {
        return {
            status: HttpStatusCode.BAD_REQUEST,
            mesage: error.message
        }
    }

}

const getNotifySendPlans = async (req) => {
    try {
        const page = parseInt(req.params.page, 10)
        const pageSize = parseInt(req.params.pageSize, 10)
        let result = await notifySendPlanModel.getNotifySendPlans(page, pageSize)
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

const getNotifySendPlanById = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10)
        let result = await notifySendPlanModel.getNotifySendPlanById(id)
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

const getAllNotifySendPlans = async (req, res) => {
    try {
        let result = await notifySendPlanModel.getAllNotifySendPlans()
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

const getUNotifySendPlanByNotifyId = async (req, res) => {
    try {
        const notifyTempalteId = parseInt(req.params.notifyTempalteId, 10)
        let notifysendplanTable = 'notifysendplan'
        let notifytempalteTable = 'notifytempalte'
        let notifySendPlandByTempalteId = await baseModel.getDataByConditions(notifysendplanTable, { NotifyTempalteId: notifyTempalteId })
        let notifyTempalte = await baseModel.getDataByConditions(notifytempalteTable, { Id: notifyTempalteId })

        return {
            data: notifySendPlandByTempalteId.map(obj => ({ ...obj, TempalteName: notifyTempalte[0]?.Name }))
        }

    } catch (error) {
        return {
            status: HttpStatusCode.BAD_REQUEST,
            mesage: error.message
        }

    }
}


module.exports = {
    createNotifySendPlan,
    updateNotifySendPlan,
    deleteNotifySendPlan,
    getNotifySendPlans,
    getAllNotifySendPlans,
    getUNotifySendPlanByNotifyId,
    getNotifySendPlanById
};