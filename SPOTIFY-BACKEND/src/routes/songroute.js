import { addsongs,listsong,removeSong } from "../controllers/songcontroller.js";
import express from "express"
import upload from "../middleware/multer.js";
const songrouter=express.Router();

songrouter.post('/add',upload.fields([{name:'image',maxCount:1},{name:'audio',maxCount:1}]),addsongs);
songrouter.get('/list',listsong);
songrouter.post('/remove',removeSong);

export default songrouter;