! function e(t, r, i) {
    function n(a, s) {
        if (!r[a]) {
            if (!t[a]) {
                var h = "function" == typeof require && require;
                if (!s && h) return h(a, !0);
                if (o) return o(a, !0);
                var l = new Error("Cannot find module '" + a + "'");
                throw l.code = "MODULE_NOT_FOUND", l
            }
            var u = r[a] = {
                exports: {}
            };
            t[a][0].call(u.exports, function(e) {
                var r = t[a][1][e];
                return n(r ? r : e)
            }, u, u.exports, e, t, r, i)
        }
        return r[a].exports
    }
    for (var o = "function" == typeof require && require, a = 0; a < i.length; a++) n(i[a]);
    return n
}({
    1: [function(e, t, r) {
        "use strict";

        function i(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function n(e) {
            e = e || 0;
            var t = U[O++ % U.length];
            d["default"]("img/" + t, function(t, r) {
                if (t) throw t;
                o(r, e)
            })
        }

        function o(e, t) {
            t = t || 0;
            var r = false,
                i = g.parse(e),
                o = L["default"](i, {
                    scale: 5,
                    simplify: 1
                });
            o = M["default"](T["default"](o.positions, o.cells));
            var s = a(o.positions, o.cells),
                h = new P(o),

                l = new u["default"].ShaderMaterial({
                    color: 16777216,
                    side: u["default"].DoubleSide,
                    vertexShader: D,
                    fragmentShader: F,
                    wireframe: r,
                    transparent: !0,
                    attributes: s,
                    uniforms: {
                        opacity: {
                            type: "f",
                            value: 1
                        },
                        scale: {
                            type: "f",
                            value: 0
                        },
                        animate: {
                            type: "f",
                            value: 0
                        }
                    }
                }),
                c = new u["default"].Mesh(h, l);
            z.add(c);
            var f = 6 + t;
            R.to(l.uniforms.animate, {
                duration: 1.5,
                value: 1,
                delay: t,
                ease: "expoInOut"
            }), R.to(l.uniforms.scale, {
                duration: 1,
                value: 1,
                delay: t
            })
        }

        function a(e, t) {
            for (var r = [], i = [], n = 0; n < t.length; n++) {
                var o = h(t[n], 3),
                    a = o[0],
                    s = o[1],
                    l = o[2],
                    c = [e[a], e[s], e[l]],
                    f = b["default"](c),
                    p = (new u["default"].Vector3).fromArray(f);
                i.push(p, p, p);
                var d = x["default"]([], Math.random()),
                    m = (new u["default"].Vector3).fromArray(d);
                r.push(m, m, m)
            }
            return {
                direction: {
                    type: "v3",
                    value: r
                },
                centroid: {
                    type: "v3",
                    value: i
                }
            }
        }

        function s() {
            function e() {
                var e = h(r.shape, 2),
                    i = e[0],
                    n = e[1];
                V.aspect = i / n, k.setSize(i, n, !1), V.updateProjectionMatrix(), t()
            }

            function t() {
                k.render(z, V)
            }
            var r = f["default"](B, {
                scale: k.devicePixelRatio
            }).start().on("tick", t).on("resize", e);
            e()
        }
        var h = function() {
                function e(e, t) {
                    var r = [],
                        i = !0,
                        n = !1,
                        o = void 0;
                    try {
                        for (var a, s = e[Symbol.iterator](); !(i = (a = s.next()).done) && (r.push(a.value), !t || r.length !== t); i = !0);
                    } catch (h) {
                        n = !0, o = h
                    } finally {
                        try {
                            !i && s["return"] && s["return"]()
                        } finally {
                            if (n) throw o
                        }
                    }
                    return r
                }
                return function(t, r) {
                    if (Array.isArray(t)) return t;
                    if (Symbol.iterator in Object(t)) return e(t, r);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            l = e("three"),
            u = i(l),
            c = e("canvas-loop"),
            f = i(c),
            p = e("load-svg"),
            d = i(p),
            m = e("tweenr"),
            v = i(m),
            g = e("extract-svg-path"),
            y = e("gl-vec3/random"),
            x = i(y),
            w = e("triangle-centroid"),
            b = i(w),
            _ = e("mesh-reindex"),
            M = i(_),
            S = e("unindex-mesh"),
            T = i(S),
            A = e("array-shuffle"),
            E = i(A),
            C = e("../"),
            L = i(C),
            P = e("three-simplicial-complex")(u["default"]),
            R = v["default"]({
                defaultEase: "expoOut"
            }),
            D = "attribute vec3 direction;\nattribute vec3 centroid;\n\nuniform float animate;\nuniform float opacity;\nuniform float scale;\n\n#define PI 3.14\n\nvoid main() {\n  // rotate the triangles\n  // each half rotates the opposite direction\n  float theta = (1.0 - animate) * (PI * 1.5) * sign(centroid.x);\n  mat3 rotMat = mat3(\n    vec3(cos(theta), 0.0, sin(theta)),\n    vec3(0.0, 1.0, 0.0),\n    vec3(-sin(theta), 0.0, cos(theta))\n  );\n  \n  // push outward\n  vec3 offset = mix(vec3(0.0), direction.xyz * rotMat, 1.0 - animate);\n  \n  // scale triangles to their centroids\n  vec3 tPos = mix(centroid.xyz, position.xyz, scale) + offset;\n  \n  gl_Position = projectionMatrix *\n              modelViewMatrix *\n              vec4(tPos, 1.0);\n}",
            F = "uniform float animate;\nuniform float opacity;\n\nvoid main() {\n  gl_FragColor = vec4(vec3(1.0), opacity);\n}",
        //U = ["TGVA.svg"].filter(function(e) {
            U = ["HBX-Logo-Color.svg"].filter(function(e) {
                return /\.svg/.test(e)
            });
        //U = E["default"](U), document.querySelector(".count").innerText = U.length;
        var B = document.querySelector("#loading_logo");
        B.addEventListener("touchstart", function(e) {
            return e.preventDefault()
        }), B.addEventListener("contextmenu", function(e) {
            return e.preventDefault()
        });
        var k = new u["default"].WebGLRenderer({
            canvas: B,
            antialias: !0,
            devicePixelRatio: window.devicePixelRatio
        });
        //https://www.mathsisfun.com/hexadecimal-decimal-colors.html
        k.setClearColor(5703965, 1);
        var z = new u["default"].Scene,
            V = new u["default"].PerspectiveCamera(50, 1, .01, 100);
        V.position.set(0, 0, 5);
        var O = 0;
        s(), n()
    }, {
        "../": 2,
        "array-shuffle": 3,
        "canvas-loop": 11,
        "extract-svg-path": 83,
        "gl-vec3/random": 85,
        "load-svg": 86,
        "mesh-reindex": 94,
        three: 111,
        "three-simplicial-complex": 109,
        "triangle-centroid": 112,
        tweenr: 113,
        "unindex-mesh": 163
    }],
    2: [function(e, t, r) {
        "use strict";

        function i(e, t) {
            if ("string" != typeof e) throw new TypeError("must provide a string as first parameter");
            t = d({
                delaunay: !0,
                clean: !0,
                exterior: !1,
                randomization: 0,
                simplify: 0,
                scale: 1
            }, t);
            var r, i = s(e),
                p = h(i, t.scale);
            if (t.simplify > 0 && "number" == typeof t.simplify)
                for (r = 0; r < p.length; r++) p[r] = m(p[r], t.simplify);
            var v = a(p),
                g = v.positions,
                y = c(g),
                x = t.randomization;
            "number" == typeof x && x > 0 && o(g, y, x);
            var w = v.edges,
                b = [];
            for (r = 0; r < w.length; ++r)
                for (var _ = w[r], M = 0; M < _.length; ++M) b.push([_[M], _[(M + 1) % _.length]]);
            t.clean !== !1 && u(g, b);
            var S = l(g, b, t);
            return f(g, y), n(g), {
                positions: g,
                cells: S
            }
        }

        function n(e) {
            for (var t = 0; t < e.length; t++) {
                var r = e[t];
                r[1] *= -1, r[2] = r[2] || 0
            }
        }

        function o(e, t, r) {
            for (var i = t[0], n = t[1], o = 0; r > o; o++) e.push([p(i[0], n[0]), p(i[1], n[1])])
        }

        function a(e) {
            for (var t = [], r = [], i = 0; i < e.length; i++) {
                for (var n = e[i], o = [], a = 0; a < n.length; a++) {
                    var s = n[a],
                        h = t.indexOf(s); - 1 === h && (t.push(s), h = t.length - 1), o.push(h)
                }
                r.push(o)
            }
            return {
                positions: t,
                edges: r
            }
        }
        var s = e("parse-svg-path"),
            h = e("svg-path-contours"),
            l = e("cdt2d"),
            u = e("clean-pslg"),
            c = e("bound-points"),
            f = e("normalize-path-scale"),
            p = e("random-float"),
            d = e("object-assign"),
            m = e("simplify-path");
        t.exports = i
    }, {
        "bound-points": 4,
        cdt2d: 19,
        "clean-pslg": 37,
        "normalize-path-scale": 95,
        "object-assign": 97,
        "parse-svg-path": 98,
        "random-float": 99,
        "simplify-path": 101,
        "svg-path-contours": 103
    }],
    3: [function(e, t, r) {
        "use strict";
        t.exports = function(e) {
            if (!Array.isArray(e)) throw new TypeError("Expected an array");
            for (var t, r, i = e.length, n = e.slice(); i;) t = Math.floor(Math.random() * i--), r = n[i], n[i] = n[t], n[t] = r;
            return n
        }
    }, {}],
    4: [function(e, t, r) {
        "use strict";

        function i(e) {
            var t = e.length;
            if (0 === t) return [
                [],
                []
            ];
            for (var r = e[0].length, i = e[0].slice(), n = e[0].slice(), o = 1; t > o; ++o)
                for (var a = e[o], s = 0; r > s; ++s) {
                    var h = a[s];
                    i[s] = Math.min(i[s], h), n[s] = Math.max(n[s], h)
                }
            return [i, n]
        }
        t.exports = i
    }, {}],
    5: [function(e, t, r) {
        (function(t) {
            function i() {
                return n.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
            }

            function n(e) {
                return this instanceof n ? (this.length = 0, this.parent = void 0, "number" == typeof e ? o(this, e) : "string" == typeof e ? a(this, e, arguments.length > 1 ? arguments[1] : "utf8") : s(this, e)) : arguments.length > 1 ? new n(e, arguments[1]) : new n(e)
            }

            function o(e, t) {
                if (e = d(e, 0 > t ? 0 : 0 | m(t)), !n.TYPED_ARRAY_SUPPORT)
                    for (var r = 0; t > r; r++) e[r] = 0;
                return e
            }

            function a(e, t, r) {
                ("string" != typeof r || "" === r) && (r = "utf8");
                var i = 0 | g(t, r);
                return e = d(e, i), e.write(t, r), e
            }

            function s(e, t) {
                if (n.isBuffer(t)) return h(e, t);
                if (K(t)) return l(e, t);
                if (null == t) throw new TypeError("must start with number, buffer, array or string");
                if ("undefined" != typeof ArrayBuffer) {
                    if (t.buffer instanceof ArrayBuffer) return u(e, t);
                    if (t instanceof ArrayBuffer) return c(e, t)
                }
                return t.length ? f(e, t) : p(e, t)
            }

            function h(e, t) {
                var r = 0 | m(t.length);
                return e = d(e, r), t.copy(e, 0, 0, r), e
            }

            function l(e, t) {
                var r = 0 | m(t.length);
                e = d(e, r);
                for (var i = 0; r > i; i += 1) e[i] = 255 & t[i];
                return e
            }

            function u(e, t) {
                var r = 0 | m(t.length);
                e = d(e, r);
                for (var i = 0; r > i; i += 1) e[i] = 255 & t[i];
                return e
            }

            function c(e, t) {
                return n.TYPED_ARRAY_SUPPORT ? (t.byteLength, e = n._augment(new Uint8Array(t))) : e = u(e, new Uint8Array(t)), e
            }

            function f(e, t) {
                var r = 0 | m(t.length);
                e = d(e, r);
                for (var i = 0; r > i; i += 1) e[i] = 255 & t[i];
                return e
            }

            function p(e, t) {
                var r, i = 0;
                "Buffer" === t.type && K(t.data) && (r = t.data, i = 0 | m(r.length)), e = d(e, i);
                for (var n = 0; i > n; n += 1) e[n] = 255 & r[n];
                return e
            }

            function d(e, t) {
                n.TYPED_ARRAY_SUPPORT ? (e = n._augment(new Uint8Array(t)), e.__proto__ = n.prototype) : (e.length = t, e._isBuffer = !0);
                var r = 0 !== t && t <= n.poolSize >>> 1;
                return r && (e.parent = Z), e
            }

            function m(e) {
                if (e >= i()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + i().toString(16) + " bytes");
                return 0 | e
            }

            function v(e, t) {
                if (!(this instanceof v)) return new v(e, t);
                var r = new n(e, t);
                return delete r.parent, r
            }

            function g(e, t) {
                "string" != typeof e && (e = "" + e);
                var r = e.length;
                if (0 === r) return 0;
                for (var i = !1;;) switch (t) {
                    case "ascii":
                    case "binary":
                    case "raw":
                    case "raws":
                        return r;
                    case "utf8":
                    case "utf-8":
                        return G(e).length;
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return 2 * r;
                    case "hex":
                        return r >>> 1;
                    case "base64":
                        return j(e).length;
                    default:
                        if (i) return G(e).length;
                        t = ("" + t).toLowerCase(), i = !0
                }
            }

            function y(e, t, r) {
                var i = !1;
                if (t = 0 | t, r = void 0 === r || r === 1 / 0 ? this.length : 0 | r, e || (e = "utf8"), 0 > t && (t = 0), r > this.length && (r = this.length), t >= r) return "";
                for (;;) switch (e) {
                    case "hex":
                        return P(this, t, r);
                    case "utf8":
                    case "utf-8":
                        return A(this, t, r);
                    case "ascii":
                        return C(this, t, r);
                    case "binary":
                        return L(this, t, r);
                    case "base64":
                        return T(this, t, r);
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return R(this, t, r);
                    default:
                        if (i) throw new TypeError("Unknown encoding: " + e);
                        e = (e + "").toLowerCase(), i = !0
                }
            }

            function x(e, t, r, i) {
                r = Number(r) || 0;
                var n = e.length - r;
                i ? (i = Number(i), i > n && (i = n)) : i = n;
                var o = t.length;
                if (o % 2 !== 0) throw new Error("Invalid hex string");
                i > o / 2 && (i = o / 2);
                for (var a = 0; i > a; a++) {
                    var s = parseInt(t.substr(2 * a, 2), 16);
                    if (isNaN(s)) throw new Error("Invalid hex string");
                    e[r + a] = s
                }
                return a
            }

            function w(e, t, r, i) {
                return X(G(t, e.length - r), e, r, i)
            }

            function b(e, t, r, i) {
                return X(H(t), e, r, i)
            }

            function _(e, t, r, i) {
                return b(e, t, r, i)
            }

            function M(e, t, r, i) {
                return X(j(t), e, r, i)
            }

            function S(e, t, r, i) {
                return X(W(t, e.length - r), e, r, i)
            }

            function T(e, t, r) {
                return 0 === t && r === e.length ? q.fromByteArray(e) : q.fromByteArray(e.slice(t, r))
            }

            function A(e, t, r) {
                r = Math.min(e.length, r);
                for (var i = [], n = t; r > n;) {
                    var o = e[n],
                        a = null,
                        s = o > 239 ? 4 : o > 223 ? 3 : o > 191 ? 2 : 1;
                    if (r >= n + s) {
                        var h, l, u, c;
                        switch (s) {
                            case 1:
                                128 > o && (a = o);
                                break;
                            case 2:
                                h = e[n + 1], 128 === (192 & h) && (c = (31 & o) << 6 | 63 & h, c > 127 && (a = c));
                                break;
                            case 3:
                                h = e[n + 1], l = e[n + 2], 128 === (192 & h) && 128 === (192 & l) && (c = (15 & o) << 12 | (63 & h) << 6 | 63 & l, c > 2047 && (55296 > c || c > 57343) && (a = c));
                                break;
                            case 4:
                                h = e[n + 1], l = e[n + 2], u = e[n + 3], 128 === (192 & h) && 128 === (192 & l) && 128 === (192 & u) && (c = (15 & o) << 18 | (63 & h) << 12 | (63 & l) << 6 | 63 & u, c > 65535 && 1114112 > c && (a = c))
                        }
                    }
                    null === a ? (a = 65533, s = 1) : a > 65535 && (a -= 65536, i.push(a >>> 10 & 1023 | 55296), a = 56320 | 1023 & a), i.push(a), n += s
                }
                return E(i)
            }

            function E(e) {
                var t = e.length;
                if (Q >= t) return String.fromCharCode.apply(String, e);
                for (var r = "", i = 0; t > i;) r += String.fromCharCode.apply(String, e.slice(i, i += Q));
                return r
            }

            function C(e, t, r) {
                var i = "";
                r = Math.min(e.length, r);
                for (var n = t; r > n; n++) i += String.fromCharCode(127 & e[n]);
                return i
            }

            function L(e, t, r) {
                var i = "";
                r = Math.min(e.length, r);
                for (var n = t; r > n; n++) i += String.fromCharCode(e[n]);
                return i
            }

            function P(e, t, r) {
                var i = e.length;
                (!t || 0 > t) && (t = 0), (!r || 0 > r || r > i) && (r = i);
                for (var n = "", o = t; r > o; o++) n += I(e[o]);
                return n
            }

            function R(e, t, r) {
                for (var i = e.slice(t, r), n = "", o = 0; o < i.length; o += 2) n += String.fromCharCode(i[o] + 256 * i[o + 1]);
                return n
            }

            function D(e, t, r) {
                if (e % 1 !== 0 || 0 > e) throw new RangeError("offset is not uint");
                if (e + t > r) throw new RangeError("Trying to access beyond buffer length")
            }

            function F(e, t, r, i, o, a) {
                if (!n.isBuffer(e)) throw new TypeError("buffer must be a Buffer instance");
                if (t > o || a > t) throw new RangeError("value is out of bounds");
                if (r + i > e.length) throw new RangeError("index out of range")
            }

            function U(e, t, r, i) {
                0 > t && (t = 65535 + t + 1);
                for (var n = 0, o = Math.min(e.length - r, 2); o > n; n++) e[r + n] = (t & 255 << 8 * (i ? n : 1 - n)) >>> 8 * (i ? n : 1 - n)
            }

            function B(e, t, r, i) {
                0 > t && (t = 4294967295 + t + 1);
                for (var n = 0, o = Math.min(e.length - r, 4); o > n; n++) e[r + n] = t >>> 8 * (i ? n : 3 - n) & 255
            }

            function k(e, t, r, i, n, o) {
                if (t > n || o > t) throw new RangeError("value is out of bounds");
                if (r + i > e.length) throw new RangeError("index out of range");
                if (0 > r) throw new RangeError("index out of range")
            }

            function z(e, t, r, i, n) {
                return n || k(e, t, r, 4, 3.4028234663852886e38, -3.4028234663852886e38), Y.write(e, t, r, i, 23, 4), r + 4
            }

            function V(e, t, r, i, n) {
                return n || k(e, t, r, 8, 1.7976931348623157e308, -1.7976931348623157e308), Y.write(e, t, r, i, 52, 8), r + 8
            }

            function O(e) {
                if (e = N(e).replace($, ""), e.length < 2) return "";
                for (; e.length % 4 !== 0;) e += "=";
                return e
            }

            function N(e) {
                return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "")
            }

            function I(e) {
                return 16 > e ? "0" + e.toString(16) : e.toString(16)
            }

            function G(e, t) {
                t = t || 1 / 0;
                for (var r, i = e.length, n = null, o = [], a = 0; i > a; a++) {
                    if (r = e.charCodeAt(a), r > 55295 && 57344 > r) {
                        if (!n) {
                            if (r > 56319) {
                                (t -= 3) > -1 && o.push(239, 191, 189);
                                continue
                            }
                            if (a + 1 === i) {
                                (t -= 3) > -1 && o.push(239, 191, 189);
                                continue
                            }
                            n = r;
                            continue
                        }
                        if (56320 > r) {
                            (t -= 3) > -1 && o.push(239, 191, 189), n = r;
                            continue
                        }
                        r = n - 55296 << 10 | r - 56320 | 65536
                    } else n && (t -= 3) > -1 && o.push(239, 191, 189);
                    if (n = null, 128 > r) {
                        if ((t -= 1) < 0) break;
                        o.push(r)
                    } else if (2048 > r) {
                        if ((t -= 2) < 0) break;
                        o.push(r >> 6 | 192, 63 & r | 128)
                    } else if (65536 > r) {
                        if ((t -= 3) < 0) break;
                        o.push(r >> 12 | 224, r >> 6 & 63 | 128, 63 & r | 128)
                    } else {
                        if (!(1114112 > r)) throw new Error("Invalid code point");
                        if ((t -= 4) < 0) break;
                        o.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, 63 & r | 128)
                    }
                }
                return o
            }

            function H(e) {
                for (var t = [], r = 0; r < e.length; r++) t.push(255 & e.charCodeAt(r));
                return t
            }

            function W(e, t) {
                for (var r, i, n, o = [], a = 0; a < e.length && !((t -= 2) < 0); a++) r = e.charCodeAt(a), i = r >> 8, n = r % 256, o.push(n), o.push(i);
                return o
            }

            function j(e) {
                return q.toByteArray(O(e))
            }

            function X(e, t, r, i) {
                for (var n = 0; i > n && !(n + r >= t.length || n >= e.length); n++) t[n + r] = e[n];
                return n
            }
            var q = e("base64-js"),
                Y = e("ieee754"),
                K = e("is-array");
            r.Buffer = n, r.SlowBuffer = v, r.INSPECT_MAX_BYTES = 50, n.poolSize = 8192;
            var Z = {};
            n.TYPED_ARRAY_SUPPORT = void 0 !== t.TYPED_ARRAY_SUPPORT ? t.TYPED_ARRAY_SUPPORT : function() {
                function e() {}
                try {
                    var t = new Uint8Array(1);
                    return t.foo = function() {
                        return 42
                    }, t.constructor = e, 42 === t.foo() && t.constructor === e && "function" == typeof t.subarray && 0 === t.subarray(1, 1).byteLength
                } catch (r) {
                    return !1
                }
            }(), n.TYPED_ARRAY_SUPPORT && (n.prototype.__proto__ = Uint8Array.prototype, n.__proto__ = Uint8Array), n.isBuffer = function(e) {
                return !(null == e || !e._isBuffer)
            }, n.compare = function(e, t) {
                if (!n.isBuffer(e) || !n.isBuffer(t)) throw new TypeError("Arguments must be Buffers");
                if (e === t) return 0;
                for (var r = e.length, i = t.length, o = 0, a = Math.min(r, i); a > o && e[o] === t[o];) ++o;
                return o !== a && (r = e[o], i = t[o]), i > r ? -1 : r > i ? 1 : 0
            }, n.isEncoding = function(e) {
                switch (String(e).toLowerCase()) {
                    case "hex":
                    case "utf8":
                    case "utf-8":
                    case "ascii":
                    case "binary":
                    case "base64":
                    case "raw":
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return !0;
                    default:
                        return !1
                }
            }, n.concat = function(e, t) {
                if (!K(e)) throw new TypeError("list argument must be an Array of Buffers.");
                if (0 === e.length) return new n(0);
                var r;
                if (void 0 === t)
                    for (t = 0, r = 0; r < e.length; r++) t += e[r].length;
                var i = new n(t),
                    o = 0;
                for (r = 0; r < e.length; r++) {
                    var a = e[r];
                    a.copy(i, o), o += a.length
                }
                return i
            }, n.byteLength = g, n.prototype.length = void 0, n.prototype.parent = void 0, n.prototype.toString = function() {
                var e = 0 | this.length;
                return 0 === e ? "" : 0 === arguments.length ? A(this, 0, e) : y.apply(this, arguments)
            }, n.prototype.equals = function(e) {
                if (!n.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
                return this === e ? !0 : 0 === n.compare(this, e)
            }, n.prototype.inspect = function() {
                var e = "",
                    t = r.INSPECT_MAX_BYTES;
                return this.length > 0 && (e = this.toString("hex", 0, t).match(/.{2}/g).join(" "), this.length > t && (e += " ... ")), "<Buffer " + e + ">"
            }, n.prototype.compare = function(e) {
                if (!n.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
                return this === e ? 0 : n.compare(this, e)
            }, n.prototype.indexOf = function(e, t) {
                function r(e, t, r) {
                    for (var i = -1, n = 0; r + n < e.length; n++)
                        if (e[r + n] === t[-1 === i ? 0 : n - i]) {
                            if (-1 === i && (i = n), n - i + 1 === t.length) return r + i
                        } else i = -1;
                    return -1
                }
                if (t > 2147483647 ? t = 2147483647 : -2147483648 > t && (t = -2147483648), t >>= 0, 0 === this.length) return -1;
                if (t >= this.length) return -1;
                if (0 > t && (t = Math.max(this.length + t, 0)), "string" == typeof e) return 0 === e.length ? -1 : String.prototype.indexOf.call(this, e, t);
                if (n.isBuffer(e)) return r(this, e, t);
                if ("number" == typeof e) return n.TYPED_ARRAY_SUPPORT && "function" === Uint8Array.prototype.indexOf ? Uint8Array.prototype.indexOf.call(this, e, t) : r(this, [e], t);
                throw new TypeError("val must be string, number or Buffer")
            }, n.prototype.get = function(e) {
                return console.log(".get() is deprecated. Access using array indexes instead."), this.readUInt8(e)
            }, n.prototype.set = function(e, t) {
                return console.log(".set() is deprecated. Access using array indexes instead."), this.writeUInt8(e, t)
            }, n.prototype.write = function(e, t, r, i) {
                if (void 0 === t) i = "utf8", r = this.length, t = 0;
                else if (void 0 === r && "string" == typeof t) i = t, r = this.length, t = 0;
                else if (isFinite(t)) t = 0 | t, isFinite(r) ? (r = 0 | r, void 0 === i && (i = "utf8")) : (i = r, r = void 0);
                else {
                    var n = i;
                    i = t, t = 0 | r, r = n
                }
                var o = this.length - t;
                if ((void 0 === r || r > o) && (r = o), e.length > 0 && (0 > r || 0 > t) || t > this.length) throw new RangeError("attempt to write outside buffer bounds");
                i || (i = "utf8");
                for (var a = !1;;) switch (i) {
                    case "hex":
                        return x(this, e, t, r);
                    case "utf8":
                    case "utf-8":
                        return w(this, e, t, r);
                    case "ascii":
                        return b(this, e, t, r);
                    case "binary":
                        return _(this, e, t, r);
                    case "base64":
                        return M(this, e, t, r);
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return S(this, e, t, r);
                    default:
                        if (a) throw new TypeError("Unknown encoding: " + i);
                        i = ("" + i).toLowerCase(), a = !0
                }
            }, n.prototype.toJSON = function() {
                return {
                    type: "Buffer",
                    data: Array.prototype.slice.call(this._arr || this, 0)
                }
            };
            var Q = 4096;
            n.prototype.slice = function(e, t) {
                var r = this.length;
                e = ~~e, t = void 0 === t ? r : ~~t, 0 > e ? (e += r, 0 > e && (e = 0)) : e > r && (e = r), 0 > t ? (t += r, 0 > t && (t = 0)) : t > r && (t = r), e > t && (t = e);
                var i;
                if (n.TYPED_ARRAY_SUPPORT) i = n._augment(this.subarray(e, t));
                else {
                    var o = t - e;
                    i = new n(o, void 0);
                    for (var a = 0; o > a; a++) i[a] = this[a + e]
                }
                return i.length && (i.parent = this.parent || this), i
            }, n.prototype.readUIntLE = function(e, t, r) {
                e = 0 | e, t = 0 | t, r || D(e, t, this.length);
                for (var i = this[e], n = 1, o = 0; ++o < t && (n *= 256);) i += this[e + o] * n;
                return i
            }, n.prototype.readUIntBE = function(e, t, r) {
                e = 0 | e, t = 0 | t, r || D(e, t, this.length);
                for (var i = this[e + --t], n = 1; t > 0 && (n *= 256);) i += this[e + --t] * n;
                return i
            }, n.prototype.readUInt8 = function(e, t) {
                return t || D(e, 1, this.length), this[e]
            }, n.prototype.readUInt16LE = function(e, t) {
                return t || D(e, 2, this.length), this[e] | this[e + 1] << 8
            }, n.prototype.readUInt16BE = function(e, t) {
                return t || D(e, 2, this.length), this[e] << 8 | this[e + 1]
            }, n.prototype.readUInt32LE = function(e, t) {
                return t || D(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3]
            }, n.prototype.readUInt32BE = function(e, t) {
                return t || D(e, 4, this.length), 16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3])
            }, n.prototype.readIntLE = function(e, t, r) {
                e = 0 | e, t = 0 | t, r || D(e, t, this.length);
                for (var i = this[e], n = 1, o = 0; ++o < t && (n *= 256);) i += this[e + o] * n;
                return n *= 128, i >= n && (i -= Math.pow(2, 8 * t)), i
            }, n.prototype.readIntBE = function(e, t, r) {
                e = 0 | e, t = 0 | t, r || D(e, t, this.length);
                for (var i = t, n = 1, o = this[e + --i]; i > 0 && (n *= 256);) o += this[e + --i] * n;
                return n *= 128, o >= n && (o -= Math.pow(2, 8 * t)), o
            }, n.prototype.readInt8 = function(e, t) {
                return t || D(e, 1, this.length), 128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
            }, n.prototype.readInt16LE = function(e, t) {
                t || D(e, 2, this.length);
                var r = this[e] | this[e + 1] << 8;
                return 32768 & r ? 4294901760 | r : r
            }, n.prototype.readInt16BE = function(e, t) {
                t || D(e, 2, this.length);
                var r = this[e + 1] | this[e] << 8;
                return 32768 & r ? 4294901760 | r : r
            }, n.prototype.readInt32LE = function(e, t) {
                return t || D(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24
            }, n.prototype.readInt32BE = function(e, t) {
                return t || D(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]
            }, n.prototype.readFloatLE = function(e, t) {
                return t || D(e, 4, this.length), Y.read(this, e, !0, 23, 4)
            }, n.prototype.readFloatBE = function(e, t) {
                return t || D(e, 4, this.length), Y.read(this, e, !1, 23, 4)
            }, n.prototype.readDoubleLE = function(e, t) {
                return t || D(e, 8, this.length), Y.read(this, e, !0, 52, 8)
            }, n.prototype.readDoubleBE = function(e, t) {
                return t || D(e, 8, this.length), Y.read(this, e, !1, 52, 8)
            }, n.prototype.writeUIntLE = function(e, t, r, i) {
                e = +e, t = 0 | t, r = 0 | r, i || F(this, e, t, r, Math.pow(2, 8 * r), 0);
                var n = 1,
                    o = 0;
                for (this[t] = 255 & e; ++o < r && (n *= 256);) this[t + o] = e / n & 255;
                return t + r
            }, n.prototype.writeUIntBE = function(e, t, r, i) {
                e = +e, t = 0 | t, r = 0 | r, i || F(this, e, t, r, Math.pow(2, 8 * r), 0);
                var n = r - 1,
                    o = 1;
                for (this[t + n] = 255 & e; --n >= 0 && (o *= 256);) this[t + n] = e / o & 255;
                return t + r
            }, n.prototype.writeUInt8 = function(e, t, r) {
                return e = +e, t = 0 | t, r || F(this, e, t, 1, 255, 0), n.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), this[t] = e, t + 1
            }, n.prototype.writeUInt16LE = function(e, t, r) {
                return e = +e, t = 0 | t, r || F(this, e, t, 2, 65535, 0), n.TYPED_ARRAY_SUPPORT ? (this[t] = e, this[t + 1] = e >>> 8) : U(this, e, t, !0), t + 2
            }, n.prototype.writeUInt16BE = function(e, t, r) {
                return e = +e, t = 0 | t, r || F(this, e, t, 2, 65535, 0), n.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, this[t + 1] = e) : U(this, e, t, !1), t + 2
            }, n.prototype.writeUInt32LE = function(e, t, r) {
                return e = +e, t = 0 | t, r || F(this, e, t, 4, 4294967295, 0), n.TYPED_ARRAY_SUPPORT ? (this[t + 3] = e >>> 24, this[t + 2] = e >>> 16, this[t + 1] = e >>> 8, this[t] = e) : B(this, e, t, !0), t + 4
            }, n.prototype.writeUInt32BE = function(e, t, r) {
                return e = +e, t = 0 | t, r || F(this, e, t, 4, 4294967295, 0), n.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = e) : B(this, e, t, !1), t + 4
            }, n.prototype.writeIntLE = function(e, t, r, i) {
                if (e = +e, t = 0 | t, !i) {
                    var n = Math.pow(2, 8 * r - 1);
                    F(this, e, t, r, n - 1, -n)
                }
                var o = 0,
                    a = 1,
                    s = 0 > e ? 1 : 0;
                for (this[t] = 255 & e; ++o < r && (a *= 256);) this[t + o] = (e / a >> 0) - s & 255;
                return t + r
            }, n.prototype.writeIntBE = function(e, t, r, i) {
                if (e = +e, t = 0 | t, !i) {
                    var n = Math.pow(2, 8 * r - 1);
                    F(this, e, t, r, n - 1, -n)
                }
                var o = r - 1,
                    a = 1,
                    s = 0 > e ? 1 : 0;
                for (this[t + o] = 255 & e; --o >= 0 && (a *= 256);) this[t + o] = (e / a >> 0) - s & 255;
                return t + r
            }, n.prototype.writeInt8 = function(e, t, r) {
                return e = +e, t = 0 | t, r || F(this, e, t, 1, 127, -128), n.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), 0 > e && (e = 255 + e + 1), this[t] = e, t + 1
            }, n.prototype.writeInt16LE = function(e, t, r) {
                return e = +e, t = 0 | t, r || F(this, e, t, 2, 32767, -32768), n.TYPED_ARRAY_SUPPORT ? (this[t] = e, this[t + 1] = e >>> 8) : U(this, e, t, !0), t + 2
            }, n.prototype.writeInt16BE = function(e, t, r) {
                return e = +e, t = 0 | t, r || F(this, e, t, 2, 32767, -32768), n.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, this[t + 1] = e) : U(this, e, t, !1), t + 2
            }, n.prototype.writeInt32LE = function(e, t, r) {
                return e = +e, t = 0 | t, r || F(this, e, t, 4, 2147483647, -2147483648), n.TYPED_ARRAY_SUPPORT ? (this[t] = e, this[t + 1] = e >>> 8, this[t + 2] = e >>> 16, this[t + 3] = e >>> 24) : B(this, e, t, !0), t + 4
            }, n.prototype.writeInt32BE = function(e, t, r) {
                return e = +e, t = 0 | t, r || F(this, e, t, 4, 2147483647, -2147483648), 0 > e && (e = 4294967295 + e + 1), n.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = e) : B(this, e, t, !1), t + 4
            }, n.prototype.writeFloatLE = function(e, t, r) {
                return z(this, e, t, !0, r)
            }, n.prototype.writeFloatBE = function(e, t, r) {
                return z(this, e, t, !1, r)
            }, n.prototype.writeDoubleLE = function(e, t, r) {
                return V(this, e, t, !0, r)
            }, n.prototype.writeDoubleBE = function(e, t, r) {
                return V(this, e, t, !1, r)
            }, n.prototype.copy = function(e, t, r, i) {
                if (r || (r = 0), i || 0 === i || (i = this.length), t >= e.length && (t = e.length), t || (t = 0), i > 0 && r > i && (i = r), i === r) return 0;
                if (0 === e.length || 0 === this.length) return 0;
                if (0 > t) throw new RangeError("targetStart out of bounds");
                if (0 > r || r >= this.length) throw new RangeError("sourceStart out of bounds");
                if (0 > i) throw new RangeError("sourceEnd out of bounds");
                i > this.length && (i = this.length), e.length - t < i - r && (i = e.length - t + r);
                var o, a = i - r;
                if (this === e && t > r && i > t)
                    for (o = a - 1; o >= 0; o--) e[o + t] = this[o + r];
                else if (1e3 > a || !n.TYPED_ARRAY_SUPPORT)
                    for (o = 0; a > o; o++) e[o + t] = this[o + r];
                else e._set(this.subarray(r, r + a), t);
                return a
            }, n.prototype.fill = function(e, t, r) {
                if (e || (e = 0), t || (t = 0), r || (r = this.length), t > r) throw new RangeError("end < start");
                if (r !== t && 0 !== this.length) {
                    if (0 > t || t >= this.length) throw new RangeError("start out of bounds");
                    if (0 > r || r > this.length) throw new RangeError("end out of bounds");
                    var i;
                    if ("number" == typeof e)
                        for (i = t; r > i; i++) this[i] = e;
                    else {
                        var n = G(e.toString()),
                            o = n.length;
                        for (i = t; r > i; i++) this[i] = n[i % o]
                    }
                    return this
                }
            }, n.prototype.toArrayBuffer = function() {
                if ("undefined" != typeof Uint8Array) {
                    if (n.TYPED_ARRAY_SUPPORT) return new n(this).buffer;
                    for (var e = new Uint8Array(this.length), t = 0, r = e.length; r > t; t += 1) e[t] = this[t];
                    return e.buffer
                }
                throw new TypeError("Buffer.toArrayBuffer not supported in this browser")
            };
            var J = n.prototype;
            n._augment = function(e) {
                return e.constructor = n, e._isBuffer = !0, e._set = e.set, e.get = J.get, e.set = J.set, e.write = J.write, e.toString = J.toString, e.toLocaleString = J.toString, e.toJSON = J.toJSON, e.equals = J.equals, e.compare = J.compare, e.indexOf = J.indexOf, e.copy = J.copy, e.slice = J.slice, e.readUIntLE = J.readUIntLE, e.readUIntBE = J.readUIntBE, e.readUInt8 = J.readUInt8, e.readUInt16LE = J.readUInt16LE, e.readUInt16BE = J.readUInt16BE, e.readUInt32LE = J.readUInt32LE, e.readUInt32BE = J.readUInt32BE, e.readIntLE = J.readIntLE, e.readIntBE = J.readIntBE, e.readInt8 = J.readInt8, e.readInt16LE = J.readInt16LE, e.readInt16BE = J.readInt16BE, e.readInt32LE = J.readInt32LE, e.readInt32BE = J.readInt32BE, e.readFloatLE = J.readFloatLE, e.readFloatBE = J.readFloatBE, e.readDoubleLE = J.readDoubleLE, e.readDoubleBE = J.readDoubleBE, e.writeUInt8 = J.writeUInt8, e.writeUIntLE = J.writeUIntLE, e.writeUIntBE = J.writeUIntBE, e.writeUInt16LE = J.writeUInt16LE, e.writeUInt16BE = J.writeUInt16BE, e.writeUInt32LE = J.writeUInt32LE, e.writeUInt32BE = J.writeUInt32BE, e.writeIntLE = J.writeIntLE, e.writeIntBE = J.writeIntBE, e.writeInt8 = J.writeInt8, e.writeInt16LE = J.writeInt16LE, e.writeInt16BE = J.writeInt16BE, e.writeInt32LE = J.writeInt32LE, e.writeInt32BE = J.writeInt32BE, e.writeFloatLE = J.writeFloatLE, e.writeFloatBE = J.writeFloatBE, e.writeDoubleLE = J.writeDoubleLE, e.writeDoubleBE = J.writeDoubleBE, e.fill = J.fill, e.inspect = J.inspect, e.toArrayBuffer = J.toArrayBuffer, e
            };
            var $ = /[^+\/0-9A-Za-z-_]/g
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {
        "base64-js": 6,
        ieee754: 7,
        "is-array": 8
    }],
    6: [function(e, t, r) {
        var i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        ! function(e) {
            "use strict";

            function t(e) {
                var t = e.charCodeAt(0);
                return t === a || t === c ? 62 : t === s || t === f ? 63 : h > t ? -1 : h + 10 > t ? t - h + 26 + 26 : u + 26 > t ? t - u : l + 26 > t ? t - l + 26 : void 0
            }

            function r(e) {
                function r(e) {
                    l[c++] = e
                }
                var i, n, a, s, h, l;
                if (e.length % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
                var u = e.length;
                h = "=" === e.charAt(u - 2) ? 2 : "=" === e.charAt(u - 1) ? 1 : 0, l = new o(3 * e.length / 4 - h), a = h > 0 ? e.length - 4 : e.length;
                var c = 0;
                for (i = 0, n = 0; a > i; i += 4, n += 3) s = t(e.charAt(i)) << 18 | t(e.charAt(i + 1)) << 12 | t(e.charAt(i + 2)) << 6 | t(e.charAt(i + 3)), r((16711680 & s) >> 16), r((65280 & s) >> 8), r(255 & s);
                return 2 === h ? (s = t(e.charAt(i)) << 2 | t(e.charAt(i + 1)) >> 4, r(255 & s)) : 1 === h && (s = t(e.charAt(i)) << 10 | t(e.charAt(i + 1)) << 4 | t(e.charAt(i + 2)) >> 2, r(s >> 8 & 255), r(255 & s)), l
            }

            function n(e) {
                function t(e) {
                    return i.charAt(e)
                }

                function r(e) {
                    return t(e >> 18 & 63) + t(e >> 12 & 63) + t(e >> 6 & 63) + t(63 & e)
                }
                var n, o, a, s = e.length % 3,
                    h = "";
                for (n = 0, a = e.length - s; a > n; n += 3) o = (e[n] << 16) + (e[n + 1] << 8) + e[n + 2], h += r(o);
                switch (s) {
                    case 1:
                        o = e[e.length - 1], h += t(o >> 2), h += t(o << 4 & 63), h += "==";
                        break;
                    case 2:
                        o = (e[e.length - 2] << 8) + e[e.length - 1], h += t(o >> 10), h += t(o >> 4 & 63), h += t(o << 2 & 63), h += "="
                }
                return h
            }
            var o = "undefined" != typeof Uint8Array ? Uint8Array : Array,
                a = "+".charCodeAt(0),
                s = "/".charCodeAt(0),
                h = "0".charCodeAt(0),
                l = "a".charCodeAt(0),
                u = "A".charCodeAt(0),
                c = "-".charCodeAt(0),
                f = "_".charCodeAt(0);
            e.toByteArray = r, e.fromByteArray = n
        }("undefined" == typeof r ? this.base64js = {} : r)
    }, {}],
    7: [function(e, t, r) {
        r.read = function(e, t, r, i, n) {
            var o, a, s = 8 * n - i - 1,
                h = (1 << s) - 1,
                l = h >> 1,
                u = -7,
                c = r ? n - 1 : 0,
                f = r ? -1 : 1,
                p = e[t + c];
            for (c += f, o = p & (1 << -u) - 1, p >>= -u, u += s; u > 0; o = 256 * o + e[t + c], c += f, u -= 8);
            for (a = o & (1 << -u) - 1, o >>= -u, u += i; u > 0; a = 256 * a + e[t + c], c += f, u -= 8);
            if (0 === o) o = 1 - l;
            else {
                if (o === h) return a ? NaN : (p ? -1 : 1) * (1 / 0);
                a += Math.pow(2, i), o -= l
            }
            return (p ? -1 : 1) * a * Math.pow(2, o - i)
        }, r.write = function(e, t, r, i, n, o) {
            var a, s, h, l = 8 * o - n - 1,
                u = (1 << l) - 1,
                c = u >> 1,
                f = 23 === n ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
                p = i ? 0 : o - 1,
                d = i ? 1 : -1,
                m = 0 > t || 0 === t && 0 > 1 / t ? 1 : 0;
            for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (s = isNaN(t) ? 1 : 0, a = u) : (a = Math.floor(Math.log(t) / Math.LN2), t * (h = Math.pow(2, -a)) < 1 && (a--, h *= 2), t += a + c >= 1 ? f / h : f * Math.pow(2, 1 - c), t * h >= 2 && (a++, h /= 2), a + c >= u ? (s = 0, a = u) : a + c >= 1 ? (s = (t * h - 1) * Math.pow(2, n), a += c) : (s = t * Math.pow(2, c - 1) * Math.pow(2, n), a = 0)); n >= 8; e[r + p] = 255 & s, p += d, s /= 256, n -= 8);
            for (a = a << n | s, l += n; l > 0; e[r + p] = 255 & a, p += d, a /= 256, l -= 8);
            e[r + p - d] |= 128 * m
        }
    }, {}],
    8: [function(e, t, r) {
        var i = Array.isArray,
            n = Object.prototype.toString;
        t.exports = i || function(e) {
                return !!e && "[object Array]" == n.call(e)
            }
    }, {}],
    9: [function(e, t, r) {
        function i() {
            this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0
        }

        function n(e) {
            return "function" == typeof e
        }

        function o(e) {
            return "number" == typeof e
        }

        function a(e) {
            return "object" == typeof e && null !== e
        }

        function s(e) {
            return void 0 === e
        }
        t.exports = i, i.EventEmitter = i, i.prototype._events = void 0, i.prototype._maxListeners = void 0, i.defaultMaxListeners = 10, i.prototype.setMaxListeners = function(e) {
            if (!o(e) || 0 > e || isNaN(e)) throw TypeError("n must be a positive number");
            return this._maxListeners = e, this
        }, i.prototype.emit = function(e) {
            var t, r, i, o, h, l;
            if (this._events || (this._events = {}), "error" === e && (!this._events.error || a(this._events.error) && !this._events.error.length)) {
                if (t = arguments[1], t instanceof Error) throw t;
                throw TypeError('Uncaught, unspecified "error" event.')
            }
            if (r = this._events[e], s(r)) return !1;
            if (n(r)) switch (arguments.length) {
                case 1:
                    r.call(this);
                    break;
                case 2:
                    r.call(this, arguments[1]);
                    break;
                case 3:
                    r.call(this, arguments[1], arguments[2]);
                    break;
                default:
                    for (i = arguments.length, o = new Array(i - 1), h = 1; i > h; h++) o[h - 1] = arguments[h];
                    r.apply(this, o)
            } else if (a(r)) {
                for (i = arguments.length, o = new Array(i - 1), h = 1; i > h; h++) o[h - 1] = arguments[h];
                for (l = r.slice(), i = l.length, h = 0; i > h; h++) l[h].apply(this, o)
            }
            return !0
        }, i.prototype.addListener = function(e, t) {
            var r;
            if (!n(t)) throw TypeError("listener must be a function");
            if (this._events || (this._events = {}), this._events.newListener && this.emit("newListener", e, n(t.listener) ? t.listener : t), this._events[e] ? a(this._events[e]) ? this._events[e].push(t) : this._events[e] = [this._events[e], t] : this._events[e] = t, a(this._events[e]) && !this._events[e].warned) {
                var r;
                r = s(this._maxListeners) ? i.defaultMaxListeners : this._maxListeners, r && r > 0 && this._events[e].length > r && (this._events[e].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[e].length), "function" == typeof console.trace && console.trace())
            }
            return this
        }, i.prototype.on = i.prototype.addListener, i.prototype.once = function(e, t) {
            function r() {
                this.removeListener(e, r), i || (i = !0, t.apply(this, arguments))
            }
            if (!n(t)) throw TypeError("listener must be a function");
            var i = !1;
            return r.listener = t, this.on(e, r), this
        }, i.prototype.removeListener = function(e, t) {
            var r, i, o, s;
            if (!n(t)) throw TypeError("listener must be a function");
            if (!this._events || !this._events[e]) return this;
            if (r = this._events[e], o = r.length, i = -1, r === t || n(r.listener) && r.listener === t) delete this._events[e], this._events.removeListener && this.emit("removeListener", e, t);
            else if (a(r)) {
                for (s = o; s-- > 0;)
                    if (r[s] === t || r[s].listener && r[s].listener === t) {
                        i = s;
                        break
                    }
                if (0 > i) return this;
                1 === r.length ? (r.length = 0, delete this._events[e]) : r.splice(i, 1), this._events.removeListener && this.emit("removeListener", e, t)
            }
            return this
        }, i.prototype.removeAllListeners = function(e) {
            var t, r;
            if (!this._events) return this;
            if (!this._events.removeListener) return 0 === arguments.length ? this._events = {} : this._events[e] && delete this._events[e], this;
            if (0 === arguments.length) {
                for (t in this._events) "removeListener" !== t && this.removeAllListeners(t);
                return this.removeAllListeners("removeListener"), this._events = {},
                    this
            }
            if (r = this._events[e], n(r)) this.removeListener(e, r);
            else
                for (; r.length;) this.removeListener(e, r[r.length - 1]);
            return delete this._events[e], this
        }, i.prototype.listeners = function(e) {
            var t;
            return t = this._events && this._events[e] ? n(this._events[e]) ? [this._events[e]] : this._events[e].slice() : []
        }, i.listenerCount = function(e, t) {
            var r;
            return r = e._events && e._events[t] ? n(e._events[t]) ? 1 : e._events[t].length : 0
        }
    }, {}],
    10: [function(e, t, r) {
        function i() {
            u = !1, s.length ? l = s.concat(l) : c = -1, l.length && n()
        }

        function n() {
            if (!u) {
                var e = setTimeout(i);
                u = !0;
                for (var t = l.length; t;) {
                    for (s = l, l = []; ++c < t;) s && s[c].run();
                    c = -1, t = l.length
                }
                s = null, u = !1, clearTimeout(e)
            }
        }

        function o(e, t) {
            this.fun = e, this.array = t
        }

        function a() {}
        var s, h = t.exports = {},
            l = [],
            u = !1,
            c = -1;
        h.nextTick = function(e) {
            var t = new Array(arguments.length - 1);
            if (arguments.length > 1)
                for (var r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
            l.push(new o(e, t)), 1 !== l.length || u || setTimeout(n, 0)
        }, o.prototype.run = function() {
            this.fun.apply(null, this.array)
        }, h.title = "browser", h.browser = !0, h.env = {}, h.argv = [], h.version = "", h.versions = {}, h.on = a, h.addListener = a, h.once = a, h.off = a, h.removeListener = a, h.removeAllListeners = a, h.emit = a, h.binding = function(e) {
            throw new Error("process.binding is not supported")
        }, h.cwd = function() {
            return "/"
        }, h.chdir = function(e) {
            throw new Error("process.chdir is not supported")
        }, h.umask = function() {
            return 0
        }
    }, {}],
    11: [function(e, t, r) {
        function i() {
            var e = document.querySelector("#loading_logo").parentNode;
            //var e = document.documentElement;
            return [e.clientWidth, e.clientHeight]
        }
        var n = e("canvas-fit"),
            o = e("raf-loop");
        t.exports = function(e, t) {
            function r() {
                s();
                var t = e.width,
                    r = e.height;
                l[0] = t / s.scale, l[1] = r / s.scale
            }
            if (!e) throw new TypeError("must specify a canvas element");
            t = t || {};
            var a = t.parent || i,
                s = n(e, a, t.scale),
                h = o(),
                l = [0, 0];
            return r(), window.addEventListener("resize", function() {
                r(), h.emit("resize")
            }, !1), Object.defineProperties(h, {
                scale: {
                    get: function() {
                        return s.scale
                    },
                    set: function(e) {
                        s.scale = e
                    }
                },
                shape: {
                    get: function() {
                        return l
                    }
                },
                parent: {
                    get: function() {
                        return s.parent
                    },
                    set: function(e) {
                        s.parent = e
                    }
                }
            }), h
        }
    }, {
        "canvas-fit": 12,
        "raf-loop": 14
    }],
    12: [function(e, t, r) {
        function i(e, t, r) {
            function i() {
                var t = i.parent || e.parentNode;
                if ("function" == typeof t) var r = t(o) || o,
                    s = r[0],
                    h = r[1];
                else if (t && t !== document.body) var l = n(t),
                    s = 0 | l[0],
                    h = 0 | l[1];
                else var s = window.innerWidth,
                        h = window.innerHeight;
                return a ? (e.setAttribute("width", s * i.scale + "px"), e.setAttribute("height", h * i.scale + "px")) : (e.width = s * i.scale, e.height = h * i.scale), e.style.width = s + "px", e.style.height = h + "px", i
            }
            var a = "SVG" === e.nodeName.toUpperCase();
            return e.style.top = 0, e.style.left = 0, i.scale = parseFloat(r || 1), i.parent = t, i()
        }
        var n = e("element-size");
        t.exports = i;
        var o = new Float32Array(2)
    }, {
        "element-size": 13
    }],
    13: [function(e, t, r) {
        function i(e) {
            if (e === window || e === document.body) return [window.innerWidth, window.innerHeight];
            if (!e.parentNode) {
                var t = !0;
                document.body.appendChild(e)
            }
            var r = e.getBoundingClientRect(),
                i = getComputedStyle(e),
                o = (0 | r.height) + n(i.getPropertyValue("margin-top")) + n(i.getPropertyValue("margin-bottom")),
                a = (0 | r.width) + n(i.getPropertyValue("margin-left")) + n(i.getPropertyValue("margin-right"));
            return t && document.body.removeChild(e), [a, o]
        }

        function n(e) {
            return parseFloat(e) || 0
        }
        t.exports = i
    }, {}],
    14: [function(e, t, r) {
        function i(e) {
            return this instanceof i ? (this.running = !1, this.last = a(), this._frame = 0, this._tick = this.tick.bind(this), void(e && this.on("tick", e))) : new i(e)
        }
        var n = e("inherits"),
            o = e("events").EventEmitter,
            a = e("right-now"),
            s = e("raf");
        t.exports = i, n(i, o), i.prototype.start = function() {
            return this.running ? void 0 : (this.running = !0, this.last = a(), this._frame = s(this._tick), this)
        }, i.prototype.stop = function() {
            return this.running = !1, 0 !== this._frame && s.cancel(this._frame), this._frame = 0, this
        }, i.prototype.tick = function() {
            this._frame = s(this._tick);
            var e = a(),
                t = e - this.last;
            this.emit("tick", t), this.last = e
        }
    }, {
        events: 9,
        inherits: 15,
        raf: 16,
        "right-now": 18
    }],
    15: [function(e, t, r) {
        "function" == typeof Object.create ? t.exports = function(e, t) {
            e.super_ = t, e.prototype = Object.create(t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            })
        } : t.exports = function(e, t) {
            e.super_ = t;
            var r = function() {};
            r.prototype = t.prototype, e.prototype = new r, e.prototype.constructor = e
        }
    }, {}],
    16: [function(e, t, r) {
        for (var i = e("performance-now"), n = "undefined" == typeof window ? {} : window, o = ["moz", "webkit"], a = "AnimationFrame", s = n["request" + a], h = n["cancel" + a] || n["cancelRequest" + a], l = 0; l < o.length && !s; l++) s = n[o[l] + "Request" + a], h = n[o[l] + "Cancel" + a] || n[o[l] + "CancelRequest" + a];
        if (!s || !h) {
            var u = 0,
                c = 0,
                f = [],
                p = 1e3 / 60;
            s = function(e) {
                if (0 === f.length) {
                    var t = i(),
                        r = Math.max(0, p - (t - u));
                    u = r + t, setTimeout(function() {
                        var e = f.slice(0);
                        f.length = 0;
                        for (var t = 0; t < e.length; t++)
                            if (!e[t].cancelled) try {
                                e[t].callback(u)
                            } catch (r) {
                                setTimeout(function() {
                                    throw r
                                }, 0)
                            }
                    }, Math.round(r))
                }
                return f.push({
                    handle: ++c,
                    callback: e,
                    cancelled: !1
                }), c
            }, h = function(e) {
                for (var t = 0; t < f.length; t++) f[t].handle === e && (f[t].cancelled = !0)
            }
        }
        t.exports = function(e) {
            return s.call(n, e)
        }, t.exports.cancel = function() {
            h.apply(n, arguments)
        }
    }, {
        "performance-now": 17
    }],
    17: [function(e, t, r) {
        (function(e) {
            (function() {
                var r, i, n;
                "undefined" != typeof performance && null !== performance && performance.now ? t.exports = function() {
                    return performance.now()
                } : "undefined" != typeof e && null !== e && e.hrtime ? (t.exports = function() {
                    return (r() - n) / 1e6
                }, i = e.hrtime, r = function() {
                    var e;
                    return e = i(), 1e9 * e[0] + e[1]
                }, n = r()) : Date.now ? (t.exports = function() {
                    return Date.now() - n
                }, n = Date.now()) : (t.exports = function() {
                    return (new Date).getTime() - n
                }, n = (new Date).getTime())
            }).call(this)
        }).call(this, e("_process"))
    }, {
        _process: 10
    }],
    18: [function(e, t, r) {
        (function(e) {
            t.exports = e.performance && e.performance.now ? function() {
                return performance.now()
            } : Date.now || function() {
                return +new Date
            }
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {}],
    19: [function(e, t, r) {
        "use strict";

        function i(e) {
            return [Math.min(e[0], e[1]), Math.max(e[0], e[1])]
        }

        function n(e, t) {
            return e[0] - t[0] || e[1] - t[1]
        }

        function o(e) {
            return e.map(i).sort(n)
        }

        function a(e, t, r) {
            return t in e ? e[t] : r
        }

        function s(e, t, r) {
            Array.isArray(t) ? (r = r || {}, t = t || []) : (r = t || {}, t = []);
            var i = !!a(r, "delaunay", !0),
                n = !!a(r, "interior", !0),
                s = !!a(r, "exterior", !0),
                f = !!a(r, "infinity", !1);
            if (!n && !s || 0 === e.length) return [];
            var p = h(e, t);
            if (i || n !== s || f) {
                for (var d = l(e.length, o(t)), m = 0; m < p.length; ++m) {
                    var v = p[m];
                    d.addTriangle(v[0], v[1], v[2])
                }
                return i && u(e, d), s ? n ? f ? c(d, 0, f) : d.cells() : c(d, 1, f) : c(d, -1)
            }
            return p
        }
        var h = e("./lib/monotone"),
            l = e("./lib/triangulation"),
            u = e("./lib/delaunay"),
            c = e("./lib/filter");
        t.exports = s
    }, {
        "./lib/delaunay": 20,
        "./lib/filter": 21,
        "./lib/monotone": 22,
        "./lib/triangulation": 23
    }],
    20: [function(e, t, r) {
        "use strict";

        function i(e, t, r, i, n, a) {
            var s = t.opposite(i, n);
            if (!(0 > s)) {
                if (i > n) {
                    var h = i;
                    i = n, n = h, h = a, a = s, s = h
                }
                t.isConstraint(i, n) || o(e[i], e[n], e[a], e[s]) < 0 && r.push(i, n)
            }
        }

        function n(e, t) {
            for (var r = [], n = e.length, a = t.stars, s = 0; n > s; ++s)
                for (var h = a[s], l = 1; l < h.length; l += 2) {
                    var u = h[l];
                    if (!(s > u || t.isConstraint(s, u))) {
                        for (var c = h[l - 1], f = -1, p = 1; p < h.length; p += 2)
                            if (h[p - 1] === u) {
                                f = h[p];
                                break
                            }
                        0 > f || o(e[s], e[u], e[c], e[f]) < 0 && r.push(s, u)
                    }
                }
            for (; r.length > 0;) {
                for (var u = r.pop(), s = r.pop(), c = -1, f = -1, h = a[s], d = 1; d < h.length; d += 2) {
                    var m = h[d - 1],
                        v = h[d];
                    m === u ? f = v : v === u && (c = m)
                }
                0 > c || 0 > f || o(e[s], e[u], e[c], e[f]) >= 0 || (t.flip(s, u), i(e, t, r, c, s, f), i(e, t, r, s, f, c), i(e, t, r, f, u, c), i(e, t, r, u, c, f))
            }
        }
        var o = e("robust-in-sphere")[4];
        e("binary-search-bounds");
        t.exports = n
    }, {
        "binary-search-bounds": 24,
        "robust-in-sphere": 25
    }],
    21: [function(e, t, r) {
        "use strict";

        function i(e, t, r, i, n, o, a) {
            this.cells = e, this.neighbor = t, this.flags = i, this.constraint = r, this.active = n, this.next = o, this.boundary = a
        }

        function n(e, t) {
            return e[0] - t[0] || e[1] - t[1] || e[2] - t[2]
        }

        function o(e, t) {
            for (var r = e.cells(), o = r.length, a = 0; o > a; ++a) {
                var s = r[a],
                    h = s[0],
                    l = s[1],
                    u = s[2];
                u > l ? h > l && (s[0] = l, s[1] = u, s[2] = h) : h > u && (s[0] = u, s[1] = h, s[2] = l)
            }
            r.sort(n);
            for (var c = new Array(o), a = 0; a < c.length; ++a) c[a] = 0;
            var f = [],
                p = [],
                d = new Array(3 * o),
                m = new Array(3 * o),
                v = null;
            t && (v = []);
            for (var g = new i(r, d, m, c, f, p, v), a = 0; o > a; ++a)
                for (var s = r[a], y = 0; 3 > y; ++y) {
                    var h = s[y],
                        l = s[(y + 1) % 3],
                        x = d[3 * a + y] = g.locate(l, h, e.opposite(l, h)),
                        w = m[3 * a + y] = e.isConstraint(h, l);
                    0 > x && (w ? p.push(a) : (f.push(a), c[a] = 1), t && v.push([l, h, -1]))
                }
            return g
        }

        function a(e, t, r) {
            for (var i = 0, n = 0; n < e.length; ++n) t[n] === r && (e[i++] = e[n]);
            return e.length = i, e
        }

        function s(e, t, r) {
            var i = o(e, r);
            if (0 === t) return r ? i.cells.concat(i.boundary) : i.cells;
            for (var n = 1, s = i.active, h = i.next, l = i.flags, u = i.cells, c = i.constraint, f = i.neighbor; s.length > 0 || h.length > 0;) {
                for (; s.length > 0;) {
                    var p = s.pop();
                    if (l[p] !== -n) {
                        l[p] = n;
                        for (var d = (u[p], 0); 3 > d; ++d) {
                            var m = f[3 * p + d];
                            m >= 0 && 0 === l[m] && (c[3 * p + d] ? h.push(m) : (s.push(m), l[m] = n))
                        }
                    }
                }
                var v = h;
                h = s, s = v, h.length = 0, n = -n
            }
            var g = a(u, l, t);
            return r ? g.concat(i.boundary) : g
        }
        var h = e("binary-search-bounds");
        t.exports = s;
        var l = i.prototype;
        l.locate = function() {
            var e = [0, 0, 0];
            return function(t, r, i) {
                var o = t,
                    a = r,
                    s = i;
                return i > r ? t > r && (o = r, a = i, s = t) : t > i && (o = i, a = t, s = r), 0 > o ? -1 : (e[0] = o, e[1] = a, e[2] = s, h.eq(this.cells, e, n))
            }
        }()
    }, {
        "binary-search-bounds": 24
    }],
    22: [function(e, t, r) {
        "use strict";

        function i(e, t, r, i, n) {
            this.a = e, this.b = t, this.idx = r, this.lowerIds = i, this.upperIds = n
        }

        function n(e, t, r, i) {
            this.a = e, this.b = t, this.type = r, this.idx = i
        }

        function o(e, t) {
            var r = e.a[0] - t.a[0] || e.a[1] - t.a[1] || e.type - t.type;
            return r ? r : e.type !== d && (r = p(e.a, e.b, t.b)) ? r : e.idx - t.idx
        }

        function a(e, t) {
            return p(e.a, e.b, t)
        }

        function s(e, t, r, i, n) {
            for (var o = f.lt(t, i, a), s = f.gt(t, i, a), h = o; s > h; ++h) {
                for (var l = t[h], u = l.lowerIds, c = u.length; c > 1 && p(r[u[c - 2]], r[u[c - 1]], i) > 0;) e.push([u[c - 1], u[c - 2], n]), c -= 1;
                u.length = c, u.push(n);
                for (var d = l.upperIds, c = d.length; c > 1 && p(r[d[c - 2]], r[d[c - 1]], i) < 0;) e.push([d[c - 2], d[c - 1], n]), c -= 1;
                d.length = c, d.push(n)
            }
        }

        function h(e, t) {
            var r;
            return (r = e.a[0] < t.a[0] ? p(e.a, e.b, t.a) : p(t.b, t.a, e.a)) ? r : (r = t.b[0] < e.b[0] ? p(e.a, e.b, t.b) : p(t.b, t.a, e.b), r || e.idx - t.idx)
        }

        function l(e, t, r) {
            var n = f.le(e, r, h),
                o = e[n],
                a = o.upperIds,
                s = a[a.length - 1];
            o.upperIds = [s], e.splice(n + 1, 0, new i(r.a, r.b, r.idx, [s], a))
        }

        function u(e, t, r) {
            var i = r.a;
            r.a = r.b, r.b = i;
            var n = f.eq(e, r, h),
                o = e[n],
                a = e[n - 1];
            a.upperIds = o.upperIds, e.splice(n, 1)
        }

        function c(e, t) {
            for (var r = e.length, a = t.length, h = [], c = 0; r > c; ++c) h.push(new n(e[c], null, d, c));
            for (var c = 0; a > c; ++c) {
                var f = t[c],
                    p = e[f[0]],
                    g = e[f[1]];
                p[0] < g[0] ? h.push(new n(p, g, v, c), new n(g, p, m, c)) : p[0] > g[0] && h.push(new n(g, p, v, c), new n(p, g, m, c))
            }
            h.sort(o);
            for (var y = h[0].a[0] - (1 + Math.abs(h[0].a[0])) * Math.pow(2, -52), x = [new i([y, 1], [y, 0], -1, [], [], [], [])], w = [], c = 0, b = h.length; b > c; ++c) {
                var _ = h[c],
                    M = _.type;
                M === d ? s(w, x, e, _.a, _.idx) : M === v ? l(x, e, _) : u(x, e, _)
            }
            return w
        }
        var f = e("binary-search-bounds"),
            p = e("robust-orientation")[3],
            d = 0,
            m = 1,
            v = 2;
        t.exports = c
    }, {
        "binary-search-bounds": 24,
        "robust-orientation": 36
    }],
    23: [function(e, t, r) {
        "use strict";

        function i(e, t) {
            this.stars = e, this.edges = t
        }

        function n(e, t, r) {
            for (var i = 1, n = e.length; n > i; i += 2)
                if (e[i - 1] === t && e[i] === r) return e[i - 1] = e[n - 2], e[i] = e[n - 1], void(e.length = n - 2)
        }

        function o(e, t) {
            for (var r = new Array(e), n = 0; e > n; ++n) r[n] = [];
            return new i(r, t)
        }
        var a = e("binary-search-bounds");
        t.exports = o;
        var s = i.prototype;
        s.isConstraint = function() {
            function e(e, t) {
                return e[0] - t[0] || e[1] - t[1]
            }
            var t = [0, 0];
            return function(r, i) {
                return t[0] = Math.min(r, i), t[1] = Math.max(r, i), a.eq(this.edges, t, e) >= 0
            }
        }(), s.removeTriangle = function(e, t, r) {
            var i = this.stars;
            n(i[e], t, r), n(i[t], r, e), n(i[r], e, t)
        }, s.addTriangle = function(e, t, r) {
            var i = this.stars;
            i[e].push(t, r), i[t].push(r, e), i[r].push(e, t)
        }, s.opposite = function(e, t) {
            for (var r = this.stars[t], i = 1, n = r.length; n > i; i += 2)
                if (r[i] === e) return r[i - 1];
            return -1
        }, s.flip = function(e, t) {
            var r = this.opposite(e, t),
                i = this.opposite(t, e);
            this.removeTriangle(e, t, r), this.removeTriangle(t, e, i), this.addTriangle(e, i, r), this.addTriangle(t, r, i)
        }, s.edges = function() {
            for (var e = this.stars, t = [], r = 0, i = e.length; i > r; ++r)
                for (var n = e[r], o = 0, a = n.length; a > o; o += 2) t.push([n[o], n[o + 1]]);
            return t
        }, s.cells = function() {
            for (var e = this.stars, t = [], r = 0, i = e.length; i > r; ++r)
                for (var n = e[r], o = 0, a = n.length; a > o; o += 2) {
                    var s = n[o],
                        h = n[o + 1];
                    r < Math.min(s, h) && t.push([r, s, h])
                }
            return t
        }
    }, {
        "binary-search-bounds": 24
    }],
    24: [function(e, t, r) {
        "use strict";

        function i(e, t, r, i, n) {
            var o = ["function ", e, "(a,l,h,", i.join(","), "){", n ? "" : "var i=", r ? "l-1" : "h+1", ";while(l<=h){var m=(l+h)>>>1,x=a[m]"];
            return n ? t.indexOf("c") < 0 ? o.push(";if(x===y){return m}else if(x<=y){") : o.push(";var p=c(x,y);if(p===0){return m}else if(p<=0){") : o.push(";if(", t, "){i=m;"), r ? o.push("l=m+1}else{h=m-1}") : o.push("h=m-1}else{l=m+1}"), o.push("}"), n ? o.push("return -1};") : o.push("return i};"), o.join("")
        }

        function n(e, t, r, n) {
            var o = new Function([i("A", "x" + e + "y", t, ["y"], n), i("P", "c(x,y)" + e + "0", t, ["y", "c"], n), "function dispatchBsearch", r, "(a,y,c,l,h){if(typeof(c)==='function'){return P(a,(l===void 0)?0:l|0,(h===void 0)?a.length-1:h|0,y,c)}else{return A(a,(c===void 0)?0:c|0,(l===void 0)?a.length-1:l|0,y)}}return dispatchBsearch", r].join(""));
            return o()
        }
        t.exports = {
            ge: n(">=", !1, "GE"),
            gt: n(">", !1, "GT"),
            lt: n("<", !0, "LT"),
            le: n("<=", !0, "LE"),
            eq: n("-", !0, "EQ", !0)
        }
    }, {}],
    25: [function(e, t, r) {
        "use strict";

        function i(e, t) {
            for (var r = new Array(e.length - 1), i = 1; i < e.length; ++i)
                for (var n = r[i - 1] = new Array(e.length - 1), o = 0, a = 0; o < e.length; ++o) o !== t && (n[a++] = e[i][o]);
            return r
        }

        function n(e) {
            for (var t = new Array(e), r = 0; e > r; ++r) {
                t[r] = new Array(e);
                for (var i = 0; e > i; ++i) t[r][i] = ["m", i, "[", e - r - 2, "]"].join("")
            }
            return t
        }

        function o(e) {
            if (1 === e.length) return e[0];
            if (2 === e.length) return ["sum(", e[0], ",", e[1], ")"].join("");
            var t = e.length >> 1;
            return ["sum(", o(e.slice(0, t)), ",", o(e.slice(t)), ")"].join("")
        }

        function a(e, t) {
            if ("m" === e.charAt(0)) {
                if ("w" === t.charAt(0)) {
                    var r = e.split("[");
                    return ["w", t.substr(1), "m", r[0].substr(1)].join("")
                }
                return ["prod(", e, ",", t, ")"].join("")
            }
            return a(t, e)
        }

        function s(e) {
            return e & !0 ? "-" : ""
        }

        function h(e) {
            if (2 === e.length) return [
                ["diff(", a(e[0][0], e[1][1]), ",", a(e[1][0], e[0][1]), ")"].join("")
            ];
            for (var t = [], r = 0; r < e.length; ++r) t.push(["scale(", o(h(i(e, r))), ",", s(r), e[0][r], ")"].join(""));
            return t
        }

        function l(e, t) {
            for (var r = [], i = 0; t - 2 > i; ++i) r.push(["prod(m", e, "[", i, "],m", e, "[", i, "])"].join(""));
            return o(r)
        }

        function u(e) {
            for (var t = [], r = [], a = n(e), s = 0; e > s; ++s) a[0][s] = "1", a[e - 1][s] = "w" + s;
            for (var s = 0; e > s; ++s) 0 === (1 & s) ? t.push.apply(t, h(i(a, s))) : r.push.apply(r, h(i(a, s)));
            for (var u = o(t), c = o(r), f = "exactInSphere" + e, p = [], s = 0; e > s; ++s) p.push("m" + s);
            for (var d = ["function ", f, "(", p.join(), "){"], s = 0; e > s; ++s) {
                d.push("var w", s, "=", l(s, e), ";");
                for (var m = 0; e > m; ++m) m !== s && d.push("var w", s, "m", m, "=scale(w", s, ",m", m, "[0]);")
            }
            d.push("var p=", u, ",n=", c, ",d=diff(p,n);return d[d.length-1];}return ", f);
            var w = new Function("sum", "diff", "prod", "scale", d.join(""));
            return w(g, y, v, x)
        }

        function c() {
            return 0
        }

        function f() {
            return 0
        }

        function p() {
            return 0
        }

        function d(e) {
            var t = b[e.length];
            return t || (t = b[e.length] = u(e.length)), t.apply(void 0, e)
        }

        function m() {
            for (; b.length <= w;) b.push(u(b.length));
            for (var e = [], r = ["slow"], i = 0; w >= i; ++i) e.push("a" + i), r.push("o" + i);
            for (var n = ["function testInSphere(", e.join(), "){switch(arguments.length){case 0:case 1:return 0;"], i = 2; w >= i; ++i) n.push("case ", i, ":return o", i, "(", e.slice(0, i).join(), ");");
            n.push("}var s=new Array(arguments.length);for(var i=0;i<arguments.length;++i){s[i]=arguments[i]};return slow(s);}return testInSphere"), r.push(n.join(""));
            var o = Function.apply(void 0, r);
            t.exports = o.apply(void 0, [d].concat(b));
            for (var i = 0; w >= i; ++i) t.exports[i] = b[i]
        }
        var v = e("two-product"),
            g = e("robust-sum"),
            y = e("robust-subtract"),
            x = e("robust-scale"),
            w = 6,
            b = [c, f, p];
        m()
    }, {
        "robust-scale": 27,
        "robust-subtract": 28,
        "robust-sum": 29,
        "two-product": 30
    }],
    26: [function(e, t, r) {
        "use strict";

        function i(e, t, r) {
            var i = e + t,
                n = i - e,
                o = i - n,
                a = t - n,
                s = e - o;
            return r ? (r[0] = s + a, r[1] = i, r) : [s + a, i]
        }
        t.exports = i
    }, {}],
    27: [function(e, t, r) {
        "use strict";

        function i(e, t) {
            var r = e.length;
            if (1 === r) {
                var i = n(e[0], t);
                return i[0] ? i : [i[1]]
            }
            var a = new Array(2 * r),
                s = [.1, .1],
                h = [.1, .1],
                l = 0;
            n(e[0], t, s), s[0] && (a[l++] = s[0]);
            for (var u = 1; r > u; ++u) {
                n(e[u], t, h);
                var c = s[1];
                o(c, h[0], s), s[0] && (a[l++] = s[0]);
                var f = h[1],
                    p = s[1],
                    d = f + p,
                    m = d - f,
                    v = p - m;
                s[1] = d, v && (a[l++] = v)
            }
            return s[1] && (a[l++] = s[1]), 0 === l && (a[l++] = 0), a.length = l, a
        }
        var n = e("two-product"),
            o = e("two-sum");
        t.exports = i
    }, {
        "two-product": 30,
        "two-sum": 26
    }],
    28: [function(e, t, r) {
        "use strict";

        function i(e, t) {
            var r = e + t,
                i = r - e,
                n = r - i,
                o = t - i,
                a = e - n,
                s = a + o;
            return s ? [s, r] : [r]
        }

        function n(e, t) {
            var r = 0 | e.length,
                n = 0 | t.length;
            if (1 === r && 1 === n) return i(e[0], -t[0]);
            var o, a, s = r + n,
                h = new Array(s),
                l = 0,
                u = 0,
                c = 0,
                f = Math.abs,
                p = e[u],
                d = f(p),
                m = -t[c],
                v = f(m);
            v > d ? (a = p, u += 1, r > u && (p = e[u], d = f(p))) : (a = m, c += 1, n > c && (m = -t[c], v = f(m))), r > u && v > d || c >= n ? (o = p, u += 1, r > u && (p = e[u], d = f(p))) : (o = m, c += 1, n > c && (m = -t[c], v = f(m)));
            for (var g, y, x, w, b, _ = o + a, M = _ - o, S = a - M, T = S, A = _; r > u && n > c;) v > d ? (o = p, u += 1, r > u && (p = e[u], d = f(p))) : (o = m, c += 1, n > c && (m = -t[c], v = f(m))), a = T, _ = o + a, M = _ - o, S = a - M, S && (h[l++] = S), g = A + _, y = g - A, x = g - y, w = _ - y, b = A - x, T = b + w, A = g;
            for (; r > u;) o = p, a = T, _ = o + a, M = _ - o, S = a - M, S && (h[l++] = S), g = A + _, y = g - A, x = g - y, w = _ - y, b = A - x, T = b + w, A = g, u += 1, r > u && (p = e[u]);
            for (; n > c;) o = m, a = T, _ = o + a, M = _ - o, S = a - M, S && (h[l++] = S), g = A + _, y = g - A, x = g - y, w = _ - y, b = A - x, T = b + w, A = g, c += 1, n > c && (m = -t[c]);
            return T && (h[l++] = T), A && (h[l++] = A), l || (h[l++] = 0), h.length = l, h
        }
        t.exports = n
    }, {}],
    29: [function(e, t, r) {
        "use strict";

        function i(e, t) {
            var r = e + t,
                i = r - e,
                n = r - i,
                o = t - i,
                a = e - n,
                s = a + o;
            return s ? [s, r] : [r]
        }

        function n(e, t) {
            var r = 0 | e.length,
                n = 0 | t.length;
            if (1 === r && 1 === n) return i(e[0], t[0]);
            var o, a, s = r + n,
                h = new Array(s),
                l = 0,
                u = 0,
                c = 0,
                f = Math.abs,
                p = e[u],
                d = f(p),
                m = t[c],
                v = f(m);
            v > d ? (a = p, u += 1, r > u && (p = e[u], d = f(p))) : (a = m, c += 1, n > c && (m = t[c], v = f(m))), r > u && v > d || c >= n ? (o = p, u += 1, r > u && (p = e[u], d = f(p))) : (o = m, c += 1, n > c && (m = t[c], v = f(m)));
            for (var g, y, x, w, b, _ = o + a, M = _ - o, S = a - M, T = S, A = _; r > u && n > c;) v > d ? (o = p, u += 1, r > u && (p = e[u], d = f(p))) : (o = m, c += 1, n > c && (m = t[c], v = f(m))), a = T, _ = o + a, M = _ - o, S = a - M, S && (h[l++] = S), g = A + _, y = g - A, x = g - y, w = _ - y, b = A - x, T = b + w, A = g;
            for (; r > u;) o = p, a = T, _ = o + a, M = _ - o, S = a - M, S && (h[l++] = S), g = A + _, y = g - A, x = g - y, w = _ - y, b = A - x, T = b + w, A = g, u += 1, r > u && (p = e[u]);
            for (; n > c;) o = m, a = T, _ = o + a, M = _ - o, S = a - M, S && (h[l++] = S), g = A + _, y = g - A, x = g - y, w = _ - y, b = A - x, T = b + w, A = g, c += 1, n > c && (m = t[c]);
            return T && (h[l++] = T), A && (h[l++] = A), l || (h[l++] = 0), h.length = l, h
        }
        t.exports = n
    }, {}],
    30: [function(e, t, r) {
        "use strict";

        function i(e, t, r) {
            var i = e * t,
                o = n * e,
                a = o - e,
                s = o - a,
                h = e - s,
                l = n * t,
                u = l - t,
                c = l - u,
                f = t - c,
                p = i - s * c,
                d = p - h * c,
                m = d - s * f,
                v = h * f - m;
            return r ? (r[0] = v, r[1] = i, r) : [v, i]
        }
        t.exports = i;
        var n = +(Math.pow(2, 27) + 1)
    }, {}],
    31: [function(e, t, r) {
        arguments[4][26][0].apply(r, arguments)
    }, {
        dup: 26
    }],
    32: [function(e, t, r) {
        arguments[4][27][0].apply(r, arguments)
    }, {
        dup: 27,
        "two-product": 35,
        "two-sum": 31
    }],
    33: [function(e, t, r) {
        arguments[4][28][0].apply(r, arguments)
    }, {
        dup: 28
    }],
    34: [function(e, t, r) {
        arguments[4][29][0].apply(r, arguments)
    }, {
        dup: 29
    }],
    35: [function(e, t, r) {
        arguments[4][30][0].apply(r, arguments)
    }, {
        dup: 30
    }],
    36: [function(e, t, r) {
        "use strict";

        function i(e, t) {
            for (var r = new Array(e.length - 1), i = 1; i < e.length; ++i)
                for (var n = r[i - 1] = new Array(e.length - 1), o = 0, a = 0; o < e.length; ++o) o !== t && (n[a++] = e[i][o]);
            return r
        }

        function n(e) {
            for (var t = new Array(e), r = 0; e > r; ++r) {
                t[r] = new Array(e);
                for (var i = 0; e > i; ++i) t[r][i] = ["m", i, "[", e - r - 1, "]"].join("")
            }
            return t
        }

        function o(e) {
            return 1 & e ? "-" : ""
        }

        function a(e) {
            if (1 === e.length) return e[0];
            if (2 === e.length) return ["sum(", e[0], ",", e[1], ")"].join("");
            var t = e.length >> 1;
            return ["sum(", a(e.slice(0, t)), ",", a(e.slice(t)), ")"].join("")
        }

        function s(e) {
            if (2 === e.length) return [
                ["sum(prod(", e[0][0], ",", e[1][1], "),prod(-", e[0][1], ",", e[1][0], "))"].join("")
            ];
            for (var t = [], r = 0; r < e.length; ++r) t.push(["scale(", a(s(i(e, r))), ",", o(r), e[0][r], ")"].join(""));
            return t
        }

        function h(e) {
            for (var t = [], r = [], o = n(e), h = [], l = 0; e > l; ++l) 0 === (1 & l) ? t.push.apply(t, s(i(o, l))) : r.push.apply(r, s(i(o, l))), h.push("m" + l);
            var u = a(t),
                m = a(r),
                v = "orientation" + e + "Exact",
                g = ["function ", v, "(", h.join(), "){var p=", u, ",n=", m, ",d=sub(p,n);return d[d.length-1];};return ", v].join(""),
                y = new Function("sum", "prod", "scale", "sub", g);
            return y(f, c, p, d)
        }

        function l(e) {
            var t = b[e.length];
            return t || (t = b[e.length] = h(e.length)), t.apply(void 0, e)
        }

        function u() {
            for (; b.length <= m;) b.push(h(b.length));
            for (var e = [], r = ["slow"], i = 0; m >= i; ++i) e.push("a" + i), r.push("o" + i);
            for (var n = ["function getOrientation(", e.join(), "){switch(arguments.length){case 0:case 1:return 0;"], i = 2; m >= i; ++i) n.push("case ", i, ":return o", i, "(", e.slice(0, i).join(), ");");
            n.push("}var s=new Array(arguments.length);for(var i=0;i<arguments.length;++i){s[i]=arguments[i]};return slow(s);}return getOrientation"), r.push(n.join(""));
            var o = Function.apply(void 0, r);
            t.exports = o.apply(void 0, [l].concat(b));
            for (var i = 0; m >= i; ++i) t.exports[i] = b[i]
        }
        var c = e("two-product"),
            f = e("robust-sum"),
            p = e("robust-scale"),
            d = e("robust-subtract"),
            m = 5,
            v = 1.1102230246251565e-16,
            g = (3 + 16 * v) * v,
            y = (7 + 56 * v) * v,
            x = h(3),
            w = h(4),
            b = [function() {
                return 0
            }, function() {
                return 0
            }, function(e, t) {
                return t[0] - e[0]
            }, function(e, t, r) {
                var i, n = (e[1] - r[1]) * (t[0] - r[0]),
                    o = (e[0] - r[0]) * (t[1] - r[1]),
                    a = n - o;
                if (n > 0) {
                    if (0 >= o) return a;
                    i = n + o
                } else {
                    if (!(0 > n)) return a;
                    if (o >= 0) return a;
                    i = -(n + o)
                }
                var s = g * i;
                return a >= s || -s >= a ? a : x(e, t, r)
            }, function(e, t, r, i) {
                var n = e[0] - i[0],
                    o = t[0] - i[0],
                    a = r[0] - i[0],
                    s = e[1] - i[1],
                    h = t[1] - i[1],
                    l = r[1] - i[1],
                    u = e[2] - i[2],
                    c = t[2] - i[2],
                    f = r[2] - i[2],
                    p = o * l,
                    d = a * h,
                    m = a * s,
                    v = n * l,
                    g = n * h,
                    x = o * s,
                    b = u * (p - d) + c * (m - v) + f * (g - x),
                    _ = (Math.abs(p) + Math.abs(d)) * Math.abs(u) + (Math.abs(m) + Math.abs(v)) * Math.abs(c) + (Math.abs(g) + Math.abs(x)) * Math.abs(f),
                    M = y * _;
                return b > M || -b > M ? b : w(e, t, r, i)
            }];
        u()
    }, {
        "robust-scale": 32,
        "robust-subtract": 33,
        "robust-sum": 34,
        "two-product": 35
    }],
    37: [function(e, t, r) {
        "use strict";

        function i(e) {
            var t = w(e),
                r = x(y(t), e);
            return 0 > r ? [t, _(t, 1 / 0)] : r > 0 ? [_(t, -(1 / 0)), t] : [t, t]
        }

        function n(e, t) {
            for (var r = new Array(t.length), i = 0; i < t.length; ++i) {
                var n = t[i],
                    o = e[n[0]],
                    a = e[n[1]];
                r[i] = [Math.min(o[0], a[0]), Math.min(o[1], a[1]), Math.max(o[0], a[0]), Math.max(o[1], a[1])]
            }
            return r
        }

        function o(e) {
            for (var t = new Array(e.length), r = 0; r < e.length; ++r) {
                var i = e[r];
                t[r] = [i[0], i[1], i[0], i[1]]
            }
            return t
        }

        function a(e, t, r) {
            var i = [];
            return v(r, function(r, n) {
                var o = t[r],
                    a = t[n];
                if (o[0] !== a[0] && o[0] !== a[1] && o[1] !== a[0] && o[1] !== a[1]) {
                    var s = e[o[0]],
                        h = e[o[1]],
                        l = e[a[0]],
                        u = e[a[1]];
                    g(s, h, l, u) && i.push([r, n])
                }
            }), i
        }

        function s(e, t, r, i) {
            var n = [];
            return v(r, i, function(r, i) {
                var o = t[r];
                if (o[0] !== i && o[1] !== i) {
                    var a = e[i],
                        s = e[o[0]],
                        h = e[o[1]];
                    g(s, h, a, a) && n.push([r, i])
                }
            }), n
        }

        function h(e, t, r, i, n) {
            function o(t) {
                if (t >= e.length) return a[t - e.length];
                var r = e[t];
                return [y(r[0]), y(r[1])]
            }
            for (var a = [], s = 0; s < r.length; ++s) {
                var h = r[s],
                    l = h[0],
                    u = h[1],
                    c = t[l],
                    f = t[u],
                    p = M(b(e[c[0]]), b(e[c[1]]), b(e[f[0]]), b(e[f[1]]));
                if (p) {
                    var d = a.length + e.length;
                    a.push(p), i.push([l, d], [u, d])
                }
            }
            i.sort(function(e, t) {
                if (e[0] !== t[0]) return e[0] - t[0];
                var r = o(e[1]),
                    i = o(t[1]);
                return x(r[0], i[0]) || x(r[1], i[1])
            });
            for (var s = i.length - 1; s >= 0; --s) {
                var m = i[s],
                    l = m[0],
                    v = t[l],
                    g = v[0],
                    w = v[1],
                    _ = e[g],
                    S = e[w];
                if ((_[0] - S[0] || _[1] - S[1]) < 0) {
                    var T = g;
                    g = w, w = T
                }
                v[0] = g;
                var A, E = v[1] = m[1];
                for (n && (A = v[2]); s > 0 && i[s - 1][0] === l;) {
                    var m = i[--s],
                        C = m[1];
                    n ? t.push([E, C, A]) : t.push([E, C]), E = C
                }
                n ? t.push([E, w, A]) : t.push([E, w])
            }
            return a
        }

        function l(e, t, r) {
            for (var n = e.length + t.length, o = new m(n), a = r, s = 0; s < t.length; ++s) {
                var h = t[s],
                    l = i(h[0]),
                    u = i(h[1]);
                a.push([l[0], u[0], l[1], u[1]]), e.push([w(h[0]), w(h[1])])
            }
            v(a, function(e, t) {
                o.link(e, t)
            });
            for (var c = 0, f = !0, p = new Array(n), s = 0; n > s; ++s) {
                var d = o.find(s);
                d === s ? (p[s] = c, e[c++] = e[s]) : (f = !1, p[s] = -1)
            }
            if (e.length = c, f) return null;
            for (var s = 0; n > s; ++s) p[s] < 0 && (p[s] = p[o.find(s)]);
            return p
        }

        function u(e, t) {
            return e[0] - t[0] || e[1] - t[1]
        }

        function c(e, t) {
            var r = e[0] - t[0] || e[1] - t[1];
            return r ? r : e[2] < t[2] ? -1 : e[2] > t[2] ? 1 : 0
        }

        function f(e, t, r) {
            if (0 !== e.length) {
                if (t)
                    for (var i = 0; i < e.length; ++i) {
                        var n = e[i],
                            o = t[n[0]],
                            a = t[n[1]];
                        n[0] = Math.min(o, a), n[1] = Math.max(o, a)
                    } else
                    for (var i = 0; i < e.length; ++i) {
                        var n = e[i],
                            o = n[0],
                            a = n[1];
                        n[0] = Math.min(o, a), n[1] = Math.max(o, a)
                    }
                r ? e.sort(c) : e.sort(u);
                for (var s = 1, i = 1; i < e.length; ++i) {
                    var h = e[i - 1],
                        l = e[i];
                    (l[0] !== h[0] || l[1] !== h[1] || r && l[2] !== h[2]) && (e[s++] = l)
                }
                e.length = s
            }
        }

        function p(e, t, r) {
            var i = n(e, t),
                u = a(e, t, i),
                c = o(e),
                p = s(e, t, i, c),
                d = h(e, t, u, p, r),
                m = l(e, d, c);
            return f(t, m, r), m ? !0 : u.length > 0 || p.length > 0
        }

        function d(e, t, r) {
            var i, n = !1;
            if (r) {
                i = t;
                for (var o = new Array(t.length), a = 0; a < t.length; ++a) {
                    var s = t[a];
                    o[a] = [s[0], s[1], r[a]]
                }
                t = o
            }
            for (; p(e, t, !!r);) n = !0;
            if (r && n) {
                i.length = 0, r.length = 0;
                for (var a = 0; a < t.length; ++a) {
                    var s = t[a];
                    i.push([s[0], s[1]]), r.push(s[2])
                }
            }
            return n
        }
        t.exports = d;
        var m = e("union-find"),
            v = e("box-intersect"),
            g = (e("compare-cell"), e("robust-segment-intersect")),
            y = e("big-rat"),
            x = e("big-rat/cmp"),
            w = e("big-rat/to-float"),
            b = e("rat-vec"),
            _ = e("nextafter"),
            M = e("./lib/rat-seg-intersect")
    }, {
        "./lib/rat-seg-intersect": 38,
        "big-rat": 42,
        "big-rat/cmp": 40,
        "big-rat/to-float": 57,
        "box-intersect": 58,
        "compare-cell": 68,
        nextafter: 69,
        "rat-vec": 72,
        "robust-segment-intersect": 81,
        "union-find": 82
    }],
    38: [function(e, t, r) {
        "use strict";

        function i(e, t) {
            return s(o(e[0], t[1]), o(e[1], t[0]))
        }

        function n(e, t, r, n) {
            var o = l(t, e),
                s = l(n, r),
                f = i(o, s);
            if (0 === h(f)) return null;
            var p = l(e, r),
                d = i(s, p),
                m = a(d, f);
            return u(e, c(o, m))
        }
        t.exports = n;
        var o = e("big-rat/mul"),
            a = e("big-rat/div"),
            s = e("big-rat/sub"),
            h = e("big-rat/sign"),
            l = e("rat-vec/sub"),
            u = e("rat-vec/add"),
            c = e("rat-vec/muls");
        e("big-rat/to-float")
    }, {
        "big-rat/div": 41,
        "big-rat/mul": 51,
        "big-rat/sign": 55,
        "big-rat/sub": 56,
        "big-rat/to-float": 57,
        "rat-vec/add": 71,
        "rat-vec/muls": 73,
        "rat-vec/sub": 74
    }],
    39: [function(e, t, r) {
        "use strict";

        function i(e, t) {
            return n(e[0].mul(t[1]).add(t[0].mul(e[1])), e[1].mul(t[1]))
        }
        var n = e("./lib/rationalize");
        t.exports = i
    }, {
        "./lib/rationalize": 49
    }],
    40: [function(e, t, r) {
        "use strict";

        function i(e, t) {
            return e[0].mul(t[1]).cmp(t[0].mul(e[1]))
        }
        t.exports = i
    }, {}],
    41: [function(e, t, r) {
        "use strict";

        function i(e, t) {
            return n(e[0].mul(t[1]), e[1].mul(t[0]))
        }
        var n = e("./lib/rationalize");
        t.exports = i
    }, {
        "./lib/rationalize": 49
    }],
    42: [function(e, t, r) {
        "use strict";

        function i(e, t) {
            if (n(e)) return t ? l(e, i(t)) : [e[0].clone(), e[1].clone()];
            var r, u, c = 0;
            if (o(e)) r = e.clone();
            else if ("string" == typeof e) r = s(e);
            else {
                if (0 === e) return [a(0), a(1)];
                if (e === Math.floor(e)) r = a(e);
                else {
                    for (; e !== Math.floor(e);) e *= Math.pow(2, 256), c -= 256;
                    r = a(e)
                }
            }
            if (n(t)) r.mul(t[1]), u = t[0].clone();
            else if (o(t)) u = t.clone();
            else if ("string" == typeof t) u = s(t);
            else if (t)
                if (t === Math.floor(t)) u = a(t);
                else {
                    for (; t !== Math.floor(t);) t *= Math.pow(2, 256), c += 256;
                    u = a(t)
                } else u = a(1);
            return c > 0 ? r = r.shln(c) : 0 > c && (u = u.shln(-c)), h(r, u)
        }
        var n = e("./is-rat"),
            o = e("./lib/is-bn"),
            a = e("./lib/num-to-bn"),
            s = e("./lib/str-to-bn"),
            h = e("./lib/rationalize"),
            l = e("./div");
        t.exports = i
    }, {
        "./div": 41,
        "./is-rat": 43,
        "./lib/is-bn": 47,
        "./lib/num-to-bn": 48,
        "./lib/rationalize": 49,
        "./lib/str-to-bn": 50
    }],
    43: [function(e, t, r) {
        "use strict";

        function i(e) {
            return Array.isArray(e) && 2 === e.length && n(e[0]) && n(e[1])
        }
        var n = e("./lib/is-bn");
        t.exports = i
    }, {
        "./lib/is-bn": 47
    }],
    44: [function(e, t, r) {
        "use strict";

        function i(e) {
            return e.cmp(new n(0))
        }
        var n = e("bn.js");
        t.exports = i
    }, {
        "bn.js": 53
    }],
    45: [function(e, t, r) {
        "use strict";

        function i(e) {
            var t = e.length,
                r = e.words,
                i = 0;
            if (1 === t) i = r[0];
            else if (2 === t) i = r[0] + 67108864 * r[1];
            else
                for (var i = 0, n = 0; t > n; n++) {
                    var o = r[n];
                    i += o * Math.pow(67108864, n)
                }
            return e.sign ? -i : i
        }
        t.exports = i
    }, {}],
    46: [function(e, t, r) {
        "use strict";

        function i(e) {
            var t = o(n.lo(e));
            if (32 > t) return t;
            var r = o(n.hi(e));
            return r > 20 ? 52 : r + 32
        }
        var n = e("double-bits"),
            o = e("bit-twiddle").countTrailingZeros;
        t.exports = i
    }, {
        "bit-twiddle": 52,
        "double-bits": 54
    }],
    47: [function(e, t, r) {
        "use strict";

        function i(e) {
            return e && "object" == typeof e && Boolean(e.words)
        }
        e("bn.js");
        t.exports = i
    }, {
        "bn.js": 53
    }],
    48: [function(e, t, r) {
        "use strict";

        function i(e) {
            var t = o.exponent(e);
            return 52 > t ? new n(e) : new n(e * Math.pow(2, 52 - t)).shln(t - 52)
        }
        var n = e("bn.js"),
            o = e("double-bits");
        t.exports = i
    }, {
        "bn.js": 53,
        "double-bits": 54
    }],
    49: [function(e, t, r) {
        "use strict";

        function i(e, t) {
            var r = o(e),
                i = o(t);
            if (0 === r) return [n(0), n(1)];
            if (0 === i) return [n(0), n(0)];
            0 > i && (e = e.neg(), t = t.neg());
            var a = e.gcd(t);
            return a.cmpn(1) ? [e.div(a), t.div(a)] : [e, t]
        }
        var n = e("./num-to-bn"),
            o = e("./bn-sign");
        t.exports = i
    }, {
        "./bn-sign": 44,
        "./num-to-bn": 48
    }],
    50: [function(e, t, r) {
        "use strict";

        function i(e) {
            return new n(e)
        }
        var n = e("bn.js");
        t.exports = i
    }, {
        "bn.js": 53
    }],
    51: [function(e, t, r) {
        "use strict";

        function i(e, t) {
            return n(e[0].mul(t[0]), e[1].mul(t[1]))
        }
        var n = e("./lib/rationalize");
        t.exports = i
    }, {
        "./lib/rationalize": 49
    }],
    52: [function(e, t, r) {
        "use strict";
        "use restrict";

        function i(e) {
            var t = 32;
            return e &= -e, e && t--, 65535 & e && (t -= 16), 16711935 & e && (t -= 8), 252645135 & e && (t -= 4), 858993459 & e && (t -= 2), 1431655765 & e && (t -= 1), t
        }
        var n = 32;
        r.INT_BITS = n, r.INT_MAX = 2147483647, r.INT_MIN = -1 << n - 1, r.sign = function(e) {
            return (e > 0) - (0 > e)
        }, r.abs = function(e) {
            var t = e >> n - 1;
            return (e ^ t) - t
        }, r.min = function(e, t) {
            return t ^ (e ^ t) & -(t > e)
        }, r.max = function(e, t) {
            return e ^ (e ^ t) & -(t > e)
        }, r.isPow2 = function(e) {
            return !(e & e - 1 || !e)
        }, r.log2 = function(e) {
            var t, r;
            return t = (e > 65535) << 4, e >>>= t, r = (e > 255) << 3, e >>>= r, t |= r, r = (e > 15) << 2, e >>>= r, t |= r, r = (e > 3) << 1, e >>>= r, t |= r, t | e >> 1
        }, r.log10 = function(e) {
            return e >= 1e9 ? 9 : e >= 1e8 ? 8 : e >= 1e7 ? 7 : e >= 1e6 ? 6 : e >= 1e5 ? 5 : e >= 1e4 ? 4 : e >= 1e3 ? 3 : e >= 100 ? 2 : e >= 10 ? 1 : 0
        }, r.popCount = function(e) {
            return e -= e >>> 1 & 1431655765, e = (858993459 & e) + (e >>> 2 & 858993459), 16843009 * (e + (e >>> 4) & 252645135) >>> 24
        }, r.countTrailingZeros = i, r.nextPow2 = function(e) {
            return e += 0 === e, --e, e |= e >>> 1, e |= e >>> 2, e |= e >>> 4, e |= e >>> 8, e |= e >>> 16, e + 1
        }, r.prevPow2 = function(e) {
            return e |= e >>> 1, e |= e >>> 2, e |= e >>> 4, e |= e >>> 8, e |= e >>> 16, e - (e >>> 1)
        }, r.parity = function(e) {
            return e ^= e >>> 16, e ^= e >>> 8, e ^= e >>> 4, e &= 15, 27030 >>> e & 1
        };
        var o = new Array(256);
        ! function(e) {
            for (var t = 0; 256 > t; ++t) {
                var r = t,
                    i = t,
                    n = 7;
                for (r >>>= 1; r; r >>>= 1) i <<= 1, i |= 1 & r, --n;
                e[t] = i << n & 255
            }
        }(o), r.reverse = function(e) {
            return o[255 & e] << 24 | o[e >>> 8 & 255] << 16 | o[e >>> 16 & 255] << 8 | o[e >>> 24 & 255]
        }, r.interleave2 = function(e, t) {
            return e &= 65535, e = 16711935 & (e | e << 8), e = 252645135 & (e | e << 4), e = 858993459 & (e | e << 2), e = 1431655765 & (e | e << 1), t &= 65535, t = 16711935 & (t | t << 8), t = 252645135 & (t | t << 4), t = 858993459 & (t | t << 2), t = 1431655765 & (t | t << 1), e | t << 1
        }, r.deinterleave2 = function(e, t) {
            return e = e >>> t & 1431655765, e = 858993459 & (e | e >>> 1), e = 252645135 & (e | e >>> 2), e = 16711935 & (e | e >>> 4), e = 65535 & (e | e >>> 16), e << 16 >> 16
        }, r.interleave3 = function(e, t, r) {
            return e &= 1023, e = 4278190335 & (e | e << 16), e = 251719695 & (e | e << 8), e = 3272356035 & (e | e << 4), e = 1227133513 & (e | e << 2), t &= 1023, t = 4278190335 & (t | t << 16), t = 251719695 & (t | t << 8), t = 3272356035 & (t | t << 4), t = 1227133513 & (t | t << 2), e |= t << 1, r &= 1023, r = 4278190335 & (r | r << 16), r = 251719695 & (r | r << 8), r = 3272356035 & (r | r << 4), r = 1227133513 & (r | r << 2), e | r << 2
        }, r.deinterleave3 = function(e, t) {
            return e = e >>> t & 1227133513, e = 3272356035 & (e | e >>> 2), e = 251719695 & (e | e >>> 4), e = 4278190335 & (e | e >>> 8), e = 1023 & (e | e >>> 16), e << 22 >> 22
        }, r.nextCombination = function(e) {
            var t = e | e - 1;
            return t + 1 | (~t & -~t) - 1 >>> i(e) + 1
        }
    }, {}],
    53: [function(e, t, r) {
        ! function(e, t) {
            "use strict";

            function r(e, t) {
                if (!e) throw new Error(t || "Assertion failed")
            }

            function i(e, t) {
                e.super_ = t;
                var r = function() {};
                r.prototype = t.prototype, e.prototype = new r, e.prototype.constructor = e
            }

            function n(e, t, r) {
                return null !== e && "object" == typeof e && Array.isArray(e.words) ? e : (this.sign = !1, this.words = null, this.length = 0, this.red = null, ("le" === t || "be" === t) && (r = t, t = 10), void(null !== e && this._init(e || 0, t || 10, r || "be")))
            }

            function o(e, t, r) {
                for (var i = 0, n = Math.min(e.length, r), o = t; n > o; o++) {
                    var a = e.charCodeAt(o) - 48;
                    i <<= 4, i |= a >= 49 && 54 >= a ? a - 49 + 10 : a >= 17 && 22 >= a ? a - 17 + 10 : 15 & a
                }
                return i
            }

            function a(e, t, r, i) {
                for (var n = 0, o = Math.min(e.length, r), a = t; o > a; a++) {
                    var s = e.charCodeAt(a) - 48;
                    n *= i, n += s >= 49 ? s - 49 + 10 : s >= 17 ? s - 17 + 10 : s
                }
                return n
            }

            function s(e, t) {
                this.name = e, this.p = new n(t, 16), this.n = this.p.bitLength(), this.k = new n(1).ishln(this.n).isub(this.p), this.tmp = this._tmp()
            }

            function h() {
                s.call(this, "k256", "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f")
            }

            function l() {
                s.call(this, "p224", "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001")
            }

            function u() {
                s.call(this, "p192", "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff")
            }

            function c() {
                s.call(this, "25519", "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed")
            }

            function f(e) {
                if ("string" == typeof e) {
                    var t = n._prime(e);
                    this.m = t.p, this.prime = t
                } else this.m = e, this.prime = null
            }

            function p(e) {
                f.call(this, e), this.shift = this.m.bitLength(), this.shift % 26 !== 0 && (this.shift += 26 - this.shift % 26), this.r = new n(1).ishln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv.sign = !0, this.minv = this.minv.mod(this.r)
            }
            "object" == typeof e ? e.exports = n : t.BN = n, n.BN = n, n.wordSize = 26, n.prototype._init = function(e, t, i) {
                if ("number" == typeof e) return this._initNumber(e, t, i);
                if ("object" == typeof e) return this._initArray(e, t, i);
                "hex" === t && (t = 16), r(t === (0 | t) && t >= 2 && 36 >= t), e = e.toString().replace(/\s+/g, "");
                var n = 0;
                "-" === e[0] && n++, 16 === t ? this._parseHex(e, n) : this._parseBase(e, t, n), "-" === e[0] && (this.sign = !0), this.strip(), "le" === i && this._initArray(this.toArray(), t, i)
            }, n.prototype._initNumber = function(e, t, i) {
                0 > e && (this.sign = !0, e = -e), 67108864 > e ? (this.words = [67108863 & e], this.length = 1) : 4503599627370496 > e ? (this.words = [67108863 & e, e / 67108864 & 67108863], this.length = 2) : (r(9007199254740992 > e),
                    this.words = [67108863 & e, e / 67108864 & 67108863, 1], this.length = 3), "le" === i && this._initArray(this.toArray(), t, i)
            }, n.prototype._initArray = function(e, t, i) {
                if (r("number" == typeof e.length), e.length <= 0) return this.words = [0], this.length = 1, this;
                this.length = Math.ceil(e.length / 3), this.words = new Array(this.length);
                for (var n = 0; n < this.length; n++) this.words[n] = 0;
                var o = 0;
                if ("be" === i)
                    for (var n = e.length - 1, a = 0; n >= 0; n -= 3) {
                        var s = e[n] | e[n - 1] << 8 | e[n - 2] << 16;
                        this.words[a] |= s << o & 67108863, this.words[a + 1] = s >>> 26 - o & 67108863, o += 24, o >= 26 && (o -= 26, a++)
                    } else if ("le" === i)
                    for (var n = 0, a = 0; n < e.length; n += 3) {
                        var s = e[n] | e[n + 1] << 8 | e[n + 2] << 16;
                        this.words[a] |= s << o & 67108863, this.words[a + 1] = s >>> 26 - o & 67108863, o += 24, o >= 26 && (o -= 26, a++)
                    }
                return this.strip()
            }, n.prototype._parseHex = function(e, t) {
                this.length = Math.ceil((e.length - t) / 6), this.words = new Array(this.length);
                for (var r = 0; r < this.length; r++) this.words[r] = 0;
                for (var i = 0, r = e.length - 6, n = 0; r >= t; r -= 6) {
                    var a = o(e, r, r + 6);
                    this.words[n] |= a << i & 67108863, this.words[n + 1] |= a >>> 26 - i & 4194303, i += 24, i >= 26 && (i -= 26, n++)
                }
                if (r + 6 !== t) {
                    var a = o(e, t, r + 6);
                    this.words[n] |= a << i & 67108863, this.words[n + 1] |= a >>> 26 - i & 4194303
                }
                this.strip()
            }, n.prototype._parseBase = function(e, t, r) {
                this.words = [0], this.length = 1;
                for (var i = 0, n = 1; 67108863 >= n; n *= t) i++;
                i--, n = n / t | 0;
                for (var o = e.length - r, s = o % i, h = Math.min(o, o - s) + r, l = 0, u = r; h > u; u += i) l = a(e, u, u + i, t), this.imuln(n), this.words[0] + l < 67108864 ? this.words[0] += l : this._iaddn(l);
                if (0 !== s) {
                    for (var c = 1, l = a(e, u, e.length, t), u = 0; s > u; u++) c *= t;
                    this.imuln(c), this.words[0] + l < 67108864 ? this.words[0] += l : this._iaddn(l)
                }
            }, n.prototype.copy = function(e) {
                e.words = new Array(this.length);
                for (var t = 0; t < this.length; t++) e.words[t] = this.words[t];
                e.length = this.length, e.sign = this.sign, e.red = this.red
            }, n.prototype.clone = function() {
                var e = new n(null);
                return this.copy(e), e
            }, n.prototype.strip = function() {
                for (; this.length > 1 && 0 === this.words[this.length - 1];) this.length--;
                return this._normSign()
            }, n.prototype._normSign = function() {
                return 1 === this.length && 0 === this.words[0] && (this.sign = !1), this
            }, n.prototype.inspect = function() {
                return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">"
            };
            var d = ["", "0", "00", "000", "0000", "00000", "000000", "0000000", "00000000", "000000000", "0000000000", "00000000000", "000000000000", "0000000000000", "00000000000000", "000000000000000", "0000000000000000", "00000000000000000", "000000000000000000", "0000000000000000000", "00000000000000000000", "000000000000000000000", "0000000000000000000000", "00000000000000000000000", "000000000000000000000000", "0000000000000000000000000"],
                m = [0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
                v = [0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216, 43046721, 1e7, 19487171, 35831808, 62748517, 7529536, 11390625, 16777216, 24137569, 34012224, 47045881, 64e6, 4084101, 5153632, 6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149, 243e5, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176];
            n.prototype.toString = function(e, t) {
                if (e = e || 10, 16 === e || "hex" === e) {
                    for (var i = "", n = 0, t = 0 | t || 1, o = 0, a = 0; a < this.length; a++) {
                        var s = this.words[a],
                            h = (16777215 & (s << n | o)).toString(16);
                        o = s >>> 24 - n & 16777215, i = 0 !== o || a !== this.length - 1 ? d[6 - h.length] + h + i : h + i, n += 2, n >= 26 && (n -= 26, a--)
                    }
                    for (0 !== o && (i = o.toString(16) + i); i.length % t !== 0;) i = "0" + i;
                    return this.sign && (i = "-" + i), i
                }
                if (e === (0 | e) && e >= 2 && 36 >= e) {
                    var l = m[e],
                        u = v[e],
                        i = "",
                        c = this.clone();
                    for (c.sign = !1; 0 !== c.cmpn(0);) {
                        var f = c.modn(u).toString(e);
                        c = c.idivn(u), i = 0 !== c.cmpn(0) ? d[l - f.length] + f + i : f + i
                    }
                    return 0 === this.cmpn(0) && (i = "0" + i), this.sign && (i = "-" + i), i
                }
                r(!1, "Base should be between 2 and 36")
            }, n.prototype.toJSON = function() {
                return this.toString(16)
            }, n.prototype.toArray = function(e) {
                this.strip();
                var t = new Array(this.byteLength());
                t[0] = 0;
                var r = this.clone();
                if ("le" !== e)
                    for (var i = 0; 0 !== r.cmpn(0); i++) {
                        var n = r.andln(255);
                        r.ishrn(8), t[t.length - i - 1] = n
                    } else
                    for (var i = 0; 0 !== r.cmpn(0); i++) {
                        var n = r.andln(255);
                        r.ishrn(8), t[i] = n
                    }
                return t
            }, Math.clz32 ? n.prototype._countBits = function(e) {
                return 32 - Math.clz32(e)
            } : n.prototype._countBits = function(e) {
                var t = e,
                    r = 0;
                return t >= 4096 && (r += 13, t >>>= 13), t >= 64 && (r += 7, t >>>= 7), t >= 8 && (r += 4, t >>>= 4), t >= 2 && (r += 2, t >>>= 2), r + t
            }, n.prototype._zeroBits = function(e) {
                if (0 === e) return 26;
                var t = e,
                    r = 0;
                return 0 === (8191 & t) && (r += 13, t >>>= 13), 0 === (127 & t) && (r += 7, t >>>= 7), 0 === (15 & t) && (r += 4, t >>>= 4), 0 === (3 & t) && (r += 2, t >>>= 2), 0 === (1 & t) && r++, r
            }, n.prototype.bitLength = function() {
                var e = 0,
                    t = this.words[this.length - 1],
                    e = this._countBits(t);
                return 26 * (this.length - 1) + e
            }, n.prototype.zeroBits = function() {
                if (0 === this.cmpn(0)) return 0;
                for (var e = 0, t = 0; t < this.length; t++) {
                    var r = this._zeroBits(this.words[t]);
                    if (e += r, 26 !== r) break
                }
                return e
            }, n.prototype.byteLength = function() {
                return Math.ceil(this.bitLength() / 8)
            }, n.prototype.neg = function() {
                if (0 === this.cmpn(0)) return this.clone();
                var e = this.clone();
                return e.sign = !this.sign, e
            }, n.prototype.ior = function(e) {
                for (this.sign = this.sign || e.sign; this.length < e.length;) this.words[this.length++] = 0;
                for (var t = 0; t < e.length; t++) this.words[t] = this.words[t] | e.words[t];
                return this.strip()
            }, n.prototype.or = function(e) {
                return this.length > e.length ? this.clone().ior(e) : e.clone().ior(this)
            }, n.prototype.iand = function(e) {
                this.sign = this.sign && e.sign;
                var t;
                t = this.length > e.length ? e : this;
                for (var r = 0; r < t.length; r++) this.words[r] = this.words[r] & e.words[r];
                return this.length = t.length, this.strip()
            }, n.prototype.and = function(e) {
                return this.length > e.length ? this.clone().iand(e) : e.clone().iand(this)
            }, n.prototype.ixor = function(e) {
                this.sign = this.sign || e.sign;
                var t, r;
                this.length > e.length ? (t = this, r = e) : (t = e, r = this);
                for (var i = 0; i < r.length; i++) this.words[i] = t.words[i] ^ r.words[i];
                if (this !== t)
                    for (; i < t.length; i++) this.words[i] = t.words[i];
                return this.length = t.length, this.strip()
            }, n.prototype.xor = function(e) {
                return this.length > e.length ? this.clone().ixor(e) : e.clone().ixor(this)
            }, n.prototype.setn = function(e, t) {
                r("number" == typeof e && e >= 0);
                for (var i = e / 26 | 0, n = e % 26; this.length <= i;) this.words[this.length++] = 0;
                return t ? this.words[i] = this.words[i] | 1 << n : this.words[i] = this.words[i] & ~(1 << n), this.strip()
            }, n.prototype.iadd = function(e) {
                if (this.sign && !e.sign) {
                    this.sign = !1;
                    var t = this.isub(e);
                    return this.sign = !this.sign, this._normSign()
                }
                if (!this.sign && e.sign) {
                    e.sign = !1;
                    var t = this.isub(e);
                    return e.sign = !0, t._normSign()
                }
                var r, i;
                this.length > e.length ? (r = this, i = e) : (r = e, i = this);
                for (var n = 0, o = 0; o < i.length; o++) {
                    var t = r.words[o] + i.words[o] + n;
                    this.words[o] = 67108863 & t, n = t >>> 26
                }
                for (; 0 !== n && o < r.length; o++) {
                    var t = r.words[o] + n;
                    this.words[o] = 67108863 & t, n = t >>> 26
                }
                if (this.length = r.length, 0 !== n) this.words[this.length] = n, this.length++;
                else if (r !== this)
                    for (; o < r.length; o++) this.words[o] = r.words[o];
                return this
            }, n.prototype.add = function(e) {
                if (e.sign && !this.sign) {
                    e.sign = !1;
                    var t = this.sub(e);
                    return e.sign = !0, t
                }
                if (!e.sign && this.sign) {
                    this.sign = !1;
                    var t = e.sub(this);
                    return this.sign = !0, t
                }
                return this.length > e.length ? this.clone().iadd(e) : e.clone().iadd(this)
            }, n.prototype.isub = function(e) {
                if (e.sign) {
                    e.sign = !1;
                    var t = this.iadd(e);
                    return e.sign = !0, t._normSign()
                }
                if (this.sign) return this.sign = !1, this.iadd(e), this.sign = !0, this._normSign();
                var r = this.cmp(e);
                if (0 === r) return this.sign = !1, this.length = 1, this.words[0] = 0, this;
                var i, n;
                r > 0 ? (i = this, n = e) : (i = e, n = this);
                for (var o = 0, a = 0; a < n.length; a++) {
                    var t = i.words[a] - n.words[a] + o;
                    o = t >> 26, this.words[a] = 67108863 & t
                }
                for (; 0 !== o && a < i.length; a++) {
                    var t = i.words[a] + o;
                    o = t >> 26, this.words[a] = 67108863 & t
                }
                if (0 === o && a < i.length && i !== this)
                    for (; a < i.length; a++) this.words[a] = i.words[a];
                return this.length = Math.max(this.length, a), i !== this && (this.sign = !0), this.strip()
            }, n.prototype.sub = function(e) {
                return this.clone().isub(e)
            }, n.prototype._smallMulTo = function(e, t) {
                t.sign = e.sign !== this.sign, t.length = this.length + e.length;
                for (var r = 0, i = 0; i < t.length - 1; i++) {
                    for (var n = r >>> 26, o = 67108863 & r, a = Math.min(i, e.length - 1), s = Math.max(0, i - this.length + 1); a >= s; s++) {
                        var h = i - s,
                            l = 0 | this.words[h],
                            u = 0 | e.words[s],
                            c = l * u,
                            f = 67108863 & c;
                        n = n + (c / 67108864 | 0) | 0, f = f + o | 0, o = 67108863 & f, n = n + (f >>> 26) | 0
                    }
                    t.words[i] = o, r = n
                }
                return 0 !== r ? t.words[i] = r : t.length--, t.strip()
            }, n.prototype._bigMulTo = function(e, t) {
                t.sign = e.sign !== this.sign, t.length = this.length + e.length;
                for (var r = 0, i = 0, n = 0; n < t.length - 1; n++) {
                    var o = i;
                    i = 0;
                    for (var a = 67108863 & r, s = Math.min(n, e.length - 1), h = Math.max(0, n - this.length + 1); s >= h; h++) {
                        var l = n - h,
                            u = 0 | this.words[l],
                            c = 0 | e.words[h],
                            f = u * c,
                            p = 67108863 & f;
                        o = o + (f / 67108864 | 0) | 0, p = p + a | 0, a = 67108863 & p, o = o + (p >>> 26) | 0, i += o >>> 26, o &= 67108863
                    }
                    t.words[n] = a, r = o, o = i
                }
                return 0 !== r ? t.words[n] = r : t.length--, t.strip()
            }, n.prototype.mulTo = function(e, t) {
                var r;
                return r = this.length + e.length < 63 ? this._smallMulTo(e, t) : this._bigMulTo(e, t)
            }, n.prototype.mul = function(e) {
                var t = new n(null);
                return t.words = new Array(this.length + e.length), this.mulTo(e, t)
            }, n.prototype.imul = function(e) {
                if (0 === this.cmpn(0) || 0 === e.cmpn(0)) return this.words[0] = 0, this.length = 1, this;
                var t = this.length,
                    r = e.length;
                this.sign = e.sign !== this.sign, this.length = this.length + e.length, this.words[this.length - 1] = 0;
                for (var i = this.length - 2; i >= 0; i--) {
                    for (var n = 0, o = 0, a = Math.min(i, r - 1), s = Math.max(0, i - t + 1); a >= s; s++) {
                        var h = i - s,
                            l = this.words[h],
                            u = e.words[s],
                            c = l * u,
                            f = 67108863 & c;
                        n += c / 67108864 | 0, f += o, o = 67108863 & f, n += f >>> 26
                    }
                    this.words[i] = o, this.words[i + 1] += n, n = 0
                }
                for (var n = 0, h = 1; h < this.length; h++) {
                    var p = this.words[h] + n;
                    this.words[h] = 67108863 & p, n = p >>> 26
                }
                return this.strip()
            }, n.prototype.imuln = function(e) {
                r("number" == typeof e);
                for (var t = 0, i = 0; i < this.length; i++) {
                    var n = this.words[i] * e,
                        o = (67108863 & n) + (67108863 & t);
                    t >>= 26, t += n / 67108864 | 0, t += o >>> 26, this.words[i] = 67108863 & o
                }
                return 0 !== t && (this.words[i] = t, this.length++), this
            }, n.prototype.muln = function(e) {
                return this.clone().imuln(e)
            }, n.prototype.sqr = function() {
                return this.mul(this)
            }, n.prototype.isqr = function() {
                return this.mul(this)
            }, n.prototype.ishln = function(e) {
                r("number" == typeof e && e >= 0);
                var t = e % 26,
                    i = (e - t) / 26,
                    n = 67108863 >>> 26 - t << 26 - t;
                if (0 !== t) {
                    for (var o = 0, a = 0; a < this.length; a++) {
                        var s = this.words[a] & n,
                            h = this.words[a] - s << t;
                        this.words[a] = h | o, o = s >>> 26 - t
                    }
                    o && (this.words[a] = o, this.length++)
                }
                if (0 !== i) {
                    for (var a = this.length - 1; a >= 0; a--) this.words[a + i] = this.words[a];
                    for (var a = 0; i > a; a++) this.words[a] = 0;
                    this.length += i
                }
                return this.strip()
            }, n.prototype.ishrn = function(e, t, i) {
                r("number" == typeof e && e >= 0);
                var n;
                n = t ? (t - t % 26) / 26 : 0;
                var o = e % 26,
                    a = Math.min((e - o) / 26, this.length),
                    s = 67108863 ^ 67108863 >>> o << o,
                    h = i;
                if (n -= a, n = Math.max(0, n), h) {
                    for (var l = 0; a > l; l++) h.words[l] = this.words[l];
                    h.length = a
                }
                if (0 === a);
                else if (this.length > a) {
                    this.length -= a;
                    for (var l = 0; l < this.length; l++) this.words[l] = this.words[l + a]
                } else this.words[0] = 0, this.length = 1;
                for (var u = 0, l = this.length - 1; l >= 0 && (0 !== u || l >= n); l--) {
                    var c = this.words[l];
                    this.words[l] = u << 26 - o | c >>> o, u = c & s
                }
                return h && 0 !== u && (h.words[h.length++] = u), 0 === this.length && (this.words[0] = 0, this.length = 1), this.strip(), this
            }, n.prototype.shln = function(e) {
                return this.clone().ishln(e)
            }, n.prototype.shrn = function(e) {
                return this.clone().ishrn(e)
            }, n.prototype.testn = function(e) {
                r("number" == typeof e && e >= 0);
                var t = e % 26,
                    i = (e - t) / 26,
                    n = 1 << t;
                if (this.length <= i) return !1;
                var o = this.words[i];
                return !!(o & n)
            }, n.prototype.imaskn = function(e) {
                r("number" == typeof e && e >= 0);
                var t = e % 26,
                    i = (e - t) / 26;
                if (r(!this.sign, "imaskn works only with positive numbers"), 0 !== t && i++, this.length = Math.min(i, this.length), 0 !== t) {
                    var n = 67108863 ^ 67108863 >>> t << t;
                    this.words[this.length - 1] &= n
                }
                return this.strip()
            }, n.prototype.maskn = function(e) {
                return this.clone().imaskn(e)
            }, n.prototype.iaddn = function(e) {
                return r("number" == typeof e), 0 > e ? this.isubn(-e) : this.sign ? 1 === this.length && this.words[0] < e ? (this.words[0] = e - this.words[0], this.sign = !1, this) : (this.sign = !1, this.isubn(e), this.sign = !0, this) : this._iaddn(e)
            }, n.prototype._iaddn = function(e) {
                this.words[0] += e;
                for (var t = 0; t < this.length && this.words[t] >= 67108864; t++) this.words[t] -= 67108864, t === this.length - 1 ? this.words[t + 1] = 1 : this.words[t + 1]++;
                return this.length = Math.max(this.length, t + 1), this
            }, n.prototype.isubn = function(e) {
                if (r("number" == typeof e), 0 > e) return this.iaddn(-e);
                if (this.sign) return this.sign = !1, this.iaddn(e), this.sign = !0, this;
                this.words[0] -= e;
                for (var t = 0; t < this.length && this.words[t] < 0; t++) this.words[t] += 67108864, this.words[t + 1] -= 1;
                return this.strip()
            }, n.prototype.addn = function(e) {
                return this.clone().iaddn(e)
            }, n.prototype.subn = function(e) {
                return this.clone().isubn(e)
            }, n.prototype.iabs = function() {
                return this.sign = !1, this
            }, n.prototype.abs = function() {
                return this.clone().iabs()
            }, n.prototype._ishlnsubmul = function(e, t, i) {
                var n, o = e.length + i;
                if (this.words.length < o) {
                    for (var a = new Array(o), n = 0; n < this.length; n++) a[n] = this.words[n];
                    this.words = a
                } else n = this.length;
                for (this.length = Math.max(this.length, o); n < this.length; n++) this.words[n] = 0;
                for (var s = 0, n = 0; n < e.length; n++) {
                    var h = this.words[n + i] + s,
                        l = e.words[n] * t;
                    h -= 67108863 & l, s = (h >> 26) - (l / 67108864 | 0), this.words[n + i] = 67108863 & h
                }
                for (; n < this.length - i; n++) {
                    var h = this.words[n + i] + s;
                    s = h >> 26, this.words[n + i] = 67108863 & h
                }
                if (0 === s) return this.strip();
                r(-1 === s), s = 0;
                for (var n = 0; n < this.length; n++) {
                    var h = -this.words[n] + s;
                    s = h >> 26, this.words[n] = 67108863 & h
                }
                return this.sign = !0, this.strip()
            }, n.prototype._wordDiv = function(e, t) {
                var r = this.length - e.length,
                    i = this.clone(),
                    o = e,
                    a = o.words[o.length - 1],
                    s = this._countBits(a);
                r = 26 - s, 0 !== r && (o = o.shln(r), i.ishln(r), a = o.words[o.length - 1]);
                var h, l = i.length - o.length;
                if ("mod" !== t) {
                    h = new n(null), h.length = l + 1, h.words = new Array(h.length);
                    for (var u = 0; u < h.length; u++) h.words[u] = 0
                }
                var c = i.clone()._ishlnsubmul(o, 1, l);
                c.sign || (i = c, h && (h.words[l] = 1));
                for (var f = l - 1; f >= 0; f--) {
                    var p = 67108864 * i.words[o.length + f] + i.words[o.length + f - 1];
                    for (p = Math.min(p / a | 0, 67108863), i._ishlnsubmul(o, p, f); i.sign;) p--, i.sign = !1, i._ishlnsubmul(o, 1, f), 0 !== i.cmpn(0) && (i.sign = !i.sign);
                    h && (h.words[f] = p)
                }
                return h && h.strip(), i.strip(), "div" !== t && 0 !== r && i.ishrn(r), {
                    div: h ? h : null,
                    mod: i
                }
            }, n.prototype.divmod = function(e, t) {
                if (r(0 !== e.cmpn(0)), this.sign && !e.sign) {
                    var i, o, a = this.neg().divmod(e, t);
                    return "mod" !== t && (i = a.div.neg()), "div" !== t && (o = 0 === a.mod.cmpn(0) ? a.mod : e.sub(a.mod)), {
                        div: i,
                        mod: o
                    }
                }
                if (!this.sign && e.sign) {
                    var i, a = this.divmod(e.neg(), t);
                    return "mod" !== t && (i = a.div.neg()), {
                        div: i,
                        mod: a.mod
                    }
                }
                return this.sign && e.sign ? this.neg().divmod(e.neg(), t) : e.length > this.length || this.cmp(e) < 0 ? {
                    div: new n(0),
                    mod: this
                } : 1 === e.length ? "div" === t ? {
                    div: this.divn(e.words[0]),
                    mod: null
                } : "mod" === t ? {
                    div: null,
                    mod: new n(this.modn(e.words[0]))
                } : {
                    div: this.divn(e.words[0]),
                    mod: new n(this.modn(e.words[0]))
                } : this._wordDiv(e, t)
            }, n.prototype.div = function(e) {
                return this.divmod(e, "div").div
            }, n.prototype.mod = function(e) {
                return this.divmod(e, "mod").mod
            }, n.prototype.divRound = function(e) {
                var t = this.divmod(e);
                if (0 === t.mod.cmpn(0)) return t.div;
                var r = t.div.sign ? t.mod.isub(e) : t.mod,
                    i = e.shrn(1),
                    n = e.andln(1),
                    o = r.cmp(i);
                return 0 > o || 1 === n && 0 === o ? t.div : t.div.sign ? t.div.isubn(1) : t.div.iaddn(1)
            }, n.prototype.modn = function(e) {
                r(67108863 >= e);
                for (var t = (1 << 26) % e, i = 0, n = this.length - 1; n >= 0; n--) i = (t * i + this.words[n]) % e;
                return i
            }, n.prototype.idivn = function(e) {
                r(67108863 >= e);
                for (var t = 0, i = this.length - 1; i >= 0; i--) {
                    var n = this.words[i] + 67108864 * t;
                    this.words[i] = n / e | 0, t = n % e
                }
                return this.strip()
            }, n.prototype.divn = function(e) {
                return this.clone().idivn(e)
            }, n.prototype.egcd = function(e) {
                r(!e.sign), r(0 !== e.cmpn(0));
                var t = this,
                    i = e.clone();
                t = t.sign ? t.mod(e) : t.clone();
                for (var o = new n(1), a = new n(0), s = new n(0), h = new n(1), l = 0; t.isEven() && i.isEven();) t.ishrn(1), i.ishrn(1), ++l;
                for (var u = i.clone(), c = t.clone(); 0 !== t.cmpn(0);) {
                    for (; t.isEven();) t.ishrn(1), o.isEven() && a.isEven() ? (o.ishrn(1), a.ishrn(1)) : (o.iadd(u).ishrn(1), a.isub(c).ishrn(1));
                    for (; i.isEven();) i.ishrn(1), s.isEven() && h.isEven() ? (s.ishrn(1), h.ishrn(1)) : (s.iadd(u).ishrn(1), h.isub(c).ishrn(1));
                    t.cmp(i) >= 0 ? (t.isub(i), o.isub(s), a.isub(h)) : (i.isub(t), s.isub(o), h.isub(a))
                }
                return {
                    a: s,
                    b: h,
                    gcd: i.ishln(l)
                }
            }, n.prototype._invmp = function(e) {
                r(!e.sign), r(0 !== e.cmpn(0));
                var t = this,
                    i = e.clone();
                t = t.sign ? t.mod(e) : t.clone();
                for (var o = new n(1), a = new n(0), s = i.clone(); t.cmpn(1) > 0 && i.cmpn(1) > 0;) {
                    for (; t.isEven();) t.ishrn(1), o.isEven() ? o.ishrn(1) : o.iadd(s).ishrn(1);
                    for (; i.isEven();) i.ishrn(1), a.isEven() ? a.ishrn(1) : a.iadd(s).ishrn(1);
                    t.cmp(i) >= 0 ? (t.isub(i), o.isub(a)) : (i.isub(t), a.isub(o))
                }
                return 0 === t.cmpn(1) ? o : a
            }, n.prototype.gcd = function(e) {
                if (0 === this.cmpn(0)) return e.clone();
                if (0 === e.cmpn(0)) return this.clone();
                var t = this.clone(),
                    r = e.clone();
                t.sign = !1, r.sign = !1;
                for (var i = 0; t.isEven() && r.isEven(); i++) t.ishrn(1), r.ishrn(1);
                for (;;) {
                    for (; t.isEven();) t.ishrn(1);
                    for (; r.isEven();) r.ishrn(1);
                    var n = t.cmp(r);
                    if (0 > n) {
                        var o = t;
                        t = r, r = o
                    } else if (0 === n || 0 === r.cmpn(1)) break;
                    t.isub(r)
                }
                return r.ishln(i)
            }, n.prototype.invm = function(e) {
                return this.egcd(e).a.mod(e)
            }, n.prototype.isEven = function() {
                return 0 === (1 & this.words[0])
            }, n.prototype.isOdd = function() {
                return 1 === (1 & this.words[0])
            }, n.prototype.andln = function(e) {
                return this.words[0] & e
            }, n.prototype.bincn = function(e) {
                r("number" == typeof e);
                var t = e % 26,
                    i = (e - t) / 26,
                    n = 1 << t;
                if (this.length <= i) {
                    for (var o = this.length; i + 1 > o; o++) this.words[o] = 0;
                    return this.words[i] |= n, this.length = i + 1, this
                }
                for (var a = n, o = i; 0 !== a && o < this.length; o++) {
                    var s = this.words[o];
                    s += a, a = s >>> 26, s &= 67108863, this.words[o] = s
                }
                return 0 !== a && (this.words[o] = a, this.length++), this
            }, n.prototype.cmpn = function(e) {
                var t = 0 > e;
                if (t && (e = -e), this.sign && !t) return -1;
                if (!this.sign && t) return 1;
                e &= 67108863, this.strip();
                var r;
                if (this.length > 1) r = 1;
                else {
                    var i = this.words[0];
                    r = i === e ? 0 : e > i ? -1 : 1
                }
                return this.sign && (r = -r), r
            }, n.prototype.cmp = function(e) {
                if (this.sign && !e.sign) return -1;
                if (!this.sign && e.sign) return 1;
                var t = this.ucmp(e);
                return this.sign ? -t : t
            }, n.prototype.ucmp = function(e) {
                if (this.length > e.length) return 1;
                if (this.length < e.length) return -1;
                for (var t = 0, r = this.length - 1; r >= 0; r--) {
                    var i = this.words[r],
                        n = e.words[r];
                    if (i !== n) {
                        n > i ? t = -1 : i > n && (t = 1);
                        break
                    }
                }
                return t
            }, n.red = function(e) {
                return new f(e)
            }, n.prototype.toRed = function(e) {
                return r(!this.red, "Already a number in reduction context"), r(!this.sign, "red works only with positives"), e.convertTo(this)._forceRed(e)
            }, n.prototype.fromRed = function() {
                return r(this.red, "fromRed works only with numbers in reduction context"), this.red.convertFrom(this)
            }, n.prototype._forceRed = function(e) {
                return this.red = e, this
            }, n.prototype.forceRed = function(e) {
                return r(!this.red, "Already a number in reduction context"), this._forceRed(e)
            }, n.prototype.redAdd = function(e) {
                return r(this.red, "redAdd works only with red numbers"), this.red.add(this, e)
            }, n.prototype.redIAdd = function(e) {
                return r(this.red, "redIAdd works only with red numbers"), this.red.iadd(this, e)
            }, n.prototype.redSub = function(e) {
                return r(this.red, "redSub works only with red numbers"), this.red.sub(this, e)
            }, n.prototype.redISub = function(e) {
                return r(this.red, "redISub works only with red numbers"), this.red.isub(this, e)
            }, n.prototype.redShl = function(e) {
                return r(this.red, "redShl works only with red numbers"), this.red.shl(this, e)
            }, n.prototype.redMul = function(e) {
                return r(this.red, "redMul works only with red numbers"), this.red._verify2(this, e), this.red.mul(this, e)
            }, n.prototype.redIMul = function(e) {
                return r(this.red, "redMul works only with red numbers"), this.red._verify2(this, e), this.red.imul(this, e)
            }, n.prototype.redSqr = function() {
                return r(this.red, "redSqr works only with red numbers"), this.red._verify1(this), this.red.sqr(this)
            }, n.prototype.redISqr = function() {
                return r(this.red, "redISqr works only with red numbers"), this.red._verify1(this), this.red.isqr(this)
            }, n.prototype.redSqrt = function() {
                return r(this.red, "redSqrt works only with red numbers"), this.red._verify1(this), this.red.sqrt(this)
            }, n.prototype.redInvm = function() {
                return r(this.red, "redInvm works only with red numbers"), this.red._verify1(this), this.red.invm(this)
            }, n.prototype.redNeg = function() {
                return r(this.red, "redNeg works only with red numbers"), this.red._verify1(this), this.red.neg(this)
            }, n.prototype.redPow = function(e) {
                return r(this.red && !e.red, "redPow(normalNum)"), this.red._verify1(this), this.red.pow(this, e)
            };
            var g = {
                k256: null,
                p224: null,
                p192: null,
                p25519: null
            };
            s.prototype._tmp = function() {
                var e = new n(null);
                return e.words = new Array(Math.ceil(this.n / 13)), e
            }, s.prototype.ireduce = function(e) {
                var t, r = e;
                do this.split(r, this.tmp), r = this.imulK(r), r = r.iadd(this.tmp), t = r.bitLength(); while (t > this.n);
                var i = t < this.n ? -1 : r.ucmp(this.p);
                return 0 === i ? (r.words[0] = 0, r.length = 1) : i > 0 ? r.isub(this.p) : r.strip(), r
            }, s.prototype.split = function(e, t) {
                e.ishrn(this.n, 0, t)
            }, s.prototype.imulK = function(e) {
                return e.imul(this.k)
            }, i(h, s), h.prototype.split = function(e, t) {
                for (var r = 4194303, i = Math.min(e.length, 9), n = 0; i > n; n++) t.words[n] = e.words[n];
                if (t.length = i, e.length <= 9) return e.words[0] = 0, void(e.length = 1);
                var o = e.words[9];
                t.words[t.length++] = o & r;
                for (var n = 10; n < e.length; n++) {
                    var a = e.words[n];
                    e.words[n - 10] = (a & r) << 4 | o >>> 22, o = a
                }
                e.words[n - 10] = o >>> 22, e.length -= 9
            }, h.prototype.imulK = function(e) {
                e.words[e.length] = 0, e.words[e.length + 1] = 0, e.length += 2;
                for (var t, r = 0, i = 0; i < e.length; i++) {
                    var n = e.words[i];
                    t = 64 * n, r += 977 * n, t += r / 67108864 | 0, r &= 67108863, e.words[i] = r, r = t
                }
                return 0 === e.words[e.length - 1] && (e.length--, 0 === e.words[e.length - 1] && e.length--), e
            }, i(l, s), i(u, s), i(c, s), c.prototype.imulK = function(e) {
                for (var t = 0, r = 0; r < e.length; r++) {
                    var i = 19 * e.words[r] + t,
                        n = 67108863 & i;
                    i >>>= 26, e.words[r] = n, t = i
                }
                return 0 !== t && (e.words[e.length++] = t), e
            }, n._prime = function y(e) {
                if (g[e]) return g[e];
                var y;
                if ("k256" === e) y = new h;
                else if ("p224" === e) y = new l;
                else if ("p192" === e) y = new u;
                else {
                    if ("p25519" !== e) throw new Error("Unknown prime " + e);
                    y = new c
                }
                return g[e] = y, y
            }, f.prototype._verify1 = function(e) {
                r(!e.sign, "red works only with positives"), r(e.red, "red works only with red numbers")
            }, f.prototype._verify2 = function(e, t) {
                r(!e.sign && !t.sign, "red works only with positives"), r(e.red && e.red === t.red, "red works only with red numbers")
            }, f.prototype.imod = function(e) {
                return this.prime ? this.prime.ireduce(e)._forceRed(this) : e.mod(this.m)._forceRed(this)
            }, f.prototype.neg = function(e) {
                var t = e.clone();
                return t.sign = !t.sign, t.iadd(this.m)._forceRed(this)
            }, f.prototype.add = function(e, t) {
                this._verify2(e, t);
                var r = e.add(t);
                return r.cmp(this.m) >= 0 && r.isub(this.m), r._forceRed(this)
            }, f.prototype.iadd = function(e, t) {
                this._verify2(e, t);
                var r = e.iadd(t);
                return r.cmp(this.m) >= 0 && r.isub(this.m), r
            }, f.prototype.sub = function(e, t) {
                this._verify2(e, t);
                var r = e.sub(t);
                return r.cmpn(0) < 0 && r.iadd(this.m), r._forceRed(this)
            }, f.prototype.isub = function(e, t) {
                this._verify2(e, t);
                var r = e.isub(t);
                return r.cmpn(0) < 0 && r.iadd(this.m), r
            }, f.prototype.shl = function(e, t) {
                return this._verify1(e), this.imod(e.shln(t))
            }, f.prototype.imul = function(e, t) {
                return this._verify2(e, t), this.imod(e.imul(t))
            }, f.prototype.mul = function(e, t) {
                return this._verify2(e, t), this.imod(e.mul(t))
            }, f.prototype.isqr = function(e) {
                return this.imul(e, e)
            }, f.prototype.sqr = function(e) {
                return this.mul(e, e)
            }, f.prototype.sqrt = function(e) {
                if (0 === e.cmpn(0)) return e.clone();
                var t = this.m.andln(3);
                if (r(t % 2 === 1), 3 === t) {
                    var i = this.m.add(new n(1)).ishrn(2),
                        o = this.pow(e, i);
                    return o
                }
                for (var a = this.m.subn(1), s = 0; 0 !== a.cmpn(0) && 0 === a.andln(1);) s++, a.ishrn(1);
                r(0 !== a.cmpn(0));
                var h = new n(1).toRed(this),
                    l = h.redNeg(),
                    u = this.m.subn(1).ishrn(1),
                    c = this.m.bitLength();
                for (c = new n(2 * c * c).toRed(this); 0 !== this.pow(c, u).cmp(l);) c.redIAdd(l);
                for (var f = this.pow(c, a), o = this.pow(e, a.addn(1).ishrn(1)), p = this.pow(e, a), d = s; 0 !== p.cmp(h);) {
                    for (var m = p, v = 0; 0 !== m.cmp(h); v++) m = m.redSqr();
                    r(d > v);
                    var g = this.pow(f, new n(1).ishln(d - v - 1));
                    o = o.redMul(g), f = g.redSqr(), p = p.redMul(f), d = v
                }
                return o
            }, f.prototype.invm = function(e) {
                var t = e._invmp(this.m);
                return t.sign ? (t.sign = !1, this.imod(t).redNeg()) : this.imod(t)
            }, f.prototype.pow = function(e, t) {
                var r = [];
                if (0 === t.cmpn(0)) return new n(1);
                for (var i = t.clone(); 0 !== i.cmpn(0);) r.push(i.andln(1)), i.ishrn(1);
                for (var o = e, a = 0; a < r.length && 0 === r[a]; a++, o = this.sqr(o));
                if (++a < r.length)
                    for (var i = this.sqr(o); a < r.length; a++, i = this.sqr(i)) 0 !== r[a] && (o = this.mul(o, i));
                return o
            }, f.prototype.convertTo = function(e) {
                var t = e.mod(this.m);
                return t === e ? t.clone() : t
            }, f.prototype.convertFrom = function(e) {
                var t = e.clone();
                return t.red = null, t
            }, n.mont = function(e) {
                return new p(e)
            }, i(p, f), p.prototype.convertTo = function(e) {
                return this.imod(e.shln(this.shift))
            }, p.prototype.convertFrom = function(e) {
                var t = this.imod(e.mul(this.rinv));
                return t.red = null, t
            }, p.prototype.imul = function(e, t) {
                if (0 === e.cmpn(0) || 0 === t.cmpn(0)) return e.words[0] = 0, e.length = 1, e;
                var r = e.imul(t),
                    i = r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),
                    n = r.isub(i).ishrn(this.shift),
                    o = n;
                return n.cmp(this.m) >= 0 ? o = n.isub(this.m) : n.cmpn(0) < 0 && (o = n.iadd(this.m)), o._forceRed(this)
            }, p.prototype.mul = function(e, t) {
                if (0 === e.cmpn(0) || 0 === t.cmpn(0)) return new n(0)._forceRed(this);
                var r = e.mul(t),
                    i = r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),
                    o = r.isub(i).ishrn(this.shift),
                    a = o;
                return o.cmp(this.m) >= 0 ? a = o.isub(this.m) : o.cmpn(0) < 0 && (a = o.iadd(this.m)), a._forceRed(this)
            }, p.prototype.invm = function(e) {
                var t = this.imod(e._invmp(this.m).mul(this.r2));
                return t._forceRed(this)
            }
        }("undefined" == typeof t || t, this)
    }, {}],
    54: [function(e, t, r) {
        (function(e) {
            function r(e, t) {
                return p[0] = e, p[1] = t, f[0]
            }

            function i(e) {
                return f[0] = e, p[0]
            }

            function n(e) {
                return f[0] = e, p[1]
            }

            function o(e, t) {
                return p[1] = e, p[0] = t, f[0]
            }

            function a(e) {
                return f[0] = e, p[1]
            }

            function s(e) {
                return f[0] = e, p[0]
            }

            function h(e, t) {
                return d.writeUInt32LE(e, 0, !0), d.writeUInt32LE(t, 4, !0), d.readDoubleLE(0, !0)
            }

            function l(e) {
                return d.writeDoubleLE(e, 0, !0), d.readUInt32LE(0, !0)
            }

            function u(e) {
                return d.writeDoubleLE(e, 0, !0), d.readUInt32LE(4, !0)
            }
            var c = !1;
            if ("undefined" != typeof Float64Array) {
                var f = new Float64Array(1),
                    p = new Uint32Array(f.buffer);
                f[0] = 1, c = !0, 1072693248 === p[1] ? (t.exports = function(e) {
                    return f[0] = e, [p[0], p[1]]
                }, t.exports.pack = r, t.exports.lo = i, t.exports.hi = n) : 1072693248 === p[0] ? (t.exports = function(e) {
                    return f[0] = e, [p[1], p[0]]
                }, t.exports.pack = o, t.exports.lo = a, t.exports.hi = s) : c = !1
            }
            if (!c) {
                var d = new e(8);
                t.exports = function(e) {
                    return d.writeDoubleLE(e, 0, !0), [d.readUInt32LE(0, !0), d.readUInt32LE(4, !0)]
                }, t.exports.pack = h, t.exports.lo = l, t.exports.hi = u
            }
            t.exports.sign = function(e) {
                return t.exports.hi(e) >>> 31
            }, t.exports.exponent = function(e) {
                var r = t.exports.hi(e);
                return (r << 1 >>> 21) - 1023
            }, t.exports.fraction = function(e) {
                var r = t.exports.lo(e),
                    i = t.exports.hi(e),
                    n = 1048575 & i;
                return 2146435072 & i && (n += 1 << 20), [r, n]
            }, t.exports.denormalized = function(e) {
                var r = t.exports.hi(e);
                return !(2146435072 & r)
            }
        }).call(this, e("buffer").Buffer)
    }, {
        buffer: 5
    }],
    55: [function(e, t, r) {
        "use strict";

        function i(e) {
            return n(e[0]) * n(e[1])
        }
        var n = e("./lib/bn-sign");
        t.exports = i
    }, {
        "./lib/bn-sign": 44
    }],
    56: [function(e, t, r) {
        "use strict";

        function i(e, t) {
            return n(e[0].mul(t[1]).sub(e[1].mul(t[0])), e[1].mul(t[1]))
        }
        var n = e("./lib/rationalize");
        t.exports = i
    }, {
        "./lib/rationalize": 49
    }],
    57: [function(e, t, r) {
        "use strict";

        function i(e) {
            var t = e[0],
                r = e[1];
            if (0 === t.cmpn(0)) return 0;
            var i = t.divmod(r),
                a = i.div,
                s = n(a),
                h = i.mod;
            if (0 === h.cmpn(0)) return s;
            if (s) {
                var l = o(s) + 4,
                    u = n(h.shln(l).divRound(r));
                return 0 > s && (u = -u), s + u * Math.pow(2, -l)
            }
            var c = r.bitLength() - h.bitLength() + 53,
                u = n(h.shln(c).divRound(r));
            return 1023 > c ? u * Math.pow(2, -c) : (u *= Math.pow(2, -1023), u * Math.pow(2, 1023 - c))
        }
        var n = e("./lib/bn-to-num"),
            o = e("./lib/ctz");
        t.exports = i
    }, {
        "./lib/bn-to-num": 45,
        "./lib/ctz": 46
    }],
    58: [function(e, t, r) {
        "use strict";

        function i(e, t) {
            for (var r = 0; e > r; ++r)
                if (!(t[r] <= t[r + e])) return !0;
            return !1
        }

        function n(e, t, r, n) {
            for (var o = 0, a = 0, s = 0, h = e.length; h > s; ++s) {
                var l = e[s];
                if (!i(t, l)) {
                    for (var u = 0; 2 * t > u; ++u) r[o++] = l[u];
                    n[a++] = s
                }
            }
            return a
        }

        function o(e, t, r, i) {
            var o = e.length,
                a = t.length;
            if (!(0 >= o || 0 >= a)) {
                var s = e[0].length >>> 1;
                if (!(0 >= s)) {
                    var h, l = c.mallocDouble(2 * s * o),
                        u = c.mallocInt32(o);
                    if (o = n(e, s, l, u), o > 0) {
                        if (1 === s && i) f.init(o), h = f.sweepComplete(s, r, 0, o, l, u, 0, o, l, u);
                        else {
                            var d = c.mallocDouble(2 * s * a),
                                m = c.mallocInt32(a);
                            a = n(t, s, d, m), a > 0 && (f.init(o + a), h = 1 === s ? f.sweepBipartite(s, r, 0, o, l, u, 0, a, d, m) : p(s, r, i, o, l, u, a, d, m), c.free(d), c.free(m))
                        }
                        c.free(l), c.free(u)
                    }
                    return h
                }
            }
        }

        function a(e, t) {
            u.push([e, t])
        }

        function s(e) {
            return u = [], o(e, e, a, !0), u
        }

        function h(e, t) {
            return u = [], o(e, t, a, !1), u
        }

        function l(e, t, r) {
            switch (arguments.length) {
                case 1:
                    return s(e);
                case 2:
                    return "function" == typeof t ? o(e, e, t, !0) : h(e, t);
                case 3:
                    return o(e, t, r, !1);
                default:
                    throw new Error("box-intersect: Invalid arguments")
            }
        }
        t.exports = l;
        var u, c = e("typedarray-pool"),
            f = e("./lib/sweep"),
            p = e("./lib/intersect")
    }, {
        "./lib/intersect": 60,
        "./lib/sweep": 64,
        "typedarray-pool": 67
    }],
    59: [function(e, t, r) {
        "use strict";

        function i(e, t, r) {
            var i = "bruteForce" + (e ? "Red" : "Blue") + (t ? "Flip" : "") + (r ? "Full" : ""),
                n = ["function ", i, "(", _.join(), "){", "var ", l, "=2*", o, ";"],
                h = "for(var i=" + u + "," + d + "=" + l + "*" + u + ";i<" + c + ";++i," + d + "+=" + l + "){var x0=" + f + "[" + a + "+" + d + "],x1=" + f + "[" + a + "+" + d + "+" + o + "],xi=" + p + "[i];",
                M = "for(var j=" + m + "," + x + "=" + l + "*" + m + ";j<" + v + ";++j," + x + "+=" + l + "){var y0=" + g + "[" + a + "+" + x + "]," + (r ? "y1=" + g + "[" + a + "+" + x + "+" + o + "]," : "") + "yi=" + y + "[j];";
            return e ? n.push(h, b, ":", M) : n.push(M, b, ":", h), r ? n.push("if(y1<x0||x1<y0)continue;") : t ? n.push("if(y0<=x0||x1<y0)continue;") : n.push("if(y0<x0||x1<y0)continue;"), n.push("for(var k=" + a + "+1;k<" + o + ";++k){var r0=" + f + "[k+" + d + "],r1=" + f + "[k+" + o + "+" + d + "],b0=" + g + "[k+" + x + "],b1=" + g + "[k+" + o + "+" + x + "];if(r1<b0||b1<r0)continue " + b + ";}var " + w + "=" + s + "("), t ? n.push("yi,xi") : n.push("xi,yi"), n.push(");if(" + w + "!==void 0)return " + w + ";}}}"), {
                name: i,
                code: n.join("")
            }
        }

        function n(e) {
            function t(t, r) {
                var o = i(t, r, e);
                n.push(o.code), a.push("return " + o.name + "(" + _.join() + ");")
            }
            var r = "bruteForce" + (e ? "Full" : "Partial"),
                n = [],
                o = _.slice();
            e || o.splice(3, 0, h);
            var a = ["function " + r + "(" + o.join() + "){"];
            a.push("if(" + c + "-" + u + ">" + v + "-" + m + "){"), e ? (t(!0, !1), a.push("}else{"), t(!1, !1)) : (a.push("if(" + h + "){"), t(!0, !0), a.push("}else{"), t(!0, !1), a.push("}}else{if(" + h + "){"), t(!1, !0), a.push("}else{"), t(!1, !1), a.push("}")), a.push("}}return " + r);
            var s = n.join("") + a.join(""),
                l = new Function(s);
            return l()
        }
        var o = "d",
            a = "ax",
            s = "vv",
            h = "fp",
            l = "es",
            u = "rs",
            c = "re",
            f = "rb",
            p = "ri",
            d = "rp",
            m = "bs",
            v = "be",
            g = "bb",
            y = "bi",
            x = "bp",
            w = "rv",
            b = "Q",
            _ = [o, a, s, u, c, f, p, m, v, g, y];
        r.partial = n(!1), r.full = n(!0)
    }, {}],
    60: [function(e, t, r) {
        "use strict";

        function i(e, t) {
            var r = 8 * l.log2(t + 1) * (e + 1) | 0,
                i = l.nextPow2(T * r);
            C.length < i && (h.free(C), C = h.mallocInt32(i));
            var n = l.nextPow2(A * r);
            n > L && (h.free(L), L = h.mallocDouble(n))
        }

        function n(e, t, r, i, n, o, a, s, h) {
            var l = T * e;
            C[l] = t, C[l + 1] = r, C[l + 2] = i, C[l + 3] = n, C[l + 4] = o, C[l + 5] = a;
            var u = A * e;
            L[u] = s, L[u + 1] = h
        }

        function o(e, t, r, i, n, o, a, s, h, l, u) {
            var c = 2 * e,
                f = h * c,
                p = l[f + t];
            e: for (var d = n, m = n * c; o > d; ++d, m += c) {
                var v = a[m + t],
                    g = a[m + t + e];
                if (!(v > p || p > g || i && p === v)) {
                    for (var y = s[d], x = t + 1; e > x; ++x) {
                        var v = a[m + x],
                            g = a[m + x + e],
                            w = l[f + x],
                            b = l[f + x + e];
                        if (w > g || v > b) continue e
                    }
                    var _;
                    if (_ = i ? r(u, y) : r(y, u), void 0 !== _) return _
                }
            }
        }

        function a(e, t, r, i, n, o, a, s, h, l) {
            var u = 2 * e,
                c = s * u,
                f = h[c + t];
            e: for (var p = i, d = i * u; n > p; ++p, d += u) {
                var m = a[p];
                if (m !== l) {
                    var v = o[d + t],
                        g = o[d + t + e];
                    if (!(v > f || f > g)) {
                        for (var y = t + 1; e > y; ++y) {
                            var v = o[d + y],
                                g = o[d + y + e],
                                x = h[c + y],
                                w = h[c + y + e];
                            if (x > g || v > w) continue e
                        }
                        var b = r(m, l);
                        if (void 0 !== b) return b
                    }
                }
            }
        }

        function s(e, t, r, s, h, l, u, m, E) {
            i(e, s + u);
            var P, R = 0,
                D = 2 * e;
            for (n(R++, 0, 0, s, 0, u, r ? 16 : 0, -(1 / 0), 1 / 0), r || n(R++, 0, 0, u, 0, s, 1, -(1 / 0), 1 / 0); R > 0;) {
                R -= 1;
                var F = R * T,
                    U = C[F],
                    B = C[F + 1],
                    k = C[F + 2],
                    z = C[F + 3],
                    V = C[F + 4],
                    O = C[F + 5],
                    N = R * A,
                    I = L[N],
                    G = L[N + 1],
                    H = 1 & O,
                    W = !!(16 & O),
                    j = h,
                    X = l,
                    q = m,
                    Y = E;
                if (H && (j = m, X = E, q = h, Y = l), !(2 & O && (k = b(e, U, B, k, j, X, G), B >= k) || 4 & O && (B = _(e, U, B, k, j, X, I), B >= k))) {
                    var K = k - B,
                        Z = V - z;
                    if (W) {
                        if (y > e * K * (K + Z)) {
                            if (P = p.scanComplete(e, U, t, B, k, j, X, z, V, q, Y), void 0 !== P) return P;
                            continue
                        }
                    } else {
                        if (e * Math.min(K, Z) < v) {
                            if (P = c(e, U, t, H, B, k, j, X, z, V, q, Y), void 0 !== P) return P;
                            continue
                        }
                        if (g > e * K * Z) {
                            if (P = p.scanBipartite(e, U, t, H, B, k, j, X, z, V, q, Y), void 0 !== P) return P;
                            continue
                        }
                    }
                    var Q = x(e, U, B, k, j, X, I, G);
                    if (Q > B)
                        if (v > e * (Q - B)) {
                            if (P = f(e, U + 1, t, B, Q, j, X, z, V, q, Y), void 0 !== P) return P
                        } else if (U === e - 2) {
                            if (P = H ? p.sweepBipartite(e, t, z, V, q, Y, B, Q, j, X) : p.sweepBipartite(e, t, B, Q, j, X, z, V, q, Y), void 0 !== P) return P
                        } else n(R++, U + 1, B, Q, z, V, H, -(1 / 0), 1 / 0), n(R++, U + 1, z, V, B, Q, 1 ^ H, -(1 / 0), 1 / 0);
                    if (k > Q) {
                        var J = d(e, U, z, V, q, Y),
                            $ = q[D * J + U],
                            ee = w(e, U, J, V, q, Y, $);
                        if (V > ee && n(R++, U, Q, k, ee, V, (4 | H) + (W ? 16 : 0), $, G), J > z && n(R++, U, Q, k, z, J, (2 | H) + (W ? 16 : 0), I, $), J + 1 === ee) {
                            if (P = W ? a(e, U, t, Q, k, j, X, J, q, Y[J]) : o(e, U, t, H, Q, k, j, X, J, q, Y[J]), void 0 !== P) return P
                        } else if (ee > J) {
                            var te;
                            if (W) {
                                if (te = M(e, U, Q, k, j, X, $), te > Q) {
                                    var re = w(e, U, Q, te, j, X, $);
                                    if (U === e - 2) {
                                        if (re > Q && (P = p.sweepComplete(e, t, Q, re, j, X, J, ee, q, Y), void 0 !== P)) return P;
                                        if (te > re && (P = p.sweepBipartite(e, t, re, te, j, X, J, ee, q, Y), void 0 !== P)) return P
                                    } else re > Q && n(R++, U + 1, Q, re, J, ee, 16, -(1 / 0), 1 / 0), te > re && (n(R++, U + 1, re, te, J, ee, 0, -(1 / 0), 1 / 0), n(R++, U + 1, J, ee, re, te, 1, -(1 / 0), 1 / 0))
                                }
                            } else te = H ? S(e, U, Q, k, j, X, $) : M(e, U, Q, k, j, X, $), te > Q && (U === e - 2 ? P = H ? p.sweepBipartite(e, t, J, ee, q, Y, Q, te, j, X) : p.sweepBipartite(e, t, Q, te, j, X, J, ee, q, Y) : (n(R++, U + 1, Q, te, J, ee, H, -(1 / 0), 1 / 0), n(R++, U + 1, J, ee, Q, te, 1 ^ H, -(1 / 0), 1 / 0)))
                        }
                    }
                }
            }
        }
        t.exports = s;
        var h = e("typedarray-pool"),
            l = e("bit-twiddle"),
            u = e("./brute"),
            c = u.partial,
            f = u.full,
            p = e("./sweep"),
            d = e("./median"),
            m = e("./partition"),
            v = 128,
            g = 1 << 22,
            y = 1 << 22,
            x = m("!(lo>=p0)&&!(p1>=hi)", ["p0", "p1"]),
            w = m("lo===p0", ["p0"]),
            b = m("lo<p0", ["p0"]),
            _ = m("hi<=p0", ["p0"]),
            M = m("lo<=p0&&p0<=hi", ["p0"]),
            S = m("lo<p0&&p0<=hi", ["p0"]),
            T = 6,
            A = 2,
            E = 1024,
            C = h.mallocInt32(E),
            L = h.mallocDouble(E);
    }, {
        "./brute": 59,
        "./median": 61,
        "./partition": 62,
        "./sweep": 64,
        "bit-twiddle": 65,
        "typedarray-pool": 67
    }],
    61: [function(e, t, r) {
        "use strict";

        function i(e, t, r, i, n, o) {
            for (var a = 2 * e, s = a * (r + 1) + t, h = r + 1; i > h; ++h, s += a)
                for (var l = n[s], u = h, c = a * (h - 1); u > r && n[c + t] > l; --u, c -= a) {
                    for (var f = c, p = c + a, d = 0; a > d; ++d, ++f, ++p) {
                        var m = n[f];
                        n[f] = n[p], n[p] = m
                    }
                    var v = o[u];
                    o[u] = o[u - 1], o[u - 1] = v
                }
        }

        function n(e, t, r, n, o, h) {
            if (r + 1 >= n) return r;
            for (var l = r, u = n, c = n + r >>> 1, f = 2 * e, p = c, d = o[f * c + t]; u > l;) {
                if (s > u - l) {
                    i(e, t, l, u, o, h), d = o[f * c + t];
                    break
                }
                var m = u - l,
                    v = Math.random() * m + l | 0,
                    g = o[f * v + t],
                    y = Math.random() * m + l | 0,
                    x = o[f * y + t],
                    w = Math.random() * m + l | 0,
                    b = o[f * w + t];
                x >= g ? b >= x ? (p = y, d = x) : g >= b ? (p = v, d = g) : (p = w, d = b) : x >= b ? (p = y, d = x) : b >= g ? (p = v, d = g) : (p = w, d = b);
                for (var _ = f * (u - 1), M = f * p, S = 0; f > S; ++S, ++_, ++M) {
                    var T = o[_];
                    o[_] = o[M], o[M] = T
                }
                var A = h[u - 1];
                h[u - 1] = h[p], h[p] = A, p = a(e, t, l, u - 1, o, h, d);
                for (var _ = f * (u - 1), M = f * p, S = 0; f > S; ++S, ++_, ++M) {
                    var T = o[_];
                    o[_] = o[M], o[M] = T
                }
                var A = h[u - 1];
                if (h[u - 1] = h[p], h[p] = A, p > c) {
                    for (u = p - 1; u > l && o[f * (u - 1) + t] === d;) u -= 1;
                    u += 1
                } else {
                    if (!(c > p)) break;
                    for (l = p + 1; u > l && o[f * l + t] === d;) l += 1
                }
            }
            return a(e, t, r, c, o, h, o[f * c + t])
        }
        t.exports = n;
        var o = e("./partition"),
            a = o("lo<p0", ["p0"]),
            s = 8
    }, {
        "./partition": 62
    }],
    62: [function(e, t, r) {
        "use strict";

        function i(e, t) {
            var r = "abcdef".split("").concat(t),
                i = [];
            return e.indexOf("lo") >= 0 && i.push("lo=e[k+n]"), e.indexOf("hi") >= 0 && i.push("hi=e[k+o]"), r.push(n.replace("_", i.join()).replace("$", e)), Function.apply(void 0, r)
        }
        t.exports = i;
        var n = "for(var j=2*a,k=j*c,l=k,m=c,n=b,o=a+b,p=c;d>p;++p,k+=j){var _;if($)if(m===p)m+=1,l+=j;else{for(var s=0;j>s;++s){var t=e[k+s];e[k+s]=e[l],e[l++]=t}var u=f[p];f[p]=f[m],f[m++]=u}}return m"
    }, {}],
    63: [function(e, t, r) {
        "use strict";

        function i(e, t) {
            4 * f >= t ? n(0, t - 1, e) : c(0, t - 1, e)
        }

        function n(e, t, r) {
            for (var i = 2 * (e + 1), n = e + 1; t >= n; ++n) {
                for (var o = r[i++], a = r[i++], s = n, h = i - 2; s-- > e;) {
                    var l = r[h - 2],
                        u = r[h - 1];
                    if (o > l) break;
                    if (l === o && a > u) break;
                    r[h] = l, r[h + 1] = u, h -= 2
                }
                r[h] = o, r[h + 1] = a
            }
        }

        function o(e, t, r) {
            e *= 2, t *= 2;
            var i = r[e],
                n = r[e + 1];
            r[e] = r[t], r[e + 1] = r[t + 1], r[t] = i, r[t + 1] = n
        }

        function a(e, t, r) {
            e *= 2, t *= 2, r[e] = r[t], r[e + 1] = r[t + 1]
        }

        function s(e, t, r, i) {
            e *= 2, t *= 2, r *= 2;
            var n = i[e],
                o = i[e + 1];
            i[e] = i[t], i[e + 1] = i[t + 1], i[t] = i[r], i[t + 1] = i[r + 1], i[r] = n, i[r + 1] = o
        }

        function h(e, t, r, i, n) {
            e *= 2, t *= 2, n[e] = n[t], n[t] = r, n[e + 1] = n[t + 1], n[t + 1] = i
        }

        function l(e, t, r) {
            e *= 2, t *= 2;
            var i = r[e],
                n = r[t];
            return n > i ? !1 : i === n ? r[e + 1] > r[t + 1] : !0
        }

        function u(e, t, r, i) {
            e *= 2;
            var n = i[e];
            return t > n ? !0 : n === t ? i[e + 1] < r : !1
        }

        function c(e, t, r) {
            var i = (t - e + 1) / 6 | 0,
                p = e + i,
                d = t - i,
                m = e + t >> 1,
                v = m - i,
                g = m + i,
                y = p,
                x = v,
                w = m,
                b = g,
                _ = d,
                M = e + 1,
                S = t - 1,
                T = 0;
            l(y, x, r) && (T = y, y = x, x = T), l(b, _, r) && (T = b, b = _, _ = T), l(y, w, r) && (T = y, y = w, w = T), l(x, w, r) && (T = x, x = w, w = T), l(y, b, r) && (T = y, y = b, b = T), l(w, b, r) && (T = w, w = b, b = T), l(x, _, r) && (T = x, x = _, _ = T), l(x, w, r) && (T = x, x = w, w = T), l(b, _, r) && (T = b, b = _, _ = T);
            for (var A = r[2 * x], E = r[2 * x + 1], C = r[2 * b], L = r[2 * b + 1], P = 2 * y, R = 2 * w, D = 2 * _, F = 2 * p, U = 2 * m, B = 2 * d, k = 0; 2 > k; ++k) {
                var z = r[P + k],
                    V = r[R + k],
                    O = r[D + k];
                r[F + k] = z, r[U + k] = V, r[B + k] = O
            }
            a(v, e, r), a(g, t, r);
            for (var N = M; S >= N; ++N)
                if (u(N, A, E, r)) N !== M && o(N, M, r), ++M;
                else if (!u(N, C, L, r))
                    for (;;) {
                        if (u(S, C, L, r)) {
                            u(S, A, E, r) ? (s(N, M, S, r), ++M, --S) : (o(N, S, r), --S);
                            break
                        }
                        if (--S < N) break
                    }
            h(e, M - 1, A, E, r), h(t, S + 1, C, L, r), f >= M - 2 - e ? n(e, M - 2, r) : c(e, M - 2, r), f >= t - (S + 2) ? n(S + 2, t, r) : c(S + 2, t, r), f >= S - M ? n(M, S, r) : c(M, S, r)
        }
        t.exports = i;
        var f = 32
    }, {}],
    64: [function(e, t, r) {
        "use strict";

        function i(e) {
            var t = c.nextPow2(e);
            m.length < t && (u.free(m), m = u.mallocInt32(t)), v.length < t && (u.free(v), v = u.mallocInt32(t)), g.length < t && (u.free(g), g = u.mallocInt32(t)), y.length < t && (u.free(y), y = u.mallocInt32(t)), x.length < t && (u.free(x), x = u.mallocInt32(t)), w.length < t && (u.free(w), w = u.mallocInt32(t));
            var r = 8 * t;
            b.length < r && (u.free(b), b = u.mallocDouble(r))
        }

        function n(e, t, r, i) {
            var n = t[i],
                o = e[r - 1];
            e[n] = o, t[o] = n
        }

        function o(e, t, r, i) {
            e[r] = i, t[i] = r
        }

        function a(e, t, r, i, a, s, h, l, u, c) {
            for (var d = 0, x = 2 * e, w = e - 1, _ = x - 1, M = r; i > M; ++M) {
                var S = s[M],
                    T = x * M;
                b[d++] = a[T + w], b[d++] = -(S + 1), b[d++] = a[T + _], b[d++] = S
            }
            for (var M = h; l > M; ++M) {
                var S = c[M] + p,
                    A = x * M;
                b[d++] = u[A + w], b[d++] = -S, b[d++] = u[A + _], b[d++] = S
            }
            var E = d >>> 1;
            f(b, E);
            for (var C = 0, L = 0, M = 0; E > M; ++M) {
                var P = 0 | b[2 * M + 1];
                if (P >= p) P = P - p | 0, n(g, y, L--, P);
                else if (P >= 0) n(m, v, C--, P);
                else if (-p >= P) {
                    P = -P - p | 0;
                    for (var R = 0; C > R; ++R) {
                        var D = t(m[R], P);
                        if (void 0 !== D) return D
                    }
                    o(g, y, L++, P)
                } else {
                    P = -P - 1 | 0;
                    for (var R = 0; L > R; ++R) {
                        var D = t(P, g[R]);
                        if (void 0 !== D) return D
                    }
                    o(m, v, C++, P)
                }
            }
        }

        function s(e, t, r, i, a, s, h, l, u, c) {
            for (var p = 0, d = 2 * e, _ = e - 1, M = d - 1, S = r; i > S; ++S) {
                var T = s[S] + 1 << 1,
                    A = d * S;
                b[p++] = a[A + _], b[p++] = -T, b[p++] = a[A + M], b[p++] = T
            }
            for (var S = h; l > S; ++S) {
                var T = c[S] + 1 << 1,
                    E = d * S;
                b[p++] = u[E + _], b[p++] = 1 | -T, b[p++] = u[E + M], b[p++] = 1 | T
            }
            var C = p >>> 1;
            f(b, C);
            for (var L = 0, P = 0, R = 0, S = 0; C > S; ++S) {
                var D = 0 | b[2 * S + 1],
                    F = 1 & D;
                if (C - 1 > S && D >> 1 === b[2 * S + 3] >> 1 && (F = 2, S += 1), 0 > D) {
                    for (var U = -(D >> 1) - 1, B = 0; R > B; ++B) {
                        var k = t(x[B], U);
                        if (void 0 !== k) return k
                    }
                    if (0 !== F)
                        for (var B = 0; L > B; ++B) {
                            var k = t(m[B], U);
                            if (void 0 !== k) return k
                        }
                    if (1 !== F)
                        for (var B = 0; P > B; ++B) {
                            var k = t(g[B], U);
                            if (void 0 !== k) return k
                        }
                    0 === F ? o(m, v, L++, U) : 1 === F ? o(g, y, P++, U) : 2 === F && o(x, w, R++, U)
                } else {
                    var U = (D >> 1) - 1;
                    0 === F ? n(m, v, L--, U) : 1 === F ? n(g, y, P--, U) : 2 === F && n(x, w, R--, U)
                }
            }
        }

        function h(e, t, r, i, a, s, h, l, u, c, d, g) {
            var y = 0,
                x = 2 * e,
                w = t,
                _ = t + e,
                M = 1,
                S = 1;
            i ? S = p : M = p;
            for (var T = a; s > T; ++T) {
                var A = T + M,
                    E = x * T;
                b[y++] = h[E + w], b[y++] = -A, b[y++] = h[E + _], b[y++] = A
            }
            for (var T = u; c > T; ++T) {
                var A = T + S,
                    C = x * T;
                b[y++] = d[C + w], b[y++] = -A
            }
            var L = y >>> 1;
            f(b, L);
            for (var P = 0, T = 0; L > T; ++T) {
                var R = 0 | b[2 * T + 1];
                if (0 > R) {
                    var A = -R,
                        D = !1;
                    if (A >= p ? (D = !i, A -= p) : (D = !!i, A -= 1), D) o(m, v, P++, A);
                    else {
                        var F = g[A],
                            U = x * A,
                            B = d[U + t + 1],
                            k = d[U + t + 1 + e];
                        e: for (var z = 0; P > z; ++z) {
                            var V = m[z],
                                O = x * V;
                            if (!(k < h[O + t + 1] || h[O + t + 1 + e] < B)) {
                                for (var N = t + 2; e > N; ++N)
                                    if (d[U + N + e] < h[O + N] || h[O + N + e] < d[U + N]) continue e;
                                var I, G = l[V];
                                if (I = i ? r(F, G) : r(G, F), void 0 !== I) return I
                            }
                        }
                    }
                } else n(m, v, P--, R - M)
            }
        }

        function l(e, t, r, i, n, o, a, s, h, l, u) {
            for (var c = 0, d = 2 * e, v = t, g = t + e, y = i; n > y; ++y) {
                var x = y + p,
                    w = d * y;
                b[c++] = o[w + v], b[c++] = -x, b[c++] = o[w + g], b[c++] = x
            }
            for (var y = s; h > y; ++y) {
                var x = y + 1,
                    _ = d * y;
                b[c++] = l[_ + v], b[c++] = -x
            }
            var M = c >>> 1;
            f(b, M);
            for (var S = 0, y = 0; M > y; ++y) {
                var T = 0 | b[2 * y + 1];
                if (0 > T) {
                    var x = -T;
                    if (x >= p) m[S++] = x - p;
                    else {
                        x -= 1;
                        var A = u[x],
                            E = d * x,
                            C = l[E + t + 1],
                            L = l[E + t + 1 + e];
                        e: for (var P = 0; S > P; ++P) {
                            var R = m[P],
                                D = a[R];
                            if (D === A) break;
                            var F = d * R;
                            if (!(L < o[F + t + 1] || o[F + t + 1 + e] < C)) {
                                for (var U = t + 2; e > U; ++U)
                                    if (l[E + U + e] < o[F + U] || o[F + U + e] < l[E + U]) continue e;
                                var B = r(D, A);
                                if (void 0 !== B) return B
                            }
                        }
                    }
                } else {
                    for (var x = T - p, P = S - 1; P >= 0; --P)
                        if (m[P] === x) {
                            for (var U = P + 1; S > U; ++U) m[U - 1] = m[U];
                            break
                        }--S
                }
            }
        }
        t.exports = {
            init: i,
            sweepBipartite: a,
            sweepComplete: s,
            scanBipartite: h,
            scanComplete: l
        };
        var u = e("typedarray-pool"),
            c = e("bit-twiddle"),
            f = e("./sort"),
            p = 1 << 28,
            d = 1024,
            m = u.mallocInt32(d),
            v = u.mallocInt32(d),
            g = u.mallocInt32(d),
            y = u.mallocInt32(d),
            x = u.mallocInt32(d),
            w = u.mallocInt32(d),
            b = u.mallocDouble(8 * d)
    }, {
        "./sort": 63,
        "bit-twiddle": 65,
        "typedarray-pool": 67
    }],
    65: [function(e, t, r) {
        arguments[4][52][0].apply(r, arguments)
    }, {
        dup: 52
    }],
    66: [function(e, t, r) {
        "use strict";

        function i(e, t, r) {
            var n = 0 | e[r];
            if (0 >= n) return [];
            var o, a = new Array(n);
            if (r === e.length - 1)
                for (o = 0; n > o; ++o) a[o] = t;
            else
                for (o = 0; n > o; ++o) a[o] = i(e, t, r + 1);
            return a
        }

        function n(e, t) {
            var r, i;
            for (r = new Array(e), i = 0; e > i; ++i) r[i] = t;
            return r
        }

        function o(e, t) {
            switch ("undefined" == typeof t && (t = 0), typeof e) {
                case "number":
                    if (e > 0) return n(0 | e, t);
                    break;
                case "object":
                    if ("number" == typeof e.length) return i(e, t, 0)
            }
            return []
        }
        t.exports = o
    }, {}],
    67: [function(e, t, r) {
        (function(t, i) {
            "use strict";

            function n(e) {
                if (e) {
                    var t = e.length || e.byteLength,
                        r = y.log2(t);
                    _[r].push(e)
                }
            }

            function o(e) {
                n(e.buffer)
            }

            function a(e) {
                var e = y.nextPow2(e),
                    t = y.log2(e),
                    r = _[t];
                return r.length > 0 ? r.pop() : new ArrayBuffer(e)
            }

            function s(e) {
                return new Uint8Array(a(e), 0, e)
            }

            function h(e) {
                return new Uint16Array(a(2 * e), 0, e)
            }

            function l(e) {
                return new Uint32Array(a(4 * e), 0, e)
            }

            function u(e) {
                return new Int8Array(a(e), 0, e)
            }

            function c(e) {
                return new Int16Array(a(2 * e), 0, e)
            }

            function f(e) {
                return new Int32Array(a(4 * e), 0, e)
            }

            function p(e) {
                return new Float32Array(a(4 * e), 0, e)
            }

            function d(e) {
                return new Float64Array(a(8 * e), 0, e)
            }

            function m(e) {
                return w ? new Uint8ClampedArray(a(e), 0, e) : s(e)
            }

            function v(e) {
                return new DataView(a(e), 0, e)
            }

            function g(e) {
                e = y.nextPow2(e);
                var t = y.log2(e),
                    r = M[t];
                return r.length > 0 ? r.pop() : new i(e)
            }
            var y = e("bit-twiddle"),
                x = e("dup");
            t.__TYPEDARRAY_POOL || (t.__TYPEDARRAY_POOL = {
                UINT8: x([32, 0]),
                UINT16: x([32, 0]),
                UINT32: x([32, 0]),
                INT8: x([32, 0]),
                INT16: x([32, 0]),
                INT32: x([32, 0]),
                FLOAT: x([32, 0]),
                DOUBLE: x([32, 0]),
                DATA: x([32, 0]),
                UINT8C: x([32, 0]),
                BUFFER: x([32, 0])
            });
            var w = "undefined" != typeof Uint8ClampedArray,
                b = t.__TYPEDARRAY_POOL;
            b.UINT8C || (b.UINT8C = x([32, 0])), b.BUFFER || (b.BUFFER = x([32, 0]));
            var _ = b.DATA,
                M = b.BUFFER;
            r.free = function(e) {
                if (i.isBuffer(e)) M[y.log2(e.length)].push(e);
                else {
                    if ("[object ArrayBuffer]" !== Object.prototype.toString.call(e) && (e = e.buffer), !e) return;
                    var t = e.length || e.byteLength,
                        r = 0 | y.log2(t);
                    _[r].push(e)
                }
            }, r.freeUint8 = r.freeUint16 = r.freeUint32 = r.freeInt8 = r.freeInt16 = r.freeInt32 = r.freeFloat32 = r.freeFloat = r.freeFloat64 = r.freeDouble = r.freeUint8Clamped = r.freeDataView = o, r.freeArrayBuffer = n, r.freeBuffer = function(e) {
                M[y.log2(e.length)].push(e)
            }, r.malloc = function(e, t) {
                if (void 0 === t || "arraybuffer" === t) return a(e);
                switch (t) {
                    case "uint8":
                        return s(e);
                    case "uint16":
                        return h(e);
                    case "uint32":
                        return l(e);
                    case "int8":
                        return u(e);
                    case "int16":
                        return c(e);
                    case "int32":
                        return f(e);
                    case "float":
                    case "float32":
                        return p(e);
                    case "double":
                    case "float64":
                        return d(e);
                    case "uint8_clamped":
                        return m(e);
                    case "buffer":
                        return g(e);
                    case "data":
                    case "dataview":
                        return v(e);
                    default:
                        return null
                }
                return null
            }, r.mallocArrayBuffer = a, r.mallocUint8 = s, r.mallocUint16 = h, r.mallocUint32 = l, r.mallocInt8 = u, r.mallocInt16 = c, r.mallocInt32 = f, r.mallocFloat32 = r.mallocFloat = p, r.mallocFloat64 = r.mallocDouble = d, r.mallocUint8Clamped = m, r.mallocDataView = v, r.mallocBuffer = g, r.clearCache = function() {
                for (var e = 0; 32 > e; ++e) b.UINT8[e].length = 0, b.UINT16[e].length = 0, b.UINT32[e].length = 0, b.INT8[e].length = 0, b.INT16[e].length = 0, b.INT32[e].length = 0, b.FLOAT[e].length = 0, b.DOUBLE[e].length = 0, b.UINT8C[e].length = 0, _[e].length = 0, M[e].length = 0
            }
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer)
    }, {
        "bit-twiddle": 65,
        buffer: 5,
        dup: 66
    }],
    68: [function(e, t, r) {
        function i(e, t) {
            return e - t
        }

        function n(e, t) {
            var r = e.length,
                n = e.length - t.length;
            if (n) return n;
            switch (r) {
                case 0:
                    return 0;
                case 1:
                    return e[0] - t[0];
                case 2:
                    return e[0] + e[1] - t[0] - t[1] || o(e[0], e[1]) - o(t[0], t[1]);
                case 3:
                    var a = e[0] + e[1],
                        s = t[0] + t[1];
                    if (n = a + e[2] - (s + t[2])) return n;
                    var h = o(e[0], e[1]),
                        l = o(t[0], t[1]);
                    return o(h, e[2]) - o(l, t[2]) || o(h + e[2], a) - o(l + t[2], s);
                case 4:
                    var u = e[0],
                        c = e[1],
                        f = e[2],
                        p = e[3],
                        d = t[0],
                        m = t[1],
                        v = t[2],
                        g = t[3];
                    return u + c + f + p - (d + m + v + g) || o(u, c, f, p) - o(d, m, v, g, d) || o(u + c, u + f, u + p, c + f, c + p, f + p) - o(d + m, d + v, d + g, m + v, m + g, v + g) || o(u + c + f, u + c + p, u + f + p, c + f + p) - o(d + m + v, d + m + g, d + v + g, m + v + g);
                default:
                    for (var y = e.slice().sort(i), x = t.slice().sort(i), w = 0; r > w; ++w)
                        if (n = y[w] - x[w]) return n;
                    return 0
            }
        }
        t.exports = n;
        var o = Math.min
    }, {}],
    69: [function(e, t, r) {
        "use strict";

        function i(e, t) {
            if (isNaN(e) || isNaN(t)) return NaN;
            if (e === t) return e;
            if (0 === e) return 0 > t ? -o : o;
            var r = n.hi(e),
                i = n.lo(e);
            return t > e == e > 0 ? i === a ? (r += 1, i = 0) : i += 1 : 0 === i ? (i = a, r -= 1) : i -= 1, n.pack(i, r)
        }
        var n = e("double-bits"),
            o = Math.pow(2, -1074),
            a = -1 >>> 0;
        t.exports = i
    }, {
        "double-bits": 70
    }],
    70: [function(e, t, r) {
        arguments[4][54][0].apply(r, arguments)
    }, {
        buffer: 5,
        dup: 54
    }],
    71: [function(e, t, r) {
        "use strict";

        function i(e, t) {
            for (var r = e.length, i = new Array(r), o = 0; r > o; ++o) i[o] = n(e[o], t[o]);
            return i
        }
        var n = e("big-rat/add");
        t.exports = i
    }, {
        "big-rat/add": 39
    }],
    72: [function(e, t, r) {
        "use strict";

        function i(e) {
            for (var t = new Array(e.length), r = 0; r < e.length; ++r) t[r] = n(e[r]);
            return t
        }
        t.exports = i;
        var n = e("big-rat")
    }, {
        "big-rat": 42
    }],
    73: [function(e, t, r) {
        "use strict";

        function i(e, t) {
            for (var r = n(t), i = e.length, a = new Array(i), s = 0; i > s; ++s) a[s] = o(e[s], r);
            return a
        }
        var n = e("big-rat"),
            o = e("big-rat/mul");
        t.exports = i
    }, {
        "big-rat": 42,
        "big-rat/mul": 51
    }],
    74: [function(e, t, r) {
        "use strict";

        function i(e, t) {
            for (var r = e.length, i = new Array(r), o = 0; r > o; ++o) i[o] = n(e[o], t[o]);
            return i
        }
        var n = e("big-rat/sub");
        t.exports = i
    }, {
        "big-rat/sub": 56
    }],
    75: [function(e, t, r) {
        arguments[4][26][0].apply(r, arguments)
    }, {
        dup: 26
    }],
    76: [function(e, t, r) {
        arguments[4][27][0].apply(r, arguments)
    }, {
        dup: 27,
        "two-product": 79,
        "two-sum": 75
    }],
    77: [function(e, t, r) {
        arguments[4][28][0].apply(r, arguments)
    }, {
        dup: 28
    }],
    78: [function(e, t, r) {
        arguments[4][29][0].apply(r, arguments)
    }, {
        dup: 29
    }],
    79: [function(e, t, r) {
        arguments[4][30][0].apply(r, arguments)
    }, {
        dup: 30
    }],
    80: [function(e, t, r) {
        arguments[4][36][0].apply(r, arguments)
    }, {
        dup: 36,
        "robust-scale": 76,
        "robust-subtract": 77,
        "robust-sum": 78,
        "two-product": 79
    }],
    81: [function(e, t, r) {
        "use strict";

        function i(e, t, r, i) {
            for (var n = 0; 2 > n; ++n) {
                var o = e[n],
                    a = t[n],
                    s = Math.min(o, a),
                    h = Math.max(o, a),
                    l = r[n],
                    u = i[n],
                    c = Math.min(l, u),
                    f = Math.max(l, u);
                if (s > f || c > h) return !1
            }
            return !0
        }

        function n(e, t, r, n) {
            var a = o(e, r, n),
                s = o(t, r, n);
            if (a > 0 && s > 0 || 0 > a && 0 > s) return !1;
            var h = o(r, e, t),
                l = o(n, e, t);
            return h > 0 && l > 0 || 0 > h && 0 > l ? !1 : 0 === a && 0 === s && 0 === h && 0 === l ? i(e, t, r, n) : !0
        }
        t.exports = n;
        var o = e("robust-orientation")[3]
    }, {
        "robust-orientation": 80
    }],
    82: [function(e, t, r) {
        "use strict";
        "use restrict";

        function i(e) {
            this.roots = new Array(e), this.ranks = new Array(e);
            for (var t = 0; e > t; ++t) this.roots[t] = t, this.ranks[t] = 0
        }
        t.exports = i;
        var n = i.prototype;
        Object.defineProperty(n, "length", {
            get: function() {
                return this.roots.length
            }
        }), n.makeSet = function() {
            var e = this.roots.length;
            return this.roots.push(e), this.ranks.push(0), e
        }, n.find = function(e) {
            for (var t = e, r = this.roots; r[e] !== e;) e = r[e];
            for (; r[t] !== e;) {
                var i = r[t];
                r[t] = e, t = i
            }
            return e
        }, n.link = function(e, t) {
            var r = this.find(e),
                i = this.find(t);
            if (r !== i) {
                var n = this.ranks,
                    o = this.roots,
                    a = n[r],
                    s = n[i];
                s > a ? o[r] = i : a > s ? o[i] = r : (o[i] = r, ++n[r])
            }
        }
    }, {}],
    83: [function(e, t, r) {
        function i(e) {
            if ("string" == typeof e && (e = n(e)), !e || "function" != typeof e.getElementsByTagName) throw new Error("could not get an XML document from the specified SVG contents");
            var t = Array.prototype.slice.call(e.getElementsByTagName("path"));
            return t.reduce(function(e, t) {
                var r = t.getAttribute("d") || "";
                return e + " " + r.replace(/\s+/g, " ").trim()
            }, "").trim()
        }
        var n = e("xml-parse-from-string");
        t.exports = function() {
            throw new Error("use extract-svg-path/transform to inline SVG contents into your bundle")
        }, t.exports.parse = i, t.exports.fromString = i
    }, {
        "xml-parse-from-string": 84
    }],
    84: [function(e, t, r) {
        t.exports = function() {
            return "undefined" != typeof window.DOMParser ? function(e) {
                var t = new window.DOMParser;
                return t.parseFromString(e, "application/xml")
            } : "undefined" != typeof window.ActiveXObject && new window.ActiveXObject("Microsoft.XMLDOM") ? function(e) {
                var t = new window.ActiveXObject("Microsoft.XMLDOM");
                return t.async = "false", t.loadXML(e), t
            } : function(e) {
                var t = document.createElement("div");
                return t.innerHTML = e, t
            }
        }()
    }, {}],
    85: [function(e, t, r) {
        function i(e, t) {
            t = t || 1;
            var r = 2 * Math.random() * Math.PI,
                i = 2 * Math.random() - 1,
                n = Math.sqrt(1 - i * i) * t;
            return e[0] = Math.cos(r) * n, e[1] = Math.sin(r) * n, e[2] = i * t, e
        }
        t.exports = i
    }, {}],
    86: [function(e, t, r) {
        var i = e("xhr");
        t.exports = function(e, t) {
            "string" == typeof e && (e = {
                uri: e
            }), i(e, function(e, r, i) {
                if (e) return t(e);
                if (!/^2/.test(r.statusCode)) return t(new Error("http status code: " + r.statusCode));
                var n = document.createElement("div");
                n.innerHTML = i;
                var o = n.querySelector("svg");
                return o ? void t(null, o) : t(new Error("svg not present in resource"))
            })
        }
    }, {
        xhr: 87
    }],
    87: [function(e, t, r) {
        function i(e, t) {
            function r() {
                4 === m.readyState && M()
            }

            function i() {
                var e = null;
                if (m.response ? e = m.response : "text" !== m.responseType && m.responseType || (e = m.responseText || m.responseXML), _) try {
                    e = JSON.parse(e)
                } catch (t) {}
                return e
            }

            function o() {
                return 1223 === m.status ? 204 : m.status
            }

            function c(e, t) {
                var r = null;
                if (0 === e || e >= 400 && 600 > e) {
                    var i = ("string" == typeof t ? t : !1) || h[String(e).charAt(0)];
                    r = new Error(i), r.statusCode = e
                }
                return r
            }

            function f() {
                var e = o(),
                    r = i(),
                    n = c(e, r),
                    a = {
                        body: r,
                        statusCode: e,
                        statusText: m.statusText,
                        raw: m
                    };
                m.getAllResponseHeaders ? a.headers = s(m.getAllResponseHeaders()) : a.headers = {}, t(n, a, a.body)
            }

            function p() {
                var e = o(),
                    r = c(e);
                m.status = m.statusCode = e, m.body = i(), m.headers = s(m.getAllResponseHeaders()), t(r, m, m.body)
            }

            function d(e) {
                t(e, m)
            }
            "string" == typeof e && (e = {
                uri: e
            }), e = e || {}, t = a(t);
            var m = e.xhr || null;
            m || (m = e.cors || e.useXDR ? new u : new l);
            var v, g = m.url = e.uri || e.url,
                y = m.method = e.method || "GET",
                x = e.body || e.data,
                w = m.headers = e.headers || {},
                b = !!e.sync,
                _ = !1,
                M = e.response ? f : p;
            if ("json" in e && (_ = !0, w.Accept = "application/json", "GET" !== y && "HEAD" !== y && (w["Content-Type"] = "application/json", x = JSON.stringify(e.json))), m.onreadystatechange = r, m.onload = M, m.onerror = d, m.onprogress = function() {}, m.ontimeout = n, m.open(y, g, !b), (e.withCredentials || e.cors && e.withCredentials !== !1) && (m.withCredentials = !0), b || (m.timeout = "timeout" in e ? e.timeout : 5e3), m.setRequestHeader)
                for (v in w) w.hasOwnProperty(v) && m.setRequestHeader(v, w[v]);
            else if (e.headers) throw new Error("Headers cannot be set on an XDomainRequest object");
            return "responseType" in e && (m.responseType = e.responseType), "beforeSend" in e && "function" == typeof e.beforeSend && e.beforeSend(m), m.send(x), m
        }

        function n() {}
        var o = e("global/window"),
            a = e("once"),
            s = e("parse-headers"),
            h = {
                0: "Internal XMLHttpRequest Error",
                4: "4xx Client Error",
                5: "5xx Server Error"
            },
            l = o.XMLHttpRequest || n,
            u = "withCredentials" in new l ? l : o.XDomainRequest;
        t.exports = i
    }, {
        "global/window": 88,
        once: 89,
        "parse-headers": 93
    }],
    88: [function(e, t, r) {
        (function(e) {
            "undefined" != typeof window ? t.exports = window : "undefined" != typeof e ? t.exports = e : "undefined" != typeof self ? t.exports = self : t.exports = {}
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {}],
    89: [function(e, t, r) {
        function i(e) {
            var t = !1;
            return function() {
                return t ? void 0 : (t = !0, e.apply(this, arguments))
            }
        }
        t.exports = i, i.proto = i(function() {
            Object.defineProperty(Function.prototype, "once", {
                value: function() {
                    return i(this)
                },
                configurable: !0
            })
        })
    }, {}],
    90: [function(e, t, r) {
        function i(e, t, r) {
            if (!s(t)) throw new TypeError("iterator must be a function");
            arguments.length < 3 && (r = this), "[object Array]" === h.call(e) ? n(e, t, r) : "string" == typeof e ? o(e, t, r) : a(e, t, r)
        }

        function n(e, t, r) {
            for (var i = 0, n = e.length; n > i; i++) l.call(e, i) && t.call(r, e[i], i, e)
        }

        function o(e, t, r) {
            for (var i = 0, n = e.length; n > i; i++) t.call(r, e.charAt(i), i, e)
        }

        function a(e, t, r) {
            for (var i in e) l.call(e, i) && t.call(r, e[i], i, e)
        }
        var s = e("is-function");
        t.exports = i;
        var h = Object.prototype.toString,
            l = Object.prototype.hasOwnProperty
    }, {
        "is-function": 91
    }],
    91: [function(e, t, r) {
        function i(e) {
            var t = n.call(e);
            return "[object Function]" === t || "function" == typeof e && "[object RegExp]" !== t || "undefined" != typeof window && (e === window.setTimeout || e === window.alert || e === window.confirm || e === window.prompt)
        }
        t.exports = i;
        var n = Object.prototype.toString
    }, {}],
    92: [function(e, t, r) {
        function i(e) {
            return e.replace(/^\s*|\s*$/g, "")
        }
        r = t.exports = i, r.left = function(e) {
            return e.replace(/^\s*/, "")
        }, r.right = function(e) {
            return e.replace(/\s*$/, "")
        }
    }, {}],
    93: [function(e, t, r) {
        var i = e("trim"),
            n = e("for-each"),
            o = function(e) {
                return "[object Array]" === Object.prototype.toString.call(e)
            };
        t.exports = function(e) {
            if (!e) return {};
            var t = {};
            return n(i(e).split("\n"), function(e) {
                var r = e.indexOf(":"),
                    n = i(e.slice(0, r)).toLowerCase(),
                    a = i(e.slice(r + 1));
                "undefined" == typeof t[n] ? t[n] = a : o(t[n]) ? t[n].push(a) : t[n] = [t[n], a]
            }), t
        }
    }, {
        "for-each": 90,
        trim: 92
    }],
    94: [function(e, t, r) {
        function i(e) {
            for (var t = [], r = [], i = 0, n = 0; i < e.length;) r.push([n++, n++, n++]), t.push([e[i++], e[i++], e[i++]], [e[i++], e[i++], e[i++]], [e[i++], e[i++], e[i++]]);
            return {
                positions: t,
                cells: r
            }
        }
        t.exports = i
    }, {}],
    95: [function(e, t, r) {
        function i(e, t) {
            if (!Array.isArray(e)) throw new TypeError("must specify positions as first argument");
            Array.isArray(t) || (t = n(e));
            var r = t[0],
                i = t[1],
                a = i[0] - r[0],
                s = i[1] - r[1],
                h = a > s ? 1 : s / a,
                l = a > s ? a / s : 1;
            if (i[0] - r[0] === 0 || i[1] - r[1] === 0) return e;
            for (var u = 0; u < e.length; u++) {
                var c = e[u];
                c[0] = (2 * o(r[0], i[0], c[0]) - 1) / h, c[1] = (2 * o(r[1], i[1], c[1]) - 1) / l
            }
            return e
        }
        var n = e("bound-points"),
            o = e("unlerp");
        t.exports = i
    }, {
        "bound-points": 4,
        unlerp: 96
    }],
    96: [function(e, t, r) {
        t.exports = function(e, t, r) {
            return (r - e) / (t - e)
        }
    }, {}],
    97: [function(e, t, r) {
        "use strict";

        function i(e) {
            if (null === e || void 0 === e) throw new TypeError("Object.assign cannot be called with null or undefined");
            return Object(e)
        }
        var n = Object.prototype.hasOwnProperty,
            o = Object.prototype.propertyIsEnumerable;
        t.exports = Object.assign || function(e, t) {
                for (var r, a, s = i(e), h = 1; h < arguments.length; h++) {
                    r = Object(arguments[h]);
                    for (var l in r) n.call(r, l) && (s[l] = r[l]);
                    if (Object.getOwnPropertySymbols) {
                        a = Object.getOwnPropertySymbols(r);
                        for (var u = 0; u < a.length; u++) o.call(r, a[u]) && (s[a[u]] = r[a[u]])
                    }
                }
                return s
            }
    }, {}],
    98: [function(e, t, r) {
        function i(e) {
            var t = [];
            return e.replace(a, function(e, r, i) {
                var a = r.toLowerCase();
                for (i = n(i), "m" == a && i.length > 2 && (t.push([r].concat(i.splice(0, 2))), a = "l", r = "m" == r ? "l" : "L");;) {
                    if (i.length == o[a]) return i.unshift(r), t.push(i);
                    if (i.length < o[a]) throw new Error("malformed path data");
                    t.push([r].concat(i.splice(0, o[a])))
                }
            }), t
        }

        function n(e) {
            return e = e.match(/-?[.0-9]+(?:e[-+]?\d+)?/gi), e ? e.map(Number) : []
        }
        t.exports = i;
        var o = {
                a: 7,
                c: 6,
                h: 1,
                l: 2,
                m: 2,
                q: 4,
                s: 4,
                t: 2,
                v: 1,
                z: 0
            },
            a = /([astvzqmhlc])([^astvzqmhlc]*)/gi
    }, {}],
    99: [function(e, t, r) {
        "use strict";
        t.exports = function(e, t) {
            if (void 0 === t && (t = e, e = 0), "number" != typeof e || "number" != typeof t) throw new TypeError("Expected all arguments to be numbers");
            return Math.random() * (t - e) + e
        }
    }, {}],
    100: [function(e, t, r) {
        function i(e, t, r) {
            var i = t[0],
                n = t[1],
                o = r[0] - i,
                a = r[1] - n;
            if (0 !== o || 0 !== a) {
                var s = ((e[0] - i) * o + (e[1] - n) * a) / (o * o + a * a);
                s > 1 ? (i = r[0], n = r[1]) : s > 0 && (i += o * s, n += a * s)
            }
            return o = e[0] - i, a = e[1] - n, o * o + a * a
        }

        function n(e, t, r, o, a) {
            for (var s, h = o, l = t + 1; r > l; l++) {
                var u = i(e[l], e[t], e[r]);
                u > h && (s = l, h = u)
            }
            h > o && (s - t > 1 && n(e, t, s, o, a), a.push(e[s]), r - s > 1 && n(e, s, r, o, a))
        }
        t.exports = function(e, t) {
            if (e.length <= 1) return e;
            t = "number" == typeof t ? t : 1;
            var r = t * t,
                i = e.length - 1,
                o = [e[0]];
            return n(e, 0, i, r, o), o.push(e[i]), o
        }
    }, {}],
    101: [function(e, t, r) {
        var i = e("./radial-distance"),
            n = e("./douglas-peucker");
        t.exports = function(e, t) {
            return e = i(e, t), e = n(e, t)
        }, t.exports.radialDistance = i, t.exports.douglasPeucker = n
    }, {
        "./douglas-peucker": 100,
        "./radial-distance": 102
    }],
    102: [function(e, t, r) {
        function i(e, t) {
            var r = e[0] - t[0],
                i = e[1] - t[1];
            return r * r + i * i
        }
        t.exports = function(e, t) {
            if (e.length <= 1) return e;
            t = "number" == typeof t ? t : 1;
            for (var r, n = t * t, o = e[0], a = [o], s = 1, h = e.length; h > s; s++) r = e[s], i(r, o) > n && (a.push(r), o = r);
            return o !== r && a.push(r), a
        }
    }, {}],
    103: [function(e, t, r) {
        function i(e, t, r) {
            return e[0] = t, e[1] = r, e
        }

        function n(e, t, r, n) {
            o(r, i(l, n[1], n[2]), i(u, n[3], n[4]), i(c, n[5], n[6]), t, e)
        }
        var o = e("adaptive-bezier-curve"),
            a = e("abs-svg-path"),
            s = e("normalize-svg-path"),
            h = e("vec2-copy"),
            l = [0, 0],
            u = [0, 0],
            c = [0, 0];
        t.exports = function(e, t) {
            var r = [],
                o = [],
                l = [0, 0];
            return s(a(e)).forEach(function(e, a, s) {
                if ("M" === e[0]) h(l, e.slice(1)), o.length > 0 && (r.push(o), o = []);
                else {
                    if ("C" !== e[0]) throw new Error("illegal type in SVG: " + e[0]);
                    n(o, t, l, e), i(l, e[5], e[6])
                }
            }), o.length > 0 && r.push(o), r
        }
    }, {
        "abs-svg-path": 104,
        "adaptive-bezier-curve": 106,
        "normalize-svg-path": 107,
        "vec2-copy": 108
    }],
    104: [function(e, t, r) {
        function i(e) {
            var t = 0,
                r = 0,
                i = 0,
                n = 0;
            return e.map(function(e) {
                e = e.slice();
                var o = e[0],
                    a = o.toUpperCase();
                if (o != a) switch (e[0] = a, o) {
                    case "a":
                        e[6] += i, e[7] += n;
                        break;
                    case "v":
                        e[1] += n;
                        break;
                    case "h":
                        e[1] += i;
                        break;
                    default:
                        for (var s = 1; s < e.length;) e[s++] += i, e[s++] += n
                }
                switch (a) {
                    case "Z":
                        i = t, n = r;
                        break;
                    case "H":
                        i = e[1];
                        break;
                    case "V":
                        n = e[1];
                        break;
                    case "M":
                        i = t = e[1], n = r = e[2];
                        break;
                    default:
                        i = e[e.length - 2], n = e[e.length - 1]
                }
                return e
            })
        }
        t.exports = i
    }, {}],
    105: [function(e, t, r) {
        function i(e) {
            return [e[0], e[1]]
        }

        function n(e, t) {
            return [e, t]
        }
        t.exports = function(e) {
            function t(e, t, n, o, a, s) {
                a.push(i(e));
                var h = e[0],
                    l = e[1],
                    u = t[0],
                    c = t[1],
                    f = n[0],
                    p = n[1],
                    d = o[0],
                    m = o[1];
                r(h, l, u, c, f, p, d, m, a, s, 0), a.push(i(o))
            }

            function r(e, t, i, s, c, f, p, d, m, v, g) {
                if (!(g > o)) {
                    var y = Math.PI,
                        x = (e + i) / 2,
                        w = (t + s) / 2,
                        b = (i + c) / 2,
                        _ = (s + f) / 2,
                        M = (c + p) / 2,
                        S = (f + d) / 2,
                        T = (x + b) / 2,
                        A = (w + _) / 2,
                        E = (b + M) / 2,
                        C = (_ + S) / 2,
                        L = (T + E) / 2,
                        P = (A + C) / 2;
                    if (g > 0) {
                        var R, D, F = p - e,
                            U = d - t,
                            B = Math.abs((i - p) * U - (s - d) * F),
                            k = Math.abs((c - p) * U - (f - d) * F);
                        if (B > a && k > a) {
                            if (v * (F * F + U * U) >= (B + k) * (B + k)) {
                                if (h > l) return void m.push(n(L, P));
                                var z = Math.atan2(f - s, c - i);
                                if (R = Math.abs(z - Math.atan2(s - t, i - e)), D = Math.abs(Math.atan2(d - f, p - c) - z), R >= y && (R = 2 * y - R), D >= y && (D = 2 * y - D), l > R + D) return void m.push(n(L, P));
                                if (0 !== u) {
                                    if (R > u) return void m.push(n(i, s));
                                    if (D > u) return void m.push(n(c, f))
                                }
                            }
                        } else if (B > a) {
                            if (v * (F * F + U * U) >= B * B) {
                                if (h > l) return void m.push(n(L, P));
                                if (R = Math.abs(Math.atan2(f - s, c - i) - Math.atan2(s - t, i - e)), R >= y && (R = 2 * y - R), l > R) return m.push(n(i, s)), void m.push(n(c, f));
                                if (0 !== u && R > u) return void m.push(n(i, s))
                            }
                        } else if (k > a) {
                            if (v * (F * F + U * U) >= k * k) {
                                if (h > l) return void m.push(n(L, P));
                                if (R = Math.abs(Math.atan2(d - f, p - c) - Math.atan2(f - s, c - i)), R >= y && (R = 2 * y - R), l > R) return m.push(n(i, s)), void m.push(n(c, f));
                                if (0 !== u && R > u) return void m.push(n(c, f))
                            }
                        } else if (F = L - (e + p) / 2, U = P - (t + d) / 2, v >= F * F + U * U) return void m.push(n(L, P))
                    }
                    r(e, t, x, w, T, A, L, P, m, v, g + 1), r(L, P, E, C, M, S, p, d, m, v, g + 1)
                }
            }
            e = e || {};
            var o = "number" == typeof e.recursion ? e.recursion : 8,
                a = "number" == typeof e.epsilon ? e.epsilon : 1.1920929e-7,
                s = "number" == typeof e.pathEpsilon ? e.pathEpsilon : 1,
                h = "number" == typeof e.angleEpsilon ? e.angleEpsilon : .01,
                l = e.angleTolerance || 0,
                u = e.cuspLimit || 0;
            return function(e, r, i, n, o, a) {
                a || (a = []), o = "number" == typeof o ? o : 1;
                var h = s / o;
                return h *= h, t(e, r, i, n, a, h), a
            }
        }
    }, {}],
    106: [function(e, t, r) {
        t.exports = e("./function")()
    }, {
        "./function": 105
    }],
    107: [function(e, t, r) {
        function i(e) {
            for (var t, r = [], i = 0, s = 0, l = 0, u = 0, c = null, f = null, p = 0, d = 0, m = 0, v = e.length; v > m; m++) {
                var g = e[m],
                    y = g[0];
                switch (y) {
                    case "M":
                        l = g[1], u = g[2];
                        break;
                    case "A":
                        g = a(p, d, g[1], g[2], h(g[3]), g[4], g[5], g[6], g[7]), g.unshift("C"), g.length > 7 && (r.push(g.splice(0, 7)), g.unshift("C"));
                        break;
                    case "S":
                        var x = p,
                            w = d;
                        ("C" == t || "S" == t) && (x += x - i, w += w - s), g = ["C", x, w, g[1], g[2], g[3], g[4]];
                        break;
                    case "T":
                        "Q" == t || "T" == t ? (c = 2 * p - c, f = 2 * d - f) : (c = p, f = d), g = o(p, d, c, f, g[1], g[2]);
                        break;
                    case "Q":
                        c = g[1], f = g[2], g = o(p, d, g[1], g[2], g[3], g[4]);
                        break;
                    case "L":
                        g = n(p, d, g[1], g[2]);
                        break;
                    case "H":
                        g = n(p, d, g[1], d);
                        break;
                    case "V":
                        g = n(p, d, p, g[1]);
                        break;
                    case "Z":
                        g = n(p, d, l, u)
                }
                t = y, p = g[g.length - 2], d = g[g.length - 1], g.length > 4 ? (i = g[g.length - 4], s = g[g.length - 3]) : (i = p, s = d), r.push(g)
            }
            return r
        }

        function n(e, t, r, i) {
            return ["C", e, t, r, i, r, i]
        }

        function o(e, t, r, i, n, o) {
            return ["C", e / 3 + 2 / 3 * r, t / 3 + 2 / 3 * i, n / 3 + 2 / 3 * r, o / 3 + 2 / 3 * i, n, o]
        }

        function a(e, t, r, i, n, o, h, c, f, p) {
            if (p) M = p[0], S = p[1], b = p[2], _ = p[3];
            else {
                var d = s(e, t, -n);
                e = d.x, t = d.y, d = s(c, f, -n), c = d.x, f = d.y;
                var m = (e - c) / 2,
                    v = (t - f) / 2,
                    g = m * m / (r * r) + v * v / (i * i);
                g > 1 && (g = Math.sqrt(g), r = g * r, i = g * i);
                var y = r * r,
                    x = i * i,
                    w = (o == h ? -1 : 1) * Math.sqrt(Math.abs((y * x - y * v * v - x * m * m) / (y * v * v + x * m * m)));
                w == 1 / 0 && (w = 1);
                var b = w * r * v / i + (e + c) / 2,
                    _ = w * -i * m / r + (t + f) / 2,
                    M = Math.asin(((t - _) / i).toFixed(9)),
                    S = Math.asin(((f - _) / i).toFixed(9));
                M = b > e ? l - M : M, S = b > c ? l - S : S, 0 > M && (M = 2 * l + M), 0 > S && (S = 2 * l + S), h && M > S && (M -= 2 * l), !h && S > M && (S -= 2 * l)
            }
            if (Math.abs(S - M) > u) {
                var T = S,
                    A = c,
                    E = f;
                S = M + u * (h && S > M ? 1 : -1), c = b + r * Math.cos(S), f = _ + i * Math.sin(S);
                var C = a(c, f, r, i, n, 0, h, A, E, [S, T, b, _])
            }
            var L = Math.tan((S - M) / 4),
                P = 4 / 3 * r * L,
                R = 4 / 3 * i * L,
                D = [2 * e - (e + P * Math.sin(M)), 2 * t - (t - R * Math.cos(M)), c + P * Math.sin(S), f - R * Math.cos(S), c, f];
            if (p) return D;
            C && (D = D.concat(C));
            for (var F = 0; F < D.length;) {
                var U = s(D[F], D[F + 1], n);
                D[F++] = U.x, D[F++] = U.y
            }
            return D
        }

        function s(e, t, r) {
            return {
                x: e * Math.cos(r) - t * Math.sin(r),
                y: e * Math.sin(r) + t * Math.cos(r)
            }
        }

        function h(e) {
            return e * (l / 180)
        }
        var l = Math.PI,
            u = h(120);
        t.exports = i
    }, {}],
    108: [function(e, t, r) {
        t.exports = function(e, t) {
            return e[0] = t[0], e[1] = t[1], e
        }
    }, {}],
    109: [function(e, t, r) {
        var i = e("inherits");
        t.exports = function(e) {
            function t(r) {
                return this instanceof t ? (e.Geometry.call(this), this.dynamic = !0, void(r && this.update(r))) : new t(r)
            }
            return i(t, e.Geometry), t.prototype._updatePositions = function(t) {
                for (var r = 0; r < t.length; r++) {
                    var i = t[r];
                    r > this.vertices.length - 1 ? this.vertices.push((new e.Vector3).fromArray(i)) : this.vertices[r].fromArray(i)
                }
                this.vertices.length = t.length, this.verticesNeedUpdate = !0
            }, t.prototype._updateCells = function(t) {
                for (var r = 0; r < t.length; r++) {
                    var i = t[r];
                    if (r > this.faces.length - 1) this.faces.push(new e.Face3(i[0], i[1], i[2]));
                    else {
                        var n = this.faces[r];
                        n.a = i[0], n.b = i[1], n.c = i[2]
                    }
                }
                this.faces.length = t.length, this.elementsNeedUpdate = !0
            }, t.prototype.update = function(e) {
                this._updatePositions(e.positions), this._updateCells(e.cells)
            }, t
        }
    }, {
        inherits: 110
    }],
    110: [function(e, t, r) {
        arguments[4][15][0].apply(r, arguments)
    }, {
        dup: 15
    }],
    111: [function(e, t, r) {
        var i = i || {},
            n = {
                REVISION: "69"
            };
        "object" == typeof t && (t.exports = n), void 0 === Math.sign && (Math.sign = function(e) {
            return 0 > e ? -1 : e > 0 ? 1 : 0
        }), n.MOUSE = {
            LEFT: 0,
            MIDDLE: 1,
            RIGHT: 2
        }, n.CullFaceNone = 0, n.CullFaceBack = 1, n.CullFaceFront = 2, n.CullFaceFrontBack = 3, n.FrontFaceDirectionCW = 0, n.FrontFaceDirectionCCW = 1, n.BasicShadowMap = 0, n.PCFShadowMap = 1, n.PCFSoftShadowMap = 2, n.FrontSide = 0, n.BackSide = 1, n.DoubleSide = 2, n.NoShading = 0, n.FlatShading = 1, n.SmoothShading = 2, n.NoColors = 0, n.FaceColors = 1, n.VertexColors = 2, n.NoBlending = 0, n.NormalBlending = 1, n.AdditiveBlending = 2, n.SubtractiveBlending = 3, n.MultiplyBlending = 4, n.CustomBlending = 5, n.AddEquation = 100, n.SubtractEquation = 101, n.ReverseSubtractEquation = 102, n.MinEquation = 103, n.MaxEquation = 104, n.ZeroFactor = 200, n.OneFactor = 201, n.SrcColorFactor = 202, n.OneMinusSrcColorFactor = 203, n.SrcAlphaFactor = 204, n.OneMinusSrcAlphaFactor = 205, n.DstAlphaFactor = 206, n.OneMinusDstAlphaFactor = 207, n.DstColorFactor = 208, n.OneMinusDstColorFactor = 209, n.SrcAlphaSaturateFactor = 210, n.MultiplyOperation = 0, n.MixOperation = 1, n.AddOperation = 2, n.UVMapping = function() {}, n.CubeReflectionMapping = function() {}, n.CubeRefractionMapping = function() {}, n.SphericalReflectionMapping = function() {}, n.SphericalRefractionMapping = function() {}, n.RepeatWrapping = 1e3, n.ClampToEdgeWrapping = 1001, n.MirroredRepeatWrapping = 1002, n.NearestFilter = 1003, n.NearestMipMapNearestFilter = 1004, n.NearestMipMapLinearFilter = 1005, n.LinearFilter = 1006, n.LinearMipMapNearestFilter = 1007, n.LinearMipMapLinearFilter = 1008, n.UnsignedByteType = 1009, n.ByteType = 1010, n.ShortType = 1011, n.UnsignedShortType = 1012, n.IntType = 1013, n.UnsignedIntType = 1014, n.FloatType = 1015, n.UnsignedShort4444Type = 1016, n.UnsignedShort5551Type = 1017, n.UnsignedShort565Type = 1018, n.AlphaFormat = 1019, n.RGBFormat = 1020, n.RGBAFormat = 1021, n.LuminanceFormat = 1022, n.LuminanceAlphaFormat = 1023, n.RGB_S3TC_DXT1_Format = 2001, n.RGBA_S3TC_DXT1_Format = 2002, n.RGBA_S3TC_DXT3_Format = 2003, n.RGBA_S3TC_DXT5_Format = 2004, n.RGB_PVRTC_4BPPV1_Format = 2100, n.RGB_PVRTC_2BPPV1_Format = 2101, n.RGBA_PVRTC_4BPPV1_Format = 2102, n.RGBA_PVRTC_2BPPV1_Format = 2103, n.Color = function(e) {
            return 3 === arguments.length ? this.setRGB(arguments[0], arguments[1], arguments[2]) : this.set(e)
        }, n.Color.prototype = {
            constructor: n.Color,
            r: 1,
            g: 1,
            b: 1,
            set: function(e) {
                return e instanceof n.Color ? this.copy(e) : "number" == typeof e ? this.setHex(e) : "string" == typeof e && this.setStyle(e), this
            },
            setHex: function(e) {
                return e = Math.floor(e), this.r = (e >> 16 & 255) / 255, this.g = (e >> 8 & 255) / 255, this.b = (255 & e) / 255, this
            },
            setRGB: function(e, t, r) {
                return this.r = e, this.g = t, this.b = r, this
            },
            setHSL: function(e, t, r) {
                if (0 === t) this.r = this.g = this.b = r;
                else {
                    var i = function(e, t, r) {
                            return 0 > r && (r += 1), r > 1 && (r -= 1), 1 / 6 > r ? e + 6 * (t - e) * r : .5 > r ? t : 2 / 3 > r ? e + 6 * (t - e) * (2 / 3 - r) : e
                        },
                        n = .5 >= r ? r * (1 + t) : r + t - r * t,
                        o = 2 * r - n;
                    this.r = i(o, n, e + 1 / 3), this.g = i(o, n, e), this.b = i(o, n, e - 1 / 3)
                }
                return this
            },
            setStyle: function(e) {
                if (/^rgb\((\d+), ?(\d+), ?(\d+)\)$/i.test(e)) {
                    var t = /^rgb\((\d+), ?(\d+), ?(\d+)\)$/i.exec(e);
                    return this.r = Math.min(255, parseInt(t[1], 10)) / 255, this.g = Math.min(255, parseInt(t[2], 10)) / 255, this.b = Math.min(255, parseInt(t[3], 10)) / 255, this
                }
                if (/^rgb\((\d+)\%, ?(\d+)\%, ?(\d+)\%\)$/i.test(e)) {
                    var t = /^rgb\((\d+)\%, ?(\d+)\%, ?(\d+)\%\)$/i.exec(e);
                    return this.r = Math.min(100, parseInt(t[1], 10)) / 100, this.g = Math.min(100, parseInt(t[2], 10)) / 100, this.b = Math.min(100, parseInt(t[3], 10)) / 100, this
                }
                if (/^\#([0-9a-f]{6})$/i.test(e)) {
                    var t = /^\#([0-9a-f]{6})$/i.exec(e);
                    return this.setHex(parseInt(t[1], 16)), this
                }
                if (/^\#([0-9a-f])([0-9a-f])([0-9a-f])$/i.test(e)) {
                    var t = /^\#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec(e);
                    return this.setHex(parseInt(t[1] + t[1] + t[2] + t[2] + t[3] + t[3], 16)), this
                }
                return /^(\w+)$/i.test(e) ? (this.setHex(n.ColorKeywords[e]), this) : void 0
            },
            copy: function(e) {
                return this.r = e.r, this.g = e.g, this.b = e.b, this
            },
            copyGammaToLinear: function(e) {
                return this.r = e.r * e.r, this.g = e.g * e.g, this.b = e.b * e.b, this
            },
            copyLinearToGamma: function(e) {
                return this.r = Math.sqrt(e.r), this.g = Math.sqrt(e.g), this.b = Math.sqrt(e.b), this
            },
            convertGammaToLinear: function() {
                var e = this.r,
                    t = this.g,
                    r = this.b;
                return this.r = e * e, this.g = t * t, this.b = r * r, this
            },
            convertLinearToGamma: function() {
                return this.r = Math.sqrt(this.r), this.g = Math.sqrt(this.g), this.b = Math.sqrt(this.b), this
            },
            getHex: function() {
                return 255 * this.r << 16 ^ 255 * this.g << 8 ^ 255 * this.b << 0
            },
            getHexString: function() {
                return ("000000" + this.getHex().toString(16)).slice(-6)
            },
            getHSL: function(e) {
                var t, r, i = e || {
                            h: 0,
                            s: 0,
                            l: 0
                        },
                    n = this.r,
                    o = this.g,
                    a = this.b,
                    s = Math.max(n, o, a),
                    h = Math.min(n, o, a),
                    l = (h + s) / 2;
                if (h === s) t = 0, r = 0;
                else {
                    var u = s - h;
                    switch (r = .5 >= l ? u / (s + h) : u / (2 - s - h), s) {
                        case n:
                            t = (o - a) / u + (a > o ? 6 : 0);
                            break;
                        case o:
                            t = (a - n) / u + 2;
                            break;
                        case a:
                            t = (n - o) / u + 4
                    }
                    t /= 6
                }
                return i.h = t, i.s = r, i.l = l, i
            },
            getStyle: function() {
                return "rgb(" + (255 * this.r | 0) + "," + (255 * this.g | 0) + "," + (255 * this.b | 0) + ")";
            },
            offsetHSL: function(e, t, r) {
                var i = this.getHSL();
                return i.h += e, i.s += t, i.l += r, this.setHSL(i.h, i.s, i.l), this
            },
            add: function(e) {
                return this.r += e.r, this.g += e.g, this.b += e.b, this
            },
            addColors: function(e, t) {
                return this.r = e.r + t.r, this.g = e.g + t.g, this.b = e.b + t.b, this
            },
            addScalar: function(e) {
                return this.r += e, this.g += e, this.b += e, this
            },
            multiply: function(e) {
                return this.r *= e.r, this.g *= e.g, this.b *= e.b, this
            },
            multiplyScalar: function(e) {
                return this.r *= e, this.g *= e, this.b *= e, this
            },
            lerp: function(e, t) {
                return this.r += (e.r - this.r) * t, this.g += (e.g - this.g) * t, this.b += (e.b - this.b) * t, this
            },
            equals: function(e) {
                return e.r === this.r && e.g === this.g && e.b === this.b
            },
            fromArray: function(e) {
                return this.r = e[0], this.g = e[1], this.b = e[2], this
            },
            toArray: function() {
                return [this.r, this.g, this.b]
            },
            clone: function() {
                return (new n.Color).setRGB(this.r, this.g, this.b)
            }
        }, n.ColorKeywords = {
            aliceblue: 15792383,
            antiquewhite: 16444375,
            aqua: 65535,
            aquamarine: 8388564,
            azure: 15794175,
            beige: 16119260,
            bisque: 16770244,
            black: 0,
            blanchedalmond: 16772045,
            blue: 255,
            blueviolet: 9055202,
            brown: 10824234,
            burlywood: 14596231,
            cadetblue: 6266528,
            chartreuse: 8388352,
            chocolate: 13789470,
            coral: 16744272,
            cornflowerblue: 6591981,
            cornsilk: 16775388,
            crimson: 14423100,
            cyan: 65535,
            darkblue: 139,
            darkcyan: 35723,
            darkgoldenrod: 12092939,
            darkgray: 11119017,
            darkgreen: 25600,
            darkgrey: 11119017,
            darkkhaki: 12433259,
            darkmagenta: 9109643,
            darkolivegreen: 5597999,
            darkorange: 16747520,
            darkorchid: 10040012,
            darkred: 9109504,
            darksalmon: 15308410,
            darkseagreen: 9419919,
            darkslateblue: 4734347,
            darkslategray: 3100495,
            darkslategrey: 3100495,
            darkturquoise: 52945,
            darkviolet: 9699539,
            deeppink: 16716947,
            deepskyblue: 49151,
            dimgray: 6908265,
            dimgrey: 6908265,
            dodgerblue: 2003199,
            firebrick: 11674146,
            floralwhite: 16775920,
            forestgreen: 2263842,
            fuchsia: 16711935,
            gainsboro: 14474460,
            ghostwhite: 16316671,
            gold: 16766720,
            goldenrod: 14329120,
            gray: 8421504,
            green: 32768,
            greenyellow: 11403055,
            grey: 8421504,
            honeydew: 15794160,
            hotpink: 16738740,
            indianred: 13458524,
            indigo: 4915330,
            ivory: 16777200,
            khaki: 15787660,
            lavender: 15132410,
            lavenderblush: 16773365,
            lawngreen: 8190976,
            lemonchiffon: 16775885,
            lightblue: 11393254,
            lightcoral: 15761536,
            lightcyan: 14745599,
            lightgoldenrodyellow: 16448210,
            lightgray: 13882323,
            lightgreen: 9498256,
            lightgrey: 13882323,
            lightpink: 16758465,
            lightsalmon: 16752762,
            lightseagreen: 2142890,
            lightskyblue: 8900346,
            lightslategray: 7833753,
            lightslategrey: 7833753,
            lightsteelblue: 11584734,
            lightyellow: 16777184,
            lime: 65280,
            limegreen: 3329330,
            linen: 16445670,
            magenta: 16711935,
            maroon: 8388608,
            mediumaquamarine: 6737322,
            mediumblue: 205,
            mediumorchid: 12211667,
            mediumpurple: 9662683,
            mediumseagreen: 3978097,
            mediumslateblue: 8087790,
            mediumspringgreen: 64154,
            mediumturquoise: 4772300,
            mediumvioletred: 13047173,
            midnightblue: 1644912,
            mintcream: 16121850,
            mistyrose: 16770273,
            moccasin: 16770229,
            navajowhite: 16768685,
            navy: 128,
            oldlace: 16643558,
            olive: 8421376,
            olivedrab: 7048739,
            orange: 16753920,
            orangered: 16729344,
            orchid: 14315734,
            palegoldenrod: 15657130,
            palegreen: 10025880,
            paleturquoise: 11529966,
            palevioletred: 14381203,
            papayawhip: 16773077,
            peachpuff: 16767673,
            peru: 13468991,
            pink: 16761035,
            plum: 14524637,
            powderblue: 11591910,
            purple: 8388736,
            red: 16711680,
            rosybrown: 12357519,
            royalblue: 4286945,
            saddlebrown: 9127187,
            salmon: 16416882,
            sandybrown: 16032864,
            seagreen: 3050327,
            seashell: 16774638,
            sienna: 10506797,
            silver: 12632256,
            skyblue: 8900331,
            slateblue: 6970061,
            slategray: 7372944,
            slategrey: 7372944,
            snow: 16775930,
            springgreen: 65407,
            steelblue: 4620980,
            tan: 13808780,
            teal: 32896,
            thistle: 14204888,
            tomato: 16737095,
            turquoise: 4251856,
            violet: 15631086,
            wheat: 16113331,
            white: 16777215,
            whitesmoke: 16119285,
            yellow: 16776960,
            yellowgreen: 10145074
        }, n.Quaternion = function(e, t, r, i) {
            this._x = e || 0, this._y = t || 0, this._z = r || 0, this._w = void 0 !== i ? i : 1
        }, n.Quaternion.prototype = {
            constructor: n.Quaternion,
            _x: 0,
            _y: 0,
            _z: 0,
            _w: 0,
            get x() {
                return this._x
            },
            set x(e) {
                this._x = e, this.onChangeCallback()
            },
            get y() {
                return this._y
            },
            set y(e) {
                this._y = e, this.onChangeCallback()
            },
            get z() {
                return this._z
            },
            set z(e) {
                this._z = e, this.onChangeCallback()
            },
            get w() {
                return this._w
            },
            set w(e) {
                this._w = e, this.onChangeCallback()
            },
            set: function(e, t, r, i) {
                return this._x = e, this._y = t, this._z = r, this._w = i, this.onChangeCallback(), this
            },
            copy: function(e) {
                return this._x = e.x, this._y = e.y, this._z = e.z, this._w = e.w, this.onChangeCallback(), this
            },
            setFromEuler: function(e, t) {
                if (e instanceof n.Euler == !1) throw new Error("THREE.Quaternion: .setFromEuler() now expects a Euler rotation rather than a Vector3 and order.");
                var r = Math.cos(e._x / 2),
                    i = Math.cos(e._y / 2),
                    o = Math.cos(e._z / 2),
                    a = Math.sin(e._x / 2),
                    s = Math.sin(e._y / 2),
                    h = Math.sin(e._z / 2);
                return "XYZ" === e.order ? (this._x = a * i * o + r * s * h, this._y = r * s * o - a * i * h, this._z = r * i * h + a * s * o, this._w = r * i * o - a * s * h) : "YXZ" === e.order ? (this._x = a * i * o + r * s * h, this._y = r * s * o - a * i * h, this._z = r * i * h - a * s * o, this._w = r * i * o + a * s * h) : "ZXY" === e.order ? (this._x = a * i * o - r * s * h, this._y = r * s * o + a * i * h, this._z = r * i * h + a * s * o, this._w = r * i * o - a * s * h) : "ZYX" === e.order ? (this._x = a * i * o - r * s * h, this._y = r * s * o + a * i * h, this._z = r * i * h - a * s * o, this._w = r * i * o + a * s * h) : "YZX" === e.order ? (this._x = a * i * o + r * s * h, this._y = r * s * o + a * i * h, this._z = r * i * h - a * s * o, this._w = r * i * o - a * s * h) : "XZY" === e.order && (this._x = a * i * o - r * s * h, this._y = r * s * o - a * i * h, this._z = r * i * h + a * s * o, this._w = r * i * o + a * s * h), t !== !1 && this.onChangeCallback(), this
            },
            setFromAxisAngle: function(e, t) {
                var r = t / 2,
                    i = Math.sin(r);
                return this._x = e.x * i, this._y = e.y * i, this._z = e.z * i, this._w = Math.cos(r), this.onChangeCallback(), this
            },
            setFromRotationMatrix: function(e) {
                var t, r = e.elements,
                    i = r[0],
                    n = r[4],
                    o = r[8],
                    a = r[1],
                    s = r[5],
                    h = r[9],
                    l = r[2],
                    u = r[6],
                    c = r[10],
                    f = i + s + c;
                return f > 0 ? (t = .5 / Math.sqrt(f + 1), this._w = .25 / t, this._x = (u - h) * t, this._y = (o - l) * t, this._z = (a - n) * t) : i > s && i > c ? (t = 2 * Math.sqrt(1 + i - s - c), this._w = (u - h) / t, this._x = .25 * t, this._y = (n + a) / t, this._z = (o + l) / t) : s > c ? (t = 2 * Math.sqrt(1 + s - i - c), this._w = (o - l) / t, this._x = (n + a) / t, this._y = .25 * t, this._z = (h + u) / t) : (t = 2 * Math.sqrt(1 + c - i - s), this._w = (a - n) / t, this._x = (o + l) / t, this._y = (h + u) / t, this._z = .25 * t), this.onChangeCallback(), this
            },
            setFromUnitVectors: function() {
                var e, t, r = 1e-6;
                return function(i, o) {
                    return void 0 === e && (e = new n.Vector3), t = i.dot(o) + 1, r > t ? (t = 0, Math.abs(i.x) > Math.abs(i.z) ? e.set(-i.y, i.x, 0) : e.set(0, -i.z, i.y)) : e.crossVectors(i, o), this._x = e.x, this._y = e.y, this._z = e.z, this._w = t, this.normalize(), this
                }
            }(),
            inverse: function() {
                return this.conjugate().normalize(), this
            },
            conjugate: function() {
                return this._x *= -1, this._y *= -1, this._z *= -1, this.onChangeCallback(), this
            },
            dot: function(e) {
                return this._x * e._x + this._y * e._y + this._z * e._z + this._w * e._w
            },
            lengthSq: function() {
                return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w
            },
            length: function() {
                return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w)
            },
            normalize: function() {
                var e = this.length();
                return 0 === e ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (e = 1 / e, this._x = this._x * e, this._y = this._y * e, this._z = this._z * e, this._w = this._w * e), this.onChangeCallback(), this
            },
            multiply: function(e, t) {
                return void 0 !== t ? (console.warn("THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."), this.multiplyQuaternions(e, t)) : this.multiplyQuaternions(this, e)
            },
            multiplyQuaternions: function(e, t) {
                var r = e._x,
                    i = e._y,
                    n = e._z,
                    o = e._w,
                    a = t._x,
                    s = t._y,
                    h = t._z,
                    l = t._w;
                return this._x = r * l + o * a + i * h - n * s, this._y = i * l + o * s + n * a - r * h, this._z = n * l + o * h + r * s - i * a, this._w = o * l - r * a - i * s - n * h, this.onChangeCallback(), this
            },
            multiplyVector3: function(e) {
                return console.warn("THREE.Quaternion: .multiplyVector3() has been removed. Use is now vector.applyQuaternion( quaternion ) instead."), e.applyQuaternion(this)
            },
            slerp: function(e, t) {
                if (0 === t) return this;
                if (1 === t) return this.copy(e);
                var r = this._x,
                    i = this._y,
                    n = this._z,
                    o = this._w,
                    a = o * e._w + r * e._x + i * e._y + n * e._z;
                if (0 > a ? (this._w = -e._w, this._x = -e._x, this._y = -e._y, this._z = -e._z, a = -a) : this.copy(e), a >= 1) return this._w = o, this._x = r, this._y = i, this._z = n, this;
                var s = Math.acos(a),
                    h = Math.sqrt(1 - a * a);
                if (Math.abs(h) < .001) return this._w = .5 * (o + this._w), this._x = .5 * (r + this._x), this._y = .5 * (i + this._y), this._z = .5 * (n + this._z), this;
                var l = Math.sin((1 - t) * s) / h,
                    u = Math.sin(t * s) / h;
                return this._w = o * l + this._w * u, this._x = r * l + this._x * u, this._y = i * l + this._y * u, this._z = n * l + this._z * u, this.onChangeCallback(), this
            },
            equals: function(e) {
                return e._x === this._x && e._y === this._y && e._z === this._z && e._w === this._w
            },
            fromArray: function(e, t) {
                return void 0 === t && (t = 0), this._x = e[t], this._y = e[t + 1], this._z = e[t + 2], this._w = e[t + 3], this.onChangeCallback(), this
            },
            toArray: function(e, t) {
                return void 0 === e && (e = []), void 0 === t && (t = 0), e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._w, e
            },
            onChange: function(e) {
                return this.onChangeCallback = e, this
            },
            onChangeCallback: function() {},
            clone: function() {
                return new n.Quaternion(this._x, this._y, this._z, this._w)
            }
        }, n.Quaternion.slerp = function(e, t, r, i) {
            return r.copy(e).slerp(t, i)
        }, n.Vector2 = function(e, t) {
            this.x = e || 0, this.y = t || 0
        }, n.Vector2.prototype = {
            constructor: n.Vector2,
            set: function(e, t) {
                return this.x = e, this.y = t, this
            },
            setX: function(e) {
                return this.x = e, this
            },
            setY: function(e) {
                return this.y = e, this
            },
            setComponent: function(e, t) {
                switch (e) {
                    case 0:
                        this.x = t;
                        break;
                    case 1:
                        this.y = t;
                        break;
                    default:
                        throw new Error("index is out of range: " + e)
                }
            },
            getComponent: function(e) {
                switch (e) {
                    case 0:
                        return this.x;
                    case 1:
                        return this.y;
                    default:
                        throw new Error("index is out of range: " + e)
                }
            },
            copy: function(e) {
                return this.x = e.x, this.y = e.y, this
            },
            add: function(e, t) {
                return void 0 !== t ? (console.warn("THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(e, t)) : (this.x += e.x, this.y += e.y, this)
            },
            addVectors: function(e, t) {
                return this.x = e.x + t.x, this.y = e.y + t.y, this
            },
            addScalar: function(e) {
                return this.x += e, this.y += e, this
            },
            sub: function(e, t) {
                return void 0 !== t ? (console.warn("THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(e, t)) : (this.x -= e.x, this.y -= e.y, this)
            },
            subVectors: function(e, t) {
                return this.x = e.x - t.x, this.y = e.y - t.y, this
            },
            multiply: function(e) {
                return this.x *= e.x, this.y *= e.y, this
            },
            multiplyScalar: function(e) {
                return this.x *= e, this.y *= e, this
            },
            divide: function(e) {
                return this.x /= e.x, this.y /= e.y, this
            },
            divideScalar: function(e) {
                if (0 !== e) {
                    var t = 1 / e;
                    this.x *= t, this.y *= t
                } else this.x = 0, this.y = 0;
                return this
            },
            min: function(e) {
                return this.x > e.x && (this.x = e.x), this.y > e.y && (this.y = e.y), this
            },
            max: function(e) {
                return this.x < e.x && (this.x = e.x), this.y < e.y && (this.y = e.y), this
            },
            clamp: function(e, t) {
                return this.x < e.x ? this.x = e.x : this.x > t.x && (this.x = t.x), this.y < e.y ? this.y = e.y : this.y > t.y && (this.y = t.y), this
            },
            clampScalar: function() {
                var e, t;
                return function(r, i) {
                    return void 0 === e && (e = new n.Vector2, t = new n.Vector2), e.set(r, r), t.set(i, i), this.clamp(e, t)
                }
            }(),
            floor: function() {
                return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this
            },
            ceil: function() {
                return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this
            },
            round: function() {
                return this.x = Math.round(this.x), this.y = Math.round(this.y), this
            },
            roundToZero: function() {
                return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x), this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y), this
            },
            negate: function() {
                return this.x = -this.x, this.y = -this.y, this
            },
            dot: function(e) {
                return this.x * e.x + this.y * e.y
            },
            lengthSq: function() {
                return this.x * this.x + this.y * this.y
            },
            length: function() {
                return Math.sqrt(this.x * this.x + this.y * this.y)
            },
            normalize: function() {
                return this.divideScalar(this.length())
            },
            distanceTo: function(e) {
                return Math.sqrt(this.distanceToSquared(e))
            },
            distanceToSquared: function(e) {
                var t = this.x - e.x,
                    r = this.y - e.y;
                return t * t + r * r
            },
            setLength: function(e) {
                var t = this.length();
                return 0 !== t && e !== t && this.multiplyScalar(e / t), this
            },
            lerp: function(e, t) {
                return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this
            },
            equals: function(e) {
                return e.x === this.x && e.y === this.y
            },
            fromArray: function(e, t) {
                return void 0 === t && (t = 0), this.x = e[t], this.y = e[t + 1], this
            },
            toArray: function(e, t) {
                return void 0 === e && (e = []), void 0 === t && (t = 0), e[t] = this.x, e[t + 1] = this.y, e
            },
            clone: function() {
                return new n.Vector2(this.x, this.y)
            }
        }, n.Vector3 = function(e, t, r) {
            this.x = e || 0, this.y = t || 0, this.z = r || 0
        }, n.Vector3.prototype = {
            constructor: n.Vector3,
            set: function(e, t, r) {
                return this.x = e, this.y = t, this.z = r, this
            },
            setX: function(e) {
                return this.x = e, this
            },
            setY: function(e) {
                return this.y = e, this
            },
            setZ: function(e) {
                return this.z = e, this
            },
            setComponent: function(e, t) {
                switch (e) {
                    case 0:
                        this.x = t;
                        break;
                    case 1:
                        this.y = t;
                        break;
                    case 2:
                        this.z = t;
                        break;
                    default:
                        throw new Error("index is out of range: " + e)
                }
            },
            getComponent: function(e) {
                switch (e) {
                    case 0:
                        return this.x;
                    case 1:
                        return this.y;
                    case 2:
                        return this.z;
                    default:
                        throw new Error("index is out of range: " + e)
                }
            },
            copy: function(e) {
                return this.x = e.x, this.y = e.y, this.z = e.z, this
            },
            add: function(e, t) {
                return void 0 !== t ? (console.warn("THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(e, t)) : (this.x += e.x, this.y += e.y, this.z += e.z, this)
            },
            addScalar: function(e) {
                return this.x += e, this.y += e, this.z += e, this
            },
            addVectors: function(e, t) {
                return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this
            },
            sub: function(e, t) {
                return void 0 !== t ? (console.warn("THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(e, t)) : (this.x -= e.x, this.y -= e.y, this.z -= e.z, this)
            },
            subVectors: function(e, t) {
                return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this
            },
            multiply: function(e, t) {
                return void 0 !== t ? (console.warn("THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."), this.multiplyVectors(e, t)) : (this.x *= e.x, this.y *= e.y, this.z *= e.z, this)
            },
            multiplyScalar: function(e) {
                return this.x *= e, this.y *= e, this.z *= e, this
            },
            multiplyVectors: function(e, t) {
                return this.x = e.x * t.x, this.y = e.y * t.y, this.z = e.z * t.z, this
            },
            applyEuler: function() {
                var e;
                return function(t) {
                    return t instanceof n.Euler == !1 && console.error("THREE.Vector3: .applyEuler() now expects a Euler rotation rather than a Vector3 and order."), void 0 === e && (e = new n.Quaternion), this.applyQuaternion(e.setFromEuler(t)), this
                }
            }(),
            applyAxisAngle: function() {
                var e;
                return function(t, r) {
                    return void 0 === e && (e = new n.Quaternion), this.applyQuaternion(e.setFromAxisAngle(t, r)), this
                }
            }(),
            applyMatrix3: function(e) {
                var t = this.x,
                    r = this.y,
                    i = this.z,
                    n = e.elements;
                return this.x = n[0] * t + n[3] * r + n[6] * i, this.y = n[1] * t + n[4] * r + n[7] * i, this.z = n[2] * t + n[5] * r + n[8] * i, this
            },
            applyMatrix4: function(e) {
                var t = this.x,
                    r = this.y,
                    i = this.z,
                    n = e.elements;
                return this.x = n[0] * t + n[4] * r + n[8] * i + n[12], this.y = n[1] * t + n[5] * r + n[9] * i + n[13], this.z = n[2] * t + n[6] * r + n[10] * i + n[14], this
            },
            applyProjection: function(e) {
                var t = this.x,
                    r = this.y,
                    i = this.z,
                    n = e.elements,
                    o = 1 / (n[3] * t + n[7] * r + n[11] * i + n[15]);
                return this.x = (n[0] * t + n[4] * r + n[8] * i + n[12]) * o, this.y = (n[1] * t + n[5] * r + n[9] * i + n[13]) * o, this.z = (n[2] * t + n[6] * r + n[10] * i + n[14]) * o, this
            },
            applyQuaternion: function(e) {
                var t = this.x,
                    r = this.y,
                    i = this.z,
                    n = e.x,
                    o = e.y,
                    a = e.z,
                    s = e.w,
                    h = s * t + o * i - a * r,
                    l = s * r + a * t - n * i,
                    u = s * i + n * r - o * t,
                    c = -n * t - o * r - a * i;
                return this.x = h * s + c * -n + l * -a - u * -o, this.y = l * s + c * -o + u * -n - h * -a, this.z = u * s + c * -a + h * -o - l * -n, this
            },
            project: function() {
                var e;
                return function(t) {
                    return void 0 === e && (e = new n.Matrix4), e.multiplyMatrices(t.projectionMatrix, e.getInverse(t.matrixWorld)), this.applyProjection(e)
                }
            }(),
            unproject: function() {
                var e;
                return function(t) {
                    return void 0 === e && (e = new n.Matrix4), e.multiplyMatrices(t.matrixWorld, e.getInverse(t.projectionMatrix)), this.applyProjection(e)
                }
            }(),
            transformDirection: function(e) {
                var t = this.x,
                    r = this.y,
                    i = this.z,
                    n = e.elements;
                return this.x = n[0] * t + n[4] * r + n[8] * i, this.y = n[1] * t + n[5] * r + n[9] * i, this.z = n[2] * t + n[6] * r + n[10] * i, this.normalize(), this
            },
            divide: function(e) {
                return this.x /= e.x, this.y /= e.y, this.z /= e.z, this
            },
            divideScalar: function(e) {
                if (0 !== e) {
                    var t = 1 / e;
                    this.x *= t, this.y *= t, this.z *= t
                } else this.x = 0, this.y = 0, this.z = 0;
                return this
            },
            min: function(e) {
                return this.x > e.x && (this.x = e.x), this.y > e.y && (this.y = e.y), this.z > e.z && (this.z = e.z), this
            },
            max: function(e) {
                return this.x < e.x && (this.x = e.x), this.y < e.y && (this.y = e.y), this.z < e.z && (this.z = e.z), this
            },
            clamp: function(e, t) {
                return this.x < e.x ? this.x = e.x : this.x > t.x && (this.x = t.x), this.y < e.y ? this.y = e.y : this.y > t.y && (this.y = t.y), this.z < e.z ? this.z = e.z : this.z > t.z && (this.z = t.z), this
            },
            clampScalar: function() {
                var e, t;
                return function(r, i) {
                    return void 0 === e && (e = new n.Vector3, t = new n.Vector3), e.set(r, r, r), t.set(i, i, i), this.clamp(e, t)
                }
            }(),
            floor: function() {
                return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this
            },
            ceil: function() {
                return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this
            },
            round: function() {
                return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this
            },
            roundToZero: function() {
                return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x), this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y), this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z), this
            },
            negate: function() {
                return this.x = -this.x, this.y = -this.y, this.z = -this.z, this
            },
            dot: function(e) {
                return this.x * e.x + this.y * e.y + this.z * e.z
            },
            lengthSq: function() {
                return this.x * this.x + this.y * this.y + this.z * this.z
            },
            length: function() {
                return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
            },
            lengthManhattan: function() {
                return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z)
            },
            normalize: function() {
                return this.divideScalar(this.length())
            },
            setLength: function(e) {
                var t = this.length();
                return 0 !== t && e !== t && this.multiplyScalar(e / t), this
            },
            lerp: function(e, t) {
                return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this
            },
            cross: function(e, t) {
                if (void 0 !== t) return console.warn("THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead."), this.crossVectors(e, t);
                var r = this.x,
                    i = this.y,
                    n = this.z;
                return this.x = i * e.z - n * e.y, this.y = n * e.x - r * e.z, this.z = r * e.y - i * e.x, this
            },
            crossVectors: function(e, t) {
                var r = e.x,
                    i = e.y,
                    n = e.z,
                    o = t.x,
                    a = t.y,
                    s = t.z;
                return this.x = i * s - n * a, this.y = n * o - r * s, this.z = r * a - i * o, this
            },
            projectOnVector: function() {
                var e, t;
                return function(r) {
                    return void 0 === e && (e = new n.Vector3), e.copy(r).normalize(), t = this.dot(e), this.copy(e).multiplyScalar(t)
                }
            }(),
            projectOnPlane: function() {
                var e;
                return function(t) {
                    return void 0 === e && (e = new n.Vector3), e.copy(this).projectOnVector(t), this.sub(e)
                }
            }(),
            reflect: function() {
                var e;
                return function(t) {
                    return void 0 === e && (e = new n.Vector3), this.sub(e.copy(t).multiplyScalar(2 * this.dot(t)))
                }
            }(),
            angleTo: function(e) {
                var t = this.dot(e) / (this.length() * e.length());
                return Math.acos(n.Math.clamp(t, -1, 1))
            },
            distanceTo: function(e) {
                return Math.sqrt(this.distanceToSquared(e))
            },
            distanceToSquared: function(e) {
                var t = this.x - e.x,
                    r = this.y - e.y,
                    i = this.z - e.z;
                return t * t + r * r + i * i
            },
            setEulerFromRotationMatrix: function(e, t) {
                console.error("THREE.Vector3: .setEulerFromRotationMatrix() has been removed. Use Euler.setFromRotationMatrix() instead.")
            },
            setEulerFromQuaternion: function(e, t) {
                console.error("THREE.Vector3: .setEulerFromQuaternion() has been removed. Use Euler.setFromQuaternion() instead.")
            },
            getPositionFromMatrix: function(e) {
                return console.warn("THREE.Vector3: .getPositionFromMatrix() has been renamed to .setFromMatrixPosition()."), this.setFromMatrixPosition(e)
            },
            getScaleFromMatrix: function(e) {
                return console.warn("THREE.Vector3: .getScaleFromMatrix() has been renamed to .setFromMatrixScale()."), this.setFromMatrixScale(e)
            },
            getColumnFromMatrix: function(e, t) {
                return console.warn("THREE.Vector3: .getColumnFromMatrix() has been renamed to .setFromMatrixColumn()."), this.setFromMatrixColumn(e, t)
            },
            setFromMatrixPosition: function(e) {
                return this.x = e.elements[12], this.y = e.elements[13], this.z = e.elements[14], this
            },
            setFromMatrixScale: function(e) {
                var t = this.set(e.elements[0], e.elements[1], e.elements[2]).length(),
                    r = this.set(e.elements[4], e.elements[5], e.elements[6]).length(),
                    i = this.set(e.elements[8], e.elements[9], e.elements[10]).length();
                return this.x = t, this.y = r, this.z = i, this
            },
            setFromMatrixColumn: function(e, t) {
                var r = 4 * e,
                    i = t.elements;
                return this.x = i[r], this.y = i[r + 1], this.z = i[r + 2], this
            },
            equals: function(e) {
                return e.x === this.x && e.y === this.y && e.z === this.z
            },
            fromArray: function(e, t) {
                return void 0 === t && (t = 0), this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this
            },
            toArray: function(e, t) {
                return void 0 === e && (e = []), void 0 === t && (t = 0), e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e
            },
            clone: function() {
                return new n.Vector3(this.x, this.y, this.z)
            }
        }, n.Vector4 = function(e, t, r, i) {
            this.x = e || 0, this.y = t || 0, this.z = r || 0, this.w = void 0 !== i ? i : 1
        }, n.Vector4.prototype = {
            constructor: n.Vector4,
            set: function(e, t, r, i) {
                return this.x = e, this.y = t, this.z = r, this.w = i, this
            },
            setX: function(e) {
                return this.x = e, this
            },
            setY: function(e) {
                return this.y = e, this
            },
            setZ: function(e) {
                return this.z = e, this
            },
            setW: function(e) {
                return this.w = e, this
            },
            setComponent: function(e, t) {
                switch (e) {
                    case 0:
                        this.x = t;
                        break;
                    case 1:
                        this.y = t;
                        break;
                    case 2:
                        this.z = t;
                        break;
                    case 3:
                        this.w = t;
                        break;
                    default:
                        throw new Error("index is out of range: " + e)
                }
            },
            getComponent: function(e) {
                switch (e) {
                    case 0:
                        return this.x;
                    case 1:
                        return this.y;
                    case 2:
                        return this.z;
                    case 3:
                        return this.w;
                    default:
                        throw new Error("index is out of range: " + e)
                }
            },
            copy: function(e) {
                return this.x = e.x, this.y = e.y, this.z = e.z, this.w = void 0 !== e.w ? e.w : 1, this
            },
            add: function(e, t) {
                return void 0 !== t ? (console.warn("THREE.Vector4: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(e, t)) : (this.x += e.x, this.y += e.y, this.z += e.z, this.w += e.w, this)
            },
            addScalar: function(e) {
                return this.x += e, this.y += e, this.z += e, this.w += e, this
            },
            addVectors: function(e, t) {
                return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this.w = e.w + t.w, this
            },
            sub: function(e, t) {
                return void 0 !== t ? (console.warn("THREE.Vector4: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(e, t)) : (this.x -= e.x, this.y -= e.y, this.z -= e.z, this.w -= e.w, this)
            },
            subVectors: function(e, t) {
                return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this.w = e.w - t.w, this
            },
            multiplyScalar: function(e) {
                return this.x *= e, this.y *= e, this.z *= e, this.w *= e, this
            },
            applyMatrix4: function(e) {
                var t = this.x,
                    r = this.y,
                    i = this.z,
                    n = this.w,
                    o = e.elements;
                return this.x = o[0] * t + o[4] * r + o[8] * i + o[12] * n, this.y = o[1] * t + o[5] * r + o[9] * i + o[13] * n, this.z = o[2] * t + o[6] * r + o[10] * i + o[14] * n, this.w = o[3] * t + o[7] * r + o[11] * i + o[15] * n, this
            },
            divideScalar: function(e) {
                if (0 !== e) {
                    var t = 1 / e;
                    this.x *= t, this.y *= t, this.z *= t, this.w *= t
                } else this.x = 0, this.y = 0, this.z = 0, this.w = 1;
                return this
            },
            setAxisAngleFromQuaternion: function(e) {
                this.w = 2 * Math.acos(e.w);
                var t = Math.sqrt(1 - e.w * e.w);
                return 1e-4 > t ? (this.x = 1, this.y = 0, this.z = 0) : (this.x = e.x / t, this.y = e.y / t, this.z = e.z / t), this
            },
            setAxisAngleFromRotationMatrix: function(e) {
                var t, r, i, n, o = .01,
                    a = .1,
                    s = e.elements,
                    h = s[0],
                    l = s[4],
                    u = s[8],
                    c = s[1],
                    f = s[5],
                    p = s[9],
                    d = s[2],
                    m = s[6],
                    v = s[10];
                if (Math.abs(l - c) < o && Math.abs(u - d) < o && Math.abs(p - m) < o) {
                    if (Math.abs(l + c) < a && Math.abs(u + d) < a && Math.abs(p + m) < a && Math.abs(h + f + v - 3) < a) return this.set(1, 0, 0, 0), this;
                    t = Math.PI;
                    var g = (h + 1) / 2,
                        y = (f + 1) / 2,
                        x = (v + 1) / 2,
                        w = (l + c) / 4,
                        b = (u + d) / 4,
                        _ = (p + m) / 4;
                    return g > y && g > x ? o > g ? (r = 0, i = .707106781, n = .707106781) : (r = Math.sqrt(g), i = w / r, n = b / r) : y > x ? o > y ? (r = .707106781, i = 0, n = .707106781) : (i = Math.sqrt(y), r = w / i, n = _ / i) : o > x ? (r = .707106781, i = .707106781, n = 0) : (n = Math.sqrt(x), r = b / n, i = _ / n), this.set(r, i, n, t), this
                }
                var M = Math.sqrt((m - p) * (m - p) + (u - d) * (u - d) + (c - l) * (c - l));
                return Math.abs(M) < .001 && (M = 1), this.x = (m - p) / M, this.y = (u - d) / M, this.z = (c - l) / M, this.w = Math.acos((h + f + v - 1) / 2), this
            },
            min: function(e) {
                return this.x > e.x && (this.x = e.x), this.y > e.y && (this.y = e.y), this.z > e.z && (this.z = e.z), this.w > e.w && (this.w = e.w), this
            },
            max: function(e) {
                return this.x < e.x && (this.x = e.x), this.y < e.y && (this.y = e.y), this.z < e.z && (this.z = e.z), this.w < e.w && (this.w = e.w), this
            },
            clamp: function(e, t) {
                return this.x < e.x ? this.x = e.x : this.x > t.x && (this.x = t.x), this.y < e.y ? this.y = e.y : this.y > t.y && (this.y = t.y), this.z < e.z ? this.z = e.z : this.z > t.z && (this.z = t.z), this.w < e.w ? this.w = e.w : this.w > t.w && (this.w = t.w), this
            },
            clampScalar: function() {
                var e, t;
                return function(r, i) {
                    return void 0 === e && (e = new n.Vector4, t = new n.Vector4), e.set(r, r, r, r), t.set(i, i, i, i), this.clamp(e, t)
                }
            }(),
            floor: function() {
                return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this.w = Math.floor(this.w), this
            },
            ceil: function() {
                return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this.w = Math.ceil(this.w), this
            },
            round: function() {
                return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this.w = Math.round(this.w), this
            },
            roundToZero: function() {
                return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x), this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y), this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z), this.w = this.w < 0 ? Math.ceil(this.w) : Math.floor(this.w), this
            },
            negate: function() {
                return this.x = -this.x, this.y = -this.y, this.z = -this.z, this.w = -this.w, this
            },
            dot: function(e) {
                return this.x * e.x + this.y * e.y + this.z * e.z + this.w * e.w
            },
            lengthSq: function() {
                return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
            },
            length: function() {
                return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)
            },
            lengthManhattan: function() {
                return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w)
            },
            normalize: function() {
                return this.divideScalar(this.length())
            },
            setLength: function(e) {
                var t = this.length();
                return 0 !== t && e !== t && this.multiplyScalar(e / t), this
            },
            lerp: function(e, t) {
                return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this.w += (e.w - this.w) * t, this
            },
            equals: function(e) {
                return e.x === this.x && e.y === this.y && e.z === this.z && e.w === this.w
            },
            fromArray: function(e, t) {
                return void 0 === t && (t = 0), this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this.w = e[t + 3], this
            },
            toArray: function(e, t) {
                return void 0 === e && (e = []), void 0 === t && (t = 0), e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e[t + 3] = this.w, e
            },
            clone: function() {
                return new n.Vector4(this.x, this.y, this.z, this.w)
            }
        }, n.Euler = function(e, t, r, i) {
            this._x = e || 0, this._y = t || 0, this._z = r || 0, this._order = i || n.Euler.DefaultOrder
        }, n.Euler.RotationOrders = ["XYZ", "YZX", "ZXY", "XZY", "YXZ", "ZYX"], n.Euler.DefaultOrder = "XYZ", n.Euler.prototype = {
            constructor: n.Euler,
            _x: 0,
            _y: 0,
            _z: 0,
            _order: n.Euler.DefaultOrder,
            get x() {
                return this._x
            },
            set x(e) {
                this._x = e, this.onChangeCallback()
            },
            get y() {
                return this._y
            },
            set y(e) {
                this._y = e, this.onChangeCallback()
            },
            get z() {
                return this._z
            },
            set z(e) {
                this._z = e, this.onChangeCallback()
            },
            get order() {
                return this._order
            },
            set order(e) {
                this._order = e, this.onChangeCallback()
            },
            set: function(e, t, r, i) {
                return this._x = e, this._y = t, this._z = r, this._order = i || this._order, this.onChangeCallback(), this
            },
            copy: function(e) {
                return this._x = e._x, this._y = e._y, this._z = e._z, this._order = e._order, this.onChangeCallback(), this
            },
            setFromRotationMatrix: function(e, t) {
                var r = n.Math.clamp,
                    i = e.elements,
                    o = i[0],
                    a = i[4],
                    s = i[8],
                    h = i[1],
                    l = i[5],
                    u = i[9],
                    c = i[2],
                    f = i[6],
                    p = i[10];
                return t = t || this._order, "XYZ" === t ? (this._y = Math.asin(r(s, -1, 1)), Math.abs(s) < .99999 ? (this._x = Math.atan2(-u, p), this._z = Math.atan2(-a, o)) : (this._x = Math.atan2(f, l), this._z = 0)) : "YXZ" === t ? (this._x = Math.asin(-r(u, -1, 1)), Math.abs(u) < .99999 ? (this._y = Math.atan2(s, p), this._z = Math.atan2(h, l)) : (this._y = Math.atan2(-c, o), this._z = 0)) : "ZXY" === t ? (this._x = Math.asin(r(f, -1, 1)), Math.abs(f) < .99999 ? (this._y = Math.atan2(-c, p), this._z = Math.atan2(-a, l)) : (this._y = 0, this._z = Math.atan2(h, o))) : "ZYX" === t ? (this._y = Math.asin(-r(c, -1, 1)), Math.abs(c) < .99999 ? (this._x = Math.atan2(f, p), this._z = Math.atan2(h, o)) : (this._x = 0, this._z = Math.atan2(-a, l))) : "YZX" === t ? (this._z = Math.asin(r(h, -1, 1)), Math.abs(h) < .99999 ? (this._x = Math.atan2(-u, l), this._y = Math.atan2(-c, o)) : (this._x = 0, this._y = Math.atan2(s, p))) : "XZY" === t ? (this._z = Math.asin(-r(a, -1, 1)), Math.abs(a) < .99999 ? (this._x = Math.atan2(f, l), this._y = Math.atan2(s, o)) : (this._x = Math.atan2(-u, p), this._y = 0)) : console.warn("THREE.Euler: .setFromRotationMatrix() given unsupported order: " + t), this._order = t, this.onChangeCallback(), this
            },
            setFromQuaternion: function(e, t, r) {
                var i = n.Math.clamp,
                    o = e.x * e.x,
                    a = e.y * e.y,
                    s = e.z * e.z,
                    h = e.w * e.w;
                return t = t || this._order, "XYZ" === t ? (this._x = Math.atan2(2 * (e.x * e.w - e.y * e.z), h - o - a + s), this._y = Math.asin(i(2 * (e.x * e.z + e.y * e.w), -1, 1)), this._z = Math.atan2(2 * (e.z * e.w - e.x * e.y), h + o - a - s)) : "YXZ" === t ? (this._x = Math.asin(i(2 * (e.x * e.w - e.y * e.z), -1, 1)), this._y = Math.atan2(2 * (e.x * e.z + e.y * e.w), h - o - a + s), this._z = Math.atan2(2 * (e.x * e.y + e.z * e.w), h - o + a - s)) : "ZXY" === t ? (this._x = Math.asin(i(2 * (e.x * e.w + e.y * e.z), -1, 1)), this._y = Math.atan2(2 * (e.y * e.w - e.z * e.x), h - o - a + s), this._z = Math.atan2(2 * (e.z * e.w - e.x * e.y), h - o + a - s)) : "ZYX" === t ? (this._x = Math.atan2(2 * (e.x * e.w + e.z * e.y), h - o - a + s), this._y = Math.asin(i(2 * (e.y * e.w - e.x * e.z), -1, 1)), this._z = Math.atan2(2 * (e.x * e.y + e.z * e.w), h + o - a - s)) : "YZX" === t ? (this._x = Math.atan2(2 * (e.x * e.w - e.z * e.y), h - o + a - s), this._y = Math.atan2(2 * (e.y * e.w - e.x * e.z), h + o - a - s), this._z = Math.asin(i(2 * (e.x * e.y + e.z * e.w), -1, 1))) : "XZY" === t ? (this._x = Math.atan2(2 * (e.x * e.w + e.y * e.z), h - o + a - s), this._y = Math.atan2(2 * (e.x * e.z + e.y * e.w), h + o - a - s), this._z = Math.asin(i(2 * (e.z * e.w - e.x * e.y), -1, 1))) : console.warn("THREE.Euler: .setFromQuaternion() given unsupported order: " + t), this._order = t, r !== !1 && this.onChangeCallback(), this
            },
            reorder: function() {
                var e = new n.Quaternion;
                return function(t) {
                    e.setFromEuler(this), this.setFromQuaternion(e, t)
                }
            }(),
            equals: function(e) {
                return e._x === this._x && e._y === this._y && e._z === this._z && e._order === this._order
            },
            fromArray: function(e) {
                return this._x = e[0], this._y = e[1], this._z = e[2], void 0 !== e[3] && (this._order = e[3]), this.onChangeCallback(), this
            },
            toArray: function() {
                return [this._x, this._y, this._z, this._order]
            },
            onChange: function(e) {
                return this.onChangeCallback = e, this
            },
            onChangeCallback: function() {},
            clone: function() {
                return new n.Euler(this._x, this._y, this._z, this._order)
            }
        }, n.Line3 = function(e, t) {
            this.start = void 0 !== e ? e : new n.Vector3, this.end = void 0 !== t ? t : new n.Vector3
        }, n.Line3.prototype = {
            constructor: n.Line3,
            set: function(e, t) {
                return this.start.copy(e), this.end.copy(t), this
            },
            copy: function(e) {
                return this.start.copy(e.start), this.end.copy(e.end), this
            },
            center: function(e) {
                var t = e || new n.Vector3;
                return t.addVectors(this.start, this.end).multiplyScalar(.5)
            },
            delta: function(e) {
                var t = e || new n.Vector3;
                return t.subVectors(this.end, this.start)
            },
            distanceSq: function() {
                return this.start.distanceToSquared(this.end)
            },
            distance: function() {
                return this.start.distanceTo(this.end)
            },
            at: function(e, t) {
                var r = t || new n.Vector3;
                return this.delta(r).multiplyScalar(e).add(this.start)
            },
            closestPointToPointParameter: function() {
                var e = new n.Vector3,
                    t = new n.Vector3;
                return function(r, i) {
                    e.subVectors(r, this.start), t.subVectors(this.end, this.start);
                    var o = t.dot(t),
                        a = t.dot(e),
                        s = a / o;
                    return i && (s = n.Math.clamp(s, 0, 1)), s
                }
            }(),
            closestPointToPoint: function(e, t, r) {
                var i = this.closestPointToPointParameter(e, t),
                    o = r || new n.Vector3;
                return this.delta(o).multiplyScalar(i).add(this.start)
            },
            applyMatrix4: function(e) {
                return this.start.applyMatrix4(e), this.end.applyMatrix4(e), this
            },
            equals: function(e) {
                return e.start.equals(this.start) && e.end.equals(this.end)
            },
            clone: function() {
                return (new n.Line3).copy(this)
            }
        }, n.Box2 = function(e, t) {
            this.min = void 0 !== e ? e : new n.Vector2(1 / 0, 1 / 0), this.max = void 0 !== t ? t : new n.Vector2(-(1 / 0), -(1 / 0))
        }, n.Box2.prototype = {
            constructor: n.Box2,
            set: function(e, t) {
                return this.min.copy(e), this.max.copy(t), this
            },
            setFromPoints: function(e) {
                this.makeEmpty();
                for (var t = 0, r = e.length; r > t; t++) this.expandByPoint(e[t]);
                return this
            },
            setFromCenterAndSize: function() {
                var e = new n.Vector2;
                return function(t, r) {
                    var i = e.copy(r).multiplyScalar(.5);
                    return this.min.copy(t).sub(i), this.max.copy(t).add(i), this
                }
            }(),
            copy: function(e) {
                return this.min.copy(e.min), this.max.copy(e.max), this
            },
            makeEmpty: function() {
                return this.min.x = this.min.y = 1 / 0, this.max.x = this.max.y = -(1 / 0), this
            },
            empty: function() {
                return this.max.x < this.min.x || this.max.y < this.min.y
            },
            center: function(e) {
                var t = e || new n.Vector2;
                return t.addVectors(this.min, this.max).multiplyScalar(.5)
            },
            size: function(e) {
                var t = e || new n.Vector2;
                return t.subVectors(this.max, this.min)
            },
            expandByPoint: function(e) {
                return this.min.min(e), this.max.max(e), this
            },
            expandByVector: function(e) {
                return this.min.sub(e), this.max.add(e), this
            },
            expandByScalar: function(e) {
                return this.min.addScalar(-e), this.max.addScalar(e), this
            },
            containsPoint: function(e) {
                return e.x < this.min.x || e.x > this.max.x || e.y < this.min.y || e.y > this.max.y ? !1 : !0
            },
            containsBox: function(e) {
                return this.min.x <= e.min.x && e.max.x <= this.max.x && this.min.y <= e.min.y && e.max.y <= this.max.y ? !0 : !1
            },
            getParameter: function(e, t) {
                var r = t || new n.Vector2;
                return r.set((e.x - this.min.x) / (this.max.x - this.min.x), (e.y - this.min.y) / (this.max.y - this.min.y))
            },
            isIntersectionBox: function(e) {
                return e.max.x < this.min.x || e.min.x > this.max.x || e.max.y < this.min.y || e.min.y > this.max.y ? !1 : !0
            },
            clampPoint: function(e, t) {
                var r = t || new n.Vector2;
                return r.copy(e).clamp(this.min, this.max)
            },
            distanceToPoint: function() {
                var e = new n.Vector2;
                return function(t) {
                    var r = e.copy(t).clamp(this.min, this.max);
                    return r.sub(t).length()
                }
            }(),
            intersect: function(e) {
                return this.min.max(e.min), this.max.min(e.max), this
            },
            union: function(e) {
                return this.min.min(e.min), this.max.max(e.max), this
            },
            translate: function(e) {
                return this.min.add(e),
                    this.max.add(e), this
            },
            equals: function(e) {
                return e.min.equals(this.min) && e.max.equals(this.max)
            },
            clone: function() {
                return (new n.Box2).copy(this)
            }
        }, n.Box3 = function(e, t) {
            this.min = void 0 !== e ? e : new n.Vector3(1 / 0, 1 / 0, 1 / 0), this.max = void 0 !== t ? t : new n.Vector3(-(1 / 0), -(1 / 0), -(1 / 0))
        }, n.Box3.prototype = {
            constructor: n.Box3,
            set: function(e, t) {
                return this.min.copy(e), this.max.copy(t), this
            },
            setFromPoints: function(e) {
                this.makeEmpty();
                for (var t = 0, r = e.length; r > t; t++) this.expandByPoint(e[t]);
                return this
            },
            setFromCenterAndSize: function() {
                var e = new n.Vector3;
                return function(t, r) {
                    var i = e.copy(r).multiplyScalar(.5);
                    return this.min.copy(t).sub(i), this.max.copy(t).add(i), this
                }
            }(),
            setFromObject: function() {
                var e = new n.Vector3;
                return function(t) {
                    var r = this;
                    return t.updateMatrixWorld(!0), this.makeEmpty(), t.traverse(function(t) {
                        var i = t.geometry;
                        if (void 0 !== i)
                            if (i instanceof n.Geometry)
                                for (var o = i.vertices, a = 0, s = o.length; s > a; a++) e.copy(o[a]), e.applyMatrix4(t.matrixWorld), r.expandByPoint(e);
                            else if (i instanceof n.BufferGeometry && void 0 !== i.attributes.position)
                                for (var h = i.attributes.position.array, a = 0, s = h.length; s > a; a += 3) e.set(h[a], h[a + 1], h[a + 2]), e.applyMatrix4(t.matrixWorld), r.expandByPoint(e)
                    }), this
                }
            }(),
            copy: function(e) {
                return this.min.copy(e.min), this.max.copy(e.max), this
            },
            makeEmpty: function() {
                return this.min.x = this.min.y = this.min.z = 1 / 0, this.max.x = this.max.y = this.max.z = -(1 / 0), this
            },
            empty: function() {
                return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z
            },
            center: function(e) {
                var t = e || new n.Vector3;
                return t.addVectors(this.min, this.max).multiplyScalar(.5)
            },
            size: function(e) {
                var t = e || new n.Vector3;
                return t.subVectors(this.max, this.min)
            },
            expandByPoint: function(e) {
                return this.min.min(e), this.max.max(e), this
            },
            expandByVector: function(e) {
                return this.min.sub(e), this.max.add(e), this
            },
            expandByScalar: function(e) {
                return this.min.addScalar(-e), this.max.addScalar(e), this
            },
            containsPoint: function(e) {
                return e.x < this.min.x || e.x > this.max.x || e.y < this.min.y || e.y > this.max.y || e.z < this.min.z || e.z > this.max.z ? !1 : !0
            },
            containsBox: function(e) {
                return this.min.x <= e.min.x && e.max.x <= this.max.x && this.min.y <= e.min.y && e.max.y <= this.max.y && this.min.z <= e.min.z && e.max.z <= this.max.z ? !0 : !1
            },
            getParameter: function(e, t) {
                var r = t || new n.Vector3;
                return r.set((e.x - this.min.x) / (this.max.x - this.min.x), (e.y - this.min.y) / (this.max.y - this.min.y), (e.z - this.min.z) / (this.max.z - this.min.z))
            },
            isIntersectionBox: function(e) {
                return e.max.x < this.min.x || e.min.x > this.max.x || e.max.y < this.min.y || e.min.y > this.max.y || e.max.z < this.min.z || e.min.z > this.max.z ? !1 : !0
            },
            clampPoint: function(e, t) {
                var r = t || new n.Vector3;
                return r.copy(e).clamp(this.min, this.max)
            },
            distanceToPoint: function() {
                var e = new n.Vector3;
                return function(t) {
                    var r = e.copy(t).clamp(this.min, this.max);
                    return r.sub(t).length()
                }
            }(),
            getBoundingSphere: function() {
                var e = new n.Vector3;
                return function(t) {
                    var r = t || new n.Sphere;
                    return r.center = this.center(), r.radius = .5 * this.size(e).length(), r
                }
            }(),
            intersect: function(e) {
                return this.min.max(e.min), this.max.min(e.max), this
            },
            union: function(e) {
                return this.min.min(e.min), this.max.max(e.max), this
            },
            applyMatrix4: function() {
                var e = [new n.Vector3, new n.Vector3, new n.Vector3, new n.Vector3, new n.Vector3, new n.Vector3, new n.Vector3, new n.Vector3];
                return function(t) {
                    return e[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(t), e[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(t), e[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(t), e[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(t), e[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(t), e[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(t), e[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(t), e[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(t), this.makeEmpty(), this.setFromPoints(e), this
                }
            }(),
            translate: function(e) {
                return this.min.add(e), this.max.add(e), this
            },
            equals: function(e) {
                return e.min.equals(this.min) && e.max.equals(this.max)
            },
            clone: function() {
                return (new n.Box3).copy(this)
            }
        }, n.Matrix3 = function() {
            this.elements = new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]), arguments.length > 0 && console.error("THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.")
        }, n.Matrix3.prototype = {
            constructor: n.Matrix3,
            set: function(e, t, r, i, n, o, a, s, h) {
                var l = this.elements;
                return l[0] = e, l[3] = t, l[6] = r, l[1] = i, l[4] = n, l[7] = o, l[2] = a, l[5] = s, l[8] = h, this
            },
            identity: function() {
                return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this
            },
            copy: function(e) {
                var t = e.elements;
                return this.set(t[0], t[3], t[6], t[1], t[4], t[7], t[2], t[5], t[8]), this
            },
            multiplyVector3: function(e) {
                return console.warn("THREE.Matrix3: .multiplyVector3() has been removed. Use vector.applyMatrix3( matrix ) instead."), e.applyMatrix3(this)
            },
            multiplyVector3Array: function(e) {
                return console.warn("THREE.Matrix3: .multiplyVector3Array() has been renamed. Use matrix.applyToVector3Array( array ) instead."), this.applyToVector3Array(e)
            },
            applyToVector3Array: function() {
                var e = new n.Vector3;
                return function(t, r, i) {
                    void 0 === r && (r = 0), void 0 === i && (i = t.length);
                    for (var n = 0, o = r; i > n; n += 3, o += 3) e.x = t[o], e.y = t[o + 1], e.z = t[o + 2], e.applyMatrix3(this), t[o] = e.x, t[o + 1] = e.y, t[o + 2] = e.z;
                    return t
                }
            }(),
            multiplyScalar: function(e) {
                var t = this.elements;
                return t[0] *= e, t[3] *= e, t[6] *= e, t[1] *= e, t[4] *= e, t[7] *= e, t[2] *= e, t[5] *= e, t[8] *= e, this
            },
            determinant: function() {
                var e = this.elements,
                    t = e[0],
                    r = e[1],
                    i = e[2],
                    n = e[3],
                    o = e[4],
                    a = e[5],
                    s = e[6],
                    h = e[7],
                    l = e[8];
                return t * o * l - t * a * h - r * n * l + r * a * s + i * n * h - i * o * s
            },
            getInverse: function(e, t) {
                var r = e.elements,
                    i = this.elements;
                i[0] = r[10] * r[5] - r[6] * r[9], i[1] = -r[10] * r[1] + r[2] * r[9], i[2] = r[6] * r[1] - r[2] * r[5], i[3] = -r[10] * r[4] + r[6] * r[8], i[4] = r[10] * r[0] - r[2] * r[8], i[5] = -r[6] * r[0] + r[2] * r[4], i[6] = r[9] * r[4] - r[5] * r[8], i[7] = -r[9] * r[0] + r[1] * r[8], i[8] = r[5] * r[0] - r[1] * r[4];
                var n = r[0] * i[0] + r[1] * i[3] + r[2] * i[6];
                if (0 === n) {
                    var o = "Matrix3.getInverse(): can't invert matrix, determinant is 0";
                    if (t) throw new Error(o);
                    return console.warn(o), this.identity(), this
                }
                return this.multiplyScalar(1 / n), this
            },
            transpose: function() {
                var e, t = this.elements;
                return e = t[1], t[1] = t[3], t[3] = e, e = t[2], t[2] = t[6], t[6] = e, e = t[5], t[5] = t[7], t[7] = e, this
            },
            flattenToArrayOffset: function(e, t) {
                var r = this.elements;
                return e[t] = r[0], e[t + 1] = r[1], e[t + 2] = r[2], e[t + 3] = r[3], e[t + 4] = r[4], e[t + 5] = r[5], e[t + 6] = r[6], e[t + 7] = r[7], e[t + 8] = r[8], e
            },
            getNormalMatrix: function(e) {
                return this.getInverse(e).transpose(), this
            },
            transposeIntoArray: function(e) {
                var t = this.elements;
                return e[0] = t[0], e[1] = t[3], e[2] = t[6], e[3] = t[1], e[4] = t[4], e[5] = t[7], e[6] = t[2], e[7] = t[5], e[8] = t[8], this
            },
            fromArray: function(e) {
                return this.elements.set(e), this
            },
            toArray: function() {
                var e = this.elements;
                return [e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8]]
            },
            clone: function() {
                return (new n.Matrix3).fromArray(this.elements)
            }
        }, n.Matrix4 = function() {
            this.elements = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]), arguments.length > 0 && console.error("THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.")
        }, n.Matrix4.prototype = {
            constructor: n.Matrix4,
            set: function(e, t, r, i, n, o, a, s, h, l, u, c, f, p, d, m) {
                var v = this.elements;
                return v[0] = e, v[4] = t, v[8] = r, v[12] = i, v[1] = n, v[5] = o, v[9] = a, v[13] = s, v[2] = h, v[6] = l, v[10] = u, v[14] = c, v[3] = f, v[7] = p, v[11] = d, v[15] = m, this
            },
            identity: function() {
                return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this
            },
            copy: function(e) {
                return this.elements.set(e.elements), this
            },
            extractPosition: function(e) {
                return console.warn("THREE.Matrix4: .extractPosition() has been renamed to .copyPosition()."), this.copyPosition(e)
            },
            copyPosition: function(e) {
                var t = this.elements,
                    r = e.elements;
                return t[12] = r[12], t[13] = r[13], t[14] = r[14], this
            },
            extractRotation: function() {
                var e = new n.Vector3;
                return function(t) {
                    var r = this.elements,
                        i = t.elements,
                        n = 1 / e.set(i[0], i[1], i[2]).length(),
                        o = 1 / e.set(i[4], i[5], i[6]).length(),
                        a = 1 / e.set(i[8], i[9], i[10]).length();
                    return r[0] = i[0] * n, r[1] = i[1] * n, r[2] = i[2] * n, r[4] = i[4] * o, r[5] = i[5] * o, r[6] = i[6] * o, r[8] = i[8] * a, r[9] = i[9] * a, r[10] = i[10] * a, this
                }
            }(),
            makeRotationFromEuler: function(e) {
                e instanceof n.Euler == !1 && console.error("THREE.Matrix: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.");
                var t = this.elements,
                    r = e.x,
                    i = e.y,
                    o = e.z,
                    a = Math.cos(r),
                    s = Math.sin(r),
                    h = Math.cos(i),
                    l = Math.sin(i),
                    u = Math.cos(o),
                    c = Math.sin(o);
                if ("XYZ" === e.order) {
                    var f = a * u,
                        p = a * c,
                        d = s * u,
                        m = s * c;
                    t[0] = h * u, t[4] = -h * c, t[8] = l, t[1] = p + d * l, t[5] = f - m * l, t[9] = -s * h, t[2] = m - f * l, t[6] = d + p * l, t[10] = a * h
                } else if ("YXZ" === e.order) {
                    var v = h * u,
                        g = h * c,
                        y = l * u,
                        x = l * c;
                    t[0] = v + x * s, t[4] = y * s - g, t[8] = a * l, t[1] = a * c, t[5] = a * u, t[9] = -s, t[2] = g * s - y, t[6] = x + v * s, t[10] = a * h
                } else if ("ZXY" === e.order) {
                    var v = h * u,
                        g = h * c,
                        y = l * u,
                        x = l * c;
                    t[0] = v - x * s, t[4] = -a * c, t[8] = y + g * s, t[1] = g + y * s, t[5] = a * u, t[9] = x - v * s, t[2] = -a * l, t[6] = s, t[10] = a * h
                } else if ("ZYX" === e.order) {
                    var f = a * u,
                        p = a * c,
                        d = s * u,
                        m = s * c;
                    t[0] = h * u, t[4] = d * l - p, t[8] = f * l + m, t[1] = h * c, t[5] = m * l + f, t[9] = p * l - d, t[2] = -l, t[6] = s * h, t[10] = a * h
                } else if ("YZX" === e.order) {
                    var w = a * h,
                        b = a * l,
                        _ = s * h,
                        M = s * l;
                    t[0] = h * u, t[4] = M - w * c, t[8] = _ * c + b, t[1] = c, t[5] = a * u, t[9] = -s * u, t[2] = -l * u, t[6] = b * c + _, t[10] = w - M * c
                } else if ("XZY" === e.order) {
                    var w = a * h,
                        b = a * l,
                        _ = s * h,
                        M = s * l;
                    t[0] = h * u, t[4] = -c, t[8] = l * u, t[1] = w * c + M, t[5] = a * u, t[9] = b * c - _, t[2] = _ * c - b, t[6] = s * u, t[10] = M * c + w
                }
                return t[3] = 0, t[7] = 0, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this
            },
            setRotationFromQuaternion: function(e) {
                return console.warn("THREE.Matrix4: .setRotationFromQuaternion() has been renamed to .makeRotationFromQuaternion()."), this.makeRotationFromQuaternion(e)
            },
            makeRotationFromQuaternion: function(e) {
                var t = this.elements,
                    r = e.x,
                    i = e.y,
                    n = e.z,
                    o = e.w,
                    a = r + r,
                    s = i + i,
                    h = n + n,
                    l = r * a,
                    u = r * s,
                    c = r * h,
                    f = i * s,
                    p = i * h,
                    d = n * h,
                    m = o * a,
                    v = o * s,
                    g = o * h;
                return t[0] = 1 - (f + d), t[4] = u - g, t[8] = c + v, t[1] = u + g, t[5] = 1 - (l + d), t[9] = p - m, t[2] = c - v, t[6] = p + m, t[10] = 1 - (l + f), t[3] = 0, t[7] = 0, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this
            },
            lookAt: function() {
                var e = new n.Vector3,
                    t = new n.Vector3,
                    r = new n.Vector3;
                return function(i, n, o) {
                    var a = this.elements;
                    return r.subVectors(i, n).normalize(), 0 === r.length() && (r.z = 1), e.crossVectors(o, r).normalize(), 0 === e.length() && (r.x += 1e-4, e.crossVectors(o, r).normalize()), t.crossVectors(r, e), a[0] = e.x, a[4] = t.x, a[8] = r.x, a[1] = e.y, a[5] = t.y, a[9] = r.y, a[2] = e.z, a[6] = t.z, a[10] = r.z, this
                }
            }(),
            multiply: function(e, t) {
                return void 0 !== t ? (console.warn("THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead."), this.multiplyMatrices(e, t)) : this.multiplyMatrices(this, e)
            },
            multiplyMatrices: function(e, t) {
                var r = e.elements,
                    i = t.elements,
                    n = this.elements,
                    o = r[0],
                    a = r[4],
                    s = r[8],
                    h = r[12],
                    l = r[1],
                    u = r[5],
                    c = r[9],
                    f = r[13],
                    p = r[2],
                    d = r[6],
                    m = r[10],
                    v = r[14],
                    g = r[3],
                    y = r[7],
                    x = r[11],
                    w = r[15],
                    b = i[0],
                    _ = i[4],
                    M = i[8],
                    S = i[12],
                    T = i[1],
                    A = i[5],
                    E = i[9],
                    C = i[13],
                    L = i[2],
                    P = i[6],
                    R = i[10],
                    D = i[14],
                    F = i[3],
                    U = i[7],
                    B = i[11],
                    k = i[15];
                return n[0] = o * b + a * T + s * L + h * F, n[4] = o * _ + a * A + s * P + h * U, n[8] = o * M + a * E + s * R + h * B, n[12] = o * S + a * C + s * D + h * k, n[1] = l * b + u * T + c * L + f * F, n[5] = l * _ + u * A + c * P + f * U, n[9] = l * M + u * E + c * R + f * B, n[13] = l * S + u * C + c * D + f * k, n[2] = p * b + d * T + m * L + v * F, n[6] = p * _ + d * A + m * P + v * U, n[10] = p * M + d * E + m * R + v * B, n[14] = p * S + d * C + m * D + v * k, n[3] = g * b + y * T + x * L + w * F, n[7] = g * _ + y * A + x * P + w * U, n[11] = g * M + y * E + x * R + w * B, n[15] = g * S + y * C + x * D + w * k, this
            },
            multiplyToArray: function(e, t, r) {
                var i = this.elements;
                return this.multiplyMatrices(e, t), r[0] = i[0], r[1] = i[1], r[2] = i[2], r[3] = i[3], r[4] = i[4], r[5] = i[5], r[6] = i[6], r[7] = i[7], r[8] = i[8], r[9] = i[9], r[10] = i[10], r[11] = i[11], r[12] = i[12], r[13] = i[13], r[14] = i[14], r[15] = i[15], this
            },
            multiplyScalar: function(e) {
                var t = this.elements;
                return t[0] *= e, t[4] *= e, t[8] *= e, t[12] *= e, t[1] *= e, t[5] *= e, t[9] *= e, t[13] *= e, t[2] *= e, t[6] *= e, t[10] *= e, t[14] *= e, t[3] *= e, t[7] *= e, t[11] *= e, t[15] *= e, this
            },
            multiplyVector3: function(e) {
                return console.warn("THREE.Matrix4: .multiplyVector3() has been removed. Use vector.applyMatrix4( matrix ) or vector.applyProjection( matrix ) instead."), e.applyProjection(this)
            },
            multiplyVector4: function(e) {
                return console.warn("THREE.Matrix4: .multiplyVector4() has been removed. Use vector.applyMatrix4( matrix ) instead."), e.applyMatrix4(this)
            },
            multiplyVector3Array: function(e) {
                return console.warn("THREE.Matrix4: .multiplyVector3Array() has been renamed. Use matrix.applyToVector3Array( array ) instead."), this.applyToVector3Array(e)
            },
            applyToVector3Array: function() {
                var e = new n.Vector3;
                return function(t, r, i) {
                    void 0 === r && (r = 0), void 0 === i && (i = t.length);
                    for (var n = 0, o = r; i > n; n += 3, o += 3) e.x = t[o], e.y = t[o + 1], e.z = t[o + 2], e.applyMatrix4(this), t[o] = e.x, t[o + 1] = e.y, t[o + 2] = e.z;
                    return t
                }
            }(),
            rotateAxis: function(e) {
                console.warn("THREE.Matrix4: .rotateAxis() has been removed. Use Vector3.transformDirection( matrix ) instead."), e.transformDirection(this)
            },
            crossVector: function(e) {
                return console.warn("THREE.Matrix4: .crossVector() has been removed. Use vector.applyMatrix4( matrix ) instead."), e.applyMatrix4(this)
            },
            determinant: function() {
                var e = this.elements,
                    t = e[0],
                    r = e[4],
                    i = e[8],
                    n = e[12],
                    o = e[1],
                    a = e[5],
                    s = e[9],
                    h = e[13],
                    l = e[2],
                    u = e[6],
                    c = e[10],
                    f = e[14],
                    p = e[3],
                    d = e[7],
                    m = e[11],
                    v = e[15];
                return p * (+n * s * u - i * h * u - n * a * c + r * h * c + i * a * f - r * s * f) + d * (+t * s * f - t * h * c + n * o * c - i * o * f + i * h * l - n * s * l) + m * (+t * h * u - t * a * f - n * o * u + r * o * f + n * a * l - r * h * l) + v * (-i * a * l - t * s * u + t * a * c + i * o * u - r * o * c + r * s * l)
            },
            transpose: function() {
                var e, t = this.elements;
                return e = t[1], t[1] = t[4], t[4] = e, e = t[2], t[2] = t[8], t[8] = e, e = t[6], t[6] = t[9], t[9] = e, e = t[3], t[3] = t[12], t[12] = e, e = t[7], t[7] = t[13], t[13] = e, e = t[11], t[11] = t[14], t[14] = e, this
            },
            flattenToArrayOffset: function(e, t) {
                var r = this.elements;
                return e[t] = r[0], e[t + 1] = r[1], e[t + 2] = r[2], e[t + 3] = r[3], e[t + 4] = r[4], e[t + 5] = r[5], e[t + 6] = r[6], e[t + 7] = r[7], e[t + 8] = r[8], e[t + 9] = r[9], e[t + 10] = r[10], e[t + 11] = r[11], e[t + 12] = r[12], e[t + 13] = r[13], e[t + 14] = r[14], e[t + 15] = r[15], e
            },
            getPosition: function() {
                var e = new n.Vector3;
                return function() {
                    console.warn("THREE.Matrix4: .getPosition() has been removed. Use Vector3.setFromMatrixPosition( matrix ) instead.");
                    var t = this.elements;
                    return e.set(t[12], t[13], t[14])
                }
            }(),
            setPosition: function(e) {
                var t = this.elements;
                return t[12] = e.x, t[13] = e.y, t[14] = e.z, this
            },
            getInverse: function(e, t) {
                var r = this.elements,
                    i = e.elements,
                    n = i[0],
                    o = i[4],
                    a = i[8],
                    s = i[12],
                    h = i[1],
                    l = i[5],
                    u = i[9],
                    c = i[13],
                    f = i[2],
                    p = i[6],
                    d = i[10],
                    m = i[14],
                    v = i[3],
                    g = i[7],
                    y = i[11],
                    x = i[15];
                r[0] = u * m * g - c * d * g + c * p * y - l * m * y - u * p * x + l * d * x, r[4] = s * d * g - a * m * g - s * p * y + o * m * y + a * p * x - o * d * x, r[8] = a * c * g - s * u * g + s * l * y - o * c * y - a * l * x + o * u * x, r[12] = s * u * p - a * c * p - s * l * d + o * c * d + a * l * m - o * u * m, r[1] = c * d * v - u * m * v - c * f * y + h * m * y + u * f * x - h * d * x, r[5] = a * m * v - s * d * v + s * f * y - n * m * y - a * f * x + n * d * x, r[9] = s * u * v - a * c * v - s * h * y + n * c * y + a * h * x - n * u * x, r[13] = a * c * f - s * u * f + s * h * d - n * c * d - a * h * m + n * u * m, r[2] = l * m * v - c * p * v + c * f * g - h * m * g - l * f * x + h * p * x, r[6] = s * p * v - o * m * v - s * f * g + n * m * g + o * f * x - n * p * x, r[10] = o * c * v - s * l * v + s * h * g - n * c * g - o * h * x + n * l * x, r[14] = s * l * f - o * c * f - s * h * p + n * c * p + o * h * m - n * l * m, r[3] = u * p * v - l * d * v - u * f * g + h * d * g + l * f * y - h * p * y, r[7] = o * d * v - a * p * v + a * f * g - n * d * g - o * f * y + n * p * y, r[11] = a * l * v - o * u * v - a * h * g + n * u * g + o * h * y - n * l * y, r[15] = o * u * f - a * l * f + a * h * p - n * u * p - o * h * d + n * l * d;
                var w = n * r[0] + h * r[4] + f * r[8] + v * r[12];
                if (0 == w) {
                    var b = "Matrix4.getInverse(): can't invert matrix, determinant is 0";
                    if (t) throw new Error(b);
                    return console.warn(b), this.identity(), this
                }
                return this.multiplyScalar(1 / w), this
            },
            translate: function(e) {
                console.warn("THREE.Matrix4: .translate() has been removed.")
            },
            rotateX: function(e) {
                console.warn("THREE.Matrix4: .rotateX() has been removed.")
            },
            rotateY: function(e) {
                console.warn("THREE.Matrix4: .rotateY() has been removed.")
            },
            rotateZ: function(e) {
                console.warn("THREE.Matrix4: .rotateZ() has been removed.")
            },
            rotateByAxis: function(e, t) {
                console.warn("THREE.Matrix4: .rotateByAxis() has been removed.")
            },
            scale: function(e) {
                var t = this.elements,
                    r = e.x,
                    i = e.y,
                    n = e.z;
                return t[0] *= r, t[4] *= i, t[8] *= n, t[1] *= r, t[5] *= i, t[9] *= n, t[2] *= r, t[6] *= i, t[10] *= n, t[3] *= r, t[7] *= i, t[11] *= n, this
            },
            getMaxScaleOnAxis: function() {
                var e = this.elements,
                    t = e[0] * e[0] + e[1] * e[1] + e[2] * e[2],
                    r = e[4] * e[4] + e[5] * e[5] + e[6] * e[6],
                    i = e[8] * e[8] + e[9] * e[9] + e[10] * e[10];
                return Math.sqrt(Math.max(t, Math.max(r, i)))
            },
            makeTranslation: function(e, t, r) {
                return this.set(1, 0, 0, e, 0, 1, 0, t, 0, 0, 1, r, 0, 0, 0, 1), this
            },
            makeRotationX: function(e) {
                var t = Math.cos(e),
                    r = Math.sin(e);
                return this.set(1, 0, 0, 0, 0, t, -r, 0, 0, r, t, 0, 0, 0, 0, 1), this
            },
            makeRotationY: function(e) {
                var t = Math.cos(e),
                    r = Math.sin(e);
                return this.set(t, 0, r, 0, 0, 1, 0, 0, -r, 0, t, 0, 0, 0, 0, 1), this
            },
            makeRotationZ: function(e) {
                var t = Math.cos(e),
                    r = Math.sin(e);
                return this.set(t, -r, 0, 0, r, t, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this
            },
            makeRotationAxis: function(e, t) {
                var r = Math.cos(t),
                    i = Math.sin(t),
                    n = 1 - r,
                    o = e.x,
                    a = e.y,
                    s = e.z,
                    h = n * o,
                    l = n * a;
                return this.set(h * o + r, h * a - i * s, h * s + i * a, 0, h * a + i * s, l * a + r, l * s - i * o, 0, h * s - i * a, l * s + i * o, n * s * s + r, 0, 0, 0, 0, 1), this
            },
            makeScale: function(e, t, r) {
                return this.set(e, 0, 0, 0, 0, t, 0, 0, 0, 0, r, 0, 0, 0, 0, 1), this
            },
            compose: function(e, t, r) {
                return this.makeRotationFromQuaternion(t), this.scale(r), this.setPosition(e), this
            },
            decompose: function() {
                var e = new n.Vector3,
                    t = new n.Matrix4;
                return function(r, i, n) {
                    var o = this.elements,
                        a = e.set(o[0], o[1], o[2]).length(),
                        s = e.set(o[4], o[5], o[6]).length(),
                        h = e.set(o[8], o[9], o[10]).length(),
                        l = this.determinant();
                    0 > l && (a = -a), r.x = o[12], r.y = o[13], r.z = o[14], t.elements.set(this.elements);
                    var u = 1 / a,
                        c = 1 / s,
                        f = 1 / h;
                    return t.elements[0] *= u, t.elements[1] *= u, t.elements[2] *= u, t.elements[4] *= c, t.elements[5] *= c, t.elements[6] *= c, t.elements[8] *= f, t.elements[9] *= f, t.elements[10] *= f, i.setFromRotationMatrix(t), n.x = a, n.y = s, n.z = h, this
                }
            }(),
            makeFrustum: function(e, t, r, i, n, o) {
                var a = this.elements,
                    s = 2 * n / (t - e),
                    h = 2 * n / (i - r),
                    l = (t + e) / (t - e),
                    u = (i + r) / (i - r),
                    c = -(o + n) / (o - n),
                    f = -2 * o * n / (o - n);
                return a[0] = s, a[4] = 0, a[8] = l, a[12] = 0, a[1] = 0, a[5] = h, a[9] = u, a[13] = 0, a[2] = 0, a[6] = 0, a[10] = c, a[14] = f, a[3] = 0, a[7] = 0, a[11] = -1, a[15] = 0, this
            },
            makePerspective: function(e, t, r, i) {
                var o = r * Math.tan(n.Math.degToRad(.5 * e)),
                    a = -o,
                    s = a * t,
                    h = o * t;
                return this.makeFrustum(s, h, a, o, r, i)
            },
            makeOrthographic: function(e, t, r, i, n, o) {
                var a = this.elements,
                    s = t - e,
                    h = r - i,
                    l = o - n,
                    u = (t + e) / s,
                    c = (r + i) / h,
                    f = (o + n) / l;
                return a[0] = 2 / s, a[4] = 0, a[8] = 0, a[12] = -u, a[1] = 0, a[5] = 2 / h, a[9] = 0, a[13] = -c, a[2] = 0, a[6] = 0, a[10] = -2 / l, a[14] = -f, a[3] = 0, a[7] = 0, a[11] = 0, a[15] = 1, this
            },
            fromArray: function(e) {
                return this.elements.set(e), this
            },
            toArray: function() {
                var e = this.elements;
                return [e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10], e[11], e[12], e[13], e[14], e[15]]
            },
            clone: function() {
                return (new n.Matrix4).fromArray(this.elements)
            }
        }, n.Ray = function(e, t) {
            this.origin = void 0 !== e ? e : new n.Vector3, this.direction = void 0 !== t ? t : new n.Vector3
        }, n.Ray.prototype = {
            constructor: n.Ray,
            set: function(e, t) {
                return this.origin.copy(e), this.direction.copy(t), this
            },
            copy: function(e) {
                return this.origin.copy(e.origin), this.direction.copy(e.direction), this
            },
            at: function(e, t) {
                var r = t || new n.Vector3;
                return r.copy(this.direction).multiplyScalar(e).add(this.origin)
            },
            recast: function() {
                var e = new n.Vector3;
                return function(t) {
                    return this.origin.copy(this.at(t, e)), this
                }
            }(),
            closestPointToPoint: function(e, t) {
                var r = t || new n.Vector3;
                r.subVectors(e, this.origin);
                var i = r.dot(this.direction);
                return 0 > i ? r.copy(this.origin) : r.copy(this.direction).multiplyScalar(i).add(this.origin)
            },
            distanceToPoint: function() {
                var e = new n.Vector3;
                return function(t) {
                    var r = e.subVectors(t, this.origin).dot(this.direction);
                    return 0 > r ? this.origin.distanceTo(t) : (e.copy(this.direction).multiplyScalar(r).add(this.origin), e.distanceTo(t))
                }
            }(),
            distanceSqToSegment: function(e, t, r, i) {
                var n, o, a, s, h = e.clone().add(t).multiplyScalar(.5),
                    l = t.clone().sub(e).normalize(),
                    u = .5 * e.distanceTo(t),
                    c = this.origin.clone().sub(h),
                    f = -this.direction.dot(l),
                    p = c.dot(this.direction),
                    d = -c.dot(l),
                    m = c.lengthSq(),
                    v = Math.abs(1 - f * f);
                if (v >= 0)
                    if (n = f * d - p, o = f * p - d, s = u * v, n >= 0)
                        if (o >= -s)
                            if (s >= o) {
                                var g = 1 / v;
                                n *= g, o *= g, a = n * (n + f * o + 2 * p) + o * (f * n + o + 2 * d) + m
                            } else o = u, n = Math.max(0, -(f * o + p)), a = -n * n + o * (o + 2 * d) + m;
                        else o = -u, n = Math.max(0, -(f * o + p)), a = -n * n + o * (o + 2 * d) + m;
                    else -s >= o ? (n = Math.max(0, -(-f * u + p)), o = n > 0 ? -u : Math.min(Math.max(-u, -d), u), a = -n * n + o * (o + 2 * d) + m) : s >= o ? (n = 0, o = Math.min(Math.max(-u, -d), u), a = o * (o + 2 * d) + m) : (n = Math.max(0, -(f * u + p)), o = n > 0 ? u : Math.min(Math.max(-u, -d), u), a = -n * n + o * (o + 2 * d) + m);
                else o = f > 0 ? -u : u, n = Math.max(0, -(f * o + p)), a = -n * n + o * (o + 2 * d) + m;
                return r && r.copy(this.direction.clone().multiplyScalar(n).add(this.origin)), i && i.copy(l.clone().multiplyScalar(o).add(h)), a
            },
            isIntersectionSphere: function(e) {
                return this.distanceToPoint(e.center) <= e.radius
            },
            intersectSphere: function() {
                var e = new n.Vector3;
                return function(t, r) {
                    e.subVectors(t.center, this.origin);
                    var i = e.dot(this.direction),
                        n = e.dot(e) - i * i,
                        o = t.radius * t.radius;
                    if (n > o) return null;
                    var a = Math.sqrt(o - n),
                        s = i - a,
                        h = i + a;
                    return 0 > s && 0 > h ? null : 0 > s ? this.at(h, r) : this.at(s, r)
                }
            }(),
            isIntersectionPlane: function(e) {
                var t = e.distanceToPoint(this.origin);
                if (0 === t) return !0;
                var r = e.normal.dot(this.direction);
                return 0 > r * t ? !0 : !1
            },
            distanceToPlane: function(e) {
                var t = e.normal.dot(this.direction);
                if (0 == t) return 0 == e.distanceToPoint(this.origin) ? 0 : null;
                var r = -(this.origin.dot(e.normal) + e.constant) / t;
                return r >= 0 ? r : null
            },
            intersectPlane: function(e, t) {
                var r = this.distanceToPlane(e);
                return null === r ? null : this.at(r, t)
            },
            isIntersectionBox: function() {
                var e = new n.Vector3;
                return function(t) {
                    return null !== this.intersectBox(t, e)
                }
            }(),
            intersectBox: function(e, t) {
                var r, i, n, o, a, s, h = 1 / this.direction.x,
                    l = 1 / this.direction.y,
                    u = 1 / this.direction.z,
                    c = this.origin;
                return h >= 0 ? (r = (e.min.x - c.x) * h, i = (e.max.x - c.x) * h) : (r = (e.max.x - c.x) * h, i = (e.min.x - c.x) * h), l >= 0 ? (n = (e.min.y - c.y) * l, o = (e.max.y - c.y) * l) : (n = (e.max.y - c.y) * l, o = (e.min.y - c.y) * l), r > o || n > i ? null : ((n > r || r !== r) && (r = n), (i > o || i !== i) && (i = o), u >= 0 ? (a = (e.min.z - c.z) * u, s = (e.max.z - c.z) * u) : (a = (e.max.z - c.z) * u, s = (e.min.z - c.z) * u), r > s || a > i ? null : ((a > r || r !== r) && (r = a), (i > s || i !== i) && (i = s), 0 > i ? null : this.at(r >= 0 ? r : i, t)))
            },
            intersectTriangle: function() {
                var e = new n.Vector3,
                    t = new n.Vector3,
                    r = new n.Vector3,
                    i = new n.Vector3;
                return function(n, o, a, s, h) {
                    t.subVectors(o, n), r.subVectors(a, n), i.crossVectors(t, r);
                    var l, u = this.direction.dot(i);
                    if (u > 0) {
                        if (s) return null;
                        l = 1
                    } else {
                        if (!(0 > u)) return null;
                        l = -1, u = -u
                    }
                    e.subVectors(this.origin, n);
                    var c = l * this.direction.dot(r.crossVectors(e, r));
                    if (0 > c) return null;
                    var f = l * this.direction.dot(t.cross(e));
                    if (0 > f) return null;
                    if (c + f > u) return null;
                    var p = -l * e.dot(i);
                    return 0 > p ? null : this.at(p / u, h)
                }
            }(),
            applyMatrix4: function(e) {
                return this.direction.add(this.origin).applyMatrix4(e), this.origin.applyMatrix4(e), this.direction.sub(this.origin), this.direction.normalize(), this
            },
            equals: function(e) {
                return e.origin.equals(this.origin) && e.direction.equals(this.direction)
            },
            clone: function() {
                return (new n.Ray).copy(this)
            }
        }, n.Sphere = function(e, t) {
            this.center = void 0 !== e ? e : new n.Vector3, this.radius = void 0 !== t ? t : 0
        }, n.Sphere.prototype = {
            constructor: n.Sphere,
            set: function(e, t) {
                return this.center.copy(e), this.radius = t, this
            },
            setFromPoints: function() {
                var e = new n.Box3;
                return function(t, r) {
                    var i = this.center;
                    void 0 !== r ? i.copy(r) : e.setFromPoints(t).center(i);
                    for (var n = 0, o = 0, a = t.length; a > o; o++) n = Math.max(n, i.distanceToSquared(t[o]));
                    return this.radius = Math.sqrt(n), this
                }
            }(),
            copy: function(e) {
                return this.center.copy(e.center), this.radius = e.radius, this
            },
            empty: function() {
                return this.radius <= 0
            },
            containsPoint: function(e) {
                return e.distanceToSquared(this.center) <= this.radius * this.radius
            },
            distanceToPoint: function(e) {
                return e.distanceTo(this.center) - this.radius
            },
            intersectsSphere: function(e) {
                var t = this.radius + e.radius;
                return e.center.distanceToSquared(this.center) <= t * t
            },
            clampPoint: function(e, t) {
                var r = this.center.distanceToSquared(e),
                    i = t || new n.Vector3;
                return i.copy(e), r > this.radius * this.radius && (i.sub(this.center).normalize(), i.multiplyScalar(this.radius).add(this.center)), i
            },
            getBoundingBox: function(e) {
                var t = e || new n.Box3;
                return t.set(this.center, this.center), t.expandByScalar(this.radius), t
            },
            applyMatrix4: function(e) {
                return this.center.applyMatrix4(e), this.radius = this.radius * e.getMaxScaleOnAxis(), this
            },
            translate: function(e) {
                return this.center.add(e), this
            },
            equals: function(e) {
                return e.center.equals(this.center) && e.radius === this.radius
            },
            clone: function() {
                return (new n.Sphere).copy(this)
            }
        }, n.Frustum = function(e, t, r, i, o, a) {
            this.planes = [void 0 !== e ? e : new n.Plane, void 0 !== t ? t : new n.Plane, void 0 !== r ? r : new n.Plane, void 0 !== i ? i : new n.Plane, void 0 !== o ? o : new n.Plane, void 0 !== a ? a : new n.Plane]
        }, n.Frustum.prototype = {
            constructor: n.Frustum,
            set: function(e, t, r, i, n, o) {
                var a = this.planes;
                return a[0].copy(e), a[1].copy(t), a[2].copy(r), a[3].copy(i), a[4].copy(n), a[5].copy(o), this
            },
            copy: function(e) {
                for (var t = this.planes, r = 0; 6 > r; r++) t[r].copy(e.planes[r]);
                return this
            },
            setFromMatrix: function(e) {
                var t = this.planes,
                    r = e.elements,
                    i = r[0],
                    n = r[1],
                    o = r[2],
                    a = r[3],
                    s = r[4],
                    h = r[5],
                    l = r[6],
                    u = r[7],
                    c = r[8],
                    f = r[9],
                    p = r[10],
                    d = r[11],
                    m = r[12],
                    v = r[13],
                    g = r[14],
                    y = r[15];
                return t[0].setComponents(a - i, u - s, d - c, y - m).normalize(), t[1].setComponents(a + i, u + s, d + c, y + m).normalize(), t[2].setComponents(a + n, u + h, d + f, y + v).normalize(), t[3].setComponents(a - n, u - h, d - f, y - v).normalize(), t[4].setComponents(a - o, u - l, d - p, y - g).normalize(), t[5].setComponents(a + o, u + l, d + p, y + g).normalize(), this
            },
            intersectsObject: function() {
                var e = new n.Sphere;
                return function(t) {
                    var r = t.geometry;
                    return null === r.boundingSphere && r.computeBoundingSphere(), e.copy(r.boundingSphere), e.applyMatrix4(t.matrixWorld), this.intersectsSphere(e)
                }
            }(),
            intersectsSphere: function(e) {
                for (var t = this.planes, r = e.center, i = -e.radius, n = 0; 6 > n; n++) {
                    var o = t[n].distanceToPoint(r);
                    if (i > o) return !1
                }
                return !0
            },
            intersectsBox: function() {
                var e = new n.Vector3,
                    t = new n.Vector3;
                return function(r) {
                    for (var i = this.planes, n = 0; 6 > n; n++) {
                        var o = i[n];
                        e.x = o.normal.x > 0 ? r.min.x : r.max.x, t.x = o.normal.x > 0 ? r.max.x : r.min.x, e.y = o.normal.y > 0 ? r.min.y : r.max.y, t.y = o.normal.y > 0 ? r.max.y : r.min.y, e.z = o.normal.z > 0 ? r.min.z : r.max.z, t.z = o.normal.z > 0 ? r.max.z : r.min.z;
                        var a = o.distanceToPoint(e),
                            s = o.distanceToPoint(t);
                        if (0 > a && 0 > s) return !1
                    }
                    return !0
                }
            }(),
            containsPoint: function(e) {
                for (var t = this.planes, r = 0; 6 > r; r++)
                    if (t[r].distanceToPoint(e) < 0) return !1;
                return !0
            },
            clone: function() {
                return (new n.Frustum).copy(this)
            }
        }, n.Plane = function(e, t) {
            this.normal = void 0 !== e ? e : new n.Vector3(1, 0, 0), this.constant = void 0 !== t ? t : 0
        }, n.Plane.prototype = {
            constructor: n.Plane,
            set: function(e, t) {
                return this.normal.copy(e), this.constant = t, this
            },
            setComponents: function(e, t, r, i) {
                return this.normal.set(e, t, r), this.constant = i, this
            },
            setFromNormalAndCoplanarPoint: function(e, t) {
                return this.normal.copy(e), this.constant = -t.dot(this.normal), this
            },
            setFromCoplanarPoints: function() {
                var e = new n.Vector3,
                    t = new n.Vector3;
                return function(r, i, n) {
                    var o = e.subVectors(n, i).cross(t.subVectors(r, i)).normalize();
                    return this.setFromNormalAndCoplanarPoint(o, r), this
                }
            }(),
            copy: function(e) {
                return this.normal.copy(e.normal), this.constant = e.constant, this
            },
            normalize: function() {
                var e = 1 / this.normal.length();
                return this.normal.multiplyScalar(e), this.constant *= e, this
            },
            negate: function() {
                return this.constant *= -1, this.normal.negate(), this
            },
            distanceToPoint: function(e) {
                return this.normal.dot(e) + this.constant
            },
            distanceToSphere: function(e) {
                return this.distanceToPoint(e.center) - e.radius
            },
            projectPoint: function(e, t) {
                return this.orthoPoint(e, t).sub(e).negate()
            },
            orthoPoint: function(e, t) {
                var r = this.distanceToPoint(e),
                    i = t || new n.Vector3;
                return i.copy(this.normal).multiplyScalar(r)
            },
            isIntersectionLine: function(e) {
                var t = this.distanceToPoint(e.start),
                    r = this.distanceToPoint(e.end);
                return 0 > t && r > 0 || 0 > r && t > 0
            },
            intersectLine: function() {
                var e = new n.Vector3;
                return function(t, r) {
                    var i = r || new n.Vector3,
                        o = t.delta(e),
                        a = this.normal.dot(o);
                    if (0 == a) return 0 == this.distanceToPoint(t.start) ? i.copy(t.start) : void 0;
                    var s = -(t.start.dot(this.normal) + this.constant) / a;
                    return 0 > s || s > 1 ? void 0 : i.copy(o).multiplyScalar(s).add(t.start)
                }
            }(),
            coplanarPoint: function(e) {
                var t = e || new n.Vector3;
                return t.copy(this.normal).multiplyScalar(-this.constant)
            },
            applyMatrix4: function() {
                var e = new n.Vector3,
                    t = new n.Vector3,
                    r = new n.Matrix3;
                return function(i, n) {
                    var o = n || r.getNormalMatrix(i),
                        a = e.copy(this.normal).applyMatrix3(o),
                        s = this.coplanarPoint(t);
                    return s.applyMatrix4(i), this.setFromNormalAndCoplanarPoint(a, s), this
                }
            }(),
            translate: function(e) {
                return this.constant = this.constant - e.dot(this.normal), this
            },
            equals: function(e) {
                return e.normal.equals(this.normal) && e.constant == this.constant
            },
            clone: function() {
                return (new n.Plane).copy(this)
            }
        }, n.Math = {
            generateUUID: function() {
                var e, t = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),
                    r = new Array(36),
                    i = 0;
                return function() {
                    for (var n = 0; 36 > n; n++) 8 == n || 13 == n || 18 == n || 23 == n ? r[n] = "-" : 14 == n ? r[n] = "4" : (2 >= i && (i = 33554432 + 16777216 * Math.random() | 0), e = 15 & i, i >>= 4, r[n] = t[19 == n ? 3 & e | 8 : e]);
                    return r.join("")
                }
            }(),
            clamp: function(e, t, r) {
                return t > e ? t : e > r ? r : e
            },
            clampBottom: function(e, t) {
                return t > e ? t : e
            },
            mapLinear: function(e, t, r, i, n) {
                return i + (e - t) * (n - i) / (r - t)
            },
            smoothstep: function(e, t, r) {
                return t >= e ? 0 : e >= r ? 1 : (e = (e - t) / (r - t), e * e * (3 - 2 * e))
            },
            smootherstep: function(e, t, r) {
                return t >= e ? 0 : e >= r ? 1 : (e = (e - t) / (r - t), e * e * e * (e * (6 * e - 15) + 10))
            },
            random16: function() {
                return (65280 * Math.random() + 255 * Math.random()) / 65535
            },
            randInt: function(e, t) {
                return e + Math.floor(Math.random() * (t - e + 1))
            },
            randFloat: function(e, t) {
                return e + Math.random() * (t - e)
            },
            randFloatSpread: function(e) {
                return e * (.5 - Math.random())
            },
            degToRad: function() {
                var e = Math.PI / 180;
                return function(t) {
                    return t * e
                }
            }(),
            radToDeg: function() {
                var e = 180 / Math.PI;
                return function(t) {
                    return t * e
                }
            }(),
            isPowerOfTwo: function(e) {
                return 0 === (e & e - 1) && 0 !== e
            }
        }, n.Spline = function(e) {
            function t(e, t, r, i, n, o, a) {
                var s = .5 * (r - e),
                    h = .5 * (i - t);
                return (2 * (t - r) + s + h) * a + (-3 * (t - r) - 2 * s - h) * o + s * n + t
            }
            this.points = e;
            var r, i, o, a, s, h, l, u, c, f = [],
                p = {
                    x: 0,
                    y: 0,
                    z: 0
                };
            this.initFromArray = function(e) {
                this.points = [];
                for (var t = 0; t < e.length; t++) this.points[t] = {
                    x: e[t][0],
                    y: e[t][1],
                    z: e[t][2]
                }
            }, this.getPoint = function(e) {
                return r = (this.points.length - 1) * e, i = Math.floor(r), o = r - i, f[0] = 0 === i ? i : i - 1, f[1] = i, f[2] = i > this.points.length - 2 ? this.points.length - 1 : i + 1, f[3] = i > this.points.length - 3 ? this.points.length - 1 : i + 2, h = this.points[f[0]], l = this.points[f[1]], u = this.points[f[2]], c = this.points[f[3]], a = o * o, s = o * a, p.x = t(h.x, l.x, u.x, c.x, o, a, s), p.y = t(h.y, l.y, u.y, c.y, o, a, s), p.z = t(h.z, l.z, u.z, c.z, o, a, s), p
            }, this.getControlPointsArray = function() {
                var e, t, r = this.points.length,
                    i = [];
                for (e = 0; r > e; e++) t = this.points[e], i[e] = [t.x, t.y, t.z];
                return i
            }, this.getLength = function(e) {
                var t, r, i, o, a = 0,
                    s = 0,
                    h = 0,
                    l = new n.Vector3,
                    u = new n.Vector3,
                    c = [],
                    f = 0;
                for (c[0] = 0, e || (e = 100), i = this.points.length * e, l.copy(this.points[0]), t = 1; i > t; t++) r = t / i, o = this.getPoint(r), u.copy(o), f += u.distanceTo(l), l.copy(o), a = (this.points.length - 1) * r, s = Math.floor(a), s != h && (c[s] = f, h = s);
                return c[c.length] = f, {
                    chunks: c,
                    total: f
                }
            }, this.reparametrizeByArcLength = function(e) {
                var t, r, i, o, a, s, h, l, u = [],
                    c = new n.Vector3,
                    f = this.getLength();
                for (u.push(c.copy(this.points[0]).clone()), t = 1; t < this.points.length; t++) {
                    for (s = f.chunks[t] - f.chunks[t - 1], h = Math.ceil(e * s / f.total), o = (t - 1) / (this.points.length - 1), a = t / (this.points.length - 1), r = 1; h - 1 > r; r++) i = o + r * (1 / h) * (a - o), l = this.getPoint(i), u.push(c.copy(l).clone());
                    u.push(c.copy(this.points[t]).clone())
                }
                this.points = u
            }
        }, n.Triangle = function(e, t, r) {
            this.a = void 0 !== e ? e : new n.Vector3, this.b = void 0 !== t ? t : new n.Vector3, this.c = void 0 !== r ? r : new n.Vector3
        }, n.Triangle.normal = function() {
            var e = new n.Vector3;
            return function(t, r, i, o) {
                var a = o || new n.Vector3;
                a.subVectors(i, r), e.subVectors(t, r), a.cross(e);
                var s = a.lengthSq();
                return s > 0 ? a.multiplyScalar(1 / Math.sqrt(s)) : a.set(0, 0, 0)
            }
        }(), n.Triangle.barycoordFromPoint = function() {
            var e = new n.Vector3,
                t = new n.Vector3,
                r = new n.Vector3;
            return function(i, o, a, s, h) {
                e.subVectors(s, o), t.subVectors(a, o), r.subVectors(i, o);
                var l = e.dot(e),
                    u = e.dot(t),
                    c = e.dot(r),
                    f = t.dot(t),
                    p = t.dot(r),
                    d = l * f - u * u,
                    m = h || new n.Vector3;
                if (0 == d) return m.set(-2, -1, -1);
                var v = 1 / d,
                    g = (f * c - u * p) * v,
                    y = (l * p - u * c) * v;
                return m.set(1 - g - y, y, g)
            }
        }(), n.Triangle.containsPoint = function() {
            var e = new n.Vector3;
            return function(t, r, i, o) {
                var a = n.Triangle.barycoordFromPoint(t, r, i, o, e);
                return a.x >= 0 && a.y >= 0 && a.x + a.y <= 1
            }
        }(), n.Triangle.prototype = {
            constructor: n.Triangle,
            set: function(e, t, r) {
                return this.a.copy(e), this.b.copy(t), this.c.copy(r), this
            },
            setFromPointsAndIndices: function(e, t, r, i) {
                return this.a.copy(e[t]), this.b.copy(e[r]), this.c.copy(e[i]), this
            },
            copy: function(e) {
                return this.a.copy(e.a), this.b.copy(e.b), this.c.copy(e.c), this
            },
            area: function() {
                var e = new n.Vector3,
                    t = new n.Vector3;
                return function() {
                    return e.subVectors(this.c, this.b), t.subVectors(this.a, this.b), .5 * e.cross(t).length()
                }
            }(),
            midpoint: function(e) {
                var t = e || new n.Vector3;
                return t.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3)
            },
            normal: function(e) {
                return n.Triangle.normal(this.a, this.b, this.c, e)
            },
            plane: function(e) {
                var t = e || new n.Plane;
                return t.setFromCoplanarPoints(this.a, this.b, this.c)
            },
            barycoordFromPoint: function(e, t) {
                return n.Triangle.barycoordFromPoint(e, this.a, this.b, this.c, t)
            },
            containsPoint: function(e) {
                return n.Triangle.containsPoint(e, this.a, this.b, this.c)
            },
            equals: function(e) {
                return e.a.equals(this.a) && e.b.equals(this.b) && e.c.equals(this.c)
            },
            clone: function() {
                return (new n.Triangle).copy(this)
            }
        }, n.Clock = function(e) {
            this.autoStart = void 0 !== e ? e : !0, this.startTime = 0, this.oldTime = 0, this.elapsedTime = 0, this.running = !1
        }, n.Clock.prototype = {
            constructor: n.Clock,
            start: function() {
                this.startTime = void 0 !== i.performance && void 0 !== i.performance.now ? i.performance.now() : Date.now(),
                    this.oldTime = this.startTime, this.running = !0
            },
            stop: function() {
                this.getElapsedTime(), this.running = !1
            },
            getElapsedTime: function() {
                return this.getDelta(), this.elapsedTime
            },
            getDelta: function() {
                var e = 0;
                if (this.autoStart && !this.running && this.start(), this.running) {
                    var t = void 0 !== i.performance && void 0 !== i.performance.now ? i.performance.now() : Date.now();
                    e = .001 * (t - this.oldTime), this.oldTime = t, this.elapsedTime += e
                }
                return e
            }
        }, n.EventDispatcher = function() {}, n.EventDispatcher.prototype = {
            constructor: n.EventDispatcher,
            apply: function(e) {
                e.addEventListener = n.EventDispatcher.prototype.addEventListener, e.hasEventListener = n.EventDispatcher.prototype.hasEventListener, e.removeEventListener = n.EventDispatcher.prototype.removeEventListener, e.dispatchEvent = n.EventDispatcher.prototype.dispatchEvent
            },
            addEventListener: function(e, t) {
                void 0 === this._listeners && (this._listeners = {});
                var r = this._listeners;
                void 0 === r[e] && (r[e] = []), -1 === r[e].indexOf(t) && r[e].push(t)
            },
            hasEventListener: function(e, t) {
                if (void 0 === this._listeners) return !1;
                var r = this._listeners;
                return void 0 !== r[e] && -1 !== r[e].indexOf(t) ? !0 : !1
            },
            removeEventListener: function(e, t) {
                if (void 0 !== this._listeners) {
                    var r = this._listeners,
                        i = r[e];
                    if (void 0 !== i) {
                        var n = i.indexOf(t); - 1 !== n && i.splice(n, 1)
                    }
                }
            },
            dispatchEvent: function(e) {
                if (void 0 !== this._listeners) {
                    var t = this._listeners,
                        r = t[e.type];
                    if (void 0 !== r) {
                        e.target = this;
                        for (var i = [], n = r.length, o = 0; n > o; o++) i[o] = r[o];
                        for (var o = 0; n > o; o++) i[o].call(this, e)
                    }
                }
            }
        },
        function(e) {
            e.Raycaster = function(t, r, i, n) {
                this.ray = new e.Ray(t, r), this.near = i || 0, this.far = n || 1 / 0, this.params = {
                    Sprite: {},
                    Mesh: {},
                    PointCloud: {
                        threshold: 1
                    },
                    LOD: {},
                    Line: {}
                }
            };
            var t = function(e, t) {
                    return e.distance - t.distance
                },
                r = function(e, t, i, n) {
                    if (e.raycast(t, i), n === !0)
                        for (var o = e.children, a = 0, s = o.length; s > a; a++) r(o[a], t, i, !0)
                };
            e.Raycaster.prototype = {
                constructor: e.Raycaster,
                precision: 1e-4,
                linePrecision: 1,
                set: function(e, t) {
                    this.ray.set(e, t)
                },
                intersectObject: function(e, i) {
                    var n = [];
                    return r(e, this, n, i), n.sort(t), n
                },
                intersectObjects: function(e, i) {
                    var n = [];
                    if (e instanceof Array == !1) return console.log("THREE.Raycaster.intersectObjects: objects is not an Array."), n;
                    for (var o = 0, a = e.length; a > o; o++) r(e[o], this, n, i);
                    return n.sort(t), n
                }
            }
        }(n), n.Object3D = function() {
            Object.defineProperty(this, "id", {
                value: n.Object3DIdCount++
            }), this.uuid = n.Math.generateUUID(), this.name = "", this.type = "Object3D", this.parent = void 0, this.children = [], this.up = n.Object3D.DefaultUp.clone();
            var e = new n.Vector3,
                t = new n.Euler,
                r = new n.Quaternion,
                i = new n.Vector3(1, 1, 1),
                o = function() {
                    r.setFromEuler(t, !1)
                },
                a = function() {
                    t.setFromQuaternion(r, void 0, !1)
                };
            t.onChange(o), r.onChange(a), Object.defineProperties(this, {
                position: {
                    enumerable: !0,
                    value: e
                },
                rotation: {
                    enumerable: !0,
                    value: t
                },
                quaternion: {
                    enumerable: !0,
                    value: r
                },
                scale: {
                    enumerable: !0,
                    value: i
                }
            }), this.renderDepth = null, this.rotationAutoUpdate = !0, this.matrix = new n.Matrix4, this.matrixWorld = new n.Matrix4, this.matrixAutoUpdate = !0, this.matrixWorldNeedsUpdate = !1, this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.userData = {}
        }, n.Object3D.DefaultUp = new n.Vector3(0, 1, 0), n.Object3D.prototype = {
            constructor: n.Object3D,
            get eulerOrder() {
                return console.warn("THREE.Object3D: .eulerOrder has been moved to .rotation.order."), this.rotation.order
            },
            set eulerOrder(e) {
                console.warn("THREE.Object3D: .eulerOrder has been moved to .rotation.order."), this.rotation.order = e
            },
            get useQuaternion() {
                console.warn("THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.")
            },
            set useQuaternion(e) {
                console.warn("THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.")
            },
            applyMatrix: function(e) {
                this.matrix.multiplyMatrices(e, this.matrix), this.matrix.decompose(this.position, this.quaternion, this.scale)
            },
            setRotationFromAxisAngle: function(e, t) {
                this.quaternion.setFromAxisAngle(e, t)
            },
            setRotationFromEuler: function(e) {
                this.quaternion.setFromEuler(e, !0)
            },
            setRotationFromMatrix: function(e) {
                this.quaternion.setFromRotationMatrix(e)
            },
            setRotationFromQuaternion: function(e) {
                this.quaternion.copy(e)
            },
            rotateOnAxis: function() {
                var e = new n.Quaternion;
                return function(t, r) {
                    return e.setFromAxisAngle(t, r), this.quaternion.multiply(e), this
                }
            }(),
            rotateX: function() {
                var e = new n.Vector3(1, 0, 0);
                return function(t) {
                    return this.rotateOnAxis(e, t)
                }
            }(),
            rotateY: function() {
                var e = new n.Vector3(0, 1, 0);
                return function(t) {
                    return this.rotateOnAxis(e, t)
                }
            }(),
            rotateZ: function() {
                var e = new n.Vector3(0, 0, 1);
                return function(t) {
                    return this.rotateOnAxis(e, t)
                }
            }(),
            translateOnAxis: function() {
                var e = new n.Vector3;
                return function(t, r) {
                    return e.copy(t).applyQuaternion(this.quaternion), this.position.add(e.multiplyScalar(r)), this
                }
            }(),
            translate: function(e, t) {
                return console.warn("THREE.Object3D: .translate() has been removed. Use .translateOnAxis( axis, distance ) instead."), this.translateOnAxis(t, e)
            },
            translateX: function() {
                var e = new n.Vector3(1, 0, 0);
                return function(t) {
                    return this.translateOnAxis(e, t)
                }
            }(),
            translateY: function() {
                var e = new n.Vector3(0, 1, 0);
                return function(t) {
                    return this.translateOnAxis(e, t)
                }
            }(),
            translateZ: function() {
                var e = new n.Vector3(0, 0, 1);
                return function(t) {
                    return this.translateOnAxis(e, t)
                }
            }(),
            localToWorld: function(e) {
                return e.applyMatrix4(this.matrixWorld)
            },
            worldToLocal: function() {
                var e = new n.Matrix4;
                return function(t) {
                    return t.applyMatrix4(e.getInverse(this.matrixWorld))
                }
            }(),
            lookAt: function() {
                var e = new n.Matrix4;
                return function(t) {
                    e.lookAt(t, this.position, this.up), this.quaternion.setFromRotationMatrix(e)
                }
            }(),
            add: function(e) {
                if (arguments.length > 1) {
                    for (var t = 0; t < arguments.length; t++) this.add(arguments[t]);
                    return this
                }
                return e === this ? (console.error("THREE.Object3D.add:", e, "can't be added as a child of itself."), this) : (e instanceof n.Object3D ? (void 0 !== e.parent && e.parent.remove(e), e.parent = this, e.dispatchEvent({
                    type: "added"
                }), this.children.push(e)) : console.error("THREE.Object3D.add:", e, "is not an instance of THREE.Object3D."), this)
            },
            remove: function(e) {
                if (arguments.length > 1)
                    for (var t = 0; t < arguments.length; t++) this.remove(arguments[t]);
                var r = this.children.indexOf(e); - 1 !== r && (e.parent = void 0, e.dispatchEvent({
                    type: "removed"
                }), this.children.splice(r, 1))
            },
            getChildByName: function(e, t) {
                return console.warn("THREE.Object3D: .getChildByName() has been renamed to .getObjectByName()."), this.getObjectByName(e, t)
            },
            getObjectById: function(e, t) {
                if (this.id === e) return this;
                for (var r = 0, i = this.children.length; i > r; r++) {
                    var n = this.children[r],
                        o = n.getObjectById(e, t);
                    if (void 0 !== o) return o
                }
                return void 0
            },
            getObjectByName: function(e, t) {
                if (this.name === e) return this;
                for (var r = 0, i = this.children.length; i > r; r++) {
                    var n = this.children[r],
                        o = n.getObjectByName(e, t);
                    if (void 0 !== o) return o
                }
                return void 0
            },
            getWorldPosition: function(e) {
                var t = e || new n.Vector3;
                return this.updateMatrixWorld(!0), t.setFromMatrixPosition(this.matrixWorld)
            },
            getWorldQuaternion: function() {
                var e = new n.Vector3,
                    t = new n.Vector3;
                return function(r) {
                    var i = r || new n.Quaternion;
                    return this.updateMatrixWorld(!0), this.matrixWorld.decompose(e, i, t), i
                }
            }(),
            getWorldRotation: function() {
                var e = new n.Quaternion;
                return function(t) {
                    var r = t || new n.Euler;
                    return this.getWorldQuaternion(e), r.setFromQuaternion(e, this.rotation.order, !1)
                }
            }(),
            getWorldScale: function() {
                var e = new n.Vector3,
                    t = new n.Quaternion;
                return function(r) {
                    var i = r || new n.Vector3;
                    return this.updateMatrixWorld(!0), this.matrixWorld.decompose(e, t, i), i
                }
            }(),
            getWorldDirection: function() {
                var e = new n.Quaternion;
                return function(t) {
                    var r = t || new n.Vector3;
                    return this.getWorldQuaternion(e), r.set(0, 0, 1).applyQuaternion(e)
                }
            }(),
            raycast: function() {},
            traverse: function(e) {
                e(this);
                for (var t = 0, r = this.children.length; r > t; t++) this.children[t].traverse(e)
            },
            traverseVisible: function(e) {
                if (this.visible !== !1) {
                    e(this);
                    for (var t = 0, r = this.children.length; r > t; t++) this.children[t].traverseVisible(e)
                }
            },
            updateMatrix: function() {
                this.matrix.compose(this.position, this.quaternion, this.scale), this.matrixWorldNeedsUpdate = !0
            },
            updateMatrixWorld: function(e) {
                this.matrixAutoUpdate === !0 && this.updateMatrix(), (this.matrixWorldNeedsUpdate === !0 || e === !0) && (void 0 === this.parent ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), this.matrixWorldNeedsUpdate = !1, e = !0);
                for (var t = 0, r = this.children.length; r > t; t++) this.children[t].updateMatrixWorld(e)
            },
            toJSON: function() {
                var e = {
                        metadata: {
                            version: 4.3,
                            type: "Object",
                            generator: "ObjectExporter"
                        }
                    },
                    t = {},
                    r = function(r) {
                        if (void 0 === e.geometries && (e.geometries = []), void 0 === t[r.uuid]) {
                            var i = r.toJSON();
                            delete i.metadata, t[r.uuid] = i, e.geometries.push(i)
                        }
                        return r.uuid
                    },
                    i = {},
                    o = function(t) {
                        if (void 0 === e.materials && (e.materials = []), void 0 === i[t.uuid]) {
                            var r = t.toJSON();
                            delete r.metadata, i[t.uuid] = r, e.materials.push(r)
                        }
                        return t.uuid
                    },
                    a = function(e) {
                        var t = {};
                        if (t.uuid = e.uuid, t.type = e.type, "" !== e.name && (t.name = e.name), "{}" !== JSON.stringify(e.userData) && (t.userData = e.userData), e.visible !== !0 && (t.visible = e.visible), e instanceof n.PerspectiveCamera ? (t.fov = e.fov, t.aspect = e.aspect, t.near = e.near, t.far = e.far) : e instanceof n.OrthographicCamera ? (t.left = e.left, t.right = e.right, t.top = e.top, t.bottom = e.bottom, t.near = e.near, t.far = e.far) : e instanceof n.AmbientLight ? t.color = e.color.getHex() : e instanceof n.DirectionalLight ? (t.color = e.color.getHex(), t.intensity = e.intensity) : e instanceof n.PointLight ? (t.color = e.color.getHex(), t.intensity = e.intensity, t.distance = e.distance) : e instanceof n.SpotLight ? (t.color = e.color.getHex(), t.intensity = e.intensity, t.distance = e.distance, t.angle = e.angle, t.exponent = e.exponent) : e instanceof n.HemisphereLight ? (t.color = e.color.getHex(), t.groundColor = e.groundColor.getHex()) : e instanceof n.Mesh ? (t.geometry = r(e.geometry), t.material = o(e.material)) : e instanceof n.Line ? (t.geometry = r(e.geometry), t.material = o(e.material)) : e instanceof n.Sprite && (t.material = o(e.material)), t.matrix = e.matrix.toArray(), e.children.length > 0) {
                            t.children = [];
                            for (var i = 0; i < e.children.length; i++) t.children.push(a(e.children[i]))
                        }
                        return t
                    };
                return e.object = a(this), e
            },
            clone: function(e, t) {
                if (void 0 === e && (e = new n.Object3D), void 0 === t && (t = !0), e.name = this.name, e.up.copy(this.up), e.position.copy(this.position), e.quaternion.copy(this.quaternion), e.scale.copy(this.scale), e.renderDepth = this.renderDepth, e.rotationAutoUpdate = this.rotationAutoUpdate, e.matrix.copy(this.matrix), e.matrixWorld.copy(this.matrixWorld), e.matrixAutoUpdate = this.matrixAutoUpdate, e.matrixWorldNeedsUpdate = this.matrixWorldNeedsUpdate, e.visible = this.visible, e.castShadow = this.castShadow, e.receiveShadow = this.receiveShadow, e.frustumCulled = this.frustumCulled, e.userData = JSON.parse(JSON.stringify(this.userData)), t === !0)
                    for (var r = 0; r < this.children.length; r++) {
                        var i = this.children[r];
                        e.add(i.clone())
                    }
                return e
            }
        }, n.EventDispatcher.prototype.apply(n.Object3D.prototype), n.Object3DIdCount = 0, n.Projector = function() {
            console.warn("THREE.Projector has been moved to /examples/renderers/Projector.js."), this.projectVector = function(e, t) {
                console.warn("THREE.Projector: .projectVector() is now vector.project()."), e.project(t)
            }, this.unprojectVector = function(e, t) {
                console.warn("THREE.Projector: .unprojectVector() is now vector.unproject()."), e.unproject(t)
            }, this.pickingRay = function(e, t) {
                console.error("THREE.Projector: .pickingRay() has been removed.")
            }
        }, n.Face3 = function(e, t, r, i, o, a) {
            this.a = e, this.b = t, this.c = r, this.normal = i instanceof n.Vector3 ? i : new n.Vector3, this.vertexNormals = i instanceof Array ? i : [], this.color = o instanceof n.Color ? o : new n.Color, this.vertexColors = o instanceof Array ? o : [], this.vertexTangents = [], this.materialIndex = void 0 !== a ? a : 0
        }, n.Face3.prototype = {
            constructor: n.Face3,
            clone: function() {
                var e = new n.Face3(this.a, this.b, this.c);
                e.normal.copy(this.normal), e.color.copy(this.color), e.materialIndex = this.materialIndex;
                for (var t = 0, r = this.vertexNormals.length; r > t; t++) e.vertexNormals[t] = this.vertexNormals[t].clone();
                for (var t = 0, r = this.vertexColors.length; r > t; t++) e.vertexColors[t] = this.vertexColors[t].clone();
                for (var t = 0, r = this.vertexTangents.length; r > t; t++) e.vertexTangents[t] = this.vertexTangents[t].clone();
                return e
            }
        }, n.Face4 = function(e, t, r, i, o, a, s) {
            return console.warn("THREE.Face4 has been removed. A THREE.Face3 will be created instead."), new n.Face3(e, t, r, o, a, s)
        }, n.BufferAttribute = function(e, t) {
            this.array = e, this.itemSize = t, this.needsUpdate = !1
        }, n.BufferAttribute.prototype = {
            constructor: n.BufferAttribute,
            get length() {
                return this.array.length
            },
            copyAt: function(e, t, r) {
                e *= this.itemSize, r *= t.itemSize;
                for (var i = 0, n = this.itemSize; n > i; i++) this.array[e + i] = t.array[r + i]
            },
            set: function(e) {
                return this.array.set(e), this
            },
            setX: function(e, t) {
                return this.array[e * this.itemSize] = t, this
            },
            setY: function(e, t) {
                return this.array[e * this.itemSize + 1] = t, this
            },
            setZ: function(e, t) {
                return this.array[e * this.itemSize + 2] = t, this
            },
            setXY: function(e, t, r) {
                return e *= this.itemSize, this.array[e] = t, this.array[e + 1] = r, this
            },
            setXYZ: function(e, t, r, i) {
                return e *= this.itemSize, this.array[e] = t, this.array[e + 1] = r, this.array[e + 2] = i, this
            },
            setXYZW: function(e, t, r, i, n) {
                return e *= this.itemSize, this.array[e] = t, this.array[e + 1] = r, this.array[e + 2] = i, this.array[e + 3] = n, this
            },
            clone: function() {
                return new n.BufferAttribute(new this.array.constructor(this.array), this.itemSize)
            }
        }, n.Int8Attribute = function(e, t) {
            return console.warn("THREE.Int8Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead."), new n.BufferAttribute(e, t)
        }, n.Uint8Attribute = function(e, t) {
            return console.warn("THREE.Uint8Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead."), new n.BufferAttribute(e, t)
        }, n.Uint8ClampedAttribute = function(e, t) {
            return console.warn("THREE.Uint8ClampedAttribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead."), new n.BufferAttribute(e, t)
        }, n.Int16Attribute = function(e, t) {
            return console.warn("THREE.Int16Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead."), new n.BufferAttribute(e, t)
        }, n.Uint16Attribute = function(e, t) {
            return console.warn("THREE.Uint16Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead."), new n.BufferAttribute(e, t)
        }, n.Int32Attribute = function(e, t) {
            return console.warn("THREE.Int32Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead."), new n.BufferAttribute(e, t)
        }, n.Uint32Attribute = function(e, t) {
            return console.warn("THREE.Uint32Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead."), new n.BufferAttribute(e, t)
        }, n.Float32Attribute = function(e, t) {
            return console.warn("THREE.Float32Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead."), new n.BufferAttribute(e, t)
        }, n.Float64Attribute = function(e, t) {
            return console.warn("THREE.Float64Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead."), new n.BufferAttribute(e, t)
        }, n.BufferGeometry = function() {
            Object.defineProperty(this, "id", {
                value: n.GeometryIdCount++
            }), this.uuid = n.Math.generateUUID(), this.name = "", this.type = "BufferGeometry", this.attributes = {}, this.attributesKeys = [], this.drawcalls = [], this.offsets = this.drawcalls, this.boundingBox = null, this.boundingSphere = null
        }, n.BufferGeometry.prototype = {
            constructor: n.BufferGeometry,
            addAttribute: function(e, t) {
                return t instanceof n.BufferAttribute == !1 ? (console.warn("THREE.BufferGeometry: .addAttribute() now expects ( name, attribute )."), void(this.attributes[e] = {
                    array: arguments[1],
                    itemSize: arguments[2]
                })) : (this.attributes[e] = t, void(this.attributesKeys = Object.keys(this.attributes)))
            },
            getAttribute: function(e) {
                return this.attributes[e]
            },
            addDrawCall: function(e, t, r) {
                this.drawcalls.push({
                    start: e,
                    count: t,
                    index: void 0 !== r ? r : 0
                })
            },
            applyMatrix: function(e) {
                var t = this.attributes.position;
                void 0 !== t && (e.applyToVector3Array(t.array), t.needsUpdate = !0);
                var r = this.attributes.normal;
                if (void 0 !== r) {
                    var i = (new n.Matrix3).getNormalMatrix(e);
                    i.applyToVector3Array(r.array), r.needsUpdate = !0
                }
            },
            center: function() {},
            fromGeometry: function(e, t) {
                t = t || {
                        vertexColors: n.NoColors
                    };
                var r = e.vertices,
                    i = e.faces,
                    o = e.faceVertexUvs,
                    a = t.vertexColors,
                    s = o[0].length > 0,
                    h = 3 == i[0].vertexNormals.length,
                    l = new Float32Array(3 * i.length * 3);
                this.addAttribute("position", new n.BufferAttribute(l, 3));
                var u = new Float32Array(3 * i.length * 3);
                if (this.addAttribute("normal", new n.BufferAttribute(u, 3)), a !== n.NoColors) {
                    var c = new Float32Array(3 * i.length * 3);
                    this.addAttribute("color", new n.BufferAttribute(c, 3))
                }
                if (s === !0) {
                    var f = new Float32Array(3 * i.length * 2);
                    this.addAttribute("uv", new n.BufferAttribute(f, 2))
                }
                for (var p = 0, d = 0, m = 0; p < i.length; p++, d += 6, m += 9) {
                    var v = i[p],
                        g = r[v.a],
                        y = r[v.b],
                        x = r[v.c];
                    if (l[m] = g.x, l[m + 1] = g.y, l[m + 2] = g.z, l[m + 3] = y.x, l[m + 4] = y.y, l[m + 5] = y.z, l[m + 6] = x.x, l[m + 7] = x.y, l[m + 8] = x.z, h === !0) {
                        var w = v.vertexNormals[0],
                            b = v.vertexNormals[1],
                            _ = v.vertexNormals[2];
                        u[m] = w.x, u[m + 1] = w.y, u[m + 2] = w.z, u[m + 3] = b.x, u[m + 4] = b.y, u[m + 5] = b.z, u[m + 6] = _.x, u[m + 7] = _.y, u[m + 8] = _.z
                    } else {
                        var M = v.normal;
                        u[m] = M.x, u[m + 1] = M.y, u[m + 2] = M.z, u[m + 3] = M.x, u[m + 4] = M.y, u[m + 5] = M.z, u[m + 6] = M.x, u[m + 7] = M.y, u[m + 8] = M.z
                    }
                    if (a === n.FaceColors) {
                        var S = v.color;
                        c[m] = S.r, c[m + 1] = S.g, c[m + 2] = S.b, c[m + 3] = S.r, c[m + 4] = S.g, c[m + 5] = S.b, c[m + 6] = S.r, c[m + 7] = S.g, c[m + 8] = S.b
                    } else if (a === n.VertexColors) {
                        var T = v.vertexColors[0],
                            A = v.vertexColors[1],
                            E = v.vertexColors[2];
                        c[m] = T.r, c[m + 1] = T.g, c[m + 2] = T.b, c[m + 3] = A.r, c[m + 4] = A.g, c[m + 5] = A.b, c[m + 6] = E.r, c[m + 7] = E.g, c[m + 8] = E.b
                    }
                    if (s === !0) {
                        var C = o[0][p][0],
                            L = o[0][p][1],
                            P = o[0][p][2];
                        f[d] = C.x, f[d + 1] = C.y, f[d + 2] = L.x, f[d + 3] = L.y, f[d + 4] = P.x, f[d + 5] = P.y
                    }
                }
                return this.computeBoundingSphere(), this
            },
            computeBoundingBox: function() {
                var e = new n.Vector3;
                return function() {
                    null === this.boundingBox && (this.boundingBox = new n.Box3);
                    var t = this.attributes.position.array;
                    if (t) {
                        var r = this.boundingBox;
                        r.makeEmpty();
                        for (var i = 0, o = t.length; o > i; i += 3) e.set(t[i], t[i + 1], t[i + 2]), r.expandByPoint(e)
                    }(void 0 === t || 0 === t.length) && (this.boundingBox.min.set(0, 0, 0), this.boundingBox.max.set(0, 0, 0)), (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && console.error('THREE.BufferGeometry.computeBoundingBox: Computed min/max have NaN values. The "position" attribute is likely to have NaN values.')
                }
            }(),
            computeBoundingSphere: function() {
                var e = new n.Box3,
                    t = new n.Vector3;
                return function() {
                    null === this.boundingSphere && (this.boundingSphere = new n.Sphere);
                    var r = this.attributes.position.array;
                    if (r) {
                        e.makeEmpty();
                        for (var i = this.boundingSphere.center, o = 0, a = r.length; a > o; o += 3) t.set(r[o], r[o + 1], r[o + 2]), e.expandByPoint(t);
                        e.center(i);
                        for (var s = 0, o = 0, a = r.length; a > o; o += 3) t.set(r[o], r[o + 1], r[o + 2]), s = Math.max(s, i.distanceToSquared(t));
                        this.boundingSphere.radius = Math.sqrt(s), isNaN(this.boundingSphere.radius) && console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.')
                    }
                }
            }(),
            computeFaceNormals: function() {},
            computeVertexNormals: function() {
                var e = this.attributes;
                if (e.position) {
                    var t = e.position.array;
                    if (void 0 === e.normal) this.addAttribute("normal", new n.BufferAttribute(new Float32Array(t.length), 3));
                    else
                        for (var r = e.normal.array, i = 0, o = r.length; o > i; i++) r[i] = 0;
                    var a, s, h, r = e.normal.array,
                        l = new n.Vector3,
                        u = new n.Vector3,
                        c = new n.Vector3,
                        f = new n.Vector3,
                        p = new n.Vector3;
                    if (e.index)
                        for (var d = e.index.array, m = this.offsets.length > 0 ? this.offsets : [{
                            start: 0,
                            count: d.length,
                            index: 0
                        }], v = 0, g = m.length; g > v; ++v)
                            for (var y = m[v].start, x = m[v].count, w = m[v].index, i = y, o = y + x; o > i; i += 3) a = 3 * (w + d[i]), s = 3 * (w + d[i + 1]), h = 3 * (w + d[i + 2]), l.fromArray(t, a), u.fromArray(t, s), c.fromArray(t, h), f.subVectors(c, u), p.subVectors(l, u), f.cross(p), r[a] += f.x, r[a + 1] += f.y, r[a + 2] += f.z, r[s] += f.x, r[s + 1] += f.y, r[s + 2] += f.z, r[h] += f.x, r[h + 1] += f.y, r[h + 2] += f.z;
                    else
                        for (var i = 0, o = t.length; o > i; i += 9) l.fromArray(t, i), u.fromArray(t, i + 3), c.fromArray(t, i + 6), f.subVectors(c, u), p.subVectors(l, u), f.cross(p), r[i] = f.x, r[i + 1] = f.y, r[i + 2] = f.z, r[i + 3] = f.x, r[i + 4] = f.y, r[i + 5] = f.z, r[i + 6] = f.x, r[i + 7] = f.y, r[i + 8] = f.z;
                    this.normalizeNormals(), e.normal.needsUpdate = !0
                }
            },
            computeTangents: function() {
                function e(e, t, r) {
                    P.fromArray(i, 3 * e), R.fromArray(i, 3 * t), D.fromArray(i, 3 * r), F.fromArray(a, 2 * e), U.fromArray(a, 2 * t), B.fromArray(a, 2 * r), f = R.x - P.x, p = D.x - P.x, d = R.y - P.y, m = D.y - P.y, v = R.z - P.z, g = D.z - P.z, y = U.x - F.x, x = B.x - F.x, w = U.y - F.y, b = B.y - F.y, _ = 1 / (y * b - x * w), k.set((b * f - w * p) * _, (b * d - w * m) * _, (b * v - w * g) * _), z.set((y * p - x * f) * _, (y * m - x * d) * _, (y * g - x * v) * _), l[e].add(k), l[t].add(k), l[r].add(k), u[e].add(z), u[t].add(z), u[r].add(z)
                }

                function t(e) {
                    q.fromArray(o, 3 * e), Y.copy(q), H = l[e], j.copy(H), j.sub(q.multiplyScalar(q.dot(H))).normalize(), X.crossVectors(Y, H), W = X.dot(u[e]), G = 0 > W ? -1 : 1, h[4 * e] = j.x, h[4 * e + 1] = j.y, h[4 * e + 2] = j.z, h[4 * e + 3] = G
                }
                if (void 0 === this.attributes.index || void 0 === this.attributes.position || void 0 === this.attributes.normal || void 0 === this.attributes.uv) return void console.warn("Missing required attributes (index, position, normal or uv) in BufferGeometry.computeTangents()");
                var r = this.attributes.index.array,
                    i = this.attributes.position.array,
                    o = this.attributes.normal.array,
                    a = this.attributes.uv.array,
                    s = i.length / 3;
                void 0 === this.attributes.tangent && this.addAttribute("tangent", new n.BufferAttribute(new Float32Array(4 * s), 4));
                for (var h = this.attributes.tangent.array, l = [], u = [], c = 0; s > c; c++) l[c] = new n.Vector3, u[c] = new n.Vector3;
                var f, p, d, m, v, g, y, x, w, b, _, M, S, T, A, E, C, L, P = new n.Vector3,
                    R = new n.Vector3,
                    D = new n.Vector3,
                    F = new n.Vector2,
                    U = new n.Vector2,
                    B = new n.Vector2,
                    k = new n.Vector3,
                    z = new n.Vector3;
                0 === this.drawcalls.length && this.addDrawCall(0, r.length, 0);
                var V = this.drawcalls;
                for (T = 0, A = V.length; A > T; ++T) {
                    var O = V[T].start,
                        N = V[T].count,
                        I = V[T].index;
                    for (M = O, S = O + N; S > M; M += 3) E = I + r[M], C = I + r[M + 1], L = I + r[M + 2], e(E, C, L)
                }
                var G, H, W, j = new n.Vector3,
                    X = new n.Vector3,
                    q = new n.Vector3,
                    Y = new n.Vector3;
                for (T = 0, A = V.length; A > T; ++T) {
                    var O = V[T].start,
                        N = V[T].count,
                        I = V[T].index;
                    for (M = O, S = O + N; S > M; M += 3) E = I + r[M], C = I + r[M + 1], L = I + r[M + 2], t(E), t(C), t(L)
                }
            },
            computeOffsets: function(e) {
                var t = e;
                void 0 === e && (t = 65535);
                for (var r = (Date.now(), this.attributes.index.array), i = this.attributes.position.array, n = (i.length / 3, r.length / 3), o = new Uint16Array(r.length), a = 0, s = 0, h = [{
                    start: 0,
                    count: 0,
                    index: 0
                }], l = h[0], u = 0, c = 0, f = new Int32Array(6), p = new Int32Array(i.length), d = new Int32Array(i.length), m = 0; m < i.length; m++) p[m] = -1, d[m] = -1;
                for (var v = 0; n > v; v++) {
                    c = 0;
                    for (var g = 0; 3 > g; g++) {
                        var y = r[3 * v + g]; - 1 == p[y] ? (f[2 * g] = y, f[2 * g + 1] = -1, c++) : p[y] < l.index ? (f[2 * g] = y, f[2 * g + 1] = -1, u++) : (f[2 * g] = y, f[2 * g + 1] = p[y])
                    }
                    var x = s + c;
                    if (x > l.index + t) {
                        var w = {
                            start: a,
                            count: 0,
                            index: s
                        };
                        h.push(w), l = w;
                        for (var b = 0; 6 > b; b += 2) {
                            var _ = f[b + 1];
                            _ > -1 && _ < l.index && (f[b + 1] = -1)
                        }
                    }
                    for (var b = 0; 6 > b; b += 2) {
                        var y = f[b],
                            _ = f[b + 1]; - 1 === _ && (_ = s++), p[y] = _, d[_] = y, o[a++] = _ - l.index, l.count++
                    }
                }
                return this.reorderBuffers(o, d, s), this.offsets = h, h
            },
            merge: function() {
                console.log("BufferGeometry.merge(): TODO")
            },
            normalizeNormals: function() {
                for (var e, t, r, i, n = this.attributes.normal.array, o = 0, a = n.length; a > o; o += 3) e = n[o], t = n[o + 1], r = n[o + 2], i = 1 / Math.sqrt(e * e + t * t + r * r), n[o] *= i, n[o + 1] *= i, n[o + 2] *= i
            },
            reorderBuffers: function(e, t, r) {
                var i = {};
                for (var n in this.attributes)
                    if ("index" != n) {
                        var o = this.attributes[n].array;
                        i[n] = new o.constructor(this.attributes[n].itemSize * r)
                    }
                for (var a = 0; r > a; a++) {
                    var s = t[a];
                    for (var n in this.attributes)
                        if ("index" != n)
                            for (var h = this.attributes[n].array, l = this.attributes[n].itemSize, u = i[n], c = 0; l > c; c++) u[a * l + c] = h[s * l + c]
                }
                this.attributes.index.array = e;
                for (var n in this.attributes) "index" != n && (this.attributes[n].array = i[n], this.attributes[n].numItems = this.attributes[n].itemSize * r)
            },
            toJSON: function() {
                var e = {
                        metadata: {
                            version: 4,
                            type: "BufferGeometry",
                            generator: "BufferGeometryExporter"
                        },
                        uuid: this.uuid,
                        type: this.type,
                        data: {
                            attributes: {}
                        }
                    },
                    t = this.attributes,
                    r = this.offsets,
                    i = this.boundingSphere;
                for (var n in t) {
                    for (var o = t[n], a = [], s = o.array, h = 0, l = s.length; l > h; h++) a[h] = s[h];
                    e.data.attributes[n] = {
                        itemSize: o.itemSize,
                        type: o.array.constructor.name,
                        array: a
                    }
                }
                return r.length > 0 && (e.data.offsets = JSON.parse(JSON.stringify(r))), null !== i && (e.data.boundingSphere = {
                    center: i.center.toArray(),
                    radius: i.radius
                }), e
            },
            clone: function() {
                var e = new n.BufferGeometry;
                for (var t in this.attributes) {
                    var r = this.attributes[t];
                    e.addAttribute(t, r.clone())
                }
                for (var i = 0, o = this.offsets.length; o > i; i++) {
                    var a = this.offsets[i];
                    e.offsets.push({
                        start: a.start,
                        index: a.index,
                        count: a.count
                    })
                }
                return e
            },
            dispose: function() {
                this.dispatchEvent({
                    type: "dispose"
                })
            }
        }, n.EventDispatcher.prototype.apply(n.BufferGeometry.prototype), n.Geometry = function() {
            Object.defineProperty(this, "id", {
                value: n.GeometryIdCount++
            }), this.uuid = n.Math.generateUUID(), this.name = "", this.type = "Geometry", this.vertices = [], this.colors = [], this.faces = [], this.faceVertexUvs = [
                []
            ], this.morphTargets = [], this.morphColors = [], this.morphNormals = [], this.skinWeights = [], this.skinIndices = [], this.lineDistances = [], this.boundingBox = null, this.boundingSphere = null, this.hasTangents = !1, this.dynamic = !0, this.verticesNeedUpdate = !1, this.elementsNeedUpdate = !1, this.uvsNeedUpdate = !1, this.normalsNeedUpdate = !1, this.tangentsNeedUpdate = !1, this.colorsNeedUpdate = !1, this.lineDistancesNeedUpdate = !1, this.groupsNeedUpdate = !1
        }, n.Geometry.prototype = {
            constructor: n.Geometry,
            applyMatrix: function(e) {
                for (var t = (new n.Matrix3).getNormalMatrix(e), r = 0, i = this.vertices.length; i > r; r++) {
                    var o = this.vertices[r];
                    o.applyMatrix4(e)
                }
                for (var r = 0, i = this.faces.length; i > r; r++) {
                    var a = this.faces[r];
                    a.normal.applyMatrix3(t).normalize();
                    for (var s = 0, h = a.vertexNormals.length; h > s; s++) a.vertexNormals[s].applyMatrix3(t).normalize()
                }
                this.boundingBox instanceof n.Box3 && this.computeBoundingBox(), this.boundingSphere instanceof n.Sphere && this.computeBoundingSphere()
            },
            fromBufferGeometry: function(e) {
                for (var t = this, r = e.attributes, i = r.position.array, o = void 0 !== r.index ? r.index.array : void 0, a = void 0 !== r.normal ? r.normal.array : void 0, s = void 0 !== r.color ? r.color.array : void 0, h = void 0 !== r.uv ? r.uv.array : void 0, l = [], u = [], c = 0, f = 0; c < i.length; c += 3, f += 2) t.vertices.push(new n.Vector3(i[c], i[c + 1], i[c + 2])), void 0 !== a && l.push(new n.Vector3(a[c], a[c + 1], a[c + 2])), void 0 !== s && t.colors.push(new n.Color(s[c], s[c + 1], s[c + 2])), void 0 !== h && u.push(new n.Vector2(h[f], h[f + 1]));
                var p = function(e, r, i) {
                    var o = void 0 !== a ? [l[e].clone(), l[r].clone(), l[i].clone()] : [],
                        h = void 0 !== s ? [t.colors[e].clone(), t.colors[r].clone(), t.colors[i].clone()] : [];
                    t.faces.push(new n.Face3(e, r, i, o, h)), t.faceVertexUvs[0].push([u[e], u[r], u[i]])
                };
                if (void 0 !== o)
                    for (var c = 0; c < o.length; c += 3) p(o[c], o[c + 1], o[c + 2]);
                else
                    for (var c = 0; c < i.length / 3; c += 3) p(c, c + 1, c + 2);
                return this.computeFaceNormals(), null !== e.boundingBox && (this.boundingBox = e.boundingBox.clone()), null !== e.boundingSphere && (this.boundingSphere = e.boundingSphere.clone()), this
            },
            center: function() {
                this.computeBoundingBox();
                var e = new n.Vector3;
                return e.addVectors(this.boundingBox.min, this.boundingBox.max), e.multiplyScalar(-.5), this.applyMatrix((new n.Matrix4).makeTranslation(e.x, e.y, e.z)), this.computeBoundingBox(), e
            },
            computeFaceNormals: function() {
                for (var e = new n.Vector3, t = new n.Vector3, r = 0, i = this.faces.length; i > r; r++) {
                    var o = this.faces[r],
                        a = this.vertices[o.a],
                        s = this.vertices[o.b],
                        h = this.vertices[o.c];
                    e.subVectors(h, s), t.subVectors(a, s), e.cross(t), e.normalize(), o.normal.copy(e)
                }
            },
            computeVertexNormals: function(e) {
                var t, r, i, o, a, s;
                for (s = new Array(this.vertices.length), t = 0, r = this.vertices.length; r > t; t++) s[t] = new n.Vector3;
                if (e) {
                    var h, l, u, c = new n.Vector3,
                        f = new n.Vector3;
                    new n.Vector3, new n.Vector3, new n.Vector3;
                    for (i = 0, o = this.faces.length; o > i; i++) a = this.faces[i], h = this.vertices[a.a], l = this.vertices[a.b], u = this.vertices[a.c], c.subVectors(u, l), f.subVectors(h, l), c.cross(f), s[a.a].add(c), s[a.b].add(c), s[a.c].add(c)
                } else
                    for (i = 0, o = this.faces.length; o > i; i++) a = this.faces[i], s[a.a].add(a.normal), s[a.b].add(a.normal), s[a.c].add(a.normal);
                for (t = 0, r = this.vertices.length; r > t; t++) s[t].normalize();
                for (i = 0, o = this.faces.length; o > i; i++) a = this.faces[i], a.vertexNormals[0] = s[a.a].clone(), a.vertexNormals[1] = s[a.b].clone(), a.vertexNormals[2] = s[a.c].clone()
            },
            computeMorphNormals: function() {
                var e, t, r, i, o;
                for (r = 0, i = this.faces.length; i > r; r++)
                    for (o = this.faces[r], o.__originalFaceNormal ? o.__originalFaceNormal.copy(o.normal) : o.__originalFaceNormal = o.normal.clone(), o.__originalVertexNormals || (o.__originalVertexNormals = []), e = 0, t = o.vertexNormals.length; t > e; e++) o.__originalVertexNormals[e] ? o.__originalVertexNormals[e].copy(o.vertexNormals[e]) : o.__originalVertexNormals[e] = o.vertexNormals[e].clone();
                var a = new n.Geometry;
                for (a.faces = this.faces, e = 0, t = this.morphTargets.length; t > e; e++) {
                    if (!this.morphNormals[e]) {
                        this.morphNormals[e] = {}, this.morphNormals[e].faceNormals = [], this.morphNormals[e].vertexNormals = [];
                        var s, h, l = this.morphNormals[e].faceNormals,
                            u = this.morphNormals[e].vertexNormals;
                        for (r = 0, i = this.faces.length; i > r; r++) s = new n.Vector3, h = {
                            a: new n.Vector3,
                            b: new n.Vector3,
                            c: new n.Vector3
                        }, l.push(s), u.push(h)
                    }
                    var c = this.morphNormals[e];
                    a.vertices = this.morphTargets[e].vertices, a.computeFaceNormals(), a.computeVertexNormals();
                    var s, h;
                    for (r = 0, i = this.faces.length; i > r; r++) o = this.faces[r], s = c.faceNormals[r], h = c.vertexNormals[r], s.copy(o.normal), h.a.copy(o.vertexNormals[0]), h.b.copy(o.vertexNormals[1]), h.c.copy(o.vertexNormals[2])
                }
                for (r = 0, i = this.faces.length; i > r; r++) o = this.faces[r], o.normal = o.__originalFaceNormal, o.vertexNormals = o.__originalVertexNormals
            },
            computeTangents: function() {
                function e(e, t, r, i, n, o, a) {
                    u = e.vertices[t], c = e.vertices[r], f = e.vertices[i], p = l[n], d = l[o], m = l[a], v = c.x - u.x, g = f.x - u.x, y = c.y - u.y, x = f.y - u.y, w = c.z - u.z, b = f.z - u.z, _ = d.x - p.x, M = m.x - p.x, S = d.y - p.y, T = m.y - p.y, A = 1 / (_ * T - M * S), D.set((T * v - S * g) * A, (T * y - S * x) * A, (T * w - S * b) * A), F.set((_ * g - M * v) * A, (_ * x - M * y) * A, (_ * b - M * w) * A), P[t].add(D), P[r].add(D), P[i].add(D), R[t].add(F), R[r].add(F), R[i].add(F)
                }
                var t, r, i, o, a, s, h, l, u, c, f, p, d, m, v, g, y, x, w, b, _, M, S, T, A, E, C, L, P = [],
                    R = [],
                    D = new n.Vector3,
                    F = new n.Vector3,
                    U = new n.Vector3,
                    B = new n.Vector3,
                    k = new n.Vector3;
                for (i = 0, o = this.vertices.length; o > i; i++) P[i] = new n.Vector3, R[i] = new n.Vector3;
                for (t = 0, r = this.faces.length; r > t; t++) h = this.faces[t], l = this.faceVertexUvs[0][t], e(this, h.a, h.b, h.c, 0, 1, 2);
                var z = ["a", "b", "c", "d"];
                for (t = 0, r = this.faces.length; r > t; t++)
                    for (h = this.faces[t], a = 0; a < Math.min(h.vertexNormals.length, 3); a++) k.copy(h.vertexNormals[a]), s = h[z[a]], E = P[s], U.copy(E), U.sub(k.multiplyScalar(k.dot(E))).normalize(), B.crossVectors(h.vertexNormals[a], E), C = B.dot(R[s]), L = 0 > C ? -1 : 1, h.vertexTangents[a] = new n.Vector4(U.x, U.y, U.z, L);
                this.hasTangents = !0
            },
            computeLineDistances: function() {
                for (var e = 0, t = this.vertices, r = 0, i = t.length; i > r; r++) r > 0 && (e += t[r].distanceTo(t[r - 1])), this.lineDistances[r] = e
            },
            computeBoundingBox: function() {
                null === this.boundingBox && (this.boundingBox = new n.Box3), this.boundingBox.setFromPoints(this.vertices)
            },
            computeBoundingSphere: function() {
                null === this.boundingSphere && (this.boundingSphere = new n.Sphere), this.boundingSphere.setFromPoints(this.vertices)
            },
            merge: function(e, t, r) {
                if (e instanceof n.Geometry == !1) return void console.error("THREE.Geometry.merge(): geometry not an instance of THREE.Geometry.", e);
                var i, o = this.vertices.length,
                    a = this.vertices,
                    s = e.vertices,
                    h = this.faces,
                    l = e.faces,
                    u = this.faceVertexUvs[0],
                    c = e.faceVertexUvs[0];
                void 0 === r && (r = 0), void 0 !== t && (i = (new n.Matrix3).getNormalMatrix(t));
                for (var f = 0, p = s.length; p > f; f++) {
                    var d = s[f],
                        m = d.clone();
                    void 0 !== t && m.applyMatrix4(t), a.push(m)
                }
                for (f = 0, p = l.length; p > f; f++) {
                    var v, g, y, x = l[f],
                        w = x.vertexNormals,
                        b = x.vertexColors;
                    v = new n.Face3(x.a + o, x.b + o, x.c + o), v.normal.copy(x.normal), void 0 !== i && v.normal.applyMatrix3(i).normalize();
                    for (var _ = 0, M = w.length; M > _; _++) g = w[_].clone(), void 0 !== i && g.applyMatrix3(i).normalize(), v.vertexNormals.push(g);
                    v.color.copy(x.color);
                    for (var _ = 0, M = b.length; M > _; _++) y = b[_], v.vertexColors.push(y.clone());
                    v.materialIndex = x.materialIndex + r, h.push(v)
                }
                for (f = 0, p = c.length; p > f; f++) {
                    var S = c[f],
                        T = [];
                    if (void 0 !== S) {
                        for (var _ = 0, M = S.length; M > _; _++) T.push(new n.Vector2(S[_].x, S[_].y));
                        u.push(T)
                    }
                }
            },
            mergeVertices: function() {
                var e, t, r, i, n, o, a, s, h = {},
                    l = [],
                    u = [],
                    c = 4,
                    f = Math.pow(10, c);
                for (r = 0, i = this.vertices.length; i > r; r++) e = this.vertices[r], t = Math.round(e.x * f) + "_" + Math.round(e.y * f) + "_" + Math.round(e.z * f), void 0 === h[t] ? (h[t] = r, l.push(this.vertices[r]), u[r] = l.length - 1) : u[r] = u[h[t]];
                var p = [];
                for (r = 0, i = this.faces.length; i > r; r++) {
                    n = this.faces[r], n.a = u[n.a], n.b = u[n.b], n.c = u[n.c], o = [n.a, n.b, n.c];
                    for (var d = -1, m = 0; 3 > m; m++)
                        if (o[m] == o[(m + 1) % 3]) {
                            d = m, p.push(r);
                            break
                        }
                }
                for (r = p.length - 1; r >= 0; r--) {
                    var v = p[r];
                    for (this.faces.splice(v, 1), a = 0, s = this.faceVertexUvs.length; s > a; a++) this.faceVertexUvs[a].splice(v, 1)
                }
                var g = this.vertices.length - l.length;
                return this.vertices = l, g
            },
            toJSON: function() {
                function e(e, t, r) {
                    return r ? e | 1 << t : e & ~(1 << t)
                }

                function t(e) {
                    var t = e.x.toString() + e.y.toString() + e.z.toString();
                    return void 0 !== f[t] ? f[t] : (f[t] = c.length / 3, c.push(e.x, e.y, e.z), f[t])
                }

                function r(e) {
                    var t = e.r.toString() + e.g.toString() + e.b.toString();
                    return void 0 !== d[t] ? d[t] : (d[t] = p.length,
                        p.push(e.getHex()), d[t])
                }

                function i(e) {
                    var t = e.x.toString() + e.y.toString();
                    return void 0 !== v[t] ? v[t] : (v[t] = m.length / 2, m.push(e.x, e.y), v[t])
                }
                var n = {
                    metadata: {
                        version: 4,
                        type: "BufferGeometry",
                        generator: "BufferGeometryExporter"
                    },
                    uuid: this.uuid,
                    type: this.type
                };
                if ("" !== this.name && (n.name = this.name), void 0 !== this.parameters) {
                    var o = this.parameters;
                    for (var a in o) void 0 !== o[a] && (n[a] = o[a]);
                    return n
                }
                for (var s = [], h = 0; h < this.vertices.length; h++) {
                    var l = this.vertices[h];
                    s.push(l.x, l.y, l.z)
                }
                for (var u = [], c = [], f = {}, p = [], d = {}, m = [], v = {}, h = 0; h < this.faces.length; h++) {
                    var g = this.faces[h],
                        y = !1,
                        x = !1,
                        w = void 0 !== this.faceVertexUvs[0][h],
                        b = g.normal.length() > 0,
                        _ = g.vertexNormals.length > 0,
                        M = 1 !== g.color.r || 1 !== g.color.g || 1 !== g.color.b,
                        S = g.vertexColors.length > 0,
                        T = 0;
                    if (T = e(T, 0, 0), T = e(T, 1, y), T = e(T, 2, x), T = e(T, 3, w), T = e(T, 4, b), T = e(T, 5, _), T = e(T, 6, M), T = e(T, 7, S), u.push(T), u.push(g.a, g.b, g.c), w) {
                        var A = this.faceVertexUvs[0][h];
                        u.push(i(A[0]), i(A[1]), i(A[2]))
                    }
                    if (b && u.push(t(g.normal)), _) {
                        var E = g.vertexNormals;
                        u.push(t(E[0]), t(E[1]), t(E[2]))
                    }
                    if (M && u.push(r(g.color)), S) {
                        var C = g.vertexColors;
                        u.push(r(C[0]), r(C[1]), r(C[2]))
                    }
                }
                return n.data = {}, n.data.vertices = s, n.data.normals = c, p.length > 0 && (n.data.colors = p), m.length > 0 && (n.data.uvs = [m]), n.data.faces = u, n
            },
            clone: function() {
                for (var e = new n.Geometry, t = this.vertices, r = 0, i = t.length; i > r; r++) e.vertices.push(t[r].clone());
                for (var o = this.faces, r = 0, i = o.length; i > r; r++) e.faces.push(o[r].clone());
                for (var a = this.faceVertexUvs[0], r = 0, i = a.length; i > r; r++) {
                    for (var s = a[r], h = [], l = 0, u = s.length; u > l; l++) h.push(new n.Vector2(s[l].x, s[l].y));
                    e.faceVertexUvs[0].push(h)
                }
                return e
            },
            dispose: function() {
                this.dispatchEvent({
                    type: "dispose"
                })
            }
        }, n.EventDispatcher.prototype.apply(n.Geometry.prototype), n.GeometryIdCount = 0, n.Camera = function() {
            n.Object3D.call(this), this.type = "Camera", this.matrixWorldInverse = new n.Matrix4, this.projectionMatrix = new n.Matrix4
        }, n.Camera.prototype = Object.create(n.Object3D.prototype), n.Camera.prototype.getWorldDirection = function() {
            var e = new n.Quaternion;
            return function(t) {
                var r = t || new n.Vector3;
                return this.getWorldQuaternion(e), r.set(0, 0, -1).applyQuaternion(e)
            }
        }(), n.Camera.prototype.lookAt = function() {
            var e = new n.Matrix4;
            return function(t) {
                e.lookAt(this.position, t, this.up), this.quaternion.setFromRotationMatrix(e)
            }
        }(), n.Camera.prototype.clone = function(e) {
            return void 0 === e && (e = new n.Camera), n.Object3D.prototype.clone.call(this, e), e.matrixWorldInverse.copy(this.matrixWorldInverse), e.projectionMatrix.copy(this.projectionMatrix), e
        }, n.CubeCamera = function(e, t, r) {
            n.Object3D.call(this), this.type = "CubeCamera";
            var i = 90,
                o = 1,
                a = new n.PerspectiveCamera(i, o, e, t);
            a.up.set(0, -1, 0), a.lookAt(new n.Vector3(1, 0, 0)), this.add(a);
            var s = new n.PerspectiveCamera(i, o, e, t);
            s.up.set(0, -1, 0), s.lookAt(new n.Vector3(-1, 0, 0)), this.add(s);
            var h = new n.PerspectiveCamera(i, o, e, t);
            h.up.set(0, 0, 1), h.lookAt(new n.Vector3(0, 1, 0)), this.add(h);
            var l = new n.PerspectiveCamera(i, o, e, t);
            l.up.set(0, 0, -1), l.lookAt(new n.Vector3(0, -1, 0)), this.add(l);
            var u = new n.PerspectiveCamera(i, o, e, t);
            u.up.set(0, -1, 0), u.lookAt(new n.Vector3(0, 0, 1)), this.add(u);
            var c = new n.PerspectiveCamera(i, o, e, t);
            c.up.set(0, -1, 0), c.lookAt(new n.Vector3(0, 0, -1)), this.add(c), this.renderTarget = new n.WebGLRenderTargetCube(r, r, {
                format: n.RGBFormat,
                magFilter: n.LinearFilter,
                minFilter: n.LinearFilter
            }), this.updateCubeMap = function(e, t) {
                var r = this.renderTarget,
                    i = r.generateMipmaps;
                r.generateMipmaps = !1, r.activeCubeFace = 0, e.render(t, a, r), r.activeCubeFace = 1, e.render(t, s, r), r.activeCubeFace = 2, e.render(t, h, r), r.activeCubeFace = 3, e.render(t, l, r), r.activeCubeFace = 4, e.render(t, u, r), r.generateMipmaps = i, r.activeCubeFace = 5, e.render(t, c, r)
            }
        }, n.CubeCamera.prototype = Object.create(n.Object3D.prototype), n.OrthographicCamera = function(e, t, r, i, o, a) {
            n.Camera.call(this), this.type = "OrthographicCamera", this.zoom = 1, this.left = e, this.right = t, this.top = r, this.bottom = i, this.near = void 0 !== o ? o : .1, this.far = void 0 !== a ? a : 2e3, this.updateProjectionMatrix()
        }, n.OrthographicCamera.prototype = Object.create(n.Camera.prototype), n.OrthographicCamera.prototype.updateProjectionMatrix = function() {
            var e = (this.right - this.left) / (2 * this.zoom),
                t = (this.top - this.bottom) / (2 * this.zoom),
                r = (this.right + this.left) / 2,
                i = (this.top + this.bottom) / 2;
            this.projectionMatrix.makeOrthographic(r - e, r + e, i + t, i - t, this.near, this.far)
        }, n.OrthographicCamera.prototype.clone = function() {
            var e = new n.OrthographicCamera;
            return n.Camera.prototype.clone.call(this, e), e.zoom = this.zoom, e.left = this.left, e.right = this.right, e.top = this.top, e.bottom = this.bottom, e.near = this.near, e.far = this.far, e.projectionMatrix.copy(this.projectionMatrix), e
        }, n.PerspectiveCamera = function(e, t, r, i) {
            n.Camera.call(this), this.type = "PerspectiveCamera", this.zoom = 1, this.fov = void 0 !== e ? e : 50, this.aspect = void 0 !== t ? t : 1, this.near = void 0 !== r ? r : .1, this.far = void 0 !== i ? i : 2e3, this.updateProjectionMatrix()
        }, n.PerspectiveCamera.prototype = Object.create(n.Camera.prototype), n.PerspectiveCamera.prototype.setLens = function(e, t) {
            void 0 === t && (t = 24), this.fov = 2 * n.Math.radToDeg(Math.atan(t / (2 * e))), this.updateProjectionMatrix()
        }, n.PerspectiveCamera.prototype.setViewOffset = function(e, t, r, i, n, o) {
            this.fullWidth = e, this.fullHeight = t, this.x = r, this.y = i, this.width = n, this.height = o, this.updateProjectionMatrix()
        }, n.PerspectiveCamera.prototype.updateProjectionMatrix = function() {
            var e = n.Math.radToDeg(2 * Math.atan(Math.tan(.5 * n.Math.degToRad(this.fov)) / this.zoom));
            if (this.fullWidth) {
                var t = this.fullWidth / this.fullHeight,
                    r = Math.tan(n.Math.degToRad(.5 * e)) * this.near,
                    i = -r,
                    o = t * i,
                    a = t * r,
                    s = Math.abs(a - o),
                    h = Math.abs(r - i);
                this.projectionMatrix.makeFrustum(o + this.x * s / this.fullWidth, o + (this.x + this.width) * s / this.fullWidth, r - (this.y + this.height) * h / this.fullHeight, r - this.y * h / this.fullHeight, this.near, this.far)
            } else this.projectionMatrix.makePerspective(e, this.aspect, this.near, this.far)
        }, n.PerspectiveCamera.prototype.clone = function() {
            var e = new n.PerspectiveCamera;
            return n.Camera.prototype.clone.call(this, e), e.zoom = this.zoom, e.fov = this.fov, e.aspect = this.aspect, e.near = this.near, e.far = this.far, e.projectionMatrix.copy(this.projectionMatrix), e
        }, n.Light = function(e) {
            n.Object3D.call(this), this.type = "Light", this.color = new n.Color(e)
        }, n.Light.prototype = Object.create(n.Object3D.prototype), n.Light.prototype.clone = function(e) {
            return void 0 === e && (e = new n.Light), n.Object3D.prototype.clone.call(this, e), e.color.copy(this.color), e
        }, n.AmbientLight = function(e) {
            n.Light.call(this, e), this.type = "AmbientLight"
        }, n.AmbientLight.prototype = Object.create(n.Light.prototype), n.AmbientLight.prototype.clone = function() {
            var e = new n.AmbientLight;
            return n.Light.prototype.clone.call(this, e), e
        }, n.AreaLight = function(e, t) {
            n.Light.call(this, e), this.type = "AreaLight", this.normal = new n.Vector3(0, -1, 0), this.right = new n.Vector3(1, 0, 0), this.intensity = void 0 !== t ? t : 1, this.width = 1, this.height = 1, this.constantAttenuation = 1.5, this.linearAttenuation = .5, this.quadraticAttenuation = .1
        }, n.AreaLight.prototype = Object.create(n.Light.prototype), n.DirectionalLight = function(e, t) {
            n.Light.call(this, e), this.type = "DirectionalLight", this.position.set(0, 1, 0), this.target = new n.Object3D, this.intensity = void 0 !== t ? t : 1, this.castShadow = !1, this.onlyShadow = !1, this.shadowCameraNear = 50, this.shadowCameraFar = 5e3, this.shadowCameraLeft = -500, this.shadowCameraRight = 500, this.shadowCameraTop = 500, this.shadowCameraBottom = -500, this.shadowCameraVisible = !1, this.shadowBias = 0, this.shadowDarkness = .5, this.shadowMapWidth = 512, this.shadowMapHeight = 512, this.shadowCascade = !1, this.shadowCascadeOffset = new n.Vector3(0, 0, -1e3), this.shadowCascadeCount = 2, this.shadowCascadeBias = [0, 0, 0], this.shadowCascadeWidth = [512, 512, 512], this.shadowCascadeHeight = [512, 512, 512], this.shadowCascadeNearZ = [-1, .99, .998], this.shadowCascadeFarZ = [.99, .998, 1], this.shadowCascadeArray = [], this.shadowMap = null, this.shadowMapSize = null, this.shadowCamera = null, this.shadowMatrix = null
        }, n.DirectionalLight.prototype = Object.create(n.Light.prototype), n.DirectionalLight.prototype.clone = function() {
            var e = new n.DirectionalLight;
            return n.Light.prototype.clone.call(this, e), e.target = this.target.clone(), e.intensity = this.intensity, e.castShadow = this.castShadow, e.onlyShadow = this.onlyShadow, e.shadowCameraNear = this.shadowCameraNear, e.shadowCameraFar = this.shadowCameraFar, e.shadowCameraLeft = this.shadowCameraLeft, e.shadowCameraRight = this.shadowCameraRight, e.shadowCameraTop = this.shadowCameraTop, e.shadowCameraBottom = this.shadowCameraBottom, e.shadowCameraVisible = this.shadowCameraVisible, e.shadowBias = this.shadowBias, e.shadowDarkness = this.shadowDarkness, e.shadowMapWidth = this.shadowMapWidth, e.shadowMapHeight = this.shadowMapHeight, e.shadowCascade = this.shadowCascade, e.shadowCascadeOffset.copy(this.shadowCascadeOffset), e.shadowCascadeCount = this.shadowCascadeCount, e.shadowCascadeBias = this.shadowCascadeBias.slice(0), e.shadowCascadeWidth = this.shadowCascadeWidth.slice(0), e.shadowCascadeHeight = this.shadowCascadeHeight.slice(0), e.shadowCascadeNearZ = this.shadowCascadeNearZ.slice(0), e.shadowCascadeFarZ = this.shadowCascadeFarZ.slice(0), e
        }, n.HemisphereLight = function(e, t, r) {
            n.Light.call(this, e), this.type = "HemisphereLight", this.position.set(0, 100, 0), this.groundColor = new n.Color(t), this.intensity = void 0 !== r ? r : 1
        }, n.HemisphereLight.prototype = Object.create(n.Light.prototype), n.HemisphereLight.prototype.clone = function() {
            var e = new n.HemisphereLight;
            return n.Light.prototype.clone.call(this, e), e.groundColor.copy(this.groundColor), e.intensity = this.intensity, e
        }, n.PointLight = function(e, t, r) {
            n.Light.call(this, e), this.type = "PointLight", this.intensity = void 0 !== t ? t : 1, this.distance = void 0 !== r ? r : 0
        }, n.PointLight.prototype = Object.create(n.Light.prototype), n.PointLight.prototype.clone = function() {
            var e = new n.PointLight;
            return n.Light.prototype.clone.call(this, e), e.intensity = this.intensity, e.distance = this.distance, e
        }, n.SpotLight = function(e, t, r, i, o) {
            n.Light.call(this, e), this.type = "SpotLight", this.position.set(0, 1, 0), this.target = new n.Object3D, this.intensity = void 0 !== t ? t : 1, this.distance = void 0 !== r ? r : 0, this.angle = void 0 !== i ? i : Math.PI / 3, this.exponent = void 0 !== o ? o : 10, this.castShadow = !1, this.onlyShadow = !1, this.shadowCameraNear = 50, this.shadowCameraFar = 5e3, this.shadowCameraFov = 50, this.shadowCameraVisible = !1, this.shadowBias = 0, this.shadowDarkness = .5, this.shadowMapWidth = 512, this.shadowMapHeight = 512, this.shadowMap = null, this.shadowMapSize = null, this.shadowCamera = null, this.shadowMatrix = null
        }, n.SpotLight.prototype = Object.create(n.Light.prototype), n.SpotLight.prototype.clone = function() {
            var e = new n.SpotLight;
            return n.Light.prototype.clone.call(this, e), e.target = this.target.clone(), e.intensity = this.intensity, e.distance = this.distance, e.angle = this.angle, e.exponent = this.exponent, e.castShadow = this.castShadow, e.onlyShadow = this.onlyShadow, e.shadowCameraNear = this.shadowCameraNear, e.shadowCameraFar = this.shadowCameraFar, e.shadowCameraFov = this.shadowCameraFov, e.shadowCameraVisible = this.shadowCameraVisible, e.shadowBias = this.shadowBias, e.shadowDarkness = this.shadowDarkness, e.shadowMapWidth = this.shadowMapWidth, e.shadowMapHeight = this.shadowMapHeight, e
        }, n.Cache = function() {
            this.files = {}
        }, n.Cache.prototype = {
            constructor: n.Cache,
            add: function(e, t) {
                this.files[e] = t
            },
            get: function(e) {
                return this.files[e]
            },
            remove: function(e) {
                delete this.files[e]
            },
            clear: function() {
                this.files = {}
            }
        }, n.Loader = function(e) {
            this.showStatus = e, this.statusDomElement = e ? n.Loader.prototype.addStatusElement() : null, this.imageLoader = new n.ImageLoader, this.onLoadStart = function() {}, this.onLoadProgress = function() {}, this.onLoadComplete = function() {}
        }, n.Loader.prototype = {
            constructor: n.Loader,
            crossOrigin: void 0,
            addStatusElement: function() {
                var e = document.createElement("div");
                return e.style.right = "0px", e.style.top = "0px", e.style.fontSize = "0.8em", e.style.textAlign = "left", e.style.background = "rgba(0,0,0,0.25)", e.style.color = "#fff", e.style.width = "120px", e.style.padding = "0.5em 0.5em 0.5em 0.5em", e.style.zIndex = 1e3, e.innerHTML = "Loading ...", e
            },
            updateProgress: function(e) {
                var t = "Loaded ";
                t += e.total ? (100 * e.loaded / e.total).toFixed(0) + "%" : (e.loaded / 1024).toFixed(2) + " KB", this.statusDomElement.innerHTML = t
            },
            extractUrlBase: function(e) {
                var t = e.split("/");
                return 1 === t.length ? "./" : (t.pop(), t.join("/") + "/")
            },
            initMaterials: function(e, t) {
                for (var r = [], i = 0; i < e.length; ++i) r[i] = this.createMaterial(e[i], t);
                return r
            },
            needsTangents: function(e) {
                for (var t = 0, r = e.length; r > t; t++) {
                    var i = e[t];
                    if (i instanceof n.ShaderMaterial) return !0
                }
                return !1
            },
            createMaterial: function(e, t) {
                function r(e) {
                    var t = Math.log(e) / Math.LN2;
                    return Math.pow(2, Math.round(t))
                }

                function i(e, i, o, s, h, l, u) {
                    var c, f = t + o,
                        p = n.Loader.Handlers.get(f);
                    if (null !== p ? c = p.load(f) : (c = new n.Texture, p = a.imageLoader, p.crossOrigin = a.crossOrigin, p.load(f, function(e) {
                            if (n.Math.isPowerOfTwo(e.width) === !1 || n.Math.isPowerOfTwo(e.height) === !1) {
                                var t = r(e.width),
                                    i = r(e.height),
                                    o = document.createElement("canvas");
                                o.width = t, o.height = i;
                                var a = o.getContext("2d");
                                a.drawImage(e, 0, 0, t, i), c.image = o
                            } else c.image = e;
                            c.needsUpdate = !0
                        })), c.sourceFile = o, s && (c.repeat.set(s[0], s[1]), 1 !== s[0] && (c.wrapS = n.RepeatWrapping), 1 !== s[1] && (c.wrapT = n.RepeatWrapping)), h && c.offset.set(h[0], h[1]), l) {
                        var d = {
                            repeat: n.RepeatWrapping,
                            mirror: n.MirroredRepeatWrapping
                        };
                        void 0 !== d[l[0]] && (c.wrapS = d[l[0]]), void 0 !== d[l[1]] && (c.wrapT = d[l[1]])
                    }
                    u && (c.anisotropy = u), e[i] = c
                }

                function o(e) {
                    return (255 * e[0] << 16) + (255 * e[1] << 8) + 255 * e[2]
                }
                var a = this,
                    s = "MeshLambertMaterial",
                    h = {
                        color: 15658734,
                        opacity: 1,
                        map: null,
                        lightMap: null,
                        normalMap: null,
                        bumpMap: null,
                        wireframe: !1
                    };
                if (e.shading) {
                    var l = e.shading.toLowerCase();
                    "phong" === l ? s = "MeshPhongMaterial" : "basic" === l && (s = "MeshBasicMaterial")
                }
                if (void 0 !== e.blending && void 0 !== n[e.blending] && (h.blending = n[e.blending]), (void 0 !== e.transparent || e.opacity < 1) && (h.transparent = e.transparent), void 0 !== e.depthTest && (h.depthTest = e.depthTest), void 0 !== e.depthWrite && (h.depthWrite = e.depthWrite), void 0 !== e.visible && (h.visible = e.visible), void 0 !== e.flipSided && (h.side = n.BackSide), void 0 !== e.doubleSided && (h.side = n.DoubleSide), void 0 !== e.wireframe && (h.wireframe = e.wireframe), void 0 !== e.vertexColors && ("face" === e.vertexColors ? h.vertexColors = n.FaceColors : e.vertexColors && (h.vertexColors = n.VertexColors)), e.colorDiffuse ? h.color = o(e.colorDiffuse) : e.DbgColor && (h.color = e.DbgColor), e.colorSpecular && (h.specular = o(e.colorSpecular)), e.colorAmbient && (h.ambient = o(e.colorAmbient)), e.colorEmissive && (h.emissive = o(e.colorEmissive)), e.transparency && (h.opacity = e.transparency), e.specularCoef && (h.shininess = e.specularCoef), e.mapDiffuse && t && i(h, "map", e.mapDiffuse, e.mapDiffuseRepeat, e.mapDiffuseOffset, e.mapDiffuseWrap, e.mapDiffuseAnisotropy), e.mapLight && t && i(h, "lightMap", e.mapLight, e.mapLightRepeat, e.mapLightOffset, e.mapLightWrap, e.mapLightAnisotropy), e.mapBump && t && i(h, "bumpMap", e.mapBump, e.mapBumpRepeat, e.mapBumpOffset, e.mapBumpWrap, e.mapBumpAnisotropy), e.mapNormal && t && i(h, "normalMap", e.mapNormal, e.mapNormalRepeat, e.mapNormalOffset, e.mapNormalWrap, e.mapNormalAnisotropy), e.mapSpecular && t && i(h, "specularMap", e.mapSpecular, e.mapSpecularRepeat, e.mapSpecularOffset, e.mapSpecularWrap, e.mapSpecularAnisotropy), e.mapAlpha && t && i(h, "alphaMap", e.mapAlpha, e.mapAlphaRepeat, e.mapAlphaOffset, e.mapAlphaWrap, e.mapAlphaAnisotropy), e.mapBumpScale && (h.bumpScale = e.mapBumpScale), e.mapNormal) {
                    var u = n.ShaderLib.normalmap,
                        c = n.UniformsUtils.clone(u.uniforms);
                    c.tNormal.value = h.normalMap, e.mapNormalFactor && c.uNormalScale.value.set(e.mapNormalFactor, e.mapNormalFactor), h.map && (c.tDiffuse.value = h.map, c.enableDiffuse.value = !0), h.specularMap && (c.tSpecular.value = h.specularMap, c.enableSpecular.value = !0), h.lightMap && (c.tAO.value = h.lightMap, c.enableAO.value = !0), c.diffuse.value.setHex(h.color), c.specular.value.setHex(h.specular), c.ambient.value.setHex(h.ambient), c.shininess.value = h.shininess, void 0 !== h.opacity && (c.opacity.value = h.opacity);
                    var f = {
                            fragmentShader: u.fragmentShader,
                            vertexShader: u.vertexShader,
                            uniforms: c,
                            lights: !0,
                            fog: !0
                        },
                        p = new n.ShaderMaterial(f);
                    h.transparent && (p.transparent = !0)
                } else var p = new n[s](h);
                return void 0 !== e.DbgName && (p.name = e.DbgName), p
            }
        }, n.Loader.Handlers = {
            handlers: [],
            add: function(e, t) {
                this.handlers.push(e, t)
            },
            get: function(e) {
                for (var t = 0, r = this.handlers.length; r > t; t += 2) {
                    var i = this.handlers[t],
                        n = this.handlers[t + 1];
                    if (i.test(e)) return n
                }
                return null
            }
        }, n.XHRLoader = function(e) {
            this.cache = new n.Cache, this.manager = void 0 !== e ? e : n.DefaultLoadingManager
        }, n.XHRLoader.prototype = {
            constructor: n.XHRLoader,
            load: function(e, t, r, i) {
                var n = this,
                    o = n.cache.get(e);
                if (void 0 !== o) return void(t && t(o));
                var a = new XMLHttpRequest;
                a.open("GET", e, !0), a.addEventListener("load", function(r) {
                    n.cache.add(e, this.response), t && t(this.response), n.manager.itemEnd(e)
                }, !1), void 0 !== r && a.addEventListener("progress", function(e) {
                    r(e)
                }, !1), void 0 !== i && a.addEventListener("error", function(e) {
                    i(e)
                }, !1), void 0 !== this.crossOrigin && (a.crossOrigin = this.crossOrigin), void 0 !== this.responseType && (a.responseType = this.responseType), a.send(null), n.manager.itemStart(e)
            },
            setResponseType: function(e) {
                this.responseType = e
            },
            setCrossOrigin: function(e) {
                this.crossOrigin = e
            }
        }, n.ImageLoader = function(e) {
            this.cache = new n.Cache, this.manager = void 0 !== e ? e : n.DefaultLoadingManager
        }, n.ImageLoader.prototype = {
            constructor: n.ImageLoader,
            load: function(e, t, r, i) {
                var n = this,
                    o = n.cache.get(e);
                if (void 0 !== o) return void t(o);
                var a = document.createElement("img");
                return void 0 !== t && a.addEventListener("load", function(r) {
                    n.cache.add(e, this), t(this), n.manager.itemEnd(e)
                }, !1), void 0 !== r && a.addEventListener("progress", function(e) {
                    r(e)
                }, !1), void 0 !== i && a.addEventListener("error", function(e) {
                    i(e)
                }, !1), void 0 !== this.crossOrigin && (a.crossOrigin = this.crossOrigin), a.src = e, n.manager.itemStart(e), a
            },
            setCrossOrigin: function(e) {
                this.crossOrigin = e
            }
        }, n.JSONLoader = function(e) {
            n.Loader.call(this, e), this.withCredentials = !1
        }, n.JSONLoader.prototype = Object.create(n.Loader.prototype), n.JSONLoader.prototype.load = function(e, t, r) {
            r = r && "string" == typeof r ? r : this.extractUrlBase(e), this.onLoadStart(), this.loadAjaxJSON(this, e, t, r)
        }, n.JSONLoader.prototype.loadAjaxJSON = function(e, t, r, i, n) {
            var o = new XMLHttpRequest,
                a = 0;
            o.onreadystatechange = function() {
                if (o.readyState === o.DONE)
                    if (200 === o.status || 0 === o.status) {
                        if (o.responseText) {
                            var s = JSON.parse(o.responseText);
                            if (void 0 !== s.metadata && "scene" === s.metadata.type) return void console.error('THREE.JSONLoader: "' + t + '" seems to be a Scene. Use THREE.SceneLoader instead.');
                            var h = e.parse(s, i);
                            r(h.geometry, h.materials)
                        } else console.error('THREE.JSONLoader: "' + t + '" seems to be unreachable or the file is empty.');
                        e.onLoadComplete()
                    } else console.error("THREE.JSONLoader: Couldn't load \"" + t + '" (' + o.status + ")");
                else o.readyState === o.LOADING ? n && (0 === a && (a = o.getResponseHeader("Content-Length")), n({
                    total: a,
                    loaded: o.responseText.length
                })) : o.readyState === o.HEADERS_RECEIVED && void 0 !== n && (a = o.getResponseHeader("Content-Length"))
            }, o.open("GET", t, !0), o.withCredentials = this.withCredentials, o.send(null)
        }, n.JSONLoader.prototype.parse = function(e, t) {
            function r(t) {
                function r(e, t) {
                    return e & 1 << t
                }
                var i, o, s, h, l, u, c, f, p, d, m, v, g, y, x, w, b, _, M, S, T, A, E, C, L, P, R, D = e.faces,
                    F = e.vertices,
                    U = e.normals,
                    B = e.colors,
                    k = 0;
                if (void 0 !== e.uvs) {
                    for (i = 0; i < e.uvs.length; i++) e.uvs[i].length && k++;
                    for (i = 0; k > i; i++) a.faceVertexUvs[i] = []
                }
                for (h = 0, l = F.length; l > h;) _ = new n.Vector3, _.x = F[h++] * t, _.y = F[h++] * t, _.z = F[h++] * t, a.vertices.push(_);
                for (h = 0, l = D.length; l > h;)
                    if (d = D[h++], m = r(d, 0), v = r(d, 1), g = r(d, 3), y = r(d, 4), x = r(d, 5), w = r(d, 6), b = r(d, 7), m) {
                        if (S = new n.Face3, S.a = D[h], S.b = D[h + 1], S.c = D[h + 3], T = new n.Face3, T.a = D[h + 1], T.b = D[h + 2], T.c = D[h + 3], h += 4, v && (p = D[h++], S.materialIndex = p, T.materialIndex = p), s = a.faces.length, g)
                            for (i = 0; k > i; i++)
                                for (C = e.uvs[i], a.faceVertexUvs[i][s] = [], a.faceVertexUvs[i][s + 1] = [], o = 0; 4 > o; o++) f = D[h++], P = C[2 * f], R = C[2 * f + 1], L = new n.Vector2(P, R), 2 !== o && a.faceVertexUvs[i][s].push(L), 0 !== o && a.faceVertexUvs[i][s + 1].push(L);
                        if (y && (c = 3 * D[h++], S.normal.set(U[c++], U[c++], U[c]), T.normal.copy(S.normal)), x)
                            for (i = 0; 4 > i; i++) c = 3 * D[h++], E = new n.Vector3(U[c++], U[c++], U[c]), 2 !== i && S.vertexNormals.push(E), 0 !== i && T.vertexNormals.push(E);
                        if (w && (u = D[h++], A = B[u], S.color.setHex(A), T.color.setHex(A)), b)
                            for (i = 0; 4 > i; i++) u = D[h++], A = B[u], 2 !== i && S.vertexColors.push(new n.Color(A)), 0 !== i && T.vertexColors.push(new n.Color(A));
                        a.faces.push(S), a.faces.push(T)
                    } else {
                        if (M = new n.Face3, M.a = D[h++], M.b = D[h++], M.c = D[h++], v && (p = D[h++], M.materialIndex = p), s = a.faces.length, g)
                            for (i = 0; k > i; i++)
                                for (C = e.uvs[i], a.faceVertexUvs[i][s] = [], o = 0; 3 > o; o++) f = D[h++], P = C[2 * f], R = C[2 * f + 1], L = new n.Vector2(P, R), a.faceVertexUvs[i][s].push(L);
                        if (y && (c = 3 * D[h++], M.normal.set(U[c++], U[c++], U[c])), x)
                            for (i = 0; 3 > i; i++) c = 3 * D[h++], E = new n.Vector3(U[c++], U[c++], U[c]), M.vertexNormals.push(E);
                        if (w && (u = D[h++], M.color.setHex(B[u])), b)
                            for (i = 0; 3 > i; i++) u = D[h++], M.vertexColors.push(new n.Color(B[u]));
                        a.faces.push(M)
                    }
            }

            function i() {
                var t = void 0 !== e.influencesPerVertex ? e.influencesPerVertex : 2;
                if (e.skinWeights)
                    for (var r = 0, i = e.skinWeights.length; i > r; r += t) {
                        var o = e.skinWeights[r],
                            s = t > 1 ? e.skinWeights[r + 1] : 0,
                            h = t > 2 ? e.skinWeights[r + 2] : 0,
                            l = t > 3 ? e.skinWeights[r + 3] : 0;
                        a.skinWeights.push(new n.Vector4(o, s, h, l))
                    }
                if (e.skinIndices)
                    for (var r = 0, i = e.skinIndices.length; i > r; r += t) {
                        var u = e.skinIndices[r],
                            c = t > 1 ? e.skinIndices[r + 1] : 0,
                            f = t > 2 ? e.skinIndices[r + 2] : 0,
                            p = t > 3 ? e.skinIndices[r + 3] : 0;
                        a.skinIndices.push(new n.Vector4(u, c, f, p))
                    }
                a.bones = e.bones, a.bones && a.bones.length > 0 && (a.skinWeights.length !== a.skinIndices.length || a.skinIndices.length !== a.vertices.length) && console.warn("When skinning, number of vertices (" + a.vertices.length + "), skinIndices (" + a.skinIndices.length + "), and skinWeights (" + a.skinWeights.length + ") should match."), a.animation = e.animation, a.animations = e.animations
            }

            function o(t) {
                if (void 0 !== e.morphTargets) {
                    var r, i, o, s, h, l;
                    for (r = 0, i = e.morphTargets.length; i > r; r++)
                        for (a.morphTargets[r] = {}, a.morphTargets[r].name = e.morphTargets[r].name, a.morphTargets[r].vertices = [], h = a.morphTargets[r].vertices, l = e.morphTargets[r].vertices, o = 0, s = l.length; s > o; o += 3) {
                            var u = new n.Vector3;
                            u.x = l[o] * t, u.y = l[o + 1] * t, u.z = l[o + 2] * t, h.push(u)
                        }
                }
                if (void 0 !== e.morphColors) {
                    var r, i, c, f, p, d, m;
                    for (r = 0, i = e.morphColors.length; i > r; r++)
                        for (a.morphColors[r] = {}, a.morphColors[r].name = e.morphColors[r].name, a.morphColors[r].colors = [], p = a.morphColors[r].colors, d = e.morphColors[r].colors, c = 0, f = d.length; f > c; c += 3) m = new n.Color(16755200), m.setRGB(d[c], d[c + 1], d[c + 2]), p.push(m)
                }
            }
            var a = new n.Geometry,
                s = void 0 !== e.scale ? 1 / e.scale : 1;
            if (r(s), i(), o(s), a.computeFaceNormals(), a.computeBoundingSphere(), void 0 === e.materials || 0 === e.materials.length) return {
                geometry: a
            };
            var h = this.initMaterials(e.materials, t);
            return this.needsTangents(h) && a.computeTangents(), {
                geometry: a,
                materials: h
            }
        }, n.LoadingManager = function(e, t, r) {
            var i = this,
                n = 0,
                o = 0;
            this.onLoad = e, this.onProgress = t, this.onError = r, this.itemStart = function(e) {
                o++
            }, this.itemEnd = function(e) {
                n++, void 0 !== i.onProgress && i.onProgress(e, n, o), n === o && void 0 !== i.onLoad && i.onLoad()
            }
        }, n.DefaultLoadingManager = new n.LoadingManager, n.BufferGeometryLoader = function(e) {
            this.manager = void 0 !== e ? e : n.DefaultLoadingManager
        }, n.BufferGeometryLoader.prototype = {
            constructor: n.BufferGeometryLoader,
            load: function(e, t, r, i) {
                var o = this,
                    a = new n.XHRLoader;
                a.setCrossOrigin(this.crossOrigin), a.load(e, function(e) {
                    t(o.parse(JSON.parse(e)))
                }, r, i)
            },
            setCrossOrigin: function(e) {
                this.crossOrigin = e
            },
            parse: function(e) {
                var t = new n.BufferGeometry,
                    r = e.attributes;
                for (var o in r) {
                    var a = r[o],
                        s = new i[a.type](a.array);
                    t.addAttribute(o, new n.BufferAttribute(s, a.itemSize))
                }
                var h = e.offsets;
                void 0 !== h && (t.offsets = JSON.parse(JSON.stringify(h)));
                var l = e.boundingSphere;
                if (void 0 !== l) {
                    var u = new n.Vector3;
                    void 0 !== l.center && u.fromArray(l.center), t.boundingSphere = new n.Sphere(u, l.radius)
                }
                return t
            }
        }, n.MaterialLoader = function(e) {
            this.manager = void 0 !== e ? e : n.DefaultLoadingManager
        }, n.MaterialLoader.prototype = {
            constructor: n.MaterialLoader,
            load: function(e, t, r, i) {
                var o = this,
                    a = new n.XHRLoader;
                a.setCrossOrigin(this.crossOrigin), a.load(e, function(e) {
                    t(o.parse(JSON.parse(e)))
                }, r, i)
            },
            setCrossOrigin: function(e) {
                this.crossOrigin = e
            },
            parse: function(e) {
                var t = new n[e.type];
                if (void 0 !== e.color && t.color.setHex(e.color), void 0 !== e.ambient && t.ambient.setHex(e.ambient), void 0 !== e.emissive && t.emissive.setHex(e.emissive), void 0 !== e.specular && t.specular.setHex(e.specular), void 0 !== e.shininess && (t.shininess = e.shininess), void 0 !== e.uniforms && (t.uniforms = e.uniforms), void 0 !== e.vertexShader && (t.vertexShader = e.vertexShader), void 0 !== e.fragmentShader && (t.fragmentShader = e.fragmentShader), void 0 !== e.vertexColors && (t.vertexColors = e.vertexColors), void 0 !== e.shading && (t.shading = e.shading), void 0 !== e.blending && (t.blending = e.blending), void 0 !== e.side && (t.side = e.side), void 0 !== e.opacity && (t.opacity = e.opacity), void 0 !== e.transparent && (t.transparent = e.transparent), void 0 !== e.wireframe && (t.wireframe = e.wireframe), void 0 !== e.materials)
                    for (var r = 0, i = e.materials.length; i > r; r++) t.materials.push(this.parse(e.materials[r]));
                return t
            }
        }, n.ObjectLoader = function(e) {
            this.manager = void 0 !== e ? e : n.DefaultLoadingManager
        }, n.ObjectLoader.prototype = {
            constructor: n.ObjectLoader,
            load: function(e, t, r, i) {
                var o = this,
                    a = new n.XHRLoader(o.manager);
                a.setCrossOrigin(this.crossOrigin), a.load(e, function(e) {
                    t(o.parse(JSON.parse(e)))
                }, r, i)
            },
            setCrossOrigin: function(e) {
                this.crossOrigin = e
            },
            parse: function(e) {
                var t = this.parseGeometries(e.geometries),
                    r = this.parseMaterials(e.materials),
                    i = this.parseObject(e.object, t, r);
                return i
            },
            parseGeometries: function(e) {
                var t = {};
                if (void 0 !== e)
                    for (var r = new n.JSONLoader, i = new n.BufferGeometryLoader, o = 0, a = e.length; a > o; o++) {
                        var s, h = e[o];
                        switch (h.type) {
                            case "PlaneGeometry":
                                s = new n.PlaneGeometry(h.width, h.height, h.widthSegments, h.heightSegments);
                                break;
                            case "BoxGeometry":
                            case "CubeGeometry":
                                s = new n.BoxGeometry(h.width, h.height, h.depth, h.widthSegments, h.heightSegments, h.depthSegments);
                                break;
                            case "CircleGeometry":
                                s = new n.CircleGeometry(h.radius, h.segments);
                                break;
                            case "CylinderGeometry":
                                s = new n.CylinderGeometry(h.radiusTop, h.radiusBottom, h.height, h.radialSegments, h.heightSegments, h.openEnded);
                                break;
                            case "SphereGeometry":
                                s = new n.SphereGeometry(h.radius, h.widthSegments, h.heightSegments, h.phiStart, h.phiLength, h.thetaStart, h.thetaLength);
                                break;
                            case "IcosahedronGeometry":
                                s = new n.IcosahedronGeometry(h.radius, h.detail);
                                break;
                            case "TorusGeometry":
                                s = new n.TorusGeometry(h.radius, h.tube, h.radialSegments, h.tubularSegments, h.arc);
                                break;
                            case "TorusKnotGeometry":
                                s = new n.TorusKnotGeometry(h.radius, h.tube, h.radialSegments, h.tubularSegments, h.p, h.q, h.heightScale);
                                break;
                            case "BufferGeometry":
                                s = i.parse(h.data);
                                break;
                            case "Geometry":
                                s = r.parse(h.data).geometry
                        }
                        s.uuid = h.uuid, void 0 !== h.name && (s.name = h.name), t[h.uuid] = s
                    }
                return t
            },
            parseMaterials: function(e) {
                var t = {};
                if (void 0 !== e)
                    for (var r = new n.MaterialLoader, i = 0, o = e.length; o > i; i++) {
                        var a = e[i],
                            s = r.parse(a);
                        s.uuid = a.uuid, void 0 !== a.name && (s.name = a.name), t[a.uuid] = s
                    }
                return t
            },
            parseObject: function() {
                var e = new n.Matrix4;
                return function(t, r, i) {
                    var o;
                    switch (t.type) {
                        case "Scene":
                            o = new n.Scene;
                            break;
                        case "PerspectiveCamera":
                            o = new n.PerspectiveCamera(t.fov, t.aspect, t.near, t.far);
                            break;
                        case "OrthographicCamera":
                            o = new n.OrthographicCamera(t.left, t.right, t.top, t.bottom, t.near, t.far);
                            break;
                        case "AmbientLight":
                            o = new n.AmbientLight(t.color);
                            break;
                        case "DirectionalLight":
                            o = new n.DirectionalLight(t.color, t.intensity);
                            break;
                        case "PointLight":
                            o = new n.PointLight(t.color, t.intensity, t.distance);
                            break;
                        case "SpotLight":
                            o = new n.SpotLight(t.color, t.intensity, t.distance, t.angle, t.exponent);
                            break;
                        case "HemisphereLight":
                            o = new n.HemisphereLight(t.color, t.groundColor, t.intensity);
                            break;
                        case "Mesh":
                            var a = r[t.geometry],
                                s = i[t.material];
                            void 0 === a && console.warn("THREE.ObjectLoader: Undefined geometry", t.geometry), void 0 === s && console.warn("THREE.ObjectLoader: Undefined material", t.material), o = new n.Mesh(a, s);
                            break;
                        case "Line":
                            var a = r[t.geometry],
                                s = i[t.material];
                            void 0 === a && console.warn("THREE.ObjectLoader: Undefined geometry", t.geometry), void 0 === s && console.warn("THREE.ObjectLoader: Undefined material", t.material), o = new n.Line(a, s);
                            break;
                        case "Sprite":
                            var s = i[t.material];
                            void 0 === s && console.warn("THREE.ObjectLoader: Undefined material", t.material), o = new n.Sprite(s);
                            break;
                        case "Group":
                            o = new n.Group;
                            break;
                        default:
                            o = new n.Object3D
                    }
                    if (o.uuid = t.uuid, void 0 !== t.name && (o.name = t.name), void 0 !== t.matrix ? (e.fromArray(t.matrix), e.decompose(o.position, o.quaternion, o.scale)) : (void 0 !== t.position && o.position.fromArray(t.position), void 0 !== t.rotation && o.rotation.fromArray(t.rotation), void 0 !== t.scale && o.scale.fromArray(t.scale)), void 0 !== t.visible && (o.visible = t.visible), void 0 !== t.userData && (o.userData = t.userData), void 0 !== t.children)
                        for (var h in t.children) o.add(this.parseObject(t.children[h], r, i));
                    return o
                }
            }()
        }, n.TextureLoader = function(e) {
            this.manager = void 0 !== e ? e : n.DefaultLoadingManager
        }, n.TextureLoader.prototype = {
            constructor: n.TextureLoader,
            load: function(e, t, r, i) {
                var o = this,
                    a = new n.ImageLoader(o.manager);
                a.setCrossOrigin(this.crossOrigin), a.load(e, function(e) {
                    var r = new n.Texture(e);
                    r.needsUpdate = !0, void 0 !== t && t(r)
                }, r, i)
            },
            setCrossOrigin: function(e) {
                this.crossOrigin = e
            }
        }, n.CompressedTextureLoader = function() {
            this._parser = null
        }, n.CompressedTextureLoader.prototype = {
            constructor: n.CompressedTextureLoader,
            load: function(e, t, r) {
                var i = this,
                    o = [],
                    a = new n.CompressedTexture;
                a.image = o;
                var s = new n.XHRLoader;
                if (s.setResponseType("arraybuffer"), e instanceof Array)
                    for (var h = 0, l = function(r) {
                        s.load(e[r], function(e) {
                            var s = i._parser(e, !0);
                            o[r] = {
                                width: s.width,
                                height: s.height,
                                format: s.format,
                                mipmaps: s.mipmaps
                            }, h += 1, 6 === h && (1 == s.mipmapCount && (a.minFilter = n.LinearFilter), a.format = s.format, a.needsUpdate = !0, t && t(a))
                        })
                    }, u = 0, c = e.length; c > u; ++u) l(u);
                else s.load(e, function(e) {
                    var r = i._parser(e, !0);
                    if (r.isCubemap)
                        for (var s = r.mipmaps.length / r.mipmapCount, h = 0; s > h; h++) {
                            o[h] = {
                                mipmaps: []
                            };
                            for (var l = 0; l < r.mipmapCount; l++) o[h].mipmaps.push(r.mipmaps[h * r.mipmapCount + l]), o[h].format = r.format, o[h].width = r.width, o[h].height = r.height
                        } else a.image.width = r.width, a.image.height = r.height, a.mipmaps = r.mipmaps;
                    1 === r.mipmapCount && (a.minFilter = n.LinearFilter), a.format = r.format, a.needsUpdate = !0, t && t(a)
                });
                return a
            }
        }, n.Material = function() {
            Object.defineProperty(this, "id", {
                value: n.MaterialIdCount++
            }), this.uuid = n.Math.generateUUID(), this.name = "", this.type = "Material", this.side = n.FrontSide, this.opacity = 1, this.transparent = !1, this.blending = n.NormalBlending, this.blendSrc = n.SrcAlphaFactor, this.blendDst = n.OneMinusSrcAlphaFactor, this.blendEquation = n.AddEquation, this.depthTest = !0, this.depthWrite = !0, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.alphaTest = 0, this.overdraw = 0, this.visible = !0, this.needsUpdate = !0
        }, n.Material.prototype = {
            constructor: n.Material,
            setValues: function(e) {
                if (void 0 !== e)
                    for (var t in e) {
                        var r = e[t];
                        if (void 0 !== r) {
                            if (t in this) {
                                var i = this[t];
                                i instanceof n.Color ? i.set(r) : i instanceof n.Vector3 && r instanceof n.Vector3 ? i.copy(r) : "overdraw" == t ? this[t] = Number(r) : this[t] = r
                            }
                        } else console.warn("THREE.Material: '" + t + "' parameter is undefined.")
                    }
            },
            toJSON: function() {
                var e = {
                    metadata: {
                        version: 4.2,
                        type: "material",
                        generator: "MaterialExporter"
                    },
                    uuid: this.uuid,
                    type: this.type
                };
                return "" !== this.name && (e.name = this.name), this instanceof n.MeshBasicMaterial ? (e.color = this.color.getHex(), this.vertexColors !== n.NoColors && (e.vertexColors = this.vertexColors), this.blending !== n.NormalBlending && (e.blending = this.blending), this.side !== n.FrontSide && (e.side = this.side)) : this instanceof n.MeshLambertMaterial ? (e.color = this.color.getHex(), e.ambient = this.ambient.getHex(), e.emissive = this.emissive.getHex(), this.vertexColors !== n.NoColors && (e.vertexColors = this.vertexColors), this.blending !== n.NormalBlending && (e.blending = this.blending), this.side !== n.FrontSide && (e.side = this.side)) : this instanceof n.MeshPhongMaterial ? (e.color = this.color.getHex(), e.ambient = this.ambient.getHex(), e.emissive = this.emissive.getHex(), e.specular = this.specular.getHex(), e.shininess = this.shininess, this.vertexColors !== n.NoColors && (e.vertexColors = this.vertexColors), this.blending !== n.NormalBlending && (e.blending = this.blending), this.side !== n.FrontSide && (e.side = this.side)) : this instanceof n.MeshNormalMaterial ? (this.shading !== n.FlatShading && (e.shading = this.shading), this.blending !== n.NormalBlending && (e.blending = this.blending), this.side !== n.FrontSide && (e.side = this.side)) : this instanceof n.MeshDepthMaterial ? (this.blending !== n.NormalBlending && (e.blending = this.blending), this.side !== n.FrontSide && (e.side = this.side)) : this instanceof n.ShaderMaterial ? (e.uniforms = this.uniforms, e.vertexShader = this.vertexShader, e.fragmentShader = this.fragmentShader) : this instanceof n.SpriteMaterial && (e.color = this.color.getHex()), this.opacity < 1 && (e.opacity = this.opacity), this.transparent !== !1 && (e.transparent = this.transparent),
                this.wireframe !== !1 && (e.wireframe = this.wireframe), e
            },
            clone: function(e) {
                return void 0 === e && (e = new n.Material), e.name = this.name, e.side = this.side, e.opacity = this.opacity, e.transparent = this.transparent, e.blending = this.blending, e.blendSrc = this.blendSrc, e.blendDst = this.blendDst, e.blendEquation = this.blendEquation, e.depthTest = this.depthTest, e.depthWrite = this.depthWrite, e.polygonOffset = this.polygonOffset, e.polygonOffsetFactor = this.polygonOffsetFactor, e.polygonOffsetUnits = this.polygonOffsetUnits, e.alphaTest = this.alphaTest, e.overdraw = this.overdraw, e.visible = this.visible, e
            },
            dispose: function() {
                this.dispatchEvent({
                    type: "dispose"
                })
            }
        }, n.EventDispatcher.prototype.apply(n.Material.prototype), n.MaterialIdCount = 0, n.LineBasicMaterial = function(e) {
            n.Material.call(this), this.type = "LineBasicMaterial", this.color = new n.Color(16777215), this.linewidth = 1, this.linecap = "round", this.linejoin = "round", this.vertexColors = n.NoColors, this.fog = !0, this.setValues(e)
        }, n.LineBasicMaterial.prototype = Object.create(n.Material.prototype), n.LineBasicMaterial.prototype.clone = function() {
            var e = new n.LineBasicMaterial;
            return n.Material.prototype.clone.call(this, e), e.color.copy(this.color), e.linewidth = this.linewidth, e.linecap = this.linecap, e.linejoin = this.linejoin, e.vertexColors = this.vertexColors, e.fog = this.fog, e
        }, n.LineDashedMaterial = function(e) {
            n.Material.call(this), this.type = "LineDashedMaterial", this.color = new n.Color(16777215), this.linewidth = 1, this.scale = 1, this.dashSize = 3, this.gapSize = 1, this.vertexColors = !1, this.fog = !0, this.setValues(e)
        }, n.LineDashedMaterial.prototype = Object.create(n.Material.prototype), n.LineDashedMaterial.prototype.clone = function() {
            var e = new n.LineDashedMaterial;
            return n.Material.prototype.clone.call(this, e), e.color.copy(this.color), e.linewidth = this.linewidth, e.scale = this.scale, e.dashSize = this.dashSize, e.gapSize = this.gapSize, e.vertexColors = this.vertexColors, e.fog = this.fog, e
        }, n.MeshBasicMaterial = function(e) {
            n.Material.call(this), this.type = "MeshBasicMaterial", this.color = new n.Color(16777215), this.map = null, this.lightMap = null, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.combine = n.MultiplyOperation, this.reflectivity = 1, this.refractionRatio = .98, this.fog = !0, this.shading = n.SmoothShading, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.vertexColors = n.NoColors, this.skinning = !1, this.morphTargets = !1, this.setValues(e)
        }, n.MeshBasicMaterial.prototype = Object.create(n.Material.prototype), n.MeshBasicMaterial.prototype.clone = function() {
            var e = new n.MeshBasicMaterial;
            return n.Material.prototype.clone.call(this, e), e.color.copy(this.color), e.map = this.map, e.lightMap = this.lightMap, e.specularMap = this.specularMap, e.alphaMap = this.alphaMap, e.envMap = this.envMap, e.combine = this.combine, e.reflectivity = this.reflectivity, e.refractionRatio = this.refractionRatio, e.fog = this.fog, e.shading = this.shading, e.wireframe = this.wireframe, e.wireframeLinewidth = this.wireframeLinewidth, e.wireframeLinecap = this.wireframeLinecap, e.wireframeLinejoin = this.wireframeLinejoin, e.vertexColors = this.vertexColors, e.skinning = this.skinning, e.morphTargets = this.morphTargets, e
        }, n.MeshLambertMaterial = function(e) {
            n.Material.call(this), this.type = "MeshLambertMaterial", this.color = new n.Color(16777215), this.ambient = new n.Color(16777215), this.emissive = new n.Color(0), this.wrapAround = !1, this.wrapRGB = new n.Vector3(1, 1, 1), this.map = null, this.lightMap = null, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.combine = n.MultiplyOperation, this.reflectivity = 1, this.refractionRatio = .98, this.fog = !0, this.shading = n.SmoothShading, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.vertexColors = n.NoColors, this.skinning = !1, this.morphTargets = !1, this.morphNormals = !1, this.setValues(e)
        }, n.MeshLambertMaterial.prototype = Object.create(n.Material.prototype), n.MeshLambertMaterial.prototype.clone = function() {
            var e = new n.MeshLambertMaterial;
            return n.Material.prototype.clone.call(this, e), e.color.copy(this.color), e.ambient.copy(this.ambient), e.emissive.copy(this.emissive), e.wrapAround = this.wrapAround, e.wrapRGB.copy(this.wrapRGB), e.map = this.map, e.lightMap = this.lightMap, e.specularMap = this.specularMap, e.alphaMap = this.alphaMap, e.envMap = this.envMap, e.combine = this.combine, e.reflectivity = this.reflectivity, e.refractionRatio = this.refractionRatio, e.fog = this.fog, e.shading = this.shading, e.wireframe = this.wireframe, e.wireframeLinewidth = this.wireframeLinewidth, e.wireframeLinecap = this.wireframeLinecap, e.wireframeLinejoin = this.wireframeLinejoin, e.vertexColors = this.vertexColors, e.skinning = this.skinning, e.morphTargets = this.morphTargets, e.morphNormals = this.morphNormals, e
        }, n.MeshPhongMaterial = function(e) {
            n.Material.call(this), this.type = "MeshPhongMaterial", this.color = new n.Color(16777215), this.ambient = new n.Color(16777215), this.emissive = new n.Color(0), this.specular = new n.Color(1118481), this.shininess = 30, this.metal = !1, this.wrapAround = !1, this.wrapRGB = new n.Vector3(1, 1, 1), this.map = null, this.lightMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalScale = new n.Vector2(1, 1), this.specularMap = null, this.alphaMap = null, this.envMap = null, this.combine = n.MultiplyOperation, this.reflectivity = 1, this.refractionRatio = .98, this.fog = !0, this.shading = n.SmoothShading, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.vertexColors = n.NoColors, this.skinning = !1, this.morphTargets = !1, this.morphNormals = !1, this.setValues(e)
        }, n.MeshPhongMaterial.prototype = Object.create(n.Material.prototype), n.MeshPhongMaterial.prototype.clone = function() {
            var e = new n.MeshPhongMaterial;
            return n.Material.prototype.clone.call(this, e), e.color.copy(this.color), e.ambient.copy(this.ambient), e.emissive.copy(this.emissive), e.specular.copy(this.specular), e.shininess = this.shininess, e.metal = this.metal, e.wrapAround = this.wrapAround, e.wrapRGB.copy(this.wrapRGB), e.map = this.map, e.lightMap = this.lightMap, e.bumpMap = this.bumpMap, e.bumpScale = this.bumpScale, e.normalMap = this.normalMap, e.normalScale.copy(this.normalScale), e.specularMap = this.specularMap, e.alphaMap = this.alphaMap, e.envMap = this.envMap, e.combine = this.combine, e.reflectivity = this.reflectivity, e.refractionRatio = this.refractionRatio, e.fog = this.fog, e.shading = this.shading, e.wireframe = this.wireframe, e.wireframeLinewidth = this.wireframeLinewidth, e.wireframeLinecap = this.wireframeLinecap, e.wireframeLinejoin = this.wireframeLinejoin, e.vertexColors = this.vertexColors, e.skinning = this.skinning, e.morphTargets = this.morphTargets, e.morphNormals = this.morphNormals, e
        }, n.MeshDepthMaterial = function(e) {
            n.Material.call(this), this.type = "MeshDepthMaterial", this.morphTargets = !1, this.wireframe = !1, this.wireframeLinewidth = 1, this.setValues(e)
        }, n.MeshDepthMaterial.prototype = Object.create(n.Material.prototype), n.MeshDepthMaterial.prototype.clone = function() {
            var e = new n.MeshDepthMaterial;
            return n.Material.prototype.clone.call(this, e), e.wireframe = this.wireframe, e.wireframeLinewidth = this.wireframeLinewidth, e
        }, n.MeshNormalMaterial = function(e) {
            n.Material.call(this, e), this.type = "MeshNormalMaterial", this.shading = n.FlatShading, this.wireframe = !1, this.wireframeLinewidth = 1, this.morphTargets = !1, this.setValues(e)
        }, n.MeshNormalMaterial.prototype = Object.create(n.Material.prototype), n.MeshNormalMaterial.prototype.clone = function() {
            var e = new n.MeshNormalMaterial;
            return n.Material.prototype.clone.call(this, e), e.shading = this.shading, e.wireframe = this.wireframe, e.wireframeLinewidth = this.wireframeLinewidth, e
        }, n.MeshFaceMaterial = function(e) {
            this.uuid = n.Math.generateUUID(), this.type = "MeshFaceMaterial", this.materials = e instanceof Array ? e : []
        }, n.MeshFaceMaterial.prototype = {
            constructor: n.MeshFaceMaterial,
            toJSON: function() {
                for (var e = {
                    metadata: {
                        version: 4.2,
                        type: "material",
                        generator: "MaterialExporter"
                    },
                    uuid: this.uuid,
                    type: this.type,
                    materials: []
                }, t = 0, r = this.materials.length; r > t; t++) e.materials.push(this.materials[t].toJSON());
                return e
            },
            clone: function() {
                for (var e = new n.MeshFaceMaterial, t = 0; t < this.materials.length; t++) e.materials.push(this.materials[t].clone());
                return e
            }
        }, n.PointCloudMaterial = function(e) {
            n.Material.call(this), this.type = "PointCloudMaterial", this.color = new n.Color(16777215), this.map = null, this.size = 1, this.sizeAttenuation = !0, this.vertexColors = n.NoColors, this.fog = !0, this.setValues(e)
        }, n.PointCloudMaterial.prototype = Object.create(n.Material.prototype), n.PointCloudMaterial.prototype.clone = function() {
            var e = new n.PointCloudMaterial;
            return n.Material.prototype.clone.call(this, e), e.color.copy(this.color), e.map = this.map, e.size = this.size, e.sizeAttenuation = this.sizeAttenuation, e.vertexColors = this.vertexColors, e.fog = this.fog, e
        }, n.ParticleBasicMaterial = function(e) {
            return console.warn("THREE.ParticleBasicMaterial has been renamed to THREE.PointCloudMaterial."), new n.PointCloudMaterial(e)
        }, n.ParticleSystemMaterial = function(e) {
            return console.warn("THREE.ParticleSystemMaterial has been renamed to THREE.PointCloudMaterial."), new n.PointCloudMaterial(e)
        }, n.ShaderMaterial = function(e) {
            n.Material.call(this), this.type = "ShaderMaterial", this.defines = {}, this.uniforms = {}, this.attributes = null, this.vertexShader = "void main() {\n    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}", this.fragmentShader = "void main() {\n   gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}", this.shading = n.SmoothShading, this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.vertexColors = n.NoColors, this.skinning = !1, this.morphTargets = !1, this.morphNormals = !1, this.defaultAttributeValues = {
                color: [1, 1, 1],
                uv: [0, 0],
                uv2: [0, 0]
            }, this.index0AttributeName = void 0, this.setValues(e)
        }, n.ShaderMaterial.prototype = Object.create(n.Material.prototype), n.ShaderMaterial.prototype.clone = function() {
            var e = new n.ShaderMaterial;
            return n.Material.prototype.clone.call(this, e), e.fragmentShader = this.fragmentShader, e.vertexShader = this.vertexShader, e.uniforms = n.UniformsUtils.clone(this.uniforms), e.attributes = this.attributes, e.defines = this.defines, e.shading = this.shading, e.wireframe = this.wireframe, e.wireframeLinewidth = this.wireframeLinewidth, e.fog = this.fog, e.lights = this.lights, e.vertexColors = this.vertexColors, e.skinning = this.skinning, e.morphTargets = this.morphTargets, e.morphNormals = this.morphNormals, e
        }, n.RawShaderMaterial = function(e) {
            n.ShaderMaterial.call(this, e), this.type = "RawShaderMaterial"
        }, n.RawShaderMaterial.prototype = Object.create(n.ShaderMaterial.prototype), n.RawShaderMaterial.prototype.clone = function() {
            var e = new n.RawShaderMaterial;
            return n.ShaderMaterial.prototype.clone.call(this, e), e
        }, n.SpriteMaterial = function(e) {
            n.Material.call(this), this.type = "SpriteMaterial", this.color = new n.Color(16777215), this.map = null, this.rotation = 0, this.fog = !1, this.setValues(e)
        }, n.SpriteMaterial.prototype = Object.create(n.Material.prototype), n.SpriteMaterial.prototype.clone = function() {
            var e = new n.SpriteMaterial;
            return n.Material.prototype.clone.call(this, e), e.color.copy(this.color), e.map = this.map, e.rotation = this.rotation, e.fog = this.fog, e
        }, n.Texture = function(e, t, r, i, o, a, s, h, l) {
            Object.defineProperty(this, "id", {
                value: n.TextureIdCount++
            }), this.uuid = n.Math.generateUUID(), this.name = "", this.image = void 0 !== e ? e : n.Texture.DEFAULT_IMAGE, this.mipmaps = [], this.mapping = void 0 !== t ? t : n.Texture.DEFAULT_MAPPING, this.wrapS = void 0 !== r ? r : n.ClampToEdgeWrapping, this.wrapT = void 0 !== i ? i : n.ClampToEdgeWrapping, this.magFilter = void 0 !== o ? o : n.LinearFilter, this.minFilter = void 0 !== a ? a : n.LinearMipMapLinearFilter, this.anisotropy = void 0 !== l ? l : 1, this.format = void 0 !== s ? s : n.RGBAFormat, this.type = void 0 !== h ? h : n.UnsignedByteType, this.offset = new n.Vector2(0, 0), this.repeat = new n.Vector2(1, 1), this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, this._needsUpdate = !1, this.onUpdate = null
        }, n.Texture.DEFAULT_IMAGE = void 0, n.Texture.DEFAULT_MAPPING = new n.UVMapping, n.Texture.prototype = {
            constructor: n.Texture,
            get needsUpdate() {
                return this._needsUpdate
            },
            set needsUpdate(e) {
                e === !0 && this.update(), this._needsUpdate = e
            },
            clone: function(e) {
                return void 0 === e && (e = new n.Texture), e.image = this.image, e.mipmaps = this.mipmaps.slice(0), e.mapping = this.mapping, e.wrapS = this.wrapS, e.wrapT = this.wrapT, e.magFilter = this.magFilter, e.minFilter = this.minFilter, e.anisotropy = this.anisotropy, e.format = this.format, e.type = this.type, e.offset.copy(this.offset), e.repeat.copy(this.repeat), e.generateMipmaps = this.generateMipmaps, e.premultiplyAlpha = this.premultiplyAlpha, e.flipY = this.flipY, e.unpackAlignment = this.unpackAlignment, e
            },
            update: function() {
                this.dispatchEvent({
                    type: "update"
                })
            },
            dispose: function() {
                this.dispatchEvent({
                    type: "dispose"
                })
            }
        }, n.EventDispatcher.prototype.apply(n.Texture.prototype), n.TextureIdCount = 0, n.CubeTexture = function(e, t, r, i, o, a, s, h, l) {
            n.Texture.call(this, e, t, r, i, o, a, s, h, l), this.images = e
        }, n.CubeTexture.prototype = Object.create(n.Texture.prototype), n.CubeTexture.clone = function(e) {
            return void 0 === e && (e = new n.CubeTexture), n.Texture.prototype.clone.call(this, e), e.images = this.images, e
        }, n.CompressedTexture = function(e, t, r, i, o, a, s, h, l, u, c) {
            n.Texture.call(this, null, a, s, h, l, u, i, o, c), this.image = {
                width: t,
                height: r
            }, this.mipmaps = e, this.flipY = !1, this.generateMipmaps = !1
        }, n.CompressedTexture.prototype = Object.create(n.Texture.prototype), n.CompressedTexture.prototype.clone = function() {
            var e = new n.CompressedTexture;
            return n.Texture.prototype.clone.call(this, e), e
        }, n.DataTexture = function(e, t, r, i, o, a, s, h, l, u, c) {
            n.Texture.call(this, null, a, s, h, l, u, i, o, c), this.image = {
                data: e,
                width: t,
                height: r
            }
        }, n.DataTexture.prototype = Object.create(n.Texture.prototype), n.DataTexture.prototype.clone = function() {
            var e = new n.DataTexture;
            return n.Texture.prototype.clone.call(this, e), e
        }, n.VideoTexture = function(e, t, r, i, o, a, s, h, l) {
            n.Texture.call(this, e, t, r, i, o, a, s, h, l), this.generateMipmaps = !1;
            var u = this,
                c = function() {
                    requestAnimationFrame(c), e.readyState === e.HAVE_ENOUGH_DATA && (u.needsUpdate = !0)
                };
            c()
        }, n.VideoTexture.prototype = Object.create(n.Texture.prototype), n.Group = function() {
            n.Object3D.call(this), this.type = "Group"
        }, n.Group.prototype = Object.create(n.Object3D.prototype), n.PointCloud = function(e, t) {
            n.Object3D.call(this), this.type = "PointCloud", this.geometry = void 0 !== e ? e : new n.Geometry, this.material = void 0 !== t ? t : new n.PointCloudMaterial({
                color: 16777215 * Math.random()
            }), this.sortParticles = !1
        }, n.PointCloud.prototype = Object.create(n.Object3D.prototype), n.PointCloud.prototype.raycast = function() {
            var e = new n.Matrix4,
                t = new n.Ray;
            return function(r, i) {
                var o = this,
                    a = o.geometry,
                    s = r.params.PointCloud.threshold;
                if (e.getInverse(this.matrixWorld), t.copy(r.ray).applyMatrix4(e), null === a.boundingBox || t.isIntersectionBox(a.boundingBox) !== !1) {
                    var h = s / ((this.scale.x + this.scale.y + this.scale.z) / 3),
                        l = new n.Vector3,
                        u = function(e, n) {
                            var a = t.distanceToPoint(e);
                            if (h > a) {
                                var s = t.closestPointToPoint(e);
                                s.applyMatrix4(o.matrixWorld);
                                var l = r.ray.origin.distanceTo(s);
                                i.push({
                                    distance: l,
                                    distanceToRay: a,
                                    point: s.clone(),
                                    index: n,
                                    face: null,
                                    object: o
                                })
                            }
                        };
                    if (a instanceof n.BufferGeometry) {
                        var c = a.attributes,
                            f = c.position.array;
                        if (void 0 !== c.index) {
                            var p = c.index.array,
                                d = a.offsets;
                            if (0 === d.length) {
                                var m = {
                                    start: 0,
                                    count: p.length,
                                    index: 0
                                };
                                d = [m]
                            }
                            for (var v = 0, g = d.length; g > v; ++v)
                                for (var y = d[v].start, x = d[v].count, w = d[v].index, b = y, _ = y + x; _ > b; b++) {
                                    var M = w + p[b];
                                    l.fromArray(f, 3 * M), u(l, M)
                                }
                        } else
                            for (var S = f.length / 3, b = 0; S > b; b++) l.set(f[3 * b], f[3 * b + 1], f[3 * b + 2]), u(l, b)
                    } else
                        for (var T = this.geometry.vertices, b = 0; b < T.length; b++) u(T[b], b)
                }
            }
        }(), n.PointCloud.prototype.clone = function(e) {
            return void 0 === e && (e = new n.PointCloud(this.geometry, this.material)), e.sortParticles = this.sortParticles, n.Object3D.prototype.clone.call(this, e), e
        }, n.ParticleSystem = function(e, t) {
            return console.warn("THREE.ParticleSystem has been renamed to THREE.PointCloud."), new n.PointCloud(e, t)
        }, n.Line = function(e, t, r) {
            n.Object3D.call(this), this.type = "Line", this.geometry = void 0 !== e ? e : new n.Geometry, this.material = void 0 !== t ? t : new n.LineBasicMaterial({
                color: 16777215 * Math.random()
            }), this.mode = void 0 !== r ? r : n.LineStrip
        }, n.LineStrip = 0, n.LinePieces = 1, n.Line.prototype = Object.create(n.Object3D.prototype), n.Line.prototype.raycast = function() {
            var e = new n.Matrix4,
                t = new n.Ray,
                r = new n.Sphere;
            return function(i, o) {
                var a = i.linePrecision,
                    s = a * a,
                    h = this.geometry;
                if (null === h.boundingSphere && h.computeBoundingSphere(), r.copy(h.boundingSphere), r.applyMatrix4(this.matrixWorld), i.ray.isIntersectionSphere(r) !== !1 && (e.getInverse(this.matrixWorld), t.copy(i.ray).applyMatrix4(e), h instanceof n.Geometry))
                    for (var l = h.vertices, u = l.length, c = new n.Vector3, f = new n.Vector3, p = this.mode === n.LineStrip ? 1 : 2, d = 0; u - 1 > d; d += p) {
                        var m = t.distanceSqToSegment(l[d], l[d + 1], f, c);
                        if (!(m > s)) {
                            var v = t.origin.distanceTo(f);
                            v < i.near || v > i.far || o.push({
                                distance: v,
                                point: c.clone().applyMatrix4(this.matrixWorld),
                                face: null,
                                faceIndex: null,
                                object: this
                            })
                        }
                    }
            }
        }(), n.Line.prototype.clone = function(e) {
            return void 0 === e && (e = new n.Line(this.geometry, this.material, this.mode)), n.Object3D.prototype.clone.call(this, e), e
        }, n.Mesh = function(e, t) {
            n.Object3D.call(this), this.type = "Mesh", this.geometry = void 0 !== e ? e : new n.Geometry, this.material = void 0 !== t ? t : new n.MeshBasicMaterial({
                color: 16777215 * Math.random()
            }), this.updateMorphTargets()
        }, n.Mesh.prototype = Object.create(n.Object3D.prototype), n.Mesh.prototype.updateMorphTargets = function() {
            if (void 0 !== this.geometry.morphTargets && this.geometry.morphTargets.length > 0) {
                this.morphTargetBase = -1, this.morphTargetForcedOrder = [], this.morphTargetInfluences = [], this.morphTargetDictionary = {};
                for (var e = 0, t = this.geometry.morphTargets.length; t > e; e++) this.morphTargetInfluences.push(0), this.morphTargetDictionary[this.geometry.morphTargets[e].name] = e
            }
        }, n.Mesh.prototype.getMorphTargetIndexByName = function(e) {
            return void 0 !== this.morphTargetDictionary[e] ? this.morphTargetDictionary[e] : (console.log("THREE.Mesh.getMorphTargetIndexByName: morph target " + e + " does not exist. Returning 0."), 0)
        }, n.Mesh.prototype.raycast = function() {
            var e = new n.Matrix4,
                t = new n.Ray,
                r = new n.Sphere,
                i = new n.Vector3,
                o = new n.Vector3,
                a = new n.Vector3;
            return function(s, h) {
                var l = this.geometry;
                if (null === l.boundingSphere && l.computeBoundingSphere(), r.copy(l.boundingSphere), r.applyMatrix4(this.matrixWorld), s.ray.isIntersectionSphere(r) !== !1 && (e.getInverse(this.matrixWorld), t.copy(s.ray).applyMatrix4(e), null === l.boundingBox || t.isIntersectionBox(l.boundingBox) !== !1))
                    if (l instanceof n.BufferGeometry) {
                        var u = this.material;
                        if (void 0 === u) return;
                        var c, f, p, d = l.attributes,
                            m = s.precision;
                        if (void 0 !== d.index) {
                            var v = d.index.array,
                                g = d.position.array,
                                y = l.offsets;
                            0 === y.length && (y = [{
                                start: 0,
                                count: v.length,
                                index: 0
                            }]);
                            for (var x = 0, w = y.length; w > x; ++x)
                                for (var b = y[x].start, _ = y[x].count, M = y[x].index, S = b, T = b + _; T > S; S += 3) {
                                    if (c = M + v[S], f = M + v[S + 1], p = M + v[S + 2], i.fromArray(g, 3 * c), o.fromArray(g, 3 * f), a.fromArray(g, 3 * p), u.side === n.BackSide) var A = t.intersectTriangle(a, o, i, !0);
                                    else var A = t.intersectTriangle(i, o, a, u.side !== n.DoubleSide);
                                    if (null !== A) {
                                        A.applyMatrix4(this.matrixWorld);
                                        var E = s.ray.origin.distanceTo(A);
                                        m > E || E < s.near || E > s.far || h.push({
                                            distance: E,
                                            point: A,
                                            face: new n.Face3(c, f, p, n.Triangle.normal(i, o, a)),
                                            faceIndex: null,
                                            object: this
                                        })
                                    }
                                }
                        } else
                            for (var g = d.position.array, S = 0, C = 0, T = g.length; T > S; S += 3, C += 9) {
                                if (c = S, f = S + 1, p = S + 2, i.fromArray(g, C), o.fromArray(g, C + 3), a.fromArray(g, C + 6), u.side === n.BackSide) var A = t.intersectTriangle(a, o, i, !0);
                                else var A = t.intersectTriangle(i, o, a, u.side !== n.DoubleSide);
                                if (null !== A) {
                                    A.applyMatrix4(this.matrixWorld);
                                    var E = s.ray.origin.distanceTo(A);
                                    m > E || E < s.near || E > s.far || h.push({
                                        distance: E,
                                        point: A,
                                        face: new n.Face3(c, f, p, n.Triangle.normal(i, o, a)),
                                        faceIndex: null,
                                        object: this
                                    })
                                }
                            }
                    } else if (l instanceof n.Geometry)
                        for (var c, f, p, L = this.material instanceof n.MeshFaceMaterial, P = L === !0 ? this.material.materials : null, m = s.precision, R = l.vertices, D = 0, F = l.faces.length; F > D; D++) {
                            var U = l.faces[D],
                                u = L === !0 ? P[U.materialIndex] : this.material;
                            if (void 0 !== u) {
                                if (c = R[U.a], f = R[U.b], p = R[U.c], u.morphTargets === !0) {
                                    var B = l.morphTargets,
                                        k = this.morphTargetInfluences;
                                    i.set(0, 0, 0), o.set(0, 0, 0), a.set(0, 0, 0);
                                    for (var z = 0, V = B.length; V > z; z++) {
                                        var O = k[z];
                                        if (0 !== O) {
                                            var N = B[z].vertices;
                                            i.x += (N[U.a].x - c.x) * O, i.y += (N[U.a].y - c.y) * O, i.z += (N[U.a].z - c.z) * O, o.x += (N[U.b].x - f.x) * O, o.y += (N[U.b].y - f.y) * O, o.z += (N[U.b].z - f.z) * O, a.x += (N[U.c].x - p.x) * O, a.y += (N[U.c].y - p.y) * O, a.z += (N[U.c].z - p.z) * O
                                        }
                                    }
                                    i.add(c), o.add(f), a.add(p), c = i, f = o, p = a
                                }
                                if (u.side === n.BackSide) var A = t.intersectTriangle(p, f, c, !0);
                                else var A = t.intersectTriangle(c, f, p, u.side !== n.DoubleSide);
                                if (null !== A) {
                                    A.applyMatrix4(this.matrixWorld);
                                    var E = s.ray.origin.distanceTo(A);
                                    m > E || E < s.near || E > s.far || h.push({
                                        distance: E,
                                        point: A,
                                        face: U,
                                        faceIndex: D,
                                        object: this
                                    })
                                }
                            }
                        }
            }
        }(), n.Mesh.prototype.clone = function(e, t) {
            return void 0 === e && (e = new n.Mesh(this.geometry, this.material)), n.Object3D.prototype.clone.call(this, e, t), e
        }, n.Bone = function(e) {
            n.Object3D.call(this), this.skin = e
        }, n.Bone.prototype = Object.create(n.Object3D.prototype), n.Skeleton = function(e, t, r) {
            if (this.useVertexTexture = void 0 !== r ? r : !0, this.identityMatrix = new n.Matrix4, e = e || [], this.bones = e.slice(0), this.useVertexTexture) {
                var i;
                i = this.bones.length > 256 ? 64 : this.bones.length > 64 ? 32 : this.bones.length > 16 ? 16 : 8, this.boneTextureWidth = i, this.boneTextureHeight = i, this.boneMatrices = new Float32Array(this.boneTextureWidth * this.boneTextureHeight * 4), this.boneTexture = new n.DataTexture(this.boneMatrices, this.boneTextureWidth, this.boneTextureHeight, n.RGBAFormat, n.FloatType), this.boneTexture.minFilter = n.NearestFilter, this.boneTexture.magFilter = n.NearestFilter, this.boneTexture.generateMipmaps = !1, this.boneTexture.flipY = !1
            } else this.boneMatrices = new Float32Array(16 * this.bones.length);
            if (void 0 === t) this.calculateInverses();
            else if (this.bones.length === t.length) this.boneInverses = t.slice(0);
            else {
                console.warn("THREE.Skeleton bonInverses is the wrong length."), this.boneInverses = [];
                for (var o = 0, a = this.bones.length; a > o; o++) this.boneInverses.push(new n.Matrix4)
            }
        }, n.Skeleton.prototype.calculateInverses = function() {
            this.boneInverses = [];
            for (var e = 0, t = this.bones.length; t > e; e++) {
                var r = new n.Matrix4;
                this.bones[e] && r.getInverse(this.bones[e].matrixWorld), this.boneInverses.push(r)
            }
        }, n.Skeleton.prototype.pose = function() {
            for (var e, t = 0, r = this.bones.length; r > t; t++) e = this.bones[t], e && e.matrixWorld.getInverse(this.boneInverses[t]);
            for (var t = 0, r = this.bones.length; r > t; t++) e = this.bones[t], e && (e.parent ? (e.matrix.getInverse(e.parent.matrixWorld), e.matrix.multiply(e.matrixWorld)) : e.matrix.copy(e.matrixWorld), e.matrix.decompose(e.position, e.quaternion, e.scale))
        }, n.Skeleton.prototype.update = function() {
            var e = new n.Matrix4;
            return function() {
                for (var t = 0, r = this.bones.length; r > t; t++) {
                    var i = this.bones[t] ? this.bones[t].matrixWorld : this.identityMatrix;
                    e.multiplyMatrices(i, this.boneInverses[t]), e.flattenToArrayOffset(this.boneMatrices, 16 * t)
                }
                this.useVertexTexture && (this.boneTexture.needsUpdate = !0)
            }
        }(), n.SkinnedMesh = function(e, t, r) {
            n.Mesh.call(this, e, t), this.type = "SkinnedMesh", this.bindMode = "attached", this.bindMatrix = new n.Matrix4, this.bindMatrixInverse = new n.Matrix4;
            var i = [];
            if (this.geometry && void 0 !== this.geometry.bones) {
                for (var o, a, s, h, l, u = 0, c = this.geometry.bones.length; c > u; ++u) a = this.geometry.bones[u], s = a.pos, h = a.rotq, l = a.scl, o = new n.Bone(this), i.push(o), o.name = a.name, o.position.set(s[0], s[1], s[2]), o.quaternion.set(h[0], h[1], h[2], h[3]), void 0 !== l ? o.scale.set(l[0], l[1], l[2]) : o.scale.set(1, 1, 1);
                for (var u = 0, c = this.geometry.bones.length; c > u; ++u) a = this.geometry.bones[u], -1 !== a.parent ? i[a.parent].add(i[u]) : this.add(i[u])
            }
            this.normalizeSkinWeights(), this.updateMatrixWorld(!0), this.bind(new n.Skeleton(i, void 0, r))
        }, n.SkinnedMesh.prototype = Object.create(n.Mesh.prototype), n.SkinnedMesh.prototype.bind = function(e, t) {
            this.skeleton = e, void 0 === t && (this.updateMatrixWorld(!0), t = this.matrixWorld), this.bindMatrix.copy(t), this.bindMatrixInverse.getInverse(t)
        }, n.SkinnedMesh.prototype.pose = function() {
            this.skeleton.pose()
        }, n.SkinnedMesh.prototype.normalizeSkinWeights = function() {
            if (this.geometry instanceof n.Geometry)
                for (var e = 0; e < this.geometry.skinIndices.length; e++) {
                    var t = this.geometry.skinWeights[e],
                        r = 1 / t.lengthManhattan();
                    r !== 1 / 0 ? t.multiplyScalar(r) : t.set(1)
                }
        }, n.SkinnedMesh.prototype.updateMatrixWorld = function(e) {
            n.Mesh.prototype.updateMatrixWorld.call(this, !0), "attached" === this.bindMode ? this.bindMatrixInverse.getInverse(this.matrixWorld) : "detached" === this.bindMode ? this.bindMatrixInverse.getInverse(this.bindMatrix) : console.warn("THREE.SkinnedMesh unreckognized bindMode: " + this.bindMode)
        }, n.SkinnedMesh.prototype.clone = function(e) {
            return void 0 === e && (e = new n.SkinnedMesh(this.geometry, this.material, this.useVertexTexture)), n.Mesh.prototype.clone.call(this, e), e
        }, n.MorphAnimMesh = function(e, t) {
            n.Mesh.call(this, e, t), this.type = "MorphAnimMesh", this.duration = 1e3, this.mirroredLoop = !1, this.time = 0, this.lastKeyframe = 0, this.currentKeyframe = 0, this.direction = 1, this.directionBackwards = !1, this.setFrameRange(0, this.geometry.morphTargets.length - 1)
        }, n.MorphAnimMesh.prototype = Object.create(n.Mesh.prototype), n.MorphAnimMesh.prototype.setFrameRange = function(e, t) {
            this.startKeyframe = e, this.endKeyframe = t, this.length = this.endKeyframe - this.startKeyframe + 1
        }, n.MorphAnimMesh.prototype.setDirectionForward = function() {
            this.direction = 1, this.directionBackwards = !1
        }, n.MorphAnimMesh.prototype.setDirectionBackward = function() {
            this.direction = -1, this.directionBackwards = !0
        }, n.MorphAnimMesh.prototype.parseAnimations = function() {
            var e = this.geometry;
            e.animations || (e.animations = {});
            for (var t, r = e.animations, i = /([a-z]+)_?(\d+)/, n = 0, o = e.morphTargets.length; o > n; n++) {
                var a = e.morphTargets[n],
                    s = a.name.match(i);
                if (s && s.length > 1) {
                    var h = s[1];
                    s[2];
                    r[h] || (r[h] = {
                        start: 1 / 0,
                        end: -(1 / 0)
                    });
                    var l = r[h];
                    n < l.start && (l.start = n), n > l.end && (l.end = n), t || (t = h)
                }
            }
            e.firstAnimation = t
        }, n.MorphAnimMesh.prototype.setAnimationLabel = function(e, t, r) {
            this.geometry.animations || (this.geometry.animations = {}), this.geometry.animations[e] = {
                start: t,
                end: r
            }
        }, n.MorphAnimMesh.prototype.playAnimation = function(e, t) {
            var r = this.geometry.animations[e];
            r ? (this.setFrameRange(r.start, r.end), this.duration = 1e3 * ((r.end - r.start) / t), this.time = 0) : console.warn("animation[" + e + "] undefined")
        }, n.MorphAnimMesh.prototype.updateAnimation = function(e) {
            var t = this.duration / this.length;
            this.time += this.direction * e, this.mirroredLoop ? (this.time > this.duration || this.time < 0) && (this.direction *= -1, this.time > this.duration && (this.time = this.duration, this.directionBackwards = !0), this.time < 0 && (this.time = 0, this.directionBackwards = !1)) : (this.time = this.time % this.duration, this.time < 0 && (this.time += this.duration));
            var r = this.startKeyframe + n.Math.clamp(Math.floor(this.time / t), 0, this.length - 1);
            r !== this.currentKeyframe && (this.morphTargetInfluences[this.lastKeyframe] = 0, this.morphTargetInfluences[this.currentKeyframe] = 1, this.morphTargetInfluences[r] = 0, this.lastKeyframe = this.currentKeyframe, this.currentKeyframe = r);
            var i = this.time % t / t;
            this.directionBackwards && (i = 1 - i), this.morphTargetInfluences[this.currentKeyframe] = i, this.morphTargetInfluences[this.lastKeyframe] = 1 - i
        }, n.MorphAnimMesh.prototype.interpolateTargets = function(e, t, r) {
            for (var i = this.morphTargetInfluences, n = 0, o = i.length; o > n; n++) i[n] = 0;
            e > -1 && (i[e] = 1 - r), t > -1 && (i[t] = r)
        }, n.MorphAnimMesh.prototype.clone = function(e) {
            return void 0 === e && (e = new n.MorphAnimMesh(this.geometry, this.material)), e.duration = this.duration, e.mirroredLoop = this.mirroredLoop, e.time = this.time, e.lastKeyframe = this.lastKeyframe, e.currentKeyframe = this.currentKeyframe, e.direction = this.direction, e.directionBackwards = this.directionBackwards, n.Mesh.prototype.clone.call(this, e), e
        }, n.LOD = function() {
            n.Object3D.call(this), this.objects = []
        }, n.LOD.prototype = Object.create(n.Object3D.prototype), n.LOD.prototype.addLevel = function(e, t) {
            void 0 === t && (t = 0), t = Math.abs(t);
            for (var r = 0; r < this.objects.length && !(t < this.objects[r].distance); r++);
            this.objects.splice(r, 0, {
                distance: t,
                object: e
            }), this.add(e)
        }, n.LOD.prototype.getObjectForDistance = function(e) {
            for (var t = 1, r = this.objects.length; r > t && !(e < this.objects[t].distance); t++);
            return this.objects[t - 1].object
        }, n.LOD.prototype.raycast = function() {
            var e = new n.Vector3;
            return function(t, r) {
                e.setFromMatrixPosition(this.matrixWorld);
                var i = t.ray.origin.distanceTo(e);
                this.getObjectForDistance(i).raycast(t, r)
            }
        }(), n.LOD.prototype.update = function() {
            var e = new n.Vector3,
                t = new n.Vector3;
            return function(r) {
                if (this.objects.length > 1) {
                    e.setFromMatrixPosition(r.matrixWorld), t.setFromMatrixPosition(this.matrixWorld);
                    var i = e.distanceTo(t);
                    this.objects[0].object.visible = !0;
                    for (var n = 1, o = this.objects.length; o > n && i >= this.objects[n].distance; n++) this.objects[n - 1].object.visible = !1, this.objects[n].object.visible = !0;
                    for (; o > n; n++) this.objects[n].object.visible = !1
                }
            }
        }(), n.LOD.prototype.clone = function(e) {
            void 0 === e && (e = new n.LOD), n.Object3D.prototype.clone.call(this, e);
            for (var t = 0, r = this.objects.length; r > t; t++) {
                var i = this.objects[t].object.clone();
                i.visible = 0 === t, e.addLevel(i, this.objects[t].distance)
            }
            return e
        }, n.Sprite = function() {
            var e = new Uint16Array([0, 1, 2, 0, 2, 3]),
                t = new Float32Array([-.5, -.5, 0, .5, -.5, 0, .5, .5, 0, -.5, .5, 0]),
                r = new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]),
                i = new n.BufferGeometry;
            return i.addAttribute("index", new n.BufferAttribute(e, 1)), i.addAttribute("position", new n.BufferAttribute(t, 3)), i.addAttribute("uv", new n.BufferAttribute(r, 2)),
                function(e) {
                    n.Object3D.call(this), this.type = "Sprite", this.geometry = i, this.material = void 0 !== e ? e : new n.SpriteMaterial
                }
        }(), n.Sprite.prototype = Object.create(n.Object3D.prototype), n.Sprite.prototype.raycast = function() {
            var e = new n.Vector3;
            return function(t, r) {
                e.setFromMatrixPosition(this.matrixWorld);
                var i = t.ray.distanceToPoint(e);
                i > this.scale.x || r.push({
                    distance: i,
                    point: this.position,
                    face: null,
                    object: this
                })
            }
        }(), n.Sprite.prototype.clone = function(e) {
            return void 0 === e && (e = new n.Sprite(this.material)), n.Object3D.prototype.clone.call(this, e), e
        }, n.Particle = n.Sprite, n.LensFlare = function(e, t, r, i, o) {
            n.Object3D.call(this), this.lensFlares = [], this.positionScreen = new n.Vector3, this.customUpdateCallback = void 0, void 0 !== e && this.add(e, t, r, i, o)
        }, n.LensFlare.prototype = Object.create(n.Object3D.prototype), n.LensFlare.prototype.add = function(e, t, r, i, o, a) {
            void 0 === t && (t = -1), void 0 === r && (r = 0), void 0 === a && (a = 1), void 0 === o && (o = new n.Color(16777215)), void 0 === i && (i = n.NormalBlending), r = Math.min(r, Math.max(0, r)), this.lensFlares.push({
                texture: e,
                size: t,
                distance: r,
                x: 0,
                y: 0,
                z: 0,
                scale: 1,
                rotation: 1,
                opacity: a,
                color: o,
                blending: i
            })
        }, n.LensFlare.prototype.updateLensFlares = function() {
            var e, t, r = this.lensFlares.length,
                i = 2 * -this.positionScreen.x,
                n = 2 * -this.positionScreen.y;
            for (e = 0; r > e; e++) t = this.lensFlares[e], t.x = this.positionScreen.x + i * t.distance, t.y = this.positionScreen.y + n * t.distance, t.wantedRotation = t.x * Math.PI * .25, t.rotation += .25 * (t.wantedRotation - t.rotation)
        }, n.Scene = function() {
            n.Object3D.call(this), this.type = "Scene", this.fog = null, this.overrideMaterial = null, this.autoUpdate = !0
        }, n.Scene.prototype = Object.create(n.Object3D.prototype), n.Scene.prototype.clone = function(e) {
            return void 0 === e && (e = new n.Scene), n.Object3D.prototype.clone.call(this, e), null !== this.fog && (e.fog = this.fog.clone()), null !== this.overrideMaterial && (e.overrideMaterial = this.overrideMaterial.clone()), e.autoUpdate = this.autoUpdate, e.matrixAutoUpdate = this.matrixAutoUpdate, e
        }, n.Fog = function(e, t, r) {
            this.name = "", this.color = new n.Color(e), this.near = void 0 !== t ? t : 1, this.far = void 0 !== r ? r : 1e3
        }, n.Fog.prototype.clone = function() {
            return new n.Fog(this.color.getHex(), this.near, this.far)
        }, n.FogExp2 = function(e, t) {
            this.name = "", this.color = new n.Color(e), this.density = void 0 !== t ? t : 25e-5
        }, n.FogExp2.prototype.clone = function() {
            return new n.FogExp2(this.color.getHex(), this.density)
        }, n.ShaderChunk = {}, n.ShaderChunk.alphatest_fragment = "#ifdef ALPHATEST\n\n if ( gl_FragColor.a < ALPHATEST ) discard;\n\n#endif\n", n.ShaderChunk.lights_lambert_vertex = "vLightFront = vec3( 0.0 );\n\n#ifdef DOUBLE_SIDED\n\n   vLightBack = vec3( 0.0 );\n\n#endif\n\ntransformedNormal = normalize( transformedNormal );\n\n#if MAX_DIR_LIGHTS > 0\n\nfor( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\n\n    vec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\n   vec3 dirVector = normalize( lDirection.xyz );\n\n   float dotProduct = dot( transformedNormal, dirVector );\n   vec3 directionalLightWeighting = vec3( max( dotProduct, 0.0 ) );\n\n    #ifdef DOUBLE_SIDED\n\n     vec3 directionalLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n\n       #ifdef WRAP_AROUND\n\n          vec3 directionalLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n\n       #endif\n\n  #endif\n\n  #ifdef WRAP_AROUND\n\n      vec3 directionalLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\n      directionalLightWeighting = mix( directionalLightWeighting, directionalLightWeightingHalf, wrapRGB );\n\n       #ifdef DOUBLE_SIDED\n\n         directionalLightWeightingBack = mix( directionalLightWeightingBack, directionalLightWeightingHalfBack, wrapRGB );\n\n       #endif\n\n  #endif\n\n  vLightFront += directionalLightColor[ i ] * directionalLightWeighting;\n\n  #ifdef DOUBLE_SIDED\n\n     vLightBack += directionalLightColor[ i ] * directionalLightWeightingBack;\n\n   #endif\n\n}\n\n#endif\n\n#if MAX_POINT_LIGHTS > 0\n\n   for( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\n\n      vec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\n       vec3 lVector = lPosition.xyz - mvPosition.xyz;\n\n      float lDistance = 1.0;\n        if ( pointLightDistance[ i ] > 0.0 )\n          lDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\n\n      lVector = normalize( lVector );\n       float dotProduct = dot( transformedNormal, lVector );\n\n       vec3 pointLightWeighting = vec3( max( dotProduct, 0.0 ) );\n\n      #ifdef DOUBLE_SIDED\n\n         vec3 pointLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n\n         #ifdef WRAP_AROUND\n\n              vec3 pointLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n\n         #endif\n\n      #endif\n\n      #ifdef WRAP_AROUND\n\n          vec3 pointLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\n            pointLightWeighting = mix( pointLightWeighting, pointLightWeightingHalf, wrapRGB );\n\n         #ifdef DOUBLE_SIDED\n\n             pointLightWeightingBack = mix( pointLightWeightingBack, pointLightWeightingHalfBack, wrapRGB );\n\n         #endif\n\n      #endif\n\n      vLightFront += pointLightColor[ i ] * pointLightWeighting * lDistance;\n\n      #ifdef DOUBLE_SIDED\n\n         vLightBack += pointLightColor[ i ] * pointLightWeightingBack * lDistance;\n\n       #endif\n\n  }\n\n#endif\n\n#if MAX_SPOT_LIGHTS > 0\n\n  for( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\n\n       vec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\n        vec3 lVector = lPosition.xyz - mvPosition.xyz;\n\n      float spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - worldPosition.xyz ) );\n\n     if ( spotEffect > spotLightAngleCos[ i ] ) {\n\n            spotEffect = max( pow( max( spotEffect, 0.0 ), spotLightExponent[ i ] ), 0.0 );\n\n         float lDistance = 1.0;\n            if ( spotLightDistance[ i ] > 0.0 )\n               lDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );\n\n           lVector = normalize( lVector );\n\n         float dotProduct = dot( transformedNormal, lVector );\n         vec3 spotLightWeighting = vec3( max( dotProduct, 0.0 ) );\n\n           #ifdef DOUBLE_SIDED\n\n             vec3 spotLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n\n              #ifdef WRAP_AROUND\n\n                  vec3 spotLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n\n              #endif\n\n          #endif\n\n          #ifdef WRAP_AROUND\n\n              vec3 spotLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\n             spotLightWeighting = mix( spotLightWeighting, spotLightWeightingHalf, wrapRGB );\n\n                #ifdef DOUBLE_SIDED\n\n                 spotLightWeightingBack = mix( spotLightWeightingBack, spotLightWeightingHalfBack, wrapRGB );\n\n                #endif\n\n          #endif\n\n          vLightFront += spotLightColor[ i ] * spotLightWeighting * lDistance * spotEffect;\n\n           #ifdef DOUBLE_SIDED\n\n             vLightBack += spotLightColor[ i ] * spotLightWeightingBack * lDistance * spotEffect;\n\n            #endif\n\n      }\n\n   }\n\n#endif\n\n#if MAX_HEMI_LIGHTS > 0\n\n  for( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {\n\n       vec4 lDirection = viewMatrix * vec4( hemisphereLightDirection[ i ], 0.0 );\n        vec3 lVector = normalize( lDirection.xyz );\n\n     float dotProduct = dot( transformedNormal, lVector );\n\n       float hemiDiffuseWeight = 0.5 * dotProduct + 0.5;\n     float hemiDiffuseWeightBack = -0.5 * dotProduct + 0.5;\n\n      vLightFront += mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );\n\n     #ifdef DOUBLE_SIDED\n\n         vLightBack += mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeightBack );\n\n      #endif\n\n  }\n\n#endif\n\nvLightFront = vLightFront * diffuse + ambient * ambientLightColor + emissive;\n\n#ifdef DOUBLE_SIDED\n\n vLightBack = vLightBack * diffuse + ambient * ambientLightColor + emissive;\n\n#endif",
        n.ShaderChunk.map_particle_pars_fragment = "#ifdef USE_MAP\n\n  uniform sampler2D map;\n\n#endif", n.ShaderChunk.default_vertex = "vec4 mvPosition;\n\n#ifdef USE_SKINNING\n\n  mvPosition = modelViewMatrix * skinned;\n\n#endif\n\n#if !defined( USE_SKINNING ) && defined( USE_MORPHTARGETS )\n\n    mvPosition = modelViewMatrix * vec4( morphed, 1.0 );\n\n#endif\n\n#if !defined( USE_SKINNING ) && ! defined( USE_MORPHTARGETS )\n\n mvPosition = modelViewMatrix * vec4( position, 1.0 );\n\n#endif\n\ngl_Position = projectionMatrix * mvPosition;", n.ShaderChunk.map_pars_fragment = "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP )\n\n  varying vec2 vUv;\n\n#endif\n\n#ifdef USE_MAP\n\n   uniform sampler2D map;\n\n#endif", n.ShaderChunk.skinnormal_vertex = "#ifdef USE_SKINNING\n\n   mat4 skinMatrix = mat4( 0.0 );\n    skinMatrix += skinWeight.x * boneMatX;\n    skinMatrix += skinWeight.y * boneMatY;\n    skinMatrix += skinWeight.z * boneMatZ;\n    skinMatrix += skinWeight.w * boneMatW;\n    skinMatrix  = bindMatrixInverse * skinMatrix * bindMatrix;\n\n  #ifdef USE_MORPHNORMALS\n\n vec4 skinnedNormal = skinMatrix * vec4( morphedNormal, 0.0 );\n\n   #else\n\n   vec4 skinnedNormal = skinMatrix * vec4( normal, 0.0 );\n\n  #endif\n\n#endif\n", n.ShaderChunk.logdepthbuf_pars_vertex = "#ifdef USE_LOGDEPTHBUF\n\n    #ifdef USE_LOGDEPTHBUF_EXT\n\n      varying float vFragDepth;\n\n   #endif\n\n  uniform float logDepthBufFC;\n\n#endif", n.ShaderChunk.lightmap_pars_vertex = "#ifdef USE_LIGHTMAP\n\n  varying vec2 vUv2;\n\n#endif", n.ShaderChunk.lights_phong_fragment = "vec3 normal = normalize( vNormal );\nvec3 viewPosition = normalize( vViewPosition );\n\n#ifdef DOUBLE_SIDED\n\n   normal = normal * ( -1.0 + 2.0 * float( gl_FrontFacing ) );\n\n#endif\n\n#ifdef USE_NORMALMAP\n\n   normal = perturbNormal2Arb( -vViewPosition, normal );\n\n#elif defined( USE_BUMPMAP )\n\n   normal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );\n\n#endif\n\n#if MAX_POINT_LIGHTS > 0\n\n vec3 pointDiffuse = vec3( 0.0 );\n  vec3 pointSpecular = vec3( 0.0 );\n\n   for ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\n\n     vec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\n       vec3 lVector = lPosition.xyz + vViewPosition.xyz;\n\n       float lDistance = 1.0;\n        if ( pointLightDistance[ i ] > 0.0 )\n          lDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\n\n      lVector = normalize( lVector );\n\n             // diffuse\n\n      float dotProduct = dot( normal, lVector );\n\n      #ifdef WRAP_AROUND\n\n          float pointDiffuseWeightFull = max( dotProduct, 0.0 );\n            float pointDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\n\n          vec3 pointDiffuseWeight = mix( vec3( pointDiffuseWeightFull ), vec3( pointDiffuseWeightHalf ), wrapRGB );\n\n       #else\n\n           float pointDiffuseWeight = max( dotProduct, 0.0 );\n\n      #endif\n\n      pointDiffuse += diffuse * pointLightColor[ i ] * pointDiffuseWeight * lDistance;\n\n                // specular\n\n     vec3 pointHalfVector = normalize( lVector + viewPosition );\n       float pointDotNormalHalf = max( dot( normal, pointHalfVector ), 0.0 );\n        float pointSpecularWeight = specularStrength * max( pow( pointDotNormalHalf, shininess ), 0.0 );\n\n        float specularNormalization = ( shininess + 2.0 ) / 8.0;\n\n        vec3 schlick = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( lVector, pointHalfVector ), 0.0 ), 5.0 );\n     pointSpecular += schlick * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * lDistance * specularNormalization;\n\n }\n\n#endif\n\n#if MAX_SPOT_LIGHTS > 0\n\n  vec3 spotDiffuse = vec3( 0.0 );\n   vec3 spotSpecular = vec3( 0.0 );\n\n    for ( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\n\n      vec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\n        vec3 lVector = lPosition.xyz + vViewPosition.xyz;\n\n       float lDistance = 1.0;\n        if ( spotLightDistance[ i ] > 0.0 )\n           lDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );\n\n       lVector = normalize( lVector );\n\n     float spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - vWorldPosition ) );\n\n        if ( spotEffect > spotLightAngleCos[ i ] ) {\n\n            spotEffect = max( pow( max( spotEffect, 0.0 ), spotLightExponent[ i ] ), 0.0 );\n\n                 // diffuse\n\n          float dotProduct = dot( normal, lVector );\n\n          #ifdef WRAP_AROUND\n\n              float spotDiffuseWeightFull = max( dotProduct, 0.0 );\n             float spotDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\n\n               vec3 spotDiffuseWeight = mix( vec3( spotDiffuseWeightFull ), vec3( spotDiffuseWeightHalf ), wrapRGB );\n\n          #else\n\n               float spotDiffuseWeight = max( dotProduct, 0.0 );\n\n           #endif\n\n          spotDiffuse += diffuse * spotLightColor[ i ] * spotDiffuseWeight * lDistance * spotEffect;\n\n                  // specular\n\n         vec3 spotHalfVector = normalize( lVector + viewPosition );\n            float spotDotNormalHalf = max( dot( normal, spotHalfVector ), 0.0 );\n          float spotSpecularWeight = specularStrength * max( pow( spotDotNormalHalf, shininess ), 0.0 );\n\n          float specularNormalization = ( shininess + 2.0 ) / 8.0;\n\n            vec3 schlick = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( lVector, spotHalfVector ), 0.0 ), 5.0 );\n          spotSpecular += schlick * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * lDistance * specularNormalization * spotEffect;\n\n        }\n\n   }\n\n#endif\n\n#if MAX_DIR_LIGHTS > 0\n\n   vec3 dirDiffuse = vec3( 0.0 );\n    vec3 dirSpecular = vec3( 0.0 );\n\n for( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\n\n        vec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\n       vec3 dirVector = normalize( lDirection.xyz );\n\n               // diffuse\n\n      float dotProduct = dot( normal, dirVector );\n\n        #ifdef WRAP_AROUND\n\n          float dirDiffuseWeightFull = max( dotProduct, 0.0 );\n          float dirDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\n\n            vec3 dirDiffuseWeight = mix( vec3( dirDiffuseWeightFull ), vec3( dirDiffuseWeightHalf ), wrapRGB );\n\n     #else\n\n           float dirDiffuseWeight = max( dotProduct, 0.0 );\n\n        #endif\n\n      dirDiffuse += diffuse * directionalLightColor[ i ] * dirDiffuseWeight;\n\n      // specular\n\n     vec3 dirHalfVector = normalize( dirVector + viewPosition );\n       float dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );\n        float dirSpecularWeight = specularStrength * max( pow( dirDotNormalHalf, shininess ), 0.0 );\n\n        /*\n        // fresnel term from skin shader\n      const float F0 = 0.128;\n\n     float base = 1.0 - dot( viewPosition, dirHalfVector );\n        float exponential = pow( base, 5.0 );\n\n       float fresnel = exponential + F0 * ( 1.0 - exponential );\n     */\n\n      /*\n        // fresnel term from fresnel shader\n       const float mFresnelBias = 0.08;\n      const float mFresnelScale = 0.3;\n      const float mFresnelPower = 5.0;\n\n        float fresnel = mFresnelBias + mFresnelScale * pow( 1.0 + dot( normalize( -viewPosition ), normal ), mFresnelPower );\n     */\n\n      float specularNormalization = ( shininess + 2.0 ) / 8.0;\n\n        //      dirSpecular += specular * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization * fresnel;\n\n      vec3 schlick = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( dirVector, dirHalfVector ), 0.0 ), 5.0 );\n     dirSpecular += schlick * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization;\n\n\n   }\n\n#endif\n\n#if MAX_HEMI_LIGHTS > 0\n\n  vec3 hemiDiffuse = vec3( 0.0 );\n   vec3 hemiSpecular = vec3( 0.0 );\n\n    for( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {\n\n       vec4 lDirection = viewMatrix * vec4( hemisphereLightDirection[ i ], 0.0 );\n        vec3 lVector = normalize( lDirection.xyz );\n\n     // diffuse\n\n      float dotProduct = dot( normal, lVector );\n        float hemiDiffuseWeight = 0.5 * dotProduct + 0.5;\n\n       vec3 hemiColor = mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );\n\n       hemiDiffuse += diffuse * hemiColor;\n\n     // specular (sky light)\n\n     vec3 hemiHalfVectorSky = normalize( lVector + viewPosition );\n     float hemiDotNormalHalfSky = 0.5 * dot( normal, hemiHalfVectorSky ) + 0.5;\n        float hemiSpecularWeightSky = specularStrength * max( pow( max( hemiDotNormalHalfSky, 0.0 ), shininess ), 0.0 );\n\n        // specular (ground light)\n\n      vec3 lVectorGround = -lVector;\n\n      vec3 hemiHalfVectorGround = normalize( lVectorGround + viewPosition );\n        float hemiDotNormalHalfGround = 0.5 * dot( normal, hemiHalfVectorGround ) + 0.5;\n      float hemiSpecularWeightGround = specularStrength * max( pow( max( hemiDotNormalHalfGround, 0.0 ), shininess ), 0.0 );\n\n      float dotProductGround = dot( normal, lVectorGround );\n\n      float specularNormalization = ( shininess + 2.0 ) / 8.0;\n\n        vec3 schlickSky = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( lVector, hemiHalfVectorSky ), 0.0 ), 5.0 );\n        vec3 schlickGround = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( lVectorGround, hemiHalfVectorGround ), 0.0 ), 5.0 );\n        hemiSpecular += hemiColor * specularNormalization * ( schlickSky * hemiSpecularWeightSky * max( dotProduct, 0.0 ) + schlickGround * hemiSpecularWeightGround * max( dotProductGround, 0.0 ) );\n\n  }\n\n#endif\n\nvec3 totalDiffuse = vec3( 0.0 );\nvec3 totalSpecular = vec3( 0.0 );\n\n#if MAX_DIR_LIGHTS > 0\n\n    totalDiffuse += dirDiffuse;\n   totalSpecular += dirSpecular;\n\n#endif\n\n#if MAX_HEMI_LIGHTS > 0\n\n  totalDiffuse += hemiDiffuse;\n  totalSpecular += hemiSpecular;\n\n#endif\n\n#if MAX_POINT_LIGHTS > 0\n\n    totalDiffuse += pointDiffuse;\n totalSpecular += pointSpecular;\n\n#endif\n\n#if MAX_SPOT_LIGHTS > 0\n\n    totalDiffuse += spotDiffuse;\n  totalSpecular += spotSpecular;\n\n#endif\n\n#ifdef METAL\n\n    gl_FragColor.xyz = gl_FragColor.xyz * ( emissive + totalDiffuse + ambientLightColor * ambient + totalSpecular );\n\n#else\n\n   gl_FragColor.xyz = gl_FragColor.xyz * ( emissive + totalDiffuse + ambientLightColor * ambient ) + totalSpecular;\n\n#endif", n.ShaderChunk.fog_pars_fragment = "#ifdef USE_FOG\n\n  uniform vec3 fogColor;\n\n  #ifdef FOG_EXP2\n\n     uniform float fogDensity;\n\n   #else\n\n       uniform float fogNear;\n        uniform float fogFar;\n #endif\n\n#endif", n.ShaderChunk.morphnormal_vertex = "#ifdef USE_MORPHNORMALS\n\n  vec3 morphedNormal = vec3( 0.0 );\n\n   morphedNormal += ( morphNormal0 - normal ) * morphTargetInfluences[ 0 ];\n  morphedNormal += ( morphNormal1 - normal ) * morphTargetInfluences[ 1 ];\n  morphedNormal += ( morphNormal2 - normal ) * morphTargetInfluences[ 2 ];\n  morphedNormal += ( morphNormal3 - normal ) * morphTargetInfluences[ 3 ];\n\n    morphedNormal += normal;\n\n#endif", n.ShaderChunk.envmap_pars_fragment = "#ifdef USE_ENVMAP\n\n    uniform float reflectivity;\n   uniform samplerCube envMap;\n   uniform float flipEnvMap;\n uniform int combine;\n\n    #if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\n      uniform bool useRefract;\n      uniform float refractionRatio;\n\n  #else\n\n       varying vec3 vReflect;\n\n  #endif\n\n#endif", n.ShaderChunk.logdepthbuf_fragment = "#if defined(USE_LOGDEPTHBUF) && defined(USE_LOGDEPTHBUF_EXT)\n\n   gl_FragDepthEXT = log2(vFragDepth) * logDepthBufFC * 0.5;\n\n#endif", n.ShaderChunk.normalmap_pars_fragment = "#ifdef USE_NORMALMAP\n\n uniform sampler2D normalMap;\n  uniform vec2 normalScale;\n\n           // Per-Pixel Tangent Space Normal Mapping\n         // http://hacksoflife.blogspot.ch/2009/11/per-pixel-tangent-space-normal-mapping.html\n\n   vec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm ) {\n\n        vec3 q0 = dFdx( eye_pos.xyz );\n        vec3 q1 = dFdy( eye_pos.xyz );\n        vec2 st0 = dFdx( vUv.st );\n        vec2 st1 = dFdy( vUv.st );\n\n      vec3 S = normalize( q0 * st1.t - q1 * st0.t );\n        vec3 T = normalize( -q0 * st1.s + q1 * st0.s );\n       vec3 N = normalize( surf_norm );\n\n        vec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n      mapN.xy = normalScale * mapN.xy;\n      mat3 tsn = mat3( S, T, N );\n       return normalize( tsn * mapN );\n\n }\n\n#endif\n", n.ShaderChunk.lights_phong_pars_vertex = "#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP ) || defined( USE_ENVMAP )\n\n    varying vec3 vWorldPosition;\n\n#endif\n", n.ShaderChunk.lightmap_pars_fragment = "#ifdef USE_LIGHTMAP\n\n  varying vec2 vUv2;\n    uniform sampler2D lightMap;\n\n#endif", n.ShaderChunk.shadowmap_vertex = "#ifdef USE_SHADOWMAP\n\n  for( int i = 0; i < MAX_SHADOWS; i ++ ) {\n\n       vShadowCoord[ i ] = shadowMatrix[ i ] * worldPosition;\n\n  }\n\n#endif", n.ShaderChunk.lights_phong_vertex = "#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP ) || defined( USE_ENVMAP )\n\n   vWorldPosition = worldPosition.xyz;\n\n#endif", n.ShaderChunk.map_fragment = "#ifdef USE_MAP\n\n    vec4 texelColor = texture2D( map, vUv );\n\n    #ifdef GAMMA_INPUT\n\n      texelColor.xyz *= texelColor.xyz;\n\n   #endif\n\n  gl_FragColor = gl_FragColor * texelColor;\n\n#endif", n.ShaderChunk.lightmap_vertex = "#ifdef USE_LIGHTMAP\n\n  vUv2 = uv2;\n\n#endif", n.ShaderChunk.map_particle_fragment = "#ifdef USE_MAP\n\n   gl_FragColor = gl_FragColor * texture2D( map, vec2( gl_PointCoord.x, 1.0 - gl_PointCoord.y ) );\n\n#endif", n.ShaderChunk.color_pars_fragment = "#ifdef USE_COLOR\n\n   varying vec3 vColor;\n\n#endif\n", n.ShaderChunk.color_vertex = "#ifdef USE_COLOR\n\n   #ifdef GAMMA_INPUT\n\n      vColor = color * color;\n\n #else\n\n       vColor = color;\n\n #endif\n\n#endif", n.ShaderChunk.skinning_vertex = "#ifdef USE_SKINNING\n\n #ifdef USE_MORPHTARGETS\n\n vec4 skinVertex = bindMatrix * vec4( morphed, 1.0 );\n\n    #else\n\n   vec4 skinVertex = bindMatrix * vec4( position, 1.0 );\n\n   #endif\n\n  vec4 skinned = vec4( 0.0 );\n   skinned += boneMatX * skinVertex * skinWeight.x;\n  skinned += boneMatY * skinVertex * skinWeight.y;\n  skinned += boneMatZ * skinVertex * skinWeight.z;\n  skinned += boneMatW * skinVertex * skinWeight.w;\n  skinned  = bindMatrixInverse * skinned;\n\n#endif\n", n.ShaderChunk.envmap_pars_vertex = "#if defined( USE_ENVMAP ) && ! defined( USE_BUMPMAP ) && ! defined( USE_NORMALMAP ) && ! defined( PHONG )\n\n varying vec3 vReflect;\n\n  uniform float refractionRatio;\n    uniform bool useRefract;\n\n#endif\n", n.ShaderChunk.linear_to_gamma_fragment = "#ifdef GAMMA_OUTPUT\n\n    gl_FragColor.xyz = sqrt( gl_FragColor.xyz );\n\n#endif", n.ShaderChunk.color_pars_vertex = "#ifdef USE_COLOR\n\n    varying vec3 vColor;\n\n#endif", n.ShaderChunk.lights_lambert_pars_vertex = "uniform vec3 ambient;\nuniform vec3 diffuse;\nuniform vec3 emissive;\n\nuniform vec3 ambientLightColor;\n\n#if MAX_DIR_LIGHTS > 0\n\n  uniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\n uniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n\n#endif\n\n#if MAX_HEMI_LIGHTS > 0\n\n  uniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];\n  uniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];\n   uniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];\n\n#endif\n\n#if MAX_POINT_LIGHTS > 0\n\n uniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\n uniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\n  uniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n\n#endif\n\n#if MAX_SPOT_LIGHTS > 0\n\n  uniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\n   uniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\n    uniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\n   uniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\n   uniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];\n   uniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\n\n#endif\n\n#ifdef WRAP_AROUND\n\n uniform vec3 wrapRGB;\n\n#endif\n", n.ShaderChunk.map_pars_vertex = "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP )\n\n  varying vec2 vUv;\n uniform vec4 offsetRepeat;\n\n#endif\n", n.ShaderChunk.envmap_fragment = "#ifdef USE_ENVMAP\n\n vec3 reflectVec;\n\n    #if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\n      vec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );\n\n     // http://en.wikibooks.org/wiki/GLSL_Programming/Applying_Matrix_Transformations\n      // Transforming Normal Vectors with the Inverse Transformation\n\n      vec3 worldNormal = normalize( vec3( vec4( normal, 0.0 ) * viewMatrix ) );\n\n       if ( useRefract ) {\n\n         reflectVec = refract( cameraToVertex, worldNormal, refractionRatio );\n\n       } else { \n\n           reflectVec = reflect( cameraToVertex, worldNormal );\n\n        }\n\n   #else\n\n       reflectVec = vReflect;\n\n  #endif\n\n  #ifdef DOUBLE_SIDED\n\n     float flipNormal = ( -1.0 + 2.0 * float( gl_FrontFacing ) );\n      vec4 cubeColor = textureCube( envMap, flipNormal * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n\n  #else\n\n       vec4 cubeColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n\n   #endif\n\n  #ifdef GAMMA_INPUT\n\n      cubeColor.xyz *= cubeColor.xyz;\n\n #endif\n\n  if ( combine == 1 ) {\n\n       gl_FragColor.xyz = mix( gl_FragColor.xyz, cubeColor.xyz, specularStrength * reflectivity );\n\n } else if ( combine == 2 ) {\n\n        gl_FragColor.xyz += cubeColor.xyz * specularStrength * reflectivity;\n\n    } else {\n\n        gl_FragColor.xyz = mix( gl_FragColor.xyz, gl_FragColor.xyz * cubeColor.xyz, specularStrength * reflectivity );\n\n  }\n\n#endif", n.ShaderChunk.specularmap_pars_fragment = "#ifdef USE_SPECULARMAP\n\n uniform sampler2D specularMap;\n\n#endif", n.ShaderChunk.logdepthbuf_vertex = "#ifdef USE_LOGDEPTHBUF\n\n   gl_Position.z = log2(max(1e-6, gl_Position.w + 1.0)) * logDepthBufFC;\n\n   #ifdef USE_LOGDEPTHBUF_EXT\n\n      vFragDepth = 1.0 + gl_Position.w;\n\n#else\n\n      gl_Position.z = (gl_Position.z - 1.0) * gl_Position.w;\n\n  #endif\n\n#endif", n.ShaderChunk.morphtarget_pars_vertex = "#ifdef USE_MORPHTARGETS\n\n #ifndef USE_MORPHNORMALS\n\n    uniform float morphTargetInfluences[ 8 ];\n\n   #else\n\n   uniform float morphTargetInfluences[ 4 ];\n\n   #endif\n\n#endif", n.ShaderChunk.specularmap_fragment = "float specularStrength;\n\n#ifdef USE_SPECULARMAP\n\n  vec4 texelSpecular = texture2D( specularMap, vUv );\n   specularStrength = texelSpecular.r;\n\n#else\n\n    specularStrength = 1.0;\n\n#endif", n.ShaderChunk.fog_fragment = "#ifdef USE_FOG\n\n    #ifdef USE_LOGDEPTHBUF_EXT\n\n      float depth = gl_FragDepthEXT / gl_FragCoord.w;\n\n #else\n\n       float depth = gl_FragCoord.z / gl_FragCoord.w;\n\n  #endif\n\n  #ifdef FOG_EXP2\n\n     const float LOG2 = 1.442695;\n      float fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );\n       fogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );\n\n #else\n\n       float fogFactor = smoothstep( fogNear, fogFar, depth );\n\n #endif\n    \n  gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );\n\n#endif", n.ShaderChunk.bumpmap_pars_fragment = "#ifdef USE_BUMPMAP\n\n  uniform sampler2D bumpMap;\n    uniform float bumpScale;\n\n            // Derivative maps - bump mapping unparametrized surfaces by Morten Mikkelsen\n         //  http://mmikkelsen3d.blogspot.sk/2011/07/derivative-maps.html\n\n            // Evaluate the derivative of the height w.r.t. screen-space using forward differencing (listing 2)\n\n vec2 dHdxy_fwd() {\n\n      vec2 dSTdx = dFdx( vUv );\n     vec2 dSTdy = dFdy( vUv );\n\n       float Hll = bumpScale * texture2D( bumpMap, vUv ).x;\n      float dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;\n        float dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;\n\n      return vec2( dBx, dBy );\n\n    }\n\n   vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy ) {\n\n        vec3 vSigmaX = dFdx( surf_pos );\n      vec3 vSigmaY = dFdy( surf_pos );\n      vec3 vN = surf_norm;        // normalized\n\n       vec3 R1 = cross( vSigmaY, vN );\n       vec3 R2 = cross( vN, vSigmaX );\n\n     float fDet = dot( vSigmaX, R1 );\n\n        vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n      return normalize( abs( fDet ) * surf_norm - vGrad );\n\n    }\n\n#endif", n.ShaderChunk.defaultnormal_vertex = "vec3 objectNormal;\n\n#ifdef USE_SKINNING\n\n   objectNormal = skinnedNormal.xyz;\n\n#endif\n\n#if !defined( USE_SKINNING ) && defined( USE_MORPHNORMALS )\n\n  objectNormal = morphedNormal;\n\n#endif\n\n#if !defined( USE_SKINNING ) && ! defined( USE_MORPHNORMALS )\n\n    objectNormal = normal;\n\n#endif\n\n#ifdef FLIP_SIDED\n\n   objectNormal = -objectNormal;\n\n#endif\n\nvec3 transformedNormal = normalMatrix * objectNormal;", n.ShaderChunk.lights_phong_pars_fragment = "uniform vec3 ambientLightColor;\n\n#if MAX_DIR_LIGHTS > 0\n\n    uniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\n uniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n\n#endif\n\n#if MAX_HEMI_LIGHTS > 0\n\n  uniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];\n  uniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];\n   uniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];\n\n#endif\n\n#if MAX_POINT_LIGHTS > 0\n\n uniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\n\n   uniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\n  uniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n\n#endif\n\n#if MAX_SPOT_LIGHTS > 0\n\n  uniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\n   uniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\n    uniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\n   uniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];\n   uniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\n\n uniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\n\n#endif\n\n#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP ) || defined( USE_ENVMAP )\n\n varying vec3 vWorldPosition;\n\n#endif\n\n#ifdef WRAP_AROUND\n\n    uniform vec3 wrapRGB;\n\n#endif\n\nvarying vec3 vViewPosition;\nvarying vec3 vNormal;", n.ShaderChunk.skinbase_vertex = "#ifdef USE_SKINNING\n\n    mat4 boneMatX = getBoneMatrix( skinIndex.x );\n mat4 boneMatY = getBoneMatrix( skinIndex.y );\n mat4 boneMatZ = getBoneMatrix( skinIndex.z );\n mat4 boneMatW = getBoneMatrix( skinIndex.w );\n\n#endif", n.ShaderChunk.map_vertex = "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP )\n\n vUv = uv * offsetRepeat.zw + offsetRepeat.xy;\n\n#endif", n.ShaderChunk.lightmap_fragment = "#ifdef USE_LIGHTMAP\n\n    gl_FragColor = gl_FragColor * texture2D( lightMap, vUv2 );\n\n#endif", n.ShaderChunk.shadowmap_pars_vertex = "#ifdef USE_SHADOWMAP\n\n  varying vec4 vShadowCoord[ MAX_SHADOWS ];\n uniform mat4 shadowMatrix[ MAX_SHADOWS ];\n\n#endif", n.ShaderChunk.color_fragment = "#ifdef USE_COLOR\n\n  gl_FragColor = gl_FragColor * vec4( vColor, 1.0 );\n\n#endif", n.ShaderChunk.morphtarget_vertex = "#ifdef USE_MORPHTARGETS\n\n  vec3 morphed = vec3( 0.0 );\n   morphed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];\n  morphed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];\n  morphed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];\n  morphed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];\n\n    #ifndef USE_MORPHNORMALS\n\n    morphed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];\n  morphed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];\n  morphed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];\n  morphed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];\n\n    #endif\n\n  morphed += position;\n\n#endif", n.ShaderChunk.envmap_vertex = "#if defined( USE_ENVMAP ) && ! defined( USE_BUMPMAP ) && ! defined( USE_NORMALMAP ) && ! defined( PHONG )\n\n   vec3 worldNormal = mat3( modelMatrix[ 0 ].xyz, modelMatrix[ 1 ].xyz, modelMatrix[ 2 ].xyz ) * objectNormal;\n   worldNormal = normalize( worldNormal );\n\n vec3 cameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n\n  if ( useRefract ) {\n\n     vReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n\n } else {\n\n        vReflect = reflect( cameraToVertex, worldNormal );\n\n  }\n\n#endif", n.ShaderChunk.shadowmap_fragment = "#ifdef USE_SHADOWMAP\n\n  #ifdef SHADOWMAP_DEBUG\n\n      vec3 frustumColors[3];\n        frustumColors[0] = vec3( 1.0, 0.5, 0.0 );\n     frustumColors[1] = vec3( 0.0, 1.0, 0.8 );\n     frustumColors[2] = vec3( 0.0, 0.5, 1.0 );\n\n   #endif\n\n  #ifdef SHADOWMAP_CASCADE\n\n        int inFrustumCount = 0;\n\n #endif\n\n  float fDepth;\n vec3 shadowColor = vec3( 1.0 );\n\n for( int i = 0; i < MAX_SHADOWS; i ++ ) {\n\n       vec3 shadowCoord = vShadowCoord[ i ].xyz / vShadowCoord[ i ].w;\n\n             // if ( something && something ) breaks ATI OpenGL shader compiler\n                // if ( all( something, something ) ) using this instead\n\n        bvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\n        bool inFrustum = all( inFrustumVec );\n\n               // don't shadow pixels outside of light frustum\n               // use just first frustum (for cascades)\n              // don't shadow pixels behind far plane of light frustum\n\n        #ifdef SHADOWMAP_CASCADE\n\n            inFrustumCount += int( inFrustum );\n           bvec3 frustumTestVec = bvec3( inFrustum, inFrustumCount == 1, shadowCoord.z <= 1.0 );\n\n       #else\n\n           bvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );\n\n        #endif\n\n      bool frustumTest = all( frustumTestVec );\n\n       if ( frustumTest ) {\n\n            shadowCoord.z += shadowBias[ i ];\n\n           #if defined( SHADOWMAP_TYPE_PCF )\n\n                       // Percentage-close filtering\n                     // (9 pixel kernel)\n                       // http://fabiensanglard.net/shadowmappingPCF/\n\n              float shadow = 0.0;\n\n     /*\n                        // nested loops breaks shader compiler / validator on some ATI cards when using OpenGL\n                        // must enroll loop manually\n\n                for ( float y = -1.25; y <= 1.25; y += 1.25 )\n                 for ( float x = -1.25; x <= 1.25; x += 1.25 ) {\n\n                     vec4 rgbaDepth = texture2D( shadowMap[ i ], vec2( x * xPixelOffset, y * yPixelOffset ) + shadowCoord.xy );\n\n                              // doesn't seem to produce any noticeable visual difference compared to simple texture2D lookup\n                               //vec4 rgbaDepth = texture2DProj( shadowMap[ i ], vec4( vShadowCoord[ i ].w * ( vec2( x * xPixelOffset, y * yPixelOffset ) + shadowCoord.xy ), 0.05, vShadowCoord[ i ].w ) );\n\n                       float fDepth = unpackDepth( rgbaDepth );\n\n                        if ( fDepth < shadowCoord.z )\n                         shadow += 1.0;\n\n              }\n\n               shadow /= 9.0;\n\n      */\n\n              const float shadowDelta = 1.0 / 9.0;\n\n                float xPixelOffset = 1.0 / shadowMapSize[ i ].x;\n              float yPixelOffset = 1.0 / shadowMapSize[ i ].y;\n\n                float dx0 = -1.25 * xPixelOffset;\n             float dy0 = -1.25 * yPixelOffset;\n             float dx1 = 1.25 * xPixelOffset;\n              float dy1 = 1.25 * yPixelOffset;\n\n                fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy0 ) ) );\n               if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n                fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy0 ) ) );\n               if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n                fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy0 ) ) );\n               if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n                fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, 0.0 ) ) );\n               if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n                fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy ) );\n              if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n                fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, 0.0 ) ) );\n               if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n                fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy1 ) ) );\n               if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n                fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy1 ) ) );\n               if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n                fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy1 ) ) );\n               if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n                shadowColor = shadowColor * vec3( ( 1.0 - shadowDarkness[ i ] * shadow ) );\n\n         #elif defined( SHADOWMAP_TYPE_PCF_SOFT )\n\n                        // Percentage-close filtering\n                     // (9 pixel kernel)\n                       // http://fabiensanglard.net/shadowmappingPCF/\n\n              float shadow = 0.0;\n\n             float xPixelOffset = 1.0 / shadowMapSize[ i ].x;\n              float yPixelOffset = 1.0 / shadowMapSize[ i ].y;\n\n                float dx0 = -1.0 * xPixelOffset;\n              float dy0 = -1.0 * yPixelOffset;\n              float dx1 = 1.0 * xPixelOffset;\n               float dy1 = 1.0 * yPixelOffset;\n\n             mat3 shadowKernel;\n                mat3 depthKernel;\n\n               depthKernel[0][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy0 ) ) );\n                depthKernel[0][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, 0.0 ) ) );\n                depthKernel[0][2] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy1 ) ) );\n                depthKernel[1][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy0 ) ) );\n                depthKernel[1][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy ) );\n               depthKernel[1][2] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy1 ) ) );\n                depthKernel[2][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy0 ) ) );\n                depthKernel[2][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, 0.0 ) ) );\n                depthKernel[2][2] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy1 ) ) );\n\n              vec3 shadowZ = vec3( shadowCoord.z );\n             shadowKernel[0] = vec3(lessThan(depthKernel[0], shadowZ ));\n               shadowKernel[0] *= vec3(0.25);\n\n              shadowKernel[1] = vec3(lessThan(depthKernel[1], shadowZ ));\n               shadowKernel[1] *= vec3(0.25);\n\n              shadowKernel[2] = vec3(lessThan(depthKernel[2], shadowZ ));\n               shadowKernel[2] *= vec3(0.25);\n\n              vec2 fractionalCoord = 1.0 - fract( shadowCoord.xy * shadowMapSize[i].xy );\n\n             shadowKernel[0] = mix( shadowKernel[1], shadowKernel[0], fractionalCoord.x );\n             shadowKernel[1] = mix( shadowKernel[2], shadowKernel[1], fractionalCoord.x );\n\n               vec4 shadowValues;\n                shadowValues.x = mix( shadowKernel[0][1], shadowKernel[0][0], fractionalCoord.y );\n                shadowValues.y = mix( shadowKernel[0][2], shadowKernel[0][1], fractionalCoord.y );\n                shadowValues.z = mix( shadowKernel[1][1], shadowKernel[1][0], fractionalCoord.y );\n                shadowValues.w = mix( shadowKernel[1][2], shadowKernel[1][1], fractionalCoord.y );\n\n              shadow = dot( shadowValues, vec4( 1.0 ) );\n\n              shadowColor = shadowColor * vec3( ( 1.0 - shadowDarkness[ i ] * shadow ) );\n\n         #else\n\n               vec4 rgbaDepth = texture2D( shadowMap[ i ], shadowCoord.xy );\n             float fDepth = unpackDepth( rgbaDepth );\n\n                if ( fDepth < shadowCoord.z )\n\n       // spot with multiple shadows is darker\n\n                 shadowColor = shadowColor * vec3( 1.0 - shadowDarkness[ i ] );\n\n      // spot with multiple shadows has the same color as single shadow spot\n\n      //                  shadowColor = min( shadowColor, vec3( shadowDarkness[ i ] ) );\n\n          #endif\n\n      }\n\n\n     #ifdef SHADOWMAP_DEBUG\n\n          #ifdef SHADOWMAP_CASCADE\n\n                if ( inFrustum && inFrustumCount == 1 ) gl_FragColor.xyz *= frustumColors[ i ];\n\n         #else\n\n               if ( inFrustum ) gl_FragColor.xyz *= frustumColors[ i ];\n\n            #endif\n\n      #endif\n\n  }\n\n   #ifdef GAMMA_OUTPUT\n\n     shadowColor *= shadowColor;\n\n #endif\n\n  gl_FragColor.xyz = gl_FragColor.xyz * shadowColor;\n\n#endif\n", n.ShaderChunk.worldpos_vertex = "#if defined( USE_ENVMAP ) || defined( PHONG ) || defined( LAMBERT ) || defined ( USE_SHADOWMAP )\n\n  #ifdef USE_SKINNING\n\n     vec4 worldPosition = modelMatrix * skinned;\n\n #endif\n\n  #if defined( USE_MORPHTARGETS ) && ! defined( USE_SKINNING )\n\n        vec4 worldPosition = modelMatrix * vec4( morphed, 1.0 );\n\n    #endif\n\n  #if ! defined( USE_MORPHTARGETS ) && ! defined( USE_SKINNING )\n\n      vec4 worldPosition = modelMatrix * vec4( position, 1.0 );\n\n   #endif\n\n#endif", n.ShaderChunk.shadowmap_pars_fragment = "#ifdef USE_SHADOWMAP\n\n    uniform sampler2D shadowMap[ MAX_SHADOWS ];\n   uniform vec2 shadowMapSize[ MAX_SHADOWS ];\n\n  uniform float shadowDarkness[ MAX_SHADOWS ];\n  uniform float shadowBias[ MAX_SHADOWS ];\n\n    varying vec4 vShadowCoord[ MAX_SHADOWS ];\n\n   float unpackDepth( const in vec4 rgba_depth ) {\n\n     const vec4 bit_shift = vec4( 1.0 / ( 256.0 * 256.0 * 256.0 ), 1.0 / ( 256.0 * 256.0 ), 1.0 / 256.0, 1.0 );\n        float depth = dot( rgba_depth, bit_shift );\n       return depth;\n\n   }\n\n#endif", n.ShaderChunk.skinning_pars_vertex = "#ifdef USE_SKINNING\n\n uniform mat4 bindMatrix;\n  uniform mat4 bindMatrixInverse;\n\n #ifdef BONE_TEXTURE\n\n     uniform sampler2D boneTexture;\n        uniform int boneTextureWidth;\n     uniform int boneTextureHeight;\n\n      mat4 getBoneMatrix( const in float i ) {\n\n            float j = i * 4.0;\n            float x = mod( j, float( boneTextureWidth ) );\n            float y = floor( j / float( boneTextureWidth ) );\n\n           float dx = 1.0 / float( boneTextureWidth );\n           float dy = 1.0 / float( boneTextureHeight );\n\n            y = dy * ( y + 0.5 );\n\n           vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );\n          vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );\n          vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );\n          vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );\n\n            mat4 bone = mat4( v1, v2, v3, v4 );\n\n         return bone;\n\n        }\n\n   #else\n\n       uniform mat4 boneGlobalMatrices[ MAX_BONES ];\n\n       mat4 getBoneMatrix( const in float i ) {\n\n            mat4 bone = boneGlobalMatrices[ int(i) ];\n         return bone;\n\n        }\n\n   #endif\n\n#endif\n",
        n.ShaderChunk.logdepthbuf_pars_fragment = "#ifdef USE_LOGDEPTHBUF\n\n   uniform float logDepthBufFC;\n\n    #ifdef USE_LOGDEPTHBUF_EXT\n\n      #extension GL_EXT_frag_depth : enable\n     varying float vFragDepth;\n\n   #endif\n\n#endif", n.ShaderChunk.alphamap_fragment = "#ifdef USE_ALPHAMAP\n\n   gl_FragColor.a *= texture2D( alphaMap, vUv ).g;\n\n#endif\n", n.ShaderChunk.alphamap_pars_fragment = "#ifdef USE_ALPHAMAP\n\n   uniform sampler2D alphaMap;\n\n#endif\n", n.UniformsUtils = {
            merge: function(e) {
                for (var t = {}, r = 0; r < e.length; r++) {
                    var i = this.clone(e[r]);
                    for (var n in i) t[n] = i[n]
                }
                return t
            },
            clone: function(e) {
                var t = {};
                for (var r in e) {
                    t[r] = {};
                    for (var i in e[r]) {
                        var o = e[r][i];
                        o instanceof n.Color || o instanceof n.Vector2 || o instanceof n.Vector3 || o instanceof n.Vector4 || o instanceof n.Matrix4 || o instanceof n.Texture ? t[r][i] = o.clone() : o instanceof Array ? t[r][i] = o.slice() : t[r][i] = o
                    }
                }
                return t
            }
        }, n.UniformsLib = {
            common: {
                diffuse: {
                    type: "c",
                    value: new n.Color(15658734)
                },
                opacity: {
                    type: "f",
                    value: 1
                },
                map: {
                    type: "t",
                    value: null
                },
                offsetRepeat: {
                    type: "v4",
                    value: new n.Vector4(0, 0, 1, 1)
                },
                lightMap: {
                    type: "t",
                    value: null
                },
                specularMap: {
                    type: "t",
                    value: null
                },
                alphaMap: {
                    type: "t",
                    value: null
                },
                envMap: {
                    type: "t",
                    value: null
                },
                flipEnvMap: {
                    type: "f",
                    value: -1
                },
                useRefract: {
                    type: "i",
                    value: 0
                },
                reflectivity: {
                    type: "f",
                    value: 1
                },
                refractionRatio: {
                    type: "f",
                    value: .98
                },
                combine: {
                    type: "i",
                    value: 0
                },
                morphTargetInfluences: {
                    type: "f",
                    value: 0
                }
            },
            bump: {
                bumpMap: {
                    type: "t",
                    value: null
                },
                bumpScale: {
                    type: "f",
                    value: 1
                }
            },
            normalmap: {
                normalMap: {
                    type: "t",
                    value: null
                },
                normalScale: {
                    type: "v2",
                    value: new n.Vector2(1, 1)
                }
            },
            fog: {
                fogDensity: {
                    type: "f",
                    value: 25e-5
                },
                fogNear: {
                    type: "f",
                    value: 1
                },
                fogFar: {
                    type: "f",
                    value: 2e3
                },
                fogColor: {
                    type: "c",
                    value: new n.Color(16777215)
                }
            },
            lights: {
                ambientLightColor: {
                    type: "fv",
                    value: []
                },
                directionalLightDirection: {
                    type: "fv",
                    value: []
                },
                directionalLightColor: {
                    type: "fv",
                    value: []
                },
                hemisphereLightDirection: {
                    type: "fv",
                    value: []
                },
                hemisphereLightSkyColor: {
                    type: "fv",
                    value: []
                },
                hemisphereLightGroundColor: {
                    type: "fv",
                    value: []
                },
                pointLightColor: {
                    type: "fv",
                    value: []
                },
                pointLightPosition: {
                    type: "fv",
                    value: []
                },
                pointLightDistance: {
                    type: "fv1",
                    value: []
                },
                spotLightColor: {
                    type: "fv",
                    value: []
                },
                spotLightPosition: {
                    type: "fv",
                    value: []
                },
                spotLightDirection: {
                    type: "fv",
                    value: []
                },
                spotLightDistance: {
                    type: "fv1",
                    value: []
                },
                spotLightAngleCos: {
                    type: "fv1",
                    value: []
                },
                spotLightExponent: {
                    type: "fv1",
                    value: []
                }
            },
            particle: {
                psColor: {
                    type: "c",
                    value: new n.Color(15658734)
                },
                opacity: {
                    type: "f",
                    value: 1
                },
                size: {
                    type: "f",
                    value: 1
                },
                scale: {
                    type: "f",
                    value: 1
                },
                map: {
                    type: "t",
                    value: null
                },
                fogDensity: {
                    type: "f",
                    value: 25e-5
                },
                fogNear: {
                    type: "f",
                    value: 1
                },
                fogFar: {
                    type: "f",
                    value: 2e3
                },
                fogColor: {
                    type: "c",
                    value: new n.Color(16777215)
                }
            },
            shadowmap: {
                shadowMap: {
                    type: "tv",
                    value: []
                },
                shadowMapSize: {
                    type: "v2v",
                    value: []
                },
                shadowBias: {
                    type: "fv1",
                    value: []
                },
                shadowDarkness: {
                    type: "fv1",
                    value: []
                },
                shadowMatrix: {
                    type: "m4v",
                    value: []
                }
            }
        }, n.ShaderLib = {
            basic: {
                uniforms: n.UniformsUtils.merge([n.UniformsLib.common, n.UniformsLib.fog, n.UniformsLib.shadowmap]),
                vertexShader: [n.ShaderChunk.map_pars_vertex, n.ShaderChunk.lightmap_pars_vertex, n.ShaderChunk.envmap_pars_vertex, n.ShaderChunk.color_pars_vertex, n.ShaderChunk.morphtarget_pars_vertex, n.ShaderChunk.skinning_pars_vertex, n.ShaderChunk.shadowmap_pars_vertex, n.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", n.ShaderChunk.map_vertex, n.ShaderChunk.lightmap_vertex, n.ShaderChunk.color_vertex, n.ShaderChunk.skinbase_vertex, "  #ifdef USE_ENVMAP", n.ShaderChunk.morphnormal_vertex, n.ShaderChunk.skinnormal_vertex, n.ShaderChunk.defaultnormal_vertex, "    #endif", n.ShaderChunk.morphtarget_vertex, n.ShaderChunk.skinning_vertex, n.ShaderChunk.default_vertex, n.ShaderChunk.logdepthbuf_vertex, n.ShaderChunk.worldpos_vertex, n.ShaderChunk.envmap_vertex, n.ShaderChunk.shadowmap_vertex, "}"].join("\n"),
                fragmentShader: ["uniform vec3 diffuse;", "uniform float opacity;", n.ShaderChunk.color_pars_fragment, n.ShaderChunk.map_pars_fragment, n.ShaderChunk.alphamap_pars_fragment, n.ShaderChunk.lightmap_pars_fragment, n.ShaderChunk.envmap_pars_fragment, n.ShaderChunk.fog_pars_fragment, n.ShaderChunk.shadowmap_pars_fragment, n.ShaderChunk.specularmap_pars_fragment, n.ShaderChunk.logdepthbuf_pars_fragment, "void main() {", "    gl_FragColor = vec4( diffuse, opacity );", n.ShaderChunk.logdepthbuf_fragment, n.ShaderChunk.map_fragment, n.ShaderChunk.alphamap_fragment, n.ShaderChunk.alphatest_fragment, n.ShaderChunk.specularmap_fragment, n.ShaderChunk.lightmap_fragment, n.ShaderChunk.color_fragment, n.ShaderChunk.envmap_fragment, n.ShaderChunk.shadowmap_fragment, n.ShaderChunk.linear_to_gamma_fragment, n.ShaderChunk.fog_fragment, "}"].join("\n")
            },
            lambert: {
                uniforms: n.UniformsUtils.merge([n.UniformsLib.common, n.UniformsLib.fog, n.UniformsLib.lights, n.UniformsLib.shadowmap, {
                    ambient: {
                        type: "c",
                        value: new n.Color(16777215)
                    },
                    emissive: {
                        type: "c",
                        value: new n.Color(0)
                    },
                    wrapRGB: {
                        type: "v3",
                        value: new n.Vector3(1, 1, 1)
                    }
                }]),
                vertexShader: ["#define LAMBERT", "varying vec3 vLightFront;", "#ifdef DOUBLE_SIDED", " varying vec3 vLightBack;", "#endif", n.ShaderChunk.map_pars_vertex, n.ShaderChunk.lightmap_pars_vertex, n.ShaderChunk.envmap_pars_vertex, n.ShaderChunk.lights_lambert_pars_vertex, n.ShaderChunk.color_pars_vertex, n.ShaderChunk.morphtarget_pars_vertex, n.ShaderChunk.skinning_pars_vertex, n.ShaderChunk.shadowmap_pars_vertex, n.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", n.ShaderChunk.map_vertex, n.ShaderChunk.lightmap_vertex, n.ShaderChunk.color_vertex, n.ShaderChunk.morphnormal_vertex, n.ShaderChunk.skinbase_vertex, n.ShaderChunk.skinnormal_vertex, n.ShaderChunk.defaultnormal_vertex, n.ShaderChunk.morphtarget_vertex, n.ShaderChunk.skinning_vertex, n.ShaderChunk.default_vertex, n.ShaderChunk.logdepthbuf_vertex, n.ShaderChunk.worldpos_vertex, n.ShaderChunk.envmap_vertex, n.ShaderChunk.lights_lambert_vertex, n.ShaderChunk.shadowmap_vertex, "}"].join("\n"),
                fragmentShader: ["uniform float opacity;", "varying vec3 vLightFront;", "#ifdef DOUBLE_SIDED", "    varying vec3 vLightBack;", "#endif", n.ShaderChunk.color_pars_fragment, n.ShaderChunk.map_pars_fragment, n.ShaderChunk.alphamap_pars_fragment, n.ShaderChunk.lightmap_pars_fragment, n.ShaderChunk.envmap_pars_fragment, n.ShaderChunk.fog_pars_fragment, n.ShaderChunk.shadowmap_pars_fragment, n.ShaderChunk.specularmap_pars_fragment, n.ShaderChunk.logdepthbuf_pars_fragment, "void main() {", "   gl_FragColor = vec4( vec3( 1.0 ), opacity );", n.ShaderChunk.logdepthbuf_fragment, n.ShaderChunk.map_fragment, n.ShaderChunk.alphamap_fragment, n.ShaderChunk.alphatest_fragment, n.ShaderChunk.specularmap_fragment, " #ifdef DOUBLE_SIDED", "     if ( gl_FrontFacing )", "           gl_FragColor.xyz *= vLightFront;", "        else", "            gl_FragColor.xyz *= vLightBack;", " #else", "       gl_FragColor.xyz *= vLightFront;", "    #endif", n.ShaderChunk.lightmap_fragment, n.ShaderChunk.color_fragment, n.ShaderChunk.envmap_fragment, n.ShaderChunk.shadowmap_fragment, n.ShaderChunk.linear_to_gamma_fragment, n.ShaderChunk.fog_fragment, "}"].join("\n")
            },
            phong: {
                uniforms: n.UniformsUtils.merge([n.UniformsLib.common, n.UniformsLib.bump, n.UniformsLib.normalmap, n.UniformsLib.fog, n.UniformsLib.lights, n.UniformsLib.shadowmap, {
                    ambient: {
                        type: "c",
                        value: new n.Color(16777215)
                    },
                    emissive: {
                        type: "c",
                        value: new n.Color(0)
                    },
                    specular: {
                        type: "c",
                        value: new n.Color(1118481)
                    },
                    shininess: {
                        type: "f",
                        value: 30
                    },
                    wrapRGB: {
                        type: "v3",
                        value: new n.Vector3(1, 1, 1)
                    }
                }]),
                vertexShader: ["#define PHONG", "varying vec3 vViewPosition;", "varying vec3 vNormal;", n.ShaderChunk.map_pars_vertex, n.ShaderChunk.lightmap_pars_vertex, n.ShaderChunk.envmap_pars_vertex, n.ShaderChunk.lights_phong_pars_vertex, n.ShaderChunk.color_pars_vertex, n.ShaderChunk.morphtarget_pars_vertex, n.ShaderChunk.skinning_pars_vertex, n.ShaderChunk.shadowmap_pars_vertex, n.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", n.ShaderChunk.map_vertex, n.ShaderChunk.lightmap_vertex, n.ShaderChunk.color_vertex, n.ShaderChunk.morphnormal_vertex, n.ShaderChunk.skinbase_vertex, n.ShaderChunk.skinnormal_vertex, n.ShaderChunk.defaultnormal_vertex, "  vNormal = normalize( transformedNormal );", n.ShaderChunk.morphtarget_vertex, n.ShaderChunk.skinning_vertex, n.ShaderChunk.default_vertex, n.ShaderChunk.logdepthbuf_vertex, "  vViewPosition = -mvPosition.xyz;", n.ShaderChunk.worldpos_vertex, n.ShaderChunk.envmap_vertex, n.ShaderChunk.lights_phong_vertex, n.ShaderChunk.shadowmap_vertex, "}"].join("\n"),
                fragmentShader: ["#define PHONG", "uniform vec3 diffuse;", "uniform float opacity;", "uniform vec3 ambient;", "uniform vec3 emissive;", "uniform vec3 specular;", "uniform float shininess;", n.ShaderChunk.color_pars_fragment, n.ShaderChunk.map_pars_fragment, n.ShaderChunk.alphamap_pars_fragment, n.ShaderChunk.lightmap_pars_fragment, n.ShaderChunk.envmap_pars_fragment, n.ShaderChunk.fog_pars_fragment, n.ShaderChunk.lights_phong_pars_fragment, n.ShaderChunk.shadowmap_pars_fragment, n.ShaderChunk.bumpmap_pars_fragment, n.ShaderChunk.normalmap_pars_fragment, n.ShaderChunk.specularmap_pars_fragment, n.ShaderChunk.logdepthbuf_pars_fragment, "void main() {", "    gl_FragColor = vec4( vec3( 1.0 ), opacity );", n.ShaderChunk.logdepthbuf_fragment, n.ShaderChunk.map_fragment, n.ShaderChunk.alphamap_fragment, n.ShaderChunk.alphatest_fragment, n.ShaderChunk.specularmap_fragment, n.ShaderChunk.lights_phong_fragment, n.ShaderChunk.lightmap_fragment, n.ShaderChunk.color_fragment, n.ShaderChunk.envmap_fragment, n.ShaderChunk.shadowmap_fragment, n.ShaderChunk.linear_to_gamma_fragment, n.ShaderChunk.fog_fragment, "}"].join("\n")
            },
            particle_basic: {
                uniforms: n.UniformsUtils.merge([n.UniformsLib.particle, n.UniformsLib.shadowmap]),
                vertexShader: ["uniform float size;", "uniform float scale;", n.ShaderChunk.color_pars_vertex, n.ShaderChunk.shadowmap_pars_vertex, n.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", n.ShaderChunk.color_vertex, "   vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );", "  #ifdef USE_SIZEATTENUATION", "      gl_PointSize = size * ( scale / length( mvPosition.xyz ) );", " #else", "       gl_PointSize = size;", "    #endif", "  gl_Position = projectionMatrix * mvPosition;", n.ShaderChunk.logdepthbuf_vertex, n.ShaderChunk.worldpos_vertex, n.ShaderChunk.shadowmap_vertex, "}"].join("\n"),
                fragmentShader: ["uniform vec3 psColor;", "uniform float opacity;", n.ShaderChunk.color_pars_fragment, n.ShaderChunk.map_particle_pars_fragment, n.ShaderChunk.fog_pars_fragment, n.ShaderChunk.shadowmap_pars_fragment, n.ShaderChunk.logdepthbuf_pars_fragment, "void main() {", "    gl_FragColor = vec4( psColor, opacity );", n.ShaderChunk.logdepthbuf_fragment, n.ShaderChunk.map_particle_fragment, n.ShaderChunk.alphatest_fragment, n.ShaderChunk.color_fragment, n.ShaderChunk.shadowmap_fragment, n.ShaderChunk.fog_fragment, "}"].join("\n")
            },
            dashed: {
                uniforms: n.UniformsUtils.merge([n.UniformsLib.common, n.UniformsLib.fog, {
                    scale: {
                        type: "f",
                        value: 1
                    },
                    dashSize: {
                        type: "f",
                        value: 1
                    },
                    totalSize: {
                        type: "f",
                        value: 2
                    }
                }]),
                vertexShader: ["uniform float scale;", "attribute float lineDistance;", "varying float vLineDistance;", n.ShaderChunk.color_pars_vertex, n.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", n.ShaderChunk.color_vertex, "  vLineDistance = scale * lineDistance;", "   vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );", "  gl_Position = projectionMatrix * mvPosition;", n.ShaderChunk.logdepthbuf_vertex, "}"].join("\n"),
                fragmentShader: ["uniform vec3 diffuse;", "uniform float opacity;", "uniform float dashSize;", "uniform float totalSize;", "varying float vLineDistance;", n.ShaderChunk.color_pars_fragment, n.ShaderChunk.fog_pars_fragment, n.ShaderChunk.logdepthbuf_pars_fragment, "void main() {", "  if ( mod( vLineDistance, totalSize ) > dashSize ) {", "     discard;", "    }", "   gl_FragColor = vec4( diffuse, opacity );", n.ShaderChunk.logdepthbuf_fragment, n.ShaderChunk.color_fragment, n.ShaderChunk.fog_fragment, "}"].join("\n")
            },
            depth: {
                uniforms: {
                    mNear: {
                        type: "f",
                        value: 1
                    },
                    mFar: {
                        type: "f",
                        value: 2e3
                    },
                    opacity: {
                        type: "f",
                        value: 1
                    }
                },
                vertexShader: [n.ShaderChunk.morphtarget_pars_vertex, n.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", n.ShaderChunk.morphtarget_vertex, n.ShaderChunk.default_vertex, n.ShaderChunk.logdepthbuf_vertex, "}"].join("\n"),
                fragmentShader: ["uniform float mNear;", "uniform float mFar;", "uniform float opacity;", n.ShaderChunk.logdepthbuf_pars_fragment, "void main() {", n.ShaderChunk.logdepthbuf_fragment, "   #ifdef USE_LOGDEPTHBUF_EXT", "      float depth = gl_FragDepthEXT / gl_FragCoord.w;", " #else", "       float depth = gl_FragCoord.z / gl_FragCoord.w;", "  #endif", "  float color = 1.0 - smoothstep( mNear, mFar, depth );", "   gl_FragColor = vec4( vec3( color ), opacity );", "}"].join("\n")
            },
            normal: {
                uniforms: {
                    opacity: {
                        type: "f",
                        value: 1
                    }
                },
                vertexShader: ["varying vec3 vNormal;", n.ShaderChunk.morphtarget_pars_vertex, n.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", "    vNormal = normalize( normalMatrix * normal );", n.ShaderChunk.morphtarget_vertex, n.ShaderChunk.default_vertex, n.ShaderChunk.logdepthbuf_vertex, "}"].join("\n"),
                fragmentShader: ["uniform float opacity;", "varying vec3 vNormal;", n.ShaderChunk.logdepthbuf_pars_fragment, "void main() {", " gl_FragColor = vec4( 0.5 * normalize( vNormal ) + 0.5, opacity );", n.ShaderChunk.logdepthbuf_fragment, "}"].join("\n")
            },
            normalmap: {
                uniforms: n.UniformsUtils.merge([n.UniformsLib.fog, n.UniformsLib.lights, n.UniformsLib.shadowmap, {
                    enableAO: {
                        type: "i",
                        value: 0
                    },
                    enableDiffuse: {
                        type: "i",
                        value: 0
                    },
                    enableSpecular: {
                        type: "i",
                        value: 0
                    },
                    enableReflection: {
                        type: "i",
                        value: 0
                    },
                    enableDisplacement: {
                        type: "i",
                        value: 0
                    },
                    tDisplacement: {
                        type: "t",
                        value: null
                    },
                    tDiffuse: {
                        type: "t",
                        value: null
                    },
                    tCube: {
                        type: "t",
                        value: null
                    },
                    tNormal: {
                        type: "t",
                        value: null
                    },
                    tSpecular: {
                        type: "t",
                        value: null
                    },
                    tAO: {
                        type: "t",
                        value: null
                    },
                    uNormalScale: {
                        type: "v2",
                        value: new n.Vector2(1, 1)
                    },
                    uDisplacementBias: {
                        type: "f",
                        value: 0
                    },
                    uDisplacementScale: {
                        type: "f",
                        value: 1
                    },
                    diffuse: {
                        type: "c",
                        value: new n.Color(16777215)
                    },
                    specular: {
                        type: "c",
                        value: new n.Color(1118481)
                    },
                    ambient: {
                        type: "c",
                        value: new n.Color(16777215)
                    },
                    shininess: {
                        type: "f",
                        value: 30
                    },
                    opacity: {
                        type: "f",
                        value: 1
                    },
                    useRefract: {
                        type: "i",
                        value: 0
                    },
                    refractionRatio: {
                        type: "f",
                        value: .98
                    },
                    reflectivity: {
                        type: "f",
                        value: .5
                    },
                    uOffset: {
                        type: "v2",
                        value: new n.Vector2(0, 0)
                    },
                    uRepeat: {
                        type: "v2",
                        value: new n.Vector2(1, 1)
                    },
                    wrapRGB: {
                        type: "v3",
                        value: new n.Vector3(1, 1, 1)
                    }
                }]),
                fragmentShader: ["uniform vec3 ambient;", "uniform vec3 diffuse;", "uniform vec3 specular;", "uniform float shininess;", "uniform float opacity;", "uniform bool enableDiffuse;", "uniform bool enableSpecular;", "uniform bool enableAO;", "uniform bool enableReflection;", "uniform sampler2D tDiffuse;", "uniform sampler2D tNormal;", "uniform sampler2D tSpecular;", "uniform sampler2D tAO;", "uniform samplerCube tCube;", "uniform vec2 uNormalScale;", "uniform bool useRefract;", "uniform float refractionRatio;", "uniform float reflectivity;", "varying vec3 vTangent;", "varying vec3 vBinormal;", "varying vec3 vNormal;", "varying vec2 vUv;", "uniform vec3 ambientLightColor;", "#if MAX_DIR_LIGHTS > 0", " uniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];", "   uniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];", "#endif", "#if MAX_HEMI_LIGHTS > 0", "  uniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];", "    uniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];", " uniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];", "#endif", "#if MAX_POINT_LIGHTS > 0", " uniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];", "   uniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];", "    uniform float pointLightDistance[ MAX_POINT_LIGHTS ];", "#endif", "#if MAX_SPOT_LIGHTS > 0", "  uniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];", " uniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];", "  uniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];", " uniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];", " uniform float spotLightExponent[ MAX_SPOT_LIGHTS ];", " uniform float spotLightDistance[ MAX_SPOT_LIGHTS ];", "#endif", "#ifdef WRAP_AROUND", " uniform vec3 wrapRGB;", "#endif", "varying vec3 vWorldPosition;", "varying vec3 vViewPosition;", n.ShaderChunk.shadowmap_pars_fragment, n.ShaderChunk.fog_pars_fragment, n.ShaderChunk.logdepthbuf_pars_fragment, "void main() {", n.ShaderChunk.logdepthbuf_fragment, "    gl_FragColor = vec4( vec3( 1.0 ), opacity );", "    vec3 specularTex = vec3( 1.0 );", " vec3 normalTex = texture2D( tNormal, vUv ).xyz * 2.0 - 1.0;", " normalTex.xy *= uNormalScale;", "   normalTex = normalize( normalTex );", " if( enableDiffuse ) {", "       #ifdef GAMMA_INPUT", "          vec4 texelColor = texture2D( tDiffuse, vUv );", "           texelColor.xyz *= texelColor.xyz;", "           gl_FragColor = gl_FragColor * texelColor;", "       #else", "           gl_FragColor = gl_FragColor * texture2D( tDiffuse, vUv );", "       #endif", "  }", "   if( enableAO ) {", "        #ifdef GAMMA_INPUT", "          vec4 aoColor = texture2D( tAO, vUv );", "           aoColor.xyz *= aoColor.xyz;", "         gl_FragColor.xyz = gl_FragColor.xyz * aoColor.xyz;", "      #else", "           gl_FragColor.xyz = gl_FragColor.xyz * texture2D( tAO, vUv ).xyz;", "        #endif", "  }", n.ShaderChunk.alphatest_fragment, " if( enableSpecular )", "        specularTex = texture2D( tSpecular, vUv ).xyz;", "  mat3 tsb = mat3( normalize( vTangent ), normalize( vBinormal ), normalize( vNormal ) );", " vec3 finalNormal = tsb * normalTex;", " #ifdef FLIP_SIDED", "       finalNormal = -finalNormal;", " #endif", "  vec3 normal = normalize( finalNormal );", " vec3 viewPosition = normalize( vViewPosition );", " #if MAX_POINT_LIGHTS > 0", "        vec3 pointDiffuse = vec3( 0.0 );", "        vec3 pointSpecular = vec3( 0.0 );", "       for ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {", "         vec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );", "         vec3 pointVector = lPosition.xyz + vViewPosition.xyz;", "           float pointDistance = 1.0;", "          if ( pointLightDistance[ i ] > 0.0 )", "                pointDistance = 1.0 - min( ( length( pointVector ) / pointLightDistance[ i ] ), 1.0 );", "          pointVector = normalize( pointVector );", "         #ifdef WRAP_AROUND", "              float pointDiffuseWeightFull = max( dot( normal, pointVector ), 0.0 );", "              float pointDiffuseWeightHalf = max( 0.5 * dot( normal, pointVector ) + 0.5, 0.0 );", "              vec3 pointDiffuseWeight = mix( vec3( pointDiffuseWeightFull ), vec3( pointDiffuseWeightHalf ), wrapRGB );", "           #else", "               float pointDiffuseWeight = max( dot( normal, pointVector ), 0.0 );", "          #endif", "          pointDiffuse += pointDistance * pointLightColor[ i ] * diffuse * pointDiffuseWeight;", "            vec3 pointHalfVector = normalize( pointVector + viewPosition );", "         float pointDotNormalHalf = max( dot( normal, pointHalfVector ), 0.0 );", "          float pointSpecularWeight = specularTex.r * max( pow( pointDotNormalHalf, shininess ), 0.0 );", "           float specularNormalization = ( shininess + 2.0 ) / 8.0;", "            vec3 schlick = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( pointVector, pointHalfVector ), 0.0 ), 5.0 );", "           pointSpecular += schlick * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * pointDistance * specularNormalization;", "     }", "   #endif", "  #if MAX_SPOT_LIGHTS > 0", "     vec3 spotDiffuse = vec3( 0.0 );", "     vec3 spotSpecular = vec3( 0.0 );", "        for ( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {", "          vec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );", "          vec3 spotVector = lPosition.xyz + vViewPosition.xyz;", "            float spotDistance = 1.0;", "           if ( spotLightDistance[ i ] > 0.0 )", "             spotDistance = 1.0 - min( ( length( spotVector ) / spotLightDistance[ i ] ), 1.0 );", "         spotVector = normalize( spotVector );", "           float spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - vWorldPosition ) );", "            if ( spotEffect > spotLightAngleCos[ i ] ) {", "                spotEffect = max( pow( max( spotEffect, 0.0 ), spotLightExponent[ i ] ), 0.0 );", "             #ifdef WRAP_AROUND", "                  float spotDiffuseWeightFull = max( dot( normal, spotVector ), 0.0 );", "                    float spotDiffuseWeightHalf = max( 0.5 * dot( normal, spotVector ) + 0.5, 0.0 );", "                    vec3 spotDiffuseWeight = mix( vec3( spotDiffuseWeightFull ), vec3( spotDiffuseWeightHalf ), wrapRGB );", "              #else", "                   float spotDiffuseWeight = max( dot( normal, spotVector ), 0.0 );", "                #endif", "              spotDiffuse += spotDistance * spotLightColor[ i ] * diffuse * spotDiffuseWeight * spotEffect;", "               vec3 spotHalfVector = normalize( spotVector + viewPosition );", "               float spotDotNormalHalf = max( dot( normal, spotHalfVector ), 0.0 );", "                float spotSpecularWeight = specularTex.r * max( pow( spotDotNormalHalf, shininess ), 0.0 );", "             float specularNormalization = ( shininess + 2.0 ) / 8.0;", "                vec3 schlick = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( spotVector, spotHalfVector ), 0.0 ), 5.0 );", "             spotSpecular += schlick * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * spotDistance * specularNormalization * spotEffect;", "         }", "       }", "   #endif", "  #if MAX_DIR_LIGHTS > 0", "      vec3 dirDiffuse = vec3( 0.0 );", "      vec3 dirSpecular = vec3( 0.0 );", "     for( int i = 0; i < MAX_DIR_LIGHTS; i++ ) {", "         vec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );", "         vec3 dirVector = normalize( lDirection.xyz );", "           #ifdef WRAP_AROUND", "              float directionalLightWeightingFull = max( dot( normal, dirVector ), 0.0 );", "             float directionalLightWeightingHalf = max( 0.5 * dot( normal, dirVector ) + 0.5, 0.0 );", "             vec3 dirDiffuseWeight = mix( vec3( directionalLightWeightingFull ), vec3( directionalLightWeightingHalf ), wrapRGB );", "           #else", "               float dirDiffuseWeight = max( dot( normal, dirVector ), 0.0 );", "          #endif", "          dirDiffuse += directionalLightColor[ i ] * diffuse * dirDiffuseWeight;", "          vec3 dirHalfVector = normalize( dirVector + viewPosition );", "         float dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );", "          float dirSpecularWeight = specularTex.r * max( pow( dirDotNormalHalf, shininess ), 0.0 );", "           float specularNormalization = ( shininess + 2.0 ) / 8.0;", "            vec3 schlick = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( dirVector, dirHalfVector ), 0.0 ), 5.0 );", "           dirSpecular += schlick * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization;", "     }", "   #endif", "  #if MAX_HEMI_LIGHTS > 0", "     vec3 hemiDiffuse = vec3( 0.0 );", "     vec3 hemiSpecular = vec3( 0.0 );", "        for( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {", "           vec4 lDirection = viewMatrix * vec4( hemisphereLightDirection[ i ], 0.0 );", "          vec3 lVector = normalize( lDirection.xyz );", "         float dotProduct = dot( normal, lVector );", "          float hemiDiffuseWeight = 0.5 * dotProduct + 0.5;", "           vec3 hemiColor = mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );", "           hemiDiffuse += diffuse * hemiColor;", "         vec3 hemiHalfVectorSky = normalize( lVector + viewPosition );", "           float hemiDotNormalHalfSky = 0.5 * dot( normal, hemiHalfVectorSky ) + 0.5;", "          float hemiSpecularWeightSky = specularTex.r * max( pow( max( hemiDotNormalHalfSky, 0.0 ), shininess ), 0.0 );", "           vec3 lVectorGround = -lVector;", "          vec3 hemiHalfVectorGround = normalize( lVectorGround + viewPosition );", "          float hemiDotNormalHalfGround = 0.5 * dot( normal, hemiHalfVectorGround ) + 0.5;", "            float hemiSpecularWeightGround = specularTex.r * max( pow( max( hemiDotNormalHalfGround, 0.0 ), shininess ), 0.0 );", "         float dotProductGround = dot( normal, lVectorGround );", "          float specularNormalization = ( shininess + 2.0 ) / 8.0;", "            vec3 schlickSky = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( lVector, hemiHalfVectorSky ), 0.0 ), 5.0 );", "          vec3 schlickGround = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( lVectorGround, hemiHalfVectorGround ), 0.0 ), 5.0 );", "          hemiSpecular += hemiColor * specularNormalization * ( schlickSky * hemiSpecularWeightSky * max( dotProduct, 0.0 ) + schlickGround * hemiSpecularWeightGround * max( dotProductGround, 0.0 ) );", "      }", "   #endif", "  vec3 totalDiffuse = vec3( 0.0 );", "    vec3 totalSpecular = vec3( 0.0 );", "   #if MAX_DIR_LIGHTS > 0", "      totalDiffuse += dirDiffuse;", "     totalSpecular += dirSpecular;", "   #endif", "  #if MAX_HEMI_LIGHTS > 0", "     totalDiffuse += hemiDiffuse;", "        totalSpecular += hemiSpecular;", "  #endif", "  #if MAX_POINT_LIGHTS > 0", "        totalDiffuse += pointDiffuse;", "       totalSpecular += pointSpecular;", " #endif", "  #if MAX_SPOT_LIGHTS > 0", "     totalDiffuse += spotDiffuse;", "        totalSpecular += spotSpecular;", "  #endif", "  #ifdef METAL", "        gl_FragColor.xyz = gl_FragColor.xyz * ( totalDiffuse + ambientLightColor * ambient + totalSpecular );", "   #else", "       gl_FragColor.xyz = gl_FragColor.xyz * ( totalDiffuse + ambientLightColor * ambient ) + totalSpecular;", "   #endif", "  if ( enableReflection ) {", "       vec3 vReflect;", "      vec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );", "     if ( useRefract ) {", "         vReflect = refract( cameraToVertex, normal, refractionRatio );", "      } else {", "            vReflect = reflect( cameraToVertex, normal );", "       }", "       vec4 cubeColor = textureCube( tCube, vec3( -vReflect.x, vReflect.yz ) );", "        #ifdef GAMMA_INPUT", "          cubeColor.xyz *= cubeColor.xyz;", "     #endif", "      gl_FragColor.xyz = mix( gl_FragColor.xyz, cubeColor.xyz, specularTex.r * reflectivity );", "    }", n.ShaderChunk.shadowmap_fragment, n.ShaderChunk.linear_to_gamma_fragment, n.ShaderChunk.fog_fragment, "}"].join("\n"),
                vertexShader: ["attribute vec4 tangent;", "uniform vec2 uOffset;", "uniform vec2 uRepeat;", "uniform bool enableDisplacement;", "#ifdef VERTEX_TEXTURES", " uniform sampler2D tDisplacement;", "    uniform float uDisplacementScale;", "   uniform float uDisplacementBias;", "#endif", "varying vec3 vTangent;", "varying vec3 vBinormal;", "varying vec3 vNormal;", "varying vec2 vUv;", "varying vec3 vWorldPosition;", "varying vec3 vViewPosition;", n.ShaderChunk.skinning_pars_vertex, n.ShaderChunk.shadowmap_pars_vertex, n.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", n.ShaderChunk.skinbase_vertex, n.ShaderChunk.skinnormal_vertex, "   #ifdef USE_SKINNING", "     vNormal = normalize( normalMatrix * skinnedNormal.xyz );", "        vec4 skinnedTangent = skinMatrix * vec4( tangent.xyz, 0.0 );", "        vTangent = normalize( normalMatrix * skinnedTangent.xyz );", "  #else", "       vNormal = normalize( normalMatrix * normal );", "       vTangent = normalize( normalMatrix * tangent.xyz );", " #endif", "  vBinormal = normalize( cross( vNormal, vTangent ) * tangent.w );", "    vUv = uv * uRepeat + uOffset;", "   vec3 displacedPosition;", " #ifdef VERTEX_TEXTURES", "      if ( enableDisplacement ) {", "         vec3 dv = texture2D( tDisplacement, uv ).xyz;", "           float df = uDisplacementScale * dv.x + uDisplacementBias;", "           displacedPosition = position + normalize( normal ) * df;", "        } else {", "            #ifdef USE_SKINNING", "             vec4 skinVertex = bindMatrix * vec4( position, 1.0 );", "               vec4 skinned = vec4( 0.0 );", "             skinned += boneMatX * skinVertex * skinWeight.x;", "                skinned += boneMatY * skinVertex * skinWeight.y;", "                skinned += boneMatZ * skinVertex * skinWeight.z;", "                skinned += boneMatW * skinVertex * skinWeight.w;", "                skinned  = bindMatrixInverse * skinned;", "             displacedPosition = skinned.xyz;", "            #else", "               displacedPosition = position;", "           #endif", "      }", "   #else", "       #ifdef USE_SKINNING", "         vec4 skinVertex = bindMatrix * vec4( position, 1.0 );", "           vec4 skinned = vec4( 0.0 );", "         skinned += boneMatX * skinVertex * skinWeight.x;", "            skinned += boneMatY * skinVertex * skinWeight.y;", "            skinned += boneMatZ * skinVertex * skinWeight.z;", "            skinned += boneMatW * skinVertex * skinWeight.w;", "            skinned  = bindMatrixInverse * skinned;", "         displacedPosition = skinned.xyz;", "        #else", "           displacedPosition = position;", "       #endif", "  #endif", "  vec4 mvPosition = modelViewMatrix * vec4( displacedPosition, 1.0 );", " vec4 worldPosition = modelMatrix * vec4( displacedPosition, 1.0 );", "  gl_Position = projectionMatrix * mvPosition;", n.ShaderChunk.logdepthbuf_vertex, "  vWorldPosition = worldPosition.xyz;", " vViewPosition = -mvPosition.xyz;", "    #ifdef USE_SHADOWMAP", "        for( int i = 0; i < MAX_SHADOWS; i ++ ) {", "           vShadowCoord[ i ] = shadowMatrix[ i ] * worldPosition;", "      }", "   #endif", "}"].join("\n")
            },
            cube: {
                uniforms: {
                    tCube: {
                        type: "t",
                        value: null
                    },
                    tFlip: {
                        type: "f",
                        value: -1
                    }
                },
                vertexShader: ["varying vec3 vWorldPosition;", n.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", "    vec4 worldPosition = modelMatrix * vec4( position, 1.0 );", "   vWorldPosition = worldPosition.xyz;", " gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", n.ShaderChunk.logdepthbuf_vertex, "}"].join("\n"),
                fragmentShader: ["uniform samplerCube tCube;", "uniform float tFlip;", "varying vec3 vWorldPosition;", n.ShaderChunk.logdepthbuf_pars_fragment, "void main() {", "  gl_FragColor = textureCube( tCube, vec3( tFlip * vWorldPosition.x, vWorldPosition.yz ) );", n.ShaderChunk.logdepthbuf_fragment, "}"].join("\n")
            },
            depthRGBA: {
                uniforms: {},
                vertexShader: [n.ShaderChunk.morphtarget_pars_vertex, n.ShaderChunk.skinning_pars_vertex, n.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", n.ShaderChunk.skinbase_vertex, n.ShaderChunk.morphtarget_vertex, n.ShaderChunk.skinning_vertex, n.ShaderChunk.default_vertex, n.ShaderChunk.logdepthbuf_vertex, "}"].join("\n"),
                fragmentShader: [n.ShaderChunk.logdepthbuf_pars_fragment, "vec4 pack_depth( const in float depth ) {", "    const vec4 bit_shift = vec4( 256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0, 1.0 );", "    const vec4 bit_mask = vec4( 0.0, 1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0 );", "   vec4 res = mod( depth * bit_shift * vec4( 255 ), vec4( 256 ) ) / vec4( 255 );", "   res -= res.xxyz * bit_mask;", " return res;", "}", "void main() {", n.ShaderChunk.logdepthbuf_fragment, "   #ifdef USE_LOGDEPTHBUF_EXT", "      gl_FragData[ 0 ] = pack_depth( gl_FragDepthEXT );", "   #else", "       gl_FragData[ 0 ] = pack_depth( gl_FragCoord.z );", "    #endif", "}"].join("\n")
            }
        }, n.WebGLRenderer = function(e) {
            function t() {
                Ve.clearColor(0, 0, 0, 1), Ve.clearDepth(1), Ve.clearStencil(0), Ve.enable(Ve.DEPTH_TEST), Ve.depthFunc(Ve.LEQUAL), Ve.frontFace(Ve.CCW), Ve.cullFace(Ve.BACK), Ve.enable(Ve.CULL_FACE), Ve.enable(Ve.BLEND), Ve.blendEquation(Ve.FUNC_ADD), Ve.blendFunc(Ve.SRC_ALPHA, Ve.ONE_MINUS_SRC_ALPHA), Ve.viewport(ot, at, st, ht), Ve.clearColor(Le.r, Le.g, Le.b, Pe)
            }

            function r(e) {
                e.__webglVertexBuffer = Ve.createBuffer(), e.__webglColorBuffer = Ve.createBuffer(), Oe.info.memory.geometries++
            }

            function o(e) {
                e.__webglVertexBuffer = Ve.createBuffer(), e.__webglColorBuffer = Ve.createBuffer(), e.__webglLineDistanceBuffer = Ve.createBuffer(), Oe.info.memory.geometries++
            }

            function a(e) {
                e.__webglVertexBuffer = Ve.createBuffer(), e.__webglNormalBuffer = Ve.createBuffer(), e.__webglTangentBuffer = Ve.createBuffer(), e.__webglColorBuffer = Ve.createBuffer(), e.__webglUVBuffer = Ve.createBuffer(), e.__webglUV2Buffer = Ve.createBuffer(), e.__webglSkinIndicesBuffer = Ve.createBuffer(), e.__webglSkinWeightsBuffer = Ve.createBuffer(), e.__webglFaceBuffer = Ve.createBuffer(), e.__webglLineBuffer = Ve.createBuffer();
                var t, r;
                if (e.numMorphTargets)
                    for (e.__webglMorphTargetsBuffers = [], t = 0, r = e.numMorphTargets; r > t; t++) e.__webglMorphTargetsBuffers.push(Ve.createBuffer());
                if (e.numMorphNormals)
                    for (e.__webglMorphNormalsBuffers = [], t = 0, r = e.numMorphNormals; r > t; t++) e.__webglMorphNormalsBuffers.push(Ve.createBuffer());
                Oe.info.memory.geometries++
            }

            function s(e) {
                var t = e.geometry,
                    r = e.material,
                    i = t.vertices.length;
                if (r.attributes) {
                    void 0 === t.__webglCustomAttributesList && (t.__webglCustomAttributesList = []);
                    for (var n in r.attributes) {
                        var o = r.attributes[n];
                        if (!o.__webglInitialized || o.createUniqueBuffers) {
                            o.__webglInitialized = !0;
                            var a = 1;
                            "v2" === o.type ? a = 2 : "v3" === o.type ? a = 3 : "v4" === o.type ? a = 4 : "c" === o.type && (a = 3), o.size = a, o.array = new Float32Array(i * a), o.buffer = Ve.createBuffer(), o.buffer.belongsToAttribute = n, o.needsUpdate = !0
                        }
                        t.__webglCustomAttributesList.push(o)
                    }
                }
            }

            function h(e, t) {
                var r = e.vertices.length;
                e.__vertexArray = new Float32Array(3 * r), e.__colorArray = new Float32Array(3 * r), e.__sortArray = [], e.__webglParticleCount = r, s(t)
            }

            function l(e, t) {
                var r = e.vertices.length;
                e.__vertexArray = new Float32Array(3 * r), e.__colorArray = new Float32Array(3 * r), e.__lineDistanceArray = new Float32Array(1 * r), e.__webglLineCount = r, s(t)
            }

            function u(e, t) {
                var r = t.geometry,
                    i = e.faces3,
                    n = 3 * i.length,
                    o = 1 * i.length,
                    a = 3 * i.length,
                    s = c(t, e);
                e.__vertexArray = new Float32Array(3 * n), e.__normalArray = new Float32Array(3 * n), e.__colorArray = new Float32Array(3 * n), e.__uvArray = new Float32Array(2 * n), r.faceVertexUvs.length > 1 && (e.__uv2Array = new Float32Array(2 * n)), r.hasTangents && (e.__tangentArray = new Float32Array(4 * n)), t.geometry.skinWeights.length && t.geometry.skinIndices.length && (e.__skinIndexArray = new Float32Array(4 * n), e.__skinWeightArray = new Float32Array(4 * n));
                var h = null !== _t.get("OES_element_index_uint") && o > 21845 ? Uint32Array : Uint16Array;
                e.__typeArray = h, e.__faceArray = new h(3 * o), e.__lineArray = new h(2 * a);
                var l, u;
                if (e.numMorphTargets)
                    for (e.__morphTargetsArrays = [],
                             l = 0, u = e.numMorphTargets; u > l; l++) e.__morphTargetsArrays.push(new Float32Array(3 * n));
                if (e.numMorphNormals)
                    for (e.__morphNormalsArrays = [], l = 0, u = e.numMorphNormals; u > l; l++) e.__morphNormalsArrays.push(new Float32Array(3 * n));
                if (e.__webglFaceCount = 3 * o, e.__webglLineCount = 2 * a, s.attributes) {
                    void 0 === e.__webglCustomAttributesList && (e.__webglCustomAttributesList = []);
                    for (var f in s.attributes) {
                        var p = s.attributes[f],
                            d = {};
                        for (var m in p) d[m] = p[m];
                        if (!d.__webglInitialized || d.createUniqueBuffers) {
                            d.__webglInitialized = !0;
                            var v = 1;
                            "v2" === d.type ? v = 2 : "v3" === d.type ? v = 3 : "v4" === d.type ? v = 4 : "c" === d.type && (v = 3), d.size = v, d.array = new Float32Array(n * v), d.buffer = Ve.createBuffer(), d.buffer.belongsToAttribute = f, p.needsUpdate = !0, d.__original = p
                        }
                        e.__webglCustomAttributesList.push(d)
                    }
                }
                e.__inittedArrays = !0
            }

            function c(e, t) {
                return e.material instanceof n.MeshFaceMaterial ? e.material.materials[t.materialIndex] : e.material
            }

            function f(e) {
                return e && void 0 !== e.shading && e.shading === n.SmoothShading
            }

            function p(e, t, r) {
                var i, n, o, a, s, h, l, u, c, f, p, d, m = e.vertices,
                    v = m.length,
                    g = e.colors,
                    y = g.length,
                    x = e.__vertexArray,
                    w = e.__colorArray,
                    b = e.__sortArray,
                    _ = e.verticesNeedUpdate,
                    M = (e.elementsNeedUpdate, e.colorsNeedUpdate),
                    T = e.__webglCustomAttributesList;
                if (r.sortParticles) {
                    for (mt.copy(dt), mt.multiply(r.matrixWorld), i = 0; v > i; i++) o = m[i], vt.copy(o), vt.applyProjection(mt), b[i] = [vt.z, i];
                    for (b.sort(S), i = 0; v > i; i++) o = m[b[i][1]], a = 3 * i, x[a] = o.x, x[a + 1] = o.y, x[a + 2] = o.z;
                    for (n = 0; y > n; n++) a = 3 * n, h = g[b[n][1]], w[a] = h.r, w[a + 1] = h.g, w[a + 2] = h.b;
                    if (T)
                        for (l = 0, u = T.length; u > l; l++)
                            if (d = T[l], void 0 === d.boundTo || "vertices" === d.boundTo)
                                if (a = 0, f = d.value.length, 1 === d.size)
                                    for (c = 0; f > c; c++) s = b[c][1], d.array[c] = d.value[s];
                                else if (2 === d.size)
                                    for (c = 0; f > c; c++) s = b[c][1], p = d.value[s], d.array[a] = p.x, d.array[a + 1] = p.y, a += 2;
                                else if (3 === d.size)
                                    if ("c" === d.type)
                                        for (c = 0; f > c; c++) s = b[c][1], p = d.value[s], d.array[a] = p.r, d.array[a + 1] = p.g, d.array[a + 2] = p.b, a += 3;
                                    else
                                        for (c = 0; f > c; c++) s = b[c][1], p = d.value[s], d.array[a] = p.x, d.array[a + 1] = p.y, d.array[a + 2] = p.z, a += 3;
                                else if (4 === d.size)
                                    for (c = 0; f > c; c++) s = b[c][1], p = d.value[s], d.array[a] = p.x, d.array[a + 1] = p.y, d.array[a + 2] = p.z, d.array[a + 3] = p.w, a += 4
                } else {
                    if (_)
                        for (i = 0; v > i; i++) o = m[i], a = 3 * i, x[a] = o.x, x[a + 1] = o.y, x[a + 2] = o.z;
                    if (M)
                        for (n = 0; y > n; n++) h = g[n], a = 3 * n, w[a] = h.r, w[a + 1] = h.g, w[a + 2] = h.b;
                    if (T)
                        for (l = 0, u = T.length; u > l; l++)
                            if (d = T[l], d.needsUpdate && (void 0 === d.boundTo || "vertices" === d.boundTo))
                                if (f = d.value.length, a = 0, 1 === d.size)
                                    for (c = 0; f > c; c++) d.array[c] = d.value[c];
                                else if (2 === d.size)
                                    for (c = 0; f > c; c++) p = d.value[c], d.array[a] = p.x, d.array[a + 1] = p.y, a += 2;
                                else if (3 === d.size)
                                    if ("c" === d.type)
                                        for (c = 0; f > c; c++) p = d.value[c], d.array[a] = p.r, d.array[a + 1] = p.g, d.array[a + 2] = p.b, a += 3;
                                    else
                                        for (c = 0; f > c; c++) p = d.value[c], d.array[a] = p.x, d.array[a + 1] = p.y, d.array[a + 2] = p.z, a += 3;
                                else if (4 === d.size)
                                    for (c = 0; f > c; c++) p = d.value[c], d.array[a] = p.x, d.array[a + 1] = p.y, d.array[a + 2] = p.z, d.array[a + 3] = p.w, a += 4
                }
                if ((_ || r.sortParticles) && (Ve.bindBuffer(Ve.ARRAY_BUFFER, e.__webglVertexBuffer), Ve.bufferData(Ve.ARRAY_BUFFER, x, t)), (M || r.sortParticles) && (Ve.bindBuffer(Ve.ARRAY_BUFFER, e.__webglColorBuffer), Ve.bufferData(Ve.ARRAY_BUFFER, w, t)), T)
                    for (l = 0, u = T.length; u > l; l++) d = T[l], (d.needsUpdate || r.sortParticles) && (Ve.bindBuffer(Ve.ARRAY_BUFFER, d.buffer), Ve.bufferData(Ve.ARRAY_BUFFER, d.array, t))
            }

            function d(e, t) {
                var r, i, n, o, a, s, h, l, u, c, f, p, d = e.vertices,
                    m = e.colors,
                    v = e.lineDistances,
                    g = d.length,
                    y = m.length,
                    x = v.length,
                    w = e.__vertexArray,
                    b = e.__colorArray,
                    _ = e.__lineDistanceArray,
                    M = e.verticesNeedUpdate,
                    S = e.colorsNeedUpdate,
                    T = e.lineDistancesNeedUpdate,
                    A = e.__webglCustomAttributesList;
                if (M) {
                    for (r = 0; g > r; r++) o = d[r], a = 3 * r, w[a] = o.x, w[a + 1] = o.y, w[a + 2] = o.z;
                    Ve.bindBuffer(Ve.ARRAY_BUFFER, e.__webglVertexBuffer), Ve.bufferData(Ve.ARRAY_BUFFER, w, t)
                }
                if (S) {
                    for (i = 0; y > i; i++) s = m[i], a = 3 * i, b[a] = s.r, b[a + 1] = s.g, b[a + 2] = s.b;
                    Ve.bindBuffer(Ve.ARRAY_BUFFER, e.__webglColorBuffer), Ve.bufferData(Ve.ARRAY_BUFFER, b, t)
                }
                if (T) {
                    for (n = 0; x > n; n++) _[n] = v[n];
                    Ve.bindBuffer(Ve.ARRAY_BUFFER, e.__webglLineDistanceBuffer), Ve.bufferData(Ve.ARRAY_BUFFER, _, t)
                }
                if (A)
                    for (h = 0, l = A.length; l > h; h++)
                        if (p = A[h], p.needsUpdate && (void 0 === p.boundTo || "vertices" === p.boundTo)) {
                            if (a = 0, c = p.value.length, 1 === p.size)
                                for (u = 0; c > u; u++) p.array[u] = p.value[u];
                            else if (2 === p.size)
                                for (u = 0; c > u; u++) f = p.value[u], p.array[a] = f.x, p.array[a + 1] = f.y, a += 2;
                            else if (3 === p.size)
                                if ("c" === p.type)
                                    for (u = 0; c > u; u++) f = p.value[u], p.array[a] = f.r, p.array[a + 1] = f.g, p.array[a + 2] = f.b, a += 3;
                                else
                                    for (u = 0; c > u; u++) f = p.value[u], p.array[a] = f.x, p.array[a + 1] = f.y, p.array[a + 2] = f.z, a += 3;
                            else if (4 === p.size)
                                for (u = 0; c > u; u++) f = p.value[u], p.array[a] = f.x, p.array[a + 1] = f.y, p.array[a + 2] = f.z, p.array[a + 3] = f.w, a += 4;
                            Ve.bindBuffer(Ve.ARRAY_BUFFER, p.buffer), Ve.bufferData(Ve.ARRAY_BUFFER, p.array, t)
                        }
            }

            function m(e, t, r, i, o) {
                if (e.__inittedArrays) {
                    var a, s, h, l, u, c, p, d, m, v, g, y, x, w, b, _, M, S, T, A, E, C, L, P, R, D, F, U, B, k, z, V, O, N, I, G, H, W, j, X, q, Y, K = f(o),
                        Z = 0,
                        Q = 0,
                        J = 0,
                        $ = 0,
                        ee = 0,
                        te = 0,
                        re = 0,
                        ie = 0,
                        ne = 0,
                        oe = 0,
                        ae = 0,
                        se = 0,
                        he = 0,
                        le = e.__vertexArray,
                        ue = e.__uvArray,
                        ce = e.__uv2Array,
                        fe = e.__normalArray,
                        pe = e.__tangentArray,
                        de = e.__colorArray,
                        me = e.__skinIndexArray,
                        ve = e.__skinWeightArray,
                        ge = e.__morphTargetsArrays,
                        ye = e.__morphNormalsArrays,
                        xe = e.__webglCustomAttributesList,
                        we = e.__faceArray,
                        be = e.__lineArray,
                        _e = t.geometry,
                        Me = _e.verticesNeedUpdate,
                        Se = _e.elementsNeedUpdate,
                        Te = _e.uvsNeedUpdate,
                        Ae = _e.normalsNeedUpdate,
                        Ee = _e.tangentsNeedUpdate,
                        Ce = _e.colorsNeedUpdate,
                        Le = _e.morphTargetsNeedUpdate,
                        Pe = _e.vertices,
                        Re = e.faces3,
                        De = _e.faces,
                        Fe = _e.faceVertexUvs[0],
                        Ue = _e.faceVertexUvs[1],
                        Be = (_e.colors, _e.skinIndices),
                        ke = _e.skinWeights,
                        ze = _e.morphTargets,
                        Oe = _e.morphNormals;
                    if (Me) {
                        for (a = 0, s = Re.length; s > a; a++) l = De[Re[a]], y = Pe[l.a], x = Pe[l.b], w = Pe[l.c], le[Q] = y.x, le[Q + 1] = y.y, le[Q + 2] = y.z, le[Q + 3] = x.x, le[Q + 4] = x.y, le[Q + 5] = x.z, le[Q + 6] = w.x, le[Q + 7] = w.y, le[Q + 8] = w.z, Q += 9;
                        Ve.bindBuffer(Ve.ARRAY_BUFFER, e.__webglVertexBuffer), Ve.bufferData(Ve.ARRAY_BUFFER, le, r)
                    }
                    if (Le)
                        for (I = 0, G = ze.length; G > I; I++) {
                            for (ae = 0, a = 0, s = Re.length; s > a; a++) j = Re[a], l = De[j], y = ze[I].vertices[l.a], x = ze[I].vertices[l.b], w = ze[I].vertices[l.c], H = ge[I], H[ae] = y.x, H[ae + 1] = y.y, H[ae + 2] = y.z, H[ae + 3] = x.x, H[ae + 4] = x.y, H[ae + 5] = x.z, H[ae + 6] = w.x, H[ae + 7] = w.y, H[ae + 8] = w.z, o.morphNormals && (K ? (X = Oe[I].vertexNormals[j], S = X.a, T = X.b, A = X.c) : (S = Oe[I].faceNormals[j], T = S, A = S), W = ye[I], W[ae] = S.x, W[ae + 1] = S.y, W[ae + 2] = S.z, W[ae + 3] = T.x, W[ae + 4] = T.y, W[ae + 5] = T.z, W[ae + 6] = A.x, W[ae + 7] = A.y, W[ae + 8] = A.z), ae += 9;
                            Ve.bindBuffer(Ve.ARRAY_BUFFER, e.__webglMorphTargetsBuffers[I]), Ve.bufferData(Ve.ARRAY_BUFFER, ge[I], r), o.morphNormals && (Ve.bindBuffer(Ve.ARRAY_BUFFER, e.__webglMorphNormalsBuffers[I]), Ve.bufferData(Ve.ARRAY_BUFFER, ye[I], r))
                        }
                    if (ke.length) {
                        for (a = 0, s = Re.length; s > a; a++) l = De[Re[a]], P = ke[l.a], R = ke[l.b], D = ke[l.c], ve[oe] = P.x, ve[oe + 1] = P.y, ve[oe + 2] = P.z, ve[oe + 3] = P.w, ve[oe + 4] = R.x, ve[oe + 5] = R.y, ve[oe + 6] = R.z, ve[oe + 7] = R.w, ve[oe + 8] = D.x, ve[oe + 9] = D.y, ve[oe + 10] = D.z, ve[oe + 11] = D.w, F = Be[l.a], U = Be[l.b], B = Be[l.c], me[oe] = F.x, me[oe + 1] = F.y, me[oe + 2] = F.z, me[oe + 3] = F.w, me[oe + 4] = U.x, me[oe + 5] = U.y, me[oe + 6] = U.z, me[oe + 7] = U.w, me[oe + 8] = B.x, me[oe + 9] = B.y, me[oe + 10] = B.z, me[oe + 11] = B.w, oe += 12;
                        oe > 0 && (Ve.bindBuffer(Ve.ARRAY_BUFFER, e.__webglSkinIndicesBuffer), Ve.bufferData(Ve.ARRAY_BUFFER, me, r), Ve.bindBuffer(Ve.ARRAY_BUFFER, e.__webglSkinWeightsBuffer), Ve.bufferData(Ve.ARRAY_BUFFER, ve, r))
                    }
                    if (Ce) {
                        for (a = 0, s = Re.length; s > a; a++) l = De[Re[a]], p = l.vertexColors, d = l.color, 3 === p.length && o.vertexColors === n.VertexColors ? (E = p[0], C = p[1], L = p[2]) : (E = d, C = d, L = d), de[ne] = E.r, de[ne + 1] = E.g, de[ne + 2] = E.b, de[ne + 3] = C.r, de[ne + 4] = C.g, de[ne + 5] = C.b, de[ne + 6] = L.r, de[ne + 7] = L.g, de[ne + 8] = L.b, ne += 9;
                        ne > 0 && (Ve.bindBuffer(Ve.ARRAY_BUFFER, e.__webglColorBuffer), Ve.bufferData(Ve.ARRAY_BUFFER, de, r))
                    }
                    if (Ee && _e.hasTangents) {
                        for (a = 0, s = Re.length; s > a; a++) l = De[Re[a]], m = l.vertexTangents, b = m[0], _ = m[1], M = m[2], pe[re] = b.x, pe[re + 1] = b.y, pe[re + 2] = b.z, pe[re + 3] = b.w, pe[re + 4] = _.x, pe[re + 5] = _.y, pe[re + 6] = _.z, pe[re + 7] = _.w, pe[re + 8] = M.x, pe[re + 9] = M.y, pe[re + 10] = M.z, pe[re + 11] = M.w, re += 12;
                        Ve.bindBuffer(Ve.ARRAY_BUFFER, e.__webglTangentBuffer), Ve.bufferData(Ve.ARRAY_BUFFER, pe, r)
                    }
                    if (Ae) {
                        for (a = 0, s = Re.length; s > a; a++)
                            if (l = De[Re[a]], u = l.vertexNormals, c = l.normal, 3 === u.length && K)
                                for (k = 0; 3 > k; k++) V = u[k], fe[te] = V.x, fe[te + 1] = V.y, fe[te + 2] = V.z, te += 3;
                            else
                                for (k = 0; 3 > k; k++) fe[te] = c.x, fe[te + 1] = c.y, fe[te + 2] = c.z, te += 3;
                        Ve.bindBuffer(Ve.ARRAY_BUFFER, e.__webglNormalBuffer), Ve.bufferData(Ve.ARRAY_BUFFER, fe, r)
                    }
                    if (Te && Fe) {
                        for (a = 0, s = Re.length; s > a; a++)
                            if (h = Re[a], v = Fe[h], void 0 !== v)
                                for (k = 0; 3 > k; k++) O = v[k], ue[J] = O.x, ue[J + 1] = O.y, J += 2;
                        J > 0 && (Ve.bindBuffer(Ve.ARRAY_BUFFER, e.__webglUVBuffer), Ve.bufferData(Ve.ARRAY_BUFFER, ue, r))
                    }
                    if (Te && Ue) {
                        for (a = 0, s = Re.length; s > a; a++)
                            if (h = Re[a], g = Ue[h], void 0 !== g)
                                for (k = 0; 3 > k; k++) N = g[k], ce[$] = N.x, ce[$ + 1] = N.y, $ += 2;
                        $ > 0 && (Ve.bindBuffer(Ve.ARRAY_BUFFER, e.__webglUV2Buffer), Ve.bufferData(Ve.ARRAY_BUFFER, ce, r))
                    }
                    if (Se) {
                        for (a = 0, s = Re.length; s > a; a++) we[ee] = Z, we[ee + 1] = Z + 1, we[ee + 2] = Z + 2, ee += 3, be[ie] = Z, be[ie + 1] = Z + 1, be[ie + 2] = Z, be[ie + 3] = Z + 2, be[ie + 4] = Z + 1, be[ie + 5] = Z + 2, ie += 6, Z += 3;
                        Ve.bindBuffer(Ve.ELEMENT_ARRAY_BUFFER, e.__webglFaceBuffer), Ve.bufferData(Ve.ELEMENT_ARRAY_BUFFER, we, r), Ve.bindBuffer(Ve.ELEMENT_ARRAY_BUFFER, e.__webglLineBuffer), Ve.bufferData(Ve.ELEMENT_ARRAY_BUFFER, be, r)
                    }
                    if (xe)
                        for (k = 0, z = xe.length; z > k; k++)
                            if (Y = xe[k], Y.__original.needsUpdate) {
                                if (se = 0, he = 0, 1 === Y.size) {
                                    if (void 0 === Y.boundTo || "vertices" === Y.boundTo)
                                        for (a = 0, s = Re.length; s > a; a++) l = De[Re[a]], Y.array[se] = Y.value[l.a], Y.array[se + 1] = Y.value[l.b], Y.array[se + 2] = Y.value[l.c], se += 3;
                                    else if ("faces" === Y.boundTo)
                                        for (a = 0, s = Re.length; s > a; a++) q = Y.value[Re[a]], Y.array[se] = q, Y.array[se + 1] = q, Y.array[se + 2] = q, se += 3
                                } else if (2 === Y.size) {
                                    if (void 0 === Y.boundTo || "vertices" === Y.boundTo)
                                        for (a = 0, s = Re.length; s > a; a++) l = De[Re[a]], y = Y.value[l.a], x = Y.value[l.b], w = Y.value[l.c], Y.array[se] = y.x, Y.array[se + 1] = y.y, Y.array[se + 2] = x.x, Y.array[se + 3] = x.y, Y.array[se + 4] = w.x, Y.array[se + 5] = w.y, se += 6;
                                    else if ("faces" === Y.boundTo)
                                        for (a = 0, s = Re.length; s > a; a++) q = Y.value[Re[a]], y = q, x = q, w = q, Y.array[se] = y.x, Y.array[se + 1] = y.y, Y.array[se + 2] = x.x, Y.array[se + 3] = x.y, Y.array[se + 4] = w.x, Y.array[se + 5] = w.y, se += 6
                                } else if (3 === Y.size) {
                                    var Ne;
                                    if (Ne = "c" === Y.type ? ["r", "g", "b"] : ["x", "y", "z"], void 0 === Y.boundTo || "vertices" === Y.boundTo)
                                        for (a = 0, s = Re.length; s > a; a++) l = De[Re[a]], y = Y.value[l.a], x = Y.value[l.b], w = Y.value[l.c], Y.array[se] = y[Ne[0]], Y.array[se + 1] = y[Ne[1]], Y.array[se + 2] = y[Ne[2]], Y.array[se + 3] = x[Ne[0]], Y.array[se + 4] = x[Ne[1]], Y.array[se + 5] = x[Ne[2]], Y.array[se + 6] = w[Ne[0]], Y.array[se + 7] = w[Ne[1]], Y.array[se + 8] = w[Ne[2]], se += 9;
                                    else if ("faces" === Y.boundTo)
                                        for (a = 0, s = Re.length; s > a; a++) q = Y.value[Re[a]], y = q, x = q, w = q, Y.array[se] = y[Ne[0]], Y.array[se + 1] = y[Ne[1]], Y.array[se + 2] = y[Ne[2]], Y.array[se + 3] = x[Ne[0]], Y.array[se + 4] = x[Ne[1]], Y.array[se + 5] = x[Ne[2]], Y.array[se + 6] = w[Ne[0]], Y.array[se + 7] = w[Ne[1]], Y.array[se + 8] = w[Ne[2]], se += 9;
                                    else if ("faceVertices" === Y.boundTo)
                                        for (a = 0, s = Re.length; s > a; a++) q = Y.value[Re[a]], y = q[0], x = q[1], w = q[2], Y.array[se] = y[Ne[0]], Y.array[se + 1] = y[Ne[1]], Y.array[se + 2] = y[Ne[2]], Y.array[se + 3] = x[Ne[0]], Y.array[se + 4] = x[Ne[1]], Y.array[se + 5] = x[Ne[2]], Y.array[se + 6] = w[Ne[0]], Y.array[se + 7] = w[Ne[1]], Y.array[se + 8] = w[Ne[2]], se += 9
                                } else if (4 === Y.size)
                                    if (void 0 === Y.boundTo || "vertices" === Y.boundTo)
                                        for (a = 0, s = Re.length; s > a; a++) l = De[Re[a]], y = Y.value[l.a], x = Y.value[l.b], w = Y.value[l.c], Y.array[se] = y.x, Y.array[se + 1] = y.y, Y.array[se + 2] = y.z, Y.array[se + 3] = y.w, Y.array[se + 4] = x.x, Y.array[se + 5] = x.y, Y.array[se + 6] = x.z, Y.array[se + 7] = x.w, Y.array[se + 8] = w.x, Y.array[se + 9] = w.y, Y.array[se + 10] = w.z, Y.array[se + 11] = w.w, se += 12;
                                    else if ("faces" === Y.boundTo)
                                        for (a = 0, s = Re.length; s > a; a++) q = Y.value[Re[a]], y = q, x = q, w = q, Y.array[se] = y.x, Y.array[se + 1] = y.y, Y.array[se + 2] = y.z, Y.array[se + 3] = y.w, Y.array[se + 4] = x.x, Y.array[se + 5] = x.y, Y.array[se + 6] = x.z, Y.array[se + 7] = x.w, Y.array[se + 8] = w.x, Y.array[se + 9] = w.y, Y.array[se + 10] = w.z, Y.array[se + 11] = w.w, se += 12;
                                    else if ("faceVertices" === Y.boundTo)
                                        for (a = 0, s = Re.length; s > a; a++) q = Y.value[Re[a]], y = q[0], x = q[1], w = q[2], Y.array[se] = y.x, Y.array[se + 1] = y.y, Y.array[se + 2] = y.z, Y.array[se + 3] = y.w, Y.array[se + 4] = x.x, Y.array[se + 5] = x.y, Y.array[se + 6] = x.z, Y.array[se + 7] = x.w, Y.array[se + 8] = w.x, Y.array[se + 9] = w.y, Y.array[se + 10] = w.z, Y.array[se + 11] = w.w, se += 12;
                                Ve.bindBuffer(Ve.ARRAY_BUFFER, Y.buffer), Ve.bufferData(Ve.ARRAY_BUFFER, Y.array, r)
                            }
                    i && (delete e.__inittedArrays, delete e.__colorArray, delete e.__normalArray, delete e.__tangentArray, delete e.__uvArray, delete e.__uv2Array, delete e.__faceArray, delete e.__vertexArray, delete e.__lineArray, delete e.__skinIndexArray, delete e.__skinWeightArray)
                }
            }

            function v(e) {
                for (var t = e.attributes, r = e.attributesKeys, i = 0, n = r.length; n > i; i++) {
                    var o = r[i],
                        a = t[o];
                    if (void 0 === a.buffer && (a.buffer = Ve.createBuffer(), a.needsUpdate = !0), a.needsUpdate === !0) {
                        var s = "index" === o ? Ve.ELEMENT_ARRAY_BUFFER : Ve.ARRAY_BUFFER;
                        Ve.bindBuffer(s, a.buffer), Ve.bufferData(s, a.array, Ve.STATIC_DRAW), a.needsUpdate = !1
                    }
                }
            }

            function g(e, t, r, i) {
                for (var n = r.attributes, o = t.attributes, a = t.attributesKeys, s = 0, h = a.length; h > s; s++) {
                    var l = a[s],
                        u = o[l];
                    if (u >= 0) {
                        var c = n[l];
                        if (void 0 !== c) {
                            var f = c.itemSize;
                            Ve.bindBuffer(Ve.ARRAY_BUFFER, c.buffer), x(u), Ve.vertexAttribPointer(u, f, Ve.FLOAT, !1, 0, i * f * 4)
                        } else void 0 !== e.defaultAttributeValues && (2 === e.defaultAttributeValues[l].length ? Ve.vertexAttrib2fv(u, e.defaultAttributeValues[l]) : 3 === e.defaultAttributeValues[l].length && Ve.vertexAttrib3fv(u, e.defaultAttributeValues[l]))
                    }
                }
                w()
            }

            function y() {
                for (var e = 0, t = ct.length; t > e; e++) ct[e] = 0
            }

            function x(e) {
                ct[e] = 1, 0 === ft[e] && (Ve.enableVertexAttribArray(e), ft[e] = 1)
            }

            function w() {
                for (var e = 0, t = ft.length; t > e; e++) ft[e] !== ct[e] && (Ve.disableVertexAttribArray(e), ft[e] = 0)
            }

            function b(e, t, r) {
                var i = e.program.attributes;
                if (-1 !== r.morphTargetBase && i.position >= 0 ? (Ve.bindBuffer(Ve.ARRAY_BUFFER, t.__webglMorphTargetsBuffers[r.morphTargetBase]), x(i.position), Ve.vertexAttribPointer(i.position, 3, Ve.FLOAT, !1, 0, 0)) : i.position >= 0 && (Ve.bindBuffer(Ve.ARRAY_BUFFER, t.__webglVertexBuffer), x(i.position), Ve.vertexAttribPointer(i.position, 3, Ve.FLOAT, !1, 0, 0)), r.morphTargetForcedOrder.length)
                    for (var n = 0, o = r.morphTargetForcedOrder, a = r.morphTargetInfluences; n < e.numSupportedMorphTargets && n < o.length;) i["morphTarget" + n] >= 0 && (Ve.bindBuffer(Ve.ARRAY_BUFFER, t.__webglMorphTargetsBuffers[o[n]]), x(i["morphTarget" + n]), Ve.vertexAttribPointer(i["morphTarget" + n], 3, Ve.FLOAT, !1, 0, 0)), i["morphNormal" + n] >= 0 && e.morphNormals && (Ve.bindBuffer(Ve.ARRAY_BUFFER, t.__webglMorphNormalsBuffers[o[n]]), x(i["morphNormal" + n]), Ve.vertexAttribPointer(i["morphNormal" + n], 3, Ve.FLOAT, !1, 0, 0)), r.__webglMorphTargetInfluences[n] = a[o[n]], n++;
                else {
                    var s, h, l = [],
                        a = r.morphTargetInfluences,
                        u = a.length;
                    for (h = 0; u > h; h++) s = a[h], s > 0 && l.push([s, h]);
                    l.length > e.numSupportedMorphTargets ? (l.sort(S), l.length = e.numSupportedMorphTargets) : l.length > e.numSupportedMorphNormals ? l.sort(S) : 0 === l.length && l.push([0, 0]);
                    for (var c, n = 0; n < e.numSupportedMorphTargets;) l[n] ? (c = l[n][1], i["morphTarget" + n] >= 0 && (Ve.bindBuffer(Ve.ARRAY_BUFFER, t.__webglMorphTargetsBuffers[c]), x(i["morphTarget" + n]), Ve.vertexAttribPointer(i["morphTarget" + n], 3, Ve.FLOAT, !1, 0, 0)), i["morphNormal" + n] >= 0 && e.morphNormals && (Ve.bindBuffer(Ve.ARRAY_BUFFER, t.__webglMorphNormalsBuffers[c]), x(i["morphNormal" + n]), Ve.vertexAttribPointer(i["morphNormal" + n], 3, Ve.FLOAT, !1, 0, 0)), r.__webglMorphTargetInfluences[n] = a[c]) : r.__webglMorphTargetInfluences[n] = 0, n++
                }
                null !== e.program.uniforms.morphTargetInfluences && Ve.uniform1fv(e.program.uniforms.morphTargetInfluences, r.__webglMorphTargetInfluences)
            }

            function _(e, t) {
                return e.material.id !== t.material.id ? t.material.id - e.material.id : e.z !== t.z ? t.z - e.z : e.id - t.id
            }

            function M(e, t) {
                return e.z !== t.z ? e.z - t.z : e.id - t.id
            }

            function S(e, t) {
                return t[0] - e[0]
            }

            function T(e, t) {
                if (t.visible !== !1) {
                    if (t instanceof n.Scene || t instanceof n.Group);
                    else if (P(t, e), t instanceof n.Light) Re.push(t);
                    else if (t instanceof n.Sprite) ke.push(t);
                    else if (t instanceof n.LensFlare) ze.push(t);
                    else {
                        var r = De[t.id];
                        if (r && (t.frustumCulled === !1 || pt.intersectsObject(t) === !0)) {
                            B(t, e);
                            for (var i = 0, o = r.length; o > i; i++) {
                                var a = r[i];
                                L(a), a.render = !0, Oe.sortObjects === !0 && (null !== t.renderDepth ? a.z = t.renderDepth : (vt.setFromMatrixPosition(t.matrixWorld), vt.applyProjection(dt), a.z = vt.z))
                            }
                        }
                    }
                    for (var i = 0, o = t.children.length; o > i; i++) T(e, t.children[i])
                }
            }

            function A(e, t, r, i, o, a) {
                for (var s, h = e.length - 1; - 1 !== h; h--) {
                    var l = e[h],
                        u = l.object,
                        c = l.buffer;
                    if (te(u, t), a) s = a;
                    else {
                        if (s = l.material, !s) continue;
                        o && Oe.setBlending(s.blending, s.blendEquation, s.blendSrc, s.blendDst), Oe.setDepthTest(s.depthTest), Oe.setDepthWrite(s.depthWrite), ae(s.polygonOffset, s.polygonOffsetFactor, s.polygonOffsetUnits)
                    }
                    Oe.setMaterialFaces(s), c instanceof n.BufferGeometry ? Oe.renderBufferDirect(t, r, i, s, c, u) : Oe.renderBuffer(t, r, i, s, c, u)
                }
            }

            function E(e, t, r, i, n, o, a) {
                for (var s, h = 0, l = e.length; l > h; h++) {
                    var u = e[h],
                        c = u.object;
                    if (c.visible) {
                        if (a) s = a;
                        else {
                            if (s = u[t], !s) continue;
                            o && Oe.setBlending(s.blending, s.blendEquation, s.blendSrc, s.blendDst), Oe.setDepthTest(s.depthTest), Oe.setDepthWrite(s.depthWrite), ae(s.polygonOffset, s.polygonOffsetFactor, s.polygonOffsetUnits)
                        }
                        Oe.renderImmediateObject(r, i, n, s, c)
                    }
                }
            }

            function C(e) {
                var t = e.object,
                    r = t.material;
                r.transparent ? (e.transparent = r, e.opaque = null) : (e.opaque = r, e.transparent = null)
            }

            function L(e) {
                var t = e.object,
                    r = e.buffer,
                    i = t.geometry,
                    o = t.material;
                if (o instanceof n.MeshFaceMaterial) {
                    var a = i instanceof n.BufferGeometry ? 0 : r.materialIndex;
                    o = o.materials[a], e.material = o, o.transparent ? Be.push(e) : Ue.push(e)
                } else o && (e.material = o, o.transparent ? Be.push(e) : Ue.push(e))
            }

            function P(e, t) {
                void 0 === e.__webglInit && (e.__webglInit = !0, e._modelViewMatrix = new n.Matrix4, e._normalMatrix = new n.Matrix3, e.addEventListener("removed", Ot));
                var i = e.geometry;
                if (void 0 === i || void 0 === i.__webglInit && (i.__webglInit = !0, i.addEventListener("dispose", Nt), i instanceof n.BufferGeometry || (e instanceof n.Mesh ? D(t, e, i) : e instanceof n.Line ? void 0 === i.__webglVertexBuffer && (o(i), l(i, e), i.verticesNeedUpdate = !0, i.colorsNeedUpdate = !0, i.lineDistancesNeedUpdate = !0) : e instanceof n.PointCloud && void 0 === i.__webglVertexBuffer && (r(i), h(i, e), i.verticesNeedUpdate = !0, i.colorsNeedUpdate = !0))), void 0 === e.__webglActive)
                    if (e.__webglActive = !0, e instanceof n.Mesh) {
                        if (i instanceof n.BufferGeometry) F(De, i, e);
                        else if (i instanceof n.Geometry)
                            for (var a = Kt[i.id], s = 0, u = a.length; u > s; s++) F(De, a[s], e)
                    } else e instanceof n.Line || e instanceof n.PointCloud ? F(De, i, e) : (e instanceof n.ImmediateRenderObject || e.immediateRenderCallback) && U(Fe, e)
            }

            function R(e, t) {
                for (var r, i, n = _t.get("OES_element_index_uint") ? 4294967296 : 65535, o = {}, a = e.morphTargets.length, s = e.morphNormals.length, h = {}, l = [], u = 0, c = e.faces.length; c > u; u++) {
                    var f = e.faces[u],
                        p = t ? f.materialIndex : 0;
                    p in o || (o[p] = {
                        hash: p,
                        counter: 0
                    }), r = o[p].hash + "_" + o[p].counter, r in h || (i = {
                        id: Zt++,
                        faces3: [],
                        materialIndex: p,
                        vertices: 0,
                        numMorphTargets: a,
                        numMorphNormals: s
                    }, h[r] = i, l.push(i)), h[r].vertices + 3 > n && (o[p].counter += 1, r = o[p].hash + "_" + o[p].counter, r in h || (i = {
                        id: Zt++,
                        faces3: [],
                        materialIndex: p,
                        vertices: 0,
                        numMorphTargets: a,
                        numMorphNormals: s
                    }, h[r] = i, l.push(i))), h[r].faces3.push(u), h[r].vertices += 3
                }
                return l
            }

            function D(e, t, r) {
                var i = t.material,
                    o = !1;
                (void 0 === Kt[r.id] || r.groupsNeedUpdate === !0) && (delete De[t.id], Kt[r.id] = R(r, i instanceof n.MeshFaceMaterial), r.groupsNeedUpdate = !1);
                for (var s = Kt[r.id], h = 0, l = s.length; l > h; h++) {
                    var c = s[h];
                    void 0 === c.__webglVertexBuffer ? (a(c), u(c, t), r.verticesNeedUpdate = !0, r.morphTargetsNeedUpdate = !0, r.elementsNeedUpdate = !0, r.uvsNeedUpdate = !0, r.normalsNeedUpdate = !0, r.tangentsNeedUpdate = !0, r.colorsNeedUpdate = !0, o = !0) : o = !1, (o || void 0 === t.__webglActive) && F(De, c, t)
                }
                t.__webglActive = !0
            }

            function F(e, t, r) {
                var i = r.id;
                e[i] = e[i] || [], e[i].push({
                    id: i,
                    buffer: t,
                    object: r,
                    material: null,
                    z: 0
                })
            }

            function U(e, t) {
                e.push({
                    id: null,
                    object: t,
                    opaque: null,
                    transparent: null,
                    z: 0
                })
            }

            function B(e, t) {
                var r, i, o = e.geometry;
                if (o instanceof n.BufferGeometry) v(o);
                else if (e instanceof n.Mesh) {
                    o.groupsNeedUpdate === !0 && D(t, e, o);
                    for (var a = Kt[o.id], s = 0, h = a.length; h > s; s++) {
                        var l = a[s];
                        i = c(e, l), o.groupsNeedUpdate === !0 && u(l, e), r = i.attributes && k(i), (o.verticesNeedUpdate || o.morphTargetsNeedUpdate || o.elementsNeedUpdate || o.uvsNeedUpdate || o.normalsNeedUpdate || o.colorsNeedUpdate || o.tangentsNeedUpdate || r) && m(l, e, Ve.DYNAMIC_DRAW, !o.dynamic, i)
                    }
                    o.verticesNeedUpdate = !1, o.morphTargetsNeedUpdate = !1, o.elementsNeedUpdate = !1, o.uvsNeedUpdate = !1, o.normalsNeedUpdate = !1, o.colorsNeedUpdate = !1, o.tangentsNeedUpdate = !1, i.attributes && z(i)
                } else e instanceof n.Line ? (i = c(e, o), r = i.attributes && k(i), (o.verticesNeedUpdate || o.colorsNeedUpdate || o.lineDistancesNeedUpdate || r) && d(o, Ve.DYNAMIC_DRAW), o.verticesNeedUpdate = !1, o.colorsNeedUpdate = !1, o.lineDistancesNeedUpdate = !1, i.attributes && z(i)) : e instanceof n.PointCloud && (i = c(e, o), r = i.attributes && k(i), (o.verticesNeedUpdate || o.colorsNeedUpdate || e.sortParticles || r) && p(o, Ve.DYNAMIC_DRAW, e), o.verticesNeedUpdate = !1, o.colorsNeedUpdate = !1, i.attributes && z(i))
            }

            function k(e) {
                for (var t in e.attributes)
                    if (e.attributes[t].needsUpdate) return !0;
                return !1
            }

            function z(e) {
                for (var t in e.attributes) e.attributes[t].needsUpdate = !1
            }

            function V(e) {
                e instanceof n.Mesh || e instanceof n.PointCloud || e instanceof n.Line ? delete De[e.id] : (e instanceof n.ImmediateRenderObject || e.immediateRenderCallback) && O(Fe, e), delete e.__webglInit, delete e._modelViewMatrix, delete e._normalMatrix, delete e.__webglActive
            }

            function O(e, t) {
                for (var r = e.length - 1; r >= 0; r--) e[r].object === t && e.splice(r, 1)
            }

            function N(e, t, r, i) {
                e.addEventListener("dispose", Ht);
                var o;
                if (e instanceof n.MeshDepthMaterial ? o = "depth" : e instanceof n.MeshNormalMaterial ? o = "normal" : e instanceof n.MeshBasicMaterial ? o = "basic" : e instanceof n.MeshLambertMaterial ? o = "lambert" : e instanceof n.MeshPhongMaterial ? o = "phong" : e instanceof n.LineBasicMaterial ? o = "basic" : e instanceof n.LineDashedMaterial ? o = "dashed" : e instanceof n.PointCloudMaterial && (o = "particle_basic"), o) {
                    var a = n.ShaderLib[o];
                    e.__webglShader = {
                        uniforms: n.UniformsUtils.clone(a.uniforms),
                        vertexShader: a.vertexShader,
                        fragmentShader: a.fragmentShader
                    }
                } else e.__webglShader = {
                    uniforms: e.uniforms,
                    vertexShader: e.vertexShader,
                    fragmentShader: e.fragmentShader
                };
                var s = ge(t),
                    h = ye(t),
                    l = ve(i),
                    u = {
                        precision: be,
                        supportsVertexTextures: Et,
                        map: !!e.map,
                        envMap: !!e.envMap,
                        lightMap: !!e.lightMap,
                        bumpMap: !!e.bumpMap,
                        normalMap: !!e.normalMap,
                        specularMap: !!e.specularMap,
                        alphaMap: !!e.alphaMap,
                        vertexColors: e.vertexColors,
                        fog: r,
                        useFog: e.fog,
                        fogExp: r instanceof n.FogExp2,
                        sizeAttenuation: e.sizeAttenuation,
                        logarithmicDepthBuffer: Ce,
                        skinning: e.skinning,
                        maxBones: l,
                        useVertexTexture: Ct && i && i.skeleton && i.skeleton.useVertexTexture,
                        morphTargets: e.morphTargets,
                        morphNormals: e.morphNormals,
                        maxMorphTargets: Oe.maxMorphTargets,
                        maxMorphNormals: Oe.maxMorphNormals,
                        maxDirLights: s.directional,
                        maxPointLights: s.point,
                        maxSpotLights: s.spot,
                        maxHemiLights: s.hemi,
                        maxShadows: h,
                        shadowMapEnabled: Oe.shadowMapEnabled && i.receiveShadow && h > 0,
                        shadowMapType: Oe.shadowMapType,
                        shadowMapDebug: Oe.shadowMapDebug,
                        shadowMapCascade: Oe.shadowMapCascade,
                        alphaTest: e.alphaTest,
                        metal: e.metal,
                        wrapAround: e.wrapAround,
                        doubleSided: e.side === n.DoubleSide,
                        flipSided: e.side === n.BackSide
                    },
                    c = [];
                if (o ? c.push(o) : (c.push(e.fragmentShader), c.push(e.vertexShader)), void 0 !== e.defines)
                    for (var f in e.defines) c.push(f), c.push(e.defines[f]);
                for (var f in u) c.push(f), c.push(u[f]);
                for (var p, d = c.join(), m = 0, v = Ne.length; v > m; m++) {
                    var g = Ne[m];
                    if (g.code === d) {
                        p = g, p.usedTimes++;
                        break
                    }
                }
                void 0 === p && (p = new n.WebGLProgram(Oe, d, e, u), Ne.push(p), Oe.info.memory.programs = Ne.length), e.program = p;
                var y = p.attributes;
                if (e.morphTargets) {
                    e.numSupportedMorphTargets = 0;
                    for (var x, w = "morphTarget", b = 0; b < Oe.maxMorphTargets; b++) x = w + b, y[x] >= 0 && e.numSupportedMorphTargets++
                }
                if (e.morphNormals) {
                    e.numSupportedMorphNormals = 0;
                    var x, w = "morphNormal";
                    for (b = 0; b < Oe.maxMorphNormals; b++) x = w + b, y[x] >= 0 && e.numSupportedMorphNormals++
                }
                e.uniformsList = [];
                for (var _ in e.__webglShader.uniforms) {
                    var M = e.program.uniforms[_];
                    M && e.uniformsList.push([e.__webglShader.uniforms[_], M])
                }
            }

            function I(e, t, r, i, o) {
                Xe = 0, i.needsUpdate && (i.program && Yt(i), N(i, t, r, o), i.needsUpdate = !1), i.morphTargets && (o.__webglMorphTargetInfluences || (o.__webglMorphTargetInfluences = new Float32Array(Oe.maxMorphTargets)));
                var a = !1,
                    s = !1,
                    h = !1,
                    l = i.program,
                    u = l.uniforms,
                    c = i.__webglShader.uniforms;
                if (l.id !== Ie && (Ve.useProgram(l.program), Ie = l.id, a = !0, s = !0, h = !0), i.id !== He && (-1 === He && (h = !0), He = i.id, s = !0), (a || e !== je) && (Ve.uniformMatrix4fv(u.projectionMatrix, !1, e.projectionMatrix.elements), Ce && Ve.uniform1f(u.logDepthBufFC, 2 / (Math.log(e.far + 1) / Math.LN2)), e !== je && (je = e), (i instanceof n.ShaderMaterial || i instanceof n.MeshPhongMaterial || i.envMap) && null !== u.cameraPosition && (vt.setFromMatrixPosition(e.matrixWorld), Ve.uniform3f(u.cameraPosition, vt.x, vt.y, vt.z)), (i instanceof n.MeshPhongMaterial || i instanceof n.MeshLambertMaterial || i instanceof n.ShaderMaterial || i.skinning) && null !== u.viewMatrix && Ve.uniformMatrix4fv(u.viewMatrix, !1, e.matrixWorldInverse.elements)), i.skinning)
                    if (o.bindMatrix && null !== u.bindMatrix && Ve.uniformMatrix4fv(u.bindMatrix, !1, o.bindMatrix.elements), o.bindMatrixInverse && null !== u.bindMatrixInverse && Ve.uniformMatrix4fv(u.bindMatrixInverse, !1, o.bindMatrixInverse.elements), Ct && o.skeleton && o.skeleton.useVertexTexture) {
                        if (null !== u.boneTexture) {
                            var f = $();
                            Ve.uniform1i(u.boneTexture, f), Oe.setTexture(o.skeleton.boneTexture, f)
                        }
                        null !== u.boneTextureWidth && Ve.uniform1i(u.boneTextureWidth, o.skeleton.boneTextureWidth), null !== u.boneTextureHeight && Ve.uniform1i(u.boneTextureHeight, o.skeleton.boneTextureHeight)
                    } else o.skeleton && o.skeleton.boneMatrices && null !== u.boneGlobalMatrices && Ve.uniformMatrix4fv(u.boneGlobalMatrices, !1, o.skeleton.boneMatrices);
                return s && (r && i.fog && X(c, r), (i instanceof n.MeshPhongMaterial || i instanceof n.MeshLambertMaterial || i.lights) && (yt && (h = !0, ne(t), yt = !1), h ? (K(c, xt), Z(c, !0)) : Z(c, !1)), (i instanceof n.MeshBasicMaterial || i instanceof n.MeshLambertMaterial || i instanceof n.MeshPhongMaterial) && G(c, i), i instanceof n.LineBasicMaterial ? H(c, i) : i instanceof n.LineDashedMaterial ? (H(c, i), W(c, i)) : i instanceof n.PointCloudMaterial ? j(c, i) : i instanceof n.MeshPhongMaterial ? q(c, i) : i instanceof n.MeshLambertMaterial ? Y(c, i) : i instanceof n.MeshDepthMaterial ? (c.mNear.value = e.near, c.mFar.value = e.far, c.opacity.value = i.opacity) : i instanceof n.MeshNormalMaterial && (c.opacity.value = i.opacity), o.receiveShadow && !i._shadowPass && Q(c, t), ee(i.uniformsList)), J(u, o), null !== u.modelMatrix && Ve.uniformMatrix4fv(u.modelMatrix, !1, o.matrixWorld.elements), l
            }

            function G(e, t) {
                e.opacity.value = t.opacity, Oe.gammaInput ? e.diffuse.value.copyGammaToLinear(t.color) : e.diffuse.value = t.color, e.map.value = t.map, e.lightMap.value = t.lightMap, e.specularMap.value = t.specularMap, e.alphaMap.value = t.alphaMap, t.bumpMap && (e.bumpMap.value = t.bumpMap, e.bumpScale.value = t.bumpScale), t.normalMap && (e.normalMap.value = t.normalMap, e.normalScale.value.copy(t.normalScale));
                var r;
                if (t.map ? r = t.map : t.specularMap ? r = t.specularMap : t.normalMap ? r = t.normalMap : t.bumpMap ? r = t.bumpMap : t.alphaMap && (r = t.alphaMap), void 0 !== r) {
                    var i = r.offset,
                        o = r.repeat;
                    e.offsetRepeat.value.set(i.x, i.y, o.x, o.y)
                }
                e.envMap.value = t.envMap, e.flipEnvMap.value = t.envMap instanceof n.WebGLRenderTargetCube ? 1 : -1, Oe.gammaInput ? e.reflectivity.value = t.reflectivity : e.reflectivity.value = t.reflectivity, e.refractionRatio.value = t.refractionRatio, e.combine.value = t.combine, e.useRefract.value = t.envMap && t.envMap.mapping instanceof n.CubeRefractionMapping
            }

            function H(e, t) {
                e.diffuse.value = t.color, e.opacity.value = t.opacity
            }

            function W(e, t) {
                e.dashSize.value = t.dashSize, e.totalSize.value = t.dashSize + t.gapSize, e.scale.value = t.scale
            }

            function j(e, t) {
                e.psColor.value = t.color, e.opacity.value = t.opacity, e.size.value = t.size, e.scale.value = xe.height / 2, e.map.value = t.map
            }

            function X(e, t) {
                e.fogColor.value = t.color, t instanceof n.Fog ? (e.fogNear.value = t.near, e.fogFar.value = t.far) : t instanceof n.FogExp2 && (e.fogDensity.value = t.density)
            }

            function q(e, t) {
                e.shininess.value = t.shininess, Oe.gammaInput ? (e.ambient.value.copyGammaToLinear(t.ambient), e.emissive.value.copyGammaToLinear(t.emissive), e.specular.value.copyGammaToLinear(t.specular)) : (e.ambient.value = t.ambient, e.emissive.value = t.emissive, e.specular.value = t.specular), t.wrapAround && e.wrapRGB.value.copy(t.wrapRGB)
            }

            function Y(e, t) {
                Oe.gammaInput ? (e.ambient.value.copyGammaToLinear(t.ambient), e.emissive.value.copyGammaToLinear(t.emissive)) : (e.ambient.value = t.ambient, e.emissive.value = t.emissive), t.wrapAround && e.wrapRGB.value.copy(t.wrapRGB)
            }

            function K(e, t) {
                e.ambientLightColor.value = t.ambient, e.directionalLightColor.value = t.directional.colors, e.directionalLightDirection.value = t.directional.positions, e.pointLightColor.value = t.point.colors, e.pointLightPosition.value = t.point.positions, e.pointLightDistance.value = t.point.distances, e.spotLightColor.value = t.spot.colors, e.spotLightPosition.value = t.spot.positions, e.spotLightDistance.value = t.spot.distances, e.spotLightDirection.value = t.spot.directions, e.spotLightAngleCos.value = t.spot.anglesCos, e.spotLightExponent.value = t.spot.exponents, e.hemisphereLightSkyColor.value = t.hemi.skyColors, e.hemisphereLightGroundColor.value = t.hemi.groundColors, e.hemisphereLightDirection.value = t.hemi.positions
            }

            function Z(e, t) {
                e.ambientLightColor.needsUpdate = t, e.directionalLightColor.needsUpdate = t, e.directionalLightDirection.needsUpdate = t, e.pointLightColor.needsUpdate = t, e.pointLightPosition.needsUpdate = t, e.pointLightDistance.needsUpdate = t, e.spotLightColor.needsUpdate = t, e.spotLightPosition.needsUpdate = t, e.spotLightDistance.needsUpdate = t, e.spotLightDirection.needsUpdate = t, e.spotLightAngleCos.needsUpdate = t, e.spotLightExponent.needsUpdate = t, e.hemisphereLightSkyColor.needsUpdate = t, e.hemisphereLightGroundColor.needsUpdate = t, e.hemisphereLightDirection.needsUpdate = t
            }

            function Q(e, t) {
                if (e.shadowMatrix)
                    for (var r = 0, i = 0, o = t.length; o > i; i++) {
                        var a = t[i];
                        a.castShadow && (a instanceof n.SpotLight || a instanceof n.DirectionalLight && !a.shadowCascade) && (e.shadowMap.value[r] = a.shadowMap, e.shadowMapSize.value[r] = a.shadowMapSize, e.shadowMatrix.value[r] = a.shadowMatrix, e.shadowDarkness.value[r] = a.shadowDarkness, e.shadowBias.value[r] = a.shadowBias, r++)
                    }
            }

            function J(e, t) {
                Ve.uniformMatrix4fv(e.modelViewMatrix, !1, t._modelViewMatrix.elements), e.normalMatrix && Ve.uniformMatrix3fv(e.normalMatrix, !1, t._normalMatrix.elements)
            }

            function $() {
                var e = Xe;
                return e >= Mt && console.warn("WebGLRenderer: trying to use " + e + " texture units while this GPU supports only " + Mt), Xe += 1, e
            }

            function ee(e) {
                for (var t, r, i, o = 0, a = e.length; a > o; o++) {
                    var s = e[o][0];
                    if (s.needsUpdate !== !1) {
                        var h = s.type,
                            l = s.value,
                            u = e[o][1];
                        switch (h) {
                            case "1i":
                                Ve.uniform1i(u, l);
                                break;
                            case "1f":
                                Ve.uniform1f(u, l);
                                break;
                            case "2f":
                                Ve.uniform2f(u, l[0], l[1]);
                                break;
                            case "3f":
                                Ve.uniform3f(u, l[0], l[1], l[2]);
                                break;
                            case "4f":
                                Ve.uniform4f(u, l[0], l[1], l[2], l[3]);
                                break;
                            case "1iv":
                                Ve.uniform1iv(u, l);
                                break;
                            case "3iv":
                                Ve.uniform3iv(u, l);
                                break;
                            case "1fv":
                                Ve.uniform1fv(u, l);
                                break;
                            case "2fv":
                                Ve.uniform2fv(u, l);
                                break;
                            case "3fv":
                                Ve.uniform3fv(u, l);
                                break;
                            case "4fv":
                                Ve.uniform4fv(u, l);
                                break;
                            case "Matrix3fv":
                                Ve.uniformMatrix3fv(u, !1, l);
                                break;
                            case "Matrix4fv":
                                Ve.uniformMatrix4fv(u, !1, l);
                                break;
                            case "i":
                                Ve.uniform1i(u, l);
                                break;
                            case "f":
                                Ve.uniform1f(u, l);
                                break;
                            case "v2":
                                Ve.uniform2f(u, l.x, l.y);
                                break;
                            case "v3":
                                Ve.uniform3f(u, l.x, l.y, l.z);
                                break;
                            case "v4":
                                Ve.uniform4f(u, l.x, l.y, l.z, l.w);
                                break;
                            case "c":
                                Ve.uniform3f(u, l.r, l.g, l.b);
                                break;
                            case "iv1":
                                Ve.uniform1iv(u, l);
                                break;
                            case "iv":
                                Ve.uniform3iv(u, l);
                                break;
                            case "fv1":
                                Ve.uniform1fv(u, l);
                                break;
                            case "fv":
                                Ve.uniform3fv(u, l);
                                break;
                            case "v2v":
                                void 0 === s._array && (s._array = new Float32Array(2 * l.length));
                                for (var c = 0, f = l.length; f > c; c++) i = 2 * c, s._array[i] = l[c].x, s._array[i + 1] = l[c].y;
                                Ve.uniform2fv(u, s._array);
                                break;
                            case "v3v":
                                void 0 === s._array && (s._array = new Float32Array(3 * l.length));
                                for (var c = 0, f = l.length; f > c; c++) i = 3 * c, s._array[i] = l[c].x, s._array[i + 1] = l[c].y, s._array[i + 2] = l[c].z;
                                Ve.uniform3fv(u, s._array);
                                break;
                            case "v4v":
                                void 0 === s._array && (s._array = new Float32Array(4 * l.length));
                                for (var c = 0, f = l.length; f > c; c++) i = 4 * c, s._array[i] = l[c].x, s._array[i + 1] = l[c].y, s._array[i + 2] = l[c].z, s._array[i + 3] = l[c].w;
                                Ve.uniform4fv(u, s._array);
                                break;
                            case "m3":
                                Ve.uniformMatrix3fv(u, !1, l.elements);
                                break;
                            case "m3v":
                                void 0 === s._array && (s._array = new Float32Array(9 * l.length));
                                for (var c = 0, f = l.length; f > c; c++) l[c].flattenToArrayOffset(s._array, 9 * c);
                                Ve.uniformMatrix3fv(u, !1, s._array);
                                break;
                            case "m4":
                                Ve.uniformMatrix4fv(u, !1, l.elements);
                                break;
                            case "m4v":
                                void 0 === s._array && (s._array = new Float32Array(16 * l.length));
                                for (var c = 0, f = l.length; f > c; c++) l[c].flattenToArrayOffset(s._array, 16 * c);
                                Ve.uniformMatrix4fv(u, !1, s._array);
                                break;
                            case "t":
                                if (t = l, r = $(), Ve.uniform1i(u, r), !t) continue;
                                t instanceof n.CubeTexture || t.image instanceof Array && 6 === t.image.length ? le(t, r) : t instanceof n.WebGLRenderTargetCube ? ue(t, r) : Oe.setTexture(t, r);
                                break;
                            case "tv":
                                void 0 === s._array && (s._array = []);
                                for (var c = 0, f = s.value.length; f > c; c++) s._array[c] = $();
                                Ve.uniform1iv(u, s._array);
                                for (var c = 0, f = s.value.length; f > c; c++) t = s.value[c], r = s._array[c], t && Oe.setTexture(t, r);
                                break;
                            default:
                                console.warn("THREE.WebGLRenderer: Unknown uniform type: " + h);
                        }
                    }
                }
            }

            function te(e, t) {
                e._modelViewMatrix.multiplyMatrices(t.matrixWorldInverse, e.matrixWorld), e._normalMatrix.getNormalMatrix(e._modelViewMatrix)
            }

            function re(e, t, r, i) {
                e[t] = r.r * r.r * i, e[t + 1] = r.g * r.g * i, e[t + 2] = r.b * r.b * i
            }

            function ie(e, t, r, i) {
                e[t] = r.r * i, e[t + 1] = r.g * i, e[t + 2] = r.b * i
            }

            function ne(e) {
                var t, r, i, o, a, s, h, l, u, c = 0,
                    f = 0,
                    p = 0,
                    d = xt,
                    m = d.directional.colors,
                    v = d.directional.positions,
                    g = d.point.colors,
                    y = d.point.positions,
                    x = d.point.distances,
                    w = d.spot.colors,
                    b = d.spot.positions,
                    _ = d.spot.distances,
                    M = d.spot.directions,
                    S = d.spot.anglesCos,
                    T = d.spot.exponents,
                    A = d.hemi.skyColors,
                    E = d.hemi.groundColors,
                    C = d.hemi.positions,
                    L = 0,
                    P = 0,
                    R = 0,
                    D = 0,
                    F = 0,
                    U = 0,
                    B = 0,
                    k = 0,
                    z = 0,
                    V = 0,
                    O = 0,
                    N = 0;
                for (t = 0, r = e.length; r > t; t++)
                    if (i = e[t], !i.onlyShadow)
                        if (o = i.color, h = i.intensity, u = i.distance, i instanceof n.AmbientLight) {
                            if (!i.visible) continue;
                            Oe.gammaInput ? (c += o.r * o.r, f += o.g * o.g, p += o.b * o.b) : (c += o.r, f += o.g, p += o.b)
                        } else if (i instanceof n.DirectionalLight) {
                            if (F += 1, !i.visible) continue;
                            gt.setFromMatrixPosition(i.matrixWorld), vt.setFromMatrixPosition(i.target.matrixWorld), gt.sub(vt), gt.normalize(), z = 3 * L, v[z] = gt.x, v[z + 1] = gt.y, v[z + 2] = gt.z, Oe.gammaInput ? re(m, z, o, h * h) : ie(m, z, o, h), L += 1
                        } else if (i instanceof n.PointLight) {
                            if (U += 1, !i.visible) continue;
                            V = 3 * P, Oe.gammaInput ? re(g, V, o, h * h) : ie(g, V, o, h), vt.setFromMatrixPosition(i.matrixWorld), y[V] = vt.x, y[V + 1] = vt.y, y[V + 2] = vt.z, x[P] = u, P += 1
                        } else if (i instanceof n.SpotLight) {
                            if (B += 1, !i.visible) continue;
                            O = 3 * R, Oe.gammaInput ? re(w, O, o, h * h) : ie(w, O, o, h), gt.setFromMatrixPosition(i.matrixWorld), b[O] = gt.x, b[O + 1] = gt.y, b[O + 2] = gt.z, _[R] = u, vt.setFromMatrixPosition(i.target.matrixWorld), gt.sub(vt), gt.normalize(), M[O] = gt.x, M[O + 1] = gt.y, M[O + 2] = gt.z, S[R] = Math.cos(i.angle), T[R] = i.exponent, R += 1
                        } else if (i instanceof n.HemisphereLight) {
                            if (k += 1, !i.visible) continue;
                            gt.setFromMatrixPosition(i.matrixWorld), gt.normalize(), N = 3 * D, C[N] = gt.x, C[N + 1] = gt.y, C[N + 2] = gt.z, a = i.color, s = i.groundColor, Oe.gammaInput ? (l = h * h, re(A, N, a, l), re(E, N, s, l)) : (ie(A, N, a, h), ie(E, N, s, h)), D += 1
                        }
                for (t = 3 * L, r = Math.max(m.length, 3 * F); r > t; t++) m[t] = 0;
                for (t = 3 * P, r = Math.max(g.length, 3 * U); r > t; t++) g[t] = 0;
                for (t = 3 * R, r = Math.max(w.length, 3 * B); r > t; t++) w[t] = 0;
                for (t = 3 * D, r = Math.max(A.length, 3 * k); r > t; t++) A[t] = 0;
                for (t = 3 * D, r = Math.max(E.length, 3 * k); r > t; t++) E[t] = 0;
                d.directional.length = L, d.point.length = P, d.spot.length = R, d.hemi.length = D, d.ambient[0] = c, d.ambient[1] = f, d.ambient[2] = p
            }

            function oe(e) {
                e !== nt && (Ve.lineWidth(e), nt = e)
            }

            function ae(e, t, r) {
                tt !== e && (e ? Ve.enable(Ve.POLYGON_OFFSET_FILL) : Ve.disable(Ve.POLYGON_OFFSET_FILL), tt = e), !e || rt === t && it === r || (Ve.polygonOffset(t, r), rt = t, it = r)
            }

            function se(e, t, r) {
                var i;
                r ? (Ve.texParameteri(e, Ve.TEXTURE_WRAP_S, me(t.wrapS)), Ve.texParameteri(e, Ve.TEXTURE_WRAP_T, me(t.wrapT)), Ve.texParameteri(e, Ve.TEXTURE_MAG_FILTER, me(t.magFilter)), Ve.texParameteri(e, Ve.TEXTURE_MIN_FILTER, me(t.minFilter))) : (Ve.texParameteri(e, Ve.TEXTURE_WRAP_S, Ve.CLAMP_TO_EDGE), Ve.texParameteri(e, Ve.TEXTURE_WRAP_T, Ve.CLAMP_TO_EDGE), Ve.texParameteri(e, Ve.TEXTURE_MAG_FILTER, de(t.magFilter)), Ve.texParameteri(e, Ve.TEXTURE_MIN_FILTER, de(t.minFilter))), i = _t.get("EXT_texture_filter_anisotropic"), i && t.type !== n.FloatType && (t.anisotropy > 1 || t.__oldAnisotropy) && (Ve.texParameterf(e, i.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(t.anisotropy, Oe.getMaxAnisotropy())), t.__oldAnisotropy = t.anisotropy)
            }

            function he(e, t) {
                if (e.width > t || e.height > t) {
                    var r = t / Math.max(e.width, e.height),
                        i = document.createElement("canvas");
                    i.width = Math.floor(e.width * r), i.height = Math.floor(e.height * r);
                    var n = i.getContext("2d");
                    return n.drawImage(e, 0, 0, e.width, e.height, 0, 0, i.width, i.height), console.log("THREE.WebGLRenderer:", e, "is too big (" + e.width + "x" + e.height + "). Resized to " + i.width + "x" + i.height + "."), i
                }
                return e
            }

            function le(e, t) {
                if (6 === e.image.length)
                    if (e.needsUpdate) {
                        e.image.__webglTextureCube || (e.addEventListener("dispose", It), e.image.__webglTextureCube = Ve.createTexture(), Oe.info.memory.textures++), Ve.activeTexture(Ve.TEXTURE0 + t), Ve.bindTexture(Ve.TEXTURE_CUBE_MAP, e.image.__webglTextureCube), Ve.pixelStorei(Ve.UNPACK_FLIP_Y_WEBGL, e.flipY);
                        for (var r = e instanceof n.CompressedTexture, i = e.image[0] instanceof n.DataTexture, o = [], a = 0; 6 > a; a++) !Oe.autoScaleCubemaps || r || i ? o[a] = i ? e.image[a].image : e.image[a] : o[a] = he(e.image[a], At);
                        var s = o[0],
                            h = n.Math.isPowerOfTwo(s.width) && n.Math.isPowerOfTwo(s.height),
                            l = me(e.format),
                            u = me(e.type);
                        se(Ve.TEXTURE_CUBE_MAP, e, h);
                        for (var a = 0; 6 > a; a++)
                            if (r)
                                for (var c, f = o[a].mipmaps, p = 0, d = f.length; d > p; p++) c = f[p], e.format !== n.RGBAFormat && e.format !== n.RGBFormat ? Ft().indexOf(l) > -1 ? Ve.compressedTexImage2D(Ve.TEXTURE_CUBE_MAP_POSITIVE_X + a, p, l, c.width, c.height, 0, c.data) : console.warn("Attempt to load unsupported compressed texture format") : Ve.texImage2D(Ve.TEXTURE_CUBE_MAP_POSITIVE_X + a, p, l, c.width, c.height, 0, l, u, c.data);
                            else i ? Ve.texImage2D(Ve.TEXTURE_CUBE_MAP_POSITIVE_X + a, 0, l, o[a].width, o[a].height, 0, l, u, o[a].data) : Ve.texImage2D(Ve.TEXTURE_CUBE_MAP_POSITIVE_X + a, 0, l, l, u, o[a]);
                        e.generateMipmaps && h && Ve.generateMipmap(Ve.TEXTURE_CUBE_MAP), e.needsUpdate = !1, e.onUpdate && e.onUpdate()
                    } else Ve.activeTexture(Ve.TEXTURE0 + t), Ve.bindTexture(Ve.TEXTURE_CUBE_MAP, e.image.__webglTextureCube)
            }

            function ue(e, t) {
                Ve.activeTexture(Ve.TEXTURE0 + t), Ve.bindTexture(Ve.TEXTURE_CUBE_MAP, e.__webglTexture)
            }

            function ce(e, t, r) {
                Ve.bindFramebuffer(Ve.FRAMEBUFFER, e), Ve.framebufferTexture2D(Ve.FRAMEBUFFER, Ve.COLOR_ATTACHMENT0, r, t.__webglTexture, 0)
            }

            function fe(e, t) {
                Ve.bindRenderbuffer(Ve.RENDERBUFFER, e), t.depthBuffer && !t.stencilBuffer ? (Ve.renderbufferStorage(Ve.RENDERBUFFER, Ve.DEPTH_COMPONENT16, t.width, t.height), Ve.framebufferRenderbuffer(Ve.FRAMEBUFFER, Ve.DEPTH_ATTACHMENT, Ve.RENDERBUFFER, e)) : t.depthBuffer && t.stencilBuffer ? (Ve.renderbufferStorage(Ve.RENDERBUFFER, Ve.DEPTH_STENCIL, t.width, t.height), Ve.framebufferRenderbuffer(Ve.FRAMEBUFFER, Ve.DEPTH_STENCIL_ATTACHMENT, Ve.RENDERBUFFER, e)) : Ve.renderbufferStorage(Ve.RENDERBUFFER, Ve.RGBA4, t.width, t.height)
            }

            function pe(e) {
                e instanceof n.WebGLRenderTargetCube ? (Ve.bindTexture(Ve.TEXTURE_CUBE_MAP, e.__webglTexture), Ve.generateMipmap(Ve.TEXTURE_CUBE_MAP), Ve.bindTexture(Ve.TEXTURE_CUBE_MAP, null)) : (Ve.bindTexture(Ve.TEXTURE_2D, e.__webglTexture), Ve.generateMipmap(Ve.TEXTURE_2D), Ve.bindTexture(Ve.TEXTURE_2D, null))
            }

            function de(e) {
                return e === n.NearestFilter || e === n.NearestMipMapNearestFilter || e === n.NearestMipMapLinearFilter ? Ve.NEAREST : Ve.LINEAR
            }

            function me(e) {
                var t;
                if (e === n.RepeatWrapping) return Ve.REPEAT;
                if (e === n.ClampToEdgeWrapping) return Ve.CLAMP_TO_EDGE;
                if (e === n.MirroredRepeatWrapping) return Ve.MIRRORED_REPEAT;
                if (e === n.NearestFilter) return Ve.NEAREST;
                if (e === n.NearestMipMapNearestFilter) return Ve.NEAREST_MIPMAP_NEAREST;
                if (e === n.NearestMipMapLinearFilter) return Ve.NEAREST_MIPMAP_LINEAR;
                if (e === n.LinearFilter) return Ve.LINEAR;
                if (e === n.LinearMipMapNearestFilter) return Ve.LINEAR_MIPMAP_NEAREST;
                if (e === n.LinearMipMapLinearFilter) return Ve.LINEAR_MIPMAP_LINEAR;
                if (e === n.UnsignedByteType) return Ve.UNSIGNED_BYTE;
                if (e === n.UnsignedShort4444Type) return Ve.UNSIGNED_SHORT_4_4_4_4;
                if (e === n.UnsignedShort5551Type) return Ve.UNSIGNED_SHORT_5_5_5_1;
                if (e === n.UnsignedShort565Type) return Ve.UNSIGNED_SHORT_5_6_5;
                if (e === n.ByteType) return Ve.BYTE;
                if (e === n.ShortType) return Ve.SHORT;
                if (e === n.UnsignedShortType) return Ve.UNSIGNED_SHORT;
                if (e === n.IntType) return Ve.INT;
                if (e === n.UnsignedIntType) return Ve.UNSIGNED_INT;
                if (e === n.FloatType) return Ve.FLOAT;
                if (e === n.AlphaFormat) return Ve.ALPHA;
                if (e === n.RGBFormat) return Ve.RGB;
                if (e === n.RGBAFormat) return Ve.RGBA;
                if (e === n.LuminanceFormat) return Ve.LUMINANCE;
                if (e === n.LuminanceAlphaFormat) return Ve.LUMINANCE_ALPHA;
                if (e === n.AddEquation) return Ve.FUNC_ADD;
                if (e === n.SubtractEquation) return Ve.FUNC_SUBTRACT;
                if (e === n.ReverseSubtractEquation) return Ve.FUNC_REVERSE_SUBTRACT;
                if (e === n.ZeroFactor) return Ve.ZERO;
                if (e === n.OneFactor) return Ve.ONE;
                if (e === n.SrcColorFactor) return Ve.SRC_COLOR;
                if (e === n.OneMinusSrcColorFactor) return Ve.ONE_MINUS_SRC_COLOR;
                if (e === n.SrcAlphaFactor) return Ve.SRC_ALPHA;
                if (e === n.OneMinusSrcAlphaFactor) return Ve.ONE_MINUS_SRC_ALPHA;
                if (e === n.DstAlphaFactor) return Ve.DST_ALPHA;
                if (e === n.OneMinusDstAlphaFactor) return Ve.ONE_MINUS_DST_ALPHA;
                if (e === n.DstColorFactor) return Ve.DST_COLOR;
                if (e === n.OneMinusDstColorFactor) return Ve.ONE_MINUS_DST_COLOR;
                if (e === n.SrcAlphaSaturateFactor) return Ve.SRC_ALPHA_SATURATE;
                if (t = _t.get("WEBGL_compressed_texture_s3tc"), null !== t) {
                    if (e === n.RGB_S3TC_DXT1_Format) return t.COMPRESSED_RGB_S3TC_DXT1_EXT;
                    if (e === n.RGBA_S3TC_DXT1_Format) return t.COMPRESSED_RGBA_S3TC_DXT1_EXT;
                    if (e === n.RGBA_S3TC_DXT3_Format) return t.COMPRESSED_RGBA_S3TC_DXT3_EXT;
                    if (e === n.RGBA_S3TC_DXT5_Format) return t.COMPRESSED_RGBA_S3TC_DXT5_EXT
                }
                if (t = _t.get("WEBGL_compressed_texture_pvrtc"), null !== t) {
                    if (e === n.RGB_PVRTC_4BPPV1_Format) return t.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
                    if (e === n.RGB_PVRTC_2BPPV1_Format) return t.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
                    if (e === n.RGBA_PVRTC_4BPPV1_Format) return t.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
                    if (e === n.RGBA_PVRTC_2BPPV1_Format) return t.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG
                }
                if (t = _t.get("EXT_blend_minmax"), null !== t) {
                    if (e === n.MinEquation) return t.MIN_EXT;
                    if (e === n.MaxEquation) return t.MAX_EXT
                }
                return 0
            }

            function ve(e) {
                if (Ct && e && e.skeleton && e.skeleton.useVertexTexture) return 1024;
                var t = Ve.getParameter(Ve.MAX_VERTEX_UNIFORM_VECTORS),
                    r = Math.floor((t - 20) / 4),
                    i = r;
                return void 0 !== e && e instanceof n.SkinnedMesh && (i = Math.min(e.skeleton.bones.length, i), i < e.skeleton.bones.length && console.warn("WebGLRenderer: too many bones - " + e.skeleton.bones.length + ", this GPU supports just " + i + " (try OpenGL instead of ANGLE)")), i
            }

            function ge(e) {
                for (var t = 0, r = 0, i = 0, o = 0, a = 0, s = e.length; s > a; a++) {
                    var h = e[a];
                    h.onlyShadow || h.visible === !1 || (h instanceof n.DirectionalLight && t++, h instanceof n.PointLight && r++, h instanceof n.SpotLight && i++, h instanceof n.HemisphereLight && o++)
                }
                return {
                    directional: t,
                    point: r,
                    spot: i,
                    hemi: o
                }
            }

            function ye(e) {
                for (var t = 0, r = 0, i = e.length; i > r; r++) {
                    var o = e[r];
                    o.castShadow && (o instanceof n.SpotLight && t++, o instanceof n.DirectionalLight && !o.shadowCascade && t++)
                }
                return t
            }
            console.log("THREE.WebGLRenderer", n.REVISION), e = e || {};
            var xe = void 0 !== e.canvas ? e.canvas : document.createElement("canvas"),
                we = void 0 !== e.context ? e.context : null,
                be = void 0 !== e.precision ? e.precision : "highp",
                _e = void 0 !== e.alpha ? e.alpha : !1,
                Me = void 0 !== e.depth ? e.depth : !0,
                Se = void 0 !== e.stencil ? e.stencil : !0,
                Te = void 0 !== e.antialias ? e.antialias : !1,
                Ae = void 0 !== e.premultipliedAlpha ? e.premultipliedAlpha : !0,
                Ee = void 0 !== e.preserveDrawingBuffer ? e.preserveDrawingBuffer : !1,
                Ce = void 0 !== e.logarithmicDepthBuffer ? e.logarithmicDepthBuffer : !1,
                Le = new n.Color(0),
                Pe = 0,
                Re = [],
                De = {},
                Fe = [],
                Ue = [],
                Be = [],
                ke = [],
                ze = [];
            this.domElement = xe, this.context = null, this.devicePixelRatio = void 0 !== e.devicePixelRatio ? e.devicePixelRatio : void 0 !== i.devicePixelRatio ? i.devicePixelRatio : 1, this.autoClear = !0, this.autoClearColor = !0, this.autoClearDepth = !0, this.autoClearStencil = !0, this.sortObjects = !0, this.gammaInput = !1, this.gammaOutput = !1, this.shadowMapEnabled = !1, this.shadowMapType = n.PCFShadowMap, this.shadowMapCullFace = n.CullFaceFront, this.shadowMapDebug = !1, this.shadowMapCascade = !1, this.maxMorphTargets = 8, this.maxMorphNormals = 4, this.autoScaleCubemaps = !0, this.info = {
                memory: {
                    programs: 0,
                    geometries: 0,
                    textures: 0
                },
                render: {
                    calls: 0,
                    vertices: 0,
                    faces: 0,
                    points: 0
                }
            };
            var Ve, Oe = this,
                Ne = [],
                Ie = null,
                Ge = null,
                He = -1,
                We = -1,
                je = null,
                Xe = 0,
                qe = -1,
                Ye = -1,
                Ke = -1,
                Ze = -1,
                Qe = -1,
                Je = -1,
                $e = -1,
                et = -1,
                tt = null,
                rt = null,
                it = null,
                nt = null,
                ot = 0,
                at = 0,
                st = xe.width,
                ht = xe.height,
                lt = 0,
                ut = 0,
                ct = new Uint8Array(16),
                ft = new Uint8Array(16),
                pt = new n.Frustum,
                dt = new n.Matrix4,
                mt = new n.Matrix4,
                vt = new n.Vector3,
                gt = new n.Vector3,
                yt = !0,
                xt = {
                    ambient: [0, 0, 0],
                    directional: {
                        length: 0,
                        colors: [],
                        positions: []
                    },
                    point: {
                        length: 0,
                        colors: [],
                        positions: [],
                        distances: []
                    },
                    spot: {
                        length: 0,
                        colors: [],
                        positions: [],
                        distances: [],
                        directions: [],
                        anglesCos: [],
                        exponents: []
                    },
                    hemi: {
                        length: 0,
                        skyColors: [],
                        groundColors: [],
                        positions: []
                    }
                };
            try {
                var wt = {
                    alpha: _e,
                    depth: Me,
                    stencil: Se,
                    antialias: Te,
                    premultipliedAlpha: Ae,
                    preserveDrawingBuffer: Ee
                };
                if (Ve = we || xe.getContext("webgl", wt) || xe.getContext("experimental-webgl", wt), null === Ve) throw null !== xe.getContext("webgl") ? "Error creating WebGL context with your selected attributes." : "Error creating WebGL context."
            } catch (bt) {
                console.error(bt)
            }
            void 0 === Ve.getShaderPrecisionFormat && (Ve.getShaderPrecisionFormat = function() {
                return {
                    rangeMin: 1,
                    rangeMax: 1,
                    precision: 1
                }
            });
            var _t = new n.WebGLExtensions(Ve);
            _t.get("OES_texture_float"), _t.get("OES_texture_float_linear"), _t.get("OES_standard_derivatives"), Ce && _t.get("EXT_frag_depth"), t(), this.context = Ve;
            var Mt = Ve.getParameter(Ve.MAX_TEXTURE_IMAGE_UNITS),
                St = Ve.getParameter(Ve.MAX_VERTEX_TEXTURE_IMAGE_UNITS),
                Tt = Ve.getParameter(Ve.MAX_TEXTURE_SIZE),
                At = Ve.getParameter(Ve.MAX_CUBE_MAP_TEXTURE_SIZE),
                Et = St > 0,
                Ct = Et && _t.get("OES_texture_float"),
                Lt = Ve.getShaderPrecisionFormat(Ve.VERTEX_SHADER, Ve.HIGH_FLOAT),
                Pt = Ve.getShaderPrecisionFormat(Ve.VERTEX_SHADER, Ve.MEDIUM_FLOAT),
                Rt = (Ve.getShaderPrecisionFormat(Ve.VERTEX_SHADER, Ve.LOW_FLOAT), Ve.getShaderPrecisionFormat(Ve.FRAGMENT_SHADER, Ve.HIGH_FLOAT)),
                Dt = Ve.getShaderPrecisionFormat(Ve.FRAGMENT_SHADER, Ve.MEDIUM_FLOAT),
                Ft = (Ve.getShaderPrecisionFormat(Ve.FRAGMENT_SHADER, Ve.LOW_FLOAT), function() {
                    var e;
                    return function() {
                        if (void 0 !== e) return e;
                        if (e = [], _t.get("WEBGL_compressed_texture_pvrtc") || _t.get("WEBGL_compressed_texture_s3tc"))
                            for (var t = Ve.getParameter(Ve.COMPRESSED_TEXTURE_FORMATS), r = 0; r < t.length; r++) e.push(t[r]);
                        return e
                    }
                }()),
                Ut = Lt.precision > 0 && Rt.precision > 0,
                Bt = Pt.precision > 0 && Dt.precision > 0;
            "highp" !== be || Ut || (Bt ? (be = "mediump", console.warn("THREE.WebGLRenderer: highp not supported, using mediump.")) : (be = "lowp", console.warn("THREE.WebGLRenderer: highp and mediump not supported, using lowp."))), "mediump" !== be || Bt || (be = "lowp", console.warn("THREE.WebGLRenderer: mediump not supported, using lowp."));
            var kt = new n.ShadowMapPlugin(this, Re, De, Fe),
                zt = new n.SpritePlugin(this, ke),
                Vt = new n.LensFlarePlugin(this, ze);
            this.getContext = function() {
                return Ve
            }, this.supportsVertexTextures = function() {
                return Et
            }, this.supportsFloatTextures = function() {
                return _t.get("OES_texture_float")
            }, this.supportsStandardDerivatives = function() {
                return _t.get("OES_standard_derivatives")
            }, this.supportsCompressedTextureS3TC = function() {
                return _t.get("WEBGL_compressed_texture_s3tc")
            }, this.supportsCompressedTexturePVRTC = function() {
                return _t.get("WEBGL_compressed_texture_pvrtc")
            }, this.supportsBlendMinMax = function() {
                return _t.get("EXT_blend_minmax")
            }, this.getMaxAnisotropy = function() {
                var e;
                return function() {
                    if (void 0 !== e) return e;
                    var t = _t.get("EXT_texture_filter_anisotropic");
                    return e = null !== t ? Ve.getParameter(t.MAX_TEXTURE_MAX_ANISOTROPY_EXT) : 0
                }
            }(), this.getPrecision = function() {
                return be
            }, this.setSize = function(e, t, r) {
                xe.width = e * this.devicePixelRatio, xe.height = t * this.devicePixelRatio, r !== !1 && (xe.style.width = e + "px", xe.style.height = t + "px"), this.setViewport(0, 0, e, t)
            }, this.setViewport = function(e, t, r, i) {
                ot = e * this.devicePixelRatio, at = t * this.devicePixelRatio, st = r * this.devicePixelRatio, ht = i * this.devicePixelRatio, Ve.viewport(ot, at, st, ht)
            }, this.setScissor = function(e, t, r, i) {
                Ve.scissor(e * this.devicePixelRatio, t * this.devicePixelRatio, r * this.devicePixelRatio, i * this.devicePixelRatio)
            }, this.enableScissorTest = function(e) {
                e ? Ve.enable(Ve.SCISSOR_TEST) : Ve.disable(Ve.SCISSOR_TEST)
            }, this.setClearColor = function(e, t) {
                Le.set(e), Pe = void 0 !== t ? t : 1, Ve.clearColor(Le.r, Le.g, Le.b, Pe)
            }, this.setClearColorHex = function(e, t) {
                console.warn("THREE.WebGLRenderer: .setClearColorHex() is being removed. Use .setClearColor() instead."), this.setClearColor(e, t)
            }, this.getClearColor = function() {
                return Le
            }, this.getClearAlpha = function() {
                return Pe
            }, this.clear = function(e, t, r) {
                var i = 0;
                (void 0 === e || e) && (i |= Ve.COLOR_BUFFER_BIT), (void 0 === t || t) && (i |= Ve.DEPTH_BUFFER_BIT), (void 0 === r || r) && (i |= Ve.STENCIL_BUFFER_BIT), Ve.clear(i)
            }, this.clearColor = function() {
                Ve.clear(Ve.COLOR_BUFFER_BIT)
            }, this.clearDepth = function() {
                Ve.clear(Ve.DEPTH_BUFFER_BIT)
            }, this.clearStencil = function() {
                Ve.clear(Ve.STENCIL_BUFFER_BIT)
            }, this.clearTarget = function(e, t, r, i) {
                this.setRenderTarget(e), this.clear(t, r, i)
            }, this.resetGLState = function() {
                Ie = null, je = null, Ke = -1, $e = -1, et = -1, qe = -1, Ye = -1, We = -1, He = -1, yt = !0
            };
            var Ot = function(e) {
                    var t = e.target;
                    t.traverse(function(e) {
                        e.removeEventListener("remove", Ot), V(e)
                    })
                },
                Nt = function(e) {
                    var t = e.target;
                    t.removeEventListener("dispose", Nt), jt(t)
                },
                It = function(e) {
                    var t = e.target;
                    t.removeEventListener("dispose", It), Xt(t), Oe.info.memory.textures--
                },
                Gt = function(e) {
                    var t = e.target;
                    t.removeEventListener("dispose", Gt), qt(t), Oe.info.memory.textures--
                },
                Ht = function(e) {
                    var t = e.target;
                    t.removeEventListener("dispose", Ht), Yt(t)
                },
                Wt = function(e) {
                    for (var t = ["__webglVertexBuffer", "__webglNormalBuffer", "__webglTangentBuffer", "__webglColorBuffer", "__webglUVBuffer", "__webglUV2Buffer", "__webglSkinIndicesBuffer", "__webglSkinWeightsBuffer", "__webglFaceBuffer", "__webglLineBuffer", "__webglLineDistanceBuffer"], r = 0, i = t.length; i > r; r++) {
                        var n = t[r];
                        void 0 !== e[n] && (Ve.deleteBuffer(e[n]), delete e[n])
                    }
                    if (void 0 !== e.__webglCustomAttributesList) {
                        for (var n in e.__webglCustomAttributesList) Ve.deleteBuffer(e.__webglCustomAttributesList[n].buffer);
                        delete e.__webglCustomAttributesList
                    }
                    Oe.info.memory.geometries--
                },
                jt = function(e) {
                    if (delete e.__webglInit, e instanceof n.BufferGeometry) {
                        for (var t in e.attributes) {
                            var r = e.attributes[t];
                            void 0 !== r.buffer && (Ve.deleteBuffer(r.buffer), delete r.buffer)
                        }
                        Oe.info.memory.geometries--
                    } else {
                        var i = Kt[e.id];
                        if (void 0 !== i) {
                            for (var o = 0, a = i.length; a > o; o++) {
                                var s = i[o];
                                if (void 0 !== s.numMorphTargets) {
                                    for (var h = 0, l = s.numMorphTargets; l > h; h++) Ve.deleteBuffer(s.__webglMorphTargetsBuffers[h]);
                                    delete s.__webglMorphTargetsBuffers
                                }
                                if (void 0 !== s.numMorphNormals) {
                                    for (var h = 0, l = s.numMorphNormals; l > h; h++) Ve.deleteBuffer(s.__webglMorphNormalsBuffers[h]);
                                    delete s.__webglMorphNormalsBuffers
                                }
                                Wt(s)
                            }
                            delete Kt[e.id]
                        } else Wt(e)
                    }
                    We = -1
                },
                Xt = function(e) {
                    if (e.image && e.image.__webglTextureCube) Ve.deleteTexture(e.image.__webglTextureCube), delete e.image.__webglTextureCube;
                    else {
                        if (void 0 === e.__webglInit) return;
                        Ve.deleteTexture(e.__webglTexture), delete e.__webglTexture, delete e.__webglInit
                    }
                },
                qt = function(e) {
                    if (e && void 0 !== e.__webglTexture) {
                        if (Ve.deleteTexture(e.__webglTexture), delete e.__webglTexture, e instanceof n.WebGLRenderTargetCube)
                            for (var t = 0; 6 > t; t++) Ve.deleteFramebuffer(e.__webglFramebuffer[t]), Ve.deleteRenderbuffer(e.__webglRenderbuffer[t]);
                        else Ve.deleteFramebuffer(e.__webglFramebuffer), Ve.deleteRenderbuffer(e.__webglRenderbuffer);
                        delete e.__webglFramebuffer, delete e.__webglRenderbuffer
                    }
                },
                Yt = function(e) {
                    var t = e.program.program;
                    if (void 0 !== t) {
                        e.program = void 0;
                        var r, i, n, o = !1;
                        for (r = 0, i = Ne.length; i > r; r++)
                            if (n = Ne[r], n.program === t) {
                                n.usedTimes--, 0 === n.usedTimes && (o = !0);
                                break
                            }
                        if (o === !0) {
                            var a = [];
                            for (r = 0, i = Ne.length; i > r; r++) n = Ne[r], n.program !== t && a.push(n);
                            Ne = a, Ve.deleteProgram(t), Oe.info.memory.programs--
                        }
                    }
                };
            this.renderBufferImmediate = function(e, t, r) {
                if (y(), e.hasPositions && !e.__webglVertexBuffer && (e.__webglVertexBuffer = Ve.createBuffer()), e.hasNormals && !e.__webglNormalBuffer && (e.__webglNormalBuffer = Ve.createBuffer()), e.hasUvs && !e.__webglUvBuffer && (e.__webglUvBuffer = Ve.createBuffer()), e.hasColors && !e.__webglColorBuffer && (e.__webglColorBuffer = Ve.createBuffer()), e.hasPositions && (Ve.bindBuffer(Ve.ARRAY_BUFFER, e.__webglVertexBuffer), Ve.bufferData(Ve.ARRAY_BUFFER, e.positionArray, Ve.DYNAMIC_DRAW), x(t.attributes.position), Ve.vertexAttribPointer(t.attributes.position, 3, Ve.FLOAT, !1, 0, 0)), e.hasNormals) {
                    if (Ve.bindBuffer(Ve.ARRAY_BUFFER, e.__webglNormalBuffer), r.shading === n.FlatShading) {
                        var i, o, a, s, h, l, u, c, f, p, d, m, v, g, b = 3 * e.count;
                        for (g = 0; b > g; g += 9) v = e.normalArray, s = v[g], u = v[g + 1], p = v[g + 2], h = v[g + 3], c = v[g + 4], d = v[g + 5], l = v[g + 6], f = v[g + 7], m = v[g + 8], i = (s + h + l) / 3, o = (u + c + f) / 3, a = (p + d + m) / 3, v[g] = i, v[g + 1] = o, v[g + 2] = a, v[g + 3] = i, v[g + 4] = o, v[g + 5] = a, v[g + 6] = i, v[g + 7] = o, v[g + 8] = a
                    }
                    Ve.bufferData(Ve.ARRAY_BUFFER, e.normalArray, Ve.DYNAMIC_DRAW), x(t.attributes.normal), Ve.vertexAttribPointer(t.attributes.normal, 3, Ve.FLOAT, !1, 0, 0)
                }
                e.hasUvs && r.map && (Ve.bindBuffer(Ve.ARRAY_BUFFER, e.__webglUvBuffer), Ve.bufferData(Ve.ARRAY_BUFFER, e.uvArray, Ve.DYNAMIC_DRAW), x(t.attributes.uv), Ve.vertexAttribPointer(t.attributes.uv, 2, Ve.FLOAT, !1, 0, 0)), e.hasColors && r.vertexColors !== n.NoColors && (Ve.bindBuffer(Ve.ARRAY_BUFFER, e.__webglColorBuffer), Ve.bufferData(Ve.ARRAY_BUFFER, e.colorArray, Ve.DYNAMIC_DRAW), x(t.attributes.color), Ve.vertexAttribPointer(t.attributes.color, 3, Ve.FLOAT, !1, 0, 0)), w(), Ve.drawArrays(Ve.TRIANGLES, 0, e.count), e.count = 0
            }, this.renderBufferDirect = function(e, t, r, i, o, a) {
                if (i.visible !== !1) {
                    var s = I(e, t, r, i, a),
                        h = !1,
                        l = i.wireframe ? 1 : 0,
                        u = 16777215 * o.id + 2 * s.id + l;
                    if (u !== We && (We = u, h = !0), h && y(), a instanceof n.Mesh) {
                        var c = i.wireframe === !0 ? Ve.LINES : Ve.TRIANGLES,
                            f = o.attributes.index;
                        if (f) {
                            var p, d;
                            f.array instanceof Uint32Array && _t.get("OES_element_index_uint") ? (p = Ve.UNSIGNED_INT, d = 4) : (p = Ve.UNSIGNED_SHORT, d = 2);
                            var m = o.offsets;
                            if (0 === m.length) h && (g(i, s, o, 0), Ve.bindBuffer(Ve.ELEMENT_ARRAY_BUFFER, f.buffer)), Ve.drawElements(c, f.array.length, p, 0), Oe.info.render.calls++, Oe.info.render.vertices += f.array.length, Oe.info.render.faces += f.array.length / 3;
                            else {
                                h = !0;
                                for (var v = 0, x = m.length; x > v; v++) {
                                    var w = m[v].index;
                                    h && (g(i, s, o, w), Ve.bindBuffer(Ve.ELEMENT_ARRAY_BUFFER, f.buffer)), Ve.drawElements(c, m[v].count, p, m[v].start * d), Oe.info.render.calls++, Oe.info.render.vertices += m[v].count, Oe.info.render.faces += m[v].count / 3
                                }
                            }
                        } else {
                            h && g(i, s, o, 0);
                            var b = o.attributes.position;
                            Ve.drawArrays(c, 0, b.array.length / 3), Oe.info.render.calls++, Oe.info.render.vertices += b.array.length / 3, Oe.info.render.faces += b.array.length / 9
                        }
                    } else if (a instanceof n.PointCloud) {
                        h && g(i, s, o, 0);
                        var b = o.attributes.position;
                        Ve.drawArrays(Ve.POINTS, 0, b.array.length / 3), Oe.info.render.calls++, Oe.info.render.points += b.array.length / 3
                    } else if (a instanceof n.Line) {
                        var c = a.mode === n.LineStrip ? Ve.LINE_STRIP : Ve.LINES;
                        oe(i.linewidth);
                        var f = o.attributes.index;
                        if (f) {
                            var p, d;
                            f.array instanceof Uint32Array ? (p = Ve.UNSIGNED_INT, d = 4) : (p = Ve.UNSIGNED_SHORT, d = 2);
                            var m = o.offsets;
                            if (0 === m.length) h && (g(i, s, o, 0), Ve.bindBuffer(Ve.ELEMENT_ARRAY_BUFFER, f.buffer)), Ve.drawElements(c, f.array.length, p, 0), Oe.info.render.calls++, Oe.info.render.vertices += f.array.length;
                            else {
                                m.length > 1 && (h = !0);
                                for (var v = 0, x = m.length; x > v; v++) {
                                    var w = m[v].index;
                                    h && (g(i, s, o, w), Ve.bindBuffer(Ve.ELEMENT_ARRAY_BUFFER, f.buffer)), Ve.drawElements(c, m[v].count, p, m[v].start * d), Oe.info.render.calls++, Oe.info.render.vertices += m[v].count
                                }
                            }
                        } else {
                            h && g(i, s, o, 0);
                            var b = o.attributes.position;
                            Ve.drawArrays(c, 0, b.array.length / 3), Oe.info.render.calls++, Oe.info.render.points += b.array.length / 3
                        }
                    }
                }
            }, this.renderBuffer = function(e, t, r, i, o, a) {
                if (i.visible !== !1) {
                    var s = I(e, t, r, i, a),
                        h = s.attributes,
                        l = !1,
                        u = i.wireframe ? 1 : 0,
                        c = 16777215 * o.id + 2 * s.id + u;
                    if (c !== We && (We = c, l = !0), l && y(), !i.morphTargets && h.position >= 0 ? l && (Ve.bindBuffer(Ve.ARRAY_BUFFER, o.__webglVertexBuffer), x(h.position), Ve.vertexAttribPointer(h.position, 3, Ve.FLOAT, !1, 0, 0)) : a.morphTargetBase && b(i, o, a), l) {
                        if (o.__webglCustomAttributesList)
                            for (var f = 0, p = o.__webglCustomAttributesList.length; p > f; f++) {
                                var d = o.__webglCustomAttributesList[f];
                                h[d.buffer.belongsToAttribute] >= 0 && (Ve.bindBuffer(Ve.ARRAY_BUFFER, d.buffer), x(h[d.buffer.belongsToAttribute]), Ve.vertexAttribPointer(h[d.buffer.belongsToAttribute], d.size, Ve.FLOAT, !1, 0, 0))
                            }
                        h.color >= 0 && (a.geometry.colors.length > 0 || a.geometry.faces.length > 0 ? (Ve.bindBuffer(Ve.ARRAY_BUFFER, o.__webglColorBuffer), x(h.color), Ve.vertexAttribPointer(h.color, 3, Ve.FLOAT, !1, 0, 0)) : void 0 !== i.defaultAttributeValues && Ve.vertexAttrib3fv(h.color, i.defaultAttributeValues.color)), h.normal >= 0 && (Ve.bindBuffer(Ve.ARRAY_BUFFER, o.__webglNormalBuffer), x(h.normal), Ve.vertexAttribPointer(h.normal, 3, Ve.FLOAT, !1, 0, 0)), h.tangent >= 0 && (Ve.bindBuffer(Ve.ARRAY_BUFFER, o.__webglTangentBuffer), x(h.tangent), Ve.vertexAttribPointer(h.tangent, 4, Ve.FLOAT, !1, 0, 0)), h.uv >= 0 && (a.geometry.faceVertexUvs[0] ? (Ve.bindBuffer(Ve.ARRAY_BUFFER, o.__webglUVBuffer), x(h.uv), Ve.vertexAttribPointer(h.uv, 2, Ve.FLOAT, !1, 0, 0)) : void 0 !== i.defaultAttributeValues && Ve.vertexAttrib2fv(h.uv, i.defaultAttributeValues.uv)), h.uv2 >= 0 && (a.geometry.faceVertexUvs[1] ? (Ve.bindBuffer(Ve.ARRAY_BUFFER, o.__webglUV2Buffer), x(h.uv2), Ve.vertexAttribPointer(h.uv2, 2, Ve.FLOAT, !1, 0, 0)) : void 0 !== i.defaultAttributeValues && Ve.vertexAttrib2fv(h.uv2, i.defaultAttributeValues.uv2)), i.skinning && h.skinIndex >= 0 && h.skinWeight >= 0 && (Ve.bindBuffer(Ve.ARRAY_BUFFER, o.__webglSkinIndicesBuffer), x(h.skinIndex), Ve.vertexAttribPointer(h.skinIndex, 4, Ve.FLOAT, !1, 0, 0), Ve.bindBuffer(Ve.ARRAY_BUFFER, o.__webglSkinWeightsBuffer), x(h.skinWeight), Ve.vertexAttribPointer(h.skinWeight, 4, Ve.FLOAT, !1, 0, 0)), h.lineDistance >= 0 && (Ve.bindBuffer(Ve.ARRAY_BUFFER, o.__webglLineDistanceBuffer), x(h.lineDistance), Ve.vertexAttribPointer(h.lineDistance, 1, Ve.FLOAT, !1, 0, 0))
                    }
                    if (w(), a instanceof n.Mesh) {
                        var m = o.__typeArray === Uint32Array ? Ve.UNSIGNED_INT : Ve.UNSIGNED_SHORT;
                        i.wireframe ? (oe(i.wireframeLinewidth), l && Ve.bindBuffer(Ve.ELEMENT_ARRAY_BUFFER, o.__webglLineBuffer), Ve.drawElements(Ve.LINES, o.__webglLineCount, m, 0)) : (l && Ve.bindBuffer(Ve.ELEMENT_ARRAY_BUFFER, o.__webglFaceBuffer), Ve.drawElements(Ve.TRIANGLES, o.__webglFaceCount, m, 0)), Oe.info.render.calls++, Oe.info.render.vertices += o.__webglFaceCount, Oe.info.render.faces += o.__webglFaceCount / 3
                    } else if (a instanceof n.Line) {
                        var v = a.mode === n.LineStrip ? Ve.LINE_STRIP : Ve.LINES;
                        oe(i.linewidth), Ve.drawArrays(v, 0, o.__webglLineCount), Oe.info.render.calls++
                    } else a instanceof n.PointCloud && (Ve.drawArrays(Ve.POINTS, 0, o.__webglParticleCount), Oe.info.render.calls++, Oe.info.render.points += o.__webglParticleCount)
                }
            }, this.render = function(e, t, r, i) {
                if (t instanceof n.Camera == !1) return void console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");
                var o = e.fog;
                We = -1, He = -1, je = null, yt = !0, e.autoUpdate === !0 && e.updateMatrixWorld(), void 0 === t.parent && t.updateMatrixWorld(), e.traverse(function(e) {
                    e instanceof n.SkinnedMesh && e.skeleton.update()
                }), t.matrixWorldInverse.getInverse(t.matrixWorld), dt.multiplyMatrices(t.projectionMatrix, t.matrixWorldInverse), pt.setFromMatrix(dt), Re.length = 0, Ue.length = 0, Be.length = 0, ke.length = 0, ze.length = 0, T(e, e), Oe.sortObjects === !0 && (Ue.sort(_), Be.sort(M)), kt.render(e, t), Oe.info.render.calls = 0, Oe.info.render.vertices = 0, Oe.info.render.faces = 0, Oe.info.render.points = 0, this.setRenderTarget(r), (this.autoClear || i) && this.clear(this.autoClearColor, this.autoClearDepth, this.autoClearStencil);
                for (var a = 0, s = Fe.length; s > a; a++) {
                    var h = Fe[a],
                        l = h.object;
                    l.visible && (te(l, t), C(h))
                }
                if (e.overrideMaterial) {
                    var u = e.overrideMaterial;
                    this.setBlending(u.blending, u.blendEquation, u.blendSrc, u.blendDst), this.setDepthTest(u.depthTest), this.setDepthWrite(u.depthWrite), ae(u.polygonOffset, u.polygonOffsetFactor, u.polygonOffsetUnits), A(Ue, t, Re, o, !0, u), A(Be, t, Re, o, !0, u), E(Fe, "", t, Re, o, !1, u)
                } else {
                    var u = null;
                    this.setBlending(n.NoBlending), A(Ue, t, Re, o, !1, u), E(Fe, "opaque", t, Re, o, !1, u), A(Be, t, Re, o, !0, u), E(Fe, "transparent", t, Re, o, !0, u)
                }
                zt.render(e, t), Vt.render(e, t, lt, ut), r && r.generateMipmaps && r.minFilter !== n.NearestFilter && r.minFilter !== n.LinearFilter && pe(r), this.setDepthTest(!0), this.setDepthWrite(!0)
            }, this.renderImmediateObject = function(e, t, r, i, n) {
                var o = I(e, t, r, i, n);
                We = -1, Oe.setMaterialFaces(i), n.immediateRenderCallback ? n.immediateRenderCallback(o, Ve, pt) : n.render(function(e) {
                    Oe.renderBufferImmediate(e, o, i)
                })
            };
            var Kt = {},
                Zt = 0;
            this.setFaceCulling = function(e, t) {
                e === n.CullFaceNone ? Ve.disable(Ve.CULL_FACE) : (t === n.FrontFaceDirectionCW ? Ve.frontFace(Ve.CW) : Ve.frontFace(Ve.CCW), e === n.CullFaceBack ? Ve.cullFace(Ve.BACK) : e === n.CullFaceFront ? Ve.cullFace(Ve.FRONT) : Ve.cullFace(Ve.FRONT_AND_BACK), Ve.enable(Ve.CULL_FACE))
            }, this.setMaterialFaces = function(e) {
                var t = e.side === n.DoubleSide,
                    r = e.side === n.BackSide;
                qe !== t && (t ? Ve.disable(Ve.CULL_FACE) : Ve.enable(Ve.CULL_FACE), qe = t), Ye !== r && (r ? Ve.frontFace(Ve.CW) : Ve.frontFace(Ve.CCW), Ye = r)
            }, this.setDepthTest = function(e) {
                $e !== e && (e ? Ve.enable(Ve.DEPTH_TEST) : Ve.disable(Ve.DEPTH_TEST), $e = e)
            }, this.setDepthWrite = function(e) {
                et !== e && (Ve.depthMask(e), et = e)
            }, this.setBlending = function(e, t, r, i) {
                e !== Ke && (e === n.NoBlending ? Ve.disable(Ve.BLEND) : e === n.AdditiveBlending ? (Ve.enable(Ve.BLEND), Ve.blendEquation(Ve.FUNC_ADD), Ve.blendFunc(Ve.SRC_ALPHA, Ve.ONE)) : e === n.SubtractiveBlending ? (Ve.enable(Ve.BLEND), Ve.blendEquation(Ve.FUNC_ADD), Ve.blendFunc(Ve.ZERO, Ve.ONE_MINUS_SRC_COLOR)) : e === n.MultiplyBlending ? (Ve.enable(Ve.BLEND), Ve.blendEquation(Ve.FUNC_ADD), Ve.blendFunc(Ve.ZERO, Ve.SRC_COLOR)) : e === n.CustomBlending ? Ve.enable(Ve.BLEND) : (Ve.enable(Ve.BLEND), Ve.blendEquationSeparate(Ve.FUNC_ADD, Ve.FUNC_ADD), Ve.blendFuncSeparate(Ve.SRC_ALPHA, Ve.ONE_MINUS_SRC_ALPHA, Ve.ONE, Ve.ONE_MINUS_SRC_ALPHA)), Ke = e), e === n.CustomBlending ? (t !== Ze && (Ve.blendEquation(me(t)), Ze = t), (r !== Qe || i !== Je) && (Ve.blendFunc(me(r), me(i)), Qe = r, Je = i)) : (Ze = null, Qe = null, Je = null)
            }, this.uploadTexture = function(e) {
                void 0 === e.__webglInit && (e.__webglInit = !0, e.addEventListener("dispose", It), e.__webglTexture = Ve.createTexture(), Oe.info.memory.textures++), Ve.bindTexture(Ve.TEXTURE_2D, e.__webglTexture), Ve.pixelStorei(Ve.UNPACK_FLIP_Y_WEBGL, e.flipY), Ve.pixelStorei(Ve.UNPACK_PREMULTIPLY_ALPHA_WEBGL, e.premultiplyAlpha), Ve.pixelStorei(Ve.UNPACK_ALIGNMENT, e.unpackAlignment), e.image = he(e.image, Tt);
                var t = e.image,
                    r = n.Math.isPowerOfTwo(t.width) && n.Math.isPowerOfTwo(t.height),
                    i = me(e.format),
                    o = me(e.type);
                se(Ve.TEXTURE_2D, e, r);
                var a, s = e.mipmaps;
                if (e instanceof n.DataTexture)
                    if (s.length > 0 && r) {
                        for (var h = 0, l = s.length; l > h; h++) a = s[h], Ve.texImage2D(Ve.TEXTURE_2D, h, i, a.width, a.height, 0, i, o, a.data);
                        e.generateMipmaps = !1
                    } else Ve.texImage2D(Ve.TEXTURE_2D, 0, i, t.width, t.height, 0, i, o, t.data);
                else if (e instanceof n.CompressedTexture)
                    for (var h = 0, l = s.length; l > h; h++) a = s[h], e.format !== n.RGBAFormat && e.format !== n.RGBFormat ? Ft().indexOf(i) > -1 ? Ve.compressedTexImage2D(Ve.TEXTURE_2D, h, i, a.width, a.height, 0, a.data) : console.warn("Attempt to load unsupported compressed texture format") : Ve.texImage2D(Ve.TEXTURE_2D, h, i, a.width, a.height, 0, i, o, a.data);
                else if (s.length > 0 && r) {
                    for (var h = 0, l = s.length; l > h; h++) a = s[h], Ve.texImage2D(Ve.TEXTURE_2D, h, i, i, o, a);
                    e.generateMipmaps = !1
                } else Ve.texImage2D(Ve.TEXTURE_2D, 0, i, i, o, e.image);
                e.generateMipmaps && r && Ve.generateMipmap(Ve.TEXTURE_2D), e.needsUpdate = !1, e.onUpdate && e.onUpdate()
            }, this.setTexture = function(e, t) {
                Ve.activeTexture(Ve.TEXTURE0 + t), e.needsUpdate ? Oe.uploadTexture(e) : Ve.bindTexture(Ve.TEXTURE_2D, e.__webglTexture)
            }, this.setRenderTarget = function(e) {
                var t = e instanceof n.WebGLRenderTargetCube;
                if (e && void 0 === e.__webglFramebuffer) {
                    void 0 === e.depthBuffer && (e.depthBuffer = !0), void 0 === e.stencilBuffer && (e.stencilBuffer = !0), e.addEventListener("dispose", Gt), e.__webglTexture = Ve.createTexture(), Oe.info.memory.textures++;
                    var r = n.Math.isPowerOfTwo(e.width) && n.Math.isPowerOfTwo(e.height),
                        i = me(e.format),
                        o = me(e.type);
                    if (t) {
                        e.__webglFramebuffer = [], e.__webglRenderbuffer = [], Ve.bindTexture(Ve.TEXTURE_CUBE_MAP, e.__webglTexture), se(Ve.TEXTURE_CUBE_MAP, e, r);
                        for (var a = 0; 6 > a; a++) e.__webglFramebuffer[a] = Ve.createFramebuffer(), e.__webglRenderbuffer[a] = Ve.createRenderbuffer(), Ve.texImage2D(Ve.TEXTURE_CUBE_MAP_POSITIVE_X + a, 0, i, e.width, e.height, 0, i, o, null), ce(e.__webglFramebuffer[a], e, Ve.TEXTURE_CUBE_MAP_POSITIVE_X + a), fe(e.__webglRenderbuffer[a], e);
                        r && Ve.generateMipmap(Ve.TEXTURE_CUBE_MAP)
                    } else e.__webglFramebuffer = Ve.createFramebuffer(), e.shareDepthFrom ? e.__webglRenderbuffer = e.shareDepthFrom.__webglRenderbuffer : e.__webglRenderbuffer = Ve.createRenderbuffer(), Ve.bindTexture(Ve.TEXTURE_2D, e.__webglTexture), se(Ve.TEXTURE_2D, e, r), Ve.texImage2D(Ve.TEXTURE_2D, 0, i, e.width, e.height, 0, i, o, null), ce(e.__webglFramebuffer, e, Ve.TEXTURE_2D), e.shareDepthFrom ? e.depthBuffer && !e.stencilBuffer ? Ve.framebufferRenderbuffer(Ve.FRAMEBUFFER, Ve.DEPTH_ATTACHMENT, Ve.RENDERBUFFER, e.__webglRenderbuffer) : e.depthBuffer && e.stencilBuffer && Ve.framebufferRenderbuffer(Ve.FRAMEBUFFER, Ve.DEPTH_STENCIL_ATTACHMENT, Ve.RENDERBUFFER, e.__webglRenderbuffer) : fe(e.__webglRenderbuffer, e), r && Ve.generateMipmap(Ve.TEXTURE_2D);
                    t ? Ve.bindTexture(Ve.TEXTURE_CUBE_MAP, null) : Ve.bindTexture(Ve.TEXTURE_2D, null), Ve.bindRenderbuffer(Ve.RENDERBUFFER, null), Ve.bindFramebuffer(Ve.FRAMEBUFFER, null)
                }
                var s, h, l, u, c;
                e ? (s = t ? e.__webglFramebuffer[e.activeCubeFace] : e.__webglFramebuffer, h = e.width, l = e.height, u = 0, c = 0) : (s = null, h = st, l = ht, u = ot, c = at), s !== Ge && (Ve.bindFramebuffer(Ve.FRAMEBUFFER, s), Ve.viewport(u, c, h, l), Ge = s), lt = h, ut = l
            }, this.initMaterial = function() {
                console.warn("THREE.WebGLRenderer: .initMaterial() has been removed.")
            }, this.addPrePlugin = function() {
                console.warn("THREE.WebGLRenderer: .addPrePlugin() has been removed.")
            }, this.addPostPlugin = function() {
                console.warn("THREE.WebGLRenderer: .addPostPlugin() has been removed.")
            }, this.updateShadowMap = function() {
                console.warn("THREE.WebGLRenderer: .updateShadowMap() has been removed.")
            }
        }, n.WebGLRenderTarget = function(e, t, r) {
            this.width = e, this.height = t, r = r || {}, this.wrapS = void 0 !== r.wrapS ? r.wrapS : n.ClampToEdgeWrapping, this.wrapT = void 0 !== r.wrapT ? r.wrapT : n.ClampToEdgeWrapping, this.magFilter = void 0 !== r.magFilter ? r.magFilter : n.LinearFilter, this.minFilter = void 0 !== r.minFilter ? r.minFilter : n.LinearMipMapLinearFilter, this.anisotropy = void 0 !== r.anisotropy ? r.anisotropy : 1, this.offset = new n.Vector2(0, 0), this.repeat = new n.Vector2(1, 1), this.format = void 0 !== r.format ? r.format : n.RGBAFormat, this.type = void 0 !== r.type ? r.type : n.UnsignedByteType, this.depthBuffer = void 0 !== r.depthBuffer ? r.depthBuffer : !0, this.stencilBuffer = void 0 !== r.stencilBuffer ? r.stencilBuffer : !0, this.generateMipmaps = !0, this.shareDepthFrom = null
        }, n.WebGLRenderTarget.prototype = {
            constructor: n.WebGLRenderTarget,
            setSize: function(e, t) {
                this.width = e, this.height = t
            },
            clone: function() {
                var e = new n.WebGLRenderTarget(this.width, this.height);
                return e.wrapS = this.wrapS, e.wrapT = this.wrapT, e.magFilter = this.magFilter, e.minFilter = this.minFilter, e.anisotropy = this.anisotropy, e.offset.copy(this.offset), e.repeat.copy(this.repeat), e.format = this.format, e.type = this.type, e.depthBuffer = this.depthBuffer, e.stencilBuffer = this.stencilBuffer, e.generateMipmaps = this.generateMipmaps, e.shareDepthFrom = this.shareDepthFrom, e
            },
            dispose: function() {
                this.dispatchEvent({
                    type: "dispose"
                })
            }
        }, n.EventDispatcher.prototype.apply(n.WebGLRenderTarget.prototype), n.WebGLRenderTargetCube = function(e, t, r) {
            n.WebGLRenderTarget.call(this, e, t, r), this.activeCubeFace = 0
        }, n.WebGLRenderTargetCube.prototype = Object.create(n.WebGLRenderTarget.prototype), n.WebGLExtensions = function(e) {
            var t = {};
            this.get = function(r) {
                if (void 0 !== t[r]) return t[r];
                var i;
                switch (r) {
                    case "OES_texture_float":
                        i = e.getExtension("OES_texture_float");
                        break;
                    case "OES_texture_float_linear":
                        i = e.getExtension("OES_texture_float_linear");
                        break;
                    case "OES_standard_derivatives":
                        i = e.getExtension("OES_standard_derivatives");
                        break;
                    case "EXT_texture_filter_anisotropic":
                        i = e.getExtension("EXT_texture_filter_anisotropic") || e.getExtension("MOZ_EXT_texture_filter_anisotropic") || e.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
                        break;
                    case "WEBGL_compressed_texture_s3tc":
                        i = e.getExtension("WEBGL_compressed_texture_s3tc") || e.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || e.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
                        break;
                    case "WEBGL_compressed_texture_pvrtc":
                        i = e.getExtension("WEBGL_compressed_texture_pvrtc") || e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
                        break;
                    case "OES_element_index_uint":
                        i = e.getExtension("OES_element_index_uint");
                        break;
                    case "EXT_blend_minmax":
                        i = e.getExtension("EXT_blend_minmax");
                        break;
                    case "EXT_frag_depth":
                        i = e.getExtension("EXT_frag_depth")
                }
                return null === i && console.log("THREE.WebGLRenderer: " + r + " extension not supported."), t[r] = i, i
            }
        }, n.WebGLProgram = function() {
            var e = 0,
                t = function(e) {
                    var t, r, i = [];
                    for (var n in e) t = e[n], t !== !1 && (r = "#define " + n + " " + t, i.push(r));
                    return i.join("\n")
                },
                r = function(e, t, r) {
                    for (var i = {}, n = 0, o = r.length; o > n; n++) {
                        var a = r[n];
                        i[a] = e.getUniformLocation(t, a)
                    }
                    return i
                },
                i = function(e, t, r) {
                    for (var i = {}, n = 0, o = r.length; o > n; n++) {
                        var a = r[n];
                        i[a] = e.getAttribLocation(t, a)
                    }
                    return i
                };
            return function(o, a, s, h) {
                var l = o,
                    u = l.context,
                    c = s.defines,
                    f = s.__webglShader.uniforms,
                    p = s.attributes,
                    d = s.__webglShader.vertexShader,
                    m = s.__webglShader.fragmentShader,
                    v = s.index0AttributeName;
                void 0 === v && h.morphTargets === !0 && (v = "position");
                var g = "SHADOWMAP_TYPE_BASIC";
                h.shadowMapType === n.PCFShadowMap ? g = "SHADOWMAP_TYPE_PCF" : h.shadowMapType === n.PCFSoftShadowMap && (g = "SHADOWMAP_TYPE_PCF_SOFT");
                var y, x, w = t(c),
                    b = u.createProgram();
                s instanceof n.RawShaderMaterial ? (y = "", x = "") : (y = ["precision " + h.precision + " float;", "precision " + h.precision + " int;", w, h.supportsVertexTextures ? "#define VERTEX_TEXTURES" : "", l.gammaInput ? "#define GAMMA_INPUT" : "", l.gammaOutput ? "#define GAMMA_OUTPUT" : "", "#define MAX_DIR_LIGHTS " + h.maxDirLights, "#define MAX_POINT_LIGHTS " + h.maxPointLights, "#define MAX_SPOT_LIGHTS " + h.maxSpotLights, "#define MAX_HEMI_LIGHTS " + h.maxHemiLights, "#define MAX_SHADOWS " + h.maxShadows, "#define MAX_BONES " + h.maxBones, h.map ? "#define USE_MAP" : "", h.envMap ? "#define USE_ENVMAP" : "", h.lightMap ? "#define USE_LIGHTMAP" : "", h.bumpMap ? "#define USE_BUMPMAP" : "", h.normalMap ? "#define USE_NORMALMAP" : "", h.specularMap ? "#define USE_SPECULARMAP" : "", h.alphaMap ? "#define USE_ALPHAMAP" : "", h.vertexColors ? "#define USE_COLOR" : "", h.skinning ? "#define USE_SKINNING" : "", h.useVertexTexture ? "#define BONE_TEXTURE" : "", h.morphTargets ? "#define USE_MORPHTARGETS" : "", h.morphNormals ? "#define USE_MORPHNORMALS" : "", h.wrapAround ? "#define WRAP_AROUND" : "", h.doubleSided ? "#define DOUBLE_SIDED" : "", h.flipSided ? "#define FLIP_SIDED" : "", h.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", h.shadowMapEnabled ? "#define " + g : "", h.shadowMapDebug ? "#define SHADOWMAP_DEBUG" : "", h.shadowMapCascade ? "#define SHADOWMAP_CASCADE" : "", h.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "", h.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", "uniform mat4 modelMatrix;", "uniform mat4 modelViewMatrix;", "uniform mat4 projectionMatrix;", "uniform mat4 viewMatrix;", "uniform mat3 normalMatrix;", "uniform vec3 cameraPosition;", "attribute vec3 position;", "attribute vec3 normal;", "attribute vec2 uv;", "attribute vec2 uv2;", "#ifdef USE_COLOR", "    attribute vec3 color;", "#endif", "#ifdef USE_MORPHTARGETS", "  attribute vec3 morphTarget0;", "    attribute vec3 morphTarget1;", "    attribute vec3 morphTarget2;", "    attribute vec3 morphTarget3;", "    #ifdef USE_MORPHNORMALS", "     attribute vec3 morphNormal0;", "        attribute vec3 morphNormal1;", "        attribute vec3 morphNormal2;", "        attribute vec3 morphNormal3;", "    #else", "       attribute vec3 morphTarget4;", "        attribute vec3 morphTarget5;", "        attribute vec3 morphTarget6;", "        attribute vec3 morphTarget7;", "    #endif", "#endif", "#ifdef USE_SKINNING", " attribute vec4 skinIndex;", "   attribute vec4 skinWeight;", "#endif", ""].join("\n"), x = ["precision " + h.precision + " float;", "precision " + h.precision + " int;", h.bumpMap || h.normalMap ? "#extension GL_OES_standard_derivatives : enable" : "", w, "#define MAX_DIR_LIGHTS " + h.maxDirLights, "#define MAX_POINT_LIGHTS " + h.maxPointLights, "#define MAX_SPOT_LIGHTS " + h.maxSpotLights, "#define MAX_HEMI_LIGHTS " + h.maxHemiLights, "#define MAX_SHADOWS " + h.maxShadows, h.alphaTest ? "#define ALPHATEST " + h.alphaTest : "", l.gammaInput ? "#define GAMMA_INPUT" : "", l.gammaOutput ? "#define GAMMA_OUTPUT" : "", h.useFog && h.fog ? "#define USE_FOG" : "", h.useFog && h.fogExp ? "#define FOG_EXP2" : "", h.map ? "#define USE_MAP" : "", h.envMap ? "#define USE_ENVMAP" : "", h.lightMap ? "#define USE_LIGHTMAP" : "", h.bumpMap ? "#define USE_BUMPMAP" : "", h.normalMap ? "#define USE_NORMALMAP" : "", h.specularMap ? "#define USE_SPECULARMAP" : "", h.alphaMap ? "#define USE_ALPHAMAP" : "", h.vertexColors ? "#define USE_COLOR" : "", h.metal ? "#define METAL" : "", h.wrapAround ? "#define WRAP_AROUND" : "", h.doubleSided ? "#define DOUBLE_SIDED" : "", h.flipSided ? "#define FLIP_SIDED" : "", h.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", h.shadowMapEnabled ? "#define " + g : "", h.shadowMapDebug ? "#define SHADOWMAP_DEBUG" : "", h.shadowMapCascade ? "#define SHADOWMAP_CASCADE" : "", h.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", "uniform mat4 viewMatrix;", "uniform vec3 cameraPosition;", ""].join("\n"));
                var _ = new n.WebGLShader(u, u.VERTEX_SHADER, y + d),
                    M = new n.WebGLShader(u, u.FRAGMENT_SHADER, x + m);
                u.attachShader(b, _), u.attachShader(b, M), void 0 !== v && u.bindAttribLocation(b, 0, v), u.linkProgram(b), u.getProgramParameter(b, u.LINK_STATUS) === !1 && (console.error("THREE.WebGLProgram: Could not initialise shader."), console.error("gl.VALIDATE_STATUS", u.getProgramParameter(b, u.VALIDATE_STATUS)), console.error("gl.getError()", u.getError())), "" !== u.getProgramInfoLog(b) && console.warn("THREE.WebGLProgram: gl.getProgramInfoLog()", u.getProgramInfoLog(b)), u.deleteShader(_), u.deleteShader(M);
                var S = ["viewMatrix", "modelViewMatrix", "projectionMatrix", "normalMatrix", "modelMatrix", "cameraPosition", "morphTargetInfluences", "bindMatrix", "bindMatrixInverse"];
                h.useVertexTexture ? (S.push("boneTexture"), S.push("boneTextureWidth"), S.push("boneTextureHeight")) : S.push("boneGlobalMatrices"), h.logarithmicDepthBuffer && S.push("logDepthBufFC");
                for (var T in f) S.push(T);
                this.uniforms = r(u, b, S), S = ["position", "normal", "uv", "uv2", "tangent", "color", "skinIndex", "skinWeight", "lineDistance"];
                for (var A = 0; A < h.maxMorphTargets; A++) S.push("morphTarget" + A);
                for (var A = 0; A < h.maxMorphNormals; A++) S.push("morphNormal" + A);
                for (var E in p) S.push(E);
                return this.attributes = i(u, b, S), this.attributesKeys = Object.keys(this.attributes), this.id = e++, this.code = a, this.usedTimes = 1, this.program = b, this.vertexShader = _, this.fragmentShader = M, this
            }
        }(), n.WebGLShader = function() {
            var e = function(e) {
                for (var t = e.split("\n"), r = 0; r < t.length; r++) t[r] = r + 1 + ": " + t[r];
                return t.join("\n")
            };
            return function(t, r, i) {
                var n = t.createShader(r);
                return t.shaderSource(n, i), t.compileShader(n), t.getShaderParameter(n, t.COMPILE_STATUS) === !1 && console.error("THREE.WebGLShader: Shader couldn't compile."), "" !== t.getShaderInfoLog(n) && (console.warn("THREE.WebGLShader: gl.getShaderInfoLog()", t.getShaderInfoLog(n)), console.warn(e(i))), n
            }
        }(), n.LensFlarePlugin = function(e, t) {
            function r(t) {
                var r = f.createProgram(),
                    i = f.createShader(f.FRAGMENT_SHADER),
                    n = f.createShader(f.VERTEX_SHADER),
                    o = "precision " + e.getPrecision() + " float;\n";
                return f.shaderSource(i, o + t.fragmentShader), f.shaderSource(n, o + t.vertexShader), f.compileShader(i), f.compileShader(n), f.attachShader(r, i), f.attachShader(r, n), f.linkProgram(r), r
            }
            var i, o, a, s, h, l, u, c, f = e.context,
                p = function() {
                    var e = new Float32Array([-1, -1, 0, 0, 1, -1, 1, 0, 1, 1, 1, 1, -1, 1, 0, 1]),
                        t = new Uint16Array([0, 1, 2, 0, 2, 3]);
                    i = f.createBuffer(), o = f.createBuffer(), f.bindBuffer(f.ARRAY_BUFFER, i), f.bufferData(f.ARRAY_BUFFER, e, f.STATIC_DRAW), f.bindBuffer(f.ELEMENT_ARRAY_BUFFER, o), f.bufferData(f.ELEMENT_ARRAY_BUFFER, t, f.STATIC_DRAW), u = f.createTexture(), c = f.createTexture(), f.bindTexture(f.TEXTURE_2D, u), f.texImage2D(f.TEXTURE_2D, 0, f.RGB, 16, 16, 0, f.RGB, f.UNSIGNED_BYTE, null), f.texParameteri(f.TEXTURE_2D, f.TEXTURE_WRAP_S, f.CLAMP_TO_EDGE), f.texParameteri(f.TEXTURE_2D, f.TEXTURE_WRAP_T, f.CLAMP_TO_EDGE), f.texParameteri(f.TEXTURE_2D, f.TEXTURE_MAG_FILTER, f.NEAREST), f.texParameteri(f.TEXTURE_2D, f.TEXTURE_MIN_FILTER, f.NEAREST), f.bindTexture(f.TEXTURE_2D, c), f.texImage2D(f.TEXTURE_2D, 0, f.RGBA, 16, 16, 0, f.RGBA, f.UNSIGNED_BYTE, null), f.texParameteri(f.TEXTURE_2D, f.TEXTURE_WRAP_S, f.CLAMP_TO_EDGE), f.texParameteri(f.TEXTURE_2D, f.TEXTURE_WRAP_T, f.CLAMP_TO_EDGE), f.texParameteri(f.TEXTURE_2D, f.TEXTURE_MAG_FILTER, f.NEAREST), f.texParameteri(f.TEXTURE_2D, f.TEXTURE_MIN_FILTER, f.NEAREST), l = f.getParameter(f.MAX_VERTEX_TEXTURE_IMAGE_UNITS) > 0;
                    var n;
                    n = l ? {
                        vertexShader: ["uniform lowp int renderType;", "uniform vec3 screenPosition;", "uniform vec2 scale;", "uniform float rotation;", "uniform sampler2D occlusionMap;", "attribute vec2 position;", "attribute vec2 uv;", "varying vec2 vUV;", "varying float vVisibility;", "void main() {", "vUV = uv;", "vec2 pos = position;", "if( renderType == 2 ) {", "vec4 visibility = texture2D( occlusionMap, vec2( 0.1, 0.1 ) );", "visibility += texture2D( occlusionMap, vec2( 0.5, 0.1 ) );", "visibility += texture2D( occlusionMap, vec2( 0.9, 0.1 ) );", "visibility += texture2D( occlusionMap, vec2( 0.9, 0.5 ) );", "visibility += texture2D( occlusionMap, vec2( 0.9, 0.9 ) );", "visibility += texture2D( occlusionMap, vec2( 0.5, 0.9 ) );", "visibility += texture2D( occlusionMap, vec2( 0.1, 0.9 ) );", "visibility += texture2D( occlusionMap, vec2( 0.1, 0.5 ) );", "visibility += texture2D( occlusionMap, vec2( 0.5, 0.5 ) );", "vVisibility =        visibility.r / 9.0;", "vVisibility *= 1.0 - visibility.g / 9.0;", "vVisibility *=       visibility.b / 9.0;", "vVisibility *= 1.0 - visibility.a / 9.0;", "pos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;", "pos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;", "}", "gl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );", "}"].join("\n"),
                        fragmentShader: ["uniform lowp int renderType;", "uniform sampler2D map;", "uniform float opacity;", "uniform vec3 color;", "varying vec2 vUV;", "varying float vVisibility;", "void main() {", "if( renderType == 0 ) {", "gl_FragColor = vec4( 1.0, 0.0, 1.0, 0.0 );", "} else if( renderType == 1 ) {", "gl_FragColor = texture2D( map, vUV );", "} else {", "vec4 texture = texture2D( map, vUV );", "texture.a *= opacity * vVisibility;", "gl_FragColor = texture;", "gl_FragColor.rgb *= color;", "}", "}"].join("\n")
                    } : {
                        vertexShader: ["uniform lowp int renderType;", "uniform vec3 screenPosition;", "uniform vec2 scale;", "uniform float rotation;", "attribute vec2 position;", "attribute vec2 uv;", "varying vec2 vUV;", "void main() {", "vUV = uv;", "vec2 pos = position;", "if( renderType == 2 ) {", "pos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;", "pos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;", "}", "gl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );", "}"].join("\n"),
                        fragmentShader: ["precision mediump float;", "uniform lowp int renderType;", "uniform sampler2D map;", "uniform sampler2D occlusionMap;", "uniform float opacity;", "uniform vec3 color;", "varying vec2 vUV;", "void main() {", "if( renderType == 0 ) {", "gl_FragColor = vec4( texture2D( map, vUV ).rgb, 0.0 );", "} else if( renderType == 1 ) {", "gl_FragColor = texture2D( map, vUV );", "} else {", "float visibility = texture2D( occlusionMap, vec2( 0.5, 0.1 ) ).a;", "visibility += texture2D( occlusionMap, vec2( 0.9, 0.5 ) ).a;", "visibility += texture2D( occlusionMap, vec2( 0.5, 0.9 ) ).a;", "visibility += texture2D( occlusionMap, vec2( 0.1, 0.5 ) ).a;", "visibility = ( 1.0 - visibility / 4.0 );", "vec4 texture = texture2D( map, vUV );", "texture.a *= opacity * visibility;", "gl_FragColor = texture;", "gl_FragColor.rgb *= color;", "}", "}"].join("\n")
                    }, a = r(n), s = {
                        vertex: f.getAttribLocation(a, "position"),
                        uv: f.getAttribLocation(a, "uv")
                    }, h = {
                        renderType: f.getUniformLocation(a, "renderType"),
                        map: f.getUniformLocation(a, "map"),
                        occlusionMap: f.getUniformLocation(a, "occlusionMap"),
                        opacity: f.getUniformLocation(a, "opacity"),
                        color: f.getUniformLocation(a, "color"),
                        scale: f.getUniformLocation(a, "scale"),
                        rotation: f.getUniformLocation(a, "rotation"),
                        screenPosition: f.getUniformLocation(a, "screenPosition")
                    }
                };
            this.render = function(r, d, m, v) {
                if (0 !== t.length) {
                    var g = new n.Vector3,
                        y = v / m,
                        x = .5 * m,
                        w = .5 * v,
                        b = 16 / v,
                        _ = new n.Vector2(b * y, b),
                        M = new n.Vector3(1, 1, 0),
                        S = new n.Vector2(1, 1);
                    void 0 === a && p(), f.useProgram(a), f.enableVertexAttribArray(s.vertex), f.enableVertexAttribArray(s.uv), f.uniform1i(h.occlusionMap, 0), f.uniform1i(h.map, 1), f.bindBuffer(f.ARRAY_BUFFER, i), f.vertexAttribPointer(s.vertex, 2, f.FLOAT, !1, 16, 0), f.vertexAttribPointer(s.uv, 2, f.FLOAT, !1, 16, 8), f.bindBuffer(f.ELEMENT_ARRAY_BUFFER, o), f.disable(f.CULL_FACE), f.depthMask(!1);
                    for (var T = 0, A = t.length; A > T; T++) {
                        b = 16 / v, _.set(b * y, b);
                        var E = t[T];
                        if (g.set(E.matrixWorld.elements[12], E.matrixWorld.elements[13], E.matrixWorld.elements[14]), g.applyMatrix4(d.matrixWorldInverse), g.applyProjection(d.projectionMatrix), M.copy(g), S.x = M.x * x + x, S.y = M.y * w + w, l || S.x > 0 && S.x < m && S.y > 0 && S.y < v) {
                            f.activeTexture(f.TEXTURE1), f.bindTexture(f.TEXTURE_2D, u), f.copyTexImage2D(f.TEXTURE_2D, 0, f.RGB, S.x - 8, S.y - 8, 16, 16, 0), f.uniform1i(h.renderType, 0), f.uniform2f(h.scale, _.x, _.y), f.uniform3f(h.screenPosition, M.x, M.y, M.z), f.disable(f.BLEND), f.enable(f.DEPTH_TEST), f.drawElements(f.TRIANGLES, 6, f.UNSIGNED_SHORT, 0), f.activeTexture(f.TEXTURE0), f.bindTexture(f.TEXTURE_2D, c), f.copyTexImage2D(f.TEXTURE_2D, 0, f.RGBA, S.x - 8, S.y - 8, 16, 16, 0), f.uniform1i(h.renderType, 1), f.disable(f.DEPTH_TEST), f.activeTexture(f.TEXTURE1), f.bindTexture(f.TEXTURE_2D, u), f.drawElements(f.TRIANGLES, 6, f.UNSIGNED_SHORT, 0), E.positionScreen.copy(M), E.customUpdateCallback ? E.customUpdateCallback(E) : E.updateLensFlares(), f.uniform1i(h.renderType, 2), f.enable(f.BLEND);
                            for (var C = 0, L = E.lensFlares.length; L > C; C++) {
                                var P = E.lensFlares[C];
                                P.opacity > .001 && P.scale > .001 && (M.x = P.x, M.y = P.y, M.z = P.z, b = P.size * P.scale / v, _.x = b * y, _.y = b, f.uniform3f(h.screenPosition, M.x, M.y, M.z), f.uniform2f(h.scale, _.x, _.y), f.uniform1f(h.rotation, P.rotation), f.uniform1f(h.opacity, P.opacity), f.uniform3f(h.color, P.color.r, P.color.g, P.color.b), e.setBlending(P.blending, P.blendEquation, P.blendSrc, P.blendDst), e.setTexture(P.texture, 1), f.drawElements(f.TRIANGLES, 6, f.UNSIGNED_SHORT, 0))
                            }
                        }
                    }
                    f.enable(f.CULL_FACE), f.enable(f.DEPTH_TEST), f.depthMask(!0), e.resetGLState()
                }
            }
        }, n.ShadowMapPlugin = function(e, t, r, i) {
            function o(e, t, i) {
                if (t.visible) {
                    var n = r[t.id];
                    if (n && t.castShadow && (t.frustumCulled === !1 || m.intersectsObject(t) === !0))
                        for (var a = 0, s = n.length; s > a; a++) {
                            var h = n[a];
                            t._modelViewMatrix.multiplyMatrices(i.matrixWorldInverse, t.matrixWorld), w.push(h)
                        }
                    for (var a = 0, s = t.children.length; s > a; a++) o(e, t.children[a], i)
                }
            }

            function a(e, t) {
                var r = new n.DirectionalLight;
                r.isVirtual = !0, r.onlyShadow = !0, r.castShadow = !0, r.shadowCameraNear = e.shadowCameraNear, r.shadowCameraFar = e.shadowCameraFar, r.shadowCameraLeft = e.shadowCameraLeft, r.shadowCameraRight = e.shadowCameraRight, r.shadowCameraBottom = e.shadowCameraBottom, r.shadowCameraTop = e.shadowCameraTop, r.shadowCameraVisible = e.shadowCameraVisible, r.shadowDarkness = e.shadowDarkness, r.shadowBias = e.shadowCascadeBias[t], r.shadowMapWidth = e.shadowCascadeWidth[t], r.shadowMapHeight = e.shadowCascadeHeight[t], r.pointsWorld = [], r.pointsFrustum = [];
                for (var i = r.pointsWorld, o = r.pointsFrustum, a = 0; 8 > a; a++) i[a] = new n.Vector3, o[a] = new n.Vector3;
                var s = e.shadowCascadeNearZ[t],
                    h = e.shadowCascadeFarZ[t];
                return o[0].set(-1, -1, s), o[1].set(1, -1, s), o[2].set(-1, 1, s), o[3].set(1, 1, s), o[4].set(-1, -1, h), o[5].set(1, -1, h), o[6].set(-1, 1, h), o[7].set(1, 1, h), r
            }

            function s(e, t) {
                var r = e.shadowCascadeArray[t];
                r.position.copy(e.position), r.target.position.copy(e.target.position), r.lookAt(r.target), r.shadowCameraVisible = e.shadowCameraVisible, r.shadowDarkness = e.shadowDarkness, r.shadowBias = e.shadowCascadeBias[t];
                var i = e.shadowCascadeNearZ[t],
                    n = e.shadowCascadeFarZ[t],
                    o = r.pointsFrustum;
                o[0].z = i, o[1].z = i, o[2].z = i, o[3].z = i, o[4].z = n, o[5].z = n, o[6].z = n, o[7].z = n
            }

            function h(e, t) {
                var r = t.shadowCamera,
                    i = t.pointsFrustum,
                    n = t.pointsWorld;
                g.set(1 / 0, 1 / 0, 1 / 0), y.set(-(1 / 0), -(1 / 0), -(1 / 0));
                for (var o = 0; 8 > o; o++) {
                    var a = n[o];
                    a.copy(i[o]), a.unproject(e), a.applyMatrix4(r.matrixWorldInverse), a.x < g.x && (g.x = a.x), a.x > y.x && (y.x = a.x), a.y < g.y && (g.y = a.y), a.y > y.y && (y.y = a.y), a.z < g.z && (g.z = a.z), a.z > y.z && (y.z = a.z)
                }
                r.left = g.x, r.right = y.x, r.top = y.y, r.bottom = g.y, r.updateProjectionMatrix()
            }

            function l(e) {
                return e.material instanceof n.MeshFaceMaterial ? e.material.materials[0] : e.material
            }
            var u, c, f, p, d = e.context,
                m = new n.Frustum,
                v = new n.Matrix4,
                g = new n.Vector3,
                y = new n.Vector3,
                x = new n.Vector3,
                w = [],
                b = n.ShaderLib.depthRGBA,
                _ = n.UniformsUtils.clone(b.uniforms);
            u = new n.ShaderMaterial({
                uniforms: _,
                vertexShader: b.vertexShader,
                fragmentShader: b.fragmentShader
            }), c = new n.ShaderMaterial({
                uniforms: _,
                vertexShader: b.vertexShader,
                fragmentShader: b.fragmentShader,
                morphTargets: !0
            }), f = new n.ShaderMaterial({
                uniforms: _,
                vertexShader: b.vertexShader,
                fragmentShader: b.fragmentShader,
                skinning: !0
            }), p = new n.ShaderMaterial({
                uniforms: _,
                vertexShader: b.vertexShader,
                fragmentShader: b.fragmentShader,
                morphTargets: !0,
                skinning: !0
            }), u._shadowPass = !0, c._shadowPass = !0, f._shadowPass = !0, p._shadowPass = !0, this.render = function(r, g) {
                if (e.shadowMapEnabled !== !1) {
                    var y, b, _, M, S, T, A, E, C, L, P, R, D, F = [],
                        U = 0,
                        B = null;
                    for (d.clearColor(1, 1, 1, 1), d.disable(d.BLEND), d.enable(d.CULL_FACE), d.frontFace(d.CCW), e.shadowMapCullFace === n.CullFaceFront ? d.cullFace(d.FRONT) : d.cullFace(d.BACK), e.setDepthTest(!0), y = 0, b = t.length; b > y; y++)
                        if (D = t[y], D.castShadow)
                            if (D instanceof n.DirectionalLight && D.shadowCascade)
                                for (S = 0; S < D.shadowCascadeCount; S++) {
                                    var k;
                                    if (D.shadowCascadeArray[S]) k = D.shadowCascadeArray[S];
                                    else {
                                        k = a(D, S), k.originalCamera = g;
                                        var z = new n.Gyroscope;
                                        z.position.copy(D.shadowCascadeOffset), z.add(k), z.add(k.target), g.add(z), D.shadowCascadeArray[S] = k, console.log("Created virtualLight", k)
                                    }
                                    s(D, S), F[U] = k, U++
                                } else F[U] = D, U++;
                    for (y = 0, b = F.length; b > y; y++) {
                        if (D = F[y], !D.shadowMap) {
                            var V = n.LinearFilter;
                            e.shadowMapType === n.PCFSoftShadowMap && (V = n.NearestFilter);
                            var O = {
                                minFilter: V,
                                magFilter: V,
                                format: n.RGBAFormat
                            };
                            D.shadowMap = new n.WebGLRenderTarget(D.shadowMapWidth, D.shadowMapHeight, O), D.shadowMapSize = new n.Vector2(D.shadowMapWidth, D.shadowMapHeight), D.shadowMatrix = new n.Matrix4
                        }
                        if (!D.shadowCamera) {
                            if (D instanceof n.SpotLight) D.shadowCamera = new n.PerspectiveCamera(D.shadowCameraFov, D.shadowMapWidth / D.shadowMapHeight, D.shadowCameraNear, D.shadowCameraFar);
                            else {
                                if (!(D instanceof n.DirectionalLight)) {
                                    console.error("Unsupported light type for shadow");
                                    continue
                                }
                                D.shadowCamera = new n.OrthographicCamera(D.shadowCameraLeft, D.shadowCameraRight, D.shadowCameraTop, D.shadowCameraBottom, D.shadowCameraNear, D.shadowCameraFar)
                            }
                            r.add(D.shadowCamera), r.autoUpdate === !0 && r.updateMatrixWorld()
                        }
                        D.shadowCameraVisible && !D.cameraHelper && (D.cameraHelper = new n.CameraHelper(D.shadowCamera), r.add(D.cameraHelper)), D.isVirtual && k.originalCamera == g && h(g, D), T = D.shadowMap, A = D.shadowMatrix, E = D.shadowCamera, E.position.setFromMatrixPosition(D.matrixWorld), x.setFromMatrixPosition(D.target.matrixWorld), E.lookAt(x), E.updateMatrixWorld(), E.matrixWorldInverse.getInverse(E.matrixWorld), D.cameraHelper && (D.cameraHelper.visible = D.shadowCameraVisible), D.shadowCameraVisible && D.cameraHelper.update(), A.set(.5, 0, 0, .5, 0, .5, 0, .5, 0, 0, .5, .5, 0, 0, 0, 1), A.multiply(E.projectionMatrix), A.multiply(E.matrixWorldInverse), v.multiplyMatrices(E.projectionMatrix, E.matrixWorldInverse), m.setFromMatrix(v), e.setRenderTarget(T), e.clear(), w.length = 0, o(r, r, E);
                        var N, I, G;
                        for (_ = 0, M = w.length; M > _; _++) P = w[_], R = P.object, C = P.buffer, N = l(R), I = void 0 !== R.geometry.morphTargets && R.geometry.morphTargets.length > 0 && N.morphTargets, G = R instanceof n.SkinnedMesh && N.skinning, L = R.customDepthMaterial ? R.customDepthMaterial : G ? I ? p : f : I ? c : u, e.setMaterialFaces(N), C instanceof n.BufferGeometry ? e.renderBufferDirect(E, t, B, L, C, R) : e.renderBuffer(E, t, B, L, C, R);
                        for (_ = 0, M = i.length; M > _; _++) P = i[_], R = P.object, R.visible && R.castShadow && (R._modelViewMatrix.multiplyMatrices(E.matrixWorldInverse, R.matrixWorld), e.renderImmediateObject(E, t, B, u, R))
                    }
                    var H = e.getClearColor(),
                        W = e.getClearAlpha();
                    d.clearColor(H.r, H.g, H.b, W), d.enable(d.BLEND), e.shadowMapCullFace === n.CullFaceFront && d.cullFace(d.BACK), e.resetGLState()
                }
            }
        }, n.SpritePlugin = function(e, t) {
            function r() {
                var t = c.createProgram(),
                    r = c.createShader(c.VERTEX_SHADER),
                    i = c.createShader(c.FRAGMENT_SHADER);
                return c.shaderSource(r, ["precision " + e.getPrecision() + " float;", "uniform mat4 modelViewMatrix;", "uniform mat4 projectionMatrix;", "uniform float rotation;", "uniform vec2 scale;", "uniform vec2 uvOffset;", "uniform vec2 uvScale;", "attribute vec2 position;", "attribute vec2 uv;", "varying vec2 vUV;", "void main() {", "vUV = uvOffset + uv * uvScale;", "vec2 alignedPosition = position * scale;", "vec2 rotatedPosition;", "rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;", "rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;", "vec4 finalPosition;", "finalPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );", "finalPosition.xy += rotatedPosition;", "finalPosition = projectionMatrix * finalPosition;", "gl_Position = finalPosition;", "}"].join("\n")), c.shaderSource(i, ["precision " + e.getPrecision() + " float;", "uniform vec3 color;", "uniform sampler2D map;", "uniform float opacity;", "uniform int fogType;", "uniform vec3 fogColor;", "uniform float fogDensity;", "uniform float fogNear;", "uniform float fogFar;", "uniform float alphaTest;", "varying vec2 vUV;", "void main() {", "vec4 texture = texture2D( map, vUV );", "if ( texture.a < alphaTest ) discard;", "gl_FragColor = vec4( color * texture.xyz, texture.a * opacity );", "if ( fogType > 0 ) {", "float depth = gl_FragCoord.z / gl_FragCoord.w;", "float fogFactor = 0.0;", "if ( fogType == 1 ) {", "fogFactor = smoothstep( fogNear, fogFar, depth );", "} else {", "const float LOG2 = 1.442695;", "float fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );", "fogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );", "}", "gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );", "}", "}"].join("\n")), c.compileShader(r), c.compileShader(i), c.attachShader(t, r), c.attachShader(t, i), c.linkProgram(t), t
            }

            function i(e, t) {
                return e.z !== t.z ? t.z - e.z : t.id - e.id
            }
            var o, a, s, h, l, u, c = e.context,
                f = function() {
                    var e = new Float32Array([-.5, -.5, 0, 0, .5, -.5, 1, 0, .5, .5, 1, 1, -.5, .5, 0, 1]),
                        t = new Uint16Array([0, 1, 2, 0, 2, 3]);
                    o = c.createBuffer(), a = c.createBuffer(), c.bindBuffer(c.ARRAY_BUFFER, o), c.bufferData(c.ARRAY_BUFFER, e, c.STATIC_DRAW), c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, a), c.bufferData(c.ELEMENT_ARRAY_BUFFER, t, c.STATIC_DRAW), s = r(), h = {
                        position: c.getAttribLocation(s, "position"),
                        uv: c.getAttribLocation(s, "uv")
                    }, l = {
                        uvOffset: c.getUniformLocation(s, "uvOffset"),
                        uvScale: c.getUniformLocation(s, "uvScale"),
                        rotation: c.getUniformLocation(s, "rotation"),
                        scale: c.getUniformLocation(s, "scale"),
                        color: c.getUniformLocation(s, "color"),
                        map: c.getUniformLocation(s, "map"),
                        opacity: c.getUniformLocation(s, "opacity"),
                        modelViewMatrix: c.getUniformLocation(s, "modelViewMatrix"),
                        projectionMatrix: c.getUniformLocation(s, "projectionMatrix"),
                        fogType: c.getUniformLocation(s, "fogType"),
                        fogDensity: c.getUniformLocation(s, "fogDensity"),
                        fogNear: c.getUniformLocation(s, "fogNear"),
                        fogFar: c.getUniformLocation(s, "fogFar"),
                        fogColor: c.getUniformLocation(s, "fogColor"),
                        alphaTest: c.getUniformLocation(s, "alphaTest")
                    };
                    var i = document.createElement("canvas");
                    i.width = 8, i.height = 8;
                    var f = i.getContext("2d");
                    f.fillStyle = "white", f.fillRect(0, 0, 8, 8), u = new n.Texture(i), u.needsUpdate = !0
                };
            this.render = function(r, p) {
                if (0 !== t.length) {
                    void 0 === s && f(), c.useProgram(s), c.enableVertexAttribArray(h.position), c.enableVertexAttribArray(h.uv), c.disable(c.CULL_FACE), c.enable(c.BLEND), c.bindBuffer(c.ARRAY_BUFFER, o), c.vertexAttribPointer(h.position, 2, c.FLOAT, !1, 16, 0), c.vertexAttribPointer(h.uv, 2, c.FLOAT, !1, 16, 8), c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, a), c.uniformMatrix4fv(l.projectionMatrix, !1, p.projectionMatrix.elements), c.activeTexture(c.TEXTURE0), c.uniform1i(l.map, 0);
                    var d = 0,
                        m = 0,
                        v = r.fog;
                    v ? (c.uniform3f(l.fogColor, v.color.r, v.color.g, v.color.b), v instanceof n.Fog ? (c.uniform1f(l.fogNear, v.near), c.uniform1f(l.fogFar, v.far), c.uniform1i(l.fogType, 1), d = 1, m = 1) : v instanceof n.FogExp2 && (c.uniform1f(l.fogDensity, v.density), c.uniform1i(l.fogType, 2), d = 2, m = 2)) : (c.uniform1i(l.fogType, 0), d = 0, m = 0);
                    for (var g = 0, y = t.length; y > g; g++) {
                        var x = t[g];
                        x._modelViewMatrix.multiplyMatrices(p.matrixWorldInverse, x.matrixWorld), null === x.renderDepth ? x.z = -x._modelViewMatrix.elements[14] : x.z = x.renderDepth
                    }
                    t.sort(i);
                    for (var w = [], g = 0, y = t.length; y > g; g++) {
                        var x = t[g],
                            b = x.material;
                        c.uniform1f(l.alphaTest, b.alphaTest), c.uniformMatrix4fv(l.modelViewMatrix, !1, x._modelViewMatrix.elements), w[0] = x.scale.x, w[1] = x.scale.y;
                        var _ = 0;
                        r.fog && b.fog && (_ = m), d !== _ && (c.uniform1i(l.fogType, _), d = _), null !== b.map ? (c.uniform2f(l.uvOffset, b.map.offset.x, b.map.offset.y), c.uniform2f(l.uvScale, b.map.repeat.x, b.map.repeat.y)) : (c.uniform2f(l.uvOffset, 0, 0), c.uniform2f(l.uvScale, 1, 1)), c.uniform1f(l.opacity, b.opacity), c.uniform3f(l.color, b.color.r, b.color.g, b.color.b), c.uniform1f(l.rotation, b.rotation), c.uniform2fv(l.scale, w), e.setBlending(b.blending, b.blendEquation, b.blendSrc, b.blendDst), e.setDepthTest(b.depthTest), e.setDepthWrite(b.depthWrite), b.map && b.map.image && b.map.image.width ? e.setTexture(b.map, 0) : e.setTexture(u, 0), c.drawElements(c.TRIANGLES, 6, c.UNSIGNED_SHORT, 0)
                    }
                    c.enable(c.CULL_FACE), e.resetGLState()
                }
            }
        }, n.GeometryUtils = {
            merge: function(e, t, r) {
                console.warn("THREE.GeometryUtils: .merge() has been moved to Geometry. Use geometry.merge( geometry2, matrix, materialIndexOffset ) instead.");
                var i;
                t instanceof n.Mesh && (t.matrixAutoUpdate && t.updateMatrix(), i = t.matrix, t = t.geometry), e.merge(t, i, r)
            },
            center: function(e) {
                return console.warn("THREE.GeometryUtils: .center() has been moved to Geometry. Use geometry.center() instead."), e.center()
            }
        }, n.ImageUtils = {
            crossOrigin: void 0,
            loadTexture: function(e, t, r, i) {
                var o = new n.ImageLoader;
                o.crossOrigin = this.crossOrigin;
                var a = new n.Texture(void 0, t);
                return o.load(e, function(e) {
                    a.image = e, a.needsUpdate = !0, r && r(a)
                }, void 0, function(e) {
                    i && i(e)
                }), a.sourceFile = e, a
            },
            loadTextureCube: function(e, t, r, i) {
                var o = [],
                    a = new n.ImageLoader;
                a.crossOrigin = this.crossOrigin;
                var s = new n.CubeTexture(o, t);
                s.flipY = !1;
                for (var h = 0, l = function(t) {
                    a.load(e[t], function(e) {
                        s.images[t] = e, h += 1, 6 === h && (s.needsUpdate = !0, r && r(s))
                    })
                }, u = 0, c = e.length; c > u; ++u) l(u);
                return s
            },
            loadCompressedTexture: function() {
                console.error("THREE.ImageUtils.loadCompressedTexture has been removed. Use THREE.DDSLoader instead.")
            },
            loadCompressedTextureCube: function() {
                console.error("THREE.ImageUtils.loadCompressedTextureCube has been removed. Use THREE.DDSLoader instead.")
            },
            getNormalMap: function(e, t) {
                var r = function(e, t) {
                        return [e[1] * t[2] - e[2] * t[1], e[2] * t[0] - e[0] * t[2], e[0] * t[1] - e[1] * t[0]]
                    },
                    i = function(e, t) {
                        return [e[0] - t[0], e[1] - t[1], e[2] - t[2]]
                    },
                    n = function(e) {
                        var t = Math.sqrt(e[0] * e[0] + e[1] * e[1] + e[2] * e[2]);
                        return [e[0] / t, e[1] / t, e[2] / t]
                    };
                t = 1 | t;
                var o = e.width,
                    a = e.height,
                    s = document.createElement("canvas");
                s.width = o, s.height = a;
                var h = s.getContext("2d");
                h.drawImage(e, 0, 0);
                for (var l = h.getImageData(0, 0, o, a).data, u = h.createImageData(o, a), c = u.data, f = 0; o > f; f++)
                    for (var p = 0; a > p; p++) {
                        var d = 0 > p - 1 ? 0 : p - 1,
                            m = p + 1 > a - 1 ? a - 1 : p + 1,
                            v = 0 > f - 1 ? 0 : f - 1,
                            g = f + 1 > o - 1 ? o - 1 : f + 1,
                            y = [],
                            x = [0, 0, l[4 * (p * o + f)] / 255 * t];
                        y.push([-1, 0, l[4 * (p * o + v)] / 255 * t]), y.push([-1, -1, l[4 * (d * o + v)] / 255 * t]), y.push([0, -1, l[4 * (d * o + f)] / 255 * t]), y.push([1, -1, l[4 * (d * o + g)] / 255 * t]), y.push([1, 0, l[4 * (p * o + g)] / 255 * t]), y.push([1, 1, l[4 * (m * o + g)] / 255 * t]), y.push([0, 1, l[4 * (m * o + f)] / 255 * t]), y.push([-1, 1, l[4 * (m * o + v)] / 255 * t]);
                        for (var w = [], b = y.length, _ = 0; b > _; _++) {
                            var M = y[_],
                                S = y[(_ + 1) % b];
                            M = i(M, x), S = i(S, x), w.push(n(r(M, S)))
                        }
                        for (var T = [0, 0, 0], _ = 0; _ < w.length; _++) T[0] += w[_][0], T[1] += w[_][1], T[2] += w[_][2];
                        T[0] /= w.length, T[1] /= w.length, T[2] /= w.length;
                        var A = 4 * (p * o + f);
                        c[A] = (T[0] + 1) / 2 * 255 | 0, c[A + 1] = (T[1] + 1) / 2 * 255 | 0, c[A + 2] = 255 * T[2] | 0, c[A + 3] = 255
                    }
                return h.putImageData(u, 0, 0), s
            },
            generateDataTexture: function(e, t, r) {
                for (var i = e * t, o = new Uint8Array(3 * i), a = Math.floor(255 * r.r), s = Math.floor(255 * r.g), h = Math.floor(255 * r.b), l = 0; i > l; l++) o[3 * l] = a, o[3 * l + 1] = s, o[3 * l + 2] = h;
                var u = new n.DataTexture(o, e, t, n.RGBFormat);
                return u.needsUpdate = !0, u
            }
        }, n.SceneUtils = {
            createMultiMaterialObject: function(e, t) {
                for (var r = new n.Object3D, i = 0, o = t.length; o > i; i++) r.add(new n.Mesh(e, t[i]));
                return r
            },
            detach: function(e, t, r) {
                e.applyMatrix(t.matrixWorld), t.remove(e), r.add(e)
            },
            attach: function(e, t, r) {
                var i = new n.Matrix4;
                i.getInverse(r.matrixWorld), e.applyMatrix(i), t.remove(e), r.add(e)
            }
        }, n.FontUtils = {
            faces: {},
            face: "helvetiker",
            weight: "normal",
            style: "normal",
            size: 150,
            divisions: 10,
            getFace: function() {
                try {
                    return this.faces[this.face][this.weight][this.style]
                } catch (e) {
                    throw "The font " + this.face + " with " + this.weight + " weight and " + this.style + " style is missing."
                }
            },
            loadFace: function(e) {
                var t = e.familyName.toLowerCase(),
                    r = this;
                r.faces[t] = r.faces[t] || {}, r.faces[t][e.cssFontWeight] = r.faces[t][e.cssFontWeight] || {}, r.faces[t][e.cssFontWeight][e.cssFontStyle] = e;
                r.faces[t][e.cssFontWeight][e.cssFontStyle] = e;
                return e
            },
            drawText: function(e) {
                var t, r = this.getFace(),
                    i = this.size / r.resolution,
                    o = 0,
                    a = String(e).split(""),
                    s = a.length,
                    h = [];
                for (t = 0; s > t; t++) {
                    var l = new n.Path,
                        u = this.extractGlyphPoints(a[t], r, i, o, l);
                    o += u.offset, h.push(u.path)
                }
                var c = o / 2;
                return {
                    paths: h,
                    offset: c
                }
            },
            extractGlyphPoints: function(e, t, r, i, o) {
                var a, s, h, l, u, c, f, p, d, m, v, g, y, x, w, b, _, M, S, T = [],
                    A = t.glyphs[e] || t.glyphs["?"];
                if (A) {
                    if (A.o)
                        for (l = A._cachedOutline || (A._cachedOutline = A.o.split(" ")), c = l.length, f = r, p = r, a = 0; c > a;) switch (u = l[a++]) {
                            case "m":
                                d = l[a++] * f + i, m = l[a++] * p, o.moveTo(d, m);
                                break;
                            case "l":
                                d = l[a++] * f + i, m = l[a++] * p, o.lineTo(d, m);
                                break;
                            case "q":
                                if (v = l[a++] * f + i, g = l[a++] * p, w = l[a++] * f + i, b = l[a++] * p, o.quadraticCurveTo(w, b, v, g), S = T[T.length - 1])
                                    for (y = S.x, x = S.y, s = 1, h = this.divisions; h >= s; s++) {
                                        var E = s / h;
                                        n.Shape.Utils.b2(E, y, w, v), n.Shape.Utils.b2(E, x, b, g)
                                    }
                                break;
                            case "b":
                                if (v = l[a++] * f + i, g = l[a++] * p, w = l[a++] * f + i, b = l[a++] * p, _ = l[a++] * f + i, M = l[a++] * p, o.bezierCurveTo(w, b, _, M, v, g), S = T[T.length - 1])
                                    for (y = S.x, x = S.y, s = 1, h = this.divisions; h >= s; s++) {
                                        var E = s / h;
                                        n.Shape.Utils.b3(E, y, w, _, v), n.Shape.Utils.b3(E, x, b, M, g)
                                    }
                        }
                    return {
                        offset: A.ha * r,
                        path: o
                    }
                }
            }
        }, n.FontUtils.generateShapes = function(e, t) {
            t = t || {};
            var r = void 0 !== t.size ? t.size : 100,
                i = void 0 !== t.curveSegments ? t.curveSegments : 4,
                o = void 0 !== t.font ? t.font : "helvetiker",
                a = void 0 !== t.weight ? t.weight : "normal",
                s = void 0 !== t.style ? t.style : "normal";
            n.FontUtils.size = r, n.FontUtils.divisions = i, n.FontUtils.face = o, n.FontUtils.weight = a, n.FontUtils.style = s;
            for (var h = n.FontUtils.drawText(e), l = h.paths, u = [], c = 0, f = l.length; f > c; c++) Array.prototype.push.apply(u, l[c].toShapes());
            return u
        },
        function(e) {
            var t = 1e-10,
                r = function(e, t) {
                    var r = e.length;
                    if (3 > r) return null;
                    var o, a, s, h = [],
                        l = [],
                        u = [];
                    if (i(e) > 0)
                        for (a = 0; r > a; a++) l[a] = a;
                    else
                        for (a = 0; r > a; a++) l[a] = r - 1 - a;
                    var c = r,
                        f = 2 * c;
                    for (a = c - 1; c > 2;) {
                        if (f-- <= 0) return console.log("Warning, unable to triangulate polygon!"), t ? u : h;
                        if (o = a, o >= c && (o = 0), a = o + 1, a >= c && (a = 0), s = a + 1, s >= c && (s = 0), n(e, o, a, s, c, l)) {
                            var p, d, m, v, g;
                            for (p = l[o], d = l[a], m = l[s], h.push([e[p], e[d], e[m]]), u.push([l[o], l[a], l[s]]), v = a, g = a + 1; c > g; v++, g++) l[v] = l[g];
                            c--, f = 2 * c
                        }
                    }
                    return t ? u : h
                },
                i = function(e) {
                    for (var t = e.length, r = 0, i = t - 1, n = 0; t > n; i = n++) r += e[i].x * e[n].y - e[n].x * e[i].y;
                    return .5 * r
                },
                n = function(e, r, i, n, o, a) {
                    var s, h, l, u, c, f, p, d, m;
                    if (h = e[a[r]].x, l = e[a[r]].y, u = e[a[i]].x, c = e[a[i]].y, f = e[a[n]].x, p = e[a[n]].y, t > (u - h) * (p - l) - (c - l) * (f - h)) return !1;
                    var v, g, y, x, w, b, _, M, S, T, A, E, C, L, P;
                    for (v = f - u, g = p - c, y = h - f, x = l - p, w = u - h, b = c - l, s = 0; o > s; s++)
                        if (d = e[a[s]].x, m = e[a[s]].y, !(d === h && m === l || d === u && m === c || d === f && m === p) && (_ = d - h, M = m - l, S = d - u, T = m - c, A = d - f, E = m - p, P = v * T - g * S, C = w * M - b * _, L = y * E - x * A, P >= -t && L >= -t && C >= -t)) return !1;
                    return !0
                };
            return e.Triangulate = r, e.Triangulate.area = i, e
        }(n.FontUtils), i._typeface_js = {
            faces: n.FontUtils.faces,
            loadFace: n.FontUtils.loadFace
        }, n.typeface_js = i._typeface_js, n.Audio = function(e) {
            n.Object3D.call(this), this.type = "Audio", this.context = e.context, this.source = this.context.createBufferSource(), this.gain = this.context.createGain(), this.gain.connect(this.context.destination), this.panner = this.context.createPanner(), this.panner.connect(this.gain)
        }, n.Audio.prototype = Object.create(n.Object3D.prototype), n.Audio.prototype.load = function(e) {
            var t = this,
                r = new XMLHttpRequest;
            return r.open("GET", e, !0), r.responseType = "arraybuffer", r.onload = function(e) {
                t.context.decodeAudioData(this.response, function(e) {
                    t.source.buffer = e, t.source.connect(t.panner), t.source.start(0)
                })
            }, r.send(), this
        }, n.Audio.prototype.setLoop = function(e) {
            this.source.loop = e
        }, n.Audio.prototype.setRefDistance = function(e) {
            this.panner.refDistance = e
        }, n.Audio.prototype.setRolloffFactor = function(e) {
            this.panner.rolloffFactor = e
        }, n.Audio.prototype.updateMatrixWorld = function() {
            var e = new n.Vector3;
            return function(t) {
                n.Object3D.prototype.updateMatrixWorld.call(this, t), e.setFromMatrixPosition(this.matrixWorld), this.panner.setPosition(e.x, e.y, e.z)
            }
        }(), n.AudioListener = function() {
            n.Object3D.call(this), this.type = "AudioListener", this.context = new(window.AudioContext || window.webkitAudioContext)
        }, n.AudioListener.prototype = Object.create(n.Object3D.prototype), n.AudioListener.prototype.updateMatrixWorld = function() {
            var e = new n.Vector3,
                t = new n.Quaternion,
                r = new n.Vector3,
                i = new n.Vector3,
                o = new n.Vector3,
                a = new n.Vector3;
            return function(s) {
                n.Object3D.prototype.updateMatrixWorld.call(this, s);
                var h = this.context.listener;
                this.matrixWorld.decompose(e, t, r), i.set(0, 0, -1).applyQuaternion(t), o.subVectors(e, a), h.setPosition(e.x, e.y, e.z), h.setOrientation(i.x, i.y, i.z, this.up.x, this.up.y, this.up.z), h.setVelocity(o.x, o.y, o.z), a.copy(e)
            }
        }(), n.Curve = function() {}, n.Curve.prototype.getPoint = function(e) {
            return console.log("Warning, getPoint() not implemented!"), null
        }, n.Curve.prototype.getPointAt = function(e) {
            var t = this.getUtoTmapping(e);
            return this.getPoint(t)
        }, n.Curve.prototype.getPoints = function(e) {
            e || (e = 5);
            var t, r = [];
            for (t = 0; e >= t; t++) r.push(this.getPoint(t / e));
            return r
        }, n.Curve.prototype.getSpacedPoints = function(e) {
            e || (e = 5);
            var t, r = [];
            for (t = 0; e >= t; t++) r.push(this.getPointAt(t / e));
            return r
        }, n.Curve.prototype.getLength = function() {
            var e = this.getLengths();
            return e[e.length - 1]
        }, n.Curve.prototype.getLengths = function(e) {
            if (e || (e = this.__arcLengthDivisions ? this.__arcLengthDivisions : 200), this.cacheArcLengths && this.cacheArcLengths.length == e + 1 && !this.needsUpdate) return this.cacheArcLengths;
            this.needsUpdate = !1;
            var t, r, i = [],
                n = this.getPoint(0),
                o = 0;
            for (i.push(0), r = 1; e >= r; r++) t = this.getPoint(r / e), o += t.distanceTo(n), i.push(o), n = t;
            return this.cacheArcLengths = i, i
        }, n.Curve.prototype.updateArcLengths = function() {
            this.needsUpdate = !0, this.getLengths()
        }, n.Curve.prototype.getUtoTmapping = function(e, t) {
            var r, i = this.getLengths(),
                n = 0,
                o = i.length;
            r = t ? t : e * i[o - 1];
            for (var a, s = 0, h = o - 1; h >= s;)
                if (n = Math.floor(s + (h - s) / 2), a = i[n] - r, 0 > a) s = n + 1;
                else {
                    if (!(a > 0)) {
                        h = n;
                        break
                    }
                    h = n - 1
                }
            if (n = h, i[n] == r) {
                var l = n / (o - 1);
                return l
            }
            var u = i[n],
                c = i[n + 1],
                f = c - u,
                p = (r - u) / f,
                l = (n + p) / (o - 1);
            return l
        }, n.Curve.prototype.getTangent = function(e) {
            var t = 1e-4,
                r = e - t,
                i = e + t;
            0 > r && (r = 0), i > 1 && (i = 1);
            var n = this.getPoint(r),
                o = this.getPoint(i),
                a = o.clone().sub(n);
            return a.normalize()
        }, n.Curve.prototype.getTangentAt = function(e) {
            var t = this.getUtoTmapping(e);
            return this.getTangent(t)
        }, n.Curve.Utils = {
            tangentQuadraticBezier: function(e, t, r, i) {
                return 2 * (1 - e) * (r - t) + 2 * e * (i - r)
            },
            tangentCubicBezier: function(e, t, r, i, n) {
                return -3 * t * (1 - e) * (1 - e) + 3 * r * (1 - e) * (1 - e) - 6 * e * r * (1 - e) + 6 * e * i * (1 - e) - 3 * e * e * i + 3 * e * e * n
            },
            tangentSpline: function(e, t, r, i, n) {
                var o = 6 * e * e - 6 * e,
                    a = 3 * e * e - 4 * e + 1,
                    s = -6 * e * e + 6 * e,
                    h = 3 * e * e - 2 * e;
                return o + a + s + h
            },
            interpolate: function(e, t, r, i, n) {
                var o = .5 * (r - e),
                    a = .5 * (i - t),
                    s = n * n,
                    h = n * s;
                return (2 * t - 2 * r + o + a) * h + (-3 * t + 3 * r - 2 * o - a) * s + o * n + t
            }
        }, n.Curve.create = function(e, t) {
            return e.prototype = Object.create(n.Curve.prototype), e.prototype.getPoint = t, e
        }, n.CurvePath = function() {
            this.curves = [], this.bends = [], this.autoClose = !1
        }, n.CurvePath.prototype = Object.create(n.Curve.prototype), n.CurvePath.prototype.add = function(e) {
            this.curves.push(e)
        }, n.CurvePath.prototype.checkConnection = function() {}, n.CurvePath.prototype.closePath = function() {
            var e = this.curves[0].getPoint(0),
                t = this.curves[this.curves.length - 1].getPoint(1);
            e.equals(t) || this.curves.push(new n.LineCurve(t, e))
        }, n.CurvePath.prototype.getPoint = function(e) {
            for (var t, r, i = e * this.getLength(), n = this.getCurveLengths(), o = 0; o < n.length;) {
                if (n[o] >= i) {
                    t = n[o] - i, r = this.curves[o];
                    var a = 1 - t / r.getLength();
                    return r.getPointAt(a)
                }
                o++
            }
            return null
        }, n.CurvePath.prototype.getLength = function() {
            var e = this.getCurveLengths();
            return e[e.length - 1]
        }, n.CurvePath.prototype.getCurveLengths = function() {
            if (this.cacheLengths && this.cacheLengths.length == this.curves.length) return this.cacheLengths;
            var e, t = [],
                r = 0,
                i = this.curves.length;
            for (e = 0; i > e; e++) r += this.curves[e].getLength(), t.push(r);
            return this.cacheLengths = t, t
        }, n.CurvePath.prototype.getBoundingBox = function() {
            var e, t, r, i, o, a, s = this.getPoints();
            e = t = Number.NEGATIVE_INFINITY, i = o = Number.POSITIVE_INFINITY;
            var h, l, u, c, f = s[0] instanceof n.Vector3;
            for (c = f ? new n.Vector3 : new n.Vector2, l = 0, u = s.length; u > l; l++) h = s[l], h.x > e ? e = h.x : h.x < i && (i = h.x), h.y > t ? t = h.y : h.y < o && (o = h.y), f && (h.z > r ? r = h.z : h.z < a && (a = h.z)), c.add(h);
            var p = {
                minX: i,
                minY: o,
                maxX: e,
                maxY: t
            };
            return f && (p.maxZ = r, p.minZ = a), p
        }, n.CurvePath.prototype.createPointsGeometry = function(e) {
            var t = this.getPoints(e, !0);
            return this.createGeometry(t)
        }, n.CurvePath.prototype.createSpacedPointsGeometry = function(e) {
            var t = this.getSpacedPoints(e, !0);
            return this.createGeometry(t)
        }, n.CurvePath.prototype.createGeometry = function(e) {
            for (var t = new n.Geometry, r = 0; r < e.length; r++) t.vertices.push(new n.Vector3(e[r].x, e[r].y, e[r].z || 0));
            return t
        }, n.CurvePath.prototype.addWrapPath = function(e) {
            this.bends.push(e)
        }, n.CurvePath.prototype.getTransformedPoints = function(e, t) {
            var r, i, n = this.getPoints(e);
            for (t || (t = this.bends), r = 0, i = t.length; i > r; r++) n = this.getWrapPoints(n, t[r]);
            return n
        }, n.CurvePath.prototype.getTransformedSpacedPoints = function(e, t) {
            var r, i, n = this.getSpacedPoints(e);
            for (t || (t = this.bends), r = 0, i = t.length; i > r; r++) n = this.getWrapPoints(n, t[r]);
            return n
        }, n.CurvePath.prototype.getWrapPoints = function(e, t) {
            var r, i, n, o, a, s, h = this.getBoundingBox();
            for (r = 0, i = e.length; i > r; r++) {
                n = e[r], o = n.x, a = n.y, s = o / h.maxX, s = t.getUtoTmapping(s, o);
                var l = t.getPoint(s),
                    u = t.getTangent(s);
                u.set(-u.y, u.x).multiplyScalar(a), n.x = l.x + u.x, n.y = l.y + u.y
            }
            return e
        }, n.Gyroscope = function() {
            n.Object3D.call(this)
        }, n.Gyroscope.prototype = Object.create(n.Object3D.prototype), n.Gyroscope.prototype.updateMatrixWorld = function() {
            var e = new n.Vector3,
                t = new n.Quaternion,
                r = new n.Vector3,
                i = new n.Vector3,
                o = new n.Quaternion,
                a = new n.Vector3;
            return function(n) {
                this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || n) && (this.parent ? (this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), this.matrixWorld.decompose(i, o, a), this.matrix.decompose(e, t, r), this.matrixWorld.compose(i, t, a)) : this.matrixWorld.copy(this.matrix), this.matrixWorldNeedsUpdate = !1, n = !0);
                for (var s = 0, h = this.children.length; h > s; s++) this.children[s].updateMatrixWorld(n)
            }
        }(), n.Path = function(e) {
            n.CurvePath.call(this), this.actions = [], e && this.fromPoints(e)
        }, n.Path.prototype = Object.create(n.CurvePath.prototype), n.PathActions = {
            MOVE_TO: "moveTo",
            LINE_TO: "lineTo",
            QUADRATIC_CURVE_TO: "quadraticCurveTo",
            BEZIER_CURVE_TO: "bezierCurveTo",
            CSPLINE_THRU: "splineThru",
            ARC: "arc",
            ELLIPSE: "ellipse"
        }, n.Path.prototype.fromPoints = function(e) {
            this.moveTo(e[0].x, e[0].y);
            for (var t = 1, r = e.length; r > t; t++) this.lineTo(e[t].x, e[t].y)
        }, n.Path.prototype.moveTo = function(e, t) {
            var r = Array.prototype.slice.call(arguments);
            this.actions.push({
                action: n.PathActions.MOVE_TO,
                args: r
            })
        }, n.Path.prototype.lineTo = function(e, t) {
            var r = Array.prototype.slice.call(arguments),
                i = this.actions[this.actions.length - 1].args,
                o = i[i.length - 2],
                a = i[i.length - 1],
                s = new n.LineCurve(new n.Vector2(o, a), new n.Vector2(e, t));
            this.curves.push(s), this.actions.push({
                action: n.PathActions.LINE_TO,
                args: r
            })
        }, n.Path.prototype.quadraticCurveTo = function(e, t, r, i) {
            var o = Array.prototype.slice.call(arguments),
                a = this.actions[this.actions.length - 1].args,
                s = a[a.length - 2],
                h = a[a.length - 1],
                l = new n.QuadraticBezierCurve(new n.Vector2(s, h), new n.Vector2(e, t), new n.Vector2(r, i));
            this.curves.push(l), this.actions.push({
                action: n.PathActions.QUADRATIC_CURVE_TO,
                args: o
            })
        }, n.Path.prototype.bezierCurveTo = function(e, t, r, i, o, a) {
            var s = Array.prototype.slice.call(arguments),
                h = this.actions[this.actions.length - 1].args,
                l = h[h.length - 2],
                u = h[h.length - 1],
                c = new n.CubicBezierCurve(new n.Vector2(l, u), new n.Vector2(e, t), new n.Vector2(r, i), new n.Vector2(o, a));
            this.curves.push(c), this.actions.push({
                action: n.PathActions.BEZIER_CURVE_TO,
                args: s
            })
        }, n.Path.prototype.splineThru = function(e) {
            var t = Array.prototype.slice.call(arguments),
                r = this.actions[this.actions.length - 1].args,
                i = r[r.length - 2],
                o = r[r.length - 1],
                a = [new n.Vector2(i, o)];
            Array.prototype.push.apply(a, e);
            var s = new n.SplineCurve(a);
            this.curves.push(s), this.actions.push({
                action: n.PathActions.CSPLINE_THRU,
                args: t
            })
        }, n.Path.prototype.arc = function(e, t, r, i, n, o) {
            var a = this.actions[this.actions.length - 1].args,
                s = a[a.length - 2],
                h = a[a.length - 1];
            this.absarc(e + s, t + h, r, i, n, o)
        }, n.Path.prototype.absarc = function(e, t, r, i, n, o) {
            this.absellipse(e, t, r, r, i, n, o)
        }, n.Path.prototype.ellipse = function(e, t, r, i, n, o, a) {
            var s = this.actions[this.actions.length - 1].args,
                h = s[s.length - 2],
                l = s[s.length - 1];
            this.absellipse(e + h, t + l, r, i, n, o, a)
        }, n.Path.prototype.absellipse = function(e, t, r, i, o, a, s) {
            var h = Array.prototype.slice.call(arguments),
                l = new n.EllipseCurve(e, t, r, i, o, a, s);
            this.curves.push(l);
            var u = l.getPoint(1);
            h.push(u.x), h.push(u.y), this.actions.push({
                action: n.PathActions.ELLIPSE,
                args: h
            })
        }, n.Path.prototype.getSpacedPoints = function(e, t) {
            e || (e = 40);
            for (var r = [], i = 0; e > i; i++) r.push(this.getPoint(i / e));
            return r
        }, n.Path.prototype.getPoints = function(e, t) {
            if (this.useSpacedPoints) return console.log("tata"), this.getSpacedPoints(e, t);
            e = e || 12;
            var r, i, o, a, s, h, l, u, c, f, p, d, m, v, g, y, x, w, b = [];
            for (r = 0, i = this.actions.length; i > r; r++) switch (o = this.actions[r], a = o.action, s = o.args, a) {
                case n.PathActions.MOVE_TO:
                    b.push(new n.Vector2(s[0], s[1]));
                    break;
                case n.PathActions.LINE_TO:
                    b.push(new n.Vector2(s[0], s[1]));
                    break;
                case n.PathActions.QUADRATIC_CURVE_TO:
                    for (h = s[2], l = s[3], f = s[0], p = s[1], b.length > 0 ? (v = b[b.length - 1], d = v.x, m = v.y) : (v = this.actions[r - 1].args, d = v[v.length - 2], m = v[v.length - 1]), g = 1; e >= g; g++) y = g / e, x = n.Shape.Utils.b2(y, d, f, h), w = n.Shape.Utils.b2(y, m, p, l), b.push(new n.Vector2(x, w));
                    break;
                case n.PathActions.BEZIER_CURVE_TO:
                    for (h = s[4], l = s[5], f = s[0], p = s[1], u = s[2], c = s[3], b.length > 0 ? (v = b[b.length - 1], d = v.x, m = v.y) : (v = this.actions[r - 1].args, d = v[v.length - 2], m = v[v.length - 1]), g = 1; e >= g; g++) y = g / e, x = n.Shape.Utils.b3(y, d, f, u, h), w = n.Shape.Utils.b3(y, m, p, c, l), b.push(new n.Vector2(x, w));
                    break;
                case n.PathActions.CSPLINE_THRU:
                    v = this.actions[r - 1].args;
                    var _ = new n.Vector2(v[v.length - 2], v[v.length - 1]),
                        M = [_],
                        S = e * s[0].length;
                    M = M.concat(s[0]);
                    var T = new n.SplineCurve(M);
                    for (g = 1; S >= g; g++) b.push(T.getPointAt(g / S));
                    break;
                case n.PathActions.ARC:
                    var A, E = s[0],
                        C = s[1],
                        L = s[2],
                        P = s[3],
                        R = s[4],
                        D = !!s[5],
                        F = R - P,
                        U = 2 * e;
                    for (g = 1; U >= g; g++) y = g / U, D || (y = 1 - y), A = P + y * F, x = E + L * Math.cos(A), w = C + L * Math.sin(A), b.push(new n.Vector2(x, w));
                    break;
                case n.PathActions.ELLIPSE:
                    var A, E = s[0],
                        C = s[1],
                        B = s[2],
                        k = s[3],
                        P = s[4],
                        R = s[5],
                        D = !!s[6],
                        F = R - P,
                        U = 2 * e;
                    for (g = 1; U >= g; g++) y = g / U, D || (y = 1 - y), A = P + y * F, x = E + B * Math.cos(A), w = C + k * Math.sin(A), b.push(new n.Vector2(x, w))
            }
            var z = b[b.length - 1],
                V = 1e-10;
            return Math.abs(z.x - b[0].x) < V && Math.abs(z.y - b[0].y) < V && b.splice(b.length - 1, 1), t && b.push(b[0]), b
        }, n.Path.prototype.toShapes = function(e, t) {
            function r(e) {
                var t, r, i, o, a, s = [],
                    h = new n.Path;
                for (t = 0, r = e.length; r > t; t++) i = e[t], a = i.args, o = i.action, o == n.PathActions.MOVE_TO && 0 != h.actions.length && (s.push(h), h = new n.Path), h[o].apply(h, a);
                return 0 != h.actions.length && s.push(h), s
            }

            function i(e) {
                for (var t = [], r = 0, i = e.length; i > r; r++) {
                    var o = e[r],
                        a = new n.Shape;
                    a.actions = o.actions, a.curves = o.curves, t.push(a)
                }
                return t
            }

            function o(e, t) {
                for (var r = 1e-10, i = t.length, n = !1, o = i - 1, a = 0; i > a; o = a++) {
                    var s = t[o],
                        h = t[a],
                        l = h.x - s.x,
                        u = h.y - s.y;
                    if (Math.abs(u) > r) {
                        if (0 > u && (s = t[a], l = -l, h = t[o], u = -u), e.y < s.y || e.y > h.y) continue;
                        if (e.y == s.y) {
                            if (e.x == s.x) return !0
                        } else {
                            var c = u * (e.x - s.x) - l * (e.y - s.y);
                            if (0 == c) return !0;
                            if (0 > c) continue;
                            n = !n
                        }
                    } else {
                        if (e.y != s.y) continue;
                        if (h.x <= e.x && e.x <= s.x || s.x <= e.x && e.x <= h.x) return !0
                    }
                }
                return n
            }
            var a = r(this.actions);
            if (0 == a.length) return [];
            if (t === !0) return i(a);
            var s, h, l, u = [];
            if (1 == a.length) return h = a[0], l = new n.Shape, l.actions = h.actions, l.curves = h.curves, u.push(l), u;
            var c = !n.Shape.Utils.isClockWise(a[0].getPoints());
            c = e ? !c : c;
            var f, p = [],
                d = [],
                m = [],
                v = 0;
            d[v] = void 0, m[v] = [];
            var g, y;
            for (g = 0, y = a.length; y > g; g++) h = a[g], f = h.getPoints(), s = n.Shape.Utils.isClockWise(f), s = e ? !s : s, s ? (!c && d[v] && v++, d[v] = {
                s: new n.Shape,
                p: f
            }, d[v].s.actions = h.actions, d[v].s.curves = h.curves, c && v++, m[v] = []) : m[v].push({
                h: h,
                p: f[0]
            });
            if (!d[0]) return i(a);
            if (d.length > 1) {
                for (var x = !1, w = [], b = 0, _ = d.length; _ > b; b++) p[b] = [];
                for (var b = 0, _ = d.length; _ > b; b++)
                    for (var M = (d[b], m[b]), S = 0; S < M.length; S++) {
                        for (var T = M[S], A = !0, E = 0; E < d.length; E++) o(T.p, d[E].p) && (b != E && w.push({
                            froms: b,
                            tos: E,
                            hole: S
                        }), A ? (A = !1, p[E].push(T)) : x = !0);
                        A && p[b].push(T)
                    }
                w.length > 0 && (x || (m = p))
            }
            var C, L, P;
            for (g = 0, y = d.length; y > g; g++)
                for (l = d[g].s, u.push(l), C = m[g], L = 0, P = C.length; P > L; L++) l.holes.push(C[L].h);
            return u
        }, n.Shape = function() {
            n.Path.apply(this, arguments), this.holes = []
        }, n.Shape.prototype = Object.create(n.Path.prototype), n.Shape.prototype.extrude = function(e) {
            var t = new n.ExtrudeGeometry(this, e);
            return t
        }, n.Shape.prototype.makeGeometry = function(e) {
            var t = new n.ShapeGeometry(this, e);
            return t
        }, n.Shape.prototype.getPointsHoles = function(e) {
            var t, r = this.holes.length,
                i = [];
            for (t = 0; r > t; t++) i[t] = this.holes[t].getTransformedPoints(e, this.bends);
            return i
        }, n.Shape.prototype.getSpacedPointsHoles = function(e) {
            var t, r = this.holes.length,
                i = [];
            for (t = 0; r > t; t++) i[t] = this.holes[t].getTransformedSpacedPoints(e, this.bends);
            return i
        }, n.Shape.prototype.extractAllPoints = function(e) {
            return {
                shape: this.getTransformedPoints(e),
                holes: this.getPointsHoles(e)
            }
        }, n.Shape.prototype.extractPoints = function(e) {
            return this.useSpacedPoints ? this.extractAllSpacedPoints(e) : this.extractAllPoints(e)
        }, n.Shape.prototype.extractAllSpacedPoints = function(e) {
            return {
                shape: this.getTransformedSpacedPoints(e),
                holes: this.getSpacedPointsHoles(e)
            }
        }, n.Shape.Utils = {
            triangulateShape: function(e, t) {
                function r(e, t, r) {
                    return e.x != t.x ? e.x < t.x ? e.x <= r.x && r.x <= t.x : t.x <= r.x && r.x <= e.x : e.y < t.y ? e.y <= r.y && r.y <= t.y : t.y <= r.y && r.y <= e.y
                }

                function i(e, t, i, n, o) {
                    var a = 1e-10,
                        s = t.x - e.x,
                        h = t.y - e.y,
                        l = n.x - i.x,
                        u = n.y - i.y,
                        c = e.x - i.x,
                        f = e.y - i.y,
                        p = h * l - s * u,
                        d = h * c - s * f;
                    if (Math.abs(p) > a) {
                        var m;
                        if (p > 0) {
                            if (0 > d || d > p) return [];
                            if (m = u * c - l * f, 0 > m || m > p) return []
                        } else {
                            if (d > 0 || p > d) return [];
                            if (m = u * c - l * f, m > 0 || p > m) return []
                        }
                        if (0 == m) return !o || 0 != d && d != p ? [e] : [];
                        if (m == p) return !o || 0 != d && d != p ? [t] : [];
                        if (0 == d) return [i];
                        if (d == p) return [n];
                        var v = m / p;
                        return [{
                            x: e.x + v * s,
                            y: e.y + v * h
                        }]
                    }
                    if (0 != d || u * c != l * f) return [];
                    var g = 0 == s && 0 == h,
                        y = 0 == l && 0 == u;
                    if (g && y) return e.x != i.x || e.y != i.y ? [] : [e];
                    if (g) return r(i, n, e) ? [e] : [];
                    if (y) return r(e, t, i) ? [i] : [];
                    var x, w, b, _, M, S, T, A;
                    return 0 != s ? (e.x < t.x ? (x = e, b = e.x, w = t, _ = t.x) : (x = t, b = t.x, w = e, _ = e.x), i.x < n.x ? (M = i, T = i.x, S = n, A = n.x) : (M = n, T = n.x, S = i, A = i.x)) : (e.y < t.y ? (x = e, b = e.y, w = t, _ = t.y) : (x = t, b = t.y, w = e, _ = e.y), i.y < n.y ? (M = i, T = i.y, S = n, A = n.y) : (M = n, T = n.y, S = i, A = i.y)), T >= b ? T > _ ? [] : _ == T ? o ? [] : [M] : A >= _ ? [M, w] : [M, S] : b > A ? [] : b == A ? o ? [] : [x] : A >= _ ? [x, w] : [x, S]
                }

                function o(e, t, r, i) {
                    var n = 1e-10,
                        o = t.x - e.x,
                        a = t.y - e.y,
                        s = r.x - e.x,
                        h = r.y - e.y,
                        l = i.x - e.x,
                        u = i.y - e.y,
                        c = o * h - a * s,
                        f = o * u - a * l;
                    if (Math.abs(c) > n) {
                        var p = l * h - u * s;
                        return c > 0 ? f >= 0 && p >= 0 : f >= 0 || p >= 0
                    }
                    return f > 0
                }

                function a(e, t) {
                    function r(e, t) {
                        var r = y.length - 1,
                            i = e - 1;
                        0 > i && (i = r);
                        var n = e + 1;
                        n > r && (n = 0);
                        var a = o(y[e], y[i], y[n], s[t]);
                        if (!a) return !1;
                        var h = s.length - 1,
                            l = t - 1;
                        0 > l && (l = h);
                        var u = t + 1;
                        return u > h && (u = 0), a = o(s[t], s[l], s[u], y[e]), a ? !0 : !1
                    }

                    function n(e, t) {
                        var r, n, o;
                        for (r = 0; r < y.length; r++)
                            if (n = r + 1, n %= y.length, o = i(e, t, y[r], y[n], !0), o.length > 0) return !0;
                        return !1
                    }

                    function a(e, r) {
                        var n, o, a, s, h;
                        for (n = 0; n < x.length; n++)
                            for (o = t[x[n]], a = 0; a < o.length; a++)
                                if (s = a + 1, s %= o.length, h = i(e, r, o[a], o[s], !0), h.length > 0) return !0;
                        return !1
                    }
                    for (var s, h, l, u, c, f, p, d, m, v, g, y = e.concat(), x = [], w = [], b = 0, _ = t.length; _ > b; b++) x.push(b);
                    for (var M = 0, S = 2 * x.length; x.length > 0;) {
                        if (S--, 0 > S) {
                            console.log("Infinite Loop! Holes left:" + x.length + ", Probably Hole outside Shape!");
                            break
                        }
                        for (l = M; l < y.length; l++) {
                            u = y[l], h = -1;
                            for (var b = 0; b < x.length; b++)
                                if (f = x[b], p = u.x + ":" + u.y + ":" + f, void 0 === w[p]) {
                                    s = t[f];
                                    for (var T = 0; T < s.length; T++)
                                        if (c = s[T], r(l, T) && !n(u, c) && !a(u, c)) {
                                            h = T, x.splice(b, 1), d = y.slice(0, l + 1), m = y.slice(l), v = s.slice(h), g = s.slice(0, h + 1), y = d.concat(v).concat(g).concat(m), M = l;
                                            break
                                        }
                                    if (h >= 0) break;
                                    w[p] = !0
                                }
                            if (h >= 0) break
                        }
                    }
                    return y
                }
                for (var s, h, l, u, c, f, p = {}, d = e.concat(), m = 0, v = t.length; v > m; m++) Array.prototype.push.apply(d, t[m]);
                for (s = 0, h = d.length; h > s; s++) c = d[s].x + ":" + d[s].y, void 0 !== p[c] && console.log("Duplicate point", c), p[c] = s;
                var g = a(e, t),
                    y = n.FontUtils.Triangulate(g, !1);
                for (s = 0, h = y.length; h > s; s++)
                    for (u = y[s], l = 0; 3 > l; l++) c = u[l].x + ":" + u[l].y, f = p[c], void 0 !== f && (u[l] = f);
                return y.concat()
            },
            isClockWise: function(e) {
                return n.FontUtils.Triangulate.area(e) < 0
            },
            b2p0: function(e, t) {
                var r = 1 - e;
                return r * r * t
            },
            b2p1: function(e, t) {
                return 2 * (1 - e) * e * t
            },
            b2p2: function(e, t) {
                return e * e * t
            },
            b2: function(e, t, r, i) {
                return this.b2p0(e, t) + this.b2p1(e, r) + this.b2p2(e, i)
            },
            b3p0: function(e, t) {
                var r = 1 - e;
                return r * r * r * t
            },
            b3p1: function(e, t) {
                var r = 1 - e;
                return 3 * r * r * e * t
            },
            b3p2: function(e, t) {
                var r = 1 - e;
                return 3 * r * e * e * t
            },
            b3p3: function(e, t) {
                return e * e * e * t
            },
            b3: function(e, t, r, i, n) {
                return this.b3p0(e, t) + this.b3p1(e, r) + this.b3p2(e, i) + this.b3p3(e, n)
            }
        }, n.LineCurve = function(e, t) {
            this.v1 = e, this.v2 = t
        }, n.LineCurve.prototype = Object.create(n.Curve.prototype), n.LineCurve.prototype.getPoint = function(e) {
            var t = this.v2.clone().sub(this.v1);
            return t.multiplyScalar(e).add(this.v1), t
        }, n.LineCurve.prototype.getPointAt = function(e) {
            return this.getPoint(e)
        }, n.LineCurve.prototype.getTangent = function(e) {
            var t = this.v2.clone().sub(this.v1);
            return t.normalize()
        }, n.QuadraticBezierCurve = function(e, t, r) {
            this.v0 = e, this.v1 = t, this.v2 = r
        }, n.QuadraticBezierCurve.prototype = Object.create(n.Curve.prototype), n.QuadraticBezierCurve.prototype.getPoint = function(e) {
            var t = new n.Vector2;
            return t.x = n.Shape.Utils.b2(e, this.v0.x, this.v1.x, this.v2.x), t.y = n.Shape.Utils.b2(e, this.v0.y, this.v1.y, this.v2.y), t
        }, n.QuadraticBezierCurve.prototype.getTangent = function(e) {
            var t = new n.Vector2;
            return t.x = n.Curve.Utils.tangentQuadraticBezier(e, this.v0.x, this.v1.x, this.v2.x), t.y = n.Curve.Utils.tangentQuadraticBezier(e, this.v0.y, this.v1.y, this.v2.y), t.normalize()
        }, n.CubicBezierCurve = function(e, t, r, i) {
            this.v0 = e, this.v1 = t, this.v2 = r, this.v3 = i
        }, n.CubicBezierCurve.prototype = Object.create(n.Curve.prototype), n.CubicBezierCurve.prototype.getPoint = function(e) {
            var t, r;
            return t = n.Shape.Utils.b3(e, this.v0.x, this.v1.x, this.v2.x, this.v3.x), r = n.Shape.Utils.b3(e, this.v0.y, this.v1.y, this.v2.y, this.v3.y), new n.Vector2(t, r)
        }, n.CubicBezierCurve.prototype.getTangent = function(e) {
            var t, r;
            t = n.Curve.Utils.tangentCubicBezier(e, this.v0.x, this.v1.x, this.v2.x, this.v3.x), r = n.Curve.Utils.tangentCubicBezier(e, this.v0.y, this.v1.y, this.v2.y, this.v3.y);
            var i = new n.Vector2(t, r);
            return i.normalize(), i
        }, n.SplineCurve = function(e) {
            this.points = void 0 == e ? [] : e
        }, n.SplineCurve.prototype = Object.create(n.Curve.prototype), n.SplineCurve.prototype.getPoint = function(e) {
            var t = this.points,
                r = (t.length - 1) * e,
                i = Math.floor(r),
                o = r - i,
                a = t[0 == i ? i : i - 1],
                s = t[i],
                h = t[i > t.length - 2 ? t.length - 1 : i + 1],
                l = t[i > t.length - 3 ? t.length - 1 : i + 2],
                u = new n.Vector2;
            return u.x = n.Curve.Utils.interpolate(a.x, s.x, h.x, l.x, o), u.y = n.Curve.Utils.interpolate(a.y, s.y, h.y, l.y, o), u
        }, n.EllipseCurve = function(e, t, r, i, n, o, a) {
            this.aX = e, this.aY = t, this.xRadius = r, this.yRadius = i, this.aStartAngle = n, this.aEndAngle = o, this.aClockwise = a
        }, n.EllipseCurve.prototype = Object.create(n.Curve.prototype), n.EllipseCurve.prototype.getPoint = function(e) {
            var t = this.aEndAngle - this.aStartAngle;
            0 > t && (t += 2 * Math.PI), t > 2 * Math.PI && (t -= 2 * Math.PI);
            var r;
            r = this.aClockwise === !0 ? this.aEndAngle + (1 - e) * (2 * Math.PI - t) : this.aStartAngle + e * t;
            var i = new n.Vector2;
            return i.x = this.aX + this.xRadius * Math.cos(r), i.y = this.aY + this.yRadius * Math.sin(r), i
        }, n.ArcCurve = function(e, t, r, i, o, a) {
            n.EllipseCurve.call(this, e, t, r, r, i, o, a)
        }, n.ArcCurve.prototype = Object.create(n.EllipseCurve.prototype), n.LineCurve3 = n.Curve.create(function(e, t) {
            this.v1 = e, this.v2 = t
        }, function(e) {
            var t = new n.Vector3;
            return t.subVectors(this.v2, this.v1), t.multiplyScalar(e), t.add(this.v1), t
        }), n.QuadraticBezierCurve3 = n.Curve.create(function(e, t, r) {
            this.v0 = e, this.v1 = t, this.v2 = r
        }, function(e) {
            var t = new n.Vector3;
            return t.x = n.Shape.Utils.b2(e, this.v0.x, this.v1.x, this.v2.x), t.y = n.Shape.Utils.b2(e, this.v0.y, this.v1.y, this.v2.y), t.z = n.Shape.Utils.b2(e, this.v0.z, this.v1.z, this.v2.z), t
        }), n.CubicBezierCurve3 = n.Curve.create(function(e, t, r, i) {
            this.v0 = e, this.v1 = t, this.v2 = r, this.v3 = i
        }, function(e) {
            var t = new n.Vector3;
            return t.x = n.Shape.Utils.b3(e, this.v0.x, this.v1.x, this.v2.x, this.v3.x), t.y = n.Shape.Utils.b3(e, this.v0.y, this.v1.y, this.v2.y, this.v3.y), t.z = n.Shape.Utils.b3(e, this.v0.z, this.v1.z, this.v2.z, this.v3.z), t
        }), n.SplineCurve3 = n.Curve.create(function(e) {
            this.points = void 0 == e ? [] : e
        }, function(e) {
            var t = this.points,
                r = (t.length - 1) * e,
                i = Math.floor(r),
                o = r - i,
                a = t[0 == i ? i : i - 1],
                s = t[i],
                h = t[i > t.length - 2 ? t.length - 1 : i + 1],
                l = t[i > t.length - 3 ? t.length - 1 : i + 2],
                u = new n.Vector3;
            return u.x = n.Curve.Utils.interpolate(a.x, s.x, h.x, l.x, o), u.y = n.Curve.Utils.interpolate(a.y, s.y, h.y, l.y, o), u.z = n.Curve.Utils.interpolate(a.z, s.z, h.z, l.z, o), u
        }), n.ClosedSplineCurve3 = n.Curve.create(function(e) {
            this.points = void 0 == e ? [] : e
        }, function(e) {
            var t = this.points,
                r = (t.length - 0) * e,
                i = Math.floor(r),
                o = r - i;
            i += i > 0 ? 0 : (Math.floor(Math.abs(i) / t.length) + 1) * t.length;
            var a = t[(i - 1) % t.length],
                s = t[i % t.length],
                h = t[(i + 1) % t.length],
                l = t[(i + 2) % t.length],
                u = new n.Vector3;
            return u.x = n.Curve.Utils.interpolate(a.x, s.x, h.x, l.x, o), u.y = n.Curve.Utils.interpolate(a.y, s.y, h.y, l.y, o), u.z = n.Curve.Utils.interpolate(a.z, s.z, h.z, l.z, o), u
        }), n.AnimationHandler = {
            LINEAR: 0,
            CATMULLROM: 1,
            CATMULLROM_FORWARD: 2,
            add: function() {
                console.warn("THREE.AnimationHandler.add() has been deprecated.")
            },
            get: function() {
                console.warn("THREE.AnimationHandler.get() has been deprecated.")
            },
            remove: function() {
                console.warn("THREE.AnimationHandler.remove() has been deprecated.")
            },
            animations: [],
            init: function(e) {
                if (e.initialized !== !0) {
                    for (var t = 0; t < e.hierarchy.length; t++) {
                        for (var r = 0; r < e.hierarchy[t].keys.length; r++)
                            if (e.hierarchy[t].keys[r].time < 0 && (e.hierarchy[t].keys[r].time = 0), void 0 !== e.hierarchy[t].keys[r].rot && !(e.hierarchy[t].keys[r].rot instanceof n.Quaternion)) {
                                var i = e.hierarchy[t].keys[r].rot;
                                e.hierarchy[t].keys[r].rot = (new n.Quaternion).fromArray(i)
                            }
                        if (e.hierarchy[t].keys.length && void 0 !== e.hierarchy[t].keys[0].morphTargets) {
                            for (var o = {}, r = 0; r < e.hierarchy[t].keys.length; r++)
                                for (var a = 0; a < e.hierarchy[t].keys[r].morphTargets.length; a++) {
                                    var s = e.hierarchy[t].keys[r].morphTargets[a];
                                    o[s] = -1
                                }
                            e.hierarchy[t].usedMorphTargets = o;
                            for (var r = 0; r < e.hierarchy[t].keys.length; r++) {
                                var h = {};
                                for (var s in o) {
                                    for (var a = 0; a < e.hierarchy[t].keys[r].morphTargets.length; a++)
                                        if (e.hierarchy[t].keys[r].morphTargets[a] === s) {
                                            h[s] = e.hierarchy[t].keys[r].morphTargetsInfluences[a];
                                            break
                                        }
                                    a === e.hierarchy[t].keys[r].morphTargets.length && (h[s] = 0)
                                }
                                e.hierarchy[t].keys[r].morphTargetsInfluences = h
                            }
                        }
                        for (var r = 1; r < e.hierarchy[t].keys.length; r++) e.hierarchy[t].keys[r].time === e.hierarchy[t].keys[r - 1].time && (e.hierarchy[t].keys.splice(r, 1), r--);
                        for (var r = 0; r < e.hierarchy[t].keys.length; r++) e.hierarchy[t].keys[r].index = r
                    }
                    return e.initialized = !0, e
                }
            },
            parse: function(e) {
                var t = function(e, r) {
                        r.push(e);
                        for (var i = 0; i < e.children.length; i++) t(e.children[i], r)
                    },
                    r = [];
                if (e instanceof n.SkinnedMesh)
                    for (var i = 0; i < e.skeleton.bones.length; i++) r.push(e.skeleton.bones[i]);
                else t(e, r);
                return r
            },
            play: function(e) {
                -1 === this.animations.indexOf(e) && this.animations.push(e)
            },
            stop: function(e) {
                var t = this.animations.indexOf(e); - 1 !== t && this.animations.splice(t, 1)
            },
            update: function(e) {
                for (var t = 0; t < this.animations.length; t++) this.animations[t].resetBlendWeights();
                for (var t = 0; t < this.animations.length; t++) this.animations[t].update(e)
            }
        }, n.Animation = function(e, t) {
            this.root = e, this.data = n.AnimationHandler.init(t), this.hierarchy = n.AnimationHandler.parse(e), this.currentTime = 0, this.timeScale = 1, this.isPlaying = !1, this.loop = !0, this.weight = 0, this.interpolationType = n.AnimationHandler.LINEAR
        }, n.Animation.prototype.keyTypes = ["pos", "rot", "scl"], n.Animation.prototype.play = function(e, t) {
            this.currentTime = void 0 !== e ? e : 0, this.weight = void 0 !== t ? t : 1, this.isPlaying = !0, this.reset(), n.AnimationHandler.play(this)
        }, n.Animation.prototype.stop = function() {
            this.isPlaying = !1, n.AnimationHandler.stop(this)
        }, n.Animation.prototype.reset = function() {
            for (var e = 0, t = this.hierarchy.length; t > e; e++) {
                var r = this.hierarchy[e];
                r.matrixAutoUpdate = !0, void 0 === r.animationCache && (r.animationCache = {
                    animations: {},
                    blending: {
                        positionWeight: 0,
                        quaternionWeight: 0,
                        scaleWeight: 0
                    }
                }), void 0 === r.animationCache.animations[this.data.name] && (r.animationCache.animations[this.data.name] = {}, r.animationCache.animations[this.data.name].prevKey = {
                    pos: 0,
                    rot: 0,
                    scl: 0
                }, r.animationCache.animations[this.data.name].nextKey = {
                    pos: 0,
                    rot: 0,
                    scl: 0
                }, r.animationCache.animations[this.data.name].originalMatrix = r.matrix);
                for (var i = r.animationCache.animations[this.data.name], n = 0; 3 > n; n++) {
                    for (var o = this.keyTypes[n], a = this.data.hierarchy[e].keys[0], s = this.getNextKeyWith(o, e, 1); s.time < this.currentTime && s.index > a.index;) a = s, s = this.getNextKeyWith(o, e, s.index + 1);
                    i.prevKey[o] = a, i.nextKey[o] = s
                }
            }
        }, n.Animation.prototype.resetBlendWeights = function() {
            for (var e = 0, t = this.hierarchy.length; t > e; e++) {
                var r = this.hierarchy[e];
                void 0 !== r.animationCache && (r.animationCache.blending.positionWeight = 0, r.animationCache.blending.quaternionWeight = 0, r.animationCache.blending.scaleWeight = 0)
            }
        }, n.Animation.prototype.update = function() {
            var e = [],
                t = new n.Vector3,
                r = new n.Vector3,
                i = new n.Quaternion,
                o = function(e, t) {
                    var r, i, n, o, s, h, l, u, c, f = [],
                        p = [];
                    return r = (e.length - 1) * t, i = Math.floor(r), n = r - i, f[0] = 0 === i ? i : i - 1, f[1] = i, f[2] = i > e.length - 2 ? i : i + 1, f[3] = i > e.length - 3 ? i : i + 2, h = e[f[0]], l = e[f[1]], u = e[f[2]], c = e[f[3]], o = n * n, s = n * o, p[0] = a(h[0], l[0], u[0], c[0], n, o, s), p[1] = a(h[1], l[1], u[1], c[1], n, o, s), p[2] = a(h[2], l[2], u[2], c[2], n, o, s), p
                },
                a = function(e, t, r, i, n, o, a) {
                    var s = .5 * (r - e),
                        h = .5 * (i - t);
                    return (2 * (t - r) + s + h) * a + (-3 * (t - r) - 2 * s - h) * o + s * n + t
                };
            return function(a) {
                if (this.isPlaying !== !1 && (this.currentTime += a * this.timeScale, 0 !== this.weight)) {
                    var s = this.data.length;
                    if (this.currentTime > s || this.currentTime < 0) {
                        if (!this.loop) return void this.stop();
                        this.currentTime %= s, this.currentTime < 0 && (this.currentTime += s), this.reset()
                    }
                    for (var h = 0, l = this.hierarchy.length; l > h; h++)
                        for (var u = this.hierarchy[h], c = u.animationCache.animations[this.data.name], f = u.animationCache.blending, p = 0; 3 > p; p++) {
                            var d = this.keyTypes[p],
                                m = c.prevKey[d],
                                v = c.nextKey[d];
                            if (this.timeScale > 0 && v.time <= this.currentTime || this.timeScale < 0 && m.time >= this.currentTime) {
                                for (m = this.data.hierarchy[h].keys[0], v = this.getNextKeyWith(d, h, 1); v.time < this.currentTime && v.index > m.index;) m = v, v = this.getNextKeyWith(d, h, v.index + 1);
                                c.prevKey[d] = m, c.nextKey[d] = v
                            }
                            u.matrixAutoUpdate = !0, u.matrixWorldNeedsUpdate = !0;
                            var g = (this.currentTime - m.time) / (v.time - m.time),
                                y = m[d],
                                x = v[d];
                            if (0 > g && (g = 0), g > 1 && (g = 1), "pos" === d) {
                                if (this.interpolationType === n.AnimationHandler.LINEAR) {
                                    r.x = y[0] + (x[0] - y[0]) * g, r.y = y[1] + (x[1] - y[1]) * g, r.z = y[2] + (x[2] - y[2]) * g;
                                    var w = this.weight / (this.weight + f.positionWeight);
                                    u.position.lerp(r, w), f.positionWeight += this.weight
                                } else if (this.interpolationType === n.AnimationHandler.CATMULLROM || this.interpolationType === n.AnimationHandler.CATMULLROM_FORWARD) {
                                    e[0] = this.getPrevKeyWith("pos", h, m.index - 1).pos, e[1] = y, e[2] = x, e[3] = this.getNextKeyWith("pos", h, v.index + 1).pos, g = .33 * g + .33;
                                    var b = o(e, g),
                                        w = this.weight / (this.weight + f.positionWeight);
                                    f.positionWeight += this.weight;
                                    var _ = u.position;
                                    if (_.x = _.x + (b[0] - _.x) * w, _.y = _.y + (b[1] - _.y) * w, _.z = _.z + (b[2] - _.z) * w, this.interpolationType === n.AnimationHandler.CATMULLROM_FORWARD) {
                                        var M = o(e, 1.01 * g);
                                        t.set(M[0], M[1], M[2]), t.sub(_), t.y = 0, t.normalize();
                                        var S = Math.atan2(t.x, t.z);
                                        u.rotation.set(0, S, 0)
                                    }
                                }
                            } else if ("rot" === d)
                                if (n.Quaternion.slerp(y, x, i, g), 0 === f.quaternionWeight) u.quaternion.copy(i), f.quaternionWeight = this.weight;
                                else {
                                    var w = this.weight / (this.weight + f.quaternionWeight);
                                    n.Quaternion.slerp(u.quaternion, i, u.quaternion, w), f.quaternionWeight += this.weight
                                } else if ("scl" === d) {
                                r.x = y[0] + (x[0] - y[0]) * g, r.y = y[1] + (x[1] - y[1]) * g, r.z = y[2] + (x[2] - y[2]) * g;
                                var w = this.weight / (this.weight + f.scaleWeight);
                                u.scale.lerp(r, w), f.scaleWeight += this.weight
                            }
                        }
                    return !0
                }
            }
        }(), n.Animation.prototype.getNextKeyWith = function(e, t, r) {
            var i = this.data.hierarchy[t].keys;
            for (this.interpolationType === n.AnimationHandler.CATMULLROM || this.interpolationType === n.AnimationHandler.CATMULLROM_FORWARD ? r = r < i.length - 1 ? r : i.length - 1 : r %= i.length; r < i.length; r++)
                if (void 0 !== i[r][e]) return i[r];
            return this.data.hierarchy[t].keys[0]
        }, n.Animation.prototype.getPrevKeyWith = function(e, t, r) {
            var i = this.data.hierarchy[t].keys;
            for (r = this.interpolationType === n.AnimationHandler.CATMULLROM || this.interpolationType === n.AnimationHandler.CATMULLROM_FORWARD ? r > 0 ? r : 0 : r >= 0 ? r : r + i.length; r >= 0; r--)
                if (void 0 !== i[r][e]) return i[r];
            return this.data.hierarchy[t].keys[i.length - 1]
        }, n.KeyFrameAnimation = function(e) {
            this.root = e.node, this.data = n.AnimationHandler.init(e), this.hierarchy = n.AnimationHandler.parse(this.root), this.currentTime = 0, this.timeScale = .001, this.isPlaying = !1, this.isPaused = !0, this.loop = !0;
            for (var t = 0, r = this.hierarchy.length; r > t; t++) {
                var i = this.data.hierarchy[t].keys,
                    o = this.data.hierarchy[t].sids,
                    a = this.hierarchy[t];
                if (i.length && o) {
                    for (var s = 0; s < o.length; s++) {
                        var h = o[s],
                            l = this.getNextKeyWith(h, t, 0);
                        l && l.apply(h)
                    }
                    a.matrixAutoUpdate = !1, this.data.hierarchy[t].node.updateMatrix(), a.matrixWorldNeedsUpdate = !0
                }
            }
        }, n.KeyFrameAnimation.prototype.play = function(e) {
            if (this.currentTime = void 0 !== e ? e : 0, this.isPlaying === !1) {
                this.isPlaying = !0;
                var t, r, i, o = this.hierarchy.length;
                for (t = 0; o > t; t++) {
                    r = this.hierarchy[t], i = this.data.hierarchy[t], void 0 === i.animationCache && (i.animationCache = {}, i.animationCache.prevKey = null, i.animationCache.nextKey = null, i.animationCache.originalMatrix = r.matrix);
                    var a = this.data.hierarchy[t].keys;
                    a.length && (i.animationCache.prevKey = a[0], i.animationCache.nextKey = a[1], this.startTime = Math.min(a[0].time, this.startTime), this.endTime = Math.max(a[a.length - 1].time, this.endTime))
                }
                this.update(0)
            }
            this.isPaused = !1, n.AnimationHandler.play(this)
        }, n.KeyFrameAnimation.prototype.stop = function() {
            this.isPlaying = !1, this.isPaused = !1, n.AnimationHandler.stop(this);
            for (var e = 0; e < this.data.hierarchy.length; e++) {
                var t = this.hierarchy[e],
                    r = this.data.hierarchy[e];
                if (void 0 !== r.animationCache) {
                    var i = r.animationCache.originalMatrix;
                    i.copy(t.matrix), t.matrix = i, delete r.animationCache
                }
            }
        }, n.KeyFrameAnimation.prototype.update = function(e) {
            if (this.isPlaying !== !1) {
                this.currentTime += e * this.timeScale;
                var t = this.data.length;
                this.loop === !0 && this.currentTime > t && (this.currentTime %= t), this.currentTime = Math.min(this.currentTime, t);
                for (var r = 0, i = this.hierarchy.length; i > r; r++) {
                    var n = this.hierarchy[r],
                        o = this.data.hierarchy[r],
                        a = o.keys,
                        s = o.animationCache;
                    if (a.length) {
                        var h = s.prevKey,
                            l = s.nextKey;
                        if (l.time <= this.currentTime) {
                            for (; l.time < this.currentTime && l.index > h.index;) h = l, l = a[h.index + 1];
                            s.prevKey = h, s.nextKey = l
                        }
                        l.time >= this.currentTime ? h.interpolate(l, this.currentTime) : h.interpolate(l, l.time), this.data.hierarchy[r].node.updateMatrix(), n.matrixWorldNeedsUpdate = !0
                    }
                }
            }
        }, n.KeyFrameAnimation.prototype.getNextKeyWith = function(e, t, r) {
            var i = this.data.hierarchy[t].keys;
            for (r %= i.length; r < i.length; r++)
                if (i[r].hasTarget(e)) return i[r];
            return i[0]
        }, n.KeyFrameAnimation.prototype.getPrevKeyWith = function(e, t, r) {
            var i = this.data.hierarchy[t].keys;
            for (r = r >= 0 ? r : r + i.length; r >= 0; r--)
                if (i[r].hasTarget(e)) return i[r];
            return i[i.length - 1]
        }, n.MorphAnimation = function(e) {
            this.mesh = e, this.frames = e.morphTargetInfluences.length, this.currentTime = 0, this.duration = 1e3, this.loop = !0, this.isPlaying = !1
        }, n.MorphAnimation.prototype = {
            play: function() {
                this.isPlaying = !0
            },
            pause: function() {
                this.isPlaying = !1
            },
            update: function() {
                var e = 0,
                    t = 0;
                return function(r) {
                    if (this.isPlaying !== !1) {
                        this.currentTime += r, this.loop === !0 && this.currentTime > this.duration && (this.currentTime %= this.duration), this.currentTime = Math.min(this.currentTime, this.duration);
                        var i = this.duration / this.frames,
                            n = Math.floor(this.currentTime / i);
                        n != t && (this.mesh.morphTargetInfluences[e] = 0, this.mesh.morphTargetInfluences[t] = 1, this.mesh.morphTargetInfluences[n] = 0, e = t, t = n), this.mesh.morphTargetInfluences[n] = this.currentTime % i / i, this.mesh.morphTargetInfluences[e] = 1 - this.mesh.morphTargetInfluences[n]
                    }
                }
            }()
        }, n.BoxGeometry = function(e, t, r, i, o, a) {
            function s(e, t, r, i, o, a, s, l) {
                var u, c, f, p = h.widthSegments,
                    d = h.heightSegments,
                    m = o / 2,
                    v = a / 2,
                    g = h.vertices.length;
                "x" === e && "y" === t || "y" === e && "x" === t ? u = "z" : "x" === e && "z" === t || "z" === e && "x" === t ? (u = "y", d = h.depthSegments) : ("z" === e && "y" === t || "y" === e && "z" === t) && (u = "x", p = h.depthSegments);
                var y = p + 1,
                    x = d + 1,
                    w = o / p,
                    b = a / d,
                    _ = new n.Vector3;
                for (_[u] = s > 0 ? 1 : -1, f = 0; x > f; f++)
                    for (c = 0; y > c; c++) {
                        var M = new n.Vector3;
                        M[e] = (c * w - m) * r, M[t] = (f * b - v) * i, M[u] = s, h.vertices.push(M)
                    }
                for (f = 0; d > f; f++)
                    for (c = 0; p > c; c++) {
                        var S = c + y * f,
                            T = c + y * (f + 1),
                            A = c + 1 + y * (f + 1),
                            E = c + 1 + y * f,
                            C = new n.Vector2(c / p, 1 - f / d),
                            L = new n.Vector2(c / p, 1 - (f + 1) / d),
                            P = new n.Vector2((c + 1) / p, 1 - (f + 1) / d),
                            R = new n.Vector2((c + 1) / p, 1 - f / d),
                            D = new n.Face3(S + g, T + g, E + g);
                        D.normal.copy(_), D.vertexNormals.push(_.clone(), _.clone(), _.clone()), D.materialIndex = l, h.faces.push(D), h.faceVertexUvs[0].push([C, L, R]), D = new n.Face3(T + g, A + g, E + g), D.normal.copy(_), D.vertexNormals.push(_.clone(), _.clone(), _.clone()), D.materialIndex = l, h.faces.push(D), h.faceVertexUvs[0].push([L.clone(), P, R.clone()])
                    }
            }
            n.Geometry.call(this), this.type = "BoxGeometry", this.parameters = {
                width: e,
                height: t,
                depth: r,
                widthSegments: i,
                heightSegments: o,
                depthSegments: a
            }, this.widthSegments = i || 1, this.heightSegments = o || 1, this.depthSegments = a || 1;
            var h = this,
                l = e / 2,
                u = t / 2,
                c = r / 2;
            s("z", "y", -1, -1, r, t, l, 0), s("z", "y", 1, -1, r, t, -l, 1), s("x", "z", 1, 1, e, r, u, 2), s("x", "z", 1, -1, e, r, -u, 3), s("x", "y", 1, -1, e, t, c, 4), s("x", "y", -1, -1, e, t, -c, 5), this.mergeVertices()
        }, n.BoxGeometry.prototype = Object.create(n.Geometry.prototype), n.CircleGeometry = function(e, t, r, i) {
            n.Geometry.call(this), this.type = "CircleGeometry", this.parameters = {
                radius: e,
                segments: t,
                thetaStart: r,
                thetaLength: i
            }, e = e || 50, t = void 0 !== t ? Math.max(3, t) : 8, r = void 0 !== r ? r : 0, i = void 0 !== i ? i : 2 * Math.PI;
            var o, a = [],
                s = new n.Vector3,
                h = new n.Vector2(.5, .5);
            for (this.vertices.push(s), a.push(h), o = 0; t >= o; o++) {
                var l = new n.Vector3,
                    u = r + o / t * i;
                l.x = e * Math.cos(u), l.y = e * Math.sin(u), this.vertices.push(l), a.push(new n.Vector2((l.x / e + 1) / 2, (l.y / e + 1) / 2))
            }
            var c = new n.Vector3(0, 0, 1);
            for (o = 1; t >= o; o++) this.faces.push(new n.Face3(o, o + 1, 0, [c.clone(), c.clone(), c.clone()])), this.faceVertexUvs[0].push([a[o].clone(), a[o + 1].clone(), h.clone()]);
            this.computeFaceNormals(), this.boundingSphere = new n.Sphere(new n.Vector3, e)
        }, n.CircleGeometry.prototype = Object.create(n.Geometry.prototype), n.CubeGeometry = function(e, t, r, i, o, a) {
            return console.warn("THREE.CubeGeometry has been renamed to THREE.BoxGeometry."), new n.BoxGeometry(e, t, r, i, o, a)
        }, n.CylinderGeometry = function(e, t, r, i, o, a) {
            n.Geometry.call(this), this.type = "CylinderGeometry", this.parameters = {
                radiusTop: e,
                radiusBottom: t,
                height: r,
                radialSegments: i,
                heightSegments: o,
                openEnded: a
            }, e = void 0 !== e ? e : 20, t = void 0 !== t ? t : 20, r = void 0 !== r ? r : 100, i = i || 8, o = o || 1, a = void 0 !== a ? a : !1;
            var s, h, l = r / 2,
                u = [],
                c = [];
            for (h = 0; o >= h; h++) {
                var f = [],
                    p = [],
                    d = h / o,
                    m = d * (t - e) + e;
                for (s = 0; i >= s; s++) {
                    var v = s / i,
                        g = new n.Vector3;
                    g.x = m * Math.sin(v * Math.PI * 2), g.y = -d * r + l, g.z = m * Math.cos(v * Math.PI * 2), this.vertices.push(g), f.push(this.vertices.length - 1), p.push(new n.Vector2(v, 1 - d))
                }
                u.push(f), c.push(p)
            }
            var y, x, w = (t - e) / r;
            for (s = 0; i > s; s++)
                for (0 !== e ? (y = this.vertices[u[0][s]].clone(), x = this.vertices[u[0][s + 1]].clone()) : (y = this.vertices[u[1][s]].clone(), x = this.vertices[u[1][s + 1]].clone()), y.setY(Math.sqrt(y.x * y.x + y.z * y.z) * w).normalize(), x.setY(Math.sqrt(x.x * x.x + x.z * x.z) * w).normalize(), h = 0; o > h; h++) {
                    var b = u[h][s],
                        _ = u[h + 1][s],
                        M = u[h + 1][s + 1],
                        S = u[h][s + 1],
                        T = y.clone(),
                        A = y.clone(),
                        E = x.clone(),
                        C = x.clone(),
                        L = c[h][s].clone(),
                        P = c[h + 1][s].clone(),
                        R = c[h + 1][s + 1].clone(),
                        D = c[h][s + 1].clone();
                    this.faces.push(new n.Face3(b, _, S, [T, A, C])), this.faceVertexUvs[0].push([L, P, D]), this.faces.push(new n.Face3(_, M, S, [A.clone(), E, C.clone()])), this.faceVertexUvs[0].push([P.clone(), R, D.clone()])
                }
            if (a === !1 && e > 0)
                for (this.vertices.push(new n.Vector3(0, l, 0)), s = 0; i > s; s++) {
                    var b = u[0][s],
                        _ = u[0][s + 1],
                        M = this.vertices.length - 1,
                        T = new n.Vector3(0, 1, 0),
                        A = new n.Vector3(0, 1, 0),
                        E = new n.Vector3(0, 1, 0),
                        L = c[0][s].clone(),
                        P = c[0][s + 1].clone(),
                        R = new n.Vector2(P.x, 0);
                    this.faces.push(new n.Face3(b, _, M, [T, A, E])), this.faceVertexUvs[0].push([L, P, R])
                }
            if (a === !1 && t > 0)
                for (this.vertices.push(new n.Vector3(0, -l, 0)), s = 0; i > s; s++) {
                    var b = u[h][s + 1],
                        _ = u[h][s],
                        M = this.vertices.length - 1,
                        T = new n.Vector3(0, -1, 0),
                        A = new n.Vector3(0, -1, 0),
                        E = new n.Vector3(0, -1, 0),
                        L = c[h][s + 1].clone(),
                        P = c[h][s].clone(),
                        R = new n.Vector2(P.x, 1);
                    this.faces.push(new n.Face3(b, _, M, [T, A, E])), this.faceVertexUvs[0].push([L, P, R])
                }
            this.computeFaceNormals()
        }, n.CylinderGeometry.prototype = Object.create(n.Geometry.prototype), n.ExtrudeGeometry = function(e, t) {
            return "undefined" == typeof e ? void(e = []) : (n.Geometry.call(this), this.type = "ExtrudeGeometry", e = e instanceof Array ? e : [e], this.addShapeList(e, t), void this.computeFaceNormals())
        }, n.ExtrudeGeometry.prototype = Object.create(n.Geometry.prototype), n.ExtrudeGeometry.prototype.addShapeList = function(e, t) {
            for (var r = e.length, i = 0; r > i; i++) {
                var n = e[i];
                this.addShape(n, t)
            }
        }, n.ExtrudeGeometry.prototype.addShape = function(e, t) {
            function r(e, t, r) {
                return t || console.log("die"), t.clone().multiplyScalar(r).add(e)
            }

            function i(e, t, r) {
                var i, o, a = 1e-10,
                    s = 1,
                    h = e.x - t.x,
                    l = e.y - t.y,
                    u = r.x - e.x,
                    c = r.y - e.y,
                    f = h * h + l * l,
                    p = h * c - l * u;
                if (Math.abs(p) > a) {
                    var d = Math.sqrt(f),
                        m = Math.sqrt(u * u + c * c),
                        v = t.x - l / d,
                        g = t.y + h / d,
                        y = r.x - c / m,
                        x = r.y + u / m,
                        w = ((y - v) * c - (x - g) * u) / (h * c - l * u);
                    i = v + h * w - e.x, o = g + l * w - e.y;
                    var b = i * i + o * o;
                    if (2 >= b) return new n.Vector2(i, o);
                    s = Math.sqrt(b / 2)
                } else {
                    var _ = !1;
                    h > a ? u > a && (_ = !0) : -a > h ? -a > u && (_ = !0) : Math.sign(l) == Math.sign(c) && (_ = !0), _ ? (i = -l, o = h, s = Math.sqrt(f)) : (i = h, o = l, s = Math.sqrt(f / 2))
                }
                return new n.Vector2(i / s, o / s)
            }

            function o() {
                if (w) {
                    var e = 0,
                        t = j * e;
                    for (Y = 0; X > Y; Y++) W = z[Y], l(W[2] + t, W[1] + t, W[0] + t);
                    for (e = _ + 2 * x, t = j * e, Y = 0; X > Y; Y++) W = z[Y], l(W[0] + t, W[1] + t, W[2] + t)
                } else {
                    for (Y = 0; X > Y; Y++) W = z[Y], l(W[2], W[1], W[0]);
                    for (Y = 0; X > Y; Y++) W = z[Y], l(W[0] + j * _, W[1] + j * _, W[2] + j * _)
                }
            }

            function a() {
                var e = 0;
                for (s(V, e), e += V.length, L = 0, P = B.length; P > L; L++) C = B[L], s(C, e), e += C.length
            }

            function s(e, t) {
                var r, i;
                for (Y = e.length; --Y >= 0;) {
                    r = Y, i = Y - 1, 0 > i && (i = e.length - 1);
                    var n = 0,
                        o = _ + 2 * x;
                    for (n = 0; o > n; n++) {
                        var a = j * n,
                            s = j * (n + 1),
                            h = t + r + a,
                            l = t + i + a,
                            c = t + i + s,
                            f = t + r + s;
                        u(h, l, c, f, e, n, o, r, i)
                    }
                }
            }

            function h(e, t, r) {
                R.vertices.push(new n.Vector3(e, t, r))
            }

            function l(e, t, r) {
                e += D, t += D, r += D, R.faces.push(new n.Face3(e, t, r, null, null, T));
                var i = E.generateTopUV(R, e, t, r);
                R.faceVertexUvs[0].push(i)
            }

            function u(e, t, r, i, o, a, s, h, l) {
                e += D, t += D, r += D, i += D, R.faces.push(new n.Face3(e, t, i, null, null, A)), R.faces.push(new n.Face3(t, r, i, null, null, A));
                var u = E.generateSideWallUV(R, e, t, r, i);
                R.faceVertexUvs[0].push([u[0], u[1], u[3]]), R.faceVertexUvs[0].push([u[1], u[2], u[3]])
            }
            var c, f, p, d, m, v = void 0 !== t.amount ? t.amount : 100,
                g = void 0 !== t.bevelThickness ? t.bevelThickness : 6,
                y = void 0 !== t.bevelSize ? t.bevelSize : g - 2,
                x = void 0 !== t.bevelSegments ? t.bevelSegments : 3,
                w = void 0 !== t.bevelEnabled ? t.bevelEnabled : !0,
                b = void 0 !== t.curveSegments ? t.curveSegments : 12,
                _ = void 0 !== t.steps ? t.steps : 1,
                M = t.extrudePath,
                S = !1,
                T = t.material,
                A = t.extrudeMaterial,
                E = void 0 !== t.UVGenerator ? t.UVGenerator : n.ExtrudeGeometry.WorldUVGenerator;
            M && (c = M.getSpacedPoints(_), S = !0, w = !1, f = void 0 !== t.frames ? t.frames : new n.TubeGeometry.FrenetFrames(M, _, !1), p = new n.Vector3, d = new n.Vector3, m = new n.Vector3), w || (x = 0, g = 0, y = 0);
            var C, L, P, R = this,
                D = this.vertices.length,
                F = e.extractPoints(b),
                U = F.shape,
                B = F.holes,
                k = !n.Shape.Utils.isClockWise(U);
            if (k) {
                for (U = U.reverse(), L = 0, P = B.length; P > L; L++) C = B[L], n.Shape.Utils.isClockWise(C) && (B[L] = C.reverse());
                k = !1
            }
            var z = n.Shape.Utils.triangulateShape(U, B),
                V = U;
            for (L = 0, P = B.length; P > L; L++) C = B[L], U = U.concat(C);
            for (var O, N, I, G, H, W, j = U.length, X = z.length, q = (V.length, 180 / Math.PI, []), Y = 0, K = V.length, Z = K - 1, Q = Y + 1; K > Y; Y++, Z++, Q++) {
                Z === K && (Z = 0), Q === K && (Q = 0);
                V[Y], V[Z], V[Q];
                q[Y] = i(V[Y], V[Z], V[Q])
            }
            var J, $ = [],
                ee = q.concat();
            for (L = 0, P = B.length; P > L; L++) {
                for (C = B[L], J = [], Y = 0, K = C.length, Z = K - 1, Q = Y + 1; K > Y; Y++, Z++, Q++) Z === K && (Z = 0), Q === K && (Q = 0), J[Y] = i(C[Y], C[Z], C[Q]);
                $.push(J), ee = ee.concat(J)
            }
            for (O = 0; x > O; O++) {
                for (I = O / x, G = g * (1 - I), N = y * Math.sin(I * Math.PI / 2), Y = 0, K = V.length; K > Y; Y++) H = r(V[Y], q[Y], N), h(H.x, H.y, -G);
                for (L = 0, P = B.length; P > L; L++)
                    for (C = B[L], J = $[L], Y = 0, K = C.length; K > Y; Y++) H = r(C[Y], J[Y], N), h(H.x, H.y, -G)
            }
            for (N = y, Y = 0; j > Y; Y++) H = w ? r(U[Y], ee[Y], N) : U[Y], S ? (d.copy(f.normals[0]).multiplyScalar(H.x), p.copy(f.binormals[0]).multiplyScalar(H.y), m.copy(c[0]).add(d).add(p), h(m.x, m.y, m.z)) : h(H.x, H.y, 0);
            var te;
            for (te = 1; _ >= te; te++)
                for (Y = 0; j > Y; Y++) H = w ? r(U[Y], ee[Y], N) : U[Y], S ? (d.copy(f.normals[te]).multiplyScalar(H.x), p.copy(f.binormals[te]).multiplyScalar(H.y), m.copy(c[te]).add(d).add(p), h(m.x, m.y, m.z)) : h(H.x, H.y, v / _ * te);
            for (O = x - 1; O >= 0; O--) {
                for (I = O / x, G = g * (1 - I), N = y * Math.sin(I * Math.PI / 2), Y = 0, K = V.length; K > Y; Y++) H = r(V[Y], q[Y], N), h(H.x, H.y, v + G);
                for (L = 0, P = B.length; P > L; L++)
                    for (C = B[L], J = $[L], Y = 0, K = C.length; K > Y; Y++) H = r(C[Y], J[Y], N), S ? h(H.x, H.y + c[_ - 1].y, c[_ - 1].x + G) : h(H.x, H.y, v + G)
            }
            o(), a()
        }, n.ExtrudeGeometry.WorldUVGenerator = {
            generateTopUV: function(e, t, r, i) {
                var o = e.vertices,
                    a = o[t],
                    s = o[r],
                    h = o[i];
                return [new n.Vector2(a.x, a.y), new n.Vector2(s.x, s.y), new n.Vector2(h.x, h.y)]
            },
            generateSideWallUV: function(e, t, r, i, o) {
                var a = e.vertices,
                    s = a[t],
                    h = a[r],
                    l = a[i],
                    u = a[o];
                return Math.abs(s.y - h.y) < .01 ? [new n.Vector2(s.x, 1 - s.z), new n.Vector2(h.x, 1 - h.z), new n.Vector2(l.x, 1 - l.z), new n.Vector2(u.x, 1 - u.z)] : [new n.Vector2(s.y, 1 - s.z), new n.Vector2(h.y, 1 - h.z), new n.Vector2(l.y, 1 - l.z), new n.Vector2(u.y, 1 - u.z)]
            }
        }, n.ShapeGeometry = function(e, t) {
            n.Geometry.call(this), this.type = "ShapeGeometry", e instanceof Array == !1 && (e = [e]), this.addShapeList(e, t), this.computeFaceNormals()
        }, n.ShapeGeometry.prototype = Object.create(n.Geometry.prototype), n.ShapeGeometry.prototype.addShapeList = function(e, t) {
            for (var r = 0, i = e.length; i > r; r++) this.addShape(e[r], t);
            return this
        }, n.ShapeGeometry.prototype.addShape = function(e, t) {
            void 0 === t && (t = {});
            var r, i, o, a = void 0 !== t.curveSegments ? t.curveSegments : 12,
                s = t.material,
                h = void 0 === t.UVGenerator ? n.ExtrudeGeometry.WorldUVGenerator : t.UVGenerator,
                l = this.vertices.length,
                u = e.extractPoints(a),
                c = u.shape,
                f = u.holes,
                p = !n.Shape.Utils.isClockWise(c);
            if (p) {
                for (c = c.reverse(), r = 0, i = f.length; i > r; r++) o = f[r], n.Shape.Utils.isClockWise(o) && (f[r] = o.reverse());
                p = !1
            }
            var d = n.Shape.Utils.triangulateShape(c, f),
                m = c;
            for (r = 0, i = f.length; i > r; r++) o = f[r], c = c.concat(o);
            var v, g, y = c.length,
                x = d.length;
            m.length;
            for (r = 0; y > r; r++) v = c[r], this.vertices.push(new n.Vector3(v.x, v.y, 0));
            for (r = 0; x > r; r++) {
                g = d[r];
                var w = g[0] + l,
                    b = g[1] + l,
                    _ = g[2] + l;
                this.faces.push(new n.Face3(w, b, _, null, null, s)), this.faceVertexUvs[0].push(h.generateTopUV(this, w, b, _))
            }
        }, n.LatheGeometry = function(e, t, r, i) {
            n.Geometry.call(this), this.type = "LatheGeometry", this.parameters = {
                points: e,
                segments: t,
                phiStart: r,
                phiLength: i
            }, t = t || 12, r = r || 0, i = i || 2 * Math.PI;
            for (var o = 1 / (e.length - 1), a = 1 / t, s = 0, h = t; h >= s; s++)
                for (var l = r + s * a * i, u = Math.cos(l), c = Math.sin(l), f = 0, p = e.length; p > f; f++) {
                    var d = e[f],
                        m = new n.Vector3;
                    m.x = u * d.x - c * d.y, m.y = c * d.x + u * d.y, m.z = d.z, this.vertices.push(m)
                }
            for (var v = e.length, s = 0, h = t; h > s; s++)
                for (var f = 0, p = e.length - 1; p > f; f++) {
                    var g = f + v * s,
                        y = g,
                        x = g + v,
                        u = g + 1 + v,
                        w = g + 1,
                        b = s * a,
                        _ = f * o,
                        M = b + a,
                        S = _ + o;
                    this.faces.push(new n.Face3(y, x, w)), this.faceVertexUvs[0].push([new n.Vector2(b, _), new n.Vector2(M, _), new n.Vector2(b, S)]), this.faces.push(new n.Face3(x, u, w)), this.faceVertexUvs[0].push([new n.Vector2(M, _), new n.Vector2(M, S), new n.Vector2(b, S)])
                }
            this.mergeVertices(), this.computeFaceNormals(), this.computeVertexNormals()
        }, n.LatheGeometry.prototype = Object.create(n.Geometry.prototype), n.PlaneGeometry = function(e, t, r, i) {
            console.info("THREE.PlaneGeometry: Consider using THREE.PlaneBufferGeometry for lower memory footprint."), n.Geometry.call(this), this.type = "PlaneGeometry", this.parameters = {
                width: e,
                height: t,
                widthSegments: r,
                heightSegments: i
            }, this.fromBufferGeometry(new n.PlaneBufferGeometry(e, t, r, i))
        }, n.PlaneGeometry.prototype = Object.create(n.Geometry.prototype), n.PlaneBufferGeometry = function(e, t, r, i) {
            n.BufferGeometry.call(this), this.type = "PlaneBufferGeometry", this.parameters = {
                width: e,
                height: t,
                widthSegments: r,
                heightSegments: i
            };
            for (var o = e / 2, a = t / 2, s = r || 1, h = i || 1, l = s + 1, u = h + 1, c = e / s, f = t / h, p = new Float32Array(l * u * 3), d = new Float32Array(l * u * 3), m = new Float32Array(l * u * 2), v = 0, g = 0, y = 0; u > y; y++)
                for (var x = y * f - a, w = 0; l > w; w++) {
                    var b = w * c - o;
                    p[v] = b, p[v + 1] = -x, d[v + 2] = 1, m[g] = w / s, m[g + 1] = 1 - y / h, v += 3, g += 2
                }
            v = 0;
            for (var _ = new(p.length / 3 > 65535 ? Uint32Array : Uint16Array)(s * h * 6), y = 0; h > y; y++)
                for (var w = 0; s > w; w++) {
                    var M = w + l * y,
                        S = w + l * (y + 1),
                        T = w + 1 + l * (y + 1),
                        A = w + 1 + l * y;
                    _[v] = M, _[v + 1] = S, _[v + 2] = A, _[v + 3] = S, _[v + 4] = T, _[v + 5] = A, v += 6
                }
            this.addAttribute("index", new n.BufferAttribute(_, 1)), this.addAttribute("position", new n.BufferAttribute(p, 3)), this.addAttribute("normal", new n.BufferAttribute(d, 3)), this.addAttribute("uv", new n.BufferAttribute(m, 2))
        }, n.PlaneBufferGeometry.prototype = Object.create(n.BufferGeometry.prototype), n.RingGeometry = function(e, t, r, i, o, a) {
            n.Geometry.call(this), this.type = "RingGeometry", this.parameters = {
                innerRadius: e,
                outerRadius: t,
                thetaSegments: r,
                phiSegments: i,
                thetaStart: o,
                thetaLength: a
            }, e = e || 0, t = t || 50, o = void 0 !== o ? o : 0, a = void 0 !== a ? a : 2 * Math.PI, r = void 0 !== r ? Math.max(3, r) : 8, i = void 0 !== i ? Math.max(1, i) : 8;
            var s, h, l = [],
                u = e,
                c = (t - e) / i;
            for (s = 0; i + 1 > s; s++) {
                for (h = 0; r + 1 > h; h++) {
                    var f = new n.Vector3,
                        p = o + h / r * a;
                    f.x = u * Math.cos(p), f.y = u * Math.sin(p), this.vertices.push(f), l.push(new n.Vector2((f.x / t + 1) / 2, (f.y / t + 1) / 2))
                }
                u += c
            }
            var d = new n.Vector3(0, 0, 1);
            for (s = 0; i > s; s++) {
                var m = s * (r + 1);
                for (h = 0; r > h; h++) {
                    var p = h + m,
                        v = p,
                        g = p + r + 1,
                        y = p + r + 2;
                    this.faces.push(new n.Face3(v, g, y, [d.clone(), d.clone(), d.clone()])), this.faceVertexUvs[0].push([l[v].clone(), l[g].clone(), l[y].clone()]), v = p, g = p + r + 2, y = p + 1, this.faces.push(new n.Face3(v, g, y, [d.clone(), d.clone(), d.clone()])), this.faceVertexUvs[0].push([l[v].clone(), l[g].clone(), l[y].clone()])
                }
            }
            this.computeFaceNormals(), this.boundingSphere = new n.Sphere(new n.Vector3, u)
        }, n.RingGeometry.prototype = Object.create(n.Geometry.prototype), n.SphereGeometry = function(e, t, r, i, o, a, s) {
            n.Geometry.call(this), this.type = "SphereGeometry", this.parameters = {
                radius: e,
                widthSegments: t,
                heightSegments: r,
                phiStart: i,
                phiLength: o,
                thetaStart: a,
                thetaLength: s
            }, e = e || 50, t = Math.max(3, Math.floor(t) || 8), r = Math.max(2, Math.floor(r) || 6), i = void 0 !== i ? i : 0, o = void 0 !== o ? o : 2 * Math.PI, a = void 0 !== a ? a : 0, s = void 0 !== s ? s : Math.PI;
            var h, l, u = [],
                c = [];
            for (l = 0; r >= l; l++) {
                var f = [],
                    p = [];
                for (h = 0; t >= h; h++) {
                    var d = h / t,
                        m = l / r,
                        v = new n.Vector3;
                    v.x = -e * Math.cos(i + d * o) * Math.sin(a + m * s), v.y = e * Math.cos(a + m * s), v.z = e * Math.sin(i + d * o) * Math.sin(a + m * s), this.vertices.push(v), f.push(this.vertices.length - 1), p.push(new n.Vector2(d, 1 - m))
                }
                u.push(f), c.push(p)
            }
            for (l = 0; r > l; l++)
                for (h = 0; t > h; h++) {
                    var g = u[l][h + 1],
                        y = u[l][h],
                        x = u[l + 1][h],
                        w = u[l + 1][h + 1],
                        b = this.vertices[g].clone().normalize(),
                        _ = this.vertices[y].clone().normalize(),
                        M = this.vertices[x].clone().normalize(),
                        S = this.vertices[w].clone().normalize(),
                        T = c[l][h + 1].clone(),
                        A = c[l][h].clone(),
                        E = c[l + 1][h].clone(),
                        C = c[l + 1][h + 1].clone();
                    Math.abs(this.vertices[g].y) === e ? (T.x = (T.x + A.x) / 2, this.faces.push(new n.Face3(g, x, w, [b, M, S])), this.faceVertexUvs[0].push([T, E, C])) : Math.abs(this.vertices[x].y) === e ? (E.x = (E.x + C.x) / 2, this.faces.push(new n.Face3(g, y, x, [b, _, M])), this.faceVertexUvs[0].push([T, A, E])) : (this.faces.push(new n.Face3(g, y, w, [b, _, S])), this.faceVertexUvs[0].push([T, A, C]), this.faces.push(new n.Face3(y, x, w, [_.clone(), M, S.clone()])), this.faceVertexUvs[0].push([A.clone(), E, C.clone()]))
                }
            this.computeFaceNormals(), this.boundingSphere = new n.Sphere(new n.Vector3, e)
        }, n.SphereGeometry.prototype = Object.create(n.Geometry.prototype), n.TextGeometry = function(e, t) {
            t = t || {};
            var r = n.FontUtils.generateShapes(e, t);
            t.amount = void 0 !== t.height ? t.height : 50, void 0 === t.bevelThickness && (t.bevelThickness = 10), void 0 === t.bevelSize && (t.bevelSize = 8), void 0 === t.bevelEnabled && (t.bevelEnabled = !1), n.ExtrudeGeometry.call(this, r, t), this.type = "TextGeometry"
        }, n.TextGeometry.prototype = Object.create(n.ExtrudeGeometry.prototype), n.TorusGeometry = function(e, t, r, i, o) {
            n.Geometry.call(this), this.type = "TorusGeometry", this.parameters = {
                radius: e,
                tube: t,
                radialSegments: r,
                tubularSegments: i,
                arc: o
            }, e = e || 100, t = t || 40, r = r || 8, i = i || 6, o = o || 2 * Math.PI;
            for (var a = new n.Vector3, s = [], h = [], l = 0; r >= l; l++)
                for (var u = 0; i >= u; u++) {
                    var c = u / i * o,
                        f = l / r * Math.PI * 2;
                    a.x = e * Math.cos(c), a.y = e * Math.sin(c);
                    var p = new n.Vector3;
                    p.x = (e + t * Math.cos(f)) * Math.cos(c), p.y = (e + t * Math.cos(f)) * Math.sin(c), p.z = t * Math.sin(f), this.vertices.push(p), s.push(new n.Vector2(u / i, l / r)), h.push(p.clone().sub(a).normalize())
                }
            for (var l = 1; r >= l; l++)
                for (var u = 1; i >= u; u++) {
                    var d = (i + 1) * l + u - 1,
                        m = (i + 1) * (l - 1) + u - 1,
                        v = (i + 1) * (l - 1) + u,
                        g = (i + 1) * l + u,
                        y = new n.Face3(d, m, g, [h[d].clone(), h[m].clone(), h[g].clone()]);
                    this.faces.push(y), this.faceVertexUvs[0].push([s[d].clone(), s[m].clone(), s[g].clone()]), y = new n.Face3(m, v, g, [h[m].clone(), h[v].clone(), h[g].clone()]), this.faces.push(y), this.faceVertexUvs[0].push([s[m].clone(), s[v].clone(), s[g].clone()])
                }
            this.computeFaceNormals()
        }, n.TorusGeometry.prototype = Object.create(n.Geometry.prototype), n.TorusKnotGeometry = function(e, t, r, i, o, a, s) {
            function h(e, t, r, i, o) {
                var a = Math.cos(e),
                    s = Math.sin(e),
                    h = t / r * e,
                    l = Math.cos(h),
                    u = i * (2 + l) * .5 * a,
                    c = i * (2 + l) * s * .5,
                    f = o * i * Math.sin(h) * .5;
                return new n.Vector3(u, c, f)
            }
            n.Geometry.call(this), this.type = "TorusKnotGeometry", this.parameters = {
                radius: e,
                tube: t,
                radialSegments: r,
                tubularSegments: i,
                p: o,
                q: a,
                heightScale: s
            }, e = e || 100, t = t || 40, r = r || 64, i = i || 8, o = o || 2, a = a || 3, s = s || 1;
            for (var l = new Array(r), u = new n.Vector3, c = new n.Vector3, f = new n.Vector3, p = 0; r > p; ++p) {
                l[p] = new Array(i);
                var d = p / r * 2 * o * Math.PI,
                    m = h(d, a, o, e, s),
                    v = h(d + .01, a, o, e, s);
                u.subVectors(v, m), c.addVectors(v, m), f.crossVectors(u, c), c.crossVectors(f, u), f.normalize(), c.normalize();
                for (var g = 0; i > g; ++g) {
                    var y = g / i * 2 * Math.PI,
                        x = -t * Math.cos(y),
                        w = t * Math.sin(y),
                        b = new n.Vector3;
                    b.x = m.x + x * c.x + w * f.x, b.y = m.y + x * c.y + w * f.y, b.z = m.z + x * c.z + w * f.z, l[p][g] = this.vertices.push(b) - 1
                }
            }
            for (var p = 0; r > p; ++p)
                for (var g = 0; i > g; ++g) {
                    var _ = (p + 1) % r,
                        M = (g + 1) % i,
                        S = l[p][g],
                        T = l[_][g],
                        A = l[_][M],
                        E = l[p][M],
                        C = new n.Vector2(p / r, g / i),
                        L = new n.Vector2((p + 1) / r, g / i),
                        P = new n.Vector2((p + 1) / r, (g + 1) / i),
                        R = new n.Vector2(p / r, (g + 1) / i);
                    this.faces.push(new n.Face3(S, T, E)), this.faceVertexUvs[0].push([C, L, R]), this.faces.push(new n.Face3(T, A, E)), this.faceVertexUvs[0].push([L.clone(), P, R.clone()])
                }
            this.computeFaceNormals(), this.computeVertexNormals()
        }, n.TorusKnotGeometry.prototype = Object.create(n.Geometry.prototype), n.TubeGeometry = function(e, t, r, i, o) {
            function a(e, t, r) {
                return C.vertices.push(new n.Vector3(e, t, r)) - 1
            }
            n.Geometry.call(this), this.type = "TubeGeometry", this.parameters = {
                path: e,
                segments: t,
                radius: r,
                radialSegments: i,
                closed: o
            }, t = t || 64, r = r || 1, i = i || 8, o = o || !1;
            var s, h, l, u, c, f, p, d, m, v, g, y, x, w, b, _, M, S, T, A, E = [],
                C = this,
                L = t + 1,
                P = new n.Vector3,
                R = new n.TubeGeometry.FrenetFrames(e, t, o),
                D = R.tangents,
                F = R.normals,
                U = R.binormals;
            for (this.tangents = D, this.normals = F, this.binormals = U, m = 0; L > m; m++)
                for (E[m] = [], u = m / (L - 1), d = e.getPointAt(u), s = D[m], h = F[m], l = U[m], v = 0; i > v; v++) c = v / i * 2 * Math.PI, f = -r * Math.cos(c), p = r * Math.sin(c), P.copy(d), P.x += f * h.x + p * l.x, P.y += f * h.y + p * l.y, P.z += f * h.z + p * l.z, E[m][v] = a(P.x, P.y, P.z);
            for (m = 0; t > m; m++)
                for (v = 0; i > v; v++) g = o ? (m + 1) % t : m + 1, y = (v + 1) % i, x = E[m][v], w = E[g][v], b = E[g][y], _ = E[m][y], M = new n.Vector2(m / t, v / i), S = new n.Vector2((m + 1) / t, v / i), T = new n.Vector2((m + 1) / t, (v + 1) / i), A = new n.Vector2(m / t, (v + 1) / i), this.faces.push(new n.Face3(x, w, _)), this.faceVertexUvs[0].push([M, S, A]), this.faces.push(new n.Face3(w, b, _)), this.faceVertexUvs[0].push([S.clone(), T, A.clone()]);
            this.computeFaceNormals(), this.computeVertexNormals()
        }, n.TubeGeometry.prototype = Object.create(n.Geometry.prototype), n.TubeGeometry.FrenetFrames = function(e, t, r) {
            function i() {
                d[0] = new n.Vector3, m[0] = new n.Vector3, a = Number.MAX_VALUE, s = Math.abs(p[0].x), h = Math.abs(p[0].y), l = Math.abs(p[0].z), a >= s && (a = s, f.set(1, 0, 0)), a >= h && (a = h, f.set(0, 1, 0)), a >= l && f.set(0, 0, 1), v.crossVectors(p[0], f).normalize(), d[0].crossVectors(p[0], v), m[0].crossVectors(p[0], d[0])
            }
            var o, a, s, h, l, u, c, f = (new n.Vector3, new n.Vector3),
                p = (new n.Vector3, []),
                d = [],
                m = [],
                v = new n.Vector3,
                g = new n.Matrix4,
                y = t + 1,
                x = 1e-4;
            for (this.tangents = p, this.normals = d, this.binormals = m, u = 0; y > u; u++) c = u / (y - 1), p[u] = e.getTangentAt(c), p[u].normalize();
            for (i(), u = 1; y > u; u++) d[u] = d[u - 1].clone(), m[u] = m[u - 1].clone(), v.crossVectors(p[u - 1], p[u]), v.length() > x && (v.normalize(), o = Math.acos(n.Math.clamp(p[u - 1].dot(p[u]), -1, 1)), d[u].applyMatrix4(g.makeRotationAxis(v, o))), m[u].crossVectors(p[u], d[u]);
            if (r)
                for (o = Math.acos(n.Math.clamp(d[0].dot(d[y - 1]), -1, 1)), o /= y - 1, p[0].dot(v.crossVectors(d[0], d[y - 1])) > 0 && (o = -o), u = 1; y > u; u++) d[u].applyMatrix4(g.makeRotationAxis(p[u], o * u)), m[u].crossVectors(p[u], d[u])
        }, n.PolyhedronGeometry = function(e, t, r, i) {
            function o(e) {
                var t = e.normalize().clone();
                t.index = c.vertices.push(t) - 1;
                var r = h(e) / 2 / Math.PI + .5,
                    i = l(e) / Math.PI + .5;
                return t.uv = new n.Vector2(r, 1 - i), t
            }

            function a(e, t, r) {
                var i = new n.Face3(e.index, t.index, r.index, [e.clone(), t.clone(), r.clone()]);
                c.faces.push(i), w.copy(e).add(t).add(r).divideScalar(3);
                var o = h(w);
                c.faceVertexUvs[0].push([u(e.uv, e, o), u(t.uv, t, o), u(r.uv, r, o)])
            }

            function s(e, t) {
                for (var r = Math.pow(2, t), i = (Math.pow(4, t), o(c.vertices[e.a])), n = o(c.vertices[e.b]), s = o(c.vertices[e.c]), h = [], l = 0; r >= l; l++) {
                    h[l] = [];
                    for (var u = o(i.clone().lerp(s, l / r)), f = o(n.clone().lerp(s, l / r)), p = r - l, d = 0; p >= d; d++) 0 == d && l == r ? h[l][d] = u : h[l][d] = o(u.clone().lerp(f, d / p))
                }
                for (var l = 0; r > l; l++)
                    for (var d = 0; 2 * (r - l) - 1 > d; d++) {
                        var m = Math.floor(d / 2);
                        d % 2 == 0 ? a(h[l][m + 1], h[l + 1][m], h[l][m]) : a(h[l][m + 1], h[l + 1][m + 1], h[l + 1][m])
                    }
            }

            function h(e) {
                return Math.atan2(e.z, -e.x)
            }

            function l(e) {
                return Math.atan2(-e.y, Math.sqrt(e.x * e.x + e.z * e.z))
            }

            function u(e, t, r) {
                return 0 > r && 1 === e.x && (e = new n.Vector2(e.x - 1, e.y)), 0 === t.x && 0 === t.z && (e = new n.Vector2(r / 2 / Math.PI + .5, e.y)), e.clone()
            }
            n.Geometry.call(this), this.type = "PolyhedronGeometry", this.parameters = {
                vertices: e,
                indices: t,
                radius: r,
                detail: i
            }, r = r || 1, i = i || 0;
            for (var c = this, f = 0, p = e.length; p > f; f += 3) o(new n.Vector3(e[f], e[f + 1], e[f + 2]));
            for (var d = this.vertices, m = [], f = 0, v = 0, p = t.length; p > f; f += 3, v++) {
                var g = d[t[f]],
                    y = d[t[f + 1]],
                    x = d[t[f + 2]];
                m[v] = new n.Face3(g.index, y.index, x.index, [g.clone(), y.clone(), x.clone()])
            }
            for (var w = new n.Vector3, f = 0, p = m.length; p > f; f++) s(m[f], i);
            for (var f = 0, p = this.faceVertexUvs[0].length; p > f; f++) {
                var b = this.faceVertexUvs[0][f],
                    _ = b[0].x,
                    M = b[1].x,
                    S = b[2].x,
                    T = Math.max(_, Math.max(M, S)),
                    A = Math.min(_, Math.min(M, S));
                T > .9 && .1 > A && (.2 > _ && (b[0].x += 1), .2 > M && (b[1].x += 1), .2 > S && (b[2].x += 1))
            }
            for (var f = 0, p = this.vertices.length; p > f; f++) this.vertices[f].multiplyScalar(r);
            this.mergeVertices(), this.computeFaceNormals(), this.boundingSphere = new n.Sphere(new n.Vector3, r)
        }, n.PolyhedronGeometry.prototype = Object.create(n.Geometry.prototype), n.DodecahedronGeometry = function(e, t) {
            this.parameters = {
                radius: e,
                detail: t
            };
            var r = (1 + Math.sqrt(5)) / 2,
                i = 1 / r,
                o = [-1, -1, -1, -1, -1, 1, -1, 1, -1, -1, 1, 1, 1, -1, -1, 1, -1, 1, 1, 1, -1, 1, 1, 1, 0, -i, -r, 0, -i, r, 0, i, -r, 0, i, r, -i, -r, 0, -i, r, 0, i, -r, 0, i, r, 0, -r, 0, -i, r, 0, -i, -r, 0, i, r, 0, i],
                a = [3, 11, 7, 3, 7, 15, 3, 15, 13, 7, 19, 17, 7, 17, 6, 7, 6, 15, 17, 4, 8, 17, 8, 10, 17, 10, 6, 8, 0, 16, 8, 16, 2, 8, 2, 10, 0, 12, 1, 0, 1, 18, 0, 18, 16, 6, 10, 2, 6, 2, 13, 6, 13, 15, 2, 16, 18, 2, 18, 3, 2, 3, 13, 18, 1, 9, 18, 9, 11, 18, 11, 3, 4, 14, 12, 4, 12, 0, 4, 0, 8, 11, 9, 5, 11, 5, 19, 11, 19, 7, 19, 5, 14, 19, 14, 4, 19, 4, 17, 1, 12, 14, 1, 14, 5, 1, 5, 9];
            n.PolyhedronGeometry.call(this, o, a, e, t)
        }, n.DodecahedronGeometry.prototype = Object.create(n.Geometry.prototype), n.IcosahedronGeometry = function(e, t) {
            var r = (1 + Math.sqrt(5)) / 2,
                i = [-1, r, 0, 1, r, 0, -1, -r, 0, 1, -r, 0, 0, -1, r, 0, 1, r, 0, -1, -r, 0, 1, -r, r, 0, -1, r, 0, 1, -r, 0, -1, -r, 0, 1],
                o = [0, 11, 5, 0, 5, 1, 0, 1, 7, 0, 7, 10, 0, 10, 11, 1, 5, 9, 5, 11, 4, 11, 10, 2, 10, 7, 6, 7, 1, 8, 3, 9, 4, 3, 4, 2, 3, 2, 6, 3, 6, 8, 3, 8, 9, 4, 9, 5, 2, 4, 11, 6, 2, 10, 8, 6, 7, 9, 8, 1];
            n.PolyhedronGeometry.call(this, i, o, e, t), this.type = "IcosahedronGeometry", this.parameters = {
                radius: e,
                detail: t
            }
        }, n.IcosahedronGeometry.prototype = Object.create(n.Geometry.prototype), n.OctahedronGeometry = function(e, t) {
            this.parameters = {
                radius: e,
                detail: t
            };
            var r = [1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1],
                i = [0, 2, 4, 0, 4, 3, 0, 3, 5, 0, 5, 2, 1, 2, 5, 1, 5, 3, 1, 3, 4, 1, 4, 2];
            n.PolyhedronGeometry.call(this, r, i, e, t), this.type = "OctahedronGeometry", this.parameters = {
                radius: e,
                detail: t
            }
        }, n.OctahedronGeometry.prototype = Object.create(n.Geometry.prototype), n.TetrahedronGeometry = function(e, t) {
            var r = [1, 1, 1, -1, -1, 1, -1, 1, -1, 1, -1, -1],
                i = [2, 1, 0, 0, 3, 2, 1, 3, 0, 2, 3, 1];
            n.PolyhedronGeometry.call(this, r, i, e, t), this.type = "TetrahedronGeometry", this.parameters = {
                radius: e,
                detail: t
            }
        }, n.TetrahedronGeometry.prototype = Object.create(n.Geometry.prototype), n.ParametricGeometry = function(e, t, r) {
            n.Geometry.call(this), this.type = "ParametricGeometry", this.parameters = {
                func: e,
                slices: t,
                stacks: r
            };
            var i, o, a, s, h, l = this.vertices,
                u = this.faces,
                c = this.faceVertexUvs[0],
                f = t + 1;
            for (i = 0; r >= i; i++)
                for (h = i / r, o = 0; t >= o; o++) s = o / t, a = e(s, h), l.push(a);
            var p, d, m, v, g, y, x, w;
            for (i = 0; r > i; i++)
                for (o = 0; t > o; o++) p = i * f + o, d = i * f + o + 1, m = (i + 1) * f + o + 1, v = (i + 1) * f + o, g = new n.Vector2(o / t, i / r), y = new n.Vector2((o + 1) / t, i / r), x = new n.Vector2((o + 1) / t, (i + 1) / r), w = new n.Vector2(o / t, (i + 1) / r), u.push(new n.Face3(p, d, v)), c.push([g, y, w]), u.push(new n.Face3(d, m, v)), c.push([y.clone(), x, w.clone()]);
            this.computeFaceNormals(), this.computeVertexNormals()
        }, n.ParametricGeometry.prototype = Object.create(n.Geometry.prototype), n.AxisHelper = function(e) {
            e = e || 1;
            var t = new Float32Array([0, 0, 0, e, 0, 0, 0, 0, 0, 0, e, 0, 0, 0, 0, 0, 0, e]),
                r = new Float32Array([1, 0, 0, 1, .6, 0, 0, 1, 0, .6, 1, 0, 0, 0, 1, 0, .6, 1]),
                i = new n.BufferGeometry;
            i.addAttribute("position", new n.BufferAttribute(t, 3)), i.addAttribute("color", new n.BufferAttribute(r, 3));
            var o = new n.LineBasicMaterial({
                vertexColors: n.VertexColors
            });
            n.Line.call(this, i, o, n.LinePieces)
        }, n.AxisHelper.prototype = Object.create(n.Line.prototype), n.ArrowHelper = function() {
            var e = new n.Geometry;
            e.vertices.push(new n.Vector3(0, 0, 0), new n.Vector3(0, 1, 0));
            var t = new n.CylinderGeometry(0, .5, 1, 5, 1);
            return t.applyMatrix((new n.Matrix4).makeTranslation(0, -.5, 0)),
                function(r, i, o, a, s, h) {
                    n.Object3D.call(this), void 0 === a && (a = 16776960), void 0 === o && (o = 1), void 0 === s && (s = .2 * o), void 0 === h && (h = .2 * s), this.position.copy(i), this.line = new n.Line(e, new n.LineBasicMaterial({
                        color: a
                    })), this.line.matrixAutoUpdate = !1, this.add(this.line), this.cone = new n.Mesh(t, new n.MeshBasicMaterial({
                        color: a
                    })), this.cone.matrixAutoUpdate = !1, this.add(this.cone), this.setDirection(r), this.setLength(o, s, h)
                }
        }(), n.ArrowHelper.prototype = Object.create(n.Object3D.prototype), n.ArrowHelper.prototype.setDirection = function() {
            var e, t = new n.Vector3;
            return function(r) {
                r.y > .99999 ? this.quaternion.set(0, 0, 0, 1) : r.y < -.99999 ? this.quaternion.set(1, 0, 0, 0) : (t.set(r.z, 0, -r.x).normalize(), e = Math.acos(r.y), this.quaternion.setFromAxisAngle(t, e))
            }
        }(), n.ArrowHelper.prototype.setLength = function(e, t, r) {
            void 0 === t && (t = .2 * e), void 0 === r && (r = .2 * t), this.line.scale.set(1, e, 1), this.line.updateMatrix(), this.cone.scale.set(r, t, r), this.cone.position.y = e, this.cone.updateMatrix()
        }, n.ArrowHelper.prototype.setColor = function(e) {
            this.line.material.color.set(e), this.cone.material.color.set(e)
        }, n.BoxHelper = function(e) {
            var t = new n.BufferGeometry;
            t.addAttribute("position", new n.BufferAttribute(new Float32Array(72), 3)), n.Line.call(this, t, new n.LineBasicMaterial({
                color: 16776960
            }), n.LinePieces), void 0 !== e && this.update(e)
        }, n.BoxHelper.prototype = Object.create(n.Line.prototype), n.BoxHelper.prototype.update = function(e) {
            var t = e.geometry;
            null === t.boundingBox && t.computeBoundingBox();
            var r = t.boundingBox.min,
                i = t.boundingBox.max,
                n = this.geometry.attributes.position.array;
            n[0] = i.x, n[1] = i.y, n[2] = i.z, n[3] = r.x, n[4] = i.y, n[5] = i.z, n[6] = r.x, n[7] = i.y, n[8] = i.z, n[9] = r.x, n[10] = r.y, n[11] = i.z, n[12] = r.x, n[13] = r.y, n[14] = i.z, n[15] = i.x, n[16] = r.y, n[17] = i.z, n[18] = i.x, n[19] = r.y, n[20] = i.z, n[21] = i.x, n[22] = i.y, n[23] = i.z, n[24] = i.x, n[25] = i.y, n[26] = r.z, n[27] = r.x, n[28] = i.y, n[29] = r.z, n[30] = r.x, n[31] = i.y, n[32] = r.z, n[33] = r.x, n[34] = r.y, n[35] = r.z, n[36] = r.x, n[37] = r.y, n[38] = r.z, n[39] = i.x, n[40] = r.y, n[41] = r.z, n[42] = i.x, n[43] = r.y, n[44] = r.z, n[45] = i.x, n[46] = i.y, n[47] = r.z, n[48] = i.x, n[49] = i.y, n[50] = i.z, n[51] = i.x, n[52] = i.y, n[53] = r.z, n[54] = r.x, n[55] = i.y, n[56] = i.z, n[57] = r.x, n[58] = i.y, n[59] = r.z, n[60] = r.x, n[61] = r.y, n[62] = i.z, n[63] = r.x, n[64] = r.y, n[65] = r.z, n[66] = i.x, n[67] = r.y, n[68] = i.z, n[69] = i.x, n[70] = r.y, n[71] = r.z, this.geometry.attributes.position.needsUpdate = !0, this.geometry.computeBoundingSphere(), this.matrix = e.matrixWorld, this.matrixAutoUpdate = !1
        }, n.BoundingBoxHelper = function(e, t) {
            var r = void 0 !== t ? t : 8947848;
            this.object = e, this.box = new n.Box3, n.Mesh.call(this, new n.BoxGeometry(1, 1, 1), new n.MeshBasicMaterial({
                color: r,
                wireframe: !0
            }))
        }, n.BoundingBoxHelper.prototype = Object.create(n.Mesh.prototype), n.BoundingBoxHelper.prototype.update = function() {
            this.box.setFromObject(this.object), this.box.size(this.scale), this.box.center(this.position)
        }, n.CameraHelper = function(e) {
            function t(e, t, i) {
                r(e, i), r(t, i)
            }

            function r(e, t) {
                i.vertices.push(new n.Vector3), i.colors.push(new n.Color(t)), void 0 === a[e] && (a[e] = []), a[e].push(i.vertices.length - 1)
            }
            var i = new n.Geometry,
                o = new n.LineBasicMaterial({
                    color: 16777215,
                    vertexColors: n.FaceColors
                }),
                a = {},
                s = 16755200,
                h = 16711680,
                l = 43775,
                u = 16777215,
                c = 3355443;
            t("n1", "n2", s), t("n2", "n4", s), t("n4", "n3", s), t("n3", "n1", s), t("f1", "f2", s), t("f2", "f4", s), t("f4", "f3", s), t("f3", "f1", s), t("n1", "f1", s), t("n2", "f2", s), t("n3", "f3", s), t("n4", "f4", s), t("p", "n1", h), t("p", "n2", h), t("p", "n3", h), t("p", "n4", h), t("u1", "u2", l), t("u2", "u3", l), t("u3", "u1", l), t("c", "t", u), t("p", "c", c), t("cn1", "cn2", c), t("cn3", "cn4", c), t("cf1", "cf2", c), t("cf3", "cf4", c), n.Line.call(this, i, o, n.LinePieces), this.camera = e, this.matrix = e.matrixWorld, this.matrixAutoUpdate = !1, this.pointMap = a, this.update()
        }, n.CameraHelper.prototype = Object.create(n.Line.prototype), n.CameraHelper.prototype.update = function() {
            var e, t, r = new n.Vector3,
                i = new n.Camera,
                o = function(n, o, a, s) {
                    r.set(o, a, s).unproject(i);
                    var h = t[n];
                    if (void 0 !== h)
                        for (var l = 0, u = h.length; u > l; l++) e.vertices[h[l]].copy(r)
                };
            return function() {
                e = this.geometry, t = this.pointMap;
                var r = 1,
                    n = 1;
                i.projectionMatrix.copy(this.camera.projectionMatrix), o("c", 0, 0, -1), o("t", 0, 0, 1), o("n1", -r, -n, -1), o("n2", r, -n, -1), o("n3", -r, n, -1), o("n4", r, n, -1), o("f1", -r, -n, 1), o("f2", r, -n, 1), o("f3", -r, n, 1), o("f4", r, n, 1), o("u1", .7 * r, 1.1 * n, -1), o("u2", .7 * -r, 1.1 * n, -1), o("u3", 0, 2 * n, -1), o("cf1", -r, 0, 1), o("cf2", r, 0, 1), o("cf3", 0, -n, 1), o("cf4", 0, n, 1), o("cn1", -r, 0, -1), o("cn2", r, 0, -1), o("cn3", 0, -n, -1), o("cn4", 0, n, -1), e.verticesNeedUpdate = !0
            }
        }(), n.DirectionalLightHelper = function(e, t) {
            n.Object3D.call(this), this.light = e, this.light.updateMatrixWorld(), this.matrix = e.matrixWorld, this.matrixAutoUpdate = !1, t = t || 1;
            var r = new n.Geometry;
            r.vertices.push(new n.Vector3(-t, t, 0), new n.Vector3(t, t, 0), new n.Vector3(t, -t, 0), new n.Vector3(-t, -t, 0), new n.Vector3(-t, t, 0));
            var i = new n.LineBasicMaterial({
                fog: !1
            });
            i.color.copy(this.light.color).multiplyScalar(this.light.intensity), this.lightPlane = new n.Line(r, i), this.add(this.lightPlane), r = new n.Geometry, r.vertices.push(new n.Vector3, new n.Vector3), i = new n.LineBasicMaterial({
                fog: !1
            }), i.color.copy(this.light.color).multiplyScalar(this.light.intensity), this.targetLine = new n.Line(r, i), this.add(this.targetLine), this.update()
        }, n.DirectionalLightHelper.prototype = Object.create(n.Object3D.prototype), n.DirectionalLightHelper.prototype.dispose = function() {
            this.lightPlane.geometry.dispose(), this.lightPlane.material.dispose(), this.targetLine.geometry.dispose(), this.targetLine.material.dispose()
        }, n.DirectionalLightHelper.prototype.update = function() {
            var e = new n.Vector3,
                t = new n.Vector3,
                r = new n.Vector3;
            return function() {
                e.setFromMatrixPosition(this.light.matrixWorld), t.setFromMatrixPosition(this.light.target.matrixWorld),
                    r.subVectors(t, e), this.lightPlane.lookAt(r), this.lightPlane.material.color.copy(this.light.color).multiplyScalar(this.light.intensity), this.targetLine.geometry.vertices[1].copy(r), this.targetLine.geometry.verticesNeedUpdate = !0, this.targetLine.material.color.copy(this.lightPlane.material.color)
            }
        }(), n.EdgesHelper = function(e, t) {
            var r = void 0 !== t ? t : 16777215,
                i = [0, 0],
                o = {},
                a = function(e, t) {
                    return e - t
                },
                s = ["a", "b", "c"],
                h = new n.BufferGeometry,
                l = e.geometry.clone();
            l.mergeVertices(), l.computeFaceNormals();
            for (var u = l.vertices, c = l.faces, f = 0, p = 0, d = c.length; d > p; p++)
                for (var m = c[p], v = 0; 3 > v; v++) {
                    i[0] = m[s[v]], i[1] = m[s[(v + 1) % 3]], i.sort(a);
                    var g = i.toString();
                    void 0 === o[g] ? (o[g] = {
                        vert1: i[0],
                        vert2: i[1],
                        face1: p,
                        face2: void 0
                    }, f++) : o[g].face2 = p
                }
            var y = new Float32Array(2 * f * 3),
                x = 0;
            for (var g in o) {
                var w = o[g];
                if (void 0 === w.face2 || c[w.face1].normal.dot(c[w.face2].normal) < .9999) {
                    var b = u[w.vert1];
                    y[x++] = b.x, y[x++] = b.y, y[x++] = b.z, b = u[w.vert2], y[x++] = b.x, y[x++] = b.y, y[x++] = b.z
                }
            }
            h.addAttribute("position", new n.BufferAttribute(y, 3)), n.Line.call(this, h, new n.LineBasicMaterial({
                color: r
            }), n.LinePieces), this.matrix = e.matrixWorld, this.matrixAutoUpdate = !1
        }, n.EdgesHelper.prototype = Object.create(n.Line.prototype), n.FaceNormalsHelper = function(e, t, r, i) {
            this.object = e, this.size = void 0 !== t ? t : 1;
            for (var o = void 0 !== r ? r : 16776960, a = void 0 !== i ? i : 1, s = new n.Geometry, h = this.object.geometry.faces, l = 0, u = h.length; u > l; l++) s.vertices.push(new n.Vector3, new n.Vector3);
            n.Line.call(this, s, new n.LineBasicMaterial({
                color: o,
                linewidth: a
            }), n.LinePieces), this.matrixAutoUpdate = !1, this.normalMatrix = new n.Matrix3, this.update()
        }, n.FaceNormalsHelper.prototype = Object.create(n.Line.prototype), n.FaceNormalsHelper.prototype.update = function() {
            var e = this.geometry.vertices,
                t = this.object,
                r = t.geometry.vertices,
                i = t.geometry.faces,
                n = t.matrixWorld;
            t.updateMatrixWorld(!0), this.normalMatrix.getNormalMatrix(n);
            for (var o = 0, a = 0, s = i.length; s > o; o++, a += 2) {
                var h = i[o];
                e[a].copy(r[h.a]).add(r[h.b]).add(r[h.c]).divideScalar(3).applyMatrix4(n), e[a + 1].copy(h.normal).applyMatrix3(this.normalMatrix).normalize().multiplyScalar(this.size).add(e[a])
            }
            return this.geometry.verticesNeedUpdate = !0, this
        }, n.GridHelper = function(e, t) {
            var r = new n.Geometry,
                i = new n.LineBasicMaterial({
                    vertexColors: n.VertexColors
                });
            this.color1 = new n.Color(4473924), this.color2 = new n.Color(8947848);
            for (var o = -e; e >= o; o += t) {
                r.vertices.push(new n.Vector3(-e, 0, o), new n.Vector3(e, 0, o), new n.Vector3(o, 0, -e), new n.Vector3(o, 0, e));
                var a = 0 === o ? this.color1 : this.color2;
                r.colors.push(a, a, a, a)
            }
            n.Line.call(this, r, i, n.LinePieces)
        }, n.GridHelper.prototype = Object.create(n.Line.prototype), n.GridHelper.prototype.setColors = function(e, t) {
            this.color1.set(e), this.color2.set(t), this.geometry.colorsNeedUpdate = !0
        }, n.HemisphereLightHelper = function(e, t, r, i) {
            n.Object3D.call(this), this.light = e, this.light.updateMatrixWorld(), this.matrix = e.matrixWorld, this.matrixAutoUpdate = !1, this.colors = [new n.Color, new n.Color];
            var o = new n.SphereGeometry(t, 4, 2);
            o.applyMatrix((new n.Matrix4).makeRotationX(-Math.PI / 2));
            for (var a = 0, s = 8; s > a; a++) o.faces[a].color = this.colors[4 > a ? 0 : 1];
            var h = new n.MeshBasicMaterial({
                vertexColors: n.FaceColors,
                wireframe: !0
            });
            this.lightSphere = new n.Mesh(o, h), this.add(this.lightSphere), this.update()
        }, n.HemisphereLightHelper.prototype = Object.create(n.Object3D.prototype), n.HemisphereLightHelper.prototype.dispose = function() {
            this.lightSphere.geometry.dispose(), this.lightSphere.material.dispose()
        }, n.HemisphereLightHelper.prototype.update = function() {
            var e = new n.Vector3;
            return function() {
                this.colors[0].copy(this.light.color).multiplyScalar(this.light.intensity), this.colors[1].copy(this.light.groundColor).multiplyScalar(this.light.intensity), this.lightSphere.lookAt(e.setFromMatrixPosition(this.light.matrixWorld).negate()), this.lightSphere.geometry.colorsNeedUpdate = !0
            }
        }(), n.PointLightHelper = function(e, t) {
            this.light = e, this.light.updateMatrixWorld();
            var r = new n.SphereGeometry(t, 4, 2),
                i = new n.MeshBasicMaterial({
                    wireframe: !0,
                    fog: !1
                });
            i.color.copy(this.light.color).multiplyScalar(this.light.intensity), n.Mesh.call(this, r, i), this.matrix = this.light.matrixWorld, this.matrixAutoUpdate = !1
        }, n.PointLightHelper.prototype = Object.create(n.Mesh.prototype), n.PointLightHelper.prototype.dispose = function() {
            this.geometry.dispose(), this.material.dispose()
        }, n.PointLightHelper.prototype.update = function() {
            this.material.color.copy(this.light.color).multiplyScalar(this.light.intensity)
        }, n.SkeletonHelper = function(e) {
            this.bones = this.getBoneList(e);
            for (var t = new n.Geometry, r = 0; r < this.bones.length; r++) {
                var i = this.bones[r];
                i.parent instanceof n.Bone && (t.vertices.push(new n.Vector3), t.vertices.push(new n.Vector3), t.colors.push(new n.Color(0, 0, 1)), t.colors.push(new n.Color(0, 1, 0)))
            }
            var o = new n.LineBasicMaterial({
                vertexColors: n.VertexColors,
                depthTest: !1,
                depthWrite: !1,
                transparent: !0
            });
            n.Line.call(this, t, o, n.LinePieces), this.root = e, this.matrix = e.matrixWorld, this.matrixAutoUpdate = !1, this.update()
        }, n.SkeletonHelper.prototype = Object.create(n.Line.prototype), n.SkeletonHelper.prototype.getBoneList = function(e) {
            var t = [];
            e instanceof n.Bone && t.push(e);
            for (var r = 0; r < e.children.length; r++) t.push.apply(t, this.getBoneList(e.children[r]));
            return t
        }, n.SkeletonHelper.prototype.update = function() {
            for (var e = this.geometry, t = (new n.Matrix4).getInverse(this.root.matrixWorld), r = new n.Matrix4, i = 0, o = 0; o < this.bones.length; o++) {
                var a = this.bones[o];
                a.parent instanceof n.Bone && (r.multiplyMatrices(t, a.matrixWorld), e.vertices[i].setFromMatrixPosition(r), r.multiplyMatrices(t, a.parent.matrixWorld), e.vertices[i + 1].setFromMatrixPosition(r), i += 2)
            }
            e.verticesNeedUpdate = !0, e.computeBoundingSphere()
        }, n.SpotLightHelper = function(e) {
            n.Object3D.call(this), this.light = e, this.light.updateMatrixWorld(), this.matrix = e.matrixWorld, this.matrixAutoUpdate = !1;
            var t = new n.CylinderGeometry(0, 1, 1, 8, 1, !0);
            t.applyMatrix((new n.Matrix4).makeTranslation(0, -.5, 0)), t.applyMatrix((new n.Matrix4).makeRotationX(-Math.PI / 2));
            var r = new n.MeshBasicMaterial({
                wireframe: !0,
                fog: !1
            });
            this.cone = new n.Mesh(t, r), this.add(this.cone), this.update()
        }, n.SpotLightHelper.prototype = Object.create(n.Object3D.prototype), n.SpotLightHelper.prototype.dispose = function() {
            this.cone.geometry.dispose(), this.cone.material.dispose()
        }, n.SpotLightHelper.prototype.update = function() {
            var e = new n.Vector3,
                t = new n.Vector3;
            return function() {
                var r = this.light.distance ? this.light.distance : 1e4,
                    i = r * Math.tan(this.light.angle);
                this.cone.scale.set(i, i, r), e.setFromMatrixPosition(this.light.matrixWorld), t.setFromMatrixPosition(this.light.target.matrixWorld), this.cone.lookAt(t.sub(e)), this.cone.material.color.copy(this.light.color).multiplyScalar(this.light.intensity)
            }
        }(), n.VertexNormalsHelper = function(e, t, r, i) {
            this.object = e, this.size = void 0 !== t ? t : 1;
            for (var o = void 0 !== r ? r : 16711680, a = void 0 !== i ? i : 1, s = new n.Geometry, h = (e.geometry.vertices, e.geometry.faces), l = 0, u = h.length; u > l; l++)
                for (var c = h[l], f = 0, p = c.vertexNormals.length; p > f; f++) s.vertices.push(new n.Vector3, new n.Vector3);
            n.Line.call(this, s, new n.LineBasicMaterial({
                color: o,
                linewidth: a
            }), n.LinePieces), this.matrixAutoUpdate = !1, this.normalMatrix = new n.Matrix3, this.update()
        }, n.VertexNormalsHelper.prototype = Object.create(n.Line.prototype), n.VertexNormalsHelper.prototype.update = function(e) {
            var t = new n.Vector3;
            return function(e) {
                var r = ["a", "b", "c", "d"];
                this.object.updateMatrixWorld(!0), this.normalMatrix.getNormalMatrix(this.object.matrixWorld);
                for (var i = this.geometry.vertices, n = this.object.geometry.vertices, o = this.object.geometry.faces, a = this.object.matrixWorld, s = 0, h = 0, l = o.length; l > h; h++)
                    for (var u = o[h], c = 0, f = u.vertexNormals.length; f > c; c++) {
                        var p = u[r[c]],
                            d = n[p],
                            m = u.vertexNormals[c];
                        i[s].copy(d).applyMatrix4(a), t.copy(m).applyMatrix3(this.normalMatrix).normalize().multiplyScalar(this.size), t.add(i[s]), s += 1, i[s].copy(t), s += 1
                    }
                return this.geometry.verticesNeedUpdate = !0, this
            }
        }(), n.VertexTangentsHelper = function(e, t, r, i) {
            this.object = e, this.size = void 0 !== t ? t : 1;
            for (var o = void 0 !== r ? r : 255, a = void 0 !== i ? i : 1, s = new n.Geometry, h = (e.geometry.vertices, e.geometry.faces), l = 0, u = h.length; u > l; l++)
                for (var c = h[l], f = 0, p = c.vertexTangents.length; p > f; f++) s.vertices.push(new n.Vector3), s.vertices.push(new n.Vector3);
            n.Line.call(this, s, new n.LineBasicMaterial({
                color: o,
                linewidth: a
            }), n.LinePieces), this.matrixAutoUpdate = !1, this.update()
        }, n.VertexTangentsHelper.prototype = Object.create(n.Line.prototype), n.VertexTangentsHelper.prototype.update = function(e) {
            var t = new n.Vector3;
            return function(e) {
                var r = ["a", "b", "c", "d"];
                this.object.updateMatrixWorld(!0);
                for (var i = this.geometry.vertices, n = this.object.geometry.vertices, o = this.object.geometry.faces, a = this.object.matrixWorld, s = 0, h = 0, l = o.length; l > h; h++)
                    for (var u = o[h], c = 0, f = u.vertexTangents.length; f > c; c++) {
                        var p = u[r[c]],
                            d = n[p],
                            m = u.vertexTangents[c];
                        i[s].copy(d).applyMatrix4(a), t.copy(m).transformDirection(a).multiplyScalar(this.size), t.add(i[s]), s += 1, i[s].copy(t), s += 1
                    }
                return this.geometry.verticesNeedUpdate = !0, this
            }
        }(), n.WireframeHelper = function(e, t) {
            var r = void 0 !== t ? t : 16777215,
                i = [0, 0],
                o = {},
                a = function(e, t) {
                    return e - t
                },
                s = ["a", "b", "c"],
                h = new n.BufferGeometry;
            if (e.geometry instanceof n.Geometry) {
                for (var l = e.geometry.vertices, u = e.geometry.faces, c = 0, f = new Uint32Array(6 * u.length), p = 0, d = u.length; d > p; p++)
                    for (var m = u[p], v = 0; 3 > v; v++) {
                        i[0] = m[s[v]], i[1] = m[s[(v + 1) % 3]], i.sort(a);
                        var g = i.toString();
                        void 0 === o[g] && (f[2 * c] = i[0], f[2 * c + 1] = i[1], o[g] = !0, c++)
                    }
                for (var y = new Float32Array(2 * c * 3), p = 0, d = c; d > p; p++)
                    for (var v = 0; 2 > v; v++) {
                        var x = l[f[2 * p + v]],
                            w = 6 * p + 3 * v;
                        y[w + 0] = x.x, y[w + 1] = x.y, y[w + 2] = x.z
                    }
                h.addAttribute("position", new n.BufferAttribute(y, 3))
            } else if (e.geometry instanceof n.BufferGeometry)
                if (void 0 !== e.geometry.attributes.index) {
                    var l = e.geometry.attributes.position.array,
                        b = e.geometry.attributes.index.array,
                        _ = e.geometry.drawcalls,
                        c = 0;
                    0 === _.length && (_ = [{
                        count: b.length,
                        index: 0,
                        start: 0
                    }]);
                    for (var f = new Uint32Array(2 * b.length), M = 0, S = _.length; S > M; ++M)
                        for (var T = _[M].start, A = _[M].count, w = _[M].index, p = T, E = T + A; E > p; p += 3)
                            for (var v = 0; 3 > v; v++) {
                                i[0] = w + b[p + v], i[1] = w + b[p + (v + 1) % 3], i.sort(a);
                                var g = i.toString();
                                void 0 === o[g] && (f[2 * c] = i[0], f[2 * c + 1] = i[1], o[g] = !0, c++)
                            }
                    for (var y = new Float32Array(2 * c * 3), p = 0, d = c; d > p; p++)
                        for (var v = 0; 2 > v; v++) {
                            var w = 6 * p + 3 * v,
                                C = 3 * f[2 * p + v];
                            y[w + 0] = l[C], y[w + 1] = l[C + 1], y[w + 2] = l[C + 2]
                        }
                    h.addAttribute("position", new n.BufferAttribute(y, 3))
                } else {
                    for (var l = e.geometry.attributes.position.array, c = l.length / 3, L = c / 3, y = new Float32Array(2 * c * 3), p = 0, d = L; d > p; p++)
                        for (var v = 0; 3 > v; v++) {
                            var w = 18 * p + 6 * v,
                                P = 9 * p + 3 * v;
                            y[w + 0] = l[P], y[w + 1] = l[P + 1], y[w + 2] = l[P + 2];
                            var C = 9 * p + 3 * ((v + 1) % 3);
                            y[w + 3] = l[C], y[w + 4] = l[C + 1], y[w + 5] = l[C + 2]
                        }
                    h.addAttribute("position", new n.BufferAttribute(y, 3))
                }
            n.Line.call(this, h, new n.LineBasicMaterial({
                color: r
            }), n.LinePieces), this.matrix = e.matrixWorld, this.matrixAutoUpdate = !1
        }, n.WireframeHelper.prototype = Object.create(n.Line.prototype), n.ImmediateRenderObject = function() {
            n.Object3D.call(this), this.render = function(e) {}
        }, n.ImmediateRenderObject.prototype = Object.create(n.Object3D.prototype), n.MorphBlendMesh = function(e, t) {
            n.Mesh.call(this, e, t), this.animationsMap = {}, this.animationsList = [];
            var r = this.geometry.morphTargets.length,
                i = "__default",
                o = 0,
                a = r - 1,
                s = r / 1;
            this.createAnimation(i, o, a, s), this.setAnimationWeight(i, 1)
        }, n.MorphBlendMesh.prototype = Object.create(n.Mesh.prototype), n.MorphBlendMesh.prototype.createAnimation = function(e, t, r, i) {
            var n = {
                startFrame: t,
                endFrame: r,
                length: r - t + 1,
                fps: i,
                duration: (r - t) / i,
                lastFrame: 0,
                currentFrame: 0,
                active: !1,
                time: 0,
                direction: 1,
                weight: 1,
                directionBackwards: !1,
                mirroredLoop: !1
            };
            this.animationsMap[e] = n, this.animationsList.push(n)
        }, n.MorphBlendMesh.prototype.autoCreateAnimations = function(e) {
            for (var t, r = /([a-z]+)_?(\d+)/, i = {}, n = this.geometry, o = 0, a = n.morphTargets.length; a > o; o++) {
                var s = n.morphTargets[o],
                    h = s.name.match(r);
                if (h && h.length > 1) {
                    var l = h[1];
                    h[2];
                    i[l] || (i[l] = {
                        start: 1 / 0,
                        end: -(1 / 0)
                    });
                    var u = i[l];
                    o < u.start && (u.start = o), o > u.end && (u.end = o), t || (t = l)
                }
            }
            for (var l in i) {
                var u = i[l];
                this.createAnimation(l, u.start, u.end, e)
            }
            this.firstAnimation = t
        }, n.MorphBlendMesh.prototype.setAnimationDirectionForward = function(e) {
            var t = this.animationsMap[e];
            t && (t.direction = 1, t.directionBackwards = !1)
        }, n.MorphBlendMesh.prototype.setAnimationDirectionBackward = function(e) {
            var t = this.animationsMap[e];
            t && (t.direction = -1, t.directionBackwards = !0)
        }, n.MorphBlendMesh.prototype.setAnimationFPS = function(e, t) {
            var r = this.animationsMap[e];
            r && (r.fps = t, r.duration = (r.end - r.start) / r.fps)
        }, n.MorphBlendMesh.prototype.setAnimationDuration = function(e, t) {
            var r = this.animationsMap[e];
            r && (r.duration = t, r.fps = (r.end - r.start) / r.duration)
        }, n.MorphBlendMesh.prototype.setAnimationWeight = function(e, t) {
            var r = this.animationsMap[e];
            r && (r.weight = t)
        }, n.MorphBlendMesh.prototype.setAnimationTime = function(e, t) {
            var r = this.animationsMap[e];
            r && (r.time = t)
        }, n.MorphBlendMesh.prototype.getAnimationTime = function(e) {
            var t = 0,
                r = this.animationsMap[e];
            return r && (t = r.time), t
        }, n.MorphBlendMesh.prototype.getAnimationDuration = function(e) {
            var t = -1,
                r = this.animationsMap[e];
            return r && (t = r.duration), t
        }, n.MorphBlendMesh.prototype.playAnimation = function(e) {
            var t = this.animationsMap[e];
            t ? (t.time = 0, t.active = !0) : console.warn("animation[" + e + "] undefined")
        }, n.MorphBlendMesh.prototype.stopAnimation = function(e) {
            var t = this.animationsMap[e];
            t && (t.active = !1)
        }, n.MorphBlendMesh.prototype.update = function(e) {
            for (var t = 0, r = this.animationsList.length; r > t; t++) {
                var i = this.animationsList[t];
                if (i.active) {
                    var o = i.duration / i.length;
                    i.time += i.direction * e, i.mirroredLoop ? (i.time > i.duration || i.time < 0) && (i.direction *= -1, i.time > i.duration && (i.time = i.duration, i.directionBackwards = !0), i.time < 0 && (i.time = 0, i.directionBackwards = !1)) : (i.time = i.time % i.duration, i.time < 0 && (i.time += i.duration));
                    var a = i.startFrame + n.Math.clamp(Math.floor(i.time / o), 0, i.length - 1),
                        s = i.weight;
                    a !== i.currentFrame && (this.morphTargetInfluences[i.lastFrame] = 0, this.morphTargetInfluences[i.currentFrame] = 1 * s, this.morphTargetInfluences[a] = 0, i.lastFrame = i.currentFrame, i.currentFrame = a);
                    var h = i.time % o / o;
                    i.directionBackwards && (h = 1 - h), this.morphTargetInfluences[i.currentFrame] = h * s, this.morphTargetInfluences[i.lastFrame] = (1 - h) * s
                }
            }
        }, "undefined" != typeof r ? ("undefined" != typeof t && t.exports && (r = t.exports = n), r.THREE = n) : this.THREE = n
    }, {}],
    112: [function(e, t, r) {
        function i(e) {
            if (3 !== e.length) throw new TypeError("must provide triangle array of length 3");
            for (var t = e[0].length, r = new Array(t), i = 0; t > i; i++) {
                var n = e[0][i],
                    o = e[1][i],
                    a = e[2][i];
                r[i] = (n + o + a) / 3
            }
            return r
        }
        t.exports = i
    }, {}],
    113: [function(e, t, r) {
        function i(e) {
            return this instanceof i ? (a.call(this, n(c, e)), s.call(this), this._handleTick = function(e) {
                e = Math.min(30, e), e /= 1e3, this.emit("tick", e), this.tick(e)
            }.bind(this), void u.on("tick", this._handleTick)) : new i(e)
        }
        var n = e("xtend"),
            o = e("eases"),
            a = e("tween-ticker"),
            s = e("events").EventEmitter,
            h = e("inherits"),
            l = e("mixes"),
            u = e("./loop"),
            c = {
                eases: o
            };
        t.exports = i, h(i, a), l(i, s.prototype), i.prototype.dispose = function() {
            u.removeListener("tick", this._handleTick)
        }
    }, {
        "./loop": 114,
        eases: 133,
        events: 9,
        inherits: 147,
        mixes: 148,
        "tween-ticker": 153,
        xtend: 162
    }],
    114: [function(e, t, r) {
        var i = e("raf-loop")();
        i.start(), t.exports = i
    }, {
        "raf-loop": 149
    }],
    115: [function(e, t, r) {
        function i(e) {
            var t = 2.5949095;
            return (e *= 2) < 1 ? .5 * (e * e * ((t + 1) * e - t)) : .5 * ((e -= 2) * e * ((t + 1) * e + t) + 2)
        }
        t.exports = i
    }, {}],
    116: [function(e, t, r) {
        function i(e) {
            var t = 1.70158;
            return e * e * ((t + 1) * e - t)
        }
        t.exports = i
    }, {}],
    117: [function(e, t, r) {
        function i(e) {
            var t = 1.70158;
            return --e * e * ((t + 1) * e + t) + 1
        }
        t.exports = i
    }, {}],
    118: [function(e, t, r) {
        function i(e) {
            return .5 > e ? .5 * (1 - n(1 - 2 * e)) : .5 * n(2 * e - 1) + .5
        }
        var n = e("./bounce-out");
        t.exports = i
    }, {
        "./bounce-out": 120
    }],
    119: [function(e, t, r) {
        function i(e) {
            return 1 - n(1 - e)
        }
        var n = e("./bounce-out");
        t.exports = i
    }, {
        "./bounce-out": 120
    }],
    120: [function(e, t, r) {
        function i(e) {
            var t = 4 / 11,
                r = 8 / 11,
                i = .9,
                n = 4356 / 361,
                o = 35442 / 1805,
                a = 16061 / 1805,
                s = e * e;
            return t > e ? 7.5625 * s : r > e ? 9.075 * s - 9.9 * e + 3.4 : i > e ? n * s - o * e + a : 10.8 * e * e - 20.52 * e + 10.72
        }
        t.exports = i
    }, {}],
    121: [function(e, t, r) {
        function i(e) {
            return (e *= 2) < 1 ? -.5 * (Math.sqrt(1 - e * e) - 1) : .5 * (Math.sqrt(1 - (e -= 2) * e) + 1)
        }
        t.exports = i
    }, {}],
    122: [function(e, t, r) {
        function i(e) {
            return 1 - Math.sqrt(1 - e * e)
        }
        t.exports = i
    }, {}],
    123: [function(e, t, r) {
        function i(e) {
            return Math.sqrt(1 - --e * e)
        }
        t.exports = i
    }, {}],
    124: [function(e, t, r) {
        function i(e) {
            return .5 > e ? 4 * e * e * e : .5 * Math.pow(2 * e - 2, 3) + 1
        }
        t.exports = i
    }, {}],
    125: [function(e, t, r) {
        function i(e) {
            return e * e * e
        }
        t.exports = i
    }, {}],
    126: [function(e, t, r) {
        function i(e) {
            var t = e - 1;
            return t * t * t + 1
        }
        t.exports = i
    }, {}],
    127: [function(e, t, r) {
        function i(e) {
            return .5 > e ? .5 * Math.sin(13 * Math.PI / 2 * 2 * e) * Math.pow(2, 10 * (2 * e - 1)) : .5 * Math.sin(-13 * Math.PI / 2 * (2 * e - 1 + 1)) * Math.pow(2, -10 * (2 * e - 1)) + 1
        }
        t.exports = i
    }, {}],
    128: [function(e, t, r) {
        function i(e) {
            return Math.sin(13 * e * Math.PI / 2) * Math.pow(2, 10 * (e - 1))
        }
        t.exports = i
    }, {}],
    129: [function(e, t, r) {
        function i(e) {
            return Math.sin(-13 * (e + 1) * Math.PI / 2) * Math.pow(2, -10 * e) + 1
        }
        t.exports = i
    }, {}],
    130: [function(e, t, r) {
        function i(e) {
            return 0 === e || 1 === e ? e : .5 > e ? .5 * Math.pow(2, 20 * e - 10) : -.5 * Math.pow(2, 10 - 20 * e) + 1
        }
        t.exports = i
    }, {}],
    131: [function(e, t, r) {
        function i(e) {
            return 0 === e ? e : Math.pow(2, 10 * (e - 1))
        }
        t.exports = i
    }, {}],
    132: [function(e, t, r) {
        function i(e) {
            return 1 === e ? e : 1 - Math.pow(2, -10 * e)
        }
        t.exports = i
    }, {}],
    133: [function(e, t, r) {
        t.exports = {
            backInOut: e("./back-in-out"),
            backIn: e("./back-in"),
            backOut: e("./back-out"),
            bounceInOut: e("./bounce-in-out"),
            bounceIn: e("./bounce-in"),
            bounceOut: e("./bounce-out"),
            circInOut: e("./circ-in-out"),
            circIn: e("./circ-in"),
            circOut: e("./circ-out"),
            cubicInOut: e("./cubic-in-out"),
            cubicIn: e("./cubic-in"),
            cubicOut: e("./cubic-out"),
            elasticInOut: e("./elastic-in-out"),
            elasticIn: e("./elastic-in"),
            elasticOut: e("./elastic-out"),
            expoInOut: e("./expo-in-out"),
            expoIn: e("./expo-in"),
            expoOut: e("./expo-out"),
            linear: e("./linear"),
            quadInOut: e("./quad-in-out"),
            quadIn: e("./quad-in"),
            quadOut: e("./quad-out"),
            quartInOut: e("./quart-in-out"),
            quartIn: e("./quart-in"),
            quartOut: e("./quart-out"),
            quintInOut: e("./quint-in-out"),
            quintIn: e("./quint-in"),
            quintOut: e("./quint-out"),
            sineInOut: e("./sine-in-out"),
            sineIn: e("./sine-in"),
            sineOut: e("./sine-out")
        }
    }, {
        "./back-in": 116,
        "./back-in-out": 115,
        "./back-out": 117,
        "./bounce-in": 119,
        "./bounce-in-out": 118,
        "./bounce-out": 120,
        "./circ-in": 122,
        "./circ-in-out": 121,
        "./circ-out": 123,
        "./cubic-in": 125,
        "./cubic-in-out": 124,
        "./cubic-out": 126,
        "./elastic-in": 128,
        "./elastic-in-out": 127,
        "./elastic-out": 129,
        "./expo-in": 131,
        "./expo-in-out": 130,
        "./expo-out": 132,
        "./linear": 134,
        "./quad-in": 136,
        "./quad-in-out": 135,
        "./quad-out": 137,
        "./quart-in": 139,
        "./quart-in-out": 138,
        "./quart-out": 140,
        "./quint-in": 142,
        "./quint-in-out": 141,
        "./quint-out": 143,
        "./sine-in": 145,
        "./sine-in-out": 144,
        "./sine-out": 146
    }],
    134: [function(e, t, r) {
        function i(e) {
            return e
        }
        t.exports = i
    }, {}],
    135: [function(e, t, r) {
        function i(e) {
            return e /= .5, 1 > e ? .5 * e * e : (e--, -.5 * (e * (e - 2) - 1))
        }
        t.exports = i
    }, {}],
    136: [function(e, t, r) {
        function i(e) {
            return e * e
        }
        t.exports = i
    }, {}],
    137: [function(e, t, r) {
        function i(e) {
            return -e * (e - 2)
        }
        t.exports = i
    }, {}],
    138: [function(e, t, r) {
        function i(e) {
            return .5 > e ? 8 * Math.pow(e, 4) : -8 * Math.pow(e - 1, 4) + 1
        }
        t.exports = i
    }, {}],
    139: [function(e, t, r) {
        function i(e) {
            return Math.pow(e, 4)
        }
        t.exports = i
    }, {}],
    140: [function(e, t, r) {
        function i(e) {
            return Math.pow(e - 1, 3) * (1 - e) + 1
        }
        t.exports = i
    }, {}],
    141: [function(e, t, r) {
        function i(e) {
            return (e *= 2) < 1 ? .5 * e * e * e * e * e : .5 * ((e -= 2) * e * e * e * e + 2)
        }
        t.exports = i
    }, {}],
    142: [function(e, t, r) {
        function i(e) {
            return e * e * e * e * e
        }
        t.exports = i
    }, {}],
    143: [function(e, t, r) {
        function i(e) {
            return --e * e * e * e * e + 1
        }
        t.exports = i
    }, {}],
    144: [function(e, t, r) {
        function i(e) {
            return -.5 * (Math.cos(Math.PI * e) - 1)
        }
        t.exports = i
    }, {}],
    145: [function(e, t, r) {
        function i(e) {
            return 1 - Math.cos(e * Math.PI / 2)
        }
        t.exports = i
    }, {}],
    146: [function(e, t, r) {
        function i(e) {
            return Math.sin(e * Math.PI / 2)
        }
        t.exports = i
    }, {}],
    147: [function(e, t, r) {
        arguments[4][15][0].apply(r, arguments)
    }, {
        dup: 15
    }],
    148: [function(e, t, r) {
        function i(e, t) {
            for (var r in t)
                if (t.hasOwnProperty(r)) {
                    var i = t[r];
                    if ("function" == typeof i) e[r] = i;
                    else if (i && "object" == typeof i) {
                        var a = n(o, i);
                        Object.defineProperty(e, r, a)
                    }
                }
        }
        var n = e("xtend"),
            o = {
                enumerable: !0,
                configurable: !0
            };
        t.exports = function(e, t) {
            i(e.prototype, t)
        }, t.exports.mix = i
    }, {
        xtend: 162
    }],
    149: [function(e, t, r) {
        arguments[4][14][0].apply(r, arguments)
    }, {
        dup: 14,
        events: 9,
        inherits: 147,
        raf: 150,
        "right-now": 152
    }],
    150: [function(e, t, r) {
        arguments[4][16][0].apply(r, arguments)
    }, {
        dup: 16,
        "performance-now": 151
    }],
    151: [function(e, t, r) {
        arguments[4][17][0].apply(r, arguments)
    }, {
        _process: 10,
        dup: 17
    }],
    152: [function(e, t, r) {
        arguments[4][18][0].apply(r, arguments)
    }, {
        dup: 18
    }],
    153: [function(e, t, r) {
        function i(e) {
            return this instanceof i ? (e = e || {}, this.stack = [], this.defaultEase = e.defaultEase || a, this.eases = e.eases || {}, void(this._applyEase = this.ease.bind(this))) : new i(e)
        }

        function n(e) {
            return "function" == typeof e.tick && "function" == typeof e.cancel
        }

        function o(e) {
            for (var t = 0; t < e.length; t++) {
                var r = e[t];
                "function" == typeof r.sync && r.sync()
            }
        }
        var a = e("eases/linear"),
            s = e("tween-objects"),
            h = e("tween-base");
        i.prototype.cancel = function() {
            for (var e = 0; e < this.stack.length; e++) {
                var t = this.stack[e];
                t.cancel(), t.tick(0)
            }
            return this.stack.length = 0, this
        }, i.prototype.clear = i.prototype.cancel, i.prototype.to = function(e, t) {
            var r = e;
            if (t && "object" == typeof t) r = s(e, t);
            else if (e || t) {
                if (!n(r)) throw new Error("must provide options or a tween object")
            } else r = new h;
            return this.push(r)
        }, i.prototype.push = function(e) {
            return this.stack.push(e), e
        }, i.prototype.tick = function(e, t) {
            t = "function" == typeof t ? t : this._applyEase, e = "number" == typeof e ? e : 1 / 60;
            for (var r = 0; r < this.stack.length; r++) this.stack[r].tick(e, t);
            for (o(this.stack), r = this.stack.length - 1; r >= 0; r--) this.stack[r].active || this.stack.splice(r, 1)
        }, i.prototype.ease = function(e, t) {
            var r = e.ease || this.defaultEase;
            return "string" == typeof r && (r = this.eases[r]), "function" != typeof r && (r = a), r(t)
        }, t.exports = i
    }, {
        "eases/linear": 134,
        "tween-base": 157,
        "tween-objects": 158
    }],
    154: [function(e, t, r) {
        function i(e) {
            return e.BYTES_PER_ELEMENT && "[object ArrayBuffer]" === n.call(e.buffer) || Array.isArray(e)
        }
        var n = Object.prototype.toString;
        t.exports = i
    }, {}],
    155: [function(e, t, r) {
        var i = e("lerp");
        t.exports = function(e, t, r, n) {
            if ("number" == typeof e && "number" == typeof t) return i(e, t, r);
            var o = Math.min(e.length, t.length);
            n = n || new Array(o);
            for (var a = 0; o > a; a++) n[a] = i(e[a], t[a], r);
            return n
        }
    }, {
        lerp: 156
    }],
    156: [function(e, t, r) {
        function i(e, t, r) {
            return e * (1 - r) + t * r
        }
        t.exports = i
    }, {}],
    157: [function(e, t, r) {
        function i(e) {
            s.call(this), this.duration = e && e.duration || 0, this.delay = e && e.delay || 0, this.time = 0, this.ease = e && e.ease, this.active = !0, this.enabled = !0, this.cancelling = !1, this._started = !1
        }

        function n(e, t) {
            return "function" == typeof e.ease ? e.ease(t) : a(t)
        }
        var o = function() {},
            a = e("eases/linear"),
            s = e("events").EventEmitter,
            h = e("inherits");
        h(i, s), i.prototype.lerp = o, i.prototype.ready = o, i.prototype.cancel = function() {
            return this.cancelling = !0, this
        }, i.prototype.tick = function(e, t) {
            if (t = "function" == typeof t ? t : n, this.cancelling && this.active && (this.active = !1, this.emit("cancelling", this), this.emit("complete", this)), this.active && this.enabled) {
                this.time;
                this.time += e;
                var r = (this.time - this.delay) / this.duration;
                this.time - this.delay > 0 && (this._started || (this._started = !0, this.ready(), this.emit("start", this)), 0 > r ? r = 0 : r > 1 && (r = 1), r = t(this, r), this.lerp(r), this.emit("update", this)), this.time >= this.duration + this.delay && (this.active = !1, this.emit("complete", this))
            }
        }, t.exports = i
    }, {
        "eases/linear": 134,
        events: 9,
        inherits: 147
    }],
    158: [function(e, t, r) {
        var i = e("./lib/object"),
            n = e("./lib/group");
        t.exports = function(e, t) {
            var r = Array.isArray(e) ? new n(e, t) : new i(e, t);
            return r
        }
    }, {
        "./lib/group": 160,
        "./lib/object": 161
    }],
    159: [function(e, t, r) {
        var i = e("tween-base"),
            n = e("an-array"),
            o = new i;
        t.exports = function(e, t) {
            var r = [];
            for (var i in t)
                if (t.hasOwnProperty(i) && e.hasOwnProperty(i) && !o.hasOwnProperty(i)) {
                    var a = e[i],
                        s = t[i];
                    "number" == typeof a && "number" == typeof s ? r.push({
                        key: i,
                        start: a,
                        end: s
                    }) : n(a) && n(s) && r.push({
                        key: i,
                        start: a.slice(),
                        end: s.slice()
                    })
                }
            return r
        }
    }, {
        "an-array": 154,
        "tween-base": 157
    }],
    160: [function(e, t, r) {
        function i(e, t) {
            a.call(this, t), this.target = e, this.end = [], this._options = t
        }
        var n = e("inherits"),
            o = e("lerp-array"),
            a = e("tween-base"),
            s = e("./end-target");
        n(i, a), i.prototype.ready = function() {
            this.end = this.target.map(function(e) {
                return s(e, this._options)
            }, this)
        }, i.prototype.lerp = function(e) {
            for (var t = 0; t < this.end.length; t++)
                for (var r = this.end[t], i = this.target[t], n = 0; n < r.length; n++) {
                    var a = r[n],
                        s = a.key;
                    i[s] = o(a.start, a.end, e, i[s])
                }
        }, t.exports = i
    }, {
        "./end-target": 159,
        inherits: 147,
        "lerp-array": 155,
        "tween-base": 157
    }],
    161: [function(e, t, r) {
        function i(e, t) {
            a.call(this, t), this.target = e, this.endings = void 0, this._options = t
        }
        var n = e("inherits"),
            o = e("lerp-array"),
            a = e("tween-base"),
            s = e("./end-target");
        n(i, a), i.prototype.ready = function() {
            this.endings = s(this.target, this._options)
        }, i.prototype.lerp = function(e) {
            for (var t = 0; t < this.endings.length; t++) {
                var r = this.endings[t],
                    i = r.key;
                this.target[i] = o(r.start, r.end, e, this.target[i])
            }
        }, t.exports = i
    }, {
        "./end-target": 159,
        inherits: 147,
        "lerp-array": 155,
        "tween-base": 157
    }],
    162: [function(e, t, r) {
        function i() {
            for (var e = {}, t = 0; t < arguments.length; t++) {
                var r = arguments[t];
                for (var i in r) r.hasOwnProperty(i) && (e[i] = r[i])
            }
            return e
        }
        t.exports = i
    }, {}],
    163: [function(e, t, r) {
        function i(e, t, r) {
            e.positions && e.cells && (r = t, t = e.cells, e = e.positions), r = r || new Float32Array(9 * t.length);
            for (var i = 0, n = 0, o = t.length; o > i; i += 1) r[n++] = e[t[i][0]][0], r[n++] = e[t[i][0]][1], r[n++] = e[t[i][0]][2], r[n++] = e[t[i][1]][0], r[n++] = e[t[i][1]][1], r[n++] = e[t[i][1]][2], r[n++] = e[t[i][2]][0], r[n++] = e[t[i][2]][1], r[n++] = e[t[i][2]][2];
            return r
        }
        t.exports = i
    }, {}]
}, {}, [1]);