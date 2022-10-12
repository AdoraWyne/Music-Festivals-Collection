// -----------------------------------------------------------
// require & active
const multer = require('multer')
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')

require('dotenv').config()
cloudinary.config()

// -----------------------------------------------------------
// created upload middleware
const upload = multer({
    storage: new CloudinaryStorage({
      cloudinary: cloudinary,
      params: {
        folder: 'Project 2- Events'
      }
    })
  })
  
// -----------------------------------------------------------
// export
module.exports = upload
  