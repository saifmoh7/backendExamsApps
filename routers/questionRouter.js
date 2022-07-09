const express = require("express")
const expressAsyncHandler = require("express-async-handler");
const Exam = require("../mudels/examModel");
const questionSchema = require("../mudels/questionModel");

const questionRouter = express.Router();

questionRouter.post('/addquestion', expressAsyncHandler(async (req, res) => {
    const exam = await Exam.findOne({examId: req.body.examId})
    const question = {
        question : req.body.question
    }
    exam.questions.push(question)
    const createdExam = await exam.save();
    res.json({createdExam})
    console.log(createdExam)
    
    // const question = Question({
    //     examId: req.body.examId,
    //     question: req.body.question,
    //     questionImage: req.body.questionImage,
    //     fourChoice: req.body.fourChoice,
    //     correctAnswer: req.body.correctAnswer,
    //     option_1: req.body.option_1,
    //     option_2: req.body.option_2,
    //     option_3: req.body.option_3,
    //     option_4: req.body.option_4
    // })
    // const createdQuestion = await question.save();
    // if (createdQuestion) {
    //     res.json({status:200,
    //         question: createdQuestion.question
    //     })
    // }else {res.json({status: 403})}
}))


// examRouter.post('/addexam', expressAsyncHandler(async (req, res) => {
//     const exam = Exam({
//         examApp: req.body.examApp,
//         examTitle: req.body.examTitle,
//         examImageUrl: req.body.examImageUrl,
//         examDes: req.body.examDes,
//     });
//     const createdExam = await exam.save();
//     if (createdExam) {
//         res.json({status:200,
//             examId: createdExam._id,
//             examApp: createdExam.examApp,
//             examTitle: createdExam.examTitle,
//             examImageUrl: createdExam.examImageUrl,
//             examDes: createdExam.examDes,
//             noQues: createdExam.noQues
//         })
//     } else {res.json({status: 403})}
// }))

module.exports = questionRouter;