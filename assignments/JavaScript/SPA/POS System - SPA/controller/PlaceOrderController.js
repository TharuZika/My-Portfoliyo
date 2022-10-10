
// Place order function

$("#txtitemID").on('keyup' , function (event) {
    if (event.code == "Enter"){
        let typedId = $("#txtitemID").val();
        let item = searchItem(typedId);
        if (item != null) {
            $("#txtitemName").val(item.name);
            $("#txtUnitPrice").val(item.price);
            $("#txtShopQty").val(item.qty);

        } else {
            alert("Can't find " + typedId);
        }
    }
});

$("#btnAddtoCart").click(function () {
    let typedId = $("#txtitemID").val();
    let qty = $("#txtQty").val();
    let item = searchItem(typedId);
    if (item != null) {
        let price = item.price * qty;
        let itemName = item.name;

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
            total = total + order.price;
        }

        $("#lblTotal").text("Total: " + total + "/=");

    }else {
        alert("Select Item First !")
    }

});

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

$("#orderCustomerID").on('keyup' , function (event) {
    if (event.code == "Enter"){
        let typedId = $("#orderCustomerID").val();
        let customer = searchCustomer(typedId);
        if (customer != null) {
            $("#orderCustomerName").val(customer.name);
        } else {
            alert("Can't find " + typedId);
        }
    }
});
