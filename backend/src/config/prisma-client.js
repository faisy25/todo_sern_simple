// const { PrismaClient } = require("@prisma/client");

// Update the path based on the generation output location
const { PrismaClient } = require("../../prisma/generated/prisma");
const prisma = new PrismaClient();

module.exports = prisma;
