(function() {
    window.Parser = new Parser();

    function Parser() {
        this.test = function () {
            console.log('ça marche');
        };

        var display = function (html_node) {
           var tag = document.createElement(html_node.tag);
           for (attribute in html_node.attributes) {
               tag.setAttribute(attribute, html_node.attributes[attribute]);
           }
           tag.innerHTML = html_node.bindings;

           html_node.children.map(function (child) {
              tag.appendChild(display(child));
           });

           return tag;
        };

        return {
            parse : function (start_point, json_path) {
                xhr.get_resources(json_path)
                    .then(function (html) {
                        html.map(function (node) {
                            start_point.appendChild(display(node));
                        });
                    });
            }
        };

    }

})();
