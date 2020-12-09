const express = require('express');
const path = require('path');
const multer =require('multer');
const router = express.Router();

const student = require('../models/Student')

//Setting image upload storage engine
const storage = multer.diskStorage({
    destination: './public/ProfilePics/',
    filename:(req, file, cb)=>{
      //amenind  timestamp on an image that is same as the other
      cb(null, file.fieldname + '-' + Date.now() + 
      path.extname(file.originalname));
    }
});
  
//Image upload
const upload = multer({
storage: storage,
}).single('ProfilePic');

//Render registarion form  
router.get('/StudentData', (req, res)=>{
    res.render('RegStudent_page', {status:'', status2:''});
});

//Posting student details to DB
router.post('/RegStudent', upload, async(req, res)=>{
    try{
        const StudentDetails = new student(req.body);
        StudentDetails.ProfilePic=req.file.filename;
        await StudentDetails.save();
        res.render('RegStudent_page', {status:'Data has been successfully submitted'});
    }catch(err){
        res.render('RegStudent_page', {status2:'Problem encountered while submitting this form'});
    }
})

//Retriving details from ufarmDB
router.get('/StudentProfile', async(req, res)=>{
    try{
      const items = await student.findOne({_id: req.params.id})
      res.render('StudentProf_page',{students: items})
    }catch(err){
        res.render('RegStudent_page', {status2:'Failed to retrive student details'});
    }
});

module.exports = router;