(function(){
	"use strict";


	var el = function(element) {
		if (element.charAt(0) === "#") { // если первый элемент # что значит id
		  return document.querySelector(element); // ... возвращаем один элемент
		}

		return document.querySelectorAll(element); // Иначе возвращаем коллекцию элементов
	};

	var viewer = el("#viewer"), //экран калькулятора, где отображается результат
		equal = el("#equals"), //кнопка равно
		nums = el(".num"),		//Список чисел
		ops = el(".ops"),// Список операторов
		obg,
		theNum = "",// Текущее число
		memory = 0,// Первое число
		args,
		resultNum,// Результат
		operator;//оператор

	var setNum = function() {
		if(resultNum) { // если результат был выведен на экран сбросить число
			theNum = this.getAttribute("data-num");
			resultNum = "";
		}else { // иначе добаить следующий цифру к пердыдущему(В строку!)
			theNum += this.getAttribute("data-num");
		}
		viewer.innerHTML = theNum;
	};

	var moveNum = function(){
		
		if(theNum){
			theNum = parseFloat(theNum);
			operator = this.getAttribute("data-ops");
			equal.setAttribute("data-result", "")
			if(memory  == 0){
				memory = theNum;
				args = operator;
				theNum = "";
			}else if (memory != 0 && args != operator){

				if(args == "plus"){
					memory = sum(memory,theNum)
					theNum = "";
					args = operator;	
				}else if (args == "minus"){
					memory = mns(memory,theNum)
					theNum = "";
					args = operator;
				}else if (args == "mult"){
					memory = mult(memory,theNum)
					theNum = "";
					args = operator;
				}else if (args == "sep"){
					memory = sep(memory,theNum)
					theNum = "";
					args = operator;
				}
			}else {
				if(operator == "plus"){
					memory = sum(memory,theNum)
					theNum = "";
				}else if (operator == "minus"){
					memory = mns(memory,theNum)
					theNum = "";
				}else if (operator == "mult"){
					memory = mult(memory,theNum)
					theNum = "";
				}else if (operator == "sep"){
					memory = sep(memory,theNum)
					theNum = "";
				}
			}	
		}
		viewer.innerHTML = memory;
		return memory;
	};
	var clearAll = function() {
		memory = 0;
		theNum = "";
		viewer.innerHTML = "0";
		equal.setAttribute("data-result", resultNum);
	};
	function displayNum(){
		resultNum = moveNum.apply(this);
		memory = 0;
		theNum = resultNum;
		if (!isFinite(resultNum)) {
			el('#calculator').classList.add("animated");
			el('#calculator').classList.add("hinge"); // Ломает Калькулятор
			el('#reset').classList.add("show"); // Обновляет страницу
		}
		viewer.innerHTML = resultNum;

	}
function sum(a,b){
	return a + b;
}
function mns(a,b){
	return a - b;
}
function mult(a,b){
	return a * b;
}
function sep(a,b){
	return a / b;
}

// Присваеваем событие клика для чисел
for (var i = 0, l = nums.length; i < l; i++) {
	nums[i].onclick = setNum;
}
// Присваеваем событие клика для оператора
for (var i = 0, l = ops.length; i < l; i++) {
	ops[i].onclick = moveNum;
}

// Добавить событие клик на знак равно
	equal.onclick = displayNum;

// Событие на очистку
	el("#clear").onclick = clearAll;

// Ресетит страницу
	el("#reset").onclick = function() {
		window.location = window.location;
	};



}());