import mongoose from "mongoose";
const AlbumSchema = new mongoose.Schema({
    name: { type: String, required: true },
    desc: { type: String, required: true },
    bgColor: { type: String, required: true },
    image: { type: String, required: true },
})
const AlbumModel=mongoose.models.album || mongoose.model("album",AlbumSchema)
export default AlbumModel;