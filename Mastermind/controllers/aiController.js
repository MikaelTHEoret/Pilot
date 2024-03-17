const axios = require('axios'); 

const aiAssistCoding = (req, res) => {
    const { inputText } = req.body;

    axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
        prompt: inputText,
        max_tokens: 150
    }, {
        headers: {
            'Authorization': 'Bearer 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',
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        const aiResponse = response.data;
        res.status(200).json(aiResponse);
    })
    .catch(error => {
        console.error('Error making AI request:', error);
        res.status(500).send('Error in AI-assisted coding functionality');
    });
};

module.exports = {
    aiAssistCoding,
};