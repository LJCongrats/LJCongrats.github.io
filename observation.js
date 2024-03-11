function uploadFile() {
    // 清空上次回應的訊息
    document.getElementById("responseMessage").innerHTML = '';

    var userName = document.getElementById("name").value;
    var userID = document.getElementById("userID").value;

    const fileInput = document.getElementById('fileInput');
    const api_url = "https://b3bd-2001-288-7001-10d7-c8b4-1a41-cbe5-1d52.ngrok-free.app/upload";

    const file = fileInput.files[0];
    if (file) {
        const formData = new FormData();
        formData.append('fileInput', file);
        formData.append('userID', userID);
        formData.append('userName', userName);

        const loadingSpinner = document.getElementById('loadingSpinner');
        loadingSpinner.style.display = 'block';  // 顯示加載中 Spinner

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

            // 更新HTML，顯示伺服器的回應
            document.getElementById("responseMessage").innerHTML = data.message;

            // 這裡你可以根據回應執行其他操作

            // 收到伺服器回應後隱藏加載中 Spinner
            loadingSpinner.style.display = 'none';
        })
        .catch(error => {
            console.error('錯誤:', error);
            document.getElementById("responseMessage").innerHTML = '上傳失敗: ' + error.message;

            // 錯誤情況下隱藏加載中 Spinner
            loadingSpinner.style.display = 'none';
        });
    } else {
        console.error('未選擇檔案.');
    }
}
