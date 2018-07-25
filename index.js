const express = require('express');
const multer = require('multer');
const fs = require('fs');
const app = express();

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './public'),
    filename: (req, file, cb) => cb(null, Date.now() + '.png')
});

const upload = multer({ storage });

app.use(express.static('./public'));

app.post('/avatar', upload.single('image'), (req, res) => {
    res.send({ success: true, message: 'Avatar changed.', url: req.file.filename });
});

app.get('/files', (req, res) => {
    res.send({ success: true, files: fs.readdirSync('./public') });
});

app.listen(process.env.PORT || 3000, () => console.log('Server started!'));
