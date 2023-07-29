require('dotenv').config()
const express=require('express')
const path=require('path')
const {logger}=require('./middleware/logger')
const cookieParser=require('cookie-parser')
const mongoose=require('mongoose')
const cors=require('cors')
const errHandler=require('./middleware/errhandler')
const app=express()
const corsOptions=require('./config/corsOptions')
app.use(logger)
app.use(express.json())
app.use(cors(corsOptions))
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://sprint5-front.vercel.app/');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  });
app.use(cookieParser())
// ROUTES
app.use('/img', express.static(path.join(__dirname,'img')));
app.use('/items',require('./routes/itemRoutes'))
app.use('/users',require('./routes/buyerRoutes'))
app.use('/signup',require('./routes/signupRoute'))
app.use('/buy',require('./routes/buyItem'))
app.use('/work',require('./routes/employeeRoutes'))
app.use('/auth',require('./routes/authRoutes'))
app.all('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','404.html'))
})







mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Database connected successfully!")
})
.catch(error=>console.log(error))

app.use(errHandler)


app.listen(process.env.PORT,()=>{
    console.log(`Server is functional and running on port ${process.env.PORT}`)
})

