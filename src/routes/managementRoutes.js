const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const managerMenuControllers = require('../app/controllers/management-menu')

const assetsDir = 'src/public/assets/';

// Kiểm tra xem thư mục 'assets' đã tồn tại chưa
if (!fs.existsSync(assetsDir)) {
  // Nếu không tồn tại, tạo thư mục
  fs.mkdirSync(assetsDir);
  console.log('Created assets directory');
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file )
    cb(null, assetsDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
  
const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
      return cb(new Error('Only JPEG and PNG files are allowed!'));
    }
    cb(null, true);
  }
});
  
router.post('/table-create',managerMenuControllers.createNewTable);
router.post('/create-product', upload.single('img'), managerMenuControllers.createProduct);  
router.post('/:id',managerMenuControllers.deleteProduct);
router.post('/table/:id',managerMenuControllers.deleteTable);
router.post('/table/edit/:id',managerMenuControllers.editTable);
router.post('/edit/:id', managerMenuControllers.editProduct);
router.get('/', managerMenuControllers.index);
module.exports = router
