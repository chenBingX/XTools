function input() {
    const input = document.getElementById('input').value;
    try {
        const decode = unGzip(input);
        let output = JSON.stringify(JSON.parse(decode), null, 4);
        $("#output").text(output);
    } catch (error) {

    }
}