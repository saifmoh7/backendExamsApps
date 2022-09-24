const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors")

const userRouter = require("./routers/userRouter.js");
const examRouter = require("./routers/examRouter.js");
const questionRouter = require("./routers/questionRouter.js");


const app = express();
const port = 5000;

mongoose.connect('mongodb+srv://examApps:13241324a@examapps.oiyn6ws.mongodb.net/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
}).then(() => {
console.log('connected to mongoDB');
}).catch((error) => {
    console.log(error.reason);
});

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors());


app.get('/', (req, res) => {
    res.send("server is ready")
})

app.use('/api653/users', userRouter);
app.use('/api653/exams', examRouter);
app.use('/api653/questions', questionRouter);

app.listen(process.env.PORT || port, () => {
    console.log(`Server at http://localhost:${port}`)
})
