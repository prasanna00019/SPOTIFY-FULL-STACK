import AlbumModel from "../models/AlbumModel.js";
import { v2 as cloudinary } from 'cloudinary';
const addAlbum = async (req, res) => {
    try {
        const name = req.body.name;
        const desc = req.body.desc;
        const bgColor = req.body.bgColor;
        const imageFile = req.file;
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const albumdata = {
            name, desc, bgColor, image: imageUpload.secure_url
        }
        const album = AlbumModel(albumdata);
        await album.save();
        res.json({ success: true, message: "album added" })
    } catch (error) {
        res.json({ success: false, message: "album not added" })
    }
}
const ListAlbum = async (req, res) => {
    try {
        const allAlbums = await AlbumModel.find({});
        res.json({ success: true, albums: allAlbums });
    } catch (error) {
        res.json({ success: false });
    }
}
const removeAlbum = async (req, res) => {
    try {
        await AlbumModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Album nikal diya bhai!!!" })
    } catch (error) {
        res.json({ success: false });
    }
}
const updateAlbumColor = async (req, res) => {
    try {
        const { id, bgColor } = req.body;
        const album = await AlbumModel.findById(id);
        if (!album) {
            return res.status(404).json({ success: false, message: 'Album not found' });
        }
        album.bgColor = bgColor;
        await album.save();
        res.json({ success: true, message: 'Color updated successfully!' });
    } catch (error) {
        res.json({ success: false, message: 'An error occurred' });
    }
};
export { addAlbum, ListAlbum, removeAlbum ,updateAlbumColor};