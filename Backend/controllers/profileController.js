import User from "../models/user.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import cloudinary from "../config/cloudinary.js";


export const getProfile = asyncHandler(
  async (req, res) => {

    const user = await User.findById(
      req.user._id
    ).select("-password -__v");


    if (!user) {
      const error =
        new Error("User not found");

      error.statusCode = 404;

      throw error;
    }


    res.status(200).json({
      success: true,
      data: user,
    });
  }
);



export const updateProfile = asyncHandler(
  async (req, res) => {

    const {
      name,
      email,
    } = req.body;


    const user =
      await User.findById(
        req.user._id
      );


    if (!user) {
      const error =
        new Error("User not found");

      error.statusCode = 404;

      throw error;
    }


    if (
      email &&
      email !== user.email
    ) {

      const existingUser =
        await User.findOne({
          email,
        });


      if (existingUser) {

        const error =
          new Error(
            "Email already registered"
          );

        error.statusCode = 409;

        throw error;
      }


      user.email = email;
    }


    if (name) {
      user.name = name;
    }


    const updatedUser =
      await user.save();


    res.status(200).json({
      success: true,

      data: {
        _id: updatedUser._id,

        name:
          updatedUser.name,

        email:
          updatedUser.email,

        profilePicture:
          updatedUser.profilePicture,
      },
    });
  }
);

export const changePassword = asyncHandler(
  async (req, res) => {

    const {
      currentPassword,
      newPassword,
    } = req.body;


    const user =
      await User.findById(
        req.user._id
      );


    if (!user) {
      const error =
        new Error(
          "User not found"
        );

      error.statusCode = 404;

      throw error;
    }


    const isMatch =
      await bcrypt.compare(
        currentPassword,
        user.password
      );


    if (!isMatch) {
      const error =
        new Error(
          "Current password is incorrect"
        );

      error.statusCode = 401;

      throw error;
    }


    user.password =
      newPassword;


    await user.save();


    res.status(200).json({
      success: true,

      data: {
        message:
          "Password changed successfully",
      },
    });
  }
);


export const uploadProfilePicture =
asyncHandler(
async(req,res)=>{


const user =
await User.findById(
    req.user._id
);


if(!user){

const error =
new Error(
"User not found"
);

error.statusCode=404;

throw error;

}



const uploadResult =
await new Promise(
(resolve,reject)=>{


const stream =
cloudinary
.uploader
.upload_stream(

{
folder:"notekove/profile",
},

(error,result)=>{

if(error)
reject(error);

else
resolve(result);

}

);


stream.end(
req.file.buffer
);


});



user.profilePicture =
uploadResult.secure_url;


await user.save();



res.status(200).json({

success:true,

data:{
profilePicture:
user.profilePicture
}

});


});