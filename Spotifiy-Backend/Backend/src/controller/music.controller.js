const musicmodel = require("../model/music.model");
const User = require("../model/user.model");
const { uploadFile } = require("../services/storage.service");
// const AlbumCreation = require('../model/album.model');
const jwt = require("jsonwebtoken");
const Albummodel = require("../model/album.model");
//!Skip And Limit We Can Use To Get Data
const createmusic = async (req, res) => {
  
    const { title } = req.body;
    const file = req.file;
    if (!file) {
  return res.status(400).json({ message: "File is required" });
}  
     const existingMusic = await musicmodel.findOne({
  Title:title,
  artist: req.user.id
});
if (existingMusic) {
  return res.status(409).json({
    message: "Music already exists",
    music: existingMusic
  });
}
    const resultf = await uploadFile(file.buffer.toString("base64"));
    console.log("Here The Resultf:", resultf);

    const music = await musicmodel.create({
      uri: resultf.url,
      title,
      artist: req.user.id,
    });


    res.status(201).json({
      message: "Music Created Succesfully",
      music: {
        id: music._id,
        uri: music.uri,
        title: music.title,
        artist: music.artist,
      },
    });
  
};
const createAlbum=async (req,res) => {
   
  const {title,music}=req.body;
  const Album=await Albummodel.create({
    title:title,
    artist:req.user.id,
      music:music
    })
    res.json({
      message:"Here The Album Is Created",
      album:{
        id:Album.id,
        title:Album.title,
        artist:Album.artist,
        music:Album.music

      }
    })
  };
  
  const GetMusic=async (req,res) => {
    const music=await musicmodel.find().populate("artist","Username Email role")
    // const music=await musicmodel.find().populate("artist ")
    res.status(200).json({
      message:"Here The Music Fetch Successfullly",
      music:music
    })

    
  };
  const GetAlbum=async (req,res) => {
    // const music=await musicmodel.find().populate("artist","Username Email")
    // const album=await Albummodel.find().select("title album").populate("artist")
    const album=await Albummodel.find().populate("artist")
    res.status(200).json({
      message:"Here The Music Fetch Successfullly",
      music:album
    })

    
  };
  const GetAlbumId=async (req,res) => {

     const albumID=req.params.albumId;
    const album=await Albummodel.findById(albumID).populate("artist")
    res.status(200).json({
      message:"Here The Music Fetch Successfullly",
      music:album
    })

    
  };


module.exports = { createmusic,createAlbum,GetMusic,GetAlbum,GetAlbumId };
