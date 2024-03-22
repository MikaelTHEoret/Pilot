// configValidation.js

document.addEventListener('DOMContentLoaded', function() {
    const configForm = document.getElementById('configForm');

    configForm.addEventListener('submit', function(event) {
        // Prevent form submission if validation fails
        if (!validateForm()) {
            event.preventDefault();
        }
    });

    function validateForm() {
        // Example: Validate the API endpoint field
        const apiEndpointInput = document.getElementById('apiEndpoint');
        if (!apiEndpointInput.value || !isValidUrl(apiEndpointInput.value)) {
            // Display an error message next to the form field
            displayError(apiEndpointInput, 'Please enter a valid URL for the API endpoint.');
            return false;
        }

        // Add additional validation checks for other inputs here

        // If all validations pass
        return true;
    }

    function isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }

    function displayError(inputElement, message) {
        // Find or create the error message element
        let errorElement = inputElement.nextElementSibling;
        if (!errorElement || !errorElement.classList.contains('error-message')) {
            errorElement = document.createElement('div');
            errorElement.classList.add('error-message');
            inputElement.parentNode.insertBefore(errorElement, inputElement.nextSibling);
        }

        // Set the error message and display it
        errorElement.textContent = message;
        errorElement.style.display = 'block';

        // Add an event listener to remove the error message when the user corrects the input
        inputElement.addEventListener('input', function() {
            errorElement.style.display = 'none';
        });
    }
});
