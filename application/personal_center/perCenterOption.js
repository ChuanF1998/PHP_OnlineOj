//l0,l1,l2,l3
function infoOption() {
    $("#l0").css({"background-color": "#f6f6f6","color": "#25bb9b"});
    $(location).attr('href', 'http://localhost:63342/application/personal_center/myInformation/');
}

function testOption() {
    $("#l1").css({"background-color": "#f6f6f6","color": "#25bb9b"});
    $(location).attr('href', 'http://localhost:63342/application/personal_center/tests/');
}

function favoritaOption() {
    $("#l2").css({"background-color": "#f6f6f6","color": "#25bb9b"});
    $(location).attr('href', 'http://localhost:63342/application/personal_center/favorites/');
}

function myClassOption() {
    $("#l3").css({"background-color": "#f6f6f6","color": "#25bb9b"});
    $(location).attr('href', 'http://localhost:63342/application/personal_center/myClass/');
}