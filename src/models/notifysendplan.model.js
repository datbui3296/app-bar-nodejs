const Joi = require('joi')
const getDB = require('../config/mysqldb')
const baseModel = require('../utilities/BaseModel')
const Constants = require('../utilities/constants')
const notifySendplanName = "notifysendplan"
const createNotifySendPlan = async (data) => {
    try {
        const result = await baseModel.create(data, notifySendplanName)
        return result

    } catch (error) {
        console.log(error)
    }
}

const updateNotifySendPlan = async (data, id) => {
    try {
        const result = await baseModel.update(data, id, notifySendplanName)
        return result
    } catch (error) {
        console.log(error)
    }
}

const deleteNotifySendPlan = async (id) => {
    try {
        const result = await baseModel.deleteData(id, notifySendplanName)
        return result

    } catch (error) {
        console.log(error)
    }
}

const getNotifySendPlans = async (page, pageSize) => {
    try {
        const result = await baseModel.getAllWithPagination(page, pageSize, notifySendplanName)
        return result
    } catch (error) {
        console.log(error)
    }
}

const getNotifySendPlanById = async (id) => {
    try {
        const result = await baseModel.getById(id, notifySendplanName)
        return result
    } catch (error) {
        console.log(error)
    }
}

const getAllNotifySendPlans = async () => {
    try {
        const result = await baseModel.getAll(notifySendplanName)
        return result;
    } catch (error) {
        console.log(error)
    }
}



module.exports = {
    createNotifySendPlan,
    updateNotifySendPlan,
    deleteNotifySendPlan,
    getNotifySendPlans,
    getAllNotifySendPlans,
    getNotifySendPlanById
}