Array.prototype.slice.call(document.querySelectorAll('img')).map(function (el) { if (!el.alt) { el.style = el.style + "; border:10px dashed red;" } });
