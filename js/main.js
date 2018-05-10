var container = document.getElementById('container');
var image = document.getElementById('base-image');
var count = 0;
var interval = 5;
isTimeToUpdate = function(){
    return count++ % interval ===0;
};
var mouse={
    _x:0,
    _y:0,
    x:0,
    y:0,
    updatePosition: function(event) {
        var e = event || window.event;
        this.x = e.clientX - this._x;
        this.y = (e.clientY - this._y) * -1;
    },
    setOrigin: function(e) {
        this._x = e.offsetLeft + Math.floor(e.offsetWidth/2);
        this._y = e.offsetTop + Math.floor(e.offsetHeight/2);
    },
    show: function() { return '(' + this.x + ', ' + this.y + ')'; }
};
function updateTransform(x,y) {
    var style= ("translate("+ 5*x +"px, "+  -15*y +"px) ");
    image.style.transform = style;
    image.style.webkitTransform = style;
    image.style.mozTransform = style;
    image.style.msTransform = style;
    image.style.oTransform = style;
}
function getMousePositionX(event) {
    return event.offsetWidth;
}
function onMouseEnterHandler(event){
    /*update(event);*/
    mouse.setOrigin(container);
}
function onMouseLeaveHandler(event){
    image.style = '';
}
function onMouseMoveHandler(event){
  if(isTimeToUpdate()){
      var e = event || window.event;
      var x = getMousePositionX(e);
      mouse.updatePosition(event);
      updateTransform((mouse.x/image.offsetWidth ).toFixed(2),(mouse.y/image.offsetHeight).toFixed(2));
  }
}
container.onmouseenter = function (){onMouseEnterHandler(event)};
container.onmouseleave = function (){onMouseLeaveHandler(event)};
container.onmousemove = function (){onMouseMoveHandler(event)};


/*========== Script for Canvas Clock ===========*/
var canvas = document.getElementById('clock');
var ctx = canvas.getContext('2d');
var radius = canvas.height/2;
ctx.translate(radius, radius);
function drawClock(){
    drawClockFace(ctx);
    drawNumbers(ctx);
    drawTime(ctx);
}
function drawClockFace(ctx) {
    ctx.beginPath();
    ctx.arc(0,0,radius,0,2*Math.PI);
    ctx.fillStyle = "#FFF";
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.strokeStyle = '#252525';
    ctx.beginPath();
    ctx.arc(0,0,radius*0.1,0,2*Math.PI);
    ctx.fill();
    ctx.fillStyle = "#252525";
}
function drawNumbers(ctx) {
    var ang;
    var num;
    ctx.font = radius*0.15 + 'px Arial';
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for(num=1;num<13;num++){
        ang = num*Math.PI/6;
        ctx.rotate(ang);
        ctx.translate(0,-radius*0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(),0,0,);
        ctx.rotate(ang);
        ctx.translate(0,radius*0.85);
        ctx.rotate(-ang);
    }
}
function drawTime(ctx) {
    var now = new Date();
    var hours = now.getHours();
    var mins = now.getMinutes();
    var sec = now.getSeconds();
    //hour
    hours = hours%12;
    hours = (hours*Math.PI/6)+ (mins*Math.PI/6*60) + (sec*Math.PI/6*360);
    drawHand(ctx, hours, radius*0.4, radius*0.07);
    mins = (mins*Math.PI/30) + (sec*Math.PI/30*60);
    drawHand(ctx, mins, radius*0.6, radius*0.05);
    sec = (sec*Math.PI/30);
    drawHand(ctx, sec, radius*0.7, radius*0.02);
}
function drawHand(ctx, deg, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.rotate(deg);
    ctx.moveTo(0,0);
    ctx.lineTo(0, -length);
    ctx.strokeStyle = "#252525";
    ctx.stroke();
    ctx.rotate(-deg);
}
setInterval(drawClock, 1000);
/*========== Script for Canvas Clock ends ======*/