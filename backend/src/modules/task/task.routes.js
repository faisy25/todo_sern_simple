const { Router } = require("express");
const asyncHandler = require("../../middleware/asyncHandler");
const {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require("./task.controller");
// const verifyToken = require("../../middleware/auth");

const router = Router();

router.get("/", asyncHandler(getAllTasks));
router.get("/:id", asyncHandler(getTask));
router.post("/", asyncHandler(createTask));
router.put("/:id", asyncHandler(updateTask));
router.delete("/:id", asyncHandler(deleteTask));

module.exports = router;
