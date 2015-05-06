var keys = document.querySelectorAll('#calculator span');
var operators = ['+', '-', 'x', '/', 'X', '*'];
var dec = false;
document.addEventListener("keypress", keyCalc, false);
function keyCalc(e){
	var allow = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '=', 'c', 'C', '.'];
	var keyCode = e.which || e.keyCode;
	var keyVal = String.fromCharCode(keyCode);
	if(allow.indexOf(keyVal)==-1 && operators.indexOf(keyVal)==-1){
		alert("Invalid input");
	}
	else
		calc(keyVal);
} 
for(var i = 0; i < keys.length; i++) {
	keys[i].onclick = function(e) {
		var btnVal = this.innerHTML;
		calc(btnVal);	 
	}
}
function calc(val)
{
	var input = document.querySelector('.screen');
	var inputVal = input.innerHTML;
	if(inputVal.indexOf("/0")!=-1)
	{
		alert("Cannot divide by zero");
		input.innerHTML ="";
		return;
	}
	if(val == 'C' || val == 'c') {
		input.innerHTML = '';
		dec = false;
	}
	else if(val == '=') {
		var equation = inputVal;
		var lastChar = equation[equation.length - 1];
		equation = equation.replace(/x/g, '*');		
		equation = equation.replace(/X/g, '*');		
		if(operators.indexOf(lastChar) > -1 || lastChar == '.')
			equation = equation.replace(/.$/, '');
		if(equation)
		{
			input.innerHTML = eval(equation);
		}
		dec = false;
	}
	else if(operators.indexOf(val) > -1) {
		var lastChar = inputVal[inputVal.length - 1];
		if(inputVal != '' && operators.indexOf(lastChar) == -1) 
			input.innerHTML += val;
		else if(inputVal == '' && val == '-') 
			input.innerHTML += val;
		if(operators.indexOf(lastChar) > -1 && inputVal.length > 1) {
			input.innerHTML = inputVal.replace(/.$/, val);
		}
		dec = false;
	}
	else if(val == '.') {
		if(!dec) {
				input.innerHTML += val;
				dec = true;
		}
		else
			alert("Invalid no");
	}
	else {
		var l1 = inputVal.length;
		if((inputVal[l1-1]=='0' && l1==1) || (inputVal[l1-1]=='0' && operators.indexOf(inputVal[l1-2])>-1 ))
		{
			input.innerHTML = inputVal.replace(/.$/, val);
		}
		else
			input.innerHTML += val;
	}
}
