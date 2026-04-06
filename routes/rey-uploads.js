const express = require('express');
const reys = require('rey-uploads');
const reyette = express.Router();
const path = require('path');
const fs = require('fs');
const config = require(path.join(__dirname, '/../config/config.json'));

const reyettePath = path.join(__dirname, '/../reyette-uploads');
const recyclePath = path.join(__dirname, '/../recycle');

reyette.use('/uploads', express.static(reyettePath));

const upload = reys(reyettePath);
const multiple = upload.array('files');

reyette.get('/upload', (req, res) => {
    res.render('upload', {
        title: 'Upload Files',
        web_name: config.name
    });
});

/*reyette.get('/delete', (req, res) => {
    res.render('delete', {
        title: 'Delete Files',
        web_name: config.name
    });
});*/

reyette.post('/upload', multiple, (req, res) => {
    if (req.files) {
        res.status(200).send(`<script>alert('Files uploaded successfully!'); history.go(-1);</script>`);
    } else {
        res.status(400).send(`<script>alert('No files uploaded!'); history.go(-1);</script>`);
    }
});

reyette.post('/delete', (req, res) => {
    const fileName = req.body.filename;

    if (!fileName) {
        return res.status(400).json({ message: "Nama file kosong!" });
    }

    const sourcePath = path.join(reyettePath, fileName);
    const destPath = path.join(recyclePath, fileName);

    // pastikan folder recycle ada
    if (!fs.existsSync(recyclePath)) {
        fs.mkdirSync(recyclePath);
    }

    // keamanan
    if (!sourcePath.startsWith(reyettePath)) {
        return res.status(400).json({ message: "Invalid path" });
    }

    // cek file ada
    if (!fs.existsSync(sourcePath)) {
        return res.status(404).json({ message: "File tidak ditemukan!" });
    }

    fs.rename(sourcePath, destPath, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Gagal memindahkan file" });
        }

        res.json({ message: "File dipindahkan ke recycle 🗑️" });
    });
});

reyette.get('/files', (req, res) => {
    fs.readdir(reyettePath, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return res.status(500).json({ message: 'Error reading directory' });
        }

        const fileUrls = files.map(file => `${req.protocol}://${req.get('host')}/uploads/${file}`);
        res.status(200).json(fileUrls);
    });
});

reyette.get('/list', (req, res) => {
    fs.readdir(reyettePath, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            res.status(500).render('error-dir', {
                title: 'Directory Error',
                web_name: config.name
            });
            return;
        }

        // Bangun HTML dari daftar file
        const fileLinks = files.map(file => {
            const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${file}`;
            return `
            <li class="file-item">
                <a>${file}</a>

                <div class="file-actions">
                    <button class="open" onclick="window.open('${fileUrl}')">
                        <span>📂</span> Open
                    </button>

                    <button class="delete" onclick="deleteFile('${file}')">
                        <span>🗑️</span> Delete
                   </button>
                </div>
            </li>
            `;
        }).join('');

        res.render('page', {
            title: 'File List',
            web_name: config.name,
            content: `<ul>${fileLinks}</ul>`
        });
    });
});

module.exports = reyette;