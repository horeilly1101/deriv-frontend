/**
 * Query the back end to get the derivative of a given expression.
 * Retrieves this expression from a textfield in the html.
 * Installs the derivative in the html.
 */
function loadDerivative() {
	// create request and get inputs
	var request = new XMLHttpRequest()
	var expr = document.getElementById("exprInput").value
	var variable = document.getElementById("varInput").value

	// create url
	var url = 'http://localhost:4567/differentiate/' + cleanInput(expr) + '/' + cleanInput(variable)

	// describe the request
	request.open('GET', url, true)

	request.onload = function () {
		var header = document.getElementById("header")
		
		if (request.status != 400) {
			// insert the derivative into the web page
			var obj = JSON.parse(this.response)
			header.innerHTML = "$$\\frac{\\partial}{\\partial " + obj.data.var + "}\\Big[" + obj.data.expression + "\\Big] = " + obj.data.result + "$$"

			// tell MathJax to compile the new html element to latex
			MathJax.Hub.Queue(["Typeset",MathJax.Hub, header])
		} else {
			// insert an error message into the web page
			header.innerHTML = "$invalid$ $inputs$"
			MathJax.Hub.Queue(["Typeset",MathJax.Hub, header])
		}
	}

	// send the request
	request.send()
}

/**
 * Replace all 'unsafe' url characters with their escaped equivalents.
 * (e.g. replace '/' with '%2F')
 * @param {String} input string to be cleaned
 * @return cleaned string
 */
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