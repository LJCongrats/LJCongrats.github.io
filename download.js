function downloadData() {
    var userName = document.getElementById("name").value;
    var userID = document.getElementById("userID").value;

    // 建立要傳送給伺服器的資料物件
    var requestData = new FormData();
    requestData.append('userName', userName);
    requestData.append('userID', userID);

    fetch("http://140.116.156.241:4998/download", {
        method: 'POST',
        body: requestData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.blob(); // 將伺服器回應轉換為 Blob 物件
    })
    .then(blob => {
        // 在這裡處理伺服器傳回的檔案（例如下載或顯示）
        var downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(blob);
        downloadLink.download = 'downloaded_file.pptx'; // 指定下載的檔案名稱
        downloadLink.click();
    })
    .catch(error => {
        // 處理錯誤
        console.error('There was a problem with the fetch operation:', error);
        document.getElementById('errorOutput').textContent = 'Download failed.';
        alert("warning");
    });
}
