const { HttpStatusCode } = require("../../src/utilities/constants");
const BookingService = require("../../src/services/booking.service");
const ms = require("ms");

const createUserBooking = async (req, res) => {
    try {

        const result = await BookingService.createUserBooking(req, res);
        return res.status(!result.status ? HttpStatusCode.OK : result.status).json({ message: result?.message })

    } catch (error) {
        return res.status(HttpStatusCode.INTERNAL_SERVER).json({
            message: error.message
        })

    }
}

const updateUserBooking = async (req, res) => {
    try {

        const result = await BookingService.updateUserBooking(req, res);
        return res.status(!result.status ? HttpStatusCode.OK : result.status).json({ message: result?.message })
    } catch (error) {
        return res.status(HttpStatusCode.INTERNAL_SERVER).json({
            message: error.message
        })

    }
}

const deleteUserBooking = async (req, res) => {
    try {

        const result = await BookingService.deleteUserBooking(req, res);
        return res.status(!result.status ? HttpStatusCode.OK : result.status).json({ message: result?.message })
    } catch (error) {
        return res.status(HttpStatusCode.INTERNAL_SERVER).json({
            message: error.message
        })

    }
}

const vertifyUserBooking = async (req, res) => {
    try {
        const result = await BookingService.vertifyUserBooking(req, res);
        return res.status(!result.status ? HttpStatusCode.OK : result.status).json({ message: result?.message })

    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            message: error.message
        })

    }
}


module.exports = {
    createUserBooking,
    updateUserBooking,
    deleteUserBooking,
    vertifyUserBooking

}