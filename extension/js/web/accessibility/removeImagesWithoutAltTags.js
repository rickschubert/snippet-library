Array.prototype.slice.call(document.querySelectorAll('img')).map(function (el) { if (!el.alt) { el.src = "Removed" } });
