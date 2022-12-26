const todoModel = require("../model/todo.model");

// const router = require("express").Router();
// let Video = require("../models/video.model");

module.exports = {

    getAll: async (request, reply) => {
        try{
            // const allTodos = await todoModel.find({},{"__v": 0, "deleted": 0, "createdAt": 0, "updatedAt": 0});
            let allTodos = await todoModel.find({},{description: 1, _id: 0});
           
            reply.json({
                status: 200,
                data: allTodos
            })
        }catch(e){
            reply.json({
                status: 400,
                error: e
            })
        }
    },
    create: async (request, reply) => {
        try{
            let requestData = request.body;

            const newtodo = await todoModel.create({
            "title": requestData.title,
            "description": requestData.description,
            "date_time": requestData.date_time,
            "others": requestData.others
            });

            // 
            // delete newtodo['_id']
            // delete newtodo['updatedAt']
            // delete newtodo['__v']
            // console.log(newtodo)
            reply.json({
                status: 200,
                data: newtodo
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