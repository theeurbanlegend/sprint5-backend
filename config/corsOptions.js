const allowedOptions=require('./allowedOrigins')

const corsOptions = {
  origin: 'https://front-l81f.onrender.com', // Replace with the actual URL of your specific route
  credentials: true
}
module.exports=corsOptions
