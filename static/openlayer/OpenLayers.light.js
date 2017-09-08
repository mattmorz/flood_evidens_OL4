/*

 OpenLayers.js -- OpenLayers Map Viewer Library

 Copyright (c) 2006-2013 by OpenLayers Contributors
 Published under the 2-clause BSD license.
 See http://openlayers.org/dev/license.txt for the full text of the license, and http://openlayers.org/dev/authors.txt for full list of contributors.

 Includes compressed code under the following licenses:

 (For uncompressed versions of the code used, please see the
 OpenLayers Github repository: <https://github.com/openlayers/openlayers>)

 */

/**
 * Contains XMLHttpRequest.js <http://code.google.com/p/xmlhttprequest/>
 * Copyright 2007 Sergey Ilinsky (http://www.ilinsky.com)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * OpenLayers.Util.pagePosition is based on Yahoo's getXY method, which is
 * Copyright (c) 2006, Yahoo! Inc.
 * All rights reserved.
 *
 * Redistribution and use of this software in source and binary forms, with or
 * without modification, are permitted provided that the following conditions
 * are met:
 *
 * * Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * * Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * * Neither the name of Yahoo! Inc. nor the names of its contributors may be
 *   used to endorse or promote products derived from this software without
 *   specific prior written permission of Yahoo! Inc.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */
var OpenLayers = {VERSION_NUMBER: "Release 2.13.1", singleFile: !0, _getScriptLocation: function () {
    for (var a = /(^|(.*?\/))(OpenLayers[^\/]*?\.js)(\?|$)/, b = document.getElementsByTagName("script"), c, d = "", e = 0, f = b.length; e < f; e++)if (c = b[e].getAttribute("src"))if (c = c.match(a)) {
        d = c[1];
        break
    }
    return function () {
        return d
    }
}(), ImgPath: ""};
OpenLayers.String = {startsWith: function (a, b) {
    return 0 == a.indexOf(b)
}, contains: function (a, b) {
    return-1 != a.indexOf(b)
}, trim: function (a) {
    return a.replace(/^\s\s*/, "").replace(/\s\s*$/, "")
}, camelize: function (a) {
    a = a.split("-");
    for (var b = a[0], c = 1, d = a.length; c < d; c++)var e = a[c], b = b + (e.charAt(0).toUpperCase() + e.substring(1));
    return b
}, format: function (a, b, c) {
    b || (b = window);
    return a.replace(OpenLayers.String.tokenRegEx, function (a, e) {
        for (var f, g = e.split(/\.+/), h = 0; h < g.length; h++) {
            0 == h && (f = b);
            if (void 0 === f)break;
            f = f[g[h]]
        }
        "function" == typeof f && (f = c ? f.apply(null, c) : f());
        return"undefined" == typeof f ? "undefined" : f
    })
}, tokenRegEx: /\$\{([\w.]+?)\}/g, numberRegEx: /^([+-]?)(?=\d|\.\d)\d*(\.\d*)?([Ee]([+-]?\d+))?$/, isNumeric: function (a) {
    return OpenLayers.String.numberRegEx.test(a)
}, numericIf: function (a, b) {
    var c = a;
    !0 === b && (null != a && a.replace) && (a = a.replace(/^\s*|\s*$/g, ""));
    return OpenLayers.String.isNumeric(a) ? parseFloat(a) : c
}};
OpenLayers.Number = {decimalSeparator: ".", thousandsSeparator: ",", limitSigDigs: function (a, b) {
    var c = 0;
    0 < b && (c = parseFloat(a.toPrecision(b)));
    return c
}, format: function (a, b, c, d) {
    b = "undefined" != typeof b ? b : 0;
    c = "undefined" != typeof c ? c : OpenLayers.Number.thousandsSeparator;
    d = "undefined" != typeof d ? d : OpenLayers.Number.decimalSeparator;
    null != b && (a = parseFloat(a.toFixed(b)));
    var e = a.toString().split(".");
    1 == e.length && null == b && (b = 0);
    a = e[0];
    if (c)for (var f = /(-?[0-9]+)([0-9]{3})/; f.test(a);)a = a.replace(f, "$1" + c + "$2");
    0 == b ? b = a : (c = 1 < e.length ? e[1] : "0", null != b && (c += Array(b - c.length + 1).join("0")), b = a + d + c);
    return b
}, zeroPad: function (a, b, c) {
    for (a = a.toString(c || 10); a.length < b;)a = "0" + a;
    return a
}};
OpenLayers.Function = {bind: function (a, b) {
    var c = Array.prototype.slice.apply(arguments, [2]);
    return function () {
        var d = c.concat(Array.prototype.slice.apply(arguments, [0]));
        return a.apply(b, d)
    }
}, bindAsEventListener: function (a, b) {
    return function (c) {
        return a.call(b, c || window.event)
    }
}, False: function () {
    return!1
}, True: function () {
    return!0
}, Void: function () {
}};
OpenLayers.Array = {filter: function (a, b, c) {
    var d = [];
    if (Array.prototype.filter)d = a.filter(b, c); else {
        var e = a.length;
        if ("function" != typeof b)throw new TypeError;
        for (var f = 0; f < e; f++)if (f in a) {
            var g = a[f];
            b.call(c, g, f, a) && d.push(g)
        }
    }
    return d
}};
OpenLayers.Class = function () {
    var a = arguments.length, b = arguments[0], c = arguments[a - 1], d = "function" == typeof c.initialize ? c.initialize : function () {
        b.prototype.initialize.apply(this, arguments)
    };
    1 < a ? (a = [d, b].concat(Array.prototype.slice.call(arguments).slice(1, a - 1), c), OpenLayers.inherit.apply(null, a)) : d.prototype = c;
    return d
};
OpenLayers.inherit = function (a, b) {
    var c = function () {
    };
    c.prototype = b.prototype;
    a.prototype = new c;
    var d, e, c = 2;
    for (d = arguments.length; c < d; c++)e = arguments[c], "function" === typeof e && (e = e.prototype), OpenLayers.Util.extend(a.prototype, e)
};
OpenLayers.Util = OpenLayers.Util || {};
OpenLayers.Util.extend = function (a, b) {
    a = a || {};
    if (b) {
        for (var c in b) {
            var d = b[c];
            void 0 !== d && (a[c] = d)
        }
        "function" == typeof window.Event && b instanceof window.Event || (!b.hasOwnProperty || !b.hasOwnProperty("toString")) || (a.toString = b.toString)
    }
    return a
};
OpenLayers.Bounds = OpenLayers.Class({left: null, bottom: null, right: null, top: null, centerLonLat: null, initialize: function (a, b, c, d) {
    OpenLayers.Util.isArray(a) && (d = a[3], c = a[2], b = a[1], a = a[0]);
    null != a && (this.left = OpenLayers.Util.toFloat(a));
    null != b && (this.bottom = OpenLayers.Util.toFloat(b));
    null != c && (this.right = OpenLayers.Util.toFloat(c));
    null != d && (this.top = OpenLayers.Util.toFloat(d))
}, clone: function () {
    return new OpenLayers.Bounds(this.left, this.bottom, this.right, this.top)
}, equals: function (a) {
    var b = !1;
    null !=
        a && (b = this.left == a.left && this.right == a.right && this.top == a.top && this.bottom == a.bottom);
    return b
}, toString: function () {
    return[this.left, this.bottom, this.right, this.top].join()
}, toArray: function (a) {
    return!0 === a ? [this.bottom, this.left, this.top, this.right] : [this.left, this.bottom, this.right, this.top]
}, toBBOX: function (a, b) {
    null == a && (a = 6);
    var c = Math.pow(10, a), d = Math.round(this.left * c) / c, e = Math.round(this.bottom * c) / c, f = Math.round(this.right * c) / c, c = Math.round(this.top * c) / c;
    return!0 === b ? e + "," + d + "," + c + "," + f : d +
        "," + e + "," + f + "," + c
}, toGeometry: function () {
    return new OpenLayers.Geometry.Polygon([new OpenLayers.Geometry.LinearRing([new OpenLayers.Geometry.Point(this.left, this.bottom), new OpenLayers.Geometry.Point(this.right, this.bottom), new OpenLayers.Geometry.Point(this.right, this.top), new OpenLayers.Geometry.Point(this.left, this.top)])])
}, getWidth: function () {
    return this.right - this.left
}, getHeight: function () {
    return this.top - this.bottom
}, getSize: function () {
    return new OpenLayers.Size(this.getWidth(), this.getHeight())
},
    getCenterPixel: function () {
        return new OpenLayers.Pixel((this.left + this.right) / 2, (this.bottom + this.top) / 2)
    }, getCenterLonLat: function () {
        this.centerLonLat || (this.centerLonLat = new OpenLayers.LonLat((this.left + this.right) / 2, (this.bottom + this.top) / 2));
        return this.centerLonLat
    }, scale: function (a, b) {
        null == b && (b = this.getCenterLonLat());
        var c, d;
        "OpenLayers.LonLat" == b.CLASS_NAME ? (c = b.lon, d = b.lat) : (c = b.x, d = b.y);
        return new OpenLayers.Bounds((this.left - c) * a + c, (this.bottom - d) * a + d, (this.right - c) * a + c, (this.top - d) * a +
            d)
    }, add: function (a, b) {
        if (null == a || null == b)throw new TypeError("Bounds.add cannot receive null values");
        return new OpenLayers.Bounds(this.left + a, this.bottom + b, this.right + a, this.top + b)
    }, extend: function (a) {
        if (a)switch (a.CLASS_NAME) {
            case "OpenLayers.LonLat":
                this.extendXY(a.lon, a.lat);
                break;
            case "OpenLayers.Geometry.Point":
                this.extendXY(a.x, a.y);
                break;
            case "OpenLayers.Bounds":
                this.centerLonLat = null;
                if (null == this.left || a.left < this.left)this.left = a.left;
                if (null == this.bottom || a.bottom < this.bottom)this.bottom =
                    a.bottom;
                if (null == this.right || a.right > this.right)this.right = a.right;
                if (null == this.top || a.top > this.top)this.top = a.top
        }
    }, extendXY: function (a, b) {
        this.centerLonLat = null;
        if (null == this.left || a < this.left)this.left = a;
        if (null == this.bottom || b < this.bottom)this.bottom = b;
        if (null == this.right || a > this.right)this.right = a;
        if (null == this.top || b > this.top)this.top = b
    }, containsLonLat: function (a, b) {
        "boolean" === typeof b && (b = {inclusive: b});
        b = b || {};
        var c = this.contains(a.lon, a.lat, b.inclusive), d = b.worldBounds;
        d && !c && (c = d.getWidth(),
            d = Math.round((a.lon - (d.left + d.right) / 2) / c), c = this.containsLonLat({lon: a.lon - d * c, lat: a.lat}, {inclusive: b.inclusive}));
        return c
    }, containsPixel: function (a, b) {
        return this.contains(a.x, a.y, b)
    }, contains: function (a, b, c) {
        null == c && (c = !0);
        if (null == a || null == b)return!1;
        a = OpenLayers.Util.toFloat(a);
        b = OpenLayers.Util.toFloat(b);
        var d = !1;
        return d = c ? a >= this.left && a <= this.right && b >= this.bottom && b <= this.top : a > this.left && a < this.right && b > this.bottom && b < this.top
    }, intersectsBounds: function (a, b) {
        "boolean" === typeof b && (b =
        {inclusive: b});
        b = b || {};
        if (b.worldBounds) {
            var c = this.wrapDateLine(b.worldBounds);
            a = a.wrapDateLine(b.worldBounds)
        } else c = this;
        null == b.inclusive && (b.inclusive = !0);
        var d = !1, e = c.left == a.right || c.right == a.left || c.top == a.bottom || c.bottom == a.top;
        if (b.inclusive || !e)var d = a.top >= c.bottom && a.top <= c.top || c.top > a.bottom && c.top < a.top, e = a.left >= c.left && a.left <= c.right || c.left >= a.left && c.left <= a.right, f = a.right >= c.left && a.right <= c.right || c.right >= a.left && c.right <= a.right, d = (a.bottom >= c.bottom && a.bottom <= c.top || c.bottom >=
            a.bottom && c.bottom <= a.top || d) && (e || f);
        if (b.worldBounds && !d) {
            var g = b.worldBounds, e = g.getWidth(), f = !g.containsBounds(c), g = !g.containsBounds(a);
            f && !g ? (a = a.add(-e, 0), d = c.intersectsBounds(a, {inclusive: b.inclusive})) : g && !f && (c = c.add(-e, 0), d = a.intersectsBounds(c, {inclusive: b.inclusive}))
        }
        return d
    }, containsBounds: function (a, b, c) {
        null == b && (b = !1);
        null == c && (c = !0);
        var d = this.contains(a.left, a.bottom, c), e = this.contains(a.right, a.bottom, c), f = this.contains(a.left, a.top, c);
        a = this.contains(a.right, a.top, c);
        return b ?
            d || e || f || a : d && e && f && a
    }, determineQuadrant: function (a) {
        var b = "", c = this.getCenterLonLat(), b = b + (a.lat < c.lat ? "b" : "t");
        return b += a.lon < c.lon ? "l" : "r"
    }, transform: function (a, b) {
        this.centerLonLat = null;
        var c = OpenLayers.Projection.transform({x: this.left, y: this.bottom}, a, b), d = OpenLayers.Projection.transform({x: this.right, y: this.bottom}, a, b), e = OpenLayers.Projection.transform({x: this.left, y: this.top}, a, b), f = OpenLayers.Projection.transform({x: this.right, y: this.top}, a, b);
        this.left = Math.min(c.x, e.x);
        this.bottom = Math.min(c.y,
            d.y);
        this.right = Math.max(d.x, f.x);
        this.top = Math.max(e.y, f.y);
        return this
    }, wrapDateLine: function (a, b) {
        b = b || {};
        var c = b.leftTolerance || 0, d = b.rightTolerance || 0, e = this.clone();
        if (a) {
            for (var f = a.getWidth(); e.left < a.left && e.right - d <= a.left;)e = e.add(f, 0);
            for (; e.left + c >= a.right && e.right > a.right;)e = e.add(-f, 0);
            c = e.left + c;
            c < a.right && (c > a.left && e.right - d > a.right) && (e = e.add(-f, 0))
        }
        return e
    }, CLASS_NAME: "OpenLayers.Bounds"});
OpenLayers.Bounds.fromString = function (a, b) {
    var c = a.split(",");
    return OpenLayers.Bounds.fromArray(c, b)
};
OpenLayers.Bounds.fromArray = function (a, b) {
    return!0 === b ? new OpenLayers.Bounds(a[1], a[0], a[3], a[2]) : new OpenLayers.Bounds(a[0], a[1], a[2], a[3])
};
OpenLayers.Bounds.fromSize = function (a) {
    return new OpenLayers.Bounds(0, a.h, a.w, 0)
};
OpenLayers.Bounds.oppositeQuadrant = function (a) {
    var b;
    b = "" + ("t" == a.charAt(0) ? "b" : "t");
    return b += "l" == a.charAt(1) ? "r" : "l"
};
OpenLayers.Element = {visible: function (a) {
    return"none" != OpenLayers.Util.getElement(a).style.display
}, toggle: function () {
    for (var a = 0, b = arguments.length; a < b; a++) {
        var c = OpenLayers.Util.getElement(arguments[a]), d = OpenLayers.Element.visible(c) ? "none" : "";
        c.style.display = d
    }
}, remove: function (a) {
    a = OpenLayers.Util.getElement(a);
    a.parentNode.removeChild(a)
}, getHeight: function (a) {
    a = OpenLayers.Util.getElement(a);
    return a.offsetHeight
}, hasClass: function (a, b) {
    var c = a.className;
    return!!c && RegExp("(^|\\s)" + b + "(\\s|$)").test(c)
},
    addClass: function (a, b) {
        OpenLayers.Element.hasClass(a, b) || (a.className += (a.className ? " " : "") + b);
        return a
    }, removeClass: function (a, b) {
        var c = a.className;
        c && (a.className = OpenLayers.String.trim(c.replace(RegExp("(^|\\s+)" + b + "(\\s+|$)"), " ")));
        return a
    }, toggleClass: function (a, b) {
        OpenLayers.Element.hasClass(a, b) ? OpenLayers.Element.removeClass(a, b) : OpenLayers.Element.addClass(a, b);
        return a
    }, getStyle: function (a, b) {
        a = OpenLayers.Util.getElement(a);
        var c = null;
        if (a && a.style) {
            c = a.style[OpenLayers.String.camelize(b)];
            c || (document.defaultView && document.defaultView.getComputedStyle ? c = (c = document.defaultView.getComputedStyle(a, null)) ? c.getPropertyValue(b) : null : a.currentStyle && (c = a.currentStyle[OpenLayers.String.camelize(b)]));
            var d = ["left", "top", "right", "bottom"];
            window.opera && (-1 != OpenLayers.Util.indexOf(d, b) && "static" == OpenLayers.Element.getStyle(a, "position")) && (c = "auto")
        }
        return"auto" == c ? null : c
    }};
OpenLayers.LonLat = OpenLayers.Class({lon: 0, lat: 0, initialize: function (a, b) {
    OpenLayers.Util.isArray(a) && (b = a[1], a = a[0]);
    this.lon = OpenLayers.Util.toFloat(a);
    this.lat = OpenLayers.Util.toFloat(b)
}, toString: function () {
    return"lon=" + this.lon + ",lat=" + this.lat
}, toShortString: function () {
    return this.lon + ", " + this.lat
}, clone: function () {
    return new OpenLayers.LonLat(this.lon, this.lat)
}, add: function (a, b) {
    if (null == a || null == b)throw new TypeError("LonLat.add cannot receive null values");
    return new OpenLayers.LonLat(this.lon +
        OpenLayers.Util.toFloat(a), this.lat + OpenLayers.Util.toFloat(b))
}, equals: function (a) {
    var b = !1;
    null != a && (b = this.lon == a.lon && this.lat == a.lat || isNaN(this.lon) && isNaN(this.lat) && isNaN(a.lon) && isNaN(a.lat));
    return b
}, transform: function (a, b) {
    var c = OpenLayers.Projection.transform({x: this.lon, y: this.lat}, a, b);
    this.lon = c.x;
    this.lat = c.y;
    return this
}, wrapDateLine: function (a) {
    var b = this.clone();
    if (a) {
        for (; b.lon < a.left;)b.lon += a.getWidth();
        for (; b.lon > a.right;)b.lon -= a.getWidth()
    }
    return b
}, CLASS_NAME: "OpenLayers.LonLat"});
OpenLayers.LonLat.fromString = function (a) {
    a = a.split(",");
    return new OpenLayers.LonLat(a[0], a[1])
};
OpenLayers.LonLat.fromArray = function (a) {
    var b = OpenLayers.Util.isArray(a);
    return new OpenLayers.LonLat(b && a[0], b && a[1])
};
OpenLayers.Pixel = OpenLayers.Class({x: 0, y: 0, initialize: function (a, b) {
    this.x = parseFloat(a);
    this.y = parseFloat(b)
}, toString: function () {
    return"x=" + this.x + ",y=" + this.y
}, clone: function () {
    return new OpenLayers.Pixel(this.x, this.y)
}, equals: function (a) {
    var b = !1;
    null != a && (b = this.x == a.x && this.y == a.y || isNaN(this.x) && isNaN(this.y) && isNaN(a.x) && isNaN(a.y));
    return b
}, distanceTo: function (a) {
    return Math.sqrt(Math.pow(this.x - a.x, 2) + Math.pow(this.y - a.y, 2))
}, add: function (a, b) {
    if (null == a || null == b)throw new TypeError("Pixel.add cannot receive null values");
    return new OpenLayers.Pixel(this.x + a, this.y + b)
}, offset: function (a) {
    var b = this.clone();
    a && (b = this.add(a.x, a.y));
    return b
}, CLASS_NAME: "OpenLayers.Pixel"});
OpenLayers.Size = OpenLayers.Class({w: 0, h: 0, initialize: function (a, b) {
    this.w = parseFloat(a);
    this.h = parseFloat(b)
}, toString: function () {
    return"w=" + this.w + ",h=" + this.h
}, clone: function () {
    return new OpenLayers.Size(this.w, this.h)
}, equals: function (a) {
    var b = !1;
    null != a && (b = this.w == a.w && this.h == a.h || isNaN(this.w) && isNaN(this.h) && isNaN(a.w) && isNaN(a.h));
    return b
}, CLASS_NAME: "OpenLayers.Size"});
OpenLayers.Console = {log: function () {
}, debug: function () {
}, info: function () {
}, warn: function () {
}, error: function () {
}, userError: function (a) {
    alert(a)
}, assert: function () {
}, dir: function () {
}, dirxml: function () {
}, trace: function () {
}, group: function () {
}, groupEnd: function () {
}, time: function () {
}, timeEnd: function () {
}, profile: function () {
}, profileEnd: function () {
}, count: function () {
}, CLASS_NAME: "OpenLayers.Console"};
(function () {
    for (var a = document.getElementsByTagName("script"), b = 0, c = a.length; b < c; ++b)if (-1 != a[b].src.indexOf("firebug.js") && console) {
        OpenLayers.Util.extend(OpenLayers.Console, console);
        break
    }
})();
OpenLayers.Lang = {code: null, defaultCode: "en", getCode: function () {
    OpenLayers.Lang.code || OpenLayers.Lang.setCode();
    return OpenLayers.Lang.code
}, setCode: function (a) {
    var b;
    a || (a = "msie" == OpenLayers.BROWSER_NAME ? navigator.userLanguage : navigator.language);
    a = a.split("-");
    a[0] = a[0].toLowerCase();
    "object" == typeof OpenLayers.Lang[a[0]] && (b = a[0]);
    if (a[1]) {
        var c = a[0] + "-" + a[1].toUpperCase();
        "object" == typeof OpenLayers.Lang[c] && (b = c)
    }
    b || (OpenLayers.Console.warn("Failed to find OpenLayers.Lang." + a.join("-") + " dictionary, falling back to default language"),
        b = OpenLayers.Lang.defaultCode);
    OpenLayers.Lang.code = b
}, translate: function (a, b) {
    var c = OpenLayers.Lang[OpenLayers.Lang.getCode()];
    (c = c && c[a]) || (c = a);
    b && (c = OpenLayers.String.format(c, b));
    return c
}};
OpenLayers.i18n = OpenLayers.Lang.translate;
OpenLayers.Util = OpenLayers.Util || {};
OpenLayers.Util.getElement = function () {
    for (var a = [], b = 0, c = arguments.length; b < c; b++) {
        var d = arguments[b];
        "string" == typeof d && (d = document.getElementById(d));
        if (1 == arguments.length)return d;
        a.push(d)
    }
    return a
};
OpenLayers.Util.isElement = function (a) {
    return!(!a || 1 !== a.nodeType)
};
OpenLayers.Util.isArray = function (a) {
    return"[object Array]" === Object.prototype.toString.call(a)
};
OpenLayers.Util.removeItem = function (a, b) {
    for (var c = a.length - 1; 0 <= c; c--)a[c] == b && a.splice(c, 1);
    return a
};
OpenLayers.Util.indexOf = function (a, b) {
    if ("function" == typeof a.indexOf)return a.indexOf(b);
    for (var c = 0, d = a.length; c < d; c++)if (a[c] == b)return c;
    return-1
};
OpenLayers.Util.dotless = /\./g;
OpenLayers.Util.modifyDOMElement = function (a, b, c, d, e, f, g, h) {
    b && (a.id = b.replace(OpenLayers.Util.dotless, "_"));
    c && (a.style.left = c.x + "px", a.style.top = c.y + "px");
    d && (a.style.width = d.w + "px", a.style.height = d.h + "px");
    e && (a.style.position = e);
    f && (a.style.border = f);
    g && (a.style.overflow = g);
    0 <= parseFloat(h) && 1 > parseFloat(h) ? (a.style.filter = "alpha(opacity=" + 100 * h + ")", a.style.opacity = h) : 1 == parseFloat(h) && (a.style.filter = "", a.style.opacity = "")
};
OpenLayers.Util.createDiv = function (a, b, c, d, e, f, g, h) {
    var k = document.createElement("div");
    d && (k.style.backgroundImage = "url(" + d + ")");
    a || (a = OpenLayers.Util.createUniqueID("OpenLayersDiv"));
    e || (e = "absolute");
    OpenLayers.Util.modifyDOMElement(k, a, b, c, e, f, g, h);
    return k
};
OpenLayers.Util.createImage = function (a, b, c, d, e, f, g, h) {
    var k = document.createElement("img");
    a || (a = OpenLayers.Util.createUniqueID("OpenLayersDiv"));
    e || (e = "relative");
    OpenLayers.Util.modifyDOMElement(k, a, b, c, e, f, null, g);
    h && (k.style.display = "none", b = function () {
        k.style.display = "";
        OpenLayers.Event.stopObservingElement(k)
    }, OpenLayers.Event.observe(k, "load", b), OpenLayers.Event.observe(k, "error", b));
    k.style.alt = a;
    k.galleryImg = "no";
    d && (k.src = d);
    return k
};
OpenLayers.IMAGE_RELOAD_ATTEMPTS = 0;
OpenLayers.Util.alphaHackNeeded = null;
OpenLayers.Util.alphaHack = function () {
    if (null == OpenLayers.Util.alphaHackNeeded) {
        var a = navigator.appVersion.split("MSIE"), a = parseFloat(a[1]), b = !1;
        try {
            b = !!document.body.filters
        } catch (c) {
        }
        OpenLayers.Util.alphaHackNeeded = b && 5.5 <= a && 7 > a
    }
    return OpenLayers.Util.alphaHackNeeded
};
OpenLayers.Util.modifyAlphaImageDiv = function (a, b, c, d, e, f, g, h, k) {
    OpenLayers.Util.modifyDOMElement(a, b, c, d, f, null, null, k);
    b = a.childNodes[0];
    e && (b.src = e);
    OpenLayers.Util.modifyDOMElement(b, a.id + "_innerImage", null, d, "relative", g);
    OpenLayers.Util.alphaHack() && ("none" != a.style.display && (a.style.display = "inline-block"), null == h && (h = "scale"), a.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + b.src + "', sizingMethod='" + h + "')", 0 <= parseFloat(a.style.opacity) && 1 > parseFloat(a.style.opacity) &&
        (a.style.filter += " alpha(opacity=" + 100 * a.style.opacity + ")"), b.style.filter = "alpha(opacity=0)")
};
OpenLayers.Util.createAlphaImageDiv = function (a, b, c, d, e, f, g, h, k) {
    var l = OpenLayers.Util.createDiv();
    k = OpenLayers.Util.createImage(null, null, null, null, null, null, null, k);
    k.className = "olAlphaImg";
    l.appendChild(k);
    OpenLayers.Util.modifyAlphaImageDiv(l, a, b, c, d, e, f, g, h);
    return l
};
OpenLayers.Util.upperCaseObject = function (a) {
    var b = {}, c;
    for (c in a)b[c.toUpperCase()] = a[c];
    return b
};
OpenLayers.Util.applyDefaults = function (a, b) {
    a = a || {};
    var c = "function" == typeof window.Event && b instanceof window.Event, d;
    for (d in b)if (void 0 === a[d] || !c && b.hasOwnProperty && b.hasOwnProperty(d) && !a.hasOwnProperty(d))a[d] = b[d];
    !c && (b && b.hasOwnProperty && b.hasOwnProperty("toString") && !a.hasOwnProperty("toString")) && (a.toString = b.toString);
    return a
};
OpenLayers.Util.getParameterString = function (a) {
    var b = [], c;
    for (c in a) {
        var d = a[c];
        if (null != d && "function" != typeof d) {
            if ("object" == typeof d && d.constructor == Array) {
                for (var e = [], f, g = 0, h = d.length; g < h; g++)f = d[g], e.push(encodeURIComponent(null === f || void 0 === f ? "" : f));
                d = e.join(",")
            } else d = encodeURIComponent(d);
            b.push(encodeURIComponent(c) + "=" + d)
        }
    }
    return b.join("&")
};
OpenLayers.Util.urlAppend = function (a, b) {
    var c = a;
    if (b)var d = (a + " ").split(/[?&]/), c = c + (" " === d.pop() ? b : d.length ? "&" + b : "?" + b);
    return c
};
OpenLayers.Util.getImagesLocation = function () {
    return OpenLayers.ImgPath || OpenLayers._getScriptLocation() + "img/"
};
OpenLayers.Util.getImageLocation = function (a) {
    return OpenLayers.Util.getImagesLocation() + a
};
OpenLayers.Util.Try = function () {
    for (var a = null, b = 0, c = arguments.length; b < c; b++) {
        var d = arguments[b];
        try {
            a = d();
            break
        } catch (e) {
        }
    }
    return a
};
OpenLayers.Util.getXmlNodeValue = function (a) {
    var b = null;
    OpenLayers.Util.Try(function () {
        b = a.text;
        b || (b = a.textContent);
        b || (b = a.firstChild.nodeValue)
    }, function () {
        b = a.textContent
    });
    return b
};
OpenLayers.Util.mouseLeft = function (a, b) {
    for (var c = a.relatedTarget ? a.relatedTarget : a.toElement; c != b && null != c;)c = c.parentNode;
    return c != b
};
OpenLayers.Util.DEFAULT_PRECISION = 14;
OpenLayers.Util.toFloat = function (a, b) {
    null == b && (b = OpenLayers.Util.DEFAULT_PRECISION);
    "number" !== typeof a && (a = parseFloat(a));
    return 0 === b ? a : parseFloat(a.toPrecision(b))
};
OpenLayers.Util.rad = function (a) {
    return a * Math.PI / 180
};
OpenLayers.Util.deg = function (a) {
    return 180 * a / Math.PI
};
OpenLayers.Util.VincentyConstants = {a: 6378137, b: 6356752.3142, f: 1 / 298.257223563};
OpenLayers.Util.distVincenty = function (a, b) {
    for (var c = OpenLayers.Util.VincentyConstants, d = c.a, e = c.b, c = c.f, f = OpenLayers.Util.rad(b.lon - a.lon), g = Math.atan((1 - c) * Math.tan(OpenLayers.Util.rad(a.lat))), h = Math.atan((1 - c) * Math.tan(OpenLayers.Util.rad(b.lat))), k = Math.sin(g), g = Math.cos(g), l = Math.sin(h), h = Math.cos(h), m = f, r = 2 * Math.PI, p = 20; 1E-12 < Math.abs(m - r) && 0 < --p;) {
        var n = Math.sin(m), q = Math.cos(m), s = Math.sqrt(h * n * h * n + (g * l - k * h * q) * (g * l - k * h * q));
        if (0 == s)return 0;
        var q = k * l + g * h * q, t = Math.atan2(s, q), u = Math.asin(g * h *
            n / s), v = Math.cos(u) * Math.cos(u), n = q - 2 * k * l / v, w = c / 16 * v * (4 + c * (4 - 3 * v)), r = m, m = f + (1 - w) * c * Math.sin(u) * (t + w * s * (n + w * q * (-1 + 2 * n * n)))
    }
    if (0 == p)return NaN;
    d = v * (d * d - e * e) / (e * e);
    c = d / 1024 * (256 + d * (-128 + d * (74 - 47 * d)));
    return(e * (1 + d / 16384 * (4096 + d * (-768 + d * (320 - 175 * d)))) * (t - c * s * (n + c / 4 * (q * (-1 + 2 * n * n) - c / 6 * n * (-3 + 4 * s * s) * (-3 + 4 * n * n))))).toFixed(3) / 1E3
};
OpenLayers.Util.destinationVincenty = function (a, b, c) {
    var d = OpenLayers.Util, e = d.VincentyConstants, f = e.a, g = e.b, h = e.f, e = a.lon;
    a = a.lat;
    var k = d.rad(b);
    b = Math.sin(k);
    k = Math.cos(k);
    a = (1 - h) * Math.tan(d.rad(a));
    var l = 1 / Math.sqrt(1 + a * a), m = a * l, r = Math.atan2(a, k);
    a = l * b;
    for (var p = 1 - a * a, f = p * (f * f - g * g) / (g * g), n = 1 + f / 16384 * (4096 + f * (-768 + f * (320 - 175 * f))), q = f / 1024 * (256 + f * (-128 + f * (74 - 47 * f))), f = c / (g * n), s = 2 * Math.PI; 1E-12 < Math.abs(f - s);)var t = Math.cos(2 * r + f), u = Math.sin(f), v = Math.cos(f), w = q * u * (t + q / 4 * (v * (-1 + 2 * t * t) - q / 6 * t * (-3 + 4 *
        u * u) * (-3 + 4 * t * t))), s = f, f = c / (g * n) + w;
    c = m * u - l * v * k;
    g = Math.atan2(m * v + l * u * k, (1 - h) * Math.sqrt(a * a + c * c));
    b = Math.atan2(u * b, l * v - m * u * k);
    k = h / 16 * p * (4 + h * (4 - 3 * p));
    t = b - (1 - k) * h * a * (f + k * u * (t + k * v * (-1 + 2 * t * t)));
    Math.atan2(a, -c);
    return new OpenLayers.LonLat(e + d.deg(t), d.deg(g))
};
OpenLayers.Util.getParameters = function (a, b) {
    b = b || {};
    a = null === a || void 0 === a ? window.location.href : a;
    var c = "";
    if (OpenLayers.String.contains(a, "?"))var d = a.indexOf("?") + 1, c = OpenLayers.String.contains(a, "#") ? a.indexOf("#") : a.length, c = a.substring(d, c);
    for (var d = {}, c = c.split(/[&;]/), e = 0, f = c.length; e < f; ++e) {
        var g = c[e].split("=");
        if (g[0]) {
            var h = g[0];
            try {
                h = decodeURIComponent(h)
            } catch (k) {
                h = unescape(h)
            }
            g = (g[1] || "").replace(/\+/g, " ");
            try {
                g = decodeURIComponent(g)
            } catch (l) {
                g = unescape(g)
            }
            !1 !== b.splitArgs && (g = g.split(","));
            1 == g.length && (g = g[0]);
            d[h] = g
        }
    }
    return d
};
OpenLayers.Util.lastSeqID = 0;
OpenLayers.Util.createUniqueID = function (a) {
    a = null == a ? "id_" : a.replace(OpenLayers.Util.dotless, "_");
    OpenLayers.Util.lastSeqID += 1;
    return a + OpenLayers.Util.lastSeqID
};
OpenLayers.INCHES_PER_UNIT = {inches: 1, ft: 12, mi: 63360, m: 39.37, km: 39370, dd: 4374754, yd: 36};
OpenLayers.INCHES_PER_UNIT["in"] = OpenLayers.INCHES_PER_UNIT.inches;
OpenLayers.INCHES_PER_UNIT.degrees = OpenLayers.INCHES_PER_UNIT.dd;
OpenLayers.INCHES_PER_UNIT.nmi = 1852 * OpenLayers.INCHES_PER_UNIT.m;
OpenLayers.METERS_PER_INCH = 0.0254000508001016;
OpenLayers.Util.extend(OpenLayers.INCHES_PER_UNIT, {Inch: OpenLayers.INCHES_PER_UNIT.inches, Meter: 1 / OpenLayers.METERS_PER_INCH, Foot: 0.3048006096012192 / OpenLayers.METERS_PER_INCH, IFoot: 0.3048 / OpenLayers.METERS_PER_INCH, ClarkeFoot: 0.3047972651151 / OpenLayers.METERS_PER_INCH, SearsFoot: 0.30479947153867626 / OpenLayers.METERS_PER_INCH, GoldCoastFoot: 0.3047997101815088 / OpenLayers.METERS_PER_INCH, IInch: 0.0254 / OpenLayers.METERS_PER_INCH, MicroInch: 2.54E-5 / OpenLayers.METERS_PER_INCH, Mil: 2.54E-8 / OpenLayers.METERS_PER_INCH,
    Centimeter: 0.01 / OpenLayers.METERS_PER_INCH, Kilometer: 1E3 / OpenLayers.METERS_PER_INCH, Yard: 0.9144018288036576 / OpenLayers.METERS_PER_INCH, SearsYard: 0.914398414616029 / OpenLayers.METERS_PER_INCH, IndianYard: 0.9143985307444408 / OpenLayers.METERS_PER_INCH, IndianYd37: 0.91439523 / OpenLayers.METERS_PER_INCH, IndianYd62: 0.9143988 / OpenLayers.METERS_PER_INCH, IndianYd75: 0.9143985 / OpenLayers.METERS_PER_INCH, IndianFoot: 0.30479951 / OpenLayers.METERS_PER_INCH, IndianFt37: 0.30479841 / OpenLayers.METERS_PER_INCH, IndianFt62: 0.3047996 /
        OpenLayers.METERS_PER_INCH, IndianFt75: 0.3047995 / OpenLayers.METERS_PER_INCH, Mile: 1609.3472186944373 / OpenLayers.METERS_PER_INCH, IYard: 0.9144 / OpenLayers.METERS_PER_INCH, IMile: 1609.344 / OpenLayers.METERS_PER_INCH, NautM: 1852 / OpenLayers.METERS_PER_INCH, "Lat-66": 110943.31648893273 / OpenLayers.METERS_PER_INCH, "Lat-83": 110946.25736872235 / OpenLayers.METERS_PER_INCH, Decimeter: 0.1 / OpenLayers.METERS_PER_INCH, Millimeter: 0.001 / OpenLayers.METERS_PER_INCH, Dekameter: 10 / OpenLayers.METERS_PER_INCH, Decameter: 10 / OpenLayers.METERS_PER_INCH,
    Hectometer: 100 / OpenLayers.METERS_PER_INCH, GermanMeter: 1.0000135965 / OpenLayers.METERS_PER_INCH, CaGrid: 0.999738 / OpenLayers.METERS_PER_INCH, ClarkeChain: 20.1166194976 / OpenLayers.METERS_PER_INCH, GunterChain: 20.11684023368047 / OpenLayers.METERS_PER_INCH, BenoitChain: 20.116782494375872 / OpenLayers.METERS_PER_INCH, SearsChain: 20.11676512155 / OpenLayers.METERS_PER_INCH, ClarkeLink: 0.201166194976 / OpenLayers.METERS_PER_INCH, GunterLink: 0.2011684023368047 / OpenLayers.METERS_PER_INCH, BenoitLink: 0.20116782494375873 / OpenLayers.METERS_PER_INCH,
    SearsLink: 0.2011676512155 / OpenLayers.METERS_PER_INCH, Rod: 5.02921005842012 / OpenLayers.METERS_PER_INCH, IntnlChain: 20.1168 / OpenLayers.METERS_PER_INCH, IntnlLink: 0.201168 / OpenLayers.METERS_PER_INCH, Perch: 5.02921005842012 / OpenLayers.METERS_PER_INCH, Pole: 5.02921005842012 / OpenLayers.METERS_PER_INCH, Furlong: 201.1684023368046 / OpenLayers.METERS_PER_INCH, Rood: 3.778266898 / OpenLayers.METERS_PER_INCH, CapeFoot: 0.3047972615 / OpenLayers.METERS_PER_INCH, Brealey: 375 / OpenLayers.METERS_PER_INCH, ModAmFt: 0.304812252984506 /
        OpenLayers.METERS_PER_INCH, Fathom: 1.8288 / OpenLayers.METERS_PER_INCH, "NautM-UK": 1853.184 / OpenLayers.METERS_PER_INCH, "50kilometers": 5E4 / OpenLayers.METERS_PER_INCH, "150kilometers": 15E4 / OpenLayers.METERS_PER_INCH});
OpenLayers.Util.extend(OpenLayers.INCHES_PER_UNIT, {mm: OpenLayers.INCHES_PER_UNIT.Meter / 1E3, cm: OpenLayers.INCHES_PER_UNIT.Meter / 100, dm: 100 * OpenLayers.INCHES_PER_UNIT.Meter, km: 1E3 * OpenLayers.INCHES_PER_UNIT.Meter, kmi: OpenLayers.INCHES_PER_UNIT.nmi, fath: OpenLayers.INCHES_PER_UNIT.Fathom, ch: OpenLayers.INCHES_PER_UNIT.IntnlChain, link: OpenLayers.INCHES_PER_UNIT.IntnlLink, "us-in": OpenLayers.INCHES_PER_UNIT.inches, "us-ft": OpenLayers.INCHES_PER_UNIT.Foot, "us-yd": OpenLayers.INCHES_PER_UNIT.Yard, "us-ch": OpenLayers.INCHES_PER_UNIT.GunterChain,
    "us-mi": OpenLayers.INCHES_PER_UNIT.Mile, "ind-yd": OpenLayers.INCHES_PER_UNIT.IndianYd37, "ind-ft": OpenLayers.INCHES_PER_UNIT.IndianFt37, "ind-ch": 20.11669506 / OpenLayers.METERS_PER_INCH});
OpenLayers.DOTS_PER_INCH = 72;
OpenLayers.Util.normalizeScale = function (a) {
    return 1 < a ? 1 / a : a
};
OpenLayers.Util.getResolutionFromScale = function (a, b) {
    var c;
    a && (null == b && (b = "degrees"), c = 1 / (OpenLayers.Util.normalizeScale(a) * OpenLayers.INCHES_PER_UNIT[b] * OpenLayers.DOTS_PER_INCH));
    return c
};
OpenLayers.Util.getScaleFromResolution = function (a, b) {
    null == b && (b = "degrees");
    return a * OpenLayers.INCHES_PER_UNIT[b] * OpenLayers.DOTS_PER_INCH
};
OpenLayers.Util.pagePosition = function (a) {
    var b = [0, 0], c = OpenLayers.Util.getViewportElement();
    if (!a || a == window || a == c)return b;
    var d = OpenLayers.IS_GECKO && document.getBoxObjectFor && "absolute" == OpenLayers.Element.getStyle(a, "position") && ("" == a.style.top || "" == a.style.left), e = null;
    if (a.getBoundingClientRect)a = a.getBoundingClientRect(), e = window.pageYOffset || c.scrollTop, b[0] = a.left + (window.pageXOffset || c.scrollLeft), b[1] = a.top + e; else if (document.getBoxObjectFor && !d)a = document.getBoxObjectFor(a), c = document.getBoxObjectFor(c),
        b[0] = a.screenX - c.screenX, b[1] = a.screenY - c.screenY; else {
        b[0] = a.offsetLeft;
        b[1] = a.offsetTop;
        e = a.offsetParent;
        if (e != a)for (; e;)b[0] += e.offsetLeft, b[1] += e.offsetTop, e = e.offsetParent;
        c = OpenLayers.BROWSER_NAME;
        if ("opera" == c || "safari" == c && "absolute" == OpenLayers.Element.getStyle(a, "position"))b[1] -= document.body.offsetTop;
        for (e = a.offsetParent; e && e != document.body;) {
            b[0] -= e.scrollLeft;
            if ("opera" != c || "TR" != e.tagName)b[1] -= e.scrollTop;
            e = e.offsetParent
        }
    }
    return b
};
OpenLayers.Util.getViewportElement = function () {
    var a = arguments.callee.viewportElement;
    void 0 == a && (a = "msie" == OpenLayers.BROWSER_NAME && "CSS1Compat" != document.compatMode ? document.body : document.documentElement, arguments.callee.viewportElement = a);
    return a
};
OpenLayers.Util.isEquivalentUrl = function (a, b, c) {
    c = c || {};
    OpenLayers.Util.applyDefaults(c, {ignoreCase: !0, ignorePort80: !0, ignoreHash: !0, splitArgs: !1});
    a = OpenLayers.Util.createUrlObject(a, c);
    b = OpenLayers.Util.createUrlObject(b, c);
    for (var d in a)if ("args" !== d && a[d] != b[d])return!1;
    for (d in a.args) {
        if (a.args[d] != b.args[d])return!1;
        delete b.args[d]
    }
    for (d in b.args)return!1;
    return!0
};
OpenLayers.Util.createUrlObject = function (a, b) {
    b = b || {};
    if (!/^\w+:\/\//.test(a)) {
        var c = window.location, d = c.port ? ":" + c.port : "", d = c.protocol + "//" + c.host.split(":").shift() + d;
        0 === a.indexOf("/") ? a = d + a : (c = c.pathname.split("/"), c.pop(), a = d + c.join("/") + "/" + a)
    }
    b.ignoreCase && (a = a.toLowerCase());
    c = document.createElement("a");
    c.href = a;
    d = {};
    d.host = c.host.split(":").shift();
    d.protocol = c.protocol;
    d.port = b.ignorePort80 ? "80" == c.port || "0" == c.port ? "" : c.port : "" == c.port || "0" == c.port ? "80" : c.port;
    d.hash = b.ignoreHash || "#" ===
        c.hash ? "" : c.hash;
    var e = c.search;
    e || (e = a.indexOf("?"), e = -1 != e ? a.substr(e) : "");
    d.args = OpenLayers.Util.getParameters(e, {splitArgs: b.splitArgs});
    d.pathname = "/" == c.pathname.charAt(0) ? c.pathname : "/" + c.pathname;
    return d
};
OpenLayers.Util.removeTail = function (a) {
    var b = null, b = a.indexOf("?"), c = a.indexOf("#");
    return b = -1 == b ? -1 != c ? a.substr(0, c) : a : -1 != c ? a.substr(0, Math.min(b, c)) : a.substr(0, b)
};
OpenLayers.IS_GECKO = function () {
    var a = navigator.userAgent.toLowerCase();
    return-1 == a.indexOf("webkit") && -1 != a.indexOf("gecko")
}();
OpenLayers.CANVAS_SUPPORTED = function () {
    var a = document.createElement("canvas");
    return!(!a.getContext || !a.getContext("2d"))
}();
OpenLayers.BROWSER_NAME = function () {
    var a = "", b = navigator.userAgent.toLowerCase();
    -1 != b.indexOf("opera") ? a = "opera" : -1 != b.indexOf("msie") ? a = "msie" : -1 != b.indexOf("safari") ? a = "safari" : -1 != b.indexOf("mozilla") && (a = -1 != b.indexOf("firefox") ? "firefox" : "mozilla");
    return a
}();
OpenLayers.Util.getBrowserName = function () {
    return OpenLayers.BROWSER_NAME
};
OpenLayers.Util.getRenderedDimensions = function (a, b, c) {
    var d, e, f = document.createElement("div");
    f.style.visibility = "hidden";
    for (var g = c && c.containerElement ? c.containerElement : document.body, h = !1, k = null, l = g; l && "body" != l.tagName.toLowerCase();) {
        var m = OpenLayers.Element.getStyle(l, "position");
        if ("absolute" == m) {
            h = !0;
            break
        } else if (m && "static" != m)break;
        l = l.parentNode
    }
    !h || 0 !== g.clientHeight && 0 !== g.clientWidth || (k = document.createElement("div"), k.style.visibility = "hidden", k.style.position = "absolute", k.style.overflow =
        "visible", k.style.width = document.body.clientWidth + "px", k.style.height = document.body.clientHeight + "px", k.appendChild(f));
    f.style.position = "absolute";
    b && (b.w ? (d = b.w, f.style.width = d + "px") : b.h && (e = b.h, f.style.height = e + "px"));
    c && c.displayClass && (f.className = c.displayClass);
    b = document.createElement("div");
    b.innerHTML = a;
    b.style.overflow = "visible";
    if (b.childNodes)for (a = 0, c = b.childNodes.length; a < c; a++)b.childNodes[a].style && (b.childNodes[a].style.overflow = "visible");
    f.appendChild(b);
    k ? g.appendChild(k) : g.appendChild(f);
    d || (d = parseInt(b.scrollWidth), f.style.width = d + "px");
    e || (e = parseInt(b.scrollHeight));
    f.removeChild(b);
    k ? (k.removeChild(f), g.removeChild(k)) : g.removeChild(f);
    return new OpenLayers.Size(d, e)
};
OpenLayers.Util.getScrollbarWidth = function () {
    var a = OpenLayers.Util._scrollbarWidth;
    if (null == a) {
        var b = null, c = null, b = a = 0, b = document.createElement("div");
        b.style.position = "absolute";
        b.style.top = "-1000px";
        b.style.left = "-1000px";
        b.style.width = "100px";
        b.style.height = "50px";
        b.style.overflow = "hidden";
        c = document.createElement("div");
        c.style.width = "100%";
        c.style.height = "200px";
        b.appendChild(c);
        document.body.appendChild(b);
        a = c.offsetWidth;
        b.style.overflow = "scroll";
        b = c.offsetWidth;
        document.body.removeChild(document.body.lastChild);
        OpenLayers.Util._scrollbarWidth = a - b;
        a = OpenLayers.Util._scrollbarWidth
    }
    return a
};
OpenLayers.Util.getFormattedLonLat = function (a, b, c) {
    c || (c = "dms");
    a = (a + 540) % 360 - 180;
    var d = Math.abs(a), e = Math.floor(d), f = d = (d - e) / (1 / 60), d = Math.floor(d), f = Math.round(10 * ((f - d) / (1 / 60))), f = f / 10;
    60 <= f && (f -= 60, d += 1, 60 <= d && (d -= 60, e += 1));
    10 > e && (e = "0" + e);
    e += "\u00b0";
    0 <= c.indexOf("dm") && (10 > d && (d = "0" + d), e += d + "'", 0 <= c.indexOf("dms") && (10 > f && (f = "0" + f), e += f + '"'));
    return e = "lon" == b ? e + (0 > a ? OpenLayers.i18n("W") : OpenLayers.i18n("E")) : e + (0 > a ? OpenLayers.i18n("S") : OpenLayers.i18n("N"))
};
OpenLayers.Event = {observers: !1, KEY_SPACE: 32, KEY_BACKSPACE: 8, KEY_TAB: 9, KEY_RETURN: 13, KEY_ESC: 27, KEY_LEFT: 37, KEY_UP: 38, KEY_RIGHT: 39, KEY_DOWN: 40, KEY_DELETE: 46, element: function (a) {
    return a.target || a.srcElement
}, isSingleTouch: function (a) {
    return a.touches && 1 == a.touches.length
}, isMultiTouch: function (a) {
    return a.touches && 1 < a.touches.length
}, isLeftClick: function (a) {
    return a.which && 1 == a.which || a.button && 1 == a.button
}, isRightClick: function (a) {
    return a.which && 3 == a.which || a.button && 2 == a.button
}, stop: function (a, b) {
    b || OpenLayers.Event.preventDefault(a);
    a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0
}, preventDefault: function (a) {
    a.preventDefault ? a.preventDefault() : a.returnValue = !1
}, findElement: function (a, b) {
    for (var c = OpenLayers.Event.element(a); c.parentNode && (!c.tagName || c.tagName.toUpperCase() != b.toUpperCase());)c = c.parentNode;
    return c
}, observe: function (a, b, c, d) {
    a = OpenLayers.Util.getElement(a);
    d = d || !1;
    "keypress" == b && (navigator.appVersion.match(/Konqueror|Safari|KHTML/) || a.attachEvent) && (b = "keydown");
    this.observers || (this.observers = {});
    if (!a._eventCacheID) {
        var e = "eventCacheID_";
        a.id && (e = a.id + "_" + e);
        a._eventCacheID = OpenLayers.Util.createUniqueID(e)
    }
    e = a._eventCacheID;
    this.observers[e] || (this.observers[e] = []);
    this.observers[e].push({element: a, name: b, observer: c, useCapture: d});
    a.addEventListener ? a.addEventListener(b, c, d) : a.attachEvent && a.attachEvent("on" + b, c)
}, stopObservingElement: function (a) {
    a = OpenLayers.Util.getElement(a)._eventCacheID;
    this._removeElementObservers(OpenLayers.Event.observers[a])
},
    _removeElementObservers: function (a) {
        if (a)for (var b = a.length - 1; 0 <= b; b--) {
            var c = a[b];
            OpenLayers.Event.stopObserving.apply(this, [c.element, c.name, c.observer, c.useCapture])
        }
    }, stopObserving: function (a, b, c, d) {
        d = d || !1;
        a = OpenLayers.Util.getElement(a);
        var e = a._eventCacheID;
        "keypress" == b && (navigator.appVersion.match(/Konqueror|Safari|KHTML/) || a.detachEvent) && (b = "keydown");
        var f = !1, g = OpenLayers.Event.observers[e];
        if (g)for (var h = 0; !f && h < g.length;) {
            var k = g[h];
            if (k.name == b && k.observer == c && k.useCapture == d) {
                g.splice(h,
                    1);
                0 == g.length && delete OpenLayers.Event.observers[e];
                f = !0;
                break
            }
            h++
        }
        f && (a.removeEventListener ? a.removeEventListener(b, c, d) : a && a.detachEvent && a.detachEvent("on" + b, c));
        return f
    }, unloadCache: function () {
        if (OpenLayers.Event && OpenLayers.Event.observers) {
            for (var a in OpenLayers.Event.observers)OpenLayers.Event._removeElementObservers.apply(this, [OpenLayers.Event.observers[a]]);
            OpenLayers.Event.observers = !1
        }
    }, CLASS_NAME: "OpenLayers.Event"};
OpenLayers.Event.observe(window, "unload", OpenLayers.Event.unloadCache, !1);
OpenLayers.Events = OpenLayers.Class({BROWSER_EVENTS: "mouseover mouseout mousedown mouseup mousemove click dblclick rightclick dblrightclick resize focus blur touchstart touchmove touchend keydown".split(" "), listeners: null, object: null, element: null, eventHandler: null, fallThrough: null, includeXY: !1, extensions: null, extensionCount: null, clearMouseListener: null, initialize: function (a, b, c, d, e) {
    OpenLayers.Util.extend(this, e);
    this.object = a;
    this.fallThrough = d;
    this.listeners = {};
    this.extensions = {};
    this.extensionCount =
    {};
    this._msTouches = [];
    null != b && this.attachToElement(b)
}, destroy: function () {
    for (var a in this.extensions)"boolean" !== typeof this.extensions[a] && this.extensions[a].destroy();
    this.extensions = null;
    this.element && (OpenLayers.Event.stopObservingElement(this.element), this.element.hasScrollEvent && OpenLayers.Event.stopObserving(window, "scroll", this.clearMouseListener));
    this.eventHandler = this.fallThrough = this.object = this.listeners = this.element = null
}, addEventType: function (a) {
}, attachToElement: function (a) {
    this.element ?
        OpenLayers.Event.stopObservingElement(this.element) : (this.eventHandler = OpenLayers.Function.bindAsEventListener(this.handleBrowserEvent, this), this.clearMouseListener = OpenLayers.Function.bind(this.clearMouseCache, this));
    this.element = a;
    for (var b = !!window.navigator.msMaxTouchPoints, c, d = 0, e = this.BROWSER_EVENTS.length; d < e; d++)c = this.BROWSER_EVENTS[d], OpenLayers.Event.observe(a, c, this.eventHandler), b && 0 === c.indexOf("touch") && this.addMsTouchListener(a, c, this.eventHandler);
    OpenLayers.Event.observe(a, "dragstart",
        OpenLayers.Event.stop)
}, on: function (a) {
    for (var b in a)"scope" != b && a.hasOwnProperty(b) && this.register(b, a.scope, a[b])
}, register: function (a, b, c, d) {
    a in OpenLayers.Events && !this.extensions[a] && (this.extensions[a] = new OpenLayers.Events[a](this));
    if (null != c) {
        null == b && (b = this.object);
        var e = this.listeners[a];
        e || (e = [], this.listeners[a] = e, this.extensionCount[a] = 0);
        b = {obj: b, func: c};
        d ? (e.splice(this.extensionCount[a], 0, b), "object" === typeof d && d.extension && this.extensionCount[a]++) : e.push(b)
    }
}, registerPriority: function (a, b, c) {
    this.register(a, b, c, !0)
}, un: function (a) {
    for (var b in a)"scope" != b && a.hasOwnProperty(b) && this.unregister(b, a.scope, a[b])
}, unregister: function (a, b, c) {
    null == b && (b = this.object);
    a = this.listeners[a];
    if (null != a)for (var d = 0, e = a.length; d < e; d++)if (a[d].obj == b && a[d].func == c) {
        a.splice(d, 1);
        break
    }
}, remove: function (a) {
    null != this.listeners[a] && (this.listeners[a] = [])
}, triggerEvent: function (a, b) {
    var c = this.listeners[a];
    if (c && 0 != c.length) {
        null == b && (b = {});
        b.object = this.object;
        b.element = this.element;
        b.type || (b.type =
            a);
        for (var c = c.slice(), d, e = 0, f = c.length; e < f && (d = c[e], d = d.func.apply(d.obj, [b]), void 0 == d || !1 != d); e++);
        this.fallThrough || OpenLayers.Event.stop(b, !0);
        return d
    }
}, handleBrowserEvent: function (a) {
    var b = a.type, c = this.listeners[b];
    if (c && 0 != c.length) {
        if ((c = a.touches) && c[0]) {
            for (var d = 0, e = 0, f = c.length, g, h = 0; h < f; ++h)g = this.getTouchClientXY(c[h]), d += g.clientX, e += g.clientY;
            a.clientX = d / f;
            a.clientY = e / f
        }
        this.includeXY && (a.xy = this.getMousePosition(a));
        this.triggerEvent(b, a)
    }
}, getTouchClientXY: function (a) {
    var b = window.olMockWin ||
        window, c = b.pageXOffset, b = b.pageYOffset, d = a.clientX, e = a.clientY;
    if (0 === a.pageY && Math.floor(e) > Math.floor(a.pageY) || 0 === a.pageX && Math.floor(d) > Math.floor(a.pageX))d -= c, e -= b; else if (e < a.pageY - b || d < a.pageX - c)d = a.pageX - c, e = a.pageY - b;
    a.olClientX = d;
    a.olClientY = e;
    return{clientX: d, clientY: e}
}, clearMouseCache: function () {
    this.element.scrolls = null;
    this.element.lefttop = null;
    this.element.offsets = null
}, getMousePosition: function (a) {
    this.includeXY ? this.element.hasScrollEvent || (OpenLayers.Event.observe(window, "scroll",
        this.clearMouseListener), this.element.hasScrollEvent = !0) : this.clearMouseCache();
    if (!this.element.scrolls) {
        var b = OpenLayers.Util.getViewportElement();
        this.element.scrolls = [window.pageXOffset || b.scrollLeft, window.pageYOffset || b.scrollTop]
    }
    this.element.lefttop || (this.element.lefttop = [document.documentElement.clientLeft || 0, document.documentElement.clientTop || 0]);
    this.element.offsets || (this.element.offsets = OpenLayers.Util.pagePosition(this.element));
    return new OpenLayers.Pixel(a.clientX + this.element.scrolls[0] -
        this.element.offsets[0] - this.element.lefttop[0], a.clientY + this.element.scrolls[1] - this.element.offsets[1] - this.element.lefttop[1])
}, addMsTouchListener: function (a, b, c) {
    function d(a) {
        c(OpenLayers.Util.applyDefaults({stopPropagation: function () {
            for (var a = e.length - 1; 0 <= a; --a)e[a].stopPropagation()
        }, preventDefault: function () {
            for (var a = e.length - 1; 0 <= a; --a)e[a].preventDefault()
        }, type: b}, a))
    }

    var e = this._msTouches;
    switch (b) {
        case "touchstart":
            return this.addMsTouchListenerStart(a, b, d);
        case "touchend":
            return this.addMsTouchListenerEnd(a,
                b, d);
        case "touchmove":
            return this.addMsTouchListenerMove(a, b, d);
        default:
            throw"Unknown touch event type";
    }
}, addMsTouchListenerStart: function (a, b, c) {
    var d = this._msTouches;
    OpenLayers.Event.observe(a, "MSPointerDown", function (a) {
        for (var b = !1, g = 0, h = d.length; g < h; ++g)if (d[g].pointerId == a.pointerId) {
            b = !0;
            break
        }
        b || d.push(a);
        a.touches = d.slice();
        c(a)
    });
    OpenLayers.Event.observe(a, "MSPointerUp", function (a) {
        for (var b = 0, c = d.length; b < c; ++b)if (d[b].pointerId == a.pointerId) {
            d.splice(b, 1);
            break
        }
    })
}, addMsTouchListenerMove: function (a, b, c) {
    var d = this._msTouches;
    OpenLayers.Event.observe(a, "MSPointerMove", function (a) {
        if (a.pointerType != a.MSPOINTER_TYPE_MOUSE || 0 != a.buttons)if (1 != d.length || d[0].pageX != a.pageX || d[0].pageY != a.pageY) {
            for (var b = 0, g = d.length; b < g; ++b)if (d[b].pointerId == a.pointerId) {
                d[b] = a;
                break
            }
            a.touches = d.slice();
            c(a)
        }
    })
}, addMsTouchListenerEnd: function (a, b, c) {
    var d = this._msTouches;
    OpenLayers.Event.observe(a, "MSPointerUp", function (a) {
        for (var b = 0, g = d.length; b < g; ++b)if (d[b].pointerId == a.pointerId) {
            d.splice(b, 1);
            break
        }
        a.touches =
            d.slice();
        c(a)
    })
}, CLASS_NAME: "OpenLayers.Events"});
OpenLayers.Events.buttonclick = OpenLayers.Class({target: null, events: "mousedown mouseup click dblclick touchstart touchmove touchend keydown".split(" "), startRegEx: /^mousedown|touchstart$/, cancelRegEx: /^touchmove$/, completeRegEx: /^mouseup|touchend$/, initialize: function (a) {
    this.target = a;
    for (a = this.events.length - 1; 0 <= a; --a)this.target.register(this.events[a], this, this.buttonClick, {extension: !0})
}, destroy: function () {
    for (var a = this.events.length - 1; 0 <= a; --a)this.target.unregister(this.events[a], this, this.buttonClick);
    delete this.target
}, getPressedButton: function (a) {
    var b = 3, c;
    do {
        if (OpenLayers.Element.hasClass(a, "olButton")) {
            c = a;
            break
        }
        a = a.parentNode
    } while (0 < --b && a);
    return c
}, ignore: function (a) {
    var b = 3, c = !1;
    do {
        if ("a" === a.nodeName.toLowerCase()) {
            c = !0;
            break
        }
        a = a.parentNode
    } while (0 < --b && a);
    return c
}, buttonClick: function (a) {
    var b = !0, c = OpenLayers.Event.element(a);
    if (c && (OpenLayers.Event.isLeftClick(a) || !~a.type.indexOf("mouse")))if (c = this.getPressedButton(c)) {
        if ("keydown" === a.type)switch (a.keyCode) {
            case OpenLayers.Event.KEY_RETURN:
            case OpenLayers.Event.KEY_SPACE:
                this.target.triggerEvent("buttonclick",
                    {buttonElement: c}), OpenLayers.Event.stop(a), b = !1
        } else if (this.startEvt) {
            if (this.completeRegEx.test(a.type)) {
                var b = OpenLayers.Util.pagePosition(c), d = OpenLayers.Util.getViewportElement(), e = window.pageYOffset || d.scrollTop;
                b[0] -= window.pageXOffset || d.scrollLeft;
                b[1] -= e;
                this.target.triggerEvent("buttonclick", {buttonElement: c, buttonXY: {x: this.startEvt.clientX - b[0], y: this.startEvt.clientY - b[1]}})
            }
            this.cancelRegEx.test(a.type) && delete this.startEvt;
            OpenLayers.Event.stop(a);
            b = !1
        }
        this.startRegEx.test(a.type) &&
        (this.startEvt = a, OpenLayers.Event.stop(a), b = !1)
    } else b = !this.ignore(OpenLayers.Event.element(a)), delete this.startEvt;
    return b
}});
OpenLayers.Util = OpenLayers.Util || {};
OpenLayers.Util.vendorPrefix = function () {
    function a(a) {
        return a ? a.replace(/([A-Z])/g,function (a) {
            return"-" + a.toLowerCase()
        }).replace(/^ms-/, "-ms-") : null
    }

    function b(a, b) {
        if (void 0 === g[b]) {
            var c, e = 0, f = d.length, p = "undefined" !== typeof a.cssText;
            for (g[b] = null; e < f; e++)if ((c = d[e]) ? (p || (c = c.toLowerCase()), c = c + b.charAt(0).toUpperCase() + b.slice(1)) : c = b, void 0 !== a[c]) {
                g[b] = c;
                break
            }
        }
        return g[b]
    }

    function c(a) {
        return b(e, a)
    }

    var d = ["", "O", "ms", "Moz", "Webkit"], e = document.createElement("div").style, f = {}, g = {};
    return{css: function (b) {
        if (void 0 ===
            f[b]) {
            var d = b.replace(/(-[\s\S])/g, function (a) {
                return a.charAt(1).toUpperCase()
            }), d = c(d);
            f[b] = a(d)
        }
        return f[b]
    }, js: b, style: c, cssCache: f, jsCache: g}
}();
OpenLayers.Animation = function (a) {
    var b = OpenLayers.Util.vendorPrefix.js(a, "requestAnimationFrame"), c = !!b, d = function () {
        var c = a[b] || function (b, c) {
            a.setTimeout(b, 16)
        };
        return function (b, d) {
            c.apply(a, [b, d])
        }
    }(), e = 0, f = {};
    return{isNative: c, requestFrame: d, start: function (a, b, c) {
        b = 0 < b ? b : Number.POSITIVE_INFINITY;
        var l = ++e, m = +new Date;
        f[l] = function () {
            f[l] && +new Date - m <= b ? (a(), f[l] && d(f[l], c)) : delete f[l]
        };
        d(f[l], c);
        return l
    }, stop: function (a) {
        delete f[a]
    }}
}(window);
OpenLayers.Tween = OpenLayers.Class({easing: null, begin: null, finish: null, duration: null, callbacks: null, time: null, minFrameRate: null, startTime: null, animationId: null, playing: !1, initialize: function (a) {
    this.easing = a ? a : OpenLayers.Easing.Expo.easeOut
}, start: function (a, b, c, d) {
    this.playing = !0;
    this.begin = a;
    this.finish = b;
    this.duration = c;
    this.callbacks = d.callbacks;
    this.minFrameRate = d.minFrameRate || 30;
    this.time = 0;
    this.startTime = (new Date).getTime();
    OpenLayers.Animation.stop(this.animationId);
    this.animationId = null;
    this.callbacks && this.callbacks.start && this.callbacks.start.call(this, this.begin);
    this.animationId = OpenLayers.Animation.start(OpenLayers.Function.bind(this.play, this))
}, stop: function () {
    this.playing && (this.callbacks && this.callbacks.done && this.callbacks.done.call(this, this.finish), OpenLayers.Animation.stop(this.animationId), this.animationId = null, this.playing = !1)
}, play: function () {
    var a = {}, b;
    for (b in this.begin) {
        var c = this.begin[b], d = this.finish[b];
        if (null == c || null == d || isNaN(c) || isNaN(d))throw new TypeError("invalid value for Tween");
        a[b] = this.easing.apply(this, [this.time, c, d - c, this.duration])
    }
    this.time++;
    this.callbacks && this.callbacks.eachStep && ((new Date).getTime() - this.startTime) / this.time <= 1E3 / this.minFrameRate && this.callbacks.eachStep.call(this, a);
    this.time > this.duration && this.stop()
}, CLASS_NAME: "OpenLayers.Tween"});
OpenLayers.Easing = {CLASS_NAME: "OpenLayers.Easing"};
OpenLayers.Easing.Linear = {easeIn: function (a, b, c, d) {
    return c * a / d + b
}, easeOut: function (a, b, c, d) {
    return c * a / d + b
}, easeInOut: function (a, b, c, d) {
    return c * a / d + b
}, CLASS_NAME: "OpenLayers.Easing.Linear"};
OpenLayers.Easing.Expo = {easeIn: function (a, b, c, d) {
    return 0 == a ? b : c * Math.pow(2, 10 * (a / d - 1)) + b
}, easeOut: function (a, b, c, d) {
    return a == d ? b + c : c * (-Math.pow(2, -10 * a / d) + 1) + b
}, easeInOut: function (a, b, c, d) {
    return 0 == a ? b : a == d ? b + c : 1 > (a /= d / 2) ? c / 2 * Math.pow(2, 10 * (a - 1)) + b : c / 2 * (-Math.pow(2, -10 * --a) + 2) + b
}, CLASS_NAME: "OpenLayers.Easing.Expo"};
OpenLayers.Easing.Quad = {easeIn: function (a, b, c, d) {
    return c * (a /= d) * a + b
}, easeOut: function (a, b, c, d) {
    return-c * (a /= d) * (a - 2) + b
}, easeInOut: function (a, b, c, d) {
    return 1 > (a /= d / 2) ? c / 2 * a * a + b : -c / 2 * (--a * (a - 2) - 1) + b
}, CLASS_NAME: "OpenLayers.Easing.Quad"};
OpenLayers.Projection = OpenLayers.Class({proj: null, projCode: null, titleRegEx: /\+title=[^\+]*/, initialize: function (a, b) {
    OpenLayers.Util.extend(this, b);
    this.projCode = a;
    "object" == typeof Proj4js && (this.proj = new Proj4js.Proj(a))
}, getCode: function () {
    return this.proj ? this.proj.srsCode : this.projCode
}, getUnits: function () {
    return this.proj ? this.proj.units : null
}, toString: function () {
    return this.getCode()
}, equals: function (a) {
    var b = !1;
    a && (a instanceof OpenLayers.Projection || (a = new OpenLayers.Projection(a)), "object" == typeof Proj4js && this.proj.defData && a.proj.defData ? b = this.proj.defData.replace(this.titleRegEx, "") == a.proj.defData.replace(this.titleRegEx, "") : a.getCode && (b = this.getCode(), a = a.getCode(), b = b == a || !!OpenLayers.Projection.transforms[b] && OpenLayers.Projection.transforms[b][a] === OpenLayers.Projection.nullTransform));
    return b
}, destroy: function () {
    delete this.proj;
    delete this.projCode
}, CLASS_NAME: "OpenLayers.Projection"});
OpenLayers.Projection.transforms = {};
OpenLayers.Projection.defaults = {"EPSG:4326": {units: "degrees", maxExtent: [-180, -90, 180, 90], yx: !0}, "CRS:84": {units: "degrees", maxExtent: [-180, -90, 180, 90]}, "EPSG:900913": {units: "m", maxExtent: [-2.003750834E7, -2.003750834E7, 2.003750834E7, 2.003750834E7]}};
OpenLayers.Projection.addTransform = function (a, b, c) {
    if (c === OpenLayers.Projection.nullTransform) {
        var d = OpenLayers.Projection.defaults[a];
        d && !OpenLayers.Projection.defaults[b] && (OpenLayers.Projection.defaults[b] = d)
    }
    OpenLayers.Projection.transforms[a] || (OpenLayers.Projection.transforms[a] = {});
    OpenLayers.Projection.transforms[a][b] = c
};
OpenLayers.Projection.transform = function (a, b, c) {
    if (b && c)if (b instanceof OpenLayers.Projection || (b = new OpenLayers.Projection(b)), c instanceof OpenLayers.Projection || (c = new OpenLayers.Projection(c)), b.proj && c.proj)a = Proj4js.transform(b.proj, c.proj, a); else {
        b = b.getCode();
        c = c.getCode();
        var d = OpenLayers.Projection.transforms;
        if (d[b] && d[b][c])d[b][c](a)
    }
    return a
};
OpenLayers.Projection.nullTransform = function (a) {
    return a
};
(function () {
    function a(a) {
        a.x = 180 * a.x / d;
        a.y = 180 / Math.PI * (2 * Math.atan(Math.exp(a.y / d * Math.PI)) - Math.PI / 2);
        return a
    }

    function b(a) {
        a.x = a.x * d / 180;
        var b = Math.log(Math.tan((90 + a.y) * Math.PI / 360)) / Math.PI * d;
        a.y = Math.max(-2.003750834E7, Math.min(b, 2.003750834E7));
        return a
    }

    function c(c, d) {
        var e = OpenLayers.Projection.addTransform, f = OpenLayers.Projection.nullTransform, g, p, n, q, s;
        g = 0;
        for (p = d.length; g < p; ++g)for (n = d[g], e(c, n, b), e(n, c, a), s = g + 1; s < p; ++s)q = d[s], e(n, q, f), e(q, n, f)
    }

    var d = 2.003750834E7, e = ["EPSG:900913", "EPSG:3857",
        "EPSG:102113", "EPSG:102100"], f = ["CRS:84", "urn:ogc:def:crs:EPSG:6.6:4326", "EPSG:4326"], g;
    for (g = e.length - 1; 0 <= g; --g)c(e[g], f);
    for (g = f.length - 1; 0 <= g; --g)c(f[g], e)
})();
OpenLayers.Map = OpenLayers.Class({Z_INDEX_BASE: {BaseLayer: 100, Overlay: 325, Feature: 725, Popup: 750, Control: 1E3}, id: null, fractionalZoom: !1, events: null, allOverlays: !1, div: null, dragging: !1, size: null, viewPortDiv: null, layerContainerOrigin: null, layerContainerDiv: null, layers: null, controls: null, popups: null, baseLayer: null, center: null, resolution: null, zoom: 0, panRatio: 1.5, options: null, tileSize: null, projection: "EPSG:4326", units: null, resolutions: null, maxResolution: null, minResolution: null, maxScale: null, minScale: null,
    maxExtent: null, minExtent: null, restrictedExtent: null, numZoomLevels: 16, theme: null, displayProjection: null, fallThrough: !1, autoUpdateSize: !0, eventListeners: null, panTween: null, panMethod: OpenLayers.Easing.Expo.easeOut, panDuration: 50, zoomTween: null, zoomMethod: OpenLayers.Easing.Quad.easeOut, zoomDuration: 20, paddingForPopups: null, layerContainerOriginPx: null, minPx: null, maxPx: null, initialize: function (a, b) {
        1 === arguments.length && "object" === typeof a && (a = (b = a) && b.div);
        this.tileSize = new OpenLayers.Size(OpenLayers.Map.TILE_WIDTH,
            OpenLayers.Map.TILE_HEIGHT);
        this.paddingForPopups = new OpenLayers.Bounds(15, 15, 15, 15);
        this.theme = OpenLayers._getScriptLocation() + "theme/default/style.css";
        this.options = OpenLayers.Util.extend({}, b);
        OpenLayers.Util.extend(this, b);
        OpenLayers.Util.applyDefaults(this, OpenLayers.Projection.defaults[this.projection instanceof OpenLayers.Projection ? this.projection.projCode : this.projection]);
        !this.maxExtent || this.maxExtent instanceof OpenLayers.Bounds || (this.maxExtent = new OpenLayers.Bounds(this.maxExtent));
        !this.minExtent || this.minExtent instanceof OpenLayers.Bounds || (this.minExtent = new OpenLayers.Bounds(this.minExtent));
        !this.restrictedExtent || this.restrictedExtent instanceof OpenLayers.Bounds || (this.restrictedExtent = new OpenLayers.Bounds(this.restrictedExtent));
        !this.center || this.center instanceof OpenLayers.LonLat || (this.center = new OpenLayers.LonLat(this.center));
        this.layers = [];
        this.id = OpenLayers.Util.createUniqueID("OpenLayers.Map_");
        this.div = OpenLayers.Util.getElement(a);
        this.div || (this.div = document.createElement("div"),
            this.div.style.height = "1px", this.div.style.width = "1px");
        OpenLayers.Element.addClass(this.div, "olMap");
        var c = this.id + "_OpenLayers_ViewPort";
        this.viewPortDiv = OpenLayers.Util.createDiv(c, null, null, null, "relative", null, "hidden");
        this.viewPortDiv.style.width = "100%";
        this.viewPortDiv.style.height = "100%";
        this.viewPortDiv.className = "olMapViewport";
        this.div.appendChild(this.viewPortDiv);
        this.events = new OpenLayers.Events(this, this.viewPortDiv, null, this.fallThrough, {includeXY: !0});
        OpenLayers.TileManager && null !==
            this.tileManager && (this.tileManager instanceof OpenLayers.TileManager || (this.tileManager = new OpenLayers.TileManager(this.tileManager)), this.tileManager.addMap(this));
        c = this.id + "_OpenLayers_Container";
        this.layerContainerDiv = OpenLayers.Util.createDiv(c);
        this.layerContainerDiv.style.zIndex = this.Z_INDEX_BASE.Popup - 1;
        this.layerContainerOriginPx = {x: 0, y: 0};
        this.applyTransform();
        this.viewPortDiv.appendChild(this.layerContainerDiv);
        this.updateSize();
        if (this.eventListeners instanceof Object)this.events.on(this.eventListeners);
        !0 === this.autoUpdateSize && (this.updateSizeDestroy = OpenLayers.Function.bind(this.updateSize, this), OpenLayers.Event.observe(window, "resize", this.updateSizeDestroy));
        if (this.theme) {
            for (var c = !0, d = document.getElementsByTagName("link"), e = 0, f = d.length; e < f; ++e)if (OpenLayers.Util.isEquivalentUrl(d.item(e).href, this.theme)) {
                c = !1;
                break
            }
            c && (c = document.createElement("link"), c.setAttribute("rel", "stylesheet"), c.setAttribute("type", "text/css"), c.setAttribute("href", this.theme), document.getElementsByTagName("head")[0].appendChild(c))
        }
        null ==
            this.controls && (this.controls = [], null != OpenLayers.Control && (OpenLayers.Control.Navigation ? this.controls.push(new OpenLayers.Control.Navigation) : OpenLayers.Control.TouchNavigation && this.controls.push(new OpenLayers.Control.TouchNavigation), OpenLayers.Control.Zoom ? this.controls.push(new OpenLayers.Control.Zoom) : OpenLayers.Control.PanZoom && this.controls.push(new OpenLayers.Control.PanZoom), OpenLayers.Control.ArgParser && this.controls.push(new OpenLayers.Control.ArgParser), OpenLayers.Control.Attribution &&
            this.controls.push(new OpenLayers.Control.Attribution)));
        e = 0;
        for (f = this.controls.length; e < f; e++)this.addControlToMap(this.controls[e]);
        this.popups = [];
        this.unloadDestroy = OpenLayers.Function.bind(this.destroy, this);
        OpenLayers.Event.observe(window, "unload", this.unloadDestroy);
        b && b.layers && (delete this.center, delete this.zoom, this.addLayers(b.layers), b.center && !this.getCenter() && this.setCenter(b.center, b.zoom));
        this.panMethod && (this.panTween = new OpenLayers.Tween(this.panMethod));
        this.zoomMethod && this.applyTransform.transform &&
        (this.zoomTween = new OpenLayers.Tween(this.zoomMethod))
    }, getViewport: function () {
        return this.viewPortDiv
    }, render: function (a) {
        this.div = OpenLayers.Util.getElement(a);
        OpenLayers.Element.addClass(this.div, "olMap");
        this.viewPortDiv.parentNode.removeChild(this.viewPortDiv);
        this.div.appendChild(this.viewPortDiv);
        this.updateSize()
    }, unloadDestroy: null, updateSizeDestroy: null, destroy: function () {
        if (!this.unloadDestroy)return!1;
        this.panTween && (this.panTween.stop(), this.panTween = null);
        this.zoomTween && (this.zoomTween.stop(),
            this.zoomTween = null);
        OpenLayers.Event.stopObserving(window, "unload", this.unloadDestroy);
        this.unloadDestroy = null;
        this.updateSizeDestroy && OpenLayers.Event.stopObserving(window, "resize", this.updateSizeDestroy);
        this.paddingForPopups = null;
        if (null != this.controls) {
            for (var a = this.controls.length - 1; 0 <= a; --a)this.controls[a].destroy();
            this.controls = null
        }
        if (null != this.layers) {
            for (a = this.layers.length - 1; 0 <= a; --a)this.layers[a].destroy(!1);
            this.layers = null
        }
        this.viewPortDiv && this.viewPortDiv.parentNode && this.viewPortDiv.parentNode.removeChild(this.viewPortDiv);
        this.viewPortDiv = null;
        this.tileManager && (this.tileManager.removeMap(this), this.tileManager = null);
        this.eventListeners && (this.events.un(this.eventListeners), this.eventListeners = null);
        this.events.destroy();
        this.options = this.events = null
    }, setOptions: function (a) {
        var b = this.minPx && a.restrictedExtent != this.restrictedExtent;
        OpenLayers.Util.extend(this, a);
        b && this.moveTo(this.getCachedCenter(), this.zoom, {forceZoomChange: !0})
    }, getTileSize: function () {
        return this.tileSize
    }, getBy: function (a, b, c) {
        var d = "function" == typeof c.test;
        return OpenLayers.Array.filter(this[a], function (a) {
            return a[b] == c || d && c.test(a[b])
        })
    }, getLayersBy: function (a, b) {
        return this.getBy("layers", a, b)
    }, getLayersByName: function (a) {
        return this.getLayersBy("name", a)
    }, getLayersByClass: function (a) {
        return this.getLayersBy("CLASS_NAME", a)
    }, getControlsBy: function (a, b) {
        return this.getBy("controls", a, b)
    }, getControlsByClass: function (a) {
        return this.getControlsBy("CLASS_NAME", a)
    }, getLayer: function (a) {
        for (var b = null, c = 0, d = this.layers.length; c < d; c++) {
            var e =
                this.layers[c];
            if (e.id == a) {
                b = e;
                break
            }
        }
        return b
    }, setLayerZIndex: function (a, b) {
        a.setZIndex(this.Z_INDEX_BASE[a.isBaseLayer ? "BaseLayer" : "Overlay"] + 5 * b)
    }, resetLayersZIndex: function () {
        for (var a = 0, b = this.layers.length; a < b; a++)this.setLayerZIndex(this.layers[a], a)
    }, addLayer: function (a) {
        for (var b = 0, c = this.layers.length; b < c; b++)if (this.layers[b] == a)return!1;
        if (!1 === this.events.triggerEvent("preaddlayer", {layer: a}))return!1;
        this.allOverlays && (a.isBaseLayer = !1);
        a.div.className = "olLayerDiv";
        a.div.style.overflow =
            "";
        this.setLayerZIndex(a, this.layers.length);
        a.isFixed ? this.viewPortDiv.appendChild(a.div) : this.layerContainerDiv.appendChild(a.div);
        this.layers.push(a);
        a.setMap(this);
        a.isBaseLayer || this.allOverlays && !this.baseLayer ? null == this.baseLayer ? this.setBaseLayer(a) : a.setVisibility(!1) : a.redraw();
        this.events.triggerEvent("addlayer", {layer: a});
        a.events.triggerEvent("added", {map: this, layer: a});
        a.afterAdd();
        return!0
    }, addLayers: function (a) {
        for (var b = 0, c = a.length; b < c; b++)this.addLayer(a[b])
    }, removeLayer: function (a, b) {
        if (!1 !== this.events.triggerEvent("preremovelayer", {layer: a})) {
            null == b && (b = !0);
            a.isFixed ? this.viewPortDiv.removeChild(a.div) : this.layerContainerDiv.removeChild(a.div);
            OpenLayers.Util.removeItem(this.layers, a);
            a.removeMap(this);
            a.map = null;
            if (this.baseLayer == a && (this.baseLayer = null, b))for (var c = 0, d = this.layers.length; c < d; c++) {
                var e = this.layers[c];
                if (e.isBaseLayer || this.allOverlays) {
                    this.setBaseLayer(e);
                    break
                }
            }
            this.resetLayersZIndex();
            this.events.triggerEvent("removelayer", {layer: a});
            a.events.triggerEvent("removed",
                {map: this, layer: a})
        }
    }, getNumLayers: function () {
        return this.layers.length
    }, getLayerIndex: function (a) {
        return OpenLayers.Util.indexOf(this.layers, a)
    }, setLayerIndex: function (a, b) {
        var c = this.getLayerIndex(a);
        0 > b ? b = 0 : b > this.layers.length && (b = this.layers.length);
        if (c != b) {
            this.layers.splice(c, 1);
            this.layers.splice(b, 0, a);
            for (var c = 0, d = this.layers.length; c < d; c++)this.setLayerZIndex(this.layers[c], c);
            this.events.triggerEvent("changelayer", {layer: a, property: "order"});
            this.allOverlays && (0 === b ? this.setBaseLayer(a) :
                this.baseLayer !== this.layers[0] && this.setBaseLayer(this.layers[0]))
        }
    }, raiseLayer: function (a, b) {
        var c = this.getLayerIndex(a) + b;
        this.setLayerIndex(a, c)
    }, setBaseLayer: function (a) {
        if (a != this.baseLayer && -1 != OpenLayers.Util.indexOf(this.layers, a)) {
            var b = this.getCachedCenter(), c = OpenLayers.Util.getResolutionFromScale(this.getScale(), a.units);
            null == this.baseLayer || this.allOverlays || this.baseLayer.setVisibility(!1);
            this.baseLayer = a;
            if (!this.allOverlays || this.baseLayer.visibility)this.baseLayer.setVisibility(!0),
                !1 === this.baseLayer.inRange && this.baseLayer.redraw();
            null != b && (a = this.getZoomForResolution(c || this.resolution, !0), this.setCenter(b, a, !1, !0));
            this.events.triggerEvent("changebaselayer", {layer: this.baseLayer})
        }
    }, addControl: function (a, b) {
        this.controls.push(a);
        this.addControlToMap(a, b)
    }, addControls: function (a, b) {
        for (var c = 1 === arguments.length ? [] : b, d = 0, e = a.length; d < e; d++)this.addControl(a[d], c[d] ? c[d] : null)
    }, addControlToMap: function (a, b) {
        a.outsideViewport = null != a.div;
        this.displayProjection && !a.displayProjection &&
        (a.displayProjection = this.displayProjection);
        a.setMap(this);
        var c = a.draw(b);
        c && !a.outsideViewport && (c.style.zIndex = this.Z_INDEX_BASE.Control + this.controls.length, this.viewPortDiv.appendChild(c));
        a.autoActivate && a.activate()
    }, getControl: function (a) {
        for (var b = null, c = 0, d = this.controls.length; c < d; c++) {
            var e = this.controls[c];
            if (e.id == a) {
                b = e;
                break
            }
        }
        return b
    }, removeControl: function (a) {
        a && a == this.getControl(a.id) && (a.div && a.div.parentNode == this.viewPortDiv && this.viewPortDiv.removeChild(a.div), OpenLayers.Util.removeItem(this.controls,
            a))
    }, addPopup: function (a, b) {
        if (b)for (var c = this.popups.length - 1; 0 <= c; --c)this.removePopup(this.popups[c]);
        a.map = this;
        this.popups.push(a);
        if (c = a.draw())c.style.zIndex = this.Z_INDEX_BASE.Popup + this.popups.length, this.layerContainerDiv.appendChild(c)
    }, removePopup: function (a) {
        OpenLayers.Util.removeItem(this.popups, a);
        if (a.div)try {
            this.layerContainerDiv.removeChild(a.div)
        } catch (b) {
        }
        a.map = null
    }, getSize: function () {
        var a = null;
        null != this.size && (a = this.size.clone());
        return a
    }, updateSize: function () {
        var a = this.getCurrentSize();
        if (a && !isNaN(a.h) && !isNaN(a.w)) {
            this.events.clearMouseCache();
            var b = this.getSize();
            null == b && (this.size = b = a);
            if (!a.equals(b)) {
                this.size = a;
                a = 0;
                for (b = this.layers.length; a < b; a++)this.layers[a].onMapResize();
                a = this.getCachedCenter();
                null != this.baseLayer && null != a && (b = this.getZoom(), this.zoom = null, this.setCenter(a, b))
            }
        }
        this.events.triggerEvent("updatesize")
    }, getCurrentSize: function () {
        var a = new OpenLayers.Size(this.div.clientWidth, this.div.clientHeight);
        if (0 == a.w && 0 == a.h || isNaN(a.w) && isNaN(a.h))a.w = this.div.offsetWidth,
            a.h = this.div.offsetHeight;
        if (0 == a.w && 0 == a.h || isNaN(a.w) && isNaN(a.h))a.w = parseInt(this.div.style.width), a.h = parseInt(this.div.style.height);
        return a
    }, calculateBounds: function (a, b) {
        var c = null;
        null == a && (a = this.getCachedCenter());
        null == b && (b = this.getResolution());
        if (null != a && null != b)var c = this.size.w * b / 2, d = this.size.h * b / 2, c = new OpenLayers.Bounds(a.lon - c, a.lat - d, a.lon + c, a.lat + d);
        return c
    }, getCenter: function () {
        var a = null, b = this.getCachedCenter();
        b && (a = b.clone());
        return a
    }, getCachedCenter: function () {
        !this.center &&
            this.size && (this.center = this.getLonLatFromViewPortPx({x: this.size.w / 2, y: this.size.h / 2}));
        return this.center
    }, getZoom: function () {
        return this.zoom
    }, pan: function (a, b, c) {
        c = OpenLayers.Util.applyDefaults(c, {animate: !0, dragging: !1});
        if (c.dragging)0 == a && 0 == b || this.moveByPx(a, b); else {
            var d = this.getViewPortPxFromLonLat(this.getCachedCenter());
            a = d.add(a, b);
            if (this.dragging || !a.equals(d))d = this.getLonLatFromViewPortPx(a), c.animate ? this.panTo(d) : (this.moveTo(d), this.dragging && (this.dragging = !1, this.events.triggerEvent("moveend")))
        }
    },
    panTo: function (a) {
        if (this.panTween && this.getExtent().scale(this.panRatio).containsLonLat(a)) {
            var b = this.getCachedCenter();
            if (!a.equals(b)) {
                var b = this.getPixelFromLonLat(b), c = this.getPixelFromLonLat(a), d = 0, e = 0;
                this.panTween.start({x: 0, y: 0}, {x: c.x - b.x, y: c.y - b.y}, this.panDuration, {callbacks: {eachStep: OpenLayers.Function.bind(function (a) {
                    this.moveByPx(a.x - d, a.y - e);
                    d = Math.round(a.x);
                    e = Math.round(a.y)
                }, this), done: OpenLayers.Function.bind(function (b) {
                        this.moveTo(a);
                        this.dragging = !1;
                        this.events.triggerEvent("moveend")
                    },
                    this)}})
            }
        } else this.setCenter(a)
    }, setCenter: function (a, b, c, d) {
        this.panTween && this.panTween.stop();
        this.zoomTween && this.zoomTween.stop();
        this.moveTo(a, b, {dragging: c, forceZoomChange: d})
    }, moveByPx: function (a, b) {
        var c = this.size.w / 2, d = this.size.h / 2, e = c + a, f = d + b, g = this.baseLayer.wrapDateLine, h = 0, k = 0;
        this.restrictedExtent && (h = c, k = d, g = !1);
        a = g || e <= this.maxPx.x - h && e >= this.minPx.x + h ? Math.round(a) : 0;
        b = f <= this.maxPx.y - k && f >= this.minPx.y + k ? Math.round(b) : 0;
        if (a || b) {
            this.dragging || (this.dragging = !0, this.events.triggerEvent("movestart"));
            this.center = null;
            a && (this.layerContainerOriginPx.x -= a, this.minPx.x -= a, this.maxPx.x -= a);
            b && (this.layerContainerOriginPx.y -= b, this.minPx.y -= b, this.maxPx.y -= b);
            this.applyTransform();
            d = 0;
            for (e = this.layers.length; d < e; ++d)c = this.layers[d], c.visibility && (c === this.baseLayer || c.inRange) && (c.moveByPx(a, b), c.events.triggerEvent("move"));
            this.events.triggerEvent("move")
        }
    }, adjustZoom: function (a) {
        if (this.baseLayer && this.baseLayer.wrapDateLine) {
            var b = this.baseLayer.resolutions, c = this.getMaxExtent().getWidth() / this.size.w;
            if (this.getResolutionForZoom(a) > c)if (this.fractionalZoom)a = this.getZoomForResolution(c); else for (var d = a | 0, e = b.length; d < e; ++d)if (b[d] <= c) {
                a = d;
                break
            }
        }
        return a
    }, getMinZoom: function () {
        return this.adjustZoom(0)
    }, moveTo: function (a, b, c) {
        null == a || a instanceof OpenLayers.LonLat || (a = new OpenLayers.LonLat(a));
        c || (c = {});
        null != b && (b = parseFloat(b), this.fractionalZoom || (b = Math.round(b)));
        var d = b;
        b = this.adjustZoom(b);
        b !== d && (a = this.getCenter());
        var d = c.dragging || this.dragging, e = c.forceZoomChange;
        this.getCachedCenter() ||
            this.isValidLonLat(a) || (a = this.maxExtent.getCenterLonLat(), this.center = a.clone());
        if (null != this.restrictedExtent) {
            null == a && (a = this.center);
            null == b && (b = this.getZoom());
            var f = this.getResolutionForZoom(b), f = this.calculateBounds(a, f);
            if (!this.restrictedExtent.containsBounds(f)) {
                var g = this.restrictedExtent.getCenterLonLat();
                f.getWidth() > this.restrictedExtent.getWidth() ? a = new OpenLayers.LonLat(g.lon, a.lat) : f.left < this.restrictedExtent.left ? a = a.add(this.restrictedExtent.left - f.left, 0) : f.right > this.restrictedExtent.right &&
                    (a = a.add(this.restrictedExtent.right - f.right, 0));
                f.getHeight() > this.restrictedExtent.getHeight() ? a = new OpenLayers.LonLat(a.lon, g.lat) : f.bottom < this.restrictedExtent.bottom ? a = a.add(0, this.restrictedExtent.bottom - f.bottom) : f.top > this.restrictedExtent.top && (a = a.add(0, this.restrictedExtent.top - f.top))
            }
        }
        e = e || this.isValidZoomLevel(b) && b != this.getZoom();
        f = this.isValidLonLat(a) && !a.equals(this.center);
        if (e || f || d) {
            d || this.events.triggerEvent("movestart", {zoomChanged: e});
            f && (!e && this.center && this.centerLayerContainer(a),
                this.center = a.clone());
            a = e ? this.getResolutionForZoom(b) : this.getResolution();
            if (e || null == this.layerContainerOrigin) {
                this.layerContainerOrigin = this.getCachedCenter();
                this.layerContainerOriginPx.x = 0;
                this.layerContainerOriginPx.y = 0;
                this.applyTransform();
                var f = this.getMaxExtent({restricted: !0}), h = f.getCenterLonLat(), g = this.center.lon - h.lon, h = h.lat - this.center.lat, k = Math.round(f.getWidth() / a), l = Math.round(f.getHeight() / a);
                this.minPx = {x: (this.size.w - k) / 2 - g / a, y: (this.size.h - l) / 2 - h / a};
                this.maxPx = {x: this.minPx.x +
                    Math.round(f.getWidth() / a), y: this.minPx.y + Math.round(f.getHeight() / a)}
            }
            e && (this.zoom = b, this.resolution = a);
            a = this.getExtent();
            this.baseLayer.visibility && (this.baseLayer.moveTo(a, e, c.dragging), c.dragging || this.baseLayer.events.triggerEvent("moveend", {zoomChanged: e}));
            a = this.baseLayer.getExtent();
            for (b = this.layers.length - 1; 0 <= b; --b)f = this.layers[b], f === this.baseLayer || f.isBaseLayer || (g = f.calculateInRange(), f.inRange != g && ((f.inRange = g) || f.display(!1), this.events.triggerEvent("changelayer", {layer: f, property: "visibility"})),
                g && f.visibility && (f.moveTo(a, e, c.dragging), c.dragging || f.events.triggerEvent("moveend", {zoomChanged: e})));
            this.events.triggerEvent("move");
            d || this.events.triggerEvent("moveend");
            if (e) {
                b = 0;
                for (c = this.popups.length; b < c; b++)this.popups[b].updatePosition();
                this.events.triggerEvent("zoomend")
            }
        }
    }, centerLayerContainer: function (a) {
        var b = this.getViewPortPxFromLonLat(this.layerContainerOrigin), c = this.getViewPortPxFromLonLat(a);
        if (null != b && null != c) {
            var d = this.layerContainerOriginPx.x;
            a = this.layerContainerOriginPx.y;
            var e = Math.round(b.x - c.x), b = Math.round(b.y - c.y);
            this.applyTransform(this.layerContainerOriginPx.x = e, this.layerContainerOriginPx.y = b);
            d -= e;
            a -= b;
            this.minPx.x -= d;
            this.maxPx.x -= d;
            this.minPx.y -= a;
            this.maxPx.y -= a
        }
    }, isValidZoomLevel: function (a) {
        return null != a && 0 <= a && a < this.getNumZoomLevels()
    }, isValidLonLat: function (a) {
        var b = !1;
        null != a && (b = this.getMaxExtent(), b = b.containsLonLat(a, {worldBounds: this.baseLayer.wrapDateLine && b}));
        return b
    }, getProjection: function () {
        var a = this.getProjectionObject();
        return a ? a.getCode() :
            null
    }, getProjectionObject: function () {
        var a = null;
        null != this.baseLayer && (a = this.baseLayer.projection);
        return a
    }, getMaxResolution: function () {
        var a = null;
        null != this.baseLayer && (a = this.baseLayer.maxResolution);
        return a
    }, getMaxExtent: function (a) {
        var b = null;
        a && a.restricted && this.restrictedExtent ? b = this.restrictedExtent : null != this.baseLayer && (b = this.baseLayer.maxExtent);
        return b
    }, getNumZoomLevels: function () {
        var a = null;
        null != this.baseLayer && (a = this.baseLayer.numZoomLevels);
        return a
    }, getExtent: function () {
        var a =
            null;
        null != this.baseLayer && (a = this.baseLayer.getExtent());
        return a
    }, getResolution: function () {
        var a = null;
        null != this.baseLayer ? a = this.baseLayer.getResolution() : !0 === this.allOverlays && 0 < this.layers.length && (a = this.layers[0].getResolution());
        return a
    }, getUnits: function () {
        var a = null;
        null != this.baseLayer && (a = this.baseLayer.units);
        return a
    }, getScale: function () {
        var a = null;
        null != this.baseLayer && (a = this.getResolution(), a = OpenLayers.Util.getScaleFromResolution(a, this.baseLayer.units));
        return a
    }, getZoomForExtent: function (a, b) {
        var c = null;
        null != this.baseLayer && (c = this.baseLayer.getZoomForExtent(a, b));
        return c
    }, getResolutionForZoom: function (a) {
        var b = null;
        this.baseLayer && (b = this.baseLayer.getResolutionForZoom(a));
        return b
    }, getZoomForResolution: function (a, b) {
        var c = null;
        null != this.baseLayer && (c = this.baseLayer.getZoomForResolution(a, b));
        return c
    }, zoomTo: function (a, b) {
        var c = this;
        if (c.isValidZoomLevel(a))if (c.baseLayer.wrapDateLine && (a = c.adjustZoom(a)), c.zoomTween) {
            var d = c.getResolution(), e = c.getResolutionForZoom(a), f = {scale: 1},
                d = {scale: d / e};
            c.zoomTween.playing && c.zoomTween.duration < 3 * c.zoomDuration ? c.zoomTween.finish = {scale: c.zoomTween.finish.scale * d.scale} : (b || (e = c.getSize(), b = {x: e.w / 2, y: e.h / 2}), c.zoomTween.start(f, d, c.zoomDuration, {minFrameRate: 50, callbacks: {eachStep: function (a) {
                var d = c.layerContainerOriginPx;
                a = a.scale;
                c.applyTransform(d.x + ((a - 1) * (d.x - b.x) | 0), d.y + ((a - 1) * (d.y - b.y) | 0), a)
            }, done: function (a) {
                c.applyTransform();
                a = c.getResolution() / a.scale;
                var d = c.getZoomForResolution(a, !0);
                c.moveTo(c.getZoomTargetCenter(b,
                    a), d, !0)
            }}}))
        } else f = b ? c.getZoomTargetCenter(b, c.getResolutionForZoom(a)) : null, c.setCenter(f, a)
    }, zoomIn: function () {
        this.zoomTo(this.getZoom() + 1)
    }, zoomOut: function () {
        this.zoomTo(this.getZoom() - 1)
    }, zoomToExtent: function (a, b) {
        a instanceof OpenLayers.Bounds || (a = new OpenLayers.Bounds(a));
        var c = a.getCenterLonLat();
        if (this.baseLayer.wrapDateLine) {
            c = this.getMaxExtent();
            for (a = a.clone(); a.right < a.left;)a.right += c.getWidth();
            c = a.getCenterLonLat().wrapDateLine(c)
        }
        this.setCenter(c, this.getZoomForExtent(a, b))
    },
    zoomToMaxExtent: function (a) {
        a = this.getMaxExtent({restricted: a ? a.restricted : !0});
        this.zoomToExtent(a)
    }, zoomToScale: function (a, b) {
        var c = OpenLayers.Util.getResolutionFromScale(a, this.baseLayer.units), d = this.size.w * c / 2, c = this.size.h * c / 2, e = this.getCachedCenter(), d = new OpenLayers.Bounds(e.lon - d, e.lat - c, e.lon + d, e.lat + c);
        this.zoomToExtent(d, b)
    }, getLonLatFromViewPortPx: function (a) {
        var b = null;
        null != this.baseLayer && (b = this.baseLayer.getLonLatFromViewPortPx(a));
        return b
    }, getViewPortPxFromLonLat: function (a) {
        var b =
            null;
        null != this.baseLayer && (b = this.baseLayer.getViewPortPxFromLonLat(a));
        return b
    }, getZoomTargetCenter: function (a, b) {
        var c = null, d = this.getSize(), e = d.w / 2 - a.x, d = a.y - d.h / 2, f = this.getLonLatFromPixel(a);
        f && (c = new OpenLayers.LonLat(f.lon + e * b, f.lat + d * b));
        return c
    }, getLonLatFromPixel: function (a) {
        return this.getLonLatFromViewPortPx(a)
    }, getPixelFromLonLat: function (a) {
        a = this.getViewPortPxFromLonLat(a);
        a.x = Math.round(a.x);
        a.y = Math.round(a.y);
        return a
    }, getGeodesicPixelSize: function (a) {
        var b = a ? this.getLonLatFromPixel(a) :
            this.getCachedCenter() || new OpenLayers.LonLat(0, 0), c = this.getResolution();
        a = b.add(-c / 2, 0);
        var d = b.add(c / 2, 0), e = b.add(0, -c / 2), b = b.add(0, c / 2), c = new OpenLayers.Projection("EPSG:4326"), f = this.getProjectionObject() || c;
        f.equals(c) || (a.transform(f, c), d.transform(f, c), e.transform(f, c), b.transform(f, c));
        return new OpenLayers.Size(OpenLayers.Util.distVincenty(a, d), OpenLayers.Util.distVincenty(e, b))
    }, getViewPortPxFromLayerPx: function (a) {
        var b = null;
        null != a && (b = a.add(this.layerContainerOriginPx.x, this.layerContainerOriginPx.y));
        return b
    }, getLayerPxFromViewPortPx: function (a) {
        var b = null;
        null != a && (b = a.add(-this.layerContainerOriginPx.x, -this.layerContainerOriginPx.y), isNaN(b.x) || isNaN(b.y)) && (b = null);
        return b
    }, getLonLatFromLayerPx: function (a) {
        a = this.getViewPortPxFromLayerPx(a);
        return this.getLonLatFromViewPortPx(a)
    }, getLayerPxFromLonLat: function (a) {
        a = this.getPixelFromLonLat(a);
        return this.getLayerPxFromViewPortPx(a)
    }, applyTransform: function (a, b, c) {
        c = c || 1;
        var d = this.layerContainerOriginPx, e = 1 !== c;
        a = a || d.x;
        b = b || d.y;
        var f = this.layerContainerDiv.style,
            g = this.applyTransform.transform, h = this.applyTransform.template;
        if (void 0 === g && (g = OpenLayers.Util.vendorPrefix.style("transform"), this.applyTransform.transform = g)) {
            var k = OpenLayers.Element.getStyle(this.viewPortDiv, OpenLayers.Util.vendorPrefix.css("transform"));
            k && "none" === k || (h = ["translate3d(", ",0) ", "scale3d(", ",1)"], f[g] = [h[0], "0,0", h[1]].join(""));
            h && ~f[g].indexOf(h[0]) || (h = ["translate(", ") ", "scale(", ")"]);
            this.applyTransform.template = h
        }
        null === g || "translate3d(" !== h[0] && !0 !== e ? (f.left = a + "px", f.top =
            b + "px", null !== g && (f[g] = "")) : (!0 === e && "translate(" === h[0] && (a -= d.x, b -= d.y, f.left = d.x + "px", f.top = d.y + "px"), f[g] = [h[0], a, "px,", b, "px", h[1], h[2], c, ",", c, h[3]].join(""))
    }, CLASS_NAME: "OpenLayers.Map"});
OpenLayers.Map.TILE_WIDTH = 256;
OpenLayers.Map.TILE_HEIGHT = 256;
OpenLayers.Layer = OpenLayers.Class({id: null, name: null, div: null, opacity: 1, alwaysInRange: null, RESOLUTION_PROPERTIES: "scales resolutions maxScale minScale maxResolution minResolution numZoomLevels maxZoomLevel".split(" "), events: null, map: null, isBaseLayer: !1, alpha: !1, displayInLayerSwitcher: !0, visibility: !0, attribution: null, inRange: !1, imageSize: null, options: null, eventListeners: null, gutter: 0, projection: null, units: null, scales: null, resolutions: null, maxExtent: null, minExtent: null, maxResolution: null, minResolution: null,
    numZoomLevels: null, minScale: null, maxScale: null, displayOutsideMaxExtent: !1, wrapDateLine: !1, metadata: null, initialize: function (a, b) {
        this.metadata = {};
        b = OpenLayers.Util.extend({}, b);
        null != this.alwaysInRange && (b.alwaysInRange = this.alwaysInRange);
        this.addOptions(b);
        this.name = a;
        if (null == this.id && (this.id = OpenLayers.Util.createUniqueID(this.CLASS_NAME + "_"), this.div = OpenLayers.Util.createDiv(this.id), this.div.style.width = "100%", this.div.style.height = "100%", this.div.dir = "ltr", this.events = new OpenLayers.Events(this,
            this.div), this.eventListeners instanceof Object))this.events.on(this.eventListeners)
    }, destroy: function (a) {
        null == a && (a = !0);
        null != this.map && this.map.removeLayer(this, a);
        this.options = this.div = this.name = this.map = this.projection = null;
        this.events && (this.eventListeners && this.events.un(this.eventListeners), this.events.destroy());
        this.events = this.eventListeners = null
    }, clone: function (a) {
        null == a && (a = new OpenLayers.Layer(this.name, this.getOptions()));
        OpenLayers.Util.applyDefaults(a, this);
        a.map = null;
        return a
    },
    getOptions: function () {
        var a = {}, b;
        for (b in this.options)a[b] = this[b];
        return a
    }, setName: function (a) {
        a != this.name && (this.name = a, null != this.map && this.map.events.triggerEvent("changelayer", {layer: this, property: "name"}))
    }, addOptions: function (a, b) {
        null == this.options && (this.options = {});
        a && ("string" == typeof a.projection && (a.projection = new OpenLayers.Projection(a.projection)), a.projection && OpenLayers.Util.applyDefaults(a, OpenLayers.Projection.defaults[a.projection.getCode()]), !a.maxExtent || a.maxExtent instanceof
            OpenLayers.Bounds || (a.maxExtent = new OpenLayers.Bounds(a.maxExtent)), !a.minExtent || a.minExtent instanceof OpenLayers.Bounds || (a.minExtent = new OpenLayers.Bounds(a.minExtent)));
        OpenLayers.Util.extend(this.options, a);
        OpenLayers.Util.extend(this, a);
        this.projection && this.projection.getUnits() && (this.units = this.projection.getUnits());
        if (this.map) {
            var c = this.map.getResolution(), d = this.RESOLUTION_PROPERTIES.concat(["projection", "units", "minExtent", "maxExtent"]), e;
            for (e in a)if (a.hasOwnProperty(e) && 0 <= OpenLayers.Util.indexOf(d,
                e)) {
                this.initResolutions();
                b && this.map.baseLayer === this && (this.map.setCenter(this.map.getCenter(), this.map.getZoomForResolution(c), !1, !0), this.map.events.triggerEvent("changebaselayer", {layer: this}));
                break
            }
        }
    }, onMapResize: function () {
    }, redraw: function () {
        var a = !1;
        if (this.map) {
            this.inRange = this.calculateInRange();
            var b = this.getExtent();
            b && (this.inRange && this.visibility) && (this.moveTo(b, !0, !1), this.events.triggerEvent("moveend", {zoomChanged: !0}), a = !0)
        }
        return a
    }, moveTo: function (a, b, c) {
        a = this.visibility;
        this.isBaseLayer || (a = a && this.inRange);
        this.display(a)
    }, moveByPx: function (a, b) {
    }, setMap: function (a) {
        null == this.map && (this.map = a, this.maxExtent = this.maxExtent || this.map.maxExtent, this.minExtent = this.minExtent || this.map.minExtent, this.projection = this.projection || this.map.projection, "string" == typeof this.projection && (this.projection = new OpenLayers.Projection(this.projection)), this.units = this.projection.getUnits() || this.units || this.map.units, this.initResolutions(), this.isBaseLayer || (this.inRange = this.calculateInRange(),
            this.div.style.display = this.visibility && this.inRange ? "" : "none"), this.setTileSize())
    }, afterAdd: function () {
    }, removeMap: function (a) {
    }, getImageSize: function (a) {
        return this.imageSize || this.tileSize
    }, setTileSize: function (a) {
        this.tileSize = a = a ? a : this.tileSize ? this.tileSize : this.map.getTileSize();
        this.gutter && (this.imageSize = new OpenLayers.Size(a.w + 2 * this.gutter, a.h + 2 * this.gutter))
    }, getVisibility: function () {
        return this.visibility
    }, setVisibility: function (a) {
        a != this.visibility && (this.visibility = a, this.display(a),
            this.redraw(), null != this.map && this.map.events.triggerEvent("changelayer", {layer: this, property: "visibility"}), this.events.triggerEvent("visibilitychanged"))
    }, display: function (a) {
        a != ("none" != this.div.style.display) && (this.div.style.display = a && this.calculateInRange() ? "block" : "none")
    }, calculateInRange: function () {
        var a = !1;
        this.alwaysInRange ? a = !0 : this.map && (a = this.map.getResolution(), a = a >= this.minResolution && a <= this.maxResolution);
        return a
    }, setIsBaseLayer: function (a) {
        a != this.isBaseLayer && (this.isBaseLayer =
            a, null != this.map && this.map.events.triggerEvent("changebaselayer", {layer: this}))
    }, initResolutions: function () {
        var a, b, c, d = {}, e = !0;
        a = 0;
        for (b = this.RESOLUTION_PROPERTIES.length; a < b; a++)c = this.RESOLUTION_PROPERTIES[a], d[c] = this.options[c], e && this.options[c] && (e = !1);
        null == this.options.alwaysInRange && (this.alwaysInRange = e);
        null == d.resolutions && (d.resolutions = this.resolutionsFromScales(d.scales));
        null == d.resolutions && (d.resolutions = this.calculateResolutions(d));
        if (null == d.resolutions) {
            a = 0;
            for (b = this.RESOLUTION_PROPERTIES.length; a <
                b; a++)c = this.RESOLUTION_PROPERTIES[a], d[c] = null != this.options[c] ? this.options[c] : this.map[c];
            null == d.resolutions && (d.resolutions = this.resolutionsFromScales(d.scales));
            null == d.resolutions && (d.resolutions = this.calculateResolutions(d))
        }
        var f;
        this.options.maxResolution && "auto" !== this.options.maxResolution && (f = this.options.maxResolution);
        this.options.minScale && (f = OpenLayers.Util.getResolutionFromScale(this.options.minScale, this.units));
        var g;
        this.options.minResolution && "auto" !== this.options.minResolution &&
        (g = this.options.minResolution);
        this.options.maxScale && (g = OpenLayers.Util.getResolutionFromScale(this.options.maxScale, this.units));
        d.resolutions && (d.resolutions.sort(function (a, b) {
            return b - a
        }), f || (f = d.resolutions[0]), g || (g = d.resolutions[d.resolutions.length - 1]));
        if (this.resolutions = d.resolutions) {
            b = this.resolutions.length;
            this.scales = Array(b);
            for (a = 0; a < b; a++)this.scales[a] = OpenLayers.Util.getScaleFromResolution(this.resolutions[a], this.units);
            this.numZoomLevels = b
        }
        if (this.minResolution = g)this.maxScale =
            OpenLayers.Util.getScaleFromResolution(g, this.units);
        if (this.maxResolution = f)this.minScale = OpenLayers.Util.getScaleFromResolution(f, this.units)
    }, resolutionsFromScales: function (a) {
        if (null != a) {
            var b, c, d;
            d = a.length;
            b = Array(d);
            for (c = 0; c < d; c++)b[c] = OpenLayers.Util.getResolutionFromScale(a[c], this.units);
            return b
        }
    }, calculateResolutions: function (a) {
        var b, c, d = a.maxResolution;
        null != a.minScale ? d = OpenLayers.Util.getResolutionFromScale(a.minScale, this.units) : "auto" == d && null != this.maxExtent && (b = this.map.getSize(),
            c = this.maxExtent.getWidth() / b.w, b = this.maxExtent.getHeight() / b.h, d = Math.max(c, b));
        c = a.minResolution;
        null != a.maxScale ? c = OpenLayers.Util.getResolutionFromScale(a.maxScale, this.units) : "auto" == a.minResolution && null != this.minExtent && (b = this.map.getSize(), c = this.minExtent.getWidth() / b.w, b = this.minExtent.getHeight() / b.h, c = Math.max(c, b));
        "number" !== typeof d && ("number" !== typeof c && null != this.maxExtent) && (d = this.map.getTileSize(), d = Math.max(this.maxExtent.getWidth() / d.w, this.maxExtent.getHeight() / d.h));
        b = a.maxZoomLevel;
        a = a.numZoomLevels;
        "number" === typeof c && "number" === typeof d && void 0 === a ? a = Math.floor(Math.log(d / c) / Math.log(2)) + 1 : void 0 === a && null != b && (a = b + 1);
        if (!("number" !== typeof a || 0 >= a || "number" !== typeof d && "number" !== typeof c)) {
            b = Array(a);
            var e = 2;
            "number" == typeof c && "number" == typeof d && (e = Math.pow(d / c, 1 / (a - 1)));
            var f;
            if ("number" === typeof d)for (f = 0; f < a; f++)b[f] = d / Math.pow(e, f); else for (f = 0; f < a; f++)b[a - 1 - f] = c * Math.pow(e, f);
            return b
        }
    }, getResolution: function () {
        var a = this.map.getZoom();
        return this.getResolutionForZoom(a)
    },
    getExtent: function () {
        return this.map.calculateBounds()
    }, getZoomForExtent: function (a, b) {
        var c = this.map.getSize(), c = Math.max(a.getWidth() / c.w, a.getHeight() / c.h);
        return this.getZoomForResolution(c, b)
    }, getDataExtent: function () {
    }, getResolutionForZoom: function (a) {
        a = Math.max(0, Math.min(a, this.resolutions.length - 1));
        if (this.map.fractionalZoom) {
            var b = Math.floor(a), c = Math.ceil(a);
            a = this.resolutions[b] - (a - b) * (this.resolutions[b] - this.resolutions[c])
        } else a = this.resolutions[Math.round(a)];
        return a
    }, getZoomForResolution: function (a, b) {
        var c, d;
        if (this.map.fractionalZoom) {
            var e = 0, f = this.resolutions[e], g = this.resolutions[this.resolutions.length - 1], h;
            c = 0;
            for (d = this.resolutions.length; c < d; ++c)if (h = this.resolutions[c], h >= a && (f = h, e = c), h <= a) {
                g = h;
                break
            }
            c = f - g;
            c = 0 < c ? e + (f - a) / c : e
        } else {
            f = Number.POSITIVE_INFINITY;
            c = 0;
            for (d = this.resolutions.length; c < d; c++)if (b) {
                e = Math.abs(this.resolutions[c] - a);
                if (e > f)break;
                f = e
            } else if (this.resolutions[c] < a)break;
            c = Math.max(0, c - 1)
        }
        return c
    }, getLonLatFromViewPortPx: function (a) {
        var b = null, c = this.map;
        if (null !=
            a && c.minPx) {
            var b = c.getResolution(), d = c.getMaxExtent({restricted: !0}), b = new OpenLayers.LonLat((a.x - c.minPx.x) * b + d.left, (c.minPx.y - a.y) * b + d.top);
            this.wrapDateLine && (b = b.wrapDateLine(this.maxExtent))
        }
        return b
    }, getViewPortPxFromLonLat: function (a, b) {
        var c = null;
        null != a && (b = b || this.map.getResolution(), c = this.map.calculateBounds(null, b), c = new OpenLayers.Pixel(1 / b * (a.lon - c.left), 1 / b * (c.top - a.lat)));
        return c
    }, setOpacity: function (a) {
        if (a != this.opacity) {
            this.opacity = a;
            for (var b = this.div.childNodes, c = 0, d = b.length; c <
                d; ++c) {
                var e = b[c].firstChild || b[c], f = b[c].lastChild;
                f && "iframe" === f.nodeName.toLowerCase() && (e = f.parentNode);
                OpenLayers.Util.modifyDOMElement(e, null, null, null, null, null, null, a)
            }
            null != this.map && this.map.events.triggerEvent("changelayer", {layer: this, property: "opacity"})
        }
    }, getZIndex: function () {
        return this.div.style.zIndex
    }, setZIndex: function (a) {
        this.div.style.zIndex = a
    }, adjustBounds: function (a) {
        if (this.gutter) {
            var b = this.gutter * this.map.getResolution();
            a = new OpenLayers.Bounds(a.left - b, a.bottom - b, a.right +
                b, a.top + b)
        }
        this.wrapDateLine && (b = {rightTolerance: this.getResolution(), leftTolerance: this.getResolution()}, a = a.wrapDateLine(this.maxExtent, b));
        return a
    }, CLASS_NAME: "OpenLayers.Layer"});
OpenLayers.Layer.SphericalMercator = {getExtent: function () {
    var a = null;
    return a = this.sphericalMercator ? this.map.calculateBounds() : OpenLayers.Layer.FixedZoomLevels.prototype.getExtent.apply(this)
}, getLonLatFromViewPortPx: function (a) {
    return OpenLayers.Layer.prototype.getLonLatFromViewPortPx.apply(this, arguments)
}, getViewPortPxFromLonLat: function (a) {
    return OpenLayers.Layer.prototype.getViewPortPxFromLonLat.apply(this, arguments)
}, initMercatorParameters: function () {
    this.RESOLUTIONS = [];
    for (var a = 0; a <= this.MAX_ZOOM_LEVEL; ++a)this.RESOLUTIONS[a] =
        156543.03390625 / Math.pow(2, a);
    this.units = "m";
    this.projection = this.projection || "EPSG:900913"
}, forwardMercator: function () {
    var a = new OpenLayers.Projection("EPSG:4326"), b = new OpenLayers.Projection("EPSG:900913");
    return function (c, d) {
        var e = OpenLayers.Projection.transform({x: c, y: d}, a, b);
        return new OpenLayers.LonLat(e.x, e.y)
    }
}(), inverseMercator: function () {
    var a = new OpenLayers.Projection("EPSG:4326"), b = new OpenLayers.Projection("EPSG:900913");
    return function (c, d) {
        var e = OpenLayers.Projection.transform({x: c,
            y: d}, b, a);
        return new OpenLayers.LonLat(e.x, e.y)
    }
}()};
OpenLayers.Layer.EventPane = OpenLayers.Class(OpenLayers.Layer, {smoothDragPan: !0, isBaseLayer: !0, isFixed: !0, pane: null, mapObject: null, initialize: function (a, b) {
    OpenLayers.Layer.prototype.initialize.apply(this, arguments);
    null == this.pane && (this.pane = OpenLayers.Util.createDiv(this.div.id + "_EventPane"))
}, destroy: function () {
    this.pane = this.mapObject = null;
    OpenLayers.Layer.prototype.destroy.apply(this, arguments)
}, setMap: function (a) {
    OpenLayers.Layer.prototype.setMap.apply(this, arguments);
    this.pane.style.zIndex =
        parseInt(this.div.style.zIndex) + 1;
    this.pane.style.display = this.div.style.display;
    this.pane.style.width = "100%";
    this.pane.style.height = "100%";
    "msie" == OpenLayers.BROWSER_NAME && (this.pane.style.background = "url(" + OpenLayers.Util.getImageLocation("blank.gif") + ")");
    this.isFixed ? this.map.viewPortDiv.appendChild(this.pane) : this.map.layerContainerDiv.appendChild(this.pane);
    this.loadMapObject();
    null == this.mapObject && this.loadWarningMessage()
}, removeMap: function (a) {
    this.pane && this.pane.parentNode && this.pane.parentNode.removeChild(this.pane);
    OpenLayers.Layer.prototype.removeMap.apply(this, arguments)
}, loadWarningMessage: function () {
    this.div.style.backgroundColor = "darkblue";
    var a = this.map.getSize(), b = Math.min(a.w, 300), c = Math.min(a.h, 200), b = new OpenLayers.Size(b, c), a = (new OpenLayers.Pixel(a.w / 2, a.h / 2)).add(-b.w / 2, -b.h / 2), a = OpenLayers.Util.createDiv(this.name + "_warning", a, b, null, null, null, "auto");
    a.style.padding = "7px";
    a.style.backgroundColor = "yellow";
    a.innerHTML = this.getWarningHTML();
    this.div.appendChild(a)
}, getWarningHTML: function () {
    return""
},
    display: function (a) {
        OpenLayers.Layer.prototype.display.apply(this, arguments);
        this.pane.style.display = this.div.style.display
    }, setZIndex: function (a) {
        OpenLayers.Layer.prototype.setZIndex.apply(this, arguments);
        this.pane.style.zIndex = parseInt(this.div.style.zIndex) + 1
    }, moveByPx: function (a, b) {
        OpenLayers.Layer.prototype.moveByPx.apply(this, arguments);
        this.dragPanMapObject ? this.dragPanMapObject(a, -b) : this.moveTo(this.map.getCachedCenter())
    }, moveTo: function (a, b, c) {
        OpenLayers.Layer.prototype.moveTo.apply(this,
            arguments);
        if (null != this.mapObject) {
            var d = this.map.getCenter(), e = this.map.getZoom();
            if (null != d) {
                var f = this.getMapObjectCenter(), f = this.getOLLonLatFromMapObjectLonLat(f), g = this.getMapObjectZoom(), g = this.getOLZoomFromMapObjectZoom(g);
                d.equals(f) && e == g || (!b && f && this.dragPanMapObject && this.smoothDragPan ? (e = this.map.getViewPortPxFromLonLat(f), d = this.map.getViewPortPxFromLonLat(d), this.dragPanMapObject(d.x - e.x, e.y - d.y)) : (d = this.getMapObjectLonLatFromOLLonLat(d), e = this.getMapObjectZoomFromOLZoom(e), this.setMapObjectCenter(d,
                    e, c)))
            }
        }
    }, getLonLatFromViewPortPx: function (a) {
        var b = null;
        null != this.mapObject && null != this.getMapObjectCenter() && (a = this.getMapObjectPixelFromOLPixel(a), a = this.getMapObjectLonLatFromMapObjectPixel(a), b = this.getOLLonLatFromMapObjectLonLat(a));
        return b
    }, getViewPortPxFromLonLat: function (a) {
        var b = null;
        null != this.mapObject && null != this.getMapObjectCenter() && (a = this.getMapObjectLonLatFromOLLonLat(a), a = this.getMapObjectPixelFromMapObjectLonLat(a), b = this.getOLPixelFromMapObjectPixel(a));
        return b
    }, getOLLonLatFromMapObjectLonLat: function (a) {
        var b =
            null;
        null != a && (b = this.getLongitudeFromMapObjectLonLat(a), a = this.getLatitudeFromMapObjectLonLat(a), b = new OpenLayers.LonLat(b, a));
        return b
    }, getMapObjectLonLatFromOLLonLat: function (a) {
        var b = null;
        null != a && (b = this.getMapObjectLonLatFromLonLat(a.lon, a.lat));
        return b
    }, getOLPixelFromMapObjectPixel: function (a) {
        var b = null;
        null != a && (b = this.getXFromMapObjectPixel(a), a = this.getYFromMapObjectPixel(a), b = new OpenLayers.Pixel(b, a));
        return b
    }, getMapObjectPixelFromOLPixel: function (a) {
        var b = null;
        null != a && (b = this.getMapObjectPixelFromXY(a.x,
            a.y));
        return b
    }, CLASS_NAME: "OpenLayers.Layer.EventPane"});
OpenLayers.Layer.FixedZoomLevels = OpenLayers.Class({initialize: function () {
}, initResolutions: function () {
    for (var a = ["minZoomLevel", "maxZoomLevel", "numZoomLevels"], b = 0, c = a.length; b < c; b++) {
        var d = a[b];
        this[d] = null != this.options[d] ? this.options[d] : this.map[d]
    }
    if (null == this.minZoomLevel || this.minZoomLevel < this.MIN_ZOOM_LEVEL)this.minZoomLevel = this.MIN_ZOOM_LEVEL;
    a = this.MAX_ZOOM_LEVEL - this.minZoomLevel + 1;
    b = null == this.options.numZoomLevels && null != this.options.maxZoomLevel || null == this.numZoomLevels && null != this.maxZoomLevel ?
        this.maxZoomLevel - this.minZoomLevel + 1 : this.numZoomLevels;
    this.numZoomLevels = null != b ? Math.min(b, a) : a;
    this.maxZoomLevel = this.minZoomLevel + this.numZoomLevels - 1;
    if (null != this.RESOLUTIONS) {
        a = 0;
        this.resolutions = [];
        for (b = this.minZoomLevel; b <= this.maxZoomLevel; b++)this.resolutions[a++] = this.RESOLUTIONS[b];
        this.maxResolution = this.resolutions[0];
        this.minResolution = this.resolutions[this.resolutions.length - 1]
    }
}, getResolution: function () {
    if (null != this.resolutions)return OpenLayers.Layer.prototype.getResolution.apply(this,
        arguments);
    var a = null, b = this.map.getSize(), c = this.getExtent();
    null != b && null != c && (a = Math.max(c.getWidth() / b.w, c.getHeight() / b.h));
    return a
}, getExtent: function () {
    var a = this.map.getSize(), b = this.getLonLatFromViewPortPx({x: 0, y: 0}), a = this.getLonLatFromViewPortPx({x: a.w, y: a.h});
    return null != b && null != a ? new OpenLayers.Bounds(b.lon, a.lat, a.lon, b.lat) : null
}, getZoomForResolution: function (a) {
    if (null != this.resolutions)return OpenLayers.Layer.prototype.getZoomForResolution.apply(this, arguments);
    var b = OpenLayers.Layer.prototype.getExtent.apply(this,
        []);
    return this.getZoomForExtent(b)
}, getOLZoomFromMapObjectZoom: function (a) {
    var b = null;
    null != a && (b = a - this.minZoomLevel, this.map.baseLayer !== this && (b = this.map.baseLayer.getZoomForResolution(this.getResolutionForZoom(b))));
    return b
}, getMapObjectZoomFromOLZoom: function (a) {
    var b = null;
    null != a && (b = a + this.minZoomLevel, this.map.baseLayer !== this && (b = this.getZoomForResolution(this.map.baseLayer.getResolutionForZoom(b))));
    return b
}, CLASS_NAME: "OpenLayers.Layer.FixedZoomLevels"});
OpenLayers.Layer.Google = OpenLayers.Class(OpenLayers.Layer.EventPane, OpenLayers.Layer.FixedZoomLevels, {MIN_ZOOM_LEVEL: 0, MAX_ZOOM_LEVEL: 21, RESOLUTIONS: [1.40625, 0.703125, 0.3515625, 0.17578125, 0.087890625, 0.0439453125, 0.02197265625, 0.010986328125, 0.0054931640625, 0.00274658203125, 0.001373291015625, 6.866455078125E-4, 3.4332275390625E-4, 1.71661376953125E-4, 8.58306884765625E-5, 4.291534423828125E-5, 2.145767211914062E-5, 1.072883605957031E-5, 5.36441802978515E-6, 2.68220901489257E-6, 1.341104507446289E-6, 6.705522537231445E-7],
    type: null, wrapDateLine: !0, sphericalMercator: !1, version: null, initialize: function (a, b) {
        b = b || {};
        b.version || (b.version = "function" === typeof GMap2 ? "2" : "3");
        var c = OpenLayers.Layer.Google["v" + b.version.replace(/\./g, "_")];
        if (c)OpenLayers.Util.applyDefaults(b, c); else throw"Unsupported Google Maps API version: " + b.version;
        OpenLayers.Util.applyDefaults(b, c.DEFAULTS);
        b.maxExtent && (b.maxExtent = b.maxExtent.clone());
        OpenLayers.Layer.EventPane.prototype.initialize.apply(this, [a, b]);
        OpenLayers.Layer.FixedZoomLevels.prototype.initialize.apply(this,
            [a, b]);
        this.sphericalMercator && (OpenLayers.Util.extend(this, OpenLayers.Layer.SphericalMercator), this.initMercatorParameters())
    }, clone: function () {
        return new OpenLayers.Layer.Google(this.name, this.getOptions())
    }, setVisibility: function (a) {
        var b = null == this.opacity ? 1 : this.opacity;
        OpenLayers.Layer.EventPane.prototype.setVisibility.apply(this, arguments);
        this.setOpacity(b)
    }, display: function (a) {
        this._dragging || this.setGMapVisibility(a);
        OpenLayers.Layer.EventPane.prototype.display.apply(this, arguments)
    }, moveTo: function (a, b, c) {
        this._dragging = c;
        OpenLayers.Layer.EventPane.prototype.moveTo.apply(this, arguments);
        delete this._dragging
    }, setOpacity: function (a) {
        a !== this.opacity && (null != this.map && this.map.events.triggerEvent("changelayer", {layer: this, property: "opacity"}), this.opacity = a);
        if (this.getVisibility()) {
            var b = this.getMapContainer();
            OpenLayers.Util.modifyDOMElement(b, null, null, null, null, null, null, a)
        }
    }, destroy: function () {
        if (this.map) {
            this.setGMapVisibility(!1);
            var a = OpenLayers.Layer.Google.cache[this.map.id];
            a && 1 >= a.count &&
            this.removeGMapElements()
        }
        OpenLayers.Layer.EventPane.prototype.destroy.apply(this, arguments)
    }, removeGMapElements: function () {
        var a = OpenLayers.Layer.Google.cache[this.map.id];
        if (a) {
            var b = this.mapObject && this.getMapContainer();
            b && b.parentNode && b.parentNode.removeChild(b);
            (b = a.termsOfUse) && b.parentNode && b.parentNode.removeChild(b);
            (a = a.poweredBy) && a.parentNode && a.parentNode.removeChild(a);
            this.mapObject && (window.google && google.maps && google.maps.event && google.maps.event.clearListeners) && google.maps.event.clearListeners(this.mapObject,
                "tilesloaded")
        }
    }, removeMap: function (a) {
        this.visibility && this.mapObject && this.setGMapVisibility(!1);
        var b = OpenLayers.Layer.Google.cache[a.id];
        b && (1 >= b.count ? (this.removeGMapElements(), delete OpenLayers.Layer.Google.cache[a.id]) : --b.count);
        delete this.termsOfUse;
        delete this.poweredBy;
        delete this.mapObject;
        delete this.dragObject;
        OpenLayers.Layer.EventPane.prototype.removeMap.apply(this, arguments)
    }, getOLBoundsFromMapObjectBounds: function (a) {
        var b = null;
        null != a && (b = a.getSouthWest(), a = a.getNorthEast(), this.sphericalMercator ?
            (b = this.forwardMercator(b.lng(), b.lat()), a = this.forwardMercator(a.lng(), a.lat())) : (b = new OpenLayers.LonLat(b.lng(), b.lat()), a = new OpenLayers.LonLat(a.lng(), a.lat())), b = new OpenLayers.Bounds(b.lon, b.lat, a.lon, a.lat));
        return b
    }, getWarningHTML: function () {
        return OpenLayers.i18n("googleWarning")
    }, getMapObjectCenter: function () {
        return this.mapObject.getCenter()
    }, getMapObjectZoom: function () {
        return this.mapObject.getZoom()
    }, getLongitudeFromMapObjectLonLat: function (a) {
        return this.sphericalMercator ? this.forwardMercator(a.lng(),
            a.lat()).lon : a.lng()
    }, getLatitudeFromMapObjectLonLat: function (a) {
        return this.sphericalMercator ? this.forwardMercator(a.lng(), a.lat()).lat : a.lat()
    }, getXFromMapObjectPixel: function (a) {
        return a.x
    }, getYFromMapObjectPixel: function (a) {
        return a.y
    }, CLASS_NAME: "OpenLayers.Layer.Google"});
OpenLayers.Layer.Google.cache = {};
OpenLayers.Layer.Google.v2 = {termsOfUse: null, poweredBy: null, dragObject: null, loadMapObject: function () {
    this.type || (this.type = G_NORMAL_MAP);
    var a, b, c, d = OpenLayers.Layer.Google.cache[this.map.id];
    if (d)a = d.mapObject, b = d.termsOfUse, c = d.poweredBy, ++d.count; else {
        var d = this.map.viewPortDiv, e = document.createElement("div");
        e.id = this.map.id + "_GMap2Container";
        e.style.position = "absolute";
        e.style.width = "100%";
        e.style.height = "100%";
        d.appendChild(e);
        try {
            a = new GMap2(e), b = e.lastChild, d.appendChild(b), b.style.zIndex =
                "1100", b.style.right = "", b.style.bottom = "", b.className = "olLayerGoogleCopyright", c = e.lastChild, d.appendChild(c), c.style.zIndex = "1100", c.style.right = "", c.style.bottom = "", c.className = "olLayerGooglePoweredBy gmnoprint"
        } catch (f) {
            throw f;
        }
        OpenLayers.Layer.Google.cache[this.map.id] = {mapObject: a, termsOfUse: b, poweredBy: c, count: 1}
    }
    this.mapObject = a;
    this.termsOfUse = b;
    this.poweredBy = c;
    -1 === OpenLayers.Util.indexOf(this.mapObject.getMapTypes(), this.type) && this.mapObject.addMapType(this.type);
    "function" == typeof a.getDragObject ?
        this.dragObject = a.getDragObject() : this.dragPanMapObject = null;
    !1 === this.isBaseLayer && this.setGMapVisibility("none" !== this.div.style.display)
}, onMapResize: function () {
    if (this.visibility && this.mapObject.isLoaded())this.mapObject.checkResize(); else {
        if (!this._resized)var a = this, b = GEvent.addListener(this.mapObject, "load", function () {
            GEvent.removeListener(b);
            delete a._resized;
            a.mapObject.checkResize();
            a.moveTo(a.map.getCenter(), a.map.getZoom())
        });
        this._resized = !0
    }
}, setGMapVisibility: function (a) {
    var b = OpenLayers.Layer.Google.cache[this.map.id];
    if (b) {
        var c = this.mapObject.getContainer();
        !0 === a ? (this.mapObject.setMapType(this.type), c.style.display = "", this.termsOfUse.style.left = "", this.termsOfUse.style.display = "", this.poweredBy.style.display = "", b.displayed = this.id) : (b.displayed === this.id && delete b.displayed, b.displayed || (c.style.display = "none", this.termsOfUse.style.display = "none", this.termsOfUse.style.left = "-9999px", this.poweredBy.style.display = "none"))
    }
}, getMapContainer: function () {
    return this.mapObject.getContainer()
}, getMapObjectBoundsFromOLBounds: function (a) {
    var b =
        null;
    null != a && (b = this.sphericalMercator ? this.inverseMercator(a.bottom, a.left) : new OpenLayers.LonLat(a.bottom, a.left), a = this.sphericalMercator ? this.inverseMercator(a.top, a.right) : new OpenLayers.LonLat(a.top, a.right), b = new GLatLngBounds(new GLatLng(b.lat, b.lon), new GLatLng(a.lat, a.lon)));
    return b
}, setMapObjectCenter: function (a, b) {
    this.mapObject.setCenter(a, b)
}, dragPanMapObject: function (a, b) {
    this.dragObject.moveBy(new GSize(-a, b))
}, getMapObjectLonLatFromMapObjectPixel: function (a) {
    return this.mapObject.fromContainerPixelToLatLng(a)
},
    getMapObjectPixelFromMapObjectLonLat: function (a) {
        return this.mapObject.fromLatLngToContainerPixel(a)
    }, getMapObjectZoomFromMapObjectBounds: function (a) {
        return this.mapObject.getBoundsZoomLevel(a)
    }, getMapObjectLonLatFromLonLat: function (a, b) {
        var c;
        this.sphericalMercator ? (c = this.inverseMercator(a, b), c = new GLatLng(c.lat, c.lon)) : c = new GLatLng(b, a);
        return c
    }, getMapObjectPixelFromXY: function (a, b) {
        return new GPoint(a, b)
    }};
OpenLayers.Geometry = OpenLayers.Class({id: null, parent: null, bounds: null, initialize: function () {
    this.id = OpenLayers.Util.createUniqueID(this.CLASS_NAME + "_")
}, destroy: function () {
    this.bounds = this.id = null
}, clone: function () {
    return new OpenLayers.Geometry
}, setBounds: function (a) {
    a && (this.bounds = a.clone())
}, clearBounds: function () {
    this.bounds = null;
    this.parent && this.parent.clearBounds()
}, extendBounds: function (a) {
    this.getBounds() ? this.bounds.extend(a) : this.setBounds(a)
}, getBounds: function () {
    null == this.bounds && this.calculateBounds();
    return this.bounds
}, calculateBounds: function () {
}, distanceTo: function (a, b) {
}, getVertices: function (a) {
}, atPoint: function (a, b, c) {
    var d = !1;
    null != this.getBounds() && null != a && (b = null != b ? b : 0, c = null != c ? c : 0, d = (new OpenLayers.Bounds(this.bounds.left - b, this.bounds.bottom - c, this.bounds.right + b, this.bounds.top + c)).containsLonLat(a));
    return d
}, getLength: function () {
    return 0
}, getArea: function () {
    return 0
}, getCentroid: function () {
    return null
}, toString: function () {
    return OpenLayers.Format && OpenLayers.Format.WKT ? OpenLayers.Format.WKT.prototype.write(new OpenLayers.Feature.Vector(this)) :
        Object.prototype.toString.call(this)
}, CLASS_NAME: "OpenLayers.Geometry"});
OpenLayers.Geometry.fromWKT = function (a) {
    var b;
    if (OpenLayers.Format && OpenLayers.Format.WKT) {
        var c = OpenLayers.Geometry.fromWKT.format;
        c || (c = new OpenLayers.Format.WKT, OpenLayers.Geometry.fromWKT.format = c);
        a = c.read(a);
        if (a instanceof OpenLayers.Feature.Vector)b = a.geometry; else if (OpenLayers.Util.isArray(a)) {
            b = a.length;
            for (var c = Array(b), d = 0; d < b; ++d)c[d] = a[d].geometry;
            b = new OpenLayers.Geometry.Collection(c)
        }
    }
    return b
};
OpenLayers.Geometry.segmentsIntersect = function (a, b, c) {
    var d = c && c.point;
    c = c && c.tolerance;
    var e = !1, f = a.x1 - b.x1, g = a.y1 - b.y1, h = a.x2 - a.x1, k = a.y2 - a.y1, l = b.y2 - b.y1, m = b.x2 - b.x1, r = l * h - m * k, l = m * g - l * f, g = h * g - k * f;
    0 == r ? 0 == l && 0 == g && (e = !0) : (f = l / r, r = g / r, 0 <= f && (1 >= f && 0 <= r && 1 >= r) && (d ? (h = a.x1 + f * h, r = a.y1 + f * k, e = new OpenLayers.Geometry.Point(h, r)) : e = !0));
    if (c)if (e) {
        if (d)a:for (a = [a, b], b = 0; 2 > b; ++b)for (f = a[b], k = 1; 3 > k; ++k)if (h = f["x" + k], r = f["y" + k], d = Math.sqrt(Math.pow(h - e.x, 2) + Math.pow(r - e.y, 2)), d < c) {
            e.x = h;
            e.y = r;
            break a
        }
    } else a:for (a =
                      [a, b], b = 0; 2 > b; ++b)for (h = a[b], r = a[(b + 1) % 2], k = 1; 3 > k; ++k)if (f = {x: h["x" + k], y: h["y" + k]}, g = OpenLayers.Geometry.distanceToSegment(f, r), g.distance < c) {
        e = d ? new OpenLayers.Geometry.Point(f.x, f.y) : !0;
        break a
    }
    return e
};
OpenLayers.Geometry.distanceToSegment = function (a, b) {
    var c = OpenLayers.Geometry.distanceSquaredToSegment(a, b);
    c.distance = Math.sqrt(c.distance);
    return c
};
OpenLayers.Geometry.distanceSquaredToSegment = function (a, b) {
    var c = a.x, d = a.y, e = b.x1, f = b.y1, g = b.x2, h = b.y2, k = g - e, l = h - f, m = (k * (c - e) + l * (d - f)) / (Math.pow(k, 2) + Math.pow(l, 2));
    0 >= m || (1 <= m ? (e = g, f = h) : (e += m * k, f += m * l));
    return{distance: Math.pow(e - c, 2) + Math.pow(f - d, 2), x: e, y: f, along: m}
};
OpenLayers.Geometry.Collection = OpenLayers.Class(OpenLayers.Geometry, {components: null, componentTypes: null, initialize: function (a) {
    OpenLayers.Geometry.prototype.initialize.apply(this, arguments);
    this.components = [];
    null != a && this.addComponents(a)
}, destroy: function () {
    this.components.length = 0;
    this.components = null;
    OpenLayers.Geometry.prototype.destroy.apply(this, arguments)
}, clone: function () {
    for (var a = eval("new " + this.CLASS_NAME + "()"), b = 0, c = this.components.length; b < c; b++)a.addComponent(this.components[b].clone());
    OpenLayers.Util.applyDefaults(a, this);
    return a
}, getComponentsString: function () {
    for (var a = [], b = 0, c = this.components.length; b < c; b++)a.push(this.components[b].toShortString());
    return a.join(",")
}, calculateBounds: function () {
    this.bounds = null;
    var a = new OpenLayers.Bounds, b = this.components;
    if (b)for (var c = 0, d = b.length; c < d; c++)a.extend(b[c].getBounds());
    null != a.left && (null != a.bottom && null != a.right && null != a.top) && this.setBounds(a)
}, addComponents: function (a) {
    OpenLayers.Util.isArray(a) || (a = [a]);
    for (var b = 0, c = a.length; b <
        c; b++)this.addComponent(a[b])
}, addComponent: function (a, b) {
    var c = !1;
    if (a && (null == this.componentTypes || -1 < OpenLayers.Util.indexOf(this.componentTypes, a.CLASS_NAME))) {
        if (null != b && b < this.components.length) {
            var c = this.components.slice(0, b), d = this.components.slice(b, this.components.length);
            c.push(a);
            this.components = c.concat(d)
        } else this.components.push(a);
        a.parent = this;
        this.clearBounds();
        c = !0
    }
    return c
}, removeComponents: function (a) {
    var b = !1;
    OpenLayers.Util.isArray(a) || (a = [a]);
    for (var c = a.length - 1; 0 <= c; --c)b =
        this.removeComponent(a[c]) || b;
    return b
}, removeComponent: function (a) {
    OpenLayers.Util.removeItem(this.components, a);
    this.clearBounds();
    return!0
}, getLength: function () {
    for (var a = 0, b = 0, c = this.components.length; b < c; b++)a += this.components[b].getLength();
    return a
}, getArea: function () {
    for (var a = 0, b = 0, c = this.components.length; b < c; b++)a += this.components[b].getArea();
    return a
}, getGeodesicArea: function (a) {
    for (var b = 0, c = 0, d = this.components.length; c < d; c++)b += this.components[c].getGeodesicArea(a);
    return b
}, getCentroid: function (a) {
    if (!a)return this.components.length &&
        this.components[0].getCentroid();
    a = this.components.length;
    if (!a)return!1;
    for (var b = [], c = [], d = 0, e = Number.MAX_VALUE, f, g = 0; g < a; ++g) {
        f = this.components[g];
        var h = f.getArea();
        f = f.getCentroid(!0);
        isNaN(h) || (isNaN(f.x) || isNaN(f.y)) || (b.push(h), d += h, e = h < e && 0 < h ? h : e, c.push(f))
    }
    a = b.length;
    if (0 === d) {
        for (g = 0; g < a; ++g)b[g] = 1;
        d = b.length
    } else {
        for (g = 0; g < a; ++g)b[g] /= e;
        d /= e
    }
    for (var k = e = 0, g = 0; g < a; ++g)f = c[g], h = b[g], e += f.x * h, k += f.y * h;
    return new OpenLayers.Geometry.Point(e / d, k / d)
}, getGeodesicLength: function (a) {
    for (var b = 0,
             c = 0, d = this.components.length; c < d; c++)b += this.components[c].getGeodesicLength(a);
    return b
}, move: function (a, b) {
    for (var c = 0, d = this.components.length; c < d; c++)this.components[c].move(a, b)
}, rotate: function (a, b) {
    for (var c = 0, d = this.components.length; c < d; ++c)this.components[c].rotate(a, b)
}, resize: function (a, b, c) {
    for (var d = 0; d < this.components.length; ++d)this.components[d].resize(a, b, c);
    return this
}, distanceTo: function (a, b) {
    for (var c = !(b && !1 === b.edge) && b && b.details, d, e, f, g = Number.POSITIVE_INFINITY, h = 0, k = this.components.length; h <
        k && !(d = this.components[h].distanceTo(a, b), f = c ? d.distance : d, f < g && (g = f, e = d, 0 == g)); ++h);
    return e
}, equals: function (a) {
    var b = !0;
    if (a && a.CLASS_NAME && this.CLASS_NAME == a.CLASS_NAME)if (OpenLayers.Util.isArray(a.components) && a.components.length == this.components.length)for (var c = 0, d = this.components.length; c < d; ++c) {
        if (!this.components[c].equals(a.components[c])) {
            b = !1;
            break
        }
    } else b = !1; else b = !1;
    return b
}, transform: function (a, b) {
    if (a && b) {
        for (var c = 0, d = this.components.length; c < d; c++)this.components[c].transform(a,
            b);
        this.bounds = null
    }
    return this
}, intersects: function (a) {
    for (var b = !1, c = 0, d = this.components.length; c < d && !(b = a.intersects(this.components[c])); ++c);
    return b
}, getVertices: function (a) {
    for (var b = [], c = 0, d = this.components.length; c < d; ++c)Array.prototype.push.apply(b, this.components[c].getVertices(a));
    return b
}, CLASS_NAME: "OpenLayers.Geometry.Collection"});
OpenLayers.Geometry.Point = OpenLayers.Class(OpenLayers.Geometry, {x: null, y: null, initialize: function (a, b) {
    OpenLayers.Geometry.prototype.initialize.apply(this, arguments);
    this.x = parseFloat(a);
    this.y = parseFloat(b)
}, clone: function (a) {
    null == a && (a = new OpenLayers.Geometry.Point(this.x, this.y));
    OpenLayers.Util.applyDefaults(a, this);
    return a
}, calculateBounds: function () {
    this.bounds = new OpenLayers.Bounds(this.x, this.y, this.x, this.y)
}, distanceTo: function (a, b) {
    var c = !(b && !1 === b.edge) && b && b.details, d, e, f, g, h;
    a instanceof
        OpenLayers.Geometry.Point ? (e = this.x, f = this.y, g = a.x, h = a.y, d = Math.sqrt(Math.pow(e - g, 2) + Math.pow(f - h, 2)), d = c ? {x0: e, y0: f, x1: g, y1: h, distance: d} : d) : (d = a.distanceTo(this, b), c && (d = {x0: d.x1, y0: d.y1, x1: d.x0, y1: d.y0, distance: d.distance}));
    return d
}, equals: function (a) {
    var b = !1;
    null != a && (b = this.x == a.x && this.y == a.y || isNaN(this.x) && isNaN(this.y) && isNaN(a.x) && isNaN(a.y));
    return b
}, toShortString: function () {
    return this.x + ", " + this.y
}, move: function (a, b) {
    this.x += a;
    this.y += b;
    this.clearBounds()
}, rotate: function (a, b) {
    a *=
        Math.PI / 180;
    var c = this.distanceTo(b), d = a + Math.atan2(this.y - b.y, this.x - b.x);
    this.x = b.x + c * Math.cos(d);
    this.y = b.y + c * Math.sin(d);
    this.clearBounds()
}, getCentroid: function () {
    return new OpenLayers.Geometry.Point(this.x, this.y)
}, resize: function (a, b, c) {
    this.x = b.x + a * (void 0 == c ? 1 : c) * (this.x - b.x);
    this.y = b.y + a * (this.y - b.y);
    this.clearBounds();
    return this
}, intersects: function (a) {
    var b = !1;
    return b = "OpenLayers.Geometry.Point" == a.CLASS_NAME ? this.equals(a) : a.intersects(this)
}, transform: function (a, b) {
    a && b && (OpenLayers.Projection.transform(this,
        a, b), this.bounds = null);
    return this
}, getVertices: function (a) {
    return[this]
}, CLASS_NAME: "OpenLayers.Geometry.Point"});
OpenLayers.Geometry.MultiPoint = OpenLayers.Class(OpenLayers.Geometry.Collection, {componentTypes: ["OpenLayers.Geometry.Point"], addPoint: function (a, b) {
    this.addComponent(a, b)
}, removePoint: function (a) {
    this.removeComponent(a)
}, CLASS_NAME: "OpenLayers.Geometry.MultiPoint"});
OpenLayers.Geometry.Curve = OpenLayers.Class(OpenLayers.Geometry.MultiPoint, {componentTypes: ["OpenLayers.Geometry.Point"], getLength: function () {
    var a = 0;
    if (this.components && 1 < this.components.length)for (var b = 1, c = this.components.length; b < c; b++)a += this.components[b - 1].distanceTo(this.components[b]);
    return a
}, getGeodesicLength: function (a) {
    var b = this;
    if (a) {
        var c = new OpenLayers.Projection("EPSG:4326");
        c.equals(a) || (b = this.clone().transform(a, c))
    }
    a = 0;
    if (b.components && 1 < b.components.length)for (var d, e = 1, f = b.components.length; e <
        f; e++)c = b.components[e - 1], d = b.components[e], a += OpenLayers.Util.distVincenty({lon: c.x, lat: c.y}, {lon: d.x, lat: d.y});
    return 1E3 * a
}, CLASS_NAME: "OpenLayers.Geometry.Curve"});
OpenLayers.Geometry.LineString = OpenLayers.Class(OpenLayers.Geometry.Curve, {removeComponent: function (a) {
    var b = this.components && 2 < this.components.length;
    b && OpenLayers.Geometry.Collection.prototype.removeComponent.apply(this, arguments);
    return b
}, intersects: function (a) {
    var b = !1, c = a.CLASS_NAME;
    if ("OpenLayers.Geometry.LineString" == c || "OpenLayers.Geometry.LinearRing" == c || "OpenLayers.Geometry.Point" == c) {
        var d = this.getSortedSegments();
        a = "OpenLayers.Geometry.Point" == c ? [
            {x1: a.x, y1: a.y, x2: a.x, y2: a.y}
        ] : a.getSortedSegments();
        var e, f, g, h, k, l, m, r = 0, p = d.length;
        a:for (; r < p; ++r) {
            c = d[r];
            e = c.x1;
            f = c.x2;
            g = c.y1;
            h = c.y2;
            var n = 0, q = a.length;
            for (; n < q; ++n) {
                k = a[n];
                if (k.x1 > f)break;
                if (!(k.x2 < e || (l = k.y1, m = k.y2, Math.min(l, m) > Math.max(g, h) || Math.max(l, m) < Math.min(g, h) || !OpenLayers.Geometry.segmentsIntersect(c, k)))) {
                    b = !0;
                    break a
                }
            }
        }
    } else b = a.intersects(this);
    return b
}, getSortedSegments: function () {
    for (var a = this.components.length - 1, b = Array(a), c, d, e = 0; e < a; ++e)c = this.components[e], d = this.components[e + 1], b[e] = c.x < d.x ? {x1: c.x, y1: c.y, x2: d.x, y2: d.y} :
    {x1: d.x, y1: d.y, x2: c.x, y2: c.y};
    return b.sort(function (a, b) {
        return a.x1 - b.x1
    })
}, splitWithSegment: function (a, b) {
    for (var c = !(b && !1 === b.edge), d = b && b.tolerance, e = [], f = this.getVertices(), g = [], h = [], k = !1, l, m, r, p = {point: !0, tolerance: d}, n = null, q = 0, s = f.length - 2; q <= s; ++q)if (d = f[q], g.push(d.clone()), l = f[q + 1], m = {x1: d.x, y1: d.y, x2: l.x, y2: l.y}, m = OpenLayers.Geometry.segmentsIntersect(a, m, p), m instanceof OpenLayers.Geometry.Point && ((r = m.x === a.x1 && m.y === a.y1 || m.x === a.x2 && m.y === a.y2 || m.equals(d) || m.equals(l) ? !0 : !1) || c))m.equals(h[h.length -
        1]) || h.push(m.clone()), 0 === q && m.equals(d) || m.equals(l) || (k = !0, m.equals(d) || g.push(m), e.push(new OpenLayers.Geometry.LineString(g)), g = [m.clone()]);
    k && (g.push(l.clone()), e.push(new OpenLayers.Geometry.LineString(g)));
    if (0 < h.length)var t = a.x1 < a.x2 ? 1 : -1, u = a.y1 < a.y2 ? 1 : -1, n = {lines: e, points: h.sort(function (a, b) {
        return t * a.x - t * b.x || u * a.y - u * b.y
    })};
    return n
}, split: function (a, b) {
    var c = null, d = b && b.mutual, e, f, g, h;
    if (a instanceof OpenLayers.Geometry.LineString) {
        var k = this.getVertices(), l, m, r, p, n, q = [];
        g = [];
        for (var s =
            0, t = k.length - 2; s <= t; ++s) {
            l = k[s];
            m = k[s + 1];
            r = {x1: l.x, y1: l.y, x2: m.x, y2: m.y};
            h = h || [a];
            d && q.push(l.clone());
            for (var u = 0; u < h.length; ++u)if (p = h[u].splitWithSegment(r, b))if (n = p.lines, 0 < n.length && (n.unshift(u, 1), Array.prototype.splice.apply(h, n), u += n.length - 2), d)for (var v = 0, w = p.points.length; v < w; ++v)n = p.points[v], n.equals(l) || (q.push(n), g.push(new OpenLayers.Geometry.LineString(q)), q = n.equals(m) ? [] : [n.clone()])
        }
        d && (0 < g.length && 0 < q.length) && (q.push(m.clone()), g.push(new OpenLayers.Geometry.LineString(q)))
    } else c =
        a.splitWith(this, b);
    h && 1 < h.length ? f = !0 : h = [];
    g && 1 < g.length ? e = !0 : g = [];
    if (f || e)c = d ? [g, h] : h;
    return c
}, splitWith: function (a, b) {
    return a.split(this, b)
}, getVertices: function (a) {
    return!0 === a ? [this.components[0], this.components[this.components.length - 1]] : !1 === a ? this.components.slice(1, this.components.length - 1) : this.components.slice()
}, distanceTo: function (a, b) {
    var c = !(b && !1 === b.edge) && b && b.details, d, e = {}, f = Number.POSITIVE_INFINITY;
    if (a instanceof OpenLayers.Geometry.Point) {
        for (var g = this.getSortedSegments(),
                 h = a.x, k = a.y, l, m = 0, r = g.length; m < r; ++m)if (l = g[m], d = OpenLayers.Geometry.distanceToSegment(a, l), d.distance < f) {
            if (f = d.distance, e = d, 0 === f)break
        } else if (l.x2 > h && (k > l.y1 && k < l.y2 || k < l.y1 && k > l.y2))break;
        e = c ? {distance: e.distance, x0: e.x, y0: e.y, x1: h, y1: k} : e.distance
    } else if (a instanceof OpenLayers.Geometry.LineString) {
        var g = this.getSortedSegments(), h = a.getSortedSegments(), p, n, q = h.length, s = {point: !0}, m = 0, r = g.length;
        a:for (; m < r; ++m) {
            k = g[m];
            l = k.x1;
            n = k.y1;
            for (var t = 0; t < q; ++t)if (d = h[t], p = OpenLayers.Geometry.segmentsIntersect(k,
                d, s)) {
                f = 0;
                e = {distance: 0, x0: p.x, y0: p.y, x1: p.x, y1: p.y};
                break a
            } else d = OpenLayers.Geometry.distanceToSegment({x: l, y: n}, d), d.distance < f && (f = d.distance, e = {distance: f, x0: l, y0: n, x1: d.x, y1: d.y})
        }
        c || (e = e.distance);
        0 !== f && k && (d = a.distanceTo(new OpenLayers.Geometry.Point(k.x2, k.y2), b), m = c ? d.distance : d, m < f && (e = c ? {distance: f, x0: d.x1, y0: d.y1, x1: d.x0, y1: d.y0} : m))
    } else e = a.distanceTo(this, b), c && (e = {distance: e.distance, x0: e.x1, y0: e.y1, x1: e.x0, y1: e.y0});
    return e
}, simplify: function (a) {
    if (this && null !== this) {
        var b = this.getVertices();
        if (3 > b.length)return this;
        var c = function (a, b, d, k) {
            for (var l = 0, m = 0, r = b, p; r < d; r++) {
                p = a[b];
                var n = a[d], q = a[r], q = Math.abs(0.5 * (p.x * n.y + n.x * q.y + q.x * p.y - n.x * p.y - q.x * n.y - p.x * q.y));
                p = Math.sqrt(Math.pow(p.x - n.x, 2) + Math.pow(p.y - n.y, 2));
                p = 2 * (q / p);
                p > l && (l = p, m = r)
            }
            l > k && m != b && (e.push(m), c(a, b, m, k), c(a, m, d, k))
        }, d = b.length - 1, e = [];
        e.push(0);
        for (e.push(d); b[0].equals(b[d]);)d--, e.push(d);
        c(b, 0, d, a);
        a = [];
        e.sort(function (a, b) {
            return a - b
        });
        for (d = 0; d < e.length; d++)a.push(b[e[d]]);
        return new OpenLayers.Geometry.LineString(a)
    }
    return this
},
    CLASS_NAME: "OpenLayers.Geometry.LineString"});
OpenLayers.Geometry.LinearRing = OpenLayers.Class(OpenLayers.Geometry.LineString, {componentTypes: ["OpenLayers.Geometry.Point"], addComponent: function (a, b) {
    var c = !1, d = this.components.pop();
    null == b && a.equals(d) || (c = OpenLayers.Geometry.Collection.prototype.addComponent.apply(this, arguments));
    OpenLayers.Geometry.Collection.prototype.addComponent.apply(this, [this.components[0]]);
    return c
}, removeComponent: function (a) {
    var b = this.components && 3 < this.components.length;
    b && (this.components.pop(), OpenLayers.Geometry.Collection.prototype.removeComponent.apply(this,
        arguments), OpenLayers.Geometry.Collection.prototype.addComponent.apply(this, [this.components[0]]));
    return b
}, move: function (a, b) {
    for (var c = 0, d = this.components.length; c < d - 1; c++)this.components[c].move(a, b)
}, rotate: function (a, b) {
    for (var c = 0, d = this.components.length; c < d - 1; ++c)this.components[c].rotate(a, b)
}, resize: function (a, b, c) {
    for (var d = 0, e = this.components.length; d < e - 1; ++d)this.components[d].resize(a, b, c);
    return this
}, transform: function (a, b) {
    if (a && b) {
        for (var c = 0, d = this.components.length; c < d - 1; c++)this.components[c].transform(a,
            b);
        this.bounds = null
    }
    return this
}, getCentroid: function () {
    if (this.components) {
        var a = this.components.length;
        if (0 < a && 2 >= a)return this.components[0].clone();
        if (2 < a) {
            var b = 0, c = 0, d = this.components[0].x, e = this.components[0].y, f = -1 * this.getArea();
            if (0 != f) {
                for (var g = 0; g < a - 1; g++)var h = this.components[g], k = this.components[g + 1], b = b + (h.x + k.x - 2 * d) * ((h.x - d) * (k.y - e) - (k.x - d) * (h.y - e)), c = c + (h.y + k.y - 2 * e) * ((h.x - d) * (k.y - e) - (k.x - d) * (h.y - e));
                b = d + b / (6 * f);
                a = e + c / (6 * f)
            } else {
                for (g = 0; g < a - 1; g++)b += this.components[g].x, c += this.components[g].y;
                b /= a - 1;
                a = c / (a - 1)
            }
            return new OpenLayers.Geometry.Point(b, a)
        }
        return null
    }
}, getArea: function () {
    var a = 0;
    if (this.components && 2 < this.components.length) {
        for (var b = a = 0, c = this.components.length; b < c - 1; b++)var d = this.components[b], e = this.components[b + 1], a = a + (d.x + e.x) * (e.y - d.y);
        a = -a / 2
    }
    return a
}, getGeodesicArea: function (a) {
    var b = this;
    if (a) {
        var c = new OpenLayers.Projection("EPSG:4326");
        c.equals(a) || (b = this.clone().transform(a, c))
    }
    a = 0;
    c = b.components && b.components.length;
    if (2 < c) {
        for (var d, e, f = 0; f < c - 1; f++)d = b.components[f],
            e = b.components[f + 1], a += OpenLayers.Util.rad(e.x - d.x) * (2 + Math.sin(OpenLayers.Util.rad(d.y)) + Math.sin(OpenLayers.Util.rad(e.y)));
        a = 40680631590769 * a / 2
    }
    return a
}, containsPoint: function (a) {
    var b = OpenLayers.Number.limitSigDigs, c = b(a.x, 14);
    a = b(a.y, 14);
    for (var d = this.components.length - 1, e, f, g, h, k, l = 0, m = 0; m < d; ++m)if (e = this.components[m], g = b(e.x, 14), e = b(e.y, 14), f = this.components[m + 1], h = b(f.x, 14), f = b(f.y, 14), e == f) {
        if (a == e && (g <= h && c >= g && c <= h || g >= h && c <= g && c >= h)) {
            l = -1;
            break
        }
    } else {
        k = b((a - f) * ((h - g) / (f - e)) + h, 14);
        if (k ==
            c && (e < f && a >= e && a <= f || e > f && a <= e && a >= f)) {
            l = -1;
            break
        }
        k <= c || g != h && (k < Math.min(g, h) || k > Math.max(g, h)) || (e < f && a >= e && a < f || e > f && a < e && a >= f) && ++l
    }
    return-1 == l ? 1 : !!(l & 1)
}, intersects: function (a) {
    var b = !1;
    if ("OpenLayers.Geometry.Point" == a.CLASS_NAME)b = this.containsPoint(a); else if ("OpenLayers.Geometry.LineString" == a.CLASS_NAME)b = a.intersects(this); else if ("OpenLayers.Geometry.LinearRing" == a.CLASS_NAME)b = OpenLayers.Geometry.LineString.prototype.intersects.apply(this, [a]); else for (var c = 0, d = a.components.length; c <
        d && !(b = a.components[c].intersects(this)); ++c);
    return b
}, getVertices: function (a) {
    return!0 === a ? [] : this.components.slice(0, this.components.length - 1)
}, CLASS_NAME: "OpenLayers.Geometry.LinearRing"});
OpenLayers.Layer.HTTPRequest = OpenLayers.Class(OpenLayers.Layer, {URL_HASH_FACTOR: (Math.sqrt(5) - 1) / 2, url: null, params: null, reproject: !1, initialize: function (a, b, c, d) {
    OpenLayers.Layer.prototype.initialize.apply(this, [a, d]);
    this.url = b;
    this.params || (this.params = OpenLayers.Util.extend({}, c))
}, destroy: function () {
    this.params = this.url = null;
    OpenLayers.Layer.prototype.destroy.apply(this, arguments)
}, clone: function (a) {
    null == a && (a = new OpenLayers.Layer.HTTPRequest(this.name, this.url, this.params, this.getOptions()));
    return a = OpenLayers.Layer.prototype.clone.apply(this, [a])
}, setUrl: function (a) {
    this.url = a
}, mergeNewParams: function (a) {
    this.params = OpenLayers.Util.extend(this.params, a);
    a = this.redraw();
    null != this.map && this.map.events.triggerEvent("changelayer", {layer: this, property: "params"});
    return a
}, redraw: function (a) {
    return a ? this.mergeNewParams({_olSalt: Math.random()}) : OpenLayers.Layer.prototype.redraw.apply(this, [])
}, selectUrl: function (a, b) {
    for (var c = 1, d = 0, e = a.length; d < e; d++)c *= a.charCodeAt(d) * this.URL_HASH_FACTOR,
        c -= Math.floor(c);
    return b[Math.floor(c * b.length)]
}, getFullRequestString: function (a, b) {
    var c = b || this.url, d = OpenLayers.Util.extend({}, this.params), d = OpenLayers.Util.extend(d, a), e = OpenLayers.Util.getParameterString(d);
    OpenLayers.Util.isArray(c) && (c = this.selectUrl(e, c));
    var e = OpenLayers.Util.upperCaseObject(OpenLayers.Util.getParameters(c)), f;
    for (f in d)f.toUpperCase()in e && delete d[f];
    e = OpenLayers.Util.getParameterString(d);
    return OpenLayers.Util.urlAppend(c, e)
}, CLASS_NAME: "OpenLayers.Layer.HTTPRequest"});
OpenLayers.Tile = OpenLayers.Class({events: null, eventListeners: null, id: null, layer: null, url: null, bounds: null, size: null, position: null, isLoading: !1, initialize: function (a, b, c, d, e, f) {
    this.layer = a;
    this.position = b.clone();
    this.setBounds(c);
    this.url = d;
    e && (this.size = e.clone());
    this.id = OpenLayers.Util.createUniqueID("Tile_");
    OpenLayers.Util.extend(this, f);
    this.events = new OpenLayers.Events(this);
    if (this.eventListeners instanceof Object)this.events.on(this.eventListeners)
}, unload: function () {
    this.isLoading && (this.isLoading = !1, this.events.triggerEvent("unload"))
}, destroy: function () {
    this.position = this.size = this.bounds = this.layer = null;
    this.eventListeners && this.events.un(this.eventListeners);
    this.events.destroy();
    this.events = this.eventListeners = null
}, draw: function (a) {
    a || this.clear();
    var b = this.shouldDraw();
    b && (!a && !1 === this.events.triggerEvent("beforedraw")) && (b = null);
    return b
}, shouldDraw: function () {
    var a = !1, b = this.layer.maxExtent;
    if (b) {
        var c = this.layer.map, c = c.baseLayer.wrapDateLine && c.getMaxExtent();
        this.bounds.intersectsBounds(b,
            {inclusive: !1, worldBounds: c}) && (a = !0)
    }
    return a || this.layer.displayOutsideMaxExtent
}, setBounds: function (a) {
    a = a.clone();
    if (this.layer.map.baseLayer.wrapDateLine) {
        var b = this.layer.map.getMaxExtent(), c = this.layer.map.getResolution();
        a = a.wrapDateLine(b, {leftTolerance: c, rightTolerance: c})
    }
    this.bounds = a
}, moveTo: function (a, b, c) {
    null == c && (c = !0);
    this.setBounds(a);
    this.position = b.clone();
    c && this.draw()
}, clear: function (a) {
}, CLASS_NAME: "OpenLayers.Tile"});
OpenLayers.Tile.Image = OpenLayers.Class(OpenLayers.Tile, {url: null, imgDiv: null, frame: null, imageReloadAttempts: null, layerAlphaHack: null, asyncRequestId: null, maxGetUrlLength: null, canvasContext: null, crossOriginKeyword: null, initialize: function (a, b, c, d, e, f) {
    OpenLayers.Tile.prototype.initialize.apply(this, arguments);
    this.url = d;
    this.layerAlphaHack = this.layer.alpha && OpenLayers.Util.alphaHack();
    if (null != this.maxGetUrlLength || this.layer.gutter || this.layerAlphaHack)this.frame = document.createElement("div"), this.frame.style.position =
        "absolute", this.frame.style.overflow = "hidden";
    null != this.maxGetUrlLength && OpenLayers.Util.extend(this, OpenLayers.Tile.Image.IFrame)
}, destroy: function () {
    this.imgDiv && (this.clear(), this.frame = this.imgDiv = null);
    this.asyncRequestId = null;
    OpenLayers.Tile.prototype.destroy.apply(this, arguments)
}, draw: function () {
    var a = OpenLayers.Tile.prototype.draw.apply(this, arguments);
    a ? (this.layer != this.layer.map.baseLayer && this.layer.reproject && (this.bounds = this.getBoundsFromBaseLayer(this.position)), this.isLoading ? this._loadEvent =
        "reload" : (this.isLoading = !0, this._loadEvent = "loadstart"), this.renderTile(), this.positionTile()) : !1 === a && this.unload();
    return a
}, renderTile: function () {
    if (this.layer.async) {
        var a = this.asyncRequestId = (this.asyncRequestId || 0) + 1;
        this.layer.getURLasync(this.bounds, function (b) {
            a == this.asyncRequestId && (this.url = b, this.initImage())
        }, this)
    } else this.url = this.layer.getURL(this.bounds), this.initImage()
}, positionTile: function () {
    var a = this.getTile().style, b = this.frame ? this.size : this.layer.getImageSize(this.bounds),
        c = 1;
    this.layer instanceof OpenLayers.Layer.Grid && (c = this.layer.getServerResolution() / this.layer.map.getResolution());
    a.left = this.position.x + "px";
    a.top = this.position.y + "px";
    a.width = Math.round(c * b.w) + "px";
    a.height = Math.round(c * b.h) + "px"
}, clear: function () {
    OpenLayers.Tile.prototype.clear.apply(this, arguments);
    var a = this.imgDiv;
    if (a) {
        var b = this.getTile();
        b.parentNode === this.layer.div && this.layer.div.removeChild(b);
        this.setImgSrc();
        !0 === this.layerAlphaHack && (a.style.filter = "");
        OpenLayers.Element.removeClass(a,
            "olImageLoadError")
    }
    this.canvasContext = null
}, getImage: function () {
    if (!this.imgDiv) {
        this.imgDiv = OpenLayers.Tile.Image.IMAGE.cloneNode(!1);
        var a = this.imgDiv.style;
        if (this.frame) {
            var b = 0, c = 0;
            this.layer.gutter && (b = 100 * (this.layer.gutter / this.layer.tileSize.w), c = 100 * (this.layer.gutter / this.layer.tileSize.h));
            a.left = -b + "%";
            a.top = -c + "%";
            a.width = 2 * b + 100 + "%";
            a.height = 2 * c + 100 + "%"
        }
        a.visibility = "hidden";
        a.opacity = 0;
        1 > this.layer.opacity && (a.filter = "alpha(opacity=" + 100 * this.layer.opacity + ")");
        a.position = "absolute";
        this.layerAlphaHack && (a.paddingTop = a.height, a.height = "0", a.width = "100%");
        this.frame && this.frame.appendChild(this.imgDiv)
    }
    return this.imgDiv
}, setImage: function (a) {
    this.imgDiv = a
}, initImage: function () {
    if (this.url || this.imgDiv) {
        this.events.triggerEvent("beforeload");
        this.layer.div.appendChild(this.getTile());
        this.events.triggerEvent(this._loadEvent);
        var a = this.getImage(), b = a.getAttribute("src") || "";
        this.url && OpenLayers.Util.isEquivalentUrl(b, this.url) ? this._loadTimeout = window.setTimeout(OpenLayers.Function.bind(this.onImageLoad,
            this), 0) : (this.stopLoading(), this.crossOriginKeyword && a.removeAttribute("crossorigin"), OpenLayers.Event.observe(a, "load", OpenLayers.Function.bind(this.onImageLoad, this)), OpenLayers.Event.observe(a, "error", OpenLayers.Function.bind(this.onImageError, this)), this.imageReloadAttempts = 0, this.setImgSrc(this.url))
    } else this.isLoading = !1
}, setImgSrc: function (a) {
    var b = this.imgDiv;
    a ? (b.style.visibility = "hidden", b.style.opacity = 0, this.crossOriginKeyword && ("data:" !== a.substr(0, 5) ? b.setAttribute("crossorigin", this.crossOriginKeyword) :
        b.removeAttribute("crossorigin")), b.src = a) : (this.stopLoading(), this.imgDiv = null, b.parentNode && b.parentNode.removeChild(b))
}, getTile: function () {
    return this.frame ? this.frame : this.getImage()
}, createBackBuffer: function () {
    if (this.imgDiv && !this.isLoading) {
        var a;
        this.frame ? (a = this.frame.cloneNode(!1), a.appendChild(this.imgDiv)) : a = this.imgDiv;
        this.imgDiv = null;
        return a
    }
}, onImageLoad: function () {
    var a = this.imgDiv;
    this.stopLoading();
    a.style.visibility = "inherit";
    a.style.opacity = this.layer.opacity;
    this.isLoading = !1;
    this.canvasContext = null;
    this.events.triggerEvent("loadend");
    !0 === this.layerAlphaHack && (a.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + a.src + "', sizingMethod='scale')")
}, onImageError: function () {
    var a = this.imgDiv;
    null != a.src && (this.imageReloadAttempts++, this.imageReloadAttempts <= OpenLayers.IMAGE_RELOAD_ATTEMPTS ? this.setImgSrc(this.layer.getURL(this.bounds)) : (OpenLayers.Element.addClass(a, "olImageLoadError"), this.events.triggerEvent("loaderror"), this.onImageLoad()))
}, stopLoading: function () {
    OpenLayers.Event.stopObservingElement(this.imgDiv);
    window.clearTimeout(this._loadTimeout);
    delete this._loadTimeout
}, getCanvasContext: function () {
    if (OpenLayers.CANVAS_SUPPORTED && this.imgDiv && !this.isLoading) {
        if (!this.canvasContext) {
            var a = document.createElement("canvas");
            a.width = this.size.w;
            a.height = this.size.h;
            this.canvasContext = a.getContext("2d");
            this.canvasContext.drawImage(this.imgDiv, 0, 0)
        }
        return this.canvasContext
    }
}, CLASS_NAME: "OpenLayers.Tile.Image"});
OpenLayers.Tile.Image.IMAGE = function () {
    var a = new Image;
    a.className = "olTileImage";
    a.galleryImg = "no";
    return a
}();
OpenLayers.Layer.Grid = OpenLayers.Class(OpenLayers.Layer.HTTPRequest, {tileSize: null, tileOriginCorner: "bl", tileOrigin: null, tileOptions: null, tileClass: OpenLayers.Tile.Image, grid: null, singleTile: !1, ratio: 1.5, buffer: 0, transitionEffect: "resize", numLoadingTiles: 0, serverResolutions: null, loading: !1, backBuffer: null, gridResolution: null, backBufferResolution: null, backBufferLonLat: null, backBufferTimerId: null, removeBackBufferDelay: null, className: null, gridLayout: null, rowSign: null, transitionendEvents: ["transitionend",
    "webkitTransitionEnd", "otransitionend", "oTransitionEnd"], initialize: function (a, b, c, d) {
    OpenLayers.Layer.HTTPRequest.prototype.initialize.apply(this, arguments);
    this.grid = [];
    this._removeBackBuffer = OpenLayers.Function.bind(this.removeBackBuffer, this);
    this.initProperties();
    this.rowSign = "t" === this.tileOriginCorner.substr(0, 1) ? 1 : -1
}, initProperties: function () {
    void 0 === this.options.removeBackBufferDelay && (this.removeBackBufferDelay = this.singleTile ? 0 : 2500);
    void 0 === this.options.className && (this.className = this.singleTile ?
        "olLayerGridSingleTile" : "olLayerGrid")
}, setMap: function (a) {
    OpenLayers.Layer.HTTPRequest.prototype.setMap.call(this, a);
    OpenLayers.Element.addClass(this.div, this.className)
}, removeMap: function (a) {
    this.removeBackBuffer()
}, destroy: function () {
    this.removeBackBuffer();
    this.clearGrid();
    this.tileSize = this.grid = null;
    OpenLayers.Layer.HTTPRequest.prototype.destroy.apply(this, arguments)
}, clearGrid: function () {
    if (this.grid) {
        for (var a = 0, b = this.grid.length; a < b; a++)for (var c = this.grid[a], d = 0, e = c.length; d < e; d++)this.destroyTile(c[d]);
        this.grid = [];
        this.gridLayout = this.gridResolution = null
    }
}, addOptions: function (a, b) {
    var c = void 0 !== a.singleTile && a.singleTile !== this.singleTile;
    OpenLayers.Layer.HTTPRequest.prototype.addOptions.apply(this, arguments);
    this.map && c && (this.initProperties(), this.clearGrid(), this.tileSize = this.options.tileSize, this.setTileSize(), this.moveTo(null, !0))
}, clone: function (a) {
    null == a && (a = new OpenLayers.Layer.Grid(this.name, this.url, this.params, this.getOptions()));
    a = OpenLayers.Layer.HTTPRequest.prototype.clone.apply(this,
        [a]);
    null != this.tileSize && (a.tileSize = this.tileSize.clone());
    a.grid = [];
    a.gridResolution = null;
    a.backBuffer = null;
    a.backBufferTimerId = null;
    a.loading = !1;
    a.numLoadingTiles = 0;
    return a
}, moveTo: function (a, b, c) {
    OpenLayers.Layer.HTTPRequest.prototype.moveTo.apply(this, arguments);
    a = a || this.map.getExtent();
    if (null != a) {
        var d = !this.grid.length || b, e = this.getTilesBounds(), f = this.map.getResolution();
        this.getServerResolution(f);
        if (this.singleTile) {
            if (d || !c && !e.containsBounds(a))b && "resize" !== this.transitionEffect &&
                this.removeBackBuffer(), b && "resize" !== this.transitionEffect || this.applyBackBuffer(f), this.initSingleTile(a)
        } else(d = d || !e.intersectsBounds(a, {worldBounds: this.map.baseLayer.wrapDateLine && this.map.getMaxExtent()})) ? (!b || "resize" !== this.transitionEffect && this.gridResolution !== f || this.applyBackBuffer(f), this.initGriddedTiles(a)) : this.moveGriddedTiles()
    }
}, getTileData: function (a) {
    var b = null, c = a.lon, d = a.lat, e = this.grid.length;
    if (this.map && e) {
        var f = this.map.getResolution();
        a = this.tileSize.w;
        var g = this.tileSize.h,
            h = this.grid[0][0].bounds, k = h.left, h = h.top;
        if (c < k && this.map.baseLayer.wrapDateLine)var l = this.map.getMaxExtent().getWidth(), m = Math.ceil((k - c) / l), c = c + l * m;
        c = (c - k) / (f * a);
        d = (h - d) / (f * g);
        f = Math.floor(c);
        k = Math.floor(d);
        0 <= k && k < e && (e = this.grid[k][f]) && (b = {tile: e, i: Math.floor((c - f) * a), j: Math.floor((d - k) * g)})
    }
    return b
}, destroyTile: function (a) {
    this.removeTileMonitoringHooks(a);
    a.destroy()
}, getServerResolution: function (a) {
    var b = Number.POSITIVE_INFINITY;
    a = a || this.map.getResolution();
    if (this.serverResolutions &&
        -1 === OpenLayers.Util.indexOf(this.serverResolutions, a)) {
        var c, d, e, f;
        for (c = this.serverResolutions.length - 1; 0 <= c; c--) {
            e = this.serverResolutions[c];
            d = Math.abs(e - a);
            if (d > b)break;
            b = d;
            f = e
        }
        a = f
    }
    return a
}, getServerZoom: function () {
    var a = this.getServerResolution();
    return this.serverResolutions ? OpenLayers.Util.indexOf(this.serverResolutions, a) : this.map.getZoomForResolution(a) + (this.zoomOffset || 0)
}, applyBackBuffer: function (a) {
    null !== this.backBufferTimerId && this.removeBackBuffer();
    var b = this.backBuffer;
    if (!b) {
        b =
            this.createBackBuffer();
        if (!b)return;
        a === this.gridResolution ? this.div.insertBefore(b, this.div.firstChild) : this.map.baseLayer.div.parentNode.insertBefore(b, this.map.baseLayer.div);
        this.backBuffer = b;
        var c = this.grid[0][0].bounds;
        this.backBufferLonLat = {lon: c.left, lat: c.top};
        this.backBufferResolution = this.gridResolution
    }
    for (var c = this.backBufferResolution / a, d = b.childNodes, e, f = d.length - 1; 0 <= f; --f)e = d[f], e.style.top = (c * e._i * e._h | 0) + "px", e.style.left = (c * e._j * e._w | 0) + "px", e.style.width = Math.round(c * e._w) +
        "px", e.style.height = Math.round(c * e._h) + "px";
    a = this.getViewPortPxFromLonLat(this.backBufferLonLat, a);
    c = this.map.layerContainerOriginPx.y;
    b.style.left = Math.round(a.x - this.map.layerContainerOriginPx.x) + "px";
    b.style.top = Math.round(a.y - c) + "px"
}, createBackBuffer: function () {
    var a;
    if (0 < this.grid.length) {
        a = document.createElement("div");
        a.id = this.div.id + "_bb";
        a.className = "olBackBuffer";
        a.style.position = "absolute";
        var b = this.map;
        a.style.zIndex = "resize" === this.transitionEffect ? this.getZIndex() - 1 : b.Z_INDEX_BASE.BaseLayer -
            (b.getNumLayers() - b.getLayerIndex(this));
        for (var b = 0, c = this.grid.length; b < c; b++)for (var d = 0, e = this.grid[b].length; d < e; d++) {
            var f = this.grid[b][d], g = this.grid[b][d].createBackBuffer();
            g && (g._i = b, g._j = d, g._w = f.size.w, g._h = f.size.h, g.id = f.id + "_bb", a.appendChild(g))
        }
    }
    return a
}, removeBackBuffer: function () {
    if (this._transitionElement) {
        for (var a = this.transitionendEvents.length - 1; 0 <= a; --a)OpenLayers.Event.stopObserving(this._transitionElement, this.transitionendEvents[a], this._removeBackBuffer);
        delete this._transitionElement
    }
    this.backBuffer &&
    (this.backBuffer.parentNode && this.backBuffer.parentNode.removeChild(this.backBuffer), this.backBufferResolution = this.backBuffer = null, null !== this.backBufferTimerId && (window.clearTimeout(this.backBufferTimerId), this.backBufferTimerId = null))
}, moveByPx: function (a, b) {
    this.singleTile || this.moveGriddedTiles()
}, setTileSize: function (a) {
    this.singleTile && (a = this.map.getSize(), a.h = parseInt(a.h * this.ratio, 10), a.w = parseInt(a.w * this.ratio, 10));
    OpenLayers.Layer.HTTPRequest.prototype.setTileSize.apply(this, [a])
}, getTilesBounds: function () {
    var a =
        null, b = this.grid.length;
    if (b)var a = this.grid[b - 1][0].bounds, b = this.grid[0].length * a.getWidth(), c = this.grid.length * a.getHeight(), a = new OpenLayers.Bounds(a.left, a.bottom, a.left + b, a.bottom + c);
    return a
}, initSingleTile: function (a) {
    this.events.triggerEvent("retile");
    var b = a.getCenterLonLat(), c = a.getWidth() * this.ratio;
    a = a.getHeight() * this.ratio;
    b = new OpenLayers.Bounds(b.lon - c / 2, b.lat - a / 2, b.lon + c / 2, b.lat + a / 2);
    c = this.map.getLayerPxFromLonLat({lon: b.left, lat: b.top});
    this.grid.length || (this.grid[0] = []);
    (a = this.grid[0][0]) ?
        a.moveTo(b, c) : (a = this.addTile(b, c), this.addTileMonitoringHooks(a), a.draw(), this.grid[0][0] = a);
    this.removeExcessTiles(1, 1);
    this.gridResolution = this.getServerResolution()
}, calculateGridLayout: function (a, b, c) {
    var d = c * this.tileSize.w;
    c *= this.tileSize.h;
    var e = Math.floor((a.left - b.lon) / d) - this.buffer, f = this.rowSign;
    a = Math[~f ? "floor" : "ceil"](f * (b.lat - a.top + c) / c) - this.buffer * f;
    return{tilelon: d, tilelat: c, startcol: e, startrow: a}
}, getTileOrigin: function () {
    var a = this.tileOrigin;
    if (!a)var a = this.getMaxExtent(),
        b = {tl: ["left", "top"], tr: ["right", "top"], bl: ["left", "bottom"], br: ["right", "bottom"]}[this.tileOriginCorner], a = new OpenLayers.LonLat(a[b[0]], a[b[1]]);
    return a
}, getTileBoundsForGridIndex: function (a, b) {
    var c = this.getTileOrigin(), d = this.gridLayout, e = d.tilelon, f = d.tilelat, g = d.startcol, d = d.startrow, h = this.rowSign;
    return new OpenLayers.Bounds(c.lon + (g + b) * e, c.lat - (d + a * h) * f * h, c.lon + (g + b + 1) * e, c.lat - (d + (a - 1) * h) * f * h)
}, initGriddedTiles: function (a) {
    this.events.triggerEvent("retile");
    var b = this.map.getSize(), c = this.getTileOrigin(),
        d = this.map.getResolution(), e = this.getServerResolution(), f = d / e, d = this.tileSize.w / f, f = this.tileSize.h / f, g = Math.ceil(b.h / f) + 2 * this.buffer + 1, b = Math.ceil(b.w / d) + 2 * this.buffer + 1;
    this.gridLayout = e = this.calculateGridLayout(a, c, e);
    var c = e.tilelon, h = e.tilelat, e = this.map.layerContainerOriginPx.x, k = this.map.layerContainerOriginPx.y, l = this.getTileBoundsForGridIndex(0, 0), m = this.map.getViewPortPxFromLonLat(new OpenLayers.LonLat(l.left, l.top));
    m.x = Math.round(m.x) - e;
    m.y = Math.round(m.y) - k;
    var e = [], k = this.map.getCenter(),
        r = 0;
    do {
        var p = this.grid[r];
        p || (p = [], this.grid.push(p));
        var n = 0;
        do {
            var l = this.getTileBoundsForGridIndex(r, n), q = m.clone();
            q.x += n * Math.round(d);
            q.y += r * Math.round(f);
            var s = p[n];
            s ? s.moveTo(l, q, !1) : (s = this.addTile(l, q), this.addTileMonitoringHooks(s), p.push(s));
            q = l.getCenterLonLat();
            e.push({tile: s, distance: Math.pow(q.lon - k.lon, 2) + Math.pow(q.lat - k.lat, 2)});
            n += 1
        } while (l.right <= a.right + c * this.buffer || n < b);
        r += 1
    } while (l.bottom >= a.bottom - h * this.buffer || r < g);
    this.removeExcessTiles(r, n);
    this.gridResolution = d = this.getServerResolution();
    e.sort(function (a, b) {
        return a.distance - b.distance
    });
    a = 0;
    for (d = e.length; a < d; ++a)e[a].tile.draw()
}, getMaxExtent: function () {
    return this.maxExtent
}, addTile: function (a, b) {
    var c = new this.tileClass(this, b, a, null, this.tileSize, this.tileOptions);
    this.events.triggerEvent("addtile", {tile: c});
    return c
}, addTileMonitoringHooks: function (a) {
    a.onLoadStart = function () {
        !1 === this.loading && (this.loading = !0, this.events.triggerEvent("loadstart"));
        this.events.triggerEvent("tileloadstart", {tile: a});
        this.numLoadingTiles++;
        !this.singleTile && (this.backBuffer && this.gridResolution === this.backBufferResolution) && OpenLayers.Element.addClass(a.getTile(), "olTileReplacing")
    };
    a.onLoadEnd = function (b) {
        this.numLoadingTiles--;
        b = "unload" === b.type;
        this.events.triggerEvent("tileloaded", {tile: a, aborted: b});
        if (!this.singleTile && !b && this.backBuffer && this.gridResolution === this.backBufferResolution) {
            var c = a.getTile();
            if ("none" === OpenLayers.Element.getStyle(c, "display")) {
                var d = document.getElementById(a.id + "_bb");
                d && d.parentNode.removeChild(d)
            }
            OpenLayers.Element.removeClass(c,
                "olTileReplacing")
        }
        if (0 === this.numLoadingTiles) {
            if (this.backBuffer)if (0 === this.backBuffer.childNodes.length)this.removeBackBuffer(); else {
                this._transitionElement = b ? this.div.lastChild : a.imgDiv;
                b = this.transitionendEvents;
                for (c = b.length - 1; 0 <= c; --c)OpenLayers.Event.observe(this._transitionElement, b[c], this._removeBackBuffer);
                this.backBufferTimerId = window.setTimeout(this._removeBackBuffer, this.removeBackBufferDelay)
            }
            this.loading = !1;
            this.events.triggerEvent("loadend")
        }
    };
    a.onLoadError = function () {
        this.events.triggerEvent("tileerror",
            {tile: a})
    };
    a.events.on({loadstart: a.onLoadStart, loadend: a.onLoadEnd, unload: a.onLoadEnd, loaderror: a.onLoadError, scope: this})
}, removeTileMonitoringHooks: function (a) {
    a.unload();
    a.events.un({loadstart: a.onLoadStart, loadend: a.onLoadEnd, unload: a.onLoadEnd, loaderror: a.onLoadError, scope: this})
}, moveGriddedTiles: function () {
    for (var a = this.buffer + 1; ;) {
        var b = this.grid[0][0], c = b.position.x + this.map.layerContainerOriginPx.x, b = b.position.y + this.map.layerContainerOriginPx.y, d = this.getServerResolution() / this.map.getResolution(),
            d = {w: Math.round(this.tileSize.w * d), h: Math.round(this.tileSize.h * d)};
        if (c > -d.w * (a - 1))this.shiftColumn(!0, d); else if (c < -d.w * a)this.shiftColumn(!1, d); else if (b > -d.h * (a - 1))this.shiftRow(!0, d); else if (b < -d.h * a)this.shiftRow(!1, d); else break
    }
}, shiftRow: function (a, b) {
    var c = this.grid, d = a ? 0 : c.length - 1, e = a ? -1 : 1;
    this.gridLayout.startrow += e * this.rowSign;
    for (var f = c[d], g = c[a ? "pop" : "shift"](), h = 0, k = g.length; h < k; h++) {
        var l = g[h], m = f[h].position.clone();
        m.y += b.h * e;
        l.moveTo(this.getTileBoundsForGridIndex(d, h), m)
    }
    c[a ?
        "unshift" : "push"](g)
}, shiftColumn: function (a, b) {
    var c = this.grid, d = a ? 0 : c[0].length - 1, e = a ? -1 : 1;
    this.gridLayout.startcol += e;
    for (var f = 0, g = c.length; f < g; f++) {
        var h = c[f], k = h[d].position.clone(), l = h[a ? "pop" : "shift"]();
        k.x += b.w * e;
        l.moveTo(this.getTileBoundsForGridIndex(f, d), k);
        h[a ? "unshift" : "push"](l)
    }
}, removeExcessTiles: function (a, b) {
    for (var c, d; this.grid.length > a;) {
        var e = this.grid.pop();
        c = 0;
        for (d = e.length; c < d; c++) {
            var f = e[c];
            this.destroyTile(f)
        }
    }
    c = 0;
    for (d = this.grid.length; c < d; c++)for (; this.grid[c].length >
                                                     b;)e = this.grid[c], f = e.pop(), this.destroyTile(f)
}, onMapResize: function () {
    this.singleTile && (this.clearGrid(), this.setTileSize())
}, getTileBounds: function (a) {
    var b = this.maxExtent, c = this.getResolution(), d = c * this.tileSize.w, c = c * this.tileSize.h, e = this.getLonLatFromViewPortPx(a);
    a = b.left + d * Math.floor((e.lon - b.left) / d);
    b = b.bottom + c * Math.floor((e.lat - b.bottom) / c);
    return new OpenLayers.Bounds(a, b, a + d, b + c)
}, CLASS_NAME: "OpenLayers.Layer.Grid"});
OpenLayers.Layer.XYZ = OpenLayers.Class(OpenLayers.Layer.Grid, {isBaseLayer: !0, sphericalMercator: !1, zoomOffset: 0, serverResolutions: null, initialize: function (a, b, c) {
    if (c && c.sphericalMercator || this.sphericalMercator)c = OpenLayers.Util.extend({projection: "EPSG:900913", numZoomLevels: 19}, c);
    OpenLayers.Layer.Grid.prototype.initialize.apply(this, [a || this.name, b || this.url, {}, c])
}, clone: function (a) {
    null == a && (a = new OpenLayers.Layer.XYZ(this.name, this.url, this.getOptions()));
    return a = OpenLayers.Layer.Grid.prototype.clone.apply(this,
        [a])
}, getURL: function (a) {
    a = this.getXYZ(a);
    var b = this.url;
    OpenLayers.Util.isArray(b) && (b = this.selectUrl("" + a.x + a.y + a.z, b));
    return OpenLayers.String.format(b, a)
}, getXYZ: function (a) {
    var b = this.getServerResolution(), c = Math.round((a.left - this.maxExtent.left) / (b * this.tileSize.w));
    a = Math.round((this.maxExtent.top - a.top) / (b * this.tileSize.h));
    b = this.getServerZoom();
    if (this.wrapDateLine)var d = Math.pow(2, b), c = (c % d + d) % d;
    return{x: c, y: a, z: b}
}, setMap: function (a) {
    OpenLayers.Layer.Grid.prototype.setMap.apply(this,
        arguments);
    this.tileOrigin || (this.tileOrigin = new OpenLayers.LonLat(this.maxExtent.left, this.maxExtent.bottom))
}, CLASS_NAME: "OpenLayers.Layer.XYZ"});
OpenLayers.Layer.OSM = OpenLayers.Class(OpenLayers.Layer.XYZ, {name: "OpenStreetMap", url: ["http://a.tile.openstreetmap.org/${z}/${x}/${y}.png", "http://b.tile.openstreetmap.org/${z}/${x}/${y}.png", "http://c.tile.openstreetmap.org/${z}/${x}/${y}.png"], attribution: "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors", sphericalMercator: !0, wrapDateLine: !0, tileOptions: null, initialize: function (a, b, c) {
    OpenLayers.Layer.XYZ.prototype.initialize.apply(this, arguments);
    this.tileOptions =
        OpenLayers.Util.extend({crossOriginKeyword: "anonymous"}, this.options && this.options.tileOptions)
}, clone: function (a) {
    null == a && (a = new OpenLayers.Layer.OSM(this.name, this.url, this.getOptions()));
    return a = OpenLayers.Layer.XYZ.prototype.clone.apply(this, [a])
}, CLASS_NAME: "OpenLayers.Layer.OSM"});
OpenLayers.Layer.Bing = OpenLayers.Class(OpenLayers.Layer.XYZ, {key: null, serverResolutions: [156543.03390625, 78271.516953125, 39135.7584765625, 19567.87923828125, 9783.939619140625, 4891.9698095703125, 2445.9849047851562, 1222.9924523925781, 611.4962261962891, 305.74811309814453, 152.87405654907226, 76.43702827453613, 38.218514137268066, 19.109257068634033, 9.554628534317017, 4.777314267158508, 2.388657133579254, 1.194328566789627, 0.5971642833948135, 0.29858214169740677, 0.14929107084870338, 0.07464553542435169], attributionTemplate: '<span class="olBingAttribution ${type}"><div><a target="_blank" href="http://www.bing.com/maps/"><img src="${logo}" /></a></div>${copyrights}<a style="white-space: nowrap" target="_blank" href="http://www.microsoft.com/maps/product/terms.html">Terms of Use</a></span>',
    metadata: null, protocolRegex: /^http:/i, type: "Road", culture: "en-US", metadataParams: null, tileOptions: null, protocol: ~window.location.href.indexOf("http") ? "" : "http:", initialize: function (a) {
        a = OpenLayers.Util.applyDefaults({sphericalMercator: !0}, a);
        OpenLayers.Layer.XYZ.prototype.initialize.apply(this, [a.name || "Bing " + (a.type || this.type), null, a]);
        this.tileOptions = OpenLayers.Util.extend({crossOriginKeyword: "anonymous"}, this.options.tileOptions);
        this.loadMetadata()
    }, loadMetadata: function () {
        this._callbackId =
            "_callback_" + this.id.replace(/\./g, "_");
        window[this._callbackId] = OpenLayers.Function.bind(OpenLayers.Layer.Bing.processMetadata, this);
        var a = OpenLayers.Util.applyDefaults({key: this.key, jsonp: this._callbackId, include: "ImageryProviders"}, this.metadataParams), a = this.protocol + "//dev.virtualearth.net/REST/v1/Imagery/Metadata/" + this.type + "?" + OpenLayers.Util.getParameterString(a), b = document.createElement("script");
        b.type = "text/javascript";
        b.src = a;
        b.id = this._callbackId;
        document.getElementsByTagName("head")[0].appendChild(b)
    },
    initLayer: function () {
        var a = this.metadata.resourceSets[0].resources[0], b = a.imageUrl.replace("{quadkey}", "${quadkey}"), b = b.replace("{culture}", this.culture), b = b.replace(this.protocolRegex, this.protocol);
        this.url = [];
        for (var c = 0; c < a.imageUrlSubdomains.length; ++c)this.url.push(b.replace("{subdomain}", a.imageUrlSubdomains[c]));
        this.addOptions({maxResolution: Math.min(this.serverResolutions[a.zoomMin], this.maxResolution || Number.POSITIVE_INFINITY), numZoomLevels: Math.min(a.zoomMax + 1 - a.zoomMin, this.numZoomLevels)},
            !0);
        this.isBaseLayer || this.redraw();
        this.updateAttribution()
    }, getURL: function (a) {
        if (this.url) {
            var b = this.getXYZ(a);
            a = b.x;
            for (var c = b.y, b = b.z, d = [], e = b; 0 < e; --e) {
                var f = "0", g = 1 << e - 1;
                0 != (a & g) && f++;
                0 != (c & g) && (f++, f++);
                d.push(f)
            }
            d = d.join("");
            a = this.selectUrl("" + a + c + b, this.url);
            return OpenLayers.String.format(a, {quadkey: d})
        }
    }, updateAttribution: function () {
        var a = this.metadata;
        if (a.resourceSets && this.map && this.map.center) {
            var b = a.resourceSets[0].resources[0], c = this.map.getExtent().transform(this.map.getProjectionObject(),
                new OpenLayers.Projection("EPSG:4326")), d = b.imageryProviders || [], e = OpenLayers.Util.indexOf(this.serverResolutions, this.getServerResolution()), b = "", f, g, h, k, l, m, r;
            g = 0;
            for (h = d.length; g < h; ++g)for (f = d[g], k = 0, l = f.coverageAreas.length; k < l; ++k)r = f.coverageAreas[k], m = OpenLayers.Bounds.fromArray(r.bbox, !0), c.intersectsBounds(m) && (e <= r.zoomMax && e >= r.zoomMin) && (b += f.attribution + " ");
            a = a.brandLogoUri.replace(this.protocolRegex, this.protocol);
            this.attribution = OpenLayers.String.format(this.attributionTemplate, {type: this.type.toLowerCase(),
                logo: a, copyrights: b});
            this.map && this.map.events.triggerEvent("changelayer", {layer: this, property: "attribution"})
        }
    }, setMap: function () {
        OpenLayers.Layer.XYZ.prototype.setMap.apply(this, arguments);
        this.map.events.register("moveend", this, this.updateAttribution)
    }, clone: function (a) {
        null == a && (a = new OpenLayers.Layer.Bing(this.options));
        return a = OpenLayers.Layer.XYZ.prototype.clone.apply(this, [a])
    }, destroy: function () {
        this.map && this.map.events.unregister("moveend", this, this.updateAttribution);
        OpenLayers.Layer.XYZ.prototype.destroy.apply(this,
            arguments)
    }, CLASS_NAME: "OpenLayers.Layer.Bing"});
OpenLayers.Layer.Bing.processMetadata = function (a) {
    this.metadata = a;
    this.initLayer();
    a = document.getElementById(this._callbackId);
    a.parentNode.removeChild(a);
    window[this._callbackId] = void 0;
    delete this._callbackId
};
OpenLayers.Handler = OpenLayers.Class({id: null, control: null, map: null, keyMask: null, active: !1, evt: null, touch: !1, initialize: function (a, b, c) {
    OpenLayers.Util.extend(this, c);
    this.control = a;
    this.callbacks = b;
    (a = this.map || a.map) && this.setMap(a);
    this.id = OpenLayers.Util.createUniqueID(this.CLASS_NAME + "_")
}, setMap: function (a) {
    this.map = a
}, checkModifiers: function (a) {
    return null == this.keyMask ? !0 : ((a.shiftKey ? OpenLayers.Handler.MOD_SHIFT : 0) | (a.ctrlKey ? OpenLayers.Handler.MOD_CTRL : 0) | (a.altKey ? OpenLayers.Handler.MOD_ALT :
        0) | (a.metaKey ? OpenLayers.Handler.MOD_META : 0)) == this.keyMask
}, activate: function () {
    if (this.active)return!1;
    for (var a = OpenLayers.Events.prototype.BROWSER_EVENTS, b = 0, c = a.length; b < c; b++)this[a[b]] && this.register(a[b], this[a[b]]);
    return this.active = !0
}, deactivate: function () {
    if (!this.active)return!1;
    for (var a = OpenLayers.Events.prototype.BROWSER_EVENTS, b = 0, c = a.length; b < c; b++)this[a[b]] && this.unregister(a[b], this[a[b]]);
    this.active = this.touch = !1;
    return!0
}, startTouch: function () {
    if (!this.touch) {
        this.touch = !0;
        for (var a = "mousedown mouseup mousemove click dblclick mouseout".split(" "), b = 0, c = a.length; b < c; b++)this[a[b]] && this.unregister(a[b], this[a[b]])
    }
}, callback: function (a, b) {
    a && this.callbacks[a] && this.callbacks[a].apply(this.control, b)
}, register: function (a, b) {
    this.map.events.registerPriority(a, this, b);
    this.map.events.registerPriority(a, this, this.setEvent)
}, unregister: function (a, b) {
    this.map.events.unregister(a, this, b);
    this.map.events.unregister(a, this, this.setEvent)
}, setEvent: function (a) {
    this.evt = a;
    return!0
},
    destroy: function () {
        this.deactivate();
        this.control = this.map = null
    }, CLASS_NAME: "OpenLayers.Handler"});
OpenLayers.Handler.MOD_NONE = 0;
OpenLayers.Handler.MOD_SHIFT = 1;
OpenLayers.Handler.MOD_CTRL = 2;
OpenLayers.Handler.MOD_ALT = 4;
OpenLayers.Handler.MOD_META = 8;
OpenLayers.Handler.MouseWheel = OpenLayers.Class(OpenLayers.Handler, {wheelListener: null, interval: 0, maxDelta: Number.POSITIVE_INFINITY, delta: 0, cumulative: !0, initialize: function (a, b, c) {
    OpenLayers.Handler.prototype.initialize.apply(this, arguments);
    this.wheelListener = OpenLayers.Function.bindAsEventListener(this.onWheelEvent, this)
}, destroy: function () {
    OpenLayers.Handler.prototype.destroy.apply(this, arguments);
    this.wheelListener = null
}, onWheelEvent: function (a) {
    if (this.map && this.checkModifiers(a)) {
        for (var b =
            !1, c = !1, d = !1, e = OpenLayers.Event.element(a); null != e && !d && !b;) {
            if (!b)try {
                var f, b = (f = e.currentStyle ? e.currentStyle.overflow : document.defaultView.getComputedStyle(e, null).getPropertyValue("overflow")) && "auto" == f || "scroll" == f
            } catch (g) {
            }
            if (!c && (c = OpenLayers.Element.hasClass(e, "olScrollable"), !c))for (var d = 0, h = this.map.layers.length; d < h; d++) {
                var k = this.map.layers[d];
                if (e == k.div || e == k.pane) {
                    c = !0;
                    break
                }
            }
            d = e == this.map.div;
            e = e.parentNode
        }
        if (!b && d) {
            if (c)if (b = 0, a.wheelDelta ? (b = a.wheelDelta, 0 === b % 160 && (b *= 0.75),
                b /= 120) : a.detail && (b = -(a.detail / Math.abs(a.detail))), this.delta += b, window.clearTimeout(this._timeoutId), this.interval && Math.abs(this.delta) < this.maxDelta) {
                var l = OpenLayers.Util.extend({}, a);
                this._timeoutId = window.setTimeout(OpenLayers.Function.bind(function () {
                    this.wheelZoom(l)
                }, this), this.interval)
            } else this.wheelZoom(a);
            OpenLayers.Event.stop(a)
        }
    }
}, wheelZoom: function (a) {
    var b = this.delta;
    this.delta = 0;
    b && (a.xy = this.map.events.getMousePosition(a), 0 > b ? this.callback("down", [a, this.cumulative ? Math.max(-this.maxDelta,
        b) : -1]) : this.callback("up", [a, this.cumulative ? Math.min(this.maxDelta, b) : 1]))
}, activate: function (a) {
    if (OpenLayers.Handler.prototype.activate.apply(this, arguments)) {
        var b = this.wheelListener;
        OpenLayers.Event.observe(window, "DOMMouseScroll", b);
        OpenLayers.Event.observe(window, "mousewheel", b);
        OpenLayers.Event.observe(document, "mousewheel", b);
        return!0
    }
    return!1
}, deactivate: function (a) {
    if (OpenLayers.Handler.prototype.deactivate.apply(this, arguments)) {
        var b = this.wheelListener;
        OpenLayers.Event.stopObserving(window,
            "DOMMouseScroll", b);
        OpenLayers.Event.stopObserving(window, "mousewheel", b);
        OpenLayers.Event.stopObserving(document, "mousewheel", b);
        return!0
    }
    return!1
}, CLASS_NAME: "OpenLayers.Handler.MouseWheel"});
OpenLayers.Geometry.MultiLineString = OpenLayers.Class(OpenLayers.Geometry.Collection, {componentTypes: ["OpenLayers.Geometry.LineString"], split: function (a, b) {
    for (var c = null, d = b && b.mutual, e, f, g, h, k = [], l = [a], m = 0, r = this.components.length; m < r; ++m) {
        f = this.components[m];
        g = !1;
        for (var p = 0; p < l.length; ++p)if (e = f.split(l[p], b)) {
            if (d) {
                g = e[0];
                for (var n = 0, q = g.length; n < q; ++n)0 === n && k.length ? k[k.length - 1].addComponent(g[n]) : k.push(new OpenLayers.Geometry.MultiLineString([g[n]]));
                g = !0;
                e = e[1]
            }
            if (e.length) {
                e.unshift(p,
                    1);
                Array.prototype.splice.apply(l, e);
                break
            }
        }
        g || (k.length ? k[k.length - 1].addComponent(f.clone()) : k = [new OpenLayers.Geometry.MultiLineString(f.clone())])
    }
    k && 1 < k.length ? g = !0 : k = [];
    l && 1 < l.length ? h = !0 : l = [];
    if (g || h)c = d ? [k, l] : l;
    return c
}, splitWith: function (a, b) {
    var c = null, d = b && b.mutual, e, f, g, h, k, l;
    if (a instanceof OpenLayers.Geometry.LineString) {
        l = [];
        k = [a];
        for (var m = 0, r = this.components.length; m < r; ++m) {
            g = !1;
            f = this.components[m];
            for (var p = 0; p < k.length; ++p)if (e = k[p].split(f, b)) {
                d && (g = e[0], g.length && (g.unshift(p,
                    1), Array.prototype.splice.apply(k, g), p += g.length - 2), e = e[1], 0 === e.length && (e = [f.clone()]));
                g = 0;
                for (var n = e.length; g < n; ++g)0 === g && l.length ? l[l.length - 1].addComponent(e[g]) : l.push(new OpenLayers.Geometry.MultiLineString([e[g]]));
                g = !0
            }
            g || (l.length ? l[l.length - 1].addComponent(f.clone()) : l = [new OpenLayers.Geometry.MultiLineString([f.clone()])])
        }
    } else c = a.split(this);
    k && 1 < k.length ? h = !0 : k = [];
    l && 1 < l.length ? g = !0 : l = [];
    if (h || g)c = d ? [k, l] : l;
    return c
}, CLASS_NAME: "OpenLayers.Geometry.MultiLineString"});
OpenLayers.Renderer = OpenLayers.Class({container: null, root: null, extent: null, locked: !1, size: null, resolution: null, map: null, featureDx: 0, initialize: function (a, b) {
    this.container = OpenLayers.Util.getElement(a);
    OpenLayers.Util.extend(this, b)
}, destroy: function () {
    this.map = this.resolution = this.size = this.extent = this.container = null
}, supported: function () {
    return!1
}, setExtent: function (a, b) {
    this.extent = a.clone();
    if (this.map.baseLayer && this.map.baseLayer.wrapDateLine) {
        var c = a.getWidth() / this.map.getExtent().getWidth();
        a = a.scale(1 / c);
        this.extent = a.wrapDateLine(this.map.getMaxExtent()).scale(c)
    }
    b && (this.resolution = null);
    return!0
}, setSize: function (a) {
    this.size = a.clone();
    this.resolution = null
}, getResolution: function () {
    return this.resolution = this.resolution || this.map.getResolution()
}, drawFeature: function (a, b) {
    null == b && (b = a.style);
    if (a.geometry) {
        var c = a.geometry.getBounds();
        if (c) {
            var d;
            this.map.baseLayer && this.map.baseLayer.wrapDateLine && (d = this.map.getMaxExtent());
            c.intersectsBounds(this.extent, {worldBounds: d}) ? this.calculateFeatureDx(c,
                d) : b = {display: "none"};
            c = this.drawGeometry(a.geometry, b, a.id);
            if ("none" != b.display && b.label && !1 !== c) {
                d = a.geometry.getCentroid();
                if (b.labelXOffset || b.labelYOffset) {
                    var e = isNaN(b.labelXOffset) ? 0 : b.labelXOffset, f = isNaN(b.labelYOffset) ? 0 : b.labelYOffset, g = this.getResolution();
                    d.move(e * g, f * g)
                }
                this.drawText(a.id, b, d)
            } else this.removeText(a.id);
            return c
        }
    }
}, calculateFeatureDx: function (a, b) {
    this.featureDx = 0;
    if (b) {
        var c = b.getWidth();
        this.featureDx = Math.round(((a.left + a.right) / 2 - (this.extent.left + this.extent.right) /
            2) / c) * c
    }
}, drawGeometry: function (a, b, c) {
}, drawText: function (a, b, c) {
}, removeText: function (a) {
}, clear: function () {
}, getFeatureIdFromEvent: function (a) {
}, eraseFeatures: function (a) {
    OpenLayers.Util.isArray(a) || (a = [a]);
    for (var b = 0, c = a.length; b < c; ++b) {
        var d = a[b];
        this.eraseGeometry(d.geometry, d.id);
        this.removeText(d.id)
    }
}, eraseGeometry: function (a, b) {
}, moveRoot: function (a) {
}, getRenderLayerId: function () {
    return this.container.id
}, applyDefaultSymbolizer: function (a) {
    var b = OpenLayers.Util.extend({}, OpenLayers.Renderer.defaultSymbolizer);
    !1 === a.stroke && (delete b.strokeWidth, delete b.strokeColor);
    !1 === a.fill && delete b.fillColor;
    OpenLayers.Util.extend(b, a);
    return b
}, CLASS_NAME: "OpenLayers.Renderer"});
OpenLayers.Renderer.defaultSymbolizer = {fillColor: "#000000", strokeColor: "#000000", strokeWidth: 2, fillOpacity: 1, strokeOpacity: 1, pointRadius: 0, labelAlign: "cm"};
OpenLayers.Renderer.symbol = {star: [350, 75, 379, 161, 469, 161, 397, 215, 423, 301, 350, 250, 277, 301, 303, 215, 231, 161, 321, 161, 350, 75], cross: [4, 0, 6, 0, 6, 4, 10, 4, 10, 6, 6, 6, 6, 10, 4, 10, 4, 6, 0, 6, 0, 4, 4, 4, 4, 0], x: [0, 0, 25, 0, 50, 35, 75, 0, 100, 0, 65, 50, 100, 100, 75, 100, 50, 65, 25, 100, 0, 100, 35, 50, 0, 0], square: [0, 0, 0, 1, 1, 1, 1, 0, 0, 0], triangle: [0, 10, 10, 10, 5, 0, 0, 10]};
OpenLayers.ElementsIndexer = OpenLayers.Class({maxZIndex: null, order: null, indices: null, compare: null, initialize: function (a) {
    this.compare = a ? OpenLayers.ElementsIndexer.IndexingMethods.Z_ORDER_Y_ORDER : OpenLayers.ElementsIndexer.IndexingMethods.Z_ORDER_DRAWING_ORDER;
    this.clear()
}, insert: function (a) {
    this.exists(a) && this.remove(a);
    var b = a.id;
    this.determineZIndex(a);
    for (var c = -1, d = this.order.length, e; 1 < d - c;)e = parseInt((c + d) / 2), 0 < this.compare(this, a, OpenLayers.Util.getElement(this.order[e])) ? c = e : d = e;
    this.order.splice(d,
        0, b);
    this.indices[b] = this.getZIndex(a);
    return this.getNextElement(d)
}, remove: function (a) {
    a = a.id;
    var b = OpenLayers.Util.indexOf(this.order, a);
    0 <= b && (this.order.splice(b, 1), delete this.indices[a], this.maxZIndex = 0 < this.order.length ? this.indices[this.order[this.order.length - 1]] : 0)
}, clear: function () {
    this.order = [];
    this.indices = {};
    this.maxZIndex = 0
}, exists: function (a) {
    return null != this.indices[a.id]
}, getZIndex: function (a) {
    return a._style.graphicZIndex
}, determineZIndex: function (a) {
    var b = a._style.graphicZIndex;
    null == b ? (b = this.maxZIndex, a._style.graphicZIndex = b) : b > this.maxZIndex && (this.maxZIndex = b)
}, getNextElement: function (a) {
    a += 1;
    if (a < this.order.length) {
        var b = OpenLayers.Util.getElement(this.order[a]);
        void 0 == b && (b = this.getNextElement(a));
        return b
    }
    return null
}, CLASS_NAME: "OpenLayers.ElementsIndexer"});
OpenLayers.ElementsIndexer.IndexingMethods = {Z_ORDER: function (a, b, c) {
    b = a.getZIndex(b);
    var d = 0;
    c && (a = a.getZIndex(c), d = b - a);
    return d
}, Z_ORDER_DRAWING_ORDER: function (a, b, c) {
    a = OpenLayers.ElementsIndexer.IndexingMethods.Z_ORDER(a, b, c);
    c && 0 == a && (a = 1);
    return a
}, Z_ORDER_Y_ORDER: function (a, b, c) {
    a = OpenLayers.ElementsIndexer.IndexingMethods.Z_ORDER(a, b, c);
    c && 0 === a && (b = c._boundsBottom - b._boundsBottom, a = 0 === b ? 1 : b);
    return a
}};
OpenLayers.Renderer.Elements = OpenLayers.Class(OpenLayers.Renderer, {rendererRoot: null, root: null, vectorRoot: null, textRoot: null, xmlns: null, xOffset: 0, indexer: null, BACKGROUND_ID_SUFFIX: "_background", LABEL_ID_SUFFIX: "_label", LABEL_OUTLINE_SUFFIX: "_outline", initialize: function (a, b) {
    OpenLayers.Renderer.prototype.initialize.apply(this, arguments);
    this.rendererRoot = this.createRenderRoot();
    this.root = this.createRoot("_root");
    this.vectorRoot = this.createRoot("_vroot");
    this.textRoot = this.createRoot("_troot");
    this.root.appendChild(this.vectorRoot);
    this.root.appendChild(this.textRoot);
    this.rendererRoot.appendChild(this.root);
    this.container.appendChild(this.rendererRoot);
    b && (b.zIndexing || b.yOrdering) && (this.indexer = new OpenLayers.ElementsIndexer(b.yOrdering))
}, destroy: function () {
    this.clear();
    this.xmlns = this.root = this.rendererRoot = null;
    OpenLayers.Renderer.prototype.destroy.apply(this, arguments)
}, clear: function () {
    var a, b = this.vectorRoot;
    if (b)for (; a = b.firstChild;)b.removeChild(a);
    if (b = this.textRoot)for (; a = b.firstChild;)b.removeChild(a);
    this.indexer &&
    this.indexer.clear()
}, setExtent: function (a, b) {
    var c = OpenLayers.Renderer.prototype.setExtent.apply(this, arguments), d = this.getResolution();
    if (this.map.baseLayer && this.map.baseLayer.wrapDateLine) {
        var e, f = a.getWidth() / this.map.getExtent().getWidth();
        a = a.scale(1 / f);
        f = this.map.getMaxExtent();
        f.right > a.left && f.right < a.right ? e = !0 : f.left > a.left && f.left < a.right && (e = !1);
        if (e !== this.rightOfDateLine || b)c = !1, this.xOffset = !0 === e ? f.getWidth() / d : 0;
        this.rightOfDateLine = e
    }
    return c
}, getNodeType: function (a, b) {
}, drawGeometry: function (a, b, c) {
    var d = a.CLASS_NAME, e = !0;
    if ("OpenLayers.Geometry.Collection" == d || "OpenLayers.Geometry.MultiPoint" == d || "OpenLayers.Geometry.MultiLineString" == d || "OpenLayers.Geometry.MultiPolygon" == d) {
        for (var d = 0, f = a.components.length; d < f; d++)e = this.drawGeometry(a.components[d], b, c) && e;
        return e
    }
    d = e = !1;
    "none" != b.display && (b.backgroundGraphic ? this.redrawBackgroundNode(a.id, a, b, c) : d = !0, e = this.redrawNode(a.id, a, b, c));
    !1 == e && (b = document.getElementById(a.id)) && (b._style.backgroundGraphic && (d = !0), b.parentNode.removeChild(b));
    d && (b = document.getElementById(a.id + this.BACKGROUND_ID_SUFFIX)) && b.parentNode.removeChild(b);
    return e
}, redrawNode: function (a, b, c, d) {
    c = this.applyDefaultSymbolizer(c);
    a = this.nodeFactory(a, this.getNodeType(b, c));
    a._featureId = d;
    a._boundsBottom = b.getBounds().bottom;
    a._geometryClass = b.CLASS_NAME;
    a._style = c;
    b = this.drawGeometryNode(a, b, c);
    if (!1 === b)return!1;
    a = b.node;
    this.indexer ? (c = this.indexer.insert(a)) ? this.vectorRoot.insertBefore(a, c) : this.vectorRoot.appendChild(a) : a.parentNode !== this.vectorRoot && this.vectorRoot.appendChild(a);
    this.postDraw(a);
    return b.complete
}, redrawBackgroundNode: function (a, b, c, d) {
    c = OpenLayers.Util.extend({}, c);
    c.externalGraphic = c.backgroundGraphic;
    c.graphicXOffset = c.backgroundXOffset;
    c.graphicYOffset = c.backgroundYOffset;
    c.graphicZIndex = c.backgroundGraphicZIndex;
    c.graphicWidth = c.backgroundWidth || c.graphicWidth;
    c.graphicHeight = c.backgroundHeight || c.graphicHeight;
    c.backgroundGraphic = null;
    c.backgroundXOffset = null;
    c.backgroundYOffset = null;
    c.backgroundGraphicZIndex = null;
    return this.redrawNode(a + this.BACKGROUND_ID_SUFFIX,
        b, c, null)
}, drawGeometryNode: function (a, b, c) {
    c = c || a._style;
    var d = {isFilled: void 0 === c.fill ? !0 : c.fill, isStroked: void 0 === c.stroke ? !!c.strokeWidth : c.stroke}, e;
    switch (b.CLASS_NAME) {
        case "OpenLayers.Geometry.Point":
            !1 === c.graphic && (d.isFilled = !1, d.isStroked = !1);
            e = this.drawPoint(a, b);
            break;
        case "OpenLayers.Geometry.LineString":
            d.isFilled = !1;
            e = this.drawLineString(a, b);
            break;
        case "OpenLayers.Geometry.LinearRing":
            e = this.drawLinearRing(a, b);
            break;
        case "OpenLayers.Geometry.Polygon":
            e = this.drawPolygon(a, b);
            break;
        case "OpenLayers.Geometry.Rectangle":
            e = this.drawRectangle(a, b)
    }
    a._options = d;
    return!1 != e ? {node: this.setStyle(a, c, d, b), complete: e} : !1
}, postDraw: function (a) {
}, drawPoint: function (a, b) {
}, drawLineString: function (a, b) {
}, drawLinearRing: function (a, b) {
}, drawPolygon: function (a, b) {
}, drawRectangle: function (a, b) {
}, drawCircle: function (a, b) {
}, removeText: function (a) {
    var b = document.getElementById(a + this.LABEL_ID_SUFFIX);
    b && this.textRoot.removeChild(b);
    (a = document.getElementById(a + this.LABEL_OUTLINE_SUFFIX)) && this.textRoot.removeChild(a)
},
    getFeatureIdFromEvent: function (a) {
        var b = a.target, c = b && b.correspondingUseElement;
        return(c ? c : b || a.srcElement)._featureId
    }, eraseGeometry: function (a, b) {
        if ("OpenLayers.Geometry.MultiPoint" == a.CLASS_NAME || "OpenLayers.Geometry.MultiLineString" == a.CLASS_NAME || "OpenLayers.Geometry.MultiPolygon" == a.CLASS_NAME || "OpenLayers.Geometry.Collection" == a.CLASS_NAME)for (var c = 0, d = a.components.length; c < d; c++)this.eraseGeometry(a.components[c], b); else(c = OpenLayers.Util.getElement(a.id)) && c.parentNode && (c.geometry && (c.geometry.destroy(),
            c.geometry = null), c.parentNode.removeChild(c), this.indexer && this.indexer.remove(c), c._style.backgroundGraphic && (c = OpenLayers.Util.getElement(a.id + this.BACKGROUND_ID_SUFFIX)) && c.parentNode && c.parentNode.removeChild(c))
    }, nodeFactory: function (a, b) {
        var c = OpenLayers.Util.getElement(a);
        c ? this.nodeTypeCompare(c, b) || (c.parentNode.removeChild(c), c = this.nodeFactory(a, b)) : c = this.createNode(b, a);
        return c
    }, nodeTypeCompare: function (a, b) {
    }, createNode: function (a, b) {
    }, moveRoot: function (a) {
        var b = this.root;
        a.root.parentNode ==
            this.rendererRoot && (b = a.root);
        b.parentNode.removeChild(b);
        a.rendererRoot.appendChild(b)
    }, getRenderLayerId: function () {
        return this.root.parentNode.parentNode.id
    }, isComplexSymbol: function (a) {
        return"circle" != a && !!a
    }, CLASS_NAME: "OpenLayers.Renderer.Elements"});
OpenLayers.Control = OpenLayers.Class({id: null, map: null, div: null, type: null, allowSelection: !1, displayClass: "", title: "", autoActivate: !1, active: null, handlerOptions: null, handler: null, eventListeners: null, events: null, initialize: function (a) {
    this.displayClass = this.CLASS_NAME.replace("OpenLayers.", "ol").replace(/\./g, "");
    OpenLayers.Util.extend(this, a);
    this.events = new OpenLayers.Events(this);
    if (this.eventListeners instanceof Object)this.events.on(this.eventListeners);
    null == this.id && (this.id = OpenLayers.Util.createUniqueID(this.CLASS_NAME +
        "_"))
}, destroy: function () {
    this.events && (this.eventListeners && this.events.un(this.eventListeners), this.events.destroy(), this.events = null);
    this.eventListeners = null;
    this.handler && (this.handler.destroy(), this.handler = null);
    if (this.handlers) {
        for (var a in this.handlers)this.handlers.hasOwnProperty(a) && "function" == typeof this.handlers[a].destroy && this.handlers[a].destroy();
        this.handlers = null
    }
    this.map && (this.map.removeControl(this), this.map = null);
    this.div = null
}, setMap: function (a) {
    this.map = a;
    this.handler &&
    this.handler.setMap(a)
}, draw: function (a) {
    null == this.div && (this.div = OpenLayers.Util.createDiv(this.id), this.div.className = this.displayClass, this.allowSelection || (this.div.className += " olControlNoSelect", this.div.setAttribute("unselectable", "on", 0), this.div.onselectstart = OpenLayers.Function.False), "" != this.title && (this.div.title = this.title));
    null != a && (this.position = a.clone());
    this.moveTo(this.position);
    return this.div
}, moveTo: function (a) {
    null != a && null != this.div && (this.div.style.left = a.x + "px", this.div.style.top =
        a.y + "px")
}, activate: function () {
    if (this.active)return!1;
    this.handler && this.handler.activate();
    this.active = !0;
    this.map && OpenLayers.Element.addClass(this.map.viewPortDiv, this.displayClass.replace(/ /g, "") + "Active");
    this.events.triggerEvent("activate");
    return!0
}, deactivate: function () {
    return this.active ? (this.handler && this.handler.deactivate(), this.active = !1, this.map && OpenLayers.Element.removeClass(this.map.viewPortDiv, this.displayClass.replace(/ /g, "") + "Active"), this.events.triggerEvent("deactivate"),
        !0) : !1
}, CLASS_NAME: "OpenLayers.Control"});
OpenLayers.Control.TYPE_BUTTON = 1;
OpenLayers.Control.TYPE_TOGGLE = 2;
OpenLayers.Control.TYPE_TOOL = 3;
OpenLayers.Control.Panel = OpenLayers.Class(OpenLayers.Control, {controls: null, autoActivate: !0, defaultControl: null, saveState: !1, allowDepress: !1, activeState: null, initialize: function (a) {
    OpenLayers.Control.prototype.initialize.apply(this, [a]);
    this.controls = [];
    this.activeState = {}
}, destroy: function () {
    this.map && this.map.events.unregister("buttonclick", this, this.onButtonClick);
    OpenLayers.Control.prototype.destroy.apply(this, arguments);
    for (var a, b = this.controls.length - 1; 0 <= b; b--)a = this.controls[b], a.events &&
        a.events.un({activate: this.iconOn, deactivate: this.iconOff}), a.panel_div = null;
    this.activeState = null
}, activate: function () {
    if (OpenLayers.Control.prototype.activate.apply(this, arguments)) {
        for (var a, b = 0, c = this.controls.length; b < c; b++)a = this.controls[b], (a === this.defaultControl || this.saveState && this.activeState[a.id]) && a.activate();
        !0 === this.saveState && (this.defaultControl = null);
        this.redraw();
        return!0
    }
    return!1
}, deactivate: function () {
    if (OpenLayers.Control.prototype.deactivate.apply(this, arguments)) {
        for (var a,
                 b = 0, c = this.controls.length; b < c; b++)a = this.controls[b], this.activeState[a.id] = a.deactivate();
        this.redraw();
        return!0
    }
    return!1
}, draw: function () {
    OpenLayers.Control.prototype.draw.apply(this, arguments);
    this.outsideViewport ? (this.events.attachToElement(this.div), this.events.register("buttonclick", this, this.onButtonClick)) : this.map.events.register("buttonclick", this, this.onButtonClick);
    this.addControlsToMap(this.controls);
    return this.div
}, redraw: function () {
    for (var a = this.div.childNodes.length - 1; 0 <= a; a--)this.div.removeChild(this.div.childNodes[a]);
    this.div.innerHTML = "";
    if (this.active)for (var a = 0, b = this.controls.length; a < b; a++)this.div.appendChild(this.controls[a].panel_div)
}, activateControl: function (a) {
    if (!this.active)return!1;
    if (a.type == OpenLayers.Control.TYPE_BUTTON)a.trigger(); else if (a.type == OpenLayers.Control.TYPE_TOGGLE)a.active ? a.deactivate() : a.activate(); else if (this.allowDepress && a.active)a.deactivate(); else {
        for (var b, c = 0, d = this.controls.length; c < d; c++)b = this.controls[c], b == a || b.type !== OpenLayers.Control.TYPE_TOOL && null != b.type || b.deactivate();
        a.activate()
    }
}, addControls: function (a) {
    OpenLayers.Util.isArray(a) || (a = [a]);
    this.controls = this.controls.concat(a);
    for (var b = 0, c = a.length; b < c; b++) {
        var d = a[b], e = this.createControlMarkup(d);
        OpenLayers.Element.addClass(e, d.displayClass + "ItemInactive");
        OpenLayers.Element.addClass(e, "olButton");
        "" == d.title || e.title || (e.title = d.title);
        d.panel_div = e
    }
    this.map && (this.addControlsToMap(a), this.redraw())
}, createControlMarkup: function (a) {
    return document.createElement("div")
}, addControlsToMap: function (a) {
    for (var b,
             c = 0, d = a.length; c < d; c++)b = a[c], !0 === b.autoActivate ? (b.autoActivate = !1, this.map.addControl(b), b.autoActivate = !0) : (this.map.addControl(b), b.deactivate()), b.events.on({activate: this.iconOn, deactivate: this.iconOff})
}, iconOn: function () {
    var a = this.panel_div;
    a.className = a.className.replace(RegExp("\\b(" + this.displayClass + "Item)Inactive\\b"), "$1Active")
}, iconOff: function () {
    var a = this.panel_div;
    a.className = a.className.replace(RegExp("\\b(" + this.displayClass + "Item)Active\\b"), "$1Inactive")
}, onButtonClick: function (a) {
    var b =
        this.controls;
    a = a.buttonElement;
    for (var c = b.length - 1; 0 <= c; --c)if (b[c].panel_div === a) {
        this.activateControl(b[c]);
        break
    }
}, getControlsBy: function (a, b) {
    var c = "function" == typeof b.test;
    return OpenLayers.Array.filter(this.controls, function (d) {
        return d[a] == b || c && b.test(d[a])
    })
}, getControlsByName: function (a) {
    return this.getControlsBy("name", a)
}, getControlsByClass: function (a) {
    return this.getControlsBy("CLASS_NAME", a)
}, CLASS_NAME: "OpenLayers.Control.Panel"});
OpenLayers.Strategy = OpenLayers.Class({layer: null, options: null, active: null, autoActivate: !0, autoDestroy: !0, initialize: function (a) {
    OpenLayers.Util.extend(this, a);
    this.options = a;
    this.active = !1
}, destroy: function () {
    this.deactivate();
    this.options = this.layer = null
}, setLayer: function (a) {
    this.layer = a
}, activate: function () {
    return this.active ? !1 : this.active = !0
}, deactivate: function () {
    return this.active ? (this.active = !1, !0) : !1
}, CLASS_NAME: "OpenLayers.Strategy"});
OpenLayers.Strategy.Fixed = OpenLayers.Class(OpenLayers.Strategy, {preload: !1, activate: function () {
    var a = OpenLayers.Strategy.prototype.activate.apply(this, arguments);
    if (a)if (this.layer.events.on({refresh: this.load, scope: this}), !0 == this.layer.visibility || this.preload)this.load(); else this.layer.events.on({visibilitychanged: this.load, scope: this});
    return a
}, deactivate: function () {
    var a = OpenLayers.Strategy.prototype.deactivate.call(this);
    a && this.layer.events.un({refresh: this.load, visibilitychanged: this.load,
        scope: this});
    return a
}, load: function (a) {
    var b = this.layer;
    b.events.triggerEvent("loadstart", {filter: b.filter});
    b.protocol.read(OpenLayers.Util.applyDefaults({callback: this.merge, filter: b.filter, scope: this}, a));
    b.events.un({visibilitychanged: this.load, scope: this})
}, merge: function (a) {
    var b = this.layer;
    b.destroyFeatures();
    var c = a.features;
    if (c && 0 < c.length) {
        var d = b.projection, e = b.map.getProjectionObject();
        if (!e.equals(d))for (var f, g = 0, h = c.length; g < h; ++g)(f = c[g].geometry) && f.transform(d, e);
        b.addFeatures(c)
    }
    b.events.triggerEvent("loadend",
        {response: a})
}, CLASS_NAME: "OpenLayers.Strategy.Fixed"});
OpenLayers.Control.Zoom = OpenLayers.Class(OpenLayers.Control, {zoomInText: "+", zoomInId: "olZoomInLink", zoomOutText: "\u2212", zoomOutId: "olZoomOutLink", draw: function () {
    var a = OpenLayers.Control.prototype.draw.apply(this), b = this.getOrCreateLinks(a), c = b.zoomIn, b = b.zoomOut, d = this.map.events;
    b.parentNode !== a && (d = this.events, d.attachToElement(b.parentNode));
    d.register("buttonclick", this, this.onZoomClick);
    this.zoomInLink = c;
    this.zoomOutLink = b;
    return a
}, getOrCreateLinks: function (a) {
    var b = document.getElementById(this.zoomInId),
        c = document.getElementById(this.zoomOutId);
    b || (b = document.createElement("a"), b.href = "#zoomIn", b.appendChild(document.createTextNode(this.zoomInText)), b.className = "olControlZoomIn", a.appendChild(b));
    OpenLayers.Element.addClass(b, "olButton");
    c || (c = document.createElement("a"), c.href = "#zoomOut", c.appendChild(document.createTextNode(this.zoomOutText)), c.className = "olControlZoomOut", a.appendChild(c));
    OpenLayers.Element.addClass(c, "olButton");
    return{zoomIn: b, zoomOut: c}
}, onZoomClick: function (a) {
    a = a.buttonElement;
    a === this.zoomInLink ? this.map.zoomIn() : a === this.zoomOutLink && this.map.zoomOut()
}, destroy: function () {
    this.map && this.map.events.unregister("buttonclick", this, this.onZoomClick);
    delete this.zoomInLink;
    delete this.zoomOutLink;
    OpenLayers.Control.prototype.destroy.apply(this)
}, CLASS_NAME: "OpenLayers.Control.Zoom"});
OpenLayers.Geometry.Polygon = OpenLayers.Class(OpenLayers.Geometry.Collection, {componentTypes: ["OpenLayers.Geometry.LinearRing"], getArea: function () {
    var a = 0;
    if (this.components && 0 < this.components.length)for (var a = a + Math.abs(this.components[0].getArea()), b = 1, c = this.components.length; b < c; b++)a -= Math.abs(this.components[b].getArea());
    return a
}, getGeodesicArea: function (a) {
    var b = 0;
    if (this.components && 0 < this.components.length)for (var b = b + Math.abs(this.components[0].getGeodesicArea(a)), c = 1, d = this.components.length; c <
        d; c++)b -= Math.abs(this.components[c].getGeodesicArea(a));
    return b
}, containsPoint: function (a) {
    var b = this.components.length, c = !1;
    if (0 < b && (c = this.components[0].containsPoint(a), 1 !== c && c && 1 < b))for (var d, e = 1; e < b; ++e)if (d = this.components[e].containsPoint(a)) {
        c = 1 === d ? 1 : !1;
        break
    }
    return c
}, intersects: function (a) {
    var b = !1, c, d;
    if ("OpenLayers.Geometry.Point" == a.CLASS_NAME)b = this.containsPoint(a); else if ("OpenLayers.Geometry.LineString" == a.CLASS_NAME || "OpenLayers.Geometry.LinearRing" == a.CLASS_NAME) {
        c = 0;
        for (d =
                 this.components.length; c < d && !(b = a.intersects(this.components[c])); ++c);
        if (!b)for (c = 0, d = a.components.length; c < d && !(b = this.containsPoint(a.components[c])); ++c);
    } else for (c = 0, d = a.components.length; c < d && !(b = this.intersects(a.components[c])); ++c);
    if (!b && "OpenLayers.Geometry.Polygon" == a.CLASS_NAME) {
        var e = this.components[0];
        c = 0;
        for (d = e.components.length; c < d && !(b = a.containsPoint(e.components[c])); ++c);
    }
    return b
}, distanceTo: function (a, b) {
    return b && !1 === b.edge && this.intersects(a) ? 0 : OpenLayers.Geometry.Collection.prototype.distanceTo.apply(this,
        [a, b])
}, CLASS_NAME: "OpenLayers.Geometry.Polygon"});
OpenLayers.Geometry.Polygon.createRegularPolygon = function (a, b, c, d) {
    var e = Math.PI * (1 / c - 0.5);
    d && (e += d / 180 * Math.PI);
    for (var f, g = [], h = 0; h < c; ++h)f = e + 2 * h * Math.PI / c, d = a.x + b * Math.cos(f), f = a.y + b * Math.sin(f), g.push(new OpenLayers.Geometry.Point(d, f));
    a = new OpenLayers.Geometry.LinearRing(g);
    return new OpenLayers.Geometry.Polygon([a])
};
OpenLayers.Geometry.MultiPolygon = OpenLayers.Class(OpenLayers.Geometry.Collection, {componentTypes: ["OpenLayers.Geometry.Polygon"], CLASS_NAME: "OpenLayers.Geometry.MultiPolygon"});
OpenLayers.Feature = OpenLayers.Class({layer: null, id: null, lonlat: null, data: null, marker: null, popupClass: null, popup: null, initialize: function (a, b, c) {
    this.layer = a;
    this.lonlat = b;
    this.data = null != c ? c : {};
    this.id = OpenLayers.Util.createUniqueID(this.CLASS_NAME + "_")
}, destroy: function () {
    null != this.layer && null != this.layer.map && null != this.popup && this.layer.map.removePopup(this.popup);
    null != this.layer && null != this.marker && this.layer.removeMarker(this.marker);
    this.data = this.lonlat = this.id = this.layer = null;
    null != this.marker &&
    (this.destroyMarker(this.marker), this.marker = null);
    null != this.popup && (this.destroyPopup(this.popup), this.popup = null)
}, onScreen: function () {
    var a = !1;
    null != this.layer && null != this.layer.map && (a = this.layer.map.getExtent().containsLonLat(this.lonlat));
    return a
}, createMarker: function () {
    null != this.lonlat && (this.marker = new OpenLayers.Marker(this.lonlat, this.data.icon));
    return this.marker
}, destroyMarker: function () {
    this.marker.destroy()
}, createPopup: function (a) {
    null != this.lonlat && (this.popup || (this.popup = new (this.popupClass ?
        this.popupClass : OpenLayers.Popup.Anchored)(this.id + "_popup", this.lonlat, this.data.popupSize, this.data.popupContentHTML, this.marker ? this.marker.icon : null, a)), null != this.data.overflow && (this.popup.contentDiv.style.overflow = this.data.overflow), this.popup.feature = this);
    return this.popup
}, destroyPopup: function () {
    this.popup && (this.popup.feature = null, this.popup.destroy(), this.popup = null)
}, CLASS_NAME: "OpenLayers.Feature"});
OpenLayers.State = {UNKNOWN: "Unknown", INSERT: "Insert", UPDATE: "Update", DELETE: "Delete"};
OpenLayers.Feature.Vector = OpenLayers.Class(OpenLayers.Feature, {fid: null, geometry: null, attributes: null, bounds: null, state: null, style: null, url: null, renderIntent: "default", modified: null, initialize: function (a, b, c) {
    OpenLayers.Feature.prototype.initialize.apply(this, [null, null, b]);
    this.lonlat = null;
    this.geometry = a ? a : null;
    this.state = null;
    this.attributes = {};
    b && (this.attributes = OpenLayers.Util.extend(this.attributes, b));
    this.style = c ? c : null
}, destroy: function () {
    this.layer && (this.layer.removeFeatures(this), this.layer =
        null);
    this.modified = this.geometry = null;
    OpenLayers.Feature.prototype.destroy.apply(this, arguments)
}, clone: function () {
    return new OpenLayers.Feature.Vector(this.geometry ? this.geometry.clone() : null, this.attributes, this.style)
}, onScreen: function (a) {
    var b = !1;
    this.layer && this.layer.map && (b = this.layer.map.getExtent(), a ? (a = this.geometry.getBounds(), b = b.intersectsBounds(a)) : b = b.toGeometry().intersects(this.geometry));
    return b
}, getVisibility: function () {
    return!(this.style && "none" == this.style.display || !this.layer ||
        this.layer && this.layer.styleMap && "none" == this.layer.styleMap.createSymbolizer(this, this.renderIntent).display || this.layer && !this.layer.getVisibility())
}, createMarker: function () {
    return null
}, destroyMarker: function () {
}, createPopup: function () {
    return null
}, atPoint: function (a, b, c) {
    var d = !1;
    this.geometry && (d = this.geometry.atPoint(a, b, c));
    return d
}, destroyPopup: function () {
}, move: function (a) {
    if (this.layer && this.geometry.move) {
        a = "OpenLayers.LonLat" == a.CLASS_NAME ? this.layer.getViewPortPxFromLonLat(a) : a;
        var b =
            this.layer.getViewPortPxFromLonLat(this.geometry.getBounds().getCenterLonLat()), c = this.layer.map.getResolution();
        this.geometry.move(c * (a.x - b.x), c * (b.y - a.y));
        this.layer.drawFeature(this);
        return b
    }
}, toState: function (a) {
    if (a == OpenLayers.State.UPDATE)switch (this.state) {
        case OpenLayers.State.UNKNOWN:
        case OpenLayers.State.DELETE:
            this.state = a
    } else if (a == OpenLayers.State.INSERT)switch (this.state) {
        case OpenLayers.State.UNKNOWN:
            break;
        default:
            this.state = a
    } else if (a == OpenLayers.State.DELETE)switch (this.state) {
        case OpenLayers.State.UNKNOWN:
        case OpenLayers.State.UPDATE:
            this.state =
                a
    } else a == OpenLayers.State.UNKNOWN && (this.state = a)
}, CLASS_NAME: "OpenLayers.Feature.Vector"});
OpenLayers.Feature.Vector.style = {"default": {fillColor: "#ee9900", fillOpacity: 0.4, hoverFillColor: "white", hoverFillOpacity: 0.8, strokeColor: "#ee9900", strokeOpacity: 1, strokeWidth: 1, strokeLinecap: "round", strokeDashstyle: "solid", hoverStrokeColor: "red", hoverStrokeOpacity: 1, hoverStrokeWidth: 0.2, pointRadius: 6, hoverPointRadius: 1, hoverPointUnit: "%", pointerEvents: "visiblePainted", cursor: "inherit", fontColor: "#000000", labelAlign: "cm", labelOutlineColor: "white", labelOutlineWidth: 3}, select: {fillColor: "blue", fillOpacity: 0.4,
    hoverFillColor: "white", hoverFillOpacity: 0.8, strokeColor: "blue", strokeOpacity: 1, strokeWidth: 2, strokeLinecap: "round", strokeDashstyle: "solid", hoverStrokeColor: "red", hoverStrokeOpacity: 1, hoverStrokeWidth: 0.2, pointRadius: 6, hoverPointRadius: 1, hoverPointUnit: "%", pointerEvents: "visiblePainted", cursor: "pointer", fontColor: "#000000", labelAlign: "cm", labelOutlineColor: "white", labelOutlineWidth: 3}, temporary: {fillColor: "#66cccc", fillOpacity: 0.2, hoverFillColor: "white", hoverFillOpacity: 0.8, strokeColor: "#66cccc", strokeOpacity: 1,
    strokeLinecap: "round", strokeWidth: 2, strokeDashstyle: "solid", hoverStrokeColor: "red", hoverStrokeOpacity: 1, hoverStrokeWidth: 0.2, pointRadius: 6, hoverPointRadius: 1, hoverPointUnit: "%", pointerEvents: "visiblePainted", cursor: "inherit", fontColor: "#000000", labelAlign: "cm", labelOutlineColor: "white", labelOutlineWidth: 3}, "delete": {display: "none"}};
OpenLayers.Style = OpenLayers.Class({id: null, name: null, title: null, description: null, layerName: null, isDefault: !1, rules: null, context: null, defaultStyle: null, defaultsPerSymbolizer: !1, propertyStyles: null, initialize: function (a, b) {
    OpenLayers.Util.extend(this, b);
    this.rules = [];
    b && b.rules && this.addRules(b.rules);
    this.setDefaultStyle(a || OpenLayers.Feature.Vector.style["default"]);
    this.id = OpenLayers.Util.createUniqueID(this.CLASS_NAME + "_")
}, destroy: function () {
    for (var a = 0, b = this.rules.length; a < b; a++)this.rules[a].destroy(),
        this.rules[a] = null;
    this.defaultStyle = this.rules = null
}, createSymbolizer: function (a) {
    for (var b = this.defaultsPerSymbolizer ? {} : this.createLiterals(OpenLayers.Util.extend({}, this.defaultStyle), a), c = this.rules, d, e = [], f = !1, g = 0, h = c.length; g < h; g++)d = c[g], d.evaluate(a) && (d instanceof OpenLayers.Rule && d.elseFilter ? e.push(d) : (f = !0, this.applySymbolizer(d, b, a)));
    if (!1 == f && 0 < e.length)for (f = !0, g = 0, h = e.length; g < h; g++)this.applySymbolizer(e[g], b, a);
    0 < c.length && !1 == f && (b.display = "none");
    null != b.label && "string" !== typeof b.label &&
    (b.label = String(b.label));
    return b
}, applySymbolizer: function (a, b, c) {
    var d = c.geometry ? this.getSymbolizerPrefix(c.geometry) : OpenLayers.Style.SYMBOLIZER_PREFIXES[0];
    a = a.symbolizer[d] || a.symbolizer;
    !0 === this.defaultsPerSymbolizer && (d = this.defaultStyle, OpenLayers.Util.applyDefaults(a, {pointRadius: d.pointRadius}), !0 !== a.stroke && !0 !== a.graphic || OpenLayers.Util.applyDefaults(a, {strokeWidth: d.strokeWidth, strokeColor: d.strokeColor, strokeOpacity: d.strokeOpacity, strokeDashstyle: d.strokeDashstyle, strokeLinecap: d.strokeLinecap}),
        !0 !== a.fill && !0 !== a.graphic || OpenLayers.Util.applyDefaults(a, {fillColor: d.fillColor, fillOpacity: d.fillOpacity}), !0 === a.graphic && OpenLayers.Util.applyDefaults(a, {pointRadius: this.defaultStyle.pointRadius, externalGraphic: this.defaultStyle.externalGraphic, graphicName: this.defaultStyle.graphicName, graphicOpacity: this.defaultStyle.graphicOpacity, graphicWidth: this.defaultStyle.graphicWidth, graphicHeight: this.defaultStyle.graphicHeight, graphicXOffset: this.defaultStyle.graphicXOffset, graphicYOffset: this.defaultStyle.graphicYOffset}));
    return this.createLiterals(OpenLayers.Util.extend(b, a), c)
}, createLiterals: function (a, b) {
    var c = OpenLayers.Util.extend({}, b.attributes || b.data);
    OpenLayers.Util.extend(c, this.context);
    for (var d in this.propertyStyles)a[d] = OpenLayers.Style.createLiteral(a[d], c, b, d);
    return a
}, findPropertyStyles: function () {
    var a = {};
    this.addPropertyStyles(a, this.defaultStyle);
    for (var b = this.rules, c, d, e = 0, f = b.length; e < f; e++) {
        c = b[e].symbolizer;
        for (var g in c)if (d = c[g], "object" == typeof d)this.addPropertyStyles(a, d); else {
            this.addPropertyStyles(a,
                c);
            break
        }
    }
    return a
}, addPropertyStyles: function (a, b) {
    var c, d;
    for (d in b)c = b[d], "string" == typeof c && c.match(/\$\{\w+\}/) && (a[d] = !0);
    return a
}, addRules: function (a) {
    Array.prototype.push.apply(this.rules, a);
    this.propertyStyles = this.findPropertyStyles()
}, setDefaultStyle: function (a) {
    this.defaultStyle = a;
    this.propertyStyles = this.findPropertyStyles()
}, getSymbolizerPrefix: function (a) {
    for (var b = OpenLayers.Style.SYMBOLIZER_PREFIXES, c = 0, d = b.length; c < d; c++)if (-1 != a.CLASS_NAME.indexOf(b[c]))return b[c]
}, clone: function () {
    var a =
        OpenLayers.Util.extend({}, this);
    if (this.rules) {
        a.rules = [];
        for (var b = 0, c = this.rules.length; b < c; ++b)a.rules.push(this.rules[b].clone())
    }
    a.context = this.context && OpenLayers.Util.extend({}, this.context);
    b = OpenLayers.Util.extend({}, this.defaultStyle);
    return new OpenLayers.Style(b, a)
}, CLASS_NAME: "OpenLayers.Style"});
OpenLayers.Style.createLiteral = function (a, b, c, d) {
    "string" == typeof a && -1 != a.indexOf("${") && (a = OpenLayers.String.format(a, b, [c, d]), a = isNaN(a) || !a ? a : parseFloat(a));
    return a
};
OpenLayers.Style.SYMBOLIZER_PREFIXES = ["Point", "Line", "Polygon", "Text", "Raster"];
OpenLayers.Filter = OpenLayers.Class({initialize: function (a) {
    OpenLayers.Util.extend(this, a)
}, destroy: function () {
}, evaluate: function (a) {
    return!0
}, clone: function () {
    return null
}, toString: function () {
    return OpenLayers.Format && OpenLayers.Format.CQL ? OpenLayers.Format.CQL.prototype.write(this) : Object.prototype.toString.call(this)
}, CLASS_NAME: "OpenLayers.Filter"});
OpenLayers.Filter.Spatial = OpenLayers.Class(OpenLayers.Filter, {type: null, property: null, value: null, distance: null, distanceUnits: null, evaluate: function (a) {
    var b = !1;
    switch (this.type) {
        case OpenLayers.Filter.Spatial.BBOX:
        case OpenLayers.Filter.Spatial.INTERSECTS:
            if (a.geometry) {
                var c = this.value;
                "OpenLayers.Bounds" == this.value.CLASS_NAME && (c = this.value.toGeometry());
                a.geometry.intersects(c) && (b = !0)
            }
            break;
        default:
            throw Error("evaluate is not implemented for this filter type.");
    }
    return b
}, clone: function () {
    var a =
        OpenLayers.Util.applyDefaults({value: this.value && this.value.clone && this.value.clone()}, this);
    return new OpenLayers.Filter.Spatial(a)
}, CLASS_NAME: "OpenLayers.Filter.Spatial"});
OpenLayers.Filter.Spatial.BBOX = "BBOX";
OpenLayers.Filter.Spatial.INTERSECTS = "INTERSECTS";
OpenLayers.Filter.Spatial.DWITHIN = "DWITHIN";
OpenLayers.Filter.Spatial.WITHIN = "WITHIN";
OpenLayers.Filter.Spatial.CONTAINS = "CONTAINS";
OpenLayers.Strategy.BBOX = OpenLayers.Class(OpenLayers.Strategy, {bounds: null, resolution: null, ratio: 2, resFactor: null, response: null, activate: function () {
    var a = OpenLayers.Strategy.prototype.activate.call(this);
    a && (this.layer.events.on({moveend: this.update, refresh: this.update, visibilitychanged: this.update, scope: this}), this.update());
    return a
}, deactivate: function () {
    var a = OpenLayers.Strategy.prototype.deactivate.call(this);
    a && this.layer.events.un({moveend: this.update, refresh: this.update, visibilitychanged: this.update,
        scope: this});
    return a
}, update: function (a) {
    var b = this.getMapBounds();
    null !== b && (a && a.force || this.layer.visibility && this.layer.calculateInRange() && this.invalidBounds(b)) && (this.calculateBounds(b), this.resolution = this.layer.map.getResolution(), this.triggerRead(a))
}, getMapBounds: function () {
    if (null === this.layer.map)return null;
    var a = this.layer.map.getExtent();
    a && !this.layer.projection.equals(this.layer.map.getProjectionObject()) && (a = a.clone().transform(this.layer.map.getProjectionObject(), this.layer.projection));
    return a
}, invalidBounds: function (a) {
    a || (a = this.getMapBounds());
    a = !this.bounds || !this.bounds.containsBounds(a);
    !a && this.resFactor && (a = this.resolution / this.layer.map.getResolution(), a = a >= this.resFactor || a <= 1 / this.resFactor);
    return a
}, calculateBounds: function (a) {
    a || (a = this.getMapBounds());
    var b = a.getCenterLonLat(), c = a.getWidth() * this.ratio;
    a = a.getHeight() * this.ratio;
    this.bounds = new OpenLayers.Bounds(b.lon - c / 2, b.lat - a / 2, b.lon + c / 2, b.lat + a / 2)
}, triggerRead: function (a) {
    !this.response || a && !0 === a.noAbort ||
    (this.layer.protocol.abort(this.response), this.layer.events.triggerEvent("loadend"));
    var b = {filter: this.createFilter()};
    this.layer.events.triggerEvent("loadstart", b);
    this.response = this.layer.protocol.read(OpenLayers.Util.applyDefaults({filter: b.filter, callback: this.merge, scope: this}, a))
}, createFilter: function () {
    var a = new OpenLayers.Filter.Spatial({type: OpenLayers.Filter.Spatial.BBOX, value: this.bounds, projection: this.layer.projection});
    this.layer.filter && (a = new OpenLayers.Filter.Logical({type: OpenLayers.Filter.Logical.AND,
        filters: [this.layer.filter, a]}));
    return a
}, merge: function (a) {
    this.layer.destroyFeatures();
    if (a.success()) {
        var b = a.features;
        if (b && 0 < b.length) {
            var c = this.layer.projection, d = this.layer.map.getProjectionObject();
            if (!d.equals(c))for (var e, f = 0, g = b.length; f < g; ++f)(e = b[f].geometry) && e.transform(c, d);
            this.layer.addFeatures(b)
        }
    } else this.bounds = null;
    this.response = null;
    this.layer.events.triggerEvent("loadend", {response: a})
}, CLASS_NAME: "OpenLayers.Strategy.BBOX"});
OpenLayers.Handler.Feature = OpenLayers.Class(OpenLayers.Handler, {EVENTMAP: {click: {"in": "click", out: "clickout"}, mousemove: {"in": "over", out: "out"}, dblclick: {"in": "dblclick", out: null}, mousedown: {"in": null, out: null}, mouseup: {"in": null, out: null}, touchstart: {"in": "click", out: "clickout"}}, feature: null, lastFeature: null, down: null, up: null, clickTolerance: 4, geometryTypes: null, stopClick: !0, stopDown: !0, stopUp: !1, initialize: function (a, b, c, d) {
    OpenLayers.Handler.prototype.initialize.apply(this, [a, c, d]);
    this.layer =
        b
}, touchstart: function (a) {
    this.startTouch();
    return OpenLayers.Event.isMultiTouch(a) ? !0 : this.mousedown(a)
}, touchmove: function (a) {
    OpenLayers.Event.preventDefault(a)
}, mousedown: function (a) {
    if (OpenLayers.Event.isLeftClick(a) || OpenLayers.Event.isSingleTouch(a))this.down = a.xy;
    return this.handle(a) ? !this.stopDown : !0
}, mouseup: function (a) {
    this.up = a.xy;
    return this.handle(a) ? !this.stopUp : !0
}, click: function (a) {
    return this.handle(a) ? !this.stopClick : !0
}, mousemove: function (a) {
    if (!this.callbacks.over && !this.callbacks.out)return!0;
    this.handle(a);
    return!0
}, dblclick: function (a) {
    return!this.handle(a)
}, geometryTypeMatches: function (a) {
    return null == this.geometryTypes || -1 < OpenLayers.Util.indexOf(this.geometryTypes, a.geometry.CLASS_NAME)
}, handle: function (a) {
    this.feature && !this.feature.layer && (this.feature = null);
    var b = a.type, c = !1, d = !!this.feature, e = "click" == b || "dblclick" == b || "touchstart" == b;
    (this.feature = this.layer.getFeatureFromEvent(a)) && !this.feature.layer && (this.feature = null);
    this.lastFeature && !this.lastFeature.layer && (this.lastFeature =
        null);
    this.feature ? ("touchstart" === b && OpenLayers.Event.preventDefault(a), a = this.feature != this.lastFeature, this.geometryTypeMatches(this.feature) ? (d && a ? (this.lastFeature && this.triggerCallback(b, "out", [this.lastFeature]), this.triggerCallback(b, "in", [this.feature])) : d && !e || this.triggerCallback(b, "in", [this.feature]), this.lastFeature = this.feature, c = !0) : (this.lastFeature && (d && a || e) && this.triggerCallback(b, "out", [this.lastFeature]), this.feature = null)) : this.lastFeature && (d || e) && this.triggerCallback(b, "out",
        [this.lastFeature]);
    return c
}, triggerCallback: function (a, b, c) {
    if (b = this.EVENTMAP[a][b])"click" == a && this.up && this.down ? (Math.sqrt(Math.pow(this.up.x - this.down.x, 2) + Math.pow(this.up.y - this.down.y, 2)) <= this.clickTolerance && this.callback(b, c), this.up = this.down = null) : this.callback(b, c)
}, activate: function () {
    var a = !1;
    OpenLayers.Handler.prototype.activate.apply(this, arguments) && (this.moveLayerToTop(), this.map.events.on({removelayer: this.handleMapEvents, changelayer: this.handleMapEvents, scope: this}), a = !0);
    return a
}, deactivate: function () {
    var a = !1;
    OpenLayers.Handler.prototype.deactivate.apply(this, arguments) && (this.moveLayerBack(), this.up = this.down = this.lastFeature = this.feature = null, this.map.events.un({removelayer: this.handleMapEvents, changelayer: this.handleMapEvents, scope: this}), a = !0);
    return a
}, handleMapEvents: function (a) {
    "removelayer" != a.type && "order" != a.property || this.moveLayerToTop()
}, moveLayerToTop: function () {
    var a = Math.max(this.map.Z_INDEX_BASE.Feature - 1, this.layer.getZIndex()) + 1;
    this.layer.setZIndex(a)
},
    moveLayerBack: function () {
        var a = this.layer.getZIndex() - 1;
        a >= this.map.Z_INDEX_BASE.Feature ? this.layer.setZIndex(a) : this.map.setLayerZIndex(this.layer, this.map.getLayerIndex(this.layer))
    }, CLASS_NAME: "OpenLayers.Handler.Feature"});
OpenLayers.StyleMap = OpenLayers.Class({styles: null, extendDefault: !0, initialize: function (a, b) {
    this.styles = {"default": new OpenLayers.Style(OpenLayers.Feature.Vector.style["default"]), select: new OpenLayers.Style(OpenLayers.Feature.Vector.style.select), temporary: new OpenLayers.Style(OpenLayers.Feature.Vector.style.temporary), "delete": new OpenLayers.Style(OpenLayers.Feature.Vector.style["delete"])};
    if (a instanceof OpenLayers.Style)this.styles["default"] = a, this.styles.select = a, this.styles.temporary = a, this.styles["delete"] =
        a; else if ("object" == typeof a)for (var c in a)if (a[c]instanceof OpenLayers.Style)this.styles[c] = a[c]; else if ("object" == typeof a[c])this.styles[c] = new OpenLayers.Style(a[c]); else {
        this.styles["default"] = new OpenLayers.Style(a);
        this.styles.select = new OpenLayers.Style(a);
        this.styles.temporary = new OpenLayers.Style(a);
        this.styles["delete"] = new OpenLayers.Style(a);
        break
    }
    OpenLayers.Util.extend(this, b)
}, destroy: function () {
    for (var a in this.styles)this.styles[a].destroy();
    this.styles = null
}, createSymbolizer: function (a, b) {
    a || (a = new OpenLayers.Feature.Vector);
    this.styles[b] || (b = "default");
    a.renderIntent = b;
    var c = {};
    this.extendDefault && "default" != b && (c = this.styles["default"].createSymbolizer(a));
    return OpenLayers.Util.extend(c, this.styles[b].createSymbolizer(a))
}, addUniqueValueRules: function (a, b, c, d) {
    var e = [], f;
    for (f in c)e.push(new OpenLayers.Rule({symbolizer: c[f], context: d, filter: new OpenLayers.Filter.Comparison({type: OpenLayers.Filter.Comparison.EQUAL_TO, property: b, value: f})}));
    this.styles[a].addRules(e)
}, CLASS_NAME: "OpenLayers.StyleMap"});
OpenLayers.Layer.Vector = OpenLayers.Class(OpenLayers.Layer, {isBaseLayer: !1, isFixed: !1, features: null, filter: null, selectedFeatures: null, unrenderedFeatures: null, reportError: !0, style: null, styleMap: null, strategies: null, protocol: null, renderers: ["SVG", "VML", "Canvas"], renderer: null, rendererOptions: null, geometryType: null, drawn: !1, ratio: 1, initialize: function (a, b) {
    OpenLayers.Layer.prototype.initialize.apply(this, arguments);
    this.renderer && this.renderer.supported() || this.assignRenderer();
    this.renderer && this.renderer.supported() ||
    (this.renderer = null, this.displayError());
    this.styleMap || (this.styleMap = new OpenLayers.StyleMap);
    this.features = [];
    this.selectedFeatures = [];
    this.unrenderedFeatures = {};
    if (this.strategies)for (var c = 0, d = this.strategies.length; c < d; c++)this.strategies[c].setLayer(this)
}, destroy: function () {
    if (this.strategies) {
        var a, b, c;
        b = 0;
        for (c = this.strategies.length; b < c; b++)a = this.strategies[b], a.autoDestroy && a.destroy();
        this.strategies = null
    }
    this.protocol && (this.protocol.autoDestroy && this.protocol.destroy(), this.protocol =
        null);
    this.destroyFeatures();
    this.unrenderedFeatures = this.selectedFeatures = this.features = null;
    this.renderer && this.renderer.destroy();
    this.drawn = this.geometryType = this.renderer = null;
    OpenLayers.Layer.prototype.destroy.apply(this, arguments)
}, clone: function (a) {
    null == a && (a = new OpenLayers.Layer.Vector(this.name, this.getOptions()));
    a = OpenLayers.Layer.prototype.clone.apply(this, [a]);
    for (var b = this.features, c = b.length, d = Array(c), e = 0; e < c; ++e)d[e] = b[e].clone();
    a.features = d;
    return a
}, refresh: function (a) {
    this.calculateInRange() &&
        this.visibility && this.events.triggerEvent("refresh", a)
}, assignRenderer: function () {
    for (var a = 0, b = this.renderers.length; a < b; a++) {
        var c = this.renderers[a];
        if ((c = "function" == typeof c ? c : OpenLayers.Renderer[c]) && c.prototype.supported()) {
            this.renderer = new c(this.div, this.rendererOptions);
            break
        }
    }
}, displayError: function () {
    this.reportError && OpenLayers.Console.userError(OpenLayers.i18n("browserNotSupported", {renderers: this.renderers.join("\n")}))
}, setMap: function (a) {
    OpenLayers.Layer.prototype.setMap.apply(this,
        arguments);
    if (this.renderer) {
        this.renderer.map = this.map;
        var b = this.map.getSize();
        b.w *= this.ratio;
        b.h *= this.ratio;
        this.renderer.setSize(b)
    } else this.map.removeLayer(this)
}, afterAdd: function () {
    if (this.strategies) {
        var a, b, c;
        b = 0;
        for (c = this.strategies.length; b < c; b++)a = this.strategies[b], a.autoActivate && a.activate()
    }
}, removeMap: function (a) {
    this.drawn = !1;
    if (this.strategies) {
        var b, c;
        b = 0;
        for (c = this.strategies.length; b < c; b++)a = this.strategies[b], a.autoActivate && a.deactivate()
    }
}, onMapResize: function () {
    OpenLayers.Layer.prototype.onMapResize.apply(this,
        arguments);
    var a = this.map.getSize();
    a.w *= this.ratio;
    a.h *= this.ratio;
    this.renderer.setSize(a)
}, moveTo: function (a, b, c) {
    OpenLayers.Layer.prototype.moveTo.apply(this, arguments);
    var d = !0;
    if (!c) {
        this.renderer.root.style.visibility = "hidden";
        var d = this.map.getSize(), e = d.w, d = d.h, e = e / 2 * this.ratio - e / 2, d = d / 2 * this.ratio - d / 2, e = e + this.map.layerContainerOriginPx.x, e = -Math.round(e), d = d + this.map.layerContainerOriginPx.y, d = -Math.round(d);
        this.div.style.left = e + "px";
        this.div.style.top = d + "px";
        e = this.map.getExtent().scale(this.ratio);
        d = this.renderer.setExtent(e, b);
        this.renderer.root.style.visibility = "visible";
        !0 === OpenLayers.IS_GECKO && (this.div.scrollLeft = this.div.scrollLeft);
        if (!b && d)for (var f in this.unrenderedFeatures)e = this.unrenderedFeatures[f], this.drawFeature(e)
    }
    if (!this.drawn || b || !d)for (this.drawn = !0, f = 0, d = this.features.length; f < d; f++)this.renderer.locked = f !== d - 1, e = this.features[f], this.drawFeature(e)
}, display: function (a) {
    OpenLayers.Layer.prototype.display.apply(this, arguments);
    var b = this.div.style.display;
    b != this.renderer.root.style.display &&
    (this.renderer.root.style.display = b)
}, addFeatures: function (a, b) {
    OpenLayers.Util.isArray(a) || (a = [a]);
    var c = !b || !b.silent;
    if (c) {
        var d = {features: a};
        if (!1 === this.events.triggerEvent("beforefeaturesadded", d))return;
        a = d.features
    }
    for (var d = [], e = 0, f = a.length; e < f; e++) {
        this.renderer.locked = e != a.length - 1 ? !0 : !1;
        var g = a[e];
        if (this.geometryType && !(g.geometry instanceof this.geometryType))throw new TypeError("addFeatures: component should be an " + this.geometryType.prototype.CLASS_NAME);
        g.layer = this;
        !g.style && this.style &&
        (g.style = OpenLayers.Util.extend({}, this.style));
        if (c) {
            if (!1 === this.events.triggerEvent("beforefeatureadded", {feature: g}))continue;
            this.preFeatureInsert(g)
        }
        d.push(g);
        this.features.push(g);
        this.drawFeature(g);
        c && (this.events.triggerEvent("featureadded", {feature: g}), this.onFeatureInsert(g))
    }
    c && this.events.triggerEvent("featuresadded", {features: d})
}, removeFeatures: function (a, b) {
    if (a && 0 !== a.length) {
        if (a === this.features)return this.removeAllFeatures(b);
        OpenLayers.Util.isArray(a) || (a = [a]);
        a === this.selectedFeatures &&
        (a = a.slice());
        var c = !b || !b.silent;
        c && this.events.triggerEvent("beforefeaturesremoved", {features: a});
        for (var d = a.length - 1; 0 <= d; d--) {
            this.renderer.locked = 0 != d && a[d - 1].geometry ? !0 : !1;
            var e = a[d];
            delete this.unrenderedFeatures[e.id];
            c && this.events.triggerEvent("beforefeatureremoved", {feature: e});
            this.features = OpenLayers.Util.removeItem(this.features, e);
            e.layer = null;
            e.geometry && this.renderer.eraseFeatures(e);
            -1 != OpenLayers.Util.indexOf(this.selectedFeatures, e) && OpenLayers.Util.removeItem(this.selectedFeatures,
                e);
            c && this.events.triggerEvent("featureremoved", {feature: e})
        }
        c && this.events.triggerEvent("featuresremoved", {features: a})
    }
}, removeAllFeatures: function (a) {
    a = !a || !a.silent;
    var b = this.features;
    a && this.events.triggerEvent("beforefeaturesremoved", {features: b});
    for (var c, d = b.length - 1; 0 <= d; d--)c = b[d], a && this.events.triggerEvent("beforefeatureremoved", {feature: c}), c.layer = null, a && this.events.triggerEvent("featureremoved", {feature: c});
    this.renderer.clear();
    this.features = [];
    this.unrenderedFeatures = {};
    this.selectedFeatures =
        [];
    a && this.events.triggerEvent("featuresremoved", {features: b})
}, destroyFeatures: function (a, b) {
    void 0 == a && (a = this.features);
    if (a) {
        this.removeFeatures(a, b);
        for (var c = a.length - 1; 0 <= c; c--)a[c].destroy()
    }
}, drawFeature: function (a, b) {
    if (this.drawn) {
        if ("object" != typeof b) {
            b || a.state !== OpenLayers.State.DELETE || (b = "delete");
            var c = b || a.renderIntent;
            (b = a.style || this.style) || (b = this.styleMap.createSymbolizer(a, c))
        }
        c = this.renderer.drawFeature(a, b);
        !1 === c || null === c ? this.unrenderedFeatures[a.id] = a : delete this.unrenderedFeatures[a.id]
    }
},
    eraseFeatures: function (a) {
        this.renderer.eraseFeatures(a)
    }, getFeatureFromEvent: function (a) {
        if (!this.renderer)throw Error("getFeatureFromEvent called on layer with no renderer. This usually means you destroyed a layer, but not some handler which is associated with it.");
        var b = null;
        (a = this.renderer.getFeatureIdFromEvent(a)) && (b = "string" === typeof a ? this.getFeatureById(a) : a);
        return b
    }, getFeatureBy: function (a, b) {
        for (var c = null, d = 0, e = this.features.length; d < e; ++d)if (this.features[d][a] == b) {
            c = this.features[d];
            break
        }
        return c
    }, getFeatureById: function (a) {
        return this.getFeatureBy("id", a)
    }, getFeatureByFid: function (a) {
        return this.getFeatureBy("fid", a)
    }, getFeaturesByAttribute: function (a, b) {
        var c, d, e = this.features.length, f = [];
        for (c = 0; c < e; c++)(d = this.features[c]) && d.attributes && d.attributes[a] === b && f.push(d);
        return f
    }, onFeatureInsert: function (a) {
    }, preFeatureInsert: function (a) {
    }, getDataExtent: function () {
        var a = null, b = this.features;
        if (b && 0 < b.length)for (var c = null, d = 0, e = b.length; d < e; d++)if (c = b[d].geometry)null === a &&
            (a = new OpenLayers.Bounds), a.extend(c.getBounds());
        return a
    }, CLASS_NAME: "OpenLayers.Layer.Vector"});
OpenLayers.Layer.Vector.RootContainer = OpenLayers.Class(OpenLayers.Layer.Vector, {displayInLayerSwitcher: !1, layers: null, display: function () {
}, getFeatureFromEvent: function (a) {
    for (var b = this.layers, c, d = 0; d < b.length; d++)if (c = b[d].getFeatureFromEvent(a))return c
}, setMap: function (a) {
    OpenLayers.Layer.Vector.prototype.setMap.apply(this, arguments);
    this.collectRoots();
    a.events.register("changelayer", this, this.handleChangeLayer)
}, removeMap: function (a) {
    a.events.unregister("changelayer", this, this.handleChangeLayer);
    this.resetRoots();
    OpenLayers.Layer.Vector.prototype.removeMap.apply(this, arguments)
}, collectRoots: function () {
    for (var a, b = 0; b < this.map.layers.length; ++b)a = this.map.layers[b], -1 != OpenLayers.Util.indexOf(this.layers, a) && a.renderer.moveRoot(this.renderer)
}, resetRoots: function () {
    for (var a, b = 0; b < this.layers.length; ++b)a = this.layers[b], this.renderer && a.renderer.getRenderLayerId() == this.id && this.renderer.moveRoot(a.renderer)
}, handleChangeLayer: function (a) {
    var b = a.layer;
    "order" == a.property && -1 != OpenLayers.Util.indexOf(this.layers,
        b) && (this.resetRoots(), this.collectRoots())
}, CLASS_NAME: "OpenLayers.Layer.Vector.RootContainer"});
OpenLayers.Control.SelectFeature = OpenLayers.Class(OpenLayers.Control, {multipleKey: null, toggleKey: null, multiple: !1, clickout: !0, toggle: !1, hover: !1, highlightOnly: !1, box: !1, onBeforeSelect: function () {
}, onSelect: function () {
}, onUnselect: function () {
}, scope: null, geometryTypes: null, layer: null, layers: null, callbacks: null, selectStyle: null, renderIntent: "select", handlers: null, initialize: function (a, b) {
    OpenLayers.Control.prototype.initialize.apply(this, [b]);
    null === this.scope && (this.scope = this);
    this.initLayer(a);
    var c =
    {click: this.clickFeature, clickout: this.clickoutFeature};
    this.hover && (c.over = this.overFeature, c.out = this.outFeature);
    this.callbacks = OpenLayers.Util.extend(c, this.callbacks);
    this.handlers = {feature: new OpenLayers.Handler.Feature(this, this.layer, this.callbacks, {geometryTypes: this.geometryTypes})};
    this.box && (this.handlers.box = new OpenLayers.Handler.Box(this, {done: this.selectBox}, {boxDivClassName: "olHandlerBoxSelectFeature"}))
}, initLayer: function (a) {
    OpenLayers.Util.isArray(a) ? (this.layers = a, this.layer =
        new OpenLayers.Layer.Vector.RootContainer(this.id + "_container", {layers: a})) : this.layer = a
}, destroy: function () {
    this.active && this.layers && this.map.removeLayer(this.layer);
    OpenLayers.Control.prototype.destroy.apply(this, arguments);
    this.layers && this.layer.destroy()
}, activate: function () {
    this.active || (this.layers && this.map.addLayer(this.layer), this.handlers.feature.activate(), this.box && this.handlers.box && this.handlers.box.activate());
    return OpenLayers.Control.prototype.activate.apply(this, arguments)
}, deactivate: function () {
    this.active &&
    (this.handlers.feature.deactivate(), this.handlers.box && this.handlers.box.deactivate(), this.layers && this.map.removeLayer(this.layer));
    return OpenLayers.Control.prototype.deactivate.apply(this, arguments)
}, unselectAll: function (a) {
    var b = this.layers || [this.layer], c, d, e, f;
    for (e = 0; e < b.length; ++e)if (c = b[e], f = 0, null != c.selectedFeatures)for (; c.selectedFeatures.length > f;)d = c.selectedFeatures[f], a && a.except == d ? ++f : this.unselect(d)
}, clickFeature: function (a) {
    this.hover || (-1 < OpenLayers.Util.indexOf(a.layer.selectedFeatures,
        a) ? this.toggleSelect() ? this.unselect(a) : this.multipleSelect() || this.unselectAll({except: a}) : (this.multipleSelect() || this.unselectAll({except: a}), this.select(a)))
}, multipleSelect: function () {
    return this.multiple || this.handlers.feature.evt && this.handlers.feature.evt[this.multipleKey]
}, toggleSelect: function () {
    return this.toggle || this.handlers.feature.evt && this.handlers.feature.evt[this.toggleKey]
}, clickoutFeature: function (a) {
    !this.hover && this.clickout && this.unselectAll()
}, overFeature: function (a) {
    var b =
        a.layer;
    this.hover && (this.highlightOnly ? this.highlight(a) : -1 == OpenLayers.Util.indexOf(b.selectedFeatures, a) && this.select(a))
}, outFeature: function (a) {
    if (this.hover)if (this.highlightOnly) {
        if (a._lastHighlighter == this.id)if (a._prevHighlighter && a._prevHighlighter != this.id) {
            delete a._lastHighlighter;
            var b = this.map.getControl(a._prevHighlighter);
            b && b.highlight(a)
        } else this.unhighlight(a)
    } else this.unselect(a)
}, highlight: function (a) {
    var b = a.layer;
    !1 !== this.events.triggerEvent("beforefeaturehighlighted", {feature: a}) &&
    (a._prevHighlighter = a._lastHighlighter, a._lastHighlighter = this.id, b.drawFeature(a, this.selectStyle || this.renderIntent), this.events.triggerEvent("featurehighlighted", {feature: a}))
}, unhighlight: function (a) {
    var b = a.layer;
    void 0 == a._prevHighlighter ? delete a._lastHighlighter : (a._prevHighlighter != this.id && (a._lastHighlighter = a._prevHighlighter), delete a._prevHighlighter);
    b.drawFeature(a, a.style || a.layer.style || "default");
    this.events.triggerEvent("featureunhighlighted", {feature: a})
}, select: function (a) {
    var b =
        this.onBeforeSelect.call(this.scope, a), c = a.layer;
    !1 !== b && (b = c.events.triggerEvent("beforefeatureselected", {feature: a}), !1 !== b && (c.selectedFeatures.push(a), this.highlight(a), this.handlers.feature.lastFeature || (this.handlers.feature.lastFeature = c.selectedFeatures[0]), c.events.triggerEvent("featureselected", {feature: a}), this.onSelect.call(this.scope, a)))
}, unselect: function (a) {
    var b = a.layer;
    this.unhighlight(a);
    OpenLayers.Util.removeItem(b.selectedFeatures, a);
    b.events.triggerEvent("featureunselected",
        {feature: a});
    this.onUnselect.call(this.scope, a)
}, selectBox: function (a) {
    if (a instanceof OpenLayers.Bounds) {
        var b = this.map.getLonLatFromPixel({x: a.left, y: a.bottom});
        a = this.map.getLonLatFromPixel({x: a.right, y: a.top});
        b = new OpenLayers.Bounds(b.lon, b.lat, a.lon, a.lat);
        this.multipleSelect() || this.unselectAll();
        a = this.multiple;
        this.multiple = !0;
        var c = this.layers || [this.layer];
        this.events.triggerEvent("boxselectionstart", {layers: c});
        for (var d, e = 0; e < c.length; ++e) {
            d = c[e];
            for (var f = 0, g = d.features.length; f < g; ++f) {
                var h =
                    d.features[f];
                h.getVisibility() && (null == this.geometryTypes || -1 < OpenLayers.Util.indexOf(this.geometryTypes, h.geometry.CLASS_NAME)) && b.toGeometry().intersects(h.geometry) && -1 == OpenLayers.Util.indexOf(d.selectedFeatures, h) && this.select(h)
            }
        }
        this.multiple = a;
        this.events.triggerEvent("boxselectionend", {layers: c})
    }
}, setMap: function (a) {
    this.handlers.feature.setMap(a);
    this.box && this.handlers.box.setMap(a);
    OpenLayers.Control.prototype.setMap.apply(this, arguments)
}, setLayer: function (a) {
    var b = this.active;
    this.unselectAll();
    this.deactivate();
    this.layers && (this.layer.destroy(), this.layers = null);
    this.initLayer(a);
    this.handlers.feature.layer = this.layer;
    b && this.activate()
}, CLASS_NAME: "OpenLayers.Control.SelectFeature"});
OpenLayers.Control.Attribution = OpenLayers.Class(OpenLayers.Control, {separator: ", ", template: "${layers}", destroy: function () {
    this.map.events.un({removelayer: this.updateAttribution, addlayer: this.updateAttribution, changelayer: this.updateAttribution, changebaselayer: this.updateAttribution, scope: this});
    OpenLayers.Control.prototype.destroy.apply(this, arguments)
}, draw: function () {
    OpenLayers.Control.prototype.draw.apply(this, arguments);
    this.map.events.on({changebaselayer: this.updateAttribution, changelayer: this.updateAttribution,
        addlayer: this.updateAttribution, removelayer: this.updateAttribution, scope: this});
    this.updateAttribution();
    return this.div
}, updateAttribution: function () {
    var a = [];
    if (this.map && this.map.layers) {
        for (var b = 0, c = this.map.layers.length; b < c; b++) {
            var d = this.map.layers[b];
            d.attribution && d.getVisibility() && -1 === OpenLayers.Util.indexOf(a, d.attribution) && a.push(d.attribution)
        }
        this.div.innerHTML = OpenLayers.String.format(this.template, {layers: a.join(this.separator)})
    }
}, CLASS_NAME: "OpenLayers.Control.Attribution"});
OpenLayers.Kinetic = OpenLayers.Class({threshold: 0, deceleration: 0.0035, nbPoints: 100, delay: 200, points: void 0, timerId: void 0, initialize: function (a) {
    OpenLayers.Util.extend(this, a)
}, begin: function () {
    OpenLayers.Animation.stop(this.timerId);
    this.timerId = void 0;
    this.points = []
}, update: function (a) {
    this.points.unshift({xy: a, tick: (new Date).getTime()});
    this.points.length > this.nbPoints && this.points.pop()
}, end: function (a) {
    for (var b, c = (new Date).getTime(), d = 0, e = this.points.length, f; d < e; d++) {
        f = this.points[d];
        if (c -
            f.tick > this.delay)break;
        b = f
    }
    if (b && (d = (new Date).getTime() - b.tick, c = Math.sqrt(Math.pow(a.x - b.xy.x, 2) + Math.pow(a.y - b.xy.y, 2)), d = c / d, !(0 == d || d < this.threshold)))return c = Math.asin((a.y - b.xy.y) / c), b.xy.x <= a.x && (c = Math.PI - c), {speed: d, theta: c}
}, move: function (a, b) {
    var c = a.speed, d = Math.cos(a.theta), e = -Math.sin(a.theta), f = (new Date).getTime(), g = 0, h = 0;
    this.timerId = OpenLayers.Animation.start(OpenLayers.Function.bind(function () {
        if (null != this.timerId) {
            var a = (new Date).getTime() - f, l = -this.deceleration * Math.pow(a,
                2) / 2 + c * a, m = l * d, l = l * e, r, p;
            r = !1;
            0 >= -this.deceleration * a + c && (OpenLayers.Animation.stop(this.timerId), this.timerId = null, r = !0);
            a = m - g;
            p = l - h;
            g = m;
            h = l;
            b(a, p, r)
        }
    }, this))
}, CLASS_NAME: "OpenLayers.Kinetic"});
OpenLayers.Filter.Logical = OpenLayers.Class(OpenLayers.Filter, {filters: null, type: null, initialize: function (a) {
    this.filters = [];
    OpenLayers.Filter.prototype.initialize.apply(this, [a])
}, destroy: function () {
    this.filters = null;
    OpenLayers.Filter.prototype.destroy.apply(this)
}, evaluate: function (a) {
    var b, c;
    switch (this.type) {
        case OpenLayers.Filter.Logical.AND:
            b = 0;
            for (c = this.filters.length; b < c; b++)if (!1 == this.filters[b].evaluate(a))return!1;
            return!0;
        case OpenLayers.Filter.Logical.OR:
            b = 0;
            for (c = this.filters.length; b <
                c; b++)if (!0 == this.filters[b].evaluate(a))return!0;
            return!1;
        case OpenLayers.Filter.Logical.NOT:
            return!this.filters[0].evaluate(a)
    }
}, clone: function () {
    for (var a = [], b = 0, c = this.filters.length; b < c; ++b)a.push(this.filters[b].clone());
    return new OpenLayers.Filter.Logical({type: this.type, filters: a})
}, CLASS_NAME: "OpenLayers.Filter.Logical"});
OpenLayers.Filter.Logical.AND = "&&";
OpenLayers.Filter.Logical.OR = "||";
OpenLayers.Filter.Logical.NOT = "!";
OpenLayers.Handler.Drag = OpenLayers.Class(OpenLayers.Handler, {started: !1, stopDown: !0, dragging: !1, last: null, start: null, lastMoveEvt: null, oldOnselectstart: null, interval: 0, timeoutId: null, documentDrag: !1, documentEvents: null, initialize: function (a, b, c) {
    OpenLayers.Handler.prototype.initialize.apply(this, arguments);
    if (!0 === this.documentDrag) {
        var d = this;
        this._docMove = function (a) {
            d.mousemove({xy: {x: a.clientX, y: a.clientY}, element: document})
        };
        this._docUp = function (a) {
            d.mouseup({xy: {x: a.clientX, y: a.clientY}})
        }
    }
},
    dragstart: function (a) {
        var b = !0;
        this.dragging = !1;
        this.checkModifiers(a) && (OpenLayers.Event.isLeftClick(a) || OpenLayers.Event.isSingleTouch(a)) ? (this.started = !0, this.last = this.start = a.xy, OpenLayers.Element.addClass(this.map.viewPortDiv, "olDragDown"), this.down(a), this.callback("down", [a.xy]), OpenLayers.Event.preventDefault(a), this.oldOnselectstart || (this.oldOnselectstart = document.onselectstart ? document.onselectstart : OpenLayers.Function.True), document.onselectstart = OpenLayers.Function.False, b = !this.stopDown) :
            (this.started = !1, this.last = this.start = null);
        return b
    }, dragmove: function (a) {
        this.lastMoveEvt = a;
        !this.started || (this.timeoutId || a.xy.x == this.last.x && a.xy.y == this.last.y) || (!0 === this.documentDrag && this.documentEvents && (a.element === document ? (this.adjustXY(a), this.setEvent(a)) : this.removeDocumentEvents()), 0 < this.interval && (this.timeoutId = setTimeout(OpenLayers.Function.bind(this.removeTimeout, this), this.interval)), this.dragging = !0, this.move(a), this.callback("move", [a.xy]), this.oldOnselectstart || (this.oldOnselectstart =
            document.onselectstart, document.onselectstart = OpenLayers.Function.False), this.last = a.xy);
        return!0
    }, dragend: function (a) {
        if (this.started) {
            !0 === this.documentDrag && this.documentEvents && (this.adjustXY(a), this.removeDocumentEvents());
            var b = this.start != this.last;
            this.dragging = this.started = !1;
            OpenLayers.Element.removeClass(this.map.viewPortDiv, "olDragDown");
            this.up(a);
            this.callback("up", [a.xy]);
            b && this.callback("done", [a.xy]);
            document.onselectstart = this.oldOnselectstart
        }
        return!0
    }, down: function (a) {
    }, move: function (a) {
    },
    up: function (a) {
    }, out: function (a) {
    }, mousedown: function (a) {
        return this.dragstart(a)
    }, touchstart: function (a) {
        this.startTouch();
        return this.dragstart(a)
    }, mousemove: function (a) {
        return this.dragmove(a)
    }, touchmove: function (a) {
        return this.dragmove(a)
    }, removeTimeout: function () {
        this.timeoutId = null;
        this.dragging && this.mousemove(this.lastMoveEvt)
    }, mouseup: function (a) {
        return this.dragend(a)
    }, touchend: function (a) {
        a.xy = this.last;
        return this.dragend(a)
    }, mouseout: function (a) {
        if (this.started && OpenLayers.Util.mouseLeft(a,
            this.map.viewPortDiv))if (!0 === this.documentDrag)this.addDocumentEvents(); else {
            var b = this.start != this.last;
            this.dragging = this.started = !1;
            OpenLayers.Element.removeClass(this.map.viewPortDiv, "olDragDown");
            this.out(a);
            this.callback("out", []);
            b && this.callback("done", [a.xy]);
            document.onselectstart && (document.onselectstart = this.oldOnselectstart)
        }
        return!0
    }, click: function (a) {
        return this.start == this.last
    }, activate: function () {
        var a = !1;
        OpenLayers.Handler.prototype.activate.apply(this, arguments) && (this.dragging = !1, a = !0);
        return a
    }, deactivate: function () {
        var a = !1;
        OpenLayers.Handler.prototype.deactivate.apply(this, arguments) && (this.dragging = this.started = !1, this.last = this.start = null, a = !0, OpenLayers.Element.removeClass(this.map.viewPortDiv, "olDragDown"));
        return a
    }, adjustXY: function (a) {
        var b = OpenLayers.Util.pagePosition(this.map.viewPortDiv);
        a.xy.x -= b[0];
        a.xy.y -= b[1]
    }, addDocumentEvents: function () {
        OpenLayers.Element.addClass(document.body, "olDragDown");
        this.documentEvents = !0;
        OpenLayers.Event.observe(document, "mousemove",
            this._docMove);
        OpenLayers.Event.observe(document, "mouseup", this._docUp)
    }, removeDocumentEvents: function () {
        OpenLayers.Element.removeClass(document.body, "olDragDown");
        this.documentEvents = !1;
        OpenLayers.Event.stopObserving(document, "mousemove", this._docMove);
        OpenLayers.Event.stopObserving(document, "mouseup", this._docUp)
    }, CLASS_NAME: "OpenLayers.Handler.Drag"});
OpenLayers.Handler.Box = OpenLayers.Class(OpenLayers.Handler, {dragHandler: null, boxDivClassName: "olHandlerBoxZoomBox", boxOffsets: null, initialize: function (a, b, c) {
    OpenLayers.Handler.prototype.initialize.apply(this, arguments);
    this.dragHandler = new OpenLayers.Handler.Drag(this, {down: this.startBox, move: this.moveBox, out: this.removeBox, up: this.endBox}, {keyMask: this.keyMask})
}, destroy: function () {
    OpenLayers.Handler.prototype.destroy.apply(this, arguments);
    this.dragHandler && (this.dragHandler.destroy(), this.dragHandler =
        null)
}, setMap: function (a) {
    OpenLayers.Handler.prototype.setMap.apply(this, arguments);
    this.dragHandler && this.dragHandler.setMap(a)
}, startBox: function (a) {
    this.callback("start", []);
    this.zoomBox = OpenLayers.Util.createDiv("zoomBox", {x: -9999, y: -9999});
    this.zoomBox.className = this.boxDivClassName;
    this.zoomBox.style.zIndex = this.map.Z_INDEX_BASE.Popup - 1;
    this.map.viewPortDiv.appendChild(this.zoomBox);
    OpenLayers.Element.addClass(this.map.viewPortDiv, "olDrawBox")
}, moveBox: function (a) {
    var b = this.dragHandler.start.x,
        c = this.dragHandler.start.y, d = Math.abs(b - a.x), e = Math.abs(c - a.y), f = this.getBoxOffsets();
    this.zoomBox.style.width = d + f.width + 1 + "px";
    this.zoomBox.style.height = e + f.height + 1 + "px";
    this.zoomBox.style.left = (a.x < b ? b - d - f.left : b - f.left) + "px";
    this.zoomBox.style.top = (a.y < c ? c - e - f.top : c - f.top) + "px"
}, endBox: function (a) {
    var b;
    if (5 < Math.abs(this.dragHandler.start.x - a.x) || 5 < Math.abs(this.dragHandler.start.y - a.y)) {
        var c = this.dragHandler.start;
        b = Math.min(c.y, a.y);
        var d = Math.max(c.y, a.y), e = Math.min(c.x, a.x);
        a = Math.max(c.x,
            a.x);
        b = new OpenLayers.Bounds(e, d, a, b)
    } else b = this.dragHandler.start.clone();
    this.removeBox();
    this.callback("done", [b])
}, removeBox: function () {
    this.map.viewPortDiv.removeChild(this.zoomBox);
    this.boxOffsets = this.zoomBox = null;
    OpenLayers.Element.removeClass(this.map.viewPortDiv, "olDrawBox")
}, activate: function () {
    return OpenLayers.Handler.prototype.activate.apply(this, arguments) ? (this.dragHandler.activate(), !0) : !1
}, deactivate: function () {
    return OpenLayers.Handler.prototype.deactivate.apply(this, arguments) ?
        (this.dragHandler.deactivate() && this.zoomBox && this.removeBox(), !0) : !1
}, getBoxOffsets: function () {
    if (!this.boxOffsets) {
        var a = document.createElement("div");
        a.style.position = "absolute";
        a.style.border = "1px solid black";
        a.style.width = "3px";
        document.body.appendChild(a);
        var b = 3 == a.clientWidth;
        document.body.removeChild(a);
        var a = parseInt(OpenLayers.Element.getStyle(this.zoomBox, "border-left-width")), c = parseInt(OpenLayers.Element.getStyle(this.zoomBox, "border-right-width")), d = parseInt(OpenLayers.Element.getStyle(this.zoomBox,
            "border-top-width")), e = parseInt(OpenLayers.Element.getStyle(this.zoomBox, "border-bottom-width"));
        this.boxOffsets = {left: a, right: c, top: d, bottom: e, width: !1 === b ? a + c : 0, height: !1 === b ? d + e : 0}
    }
    return this.boxOffsets
}, CLASS_NAME: "OpenLayers.Handler.Box"});
OpenLayers.Control.ZoomBox = OpenLayers.Class(OpenLayers.Control, {type: OpenLayers.Control.TYPE_TOOL, out: !1, keyMask: null, alwaysZoom: !1, zoomOnClick: !0, draw: function () {
    this.handler = new OpenLayers.Handler.Box(this, {done: this.zoomBox}, {keyMask: this.keyMask})
}, zoomBox: function (a) {
    if (a instanceof OpenLayers.Bounds) {
        var b, c = a.getCenterPixel();
        if (this.out) {
            b = Math.min(this.map.size.h / (a.bottom - a.top), this.map.size.w / (a.right - a.left));
            var d = this.map.getExtent(), e = this.map.getLonLatFromPixel(c), f = e.lon - d.getWidth() /
                2 * b;
            a = e.lon + d.getWidth() / 2 * b;
            var g = e.lat - d.getHeight() / 2 * b;
            b = e.lat + d.getHeight() / 2 * b;
            b = new OpenLayers.Bounds(f, g, a, b)
        } else f = this.map.getLonLatFromPixel({x: a.left, y: a.bottom}), a = this.map.getLonLatFromPixel({x: a.right, y: a.top}), b = new OpenLayers.Bounds(f.lon, f.lat, a.lon, a.lat);
        f = this.map.getZoom();
        g = this.map.getSize();
        a = g.w / 2;
        g = g.h / 2;
        b = this.map.getZoomForExtent(b);
        d = this.map.getResolution();
        e = this.map.getResolutionForZoom(b);
        d == e ? this.map.setCenter(this.map.getLonLatFromPixel(c)) : this.map.zoomTo(b,
            {x: (d * c.x - e * a) / (d - e), y: (d * c.y - e * g) / (d - e)});
        f == this.map.getZoom() && !0 == this.alwaysZoom && this.map.zoomTo(f + (this.out ? -1 : 1))
    } else this.zoomOnClick && (this.out ? this.map.zoomTo(this.map.getZoom() - 1, a) : this.map.zoomTo(this.map.getZoom() + 1, a))
}, CLASS_NAME: "OpenLayers.Control.ZoomBox"});
OpenLayers.Control.DragPan = OpenLayers.Class(OpenLayers.Control, {type: OpenLayers.Control.TYPE_TOOL, panned: !1, interval: 0, documentDrag: !1, kinetic: null, enableKinetic: !0, kineticInterval: 10, draw: function () {
    if (this.enableKinetic && OpenLayers.Kinetic) {
        var a = {interval: this.kineticInterval};
        "object" === typeof this.enableKinetic && (a = OpenLayers.Util.extend(a, this.enableKinetic));
        this.kinetic = new OpenLayers.Kinetic(a)
    }
    this.handler = new OpenLayers.Handler.Drag(this, {move: this.panMap, done: this.panMapDone, down: this.panMapStart},
        {interval: this.interval, documentDrag: this.documentDrag})
}, panMapStart: function () {
    this.kinetic && this.kinetic.begin()
}, panMap: function (a) {
    this.kinetic && this.kinetic.update(a);
    this.panned = !0;
    this.map.pan(this.handler.last.x - a.x, this.handler.last.y - a.y, {dragging: !0, animate: !1})
}, panMapDone: function (a) {
    if (this.panned) {
        var b = null;
        this.kinetic && (b = this.kinetic.end(a));
        this.map.pan(this.handler.last.x - a.x, this.handler.last.y - a.y, {dragging: !!b, animate: !1});
        if (b) {
            var c = this;
            this.kinetic.move(b, function (a, b, f) {
                c.map.pan(a, b, {dragging: !f, animate: !1})
            })
        }
        this.panned = !1
    }
}, CLASS_NAME: "OpenLayers.Control.DragPan"});
OpenLayers.Handler.Click = OpenLayers.Class(OpenLayers.Handler, {delay: 300, single: !0, "double": !1, pixelTolerance: 0, dblclickTolerance: 13, stopSingle: !1, stopDouble: !1, timerId: null, down: null, last: null, first: null, rightclickTimerId: null, touchstart: function (a) {
    this.startTouch();
    this.down = this.getEventInfo(a);
    this.last = this.getEventInfo(a);
    return!0
}, touchmove: function (a) {
    this.last = this.getEventInfo(a);
    return!0
}, touchend: function (a) {
    this.down && (a.xy = this.last.xy, a.lastTouches = this.last.touches, this.handleSingle(a),
        this.down = null);
    return!0
}, mousedown: function (a) {
    this.down = this.getEventInfo(a);
    this.last = this.getEventInfo(a);
    return!0
}, mouseup: function (a) {
    var b = !0;
    this.checkModifiers(a) && (this.control.handleRightClicks && OpenLayers.Event.isRightClick(a)) && (b = this.rightclick(a));
    return b
}, rightclick: function (a) {
    if (this.passesTolerance(a)) {
        if (null != this.rightclickTimerId)return this.clearTimer(), this.callback("dblrightclick", [a]), !this.stopDouble;
        a = this["double"] ? OpenLayers.Util.extend({}, a) : this.callback("rightclick",
            [a]);
        a = OpenLayers.Function.bind(this.delayedRightCall, this, a);
        this.rightclickTimerId = window.setTimeout(a, this.delay)
    }
    return!this.stopSingle
}, delayedRightCall: function (a) {
    this.rightclickTimerId = null;
    a && this.callback("rightclick", [a])
}, click: function (a) {
    this.last || (this.last = this.getEventInfo(a));
    this.handleSingle(a);
    return!this.stopSingle
}, dblclick: function (a) {
    this.handleDouble(a);
    return!this.stopDouble
}, handleDouble: function (a) {
    this.passesDblclickTolerance(a) && (this["double"] && this.callback("dblclick",
        [a]), this.clearTimer())
}, handleSingle: function (a) {
    this.passesTolerance(a) && (null != this.timerId ? (this.last.touches && 1 === this.last.touches.length && (this["double"] && OpenLayers.Event.preventDefault(a), this.handleDouble(a)), this.last.touches && 2 === this.last.touches.length || this.clearTimer()) : (this.first = this.getEventInfo(a), a = this.single ? OpenLayers.Util.extend({}, a) : null, this.queuePotentialClick(a)))
}, queuePotentialClick: function (a) {
    this.timerId = window.setTimeout(OpenLayers.Function.bind(this.delayedCall,
        this, a), this.delay)
}, passesTolerance: function (a) {
    var b = !0;
    if (null != this.pixelTolerance && this.down && this.down.xy && (b = this.pixelTolerance >= this.down.xy.distanceTo(a.xy)) && this.touch && this.down.touches.length === this.last.touches.length) {
        a = 0;
        for (var c = this.down.touches.length; a < c; ++a)if (this.getTouchDistance(this.down.touches[a], this.last.touches[a]) > this.pixelTolerance) {
            b = !1;
            break
        }
    }
    return b
}, getTouchDistance: function (a, b) {
    return Math.sqrt(Math.pow(a.clientX - b.clientX, 2) + Math.pow(a.clientY - b.clientY,
        2))
}, passesDblclickTolerance: function (a) {
    a = !0;
    this.down && this.first && (a = this.down.xy.distanceTo(this.first.xy) <= this.dblclickTolerance);
    return a
}, clearTimer: function () {
    null != this.timerId && (window.clearTimeout(this.timerId), this.timerId = null);
    null != this.rightclickTimerId && (window.clearTimeout(this.rightclickTimerId), this.rightclickTimerId = null)
}, delayedCall: function (a) {
    this.timerId = null;
    a && this.callback("click", [a])
}, getEventInfo: function (a) {
    var b;
    if (a.touches) {
        var c = a.touches.length;
        b = Array(c);
        for (var d,
                 e = 0; e < c; e++)d = a.touches[e], b[e] = {clientX: d.olClientX, clientY: d.olClientY}
    }
    return{xy: a.xy, touches: b}
}, deactivate: function () {
    var a = !1;
    OpenLayers.Handler.prototype.deactivate.apply(this, arguments) && (this.clearTimer(), this.last = this.first = this.down = null, a = !0);
    return a
}, CLASS_NAME: "OpenLayers.Handler.Click"});
OpenLayers.Control.Navigation = OpenLayers.Class(OpenLayers.Control, {dragPan: null, dragPanOptions: null, pinchZoom: null, pinchZoomOptions: null, documentDrag: !1, zoomBox: null, zoomBoxEnabled: !0, zoomWheelEnabled: !0, mouseWheelOptions: null, handleRightClicks: !1, zoomBoxKeyMask: OpenLayers.Handler.MOD_SHIFT, autoActivate: !0, initialize: function (a) {
    this.handlers = {};
    OpenLayers.Control.prototype.initialize.apply(this, arguments)
}, destroy: function () {
    this.deactivate();
    this.dragPan && this.dragPan.destroy();
    this.dragPan = null;
    this.zoomBox && this.zoomBox.destroy();
    this.zoomBox = null;
    this.pinchZoom && this.pinchZoom.destroy();
    this.pinchZoom = null;
    OpenLayers.Control.prototype.destroy.apply(this, arguments)
}, activate: function () {
    this.dragPan.activate();
    this.zoomWheelEnabled && this.handlers.wheel.activate();
    this.handlers.click.activate();
    this.zoomBoxEnabled && this.zoomBox.activate();
    this.pinchZoom && this.pinchZoom.activate();
    return OpenLayers.Control.prototype.activate.apply(this, arguments)
}, deactivate: function () {
    this.pinchZoom && this.pinchZoom.deactivate();
    this.zoomBox.deactivate();
    this.dragPan.deactivate();
    this.handlers.click.deactivate();
    this.handlers.wheel.deactivate();
    return OpenLayers.Control.prototype.deactivate.apply(this, arguments)
}, draw: function () {
    this.handleRightClicks && (this.map.viewPortDiv.oncontextmenu = OpenLayers.Function.False);
    this.handlers.click = new OpenLayers.Handler.Click(this, {click: this.defaultClick, dblclick: this.defaultDblClick, dblrightclick: this.defaultDblRightClick}, {"double": !0, stopDouble: !0});
    this.dragPan = new OpenLayers.Control.DragPan(OpenLayers.Util.extend({map: this.map,
        documentDrag: this.documentDrag}, this.dragPanOptions));
    this.zoomBox = new OpenLayers.Control.ZoomBox({map: this.map, keyMask: this.zoomBoxKeyMask});
    this.dragPan.draw();
    this.zoomBox.draw();
    this.handlers.wheel = new OpenLayers.Handler.MouseWheel(this, {up: this.wheelUp, down: this.wheelDown}, OpenLayers.Util.extend(this.map.fractionalZoom ? {} : {cumulative: !1, interval: 50, maxDelta: 6}, this.mouseWheelOptions));
    OpenLayers.Control.PinchZoom && (this.pinchZoom = new OpenLayers.Control.PinchZoom(OpenLayers.Util.extend({map: this.map},
        this.pinchZoomOptions)))
}, defaultClick: function (a) {
    a.lastTouches && 2 == a.lastTouches.length && this.map.zoomOut()
}, defaultDblClick: function (a) {
    this.map.zoomTo(this.map.zoom + 1, a.xy)
}, defaultDblRightClick: function (a) {
    this.map.zoomTo(this.map.zoom - 1, a.xy)
}, wheelChange: function (a, b) {
    this.map.fractionalZoom || (b = Math.round(b));
    var c = this.map.getZoom(), d;
    d = Math.max(c + b, 0);
    d = Math.min(d, this.map.getNumZoomLevels());
    d !== c && this.map.zoomTo(d, a.xy)
}, wheelUp: function (a, b) {
    this.wheelChange(a, b || 1)
}, wheelDown: function (a, b) {
    this.wheelChange(a, b || -1)
}, disableZoomBox: function () {
    this.zoomBoxEnabled = !1;
    this.zoomBox.deactivate()
}, enableZoomBox: function () {
    this.zoomBoxEnabled = !0;
    this.active && this.zoomBox.activate()
}, disableZoomWheel: function () {
    this.zoomWheelEnabled = !1;
    this.handlers.wheel.deactivate()
}, enableZoomWheel: function () {
    this.zoomWheelEnabled = !0;
    this.active && this.handlers.wheel.activate()
}, CLASS_NAME: "OpenLayers.Control.Navigation"});
OpenLayers.Layer.WMS = OpenLayers.Class(OpenLayers.Layer.Grid, {DEFAULT_PARAMS: {service: "WMS", version: "1.1.1", request: "GetMap", styles: "", format: "image/jpeg"}, isBaseLayer: !0, encodeBBOX: !1, noMagic: !1, yx: {}, initialize: function (a, b, c, d) {
    var e = [];
    c = OpenLayers.Util.upperCaseObject(c);
    1.3 <= parseFloat(c.VERSION) && !c.EXCEPTIONS && (c.EXCEPTIONS = "INIMAGE");
    e.push(a, b, c, d);
    OpenLayers.Layer.Grid.prototype.initialize.apply(this, e);
    OpenLayers.Util.applyDefaults(this.params, OpenLayers.Util.upperCaseObject(this.DEFAULT_PARAMS));
    !this.noMagic && (this.params.TRANSPARENT && "true" == this.params.TRANSPARENT.toString().toLowerCase()) && (null != d && d.isBaseLayer || (this.isBaseLayer = !1), "image/jpeg" == this.params.FORMAT && (this.params.FORMAT = OpenLayers.Util.alphaHack() ? "image/gif" : "image/png"))
}, clone: function (a) {
    null == a && (a = new OpenLayers.Layer.WMS(this.name, this.url, this.params, this.getOptions()));
    return a = OpenLayers.Layer.Grid.prototype.clone.apply(this, [a])
}, reverseAxisOrder: function () {
    var a = this.projection.getCode();
    return 1.3 <= parseFloat(this.params.VERSION) && !!(this.yx[a] || OpenLayers.Projection.defaults[a] && OpenLayers.Projection.defaults[a].yx)
}, getURL: function (a) {
    a = this.adjustBounds(a);
    var b = this.getImageSize(), c = {}, d = this.reverseAxisOrder();
    c.BBOX = this.encodeBBOX ? a.toBBOX(null, d) : a.toArray(d);
    c.WIDTH = b.w;
    c.HEIGHT = b.h;
    return this.getFullRequestString(c)
}, mergeNewParams: function (a) {
    a = [OpenLayers.Util.upperCaseObject(a)];
    return OpenLayers.Layer.Grid.prototype.mergeNewParams.apply(this, a)
}, getFullRequestString: function (a, b) {
    var c = this.map.getProjectionObject(),
        c = this.projection && this.projection.equals(c) ? this.projection.getCode() : c.getCode(), c = "none" == c ? null : c;
    1.3 <= parseFloat(this.params.VERSION) ? this.params.CRS = c : this.params.SRS = c;
    "boolean" == typeof this.params.TRANSPARENT && (a.TRANSPARENT = this.params.TRANSPARENT ? "TRUE" : "FALSE");
    return OpenLayers.Layer.Grid.prototype.getFullRequestString.apply(this, arguments)
}, CLASS_NAME: "OpenLayers.Layer.WMS"});
OpenLayers.Renderer.SVG = OpenLayers.Class(OpenLayers.Renderer.Elements, {xmlns: "http://www.w3.org/2000/svg", xlinkns: "http://www.w3.org/1999/xlink", MAX_PIXEL: 15E3, translationParameters: null, symbolMetrics: null, initialize: function (a) {
    this.supported() && (OpenLayers.Renderer.Elements.prototype.initialize.apply(this, arguments), this.translationParameters = {x: 0, y: 0}, this.symbolMetrics = {})
}, supported: function () {
    return document.implementation && (document.implementation.hasFeature("org.w3c.svg", "1.0") || document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#SVG",
        "1.1") || document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1"))
}, inValidRange: function (a, b, c) {
    a += c ? 0 : this.translationParameters.x;
    b += c ? 0 : this.translationParameters.y;
    return a >= -this.MAX_PIXEL && a <= this.MAX_PIXEL && b >= -this.MAX_PIXEL && b <= this.MAX_PIXEL
}, setExtent: function (a, b) {
    var c = OpenLayers.Renderer.Elements.prototype.setExtent.apply(this, arguments), d = this.getResolution(), e = -a.left / d, d = a.top / d;
    if (b)return this.left = e, this.top = d, this.rendererRoot.setAttributeNS(null,
        "viewBox", "0 0 " + this.size.w + " " + this.size.h), this.translate(this.xOffset, 0), !0;
    (e = this.translate(e - this.left + this.xOffset, d - this.top)) || this.setExtent(a, !0);
    return c && e
}, translate: function (a, b) {
    if (this.inValidRange(a, b, !0)) {
        var c = "";
        if (a || b)c = "translate(" + a + "," + b + ")";
        this.root.setAttributeNS(null, "transform", c);
        this.translationParameters = {x: a, y: b};
        return!0
    }
    return!1
}, setSize: function (a) {
    OpenLayers.Renderer.prototype.setSize.apply(this, arguments);
    this.rendererRoot.setAttributeNS(null, "width", this.size.w);
    this.rendererRoot.setAttributeNS(null, "height", this.size.h)
}, getNodeType: function (a, b) {
    var c = null;
    switch (a.CLASS_NAME) {
        case "OpenLayers.Geometry.Point":
            c = b.externalGraphic ? "image" : this.isComplexSymbol(b.graphicName) ? "svg" : "circle";
            break;
        case "OpenLayers.Geometry.Rectangle":
            c = "rect";
            break;
        case "OpenLayers.Geometry.LineString":
            c = "polyline";
            break;
        case "OpenLayers.Geometry.LinearRing":
            c = "polygon";
            break;
        case "OpenLayers.Geometry.Polygon":
        case "OpenLayers.Geometry.Curve":
            c = "path"
    }
    return c
}, setStyle: function (a, b, c) {
    b = b || a._style;
    c = c || a._options;
    var d = b.title || b.graphicTitle;
    if (d) {
        a.setAttributeNS(null, "title", d);
        var e = a.getElementsByTagName("title");
        0 < e.length ? e[0].firstChild.textContent = d : (e = this.nodeFactory(null, "title"), e.textContent = d, a.appendChild(e))
    }
    var e = parseFloat(a.getAttributeNS(null, "r")), d = 1, f;
    if ("OpenLayers.Geometry.Point" == a._geometryClass && e) {
        a.style.visibility = "";
        if (!1 === b.graphic)a.style.visibility = "hidden"; else if (b.externalGraphic) {
            f = this.getPosition(a);
            b.graphicWidth && b.graphicHeight &&
            a.setAttributeNS(null, "preserveAspectRatio", "none");
            var e = b.graphicWidth || b.graphicHeight, g = b.graphicHeight || b.graphicWidth, e = e ? e : 2 * b.pointRadius, g = g ? g : 2 * b.pointRadius, h = void 0 != b.graphicYOffset ? b.graphicYOffset : -(0.5 * g), k = b.graphicOpacity || b.fillOpacity;
            a.setAttributeNS(null, "x", (f.x + (void 0 != b.graphicXOffset ? b.graphicXOffset : -(0.5 * e))).toFixed());
            a.setAttributeNS(null, "y", (f.y + h).toFixed());
            a.setAttributeNS(null, "width", e);
            a.setAttributeNS(null, "height", g);
            a.setAttributeNS(this.xlinkns, "xlink:href",
                b.externalGraphic);
            a.setAttributeNS(null, "style", "opacity: " + k);
            a.onclick = OpenLayers.Event.preventDefault
        } else if (this.isComplexSymbol(b.graphicName)) {
            var e = 3 * b.pointRadius, g = 2 * e, l = this.importSymbol(b.graphicName);
            f = this.getPosition(a);
            d = 3 * this.symbolMetrics[l.id][0] / g;
            h = a.parentNode;
            k = a.nextSibling;
            h && h.removeChild(a);
            a.firstChild && a.removeChild(a.firstChild);
            a.appendChild(l.firstChild.cloneNode(!0));
            a.setAttributeNS(null, "viewBox", l.getAttributeNS(null, "viewBox"));
            a.setAttributeNS(null, "width",
                g);
            a.setAttributeNS(null, "height", g);
            a.setAttributeNS(null, "x", f.x - e);
            a.setAttributeNS(null, "y", f.y - e);
            k ? h.insertBefore(a, k) : h && h.appendChild(a)
        } else a.setAttributeNS(null, "r", b.pointRadius);
        e = b.rotation;
        void 0 === e && void 0 === a._rotation || !f || (a._rotation = e, e |= 0, "svg" !== a.nodeName ? a.setAttributeNS(null, "transform", "rotate(" + e + " " + f.x + " " + f.y + ")") : (f = this.symbolMetrics[l.id], a.firstChild.setAttributeNS(null, "transform", "rotate(" + e + " " + f[1] + " " + f[2] + ")")))
    }
    c.isFilled ? (a.setAttributeNS(null, "fill", b.fillColor),
        a.setAttributeNS(null, "fill-opacity", b.fillOpacity)) : a.setAttributeNS(null, "fill", "none");
    c.isStroked ? (a.setAttributeNS(null, "stroke", b.strokeColor), a.setAttributeNS(null, "stroke-opacity", b.strokeOpacity), a.setAttributeNS(null, "stroke-width", b.strokeWidth * d), a.setAttributeNS(null, "stroke-linecap", b.strokeLinecap || "round"), a.setAttributeNS(null, "stroke-linejoin", "round"), b.strokeDashstyle && a.setAttributeNS(null, "stroke-dasharray", this.dashStyle(b, d))) : a.setAttributeNS(null, "stroke", "none");
    b.pointerEvents &&
    a.setAttributeNS(null, "pointer-events", b.pointerEvents);
    null != b.cursor && a.setAttributeNS(null, "cursor", b.cursor);
    return a
}, dashStyle: function (a, b) {
    var c = a.strokeWidth * b, d = a.strokeDashstyle;
    switch (d) {
        case "solid":
            return"none";
        case "dot":
            return[1, 4 * c].join();
        case "dash":
            return[4 * c, 4 * c].join();
        case "dashdot":
            return[4 * c, 4 * c, 1, 4 * c].join();
        case "longdash":
            return[8 * c, 4 * c].join();
        case "longdashdot":
            return[8 * c, 4 * c, 1, 4 * c].join();
        default:
            return OpenLayers.String.trim(d).replace(/\s+/g, ",")
    }
}, createNode: function (a, b) {
    var c = document.createElementNS(this.xmlns, a);
    b && c.setAttributeNS(null, "id", b);
    return c
}, nodeTypeCompare: function (a, b) {
    return b == a.nodeName
}, createRenderRoot: function () {
    var a = this.nodeFactory(this.container.id + "_svgRoot", "svg");
    a.style.display = "block";
    return a
}, createRoot: function (a) {
    return this.nodeFactory(this.container.id + a, "g")
}, createDefs: function () {
    var a = this.nodeFactory(this.container.id + "_defs", "defs");
    this.rendererRoot.appendChild(a);
    return a
}, drawPoint: function (a, b) {
    return this.drawCircle(a,
        b, 1)
}, drawCircle: function (a, b, c) {
    var d = this.getResolution(), e = (b.x - this.featureDx) / d + this.left;
    b = this.top - b.y / d;
    return this.inValidRange(e, b) ? (a.setAttributeNS(null, "cx", e), a.setAttributeNS(null, "cy", b), a.setAttributeNS(null, "r", c), a) : !1
}, drawLineString: function (a, b) {
    var c = this.getComponentsString(b.components);
    return c.path ? (a.setAttributeNS(null, "points", c.path), c.complete ? a : null) : !1
}, drawLinearRing: function (a, b) {
    var c = this.getComponentsString(b.components);
    return c.path ? (a.setAttributeNS(null,
        "points", c.path), c.complete ? a : null) : !1
}, drawPolygon: function (a, b) {
    for (var c = "", d = !0, e = !0, f, g, h = 0, k = b.components.length; h < k; h++)c += " M", f = this.getComponentsString(b.components[h].components, " "), (g = f.path) ? (c += " " + g, e = f.complete && e) : d = !1;
    return d ? (a.setAttributeNS(null, "d", c + " z"), a.setAttributeNS(null, "fill-rule", "evenodd"), e ? a : null) : !1
}, drawRectangle: function (a, b) {
    var c = this.getResolution(), d = (b.x - this.featureDx) / c + this.left, e = this.top - b.y / c;
    return this.inValidRange(d, e) ? (a.setAttributeNS(null, "x",
        d), a.setAttributeNS(null, "y", e), a.setAttributeNS(null, "width", b.width / c), a.setAttributeNS(null, "height", b.height / c), a) : !1
}, drawText: function (a, b, c) {
    var d = !!b.labelOutlineWidth;
    if (d) {
        var e = OpenLayers.Util.extend({}, b);
        e.fontColor = e.labelOutlineColor;
        e.fontStrokeColor = e.labelOutlineColor;
        e.fontStrokeWidth = b.labelOutlineWidth;
        b.labelOutlineOpacity && (e.fontOpacity = b.labelOutlineOpacity);
        delete e.labelOutlineWidth;
        this.drawText(a, e, c)
    }
    var f = this.getResolution(), e = (c.x - this.featureDx) / f + this.left, g = c.y /
        f - this.top, d = d ? this.LABEL_OUTLINE_SUFFIX : this.LABEL_ID_SUFFIX, f = this.nodeFactory(a + d, "text");
    f.setAttributeNS(null, "x", e);
    f.setAttributeNS(null, "y", -g);
    b.fontColor && f.setAttributeNS(null, "fill", b.fontColor);
    b.fontStrokeColor && f.setAttributeNS(null, "stroke", b.fontStrokeColor);
    b.fontStrokeWidth && f.setAttributeNS(null, "stroke-width", b.fontStrokeWidth);
    b.fontOpacity && f.setAttributeNS(null, "opacity", b.fontOpacity);
    b.fontFamily && f.setAttributeNS(null, "font-family", b.fontFamily);
    b.fontSize && f.setAttributeNS(null,
        "font-size", b.fontSize);
    b.fontWeight && f.setAttributeNS(null, "font-weight", b.fontWeight);
    b.fontStyle && f.setAttributeNS(null, "font-style", b.fontStyle);
    !0 === b.labelSelect ? (f.setAttributeNS(null, "pointer-events", "visible"), f._featureId = a) : f.setAttributeNS(null, "pointer-events", "none");
    g = b.labelAlign || OpenLayers.Renderer.defaultSymbolizer.labelAlign;
    f.setAttributeNS(null, "text-anchor", OpenLayers.Renderer.SVG.LABEL_ALIGN[g[0]] || "middle");
    !0 === OpenLayers.IS_GECKO && f.setAttributeNS(null, "dominant-baseline",
        OpenLayers.Renderer.SVG.LABEL_ALIGN[g[1]] || "central");
    for (var h = b.label.split("\n"), k = h.length; f.childNodes.length > k;)f.removeChild(f.lastChild);
    for (var l = 0; l < k; l++) {
        var m = this.nodeFactory(a + d + "_tspan_" + l, "tspan");
        !0 === b.labelSelect && (m._featureId = a, m._geometry = c, m._geometryClass = c.CLASS_NAME);
        !1 === OpenLayers.IS_GECKO && m.setAttributeNS(null, "baseline-shift", OpenLayers.Renderer.SVG.LABEL_VSHIFT[g[1]] || "-35%");
        m.setAttribute("x", e);
        if (0 == l) {
            var r = OpenLayers.Renderer.SVG.LABEL_VFACTOR[g[1]];
            null == r &&
            (r = -0.5);
            m.setAttribute("dy", r * (k - 1) + "em")
        } else m.setAttribute("dy", "1em");
        m.textContent = "" === h[l] ? " " : h[l];
        m.parentNode || f.appendChild(m)
    }
    f.parentNode || this.textRoot.appendChild(f)
}, getComponentsString: function (a, b) {
    for (var c = [], d = !0, e = a.length, f = [], g, h = 0; h < e; h++)g = a[h], c.push(g), (g = this.getShortString(g)) ? f.push(g) : (0 < h && this.getShortString(a[h - 1]) && f.push(this.clipLine(a[h], a[h - 1])), h < e - 1 && this.getShortString(a[h + 1]) && f.push(this.clipLine(a[h], a[h + 1])), d = !1);
    return{path: f.join(b || ","), complete: d}
},
    clipLine: function (a, b) {
        if (b.equals(a))return"";
        var c = this.getResolution(), d = this.MAX_PIXEL - this.translationParameters.x, e = this.MAX_PIXEL - this.translationParameters.y, f = (b.x - this.featureDx) / c + this.left, g = this.top - b.y / c, h = (a.x - this.featureDx) / c + this.left, c = this.top - a.y / c, k;
        if (h < -d || h > d)k = (c - g) / (h - f), h = 0 > h ? -d : d, c = g + (h - f) * k;
        if (c < -e || c > e)k = (h - f) / (c - g), c = 0 > c ? -e : e, h = f + (c - g) * k;
        return h + "," + c
    }, getShortString: function (a) {
        var b = this.getResolution(), c = (a.x - this.featureDx) / b + this.left;
        a = this.top - a.y / b;
        return this.inValidRange(c,
            a) ? c + "," + a : !1
    }, getPosition: function (a) {
        return{x: parseFloat(a.getAttributeNS(null, "cx")), y: parseFloat(a.getAttributeNS(null, "cy"))}
    }, importSymbol: function (a) {
        this.defs || (this.defs = this.createDefs());
        var b = this.container.id + "-" + a, c = document.getElementById(b);
        if (null != c)return c;
        var d = OpenLayers.Renderer.symbol[a];
        if (!d)throw Error(a + " is not a valid symbol name");
        a = this.nodeFactory(b, "symbol");
        var e = this.nodeFactory(null, "polygon");
        a.appendChild(e);
        for (var c = new OpenLayers.Bounds(Number.MAX_VALUE, Number.MAX_VALUE,
            0, 0), f = [], g, h, k = 0; k < d.length; k += 2)g = d[k], h = d[k + 1], c.left = Math.min(c.left, g), c.bottom = Math.min(c.bottom, h), c.right = Math.max(c.right, g), c.top = Math.max(c.top, h), f.push(g, ",", h);
        e.setAttributeNS(null, "points", f.join(" "));
        d = c.getWidth();
        e = c.getHeight();
        a.setAttributeNS(null, "viewBox", [c.left - d, c.bottom - e, 3 * d, 3 * e].join(" "));
        this.symbolMetrics[b] = [Math.max(d, e), c.getCenterLonLat().lon, c.getCenterLonLat().lat];
        this.defs.appendChild(a);
        return a
    }, getFeatureIdFromEvent: function (a) {
        var b = OpenLayers.Renderer.Elements.prototype.getFeatureIdFromEvent.apply(this,
            arguments);
        b || (b = a.target, b = b.parentNode && b != this.rendererRoot ? b.parentNode._featureId : void 0);
        return b
    }, CLASS_NAME: "OpenLayers.Renderer.SVG"});
OpenLayers.Renderer.SVG.LABEL_ALIGN = {l: "start", r: "end", b: "bottom", t: "hanging"};
OpenLayers.Renderer.SVG.LABEL_VSHIFT = {t: "-70%", b: "0"};
OpenLayers.Renderer.SVG.LABEL_VFACTOR = {t: 0, b: -1};
OpenLayers.Renderer.SVG.preventDefault = function (a) {
    OpenLayers.Event.preventDefault(a)
};
OpenLayers.Popup = OpenLayers.Class({events: null, id: "", lonlat: null, div: null, contentSize: null, size: null, contentHTML: null, backgroundColor: "", opacity: "", border: "", contentDiv: null, groupDiv: null, closeDiv: null, autoSize: !1, minSize: null, maxSize: null, displayClass: "olPopup", contentDisplayClass: "olPopupContent", padding: 0, disableFirefoxOverflowHack: !1, fixPadding: function () {
    "number" == typeof this.padding && (this.padding = new OpenLayers.Bounds(this.padding, this.padding, this.padding, this.padding))
}, panMapIfOutOfView: !1,
    keepInMap: !1, closeOnMove: !1, map: null, initialize: function (a, b, c, d, e, f) {
        null == a && (a = OpenLayers.Util.createUniqueID(this.CLASS_NAME + "_"));
        this.id = a;
        this.lonlat = b;
        this.contentSize = null != c ? c : new OpenLayers.Size(OpenLayers.Popup.WIDTH, OpenLayers.Popup.HEIGHT);
        null != d && (this.contentHTML = d);
        this.backgroundColor = OpenLayers.Popup.COLOR;
        this.opacity = OpenLayers.Popup.OPACITY;
        this.border = OpenLayers.Popup.BORDER;
        this.div = OpenLayers.Util.createDiv(this.id, null, null, null, null, null, "hidden");
        this.div.className = this.displayClass;
        this.groupDiv = OpenLayers.Util.createDiv(this.id + "_GroupDiv", null, null, null, "relative", null, "hidden");
        a = this.div.id + "_contentDiv";
        this.contentDiv = OpenLayers.Util.createDiv(a, null, this.contentSize.clone(), null, "relative");
        this.contentDiv.className = this.contentDisplayClass;
        this.groupDiv.appendChild(this.contentDiv);
        this.div.appendChild(this.groupDiv);
        e && this.addCloseBox(f);
        this.registerEvents()
    }, destroy: function () {
        this.border = this.opacity = this.backgroundColor = this.contentHTML = this.size = this.lonlat = this.id =
            null;
        this.closeOnMove && this.map && this.map.events.unregister("movestart", this, this.hide);
        this.events.destroy();
        this.events = null;
        this.closeDiv && (OpenLayers.Event.stopObservingElement(this.closeDiv), this.groupDiv.removeChild(this.closeDiv));
        this.closeDiv = null;
        this.div.removeChild(this.groupDiv);
        this.groupDiv = null;
        null != this.map && this.map.removePopup(this);
        this.panMapIfOutOfView = this.padding = this.maxSize = this.minSize = this.autoSize = this.div = this.map = null
    }, draw: function (a) {
        null == a && null != this.lonlat && null !=
            this.map && (a = this.map.getLayerPxFromLonLat(this.lonlat));
        this.closeOnMove && this.map.events.register("movestart", this, this.hide);
        this.disableFirefoxOverflowHack || "firefox" != OpenLayers.BROWSER_NAME || (this.map.events.register("movestart", this, function () {
            var a = document.defaultView.getComputedStyle(this.contentDiv, null).getPropertyValue("overflow");
            "hidden" != a && (this.contentDiv._oldOverflow = a, this.contentDiv.style.overflow = "hidden")
        }), this.map.events.register("moveend", this, function () {
            var a = this.contentDiv._oldOverflow;
            a && (this.contentDiv.style.overflow = a, this.contentDiv._oldOverflow = null)
        }));
        this.moveTo(a);
        this.autoSize || this.size || this.setSize(this.contentSize);
        this.setBackgroundColor();
        this.setOpacity();
        this.setBorder();
        this.setContentHTML();
        this.panMapIfOutOfView && this.panIntoView();
        return this.div
    }, updatePosition: function () {
        if (this.lonlat && this.map) {
            var a = this.map.getLayerPxFromLonLat(this.lonlat);
            a && this.moveTo(a)
        }
    }, moveTo: function (a) {
        null != a && null != this.div && (this.div.style.left = a.x + "px", this.div.style.top =
            a.y + "px")
    }, visible: function () {
        return OpenLayers.Element.visible(this.div)
    }, toggle: function () {
        this.visible() ? this.hide() : this.show()
    }, show: function () {
        this.div.style.display = "";
        this.panMapIfOutOfView && this.panIntoView()
    }, hide: function () {
        this.div.style.display = "none"
    }, setSize: function (a) {
        this.size = a.clone();
        var b = this.getContentDivPadding(), c = b.left + b.right, d = b.top + b.bottom;
        this.fixPadding();
        c += this.padding.left + this.padding.right;
        d += this.padding.top + this.padding.bottom;
        if (this.closeDiv)var e = parseInt(this.closeDiv.style.width),
            c = c + (e + b.right);
        this.size.w += c;
        this.size.h += d;
        "msie" == OpenLayers.BROWSER_NAME && (this.contentSize.w += b.left + b.right, this.contentSize.h += b.bottom + b.top);
        null != this.div && (this.div.style.width = this.size.w + "px", this.div.style.height = this.size.h + "px");
        null != this.contentDiv && (this.contentDiv.style.width = a.w + "px", this.contentDiv.style.height = a.h + "px")
    }, updateSize: function () {
        var a = "<div class='" + this.contentDisplayClass + "'>" + this.contentDiv.innerHTML + "</div>", b = this.map ? this.map.div : document.body, c = OpenLayers.Util.getRenderedDimensions(a,
            null, {displayClass: this.displayClass, containerElement: b}), d = this.getSafeContentSize(c), e = null;
        d.equals(c) ? e = c : (c = {w: d.w < c.w ? d.w : null, h: d.h < c.h ? d.h : null}, c.w && c.h ? e = d : (a = OpenLayers.Util.getRenderedDimensions(a, c, {displayClass: this.contentDisplayClass, containerElement: b}), "hidden" != OpenLayers.Element.getStyle(this.contentDiv, "overflow") && a.equals(d) && (d = OpenLayers.Util.getScrollbarWidth(), c.w ? a.h += d : a.w += d), e = this.getSafeContentSize(a)));
        this.setSize(e)
    }, setBackgroundColor: function (a) {
        void 0 != a && (this.backgroundColor =
            a);
        null != this.div && (this.div.style.backgroundColor = this.backgroundColor)
    }, setOpacity: function (a) {
        void 0 != a && (this.opacity = a);
        null != this.div && (this.div.style.opacity = this.opacity, this.div.style.filter = "alpha(opacity=" + 100 * this.opacity + ")")
    }, setBorder: function (a) {
        void 0 != a && (this.border = a);
        null != this.div && (this.div.style.border = this.border)
    }, setContentHTML: function (a) {
        null != a && (this.contentHTML = a);
        null != this.contentDiv && (null != this.contentHTML && this.contentHTML != this.contentDiv.innerHTML) && (this.contentDiv.innerHTML =
            this.contentHTML, this.autoSize && (this.registerImageListeners(), this.updateSize()))
    }, registerImageListeners: function () {
        for (var a = function () {
            null !== this.popup.id && (this.popup.updateSize(), this.popup.visible() && this.popup.panMapIfOutOfView && this.popup.panIntoView(), OpenLayers.Event.stopObserving(this.img, "load", this.img._onImgLoad))
        }, b = this.contentDiv.getElementsByTagName("img"), c = 0, d = b.length; c < d; c++) {
            var e = b[c];
            if (0 == e.width || 0 == e.height)e._onImgLoad = OpenLayers.Function.bind(a, {popup: this, img: e}),
                OpenLayers.Event.observe(e, "load", e._onImgLoad)
        }
    }, getSafeContentSize: function (a) {
        a = a.clone();
        var b = this.getContentDivPadding(), c = b.left + b.right, d = b.top + b.bottom;
        this.fixPadding();
        c += this.padding.left + this.padding.right;
        d += this.padding.top + this.padding.bottom;
        if (this.closeDiv)var e = parseInt(this.closeDiv.style.width), c = c + (e + b.right);
        this.minSize && (a.w = Math.max(a.w, this.minSize.w - c), a.h = Math.max(a.h, this.minSize.h - d));
        this.maxSize && (a.w = Math.min(a.w, this.maxSize.w - c), a.h = Math.min(a.h, this.maxSize.h -
            d));
        if (this.map && this.map.size) {
            e = b = 0;
            if (this.keepInMap && !this.panMapIfOutOfView)switch (e = this.map.getPixelFromLonLat(this.lonlat), this.relativePosition) {
                case "tr":
                    b = e.x;
                    e = this.map.size.h - e.y;
                    break;
                case "tl":
                    b = this.map.size.w - e.x;
                    e = this.map.size.h - e.y;
                    break;
                case "bl":
                    b = this.map.size.w - e.x;
                    e = e.y;
                    break;
                case "br":
                    b = e.x;
                    e = e.y;
                    break;
                default:
                    b = e.x, e = this.map.size.h - e.y
            }
            d = this.map.size.h - this.map.paddingForPopups.top - this.map.paddingForPopups.bottom - d - e;
            a.w = Math.min(a.w, this.map.size.w - this.map.paddingForPopups.left -
                this.map.paddingForPopups.right - c - b);
            a.h = Math.min(a.h, d)
        }
        return a
    }, getContentDivPadding: function () {
        var a = this._contentDivPadding;
        a || (null == this.div.parentNode && (this.div.style.display = "none", document.body.appendChild(this.div)), this._contentDivPadding = a = new OpenLayers.Bounds(OpenLayers.Element.getStyle(this.contentDiv, "padding-left"), OpenLayers.Element.getStyle(this.contentDiv, "padding-bottom"), OpenLayers.Element.getStyle(this.contentDiv, "padding-right"), OpenLayers.Element.getStyle(this.contentDiv,
            "padding-top")), this.div.parentNode == document.body && (document.body.removeChild(this.div), this.div.style.display = ""));
        return a
    }, addCloseBox: function (a) {
        this.closeDiv = OpenLayers.Util.createDiv(this.id + "_close", null, {w: 17, h: 17});
        this.closeDiv.className = "olPopupCloseBox";
        var b = this.getContentDivPadding();
        this.closeDiv.style.right = b.right + "px";
        this.closeDiv.style.top = b.top + "px";
        this.groupDiv.appendChild(this.closeDiv);
        a = a || function (a) {
            this.hide();
            OpenLayers.Event.stop(a)
        };
        OpenLayers.Event.observe(this.closeDiv,
            "touchend", OpenLayers.Function.bindAsEventListener(a, this));
        OpenLayers.Event.observe(this.closeDiv, "click", OpenLayers.Function.bindAsEventListener(a, this))
    }, panIntoView: function () {
        var a = this.map.getSize(), b = this.map.getViewPortPxFromLayerPx(new OpenLayers.Pixel(parseInt(this.div.style.left), parseInt(this.div.style.top))), c = b.clone();
        b.x < this.map.paddingForPopups.left ? c.x = this.map.paddingForPopups.left : b.x + this.size.w > a.w - this.map.paddingForPopups.right && (c.x = a.w - this.map.paddingForPopups.right - this.size.w);
        b.y < this.map.paddingForPopups.top ? c.y = this.map.paddingForPopups.top : b.y + this.size.h > a.h - this.map.paddingForPopups.bottom && (c.y = a.h - this.map.paddingForPopups.bottom - this.size.h);
        this.map.pan(b.x - c.x, b.y - c.y)
    }, registerEvents: function () {
        this.events = new OpenLayers.Events(this, this.div, null, !0);
        this.events.on({mousedown: this.onmousedown, mousemove: this.onmousemove, mouseup: this.onmouseup, click: this.onclick, mouseout: this.onmouseout, dblclick: this.ondblclick, touchstart: function (a) {
            OpenLayers.Event.stop(a, !0)
        },
            scope: this})
    }, onmousedown: function (a) {
        this.mousedown = !0;
        OpenLayers.Event.stop(a, !0)
    }, onmousemove: function (a) {
        this.mousedown && OpenLayers.Event.stop(a, !0)
    }, onmouseup: function (a) {
        this.mousedown && (this.mousedown = !1, OpenLayers.Event.stop(a, !0))
    }, onclick: function (a) {
        OpenLayers.Event.stop(a, !0)
    }, onmouseout: function (a) {
        this.mousedown = !1
    }, ondblclick: function (a) {
        OpenLayers.Event.stop(a, !0)
    }, CLASS_NAME: "OpenLayers.Popup"});
OpenLayers.Popup.WIDTH = 200;
OpenLayers.Popup.HEIGHT = 200;
OpenLayers.Popup.COLOR = "white";
OpenLayers.Popup.OPACITY = 1;
OpenLayers.Popup.BORDER = "0px";
OpenLayers.Popup.Anchored = OpenLayers.Class(OpenLayers.Popup, {relativePosition: null, keepInMap: !0, anchor: null, initialize: function (a, b, c, d, e, f, g) {
    OpenLayers.Popup.prototype.initialize.apply(this, [a, b, c, d, f, g]);
    this.anchor = null != e ? e : {size: new OpenLayers.Size(0, 0), offset: new OpenLayers.Pixel(0, 0)}
}, destroy: function () {
    this.relativePosition = this.anchor = null;
    OpenLayers.Popup.prototype.destroy.apply(this, arguments)
}, show: function () {
    this.updatePosition();
    OpenLayers.Popup.prototype.show.apply(this, arguments)
},
    moveTo: function (a) {
        var b = this.relativePosition;
        this.relativePosition = this.calculateRelativePosition(a);
        OpenLayers.Popup.prototype.moveTo.call(this, this.calculateNewPx(a));
        this.relativePosition != b && this.updateRelativePosition()
    }, setSize: function (a) {
        OpenLayers.Popup.prototype.setSize.apply(this, arguments);
        if (this.lonlat && this.map) {
            var b = this.map.getLayerPxFromLonLat(this.lonlat);
            this.moveTo(b)
        }
    }, calculateRelativePosition: function (a) {
        a = this.map.getLonLatFromLayerPx(a);
        a = this.map.getExtent().determineQuadrant(a);
        return OpenLayers.Bounds.oppositeQuadrant(a)
    }, updateRelativePosition: function () {
    }, calculateNewPx: function (a) {
        a = a.offset(this.anchor.offset);
        var b = this.size || this.contentSize, c = "t" == this.relativePosition.charAt(0);
        a.y += c ? -b.h : this.anchor.size.h;
        c = "l" == this.relativePosition.charAt(1);
        a.x += c ? -b.w : this.anchor.size.w;
        return a
    }, CLASS_NAME: "OpenLayers.Popup.Anchored"});
OpenLayers.Popup.Framed = OpenLayers.Class(OpenLayers.Popup.Anchored, {imageSrc: null, imageSize: null, isAlphaImage: !1, positionBlocks: null, blocks: null, fixedRelativePosition: !1, initialize: function (a, b, c, d, e, f, g) {
    OpenLayers.Popup.Anchored.prototype.initialize.apply(this, arguments);
    this.fixedRelativePosition && (this.updateRelativePosition(), this.calculateRelativePosition = function (a) {
        return this.relativePosition
    });
    this.contentDiv.style.position = "absolute";
    this.contentDiv.style.zIndex = 1;
    f && (this.closeDiv.style.zIndex =
        1);
    this.groupDiv.style.position = "absolute";
    this.groupDiv.style.top = "0px";
    this.groupDiv.style.left = "0px";
    this.groupDiv.style.height = "100%";
    this.groupDiv.style.width = "100%"
}, destroy: function () {
    this.isAlphaImage = this.imageSize = this.imageSrc = null;
    this.fixedRelativePosition = !1;
    this.positionBlocks = null;
    for (var a = 0; a < this.blocks.length; a++) {
        var b = this.blocks[a];
        b.image && b.div.removeChild(b.image);
        b.image = null;
        b.div && this.groupDiv.removeChild(b.div);
        b.div = null
    }
    this.blocks = null;
    OpenLayers.Popup.Anchored.prototype.destroy.apply(this,
        arguments)
}, setBackgroundColor: function (a) {
}, setBorder: function () {
}, setOpacity: function (a) {
}, setSize: function (a) {
    OpenLayers.Popup.Anchored.prototype.setSize.apply(this, arguments);
    this.updateBlocks()
}, updateRelativePosition: function () {
    this.padding = this.positionBlocks[this.relativePosition].padding;
    if (this.closeDiv) {
        var a = this.getContentDivPadding();
        this.closeDiv.style.right = a.right + this.padding.right + "px";
        this.closeDiv.style.top = a.top + this.padding.top + "px"
    }
    this.updateBlocks()
}, calculateNewPx: function (a) {
    var b =
        OpenLayers.Popup.Anchored.prototype.calculateNewPx.apply(this, arguments);
    return b = b.offset(this.positionBlocks[this.relativePosition].offset)
}, createBlocks: function () {
    this.blocks = [];
    var a = null, b;
    for (b in this.positionBlocks) {
        a = b;
        break
    }
    a = this.positionBlocks[a];
    for (b = 0; b < a.blocks.length; b++) {
        var c = {};
        this.blocks.push(c);
        c.div = OpenLayers.Util.createDiv(this.id + "_FrameDecorationDiv_" + b, null, null, null, "absolute", null, "hidden", null);
        c.image = (this.isAlphaImage ? OpenLayers.Util.createAlphaImageDiv : OpenLayers.Util.createImage)(this.id +
            "_FrameDecorationImg_" + b, null, this.imageSize, this.imageSrc, "absolute", null, null, null);
        c.div.appendChild(c.image);
        this.groupDiv.appendChild(c.div)
    }
}, updateBlocks: function () {
    this.blocks || this.createBlocks();
    if (this.size && this.relativePosition) {
        for (var a = this.positionBlocks[this.relativePosition], b = 0; b < a.blocks.length; b++) {
            var c = a.blocks[b], d = this.blocks[b], e = c.anchor.left, f = c.anchor.bottom, g = c.anchor.right, h = c.anchor.top, k = isNaN(c.size.w) ? this.size.w - (g + e) : c.size.w, l = isNaN(c.size.h) ? this.size.h - (f +
                h) : c.size.h;
            d.div.style.width = (0 > k ? 0 : k) + "px";
            d.div.style.height = (0 > l ? 0 : l) + "px";
            d.div.style.left = null != e ? e + "px" : "";
            d.div.style.bottom = null != f ? f + "px" : "";
            d.div.style.right = null != g ? g + "px" : "";
            d.div.style.top = null != h ? h + "px" : "";
            d.image.style.left = c.position.x + "px";
            d.image.style.top = c.position.y + "px"
        }
        this.contentDiv.style.left = this.padding.left + "px";
        this.contentDiv.style.top = this.padding.top + "px"
    }
}, CLASS_NAME: "OpenLayers.Popup.Framed"});
OpenLayers.Format = OpenLayers.Class({options: null, externalProjection: null, internalProjection: null, data: null, keepData: !1, initialize: function (a) {
    OpenLayers.Util.extend(this, a);
    this.options = a
}, destroy: function () {
}, read: function (a) {
    throw Error("Read not implemented.");
}, write: function (a) {
    throw Error("Write not implemented.");
}, CLASS_NAME: "OpenLayers.Format"});
OpenLayers.Format.JSON = OpenLayers.Class(OpenLayers.Format, {indent: "    ", space: " ", newline: "\n", level: 0, pretty: !1, nativeJSON: function () {
    return!(!window.JSON || "function" != typeof JSON.parse || "function" != typeof JSON.stringify)
}(), read: function (a, b) {
    var c;
    if (this.nativeJSON)c = JSON.parse(a, b); else try {
        if (/^[\],:{}\s]*$/.test(a.replace(/\\["\\\/bfnrtu]/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "")) && (c = eval("(" + a + ")"), "function" === typeof b)) {
            var d = function (a, c) {
                if (c && "object" === typeof c)for (var e in c)c.hasOwnProperty(e) && (c[e] = d(e, c[e]));
                return b(a, c)
            };
            c = d("", c)
        }
    } catch (e) {
    }
    this.keepData && (this.data = c);
    return c
}, write: function (a, b) {
    this.pretty = !!b;
    var c = null, d = typeof a;
    if (this.serialize[d])try {
        c = !this.pretty && this.nativeJSON ? JSON.stringify(a) : this.serialize[d].apply(this, [a])
    } catch (e) {
        OpenLayers.Console.error("Trouble serializing: " + e)
    }
    return c
}, writeIndent: function () {
    var a = [];
    if (this.pretty)for (var b = 0; b < this.level; ++b)a.push(this.indent);
    return a.join("")
}, writeNewline: function () {
    return this.pretty ? this.newline : ""
}, writeSpace: function () {
    return this.pretty ? this.space : ""
}, serialize: {object: function (a) {
    if (null == a)return"null";
    if (a.constructor == Date)return this.serialize.date.apply(this, [a]);
    if (a.constructor == Array)return this.serialize.array.apply(this, [a]);
    var b = ["{"];
    this.level += 1;
    var c, d, e, f = !1;
    for (c in a)a.hasOwnProperty(c) && (d = OpenLayers.Format.JSON.prototype.write.apply(this, [c, this.pretty]), e = OpenLayers.Format.JSON.prototype.write.apply(this,
        [a[c], this.pretty]), null != d && null != e && (f && b.push(","), b.push(this.writeNewline(), this.writeIndent(), d, ":", this.writeSpace(), e), f = !0));
    this.level -= 1;
    b.push(this.writeNewline(), this.writeIndent(), "}");
    return b.join("")
}, array: function (a) {
    var b, c = ["["];
    this.level += 1;
    for (var d = 0, e = a.length; d < e; ++d)b = OpenLayers.Format.JSON.prototype.write.apply(this, [a[d], this.pretty]), null != b && (0 < d && c.push(","), c.push(this.writeNewline(), this.writeIndent(), b));
    this.level -= 1;
    c.push(this.writeNewline(), this.writeIndent(),
        "]");
    return c.join("")
}, string: function (a) {
    var b = {"\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\"};
    return/["\\\x00-\x1f]/.test(a) ? '"' + a.replace(/([\x00-\x1f\\"])/g, function (a, d) {
        var e = b[d];
        if (e)return e;
        e = d.charCodeAt();
        return"\\u00" + Math.floor(e / 16).toString(16) + (e % 16).toString(16)
    }) + '"' : '"' + a + '"'
}, number: function (a) {
    return isFinite(a) ? String(a) : "null"
}, "boolean": function (a) {
    return String(a)
}, date: function (a) {
    function b(a) {
        return 10 > a ? "0" + a : a
    }

    return'"' + a.getFullYear() +
        "-" + b(a.getMonth() + 1) + "-" + b(a.getDate()) + "T" + b(a.getHours()) + ":" + b(a.getMinutes()) + ":" + b(a.getSeconds()) + '"'
}}, CLASS_NAME: "OpenLayers.Format.JSON"});
OpenLayers.Format.GeoJSON = OpenLayers.Class(OpenLayers.Format.JSON, {ignoreExtraDims: !1, read: function (a, b, c) {
    b = b ? b : "FeatureCollection";
    var d = null, e = null, e = "string" == typeof a ? OpenLayers.Format.JSON.prototype.read.apply(this, [a, c]) : a;
    if (!e)OpenLayers.Console.error("Bad JSON: " + a); else if ("string" != typeof e.type)OpenLayers.Console.error("Bad GeoJSON - no type: " + a); else if (this.isValidType(e, b))switch (b) {
        case "Geometry":
            try {
                d = this.parseGeometry(e)
            } catch (f) {
                OpenLayers.Console.error(f)
            }
            break;
        case "Feature":
            try {
                d =
                    this.parseFeature(e), d.type = "Feature"
            } catch (g) {
                OpenLayers.Console.error(g)
            }
            break;
        case "FeatureCollection":
            switch (d = [], e.type) {
                case "Feature":
                    try {
                        d.push(this.parseFeature(e))
                    } catch (h) {
                        d = null, OpenLayers.Console.error(h)
                    }
                    break;
                case "FeatureCollection":
                    a = 0;
                    for (b = e.features.length; a < b; ++a)try {
                        d.push(this.parseFeature(e.features[a]))
                    } catch (k) {
                        d = null, OpenLayers.Console.error(k)
                    }
                    break;
                default:
                    try {
                        var l = this.parseGeometry(e);
                        d.push(new OpenLayers.Feature.Vector(l))
                    } catch (m) {
                        d = null, OpenLayers.Console.error(m)
                    }
            }
    }
    return d
},
    isValidType: function (a, b) {
        var c = !1;
        switch (b) {
            case "Geometry":
                -1 == OpenLayers.Util.indexOf("Point MultiPoint LineString MultiLineString Polygon MultiPolygon Box GeometryCollection".split(" "), a.type) ? OpenLayers.Console.error("Unsupported geometry type: " + a.type) : c = !0;
                break;
            case "FeatureCollection":
                c = !0;
                break;
            default:
                a.type == b ? c = !0 : OpenLayers.Console.error("Cannot convert types from " + a.type + " to " + b)
        }
        return c
    }, parseFeature: function (a) {
        var b, c, d;
        c = a.properties ? a.properties : {};
        d = a.geometry && a.geometry.bbox ||
            a.bbox;
        try {
            b = this.parseGeometry(a.geometry)
        } catch (e) {
            throw e;
        }
        b = new OpenLayers.Feature.Vector(b, c);
        d && (b.bounds = OpenLayers.Bounds.fromArray(d));
        a.id && (b.fid = a.id);
        return b
    }, parseGeometry: function (a) {
        if (null == a)return null;
        var b, c = !1;
        if ("GeometryCollection" == a.type) {
            if (!OpenLayers.Util.isArray(a.geometries))throw"GeometryCollection must have geometries array: " + a;
            b = a.geometries.length;
            for (var c = Array(b), d = 0; d < b; ++d)c[d] = this.parseGeometry.apply(this, [a.geometries[d]]);
            b = new OpenLayers.Geometry.Collection(c);
            c = !0
        } else {
            if (!OpenLayers.Util.isArray(a.coordinates))throw"Geometry must have coordinates array: " + a;
            if (!this.parseCoords[a.type.toLowerCase()])throw"Unsupported geometry type: " + a.type;
            try {
                b = this.parseCoords[a.type.toLowerCase()].apply(this, [a.coordinates])
            } catch (e) {
                throw e;
            }
        }
        this.internalProjection && (this.externalProjection && !c) && b.transform(this.externalProjection, this.internalProjection);
        return b
    }, parseCoords: {point: function (a) {
        if (!1 == this.ignoreExtraDims && 2 != a.length)throw"Only 2D points are supported: " +
            a;
        return new OpenLayers.Geometry.Point(a[0], a[1])
    }, multipoint: function (a) {
        for (var b = [], c = null, d = 0, e = a.length; d < e; ++d) {
            try {
                c = this.parseCoords.point.apply(this, [a[d]])
            } catch (f) {
                throw f;
            }
            b.push(c)
        }
        return new OpenLayers.Geometry.MultiPoint(b)
    }, linestring: function (a) {
        for (var b = [], c = null, d = 0, e = a.length; d < e; ++d) {
            try {
                c = this.parseCoords.point.apply(this, [a[d]])
            } catch (f) {
                throw f;
            }
            b.push(c)
        }
        return new OpenLayers.Geometry.LineString(b)
    }, multilinestring: function (a) {
        for (var b = [], c = null, d = 0, e = a.length; d < e; ++d) {
            try {
                c =
                    this.parseCoords.linestring.apply(this, [a[d]])
            } catch (f) {
                throw f;
            }
            b.push(c)
        }
        return new OpenLayers.Geometry.MultiLineString(b)
    }, polygon: function (a) {
        for (var b = [], c, d, e = 0, f = a.length; e < f; ++e) {
            try {
                d = this.parseCoords.linestring.apply(this, [a[e]])
            } catch (g) {
                throw g;
            }
            c = new OpenLayers.Geometry.LinearRing(d.components);
            b.push(c)
        }
        return new OpenLayers.Geometry.Polygon(b)
    }, multipolygon: function (a) {
        for (var b = [], c = null, d = 0, e = a.length; d < e; ++d) {
            try {
                c = this.parseCoords.polygon.apply(this, [a[d]])
            } catch (f) {
                throw f;
            }
            b.push(c)
        }
        return new OpenLayers.Geometry.MultiPolygon(b)
    },
        box: function (a) {
            if (2 != a.length)throw"GeoJSON box coordinates must have 2 elements";
            return new OpenLayers.Geometry.Polygon([new OpenLayers.Geometry.LinearRing([new OpenLayers.Geometry.Point(a[0][0], a[0][1]), new OpenLayers.Geometry.Point(a[1][0], a[0][1]), new OpenLayers.Geometry.Point(a[1][0], a[1][1]), new OpenLayers.Geometry.Point(a[0][0], a[1][1]), new OpenLayers.Geometry.Point(a[0][0], a[0][1])])])
        }}, write: function (a, b) {
        var c = {type: null};
        if (OpenLayers.Util.isArray(a)) {
            c.type = "FeatureCollection";
            var d =
                a.length;
            c.features = Array(d);
            for (var e = 0; e < d; ++e) {
                var f = a[e];
                if (!f instanceof OpenLayers.Feature.Vector)throw"FeatureCollection only supports collections of features: " + f;
                c.features[e] = this.extract.feature.apply(this, [f])
            }
        } else 0 == a.CLASS_NAME.indexOf("OpenLayers.Geometry") ? c = this.extract.geometry.apply(this, [a]) : a instanceof OpenLayers.Feature.Vector && (c = this.extract.feature.apply(this, [a]), a.layer && a.layer.projection && (c.crs = this.createCRSObject(a)));
        return OpenLayers.Format.JSON.prototype.write.apply(this,
            [c, b])
    }, createCRSObject: function (a) {
        a = a.layer.projection.toString();
        var b = {};
        a.match(/epsg:/i) && (a = parseInt(a.substring(a.indexOf(":") + 1)), b = 4326 == a ? {type: "name", properties: {name: "urn:ogc:def:crs:OGC:1.3:CRS84"}} : {type: "name", properties: {name: "EPSG:" + a}});
        return b
    }, extract: {feature: function (a) {
        var b = this.extract.geometry.apply(this, [a.geometry]), b = {type: "Feature", properties: a.attributes, geometry: b};
        null != a.fid && (b.id = a.fid);
        return b
    }, geometry: function (a) {
        if (null == a)return null;
        this.internalProjection &&
            this.externalProjection && (a = a.clone(), a.transform(this.internalProjection, this.externalProjection));
        var b = a.CLASS_NAME.split(".")[2];
        a = this.extract[b.toLowerCase()].apply(this, [a]);
        return"Collection" == b ? {type: "GeometryCollection", geometries: a} : {type: b, coordinates: a}
    }, point: function (a) {
        return[a.x, a.y]
    }, multipoint: function (a) {
        for (var b = [], c = 0, d = a.components.length; c < d; ++c)b.push(this.extract.point.apply(this, [a.components[c]]));
        return b
    }, linestring: function (a) {
        for (var b = [], c = 0, d = a.components.length; c <
            d; ++c)b.push(this.extract.point.apply(this, [a.components[c]]));
        return b
    }, multilinestring: function (a) {
        for (var b = [], c = 0, d = a.components.length; c < d; ++c)b.push(this.extract.linestring.apply(this, [a.components[c]]));
        return b
    }, polygon: function (a) {
        for (var b = [], c = 0, d = a.components.length; c < d; ++c)b.push(this.extract.linestring.apply(this, [a.components[c]]));
        return b
    }, multipolygon: function (a) {
        for (var b = [], c = 0, d = a.components.length; c < d; ++c)b.push(this.extract.polygon.apply(this, [a.components[c]]));
        return b
    }, collection: function (a) {
        for (var b =
            a.components.length, c = Array(b), d = 0; d < b; ++d)c[d] = this.extract.geometry.apply(this, [a.components[d]]);
        return c
    }}, CLASS_NAME: "OpenLayers.Format.GeoJSON"});
OpenLayers.Layer.Google.v3 = {DEFAULTS: {sphericalMercator: !0, projection: "EPSG:900913"}, animationEnabled: !0, loadMapObject: function () {
    this.type || (this.type = google.maps.MapTypeId.ROADMAP);
    var a, b = OpenLayers.Layer.Google.cache[this.map.id];
    b ? (a = b.mapObject, ++b.count) : (a = this.map.getCenter(), b = document.createElement("div"), b.className = "olForeignContainer", b.style.width = "100%", b.style.height = "100%", a = new google.maps.Map(b, {center: a ? new google.maps.LatLng(a.lat, a.lon) : new google.maps.LatLng(0, 0), zoom: this.map.getZoom() ||
        0, mapTypeId: this.type, disableDefaultUI: !0, keyboardShortcuts: !1, draggable: !1, disableDoubleClickZoom: !0, scrollwheel: !1, streetViewControl: !1}), b = document.createElement("div"), b.style.width = "100%", b.style.height = "100%", a.controls[google.maps.ControlPosition.TOP_LEFT].push(b), b = {googleControl: b, mapObject: a, count: 1}, OpenLayers.Layer.Google.cache[this.map.id] = b);
    this.mapObject = a;
    this.setGMapVisibility(this.visibility)
}, onMapResize: function () {
    this.visibility && google.maps.event.trigger(this.mapObject, "resize")
},
    setGMapVisibility: function (a) {
        var b = OpenLayers.Layer.Google.cache[this.map.id], c = this.map;
        if (b) {
            for (var d = this.type, e = c.layers, f, g = e.length - 1; 0 <= g; --g)if (f = e[g], f instanceof OpenLayers.Layer.Google && !0 === f.visibility && !0 === f.inRange) {
                d = f.type;
                a = !0;
                break
            }
            e = this.mapObject.getDiv();
            if (!0 === a) {
                if (e.parentNode !== c.div)if (b.rendered)c.div.appendChild(e), b.googleControl.appendChild(c.viewPortDiv), google.maps.event.trigger(this.mapObject, "resize"); else {
                    var h = this;
                    google.maps.event.addListenerOnce(this.mapObject,
                        "tilesloaded", function () {
                            b.rendered = !0;
                            h.setGMapVisibility(h.getVisibility());
                            h.moveTo(h.map.getCenter())
                        })
                }
                this.mapObject.setMapTypeId(d)
            } else b.googleControl.hasChildNodes() && (c.div.appendChild(c.viewPortDiv), c.div.removeChild(e))
        }
    }, getMapContainer: function () {
        return this.mapObject.getDiv()
    }, getMapObjectBoundsFromOLBounds: function (a) {
        var b = null;
        null != a && (b = this.sphericalMercator ? this.inverseMercator(a.bottom, a.left) : new OpenLayers.LonLat(a.bottom, a.left), a = this.sphericalMercator ? this.inverseMercator(a.top,
            a.right) : new OpenLayers.LonLat(a.top, a.right), b = new google.maps.LatLngBounds(new google.maps.LatLng(b.lat, b.lon), new google.maps.LatLng(a.lat, a.lon)));
        return b
    }, getMapObjectLonLatFromMapObjectPixel: function (a) {
        var b = this.map.getSize(), c = this.getLongitudeFromMapObjectLonLat(this.mapObject.center), d = this.getLatitudeFromMapObjectLonLat(this.mapObject.center), e = this.map.getResolution();
        a = new OpenLayers.LonLat(c + (a.x - b.w / 2) * e, d - (a.y - b.h / 2) * e);
        this.wrapDateLine && (a = a.wrapDateLine(this.maxExtent));
        return this.getMapObjectLonLatFromLonLat(a.lon,
            a.lat)
    }, getMapObjectPixelFromMapObjectLonLat: function (a) {
        var b = this.getLongitudeFromMapObjectLonLat(a);
        a = this.getLatitudeFromMapObjectLonLat(a);
        var c = this.map.getResolution(), d = this.map.getExtent();
        return this.getMapObjectPixelFromXY(1 / c * (b - d.left), 1 / c * (d.top - a))
    }, setMapObjectCenter: function (a, b) {
        if (!1 === this.animationEnabled && b != this.mapObject.zoom) {
            var c = this.getMapContainer();
            google.maps.event.addListenerOnce(this.mapObject, "idle", function () {
                c.style.visibility = ""
            });
            c.style.visibility = "hidden"
        }
        this.mapObject.setOptions({center: a,
            zoom: b})
    }, getMapObjectZoomFromMapObjectBounds: function (a) {
        return this.mapObject.getBoundsZoomLevel(a)
    }, getMapObjectLonLatFromLonLat: function (a, b) {
        var c;
        this.sphericalMercator ? (c = this.inverseMercator(a, b), c = new google.maps.LatLng(c.lat, c.lon)) : c = new google.maps.LatLng(b, a);
        return c
    }, getMapObjectPixelFromXY: function (a, b) {
        return new google.maps.Point(a, b)
    }};
OpenLayers.ProxyHost = "";
OpenLayers.Request || (OpenLayers.Request = {});
OpenLayers.Util.extend(OpenLayers.Request, {DEFAULT_CONFIG: {method: "GET", url: window.location.href, async: !0, user: void 0, password: void 0, params: null, proxy: OpenLayers.ProxyHost, headers: {}, data: null, callback: function () {
}, success: null, failure: null, scope: null}, URL_SPLIT_REGEX: /([^:]*:)\/\/([^:]*:?[^@]*@)?([^:\/\?]*):?([^\/\?]*)/, events: new OpenLayers.Events(this), makeSameOrigin: function (a, b) {
    var c = 0 !== a.indexOf("http"), d = !c && a.match(this.URL_SPLIT_REGEX);
    if (d) {
        var e = window.location, c = d[1] == e.protocol && d[3] ==
            e.hostname, d = d[4], e = e.port;
        if (80 != d && "" != d || "80" != e && "" != e)c = c && d == e
    }
    c || b && (a = "function" == typeof b ? b(a) : b + encodeURIComponent(a));
    return a
}, issue: function (a) {
    var b = OpenLayers.Util.extend(this.DEFAULT_CONFIG, {proxy: OpenLayers.ProxyHost});
    a = a || {};
    a.headers = a.headers || {};
    a = OpenLayers.Util.applyDefaults(a, b);
    a.headers = OpenLayers.Util.applyDefaults(a.headers, b.headers);
    var b = !1, c;
    for (c in a.headers)a.headers.hasOwnProperty(c) && "x-requested-with" === c.toLowerCase() && (b = !0);
    !1 === b && (a.headers["X-Requested-With"] =
        "XMLHttpRequest");
    var d = new OpenLayers.Request.XMLHttpRequest, e = OpenLayers.Util.urlAppend(a.url, OpenLayers.Util.getParameterString(a.params || {})), e = OpenLayers.Request.makeSameOrigin(e, a.proxy);
    d.open(a.method, e, a.async, a.user, a.password);
    for (var f in a.headers)d.setRequestHeader(f, a.headers[f]);
    var g = this.events, h = this;
    d.onreadystatechange = function () {
        d.readyState == OpenLayers.Request.XMLHttpRequest.DONE && !1 !== g.triggerEvent("complete", {request: d, config: a, requestUrl: e}) && h.runCallbacks({request: d, config: a,
            requestUrl: e})
    };
    !1 === a.async ? d.send(a.data) : window.setTimeout(function () {
        0 !== d.readyState && d.send(a.data)
    }, 0);
    return d
}, runCallbacks: function (a) {
    var b = a.request, c = a.config, d = c.scope ? OpenLayers.Function.bind(c.callback, c.scope) : c.callback, e;
    c.success && (e = c.scope ? OpenLayers.Function.bind(c.success, c.scope) : c.success);
    var f;
    c.failure && (f = c.scope ? OpenLayers.Function.bind(c.failure, c.scope) : c.failure);
    "file:" == OpenLayers.Util.createUrlObject(c.url).protocol && b.responseText && (b.status = 200);
    d(b);
    if (!b.status ||
        200 <= b.status && 300 > b.status)this.events.triggerEvent("success", a), e && e(b);
    b.status && (200 > b.status || 300 <= b.status) && (this.events.triggerEvent("failure", a), f && f(b))
}, GET: function (a) {
    a = OpenLayers.Util.extend(a, {method: "GET"});
    return OpenLayers.Request.issue(a)
}, POST: function (a) {
    a = OpenLayers.Util.extend(a, {method: "POST"});
    a.headers = a.headers ? a.headers : {};
    "CONTENT-TYPE"in OpenLayers.Util.upperCaseObject(a.headers) || (a.headers["Content-Type"] = "application/xml");
    return OpenLayers.Request.issue(a)
}, PUT: function (a) {
    a =
        OpenLayers.Util.extend(a, {method: "PUT"});
    a.headers = a.headers ? a.headers : {};
    "CONTENT-TYPE"in OpenLayers.Util.upperCaseObject(a.headers) || (a.headers["Content-Type"] = "application/xml");
    return OpenLayers.Request.issue(a)
}, DELETE: function (a) {
    a = OpenLayers.Util.extend(a, {method: "DELETE"});
    return OpenLayers.Request.issue(a)
}, HEAD: function (a) {
    a = OpenLayers.Util.extend(a, {method: "HEAD"});
    return OpenLayers.Request.issue(a)
}, OPTIONS: function (a) {
    a = OpenLayers.Util.extend(a, {method: "OPTIONS"});
    return OpenLayers.Request.issue(a)
}});
(function () {
    function a() {
        this._object = f && !k ? new f : new window.ActiveXObject("Microsoft.XMLHTTP");
        this._listeners = []
    }

    function b() {
        return new a
    }

    function c(a) {
        b.onreadystatechange && b.onreadystatechange.apply(a);
        a.dispatchEvent({type: "readystatechange", bubbles: !1, cancelable: !1, timeStamp: new Date + 0})
    }

    function d(a) {
        try {
            a.responseText = a._object.responseText
        } catch (b) {
        }
        try {
            var c;
            var d = a._object, e = d.responseXML, f = d.responseText;
            h && (f && e && !e.documentElement && d.getResponseHeader("Content-Type").match(/[^\/]+\/[^\+]+\+xml/)) &&
            (e = new window.ActiveXObject("Microsoft.XMLDOM"), e.async = !1, e.validateOnParse = !1, e.loadXML(f));
            c = e && (h && 0 != e.parseError || !e.documentElement || e.documentElement && "parsererror" == e.documentElement.tagName) ? null : e;
            a.responseXML = c
        } catch (g) {
        }
        try {
            a.status = a._object.status
        } catch (k) {
        }
        try {
            a.statusText = a._object.statusText
        } catch (u) {
        }
    }

    function e(a) {
        a._object.onreadystatechange = new window.Function
    }

    var f = window.XMLHttpRequest, g = !!window.controllers, h = window.document.all && !window.opera, k = h && window.navigator.userAgent.match(/MSIE 7.0/);
    b.prototype = a.prototype;
    g && f.wrapped && (b.wrapped = f.wrapped);
    b.UNSENT = 0;
    b.OPENED = 1;
    b.HEADERS_RECEIVED = 2;
    b.LOADING = 3;
    b.DONE = 4;
    b.prototype.readyState = b.UNSENT;
    b.prototype.responseText = "";
    b.prototype.responseXML = null;
    b.prototype.status = 0;
    b.prototype.statusText = "";
    b.prototype.priority = "NORMAL";
    b.prototype.onreadystatechange = null;
    b.onreadystatechange = null;
    b.onopen = null;
    b.onsend = null;
    b.onabort = null;
    b.prototype.open = function (a, f, k, p, n) {
        delete this._headers;
        3 > arguments.length && (k = !0);
        this._async = k;
        var q = this,
            s = this.readyState, t;
        h && k && (t = function () {
            s != b.DONE && (e(q), q.abort())
        }, window.attachEvent("onunload", t));
        b.onopen && b.onopen.apply(this, arguments);
        4 < arguments.length ? this._object.open(a, f, k, p, n) : 3 < arguments.length ? this._object.open(a, f, k, p) : this._object.open(a, f, k);
        this.readyState = b.OPENED;
        c(this);
        this._object.onreadystatechange = function () {
            if (!g || k)q.readyState = q._object.readyState, d(q), q._aborted ? q.readyState = b.UNSENT : (q.readyState == b.DONE && (delete q._data, e(q), h && k && window.detachEvent("onunload", t)),
                s != q.readyState && c(q), s = q.readyState)
        }
    };
    b.prototype.send = function (a) {
        b.onsend && b.onsend.apply(this, arguments);
        arguments.length || (a = null);
        a && a.nodeType && (a = window.XMLSerializer ? (new window.XMLSerializer).serializeToString(a) : a.xml, this._headers["Content-Type"] || this._object.setRequestHeader("Content-Type", "application/xml"));
        this._data = a;
        a:if (this._object.send(this._data), g && !this._async)for (this.readyState = b.OPENED, d(this); this.readyState < b.DONE;)if (this.readyState++, c(this), this._aborted)break a
    };
    b.prototype.abort = function () {
        b.onabort && b.onabort.apply(this, arguments);
        this.readyState > b.UNSENT && (this._aborted = !0);
        this._object.abort();
        e(this);
        this.readyState = b.UNSENT;
        delete this._data
    };
    b.prototype.getAllResponseHeaders = function () {
        return this._object.getAllResponseHeaders()
    };
    b.prototype.getResponseHeader = function (a) {
        return this._object.getResponseHeader(a)
    };
    b.prototype.setRequestHeader = function (a, b) {
        this._headers || (this._headers = {});
        this._headers[a] = b;
        return this._object.setRequestHeader(a, b)
    };
    b.prototype.addEventListener = function (a, b, c) {
        for (var d = 0, e; e = this._listeners[d]; d++)if (e[0] == a && e[1] == b && e[2] == c)return;
        this._listeners.push([a, b, c])
    };
    b.prototype.removeEventListener = function (a, b, c) {
        for (var d = 0, e; (e = this._listeners[d]) && (e[0] != a || e[1] != b || e[2] != c); d++);
        e && this._listeners.splice(d, 1)
    };
    b.prototype.dispatchEvent = function (a) {
        a = {type: a.type, target: this, currentTarget: this, eventPhase: 2, bubbles: a.bubbles, cancelable: a.cancelable, timeStamp: a.timeStamp, stopPropagation: function () {
        }, preventDefault: function () {
        },
            initEvent: function () {
            }};
        "readystatechange" == a.type && this.onreadystatechange && (this.onreadystatechange.handleEvent || this.onreadystatechange).apply(this, [a]);
        for (var b = 0, c; c = this._listeners[b]; b++)c[0] != a.type || c[2] || (c[1].handleEvent || c[1]).apply(this, [a])
    };
    b.prototype.toString = function () {
        return"[object XMLHttpRequest]"
    };
    b.toString = function () {
        return"[XMLHttpRequest]"
    };
    window.Function.prototype.apply || (window.Function.prototype.apply = function (a, b) {
        b || (b = []);
        a.__func = this;
        a.__func(b[0], b[1], b[2], b[3],
            b[4]);
        delete a.__func
    });
    OpenLayers.Request || (OpenLayers.Request = {});
    OpenLayers.Request.XMLHttpRequest = b
})();
OpenLayers.Filter.Comparison = OpenLayers.Class(OpenLayers.Filter, {type: null, property: null, value: null, matchCase: !0, lowerBoundary: null, upperBoundary: null, initialize: function (a) {
    OpenLayers.Filter.prototype.initialize.apply(this, [a]);
    this.type === OpenLayers.Filter.Comparison.LIKE && void 0 === a.matchCase && (this.matchCase = null)
}, evaluate: function (a) {
    a instanceof OpenLayers.Feature.Vector && (a = a.attributes);
    var b = !1;
    a = a[this.property];
    switch (this.type) {
        case OpenLayers.Filter.Comparison.EQUAL_TO:
            b = this.value;
            b = this.matchCase || "string" != typeof a || "string" != typeof b ? a == b : a.toUpperCase() == b.toUpperCase();
            break;
        case OpenLayers.Filter.Comparison.NOT_EQUAL_TO:
            b = this.value;
            b = this.matchCase || "string" != typeof a || "string" != typeof b ? a != b : a.toUpperCase() != b.toUpperCase();
            break;
        case OpenLayers.Filter.Comparison.LESS_THAN:
            b = a < this.value;
            break;
        case OpenLayers.Filter.Comparison.GREATER_THAN:
            b = a > this.value;
            break;
        case OpenLayers.Filter.Comparison.LESS_THAN_OR_EQUAL_TO:
            b = a <= this.value;
            break;
        case OpenLayers.Filter.Comparison.GREATER_THAN_OR_EQUAL_TO:
            b =
                a >= this.value;
            break;
        case OpenLayers.Filter.Comparison.BETWEEN:
            b = a >= this.lowerBoundary && a <= this.upperBoundary;
            break;
        case OpenLayers.Filter.Comparison.LIKE:
            b = RegExp(this.value, "gi").test(a);
            break;
        case OpenLayers.Filter.Comparison.IS_NULL:
            b = null === a
    }
    return b
}, value2regex: function (a, b, c) {
    if ("." == a)throw Error("'.' is an unsupported wildCard character for OpenLayers.Filter.Comparison");
    a = a ? a : "*";
    b = b ? b : ".";
    this.value = this.value.replace(RegExp("\\" + (c ? c : "!") + "(.|$)", "g"), "\\$1");
    this.value = this.value.replace(RegExp("\\" +
        b, "g"), ".");
    this.value = this.value.replace(RegExp("\\" + a, "g"), ".*");
    this.value = this.value.replace(RegExp("\\\\.\\*", "g"), "\\" + a);
    return this.value = this.value.replace(RegExp("\\\\\\.", "g"), "\\" + b)
}, regex2value: function () {
    var a = this.value, a = a.replace(/!/g, "!!"), a = a.replace(/(\\)?\\\./g, function (a, c) {
        return c ? a : "!."
    }), a = a.replace(/(\\)?\\\*/g, function (a, c) {
        return c ? a : "!*"
    }), a = a.replace(/\\\\/g, "\\");
    return a = a.replace(/\.\*/g, "*")
}, clone: function () {
    return OpenLayers.Util.extend(new OpenLayers.Filter.Comparison,
        this)
}, CLASS_NAME: "OpenLayers.Filter.Comparison"});
OpenLayers.Filter.Comparison.EQUAL_TO = "==";
OpenLayers.Filter.Comparison.NOT_EQUAL_TO = "!=";
OpenLayers.Filter.Comparison.LESS_THAN = "<";
OpenLayers.Filter.Comparison.GREATER_THAN = ">";
OpenLayers.Filter.Comparison.LESS_THAN_OR_EQUAL_TO = "<=";
OpenLayers.Filter.Comparison.GREATER_THAN_OR_EQUAL_TO = ">=";
OpenLayers.Filter.Comparison.BETWEEN = "..";
OpenLayers.Filter.Comparison.LIKE = "~";
OpenLayers.Filter.Comparison.IS_NULL = "NULL";
OpenLayers.Popup.FramedCloud = OpenLayers.Class(OpenLayers.Popup.Framed, {contentDisplayClass: "olFramedCloudPopupContent", autoSize: !0, panMapIfOutOfView: !0, imageSize: new OpenLayers.Size(1276, 736), isAlphaImage: !1, fixedRelativePosition: !1, positionBlocks: {tl: {offset: new OpenLayers.Pixel(44, 0), padding: new OpenLayers.Bounds(8, 40, 8, 9), blocks: [
    {size: new OpenLayers.Size("auto", "auto"), anchor: new OpenLayers.Bounds(0, 51, 22, 0), position: new OpenLayers.Pixel(0, 0)},
    {size: new OpenLayers.Size(22, "auto"), anchor: new OpenLayers.Bounds(null,
        50, 0, 0), position: new OpenLayers.Pixel(-1238, 0)},
    {size: new OpenLayers.Size("auto", 19), anchor: new OpenLayers.Bounds(0, 32, 22, null), position: new OpenLayers.Pixel(0, -631)},
    {size: new OpenLayers.Size(22, 18), anchor: new OpenLayers.Bounds(null, 32, 0, null), position: new OpenLayers.Pixel(-1238, -632)},
    {size: new OpenLayers.Size(81, 35), anchor: new OpenLayers.Bounds(null, 0, 0, null), position: new OpenLayers.Pixel(0, -688)}
]}, tr: {offset: new OpenLayers.Pixel(-45, 0), padding: new OpenLayers.Bounds(8, 40, 8, 9), blocks: [
    {size: new OpenLayers.Size("auto",
        "auto"), anchor: new OpenLayers.Bounds(0, 51, 22, 0), position: new OpenLayers.Pixel(0, 0)},
    {size: new OpenLayers.Size(22, "auto"), anchor: new OpenLayers.Bounds(null, 50, 0, 0), position: new OpenLayers.Pixel(-1238, 0)},
    {size: new OpenLayers.Size("auto", 19), anchor: new OpenLayers.Bounds(0, 32, 22, null), position: new OpenLayers.Pixel(0, -631)},
    {size: new OpenLayers.Size(22, 19), anchor: new OpenLayers.Bounds(null, 32, 0, null), position: new OpenLayers.Pixel(-1238, -631)},
    {size: new OpenLayers.Size(81, 35), anchor: new OpenLayers.Bounds(0,
        0, null, null), position: new OpenLayers.Pixel(-215, -687)}
]}, bl: {offset: new OpenLayers.Pixel(45, 0), padding: new OpenLayers.Bounds(8, 9, 8, 40), blocks: [
    {size: new OpenLayers.Size("auto", "auto"), anchor: new OpenLayers.Bounds(0, 21, 22, 32), position: new OpenLayers.Pixel(0, 0)},
    {size: new OpenLayers.Size(22, "auto"), anchor: new OpenLayers.Bounds(null, 21, 0, 32), position: new OpenLayers.Pixel(-1238, 0)},
    {size: new OpenLayers.Size("auto", 21), anchor: new OpenLayers.Bounds(0, 0, 22, null), position: new OpenLayers.Pixel(0, -629)},
    {size: new OpenLayers.Size(22,
        21), anchor: new OpenLayers.Bounds(null, 0, 0, null), position: new OpenLayers.Pixel(-1238, -629)},
    {size: new OpenLayers.Size(81, 33), anchor: new OpenLayers.Bounds(null, null, 0, 0), position: new OpenLayers.Pixel(-101, -674)}
]}, br: {offset: new OpenLayers.Pixel(-44, 0), padding: new OpenLayers.Bounds(8, 9, 8, 40), blocks: [
    {size: new OpenLayers.Size("auto", "auto"), anchor: new OpenLayers.Bounds(0, 21, 22, 32), position: new OpenLayers.Pixel(0, 0)},
    {size: new OpenLayers.Size(22, "auto"), anchor: new OpenLayers.Bounds(null, 21, 0, 32), position: new OpenLayers.Pixel(-1238,
        0)},
    {size: new OpenLayers.Size("auto", 21), anchor: new OpenLayers.Bounds(0, 0, 22, null), position: new OpenLayers.Pixel(0, -629)},
    {size: new OpenLayers.Size(22, 21), anchor: new OpenLayers.Bounds(null, 0, 0, null), position: new OpenLayers.Pixel(-1238, -629)},
    {size: new OpenLayers.Size(81, 33), anchor: new OpenLayers.Bounds(0, null, null, 0), position: new OpenLayers.Pixel(-311, -674)}
]}}, minSize: new OpenLayers.Size(105, 10), maxSize: new OpenLayers.Size(1200, 660), initialize: function (a, b, c, d, e, f, g) {
    this.imageSrc = OpenLayers.Util.getImageLocation("cloud-popup-relative.png");
    OpenLayers.Popup.Framed.prototype.initialize.apply(this, arguments);
    this.contentDiv.className = this.contentDisplayClass
}, CLASS_NAME: "OpenLayers.Popup.FramedCloud"});
OpenLayers.Rule = OpenLayers.Class({id: null, name: null, title: null, description: null, context: null, filter: null, elseFilter: !1, symbolizer: null, symbolizers: null, minScaleDenominator: null, maxScaleDenominator: null, initialize: function (a) {
    this.symbolizer = {};
    OpenLayers.Util.extend(this, a);
    this.symbolizers && delete this.symbolizer;
    this.id = OpenLayers.Util.createUniqueID(this.CLASS_NAME + "_")
}, destroy: function () {
    for (var a in this.symbolizer)this.symbolizer[a] = null;
    this.symbolizer = null;
    delete this.symbolizers
}, evaluate: function (a) {
    var b =
        this.getContext(a), c = !0;
    if (this.minScaleDenominator || this.maxScaleDenominator)var d = a.layer.map.getScale();
    this.minScaleDenominator && (c = d >= OpenLayers.Style.createLiteral(this.minScaleDenominator, b));
    c && this.maxScaleDenominator && (c = d < OpenLayers.Style.createLiteral(this.maxScaleDenominator, b));
    c && this.filter && (c = "OpenLayers.Filter.FeatureId" == this.filter.CLASS_NAME ? this.filter.evaluate(a) : this.filter.evaluate(b));
    return c
}, getContext: function (a) {
    var b = this.context;
    b || (b = a.attributes || a.data);
    "function" == typeof this.context && (b = this.context(a));
    return b
}, clone: function () {
    var a = OpenLayers.Util.extend({}, this);
    if (this.symbolizers) {
        var b = this.symbolizers.length;
        a.symbolizers = Array(b);
        for (var c = 0; c < b; ++c)a.symbolizers[c] = this.symbolizers[c].clone()
    } else {
        a.symbolizer = {};
        for (var d in this.symbolizer)b = this.symbolizer[d], c = typeof b, "object" === c ? a.symbolizer[d] = OpenLayers.Util.extend({}, b) : "string" === c && (a.symbolizer[d] = b)
    }
    a.filter = this.filter && this.filter.clone();
    a.context = this.context && OpenLayers.Util.extend({},
        this.context);
    return new OpenLayers.Rule(a)
}, CLASS_NAME: "OpenLayers.Rule"});
OpenLayers.Renderer.VML = OpenLayers.Class(OpenLayers.Renderer.Elements, {xmlns: "urn:schemas-microsoft-com:vml", symbolCache: {}, offset: null, initialize: function (a) {
    if (this.supported()) {
        if (!document.namespaces.olv) {
            document.namespaces.add("olv", this.xmlns);
            for (var b = document.createStyleSheet(), c = "shape rect oval fill stroke imagedata group textbox".split(" "), d = 0, e = c.length; d < e; d++)b.addRule("olv\\:" + c[d], "behavior: url(#default#VML); position: absolute; display: inline-block;")
        }
        OpenLayers.Renderer.Elements.prototype.initialize.apply(this,
            arguments)
    }
}, supported: function () {
    return!!document.namespaces
}, setExtent: function (a, b) {
    var c = OpenLayers.Renderer.Elements.prototype.setExtent.apply(this, arguments), d = this.getResolution(), e = a.left / d | 0, d = a.top / d - this.size.h | 0;
    b || !this.offset ? (this.offset = {x: e, y: d}, d = e = 0) : (e -= this.offset.x, d -= this.offset.y);
    this.root.coordorigin = e - this.xOffset + " " + d;
    for (var e = [this.root, this.vectorRoot, this.textRoot], f = 0, g = e.length; f < g; ++f)d = e[f], d.coordsize = this.size.w + " " + this.size.h;
    this.root.style.flip = "y";
    return c
},
    setSize: function (a) {
        OpenLayers.Renderer.prototype.setSize.apply(this, arguments);
        for (var b = [this.rendererRoot, this.root, this.vectorRoot, this.textRoot], c = this.size.w + "px", d = this.size.h + "px", e, f = 0, g = b.length; f < g; ++f)e = b[f], e.style.width = c, e.style.height = d
    }, getNodeType: function (a, b) {
        var c = null;
        switch (a.CLASS_NAME) {
            case "OpenLayers.Geometry.Point":
                c = b.externalGraphic ? "olv:rect" : this.isComplexSymbol(b.graphicName) ? "olv:shape" : "olv:oval";
                break;
            case "OpenLayers.Geometry.Rectangle":
                c = "olv:rect";
                break;
            case "OpenLayers.Geometry.LineString":
            case "OpenLayers.Geometry.LinearRing":
            case "OpenLayers.Geometry.Polygon":
            case "OpenLayers.Geometry.Curve":
                c =
                    "olv:shape"
        }
        return c
    }, setStyle: function (a, b, c, d) {
        b = b || a._style;
        c = c || a._options;
        var e = b.fillColor, f = b.title || b.graphicTitle;
        f && (a.title = f);
        if ("OpenLayers.Geometry.Point" === a._geometryClass)if (b.externalGraphic) {
            c.isFilled = !0;
            var e = b.graphicWidth || b.graphicHeight, f = b.graphicHeight || b.graphicWidth, e = e ? e : 2 * b.pointRadius, f = f ? f : 2 * b.pointRadius, g = this.getResolution(), h = void 0 != b.graphicXOffset ? b.graphicXOffset : -(0.5 * e), k = void 0 != b.graphicYOffset ? b.graphicYOffset : -(0.5 * f);
            a.style.left = ((d.x - this.featureDx) /
                g - this.offset.x + h | 0) + "px";
            a.style.top = (d.y / g - this.offset.y - (k + f) | 0) + "px";
            a.style.width = e + "px";
            a.style.height = f + "px";
            a.style.flip = "y";
            e = "none";
            c.isStroked = !1
        } else this.isComplexSymbol(b.graphicName) ? (f = this.importSymbol(b.graphicName), a.path = f.path, a.coordorigin = f.left + "," + f.bottom, f = f.size, a.coordsize = f + "," + f, this.drawCircle(a, d, b.pointRadius), a.style.flip = "y") : this.drawCircle(a, d, b.pointRadius);
        c.isFilled ? a.fillcolor = e : a.filled = "false";
        d = a.getElementsByTagName("fill");
        d = 0 == d.length ? null : d[0];
        c.isFilled ?
            (d || (d = this.createNode("olv:fill", a.id + "_fill")), d.opacity = b.fillOpacity, "OpenLayers.Geometry.Point" === a._geometryClass && b.externalGraphic && (b.graphicOpacity && (d.opacity = b.graphicOpacity), d.src = b.externalGraphic, d.type = "frame", b.graphicWidth && b.graphicHeight || (d.aspect = "atmost")), d.parentNode != a && a.appendChild(d)) : d && a.removeChild(d);
        e = b.rotation;
        if (void 0 !== e || void 0 !== a._rotation)a._rotation = e, b.externalGraphic ? (this.graphicRotate(a, h, k, b), d.opacity = 0) : "OpenLayers.Geometry.Point" === a._geometryClass &&
            (a.style.rotation = e || 0);
        h = a.getElementsByTagName("stroke");
        h = 0 == h.length ? null : h[0];
        c.isStroked ? (h || (h = this.createNode("olv:stroke", a.id + "_stroke"), a.appendChild(h)), h.on = !0, h.color = b.strokeColor, h.weight = b.strokeWidth + "px", h.opacity = b.strokeOpacity, h.endcap = "butt" == b.strokeLinecap ? "flat" : b.strokeLinecap || "round", b.strokeDashstyle && (h.dashstyle = this.dashStyle(b))) : (a.stroked = !1, h && (h.on = !1));
        "inherit" != b.cursor && null != b.cursor && (a.style.cursor = b.cursor);
        return a
    }, graphicRotate: function (a, b, c, d) {
        d =
            d || a._style;
        var e = d.rotation || 0, f, g;
        if (d.graphicWidth && d.graphicHeight) {
            g = Math.max(d.graphicWidth, d.graphicHeight);
            f = d.graphicWidth / d.graphicHeight;
            var h = Math.round(d.graphicWidth || g * f), k = Math.round(d.graphicHeight || g);
            a.style.width = h + "px";
            a.style.height = k + "px";
            var l = document.getElementById(a.id + "_image");
            l || (l = this.createNode("olv:imagedata", a.id + "_image"), a.appendChild(l));
            l.style.width = h + "px";
            l.style.height = k + "px";
            l.src = d.externalGraphic;
            l.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='', sizingMethod='scale')";
            l = e * Math.PI / 180;
            e = Math.sin(l);
            l = Math.cos(l);
            e = "progid:DXImageTransform.Microsoft.Matrix(M11=" + l + ",M12=" + -e + ",M21=" + e + ",M22=" + l + ",SizingMethod='auto expand')\n";
            (l = d.graphicOpacity || d.fillOpacity) && 1 != l && (e += "progid:DXImageTransform.Microsoft.BasicImage(opacity=" + l + ")\n");
            a.style.filter = e;
            e = new OpenLayers.Geometry.Point(-b, -c);
            h = (new OpenLayers.Bounds(0, 0, h, k)).toGeometry();
            h.rotate(d.rotation, e);
            h = h.getBounds();
            a.style.left = Math.round(parseInt(a.style.left) + h.left) + "px";
            a.style.top = Math.round(parseInt(a.style.top) -
                h.bottom) + "px"
        } else {
            var m = new Image;
            m.onreadystatechange = OpenLayers.Function.bind(function () {
                if ("complete" == m.readyState || "interactive" == m.readyState)f = m.width / m.height, g = Math.max(2 * d.pointRadius, d.graphicWidth || 0, d.graphicHeight || 0), b *= f, d.graphicWidth = g * f, d.graphicHeight = g, this.graphicRotate(a, b, c, d)
            }, this);
            m.src = d.externalGraphic
        }
    }, postDraw: function (a) {
        a.style.visibility = "visible";
        var b = a._style.fillColor, c = a._style.strokeColor;
        "none" == b && a.fillcolor != b && (a.fillcolor = b);
        "none" == c && a.strokecolor !=
            c && (a.strokecolor = c)
    }, setNodeDimension: function (a, b) {
        var c = b.getBounds();
        if (c) {
            var d = this.getResolution(), c = new OpenLayers.Bounds((c.left - this.featureDx) / d - this.offset.x | 0, c.bottom / d - this.offset.y | 0, (c.right - this.featureDx) / d - this.offset.x | 0, c.top / d - this.offset.y | 0);
            a.style.left = c.left + "px";
            a.style.top = c.top + "px";
            a.style.width = c.getWidth() + "px";
            a.style.height = c.getHeight() + "px";
            a.coordorigin = c.left + " " + c.top;
            a.coordsize = c.getWidth() + " " + c.getHeight()
        }
    }, dashStyle: function (a) {
        a = a.strokeDashstyle;
        switch (a) {
            case "solid":
            case "dot":
            case "dash":
            case "dashdot":
            case "longdash":
            case "longdashdot":
                return a;
            default:
                return a = a.split(/[ ,]/), 2 == a.length ? 1 * a[0] >= 2 * a[1] ? "longdash" : 1 == a[0] || 1 == a[1] ? "dot" : "dash" : 4 == a.length ? 1 * a[0] >= 2 * a[1] ? "longdashdot" : "dashdot" : "solid"
        }
    }, createNode: function (a, b) {
        var c = document.createElement(a);
        b && (c.id = b);
        c.unselectable = "on";
        c.onselectstart = OpenLayers.Function.False;
        return c
    }, nodeTypeCompare: function (a, b) {
        var c = b, d = c.indexOf(":");
        -1 != d && (c = c.substr(d + 1));
        var e = a.nodeName, d = e.indexOf(":");
        -1 != d && (e = e.substr(d + 1));
        return c == e
    }, createRenderRoot: function () {
        return this.nodeFactory(this.container.id +
            "_vmlRoot", "div")
    }, createRoot: function (a) {
        return this.nodeFactory(this.container.id + a, "olv:group")
    }, drawPoint: function (a, b) {
        return this.drawCircle(a, b, 1)
    }, drawCircle: function (a, b, c) {
        if (!isNaN(b.x) && !isNaN(b.y)) {
            var d = this.getResolution();
            a.style.left = ((b.x - this.featureDx) / d - this.offset.x | 0) - c + "px";
            a.style.top = (b.y / d - this.offset.y | 0) - c + "px";
            b = 2 * c;
            a.style.width = b + "px";
            a.style.height = b + "px";
            return a
        }
        return!1
    }, drawLineString: function (a, b) {
        return this.drawLine(a, b, !1)
    }, drawLinearRing: function (a, b) {
        return this.drawLine(a,
            b, !0)
    }, drawLine: function (a, b, c) {
        this.setNodeDimension(a, b);
        for (var d = this.getResolution(), e = b.components.length, f = Array(e), g, h, k = 0; k < e; k++)g = b.components[k], h = (g.x - this.featureDx) / d - this.offset.x | 0, g = g.y / d - this.offset.y | 0, f[k] = " " + h + "," + g + " l ";
        b = c ? " x e" : " e";
        a.path = "m" + f.join("") + b;
        return a
    }, drawPolygon: function (a, b) {
        this.setNodeDimension(a, b);
        var c = this.getResolution(), d = [], e, f, g, h, k, l, m, r, p, n;
        e = 0;
        for (f = b.components.length; e < f; e++) {
            d.push("m");
            g = b.components[e].components;
            h = 0 === e;
            l = k = null;
            m = 0;
            for (r = g.length; m < r; m++)p = g[m], n = (p.x - this.featureDx) / c - this.offset.x | 0, p = p.y / c - this.offset.y | 0, n = " " + n + "," + p, d.push(n), 0 == m && d.push(" l"), h || (k ? k != n && (l ? l != n && (h = !0) : l = n) : k = n);
            d.push(h ? " x " : " ")
        }
        d.push("e");
        a.path = d.join("");
        return a
    }, drawRectangle: function (a, b) {
        var c = this.getResolution();
        a.style.left = ((b.x - this.featureDx) / c - this.offset.x | 0) + "px";
        a.style.top = (b.y / c - this.offset.y | 0) + "px";
        a.style.width = (b.width / c | 0) + "px";
        a.style.height = (b.height / c | 0) + "px";
        return a
    }, drawText: function (a, b, c) {
        var d = this.nodeFactory(a +
            this.LABEL_ID_SUFFIX, "olv:rect"), e = this.nodeFactory(a + this.LABEL_ID_SUFFIX + "_textbox", "olv:textbox"), f = this.getResolution();
        d.style.left = ((c.x - this.featureDx) / f - this.offset.x | 0) + "px";
        d.style.top = (c.y / f - this.offset.y | 0) + "px";
        d.style.flip = "y";
        e.innerText = b.label;
        "inherit" != b.cursor && null != b.cursor && (e.style.cursor = b.cursor);
        b.fontColor && (e.style.color = b.fontColor);
        b.fontOpacity && (e.style.filter = "alpha(opacity=" + 100 * b.fontOpacity + ")");
        b.fontFamily && (e.style.fontFamily = b.fontFamily);
        b.fontSize && (e.style.fontSize =
            b.fontSize);
        b.fontWeight && (e.style.fontWeight = b.fontWeight);
        b.fontStyle && (e.style.fontStyle = b.fontStyle);
        !0 === b.labelSelect && (d._featureId = a, e._featureId = a, e._geometry = c, e._geometryClass = c.CLASS_NAME);
        e.style.whiteSpace = "nowrap";
        e.inset = "1px,0px,0px,0px";
        d.parentNode || (d.appendChild(e), this.textRoot.appendChild(d));
        b = b.labelAlign || "cm";
        1 == b.length && (b += "m");
        a = e.clientWidth * OpenLayers.Renderer.VML.LABEL_SHIFT[b.substr(0, 1)];
        e = e.clientHeight * OpenLayers.Renderer.VML.LABEL_SHIFT[b.substr(1, 1)];
        d.style.left =
            parseInt(d.style.left) - a - 1 + "px";
        d.style.top = parseInt(d.style.top) + e + "px"
    }, moveRoot: function (a) {
        var b = this.map.getLayer(a.container.id);
        b instanceof OpenLayers.Layer.Vector.RootContainer && (b = this.map.getLayer(this.container.id));
        b && b.renderer.clear();
        OpenLayers.Renderer.Elements.prototype.moveRoot.apply(this, arguments);
        b && b.redraw()
    }, importSymbol: function (a) {
        var b = this.container.id + "-" + a, c = this.symbolCache[b];
        if (c)return c;
        c = OpenLayers.Renderer.symbol[a];
        if (!c)throw Error(a + " is not a valid symbol name");
        a = new OpenLayers.Bounds(Number.MAX_VALUE, Number.MAX_VALUE, 0, 0);
        for (var d = ["m"], e = 0; e < c.length; e += 2) {
            var f = c[e], g = c[e + 1];
            a.left = Math.min(a.left, f);
            a.bottom = Math.min(a.bottom, g);
            a.right = Math.max(a.right, f);
            a.top = Math.max(a.top, g);
            d.push(f);
            d.push(g);
            0 == e && d.push("l")
        }
        d.push("x e");
        c = d.join(" ");
        d = (a.getWidth() - a.getHeight()) / 2;
        0 < d ? (a.bottom -= d, a.top += d) : (a.left += d, a.right -= d);
        c = {path: c, size: a.getWidth(), left: a.left, bottom: a.bottom};
        return this.symbolCache[b] = c
    }, CLASS_NAME: "OpenLayers.Renderer.VML"});
OpenLayers.Renderer.VML.LABEL_SHIFT = {l: 0, c: 0.5, r: 1, t: 0, m: 0.5, b: 1};
OpenLayers.Protocol = OpenLayers.Class({format: null, options: null, autoDestroy: !0, defaultFilter: null, initialize: function (a) {
    a = a || {};
    OpenLayers.Util.extend(this, a);
    this.options = a
}, mergeWithDefaultFilter: function (a) {
    return a && this.defaultFilter ? new OpenLayers.Filter.Logical({type: OpenLayers.Filter.Logical.AND, filters: [this.defaultFilter, a]}) : a || this.defaultFilter || void 0
}, destroy: function () {
    this.format = this.options = null
}, read: function (a) {
    a = a || {};
    a.filter = this.mergeWithDefaultFilter(a.filter)
}, create: function () {
},
    update: function () {
    }, "delete": function () {
    }, commit: function () {
    }, abort: function (a) {
    }, createCallback: function (a, b, c) {
        return OpenLayers.Function.bind(function () {
            a.apply(this, [b, c])
        }, this)
    }, CLASS_NAME: "OpenLayers.Protocol"});
OpenLayers.Protocol.Response = OpenLayers.Class({code: null, requestType: null, last: !0, features: null, data: null, reqFeatures: null, priv: null, error: null, initialize: function (a) {
    OpenLayers.Util.extend(this, a)
}, success: function () {
    return 0 < this.code
}, CLASS_NAME: "OpenLayers.Protocol.Response"});
OpenLayers.Protocol.Response.SUCCESS = 1;
OpenLayers.Protocol.Response.FAILURE = 0;
OpenLayers.Protocol.HTTP = OpenLayers.Class(OpenLayers.Protocol, {url: null, headers: null, params: null, callback: null, scope: null, readWithPOST: !1, updateWithPOST: !1, deleteWithPOST: !1, wildcarded: !1, srsInBBOX: !1, initialize: function (a) {
    a = a || {};
    this.params = {};
    this.headers = {};
    OpenLayers.Protocol.prototype.initialize.apply(this, arguments);
    if (!this.filterToParams && OpenLayers.Format.QueryStringFilter) {
        var b = new OpenLayers.Format.QueryStringFilter({wildcarded: this.wildcarded, srsInBBOX: this.srsInBBOX});
        this.filterToParams =
            function (a, d) {
                return b.write(a, d)
            }
    }
}, destroy: function () {
    this.headers = this.params = null;
    OpenLayers.Protocol.prototype.destroy.apply(this)
}, read: function (a) {
    OpenLayers.Protocol.prototype.read.apply(this, arguments);
    a = a || {};
    a.params = OpenLayers.Util.applyDefaults(a.params, this.options.params);
    a = OpenLayers.Util.applyDefaults(a, this.options);
    a.filter && this.filterToParams && (a.params = this.filterToParams(a.filter, a.params));
    var b = void 0 !== a.readWithPOST ? a.readWithPOST : this.readWithPOST, c = new OpenLayers.Protocol.Response({requestType: "read"});
    b ? (b = a.headers || {}, b["Content-Type"] = "application/x-www-form-urlencoded", c.priv = OpenLayers.Request.POST({url: a.url, callback: this.createCallback(this.handleRead, c, a), data: OpenLayers.Util.getParameterString(a.params), headers: b})) : c.priv = OpenLayers.Request.GET({url: a.url, callback: this.createCallback(this.handleRead, c, a), params: a.params, headers: a.headers});
    return c
}, handleRead: function (a, b) {
    this.handleResponse(a, b)
}, create: function (a, b) {
    b = OpenLayers.Util.applyDefaults(b, this.options);
    var c = new OpenLayers.Protocol.Response({reqFeatures: a,
        requestType: "create"});
    c.priv = OpenLayers.Request.POST({url: b.url, callback: this.createCallback(this.handleCreate, c, b), headers: b.headers, data: this.format.write(a)});
    return c
}, handleCreate: function (a, b) {
    this.handleResponse(a, b)
}, update: function (a, b) {
    b = b || {};
    var c = b.url || a.url || this.options.url + "/" + a.fid;
    b = OpenLayers.Util.applyDefaults(b, this.options);
    var d = new OpenLayers.Protocol.Response({reqFeatures: a, requestType: "update"});
    d.priv = OpenLayers.Request[this.updateWithPOST ? "POST" : "PUT"]({url: c, callback: this.createCallback(this.handleUpdate,
        d, b), headers: b.headers, data: this.format.write(a)});
    return d
}, handleUpdate: function (a, b) {
    this.handleResponse(a, b)
}, "delete": function (a, b) {
    b = b || {};
    var c = b.url || a.url || this.options.url + "/" + a.fid;
    b = OpenLayers.Util.applyDefaults(b, this.options);
    var d = new OpenLayers.Protocol.Response({reqFeatures: a, requestType: "delete"}), e = this.deleteWithPOST ? "POST" : "DELETE", c = {url: c, callback: this.createCallback(this.handleDelete, d, b), headers: b.headers};
    this.deleteWithPOST && (c.data = this.format.write(a));
    d.priv = OpenLayers.Request[e](c);
    return d
}, handleDelete: function (a, b) {
    this.handleResponse(a, b)
}, handleResponse: function (a, b) {
    var c = a.priv;
    b.callback && (200 <= c.status && 300 > c.status ? ("delete" != a.requestType && (a.features = this.parseFeatures(c)), a.code = OpenLayers.Protocol.Response.SUCCESS) : a.code = OpenLayers.Protocol.Response.FAILURE, b.callback.call(b.scope, a))
}, parseFeatures: function (a) {
    var b = a.responseXML;
    b && b.documentElement || (b = a.responseText);
    return!b || 0 >= b.length ? null : this.format.read(b)
}, commit: function (a, b) {
    function c(a) {
        for (var b =
            a.features ? a.features.length : 0, c = Array(b), e = 0; e < b; ++e)c[e] = a.features[e].fid;
        q.insertIds = c;
        d.apply(this, [a])
    }

    function d(a) {
        this.callUserCallback(a, b);
        n = n && a.success();
        f++;
        f >= p && b.callback && (q.code = n ? OpenLayers.Protocol.Response.SUCCESS : OpenLayers.Protocol.Response.FAILURE, b.callback.apply(b.scope, [q]))
    }

    b = OpenLayers.Util.applyDefaults(b, this.options);
    var e = [], f = 0, g = {};
    g[OpenLayers.State.INSERT] = [];
    g[OpenLayers.State.UPDATE] = [];
    g[OpenLayers.State.DELETE] = [];
    for (var h, k, l = [], m = 0, r = a.length; m < r; ++m)if (h =
        a[m], k = g[h.state])k.push(h), l.push(h);
    var p = (0 < g[OpenLayers.State.INSERT].length ? 1 : 0) + g[OpenLayers.State.UPDATE].length + g[OpenLayers.State.DELETE].length, n = !0, q = new OpenLayers.Protocol.Response({reqFeatures: l});
    h = g[OpenLayers.State.INSERT];
    0 < h.length && e.push(this.create(h, OpenLayers.Util.applyDefaults({callback: c, scope: this}, b.create)));
    h = g[OpenLayers.State.UPDATE];
    for (m = h.length - 1; 0 <= m; --m)e.push(this.update(h[m], OpenLayers.Util.applyDefaults({callback: d, scope: this}, b.update)));
    h = g[OpenLayers.State.DELETE];
    for (m = h.length - 1; 0 <= m; --m)e.push(this["delete"](h[m], OpenLayers.Util.applyDefaults({callback: d, scope: this}, b["delete"])));
    return e
}, abort: function (a) {
    a && a.priv.abort()
}, callUserCallback: function (a, b) {
    var c = b[a.requestType];
    c && c.callback && c.callback.call(c.scope, a)
}, CLASS_NAME: "OpenLayers.Protocol.HTTP"});
OpenLayers.Control.LayerSwitcher = OpenLayers.Class(OpenLayers.Control, {layerStates: null, layersDiv: null, baseLayersDiv: null, baseLayers: null, dataLbl: null, dataLayersDiv: null, dataLayers: null, minimizeDiv: null, maximizeDiv: null, ascending: !0, initialize: function (a) {
    OpenLayers.Control.prototype.initialize.apply(this, arguments);
    this.layerStates = []
}, destroy: function () {
    this.clearLayersArray("base");
    this.clearLayersArray("data");
    this.map.events.un({buttonclick: this.onButtonClick, addlayer: this.redraw, changelayer: this.redraw,
        removelayer: this.redraw, changebaselayer: this.redraw, scope: this});
    this.events.unregister("buttonclick", this, this.onButtonClick);
    OpenLayers.Control.prototype.destroy.apply(this, arguments)
}, setMap: function (a) {
    OpenLayers.Control.prototype.setMap.apply(this, arguments);
    this.map.events.on({addlayer: this.redraw, changelayer: this.redraw, removelayer: this.redraw, changebaselayer: this.redraw, scope: this});
    this.outsideViewport ? (this.events.attachToElement(this.div), this.events.register("buttonclick", this, this.onButtonClick)) :
        this.map.events.register("buttonclick", this, this.onButtonClick)
}, draw: function () {
    OpenLayers.Control.prototype.draw.apply(this);
    this.loadContents();
    this.outsideViewport || this.minimizeControl();
    this.redraw();
    return this.div
}, onButtonClick: function (a) {
    a = a.buttonElement;
    a === this.minimizeDiv ? this.minimizeControl() : a === this.maximizeDiv ? this.maximizeControl() : a._layerSwitcher === this.id && (a["for"] && (a = document.getElementById(a["for"])), a.disabled || ("radio" == a.type ? (a.checked = !0, this.map.setBaseLayer(this.map.getLayer(a._layer))) :
        (a.checked = !a.checked, this.updateMap())))
}, clearLayersArray: function (a) {
    this[a + "LayersDiv"].innerHTML = "";
    this[a + "Layers"] = []
}, checkRedraw: function () {
    if (!this.layerStates.length || this.map.layers.length != this.layerStates.length)return!0;
    for (var a = 0, b = this.layerStates.length; a < b; a++) {
        var c = this.layerStates[a], d = this.map.layers[a];
        if (c.name != d.name || c.inRange != d.inRange || c.id != d.id || c.visibility != d.visibility)return!0
    }
    return!1
}, redraw: function () {
    if (!this.checkRedraw())return this.div;
    this.clearLayersArray("base");
    this.clearLayersArray("data");
    var a = !1, b = !1, c = this.map.layers.length;
    this.layerStates = Array(c);
    for (var d = 0; d < c; d++) {
        var e = this.map.layers[d];
        this.layerStates[d] = {name: e.name, visibility: e.visibility, inRange: e.inRange, id: e.id}
    }
    var f = this.map.layers.slice();
    this.ascending || f.reverse();
    d = 0;
    for (c = f.length; d < c; d++) {
        var e = f[d], g = e.isBaseLayer;
        if (e.displayInLayerSwitcher) {
            g ? b = !0 : a = !0;
            var h = g ? e == this.map.baseLayer : e.getVisibility(), k = document.createElement("input"), l = OpenLayers.Util.createUniqueID(this.id +
                "_input_");
            k.id = l;
            k.name = g ? this.id + "_baseLayers" : e.name;
            k.type = g ? "radio" : "checkbox";
            k.value = e.name;
            k.checked = h;
            k.defaultChecked = h;
            k.className = "olButton";
            k._layer = e.id;
            k._layerSwitcher = this.id;
            g || e.inRange || (k.disabled = !0);
            h = document.createElement("label");
            h["for"] = k.id;
            OpenLayers.Element.addClass(h, "labelSpan olButton");
            h._layer = e.id;
            h._layerSwitcher = this.id;
            g || e.inRange || (h.style.color = "gray");
            h.innerHTML = e.name;
            h.style.verticalAlign = g ? "bottom" : "baseline";
            l = document.createElement("br");
            (g ? this.baseLayers :
                this.dataLayers).push({layer: e, inputElem: k, labelSpan: h});
            e = g ? this.baseLayersDiv : this.dataLayersDiv;
            e.appendChild(k);
            e.appendChild(h);
            e.appendChild(l)
        }
    }
    this.dataLbl.style.display = a ? "" : "none";
    this.baseLbl.style.display = b ? "" : "none";
    return this.div
}, updateMap: function () {
    for (var a = 0, b = this.baseLayers.length; a < b; a++) {
        var c = this.baseLayers[a];
        c.inputElem.checked && this.map.setBaseLayer(c.layer, !1)
    }
    a = 0;
    for (b = this.dataLayers.length; a < b; a++)c = this.dataLayers[a], c.layer.setVisibility(c.inputElem.checked)
}, maximizeControl: function (a) {
    this.div.style.width =
        "";
    this.div.style.height = "";
    this.showControls(!1);
    null != a && OpenLayers.Event.stop(a)
}, minimizeControl: function (a) {
    this.div.style.width = "0px";
    this.div.style.height = "0px";
    this.showControls(!0);
    null != a && OpenLayers.Event.stop(a)
}, showControls: function (a) {
    this.maximizeDiv.style.display = a ? "" : "none";
    this.minimizeDiv.style.display = a ? "none" : "";
    this.layersDiv.style.display = a ? "none" : ""
}, loadContents: function () {
    this.layersDiv = document.createElement("div");
    this.layersDiv.id = this.id + "_layersDiv";
    OpenLayers.Element.addClass(this.layersDiv,
        "layersDiv");
    this.baseLbl = document.createElement("div");
    this.baseLbl.innerHTML = OpenLayers.i18n("Base Layer");
    OpenLayers.Element.addClass(this.baseLbl, "baseLbl");
    this.baseLayersDiv = document.createElement("div");
    OpenLayers.Element.addClass(this.baseLayersDiv, "baseLayersDiv");
    this.dataLbl = document.createElement("div");
    this.dataLbl.innerHTML = OpenLayers.i18n("Overlays");
    OpenLayers.Element.addClass(this.dataLbl, "dataLbl");
    this.dataLayersDiv = document.createElement("div");
    OpenLayers.Element.addClass(this.dataLayersDiv,
        "dataLayersDiv");
    this.ascending ? (this.layersDiv.appendChild(this.baseLbl), this.layersDiv.appendChild(this.baseLayersDiv), this.layersDiv.appendChild(this.dataLbl), this.layersDiv.appendChild(this.dataLayersDiv)) : (this.layersDiv.appendChild(this.dataLbl), this.layersDiv.appendChild(this.dataLayersDiv), this.layersDiv.appendChild(this.baseLbl), this.layersDiv.appendChild(this.baseLayersDiv));
    this.div.appendChild(this.layersDiv);
    var a = OpenLayers.Util.getImageLocation("layer-switcher-maximize.png");
    this.maximizeDiv =
        OpenLayers.Util.createAlphaImageDiv("OpenLayers_Control_MaximizeDiv", null, null, a, "absolute");
    OpenLayers.Element.addClass(this.maximizeDiv, "maximizeDiv olButton");
    this.maximizeDiv.style.display = "none";
    this.div.appendChild(this.maximizeDiv);
    a = OpenLayers.Util.getImageLocation("layer-switcher-minimize.png");
    this.minimizeDiv = OpenLayers.Util.createAlphaImageDiv("OpenLayers_Control_MinimizeDiv", null, null, a, "absolute");
    OpenLayers.Element.addClass(this.minimizeDiv, "minimizeDiv olButton");
    this.minimizeDiv.style.display =
        "none";
    this.div.appendChild(this.minimizeDiv)
}, CLASS_NAME: "OpenLayers.Control.LayerSwitcher"});
