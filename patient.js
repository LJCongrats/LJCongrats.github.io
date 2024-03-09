function HTTPPostData(url, data) {
    
    // 設定 POST 請求的 URL 和選項
    var options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)  // 將 JSON 物件轉換為字串
    };

    // 使用 Fetch API 發送 POST 請求
    fetch(url, options)
      .then(response => {
        if (response.ok) {
          return response.json();  // 如果伺服器返回 JSON 則解析它
        }
        throw new Error('網路錯誤');
      })
      .then(data => {
        console.log('伺服器回應:', data);
      })
      .catch(error => {
        console.error('錯誤:', error);
      });
      var errorOutputElement = document.getElementById("errorOutput");

      errorOutputElement.innerHTML = '發生錯誤: ' + error.message;
}

function uploadFhirData() {
    // 從表單抓取資料
    var userName = document.getElementById("name").value;
    var userBirthdate = document.getElementById("birthdate").value;
    var userGender = document.getElementById("gender").value;
    var userAge = document.getElementById("valueAge").value;
    var userID = document.getElementById("userID").value;

    // 建立要傳送給伺服器的資料物件
    var requestData = {
        userName: userName,
        birthDate: userBirthdate,
        gender: userGender,
        age: userAge,
        userID: userID
    };

    // 指定 Flask API URL
    var api_url = "https://8c3e-2001-288-7001-10d7-9d6b-31a8-27d7-f58d.ngrok-free.app/patient"; // 你的 Flask API URL

    // 顯示 Loading Spinner
    var loadingSpinner = document.getElementById('loadingSpinner');
    loadingSpinner.style.display = 'block';

    // 使用之前定義的 HTTPPostData 函數發送 POST 請求
    HTTPPostData(api_url, requestData)
        .then(response => {
            // 隱藏 Loading Spinner
            loadingSpinner.style.display = 'none';

            // 顯示伺服器回應的訊息
            var responseMessage = document.getElementById('responseMessage');
            responseMessage.innerHTML = response.message;
        })
        .catch(error => {
            // 隱藏 Loading Spinner
            loadingSpinner.style.display = 'none';

            // 顯示錯誤訊息
            var responseMessage = document.getElementById('responseMessage');
            responseMessage.innerHTML = '發生錯誤: ' + error.message;
        });
}





