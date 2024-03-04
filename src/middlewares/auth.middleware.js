const multer = require("multer");
const env = require("../config/environtment");
const JwtProvider = require("../providers/JwtProvider");
const HttpStatusCode = require("../utilities/constants");
const AuthModel = require("../models/user.model");
const isAuthorized = async (req, res, next) => {
  //console.log(req)
  const clientAccessToken = req.cookies?.accessToken;
  //console.log(clientAccessToken)
  if (!clientAccessToken) {
    return res.status(HttpStatusCode.UNAUTHORIZED).json({
      errors: "Unauthorized (Token not found)",
    });
  }
  try {
    //Thực hiện giải mã token xem có hợp lệ hay ko
    const decoded = await JwtProvider.verifyoken(
      env.ACCESS_TOKEN_PRIVATE_KEY,
      clientAccessToken
    );

    const user = await AuthModel.findOneById(decoded._id);
    if (!user) {
      return res
        .status(HttpStatusCode.UNAUTHORIZED)
        .json({ stt: false, msg: "Account not found" });
    }
    if (!user.currentAccessToken.includes(clientAccessToken)) {
      return res
        .status(HttpStatusCode.UNAUTHORIZED)
        .json({ stt: false, msg: "Access token not found" });
    }
    //Token hợp lệ - Lưu thông tin giải mã được vào req, để sử dụng cho các phần cần xử lý
    req.jwtDecoded = decoded;
    // Cho phép REQUEST đi tiếp
    next();
  } catch (error) {
    //console.log(error)
    if (error?.message?.includes("jwt expired")) {
      // access token hết hạn => Cần trả về mã lỗi cho FE để gọi API refreshToken
      return res.status(HttpStatusCode.EXPIRED).json({
        errors: "Access Token Expired. Need to refresh token",
      });
    }
    // Access token không hợp lệ do bất cứ điều gì => Trả về mã 401 cho FE gọi API logout
    return res.status(HttpStatusCode.UNAUTHORIZED).json({
      errors: "Unauthorized",
    });
  }
};

const isRefreshToken = async (req, res, next) => {
  const clientRefreshToken = req.cookies?.refreshToken;
  if (!clientRefreshToken) {
    return res.status(HttpStatusCode.UNAUTHORIZED).json({
      errors: "Refresh token not found",
    });
  }
  try {
    //Thực hiện giải mã token xem có hợp lệ hay ko
    const decoded = await JwtProvider.verifyToken(
      env.REFRESH_TOKEN_PRIVATE_KEY,
      clientRefreshToken
    );

    const user = await AuthModel.findOneById(decoded._id);
    if (!user) {
      return res
        .status(HttpStatusCode.UNAUTHORIZED)
        .json({ stt: false, msg: "Account not found" });
    }
    if (!user.currentRefreshToken.includes(clientRefreshToken)) {
      return res
        .status(HttpStatusCode.UNAUTHORIZED)
        .json({ stt: false, msg: "Refresh token not found" });
    }
    //Token hợp lệ - Lưu thông tin giải mã được vào req, để sử dụng cho các phần cần xử lý
    req.jwtDecoded = decoded;
    // Cho phép REQUEST đi tiếp
    next();
  } catch (error) {
    return res.status(HttpStatusCode.UNAUTHORIZED).json({
      errors: "Unauthorized",
    });
  }
};

const deleteToken = async (req, res, next) => {
  const clientAccessToken = req.cookies?.accessToken;
  const clientRefreshToken = req.cookies?.refreshToken;

  if (!clientAccessToken || !clientRefreshToken) {
    next();
  }
  try {
    const user = await AuthModel.findOneById(req.cookies?._id);
    if (!user) {
      next();
    }
    user.currentAccessToken.splice(
      user.currentAccessToken.indexOf(clientAccessToken),
      1
    );
    user.currentRefreshToken.splice(
      user.currentRefreshToken.indexOf(clientRefreshToken),
      1
    );
    await AuthModel.update(user._id, {
      currentRefreshToken: user.currentRefreshToken,
      currentAccessToken: user.currentAccessToken,
    });
    // Cho phép REQUEST đi tiếp
    next();
  } catch (error) {
    if (error?.message?.includes("jwt expired")) {
      // access token hết hạn => Cần trả về mã lỗi cho FE để gọi API refreshToken
      return res.status(HttpStatusCode.EXPIRED).json({
        errors: "Access Token Expired. Need to refresh token",
      });
    }
    // Access token không hợp lệ do bất cứ điều gì => Trả về mã 401 cho FE gọi API logout
    return res.status(HttpStatusCode.UNAUTHORIZED).json({
      errors: "Unauthorized",
    });
  }
};

module.exports= {
  isAuthorized,
  isRefreshToken,
  deleteToken,
};
