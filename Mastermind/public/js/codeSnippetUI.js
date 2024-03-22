document.addEventListener('DOMContentLoaded', () => {
    const snippetForm = document.getElementById('snippet-form');
    const descriptionInput = document.getElementById('description-input');
    const generateButton = document.getElementById('generate-snippet');
    const snippetDisplayArea = document.getElementById('snippet-display-area');

    snippetForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const description = descriptionInput.value.trim();
        if (description) {
            generateCodeSnippet(description);
        }
    });

    function generateCodeSnippet(description) {
        // Placeholder for generating code snippet via backend
        console.log('Generating code snippet for:', description);
        // Assume AJAX call to backend, then handle response
        fetch('/code', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ description: description }),
        })
        .then(response => response.json())
        .then(data => {
            displayCodeSnippet(data.snippet);
        })
        .catch(error => {
            console.error('Error during code snippet generation:', error);
            // Implement error handling and display to user
        });
    }

    function displayCodeSnippet(snippet) {
        // Implement snippet display, e.g., appending to the snippet display area
        snippetDisplayArea.textContent = snippet;
    }
});
