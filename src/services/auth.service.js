const bcrypt = require("bcryptjs");
const AuthModel = require("../models/user.model");
const { v4: uuidv4 } = require("uuid");
const { pick } = require("lodash");
const env = require("../config/environtment");
const JwtProvider = require("../providers/JwtProvider");
const { HttpStatusCode } = require("../../src/utilities/constants");
const baseModel = require("../utilities/BaseModel");
const createTransporter = require("../../src/utilities/transporter");
const path = require("path");
const crypto = require("crypto");

const createTransporterMail = createTransporter();

const register = async (data) => {
  try {
    const phones = await AuthModel.findOneByPhone(data.Phone);
    if (phones.length > 0) {
      return {
        status: 0,
        message: "User is exirt!",
      };
    }
    //const nameFromEmail = data.email.split('@')[0] || ''
    const newData = {
      Email: data?.Email ?? "",
      UserName: data?.UserName ?? "",
      Password: await bcrypt.hashSync(data.Password, 10),
      DisplayName: data.DisplayName,
      VerifyToken: uuidv4(),
      Phone: data.Phone,
      BirthDate: data.BirthDate,
    };
    // transaction mongodb
    const createdUser = await AuthModel.register(newData);
    let getUsers = await AuthModel.findOneById(createdUser.id);
    let user = getUsers[0];
    let dataRes = {
      Phone: user.Phone,
      DisplayName: user.DisplayName,
      UserId: user.Id,
    };
    return {
      status: 1,
      message: "User create successfully!",
      data: dataRes,
    };
  } catch (error) {
    throw new Error(error);
  }
};

const verifyToken = async (data, res) => {
  try {
    let res = JwtProvider.verifyToken(data);
    res.then((data) => {
      res.status(HttpStatusCode.OK).json({
        stt: true,
        msg: "Verify token is success",
        data: data,
      });
    });
    return res;
  } catch (error) {
    throw new Error(error);
  }
};

const login = async (data) => {
  try {
    const user = await AuthModel.findOneByPhone(data.Phone);
    if (!user) {
      return { status: 0, message: "User not found" };
      //return { stt: false, msg: 'Incorrect username or password' }
    }
    const isCheckPassword = await bcrypt.compareSync(
      data.Password,
      user[0].Password
    );
    if (!isCheckPassword) {
      return { status: 0, message: "Incorrect username or password" };
      //return { stt: false, msg: 'Incorrect username or password' }
    }
    if (user[0].isActive) {
      return { status: 0, message: "Account is not active" };
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
      RefreshToken: refreshToken,
    };

    let result = await AuthModel.createUserLogin(dataCreateUserToken);
    if (result.length == 0) return { status: 1, mesage: "Login not success" };

    return {
      status: 1,
      message: "Login successfully",
      data: {
        Email: user[0].Email,
        Phone: user[0].Phone,
        AccessToken: accessToken,
        RefreshToken: refreshToken,
        UserId: user[0].Id,
        DisplayName: user[0].DisplayName,
        Role: user[0].Role,
        BirthDate: user[0].BirthDate,
        AccumulatedPoint: user[0].AccumulatedPoint,
        AmountSpent: user[0].AmountSpent,
        Avatar: user[0].Avatar,
        Level: user[0].Level,
      },
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
    let infoUser = {
      Id: user[0].Id,
      Email: user[0].Email,
      Phone: user[0].Phone,
    };
    //return accessToken and refreshToken
    const accessToken = await JwtProvider.generateToken(
      env.ACCESS_TOKEN_PRIVATE_KEY,
      env.ACCESS_TOKEN_LIFE,
      infoUser
    );
    let verifyToken = await JwtProvider.verifyToken(clientRefreshToken);
    if (verifyToken.status == HttpStatusCode.NOT_FOUND) {
      return {
        status: HttpStatusCode.NOT_FOUND,
        Message: "Refresh token is not in database!",
      };
    }
    return {
      data: {
        Message: "Refresh Token Success",
        data: {
          AccessToken: accessToken,
          ...infoUser,
          RefreshToken: clientRefreshToken,
        },
      },
    };
  } catch (error) {
    if (error?.message?.includes("jwt expired")) {
      return {
        status: HttpStatusCode.REFRESH_EXPIRED,
      };
    }
  }
};

const authMiddleWare = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split("Bear ")[1];
    console.log("middle", token);
    if (token === null || !token || token == undefined)
      return res.status(HttpStatusCode.UNAUTHORIZED).json({
        message: "There is no token in header",
      });

    const user = await JwtProvider.verifyToken(
      token,
      "ACCESS_TOKEN_PRIVATE_KEY"
    );
    if (user.status == HttpStatusCode.EXPIRED) {
      return res.status(HttpStatusCode.EXPIRED).json({
        status: `TOKEN_EXPIRED`,
        mesage: `Token expired`
      });
    } else if (user.status == HttpStatusCode.UNAUTHORIZED) {
      return res.status(HttpStatusCode.EXPIRED).json({
        status: `ERROR`,
        mesage: `Token expired`
      });
    }
    req.user = user;
    console.log(user);
    next();
  } catch (error) {
    //console.log(error)
  }
};

