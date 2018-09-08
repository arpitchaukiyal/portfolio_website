function _toConsumableArray(t) {
  if (Array.isArray(t)) {
    for (var e = 0, i = Array(t.length); e < t.length; e++) i[e] = t[e];
    return i
  }
  return Array.from(t)
}! function(t, e, i) {
  "use strict";
  var s = function(t, e) {
    var s = this;
    this.el = t, this.options = {}, Object.keys(r).forEach(function(t) {
      s.options[t] = r[t]
    }), Object.keys(e).forEach(function(t) {
      s.options[t] = e[t]
    }), this.isInput = "input" === this.el.tagName.toLowerCase(), this.attr = this.options.attr, this.showCursor = !this.isInput && this.options.showCursor, this.elContent = this.attr ? this.el.getAttribute(this.attr) : this.el.textContent, this.contentType = this.options.contentType, this.typeSpeed = this.options.typeSpeed, this.startDelay = this.options.startDelay, this.backSpeed = this.options.backSpeed, this.backDelay = this.options.backDelay, i && this.options.stringsElement instanceof i ? this.stringsElement = this.options.stringsElement[0] : this.stringsElement = this.options.stringsElement, this.strings = this.options.strings, this.strPos = 0, this.arrayPos = 0, this.stopNum = 0, this.loop = this.options.loop, this.loopCount = this.options.loopCount, this.curLoop = 0, this.stop = !1, this.cursorChar = this.options.cursorChar, this.shuffle = this.options.shuffle, this.sequence = [], this.build()
  };
  s.prototype = {
    constructor: s,
    init: function() {
      var t = this;
      t.timeout = setTimeout(function() {
        for (var e = 0; e < t.strings.length; ++e) t.sequence[e] = e;
        t.shuffle && (t.sequence = t.shuffleArray(t.sequence)), t.typewrite(t.strings[t.sequence[t.arrayPos]], t.strPos)
      }, t.startDelay)
    },
    build: function() {
      var t = this;
      if (!0 === this.showCursor && (this.cursor = e.createElement("span"), this.cursor.className = "typed-cursor", this.cursor.innerHTML = this.cursorChar, this.el.parentNode && this.el.parentNode.insertBefore(this.cursor, this.el.nextSibling)), this.stringsElement) {
        this.strings = [], this.stringsElement.style.display = "none";
        Array.prototype.slice.apply(this.stringsElement.children).forEach(function(e) {
          t.strings.push(e.innerHTML)
        })
      }
      this.init()
    },
    typewrite: function(t, e) {
      if (!0 !== this.stop) {
        var i = Math.round(70 * Math.random()) + this.typeSpeed,
          s = this;
        s.timeout = setTimeout(function() {
          var i = 0,
            r = t.substr(e);
          if ("^" === r.charAt(0)) {
            var n = 1;
            /^\^\d+/.test(r) && (r = /\d+/.exec(r)[0], n += r.length, i = parseInt(r)), t = t.substring(0, e) + t.substring(e + n)
          }
          if ("html" === s.contentType) {
            var a = t.substr(e).charAt(0);
            if ("<" === a || "&" === a) {
              var o = "",
                l = "";
              for (l = "<" === a ? ">" : ";"; t.substr(e + 1).charAt(0) !== l && (o += t.substr(e).charAt(0), !(++e + 1 > t.length)););
              e++, o += l
            }
          }
          s.timeout = setTimeout(function() {
            if (e === t.length) {
              if (s.options.onStringTyped(s.arrayPos), s.arrayPos === s.strings.length - 1 && (s.options.callback(), s.curLoop++, !1 === s.loop || s.curLoop === s.loopCount)) return;
              s.timeout = setTimeout(function() {
                s.backspace(t, e)
              }, s.backDelay)
            } else {
              0 === e && s.options.preStringTyped(s.arrayPos);
              var i = t.substr(0, e + 1);
              s.attr ? s.el.setAttribute(s.attr, i) : s.isInput ? s.el.value = i : "html" === s.contentType ? s.el.innerHTML = i : s.el.textContent = i, e++, s.typewrite(t, e)
            }
          }, i)
        }, i)
      }
    },
    backspace: function(t, e) {
      if (!0 !== this.stop) {
        var i = Math.round(70 * Math.random()) + this.backSpeed,
          s = this;
        s.timeout = setTimeout(function() {
          if ("html" === s.contentType && ">" === t.substr(e).charAt(0)) {
            for (var i = "";
              "<" !== t.substr(e - 1).charAt(0) && (i -= t.substr(e).charAt(0), !(--e < 0)););
            e--, i += "<"
          }
          var r = t.substr(0, e);
          s.attr ? s.el.setAttribute(s.attr, r) : s.isInput ? s.el.value = r : "html" === s.contentType ? s.el.innerHTML = r : s.el.textContent = r, e > s.stopNum ? (e--, s.backspace(t, e)) : e <= s.stopNum && (s.arrayPos++, s.arrayPos === s.strings.length ? (s.arrayPos = 0, s.shuffle && (s.sequence = s.shuffleArray(s.sequence)), s.init()) : s.typewrite(s.strings[s.sequence[s.arrayPos]], e))
        }, i)
      }
    },
    shuffleArray: function(t) {
      var e, i, s = t.length;
      if (s)
        for (; --s;) i = Math.floor(Math.random() * (s + 1)), e = t[i], t[i] = t[s], t[s] = e;
      return t
    },
    reset: function() {
      var t = this;
      clearInterval(t.timeout);
      this.el.getAttribute("id");
      this.el.textContent = "", "undefined" != typeof this.cursor && "undefined" != typeof this.cursor.parentNode && this.cursor.parentNode.removeChild(this.cursor), this.strPos = 0, this.arrayPos = 0, this.curLoop = 0, this.options.resetCallback()
    }
  }, s["new"] = function(t, i) {
    Array.prototype.slice.apply(e.querySelectorAll(t)).forEach(function(t) {
      var e = t._typed,
        r = "object" == typeof i && i;
      e && e.reset(), t._typed = e = new s(t, r), "string" == typeof i && e[i]()
    })
  }, i && (i.fn.typed = function(t) {
    return this.each(function() {
      var e = i(this),
        r = e.data("typed"),
        n = "object" == typeof t && t;
      r && r.reset(), e.data("typed", r = new s(this, n)), "string" == typeof t && r[t]()
    })
  }), t.Typed = s;
  var r = {
    strings: ["These are the default values...", "You know what you should do?", "Use your own!", "Have a great day!"],
    stringsElement: null,
    typeSpeed: 0,
    startDelay: 0,
    backSpeed: 0,
    shuffle: !1,
    backDelay: 500,
    loop: !1,
    loopCount: !1,
    showCursor: !0,
    cursorChar: "|",
    attr: null,
    contentType: "html",
    callback: function() {},
    preStringTyped: function() {},
    onStringTyped: function() {},
    resetCallback: function() {}
  }
}(window, document, window.jQuery),
function(t) {
  t.fn.animatedModal = function(e) {
    function i() {
      l.css({
        "z-index": n.zIndexOut
      }), n.afterClose()
    }

    function s() {
      n.afterOpen()
    }
    var r = t(this),
      n = t.extend({
        modalTarget: "animatedModal",
        position: "fixed",
        width: "100%",
        height: "100%",
        top: "0px",
        left: "0px",
        zIndexIn: "9999",
        zIndexOut: "-9999",
        color: "#39BEB9",
        opacityIn: "1",
        opacityOut: "0",
        animatedIn: "zoomIn",
        animatedOut: "zoomOut",
        animationDuration: ".6s",
        overflow: "auto",
        beforeOpen: function() {},
        afterOpen: function() {},
        beforeClose: function() {},
        afterClose: function() {}
      }, e),
      a = t(".close-" + n.modalTarget),
      o = t(r).attr("href"),
      l = t("body").find("#" + n.modalTarget),
      h = "#" + l.attr("id");
    l.addClass("animated"), l.addClass(n.modalTarget + "-off");
    var u = {
      position: n.position,
      width: n.width,
      height: n.height,
      top: n.top,
      left: n.left,
      "background-color": n.color,
      "overflow-y": n.overflow,
      "z-index": n.zIndexOut,
      opacity: n.opacityOut,
      "-webkit-animation-duration": n.animationDuration,
      "-moz-animation-duration": n.animationDuration,
      "-ms-animation-duration": n.animationDuration,
      "animation-duration": n.animationDuration
    };
    l.css(u), r.click(function(e) {
      e.preventDefault(), t("body, html").css({
        overflow: "hidden"
      }), o == h && (l.hasClass(n.modalTarget + "-off") && (l.removeClass(n.animatedOut), l.removeClass(n.modalTarget + "-off"), l.addClass(n.modalTarget + "-on")), l.hasClass(n.modalTarget + "-on") && (n.beforeOpen(), l.css({
        opacity: n.opacityIn,
        "z-index": n.zIndexIn
      }), l.addClass(n.animatedIn), l.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", s)))
    }), a.click(function(e) {
      e.preventDefault(), t("body, html").css({
        overflow: "auto"
      }), n.beforeClose(), l.hasClass(n.modalTarget + "-on") && (l.removeClass(n.modalTarget + "-on"), l.addClass(n.modalTarget + "-off")), l.hasClass(n.modalTarget + "-off") && (l.removeClass(n.animatedIn), l.addClass(n.animatedOut), l.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", i))
    })
  }
}(jQuery),
function(t, e) {
  "use strict";
  if ("object" == typeof exports) module.exports = e(require("d3"));
  else if ("function" == typeof define && define.amd) define(["d3"], function(i) {
    return t.dimple = e(i), t.dimple
  });
  else if (t.d3) t.dimple = e(t.d3);
  else {
    if (!console || !console.warn) throw "dimple requires d3 to run.  Are you missing a reference to the d3 library?";
    console.warn("dimple requires d3 to run.  Are you missing a reference to the d3 library?")
  }
}(this, function(t) {
  "use strict";
  var e = {
    version: "2.2.0",
    plot: {},
    aggregateMethod: {}
  };
  return e.axis = function(i, s, r, n, a, o) {
    this.chart = i, this.position = s, this.categoryFields = null === a || void 0 === a ? r : [].concat(a), this.measure = n, this.timeField = a, this.floatingBarWidth = 5, this.hidden = !1, this.showPercent = !1, this.colors = null, this.overrideMin = null, this.overrideMax = null, this.shapes = null, this.showGridlines = null, this.gridlineShapes = null, this.titleShape = null, this.dateParseFormat = null, this.tickFormat = null, this.timePeriod = null, this.timeInterval = 1, this.useLog = !1, this.logBase = 10, this.title = void 0, this.clamp = !0, this.ticks = null, this.fontSize = "10px", this.fontFamily = "sans-serif", this.autoRotateLabel = null === o || void 0 === o || o, this._slaves = [], this._scale = null, this._min = 0, this._max = 0, this._previousOrigin = null, this._origin = null, this._orderRules = [], this._groupOrderRules = [], this._draw = null, this._getAxisData = function() {
      var t, e, i = [],
        s = !1;
      if (this.chart && this.chart.series) {
        for (t = 0; t < this.chart.series.length; t += 1) e = this.chart.series[t], e[this.position] === this && (e.data && e.data.length > 0 ? i = i.concat(e.data) : s = !0);
        s && this.chart.data && (i = i.concat(this.chart.data))
      }
      return i
    }, this._getFontSize = function() {
      return this.fontSize && "auto" !== this.fontSize.toString().toLowerCase() ? isNaN(this.fontSize) ? this.fontSize : this.fontSize + "px" : (this.chart._heightPixels() / 35 > 10 ? this.chart._heightPixels() / 35 : 10) + "px"
    }, this._getFormat = function() {
      var e, i, s, r, n, a, o;
      return null !== this.tickFormat && void 0 !== this.tickFormat ? e = this._hasTimeField() ? t.timeFormat(this.tickFormat) : t.format(this.tickFormat) : this.showPercent ? e = t.format(".0%") : this.useLog && null !== this.measure ? e = function(e) {
        var i = Math.floor(Math.abs(e), 0).toString().length,
          s = Math.min(Math.floor((i - 1) / 3), 4),
          r = "kmBT".substring(s - 1, s),
          n = "0" === Math.round(e / Math.pow(1e3, s) * 10).toString().slice(-1) ? 0 : 1;
        return 0 === e ? 0 : t.format(",." + n + "f")(e / Math.pow(1e3, s)) + r
      } : null !== this.measure ? (i = Math.floor(Math.abs(this._max), 0).toString(), s = Math.floor(Math.abs(this._min), 0).toString(), r = Math.max(s.length, i.length), r > 3 ? (n = Math.min(Math.floor((r - 1) / 3), 4), a = "kmBT".substring(n - 1, n), o = r - 3 * n <= 1 ? 1 : 0, e = function(e) {
        return 0 === e ? 0 : t.format(",." + o + "f")(e / Math.pow(1e3, n)) + a
      }) : (o = Math.max(-(this._tick_step ? Math.floor(Math.log(this._tick_step) / Math.LN10) : 0), 0), e = t.format(",." + o + "f"))) : e = function(t) {
        return t
      }, e
    }, this._getTimePeriod = function() {
      var e = this.timePeriod,
        i = 30,
        s = this._max - this._min;
      return this._hasTimeField() && !this.timePeriod && (e = s / 1e3 <= i ? t.timeSecond : s / 6e4 <= i ? t.timeMinute : s / 36e5 <= i ? t.timeHour : s / 864e5 <= i ? t.timeHay : s / 6048e5 <= i ? t.timeWeek : s / 26298e5 <= i ? t.timeMonth : t.timeYear), e
    }, this._getTooltipText = function(e, i) {
      if (this._hasTimeField()) i[this.position + "Field"][0] && e.push(this.timeField + ": " + this._getFormat()(i[this.position + "Field"][0]));
      else if (this._hasCategories()) this.categoryFields.forEach(function(t, s) {
        null !== t && void 0 !== t && i[this.position + "Field"][s] && e.push(t + (i[this.position + "Field"][s] !== t ? ": " + i[this.position + "Field"][s] : ""))
      }, this);
      else if (this._hasMeasure()) switch (this.position) {
        case "x":
          e.push(this.measure + ": " + this._getFormat()(i.width));
          break;
        case "y":
          e.push(this.measure + ": " + this._getFormat()(i.height));
          break;
        case "p":
          e.push(this.measure + ": " + this._getFormat()(i.angle) + " (" + t.format(".0%")(i.piePct) + ")");
          break;
        default:
          e.push(this.measure + ": " + this._getFormat()(i[this.position + "Value"]))
      }
    }, this._getTopMaster = function() {
      var t = this;
      return null !== this.master && void 0 !== this.master && (t = this.master._getTopMaster()), t
    }, this._hasCategories = function() {
      return null !== this.categoryFields && void 0 !== this.categoryFields && this.categoryFields.length > 0
    }, this._hasMeasure = function() {
      return null !== this.measure && void 0 !== this.measure
    }, this._hasTimeField = function() {
      return null !== this.timeField && void 0 !== this.timeField
    }, this._parseDate = function(e) {
      return null === this.dateParseFormat || void 0 === this.dateParseFormat ? isNaN(e) ? Date.parse(e) : new Date(e) : t.timeParse(this.dateParseFormat)(e)
    }, this._update = function(i) {
      var s, r, n, a, o = [],
        l = this.ticks || 10,
        h = function(t, i, s) {
          var r, n, a = t.categoryFields[0],
            o = t._getAxisData(),
            l = a,
            h = !1,
            u = !0,
            c = null;
          for (r = 0; r < o.length; r += 1)
            if (null !== (c = t._parseDate(o[r][a])) && void 0 !== c && isNaN(c)) {
              u = !1;
              break
            }
          return u || t.chart.series.forEach(function(e) {
            e[i] === t && e[s]._hasMeasure() && (l = e[s].measure, h = !0)
          }, this), n = t._orderRules.concat({
            ordering: l,
            desc: h
          }), e._getOrderedList(o, a, n)
        };
      if (this._min = this.showPercent && this._min < -1 ? -1 : this._min, this._max = this.showPercent && this._max > 1 ? 1 : this._max, this._min = null !== this.overrideMin ? this.overrideMin : this._min, this._max = null !== this.overrideMax ? this.overrideMax : this._max, "x" !== this.position || null !== this._scale && !i) {
        if ("y" !== this.position || null !== this._scale && !i) this.position.length > 0 && "z" === this.position[0] && null === this._scale ? this.useLog ? this._scale = t.scaleLog().range([this.chart._heightPixels() / 300, this.chart._heightPixels() / 10]).domain([0 === this._min ? Math.pow(this.logBase, -1) : this._min, 0 === this._max ? -1 * Math.pow(this.logBase, -1) : this._max]).clamp(this.clamp).base(this.logBase) : this._scale = t.scaleLinear().range([1, this.chart._heightPixels() / 10]).domain([this._min, this._max]).clamp(this.clamp) : this.position.length > 0 && "p" === this.position[0] && null === this._scale ? this.useLog ? this._scale = t.scaleLog().range([0, 360]).domain([0 === this._min ? Math.pow(this.logBase, -1) : this._min, 0 === this._max ? -1 * Math.pow(this.logBase, -1) : this._max]).clamp(this.clamp).base(this.logBase) : this._scale = t.scaleLinear().range([0, 360]).domain([this._min, this._max]).clamp(this.clamp) : this.position.length > 0 && "c" === this.position[0] && null === this._scale && (this._scale = t.scaleLinear().range([0, null === this.colors || 1 === this.colors.length ? 1 : this.colors.length - 1]).domain([this._min, this._max]).clamp(this.clamp));
        else if (this._hasTimeField() ? this._scale = t.scaleTime().range([this.chart._yPixels() + this.chart._heightPixels(), this.chart._yPixels()]).domain([this._min, this._max]).clamp(this.clamp) : this.useLog ? this._scale = t.scaleLog().range([this.chart._yPixels() + this.chart._heightPixels(), this.chart._yPixels()]).domain([0 === this._min ? Math.pow(this.logBase, -1) : this._min, 0 === this._max ? -1 * Math.pow(this.logBase, -1) : this._max]).clamp(this.clamp).base(this.logBase).nice() : null === this.measure || void 0 === this.measure ? (o = h(this, "y", "x"), null !== this._slaves && void 0 !== this._slaves && this._slaves.forEach(function(t) {
            o = o.concat(h(t, "y", "x"))
          }, this), this._scale = t.scalePoint().range([this.chart._yPixels() + this.chart._heightPixels(), this.chart._yPixels()]).domain(o.concat([""]))) : this._scale = t.scaleLinear().range([this.chart._yPixels() + this.chart._heightPixels(), this.chart._yPixels()]).domain([this._min, this._max]).clamp(this.clamp).nice(), !this.hidden) switch (this.chart._axisIndex(this, "y")) {
          case 0:
            this._draw = t.axisLeft().scale(this._scale), this.ticks && this._draw.ticks(l);
            break;
          case 1:
            this._draw = t.axisRight().scale(this._scale), this.ticks && this._draw.ticks(l)
        }
      } else if (this._hasTimeField() ? this._scale = t.scaleTime().range([this.chart._xPixels(), this.chart._xPixels() + this.chart._widthPixels()]).domain([this._min, this._max]).clamp(this.clamp) : this.useLog ? this._scale = t.scaleLog().range([this.chart._xPixels(), this.chart._xPixels() + this.chart._widthPixels()]).domain([0 === this._min ? Math.pow(this.logBase, -1) : this._min, 0 === this._max ? -1 * Math.pow(this.logBase, -1) : this._max]).clamp(this.clamp).base(this.logBase).nice() : null === this.measure || void 0 === this.measure ? (o = h(this, "x", "y"), null !== this._slaves && void 0 !== this._slaves && this._slaves.forEach(function(t) {
          o = o.concat(h(t, "x", "y"))
        }, this), this._scale = t.scalePoint().range([this.chart._xPixels(), this.chart._xPixels() + this.chart._widthPixels()]).domain(o.concat([""]))) : this._scale = t.scaleLinear().range([this.chart._xPixels(), this.chart._xPixels() + this.chart._widthPixels()]).domain([this._min, this._max]).clamp(this.clamp).nice(), !this.hidden) switch (this.chart._axisIndex(this, "x")) {
        case 0:
          this._draw = t.axisBottom().scale(this._scale), this.ticks && this._draw.ticks(l);
          break;
        case 1:
          this._draw = t.axisTop().scale(this._scale), this.ticks && this._draw.ticks(l)
      }
      return null !== this._slaves && void 0 !== this._slaves && this._slaves.length > 0 && this._slaves.forEach(function(t) {
        t._scale = this._scale
      }, this), null !== i && void 0 !== i && !1 !== i || this._hasTimeField() || null === this._scale || null === this._scale.ticks || void 0 === this._scale.ticks || !(this._scale.ticks(l).length > 0) || "x" !== this.position && "y" !== this.position || (s = this._scale.ticks(l), r = s[1] - s[0], n = ((this._max - this._min) % r).toFixed(0), this._tick_step = r, 0 !== n && (this._max = Math.ceil(this._max / r) * r, this._min = Math.floor(this._min / r) * r, this._update(!0))), a = null !== o && void 0 !== o && o.length > 0 ? this._scale.copy()(o[0]) : this._min > 0 ? this._scale.copy()(this._min) : this._max < 0 ? this._scale.copy()(this._max) : this._scale.copy()(0), this._origin !== a && (this._previousOrigin = null === this._origin ? a : this._origin, this._origin = a), this
    }, this.addGroupOrderRule = function(t, e) {
      this._groupOrderRules.push({
        ordering: t,
        desc: e
      })
    }, this.addOrderRule = function(t, e) {
      this._orderRules.push({
        ordering: t,
        desc: e
      })
    }
  }, e.chart = function(i, s) {
    this.svg = i, this.x = "10%", this.y = "10%", this.width = "80%", this.height = "80%", this.data = s, this.noFormats = !1, this.axes = [], this.series = [], this.legends = [], this.storyboard = null, this.titleShape = null, this.shapes = null, this.ease = t.easeCubicInOut, this.staggerDraw = !1, this.transition = {}, this._group = i.append("g"), this._group.attr("class", "dimple-chart"), this._gridlines_group = this._group.insert("g"), this._gridlines_group.attr("class", "dimple-gridlines-group"), this._axis_group = this._group.insert("g"), this._axis_group.attr("class", "dimple-axis-group"), this._tooltipGroup = null, this._assignedColors = {}, this._assignedClasses = {}, this._nextColor = 0, this._nextClass = 0, this._axisIndex = function(t, e) {
      var i = 0,
        s = 0,
        r = -1;
      for (i = 0; i < this.axes.length; i += 1) {
        if (this.axes[i] === t) {
          r = s;
          break
        }
        null !== e && void 0 !== e && e[0] !== this.axes[i].position[0] || (s += 1)
      }
      return r
    }, this._getAllData = function() {
      var t = [];
      return null !== this.data && void 0 !== this.data && this.data.length > 0 && (t = t.concat(this.data)), null !== this.series && void 0 !== this.series && this.series.length > 0 && this.series.forEach(function(e) {
        null !== e.data && void 0 !== e.data && e.data.length > 0 && (t = t.concat(e.data))
      }), t
    }, this._getData = function(i, s, r, n, a, o, l, h, u, c) {
      var d, p, g = [],
        f = function(t, e) {
          var i = [];
          return null !== t && (t._hasTimeField() ? i.push(t._parseDate(e[t.timeField])) : t._hasCategories() && t.categoryFields.forEach(function(t) {
            i.push(e[t])
          }, this)), i
        },
        m = {
          x: !1,
          y: !1,
          z: !1,
          p: !1,
          c: !1
        },
        _ = {
          x: [],
          y: []
        },
        y = {
          x: [],
          y: [],
          z: [],
          p: []
        },
        x = {
          min: null,
          max: null
        },
        v = {
          x: [],
          y: [],
          z: [],
          p: []
        },
        b = [],
        w = {},
        F = {
          x: 0,
          y: 0,
          z: 0,
          p: 0
        },
        C = "",
        k = [],
        P = [],
        S = [],
        M = "",
        A = [],
        T = "",
        E = [],
        O = "",
        L = [],
        V = [],
        B = i,
        z = [];
      this.storyboard && this.storyboard.categoryFields.length > 0 && (C = this.storyboard.categoryFields[0], k = e._getOrderedList(B, C, this.storyboard._orderRules)), o && o._hasCategories() && o._hasMeasure() && (M = o.categoryFields[0], A = e._getOrderedList(B, M, o._orderRules.concat([{
        ordering: o.measure,
        desc: !0
      }]))), l && l._hasCategories() && l._hasMeasure() && (T = l.categoryFields[0], E = e._getOrderedList(B, T, l._orderRules.concat([{
        ordering: l.measure,
        desc: !0
      }]))), u && u._hasCategories() && u._hasMeasure() && (O = u.categoryFields[0], L = e._getOrderedList(B, O, u._orderRules.concat([{
        ordering: u.measure,
        desc: !0
      }]))), B.length > 0 && s && s.length > 0 && (V = [].concat(n), P = [], s.forEach(function(t) {
        void 0 !== B[0][t] && P.push(t)
      }, this), u && u._hasMeasure() ? V.push({
        ordering: u.measure,
        desc: !0
      }) : c && c._hasMeasure() ? V.push({
        ordering: c.measure,
        desc: !0
      }) : h && h._hasMeasure() ? V.push({
        ordering: h.measure,
        desc: !0
      }) : o && o._hasMeasure() ? V.push({
        ordering: o.measure,
        desc: !0
      }) : l && l._hasMeasure() && V.push({
        ordering: l.measure,
        desc: !0
      }), S = e._getOrderedList(B, P, V)), B.sort(function(t, e) {
        var i, s, r, n, a, o, l = 0;
        if ("" !== C && (l = k.indexOf(t[C]) - k.indexOf(e[C])), "" !== M && 0 === l && (l = A.indexOf(t[M]) - A.indexOf(e[M])), "" !== T && 0 === l && (l = E.indexOf(t[T]) - E.indexOf(e[T])), "" !== O && 0 === l && (l = L.indexOf(t[O]) - E.indexOf(e[O])), P && P.length > 0 && 0 === l)
          for (i = [].concat(P), l = 0, r = 0; r < S.length; r += 1) {
            for (s = [].concat(S[r]), a = !0, o = !0, n = 0; n < i.length; n += 1) a = a && t[i[n]] === s[n], o = o && e[i[n]] === s[n];
            if (a || o) {
              l = a && o ? 0 : a ? -1 : 1;
              break
            }
          }
        return l
      }), B.forEach(function(t) {
        var e, i, n, a, d, p = -1,
          _ = f(o, t),
          y = f(l, t),
          x = f(h, t),
          v = f(u, t),
          b = [];
        if (s && 0 !== s.length)
          for (n = 0; n < s.length; n += 1) void 0 === t[s[n]] ? b.push(s[n]) : b.push(t[s[n]]);
        else b = ["All"];
        for (e = b.join("/") + "_" + _.join("/") + "_" + y.join("/") + "_" + v.join("/") + "_" + x.join("/"), i = 0; i < g.length; i += 1)
          if (g[i].key === e) {
            p = i;
            break
          } - 1 === p && (a = {
          key: e,
          aggField: b,
          xField: _,
          xValue: null,
          xCount: 0,
          yField: y,
          yValue: null,
          yCount: 0,
          pField: v,
          pValue: null,
          pCount: 0,
          zField: x,
          zValue: null,
          zCount: 0,
          cValue: 0,
          cCount: 0,
          x: 0,
          y: 0,
          xOffset: 0,
          yOffset: 0,
          width: 0,
          height: 0,
          cx: 0,
          cy: 0,
          xBound: 0,
          yBound: 0,
          xValueList: [],
          yValueList: [],
          zValueList: [],
          pValueList: [],
          cValueList: [],
          fill: {},
          stroke: {}
        }, g.push(a), p = g.length - 1), d = function(e, i) {
          var s, n, a = !0,
            o = {
              value: 0,
              count: 1
            },
            l = {
              value: 0,
              count: 1
            },
            h = "";
          null !== i && (s = i.getFrameValue(), i.categoryFields.forEach(function(e, i) {
            i > 0 && (h += "/"), h += t[e], a = h === s
          }, this)), null !== e && void 0 !== e && a && (n = g[p], e._hasMeasure() && null !== t[e.measure] && void 0 !== t[e.measure] && (-1 === n[e.position + "ValueList"].indexOf(t[e.measure]) && n[e.position + "ValueList"].push(t[e.measure]), isNaN(parseFloat(t[e.measure])) && (m[e.position] = !0), o.value = n[e.position + "Value"], o.count = n[e.position + "Count"], l.value = t[e.measure], n[e.position + "Value"] = r(o, l), n[e.position + "Count"] += 1))
        }, d(o, this.storyboard), d(l, this.storyboard), d(h, this.storyboard), d(u, this.storyboard), d(c, this.storyboard)
      }, this), o && o._hasCategories() && o.categoryFields.length > 1 && void 0 !== _.x && (z = [], l._hasMeasure() && z.push({
        ordering: l.measure,
        desc: !0
      }), _.x = e._getOrderedList(B, o.categoryFields[1], o._groupOrderRules.concat(z))), l && l._hasCategories() && l.categoryFields.length > 1 && void 0 !== _.y && (z = [], o._hasMeasure() && z.push({
        ordering: o.measure,
        desc: !0
      }), _.y = e._getOrderedList(B, l.categoryFields[1], l._groupOrderRules.concat(z)), _.y.reverse()), g.forEach(function(t) {
        null !== o && (!0 === m.x && (t.xValue = t.xValueList.length), d = o._hasMeasure() && o._hasCategories() ? (y.x[t.xField.join("/")] || 0) + (o._hasMeasure() ? Math.abs(t.xValue) : 0) : (y.x[t.xField.join("/")] || 0) + (l._hasMeasure() ? Math.abs(t.yValue) : 0), y.x[t.xField.join("/")] = d), null !== l && (!0 === m.y && (t.yValue = t.yValueList.length), d = l._hasMeasure() && l._hasCategories() ? (y.y[t.yField.join("/")] || 0) + (l._hasMeasure() ? Math.abs(t.yValue) : 0) : (y.y[t.yField.join("/")] || 0) + (o._hasMeasure() ? Math.abs(t.xValue) : 0), y.y[t.yField.join("/")] = d), null !== u && (!0 === m.p && (t.pValue = t.pValueList.length), d = (y.p[t.pField.join("/")] || 0) + (u._hasMeasure() ? Math.abs(t.pValue) : 0), y.p[t.pField.join("/")] = d), null !== h && (!0 === m.z && (t.zValue = t.zValueList.length), d = (y.z[t.zField.join("/")] || 0) + (h._hasMeasure() ? Math.abs(t.zValue) : 0), y.z[t.zField.join("/")] = d), null !== c && ((null === x.min || t.cValue < x.min) && (x.min = t.cValue), (null === x.max || t.cValue > x.max) && (x.max = t.cValue))
      }, this);
      for (p in y.x) y.x.hasOwnProperty(p) && (F.x += y.x[p]);
      for (p in y.y) y.y.hasOwnProperty(p) && (F.y += y.y[p]);
      for (p in y.p) y.p.hasOwnProperty(p) && (F.p += y.p[p]);
      for (p in y.z) y.z.hasOwnProperty(p) && (F.z += y.z[p]);
      return g.forEach(function(e) {
        var i, s, r, n, d, p = function(t, i, s) {
          var r, n, o, l, h;
          null !== t && void 0 !== t && (l = t.position, t._hasCategories() ? t._hasMeasure() ? (r = e[t.position + "Field"].join("/"), n = t.showPercent ? y[t.position][r] / F[t.position] : y[t.position][r], -1 === b.indexOf(r) && (w[r] = n + (b.length > 0 ? w[b[b.length - 1]] : 0), b.push(r)), o = e[l + "Bound"] = e["c" + l] = "x" !== l && "y" !== l || !a ? n : w[r], e[s] = n, e[l] = o - ("x" === l && n >= 0 || "y" === l && n <= 0 ? n : 0)) : (e[l] = e["c" + l] = e[l + "Field"][0], e[s] = 1, void 0 !== _[l] && null !== _[l] && _[l].length >= 2 && (e[l + "Offset"] = _[l].indexOf(e[l + "Field"][1]), e[s] = 1 / _[l].length)) : (n = t.showPercent ? e[l + "Value"] / y[i][e[i + "Field"].join("/")] : e[l + "Value"], r = e[i + "Field"].join("/") + (e[l + "Value"] >= 0), h = v[l][r] = (null === v[l][r] || void 0 === v[l][r] || "z" === l || "p" === l ? 0 : v[l][r]) + n, o = e[l + "Bound"] = e["c" + l] = "x" !== l && "y" !== l || !a ? n : h, e[s] = n, e[l] = o - ("x" === l && n >= 0 || "y" === l && n <= 0 ? n : 0)))
        };
        p(o, "y", "width"), p(l, "x", "height"), p(h, "z", "r"), p(u, "p", "angle"), null !== c && null !== x.min && null !== x.max && (x.min === x.max && (x.min -= .5, x.max += .5), x.min = c.overrideMin || x.min, x.max = c.overrideMax || x.max, e.cValue = e.cValue > x.max ? x.max : e.cValue < x.min ? x.min : e.cValue, r = t.scaleLinear().range([0, null === c.colors || 1 === c.colors.length ? 1 : c.colors.length - 1]).domain([x.min, x.max]), n = r(e.cValue), d = n - Math.floor(n), e.cValue === x.max && (d = 1), c.colors && 1 === c.colors.length ? (i = t.rgb(c.colors[0]), s = t.rgb(this.getColor(e.aggField.slice(-1)[0]).fill)) : c.colors && c.colors.length > 1 ? (i = t.rgb(c.colors[Math.floor(n)]), s = t.rgb(c.colors[Math.ceil(n)])) : (i = t.rgb("white"), s = t.rgb(this.getColor(e.aggField.slice(-1)[0]).fill)), i.r = Math.floor(i.r + (s.r - i.r) * d), i.g = Math.floor(i.g + (s.g - i.g) * d), i.b = Math.floor(i.b + (s.b - i.b) * d), e.fill = i.toString(), e.stroke = i.darker(.5).toString())
      }, this), g
    }, this._getDelay = function(t, i, s) {
      return function(r) {
        var n = 0;
        return s && i.staggerDraw && (s.x._hasCategories() ? n = e._helpers.cx(r, i, s) / i._widthPixels() * t : s.y._hasCategories() && (n = (1 - e._helpers.cy(r, i, s) / i._heightPixels()) * t)), n
      }
    }, this._getSeriesData = function() {
      null !== this.series && void 0 !== this.series && this.series.forEach(function(t) {
        var e, i, s, r, n, a, o = t.data || this.data || [],
          l = [].concat(t.categoryFields || "All"),
          h = this._getData(o, l, t.aggregate, t._orderRules, t._isStacked(), t.x, t.y, t.z, t.p, t.c),
          u = [],
          c = {},
          d = t.startAngle * (Math.PI / 180) || 0,
          p = (t.endAngle || 360) * (Math.PI / 180);
        if (d > p && (d -= 2 * Math.PI), t.p && l.length > 0) {
          if (t.x && t.y) {
            for (l.pop(), u = this._getData(o, ["__dimple_placeholder__"].concat(l), t.aggregate, t._orderRules, t._isStacked(), t.x, t.y, t.z, t.p, t.c), e = 0; e < h.length; e += 1)
              for (s = ["__dimple_placeholder__"].concat(h[e].aggField), s.pop(), t.x && t.x._hasCategories() && (s = s.concat(h[e].xField)), t.y && t.y._hasCategories() && (s = s.concat(h[e].yField)), r = s.join("|"), i = 0; i < u.length; i += 1)
                if (n = [].concat(u[i].aggField), t.x && t.x._hasCategories() && (n = n.concat(u[i].xField)), t.y && t.y._hasCategories() && (n = n.concat(u[i].yField)), a = n.join("|"), r === a) {
                  h[e].xField = u[i].xField, h[e].xValue = u[i].xValue, h[e].xCount = u[i].xCount, h[e].yField = u[i].yField, h[e].yValue = u[i].yValue, h[e].yCount = u[i].yCount, h[e].zField = u[i].zField, h[e].zValue = u[i].zValue, h[e].zCount = u[i].zCount, h[e].x = u[i].x, h[e].y = u[i].y, h[e].r = u[i].r, h[e].xOffset = u[i].xOffset, h[e].yOffset = u[i].yOffset, h[e].width = u[i].width, h[e].height = u[i].height, h[e].cx = u[i].cx, h[e].cy = u[i].cy, h[e].xBound = u[i].xBound, h[e].yBound = u[i].yBound, h[e].xValueList = u[i].xValueList, h[e].yValueList = u[i].yValueList, h[e].zValueList = u[i].zValueList, h[e].cValueList = u[i].cValueList, h[e].pieKey = u[i].key, h[e].value = h.pValue, c[u[i].key] || (c[u[i].key] = {
                    total: 0,
                    angle: d
                  }), c[u[i].key].total += h[e].pValue;
                  break
                }
          } else
            for (e = 0; e < h.length; e += 1) h[e].pieKey = "All", h[e].value = h.pValue, c[h[e].pieKey] || (c[h[e].pieKey] = {
              total: 0,
              angle: d
            }), c[h[e].pieKey].total += h[e].pValue;
          for (e = 0; e < h.length; e += 1) 0 === c[h[e].pieKey].total ? h[e].piePct = 0 : h[e].piePct = h[e].pValue / c[h[e].pieKey].total, h[e].startAngle = c[h[e].pieKey].angle, h[e].endAngle = h[e].startAngle + h[e].piePct * (p - d), c[h[e].pieKey].angle = h[e].endAngle
        }
        t._positionData = h
      }, this)
    }, this._handleTransition = function(t, i, s, r) {
      var n = null;
      return 0 === i ? n = t : (n = t.transition().duration(i).delay(s._getDelay(i, s, r)), e._ease(n, s.ease)), n
    }, this._heightPixels = function() {
      return e._parseYPosition(this.height, this.svg.node())
    }, this._registerEventHandlers = function(i) {
      null !== i._eventHandlers && i._eventHandlers.length > 0 && i._eventHandlers.forEach(function(s) {
        var r, n = function(r) {
          var n = new e.eventArgs;
          null !== i.chart.storyboard && (n.frameValue = i.chart.storyboard.getFrameValue()), n.seriesValue = r.aggField, n.xValue = r.x, n.yValue = r.y, n.zValue = r.z, n.pValue = r.p, n.colorValue = r.cValue, n.seriesShapes = i.shapes, n.selectedShape = t.select(this), s.handler(n)
        };
        if (null !== s.handler && "function" == typeof s.handler)
          if (null !== i._markers && void 0 !== i._markers)
            for (r in i._markers) i._markers.hasOwnProperty(r) && i._markers[r].on(s.event, n);
          else i.shapes.on(s.event, n)
      }, this)
    }, this._widthPixels = function() {
      return e._parseXPosition(this.width, this.svg.node())
    }, this._xPixels = function() {
      return e._parseXPosition(this.x, this.svg.node())
    }, this._yPixels = function() {
      return e._parseYPosition(this.y, this.svg.node())
    }, this.addAxis = function(t, i, s, r) {
      var n, a = null,
        o = null;
      if (null !== i && void 0 !== i && (i = [].concat(i)), "string" == typeof t || t instanceof String) a = new e.axis(this, t, i, s, r), this.axes.push(a);
      else {
        if (o = t, a = new e.axis(this, o.position, i, s, r), a._hasMeasure() !== o._hasMeasure() ? n = "You have specified a composite axis where some but not all axes have a measure - this is not supported, all axes must be of the same type." : a._hasTimeField() !== o._hasTimeField() ? n = "You have specified a composite axis where some but not all axes have a time field - this is not supported, all axes must be of the same type." : (null === a.categoryFields || void 0 === a.categoryFields ? 0 : a.categoryFields.length) !== (null === o.categoryFields || void 0 === o.categoryFields ? 0 : o.categoryFields.length) && (n = "You have specified a composite axis where axes have differing numbers of category fields - this is not supported, all axes must be of the same type."), n) throw n;
        o._slaves.push(a)
      }
      return a
    }, this.addCategoryAxis = function(t, e) {
      return this.addAxis(t, e, null)
    }, this.addColorAxis = function(t, e) {
      var i = this.addAxis("c", null, t);
      return i.colors = null === e || void 0 === e ? null : [].concat(e), i
    }, this.addLegend = function(t, i, s, r, n, a) {
      a = null === a || void 0 === a ? this.series : [].concat(a), n = null === n || void 0 === n ? "left" : n;
      var o = new e.legend(this, t, i, s, r, n, a);
      return this.legends.push(o), o
    }, this.addLogAxis = function(t, e, i) {
      var s = this.addAxis(t, null, e, null);
      return null !== i && void 0 !== i && (s.logBase = i), s.useLog = !0, s
    }, this.addMeasureAxis = function(t, e) {
      return this.addAxis(t, null, e)
    }, this.addPctAxis = function(t, e, i) {
      var s = null;
      return s = null !== i && void 0 !== i ? this.addAxis(t, i, e) : this.addMeasureAxis(t, e), s.showPercent = !0, s
    }, this.addSeries = function(t, i, s) {
      null !== s && void 0 !== s || (s = this.axes), null !== i && void 0 !== i || (i = e.plot.bubble);
      var r, n = null,
        a = null,
        o = null,
        l = null,
        h = null;
      return s.forEach(function(t) {
        null !== t && i.supportedAxes.indexOf(t.position) > -1 && (null === n && "x" === t.position[0] ? n = t : null === a && "y" === t.position[0] ? a = t : null === o && "z" === t.position[0] ? o = t : null === l && "c" === t.position[0] ? l = t : null === l && "p" === t.position[0] && (h = t))
      }, this), t && (t = [].concat(t)), r = new e.series(this, t, n, a, o, l, h, i, e.aggregateMethod.sum, i.stacked), this.series.push(r), r
    }, this.addTimeAxis = function(t, e, i, s) {
      var r = this.addAxis(t, null, null, e);
      return r.tickFormat = s, r.dateParseFormat = i, r
    }, this.assignClass = function(t, e) {
      return this._assignedClasses[t] = e, this._assignedClasses[t]
    }, this.assignColor = function(t, i, s, r) {
      return this._assignedColors[t] = new e.color(i, s, r), this._assignedColors[t]
    }, this.customClassList = {
      axisLine: "dimple-custom-axis-line",
      axisLabel: "dimple-custom-axis-label",
      axisTitle: "dimple-custom-axis-title",
      tooltipBox: "dimple-custom-tooltip-box",
      tooltipLabel: "dimple-custom-tooltip-label",
      tooltipDropLine: "dimple-custom-tooltip-dropline",
      lineMarker: "dimple-custom-line-marker",
      lineMarkerCircle: "dimple-custom-line-marker-circle",
      legendLabel: "dimple-custom-legend-label",
      legendKey: "dimple-custom-legend-key",
      areaSeries: "dimple-custom-series-area",
      barSeries: "dimple-custom-series-bar",
      bubbleSeries: "dimple-custom-series-bubble",
      lineSeries: "dimple-custom-series-line",
      pieSeries: "dimple-custom-series-pie",
      gridline: "dimple-custom-gridline",
      colorClasses: ["dimple-custom-format-1", "dimple-custom-format-2", "dimple-custom-format-3", "dimple-custom-format-4", "dimple-custom-format-5", "dimple-custom-format-6", "dimple-custom-format-7", "dimple-custom-format-8", "dimple-custom-format-9", "dimple-custom-format-10"]
    }, this.defaultColors = [new e.color("#80B1D3"), new e.color("#FB8072"), new e.color("#FDB462"), new e.color("#B3DE69"), new e.color("#FFED6F"), new e.color("#BC80BD"), new e.color("#8DD3C7"), new e.color("#CCEBC5"), new e.color("#FFFFB3"), new e.color("#BEBADA"), new e.color("#FCCDE5"), new e.color("#D9D9D9")], this.draw = function(e, i) {
      e = e || 0;
      var s, r, n = null,
        a = null,
        o = !1,
        l = !1,
        h = this._xPixels(),
        u = this._yPixels(),
        c = this._widthPixels(),
        d = this._heightPixels();
      return void 0 !== i && null !== i && !1 !== i || this._getSeriesData(), this.axes.forEach(function(t) {
        t._scale = null
      }, this), this.axes.forEach(function(t) {
        if (t._min = 0, t._max = 0, r = [], t._hasMeasure()) {
          var e = !1;
          this.series.forEach(function(i) {
            if (i._deepMatch(t)) {
              var s = i._axisBounds(t.position);
              t._min > s.min && (t._min = s.min), t._max < s.max && (t._max = s.max), e = !0
            }
          }, this), e || this._getAllData().forEach(function(e) {
            t._min > e[t.measure] && (t._min = e[t.measure]), t._max < e[t.measure] && (t._max = e[t.measure])
          }, this)
        } else t._hasTimeField() ? (t._min = null, t._max = null, this.series.forEach(function(e) {
          e._deepMatch(t) && null !== e[t.position].timeField && void 0 !== e[t.position].timeField && -1 === r.indexOf(e[t.position].timeField) && r.push(e[t.position].timeField)
        }, this), t._getAxisData().forEach(function(e) {
          r.forEach(function(i) {
            var s = t._parseDate(e[i]);
            (null === t._min || s < t._min) && (t._min = s), (null === t._max || s > t._max) && (t._max = s)
          }, this)
        }, this)) : t._hasCategories() && (t._min = 0, s = [], this.series.forEach(function(e) {
          e._deepMatch(t) && null !== e[t.position].categoryFields[0] && void 0 !== e[t.position].categoryFields[0] && -1 === r.indexOf(e[t.position].categoryFields[0]) && r.push(e[t.position].categoryFields[0])
        }, this), t._getAxisData().forEach(function(t) {
          r.forEach(function(e) {
            -1 === s.indexOf(t[e]) && s.push(t[e])
          }, this)
        }, this), t._max = s.length);
        null !== t._slaves && void 0 !== t._slaves && t._slaves.length > 0 && t._slaves.forEach(function(e) {
          e._min = t._min, e._max = t._max
        }, this), t._update(), null === n && "x" === t.position ? n = t : null === a && "y" === t.position && (a = t)
      }, this), this.axes.forEach(function(i) {
        var s = !1,
          r = null,
          p = 0,
          g = null,
          f = !1,
          m = 0,
          _ = {
            l: null,
            t: null,
            r: null,
            b: null
          },
          y = 0,
          x = 0,
          v = "",
          b = this,
          w = function(t) {
            return null === r || 0 === e || s ? t : b._handleTransition(t, e, b)
          },
          F = function() {
            var e = t.select(this).selectAll("text");
            return !i.measure && i._max > 0 && ("x" === i.position ? e.attr("x", c / i._max / 2) : "y" === i.position && e.attr("y", d / i._max * -1 / 2)), i.categoryFields && i.categoryFields.length > 0 && (i !== n || null !== a.categoryFields && 0 !== a.categoryFields.length || e.attr("y", u + d - a._scale(0) + 9),
              i !== a || null !== n.categoryFields && 0 !== n.categoryFields.length || e.attr("x", -1 * (n._scale(0) - h) - 9)), this
          },
          C = function(e) {
            return function() {
              var i = t.select(this).attr("class") || "";
              return -1 === i.indexOf(e) && (i += " " + e), i.trim()
            }
          };
        null === i.gridlineShapes ? (i.showGridlines || null === i.showGridlines && !i._hasCategories() && (!o && "x" === i.position || !l && "y" === i.position)) && (i.gridlineShapes = this._gridlines_group.append("g").attr("class", "dimple-gridline"), "x" === i.position ? o = !0 : l = !0) : "x" === i.position ? o = !0 : l = !0, null === i.shapes && (i.shapes = this._axis_group.append("g").attr("class", "dimple-axis dimple-axis-" + i.position).each(function() {
          b.noFormats || t.select(this).style("font-family", i.fontFamily).style("font-size", i._getFontSize())
        }), s = !0), i === n && null !== a ? (r = "translate(0, " + (null === a.categoryFields || 0 === a.categoryFields.length ? a._scale(0) : u + d) + ")", g = "translate(0, " + (i === n ? u + d : u) + ")", p = -d) : i === a && null !== n ? (r = "translate(" + (null === n.categoryFields || 0 === n.categoryFields.length ? n._scale(0) : h) + ", 0)", g = "translate(" + (i === a ? h : h + c) + ", 0)", p = -c) : "x" === i.position ? (g = r = "translate(0, " + (i === n ? u + d : u) + ")", p = -d) : "y" === i.position && (g = r = "translate(" + (i === a ? h : h + c) + ", 0)", p = -c), null !== r && null !== i._draw && (i._hasTimeField() ? w(i.shapes).call(i._draw.ticks(i._getTimePeriod(), i.timeInterval).tickFormat(i._getFormat())).attr("transform", r).each(F) : i.useLog ? w(i.shapes).call(i._draw.ticks(4, i._getFormat())).attr("transform", r).each(F) : w(i.shapes).call(i._draw.tickFormat(i._getFormat())).attr("transform", r).each(F), null !== i.gridlineShapes && w(i.gridlineShapes).call(i._draw.tickSize(p, 0, 0).tickFormat("")).attr("transform", g)), w(i.shapes.selectAll("text")).attr("class", C(b.customClassList.axisLabel)).call(function(t) {
          b.noFormats || t.style("font-family", i.fontFamily).style("font-size", i._getFontSize())
        }), w(i.shapes.selectAll("path, line")).attr("class", C(b.customClassList.axisLine)).call(function(t) {
          b.noFormats || t.style("fill", "none").style("stroke", "black").style("shape-rendering", "crispEdges")
        }), null !== i.gridlineShapes && (i.gridlineShapes.selectAll("path").remove(), w(i.gridlineShapes.selectAll("line")).attr("class", C(b.customClassList.gridline)).call(function(t) {
          b.noFormats || t.style("fill", "none").style("stroke", "lightgray").style("opacity", .8)
        })), null !== i.measure && void 0 !== i.measure || (i.autoRotateLabel ? i === n ? (m = 0, i.shapes.selectAll("text").each(function() {
          var t = this.getComputedTextLength();
          m = t > m ? t : m
        }), m > c / i.shapes.selectAll("text").nodes().length ? (f = !0, i.shapes.selectAll("text").style("text-anchor", "start").each(function() {
          var e = this.getBBox();
          t.select(this).attr("transform", "rotate(90," + e.x + "," + (e.y + e.height / 2) + ") translate(-5, 0)")
        })) : (f = !1, i.shapes.selectAll("text").style("text-anchor", "middle").attr("transform", ""))) : "x" === i.position && (m = 0, i.shapes.selectAll("text").each(function() {
          var t = this.getComputedTextLength();
          m = t > m ? t : m
        }), m > c / i.shapes.selectAll("text").nodes().length ? (f = !0, i.shapes.selectAll("text").style("text-anchor", "end").each(function() {
          var e = this.getBBox();
          t.select(this).attr("transform", "rotate(90," + (e.x + e.width) + "," + (e.y + e.height / 2) + ") translate(5, 0)")
        })) : (f = !1, i.shapes.selectAll("text").style("text-anchor", "middle").attr("transform", ""))) : (f = !1, i.shapes.selectAll("text").style("text-anchor", "middle").attr("transform", ""))), null !== i.titleShape && void 0 !== i.titleShape && i.titleShape.remove(), i.shapes.selectAll("text").each(function() {
          var t = this.getBBox();
          (null === _.l || -9 - t.width < _.l) && (_.l = -9 - t.width), (null === _.r || t.x + t.width > _.r) && (_.r = t.x + t.width), f ? ((null === _.t || t.y + t.height - t.width < _.t) && (_.t = t.y + t.height - t.width), (null === _.b || t.height + t.width > _.b) && (_.b = t.height + t.width)) : ((null === _.t || t.y < _.t) && (_.t = t.y), (null === _.b || 9 + t.height > _.b) && (_.b = 9 + t.height))
        }), "x" === i.position ? (x = i === n ? u + d + _.b + 5 : u + _.t - 10, y = h + c / 2) : "y" === i.position && (y = i === a ? h + _.l - 10 : h + c + _.r + 20, x = u + d / 2, v = "rotate(270, " + y + ", " + x + ")"), i.hidden || "x" !== i.position && "y" !== i.position || null === i.title || (i.titleShape = this._axis_group.append("text").attr("class", "dimple-axis dimple-title " + b.customClassList.axisTitle + " dimple-axis-" + i.position), i.titleShape.attr("x", y).attr("y", x).attr("text-anchor", "middle").attr("transform", v).text(void 0 !== i.title ? i.title : null === i.categoryFields || void 0 === i.categoryFields || 0 === i.categoryFields.length ? i.measure : i.categoryFields.join("/")).each(function() {
          b.noFormats || t.select(this).style("font-family", i.fontFamily).style("font-size", i._getFontSize())
        }), i === n ? i.titleShape.each(function() {
          t.select(this).attr("y", x + this.getBBox().height / 1.65)
        }) : i === a && i.titleShape.each(function() {
          t.select(this).attr("x", y + this.getBBox().height / 1.65)
        }))
      }, this), this.series.forEach(function(t) {
        t.plot.draw(this, t, e), this._registerEventHandlers(t)
      }, this), this.legends.forEach(function(t) {
        t._draw()
      }, this), this.storyboard && (this.storyboard._drawText(), this.storyboard.autoplay && this.storyboard.startAnimation()), this
    }, this.getClass = function(t) {
      return this._assignedClasses[t] || (this._assignedClasses[t] = this.customClassList.colorClasses[this._nextClass], this._nextClass = (this._nextClass + 1) % this.customClassList.colorClasses.length), this._assignedClasses[t]
    }, this.getColor = function(t) {
      return null !== this._assignedColors[t] && void 0 !== this._assignedColors[t] || (this._assignedColors[t] = this.defaultColors[this._nextColor], this._nextColor = (this._nextColor + 1) % this.defaultColors.length), this._assignedColors[t]
    }, this.setBounds = function(t, i, s, r) {
      return this.x = t, this.y = i, this.width = s, this.height = r, this._xPixels = function() {
        return e._parseXPosition(this.x, this.svg.node())
      }, this.draw(0, !0), this._yPixels = function() {
        return e._parseYPosition(this.y, this.svg.node())
      }, this._widthPixels = function() {
        return e._parseXPosition(this.width, this.svg.node())
      }, this._heightPixels = function() {
        return e._parseYPosition(this.height, this.svg.node())
      }, this
    }, this.setMargins = function(t, i, s, r) {
      return this.x = t, this.y = i, this.width = 0, this.height = 0, this._xPixels = function() {
        return e._parseXPosition(this.x, this.svg.node())
      }, this._yPixels = function() {
        return e._parseYPosition(this.y, this.svg.node())
      }, this._widthPixels = function() {
        return e._parentWidth(this.svg.node()) - this._xPixels() - e._parseXPosition(s, this.svg.node())
      }, this._heightPixels = function() {
        return e._parentHeight(this.svg.node()) - this._yPixels() - e._parseYPosition(r, this.svg.node())
      }, this
    }, this.setStoryboard = function(t, i) {
      return this.storyboard = new e.storyboard(this, t), null !== i && void 0 !== i && (this.storyboard.onTick = i), this.storyboard
    }
  }, e.color = function(e, i, s) {
    this.fill = e, this.stroke = null === i || void 0 === i ? t.rgb(e).darker(.5).toString() : i, this.opacity = null === s || void 0 === s ? .8 : s
  }, e.eventArgs = function() {
    this.seriesValue = null, this.xValue = null, this.yValue = null, this.zValue = null, this.pValue = null, this.colorValue = null, this.frameValue = null, this.seriesShapes = null, this.selectedShape = null
  }, e.legend = function(i, s, r, n, a, o, l) {
    this.chart = i, this.series = l, this.x = s, this.y = r, this.width = n, this.height = a, this.horizontalAlign = o, this.shapes = null, this.fontSize = "10px", this.fontFamily = "sans-serif", this._draw = function() {
      var i, s = this._getEntries(),
        r = 0,
        n = 0,
        a = 0,
        o = 0,
        l = 15,
        h = 9,
        u = 5,
        c = this;
      this.shapes && this.shapes.remove(), i = this.chart._group.selectAll(".dimple-dont-select-any").data(s).enter().append("g").attr("class", function(t) {
        return "dimple-legend " + e._createClass(t.aggField)
      }).attr("opacity", 1), i.append("text").attr("class", function(t) {
        return "dimple-legend dimple-legend-text " + e._createClass(t.aggField) + " " + c.chart.customClassList.legendLabel
      }).text(function(t) {
        return t.key
      }).call(function(t) {
        c.chart.noFormats || t.style("font-family", c.fontFamily).style("font-size", c._getFontSize()).style("shape-rendering", "crispEdges")
      }).each(function() {
        var t = this.getBBox();
        t.width > r && (r = t.width), t.height > n && (n = t.height)
      }), i.append("rect").attr("class", function(t) {
        return "dimple-legend dimple-legend-key " + e._createClass(t.aggField)
      }).attr("height", h).attr("width", l), n = (n < h ? h : n) + c._getVerticalPadding(), r += l + c._getHorizontalPadding(), i.each(function(i) {
        a + r > c._widthPixels() && (a = 0, o += n), o > c._heightPixels() ? t.select(this).remove() : (t.select(this).select("text").attr("x", "left" === c.horizontalAlign ? c._xPixels() + l + u + a : c._xPixels() + (c._widthPixels() - a - r) + l + u).attr("y", function() {
          return c._yPixels() + o + this.getBBox().height / 1.65
        }).attr("width", c._widthPixels()).attr("height", c._heightPixels()), t.select(this).select("rect").attr("class", function(t) {
          return "dimple-legend dimple-legend-key " + e._createClass(t.aggField) + " " + c.chart.customClassList.legendKey + " " + t.css
        }).attr("x", "left" === c.horizontalAlign ? c._xPixels() + a : c._xPixels() + (c._widthPixels() - a - r)).attr("y", c._yPixels() + o).attr("height", h).attr("width", l).call(function(t) {
          c.chart.noFormats || t.style("fill", i.fill).style("stroke", i.stroke).style("opacity", i.opacity).style("shape-rendering", "crispEdges")
        }), a += r)
      }), this.shapes = i
    }, this._getEntries = function() {
      var t = [];
      return this.series && this.series.forEach(function(e) {
        e._positionData.forEach(function(i) {
          var s, r = -1,
            n = e.plot.grouped && !e.x._hasCategories() && !e.y._hasCategories() && i.aggField.length < 2 ? "All" : i.aggField.slice(-1)[0];
          for (s = 0; s < t.length; s += 1)
            if (t[s].key === n) {
              r = s;
              break
            } - 1 === r && e.chart._assignedColors[n] && (t.push({
            key: n,
            fill: e.chart._assignedColors[n].fill,
            stroke: e.chart._assignedColors[n].stroke,
            opacity: e.chart._assignedColors[n].opacity,
            css: e.chart._assignedClasses[n],
            series: e,
            aggField: i.aggField
          }), r = t.length - 1)
        })
      }, this), t
    }, this._getFontSize = function() {
      return this.fontSize && "auto" !== this.fontSize.toString().toLowerCase() ? isNaN(this.fontSize) ? this.fontSize : this.fontSize + "px" : (this.chart._heightPixels() / 35 > 10 ? this.chart._heightPixels() / 35 : 10) + "px"
    }, this._getHorizontalPadding = function() {
      return isNaN(this.horizontalPadding) ? 20 : this.horizontalPadding
    }, this._getVerticalPadding = function() {
      return isNaN(this.verticalPadding) ? 2 : this.verticalPadding
    }, this._heightPixels = function() {
      return e._parseYPosition(this.height, this.chart.svg.node())
    }, this._widthPixels = function() {
      return e._parseXPosition(this.width, this.chart.svg.node())
    }, this._xPixels = function() {
      return e._parseXPosition(this.x, this.chart.svg.node())
    }, this._yPixels = function() {
      return e._parseYPosition(this.y, this.chart.svg.node())
    }
  }, e.series = function(t, e, i, s, r, n, a, o, l, h) {
    this.chart = t, this.x = i, this.y = s, this.z = r, this.c = n, this.p = a, this.plot = o, this.categoryFields = e, this.aggregate = l, this.stacked = h, this.barGap = .2, this.clusterBarGap = .1, this.lineWeight = 2, this.lineMarkers = !1, this.afterDraw = null, this.interpolation = "linear", this.tooltipFontSize = "10px", this.tooltipFontFamily = "sans-serif", this.radius = "auto", this._group = t._group.append("g"), this._group.attr("class", "dimple-series-group-" + t.series.length), this._eventHandlers = [], this._positionData = [], this._orderRules = [], this._axisBounds = function(t) {
      var e, i, s, r = {
          min: 0,
          max: 0
        },
        n = null,
        a = null,
        o = [],
        l = 0,
        h = this._positionData;
      return "x" === t ? (n = this.x, a = this.y) : "y" === t ? (n = this.y, a = this.x) : "z" === t ? n = this.z : "p" === t ? n = this.p : "c" === t && (n = this.c), n.showPercent ? h.forEach(function(t) {
        t[n.position + "Bound"] < r.min && (r.min = t[n.position + "Bound"]), t[n.position + "Bound"] > r.max && (r.max = t[n.position + "Bound"])
      }, this) : null === a || null === a.categoryFields || 0 === a.categoryFields.length ? h.forEach(function(t) {
        !this._isStacked() || "x" !== n.position && "y" !== n.position ? (t[n.position + "Value"] < r.min && (r.min = t[n.position + "Value"]), t[n.position + "Value"] > r.max && (r.max = t[n.position + "Value"])) : t[n.position + "Value"] < 0 ? r.min = r.min + t[n.position + "Value"] : r.max = r.max + t[n.position + "Value"]
      }, this) : (e = n.position + "Value", i = a.position + "Field", s = [], h.forEach(function(t) {
        var r = t[i].join("/"),
          n = s.indexOf(r); - 1 === n && (s.push(r), n = s.length - 1), void 0 === o[n] && (o[n] = {
          min: 0,
          max: 0
        }, n >= l && (l = n + 1)), this.stacked ? t[e] < 0 ? o[n].min = o[n].min + t[e] : o[n].max = o[n].max + t[e] : (t[e] < o[n].min && (o[n].min = t[e]), t[e] > o[n].max && (o[n].max = t[e]))
      }, this), o.forEach(function(t) {
        void 0 !== t && (t.min < r.min && (r.min = t.min), t.max > r.max && (r.max = t.max))
      }, this)), r
    }, this._deepMatch = function(t) {
      var e = !1;
      return this[t.position] === t ? e = !0 : void 0 !== t._slaves && null !== t._slaves && t._slaves.length > 0 && t._slaves.forEach(function(t) {
        e = e || this._deepMatch(t)
      }, this), e
    }, this._dropLineOrigin = function() {
      var t = 0,
        e = 0,
        i = {
          x: null,
          y: null
        },
        s = {
          x: null,
          y: null
        };
      return this.chart.axes.forEach(function(t) {
        "x" === t.position && null === s.x ? t._hasTimeField() ? s.x = this.chart._xPixels() : s.x = t._origin : "y" === t.position && null === s.y && (t._hasTimeField() ? s.y = this.chart._yPixels() + this.chart._heightPixels() : s.y = t._origin)
      }, this), this.chart.axes.forEach(function(r) {
        "x" !== r.position || this.x.hidden ? "y" !== r.position || this.y.hidden || (this._deepMatch(r) && (0 === e ? i.x = s.x : 1 === e && (i.x = this.chart._xPixels() + this.chart._widthPixels())), e += 1) : (this._deepMatch(r) && (0 === t ? i.y = s.y : 1 === t && (i.y = this.chart._yPixels())), t += 1)
      }, this), i
    }, this._getTooltipFontSize = function() {
      return this.tooltipFontSize && "auto" !== this.tooltipFontSize.toString().toLowerCase() ? isNaN(this.tooltipFontSize) ? this.tooltipFontSize : this.tooltipFontSize + "px" : (this.chart._heightPixels() / 35 > 10 ? this.chart._heightPixels() / 35 : 10) + "px"
    }, this._isStacked = function() {
      return this.stacked && (this.x._hasCategories() || this.y._hasCategories())
    }, this.addEventHandler = function(t, e) {
      this._eventHandlers.push({
        event: t,
        handler: e
      })
    }, this.addOrderRule = function(t, e) {
      this._orderRules.push({
        ordering: t,
        desc: e
      })
    }, this.getTooltipText = function(t) {
      var e = [];
      return null !== this.categoryFields && void 0 !== this.categoryFields && this.categoryFields.length > 0 && this.categoryFields.forEach(function(i, s) {
        null !== i && void 0 !== i && null !== t.aggField[s] && void 0 !== t.aggField[s] && e.push(i + (t.aggField[s] !== i ? ": " + t.aggField[s] : ""))
      }, this), this.p ? (this.x && this.x._hasCategories() && this.x._getTooltipText(e, t), this.y && this.y._hasCategories() && this.y._getTooltipText(e, t), this.z && this.z._hasCategories() && this.z._getTooltipText(e, t), this.p._getTooltipText(e, t)) : (this.x && this.x._getTooltipText(e, t), this.y && this.y._getTooltipText(e, t), this.z && this.z._getTooltipText(e, t)), this.c && this.c._getTooltipText(e, t), e.filter(function(t, i) {
        return e.indexOf(t) === i
      })
    }
  }, e.storyboard = function(t, e) {
    null !== e && void 0 !== e && (e = [].concat(e)), this.chart = t, this.categoryFields = e, this.autoplay = !0, this.frameDuration = 3e3, this.storyLabel = null, this.onTick = null, this.fontSize = "10px", this.fontFamily = "sans-serif", this._frame = 0, this._animationTimer = null, this._categories = [], this._cachedCategoryFields = [], this._orderRules = [], this._drawText = function() {
      var e = this,
        i = 0;
      e.storyLabel || (e.chart.axes.forEach(function(t) {
        "x" === t.position && (i += 1)
      }, e), e.storyLabel = e.chart._group.append("text").attr("class", "dimple-storyboard-label").attr("opacity", 1).attr("x", e.chart._xPixels() + .01 * e.chart._widthPixels()).attr("y", e.chart._yPixels() + (e.chart._heightPixels() / 35 > 10 ? e.chart._heightPixels() / 35 : 10) * (i > 1 ? 1.25 : -1)).call(function(i) {
        t.noFormats || i.style("font-family", e.fontFamily).style("font-size", e._getFontSize())
      })), e.storyLabel.text(e.categoryFields.join("\\") + ": " + e.getFrameValue())
    }, this._getCategories = function() {
      return this._categoryFields !== this._cachedCategoryFields && (this._categories = [], this.chart._getAllData().forEach(function(t) {
        var e = "";
        null !== this.categoryFields && (this.categoryFields.forEach(function(i, s) {
          s > 0 && (e += "/"), e += t[i]
        }, this), -1 === this._categories.indexOf(e) && (this._categories.push(e), this._categories.length))
      }, this), this._cachedCategoryFields = this._categoryFields), this._categories
    }, this._getFontSize = function() {
      return this.fontSize && "auto" !== this.fontSize.toString().toLowerCase() ? isNaN(this.fontSize) ? this.fontSize : this.fontSize + "px" : (this.chart._heightPixels() / 35 > 10 ? this.chart._heightPixels() / 35 : 10) + "px"
    }, this._goToFrameIndex = function(t) {
      this._frame = t % this._getCategories().length, this.chart.draw(this.frameDuration / 2)
    }, this.addOrderRule = function(t, e) {
      this._orderRules.push({
        ordering: t,
        desc: e
      })
    }, this.getFrameValue = function() {
      var t = null;
      return this._frame >= 0 && this._getCategories().length > this._frame && (t = this._getCategories()[this._frame]), t
    }, this.goToFrame = function(t) {
      if (this._getCategories().length > 0) {
        var e = this._getCategories().indexOf(t);
        this._goToFrameIndex(e)
      }
    }, this.pauseAnimation = function() {
      null !== this._animationTimer && (window.clearInterval(this._animationTimer), this._animationTimer = null)
    }, this.startAnimation = function() {
      null === this._animationTimer && (null !== this.onTick && this.onTick(this.getFrameValue()), this._animationTimer = window.setInterval(function(t) {
        return function() {
          t._goToFrameIndex(t._frame + 1), null !== t.onTick && t.onTick(t.getFrameValue()), t._drawText(t.frameDuration / 2)
        }
      }(this), this.frameDuration))
    }, this.stopAnimation = function() {
      null !== this._animationTimer && (window.clearInterval(this._animationTimer), this._animationTimer = null, this._frame = 0)
    }
  }, e.aggregateMethod.avg = function(t, e) {
    return t.value = null === t.value || void 0 === t.value ? 0 : parseFloat(t.value), t.count = null === t.count || void 0 === t.count ? 1 : parseFloat(t.count), e.value = null === e.value || void 0 === e.value ? 0 : parseFloat(e.value), e.count = null === e.count || void 0 === e.count ? 1 : parseFloat(e.count), (t.value * t.count + e.value * e.count) / (t.count + e.count)
  }, e.aggregateMethod.count = function(t, e) {
    return t.count = null === t.count || void 0 === t.count ? 0 : parseFloat(t.count), e.count = null === e.count || void 0 === e.count ? 0 : parseFloat(e.count), t.count + e.count
  }, e.aggregateMethod.max = function(t, e) {
    return t.value = null === t.value || void 0 === t.value ? 0 : parseFloat(t.value), e.value = null === e.value || void 0 === e.value ? 0 : parseFloat(e.value), t.value > e.value ? t.value : e.value
  }, e.aggregateMethod.min = function(t, e) {
    return null === t.value ? parseFloat(e.value) : parseFloat(t.value) < parseFloat(e.value) ? parseFloat(t.value) : parseFloat(e.value)
  }, e.aggregateMethod.sum = function(t, e) {
    return t.value = null === t.value || void 0 === t.value ? 0 : parseFloat(t.value), e.value = null === e.value || void 0 === e.value ? 0 : parseFloat(e.value), t.value + e.value
  }, e.plot.area = {
    stacked: !0,
    grouped: !0,
    supportedAxes: ["x", "y", "c"],
    draw: function(i, s, r) {
      var n, a, o, l, h, u, c, d, p, g, f, m, _, y, x, v, b, w, F, C, k, P, S, M, A = s._positionData,
        T = [],
        E = null,
        O = "dimple-series-" + i.series.indexOf(s),
        L = s.x._hasCategories() || s.y._hasCategories() ? 0 : 1,
        V = !1,
        B = {},
        z = [],
        D = [],
        R = function() {
          return function(i, s, r, n) {
            t.select(s).style("opacity", 1), e._showPointTooltip(i, s, r, n)
          }
        },
        I = function(i) {
          return function(s, r, n, a) {
            t.select(r).style("opacity", a.lineMarkers || i.data.length < 2 ? e._helpers.opacity(s, n, a) : 0), e._removeTooltip(s, r, n, a)
          }
        },
        j = function(t, n) {
          e._drawMarkers(t, i, s, r, O, V, R(t), I(t), n)
        },
        $ = function(t, r) {
          var n;
          return "step" === s.interpolation && s[t]._hasCategories() ? (n = e._helpers[t](r, i, s) + ("y" === t ? e._helpers.height(r, i, s) : 0), s[t].categoryFields.length < 2 && (n += ("y" === t ? 1 : -1) * e._helpers[t + "Gap"](i, s))) : n = e._helpers["c" + t](r, i, s), parseFloat(n)
        },
        N = function(i, r) {
          var n = t.line().x(function(t) {
            return s.x._hasCategories() || !r ? t.x : s.x[r]
          }).y(function(t) {
            return s.y._hasCategories() || !r ? t.y : s.y[r]
          });
          return e._interpolate(n, i), n
        },
        G = function(t, e) {
          return parseFloat(t) - parseFloat(e)
        },
        q = function(t, e) {
          return parseFloat(t.x) - parseFloat(e.x)
        },
        W = function(t, e, i) {
          var s, r, n = e[e.length - 1],
            a = 9999,
            o = n;
          for (s = 0; s < t.length; s += 1) t[s].x === n.x && t[s].y === n.y || (r = 180 - Math.atan2(t[s].x - n.x, t[s].y - n.y) * (180 / Math.PI)) > i && r < a && (o = t[s], a = r);
          return e.push(o), a
        };
      for (n = "step" === s.interpolation ? "step-after" : s.interpolation, f = e._getSeriesOrder(s.data || i.data, s), s.c && (s.x._hasCategories() && s.y._hasMeasure() || s.y._hasCategories() && s.x._hasMeasure()) && (V = !0), s.x._hasCategories() ? (S = "x", M = "y") : s.y._hasCategories() && (S = "y", M = "x"), a = 0; a < A.length; a += 1) {
        for (h = [], c = -1, l = L; l < A[a].aggField.length; l += 1) h.push(A[a].aggField[l]);
        for (u = e._createClass(h), l = 0; l < T.length; l += 1)
          if (T[l].keyString === u) {
            c = l;
            break
          } - 1 === c && (c = T.length, T.push({
          key: h,
          keyString: u,
          color: "white",
          data: [],
          points: [],
          area: {},
          entry: {},
          exit: {},
          group: S && A[a][S + "Field"] && A[a][S + "Field"].length >= 2 ? A[a][S + "Field"][0] : "All"
        })), T[c].data.push(A[a])
      }
      for (f && T.sort(function(t, i) {
          return e._arrayIndexCompare(f, t.key, i.key)
        }), a = 0; a < T.length; a += 1) {
        for (T[a].data.sort(e._getSeriesSortPredicate(i, s, f)), o = 0; o < T[a].data.length; o += 1) T[a].points.push({
          x: $("x", T[a].data[o]),
          y: $("y", T[a].data[o])
        }), S && (B[T[a].group] || (B[T[a].group] = {}), B[T[a].group][T[a].points[T[a].points.length - 1][S]] = s[M]._origin);
        m = T[a].points, "step" === s.interpolation && m.length > 1 && S && (s.x._hasCategories() ? (m.push({
          x: 2 * m[m.length - 1].x - m[m.length - 2].x,
          y: m[m.length - 1].y
        }), B[T[a].group][m[m.length - 1][S]] = s[M]._origin) : s.y._hasCategories() && (m = [{
          x: m[0].x,
          y: 2 * m[0].y - m[1].y
        }].concat(m), B[T[a].group][m[0][S]] = s[M]._origin, T[a].points = m))
      }
      for (x in B)
        if (B.hasOwnProperty(x)) {
          z[x] = [];
          for (v in B[x]) B[x].hasOwnProperty(v) && z[x].push(parseFloat(v));
          z[x].sort(G)
        }
      for (a = 0; a < T.length; a += 1) {
        if (m = T[a].points, b = T[a].group, _ = [], D = [], V && e._addGradient(T[a].key, "fill-area-gradient-" + T[a].keyString, s.x._hasCategories() ? s.x : s.y, A, i, r, "fill"), z[b] && z[b].length > 0)
          for (o = 0, l = 0; o < z[b].length; o += 1) z[b][o] >= m[0][S] && z[b][o] <= m[m.length - 1][S] && (y = {}, y[S] = z[b][o], y[M] = B[b][z[b][o]], _.push(y), m[l][S] > z[b][o] ? D.push(y) : (D.push(m[l]), B[T[a].group][z[b][o]] = m[l][M], l += 1));
        else if (s._orderRules && s._orderRules.length > 0) D = m.concat(m[0]);
        else {
          m = m.sort(q), D.push(m[0]), P = 0;
          do {
            P = W(m, D, P)
          } while (D.length <= m.length && (D[0].x !== D[D.length - 1].x || D[0].y !== D[D.length - 1].y))
        }
        _ = _.reverse(), w = N(n, "_previousOrigin")(D), F = N("step-after" === n ? "step-before" : "step-before" === n ? "step-after" : n, "_previousOrigin")(_), C = N("linear", "_previousOrigin")(D), k = -1 === C.indexOf("L") ? void 0 : C.indexOf("L"), T[a].entry = w + (F && F.length > 0 ? "L" + F.substring(1) : "") + (C && C.length > 0 ? "L" + C.substring(1, k) : 0), w = N(n)(D), F = N("step-after" === n ? "step-before" : "step-before" === n ? "step-after" : n)(_), C = N("linear")(D), k = -1 === C.indexOf("L") ? void 0 : C.indexOf("L"), T[a].update = w + (F && F.length > 0 ? "L" + F.substring(1) : "") + (C && C.length > 0 ? "L" + C.substring(1, k) : 0), w = N(n, "_origin")(D), F = N("step-after" === n ? "step-before" : "step-before" === n ? "step-after" : n, "_origin")(_), C = N("linear", "_origin")(D), k = -1 === C.indexOf("L") ? void 0 : C.indexOf("L"), T[a].exit = w + (F && F.length > 0 ? "L" + F.substring(1) : "") + (C && C.length > 0 ? "L" + C.substring(1, k) : 0), T[a].color = i.getColor(T[a].key.length > 0 ? T[a].key[T[a].key.length - 1] : "All"), T[a].css = i.getClass(T[a].key.length > 0 ? T[a].key[T[a].key.length - 1] : "All")
      }
      i._tooltipGroup && i._tooltipGroup.remove(), E = s.shapes ? s.shapes.data(T, function(t) {
        return t.key
      }) : s._group.selectAll("." + O).data(T, function(t) {
        return t.key
      }), d = E.enter().append("path").attr("id", function(t) {
        return e._createClass([t.key])
      }).attr("class", function(t) {
        return O + " dimple-line " + t.keyString + " " + i.customClassList.areaSeries + " " + t.css
      }).attr("d", function(t) {
        return t.entry
      }).call(function(t) {
        i.noFormats || t.attr("opacity", function(t) {
          return V ? 1 : t.color.opacity
        }).style("fill", function(t) {
          return V ? "url(#" + e._createClass(["fill-area-gradient-" + t.keyString]) + ")" : t.color.fill
        }).style("stroke", function(t) {
          return V ? "url(#" + e._createClass(["stroke-area-gradient-" + t.keyString]) + ")" : t.color.stroke
        }).style("stroke-width", s.lineWeight)
      }).each(function(t) {
        t.markerData = t.data, j(t, this)
      }), p = i._handleTransition(E.merge(d), r, i).attr("d", function(t) {
        return t.update
      }).each(function(t) {
        t.markerData = t.data, j(t, this)
      }), g = i._handleTransition(E.exit(), r, i).attr("d", function(t) {
        return t.exit
      }).each(function(t) {
        t.markerData = [], j(t, this)
      }), e._postDrawHandling(s, p, g, r), s.shapes = s._group.selectAll("." + O)
    }
  }, e.plot.bar = {
    stacked: !0,
    grouped: !1,
    supportedAxes: ["x", "y", "c"],
    draw: function(t, i, s) {
      var r, n, a, o = i._positionData,
        l = null,
        h = ["dimple-series-" + t.series.indexOf(i), "dimple-bar"],
        u = !i._isStacked() && i.x._hasMeasure(),
        c = !i._isStacked() && i.y._hasMeasure(),
        d = "none";
      i.x._hasCategories() && i.y._hasCategories() ? d = "both" : i.x._hasCategories() ? d = "x" : i.y._hasCategories() && (d = "y"), t._tooltipGroup && t._tooltipGroup.remove(), l = i.shapes ? i.shapes.data(o, function(t) {
        return t.key
      }) : i._group.selectAll("." + h.join(".")).data(o, function(t) {
        return t.key
      }), r = l.enter().append("rect").attr("id", function(t) {
        return e._createClass([t.key])
      }).attr("class", function(i) {
        var s = [];
        return s = s.concat(i.aggField), s = s.concat(i.xField), s = s.concat(i.yField), h.join(" ") + " " + e._createClass(s) + " " + t.customClassList.barSeries + " " + e._helpers.css(i, t)
      }).attr("x", function(s) {
        var r = i.x._previousOrigin;
        return "x" === d ? r = e._helpers.x(s, t, i) : "both" === d && (r = e._helpers.cx(s, t, i)), r
      }).attr("y", function(s) {
        var r = i.y._previousOrigin;
        return "y" === d ? r = e._helpers.y(s, t, i) : "both" === d && (r = e._helpers.cy(s, t, i)), r
      }).attr("width", function(s) {
        return "x" === d ? e._helpers.width(s, t, i) : 0
      }).attr("height", function(s) {
        return "y" === d ? e._helpers.height(s, t, i) : 0
      }).on("mouseover", function(s) {
        e._showBarTooltip(s, this, t, i)
      }).on("mouseleave", function(s) {
        e._removeTooltip(s, this, t, i)
      }).call(function(s) {
        t.noFormats || s.attr("opacity", function(s) {
          return e._helpers.opacity(s, t, i)
        }).style("fill", function(s) {
          return e._helpers.fill(s, t, i)
        }).style("stroke", function(s) {
          return e._helpers.stroke(s, t, i)
        })
      }), n = t._handleTransition(l.merge(r), s, t, i).attr("x", function(s) {
        return u ? e._helpers.cx(s, t, i) - i.x.floatingBarWidth / 2 : e._helpers.x(s, t, i)
      }).attr("y", function(s) {
        return c ? e._helpers.cy(s, t, i) - i.y.floatingBarWidth / 2 : e._helpers.y(s, t, i)
      }).attr("width", function(s) {
        return u ? i.x.floatingBarWidth : e._helpers.width(s, t, i)
      }).attr("height", function(s) {
        return c ? i.y.floatingBarWidth : e._helpers.height(s, t, i)
      }).call(function(s) {
        t.noFormats || s.attr("fill", function(s) {
          return e._helpers.fill(s, t, i)
        }).attr("stroke", function(s) {
          return e._helpers.stroke(s, t, i)
        })
      }), a = t._handleTransition(l.exit(), s, t, i).attr("x", function(s) {
        var r = i.x._origin;
        return "x" === d ? r = e._helpers.x(s, t, i) : "both" === d && (r = e._helpers.cx(s, t, i)), r
      }).attr("y", function(s) {
        var r = i.y._origin;
        return "y" === d ? r = e._helpers.y(s, t, i) : "both" === d && (r = e._helpers.cy(s, t, i)), r
      }).attr("width", function(s) {
        return "x" === d ? e._helpers.width(s, t, i) : 0
      }).attr("height", function(s) {
        return "y" === d ? e._helpers.height(s, t, i) : 0
      }), e._postDrawHandling(i, n, a, s), i.shapes = i._group.selectAll("." + h.join("."))
    }
  }, e.plot.bubble = {
    stacked: !1,
    grouped: !1,
    supportedAxes: ["x", "y", "z", "c"],
    draw: function(t, i, s) {
      var r, n, a, o = i._positionData,
        l = null,
        h = ["dimple-series-" + t.series.indexOf(i), "dimple-bubble"];
      t._tooltipGroup && t._tooltipGroup.remove(), l = i.shapes ? i.shapes.data(o, function(t) {
        return t.key
      }) : i._group.selectAll("." + h.join(".")).data(o, function(t) {
        return t.key
      }), r = l.enter().append("circle").attr("id", function(t) {
        return e._createClass([t.key])
      }).attr("class", function(i) {
        var s = [];
        return s = s.concat(i.aggField), s = s.concat(i.xField), s = s.concat(i.yField), s = s.concat(i.zField), h.join(" ") + " " + e._createClass(s) + " " + t.customClassList.bubbleSeries + " " + e._helpers.css(i, t)
      }).attr("cx", function(s) {
        return i.x._hasCategories() ? e._helpers.cx(s, t, i) : i.x._previousOrigin
      }).attr("cy", function(s) {
        return i.y._hasCategories() ? e._helpers.cy(s, t, i) : i.y._previousOrigin
      }).attr("r", 0).on("mouseover", function(s) {
        e._showPointTooltip(s, this, t, i)
      }).on("mouseleave", function(s) {
        e._removeTooltip(s, this, t, i)
      }).call(function(s) {
        t.noFormats || s.attr("opacity", function(s) {
          return e._helpers.opacity(s, t, i)
        }).style("fill", function(s) {
          return e._helpers.fill(s, t, i)
        }).style("stroke", function(s) {
          return e._helpers.stroke(s, t, i)
        })
      }), n = t._handleTransition(l.merge(r), s, t, i).attr("cx", function(s) {
        return e._helpers.cx(s, t, i)
      }).attr("cy", function(s) {
        return e._helpers.cy(s, t, i)
      }).attr("r", function(s) {
        return e._helpers.r(s, t, i)
      }).call(function(s) {
        t.noFormats || s.attr("fill", function(s) {
          return e._helpers.fill(s, t, i)
        }).attr("stroke", function(s) {
          return e._helpers.stroke(s, t, i)
        })
      }), a = t._handleTransition(l.exit(), s, t, i).attr("r", 0).attr("cx", function(s) {
        return i.x._hasCategories() ? e._helpers.cx(s, t, i) : i.x._origin
      }).attr("cy", function(s) {
        return i.y._hasCategories() ? e._helpers.cy(s, t, i) : i.y._origin
      }), e._postDrawHandling(i, n, a, s), i.shapes = i._group.selectAll("." + h.join("."))
    }
  }, e.plot.line = {
    stacked: !1,
    grouped: !0,
    supportedAxes: ["x", "y", "c"],
    draw: function(i, s, r) {
      var n, a, o, l, h, u, c, d, p, g, f, m = s._positionData,
        _ = [],
        y = null,
        x = "dimple-series-" + i.series.indexOf(s),
        v = s.x._hasCategories() || s.y._hasCategories() ? 0 : 1,
        b = !1,
        w = function() {
          return function(i, s, r, n) {
            t.select(s).style("opacity", 1), e._showPointTooltip(i, s, r, n)
          }
        },
        F = function(i) {
          return function(s, r, n, a) {
            t.select(r).style("opacity", a.lineMarkers || i.data.length < 2 ? e._helpers.opacity(s, n, a) : 0), e._removeTooltip(s, r, n, a)
          }
        },
        C = function(t, n) {
          e._drawMarkers(t, i, s, r, x, b, w(t), F(t), n)
        },
        k = function(t, r) {
          var n;
          return "step" === s.interpolation && s[t]._hasCategories() ? (s.barGap = 0, s.clusterBarGap = 0, n = e._helpers[t](r, i, s) + ("y" === t ? e._helpers.height(r, i, s) : 0)) : n = e._helpers["c" + t](r, i, s), parseFloat(n.toFixed(1))
        },
        P = function(i, r) {
          var n = t.line().x(function(t) {
            return s.x._hasCategories() || !r ? t.x : s.x[r]
          }).y(function(t) {
            return s.y._hasCategories() || !r ? t.y : s.y[r]
          });
          return e._interpolate(n, i), n
        };
      for (n = "step" === s.interpolation ? "step-after" : s.interpolation, f = e._getSeriesOrder(s.data || i.data, s), s.c && (s.x._hasCategories() && s.y._hasMeasure() || s.y._hasCategories() && s.x._hasMeasure()) && (b = !0), a = 0; a < m.length; a += 1) {
        for (h = [], c = -1, l = v; l < m[a].aggField.length; l += 1) h.push(m[a].aggField[l]);
        for (u = e._createClass(h), l = 0; l < _.length; l += 1)
          if (_[l].keyString === u) {
            c = l;
            break
          } - 1 === c && (c = _.length, _.push({
          key: h,
          keyString: u,
          color: "white",
          data: [],
          markerData: [],
          points: [],
          line: {},
          entry: {},
          exit: {}
        })), _[c].data.push(m[a])
      }
      for (f && _.sort(function(t, i) {
          return e._arrayIndexCompare(f, t.key, i.key)
        }), a = 0; a < _.length; a += 1) {
        for (_[a].data.sort(e._getSeriesSortPredicate(i, s, f)), b && e._addGradient(_[a].key, "fill-line-gradient-" + _[a].keyString, s.x._hasCategories() ? s.x : s.y, m, i, r, "fill"), o = 0; o < _[a].data.length; o += 1) _[a].points.push({
          x: k("x", _[a].data[o]),
          y: k("y", _[a].data[o])
        });
        "step" === s.interpolation && _[a].points.length > 1 && (s.x._hasCategories() ? _[a].points.push({
          x: 2 * _[a].points[_[a].points.length - 1].x - _[a].points[_[a].points.length - 2].x,
          y: _[a].points[_[a].points.length - 1].y
        }) : s.y._hasCategories() && (_[a].points = [{
          x: _[a].points[0].x,
          y: 2 * _[a].points[0].y - _[a].points[1].y
        }].concat(_[a].points))), _ && _[a] && _[a].points && 1 === _[a].points.length && _[a].points.push({
          x: _[a].points[0].x,
          y: _[a].points[0].y
        }), _[a].entry = P(n, "_previousOrigin")(_[a].points), _[a].update = P(n)(_[a].points), _[a].exit = P(n, "_origin")(_[a].points), _[a].color = i.getColor(_[a].key.length > 0 ? _[a].key[_[a].key.length - 1] : "All"), _[a].css = i.getClass(_[a].key.length > 0 ? _[a].key[_[a].key.length - 1] : "All")
      }
      i._tooltipGroup && i._tooltipGroup.remove(), y = s.shapes ? s.shapes.data(_, function(t) {
        return t.key
      }) : s._group.selectAll("." + x).data(_, function(t) {
        return t.key
      }), d = y.enter().append("path").attr("id", function(t) {
        return e._createClass([t.key])
      }).attr("class", function(t) {
        return x + " dimple-line " + t.keyString + " " + i.customClassList.lineSeries + " " + t.css
      }).attr("d", function(t) {
        return t.entry
      }).call(function(t) {
        i.noFormats || t.attr("opacity", function(t) {
          return b ? 1 : t.color.opacity
        }).style("fill", "none").style("stroke", function(t) {
          return b ? "url(#" + e._createClass(["fill-line-gradient-" + t.keyString]) + ")" : t.color.stroke
        }).style("stroke-width", s.lineWeight)
      }).each(function(t) {
        t.markerData = t.data, C(t, this)
      }), p = i._handleTransition(y.merge(d), r, i).attr("d", function(t) {
        return t.update
      }).each(function(t) {
        t.markerData = t.data, C(t, this)
      }), g = i._handleTransition(y.exit(), r, i).attr("d", function(t) {
        return t.exit
      }).each(function(t) {
        t.markerData = [], C(t, this)
      }), e._postDrawHandling(s, p, g, r), s.shapes = s._group.selectAll("." + x)
    }
  }, e.plot.pie = {
    stacked: !1,
    grouped: !1,
    supportedAxes: ["x", "y", "c", "z", "p"],
    draw: function(i, s, r) {
      var n, a, o, l = s._positionData,
        h = null,
        u = ["dimple-series-" + i.series.indexOf(s), "dimple-pie"],
        c = function(t) {
          return s.x && s.y ? e._helpers.r(t, i, s) : i._widthPixels() < i._heightPixels() ? i._widthPixels() / 2 : i._heightPixels() / 2
        },
        d = function(t) {
          var i = c(t);
          return s.outerRadius && (i = e._parsePosition(s.outerRadius, i)), Math.max(i, 0)
        },
        p = function(t) {
          var i = 0;
          return s.innerRadius && (i = e._parsePosition(s.innerRadius, c(t))), Math.max(i, 0)
        },
        g = function(e) {
          return t.arc().innerRadius(p(e)).outerRadius(d(e))(e)
        },
        f = function(e) {
          e.innerRadius = p(e), e.outerRadius = d(e);
          var i, s = t.interpolate(this._current, e);
          return i = t.arc().innerRadius(function(t) {
              return t.innerRadius
            }).outerRadius(function(t) {
              return t.outerRadius
            }), this._current = s(0),
            function(t) {
              return i(s(t))
            }
        },
        m = function(t) {
          return function(r) {
            var n, a;
            return s.x && s.y ? (n = !t || s.x._hasCategories() ? e._helpers.cx(r, i, s) : s.x._previousOrigin, a = !t || s.y._hasCategories() ? e._helpers.cy(r, i, s) : s.y._previousOrigin) : (n = i._xPixels() + i._widthPixels() / 2, a = i._yPixels() + i._heightPixels() / 2), "translate(" + n + "," + a + ")"
          }
        };
      i._tooltipGroup && i._tooltipGroup.remove(), h = s.shapes ? s.shapes.data(l, function(t) {
        return t.key
      }) : s._group.selectAll("." + u.join(".")).data(l, function(t) {
        return t.key
      }), n = h.enter().append("path").attr("id", function(t) {
        return e._createClass([t.key])
      }).attr("class", function(t) {
        var s = [];
        return s = s.concat(t.aggField), s = s.concat(t.pField), u.join(" ") + " " + e._createClass(s) + " " + i.customClassList.pieSeries + " " + e._helpers.css(t, i)
      }).attr("d", g).on("mouseover", function(t) {
        e._showBarTooltip(t, this, i, s)
      }).on("mouseleave", function(t) {
        e._removeTooltip(t, this, i, s)
      }).call(function(t) {
        i.noFormats || t.attr("opacity", function(t) {
          return e._helpers.opacity(t, i, s)
        }).style("fill", function(t) {
          return e._helpers.fill(t, i, s)
        }).style("stroke", function(t) {
          return e._helpers.stroke(t, i, s)
        })
      }).attr("transform", m(!0)).each(function(t) {
        this._current = t, t.innerRadius = p(t), t.outerRadius = d(t)
      }), a = i._handleTransition(h.merge(n), r, i, s).call(function(t) {
        r && r > 0 ? t.attrTween("d", f) : t.attr("d", g), i.noFormats || t.attr("fill", function(t) {
          return e._helpers.fill(t, i, s)
        }).attr("stroke", function(t) {
          return e._helpers.stroke(t, i, s)
        })
      }).attr("transform", m(!1)), o = i._handleTransition(h.exit(), r, i, s).attr("transform", m(!0)).attr("d", g), e._postDrawHandling(s, a, o, r), s.shapes = s._group.selectAll("." + u.join("."))
    }
  }, e._addGradient = function(t, i, s, r, n, a, o) {
    var l = [].concat(t),
      h = n.svg.select("#" + e._createClass([i])),
      u = [],
      c = s.position + "Field",
      d = !0,
      p = [];
    r.forEach(function(t) {
      -1 === u.indexOf(t[c]) && t.aggField.join("_") === l.join("_") && u.push(t[c])
    }, this), u = u.sort(function(t, e) {
      return s._scale(t) - s._scale(e)
    }), null === h.node() && (d = !1, h = n.svg.append("defs").append("linearGradient").attr("id", e._createClass([i])).attr("gradientUnits", "userSpaceOnUse").attr("x1", "x" === s.position ? s._scale(u[0]) + n._widthPixels() / u.length / 2 : 0).attr("y1", "y" === s.position ? s._scale(u[0]) - n._heightPixels() / u.length / 2 : 0).attr("x2", "x" === s.position ? s._scale(u[u.length - 1]) + n._widthPixels() / u.length / 2 : 0).attr("y2", "y" === s.position ? s._scale(u[u.length - 1]) - n._heightPixels() / u.length / 2 : 0)), u.forEach(function(t, e) {
      var i = {},
        s = 0;
      for (s = 0; s < r.length; s += 1)
        if (r[s].aggField.join("_") === l.join("_") && r[s][c].join("_") === t.join("_")) {
          i = r[s];
          break
        }
      p.push({
        offset: Math.round(e / (u.length - 1) * 100) + "%",
        color: i[o]
      })
    }, this), d ? n._handleTransition(h.selectAll("stop").data(p), a, n).attr("offset", function(t) {
      return t.offset
    }).attr("stop-color", function(t) {
      return t.color
    }) : h.selectAll("stop").data(p).enter().append("stop").attr("offset", function(t) {
      return t.offset
    }).attr("stop-color", function(t) {
      return t.color
    })
  }, e._arrayIndexCompare = function(t, e, i) {
    var s, r, n, a, o, l;
    for (r = 0; r < t.length; r += 1) {
      for (a = !0, o = !0, l = [].concat(t[r]), n = 0; n < e.length; n += 1) a = a && e[n] === l[n];
      for (n = 0; n < i.length; n += 1) o = o && i[n] === l[n];
      if (a || o) {
        s = a && o ? 0 : a ? -1 : 1;
        break
      }
    }
    return s
  }, e._createClass = function(t) {
    var e, i, s = [];
    if (i = function(t) {
        var e = t.charCodeAt(0),
          i = "-";
        return e >= 65 && e <= 90 && (i = t.toLowerCase()), i
      }, t.length > 0)
      for (e = 0; e < t.length; e += 1) t[e] && s.push("dimple-" + t[e].toString().replace(/[^a-z0-9]/g, i));
    else s = ["dimple-all"];
    return s.join(" ")
  }, e._drawMarkerBacks = function(i, s, r, n, a, o) {
    var l, h, u, c = ["dimple-marker-back", a, i.keyString];
    r.lineMarkers && (l = null === r._markerBacks || void 0 === r._markerBacks || void 0 === r._markerBacks[i.keyString] ? r._group.selectAll("." + c.join(".")).data(i.markerData) : r._markerBacks[i.keyString].data(i.markerData, function(t) {
      return t.key
    }), u = o.nextSibling && o.nextSibling.id ? l.enter().insert("circle", "#" + o.nextSibling.id) : l.enter().append("circle"), u.attr("id", function(t) {
      return e._createClass([t.key + " Marker Back"])
    }).attr("class", function(t) {
      var i = [];
      return r.x._hasCategories() && (i = i.concat(t.xField)), r.y._hasCategories() && (i = i.concat(t.yField)), e._createClass(i) + " " + c.join(" ")
    }).attr("cx", function(t) {
      return r.x._hasCategories() ? e._helpers.cx(t, s, r) : r.x._previousOrigin
    }).attr("cy", function(t) {
      return r.y._hasCategories() ? e._helpers.cy(t, s, r) : r.y._previousOrigin
    }).attr("r", 0).attr("fill", "white").attr("stroke", "none"), s._handleTransition(l.merge(u), n, s).attr("cx", function(t) {
      return e._helpers.cx(t, s, r)
    }).attr("cy", function(t) {
      return e._helpers.cy(t, s, r)
    }).attr("r", 2 + r.lineWeight), h = s._handleTransition(l.exit(), n, s).attr("cx", function(t) {
      return r.x._hasCategories() ? e._helpers.cx(t, s, r) : r.x._origin
    }).attr("cy", function(t) {
      return r.y._hasCategories() ? e._helpers.cy(t, s, r) : r.y._origin
    }).attr("r", 0), 0 === n ? h.remove() : h.each("end", function() {
      t.select(this).remove()
    }), void 0 !== r._markerBacks && null !== r._markerBacks || (r._markerBacks = {}), r._markerBacks[i.keyString] = l)
  }, e._drawMarkers = function(i, s, r, n, a, o, l, h, u) {
    var c, d, p, g = ["dimple-marker", a, i.keyString];
    c = null === r._markers || void 0 === r._markers || void 0 === r._markers[i.keyString] ? r._group.selectAll("." + g.join(".")).data(i.markerData) : r._markers[i.keyString].data(i.markerData, function(t) {
      return t.key
    }), p = u.nextSibling && u.nextSibling.id ? c.enter().insert("circle", "#" + u.nextSibling.id) : c.enter().append("circle"), p.attr("id", function(t) {
      return e._createClass([t.key + " Marker"])
    }).attr("class", function(t) {
      var i = [],
        n = s.getClass(t.aggField.length > 0 ? t.aggField[t.aggField.length - 1] : "All");
      return r.x._hasCategories() && (i = i.concat(t.xField)), r.y._hasCategories() && (i = i.concat(t.yField)), e._createClass(i) + " " + g.join(" ") + " " + s.customClassList.lineMarker + " " + n
    }).on("mouseover", function(t) {
      l(t, this, s, r)
    }).on("mouseleave", function(t) {
      h(t, this, s, r)
    }).attr("cx", function(t) {
      return r.x._hasCategories() ? e._helpers.cx(t, s, r) : r.x._previousOrigin
    }).attr("cy", function(t) {
      return r.y._hasCategories() ? e._helpers.cy(t, s, r) : r.y._previousOrigin
    }).attr("r", 0).attr("opacity", r.lineMarkers || i.data.length < 2 ? i.color.opacity : 0).call(function(t) {
      s.noFormats || t.attr("fill", "white").style("stroke-width", r.lineWeight).attr("stroke", function(t) {
        return o ? e._helpers.fill(t, s, r) : i.color.stroke
      })
    }), s._handleTransition(c.merge(p), n, s).attr("cx", function(t) {
      return e._helpers.cx(t, s, r)
    }).attr("cy", function(t) {
      return e._helpers.cy(t, s, r)
    }).attr("r", 2 + r.lineWeight).attr("opacity", r.lineMarkers || i.data.length < 2 ? i.color.opacity : 0).call(function(t) {
      s.noFormats || t.attr("fill", "white").style("stroke-width", r.lineWeight).attr("stroke", function(t) {
        return o ? e._helpers.fill(t, s, r) : i.color.stroke
      })
    }), d = s._handleTransition(c.exit(), n, s).attr("cx", function(t) {
      return r.x._hasCategories() ? e._helpers.cx(t, s, r) : r.x._origin
    }).attr("cy", function(t) {
      return r.y._hasCategories() ? e._helpers.cy(t, s, r) : r.y._origin
    }).attr("r", 0), 0 === n ? d.remove() : d.each("end", function() {
      t.select(this).remove()
    }), void 0 !== r._markers && null !== r._markers || (r._markers = {}), r._markers[i.keyString] = c, e._drawMarkerBacks(i, s, r, n, a, u)
  }, e._ease = function(e, i) {
    if (e && i && "[object String]" === Object.prototype.toString.call(i)) {
      switch (i) {
        case "linear":
          i = t.easeLinear;
          break;
        case "poly":
          i = t.easePoly;
          break;
        case "quad":
          i = t.easeQuad;
          break;
        case "cubic":
          i = t.easeCubic;
          break;
        case "sin":
          i = t.easeSin;
          break;
        case "exp":
          i = t.easeExp;
          break;
        case "circle":
          i = t.easeCircle;
          break;
        case "elastic":
          i = t.easeElastic;
          break;
        case "back":
          i = t.easeBack;
          break;
        case "bounce":
          i = t.easeBounce
      }
      e.ease(i)
    }
  }, e._getOrderedList = function(t, i, s) {
    var r, n = [],
      a = [],
      o = [].concat(i),
      l = [].concat(i),
      h = [];
    return null !== s && void 0 !== s && (h = h.concat(s)), h = h.concat({
      ordering: o,
      desc: !1
    }), h.forEach(function(e) {
      var i, s = [],
        r = [];
      if ("function" == typeof e.ordering) {
        if (t && t.length > 0)
          for (i in t[0]) t[0].hasOwnProperty(i) && -1 === l.indexOf(i) && l.push(i)
      } else if (e.ordering instanceof Array) {
        for (i = 0; i < e.ordering.length; i += 1) t && t.length > 0 && t[0].hasOwnProperty(e.ordering[i]) && r.push(e.ordering[i]), s.push(e.ordering[i]);
        r.length > s.length / 2 ? l.concat(r) : e.values = s
      } else l.push(e.ordering)
    }, this), r = e._rollUp(t, o, l), h.length >= 1 && (h.forEach(function(t) {
      var e = null !== t.desc && void 0 !== t.desc && t.desc,
        i = t.ordering,
        s = [],
        r = function(t) {
          var e, i = 0;
          for (e = 0; e < t.length; e += 1) {
            if (isNaN(t[e])) {
              i = void 0;
              break
            }
            i += parseFloat(t[e])
          }
          return i
        },
        a = function(t, e) {
          var i = 0,
            s = r(t),
            n = r(e);
          return isNaN(s) || isNaN(n) ? isNaN(Date.parse(t[0])) || isNaN(Date.parse(e[0])) ? t[0] < e[0] ? i = -1 : t[0] > e[0] && (i = 1) : i = Date.parse(t[0]) - Date.parse(e[0]) : i = parseFloat(s) - parseFloat(n), i
        };
      "function" == typeof i ? n.push(function(t, s) {
        return (e ? -1 : 1) * i(t, s)
      }) : t.values && t.values.length > 0 ? (t.values.forEach(function(t) {
        s.push([].concat(t).join("|"))
      }, this), n.push(function(t, i) {
        var r, n, a, l = "",
          h = "";
        for (a = 0; a < o.length; a += 1) a > 0 && (l += "|", h += "|"), l += t[o[a]], h += i[o[a]];
        return r = s.indexOf(l), n = s.indexOf(h), r = r < 0 ? e ? -1 : s.length : r, n = n < 0 ? e ? -1 : s.length : n, (e ? -1 : 1) * (r - n)
      })) : [].concat(t.ordering).forEach(function(t) {
        n.push(function(i, s) {
          var r = 0;
          return void 0 !== i[t] && void 0 !== s[t] && (r = a([].concat(i[t]), [].concat(s[t]))), (e ? -1 : 1) * r
        })
      })
    }), r.sort(function(t, e) {
      for (var i = 0, s = 0; i < n.length && 0 === s;) s = n[i](t, e), i += 1;
      return s
    }), r.forEach(function(t) {
      var e, i = [];
      if (1 === o.length) a.push(t[o[0]]);
      else {
        for (e = 0; e < o.length; e += 1) i.push(t[o[e]]);
        a.push(i)
      }
    }, this)), a
  }, e._getSeriesOrder = function(t, i) {
    var s = [].concat(i._orderRules),
      r = i.categoryFields,
      n = [];
    return null !== r && void 0 !== r && r.length > 0 && (null !== i.c && void 0 !== i.c && i.c._hasMeasure() && s.push({
      ordering: i.c.measure,
      desc: !0
    }), i.x._hasMeasure() && s.push({
      ordering: i.x.measure,
      desc: !0
    }), i.y._hasMeasure() && s.push({
      ordering: i.y.measure,
      desc: !0
    }), n = e._getOrderedList(t, r, s)), n
  }, e._getSeriesSortPredicate = function(t, i, s) {
    return function(r, n) {
      var a = 0;
      return i.x._hasCategories() && (a = e._helpers.cx(r, t, i) - e._helpers.cx(n, t, i)), 0 === a && i.y._hasCategories() && (a = e._helpers.cy(r, t, i) - e._helpers.cy(n, t, i)), 0 === a && s && (a = e._arrayIndexCompare(s, r.aggField, n.aggField)), a
    }
  }, e._helpers = {
    cx: function(t, i, s) {
      return null !== s.x.measure && void 0 !== s.x.measure ? s.x._scale(t.cx) : s.x._hasCategories() && s.x.categoryFields.length >= 2 ? s.x._scale(t.cx) + e._helpers.xGap(i, s) + (t.xOffset + .5) * ((i._widthPixels() / s.x._max - 2 * e._helpers.xGap(i, s)) * t.width) : s.x._scale(t.cx) + i._widthPixels() / s.x._max / 2
    },
    cy: function(t, i, s) {
      return null !== s.y.measure && void 0 !== s.y.measure ? s.y._scale(t.cy) : null !== s.y.categoryFields && void 0 !== s.y.categoryFields && s.y.categoryFields.length >= 2 ? s.y._scale(t.cy) - i._heightPixels() / s.y._max + e._helpers.yGap(i, s) + (t.yOffset + .5) * ((i._heightPixels() / s.y._max - 2 * e._helpers.yGap(i, s)) * t.height) : s.y._scale(t.cy) - i._heightPixels() / s.y._max / 2
    },
    r: function(t, e, i) {
      var s = 0,
        r = 1;
      return null === i.z || void 0 === i.z ? s = i.radius && "auto" !== i.radius ? i.radius : 5 : (i.radius && "auto" !== i.radius && i.radius > 1 && (r = i.radius / i.z._scale(i.z._max)), s = i.z._hasMeasure() ? i.z._scale(t.r) * r : i.z._scale(e._heightPixels() / 100) * r), s
    },
    xGap: function(t, e) {
      var i = 0;
      return (null === e.x.measure || void 0 === e.x.measure) && e.barGap > 0 && (i = t._widthPixels() / e.x._max * (e.barGap > .99 ? .99 : e.barGap) / 2), i
    },
    xClusterGap: function(t, i, s) {
      var r = 0;
      return null !== s.x.categoryFields && void 0 !== s.x.categoryFields && s.x.categoryFields.length >= 2 && s.clusterBarGap > 0 && !s.x._hasMeasure() && (r = t.width * (i._widthPixels() / s.x._max - 2 * e._helpers.xGap(i, s)) * (s.clusterBarGap > .99 ? .99 : s.clusterBarGap) / 2), r
    },
    yGap: function(t, e) {
      var i = 0;
      return (null === e.y.measure || void 0 === e.y.measure) && e.barGap > 0 && (i = t._heightPixels() / e.y._max * (e.barGap > .99 ? .99 : e.barGap) / 2), i
    },
    yClusterGap: function(t, i, s) {
      var r = 0;
      return null !== s.y.categoryFields && void 0 !== s.y.categoryFields && s.y.categoryFields.length >= 2 && s.clusterBarGap > 0 && !s.y._hasMeasure() && (r = t.height * (i._heightPixels() / s.y._max - 2 * e._helpers.yGap(i, s)) * (s.clusterBarGap > .99 ? .99 : s.clusterBarGap) / 2), r
    },
    x: function(t, i, s) {
      return s.x._hasTimeField() ? s.x._scale(t.x) - e._helpers.width(t, i, s) / 2 : null !== s.x.measure && void 0 !== s.x.measure ? s.x._scale(t.x) : s.x._scale(t.x) + e._helpers.xGap(i, s) + t.xOffset * (e._helpers.width(t, i, s) + 2 * e._helpers.xClusterGap(t, i, s)) + e._helpers.xClusterGap(t, i, s)
    },
    y: function(t, i, s) {
      return s.y._hasTimeField() ? s.y._scale(t.y) - e._helpers.height(t, i, s) / 2 : null !== s.y.measure && void 0 !== s.y.measure ? s.y._scale(t.y) : s.y._scale(t.y) - i._heightPixels() / s.y._max + e._helpers.yGap(i, s) + t.yOffset * (e._helpers.height(t, i, s) + 2 * e._helpers.yClusterGap(t, i, s)) + e._helpers.yClusterGap(t, i, s)
    },
    width: function(t, i, s) {
      return null !== s.x.measure && void 0 !== s.x.measure ? Math.abs(s.x._scale(t.x < 0 ? t.x - t.width : t.x + t.width) - s.x._scale(t.x)) : s.x._hasTimeField() ? s.x.floatingBarWidth : t.width * (i._widthPixels() / s.x._max - 2 * e._helpers.xGap(i, s)) - 2 * e._helpers.xClusterGap(t, i, s)
    },
    height: function(t, i, s) {
      return s.y._hasTimeField() ? s.y.floatingBarWidth : null !== s.y.measure && void 0 !== s.y.measure ? Math.abs(s.y._scale(t.y) - s.y._scale(t.y <= 0 ? t.y + t.height : t.y - t.height)) : t.height * (i._heightPixels() / s.y._max - 2 * e._helpers.yGap(i, s)) - 2 * e._helpers.yClusterGap(t, i, s)
    },
    opacity: function(t, e, i) {
      return null !== i.c && void 0 !== i.c ? t.opacity : e.getColor(t.aggField.slice(-1)[0]).opacity
    },
    fill: function(t, e, i) {
      return null !== i.c && void 0 !== i.c ? t.fill : e.getColor(t.aggField.slice(-1)[0]).fill
    },
    stroke: function(t, e, i) {
      return null !== i.c && void 0 !== i.c ? t.stroke : e.getColor(t.aggField.slice(-1)[0]).stroke
    },
    css: function(t, e) {
      return e.getClass(t.aggField.slice(-1)[0])
    }
  }, e._interpolate = function(e, i) {
    if (e && i) {
      if ("[object String]" === Object.prototype.toString.call(i)) switch (i) {
        case "linear":
          i = t.curveLinear;
          break;
        case "linear-closed":
          i = t.curveLinearClosed;
          break;
        case "step":
          i = t.curveStep;
          break;
        case "step-before":
          i = t.curveStepBefore;
          break;
        case "step-after":
          i = t.curveStepAfter;
          break;
        case "basis":
          i = t.curveBasis;
          break;
        case "basis-open":
          i = t.curveBasisOpen;
          break;
        case "basis-closed":
          i = t.curveBasisClosed;
          break;
        case "bundle":
          i = t.curveBundle;
          break;
        case "cardinal":
          i = t.curveCardinal;
          break;
        case "cardinal-open":
          i = t.curveCardinalOpen;
          break;
        case "cardinal-closed":
          i = t.curveCardinalClosed;
          break;
        case "monotone":
          i = t.curveMonotoneX
      }
      e.curve(i)
    }
  }, e._parentHeight = function(t) {
    var e = t.getBoundingClientRect().height;
    return (!e || e < 0) && (e = t.clientHeight), e
  }, e._parentWidth = function(t) {
    var e = t.getBoundingClientRect().width;
    return (!e || e < 0) && (e = t.clientWidth), e
  }, e._parsePosition = function(t, e) {
    var i, s = 0;
    return t && (i = t.toString().split(","), i.forEach(function(i) {
      i && (isNaN(i) ? "%" === i.slice(-1) ? s += e * (parseFloat(i.slice(0, i.length - 1)) / 100) : "px" === i.slice(-2) ? s += parseFloat(i.slice(0, i.length - 2)) : s = t : s += parseFloat(i))
    }, this)), s < 0 && (s = e + s), s
  }, e._parseXPosition = function(t, i) {
    return e._parsePosition(t, e._parentWidth(i))
  }, e._parseYPosition = function(t, i) {
    return e._parsePosition(t, e._parentHeight(i))
  }, e._postDrawHandling = function(t, e, i, s) {
    0 === s ? (e.each(function(e, i) {
      t.afterDraw && t.afterDraw(this, e, i)
    }), i.remove()) : (e.on("end", function(e, i) {
      t.afterDraw && t.afterDraw(this, e, i)
    }), i.call(function() {
      t.shapes && t.shapes.exit().remove()
    }))
  }, e._removeTooltip = function(t, e, i) {
    i._tooltipGroup && i._tooltipGroup.remove()
  }, e._rollUp = function(t, e, i) {
    var s = [];
    return e = null !== e && void 0 !== e ? [].concat(e) : [], t.forEach(function(t) {
      var r = -1,
        n = {},
        a = !0;
      s.forEach(function(i, s) {
        -1 === r && (a = !0, e.forEach(function(e) {
          a = a && t[e] === i[e]
        }, this), a && (r = s))
      }, this), -1 !== r ? n = s[r] : (e.forEach(function(e) {
        n[e] = t[e]
      }, this), s.push(n), r = s.length - 1), i.forEach(function(i) {
        -1 === e.indexOf(i) && (void 0 === n[i] && (n[i] = []), n[i] = n[i].concat(t[i]))
      }, this), s[r] = n
    }, this), s
  }, e._showBarTooltip = function(e, i, s, r) {
    var n, a, o, l, h, u, c = 5,
      d = 10,
      p = 750,
      g = t.select(i),
      f = g.node().getBBox().x,
      m = g.node().getBBox().y,
      _ = g.node().getBBox().width,
      y = g.node().getBBox().height,
      x = g.attr("opacity"),
      v = g.attr("fill"),
      b = r._dropLineOrigin(),
      w = t.rgb(t.rgb(v).r + .6 * (255 - t.rgb(v).r), t.rgb(v).g + .6 * (255 - t.rgb(v).g), t.rgb(v).b + .6 * (255 - t.rgb(v).b)),
      F = t.rgb(t.rgb(v).r + .8 * (255 - t.rgb(v).r), t.rgb(v).g + .8 * (255 - t.rgb(v).g), t.rgb(v).b + .8 * (255 - t.rgb(v).b)),
      C = r.getTooltipText(e),
      k = 0,
      P = 0,
      S = 0,
      M = function(t, e) {
        var i = g.node().getCTM(),
          r = s.svg.node().createSVGPoint();
        return r.x = t || 0, r.y = e || 0, r.matrixTransform(i)
      };
    null !== s._tooltipGroup && void 0 !== s._tooltipGroup && s._tooltipGroup.remove(), s._tooltipGroup = s.svg.append("g"), r.p || (u = r._isStacked() ? 1 : _ / 2, r.x._hasCategories() || null === b.y || s._tooltipGroup.append("line").attr("class", "dimple-tooltip-dropline " + s.customClassList.tooltipDropLine).attr("x1", f < r.x._origin ? f + u : f + _ - u).attr("y1", m < b.y ? m + y : m).attr("x2", f < r.x._origin ? f + u : f + _ - u).attr("y2", m < b.y ? m + y : m).call(function(t) {
      s.noFormats || t.style("fill", "none").style("stroke", v).style("stroke-width", 2).style("stroke-dasharray", "3, 3").style("opacity", x)
    }).transition().delay(p / 2).duration(p / 2).ease(t.easeLinear).attr("y2", m < b.y ? b.y - 1 : b.y + 1), u = r._isStacked() ? 1 : y / 2, r.y._hasCategories() || null === b.x || s._tooltipGroup.append("line").attr("class", "dimple-tooltip-dropline " + s.customClassList.tooltipDropLine).attr("x1", f < b.x ? f + _ : f).attr("y1", m < r.y._origin ? m + u : m + y - u).attr("x2", f < b.x ? f + _ : f).attr("y2", m < r.y._origin ? m + u : m + y - u).call(function(t) {
      s.noFormats || t.style("fill", "none").style("stroke", v).style("stroke-width", 2).style("stroke-dasharray", "3, 3").style("opacity", x)
    }).transition().delay(p / 2).duration(p / 2).ease(t.easeLinear).attr("x2", f < b.x ? b.x - 1 : b.x + 1)), n = s._tooltipGroup.append("g"), a = n.append("rect").attr("class", "dimple-tooltip " + s.customClassList.tooltipBox), n.selectAll(".dimple-dont-select-any").data(C).enter().append("text").attr("class", "dimple-tooltip " + s.customClassList.tooltipLabel).text(function(t) {
      return t
    }).call(function(t) {
      s.noFormats || t.style("font-family", r.tooltipFontFamily).style("font-size", r._getTooltipFontSize())
    }), n.each(function() {
      P = this.getBBox().width > P ? this.getBBox().width : P, S = this.getBBox().width > S ? this.getBBox().height : S
    }), n.selectAll("text").attr("x", 0).attr("y", function() {
      return (k += this.getBBox().height) - this.getBBox().height / 2
    }), a.attr("x", -c).attr("y", -c).attr("height", Math.floor(k + c) - .5).attr("width", P + 2 * c).attr("rx", 5).attr("ry", 5).call(function(t) {
      s.noFormats || t.style("fill", F).style("stroke", w).style("stroke-width", 2).style("opacity", .95)
    }), M(f + _ + c + d + P).x < parseFloat(s.svg.node().getBBox().width) ? (o = f + _ + c + d, l = m + y / 2 - (k - (S - c)) / 2) : M(f - (c + d + P)).x > 0 ? (o = f - (c + d + P), l = m + y / 2 - (k - (S - c)) / 2) : M(0, m + y + k + d + c).y < parseFloat(s.svg.node().getBBox().height) ? (o = f + _ / 2 - (2 * c + P) / 2, o = o > 0 ? o : d, o = o + P < parseFloat(s.svg.node().getBBox().width) ? o : parseFloat(s.svg.node().getBBox().width) - P - d, l = m + y + 2 * c) : (o = f + _ / 2 - (2 * c + P) / 2, o = o > 0 ? o : d, o = o + P < parseFloat(s.svg.node().getBBox().width) ? o : parseFloat(s.svg.node().getBBox().width) - P - d, l = m - k - (S - c)), h = M(o, l), n.attr("transform", "translate(" + h.x + " , " + h.y + ")")
  }, e._showPointTooltip = function(i, s, r, n) {
    var a, o, l, h, u = 5,
      c = 10,
      d = 750,
      p = t.select(s),
      g = parseFloat(p.attr("cx")),
      f = parseFloat(p.attr("cy")),
      m = parseFloat(p.attr("r")),
      _ = e._helpers.opacity(i, r, n),
      y = p.attr("stroke"),
      x = n._dropLineOrigin(),
      v = t.rgb(t.rgb(y).r + .6 * (255 - t.rgb(y).r), t.rgb(y).g + .6 * (255 - t.rgb(y).g), t.rgb(y).b + .6 * (255 - t.rgb(y).b)),
      b = t.rgb(t.rgb(y).r + .8 * (255 - t.rgb(y).r), t.rgb(y).g + .8 * (255 - t.rgb(y).g), t.rgb(y).b + .8 * (255 - t.rgb(y).b)),
      w = 0,
      F = 0,
      C = 0,
      k = n.getTooltipText(i);
    null !== r._tooltipGroup && void 0 !== r._tooltipGroup && r._tooltipGroup.remove(), r._tooltipGroup = r.svg.append("g"), r._tooltipGroup.append("circle").attr("class", "dimple-line-marker-circle " + r.customClassList.lineMarkerCircle).attr("cx", g).attr("cy", f).attr("r", m).call(function(t) {
      r.noFormats || t.attr("opacity", 0).style("fill", "none").style("stroke", y).style("stroke-width", 1)
    }).transition().duration(d / 2).ease(t.easeLinear).attr("r", m + n.lineWeight + 2).call(function(t) {
      r.noFormats || t.attr("opacity", 1).style("stroke-width", 2)
    }), null !== x.y && r._tooltipGroup.append("line").attr("class", "dimple-tooltip-dropline " + r.customClassList.tooltipDropLine).attr("x1", g).attr("y1", f < x.y ? f + m + n.lineWeight + 2 : f - m - n.lineWeight - 2).attr("x2", g).attr("y2", f < x.y ? f + m + n.lineWeight + 2 : f - m - n.lineWeight - 2).call(function(t) {
      r.noFormats || t.style("fill", "none").style("stroke", y).style("stroke-width", 2).style("stroke-dasharray", "3, 3").style("opacity", _)
    }).transition().delay(d / 2).duration(d / 2).ease(t.easeLinear).attr("y2", f < x.y ? x.y - 1 : x.y + 1), null !== x.x && r._tooltipGroup.append("line").attr("class", "dimple-tooltip-dropline " + r.customClassList.tooltipDropLine).attr("x1", g < x.x ? g + m + n.lineWeight + 2 : g - m - n.lineWeight - 2).attr("y1", f).attr("x2", g < x.x ? g + m + n.lineWeight + 2 : g - m - n.lineWeight - 2).attr("y2", f).call(function(t) {
      r.noFormats || t.style("fill", "none").style("stroke", y).style("stroke-width", 2).style("stroke-dasharray", "3, 3").style("opacity", _)
    }).transition().delay(d / 2).duration(d / 2).ease(t.easeLinear).attr("x2", g < x.x ? x.x - 1 : x.x + 1), a = r._tooltipGroup.append("g"), o = a.append("rect").attr("class", "dimple-tooltip " + r.customClassList.tooltipBox), a.selectAll(".dont-select-any").data(k).enter().append("text").attr("class", "dimple-tooltip " + r.customClassList.tooltipLabel).text(function(t) {
      return t
    }).call(function(t) {
      r.noFormats || t.style("font-family", n.tooltipFontFamily).style("font-size", n._getTooltipFontSize())
    }), a.each(function() {
      F = this.getBBox().width > F ? this.getBBox().width : F, C = this.getBBox().width > C ? this.getBBox().height : C
    }), a.selectAll("text").attr("x", 0).attr("y", function() {
      return (w += this.getBBox().height) - this.getBBox().height / 2
    }), o.attr("x", -u).attr("y", -u).attr("height", Math.floor(w + u) - .5).attr("width", F + 2 * u).attr("rx", 5).attr("ry", 5).call(function(t) {
      r.noFormats || t.style("fill", b).style("stroke", v).style("stroke-width", 2).style("opacity", .95)
    }), g + m + u + c + F < parseFloat(r.svg.node().getBBox().width) ? (l = g + m + u + c, h = f - (w - (C - u)) / 2) : g - m - (u + c + F) > 0 ? (l = g - m - (u + c + F), h = f - (w - (C - u)) / 2) : f + m + w + c + u < parseFloat(r.svg.node().getBBox().height) ? (l = g - (2 * u + F) / 2, l = l > 0 ? l : c, l = l + F < parseFloat(r.svg.node().getBBox().width) ? l : parseFloat(r.svg.node().getBBox().width) - F - c, h = f + m + 2 * u) : (l = g - (2 * u + F) / 2, l = l > 0 ? l : c, l = l + F < parseFloat(r.svg.node().getBBox().width) ? l : parseFloat(r.svg.node().getBBox().width) - F - c, h = f - w - (C - u)), a.attr("transform", "translate(" + l + " , " + h + ")")
  }, e.filterData = function(t, e, i) {
    var s = t;
    return null !== e && null !== i && (null !== i && void 0 !== i && (i = [].concat(i)), s = [], t.forEach(function(t) {
      null === t[e] ? s.push(t) : i.indexOf([].concat(t[e]).join("/")) > -1 && s.push(t)
    }, this)), s
  }, e.getUniqueValues = function(t, e) {
    var i = [];
    return null !== e && void 0 !== e && (e = [].concat(e), t.forEach(function(t) {
      var s = "";
      e.forEach(function(e, i) {
        i > 0 && (s += "/"), s += t[e]
      }, this), -1 === i.indexOf(s) && i.push(s)
    }, this)), i
  }, e.newSvg = function(e, i, s) {
    var r = null;
    if (null !== e && void 0 !== e || (e = "body"), r = t.select(e), r.empty()) throw "The '" + e + "' selector did not match any elements.  Please prefix with '#' to select by id or '.' to select by class";
    return r.append("svg").attr("width", i).attr("height", s)
  }, e
});
var _slice = Array.prototype.slice,
  _slicedToArray = function() {
    function t(t, e) {
      var i = [],
        s = !0,
        r = !1,
        n = void 0;
      try {
        for (var a, o = t[Symbol.iterator](); !(s = (a = o.next()).done) && (i.push(a.value), !e || i.length !== e); s = !0);
      } catch (t) {
        r = !0, n = t
      } finally {
        try {
          !s && o["return"] && o["return"]()
        } finally {
          if (r) throw n
        }
      }
      return i
    }
    return function(e, i) {
      if (Array.isArray(e)) return e;
      if (Symbol.iterator in Object(e)) return t(e, i);
      throw new TypeError("Invalid attempt to destructure non-iterable instance")
    }
  }(),
  _extends = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var i = arguments[e];
      for (var s in i) Object.prototype.hasOwnProperty.call(i, s) && (t[s] = i[s])
    }
    return t
  };
! function(t, e) {
  "object" == typeof exports && "undefined" != typeof module ? module.exports = e(require("jquery")) : "function" == typeof define && define.amd ? define(["jquery"], e) : t.parsley = e(t.jQuery)
}(this, function(t) {
  "use strict";

  function e(t, e) {
    return t.parsleyAdaptedCallback || (t.parsleyAdaptedCallback = function() {
      var i = Array.prototype.slice.call(arguments, 0);
      i.unshift(this), t.apply(e || O, i)
    }), t.parsleyAdaptedCallback
  }

  function i(t) {
    return 0 === t.lastIndexOf(V, 0) ? t.substr(V.length) : t
  }

  function s() {
    var e = this,
      i = window || global;
    _extends(this, {
      isNativeEvent: function(t) {
        return t.originalEvent && !1 !== t.originalEvent.isTrusted
      },
      fakeInputEvent: function(i) {
        e.isNativeEvent(i) && t(i.target).trigger("input")
      },
      misbehaves: function(i) {
        e.isNativeEvent(i) && (e.behavesOk(i), t(document).on("change.inputevent", i.data.selector, e.fakeInputEvent), e.fakeInputEvent(i))
      },
      behavesOk: function(i) {
        e.isNativeEvent(i) && t(document).off("input.inputevent", i.data.selector, e.behavesOk).off("change.inputevent", i.data.selector, e.misbehaves)
      },
      install: function() {
        if (!i.inputEventPatched) {
          i.inputEventPatched = "0.0.3";
          for (var s = ["select", 'input[type="checkbox"]', 'input[type="radio"]', 'input[type="file"]'], r = 0; r < s.length; r++) {
            var n = s[r];
            t(document).on("input.inputevent", n, {
              selector: n
            }, e.behavesOk).on("change.inputevent", n, {
              selector: n
            }, e.misbehaves)
          }
        }
      },
      uninstall: function() {
        delete i.inputEventPatched, t(document).off(".inputevent")
      }
    })
  }
  var r = 1,
    n = {},
    a = {
      attr: function(t, e, i) {
        var s, r, n, a = new RegExp("^" + e, "i");
        if (void 0 === i) i = {};
        else
          for (s in i) i.hasOwnProperty(s) && delete i[s];
        if (!t) return i;
        for (n = t.attributes, s = n.length; s--;)(r = n[s]) && r.specified && a.test(r.name) && (i[this.camelize(r.name.slice(e.length))] = this.deserializeValue(r.value));
        return i
      },
      checkAttr: function(t, e, i) {
        return t.hasAttribute(e + i)
      },
      setAttr: function(t, e, i, s) {
        t.setAttribute(this.dasherize(e + i), String(s))
      },
      generateID: function() {
        return "" + r++
      },
      deserializeValue: function(e) {
        var i;
        try {
          return e ? "true" == e || "false" != e && ("null" == e ? null : isNaN(i = Number(e)) ? /^[\[\{]/.test(e) ? t.parseJSON(e) : e : i) : e
        } catch (t) {
          return e
        }
      },
      camelize: function(t) {
        return t.replace(/-+(.)?/g, function(t, e) {
          return e ? e.toUpperCase() : ""
        })
      },
      dasherize: function(t) {
        return t.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
      },
      warn: function() {
        var t;
        window.console && "function" == typeof window.console.warn && (t = window.console).warn.apply(t, arguments)
      },
      warnOnce: function(t) {
        n[t] || (n[t] = !0, this.warn.apply(this, arguments))
      },
      _resetWarnings: function() {
        n = {}
      },
      trimString: function(t) {
        return t.replace(/^\s+|\s+$/g, "")
      },
      parse: {
        date: function(t) {
          var e = t.match(/^(\d{4,})-(\d\d)-(\d\d)$/);
          if (!e) return null;
          var i = e.map(function(t) {
              return parseInt(t, 10)
            }),
            s = _slicedToArray(i, 4),
            r = (s[0], s[1]),
            n = s[2],
            a = s[3],
            o = new Date(r, n - 1, a);
          return o.getFullYear() !== r || o.getMonth() + 1 !== n || o.getDate() !== a ? null : o
        },
        string: function(t) {
          return t
        },
        integer: function(t) {
          return isNaN(t) ? null : parseInt(t, 10)
        },
        number: function(t) {
          if (isNaN(t)) throw null;
          return parseFloat(t)
        },
        "boolean": function(t) {
          return !/^\s*false\s*$/i.test(t)
        },
        object: function(t) {
          return a.deserializeValue(t)
        },
        regexp: function(t) {
          var e = "";
          return /^\/.*\/(?:[gimy]*)$/.test(t) ? (e = t.replace(/.*\/([gimy]*)$/, "$1"), t = t.replace(new RegExp("^/(.*?)/" + e + "$"), "$1")) : t = "^" + t + "$", new RegExp(t, e)
        }
      },
      parseRequirement: function(t, e) {
        var i = this.parse[t || "string"];
        if (!i) throw 'Unknown requirement specification: "' + t + '"';
        var s = i(e);
        if (null === s) throw "Requirement is not a " + t + ': "' + e + '"';
        return s
      },
      namespaceEvents: function(e, i) {
        return e = this.trimString(e || "").split(/\s+/), e[0] ? t.map(e, function(t) {
          return t + "." + i
        }).join(" ") : ""
      },
      difference: function(e, i) {
        var s = [];
        return t.each(e, function(t, e) {
          -1 == i.indexOf(e) && s.push(e)
        }), s
      },
      all: function(e) {
        return t.when.apply(t, _toConsumableArray(e).concat([42, 42]))
      },
      objectCreate: Object.create || function() {
        var t = function() {};
        return function(e) {
          if (arguments.length > 1) throw Error("Second argument not supported");
          if ("object" != typeof e) throw TypeError("Argument must be an object");
          t.prototype = e;
          var i = new t;
          return t.prototype = null, i
        }
      }(),
      _SubmitSelector: 'input[type="submit"], button:submit'
    },
    o = {
      namespace: "data-parsley-",
      inputs: "input, textarea, select",
      excluded: "input[type=button], input[type=submit], input[type=reset], input[type=hidden]",
      priorityEnabled: !0,
      multiple: null,
      group: null,
      uiEnabled: !0,
      validationThreshold: 3,
      focus: "first",
      trigger: !1,
      triggerAfterFailure: "input",
      errorClass: "parsley-error",
      successClass: "parsley-success",
      classHandler: function() {},
      errorsContainer: function() {},
      errorsWrapper: '<ul class="parsley-errors-list"></ul>',
      errorTemplate: "<li></li>"
    },
    l = function() {
      this.__id__ = a.generateID()
    };
  l.prototype = {
    asyncSupport: !0,
    _pipeAccordingToValidationResult: function() {
      var e = this,
        i = function() {
          var i = t.Deferred();
          return !0 !== e.validationResult && i.reject(), i.resolve().promise()
        };
      return [i, i]
    },
    actualizeOptions: function() {
      return a.attr(this.element, this.options.namespace, this.domOptions), this.parent && this.parent.actualizeOptions && this.parent.actualizeOptions(), this
    },
    _resetOptions: function(t) {
      this.domOptions = a.objectCreate(this.parent.options), this.options = a.objectCreate(this.domOptions);
      for (var e in t) t.hasOwnProperty(e) && (this.options[e] = t[e]);
      this.actualizeOptions()
    },
    _listeners: null,
    on: function(t, e) {
      return this._listeners = this._listeners || {}, (this._listeners[t] = this._listeners[t] || []).push(e), this
    },
    subscribe: function(e, i) {
      t.listenTo(this, e.toLowerCase(), i)
    },
    off: function(t, e) {
      var i = this._listeners && this._listeners[t];
      if (i)
        if (e)
          for (var s = i.length; s--;) i[s] === e && i.splice(s, 1);
        else delete this._listeners[t];
      return this
    },
    unsubscribe: function(e) {
      t.unsubscribeTo(this, e.toLowerCase())
    },
    trigger: function(t, e, i) {
      e = e || this;
      var s, r = this._listeners && this._listeners[t];
      if (r)
        for (var n = r.length; n--;)
          if (!1 === (s = r[n].call(e, e, i))) return s;
      return !this.parent || this.parent.trigger(t, e, i)
    },
    asyncIsValid: function(t, e) {
      return a.warnOnce("asyncIsValid is deprecated; please use whenValid instead"), this.whenValid({
        group: t,
        force: e
      })
    },
    _findRelated: function() {
      return this.options.multiple ? t(this.parent.element.querySelectorAll("[" + this.options.namespace + 'multiple="' + this.options.multiple + '"]')) : this.$element
    }
  };
  var h = function(t, e) {
      var i = t.match(/^\s*\[(.*)\]\s*$/);
      if (!i) throw 'Requirement is not an array: "' + t + '"';
      var s = i[1].split(",").map(a.trimString);
      if (s.length !== e) throw "Requirement has " + s.length + " values when " + e + " are needed";
      return s
    },
    u = function(t, e, i) {
      var s = null,
        r = {};
      for (var n in t)
        if (n) {
          var o = i(n);
          "string" == typeof o && (o = a.parseRequirement(t[n], o)), r[n] = o
        } else s = a.parseRequirement(t[n], e);
      return [s, r]
    },
    c = function(e) {
      t.extend(!0, this, e)
    };
  c.prototype = {
    validate: function(t, e) {
      if (this.fn) return arguments.length > 3 && (e = [].slice.call(arguments, 1, -1)), this.fn(t, e);
      if (Array.isArray(t)) {
        if (!this.validateMultiple) throw "Validator `" + this.name + "` does not handle multiple values";
        return this.validateMultiple.apply(this, arguments)
      }
      var i = arguments[arguments.length - 1];
      if (this.validateDate && i._isDateInput()) return arguments[0] = a.parse.date(arguments[0]), null !== arguments[0] && this.validateDate.apply(this, arguments);
      if (this.validateNumber) return !isNaN(t) && (arguments[0] = parseFloat(arguments[0]), this.validateNumber.apply(this, arguments));
      if (this.validateString) return this.validateString.apply(this, arguments);
      throw "Validator `" + this.name + "` only handles multiple values"
    },
    parseRequirements: function(e, i) {
      if ("string" != typeof e) return Array.isArray(e) ? e : [e];
      var s = this.requirementType;
      if (Array.isArray(s)) {
        for (var r = h(e, s.length), n = 0; n < r.length; n++) r[n] = a.parseRequirement(s[n], r[n]);
        return r
      }
      return t.isPlainObject(s) ? u(s, e, i) : [a.parseRequirement(s, e)]
    },
    requirementType: "string",
    priority: 2
  };
  var d = function(t, e) {
      this.__class__ = "ValidatorRegistry", this.locale = "en", this.init(t || {}, e || {})
    },
    p = {
      email: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,
      number: /^-?(\d*\.)?\d+(e[-+]?\d+)?$/i,
      integer: /^-?\d+$/,
      digits: /^\d+$/,
      alphanum: /^\w+$/i,
      date: {
        test: function(t) {
          return null !== a.parse.date(t)
        }
      },
      url: new RegExp("^(?:(?:https?|ftp)://)?(?:\\S+(?::\\S*)?@)?(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))(?::\\d{2,5})?(?:/\\S*)?$", "i")
    };
  p.range = p.number;
  var g = function(t) {
      var e = ("" + t).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
      return e ? Math.max(0, (e[1] ? e[1].length : 0) - (e[2] ? +e[2] : 0)) : 0
    },
    f = function(t, e) {
      return e.map(a.parse[t])
    },
    m = function(t, e) {
      return function(i) {
        for (var s = arguments.length, r = Array(s > 1 ? s - 1 : 0), n = 1; n < s; n++) r[n - 1] = arguments[n];
        return r.pop(), e.apply(void 0, [i].concat(_toConsumableArray(f(t, r))))
      }
    },
    _ = function(t) {
      return {
        validateDate: m("date", t),
        validateNumber: m("number", t),
        requirementType: t.length <= 2 ? "string" : ["string", "string"],
        priority: 30
      }
    };
  d.prototype = {
    init: function(t, e) {
      this.catalog = e, this.validators = _extends({}, this.validators);
      for (var i in t) this.addValidator(i, t[i].fn, t[i].priority);
      window.Parsley.trigger("parsley:validator:init")
    },
    setLocale: function(t) {
      if ("undefined" == typeof this.catalog[t]) throw new Error(t + " is not available in the catalog");
      return this.locale = t, this
    },
    addCatalog: function(t, e, i) {
      return "object" == typeof e && (this.catalog[t] = e), !0 === i ? this.setLocale(t) : this
    },
    addMessage: function(t, e, i) {
      return "undefined" == typeof this.catalog[t] && (this.catalog[t] = {}), this.catalog[t][e] = i, this
    },
    addMessages: function(t, e) {
      for (var i in e) this.addMessage(t, i, e[i]);
      return this
    },
    addValidator: function(t) {
      if (this.validators[t]) a.warn('Validator "' + t + '" is already defined.');
      else if (o.hasOwnProperty(t)) return void a.warn('"' + t + '" is a restricted keyword and is not a valid validator name.');
      return this._setValidator.apply(this, arguments)
    },
    updateValidator: function(t) {
      return this.validators[t] ? this._setValidator.apply(this, arguments) : (a.warn('Validator "' + t + '" is not already defined.'), this.addValidator.apply(this, arguments))
    },
    removeValidator: function(t) {
      return this.validators[t] || a.warn('Validator "' + t + '" is not defined.'), delete this.validators[t], this
    },
    _setValidator: function(t, e, i) {
      "object" != typeof e && (e = {
        fn: e,
        priority: i
      }), e.validate || (e = new c(e)), this.validators[t] = e;
      for (var s in e.messages || {}) this.addMessage(s, t, e.messages[s]);
      return this
    },
    getErrorMessage: function(t) {
      var e;
      if ("type" === t.name) {
        e = (this.catalog[this.locale][t.name] || {})[t.requirements]
      } else e = this.formatMessage(this.catalog[this.locale][t.name], t.requirements);
      return e || this.catalog[this.locale].defaultMessage || this.catalog.en.defaultMessage
    },
    formatMessage: function(t, e) {
      if ("object" == typeof e) {
        for (var i in e) t = this.formatMessage(t, e[i]);
        return t
      }
      return "string" == typeof t ? t.replace(/%s/i, e) : ""
    },
    validators: {
      notblank: {
        validateString: function(t) {
          return /\S/.test(t)
        },
        priority: 2
      },
      required: {
        validateMultiple: function(t) {
          return t.length > 0
        },
        validateString: function(t) {
          return /\S/.test(t)
        },
        priority: 512
      },
      type: {
        validateString: function(t, e) {
          var i = arguments.length <= 2 || void 0 === arguments[2] ? {} : arguments[2],
            s = i.step,
            r = void 0 === s ? "any" : s,
            n = i.base,
            a = void 0 === n ? 0 : n,
            o = p[e];
          if (!o) throw new Error("validator type `" + e + "` is not supported");
          if (!o.test(t)) return !1;
          if ("number" === e && !/^any$/i.test(r || "")) {
            var l = Number(t),
              h = Math.max(g(r), g(a));
            if (g(l) > h) return !1;
            var u = function(t) {
              return Math.round(t * Math.pow(10, h))
            };
            if ((u(l) - u(a)) % u(r) != 0) return !1
          }
          return !0
        },
        requirementType: {
          "": "string",
          step: "string",
          base: "number"
        },
        priority: 256
      },
      pattern: {
        validateString: function(t, e) {
          return e.test(t)
        },
        requirementType: "regexp",
        priority: 64
      },
      minlength: {
        validateString: function(t, e) {
          return t.length >= e
        },
        requirementType: "integer",
        priority: 30
      },
      maxlength: {
        validateString: function(t, e) {
          return t.length <= e
        },
        requirementType: "integer",
        priority: 30
      },
      length: {
        validateString: function(t, e, i) {
          return t.length >= e && t.length <= i
        },
        requirementType: ["integer", "integer"],
        priority: 30
      },
      mincheck: {
        validateMultiple: function(t, e) {
          return t.length >= e
        },
        requirementType: "integer",
        priority: 30
      },
      maxcheck: {
        validateMultiple: function(t, e) {
          return t.length <= e
        },
        requirementType: "integer",
        priority: 30
      },
      check: {
        validateMultiple: function(t, e, i) {
          return t.length >= e && t.length <= i
        },
        requirementType: ["integer", "integer"],
        priority: 30
      },
      min: _(function(t, e) {
        return t >= e
      }),
      max: _(function(t, e) {
        return t <= e
      }),
      range: _(function(t, e, i) {
        return t >= e && t <= i
      }),
      equalto: {
        validateString: function(e, i) {
          var s = t(i);
          return s.length ? e === s.val() : e === i
        },
        priority: 256
      }
    }
  };
  var y = {},
    x = function t(e, i, s) {
      for (var r = [], n = [], a = 0; a < e.length; a++) {
        for (var o = !1, l = 0; l < i.length; l++)
          if (e[a].assert.name === i[l].assert.name) {
            o = !0;
            break
          }
        o ? n.push(e[a]) : r.push(e[a])
      }
      return {
        kept: n,
        added: r,
        removed: s ? [] : t(i, e, !0).added
      }
    };
  y.Form = {
    _actualizeTriggers: function() {
      var t = this;
      this.$element.on("submit.Parsley", function(e) {
        t.onSubmitValidate(e)
      }), this.$element.on("click.Parsley", a._SubmitSelector, function(e) {
        t.onSubmitButton(e)
      }), !1 !== this.options.uiEnabled && this.element.setAttribute("novalidate", "")
    },
    focus: function() {
      if (this._focusedField = null, !0 === this.validationResult || "none" === this.options.focus) return null;
      for (var t = 0; t < this.fields.length; t++) {
        var e = this.fields[t];
        if (!0 !== e.validationResult && e.validationResult.length > 0 && "undefined" == typeof e.options.noFocus && (this._focusedField = e.$element, "first" === this.options.focus)) break
      }
      return null === this._focusedField ? null : this._focusedField.focus()
    },
    _destroyUI: function() {
      this.$element.off(".Parsley")
    }
  }, y.Field = {
    _reflowUI: function() {
      if (this._buildUI(), this._ui) {
        var t = x(this.validationResult, this._ui.lastValidationResult);
        this._ui.lastValidationResult = this.validationResult, this._manageStatusClass(), this._manageErrorsMessages(t), this._actualizeTriggers(), !t.kept.length && !t.added.length || this._failedOnce || (this._failedOnce = !0, this._actualizeTriggers())
      }
    },
    getErrorsMessages: function() {
      if (!0 === this.validationResult) return [];
      for (var t = [], e = 0; e < this.validationResult.length; e++) t.push(this.validationResult[e].errorMessage || this._getErrorMessage(this.validationResult[e].assert));
      return t
    },
    addError: function(t) {
      var e = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
        i = e.message,
        s = e.assert,
        r = e.updateClass,
        n = void 0 === r || r;
      this._buildUI(), this._addError(t, {
        message: i,
        assert: s
      }), n && this._errorClass()
    },
    updateError: function(t) {
      var e = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
        i = e.message,
        s = e.assert,
        r = e.updateClass,
        n = void 0 === r || r;
      this._buildUI(), this._updateError(t, {
        message: i,
        assert: s
      }), n && this._errorClass()
    },
    removeError: function(t) {
      var e = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
        i = e.updateClass,
        s = void 0 === i || i;
      this._buildUI(), this._removeError(t), s && this._manageStatusClass()
    },
    _manageStatusClass: function() {
      this.hasConstraints() && this.needsValidation() && !0 === this.validationResult ? this._successClass() : this.validationResult.length > 0 ? this._errorClass() : this._resetClass()
    },
    _manageErrorsMessages: function(e) {
      if ("undefined" == typeof this.options.errorsMessagesDisabled) {
        if ("undefined" != typeof this.options.errorMessage) return e.added.length || e.kept.length ? (this._insertErrorWrapper(), 0 === this._ui.$errorsWrapper.find(".parsley-custom-error-message").length && this._ui.$errorsWrapper.append(t(this.options.errorTemplate).addClass("parsley-custom-error-message")), this._ui.$errorsWrapper.addClass("filled").find(".parsley-custom-error-message").html(this.options.errorMessage)) : this._ui.$errorsWrapper.removeClass("filled").find(".parsley-custom-error-message").remove();
        for (var i = 0; i < e.removed.length; i++) this._removeError(e.removed[i].assert.name);
        for (i = 0; i < e.added.length; i++) this._addError(e.added[i].assert.name, {
          message: e.added[i].errorMessage,
          assert: e.added[i].assert
        });
        for (i = 0; i < e.kept.length; i++) this._updateError(e.kept[i].assert.name, {
          message: e.kept[i].errorMessage,
          assert: e.kept[i].assert
        })
      }
    },
    _addError: function(e, i) {
      var s = i.message,
        r = i.assert;
      this._insertErrorWrapper(), this._ui.$errorsWrapper.addClass("filled").append(t(this.options.errorTemplate).addClass("parsley-" + e).html(s || this._getErrorMessage(r)))
    },
    _updateError: function(t, e) {
      var i = e.message,
        s = e.assert;
      this._ui.$errorsWrapper.addClass("filled").find(".parsley-" + t).html(i || this._getErrorMessage(s))
    },
    _removeError: function(t) {
      this._ui.$errorsWrapper.removeClass("filled").find(".parsley-" + t).remove()
    },
    _getErrorMessage: function(t) {
      var e = t.name + "Message";
      return "undefined" != typeof this.options[e] ? window.Parsley.formatMessage(this.options[e], t.requirements) : window.Parsley.getErrorMessage(t)
    },
    _buildUI: function() {
      if (!this._ui && !1 !== this.options.uiEnabled) {
        var e = {};
        this.element.setAttribute(this.options.namespace + "id", this.__id__), e.$errorClassHandler = this._manageClassHandler(), e.errorsWrapperId = "parsley-id-" + (this.options.multiple ? "multiple-" + this.options.multiple : this.__id__), e.$errorsWrapper = t(this.options.errorsWrapper).attr("id", e.errorsWrapperId), e.lastValidationResult = [], e.validationInformationVisible = !1, this._ui = e
      }
    },
    _manageClassHandler: function() {
      if ("string" == typeof this.options.classHandler) return 0 === t(this.options.classHandler).length && ParsleyUtils.warn("No elements found that match the selector `" + this.options.classHandler + "` set in options.classHandler or data-parsley-class-handler"), t(this.options.classHandler);
      if ("function" == typeof this.options.classHandler) var e = this.options.classHandler.call(this, this);
      return void 0 !== e && e.length ? e : this._inputHolder()
    },
    _inputHolder: function() {
      return this.options.multiple && "SELECT" !== this.element.nodeName ? this.$element.parent() : this.$element
    },
    _insertErrorWrapper: function() {
      var e;
      if (0 !== this._ui.$errorsWrapper.parent().length) return this._ui.$errorsWrapper.parent();
      if ("string" == typeof this.options.errorsContainer) {
        if (t(this.options.errorsContainer).length) return t(this.options.errorsContainer).append(this._ui.$errorsWrapper);
        a.warn("The errors container `" + this.options.errorsContainer + "` does not exist in DOM")
      } else "function" == typeof this.options.errorsContainer && (e = this.options.errorsContainer.call(this, this));
      return void 0 !== e && e.length ? e.append(this._ui.$errorsWrapper) : this._inputHolder().after(this._ui.$errorsWrapper)
    },
    _actualizeTriggers: function() {
      var t, e = this,
        i = this._findRelated();
      i.off(".Parsley"), this._failedOnce ? i.on(a.namespaceEvents(this.options.triggerAfterFailure, "Parsley"), function() {
        e._validateIfNeeded()
      }) : (t = a.namespaceEvents(this.options.trigger, "Parsley")) && i.on(t, function(t) {
        e._validateIfNeeded(t)
      })
    },
    _validateIfNeeded: function(t) {
      var e = this;
      t && /key|input/.test(t.type) && (!this._ui || !this._ui.validationInformationVisible) && this.getValue().length <= this.options.validationThreshold || (this.options.debounce ? (window.clearTimeout(this._debounced), this._debounced = window.setTimeout(function() {
        return e.validate()
      }, this.options.debounce)) : this.validate())
    },
    _resetUI: function() {
      this._failedOnce = !1, this._actualizeTriggers(), "undefined" != typeof this._ui && (this._ui.$errorsWrapper.removeClass("filled").children().remove(), this._resetClass(), this._ui.lastValidationResult = [], this._ui.validationInformationVisible = !1)
    },
    _destroyUI: function() {
      this._resetUI(), "undefined" != typeof this._ui && this._ui.$errorsWrapper.remove(), delete this._ui
    },
    _successClass: function() {
      this._ui.validationInformationVisible = !0, this._ui.$errorClassHandler.removeClass(this.options.errorClass).addClass(this.options.successClass)
    },
    _errorClass: function() {
      this._ui.validationInformationVisible = !0, this._ui.$errorClassHandler.removeClass(this.options.successClass).addClass(this.options.errorClass)
    },
    _resetClass: function() {
      this._ui.$errorClassHandler.removeClass(this.options.successClass).removeClass(this.options.errorClass)
    }
  };
  var v = function(e, i, s) {
      this.__class__ = "Form", this.element = e, this.$element = t(e), this.domOptions = i, this.options = s, this.parent = window.Parsley, this.fields = [], this.validationResult = null
    },
    b = {
      pending: null,
      resolved: !0,
      rejected: !1
    };
  v.prototype = {
    onSubmitValidate: function(t) {
      var e = this;
      if (!0 !== t.parsley) {
        var i = this._submitSource || this.$element.find(a._SubmitSelector)[0];
        if (this._submitSource = null, this.$element.find(".parsley-synthetic-submit-button").prop("disabled", !0), !i || null === i.getAttribute("formnovalidate")) {
          window.Parsley._remoteCache = {};
          var s = this.whenValidate({
            event: t
          });
          "resolved" === s.state() && !1 !== this._trigger("submit") || (t.stopImmediatePropagation(), t.preventDefault(), "pending" === s.state() && s.done(function() {
            e._submit(i)
          }))
        }
      }
    },
    onSubmitButton: function(t) {
      this._submitSource = t.currentTarget
    },
    _submit: function(e) {
      if (!1 !== this._trigger("submit")) {
        if (e) {
          var i = this.$element.find(".parsley-synthetic-submit-button").prop("disabled", !1);
          0 === i.length && (i = t('<input class="parsley-synthetic-submit-button" type="hidden">').appendTo(this.$element)), i.attr({
            name: e.getAttribute("name"),
            value: e.getAttribute("value")
          })
        }
        this.$element.trigger(_extends(t.Event("submit"), {
          parsley: !0
        }))
      }
    },
    validate: function(e) {
      if (arguments.length >= 1 && !t.isPlainObject(e)) {
        a.warnOnce("Calling validate on a parsley form without passing arguments as an object is deprecated.");
        var i = _slice.call(arguments);
        e = {
          group: i[0],
          force: i[1],
          event: i[2]
        }
      }
      return b[this.whenValidate(e).state()]
    },
    whenValidate: function() {
      var e, i = this,
        s = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
        r = s.group,
        n = s.force,
        o = s.event;
      this.submitEvent = o, o && (this.submitEvent = _extends({}, o, {
        preventDefault: function() {
          a.warnOnce("Using `this.submitEvent.preventDefault()` is deprecated; instead, call `this.validationResult = false`"), i.validationResult = !1
        }
      })), this.validationResult = !0, this._trigger("validate"), this._refreshFields();
      var l = this._withoutReactualizingFormOptions(function() {
        return t.map(i.fields, function(t) {
          return t.whenValidate({
            force: n,
            group: r
          })
        })
      });
      return (e = a.all(l).done(function() {
        i._trigger("success")
      }).fail(function() {
        i.validationResult = !1, i.focus(), i._trigger("error")
      }).always(function() {
        i._trigger("validated")
      })).pipe.apply(e, _toConsumableArray(this._pipeAccordingToValidationResult()))
    },
    isValid: function(e) {
      if (arguments.length >= 1 && !t.isPlainObject(e)) {
        a.warnOnce("Calling isValid on a parsley form without passing arguments as an object is deprecated.");
        var i = _slice.call(arguments);
        e = {
          group: i[0],
          force: i[1]
        }
      }
      return b[this.whenValid(e).state()]
    },
    whenValid: function() {
      var e = this,
        i = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
        s = i.group,
        r = i.force;
      this._refreshFields();
      var n = this._withoutReactualizingFormOptions(function() {
        return t.map(e.fields, function(t) {
          return t.whenValid({
            group: s,
            force: r
          })
        })
      });
      return a.all(n)
    },
    reset: function() {
      for (var t = 0; t < this.fields.length; t++) this.fields[t].reset();
      this._trigger("reset")
    },
    destroy: function() {
      this._destroyUI();
      for (var t = 0; t < this.fields.length; t++) this.fields[t].destroy();
      this.$element.removeData("Parsley"), this._trigger("destroy")
    },
    _refreshFields: function() {
      return this.actualizeOptions()._bindFields()
    },
    _bindFields: function() {
      var e = this,
        i = this.fields;
      return this.fields = [], this.fieldsMappedById = {}, this._withoutReactualizingFormOptions(function() {
        e.$element.find(e.options.inputs).not(e.options.excluded).each(function(t, i) {
          var s = new window.Parsley.Factory(i, {}, e);
          if (("Field" === s.__class__ || "FieldMultiple" === s.__class__) && !0 !== s.options.excluded) {
            var r = s.__class__ + "-" + s.__id__;
            "undefined" == typeof e.fieldsMappedById[r] && (e.fieldsMappedById[r] = s, e.fields.push(s))
          }
        }), t.each(a.difference(i, e.fields), function(t, e) {
          e.reset()
        })
      }), this
    },
    _withoutReactualizingFormOptions: function(t) {
      var e = this.actualizeOptions;
      this.actualizeOptions = function() {
        return this
      };
      var i = t();
      return this.actualizeOptions = e, i
    },
    _trigger: function(t) {
      return this.trigger("form:" + t)
    }
  };
  var w = function(t, e, i, s, r) {
      var n = window.Parsley._validatorRegistry.validators[e],
        a = new c(n);
      s = s || t.options[e + "Priority"] || a.priority, r = !0 === r, _extends(this, {
        validator: a,
        name: e,
        requirements: i,
        priority: s,
        isDomConstraint: r
      }), this._parseRequirements(t.options)
    },
    F = function(t) {
      return t[0].toUpperCase() + t.slice(1)
    };
  w.prototype = {
    validate: function(t, e) {
      var i;
      return (i = this.validator).validate.apply(i, [t].concat(_toConsumableArray(this.requirementList), [e]))
    },
    _parseRequirements: function(t) {
      var e = this;
      this.requirementList = this.validator.parseRequirements(this.requirements, function(i) {
        return t[e.name + F(i)]
      })
    }
  };
  var C = function(e, i, s, r) {
      this.__class__ = "Field", this.element = e, this.$element = t(e), void 0 !== r && (this.parent = r), this.options = s, this.domOptions = i, this.constraints = [], this.constraintsByName = {}, this.validationResult = !0, this._bindConstraints()
    },
    k = {
      pending: null,
      resolved: !0,
      rejected: !1
    };
  C.prototype = {
    validate: function(e) {
      arguments.length >= 1 && !t.isPlainObject(e) && (a.warnOnce("Calling validate on a parsley field without passing arguments as an object is deprecated."), e = {
        options: e
      });
      var i = this.whenValidate(e);
      if (!i) return !0;
      switch (i.state()) {
        case "pending":
          return null;
        case "resolved":
          return !0;
        case "rejected":
          return this.validationResult
      }
    },
    whenValidate: function() {
      var t, e = this,
        i = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
        s = i.force,
        r = i.group;
      if (this.refreshConstraints(), !r || this._isInGroup(r)) return this.value = this.getValue(), this._trigger("validate"), (t = this.whenValid({
        force: s,
        value: this.value,
        _refreshed: !0
      }).always(function() {
        e._reflowUI()
      }).done(function() {
        e._trigger("success")
      }).fail(function() {
        e._trigger("error")
      }).always(function() {
        e._trigger("validated")
      })).pipe.apply(t, _toConsumableArray(this._pipeAccordingToValidationResult()))
    },
    hasConstraints: function() {
      return 0 !== this.constraints.length
    },
    needsValidation: function(t) {
      return void 0 === t && (t = this.getValue()), !(!t.length && !this._isRequired() && "undefined" == typeof this.options.validateIfEmpty)
    },
    _isInGroup: function(e) {
      return Array.isArray(this.options.group) ? -1 !== t.inArray(e, this.options.group) : this.options.group === e
    },
    isValid: function(e) {
      if (arguments.length >= 1 && !t.isPlainObject(e)) {
        a.warnOnce("Calling isValid on a parsley field without passing arguments as an object is deprecated.");
        var i = _slice.call(arguments);
        e = {
          force: i[0],
          value: i[1]
        }
      }
      var s = this.whenValid(e);
      return !s || k[s.state()]
    },
    whenValid: function() {
      var e = this,
        i = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
        s = i.force,
        r = void 0 !== s && s,
        n = i.value,
        o = i.group;
      if (i._refreshed || this.refreshConstraints(), !o || this._isInGroup(o)) {
        if (this.validationResult = !0, !this.hasConstraints()) return t.when();
        if (void 0 !== n && null !== n || (n = this.getValue()), !this.needsValidation(n) && !0 !== r) return t.when();
        var l = this._getGroupedConstraints(),
          h = [];
        return t.each(l, function(i, s) {
          var r = a.all(t.map(s, function(t) {
            return e._validateConstraint(n, t)
          }));
          if (h.push(r), "rejected" === r.state()) return !1
        }), a.all(h)
      }
    },
    _validateConstraint: function(e, i) {
      var s = this,
        r = i.validate(e, this);
      return !1 === r && (r = t.Deferred().reject()), a.all([r]).fail(function(t) {
        s.validationResult instanceof Array || (s.validationResult = []), s.validationResult.push({
          assert: i,
          errorMessage: "string" == typeof t && t
        })
      })
    },
    getValue: function() {
      var t;
      return t = "function" == typeof this.options.value ? this.options.value(this) : "undefined" != typeof this.options.value ? this.options.value : this.$element.val(), void 0 === t || null === t ? "" : this._handleWhitespace(t)
    },
    reset: function() {
      return this._resetUI(), this._trigger("reset")
    },
    destroy: function() {
      this._destroyUI(), this.$element.removeData("Parsley"), this.$element.removeData("FieldMultiple"), this._trigger("destroy")
    },
    refreshConstraints: function() {
      return this.actualizeOptions()._bindConstraints()
    },
    addConstraint: function(t, e, i, s) {
      if (window.Parsley._validatorRegistry.validators[t]) {
        var r = new w(this, t, e, i, s);
        "undefined" !== this.constraintsByName[r.name] && this.removeConstraint(r.name), this.constraints.push(r), this.constraintsByName[r.name] = r
      }
      return this
    },
    removeConstraint: function(t) {
      for (var e = 0; e < this.constraints.length; e++)
        if (t === this.constraints[e].name) {
          this.constraints.splice(e, 1);
          break
        }
      return delete this.constraintsByName[t], this
    },
    updateConstraint: function(t, e, i) {
      return this.removeConstraint(t).addConstraint(t, e, i)
    },
    _bindConstraints: function() {
      for (var t = [], e = {}, i = 0; i < this.constraints.length; i++) !1 === this.constraints[i].isDomConstraint && (t.push(this.constraints[i]), e[this.constraints[i].name] = this.constraints[i]);
      this.constraints = t, this.constraintsByName = e;
      for (var s in this.options) this.addConstraint(s, this.options[s], void 0, !0);
      return this._bindHtml5Constraints()
    },
    _bindHtml5Constraints: function() {
      null !== this.element.getAttribute("required") && this.addConstraint("required", !0, void 0, !0), null !== this.element.getAttribute("pattern") && this.addConstraint("pattern", this.element.getAttribute("pattern"), void 0, !0);
      var t = this.element.getAttribute("min"),
        e = this.element.getAttribute("max");
      null !== t && null !== e ? this.addConstraint("range", [t, e], void 0, !0) : null !== t ? this.addConstraint("min", t, void 0, !0) : null !== e && this.addConstraint("max", e, void 0, !0), null !== this.element.getAttribute("minlength") && null !== this.element.getAttribute("maxlength") ? this.addConstraint("length", [this.element.getAttribute("minlength"), this.element.getAttribute("maxlength")], void 0, !0) : null !== this.element.getAttribute("minlength") ? this.addConstraint("minlength", this.element.getAttribute("minlength"), void 0, !0) : null !== this.element.getAttribute("maxlength") && this.addConstraint("maxlength", this.element.getAttribute("maxlength"), void 0, !0);
      var i = this.element.type;
      return "number" === i ? this.addConstraint("type", ["number", {
        step: this.element.getAttribute("step") || "1",
        base: t || this.element.getAttribute("value")
      }], void 0, !0) : /^(email|url|range|date)$/i.test(i) ? this.addConstraint("type", i, void 0, !0) : this
    },
    _isRequired: function() {
      return "undefined" != typeof this.constraintsByName.required && !1 !== this.constraintsByName.required.requirements
    },
    _trigger: function(t) {
      return this.trigger("field:" + t)
    },
    _handleWhitespace: function(t) {
      return !0 === this.options.trimValue && a.warnOnce('data-parsley-trim-value="true" is deprecated, please use data-parsley-whitespace="trim"'), "squish" === this.options.whitespace && (t = t.replace(/\s{2,}/g, " ")), "trim" !== this.options.whitespace && "squish" !== this.options.whitespace && !0 !== this.options.trimValue || (t = a.trimString(t)), t
    },
    _isDateInput: function() {
      var t = this.constraintsByName.type;
      return t && "date" === t.requirements
    },
    _getGroupedConstraints: function() {
      if (!1 === this.options.priorityEnabled) return [this.constraints];
      for (var t = [], e = {}, i = 0; i < this.constraints.length; i++) {
        var s = this.constraints[i].priority;
        e[s] || t.push(e[s] = []), e[s].push(this.constraints[i])
      }
      return t.sort(function(t, e) {
        return e[0].priority - t[0].priority
      }), t
    }
  };
  var P = C,
    S = function() {
      this.__class__ = "FieldMultiple"
    };
  S.prototype = {
    addElement: function(t) {
      return this.$elements.push(t), this
    },
    refreshConstraints: function() {
      var e;
      if (this.constraints = [], "SELECT" === this.element.nodeName) return this.actualizeOptions()._bindConstraints(), this;
      for (var i = 0; i < this.$elements.length; i++)
        if (t("html").has(this.$elements[i]).length) {
          e = this.$elements[i].data("FieldMultiple").refreshConstraints().constraints;
          for (var s = 0; s < e.length; s++) this.addConstraint(e[s].name, e[s].requirements, e[s].priority, e[s].isDomConstraint)
        } else this.$elements.splice(i, 1);
      return this
    },
    getValue: function() {
      if ("function" == typeof this.options.value) return this.options.value(this);
      if ("undefined" != typeof this.options.value) return this.options.value;
      if ("INPUT" === this.element.nodeName) {
        if ("radio" === this.element.type) return this._findRelated().filter(":checked").val() || "";
        if ("checkbox" === this.element.type) {
          var e = [];
          return this._findRelated().filter(":checked").each(function() {
            e.push(t(this).val())
          }), e
        }
      }
      return "SELECT" === this.element.nodeName && null === this.$element.val() ? [] : this.$element.val()
    },
    _init: function() {
      return this.$elements = [this.$element], this
    }
  };
  var M = function(e, i, s) {
    this.element = e, this.$element = t(e);
    var r = this.$element.data("Parsley");
    if (r) return void 0 !== s && r.parent === window.Parsley && (r.parent = s, r._resetOptions(r.options)), "object" == typeof i && _extends(r.options, i), r;
    if (!this.$element.length) throw new Error("You must bind Parsley on an existing element.");
    if (void 0 !== s && "Form" !== s.__class__) throw new Error("Parent instance must be a Form instance");
    return this.parent = s || window.Parsley, this.init(i)
  };
  M.prototype = {
    init: function(t) {
      return this.__class__ = "Parsley", this.__version__ = "2.7.2", this.__id__ = a.generateID(), this._resetOptions(t), "FORM" === this.element.nodeName || a.checkAttr(this.element, this.options.namespace, "validate") && !this.$element.is(this.options.inputs) ? this.bind("parsleyForm") : this.isMultiple() ? this.handleMultiple() : this.bind("parsleyField")
    },
    isMultiple: function() {
      return "radio" === this.element.type || "checkbox" === this.element.type || "SELECT" === this.element.nodeName && null !== this.element.getAttribute("multiple")
    },
    handleMultiple: function() {
      var e, i, s = this;
      if (this.options.multiple = this.options.multiple || (e = this.element.getAttribute("name")) || this.element.getAttribute("id"), "SELECT" === this.element.nodeName && null !== this.element.getAttribute("multiple")) return this.options.multiple = this.options.multiple || this.__id__, this.bind("parsleyFieldMultiple");
      if (!this.options.multiple) return a.warn("To be bound by Parsley, a radio, a checkbox and a multiple select input must have either a name or a multiple option.", this.$element), this;
      this.options.multiple = this.options.multiple.replace(/(:|\.|\[|\]|\{|\}|\$)/g, ""), e && t('input[name="' + e + '"]').each(function(t, e) {
        "radio" !== e.type && "checkbox" !== e.type || e.setAttribute(s.options.namespace + "multiple", s.options.multiple)
      });
      for (var r = this._findRelated(), n = 0; n < r.length; n++)
        if (void 0 !== (i = t(r.get(n)).data("Parsley"))) {
          this.$element.data("FieldMultiple") || i.addElement(this.$element);
          break
        }
      return this.bind("parsleyField", !0), i || this.bind("parsleyFieldMultiple")
    },
    bind: function(e, i) {
      var s;
      switch (e) {
        case "parsleyForm":
          s = t.extend(new v(this.element, this.domOptions, this.options), new l, window.ParsleyExtend)._bindFields();
          break;
        case "parsleyField":
          s = t.extend(new P(this.element, this.domOptions, this.options, this.parent), new l, window.ParsleyExtend);
          break;
        case "parsleyFieldMultiple":
          s = t.extend(new P(this.element, this.domOptions, this.options, this.parent), new S, new l, window.ParsleyExtend)._init();
          break;
        default:
          throw new Error(e + "is not a supported Parsley type")
      }
      return this.options.multiple && a.setAttr(this.element, this.options.namespace, "multiple", this.options.multiple), void 0 !== i ? (this.$element.data("FieldMultiple", s), s) : (this.$element.data("Parsley", s), s._actualizeTriggers(), s._trigger("init"), s)
    }
  };
  var A = t.fn.jquery.split(".");
  if (parseInt(A[0]) <= 1 && parseInt(A[1]) < 8) throw "The loaded version of jQuery is too old. Please upgrade to 1.8.x or better.";
  A.forEach || a.warn("Parsley requires ES5 to run properly. Please include https://github.com/es-shims/es5-shim");
  var T = _extends(new l, {
    element: document,
    $element: t(document),
    actualizeOptions: null,
    _resetOptions: null,
    Factory: M,
    version: "2.7.2"
  });
  _extends(P.prototype, y.Field, l.prototype), _extends(v.prototype, y.Form, l.prototype), _extends(M.prototype, l.prototype), t.fn.parsley = t.fn.psly = function(e) {
    if (this.length > 1) {
      var i = [];
      return this.each(function() {
        i.push(t(this).parsley(e))
      }), i
    }
    return t(this).length ? new M(this[0], e) : void a.warn("You must bind Parsley on an existing element.")
  }, "undefined" == typeof window.ParsleyExtend && (window.ParsleyExtend = {}), T.options = _extends(a.objectCreate(o), window.ParsleyConfig), window.ParsleyConfig = T.options, window.Parsley = window.psly = T, T.Utils = a, window.ParsleyUtils = {}, t.each(a, function(t, e) {
    "function" == typeof e && (window.ParsleyUtils[t] = function() {
      return a.warnOnce("Accessing `window.ParsleyUtils` is deprecated. Use `window.Parsley.Utils` instead."), a[t].apply(a, arguments)
    })
  });
  var E = window.Parsley._validatorRegistry = new d(window.ParsleyConfig.validators, window.ParsleyConfig.i18n);
  window.ParsleyValidator = {}, t.each("setLocale addCatalog addMessage addMessages getErrorMessage formatMessage addValidator updateValidator removeValidator".split(" "), function(t, e) {
    window.Parsley[e] = function() {
      return E[e].apply(E, arguments)
    }, window.ParsleyValidator[e] = function() {
      var t;
      return a.warnOnce("Accessing the method '" + e + "' through Validator is deprecated. Simply call 'window.Parsley." + e + "(...)'"), (t = window.Parsley)[e].apply(t, arguments)
    }
  }), window.Parsley.UI = y, window.ParsleyUI = {
    removeError: function(t, e, i) {
      var s = !0 !== i;
      return a.warnOnce("Accessing UI is deprecated. Call 'removeError' on the instance directly. Please comment in issue 1073 as to your need to call this method."), t.removeError(e, {
        updateClass: s
      })
    },
    getErrorsMessages: function(t) {
      return a.warnOnce("Accessing UI is deprecated. Call 'getErrorsMessages' on the instance directly."), t.getErrorsMessages()
    }
  }, t.each("addError updateError".split(" "), function(t, e) {
    window.ParsleyUI[e] = function(t, i, s, r, n) {
      var o = !0 !== n;
      return a.warnOnce("Accessing UI is deprecated. Call '" + e + "' on the instance directly. Please comment in issue 1073 as to your need to call this method."), t[e](i, {
        message: s,
        assert: r,
        updateClass: o
      })
    }
  }), !1 !== window.ParsleyConfig.autoBind && t(function() {
    t("[data-parsley-validate]").length && t("[data-parsley-validate]").parsley()
  });
  var O = t({}),
    L = function() {
      a.warnOnce("Parsley's pubsub module is deprecated; use the 'on' and 'off' methods on parsley instances or window.Parsley")
    },
    V = "parsley:";
  return t.listen = function(t, s) {
    var r;
    if (L(), "object" == typeof arguments[1] && "function" == typeof arguments[2] && (r = arguments[1], s = arguments[2]), "function" != typeof s) throw new Error("Wrong parameters");
    window.Parsley.on(i(t), e(s, r))
  }, t.listenTo = function(t, s, r) {
    if (L(), !(t instanceof P || t instanceof v)) throw new Error("Must give Parsley instance");
    if ("string" != typeof s || "function" != typeof r) throw new Error("Wrong parameters");
    t.on(i(s), e(r))
  }, t.unsubscribe = function(t, e) {
    if (L(), "string" != typeof t || "function" != typeof e) throw new Error("Wrong arguments");
    window.Parsley.off(i(t), e.parsleyAdaptedCallback)
  }, t.unsubscribeTo = function(t, e) {
    if (L(), !(t instanceof P || t instanceof v)) throw new Error("Must give Parsley instance");
    t.off(i(e))
  }, t.unsubscribeAll = function(e) {
    L(), window.Parsley.off(i(e)), t("form,input,textarea,select").each(function() {
      var s = t(this).data("Parsley");
      s && s.off(i(e))
    })
  }, t.emit = function(t, e) {
    var s;
    L();
    var r = e instanceof P || e instanceof v,
      n = Array.prototype.slice.call(arguments, r ? 2 : 1);
    n.unshift(i(t)), r || (e = window.Parsley), (s = e).trigger.apply(s, _toConsumableArray(n))
  }, t.extend(!0, T, {
    asyncValidators: {
      "default": {
        fn: function(t) {
          return t.status >= 200 && t.status < 300
        },
        url: !1
      },
      reverse: {
        fn: function(t) {
          return t.status < 200 || t.status >= 300
        },
        url: !1
      }
    },
    addAsyncValidator: function(t, e, i, s) {
      return T.asyncValidators[t] = {
        fn: e,
        url: i || !1,
        options: s || {}
      }, this
    }
  }), T.addValidator("remote", {
    requirementType: {
      "": "string",
      validator: "string",
      reverse: "boolean",
      options: "object"
    },
    validateString: function(e, i, s, r) {
      var n, a, o = {},
        l = s.validator || (!0 === s.reverse ? "reverse" : "default");
      if ("undefined" == typeof T.asyncValidators[l]) throw new Error("Calling an undefined async validator: `" + l + "`");
      i = T.asyncValidators[l].url || i, i.indexOf("{value}") > -1 ? i = i.replace("{value}", encodeURIComponent(e)) : o[r.element.getAttribute("name") || r.element.getAttribute("id")] = e;
      var h = t.extend(!0, s.options || {}, T.asyncValidators[l].options);
      n = t.extend(!0, {}, {
        url: i,
        data: o,
        type: "GET"
      }, h), r.trigger("field:ajaxoptions", r, n), a = t.param(n), "undefined" == typeof T._remoteCache && (T._remoteCache = {});
      var u = T._remoteCache[a] = T._remoteCache[a] || t.ajax(n),
        c = function() {
          var e = T.asyncValidators[l].fn.call(r, u, i, s);
          return e || (e = t.Deferred().reject()), t.when(e)
        };
      return u.then(c, c)
    },
    priority: -1
  }), T.on("form:submit", function() {
    T._remoteCache = {}
  }), l.prototype.addAsyncValidator = function() {
    return a.warnOnce("Accessing the method `addAsyncValidator` through an instance is deprecated. Simply call `Parsley.addAsyncValidator(...)`"), T.addAsyncValidator.apply(T, arguments)
  }, T.addMessages("en", {
    defaultMessage: "This value seems to be invalid.",
    type: {
      email: "This value should be a valid email.",
      url: "This value should be a valid url.",
      number: "This value should be a valid number.",
      integer: "This value should be a valid integer.",
      digits: "This value should be digits.",
      alphanum: "This value should be alphanumeric."
    },
    notblank: "This value should not be blank.",
    required: "This value is required.",
    pattern: "This value seems to be invalid.",
    min: "This value should be greater than or equal to %s.",
    max: "This value should be lower than or equal to %s.",
    range: "This value should be between %s and %s.",
    minlength: "This value is too short. It should have %s characters or more.",
    maxlength: "This value is too long. It should have %s characters or fewer.",
    length: "This value length is invalid. It should be between %s and %s characters long.",
    mincheck: "You must select at least %s choices.",
    maxcheck: "You must select %s choices or fewer.",
    check: "You must select between %s and %s choices.",
    equalto: "This value should be the same."
  }), T.setLocale("en"), (new s).install(), T
}), $(document).ready(function() {
      function t() {
        Typed["new"]("#intro-end", {
          strings: ["understand cause and effect.", "extract decision making insight.", "help machines learn.", "make the world a better place."],
          backDelay: 1500,
          typeSpeed: 0,
          backSpeed: 0,
          callback: function() {
            $(".hm-item").addClass("animated pulse")
          }
        })
      }
      $(function() {
          $("#typed-intro").typed({
            stringsElement: document.getElementById("typed-strings"),
            startDelay: 2e3,
            typeSpeed: 0,
            callback: function() {
              $(".typed-cursor").hide(), t()
            }
          })
        }), $(".back-to-top i").click(function() {
          $("body,html").animate({
            scrollTop: 0
          }, 2e3)
        }), $("#skillsAn").animatedModal({
            modalTarget: "skillsModal",
            color: "#202020",
            animatedIn: "slideInDown",
            animatedOut: "slideOutUp",
            overflow: "hidden",
            afterOpen:
