const { HttpStatusCode } = require("../../src/utilities/constants");
const UserInvoiceService = require("../../src/services/userinvoice.service");
const ms = require("ms");

const createUserInvoice = async (req, res) => {
    try {

        const result = await UserInvoiceService.createUserInvoice(req, res);
        return res.status(!result.status ? HttpStatusCode.OK : result.status).json({ message: result?.message })

    } catch (error) {
        return res.status(HttpStatusCode.INTERNAL_SERVER).json({
            message: error.message
        })

    }
}

const getUserInvoices = async (req, res) => {
    try {
        const result = await UserInvoiceService.getUserInvoices(req, res);
        return res.status(!result.status ? HttpStatusCode.OK : result.status).json({ data: result?.data })

    } catch (error) {
        return res.status(HttpStatusCode.INTERNAL_SERVER).json({
            message: error.message
        })

    }
}

const getUserInvoiceId = async (req, res) => {
    try {

        const result = await UserInvoiceService.getUserInvoiceId(req, res);
        return res.status(!result.status ? HttpStatusCode.OK : result.status).json({ data: result?.data })

    } catch (error) {
        return res.status(HttpStatusCode.INTERNAL_SERVER).json({
            message: error.message
        })

    }
}

const updateUserInvoice = async (req, res) => {
    try {

        const result = await UserInvoiceService.updateUserInvoice(req, res);
        return res.status(!result.status ? HttpStatusCode.OK : result.status).json({ message: result?.message })
    } catch (error) {
        return res.status(HttpStatusCode.INTERNAL_SERVER).json({
            message: error.message
        })

    }
}

const deleteUserInvoice= async (req, res) => {
    try {

        const result = await UserInvoiceService.deleteUserInvoice(req, res);
        return res.status(!result.status ? HttpStatusCode.OK : result.status).json({ data: result?.message })
    } catch (error) {
        return res.status(HttpStatusCode.INTERNAL_SERVER).json({
            message: error.message
        })

    }
}

const getAllUserInvoices = async (req, res) => {
    try {
        const result = await UserInvoiceService.getAllUserInvoices(req, res);
        return res.status(!result.status ? HttpStatusCode.OK : result.status).json({ data: result?.data })

    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            message: error.message
        })

    }
}


const updateInvoidPaid = async(req,res) =>{
    try {
        const result = await UserInvoiceService.updateInvoidPaid(req, res);
        return res.status(!result.status ? HttpStatusCode.OK : result.status).json({ code: result.status, message: result.message })

    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            message: error.message
        })

    }
}





module.exports = {
    createUserInvoice,
    getUserInvoices,
    getUserInvoiceId,
    updateUserInvoice,
    getAllUserInvoices,
    deleteUserInvoice,
    updateInvoidPaid

}