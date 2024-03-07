const Joi = require('joi')
const getDB = require('../config/mysqldb')
const baseModel = require('../utilities/BaseModel')
const Constants = require('../utilities/constants')
const userBookingTable = "booking"
const createUserBooking = async (data) => {
    try {
        const result = await baseModel.create(data, userBookingTable)
        return result

    } catch (error) {
        console.log(error)
    }
}

const updateUserBooking = async (data, id) => {
    try {
        const result = await baseModel.update(data, id, userBookingTable)
        return result
    } catch (error) {
        console.log(error)
    }
}

const deleteUserBooking = async (id) => {
    try {
        let booking = await baseModel.getDataByConditions(userBookingTable, { Id: id })
        if (booking.length == 0) {
            console.log(`Booking not found`)
        }
        const updatedData = {
            IsDeleted: 1
        };

        const condition = "Id = ?"
        const conditionParams = [booking[0]?.Id];

        var resultUpdate = await baseModel.getUpdateDataByConditions(userBookingTable, updatedData, condition, conditionParams);
        if (resultUpdate.affectedRows > 0) {
            console.log(`Booking delete success`)
        }
        return resultUpdate;

    } catch (error) {
        console.log(error)
    }
}

const vertifyUserBooking = async (id) => {
    try {
        let booking = await baseModel.getDataByConditions(userBookingTable, { Id: id })
        if (booking.length == 0) {
            console.log(`Booking not found`)
        }
        const updatedData = {
            Status: 'VERRIFY'
        };

        const condition = "Id = ?"
        const conditionParams = [booking[0]?.Id];

        var resultUpdate = await baseModel.getUpdateDataByConditions(userBookingTable, updatedData, condition, conditionParams);
        if (resultUpdate.affectedRows > 0) {
            console.log(`Booking vertify success`)
            return resultUpdate
        }

    } catch (error) {
        console.log(error)
    }
}

const getBookingById = async (id) => {
    try {
        let booking = await baseModel.getDataByConditions(userBookingTable, { Id: id })
        return booking

    } catch (error) {
        console.log(error)
    }

}





module.exports = {
    createUserBooking,
    updateUserBooking,
    deleteUserBooking,
    vertifyUserBooking,
    getBookingById

}