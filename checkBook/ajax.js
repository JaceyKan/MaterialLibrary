// 封装ajax
function ajax(url, method, param, dataType, callback) {
	var xhr = null;
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else {
		xhr = new ActiveXObject('Microsoft.XMLHttpRequest');
	}

	if (method === 'get') {
		url += '?' + param;
	}
	xhr.open(method, url, true);

	var d = null
	if (method === 'post'){
		d = param;
		xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	}
	xhr.send(d);

	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4 && xhr.status == 200) {
			var data = xhr.responseText;
			if (dataType == 'json') {
				data = JSON.parse(data);
			}
			callback(data);
		}
	}
}