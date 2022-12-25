// const express = require("express");
// const bodyParser = require("body-parser");

// const app = express();
// //
// require("dotenv").config();
// const cors = require("cors");

// //server port
// const port = process.env.PORT || 4040;

// app.use(express.json());
// app.use(
//   express.urlencoded({
//     extended: true,
//   })
// );
// app.use(cors());


// // const machineRoutes = require("./src/api/routes/machine_route");

// // app.use("/machine", machineRoutes);

// app.get("/", (req, res) => {
//   if (!req.user) {
//     return res.status(401).json({
//       api_name: "TODO API",
//       auth_: [
//         {
//           error: true,
//           message: "enter valid details",
//         },
//       ],
//       routes_: [{ routename: "/users" }],
//     });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is listening on port ${port}`);
// });

// const http = require("http");

// const app = require("./app");
// const server = http.createServer(app);
// const { API_PORT } = process.env;

// const port = process.env.PORT || API_PORT;

// // server listening 
// server.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });


const http = require("http");
const app = require("./app");

const port = process.env.PORT || 4040;

const server = http.createServer(app);

// server.listen(port);

// server listening 
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});