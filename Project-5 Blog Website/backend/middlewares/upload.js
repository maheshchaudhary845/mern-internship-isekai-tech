const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "uploads/posts");
    },
    filename: function(req, file, cb){
        const uniqueName = Date.now() + "-" + Math.round(Math.random()*1e9)+path.extname(file.originalname);
        cb(null, uniqueName);
    }
});

const fileFilter = (req, file, cb)=>{
    const allowedTypes = /jpeg|jpg|png|webp/;
    const isValid = allowedTypes.test(file.mimetype) && allowedTypes.test(path.extname(file.originalname).toLowerCase());

    if(!isValid){
        return cb(new Error("File should be of image type only"), false);
    }
    cb(null, true);
};

const upload = multer({
    storage,
    limits: 5 * 1024 * 1024,
    fileFilter
})

module.exports = upload;