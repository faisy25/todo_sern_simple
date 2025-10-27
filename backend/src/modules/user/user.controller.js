const prisma = require("../../config/prisma-client");
const { uploadSingle } = require("../../util/fileUpload");

const {
  createOrUpdateUserEducation,
} = require("./user_education/user_education.controller");
const { createOrUpdateUserInfo } = require("./user_info/user_info.controller");
const {
  createOrUpdateUserWorkdetail,
} = require("./user_work_detail/user_work_detail.controller");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      where: { is_deleted: false },
    });

    return res.status(200).json(users);
  } catch (error) {
    console.error("Error in getAllUsers:", error);
    // 2. Pass the error to the Express error handler middleware
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { user_id: +id, is_deleted: false },
    });

    if (!user) {
      throw new Error(`User not found with ${id}`);
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error in getUser:", error);
    next(error);
  }
};

// const createUser = async (req, res, next) => {
//   try {
//     const user = req.body;
//     const createUser = await prisma.user.create({ data: user });
//     // console.log(createUser);

//     return res.status(201).json({ message: `User created sucessfully` });
//   } catch (error) {
//     console.error("Error in createUser:", error);
//     next(error);
//   }
// };

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userFound = await prisma.user.findUnique({
      where: { user_id: +id, is_deleted: false },
    });

    if (!userFound) {
      throw new Error(`User not found with ${id}`);
    }

    const { name, user_education, user_work_detail, user_info } = req.body;

    await prisma.$transaction(async (tx) => {
      // updating the normal user table
      if (name) {
        const updatingUser = {
          name: name,
          updated_by: +id,
          updated_at: new Date(),
        };

        const updateUser = await tx.user.update({
          where: {
            user_id: +id,
          },
          data: updatingUser,
        });
        // console.log(updateUser);
      }

      // for userInfo
      await createOrUpdateUserInfo(tx, +id, user_info);

      // for userEducation
      await createOrUpdateUserEducation(tx, +id, user_education);

      // for userWorkdetail
      await createOrUpdateUserWorkdetail(tx, +id, user_work_detail);
    });

    return res.status(200).json({ message: `User updated sucessfully` });
  } catch (error) {
    console.error("Error in updateUser:", error);
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = +id;

    // 1️⃣ Check if user exists
    const userFound = await prisma.user.findUnique({
      where: { user_id: userId },
    });

    if (!userFound) {
      throw new Error(`User not found with ID ${userId}`);
    }

    // 2️⃣ Perform all deletions inside a transaction
    await prisma.$transaction(async (tx) => {
      // Step 1: Delete all attachments linked to user's education
      await tx.user_education_attachment.deleteMany({
        where: {
          user_education: { user_id: userId },
        },
      });

      // Step 2: Delete all education records
      await tx.user_education.deleteMany({
        where: { user_id: userId },
      });

      // Step 3: Delete all work details
      await tx.user_work_detail.deleteMany({
        where: { user_id: userId },
      });

      // Step 4: Delete user_info (profile)
      await tx.user_info.deleteMany({
        where: { user_id: userId },
      });

      // Step 5: Finally delete the user
      await tx.user.delete({
        where: { user_id: userId },
      });
    });

    return res.status(200).json({
      message: `User and all related data deleted successfully`,
    });
  } catch (error) {
    console.error("Error in deleteUser:", error);
    next(error);
  }
};

// In your route
const uploadProfilePicture = (req, res, next) => {
  try {
    const upload = uploadSingle("profile");
    upload(req, res, function (err) {
      if (err) return res.status(400).json({ error: err.message });
      return res.status(200).json({ fileUrl: `/uploads/${req.file.filename}` });
    });
  } catch (error) {
    console.error("Error in uploadProfilePicture:", error);
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getUser,
  // createUser,
  updateUser,
  deleteUser,
  uploadProfilePicture,
};
