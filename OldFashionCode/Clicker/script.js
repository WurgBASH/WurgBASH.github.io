var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var score = 0;
function random(min, max) {
    return min+Math.round(Math.random()*(max-min));
  }
  function drawScore(){
	ctx.font="16px Arial";
	ctx.fillStyle="0095DD";
	ctx.fillText("Score: " +score,8,20);
}
class Figure{
	constructor(){
		this.x=random(0, canvas.width);
		this.y=random(0, canvas.height);
		this.sc=random(0,5);
		this.color='rgb('+random(0,255) + ','+random(0,255)+','+random(0,255)+')';
	}
}
class Ball extends Figure{
	constructor(){
		super();
		this.radius=random(10,50);
	}
	draw(){
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.radius,0,2*Math.PI,false);
		ctx.fillStyle=this.color;
		ctx.fill();
		ctx.closePath();
	}
	onclick(x,y){
		if((x-this.x)*(x-this.x)+(y-this.y)*(y-this.y)<=this.radius*this.radius){
			score+=this.sc;
			this.color='rgb('+random(0,255) + ','+random(0,255)+','+random(0,255)+')';
		}
	}
}
class Box extends Figure{
	constructor(){
		super();
		this.width=random(10,50);
		this.height=random(10,50);
	}
	draw(){
		ctx.beginPath();
		ctx.rect(this.x,this.y,this.width,this.height);
		ctx.fillStyle=this.color;
		ctx.fill();
		ctx.closePath();
	}
	onclick(x,y){
		if(x>=this.x&&x<=this.x+this.width && y>=this.y && y<=this.y +this.height){
			this.x+=10;
			score+=this.sc;
		}
	}
}
class Aim extends Figure{
	constructor(){
		super();
	}
	draw(){
		var pic = new Image();
		pic.src='1.png';
		pic.onload = function(){
			ctx.drawImage(pic,50,20);
		}
	}
	onclick(x,y){
		if(x>=this.x&&x<=this.x+128 && y>=this.y&& y<=this.y+128){
			this.x +=10;
			score+=this.sc;
		}
	}
}
var figures=[ new Ball(),new Box(), new Box(), new Ball(),new Aim(), new Ball(), new Box(), new Box(),new Ball()];
function onclick(event){
	var rect = canvas.getBoundingClientRect();
	var x = event.clientX-rect.left;
	var y=event.clientY-rect.top;
	for(var i=0;i<figures.length;i++){
		figures[i].onclick(x,y);
	}
}
function draw(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawScore();
	ctx.fillStyle='rgba(0,0,0,0.25)';
	ctx.fillRect(0,0,canvas.width,canvas.height);
	for(var i = 0; i<figures.length;i++){
		figures[i].draw();
	}
}

setInterval(draw,10);
document.addEventListener("mousedown",onclick,false);
