import express  from 'express'
import cors from 'cors'
import 'dotenv/config'
import songrouter from './src/routes/songroute.js';
import connectdb from './src/config/mongodb.js';
import connectCloudinary from './src/config/cloudinary.js';
import albumrouter from './src/routes/albumroute.js';

//app config
const app=express();
const port=process.env.PORT || 4000
connectdb();
connectCloudinary();
//MIDDLEWARES 
app.use(express.json());
app.use(cors());
//initializing routes
app.use("/api/song",songrouter)
app.use("/api/album",albumrouter)
app.get('/',(req,res)=>{
    
})
app.listen(port,()=>console.log(`server staarted on ${port}`))