'use strict'
// 1行目に記載している 'use strict' は削除しないでください

//現在の日付を表示
document.addEventListener(`DOMContentLoaded`, function () {
    const currentDate = new Date();
    const options = { year: `numeric`, month: `long`, day: `numeric` };
    const dateElemant = document.getElementById(`current-date`);
    dateElemant.textContent = currentDate.toLocaleDateString(`ja-JP`, options);
});




//ドロップダウンを非表示にしておく
let selectCompany = document.getElementById("dropdownCompany");
let selectgroupPPES = document.getElementById("requestergroupPPES");
let selectgroupTMC = document.getElementById("requestergroupTMC");

selectCompany.addEventListener("change", function () {
    let selectCompanyValue = selectCompany.options
    [selectCompany.selectedIndex].text;
    if (selectCompanyValue === "PPES試作・評価" ||
        selectCompanyValue === "PPES解析・構造" ||
        selectCompanyValue === "PPES合成") {
        selectgroupTMC.style.display = "none";
        selectgroupPPES.style.display = "block";
        selectgroupPPES.style.opacity = 1;
    } else if (
        selectCompanyValue === "TMC試作・評価" ||
        selectCompanyValue === "TMC解析・構造" ||
        selectCompanyValue === "TMC合成") {
        selectgroupPPES.style.display = "none";
        selectgroupTMC.style.display = "block";
        selectgroupTMC.style.opacity = 1;
    } else {
        selectgroupPPES.style.display = "block";
        selectgroupPPES.selectedIndex = 0;
        selectgroupPPES.style.opacity = 0.25;
        selectgroupTMC.selectedIndex = 0;
        selectgroupTMC.style.display = "block";
        selectgroupTMC.style.opacity = 0.25;
    }
});


//希望納期
function showSelectedDate() {
    let datePicker = document.getElementById("datePicker");
    let selectedDate = new Date(datePicker.value);
    let options = {
        year: "numeric", month: "long", day: "numeric"
    };
    let formattedDate = selectedDate.toLocaleDateString("ja-JP", options);
}


//工数計算
function totalKosu() {
    let human = document.getElementById("human").value;
    // console.log(typeof(human))
    let Hr = document.getElementById("time").value;
    // console.log(typeof(Hr))
    let day = document.getElementById("longdays").value;
    // console.log(typeof(day))
    let totaltime = document.getElementById("totalartificial")
    if (human > 0 &&
        Hr > 0 &&
        day > 0) {
        let total = 0;
        total = human * Hr * day;
        // console.log(total);
        totaltime.textContent = total;
        document.getElementById("Hr").style.display = "block";
        return total;
    } else {
        totaltime.textContent = "error"
        document.getElementById("Hr").style.display = "none";
        return "工数計算出来ません";
    }
}


//確認ページへ
function changePage(){
    document.getElementById("box00").style.display = "none"
    document.getElementById("box01").style.display = "block"

    let inputCompany = document.getElementById("dropdownCompany")
    .options[document.getElementById("dropdownCompany").selectedIndex].text;
    let inputGroupPPES = document.getElementById("requestergroupPPES")
    .options[document.getElementById("requestergroupPPES").selectedIndex].text;
    let inputGroupTMC = document.getElementById("requestergroupTMC")
    .options[document.getElementById("requestergroupTMC").selectedIndex].text;
    let inputReceiveGroup = document.getElementById("receiveselectgroup")
    .options[document.getElementById("receiveselectgroup").selectedIndex].text;
    let inputReceiveMonth = document.getElementById("receiveselectmonth")
    .options[document.getElementById("receiveselectmonth").selectedIndex].text;
    let inputRequester = document.getElementById("name").value;
    let inputDate = document.getElementById("datePicker").value;
    let inputHuman = document.getElementById("human").value;
    let inputTime = document.getElementById("time").value;
    let inputLongdays = document.getElementById("longdays").value;
    let inputTotalArtificial = totalKosu();

    let checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    let checkedItems = [];
    checkboxes.forEach(function(checkbox){
    let labelElement = document.querySelector('label[for="' + checkbox.id + '"]');
        if(labelElement){
            checkedItems.push(labelElement.textContent);
        }
    });


    document.getElementById("emailContent").value =
    "依頼元会社と種類は: " + inputCompany + '\n' +
    "依頼元グループは: " + inputGroupPPES + inputGroupTMC + '\n' +
    "依頼者は: " + inputRequester + '\n' +
    "依頼先は: " + inputReceiveGroup + '\n' +
    "依頼月は: " + inputReceiveMonth + '\n' +
    "希望納期は: " + inputDate + '\n' +
    "想定工数は: " + inputTotalArtificial +
    "(" + inputHuman + "人" + inputTime + "Hr/日" + inputLongdays + "日" + ")" + '\n' +
    "選択項目は: " + checkedItems.join(', ');

}


//元画面に戻る
function changeBack(){
    document.getElementById("box00").style.display = "block"
    document.getElementById("box01").style.display = "none"

}


//メールを送る
function sendEmail(){
    let emailContent = document.getElementById("emailContent").value;
    let outlookURL = "https://outlook.office.com/mail/";
    let encodedEmailContent = encodeURIComponent(emailContent);
    let finalOutlookURL = outlookURL + "&body=" + encodedEmailContent;
    window.open(finalOutlookURL,"_blank");
}
