const express = require('express');
const Router = express.Router();
const multer = require('multer');
const sharp = require('sharp');

Router.get('/', (req, res) => {
    req.session.user = "Mrityunjay Kumar" + process.env.PORT;
    res.render('index', {
        user: req.session.user
    });
})


Router.get('/sharp_image_converter', async (req, res) => {
    // console.log(req.file);
    res.render('image_converter');
})

// multer work

const upload = multer({
    limits: {
        fileSize: 1200
    },
    fileFilter(req, file, cb) {
        // console.log(req);
        cb(null, true);

    }
})

Router.post('/sharp_image_converter', upload.single('file1'), async (req, res) => {
    try {
        let file1 = await sharp(req.file.buffer).resize({ width: +req.body.width }).png().toBuffer();

        // console.log(typeof file1);

        let modified_image = {
            data: file1.toString('base64')
        }

        res.send(modified_image);
    } catch (e) {
        res.send({ message: e.message });
    }
}, (error, req, res, next) => {
    console.log("multer Error = ", error);
    res.status(404).send(error);
})

module.exports = Router;