import { defineComponent as re, computed as O, createElementBlock as W, openBlock as K, normalizeClass as lt, createCommentVNode as fe, renderSlot as De, withModifiers as ot, toRef as x, resolveDynamicComponent as Re, h as ve, inject as Ue, toValue as g, unref as p, onMounted as ut, getCurrentInstance as H, provide as st, isRef as $e, watch as G, onBeforeUnmount as dt, onUnmounted as ct, ref as me, reactive as ft, nextTick as vt, createVNode as je, createTextVNode as mt, toDisplayString as ht, withCtx as yt, createElementVNode as pt, mergeProps as gt } from "vue";
const bt = ["type", "disabled"], Vt = {
  key: 0,
  class: "loading-spinner"
}, Ot = /* @__PURE__ */ re({
  __name: "BaseButton",
  props: {
    variant: { default: "primary" },
    size: { default: "md" },
    type: { default: "button" },
    disabled: { type: Boolean, default: !1 },
    loading: { type: Boolean, default: !1 },
    fullWidth: { type: Boolean, default: !1 }
  },
  emits: ["click"],
  setup(e, { emit: t }) {
    const n = e, r = t, a = O(() => [
      "base-button",
      `base-button--${n.variant}`,
      `base-button--${n.size}`,
      {
        "base-button--disabled": n.disabled,
        "base-button--loading": n.loading,
        "base-button--full-width": n.fullWidth
      }
    ]), i = (l) => {
      !n.disabled && !n.loading && r("click", l);
    };
    return (l, o) => (K(), W("button", {
      class: lt(a.value),
      type: l.type,
      disabled: l.disabled || l.loading,
      onClick: i
    }, [
      l.loading ? (K(), W("span", Vt)) : fe("", !0),
      De(l.$slots, "default", {}, void 0, !0)
    ], 10, bt));
  }
}), be = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [r, a] of t)
    n[r] = a;
  return n;
}, In = /* @__PURE__ */ be(Ot, [["__scopeId", "data-v-11bb8a41"]]), _t = /* @__PURE__ */ re({
  __name: "BaseForm",
  props: {
    initialValues: { default: () => ({}) },
    validationSchema: { default: void 0 },
    onSubmit: { type: Function, default: void 0 }
  },
  emits: ["submit", "error"],
  setup(e, { emit: t }) {
    const n = e, r = t, a = async (i) => {
      try {
        n.onSubmit && await n.onSubmit(i), r("submit", i);
      } catch (l) {
        r("error", l);
      }
    };
    return (i, l) => (K(), W("form", {
      class: "base-form",
      onSubmit: ot(a, ["prevent"])
    }, [
      De(i.$slots, "default", {}, void 0, !0)
    ], 32));
  }
}), Nn = /* @__PURE__ */ be(_t, [["__scopeId", "data-v-460a49bf"]]);
/**
  * vee-validate v4.15.1
  * (c) 2025 Abdelrahman Awad
  * @license MIT
  */
