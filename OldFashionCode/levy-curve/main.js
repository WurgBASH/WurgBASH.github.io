$( document ).ready( function() {
    //объявление констрант
    var $canvas         = $( 'canvas#my_canvas' );
    var ctx             = $canvas[0].getContext('2d');
    var canvas_width    = 820;
    var canvas_height   = 540;
    var x               = 410-300/2; // x
    var y               = 270-300/3; // y
    var len             = 300;       // длина
    var alpha_angle     = 0; // угол
    var iteration_count = 8; // итерации
    var line_width      = 2;

    var default_angle   = 45;

    var colors = [ '#00FF00', '#00FF00', '#00FF00', '#00FF00' ];
    
    var toRadians = function( d ) {
    return Math.PI*(d/180.0);
    };
    
    var paint = function(ctx) {
        c_curve(x, y, len, alpha_angle, iteration_n, ctx);
    };

    var mrand_i = function(max) {
    return Math.floor( Math.random()*max );
    };

//главная функция рисования
    var draw = function() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,820,540);

    iteration_count = getIntegerInput('iterations');
    line_width      = getIntegerInput('line_width');
    anim_speed      = getIntegerInput('anim_speed');


    var i = 1;                    

    function myLoop () {           
       setTimeout(function () {  
        ctx.fillRect(0,0,820,540); 
        //построение фрактала
          c_curve( x, y, len, alpha_angle, i, ctx );      
          i++;                     
          if (i < iteration_count) {            
             myLoop();            
          }                       
       }, anim_speed)
    }

    myLoop();                  
   

    };
    //функция для построения итерации фрактала
    var c_curve = function( x, y, length, angle, iteration, ctx  ) {
        var alpha  = angle;
        if( iteration > 0 ) {
            length = (length / Math.sqrt(2));
            c_curve(x, y, length, (alpha + default_angle), (iteration - 1), ctx ); // рекурсия
            x = (x + (length * Math.cos(toRadians(alpha + default_angle))));
            y = (y + (length * Math.sin(toRadians(alpha + default_angle))));
            c_curve(x, y, length, (alpha - default_angle), (iteration - 1), ctx ); // рекурсия
        } else {
            ctx.strokeStyle = colors[ mrand_i(colors.length+1) ]; 
        ctx.lineWidth   = line_width;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo( x, y );
        ctx.lineTo( x + (length * Math.cos(toRadians(alpha))),
            y + (length * Math.sin(toRadians(alpha))) );
        ctx.stroke();
        }
    };
    draw();  

    //если пользователь ввел что-то новое перерисовываем фрактал
    $( 'input#iterations' ).change( draw );
    $( 'input#line_width' ).change( draw );
    $( 'input#anim_speed' ).change( draw );
   
} );


var getFloatInput = function(id) {
    return parseFloat( document.getElementById(id).value );
}

var getIntegerInput = function(id) {
    return parseInt( document.getElementById(id).value );
}

