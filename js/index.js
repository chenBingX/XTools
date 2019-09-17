function input() {
    const input = document.getElementById('input').value;
    try {
        const decode = unGzip(input);
        console.log("decode = " + decode);
        let output = JSON.stringify(JSON.parse(decode), null, 4);
        $("#output").text(output);
    } catch (error) {
        try {
            const decode = unGzip(decodeURI(input));
            console.log("decode = " + decode);
            let output = JSON.stringify(JSON.parse(decode), null, 4);
            $("#output").text(output);
        } catch (error) {

        }
    }
}