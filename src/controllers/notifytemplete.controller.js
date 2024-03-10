const { HttpStatusCode } = require("../../src/utilities/constants");
const NotifyTemplateService = require("../../src/services/notifytemplete.service");
const ms = require("ms");

const createNotifyTemplate = async (req, res) => {
    try {

        const result = await NotifyTemplateService.createNotifyTemplate(req, res);
        return res.status(!result.status ? HttpStatusCode.OK : result.status).json({ message: result?.message })

    } catch (error) {
        return res.status(HttpStatusCode.INTERNAL_SERVER).json({
            message: error.message
        })

    }
}

const getNotifyTemplates = async (req, res) => {
    try {
        const result = await NotifyTemplateService.getNotifyTemplates(req, res);
        return res.status(!result.status ? HttpStatusCode.OK : result.status).json({ data: result?.data })

    } catch (error) {
        return res.status(HttpStatusCode.INTERNAL_SERVER).json({
            message: error.message
        })

    }
}

const getNotifyTemplateById = async (req, res) => {
    try {

        const result = await NotifyTemplateService.getNotifyTemplateById(req, res);
        return res.status(!result.status ? HttpStatusCode.OK : result.status).json({ data: result?.data })

    } catch (error) {
        return res.status(HttpStatusCode.INTERNAL_SERVER).json({
            message: error.message
        })

    }
}

const updateNotifyTemplate = async (req, res) => {
    try {

        const result = await NotifyTemplateService.updateNotifyTemplate(req, res);
        return res.status(!result.status ? HttpStatusCode.OK : result.status).json({ message: result?.message })
    } catch (error) {
        return res.status(HttpStatusCode.INTERNAL_SERVER).json({
            message: error.message
        })

    }
}

const deleteNotifyTemplate = async (req, res) => {
    try {

        const result = await NotifyTemplateService.deleteNotifyTemplate(req, res);
        return res.status(!result.status ? HttpStatusCode.OK : result.status).json({ data: result?.message })
    } catch (error) {
        return res.status(HttpStatusCode.INTERNAL_SERVER).json({
            message: error.message
        })

    }
}

const getAllNotifyTemplates = async (req, res) => {
    try {
        const result = await NotifyTemplateService.getAllNotifyTemplates(req, res);
        return res.status(!result.status ? HttpStatusCode.OK : result.status).json({ data: result?.data })

    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            message: error.message
        })

    }
}



module.exports = {
    createNotifyTemplate,
    getNotifyTemplates,
    getNotifyTemplateById,
    updateNotifyTemplate,
    deleteNotifyTemplate,
    getAllNotifyTemplates,

}