var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
//mario
var mario=[];
for(var mariopic, i = 0; i < 3; i++ ){
    mariopic = new Image;
    mariopic.src = "img/mario" + i + ".png";
    mario.push(mariopic);
  };
var marioHeight=50;
var marioWidth =20;
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
	for (var i = 0; i < brickCout; i++) { 
	    var brick = new Image();
	    brick.src ='img/ground.png';
	    ground_array[i] = {brick: brick, x:1, y:177};
	    ground_array[i].x = i*24.5;
	}
	for (var i = 0; i < ground_array.length; i++) { 
		ground_array[i].onload = function(n){
		    ctx.drawImage(ground_array[n].brick, ground_array[n].x, ground_array[n].y);
		}(i);
	}
	function drawground(){
	for (var i = 0; i < ground_array.length; i++) { 
		    ground_array[i].onload = function(n){
		        ctx.drawImage(ground_array[n].brick, ground_array[n].x, ground_array[n].y);
		    }(i);
		
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
	for (var i = 0; i < ground_array.length; i++) { 
	if(marioX>ground_array[i].x-12.25 && marioX<=ground_array[i].x+12.25){
	marioY=ground_array[i].y-27;
	if(upPressed){marioY=ground_array[i].y-60;}
	}
	else if(ground_array[i].x ==0){
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
    	ctx.drawImage(mariop,marioX,marioY);
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

function collisionDetection(){
	for(i=0;i<brickCout;i++){
		if(bricks_array[i].status==1){
		if(marioY>bricks_array[i].y && marioX>bricks_array[i].x-12.25 && marioX<=bricks_array[i].x+12.25){
			bricks_array[i].status=0;
			score++;
		}}
	}	
}
function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawMario();
	drawHighScore();
	drawScore();
	drawBricks();
	drawground();
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
	if(marioX> canvas.width-marioWidth){
			marioX=canvas.width-marioWidth;
	}
	else if(marioX<0){
		marioX =0;
	}
	if(marioY >canvas.height) {
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
