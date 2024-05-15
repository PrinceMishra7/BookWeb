const express = require('express');
const router = express.Router();
const multer = require('multer');
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const service = require('../models/services');
const { cloudinary, storage } = require('../config/cloudinary')
const nodemailer = require('nodemailer');


router.get('/allservices', (req, res) => {
    try{
    service.find({}, (err, files) => {
        if (err) return res.status(500).send({ error: err });
        const filesData = files.map(file => {
            
            return {
                id: file._id,
                name: file.name,
                description: file.description,
                images: file.images.url
            }
        });
       console.log(filesData);
        res.status(200).send({ files: filesData });
    });
}catch(e){
    console.log(e)
  }
})

const upload = multer({ storage });

router.post('/addservice', upload.any('images'), async (req, res) => {
    try {
        console.log(req.body);
        const newService = new service({
            name: req.body.name,
            description: req.body.description,
            images: { url: req.files[0].path, filename: req.files[0].filename }
        })
        await newService.save();
        res.status(200).send(newService);
    } catch (error) {
        console.log(error);
    }
});

router.get('/serviceData/:id', async (req, res) => {
    try {
        let svc = await service.findOne({ _id: req.params.id });
        res.status(200).send(svc);
    } catch (error) {
        console.log(error);
    }
});

router.delete('/deleteservice/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const svc = await service.findById(id);
        await cloudinary.uploader.destroy(svc.images.filename);
        await svc.remove();
        res.status(200).send(svc);
    } catch (error) {
        console.log(error);
    }
});

router.put('/updateservice/:id', upload.array('images'), async (req, res) => {
    try {
        const id = req.params.id;
        const svc = await service.findById(id);
        console.log(svc)
        if (req.files.length > 0) {
            await cloudinary.uploader.destroy(svc.images.filename);
            svc.images = { url: req.files[0].path, filename: req.files[0].filename }
        }
        svc.name = req.body.name;
        svc.description = req.body.description;
        await svc.save();
        res.status(200).send(svc);
    } catch (error) {
        console.log(error);
    }
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'bookweb729@gmail.com',
      pass: 'eixtccdmneahgspd'
    }
  });
  
router.post('/generalcontact', async (req, res) => {
    try {
        console.log(req.body);
        
          const mailOptions = {
            from: req.body.email,
            to: 'bookweb729@gmail.com',
            subject: 'Message from ' + req.body.name + '',
            text: 'Name: ' + req.body.name+ "\n"+ 'Email: ' + req.body.email+ "\n" + 'Phone: ' + req.body.phone+ "\n" + ' Message: ' + req.body.description+ "\n" + '',
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
              res.sendStatus(200).send(info.response);
            }
          });  
    } catch (error) {
        console.log(error);
    }
})

router.post('/servicecontact/:id', async (req, res) => {
    try {
        console.log(req.body);
        
          const mailOptions = {
            from: req.body.email,
            to: 'bookweb729@gmail.com',
            subject:  'Consultancy request regarding ' + req.body.blogname+ " by " + req.body.info.name + '',
            text: 'Name: ' + req.body.info.name+ "\n"+ 'Email: ' + req.body.info.email+ "\n" + 'Phone: ' + req.body.info.phone+ "\n" + ' Message: ' + req.body.info.description+ "\n" + '',
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
              res.sendStatus(200).send(info.response);
            }
          });  
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;