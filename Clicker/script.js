var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
function random(min, max) {
    return min+Math.round(Math.random()*(max-min));
  }
class Figure{
	constructor(){
		this.x=random(0, canvas.width);
		this.y=random(0, canvas.height);
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
		}
	}
}
var figures=[new Ball(),new Box(), new Box(), new Ball(), new Ball(), new Box(), new Box(),new Ball()];
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
	ctx.fillStyle='rgba(0,0,0,0.25)';
	ctx.fillRect(0,0,canvas.width,canvas.height);
	for(var i = 0; i<figures.length;i++){
		figures[i].draw();
	}
}

setInterval(draw,10);
document.addEventListener("mousedown",onclick,false);
