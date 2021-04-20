import express from "express";
import expressAsyncHandler from "express-async-handler";
import userPost from "../models/post.js";
import marketPlace from "../models/marketPlace.js";
import profile from "../models/profile.js";
import User from "../models/userModels.js";
import mongoose from "mongoose";

const userRouter = express.Router();

userRouter.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
    console.log("hello");
    const createdUser = await user.save();
    res.send({
      _id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
      friends: createdUser.friends
    });
  })
);

userRouter.post(
  "/login",
  expressAsyncHandler(async (req, res) => {
    console.log(req.body);
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      res.send({
        _id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        friends: user.friends
      });
      return;
    }
    res.status(401).send({ message: "Invalid email or password" });
  })
);

userRouter.post(
  "/getprofile",
  expressAsyncHandler(async (req, res) => {
    console.log(req.body);
    const user = await profile.findOne({ email: req.body.email });
    if (user) {
      res.send({
        _id: user.id,
        fname: user.fname,
        lname: user.lname,
        mnumber: user.mnumber,
        email: user.email,
        address: user.address
      });
      return;
    }
    res.status(401).send({ message: "Invalid email or password" });
  })
);
// userRouter.post(
//   "/friendrequest",
//   expressAsyncHandler(async (req, res) => {
//     console.log(req.body);
//     console.log("iiiiiiiiiiiiiiiiiiiiiii");
//     const user = await userPost.update(
//       { _id: mongoose.Types.ObjectId(req.body.userId) },
//       { $push: { friends: req.body.email } }
//     );

//     if (user) {
//       res.send({
//         _id: user.id,
//         name: user.name,
//         email: user.email,
//         password: user.password
//       });
//       return;
//     }
//     res.status(401).send({ message: "Invalid email or password" });
//   })
// );

userRouter.post(
  "/friendrequest",
  expressAsyncHandler(async (req, res) => {
    console.log(req.body);
    console.log("iiiiiiiiiiiiiiiiiiiiiii");
    const user = await User.update(
      { _id: mongoose.Types.ObjectId(req.body.id) },
      { $push: { friends: req.body.email } }
    );
    const user1 = await User.update(
      { _id: mongoose.Types.ObjectId(req.body.userId) },
      { $push: { friends: req.body.userEmail } }
    );
    if (user) {
      res.send({
        _id: user.id,
        name: user.name,
        email: user.email,
        password: user.password
      });
      return;
    }
    res.status(401).send({ message: "Invalid email or password" });
  })
);

userRouter.get(
  "/allposts",
  expressAsyncHandler(async (req, res) => {
    console.log("hellooooooo");
    const posts11 = await userPost.find({});
    console.log(posts11);
    if (posts11) {
      res.send(posts11);
      return;
    }
    res.status(401).send({ message: "can not fetch posts" });
  })
);
userRouter.get(
  "/allusers",
  expressAsyncHandler(async (req, res) => {
    console.log("hellooooooo");
    const allusers = await User.find({});
    console.log(allusers);
    if (allusers) {
      res.send(allusers);
      return;
    }
    res.status(401).send({ message: "can not fetch posts" });
  })
);
userRouter.get(
  "/marketplacedata",
  expressAsyncHandler(async (req, res) => {
    console.log("hellooooooo");
    const marketPlace1 = await marketPlace.find({});
    console.log(marketPlace1);
    if (marketPlace1) {
      res.send(marketPlace1);
      return;
    }
    res.status(401).send({ message: "can not fetch marketPlace data" });
  })
);

userRouter.post(
  "/userpost",
  expressAsyncHandler(async (req, res) => {
    console.log(req.body);
    const userPost1 = new userPost({
      name: req.body.name,
      email: req.body.email,
      post: req.body.post,
      imageUrl: req.body.imageUrl
    });

    console.log("hello");
    const postData = await userPost1.save();
    console.log(postData);
    res.send({
      _id: postData.id,
      name: postData.name
    });
  })
);

userRouter.post(
  "/marketplace",
  expressAsyncHandler(async (req, res) => {
    console.log(req.body);
    const marketPlace1 = new marketPlace({
      itemName: req.body.itemName,
      price: req.body.price,
      imageUrl: req.body.imageUrl
    });

    console.log("hello");
    const postData = await marketPlace1.save();
    console.log(postData);
    res.send({
      _id: postData.id,
      name: postData.name
    });
  })
);

userRouter.post(
  "/profile",
  expressAsyncHandler(async (req, res) => {
    const userProfile = new profile({
      fname: req.body.fname,
      lname: req.body.lname,
      mnumber: req.body.mnumber,
      email: req.body.email,
      address: req.body.address
    });
    console.log("profile");
    const createdProfile = await userProfile.save();
    res.send({
      name: createdProfile.name
    });
  })
);

userRouter.put(
  "/profile",
  expressAsyncHandler(async (req, res) => {
    console.log("profile");
    const createdProfile = await profile.update(
      { email: req.body.email },
      {
        $set: {
          fname: req.body.fname,
          lname: req.body.lname,
          mnumber: req.body.mnumber,
          email: req.body.email,
          address: req.body.address
        }
      }
    );
    res.send({
      name: createdProfile.name
    });
  })
);

export default userRouter;
