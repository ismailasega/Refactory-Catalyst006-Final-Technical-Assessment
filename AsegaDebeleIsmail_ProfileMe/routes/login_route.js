const express = require('express');
const router = express.Router();

//Render Selction Page 
router.get('/login', (req, res)=>{
    res.render('login_page', {status:''});
});


module.exports = router;