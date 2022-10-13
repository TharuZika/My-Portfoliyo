
// Place order function

$("#txtitemID").on('keyup' , function () {
        let typedId = $("#txtitemID").val();
        let item = searchItem(typedId);
        if (item != null) {
            $("#txtitemName").val(item.name);
            $("#txtUnitPrice").val(item.price);
            $("#txtShopQty").val(item.qty);

        } else {
            $("#txtitemName").val("");
            $("#txtUnitPrice").val("");
            $("#txtShopQty").val("");
        }
});


$("#txtCash").on('keyup' , function () {
    $("#btnPurchase").attr('disabled' , false)
})

$("#btnAddtoCart").click(function () {
    let typedId = $("#txtitemID").val();
    let qty = $("#txtQty").val();
    let item = searchItem(typedId);
    if (item != null) {
        let itemName = item.name;
        let price = item.price * qty;


        var cartObject = {
            id: typedId,
            name: itemName,
            qty: qty,
            TotPrice: price
        }

        cart.push(cartObject);
        alert("Item added to cart !")
        loadAllCart();
        qtyChange();

        let total =0;
        for (var order of cart){
            total = total + order.TotPrice;

        }

        $("#lblTotal").text(total + "/=");
        $("#lblSubTotal").text(total + "/=");

    }else {
        alert("Select Item First !")
    }

});

$("#txtDiscount").on('keyup' , function () {
    let total =0;
    for (var cartItem of cart){
        total = total + cartItem.TotPrice;
    }
        total = total - parseInt($("#txtDiscount").val());
        $("#lblSubTotal").val(total);

})

function loadAllCart(){
    $("#tblCart").empty();

    for (var cartItem of cart) {
        var row = `<tr><td>${cartItem.id}</td><td>${cartItem.name}</td><td>${cartItem.qty}</td><td>${cartItem.TotPrice}</td></tr>`;
        $("#tblCart").append(row);
        cartItem.price
    }
}

function qtyChange() {
    let typedId = $("#txtitemID").val();
    let item = searchItem(typedId);
    if (item != null) {
        item.qty = item.qty - $("#txtQty").val();
        loadAllItems();
        $("#txtShopQty").val(item.qty);
    }

}

$("#orderCustomerID").on('keyup' , function () {
        let typedId = $("#orderCustomerID").val();
        let customer = searchCustomer(typedId);
        if (customer != null) {
            $("#orderCustomerName").val(customer.name);
        } else {
            $("#orderCustomerName").val("");
        }

});

function generateOrderID() {
    if (order.length === 0){
        $('#txtOrderID').val("OD001");
    }else {
        let odCount = order.length + 1;
        if (odCount < 10){
            $('#txtOrderID').val("OD00"+ odCount);
        }else if (odCount < 100){
            $('#txtOrderID').val("OD0"+ odCount);
        }else if (odCount < 100000){
            $('#txtOrderID').val("OD"+ odCount);
        }
    }
}

$("#btnPurchase").click(function () {
    let odID = $("#txtOrderID").val();
    let odQty = cart.length;
    let odValue = odQty * $("#txtUnitPrice").val();
    let odCusName = $("#orderCustomerName").val();
    let odDate = $("#orderDate").val();

    var orderObject = {
        oderId: odID,
        orderQty: odQty,
        oderValue: odValue,
        oderCustomer: odCusName,
        oderDate: odDate
    }

    order.push(orderObject);

    loadAllOrderHistory();
    generateOrderID();
    clearText();
});

function clearText() {
    $("#tblCart").empty();
    $("#txtOrderID").valueOf("");
    $("#txtitemName").valueOf("");
    $("#txtQty").valueOf("");
    $("#orderCustomerName").valueOf("");
    $("#txtUnitPrice").valueOf("");

    $("#lblSubTotal").text("0.00/=");
    $("#lblTotal").text("0.00/=");
}
