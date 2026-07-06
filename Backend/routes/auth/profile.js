import express from "express";

import {
 getProfile,
 updateProfile,
 changePassword,
 uploadProfilePicture
} from "../../controllers/profileController.js";


import {
  updateProfileValidation,
  changePasswordValidation,
} from "../../validators/profileValidator.js";


import {
  validate,
} from "../../middlewares/validate.js";

import upload from "../../middlewares/upload.js";


const router = express.Router();


router.get(
  "/me",
  getProfile
);


router.put(
  "/me",
  updateProfileValidation,
  validate,
  updateProfile
);

router.put(
  "/change-password",
  changePasswordValidation,
  validate,
  changePassword
);

router.put(
"/profile-picture",

upload.single(
"profilePicture"
),

uploadProfilePicture

);

export default router;