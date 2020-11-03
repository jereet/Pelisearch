function ajaxCall(url, callback) {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = () => {
        if (xmlhttp.readyState == 4 || xmlhttp.status == 200) {
            let resultado = JSON.parse(JSON.stringify(xmlhttp.response));
            callback(resultado);
        }
    }
    xmlhttp.responseType = "json";
    xmlhttp.open('GET', url, true);
    xmlhttp.send();
}