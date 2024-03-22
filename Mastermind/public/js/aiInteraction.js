//aiInteraction.js content
document.addEventListener('DOMContentLoaded', () => {
    const aiForm = document.getElementById('ai-form');
    const requestInput = document.getElementById('request-input');
    const submitButton = document.getElementById('submit-ai-request');
    const responseArea = document.getElementById('ai-response-area');

    aiForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const requestData = requestInput.value.trim();
        if (requestData) {
            submitAIRequest(requestData);
        }
    });

    function submitAIRequest(requestData) {
        // Placeholder for submitting request to the backend
        console.log('Submitting AI request:', requestData);
        // Assume AJAX call to backend, then handle response
        fetch('/ai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ request: requestData }),
        })
        .then(response => response.json())
        .then(data => {
            displayAIResponse(data.response);
        })
        .catch(error => {
            console.error('Error during AI request:', error);
            // Implement error handling and display to user
        });
    }

    function displayAIResponse(response) {
        // Implement response display, e.g., appending to the response area
        responseArea.textContent = response;
    }
});
