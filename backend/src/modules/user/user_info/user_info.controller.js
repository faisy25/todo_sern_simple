const createOrUpdateUserInfo = async (tx, userId, userInfo) => {
  if (!userInfo) return null;

  const existingInfo = await tx.user_info.findUnique({
    where: { user_id: userId },
  });

  if (existingInfo) {
    // Update existing
    const updatedUserInfo = tx.user_info.update({
      where: { user_id: userId },
      data: { ...userInfo, updated_at: new Date(), updated_by: userId },
    });
    return updatedUserInfo;
  } else {
    // Create new
    const createdUserInfo = tx.user_info.create({
      data: { ...userInfo, user_id: userId, created_by: userId },
    });
    return createdUserInfo;
  }
};

module.exports = { createOrUpdateUserInfo };
