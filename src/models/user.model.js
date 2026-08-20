import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avtar: {
      type: String, // cloudnary URL store
      required: true,
    },
    coverImage: {
      type: String,
    },
    watchHistory: [
      {
        type: Schema.type.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true },
);

// mongoose na doc ma rahel pre middlwere no use karish je password save thay te pela tene conver karje bcrypt ma

userSchema.pre("save", function async(next) {
  // jyare this.password no hoy tyarej thavu joye to if conditon and ismodify function

  if (!this.isModified("password")) return next();
  this.password = bcrypt.hash(this.password, 10);
  next();
});
// password compare karva mate aayaj logic lakhishu

userSchema.methods.isPasswordCorrect = async function () {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
    },
  );
};
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRE,
    },
  );
};

export const User = mongoose.model("User", userSchema);
