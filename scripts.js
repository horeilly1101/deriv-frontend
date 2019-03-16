function loadDerivative() {
	var request = new XMLHttpRequest()
	var expr = document.getElementById("exprInput").value
	request.open('GET', 'http://localhost:4567/differentiate/' + expr + '/x', true)
	request.onload = function () {
		var header = document.getElementById("header2")
		var obj = JSON.parse(this.response)
		header.innerHTML = obj.data.result
	}

	request.send();
}