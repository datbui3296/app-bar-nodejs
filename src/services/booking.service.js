const bookingModel = require("../models/booking.model");
const { v4: uuidv4 } = require("uuid");
const { pick } = require("lodash");
const env = require("../config/environtment");
const { HttpStatusCode } = require("../../src/utilities/constants");
const baseModel = require("../utilities/BaseModel");

const createUserBooking = async (req) => {
  try {
    const res = await bookingModel.createUserBooking(req.body);
    if (res) {
      return {
        status: 1,
        message: `Bookking create successfuly`,
        data: res,
      };
    }
  } catch (error) {
    return {
      status: HttpStatusCode.BAD_REQUEST,
      message: error.message,
    };
  }
};

const updateUserBooking = async (req) => {
  try {
    const id = parseInt(req.params.id, 10);
    let bookings = await bookingModel.getBookingById(id);
    if (bookings.length == 0) {
      return {
        status: 0,
        message: `Bookking not found`,
      };
    }
    let res = await bookingModel.updateUserBooking(req.body, id);
    if (res.affectedRows > 0) {
      return {
        status: 1,
        message: `Bookking update successfuly`,
      };
    }
  } catch (error) {
    return {
      status: HttpStatusCode.BAD_REQUEST,
      message: error.message,
    };
  }
};

const deleteUserBooking = async (req) => {
  try {
    const id = parseInt(req.params.id, 10);
    let bookingDelete = await bookingModel.deleteUserBooking(id);
    if (bookingDelete.affectedRows > 0) {
      return {
        status: 1,
        message: `Bookking delete sucessfuly`,
      };
    }
  } catch (error) {
    return {
      status: HttpStatusCode.BAD_REQUEST,
      mesage: error.message,
    };
  }
};

const vertifyUserBooking = async (req) => {
  try {
    const id = parseInt(req.params.id, 10);
    let booking = await bookingModel.getBookingById(id);
    if (booking?.length > 0 && booking[0]?.Status == "VERRIFY") {
      return {
        status: 0,
        message: `Bookking is not vertify`,
      };
    }
    let bookingVertify = await bookingModel.vertifyUserBooking(id);
    if (bookingVertify.affectedRows > 0) {
      return {
        status: 1,
        message: `Bookking vertify sucessfuly`,
      };
    }
  } catch (error) {
    return {
      status: HttpStatusCode.BAD_REQUEST,
      mesage: error.message,
    };
  }
};



const getBookingByStatuAndSale = async (req) => {
  try {
    listResData = []
    let tableBooking = "booking";
    let tableUsers = "users";
    const status = req.params.status;
    const saleId = req.params.saleId;
    let bookings = await baseModel.getDataByConditions(tableBooking, {
      Status: status,
      CreatedBy: saleId
    });
    const currentDate = new Date();
    const last15Days = new Date(
      currentDate.getTime() - 15 * 24 * 60 * 60 * 1000
    );

    let dataFilter = bookings.filter((obj) => {
      const objDate = new Date(obj.Created);
      return objDate >= last15Days && objDate <= currentDate;
    });
    for(let i = 0 ; i< dataFilter.length; i++){
        let userPaid = await baseModel.getById(dataFilter[i].UserId, tableUsers);
        listResData.push({...userPaid[0], ...dataFilter[i]})
        
    }
    return { data: listResData };
  } catch (error) {
    return {
      status: HttpStatusCode.BAD_REQUEST,
      mesage: error.message,
    };
  }
};


module.exports = {
  createUserBooking,
  updateUserBooking,
  deleteUserBooking,
  vertifyUserBooking,
  getBookingByStatuAndSale,
};
