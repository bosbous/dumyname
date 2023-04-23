//create user
import User from "../models/User.js";
import Task from "../models/Task.js";

import bcrypt from "bcrypt";

export async function createUser(req, res) {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({ message: "Post HTTP data not provided" });
  }
  let { name, password, email } = req.body;
  console.log(name);

  try {
    const existingUser = await User.findOne({ name });
    if (existingUser) {
      return res.status(409).send({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await new User({
      name,
      email,
      password: hashedPassword,
      date: new Date(),
    });

    await user.save();
    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error creating user" });
  }
}

export async function login(req, res) {
  const { name, password } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({ name });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).send({ message: "Invalid password" });
    }
    return res.status(201).send({ message: "logid in" });

    // if(isPasswordCorrect){

    //   const accessToken = jwt.sign(
    //     { "username": foundUser.username },
    //     process.env.ACCESS_TOKEN_SECRET,
    //     { expiresIn: '30s' }
    // );
    // const refreshToken = jwt.sign(
    //     { "username": foundUser.username },
    //     process.env.REFRESH_TOKEN_SECRET,
    //     { expiresIn: '1d' }
    // );

    // }
    // const tasks = await Task.find({ _id: user._id });

    // If there are no tasks, send a message indicating that there are no tasks
    // if (tasks.length === 0) {
    //   return res.send({ message: "No tasks found" });
    // }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error retrieving user" });
  }
}
