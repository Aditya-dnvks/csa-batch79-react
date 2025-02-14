const userModel = require("../model/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//crytpo repl
//uuid
//random passowrd genretor

const loginUser = async (req, res) => {
  const data = req.body;

  const existingUser = await userModel.findOne({ email: data.email });

  if (!existingUser) {
    return res.status(403).send("User Doesn't exist");
  }

  const compare = await bcrypt.compare(data.password, existingUser.password);

  if (!compare) {
    return res.status(403).send("Wrong password");
  }

  const jwtToken = jwt.sign(data, process.env.JWT_SECRET_KEY);

  res.status(200).send({ jwtToken: jwtToken }); //jwt
};

const registerUser = async (req, res) => {
  //auth/register  ---> Post
  const data = req.body;

  const existingUser = await userModel.findOne({ email: data.email });

  if (existingUser) {
    return res.status(403).send("User Already exist");
  }

  //hash the password
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const createUser = await userModel.create({
    ...data,
    password: hashedPassword,
  });

  res.send(createUser);
};

module.exports = { loginUser, registerUser };
