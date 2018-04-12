function Form(el){
    let elem = el;
    let resultEl = elem.getElementsByClassName('result')[0]; //нашли блок, в который будем выводить результат
    let inputs = [];
    var button=elem.getElementsByTagName('input')[1];
    let enter =false;
	
    //вспомогательные (приватные) функции	
	function pushElemsByTag(tag){ //добавляем элементы формы по тегу к inputs
		let inp;
		let inputElems = elem.getElementsByTagName(tag); //получим все элементы нужного типа	
        for (let i of inputElems) {//в зависимости от типа элемента формы воспользуемся разными конструкторами
			switch(i.getAttribute("type")){
				case "radio": inp = new Radio(i); break;
				case "checkbox": inp = new Checkbox(i); break;
				default: inp = new Input(i);
			}
			inputs.push(inp); //добавляем элемент в массив
        }
	}
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
        return res.split("").reverse().join("");
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
    		case "0": return "Вы не выбрали систему"; 
    		case "1":sys.innerHTML = "Перевести в бинарный код";return binary(val); break;
    		case "2":sys.innerHTML = "Перевести в десятичный код"; return decimal(val); break;
    	}
		/*let res ="";
		while(val != 0)
		{
			if(val%2==0){
				res+='0';
			}else{
				res+='1';
			}
			val=parseInt(val/2);
		}
        return res.split("").reverse().join("");;*/
    };
	button.onclick=showResult();
	function showResult(){
		resultEl.innerHTML = ""+total();
	}
	
	this.init = function(){//заполним массив inputs
		pushElemsByTag('input'); //получим все input(s)	
		pushElemsByTag('select'); //получим все select(s)		
    };
	elem.onclick = function(event){ //обработка клика по форме - слушаем клик по всей html-форме
		let target = event.target; //куда кликнули, если на input или select - выводим результат
		if (target.closest('input')|| target.closest('select'))
			showResult();
			console.log(target); //информация в консоль для отладки
	};
}

function Input(el){
    let elem = el;
	function getValue(){
		return el.value;
	}
	this.value = getValue;
}
function Radio(el){
    Input.call(this);
    function getValue(){
		if (el.checked)//если элемент выбран, то берем его значение, если нет - возвращаем 0
			return el.value;
		return 0;
    }
    this.value = getValue;
}
let form = new Form(document.forms["notation"]);
form.init();
