const { Router } = require("express");
const taskRoutes = require("./task/task.routes");
const userRoutes = require("./user/user.routes");
const authRoutes = require("./auth/auth.routes");

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/tasks", taskRoutes);

module.exports = router;
