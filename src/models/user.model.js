

const Joi = require('joi')
const getDB = require('../config/mysqldb')
const baseModel = require('../utilities/BaseModel')

// Define Users collection
const userCollectionName = 'users'
const userCollectionSchema = Joi.object({
    Password: Joi.string().required().trim(),
    DisplayName: Joi.string().required(),
    Phone: Joi.string().required().trim(),
    BirthDate: Joi.date().timestamp().required(),
    IsActive: Joi.boolean().default(true),
    VerifyToken: Joi.string(),
    // currentRefreshToken: Joi.array(),
    // currentAccessToken: Joi.array(),

    CreatedAt: Joi.date().timestamp('javascript').default(Date.now()),
    UpdatedAt: Joi.date().timestamp().default(null)
})

const validateSchema = async (data) => {
    return await userCollectionSchema.validateAsync(data, { abortEarly: false })
}

const findOneById = async (id) => {
    try {
        let sql = `SELECT * FROM users WHERE Id = ?`
        let result = await getDB.excuteQuery(sql, [id]);
        return result;
    } catch (error) {
        throw new Error(error)
    }
}
const findOneByEmail = async (email) => {
    try {
        let sql = `SELECT * FROM users WHERE Email = ?`
        let result = await getDB.excuteQuery(sql, [email]);
        return result;
    } catch (error) {
        throw new Error(error)
    }
}
const findOneByPhone = async (phone) => {
    try {
        let sql = `SELECT * FROM users WHERE Phone = ?`
        let result = await getDB.excuteQuery(sql, [phone]);
        return result;
    } catch (error) {
        throw new Error(error)
    }
}

const register = async (data) => {
    try {
        const result = await baseModel.create(data, userCollectionName)
        return result
    } catch (error) {
        throw new Error(error)
    }
}
const createUserLogin = async (data) => {
    try {
        let userCollectionName = `usertoken`;
        let findTokenQuery = `SELECT * FROM ${userCollectionName} WHERE userId = ?`;
        let resultFindUser = await baseModel.executeQueryRawasync(findTokenQuery, data.UserId);
        if (resultFindUser.length > 0) {
            const sqlDelete = `DELETE FROM ${userCollectionName} WHERE UserId = ?`;
            const resultDelete = await baseModel.executeQueryRawasync(sqlDelete, data.UserId);
        }
        let refreshTokenData = {
            UserId: data.UserId,
            Token: data.RefreshToken
        }
        const result = await baseModel.create(refreshTokenData, userCollectionName)
        return result
    } catch (error) {
        throw new Error(error)
    }
}

const update = async (id, data) => {
    try {
        const result = await baseModel.update(data, id, userCollectionName)
        return result
    } catch (error) {
        throw new Error(error)
    }
}


module.exports = {
    userCollectionName,
    findOneByEmail,
    findOneByPhone,
    register,
    update,
    findOneById,
    createUserLogin
}
