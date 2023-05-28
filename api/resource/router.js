// `/api/resources` router buraya
const router = require("express").Router();
const resourceModel = require("./model");

router.get("/", async (req, res, next) => {
  try {
    const allResources = await resourceModel.getAll();
    res.json(allResources);
  } catch (error) {
    next(error);
  }
});
router.post("/", async (req, res, next) => {
  try {
    const { resource_name } = req.body;
    if (!resource_name) {
      res.status(400).json({ message: "alan eksik" });
    } else {
      let resource_model = {
        resource_name: req.body.resource_name,
        resource_description: req.body.resource_description,
      };
      const inserted = await resourceModel.create(resource_model);
      res.status(201).json(inserted);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
