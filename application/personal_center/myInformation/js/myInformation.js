let UserInfo;


$(document).ready(function () {
    $("#l0").css({"background-color": "#f6f6f6","color": "#25bb9b"});
    $("#l1").css({"background-color": "#ffffff","color": "#333333"});
    $("#l2").css({"background-color": "#ffffff","color": "#333333"});
    $("#l3").css({"background-color": "#ffffff","color": "#333333"});
    $("#spanA1").show();
    $("#spanA2").hide();
    $("#spanA3").hide();
    $("#info-show").css("display", "block");
    $("#info-modify").css("display", "none");
})

function edit() {
    $("#spanA1").hide();
    $("#spanA2").show();
    $("#spanA3").show();
    $("#info-show").css("display", "none");
    $("#info-modify").css("display", "block");
}

function cancel() {
    $("#spanA1").show();
    $("#spanA2").hide();
    $("#spanA3").hide();
    $("#info-show").css("display", "block");
    $("#info-modify").css("display", "none");
}

function save() {
    $("#spanA1").show();
    $("#spanA2").hide();
    $("#spanA3").hide();
    $("#info-show").css("display", "block");
    $("#info-modify").css("display", "none");
    let nickname = $('input[name="nickname"]').val();
    console.log(nickname);
}
