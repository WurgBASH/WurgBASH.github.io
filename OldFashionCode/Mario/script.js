var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
//mario
var mario=[];
for(var mariopic, i = 0; i < 3; i++ ){
	mariopic = new Image;
	mariopic.src = "img/mario" + i + ".png";
	mario.push(mariopic);
};
var marioX =0;
var marioY=150;
var rightPressed=false;
var leftPressed=false;
var upPressed=false;
//bricks
var brickCout=25;
var bricks_array = [];
for (var i = 0; i < brickCout; i++) { 
	var brick = new Image();
	brick.src ='img/brick.png';
	bricks_array[i] = {brick: brick, status:1, x:1, y:95};
	bricks_array[i].x = i*24.5;
}
for (var i = 0; i < bricks_array.length; i++) { 
	if(bricks_array[i].status==1){
		bricks_array[i].onload = function(n){
			ctx.drawImage(bricks_array[n].brick, bricks_array[n].x, bricks_array[n].y);
		}(i);
	}
}	
//ground
var groundCout=25;
var ground_array = [];
for(var j=0;j<2;j++){
	ground_array[j]=[];
	for (var i = 0; i < brickCout; i++) { 
		var brick = new Image();
		brick.src ='img/ground.png';
		ground_array[j][i] = {brick: brick, x:1, y:177, status:1};
		ground_array[j][i].x = j*105+(i*24.5);
		ground_array[j][i].y = 177+(j*60);
	}}
	for(var j=0;j<2;j++){
		for (var i = 0; i < brickCout; i++) { 
			ground_array[j][i].onload = function(n,s){
				ctx.drawImage(ground_array[s][n].brick, ground_array[s][n].x, ground_array[s][n].y);
			}(i,j);
		}}
		function drawground(){
			for(var j=0;j<2;j++){
				for (var i = 0; i < brickCout; i++) { 
					if(ground_array[j][i].status==1){
					ground_array[j][i].onload = function(n,s){
						ctx.drawImage(ground_array[s][n].brick, ground_array[s][n].x, ground_array[s][n].y);
					}(i,j);
				}
				}
			}
		}
//goomba
var goombaX = 500;
var goombaY = 158;
var goombadX = -2;
var goobadstatus=1;
function drawGoomba(){
	if(goobadstatus==1){
	var goomba = new Image();
	goomba.src = "img/goomba.png";
	goomba.onload = function(){
		ctx.drawImage(goomba, goombaX,goombaY,22,20);
	}
	if(goombaX> canvas.width-10){
			goombadX =-goombadX;
		}
		else if(goombaX<0){
			goombadX =-goombadX;
		}
	goombaX +=goombadX;
	if (upPressed && (marioX>goombaX-8 && marioX<goombaX+8)){
		goobadstatus=0;
	}
	}
}
//score
var score=0;
var highscore;
document.cookie="highscore="+score;
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
function drawMario(){
	var mario=[];
	var dex = 0;
	for (var i = 0; i < groundCout; i++) { 
		if(ground_array[dex][i].status==1){
			marioY=ground_array[dex][i].y-27;
			if(upPressed){marioY=ground_array[dex][i].y-60;}
			}
		else{
			marioY +=3;
			}
	}
	for(var mariopic, i = 0; i <= 3; i++ ){
		mariopic = new Image;
		mariopic.src = "img/mario" + i + ".png";
		mario.push(mariopic);
	};
	var mariop = mario[0];
	if(rightPressed){
		mariop=mario[2];
	}
	else if(leftPressed){
		mariop=mario[3];
	}
	else if(upPressed){
		mariop=mario[1];
	}
	mariop.onload = function(){
		ctx.drawImage(mariop,marioX,marioY, 18,28);
	}
	/*
    var mario = new Image();
	mario.src ='img/mario0.png';
    mario.onload = function(){
    ctx.drawImage(mario,marioX,marioY);
}*/
}

function drawBricks(){
	for (var i = 0; i < bricks_array.length; i++) { 
		if(bricks_array[i].status==1){
			bricks_array[i].onload = function(n){
				ctx.drawImage(bricks_array[n].brick, bricks_array[n].x, bricks_array[n].y);
			}(i);
		}
	}	
}
function thcoin(x,y) {
	var coin = new Image();
	coin.src = 'img/coin.png';
	coin.onload=function(){
	ctx.drawImage(coin, x, y-30);
	};
} 
function collisionDetection(){
	for(i=0;i<brickCout;i++){
		if(bricks_array[i].status==1){
			if(marioY>bricks_array[i].y && marioX>bricks_array[i].x-12.25 && marioX<=bricks_array[i].x+12.25){
				thcoin(bricks_array[i].x,bricks_array[i].y);
				bricks_array[i].status=0;
				score++;
			}
		}
	}
	if (marioY == goombaY && (marioX==goombaX || marioX==goombadX+goombaX || marioX==goombaX-goombadX)){
		goobadstatus=0;
	}	
	}
	function draw() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawMario();
		drawHighScore();
		drawScore();
		drawBricks();
		drawground();
		drawGoomba();
		if(rightPressed){
			marioX +=3.5;
		}
		else if(leftPressed){
			marioX -=3.5;
		}
		else if(upPressed){
			marioY -=9;
			collisionDetection();
			setTimeout(function(){marioY+=9}, 50);
		}
		if(marioX> canvas.width-20){
			marioX=canvas.width-20;
		}
		else if(marioX<0){
			marioX =0;
		}
		console.log("mario:",marioY);
		console.log(goombaY);
		console.log(goombadX);
		if(marioY >canvas.height || (marioX>goombaX-11 && marioX<goombaX+11 && marioY==150)){
			y = canvas.height-30;
			if(score>highscore)
				document.cookie="highscore="+score;
			alert("GAME OVER, YOUR SCORE: "+score);
			document.location.reload();
		}
    //collisionDetection();
}
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
function keyDownHandler(e){
	if(e.keyCode==39 ){
		rightPressed=true;
	}
	else if(e.keyCode==37){
		leftPressed=true;
	}
	else if(e.keyCode==38){
		upPressed=true;
	}
}
function keyUpHandler(e){
	if(e.keyCode==39){
		rightPressed=false;
	}
	else if(e.keyCode==37){
		leftPressed=false;
	}
	else if(e.keyCode==38){
		upPressed=false;
	}

}
setInterval(draw,10);
