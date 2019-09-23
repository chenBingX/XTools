/**
 * 获取参数值
 * @param {*} name 
 */
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}

/**
 * 前往页面-窗口不变
 * @param {*} url 
 */
function gotoPage(url) {
    window.location.href = url;
}

/**
 * 前往页面-新窗口
 * @param {*} url 
 */
function gotoPageWithNewWindow(url) {
    window.open(url, '_blank');
}

/**
 * 将 html 转义
 * @param {*} html 
 */
function HTMLEncode(html) {
    var temp = document.createElement("div");
    (temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html);
    var output = temp.innerHTML;
    temp = null;
    return output;
}

/**
 * 将 html 反转义
 * @param {*} text 
 */
function HTMLDecode(text) {
    var temp = document.createElement("div");
    temp.innerHTML = text;
    var output = temp.innerText || temp.textContent;
    temp = null;
    return output;
}

/**
 * 提供 String 是否以 特定字符串结尾 的函数
 */
String.prototype.endWith = function(endStr) {
    var d = this.length - endStr.length;
    return (d >= 0 && (this.toLowerCase()).lastIndexOf(endStr.toLowerCase()) == d)
}


/**
 * 是否是 pc 平台
 */
function isPc() {
    return !(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent));
}

// gzip解压
function unGzip(b64Data) {
    let strData = atob(b64Data);
    console.log("strData = " + strData);
    const charData = strData.split('').map(function(x) {
        return x.charCodeAt(0);
    });
    console.log("charData = " + charData);
    const binData = new Uint8Array(charData);
    const data = pako.ungzip(binData);
    strData = utf8ArrayToStr(data);
    return strData;
}

// gzip压缩
function gzip(str) {
    const binaryString = pako.gzip(encodeURIComponent(str), { to: 'string' });
    return btoa(binaryString);
}

// 字符串占用字节数计算(UTF-8)
function length(str) {
    let total = 0,
        charCode, i, len;
    for (i = 0, len = str.length; i < len; i++) {
        charCode = str.charCodeAt(i);
        if (charCode <= 0x007f) {
            total += 1;
        } else if (charCode <= 0x07ff) {
            total += 2;
        } else if (charCode <= 0xffff) {
            total += 3;
        } else {
            total += 4;
        }
    }
    return total;
}

function utf8ArrayToStr(array) {
    var out = "",
        i = 0,
        len = array.length,
        char1, char2, char3, char4;
    while (i < len) {
        char1 = array[i++];
        // 当单个字节时, 最大值 '01111111', 最小值 '00000000' 右移四位 07, 00
        // 当两个字节时, 最大值 '11011111', 最小值 '11000000' 右移四位 13, 12
        // 当三个字节时, 最大值 '11101111', 最小值 '11100000' 右移四位 14, 14
        if (char1 >> 4 <= 7) {
            out += String.fromCharCode(char1);
        } else if (char1 >> 4 == 12 || char1 >> 4 == 13) {
            char2 = array[i++];
            out += String.fromCharCode(((char1 & 0x1F) << 6) | (char2 & 0x3F));
        } else if (char1 >> 4 == 14) {
            char2 = array[i++];
            char3 = array[i++];
            char4 = ((char1 & 0x0F) << 12) | ((char2 & 0x3F) << 6);
            out += String.fromCharCode(char4 | ((char3 & 0x3F) << 0));
        }
    }
    return out;
}