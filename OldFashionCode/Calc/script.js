function Form(el){
    let elem = el;
    let resultEl = elem.getElementsByClassName('result')[0]; //нашли блок, в который будем выводить результат
    let inputs = [];
   	let button=elem.getElementsByTagName('input')[1];
	function binary(val)
	{
    	let res ="";
		while(val != 0)
		{
			if(val%2==0){
				res+='0';
			}else{
				res+='1';
			}
			val=parseInt(val/2);
		}
		if(res!=""){
        	return res.split("").reverse().join("");
		}else{
			return 0;
		}
    };
    function decimal(val)
    {
    	let res =0;
    	for(var i=val.length-1,c = 0; i>=0; i--, c++)
    	{
    		if(val[i] <0 || val[i] >1) return "Странный у вас двоичный код";
    		if(val[i] == 1)
    		{
    			res+=Math.pow(2,c);
    			console.log(res);
    		}
    	}
    	return res;
    }
    function total(){ //складываем value всех элементов
    	let sys = elem.getElementsByTagName('label')[1];
    	let sel = document.getElementsByTagName("select")[0];
    	sel = sel.value; 
    	let val = document.getElementsByTagName("input")[0];
		val = val.value; 
    	switch(sel){
    		case "0":sys.innerHTML = "Перевести в..."; return "Вы не выбрали систему"; 
    		case "1":sys.innerHTML = "Перевести в бинарный код";return binary(val); break;
    		case "2":sys.innerHTML = "Перевести в десятичный код"; return decimal(val); break;
    	}
    };
	button.onclick=showResult();
	function showResult(){
		resultEl.innerHTML = ""+total();
	}
	elem.onclick = function(event){ //обработка клика по форме - слушаем клик по всей html-форме
		let target = event.target; //куда кликнули, если на input или select - выводим результат
		if (target.closest('input')|| target.closest('select'))
			showResult();
			console.log(target); //информация в консоль для отладки
	};
}
let form = new Form(document.forms["notation"]);
form.init();
