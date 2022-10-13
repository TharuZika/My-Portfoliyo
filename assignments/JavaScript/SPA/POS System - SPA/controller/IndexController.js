$("#btnHome").click(function () {
    $("#dashboard").css('display' , 'block');
    $("#items").css('display', 'none');
    $("#customer").css('display', 'none');
    $("#order").css('display', 'none');
});

$("#btnItems").click(function () {
    $("#dashboard").css('display' , 'none');
    $("#items").css('display', 'block');
    $("#customer").css('display', 'none');
    $("#order").css('display', 'none');
});

$("#btnCusotmer").click(function () {
    $("#dashboard").css('display' , 'none');
    $("#items").css('display', 'none');
    $("#customer").css('display', 'block');
    $("#order").css('display', 'none');

});

$("#btnOrder").click(function () {
    $("#dashboard").css('display' , 'none');
    $("#items").css('display', 'none');
    $("#customer").css('display', 'none');
    $("#order").css('display', 'block');
    generateOrderID();


});

function loadAllOrderHistory() {
    $('#tblOrderHistory').empty();
    for (var ord of order) {
        var row = `<tr><td>${ord.oderId}</td><td>${ord.orderQty}</td><td>${ord.oderValue}</td><td>${ord.oderCustomer}</td><td>${ord.oderDate}</td></tr>`;
        $('#tblOrderHistory').append(row);
    }
}