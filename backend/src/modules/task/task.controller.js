const prisma = require("../../config/prisma-client");

const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await prisma.task.findMany({
      where: { is_deleted: false },
    });

    return res.status(200).json(tasks);
  } catch (error) {
    console.error("Error in getAllTasks:", error);
    // 2. Pass the error to the Express error handler middleware
    next(error);
  }
};

const getTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await prisma.task.findUnique({
      where: { task_id: +id, is_deleted: false },
    });

    if (!task) {
      throw new Error(`Task not found with ${id}`);
    }

    return res.status(200).json(task);
  } catch (error) {
    console.error("Error in getTask:", error);
    next(error);
  }
};

const createTask = async (req, res, next) => {
  try {
    const task = req.body;
    const user = await req.user;

    console.log("USERRRRR", user);
    console.log(user.user_id);

    const createTask = await prisma.task.create({
      data: { ...task, created_by: user.user_id, user_id: user.user_id },
    });
    // console.log(createTask);

    return res.status(201).json({ message: `Task created sucessfully` });
  } catch (error) {
    console.error("Error in createTask:", error);
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const taskFound = await prisma.task.findUnique({
      where: { task_id: +id, is_deleted: false },
    });

    if (!taskFound) {
      throw new Error(`Task not found with ${id}`);
    }

    const task = req.body;

    const updatingTask = {
      ...task,
      updated_by: +id,
      updated_at: new Date(),
    };

    const updateTask = await prisma.task.update({
      where: {
        task_id: +id,
      },
      data: updatingTask,
    });

    // console.log(updateTask);

    return res.status(200).json({ message: `Task updated sucessfully` });
  } catch (error) {
    console.error("Error in updateTask:", error);
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const taskFound = await prisma.task.findUnique({
      where: { task_id: +id, is_deleted: false },
    });

    if (!taskFound) {
      throw new Error(`Task not found with ${id}`);
    }

    const deleteTask = await prisma.task.delete({
      where: {
        task_id: +id,
      },
    });
    console.log(deleteTask);

    return res.status(200).json({ message: `Task deleted sucessfully` });
  } catch (error) {
    console.error("Error in deleteTask:", error);
    next(error);
  }
};

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
