const express = require("express");
const zod = require("zod");
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const signupBody = zod.object({
  username: zod.string().email(),
  firstname: zod.string(),
  lastname: zod.string(),
  password: zod.string(),
});

const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

const route = express.Router();

route.post("/signup", async (req, res) => {
  const { success } = signupBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Email already taken / Incorrect Inputs",
    });
  }

  const existingUser = await User.findOne({
    username: req.body.username,
  });
  if (existingUser) {
    return req.status(411).json({
      message: "Email already taken / Incorrect Inputs",
    });
  }

  const user = await User.create({
    username: request.body.username,
    password: request.body.password,
    firstname: request.body.firstname,
    lastname: req.body.lastname,
  });

  const userid = user._id;

  const token = jwt.sign(
    {
      userid,
    },
    JWT_SECRET
  );

  req.json({
    message: "User created successfully",
    token: token,
  });
});

route.post("/signin", async (req,res)=>{
    const {success} = signinBody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    })

    if(user){
        const token = jwt.sign({
            userid: user._id
        }, JWT_SECRET)

        res.json({
            token : token
        })
        return
    }

    res.status(411).json({
        message:"Error while logging in"
    })
})

module.exports = route;
