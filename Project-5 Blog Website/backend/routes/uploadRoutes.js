const express = require('express');
const upload = require('../middlewares/upload');
const { uploadEditorImage } = require('../controllers/uploadControllers');


const router = express.Router();

router.post('/editor-image', upload.single("image"), uploadEditorImage);

module.exports = router;