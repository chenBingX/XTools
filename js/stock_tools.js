function calculationRiseAndFall() {
    var previous_price = $('#previous_price').val();
    if (previous_price.replace(/(^s*)|(s*$)/g, "").length == 0) {
        previous_price = 0;
    }
    var current_price = $('#current_price').val();
    if (current_price.replace(/(^s*)|(s*$)/g, "").length == 0) {
        current_price = 0;
    }
    var result = "--";
    if (previous_price != 0) {
        var p = (previous_price - current_price) / previous_price;
        if (p < 0) {
            $('#rise_and_fall_result_value').css("color", "green");
            $('#rise_and_fall_result_icon').attr("src", "res/icon/arrow_up.png");
        } else {
            $('#rise_and_fall_result_value').css("color", "red");
            $('#rise_and_fall_result_icon').attr("src", "res/icon/arrow_down.png");
        }
        result = (-p * 100).toFixed(2) + "%";
    }
    $('#rise_and_fall_result_value').html(result);
}

function calculationProfitOrLoss() {
    var cost_price = $('#cost_price2').val();
    if (cost_price.replace(/(^s*)|(s*$)/g, "").length == 0) {
        cost_price = 0;
    }
    var current_price = $('#current_price2').val();
    if (current_price.replace(/(^s*)|(s*$)/g, "").length == 0) {
        current_price = 0;
    }
    var commission_tax_rate = $('#commission_tax_rate2').val();
    if (commission_tax_rate.replace(/(^s*)|(s*$)/g, "").length == 0) {
        commission_tax_rate = 0.00025;
    }
    var stamp_duty = $('#stamp_duty2').val();
    if (stamp_duty.replace(/(^s*)|(s*$)/g, "").length == 0) {
        stamp_duty = 0.001;
    }
    var quantity = $('#quantity2').val();
    if (quantity.replace(/(^s*)|(s*$)/g, "").length == 0) {
        quantity = 0;
    }

    if (cost_price == 0 || current_price == 0 || quantity == 0) return;

    var qriginal_funds = 0;
    if (commission_tax_rate != 0) {
        qriginal_funds = cost_price * quantity;
    }
    // var r_buy_commission_tax_rate = qriginal_funds * commission_tax_rate;
    var r_sell_commission_tax_rate = current_price * quantity * commission_tax_rate;
    if (r_sell_commission_tax_rate < 5) {
        r_sell_commission_tax_rate = 5;
    }
    var r_sell_stamp_duty = current_price * quantity * stamp_duty;
    var r_profit_or_loss = current_price * quantity - qriginal_funds - r_sell_commission_tax_rate - r_sell_stamp_duty;
    var profit_or_loss_rate = 0;
    if (qriginal_funds != null) {
        profit_or_loss_rate = r_profit_or_loss / qriginal_funds * 100;
    }
    $('#sell_commission2').html(r_sell_commission_tax_rate.toFixed(2));
    $('#sell_stamp_duty2').html(r_sell_stamp_duty.toFixed(2));
    if (r_profit_or_loss > 0) {
        $('#profit_or_loss2').css("color", "green");
    } else {
        $('#profit_or_loss2').css("color", "red");
    }
    $('#profit_or_loss2').html(r_profit_or_loss.toFixed(2) + " (" + profit_or_loss_rate.toFixed(2) + "%)");
    var result = "--";
    if (cost_price != 0) {
        var p = (cost_price - current_price) / cost_price;
        if (p < 0) {
            $('#rise_and_fall_result_value2').css("color", "green");
            $('#rise_and_fall_result_icon2').attr("src", "res/icon/arrow_up.png");
        } else {
            $('#rise_and_fall_result_value2').css("color", "red");
            $('#rise_and_fall_result_icon2').attr("src", "res/icon/arrow_down.png");
        }
        result = (-p * 100).toFixed(2) + "%";
    }
    $('#rise_and_fall_result_value2').html(result);
}

function transactionCalculation() {

}