const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

const multer = require('multer');
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});

const photoSchema = new mongoose.Schema({
  path: String,
  tags: [String]
});

const Photo = mongoose.model('Photo', photoSchema);

router.post('/', upload.single('photo'), async(req, res) => {
  if(!req.file)
  {
    return res.Status(400).send({
      message: "No photo!"
    });
  }

  const photo = new Photo({
    path: req.body.path,
    tags: req.body.tags
  });

  try
  {
    await photo.save();
    return res.sendStatus(200);
  }
  catch (error)
  {
    console.log(error);
    return res.sendStatus(500);
  }


});

router.get('/all', async(req, res) => {
  try
  {
    let photos = await Photo.find();
    return res.send(photos);
  }
  catch (error)
  {
    console.log(error);
    return res.sendStatus(500);
  }
});

//Must be tested
router.get('/byTag', async(req, res) => {
  try
  {
    let photos = await Photo.find({
      tags: { $all: req.body.tags}
    });
    return res.send(photos);
  }
  catch (error)
  {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = {
  model: Photo,
  routes: router,
}
