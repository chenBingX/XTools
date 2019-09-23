function calculationRiseAndFall() {
    var previous_price = $('#previous_price').val();
    if (previous_price.replace(/(^s*)|(s*$)/g, "").length == 0) {
        previous_price = 0;
    }
    var current_price = $('#current_price').val();
    if (current_price.replace(/(^s*)|(s*$)/g, "").length == 0) {
        current_price = 0;
    }
    console.log("previous_price = " + previous_price + "\ncurrent_price = " + current_price);
    var result = "--";
    if (previous_price != 0) {
        var p = (previous_price - current_price) / previous_price;
        if (p < 0) {
            $('#rise_and_fall_result').css("color", "green");
        } else {
            $('#rise_and_fall_result').css("color", "red");
        }
        result = (-p * 100).toFixed(2) + "%";
    }
    $('#rise_and_fall_result').html(result);
}