function B(e) {
  return typeof e == "function";
}
function St(e) {
  return e == null;
}
const J = (e) => e !== null && !!e && typeof e == "object" && !Array.isArray(e);
function ze(e) {
  return Number(e) >= 0;
}
function kt(e) {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}
function Ct(e) {
  const t = e.split(".");
  if (!t.length)
    return "";
  let n = String(t[0]);
  for (let r = 1; r < t.length; r++) {
    if (ze(t[r])) {
      n += `[${t[r]}]`;
      continue;
    }
    n += `.${t[r]}`;
  }
  return n;
}
const jt = {};
function At(e) {
  return jt[e];
}
function Ae(e, t, n) {
  typeof n.value == "object" && (n.value = z(n.value)), !n.enumerable || n.get || n.set || !n.configurable || !n.writable || t === "__proto__" ? Object.defineProperty(e, t, n) : e[t] = n.value;
}
function z(e) {
  if (typeof e != "object") return e;
  var t = 0, n, r, a, i = Object.prototype.toString.call(e);
  if (i === "[object Object]" ? a = Object.create(e.__proto__ || null) : i === "[object Array]" ? a = Array(e.length) : i === "[object Set]" ? (a = /* @__PURE__ */ new Set(), e.forEach(function(l) {
    a.add(z(l));
  })) : i === "[object Map]" ? (a = /* @__PURE__ */ new Map(), e.forEach(function(l, o) {
    a.set(z(o), z(l));
  })) : i === "[object Date]" ? a = /* @__PURE__ */ new Date(+e) : i === "[object RegExp]" ? a = new RegExp(e.source, e.flags) : i === "[object DataView]" ? a = new e.constructor(z(e.buffer)) : i === "[object ArrayBuffer]" ? a = e.slice(0) : i.slice(-6) === "Array]" && (a = new e.constructor(e)), a) {
    for (r = Object.getOwnPropertySymbols(e); t < r.length; t++)
      Ae(a, r[t], Object.getOwnPropertyDescriptor(e, r[t]));
    for (t = 0, r = Object.getOwnPropertyNames(e); t < r.length; t++)
      Object.hasOwnProperty.call(a, n = r[t]) && a[n] === e[n] || Ae(a, n, Object.getOwnPropertyDescriptor(e, n));
  }
  return a || e;
}
const Ve = Symbol("vee-validate-form"), It = Symbol("vee-validate-field-instance"), ue = Symbol("Default empty value"), Le = typeof window < "u";
function he(e) {
  return B(e) && !!e.__locatorRef;
}
function ee(e) {
  return !!e && B(e.parse) && e.__type === "VVTypedSchema";
}
function ye(e) {
  return !!e && B(e.validate);
}
function ae(e) {
  return e === "checkbox" || e === "radio";
}
function Nt(e) {
  return J(e) || Array.isArray(e);
}
function Oe(e) {
  return /^\[.+\]$/i.test(e);
}
function Et(e) {
  return qe(e) && e.multiple;
}
function qe(e) {
  return e.tagName === "SELECT";
}
function wt(e, t) {
  const n = ![!1, null, void 0, 0].includes(t.multiple) && !Number.isNaN(t.multiple);
  return e === "select" && "multiple" in t && n;
}
function Mt(e, t) {
  return !wt(e, t) && t.type !== "file" && !ae(t.type);
}
function Bt(e) {
  return e ? !!(typeof Event < "u" && B(Event) && e instanceof Event || e && e.srcElement) : !1;
}
function Ie(e, t) {
  return t in e && e[t] !== ue;
}
function w(e, t) {
  if (e === t)
    return !0;
  if (e && t && typeof e == "object" && typeof t == "object") {
    if (e.constructor !== t.constructor)
      return !1;
    var n, r, a;
    if (Array.isArray(e)) {
      if (n = e.length, n != t.length)
        return !1;
      for (r = n; r-- !== 0; )
        if (!w(e[r], t[r]))
          return !1;
      return !0;
    }
    if (e instanceof Map && t instanceof Map) {
      if (e.size !== t.size)
        return !1;
      for (r of e.entries())
        if (!t.has(r[0]))
          return !1;
      for (r of e.entries())
        if (!w(r[1], t.get(r[0])))
          return !1;
      return !0;
    }
    if (Ee(e) && Ee(t))
      return !(e.size !== t.size || e.name !== t.name || e.lastModified !== t.lastModified || e.type !== t.type);
    if (e instanceof Set && t instanceof Set) {
      if (e.size !== t.size)
        return !1;
      for (r of e.entries())
        if (!t.has(r[0]))
          return !1;
      return !0;
    }
    if (ArrayBuffer.isView(e) && ArrayBuffer.isView(t)) {
      if (n = e.length, n != t.length)
        return !1;
      for (r = n; r-- !== 0; )
        if (e[r] !== t[r])
          return !1;
      return !0;
    }
    if (e.constructor === RegExp)
      return e.source === t.source && e.flags === t.flags;
    if (e.valueOf !== Object.prototype.valueOf)
      return e.valueOf() === t.valueOf();
    if (e.toString !== Object.prototype.toString)
      return e.toString() === t.toString();
    if (e = Ne(e), t = Ne(t), a = Object.keys(e), n = a.length, n !== Object.keys(t).length)
      return !1;
    for (r = n; r-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(t, a[r]))
        return !1;
    for (r = n; r-- !== 0; ) {
      var i = a[r];
      if (!w(e[i], t[i]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function Ne(e) {
  return Object.fromEntries(Object.entries(e).filter(([, t]) => t !== void 0));
}
function Ee(e) {
  return Le ? e instanceof File : !1;
}
function We(e) {
  return Oe(e) ? e.replace(/\[|\]/gi, "") : e;
}
function Y(e, t, n) {
  return e ? Oe(t) ? e[We(t)] : (t || "").split(/\.|\[(\d+)\]/).filter(Boolean).reduce((a, i) => Nt(a) && i in a ? a[i] : n, e) : n;
}
function Ft(e, t, n) {
  if (Oe(t)) {
    e[We(t)] = n;
    return;
  }
  const r = t.split(/\.|\[(\d+)\]/).filter(Boolean);
  let a = e;
  for (let i = 0; i < r.length; i++) {
    if (i === r.length - 1) {
      a[r[i]] = n;
      return;
    }
    (!(r[i] in a) || St(a[r[i]])) && (a[r[i]] = ze(r[i + 1]) ? [] : {}), a = a[r[i]];
  }
}
function Ke(e) {
  return Object.keys(e);
}
function Ge(e, t = void 0) {
  const n = H();
  return (n == null ? void 0 : n.provides[e]) || Ue(e, t);
}
function we(e, t, n) {
  if (Array.isArray(e)) {
    const r = [...e], a = r.findIndex((i) => w(i, t));
    return a >= 0 ? r.splice(a, 1) : r.push(t), r;
  }
  return w(e, t) ? n : t;
}
function Pt(e, t) {
  let n, r;
  return function(...a) {
    const i = this;
    return n || (n = !0, setTimeout(() => n = !1, t), r = e.apply(i, a)), r;
  };
}
function Tt(e, t) {
  return J(t) && t.number ? kt(e) : e;
}
function Me(e, t) {
  let n;
  return async function(...a) {
    const i = e(...a);
    n = i;
    const l = await i;
    return i !== n ? l : (n = void 0, t(l, a));
  };
}
function Dt(e) {
  return Array.isArray(e) ? e : e ? [e] : [];
}
function He(e, t, n) {
  return t.slots.default ? typeof e == "string" || !e ? t.slots.default(n()) : {
    default: () => {
      var r, a;
      return (a = (r = t.slots).default) === null || a === void 0 ? void 0 : a.call(r, n());
    }
  } : t.slots.default;
}
function ce(e) {
  if (Je(e))
    return e._value;
}
function Je(e) {
  return "_value" in e;
}
function Rt(e) {
  return e.type === "number" || e.type === "range" ? Number.isNaN(e.valueAsNumber) ? e.value : e.valueAsNumber : e.value;
}
function Ye(e) {
  if (!Bt(e))
    return e;
  const t = e.target;
  if (ae(t.type) && Je(t))
    return ce(t);
  if (t.type === "file" && t.files) {
    const n = Array.from(t.files);
    return t.multiple ? n : n[0];
  }
  if (Et(t))
    return Array.from(t.options).filter((n) => n.selected && !n.disabled).map(ce);
  if (qe(t)) {
    const n = Array.from(t.options).find((r) => r.selected);
    return n ? ce(n) : t.value;
  }
  return Rt(t);
}
function Xe(e) {
  const t = {};
  return Object.defineProperty(t, "_$$isNormalized", {
    value: !0,
    writable: !1,
    enumerable: !1,
    configurable: !1
  }), e ? J(e) && e._$$isNormalized ? e : J(e) ? Object.keys(e).reduce((n, r) => {
    const a = Ut(e[r]);
    return e[r] !== !1 && (n[r] = Be(a)), n;
  }, t) : typeof e != "string" ? t : e.split("|").reduce((n, r) => {
    const a = $t(r);
    return a.name && (n[a.name] = Be(a.params)), n;
  }, t) : t;
}
function Ut(e) {
  return e === !0 ? [] : Array.isArray(e) || J(e) ? e : [e];
}
function Be(e) {
  const t = (n) => typeof n == "string" && n[0] === "@" ? zt(n.slice(1)) : n;
  return Array.isArray(e) ? e.map(t) : e instanceof RegExp ? [e] : Object.keys(e).reduce((n, r) => (n[r] = t(e[r]), n), {});
}
const $t = (e) => {
  let t = [];
  const n = e.split(":")[0];
  return e.includes(":") && (t = e.split(":").slice(1).join(":").split(",")), { name: n, params: t };
};
function zt(e) {
  const t = (n) => {
    var r;
    return (r = Y(n, e)) !== null && r !== void 0 ? r : n[e];
  };
  return t.__locatorRef = e, t;
}
function Lt(e) {
  return Array.isArray(e) ? e.filter(he) : Ke(e).filter((t) => he(e[t])).map((t) => e[t]);
}
const qt = {
  generateMessage: ({ field: e }) => `${e} is not valid.`,
  bails: !0,
  validateOnBlur: !0,
  validateOnChange: !0,
  validateOnInput: !1,
  validateOnModelUpdate: !0
};
let Wt = Object.assign({}, qt);
const _e = () => Wt;
async function Kt(e, t, n = {}) {
  const r = n == null ? void 0 : n.bails, a = {
    name: (n == null ? void 0 : n.name) || "{field}",
    rules: t,
    label: n == null ? void 0 : n.label,
    bails: r ?? !0,
    formData: (n == null ? void 0 : n.values) || {}
  }, i = await Gt(a, e);
  return Object.assign(Object.assign({}, i), { valid: !i.errors.length });
}
async function Gt(e, t) {
  const n = e.rules;
  if (ee(n) || ye(n))
    return Yt(t, Object.assign(Object.assign({}, e), { rules: n }));
  if (B(n) || Array.isArray(n)) {
    const o = {
      field: e.label || e.name,
      name: e.name,
      label: e.label,
      form: e.formData,
      value: t
    }, s = Array.isArray(n) ? n : [n], d = s.length, y = [];
    for (let m = 0; m < d; m++) {
      const j = s[m], f = await j(t, o);
      if (!(typeof f != "string" && !Array.isArray(f) && f)) {
        if (Array.isArray(f))
          y.push(...f);
        else {
          const T = typeof f == "string" ? f : Qe(o);
          y.push(T);
        }
        if (e.bails)
          return {
            errors: y
          };
      }
    }
    return {
      errors: y
    };
  }
  const r = Object.assign(Object.assign({}, e), { rules: Xe(n) }), a = [], i = Object.keys(r.rules), l = i.length;
  for (let o = 0; o < l; o++) {
    const s = i[o], d = await Xt(r, t, {
      name: s,
      params: r.rules[s]
    });
    if (d.error && (a.push(d.error), e.bails))
      return {
        errors: a
      };
  }
  return {
    errors: a
  };
}
function Ht(e) {
  return !!e && e.name === "ValidationError";
}
function Jt(e) {
  return {
    __type: "VVTypedSchema",
    async parse(n, r) {
      var a;
      try {
        return {
          output: await e.validate(n, { abortEarly: !1, context: (r == null ? void 0 : r.formData) || {} }),
          errors: []
        };
      } catch (i) {
        if (!Ht(i))
          throw i;
        if (!(!((a = i.inner) === null || a === void 0) && a.length) && i.errors.length)
          return { errors: [{ path: i.path, errors: i.errors }] };
        const l = i.inner.reduce((o, s) => {
          const d = s.path || "";
          return o[d] || (o[d] = { errors: [], path: d }), o[d].errors.push(...s.errors), o;
        }, {});
        return { errors: Object.values(l) };
      }
    }
  };
}
async function Yt(e, t) {
  const r = await (ee(t.rules) ? t.rules : Jt(t.rules)).parse(e, { formData: t.formData }), a = [];
  for (const i of r.errors)
    i.errors.length && a.push(...i.errors);
  return {
    value: r.value,
    errors: a
  };
}
async function Xt(e, t, n) {
  const r = At(n.name);
  if (!r)
    throw new Error(`No such validator '${n.name}' exists.`);
  const a = Qt(n.params, e.formData), i = {
    field: e.label || e.name,
    name: e.name,
    label: e.label,
    value: t,
    form: e.formData,
    rule: Object.assign(Object.assign({}, n), { params: a })
  }, l = await r(t, a, i);
  return typeof l == "string" ? {
    error: l
  } : {
    error: l ? void 0 : Qe(i)
  };
}
function Qe(e) {
  const t = _e().generateMessage;
  return t ? t(e) : "Field is invalid";
}
function Qt(e, t) {
  const n = (r) => he(r) ? r(t) : r;
  return Array.isArray(e) ? e.map(n) : Object.keys(e).reduce((r, a) => (r[a] = n(e[a]), r), {});
}
let Fe = 0;
function Zt(e, t) {
  const { value: n, initialValue: r, setInitialValue: a } = xt(e, t.modelValue, t.form);
  if (!t.form) {
    let j = function(f) {
      var A;
      "value" in f && (n.value = f.value), "errors" in f && d(f.errors), "touched" in f && (m.touched = (A = f.touched) !== null && A !== void 0 ? A : m.touched), "initialValue" in f && a(f.initialValue);
    };
    const { errors: s, setErrors: d } = nn(), y = Fe >= Number.MAX_SAFE_INTEGER ? 0 : ++Fe, m = tn(n, r, s, t.schema);
    return {
      id: y,
      path: e,
      value: n,
      initialValue: r,
      meta: m,
      flags: { pendingUnmount: { [y]: !1 }, pendingReset: !1 },
      errors: s,
      setState: j
    };
  }
  const i = t.form.createPathState(e, {
    bails: t.bails,
    label: t.label,
    type: t.type,
    validate: t.validate,
    schema: t.schema
  }), l = O(() => i.errors);
  function o(s) {
    var d, y, m;
    "value" in s && (n.value = s.value), "errors" in s && ((d = t.form) === null || d === void 0 || d.setFieldError(p(e), s.errors)), "touched" in s && ((y = t.form) === null || y === void 0 || y.setFieldTouched(p(e), (m = s.touched) !== null && m !== void 0 ? m : !1)), "initialValue" in s && a(s.initialValue);
  }
  return {
    id: Array.isArray(i.id) ? i.id[i.id.length - 1] : i.id,
    path: e,
    value: n,
    errors: l,
    meta: i,
    initialValue: r,
    flags: i.__flags,
    setState: o
  };
}
function xt(e, t, n) {
  const r = me(p(t));
  function a() {
    return n ? Y(n.initialValues.value, p(e), p(r)) : p(r);
  }
  function i(d) {
    if (!n) {
      r.value = d;
      return;
    }
    n.setFieldInitialValue(p(e), d, !0);
  }
  const l = O(a);
  if (!n)
    return {
      value: me(a()),
      initialValue: l,
      setInitialValue: i
    };
  const o = en(t, n, l, e);
  return n.stageInitialValue(p(e), o, !0), {
    value: O({
      get() {
        return Y(n.values, p(e));
      },
      set(d) {
        n.setFieldValue(p(e), d, !1);
      }
    }),
    initialValue: l,
    setInitialValue: i
  };
}
function en(e, t, n, r) {
  return $e(e) ? p(e) : e !== void 0 ? e : Y(t.values, p(r), p(n));
}
function tn(e, t, n, r) {
  const a = O(() => {
    var l, o, s;
    return (s = (o = (l = g(r)) === null || l === void 0 ? void 0 : l.describe) === null || o === void 0 ? void 0 : o.call(l).required) !== null && s !== void 0 ? s : !1;
  }), i = ft({
    touched: !1,
    pending: !1,
    valid: !0,
    required: a,
    validated: !!p(n).length,
    initialValue: O(() => p(t)),
    dirty: O(() => !w(p(e), p(t)))
  });
  return G(n, (l) => {
    i.valid = !l.length;
  }, {
    immediate: !0,
    flush: "sync"
  }), i;
}
function nn() {
  const e = me([]);
  return {
    errors: e,
    setErrors: (t) => {
      e.value = Dt(t);
    }
  };
}
const Ze = {}, te = {}, ne = "vee-validate-inspector", C = {
  error: 12405579,
  success: 448379,
  unknown: 5522283,
  white: 16777215,
  black: 0,
  blue: 218007,
  purple: 12157168,
  orange: 16099682,
  gray: 12304330
};
let b = null, U;
async function rn(e) {
  if (process.env.NODE_ENV !== "production") {
    if (!Le)
      return;
    (await import("./index-T3jqfug4.mjs")).setupDevtoolsPlugin({
      id: "vee-validate-devtools-plugin",
      label: "VeeValidate Plugin",
      packageName: "vee-validate",
      homepage: "https://vee-validate.logaretm.com/v4",
      app: e,
      logo: "https://vee-validate.logaretm.com/v4/logo.png"
    }, (n) => {
      U = n, n.addInspector({
        id: ne,
        icon: "rule",
        label: "vee-validate",
        noSelectionText: "Select a vee-validate node to inspect",
        actions: [
          {
            icon: "done_outline",
            tooltip: "Validate selected item",
            action: async () => {
              if (!b) {
                console.error("There is not a valid selected vee-validate node or component");
                return;
              }
              if (b.type === "field") {
                await b.field.validate();
                return;
              }
              if (b.type === "form") {
                await b.form.validate();
                return;
              }
              b.type === "pathState" && await b.form.validateField(b.state.path);
            }
          },
          {
            icon: "delete_sweep",
            tooltip: "Clear validation state of the selected item",
            action: () => {
              if (!b) {
                console.error("There is not a valid selected vee-validate node or component");
                return;
              }
              if (b.type === "field") {
                b.field.resetField();
                return;
              }
              b.type === "form" && b.form.resetForm(), b.type === "pathState" && b.form.resetField(b.state.path);
            }
          }
        ]
      }), n.on.getInspectorTree((r) => {
        if (r.inspectorId !== ne)
          return;
        const a = Object.values(Ze), i = Object.values(te);
        r.rootNodes = [
          ...a.map(ln),
          ...i.map((l) => un(l))
        ];
      }), n.on.getInspectorState((r) => {
        if (r.inspectorId !== ne)
          return;
        const { form: a, field: i, state: l, type: o } = sn(r.nodeId);
        if (n.unhighlightElement(), a && o === "form") {
          r.state = dn(a), b = { type: "form", form: a }, n.highlightElement(a._vm);
          return;
        }
        if (l && o === "pathState" && a) {
          r.state = Pe(l), b = { type: "pathState", state: l, form: a };
          return;
        }
        if (i && o === "field") {
          r.state = Pe({
            errors: i.errors.value,
            dirty: i.meta.dirty,
            valid: i.meta.valid,
            touched: i.meta.touched,
            value: i.value.value,
            initialValue: i.meta.initialValue
          }), b = { field: i, type: "field" }, n.highlightElement(i._vm);
          return;
        }
        b = null, n.unhighlightElement();
      });
    });
  }
}
const pe = Pt(() => {
  setTimeout(async () => {
    await vt(), U == null || U.sendInspectorState(ne), U == null || U.sendInspectorTree(ne);
  }, 100);
}, 100);
function an(e) {
  const t = H();
  if (!U) {
    const n = t == null ? void 0 : t.appContext.app;
    if (!n)
      return;
    rn(n);
  }
  te[e.id] = Object.assign({}, e), te[e.id]._vm = t, ct(() => {
    delete te[e.id], pe();
  }), pe();
}
function ln(e) {
  const { textColor: t, bgColor: n } = et(e.meta.value.valid), r = {};
  Object.values(e.getAllPathStates()).forEach((l) => {
    Ft(r, g(l.path), on(l, e));
  });
  function a(l, o = []) {
    const s = [...o].pop();
    return "id" in l ? Object.assign(Object.assign({}, l), { label: s || l.label }) : J(l) ? {
      id: `${o.join(".")}`,
      label: s || "",
      children: Object.keys(l).map((d) => a(l[d], [...o, d]))
    } : Array.isArray(l) ? {
      id: `${o.join(".")}`,
      label: `${s}[]`,
      children: l.map((d, y) => a(d, [...o, String(y)]))
    } : { id: "", label: "", children: [] };
  }
  const { children: i } = a(r);
  return {
    id: Se(e),
    label: e.name,
    children: i,
    tags: [
      {
        label: "Form",
        textColor: t,
        backgroundColor: n
      },
      {
        label: `${e.getAllPathStates().length} fields`,
        textColor: C.white,
        backgroundColor: C.unknown
      }
    ]
  };
}
function on(e, t) {
  return {
    id: Se(t, e),
    label: g(e.path),
    tags: xe(e.multiple, e.fieldsCount, e.type, e.valid, t)
  };
}
function un(e, t) {
  return {
    id: Se(t, e),
    label: p(e.name),
    tags: xe(!1, 1, e.type, e.meta.valid, t)
  };
}
function xe(e, t, n, r, a) {
  const { textColor: i, bgColor: l } = et(r);
  return [
    e ? void 0 : {
      label: "Field",
      textColor: i,
      backgroundColor: l
    },
    a ? void 0 : {
      label: "Standalone",
      textColor: C.black,
      backgroundColor: C.gray
    },
    n === "checkbox" ? {
      label: "Checkbox",
      textColor: C.white,
      backgroundColor: C.blue
    } : void 0,
    n === "radio" ? {
      label: "Radio",
      textColor: C.white,
      backgroundColor: C.purple
    } : void 0,
    e ? {
      label: "Multiple",
      textColor: C.black,
      backgroundColor: C.orange
    } : void 0
  ].filter(Boolean);
}
function Se(e, t) {
  const n = t ? "path" in t ? "pathState" : "field" : "form", r = t ? "path" in t ? t == null ? void 0 : t.path : g(t == null ? void 0 : t.name) : "", a = { f: e == null ? void 0 : e.formId, ff: (t == null ? void 0 : t.id) || r, type: n };
  return btoa(encodeURIComponent(JSON.stringify(a)));
}
function sn(e) {
  try {
    const t = JSON.parse(decodeURIComponent(atob(e))), n = Ze[t.f];
    if (!n && t.ff) {
      const a = te[t.ff];
      return a ? {
        type: t.type,
        field: a
      } : {};
    }
    if (!n)
      return {};
    const r = n.getPathState(t.ff);
    return {
      type: t.type,
      form: n,
      state: r
    };
  } catch {
  }
  return {};
}
function Pe(e) {
  return {
    "Field state": [
      { key: "errors", value: e.errors },
      {
        key: "initialValue",
        value: e.initialValue
      },
      {
        key: "currentValue",
        value: e.value
      },
      {
        key: "touched",
        value: e.touched
      },
      {
        key: "dirty",
        value: e.dirty
      },
      {
        key: "valid",
        value: e.valid
      }
    ]
  };
}
function dn(e) {
  const { errorBag: t, meta: n, values: r, isSubmitting: a, isValidating: i, submitCount: l } = e;
  return {
    "Form state": [
      {
        key: "submitCount",
        value: l.value
      },
      {
        key: "isSubmitting",
        value: a.value
      },
      {
        key: "isValidating",
        value: i.value
      },
      {
        key: "touched",
        value: n.value.touched
      },
      {
        key: "dirty",
        value: n.value.dirty
      },
      {
        key: "valid",
        value: n.value.valid
      },
      {
        key: "initialValues",
        value: n.value.initialValues
      },
      {
        key: "currentValues",
        value: r
      },
      {
        key: "errors",
        value: Ke(t.value).reduce((o, s) => {
          var d;
          const y = (d = t.value[s]) === null || d === void 0 ? void 0 : d[0];
          return y && (o[s] = y), o;
        }, {})
      }
    ]
  };
}
function et(e) {
  return {
    bgColor: e ? C.success : C.error,
    textColor: e ? C.black : C.white
  };
}
function cn(e, t, n) {
  return ae(n == null ? void 0 : n.type) ? vn(e, t, n) : tt(e, t, n);
}
function tt(e, t, n) {
  const { initialValue: r, validateOnMount: a, bails: i, type: l, checkedValue: o, label: s, validateOnValueUpdate: d, uncheckedValue: y, controlled: m, keepValueOnUnmount: j, syncVModel: f, form: A } = fn(n), T = m ? Ge(Ve) : void 0, c = A || T, M = O(() => Ct(g(e))), k = O(() => {
    if (g(c == null ? void 0 : c.schema))
      return;
    const v = p(t);
    return ye(v) || ee(v) || B(v) || Array.isArray(v) ? v : Xe(v);
  }), ie = !B(k.value) && ee(g(t)), { id: F, value: P, initialValue: le, meta: S, setState: L, errors: _, flags: I } = Zt(M, {
    modelValue: r,
    form: c,
    bails: i,
    label: s,
    type: l,
    validate: k.value ? Q : void 0,
    schema: ie ? t : void 0
  }), X = O(() => _.value[0]);
  f && mn({
    value: P,
    prop: f,
    handleChange: N,
    shouldValidate: () => d && !I.pendingReset
  });
  const se = (u, v = !1) => {
    S.touched = !0, v && D();
  };
  async function oe(u) {
    var v, V;
    if (c != null && c.validateSchema) {
      const { results: h } = await c.validateSchema(u);
      return (v = h[g(M)]) !== null && v !== void 0 ? v : { valid: !0, errors: [] };
    }
    return k.value ? Kt(P.value, k.value, {
      name: g(M),
      label: g(s),
      values: (V = c == null ? void 0 : c.values) !== null && V !== void 0 ? V : {},
      bails: i
    }) : { valid: !0, errors: [] };
  }
  const D = Me(async () => (S.pending = !0, S.validated = !0, oe("validated-only")), (u) => (I.pendingUnmount[E.id] || (L({ errors: u.errors }), S.pending = !1, S.valid = u.valid), u)), R = Me(async () => oe("silent"), (u) => (S.valid = u.valid, u));
  function Q(u) {
    return (u == null ? void 0 : u.mode) === "silent" ? R() : D();
  }
  function N(u, v = !0) {
    const V = Ye(u);
    de(V, v);
  }
  ut(() => {
    if (a)
      return D();
    (!c || !c.validateSchema) && R();
  });
  function nt(u) {
    S.touched = u;
  }
  function ke(u) {
    var v;
    const V = u && "value" in u ? u.value : le.value;
    L({
      value: z(V),
      initialValue: z(V),
      touched: (v = u == null ? void 0 : u.touched) !== null && v !== void 0 ? v : !1,
      errors: (u == null ? void 0 : u.errors) || []
    }), S.pending = !1, S.validated = !1, R();
  }
  const Ce = H();
  function de(u, v = !0) {
    P.value = Ce && f ? Tt(u, Ce.props.modelModifiers) : u, (v ? D : R)();
  }
  function rt(u) {
    L({ errors: Array.isArray(u) ? u : [u] });
  }
  const at = O({
    get() {
      return P.value;
    },
    set(u) {
      de(u, d);
    }
  }), E = {
    id: F,
    name: M,
    label: s,
    value: at,
    meta: S,
    errors: _,
    errorMessage: X,
    type: l,
    checkedValue: o,
    uncheckedValue: y,
    bails: i,
    keepValueOnUnmount: j,
    resetField: ke,
    handleReset: () => ke(),
    validate: Q,
    handleChange: N,
    handleBlur: se,
    setState: L,
    setTouched: nt,
    setErrors: rt,
    setValue: de
  };
  if (st(It, E), $e(t) && typeof p(t) != "function" && G(t, (u, v) => {
    w(u, v) || (S.validated ? D() : R());
  }, {
    deep: !0
  }), process.env.NODE_ENV !== "production" && (E._vm = H(), G(() => Object.assign(Object.assign({ errors: _.value }, S), { value: P.value }), pe, {
    deep: !0
  }), c || an(E)), !c)
    return E;
  const it = O(() => {
    const u = k.value;
    return !u || B(u) || ye(u) || ee(u) || Array.isArray(u) ? {} : Object.keys(u).reduce((v, V) => {
      const h = Lt(u[V]).map((Z) => Z.__locatorRef).reduce((Z, q) => {
        const $ = Y(c.values, q) || c.values[q];
        return $ !== void 0 && (Z[q] = $), Z;
      }, {});
      return Object.assign(v, h), v;
    }, {});
  });
  return G(it, (u, v) => {
    if (!Object.keys(u).length)
      return;
    !w(u, v) && (S.validated ? D() : R());
  }), dt(() => {
    var u;
    const v = (u = g(E.keepValueOnUnmount)) !== null && u !== void 0 ? u : g(c.keepValuesOnUnmount), V = g(M);
    if (v || !c || I.pendingUnmount[E.id]) {
      c == null || c.removePathState(V, F);
      return;
    }
    I.pendingUnmount[E.id] = !0;
    const h = c.getPathState(V);
    if (Array.isArray(h == null ? void 0 : h.id) && (h != null && h.multiple) ? h != null && h.id.includes(E.id) : (h == null ? void 0 : h.id) === E.id) {
      if (h != null && h.multiple && Array.isArray(h.value)) {
        const q = h.value.findIndex(($) => w($, g(E.checkedValue)));
        if (q > -1) {
          const $ = [...h.value];
          $.splice(q, 1), c.setFieldValue(V, $);
        }
        Array.isArray(h.id) && h.id.splice(h.id.indexOf(E.id), 1);
      } else
        c.unsetPathValue(g(M));
      c.removePathState(V, F);
    }
  }), E;
}
function fn(e) {
  const t = () => ({
    initialValue: void 0,
    validateOnMount: !1,
    bails: !0,
    label: void 0,
    validateOnValueUpdate: !0,
    keepValueOnUnmount: void 0,
    syncVModel: !1,
    controlled: !0
  }), n = !!(e != null && e.syncVModel), r = typeof (e == null ? void 0 : e.syncVModel) == "string" ? e.syncVModel : (e == null ? void 0 : e.modelPropName) || "modelValue", a = n && !("initialValue" in (e || {})) ? ge(H(), r) : e == null ? void 0 : e.initialValue;
  if (!e)
    return Object.assign(Object.assign({}, t()), { initialValue: a });
  const i = "valueProp" in e ? e.valueProp : e.checkedValue, l = "standalone" in e ? !e.standalone : e.controlled, o = (e == null ? void 0 : e.modelPropName) || (e == null ? void 0 : e.syncVModel) || !1;
  return Object.assign(Object.assign(Object.assign({}, t()), e || {}), {
    initialValue: a,
    controlled: l ?? !0,
    checkedValue: i,
    syncVModel: o
  });
}
function vn(e, t, n) {
  const r = n != null && n.standalone ? void 0 : Ge(Ve), a = n == null ? void 0 : n.checkedValue, i = n == null ? void 0 : n.uncheckedValue;
  function l(o) {
    const s = o.handleChange, d = O(() => {
      const m = g(o.value), j = g(a);
      return Array.isArray(m) ? m.findIndex((f) => w(f, j)) >= 0 : w(j, m);
    });
    function y(m, j = !0) {
      var f, A;
      if (d.value === ((f = m == null ? void 0 : m.target) === null || f === void 0 ? void 0 : f.checked)) {
        j && o.validate();
        return;
      }
      const T = g(e), c = r == null ? void 0 : r.getPathState(T), M = Ye(m);
      let k = (A = g(a)) !== null && A !== void 0 ? A : M;
      r && (c != null && c.multiple) && c.type === "checkbox" ? k = we(Y(r.values, T) || [], k, void 0) : (n == null ? void 0 : n.type) === "checkbox" && (k = we(g(o.value), k, g(i))), s(k, j);
    }
    return Object.assign(Object.assign({}, o), {
      checked: d,
      checkedValue: a,
      uncheckedValue: i,
      handleChange: y
    });
  }
  return l(tt(e, t, n));
}
function mn({ prop: e, value: t, handleChange: n, shouldValidate: r }) {
  const a = H();
  if (!a || !e) {
    process.env.NODE_ENV !== "production" && console.warn("Failed to setup model events because `useField` was not called in setup.");
    return;
  }
  const i = typeof e == "string" ? e : "modelValue", l = `update:${i}`;
  i in a.props && (G(t, (o) => {
    w(o, ge(a, i)) || a.emit(l, o);
  }), G(() => ge(a, i), (o) => {
    if (o === ue && t.value === void 0)
      return;
    const s = o === ue ? void 0 : o;
    w(s, t.value) || n(s, r());
  }));
}
function ge(e, t) {
  if (e)
    return e.props[t];
}
const hn = /* @__PURE__ */ re({
  name: "Field",
  inheritAttrs: !1,
  props: {
    as: {
      type: [String, Object],
      default: void 0
    },
    name: {
      type: String,
      required: !0
    },
    rules: {
      type: [Object, String, Function],
      default: void 0
    },
    validateOnMount: {
      type: Boolean,
      default: !1
    },
    validateOnBlur: {
      type: Boolean,
      default: void 0
    },
    validateOnChange: {
      type: Boolean,
      default: void 0
    },
    validateOnInput: {
      type: Boolean,
      default: void 0
    },
    validateOnModelUpdate: {
      type: Boolean,
      default: void 0
    },
    bails: {
      type: Boolean,
      default: () => _e().bails
    },
    label: {
      type: String,
      default: void 0
    },
    uncheckedValue: {
      type: null,
      default: void 0
    },
    modelValue: {
      type: null,
      default: ue
    },
    modelModifiers: {
      type: null,
      default: () => ({})
    },
    "onUpdate:modelValue": {
      type: null,
      default: void 0
    },
    standalone: {
      type: Boolean,
      default: !1
    },
    keepValue: {
      type: Boolean,
      default: void 0
    }
  },
  setup(e, t) {
    const n = x(e, "rules"), r = x(e, "name"), a = x(e, "label"), i = x(e, "uncheckedValue"), l = x(e, "keepValue"), { errors: o, value: s, errorMessage: d, validate: y, handleChange: m, handleBlur: j, setTouched: f, resetField: A, handleReset: T, meta: c, checked: M, setErrors: k, setValue: ie } = cn(r, n, {
      validateOnMount: e.validateOnMount,
      bails: e.bails,
      standalone: e.standalone,
      type: t.attrs.type,
      initialValue: pn(e, t),
      // Only for checkboxes and radio buttons
      checkedValue: t.attrs.value,
      uncheckedValue: i,
      label: a,
      validateOnValueUpdate: e.validateOnModelUpdate,
      keepValueOnUnmount: l,
      syncVModel: !0
    }), F = function(I, X = !0) {
      m(I, X);
    }, P = O(() => {
      const { validateOnInput: _, validateOnChange: I, validateOnBlur: X, validateOnModelUpdate: se } = yn(e);
      function oe(N) {
        j(N, X), B(t.attrs.onBlur) && t.attrs.onBlur(N);
      }
      function D(N) {
        F(N, _), B(t.attrs.onInput) && t.attrs.onInput(N);
      }
      function R(N) {
        F(N, I), B(t.attrs.onChange) && t.attrs.onChange(N);
      }
      const Q = {
        name: e.name,
        onBlur: oe,
        onInput: D,
        onChange: R
      };
      return Q["onUpdate:modelValue"] = (N) => F(N, se), Q;
    }), le = O(() => {
      const _ = Object.assign({}, P.value);
      ae(t.attrs.type) && M && (_.checked = M.value);
      const I = Te(e, t);
      return Mt(I, t.attrs) && (_.value = s.value), _;
    }), S = O(() => Object.assign(Object.assign({}, P.value), { modelValue: s.value }));
    function L() {
      return {
        field: le.value,
        componentField: S.value,
        value: s.value,
        meta: c,
        errors: o.value,
        errorMessage: d.value,
        validate: y,
        resetField: A,
        handleChange: F,
        handleInput: (_) => F(_, !1),
        handleReset: T,
        handleBlur: P.value.onBlur,
        setTouched: f,
        setErrors: k,
        setValue: ie
      };
    }
    return t.expose({
      value: s,
      meta: c,
      errors: o,
      errorMessage: d,
      setErrors: k,
      setTouched: f,
      setValue: ie,
      reset: A,
      validate: y,
      handleChange: m
    }), () => {
      const _ = Re(Te(e, t)), I = He(_, t, L);
      return _ ? ve(_, Object.assign(Object.assign({}, t.attrs), le.value), I) : I;
    };
  }
});
function Te(e, t) {
  let n = e.as || "";
  return !e.as && !t.slots.default && (n = "input"), n;
}
function yn(e) {
  var t, n, r, a;
  const { validateOnInput: i, validateOnChange: l, validateOnBlur: o, validateOnModelUpdate: s } = _e();
  return {
    validateOnInput: (t = e.validateOnInput) !== null && t !== void 0 ? t : i,
    validateOnChange: (n = e.validateOnChange) !== null && n !== void 0 ? n : l,
    validateOnBlur: (r = e.validateOnBlur) !== null && r !== void 0 ? r : o,
    validateOnModelUpdate: (a = e.validateOnModelUpdate) !== null && a !== void 0 ? a : s
  };
}
function pn(e, t) {
  return ae(t.attrs.type) ? Ie(e, "modelValue") ? e.modelValue : void 0 : Ie(e, "modelValue") ? e.modelValue : t.attrs.value;
}
const gn = hn, bn = /* @__PURE__ */ re({
  name: "ErrorMessage",
  props: {
    as: {
      type: String,
      default: void 0
    },
    name: {
      type: String,
      required: !0
    }
  },
  setup(e, t) {
    const n = Ue(Ve, void 0), r = O(() => n == null ? void 0 : n.errors.value[e.name]);
    function a() {
      return {
        message: r.value
      };
    }
    return () => {
      if (!r.value)
        return;
      const i = e.as ? Re(e.as) : e.as, l = He(i, t, a), o = Object.assign({ role: "alert" }, t.attrs);
      return !i && (Array.isArray(l) || !l) && (l != null && l.length) ? l : (Array.isArray(l) || !l) && !(l != null && l.length) ? ve(i || "span", o, r.value) : ve(i, o, l);
    };
  }
}), Vn = bn, On = { class: "base-input" }, _n = ["for"], Sn = {
  key: 0,
  class: "base-input__required"
}, kn = ["id", "type", "placeholder", "disabled"], Cn = /* @__PURE__ */ re({
  __name: "BaseInput",
  props: {
    name: {},
    modelValue: {},
    label: {},
    type: { default: "text" },
    placeholder: {},
    required: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 },
    id: { default: void 0 }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = t, r = (a) => {
      const i = a.target;
      n("update:modelValue", i.value);
    };
    return (a, i) => (K(), W("div", On, [
      a.label ? (K(), W("label", {
        key: 0,
        for: a.id,
        class: "base-input__label"
      }, [
        mt(ht(a.label) + " ", 1),
        a.required ? (K(), W("span", Sn, "*")) : fe("", !0)
      ], 8, _n)) : fe("", !0),
      je(p(gn), {
        name: a.name,
        value: a.modelValue
      }, {
        default: yt(({ field: l, errorMessage: o, meta: s }) => [
          pt("input", gt({ id: a.id }, l, {
            type: a.type,
            placeholder: a.placeholder,
            disabled: a.disabled,
            class: [
              "base-input__field",
              {
                "base-input__field--error": o,
                "base-input__field--valid": s.valid && s.touched
              }
            ],
            onInput: r
          }), null, 16, kn)
        ]),
        _: 1
      }, 8, ["name", "value"]),
      je(p(Vn), {
        name: a.name,
        class: "base-input__error"
      }, null, 8, ["name"])
    ]));
  }
}), En = /* @__PURE__ */ be(Cn, [["__scopeId", "data-v-394c05cd"]]);
function jn(e) {
}
const wn = {
  install: jn
};
export {
  In as BaseButton,
  Nn as BaseForm,
  En as BaseInput,
  wn as default,
  jn as install
};
