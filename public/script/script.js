// NAV
function toggleMenu() {
    const menu = document.getElementById('navMenu');
    menu.classList.toggle('show');
}

document.addEventListener("DOMContentLoaded", () => {

    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const fileList = document.getElementById('fileList');
    const uploadBtn = document.getElementById('uploadBtn');
    const form = document.querySelector('form');

    if (!fileInput) return;

    // ========================
    // SHOW FILES
    // ========================
    function showFiles(files) {
        fileList.innerHTML = '';

        Array.from(files).forEach(file => {
            const div = document.createElement('div');
            div.textContent = "📄 " + file.name;
            fileList.appendChild(div);
        });
    }

    // ========================
    // BUTTON STATE
    // ========================
    function updateButtonState() {
        uploadBtn.disabled = fileInput.files.length === 0;
    }

    // ========================
    // INPUT CHANGE
    // ========================
    fileInput.addEventListener('change', () => {
        showFiles(fileInput.files);
        updateButtonState();
    });

    // ========================
    // DRAG & DROP
    // ========================
    if (dropZone) {

        dropZone.addEventListener('click', () => fileInput.click());

        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('active');
        });

        dropZone.addEventListener('dragleave', () => {
            dropZone.classList.remove('active');
        });

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('active');

            fileInput.files = e.dataTransfer.files;
            showFiles(fileInput.files);
            updateButtonState();
        });
    }

    // ========================
    // VALIDASI SUBMIT
    // ========================
    form.addEventListener('submit', (e) => {
        if (fileInput.files.length === 0) {
            e.preventDefault();
            alert("Pilih file dulu sebelum upload!");
        }
    });

    // init state
    updateButtonState();
});

// ========================
// DELETE FILE
// ========================
function deleteFile(filename) {
    if (!confirm("Yakin mau hapus file ini?")) return;

    fetch('/delete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `filename=${encodeURIComponent(filename)}`
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        location.reload();
    })
    .catch(err => {
        console.error(err);
        alert("Gagal menghapus file");
    });
}