const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

const tagsSchema = new mongoose.Schema({
  tag: String,
  type: String,
});

const Tag = new mongoose.model('Tag', tagSchema);

router.post('/', async (req, res) => {

  //This section can probaly come out ----------
  let tagExists = await Tag.find({
    tag: req.body.tag
  });
  if(tagExists)
  {
    return res.Status(400).send({
      message: "Tag already exists";
    })
  }
  //-----------------------------------------------
  const tag = new Tag({
    tag: req.body.tag,
    type: req.body.type
  });

  try
  {
    await tag.save();
    return res.sendStatus(200);

  } catch (error) {
    return res.sendStatus(500);
  }

});

router.get('/', async(req, res) => {
  try
  {
    let tags = await Tag.find({
      type: req.body.type
    });
    return res.send(tags);

  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.get('/all', async(req, res) => {
  try
  {
    let tags = await Tag.find();
    return res.send(tags);

  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = {
  model Tag,
  routes: router,
}
