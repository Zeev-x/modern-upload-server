const express = require('express');
const path = require('path');
const router = express.Router();
const config = require(path.join(__dirname, '/../config/config.json'));

router.get('/', (req, res) => {
    var content = '<h2>Welcome to Reyette Web Server</h2>';
        content += '<p>Di server ini, kamu bisa mengupload dan mengelola file dengan mudah menggunakan fitur upload yang tersedia ';
        content += '<a style="color: red;">(Jangan upload data sensitif ya!)</a>.';
        content += 'Gunakan menu di atas untuk menjelajahi fitur-fitur yang tersedia.';
        content += 'Saya tidak bertanggung jawab atas file yang kamu upload, jadi pastikan untuk mengupload file yang aman dan tidak melanggar hukum.</p>';
    res.render('page', { title: 'Home', web_name: config.name, content: content });
});

router.get('/contact', (req, res) => {
    var content = '<h2>Contact Us</h2>';
        content += '<p>Jika kamu memiliki pertanyaan, saran, atau ingin berkolaborasi, jangan ragu untuk menghubungi kami melalui email di <a href="mailto: owner@gmail.com">owner@gmail.com</a>.</p>';
        content += '<p>Saya juga aktif di media sosial, jadi kamu bisa mengikuti saya untuk mendapatkan update terbaru tentang proyek dan fitur baru yang akan datang.</p>';
    res.render('page', { title: 'Contact', web_name: config.name, content: content });
});

router.get('/about', (req, res) => {
    var content = '<h2>About Reyette</h2>';
        content += '<p>Reyette adalah seorang programer yang malas tapi kreatif, yang suka membuat proyek-proyek sederhana namun bermanfaat. Saya membuat server ini untuk memudahkan orang dalam mengelola file mereka dengan cara yang mudah dan cepat.</p>';
        content += '<p>Selain itu, saya juga suka bereksperimen dengan teknologi baru dan mencoba hal-hal yang belum pernah saya coba sebelumnya. Jadi, jika kamu memiliki ide atau saran untuk proyek ini, jangan ragu untuk menghubungi saya!</p>';
    res.render('page', { title: 'About', web_name: config.name, content: content });
});

module.exports = router;