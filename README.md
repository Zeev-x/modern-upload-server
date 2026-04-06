# 🚀 Modern upload server

A simple yet powerful **Express.js file manager** with modern UI, drag & drop upload, and recycle bin system.

---

## ✨ Features

* 📂 Upload multiple files (drag & drop)
* 📁 File list viewer
* 🗑️ Delete file (move to recycle bin, not permanent)
* ♻️ Restore-ready system (future upgrade)
* 🎨 Modern responsive UI (desktop & mobile)
* ⚡ Fast and lightweight (no heavy dependencies)

---

## 📸 Preview

> Simple, clean, and responsive file manager UI

* Desktop: horizontal layout
* Mobile: stacked layout with adaptive buttons

---

## 🛠️ Tech Stack

* **Backend:** Node.js + Express.js
* **Frontend:** EJS + Vanilla CSS + JavaScript
* **Upload Engine:** rey-uploads
* **File System:** Native Node.js `fs`

---

## 📦 Installation

```bash
git clone https://github.com/Zeev-x/modern-upload-server.git
cd modern-upload-server
npm install
```

---

## ⚙️ Configuration

Edit config file:

```
/config/config.json
```

Example:

```json
{
    "port": 80,
    "name": "Reyette Public Data Center",
    "version": "1.0.0",
    "author": "Reyette"
}
```

---

## ▶️ Run Project

```bash
node server.js
```

Open in browser:

```
http://localhost
```

---

## 📂 Folder Structure

```
project-root/
│
├── routes/
│   └── reyette.js
│
├── views/
│   ├── upload.ejs
│   ├── page.ejs
│   └── 404.ejs
│
├── public/
│   ├── style/
│   └── script/
│
├── reyette-uploads/   # Uploaded files
├── recycle/           # Deleted files (moved here)
│
├── config/
│   └── config.json
│
└── server.js
```

---

## 🔥 API Endpoints

### Upload File

```
POST /upload
```

### Get File List

```
GET /files
```

### Delete File (move to recycle)

```
POST /delete
Body: filename=example.txt
```

---

## 🧠 How Delete Works

Instead of deleting permanently:

```
/reyette-uploads/file.txt
        ⬇️
/recycle/file.txt
```

Safer. Reversible. Cleaner.

---

## 📱 Responsive Design

* Desktop → file name + action buttons inline
* Mobile → buttons move below file name
* Touch-friendly UI

---

## 🚀 Future Improvements

* 🔄 Restore file from recycle bin
* 📊 Upload progress bar
* 🖼️ File preview (image/video)
* 📁 Folder support
* 🔐 Authentication system

---

## ⚠️ Notes

* Ensure upload and recycle folders exist
* Avoid special characters in file names (or sanitize input)
* Large files may require additional configuration

---

## 👨‍💻 Author

Made with ❤️ by **Reyette**

---
