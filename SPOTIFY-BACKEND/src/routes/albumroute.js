import express from "express"
import { addAlbum,ListAlbum,removeAlbum,updateAlbumColor} from "../controllers/albumController.js"
import upload from "../middleware/multer.js"
const albumrouter=express.Router();
albumrouter.post('/add',upload.single('image'),addAlbum);
albumrouter.get('/list',ListAlbum);
albumrouter.post('/remove',removeAlbum);
albumrouter.post('/updateAlbum',updateAlbumColor);

export default albumrouter;