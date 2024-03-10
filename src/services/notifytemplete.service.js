
const notifyTemplateModel = require("../models/notifytemplete.model");
const { v4: uuidv4 } = require("uuid");
const { pick } = require("lodash");
const env = require("../config/environtment");
const { HttpStatusCode } = require("../../src/utilities/constants");
const baseModel = require('../utilities/BaseModel')

const createNotifyTemplate = async (req) => {
    try {
        let name = req.body.Name;
        const userNotifies  = await notifyTemplateModel.getNotifyTemplateByName(name)
        if (userNotifies.length > 0) {
            return {
                status: HttpStatusCode.NOT_FOUND,
                message: `getAllNotifyTemplates is exirst`
            }
        }

        const res = await notifyTemplateModel.createUserNotify(req.body)
        if (res) {
            return {
                status: HttpStatusCode.OK,
                message: `getAllNotifyTemplates create successfuly`,
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

const updateNotifyTemplate = async (req) => {
    try {
        const id = parseInt(req.params.id, 10)
        let notifyTemplate = await notifyTemplateModel.getNotifyTemplateById(id)
        if (notifyTemplate.length == 0) {
            return {
                message: `NotifyTemplate not found`
            }
        }
        let res = await notifyTemplateModel.updateNotifyTemplate(req.body, id)
        if (res.affectedRows > 0) {
            return {
                message: `NotifyTemplate update successfuly`,
            }
        }

    } catch (error) {
        return {
            status: HttpStatusCode.BAD_REQUEST,
            message: error.message
        }
    }
}

const deleteNotifyTemplate = async (req) => {
    try {
        const id = parseInt(req.params.id, 10)
        let UserNotify = await notifyTemplateModel.getNotifyTemplateById(id)
        if (UserNotify.length == 0) {
            return {
                message: `NotifyTemplate not found`,
            }
        }
        let res = await notifyTemplateModel.deleteNotifyTemplate(id)
        if (res.affectedRows > 0) {
            return {
                message: `NotifyTemplate delete successfuly`
            }
        }

    } catch (error) {
        return {
            status: HttpStatusCode.BAD_REQUEST,
            mesage: error.message
        }
    }

}

const getNotifyTemplates = async (req) => {
    try {
        const page = parseInt(req.params.page, 10)
        const pageSize = parseInt(req.params.pageSize, 10)
        let result = await notifyTemplateModel.getNotifyTemplates(page, pageSize)
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

const getNotifyTemplateById = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10)
        let result = await notifyTemplateModel.getNotifyTemplateById(id)
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

const getAllNotifyTemplates = async (req, res) => {
    try {
        let result = await notifyTemplateModel.getAllNotifyTemplates()
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
    createNotifyTemplate,
    updateNotifyTemplate,
    deleteNotifyTemplate,
    getNotifyTemplates,
    getNotifyTemplateById,
    getAllNotifyTemplates
};