const prisma = require("../../config/prisma-client");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../../util/jwt");
const { hashPassword, comparePassword } = require("../../util/password");

const registerUser = async (req, res, next) => {
  try {
    const { name, username, password, confirm_password } = req.body;

    // Check username
    const findUser = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    if (findUser) {
      throw new Error(`Username already exists.`);
    }

    // Check both password and confirm_password are same.
    if (password !== confirm_password) {
      throw new Error(`Password does not match`);
    }

    // Hashed the password while storing in database.
    const hashedPassword = await hashPassword(password);

    const registerUser = await prisma.user.create({
      data: { name, username, password: hashedPassword },
    });
    console.log(registerUser);

    return res.status(201).json({ message: `User registered sucessfully` });
  } catch (error) {
    console.error("Error in registerUser:", error);
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Check username if already exits
    const findUser = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    if (!findUser) {
      throw new Error(`Username does not exists.`);
    }

    // compare the hash password with plain password
    const isPasswordValid = await comparePassword(password, findUser.password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    const payload = { user_id: findUser.user_id, username };
    // Generate tokens access and refresh
    const accessToken = await generateAccessToken(payload);
    const refreshToken = await generateRefreshToken(payload);

    return res.status(201).json({
      message: `User logged in sucessfully`,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (error) {
    console.error("Error in loginUser:", error);
    next(error);
  }
};

const logoutUser = (req, res, next) => {
  try {
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error in logoutUser:", error);
    next(error);
  }
};

const refreshAccessToken = async (req, res, next) => {
  try {
    const refreshToken = req.body;
    if (!refreshToken) throw new Error(`No refresh token provided.`);

    // verify refresh token.
    const decoded = await verifyRefreshToken(refreshToken);

    // generate new access token
    const payload = { user_id: decoded.user_id, username: decoded.username };
    const newAccessToken = await generateAccessToken(payload);

    return res.status(200).json({
      message: "Access token refreshed successfully",
      accessToken: newAccessToken,
    });
  } catch (error) {
    console.error("Error in refreshAccessToken:", error);
    next(error);
  }
};

module.exports = { registerUser, loginUser, logoutUser, refreshAccessToken };
