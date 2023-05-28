// `/api/tasks` router buraya
const router = require("express").Router();
const taskModel = require("./model");
const mw = require("./middleware");

router.get("/", async (req, res, next) => {
  try {
    const allTasks = await taskModel.getAll();
    res.json(allTasks);
  } catch (error) {
    next(error);
  }
});
router.post("/", mw.checkPayload, mw.checkProjectId, async (req, res, next) => {
  try {
    let insertTaskModel = {
      project_id: req.body.project_id,
      task_description: req.body.task_description,
      task_notes: req.body.task_notes,
      task_completed: req.body.task_completed,
    };
    const inserted = await taskModel.create(insertTaskModel);
    res.status(201).json(inserted);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
