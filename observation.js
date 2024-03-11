/*function uploadFile() {
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
}*/

/*function uploadFile() {
    document.getElementById("responseMessage").innerHTML = '';

    var userName = document.getElementById("name").value;
    var userID = document.getElementById("userID").value;

    const fileInput = document.getElementById('fileInput');
    const api_url_upload1 = "https://b3bd-2001-288-7001-10d7-c8b4-1a41-cbe5-1d52.ngrok-free.app/upload_obs_value";
    const api_url_upload2 = "https://b3bd-2001-288-7001-10d7-c8b4-1a41-cbe5-1d52.ngrok-free.app/upload_obs_vital";

    const file = fileInput.files[0];
    if (file) {
        const formData1 = new FormData();
        formData1.append('fileInput', file);
        formData1.append('userID', userID);
        formData1.append('userName', userName);

        const loadingSpinner = document.getElementById('loadingSpinner');
        loadingSpinner.style.display = 'block';

        let responseMessage1 = '';  // 存儲第一階段的回應

        // 第一階段上傳
        fetch(api_url_upload1, {
            method: 'POST',
            body: formData1
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('網路錯誤');
            }
            return response.json();
        })
        .then(data => {
            console.log('伺服器回應 (第一階段):', data);
            responseMessage1 = data.message;

            // 第二階段上傳
            const formData2 = new FormData();
            formData2.append('fileInput', file);
            formData2.append('userID', userID);
            formData2.append('userName', userName);

            return fetch(api_url_upload2, {
                method: 'POST',
                body: formData2
            });
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('網路錯誤');
            }
            return response.json();
        })
        .then(data => {
            console.log('伺服器回應 (第二階段):', data);

            // 合併第一階段和第二階段的回應
            const combinedResponse = responseMessage1 + '<br>' + data.message;

            // 更新HTML
            document.getElementById("responseMessage").innerHTML = combinedResponse;

            // 隱藏加載中 Spinner
            loadingSpinner.style.display = 'none';
        })
        .catch(error => {
            console.error('錯誤:', error);
            document.getElementById("responseMessage").innerHTML = '上傳失敗: ' + error.message;
            loadingSpinner.style.display = 'none';
        });
    } else {
        console.error('未選擇檔案.');
    }
}*/
/*
async function uploadFile() {
    document.getElementById("responseMessage").innerHTML = '';

    var userName = document.getElementById("name").value;
    var userID = document.getElementById("userID").value;

    const fileInput = document.getElementById('fileInput');
    const api_url_upload1 = "https://b3bd-2001-288-7001-10d7-c8b4-1a41-cbe5-1d52.ngrok-free.app/upload_obs_value";
    const api_url_upload2 = "https://b3bd-2001-288-7001-10d7-c8b4-1a41-cbe5-1d52.ngrok-free.app/upload_obs_vital";
    const api_url_upload3 = "https://b3bd-2001-288-7001-10d7-c8b4-1a41-cbe5-1d52.ngrok-free.app/upload_dia";
    const api_url_upload4 = "https://b3bd-2001-288-7001-10d7-c8b4-1a41-cbe5-1d52.ngrok-free.app/upload_CC_PH_FMH";

    const file = fileInput.files[0];
    if (file) {
        const formData = new FormData();
        formData.append('fileInput', file);
        formData.append('userID', userID);
        formData.append('userName', userName);

        const loadingSpinner = document.getElementById('loadingSpinner');
        loadingSpinner.style.display = 'block';

        try {
            let combinedResponse = '';  // 存儲累積的回應

            // 第一階段上傳
            const response1 = await uploadFileToServer(api_url_upload1, formData);
            combinedResponse += response1.message + '<br>';

            // 第二階段上傳
            const response2 = await uploadFileToServer(api_url_upload2, formData);
            combinedResponse += response2.message + '<br>';

            // 第三階段上傳
            const response3 = await uploadFileToServer(api_url_upload3, formData);
            combinedResponse += response3.message + '<br>';

            // 第四階段上傳
            const response4 = await uploadFileToServer(api_url_upload4, formData);
            combinedResponse += response4.message;

            // 更新HTML
            document.getElementById("responseMessage").innerHTML = combinedResponse;

            // 隱藏加載中 Spinner
            loadingSpinner.style.display = 'none';
        } catch (error) {
            console.error('錯誤:', error);
            document.getElementById("responseMessage").innerHTML = '上傳失敗: ' + error.message;
            loadingSpinner.style.display = 'none';
        }
    } else {
        console.error('未選擇檔案.');
    }
}

// Helper 函數處理上傳
async function uploadFileToServer(apiUrl, formData) {
    const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData
    });

    if (!response.ok) {
        throw new Error('網路錯誤');
    }

    return response.json();
}

const fileInput = document.getElementById('fileInput');
const api_url_upload1 = "https://your-ngrok-app/upload1";
const api_url_upload2 = "https://your-ngrok-app/upload2";
const api_url_upload3 = "https://your-ngrok-app/upload3";
const api_url_upload4 = "https://your-ngrok-app/upload4";

const file = fileInput.files[0];
if (file) {
    const formData = new FormData();
    formData.append('fileInput', file);
    formData.append('userID', userID);
    formData.append('userName', userName);

    const loadingSpinner = document.getElementById('loadingSpinner');
    loadingSpinner.style.display = 'block';

    // 第一階段上傳
    uploadFileToServer(api_url_upload1, formData)
        .then(response1 => {
            console.log('伺服器回應 (第一階段):', response1.message);

            // 更新HTML
            document.getElementById("responseMessage").innerHTML += response1.message + '<br>';

            // 第二階段上傳
            return uploadFileToServer(api_url_upload2, formData);
        })
        .then(response2 => {
            console.log('伺服器回應 (第二階段):', response2.message);

            // 更新HTML
            document.getElementById("responseMessage").innerHTML += response2.message + '<br>';

            // 第三階段上傳
            return uploadFileToServer(api_url_upload3, formData);
        })
        .then(response3 => {
            console.log('伺服器回應 (第三階段):', response3.message);

            // 更新HTML
            document.getElementById("responseMessage").innerHTML += response3.message + '<br>';

            // 第四階段上傳
            return uploadFileToServer(api_url_upload4, formData);
        })
        .then(response4 => {
            console.log('伺服器回應 (第四階段):', response4.message);

            // 更新HTML
            document.getElementById("responseMessage").innerHTML += response4.message;

            // 隱藏加載中 Spinner
            loadingSpinner.style.display = 'none';
        })
        .catch(error => {
            console.error('錯誤:', error);
            document.getElementById("responseMessage").innerHTML = '上傳失敗: ' + error.message;
            loadingSpinner.style.display = 'none';
        });
} else {
    console.error('未選擇檔案.');
}*/

