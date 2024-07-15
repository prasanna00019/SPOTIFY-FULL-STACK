import mongoose from "mongoose";
const songschema = new mongoose.Schema({
    name: { type: String, required: true }
    , desc: { type: String, required: true },
    album: { type: String, required: true },
    image: { type: String, required: true },
    file: { type: String, required: true },
    duration: { type: String, required: true },
})
const Songmodel=mongoose.models.song ||  mongoose.model("song",songschema);
export default Songmodel