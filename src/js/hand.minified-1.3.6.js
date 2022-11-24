var HANDJS = HANDJS || {};
(function() {
    function E() {
        b = true;
        clearTimeout(w);
        w = setTimeout(function() {
            b = false
        }, 700)
    }
    function S(e) {
        var t = [];
        if (e) {
            t.unshift(e);
            while (e.parentNode) {
                t.unshift(e.parentNode);
                e = e.parentNode
            }
        }
        return t
    }
    function x(e, t) {
        var n = S(e);
        var r = S(t);
        var i = null;
        while (n.length > 0 && n[0] == r.shift())
            i = n.shift();
        return i
    }
    function T(e, t, n) {
        var r = x(e, t);
        var i = e;
        var s = [];
        while (i && i != r) {
            if (l(i, "pointerenter"))
                s.push(i);
            i = i.parentNode
        }
        while (s.length > 0)
            n(s.pop())
    }
    function N(e, t, n) {
        var r = x(e, t);
        var i = e;
        while (i && i != r) {
            if (l(i, "pointerleave"))
                n(i);
            i = i.parentNode
        }
    }
    function C(e, t) {
        ["pointerdown", "pointermove", "pointerup", "pointerover", "pointerout"].forEach(function(n) {
            window.addEventListener(e(n), function(e) {
                if (!b && c(e.target, n))
                    t(e, n, true)
            })
        });
        window.addEventListener(e("pointerover"), function(e) {
            if (b)
                return;
            var n = c(e.target, "pointerenter");
            if (!n || n === window)
                return;
            else if (!n.contains(e.relatedTarget)) {
                T(n, e.relatedTarget, function(n) {
                    t(e, "pointerenter", false, n)
                })
            }
        });
        window.addEventListener(e("pointerout"), function(e) {
            if (b)
                return;
            var n = c(e.target, "pointerleave");
            if (!n || n === window)
                return;
            else if (!n.contains(e.relatedTarget)) {
                N(n, e.relatedTarget, function(n) {
                    t(e, "pointerleave", false, n)
                })
            }
        })
    }
    if (window.PointerEvent)
        return;
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function(e) {
            var t = Object(this);
            var n = t.length >>> 0;
            if (n === 0) {
                return -1
            }
            var r = 0;
            if (arguments.length > 0) {
                r = Number(arguments[1]);
                if (r != r) {
                    r = 0
                } else if (r != 0 && r != Infinity && r != -Infinity) {
                    r = (r > 0 || -1) * Math.floor(Math.abs(r))
                }
            }
            if (r >= n) {
                return -1
            }
            var i = r >= 0 ? r : Math.max(n - Math.abs(r), 0);
            for (; i < n; i++) {
                if (i in t && t[i] === e) {
                    return i
                }
            }
            return -1
        }
    }
    if (!String.prototype.trim) {
        String.prototype.trim = function() {
            return this.replace(/^\s+|\s+$/, "")
        }
    }
    var e = ["pointerdown", "pointerup", "pointermove", "pointerover", "pointerout", "pointercancel", "pointerenter", "pointerleave"];
    var t = ["PointerDown", "PointerUp", "PointerMove", "PointerOver", "PointerOut", "PointerCancel", "PointerEnter", "PointerLeave"];
    var n = "touch";
    var r = "pen";
    var i = "mouse";
    var s = {};
    var o = function(e) {
        while (e && !e.handjs_forcePreventDefault) {
            e = e.parentNode
        }
        return !!e || window.handjs_forcePreventDefault
    };
    var u = function(e, t, s, o) {
        var u;
        if (document.createEvent) {
            u = document.createEvent("MouseEvents");
            u.initMouseEvent(t, s, true, window, 1, e.screenX, e.screenY, e.clientX, e.clientY, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, e.button, null)
        } else {
            u = document.createEventObject();
            u.screenX = e.screenX;
            u.screenY = e.screenY;
            u.clientX = e.clientX;
            u.clientY = e.clientY;
            u.ctrlKey = e.ctrlKey;
            u.altKey = e.altKey;
            u.shiftKey = e.shiftKey;
            u.metaKey = e.metaKey;
            u.button = e.button
        }
        if (u.offsetX === undefined) {
            if (e.offsetX !== undefined) {
                if (Object && Object.defineProperty !== undefined) {
                    Object.defineProperty(u, "offsetX", {
                        writable: true
                    });
                    Object.defineProperty(u, "offsetY", {
                        writable: true
                    })
                }
                u.offsetX = e.offsetX;
                u.offsetY = e.offsetY
            } else if (Object && Object.defineProperty !== undefined) {
                Object.defineProperty(u, "offsetX", {
                    get: function() {
                        if (this.currentTarget && this.currentTarget.offsetLeft) {
                            return e.clientX - this.currentTarget.offsetLeft
                        }
                        return e.clientX
                    }
                });
                Object.defineProperty(u, "offsetY", {
                    get: function() {
                        if (this.currentTarget && this.currentTarget.offsetTop) {
                            return e.clientY - this.currentTarget.offsetTop
                        }
                        return e.clientY
                    }
                })
            } else if (e.layerX !== undefined) {
                u.offsetX = e.layerX - e.currentTarget.offsetLeft;
                u.offsetY = e.layerY - e.currentTarget.offsetTop
            }
        }
        if (e.isPrimary !== undefined)
            u.isPrimary = e.isPrimary;
        else
            u.isPrimary = true;
        if (e.pressure)
            u.pressure = e.pressure;
        else {
            var a = 0;
            if (e.which !== undefined)
                a = e.which;
            else if (e.button !== undefined) {
                a = e.button
            }
            u.pressure = a == 0 ? 0 : .5
        }
        if (e.rotation)
            u.rotation = e.rotation;
        else
            u.rotation = 0;
        if (e.hwTimestamp)
            u.hwTimestamp = e.hwTimestamp;
        else
            u.hwTimestamp = 0;
        if (e.tiltX)
            u.tiltX = e.tiltX;
        else
            u.tiltX = 0;
        if (e.tiltY)
            u.tiltY = e.tiltY;
        else
            u.tiltY = 0;
        if (e.height)
            u.height = e.height;
        else
            u.height = 0;
        if (e.width)
            u.width = e.width;
        else
            u.width = 0;
        u.preventDefault = function() {
            if (e.preventDefault !== undefined)
                e.preventDefault()
        }
        ;
        if (u.stopPropagation !== undefined) {
            var f = u.stopPropagation;
            u.stopPropagation = function() {
                if (e.stopPropagation !== undefined)
                    e.stopPropagation();
                f.call(this)
            }
        }
        u.pointerId = e.pointerId;
        u.pointerType = e.pointerType;
        switch (u.pointerType) {
        case 2:
            u.pointerType = n;
            break;
        case 3:
            u.pointerType = r;
            break;
        case 4:
            u.pointerType = i;
            break
        }
        if (o)
            o.dispatchEvent(u);
        else if (e.target) {
            e.target.dispatchEvent(u)
        } else {
            e.srcElement.fireEvent("on" + p(t), u)
        }
    };
    var a = function(e, t, n, r) {
        e.pointerId = 1;
        e.pointerType = i;
        u(e, t, n, r)
    };
    var f = function(e, t, r, i, s) {
        var o = t.identifier + 2;
        t.pointerId = o;
        t.pointerType = n;
        t.currentTarget = r;
        if (i.preventDefault !== undefined) {
            t.preventDefault = function() {
                i.preventDefault()
            }
        }
        u(t, e, s, r)
    };
    var l = function(e, t) {
        return e.__handjsGlobalRegisteredEvents && e.__handjsGlobalRegisteredEvents[t]
    };
    var c = function(e, t) {
        while (e && !l(e, t))
            e = e.parentNode;
        if (e)
            return e;
        else if (l(window, t))
            return window
    };
    var h = function(e, t, n, r, i) {
        if (c(n, e)) {
            f(e, t, n, r, i)
        }
    };
    var p = function(e) {
        return e.toLowerCase().replace("pointer", "mouse")
    };
    var d = function(n, r) {
        var i = e.indexOf(r);
        var s = n + t[i];
        return s
    };
    var v = function(e, t, n, r) {
        if (e.__handjsRegisteredEvents === undefined) {
            e.__handjsRegisteredEvents = []
        }
        if (r) {
            if (e.__handjsRegisteredEvents[t] !== undefined) {
                e.__handjsRegisteredEvents[t]++;
                return
            }
            e.__handjsRegisteredEvents[t] = 1;
            e.addEventListener(t, n, false)
        } else {
            if (e.__handjsRegisteredEvents.indexOf(t) !== -1) {
                e.__handjsRegisteredEvents[t]--;
                if (e.__handjsRegisteredEvents[t] != 0) {
                    return
                }
            }
            e.removeEventListener(t, n);
            e.__handjsRegisteredEvents[t] = 0
        }
    };
    var m = function(e, t, n) {
        if (!e.__handjsGlobalRegisteredEvents) {
            e.__handjsGlobalRegisteredEvents = []
        }
        if (n) {
            if (e.__handjsGlobalRegisteredEvents[t] !== undefined) {
                e.__handjsGlobalRegisteredEvents[t]++;
                return
            }
            e.__handjsGlobalRegisteredEvents[t] = 1
        } else {
            if (e.__handjsGlobalRegisteredEvents[t] !== undefined) {
                e.__handjsGlobalRegisteredEvents[t]--;
                if (e.__handjsGlobalRegisteredEvents[t] < 0) {
                    e.__handjsGlobalRegisteredEvents[t] = 0
                }
            }
        }
    };
    var g = function(t) {
        var n = t.prototype ? t.prototype.addEventListener : t.addEventListener;
        var r = function(t, r, i) {
            if (e.indexOf(t) != -1) {
                m(this, t, true)
            }
            if (n === undefined) {
                this.attachEvent("on" + p(t), r)
            } else {
                n.call(this, t, r, i)
            }
        };
        if (t.prototype) {
            t.prototype.addEventListener = r
        } else {
            t.addEventListener = r
        }
    };
    var y = function(t) {
        var n = t.prototype ? t.prototype.removeEventListener : t.removeEventListener;
        var r = function(t, r, i) {
            if (e.indexOf(t) != -1) {
                m(this, t, false)
            }
            if (n === undefined) {
                this.detachEvent(p(t), r)
            } else {
                n.call(this, t, r, i)
            }
        };
        if (t.prototype) {
            t.prototype.removeEventListener = r
        } else {
            t.removeEventListener = r
        }
    };
    g(window);
    g(HTMLElement || Element);
    g(document);
    g(HTMLBodyElement);
    g(HTMLDivElement);
    g(HTMLImageElement);
    g(HTMLUListElement);
    g(HTMLAnchorElement);
    g(HTMLLIElement);
    g(HTMLTableElement);
    if (window.HTMLSpanElement) {
        g(HTMLSpanElement)
    }
    if (window.HTMLCanvasElement) {
        g(HTMLCanvasElement)
    }
    if (window.SVGElement) {
        g(SVGElement)
    }
    y(window);
    y(HTMLElement || Element);
    y(document);
    y(HTMLBodyElement);
    y(HTMLDivElement);
    y(HTMLImageElement);
    y(HTMLUListElement);
    y(HTMLAnchorElement);
    y(HTMLLIElement);
    y(HTMLTableElement);
    if (window.HTMLSpanElement) {
        y(HTMLSpanElement)
    }
    if (window.HTMLCanvasElement) {
        y(HTMLCanvasElement)
    }
    if (window.SVGElement) {
        y(SVGElement)
    }
    var b = false;
    var w = -1;
    (function() {
        if (window.MSPointerEvent) {
            C(function(e) {
                return d("MS", e)
            }, u)
        } else {
            C(p, a);
            if (window.ontouchstart !== undefined) {
                window.addEventListener("touchstart", function(e) {
                    for (var t = 0; t < e.changedTouches.length; ++t) {
                        var n = e.changedTouches[t];
                        s[n.identifier] = n.target;
                        h("pointerover", n, n.target, e, true);
                        T(n.target, null, function(t) {
                            f("pointerenter", n, t, e, false)
                        });
                        h("pointerdown", n, n.target, e, true)
                    }
                    E()
                });
                window.addEventListener("touchend", function(e) {
                    for (var t = 0; t < e.changedTouches.length; ++t) {
                        var n = e.changedTouches[t];
                        var r = s[n.identifier];
                        h("pointerup", n, r, e, true);
                        h("pointerout", n, r, e, true);
                        N(r, null, function(t) {
                            f("pointerleave", n, t, e, false)
                        })
                    }
                    E()
                });
                window.addEventListener("touchmove", function(e) {
                    for (var t = 0; t < e.changedTouches.length; ++t) {
                        var n = e.changedTouches[t];
                        var r = document.elementFromPoint(n.clientX, n.clientY);
                        var i = s[n.identifier];
                        if (i && o(i) === true)
                            e.preventDefault();
                        h("pointermove", n, i, e, true);
                        if (i === r) {
                            continue
                        }
                        if (i) {
                            h("pointerout", n, i, e, true);
                            if (!i.contains(r)) {
                                N(i, r, function(t) {
                                    f("pointerleave", n, t, e, false)
                                })
                            }
                        }
                        if (r) {
                            h("pointerover", n, r, e, true);
                            if (!r.contains(i)) {
                                T(r, i, function(t) {
                                    f("pointerenter", n, t, e, false)
                                })
                            }
                        }
                        s[n.identifier] = r
                    }
                    E()
                });
                window.addEventListener("touchcancel", function(e) {
                    for (var t = 0; t < e.changedTouches.length; ++t) {
                        var n = e.changedTouches[t];
                        h("pointercancel", n, s[n.identifier], e, true)
                    }
                })
            }
        }
    }
    )();
    if (navigator.pointerEnabled === undefined) {
        navigator.pointerEnabled = true;
        if (navigator.msPointerEnabled) {
            navigator.maxTouchPoints = navigator.msMaxTouchPoints
        }
    }
    if (document.styleSheets && document.addEventListener) {
        document.addEventListener("DOMContentLoaded", function() {
            if (HANDJS.doNotProcessCSS || document.body.style.touchAction !== undefined) {
                return
            }
            var e = new RegExp(".+?{.*?}","m");
            var t = new RegExp(".+?{","m");
            var n = function(n) {
                var r = e.exec(n);
                if (!r) {
                    return
                }
                var i = r[0];
                n = n.replace(i, "").trim();
                var s = t.exec(i)[0].replace("{", "").trim();
                if (i.replace(/\s/g, "").indexOf("touch-action:none") != -1) {
                    var o = document.querySelectorAll(s);
                    for (var u = 0; u < o.length; u++) {
                        var a = o[u];
                        if (a.style.msTouchAction !== undefined) {
                            a.style.msTouchAction = "none"
                        } else {
                            a.handjs_forcePreventDefault = true
                        }
                    }
                }
                return n
            };
            var r = function(e) {
                if (window.setImmediate) {
                    if (e)
                        setImmediate(r, n(e))
                } else {
                    while (e) {
                        e = n(e)
                    }
                }
            };
            try {
                for (var i = 0; i < document.styleSheets.length; i++) {
                    var s = document.styleSheets[i];
                    if (s.href == undefined) {
                        continue
                    }
                    var o = new XMLHttpRequest;
                    o.open("get", s.href, false);
                    o.send();
                    var u = o.responseText.replace(/(\n|\r)/g, "");
                    r(u)
                }
            } catch (a) {}
            var f = document.getElementsByTagName("style");
            for (var i = 0; i < f.length; i++) {
                var l = f[i];
                var c = l.innerHTML.replace(/(\n|\r)/g, "").trim();
                r(c)
            }
        }, false)
    }
}
)()
