function loadDerivative() {
	var request = new XMLHttpRequest();
	request.open('GET', 'http://localhost:4567/differentiate/x/x', true);
	request.onload = function () {
		console.log(this.response)
		var header = document.getElementById("header2")
		header.innerHTML = this.response
	}

	request.send();
}