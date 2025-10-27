const createOrUpdateUserEducation = async (tx, userId, educationArray) => {
  if (!educationArray || !educationArray.length) return;

  // Fetch existing education records
  const existingEdu = await tx.user_education.findMany({
    where: { user_id: userId },
  });

  const existingIds = existingEdu.map((e) => e.user_education_id);
  const requestIds = educationArray.filter((e) => e.id).map((e) => e.id);

  // Delete removed education
  const toDeleteIds = existingIds.filter((id) => !requestIds.includes(id));
  if (toDeleteIds.length) {
    await tx.user_education.deleteMany({
      where: { user_education_id: { in: toDeleteIds } },
    });
  }

  // Update or create
  for (const edu of educationArray) {
    if (edu.id) {
      // Update existing
      await tx.user_education.update({
        where: { user_education_id: edu.id },
        data: { ...edu, updated_at: new Date(), updated_by: userId },
      });
    } else {
      // Create new
      await tx.user_education.create({
        data: { ...edu, user_id: userId, created_by: userId },
      });
    }
  }
};

module.exports = { createOrUpdateUserEducation };
