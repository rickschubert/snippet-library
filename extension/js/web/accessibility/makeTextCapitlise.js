(function () {
    var i, t, D = document;
    for (i = 0; t = D.getElementsByTagName('textarea')[i]; ++i) t.value = t.value.toLowerCase()
    var newSS, styles = '*{text-transform:capitalize}input,textarea{text-transform:none}';
    if (D.createStyleSheet) {
        D.createStyleSheet("javascript:'" + styles + "'");
    } else {
        newSS = D.createElement('link');
        newSS.rel = 'stylesheet';
        newSS.href = 'data:text/css,' + escape(styles);
        D.getElementsByTagName("head")[0].appendChild(newSS);
    }
})()
