const express = require("express")
const expressAsyncHandler = require("express-async-handler");
const Exam = require("../mudels/examModel");
const questionSchema = require("../mudels/questionModel");

const questionRouter = express.Router();

questionRouter.post('/addquestion', expressAsyncHandler(async (req, res) => {
    const exam = await Exam.findOne({_id: req.body.examId})
    console.log(exam)
    const question = {
        _id: stringGenerator(16),
        question : req.body.question,
        questionImageUrl: req.body.questionImageUrl,
        trueOrFalse: req.body.trueOrFalse,
        correctAnswer: req.body.option_1,
        option_1: req.body.option_1,
        option_2: req.body.option_2,
        option_3: req.body.option_3,
        option_4: req.body.option_4,
        source: req.body.source
    }
    exam.questions.push(question)
    const addQustion = await exam.save();
    res.json({status:200, addQustion})
}))

questionRouter.post('/showquestions', expressAsyncHandler(async (req, res) => {
    try {
        const exam = await Exam.findOne({_id: req.body.examId})
        const questions = exam.questions

        if (questions) {
            res.json({status:200, questions})
        } else {res.json({status:403, message: "Exam Not Found"})}
    } catch (error) {
        res.json({status:403, error})
    }
}))

questionRouter.post('/deleteques', expressAsyncHandler(async (req, res) => {
    try {
        const deletQues = await Exam.updateOne({_id: req.body.examId}, {$pull: {"questions": {_id: req.body.quesId}}})

        if (deletQues) {
            res.json({status:200, message: "Question is Deleted"})
        } else {res.json({status:403, message: "Exam Not Found"})}
    } catch (error) {
        res.json({status:403, error})
    }
}))



function stringGenerator(length=10,options={}){
    let { onlyNumbers } = options;
    let symboles = ['A','a','B','b','C','c','D','d','E','e','F','f','G','g','H','h','I','i','J','j','K','k','L','l','M','m','N','n','O',
                    'o','P','p','Q','q','R','r','S','s','T','t','U','u','V','v','W','w','X','x','Y','y','Z','z','0','1','2','3','4','5','6','7','8','9'];
    if( onlyNumbers === true ){
      symboles = ['0','1','2','3','4','5','6','7','8','9'];
    }
    let string = '';
    for (let i = 0; i < parseInt(length); i++) {
      let index = Math.floor(Math.random()*symboles.length);
      string+=symboles[index]
    }
    return string;
  }


module.exports = questionRouter;



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


    
        // const questions = exam.questions
        // const deletQues = questions.filter(Object => Object._id===req.body.quesId)
