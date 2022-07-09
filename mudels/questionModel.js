const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
    {
        examId: {type: String, require: true},
        question: {type: String, require: true},
        questionImage: {type: String, require: true},
        fourChoice: {type: String, require: true},
        correctAnswer: {type: String, require: true},
        option_1: {type: Number, require: true},
        option_2: {type: Number, require: true},
        option_3: {type: Number, require: true},
        option_4: {type: Number, require: true}
    },
    {
        timestamps: true,
    }
)

module.exports = questionSchema

// const examTitle = Exam.findOne({_id: examId})

// const Question = mongoose.model(examTitle, questionSchema)

// module.exports = Question;