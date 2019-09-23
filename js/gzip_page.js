function input() {
    var input = document.getElementById('input').value;
    try {
        if (input.search("\\n")) {
            input = input.replace(/\\n/g, "");
        }
        var decode = unGzip(input);
        let output = JSON.stringify(JSON.parse(decode), null, 4);
        $("#output").text(output);
    } catch (error) {
        try {
            input = decodeURI(input);
            var decode = unGzip(input);
            let output = JSON.stringify(JSON.parse(decode), null, 4);
            $("#output").text(output);
        } catch (error) {}
    }
}