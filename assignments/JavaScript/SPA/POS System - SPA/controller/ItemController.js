// Item function

$("#btnAddItems").click(function () {
    let itemID = $("#item-no").val();
    let itemName = $("#item-name").val();
    let itemQty = $("#qty").val();
    let itemPrice = $("#price").val();

    let item = searchCustomer(itemID);
    if (item != null) {
        alert("Item already Exist!");
    }else {
        var itemObject = {
            id: itemID,
            name: itemName,
            qty: itemQty,
            price: itemPrice
        }

        items.push(itemObject);
        alert("Item added Successfully!")
        loadAllItems();
        setItemsTextfieldValues("", "", "", "");
    }




});

function setItemsTextfieldValues(id, name, qty, price){
    $("#item-name").val(id);
    $("#item-name").val(name);
    $("#qty").val(qty);
    $("#price").val(price);
}

function loadAllItems() {
    //remove all the table body content before adding data
    $("#tblItems").empty();


    // get all customer records from the array
    for (var item of items) {
        // console.log(customer);// customer object

        // add those data to the table row
        // var row= "<tr><td>"+customer.id+"</td><td>"+customer.name+"</td><td>"+customer.address+"</td><td>"+customer.salary+"</td></tr>";

        // Using String Literals to do the same thing as above
        var row = `<tr><td>${item.id}</td><td>${item.name}</td><td>${item.qty}</td><td>${item.price}</td></tr>`;

        //then add it to the table body of customer table
        $("#tblItems").append(row);
    }
}

// Update itmes
$("#uitem-no").on('keyup' , function (event) {
    if (event.code == "Enter"){
        let typedId = $("#uitem-no").val();
        let item = searchItem(typedId);
        if (item != null) {
            setUpItemTextfieldValues(item.id, item.name, item.qty, item.price);
        } else {
            alert("Can't find " + typedId);
            setUpCustTextfieldValues("", "", "", "");
        }
    }
});

$("#btnItemUpdate").click(function () {
    let itemID = $("#uitem-no").val();
    let response = updateItem(itemID);
    if (response) {
        alert("Item Updated Successfully");
        setUpItemTextfieldValues("", "", "", "");
    } else {
        alert("Check Item No..!");

    }
});

function setUpItemTextfieldValues(id, name, qty, price) {
    $("#uitem-no").val(id);
    $("#uitem-name").val(name);
    $("#uqty").val(qty);
    $("#uprice").val(price);
}

function updateItem(itemID) {
    let item = searchItem(itemID);
    if (item != null) {
        item.id = $("#uitem-no").val();
        item.name = $("#uitem-name").val();
        item.qty = $("#uqty").val();
        item.price = $("#uprice").val();
        loadAllItems();
        return true;
    } else {
        return false;
    }

}

function searchItem(itemID) {
    for (let item of items) {
        if (item.id == itemID) {
            return item;
        }
    }
    return null;
}

// Delete Customer
$("#ditem-no").on('keyup' , function (event){
    if (event.code == "Enter"){
        let typedId = $("#ditem-no").val();
        let item = searchItem(typedId);
        if (item != null) {
            $("#ditem-name").val(item.name)
        } else {
            alert("Can't find " + typedId);
        }
    }
})

$("#btnItemDelete").click(function () {
    let deleteID = $("#ditem-no").val();
    let deleteName = $("#ditem-name").val();


    if (deleteItem(deleteID)) {
        let option = confirm("Do you really want to delete " + deleteName);
        if (option) {
            alert(deleteName + " Successfully Deleted..");
            $("#ditem-no").val(" ");
            $("#ditem-name").val(" ");
        } else {
            alert("Press Enter after insert Item No to search Item before delete!");
        }
    }
});

function deleteItem(itemID) {
    let item = searchItem(itemID);
    if (item != null) {
        let indexNumber = items.indexOf(item);
        items.splice(indexNumber, 1);
        loadAllItems();
        return true;
    } else {
        return false;
    }
}