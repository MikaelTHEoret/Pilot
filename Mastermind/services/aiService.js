const axios = require('axios');

const makeOpenAIRequest = async (requestData) => {
    try {
        const response = await axios.post('https://api.openai.com/v1/ai-assist', {
            input: requestData.input,
            model: requestData.model,
            temperature: requestData.temperature,
            max_tokens: requestData.max_tokens
        }, {
            headers: {
                'Authorization': 'bearer *******************************',
                'Content-Type': 'application/json'
            }
        });

        console.log('OpenAI API Response:', response.data);

        return response.data;
    } catch (error) {
        console.error('Error making OpenAI request:', error);
        throw error;
    }
};

module.exports = {
    makeOpenAIRequest
};
