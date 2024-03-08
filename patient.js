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

var patient_data = {
    "resourceType": "Patient",
	"meta" : {
    "profile" : ["https://twcore.mohw.gov.tw/ig/twcore/StructureDefinition/Patient-twcore"]
  },
  "text" : {
    "status" : "generated",
    "div" : "<div xmlns=\"http://www.w3.org/1999/xhtml\"><h3><b>病人基本資料</b></h3><blockquote><p><b>識別碼型別</b>：National Person Identifier <span style=\"background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki\">（ <a href=\"http://terminology.hl7.org/CodeSystem/v2-0203\">Identifier Type Codes</a>#NNxxx <b>[extension: <a href=\"https://twcore.mohw.gov.tw/ig/twcore/StructureDefinition/identifier-suffix\">Identifier Suffix</a>]：</b>TWN）</span><br/><b>身分證字號（official）</b>：使用者身分證字號 （http://www.moi.gov.tw/）</p></blockquote><p><b>病人的紀錄（active）</b>：使用中</p><p><b>姓名（official）</b>：${patient_name} </p><p><b>性別</b>：男性</p><p><b>出生日期</b>：${birthdate}</p><p><b>年齡[extension: <a href=\"StructureDefinition-person-age.html\">person-age</a>]</b>：實際年齡</p><p><b>國籍[extension: <a href=\"http://hl7.org/fhir/StructureDefinition/patient-nationality\">patient-nationality</a>]</b>：<span style=\"background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki\"> （ <a href=\"https://terminology.hl7.org/CodeSystem-ISO3166Part1.html\">ISO3166Part1</a>#TW）</span></p><p><b>向病人說明健康狀態時所使用的語言</b>：中文</p><p><b>紀錄的保管機構</b>： <a href=\"Organization-org-hosp-example.html\">Organization/169</a> \"臺北市北投健康管理醫院\"</p></div>"
  },
  "extension" : [{
    "url" : "https://twcore.mohw.gov.tw/ig/twcore/StructureDefinition/person-age",
    "valueAge" : {
      "value" : 34,
      "system" : "http://unitsofmeasure.org",
      "code" : "a"
    }
  },
  {
    "extension" : [{
      "url" : "code",
      "valueCodeableConcept" : {
        "coding" : [{
          "system" : "urn:iso:std:iso:3166",
          "code" : "TW"
        }]
      }
    }],
    "url" : "http://hl7.org/fhir/StructureDefinition/patient-nationality"
  }],
  "identifier" : [{
    "use" : "official",
    "type" : {
      "coding" : [{
        "system" : "http://terminology.hl7.org/CodeSystem/v2-0203",
        "code" : "NNxxx",
        "_code" : {
          "extension" : [{
            "extension" : [{
              "url" : "suffix",
              "valueString" : "TWN"
            },
            {
              "url" : "valueSet",
              "valueCanonical" : "http://hl7.org/fhir/ValueSet/iso3166-1-3"
            }],
            "url" : "https://twcore.mohw.gov.tw/ig/twcore/StructureDefinition/identifier-suffix"
          }]
        }
      }]
    },
    "system" : "http://www.moi.gov.tw/",
    "value" : "userID"
  }],
  "active" : true,
  "name" : [{
    "use" : "official",
    "text" : "name",
  }],
  "gender" : "gender",
  "birthDate" :"birthdate",
  "communication" : [{
    "language" : {
      "coding" : [{
        "system" : "urn:ietf:bcp:47",
        "code" : "zh-TW"
      }]
    }
  }]
};

function uploadFhirData(){
    // 從表單抓取資料
    var userName = document.getElementById("name").value;
    var userBirthdate = document.getElementById("birthdate").value;
    var userGender = document.getElementById("gender").value;
    var userAge = document.getElementById("valueAge").value; 
	var userID = document.getElementById("userID").value; 
    // 更新病人資料
    patient_data.name[0].text = userName;
    patient_data.birthDate = userBirthdate;
    patient_data.gender = userGender;
	patient_data.identifier[0].value = userID;

    // 驗證生日是否符合格式
    var birthdayRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!birthdayRegex.test(userBirthdate)) {
        // 如果生日不符合格式，彈出警告視窗
        alert("上傳資料不符合生日格式（XXXX-XX-XX）！");
        return;  // 中止上傳動作
    }
	var genderRegex = /^(male|female|other|unknown)$/i;

	if (!genderRegex.test(userGender)) {
    // 如果性別不符合格式，彈出警告視窗
    alert("上傳資料不符合性別格式（male, female, other 或 unknown）！");
    return;  // 中止上傳動作
}

    // 更新或添加擴展中的年齡
    var extensionUrl = "https://twcore.mohw.gov.tw/ig/twcore/StructureDefinition/person-age";
    var ageExtension = patient_data.extension.find(ext => ext.url === extensionUrl);

    if (ageExtension) {
        ageExtension.valueAge.value = parseFloat(userAge); // 更新年齡數值
    } else {
        patient_data.extension.push({
            url: extensionUrl,
            valueAge: {
                value: parseFloat(userAge),
                system: "http://unitsofmeasure.org",
                code: "a"
            }
        });
    }
	
	

    // 替換病人資料中的${birthdate}為實際的使用者輸入值
    patient_data.text.div = patient_data.text.div.replace("${birthdate}", userBirthdate);
	patient_data.text.div = patient_data.text.div.replace("實際年齡", userAge);
    patient_data.text.div = patient_data.text.div.replace("男性", userGender);
    patient_data.text.div = patient_data.text.div.replace("${patient_name}", userName);
	patient_data.text.div = patient_data.text.div.replace("使用者身分證字號", userID);

    // 將病人資料轉換為 JSON 字串
    //var jsonStr = JSON.stringify(patient_data);
    alert("上傳成功");

    // 指定 FHIR API URL
    var api_url = "http://140.116.156.231:8080/fhir/Patient";

    // 發送 POST 請求
    HTTPPostData(api_url, patient_data);
}



