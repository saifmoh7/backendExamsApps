const mongoose = require("mongoose")

const examSchema = new mongoose.Schema(
    {
        examApp: {type: String, require: true},
        examTitel: {type: String, require: true},
        examImageUrl: {type: String, require: true},
        examDes: {type: String, require: true},
        noQues: {type: Number, require: true, default: 0}
    },
    {
        timestamps: true,
    }
)

const Exam = mongoose.model('Exam', examSchema)

module.exports = Exam;