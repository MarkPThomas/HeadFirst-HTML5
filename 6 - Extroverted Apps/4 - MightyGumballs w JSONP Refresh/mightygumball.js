/**
 * Created by Mark on 12/21/2016.
 */
window.onload = function(){
    setInterval(handleRefresh, 3000);
};

function handleRefresh(){
    var url = "http://gumball.wickedlysmart.com/" +
              "?callback=updateSales" +
              "&lastreporttime=" + lastReportTime;
    // Note: Due to browser caching, the old data may be retrieved.
    // In order to trick the browser into refreshing the data, the URL is changed slightly,
    // adding a random number onto the end.
    url += "&random=" + (new Date()).getTime();

    var newScriptElement = document.createElement("script");
    newScriptElement.setAttribute("src", url);
    newScriptElement.setAttribute("id", "jsonp");

    var oldScriptElement = document.getElementById("jasonp");
    var head = document.getElementsByTagName("head")[0];
    if (oldScriptElement == null) {
        head.appendChild(newScriptElement);
    } else {
        head.replaceChild(newScriptElement, oldScriptElement);
    }
}

var lastReportTime = 0;
function updateSales(sales){
    var salesDiv = document.getElementById("sales");
    for (var i = 0; i < sales.length; i++) {
        var sale = sales[i];
        var div = document.createElement("div");
        div.setAttribute("class", "saleItem");
        div.innerHTML = sale.name + " sold " + sale.sales + " gumballs";
        salesDiv.appendChild(div);
    }
    if (sales.length > 0){
        lastReportTime = sales[sales.length-1].time;
    }
}