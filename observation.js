function displayFileNames() {
    const fileInput = document.getElementById('fileInput');
    const fileNamesDiv = document.getElementById('fileNames');
    fileNamesDiv.innerHTML = ''; // 清空之前的内容

    const files = fileInput.files;
    if (files.length > 0) {
        const fileNames = [];
        for (let i = 0; i < files.length; i++) {
            fileNames.push(files[i].name);
        }
        fileNamesDiv.innerHTML = '選擇的檔案:<br>' + fileNames.join('<br>');
    } else {
        fileNamesDiv.innerHTML = '未選擇任何檔案';
    }
}



function uploadFiles() {
    // 清空上次回應的訊息
    document.getElementById("responseMessage").innerHTML = '';

    var userName = document.getElementById("name").value;
    var userID = document.getElementById("userID").value;
    var userEmail = document.getElementById("email").value;
    var pasthistory = document.getElementById("pasthistory").value;
    var familyhistory = document.getElementById("familyhistory").value;

    const fileInput = document.getElementById('fileInput');
    const api_url = "http://140.116.156.203:4998/upload";

    const formData = new FormData();
    formData.append('userID', userID);
    formData.append('userName', userName);
    formData.append('userEmail', userEmail);
    formData.append('pasthistory', pasthistory);
    formData.append('familyhistory', familyhistory);

    const files = fileInput.files;
    if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
            formData.append('fileInput', files[i]);
        }
    }

    const loadingSpinner = document.getElementById('loadingSpinner');
    loadingSpinner.style.display = 'block';  // 顯示加載中 Spinner
    loadingSpinner.querySelector('p').innerHTML = '正在上傳資料...';

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
}

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

/*function uploadFile() {
    document.getElementById("responseMessage").innerHTML = '';

    var userName = document.getElementById("name").value;
    var userID = document.getElementById("userID").value;

    const fileInput = document.getElementById('fileInput');
    const api_url_upload1 = "https://e842-140-116-156-231.ngrok-free.app/upload_file";
    const api_url_upload2 = "https://e842-140-116-156-231.ngrok-free.app/upload_obs_value";
    const api_url_upload3 = "https://e842-140-116-156-231.ngrok-free.app/upload_obs_vital";
    const api_url_upload4 = "https://e842-140-116-156-231.ngrok-free.app/upload_dia";
    const api_url_upload5 = "https://e842-140-116-156-231.ngrok-free.app/upload_dia_media";
    const api_url_upload6 = "https://e842-140-116-156-231.ngrok-free.app/upload_CC_PH_FMH";

    const file = fileInput.files[0];
    if (file) {
        const formData1 = new FormData();
        formData1.append('fileInput', file);
        formData1.append('userID', userID);
        formData1.append('userName', userName);

        const loadingSpinner = document.getElementById('loadingSpinner');
        loadingSpinner.style.display = 'block';
        loadingSpinner.querySelector('p').innerHTML = '正在解析檔案...';

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
                // 在最前面插入新的訊息
                document.getElementById("responseMessage").insertAdjacentHTML('afterbegin', data.message + '<br>');

                if (data.message === "檔案解析完成") {
					
                    // 隱藏加載中 Spinner
                    loadingSpinner.style.display = 'none';

                    // 第二階段上傳
                    const formData2 = new FormData();
                    formData2.append('fileInput', file);
                    formData2.append('userID', userID);
                    formData2.append('userName', userName);
                    loadingSpinner.style.display = 'block';
                    loadingSpinner.querySelector('p').innerHTML = '正在上傳實驗室檢驗數據...';

                    return fetch(api_url_upload2, {
                        method: 'POST',
                        body: formData2
                    });
                } else if(data.message === "查無此病患，可能原因如下:<br>1. 病患姓名或身分證字號輸入錯誤<br>2. 伺服器中無此病患資料，請先至「上傳病患資料/Patient」建立病患資料<br>3. 若為剛剛新建立的病患，請稍待數秒後再上傳檔案"){
				throw new Error('');}
					else if(data.message === "目前系統僅可處理以下檔案: .docx, .pdf<br>請重新選擇檔案"){
                    // 如果回應不是 "檔案解析完成"，停止流程
                    throw new Error('');}
					else 
					throw new Error('檔案解析失敗');
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('網路錯誤');
                }
                return response.json();
            })
            .then(data => {
                console.log('伺服器回應 (第二階段):', data);
                // 在最前面插入新的訊息
                document.getElementById("responseMessage").insertAdjacentHTML('afterbegin', data.message + '<br>');
                loadingSpinner.style.display = 'none';

                // 第三階段上傳
                const formData3 = new FormData();
                formData3.append('fileInput', file);
                formData3.append('userID', userID);
                formData3.append('userName', userName);
                loadingSpinner.style.display = 'block';
                loadingSpinner.querySelector('p').innerHTML = '正在上傳生命體徵數據...';

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
                // 在最前面插入新的訊息
                document.getElementById("responseMessage").insertAdjacentHTML('afterbegin', data.message + '<br>');
                loadingSpinner.style.display = 'none';

                // 第四階段上傳
                const formData4 = new FormData();
                formData4.append('fileInput', file);
                formData4.append('userID', userID);
                formData4.append('userName', userName);
                loadingSpinner.style.display = 'block';
                loadingSpinner.querySelector('p').innerHTML = '正在上傳診斷報告...';

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
                // 在最前面插入新的訊息
                document.getElementById("responseMessage").insertAdjacentHTML('afterbegin', data.message + '<br>');
                loadingSpinner.style.display = 'none';

                // 第五階段上傳
                const formData5 = new FormData();
                formData5.append('fileInput', file);
                formData5.append('userID', userID);
                formData5.append('userName', userName);
                loadingSpinner.style.display = 'block';
                loadingSpinner.querySelector('p').innerHTML = '正在上傳診斷報告...';

                return fetch(api_url_upload5, {
                    method: 'POST',
                    body: formData5
                });
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('網路錯誤');
                }
                return response.json();
            })
            .then(data => {
                console.log('伺服器回應 (第五階段):', data);
                // 在最前面插入新的訊息
                document.getElementById("responseMessage").insertAdjacentHTML('afterbegin', data.message + '<br>');
                loadingSpinner.style.display = 'none';

                // 第六階段上傳
                const formData6 = new FormData();
                formData6.append('fileInput', file);
                formData6.append('userID', userID);
                formData6.append('userName', userName);
                loadingSpinner.style.display = 'block';
                loadingSpinner.querySelector('p').innerHTML = '正在上傳病患主訴、過去病史、家族病史...';

                return fetch(api_url_upload6, {
                    method: 'POST',
                    body: formData6
                });
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('網路錯誤');
                }
                return response.json();
            })
            .then(data => {
                console.log('伺服器回應 (第六階段):', data);
                // 在最前面插入新的訊息
                document.getElementById("responseMessage").insertAdjacentHTML('afterbegin', data.message + '<br>');
            })
            .catch(error => {
                console.error('錯誤:', error);
                // 在最前面插入新的訊息
                document.getElementById("responseMessage").insertAdjacentHTML('afterbegin', '上傳失敗: ' + error.message + '<br>');
            })
            .finally(() => {
                // 隱藏加載中 Spinner
                loadingSpinner.style.display = 'none';
            });
    } else {
        console.error('未選擇檔案.');
    }
}*/





