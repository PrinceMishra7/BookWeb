const express = require('express');
const router = express.Router();
const multer = require('multer');
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const chapter = require('../models/book');
var shortid = require('shortid');


const upload = multer({
  storage: multer.diskStorage({
    destination: '/root/mtpc/Chapters/',
    filename: function (req, file, cb) {
      // user shortid.generate() alone if no extension is needed
      cb(null, shortid.generate() + (file.originalname));
    }
  })
});


router.post('/upload', upload.single('document'), (req, res) => {
  try{
  console.log(req.body)
  const index = (req.body.index);
  const newi = index.split('\n');
  const index1 = [];

  // Check if the request is a multi-part request (i.e. it contains a file)

  if (!req.is('multipart/form-data')) {
    return res.status(400).send({ message: 'Not a multipart request' });
  }

  // Parse the file from the request
  const file = req.file;

  if (!file) {
    return res.status(400).send({ message: 'No file was provided' });
  }
  console.log(file)

  const newFile = new chapter({
    pdfId: file.filename,
    name: req.body.title,
    chapterNo: req.body.chapterNO,
    chapterIndex: newi,
    size: file.size,
    type: file.mimetype,
  });
  // save the new file object to the database
  newFile.save()
}catch(e){
  console.log(e)
}
});

router.get('/:id', async (req, res) => {
  try{
  console.log(req.params.id);
  const ch = await chapter.findOne({ _id: req.params.id });
  const chid = ch.pdfId;
  const pathch = path.join('/root/mtpc/Chapters/');
  res.sendFile(chid, { root: pathch });
}catch(e){
  console.log(e)
}
});


router.delete('/deleteChapter/:id', async (req, res) => {
  try{
  console.log(req.params.id);
  const id = req.params.id;
  console.log(id)
  const ch1 = await chapter.findOne({ _id: id });
  const chid = ch1.pdfId;
  console.log(chid)

  const pathch = path.join('/root/mtpc/Chapters/', chid);
console.log(pathch)

  fs.unlink(pathch, (err) => {
    if (err) {
      res.status(500).send({ error: 'Error deleting file' });
    } else {
      console.log('File deleted successfully')
    }
  });

  chapter.findByIdAndRemove(req.params.id, (err, doc) => {
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
})


router.post('/updateChapter/:id', upload.single("documente"), async (req, res) => {
  try{
  console.log(req.body);
  console.log(req.file);

  const index = (req.body.index);
  let newi = index.split('\n');
  newi = newi.map(item => item.replace(',', ''));

  let chide = req.body.pdfId;
  console.log(chide)
  const name = req.body.title;
  const chapterNo = req.body.chapterNO;
  const chapterIndex = newi;

  // Check if the request is a multi-part request (i.e. it contains a file)

  // Parse the file from the request
  const file = req.file;

  if (file) {
    // Create a new file on Google Drive
    const pathche = path.join('/root/mtpc/Chapters/', chide);

    fs.unlink(pathche, (err) => {
      if (err) {
       console.log(err)
      } else {
        console.log('File deleted successfully')
      }
    });

    chide = file.filename;
  }

  chapter.findByIdAndUpdate(req.params.id, {
    name: name,
    chapterNo: chapterNo,
    chapterIndex: chapterIndex,
   pdfId: chide
  }, { new: true }, (err, doc) => {
    if (!err) {
      res.send("Chapter Updated Successfully")
    }
    else {
      console.log('Error in Updating Chapter : ' + JSON.stringify(err, undefined, 2));
    }
  });
}catch(e){
  console.log(e)
}

})



module.exports = router;