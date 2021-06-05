let getHaveUploadUrl = "php/getHaveUpload.php";
let uploadFileUrl = "php/uploadFile.php";
let questionData;

$(document).ready(function () {
    getTeacherId();
    let form = {'teacherId':teacherId};
    //console.log(form);
    getHaveUploadData(form);
    $("#l0").css({"background-color": "#ffffff","color": "#333333"});
    $("#l1").css({"background-color": "#ffffff","color": "#333333"});
    $("#l2").css({"background-color": "#f6f6f6","color": "#25bb9b"});

    $("#spanA1").show();
    $("#spanA2").hide();
    $("#spanA3").hide();
    $("#question-table").css("display", "table");
    $("#question-upload").css("display", "none");
    //$("#info-loading").css("display", "none");
})

function upload() {
    //alert("请务必上传txt格式文件，否则读取失败");
    $("#spanA1").hide();
    $("#spanA2").show();
    $("#spanA3").show();
    $("input[name='questionName']").val("");
    $("#question-table").css("display", "none");
    $("#question-upload").css("display", "block");
}

function cancel() {
    $("#spanA1").show();
    $("#spanA2").hide();
    $("#spanA3").hide();
    $("#question-table").css("display", "table");
    $("#question-upload").css("display", "none");
    $("input[type='radio'][name='level']:checked").prop('checked', false);
    $("input[type='radio'][name='species']:checked").prop('checked', false);
}

function save() {
    let questionName = $("input[name='questionName']").val();
    let level = $("input[name='level']:checked").val();
    let species = $("input[name='species']:checked").val();
    let describe = $("input[name='describe']")[0].files[0];
    let head = $("input[name='head']")[0].files[0];
    let func = $("input[name='function']")[0].files[0];
    let main = $("input[name='main']")[0].files[0];
    let form = new FormData();
    if ( typeof(describe) === "undefined" ||  typeof(head) === "undefined" ||  typeof(func) === "undefined"
        ||  typeof(main)==="undefined" || typeof(species) === "undefined" ||typeof(level) === "undefined") {
        alert("请检查输入项是否正确");
    }
    else {
        $("#spanA1").show();
        $("#spanA2").hide();
        $("#spanA3").hide();
        $("#question-table").css("display", "table");
        $("#question-upload").css("display", "none");
        $("input[type='radio'][name='level']:checked").prop('checked', false);
        $("input[type='radio'][name='species']:checked").prop('checked', false);
        form.append('uploaderId', teacherId);
        form.append('difficulty', level);
        form.append('species', species);
        form.append('questionName', questionName);
        form.append('head', head);
        form.append('describe', describe);
        form.append('func', func);
        form.append('main', main);
        $.ajax({
            type: "post",
            url: uploadFileUrl,
            data: form,
            timeout: 5000,
            datatype: 'json',
            cache:false,
            processData:false,
            contentType:false,
            success: function (data) {
                console.log(data);
                let resData = eval('('+data+')');
                console.log(resData);
                if (resData[resData.length - 1]['status'] === "900") {
                    alert("上传成功");
                    window.location.reload();
                }
            },
            error: function () {
                alert("error");
            }
        });
    }
 }

function getHaveUploadData(form) {
    return $.ajax({
        type: "post",
        url: getHaveUploadUrl,
        data: form,
        timeout: 5000,
        datatype: 'json',
        success: function (data) {
            questionData = eval('('+data+')');
            console.log(questionData);
            let resCount = questionData.length;
            if (questionData[resCount - 1]['status'] === "900") {
                questionData.pop();
                console.log(questionData);
                let s = "<tbody data-v-4bedaae3>";
                let date;
                for (let i = resCount - 2; i >= 0; --i) {
                    date = questionData[i].upload_time.split(" ", 1);
                    s += "<tr data-v-4bedaae3 class=\"js-nc-wrap-link\">"
                        + "<td data-v-4bedaae3 class=\"t-subject-title\">"+questionData[i].id+"</td>"
                    +"<td data-v-4bedaae3 class=\"t-subject-title\">"+questionData[i].name+"</td>"
                    +"<td data-v-4bedaae3 class=\"t-subject-title\">"+date[0]+"</td>";
                }
                s += "</tr>";
                //console.log(s);
                $("#question-table").append(s);
            }
        },
        error: function () {
            alert("error");
        }
    });
}

function uploadFile(form) {

}
