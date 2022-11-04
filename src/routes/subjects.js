const express = require("express");
const router = express.Router();


const subjectController = require("../app/controllers/SubjectController");
const {
    checkRequireAdmin,
} = require("../app/middlewares/AuthMiddleware");


router.get("/list",checkRequireAdmin, subjectController.listSubject);
router.post("/:gradeId/theory", checkRequireAdmin, subjectController.createSubjectTheory);
router.get("/:gradeId/theory",checkRequireAdmin, subjectController.createSubjectTheory);
router.post("/:gradeId/bible", checkRequireAdmin, subjectController.createSubjectBible);
router.get("/:gradeId/bible",checkRequireAdmin, subjectController.createSubjectBible);

module.exports = router;
