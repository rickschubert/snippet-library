var coding = "abcdefghijklmnopqrstuvwxyzabcdefghijklmABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLM";

function rot13(t) {
    for (var r = "", i = 0; i < t.length; i++) {
        character = t.charAt(i);
        position = coding.indexOf(character);
        if (position > -1) character = coding.charAt(position + 13);
        r += character;
    }
    return r;
}
S = window.getSelection();

function t(N) {
    return N.nodeType == N.TEXT_NODE;
}

function r(N) {
    if (t(N)) N.data = rot13(N.data);
}
for (j = 0; j < S.rangeCount; ++j) {
    var g = S.getRangeAt(j),
        e = g.startContainer,
        f = g.endContainer,
        E = g.startOffset,
        F = g.endOffset,
        m = (e == f);
    if (!m || !t(e)) {
        /* rot13 each text node between e and f, not including e and f. */
        q = document.createTreeWalker(g.commonAncestorContainer, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, null, false);
        q.currentNode = e;
        for (N = q.nextNode(); N && N != f; N = q.nextNode()) r(N);
    }
    if (t(f)) f.splitText(F);
    if (!m) r(f);
    if (t(e)) {
        r(k = e.splitText(E));
        if (m) f = k;
        e = k;
    }
    if (t(f)) g.setEnd(f, f.data.length);
}
void 0
