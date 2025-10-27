const { Router } = require("express");
const asyncHandler = require("../../middleware/asyncHandler");
const {
  getAllUsers,
  getUser,
  // createUser,
  updateUser,
  deleteUser,
  uploadProfilePicture,
} = require("./user.controller");
const verifyToken = require("../../middleware/auth");

const router = Router();

router.get("/", verifyToken, asyncHandler(getAllUsers));
router.post("/upload-profile", asyncHandler(uploadProfilePicture));
router.get("/:id", verifyToken, asyncHandler(getUser));
// router.post("/", asyncHandler(createUser));
router.put("/:id", verifyToken, asyncHandler(updateUser));
router.delete("/:id", verifyToken, asyncHandler(deleteUser));

module.exports = router;
