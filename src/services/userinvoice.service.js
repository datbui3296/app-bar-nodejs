const userInvoiceModel = require("../models/userinvoice.model");
const { v4: uuidv4 } = require("uuid");
const { pick } = require("lodash");
const env = require("../config/environtment");
const { HttpStatusCode } = require("../../src/utilities/constants");
const baseModel = require("../utilities/BaseModel");

const createUserInvoice = async (req) => {
  try {
    const res = await userInvoiceModel.createUserInvoice(req.body);
    if (res) {
      return {
        status: HttpStatusCode.OK,
        message: `UserInvoice  create successfuly`,
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

const updateUserInvoice = async (req) => {
  try {
    const id = parseInt(req.params.id, 10);
    let userInvoices = await userInvoiceModel.getUserInvoiceId(id);
    if (userInvoices.length == 0) {
      return {
        message: `UserInvoice  not found`,
      };
    }
    let res = await userInvoiceModel.updateUserInvoice(req.body, id);
    if (res.affectedRows > 0) {
      return {
        message: `UserInvoice  update successfuly`,
      };
    }
  } catch (error) {
    return {
      status: HttpStatusCode.BAD_REQUEST,
      message: error.message,
    };
  }
};

const deleteUserInvoice = async (req) => {
  try {
    const id = parseInt(req.params.id, 10);
    let userInvoices = await userInvoiceModel.getUserInvoiceId(id);
    if (userInvoices.length == 0) {
      return {
        message: `UserInvoice  not found`,
      };
    }
    let res = await userInvoiceModel.deleteUserInvoice(id);
    if (res.affectedRows > 0) {
      return {
        message: `UserInvoice  delete successfuly`,
      };
    }
  } catch (error) {
    return {
      status: HttpStatusCode.BAD_REQUEST,
      mesage: error.message,
    };
  }
};

const getUserInvoices = async (req) => {
  try {
    const page = parseInt(req.params.page, 10);
    const pageSize = parseInt(req.params.pageSize, 10);
    let result = await userInvoiceModel.getUserInvoices(page, pageSize);
    return {
      data: result,
    };
  } catch (error) {
    return {
      status: HttpStatusCode.BAD_REQUEST,
      mesage: error.message,
    };
  }
};

const getUserInvoiceId = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    let result = await userInvoiceModel.getUserInvoiceId(id);
    return {
      data: result,
    };
  } catch (error) {
    return {
      status: HttpStatusCode.BAD_REQUEST,
      mesage: error.message,
    };
  }
};

const getAllUserInvoices = async (req, res) => {
  try {
    let result = await userInvoiceModel.getAllUserInvoices();
    return {
      data: result,
    };
  } catch (error) {
    return {
      status: HttpStatusCode.BAD_REQUEST,
      mesage: error.message,
    };
  }
};

const updateInvoidPaid = async (req, res) => {
  try {
    let tableNameInvoice = "userinvoice";
    let tableNameUser = "users";

    const id = parseInt(req.params.id, 10);
    let userInvoices = await userInvoiceModel.getUserInvoiceId(id);
    if (userInvoices.length == 0) {
      return {
        status: HttpStatusCode.NOT_FOUND,
        message: `UserInvoice  not found`,
      };
    }
    let users = await baseModel.getById(userInvoices[0].PaidBy, tableNameUser);
    if (users.length == 0) {
      return { status: HttpStatusCode.NOT_FOUND, mesage: `User not found` };
    }
    let totalNew = users[0]?.AmountSpent + userInvoices[0].Total;
    let pointNew = users[0]?.Point + userInvoices[0].Total / env.POINT;

    // update user poid and total amount
    const updatedDataInvoice = {
      Status: 1,
    };
    const conditionInvoice = "Id = ?";
    const conditionParamInvoices = [id];
    var resultUpdateInvoidce = await baseModel.getUpdateDataByConditions(
      tableNameInvoice,
      updatedDataInvoice,
      conditionInvoice,
      conditionParamInvoices
    );
    // update user poid and total amount
    const updatedData = {
      AmountSpent: totalNew,
      Point: pointNew,
    };
    const condition = "Id = ?";
    const conditionParams = [users[0].Id];
    var resultUpdateUser = await baseModel.getUpdateDataByConditions(
      tableNameUser,
      updatedData,
      condition,
      conditionParams
    );
    if (
      resultUpdateUser.affectedRows > 0 &&
      resultUpdateInvoidce.affectedRows > 0
    ) {
      return { status: HttpStatusCode.OK, message: `Paid successfully` };
    }
  } catch (error) {
    return {
      status: HttpStatusCode.BAD_REQUEST,
      mesage: error.message,
    };
  }
};

const getListInvoicByCashier = async (req) => {
  try {
    let usserTable = "users";
    let listData = [];
    let tableInvoice = `userinvoice`;
    let idUser = parseInt(req.params.id, 10);
    let invoiceByCashiers = await baseModel.getDataByConditions(tableInvoice, {
      CreatedBy: idUser,
      Status: 1,
    });
    const currentDate = new Date();
    const last15Days = new Date(
      currentDate.getTime() - 15 * 24 * 60 * 60 * 1000
    );

    let dataFilter = invoiceByCashiers.filter((obj) => {
      const objDate = new Date(obj.Created);
      return objDate >= last15Days && objDate <= currentDate;
    });
    for (let i = 0; i < dataFilter.length; i++) {
      let userPaid = await baseModel.getById(dataFilter[i].PaidBy, usserTable);
      listData.push({
        DisplayName: userPaid[0].DisplayName,
        InvoiceCode: dataFilter[i].InvoiceCode,
        TotalAmount: dataFilter[i].Total,
      });
    }
    return {
      data: {
        List: listData ?? [],
        TotalrRevenue: listData.reduce(
          (accumulator, currentValue) => accumulator + currentValue.TotalAmount,
          0
        ),
        NumberInvoice : listData?.length ?? 0
      },
    };
  } catch (error) {}
}



module.exports = {
  createUserInvoice,
  getUserInvoices,
  getUserInvoiceId,
  updateUserInvoice,
  deleteUserInvoice,
  getAllUserInvoices,
  updateInvoidPaid,
  getListInvoicByCashier,
};
