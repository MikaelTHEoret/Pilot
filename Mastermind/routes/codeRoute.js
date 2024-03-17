const express = require('express');
const router = express.Router();
const codeController = require('../controllers/codeController');


router.get('/', codeController.getCodeFiles);


router.post('/save', codeController.saveCodeFile);


router.post('/run', codeController.runCodeFile);


router.get('/create', codeController.createCodeFile); 
router.get('/edit/:id', codeController.editCodeFile); 
router.post('/update/:id', codeController.updateCodeFile); 
router.post('/delete/:id', codeController.deleteCodeFile); 


router.get('/open/:id', codeController.openCodeFile); 
router.post('/save/:id', codeController.saveEditedCodeFile); 
module.exports = router;