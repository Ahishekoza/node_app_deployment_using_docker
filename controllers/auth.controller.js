import { UserSchema } from "../models/userSchema.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
  const { email, password } = req.body;
  let hashpassword;
  if (password) hashpassword = await bcrypt.hash(password, 12);
  try {
    const registeredUser = await UserSchema.create({
      email: email,
      password: hashpassword,
    });

    return res.status(200).json({
      success: true,
      User: registeredUser,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      error: error.message,
    });
  }
};

export const login = async(req, res) => {
  const { email, password } = req.body;
  try {
    // --- find methods return value is array  and findOne methods return values is an object
    const user = await UserSchema.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    
    const isCorrect = await bcrypt.compare(password, user.password);

    if (isCorrect) {
      req.session.user = user
      res.status(200).json({
        status: "success",
      });
    } else {
      res.status(400).json({
        status: "fail",
        message: "incorrect username or password",
      });
    }
  } catch (error) {
    return res.status(404).json({
      success: false,
      error: error.message,
    });
  }
};
