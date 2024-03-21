const chatService = require('../services/chatService');

// Function to handle user input and interact with code-writing agent
const handleUserInput = async (userInput) => {
    try {
        const codeSnippet = await chatService.generateCodeSnippet(userInput);
        if (codeSnippet) {
            // Display the generated code snippet to the user
            console.log('Generated Code Snippet:', codeSnippet);
        } else {
            console.error('Failed to generate code snippet');
        }
    } catch (error) {
        console.error('Error handling user input:', error);
    }
};

// Example usage
handleUserInput('Create a function to calculate average');