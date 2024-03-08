function uploadFile() {
        var userName = document.getElementById("name").value;
        var userID = document.getElementById("userID").value;
        var userorganization = document.getElementById("organization").value;

        const fileInput = document.getElementById('fileInput');
        const api_url = "http://140.116.156.241:4998/upload";

        const file = fileInput.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('fileInput', file);
            formData.append('userID', userID);
            formData.append('userName', userName);
            formData.append('userorganization', userorganization);

            const loadingSpinner = document.getElementById('loadingSpinner');
            loadingSpinner.style.display = 'block';  // Show loading spinner

            fetch(api_url, {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('網路錯誤');
            })
            .then(data => {
                console.log('伺服器回應:', data);

                // Update the HTML with the server's response
                document.getElementById("responseMessage").innerHTML = data.message;

                // You can perform other actions based on the response here

                // Hide loading spinner after receiving the server response
                loadingSpinner.style.display = 'none';
            })
            .catch(error => {
                console.error('錯誤:', error);
                document.getElementById("responseMessage").innerHTML = '上傳失敗: ' + error.message;

                // Hide loading spinner in case of an error
                loadingSpinner.style.display = 'none';
            });
        } else {
            console.error('No file selected.');
        }
    }