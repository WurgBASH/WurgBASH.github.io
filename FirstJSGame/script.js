var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var brickRowCount =3;
var brickColumnCout=7;
var brickWidth=75;
var brickHeight=20;
var brickPadding =10;
var brickOffsetTop=30;
var brickOffsetLeft=30;
var brickColor=["#8A2BE2","#9400D3","#DDA0DD"];
var bricks=[];
for(c=0;c<brickColumnCout;c++){
	bricks[c]=[];
	for(r=0;r<brickRowCount;r++){
		bricks[c][r]={x:0,y:0,status:1};
		bricks[c][r].x=(c*(brickWidth+brickPadding))+brickOffsetLeft;
		bricks[c][r].y=(r*(brickHeight+brickPadding))+brickOffsetTop;
	}
}
var paddleHeight=20;
var paddleWidth =75;
var paddleX = (canvas.width-paddleWidth)/2;
var paddleY=295;
var rightPressed=false;
var leftPressed=false;
var paddleColor="#FF69B4";
var score=0;
var highscore=0;
function drawHighScore(){
	ctx.font="16px Arial";
	highscore=document.cookie.split('=')[1];
	ctx.fillStyle="#0095DD";
	ctx.fillText("HScore: "+highscore,100,20);
}
function drawScore(){
	ctx.font="16px Arial";
	ctx.fillStyle="0095DD";
	ctx.fillText("Score: " +score,8,20);
}
function drawPaddle(){
    ctx.beginPath();
    drawBricks();
    ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = paddleColor;
    ctx.fill();
    ctx.closePath();
}
function drawBricks(){
	for(c=0;c<brickColumnCout;c++){
		for(r=0;r<brickRowCount;r++){
			if(bricks[c][r].status==1){
				ctx.beginPath();
				ctx.rect(bricks[c][r].x,bricks[c][r].y,brickWidth,brickHeight);
				ctx.fillStyle=brickColor[r];
				ctx.fill();
				ctx.closePath();
			}
		}
	}
}
function collisionDetection(){
	for(c=0;c<brickColumnCout;c++){
		for(r=0;r<brickRowCount;r++){
			var b=bricks[c][r];
			if(score==brickRowCount*brickColumnCout){
				if(score>highscore){
					document.cookie="highscore="+score;}
				alert("YOU WIN, YOUR SCORE: "+score);
				document.location.reload();
			}
			if(b.status==1){
				if(x>b.x && x<b.x+brickWidth && y>b.y && y<b.y+brickHeight){
					dy=-dy;
					b.status=0;
					score++;
				}
			}
		}
	}
}
function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawPaddle();
	drawHighScore();
	drawScore();
	drawBricks();
	highscore=document.cookie.split('=')[1];
	if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
    dx = -dx;
	}
	if(y + dy < ballRadius) {
    dy = -dy;
	}
	if(rightPressed){
		paddleX +=5;
	}
	else if(leftPressed){
		paddleX -=5;
	}
	if(paddleX> canvas.width-paddleWidth){
			paddleX=canvas.width-paddleWidth;
	}
	else if(paddleX<0){
		paddleX =0;
	}

	if(y+dy >canvas.height) {
			y = canvas.height-30;
			if(score>highscore){
					document.cookie="highscore="+score;}
			alert("GAME OVER, YOUR SCORE: "+score);
			document.location.reload();
	}
	if(y+dy<ballRadius){
		dy=-dy;
	}
	else if(y+dy >canvas.height-ballRadius-20){
		if(x>paddleX && x<paddleX+paddleWidth){
			dy=-dy;
		}
	}
	
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#FF4500";
    ctx.fill();
    ctx.closePath();
    x += dx;
    y += dy;
    collisionDetection()
}
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler,false);
function keyDownHandler(e){
	if(e.keyCode==39){
		rightPressed=true;
	}
	else if(e.keyCode==37){
		leftPressed=true;
	}
}
function keyUpHandler(e){
	if(e.keyCode==39){
		rightPressed=false;
	}
	else if(e.keyCode==37){
		leftPressed=false;
	}
}
function mouseMoveHandler(e){
	var relativeX=e.clientX-canvas.offsetLeft;
	if(relativeX>0 && relativeX<canvas.width){
		paddleX =relativeX-paddleWidth/2;
	}
}
setInterval(draw, 10);
