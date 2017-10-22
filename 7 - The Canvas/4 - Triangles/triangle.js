/**
 * Created by Mark on 10/19/2017.
 */
window.onload = function(){
    var canvas = document.getElementById("triangulator");
    var context = canvas.getContext("2d");

    context.beginPath();
    context.moveTo(100, 150);
    context.lineTo(250, 75);
    context.lineTo(125, 30);
    context.closePath();

    context.lineWidth  = 5;
    context.stroke();

    context.fillStyle = "red";
    context.fill();
};
