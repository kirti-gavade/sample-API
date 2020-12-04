var product = [];
var totalAmount = 0;
var customerName = '';
var customerId = null;
var selected;
function getProduct(name, price) {
    event.preventDefault();
    //customerId = document.getElementById("customerId").value;
    customerData = document.getElementById("customerId");
    var selected = customerData.options[customerData.selectedIndex].dataset;
    customerName = selected.mname;
    customerId = selected.mid;
    console.log(product[0]);
    console.log(selected.mname, selected.mid);
        product.push({
            "productName": name,
            "price": price
        });
        totalAmount = totalAmount + price;
   
        let productname = name;
        let productprice = price;
        console.log(productname);
        $('#orderDetails').append(productname + '</br>');
        $('#productPrice').append(productprice + '</br>');
        $('#totalAmount').text(totalAmount);
}
function isInArray(value, array) {
    return array.indexOf(value) > -1;
  }

document.getElementById("placeOrderId").addEventListener("click", placeOrder);
function placeOrder() {
    
    let payload = { orderDetails: product, totalAmount: totalAmount, customerId: customerId, customerName: customerName }
    console.log(payload);
    $.ajax({
        url:  "http://localhost:3000/api/order",
        method:  "POST",
        traditional: true,
        data: JSON.stringify(payload),
        contentType:  "application/json",
        success: function () {
            console.log("successfully processed.");
        },
        error: function (e) {
            console.log(e);
        }
    });
    window.alert("Your order has been placed successfully!!");
    window.location.reload(true);
}

