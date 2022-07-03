const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors")

const userRouter = require("./routers/userRouter.js");


const app = express();
const port = 5000;

mongoose.connect('mongodb://localhost/backend', {
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

app.use('/api/users', userRouter);

app.listen(port, () => {
    console.log(`Server at http://localhost:${port}`)
})
