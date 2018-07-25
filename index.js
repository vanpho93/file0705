const express = require('express');
const multer = require('multer');
const fs = require('fs');
const AWS = require('aws-sdk');

const app = express();

const ACCESSS_KEY_ID = 'AKIAJVJM3CS3CIVQQMNQ';
const SECRET_ACCESS_KEY = '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';
const BUCKET_NAME = 'mean070518';

AWS.config.update({
    accessKeyId: ACCESSS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
    subregion: 'us-east-1'
});

const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => cb(null, './public'),
//     filename: (req, file, cb) => cb(null, Date.now() + '.png')
// });

const upload = multer({ storage: multer.memoryStorage() });

app.use(express.static('./public'));

app.post('/avatar', upload.single('image'), (req, res) => {
    const Key = Date.now() + '.png';
    const objectParams = { Bucket: BUCKET_NAME, Key, Body: req.file.buffer, ACL: 'public-read' };
    const uploadPromise = s3.putObject(objectParams).promise();
    uploadPromise
    .then(() => res.send({ success: true, url: `${BUCKET_NAME}/${Key}` }))
    .catch((error) => {
        console.log(error);
        res.send({ success: false, message: 'Cannot upload file' });
    });
});

app.get('/files', (req, res) => {
    res.send({ success: true, files: fs.readdirSync('./public') });
});

app.listen(process.env.PORT || 3000, () => console.log('Server started!!!'));
