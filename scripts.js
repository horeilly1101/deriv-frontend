function loadDerivative() {
	var request = new XMLHttpRequest()
	var expr = document.getElementById("exprInput").value
	var variable = document.getElementById("varInput").value

	var url = 'http://localhost:4567/differentiate/' + cleanInput(expr) + '/' + cleanInput(variable)

	request.open('GET', url, true)

	request.onload = function () {
		var header = document.getElementById("header")
		
		if (request.status != 400) {
			console.log(this.response)
			var obj = JSON.parse(this.response)
			header.innerHTML = "$$\\frac{\\partial}{\\partial " + obj.data.var + "}[" + obj.data.expression + "] = " + obj.data.result + "$$"
			MathJax.Hub.Queue(["Typeset",MathJax.Hub, header])
		} else {
			header.innerHTML = "$invalid$ $inputs$"
			MathJax.Hub.Queue(["Typeset",MathJax.Hub, header])
		}
	}

	request.send()
}

function cleanInput(input) {
	newStr = ""
	for (char of input) {
		switch(char) {
			case "/":
				newStr += "%2F"
				break
			case "^":
				newStr += "%5E"
				break
			case "[":
				newStr += "%5B"
				break
			case "]":
				newStr += "%5D"
				break
			case " ":
				break
			default:
				newStr += char
				break
		}
	}

	return newStr
}