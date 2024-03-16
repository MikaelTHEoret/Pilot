const { Configuration, OpenAIApi } = require('openai');

class AIIntegrationService {
    constructor() {
        const configuration = new Configuration({
            apiKey: process.env.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, // INPUT_REQUIRED {insert your OpenAI API key in the .env file}
        });
        this.openai = new OpenAIApi(configuration);
    }

    async generateCodeFromVerbalInstruction(instruction) {
        try {
            console.log('Sending instruction to OpenAI:', instruction);
            const response = await this.openai.createCompletion({
                model: "text-davinci-003",
                prompt: instruction,
                temperature: 0.5,
                max_tokens: 100,
                top_p: 1.0,
                frequency_penalty: 0.0,
                presence_penalty: 0.0,
            });
            console.log('OpenAI response received');
            return response.data.choices[0].text.trim();
        } catch (error) {
            console.error('Error communicating with OpenAI:', error.message);
            console.error(error.stack);
            throw error;
        }
    }

    async analyzeUploadedFile(file) {
        try {
            console.log('Analyzing uploaded file:', file);
            const response = await this.openai.createCompletion({
                model: "text-davinci-003",
                prompt: file,
                temperature: 0.5,
                max_tokens: 100,
                top_p: 1.0,
                frequency_penalty: 0.0,
                presence_penalty: 0.0,
            });
            console.log('Uploaded file analysis response received');
            return response.data.choices[0].text.trim();
        } catch (error) {
            console.error('Error analyzing uploaded file with OpenAI:', error.message);
            console.error(error.stack);
            throw error;
        }
    }

    async customFunctionalityForTask() {
        try {
            // New functionality added for task implementation
            console.log('New functionality added for task implementation');
            // Add your custom code here

        } catch (error) {
            console.error('Error in custom functionality:', error.message);
            console.error(error.stack);
            throw error;
        }
    }
}

module.exports = new AIIntegrationService();