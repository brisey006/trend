const express = require('express');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/uploads');
  },
  filename: function(req, file, cb){
     const now = new Date().toISOString();
     const date = now.replace(/:/g, '-');
    cb(null, date + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10
  }
})

module.exports = upload;
