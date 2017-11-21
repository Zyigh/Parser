(function () {
    window.xhr = new XHR();

    function XHR () {
        var that = this;

        function getHttpRequest() {
            var httpRequest = false;

            if (window.XMLHttpRequest) { // Mozilla, Safari,...
                httpRequest = new XMLHttpRequest();
                if (httpRequest.overrideMimeType) {
                    httpRequest.overrideMimeType('text/xml');
                }
            }
            else if (window.ActiveXObject) { // IE
                try {
                    httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
                }
                catch (e) {
                    try {
                        httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
                    }
                    catch (e) {
                    }
                }
            }

            if (!httpRequest) {
                alert('Abandon :( Impossible de créer une instance XMLHTTP');
                return false;
            }

            return httpRequest
        }

        this.get_resources = function(json_path) {
            return new Promise(
                function (res, rej) {
                    var xhr = getHttpRequest();
                    xhr.open('GET', json_path);
                    xhr.setRequestHeader('Accept', 'application/json');
                    xhr.setRequestHeader('X-Requested-With', 'xmlhttprequest')
                    xhr.onreadystatechange = function () {
                        if (4 === xhr.readyState) {
                            if (200 === xhr.status) {
                                res(JSON.parse(xhr.responseText));
                            } else {
                                rej('Error occured. Xhr status code : ' + xhr.status);
                            }
                        }
                        if (1 === xhr.readyState) {
                            console.log('processing...');
                        }
                    };
                    xhr.send();
                }
            )
        };
    }

})();
