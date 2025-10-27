const createOrUpdateUserWorkdetail = async (tx, userId, workdetailArray) => {
  if (!workdetailArray || !workdetailArray.length) return;

  // Fetch existing work detail records
  const existingWorkdetail = await tx.user_work_detail.findMany({
    where: { user_id: userId },
  });

  const existingIds = existingWorkdetail.map((e) => e.user_work_detail_id);
  const requestIds = workdetailArray.filter((e) => e.id).map((e) => e.id);

  // Delete removed work detail
  const toDeleteIds = existingIds.filter((id) => !requestIds.includes(id));
  if (toDeleteIds.length) {
    await tx.user_work_detail.deleteMany({
      where: { user_work_detail_id: { in: toDeleteIds } },
    });
  }

  // Update or create
  for (const workdetail of workdetailArray) {
    if (workdetail.id) {
      // Update existing
      await tx.user_work_detail.update({
        where: { user_work_detail_id: workdetail.id },
        data: { ...workdetail, updated_at: new Date(), updated_by: userId },
      });
    } else {
      // Create new
      await tx.user_work_detail.create({
        data: { ...workdetail, user_id: userId, created_by: userId },
      });
    }
  }
};

module.exports = { createOrUpdateUserWorkdetail };