const getUserById = async (id) => {
  try {
    let res = AuthModel.findOneById(id);
    return res;
  } catch (error) {
    throw new Error(error);
  }
};

const forgotPassword = async (req) => {
  try {
    let tableUserName = "users";
    const email = req.body.Email;
    let userByEmail = await baseModel.getDataByConditions(tableUserName, {
      Email: email,
    });
    if (userByEmail.length == 0) {
      return {
        status: HttpStatusCode.NOT_FOUND,
        message: "User Email not found",
      };
    }
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiry = Date.now() + 3600000; // Token expires in 1 hour

    const updatedData = {
      ResetToken: resetToken,
      ResetTokenExpery: resetTokenExpiry,
      // Add other columns and values as eeded
    };

    const condition = "Id = ?";
    const conditionParams = [userByEmail[0]?.Id];

    var resultUpdate = await baseModel.getUpdateDataByConditions(
      tableUserName,
      updatedData,
      condition,
      conditionParams
    );
    if (resultUpdate.affectedRows > 0) {
      const mailOptions = {
        from: "datbui3296@gmail.com",
        to: email,
        subject: "Password Reset Request",
        text:
          `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n` +
          `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
          `http://localhost:3000/reset-password?token=${resetToken}\n\n` +
          `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
      };

      createTransporterMail.sendMail(mailOptions, (error) => {
        if (error) {
          console.error("Error sending email:", error);
          return {
            status: HttpStatusCode.INTERNAL_SERVER,
            message: `Failed to send reset email`,
          };
        } else {
          console.log("Reset token sent:", resetToken);
          return {
            status: HttpStatusCode.OK,
            message: `Reset token sent to your email`,
          };
        }
      });
      createTransporterMail.close();
    }
  } catch (error) {
    return {
      status: HttpStatusCode.BAD_REQUEST,
      message: error.message,
    };
  }
};

const resetPasswordNotMail = async (req) => {
  try {
    let tableUserName = "users";
    const id = parseInt(req.params.id, 10);
    let newPassword = req.body.NewPassword;
    const hashedPassword = await bcrypt.hashSync(newPassword, 10);
    const updatedData = {
      Password: hashedPassword,
    };
    const condition = "Id = ?";
    const conditionParams = [id];
    var resultUpdatePassword = await baseModel.getUpdateDataByConditions(
      tableUserName,
      updatedData,
      condition,
      conditionParams
    );
    if (resultUpdatePassword.affectedRows > 0) {
      return {
        status: HttpStatusCode.OK,
        message: `Reset password successfuly`,
      };
    }
  } catch (error) {
    return {
      status: HttpStatusCode.BAD_REQUEST,
      message: error.message,
    };
  }
};

const resetPassword = async (req) => {
  try {
    let tableUserName = "users";
    const { Token, NewPassword } = req.body;
    let userByEmail = await baseModel.getDataByConditions(tableUserName, {
      ResetToken: Token,
    });
    if (userByEmail[0].ResetTokenExpery < Date.now()) {
      return {
        status: HttpStatusCode.EXPIRED,
        message: `Invalid or expired reset token`,
      };
    }
    const hashedPassword = await bcrypt.hashSync(NewPassword, 10);
    const updatedData = {
      ResetToken: null,
      Password: hashedPassword,
      // Add other columns and values as eeded
    };

    const condition = "ResetToken = ?";
    const conditionParams = [Token];

    var resultUpdatePassword = await baseModel.getUpdateDataByConditions(
      tableUserName,
      updatedData,
      condition,
      conditionParams
    );
    if (resultUpdatePassword.affectedRows > 0) {
      return {
        status: HttpStatusCode.OK,
        message: `Reset password successfuly`,
      };
    }
  } catch (error) {
    return {
      status: HttpStatusCode.BAD_REQUEST,
      message: error.message,
    };
  }
};
const update = async (req) => {
  try {
    let checkSucess = false;
    const userId = parseInt(req.params.id, 10);
    const user = await AuthModel.findOneById(userId);
    if (!user) {
      return { status: 0, message: "User not found" };
    }
    if (req.files != null) {
      const file = req.files.file;
      const fileSize = file?.data?.length;
      const ext = path.extname(file.name);
      const fileName = file.md5 + ext;
      const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
      const allowedType = [".png", ".jpg", ".jpeg"];
      if (!allowedType.includes(ext.toLowerCase()))
        return res
          .status(HttpStatusCode.INVALID_IMAGE)
          .json({ mesage: "Invalid Images" });
      if (fileSize > 5000000)
        return res
          .status(HttpStatusCode.INVALID_IMAGE)
          .json({ mesage: "Image must be less than 5 MB" });
      await file.mv(`./src/uploads/${fileName}`, async (err) => {
        if (err)
          return { status: HttpStatusCode.BAD_REQUEST, message: err.message };
      });
      req.body = { ...req.body, Avatar: url };
    }
    let updateRes = await AuthModel.update(userId, req.body);
    if (updateRes.affectedRows > 0) {
      return { status: HttpStatusCode.OK, message: `Update user successfully` };
    }
  } catch (error) {
    return {
      status: HttpStatusCode.BAD_REQUEST,
      message: error.message,
    };
  }
};

const getLevelByLevelId = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const tableName = "rank";
    let level = await baseModel.getById(id, tableName);
    return { data: level };
  } catch (error) {
    return {
      status: HttpStatusCode.BAD_REQUEST,
      message: error.message,
    };
  }
};

const getUserByToken = async (req) => {
  try {
    let userTable = "users";
    const token = req.params.token;
    const user = await JwtProvider.verifyToken(
      token,
      "ACCESS_TOKEN_PRIVATE_KEY"
    );
    if(user.status == HttpStatusCode.INVALID_TOKEN){
      return {
        status: `INVALID_TOKEN`,
        mesage: `Token invalid`
      }
    }
    else if(user.status == HttpStatusCode.EXPIRED){
      return {
        status: `TOKEN_EXPIRED`,
        mesage: `Token expired`
      }
    }
    if (verifyToken.status == HttpStatusCode.NOT_FOUND) {
      return {
        status: HttpStatusCode.NOT_FOUND,
        Message: "Token is not in database!",
      };
    }
    let userData = await baseModel.getById(user?.Id, userTable);

    return {
      data: {
        DisplayName: userData[0].DisplayName,
        BirthDate: userData[0].BirthDate,
        Email: userData[0].Email,
        Id: userData[0].Id,
      },
    };
  } catch (error) {}
};

module.exports = {
  register,
  verifyToken,
  login,
  refreshToken,
  authMiddleWare,
  getUserById,
  forgotPassword,
  resetPassword,
  update,
  getLevelByLevelId,
  resetPasswordNotMail,
  getUserByToken,
};
