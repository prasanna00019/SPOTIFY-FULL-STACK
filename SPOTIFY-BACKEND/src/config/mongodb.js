import mongoose from "mongoose";
const connectdb=async()=>{
    mongoose.connection.on('connected',()=>{
       console.log("done bhai done ")
    })
    await  mongoose.connect(`${process.env.MONGO_DB_URI}/spotify`)
}
export default connectdb