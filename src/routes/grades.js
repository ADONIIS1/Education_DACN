const express = require("express");
const router = express.Router();


const gradeController = require("../app/controllers/GradeController");

const {
    checkRequireAdmin,
} = require("../app/middlewares/AuthMiddleware");

router.get("/list",checkRequireAdmin , gradeController.listGrade);
router.post("/list",checkRequireAdmin , gradeController.createGrade);
router.put('/:id',checkRequireAdmin , gradeController.update); 
router.delete('/:id',checkRequireAdmin , gradeController.delete);


module.exports = router;
