$("#btnAddCustomer").click(function () {
    let customerID = $("#cNo").val();
    let customerName = $("#cName").val();
    let customerAddress = $("#cAddress").val();
    let customerContact = $("#cContact").val();

    let customer = searchCustomer(customerID);
    if (customer != null) {
        alert("Customer already Exist!");
    }else {
        var customerObject = {
            id: customerID,
            name: customerName,
            address: customerAddress,
            contact: customerContact
        }

        customers.push(customerObject);
        alert("Customer added Successfully!")
        loadAllCustomers();

        setCustTextfieldValues("", "", "", "");
    }




});

function setCustTextfieldValues(id, name, address, contact){
    $("#cNo").val(id);
    $("#cName").val(name);
    $("#cAddress").val(address);
    $("#cContact").val(contact);
}

function loadAllCustomers() {
    $("#tblCustomer").empty();
    for (var customer of customers) {
        var row = `<tr><td>${customer.id}</td><td>${customer.name}</td><td>${customer.address}</td><td>${customer.contact}</td></tr>`;
        $("#tblCustomer").append(row);
    }
    customersCard();
}

// Update Customers
$("#ucust-no").on('keyup' , function (event) {
    if (event.code == "Enter"){
        let typedId = $("#ucust-no").val();
        let customer = searchCustomer(typedId);
        if (customer != null) {
            setUpCustTextfieldValues(customer.id, customer.name, customer.address, customer.contact);
        } else {
            alert("Can't find " + typedId);
            setUpCustTextfieldValues("", "", "", "");
        }
    }
})

$("#btnCUpdate").click(function () {
    let customerID = $("#ucust-no").val();
    let response = updateCustomer(customerID);
    if (response) {
        alert("Customer Updated Successfully");
        setUpCustTextfieldValues("", "", "", "");
    } else {
        alert("Check Customer No..!");

    }
});

function setUpCustTextfieldValues(id, name, address, contact) {
    $("#ucust-no").val(id);
    $("#uname").val(name);
    $("#uaddress").val(address);
    $("#ucust-Contact").val(contact);
}

function updateCustomer(customerID) {
    let customer = searchCustomer(customerID);
    if (customer != null) {
        customer.id = $("#ucust-no").val();
        customer.name = $("#uname").val();
        customer.address = $("#uaddress").val();
        customer.contact = $("#ucust-Contact").val();
        loadAllCustomers();
        return true;
    } else {
        return false;
    }

}

function searchCustomer(cusID) {
    for (let customer of customers) {
        if (customer.id == cusID) {
            return customer;
        }
    }
    return null;
}

// Delete Customer
$("#dcust-no").on('keyup' , function (event){
    if (event.code == "Enter"){
        let typedId = $("#dcust-no").val();
        let customer = searchCustomer(typedId);
        if (customer != null) {
            $("#dcust-name").val(customer.name)
        } else {
            alert("Can't find " + typedId);
        }
    }
})

$("#btnCusDelete").click(function () {
    let deleteID = $("#dcust-no").val();
    let deleteName = $("#dcust-name").val();

    let option = confirm("Do you really want to delete customer :" + deleteName);
    if (option){
        if (deleteCustomer(deleteID)) {
            alert("Customer Successfully Deleted..");
            $("#dcust-no").val(" ");
            $("#dcust-name").val(" ");
        } else {
            alert("Press Enter after type Customer No to search customer before delete!");
        }
    }
});

function deleteCustomer(customerID) {
    let customer = searchCustomer(customerID);
    if (customer != null) {
        let indexNumber = customers.indexOf(customer);
        customers.splice(indexNumber, 1);
        loadAllCustomers();
        return true;
    } else {
        return false;
    }
}

// Customer Validation process

const customerIDRegEx = /^(C)[0-9]{3}$/;
const customerNameRegEx = /^[A-z ]{5,20}$/;
const customerAddrRegEx = /^[0-9/A-z. ,]{5,}$/;
const customerContRegEx = /^(0)[0-9]{9}$/;

let customerValidations = [];
customerValidations.push({
    reg: customerIDRegEx,
    field: $('#cNo'),
    error: 'Customer ID Pattern is Wrong : C000',
    cato: "add"
});
customerValidations.push({
    reg: customerNameRegEx,
    field: $('#cName'),
    error: 'Customer Name Pattern is Wrong : A-z 5-20',
    cato: "add"
});
customerValidations.push({
    reg: customerAddrRegEx,
    field: $('#cAddress'),
    error: 'Customer Address Pattern is Wrong : 0-9',
    cato: "add"
});
customerValidations.push({
    reg: customerContRegEx,
    field: $('#cContact'),
    error: 'Customer Contact Pattern is Wrong : 100 or 100.00',
    cato: "add"
});
customerValidations.push({
    reg: customerIDRegEx,
    field: $('#ucust-no'),
    error: 'Customer ID Pattern is Wrong : C000',
    cato: "update"
});
customerValidations.push({
    reg: customerNameRegEx,
    field: $('#uname'),
    error: 'Customer Name Pattern is Wrong : A-z 5-20',
    cato: "update"
});
customerValidations.push({
    reg: customerAddrRegEx,
    field: $('#uaddress'),
    error: 'Customer Address Pattern is Wrong : 0-9',
    cato: "update"
});
customerValidations.push({
    reg: customerContRegEx,
    field: $('#ucust-Contact'),
    error: 'Customer Contact Pattern is Wrong : 100 or 100.00',
    cato: "update"
});

function defaultAllTextCustomer() {
    for (let validation of customerValidations) {
        validation.field.css("border", "1px solid #ced4da");
        validation.field.parent().children('span').text("");
    }

}

function defaultTextCustomer(txtField, error) {
    txtField.css("border", "1px solid #ced4da");
    txtField.parent().children('span').text(error);
}

function checkCustomerInput(regex, txtField) {
    let inputVal = txtField.val();
    return regex.test(inputVal) ? true : false;
}

function btnStateCustomer(txtType, stat) {
    if (txtType == "add") {
        if (stat == "success") {
            $('#btnAddCustomer').attr('disabled', false);
        } else if (stat == "fail") {
            $('#btnAddCustomer').attr('disabled', true);
        }
    } else if (txtType == "update") {
        if (stat == "success") {
            $('#btnCusUpdate').attr('disabled', false);
        } else if (stat == "fail") {
            $('#btnCusUpdate').attr('disabled', true);
        }
    }
}

function checkCustomerValidity() {
    for (let validation of customerValidations) {
        if (checkCustomerInput(validation.reg, validation.field)) {
            if (validation.field.val().length <= 0) {
                defaultTextCustomer(validation.field, "");
            } else {
                validation.field.css('border', '2px solid green');
                validation.field.parent().children('span').text("");
                btnStateCustomer(validation.cato, "success");
            }
        } else {
            if (validation.field.val().length <= 0) {
                defaultTextCustomer(validation.field, "");
            } else {
                validation.field.css('border', '2px solid red');
                validation.field.parent().children('span').text(validation.error);
                btnStateCustomer(validation.cato, "fail");
            }
        }
    }
}

$("#cNo,#cName,#cAddress,#cContact,#ucust-no,#ucust-Contact,#uname,#uaddress").on('keyup', function (event) {
    checkCustomerValidity();
});



