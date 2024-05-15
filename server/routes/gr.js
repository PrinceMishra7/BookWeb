const express = require('express');
const router = express.Router();
const multer = require('multer');
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const gr = require('../models/gr');

var shortid = require('shortid');


const upload = multer({
  storage: multer.diskStorage({
    destination: '/root/mtpc/GR/',
    filename: function (req, file, cb) {
      // user shortid.generate() alone if no extension is needed
      cb(null, shortid.generate() + (file.originalname));
    }
  })
});

router.post('/upload', upload.single("document"), (req, res) => {
  try{
  console.log("Now uploading GR")
  console.log(req.body)
  const index = (req.body.index);

  if (!req.is('multipart/form-data')) {
    return res.status(400).send({ message: 'Not a multipart request' });
  }

  // Parse the file from the request
  const file = req.file;

  if (!file) {
    return res.status(400).send({ message: 'No file was provided' });
  }
  console.log(file)
  const newFile = new gr({
   pdfId: file.filename,
    name: req.body.title,
    size: file.size,
    type: file.mimetype,
  });
  // save the new file object to the database
  newFile.save()

  res.status(200).send("new GR Uploaded")
}catch(err){
  console.log(err)
}

});

router.get('/allgrID', (req, res) => {
  try{
  gr.find({}, (err, files) => {
    if (err) return res.status(500).send({ error: err });
    const filesData = files.map(file => {
      return {
        id: file._id,
        pdfId: file.pdfId,
        name: file.name,
      }
    });
    res.status(200).send({ files: filesData });
  });
}catch(e){
  console.log(e)
}
});

router.get('/getGRData/:id', async (req, res) => {
  try {
    let GR = await gr.findOne({ _id: req.params.id });
    res.status(200).send(GR);
  } catch (error) {
    console.log(error);
  }
})

router.get('/:id', async (req, res) => {
  try{
  console.log(req.params.id);
  const ch = await gr.findOne({ _id: req.params.id });
  const chid = ch.pdfId;
  const pathch = path.join('/root/mtpc/GR/');
  res.sendFile(chid, { root: pathch })
}catch(e){
  console.log(e)
}

});

router.delete('/deletegr/:id', async (req, res) => {
  try{
  console.log(req.params.id);
  const id = req.params.id;
  console.log(id)
  const ch1 = await gr.findOne({ _id: id });
  const chid = ch1.pdfId;
  console.log(chid)
  const pathch = path.join('/root/mtpc/GR/', chid);
  
  fs.unlink(pathch, (err) => {
    if (err) {
      res.status(500).send({ error: 'Error deleting file' });
    } else {
      console.log('File deleted successfully')
    }
  });

  gr.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      console.log('Chapter Deleted Successfully')
      res.status(200)
      // res.send(doc);
    }
    else {
      console.log('Error in Deleting Chapter : ' + JSON.stringify(err, undefined, 2));
    }
  });

}catch(e){
  console.log(e)
}
});

router.post('/updategr/:id', upload.single("documente"), async (req, res) => {
  try{
  console.log(req.body);
  console.log(req.file);
  let chide = req.body.pdfId;
  console.log(chide)
  const name = req.body.title;
  const file = req.file;

  if (file) {
  
  
  const pathch = path.join('/root/mtpc/GR/', chide);

  fs.unlink(pathch, (err) => {
    if (err) {
      res.status(500).send({ error: 'Error deleting file' });
    } else {
      console.log('File deleted successfully')
    }
  });
  chide=file.filename;
  }

  const ch = await gr.findOneAndUpdate({ _id: req.params.id }, {
    pdfId: chide,
    name: name,
  }, { new: true });
  res.status(200);
}catch(e){
  console.log(e)
}
});



module.exports = router;