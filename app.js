// require("dotenv").config();
// require("./src/config/dbconfig").connect();
// const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// const User = require("./src/model/user");
// const auth = require("./src/config/middleware/auth");

// const app = express();

// app.use(express.json());

// async function userSc(){
//     console.log('ahd')
//     let jsc = {
//         "firstName": "aditya",
//         "lastName": "madhusudhan",
//         "email": "adityam945@gmail.com",
//         "password": "12345"
//     }
//     // await User.create(jsc);
//     // const oldUser = await User.findOne({ email: jsc.email });
//     // console.log(oldUser)

//     console.log(await User.find({}))
//     console.log('geer done')
    
// }
// userSc()


// app.post("/register", async (req, res) => {
//   try {
//     // Get user input
//     const { firstName, lastName, email, password } = req.body;
//     // Validate user input
//     if (!(email && password && firstName && lastName)) {
//       res.status(400).send("All input is required");
//     }
//     console.log(req.body)

//     // check if user already exist
//     // Validate if user exist in our database
//     const oldUser = await User.findOne({ email });
//     console.log(req.body, oldUser, 'here')

//     if (oldUser) {
//       return res.status(409).send("User Already Exist. Please Login");
//     }

//     //Encrypt user password
//     encryptedUserPassword = await bcrypt.hash(password, 10);

//     // Create user in our database
//     const user = await User.create({
//       first_name: firstName,
//       last_name: lastName,
//       email: email.toLowerCase(), // sanitize: convert email to lowercase
//       password: encryptedUserPassword,
//     });

//     // Create token
//     const token = jwt.sign(
//       { user_id: user._id, email },
//       process.env.TOKEN_KEY,
//       {
//         expiresIn: "5h",
//       }
//     );
//     // save user token
//     user.token = token;

//     // return new user
//     res.status(201).json(user);
//   } catch (err) {
//     console.log(err);
//     res.status(400).json(err);
//   }
// });

// app.post("/login", async (req, res) => {
//   try {
//     // Get user input
//     const { email, password } = req.body;

//     // Validate user input
//     if (!(email && password)) {
//       res.status(400).send("All input is required");
//     }
//     // Validate if user exist in our database
//     const user = await User.findOne({ email });

//     if (user && (await bcrypt.compare(password, user.password))) {
//       // Create token
//       const token = jwt.sign(
//         { user_id: user._id, email },
//         process.env.TOKEN_KEY,
//         {
//           expiresIn: "5h",
//         }
//       );

//       // save user token
//       user.token = token;

//       // user
//       return res.status(200).json(user);
//     }
//     return res.status(400).send("Invalid Credentials");
//   } catch (err) {
//     console.log(err);
//   }
// });

// app.get("/welcome", auth, (req, res) => {
//   res.status(200).send("Welcome to FreeCodeCamp 🙌");
// });

// // This should be the last route else any after it won't work
// app.use("*", (req, res) => {
//   res.status(404).json({
//     success: "false",
//     message: "Page not found",
//     error: {
//       statusCode: 404,
//       message: "You reached a route that is not defined on this server",
//     },
//   });
// });

// module.exports = app;



const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
require("./src/config/dbconfig").connect();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const auth = require("./src/config/middleware/auth");

mongoose.connect(
    "mongodb://127.0.1 .1:27017/todo-list",
  {
    useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
  }
);
mongoose.Promise = global.Promise;

const User = require("./src/model/user");

const routesDefined = require("./src/routes")

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   if (req.method === "OPTIONS") {
//     res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
//     return res.status(200).json({});
//   }
//   next();
// });

app.use("/api", routesDefined);
app.post("/", (req, res) => {
    res.json({abc:"abc"})
});


app.post("/register", async (req, res) => {
  try {
    // Get user input
    const { firstName, lastName, email, password } = req.body;
    // Validate user input
    if (!(email && password && firstName && lastName)) {
      res.status(400).send("All input is required");
    }
    console.log(req.body)

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });
    console.log(req.body, oldUser, 'here')

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    encryptedUserPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      first_name: firstName,
      last_name: lastName,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedUserPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "5h",
      }
    );
    // save user token
    user.token = token;

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});


app.post("/login", async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "5h",
        }
      );

      // save user token
      user.token = token;

      // user
      return res.status(200).json(user);
    }
    return res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
});

app.get("/welcome", (req, res) => {
      res.status(200).send("Welcome to FreeCodeCamp 🙌");
    });
    
// This should be the last route else any after it won't work
app.use("*", (req, res) => {
    res.status(404).json({
    success: "false",
    message: "Page not found",
    error: {
        statusCode: 404,
        message: "You reached a route that is not defined on this server",
    },
    });
});
    

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;