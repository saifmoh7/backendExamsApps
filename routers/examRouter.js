const express = require("express")
const expressAsyncHandler = require("express-async-handler");
const Exam = require("../mudels/examModel");

const examRouter = express.Router();

examRouter.post('/addexam', expressAsyncHandler(async (req, res) => {
    const exam = Exam({
        examApp: req.body.examApp,
        examTitle: req.body.examTitle,
        examImageUrl: req.body.examImageUrl,
        examDes: req.body.examDes,
    });
    const createdExam = await exam.save();
    if (createdExam) {
        res.json({status:200,
            examId: createdExam._id,
            examApp: createdExam.examApp,
            examTitle: createdExam.examTitle,
            examImageUrl: createdExam.examImageUrl,
            examDes: createdExam.examDes,
            noQues: createdExam.noQues
        })
    } else {res.json({status: 403})}
}))

examRouter.get('/showexams', expressAsyncHandler(async (req, res) => {
    try {
        const exams = await Exam.find({})
        if (Array.isArray(exams) && exams.every(exam=>typeof exam==='object')) {
            res.json({status:200, "exams": exams.map((exam) => ({"_id": exam._id, "examApp": exam.examApp, "examTitle": exam.examTitle, "examImageUrl": exam.examImageUrl, "examDes": exam.examDes, 'noQues': exam.questions.length}))})
        }else {res.json({ status:403 })}
    } catch (error) {
        res.json({status:403, error})
    }
}))

examRouter.post('/deleteexam', expressAsyncHandler(async (req, res) => {
    try {
        const deleteExam = await Exam.findOne({_id: req.body.examId}).remove()
        if (deleteExam) {
            res.json({ status:200, message: "exam is deleted" })
        } else {res.json({ status:403 })}
    } catch (error) {
        res.json({status:403, error})
    }
}))

module.exports = examRouter;