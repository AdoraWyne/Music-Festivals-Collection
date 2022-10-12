// -----------------------------------------------------------
// require & active
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const multer = require('multer')

require('dotenv').config()
cloudinary.config()

// -----------------------------------------------------------
// created upload middleware
const upload = multer({
    storage: new CloudinaryStorage({
      cloudinary, // destructing from cloudinary: cloudinary,
      params: {
        folder: 'Project 2- Events'
      }
    })
  })
  
// -----------------------------------------------------------
// export
module.exports = upload
  