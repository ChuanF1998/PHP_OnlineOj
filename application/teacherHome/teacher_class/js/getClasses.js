let getTeacherClassUrl = "php/getTeacherClass.php";
let createClassUrl = "php/createClass.php";
let classDetail;
let classPeopleNumber;
let classHash = {};
let form = {};

$(document).ready(function () {
    getTeacherId();
    form['teacherId'] = teacherId;
    getTeacherClassData(form);
    $("#l0").css({"background-color": "#ffffff","color": "#333333"});
    $("#l1").css({"background-color": "#f6f6f6","color": "#25bb9b"});
    $("#l2").css({"background-color": "#ffffff","color": "#333333"});
    $("#spanA1").show();
    $("#spanA2").hide();
    $("#spanA3").hide();
    $("#class-table").css("display", "table");
    $("#class-create").css("display", "none");
})

function edit() {
    $("#spanA1").hide();
    $("#spanA2").show();
    $("#spanA3").show();
    $("#class-table").css("display", "none");
    $("#class-create").css("display", "block");
}

function cancel() {
    $("#spanA1").show();
    $("#spanA2").hide();
    $("#spanA3").hide();
    $("#class-table").css("display", "table");
    $("#class-create").css("display", "none");
}

function save() {
    $("#spanA1").show();
    $("#spanA2").hide();
    $("#spanA3").hide();
    $("#class-table").css("display", "table");
    $("#class-create").css("display", "none");
    let formData = {};
    formData['teacherId'] = teacherId;
    formData['className'] = $("input[name='className']").val();
    formData['classDescribe'] = $("input[name='classDescribe']").val();
    $.ajax({
        type: "post",
        url: createClassUrl,
        data: formData,
        timeout: 5000,
        datatype: 'json',
        success: function (data) {
            console.log(data);
            window.location.reload();
        },
        error: function () {
            alert("error");
        }
    });
}

function scapeToClass(obj) {
    if (window.localStorage) {
        let i = $(obj).index();
        localStorage.setItem('specificClassData', JSON.stringify(classDetail[classDetail.length - i - 1]));
        console.log(localStorage.getItem('specificClassData'));
        window.open('../specificClass/');
    }
    else {
        alert("该浏览器不支持，请使用高版本浏览器");
    }
}

function getTeacherClassData(form) {
    return $.ajax({
        type: "post",
        url: getTeacherClassUrl,
        data: form,
        timeout: 5000,
        datatype: 'json',
        success: function (data) {
            classDetail = eval('('+data+')');
            let resCount = classDetail.length;
            if (classDetail[resCount - 1]['status'] === "900") {
                classDetail.pop();
                classPeopleNumber = classDetail[resCount - 2];
                classDetail.pop();
                //console.log(classPeopleNumber);
                for (let i = 0; i < classDetail.length; ++i) {
                    classDetail[i].numbers = 0;
                    classHash[classDetail[i].classId] = classDetail[i];
                }
                for (let i = 0; i < classPeopleNumber.length; ++i) {
                    classHash[classPeopleNumber[i].classId].numbers = classPeopleNumber[i].numbers;
                }
                let s = "<tbody data-v-4bedaae3>";
                for (let i = classDetail.length - 1; i >= 0 ; --i){
                    s += "<tr data-v-4bedaae3 class=\"js-nc-wrap-link\" onclick=\"scapeToClass(this)\">"
                        + "<td data-v-4bedaae3 class=\"t-subject-title\">" + classDetail[i].className + "</td>"
                        + "<td data-v-4bedaae3 class=\"t-subject-title\">" + classDetail[i].classDescribe + "</td>"
                    + " <td data-v-4bedaae3 class=\"t-subject-title\">" + classDetail[i].numbers + "</td>"
                        +"</tr>";
                }
                s += "/tbody>";
                $("#class-table").append(s);
            }
        },
        error: function () {
            alert("error");
        }
    });
}