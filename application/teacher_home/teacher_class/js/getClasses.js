$(document).ready(function () {
    //$("#l0").css({"background-color": "#f6f6f6","color": "#25bb9b"});
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
    let nickname = $('input[name="nickname"]').val();
    console.log(nickname);
}

function questionUpload() {
    $("#l2").css({"background-color": "#f6f6f6","color": "#25bb9b"});
    $(location).attr('href', 'http://localhost:63342/application/teacher_home/question_upload/');
}

function scapeToClass() {
    window.open('http://localhost:63342/application/teacher_home/myClass/');
}