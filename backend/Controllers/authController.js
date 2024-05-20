import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// const generateToken = user => {
//     return jwt.sign({id:user._id, role:user.role, process.env.JWT_SECRET_key})
// }

export const register = async (req, res) => {
  const { email, password, name, role, photo, gender } = req.body;
  try {
    let user = null;
    if (
      !name ||
      !email ||
      !password ||
      !role ||
      name === "" ||
      email === "" ||
      password === ""
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (role === "patient") {
      user = await User.findOne({ email });
    } else if (role === "doctor") {
      user = await Doctor.findOne({ email });
    }
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);

    if (role === "patient") {
      user = new User({
        name,
        email,
        password: hashPass,
        photo,
        gender,
        role,
      });
    }
    if (role === "doctor") {
      user = new Doctor({
        name,
        email,
        password: hashPass,
        photo,
        gender,
        role,
      });
    }

    await user.save();

    res
      .status(200)
      .json({ success: true, message: "User successfullt created." });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error, Try again!" });
  }
};
export const login = async (req, res) => {
    const {email,password} = req.body;

  try {
    let user = null;
    const patient = await User.findOne({email});
    const doctor = await Doctor.findOne({email});

    if(patient){
        user = patient;
    }
    if(doctor){
        user = doctor;
    }
    if (!user) {
        return res.status(404).json({ message: "Invalid credentials" });
    }
    const isPasswordMatch = bcrypt.compare(password, user.password);

    if(!isPasswordMatch){
        return res.status(400).json({ message: "Invalid User credentials" });
    }
  } catch (error) {}
};
