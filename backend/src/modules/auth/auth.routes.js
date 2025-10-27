const { Router } = require("express");
const asyncHandler = require("../../middleware/asyncHandler");
const {
  loginUser,
  registerUser,
  refreshAccessToken,
  logoutUser,
} = require("./auth.controller");

const router = Router();

router.post("/register", asyncHandler(registerUser));
router.post("/login", asyncHandler(loginUser));
router.post("/refresh", asyncHandler(refreshAccessToken));
router.post("/logout", asyncHandler(logoutUser));

module.exports = router;
