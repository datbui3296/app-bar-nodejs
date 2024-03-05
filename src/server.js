const express = require("express");
const cors = require("cors");
const { corsOptions } = require("./config/cors");
const FileUpload = require("express-fileupload") ;
// import { connectDB } from '*/config/mongodb'
const connectDB = require("./config/mysqldb");
const { env } = require("./config/environtment");
const apiV1 = require("./routes/v1/index");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const http = require("http");
const app = express();

const bootServer = async () => {
  await connectDB.connect();
  app.use(cookieParser());

  app.use(cors(corsOptions));

  // Enable req.body data
  app.use(bodyParser.json());
  app.use(express.json());
  app.use(FileUpload());
  app.use(express.static("uploads"));

  // Use APIs v1
  app.use("/api/v1", apiV1);
  const server = http.createServer(app);
  server.listen(process.env.PORT || env.APP_PORT, () => {
    console.log(
      `Hello app , I'm running at port: ${process.env.PORT || env.APP_PORT}/`
    );
  });
  // app.use('/uploads', express.static('uploads'))
  // app.use('/', function (req, res) {
  //     res.sendFile(path.join(__dirname + '/frontend/index.html'))
  //     //__dirname : It will resolve to your project folder.
  // })
};
bootServer();

process.on("SIGINT", async () => {
  console.log("Received SIGINT. Closing server and database connections...");
  await database.close();
  process.exit(0);
});
