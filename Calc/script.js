function Form(el){
    let elem = el;
    let resultEl = elem.getElementsByClassName('result')[0]; //нашли блок, в который будем выводить результат
    let inputs = [];
    var button=elem.getElementsByTagName('input')[1];
	
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
    function total(){ //складываем value всех элементов 
        let text = document.getElementsByTagName("input")[0];
		let val = text.value;
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
        return res.split("").reverse().join("");;
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


let form = new Form(document.forms["notation"]);
form.init();
