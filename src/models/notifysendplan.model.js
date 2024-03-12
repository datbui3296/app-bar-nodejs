const Joi = require("joi");
const getDB = require("../config/mysqldb");
const baseModel = require("../utilities/BaseModel");
const Constants = require("../utilities/constants");
const notifySendplanName = "notifysendplan";
const userNameTable = "users";
const notifyTemplateTable = "notifytempalte";
const columnName = "Id";
const createNotifySendPlan = async (data) => {
  try {
    const result = await baseModel.create(data, notifySendplanName);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const updateNotifySendPlan = async (data, id) => {
  try {
    const result = await baseModel.update(data, id, notifySendplanName);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const deleteNotifySendPlan = async (id) => {
  try {
    const result = await baseModel.deleteData(id, notifySendplanName);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const getNotifySendPlans = async (page, pageSize) => {
  try {
    const dataRes = await baseModel.getAllWithPagination(
      page,
      pageSize,
      notifySendplanName
    );
    const datas = dataRes.result;
    for (let i = 0; i < datas.length; i++) {
      let dataNotifyTemplate = await baseModel.getById( datas[i].NotifyTempalteId, notifyTemplateTable);
      let userById = await baseModel.getById(datas[i].SendedBy, userNameTable);
      datas[i].NotifyTemplateName = dataNotifyTemplate[0].Name;
      datas[i].SendedName = userById[0].DisplayName;
      let arrayUserId = datas[i].Receive?.split(",")?.map(Number);
      let dataUserBiIds = await baseModel.executeQueryINRawasync(
        arrayUserId,
        columnName,
        userNameTable
      );
      let arrayUser = dataUserBiIds.map((item) => {
        return { UserName: item.DisplayName, UserId: item.Id };
      });
      datas[i].Receive = arrayUser;
    }
    dataRes.result = datas
    return dataRes
  } catch (error) {
    console.log(error);
  }
};

const getNotifySendPlanById = async (id) => {
  try {
    const result = await baseModel.getById(id, notifySendplanName);
    let dataNotifyTemplate = await baseModel.getById(
      result[0].NotifyTempalteId,
      notifyTemplateTable
    );
    let userById = await baseModel.getById(result[0].SendedBy, userNameTable);
    result[0].NotifyTemplateName = dataNotifyTemplate[0].Name;
    result[0].SendedName = userById[0].DisplayName;
    let arrayUserId = result[0].Receive?.split(",")?.map(Number);
    let dataUserBiIds = await baseModel.executeQueryINRawasync(
      arrayUserId,
      columnName,
      userNameTable
    );
    let arrayUser = dataUserBiIds.map((item) => {
      return { UserName: item.DisplayName, UserId: item.Id };
    });
    result[0].Receive = arrayUser;
    return result[0];
  } catch (error) {
    console.log(error);
  }
};

const getAllNotifySendPlans = async () => {
  try {
    const result = await baseModel.getAll(notifySendplanName);
    return result;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createNotifySendPlan,
  updateNotifySendPlan,
  deleteNotifySendPlan,
  getNotifySendPlans,
  getAllNotifySendPlans,
  getNotifySendPlanById,
};
