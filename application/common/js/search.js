let searchUrl = "../common/php/search.php";

function searchQuestion() {
    let keyword = $("input[name='keywords']").val();
    if(keyword !== "") {
        let form = {};
        form['keywords'] = keyword;
        $.ajax({
            type: "post",
            url: searchUrl,
            data: form,
            beforeSend: function() {
                $(".search_button").attr('onclick', '');
            },
            timeout: 5000,
            datatype: "json",
            success: function (data) {
                console.log(data);
                $("#question_table tr:not(:first)").remove();
                $(".search_button").attr('onclick', 'searchQuestion()');
                if (data !== "null" && data !== "841") {
                    let j_data = eval('(' + data + ')');
                    console.log(j_data);
                    let s = "";
                    for (let i = j_data.length - 1; i >= 0; --i) {
                        let pass_rate = 0;
                        if (j_data[i].submit_times === "0") {
                            pass_rate = "0.0";
                        } else {
                            if (j_data[i].pass_times === "0") {
                                pass_rate = "0.0";
                            } else {
                                let tmp = j_data[i].pass_times * 100 / j_data[i].submit_times;
                                pass_rate = tmp.toFixed(1);
                            }
                        }
                        s = "<tr class=\"title\"  onclick=\"que_detail(this)\"> " +
                            "<td class=\"td0\" ><div class=\"td_div0\"></div></td> " +
                            "<td class=\"td1\" >" + j_data[i].id + "</td> " +
                            "<td class=\"td1\" >" + j_data[i].name + "</td> " +
                            "<td class=\"td1\" >" + j_data[i].difficulty + "</td> " +
                            "<td class=\"td1\" >" + pass_rate + "%" + "</td> " +
                            "</tr>";
                        $("#question_table").append(s);
                    }
                    if (j_data.length === 0) {
                        alert("未找到相关题目");
                    }
                }
            },
            error: function () {
                alert("error");
            }
        });
    }
}