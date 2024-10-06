
const express = require('express');
const multer = require('multer');
const Tesseract = require('tesseract.js');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

// Serve the HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle file upload and OCR processing
app.post('/upload', upload.single('productImage'), (req, res) => {
    Tesseract.recognize(req.file.path, 'eng')
        .then(result => {
            res.json({ text: result.data.text });
        })
        .catch(err => {
            res.status(500).json({ error: 'Error processing image' });
        });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
