const axios = require('axios');

const aiAssistCoding = (req, res) => {
    const { inputText } = req.body;

    axios.post('https://api.openai.com/v1/ai-assist', {
        input: inputText,
        model: 'gpt-3.5-turbo',
        temperature: 0.7,
        max_tokens: 150
    }, {
        headers: {
            'Authorization': `Bearer ${process.env.OPENAI_SECRET_KEY}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        const aiResponse = response.data;
        res.status(200).json(aiResponse);
    })
    .catch(error => {
        console.error('Error making AI request:', error); // Logging the error message and trace
        res.status(500).send('Error in AI-assisted coding functionality');
    });
};

module.exports = {
    aiAssistCoding,
};