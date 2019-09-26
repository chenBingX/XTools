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
        result = (-p * 100).toFixed(3) + "%";
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
    var commission_tax_rate = $('#commission_tax_rate').val();
    if (commission_tax_rate.replace(/(^s*)|(s*$)/g, "").length == 0) {
        commission_tax_rate = 0.00025;
    }
    var stamp_duty = $('#stamp_duty').val();
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
    $('#sell_commission2').html(Math.abs(r_sell_commission_tax_rate.toFixed(3)));
    $('#sell_stamp_duty2').html(Math.abs(r_sell_stamp_duty.toFixed(3)));
    if (r_profit_or_loss > 0) {
        $('#profit_or_loss2').css("color", "green");
    } else {
        $('#profit_or_loss2').css("color", "red");
    }
    $('#profit_or_loss2').html(r_profit_or_loss.toFixed(3) + " (" + profit_or_loss_rate.toFixed(3) + "%)");
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
        result = (-p * 100).toFixed(3) + "%";
    }
    $('#rise_and_fall_result_value2').html(result);
}

function transactionCalculation() {
    var cost_price = $('#cost_price3').val();
    if (cost_price.replace(/(^s*)|(s*$)/g, "").length == 0) {
        cost_price = 0;
    }
    var current_price = $('#current_price3').val();
    if (current_price.replace(/(^s*)|(s*$)/g, "").length == 0) {
        current_price = 0;
    }
    var commission_tax_rate = $('#commission_tax_rate').val();
    if (commission_tax_rate.replace(/(^s*)|(s*$)/g, "").length == 0) {
        commission_tax_rate = 0.00025;
    }
    var stamp_duty = $('#stamp_duty').val();
    if (stamp_duty.replace(/(^s*)|(s*$)/g, "").length == 0) {
        stamp_duty = 0.001;
    }
    var now_quantity = $('#now_quantity3').val();
    if (now_quantity.replace(/(^s*)|(s*$)/g, "").length == 0) {
        now_quantity = 0;
    }
    var transaction_quantity = $('#transaction_quantity3').val();
    if (transaction_quantity.replace(/(^s*)|(s*$)/g, "").length == 0) {
        transaction_quantity = 0;
    }

    if (cost_price == 0 || current_price == 0 || now_quantity == 0 || transaction_quantity == 0) return;

    var transaction_commission = current_price * transaction_quantity * commission_tax_rate;
    if (transaction_commission < 5) {
        transaction_commission = 5;
    }
    transaction_commission = Math.abs(transaction_commission);
    var r_sell_stamp_duty = 0;
    if (transaction_quantity < 0) {
        r_sell_stamp_duty = current_price * transaction_quantity * stamp_duty;
    }
    var r_quantity = parseInt(now_quantity) + parseInt(transaction_quantity);
    var cost_price_after_transaction = 0;
    if (transaction_quantity < 0) {
        cost_price_after_transaction = (cost_price * now_quantity - current_price * Math.abs(transaction_quantity) + transaction_commission + r_sell_stamp_duty) / r_quantity;
    } else {
        cost_price_after_transaction = (cost_price * now_quantity + current_price * Math.abs(transaction_quantity) + transaction_commission) / r_quantity;
    }

    $('#transaction_commission3').html(Math.abs(transaction_commission.toFixed(3)));
    $('#transaction_stamp_duty3').html(Math.abs(r_sell_stamp_duty.toFixed(3)));
    $('#quantity_after_transaction3').html(r_quantity);
    if (cost_price_after_transaction >= cost_price) {
        $('#cost_price_after_transaction3').css("color", "green");
        $('#cost_price_after_transaction_icon3').attr("src", "res/icon/arrow_up.png");
    } else {
        $('#cost_price_after_transaction3').css("color", "red");
        $('#cost_price_after_transaction_icon3').attr("src", "res/icon/arrow_down.png");
    }
    $('#cost_price_after_transaction3').html(cost_price_after_transaction.toFixed(3) + "(" + (cost_price - cost_price_after_transaction).toFixed(3) + ")");


}


function priceCalculation() {
    var price = $('#price').val();
    if (price.replace(/(^s*)|(s*$)/g, "").length == 0) {
        price = 0;
    }
    var quote = $('#quote').val();
    if (quote.replace(/(^s*)|(s*$)/g, "").length == 0) {
        quote = 0;
    }
    if (quote < -1) {
        quote = -1;
    }
    if (price == 0 || quote == 0) return;
    quote = parseFloat(quote);
    if (quote > 0) {
        $('#target_price').css("color", "green");
        $('#target_price_icon').attr("src", "res/icon/arrow_up.png");
    } else {
        $('#target_price').css("color", "red");
        $('#target_price_icon').attr("src", "res/icon/arrow_down.png");
    }
    var targetPrice = price * (1 + quote);
    $('#target_price').html(targetPrice.toFixed(2));
}