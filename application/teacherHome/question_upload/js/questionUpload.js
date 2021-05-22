let getHaveUploadUrl = "php/getHaveUpload.php";
let questionData;

$(document).ready(function () {
    getTeacherId();
    let form = {'teacherId':teacherId};
    console.log(form);
    getHaveUploadData(form);
    $("#l0").css({"background-color": "#ffffff","color": "#333333"});
    $("#l1").css({"background-color": "#ffffff","color": "#333333"});
    $("#l2").css({"background-color": "#f6f6f6","color": "#25bb9b"});
})

function getHaveUploadData(form) {
    return $.ajax({
        type: "post",
        url: getHaveUploadUrl,
        data: form,
        timeout: 5000,
        datatype: 'json',
        success: function (data) {
            questionData = eval('('+data+')');
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
                console.log(s);
                $("#question-table").append(s);
            }
        },
        error: function () {
            alert("error");
        }
    });
}
