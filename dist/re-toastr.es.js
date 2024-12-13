var I = Object.defineProperty;
var k = (n, o, t) => o in n ? I(n, o, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[o] = t;
var a = (n, o, t) => k(n, typeof o != "symbol" ? o + "" : o, t);
import P from "react-dom";
import * as r from "react";
import { useTransition as M, animated as T } from "react-spring";
function j(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var c = {}, b;
function q() {
  if (b) return c;
  b = 1;
  var n = P;
  return c.createRoot = n.createRoot, c.hydrateRoot = n.hydrateRoot, c;
}
var D = q();
const B = /* @__PURE__ */ j(D), F = ({ id: n, title: o, onClose: t, close: e }) => /* @__PURE__ */ r.createElement("div", { id: n, className: "Toaster__alert" }, typeof o == "string" ? /* @__PURE__ */ r.createElement("div", { className: "Toaster__alert_text" }, o) : r.cloneElement(o, { onClose: t }), t && e && /* @__PURE__ */ r.createElement(L, { onClose: t })), L = ({ onClose: n }) => /* @__PURE__ */ r.createElement("button", { className: "Toaster__alert_close", type: "button", "aria-label": "Close", onClick: n }, "X");
function Y(n, o) {
  const t = r.useRef();
  r.useEffect(() => {
    t.current = n;
  }, [n]), r.useEffect(() => {
    function e() {
      t.current && t.current();
    }
    if (o !== null) {
      let s = setTimeout(e, o);
      return () => clearTimeout(s);
    }
  }, [o]);
}
const Q = {
  top: "top",
  "top-left": "top-left",
  "top-right": "top-right",
  bottom: "bottom",
  "bottom-left": "bottom-left",
  "bottom-right": "bottom-right"
}, $ = (n) => {
  let o = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  };
  return n.includes("right") ? o.alignItems = "flex-end" : n.includes("left") && (o.alignItems = "flex-start"), o;
}, z = ({
  id: n,
  message: o,
  position: t,
  onRequestRemove: e,
  requestClose: s = !1,
  duration: i = 3e4,
  onClose: f = !0
}) => {
  const l = r.useRef(null), [S, y] = r.useState(i), [g, E] = r.useState(!0), R = t === "top-left" || t === "top-right" || t === "top";
  Y(m, S);
  const _ = M(g, null, {
    config: { mass: 1, tension: 185, friction: 26 },
    from: {
      opacity: 1,
      height: 0,
      transform: `translateY(${R ? "-100%" : 0}) scale(1)`
    },
    enter: () => (d) => d({
      opacity: 1,
      height: l.current.getBoundingClientRect().height,
      transform: "translateY(0) scale(1)"
    }),
    leave: {
      opacity: 0,
      height: 0,
      transform: "translateY(0 scale(0.9)"
    },
    onRest: x
  }), N = r.useMemo(() => $(t), [t]);
  function C() {
    y(null);
  }
  function w() {
    y(i);
  }
  function x() {
    g || e();
  }
  function m() {
    E(!1);
  }
  r.useEffect(() => {
    s && E(!1);
  }, [s]);
  function A() {
    return typeof o == "string" || r.isValidElement(o) ? /* @__PURE__ */ r.createElement(F, { id: n, title: o, onClose: m, close: f }) : typeof o == "function" ? o({
      id: n,
      onClose: m
    }) : null;
  }
  return /* @__PURE__ */ r.createElement(r.Fragment, null, _.map(
    ({ key: d, item: O, props: h }) => O && /* @__PURE__ */ r.createElement(
      T.div,
      {
        key: d,
        className: "Toaster__message",
        onMouseEnter: C,
        onMouseLeave: w,
        style: {
          opacity: h.opacity,
          height: h.height,
          ...N
        }
      },
      /* @__PURE__ */ r.createElement(
        T.div,
        {
          style: {
            transform: h.transform,
            pointerEvents: "auto"
          },
          ref: l,
          className: "Toaster__message-wrapper"
        },
        A()
      )
    )
  ));
}, V = {
  top: [],
  "top-left": [],
  "top-right": [],
  "bottom-left": [],
  bottom: [],
  "bottom-right": []
}, u = class u extends r.Component {
  constructor(t) {
    super(t);
    a(this, "state", V);
    a(this, "notify", (t, e) => {
      const s = this.createToastState(t, e), { position: i } = s, f = i.includes("top");
      return this.setState((l) => ({
        ...l,
        [i]: f ? [s, ...l[i]] : [...l[i], s]
      })), { id: s.id, position: s.position };
    });
    a(this, "closeAll", () => {
      Object.keys(this.state).forEach((t) => {
        const e = t;
        this.state[e].forEach((i) => {
          this.closeToast(i.id, e);
        });
      });
    });
    a(this, "createToastState", (t, e) => {
      const s = ++u.idCounter, i = e.hasOwnProperty("position") && typeof e.position == "string" ? e.position : "top";
      return {
        id: s,
        message: t,
        position: i,
        showing: !0,
        duration: typeof e.duration > "u" ? 5e3 : e.duration,
        onRequestRemove: () => this.removeToast(String(s), i),
        type: e.type,
        onClose: e.close
      };
    });
    a(this, "closeToast", (t, e) => {
      this.setState((s) => ({
        ...s,
        [e]: s[e].map((i) => i.id !== t ? i : {
          ...i,
          requestClose: !0
        })
      }));
    });
    // actually fully remove the toast
    a(this, "removeToast", (t, e) => {
      this.setState((s) => ({
        ...s,
        [e]: s[e].filter((i) => i.id !== t)
      }));
    });
    a(this, "getStyle", (t) => {
      let e = {
        maxWidth: "560px",
        position: "fixed",
        zIndex: 105500,
        pointerEvents: "none"
      };
      return (t === "top" || t === "bottom") && (e.margin = "0 auto", e.textAlign = "center"), t.includes("top") && (e.top = 0), t.includes("bottom") && (e.bottom = 0), t.includes("left") || (e.right = 0), t.includes("right") || (e.left = 0), e;
    });
    t.notify(this.notify, this.closeAll, this.closeToast);
  }
  render() {
    return Object.keys(this.state).map((t) => {
      const e = t, s = this.state[e];
      return /* @__PURE__ */ r.createElement("span", { key: t, className: "Toaster__manager-" + e, style: this.getStyle(e) }, s.map((i) => /* @__PURE__ */ r.createElement(z, { position: e, key: i.id, ...i })));
    });
  }
};
a(u, "idCounter", 0);
let p = u;
const W = typeof window < "u" && typeof window.document < "u", v = "toast";
class X {
  constructor() {
    a(this, "createNotification", () => {
    });
    a(this, "removeAll", () => {
    });
    a(this, "closeToast", () => {
    });
    a(this, "closeAll", () => {
      this.removeAll && this.removeAll();
    });
    a(this, "bindNotify", (o, t, e) => {
      this.createNotification = o, this.removeAll = t, this.closeToast = e;
    });
    a(this, "notify", (o, t = {}) => {
      if (this.createNotification)
        return this.createNotification(o, t);
    });
    a(this, "close", (o, t) => {
      this.closeToast && this.closeToast(o, t);
    });
    if (!W)
      return;
    let o;
    const t = document.getElementById(v);
    if (t)
      o = t;
    else {
      const s = document.createElement("div");
      s.id = v, s.className = "Toaster", document.body != null && document.body.appendChild(s), o = s;
    }
    B.createRoot(o).render(/* @__PURE__ */ r.createElement(p, { notify: this.bindNotify }));
  }
}
const U = new X();
export {
  Q as Position,
  U as default
};
