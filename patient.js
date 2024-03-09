function uploadFhirData() {
    // Get data from form fields
    var Uname = document.getElementById("name").value;
    var userID = document.getElementById("userID").value;
    var valueAge = document.getElementById("valueAge").value;
    var birthdate = document.getElementById("birthdate").value;
    var gender = document.getElementById("gender").value;

    // Prepare request data
    var requestData = {
        userName: Uname,
        birthDate: birthdate,
        gender: gender,
        age: valueAge,
        userID: userID
    };

    // Show loading spinner
    var loadingSpinner = document.getElementById('loadingSpinner');
    loadingSpinner.style.display = 'block';

    // Make POST request to Flask server
    fetch("https://8c3e-2001-288-7001-10d7-9d6b-31a8-27d7-f58d.ngrok-free.app/patient", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    })
    .then(data => {
        // Hide loading spinner
        loadingSpinner.style.display = 'none';

        // Handle the response data
        var message = data.message;
        document.getElementById("responseMessage").innerHTML = message;
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        document.getElementById('responseMessage').textContent = 'Upload failed: ' + error.message;

        // Hide loading spinner (error case)
        loadingSpinner.style.display = 'none';
    });
}
