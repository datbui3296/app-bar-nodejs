const  env  = require("./environtment");

const corsOptions = {
  origin: function (origin, callback) {
    //Hỗ trợ việc call api bằng postman trên môi trường dev
    //Khi sử dụng postman thì origin sẽ có giá trị là undefined
    if (!origin && env.BUILD_MODE === "dev") {
      return callback(null, true);
    }
    return callback(null, true);
    // if (WHITELIST_DOMAINS.indexOf(origin) !== -1) {
    //     return callback(null, true)
    // }
    // return callback(new Error(`${origin} not allowed by CORS.`))
  },
  optionsSuccessStatus: 200,
  credentials: true, // Nhận cookie
};
module.exports = {
  corsOptions,
};
