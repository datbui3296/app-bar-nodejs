const JWT = require("jsonwebtoken");
const baseModel = require('../utilities/BaseModel')
const env = require("../config/environtment");
const { HttpStatusCode } = require("../utilities/constants");

const generateToken = async (privateKey, tokenLife, user = {}) => {
  try {
    return await JWT.sign(user, privateKey, {
      algorithm: "HS256", //Kiểu mã hoá
      expiresIn: tokenLife, //Thời gian token tồn tại
    });
  } catch (error) {
    throw new Error(error);
  }
};

const verifyToken = async (token, typeToken = null) => {
  try {
    let data = null;
    if (typeToken == 'ACCESS_TOKEN_PRIVATE_KEY') {
      data = JWT.verify(token, env.ACCESS_TOKEN_PRIVATE_KEY);
      if (!data) {
        throw new Error("Not verify");
      }
      return data;
    }
    // Find refresh token exist or not
    const findTokenQuery = `SELECT * FROM usertoken WHERE Token = ?`;
    let result = await baseModel.executeQueryRawasync(findTokenQuery, token);
    if (result.length == 0) return {
      status: HttpStatusCode.NOT_FOUND
    };
    data = JWT.verify(token, env.REFRESH_TOKEN_PRIVATE_KEY);
    if (!data) {
      return{
        status: HttpStatusCode.UNAUTHORIZED,
      };
    }
    return data;

  } catch (err) {
    if (err?.message?.includes("jwt expired")) {
      // access token hết hạn => Cần trả về mã lỗi cho FE để gọi API refreshToken
      return{
        status: HttpStatusCode.EXPIRED,
      };
    }
    return{
      status: HttpStatusCode.UNAUTHORIZED,
    };
  }
};


module.exports = { generateToken, verifyToken }