function uploadFile() {
    document.getElementById("responseMessage").innerHTML = '';

    var userName = document.getElementById("name").value;
    var userID = document.getElementById("userID").value;

    const fileInput = document.getElementById('fileInput');
    const api_url_upload1 = "https://b3bd-2001-288-7001-10d7-c8b4-1a41-cbe5-1d52.ngrok-free.app/upload_obs_value";
    const api_url_upload2 = "https://b3bd-2001-288-7001-10d7-c8b4-1a41-cbe5-1d52.ngrok-free.app/upload_obs_vital";
    const api_url_upload3 = "https://b3bd-2001-288-7001-10d7-c8b4-1a41-cbe5-1d52.ngrok-free.app/upload_dia";
    const api_url_upload4 = "https://b3bd-2001-288-7001-10d7-c8b4-1a41-cbe5-1d52.ngrok-free.app/upload_CC_PH_FMH";

    const file = fileInput.files[0];
    if (file) {
        const formData1 = new FormData();
        formData1.append('fileInput', file);
        formData1.append('userID', userID);
        formData1.append('userName', userName);

        const loadingSpinner = document.getElementById('loadingSpinner');
        loadingSpinner.style.display = 'block';

        let combinedResponse = '';  // 初始化 combinedResponse

        // 第一階段上傳
        fetch(api_url_upload1, {
            method: 'POST',
            body: formData1
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('網路錯誤');
            }
            return response.json();
        })
        .then(data => {
            console.log('伺服器回應 (第一階段):', data);
            combinedResponse += data.message + '<br>';  // 將第一階段回應添加到 combinedResponse

            // 第二階段上傳
            const formData2 = new FormData();
            formData2.append('fileInput', file);
            formData2.append('userID', userID);
            formData2.append('userName', userName);

            return fetch(api_url_upload2, {
                method: 'POST',
                body: formData2
            });
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('網路錯誤');
            }
            return response.json();
        })
        .then(data => {
            console.log('伺服器回應 (第二階段):', data);
            combinedResponse += data.message + '<br>';  // 將第二階段回應添加到 combinedResponse

            // 第三階段上傳
            const formData3 = new FormData();
            formData3.append('fileInput', file);
            formData3.append('userID', userID);
            formData3.append('userName', userName);

            return fetch(api_url_upload3, {
                method: 'POST',
                body: formData3
            });
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('網路錯誤');
            }
            return response.json();
        })
        .then(data => {
            console.log('伺服器回應 (第三階段):', data);
            combinedResponse += data.message + '<br>';  // 將第三階段回應添加到 combinedResponse

            // 第四階段上傳
            const formData4 = new FormData();
            formData4.append('fileInput', file);
            formData4.append('userID', userID);
            formData4.append('userName', userName);

            return fetch(api_url_upload4, {
                method: 'POST',
                body: formData4
            });
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('網路錯誤');
            }
            return response.json();
        })
        .then(data => {
            console.log('伺服器回應 (第四階段):', data);
            combinedResponse += data.message;  // 將第四階段回應添加到 combinedResponse

            // 更新HTML
            document.getElementById("responseMessage").innerHTML = combinedResponse;

            // 隱藏加載中 Spinner
            loadingSpinner.style.display = 'none';
        })
        .catch(error => {
            console.error('錯誤:', error);
            document.getElementById("responseMessage").innerHTML = '上傳失敗: ' + error.message;
            loadingSpinner.style.display = 'none';
        });
    } else {
        console.error('未選擇檔案.');
    }
}

