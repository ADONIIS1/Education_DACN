const express = require("express");
const router = express.Router();

const learningController = require("../app/controllers/LearningController");

router.get("/result", learningController.learningResult);
router.get("/", learningController.learning);

module.exports = router;
