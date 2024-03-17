const fs = require('fs-extra');
const path = require('path');

const getCodeFiles = (req, res) => {
    
    res.send('Displaying code files');
};

const saveCodeFile = (req, res) => {
    
    const { fileName, codeContent } = req.body;

    if (!fileName || !codeContent) {
        return res.status(400).send('File name and code content are required');
    }

    try {
        
        fs.ensureDirSync(path.join(__dirname, '..', 'codeFiles')); 
        fs.writeFileSync(path.join(__dirname, '..', 'codeFiles', `${fileName}.js`), codeContent); 
        res.status(200).send('Code file saved successfully');
    } catch (err) {
        console.error('Error saving code file:', err); 
        res.status(500).send('Error saving code file');
    }
};

const runCodeFile = (req, res) => {
    // Logic to run code file
    const { fileName } = req.body;

    if (!fileName) {
        return res.status(400).send('File name is required');
    }

    try {
        
        const filePath = path.join(__dirname, '..', 'codeFiles', `${fileName}.js`);
        if (!fs.existsSync(filePath)) { 
            return res.status(404).send('Code file not found');
        }
        const codeResult = require(filePath)(); 
        res.status(200).send(`Code file executed successfully with result: ${codeResult}`);
    } catch (err) {
        console.error('Error running code file:', err); 
        res.status(500).send('Error running code file');
    }
};

const deleteCodeFile = (req, res) => {
    
    const { fileName } = req.body;

    if (!fileName) {
        return res.status(400).send('File name is required');
    }

    try {
        
        const filePath = path.join(__dirname, '..', 'codeFiles', `${fileName}.js`);
        if (!fs.existsSync(filePath)) { 
            return res.status(404).send('Code file not found');
        }
        fs.unlinkSync(filePath); 
        res.status(200).send('Code file deleted successfully');
    } catch (err) {
        console.error('Error deleting code file:', err); 
        res.status(500).send('Error deleting code file');
    }
};


const openCodeFile = (req, res) => {
   
    const { fileName } = req.body;

    if (!fileName) {
        return res.status(400).send('File name is required');
    }

    try {
        // Read the code file
        const filePath = path.join(__dirname, '..', 'codeFiles', `${fileName}.js`);
        if (!fs.existsSync(filePath)) { 
            return res.status(404).send('Code file not found');
        }
        const codeContent = fs.readFileSync(filePath, 'utf8'); 
        res.status(200).send(codeContent);
    } catch (err) {
        console.error('Error opening code file:', err); 
        res.status(500).send('Error opening code file');
    }
};

module.exports = {
    getCodeFiles,
    saveCodeFile,
    runCodeFile,
    deleteCodeFile,
    openCodeFile
};