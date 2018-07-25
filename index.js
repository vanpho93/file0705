const express = require('express');

const app = express();

app.use(express.static('./public'));

app.post('/avatar', (req, res) => {
    res.send({ success: true, message: 'Avatar changed.', url: 'abcd.png' });
});

app.listen(3000, () => console.log('Server started!'));
