var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
function random(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
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
		ctx.arc(this.x,this.y,this.radius,0,Math.Pi*2,false);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();
	}
	onclick(x,y){
		if((x-this.x)*(x-this.x)+(y-this.y)<=this.radius*this.radius){
			this.color='rgb('+random(0,255)+','+random(0,255)+','+random(0,255)+')';
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
		if(x>=this.x&&x<=this.width && y>=this.y && y<=this.y +this.height){
			this.x+=10;
		}
	}
}
function onclick(event){
	var rect = canvas.getBoundingClientRect();
	var x = event.clientX-rect.left;
	var y=event.clientY-rect.top;
	for(var i=0;i<figures.length;i++){
		figures[i].onclick(x,y);
	}
}
var figures=[new Ball(),new Box(), new Box(), new Ball(), new Ball(), new Box(), new Box(),new Ball()];
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
