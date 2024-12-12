var I = Object.defineProperty;
var P = (n, o, t) => o in n ? I(n, o, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[o] = t;
var a = (n, o, t) => P(n, typeof o != "symbol" ? o + "" : o, t);
import D from "react-dom";
import * as s from "react";
import { useTransition as k, animated as T } from "react-spring";
function L(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var c = {}, _;
function M() {
  if (_) return c;
  _ = 1;
  var n = D;
  if (process.env.NODE_ENV === "production")
    c.createRoot = n.createRoot, c.hydrateRoot = n.hydrateRoot;
  else {
    var o = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    c.createRoot = function(t, e) {
      o.usingClientEntryPoint = !0;
      try {
        return n.createRoot(t, e);
      } finally {
        o.usingClientEntryPoint = !1;
      }
    }, c.hydrateRoot = function(t, e, r) {
      o.usingClientEntryPoint = !0;
      try {
        return n.hydrateRoot(t, e, r);
      } finally {
        o.usingClientEntryPoint = !1;
      }
    };
  }
  return c;
}
var j = M();
const q = /* @__PURE__ */ L(j), B = ({ id: n, title: o, onClose: t, close: e }) => /* @__PURE__ */ s.createElement("div", { id: n, className: "Toaster__alert" }, typeof o == "string" ? /* @__PURE__ */ s.createElement("div", { className: "Toaster__alert_text" }, o) : s.cloneElement(o, { onClose: t }), t && e && /* @__PURE__ */ s.createElement(F, { onClose: t })), F = ({ onClose: n }) => /* @__PURE__ */ s.createElement("button", { className: "Toaster__alert_close", type: "button", "aria-label": "Close", onClick: n }, "X");
function Y(n, o) {
  const t = s.useRef();
  s.useEffect(() => {
    t.current = n;
  }, [n]), s.useEffect(() => {
    function e() {
      t.current && t.current();
    }
    if (o !== null) {
      let r = setTimeout(e, o);
      return () => clearTimeout(r);
    }
  }, [o]);
}
const K = {
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
}, U = ({
  id: n,
  message: o,
  position: t,
  onRequestRemove: e,
  requestClose: r = !1,
  duration: i = 3e4,
  onClose: f = !0
}) => {
  const l = s.useRef(null), [b, p] = s.useState(i), [g, E] = s.useState(!0), v = t === "top-left" || t === "top-right" || t === "top";
  Y(m, b);
  const N = k(g, null, {
    config: { mass: 1, tension: 185, friction: 26 },
    from: {
      opacity: 1,
      height: 0,
      transform: `translateY(${v ? "-100%" : 0}) scale(1)`
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
    onRest: w
  }), S = s.useMemo(() => $(t), [t]);
  function C() {
    p(null);
  }
  function O() {
    p(i);
  }
  function w() {
    g || e();
  }
  function m() {
    E(!1);
  }
  s.useEffect(() => {
    r && E(!1);
  }, [r]);
  function x() {
    return typeof o == "string" || s.isValidElement(o) ? /* @__PURE__ */ s.createElement(B, { id: n, title: o, onClose: m, close: f }) : typeof o == "function" ? o({
      id: n,
      onClose: m
    }) : null;
  }
  return /* @__PURE__ */ s.createElement(s.Fragment, null, N.map(
    ({ key: d, item: A, props: h }) => A && /* @__PURE__ */ s.createElement(
      T.div,
      {
        key: d,
        className: "Toaster__message",
        onMouseEnter: C,
        onMouseLeave: O,
        style: {
          opacity: h.opacity,
          height: h.height,
          ...S
        }
      },
      /* @__PURE__ */ s.createElement(
        T.div,
        {
          style: {
            transform: h.transform,
            pointerEvents: "auto"
          },
          ref: l,
          className: "Toaster__message-wrapper"
        },
        x()
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
}, u = class u extends s.Component {
  constructor(t) {
    super(t);
    a(this, "state", V);
    a(this, "notify", (t, e) => {
      const r = this.createToastState(t, e), { position: i } = r, f = i.includes("top");
      return this.setState((l) => ({
        ...l,
        [i]: f ? [r, ...l[i]] : [...l[i], r]
      })), { id: r.id, position: r.position };
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
      const r = ++u.idCounter, i = e.hasOwnProperty("position") && typeof e.position == "string" ? e.position : "top";
      return {
        id: r,
        message: t,
        position: i,
        showing: !0,
        duration: typeof e.duration > "u" ? 5e3 : e.duration,
        onRequestRemove: () => this.removeToast(String(r), i),
        type: e.type,
        onClose: e.close
      };
    });
    a(this, "closeToast", (t, e) => {
      this.setState((r) => ({
        ...r,
        [e]: r[e].map((i) => i.id !== t ? i : {
          ...i,
          requestClose: !0
        })
      }));
    });
    // actually fully remove the toast
    a(this, "removeToast", (t, e) => {
      this.setState((r) => ({
        ...r,
        [e]: r[e].filter((i) => i.id !== t)
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
      const e = t, r = this.state[e];
      return /* @__PURE__ */ s.createElement("span", { key: t, className: "Toaster__manager-" + e, style: this.getStyle(e) }, r.map((i) => /* @__PURE__ */ s.createElement(U, { position: e, key: i.id, ...i })));
    });
  }
};
a(u, "idCounter", 0);
let y = u;
const W = typeof window < "u" && typeof window.document < "u", R = "toast";
class z {
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
    const t = document.getElementById(R);
    if (t)
      o = t;
    else {
      const r = document.createElement("div");
      r.id = R, r.className = "Toaster", document.body != null && document.body.appendChild(r), o = r;
    }
    q.createRoot(o).render(/* @__PURE__ */ s.createElement(y, { notify: this.bindNotify }));
  }
}
const Q = new z();
export {
  K as Position,
  Q as default
};
