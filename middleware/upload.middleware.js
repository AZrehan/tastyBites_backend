const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Create uploads folder if it does not exist
const uploadFolder = path.join(__dirname, "..", "uploads");

if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadFolder);
    },

    filename: function (req, file, cb) {
        const uniqueName =
            Date.now() + "-" + Math.round(Math.random() * 1E9);

        cb(null, "image-" + uniqueName);
    }
});

const upload = multer({
    storage: storage
});

module.exports = upload;