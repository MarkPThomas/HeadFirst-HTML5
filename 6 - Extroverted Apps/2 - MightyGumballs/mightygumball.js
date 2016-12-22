/**
 * Created by Mark on 12/21/2016.
 */
window.onload = function(){
    var url = "http://localhost:63342/HeadFirst-HTML5/6 - Extroverted Apps/2 - MightyGumballs/sales.json";
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = function(){
        if(request.status == 200){
            updateSales(request.responseText);
        }
    };
    request.send(null);
};

function updateSales(responseText){
    var salesDiv = document.getElementById("sales");
    //salesDiv.innerHTML = responseText; // This was the original lazy implementation, displaying the JSON text.
    var sales = JSON.parse(responseText);
    for (var i = 0; i < sales.length; i++) {
        var sale = sales[i];
        var div = document.createElement("div");
        div.setAttribute("class", "saleItem");
        div.innerHTML = sale.name + " sold " + sale.sales + " gumballs";
        salesDiv.appendChild(div);
    }
}