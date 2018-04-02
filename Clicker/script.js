var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
class Figure{
	constructor(){
		this.x=Math.random(0, canvas.width);
		this.y=Math.random(0, canvas.height);
		this.color='rgb('+Math.random(0,255) + ','+Math.random(0,255)+','+Math.random(0,255)+')';
	}
}
class Ball extends Figure{
	constructor(){
		super();
		this.radius=Math.random(10,50);
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
			this.color='rgb('+Math.random(0,255)+','+Math.random(0,255)+','+Math.random(0,255)+')';
		}
	}
}
class Box extends Figure{
	constructor(){
		super();
		this.width=Math.random(10,50);
		this.height=Math.random(10,50);
	}
	draw(){
		ctx.beginPath();
		ctx.rect(this.x,this.y,this.width,this.height);
		ctx.fillStyle=this.color;
		ctx.fill();
		ctx.closePath();
	}
	onclick(x,y){
		if(x>=this.x&&x<=thix.width && y>=this.y && y<=this.y +this.height){
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
	ctx.fillStyle='rgba(0,0,0,0.25)';
	ctx.fillRect(0,0,canvas.width,canvas.height);
	for(var i = 0; i<figures.length;i++){
		figures[i].draw();
	}
}

setInterval(draw,10);
document.addEventListener("mousedown",onclick,false);