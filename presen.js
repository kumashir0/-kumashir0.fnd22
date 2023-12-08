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


function showSelectedDate() {
    let datePicker = document.getElementById("datePicker");
    let selectedDate = new Date(datePicker.value);
    let options = {
        year: "numeric", month: "long", day: "numeric"
    };
    let formattedDate = selectedDate.toLocaleDateString("ja-JP", options);
}


function totalKosu() {
    let human = document.getElementById("human").value;
    console.log(typeof(human))
    let Hr = document.getElementById("time").value;
    console.log(typeof(Hr))
    let day = document.getElementById("longdays").value;
    console.log(typeof(day))
    let totaltime = document.getElementById("totalartificial")
    if (human > 0 &&
        Hr > 0 &&
        day > 0) {
        let total = 0;
        total = human * Hr * day;
        console.log(total);
        totaltime.textContent = total;
        document.getElementById("Hr").style.display = "block";
    } else {
        totaltime.textContent = "error"
        document.getElementById("Hr").style.display = "none";
    }
}
