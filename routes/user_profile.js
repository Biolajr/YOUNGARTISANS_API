const express =  require('express');
const userProfile = require('../controllers/user-profile/getUserProfile');
const singleUserProfile = require('../controllers/user-profile/singleUserProfile');
const editUserProfile = require('../controllers/user-profile/editUserProfile');
const uploadProfilePicture = require('../controllers/user-profile/updateProfilePicture');
const {
  admin,
  superadmin,
  verifyToken
} = require("../middleware/authJwt");


const router = express.Router();

router.get('/view-profile', verifyToken, userProfile);
router.get('/profile', verifyToken, singleUserProfile);
router.patch('/edit-profile', verifyToken, editUserProfile);
router.patch('/upload-profile-picture', verifyToken, uploadProfilePicture )


module.exports = router;