
const notifyTemplateModel = require("../models/notifytemplete.model");
const { v4: uuidv4 } = require("uuid");
const { pick } = require("lodash");
const env = require("../config/environtment");
const { HttpStatusCode } = require("../../src/utilities/constants");
const baseModel = require('../utilities/BaseModel')
const path = require('path')

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
        const res = await notifyTemplateModel.createNotifyTemplate(req.body)
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
        if (req.files != null) {
            const file = req.files?.file;
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
        let res = await notifyTemplateModel.updateNotifyTemplate(req.body, id)
        if (res.affectedRows > 0) {
            return {
                status: HttpStatusCode.OK,
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