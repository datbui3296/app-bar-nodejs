// import { AuthModel } from '*/models/user.model'

// import { v4 as uuidv4 } from 'uuid'
// import { pick } from 'lodash'
// import { SendInBlueProvider } from '*/providers/sendInBlueProvider.js'
// const jwt = require('jsonwebtoken')
// import { env } from '*/config/environtment'
// import { WebsiteDomain } from '*/utilities/constants'
// import { pickUser } from '../utilities/transform'
// import { JwtProvider } from '../providers/JwtProvider'
// import { CloudinaryProvider } from '../providers/CoudinaryProvider'
// import { RedisQueueProvider } from '../providers/redisQueueProvider'
const bcrypt = require("bcryptjs");
const AuthModel = require("../models/user.model");
const { v4: uuidv4 } = require("uuid");
const { pick } = require("lodash");
const env = require("../config/environtment");
const JwtProvider = require("../providers/JwtProvider");
const { HttpStatusCode } = require("../../src/utilities/constants");

const register = async (data) => {
  try {
    const existUser = await AuthModel.findOneByEmail(data.Email);
    if (existUser.length > 0) {
      throw new Error("Email already exists");
    }
    //const nameFromEmail = data.email.split('@')[0] || ''
    const newData = {
      Email: data.Email,
      UserName: data.UserName,
      Password: await bcrypt.hashSync(data.Password, 10),
      DisplayName: data.DisplayName,
      VerifyToken: uuidv4(),
    };
    // transaction mongodb
    const createdUser = await AuthModel.register(newData);
    let getUsers = await AuthModel.findOneById(createdUser.id);
    let user = getUsers[0]

    //Gửi email xác thực người dùng
    // const verifyLocationLink = `${WebsiteDomain}/verify?email=${getUser.email}&verifyToken=${getUser.verifyToken}`
    // await SendInBlueProvider.sendEmailVerify(
    //     data.email,
    //     'Confirm trello account registration',
    //     `
    //         <h1>Finish creating your account</h1>
    //         <div style="margin-bottom: 30px">Hey there</div>
    //         <div style="margin-bottom: 30px">Your email address has been registered with Sendinblue. To validate your account and activate your ability to send email campaigns, please complete your profile by clicking the link below: web browser.</div>
    //         <div style="margin: 30px auto">
    //             <a style="display:inline-block;font-size:18px;font-family:'Open Sans','Arial',Helvetica,sans-serif;color:#ffffff;font-weight:normal;padding: 10px 20px;background-color:#0092ff;border-radius:15px;color:#ffffff;font-weight:normal" href="${verifyLocationLink}">Confirm my email address</a>
    //         </div>
    //     `
    // )
    // return pick(getUser, ['Email', 'Username', 'DisplayName', 'UpdatedAt', 'CreatedAt', 'Avatar', 'IsActive'])
    let dataRes = {
      UserName: user.UserName,
      DisplayName: user.DisplayName,
      Email: user.Email,
    };
    return dataRes
  } catch (error) {
    throw new Error(error);
  }
};

const verifyToken = async (data, res) => {
  try {
    let res = JwtProvider.verifyToken(data)
    res.then(data => {
      res.status(HttpStatusCode.OK).json({
        stt: true,
        msg: "Verify token is success",
        data: data,
      })
    });
    return res;
  } catch (error) {
    throw new Error(error);
  }
};

const login = async (data) => {
  try {
    const user = await AuthModel.findOneByUsername(data.UserName);
    if (!user) {
      throw new Error("Incorrect username or password");
      //return { stt: false, msg: 'Incorrect username or password' }
    }
    const isCheckPassword = await bcrypt.compareSync(
      data.Password,
      user[0].Password
    );
    if (!isCheckPassword) {
      throw new Error("Incorrect username or password");
      //return { stt: false, msg: 'Incorrect username or password' }
    }
    if (user[0].isActive) {
      throw new Error("Account is not active");
      //return { stt: false, msg: 'Account is not active' }
    }


    //return accessToken and refreshToken
    const accessToken = await JwtProvider.generateToken(
      env.ACCESS_TOKEN_PRIVATE_KEY,
      env.ACCESS_TOKEN_LIFE,
      { Id: user[0].Id, Email: user[0].Email, UserName: user[0].UserName }
    );

    const refreshToken = await JwtProvider.generateToken(
      env.REFRESH_TOKEN_PRIVATE_KEY,
      env.REFRESH_TOKEN_LIFE,
      { Id: user[0].Id, Email: user[0].Email, UserName: user[0].UserName }
    );

    let dataCreateUserToken = {
      UserId: user[0].Id,
      AccessToken: accessToken,
      RefreshToken: refreshToken
    }

    let result = await AuthModel.createUserLogin(dataCreateUserToken);
    if (result.length == 0) return { stt: false, msg: "Not create table userlogin" }

    return {
      stt: true, msg: "Login Success",
      data: {
        Email: user[0].Email, UserName: user[0].UserName, AccessToken: accessToken, RefreshToken: refreshToken, UserId: user[0].Id
      }
    };
  } catch (error) {
    throw new Error(error);
  }
};


const refreshToken = async (data) => {
  const clientRefreshToken = data.body?.RefreshToken;
  const userId = data.body?.UserId;
  // const userId = data.cookies?._id
  try {
    const user = await AuthModel.findOneById(userId);
    if (!user) {
      throw new Error("Account not found");
    }
    let infoUser = { Id: user[0].Id, Email: user[0].Email, UserName: user[0].UserName };
    //return accessToken and refreshToken
    const accessToken = await JwtProvider.generateToken(
      env.ACCESS_TOKEN_PRIVATE_KEY,
      env.ACCESS_TOKEN_LIFE,
      infoUser
    );
    let verifyToken = await JwtProvider.verifyToken(clientRefreshToken)
    if (verifyToken.status == HttpStatusCode.NOT_FOUND) {
      return { status: HttpStatusCode.NOT_FOUND, Message: 'Refresh token is not in database!' }
    }
    return {
      data: {
        Message: "Refresh Token Success", data: { AccessToken: accessToken, ...infoUser, RefreshToken: clientRefreshToken }
      }
    };
  } catch (error) {
    if (error?.message?.includes("jwt expired")) {
      return {
        status: HttpStatusCode.REFRESH_EXPIRED
      };
    }
  }
};

const authMiddleWare = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split("Bear ")[1];
    console.log("middle", token)
    if (token === null || !token || token == undefined)
      return res.status(HttpStatusCode.UNAUTHORIZED).json({
        message: "There is no token in header",

      })

    const user = await JwtProvider.verifyToken(token, 'ACCESS_TOKEN_PRIVATE_KEY');
    if (user.status == HttpStatusCode.EXPIRED) {
      return res.status(HttpStatusCode.EXPIRED).json({
        message: "Token Expried",

      })
    }
    else if (user.status == HttpStatusCode.UNAUTHORIZED) {
      return res.status(HttpStatusCode.EXPIRED).json({
        message: "UnAutherized",

      })
    }
    req.user = user;
    console.log(user)
    next();
  } catch (error) {
    //console.log(error)
  }
}

const getUserById = async (id) => {
  try {
    let res = AuthModel.findOneById(id)
    return res;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  register,
  verifyToken,
  login,
  refreshToken,
  authMiddleWare,
  getUserById
};
