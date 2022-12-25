const todoModel = require("../model/todo.model");

// const router = require("express").Router();
// let Video = require("../models/video.model");

module.exports = {
    // getAll: async (request, reply) => {
    //     try{
    //         let 
    //     }catch(e){

    //     }
    // },

    create: async (request, reply) => {
        try{
            let requestData = request.body;
            reply.json({
                status: 200,
                data: requestData
            })
        }catch(e){
            reply.json({
                status: 404,
                error: e
            })
        }
    }
}


// router.route("/list/all/lang").get((req, res) => {
//   Video.find()
//     .select("thumbnail name videourl status videoDescription language imageurl")
//     .exec()
//     .then((docs) => {
//       const response = {
//         count: docs.length,
//         Videos: docs.map((doc) => {
//           return {
//             _id: doc._id,
//             imageurl: doc.imageurl,
//             name: doc.name,
//             videourl: doc.videourl,
//             status: doc.status,
//             videoDescription: doc.videoDescription,
//             language: doc.language,
//           };
//         }),
//       };
//       res.status(200).json(response);
//     })
//     .catch((err) => res.status(400).json("Error: " + err));
// });