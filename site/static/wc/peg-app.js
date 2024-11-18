import { n as e, i as t, t as n, r, x as s } from './property-1hI2sKkM.js';
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ function i(t) {
  return e({ ...t, state: !0, attribute: !1 });
}
var o = Object.defineProperty,
  a = (e, t, n) => (
    ((e, t, n) => {
      t in e ? o(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : (e[t] = n);
    })(e, 'symbol' != typeof t ? t + '' : t, n),
    n
  ),
  c = (e, t) => {
    if (Object(t) !== t) throw TypeError('Cannot use the "in" operator on this value');
    return e.has(t);
  },
  u = (e, t, n) => {
    if (t.has(e)) throw TypeError('Cannot add the same private member more than once');
    t instanceof WeakSet ? t.add(e) : t.set(e, n);
  },
  h = (e, t, n) => (
    ((e, t, n) => {
      if (!t.has(e)) throw TypeError('Cannot ' + n);
    })(e, t, 'access private method'),
    n
  );
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function l(e, t) {
  return Object.is(e, t);
}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */ let d = null,
  f = !1,
  p = 1;
const g = Symbol('SIGNAL');
function m(e) {
  const t = d;
  return (d = e), t;
}
const y = {
  version: 0,
  lastCleanEpoch: 0,
  dirty: !1,
  producerNode: void 0,
  producerLastReadVersion: void 0,
  producerIndexOfThis: void 0,
  nextProducerIndex: 0,
  liveConsumerNode: void 0,
  liveConsumerIndexOfThis: void 0,
  consumerAllowSignalWrites: !1,
  consumerIsAlwaysLive: !1,
  producerMustRecompute: () => !1,
  producerRecomputeValue: () => {},
  consumerMarkedDirty: () => {},
  consumerOnSignalRead: () => {},
};
function v(e) {
  if (f) throw new Error('undefined' != typeof ngDevMode && ngDevMode ? 'Assertion error: signal read during notification phase' : '');
  if (null === d) return;
  d.consumerOnSignalRead(e);
  const t = d.nextProducerIndex++;
  if ((S(d), t < d.producerNode.length && d.producerNode[t] !== e && I(d))) {
    E(d.producerNode[t], d.producerIndexOfThis[t]);
  }
  d.producerNode[t] !== e && ((d.producerNode[t] = e), (d.producerIndexOfThis[t] = I(d) ? T(e, d, t) : 0)),
    (d.producerLastReadVersion[t] = e.version);
}
function w(e) {
  if (e.dirty || e.lastCleanEpoch !== p) {
    if (
      !e.producerMustRecompute(e) &&
      !(function (e) {
        S(e);
        for (let t = 0; t < e.producerNode.length; t++) {
          const n = e.producerNode[t],
            r = e.producerLastReadVersion[t];
          if (r !== n.version) return !0;
          if ((w(n), r !== n.version)) return !0;
        }
        return !1;
      })(e)
    )
      return (e.dirty = !1), void (e.lastCleanEpoch = p);
    e.producerRecomputeValue(e), (e.dirty = !1), (e.lastCleanEpoch = p);
  }
}
function _(e) {
  if (void 0 === e.liveConsumerNode) return;
  const t = f;
  f = !0;
  try {
    for (const t of e.liveConsumerNode) t.dirty || b(t);
  } finally {
    f = t;
  }
}
function b(e) {
  var t;
  (e.dirty = !0), _(e), null == (t = e.consumerMarkedDirty) || t.call(e.wrapper ?? e);
}
function T(e, t, n) {
  var r;
  if ((C(e), S(e), 0 === e.liveConsumerNode.length)) {
    null == (r = e.watched) || r.call(e.wrapper);
    for (let t = 0; t < e.producerNode.length; t++) e.producerIndexOfThis[t] = T(e.producerNode[t], e, t);
  }
  return e.liveConsumerIndexOfThis.push(n), e.liveConsumerNode.push(t) - 1;
}
function E(e, t) {
  var n;
  if ((C(e), S(e), 'undefined' != typeof ngDevMode && ngDevMode && t >= e.liveConsumerNode.length))
    throw new Error(`Assertion error: active consumer index ${t} is out of bounds of ${e.liveConsumerNode.length} consumers)`);
  if (1 === e.liveConsumerNode.length) {
    null == (n = e.unwatched) || n.call(e.wrapper);
    for (let t = 0; t < e.producerNode.length; t++) E(e.producerNode[t], e.producerIndexOfThis[t]);
  }
  const r = e.liveConsumerNode.length - 1;
  if (
    ((e.liveConsumerNode[t] = e.liveConsumerNode[r]),
    (e.liveConsumerIndexOfThis[t] = e.liveConsumerIndexOfThis[r]),
    e.liveConsumerNode.length--,
    e.liveConsumerIndexOfThis.length--,
    t < e.liveConsumerNode.length)
  ) {
    const n = e.liveConsumerIndexOfThis[t],
      r = e.liveConsumerNode[t];
    S(r), (r.producerIndexOfThis[n] = t);
  }
}
function I(e) {
  var t;
  return e.consumerIsAlwaysLive || ((null == (t = null == e ? void 0 : e.liveConsumerNode) ? void 0 : t.length) ?? 0) > 0;
}
function S(e) {
  e.producerNode ?? (e.producerNode = []),
    e.producerIndexOfThis ?? (e.producerIndexOfThis = []),
    e.producerLastReadVersion ?? (e.producerLastReadVersion = []);
}
function C(e) {
  e.liveConsumerNode ?? (e.liveConsumerNode = []), e.liveConsumerIndexOfThis ?? (e.liveConsumerIndexOfThis = []);
}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */ function k(e) {
  if ((w(e), v(e), e.value === R)) throw e.error;
  return e.value;
}
const A = Symbol('UNSET'),
  N = Symbol('COMPUTING'),
  R = Symbol('ERRORED'),
  D = (() => ({
    ...y,
    value: A,
    dirty: !0,
    error: null,
    equal: l,
    producerMustRecompute: e => e.value === A || e.value === N,
    producerRecomputeValue(e) {
      if (e.value === N) throw new Error('Detected cycle in computations.');
      const t = e.value;
      e.value = N;
      const n = (function (e) {
        return e && (e.nextProducerIndex = 0), m(e);
      })(e);
      let r,
        s = !1;
      try {
        r = e.computation.call(e.wrapper);
        s = t !== A && t !== R && e.equal.call(e.wrapper, t, r);
      } catch (t) {
        (r = R), (e.error = t);
      } finally {
        !(function (e, t) {
          if ((m(t), e && void 0 !== e.producerNode && void 0 !== e.producerIndexOfThis && void 0 !== e.producerLastReadVersion)) {
            if (I(e)) for (let t = e.nextProducerIndex; t < e.producerNode.length; t++) E(e.producerNode[t], e.producerIndexOfThis[t]);
            for (; e.producerNode.length > e.nextProducerIndex; )
              e.producerNode.pop(), e.producerLastReadVersion.pop(), e.producerIndexOfThis.pop();
          }
        })(e, n);
      }
      s ? (e.value = t) : ((e.value = r), e.version++);
    },
  }))();
let O =
  /**
   * @license
   * Copyright Google LLC All Rights Reserved.
   *
   * Use of this source code is governed by an MIT-style license that can be
   * found in the LICENSE file at https://angular.io/license
   */
  function () {
    throw new Error();
  };
function P() {
  return v(this), this.value;
}
function x(e, t) {
  !1 === (null == d ? void 0 : d.consumerAllowSignalWrites) && O(),
    e.equal.call(e.wrapper, e.value, t) ||
      ((e.value = t),
      (function (e) {
        e.version++, p++, _(e);
      })(
        /**
         * @license
         * Copyright 2024 Bloomberg Finance L.P.
         *
         * Licensed under the Apache License, Version 2.0 (the "License");
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         *     http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */ e
      ));
}
const L = (() => ({ ...y, equal: l, value: void 0 }))();
const M = Symbol('node');
var U;
(e => {
  var t, n, r, s;
  (t = M),
    (n = new WeakSet()),
    (e.isState = e => c(n, e)),
    (e.State = class {
      constructor(r, s = {}) {
        u(this, n), a(this, t);
        const i =
            /**
             * @license
             * Copyright Google LLC All Rights Reserved.
             *
             * Use of this source code is governed by an MIT-style license that can be
             * found in the LICENSE file at https://angular.io/license
             */
            (function (e) {
              const t = Object.create(L);
              t.value = e;
              const n = () => (v(t), t.value);
              return (n[g] = t), n;
            })(r),
          o = i[g];
        if (((this[M] = o), (o.wrapper = this), s)) {
          const t = s.equals;
          t && (o.equal = t), (o.watched = s[e.subtle.watched]), (o.unwatched = s[e.subtle.unwatched]);
        }
      }
      get() {
        if (!(0, e.isState)(this)) throw new TypeError('Wrong receiver type for Signal.State.prototype.get');
        return P.call(this[M]);
      }
      set(t) {
        if (!(0, e.isState)(this)) throw new TypeError('Wrong receiver type for Signal.State.prototype.set');
        if (f) throw new Error('Writes to signals not permitted during Watcher callback');
        x(this[M], t);
      }
    });
  (r = M),
    (s = new WeakSet()),
    (e.isComputed = e => c(s, e)),
    (e.Computed = class {
      constructor(t, n) {
        u(this, s), a(this, r);
        const i = (function (e) {
            const t = Object.create(D);
            t.computation = e;
            const n = () => k(t);
            return (n[g] = t), n;
          })(t),
          o = i[g];
        if (((o.consumerAllowSignalWrites = !0), (this[M] = o), (o.wrapper = this), n)) {
          const t = n.equals;
          t && (o.equal = t), (o.watched = n[e.subtle.watched]), (o.unwatched = n[e.subtle.unwatched]);
        }
      }
      get() {
        if (!(0, e.isComputed)(this)) throw new TypeError('Wrong receiver type for Signal.Computed.prototype.get');
        return k(this[M]);
      }
    }),
    (t => {
      var n, r, s, i;
      (t.untrack = function (e) {
        let t,
          n = null;
        try {
          (n = m(null)), (t = e());
        } finally {
          m(n);
        }
        return t;
      }),
        (t.introspectSources = function (t) {
          var n;
          if (!(0, e.isComputed)(t) && !(0, e.isWatcher)(t))
            throw new TypeError('Called introspectSources without a Computed or Watcher argument');
          return (null == (n = t[M].producerNode) ? void 0 : n.map(e => e.wrapper)) ?? [];
        }),
        (t.introspectSinks = function (t) {
          var n;
          if (!(0, e.isComputed)(t) && !(0, e.isState)(t)) throw new TypeError('Called introspectSinks without a Signal argument');
          return (null == (n = t[M].liveConsumerNode) ? void 0 : n.map(e => e.wrapper)) ?? [];
        }),
        (t.hasSinks = function (t) {
          if (!(0, e.isComputed)(t) && !(0, e.isState)(t)) throw new TypeError('Called hasSinks without a Signal argument');
          const n = t[M].liveConsumerNode;
          return !!n && n.length > 0;
        }),
        (t.hasSources = function (t) {
          if (!(0, e.isComputed)(t) && !(0, e.isWatcher)(t))
            throw new TypeError('Called hasSources without a Computed or Watcher argument');
          const n = t[M].producerNode;
          return !!n && n.length > 0;
        });
      (n = M),
        (r = new WeakSet()),
        (s = new WeakSet()),
        (i = function (t) {
          for (const n of t)
            if (!(0, e.isComputed)(n) && !(0, e.isState)(n))
              throw new TypeError('Called watch/unwatch without a Computed or State argument');
        }),
        (e.isWatcher = e => c(r, e)),
        (t.Watcher = class {
          constructor(e) {
            u(this, r), u(this, s), a(this, n);
            let t = Object.create(y);
            (t.wrapper = this),
              (t.consumerMarkedDirty = e),
              (t.consumerIsAlwaysLive = !0),
              (t.consumerAllowSignalWrites = !1),
              (t.producerNode = []),
              (this[M] = t);
          }
          watch(...t) {
            if (!(0, e.isWatcher)(this)) throw new TypeError('Called unwatch without Watcher receiver');
            h(this, s, i).call(this, t);
            const n = this[M];
            n.dirty = !1;
            const r = m(n);
            for (const e of t) v(e[M]);
            m(r);
          }
          unwatch(...t) {
            if (!(0, e.isWatcher)(this)) throw new TypeError('Called unwatch without Watcher receiver');
            h(this, s, i).call(this, t);
            const n = this[M];
            S(n);
            for (let e = n.producerNode.length - 1; e >= 0; e--)
              if (t.includes(n.producerNode[e].wrapper)) {
                E(n.producerNode[e], n.producerIndexOfThis[e]);
                const t = n.producerNode.length - 1;
                if (
                  ((n.producerNode[e] = n.producerNode[t]),
                  (n.producerIndexOfThis[e] = n.producerIndexOfThis[t]),
                  n.producerNode.length--,
                  n.producerIndexOfThis.length--,
                  n.nextProducerIndex--,
                  e < n.producerNode.length)
                ) {
                  const t = n.producerIndexOfThis[e],
                    r = n.producerNode[e];
                  C(r), (r.liveConsumerIndexOfThis[t] = e);
                }
              }
          }
          getPending() {
            if (!(0, e.isWatcher)(this)) throw new TypeError('Called getPending without Watcher receiver');
            return this[M].producerNode.filter(e => e.dirty).map(e => e.wrapper);
          }
        }),
        (t.currentComputed = function () {
          var e;
          return null == (e = d) ? void 0 : e.wrapper;
        }),
        (t.watched = Symbol('watched')),
        (t.unwatched = Symbol('unwatched'));
    })(e.subtle || (e.subtle = {}));
})(U || (U = {}));
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const F = Symbol('SignalWatcherBrand'),
  V = new FinalizationRegistry(({ watcher: e, signal: t }) => {
    e.unwatch(t);
  }),
  j = new WeakMap();
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
U.State, U.Computed;
const B = (e, t) => new U.State(e, t),
  $ = function (e) {
    const t = [];
    let n = 0;
    for (let r = 0; r < e.length; r++) {
      let s = e.charCodeAt(r);
      s < 128
        ? (t[n++] = s)
        : s < 2048
        ? ((t[n++] = (s >> 6) | 192), (t[n++] = (63 & s) | 128))
        : 55296 == (64512 & s) && r + 1 < e.length && 56320 == (64512 & e.charCodeAt(r + 1))
        ? ((s = 65536 + ((1023 & s) << 10) + (1023 & e.charCodeAt(++r))),
          (t[n++] = (s >> 18) | 240),
          (t[n++] = ((s >> 12) & 63) | 128),
          (t[n++] = ((s >> 6) & 63) | 128),
          (t[n++] = (63 & s) | 128))
        : ((t[n++] = (s >> 12) | 224), (t[n++] = ((s >> 6) & 63) | 128), (t[n++] = (63 & s) | 128));
    }
    return t;
  },
  q = {
    byteToCharMap_: null,
    charToByteMap_: null,
    byteToCharMapWebSafe_: null,
    charToByteMapWebSafe_: null,
    ENCODED_VALS_BASE: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    get ENCODED_VALS() {
      return this.ENCODED_VALS_BASE + '+/=';
    },
    get ENCODED_VALS_WEBSAFE() {
      return this.ENCODED_VALS_BASE + '-_.';
    },
    HAS_NATIVE_SUPPORT: 'function' == typeof atob,
    encodeByteArray(e, t) {
      if (!Array.isArray(e)) throw Error('encodeByteArray takes an array as a parameter');
      this.init_();
      const n = t ? this.byteToCharMapWebSafe_ : this.byteToCharMap_,
        r = [];
      for (let t = 0; t < e.length; t += 3) {
        const s = e[t],
          i = t + 1 < e.length,
          o = i ? e[t + 1] : 0,
          a = t + 2 < e.length,
          c = a ? e[t + 2] : 0,
          u = s >> 2,
          h = ((3 & s) << 4) | (o >> 4);
        let l = ((15 & o) << 2) | (c >> 6),
          d = 63 & c;
        a || ((d = 64), i || (l = 64)), r.push(n[u], n[h], n[l], n[d]);
      }
      return r.join('');
    },
    encodeString(e, t) {
      return this.HAS_NATIVE_SUPPORT && !t ? btoa(e) : this.encodeByteArray($(e), t);
    },
    decodeString(e, t) {
      return this.HAS_NATIVE_SUPPORT && !t
        ? atob(e)
        : (function (e) {
            const t = [];
            let n = 0,
              r = 0;
            for (; n < e.length; ) {
              const s = e[n++];
              if (s < 128) t[r++] = String.fromCharCode(s);
              else if (s > 191 && s < 224) {
                const i = e[n++];
                t[r++] = String.fromCharCode(((31 & s) << 6) | (63 & i));
              } else if (s > 239 && s < 365) {
                const i = (((7 & s) << 18) | ((63 & e[n++]) << 12) | ((63 & e[n++]) << 6) | (63 & e[n++])) - 65536;
                (t[r++] = String.fromCharCode(55296 + (i >> 10))), (t[r++] = String.fromCharCode(56320 + (1023 & i)));
              } else {
                const i = e[n++],
                  o = e[n++];
                t[r++] = String.fromCharCode(((15 & s) << 12) | ((63 & i) << 6) | (63 & o));
              }
            }
            return t.join('');
          })(this.decodeStringToByteArray(e, t));
    },
    decodeStringToByteArray(e, t) {
      this.init_();
      const n = t ? this.charToByteMapWebSafe_ : this.charToByteMap_,
        r = [];
      for (let t = 0; t < e.length; ) {
        const s = n[e.charAt(t++)],
          i = t < e.length ? n[e.charAt(t)] : 0;
        ++t;
        const o = t < e.length ? n[e.charAt(t)] : 64;
        ++t;
        const a = t < e.length ? n[e.charAt(t)] : 64;
        if ((++t, null == s || null == i || null == o || null == a)) throw new z();
        const c = (s << 2) | (i >> 4);
        if ((r.push(c), 64 !== o)) {
          const e = ((i << 4) & 240) | (o >> 2);
          if ((r.push(e), 64 !== a)) {
            const e = ((o << 6) & 192) | a;
            r.push(e);
          }
        }
      }
      return r;
    },
    init_() {
      if (!this.byteToCharMap_) {
        (this.byteToCharMap_ = {}), (this.charToByteMap_ = {}), (this.byteToCharMapWebSafe_ = {}), (this.charToByteMapWebSafe_ = {});
        for (let e = 0; e < this.ENCODED_VALS.length; e++)
          (this.byteToCharMap_[e] = this.ENCODED_VALS.charAt(e)),
            (this.charToByteMap_[this.byteToCharMap_[e]] = e),
            (this.byteToCharMapWebSafe_[e] = this.ENCODED_VALS_WEBSAFE.charAt(e)),
            (this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]] = e),
            e >= this.ENCODED_VALS_BASE.length &&
              ((this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)] = e),
              (this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)] = e));
      }
    },
  };
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class z extends Error {
  constructor() {
    super(...arguments), (this.name = 'DecodeBase64StringError');
  }
}
const H = function (e) {
    return (function (e) {
      const t = $(e);
      return q.encodeByteArray(t, !0);
    })(e).replace(/\./g, '');
  },
  G = function (e) {
    try {
      return q.decodeString(e, !0);
    } catch (e) {
      console.error('base64Decode failed: ', e);
    }
    return null;
  };
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const K = () =>
    /**
     * @license
     * Copyright 2022 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    (function () {
      if ('undefined' != typeof self) return self;
      if ('undefined' != typeof window) return window;
      if ('undefined' != typeof global) return global;
      throw new Error('Unable to locate global object.');
    })().__FIREBASE_DEFAULTS__,
  W = () => {
    try {
      return (
        K() ||
        (() => {
          if ('undefined' == typeof process || void 0 === process.env) return;
          const e = process.env.__FIREBASE_DEFAULTS__;
          return e ? JSON.parse(e) : void 0;
        })() ||
        (() => {
          if ('undefined' == typeof document) return;
          let e;
          try {
            e = document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/);
          } catch (e) {
            return;
          }
          const t = e && G(e[1]);
          return t && JSON.parse(t);
        })()
      );
    } catch (e) {
      return void console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`);
    }
  },
  Q = e => {
    var t, n;
    return null === (n = null === (t = W()) || void 0 === t ? void 0 : t.emulatorHosts) || void 0 === n ? void 0 : n[e];
  },
  X = e => {
    const t = Q(e);
    if (!t) return;
    const n = t.lastIndexOf(':');
    if (n <= 0 || n + 1 === t.length) throw new Error(`Invalid host ${t} with no separate hostname and port!`);
    const r = parseInt(t.substring(n + 1), 10);
    return '[' === t[0] ? [t.substring(1, n - 1), r] : [t.substring(0, n), r];
  },
  J = () => {
    var e;
    return null === (e = W()) || void 0 === e ? void 0 : e.config;
  },
  Y = e => {
    var t;
    return null === (t = W()) || void 0 === t ? void 0 : t[`_${e}`];
  };
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Z {
  constructor() {
    (this.reject = () => {}),
      (this.resolve = () => {}),
      (this.promise = new Promise((e, t) => {
        (this.resolve = e), (this.reject = t);
      }));
  }
  wrapCallback(e) {
    return (t, n) => {
      t ? this.reject(t) : this.resolve(n), 'function' == typeof e && (this.promise.catch(() => {}), 1 === e.length ? e(t) : e(t, n));
    };
  }
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function ee(e, t) {
  if (e.uid)
    throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');
  const n = t || 'demo-project',
    r = e.iat || 0,
    s = e.sub || e.user_id;
  if (!s) throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");
  const i = Object.assign(
    {
      iss: `https://securetoken.google.com/${n}`,
      aud: n,
      iat: r,
      exp: r + 3600,
      auth_time: r,
      sub: s,
      user_id: s,
      firebase: { sign_in_provider: 'custom', identities: {} },
    },
    e
  );
  return [H(JSON.stringify({ alg: 'none', type: 'JWT' })), H(JSON.stringify(i)), ''].join('.');
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function te() {
  return 'undefined' != typeof navigator && 'string' == typeof navigator.userAgent ? navigator.userAgent : '';
}
function ne() {
  return (
    !(function () {
      var e;
      const t = null === (e = W()) || void 0 === e ? void 0 : e.forceEnvironment;
      if ('node' === t) return !0;
      if ('browser' === t) return !1;
      try {
        return '[object process]' === Object.prototype.toString.call(global.process);
      } catch (e) {
        return !1;
      }
    })() &&
    !!navigator.userAgent &&
    navigator.userAgent.includes('Safari') &&
    !navigator.userAgent.includes('Chrome')
  );
}
class re extends Error {
  constructor(e, t, n) {
    super(t),
      (this.code = e),
      (this.customData = n),
      (this.name = 'FirebaseError'),
      Object.setPrototypeOf(this, re.prototype),
      Error.captureStackTrace && Error.captureStackTrace(this, se.prototype.create);
  }
}
class se {
  constructor(e, t, n) {
    (this.service = e), (this.serviceName = t), (this.errors = n);
  }
  create(e, ...t) {
    const n = t[0] || {},
      r = `${this.service}/${e}`,
      s = this.errors[e],
      i = s
        ? (function (e, t) {
            return e.replace(ie, (e, n) => {
              const r = t[n];
              return null != r ? String(r) : `<${n}?>`;
            });
          })(s, n)
        : 'Error',
      o = `${this.serviceName}: ${i} (${r}).`;
    return new re(r, o, n);
  }
}
const ie = /\{\$([^}]+)}/g;
function oe(e, t) {
  if (e === t) return !0;
  const n = Object.keys(e),
    r = Object.keys(t);
  for (const s of n) {
    if (!r.includes(s)) return !1;
    const n = e[s],
      i = t[s];
    if (ae(n) && ae(i)) {
      if (!oe(n, i)) return !1;
    } else if (n !== i) return !1;
  }
  for (const e of r) if (!n.includes(e)) return !1;
  return !0;
}
function ae(e) {
  return null !== e && 'object' == typeof e;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function ce(e) {
  const t = [];
  for (const [n, r] of Object.entries(e))
    Array.isArray(r)
      ? r.forEach(e => {
          t.push(encodeURIComponent(n) + '=' + encodeURIComponent(e));
        })
      : t.push(encodeURIComponent(n) + '=' + encodeURIComponent(r));
  return t.length ? '&' + t.join('&') : '';
}
class ue {
  constructor(e, t) {
    (this.observers = []),
      (this.unsubscribes = []),
      (this.observerCount = 0),
      (this.task = Promise.resolve()),
      (this.finalized = !1),
      (this.onNoObservers = t),
      this.task
        .then(() => {
          e(this);
        })
        .catch(e => {
          this.error(e);
        });
  }
  next(e) {
    this.forEachObserver(t => {
      t.next(e);
    });
  }
  error(e) {
    this.forEachObserver(t => {
      t.error(e);
    }),
      this.close(e);
  }
  complete() {
    this.forEachObserver(e => {
      e.complete();
    }),
      this.close();
  }
  subscribe(e, t, n) {
    let r;
    if (void 0 === e && void 0 === t && void 0 === n) throw new Error('Missing Observer.');
    (r = (function (e, t) {
      if ('object' != typeof e || null === e) return !1;
      for (const n of t) if (n in e && 'function' == typeof e[n]) return !0;
      return !1;
    })(e, ['next', 'error', 'complete'])
      ? e
      : { next: e, error: t, complete: n }),
      void 0 === r.next && (r.next = he),
      void 0 === r.error && (r.error = he),
      void 0 === r.complete && (r.complete = he);
    const s = this.unsubscribeOne.bind(this, this.observers.length);
    return (
      this.finalized &&
        this.task.then(() => {
          try {
            this.finalError ? r.error(this.finalError) : r.complete();
          } catch (e) {}
        }),
      this.observers.push(r),
      s
    );
  }
  unsubscribeOne(e) {
    void 0 !== this.observers &&
      void 0 !== this.observers[e] &&
      (delete this.observers[e],
      (this.observerCount -= 1),
      0 === this.observerCount && void 0 !== this.onNoObservers && this.onNoObservers(this));
  }
  forEachObserver(e) {
    if (!this.finalized) for (let t = 0; t < this.observers.length; t++) this.sendOne(t, e);
  }
  sendOne(e, t) {
    this.task.then(() => {
      if (void 0 !== this.observers && void 0 !== this.observers[e])
        try {
          t(this.observers[e]);
        } catch (e) {
          'undefined' != typeof console && console.error && console.error(e);
        }
    });
  }
  close(e) {
    this.finalized ||
      ((this.finalized = !0),
      void 0 !== e && (this.finalError = e),
      this.task.then(() => {
        (this.observers = void 0), (this.onNoObservers = void 0);
      }));
  }
}
function he() {}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function le(e) {
  return e && e._delegate ? e._delegate : e;
}
class de {
  constructor(e, t, n) {
    (this.name = e),
      (this.instanceFactory = t),
      (this.type = n),
      (this.multipleInstances = !1),
      (this.serviceProps = {}),
      (this.instantiationMode = 'LAZY'),
      (this.onInstanceCreated = null);
  }
  setInstantiationMode(e) {
    return (this.instantiationMode = e), this;
  }
  setMultipleInstances(e) {
    return (this.multipleInstances = e), this;
  }
  setServiceProps(e) {
    return (this.serviceProps = e), this;
  }
  setInstanceCreatedCallback(e) {
    return (this.onInstanceCreated = e), this;
  }
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const fe = '[DEFAULT]';
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class pe {
  constructor(e, t) {
    (this.name = e),
      (this.container = t),
      (this.component = null),
      (this.instances = new Map()),
      (this.instancesDeferred = new Map()),
      (this.instancesOptions = new Map()),
      (this.onInitCallbacks = new Map());
  }
  get(e) {
    const t = this.normalizeInstanceIdentifier(e);
    if (!this.instancesDeferred.has(t)) {
      const e = new Z();
      if ((this.instancesDeferred.set(t, e), this.isInitialized(t) || this.shouldAutoInitialize()))
        try {
          const n = this.getOrInitializeService({ instanceIdentifier: t });
          n && e.resolve(n);
        } catch (e) {}
    }
    return this.instancesDeferred.get(t).promise;
  }
  getImmediate(e) {
    var t;
    const n = this.normalizeInstanceIdentifier(null == e ? void 0 : e.identifier),
      r = null !== (t = null == e ? void 0 : e.optional) && void 0 !== t && t;
    if (!this.isInitialized(n) && !this.shouldAutoInitialize()) {
      if (r) return null;
      throw Error(`Service ${this.name} is not available`);
    }
    try {
      return this.getOrInitializeService({ instanceIdentifier: n });
    } catch (e) {
      if (r) return null;
      throw e;
    }
  }
  getComponent() {
    return this.component;
  }
  setComponent(e) {
    if (e.name !== this.name) throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);
    if (this.component) throw Error(`Component for ${this.name} has already been provided`);
    if (((this.component = e), this.shouldAutoInitialize())) {
      if (
        (function (e) {
          return 'EAGER' === e.instantiationMode;
        })(
          /**
           * @license
           * Copyright 2019 Google LLC
           *
           * Licensed under the Apache License, Version 2.0 (the "License");
           * you may not use this file except in compliance with the License.
           * You may obtain a copy of the License at
           *
           *   http://www.apache.org/licenses/LICENSE-2.0
           *
           * Unless required by applicable law or agreed to in writing, software
           * distributed under the License is distributed on an "AS IS" BASIS,
           * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
           * See the License for the specific language governing permissions and
           * limitations under the License.
           */ e
        )
      )
        try {
          this.getOrInitializeService({ instanceIdentifier: fe });
        } catch (e) {}
      for (const [e, t] of this.instancesDeferred.entries()) {
        const n = this.normalizeInstanceIdentifier(e);
        try {
          const e = this.getOrInitializeService({ instanceIdentifier: n });
          t.resolve(e);
        } catch (e) {}
      }
    }
  }
  clearInstance(e = fe) {
    this.instancesDeferred.delete(e), this.instancesOptions.delete(e), this.instances.delete(e);
  }
  async delete() {
    const e = Array.from(this.instances.values());
    await Promise.all([
      ...e.filter(e => 'INTERNAL' in e).map(e => e.INTERNAL.delete()),
      ...e.filter(e => '_delete' in e).map(e => e._delete()),
    ]);
  }
  isComponentSet() {
    return null != this.component;
  }
  isInitialized(e = fe) {
    return this.instances.has(e);
  }
  getOptions(e = fe) {
    return this.instancesOptions.get(e) || {};
  }
  initialize(e = {}) {
    const { options: t = {} } = e,
      n = this.normalizeInstanceIdentifier(e.instanceIdentifier);
    if (this.isInitialized(n)) throw Error(`${this.name}(${n}) has already been initialized`);
    if (!this.isComponentSet()) throw Error(`Component ${this.name} has not been registered yet`);
    const r = this.getOrInitializeService({ instanceIdentifier: n, options: t });
    for (const [e, t] of this.instancesDeferred.entries()) {
      n === this.normalizeInstanceIdentifier(e) && t.resolve(r);
    }
    return r;
  }
  onInit(e, t) {
    var n;
    const r = this.normalizeInstanceIdentifier(t),
      s = null !== (n = this.onInitCallbacks.get(r)) && void 0 !== n ? n : new Set();
    s.add(e), this.onInitCallbacks.set(r, s);
    const i = this.instances.get(r);
    return (
      i && e(i, r),
      () => {
        s.delete(e);
      }
    );
  }
  invokeOnInitCallbacks(e, t) {
    const n = this.onInitCallbacks.get(t);
    if (n)
      for (const r of n)
        try {
          r(e, t);
        } catch (e) {}
  }
  getOrInitializeService({ instanceIdentifier: e, options: t = {} }) {
    let n = this.instances.get(e);
    if (
      !n &&
      this.component &&
      ((n = this.component.instanceFactory(this.container, { instanceIdentifier: ((r = e), r === fe ? void 0 : r), options: t })),
      this.instances.set(e, n),
      this.instancesOptions.set(e, t),
      this.invokeOnInitCallbacks(n, e),
      this.component.onInstanceCreated)
    )
      try {
        this.component.onInstanceCreated(this.container, e, n);
      } catch (e) {}
    var r;
    return n || null;
  }
  normalizeInstanceIdentifier(e = fe) {
    return this.component ? (this.component.multipleInstances ? e : fe) : e;
  }
  shouldAutoInitialize() {
    return !!this.component && 'EXPLICIT' !== this.component.instantiationMode;
  }
}
class ge {
  constructor(e) {
    (this.name = e), (this.providers = new Map());
  }
  addComponent(e) {
    const t = this.getProvider(e.name);
    if (t.isComponentSet()) throw new Error(`Component ${e.name} has already been registered with ${this.name}`);
    t.setComponent(e);
  }
  addOrOverwriteComponent(e) {
    this.getProvider(e.name).isComponentSet() && this.providers.delete(e.name), this.addComponent(e);
  }
  getProvider(e) {
    if (this.providers.has(e)) return this.providers.get(e);
    const t = new pe(e, this);
    return this.providers.set(e, t), t;
  }
  getProviders() {
    return Array.from(this.providers.values());
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var me;
!(function (e) {
  (e[(e.DEBUG = 0)] = 'DEBUG'),
    (e[(e.VERBOSE = 1)] = 'VERBOSE'),
    (e[(e.INFO = 2)] = 'INFO'),
    (e[(e.WARN = 3)] = 'WARN'),
    (e[(e.ERROR = 4)] = 'ERROR'),
    (e[(e.SILENT = 5)] = 'SILENT');
})(me || (me = {}));
const ye = { debug: me.DEBUG, verbose: me.VERBOSE, info: me.INFO, warn: me.WARN, error: me.ERROR, silent: me.SILENT },
  ve = me.INFO,
  we = { [me.DEBUG]: 'log', [me.VERBOSE]: 'log', [me.INFO]: 'info', [me.WARN]: 'warn', [me.ERROR]: 'error' },
  _e = (e, t, ...n) => {
    if (t < e.logLevel) return;
    const r = new Date().toISOString(),
      s = we[t];
    if (!s) throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`);
    console[s](`[${r}]  ${e.name}:`, ...n);
  };
class be {
  constructor(e) {
    (this.name = e), (this._logLevel = ve), (this._logHandler = _e), (this._userLogHandler = null);
  }
  get logLevel() {
    return this._logLevel;
  }
  set logLevel(e) {
    if (!(e in me)) throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);
    this._logLevel = e;
  }
  setLogLevel(e) {
    this._logLevel = 'string' == typeof e ? ye[e] : e;
  }
  get logHandler() {
    return this._logHandler;
  }
  set logHandler(e) {
    if ('function' != typeof e) throw new TypeError('Value assigned to `logHandler` must be a function');
    this._logHandler = e;
  }
  get userLogHandler() {
    return this._userLogHandler;
  }
  set userLogHandler(e) {
    this._userLogHandler = e;
  }
  debug(...e) {
    this._userLogHandler && this._userLogHandler(this, me.DEBUG, ...e), this._logHandler(this, me.DEBUG, ...e);
  }
  log(...e) {
    this._userLogHandler && this._userLogHandler(this, me.VERBOSE, ...e), this._logHandler(this, me.VERBOSE, ...e);
  }
  info(...e) {
    this._userLogHandler && this._userLogHandler(this, me.INFO, ...e), this._logHandler(this, me.INFO, ...e);
  }
  warn(...e) {
    this._userLogHandler && this._userLogHandler(this, me.WARN, ...e), this._logHandler(this, me.WARN, ...e);
  }
  error(...e) {
    this._userLogHandler && this._userLogHandler(this, me.ERROR, ...e), this._logHandler(this, me.ERROR, ...e);
  }
}
let Te, Ee;
const Ie = new WeakMap(),
  Se = new WeakMap(),
  Ce = new WeakMap(),
  ke = new WeakMap(),
  Ae = new WeakMap();
let Ne = {
  get(e, t, n) {
    if (e instanceof IDBTransaction) {
      if ('done' === t) return Se.get(e);
      if ('objectStoreNames' === t) return e.objectStoreNames || Ce.get(e);
      if ('store' === t) return n.objectStoreNames[1] ? void 0 : n.objectStore(n.objectStoreNames[0]);
    }
    return Oe(e[t]);
  },
  set: (e, t, n) => ((e[t] = n), !0),
  has: (e, t) => (e instanceof IDBTransaction && ('done' === t || 'store' === t)) || t in e,
};
function Re(e) {
  return e !== IDBDatabase.prototype.transaction || 'objectStoreNames' in IDBTransaction.prototype
    ? (Ee || (Ee = [IDBCursor.prototype.advance, IDBCursor.prototype.continue, IDBCursor.prototype.continuePrimaryKey])).includes(e)
      ? function (...t) {
          return e.apply(Pe(this), t), Oe(Ie.get(this));
        }
      : function (...t) {
          return Oe(e.apply(Pe(this), t));
        }
    : function (t, ...n) {
        const r = e.call(Pe(this), t, ...n);
        return Ce.set(r, t.sort ? t.sort() : [t]), Oe(r);
      };
}
function De(e) {
  return 'function' == typeof e
    ? Re(e)
    : (e instanceof IDBTransaction &&
        (function (e) {
          if (Se.has(e)) return;
          const t = new Promise((t, n) => {
            const r = () => {
                e.removeEventListener('complete', s), e.removeEventListener('error', i), e.removeEventListener('abort', i);
              },
              s = () => {
                t(), r();
              },
              i = () => {
                n(e.error || new DOMException('AbortError', 'AbortError')), r();
              };
            e.addEventListener('complete', s), e.addEventListener('error', i), e.addEventListener('abort', i);
          });
          Se.set(e, t);
        })(e),
      (t = e),
      (Te || (Te = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction])).some(e => t instanceof e) ? new Proxy(e, Ne) : e);
  var t;
}
function Oe(e) {
  if (e instanceof IDBRequest)
    return (function (e) {
      const t = new Promise((t, n) => {
        const r = () => {
            e.removeEventListener('success', s), e.removeEventListener('error', i);
          },
          s = () => {
            t(Oe(e.result)), r();
          },
          i = () => {
            n(e.error), r();
          };
        e.addEventListener('success', s), e.addEventListener('error', i);
      });
      return (
        t
          .then(t => {
            t instanceof IDBCursor && Ie.set(t, e);
          })
          .catch(() => {}),
        Ae.set(t, e),
        t
      );
    })(e);
  if (ke.has(e)) return ke.get(e);
  const t = De(e);
  return t !== e && (ke.set(e, t), Ae.set(t, e)), t;
}
const Pe = e => Ae.get(e);
const xe = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'],
  Le = ['put', 'add', 'delete', 'clear'],
  Me = new Map();
function Ue(e, t) {
  if (!(e instanceof IDBDatabase) || t in e || 'string' != typeof t) return;
  if (Me.get(t)) return Me.get(t);
  const n = t.replace(/FromIndex$/, ''),
    r = t !== n,
    s = Le.includes(n);
  if (!(n in (r ? IDBIndex : IDBObjectStore).prototype) || (!s && !xe.includes(n))) return;
  const i = async function (e, ...t) {
    const i = this.transaction(e, s ? 'readwrite' : 'readonly');
    let o = i.store;
    return r && (o = o.index(t.shift())), (await Promise.all([o[n](...t), s && i.done]))[0];
  };
  return Me.set(t, i), i;
}
Ne = (e => ({ ...e, get: (t, n, r) => Ue(t, n) || e.get(t, n, r), has: (t, n) => !!Ue(t, n) || e.has(t, n) }))(Ne);
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Fe {
  constructor(e) {
    this.container = e;
  }
  getPlatformInfoString() {
    return this.container
      .getProviders()
      .map(e => {
        if (
          (function (e) {
            const t = e.getComponent();
            return 'VERSION' === (null == t ? void 0 : t.type);
          })(e)
        ) {
          const t = e.getImmediate();
          return `${t.library}/${t.version}`;
        }
        return null;
      })
      .filter(e => e)
      .join(' ');
  }
}
const Ve = '@firebase/app',
  je = '0.10.15',
  Be = new be('@firebase/app'),
  $e = '@firebase/app-compat',
  qe = '@firebase/analytics-compat',
  ze = '@firebase/analytics',
  He = '@firebase/app-check-compat',
  Ge = '@firebase/app-check',
  Ke = '@firebase/auth',
  We = '@firebase/auth-compat',
  Qe = '@firebase/database',
  Xe = '@firebase/data-connect',
  Je = '@firebase/database-compat',
  Ye = '@firebase/functions',
  Ze = '@firebase/functions-compat',
  et = '@firebase/installations',
  tt = '@firebase/installations-compat',
  nt = '@firebase/messaging',
  rt = '@firebase/messaging-compat',
  st = '@firebase/performance',
  it = '@firebase/performance-compat',
  ot = '@firebase/remote-config',
  at = '@firebase/remote-config-compat',
  ct = '@firebase/storage',
  ut = '@firebase/storage-compat',
  ht = '@firebase/firestore',
  lt = '@firebase/vertexai',
  dt = '@firebase/firestore-compat',
  ft = 'firebase',
  pt = '[DEFAULT]',
  gt = {
    [Ve]: 'fire-core',
    [$e]: 'fire-core-compat',
    [ze]: 'fire-analytics',
    [qe]: 'fire-analytics-compat',
    [Ge]: 'fire-app-check',
    [He]: 'fire-app-check-compat',
    [Ke]: 'fire-auth',
    [We]: 'fire-auth-compat',
    [Qe]: 'fire-rtdb',
    [Xe]: 'fire-data-connect',
    [Je]: 'fire-rtdb-compat',
    [Ye]: 'fire-fn',
    [Ze]: 'fire-fn-compat',
    [et]: 'fire-iid',
    [tt]: 'fire-iid-compat',
    [nt]: 'fire-fcm',
    [rt]: 'fire-fcm-compat',
    [st]: 'fire-perf',
    [it]: 'fire-perf-compat',
    [ot]: 'fire-rc',
    [at]: 'fire-rc-compat',
    [ct]: 'fire-gcs',
    [ut]: 'fire-gcs-compat',
    [ht]: 'fire-fst',
    [dt]: 'fire-fst-compat',
    [lt]: 'fire-vertex',
    'fire-js': 'fire-js',
    [ft]: 'fire-js-all',
  },
  mt = new Map(),
  yt = new Map(),
  vt = new Map();
function wt(e, t) {
  try {
    e.container.addComponent(t);
  } catch (n) {
    Be.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`, n);
  }
}
function _t(e) {
  const t = e.name;
  if (vt.has(t)) return Be.debug(`There were multiple attempts to register component ${t}.`), !1;
  vt.set(t, e);
  for (const t of mt.values()) wt(t, e);
  for (const t of yt.values()) wt(t, e);
  return !0;
}
function bt(e, t) {
  const n = e.container.getProvider('heartbeat').getImmediate({ optional: !0 });
  return n && n.triggerHeartbeat(), e.container.getProvider(t);
}
function Tt(e) {
  return void 0 !== e.settings;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Et = new se('app', 'Firebase', {
  'no-app': "No Firebase App '{$appName}' has been created - call initializeApp() first",
  'bad-app-name': "Illegal App name: '{$appName}'",
  'duplicate-app': "Firebase App named '{$appName}' already exists with different options or config",
  'app-deleted': "Firebase App named '{$appName}' already deleted",
  'server-app-deleted': 'Firebase Server App has been deleted',
  'no-options': 'Need to provide options, when not being deployed to hosting via source.',
  'invalid-app-argument': 'firebase.{$appName}() takes either no argument or a Firebase App instance.',
  'invalid-log-argument': 'First argument to `onLog` must be null or a function.',
  'idb-open': 'Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.',
  'idb-get': 'Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.',
  'idb-set': 'Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.',
  'idb-delete': 'Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.',
  'finalization-registry-not-supported':
    'FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.',
  'invalid-server-app-environment': 'FirebaseServerApp is not for use in browser environments.',
});
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class It {
  constructor(e, t, n) {
    (this._isDeleted = !1),
      (this._options = Object.assign({}, e)),
      (this._config = Object.assign({}, t)),
      (this._name = t.name),
      (this._automaticDataCollectionEnabled = t.automaticDataCollectionEnabled),
      (this._container = n),
      this.container.addComponent(new de('app', () => this, 'PUBLIC'));
  }
  get automaticDataCollectionEnabled() {
    return this.checkDestroyed(), this._automaticDataCollectionEnabled;
  }
  set automaticDataCollectionEnabled(e) {
    this.checkDestroyed(), (this._automaticDataCollectionEnabled = e);
  }
  get name() {
    return this.checkDestroyed(), this._name;
  }
  get options() {
    return this.checkDestroyed(), this._options;
  }
  get config() {
    return this.checkDestroyed(), this._config;
  }
  get container() {
    return this._container;
  }
  get isDeleted() {
    return this._isDeleted;
  }
  set isDeleted(e) {
    this._isDeleted = e;
  }
  checkDestroyed() {
    if (this.isDeleted) throw Et.create('app-deleted', { appName: this._name });
  }
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const St = '11.0.1';
function Ct(e, t = {}) {
  let n = e;
  if ('object' != typeof t) {
    t = { name: t };
  }
  const r = Object.assign({ name: pt, automaticDataCollectionEnabled: !1 }, t),
    s = r.name;
  if ('string' != typeof s || !s) throw Et.create('bad-app-name', { appName: String(s) });
  if ((n || (n = J()), !n)) throw Et.create('no-options');
  const i = mt.get(s);
  if (i) {
    if (oe(n, i.options) && oe(r, i.config)) return i;
    throw Et.create('duplicate-app', { appName: s });
  }
  const o = new ge(s);
  for (const e of vt.values()) o.addComponent(e);
  const a = new It(n, r, o);
  return mt.set(s, a), a;
}
function kt(e = pt) {
  const t = mt.get(e);
  if (!t && e === pt && J()) return Ct();
  if (!t) throw Et.create('no-app', { appName: e });
  return t;
}
function At(e, t, n) {
  var r;
  let s = null !== (r = gt[e]) && void 0 !== r ? r : e;
  n && (s += `-${n}`);
  const i = s.match(/\s|\//),
    o = t.match(/\s|\//);
  if (i || o) {
    const e = [`Unable to register library "${s}" with version "${t}":`];
    return (
      i && e.push(`library name "${s}" contains illegal characters (whitespace or "/")`),
      i && o && e.push('and'),
      o && e.push(`version name "${t}" contains illegal characters (whitespace or "/")`),
      void Be.warn(e.join(' '))
    );
  }
  _t(new de(`${s}-version`, () => ({ library: s, version: t }), 'VERSION'));
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Nt = 'firebase-heartbeat-store';
let Rt = null;
function Dt() {
  return (
    Rt ||
      (Rt = (function (e, t, { blocked: n, upgrade: r, blocking: s, terminated: i } = {}) {
        const o = indexedDB.open(e, t),
          a = Oe(o);
        return (
          r &&
            o.addEventListener('upgradeneeded', e => {
              r(Oe(o.result), e.oldVersion, e.newVersion, Oe(o.transaction), e);
            }),
          n && o.addEventListener('blocked', e => n(e.oldVersion, e.newVersion, e)),
          a
            .then(e => {
              i && e.addEventListener('close', () => i()), s && e.addEventListener('versionchange', e => s(e.oldVersion, e.newVersion, e));
            })
            .catch(() => {}),
          a
        );
      })('firebase-heartbeat-database', 1, {
        upgrade: (e, t) => {
          if (0 === t)
            try {
              e.createObjectStore(Nt);
            } catch (e) {
              console.warn(e);
            }
        },
      }).catch(e => {
        throw Et.create('idb-open', { originalErrorMessage: e.message });
      })),
    Rt
  );
}
async function Ot(e, t) {
  try {
    const n = (await Dt()).transaction(Nt, 'readwrite'),
      r = n.objectStore(Nt);
    await r.put(t, Pt(e)), await n.done;
  } catch (e) {
    if (e instanceof re) Be.warn(e.message);
    else {
      const t = Et.create('idb-set', { originalErrorMessage: null == e ? void 0 : e.message });
      Be.warn(t.message);
    }
  }
}
function Pt(e) {
  return `${e.name}!${e.options.appId}`;
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class xt {
  constructor(e) {
    (this.container = e), (this._heartbeatsCache = null);
    const t = this.container.getProvider('app').getImmediate();
    (this._storage = new Mt(t)), (this._heartbeatsCachePromise = this._storage.read().then(e => ((this._heartbeatsCache = e), e)));
  }
  async triggerHeartbeat() {
    var e, t;
    try {
      const n = this.container.getProvider('platform-logger').getImmediate().getPlatformInfoString(),
        r = Lt();
      if (
        null == (null === (e = this._heartbeatsCache) || void 0 === e ? void 0 : e.heartbeats) &&
        ((this._heartbeatsCache = await this._heartbeatsCachePromise),
        null == (null === (t = this._heartbeatsCache) || void 0 === t ? void 0 : t.heartbeats))
      )
        return;
      if (this._heartbeatsCache.lastSentHeartbeatDate === r || this._heartbeatsCache.heartbeats.some(e => e.date === r)) return;
      return (
        this._heartbeatsCache.heartbeats.push({ date: r, agent: n }),
        (this._heartbeatsCache.heartbeats = this._heartbeatsCache.heartbeats.filter(e => {
          const t = new Date(e.date).valueOf();
          return Date.now() - t <= 2592e6;
        })),
        this._storage.overwrite(this._heartbeatsCache)
      );
    } catch (e) {
      Be.warn(e);
    }
  }
  async getHeartbeatsHeader() {
    var e;
    try {
      if (
        (null === this._heartbeatsCache && (await this._heartbeatsCachePromise),
        null == (null === (e = this._heartbeatsCache) || void 0 === e ? void 0 : e.heartbeats) ||
          0 === this._heartbeatsCache.heartbeats.length)
      )
        return '';
      const t = Lt(),
        { heartbeatsToSend: n, unsentEntries: r } = (function (e, t = 1024) {
          const n = [];
          let r = e.slice();
          for (const s of e) {
            const e = n.find(e => e.agent === s.agent);
            if (e) {
              if ((e.dates.push(s.date), Ut(n) > t)) {
                e.dates.pop();
                break;
              }
            } else if ((n.push({ agent: s.agent, dates: [s.date] }), Ut(n) > t)) {
              n.pop();
              break;
            }
            r = r.slice(1);
          }
          return { heartbeatsToSend: n, unsentEntries: r };
        })(this._heartbeatsCache.heartbeats),
        s = H(JSON.stringify({ version: 2, heartbeats: n }));
      return (
        (this._heartbeatsCache.lastSentHeartbeatDate = t),
        r.length > 0
          ? ((this._heartbeatsCache.heartbeats = r), await this._storage.overwrite(this._heartbeatsCache))
          : ((this._heartbeatsCache.heartbeats = []), this._storage.overwrite(this._heartbeatsCache)),
        s
      );
    } catch (e) {
      return Be.warn(e), '';
    }
  }
}
function Lt() {
  return new Date().toISOString().substring(0, 10);
}
class Mt {
  constructor(e) {
    (this.app = e), (this._canUseIndexedDBPromise = this.runIndexedDBEnvironmentCheck());
  }
  async runIndexedDBEnvironmentCheck() {
    return (
      !!(function () {
        try {
          return 'object' == typeof indexedDB;
        } catch (e) {
          return !1;
        }
      })() &&
      new Promise((e, t) => {
        try {
          let n = !0;
          const r = 'validate-browser-context-for-indexeddb-analytics-module',
            s = self.indexedDB.open(r);
          (s.onsuccess = () => {
            s.result.close(), n || self.indexedDB.deleteDatabase(r), e(!0);
          }),
            (s.onupgradeneeded = () => {
              n = !1;
            }),
            (s.onerror = () => {
              var e;
              t((null === (e = s.error) || void 0 === e ? void 0 : e.message) || '');
            });
        } catch (e) {
          t(e);
        }
      })
        .then(() => !0)
        .catch(() => !1)
    );
  }
  async read() {
    if (await this._canUseIndexedDBPromise) {
      const e = await (async function (e) {
        try {
          const t = (await Dt()).transaction(Nt),
            n = await t.objectStore(Nt).get(Pt(e));
          return await t.done, n;
        } catch (e) {
          if (e instanceof re) Be.warn(e.message);
          else {
            const t = Et.create('idb-get', { originalErrorMessage: null == e ? void 0 : e.message });
            Be.warn(t.message);
          }
        }
      })(this.app);
      return (null == e ? void 0 : e.heartbeats) ? e : { heartbeats: [] };
    }
    return { heartbeats: [] };
  }
  async overwrite(e) {
    var t;
    if (await this._canUseIndexedDBPromise) {
      const n = await this.read();
      return Ot(this.app, {
        lastSentHeartbeatDate: null !== (t = e.lastSentHeartbeatDate) && void 0 !== t ? t : n.lastSentHeartbeatDate,
        heartbeats: e.heartbeats,
      });
    }
  }
  async add(e) {
    var t;
    if (await this._canUseIndexedDBPromise) {
      const n = await this.read();
      return Ot(this.app, {
        lastSentHeartbeatDate: null !== (t = e.lastSentHeartbeatDate) && void 0 !== t ? t : n.lastSentHeartbeatDate,
        heartbeats: [...n.heartbeats, ...e.heartbeats],
      });
    }
  }
}
function Ut(e) {
  return H(JSON.stringify({ version: 2, heartbeats: e })).length;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var Ft;
function Vt(e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (null != e && 'function' == typeof Object.getOwnPropertySymbols) {
    var s = 0;
    for (r = Object.getOwnPropertySymbols(e); s < r.length; s++)
      t.indexOf(r[s]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[s]) && (n[r[s]] = e[r[s]]);
  }
  return n;
}
function jt() {
  return {
    'dependent-sdk-initialized-before-auth':
      'Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK.',
  };
}
(Ft = ''),
  _t(new de('platform-logger', e => new Fe(e), 'PRIVATE')),
  _t(new de('heartbeat', e => new xt(e), 'PRIVATE')),
  At(Ve, je, Ft),
  At(Ve, je, 'esm2017'),
  At('fire-js', ''),
  'function' == typeof SuppressedError && SuppressedError;
const Bt = jt,
  $t = new se('auth', 'Firebase', {
    'dependent-sdk-initialized-before-auth':
      'Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK.',
  }),
  qt = new be('@firebase/auth');
function zt(e, ...t) {
  qt.logLevel <= me.ERROR && qt.error(`Auth (${St}): ${e}`, ...t);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Ht(e, ...t) {
  throw Qt(e, ...t);
}
function Gt(e, ...t) {
  return Qt(e, ...t);
}
function Kt(e, t, n) {
  const r = Object.assign(Object.assign({}, Bt()), { [t]: n });
  return new se('auth', 'Firebase', r).create(t, { appName: e.name });
}
function Wt(e) {
  return Kt(
    e,
    'operation-not-supported-in-this-environment',
    'Operations that alter the current user are not supported in conjunction with FirebaseServerApp'
  );
}
function Qt(e, ...t) {
  if ('string' != typeof e) {
    const n = t[0],
      r = [...t.slice(1)];
    return r[0] && (r[0].appName = e.name), e._errorFactory.create(n, ...r);
  }
  return $t.create(e, ...t);
}
function Xt(e, t, ...n) {
  if (!e) throw Qt(t, ...n);
}
function Jt(e) {
  const t = 'INTERNAL ASSERTION FAILED: ' + e;
  throw (zt(t), new Error(t));
}
function Yt(e, t) {
  e || Jt(t);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Zt() {
  var e;
  return ('undefined' != typeof self && (null === (e = self.location) || void 0 === e ? void 0 : e.href)) || '';
}
function en() {
  var e;
  return ('undefined' != typeof self && (null === (e = self.location) || void 0 === e ? void 0 : e.protocol)) || null;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function tn() {
  return (
    'undefined' == typeof navigator ||
    !navigator ||
    !('onLine' in navigator) ||
    'boolean' != typeof navigator.onLine ||
    ('http:' !== en() &&
      'https:' !== en() &&
      !(function () {
        const e = 'object' == typeof chrome ? chrome.runtime : 'object' == typeof browser ? browser.runtime : void 0;
        return 'object' == typeof e && void 0 !== e.id;
      })() &&
      !('connection' in navigator)) ||
    navigator.onLine
  );
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class nn {
  constructor(e, t) {
    (this.shortDelay = e),
      (this.longDelay = t),
      Yt(t > e, 'Short delay should be less than long delay!'),
      (this.isMobile =
        ('undefined' != typeof window &&
          !!(window.cordova || window.phonegap || window.PhoneGap) &&
          /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(te())) ||
        ('object' == typeof navigator && 'ReactNative' === navigator.product));
  }
  get() {
    return tn() ? (this.isMobile ? this.longDelay : this.shortDelay) : Math.min(5e3, this.shortDelay);
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function rn(e, t) {
  Yt(e.emulator, 'Emulator should always be set here');
  const { url: n } = e.emulator;
  return t ? `${n}${t.startsWith('/') ? t.slice(1) : t}` : n;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class sn {
  static initialize(e, t, n) {
    (this.fetchImpl = e), t && (this.headersImpl = t), n && (this.responseImpl = n);
  }
  static fetch() {
    return this.fetchImpl
      ? this.fetchImpl
      : 'undefined' != typeof self && 'fetch' in self
      ? self.fetch
      : 'undefined' != typeof globalThis && globalThis.fetch
      ? globalThis.fetch
      : 'undefined' != typeof fetch
      ? fetch
      : void Jt('Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill');
  }
  static headers() {
    return this.headersImpl
      ? this.headersImpl
      : 'undefined' != typeof self && 'Headers' in self
      ? self.Headers
      : 'undefined' != typeof globalThis && globalThis.Headers
      ? globalThis.Headers
      : 'undefined' != typeof Headers
      ? Headers
      : void Jt('Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill');
  }
  static response() {
    return this.responseImpl
      ? this.responseImpl
      : 'undefined' != typeof self && 'Response' in self
      ? self.Response
      : 'undefined' != typeof globalThis && globalThis.Response
      ? globalThis.Response
      : 'undefined' != typeof Response
      ? Response
      : void Jt('Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill');
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const on = {
    CREDENTIAL_MISMATCH: 'custom-token-mismatch',
    MISSING_CUSTOM_TOKEN: 'internal-error',
    INVALID_IDENTIFIER: 'invalid-email',
    MISSING_CONTINUE_URI: 'internal-error',
    INVALID_PASSWORD: 'wrong-password',
    MISSING_PASSWORD: 'missing-password',
    INVALID_LOGIN_CREDENTIALS: 'invalid-credential',
    EMAIL_EXISTS: 'email-already-in-use',
    PASSWORD_LOGIN_DISABLED: 'operation-not-allowed',
    INVALID_IDP_RESPONSE: 'invalid-credential',
    INVALID_PENDING_TOKEN: 'invalid-credential',
    FEDERATED_USER_ID_ALREADY_LINKED: 'credential-already-in-use',
    MISSING_REQ_TYPE: 'internal-error',
    EMAIL_NOT_FOUND: 'user-not-found',
    RESET_PASSWORD_EXCEED_LIMIT: 'too-many-requests',
    EXPIRED_OOB_CODE: 'expired-action-code',
    INVALID_OOB_CODE: 'invalid-action-code',
    MISSING_OOB_CODE: 'internal-error',
    CREDENTIAL_TOO_OLD_LOGIN_AGAIN: 'requires-recent-login',
    INVALID_ID_TOKEN: 'invalid-user-token',
    TOKEN_EXPIRED: 'user-token-expired',
    USER_NOT_FOUND: 'user-token-expired',
    TOO_MANY_ATTEMPTS_TRY_LATER: 'too-many-requests',
    PASSWORD_DOES_NOT_MEET_REQUIREMENTS: 'password-does-not-meet-requirements',
    INVALID_CODE: 'invalid-verification-code',
    INVALID_SESSION_INFO: 'invalid-verification-id',
    INVALID_TEMPORARY_PROOF: 'invalid-credential',
    MISSING_SESSION_INFO: 'missing-verification-id',
    SESSION_EXPIRED: 'code-expired',
    MISSING_ANDROID_PACKAGE_NAME: 'missing-android-pkg-name',
    UNAUTHORIZED_DOMAIN: 'unauthorized-continue-uri',
    INVALID_OAUTH_CLIENT_ID: 'invalid-oauth-client-id',
    ADMIN_ONLY_OPERATION: 'admin-restricted-operation',
    INVALID_MFA_PENDING_CREDENTIAL: 'invalid-multi-factor-session',
    MFA_ENROLLMENT_NOT_FOUND: 'multi-factor-info-not-found',
    MISSING_MFA_ENROLLMENT_ID: 'missing-multi-factor-info',
    MISSING_MFA_PENDING_CREDENTIAL: 'missing-multi-factor-session',
    SECOND_FACTOR_EXISTS: 'second-factor-already-in-use',
    SECOND_FACTOR_LIMIT_EXCEEDED: 'maximum-second-factor-count-exceeded',
    BLOCKING_FUNCTION_ERROR_RESPONSE: 'internal-error',
    RECAPTCHA_NOT_ENABLED: 'recaptcha-not-enabled',
    MISSING_RECAPTCHA_TOKEN: 'missing-recaptcha-token',
    INVALID_RECAPTCHA_TOKEN: 'invalid-recaptcha-token',
    INVALID_RECAPTCHA_ACTION: 'invalid-recaptcha-action',
    MISSING_CLIENT_TYPE: 'missing-client-type',
    MISSING_RECAPTCHA_VERSION: 'missing-recaptcha-version',
    INVALID_RECAPTCHA_VERSION: 'invalid-recaptcha-version',
    INVALID_REQ_TYPE: 'invalid-req-type',
  },
  an = new nn(3e4, 6e4);
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function cn(e, t) {
  return e.tenantId && !t.tenantId ? Object.assign(Object.assign({}, t), { tenantId: e.tenantId }) : t;
}
async function un(e, t, n, r, s = {}) {
  return hn(e, s, async () => {
    let s = {},
      i = {};
    r && ('GET' === t ? (i = r) : (s = { body: JSON.stringify(r) }));
    const o = ce(Object.assign({ key: e.config.apiKey }, i)).slice(1),
      a = await e._getAdditionalHeaders();
    (a['Content-Type'] = 'application/json'), e.languageCode && (a['X-Firebase-Locale'] = e.languageCode);
    const c = Object.assign({ method: t, headers: a }, s);
    return (
      ('undefined' != typeof navigator && 'Cloudflare-Workers' === navigator.userAgent) || (c.referrerPolicy = 'no-referrer'),
      sn.fetch()(ln(e, e.config.apiHost, n, o), c)
    );
  });
}
async function hn(e, t, n) {
  e._canInitEmulator = !1;
  const r = Object.assign(Object.assign({}, on), t);
  try {
    const t = new dn(e),
      s = await Promise.race([n(), t.promise]);
    t.clearNetworkTimeout();
    const i = await s.json();
    if ('needConfirmation' in i) throw fn(e, 'account-exists-with-different-credential', i);
    if (s.ok && !('errorMessage' in i)) return i;
    {
      const t = s.ok ? i.errorMessage : i.error.message,
        [n, o] = t.split(' : ');
      if ('FEDERATED_USER_ID_ALREADY_LINKED' === n) throw fn(e, 'credential-already-in-use', i);
      if ('EMAIL_EXISTS' === n) throw fn(e, 'email-already-in-use', i);
      if ('USER_DISABLED' === n) throw fn(e, 'user-disabled', i);
      const a = r[n] || n.toLowerCase().replace(/[_\s]+/g, '-');
      if (o) throw Kt(e, a, o);
      Ht(e, a);
    }
  } catch (t) {
    if (t instanceof re) throw t;
    Ht(e, 'network-request-failed', { message: String(t) });
  }
}
function ln(e, t, n, r) {
  const s = `${t}${n}?${r}`;
  return e.config.emulator ? rn(e.config, s) : `${e.config.apiScheme}://${s}`;
}
class dn {
  constructor(e) {
    (this.auth = e),
      (this.timer = null),
      (this.promise = new Promise((e, t) => {
        this.timer = setTimeout(() => t(Gt(this.auth, 'network-request-failed')), an.get());
      }));
  }
  clearNetworkTimeout() {
    clearTimeout(this.timer);
  }
}
function fn(e, t, n) {
  const r = { appName: e.name };
  n.email && (r.email = n.email), n.phoneNumber && (r.phoneNumber = n.phoneNumber);
  const s = Gt(e, t, r);
  return (s.customData._tokenResponse = n), s;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function pn(e, t) {
  return un(e, 'POST', '/v1/accounts:lookup', t);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function gn(e) {
  if (e)
    try {
      const t = new Date(Number(e));
      if (!isNaN(t.getTime())) return t.toUTCString();
    } catch (e) {}
}
function mn(e) {
  return 1e3 * Number(e);
}
function yn(e) {
  const [t, n, r] = e.split('.');
  if (void 0 === t || void 0 === n || void 0 === r) return zt('JWT malformed, contained fewer than 3 sections'), null;
  try {
    const e = G(n);
    return e ? JSON.parse(e) : (zt('Failed to decode base64 JWT payload'), null);
  } catch (e) {
    return zt('Caught error parsing JWT payload as JSON', null == e ? void 0 : e.toString()), null;
  }
}
function vn(e) {
  const t = yn(e);
  return (
    Xt(t, 'internal-error'), Xt(void 0 !== t.exp, 'internal-error'), Xt(void 0 !== t.iat, 'internal-error'), Number(t.exp) - Number(t.iat)
  );
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function wn(e, t, n = !1) {
  if (n) return t;
  try {
    return await t;
  } catch (t) {
    throw (
      (t instanceof re &&
        (function ({ code: e }) {
          return 'auth/user-disabled' === e || 'auth/user-token-expired' === e;
        })(
          /**
           * @license
           * Copyright 2020 Google LLC
           *
           * Licensed under the Apache License, Version 2.0 (the "License");
           * you may not use this file except in compliance with the License.
           * You may obtain a copy of the License at
           *
           *   http://www.apache.org/licenses/LICENSE-2.0
           *
           * Unless required by applicable law or agreed to in writing, software
           * distributed under the License is distributed on an "AS IS" BASIS,
           * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
           * See the License for the specific language governing permissions and
           * limitations under the License.
           */ t
        ) &&
        e.auth.currentUser === e &&
        (await e.auth.signOut()),
      t)
    );
  }
}
class _n {
  constructor(e) {
    (this.user = e), (this.isRunning = !1), (this.timerId = null), (this.errorBackoff = 3e4);
  }
  _start() {
    this.isRunning || ((this.isRunning = !0), this.schedule());
  }
  _stop() {
    this.isRunning && ((this.isRunning = !1), null !== this.timerId && clearTimeout(this.timerId));
  }
  getInterval(e) {
    var t;
    if (e) {
      const e = this.errorBackoff;
      return (this.errorBackoff = Math.min(2 * this.errorBackoff, 96e4)), e;
    }
    {
      this.errorBackoff = 3e4;
      const e = (null !== (t = this.user.stsTokenManager.expirationTime) && void 0 !== t ? t : 0) - Date.now() - 3e5;
      return Math.max(0, e);
    }
  }
  schedule(e = !1) {
    if (!this.isRunning) return;
    const t = this.getInterval(e);
    this.timerId = setTimeout(async () => {
      await this.iteration();
    }, t);
  }
  async iteration() {
    try {
      await this.user.getIdToken(!0);
    } catch (e) {
      return void ('auth/network-request-failed' === (null == e ? void 0 : e.code) && this.schedule(!0));
    }
    this.schedule();
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class bn {
  constructor(e, t) {
    (this.createdAt = e), (this.lastLoginAt = t), this._initializeTime();
  }
  _initializeTime() {
    (this.lastSignInTime = gn(this.lastLoginAt)), (this.creationTime = gn(this.createdAt));
  }
  _copy(e) {
    (this.createdAt = e.createdAt), (this.lastLoginAt = e.lastLoginAt), this._initializeTime();
  }
  toJSON() {
    return { createdAt: this.createdAt, lastLoginAt: this.lastLoginAt };
  }
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function Tn(e) {
  var t;
  const n = e.auth,
    r = await e.getIdToken(),
    s = await wn(e, pn(n, { idToken: r }));
  Xt(null == s ? void 0 : s.users.length, n, 'internal-error');
  const i = s.users[0];
  e._notifyReloadListener(i);
  const o = (null === (t = i.providerUserInfo) || void 0 === t ? void 0 : t.length) ? En(i.providerUserInfo) : [],
    a = (function (e, t) {
      const n = e.filter(e => !t.some(t => t.providerId === e.providerId));
      return [...n, ...t];
    })(e.providerData, o),
    c = e.isAnonymous,
    u = !((e.email && i.passwordHash) || (null == a ? void 0 : a.length)),
    h = !!c && u,
    l = {
      uid: i.localId,
      displayName: i.displayName || null,
      photoURL: i.photoUrl || null,
      email: i.email || null,
      emailVerified: i.emailVerified || !1,
      phoneNumber: i.phoneNumber || null,
      tenantId: i.tenantId || null,
      providerData: a,
      metadata: new bn(i.createdAt, i.lastLoginAt),
      isAnonymous: h,
    };
  Object.assign(e, l);
}
function En(e) {
  return e.map(e => {
    var { providerId: t } = e,
      n = Vt(e, ['providerId']);
    return {
      providerId: t,
      uid: n.rawId || '',
      displayName: n.displayName || null,
      email: n.email || null,
      phoneNumber: n.phoneNumber || null,
      photoURL: n.photoUrl || null,
    };
  });
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class In {
  constructor() {
    (this.refreshToken = null), (this.accessToken = null), (this.expirationTime = null);
  }
  get isExpired() {
    return !this.expirationTime || Date.now() > this.expirationTime - 3e4;
  }
  updateFromServerResponse(e) {
    Xt(e.idToken, 'internal-error'), Xt(void 0 !== e.idToken, 'internal-error'), Xt(void 0 !== e.refreshToken, 'internal-error');
    const t = 'expiresIn' in e && void 0 !== e.expiresIn ? Number(e.expiresIn) : vn(e.idToken);
    this.updateTokensAndExpiration(e.idToken, e.refreshToken, t);
  }
  updateFromIdToken(e) {
    Xt(0 !== e.length, 'internal-error');
    const t = vn(e);
    this.updateTokensAndExpiration(e, null, t);
  }
  async getToken(e, t = !1) {
    return t || !this.accessToken || this.isExpired
      ? (Xt(this.refreshToken, e, 'user-token-expired'),
        this.refreshToken ? (await this.refresh(e, this.refreshToken), this.accessToken) : null)
      : this.accessToken;
  }
  clearRefreshToken() {
    this.refreshToken = null;
  }
  async refresh(e, t) {
    const {
      accessToken: n,
      refreshToken: r,
      expiresIn: s,
    } = await (async function (e, t) {
      const n = await hn(e, {}, async () => {
        const n = ce({ grant_type: 'refresh_token', refresh_token: t }).slice(1),
          { tokenApiHost: r, apiKey: s } = e.config,
          i = ln(e, r, '/v1/token', `key=${s}`),
          o = await e._getAdditionalHeaders();
        return (o['Content-Type'] = 'application/x-www-form-urlencoded'), sn.fetch()(i, { method: 'POST', headers: o, body: n });
      });
      return { accessToken: n.access_token, expiresIn: n.expires_in, refreshToken: n.refresh_token };
    })(e, t);
    this.updateTokensAndExpiration(n, r, Number(s));
  }
  updateTokensAndExpiration(e, t, n) {
    (this.refreshToken = t || null), (this.accessToken = e || null), (this.expirationTime = Date.now() + 1e3 * n);
  }
  static fromJSON(e, t) {
    const { refreshToken: n, accessToken: r, expirationTime: s } = t,
      i = new In();
    return (
      n && (Xt('string' == typeof n, 'internal-error', { appName: e }), (i.refreshToken = n)),
      r && (Xt('string' == typeof r, 'internal-error', { appName: e }), (i.accessToken = r)),
      s && (Xt('number' == typeof s, 'internal-error', { appName: e }), (i.expirationTime = s)),
      i
    );
  }
  toJSON() {
    return { refreshToken: this.refreshToken, accessToken: this.accessToken, expirationTime: this.expirationTime };
  }
  _assign(e) {
    (this.accessToken = e.accessToken), (this.refreshToken = e.refreshToken), (this.expirationTime = e.expirationTime);
  }
  _clone() {
    return Object.assign(new In(), this.toJSON());
  }
  _performRefresh() {
    return Jt('not implemented');
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Sn(e, t) {
  Xt('string' == typeof e || void 0 === e, 'internal-error', { appName: t });
}
class Cn {
  constructor(e) {
    var { uid: t, auth: n, stsTokenManager: r } = e,
      s = Vt(e, ['uid', 'auth', 'stsTokenManager']);
    (this.providerId = 'firebase'),
      (this.proactiveRefresh = new _n(this)),
      (this.reloadUserInfo = null),
      (this.reloadListener = null),
      (this.uid = t),
      (this.auth = n),
      (this.stsTokenManager = r),
      (this.accessToken = r.accessToken),
      (this.displayName = s.displayName || null),
      (this.email = s.email || null),
      (this.emailVerified = s.emailVerified || !1),
      (this.phoneNumber = s.phoneNumber || null),
      (this.photoURL = s.photoURL || null),
      (this.isAnonymous = s.isAnonymous || !1),
      (this.tenantId = s.tenantId || null),
      (this.providerData = s.providerData ? [...s.providerData] : []),
      (this.metadata = new bn(s.createdAt || void 0, s.lastLoginAt || void 0));
  }
  async getIdToken(e) {
    const t = await wn(this, this.stsTokenManager.getToken(this.auth, e));
    return (
      Xt(t, this.auth, 'internal-error'),
      this.accessToken !== t &&
        ((this.accessToken = t), await this.auth._persistUserIfCurrent(this), this.auth._notifyListenersIfCurrent(this)),
      t
    );
  }
  getIdTokenResult(e) {
    return (async function (e, t = !1) {
      const n = le(e),
        r = await n.getIdToken(t),
        s = yn(r);
      Xt(s && s.exp && s.auth_time && s.iat, n.auth, 'internal-error');
      const i = 'object' == typeof s.firebase ? s.firebase : void 0,
        o = null == i ? void 0 : i.sign_in_provider;
      return {
        claims: s,
        token: r,
        authTime: gn(mn(s.auth_time)),
        issuedAtTime: gn(mn(s.iat)),
        expirationTime: gn(mn(s.exp)),
        signInProvider: o || null,
        signInSecondFactor: (null == i ? void 0 : i.sign_in_second_factor) || null,
      };
    })(this, e);
  }
  reload() {
    return (async function (e) {
      const t = le(e);
      await Tn(t), await t.auth._persistUserIfCurrent(t), t.auth._notifyListenersIfCurrent(t);
    })(this);
  }
  _assign(e) {
    this !== e &&
      (Xt(this.uid === e.uid, this.auth, 'internal-error'),
      (this.displayName = e.displayName),
      (this.photoURL = e.photoURL),
      (this.email = e.email),
      (this.emailVerified = e.emailVerified),
      (this.phoneNumber = e.phoneNumber),
      (this.isAnonymous = e.isAnonymous),
      (this.tenantId = e.tenantId),
      (this.providerData = e.providerData.map(e => Object.assign({}, e))),
      this.metadata._copy(e.metadata),
      this.stsTokenManager._assign(e.stsTokenManager));
  }
  _clone(e) {
    const t = new Cn(Object.assign(Object.assign({}, this), { auth: e, stsTokenManager: this.stsTokenManager._clone() }));
    return t.metadata._copy(this.metadata), t;
  }
  _onReload(e) {
    Xt(!this.reloadListener, this.auth, 'internal-error'),
      (this.reloadListener = e),
      this.reloadUserInfo && (this._notifyReloadListener(this.reloadUserInfo), (this.reloadUserInfo = null));
  }
  _notifyReloadListener(e) {
    this.reloadListener ? this.reloadListener(e) : (this.reloadUserInfo = e);
  }
  _startProactiveRefresh() {
    this.proactiveRefresh._start();
  }
  _stopProactiveRefresh() {
    this.proactiveRefresh._stop();
  }
  async _updateTokensIfNecessary(e, t = !1) {
    let n = !1;
    e.idToken && e.idToken !== this.stsTokenManager.accessToken && (this.stsTokenManager.updateFromServerResponse(e), (n = !0)),
      t && (await Tn(this)),
      await this.auth._persistUserIfCurrent(this),
      n && this.auth._notifyListenersIfCurrent(this);
  }
  async delete() {
    if (Tt(this.auth.app)) return Promise.reject(Wt(this.auth));
    const e = await this.getIdToken();
    return (
      await wn(
        this,
        (async function (e, t) {
          return un(e, 'POST', '/v1/accounts:delete', t);
        })(this.auth, { idToken: e })
      ),
      this.stsTokenManager.clearRefreshToken(),
      this.auth.signOut()
    );
  }
  toJSON() {
    return Object.assign(
      Object.assign(
        {
          uid: this.uid,
          email: this.email || void 0,
          emailVerified: this.emailVerified,
          displayName: this.displayName || void 0,
          isAnonymous: this.isAnonymous,
          photoURL: this.photoURL || void 0,
          phoneNumber: this.phoneNumber || void 0,
          tenantId: this.tenantId || void 0,
          providerData: this.providerData.map(e => Object.assign({}, e)),
          stsTokenManager: this.stsTokenManager.toJSON(),
          _redirectEventId: this._redirectEventId,
        },
        this.metadata.toJSON()
      ),
      { apiKey: this.auth.config.apiKey, appName: this.auth.name }
    );
  }
  get refreshToken() {
    return this.stsTokenManager.refreshToken || '';
  }
  static _fromJSON(e, t) {
    var n, r, s, i, o, a, c, u;
    const h = null !== (n = t.displayName) && void 0 !== n ? n : void 0,
      l = null !== (r = t.email) && void 0 !== r ? r : void 0,
      d = null !== (s = t.phoneNumber) && void 0 !== s ? s : void 0,
      f = null !== (i = t.photoURL) && void 0 !== i ? i : void 0,
      p = null !== (o = t.tenantId) && void 0 !== o ? o : void 0,
      g = null !== (a = t._redirectEventId) && void 0 !== a ? a : void 0,
      m = null !== (c = t.createdAt) && void 0 !== c ? c : void 0,
      y = null !== (u = t.lastLoginAt) && void 0 !== u ? u : void 0,
      { uid: v, emailVerified: w, isAnonymous: _, providerData: b, stsTokenManager: T } = t;
    Xt(v && T, e, 'internal-error');
    const E = In.fromJSON(this.name, T);
    Xt('string' == typeof v, e, 'internal-error'),
      Sn(h, e.name),
      Sn(l, e.name),
      Xt('boolean' == typeof w, e, 'internal-error'),
      Xt('boolean' == typeof _, e, 'internal-error'),
      Sn(d, e.name),
      Sn(f, e.name),
      Sn(p, e.name),
      Sn(g, e.name),
      Sn(m, e.name),
      Sn(y, e.name);
    const I = new Cn({
      uid: v,
      auth: e,
      email: l,
      emailVerified: w,
      displayName: h,
      isAnonymous: _,
      photoURL: f,
      phoneNumber: d,
      tenantId: p,
      stsTokenManager: E,
      createdAt: m,
      lastLoginAt: y,
    });
    return b && Array.isArray(b) && (I.providerData = b.map(e => Object.assign({}, e))), g && (I._redirectEventId = g), I;
  }
  static async _fromIdTokenResponse(e, t, n = !1) {
    const r = new In();
    r.updateFromServerResponse(t);
    const s = new Cn({ uid: t.localId, auth: e, stsTokenManager: r, isAnonymous: n });
    return await Tn(s), s;
  }
  static async _fromGetAccountInfoResponse(e, t, n) {
    const r = t.users[0];
    Xt(void 0 !== r.localId, 'internal-error');
    const s = void 0 !== r.providerUserInfo ? En(r.providerUserInfo) : [],
      i = !((r.email && r.passwordHash) || (null == s ? void 0 : s.length)),
      o = new In();
    o.updateFromIdToken(n);
    const a = new Cn({ uid: r.localId, auth: e, stsTokenManager: o, isAnonymous: i }),
      c = {
        uid: r.localId,
        displayName: r.displayName || null,
        photoURL: r.photoUrl || null,
        email: r.email || null,
        emailVerified: r.emailVerified || !1,
        phoneNumber: r.phoneNumber || null,
        tenantId: r.tenantId || null,
        providerData: s,
        metadata: new bn(r.createdAt, r.lastLoginAt),
        isAnonymous: !((r.email && r.passwordHash) || (null == s ? void 0 : s.length)),
      };
    return Object.assign(a, c), a;
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const kn = new Map();
function An(e) {
  Yt(e instanceof Function, 'Expected a class definition');
  let t = kn.get(e);
  return t ? (Yt(t instanceof e, 'Instance stored in cache mismatched with class'), t) : ((t = new e()), kn.set(e, t), t);
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Nn {
  constructor() {
    (this.type = 'NONE'), (this.storage = {});
  }
  async _isAvailable() {
    return !0;
  }
  async _set(e, t) {
    this.storage[e] = t;
  }
  async _get(e) {
    const t = this.storage[e];
    return void 0 === t ? null : t;
  }
  async _remove(e) {
    delete this.storage[e];
  }
  _addListener(e, t) {}
  _removeListener(e, t) {}
}
Nn.type = 'NONE';
const Rn = Nn;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Dn(e, t, n) {
  return `firebase:${e}:${t}:${n}`;
}
class On {
  constructor(e, t, n) {
    (this.persistence = e), (this.auth = t), (this.userKey = n);
    const { config: r, name: s } = this.auth;
    (this.fullUserKey = Dn(this.userKey, r.apiKey, s)),
      (this.fullPersistenceKey = Dn('persistence', r.apiKey, s)),
      (this.boundEventHandler = t._onStorageEvent.bind(t)),
      this.persistence._addListener(this.fullUserKey, this.boundEventHandler);
  }
  setCurrentUser(e) {
    return this.persistence._set(this.fullUserKey, e.toJSON());
  }
  async getCurrentUser() {
    const e = await this.persistence._get(this.fullUserKey);
    return e ? Cn._fromJSON(this.auth, e) : null;
  }
  removeCurrentUser() {
    return this.persistence._remove(this.fullUserKey);
  }
  savePersistenceForRedirect() {
    return this.persistence._set(this.fullPersistenceKey, this.persistence.type);
  }
  async setPersistence(e) {
    if (this.persistence === e) return;
    const t = await this.getCurrentUser();
    return await this.removeCurrentUser(), (this.persistence = e), t ? this.setCurrentUser(t) : void 0;
  }
  delete() {
    this.persistence._removeListener(this.fullUserKey, this.boundEventHandler);
  }
  static async create(e, t, n = 'authUser') {
    if (!t.length) return new On(An(Rn), e, n);
    const r = (
      await Promise.all(
        t.map(async e => {
          if (await e._isAvailable()) return e;
        })
      )
    ).filter(e => e);
    let s = r[0] || An(Rn);
    const i = Dn(n, e.config.apiKey, e.name);
    let o = null;
    for (const n of t)
      try {
        const t = await n._get(i);
        if (t) {
          const r = Cn._fromJSON(e, t);
          n !== s && (o = r), (s = n);
          break;
        }
      } catch (e) {}
    const a = r.filter(e => e._shouldAllowMigration);
    return s._shouldAllowMigration && a.length
      ? ((s = a[0]),
        o && (await s._set(i, o.toJSON())),
        await Promise.all(
          t.map(async e => {
            if (e !== s)
              try {
                await e._remove(i);
              } catch (e) {}
          })
        ),
        new On(s, e, n))
      : new On(s, e, n);
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Pn(e) {
  const t = e.toLowerCase();
  if (t.includes('opera/') || t.includes('opr/') || t.includes('opios/')) return 'Opera';
  if (Un(t)) return 'IEMobile';
  if (t.includes('msie') || t.includes('trident/')) return 'IE';
  if (t.includes('edge/')) return 'Edge';
  if (xn(t)) return 'Firefox';
  if (t.includes('silk/')) return 'Silk';
  if (Vn(t)) return 'Blackberry';
  if (jn(t)) return 'Webos';
  if (Ln(t)) return 'Safari';
  if ((t.includes('chrome/') || Mn(t)) && !t.includes('edge/')) return 'Chrome';
  if (Fn(t)) return 'Android';
  {
    const t = /([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,
      n = e.match(t);
    if (2 === (null == n ? void 0 : n.length)) return n[1];
  }
  return 'Other';
}
function xn(e = te()) {
  return /firefox\//i.test(e);
}
function Ln(e = te()) {
  const t = e.toLowerCase();
  return t.includes('safari/') && !t.includes('chrome/') && !t.includes('crios/') && !t.includes('android');
}
function Mn(e = te()) {
  return /crios\//i.test(e);
}
function Un(e = te()) {
  return /iemobile/i.test(e);
}
function Fn(e = te()) {
  return /android/i.test(e);
}
function Vn(e = te()) {
  return /blackberry/i.test(e);
}
function jn(e = te()) {
  return /webos/i.test(e);
}
function Bn(e = te()) {
  return /iphone|ipad|ipod/i.test(e) || (/macintosh/i.test(e) && /mobile/i.test(e));
}
function $n() {
  return (
    (function () {
      const e = te();
      return e.indexOf('MSIE ') >= 0 || e.indexOf('Trident/') >= 0;
    })() && 10 === document.documentMode
  );
}
function qn(e = te()) {
  return Bn(e) || Fn(e) || jn(e) || Vn(e) || /windows phone/i.test(e) || Un(e);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function zn(e, t = []) {
  let n;
  switch (e) {
    case 'Browser':
      n = Pn(te());
      break;
    case 'Worker':
      n = `${Pn(te())}-${e}`;
      break;
    default:
      n = e;
  }
  const r = t.length ? t.join(',') : 'FirebaseCore-web';
  return `${n}/JsCore/${St}/${r}`;
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Hn {
  constructor(e) {
    (this.auth = e), (this.queue = []);
  }
  pushCallback(e, t) {
    const n = t =>
      new Promise((n, r) => {
        try {
          n(e(t));
        } catch (e) {
          r(e);
        }
      });
    (n.onAbort = t), this.queue.push(n);
    const r = this.queue.length - 1;
    return () => {
      this.queue[r] = () => Promise.resolve();
    };
  }
  async runMiddleware(e) {
    if (this.auth.currentUser === e) return;
    const t = [];
    try {
      for (const n of this.queue) await n(e), n.onAbort && t.push(n.onAbort);
    } catch (e) {
      t.reverse();
      for (const e of t)
        try {
          e();
        } catch (e) {}
      throw this.auth._errorFactory.create('login-blocked', { originalMessage: null == e ? void 0 : e.message });
    }
  }
}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Gn {
  constructor(e) {
    var t, n, r, s;
    const i = e.customStrengthOptions;
    (this.customStrengthOptions = {}),
      (this.customStrengthOptions.minPasswordLength = null !== (t = i.minPasswordLength) && void 0 !== t ? t : 6),
      i.maxPasswordLength && (this.customStrengthOptions.maxPasswordLength = i.maxPasswordLength),
      void 0 !== i.containsLowercaseCharacter && (this.customStrengthOptions.containsLowercaseLetter = i.containsLowercaseCharacter),
      void 0 !== i.containsUppercaseCharacter && (this.customStrengthOptions.containsUppercaseLetter = i.containsUppercaseCharacter),
      void 0 !== i.containsNumericCharacter && (this.customStrengthOptions.containsNumericCharacter = i.containsNumericCharacter),
      void 0 !== i.containsNonAlphanumericCharacter &&
        (this.customStrengthOptions.containsNonAlphanumericCharacter = i.containsNonAlphanumericCharacter),
      (this.enforcementState = e.enforcementState),
      'ENFORCEMENT_STATE_UNSPECIFIED' === this.enforcementState && (this.enforcementState = 'OFF'),
      (this.allowedNonAlphanumericCharacters =
        null !== (r = null === (n = e.allowedNonAlphanumericCharacters) || void 0 === n ? void 0 : n.join('')) && void 0 !== r ? r : ''),
      (this.forceUpgradeOnSignin = null !== (s = e.forceUpgradeOnSignin) && void 0 !== s && s),
      (this.schemaVersion = e.schemaVersion);
  }
  validatePassword(e) {
    var t, n, r, s, i, o;
    const a = { isValid: !0, passwordPolicy: this };
    return (
      this.validatePasswordLengthOptions(e, a),
      this.validatePasswordCharacterOptions(e, a),
      a.isValid && (a.isValid = null === (t = a.meetsMinPasswordLength) || void 0 === t || t),
      a.isValid && (a.isValid = null === (n = a.meetsMaxPasswordLength) || void 0 === n || n),
      a.isValid && (a.isValid = null === (r = a.containsLowercaseLetter) || void 0 === r || r),
      a.isValid && (a.isValid = null === (s = a.containsUppercaseLetter) || void 0 === s || s),
      a.isValid && (a.isValid = null === (i = a.containsNumericCharacter) || void 0 === i || i),
      a.isValid && (a.isValid = null === (o = a.containsNonAlphanumericCharacter) || void 0 === o || o),
      a
    );
  }
  validatePasswordLengthOptions(e, t) {
    const n = this.customStrengthOptions.minPasswordLength,
      r = this.customStrengthOptions.maxPasswordLength;
    n && (t.meetsMinPasswordLength = e.length >= n), r && (t.meetsMaxPasswordLength = e.length <= r);
  }
  validatePasswordCharacterOptions(e, t) {
    let n;
    this.updatePasswordCharacterOptionsStatuses(t, !1, !1, !1, !1);
    for (let r = 0; r < e.length; r++)
      (n = e.charAt(r)),
        this.updatePasswordCharacterOptionsStatuses(
          t,
          n >= 'a' && n <= 'z',
          n >= 'A' && n <= 'Z',
          n >= '0' && n <= '9',
          this.allowedNonAlphanumericCharacters.includes(n)
        );
  }
  updatePasswordCharacterOptionsStatuses(e, t, n, r, s) {
    this.customStrengthOptions.containsLowercaseLetter && (e.containsLowercaseLetter || (e.containsLowercaseLetter = t)),
      this.customStrengthOptions.containsUppercaseLetter && (e.containsUppercaseLetter || (e.containsUppercaseLetter = n)),
      this.customStrengthOptions.containsNumericCharacter && (e.containsNumericCharacter || (e.containsNumericCharacter = r)),
      this.customStrengthOptions.containsNonAlphanumericCharacter &&
        (e.containsNonAlphanumericCharacter || (e.containsNonAlphanumericCharacter = s));
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Kn {
  constructor(e, t, n, r) {
    (this.app = e),
      (this.heartbeatServiceProvider = t),
      (this.appCheckServiceProvider = n),
      (this.config = r),
      (this.currentUser = null),
      (this.emulatorConfig = null),
      (this.operations = Promise.resolve()),
      (this.authStateSubscription = new Qn(this)),
      (this.idTokenSubscription = new Qn(this)),
      (this.beforeStateQueue = new Hn(this)),
      (this.redirectUser = null),
      (this.isProactiveRefreshEnabled = !1),
      (this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION = 1),
      (this._canInitEmulator = !0),
      (this._isInitialized = !1),
      (this._deleted = !1),
      (this._initializationPromise = null),
      (this._popupRedirectResolver = null),
      (this._errorFactory = $t),
      (this._agentRecaptchaConfig = null),
      (this._tenantRecaptchaConfigs = {}),
      (this._projectPasswordPolicy = null),
      (this._tenantPasswordPolicies = {}),
      (this.lastNotifiedUid = void 0),
      (this.languageCode = null),
      (this.tenantId = null),
      (this.settings = { appVerificationDisabledForTesting: !1 }),
      (this.frameworks = []),
      (this.name = e.name),
      (this.clientVersion = r.sdkClientVersion);
  }
  _initializeWithPersistence(e, t) {
    return (
      t && (this._popupRedirectResolver = An(t)),
      (this._initializationPromise = this.queue(async () => {
        var n, r;
        if (!this._deleted && ((this.persistenceManager = await On.create(this, e)), !this._deleted)) {
          if (null === (n = this._popupRedirectResolver) || void 0 === n ? void 0 : n._shouldInitProactively)
            try {
              await this._popupRedirectResolver._initialize(this);
            } catch (e) {}
          await this.initializeCurrentUser(t),
            (this.lastNotifiedUid = (null === (r = this.currentUser) || void 0 === r ? void 0 : r.uid) || null),
            this._deleted || (this._isInitialized = !0);
        }
      })),
      this._initializationPromise
    );
  }
  async _onStorageEvent() {
    if (this._deleted) return;
    const e = await this.assertedPersistence.getCurrentUser();
    return this.currentUser || e
      ? this.currentUser && e && this.currentUser.uid === e.uid
        ? (this._currentUser._assign(e), void (await this.currentUser.getIdToken()))
        : void (await this._updateCurrentUser(e, !0))
      : void 0;
  }
  async initializeCurrentUserFromIdToken(e) {
    try {
      const t = await pn(this, { idToken: e }),
        n = await Cn._fromGetAccountInfoResponse(this, t, e);
      await this.directlySetCurrentUser(n);
    } catch (e) {
      console.warn('FirebaseServerApp could not login user with provided authIdToken: ', e), await this.directlySetCurrentUser(null);
    }
  }
  async initializeCurrentUser(e) {
    var t;
    if (Tt(this.app)) {
      const e = this.app.settings.authIdToken;
      return e
        ? new Promise(t => {
            setTimeout(() => this.initializeCurrentUserFromIdToken(e).then(t, t));
          })
        : this.directlySetCurrentUser(null);
    }
    const n = await this.assertedPersistence.getCurrentUser();
    let r = n,
      s = !1;
    if (e && this.config.authDomain) {
      await this.getOrInitRedirectPersistenceManager();
      const n = null === (t = this.redirectUser) || void 0 === t ? void 0 : t._redirectEventId,
        i = null == r ? void 0 : r._redirectEventId,
        o = await this.tryRedirectSignIn(e);
      (n && n !== i) || !(null == o ? void 0 : o.user) || ((r = o.user), (s = !0));
    }
    if (!r) return this.directlySetCurrentUser(null);
    if (!r._redirectEventId) {
      if (s)
        try {
          await this.beforeStateQueue.runMiddleware(r);
        } catch (e) {
          (r = n), this._popupRedirectResolver._overrideRedirectResult(this, () => Promise.reject(e));
        }
      return r ? this.reloadAndSetCurrentUserOrClear(r) : this.directlySetCurrentUser(null);
    }
    return (
      Xt(this._popupRedirectResolver, this, 'argument-error'),
      await this.getOrInitRedirectPersistenceManager(),
      this.redirectUser && this.redirectUser._redirectEventId === r._redirectEventId
        ? this.directlySetCurrentUser(r)
        : this.reloadAndSetCurrentUserOrClear(r)
    );
  }
  async tryRedirectSignIn(e) {
    let t = null;
    try {
      t = await this._popupRedirectResolver._completeRedirectFn(this, e, !0);
    } catch (e) {
      await this._setRedirectUser(null);
    }
    return t;
  }
  async reloadAndSetCurrentUserOrClear(e) {
    try {
      await Tn(e);
    } catch (e) {
      if ('auth/network-request-failed' !== (null == e ? void 0 : e.code)) return this.directlySetCurrentUser(null);
    }
    return this.directlySetCurrentUser(e);
  }
  useDeviceLanguage() {
    this.languageCode = (function () {
      if ('undefined' == typeof navigator) return null;
      const e = navigator;
      return (e.languages && e.languages[0]) || e.language || null;
    })();
  }
  async _delete() {
    this._deleted = !0;
  }
  async updateCurrentUser(e) {
    if (Tt(this.app)) return Promise.reject(Wt(this));
    const t = e ? le(e) : null;
    return t && Xt(t.auth.config.apiKey === this.config.apiKey, this, 'invalid-user-token'), this._updateCurrentUser(t && t._clone(this));
  }
  async _updateCurrentUser(e, t = !1) {
    if (!this._deleted)
      return (
        e && Xt(this.tenantId === e.tenantId, this, 'tenant-id-mismatch'),
        t || (await this.beforeStateQueue.runMiddleware(e)),
        this.queue(async () => {
          await this.directlySetCurrentUser(e), this.notifyAuthListeners();
        })
      );
  }
  async signOut() {
    return Tt(this.app)
      ? Promise.reject(Wt(this))
      : (await this.beforeStateQueue.runMiddleware(null),
        (this.redirectPersistenceManager || this._popupRedirectResolver) && (await this._setRedirectUser(null)),
        this._updateCurrentUser(null, !0));
  }
  setPersistence(e) {
    return Tt(this.app)
      ? Promise.reject(Wt(this))
      : this.queue(async () => {
          await this.assertedPersistence.setPersistence(An(e));
        });
  }
  _getRecaptchaConfig() {
    return null == this.tenantId ? this._agentRecaptchaConfig : this._tenantRecaptchaConfigs[this.tenantId];
  }
  async validatePassword(e) {
    this._getPasswordPolicyInternal() || (await this._updatePasswordPolicy());
    const t = this._getPasswordPolicyInternal();
    return t.schemaVersion !== this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION
      ? Promise.reject(this._errorFactory.create('unsupported-password-policy-schema-version', {}))
      : t.validatePassword(e);
  }
  _getPasswordPolicyInternal() {
    return null === this.tenantId ? this._projectPasswordPolicy : this._tenantPasswordPolicies[this.tenantId];
  }
  async _updatePasswordPolicy() {
    const e = await (async function (e, t = {}) {
        return un(e, 'GET', '/v2/passwordPolicy', cn(e, t));
      })(
        /**
         * @license
         * Copyright 2023 Google LLC
         *
         * Licensed under the Apache License, Version 2.0 (the "License");
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         *   http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */ this
      ),
      t = new Gn(e);
    null === this.tenantId ? (this._projectPasswordPolicy = t) : (this._tenantPasswordPolicies[this.tenantId] = t);
  }
  _getPersistence() {
    return this.assertedPersistence.persistence.type;
  }
  _updateErrorMap(e) {
    this._errorFactory = new se('auth', 'Firebase', e());
  }
  onAuthStateChanged(e, t, n) {
    return this.registerStateListener(this.authStateSubscription, e, t, n);
  }
  beforeAuthStateChanged(e, t) {
    return this.beforeStateQueue.pushCallback(e, t);
  }
  onIdTokenChanged(e, t, n) {
    return this.registerStateListener(this.idTokenSubscription, e, t, n);
  }
  authStateReady() {
    return new Promise((e, t) => {
      if (this.currentUser) e();
      else {
        const n = this.onAuthStateChanged(() => {
          n(), e();
        }, t);
      }
    });
  }
  async revokeAccessToken(e) {
    if (this.currentUser) {
      const t = { providerId: 'apple.com', tokenType: 'ACCESS_TOKEN', token: e, idToken: await this.currentUser.getIdToken() };
      null != this.tenantId && (t.tenantId = this.tenantId),
        await (async function (e, t) {
          return un(e, 'POST', '/v2/accounts:revokeToken', cn(e, t));
        })(this, t);
    }
  }
  toJSON() {
    var e;
    return {
      apiKey: this.config.apiKey,
      authDomain: this.config.authDomain,
      appName: this.name,
      currentUser: null === (e = this._currentUser) || void 0 === e ? void 0 : e.toJSON(),
    };
  }
  async _setRedirectUser(e, t) {
    const n = await this.getOrInitRedirectPersistenceManager(t);
    return null === e ? n.removeCurrentUser() : n.setCurrentUser(e);
  }
  async getOrInitRedirectPersistenceManager(e) {
    if (!this.redirectPersistenceManager) {
      const t = (e && An(e)) || this._popupRedirectResolver;
      Xt(t, this, 'argument-error'),
        (this.redirectPersistenceManager = await On.create(this, [An(t._redirectPersistence)], 'redirectUser')),
        (this.redirectUser = await this.redirectPersistenceManager.getCurrentUser());
    }
    return this.redirectPersistenceManager;
  }
  async _redirectUserForId(e) {
    var t, n;
    return (
      this._isInitialized && (await this.queue(async () => {})),
      (null === (t = this._currentUser) || void 0 === t ? void 0 : t._redirectEventId) === e
        ? this._currentUser
        : (null === (n = this.redirectUser) || void 0 === n ? void 0 : n._redirectEventId) === e
        ? this.redirectUser
        : null
    );
  }
  async _persistUserIfCurrent(e) {
    if (e === this.currentUser) return this.queue(async () => this.directlySetCurrentUser(e));
  }
  _notifyListenersIfCurrent(e) {
    e === this.currentUser && this.notifyAuthListeners();
  }
  _key() {
    return `${this.config.authDomain}:${this.config.apiKey}:${this.name}`;
  }
  _startProactiveRefresh() {
    (this.isProactiveRefreshEnabled = !0), this.currentUser && this._currentUser._startProactiveRefresh();
  }
  _stopProactiveRefresh() {
    (this.isProactiveRefreshEnabled = !1), this.currentUser && this._currentUser._stopProactiveRefresh();
  }
  get _currentUser() {
    return this.currentUser;
  }
  notifyAuthListeners() {
    var e, t;
    if (!this._isInitialized) return;
    this.idTokenSubscription.next(this.currentUser);
    const n = null !== (t = null === (e = this.currentUser) || void 0 === e ? void 0 : e.uid) && void 0 !== t ? t : null;
    this.lastNotifiedUid !== n && ((this.lastNotifiedUid = n), this.authStateSubscription.next(this.currentUser));
  }
  registerStateListener(e, t, n, r) {
    if (this._deleted) return () => {};
    const s = 'function' == typeof t ? t : t.next.bind(t);
    let i = !1;
    const o = this._isInitialized ? Promise.resolve() : this._initializationPromise;
    if (
      (Xt(o, this, 'internal-error'),
      o.then(() => {
        i || s(this.currentUser);
      }),
      'function' == typeof t)
    ) {
      const s = e.addObserver(t, n, r);
      return () => {
        (i = !0), s();
      };
    }
    {
      const n = e.addObserver(t);
      return () => {
        (i = !0), n();
      };
    }
  }
  async directlySetCurrentUser(e) {
    this.currentUser && this.currentUser !== e && this._currentUser._stopProactiveRefresh(),
      e && this.isProactiveRefreshEnabled && e._startProactiveRefresh(),
      (this.currentUser = e),
      e ? await this.assertedPersistence.setCurrentUser(e) : await this.assertedPersistence.removeCurrentUser();
  }
  queue(e) {
    return (this.operations = this.operations.then(e, e)), this.operations;
  }
  get assertedPersistence() {
    return Xt(this.persistenceManager, this, 'internal-error'), this.persistenceManager;
  }
  _logFramework(e) {
    e &&
      !this.frameworks.includes(e) &&
      (this.frameworks.push(e), this.frameworks.sort(), (this.clientVersion = zn(this.config.clientPlatform, this._getFrameworks())));
  }
  _getFrameworks() {
    return this.frameworks;
  }
  async _getAdditionalHeaders() {
    var e;
    const t = { 'X-Client-Version': this.clientVersion };
    this.app.options.appId && (t['X-Firebase-gmpid'] = this.app.options.appId);
    const n = await (null === (e = this.heartbeatServiceProvider.getImmediate({ optional: !0 })) || void 0 === e
      ? void 0
      : e.getHeartbeatsHeader());
    n && (t['X-Firebase-Client'] = n);
    const r = await this._getAppCheckToken();
    return r && (t['X-Firebase-AppCheck'] = r), t;
  }
  async _getAppCheckToken() {
    var e;
    const t = await (null === (e = this.appCheckServiceProvider.getImmediate({ optional: !0 })) || void 0 === e ? void 0 : e.getToken());
    return (
      (null == t ? void 0 : t.error) &&
        (function (e, ...t) {
          qt.logLevel <= me.WARN && qt.warn(`Auth (${St}): ${e}`, ...t);
        })(`Error while retrieving App Check token: ${t.error}`),
      null == t ? void 0 : t.token
    );
  }
}
function Wn(e) {
  return le(e);
}
class Qn {
  constructor(e) {
    (this.auth = e),
      (this.observer = null),
      (this.addObserver = (function (e, t) {
        const n = new ue(e, t);
        return n.subscribe.bind(n);
      })(e => (this.observer = e)));
  }
  get next() {
    return Xt(this.observer, this.auth, 'internal-error'), this.observer.next.bind(this.observer);
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ let Xn = {
  async loadJS() {
    throw new Error('Unable to load external scripts');
  },
  recaptchaV2Script: '',
  recaptchaEnterpriseScript: '',
  gapiScript: '',
};
function Jn(e, t, n) {
  const r = Wn(e);
  Xt(r._canInitEmulator, r, 'emulator-config-failed'), Xt(/^https?:\/\//.test(t), r, 'invalid-emulator-scheme');
  const s = Yn(t),
    { host: i, port: o } = (function (e) {
      const t = Yn(e),
        n = /(\/\/)?([^?#/]+)/.exec(e.substr(t.length));
      if (!n) return { host: '', port: null };
      const r = n[2].split('@').pop() || '',
        s = /^(\[[^\]]+\])(:|$)/.exec(r);
      if (s) {
        const e = s[1];
        return { host: e, port: Zn(r.substr(e.length + 1)) };
      }
      {
        const [e, t] = r.split(':');
        return { host: e, port: Zn(t) };
      }
    })(t),
    a = null === o ? '' : `:${o}`;
  (r.config.emulator = { url: `${s}//${i}${a}/` }),
    (r.settings.appVerificationDisabledForTesting = !0),
    (r.emulatorConfig = Object.freeze({ host: i, port: o, protocol: s.replace(':', ''), options: Object.freeze({ disableWarnings: !1 }) })),
    (function () {
      function e() {
        const e = document.createElement('p'),
          t = e.style;
        (e.innerText = 'Running in emulator mode. Do not use with production credentials.'),
          (t.position = 'fixed'),
          (t.width = '100%'),
          (t.backgroundColor = '#ffffff'),
          (t.border = '.1em solid #000000'),
          (t.color = '#b50000'),
          (t.bottom = '0px'),
          (t.left = '0px'),
          (t.margin = '0px'),
          (t.zIndex = '10000'),
          (t.textAlign = 'center'),
          e.classList.add('firebase-emulator-warning'),
          document.body.appendChild(e);
      }
      'undefined' != typeof console &&
        'function' == typeof console.info &&
        console.info(
          'WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials.'
        );
      'undefined' != typeof window &&
        'undefined' != typeof document &&
        ('loading' === document.readyState ? window.addEventListener('DOMContentLoaded', e) : e());
    })();
    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
}
function Yn(e) {
  const t = e.indexOf(':');
  return t < 0 ? '' : e.substr(0, t + 1);
}
function Zn(e) {
  if (!e) return null;
  const t = Number(e);
  return isNaN(t) ? null : t;
}
class er {
  constructor(e, t) {
    (this.providerId = e), (this.signInMethod = t);
  }
  toJSON() {
    return Jt('not implemented');
  }
  _getIdTokenResponse(e) {
    return Jt('not implemented');
  }
  _linkToIdToken(e, t) {
    return Jt('not implemented');
  }
  _getReauthenticationResolver(e) {
    return Jt('not implemented');
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function tr(e, t) {
  return (async function (e, t, n, r, s = {}) {
    const i = await un(e, t, n, r, s);
    return 'mfaPendingCredential' in i && Ht(e, 'multi-factor-auth-required', { _serverResponse: i }), i;
  })(e, 'POST', '/v1/accounts:signInWithIdp', cn(e, t));
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class nr extends er {
  constructor() {
    super(...arguments), (this.pendingToken = null);
  }
  static _fromParams(e) {
    const t = new nr(e.providerId, e.signInMethod);
    return (
      e.idToken || e.accessToken
        ? (e.idToken && (t.idToken = e.idToken),
          e.accessToken && (t.accessToken = e.accessToken),
          e.nonce && !e.pendingToken && (t.nonce = e.nonce),
          e.pendingToken && (t.pendingToken = e.pendingToken))
        : e.oauthToken && e.oauthTokenSecret
        ? ((t.accessToken = e.oauthToken), (t.secret = e.oauthTokenSecret))
        : Ht('argument-error'),
      t
    );
  }
  toJSON() {
    return {
      idToken: this.idToken,
      accessToken: this.accessToken,
      secret: this.secret,
      nonce: this.nonce,
      pendingToken: this.pendingToken,
      providerId: this.providerId,
      signInMethod: this.signInMethod,
    };
  }
  static fromJSON(e) {
    const t = 'string' == typeof e ? JSON.parse(e) : e,
      { providerId: n, signInMethod: r } = t,
      s = Vt(t, ['providerId', 'signInMethod']);
    if (!n || !r) return null;
    const i = new nr(n, r);
    return (
      (i.idToken = s.idToken || void 0),
      (i.accessToken = s.accessToken || void 0),
      (i.secret = s.secret),
      (i.nonce = s.nonce),
      (i.pendingToken = s.pendingToken || null),
      i
    );
  }
  _getIdTokenResponse(e) {
    return tr(e, this.buildRequest());
  }
  _linkToIdToken(e, t) {
    const n = this.buildRequest();
    return (n.idToken = t), tr(e, n);
  }
  _getReauthenticationResolver(e) {
    const t = this.buildRequest();
    return (t.autoCreate = !1), tr(e, t);
  }
  buildRequest() {
    const e = { requestUri: 'http://localhost', returnSecureToken: !0 };
    if (this.pendingToken) e.pendingToken = this.pendingToken;
    else {
      const t = {};
      this.idToken && (t.id_token = this.idToken),
        this.accessToken && (t.access_token = this.accessToken),
        this.secret && (t.oauth_token_secret = this.secret),
        (t.providerId = this.providerId),
        this.nonce && !this.pendingToken && (t.nonce = this.nonce),
        (e.postBody = ce(t));
    }
    return e;
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class rr {
  constructor(e) {
    (this.providerId = e), (this.defaultLanguageCode = null), (this.customParameters = {});
  }
  setDefaultLanguage(e) {
    this.defaultLanguageCode = e;
  }
  setCustomParameters(e) {
    return (this.customParameters = e), this;
  }
  getCustomParameters() {
    return this.customParameters;
  }
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class sr extends rr {
  constructor() {
    super(...arguments), (this.scopes = []);
  }
  addScope(e) {
    return this.scopes.includes(e) || this.scopes.push(e), this;
  }
  getScopes() {
    return [...this.scopes];
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class ir extends sr {
  constructor() {
    super('facebook.com');
  }
  static credential(e) {
    return nr._fromParams({ providerId: ir.PROVIDER_ID, signInMethod: ir.FACEBOOK_SIGN_IN_METHOD, accessToken: e });
  }
  static credentialFromResult(e) {
    return ir.credentialFromTaggedObject(e);
  }
  static credentialFromError(e) {
    return ir.credentialFromTaggedObject(e.customData || {});
  }
  static credentialFromTaggedObject({ _tokenResponse: e }) {
    if (!e || !('oauthAccessToken' in e)) return null;
    if (!e.oauthAccessToken) return null;
    try {
      return ir.credential(e.oauthAccessToken);
    } catch (e) {
      return null;
    }
  }
}
(ir.FACEBOOK_SIGN_IN_METHOD = 'facebook.com'), (ir.PROVIDER_ID = 'facebook.com');
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class or extends sr {
  constructor() {
    super('google.com'), this.addScope('profile');
  }
  static credential(e, t) {
    return nr._fromParams({ providerId: or.PROVIDER_ID, signInMethod: or.GOOGLE_SIGN_IN_METHOD, idToken: e, accessToken: t });
  }
  static credentialFromResult(e) {
    return or.credentialFromTaggedObject(e);
  }
  static credentialFromError(e) {
    return or.credentialFromTaggedObject(e.customData || {});
  }
  static credentialFromTaggedObject({ _tokenResponse: e }) {
    if (!e) return null;
    const { oauthIdToken: t, oauthAccessToken: n } = e;
    if (!t && !n) return null;
    try {
      return or.credential(t, n);
    } catch (e) {
      return null;
    }
  }
}
(or.GOOGLE_SIGN_IN_METHOD = 'google.com'), (or.PROVIDER_ID = 'google.com');
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ar extends sr {
  constructor() {
    super('github.com');
  }
  static credential(e) {
    return nr._fromParams({ providerId: ar.PROVIDER_ID, signInMethod: ar.GITHUB_SIGN_IN_METHOD, accessToken: e });
  }
  static credentialFromResult(e) {
    return ar.credentialFromTaggedObject(e);
  }
  static credentialFromError(e) {
    return ar.credentialFromTaggedObject(e.customData || {});
  }
  static credentialFromTaggedObject({ _tokenResponse: e }) {
    if (!e || !('oauthAccessToken' in e)) return null;
    if (!e.oauthAccessToken) return null;
    try {
      return ar.credential(e.oauthAccessToken);
    } catch (e) {
      return null;
    }
  }
}
(ar.GITHUB_SIGN_IN_METHOD = 'github.com'), (ar.PROVIDER_ID = 'github.com');
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class cr extends sr {
  constructor() {
    super('twitter.com');
  }
  static credential(e, t) {
    return nr._fromParams({ providerId: cr.PROVIDER_ID, signInMethod: cr.TWITTER_SIGN_IN_METHOD, oauthToken: e, oauthTokenSecret: t });
  }
  static credentialFromResult(e) {
    return cr.credentialFromTaggedObject(e);
  }
  static credentialFromError(e) {
    return cr.credentialFromTaggedObject(e.customData || {});
  }
  static credentialFromTaggedObject({ _tokenResponse: e }) {
    if (!e) return null;
    const { oauthAccessToken: t, oauthTokenSecret: n } = e;
    if (!t || !n) return null;
    try {
      return cr.credential(t, n);
    } catch (e) {
      return null;
    }
  }
}
(cr.TWITTER_SIGN_IN_METHOD = 'twitter.com'), (cr.PROVIDER_ID = 'twitter.com');
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ur {
  constructor(e) {
    (this.user = e.user),
      (this.providerId = e.providerId),
      (this._tokenResponse = e._tokenResponse),
      (this.operationType = e.operationType);
  }
  static async _fromIdTokenResponse(e, t, n, r = !1) {
    const s = await Cn._fromIdTokenResponse(e, n, r),
      i = hr(n);
    return new ur({ user: s, providerId: i, _tokenResponse: n, operationType: t });
  }
  static async _forOperation(e, t, n) {
    await e._updateTokensIfNecessary(n, !0);
    const r = hr(n);
    return new ur({ user: e, providerId: r, _tokenResponse: n, operationType: t });
  }
}
function hr(e) {
  return e.providerId ? e.providerId : 'phoneNumber' in e ? 'phone' : null;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class lr extends re {
  constructor(e, t, n, r) {
    var s;
    super(t.code, t.message),
      (this.operationType = n),
      (this.user = r),
      Object.setPrototypeOf(this, lr.prototype),
      (this.customData = {
        appName: e.name,
        tenantId: null !== (s = e.tenantId) && void 0 !== s ? s : void 0,
        _serverResponse: t.customData._serverResponse,
        operationType: n,
      });
  }
  static _fromErrorAndOperation(e, t, n, r) {
    return new lr(e, t, n, r);
  }
}
function dr(e, t, n, r) {
  return ('reauthenticate' === t ? n._getReauthenticationResolver(e) : n._getIdTokenResponse(e)).catch(n => {
    if ('auth/multi-factor-auth-required' === n.code) throw lr._fromErrorAndOperation(e, n, t, r);
    throw n;
  });
}
const fr = '__sak';
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class pr {
  constructor(e, t) {
    (this.storageRetriever = e), (this.type = t);
  }
  _isAvailable() {
    try {
      return this.storage ? (this.storage.setItem(fr, '1'), this.storage.removeItem(fr), Promise.resolve(!0)) : Promise.resolve(!1);
    } catch (e) {
      return Promise.resolve(!1);
    }
  }
  _set(e, t) {
    return this.storage.setItem(e, JSON.stringify(t)), Promise.resolve();
  }
  _get(e) {
    const t = this.storage.getItem(e);
    return Promise.resolve(t ? JSON.parse(t) : null);
  }
  _remove(e) {
    return this.storage.removeItem(e), Promise.resolve();
  }
  get storage() {
    return this.storageRetriever();
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class gr extends pr {
  constructor() {
    super(() => window.localStorage, 'LOCAL'),
      (this.boundEventHandler = (e, t) => this.onStorageEvent(e, t)),
      (this.listeners = {}),
      (this.localCache = {}),
      (this.pollTimer = null),
      (this.fallbackToPolling = qn()),
      (this._shouldAllowMigration = !0);
  }
  forAllChangedKeys(e) {
    for (const t of Object.keys(this.listeners)) {
      const n = this.storage.getItem(t),
        r = this.localCache[t];
      n !== r && e(t, r, n);
    }
  }
  onStorageEvent(e, t = !1) {
    if (!e.key)
      return void this.forAllChangedKeys((e, t, n) => {
        this.notifyListeners(e, n);
      });
    const n = e.key;
    t ? this.detachListener() : this.stopPolling();
    const r = () => {
        const e = this.storage.getItem(n);
        (t || this.localCache[n] !== e) && this.notifyListeners(n, e);
      },
      s = this.storage.getItem(n);
    $n() && s !== e.newValue && e.newValue !== e.oldValue ? setTimeout(r, 10) : r();
  }
  notifyListeners(e, t) {
    this.localCache[e] = t;
    const n = this.listeners[e];
    if (n) for (const e of Array.from(n)) e(t ? JSON.parse(t) : t);
  }
  startPolling() {
    this.stopPolling(),
      (this.pollTimer = setInterval(() => {
        this.forAllChangedKeys((e, t, n) => {
          this.onStorageEvent(new StorageEvent('storage', { key: e, oldValue: t, newValue: n }), !0);
        });
      }, 1e3));
  }
  stopPolling() {
    this.pollTimer && (clearInterval(this.pollTimer), (this.pollTimer = null));
  }
  attachListener() {
    window.addEventListener('storage', this.boundEventHandler);
  }
  detachListener() {
    window.removeEventListener('storage', this.boundEventHandler);
  }
  _addListener(e, t) {
    0 === Object.keys(this.listeners).length && (this.fallbackToPolling ? this.startPolling() : this.attachListener()),
      this.listeners[e] || ((this.listeners[e] = new Set()), (this.localCache[e] = this.storage.getItem(e))),
      this.listeners[e].add(t);
  }
  _removeListener(e, t) {
    this.listeners[e] && (this.listeners[e].delete(t), 0 === this.listeners[e].size && delete this.listeners[e]),
      0 === Object.keys(this.listeners).length && (this.detachListener(), this.stopPolling());
  }
  async _set(e, t) {
    await super._set(e, t), (this.localCache[e] = JSON.stringify(t));
  }
  async _get(e) {
    const t = await super._get(e);
    return (this.localCache[e] = JSON.stringify(t)), t;
  }
  async _remove(e) {
    await super._remove(e), delete this.localCache[e];
  }
}
gr.type = 'LOCAL';
const mr = gr;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class yr extends pr {
  constructor() {
    super(() => window.sessionStorage, 'SESSION');
  }
  _addListener(e, t) {}
  _removeListener(e, t) {}
}
yr.type = 'SESSION';
const vr = yr;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class wr {
  constructor(e) {
    (this.eventTarget = e), (this.handlersMap = {}), (this.boundEventHandler = this.handleEvent.bind(this));
  }
  static _getInstance(e) {
    const t = this.receivers.find(t => t.isListeningto(e));
    if (t) return t;
    const n = new wr(e);
    return this.receivers.push(n), n;
  }
  isListeningto(e) {
    return this.eventTarget === e;
  }
  async handleEvent(e) {
    const t = e,
      { eventId: n, eventType: r, data: s } = t.data,
      i = this.handlersMap[r];
    if (!(null == i ? void 0 : i.size)) return;
    t.ports[0].postMessage({ status: 'ack', eventId: n, eventType: r });
    const o = Array.from(i).map(async e => e(t.origin, s)),
      a = await (function (e) {
        return Promise.all(
          e.map(async e => {
            try {
              return { fulfilled: !0, value: await e };
            } catch (e) {
              return { fulfilled: !1, reason: e };
            }
          })
        );
      })(o);
    t.ports[0].postMessage({ status: 'done', eventId: n, eventType: r, response: a });
  }
  _subscribe(e, t) {
    0 === Object.keys(this.handlersMap).length && this.eventTarget.addEventListener('message', this.boundEventHandler),
      this.handlersMap[e] || (this.handlersMap[e] = new Set()),
      this.handlersMap[e].add(t);
  }
  _unsubscribe(e, t) {
    this.handlersMap[e] && t && this.handlersMap[e].delete(t),
      (t && 0 !== this.handlersMap[e].size) || delete this.handlersMap[e],
      0 === Object.keys(this.handlersMap).length && this.eventTarget.removeEventListener('message', this.boundEventHandler);
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function _r(e = '', t = 10) {
  let n = '';
  for (let e = 0; e < t; e++) n += Math.floor(10 * Math.random());
  return e + n;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ wr.receivers = [];
class br {
  constructor(e) {
    (this.target = e), (this.handlers = new Set());
  }
  removeMessageHandler(e) {
    e.messageChannel && (e.messageChannel.port1.removeEventListener('message', e.onMessage), e.messageChannel.port1.close()),
      this.handlers.delete(e);
  }
  async _send(e, t, n = 50) {
    const r = 'undefined' != typeof MessageChannel ? new MessageChannel() : null;
    if (!r) throw new Error('connection_unavailable');
    let s, i;
    return new Promise((o, a) => {
      const c = _r('', 20);
      r.port1.start();
      const u = setTimeout(() => {
        a(new Error('unsupported_event'));
      }, n);
      (i = {
        messageChannel: r,
        onMessage(e) {
          const t = e;
          if (t.data.eventId === c)
            switch (t.data.status) {
              case 'ack':
                clearTimeout(u),
                  (s = setTimeout(() => {
                    a(new Error('timeout'));
                  }, 3e3));
                break;
              case 'done':
                clearTimeout(s), o(t.data.response);
                break;
              default:
                clearTimeout(u), clearTimeout(s), a(new Error('invalid_response'));
            }
        },
      }),
        this.handlers.add(i),
        r.port1.addEventListener('message', i.onMessage),
        this.target.postMessage({ eventType: e, eventId: c, data: t }, [r.port2]);
    }).finally(() => {
      i && this.removeMessageHandler(i);
    });
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Tr() {
  return window;
}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Er() {
  return void 0 !== Tr().WorkerGlobalScope && 'function' == typeof Tr().importScripts;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Ir = 'firebaseLocalStorageDb',
  Sr = 'firebaseLocalStorage',
  Cr = 'fbase_key';
class kr {
  constructor(e) {
    this.request = e;
  }
  toPromise() {
    return new Promise((e, t) => {
      this.request.addEventListener('success', () => {
        e(this.request.result);
      }),
        this.request.addEventListener('error', () => {
          t(this.request.error);
        });
    });
  }
}
function Ar(e, t) {
  return e.transaction([Sr], t ? 'readwrite' : 'readonly').objectStore(Sr);
}
function Nr() {
  const e = indexedDB.open(Ir, 1);
  return new Promise((t, n) => {
    e.addEventListener('error', () => {
      n(e.error);
    }),
      e.addEventListener('upgradeneeded', () => {
        const t = e.result;
        try {
          t.createObjectStore(Sr, { keyPath: Cr });
        } catch (e) {
          n(e);
        }
      }),
      e.addEventListener('success', async () => {
        const n = e.result;
        n.objectStoreNames.contains(Sr)
          ? t(n)
          : (n.close(),
            await (function () {
              const e = indexedDB.deleteDatabase(Ir);
              return new kr(e).toPromise();
            })(),
            t(await Nr()));
      });
  });
}
async function Rr(e, t, n) {
  const r = Ar(e, !0).put({ [Cr]: t, value: n });
  return new kr(r).toPromise();
}
function Dr(e, t) {
  const n = Ar(e, !0).delete(t);
  return new kr(n).toPromise();
}
class Or {
  constructor() {
    (this.type = 'LOCAL'),
      (this._shouldAllowMigration = !0),
      (this.listeners = {}),
      (this.localCache = {}),
      (this.pollTimer = null),
      (this.pendingWrites = 0),
      (this.receiver = null),
      (this.sender = null),
      (this.serviceWorkerReceiverAvailable = !1),
      (this.activeServiceWorker = null),
      (this._workerInitializationPromise = this.initializeServiceWorkerMessaging().then(
        () => {},
        () => {}
      ));
  }
  async _openDb() {
    return this.db || (this.db = await Nr()), this.db;
  }
  async _withRetries(e) {
    let t = 0;
    for (;;)
      try {
        const t = await this._openDb();
        return await e(t);
      } catch (e) {
        if (t++ > 3) throw e;
        this.db && (this.db.close(), (this.db = void 0));
      }
  }
  async initializeServiceWorkerMessaging() {
    return Er() ? this.initializeReceiver() : this.initializeSender();
  }
  async initializeReceiver() {
    (this.receiver = wr._getInstance(Er() ? self : null)),
      this.receiver._subscribe('keyChanged', async (e, t) => ({ keyProcessed: (await this._poll()).includes(t.key) })),
      this.receiver._subscribe('ping', async (e, t) => ['keyChanged']);
  }
  async initializeSender() {
    var e, t;
    if (
      ((this.activeServiceWorker = await (async function () {
        if (!(null === navigator || void 0 === navigator ? void 0 : navigator.serviceWorker)) return null;
        try {
          return (await navigator.serviceWorker.ready).active;
        } catch (e) {
          return null;
        }
      })()),
      !this.activeServiceWorker)
    )
      return;
    this.sender = new br(this.activeServiceWorker);
    const n = await this.sender._send('ping', {}, 800);
    n &&
      (null === (e = n[0]) || void 0 === e ? void 0 : e.fulfilled) &&
      (null === (t = n[0]) || void 0 === t ? void 0 : t.value.includes('keyChanged')) &&
      (this.serviceWorkerReceiverAvailable = !0);
  }
  async notifyServiceWorker(e) {
    var t;
    if (
      this.sender &&
      this.activeServiceWorker &&
      ((null === (t = null === navigator || void 0 === navigator ? void 0 : navigator.serviceWorker) || void 0 === t
        ? void 0
        : t.controller) || null) === this.activeServiceWorker
    )
      try {
        await this.sender._send('keyChanged', { key: e }, this.serviceWorkerReceiverAvailable ? 800 : 50);
      } catch (t) {}
  }
  async _isAvailable() {
    try {
      if (!indexedDB) return !1;
      const e = await Nr();
      return await Rr(e, fr, '1'), await Dr(e, fr), !0;
    } catch (e) {}
    return !1;
  }
  async _withPendingWrite(e) {
    this.pendingWrites++;
    try {
      await e();
    } finally {
      this.pendingWrites--;
    }
  }
  async _set(e, t) {
    return this._withPendingWrite(
      async () => (await this._withRetries(n => Rr(n, e, t)), (this.localCache[e] = t), this.notifyServiceWorker(e))
    );
  }
  async _get(e) {
    const t = await this._withRetries(t =>
      (async function (e, t) {
        const n = Ar(e, !1).get(t),
          r = await new kr(n).toPromise();
        return void 0 === r ? null : r.value;
      })(t, e)
    );
    return (this.localCache[e] = t), t;
  }
  async _remove(e) {
    return this._withPendingWrite(
      async () => (await this._withRetries(t => Dr(t, e)), delete this.localCache[e], this.notifyServiceWorker(e))
    );
  }
  async _poll() {
    const e = await this._withRetries(e => {
      const t = Ar(e, !1).getAll();
      return new kr(t).toPromise();
    });
    if (!e) return [];
    if (0 !== this.pendingWrites) return [];
    const t = [],
      n = new Set();
    if (0 !== e.length)
      for (const { fbase_key: r, value: s } of e)
        n.add(r), JSON.stringify(this.localCache[r]) !== JSON.stringify(s) && (this.notifyListeners(r, s), t.push(r));
    for (const e of Object.keys(this.localCache)) this.localCache[e] && !n.has(e) && (this.notifyListeners(e, null), t.push(e));
    return t;
  }
  notifyListeners(e, t) {
    this.localCache[e] = t;
    const n = this.listeners[e];
    if (n) for (const e of Array.from(n)) e(t);
  }
  startPolling() {
    this.stopPolling(), (this.pollTimer = setInterval(async () => this._poll(), 800));
  }
  stopPolling() {
    this.pollTimer && (clearInterval(this.pollTimer), (this.pollTimer = null));
  }
  _addListener(e, t) {
    0 === Object.keys(this.listeners).length && this.startPolling(),
      this.listeners[e] || ((this.listeners[e] = new Set()), this._get(e)),
      this.listeners[e].add(t);
  }
  _removeListener(e, t) {
    this.listeners[e] && (this.listeners[e].delete(t), 0 === this.listeners[e].size && delete this.listeners[e]),
      0 === Object.keys(this.listeners).length && this.stopPolling();
  }
}
Or.type = 'LOCAL';
const Pr = Or;
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function xr(e, t) {
  return t ? An(t) : (Xt(e._popupRedirectResolver, e, 'argument-error'), e._popupRedirectResolver);
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ new nn(3e4, 6e4);
class Lr extends er {
  constructor(e) {
    super('custom', 'custom'), (this.params = e);
  }
  _getIdTokenResponse(e) {
    return tr(e, this._buildIdpRequest());
  }
  _linkToIdToken(e, t) {
    return tr(e, this._buildIdpRequest(t));
  }
  _getReauthenticationResolver(e) {
    return tr(e, this._buildIdpRequest());
  }
  _buildIdpRequest(e) {
    const t = {
      requestUri: this.params.requestUri,
      sessionId: this.params.sessionId,
      postBody: this.params.postBody,
      tenantId: this.params.tenantId,
      pendingToken: this.params.pendingToken,
      returnSecureToken: !0,
      returnIdpCredential: !0,
    };
    return e && (t.idToken = e), t;
  }
}
function Mr(e) {
  /**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  return (async function (e, t, n = !1) {
    if (Tt(e.app)) return Promise.reject(Wt(e));
    const r = 'signIn',
      s = await dr(e, r, t),
      i = await ur._fromIdTokenResponse(e, r, s);
    return n || (await e._updateCurrentUser(i.user)), i;
  })(e.auth, new Lr(e), e.bypassAuthState);
}
function Ur(e) {
  const { auth: t, user: n } = e;
  return (
    Xt(n, t, 'internal-error'),
    /**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    (async function (e, t, n = !1) {
      const { auth: r } = e;
      if (Tt(r.app)) return Promise.reject(Wt(r));
      const s = 'reauthenticate';
      try {
        const i = await wn(e, dr(r, s, t, e), n);
        Xt(i.idToken, r, 'internal-error');
        const o = yn(i.idToken);
        Xt(o, r, 'internal-error');
        const { sub: a } = o;
        return Xt(e.uid === a, r, 'user-mismatch'), ur._forOperation(e, s, i);
      } catch (e) {
        throw ('auth/user-not-found' === (null == e ? void 0 : e.code) && Ht(r, 'user-mismatch'), e);
      }
    })(n, new Lr(e), e.bypassAuthState)
  );
}
async function Fr(e) {
  const { auth: t, user: n } = e;
  return (
    Xt(n, t, 'internal-error'),
    (async function (e, t, n = !1) {
      const r = await wn(e, t._linkToIdToken(e.auth, await e.getIdToken()), n);
      return ur._forOperation(e, 'link', r);
    })(n, new Lr(e), e.bypassAuthState)
  );
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Vr {
  constructor(e, t, n, r, s = !1) {
    (this.auth = e),
      (this.resolver = n),
      (this.user = r),
      (this.bypassAuthState = s),
      (this.pendingPromise = null),
      (this.eventManager = null),
      (this.filter = Array.isArray(t) ? t : [t]);
  }
  execute() {
    return new Promise(async (e, t) => {
      this.pendingPromise = { resolve: e, reject: t };
      try {
        (this.eventManager = await this.resolver._initialize(this.auth)),
          await this.onExecution(),
          this.eventManager.registerConsumer(this);
      } catch (e) {
        this.reject(e);
      }
    });
  }
  async onAuthEvent(e) {
    const { urlResponse: t, sessionId: n, postBody: r, tenantId: s, error: i, type: o } = e;
    if (i) return void this.reject(i);
    const a = {
      auth: this.auth,
      requestUri: t,
      sessionId: n,
      tenantId: s || void 0,
      postBody: r || void 0,
      user: this.user,
      bypassAuthState: this.bypassAuthState,
    };
    try {
      this.resolve(await this.getIdpTask(o)(a));
    } catch (e) {
      this.reject(e);
    }
  }
  onError(e) {
    this.reject(e);
  }
  getIdpTask(e) {
    switch (e) {
      case 'signInViaPopup':
      case 'signInViaRedirect':
        return Mr;
      case 'linkViaPopup':
      case 'linkViaRedirect':
        return Fr;
      case 'reauthViaPopup':
      case 'reauthViaRedirect':
        return Ur;
      default:
        Ht(this.auth, 'internal-error');
    }
  }
  resolve(e) {
    Yt(this.pendingPromise, 'Pending promise was never set'), this.pendingPromise.resolve(e), this.unregisterAndCleanUp();
  }
  reject(e) {
    Yt(this.pendingPromise, 'Pending promise was never set'), this.pendingPromise.reject(e), this.unregisterAndCleanUp();
  }
  unregisterAndCleanUp() {
    this.eventManager && this.eventManager.unregisterConsumer(this), (this.pendingPromise = null), this.cleanUp();
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const jr = new nn(2e3, 1e4);
async function Br(e, t, n) {
  if (Tt(e.app)) return Promise.reject(Gt(e, 'operation-not-supported-in-this-environment'));
  const r = Wn(e);
  !(function (e, t, n) {
    if (!(t instanceof n))
      throw (
        (n.name !== t.constructor.name && Ht(e, 'argument-error'),
        Kt(
          e,
          'argument-error',
          `Type of ${t.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`
        ))
      );
  })(e, t, rr);
  const s = xr(r, n);
  return new $r(r, 'signInViaPopup', t, s).executeNotNull();
}
class $r extends Vr {
  constructor(e, t, n, r, s) {
    super(e, t, r, s),
      (this.provider = n),
      (this.authWindow = null),
      (this.pollId = null),
      $r.currentPopupAction && $r.currentPopupAction.cancel(),
      ($r.currentPopupAction = this);
  }
  async executeNotNull() {
    const e = await this.execute();
    return Xt(e, this.auth, 'internal-error'), e;
  }
  async onExecution() {
    Yt(1 === this.filter.length, 'Popup operations only handle one event');
    const e = _r();
    (this.authWindow = await this.resolver._openPopup(this.auth, this.provider, this.filter[0], e)),
      (this.authWindow.associatedEvent = e),
      this.resolver._originValidation(this.auth).catch(e => {
        this.reject(e);
      }),
      this.resolver._isIframeWebStorageSupported(this.auth, e => {
        e || this.reject(Gt(this.auth, 'web-storage-unsupported'));
      }),
      this.pollUserCancellation();
  }
  get eventId() {
    var e;
    return (null === (e = this.authWindow) || void 0 === e ? void 0 : e.associatedEvent) || null;
  }
  cancel() {
    this.reject(Gt(this.auth, 'cancelled-popup-request'));
  }
  cleanUp() {
    this.authWindow && this.authWindow.close(),
      this.pollId && window.clearTimeout(this.pollId),
      (this.authWindow = null),
      (this.pollId = null),
      ($r.currentPopupAction = null);
  }
  pollUserCancellation() {
    const e = () => {
      var t, n;
      (null === (n = null === (t = this.authWindow) || void 0 === t ? void 0 : t.window) || void 0 === n ? void 0 : n.closed)
        ? (this.pollId = window.setTimeout(() => {
            (this.pollId = null), this.reject(Gt(this.auth, 'popup-closed-by-user'));
          }, 8e3))
        : (this.pollId = window.setTimeout(e, jr.get()));
    };
    e();
  }
}
$r.currentPopupAction = null;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const qr = 'pendingRedirect',
  zr = new Map();
class Hr extends Vr {
  constructor(e, t, n = !1) {
    super(e, ['signInViaRedirect', 'linkViaRedirect', 'reauthViaRedirect', 'unknown'], t, void 0, n), (this.eventId = null);
  }
  async execute() {
    let e = zr.get(this.auth._key());
    if (!e) {
      try {
        const t = await (async function (e, t) {
            const n = (function (e) {
                return Dn(qr, e.config.apiKey, e.name);
              })(t),
              r = (function (e) {
                return An(e._redirectPersistence);
              })(e);
            if (!(await r._isAvailable())) return !1;
            const s = 'true' === (await r._get(n));
            return await r._remove(n), s;
          })(this.resolver, this.auth),
          n = t ? await super.execute() : null;
        e = () => Promise.resolve(n);
      } catch (t) {
        e = () => Promise.reject(t);
      }
      zr.set(this.auth._key(), e);
    }
    return this.bypassAuthState || zr.set(this.auth._key(), () => Promise.resolve(null)), e();
  }
  async onAuthEvent(e) {
    if ('signInViaRedirect' === e.type) return super.onAuthEvent(e);
    if ('unknown' !== e.type) {
      if (e.eventId) {
        const t = await this.auth._redirectUserForId(e.eventId);
        if (t) return (this.user = t), super.onAuthEvent(e);
        this.resolve(null);
      }
    } else this.resolve(null);
  }
  async onExecution() {}
  cleanUp() {}
}
function Gr(e, t) {
  zr.set(e._key(), t);
}
async function Kr(e, t, n = !1) {
  if (Tt(e.app)) return Promise.reject(Wt(e));
  const r = Wn(e),
    s = xr(r, t),
    i = new Hr(r, s, n),
    o = await i.execute();
  return o && !n && (delete o.user._redirectEventId, await r._persistUserIfCurrent(o.user), await r._setRedirectUser(null, t)), o;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Wr {
  constructor(e) {
    (this.auth = e),
      (this.cachedEventUids = new Set()),
      (this.consumers = new Set()),
      (this.queuedRedirectEvent = null),
      (this.hasHandledPotentialRedirect = !1),
      (this.lastProcessedEventTime = Date.now());
  }
  registerConsumer(e) {
    this.consumers.add(e),
      this.queuedRedirectEvent &&
        this.isEventForConsumer(this.queuedRedirectEvent, e) &&
        (this.sendToConsumer(this.queuedRedirectEvent, e),
        this.saveEventToCache(this.queuedRedirectEvent),
        (this.queuedRedirectEvent = null));
  }
  unregisterConsumer(e) {
    this.consumers.delete(e);
  }
  onEvent(e) {
    if (this.hasEventBeenHandled(e)) return !1;
    let t = !1;
    return (
      this.consumers.forEach(n => {
        this.isEventForConsumer(e, n) && ((t = !0), this.sendToConsumer(e, n), this.saveEventToCache(e));
      }),
      this.hasHandledPotentialRedirect ||
        !(function (e) {
          switch (e.type) {
            case 'signInViaRedirect':
            case 'linkViaRedirect':
            case 'reauthViaRedirect':
              return !0;
            case 'unknown':
              return Xr(e);
            default:
              return !1;
          }
        })(
          /**
           * @license
           * Copyright 2020 Google LLC
           *
           * Licensed under the Apache License, Version 2.0 (the "License");
           * you may not use this file except in compliance with the License.
           * You may obtain a copy of the License at
           *
           *   http://www.apache.org/licenses/LICENSE-2.0
           *
           * Unless required by applicable law or agreed to in writing, software
           * distributed under the License is distributed on an "AS IS" BASIS,
           * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
           * See the License for the specific language governing permissions and
           * limitations under the License.
           */ e
        ) ||
        ((this.hasHandledPotentialRedirect = !0), t || ((this.queuedRedirectEvent = e), (t = !0))),
      t
    );
  }
  sendToConsumer(e, t) {
    var n;
    if (e.error && !Xr(e)) {
      const r = (null === (n = e.error.code) || void 0 === n ? void 0 : n.split('auth/')[1]) || 'internal-error';
      t.onError(Gt(this.auth, r));
    } else t.onAuthEvent(e);
  }
  isEventForConsumer(e, t) {
    const n = null === t.eventId || (!!e.eventId && e.eventId === t.eventId);
    return t.filter.includes(e.type) && n;
  }
  hasEventBeenHandled(e) {
    return Date.now() - this.lastProcessedEventTime >= 6e5 && this.cachedEventUids.clear(), this.cachedEventUids.has(Qr(e));
  }
  saveEventToCache(e) {
    this.cachedEventUids.add(Qr(e)), (this.lastProcessedEventTime = Date.now());
  }
}
function Qr(e) {
  return [e.type, e.eventId, e.sessionId, e.tenantId].filter(e => e).join('-');
}
function Xr({ type: e, error: t }) {
  return 'unknown' === e && 'auth/no-auth-event' === (null == t ? void 0 : t.code);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Jr = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,
  Yr = /^https?/;
async function Zr(e) {
  if (e.config.emulator) return;
  const { authorizedDomains: t } = await (async function (e, t = {}) {
    return un(e, 'GET', '/v1/projects', t);
  })(e);
  for (const e of t)
    try {
      if (es(e)) return;
    } catch (e) {}
  Ht(e, 'unauthorized-domain');
}
function es(e) {
  const t = Zt(),
    { protocol: n, hostname: r } = new URL(t);
  if (e.startsWith('chrome-extension://')) {
    const s = new URL(e);
    return '' === s.hostname && '' === r
      ? 'chrome-extension:' === n && e.replace('chrome-extension://', '') === t.replace('chrome-extension://', '')
      : 'chrome-extension:' === n && s.hostname === r;
  }
  if (!Yr.test(n)) return !1;
  if (Jr.test(e)) return r === e;
  const s = e.replace(/\./g, '\\.');
  return new RegExp('^(.+\\.' + s + '|' + s + ')$', 'i').test(r);
}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const ts = new nn(3e4, 6e4);
function ns() {
  const e = Tr().___jsl;
  if (null == e ? void 0 : e.H)
    for (const t of Object.keys(e.H))
      if (((e.H[t].r = e.H[t].r || []), (e.H[t].L = e.H[t].L || []), (e.H[t].r = [...e.H[t].L]), e.CP))
        for (let t = 0; t < e.CP.length; t++) e.CP[t] = null;
}
function rs(e) {
  return new Promise((t, n) => {
    var r, s, i, o;
    function a() {
      ns(),
        gapi.load('gapi.iframes', {
          callback: () => {
            t(gapi.iframes.getContext());
          },
          ontimeout: () => {
            ns(), n(Gt(e, 'network-request-failed'));
          },
          timeout: ts.get(),
        });
    }
    if (null === (s = null === (r = Tr().gapi) || void 0 === r ? void 0 : r.iframes) || void 0 === s ? void 0 : s.Iframe)
      t(gapi.iframes.getContext());
    else {
      if (!(null === (i = Tr().gapi) || void 0 === i ? void 0 : i.load)) {
        const t = `__${'iframefcb'}${Math.floor(1e6 * Math.random())}`;
        return (
          (Tr()[t] = () => {
            gapi.load ? a() : n(Gt(e, 'network-request-failed'));
          }),
          ((o = `${Xn.gapiScript}?onload=${t}`), Xn.loadJS(o)).catch(e => n(e))
        );
      }
      a();
    }
  }).catch(e => {
    throw ((ss = null), e);
  });
}
let ss = null;
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const is = new nn(5e3, 15e3),
  os = { style: { position: 'absolute', top: '-100px', width: '1px', height: '1px' }, 'aria-hidden': 'true', tabindex: '-1' },
  as = new Map([
    ['identitytoolkit.googleapis.com', 'p'],
    ['staging-identitytoolkit.sandbox.googleapis.com', 's'],
    ['test-identitytoolkit.sandbox.googleapis.com', 't'],
  ]);
function cs(e) {
  const t = e.config;
  Xt(t.authDomain, e, 'auth-domain-config-required');
  const n = t.emulator ? rn(t, 'emulator/auth/iframe') : `https://${e.config.authDomain}/__/auth/iframe`,
    r = { apiKey: t.apiKey, appName: e.name, v: St },
    s = as.get(e.config.apiHost);
  s && (r.eid = s);
  const i = e._getFrameworks();
  return i.length && (r.fw = i.join(',')), `${n}?${ce(r).slice(1)}`;
}
async function us(e) {
  const t = await (function (e) {
      return (ss = ss || rs(e)), ss;
    })(e),
    n = Tr().gapi;
  return (
    Xt(n, e, 'internal-error'),
    t.open(
      { where: document.body, url: cs(e), messageHandlersFilter: n.iframes.CROSS_ORIGIN_IFRAMES_FILTER, attributes: os, dontclear: !0 },
      t =>
        new Promise(async (n, r) => {
          await t.restyle({ setHideOnLeave: !1 });
          const s = Gt(e, 'network-request-failed'),
            i = Tr().setTimeout(() => {
              r(s);
            }, is.get());
          function o() {
            Tr().clearTimeout(i), n(t);
          }
          t.ping(o).then(o, () => {
            r(s);
          });
        })
    )
  );
}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const hs = { location: 'yes', resizable: 'yes', statusbar: 'yes', toolbar: 'no' };
class ls {
  constructor(e) {
    (this.window = e), (this.associatedEvent = null);
  }
  close() {
    if (this.window)
      try {
        this.window.close();
      } catch (e) {}
  }
}
function ds(e, t, n, r = 500, s = 600) {
  const i = Math.max((window.screen.availHeight - s) / 2, 0).toString(),
    o = Math.max((window.screen.availWidth - r) / 2, 0).toString();
  let a = '';
  const c = Object.assign(Object.assign({}, hs), { width: r.toString(), height: s.toString(), top: i, left: o }),
    u = te().toLowerCase();
  n && (a = Mn(u) ? '_blank' : n), xn(u) && ((t = t || 'http://localhost'), (c.scrollbars = 'yes'));
  const h = Object.entries(c).reduce((e, [t, n]) => `${e}${t}=${n},`, '');
  if (
    (function (e = te()) {
      var t;
      return Bn(e) && !!(null === (t = window.navigator) || void 0 === t ? void 0 : t.standalone);
    })(u) &&
    '_self' !== a
  )
    return (
      (function (e, t) {
        const n = document.createElement('a');
        (n.href = e), (n.target = t);
        const r = document.createEvent('MouseEvent');
        r.initMouseEvent('click', !0, !0, window, 1, 0, 0, 0, 0, !1, !1, !1, !1, 1, null), n.dispatchEvent(r);
      })(
        /**
         * @license
         * Copyright 2021 Google LLC
         *
         * Licensed under the Apache License, Version 2.0 (the "License");
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         *   http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */ t || '',
        a
      ),
      new ls(null)
    );
  const l = window.open(t || '', a, h);
  Xt(l, e, 'popup-blocked');
  try {
    l.focus();
  } catch (e) {}
  return new ls(l);
}
const fs = '__/auth/handler',
  ps = 'emulator/auth/handler',
  gs = encodeURIComponent('fac');
async function ms(e, t, n, r, s, i) {
  Xt(e.config.authDomain, e, 'auth-domain-config-required'), Xt(e.config.apiKey, e, 'invalid-api-key');
  const o = { apiKey: e.config.apiKey, appName: e.name, authType: n, redirectUrl: r, v: St, eventId: s };
  if (t instanceof rr) {
    t.setDefaultLanguage(e.languageCode),
      (o.providerId = t.providerId || ''),
      (function (e) {
        for (const t in e) if (Object.prototype.hasOwnProperty.call(e, t)) return !1;
        return !0;
      })(t.getCustomParameters()) || (o.customParameters = JSON.stringify(t.getCustomParameters()));
    for (const [e, t] of Object.entries({})) o[e] = t;
  }
  if (t instanceof sr) {
    const e = t.getScopes().filter(e => '' !== e);
    e.length > 0 && (o.scopes = e.join(','));
  }
  e.tenantId && (o.tid = e.tenantId);
  const a = o;
  for (const e of Object.keys(a)) void 0 === a[e] && delete a[e];
  const c = await e._getAppCheckToken(),
    u = c ? `#${gs}=${encodeURIComponent(c)}` : '';
  return `${(function ({ config: e }) {
    if (!e.emulator) return `https://${e.authDomain}/${fs}`;
    return rn(e, ps);
  })(
    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ e
  )}?${ce(a).slice(1)}${u}`;
}
const ys = 'webStorageSupport';
const vs = class {
  constructor() {
    (this.eventManagers = {}),
      (this.iframes = {}),
      (this.originValidationPromises = {}),
      (this._redirectPersistence = vr),
      (this._completeRedirectFn = Kr),
      (this._overrideRedirectResult = Gr);
  }
  async _openPopup(e, t, n, r) {
    var s;
    Yt(null === (s = this.eventManagers[e._key()]) || void 0 === s ? void 0 : s.manager, '_initialize() not called before _openPopup()');
    return ds(e, await ms(e, t, n, Zt(), r), _r());
  }
  async _openRedirect(e, t, n, r) {
    await this._originValidation(e);
    return (
      (function (e) {
        Tr().location.href = e;
      })(await ms(e, t, n, Zt(), r)),
      new Promise(() => {})
    );
  }
  _initialize(e) {
    const t = e._key();
    if (this.eventManagers[t]) {
      const { manager: e, promise: n } = this.eventManagers[t];
      return e ? Promise.resolve(e) : (Yt(n, 'If manager is not set, promise should be'), n);
    }
    const n = this.initAndGetManager(e);
    return (
      (this.eventManagers[t] = { promise: n }),
      n.catch(() => {
        delete this.eventManagers[t];
      }),
      n
    );
  }
  async initAndGetManager(e) {
    const t = await us(e),
      n = new Wr(e);
    return (
      t.register(
        'authEvent',
        t => {
          Xt(null == t ? void 0 : t.authEvent, e, 'invalid-auth-event');
          return { status: n.onEvent(t.authEvent) ? 'ACK' : 'ERROR' };
        },
        gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER
      ),
      (this.eventManagers[e._key()] = { manager: n }),
      (this.iframes[e._key()] = t),
      n
    );
  }
  _isIframeWebStorageSupported(e, t) {
    this.iframes[e._key()].send(
      ys,
      { type: ys },
      n => {
        var r;
        const s = null === (r = null == n ? void 0 : n[0]) || void 0 === r ? void 0 : r[ys];
        void 0 !== s && t(!!s), Ht(e, 'internal-error');
      },
      gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER
    );
  }
  _originValidation(e) {
    const t = e._key();
    return this.originValidationPromises[t] || (this.originValidationPromises[t] = Zr(e)), this.originValidationPromises[t];
  }
  get _shouldInitProactively() {
    return qn() || Ln() || Bn();
  }
};
var ws = '@firebase/auth',
  _s = '1.8.0';
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class bs {
  constructor(e) {
    (this.auth = e), (this.internalListeners = new Map());
  }
  getUid() {
    var e;
    return this.assertAuthConfigured(), (null === (e = this.auth.currentUser) || void 0 === e ? void 0 : e.uid) || null;
  }
  async getToken(e) {
    if ((this.assertAuthConfigured(), await this.auth._initializationPromise, !this.auth.currentUser)) return null;
    return { accessToken: await this.auth.currentUser.getIdToken(e) };
  }
  addAuthTokenListener(e) {
    if ((this.assertAuthConfigured(), this.internalListeners.has(e))) return;
    const t = this.auth.onIdTokenChanged(t => {
      e((null == t ? void 0 : t.stsTokenManager.accessToken) || null);
    });
    this.internalListeners.set(e, t), this.updateProactiveRefresh();
  }
  removeAuthTokenListener(e) {
    this.assertAuthConfigured();
    const t = this.internalListeners.get(e);
    t && (this.internalListeners.delete(e), t(), this.updateProactiveRefresh());
  }
  assertAuthConfigured() {
    Xt(this.auth._initializationPromise, 'dependent-sdk-initialized-before-auth');
  }
  updateProactiveRefresh() {
    this.internalListeners.size > 0 ? this.auth._startProactiveRefresh() : this.auth._stopProactiveRefresh();
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Ts = Y('authIdTokenMaxAge') || 300;
let Es = null;
var Is, Ss;
(Is = {
  loadJS: e =>
    new Promise((t, n) => {
      const r = document.createElement('script');
      var s, i;
      r.setAttribute('src', e),
        (r.onload = t),
        (r.onerror = e => {
          const t = Gt('internal-error');
          (t.customData = e), n(t);
        }),
        (r.type = 'text/javascript'),
        (r.charset = 'UTF-8'),
        (null !== (i = null === (s = document.getElementsByTagName('head')) || void 0 === s ? void 0 : s[0]) && void 0 !== i
          ? i
          : document
        ).appendChild(r);
    }),
  gapiScript: 'https://apis.google.com/js/api.js',
  recaptchaV2Script: 'https://www.google.com/recaptcha/api.js',
  recaptchaEnterpriseScript: 'https://www.google.com/recaptcha/enterprise.js?render=',
}),
  (Xn = Is),
  (Ss = 'Browser'),
  _t(
    new de(
      'auth',
      (e, { options: t }) => {
        const n = e.getProvider('app').getImmediate(),
          r = e.getProvider('heartbeat'),
          s = e.getProvider('app-check-internal'),
          { apiKey: i, authDomain: o } = n.options;
        Xt(i && !i.includes(':'), 'invalid-api-key', { appName: n.name });
        const a = {
            apiKey: i,
            authDomain: o,
            clientPlatform: Ss,
            apiHost: 'identitytoolkit.googleapis.com',
            tokenApiHost: 'securetoken.googleapis.com',
            apiScheme: 'https',
            sdkClientVersion: zn(Ss),
          },
          c = new Kn(n, r, s, a);
        return (
          (function (e, t) {
            const n = (null == t ? void 0 : t.persistence) || [],
              r = (Array.isArray(n) ? n : [n]).map(An);
            (null == t ? void 0 : t.errorMap) && e._updateErrorMap(t.errorMap),
              e._initializeWithPersistence(r, null == t ? void 0 : t.popupRedirectResolver);
          })(c, t),
          c
        );
      },
      'PUBLIC'
    )
      .setInstantiationMode('EXPLICIT')
      .setInstanceCreatedCallback((e, t, n) => {
        e.getProvider('auth-internal').initialize();
      })
  ),
  _t(new de('auth-internal', e => (e => new bs(e))(Wn(e.getProvider('auth').getImmediate())), 'PRIVATE').setInstantiationMode('EXPLICIT')),
  At(
    ws,
    _s,
    (function (e) {
      switch (e) {
        case 'Node':
          return 'node';
        case 'ReactNative':
          return 'rn';
        case 'Worker':
          return 'webworker';
        case 'Cordova':
          return 'cordova';
        case 'WebExtension':
          return 'web-extension';
        default:
          return;
      }
    })(Ss)
  ),
  At(ws, _s, 'esm2017');
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
At('firebase', '11.0.1', 'app');
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Cs = 'firebasestorage.googleapis.com',
  ks = 'storageBucket';
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class As extends re {
  constructor(e, t, n = 0) {
    super(Ds(e), `Firebase Storage: ${t} (${Ds(e)})`),
      (this.status_ = n),
      (this.customData = { serverResponse: null }),
      (this._baseMessage = this.message),
      Object.setPrototypeOf(this, As.prototype);
  }
  get status() {
    return this.status_;
  }
  set status(e) {
    this.status_ = e;
  }
  _codeEquals(e) {
    return Ds(e) === this.code;
  }
  get serverResponse() {
    return this.customData.serverResponse;
  }
  set serverResponse(e) {
    (this.customData.serverResponse = e),
      this.customData.serverResponse
        ? (this.message = `${this._baseMessage}\n${this.customData.serverResponse}`)
        : (this.message = this._baseMessage);
  }
}
var Ns, Rs;
function Ds(e) {
  return 'storage/' + e;
}
function Os() {
  return new As(Ns.UNKNOWN, 'An unknown error occurred, please check the error payload for server response.');
}
function Ps() {
  return new As(Ns.RETRY_LIMIT_EXCEEDED, 'Max retry time for operation exceeded, please try again.');
}
function xs() {
  return new As(Ns.CANCELED, 'User canceled the upload/download.');
}
function Ls() {
  return new As(Ns.CANNOT_SLICE_BLOB, 'Cannot slice blob for upload. Please retry the upload.');
}
function Ms(e) {
  return new As(Ns.INVALID_ARGUMENT, e);
}
function Us() {
  return new As(Ns.APP_DELETED, 'The Firebase app was deleted.');
}
function Fs(e, t) {
  return new As(Ns.INVALID_FORMAT, "String does not match format '" + e + "': " + t);
}
function Vs(e) {
  throw new As(Ns.INTERNAL_ERROR, 'Internal error: ' + e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ !(function (e) {
  (e.UNKNOWN = 'unknown'),
    (e.OBJECT_NOT_FOUND = 'object-not-found'),
    (e.BUCKET_NOT_FOUND = 'bucket-not-found'),
    (e.PROJECT_NOT_FOUND = 'project-not-found'),
    (e.QUOTA_EXCEEDED = 'quota-exceeded'),
    (e.UNAUTHENTICATED = 'unauthenticated'),
    (e.UNAUTHORIZED = 'unauthorized'),
    (e.UNAUTHORIZED_APP = 'unauthorized-app'),
    (e.RETRY_LIMIT_EXCEEDED = 'retry-limit-exceeded'),
    (e.INVALID_CHECKSUM = 'invalid-checksum'),
    (e.CANCELED = 'canceled'),
    (e.INVALID_EVENT_NAME = 'invalid-event-name'),
    (e.INVALID_URL = 'invalid-url'),
    (e.INVALID_DEFAULT_BUCKET = 'invalid-default-bucket'),
    (e.NO_DEFAULT_BUCKET = 'no-default-bucket'),
    (e.CANNOT_SLICE_BLOB = 'cannot-slice-blob'),
    (e.SERVER_FILE_WRONG_SIZE = 'server-file-wrong-size'),
    (e.NO_DOWNLOAD_URL = 'no-download-url'),
    (e.INVALID_ARGUMENT = 'invalid-argument'),
    (e.INVALID_ARGUMENT_COUNT = 'invalid-argument-count'),
    (e.APP_DELETED = 'app-deleted'),
    (e.INVALID_ROOT_OPERATION = 'invalid-root-operation'),
    (e.INVALID_FORMAT = 'invalid-format'),
    (e.INTERNAL_ERROR = 'internal-error'),
    (e.UNSUPPORTED_ENVIRONMENT = 'unsupported-environment');
})(Ns || (Ns = {}));
class js {
  constructor(e, t) {
    (this.bucket = e), (this.path_ = t);
  }
  get path() {
    return this.path_;
  }
  get isRoot() {
    return 0 === this.path.length;
  }
  fullServerUrl() {
    const e = encodeURIComponent;
    return '/b/' + e(this.bucket) + '/o/' + e(this.path);
  }
  bucketOnlyServerUrl() {
    return '/b/' + encodeURIComponent(this.bucket) + '/o';
  }
  static makeFromBucketSpec(e, t) {
    let n;
    try {
      n = js.makeFromUrl(e, t);
    } catch (t) {
      return new js(e, '');
    }
    if ('' === n.path) return n;
    throw ((r = e), new As(Ns.INVALID_DEFAULT_BUCKET, "Invalid default bucket '" + r + "'."));
    var r;
  }
  static makeFromUrl(e, t) {
    let n = null;
    const r = '([A-Za-z0-9.\\-_]+)';
    const s = new RegExp('^gs://' + r + '(/(.*))?$', 'i');
    function i(e) {
      e.path_ = decodeURIComponent(e.path);
    }
    const o = t.replace(/[.]/g, '\\.'),
      a = [
        {
          regex: s,
          indices: { bucket: 1, path: 3 },
          postModify: function (e) {
            '/' === e.path.charAt(e.path.length - 1) && (e.path_ = e.path_.slice(0, -1));
          },
        },
        { regex: new RegExp(`^https?://${o}/v[A-Za-z0-9_]+/b/${r}/o(/([^?#]*).*)?$`, 'i'), indices: { bucket: 1, path: 3 }, postModify: i },
        {
          regex: new RegExp(`^https?://${t === Cs ? '(?:storage.googleapis.com|storage.cloud.google.com)' : t}/${r}/([^?#]*)`, 'i'),
          indices: { bucket: 1, path: 2 },
          postModify: i,
        },
      ];
    for (let t = 0; t < a.length; t++) {
      const r = a[t],
        s = r.regex.exec(e);
      if (s) {
        const e = s[r.indices.bucket];
        let t = s[r.indices.path];
        t || (t = ''), (n = new js(e, t)), r.postModify(n);
        break;
      }
    }
    if (null == n)
      throw (function (e) {
        return new As(Ns.INVALID_URL, "Invalid URL '" + e + "'.");
      })(e);
    return n;
  }
}
class Bs {
  constructor(e) {
    this.promise_ = Promise.reject(e);
  }
  getPromise() {
    return this.promise_;
  }
  cancel(e = !1) {}
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function $s(e) {
  return 'string' == typeof e || e instanceof String;
}
function qs(e) {
  return zs() && e instanceof Blob;
}
function zs() {
  return 'undefined' != typeof Blob;
}
function Hs(e, t, n, r) {
  if (r < t) throw Ms(`Invalid value for '${e}'. Expected ${t} or greater.`);
  if (r > n) throw Ms(`Invalid value for '${e}'. Expected ${n} or less.`);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Gs(e, t, n) {
  let r = t;
  return null == n && (r = `https://${t}`), `${n}://${r}/v0${e}`;
}
function Ks(e) {
  const t = encodeURIComponent;
  let n = '?';
  for (const r in e)
    if (e.hasOwnProperty(r)) {
      n = n + (t(r) + '=' + t(e[r])) + '&';
    }
  return (n = n.slice(0, -1)), n;
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Ws(e, t) {
  const n = e >= 500 && e < 600,
    r = -1 !== [408, 429].indexOf(e),
    s = -1 !== t.indexOf(e);
  return n || r || s;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ !(function (e) {
  (e[(e.NO_ERROR = 0)] = 'NO_ERROR'), (e[(e.NETWORK_ERROR = 1)] = 'NETWORK_ERROR'), (e[(e.ABORT = 2)] = 'ABORT');
})(Rs || (Rs = {}));
class Qs {
  constructor(e, t, n, r, s, i, o, a, c, u, h, l = !0) {
    (this.url_ = e),
      (this.method_ = t),
      (this.headers_ = n),
      (this.body_ = r),
      (this.successCodes_ = s),
      (this.additionalRetryCodes_ = i),
      (this.callback_ = o),
      (this.errorCallback_ = a),
      (this.timeout_ = c),
      (this.progressCallback_ = u),
      (this.connectionFactory_ = h),
      (this.retry = l),
      (this.pendingConnection_ = null),
      (this.backoffId_ = null),
      (this.canceled_ = !1),
      (this.appDelete_ = !1),
      (this.promise_ = new Promise((e, t) => {
        (this.resolve_ = e), (this.reject_ = t), this.start_();
      }));
  }
  start_() {
    const e = (e, t) => {
        if (t) return void e(!1, new Xs(!1, null, !0));
        const n = this.connectionFactory_();
        this.pendingConnection_ = n;
        const r = e => {
          const t = e.loaded,
            n = e.lengthComputable ? e.total : -1;
          null !== this.progressCallback_ && this.progressCallback_(t, n);
        };
        null !== this.progressCallback_ && n.addUploadProgressListener(r),
          n.send(this.url_, this.method_, this.body_, this.headers_).then(() => {
            null !== this.progressCallback_ && n.removeUploadProgressListener(r), (this.pendingConnection_ = null);
            const t = n.getErrorCode() === Rs.NO_ERROR,
              s = n.getStatus();
            if (!t || (Ws(s, this.additionalRetryCodes_) && this.retry)) {
              const t = n.getErrorCode() === Rs.ABORT;
              return void e(!1, new Xs(!1, null, t));
            }
            const i = -1 !== this.successCodes_.indexOf(s);
            e(!0, new Xs(i, n));
          });
      },
      t = (e, t) => {
        const n = this.resolve_,
          r = this.reject_,
          s = t.connection;
        if (t.wasSuccessCode)
          try {
            const e = this.callback_(s, s.getResponse());
            !(
              /**
               * @license
               * Copyright 2017 Google LLC
               *
               * Licensed under the Apache License, Version 2.0 (the "License");
               * you may not use this file except in compliance with the License.
               * You may obtain a copy of the License at
               *
               *   http://www.apache.org/licenses/LICENSE-2.0
               *
               * Unless required by applicable law or agreed to in writing, software
               * distributed under the License is distributed on an "AS IS" BASIS,
               * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
               * See the License for the specific language governing permissions and
               * limitations under the License.
               */
              (function (e) {
                return void 0 !== e;
              })(e)
            )
              ? n()
              : n(e);
          } catch (e) {
            r(e);
          }
        else if (null !== s) {
          const e = Os();
          (e.serverResponse = s.getErrorText()), this.errorCallback_ ? r(this.errorCallback_(s, e)) : r(e);
        } else if (t.canceled) {
          r(this.appDelete_ ? Us() : xs());
        } else {
          r(Ps());
        }
      };
    this.canceled_
      ? t(0, new Xs(!1, null, !0))
      : (this.backoffId_ = (function (e, t, n) {
          let r = 1,
            s = null,
            i = null,
            o = !1,
            a = 0;
          function c() {
            return 2 === a;
          }
          let u = !1;
          function h(...e) {
            u || ((u = !0), t.apply(null, e));
          }
          function l(t) {
            s = setTimeout(() => {
              (s = null), e(f, c());
            }, t);
          }
          function d() {
            i && clearTimeout(i);
          }
          function f(e, ...t) {
            if (u) return void d();
            if (e) return d(), void h.call(null, e, ...t);
            if (c() || o) return d(), void h.call(null, e, ...t);
            let n;
            r < 64 && (r *= 2), 1 === a ? ((a = 2), (n = 0)) : (n = 1e3 * (r + Math.random())), l(n);
          }
          let p = !1;
          function g(e) {
            p || ((p = !0), d(), u || (null !== s ? (e || (a = 2), clearTimeout(s), l(0)) : e || (a = 1)));
          }
          return (
            l(0),
            (i = setTimeout(() => {
              (o = !0), g(!0);
            }, n)),
            g
          );
        })(e, t, this.timeout_));
  }
  getPromise() {
    return this.promise_;
  }
  cancel(e) {
    (this.canceled_ = !0),
      (this.appDelete_ = e || !1),
      null !== this.backoffId_ && (0, this.backoffId_)(!1),
      null !== this.pendingConnection_ && this.pendingConnection_.abort();
  }
}
class Xs {
  constructor(e, t, n) {
    (this.wasSuccessCode = e), (this.connection = t), (this.canceled = !!n);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Js() {
  return 'undefined' != typeof BlobBuilder ? BlobBuilder : 'undefined' != typeof WebKitBlobBuilder ? WebKitBlobBuilder : void 0;
}
function Ys(...e) {
  const t = Js();
  if (void 0 !== t) {
    const n = new t();
    for (let t = 0; t < e.length; t++) n.append(e[t]);
    return n.getBlob();
  }
  if (zs()) return new Blob(e);
  throw new As(Ns.UNSUPPORTED_ENVIRONMENT, "This browser doesn't seem to support creating Blobs");
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Zs(e) {
  if ('undefined' == typeof atob)
    throw (
      ((t = 'base-64'),
      new As(
        Ns.UNSUPPORTED_ENVIRONMENT,
        `${t} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`
      ))
    );
  var t;
  return atob(e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const ei = 'raw',
  ti = 'base64',
  ni = 'base64url',
  ri = 'data_url';
class si {
  constructor(e, t) {
    (this.data = e), (this.contentType = t || null);
  }
}
function ii(e, t) {
  switch (e) {
    case ei:
      return new si(oi(t));
    case ti:
    case ni:
      return new si(ai(e, t));
    case ri:
      return new si(
        (function (e) {
          const t = new ci(e);
          return t.base64
            ? ai(ti, t.rest)
            : (function (e) {
                let t;
                try {
                  t = decodeURIComponent(e);
                } catch (e) {
                  throw Fs(ri, 'Malformed data URL.');
                }
                return oi(t);
              })(t.rest);
        })(t),
        new ci(t).contentType
      );
  }
  throw Os();
}
function oi(e) {
  const t = [];
  for (let n = 0; n < e.length; n++) {
    let r = e.charCodeAt(n);
    if (r <= 127) t.push(r);
    else if (r <= 2047) t.push(192 | (r >> 6), 128 | (63 & r));
    else if (55296 == (64512 & r)) {
      if (n < e.length - 1 && 56320 == (64512 & e.charCodeAt(n + 1))) {
        (r = 65536 | ((1023 & r) << 10) | (1023 & e.charCodeAt(++n))),
          t.push(240 | (r >> 18), 128 | ((r >> 12) & 63), 128 | ((r >> 6) & 63), 128 | (63 & r));
      } else t.push(239, 191, 189);
    } else 56320 == (64512 & r) ? t.push(239, 191, 189) : t.push(224 | (r >> 12), 128 | ((r >> 6) & 63), 128 | (63 & r));
  }
  return new Uint8Array(t);
}
function ai(e, t) {
  switch (e) {
    case ti: {
      const n = -1 !== t.indexOf('-'),
        r = -1 !== t.indexOf('_');
      if (n || r) {
        throw Fs(e, "Invalid character '" + (n ? '-' : '_') + "' found: is it base64url encoded?");
      }
      break;
    }
    case ni: {
      const n = -1 !== t.indexOf('+'),
        r = -1 !== t.indexOf('/');
      if (n || r) {
        throw Fs(e, "Invalid character '" + (n ? '+' : '/') + "' found: is it base64 encoded?");
      }
      t = t.replace(/-/g, '+').replace(/_/g, '/');
      break;
    }
  }
  let n;
  try {
    n = Zs(t);
  } catch (t) {
    if (t.message.includes('polyfill')) throw t;
    throw Fs(e, 'Invalid character found');
  }
  const r = new Uint8Array(n.length);
  for (let e = 0; e < n.length; e++) r[e] = n.charCodeAt(e);
  return r;
}
class ci {
  constructor(e) {
    (this.base64 = !1), (this.contentType = null);
    const t = e.match(/^data:([^,]+)?,/);
    if (null === t) throw Fs(ri, "Must be formatted 'data:[<mediatype>][;base64],<data>");
    const n = t[1] || null;
    null != n &&
      ((this.base64 = (function (e, t) {
        const n = e.length >= t.length;
        if (!n) return !1;
        return e.substring(e.length - t.length) === t;
      })(
        /**
         * @license
         * Copyright 2017 Google LLC
         *
         * Licensed under the Apache License, Version 2.0 (the "License");
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         *   http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */ n,
        ';base64'
      )),
      (this.contentType = this.base64 ? n.substring(0, n.length - 7) : n)),
      (this.rest = e.substring(e.indexOf(',') + 1));
  }
}
class ui {
  constructor(e, t) {
    let n = 0,
      r = '';
    qs(e)
      ? ((this.data_ = e), (n = e.size), (r = e.type))
      : e instanceof ArrayBuffer
      ? (t ? (this.data_ = new Uint8Array(e)) : ((this.data_ = new Uint8Array(e.byteLength)), this.data_.set(new Uint8Array(e))),
        (n = this.data_.length))
      : e instanceof Uint8Array && (t ? (this.data_ = e) : ((this.data_ = new Uint8Array(e.length)), this.data_.set(e)), (n = e.length)),
      (this.size_ = n),
      (this.type_ = r);
  }
  size() {
    return this.size_;
  }
  type() {
    return this.type_;
  }
  slice(e, t) {
    if (qs(this.data_)) {
      const n = (function (e, t, n) {
        return e.webkitSlice ? e.webkitSlice(t, n) : e.mozSlice ? e.mozSlice(t, n) : e.slice ? e.slice(t, n) : null;
      })(this.data_, e, t);
      return null === n ? null : new ui(n);
    }
    {
      const n = new Uint8Array(this.data_.buffer, e, t - e);
      return new ui(n, !0);
    }
  }
  static getBlob(...e) {
    if (zs()) {
      const t = e.map(e => (e instanceof ui ? e.data_ : e));
      return new ui(Ys.apply(null, t));
    }
    {
      const t = e.map(e => ($s(e) ? ii(ei, e).data : e.data_));
      let n = 0;
      t.forEach(e => {
        n += e.byteLength;
      });
      const r = new Uint8Array(n);
      let s = 0;
      return (
        t.forEach(e => {
          for (let t = 0; t < e.length; t++) r[s++] = e[t];
        }),
        new ui(r, !0)
      );
    }
  }
  uploadData() {
    return this.data_;
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function hi(e) {
  let t;
  try {
    t = JSON.parse(e);
  } catch (e) {
    return null;
  }
  return (function (e) {
    return 'object' == typeof e && !Array.isArray(e);
  })(t)
    ? t
    : null;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function li(e) {
  const t = e.lastIndexOf('/', e.length - 2);
  return -1 === t ? e : e.slice(t + 1);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function di(e, t) {
  return t;
}
class fi {
  constructor(e, t, n, r) {
    (this.server = e), (this.local = t || e), (this.writable = !!n), (this.xform = r || di);
  }
}
let pi = null;
function gi() {
  if (pi) return pi;
  const e = [];
  e.push(new fi('bucket')), e.push(new fi('generation')), e.push(new fi('metageneration')), e.push(new fi('name', 'fullPath', !0));
  const t = new fi('name');
  (t.xform = function (e, t) {
    return (function (e) {
      return !$s(e) || e.length < 2 ? e : li(e);
    })(t);
  }),
    e.push(t);
  const n = new fi('size');
  return (
    (n.xform = function (e, t) {
      return void 0 !== t ? Number(t) : t;
    }),
    e.push(n),
    e.push(new fi('timeCreated')),
    e.push(new fi('updated')),
    e.push(new fi('md5Hash', null, !0)),
    e.push(new fi('cacheControl', null, !0)),
    e.push(new fi('contentDisposition', null, !0)),
    e.push(new fi('contentEncoding', null, !0)),
    e.push(new fi('contentLanguage', null, !0)),
    e.push(new fi('contentType', null, !0)),
    e.push(new fi('metadata', 'customMetadata', !0)),
    (pi = e),
    pi
  );
}
function mi(e, t, n) {
  const r = { type: 'file' },
    s = n.length;
  for (let e = 0; e < s; e++) {
    const s = n[e];
    r[s.local] = s.xform(r, t[s.server]);
  }
  return (
    (function (e, t) {
      Object.defineProperty(e, 'ref', {
        get: function () {
          const n = e.bucket,
            r = e.fullPath,
            s = new js(n, r);
          return t._makeStorageReference(s);
        },
      });
    })(r, e),
    r
  );
}
function yi(e, t, n) {
  const r = hi(t);
  if (null === r) return null;
  return mi(e, r, n);
}
function vi(e, t) {
  const n = {},
    r = t.length;
  for (let s = 0; s < r; s++) {
    const r = t[s];
    r.writable && (n[r.server] = e[r.local]);
  }
  return JSON.stringify(n);
}
class wi {
  constructor(e, t, n, r) {
    (this.url = e),
      (this.method = t),
      (this.handler = n),
      (this.timeout = r),
      (this.urlParams = {}),
      (this.headers = {}),
      (this.body = null),
      (this.errorHandler = null),
      (this.progressCallback = null),
      (this.successCodes = [200]),
      (this.additionalRetryCodes = []);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function _i(e) {
  if (!e) throw Os();
}
function bi(e, t) {
  return function (n, r) {
    const s = yi(e, r, t);
    return _i(null !== s), s;
  };
}
function Ti(e, t) {
  return function (n, r) {
    const s = yi(e, r, t);
    return (
      _i(null !== s),
      (function (e, t, n, r) {
        const s = hi(t);
        if (null === s) return null;
        if (!$s(s.downloadTokens)) return null;
        const i = s.downloadTokens;
        if (0 === i.length) return null;
        const o = encodeURIComponent;
        return i.split(',').map(t => {
          const s = e.bucket,
            i = e.fullPath;
          return Gs('/b/' + o(s) + '/o/' + o(i), n, r) + Ks({ alt: 'media', token: t });
        })[0];
      })(s, r, e.host, e._protocol)
    );
  };
}
function Ei(e) {
  return function (t, n) {
    let r;
    var s, i;
    return (
      401 === t.getStatus()
        ? (r = t.getErrorText().includes('Firebase App Check token is invalid')
            ? new As(Ns.UNAUTHORIZED_APP, 'This app does not have permission to access Firebase Storage on this project.')
            : new As(Ns.UNAUTHENTICATED, 'User is not authenticated, please authenticate using Firebase Authentication and try again.'))
        : 402 === t.getStatus()
        ? ((i = e.bucket),
          (r = new As(
            Ns.QUOTA_EXCEEDED,
            "Quota for bucket '" + i + "' exceeded, please view quota on https://firebase.google.com/pricing/."
          )))
        : 403 === t.getStatus()
        ? ((s = e.path), (r = new As(Ns.UNAUTHORIZED, "User does not have permission to access '" + s + "'.")))
        : (r = n),
      (r.status = t.getStatus()),
      (r.serverResponse = n.serverResponse),
      r
    );
  };
}
function Ii(e) {
  const t = Ei(e);
  return function (n, r) {
    let s = t(n, r);
    var i;
    return (
      404 === n.getStatus() && ((i = e.path), (s = new As(Ns.OBJECT_NOT_FOUND, "Object '" + i + "' does not exist."))),
      (s.serverResponse = r.serverResponse),
      s
    );
  };
}
function Si(e, t, n) {
  const r = Object.assign({}, n);
  return (
    (r.fullPath = e.path),
    (r.size = t.size()),
    r.contentType ||
      (r.contentType = (function (e, t) {
        return (e && e.contentType) || (t && t.type()) || 'application/octet-stream';
      })(null, t)),
    r
  );
}
class Ci {
  constructor(e, t, n, r) {
    (this.current = e), (this.total = t), (this.finalized = !!n), (this.metadata = r || null);
  }
}
function ki(e, t) {
  let n = null;
  try {
    n = e.getResponseHeader('X-Goog-Upload-Status');
  } catch (e) {
    _i(!1);
  }
  return _i(!!n && -1 !== (t || ['active']).indexOf(n)), n;
}
const Ai = 262144;
function Ni(e, t, n, r, s, i, o, a) {
  const c = new Ci(0, 0);
  if ((o ? ((c.current = o.current), (c.total = o.total)) : ((c.current = 0), (c.total = r.size())), r.size() !== c.total))
    throw new As(Ns.SERVER_FILE_WRONG_SIZE, 'Server recorded incorrect upload file size, please retry the upload.');
  const u = c.total - c.current;
  let h = u;
  s > 0 && (h = Math.min(h, s));
  const l = c.current,
    d = l + h;
  let f = '';
  f = 0 === h ? 'finalize' : u === h ? 'upload, finalize' : 'upload';
  const p = { 'X-Goog-Upload-Command': f, 'X-Goog-Upload-Offset': `${c.current}` },
    g = r.slice(l, d);
  if (null === g) throw Ls();
  const m = t.maxUploadRetryTime,
    y = new wi(
      n,
      'POST',
      function (e, n) {
        const s = ki(e, ['active', 'final']),
          o = c.current + h,
          a = r.size();
        let u;
        return (u = 'final' === s ? bi(t, i)(e, n) : null), new Ci(o, a, 'final' === s, u);
      },
      m
    );
  return (y.headers = p), (y.body = g.uploadData()), (y.progressCallback = a || null), (y.errorHandler = Ei(e)), y;
}
const Ri = 'running',
  Di = 'paused',
  Oi = 'success',
  Pi = 'canceled',
  xi = 'error';
function Li(e) {
  switch (e) {
    case 'running':
    case 'pausing':
    case 'canceling':
      return Ri;
    case 'paused':
      return Di;
    case 'success':
      return Oi;
    case 'canceled':
      return Pi;
    default:
      return xi;
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Mi {
  constructor(e, t, n) {
    const r =
      (function (e) {
        return 'function' == typeof e;
      })(e) ||
      null != t ||
      null != n;
    if (r) (this.next = e), (this.error = null != t ? t : void 0), (this.complete = null != n ? n : void 0);
    else {
      const t = e;
      (this.next = t.next), (this.error = t.error), (this.complete = t.complete);
    }
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Ui(e) {
  return (...t) => {
    Promise.resolve().then(() => e(...t));
  };
}
class Fi {
  constructor() {
    (this.sent_ = !1),
      (this.xhr_ = new XMLHttpRequest()),
      this.initXhr(),
      (this.errorCode_ = Rs.NO_ERROR),
      (this.sendPromise_ = new Promise(e => {
        this.xhr_.addEventListener('abort', () => {
          (this.errorCode_ = Rs.ABORT), e();
        }),
          this.xhr_.addEventListener('error', () => {
            (this.errorCode_ = Rs.NETWORK_ERROR), e();
          }),
          this.xhr_.addEventListener('load', () => {
            e();
          });
      }));
  }
  send(e, t, n, r) {
    if (this.sent_) throw Vs('cannot .send() more than once');
    if (((this.sent_ = !0), this.xhr_.open(t, e, !0), void 0 !== r))
      for (const e in r) r.hasOwnProperty(e) && this.xhr_.setRequestHeader(e, r[e].toString());
    return void 0 !== n ? this.xhr_.send(n) : this.xhr_.send(), this.sendPromise_;
  }
  getErrorCode() {
    if (!this.sent_) throw Vs('cannot .getErrorCode() before sending');
    return this.errorCode_;
  }
  getStatus() {
    if (!this.sent_) throw Vs('cannot .getStatus() before sending');
    try {
      return this.xhr_.status;
    } catch (e) {
      return -1;
    }
  }
  getResponse() {
    if (!this.sent_) throw Vs('cannot .getResponse() before sending');
    return this.xhr_.response;
  }
  getErrorText() {
    if (!this.sent_) throw Vs('cannot .getErrorText() before sending');
    return this.xhr_.statusText;
  }
  abort() {
    this.xhr_.abort();
  }
  getResponseHeader(e) {
    return this.xhr_.getResponseHeader(e);
  }
  addUploadProgressListener(e) {
    null != this.xhr_.upload && this.xhr_.upload.addEventListener('progress', e);
  }
  removeUploadProgressListener(e) {
    null != this.xhr_.upload && this.xhr_.upload.removeEventListener('progress', e);
  }
}
class Vi extends Fi {
  initXhr() {
    this.xhr_.responseType = 'text';
  }
}
function ji() {
  return new Vi();
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Bi {
  constructor(e, t, n = null) {
    (this._transferred = 0),
      (this._needToFetchStatus = !1),
      (this._needToFetchMetadata = !1),
      (this._observers = []),
      (this._error = void 0),
      (this._uploadUrl = void 0),
      (this._request = void 0),
      (this._chunkMultiplier = 1),
      (this._resolve = void 0),
      (this._reject = void 0),
      (this._ref = e),
      (this._blob = t),
      (this._metadata = n),
      (this._mappings = gi()),
      (this._resumable = this._shouldDoResumable(this._blob)),
      (this._state = 'running'),
      (this._errorHandler = e => {
        if (((this._request = void 0), (this._chunkMultiplier = 1), e._codeEquals(Ns.CANCELED)))
          (this._needToFetchStatus = !0), this.completeTransitions_();
        else {
          const t = this.isExponentialBackoffExpired();
          if (Ws(e.status, [])) {
            if (!t)
              return (this.sleepTime = Math.max(2 * this.sleepTime, 1e3)), (this._needToFetchStatus = !0), void this.completeTransitions_();
            e = Ps();
          }
          (this._error = e), this._transition('error');
        }
      }),
      (this._metadataErrorHandler = e => {
        (this._request = void 0), e._codeEquals(Ns.CANCELED) ? this.completeTransitions_() : ((this._error = e), this._transition('error'));
      }),
      (this.sleepTime = 0),
      (this.maxSleepTime = this._ref.storage.maxUploadRetryTime),
      (this._promise = new Promise((e, t) => {
        (this._resolve = e), (this._reject = t), this._start();
      })),
      this._promise.then(null, () => {});
  }
  isExponentialBackoffExpired() {
    return this.sleepTime > this.maxSleepTime;
  }
  _makeProgressCallback() {
    const e = this._transferred;
    return t => this._updateProgress(e + t);
  }
  _shouldDoResumable(e) {
    return e.size() > 262144;
  }
  _start() {
    'running' === this._state &&
      void 0 === this._request &&
      (this._resumable
        ? void 0 === this._uploadUrl
          ? this._createResumable()
          : this._needToFetchStatus
          ? this._fetchStatus()
          : this._needToFetchMetadata
          ? this._fetchMetadata()
          : (this.pendingTimeout = setTimeout(() => {
              (this.pendingTimeout = void 0), this._continueUpload();
            }, this.sleepTime))
        : this._oneShotUpload());
  }
  _resolveToken(e) {
    Promise.all([this._ref.storage._getAuthToken(), this._ref.storage._getAppCheckToken()]).then(([t, n]) => {
      switch (this._state) {
        case 'running':
          e(t, n);
          break;
        case 'canceling':
          this._transition('canceled');
          break;
        case 'pausing':
          this._transition('paused');
      }
    });
  }
  _createResumable() {
    this._resolveToken((e, t) => {
      const n = (function (e, t, n, r, s) {
          const i = t.bucketOnlyServerUrl(),
            o = Si(t, r, s),
            a = { name: o.fullPath },
            c = Gs(i, e.host, e._protocol),
            u = {
              'X-Goog-Upload-Protocol': 'resumable',
              'X-Goog-Upload-Command': 'start',
              'X-Goog-Upload-Header-Content-Length': `${r.size()}`,
              'X-Goog-Upload-Header-Content-Type': o.contentType,
              'Content-Type': 'application/json; charset=utf-8',
            },
            h = vi(o, n),
            l = e.maxUploadRetryTime,
            d = new wi(
              c,
              'POST',
              function (e) {
                let t;
                ki(e);
                try {
                  t = e.getResponseHeader('X-Goog-Upload-URL');
                } catch (e) {
                  _i(!1);
                }
                return _i($s(t)), t;
              },
              l
            );
          return (d.urlParams = a), (d.headers = u), (d.body = h), (d.errorHandler = Ei(t)), d;
        })(this._ref.storage, this._ref._location, this._mappings, this._blob, this._metadata),
        r = this._ref.storage._makeRequest(n, ji, e, t);
      (this._request = r),
        r.getPromise().then(e => {
          (this._request = void 0), (this._uploadUrl = e), (this._needToFetchStatus = !1), this.completeTransitions_();
        }, this._errorHandler);
    });
  }
  _fetchStatus() {
    const e = this._uploadUrl;
    this._resolveToken((t, n) => {
      const r = (function (e, t, n, r) {
          const s = e.maxUploadRetryTime,
            i = new wi(
              n,
              'POST',
              function (e) {
                const t = ki(e, ['active', 'final']);
                let n = null;
                try {
                  n = e.getResponseHeader('X-Goog-Upload-Size-Received');
                } catch (e) {
                  _i(!1);
                }
                n || _i(!1);
                const s = Number(n);
                return _i(!isNaN(s)), new Ci(s, r.size(), 'final' === t);
              },
              s
            );
          return (i.headers = { 'X-Goog-Upload-Command': 'query' }), (i.errorHandler = Ei(t)), i;
        })(this._ref.storage, this._ref._location, e, this._blob),
        s = this._ref.storage._makeRequest(r, ji, t, n);
      (this._request = s),
        s.getPromise().then(e => {
          (this._request = void 0),
            this._updateProgress(e.current),
            (this._needToFetchStatus = !1),
            e.finalized && (this._needToFetchMetadata = !0),
            this.completeTransitions_();
        }, this._errorHandler);
    });
  }
  _continueUpload() {
    const e = Ai * this._chunkMultiplier,
      t = new Ci(this._transferred, this._blob.size()),
      n = this._uploadUrl;
    this._resolveToken((r, s) => {
      let i;
      try {
        i = Ni(this._ref._location, this._ref.storage, n, this._blob, e, this._mappings, t, this._makeProgressCallback());
      } catch (e) {
        return (this._error = e), void this._transition('error');
      }
      const o = this._ref.storage._makeRequest(i, ji, r, s, !1);
      (this._request = o),
        o.getPromise().then(e => {
          this._increaseMultiplier(),
            (this._request = void 0),
            this._updateProgress(e.current),
            e.finalized ? ((this._metadata = e.metadata), this._transition('success')) : this.completeTransitions_();
        }, this._errorHandler);
    });
  }
  _increaseMultiplier() {
    2 * (Ai * this._chunkMultiplier) < 33554432 && (this._chunkMultiplier *= 2);
  }
  _fetchMetadata() {
    this._resolveToken((e, t) => {
      const n = (function (e, t, n) {
          const r = Gs(t.fullServerUrl(), e.host, e._protocol),
            s = e.maxOperationRetryTime,
            i = new wi(r, 'GET', bi(e, n), s);
          return (i.errorHandler = Ii(t)), i;
        })(this._ref.storage, this._ref._location, this._mappings),
        r = this._ref.storage._makeRequest(n, ji, e, t);
      (this._request = r),
        r.getPromise().then(e => {
          (this._request = void 0), (this._metadata = e), this._transition('success');
        }, this._metadataErrorHandler);
    });
  }
  _oneShotUpload() {
    this._resolveToken((e, t) => {
      const n = (function (e, t, n, r, s) {
          const i = t.bucketOnlyServerUrl(),
            o = { 'X-Goog-Upload-Protocol': 'multipart' },
            a = (function () {
              let e = '';
              for (let t = 0; t < 2; t++) e += Math.random().toString().slice(2);
              return e;
            })();
          o['Content-Type'] = 'multipart/related; boundary=' + a;
          const c = Si(t, r, s),
            u =
              '--' +
              a +
              '\r\nContent-Type: application/json; charset=utf-8\r\n\r\n' +
              vi(c, n) +
              '\r\n--' +
              a +
              '\r\nContent-Type: ' +
              c.contentType +
              '\r\n\r\n',
            h = '\r\n--' + a + '--',
            l = ui.getBlob(u, r, h);
          if (null === l) throw Ls();
          const d = { name: c.fullPath },
            f = Gs(i, e.host, e._protocol),
            p = e.maxUploadRetryTime,
            g = new wi(f, 'POST', bi(e, n), p);
          return (g.urlParams = d), (g.headers = o), (g.body = l.uploadData()), (g.errorHandler = Ei(t)), g;
        })(this._ref.storage, this._ref._location, this._mappings, this._blob, this._metadata),
        r = this._ref.storage._makeRequest(n, ji, e, t);
      (this._request = r),
        r.getPromise().then(e => {
          (this._request = void 0), (this._metadata = e), this._updateProgress(this._blob.size()), this._transition('success');
        }, this._errorHandler);
    });
  }
  _updateProgress(e) {
    const t = this._transferred;
    (this._transferred = e), this._transferred !== t && this._notifyObservers();
  }
  _transition(e) {
    if (this._state !== e)
      switch (e) {
        case 'canceling':
        case 'pausing':
          (this._state = e),
            void 0 !== this._request
              ? this._request.cancel()
              : this.pendingTimeout && (clearTimeout(this.pendingTimeout), (this.pendingTimeout = void 0), this.completeTransitions_());
          break;
        case 'running':
          const t = 'paused' === this._state;
          (this._state = e), t && (this._notifyObservers(), this._start());
          break;
        case 'paused':
        case 'error':
        case 'success':
          (this._state = e), this._notifyObservers();
          break;
        case 'canceled':
          (this._error = xs()), (this._state = e), this._notifyObservers();
      }
  }
  completeTransitions_() {
    switch (this._state) {
      case 'pausing':
        this._transition('paused');
        break;
      case 'canceling':
        this._transition('canceled');
        break;
      case 'running':
        this._start();
    }
  }
  get snapshot() {
    const e = Li(this._state);
    return {
      bytesTransferred: this._transferred,
      totalBytes: this._blob.size(),
      state: e,
      metadata: this._metadata,
      task: this,
      ref: this._ref,
    };
  }
  on(e, t, n, r) {
    const s = new Mi(t || void 0, n || void 0, r || void 0);
    return (
      this._addObserver(s),
      () => {
        this._removeObserver(s);
      }
    );
  }
  then(e, t) {
    return this._promise.then(e, t);
  }
  catch(e) {
    return this.then(null, e);
  }
  _addObserver(e) {
    this._observers.push(e), this._notifyObserver(e);
  }
  _removeObserver(e) {
    const t = this._observers.indexOf(e);
    -1 !== t && this._observers.splice(t, 1);
  }
  _notifyObservers() {
    this._finishPromise();
    this._observers.slice().forEach(e => {
      this._notifyObserver(e);
    });
  }
  _finishPromise() {
    if (void 0 !== this._resolve) {
      let e = !0;
      switch (Li(this._state)) {
        case Oi:
          Ui(this._resolve.bind(null, this.snapshot))();
          break;
        case Pi:
        case xi:
          Ui(this._reject.bind(null, this._error))();
          break;
        default:
          e = !1;
      }
      e && ((this._resolve = void 0), (this._reject = void 0));
    }
  }
  _notifyObserver(e) {
    switch (Li(this._state)) {
      case Ri:
      case Di:
        e.next && Ui(e.next.bind(e, this.snapshot))();
        break;
      case Oi:
        e.complete && Ui(e.complete.bind(e))();
        break;
      default:
        e.error && Ui(e.error.bind(e, this._error))();
    }
  }
  resume() {
    const e = 'paused' === this._state || 'pausing' === this._state;
    return e && this._transition('running'), e;
  }
  pause() {
    const e = 'running' === this._state;
    return e && this._transition('pausing'), e;
  }
  cancel() {
    const e = 'running' === this._state || 'pausing' === this._state;
    return e && this._transition('canceling'), e;
  }
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class $i {
  constructor(e, t) {
    (this._service = e), (this._location = t instanceof js ? t : js.makeFromUrl(t, e.host));
  }
  toString() {
    return 'gs://' + this._location.bucket + '/' + this._location.path;
  }
  _newRef(e, t) {
    return new $i(e, t);
  }
  get root() {
    const e = new js(this._location.bucket, '');
    return this._newRef(this._service, e);
  }
  get bucket() {
    return this._location.bucket;
  }
  get fullPath() {
    return this._location.path;
  }
  get name() {
    return li(this._location.path);
  }
  get storage() {
    return this._service;
  }
  get parent() {
    const e = (function (e) {
      if (0 === e.length) return null;
      const t = e.lastIndexOf('/');
      return -1 === t ? '' : e.slice(0, t);
    })(this._location.path);
    if (null === e) return null;
    const t = new js(this._location.bucket, e);
    return new $i(this._service, t);
  }
  _throwIfRoot(e) {
    if ('' === this._location.path)
      throw (function (e) {
        return new As(
          Ns.INVALID_ROOT_OPERATION,
          "The operation '" +
            e +
            "' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png')."
        );
      })(e);
  }
}
function qi(e) {
  e._throwIfRoot('getDownloadURL');
  const t = (function (e, t, n) {
    const r = Gs(t.fullServerUrl(), e.host, e._protocol),
      s = e.maxOperationRetryTime,
      i = new wi(r, 'GET', Ti(e, n), s);
    return (i.errorHandler = Ii(t)), i;
  })(e.storage, e._location, gi());
  return e.storage.makeRequestWithTokens(t, ji).then(e => {
    if (null === e) throw new As(Ns.NO_DOWNLOAD_URL, 'The given file does not have any download URLs.');
    return e;
  });
}
function zi(e, t) {
  if (e instanceof Ki) {
    const n = e;
    if (null == n._bucket)
      throw new As(Ns.NO_DEFAULT_BUCKET, "No default bucket found. Did you set the '" + ks + "' property when initializing the app?");
    const r = new $i(n, n._bucket);
    return null != t ? zi(r, t) : r;
  }
  return void 0 !== t
    ? (function (e, t) {
        const n = (function (e, t) {
            const n = t
              .split('/')
              .filter(e => e.length > 0)
              .join('/');
            return 0 === e.length ? n : e + '/' + n;
          })(e._location.path, t),
          r = new js(e._location.bucket, n);
        return new $i(e.storage, r);
      })(
        /**
         * @license
         * Copyright 2017 Google LLC
         *
         * Licensed under the Apache License, Version 2.0 (the "License");
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         *   http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */ e,
        t
      )
    : e;
}
function Hi(e, t) {
  if (t && /^[A-Za-z]+:\/\//.test(t)) {
    if (e instanceof Ki) return new $i(e, t);
    throw Ms('To use ref(service, url), the first argument must be a Storage instance.');
  }
  return zi(e, t);
}
function Gi(e, t) {
  const n = null == t ? void 0 : t[ks];
  return null == n ? null : js.makeFromBucketSpec(n, e);
}
class Ki {
  constructor(e, t, n, r, s) {
    (this.app = e),
      (this._authProvider = t),
      (this._appCheckProvider = n),
      (this._url = r),
      (this._firebaseVersion = s),
      (this._bucket = null),
      (this._host = Cs),
      (this._protocol = 'https'),
      (this._appId = null),
      (this._deleted = !1),
      (this._maxOperationRetryTime = 12e4),
      (this._maxUploadRetryTime = 6e5),
      (this._requests = new Set()),
      (this._bucket = null != r ? js.makeFromBucketSpec(r, this._host) : Gi(this._host, this.app.options));
  }
  get host() {
    return this._host;
  }
  set host(e) {
    (this._host = e), null != this._url ? (this._bucket = js.makeFromBucketSpec(this._url, e)) : (this._bucket = Gi(e, this.app.options));
  }
  get maxUploadRetryTime() {
    return this._maxUploadRetryTime;
  }
  set maxUploadRetryTime(e) {
    Hs('time', 0, Number.POSITIVE_INFINITY, e), (this._maxUploadRetryTime = e);
  }
  get maxOperationRetryTime() {
    return this._maxOperationRetryTime;
  }
  set maxOperationRetryTime(e) {
    Hs('time', 0, Number.POSITIVE_INFINITY, e), (this._maxOperationRetryTime = e);
  }
  async _getAuthToken() {
    if (this._overrideAuthToken) return this._overrideAuthToken;
    const e = this._authProvider.getImmediate({ optional: !0 });
    if (e) {
      const t = await e.getToken();
      if (null !== t) return t.accessToken;
    }
    return null;
  }
  async _getAppCheckToken() {
    const e = this._appCheckProvider.getImmediate({ optional: !0 });
    if (e) {
      return (await e.getToken()).token;
    }
    return null;
  }
  _delete() {
    return this._deleted || ((this._deleted = !0), this._requests.forEach(e => e.cancel()), this._requests.clear()), Promise.resolve();
  }
  _makeStorageReference(e) {
    return new $i(this, e);
  }
  _makeRequest(e, t, n, r, s = !0) {
    if (this._deleted) return new Bs(Us());
    {
      const i = (function (e, t, n, r, s, i, o = !0) {
        const a = Ks(e.urlParams),
          c = e.url + a,
          u = Object.assign({}, e.headers);
        return (
          (function (e, t) {
            t && (e['X-Firebase-GMPID'] = t);
          })(u, t),
          (function (e, t) {
            null !== t && t.length > 0 && (e.Authorization = 'Firebase ' + t);
          })(u, n),
          (function (e, t) {
            e['X-Firebase-Storage-Version'] = 'webjs/' + (null != t ? t : 'AppManager');
          })(u, i),
          (function (e, t) {
            null !== t && (e['X-Firebase-AppCheck'] = t);
          })(u, r),
          new Qs(
            c,
            e.method,
            u,
            e.body,
            e.successCodes,
            e.additionalRetryCodes,
            e.handler,
            e.errorHandler,
            e.timeout,
            e.progressCallback,
            s,
            o
          )
        );
      })(e, this._appId, n, r, t, this._firebaseVersion, s);
      return (
        this._requests.add(i),
        i.getPromise().then(
          () => this._requests.delete(i),
          () => this._requests.delete(i)
        ),
        i
      );
    }
  }
  async makeRequestWithTokens(e, t) {
    const [n, r] = await Promise.all([this._getAuthToken(), this._getAppCheckToken()]);
    return this._makeRequest(e, t, n, r).getPromise();
  }
}
const Wi = '@firebase/storage',
  Qi = '0.13.3',
  Xi = 'storage';
function Ji(e, t, n) {
  return (function (e, t, n) {
    return e._throwIfRoot('uploadBytesResumable'), new Bi(e, new ui(t), n);
  })((e = le(e)), t, n);
}
function Yi(e, { instanceIdentifier: t }) {
  const n = e.getProvider('app').getImmediate(),
    r = e.getProvider('auth-internal'),
    s = e.getProvider('app-check-internal');
  return new Ki(n, r, s, t, St);
}
_t(new de(Xi, Yi, 'PUBLIC').setMultipleInstances(!0)), At(Wi, Qi, ''), At(Wi, Qi, 'esm2017');
var Zi,
  eo,
  to =
    'undefined' != typeof globalThis
      ? globalThis
      : 'undefined' != typeof window
      ? window
      : 'undefined' != typeof global
      ? global
      : 'undefined' != typeof self
      ? self
      : {};
/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/ (function () {
  var e;
  /** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/ function t() {
    (this.blockSize = -1), (this.blockSize = 64), (this.g = Array(4)), (this.B = Array(this.blockSize)), (this.o = this.h = 0), this.s();
  }
  function n(e, t, n) {
    n || (n = 0);
    var r = Array(16);
    if ('string' == typeof t)
      for (var s = 0; 16 > s; ++s)
        r[s] = t.charCodeAt(n++) | (t.charCodeAt(n++) << 8) | (t.charCodeAt(n++) << 16) | (t.charCodeAt(n++) << 24);
    else for (s = 0; 16 > s; ++s) r[s] = t[n++] | (t[n++] << 8) | (t[n++] << 16) | (t[n++] << 24);
    (t = e.g[0]), (n = e.g[1]), (s = e.g[2]);
    var i = e.g[3],
      o = (t + (i ^ (n & (s ^ i))) + r[0] + 3614090360) & 4294967295;
    (o =
      ((n =
        (s =
          (i =
            (t =
              (n =
                (s =
                  (i =
                    (t =
                      (n =
                        (s =
                          (i =
                            (t =
                              (n =
                                (s =
                                  (i =
                                    (t =
                                      (n =
                                        (s =
                                          (i =
                                            (t =
                                              (n =
                                                (s =
                                                  (i =
                                                    (t =
                                                      (n =
                                                        (s =
                                                          (i =
                                                            (t =
                                                              (n =
                                                                (s =
                                                                  (i =
                                                                    (t =
                                                                      (n =
                                                                        (s =
                                                                          (i =
                                                                            (t =
                                                                              (n =
                                                                                (s =
                                                                                  (i =
                                                                                    (t =
                                                                                      (n =
                                                                                        (s =
                                                                                          (i =
                                                                                            (t =
                                                                                              (n =
                                                                                                (s =
                                                                                                  (i =
                                                                                                    (t =
                                                                                                      (n =
                                                                                                        (s =
                                                                                                          (i =
                                                                                                            (t =
                                                                                                              (n =
                                                                                                                (s =
                                                                                                                  (i =
                                                                                                                    (t =
                                                                                                                      (n =
                                                                                                                        (s =
                                                                                                                          (i =
                                                                                                                            (t =
                                                                                                                              n +
                                                                                                                              (((o << 7) &
                                                                                                                                4294967295) |
                                                                                                                                (o >>>
                                                                                                                                  25))) +
                                                                                                                            ((((o =
                                                                                                                              (i +
                                                                                                                                (s ^
                                                                                                                                  (t &
                                                                                                                                    (n ^
                                                                                                                                      s))) +
                                                                                                                                r[1] +
                                                                                                                                3905402710) &
                                                                                                                              4294967295) <<
                                                                                                                              12) &
                                                                                                                              4294967295) |
                                                                                                                              (o >>> 20))) +
                                                                                                                          ((((o =
                                                                                                                            (s +
                                                                                                                              (n ^
                                                                                                                                (i &
                                                                                                                                  (t ^
                                                                                                                                    n))) +
                                                                                                                              r[2] +
                                                                                                                              606105819) &
                                                                                                                            4294967295) <<
                                                                                                                            17) &
                                                                                                                            4294967295) |
                                                                                                                            (o >>> 15))) +
                                                                                                                        ((((o =
                                                                                                                          (n +
                                                                                                                            (t ^
                                                                                                                              (s &
                                                                                                                                (i ^ t))) +
                                                                                                                            r[3] +
                                                                                                                            3250441966) &
                                                                                                                          4294967295) <<
                                                                                                                          22) &
                                                                                                                          4294967295) |
                                                                                                                          (o >>> 10))) +
                                                                                                                      ((((o =
                                                                                                                        (t +
                                                                                                                          (i ^
                                                                                                                            (n & (s ^ i))) +
                                                                                                                          r[4] +
                                                                                                                          4118548399) &
                                                                                                                        4294967295) <<
                                                                                                                        7) &
                                                                                                                        4294967295) |
                                                                                                                        (o >>> 25))) +
                                                                                                                    ((((o =
                                                                                                                      (i +
                                                                                                                        (s ^
                                                                                                                          (t & (n ^ s))) +
                                                                                                                        r[5] +
                                                                                                                        1200080426) &
                                                                                                                      4294967295) <<
                                                                                                                      12) &
                                                                                                                      4294967295) |
                                                                                                                      (o >>> 20))) +
                                                                                                                  ((((o =
                                                                                                                    (s +
                                                                                                                      (n ^ (i & (t ^ n))) +
                                                                                                                      r[6] +
                                                                                                                      2821735955) &
                                                                                                                    4294967295) <<
                                                                                                                    17) &
                                                                                                                    4294967295) |
                                                                                                                    (o >>> 15))) +
                                                                                                                ((((o =
                                                                                                                  (n +
                                                                                                                    (t ^ (s & (i ^ t))) +
                                                                                                                    r[7] +
                                                                                                                    4249261313) &
                                                                                                                  4294967295) <<
                                                                                                                  22) &
                                                                                                                  4294967295) |
                                                                                                                  (o >>> 10))) +
                                                                                                              ((((o =
                                                                                                                (t +
                                                                                                                  (i ^ (n & (s ^ i))) +
                                                                                                                  r[8] +
                                                                                                                  1770035416) &
                                                                                                                4294967295) <<
                                                                                                                7) &
                                                                                                                4294967295) |
                                                                                                                (o >>> 25))) +
                                                                                                            ((((o =
                                                                                                              (i +
                                                                                                                (s ^ (t & (n ^ s))) +
                                                                                                                r[9] +
                                                                                                                2336552879) &
                                                                                                              4294967295) <<
                                                                                                              12) &
                                                                                                              4294967295) |
                                                                                                              (o >>> 20))) +
                                                                                                          ((((o =
                                                                                                            (s +
                                                                                                              (n ^ (i & (t ^ n))) +
                                                                                                              r[10] +
                                                                                                              4294925233) &
                                                                                                            4294967295) <<
                                                                                                            17) &
                                                                                                            4294967295) |
                                                                                                            (o >>> 15))) +
                                                                                                        ((((o =
                                                                                                          (n +
                                                                                                            (t ^ (s & (i ^ t))) +
                                                                                                            r[11] +
                                                                                                            2304563134) &
                                                                                                          4294967295) <<
                                                                                                          22) &
                                                                                                          4294967295) |
                                                                                                          (o >>> 10))) +
                                                                                                      ((((o =
                                                                                                        (t +
                                                                                                          (i ^ (n & (s ^ i))) +
                                                                                                          r[12] +
                                                                                                          1804603682) &
                                                                                                        4294967295) <<
                                                                                                        7) &
                                                                                                        4294967295) |
                                                                                                        (o >>> 25))) +
                                                                                                    ((((o =
                                                                                                      (i +
                                                                                                        (s ^ (t & (n ^ s))) +
                                                                                                        r[13] +
                                                                                                        4254626195) &
                                                                                                      4294967295) <<
                                                                                                      12) &
                                                                                                      4294967295) |
                                                                                                      (o >>> 20))) +
                                                                                                  ((((o =
                                                                                                    (s +
                                                                                                      (n ^ (i & (t ^ n))) +
                                                                                                      r[14] +
                                                                                                      2792965006) &
                                                                                                    4294967295) <<
                                                                                                    17) &
                                                                                                    4294967295) |
                                                                                                    (o >>> 15))) +
                                                                                                ((((o =
                                                                                                  (n +
                                                                                                    (t ^ (s & (i ^ t))) +
                                                                                                    r[15] +
                                                                                                    1236535329) &
                                                                                                  4294967295) <<
                                                                                                  22) &
                                                                                                  4294967295) |
                                                                                                  (o >>> 10))) +
                                                                                              ((((o =
                                                                                                (t +
                                                                                                  (s ^ (i & (n ^ s))) +
                                                                                                  r[1] +
                                                                                                  4129170786) &
                                                                                                4294967295) <<
                                                                                                5) &
                                                                                                4294967295) |
                                                                                                (o >>> 27))) +
                                                                                            ((((o =
                                                                                              (i +
                                                                                                (n ^ (s & (t ^ n))) +
                                                                                                r[6] +
                                                                                                3225465664) &
                                                                                              4294967295) <<
                                                                                              9) &
                                                                                              4294967295) |
                                                                                              (o >>> 23))) +
                                                                                          ((((o =
                                                                                            (s + (t ^ (n & (i ^ t))) + r[11] + 643717713) &
                                                                                            4294967295) <<
                                                                                            14) &
                                                                                            4294967295) |
                                                                                            (o >>> 18))) +
                                                                                        ((((o =
                                                                                          (n + (i ^ (t & (s ^ i))) + r[0] + 3921069994) &
                                                                                          4294967295) <<
                                                                                          20) &
                                                                                          4294967295) |
                                                                                          (o >>> 12))) +
                                                                                      ((((o =
                                                                                        (t + (s ^ (i & (n ^ s))) + r[5] + 3593408605) &
                                                                                        4294967295) <<
                                                                                        5) &
                                                                                        4294967295) |
                                                                                        (o >>> 27))) +
                                                                                    ((((o =
                                                                                      (i + (n ^ (s & (t ^ n))) + r[10] + 38016083) &
                                                                                      4294967295) <<
                                                                                      9) &
                                                                                      4294967295) |
                                                                                      (o >>> 23))) +
                                                                                  ((((o =
                                                                                    (s + (t ^ (n & (i ^ t))) + r[15] + 3634488961) &
                                                                                    4294967295) <<
                                                                                    14) &
                                                                                    4294967295) |
                                                                                    (o >>> 18))) +
                                                                                ((((o =
                                                                                  (n + (i ^ (t & (s ^ i))) + r[4] + 3889429448) &
                                                                                  4294967295) <<
                                                                                  20) &
                                                                                  4294967295) |
                                                                                  (o >>> 12))) +
                                                                              ((((o =
                                                                                (t + (s ^ (i & (n ^ s))) + r[9] + 568446438) &
                                                                                4294967295) <<
                                                                                5) &
                                                                                4294967295) |
                                                                                (o >>> 27))) +
                                                                            ((((o =
                                                                              (i + (n ^ (s & (t ^ n))) + r[14] + 3275163606) &
                                                                              4294967295) <<
                                                                              9) &
                                                                              4294967295) |
                                                                              (o >>> 23))) +
                                                                          ((((o =
                                                                            (s + (t ^ (n & (i ^ t))) + r[3] + 4107603335) & 4294967295) <<
                                                                            14) &
                                                                            4294967295) |
                                                                            (o >>> 18))) +
                                                                        ((((o =
                                                                          (n + (i ^ (t & (s ^ i))) + r[8] + 1163531501) & 4294967295) <<
                                                                          20) &
                                                                          4294967295) |
                                                                          (o >>> 12))) +
                                                                      ((((o =
                                                                        (t + (s ^ (i & (n ^ s))) + r[13] + 2850285829) & 4294967295) <<
                                                                        5) &
                                                                        4294967295) |
                                                                        (o >>> 27))) +
                                                                    ((((o = (i + (n ^ (s & (t ^ n))) + r[2] + 4243563512) & 4294967295) <<
                                                                      9) &
                                                                      4294967295) |
                                                                      (o >>> 23))) +
                                                                  ((((o = (s + (t ^ (n & (i ^ t))) + r[7] + 1735328473) & 4294967295) <<
                                                                    14) &
                                                                    4294967295) |
                                                                    (o >>> 18))) +
                                                                ((((o = (n + (i ^ (t & (s ^ i))) + r[12] + 2368359562) & 4294967295) <<
                                                                  20) &
                                                                  4294967295) |
                                                                  (o >>> 12))) +
                                                              ((((o = (t + (n ^ s ^ i) + r[5] + 4294588738) & 4294967295) << 4) &
                                                                4294967295) |
                                                                (o >>> 28))) +
                                                            ((((o = (i + (t ^ n ^ s) + r[8] + 2272392833) & 4294967295) << 11) &
                                                              4294967295) |
                                                              (o >>> 21))) +
                                                          ((((o = (s + (i ^ t ^ n) + r[11] + 1839030562) & 4294967295) << 16) &
                                                            4294967295) |
                                                            (o >>> 16))) +
                                                        ((((o = (n + (s ^ i ^ t) + r[14] + 4259657740) & 4294967295) << 23) & 4294967295) |
                                                          (o >>> 9))) +
                                                      ((((o = (t + (n ^ s ^ i) + r[1] + 2763975236) & 4294967295) << 4) & 4294967295) |
                                                        (o >>> 28))) +
                                                    ((((o = (i + (t ^ n ^ s) + r[4] + 1272893353) & 4294967295) << 11) & 4294967295) |
                                                      (o >>> 21))) +
                                                  ((((o = (s + (i ^ t ^ n) + r[7] + 4139469664) & 4294967295) << 16) & 4294967295) |
                                                    (o >>> 16))) +
                                                ((((o = (n + (s ^ i ^ t) + r[10] + 3200236656) & 4294967295) << 23) & 4294967295) |
                                                  (o >>> 9))) +
                                              ((((o = (t + (n ^ s ^ i) + r[13] + 681279174) & 4294967295) << 4) & 4294967295) |
                                                (o >>> 28))) +
                                            ((((o = (i + (t ^ n ^ s) + r[0] + 3936430074) & 4294967295) << 11) & 4294967295) |
                                              (o >>> 21))) +
                                          ((((o = (s + (i ^ t ^ n) + r[3] + 3572445317) & 4294967295) << 16) & 4294967295) | (o >>> 16))) +
                                        ((((o = (n + (s ^ i ^ t) + r[6] + 76029189) & 4294967295) << 23) & 4294967295) | (o >>> 9))) +
                                      ((((o = (t + (n ^ s ^ i) + r[9] + 3654602809) & 4294967295) << 4) & 4294967295) | (o >>> 28))) +
                                    ((((o = (i + (t ^ n ^ s) + r[12] + 3873151461) & 4294967295) << 11) & 4294967295) | (o >>> 21))) +
                                  ((((o = (s + (i ^ t ^ n) + r[15] + 530742520) & 4294967295) << 16) & 4294967295) | (o >>> 16))) +
                                ((((o = (n + (s ^ i ^ t) + r[2] + 3299628645) & 4294967295) << 23) & 4294967295) | (o >>> 9))) +
                              ((((o = (t + (s ^ (n | ~i)) + r[0] + 4096336452) & 4294967295) << 6) & 4294967295) | (o >>> 26))) +
                            ((((o = (i + (n ^ (t | ~s)) + r[7] + 1126891415) & 4294967295) << 10) & 4294967295) | (o >>> 22))) +
                          ((((o = (s + (t ^ (i | ~n)) + r[14] + 2878612391) & 4294967295) << 15) & 4294967295) | (o >>> 17))) +
                        ((((o = (n + (i ^ (s | ~t)) + r[5] + 4237533241) & 4294967295) << 21) & 4294967295) | (o >>> 11))) +
                      ((((o = (t + (s ^ (n | ~i)) + r[12] + 1700485571) & 4294967295) << 6) & 4294967295) | (o >>> 26))) +
                    ((((o = (i + (n ^ (t | ~s)) + r[3] + 2399980690) & 4294967295) << 10) & 4294967295) | (o >>> 22))) +
                  ((((o = (s + (t ^ (i | ~n)) + r[10] + 4293915773) & 4294967295) << 15) & 4294967295) | (o >>> 17))) +
                ((((o = (n + (i ^ (s | ~t)) + r[1] + 2240044497) & 4294967295) << 21) & 4294967295) | (o >>> 11))) +
              ((((o = (t + (s ^ (n | ~i)) + r[8] + 1873313359) & 4294967295) << 6) & 4294967295) | (o >>> 26))) +
            ((((o = (i + (n ^ (t | ~s)) + r[15] + 4264355552) & 4294967295) << 10) & 4294967295) | (o >>> 22))) +
          ((((o = (s + (t ^ (i | ~n)) + r[6] + 2734768916) & 4294967295) << 15) & 4294967295) | (o >>> 17))) +
        ((((o = (n + (i ^ (s | ~t)) + r[13] + 1309151649) & 4294967295) << 21) & 4294967295) | (o >>> 11))) +
        ((i =
          (t = n + ((((o = (t + (s ^ (n | ~i)) + r[4] + 4149444226) & 4294967295) << 6) & 4294967295) | (o >>> 26))) +
          ((((o = (i + (n ^ (t | ~s)) + r[11] + 3174756917) & 4294967295) << 10) & 4294967295) | (o >>> 22))) ^
          ((s = i + ((((o = (s + (t ^ (i | ~n)) + r[2] + 718787259) & 4294967295) << 15) & 4294967295) | (o >>> 17))) | ~t)) +
        r[9] +
        3951481745) &
      4294967295),
      (e.g[0] = (e.g[0] + t) & 4294967295),
      (e.g[1] = (e.g[1] + (s + (((o << 21) & 4294967295) | (o >>> 11)))) & 4294967295),
      (e.g[2] = (e.g[2] + s) & 4294967295),
      (e.g[3] = (e.g[3] + i) & 4294967295);
  }
  function r(e, t) {
    this.h = t;
    for (var n = [], r = !0, s = e.length - 1; 0 <= s; s--) {
      var i = 0 | e[s];
      (r && i == t) || ((n[s] = i), (r = !1));
    }
    this.g = n;
  }
  !(function (e, t) {
    function n() {}
    (n.prototype = t.prototype),
      (e.D = t.prototype),
      (e.prototype = new n()),
      (e.prototype.constructor = e),
      (e.C = function (e, n, r) {
        for (var s = Array(arguments.length - 2), i = 2; i < arguments.length; i++) s[i - 2] = arguments[i];
        return t.prototype[n].apply(e, s);
      });
  })(t, function () {
    this.blockSize = -1;
  }),
    (t.prototype.s = function () {
      (this.g[0] = 1732584193), (this.g[1] = 4023233417), (this.g[2] = 2562383102), (this.g[3] = 271733878), (this.o = this.h = 0);
    }),
    (t.prototype.u = function (e, t) {
      void 0 === t && (t = e.length);
      for (var r = t - this.blockSize, s = this.B, i = this.h, o = 0; o < t; ) {
        if (0 == i) for (; o <= r; ) n(this, e, o), (o += this.blockSize);
        if ('string' == typeof e) {
          for (; o < t; )
            if (((s[i++] = e.charCodeAt(o++)), i == this.blockSize)) {
              n(this, s), (i = 0);
              break;
            }
        } else
          for (; o < t; )
            if (((s[i++] = e[o++]), i == this.blockSize)) {
              n(this, s), (i = 0);
              break;
            }
      }
      (this.h = i), (this.o += t);
    }),
    (t.prototype.v = function () {
      var e = Array((56 > this.h ? this.blockSize : 2 * this.blockSize) - this.h);
      e[0] = 128;
      for (var t = 1; t < e.length - 8; ++t) e[t] = 0;
      var n = 8 * this.o;
      for (t = e.length - 8; t < e.length; ++t) (e[t] = 255 & n), (n /= 256);
      for (this.u(e), e = Array(16), t = n = 0; 4 > t; ++t) for (var r = 0; 32 > r; r += 8) e[n++] = (this.g[t] >>> r) & 255;
      return e;
    });
  var s = {};
  function i(e) {
    return -128 <= e && 128 > e
      ? (function (e, t) {
          var n = s;
          return Object.prototype.hasOwnProperty.call(n, e) ? n[e] : (n[e] = t(e));
        })(e, function (e) {
          return new r([0 | e], 0 > e ? -1 : 0);
        })
      : new r([0 | e], 0 > e ? -1 : 0);
  }
  function o(e) {
    if (isNaN(e) || !isFinite(e)) return a;
    if (0 > e) return d(o(-e));
    for (var t = [], n = 1, s = 0; e >= n; s++) (t[s] = (e / n) | 0), (n *= 4294967296);
    return new r(t, 0);
  }
  var a = i(0),
    c = i(1),
    u = i(16777216);
  function h(e) {
    if (0 != e.h) return !1;
    for (var t = 0; t < e.g.length; t++) if (0 != e.g[t]) return !1;
    return !0;
  }
  function l(e) {
    return -1 == e.h;
  }
  function d(e) {
    for (var t = e.g.length, n = [], s = 0; s < t; s++) n[s] = ~e.g[s];
    return new r(n, ~e.h).add(c);
  }
  function f(e, t) {
    return e.add(d(t));
  }
  function p(e, t) {
    for (; (65535 & e[t]) != e[t]; ) (e[t + 1] += e[t] >>> 16), (e[t] &= 65535), t++;
  }
  function g(e, t) {
    (this.g = e), (this.h = t);
  }
  function m(e, t) {
    if (h(t)) throw Error('division by zero');
    if (h(e)) return new g(a, a);
    if (l(e)) return (t = m(d(e), t)), new g(d(t.g), d(t.h));
    if (l(t)) return (t = m(e, d(t))), new g(d(t.g), t.h);
    if (30 < e.g.length) {
      if (l(e) || l(t)) throw Error('slowDivide_ only works with positive integers.');
      for (var n = c, r = t; 0 >= r.l(e); ) (n = y(n)), (r = y(r));
      var s = v(n, 1),
        i = v(r, 1);
      for (r = v(r, 2), n = v(n, 2); !h(r); ) {
        var u = i.add(r);
        0 >= u.l(e) && ((s = s.add(n)), (i = u)), (r = v(r, 1)), (n = v(n, 1));
      }
      return (t = f(e, s.j(t))), new g(s, t);
    }
    for (s = a; 0 <= e.l(t); ) {
      for (
        n = Math.max(1, Math.floor(e.m() / t.m())),
          r = 48 >= (r = Math.ceil(Math.log(n) / Math.LN2)) ? 1 : Math.pow(2, r - 48),
          u = (i = o(n)).j(t);
        l(u) || 0 < u.l(e);

      )
        u = (i = o((n -= r))).j(t);
      h(i) && (i = c), (s = s.add(i)), (e = f(e, u));
    }
    return new g(s, e);
  }
  function y(e) {
    for (var t = e.g.length + 1, n = [], s = 0; s < t; s++) n[s] = (e.i(s) << 1) | (e.i(s - 1) >>> 31);
    return new r(n, e.h);
  }
  function v(e, t) {
    var n = t >> 5;
    t %= 32;
    for (var s = e.g.length - n, i = [], o = 0; o < s; o++) i[o] = 0 < t ? (e.i(o + n) >>> t) | (e.i(o + n + 1) << (32 - t)) : e.i(o + n);
    return new r(i, e.h);
  }
  ((e = r.prototype).m = function () {
    if (l(this)) return -d(this).m();
    for (var e = 0, t = 1, n = 0; n < this.g.length; n++) {
      var r = this.i(n);
      (e += (0 <= r ? r : 4294967296 + r) * t), (t *= 4294967296);
    }
    return e;
  }),
    (e.toString = function (e) {
      if (2 > (e = e || 10) || 36 < e) throw Error('radix out of range: ' + e);
      if (h(this)) return '0';
      if (l(this)) return '-' + d(this).toString(e);
      for (var t = o(Math.pow(e, 6)), n = this, r = ''; ; ) {
        var s = m(n, t).g,
          i = ((0 < (n = f(n, s.j(t))).g.length ? n.g[0] : n.h) >>> 0).toString(e);
        if (h((n = s))) return i + r;
        for (; 6 > i.length; ) i = '0' + i;
        r = i + r;
      }
    }),
    (e.i = function (e) {
      return 0 > e ? 0 : e < this.g.length ? this.g[e] : this.h;
    }),
    (e.l = function (e) {
      return l((e = f(this, e))) ? -1 : h(e) ? 0 : 1;
    }),
    (e.abs = function () {
      return l(this) ? d(this) : this;
    }),
    (e.add = function (e) {
      for (var t = Math.max(this.g.length, e.g.length), n = [], s = 0, i = 0; i <= t; i++) {
        var o = s + (65535 & this.i(i)) + (65535 & e.i(i)),
          a = (o >>> 16) + (this.i(i) >>> 16) + (e.i(i) >>> 16);
        (s = a >>> 16), (o &= 65535), (a &= 65535), (n[i] = (a << 16) | o);
      }
      return new r(n, -2147483648 & n[n.length - 1] ? -1 : 0);
    }),
    (e.j = function (e) {
      if (h(this) || h(e)) return a;
      if (l(this)) return l(e) ? d(this).j(d(e)) : d(d(this).j(e));
      if (l(e)) return d(this.j(d(e)));
      if (0 > this.l(u) && 0 > e.l(u)) return o(this.m() * e.m());
      for (var t = this.g.length + e.g.length, n = [], s = 0; s < 2 * t; s++) n[s] = 0;
      for (s = 0; s < this.g.length; s++)
        for (var i = 0; i < e.g.length; i++) {
          var c = this.i(s) >>> 16,
            f = 65535 & this.i(s),
            g = e.i(i) >>> 16,
            m = 65535 & e.i(i);
          (n[2 * s + 2 * i] += f * m),
            p(n, 2 * s + 2 * i),
            (n[2 * s + 2 * i + 1] += c * m),
            p(n, 2 * s + 2 * i + 1),
            (n[2 * s + 2 * i + 1] += f * g),
            p(n, 2 * s + 2 * i + 1),
            (n[2 * s + 2 * i + 2] += c * g),
            p(n, 2 * s + 2 * i + 2);
        }
      for (s = 0; s < t; s++) n[s] = (n[2 * s + 1] << 16) | n[2 * s];
      for (s = t; s < 2 * t; s++) n[s] = 0;
      return new r(n, 0);
    }),
    (e.A = function (e) {
      return m(this, e).h;
    }),
    (e.and = function (e) {
      for (var t = Math.max(this.g.length, e.g.length), n = [], s = 0; s < t; s++) n[s] = this.i(s) & e.i(s);
      return new r(n, this.h & e.h);
    }),
    (e.or = function (e) {
      for (var t = Math.max(this.g.length, e.g.length), n = [], s = 0; s < t; s++) n[s] = this.i(s) | e.i(s);
      return new r(n, this.h | e.h);
    }),
    (e.xor = function (e) {
      for (var t = Math.max(this.g.length, e.g.length), n = [], s = 0; s < t; s++) n[s] = this.i(s) ^ e.i(s);
      return new r(n, this.h ^ e.h);
    }),
    (t.prototype.digest = t.prototype.v),
    (t.prototype.reset = t.prototype.s),
    (t.prototype.update = t.prototype.u),
    (eo = t),
    (r.prototype.add = r.prototype.add),
    (r.prototype.multiply = r.prototype.j),
    (r.prototype.modulo = r.prototype.A),
    (r.prototype.compare = r.prototype.l),
    (r.prototype.toNumber = r.prototype.m),
    (r.prototype.toString = r.prototype.toString),
    (r.prototype.getBits = r.prototype.i),
    (r.fromNumber = o),
    (r.fromString = function e(t, n) {
      if (0 == t.length) throw Error('number format error: empty string');
      if (2 > (n = n || 10) || 36 < n) throw Error('radix out of range: ' + n);
      if ('-' == t.charAt(0)) return d(e(t.substring(1), n));
      if (0 <= t.indexOf('-')) throw Error('number format error: interior "-" character');
      for (var r = o(Math.pow(n, 8)), s = a, i = 0; i < t.length; i += 8) {
        var c = Math.min(8, t.length - i),
          u = parseInt(t.substring(i, i + c), n);
        8 > c ? ((c = o(Math.pow(n, c))), (s = s.j(c).add(o(u)))) : (s = (s = s.j(r)).add(o(u)));
      }
      return s;
    }),
    (Zi = r);
}).apply(void 0 !== to ? to : 'undefined' != typeof self ? self : 'undefined' != typeof window ? window : {});
var no,
  ro,
  so,
  io,
  oo,
  ao,
  co,
  uo,
  ho =
    'undefined' != typeof globalThis
      ? globalThis
      : 'undefined' != typeof window
      ? window
      : 'undefined' != typeof global
      ? global
      : 'undefined' != typeof self
      ? self
      : {};
/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/ (function () {
  var e,
    t =
      'function' == typeof Object.defineProperties
        ? Object.defineProperty
        : function (e, t, n) {
            return e == Array.prototype || e == Object.prototype || (e[t] = n.value), e;
          };
  var n = (function (e) {
    e = [
      'object' == typeof globalThis && globalThis,
      e,
      'object' == typeof window && window,
      'object' == typeof self && self,
      'object' == typeof ho && ho,
    ];
    for (var t = 0; t < e.length; ++t) {
      var n = e[t];
      if (n && n.Math == Math) return n;
    }
    throw Error('Cannot find global object');
  })(this);
  !(function (e, r) {
    if (r)
      e: {
        var s = n;
        e = e.split('.');
        for (var i = 0; i < e.length - 1; i++) {
          var o = e[i];
          if (!(o in s)) break e;
          s = s[o];
        }
        (r = r((i = s[(e = e[e.length - 1])]))) != i && null != r && t(s, e, { configurable: !0, writable: !0, value: r });
      }
  })('Array.prototype.values', function (e) {
    return (
      e ||
      function () {
        return (function (e, t) {
          e instanceof String && (e += '');
          var n = 0,
            r = !1,
            s = {
              next: function () {
                if (!r && n < e.length) {
                  var s = n++;
                  return { value: t(s, e[s]), done: !1 };
                }
                return (r = !0), { done: !0, value: void 0 };
              },
            };
          return (
            (s[Symbol.iterator] = function () {
              return s;
            }),
            s
          );
        })(this, function (e, t) {
          return t;
        });
      }
    );
  });
  /** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
  var r = r || {},
    s = this || self;
  function i(e) {
    var t = typeof e;
    return (
      'array' == (t = 'object' != t ? t : e ? (Array.isArray(e) ? 'array' : t) : 'null') || ('object' == t && 'number' == typeof e.length)
    );
  }
  function o(e) {
    var t = typeof e;
    return ('object' == t && null != e) || 'function' == t;
  }
  function a(e, t, n) {
    return e.call.apply(e.bind, arguments);
  }
  function c(e, t, n) {
    if (!e) throw Error();
    if (2 < arguments.length) {
      var r = Array.prototype.slice.call(arguments, 2);
      return function () {
        var n = Array.prototype.slice.call(arguments);
        return Array.prototype.unshift.apply(n, r), e.apply(t, n);
      };
    }
    return function () {
      return e.apply(t, arguments);
    };
  }
  function u(e, t, n) {
    return (u = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf('native code') ? a : c).apply(null, arguments);
  }
  function h(e, t) {
    var n = Array.prototype.slice.call(arguments, 1);
    return function () {
      var t = n.slice();
      return t.push.apply(t, arguments), e.apply(this, t);
    };
  }
  function l(e, t) {
    function n() {}
    (n.prototype = t.prototype),
      (e.aa = t.prototype),
      (e.prototype = new n()),
      (e.prototype.constructor = e),
      (e.Qb = function (e, n, r) {
        for (var s = Array(arguments.length - 2), i = 2; i < arguments.length; i++) s[i - 2] = arguments[i];
        return t.prototype[n].apply(e, s);
      });
  }
  function d(e) {
    const t = e.length;
    if (0 < t) {
      const n = Array(t);
      for (let r = 0; r < t; r++) n[r] = e[r];
      return n;
    }
    return [];
  }
  function f(e, t) {
    for (let t = 1; t < arguments.length; t++) {
      const n = arguments[t];
      if (i(n)) {
        const t = e.length || 0,
          r = n.length || 0;
        e.length = t + r;
        for (let s = 0; s < r; s++) e[t + s] = n[s];
      } else e.push(n);
    }
  }
  function p(e) {
    return /^[\s\xa0]*$/.test(e);
  }
  function g() {
    var e = s.navigator;
    return e && (e = e.userAgent) ? e : '';
  }
  function m(e) {
    return m[' '](e), e;
  }
  m[' '] = function () {};
  var y = !(
    -1 == g().indexOf('Gecko') ||
    (-1 != g().toLowerCase().indexOf('webkit') && -1 == g().indexOf('Edge')) ||
    -1 != g().indexOf('Trident') ||
    -1 != g().indexOf('MSIE') ||
    -1 != g().indexOf('Edge')
  );
  function v(e, t, n) {
    for (const r in e) t.call(n, e[r], r, e);
  }
  function w(e) {
    const t = {};
    for (const n in e) t[n] = e[n];
    return t;
  }
  const _ = 'constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf'.split(' ');
  function b(e, t) {
    let n, r;
    for (let t = 1; t < arguments.length; t++) {
      for (n in ((r = arguments[t]), r)) e[n] = r[n];
      for (let t = 0; t < _.length; t++) (n = _[t]), Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
  }
  function T(e) {
    var t = 1;
    e = e.split(':');
    const n = [];
    for (; 0 < t && e.length; ) n.push(e.shift()), t--;
    return e.length && n.push(e.join(':')), n;
  }
  function E(e) {
    s.setTimeout(() => {
      throw e;
    }, 0);
  }
  function I() {
    var e = N;
    let t = null;
    return e.g && ((t = e.g), (e.g = e.g.next), e.g || (e.h = null), (t.next = null)), t;
  }
  var S = new (class {
    constructor(e, t) {
      (this.i = e), (this.j = t), (this.h = 0), (this.g = null);
    }
    get() {
      let e;
      return 0 < this.h ? (this.h--, (e = this.g), (this.g = e.next), (e.next = null)) : (e = this.i()), e;
    }
  })(
    () => new C(),
    e => e.reset()
  );
  class C {
    constructor() {
      this.next = this.g = this.h = null;
    }
    set(e, t) {
      (this.h = e), (this.g = t), (this.next = null);
    }
    reset() {
      this.next = this.g = this.h = null;
    }
  }
  let k,
    A = !1,
    N = new (class {
      constructor() {
        this.h = this.g = null;
      }
      add(e, t) {
        const n = S.get();
        n.set(e, t), this.h ? (this.h.next = n) : (this.g = n), (this.h = n);
      }
    })(),
    R = () => {
      const e = s.Promise.resolve(void 0);
      k = () => {
        e.then(D);
      };
    };
  var D = () => {
    for (var e; (e = I()); ) {
      try {
        e.h.call(e.g);
      } catch (e) {
        E(e);
      }
      var t = S;
      t.j(e), 100 > t.h && (t.h++, (e.next = t.g), (t.g = e));
    }
    A = !1;
  };
  function O() {
    (this.s = this.s), (this.C = this.C);
  }
  function P(e, t) {
    (this.type = e), (this.g = this.target = t), (this.defaultPrevented = !1);
  }
  (O.prototype.s = !1),
    (O.prototype.ma = function () {
      this.s || ((this.s = !0), this.N());
    }),
    (O.prototype.N = function () {
      if (this.C) for (; this.C.length; ) this.C.shift()();
    }),
    (P.prototype.h = function () {
      this.defaultPrevented = !0;
    });
  var x = (function () {
    if (!s.addEventListener || !Object.defineProperty) return !1;
    var e = !1,
      t = Object.defineProperty({}, 'passive', {
        get: function () {
          e = !0;
        },
      });
    try {
      const e = () => {};
      s.addEventListener('test', e, t), s.removeEventListener('test', e, t);
    } catch (e) {}
    return e;
  })();
  function L(e, t) {
    if (
      (P.call(this, e ? e.type : ''),
      (this.relatedTarget = this.g = this.target = null),
      (this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0),
      (this.key = ''),
      (this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1),
      (this.state = null),
      (this.pointerId = 0),
      (this.pointerType = ''),
      (this.i = null),
      e)
    ) {
      var n = (this.type = e.type),
        r = e.changedTouches && e.changedTouches.length ? e.changedTouches[0] : null;
      if (((this.target = e.target || e.srcElement), (this.g = t), (t = e.relatedTarget))) {
        if (y) {
          e: {
            try {
              m(t.nodeName);
              var s = !0;
              break e;
            } catch (e) {}
            s = !1;
          }
          s || (t = null);
        }
      } else 'mouseover' == n ? (t = e.fromElement) : 'mouseout' == n && (t = e.toElement);
      (this.relatedTarget = t),
        r
          ? ((this.clientX = void 0 !== r.clientX ? r.clientX : r.pageX),
            (this.clientY = void 0 !== r.clientY ? r.clientY : r.pageY),
            (this.screenX = r.screenX || 0),
            (this.screenY = r.screenY || 0))
          : ((this.clientX = void 0 !== e.clientX ? e.clientX : e.pageX),
            (this.clientY = void 0 !== e.clientY ? e.clientY : e.pageY),
            (this.screenX = e.screenX || 0),
            (this.screenY = e.screenY || 0)),
        (this.button = e.button),
        (this.key = e.key || ''),
        (this.ctrlKey = e.ctrlKey),
        (this.altKey = e.altKey),
        (this.shiftKey = e.shiftKey),
        (this.metaKey = e.metaKey),
        (this.pointerId = e.pointerId || 0),
        (this.pointerType = 'string' == typeof e.pointerType ? e.pointerType : M[e.pointerType] || ''),
        (this.state = e.state),
        (this.i = e),
        e.defaultPrevented && L.aa.h.call(this);
    }
  }
  l(L, P);
  var M = { 2: 'touch', 3: 'pen', 4: 'mouse' };
  L.prototype.h = function () {
    L.aa.h.call(this);
    var e = this.i;
    e.preventDefault ? e.preventDefault() : (e.returnValue = !1);
  };
  var U = 'closure_listenable_' + ((1e6 * Math.random()) | 0),
    F = 0;
  function V(e, t, n, r, s) {
    (this.listener = e),
      (this.proxy = null),
      (this.src = t),
      (this.type = n),
      (this.capture = !!r),
      (this.ha = s),
      (this.key = ++F),
      (this.da = this.fa = !1);
  }
  function j(e) {
    (e.da = !0), (e.listener = null), (e.proxy = null), (e.src = null), (e.ha = null);
  }
  function B(e) {
    (this.src = e), (this.g = {}), (this.h = 0);
  }
  function $(e, t) {
    var n = t.type;
    if (n in e.g) {
      var r,
        s = e.g[n],
        i = Array.prototype.indexOf.call(s, t, void 0);
      (r = 0 <= i) && Array.prototype.splice.call(s, i, 1), r && (j(t), 0 == e.g[n].length && (delete e.g[n], e.h--));
    }
  }
  function q(e, t, n, r) {
    for (var s = 0; s < e.length; ++s) {
      var i = e[s];
      if (!i.da && i.listener == t && i.capture == !!n && i.ha == r) return s;
    }
    return -1;
  }
  B.prototype.add = function (e, t, n, r, s) {
    var i = e.toString();
    (e = this.g[i]) || ((e = this.g[i] = []), this.h++);
    var o = q(e, t, r, s);
    return -1 < o ? ((t = e[o]), n || (t.fa = !1)) : (((t = new V(t, this.src, i, !!r, s)).fa = n), e.push(t)), t;
  };
  var z = 'closure_lm_' + ((1e6 * Math.random()) | 0),
    H = {};
  function G(e, t, n, r, s) {
    if (Array.isArray(t)) {
      for (var i = 0; i < t.length; i++) G(e, t[i], n, r, s);
      return null;
    }
    return (
      (n = Z(n)),
      e && e[U]
        ? e.K(t, n, o(r) ? !!r.capture : !!r, s)
        : (function (e, t, n, r, s, i) {
            if (!t) throw Error('Invalid event type');
            var a = o(s) ? !!s.capture : !!s,
              c = J(e);
            if ((c || (e[z] = c = new B(e)), (n = c.add(t, n, r, a, i)), n.proxy)) return n;
            if (
              ((r = (function () {
                function e(n) {
                  return t.call(e.src, e.listener, n);
                }
                const t = X;
                return e;
              })()),
              (n.proxy = r),
              (r.src = e),
              (r.listener = n),
              e.addEventListener)
            )
              x || (s = a), void 0 === s && (s = !1), e.addEventListener(t.toString(), r, s);
            else if (e.attachEvent) e.attachEvent(Q(t.toString()), r);
            else {
              if (!e.addListener || !e.removeListener) throw Error('addEventListener and attachEvent are unavailable.');
              e.addListener(r);
            }
            return n;
          })(e, t, n, !1, r, s)
    );
  }
  function K(e, t, n, r, s) {
    if (Array.isArray(t)) for (var i = 0; i < t.length; i++) K(e, t[i], n, r, s);
    else
      (r = o(r) ? !!r.capture : !!r),
        (n = Z(n)),
        e && e[U]
          ? ((e = e.i),
            (t = String(t).toString()) in e.g &&
              -1 < (n = q((i = e.g[t]), n, r, s)) &&
              (j(i[n]), Array.prototype.splice.call(i, n, 1), 0 == i.length && (delete e.g[t], e.h--)))
          : e && (e = J(e)) && ((t = e.g[t.toString()]), (e = -1), t && (e = q(t, n, r, s)), (n = -1 < e ? t[e] : null) && W(n));
  }
  function W(e) {
    if ('number' != typeof e && e && !e.da) {
      var t = e.src;
      if (t && t[U]) $(t.i, e);
      else {
        var n = e.type,
          r = e.proxy;
        t.removeEventListener
          ? t.removeEventListener(n, r, e.capture)
          : t.detachEvent
          ? t.detachEvent(Q(n), r)
          : t.addListener && t.removeListener && t.removeListener(r),
          (n = J(t)) ? ($(n, e), 0 == n.h && ((n.src = null), (t[z] = null))) : j(e);
      }
    }
  }
  function Q(e) {
    return e in H ? H[e] : (H[e] = 'on' + e);
  }
  function X(e, t) {
    if (e.da) e = !0;
    else {
      t = new L(t, this);
      var n = e.listener,
        r = e.ha || e.src;
      e.fa && W(e), (e = n.call(r, t));
    }
    return e;
  }
  function J(e) {
    return (e = e[z]) instanceof B ? e : null;
  }
  var Y = '__closure_events_fn_' + ((1e9 * Math.random()) >>> 0);
  function Z(e) {
    return 'function' == typeof e
      ? e
      : (e[Y] ||
          (e[Y] = function (t) {
            return e.handleEvent(t);
          }),
        e[Y]);
  }
  function ee() {
    O.call(this), (this.i = new B(this)), (this.M = this), (this.F = null);
  }
  function te(e, t) {
    var n,
      r = e.F;
    if (r) for (n = []; r; r = r.F) n.push(r);
    if (((e = e.M), (r = t.type || t), 'string' == typeof t)) t = new P(t, e);
    else if (t instanceof P) t.target = t.target || e;
    else {
      var s = t;
      b((t = new P(r, e)), s);
    }
    if (((s = !0), n))
      for (var i = n.length - 1; 0 <= i; i--) {
        var o = (t.g = n[i]);
        s = ne(o, r, !0, t) && s;
      }
    if (((s = ne((o = t.g = e), r, !0, t) && s), (s = ne(o, r, !1, t) && s), n))
      for (i = 0; i < n.length; i++) s = ne((o = t.g = n[i]), r, !1, t) && s;
  }
  function ne(e, t, n, r) {
    if (!(t = e.i.g[String(t)])) return !0;
    t = t.concat();
    for (var s = !0, i = 0; i < t.length; ++i) {
      var o = t[i];
      if (o && !o.da && o.capture == n) {
        var a = o.listener,
          c = o.ha || o.src;
        o.fa && $(e.i, o), (s = !1 !== a.call(c, r) && s);
      }
    }
    return s && !r.defaultPrevented;
  }
  function re(e, t, n) {
    if ('function' == typeof e) n && (e = u(e, n));
    else {
      if (!e || 'function' != typeof e.handleEvent) throw Error('Invalid listener argument');
      e = u(e.handleEvent, e);
    }
    return 2147483647 < Number(t) ? -1 : s.setTimeout(e, t || 0);
  }
  function se(e) {
    e.g = re(() => {
      (e.g = null), e.i && ((e.i = !1), se(e));
    }, e.l);
    const t = e.h;
    (e.h = null), e.m.apply(null, t);
  }
  l(ee, O),
    (ee.prototype[U] = !0),
    (ee.prototype.removeEventListener = function (e, t, n, r) {
      K(this, e, t, n, r);
    }),
    (ee.prototype.N = function () {
      if ((ee.aa.N.call(this), this.i)) {
        var e,
          t = this.i;
        for (e in t.g) {
          for (var n = t.g[e], r = 0; r < n.length; r++) j(n[r]);
          delete t.g[e], t.h--;
        }
      }
      this.F = null;
    }),
    (ee.prototype.K = function (e, t, n, r) {
      return this.i.add(String(e), t, !1, n, r);
    }),
    (ee.prototype.L = function (e, t, n, r) {
      return this.i.add(String(e), t, !0, n, r);
    });
  class ie extends O {
    constructor(e, t) {
      super(), (this.m = e), (this.l = t), (this.h = null), (this.i = !1), (this.g = null);
    }
    j(e) {
      (this.h = arguments), this.g ? (this.i = !0) : se(this);
    }
    N() {
      super.N(), this.g && (s.clearTimeout(this.g), (this.g = null), (this.i = !1), (this.h = null));
    }
  }
  function oe(e) {
    O.call(this), (this.h = e), (this.g = {});
  }
  l(oe, O);
  var ae = [];
  function ce(e) {
    v(
      e.g,
      function (e, t) {
        this.g.hasOwnProperty(t) && W(e);
      },
      e
    ),
      (e.g = {});
  }
  (oe.prototype.N = function () {
    oe.aa.N.call(this), ce(this);
  }),
    (oe.prototype.handleEvent = function () {
      throw Error('EventHandler.handleEvent not implemented');
    });
  var ue = s.JSON.stringify,
    he = s.JSON.parse,
    le = class {
      stringify(e) {
        return s.JSON.stringify(e, void 0);
      }
      parse(e) {
        return s.JSON.parse(e, void 0);
      }
    };
  function de() {}
  function fe(e) {
    return e.h || (e.h = e.i());
  }
  function pe() {}
  de.prototype.h = null;
  var ge = { OPEN: 'a', kb: 'b', Ja: 'c', wb: 'd' };
  function me() {
    P.call(this, 'd');
  }
  function ye() {
    P.call(this, 'c');
  }
  l(me, P), l(ye, P);
  var ve = {},
    we = null;
  function _e() {
    return (we = we || new ee());
  }
  function be(e) {
    P.call(this, ve.La, e);
  }
  function Te(e) {
    const t = _e();
    te(t, new be(t));
  }
  function Ee(e, t) {
    P.call(this, ve.STAT_EVENT, e), (this.stat = t);
  }
  function Ie(e) {
    const t = _e();
    te(t, new Ee(t, e));
  }
  function Se(e, t) {
    P.call(this, ve.Ma, e), (this.size = t);
  }
  function Ce(e, t) {
    if ('function' != typeof e) throw Error('Fn must not be null and must be a function');
    return s.setTimeout(function () {
      e();
    }, t);
  }
  function ke() {
    this.g = !0;
  }
  function Ae(e, t, n, r) {
    e.info(function () {
      return (
        'XMLHTTP TEXT (' +
        t +
        '): ' +
        (function (e, t) {
          if (!e.g) return t;
          if (!t) return null;
          try {
            var n = JSON.parse(t);
            if (n)
              for (e = 0; e < n.length; e++)
                if (Array.isArray(n[e])) {
                  var r = n[e];
                  if (!(2 > r.length)) {
                    var s = r[1];
                    if (Array.isArray(s) && !(1 > s.length)) {
                      var i = s[0];
                      if ('noop' != i && 'stop' != i && 'close' != i) for (var o = 1; o < s.length; o++) s[o] = '';
                    }
                  }
                }
            return ue(n);
          } catch (e) {
            return t;
          }
        })(e, n) +
        (r ? ' ' + r : '')
      );
    });
  }
  (ve.La = 'serverreachability'),
    l(be, P),
    (ve.STAT_EVENT = 'statevent'),
    l(Ee, P),
    (ve.Ma = 'timingevent'),
    l(Se, P),
    (ke.prototype.xa = function () {
      this.g = !1;
    }),
    (ke.prototype.info = function () {});
  var Ne,
    Re = { NO_ERROR: 0, gb: 1, tb: 2, sb: 3, nb: 4, rb: 5, ub: 6, Ia: 7, TIMEOUT: 8, xb: 9 },
    De = {
      lb: 'complete',
      Hb: 'success',
      Ja: 'error',
      Ia: 'abort',
      zb: 'ready',
      Ab: 'readystatechange',
      TIMEOUT: 'timeout',
      vb: 'incrementaldata',
      yb: 'progress',
      ob: 'downloadprogress',
      Pb: 'uploadprogress',
    };
  function Oe() {}
  function Pe(e, t, n, r) {
    (this.j = e),
      (this.i = t),
      (this.l = n),
      (this.R = r || 1),
      (this.U = new oe(this)),
      (this.I = 45e3),
      (this.H = null),
      (this.o = !1),
      (this.m = this.A = this.v = this.L = this.F = this.S = this.B = null),
      (this.D = []),
      (this.g = null),
      (this.C = 0),
      (this.s = this.u = null),
      (this.X = -1),
      (this.J = !1),
      (this.O = 0),
      (this.M = null),
      (this.W = this.K = this.T = this.P = !1),
      (this.h = new xe());
  }
  function xe() {
    (this.i = null), (this.g = ''), (this.h = !1);
  }
  l(Oe, de),
    (Oe.prototype.g = function () {
      return new XMLHttpRequest();
    }),
    (Oe.prototype.i = function () {
      return {};
    }),
    (Ne = new Oe());
  var Le = {},
    Me = {};
  function Ue(e, t, n) {
    (e.L = 1), (e.v = ut(st(t))), (e.m = n), (e.P = !0), Fe(e, null);
  }
  function Fe(e, t) {
    (e.F = Date.now()), Be(e), (e.A = st(e.v));
    var n = e.A,
      r = e.R;
    Array.isArray(r) || (r = [String(r)]),
      Et(n.i, 't', r),
      (e.C = 0),
      (n = e.j.J),
      (e.h = new xe()),
      (e.g = ln(e.j, n ? t : null, !e.m)),
      0 < e.O && (e.M = new ie(u(e.Y, e, e.g), e.O)),
      (t = e.U),
      (n = e.g),
      (r = e.ca);
    var s = 'readystatechange';
    Array.isArray(s) || (s && (ae[0] = s.toString()), (s = ae));
    for (var i = 0; i < s.length; i++) {
      var o = G(n, s[i], r || t.handleEvent, !1, t.h || t);
      if (!o) break;
      t.g[o.key] = o;
    }
    (t = e.H ? w(e.H) : {}),
      e.m
        ? (e.u || (e.u = 'POST'), (t['Content-Type'] = 'application/x-www-form-urlencoded'), e.g.ea(e.A, e.u, e.m, t))
        : ((e.u = 'GET'), e.g.ea(e.A, e.u, null, t)),
      Te(),
      (function (e, t, n, r, s, i) {
        e.info(function () {
          if (e.g)
            if (i)
              for (var o = '', a = i.split('&'), c = 0; c < a.length; c++) {
                var u = a[c].split('=');
                if (1 < u.length) {
                  var h = u[0];
                  u = u[1];
                  var l = h.split('_');
                  o = 2 <= l.length && 'type' == l[1] ? o + (h + '=') + u + '&' : o + (h + '=redacted&');
                }
              }
            else o = null;
          else o = i;
          return 'XMLHTTP REQ (' + r + ') [attempt ' + s + ']: ' + t + '\n' + n + '\n' + o;
        });
      })(e.i, e.u, e.A, e.l, e.R, e.m);
  }
  function Ve(e) {
    return !!e.g && 'GET' == e.u && 2 != e.L && e.j.Ca;
  }
  function je(e, t) {
    var n = e.C,
      r = t.indexOf('\n', n);
    return -1 == r
      ? Me
      : ((n = Number(t.substring(n, r))), isNaN(n) ? Le : (r += 1) + n > t.length ? Me : ((t = t.slice(r, r + n)), (e.C = r + n), t));
  }
  function Be(e) {
    (e.S = Date.now() + e.I), $e(e, e.I);
  }
  function $e(e, t) {
    if (null != e.B) throw Error('WatchDog timer not null');
    e.B = Ce(u(e.ba, e), t);
  }
  function qe(e) {
    e.B && (s.clearTimeout(e.B), (e.B = null));
  }
  function ze(e) {
    0 == e.j.G || e.J || on(e.j, e);
  }
  function He(e) {
    qe(e);
    var t = e.M;
    t && 'function' == typeof t.ma && t.ma(), (e.M = null), ce(e.U), e.g && ((t = e.g), (e.g = null), t.abort(), t.ma());
  }
  function Ge(e, t) {
    try {
      var n = e.j;
      if (0 != n.G && (n.g == e || Je(n.h, e)))
        if (!e.K && Je(n.h, e) && 3 == n.G) {
          try {
            var r = n.Da.g.parse(t);
          } catch (e) {
            r = null;
          }
          if (Array.isArray(r) && 3 == r.length) {
            var s = r;
            if (0 == s[0]) {
              e: if (!n.u) {
                if (n.g) {
                  if (!(n.g.F + 3e3 < e.F)) break e;
                  sn(n), Wt(n);
                }
                tn(n), Ie(18);
              }
            } else (n.za = s[1]), 0 < n.za - n.T && 37500 > s[2] && n.F && 0 == n.v && !n.C && (n.C = Ce(u(n.Za, n), 6e3));
            if (1 >= Xe(n.h) && n.ca) {
              try {
                n.ca();
              } catch (e) {}
              n.ca = void 0;
            }
          } else cn(n, 11);
        } else if (((e.K || n.g == e) && sn(n), !p(t)))
          for (s = n.Da.g.parse(t), t = 0; t < s.length; t++) {
            let u = s[t];
            if (((n.T = u[0]), (u = u[1]), 2 == n.G))
              if ('c' == u[0]) {
                (n.K = u[1]), (n.ia = u[2]);
                const t = u[3];
                null != t && ((n.la = t), n.j.info('VER=' + n.la));
                const s = u[4];
                null != s && ((n.Aa = s), n.j.info('SVER=' + n.Aa));
                const h = u[5];
                null != h && 'number' == typeof h && 0 < h && ((r = 1.5 * h), (n.L = r), n.j.info('backChannelRequestTimeoutMs_=' + r)),
                  (r = n);
                const l = e.g;
                if (l) {
                  const e = l.g ? l.g.getResponseHeader('X-Client-Wire-Protocol') : null;
                  if (e) {
                    var i = r.h;
                    i.g ||
                      (-1 == e.indexOf('spdy') && -1 == e.indexOf('quic') && -1 == e.indexOf('h2')) ||
                      ((i.j = i.l), (i.g = new Set()), i.h && (Ye(i, i.h), (i.h = null)));
                  }
                  if (r.D) {
                    const e = l.g ? l.g.getResponseHeader('X-HTTP-Session-Id') : null;
                    e && ((r.ya = e), ct(r.I, r.D, e));
                  }
                }
                (n.G = 3), n.l && n.l.ua(), n.ba && ((n.R = Date.now() - e.F), n.j.info('Handshake RTT: ' + n.R + 'ms'));
                var o = e;
                if ((((r = n).qa = hn(r, r.J ? r.ia : null, r.W)), o.K)) {
                  Ze(r.h, o);
                  var a = o,
                    c = r.L;
                  c && (a.I = c), a.B && (qe(a), Be(a)), (r.g = o);
                } else en(r);
                0 < n.i.length && Xt(n);
              } else ('stop' != u[0] && 'close' != u[0]) || cn(n, 7);
            else
              3 == n.G &&
                ('stop' == u[0] || 'close' == u[0] ? ('stop' == u[0] ? cn(n, 7) : Kt(n)) : 'noop' != u[0] && n.l && n.l.ta(u), (n.v = 0));
          }
      Te();
    } catch (e) {}
  }
  (Pe.prototype.ca = function (e) {
    e = e.target;
    const t = this.M;
    t && 3 == qt(e) ? t.j() : this.Y(e);
  }),
    (Pe.prototype.Y = function (e) {
      try {
        if (e == this.g)
          e: {
            const d = qt(this.g);
            var t = this.g.Ba();
            this.g.Z();
            if (!(3 > d) && (3 != d || (this.g && (this.h.h || this.g.oa() || zt(this.g))))) {
              this.J || 4 != d || 7 == t || Te(), qe(this);
              var n = this.g.Z();
              this.X = n;
              t: if (Ve(this)) {
                var r = zt(this.g);
                e = '';
                var i = r.length,
                  o = 4 == qt(this.g);
                if (!this.h.i) {
                  if ('undefined' == typeof TextDecoder) {
                    He(this), ze(this);
                    var a = '';
                    break t;
                  }
                  this.h.i = new s.TextDecoder();
                }
                for (t = 0; t < i; t++) (this.h.h = !0), (e += this.h.i.decode(r[t], { stream: !(o && t == i - 1) }));
                (r.length = 0), (this.h.g += e), (this.C = 0), (a = this.h.g);
              } else a = this.g.oa();
              if (
                ((this.o = 200 == n),
                (function (e, t, n, r, s, i, o) {
                  e.info(function () {
                    return 'XMLHTTP RESP (' + r + ') [ attempt ' + s + ']: ' + t + '\n' + n + '\n' + i + ' ' + o;
                  });
                })(this.i, this.u, this.A, this.l, this.R, d, n),
                this.o)
              ) {
                if (this.T && !this.K) {
                  t: {
                    if (this.g) {
                      var c,
                        u = this.g;
                      if ((c = u.g ? u.g.getResponseHeader('X-HTTP-Initial-Response') : null) && !p(c)) {
                        var h = c;
                        break t;
                      }
                    }
                    h = null;
                  }
                  if (!(n = h)) {
                    (this.o = !1), (this.s = 3), Ie(12), He(this), ze(this);
                    break e;
                  }
                  Ae(this.i, this.l, n, 'Initial handshake response via X-HTTP-Initial-Response'), (this.K = !0), Ge(this, n);
                }
                if (this.P) {
                  let e;
                  for (n = !0; !this.J && this.C < a.length; ) {
                    if (((e = je(this, a)), e == Me)) {
                      4 == d && ((this.s = 4), Ie(14), (n = !1)), Ae(this.i, this.l, null, '[Incomplete Response]');
                      break;
                    }
                    if (e == Le) {
                      (this.s = 4), Ie(15), Ae(this.i, this.l, a, '[Invalid Chunk]'), (n = !1);
                      break;
                    }
                    Ae(this.i, this.l, e, null), Ge(this, e);
                  }
                  if (
                    (Ve(this) && 0 != this.C && ((this.h.g = this.h.g.slice(this.C)), (this.C = 0)),
                    4 != d || 0 != a.length || this.h.h || ((this.s = 1), Ie(16), (n = !1)),
                    (this.o = this.o && n),
                    n)
                  ) {
                    if (0 < a.length && !this.W) {
                      this.W = !0;
                      var l = this.j;
                      l.g == this &&
                        l.ba &&
                        !l.M &&
                        (l.j.info('Great, no buffering proxy detected. Bytes received: ' + a.length), nn(l), (l.M = !0), Ie(11));
                    }
                  } else Ae(this.i, this.l, a, '[Invalid Chunked Response]'), He(this), ze(this);
                } else Ae(this.i, this.l, a, null), Ge(this, a);
                4 == d && He(this), this.o && !this.J && (4 == d ? on(this.j, this) : ((this.o = !1), Be(this)));
              } else
                (function (e) {
                  const t = {};
                  e = ((e.g && 2 <= qt(e) && e.g.getAllResponseHeaders()) || '').split('\r\n');
                  for (let r = 0; r < e.length; r++) {
                    if (p(e[r])) continue;
                    var n = T(e[r]);
                    const s = n[0];
                    if ('string' != typeof (n = n[1])) continue;
                    n = n.trim();
                    const i = t[s] || [];
                    (t[s] = i), i.push(n);
                  }
                  !(function (e, t) {
                    for (const n in e) t.call(void 0, e[n], n, e);
                  })(t, function (e) {
                    return e.join(', ');
                  });
                })(this.g),
                  400 == n && 0 < a.indexOf('Unknown SID') ? ((this.s = 3), Ie(12)) : ((this.s = 0), Ie(13)),
                  He(this),
                  ze(this);
            }
          }
      } catch (e) {}
    }),
    (Pe.prototype.cancel = function () {
      (this.J = !0), He(this);
    }),
    (Pe.prototype.ba = function () {
      this.B = null;
      const e = Date.now();
      0 <= e - this.S
        ? ((function (e, t) {
            e.info(function () {
              return 'TIMEOUT: ' + t;
            });
          })(this.i, this.A),
          2 != this.L && (Te(), Ie(17)),
          He(this),
          (this.s = 2),
          ze(this))
        : $e(this, this.S - e);
    });
  var Ke = class {
    constructor(e, t) {
      (this.g = e), (this.map = t);
    }
  };
  function We(e) {
    (this.l = e || 10),
      s.PerformanceNavigationTiming
        ? (e =
            0 < (e = s.performance.getEntriesByType('navigation')).length && ('hq' == e[0].nextHopProtocol || 'h2' == e[0].nextHopProtocol))
        : (e = !!(s.chrome && s.chrome.loadTimes && s.chrome.loadTimes() && s.chrome.loadTimes().wasFetchedViaSpdy)),
      (this.j = e ? this.l : 1),
      (this.g = null),
      1 < this.j && (this.g = new Set()),
      (this.h = null),
      (this.i = []);
  }
  function Qe(e) {
    return !!e.h || (!!e.g && e.g.size >= e.j);
  }
  function Xe(e) {
    return e.h ? 1 : e.g ? e.g.size : 0;
  }
  function Je(e, t) {
    return e.h ? e.h == t : !!e.g && e.g.has(t);
  }
  function Ye(e, t) {
    e.g ? e.g.add(t) : (e.h = t);
  }
  function Ze(e, t) {
    e.h && e.h == t ? (e.h = null) : e.g && e.g.has(t) && e.g.delete(t);
  }
  function et(e) {
    if (null != e.h) return e.i.concat(e.h.D);
    if (null != e.g && 0 !== e.g.size) {
      let t = e.i;
      for (const n of e.g.values()) t = t.concat(n.D);
      return t;
    }
    return d(e.i);
  }
  function tt(e, t) {
    if (e.forEach && 'function' == typeof e.forEach) e.forEach(t, void 0);
    else if (i(e) || 'string' == typeof e) Array.prototype.forEach.call(e, t, void 0);
    else
      for (
        var n = (function (e) {
            if (e.na && 'function' == typeof e.na) return e.na();
            if (!e.V || 'function' != typeof e.V) {
              if ('undefined' != typeof Map && e instanceof Map) return Array.from(e.keys());
              if (!('undefined' != typeof Set && e instanceof Set)) {
                if (i(e) || 'string' == typeof e) {
                  var t = [];
                  e = e.length;
                  for (var n = 0; n < e; n++) t.push(n);
                  return t;
                }
                (t = []), (n = 0);
                for (const r in e) t[n++] = r;
                return t;
              }
            }
          })(e),
          r = (function (e) {
            if (e.V && 'function' == typeof e.V) return e.V();
            if (('undefined' != typeof Map && e instanceof Map) || ('undefined' != typeof Set && e instanceof Set))
              return Array.from(e.values());
            if ('string' == typeof e) return e.split('');
            if (i(e)) {
              for (var t = [], n = e.length, r = 0; r < n; r++) t.push(e[r]);
              return t;
            }
            for (r in ((t = []), (n = 0), e)) t[n++] = e[r];
            return t;
          })(e),
          s = r.length,
          o = 0;
        o < s;
        o++
      )
        t.call(void 0, r[o], n && n[o], e);
  }
  We.prototype.cancel = function () {
    if (((this.i = et(this)), this.h)) this.h.cancel(), (this.h = null);
    else if (this.g && 0 !== this.g.size) {
      for (const e of this.g.values()) e.cancel();
      this.g.clear();
    }
  };
  var nt = RegExp(
    '^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$'
  );
  function rt(e) {
    if (((this.g = this.o = this.j = ''), (this.s = null), (this.m = this.l = ''), (this.h = !1), e instanceof rt)) {
      (this.h = e.h), it(this, e.j), (this.o = e.o), (this.g = e.g), ot(this, e.s), (this.l = e.l);
      var t = e.i,
        n = new wt();
      (n.i = t.i), t.g && ((n.g = new Map(t.g)), (n.h = t.h)), at(this, n), (this.m = e.m);
    } else
      e && (t = String(e).match(nt))
        ? ((this.h = !1),
          it(this, t[1] || '', !0),
          (this.o = ht(t[2] || '')),
          (this.g = ht(t[3] || '', !0)),
          ot(this, t[4]),
          (this.l = ht(t[5] || '', !0)),
          at(this, t[6] || '', !0),
          (this.m = ht(t[7] || '')))
        : ((this.h = !1), (this.i = new wt(null, this.h)));
  }
  function st(e) {
    return new rt(e);
  }
  function it(e, t, n) {
    (e.j = n ? ht(t, !0) : t), e.j && (e.j = e.j.replace(/:$/, ''));
  }
  function ot(e, t) {
    if (t) {
      if (((t = Number(t)), isNaN(t) || 0 > t)) throw Error('Bad port number ' + t);
      e.s = t;
    } else e.s = null;
  }
  function at(e, t, n) {
    t instanceof wt
      ? ((e.i = t),
        (function (e, t) {
          t &&
            !e.j &&
            (_t(e),
            (e.i = null),
            e.g.forEach(function (e, t) {
              var n = t.toLowerCase();
              t != n && (bt(this, t), Et(this, n, e));
            }, e)),
            (e.j = t);
        })(e.i, e.h))
      : (n || (t = lt(t, yt)), (e.i = new wt(t, e.h)));
  }
  function ct(e, t, n) {
    e.i.set(t, n);
  }
  function ut(e) {
    return (
      ct(
        e,
        'zx',
        Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ Date.now()).toString(36)
      ),
      e
    );
  }
  function ht(e, t) {
    return e ? (t ? decodeURI(e.replace(/%25/g, '%2525')) : decodeURIComponent(e)) : '';
  }
  function lt(e, t, n) {
    return 'string' == typeof e ? ((e = encodeURI(e).replace(t, dt)), n && (e = e.replace(/%25([0-9a-fA-F]{2})/g, '%$1')), e) : null;
  }
  function dt(e) {
    return '%' + (((e = e.charCodeAt(0)) >> 4) & 15).toString(16) + (15 & e).toString(16);
  }
  rt.prototype.toString = function () {
    var e = [],
      t = this.j;
    t && e.push(lt(t, pt, !0), ':');
    var n = this.g;
    return (
      (n || 'file' == t) &&
        (e.push('//'),
        (t = this.o) && e.push(lt(t, pt, !0), '@'),
        e.push(encodeURIComponent(String(n)).replace(/%25([0-9a-fA-F]{2})/g, '%$1')),
        null != (n = this.s) && e.push(':', String(n))),
      (n = this.l) && (this.g && '/' != n.charAt(0) && e.push('/'), e.push(lt(n, '/' == n.charAt(0) ? mt : gt, !0))),
      (n = this.i.toString()) && e.push('?', n),
      (n = this.m) && e.push('#', lt(n, vt)),
      e.join('')
    );
  };
  var ft,
    pt = /[#\/\?@]/g,
    gt = /[#\?:]/g,
    mt = /[#\?]/g,
    yt = /[#\?@]/g,
    vt = /#/g;
  function wt(e, t) {
    (this.h = this.g = null), (this.i = e || null), (this.j = !!t);
  }
  function _t(e) {
    e.g ||
      ((e.g = new Map()),
      (e.h = 0),
      e.i &&
        (function (e, t) {
          if (e) {
            e = e.split('&');
            for (var n = 0; n < e.length; n++) {
              var r = e[n].indexOf('='),
                s = null;
              if (0 <= r) {
                var i = e[n].substring(0, r);
                s = e[n].substring(r + 1);
              } else i = e[n];
              t(i, s ? decodeURIComponent(s.replace(/\+/g, ' ')) : '');
            }
          }
        })(e.i, function (t, n) {
          e.add(decodeURIComponent(t.replace(/\+/g, ' ')), n);
        }));
  }
  function bt(e, t) {
    _t(e), (t = It(e, t)), e.g.has(t) && ((e.i = null), (e.h -= e.g.get(t).length), e.g.delete(t));
  }
  function Tt(e, t) {
    return _t(e), (t = It(e, t)), e.g.has(t);
  }
  function Et(e, t, n) {
    bt(e, t), 0 < n.length && ((e.i = null), e.g.set(It(e, t), d(n)), (e.h += n.length));
  }
  function It(e, t) {
    return (t = String(t)), e.j && (t = t.toLowerCase()), t;
  }
  function St(e, t, n, r, s) {
    try {
      s && ((s.onload = null), (s.onerror = null), (s.onabort = null), (s.ontimeout = null)), r(n);
    } catch (e) {}
  }
  function Ct() {
    this.g = new le();
  }
  function kt(e, t, n) {
    const r = n || '';
    try {
      tt(e, function (e, n) {
        let s = e;
        o(e) && (s = ue(e)), t.push(r + n + '=' + encodeURIComponent(s));
      });
    } catch (e) {
      throw (t.push(r + 'type=' + encodeURIComponent('_badmap')), e);
    }
  }
  function At(e) {
    (this.l = e.Ub || null), (this.j = e.eb || !1);
  }
  function Nt(e, t) {
    ee.call(this),
      (this.D = e),
      (this.o = t),
      (this.m = void 0),
      (this.status = this.readyState = 0),
      (this.responseType = this.responseText = this.response = this.statusText = ''),
      (this.onreadystatechange = null),
      (this.u = new Headers()),
      (this.h = null),
      (this.B = 'GET'),
      (this.A = ''),
      (this.g = !1),
      (this.v = this.j = this.l = null);
  }
  function Rt(e) {
    e.j.read().then(e.Pa.bind(e)).catch(e.ga.bind(e));
  }
  function Dt(e) {
    (e.readyState = 4), (e.l = null), (e.j = null), (e.v = null), Ot(e);
  }
  function Ot(e) {
    e.onreadystatechange && e.onreadystatechange.call(e);
  }
  function Pt(e) {
    let t = '';
    return (
      v(e, function (e, n) {
        (t += n), (t += ':'), (t += e), (t += '\r\n');
      }),
      t
    );
  }
  function xt(e, t, n) {
    e: {
      for (r in n) {
        var r = !1;
        break e;
      }
      r = !0;
    }
    r || ((n = Pt(n)), 'string' == typeof e ? null != n && encodeURIComponent(String(n)) : ct(e, t, n));
  }
  function Lt(e) {
    ee.call(this),
      (this.headers = new Map()),
      (this.o = e || null),
      (this.h = !1),
      (this.v = this.g = null),
      (this.D = ''),
      (this.m = 0),
      (this.l = ''),
      (this.j = this.B = this.u = this.A = !1),
      (this.I = null),
      (this.H = ''),
      (this.J = !1);
  }
  ((e = wt.prototype).add = function (e, t) {
    _t(this), (this.i = null), (e = It(this, e));
    var n = this.g.get(e);
    return n || this.g.set(e, (n = [])), n.push(t), (this.h += 1), this;
  }),
    (e.forEach = function (e, t) {
      _t(this),
        this.g.forEach(function (n, r) {
          n.forEach(function (n) {
            e.call(t, n, r, this);
          }, this);
        }, this);
    }),
    (e.na = function () {
      _t(this);
      const e = Array.from(this.g.values()),
        t = Array.from(this.g.keys()),
        n = [];
      for (let r = 0; r < t.length; r++) {
        const s = e[r];
        for (let e = 0; e < s.length; e++) n.push(t[r]);
      }
      return n;
    }),
    (e.V = function (e) {
      _t(this);
      let t = [];
      if ('string' == typeof e) Tt(this, e) && (t = t.concat(this.g.get(It(this, e))));
      else {
        e = Array.from(this.g.values());
        for (let n = 0; n < e.length; n++) t = t.concat(e[n]);
      }
      return t;
    }),
    (e.set = function (e, t) {
      return (
        _t(this), (this.i = null), Tt(this, (e = It(this, e))) && (this.h -= this.g.get(e).length), this.g.set(e, [t]), (this.h += 1), this
      );
    }),
    (e.get = function (e, t) {
      return e && 0 < (e = this.V(e)).length ? String(e[0]) : t;
    }),
    (e.toString = function () {
      if (this.i) return this.i;
      if (!this.g) return '';
      const e = [],
        t = Array.from(this.g.keys());
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        const i = encodeURIComponent(String(r)),
          o = this.V(r);
        for (r = 0; r < o.length; r++) {
          var s = i;
          '' !== o[r] && (s += '=' + encodeURIComponent(String(o[r]))), e.push(s);
        }
      }
      return (this.i = e.join('&'));
    }),
    l(At, de),
    (At.prototype.g = function () {
      return new Nt(this.l, this.j);
    }),
    (At.prototype.i =
      ((ft = {}),
      function () {
        return ft;
      })),
    l(Nt, ee),
    ((e = Nt.prototype).open = function (e, t) {
      if (0 != this.readyState) throw (this.abort(), Error('Error reopening a connection'));
      (this.B = e), (this.A = t), (this.readyState = 1), Ot(this);
    }),
    (e.send = function (e) {
      if (1 != this.readyState) throw (this.abort(), Error('need to call open() first. '));
      this.g = !0;
      const t = { headers: this.u, method: this.B, credentials: this.m, cache: void 0 };
      e && (t.body = e), (this.D || s).fetch(new Request(this.A, t)).then(this.Sa.bind(this), this.ga.bind(this));
    }),
    (e.abort = function () {
      (this.response = this.responseText = ''),
        (this.u = new Headers()),
        (this.status = 0),
        this.j && this.j.cancel('Request was aborted.').catch(() => {}),
        1 <= this.readyState && this.g && 4 != this.readyState && ((this.g = !1), Dt(this)),
        (this.readyState = 0);
    }),
    (e.Sa = function (e) {
      if (
        this.g &&
        ((this.l = e),
        this.h ||
          ((this.status = this.l.status), (this.statusText = this.l.statusText), (this.h = e.headers), (this.readyState = 2), Ot(this)),
        this.g && ((this.readyState = 3), Ot(this), this.g))
      )
        if ('arraybuffer' === this.responseType) e.arrayBuffer().then(this.Qa.bind(this), this.ga.bind(this));
        else if (void 0 !== s.ReadableStream && 'body' in e) {
          if (((this.j = e.body.getReader()), this.o)) {
            if (this.responseType) throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');
            this.response = [];
          } else (this.response = this.responseText = ''), (this.v = new TextDecoder());
          Rt(this);
        } else e.text().then(this.Ra.bind(this), this.ga.bind(this));
    }),
    (e.Pa = function (e) {
      if (this.g) {
        if (this.o && e.value) this.response.push(e.value);
        else if (!this.o) {
          var t = e.value ? e.value : new Uint8Array(0);
          (t = this.v.decode(t, { stream: !e.done })) && (this.response = this.responseText += t);
        }
        e.done ? Dt(this) : Ot(this), 3 == this.readyState && Rt(this);
      }
    }),
    (e.Ra = function (e) {
      this.g && ((this.response = this.responseText = e), Dt(this));
    }),
    (e.Qa = function (e) {
      this.g && ((this.response = e), Dt(this));
    }),
    (e.ga = function () {
      this.g && Dt(this);
    }),
    (e.setRequestHeader = function (e, t) {
      this.u.append(e, t);
    }),
    (e.getResponseHeader = function (e) {
      return (this.h && this.h.get(e.toLowerCase())) || '';
    }),
    (e.getAllResponseHeaders = function () {
      if (!this.h) return '';
      const e = [],
        t = this.h.entries();
      for (var n = t.next(); !n.done; ) (n = n.value), e.push(n[0] + ': ' + n[1]), (n = t.next());
      return e.join('\r\n');
    }),
    Object.defineProperty(Nt.prototype, 'withCredentials', {
      get: function () {
        return 'include' === this.m;
      },
      set: function (e) {
        this.m = e ? 'include' : 'same-origin';
      },
    }),
    l(Lt, ee);
  var Mt = /^https?$/i,
    Ut = ['POST', 'PUT'];
  function Ft(e, t) {
    (e.h = !1), e.g && ((e.j = !0), e.g.abort(), (e.j = !1)), (e.l = t), (e.m = 5), Vt(e), Bt(e);
  }
  function Vt(e) {
    e.A || ((e.A = !0), te(e, 'complete'), te(e, 'error'));
  }
  function jt(e) {
    if (e.h && void 0 !== r && (!e.v[1] || 4 != qt(e) || 2 != e.Z()))
      if (e.u && 4 == qt(e)) re(e.Ea, 0, e);
      else if ((te(e, 'readystatechange'), 4 == qt(e))) {
        e.h = !1;
        try {
          const r = e.Z();
          e: switch (r) {
            case 200:
            case 201:
            case 202:
            case 204:
            case 206:
            case 304:
            case 1223:
              var t = !0;
              break e;
            default:
              t = !1;
          }
          var n;
          if (!(n = t)) {
            var i;
            if ((i = 0 === r)) {
              var o = String(e.D).match(nt)[1] || null;
              !o && s.self && s.self.location && (o = s.self.location.protocol.slice(0, -1)), (i = !Mt.test(o ? o.toLowerCase() : ''));
            }
            n = i;
          }
          if (n) te(e, 'complete'), te(e, 'success');
          else {
            e.m = 6;
            try {
              var a = 2 < qt(e) ? e.g.statusText : '';
            } catch (e) {
              a = '';
            }
            (e.l = a + ' [' + e.Z() + ']'), Vt(e);
          }
        } finally {
          Bt(e);
        }
      }
  }
  function Bt(e, t) {
    if (e.g) {
      $t(e);
      const n = e.g,
        r = e.v[0] ? () => {} : null;
      (e.g = null), (e.v = null), t || te(e, 'ready');
      try {
        n.onreadystatechange = r;
      } catch (e) {}
    }
  }
  function $t(e) {
    e.I && (s.clearTimeout(e.I), (e.I = null));
  }
  function qt(e) {
    return e.g ? e.g.readyState : 0;
  }
  function zt(e) {
    try {
      if (!e.g) return null;
      if ('response' in e.g) return e.g.response;
      switch (e.H) {
        case '':
        case 'text':
          return e.g.responseText;
        case 'arraybuffer':
          if ('mozResponseArrayBuffer' in e.g) return e.g.mozResponseArrayBuffer;
      }
      return null;
    } catch (e) {
      return null;
    }
  }
  function Ht(e, t, n) {
    return (n && n.internalChannelParams && n.internalChannelParams[e]) || t;
  }
  function Gt(e) {
    (this.Aa = 0),
      (this.i = []),
      (this.j = new ke()),
      (this.ia = this.qa = this.I = this.W = this.g = this.ya = this.D = this.H = this.m = this.S = this.o = null),
      (this.Ya = this.U = 0),
      (this.Va = Ht('failFast', !1, e)),
      (this.F = this.C = this.u = this.s = this.l = null),
      (this.X = !0),
      (this.za = this.T = -1),
      (this.Y = this.v = this.B = 0),
      (this.Ta = Ht('baseRetryDelayMs', 5e3, e)),
      (this.cb = Ht('retryDelaySeedMs', 1e4, e)),
      (this.Wa = Ht('forwardChannelMaxRetries', 2, e)),
      (this.wa = Ht('forwardChannelRequestTimeoutMs', 2e4, e)),
      (this.pa = (e && e.xmlHttpFactory) || void 0),
      (this.Xa = (e && e.Tb) || void 0),
      (this.Ca = (e && e.useFetchStreams) || !1),
      (this.L = void 0),
      (this.J = (e && e.supportsCrossDomainXhr) || !1),
      (this.K = ''),
      (this.h = new We(e && e.concurrentRequestLimit)),
      (this.Da = new Ct()),
      (this.P = (e && e.fastHandshake) || !1),
      (this.O = (e && e.encodeInitMessageHeaders) || !1),
      this.P && this.O && (this.O = !1),
      (this.Ua = (e && e.Rb) || !1),
      e && e.xa && this.j.xa(),
      e && e.forceLongPolling && (this.X = !1),
      (this.ba = (!this.P && this.X && e && e.detectBufferingProxy) || !1),
      (this.ja = void 0),
      e && e.longPollingTimeout && 0 < e.longPollingTimeout && (this.ja = e.longPollingTimeout),
      (this.ca = void 0),
      (this.R = 0),
      (this.M = !1),
      (this.ka = this.A = null);
  }
  function Kt(e) {
    if ((Qt(e), 3 == e.G)) {
      var t = e.U++,
        n = st(e.I);
      if (
        (ct(n, 'SID', e.K),
        ct(n, 'RID', t),
        ct(n, 'TYPE', 'terminate'),
        Yt(e, n),
        ((t = new Pe(e, e.j, t)).L = 2),
        (t.v = ut(st(n))),
        (n = !1),
        s.navigator && s.navigator.sendBeacon)
      )
        try {
          n = s.navigator.sendBeacon(t.v.toString(), '');
        } catch (e) {}
      !n && s.Image && ((new Image().src = t.v), (n = !0)), n || ((t.g = ln(t.j, null)), t.g.ea(t.v)), (t.F = Date.now()), Be(t);
    }
    un(e);
  }
  function Wt(e) {
    e.g && (nn(e), e.g.cancel(), (e.g = null));
  }
  function Qt(e) {
    Wt(e),
      e.u && (s.clearTimeout(e.u), (e.u = null)),
      sn(e),
      e.h.cancel(),
      e.s && ('number' == typeof e.s && s.clearTimeout(e.s), (e.s = null));
  }
  function Xt(e) {
    if (!Qe(e.h) && !e.s) {
      e.s = !0;
      var t = e.Ga;
      k || R(), A || (k(), (A = !0)), N.add(t, e), (e.B = 0);
    }
  }
  function Jt(e, t) {
    var n;
    n = t ? t.l : e.U++;
    const r = st(e.I);
    ct(r, 'SID', e.K),
      ct(r, 'RID', n),
      ct(r, 'AID', e.T),
      Yt(e, r),
      e.m && e.o && xt(r, e.m, e.o),
      (n = new Pe(e, e.j, n, e.B + 1)),
      null === e.m && (n.H = e.o),
      t && (e.i = t.D.concat(e.i)),
      (t = Zt(e, n, 1e3)),
      (n.I = Math.round(0.5 * e.wa) + Math.round(0.5 * e.wa * Math.random())),
      Ye(e.h, n),
      Ue(n, r, t);
  }
  function Yt(e, t) {
    e.H &&
      v(e.H, function (e, n) {
        ct(t, n, e);
      }),
      e.l &&
        tt({}, function (e, n) {
          ct(t, n, e);
        });
  }
  function Zt(e, t, n) {
    n = Math.min(e.i.length, n);
    var r = e.l ? u(e.l.Na, e.l, e) : null;
    e: {
      var s = e.i;
      let t = -1;
      for (;;) {
        const e = ['count=' + n];
        -1 == t ? (0 < n ? ((t = s[0].g), e.push('ofs=' + t)) : (t = 0)) : e.push('ofs=' + t);
        let i = !0;
        for (let o = 0; o < n; o++) {
          let n = s[o].g;
          const a = s[o].map;
          if (((n -= t), 0 > n)) (t = Math.max(0, s[o].g - 100)), (i = !1);
          else
            try {
              kt(a, e, 'req' + n + '_');
            } catch (e) {
              r && r(a);
            }
        }
        if (i) {
          r = e.join('&');
          break e;
        }
      }
    }
    return (e = e.i.splice(0, n)), (t.D = e), r;
  }
  function en(e) {
    if (!e.g && !e.u) {
      e.Y = 1;
      var t = e.Fa;
      k || R(), A || (k(), (A = !0)), N.add(t, e), (e.v = 0);
    }
  }
  function tn(e) {
    return !(e.g || e.u || 3 <= e.v) && (e.Y++, (e.u = Ce(u(e.Fa, e), an(e, e.v))), e.v++, !0);
  }
  function nn(e) {
    null != e.A && (s.clearTimeout(e.A), (e.A = null));
  }
  function rn(e) {
    (e.g = new Pe(e, e.j, 'rpc', e.Y)), null === e.m && (e.g.H = e.o), (e.g.O = 0);
    var t = st(e.qa);
    ct(t, 'RID', 'rpc'),
      ct(t, 'SID', e.K),
      ct(t, 'AID', e.T),
      ct(t, 'CI', e.F ? '0' : '1'),
      !e.F && e.ja && ct(t, 'TO', e.ja),
      ct(t, 'TYPE', 'xmlhttp'),
      Yt(e, t),
      e.m && e.o && xt(t, e.m, e.o),
      e.L && (e.g.I = e.L);
    var n = e.g;
    (e = e.ia), (n.L = 1), (n.v = ut(st(t))), (n.m = null), (n.P = !0), Fe(n, e);
  }
  function sn(e) {
    null != e.C && (s.clearTimeout(e.C), (e.C = null));
  }
  function on(e, t) {
    var n = null;
    if (e.g == t) {
      sn(e), nn(e), (e.g = null);
      var r = 2;
    } else {
      if (!Je(e.h, t)) return;
      (n = t.D), Ze(e.h, t), (r = 1);
    }
    if (0 != e.G)
      if (t.o)
        if (1 == r) {
          (n = t.m ? t.m.length : 0), (t = Date.now() - t.F);
          var s = e.B;
          te((r = _e()), new Se(r, n)), Xt(e);
        } else en(e);
      else if (
        3 == (s = t.s) ||
        (0 == s && 0 < t.X) ||
        !(
          (1 == r &&
            (function (e, t) {
              return !(
                Xe(e.h) >= e.h.j - (e.s ? 1 : 0) ||
                (e.s
                  ? ((e.i = t.D.concat(e.i)), 0)
                  : 1 == e.G || 2 == e.G || e.B >= (e.Va ? 0 : e.Wa) || ((e.s = Ce(u(e.Ga, e, t), an(e, e.B))), e.B++, 0))
              );
            })(e, t)) ||
          (2 == r && tn(e))
        )
      )
        switch ((n && 0 < n.length && ((t = e.h), (t.i = t.i.concat(n))), s)) {
          case 1:
            cn(e, 5);
            break;
          case 4:
            cn(e, 10);
            break;
          case 3:
            cn(e, 6);
            break;
          default:
            cn(e, 2);
        }
  }
  function an(e, t) {
    let n = e.Ta + Math.floor(Math.random() * e.cb);
    return e.isActive() || (n *= 2), n * t;
  }
  function cn(e, t) {
    if ((e.j.info('Error code ' + t), 2 == t)) {
      var n = u(e.fb, e),
        r = e.Xa;
      const t = !r;
      (r = new rt(r || '//www.google.com/images/cleardot.gif')),
        (s.location && 'http' == s.location.protocol) || it(r, 'https'),
        ut(r),
        t
          ? (function (e, t) {
              const n = new ke();
              if (s.Image) {
                const r = new Image();
                (r.onload = h(St, n, 'TestLoadImage: loaded', !0, t, r)),
                  (r.onerror = h(St, n, 'TestLoadImage: error', !1, t, r)),
                  (r.onabort = h(St, n, 'TestLoadImage: abort', !1, t, r)),
                  (r.ontimeout = h(St, n, 'TestLoadImage: timeout', !1, t, r)),
                  s.setTimeout(function () {
                    r.ontimeout && r.ontimeout();
                  }, 1e4),
                  (r.src = e);
              } else t(!1);
            })(r.toString(), n)
          : (function (e, t) {
              new ke();
              const n = new AbortController(),
                r = setTimeout(() => {
                  n.abort(), St(0, 0, !1, t);
                }, 1e4);
              fetch(e, { signal: n.signal })
                .then(e => {
                  clearTimeout(r), e.ok ? St(0, 0, !0, t) : St(0, 0, !1, t);
                })
                .catch(() => {
                  clearTimeout(r), St(0, 0, !1, t);
                });
            })(r.toString(), n);
    } else Ie(2);
    (e.G = 0), e.l && e.l.sa(t), un(e), Qt(e);
  }
  function un(e) {
    if (((e.G = 0), (e.ka = []), e.l)) {
      const t = et(e.h);
      (0 == t.length && 0 == e.i.length) || (f(e.ka, t), f(e.ka, e.i), (e.h.i.length = 0), d(e.i), (e.i.length = 0)), e.l.ra();
    }
  }
  function hn(e, t, n) {
    var r = n instanceof rt ? st(n) : new rt(n);
    if ('' != r.g) t && (r.g = t + '.' + r.g), ot(r, r.s);
    else {
      var i = s.location;
      (r = i.protocol), (t = t ? t + '.' + i.hostname : i.hostname), (i = +i.port);
      var o = new rt(null);
      r && it(o, r), t && (o.g = t), i && ot(o, i), n && (o.l = n), (r = o);
    }
    return (n = e.D), (t = e.ya), n && t && ct(r, n, t), ct(r, 'VER', e.la), Yt(e, r), r;
  }
  function ln(e, t, n) {
    if (t && !e.J) throw Error("Can't create secondary domain capable XhrIo object.");
    return (t = e.Ca && !e.pa ? new Lt(new At({ eb: n })) : new Lt(e.pa)).Ha(e.J), t;
  }
  function dn() {}
  function fn() {}
  function pn(e, t) {
    ee.call(this),
      (this.g = new Gt(t)),
      (this.l = e),
      (this.h = (t && t.messageUrlParams) || null),
      (e = (t && t.messageHeaders) || null),
      t && t.clientProtocolHeaderRequired && (e ? (e['X-Client-Protocol'] = 'webchannel') : (e = { 'X-Client-Protocol': 'webchannel' })),
      (this.g.o = e),
      (e = (t && t.initMessageHeaders) || null),
      t &&
        t.messageContentType &&
        (e ? (e['X-WebChannel-Content-Type'] = t.messageContentType) : (e = { 'X-WebChannel-Content-Type': t.messageContentType })),
      t && t.va && (e ? (e['X-WebChannel-Client-Profile'] = t.va) : (e = { 'X-WebChannel-Client-Profile': t.va })),
      (this.g.S = e),
      (e = t && t.Sb) && !p(e) && (this.g.m = e),
      (this.v = (t && t.supportsCrossDomainXhr) || !1),
      (this.u = (t && t.sendRawJson) || !1),
      (t = t && t.httpSessionIdParam) && !p(t) && ((this.g.D = t), null !== (e = this.h) && t in e && t in (e = this.h) && delete e[t]),
      (this.j = new yn(this));
  }
  function gn(e) {
    me.call(this),
      e.__headers__ && ((this.headers = e.__headers__), (this.statusCode = e.__status__), delete e.__headers__, delete e.__status__);
    var t = e.__sm__;
    if (t) {
      e: {
        for (const n in t) {
          e = n;
          break e;
        }
        e = void 0;
      }
      (this.i = e) && ((e = this.i), (t = null !== t && e in t ? t[e] : void 0)), (this.data = t);
    } else this.data = e;
  }
  function mn() {
    ye.call(this), (this.status = 1);
  }
  function yn(e) {
    this.g = e;
  }
  ((e = Lt.prototype).Ha = function (e) {
    this.J = e;
  }),
    (e.ea = function (e, t, n, r) {
      if (this.g) throw Error('[goog.net.XhrIo] Object is active with another request=' + this.D + '; newUri=' + e);
      (t = t ? t.toUpperCase() : 'GET'),
        (this.D = e),
        (this.l = ''),
        (this.m = 0),
        (this.A = !1),
        (this.h = !0),
        (this.g = this.o ? this.o.g() : Ne.g()),
        (this.v = this.o ? fe(this.o) : fe(Ne)),
        (this.g.onreadystatechange = u(this.Ea, this));
      try {
        (this.B = !0), this.g.open(t, String(e), !0), (this.B = !1);
      } catch (e) {
        return void Ft(this, e);
      }
      if (((e = n || ''), (n = new Map(this.headers)), r))
        if (Object.getPrototypeOf(r) === Object.prototype) for (var i in r) n.set(i, r[i]);
        else {
          if ('function' != typeof r.keys || 'function' != typeof r.get) throw Error('Unknown input type for opt_headers: ' + String(r));
          for (const e of r.keys()) n.set(e, r.get(e));
        }
      (r = Array.from(n.keys()).find(e => 'content-type' == e.toLowerCase())),
        (i = s.FormData && e instanceof s.FormData),
        !(0 <= Array.prototype.indexOf.call(Ut, t, void 0)) ||
          r ||
          i ||
          n.set('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
      for (const [e, t] of n) this.g.setRequestHeader(e, t);
      this.H && (this.g.responseType = this.H),
        'withCredentials' in this.g && this.g.withCredentials !== this.J && (this.g.withCredentials = this.J);
      try {
        $t(this), (this.u = !0), this.g.send(e), (this.u = !1);
      } catch (e) {
        Ft(this, e);
      }
    }),
    (e.abort = function (e) {
      this.g &&
        this.h &&
        ((this.h = !1), (this.j = !0), this.g.abort(), (this.j = !1), (this.m = e || 7), te(this, 'complete'), te(this, 'abort'), Bt(this));
    }),
    (e.N = function () {
      this.g && (this.h && ((this.h = !1), (this.j = !0), this.g.abort(), (this.j = !1)), Bt(this, !0)), Lt.aa.N.call(this);
    }),
    (e.Ea = function () {
      this.s || (this.B || this.u || this.j ? jt(this) : this.bb());
    }),
    (e.bb = function () {
      jt(this);
    }),
    (e.isActive = function () {
      return !!this.g;
    }),
    (e.Z = function () {
      try {
        return 2 < qt(this) ? this.g.status : -1;
      } catch (e) {
        return -1;
      }
    }),
    (e.oa = function () {
      try {
        return this.g ? this.g.responseText : '';
      } catch (e) {
        return '';
      }
    }),
    (e.Oa = function (e) {
      if (this.g) {
        var t = this.g.responseText;
        return e && 0 == t.indexOf(e) && (t = t.substring(e.length)), he(t);
      }
    }),
    (e.Ba = function () {
      return this.m;
    }),
    (e.Ka = function () {
      return 'string' == typeof this.l ? this.l : String(this.l);
    }),
    ((e = Gt.prototype).la = 8),
    (e.G = 1),
    (e.connect = function (e, t, n, r) {
      Ie(0),
        (this.W = e),
        (this.H = t || {}),
        n && void 0 !== r && ((this.H.OSID = n), (this.H.OAID = r)),
        (this.F = this.X),
        (this.I = hn(this, null, this.W)),
        Xt(this);
    }),
    (e.Ga = function (e) {
      if (this.s)
        if (((this.s = null), 1 == this.G)) {
          if (!e) {
            (this.U = Math.floor(1e5 * Math.random())), (e = this.U++);
            const s = new Pe(this, this.j, e);
            let i = this.o;
            if ((this.S && (i ? ((i = w(i)), b(i, this.S)) : (i = this.S)), null !== this.m || this.O || ((s.H = i), (i = null)), this.P))
              e: {
                for (var t = 0, n = 0; n < this.i.length; n++) {
                  var r = this.i[n];
                  if (void 0 === (r = '__data__' in r.map && 'string' == typeof (r = r.map.__data__) ? r.length : void 0)) break;
                  if (4096 < (t += r)) {
                    t = n;
                    break e;
                  }
                  if (4096 === t || n === this.i.length - 1) {
                    t = n + 1;
                    break e;
                  }
                }
                t = 1e3;
              }
            else t = 1e3;
            (t = Zt(this, s, t)),
              ct((n = st(this.I)), 'RID', e),
              ct(n, 'CVER', 22),
              this.D && ct(n, 'X-HTTP-Session-Id', this.D),
              Yt(this, n),
              i && (this.O ? (t = 'headers=' + encodeURIComponent(String(Pt(i))) + '&' + t) : this.m && xt(n, this.m, i)),
              Ye(this.h, s),
              this.Ua && ct(n, 'TYPE', 'init'),
              this.P ? (ct(n, '$req', t), ct(n, 'SID', 'null'), (s.T = !0), Ue(s, n, null)) : Ue(s, n, t),
              (this.G = 2);
          }
        } else 3 == this.G && (e ? Jt(this, e) : 0 == this.i.length || Qe(this.h) || Jt(this));
    }),
    (e.Fa = function () {
      if (((this.u = null), rn(this), this.ba && !(this.M || null == this.g || 0 >= this.R))) {
        var e = 2 * this.R;
        this.j.info('BP detection timer enabled: ' + e), (this.A = Ce(u(this.ab, this), e));
      }
    }),
    (e.ab = function () {
      this.A &&
        ((this.A = null),
        this.j.info('BP detection timeout reached.'),
        this.j.info('Buffering proxy detected and switch to long-polling!'),
        (this.F = !1),
        (this.M = !0),
        Ie(10),
        Wt(this),
        rn(this));
    }),
    (e.Za = function () {
      null != this.C && ((this.C = null), Wt(this), tn(this), Ie(19));
    }),
    (e.fb = function (e) {
      e ? (this.j.info('Successfully pinged google.com'), Ie(2)) : (this.j.info('Failed to ping google.com'), Ie(1));
    }),
    (e.isActive = function () {
      return !!this.l && this.l.isActive(this);
    }),
    ((e = dn.prototype).ua = function () {}),
    (e.ta = function () {}),
    (e.sa = function () {}),
    (e.ra = function () {}),
    (e.isActive = function () {
      return !0;
    }),
    (e.Na = function () {}),
    (fn.prototype.g = function (e, t) {
      return new pn(e, t);
    }),
    l(pn, ee),
    (pn.prototype.m = function () {
      (this.g.l = this.j), this.v && (this.g.J = !0), this.g.connect(this.l, this.h || void 0);
    }),
    (pn.prototype.close = function () {
      Kt(this.g);
    }),
    (pn.prototype.o = function (e) {
      var t = this.g;
      if ('string' == typeof e) {
        var n = {};
        (n.__data__ = e), (e = n);
      } else this.u && (((n = {}).__data__ = ue(e)), (e = n));
      t.i.push(new Ke(t.Ya++, e)), 3 == t.G && Xt(t);
    }),
    (pn.prototype.N = function () {
      (this.g.l = null), delete this.j, Kt(this.g), delete this.g, pn.aa.N.call(this);
    }),
    l(gn, me),
    l(mn, ye),
    l(yn, dn),
    (yn.prototype.ua = function () {
      te(this.g, 'a');
    }),
    (yn.prototype.ta = function (e) {
      te(this.g, new gn(e));
    }),
    (yn.prototype.sa = function (e) {
      te(this.g, new mn());
    }),
    (yn.prototype.ra = function () {
      te(this.g, 'b');
    }),
    (fn.prototype.createWebChannel = fn.prototype.g),
    (pn.prototype.send = pn.prototype.o),
    (pn.prototype.open = pn.prototype.m),
    (pn.prototype.close = pn.prototype.close),
    (uo = function () {
      return new fn();
    }),
    (co = function () {
      return _e();
    }),
    (ao = ve),
    (oo = {
      mb: 0,
      pb: 1,
      qb: 2,
      Jb: 3,
      Ob: 4,
      Lb: 5,
      Mb: 6,
      Kb: 7,
      Ib: 8,
      Nb: 9,
      PROXY: 10,
      NOPROXY: 11,
      Gb: 12,
      Cb: 13,
      Db: 14,
      Bb: 15,
      Eb: 16,
      Fb: 17,
      ib: 18,
      hb: 19,
      jb: 20,
    }),
    (Re.NO_ERROR = 0),
    (Re.TIMEOUT = 8),
    (Re.HTTP_ERROR = 6),
    (io = Re),
    (De.COMPLETE = 'complete'),
    (so = De),
    (pe.EventType = ge),
    (ge.OPEN = 'a'),
    (ge.CLOSE = 'b'),
    (ge.ERROR = 'c'),
    (ge.MESSAGE = 'd'),
    (ee.prototype.listen = ee.prototype.K),
    (ro = pe),
    (Lt.prototype.listenOnce = Lt.prototype.L),
    (Lt.prototype.getLastError = Lt.prototype.Ka),
    (Lt.prototype.getLastErrorCode = Lt.prototype.Ba),
    (Lt.prototype.getStatus = Lt.prototype.Z),
    (Lt.prototype.getResponseJson = Lt.prototype.Oa),
    (Lt.prototype.getResponseText = Lt.prototype.oa),
    (Lt.prototype.send = Lt.prototype.ea),
    (Lt.prototype.setWithCredentials = Lt.prototype.Ha),
    (no = Lt);
}).apply(void 0 !== ho ? ho : 'undefined' != typeof self ? self : 'undefined' != typeof window ? window : {});
const lo = '@firebase/firestore';
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class fo {
  constructor(e) {
    this.uid = e;
  }
  isAuthenticated() {
    return null != this.uid;
  }
  toKey() {
    return this.isAuthenticated() ? 'uid:' + this.uid : 'anonymous-user';
  }
  isEqual(e) {
    return e.uid === this.uid;
  }
}
(fo.UNAUTHENTICATED = new fo(null)),
  (fo.GOOGLE_CREDENTIALS = new fo('google-credentials-uid')),
  (fo.FIRST_PARTY = new fo('first-party-uid')),
  (fo.MOCK_USER = new fo('mock-user'));
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let po = '11.0.0';
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const go = new be('@firebase/firestore');
function mo() {
  return go.logLevel;
}
function yo(e, ...t) {
  if (go.logLevel <= me.DEBUG) {
    const n = t.map(_o);
    go.debug(`Firestore (${po}): ${e}`, ...n);
  }
}
function vo(e, ...t) {
  if (go.logLevel <= me.ERROR) {
    const n = t.map(_o);
    go.error(`Firestore (${po}): ${e}`, ...n);
  }
}
function wo(e, ...t) {
  if (go.logLevel <= me.WARN) {
    const n = t.map(_o);
    go.warn(`Firestore (${po}): ${e}`, ...n);
  }
}
function _o(e) {
  if ('string' == typeof e) return e;
  try {
    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    return (function (e) {
      return JSON.stringify(e);
    })(e);
  } catch (t) {
    return e;
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function bo(e = 'Unexpected state') {
  const t = `FIRESTORE (${po}) INTERNAL ASSERTION FAILED: ` + e;
  throw (vo(t), new Error(t));
}
function To(e, t) {
  e || bo();
}
function Eo(e, t) {
  return e;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Io = {
  OK: 'ok',
  CANCELLED: 'cancelled',
  UNKNOWN: 'unknown',
  INVALID_ARGUMENT: 'invalid-argument',
  DEADLINE_EXCEEDED: 'deadline-exceeded',
  NOT_FOUND: 'not-found',
  ALREADY_EXISTS: 'already-exists',
  PERMISSION_DENIED: 'permission-denied',
  UNAUTHENTICATED: 'unauthenticated',
  RESOURCE_EXHAUSTED: 'resource-exhausted',
  FAILED_PRECONDITION: 'failed-precondition',
  ABORTED: 'aborted',
  OUT_OF_RANGE: 'out-of-range',
  UNIMPLEMENTED: 'unimplemented',
  INTERNAL: 'internal',
  UNAVAILABLE: 'unavailable',
  DATA_LOSS: 'data-loss',
};
class So extends re {
  constructor(e, t) {
    super(e, t), (this.code = e), (this.message = t), (this.toString = () => `${this.name}: [code=${this.code}]: ${this.message}`);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Co {
  constructor() {
    this.promise = new Promise((e, t) => {
      (this.resolve = e), (this.reject = t);
    });
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class ko {
  constructor(e, t) {
    (this.user = t), (this.type = 'OAuth'), (this.headers = new Map()), this.headers.set('Authorization', `Bearer ${e}`);
  }
}
class Ao {
  getToken() {
    return Promise.resolve(null);
  }
  invalidateToken() {}
  start(e, t) {
    e.enqueueRetryable(() => t(fo.UNAUTHENTICATED));
  }
  shutdown() {}
}
class No {
  constructor(e) {
    (this.token = e), (this.changeListener = null);
  }
  getToken() {
    return Promise.resolve(this.token);
  }
  invalidateToken() {}
  start(e, t) {
    (this.changeListener = t), e.enqueueRetryable(() => t(this.token.user));
  }
  shutdown() {
    this.changeListener = null;
  }
}
class Ro {
  constructor(e) {
    (this.t = e), (this.currentUser = fo.UNAUTHENTICATED), (this.i = 0), (this.forceRefresh = !1), (this.auth = null);
  }
  start(e, t) {
    To(void 0 === this.o);
    let n = this.i;
    const r = e => (this.i !== n ? ((n = this.i), t(e)) : Promise.resolve());
    let s = new Co();
    this.o = () => {
      this.i++, (this.currentUser = this.u()), s.resolve(), (s = new Co()), e.enqueueRetryable(() => r(this.currentUser));
    };
    const i = () => {
        const t = s;
        e.enqueueRetryable(async () => {
          await t.promise, await r(this.currentUser);
        });
      },
      o = e => {
        yo('FirebaseAuthCredentialsProvider', 'Auth detected'), (this.auth = e), this.o && (this.auth.addAuthTokenListener(this.o), i());
      };
    this.t.onInit(e => o(e)),
      setTimeout(() => {
        if (!this.auth) {
          const e = this.t.getImmediate({ optional: !0 });
          e ? o(e) : (yo('FirebaseAuthCredentialsProvider', 'Auth not yet detected'), s.resolve(), (s = new Co()));
        }
      }, 0),
      i();
  }
  getToken() {
    const e = this.i,
      t = this.forceRefresh;
    return (
      (this.forceRefresh = !1),
      this.auth
        ? this.auth
            .getToken(t)
            .then(t =>
              this.i !== e
                ? (yo('FirebaseAuthCredentialsProvider', 'getToken aborted due to token change.'), this.getToken())
                : t
                ? (To('string' == typeof t.accessToken), new ko(t.accessToken, this.currentUser))
                : null
            )
        : Promise.resolve(null)
    );
  }
  invalidateToken() {
    this.forceRefresh = !0;
  }
  shutdown() {
    this.auth && this.o && this.auth.removeAuthTokenListener(this.o), (this.o = void 0);
  }
  u() {
    const e = this.auth && this.auth.getUid();
    return To(null === e || 'string' == typeof e), new fo(e);
  }
}
class Do {
  constructor(e, t, n) {
    (this.l = e), (this.h = t), (this.P = n), (this.type = 'FirstParty'), (this.user = fo.FIRST_PARTY), (this.I = new Map());
  }
  T() {
    return this.P ? this.P() : null;
  }
  get headers() {
    this.I.set('X-Goog-AuthUser', this.l);
    const e = this.T();
    return e && this.I.set('Authorization', e), this.h && this.I.set('X-Goog-Iam-Authorization-Token', this.h), this.I;
  }
}
class Oo {
  constructor(e, t, n) {
    (this.l = e), (this.h = t), (this.P = n);
  }
  getToken() {
    return Promise.resolve(new Do(this.l, this.h, this.P));
  }
  start(e, t) {
    e.enqueueRetryable(() => t(fo.FIRST_PARTY));
  }
  shutdown() {}
  invalidateToken() {}
}
class Po {
  constructor(e) {
    (this.value = e),
      (this.type = 'AppCheck'),
      (this.headers = new Map()),
      e && e.length > 0 && this.headers.set('x-firebase-appcheck', this.value);
  }
}
class xo {
  constructor(e) {
    (this.A = e), (this.forceRefresh = !1), (this.appCheck = null), (this.R = null);
  }
  start(e, t) {
    To(void 0 === this.o);
    const n = e => {
      null != e.error &&
        yo('FirebaseAppCheckTokenProvider', `Error getting App Check token; using placeholder token instead. Error: ${e.error.message}`);
      const n = e.token !== this.R;
      return (
        (this.R = e.token),
        yo('FirebaseAppCheckTokenProvider', `Received ${n ? 'new' : 'existing'} token.`),
        n ? t(e.token) : Promise.resolve()
      );
    };
    this.o = t => {
      e.enqueueRetryable(() => n(t));
    };
    const r = e => {
      yo('FirebaseAppCheckTokenProvider', 'AppCheck detected'), (this.appCheck = e), this.o && this.appCheck.addTokenListener(this.o);
    };
    this.A.onInit(e => r(e)),
      setTimeout(() => {
        if (!this.appCheck) {
          const e = this.A.getImmediate({ optional: !0 });
          e ? r(e) : yo('FirebaseAppCheckTokenProvider', 'AppCheck not yet detected');
        }
      }, 0);
  }
  getToken() {
    const e = this.forceRefresh;
    return (
      (this.forceRefresh = !1),
      this.appCheck
        ? this.appCheck.getToken(e).then(e => (e ? (To('string' == typeof e.token), (this.R = e.token), new Po(e.token)) : null))
        : Promise.resolve(null)
    );
  }
  invalidateToken() {
    this.forceRefresh = !0;
  }
  shutdown() {
    this.appCheck && this.o && this.appCheck.removeTokenListener(this.o), (this.o = void 0);
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Lo(e) {
  const t = 'undefined' != typeof self && (self.crypto || self.msCrypto),
    n = new Uint8Array(e);
  if (t && 'function' == typeof t.getRandomValues) t.getRandomValues(n);
  else for (let t = 0; t < e; t++) n[t] = Math.floor(256 * Math.random());
  return n;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Mo {
  static newId() {
    const e = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
      t = 62 * Math.floor(256 / 62);
    let n = '';
    for (; n.length < 20; ) {
      const r = Lo(40);
      for (let s = 0; s < r.length; ++s) n.length < 20 && r[s] < t && (n += e.charAt(r[s] % 62));
    }
    return n;
  }
}
function Uo(e, t) {
  return e < t ? -1 : e > t ? 1 : 0;
}
function Fo(e, t, n) {
  return e.length === t.length && e.every((e, r) => n(e, t[r]));
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Vo {
  constructor(e, t) {
    if (((this.seconds = e), (this.nanoseconds = t), t < 0)) throw new So(Io.INVALID_ARGUMENT, 'Timestamp nanoseconds out of range: ' + t);
    if (t >= 1e9) throw new So(Io.INVALID_ARGUMENT, 'Timestamp nanoseconds out of range: ' + t);
    if (e < -62135596800) throw new So(Io.INVALID_ARGUMENT, 'Timestamp seconds out of range: ' + e);
    if (e >= 253402300800) throw new So(Io.INVALID_ARGUMENT, 'Timestamp seconds out of range: ' + e);
  }
  static now() {
    return Vo.fromMillis(Date.now());
  }
  static fromDate(e) {
    return Vo.fromMillis(e.getTime());
  }
  static fromMillis(e) {
    const t = Math.floor(e / 1e3),
      n = Math.floor(1e6 * (e - 1e3 * t));
    return new Vo(t, n);
  }
  toDate() {
    return new Date(this.toMillis());
  }
  toMillis() {
    return 1e3 * this.seconds + this.nanoseconds / 1e6;
  }
  _compareTo(e) {
    return this.seconds === e.seconds ? Uo(this.nanoseconds, e.nanoseconds) : Uo(this.seconds, e.seconds);
  }
  isEqual(e) {
    return e.seconds === this.seconds && e.nanoseconds === this.nanoseconds;
  }
  toString() {
    return 'Timestamp(seconds=' + this.seconds + ', nanoseconds=' + this.nanoseconds + ')';
  }
  toJSON() {
    return { seconds: this.seconds, nanoseconds: this.nanoseconds };
  }
  valueOf() {
    const e = this.seconds - -62135596800;
    return String(e).padStart(12, '0') + '.' + String(this.nanoseconds).padStart(9, '0');
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class jo {
  constructor(e) {
    this.timestamp = e;
  }
  static fromTimestamp(e) {
    return new jo(e);
  }
  static min() {
    return new jo(new Vo(0, 0));
  }
  static max() {
    return new jo(new Vo(253402300799, 999999999));
  }
  compareTo(e) {
    return this.timestamp._compareTo(e.timestamp);
  }
  isEqual(e) {
    return this.timestamp.isEqual(e.timestamp);
  }
  toMicroseconds() {
    return 1e6 * this.timestamp.seconds + this.timestamp.nanoseconds / 1e3;
  }
  toString() {
    return 'SnapshotVersion(' + this.timestamp.toString() + ')';
  }
  toTimestamp() {
    return this.timestamp;
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Bo {
  constructor(e, t, n) {
    void 0 === t ? (t = 0) : t > e.length && bo(),
      void 0 === n ? (n = e.length - t) : n > e.length - t && bo(),
      (this.segments = e),
      (this.offset = t),
      (this.len = n);
  }
  get length() {
    return this.len;
  }
  isEqual(e) {
    return 0 === Bo.comparator(this, e);
  }
  child(e) {
    const t = this.segments.slice(this.offset, this.limit());
    return (
      e instanceof Bo
        ? e.forEach(e => {
            t.push(e);
          })
        : t.push(e),
      this.construct(t)
    );
  }
  limit() {
    return this.offset + this.length;
  }
  popFirst(e) {
    return (e = void 0 === e ? 1 : e), this.construct(this.segments, this.offset + e, this.length - e);
  }
  popLast() {
    return this.construct(this.segments, this.offset, this.length - 1);
  }
  firstSegment() {
    return this.segments[this.offset];
  }
  lastSegment() {
    return this.get(this.length - 1);
  }
  get(e) {
    return this.segments[this.offset + e];
  }
  isEmpty() {
    return 0 === this.length;
  }
  isPrefixOf(e) {
    if (e.length < this.length) return !1;
    for (let t = 0; t < this.length; t++) if (this.get(t) !== e.get(t)) return !1;
    return !0;
  }
  isImmediateParentOf(e) {
    if (this.length + 1 !== e.length) return !1;
    for (let t = 0; t < this.length; t++) if (this.get(t) !== e.get(t)) return !1;
    return !0;
  }
  forEach(e) {
    for (let t = this.offset, n = this.limit(); t < n; t++) e(this.segments[t]);
  }
  toArray() {
    return this.segments.slice(this.offset, this.limit());
  }
  static comparator(e, t) {
    const n = Math.min(e.length, t.length);
    for (let r = 0; r < n; r++) {
      const n = e.get(r),
        s = t.get(r);
      if (n < s) return -1;
      if (n > s) return 1;
    }
    return e.length < t.length ? -1 : e.length > t.length ? 1 : 0;
  }
}
class $o extends Bo {
  construct(e, t, n) {
    return new $o(e, t, n);
  }
  canonicalString() {
    return this.toArray().join('/');
  }
  toString() {
    return this.canonicalString();
  }
  toUriEncodedString() {
    return this.toArray().map(encodeURIComponent).join('/');
  }
  static fromString(...e) {
    const t = [];
    for (const n of e) {
      if (n.indexOf('//') >= 0) throw new So(Io.INVALID_ARGUMENT, `Invalid segment (${n}). Paths must not contain // in them.`);
      t.push(...n.split('/').filter(e => e.length > 0));
    }
    return new $o(t);
  }
  static emptyPath() {
    return new $o([]);
  }
}
const qo = /^[_a-zA-Z][_a-zA-Z0-9]*$/;
class zo extends Bo {
  construct(e, t, n) {
    return new zo(e, t, n);
  }
  static isValidIdentifier(e) {
    return qo.test(e);
  }
  canonicalString() {
    return this.toArray()
      .map(e => ((e = e.replace(/\\/g, '\\\\').replace(/`/g, '\\`')), zo.isValidIdentifier(e) || (e = '`' + e + '`'), e))
      .join('.');
  }
  toString() {
    return this.canonicalString();
  }
  isKeyField() {
    return 1 === this.length && '__name__' === this.get(0);
  }
  static keyField() {
    return new zo(['__name__']);
  }
  static fromServerFormat(e) {
    const t = [];
    let n = '',
      r = 0;
    const s = () => {
      if (0 === n.length)
        throw new So(
          Io.INVALID_ARGUMENT,
          `Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`
        );
      t.push(n), (n = '');
    };
    let i = !1;
    for (; r < e.length; ) {
      const t = e[r];
      if ('\\' === t) {
        if (r + 1 === e.length) throw new So(Io.INVALID_ARGUMENT, 'Path has trailing escape character: ' + e);
        const t = e[r + 1];
        if ('\\' !== t && '.' !== t && '`' !== t) throw new So(Io.INVALID_ARGUMENT, 'Path has invalid escape sequence: ' + e);
        (n += t), (r += 2);
      } else '`' === t ? ((i = !i), r++) : '.' !== t || i ? ((n += t), r++) : (s(), r++);
    }
    if ((s(), i)) throw new So(Io.INVALID_ARGUMENT, 'Unterminated ` in path: ' + e);
    return new zo(t);
  }
  static emptyPath() {
    return new zo([]);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Ho {
  constructor(e) {
    this.path = e;
  }
  static fromPath(e) {
    return new Ho($o.fromString(e));
  }
  static fromName(e) {
    return new Ho($o.fromString(e).popFirst(5));
  }
  static empty() {
    return new Ho($o.emptyPath());
  }
  get collectionGroup() {
    return this.path.popLast().lastSegment();
  }
  hasCollectionId(e) {
    return this.path.length >= 2 && this.path.get(this.path.length - 2) === e;
  }
  getCollectionGroup() {
    return this.path.get(this.path.length - 2);
  }
  getCollectionPath() {
    return this.path.popLast();
  }
  isEqual(e) {
    return null !== e && 0 === $o.comparator(this.path, e.path);
  }
  toString() {
    return this.path.toString();
  }
  static comparator(e, t) {
    return $o.comparator(e.path, t.path);
  }
  static isDocumentKey(e) {
    return e.length % 2 == 0;
  }
  static fromSegments(e) {
    return new Ho(new $o(e.slice()));
  }
}
function Go(e) {
  return new Ko(e.readTime, e.key, -1);
}
class Ko {
  constructor(e, t, n) {
    (this.readTime = e), (this.documentKey = t), (this.largestBatchId = n);
  }
  static min() {
    return new Ko(jo.min(), Ho.empty(), -1);
  }
  static max() {
    return new Ko(jo.max(), Ho.empty(), -1);
  }
}
function Wo(e, t) {
  let n = e.readTime.compareTo(t.readTime);
  return 0 !== n
    ? n
    : ((n = Ho.comparator(e.documentKey, t.documentKey)), 0 !== n ? n : Uo(e.largestBatchId, t.largestBatchId));
      /**
       * @license
       * Copyright 2020 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */
}
class Qo {
  constructor() {
    this.onCommittedListeners = [];
  }
  addOnCommittedListener(e) {
    this.onCommittedListeners.push(e);
  }
  raiseOnCommittedEvent() {
    this.onCommittedListeners.forEach(e => e());
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function Xo(e) {
  if (
    e.code !== Io.FAILED_PRECONDITION ||
    'The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.' !==
      e.message
  )
    throw e;
  yo('LocalStore', 'Unexpectedly lost primary lease');
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Jo {
  constructor(e) {
    (this.nextCallback = null),
      (this.catchCallback = null),
      (this.result = void 0),
      (this.error = void 0),
      (this.isDone = !1),
      (this.callbackAttached = !1),
      e(
        e => {
          (this.isDone = !0), (this.result = e), this.nextCallback && this.nextCallback(e);
        },
        e => {
          (this.isDone = !0), (this.error = e), this.catchCallback && this.catchCallback(e);
        }
      );
  }
  catch(e) {
    return this.next(void 0, e);
  }
  next(e, t) {
    return (
      this.callbackAttached && bo(),
      (this.callbackAttached = !0),
      this.isDone
        ? this.error
          ? this.wrapFailure(t, this.error)
          : this.wrapSuccess(e, this.result)
        : new Jo((n, r) => {
            (this.nextCallback = t => {
              this.wrapSuccess(e, t).next(n, r);
            }),
              (this.catchCallback = e => {
                this.wrapFailure(t, e).next(n, r);
              });
          })
    );
  }
  toPromise() {
    return new Promise((e, t) => {
      this.next(e, t);
    });
  }
  wrapUserFunction(e) {
    try {
      const t = e();
      return t instanceof Jo ? t : Jo.resolve(t);
    } catch (e) {
      return Jo.reject(e);
    }
  }
  wrapSuccess(e, t) {
    return e ? this.wrapUserFunction(() => e(t)) : Jo.resolve(t);
  }
  wrapFailure(e, t) {
    return e ? this.wrapUserFunction(() => e(t)) : Jo.reject(t);
  }
  static resolve(e) {
    return new Jo((t, n) => {
      t(e);
    });
  }
  static reject(e) {
    return new Jo((t, n) => {
      n(e);
    });
  }
  static waitFor(e) {
    return new Jo((t, n) => {
      let r = 0,
        s = 0,
        i = !1;
      e.forEach(e => {
        ++r,
          e.next(
            () => {
              ++s, i && s === r && t();
            },
            e => n(e)
          );
      }),
        (i = !0),
        s === r && t();
    });
  }
  static or(e) {
    let t = Jo.resolve(!1);
    for (const n of e) t = t.next(e => (e ? Jo.resolve(e) : n()));
    return t;
  }
  static forEach(e, t) {
    const n = [];
    return (
      e.forEach((e, r) => {
        n.push(t.call(this, e, r));
      }),
      this.waitFor(n)
    );
  }
  static mapArray(e, t) {
    return new Jo((n, r) => {
      const s = e.length,
        i = new Array(s);
      let o = 0;
      for (let a = 0; a < s; a++) {
        const c = a;
        t(e[c]).next(
          e => {
            (i[c] = e), ++o, o === s && n(i);
          },
          e => r(e)
        );
      }
    });
  }
  static doWhile(e, t) {
    return new Jo((n, r) => {
      const s = () => {
        !0 === e()
          ? t().next(() => {
              s();
            }, r)
          : n();
      };
      s();
    });
  }
}
function Yo(e) {
  return 'IndexedDbTransactionError' === e.name;
}
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Zo {
  constructor(e, t) {
    (this.previousValue = e), t && ((t.sequenceNumberHandler = e => this.ie(e)), (this.se = e => t.writeSequenceNumber(e)));
  }
  ie(e) {
    return (this.previousValue = Math.max(e, this.previousValue)), this.previousValue;
  }
  next() {
    const e = ++this.previousValue;
    return this.se && this.se(e), e;
  }
}
function ea(e) {
  return null == e;
}
function ta(e) {
  return 0 === e && 1 / e == -1 / 0;
}
function na(e, t) {
  let n = t;
  const r = e.length;
  for (let t = 0; t < r; t++) {
    const r = e.charAt(t);
    switch (r) {
      case '\0':
        n += '';
        break;
      case '':
        n += '';
        break;
      default:
        n += r;
    }
  }
  return n;
}
function ra(e) {
  return e + '';
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function sa(e) {
  let t = 0;
  for (const n in e) Object.prototype.hasOwnProperty.call(e, n) && t++;
  return t;
}
function ia(e, t) {
  for (const n in e) Object.prototype.hasOwnProperty.call(e, n) && t(n, e[n]);
}
function oa(e) {
  for (const t in e) if (Object.prototype.hasOwnProperty.call(e, t)) return !1;
  return !0;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ Zo.oe = -1;
class aa {
  constructor(e, t) {
    (this.comparator = e), (this.root = t || ua.EMPTY);
  }
  insert(e, t) {
    return new aa(this.comparator, this.root.insert(e, t, this.comparator).copy(null, null, ua.BLACK, null, null));
  }
  remove(e) {
    return new aa(this.comparator, this.root.remove(e, this.comparator).copy(null, null, ua.BLACK, null, null));
  }
  get(e) {
    let t = this.root;
    for (; !t.isEmpty(); ) {
      const n = this.comparator(e, t.key);
      if (0 === n) return t.value;
      n < 0 ? (t = t.left) : n > 0 && (t = t.right);
    }
    return null;
  }
  indexOf(e) {
    let t = 0,
      n = this.root;
    for (; !n.isEmpty(); ) {
      const r = this.comparator(e, n.key);
      if (0 === r) return t + n.left.size;
      r < 0 ? (n = n.left) : ((t += n.left.size + 1), (n = n.right));
    }
    return -1;
  }
  isEmpty() {
    return this.root.isEmpty();
  }
  get size() {
    return this.root.size;
  }
  minKey() {
    return this.root.minKey();
  }
  maxKey() {
    return this.root.maxKey();
  }
  inorderTraversal(e) {
    return this.root.inorderTraversal(e);
  }
  forEach(e) {
    this.inorderTraversal((t, n) => (e(t, n), !1));
  }
  toString() {
    const e = [];
    return this.inorderTraversal((t, n) => (e.push(`${t}:${n}`), !1)), `{${e.join(', ')}}`;
  }
  reverseTraversal(e) {
    return this.root.reverseTraversal(e);
  }
  getIterator() {
    return new ca(this.root, null, this.comparator, !1);
  }
  getIteratorFrom(e) {
    return new ca(this.root, e, this.comparator, !1);
  }
  getReverseIterator() {
    return new ca(this.root, null, this.comparator, !0);
  }
  getReverseIteratorFrom(e) {
    return new ca(this.root, e, this.comparator, !0);
  }
}
class ca {
  constructor(e, t, n, r) {
    (this.isReverse = r), (this.nodeStack = []);
    let s = 1;
    for (; !e.isEmpty(); )
      if (((s = t ? n(e.key, t) : 1), t && r && (s *= -1), s < 0)) e = this.isReverse ? e.left : e.right;
      else {
        if (0 === s) {
          this.nodeStack.push(e);
          break;
        }
        this.nodeStack.push(e), (e = this.isReverse ? e.right : e.left);
      }
  }
  getNext() {
    let e = this.nodeStack.pop();
    const t = { key: e.key, value: e.value };
    if (this.isReverse) for (e = e.left; !e.isEmpty(); ) this.nodeStack.push(e), (e = e.right);
    else for (e = e.right; !e.isEmpty(); ) this.nodeStack.push(e), (e = e.left);
    return t;
  }
  hasNext() {
    return this.nodeStack.length > 0;
  }
  peek() {
    if (0 === this.nodeStack.length) return null;
    const e = this.nodeStack[this.nodeStack.length - 1];
    return { key: e.key, value: e.value };
  }
}
class ua {
  constructor(e, t, n, r, s) {
    (this.key = e),
      (this.value = t),
      (this.color = null != n ? n : ua.RED),
      (this.left = null != r ? r : ua.EMPTY),
      (this.right = null != s ? s : ua.EMPTY),
      (this.size = this.left.size + 1 + this.right.size);
  }
  copy(e, t, n, r, s) {
    return new ua(
      null != e ? e : this.key,
      null != t ? t : this.value,
      null != n ? n : this.color,
      null != r ? r : this.left,
      null != s ? s : this.right
    );
  }
  isEmpty() {
    return !1;
  }
  inorderTraversal(e) {
    return this.left.inorderTraversal(e) || e(this.key, this.value) || this.right.inorderTraversal(e);
  }
  reverseTraversal(e) {
    return this.right.reverseTraversal(e) || e(this.key, this.value) || this.left.reverseTraversal(e);
  }
  min() {
    return this.left.isEmpty() ? this : this.left.min();
  }
  minKey() {
    return this.min().key;
  }
  maxKey() {
    return this.right.isEmpty() ? this.key : this.right.maxKey();
  }
  insert(e, t, n) {
    let r = this;
    const s = n(e, r.key);
    return (
      (r =
        s < 0
          ? r.copy(null, null, null, r.left.insert(e, t, n), null)
          : 0 === s
          ? r.copy(null, t, null, null, null)
          : r.copy(null, null, null, null, r.right.insert(e, t, n))),
      r.fixUp()
    );
  }
  removeMin() {
    if (this.left.isEmpty()) return ua.EMPTY;
    let e = this;
    return (
      e.left.isRed() || e.left.left.isRed() || (e = e.moveRedLeft()), (e = e.copy(null, null, null, e.left.removeMin(), null)), e.fixUp()
    );
  }
  remove(e, t) {
    let n,
      r = this;
    if (t(e, r.key) < 0)
      r.left.isEmpty() || r.left.isRed() || r.left.left.isRed() || (r = r.moveRedLeft()),
        (r = r.copy(null, null, null, r.left.remove(e, t), null));
    else {
      if (
        (r.left.isRed() && (r = r.rotateRight()),
        r.right.isEmpty() || r.right.isRed() || r.right.left.isRed() || (r = r.moveRedRight()),
        0 === t(e, r.key))
      ) {
        if (r.right.isEmpty()) return ua.EMPTY;
        (n = r.right.min()), (r = r.copy(n.key, n.value, null, null, r.right.removeMin()));
      }
      r = r.copy(null, null, null, null, r.right.remove(e, t));
    }
    return r.fixUp();
  }
  isRed() {
    return this.color;
  }
  fixUp() {
    let e = this;
    return (
      e.right.isRed() && !e.left.isRed() && (e = e.rotateLeft()),
      e.left.isRed() && e.left.left.isRed() && (e = e.rotateRight()),
      e.left.isRed() && e.right.isRed() && (e = e.colorFlip()),
      e
    );
  }
  moveRedLeft() {
    let e = this.colorFlip();
    return (
      e.right.left.isRed() && ((e = e.copy(null, null, null, null, e.right.rotateRight())), (e = e.rotateLeft()), (e = e.colorFlip())), e
    );
  }
  moveRedRight() {
    let e = this.colorFlip();
    return e.left.left.isRed() && ((e = e.rotateRight()), (e = e.colorFlip())), e;
  }
  rotateLeft() {
    const e = this.copy(null, null, ua.RED, null, this.right.left);
    return this.right.copy(null, null, this.color, e, null);
  }
  rotateRight() {
    const e = this.copy(null, null, ua.RED, this.left.right, null);
    return this.left.copy(null, null, this.color, null, e);
  }
  colorFlip() {
    const e = this.left.copy(null, null, !this.left.color, null, null),
      t = this.right.copy(null, null, !this.right.color, null, null);
    return this.copy(null, null, !this.color, e, t);
  }
  checkMaxDepth() {
    const e = this.check();
    return Math.pow(2, e) <= this.size + 1;
  }
  check() {
    if (this.isRed() && this.left.isRed()) throw bo();
    if (this.right.isRed()) throw bo();
    const e = this.left.check();
    if (e !== this.right.check()) throw bo();
    return e + (this.isRed() ? 0 : 1);
  }
}
(ua.EMPTY = null),
  (ua.RED = !0),
  (ua.BLACK = !1),
  (ua.EMPTY = new (class {
    constructor() {
      this.size = 0;
    }
    get key() {
      throw bo();
    }
    get value() {
      throw bo();
    }
    get color() {
      throw bo();
    }
    get left() {
      throw bo();
    }
    get right() {
      throw bo();
    }
    copy(e, t, n, r, s) {
      return this;
    }
    insert(e, t, n) {
      return new ua(e, t);
    }
    remove(e, t) {
      return this;
    }
    isEmpty() {
      return !0;
    }
    inorderTraversal(e) {
      return !1;
    }
    reverseTraversal(e) {
      return !1;
    }
    minKey() {
      return null;
    }
    maxKey() {
      return null;
    }
    isRed() {
      return !1;
    }
    checkMaxDepth() {
      return !0;
    }
    check() {
      return 0;
    }
  })());
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ha {
  constructor(e) {
    (this.comparator = e), (this.data = new aa(this.comparator));
  }
  has(e) {
    return null !== this.data.get(e);
  }
  first() {
    return this.data.minKey();
  }
  last() {
    return this.data.maxKey();
  }
  get size() {
    return this.data.size;
  }
  indexOf(e) {
    return this.data.indexOf(e);
  }
  forEach(e) {
    this.data.inorderTraversal((t, n) => (e(t), !1));
  }
  forEachInRange(e, t) {
    const n = this.data.getIteratorFrom(e[0]);
    for (; n.hasNext(); ) {
      const r = n.getNext();
      if (this.comparator(r.key, e[1]) >= 0) return;
      t(r.key);
    }
  }
  forEachWhile(e, t) {
    let n;
    for (n = void 0 !== t ? this.data.getIteratorFrom(t) : this.data.getIterator(); n.hasNext(); ) if (!e(n.getNext().key)) return;
  }
  firstAfterOrEqual(e) {
    const t = this.data.getIteratorFrom(e);
    return t.hasNext() ? t.getNext().key : null;
  }
  getIterator() {
    return new la(this.data.getIterator());
  }
  getIteratorFrom(e) {
    return new la(this.data.getIteratorFrom(e));
  }
  add(e) {
    return this.copy(this.data.remove(e).insert(e, !0));
  }
  delete(e) {
    return this.has(e) ? this.copy(this.data.remove(e)) : this;
  }
  isEmpty() {
    return this.data.isEmpty();
  }
  unionWith(e) {
    let t = this;
    return (
      t.size < e.size && ((t = e), (e = this)),
      e.forEach(e => {
        t = t.add(e);
      }),
      t
    );
  }
  isEqual(e) {
    if (!(e instanceof ha)) return !1;
    if (this.size !== e.size) return !1;
    const t = this.data.getIterator(),
      n = e.data.getIterator();
    for (; t.hasNext(); ) {
      const e = t.getNext().key,
        r = n.getNext().key;
      if (0 !== this.comparator(e, r)) return !1;
    }
    return !0;
  }
  toArray() {
    const e = [];
    return (
      this.forEach(t => {
        e.push(t);
      }),
      e
    );
  }
  toString() {
    const e = [];
    return this.forEach(t => e.push(t)), 'SortedSet(' + e.toString() + ')';
  }
  copy(e) {
    const t = new ha(this.comparator);
    return (t.data = e), t;
  }
}
class la {
  constructor(e) {
    this.iter = e;
  }
  getNext() {
    return this.iter.getNext().key;
  }
  hasNext() {
    return this.iter.hasNext();
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class da {
  constructor(e) {
    (this.fields = e), e.sort(zo.comparator);
  }
  static empty() {
    return new da([]);
  }
  unionWith(e) {
    let t = new ha(zo.comparator);
    for (const e of this.fields) t = t.add(e);
    for (const n of e) t = t.add(n);
    return new da(t.toArray());
  }
  covers(e) {
    for (const t of this.fields) if (t.isPrefixOf(e)) return !0;
    return !1;
  }
  isEqual(e) {
    return Fo(this.fields, e.fields, (e, t) => e.isEqual(t));
  }
}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class fa extends Error {
  constructor() {
    super(...arguments), (this.name = 'Base64DecodeError');
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class pa {
  constructor(e) {
    this.binaryString = e;
  }
  static fromBase64String(e) {
    const t = (function (e) {
      try {
        return atob(e);
      } catch (e) {
        throw 'undefined' != typeof DOMException && e instanceof DOMException ? new fa('Invalid base64 string: ' + e) : e;
      }
    })(e);
    return new pa(t);
  }
  static fromUint8Array(e) {
    const t = (function (e) {
      let t = '';
      for (let n = 0; n < e.length; ++n) t += String.fromCharCode(e[n]);
      return t;
    })(e);
    return new pa(t);
  }
  [Symbol.iterator]() {
    let e = 0;
    return {
      next: () => (e < this.binaryString.length ? { value: this.binaryString.charCodeAt(e++), done: !1 } : { value: void 0, done: !0 }),
    };
  }
  toBase64() {
    return (function (e) {
      return btoa(e);
    })(this.binaryString);
  }
  toUint8Array() {
    return (function (e) {
      const t = new Uint8Array(e.length);
      for (let n = 0; n < e.length; n++) t[n] = e.charCodeAt(n);
      return t;
    })(
      /**
       * @license
       * Copyright 2020 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */ this.binaryString
    );
  }
  approximateByteSize() {
    return 2 * this.binaryString.length;
  }
  compareTo(e) {
    return Uo(this.binaryString, e.binaryString);
  }
  isEqual(e) {
    return this.binaryString === e.binaryString;
  }
}
pa.EMPTY_BYTE_STRING = new pa('');
const ga = new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);
function ma(e) {
  if ((To(!!e), 'string' == typeof e)) {
    let t = 0;
    const n = ga.exec(e);
    if ((To(!!n), n[1])) {
      let e = n[1];
      (e = (e + '000000000').substr(0, 9)), (t = Number(e));
    }
    const r = new Date(e);
    return { seconds: Math.floor(r.getTime() / 1e3), nanos: t };
  }
  return { seconds: ya(e.seconds), nanos: ya(e.nanos) };
}
function ya(e) {
  return 'number' == typeof e ? e : 'string' == typeof e ? Number(e) : 0;
}
function va(e) {
  return 'string' == typeof e ? pa.fromBase64String(e) : pa.fromUint8Array(e);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function wa(e) {
  var t, n;
  return (
    'server_timestamp' ===
    (null === (n = ((null === (t = null == e ? void 0 : e.mapValue) || void 0 === t ? void 0 : t.fields) || {}).__type__) || void 0 === n
      ? void 0
      : n.stringValue)
  );
}
function _a(e) {
  const t = e.mapValue.fields.__previous_value__;
  return wa(t) ? _a(t) : t;
}
function ba(e) {
  const t = ma(e.mapValue.fields.__local_write_time__.timestampValue);
  return new Vo(t.seconds, t.nanos);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Ta {
  constructor(e, t, n, r, s, i, o, a, c) {
    (this.databaseId = e),
      (this.appId = t),
      (this.persistenceKey = n),
      (this.host = r),
      (this.ssl = s),
      (this.forceLongPolling = i),
      (this.autoDetectLongPolling = o),
      (this.longPollingOptions = a),
      (this.useFetchStreams = c);
  }
}
class Ea {
  constructor(e, t) {
    (this.projectId = e), (this.database = t || '(default)');
  }
  static empty() {
    return new Ea('', '');
  }
  get isDefaultDatabase() {
    return '(default)' === this.database;
  }
  isEqual(e) {
    return e instanceof Ea && e.projectId === this.projectId && e.database === this.database;
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Ia = { fields: { __type__: { stringValue: '__max__' } } };
function Sa(e) {
  return 'nullValue' in e
    ? 0
    : 'booleanValue' in e
    ? 1
    : 'integerValue' in e || 'doubleValue' in e
    ? 2
    : 'timestampValue' in e
    ? 3
    : 'stringValue' in e
    ? 5
    : 'bytesValue' in e
    ? 6
    : 'referenceValue' in e
    ? 7
    : 'geoPointValue' in e
    ? 8
    : 'arrayValue' in e
    ? 9
    : 'mapValue' in e
    ? wa(e)
      ? 4
      : (function (e) {
          return '__max__' === (((e.mapValue || {}).fields || {}).__type__ || {}).stringValue;
        })(
          /**
           * @license
           * Copyright 2017 Google LLC
           *
           * Licensed under the Apache License, Version 2.0 (the "License");
           * you may not use this file except in compliance with the License.
           * You may obtain a copy of the License at
           *
           *   http://www.apache.org/licenses/LICENSE-2.0
           *
           * Unless required by applicable law or agreed to in writing, software
           * distributed under the License is distributed on an "AS IS" BASIS,
           * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
           * See the License for the specific language governing permissions and
           * limitations under the License.
           */ e
        )
      ? 9007199254740991
      : (function (e) {
          var t, n;
          return (
            '__vector__' ===
            (null === (n = ((null === (t = null == e ? void 0 : e.mapValue) || void 0 === t ? void 0 : t.fields) || {}).__type__) ||
            void 0 === n
              ? void 0
              : n.stringValue)
          );
        })(e)
      ? 10
      : 11
    : bo();
}
function Ca(e, t) {
  if (e === t) return !0;
  const n = Sa(e);
  if (n !== Sa(t)) return !1;
  switch (n) {
    case 0:
    case 9007199254740991:
      return !0;
    case 1:
      return e.booleanValue === t.booleanValue;
    case 4:
      return ba(e).isEqual(ba(t));
    case 3:
      return (function (e, t) {
        if (
          'string' == typeof e.timestampValue &&
          'string' == typeof t.timestampValue &&
          e.timestampValue.length === t.timestampValue.length
        )
          return e.timestampValue === t.timestampValue;
        const n = ma(e.timestampValue),
          r = ma(t.timestampValue);
        return n.seconds === r.seconds && n.nanos === r.nanos;
      })(e, t);
    case 5:
      return e.stringValue === t.stringValue;
    case 6:
      return (function (e, t) {
        return va(e.bytesValue).isEqual(va(t.bytesValue));
      })(e, t);
    case 7:
      return e.referenceValue === t.referenceValue;
    case 8:
      return (function (e, t) {
        return (
          ya(e.geoPointValue.latitude) === ya(t.geoPointValue.latitude) && ya(e.geoPointValue.longitude) === ya(t.geoPointValue.longitude)
        );
      })(e, t);
    case 2:
      return (function (e, t) {
        if ('integerValue' in e && 'integerValue' in t) return ya(e.integerValue) === ya(t.integerValue);
        if ('doubleValue' in e && 'doubleValue' in t) {
          const n = ya(e.doubleValue),
            r = ya(t.doubleValue);
          return n === r ? ta(n) === ta(r) : isNaN(n) && isNaN(r);
        }
        return !1;
      })(e, t);
    case 9:
      return Fo(e.arrayValue.values || [], t.arrayValue.values || [], Ca);
    case 10:
    case 11:
      return (function (e, t) {
        const n = e.mapValue.fields || {},
          r = t.mapValue.fields || {};
        if (sa(n) !== sa(r)) return !1;
        for (const e in n) if (n.hasOwnProperty(e) && (void 0 === r[e] || !Ca(n[e], r[e]))) return !1;
        return !0;
      })(e, t);
    default:
      return bo();
  }
}
function ka(e, t) {
  return void 0 !== (e.values || []).find(e => Ca(e, t));
}
function Aa(e, t) {
  if (e === t) return 0;
  const n = Sa(e),
    r = Sa(t);
  if (n !== r) return Uo(n, r);
  switch (n) {
    case 0:
    case 9007199254740991:
      return 0;
    case 1:
      return Uo(e.booleanValue, t.booleanValue);
    case 2:
      return (function (e, t) {
        const n = ya(e.integerValue || e.doubleValue),
          r = ya(t.integerValue || t.doubleValue);
        return n < r ? -1 : n > r ? 1 : n === r ? 0 : isNaN(n) ? (isNaN(r) ? 0 : -1) : 1;
      })(e, t);
    case 3:
      return Na(e.timestampValue, t.timestampValue);
    case 4:
      return Na(ba(e), ba(t));
    case 5:
      return Uo(e.stringValue, t.stringValue);
    case 6:
      return (function (e, t) {
        const n = va(e),
          r = va(t);
        return n.compareTo(r);
      })(e.bytesValue, t.bytesValue);
    case 7:
      return (function (e, t) {
        const n = e.split('/'),
          r = t.split('/');
        for (let e = 0; e < n.length && e < r.length; e++) {
          const t = Uo(n[e], r[e]);
          if (0 !== t) return t;
        }
        return Uo(n.length, r.length);
      })(e.referenceValue, t.referenceValue);
    case 8:
      return (function (e, t) {
        const n = Uo(ya(e.latitude), ya(t.latitude));
        return 0 !== n ? n : Uo(ya(e.longitude), ya(t.longitude));
      })(e.geoPointValue, t.geoPointValue);
    case 9:
      return Ra(e.arrayValue, t.arrayValue);
    case 10:
      return (function (e, t) {
        var n, r, s, i;
        const o = e.fields || {},
          a = t.fields || {},
          c = null === (n = o.value) || void 0 === n ? void 0 : n.arrayValue,
          u = null === (r = a.value) || void 0 === r ? void 0 : r.arrayValue,
          h = Uo(
            (null === (s = null == c ? void 0 : c.values) || void 0 === s ? void 0 : s.length) || 0,
            (null === (i = null == u ? void 0 : u.values) || void 0 === i ? void 0 : i.length) || 0
          );
        return 0 !== h ? h : Ra(c, u);
      })(e.mapValue, t.mapValue);
    case 11:
      return (function (e, t) {
        if (e === Ia && t === Ia) return 0;
        if (e === Ia) return 1;
        if (t === Ia) return -1;
        const n = e.fields || {},
          r = Object.keys(n),
          s = t.fields || {},
          i = Object.keys(s);
        r.sort(), i.sort();
        for (let e = 0; e < r.length && e < i.length; ++e) {
          const t = Uo(r[e], i[e]);
          if (0 !== t) return t;
          const o = Aa(n[r[e]], s[i[e]]);
          if (0 !== o) return o;
        }
        return Uo(r.length, i.length);
      })(e.mapValue, t.mapValue);
    default:
      throw bo();
  }
}
function Na(e, t) {
  if ('string' == typeof e && 'string' == typeof t && e.length === t.length) return Uo(e, t);
  const n = ma(e),
    r = ma(t),
    s = Uo(n.seconds, r.seconds);
  return 0 !== s ? s : Uo(n.nanos, r.nanos);
}
function Ra(e, t) {
  const n = e.values || [],
    r = t.values || [];
  for (let e = 0; e < n.length && e < r.length; ++e) {
    const t = Aa(n[e], r[e]);
    if (t) return t;
  }
  return Uo(n.length, r.length);
}
function Da(e) {
  return Oa(e);
}
function Oa(e) {
  return 'nullValue' in e
    ? 'null'
    : 'booleanValue' in e
    ? '' + e.booleanValue
    : 'integerValue' in e
    ? '' + e.integerValue
    : 'doubleValue' in e
    ? '' + e.doubleValue
    : 'timestampValue' in e
    ? (function (e) {
        const t = ma(e);
        return `time(${t.seconds},${t.nanos})`;
      })(e.timestampValue)
    : 'stringValue' in e
    ? e.stringValue
    : 'bytesValue' in e
    ? (function (e) {
        return va(e).toBase64();
      })(e.bytesValue)
    : 'referenceValue' in e
    ? (function (e) {
        return Ho.fromName(e).toString();
      })(e.referenceValue)
    : 'geoPointValue' in e
    ? (function (e) {
        return `geo(${e.latitude},${e.longitude})`;
      })(e.geoPointValue)
    : 'arrayValue' in e
    ? (function (e) {
        let t = '[',
          n = !0;
        for (const r of e.values || []) n ? (n = !1) : (t += ','), (t += Oa(r));
        return t + ']';
      })(e.arrayValue)
    : 'mapValue' in e
    ? (function (e) {
        const t = Object.keys(e.fields || {}).sort();
        let n = '{',
          r = !0;
        for (const s of t) r ? (r = !1) : (n += ','), (n += `${s}:${Oa(e.fields[s])}`);
        return n + '}';
      })(e.mapValue)
    : bo();
}
function Pa(e) {
  switch (Sa(e)) {
    case 0:
    case 1:
      return 4;
    case 2:
      return 8;
    case 3:
    case 8:
      return 16;
    case 4:
      const t = _a(e);
      return t ? 16 + Pa(t) : 16;
    case 5:
      return 2 * e.stringValue.length;
    case 6:
      return va(e.bytesValue).approximateByteSize();
    case 7:
      return e.referenceValue.length;
    case 9:
      return (function (e) {
        return (e.values || []).reduce((e, t) => e + Pa(t), 0);
      })(e.arrayValue);
    case 10:
    case 11:
      return (function (e) {
        let t = 0;
        return (
          ia(e.fields, (e, n) => {
            t += e.length + Pa(n);
          }),
          t
        );
      })(e.mapValue);
    default:
      throw bo();
  }
}
function xa(e) {
  return !!e && 'integerValue' in e;
}
function La(e) {
  return !!e && 'arrayValue' in e;
}
function Ma(e) {
  return !!e && 'nullValue' in e;
}
function Ua(e) {
  return !!e && 'doubleValue' in e && isNaN(Number(e.doubleValue));
}
function Fa(e) {
  return !!e && 'mapValue' in e;
}
function Va(e) {
  if (e.geoPointValue) return { geoPointValue: Object.assign({}, e.geoPointValue) };
  if (e.timestampValue && 'object' == typeof e.timestampValue) return { timestampValue: Object.assign({}, e.timestampValue) };
  if (e.mapValue) {
    const t = { mapValue: { fields: {} } };
    return ia(e.mapValue.fields, (e, n) => (t.mapValue.fields[e] = Va(n))), t;
  }
  if (e.arrayValue) {
    const t = { arrayValue: { values: [] } };
    for (let n = 0; n < (e.arrayValue.values || []).length; ++n) t.arrayValue.values[n] = Va(e.arrayValue.values[n]);
    return t;
  }
  return Object.assign({}, e);
}
class ja {
  constructor(e) {
    this.value = e;
  }
  static empty() {
    return new ja({ mapValue: {} });
  }
  field(e) {
    if (e.isEmpty()) return this.value;
    {
      let t = this.value;
      for (let n = 0; n < e.length - 1; ++n) if (((t = (t.mapValue.fields || {})[e.get(n)]), !Fa(t))) return null;
      return (t = (t.mapValue.fields || {})[e.lastSegment()]), t || null;
    }
  }
  set(e, t) {
    this.getFieldsMap(e.popLast())[e.lastSegment()] = Va(t);
  }
  setAll(e) {
    let t = zo.emptyPath(),
      n = {},
      r = [];
    e.forEach((e, s) => {
      if (!t.isImmediateParentOf(s)) {
        const e = this.getFieldsMap(t);
        this.applyChanges(e, n, r), (n = {}), (r = []), (t = s.popLast());
      }
      e ? (n[s.lastSegment()] = Va(e)) : r.push(s.lastSegment());
    });
    const s = this.getFieldsMap(t);
    this.applyChanges(s, n, r);
  }
  delete(e) {
    const t = this.field(e.popLast());
    Fa(t) && t.mapValue.fields && delete t.mapValue.fields[e.lastSegment()];
  }
  isEqual(e) {
    return Ca(this.value, e.value);
  }
  getFieldsMap(e) {
    let t = this.value;
    t.mapValue.fields || (t.mapValue = { fields: {} });
    for (let n = 0; n < e.length; ++n) {
      let r = t.mapValue.fields[e.get(n)];
      (Fa(r) && r.mapValue.fields) || ((r = { mapValue: { fields: {} } }), (t.mapValue.fields[e.get(n)] = r)), (t = r);
    }
    return t.mapValue.fields;
  }
  applyChanges(e, t, n) {
    ia(t, (t, n) => (e[t] = n));
    for (const t of n) delete e[t];
  }
  clone() {
    return new ja(Va(this.value));
  }
}
function Ba(e) {
  const t = [];
  return (
    ia(e.fields, (e, n) => {
      const r = new zo([e]);
      if (Fa(n)) {
        const e = Ba(n.mapValue).fields;
        if (0 === e.length) t.push(r);
        else for (const n of e) t.push(r.child(n));
      } else t.push(r);
    }),
    new da(t)
  );
  /**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
}
class $a {
  constructor(e, t, n, r, s, i, o) {
    (this.key = e),
      (this.documentType = t),
      (this.version = n),
      (this.readTime = r),
      (this.createTime = s),
      (this.data = i),
      (this.documentState = o);
  }
  static newInvalidDocument(e) {
    return new $a(e, 0, jo.min(), jo.min(), jo.min(), ja.empty(), 0);
  }
  static newFoundDocument(e, t, n, r) {
    return new $a(e, 1, t, jo.min(), n, r, 0);
  }
  static newNoDocument(e, t) {
    return new $a(e, 2, t, jo.min(), jo.min(), ja.empty(), 0);
  }
  static newUnknownDocument(e, t) {
    return new $a(e, 3, t, jo.min(), jo.min(), ja.empty(), 2);
  }
  convertToFoundDocument(e, t) {
    return (
      !this.createTime.isEqual(jo.min()) || (2 !== this.documentType && 0 !== this.documentType) || (this.createTime = e),
      (this.version = e),
      (this.documentType = 1),
      (this.data = t),
      (this.documentState = 0),
      this
    );
  }
  convertToNoDocument(e) {
    return (this.version = e), (this.documentType = 2), (this.data = ja.empty()), (this.documentState = 0), this;
  }
  convertToUnknownDocument(e) {
    return (this.version = e), (this.documentType = 3), (this.data = ja.empty()), (this.documentState = 2), this;
  }
  setHasCommittedMutations() {
    return (this.documentState = 2), this;
  }
  setHasLocalMutations() {
    return (this.documentState = 1), (this.version = jo.min()), this;
  }
  setReadTime(e) {
    return (this.readTime = e), this;
  }
  get hasLocalMutations() {
    return 1 === this.documentState;
  }
  get hasCommittedMutations() {
    return 2 === this.documentState;
  }
  get hasPendingWrites() {
    return this.hasLocalMutations || this.hasCommittedMutations;
  }
  isValidDocument() {
    return 0 !== this.documentType;
  }
  isFoundDocument() {
    return 1 === this.documentType;
  }
  isNoDocument() {
    return 2 === this.documentType;
  }
  isUnknownDocument() {
    return 3 === this.documentType;
  }
  isEqual(e) {
    return (
      e instanceof $a &&
      this.key.isEqual(e.key) &&
      this.version.isEqual(e.version) &&
      this.documentType === e.documentType &&
      this.documentState === e.documentState &&
      this.data.isEqual(e.data)
    );
  }
  mutableCopy() {
    return new $a(this.key, this.documentType, this.version, this.readTime, this.createTime, this.data.clone(), this.documentState);
  }
  toString() {
    return `Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${
      this.documentType
    }}), {documentState: ${this.documentState}})`;
  }
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class qa {
  constructor(e, t) {
    (this.position = e), (this.inclusive = t);
  }
}
function za(e, t, n) {
  let r = 0;
  for (let s = 0; s < e.position.length; s++) {
    const i = t[s],
      o = e.position[s];
    if (
      ((r = i.field.isKeyField() ? Ho.comparator(Ho.fromName(o.referenceValue), n.key) : Aa(o, n.data.field(i.field))),
      'desc' === i.dir && (r *= -1),
      0 !== r)
    )
      break;
  }
  return r;
}
function Ha(e, t) {
  if (null === e) return null === t;
  if (null === t) return !1;
  if (e.inclusive !== t.inclusive || e.position.length !== t.position.length) return !1;
  for (let n = 0; n < e.position.length; n++) if (!Ca(e.position[n], t.position[n])) return !1;
  return !0;
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Ga {
  constructor(e, t = 'asc') {
    (this.field = e), (this.dir = t);
  }
}
function Ka(e, t) {
  return e.dir === t.dir && e.field.isEqual(t.field);
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Wa {}
class Qa extends Wa {
  constructor(e, t, n) {
    super(), (this.field = e), (this.op = t), (this.value = n);
  }
  static create(e, t, n) {
    return e.isKeyField()
      ? 'in' === t || 'not-in' === t
        ? this.createKeyFieldInFilter(e, t, n)
        : new nc(e, t, n)
      : 'array-contains' === t
      ? new oc(e, n)
      : 'in' === t
      ? new ac(e, n)
      : 'not-in' === t
      ? new cc(e, n)
      : 'array-contains-any' === t
      ? new uc(e, n)
      : new Qa(e, t, n);
  }
  static createKeyFieldInFilter(e, t, n) {
    return 'in' === t ? new rc(e, n) : new sc(e, n);
  }
  matches(e) {
    const t = e.data.field(this.field);
    return '!=' === this.op
      ? null !== t && this.matchesComparison(Aa(t, this.value))
      : null !== t && Sa(this.value) === Sa(t) && this.matchesComparison(Aa(t, this.value));
  }
  matchesComparison(e) {
    switch (this.op) {
      case '<':
        return e < 0;
      case '<=':
        return e <= 0;
      case '==':
        return 0 === e;
      case '!=':
        return 0 !== e;
      case '>':
        return e > 0;
      case '>=':
        return e >= 0;
      default:
        return bo();
    }
  }
  isInequality() {
    return ['<', '<=', '>', '>=', '!=', 'not-in'].indexOf(this.op) >= 0;
  }
  getFlattenedFilters() {
    return [this];
  }
  getFilters() {
    return [this];
  }
}
class Xa extends Wa {
  constructor(e, t) {
    super(), (this.filters = e), (this.op = t), (this.ae = null);
  }
  static create(e, t) {
    return new Xa(e, t);
  }
  matches(e) {
    return Ja(this) ? void 0 === this.filters.find(t => !t.matches(e)) : void 0 !== this.filters.find(t => t.matches(e));
  }
  getFlattenedFilters() {
    return null !== this.ae || (this.ae = this.filters.reduce((e, t) => e.concat(t.getFlattenedFilters()), [])), this.ae;
  }
  getFilters() {
    return Object.assign([], this.filters);
  }
}
function Ja(e) {
  return 'and' === e.op;
}
function Ya(e) {
  return (
    (function (e) {
      for (const t of e.filters) if (t instanceof Xa) return !1;
      return !0;
    })(e) && Ja(e)
  );
}
function Za(e) {
  if (e instanceof Qa) return e.field.canonicalString() + e.op.toString() + Da(e.value);
  if (Ya(e)) return e.filters.map(e => Za(e)).join(',');
  {
    const t = e.filters.map(e => Za(e)).join(',');
    return `${e.op}(${t})`;
  }
}
function ec(e, t) {
  return e instanceof Qa
    ? (function (e, t) {
        return t instanceof Qa && e.op === t.op && e.field.isEqual(t.field) && Ca(e.value, t.value);
      })(e, t)
    : e instanceof Xa
    ? (function (e, t) {
        return (
          t instanceof Xa &&
          e.op === t.op &&
          e.filters.length === t.filters.length &&
          e.filters.reduce((e, n, r) => e && ec(n, t.filters[r]), !0)
        );
      })(e, t)
    : void bo();
}
function tc(e) {
  return e instanceof Qa
    ? (function (e) {
        return `${e.field.canonicalString()} ${e.op} ${Da(e.value)}`;
      })(e)
    : e instanceof Xa
    ? (function (e) {
        return e.op.toString() + ' {' + e.getFilters().map(tc).join(' ,') + '}';
      })(e)
    : 'Filter';
}
class nc extends Qa {
  constructor(e, t, n) {
    super(e, t, n), (this.key = Ho.fromName(n.referenceValue));
  }
  matches(e) {
    const t = Ho.comparator(e.key, this.key);
    return this.matchesComparison(t);
  }
}
class rc extends Qa {
  constructor(e, t) {
    super(e, 'in', t), (this.keys = ic('in', t));
  }
  matches(e) {
    return this.keys.some(t => t.isEqual(e.key));
  }
}
class sc extends Qa {
  constructor(e, t) {
    super(e, 'not-in', t), (this.keys = ic('not-in', t));
  }
  matches(e) {
    return !this.keys.some(t => t.isEqual(e.key));
  }
}
function ic(e, t) {
  var n;
  return ((null === (n = t.arrayValue) || void 0 === n ? void 0 : n.values) || []).map(e => Ho.fromName(e.referenceValue));
}
class oc extends Qa {
  constructor(e, t) {
    super(e, 'array-contains', t);
  }
  matches(e) {
    const t = e.data.field(this.field);
    return La(t) && ka(t.arrayValue, this.value);
  }
}
class ac extends Qa {
  constructor(e, t) {
    super(e, 'in', t);
  }
  matches(e) {
    const t = e.data.field(this.field);
    return null !== t && ka(this.value.arrayValue, t);
  }
}
class cc extends Qa {
  constructor(e, t) {
    super(e, 'not-in', t);
  }
  matches(e) {
    if (ka(this.value.arrayValue, { nullValue: 'NULL_VALUE' })) return !1;
    const t = e.data.field(this.field);
    return null !== t && !ka(this.value.arrayValue, t);
  }
}
class uc extends Qa {
  constructor(e, t) {
    super(e, 'array-contains-any', t);
  }
  matches(e) {
    const t = e.data.field(this.field);
    return !(!La(t) || !t.arrayValue.values) && t.arrayValue.values.some(e => ka(this.value.arrayValue, e));
  }
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class hc {
  constructor(e, t = null, n = [], r = [], s = null, i = null, o = null) {
    (this.path = e),
      (this.collectionGroup = t),
      (this.orderBy = n),
      (this.filters = r),
      (this.limit = s),
      (this.startAt = i),
      (this.endAt = o),
      (this.ue = null);
  }
}
function lc(e, t = null, n = [], r = [], s = null, i = null, o = null) {
  return new hc(e, t, n, r, s, i, o);
}
function dc(e) {
  const t = Eo(e);
  if (null === t.ue) {
    let e = t.path.canonicalString();
    null !== t.collectionGroup && (e += '|cg:' + t.collectionGroup),
      (e += '|f:'),
      (e += t.filters.map(e => Za(e)).join(',')),
      (e += '|ob:'),
      (e += t.orderBy
        .map(e =>
          (function (e) {
            return e.field.canonicalString() + e.dir;
          })(e)
        )
        .join(',')),
      ea(t.limit) || ((e += '|l:'), (e += t.limit)),
      t.startAt && ((e += '|lb:'), (e += t.startAt.inclusive ? 'b:' : 'a:'), (e += t.startAt.position.map(e => Da(e)).join(','))),
      t.endAt && ((e += '|ub:'), (e += t.endAt.inclusive ? 'a:' : 'b:'), (e += t.endAt.position.map(e => Da(e)).join(','))),
      (t.ue = e);
  }
  return t.ue;
}
function fc(e, t) {
  if (e.limit !== t.limit) return !1;
  if (e.orderBy.length !== t.orderBy.length) return !1;
  for (let n = 0; n < e.orderBy.length; n++) if (!Ka(e.orderBy[n], t.orderBy[n])) return !1;
  if (e.filters.length !== t.filters.length) return !1;
  for (let n = 0; n < e.filters.length; n++) if (!ec(e.filters[n], t.filters[n])) return !1;
  return e.collectionGroup === t.collectionGroup && !!e.path.isEqual(t.path) && !!Ha(e.startAt, t.startAt) && Ha(e.endAt, t.endAt);
}
function pc(e) {
  return Ho.isDocumentKey(e.path) && null === e.collectionGroup && 0 === e.filters.length;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class gc {
  constructor(e, t = null, n = [], r = [], s = null, i = 'F', o = null, a = null) {
    (this.path = e),
      (this.collectionGroup = t),
      (this.explicitOrderBy = n),
      (this.filters = r),
      (this.limit = s),
      (this.limitType = i),
      (this.startAt = o),
      (this.endAt = a),
      (this.ce = null),
      (this.le = null),
      (this.he = null),
      this.startAt,
      this.endAt;
  }
}
function mc(e) {
  return new gc(e);
}
function yc(e) {
  return (
    0 === e.filters.length &&
    null === e.limit &&
    null == e.startAt &&
    null == e.endAt &&
    (0 === e.explicitOrderBy.length || (1 === e.explicitOrderBy.length && e.explicitOrderBy[0].field.isKeyField()))
  );
}
function vc(e) {
  const t = Eo(e);
  if (null === t.ce) {
    t.ce = [];
    const e = new Set();
    for (const n of t.explicitOrderBy) t.ce.push(n), e.add(n.field.canonicalString());
    const n = t.explicitOrderBy.length > 0 ? t.explicitOrderBy[t.explicitOrderBy.length - 1].dir : 'asc',
      r = (function (e) {
        let t = new ha(zo.comparator);
        return (
          e.filters.forEach(e => {
            e.getFlattenedFilters().forEach(e => {
              e.isInequality() && (t = t.add(e.field));
            });
          }),
          t
        );
      })(t);
    r.forEach(r => {
      e.has(r.canonicalString()) || r.isKeyField() || t.ce.push(new Ga(r, n));
    }),
      e.has(zo.keyField().canonicalString()) || t.ce.push(new Ga(zo.keyField(), n));
  }
  return t.ce;
}
function wc(e) {
  const t = Eo(e);
  return (
    t.le ||
      (t.le = (function (e, t) {
        if ('F' === e.limitType) return lc(e.path, e.collectionGroup, t, e.filters, e.limit, e.startAt, e.endAt);
        {
          t = t.map(e => {
            const t = 'desc' === e.dir ? 'asc' : 'desc';
            return new Ga(e.field, t);
          });
          const n = e.endAt ? new qa(e.endAt.position, e.endAt.inclusive) : null,
            r = e.startAt ? new qa(e.startAt.position, e.startAt.inclusive) : null;
          return lc(e.path, e.collectionGroup, t, e.filters, e.limit, n, r);
        }
      })(t, vc(e))),
    t.le
  );
}
function _c(e, t, n) {
  return new gc(e.path, e.collectionGroup, e.explicitOrderBy.slice(), e.filters.slice(), t, n, e.startAt, e.endAt);
}
function bc(e, t) {
  return fc(wc(e), wc(t)) && e.limitType === t.limitType;
}
function Tc(e) {
  return `${dc(wc(e))}|lt:${e.limitType}`;
}
function Ec(e) {
  return `Query(target=${(function (e) {
    let t = e.path.canonicalString();
    return (
      null !== e.collectionGroup && (t += ' collectionGroup=' + e.collectionGroup),
      e.filters.length > 0 && (t += `, filters: [${e.filters.map(e => tc(e)).join(', ')}]`),
      ea(e.limit) || (t += ', limit: ' + e.limit),
      e.orderBy.length > 0 &&
        (t += `, orderBy: [${e.orderBy
          .map(e =>
            (function (e) {
              return `${e.field.canonicalString()} (${e.dir})`;
            })(e)
          )
          .join(', ')}]`),
      e.startAt && ((t += ', startAt: '), (t += e.startAt.inclusive ? 'b:' : 'a:'), (t += e.startAt.position.map(e => Da(e)).join(','))),
      e.endAt && ((t += ', endAt: '), (t += e.endAt.inclusive ? 'a:' : 'b:'), (t += e.endAt.position.map(e => Da(e)).join(','))),
      `Target(${t})`
    );
  })(wc(e))}; limitType=${e.limitType})`;
}
function Ic(e, t) {
  return (
    t.isFoundDocument() &&
    (function (e, t) {
      const n = t.key.path;
      return null !== e.collectionGroup
        ? t.key.hasCollectionId(e.collectionGroup) && e.path.isPrefixOf(n)
        : Ho.isDocumentKey(e.path)
        ? e.path.isEqual(n)
        : e.path.isImmediateParentOf(n);
    })(e, t) &&
    (function (e, t) {
      for (const n of vc(e)) if (!n.field.isKeyField() && null === t.data.field(n.field)) return !1;
      return !0;
    })(e, t) &&
    (function (e, t) {
      for (const n of e.filters) if (!n.matches(t)) return !1;
      return !0;
    })(e, t) &&
    (function (e, t) {
      return (
        !(
          e.startAt &&
          !(function (e, t, n) {
            const r = za(e, t, n);
            return e.inclusive ? r <= 0 : r < 0;
          })(e.startAt, vc(e), t)
        ) &&
        !(
          e.endAt &&
          !(function (e, t, n) {
            const r = za(e, t, n);
            return e.inclusive ? r >= 0 : r > 0;
          })(e.endAt, vc(e), t)
        )
      );
    })(e, t)
  );
}
function Sc(e) {
  return (t, n) => {
    let r = !1;
    for (const s of vc(e)) {
      const e = Cc(s, t, n);
      if (0 !== e) return e;
      r = r || s.field.isKeyField();
    }
    return 0;
  };
}
function Cc(e, t, n) {
  const r = e.field.isKeyField()
    ? Ho.comparator(t.key, n.key)
    : (function (e, t, n) {
        const r = t.data.field(e),
          s = n.data.field(e);
        return null !== r && null !== s ? Aa(r, s) : bo();
      })(e.field, t, n);
  switch (e.dir) {
    case 'asc':
      return r;
    case 'desc':
      return -1 * r;
    default:
      return bo();
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class kc {
  constructor(e, t) {
    (this.mapKeyFn = e), (this.equalsFn = t), (this.inner = {}), (this.innerSize = 0);
  }
  get(e) {
    const t = this.mapKeyFn(e),
      n = this.inner[t];
    if (void 0 !== n) for (const [t, r] of n) if (this.equalsFn(t, e)) return r;
  }
  has(e) {
    return void 0 !== this.get(e);
  }
  set(e, t) {
    const n = this.mapKeyFn(e),
      r = this.inner[n];
    if (void 0 === r) return (this.inner[n] = [[e, t]]), void this.innerSize++;
    for (let n = 0; n < r.length; n++) if (this.equalsFn(r[n][0], e)) return void (r[n] = [e, t]);
    r.push([e, t]), this.innerSize++;
  }
  delete(e) {
    const t = this.mapKeyFn(e),
      n = this.inner[t];
    if (void 0 === n) return !1;
    for (let r = 0; r < n.length; r++)
      if (this.equalsFn(n[r][0], e)) return 1 === n.length ? delete this.inner[t] : n.splice(r, 1), this.innerSize--, !0;
    return !1;
  }
  forEach(e) {
    ia(this.inner, (t, n) => {
      for (const [t, r] of n) e(t, r);
    });
  }
  isEmpty() {
    return oa(this.inner);
  }
  size() {
    return this.innerSize;
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Ac = new aa(Ho.comparator);
function Nc() {
  return Ac;
}
const Rc = new aa(Ho.comparator);
function Dc(...e) {
  let t = Rc;
  for (const n of e) t = t.insert(n.key, n);
  return t;
}
function Oc(e) {
  let t = Rc;
  return e.forEach((e, n) => (t = t.insert(e, n.overlayedDocument))), t;
}
function Pc() {
  return Lc();
}
function xc() {
  return Lc();
}
function Lc() {
  return new kc(
    e => e.toString(),
    (e, t) => e.isEqual(t)
  );
}
const Mc = new aa(Ho.comparator),
  Uc = new ha(Ho.comparator);
function Fc(...e) {
  let t = Uc;
  for (const n of e) t = t.add(n);
  return t;
}
const Vc = new ha(Uo);
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function jc(e, t) {
  if (e.useProto3Json) {
    if (isNaN(t)) return { doubleValue: 'NaN' };
    if (t === 1 / 0) return { doubleValue: 'Infinity' };
    if (t === -1 / 0) return { doubleValue: '-Infinity' };
  }
  return { doubleValue: ta(t) ? '-0' : t };
}
function Bc(e) {
  return { integerValue: '' + e };
}
function $c(e, t) {
  return (function (e) {
    return 'number' == typeof e && Number.isInteger(e) && !ta(e) && e <= Number.MAX_SAFE_INTEGER && e >= Number.MIN_SAFE_INTEGER;
  })(
    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ t
  )
    ? Bc(t)
    : jc(e, t);
}
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class qc {
  constructor() {
    this._ = void 0;
  }
}
function zc(e, t, n) {
  return e instanceof Kc
    ? (function (e, t) {
        const n = {
          fields: {
            __type__: { stringValue: 'server_timestamp' },
            __local_write_time__: { timestampValue: { seconds: e.seconds, nanos: e.nanoseconds } },
          },
        };
        return t && wa(t) && (t = _a(t)), t && (n.fields.__previous_value__ = t), { mapValue: n };
      })(n, t)
    : e instanceof Wc
    ? Qc(e, t)
    : e instanceof Xc
    ? Jc(e, t)
    : (function (e, t) {
        const n = Gc(e, t),
          r = Zc(n) + Zc(e.Pe);
        return xa(n) && xa(e.Pe) ? Bc(r) : jc(e.serializer, r);
      })(e, t);
}
function Hc(e, t, n) {
  return e instanceof Wc ? Qc(e, t) : e instanceof Xc ? Jc(e, t) : n;
}
function Gc(e, t) {
  return e instanceof Yc
    ? (function (e) {
        return (
          xa(e) ||
          (function (e) {
            return !!e && 'doubleValue' in e;
          })(e)
        );
      })(t)
      ? t
      : { integerValue: 0 }
    : null;
}
class Kc extends qc {}
class Wc extends qc {
  constructor(e) {
    super(), (this.elements = e);
  }
}
function Qc(e, t) {
  const n = eu(t);
  for (const t of e.elements) n.some(e => Ca(e, t)) || n.push(t);
  return { arrayValue: { values: n } };
}
class Xc extends qc {
  constructor(e) {
    super(), (this.elements = e);
  }
}
function Jc(e, t) {
  let n = eu(t);
  for (const t of e.elements) n = n.filter(e => !Ca(e, t));
  return { arrayValue: { values: n } };
}
class Yc extends qc {
  constructor(e, t) {
    super(), (this.serializer = e), (this.Pe = t);
  }
}
function Zc(e) {
  return ya(e.integerValue || e.doubleValue);
}
function eu(e) {
  return La(e) && e.arrayValue.values ? e.arrayValue.values.slice() : [];
}
class tu {
  constructor(e, t) {
    (this.version = e), (this.transformResults = t);
  }
}
class nu {
  constructor(e, t) {
    (this.updateTime = e), (this.exists = t);
  }
  static none() {
    return new nu();
  }
  static exists(e) {
    return new nu(void 0, e);
  }
  static updateTime(e) {
    return new nu(e);
  }
  get isNone() {
    return void 0 === this.updateTime && void 0 === this.exists;
  }
  isEqual(e) {
    return this.exists === e.exists && (this.updateTime ? !!e.updateTime && this.updateTime.isEqual(e.updateTime) : !e.updateTime);
  }
}
function ru(e, t) {
  return void 0 !== e.updateTime
    ? t.isFoundDocument() && t.version.isEqual(e.updateTime)
    : void 0 === e.exists || e.exists === t.isFoundDocument();
}
class su {}
function iu(e, t) {
  if (!e.hasLocalMutations || (t && 0 === t.fields.length)) return null;
  if (null === t) return e.isNoDocument() ? new gu(e.key, nu.none()) : new hu(e.key, e.data, nu.none());
  {
    const n = e.data,
      r = ja.empty();
    let s = new ha(zo.comparator);
    for (let e of t.fields)
      if (!s.has(e)) {
        let t = n.field(e);
        null === t && e.length > 1 && ((e = e.popLast()), (t = n.field(e))), null === t ? r.delete(e) : r.set(e, t), (s = s.add(e));
      }
    return new lu(e.key, r, new da(s.toArray()), nu.none());
  }
}
function ou(e, t, n) {
  e instanceof hu
    ? (function (e, t, n) {
        const r = e.value.clone(),
          s = fu(e.fieldTransforms, t, n.transformResults);
        r.setAll(s), t.convertToFoundDocument(n.version, r).setHasCommittedMutations();
      })(e, t, n)
    : e instanceof lu
    ? (function (e, t, n) {
        if (!ru(e.precondition, t)) return void t.convertToUnknownDocument(n.version);
        const r = fu(e.fieldTransforms, t, n.transformResults),
          s = t.data;
        s.setAll(du(e)), s.setAll(r), t.convertToFoundDocument(n.version, s).setHasCommittedMutations();
      })(e, t, n)
    : (function (e, t, n) {
        t.convertToNoDocument(n.version).setHasCommittedMutations();
      })(0, t, n);
}
function au(e, t, n, r) {
  return e instanceof hu
    ? (function (e, t, n, r) {
        if (!ru(e.precondition, t)) return n;
        const s = e.value.clone(),
          i = pu(e.fieldTransforms, r, t);
        return s.setAll(i), t.convertToFoundDocument(t.version, s).setHasLocalMutations(), null;
      })(e, t, n, r)
    : e instanceof lu
    ? (function (e, t, n, r) {
        if (!ru(e.precondition, t)) return n;
        const s = pu(e.fieldTransforms, r, t),
          i = t.data;
        return (
          i.setAll(du(e)),
          i.setAll(s),
          t.convertToFoundDocument(t.version, i).setHasLocalMutations(),
          null === n ? null : n.unionWith(e.fieldMask.fields).unionWith(e.fieldTransforms.map(e => e.field))
        );
      })(e, t, n, r)
    : (function (e, t, n) {
        return ru(e.precondition, t) ? (t.convertToNoDocument(t.version).setHasLocalMutations(), null) : n;
      })(e, t, n);
}
function cu(e, t) {
  let n = null;
  for (const r of e.fieldTransforms) {
    const e = t.data.field(r.field),
      s = Gc(r.transform, e || null);
    null != s && (null === n && (n = ja.empty()), n.set(r.field, s));
  }
  return n || null;
}
function uu(e, t) {
  return (
    e.type === t.type &&
    !!e.key.isEqual(t.key) &&
    !!e.precondition.isEqual(t.precondition) &&
    !!(function (e, t) {
      return (
        (void 0 === e && void 0 === t) ||
        (!(!e || !t) &&
          Fo(e, t, (e, t) =>
            (function (e, t) {
              return (
                e.field.isEqual(t.field) &&
                (function (e, t) {
                  return (e instanceof Wc && t instanceof Wc) || (e instanceof Xc && t instanceof Xc)
                    ? Fo(e.elements, t.elements, Ca)
                    : e instanceof Yc && t instanceof Yc
                    ? Ca(e.Pe, t.Pe)
                    : e instanceof Kc && t instanceof Kc;
                })(e.transform, t.transform)
              );
            })(e, t)
          ))
      );
    })(e.fieldTransforms, t.fieldTransforms) &&
    (0 === e.type ? e.value.isEqual(t.value) : 1 !== e.type || (e.data.isEqual(t.data) && e.fieldMask.isEqual(t.fieldMask)))
  );
}
class hu extends su {
  constructor(e, t, n, r = []) {
    super(), (this.key = e), (this.value = t), (this.precondition = n), (this.fieldTransforms = r), (this.type = 0);
  }
  getFieldMask() {
    return null;
  }
}
class lu extends su {
  constructor(e, t, n, r, s = []) {
    super(), (this.key = e), (this.data = t), (this.fieldMask = n), (this.precondition = r), (this.fieldTransforms = s), (this.type = 1);
  }
  getFieldMask() {
    return this.fieldMask;
  }
}
function du(e) {
  const t = new Map();
  return (
    e.fieldMask.fields.forEach(n => {
      if (!n.isEmpty()) {
        const r = e.data.field(n);
        t.set(n, r);
      }
    }),
    t
  );
}
function fu(e, t, n) {
  const r = new Map();
  To(e.length === n.length);
  for (let s = 0; s < n.length; s++) {
    const i = e[s],
      o = i.transform,
      a = t.data.field(i.field);
    r.set(i.field, Hc(o, a, n[s]));
  }
  return r;
}
function pu(e, t, n) {
  const r = new Map();
  for (const s of e) {
    const e = s.transform,
      i = n.data.field(s.field);
    r.set(s.field, zc(e, i, t));
  }
  return r;
}
class gu extends su {
  constructor(e, t) {
    super(), (this.key = e), (this.precondition = t), (this.type = 2), (this.fieldTransforms = []);
  }
  getFieldMask() {
    return null;
  }
}
class mu extends su {
  constructor(e, t) {
    super(), (this.key = e), (this.precondition = t), (this.type = 3), (this.fieldTransforms = []);
  }
  getFieldMask() {
    return null;
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class yu {
  constructor(e, t, n, r) {
    (this.batchId = e), (this.localWriteTime = t), (this.baseMutations = n), (this.mutations = r);
  }
  applyToRemoteDocument(e, t) {
    const n = t.mutationResults;
    for (let t = 0; t < this.mutations.length; t++) {
      const r = this.mutations[t];
      r.key.isEqual(e.key) && ou(r, e, n[t]);
    }
  }
  applyToLocalView(e, t) {
    for (const n of this.baseMutations) n.key.isEqual(e.key) && (t = au(n, e, t, this.localWriteTime));
    for (const n of this.mutations) n.key.isEqual(e.key) && (t = au(n, e, t, this.localWriteTime));
    return t;
  }
  applyToLocalDocumentSet(e, t) {
    const n = xc();
    return (
      this.mutations.forEach(r => {
        const s = e.get(r.key),
          i = s.overlayedDocument;
        let o = this.applyToLocalView(i, s.mutatedFields);
        o = t.has(r.key) ? null : o;
        const a = iu(i, o);
        null !== a && n.set(r.key, a), i.isValidDocument() || i.convertToNoDocument(jo.min());
      }),
      n
    );
  }
  keys() {
    return this.mutations.reduce((e, t) => e.add(t.key), Fc());
  }
  isEqual(e) {
    return (
      this.batchId === e.batchId &&
      Fo(this.mutations, e.mutations, (e, t) => uu(e, t)) &&
      Fo(this.baseMutations, e.baseMutations, (e, t) => uu(e, t))
    );
  }
}
class vu {
  constructor(e, t, n, r) {
    (this.batch = e), (this.commitVersion = t), (this.mutationResults = n), (this.docVersions = r);
  }
  static from(e, t, n) {
    To(e.mutations.length === n.length);
    let r = Mc;
    const s = e.mutations;
    for (let e = 0; e < s.length; e++) r = r.insert(s[e].key, n[e].version);
    return new vu(e, t, n, r);
  }
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class wu {
  constructor(e, t) {
    (this.largestBatchId = e), (this.mutation = t);
  }
  getKey() {
    return this.mutation.key;
  }
  isEqual(e) {
    return null !== e && this.mutation === e.mutation;
  }
  toString() {
    return `Overlay{\n      largestBatchId: ${this.largestBatchId},\n      mutation: ${this.mutation.toString()}\n    }`;
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class _u {
  constructor(e, t) {
    (this.count = e), (this.unchangedNames = t);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var bu, Tu;
function Eu(e) {
  if (void 0 === e) return vo('GRPC error has no .code'), Io.UNKNOWN;
  switch (e) {
    case bu.OK:
      return Io.OK;
    case bu.CANCELLED:
      return Io.CANCELLED;
    case bu.UNKNOWN:
      return Io.UNKNOWN;
    case bu.DEADLINE_EXCEEDED:
      return Io.DEADLINE_EXCEEDED;
    case bu.RESOURCE_EXHAUSTED:
      return Io.RESOURCE_EXHAUSTED;
    case bu.INTERNAL:
      return Io.INTERNAL;
    case bu.UNAVAILABLE:
      return Io.UNAVAILABLE;
    case bu.UNAUTHENTICATED:
      return Io.UNAUTHENTICATED;
    case bu.INVALID_ARGUMENT:
      return Io.INVALID_ARGUMENT;
    case bu.NOT_FOUND:
      return Io.NOT_FOUND;
    case bu.ALREADY_EXISTS:
      return Io.ALREADY_EXISTS;
    case bu.PERMISSION_DENIED:
      return Io.PERMISSION_DENIED;
    case bu.FAILED_PRECONDITION:
      return Io.FAILED_PRECONDITION;
    case bu.ABORTED:
      return Io.ABORTED;
    case bu.OUT_OF_RANGE:
      return Io.OUT_OF_RANGE;
    case bu.UNIMPLEMENTED:
      return Io.UNIMPLEMENTED;
    case bu.DATA_LOSS:
      return Io.DATA_LOSS;
    default:
      return bo();
  }
}
((Tu = bu || (bu = {}))[(Tu.OK = 0)] = 'OK'),
  (Tu[(Tu.CANCELLED = 1)] = 'CANCELLED'),
  (Tu[(Tu.UNKNOWN = 2)] = 'UNKNOWN'),
  (Tu[(Tu.INVALID_ARGUMENT = 3)] = 'INVALID_ARGUMENT'),
  (Tu[(Tu.DEADLINE_EXCEEDED = 4)] = 'DEADLINE_EXCEEDED'),
  (Tu[(Tu.NOT_FOUND = 5)] = 'NOT_FOUND'),
  (Tu[(Tu.ALREADY_EXISTS = 6)] = 'ALREADY_EXISTS'),
  (Tu[(Tu.PERMISSION_DENIED = 7)] = 'PERMISSION_DENIED'),
  (Tu[(Tu.UNAUTHENTICATED = 16)] = 'UNAUTHENTICATED'),
  (Tu[(Tu.RESOURCE_EXHAUSTED = 8)] = 'RESOURCE_EXHAUSTED'),
  (Tu[(Tu.FAILED_PRECONDITION = 9)] = 'FAILED_PRECONDITION'),
  (Tu[(Tu.ABORTED = 10)] = 'ABORTED'),
  (Tu[(Tu.OUT_OF_RANGE = 11)] = 'OUT_OF_RANGE'),
  (Tu[(Tu.UNIMPLEMENTED = 12)] = 'UNIMPLEMENTED'),
  (Tu[(Tu.INTERNAL = 13)] = 'INTERNAL'),
  (Tu[(Tu.UNAVAILABLE = 14)] = 'UNAVAILABLE'),
  (Tu[(Tu.DATA_LOSS = 15)] = 'DATA_LOSS');
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Iu = new Zi([4294967295, 4294967295], 0);
function Su(e) {
  const t = new TextEncoder().encode(e),
    n = new eo();
  return n.update(t), new Uint8Array(n.digest());
}
function Cu(e) {
  const t = new DataView(e.buffer),
    n = t.getUint32(0, !0),
    r = t.getUint32(4, !0),
    s = t.getUint32(8, !0),
    i = t.getUint32(12, !0);
  return [new Zi([n, r], 0), new Zi([s, i], 0)];
}
class ku {
  constructor(e, t, n) {
    if (((this.bitmap = e), (this.padding = t), (this.hashCount = n), t < 0 || t >= 8)) throw new Au(`Invalid padding: ${t}`);
    if (n < 0) throw new Au(`Invalid hash count: ${n}`);
    if (e.length > 0 && 0 === this.hashCount) throw new Au(`Invalid hash count: ${n}`);
    if (0 === e.length && 0 !== t) throw new Au(`Invalid padding when bitmap length is 0: ${t}`);
    (this.Ie = 8 * e.length - t), (this.Te = Zi.fromNumber(this.Ie));
  }
  Ee(e, t, n) {
    let r = e.add(t.multiply(Zi.fromNumber(n)));
    return 1 === r.compare(Iu) && (r = new Zi([r.getBits(0), r.getBits(1)], 0)), r.modulo(this.Te).toNumber();
  }
  de(e) {
    return !!(this.bitmap[Math.floor(e / 8)] & (1 << e % 8));
  }
  mightContain(e) {
    if (0 === this.Ie) return !1;
    const t = Su(e),
      [n, r] = Cu(t);
    for (let e = 0; e < this.hashCount; e++) {
      const t = this.Ee(n, r, e);
      if (!this.de(t)) return !1;
    }
    return !0;
  }
  static create(e, t, n) {
    const r = e % 8 == 0 ? 0 : 8 - (e % 8),
      s = new Uint8Array(Math.ceil(e / 8)),
      i = new ku(s, r, t);
    return n.forEach(e => i.insert(e)), i;
  }
  insert(e) {
    if (0 === this.Ie) return;
    const t = Su(e),
      [n, r] = Cu(t);
    for (let e = 0; e < this.hashCount; e++) {
      const t = this.Ee(n, r, e);
      this.Ae(t);
    }
  }
  Ae(e) {
    const t = Math.floor(e / 8),
      n = e % 8;
    this.bitmap[t] |= 1 << n;
  }
}
class Au extends Error {
  constructor() {
    super(...arguments), (this.name = 'BloomFilterError');
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Nu {
  constructor(e, t, n, r, s) {
    (this.snapshotVersion = e),
      (this.targetChanges = t),
      (this.targetMismatches = n),
      (this.documentUpdates = r),
      (this.resolvedLimboDocuments = s);
  }
  static createSynthesizedRemoteEventForCurrentChange(e, t, n) {
    const r = new Map();
    return r.set(e, Ru.createSynthesizedTargetChangeForCurrentChange(e, t, n)), new Nu(jo.min(), r, new aa(Uo), Nc(), Fc());
  }
}
class Ru {
  constructor(e, t, n, r, s) {
    (this.resumeToken = e), (this.current = t), (this.addedDocuments = n), (this.modifiedDocuments = r), (this.removedDocuments = s);
  }
  static createSynthesizedTargetChangeForCurrentChange(e, t, n) {
    return new Ru(n, t, Fc(), Fc(), Fc());
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Du {
  constructor(e, t, n, r) {
    (this.Re = e), (this.removedTargetIds = t), (this.key = n), (this.Ve = r);
  }
}
class Ou {
  constructor(e, t) {
    (this.targetId = e), (this.me = t);
  }
}
class Pu {
  constructor(e, t, n = pa.EMPTY_BYTE_STRING, r = null) {
    (this.state = e), (this.targetIds = t), (this.resumeToken = n), (this.cause = r);
  }
}
class xu {
  constructor() {
    (this.fe = 0), (this.ge = Uu()), (this.pe = pa.EMPTY_BYTE_STRING), (this.ye = !1), (this.we = !0);
  }
  get current() {
    return this.ye;
  }
  get resumeToken() {
    return this.pe;
  }
  get Se() {
    return 0 !== this.fe;
  }
  get be() {
    return this.we;
  }
  De(e) {
    e.approximateByteSize() > 0 && ((this.we = !0), (this.pe = e));
  }
  ve() {
    let e = Fc(),
      t = Fc(),
      n = Fc();
    return (
      this.ge.forEach((r, s) => {
        switch (s) {
          case 0:
            e = e.add(r);
            break;
          case 2:
            t = t.add(r);
            break;
          case 1:
            n = n.add(r);
            break;
          default:
            bo();
        }
      }),
      new Ru(this.pe, this.ye, e, t, n)
    );
  }
  Ce() {
    (this.we = !1), (this.ge = Uu());
  }
  Fe(e, t) {
    (this.we = !0), (this.ge = this.ge.insert(e, t));
  }
  Me(e) {
    (this.we = !0), (this.ge = this.ge.remove(e));
  }
  xe() {
    this.fe += 1;
  }
  Oe() {
    (this.fe -= 1), To(this.fe >= 0);
  }
  Ne() {
    (this.we = !0), (this.ye = !0);
  }
}
class Lu {
  constructor(e) {
    (this.Le = e), (this.Be = new Map()), (this.ke = Nc()), (this.qe = Mu()), (this.Qe = new aa(Uo));
  }
  Ke(e) {
    for (const t of e.Re) e.Ve && e.Ve.isFoundDocument() ? this.$e(t, e.Ve) : this.Ue(t, e.key, e.Ve);
    for (const t of e.removedTargetIds) this.Ue(t, e.key, e.Ve);
  }
  We(e) {
    this.forEachTarget(e, t => {
      const n = this.Ge(t);
      switch (e.state) {
        case 0:
          this.ze(t) && n.De(e.resumeToken);
          break;
        case 1:
          n.Oe(), n.Se || n.Ce(), n.De(e.resumeToken);
          break;
        case 2:
          n.Oe(), n.Se || this.removeTarget(t);
          break;
        case 3:
          this.ze(t) && (n.Ne(), n.De(e.resumeToken));
          break;
        case 4:
          this.ze(t) && (this.je(t), n.De(e.resumeToken));
          break;
        default:
          bo();
      }
    });
  }
  forEachTarget(e, t) {
    e.targetIds.length > 0
      ? e.targetIds.forEach(t)
      : this.Be.forEach((e, n) => {
          this.ze(n) && t(n);
        });
  }
  He(e) {
    const t = e.targetId,
      n = e.me.count,
      r = this.Je(t);
    if (r) {
      const s = r.target;
      if (pc(s))
        if (0 === n) {
          const e = new Ho(s.path);
          this.Ue(t, e, $a.newNoDocument(e, jo.min()));
        } else To(1 === n);
      else {
        const r = this.Ye(t);
        if (r !== n) {
          const n = this.Ze(e),
            s = n ? this.Xe(n, e, r) : 1;
          if (0 !== s) {
            this.je(t);
            const e = 2 === s ? 'TargetPurposeExistenceFilterMismatchBloom' : 'TargetPurposeExistenceFilterMismatch';
            this.Qe = this.Qe.insert(t, e);
          }
        }
      }
    }
  }
  Ze(e) {
    const t = e.me.unchangedNames;
    if (!t || !t.bits) return null;
    const {
      bits: { bitmap: n = '', padding: r = 0 },
      hashCount: s = 0,
    } = t;
    let i, o;
    try {
      i = va(n).toUint8Array();
    } catch (e) {
      if (e instanceof fa)
        return (
          wo(
            'Decoding the base64 bloom filter in existence filter failed (' +
              e.message +
              '); ignoring the bloom filter and falling back to full re-query.'
          ),
          null
        );
      throw e;
    }
    try {
      o = new ku(i, r, s);
    } catch (e) {
      return wo(e instanceof Au ? 'BloomFilter error: ' : 'Applying bloom filter failed: ', e), null;
    }
    return 0 === o.Ie ? null : o;
  }
  Xe(e, t, n) {
    return t.me.count === n - this.nt(e, t.targetId) ? 0 : 2;
  }
  nt(e, t) {
    const n = this.Le.getRemoteKeysForTarget(t);
    let r = 0;
    return (
      n.forEach(n => {
        const s = this.Le.tt(),
          i = `projects/${s.projectId}/databases/${s.database}/documents/${n.path.canonicalString()}`;
        e.mightContain(i) || (this.Ue(t, n, null), r++);
      }),
      r
    );
  }
  rt(e) {
    const t = new Map();
    this.Be.forEach((n, r) => {
      const s = this.Je(r);
      if (s) {
        if (n.current && pc(s.target)) {
          const t = new Ho(s.target.path);
          null !== this.ke.get(t) || this.it(r, t) || this.Ue(r, t, $a.newNoDocument(t, e));
        }
        n.be && (t.set(r, n.ve()), n.Ce());
      }
    });
    let n = Fc();
    this.qe.forEach((e, t) => {
      let r = !0;
      t.forEachWhile(e => {
        const t = this.Je(e);
        return !t || 'TargetPurposeLimboResolution' === t.purpose || ((r = !1), !1);
      }),
        r && (n = n.add(e));
    }),
      this.ke.forEach((t, n) => n.setReadTime(e));
    const r = new Nu(e, t, this.Qe, this.ke, n);
    return (this.ke = Nc()), (this.qe = Mu()), (this.Qe = new aa(Uo)), r;
  }
  $e(e, t) {
    if (!this.ze(e)) return;
    const n = this.it(e, t.key) ? 2 : 0;
    this.Ge(e).Fe(t.key, n), (this.ke = this.ke.insert(t.key, t)), (this.qe = this.qe.insert(t.key, this.st(t.key).add(e)));
  }
  Ue(e, t, n) {
    if (!this.ze(e)) return;
    const r = this.Ge(e);
    this.it(e, t) ? r.Fe(t, 1) : r.Me(t), (this.qe = this.qe.insert(t, this.st(t).delete(e))), n && (this.ke = this.ke.insert(t, n));
  }
  removeTarget(e) {
    this.Be.delete(e);
  }
  Ye(e) {
    const t = this.Ge(e).ve();
    return this.Le.getRemoteKeysForTarget(e).size + t.addedDocuments.size - t.removedDocuments.size;
  }
  xe(e) {
    this.Ge(e).xe();
  }
  Ge(e) {
    let t = this.Be.get(e);
    return t || ((t = new xu()), this.Be.set(e, t)), t;
  }
  st(e) {
    let t = this.qe.get(e);
    return t || ((t = new ha(Uo)), (this.qe = this.qe.insert(e, t))), t;
  }
  ze(e) {
    const t = null !== this.Je(e);
    return t || yo('WatchChangeAggregator', 'Detected inactive target', e), t;
  }
  Je(e) {
    const t = this.Be.get(e);
    return t && t.Se ? null : this.Le.ot(e);
  }
  je(e) {
    this.Be.set(e, new xu()),
      this.Le.getRemoteKeysForTarget(e).forEach(t => {
        this.Ue(e, t, null);
      });
  }
  it(e, t) {
    return this.Le.getRemoteKeysForTarget(e).has(t);
  }
}
function Mu() {
  return new aa(Ho.comparator);
}
function Uu() {
  return new aa(Ho.comparator);
}
const Fu = { asc: 'ASCENDING', desc: 'DESCENDING' },
  Vu = {
    '<': 'LESS_THAN',
    '<=': 'LESS_THAN_OR_EQUAL',
    '>': 'GREATER_THAN',
    '>=': 'GREATER_THAN_OR_EQUAL',
    '==': 'EQUAL',
    '!=': 'NOT_EQUAL',
    'array-contains': 'ARRAY_CONTAINS',
    in: 'IN',
    'not-in': 'NOT_IN',
    'array-contains-any': 'ARRAY_CONTAINS_ANY',
  },
  ju = { and: 'AND', or: 'OR' };
class Bu {
  constructor(e, t) {
    (this.databaseId = e), (this.useProto3Json = t);
  }
}
function $u(e, t) {
  return e.useProto3Json || ea(t) ? t : { value: t };
}
function qu(e, t) {
  return e.useProto3Json
    ? `${new Date(1e3 * t.seconds).toISOString().replace(/\.\d*/, '').replace('Z', '')}.${('000000000' + t.nanoseconds).slice(-9)}Z`
    : { seconds: '' + t.seconds, nanos: t.nanoseconds };
}
function zu(e, t) {
  return e.useProto3Json ? t.toBase64() : t.toUint8Array();
}
function Hu(e, t) {
  return qu(e, t.toTimestamp());
}
function Gu(e) {
  return (
    To(!!e),
    jo.fromTimestamp(
      (function (e) {
        const t = ma(e);
        return new Vo(t.seconds, t.nanos);
      })(e)
    )
  );
}
function Ku(e, t) {
  return Wu(e, t).canonicalString();
}
function Wu(e, t) {
  const n = (function (e) {
    return new $o(['projects', e.projectId, 'databases', e.database]);
  })(e).child('documents');
  return void 0 === t ? n : n.child(t);
}
function Qu(e) {
  const t = $o.fromString(e);
  return To(fh(t)), t;
}
function Xu(e, t) {
  return Ku(e.databaseId, t.path);
}
function Ju(e, t) {
  const n = Qu(t);
  if (n.get(1) !== e.databaseId.projectId)
    throw new So(Io.INVALID_ARGUMENT, 'Tried to deserialize key from different project: ' + n.get(1) + ' vs ' + e.databaseId.projectId);
  if (n.get(3) !== e.databaseId.database)
    throw new So(Io.INVALID_ARGUMENT, 'Tried to deserialize key from different database: ' + n.get(3) + ' vs ' + e.databaseId.database);
  return new Ho(eh(n));
}
function Yu(e, t) {
  return Ku(e.databaseId, t);
}
function Zu(e) {
  return new $o(['projects', e.databaseId.projectId, 'databases', e.databaseId.database]).canonicalString();
}
function eh(e) {
  return To(e.length > 4 && 'documents' === e.get(4)), e.popFirst(5);
}
function th(e, t, n) {
  return { name: Xu(e, t), fields: n.value.mapValue.fields };
}
function nh(e, t) {
  return { documents: [Yu(e, t.path)] };
}
function rh(e, t) {
  const n = { structuredQuery: {} },
    r = t.path;
  let s;
  null !== t.collectionGroup
    ? ((s = r), (n.structuredQuery.from = [{ collectionId: t.collectionGroup, allDescendants: !0 }]))
    : ((s = r.popLast()), (n.structuredQuery.from = [{ collectionId: r.lastSegment() }])),
    (n.parent = Yu(e, s));
  const i = (function (e) {
    if (0 !== e.length) return lh(Xa.create(e, 'and'));
  })(t.filters);
  i && (n.structuredQuery.where = i);
  const o = (function (e) {
    if (0 !== e.length)
      return e.map(e =>
        (function (e) {
          return { field: uh(e.field), direction: oh(e.dir) };
        })(e)
      );
  })(t.orderBy);
  o && (n.structuredQuery.orderBy = o);
  const a = $u(e, t.limit);
  return (
    null !== a && (n.structuredQuery.limit = a),
    t.startAt &&
      (n.structuredQuery.startAt = (function (e) {
        return { before: e.inclusive, values: e.position };
      })(t.startAt)),
    t.endAt &&
      (n.structuredQuery.endAt = (function (e) {
        return { before: !e.inclusive, values: e.position };
      })(t.endAt)),
    { _t: n, parent: s }
  );
}
function sh(e) {
  let t = (function (e) {
    const t = Qu(e);
    return 4 === t.length ? $o.emptyPath() : eh(t);
  })(e.parent);
  const n = e.structuredQuery,
    r = n.from ? n.from.length : 0;
  let s = null;
  if (r > 0) {
    To(1 === r);
    const e = n.from[0];
    e.allDescendants ? (s = e.collectionId) : (t = t.child(e.collectionId));
  }
  let i = [];
  n.where &&
    (i = (function (e) {
      const t = ih(e);
      return t instanceof Xa && Ya(t) ? t.getFilters() : [t];
    })(n.where));
  let o = [];
  n.orderBy &&
    (o = (function (e) {
      return e.map(e =>
        (function (e) {
          return new Ga(
            hh(e.field),
            (function (e) {
              switch (e) {
                case 'ASCENDING':
                  return 'asc';
                case 'DESCENDING':
                  return 'desc';
                default:
                  return;
              }
            })(e.direction)
          );
        })(e)
      );
    })(n.orderBy));
  let a = null;
  n.limit &&
    (a = (function (e) {
      let t;
      return (t = 'object' == typeof e ? e.value : e), ea(t) ? null : t;
    })(n.limit));
  let c = null;
  n.startAt &&
    (c = (function (e) {
      const t = !!e.before,
        n = e.values || [];
      return new qa(n, t);
    })(n.startAt));
  let u = null;
  return (
    n.endAt &&
      (u = (function (e) {
        const t = !e.before,
          n = e.values || [];
        return new qa(n, t);
      })(n.endAt)),
    (function (e, t, n, r, s, i, o, a) {
      return new gc(e, t, n, r, s, i, o, a);
    })(t, s, o, i, a, 'F', c, u)
  );
}
function ih(e) {
  return void 0 !== e.unaryFilter
    ? (function (e) {
        switch (e.unaryFilter.op) {
          case 'IS_NAN':
            const t = hh(e.unaryFilter.field);
            return Qa.create(t, '==', { doubleValue: NaN });
          case 'IS_NULL':
            const n = hh(e.unaryFilter.field);
            return Qa.create(n, '==', { nullValue: 'NULL_VALUE' });
          case 'IS_NOT_NAN':
            const r = hh(e.unaryFilter.field);
            return Qa.create(r, '!=', { doubleValue: NaN });
          case 'IS_NOT_NULL':
            const s = hh(e.unaryFilter.field);
            return Qa.create(s, '!=', { nullValue: 'NULL_VALUE' });
          default:
            return bo();
        }
      })(e)
    : void 0 !== e.fieldFilter
    ? (function (e) {
        return Qa.create(
          hh(e.fieldFilter.field),
          (function (e) {
            switch (e) {
              case 'EQUAL':
                return '==';
              case 'NOT_EQUAL':
                return '!=';
              case 'GREATER_THAN':
                return '>';
              case 'GREATER_THAN_OR_EQUAL':
                return '>=';
              case 'LESS_THAN':
                return '<';
              case 'LESS_THAN_OR_EQUAL':
                return '<=';
              case 'ARRAY_CONTAINS':
                return 'array-contains';
              case 'IN':
                return 'in';
              case 'NOT_IN':
                return 'not-in';
              case 'ARRAY_CONTAINS_ANY':
                return 'array-contains-any';
              default:
                return bo();
            }
          })(e.fieldFilter.op),
          e.fieldFilter.value
        );
      })(e)
    : void 0 !== e.compositeFilter
    ? (function (e) {
        return Xa.create(
          e.compositeFilter.filters.map(e => ih(e)),
          (function (e) {
            switch (e) {
              case 'AND':
                return 'and';
              case 'OR':
                return 'or';
              default:
                return bo();
            }
          })(e.compositeFilter.op)
        );
      })(e)
    : bo();
}
function oh(e) {
  return Fu[e];
}
function ah(e) {
  return Vu[e];
}
function ch(e) {
  return ju[e];
}
function uh(e) {
  return { fieldPath: e.canonicalString() };
}
function hh(e) {
  return zo.fromServerFormat(e.fieldPath);
}
function lh(e) {
  return e instanceof Qa
    ? (function (e) {
        if ('==' === e.op) {
          if (Ua(e.value)) return { unaryFilter: { field: uh(e.field), op: 'IS_NAN' } };
          if (Ma(e.value)) return { unaryFilter: { field: uh(e.field), op: 'IS_NULL' } };
        } else if ('!=' === e.op) {
          if (Ua(e.value)) return { unaryFilter: { field: uh(e.field), op: 'IS_NOT_NAN' } };
          if (Ma(e.value)) return { unaryFilter: { field: uh(e.field), op: 'IS_NOT_NULL' } };
        }
        return { fieldFilter: { field: uh(e.field), op: ah(e.op), value: e.value } };
      })(e)
    : e instanceof Xa
    ? (function (e) {
        const t = e.getFilters().map(e => lh(e));
        return 1 === t.length ? t[0] : { compositeFilter: { op: ch(e.op), filters: t } };
      })(e)
    : bo();
}
function dh(e) {
  const t = [];
  return e.fields.forEach(e => t.push(e.canonicalString())), { fieldPaths: t };
}
function fh(e) {
  return e.length >= 4 && 'projects' === e.get(0) && 'databases' === e.get(2);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class ph {
  constructor(e, t, n, r, s = jo.min(), i = jo.min(), o = pa.EMPTY_BYTE_STRING, a = null) {
    (this.target = e),
      (this.targetId = t),
      (this.purpose = n),
      (this.sequenceNumber = r),
      (this.snapshotVersion = s),
      (this.lastLimboFreeSnapshotVersion = i),
      (this.resumeToken = o),
      (this.expectedCount = a);
  }
  withSequenceNumber(e) {
    return new ph(
      this.target,
      this.targetId,
      this.purpose,
      e,
      this.snapshotVersion,
      this.lastLimboFreeSnapshotVersion,
      this.resumeToken,
      this.expectedCount
    );
  }
  withResumeToken(e, t) {
    return new ph(this.target, this.targetId, this.purpose, this.sequenceNumber, t, this.lastLimboFreeSnapshotVersion, e, null);
  }
  withExpectedCount(e) {
    return new ph(
      this.target,
      this.targetId,
      this.purpose,
      this.sequenceNumber,
      this.snapshotVersion,
      this.lastLimboFreeSnapshotVersion,
      this.resumeToken,
      e
    );
  }
  withLastLimboFreeSnapshotVersion(e) {
    return new ph(
      this.target,
      this.targetId,
      this.purpose,
      this.sequenceNumber,
      this.snapshotVersion,
      e,
      this.resumeToken,
      this.expectedCount
    );
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class gh {
  constructor(e) {
    this.ct = e;
  }
}
function mh(e) {
  const t = sh({ parent: e.parent, structuredQuery: e.structuredQuery });
  return 'LAST' === e.limitType ? _c(t, t.limit, 'L') : t;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class yh {
  constructor() {
    this.un = new vh();
  }
  addToCollectionParentIndex(e, t) {
    return this.un.add(t), Jo.resolve();
  }
  getCollectionParents(e, t) {
    return Jo.resolve(this.un.getEntries(t));
  }
  addFieldIndex(e, t) {
    return Jo.resolve();
  }
  deleteFieldIndex(e, t) {
    return Jo.resolve();
  }
  deleteAllFieldIndexes(e) {
    return Jo.resolve();
  }
  createTargetIndexes(e, t) {
    return Jo.resolve();
  }
  getDocumentsMatchingTarget(e, t) {
    return Jo.resolve(null);
  }
  getIndexType(e, t) {
    return Jo.resolve(0);
  }
  getFieldIndexes(e, t) {
    return Jo.resolve([]);
  }
  getNextCollectionGroupToUpdate(e) {
    return Jo.resolve(null);
  }
  getMinOffset(e, t) {
    return Jo.resolve(Ko.min());
  }
  getMinOffsetFromCollectionGroup(e, t) {
    return Jo.resolve(Ko.min());
  }
  updateCollectionGroup(e, t, n) {
    return Jo.resolve();
  }
  updateIndexEntries(e, t) {
    return Jo.resolve();
  }
}
class vh {
  constructor() {
    this.index = {};
  }
  add(e) {
    const t = e.lastSegment(),
      n = e.popLast(),
      r = this.index[t] || new ha($o.comparator),
      s = !r.has(n);
    return (this.index[t] = r.add(n)), s;
  }
  has(e) {
    const t = e.lastSegment(),
      n = e.popLast(),
      r = this.index[t];
    return r && r.has(n);
  }
  getEntries(e) {
    return (this.index[e] || new ha($o.comparator)).toArray();
  }
}
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const wh = { didRun: !1, sequenceNumbersCollected: 0, targetsRemoved: 0, documentsRemoved: 0 };
class _h {
  constructor(e, t, n) {
    (this.cacheSizeCollectionThreshold = e), (this.percentileToCollect = t), (this.maximumSequenceNumbersToCollect = n);
  }
  static withCacheSize(e) {
    return new _h(e, _h.DEFAULT_COLLECTION_PERCENTILE, _h.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ (_h.DEFAULT_COLLECTION_PERCENTILE = 10),
  (_h.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT = 1e3),
  (_h.DEFAULT = new _h(41943040, _h.DEFAULT_COLLECTION_PERCENTILE, _h.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)),
  (_h.DISABLED = new _h(-1, 0, 0));
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class bh {
  constructor(e) {
    this.Ln = e;
  }
  next() {
    return (this.Ln += 2), this.Ln;
  }
  static Bn() {
    return new bh(0);
  }
  static kn() {
    return new bh(-1);
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Th([e, t], [n, r]) {
  const s = Uo(e, n);
  return 0 === s ? Uo(t, r) : s;
}
class Eh {
  constructor(e) {
    (this.Un = e), (this.buffer = new ha(Th)), (this.Wn = 0);
  }
  Gn() {
    return ++this.Wn;
  }
  zn(e) {
    const t = [e, this.Gn()];
    if (this.buffer.size < this.Un) this.buffer = this.buffer.add(t);
    else {
      const e = this.buffer.last();
      Th(t, e) < 0 && (this.buffer = this.buffer.delete(e).add(t));
    }
  }
  get maxValue() {
    return this.buffer.last()[0];
  }
}
class Ih {
  constructor(e, t, n) {
    (this.garbageCollector = e), (this.asyncQueue = t), (this.localStore = n), (this.jn = null);
  }
  start() {
    -1 !== this.garbageCollector.params.cacheSizeCollectionThreshold && this.Hn(6e4);
  }
  stop() {
    this.jn && (this.jn.cancel(), (this.jn = null));
  }
  get started() {
    return null !== this.jn;
  }
  Hn(e) {
    yo('LruGarbageCollector', `Garbage collection scheduled in ${e}ms`),
      (this.jn = this.asyncQueue.enqueueAfterDelay('lru_garbage_collection', e, async () => {
        this.jn = null;
        try {
          await this.localStore.collectGarbage(this.garbageCollector);
        } catch (e) {
          Yo(e) ? yo('LruGarbageCollector', 'Ignoring IndexedDB error during garbage collection: ', e) : await Xo(e);
        }
        await this.Hn(3e5);
      }));
  }
}
class Sh {
  constructor(e, t) {
    (this.Jn = e), (this.params = t);
  }
  calculateTargetCount(e, t) {
    return this.Jn.Yn(e).next(e => Math.floor((t / 100) * e));
  }
  nthSequenceNumber(e, t) {
    if (0 === t) return Jo.resolve(Zo.oe);
    const n = new Eh(t);
    return this.Jn.forEachTarget(e, e => n.zn(e.sequenceNumber))
      .next(() => this.Jn.Zn(e, e => n.zn(e)))
      .next(() => n.maxValue);
  }
  removeTargets(e, t, n) {
    return this.Jn.removeTargets(e, t, n);
  }
  removeOrphanedDocuments(e, t) {
    return this.Jn.removeOrphanedDocuments(e, t);
  }
  collect(e, t) {
    return -1 === this.params.cacheSizeCollectionThreshold
      ? (yo('LruGarbageCollector', 'Garbage collection skipped; disabled'), Jo.resolve(wh))
      : this.getCacheSize(e).next(n =>
          n < this.params.cacheSizeCollectionThreshold
            ? (yo(
                'LruGarbageCollector',
                `Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`
              ),
              wh)
            : this.Xn(e, t)
        );
  }
  getCacheSize(e) {
    return this.Jn.getCacheSize(e);
  }
  Xn(e, t) {
    let n, r, s, i, o, a, c;
    const u = Date.now();
    return this.calculateTargetCount(e, this.params.percentileToCollect)
      .next(
        t => (
          t > this.params.maximumSequenceNumbersToCollect
            ? (yo(
                'LruGarbageCollector',
                `Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${t}`
              ),
              (r = this.params.maximumSequenceNumbersToCollect))
            : (r = t),
          (i = Date.now()),
          this.nthSequenceNumber(e, r)
        )
      )
      .next(r => ((n = r), (o = Date.now()), this.removeTargets(e, n, t)))
      .next(t => ((s = t), (a = Date.now()), this.removeOrphanedDocuments(e, n)))
      .next(
        e => (
          (c = Date.now()),
          mo() <= me.DEBUG &&
            yo(
              'LruGarbageCollector',
              `LRU Garbage Collection\n\tCounted targets in ${i - u}ms\n\tDetermined least recently used ${r} in ` +
                (o - i) +
                'ms\n' +
                `\tRemoved ${s} targets in ` +
                (a - o) +
                'ms\n' +
                `\tRemoved ${e} documents in ` +
                (c - a) +
                'ms\n' +
                `Total Duration: ${c - u}ms`
            ),
          Jo.resolve({ didRun: !0, sequenceNumbersCollected: r, targetsRemoved: s, documentsRemoved: e })
        )
      );
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Ch {
  constructor() {
    (this.changes = new kc(
      e => e.toString(),
      (e, t) => e.isEqual(t)
    )),
      (this.changesApplied = !1);
  }
  addEntry(e) {
    this.assertNotApplied(), this.changes.set(e.key, e);
  }
  removeEntry(e, t) {
    this.assertNotApplied(), this.changes.set(e, $a.newInvalidDocument(e).setReadTime(t));
  }
  getEntry(e, t) {
    this.assertNotApplied();
    const n = this.changes.get(t);
    return void 0 !== n ? Jo.resolve(n) : this.getFromCache(e, t);
  }
  getEntries(e, t) {
    return this.getAllFromCache(e, t);
  }
  apply(e) {
    return this.assertNotApplied(), (this.changesApplied = !0), this.applyChanges(e);
  }
  assertNotApplied() {}
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class kh {
  constructor(e, t) {
    (this.overlayedDocument = e), (this.mutatedFields = t);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Ah {
  constructor(e, t, n, r) {
    (this.remoteDocumentCache = e), (this.mutationQueue = t), (this.documentOverlayCache = n), (this.indexManager = r);
  }
  getDocument(e, t) {
    let n = null;
    return this.documentOverlayCache
      .getOverlay(e, t)
      .next(r => ((n = r), this.remoteDocumentCache.getEntry(e, t)))
      .next(e => (null !== n && au(n.mutation, e, da.empty(), Vo.now()), e));
  }
  getDocuments(e, t) {
    return this.remoteDocumentCache.getEntries(e, t).next(t => this.getLocalViewOfDocuments(e, t, Fc()).next(() => t));
  }
  getLocalViewOfDocuments(e, t, n = Fc()) {
    const r = Pc();
    return this.populateOverlays(e, r, t).next(() =>
      this.computeViews(e, t, r, n).next(e => {
        let t = Dc();
        return (
          e.forEach((e, n) => {
            t = t.insert(e, n.overlayedDocument);
          }),
          t
        );
      })
    );
  }
  getOverlayedDocuments(e, t) {
    const n = Pc();
    return this.populateOverlays(e, n, t).next(() => this.computeViews(e, t, n, Fc()));
  }
  populateOverlays(e, t, n) {
    const r = [];
    return (
      n.forEach(e => {
        t.has(e) || r.push(e);
      }),
      this.documentOverlayCache.getOverlays(e, r).next(e => {
        e.forEach((e, n) => {
          t.set(e, n);
        });
      })
    );
  }
  computeViews(e, t, n, r) {
    let s = Nc();
    const i = Lc(),
      o = Lc();
    return (
      t.forEach((e, t) => {
        const o = n.get(t.key);
        r.has(t.key) && (void 0 === o || o.mutation instanceof lu)
          ? (s = s.insert(t.key, t))
          : void 0 !== o
          ? (i.set(t.key, o.mutation.getFieldMask()), au(o.mutation, t, o.mutation.getFieldMask(), Vo.now()))
          : i.set(t.key, da.empty());
      }),
      this.recalculateAndSaveOverlays(e, s).next(
        e => (
          e.forEach((e, t) => i.set(e, t)),
          t.forEach((e, t) => {
            var n;
            return o.set(e, new kh(t, null !== (n = i.get(e)) && void 0 !== n ? n : null));
          }),
          o
        )
      )
    );
  }
  recalculateAndSaveOverlays(e, t) {
    const n = Lc();
    let r = new aa((e, t) => e - t),
      s = Fc();
    return this.mutationQueue
      .getAllMutationBatchesAffectingDocumentKeys(e, t)
      .next(e => {
        for (const s of e)
          s.keys().forEach(e => {
            const i = t.get(e);
            if (null === i) return;
            let o = n.get(e) || da.empty();
            (o = s.applyToLocalView(i, o)), n.set(e, o);
            const a = (r.get(s.batchId) || Fc()).add(e);
            r = r.insert(s.batchId, a);
          });
      })
      .next(() => {
        const i = [],
          o = r.getReverseIterator();
        for (; o.hasNext(); ) {
          const r = o.getNext(),
            a = r.key,
            c = r.value,
            u = xc();
          c.forEach(e => {
            if (!s.has(e)) {
              const r = iu(t.get(e), n.get(e));
              null !== r && u.set(e, r), (s = s.add(e));
            }
          }),
            i.push(this.documentOverlayCache.saveOverlays(e, a, u));
        }
        return Jo.waitFor(i);
      })
      .next(() => n);
  }
  recalculateAndSaveOverlaysForDocumentKeys(e, t) {
    return this.remoteDocumentCache.getEntries(e, t).next(t => this.recalculateAndSaveOverlays(e, t));
  }
  getDocumentsMatchingQuery(e, t, n, r) {
    return (function (e) {
      return Ho.isDocumentKey(e.path) && null === e.collectionGroup && 0 === e.filters.length;
    })(t)
      ? this.getDocumentsMatchingDocumentQuery(e, t.path)
      : (function (e) {
          return null !== e.collectionGroup;
        })(t)
      ? this.getDocumentsMatchingCollectionGroupQuery(e, t, n, r)
      : this.getDocumentsMatchingCollectionQuery(e, t, n, r);
  }
  getNextDocuments(e, t, n, r) {
    return this.remoteDocumentCache.getAllFromCollectionGroup(e, t, n, r).next(s => {
      const i =
        r - s.size > 0 ? this.documentOverlayCache.getOverlaysForCollectionGroup(e, t, n.largestBatchId, r - s.size) : Jo.resolve(Pc());
      let o = -1,
        a = s;
      return i.next(t =>
        Jo.forEach(
          t,
          (t, n) => (
            o < n.largestBatchId && (o = n.largestBatchId),
            s.get(t)
              ? Jo.resolve()
              : this.remoteDocumentCache.getEntry(e, t).next(e => {
                  a = a.insert(t, e);
                })
          )
        )
          .next(() => this.populateOverlays(e, t, s))
          .next(() => this.computeViews(e, a, t, Fc()))
          .next(e => ({ batchId: o, changes: Oc(e) }))
      );
    });
  }
  getDocumentsMatchingDocumentQuery(e, t) {
    return this.getDocument(e, new Ho(t)).next(e => {
      let t = Dc();
      return e.isFoundDocument() && (t = t.insert(e.key, e)), t;
    });
  }
  getDocumentsMatchingCollectionGroupQuery(e, t, n, r) {
    const s = t.collectionGroup;
    let i = Dc();
    return this.indexManager.getCollectionParents(e, s).next(o =>
      Jo.forEach(o, o => {
        const a = (function (e, t) {
          return new gc(t, null, e.explicitOrderBy.slice(), e.filters.slice(), e.limit, e.limitType, e.startAt, e.endAt);
        })(t, o.child(s));
        return this.getDocumentsMatchingCollectionQuery(e, a, n, r).next(e => {
          e.forEach((e, t) => {
            i = i.insert(e, t);
          });
        });
      }).next(() => i)
    );
  }
  getDocumentsMatchingCollectionQuery(e, t, n, r) {
    let s;
    return this.documentOverlayCache
      .getOverlaysForCollection(e, t.path, n.largestBatchId)
      .next(i => ((s = i), this.remoteDocumentCache.getDocumentsMatchingQuery(e, t, n, s, r)))
      .next(e => {
        s.forEach((t, n) => {
          const r = n.getKey();
          null === e.get(r) && (e = e.insert(r, $a.newInvalidDocument(r)));
        });
        let n = Dc();
        return (
          e.forEach((e, r) => {
            const i = s.get(e);
            void 0 !== i && au(i.mutation, r, da.empty(), Vo.now()), Ic(t, r) && (n = n.insert(e, r));
          }),
          n
        );
      });
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Nh {
  constructor(e) {
    (this.serializer = e), (this.hr = new Map()), (this.Pr = new Map());
  }
  getBundleMetadata(e, t) {
    return Jo.resolve(this.hr.get(t));
  }
  saveBundleMetadata(e, t) {
    return (
      this.hr.set(
        t.id,
        (function (e) {
          return { id: e.id, version: e.version, createTime: Gu(e.createTime) };
        })(t)
      ),
      Jo.resolve()
    );
  }
  getNamedQuery(e, t) {
    return Jo.resolve(this.Pr.get(t));
  }
  saveNamedQuery(e, t) {
    return (
      this.Pr.set(
        t.name,
        (function (e) {
          return { name: e.name, query: mh(e.bundledQuery), readTime: Gu(e.readTime) };
        })(t)
      ),
      Jo.resolve()
    );
  }
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Rh {
  constructor() {
    (this.overlays = new aa(Ho.comparator)), (this.Ir = new Map());
  }
  getOverlay(e, t) {
    return Jo.resolve(this.overlays.get(t));
  }
  getOverlays(e, t) {
    const n = Pc();
    return Jo.forEach(t, t =>
      this.getOverlay(e, t).next(e => {
        null !== e && n.set(t, e);
      })
    ).next(() => n);
  }
  saveOverlays(e, t, n) {
    return (
      n.forEach((n, r) => {
        this.ht(e, t, r);
      }),
      Jo.resolve()
    );
  }
  removeOverlaysForBatchId(e, t, n) {
    const r = this.Ir.get(n);
    return void 0 !== r && (r.forEach(e => (this.overlays = this.overlays.remove(e))), this.Ir.delete(n)), Jo.resolve();
  }
  getOverlaysForCollection(e, t, n) {
    const r = Pc(),
      s = t.length + 1,
      i = new Ho(t.child('')),
      o = this.overlays.getIteratorFrom(i);
    for (; o.hasNext(); ) {
      const e = o.getNext().value,
        i = e.getKey();
      if (!t.isPrefixOf(i.path)) break;
      i.path.length === s && e.largestBatchId > n && r.set(e.getKey(), e);
    }
    return Jo.resolve(r);
  }
  getOverlaysForCollectionGroup(e, t, n, r) {
    let s = new aa((e, t) => e - t);
    const i = this.overlays.getIterator();
    for (; i.hasNext(); ) {
      const e = i.getNext().value;
      if (e.getKey().getCollectionGroup() === t && e.largestBatchId > n) {
        let t = s.get(e.largestBatchId);
        null === t && ((t = Pc()), (s = s.insert(e.largestBatchId, t))), t.set(e.getKey(), e);
      }
    }
    const o = Pc(),
      a = s.getIterator();
    for (; a.hasNext() && (a.getNext().value.forEach((e, t) => o.set(e, t)), !(o.size() >= r)); );
    return Jo.resolve(o);
  }
  ht(e, t, n) {
    const r = this.overlays.get(n.key);
    if (null !== r) {
      const e = this.Ir.get(r.largestBatchId).delete(n.key);
      this.Ir.set(r.largestBatchId, e);
    }
    this.overlays = this.overlays.insert(n.key, new wu(t, n));
    let s = this.Ir.get(t);
    void 0 === s && ((s = Fc()), this.Ir.set(t, s)), this.Ir.set(t, s.add(n.key));
  }
}
/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Dh {
  constructor() {
    this.sessionToken = pa.EMPTY_BYTE_STRING;
  }
  getSessionToken(e) {
    return Jo.resolve(this.sessionToken);
  }
  setSessionToken(e, t) {
    return (this.sessionToken = t), Jo.resolve();
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Oh {
  constructor() {
    (this.Tr = new ha(Ph.Er)), (this.dr = new ha(Ph.Ar));
  }
  isEmpty() {
    return this.Tr.isEmpty();
  }
  addReference(e, t) {
    const n = new Ph(e, t);
    (this.Tr = this.Tr.add(n)), (this.dr = this.dr.add(n));
  }
  Rr(e, t) {
    e.forEach(e => this.addReference(e, t));
  }
  removeReference(e, t) {
    this.Vr(new Ph(e, t));
  }
  mr(e, t) {
    e.forEach(e => this.removeReference(e, t));
  }
  gr(e) {
    const t = new Ho(new $o([])),
      n = new Ph(t, e),
      r = new Ph(t, e + 1),
      s = [];
    return (
      this.dr.forEachInRange([n, r], e => {
        this.Vr(e), s.push(e.key);
      }),
      s
    );
  }
  pr() {
    this.Tr.forEach(e => this.Vr(e));
  }
  Vr(e) {
    (this.Tr = this.Tr.delete(e)), (this.dr = this.dr.delete(e));
  }
  yr(e) {
    const t = new Ho(new $o([])),
      n = new Ph(t, e),
      r = new Ph(t, e + 1);
    let s = Fc();
    return (
      this.dr.forEachInRange([n, r], e => {
        s = s.add(e.key);
      }),
      s
    );
  }
  containsKey(e) {
    const t = new Ph(e, 0),
      n = this.Tr.firstAfterOrEqual(t);
    return null !== n && e.isEqual(n.key);
  }
}
class Ph {
  constructor(e, t) {
    (this.key = e), (this.wr = t);
  }
  static Er(e, t) {
    return Ho.comparator(e.key, t.key) || Uo(e.wr, t.wr);
  }
  static Ar(e, t) {
    return Uo(e.wr, t.wr) || Ho.comparator(e.key, t.key);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class xh {
  constructor(e, t) {
    (this.indexManager = e), (this.referenceDelegate = t), (this.mutationQueue = []), (this.Sr = 1), (this.br = new ha(Ph.Er));
  }
  checkEmpty(e) {
    return Jo.resolve(0 === this.mutationQueue.length);
  }
  addMutationBatch(e, t, n, r) {
    const s = this.Sr;
    this.Sr++, this.mutationQueue.length > 0 && this.mutationQueue[this.mutationQueue.length - 1];
    const i = new yu(s, t, n, r);
    this.mutationQueue.push(i);
    for (const t of r) (this.br = this.br.add(new Ph(t.key, s))), this.indexManager.addToCollectionParentIndex(e, t.key.path.popLast());
    return Jo.resolve(i);
  }
  lookupMutationBatch(e, t) {
    return Jo.resolve(this.Dr(t));
  }
  getNextMutationBatchAfterBatchId(e, t) {
    const n = t + 1,
      r = this.vr(n),
      s = r < 0 ? 0 : r;
    return Jo.resolve(this.mutationQueue.length > s ? this.mutationQueue[s] : null);
  }
  getHighestUnacknowledgedBatchId() {
    return Jo.resolve(0 === this.mutationQueue.length ? -1 : this.Sr - 1);
  }
  getAllMutationBatches(e) {
    return Jo.resolve(this.mutationQueue.slice());
  }
  getAllMutationBatchesAffectingDocumentKey(e, t) {
    const n = new Ph(t, 0),
      r = new Ph(t, Number.POSITIVE_INFINITY),
      s = [];
    return (
      this.br.forEachInRange([n, r], e => {
        const t = this.Dr(e.wr);
        s.push(t);
      }),
      Jo.resolve(s)
    );
  }
  getAllMutationBatchesAffectingDocumentKeys(e, t) {
    let n = new ha(Uo);
    return (
      t.forEach(e => {
        const t = new Ph(e, 0),
          r = new Ph(e, Number.POSITIVE_INFINITY);
        this.br.forEachInRange([t, r], e => {
          n = n.add(e.wr);
        });
      }),
      Jo.resolve(this.Cr(n))
    );
  }
  getAllMutationBatchesAffectingQuery(e, t) {
    const n = t.path,
      r = n.length + 1;
    let s = n;
    Ho.isDocumentKey(s) || (s = s.child(''));
    const i = new Ph(new Ho(s), 0);
    let o = new ha(Uo);
    return (
      this.br.forEachWhile(e => {
        const t = e.key.path;
        return !!n.isPrefixOf(t) && (t.length === r && (o = o.add(e.wr)), !0);
      }, i),
      Jo.resolve(this.Cr(o))
    );
  }
  Cr(e) {
    const t = [];
    return (
      e.forEach(e => {
        const n = this.Dr(e);
        null !== n && t.push(n);
      }),
      t
    );
  }
  removeMutationBatch(e, t) {
    To(0 === this.Fr(t.batchId, 'removed')), this.mutationQueue.shift();
    let n = this.br;
    return Jo.forEach(t.mutations, r => {
      const s = new Ph(r.key, t.batchId);
      return (n = n.delete(s)), this.referenceDelegate.markPotentiallyOrphaned(e, r.key);
    }).next(() => {
      this.br = n;
    });
  }
  On(e) {}
  containsKey(e, t) {
    const n = new Ph(t, 0),
      r = this.br.firstAfterOrEqual(n);
    return Jo.resolve(t.isEqual(r && r.key));
  }
  performConsistencyCheck(e) {
    return this.mutationQueue.length, Jo.resolve();
  }
  Fr(e, t) {
    return this.vr(e);
  }
  vr(e) {
    return 0 === this.mutationQueue.length ? 0 : e - this.mutationQueue[0].batchId;
  }
  Dr(e) {
    const t = this.vr(e);
    return t < 0 || t >= this.mutationQueue.length ? null : this.mutationQueue[t];
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Lh {
  constructor(e) {
    (this.Mr = e), (this.docs = new aa(Ho.comparator)), (this.size = 0);
  }
  setIndexManager(e) {
    this.indexManager = e;
  }
  addEntry(e, t) {
    const n = t.key,
      r = this.docs.get(n),
      s = r ? r.size : 0,
      i = this.Mr(t);
    return (
      (this.docs = this.docs.insert(n, { document: t.mutableCopy(), size: i })),
      (this.size += i - s),
      this.indexManager.addToCollectionParentIndex(e, n.path.popLast())
    );
  }
  removeEntry(e) {
    const t = this.docs.get(e);
    t && ((this.docs = this.docs.remove(e)), (this.size -= t.size));
  }
  getEntry(e, t) {
    const n = this.docs.get(t);
    return Jo.resolve(n ? n.document.mutableCopy() : $a.newInvalidDocument(t));
  }
  getEntries(e, t) {
    let n = Nc();
    return (
      t.forEach(e => {
        const t = this.docs.get(e);
        n = n.insert(e, t ? t.document.mutableCopy() : $a.newInvalidDocument(e));
      }),
      Jo.resolve(n)
    );
  }
  getDocumentsMatchingQuery(e, t, n, r) {
    let s = Nc();
    const i = t.path,
      o = new Ho(i.child('')),
      a = this.docs.getIteratorFrom(o);
    for (; a.hasNext(); ) {
      const {
        key: e,
        value: { document: o },
      } = a.getNext();
      if (!i.isPrefixOf(e.path)) break;
      e.path.length > i.length + 1 || Wo(Go(o), n) <= 0 || ((r.has(o.key) || Ic(t, o)) && (s = s.insert(o.key, o.mutableCopy())));
    }
    return Jo.resolve(s);
  }
  getAllFromCollectionGroup(e, t, n, r) {
    bo();
  }
  Or(e, t) {
    return Jo.forEach(this.docs, e => t(e));
  }
  newChangeBuffer(e) {
    return new Mh(this);
  }
  getSize(e) {
    return Jo.resolve(this.size);
  }
}
class Mh extends Ch {
  constructor(e) {
    super(), (this.cr = e);
  }
  applyChanges(e) {
    const t = [];
    return (
      this.changes.forEach((n, r) => {
        r.isValidDocument() ? t.push(this.cr.addEntry(e, r)) : this.cr.removeEntry(n);
      }),
      Jo.waitFor(t)
    );
  }
  getFromCache(e, t) {
    return this.cr.getEntry(e, t);
  }
  getAllFromCache(e, t) {
    return this.cr.getEntries(e, t);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Uh {
  constructor(e) {
    (this.persistence = e),
      (this.Nr = new kc(e => dc(e), fc)),
      (this.lastRemoteSnapshotVersion = jo.min()),
      (this.highestTargetId = 0),
      (this.Lr = 0),
      (this.Br = new Oh()),
      (this.targetCount = 0),
      (this.kr = bh.Bn());
  }
  forEachTarget(e, t) {
    return this.Nr.forEach((e, n) => t(n)), Jo.resolve();
  }
  getLastRemoteSnapshotVersion(e) {
    return Jo.resolve(this.lastRemoteSnapshotVersion);
  }
  getHighestSequenceNumber(e) {
    return Jo.resolve(this.Lr);
  }
  allocateTargetId(e) {
    return (this.highestTargetId = this.kr.next()), Jo.resolve(this.highestTargetId);
  }
  setTargetsMetadata(e, t, n) {
    return n && (this.lastRemoteSnapshotVersion = n), t > this.Lr && (this.Lr = t), Jo.resolve();
  }
  Kn(e) {
    this.Nr.set(e.target, e);
    const t = e.targetId;
    t > this.highestTargetId && ((this.kr = new bh(t)), (this.highestTargetId = t)),
      e.sequenceNumber > this.Lr && (this.Lr = e.sequenceNumber);
  }
  addTargetData(e, t) {
    return this.Kn(t), (this.targetCount += 1), Jo.resolve();
  }
  updateTargetData(e, t) {
    return this.Kn(t), Jo.resolve();
  }
  removeTargetData(e, t) {
    return this.Nr.delete(t.target), this.Br.gr(t.targetId), (this.targetCount -= 1), Jo.resolve();
  }
  removeTargets(e, t, n) {
    let r = 0;
    const s = [];
    return (
      this.Nr.forEach((i, o) => {
        o.sequenceNumber <= t &&
          null === n.get(o.targetId) &&
          (this.Nr.delete(i), s.push(this.removeMatchingKeysForTargetId(e, o.targetId)), r++);
      }),
      Jo.waitFor(s).next(() => r)
    );
  }
  getTargetCount(e) {
    return Jo.resolve(this.targetCount);
  }
  getTargetData(e, t) {
    const n = this.Nr.get(t) || null;
    return Jo.resolve(n);
  }
  addMatchingKeys(e, t, n) {
    return this.Br.Rr(t, n), Jo.resolve();
  }
  removeMatchingKeys(e, t, n) {
    this.Br.mr(t, n);
    const r = this.persistence.referenceDelegate,
      s = [];
    return (
      r &&
        t.forEach(t => {
          s.push(r.markPotentiallyOrphaned(e, t));
        }),
      Jo.waitFor(s)
    );
  }
  removeMatchingKeysForTargetId(e, t) {
    return this.Br.gr(t), Jo.resolve();
  }
  getMatchingKeysForTargetId(e, t) {
    const n = this.Br.yr(t);
    return Jo.resolve(n);
  }
  containsKey(e, t) {
    return Jo.resolve(this.Br.containsKey(t));
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Fh {
  constructor(e, t) {
    (this.qr = {}),
      (this.overlays = {}),
      (this.Qr = new Zo(0)),
      (this.Kr = !1),
      (this.Kr = !0),
      (this.$r = new Dh()),
      (this.referenceDelegate = e(this)),
      (this.Ur = new Uh(this)),
      (this.indexManager = new yh()),
      (this.remoteDocumentCache = (function (e) {
        return new Lh(e);
      })(e => this.referenceDelegate.Wr(e))),
      (this.serializer = new gh(t)),
      (this.Gr = new Nh(this.serializer));
  }
  start() {
    return Promise.resolve();
  }
  shutdown() {
    return (this.Kr = !1), Promise.resolve();
  }
  get started() {
    return this.Kr;
  }
  setDatabaseDeletedListener() {}
  setNetworkEnabled() {}
  getIndexManager(e) {
    return this.indexManager;
  }
  getDocumentOverlayCache(e) {
    let t = this.overlays[e.toKey()];
    return t || ((t = new Rh()), (this.overlays[e.toKey()] = t)), t;
  }
  getMutationQueue(e, t) {
    let n = this.qr[e.toKey()];
    return n || ((n = new xh(t, this.referenceDelegate)), (this.qr[e.toKey()] = n)), n;
  }
  getGlobalsCache() {
    return this.$r;
  }
  getTargetCache() {
    return this.Ur;
  }
  getRemoteDocumentCache() {
    return this.remoteDocumentCache;
  }
  getBundleCache() {
    return this.Gr;
  }
  runTransaction(e, t, n) {
    yo('MemoryPersistence', 'Starting transaction:', e);
    const r = new Vh(this.Qr.next());
    return (
      this.referenceDelegate.zr(),
      n(r)
        .next(e => this.referenceDelegate.jr(r).next(() => e))
        .toPromise()
        .then(e => (r.raiseOnCommittedEvent(), e))
    );
  }
  Hr(e, t) {
    return Jo.or(Object.values(this.qr).map(n => () => n.containsKey(e, t)));
  }
}
class Vh extends Qo {
  constructor(e) {
    super(), (this.currentSequenceNumber = e);
  }
}
class jh {
  constructor(e) {
    (this.persistence = e), (this.Jr = new Oh()), (this.Yr = null);
  }
  static Zr(e) {
    return new jh(e);
  }
  get Xr() {
    if (this.Yr) return this.Yr;
    throw bo();
  }
  addReference(e, t, n) {
    return this.Jr.addReference(n, t), this.Xr.delete(n.toString()), Jo.resolve();
  }
  removeReference(e, t, n) {
    return this.Jr.removeReference(n, t), this.Xr.add(n.toString()), Jo.resolve();
  }
  markPotentiallyOrphaned(e, t) {
    return this.Xr.add(t.toString()), Jo.resolve();
  }
  removeTarget(e, t) {
    this.Jr.gr(t.targetId).forEach(e => this.Xr.add(e.toString()));
    const n = this.persistence.getTargetCache();
    return n
      .getMatchingKeysForTargetId(e, t.targetId)
      .next(e => {
        e.forEach(e => this.Xr.add(e.toString()));
      })
      .next(() => n.removeTargetData(e, t));
  }
  zr() {
    this.Yr = new Set();
  }
  jr(e) {
    const t = this.persistence.getRemoteDocumentCache().newChangeBuffer();
    return Jo.forEach(this.Xr, n => {
      const r = Ho.fromPath(n);
      return this.ei(e, r).next(e => {
        e || t.removeEntry(r, jo.min());
      });
    }).next(() => ((this.Yr = null), t.apply(e)));
  }
  updateLimboDocument(e, t) {
    return this.ei(e, t).next(e => {
      e ? this.Xr.delete(t.toString()) : this.Xr.add(t.toString());
    });
  }
  Wr(e) {
    return 0;
  }
  ei(e, t) {
    return Jo.or([
      () => Jo.resolve(this.Jr.containsKey(t)),
      () => this.persistence.getTargetCache().containsKey(e, t),
      () => this.persistence.Hr(e, t),
    ]);
  }
}
class Bh {
  constructor(e, t) {
    (this.persistence = e),
      (this.ti = new kc(
        e =>
          (function (e) {
            let t = '';
            for (let n = 0; n < e.length; n++) t.length > 0 && (t = ra(t)), (t = na(e.get(n), t));
            return ra(t);
          })(e.path),
        (e, t) => e.isEqual(t)
      )),
      (this.garbageCollector = (function (e, t) {
        return new Sh(e, t);
      })(this, t));
  }
  static Zr(e, t) {
    return new Bh(e, t);
  }
  zr() {}
  jr(e) {
    return Jo.resolve();
  }
  forEachTarget(e, t) {
    return this.persistence.getTargetCache().forEachTarget(e, t);
  }
  Yn(e) {
    const t = this.er(e);
    return this.persistence
      .getTargetCache()
      .getTargetCount(e)
      .next(e => t.next(t => e + t));
  }
  er(e) {
    let t = 0;
    return this.Zn(e, e => {
      t++;
    }).next(() => t);
  }
  Zn(e, t) {
    return Jo.forEach(this.ti, (n, r) => this.nr(e, n, r).next(e => (e ? Jo.resolve() : t(r))));
  }
  removeTargets(e, t, n) {
    return this.persistence.getTargetCache().removeTargets(e, t, n);
  }
  removeOrphanedDocuments(e, t) {
    let n = 0;
    const r = this.persistence.getRemoteDocumentCache(),
      s = r.newChangeBuffer();
    return r
      .Or(e, r =>
        this.nr(e, r, t).next(e => {
          e || (n++, s.removeEntry(r, jo.min()));
        })
      )
      .next(() => s.apply(e))
      .next(() => n);
  }
  markPotentiallyOrphaned(e, t) {
    return this.ti.set(t, e.currentSequenceNumber), Jo.resolve();
  }
  removeTarget(e, t) {
    const n = t.withSequenceNumber(e.currentSequenceNumber);
    return this.persistence.getTargetCache().updateTargetData(e, n);
  }
  addReference(e, t, n) {
    return this.ti.set(n, e.currentSequenceNumber), Jo.resolve();
  }
  removeReference(e, t, n) {
    return this.ti.set(n, e.currentSequenceNumber), Jo.resolve();
  }
  updateLimboDocument(e, t) {
    return this.ti.set(t, e.currentSequenceNumber), Jo.resolve();
  }
  Wr(e) {
    let t = e.key.toString().length;
    return e.isFoundDocument() && (t += Pa(e.data.value)), t;
  }
  nr(e, t, n) {
    return Jo.or([
      () => this.persistence.Hr(e, t),
      () => this.persistence.getTargetCache().containsKey(e, t),
      () => {
        const e = this.ti.get(t);
        return Jo.resolve(void 0 !== e && e > n);
      },
    ]);
  }
  getCacheSize(e) {
    return this.persistence.getRemoteDocumentCache().getSize(e);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class $h {
  constructor(e, t, n, r) {
    (this.targetId = e), (this.fromCache = t), (this.$i = n), (this.Ui = r);
  }
  static Wi(e, t) {
    let n = Fc(),
      r = Fc();
    for (const e of t.docChanges)
      switch (e.type) {
        case 0:
          n = n.add(e.doc.key);
          break;
        case 1:
          r = r.add(e.doc.key);
      }
    return new $h(e, t.fromCache, n, r);
  }
}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class qh {
  constructor() {
    this._documentReadCount = 0;
  }
  get documentReadCount() {
    return this._documentReadCount;
  }
  incrementDocumentReadCount(e) {
    this._documentReadCount += e;
  }
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class zh {
  constructor() {
    (this.Gi = !1),
      (this.zi = !1),
      (this.ji = 100),
      (this.Hi = ne()
        ? 8
        : (function (e) {
            const t = e.match(/Android ([\d.]+)/i),
              n = t ? t[1].split('.').slice(0, 2).join('.') : '-1';
            return Number(n);
          })(te()) > 0
        ? 6
        : 4);
  }
  initialize(e, t) {
    (this.Ji = e), (this.indexManager = t), (this.Gi = !0);
  }
  getDocumentsMatchingQuery(e, t, n, r) {
    const s = { result: null };
    return this.Yi(e, t)
      .next(e => {
        s.result = e;
      })
      .next(() => {
        if (!s.result)
          return this.Zi(e, t, r, n).next(e => {
            s.result = e;
          });
      })
      .next(() => {
        if (s.result) return;
        const n = new qh();
        return this.Xi(e, t, n).next(r => {
          if (((s.result = r), this.zi)) return this.es(e, t, n, r.size);
        });
      })
      .next(() => s.result);
  }
  es(e, t, n, r) {
    return n.documentReadCount < this.ji
      ? (mo() <= me.DEBUG &&
          yo(
            'QueryEngine',
            'SDK will not create cache indexes for query:',
            Ec(t),
            'since it only creates cache indexes for collection contains',
            'more than or equal to',
            this.ji,
            'documents'
          ),
        Jo.resolve())
      : (mo() <= me.DEBUG &&
          yo('QueryEngine', 'Query:', Ec(t), 'scans', n.documentReadCount, 'local documents and returns', r, 'documents as results.'),
        n.documentReadCount > this.Hi * r
          ? (mo() <= me.DEBUG &&
              yo(
                'QueryEngine',
                'The SDK decides to create cache indexes for query:',
                Ec(t),
                'as using cache indexes may help improve performance.'
              ),
            this.indexManager.createTargetIndexes(e, wc(t)))
          : Jo.resolve());
  }
  Yi(e, t) {
    if (yc(t)) return Jo.resolve(null);
    let n = wc(t);
    return this.indexManager.getIndexType(e, n).next(r =>
      0 === r
        ? null
        : (null !== t.limit && 1 === r && ((t = _c(t, null, 'F')), (n = wc(t))),
          this.indexManager.getDocumentsMatchingTarget(e, n).next(r => {
            const s = Fc(...r);
            return this.Ji.getDocuments(e, s).next(r =>
              this.indexManager.getMinOffset(e, n).next(n => {
                const i = this.ts(t, r);
                return this.ns(t, i, s, n.readTime) ? this.Yi(e, _c(t, null, 'F')) : this.rs(e, i, t, n);
              })
            );
          }))
    );
  }
  Zi(e, t, n, r) {
    return yc(t) || r.isEqual(jo.min())
      ? Jo.resolve(null)
      : this.Ji.getDocuments(e, n).next(s => {
          const i = this.ts(t, s);
          return this.ns(t, i, n, r)
            ? Jo.resolve(null)
            : (mo() <= me.DEBUG && yo('QueryEngine', 'Re-using previous result from %s to execute query: %s', r.toString(), Ec(t)),
              this.rs(
                e,
                i,
                t,
                (function (e, t) {
                  const n = e.toTimestamp().seconds,
                    r = e.toTimestamp().nanoseconds + 1,
                    s = jo.fromTimestamp(1e9 === r ? new Vo(n + 1, 0) : new Vo(n, r));
                  return new Ko(s, Ho.empty(), t);
                })(r, -1)
              ).next(e => e));
        });
  }
  ts(e, t) {
    let n = new ha(Sc(e));
    return (
      t.forEach((t, r) => {
        Ic(e, r) && (n = n.add(r));
      }),
      n
    );
  }
  ns(e, t, n, r) {
    if (null === e.limit) return !1;
    if (n.size !== t.size) return !0;
    const s = 'F' === e.limitType ? t.last() : t.first();
    return !!s && (s.hasPendingWrites || s.version.compareTo(r) > 0);
  }
  Xi(e, t, n) {
    return (
      mo() <= me.DEBUG && yo('QueryEngine', 'Using full collection scan to execute query:', Ec(t)),
      this.Ji.getDocumentsMatchingQuery(e, t, Ko.min(), n)
    );
  }
  rs(e, t, n, r) {
    return this.Ji.getDocumentsMatchingQuery(e, n, r).next(
      e => (
        t.forEach(t => {
          e = e.insert(t.key, t);
        }),
        e
      )
    );
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Hh {
  constructor(e, t, n, r) {
    (this.persistence = e),
      (this.ss = t),
      (this.serializer = r),
      (this.os = new aa(Uo)),
      (this._s = new kc(e => dc(e), fc)),
      (this.us = new Map()),
      (this.cs = e.getRemoteDocumentCache()),
      (this.Ur = e.getTargetCache()),
      (this.Gr = e.getBundleCache()),
      this.ls(n);
  }
  ls(e) {
    (this.documentOverlayCache = this.persistence.getDocumentOverlayCache(e)),
      (this.indexManager = this.persistence.getIndexManager(e)),
      (this.mutationQueue = this.persistence.getMutationQueue(e, this.indexManager)),
      (this.localDocuments = new Ah(this.cs, this.mutationQueue, this.documentOverlayCache, this.indexManager)),
      this.cs.setIndexManager(this.indexManager),
      this.ss.initialize(this.localDocuments, this.indexManager);
  }
  collectGarbage(e) {
    return this.persistence.runTransaction('Collect garbage', 'readwrite-primary', t => e.collect(t, this.os));
  }
}
async function Gh(e, t) {
  const n = Eo(e);
  return await n.persistence.runTransaction('Handle user change', 'readonly', e => {
    let r;
    return n.mutationQueue
      .getAllMutationBatches(e)
      .next(s => ((r = s), n.ls(t), n.mutationQueue.getAllMutationBatches(e)))
      .next(t => {
        const s = [],
          i = [];
        let o = Fc();
        for (const e of r) {
          s.push(e.batchId);
          for (const t of e.mutations) o = o.add(t.key);
        }
        for (const e of t) {
          i.push(e.batchId);
          for (const t of e.mutations) o = o.add(t.key);
        }
        return n.localDocuments.getDocuments(e, o).next(e => ({ hs: e, removedBatchIds: s, addedBatchIds: i }));
      });
  });
}
function Kh(e) {
  const t = Eo(e);
  return t.persistence.runTransaction('Get last remote snapshot version', 'readonly', e => t.Ur.getLastRemoteSnapshotVersion(e));
}
function Wh(e, t) {
  const n = Eo(e),
    r = t.snapshotVersion;
  let s = n.os;
  return n.persistence
    .runTransaction('Apply remote event', 'readwrite-primary', e => {
      const i = n.cs.newChangeBuffer({ trackRemovals: !0 });
      s = n.os;
      const o = [];
      t.targetChanges.forEach((i, a) => {
        const c = s.get(a);
        if (!c) return;
        o.push(n.Ur.removeMatchingKeys(e, i.removedDocuments, a).next(() => n.Ur.addMatchingKeys(e, i.addedDocuments, a)));
        let u = c.withSequenceNumber(e.currentSequenceNumber);
        null !== t.targetMismatches.get(a)
          ? (u = u.withResumeToken(pa.EMPTY_BYTE_STRING, jo.min()).withLastLimboFreeSnapshotVersion(jo.min()))
          : i.resumeToken.approximateByteSize() > 0 && (u = u.withResumeToken(i.resumeToken, r)),
          (s = s.insert(a, u)),
          (function (e, t, n) {
            return (
              0 === e.resumeToken.approximateByteSize() ||
              t.snapshotVersion.toMicroseconds() - e.snapshotVersion.toMicroseconds() >= 3e8 ||
              n.addedDocuments.size + n.modifiedDocuments.size + n.removedDocuments.size > 0
            );
          })(c, u, i) && o.push(n.Ur.updateTargetData(e, u));
      });
      let a = Nc(),
        c = Fc();
      if (
        (t.documentUpdates.forEach(r => {
          t.resolvedLimboDocuments.has(r) && o.push(n.persistence.referenceDelegate.updateLimboDocument(e, r));
        }),
        o.push(
          (function (e, t, n) {
            let r = Fc(),
              s = Fc();
            return (
              n.forEach(e => (r = r.add(e))),
              t.getEntries(e, r).next(e => {
                let r = Nc();
                return (
                  n.forEach((n, i) => {
                    const o = e.get(n);
                    i.isFoundDocument() !== o.isFoundDocument() && (s = s.add(n)),
                      i.isNoDocument() && i.version.isEqual(jo.min())
                        ? (t.removeEntry(n, i.readTime), (r = r.insert(n, i)))
                        : !o.isValidDocument() ||
                          i.version.compareTo(o.version) > 0 ||
                          (0 === i.version.compareTo(o.version) && o.hasPendingWrites)
                        ? (t.addEntry(i), (r = r.insert(n, i)))
                        : yo(
                            'LocalStore',
                            'Ignoring outdated watch update for ',
                            n,
                            '. Current version:',
                            o.version,
                            ' Watch version:',
                            i.version
                          );
                  }),
                  { Ps: r, Is: s }
                );
              })
            );
          })(e, i, t.documentUpdates).next(e => {
            (a = e.Ps), (c = e.Is);
          })
        ),
        !r.isEqual(jo.min()))
      ) {
        const t = n.Ur.getLastRemoteSnapshotVersion(e).next(t => n.Ur.setTargetsMetadata(e, e.currentSequenceNumber, r));
        o.push(t);
      }
      return Jo.waitFor(o)
        .next(() => i.apply(e))
        .next(() => n.localDocuments.getLocalViewOfDocuments(e, a, c))
        .next(() => a);
    })
    .then(e => ((n.os = s), e));
}
function Qh(e, t) {
  const n = Eo(e);
  return n.persistence.runTransaction(
    'Get next mutation batch',
    'readonly',
    e => (void 0 === t && (t = -1), n.mutationQueue.getNextMutationBatchAfterBatchId(e, t))
  );
}
async function Xh(e, t, n) {
  const r = Eo(e),
    s = r.os.get(t),
    i = n ? 'readwrite' : 'readwrite-primary';
  try {
    n || (await r.persistence.runTransaction('Release target', i, e => r.persistence.referenceDelegate.removeTarget(e, s)));
  } catch (e) {
    if (!Yo(e)) throw e;
    yo('LocalStore', `Failed to update sequence numbers for target ${t}: ${e}`);
  }
  (r.os = r.os.remove(t)), r._s.delete(s.target);
}
function Jh(e, t, n) {
  const r = Eo(e);
  let s = jo.min(),
    i = Fc();
  return r.persistence.runTransaction('Execute query', 'readwrite', e =>
    (function (e, t, n) {
      const r = Eo(e),
        s = r._s.get(n);
      return void 0 !== s ? Jo.resolve(r.os.get(s)) : r.Ur.getTargetData(t, n);
    })(r, e, wc(t))
      .next(t => {
        if (t)
          return (
            (s = t.lastLimboFreeSnapshotVersion),
            r.Ur.getMatchingKeysForTargetId(e, t.targetId).next(e => {
              i = e;
            })
          );
      })
      .next(() => r.ss.getDocumentsMatchingQuery(e, t, n ? s : jo.min(), n ? i : Fc()))
      .next(
        e => (
          (function (e, t, n) {
            let r = e.us.get(t) || jo.min();
            n.forEach((e, t) => {
              t.readTime.compareTo(r) > 0 && (r = t.readTime);
            }),
              e.us.set(t, r);
          })(
            r,
            (function (e) {
              return e.collectionGroup || (e.path.length % 2 == 1 ? e.path.lastSegment() : e.path.get(e.path.length - 2));
            })(t),
            e
          ),
          { documents: e, Ts: i }
        )
      )
  );
}
class Yh {
  constructor() {
    this.activeTargetIds = Vc;
  }
  fs(e) {
    this.activeTargetIds = this.activeTargetIds.add(e);
  }
  gs(e) {
    this.activeTargetIds = this.activeTargetIds.delete(e);
  }
  Vs() {
    const e = { activeTargetIds: this.activeTargetIds.toArray(), updateTimeMs: Date.now() };
    return JSON.stringify(e);
  }
}
class Zh {
  constructor() {
    (this.so = new Yh()), (this.oo = {}), (this.onlineStateHandler = null), (this.sequenceNumberHandler = null);
  }
  addPendingMutation(e) {}
  updateMutationState(e, t, n) {}
  addLocalQueryTarget(e, t = !0) {
    return t && this.so.fs(e), this.oo[e] || 'not-current';
  }
  updateQueryState(e, t, n) {
    this.oo[e] = t;
  }
  removeLocalQueryTarget(e) {
    this.so.gs(e);
  }
  isLocalQueryTarget(e) {
    return this.so.activeTargetIds.has(e);
  }
  clearQueryState(e) {
    delete this.oo[e];
  }
  getAllActiveQueryTargets() {
    return this.so.activeTargetIds;
  }
  isActiveQueryTarget(e) {
    return this.so.activeTargetIds.has(e);
  }
  start() {
    return (this.so = new Yh()), Promise.resolve();
  }
  handleUserChange(e, t, n) {}
  setOnlineState(e) {}
  shutdown() {}
  writeSequenceNumber(e) {}
  notifyBundleLoaded(e) {}
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class el {
  _o(e) {}
  shutdown() {}
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class tl {
  constructor() {
    (this.ao = () => this.uo()), (this.co = () => this.lo()), (this.ho = []), this.Po();
  }
  _o(e) {
    this.ho.push(e);
  }
  shutdown() {
    window.removeEventListener('online', this.ao), window.removeEventListener('offline', this.co);
  }
  Po() {
    window.addEventListener('online', this.ao), window.addEventListener('offline', this.co);
  }
  uo() {
    yo('ConnectivityMonitor', 'Network connectivity changed: AVAILABLE');
    for (const e of this.ho) e(0);
  }
  lo() {
    yo('ConnectivityMonitor', 'Network connectivity changed: UNAVAILABLE');
    for (const e of this.ho) e(1);
  }
  static D() {
    return 'undefined' != typeof window && void 0 !== window.addEventListener && void 0 !== window.removeEventListener;
  }
}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ let nl = null;
function rl() {
  return null === nl ? (nl = 268435456 + Math.round(2147483648 * Math.random())) : nl++, '0x' + nl.toString(16);
  /**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
}
const sl = { BatchGetDocuments: 'batchGet', Commit: 'commit', RunQuery: 'runQuery', RunAggregationQuery: 'runAggregationQuery' };
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class il {
  constructor(e) {
    (this.Io = e.Io), (this.To = e.To);
  }
  Eo(e) {
    this.Ao = e;
  }
  Ro(e) {
    this.Vo = e;
  }
  mo(e) {
    this.fo = e;
  }
  onMessage(e) {
    this.po = e;
  }
  close() {
    this.To();
  }
  send(e) {
    this.Io(e);
  }
  yo() {
    this.Ao();
  }
  wo() {
    this.Vo();
  }
  So(e) {
    this.fo(e);
  }
  bo(e) {
    this.po(e);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const ol = 'WebChannelConnection';
class al extends class {
  constructor(e) {
    (this.databaseInfo = e), (this.databaseId = e.databaseId);
    const t = e.ssl ? 'https' : 'http',
      n = encodeURIComponent(this.databaseId.projectId),
      r = encodeURIComponent(this.databaseId.database);
    (this.Do = t + '://' + e.host),
      (this.vo = `projects/${n}/databases/${r}`),
      (this.Co = '(default)' === this.databaseId.database ? `project_id=${n}` : `project_id=${n}&database_id=${r}`);
  }
  get Fo() {
    return !1;
  }
  Mo(e, t, n, r, s) {
    const i = rl(),
      o = this.xo(e, t.toUriEncodedString());
    yo('RestConnection', `Sending RPC '${e}' ${i}:`, o, n);
    const a = { 'google-cloud-resource-prefix': this.vo, 'x-goog-request-params': this.Co };
    return (
      this.Oo(a, r, s),
      this.No(e, o, a, n).then(
        t => (yo('RestConnection', `Received RPC '${e}' ${i}: `, t), t),
        t => {
          throw (wo('RestConnection', `RPC '${e}' ${i} failed with error: `, t, 'url: ', o, 'request:', n), t);
        }
      )
    );
  }
  Lo(e, t, n, r, s, i) {
    return this.Mo(e, t, n, r, s);
  }
  Oo(e, t, n) {
    (e['X-Goog-Api-Client'] = 'gl-js/ fire/' + po),
      (e['Content-Type'] = 'text/plain'),
      this.databaseInfo.appId && (e['X-Firebase-GMPID'] = this.databaseInfo.appId),
      t && t.headers.forEach((t, n) => (e[n] = t)),
      n && n.headers.forEach((t, n) => (e[n] = t));
  }
  xo(e, t) {
    const n = sl[e];
    return `${this.Do}/v1/${t}:${n}`;
  }
  terminate() {}
} {
  constructor(e) {
    super(e),
      (this.forceLongPolling = e.forceLongPolling),
      (this.autoDetectLongPolling = e.autoDetectLongPolling),
      (this.useFetchStreams = e.useFetchStreams),
      (this.longPollingOptions = e.longPollingOptions);
  }
  No(e, t, n, r) {
    const s = rl();
    return new Promise((i, o) => {
      const a = new no();
      a.setWithCredentials(!0),
        a.listenOnce(so.COMPLETE, () => {
          try {
            switch (a.getLastErrorCode()) {
              case io.NO_ERROR:
                const t = a.getResponseJson();
                yo(ol, `XHR for RPC '${e}' ${s} received:`, JSON.stringify(t)), i(t);
                break;
              case io.TIMEOUT:
                yo(ol, `RPC '${e}' ${s} timed out`), o(new So(Io.DEADLINE_EXCEEDED, 'Request time out'));
                break;
              case io.HTTP_ERROR:
                const n = a.getStatus();
                if ((yo(ol, `RPC '${e}' ${s} failed with status:`, n, 'response text:', a.getResponseText()), n > 0)) {
                  let e = a.getResponseJson();
                  Array.isArray(e) && (e = e[0]);
                  const t = null == e ? void 0 : e.error;
                  if (t && t.status && t.message) {
                    const e = (function (e) {
                      const t = e.toLowerCase().replace(/_/g, '-');
                      return Object.values(Io).indexOf(t) >= 0 ? t : Io.UNKNOWN;
                    })(t.status);
                    o(new So(e, t.message));
                  } else o(new So(Io.UNKNOWN, 'Server responded with status ' + a.getStatus()));
                } else o(new So(Io.UNAVAILABLE, 'Connection failed.'));
                break;
              default:
                bo();
            }
          } finally {
            yo(ol, `RPC '${e}' ${s} completed.`);
          }
        });
      const c = JSON.stringify(r);
      yo(ol, `RPC '${e}' ${s} sending request:`, r), a.send(t, 'POST', c, n, 15);
    });
  }
  Bo(e, t, n) {
    const r = rl(),
      s = [this.Do, '/', 'google.firestore.v1.Firestore', '/', e, '/channel'],
      i = uo(),
      o = co(),
      a = {
        httpSessionIdParam: 'gsessionid',
        initMessageHeaders: {},
        messageUrlParams: { database: `projects/${this.databaseId.projectId}/databases/${this.databaseId.database}` },
        sendRawJson: !0,
        supportsCrossDomainXhr: !0,
        internalChannelParams: { forwardChannelRequestTimeoutMs: 6e5 },
        forceLongPolling: this.forceLongPolling,
        detectBufferingProxy: this.autoDetectLongPolling,
      },
      c = this.longPollingOptions.timeoutSeconds;
    void 0 !== c && (a.longPollingTimeout = Math.round(1e3 * c)),
      this.useFetchStreams && (a.useFetchStreams = !0),
      this.Oo(a.initMessageHeaders, t, n),
      (a.encodeInitMessageHeaders = !0);
    const u = s.join('');
    yo(ol, `Creating RPC '${e}' stream ${r}: ${u}`, a);
    const h = i.createWebChannel(u, a);
    let l = !1,
      d = !1;
    const f = new il({
        Io: t => {
          d
            ? yo(ol, `Not sending because RPC '${e}' stream ${r} is closed:`, t)
            : (l || (yo(ol, `Opening RPC '${e}' stream ${r} transport.`), h.open(), (l = !0)),
              yo(ol, `RPC '${e}' stream ${r} sending:`, t),
              h.send(t));
        },
        To: () => h.close(),
      }),
      p = (e, t, n) => {
        e.listen(t, e => {
          try {
            n(e);
          } catch (e) {
            setTimeout(() => {
              throw e;
            }, 0);
          }
        });
      };
    return (
      p(h, ro.EventType.OPEN, () => {
        d || (yo(ol, `RPC '${e}' stream ${r} transport opened.`), f.yo());
      }),
      p(h, ro.EventType.CLOSE, () => {
        d || ((d = !0), yo(ol, `RPC '${e}' stream ${r} transport closed`), f.So());
      }),
      p(h, ro.EventType.ERROR, t => {
        d ||
          ((d = !0),
          wo(ol, `RPC '${e}' stream ${r} transport errored:`, t),
          f.So(new So(Io.UNAVAILABLE, 'The operation could not be completed')));
      }),
      p(h, ro.EventType.MESSAGE, t => {
        var n;
        if (!d) {
          const s = t.data[0];
          To(!!s);
          const i = s,
            o = i.error || (null === (n = i[0]) || void 0 === n ? void 0 : n.error);
          if (o) {
            yo(ol, `RPC '${e}' stream ${r} received error:`, o);
            const t = o.status;
            let n = (function (e) {
                const t = bu[e];
                if (void 0 !== t) return Eu(t);
              })(t),
              s = o.message;
            void 0 === n && ((n = Io.INTERNAL), (s = 'Unknown error status: ' + t + ' with message ' + o.message)),
              (d = !0),
              f.So(new So(n, s)),
              h.close();
          } else yo(ol, `RPC '${e}' stream ${r} received:`, s), f.bo(s);
        }
      }),
      p(o, ao.STAT_EVENT, t => {
        t.stat === oo.PROXY
          ? yo(ol, `RPC '${e}' stream ${r} detected buffering proxy`)
          : t.stat === oo.NOPROXY && yo(ol, `RPC '${e}' stream ${r} detected no buffering proxy`);
      }),
      setTimeout(() => {
        f.wo();
      }, 0),
      f
    );
  }
}
function cl() {
  return 'undefined' != typeof document ? document : null;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function ul(e) {
  return new Bu(e, !0);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class hl {
  constructor(e, t, n = 1e3, r = 1.5, s = 6e4) {
    (this.ui = e),
      (this.timerId = t),
      (this.ko = n),
      (this.qo = r),
      (this.Qo = s),
      (this.Ko = 0),
      (this.$o = null),
      (this.Uo = Date.now()),
      this.reset();
  }
  reset() {
    this.Ko = 0;
  }
  Wo() {
    this.Ko = this.Qo;
  }
  Go(e) {
    this.cancel();
    const t = Math.floor(this.Ko + this.zo()),
      n = Math.max(0, Date.now() - this.Uo),
      r = Math.max(0, t - n);
    r > 0 &&
      yo(
        'ExponentialBackoff',
        `Backing off for ${r} ms (base delay: ${this.Ko} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`
      ),
      (this.$o = this.ui.enqueueAfterDelay(this.timerId, r, () => ((this.Uo = Date.now()), e()))),
      (this.Ko *= this.qo),
      this.Ko < this.ko && (this.Ko = this.ko),
      this.Ko > this.Qo && (this.Ko = this.Qo);
  }
  jo() {
    null !== this.$o && (this.$o.skipDelay(), (this.$o = null));
  }
  cancel() {
    null !== this.$o && (this.$o.cancel(), (this.$o = null));
  }
  zo() {
    return (Math.random() - 0.5) * this.Ko;
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class ll {
  constructor(e, t, n, r, s, i, o, a) {
    (this.ui = e),
      (this.Ho = n),
      (this.Jo = r),
      (this.connection = s),
      (this.authCredentialsProvider = i),
      (this.appCheckCredentialsProvider = o),
      (this.listener = a),
      (this.state = 0),
      (this.Yo = 0),
      (this.Zo = null),
      (this.Xo = null),
      (this.stream = null),
      (this.e_ = 0),
      (this.t_ = new hl(e, t));
  }
  n_() {
    return 1 === this.state || 5 === this.state || this.r_();
  }
  r_() {
    return 2 === this.state || 3 === this.state;
  }
  start() {
    (this.e_ = 0), 4 !== this.state ? this.auth() : this.i_();
  }
  async stop() {
    this.n_() && (await this.close(0));
  }
  s_() {
    (this.state = 0), this.t_.reset();
  }
  o_() {
    this.r_() && null === this.Zo && (this.Zo = this.ui.enqueueAfterDelay(this.Ho, 6e4, () => this.__()));
  }
  a_(e) {
    this.u_(), this.stream.send(e);
  }
  async __() {
    if (this.r_()) return this.close(0);
  }
  u_() {
    this.Zo && (this.Zo.cancel(), (this.Zo = null));
  }
  c_() {
    this.Xo && (this.Xo.cancel(), (this.Xo = null));
  }
  async close(e, t) {
    this.u_(),
      this.c_(),
      this.t_.cancel(),
      this.Yo++,
      4 !== e
        ? this.t_.reset()
        : t && t.code === Io.RESOURCE_EXHAUSTED
        ? (vo(t.toString()), vo('Using maximum backoff delay to prevent overloading the backend.'), this.t_.Wo())
        : t &&
          t.code === Io.UNAUTHENTICATED &&
          3 !== this.state &&
          (this.authCredentialsProvider.invalidateToken(), this.appCheckCredentialsProvider.invalidateToken()),
      null !== this.stream && (this.l_(), this.stream.close(), (this.stream = null)),
      (this.state = e),
      await this.listener.mo(t);
  }
  l_() {}
  auth() {
    this.state = 1;
    const e = this.h_(this.Yo),
      t = this.Yo;
    Promise.all([this.authCredentialsProvider.getToken(), this.appCheckCredentialsProvider.getToken()]).then(
      ([e, n]) => {
        this.Yo === t && this.P_(e, n);
      },
      t => {
        e(() => {
          const e = new So(Io.UNKNOWN, 'Fetching auth token failed: ' + t.message);
          return this.I_(e);
        });
      }
    );
  }
  P_(e, t) {
    const n = this.h_(this.Yo);
    (this.stream = this.T_(e, t)),
      this.stream.Eo(() => {
        n(() => this.listener.Eo());
      }),
      this.stream.Ro(() => {
        n(
          () => (
            (this.state = 2),
            (this.Xo = this.ui.enqueueAfterDelay(this.Jo, 1e4, () => (this.r_() && (this.state = 3), Promise.resolve()))),
            this.listener.Ro()
          )
        );
      }),
      this.stream.mo(e => {
        n(() => this.I_(e));
      }),
      this.stream.onMessage(e => {
        n(() => (1 == ++this.e_ ? this.E_(e) : this.onNext(e)));
      });
  }
  i_() {
    (this.state = 5),
      this.t_.Go(async () => {
        (this.state = 0), this.start();
      });
  }
  I_(e) {
    return yo('PersistentStream', `close with error: ${e}`), (this.stream = null), this.close(4, e);
  }
  h_(e) {
    return t => {
      this.ui.enqueueAndForget(() =>
        this.Yo === e ? t() : (yo('PersistentStream', 'stream callback skipped by getCloseGuardedDispatcher.'), Promise.resolve())
      );
    };
  }
}
class dl extends ll {
  constructor(e, t, n, r, s, i) {
    super(e, 'listen_stream_connection_backoff', 'listen_stream_idle', 'health_check_timeout', t, n, r, i), (this.serializer = s);
  }
  T_(e, t) {
    return this.connection.Bo('Listen', e, t);
  }
  E_(e) {
    return this.onNext(e);
  }
  onNext(e) {
    this.t_.reset();
    const t = (function (e, t) {
        let n;
        if ('targetChange' in t) {
          t.targetChange;
          const r = (function (e) {
              return 'NO_CHANGE' === e ? 0 : 'ADD' === e ? 1 : 'REMOVE' === e ? 2 : 'CURRENT' === e ? 3 : 'RESET' === e ? 4 : bo();
            })(t.targetChange.targetChangeType || 'NO_CHANGE'),
            s = t.targetChange.targetIds || [],
            i = (function (e, t) {
              return e.useProto3Json
                ? (To(void 0 === t || 'string' == typeof t), pa.fromBase64String(t || ''))
                : (To(void 0 === t || t instanceof Buffer || t instanceof Uint8Array), pa.fromUint8Array(t || new Uint8Array()));
            })(e, t.targetChange.resumeToken),
            o = t.targetChange.cause,
            a =
              o &&
              (function (e) {
                const t = void 0 === e.code ? Io.UNKNOWN : Eu(e.code);
                return new So(t, e.message || '');
              })(o);
          n = new Pu(r, s, i, a || null);
        } else if ('documentChange' in t) {
          t.documentChange;
          const r = t.documentChange;
          r.document, r.document.name, r.document.updateTime;
          const s = Ju(e, r.document.name),
            i = Gu(r.document.updateTime),
            o = r.document.createTime ? Gu(r.document.createTime) : jo.min(),
            a = new ja({ mapValue: { fields: r.document.fields } }),
            c = $a.newFoundDocument(s, i, o, a),
            u = r.targetIds || [],
            h = r.removedTargetIds || [];
          n = new Du(u, h, c.key, c);
        } else if ('documentDelete' in t) {
          t.documentDelete;
          const r = t.documentDelete;
          r.document;
          const s = Ju(e, r.document),
            i = r.readTime ? Gu(r.readTime) : jo.min(),
            o = $a.newNoDocument(s, i),
            a = r.removedTargetIds || [];
          n = new Du([], a, o.key, o);
        } else if ('documentRemove' in t) {
          t.documentRemove;
          const r = t.documentRemove;
          r.document;
          const s = Ju(e, r.document),
            i = r.removedTargetIds || [];
          n = new Du([], i, s, null);
        } else {
          if (!('filter' in t)) return bo();
          {
            t.filter;
            const e = t.filter;
            e.targetId;
            const { count: r = 0, unchangedNames: s } = e,
              i = new _u(r, s),
              o = e.targetId;
            n = new Ou(o, i);
          }
        }
        return n;
      })(this.serializer, e),
      n = (function (e) {
        if (!('targetChange' in e)) return jo.min();
        const t = e.targetChange;
        return t.targetIds && t.targetIds.length ? jo.min() : t.readTime ? Gu(t.readTime) : jo.min();
      })(e);
    return this.listener.d_(t, n);
  }
  A_(e) {
    const t = {};
    (t.database = Zu(this.serializer)),
      (t.addTarget = (function (e, t) {
        let n;
        const r = t.target;
        if (
          ((n = pc(r) ? { documents: nh(e, r) } : { query: rh(e, r)._t }),
          (n.targetId = t.targetId),
          t.resumeToken.approximateByteSize() > 0)
        ) {
          n.resumeToken = zu(e, t.resumeToken);
          const r = $u(e, t.expectedCount);
          null !== r && (n.expectedCount = r);
        } else if (t.snapshotVersion.compareTo(jo.min()) > 0) {
          n.readTime = qu(e, t.snapshotVersion.toTimestamp());
          const r = $u(e, t.expectedCount);
          null !== r && (n.expectedCount = r);
        }
        return n;
      })(this.serializer, e));
    const n = (function (e, t) {
      const n = (function (e) {
        switch (e) {
          case 'TargetPurposeListen':
            return null;
          case 'TargetPurposeExistenceFilterMismatch':
            return 'existence-filter-mismatch';
          case 'TargetPurposeExistenceFilterMismatchBloom':
            return 'existence-filter-mismatch-bloom';
          case 'TargetPurposeLimboResolution':
            return 'limbo-document';
          default:
            return bo();
        }
      })(t.purpose);
      return null == n ? null : { 'goog-listen-tags': n };
    })(this.serializer, e);
    n && (t.labels = n), this.a_(t);
  }
  R_(e) {
    const t = {};
    (t.database = Zu(this.serializer)), (t.removeTarget = e), this.a_(t);
  }
}
class fl extends ll {
  constructor(e, t, n, r, s, i) {
    super(e, 'write_stream_connection_backoff', 'write_stream_idle', 'health_check_timeout', t, n, r, i), (this.serializer = s);
  }
  get V_() {
    return this.e_ > 0;
  }
  start() {
    (this.lastStreamToken = void 0), super.start();
  }
  l_() {
    this.V_ && this.m_([]);
  }
  T_(e, t) {
    return this.connection.Bo('Write', e, t);
  }
  E_(e) {
    return (
      To(!!e.streamToken), (this.lastStreamToken = e.streamToken), To(!e.writeResults || 0 === e.writeResults.length), this.listener.f_()
    );
  }
  onNext(e) {
    To(!!e.streamToken), (this.lastStreamToken = e.streamToken), this.t_.reset();
    const t = (function (e, t) {
        return e && e.length > 0
          ? (To(void 0 !== t),
            e.map(e =>
              (function (e, t) {
                let n = e.updateTime ? Gu(e.updateTime) : Gu(t);
                return n.isEqual(jo.min()) && (n = Gu(t)), new tu(n, e.transformResults || []);
              })(e, t)
            ))
          : [];
      })(e.writeResults, e.commitTime),
      n = Gu(e.commitTime);
    return this.listener.g_(n, t);
  }
  p_() {
    const e = {};
    (e.database = Zu(this.serializer)), this.a_(e);
  }
  m_(e) {
    const t = {
      streamToken: this.lastStreamToken,
      writes: e.map(e =>
        (function (e, t) {
          let n;
          if (t instanceof hu) n = { update: th(e, t.key, t.value) };
          else if (t instanceof gu) n = { delete: Xu(e, t.key) };
          else if (t instanceof lu) n = { update: th(e, t.key, t.data), updateMask: dh(t.fieldMask) };
          else {
            if (!(t instanceof mu)) return bo();
            n = { verify: Xu(e, t.key) };
          }
          return (
            t.fieldTransforms.length > 0 &&
              (n.updateTransforms = t.fieldTransforms.map(e =>
                (function (e, t) {
                  const n = t.transform;
                  if (n instanceof Kc) return { fieldPath: t.field.canonicalString(), setToServerValue: 'REQUEST_TIME' };
                  if (n instanceof Wc) return { fieldPath: t.field.canonicalString(), appendMissingElements: { values: n.elements } };
                  if (n instanceof Xc) return { fieldPath: t.field.canonicalString(), removeAllFromArray: { values: n.elements } };
                  if (n instanceof Yc) return { fieldPath: t.field.canonicalString(), increment: n.Pe };
                  throw bo();
                })(0, e)
              )),
            t.precondition.isNone ||
              (n.currentDocument = (function (e, t) {
                return void 0 !== t.updateTime ? { updateTime: Hu(e, t.updateTime) } : void 0 !== t.exists ? { exists: t.exists } : bo();
              })(e, t.precondition)),
            n
          );
        })(this.serializer, e)
      ),
    };
    this.a_(t);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class pl extends class {} {
  constructor(e, t, n, r) {
    super(), (this.authCredentials = e), (this.appCheckCredentials = t), (this.connection = n), (this.serializer = r), (this.y_ = !1);
  }
  w_() {
    if (this.y_) throw new So(Io.FAILED_PRECONDITION, 'The client has already been terminated.');
  }
  Mo(e, t, n, r) {
    return (
      this.w_(),
      Promise.all([this.authCredentials.getToken(), this.appCheckCredentials.getToken()])
        .then(([s, i]) => this.connection.Mo(e, Wu(t, n), r, s, i))
        .catch(e => {
          throw 'FirebaseError' === e.name
            ? (e.code === Io.UNAUTHENTICATED && (this.authCredentials.invalidateToken(), this.appCheckCredentials.invalidateToken()), e)
            : new So(Io.UNKNOWN, e.toString());
        })
    );
  }
  Lo(e, t, n, r, s) {
    return (
      this.w_(),
      Promise.all([this.authCredentials.getToken(), this.appCheckCredentials.getToken()])
        .then(([i, o]) => this.connection.Lo(e, Wu(t, n), r, i, o, s))
        .catch(e => {
          throw 'FirebaseError' === e.name
            ? (e.code === Io.UNAUTHENTICATED && (this.authCredentials.invalidateToken(), this.appCheckCredentials.invalidateToken()), e)
            : new So(Io.UNKNOWN, e.toString());
        })
    );
  }
  terminate() {
    (this.y_ = !0), this.connection.terminate();
  }
}
class gl {
  constructor(e, t) {
    (this.asyncQueue = e), (this.onlineStateHandler = t), (this.state = 'Unknown'), (this.S_ = 0), (this.b_ = null), (this.D_ = !0);
  }
  v_() {
    0 === this.S_ &&
      (this.C_('Unknown'),
      (this.b_ = this.asyncQueue.enqueueAfterDelay(
        'online_state_timeout',
        1e4,
        () => ((this.b_ = null), this.F_("Backend didn't respond within 10 seconds."), this.C_('Offline'), Promise.resolve())
      )));
  }
  M_(e) {
    'Online' === this.state
      ? this.C_('Unknown')
      : (this.S_++,
        this.S_ >= 1 && (this.x_(), this.F_(`Connection failed 1 times. Most recent error: ${e.toString()}`), this.C_('Offline')));
  }
  set(e) {
    this.x_(), (this.S_ = 0), 'Online' === e && (this.D_ = !1), this.C_(e);
  }
  C_(e) {
    e !== this.state && ((this.state = e), this.onlineStateHandler(e));
  }
  F_(e) {
    const t = `Could not reach Cloud Firestore backend. ${e}\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;
    this.D_ ? (vo(t), (this.D_ = !1)) : yo('OnlineStateTracker', t);
  }
  x_() {
    null !== this.b_ && (this.b_.cancel(), (this.b_ = null));
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class ml {
  constructor(e, t, n, r, s) {
    (this.localStore = e),
      (this.datastore = t),
      (this.asyncQueue = n),
      (this.remoteSyncer = {}),
      (this.O_ = []),
      (this.N_ = new Map()),
      (this.L_ = new Set()),
      (this.B_ = []),
      (this.k_ = s),
      this.k_._o(e => {
        n.enqueueAndForget(async () => {
          Sl(this) &&
            (yo('RemoteStore', 'Restarting streams for network reachability change.'),
            await (async function (e) {
              const t = Eo(e);
              t.L_.add(4), await vl(t), t.q_.set('Unknown'), t.L_.delete(4), await yl(t);
            })(this));
        });
      }),
      (this.q_ = new gl(n, r));
  }
}
async function yl(e) {
  if (Sl(e)) for (const t of e.B_) await t(!0);
}
async function vl(e) {
  for (const t of e.B_) await t(!1);
}
function wl(e, t) {
  const n = Eo(e);
  n.N_.has(t.targetId) || (n.N_.set(t.targetId, t), Il(n) ? El(n) : ql(n).r_() && bl(n, t));
}
function _l(e, t) {
  const n = Eo(e),
    r = ql(n);
  n.N_.delete(t), r.r_() && Tl(n, t), 0 === n.N_.size && (r.r_() ? r.o_() : Sl(n) && n.q_.set('Unknown'));
}
function bl(e, t) {
  if ((e.Q_.xe(t.targetId), t.resumeToken.approximateByteSize() > 0 || t.snapshotVersion.compareTo(jo.min()) > 0)) {
    const n = e.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;
    t = t.withExpectedCount(n);
  }
  ql(e).A_(t);
}
function Tl(e, t) {
  e.Q_.xe(t), ql(e).R_(t);
}
function El(e) {
  (e.Q_ = new Lu({
    getRemoteKeysForTarget: t => e.remoteSyncer.getRemoteKeysForTarget(t),
    ot: t => e.N_.get(t) || null,
    tt: () => e.datastore.serializer.databaseId,
  })),
    ql(e).start(),
    e.q_.v_();
}
function Il(e) {
  return Sl(e) && !ql(e).n_() && e.N_.size > 0;
}
function Sl(e) {
  return 0 === Eo(e).L_.size;
}
function Cl(e) {
  e.Q_ = void 0;
}
async function kl(e) {
  e.q_.set('Online');
}
async function Al(e) {
  e.N_.forEach((t, n) => {
    bl(e, t);
  });
}
async function Nl(e, t) {
  Cl(e), Il(e) ? (e.q_.M_(t), El(e)) : e.q_.set('Unknown');
}
async function Rl(e, t, n) {
  if ((e.q_.set('Online'), t instanceof Pu && 2 === t.state && t.cause))
    try {
      await (async function (e, t) {
        const n = t.cause;
        for (const r of t.targetIds) e.N_.has(r) && (await e.remoteSyncer.rejectListen(r, n), e.N_.delete(r), e.Q_.removeTarget(r));
      })(e, t);
    } catch (n) {
      yo('RemoteStore', 'Failed to remove targets %s: %s ', t.targetIds.join(','), n), await Dl(e, n);
    }
  else if ((t instanceof Du ? e.Q_.Ke(t) : t instanceof Ou ? e.Q_.He(t) : e.Q_.We(t), !n.isEqual(jo.min())))
    try {
      const t = await Kh(e.localStore);
      n.compareTo(t) >= 0 &&
        (await (function (e, t) {
          const n = e.Q_.rt(t);
          return (
            n.targetChanges.forEach((n, r) => {
              if (n.resumeToken.approximateByteSize() > 0) {
                const s = e.N_.get(r);
                s && e.N_.set(r, s.withResumeToken(n.resumeToken, t));
              }
            }),
            n.targetMismatches.forEach((t, n) => {
              const r = e.N_.get(t);
              if (!r) return;
              e.N_.set(t, r.withResumeToken(pa.EMPTY_BYTE_STRING, r.snapshotVersion)), Tl(e, t);
              const s = new ph(r.target, t, n, r.sequenceNumber);
              bl(e, s);
            }),
            e.remoteSyncer.applyRemoteEvent(n)
          );
        })(e, n));
    } catch (t) {
      yo('RemoteStore', 'Failed to raise snapshot:', t), await Dl(e, t);
    }
}
async function Dl(e, t, n) {
  if (!Yo(t)) throw t;
  e.L_.add(1),
    await vl(e),
    e.q_.set('Offline'),
    n || (n = () => Kh(e.localStore)),
    e.asyncQueue.enqueueRetryable(async () => {
      yo('RemoteStore', 'Retrying IndexedDB access'), await n(), e.L_.delete(1), await yl(e);
    });
}
function Ol(e, t) {
  return t().catch(n => Dl(e, n, t));
}
async function Pl(e) {
  const t = Eo(e),
    n = zl(t);
  let r = t.O_.length > 0 ? t.O_[t.O_.length - 1].batchId : -1;
  for (; xl(t); )
    try {
      const e = await Qh(t.localStore, r);
      if (null === e) {
        0 === t.O_.length && n.o_();
        break;
      }
      (r = e.batchId), Ll(t, e);
    } catch (e) {
      await Dl(t, e);
    }
  Ml(t) && Ul(t);
}
function xl(e) {
  return Sl(e) && e.O_.length < 10;
}
function Ll(e, t) {
  e.O_.push(t);
  const n = zl(e);
  n.r_() && n.V_ && n.m_(t.mutations);
}
function Ml(e) {
  return Sl(e) && !zl(e).n_() && e.O_.length > 0;
}
function Ul(e) {
  zl(e).start();
}
async function Fl(e) {
  zl(e).p_();
}
async function Vl(e) {
  const t = zl(e);
  for (const n of e.O_) t.m_(n.mutations);
}
async function jl(e, t, n) {
  const r = e.O_.shift(),
    s = vu.from(r, t, n);
  await Ol(e, () => e.remoteSyncer.applySuccessfulWrite(s)), await Pl(e);
}
async function Bl(e, t) {
  t &&
    zl(e).V_ &&
    (await (async function (e, t) {
      if (
        (function (e) {
          return (
            (function (e) {
              switch (e) {
                default:
                  return bo();
                case Io.CANCELLED:
                case Io.UNKNOWN:
                case Io.DEADLINE_EXCEEDED:
                case Io.RESOURCE_EXHAUSTED:
                case Io.INTERNAL:
                case Io.UNAVAILABLE:
                case Io.UNAUTHENTICATED:
                  return !1;
                case Io.INVALID_ARGUMENT:
                case Io.NOT_FOUND:
                case Io.ALREADY_EXISTS:
                case Io.PERMISSION_DENIED:
                case Io.FAILED_PRECONDITION:
                case Io.ABORTED:
                case Io.OUT_OF_RANGE:
                case Io.UNIMPLEMENTED:
                case Io.DATA_LOSS:
                  return !0;
              }
            })(e) && e !== Io.ABORTED
          );
        })(t.code)
      ) {
        const n = e.O_.shift();
        zl(e).s_(), await Ol(e, () => e.remoteSyncer.rejectFailedWrite(n.batchId, t)), await Pl(e);
      }
    })(e, t)),
    Ml(e) && Ul(e);
}
async function $l(e, t) {
  const n = Eo(e);
  n.asyncQueue.verifyOperationInProgress(), yo('RemoteStore', 'RemoteStore received new credentials');
  const r = Sl(n);
  n.L_.add(3), await vl(n), r && n.q_.set('Unknown'), await n.remoteSyncer.handleCredentialChange(t), n.L_.delete(3), await yl(n);
}
function ql(e) {
  return (
    e.K_ ||
      ((e.K_ = (function (e, t, n) {
        const r = Eo(e);
        return r.w_(), new dl(t, r.connection, r.authCredentials, r.appCheckCredentials, r.serializer, n);
        /**
         * @license
         * Copyright 2018 Google LLC
         *
         * Licensed under the Apache License, Version 2.0 (the "License");
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         *   http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */
      })(e.datastore, e.asyncQueue, { Eo: kl.bind(null, e), Ro: Al.bind(null, e), mo: Nl.bind(null, e), d_: Rl.bind(null, e) })),
      e.B_.push(async t => {
        t ? (e.K_.s_(), Il(e) ? El(e) : e.q_.set('Unknown')) : (await e.K_.stop(), Cl(e));
      })),
    e.K_
  );
}
function zl(e) {
  return (
    e.U_ ||
      ((e.U_ = (function (e, t, n) {
        const r = Eo(e);
        return r.w_(), new fl(t, r.connection, r.authCredentials, r.appCheckCredentials, r.serializer, n);
      })(e.datastore, e.asyncQueue, {
        Eo: () => Promise.resolve(),
        Ro: Fl.bind(null, e),
        mo: Bl.bind(null, e),
        f_: Vl.bind(null, e),
        g_: jl.bind(null, e),
      })),
      e.B_.push(async t => {
        t
          ? (e.U_.s_(), await Pl(e))
          : (await e.U_.stop(),
            e.O_.length > 0 && (yo('RemoteStore', `Stopping write stream with ${e.O_.length} pending writes`), (e.O_ = [])));
      })),
    e.U_
  );
  /**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
}
class Hl {
  constructor(e, t, n, r, s) {
    (this.asyncQueue = e),
      (this.timerId = t),
      (this.targetTimeMs = n),
      (this.op = r),
      (this.removalCallback = s),
      (this.deferred = new Co()),
      (this.then = this.deferred.promise.then.bind(this.deferred.promise)),
      this.deferred.promise.catch(e => {});
  }
  get promise() {
    return this.deferred.promise;
  }
  static createAndSchedule(e, t, n, r, s) {
    const i = Date.now() + n,
      o = new Hl(e, t, i, r, s);
    return o.start(n), o;
  }
  start(e) {
    this.timerHandle = setTimeout(() => this.handleDelayElapsed(), e);
  }
  skipDelay() {
    return this.handleDelayElapsed();
  }
  cancel(e) {
    null !== this.timerHandle &&
      (this.clearTimeout(), this.deferred.reject(new So(Io.CANCELLED, 'Operation cancelled' + (e ? ': ' + e : ''))));
  }
  handleDelayElapsed() {
    this.asyncQueue.enqueueAndForget(() =>
      null !== this.timerHandle ? (this.clearTimeout(), this.op().then(e => this.deferred.resolve(e))) : Promise.resolve()
    );
  }
  clearTimeout() {
    null !== this.timerHandle && (this.removalCallback(this), clearTimeout(this.timerHandle), (this.timerHandle = null));
  }
}
function Gl(e, t) {
  if ((vo('AsyncQueue', `${t}: ${e}`), Yo(e))) return new So(Io.UNAVAILABLE, `${t}: ${e}`);
  throw e;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Kl {
  constructor(e) {
    (this.comparator = e ? (t, n) => e(t, n) || Ho.comparator(t.key, n.key) : (e, t) => Ho.comparator(e.key, t.key)),
      (this.keyedMap = Dc()),
      (this.sortedSet = new aa(this.comparator));
  }
  static emptySet(e) {
    return new Kl(e.comparator);
  }
  has(e) {
    return null != this.keyedMap.get(e);
  }
  get(e) {
    return this.keyedMap.get(e);
  }
  first() {
    return this.sortedSet.minKey();
  }
  last() {
    return this.sortedSet.maxKey();
  }
  isEmpty() {
    return this.sortedSet.isEmpty();
  }
  indexOf(e) {
    const t = this.keyedMap.get(e);
    return t ? this.sortedSet.indexOf(t) : -1;
  }
  get size() {
    return this.sortedSet.size;
  }
  forEach(e) {
    this.sortedSet.inorderTraversal((t, n) => (e(t), !1));
  }
  add(e) {
    const t = this.delete(e.key);
    return t.copy(t.keyedMap.insert(e.key, e), t.sortedSet.insert(e, null));
  }
  delete(e) {
    const t = this.get(e);
    return t ? this.copy(this.keyedMap.remove(e), this.sortedSet.remove(t)) : this;
  }
  isEqual(e) {
    if (!(e instanceof Kl)) return !1;
    if (this.size !== e.size) return !1;
    const t = this.sortedSet.getIterator(),
      n = e.sortedSet.getIterator();
    for (; t.hasNext(); ) {
      const e = t.getNext().key,
        r = n.getNext().key;
      if (!e.isEqual(r)) return !1;
    }
    return !0;
  }
  toString() {
    const e = [];
    return (
      this.forEach(t => {
        e.push(t.toString());
      }),
      0 === e.length ? 'DocumentSet ()' : 'DocumentSet (\n  ' + e.join('  \n') + '\n)'
    );
  }
  copy(e, t) {
    const n = new Kl();
    return (n.comparator = this.comparator), (n.keyedMap = e), (n.sortedSet = t), n;
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Wl {
  constructor() {
    this.W_ = new aa(Ho.comparator);
  }
  track(e) {
    const t = e.doc.key,
      n = this.W_.get(t);
    n
      ? 0 !== e.type && 3 === n.type
        ? (this.W_ = this.W_.insert(t, e))
        : 3 === e.type && 1 !== n.type
        ? (this.W_ = this.W_.insert(t, { type: n.type, doc: e.doc }))
        : 2 === e.type && 2 === n.type
        ? (this.W_ = this.W_.insert(t, { type: 2, doc: e.doc }))
        : 2 === e.type && 0 === n.type
        ? (this.W_ = this.W_.insert(t, { type: 0, doc: e.doc }))
        : 1 === e.type && 0 === n.type
        ? (this.W_ = this.W_.remove(t))
        : 1 === e.type && 2 === n.type
        ? (this.W_ = this.W_.insert(t, { type: 1, doc: n.doc }))
        : 0 === e.type && 1 === n.type
        ? (this.W_ = this.W_.insert(t, { type: 2, doc: e.doc }))
        : bo()
      : (this.W_ = this.W_.insert(t, e));
  }
  G_() {
    const e = [];
    return (
      this.W_.inorderTraversal((t, n) => {
        e.push(n);
      }),
      e
    );
  }
}
class Ql {
  constructor(e, t, n, r, s, i, o, a, c) {
    (this.query = e),
      (this.docs = t),
      (this.oldDocs = n),
      (this.docChanges = r),
      (this.mutatedKeys = s),
      (this.fromCache = i),
      (this.syncStateChanged = o),
      (this.excludesMetadataChanges = a),
      (this.hasCachedResults = c);
  }
  static fromInitialDocuments(e, t, n, r, s) {
    const i = [];
    return (
      t.forEach(e => {
        i.push({ type: 0, doc: e });
      }),
      new Ql(e, t, Kl.emptySet(t), i, n, r, !0, !1, s)
    );
  }
  get hasPendingWrites() {
    return !this.mutatedKeys.isEmpty();
  }
  isEqual(e) {
    if (
      !(
        this.fromCache === e.fromCache &&
        this.hasCachedResults === e.hasCachedResults &&
        this.syncStateChanged === e.syncStateChanged &&
        this.mutatedKeys.isEqual(e.mutatedKeys) &&
        bc(this.query, e.query) &&
        this.docs.isEqual(e.docs) &&
        this.oldDocs.isEqual(e.oldDocs)
      )
    )
      return !1;
    const t = this.docChanges,
      n = e.docChanges;
    if (t.length !== n.length) return !1;
    for (let e = 0; e < t.length; e++) if (t[e].type !== n[e].type || !t[e].doc.isEqual(n[e].doc)) return !1;
    return !0;
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Xl {
  constructor() {
    (this.z_ = void 0), (this.j_ = []);
  }
  H_() {
    return this.j_.some(e => e.J_());
  }
}
class Jl {
  constructor() {
    (this.queries = Yl()), (this.onlineState = 'Unknown'), (this.Y_ = new Set());
  }
  terminate() {
    !(function (e, t) {
      const n = Eo(e),
        r = n.queries;
      (n.queries = Yl()),
        r.forEach((e, n) => {
          for (const e of n.j_) e.onError(t);
        });
    })(this, new So(Io.ABORTED, 'Firestore shutting down'));
  }
}
function Yl() {
  return new kc(e => Tc(e), bc);
}
function Zl(e, t) {
  const n = Eo(e);
  let r = !1;
  for (const e of t) {
    const t = e.query,
      s = n.queries.get(t);
    if (s) {
      for (const t of s.j_) t.X_(e) && (r = !0);
      s.z_ = e;
    }
  }
  r && td(n);
}
function ed(e, t, n) {
  const r = Eo(e),
    s = r.queries.get(t);
  if (s) for (const e of s.j_) e.onError(n);
  r.queries.delete(t);
}
function td(e) {
  e.Y_.forEach(e => {
    e.next();
  });
}
var nd, rd;
((rd = nd || (nd = {})).ea = 'default'), (rd.Cache = 'cache');
class sd {
  constructor(e, t, n) {
    (this.query = e), (this.ta = t), (this.na = !1), (this.ra = null), (this.onlineState = 'Unknown'), (this.options = n || {});
  }
  X_(e) {
    if (!this.options.includeMetadataChanges) {
      const t = [];
      for (const n of e.docChanges) 3 !== n.type && t.push(n);
      e = new Ql(e.query, e.docs, e.oldDocs, t, e.mutatedKeys, e.fromCache, e.syncStateChanged, !0, e.hasCachedResults);
    }
    let t = !1;
    return this.na ? this.ia(e) && (this.ta.next(e), (t = !0)) : this.sa(e, this.onlineState) && (this.oa(e), (t = !0)), (this.ra = e), t;
  }
  onError(e) {
    this.ta.error(e);
  }
  Z_(e) {
    this.onlineState = e;
    let t = !1;
    return this.ra && !this.na && this.sa(this.ra, e) && (this.oa(this.ra), (t = !0)), t;
  }
  sa(e, t) {
    if (!e.fromCache) return !0;
    if (!this.J_()) return !0;
    const n = 'Offline' !== t;
    return (!this.options._a || !n) && (!e.docs.isEmpty() || e.hasCachedResults || 'Offline' === t);
  }
  ia(e) {
    if (e.docChanges.length > 0) return !0;
    const t = this.ra && this.ra.hasPendingWrites !== e.hasPendingWrites;
    return !(!e.syncStateChanged && !t) && !0 === this.options.includeMetadataChanges;
  }
  oa(e) {
    (e = Ql.fromInitialDocuments(e.query, e.docs, e.mutatedKeys, e.fromCache, e.hasCachedResults)), (this.na = !0), this.ta.next(e);
  }
  J_() {
    return this.options.source !== nd.Cache;
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class id {
  constructor(e) {
    this.key = e;
  }
}
class od {
  constructor(e) {
    this.key = e;
  }
}
class ad {
  constructor(e, t) {
    (this.query = e),
      (this.Ta = t),
      (this.Ea = null),
      (this.hasCachedResults = !1),
      (this.current = !1),
      (this.da = Fc()),
      (this.mutatedKeys = Fc()),
      (this.Aa = Sc(e)),
      (this.Ra = new Kl(this.Aa));
  }
  get Va() {
    return this.Ta;
  }
  ma(e, t) {
    const n = t ? t.fa : new Wl(),
      r = t ? t.Ra : this.Ra;
    let s = t ? t.mutatedKeys : this.mutatedKeys,
      i = r,
      o = !1;
    const a = 'F' === this.query.limitType && r.size === this.query.limit ? r.last() : null,
      c = 'L' === this.query.limitType && r.size === this.query.limit ? r.first() : null;
    if (
      (e.inorderTraversal((e, t) => {
        const u = r.get(e),
          h = Ic(this.query, t) ? t : null,
          l = !!u && this.mutatedKeys.has(u.key),
          d = !!h && (h.hasLocalMutations || (this.mutatedKeys.has(h.key) && h.hasCommittedMutations));
        let f = !1;
        u && h
          ? u.data.isEqual(h.data)
            ? l !== d && (n.track({ type: 3, doc: h }), (f = !0))
            : this.ga(u, h) || (n.track({ type: 2, doc: h }), (f = !0), ((a && this.Aa(h, a) > 0) || (c && this.Aa(h, c) < 0)) && (o = !0))
          : !u && h
          ? (n.track({ type: 0, doc: h }), (f = !0))
          : u && !h && (n.track({ type: 1, doc: u }), (f = !0), (a || c) && (o = !0)),
          f && (h ? ((i = i.add(h)), (s = d ? s.add(e) : s.delete(e))) : ((i = i.delete(e)), (s = s.delete(e))));
      }),
      null !== this.query.limit)
    )
      for (; i.size > this.query.limit; ) {
        const e = 'F' === this.query.limitType ? i.last() : i.first();
        (i = i.delete(e.key)), (s = s.delete(e.key)), n.track({ type: 1, doc: e });
      }
    return { Ra: i, fa: n, ns: o, mutatedKeys: s };
  }
  ga(e, t) {
    return e.hasLocalMutations && t.hasCommittedMutations && !t.hasLocalMutations;
  }
  applyChanges(e, t, n, r) {
    const s = this.Ra;
    (this.Ra = e.Ra), (this.mutatedKeys = e.mutatedKeys);
    const i = e.fa.G_();
    i.sort(
      (e, t) =>
        (function (e, t) {
          const n = e => {
            switch (e) {
              case 0:
                return 1;
              case 2:
              case 3:
                return 2;
              case 1:
                return 0;
              default:
                return bo();
            }
          };
          return n(e) - n(t);
        })(
          /**
           * @license
           * Copyright 2020 Google LLC
           *
           * Licensed under the Apache License, Version 2.0 (the "License");
           * you may not use this file except in compliance with the License.
           * You may obtain a copy of the License at
           *
           *   http://www.apache.org/licenses/LICENSE-2.0
           *
           * Unless required by applicable law or agreed to in writing, software
           * distributed under the License is distributed on an "AS IS" BASIS,
           * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
           * See the License for the specific language governing permissions and
           * limitations under the License.
           */ e.type,
          t.type
        ) || this.Aa(e.doc, t.doc)
    ),
      this.pa(n),
      (r = null != r && r);
    const o = t && !r ? this.ya() : [],
      a = 0 === this.da.size && this.current && !r ? 1 : 0,
      c = a !== this.Ea;
    return (
      (this.Ea = a),
      0 !== i.length || c
        ? { snapshot: new Ql(this.query, e.Ra, s, i, e.mutatedKeys, 0 === a, c, !1, !!n && n.resumeToken.approximateByteSize() > 0), wa: o }
        : { wa: o }
    );
  }
  Z_(e) {
    return this.current && 'Offline' === e
      ? ((this.current = !1), this.applyChanges({ Ra: this.Ra, fa: new Wl(), mutatedKeys: this.mutatedKeys, ns: !1 }, !1))
      : { wa: [] };
  }
  Sa(e) {
    return !this.Ta.has(e) && !!this.Ra.has(e) && !this.Ra.get(e).hasLocalMutations;
  }
  pa(e) {
    e &&
      (e.addedDocuments.forEach(e => (this.Ta = this.Ta.add(e))),
      e.modifiedDocuments.forEach(e => {}),
      e.removedDocuments.forEach(e => (this.Ta = this.Ta.delete(e))),
      (this.current = e.current));
  }
  ya() {
    if (!this.current) return [];
    const e = this.da;
    (this.da = Fc()),
      this.Ra.forEach(e => {
        this.Sa(e.key) && (this.da = this.da.add(e.key));
      });
    const t = [];
    return (
      e.forEach(e => {
        this.da.has(e) || t.push(new od(e));
      }),
      this.da.forEach(n => {
        e.has(n) || t.push(new id(n));
      }),
      t
    );
  }
  ba(e) {
    (this.Ta = e.Ts), (this.da = Fc());
    const t = this.ma(e.documents);
    return this.applyChanges(t, !0);
  }
  Da() {
    return Ql.fromInitialDocuments(this.query, this.Ra, this.mutatedKeys, 0 === this.Ea, this.hasCachedResults);
  }
}
class cd {
  constructor(e, t, n) {
    (this.query = e), (this.targetId = t), (this.view = n);
  }
}
class ud {
  constructor(e) {
    (this.key = e), (this.va = !1);
  }
}
class hd {
  constructor(e, t, n, r, s, i) {
    (this.localStore = e),
      (this.remoteStore = t),
      (this.eventManager = n),
      (this.sharedClientState = r),
      (this.currentUser = s),
      (this.maxConcurrentLimboResolutions = i),
      (this.Ca = {}),
      (this.Fa = new kc(e => Tc(e), bc)),
      (this.Ma = new Map()),
      (this.xa = new Set()),
      (this.Oa = new aa(Ho.comparator)),
      (this.Na = new Map()),
      (this.La = new Oh()),
      (this.Ba = {}),
      (this.ka = new Map()),
      (this.qa = bh.kn()),
      (this.onlineState = 'Unknown'),
      (this.Qa = void 0);
  }
  get isPrimaryClient() {
    return !0 === this.Qa;
  }
}
async function ld(e, t, n = !0) {
  const r = Od(e);
  let s;
  const i = r.Fa.get(t);
  return i ? (r.sharedClientState.addLocalQueryTarget(i.targetId), (s = i.view.Da())) : (s = await fd(r, t, n, !0)), s;
}
async function dd(e, t) {
  const n = Od(e);
  await fd(n, t, !0, !1);
}
async function fd(e, t, n, r) {
  const s = await (function (e, t) {
      const n = Eo(e);
      return n.persistence
        .runTransaction('Allocate target', 'readwrite', e => {
          let r;
          return n.Ur.getTargetData(e, t).next(s =>
            s
              ? ((r = s), Jo.resolve(r))
              : n.Ur.allocateTargetId(e).next(
                  s => ((r = new ph(t, s, 'TargetPurposeListen', e.currentSequenceNumber)), n.Ur.addTargetData(e, r).next(() => r))
                )
          );
        })
        .then(e => {
          const r = n.os.get(e.targetId);
          return (
            (null === r || e.snapshotVersion.compareTo(r.snapshotVersion) > 0) &&
              ((n.os = n.os.insert(e.targetId, e)), n._s.set(t, e.targetId)),
            e
          );
        });
    })(e.localStore, wc(t)),
    i = s.targetId,
    o = e.sharedClientState.addLocalQueryTarget(i, n);
  let a;
  return (
    r &&
      (a = await (async function (e, t, n, r, s) {
        e.Ka = (t, n, r) =>
          (async function (e, t, n, r) {
            let s = t.view.ma(n);
            s.ns && (s = await Jh(e.localStore, t.query, !1).then(({ documents: e }) => t.view.ma(e, s)));
            const i = r && r.targetChanges.get(t.targetId),
              o = r && null != r.targetMismatches.get(t.targetId),
              a = t.view.applyChanges(s, e.isPrimaryClient, i, o);
            return Cd(e, t.targetId, a.wa), a.snapshot;
          })(e, t, n, r);
        const i = await Jh(e.localStore, t, !0),
          o = new ad(t, i.Ts),
          a = o.ma(i.documents),
          c = Ru.createSynthesizedTargetChangeForCurrentChange(n, r && 'Offline' !== e.onlineState, s),
          u = o.applyChanges(a, e.isPrimaryClient, c);
        Cd(e, n, u.wa);
        const h = new cd(t, n, o);
        return e.Fa.set(t, h), e.Ma.has(n) ? e.Ma.get(n).push(t) : e.Ma.set(n, [t]), u.snapshot;
      })(e, t, i, 'current' === o, s.resumeToken)),
    e.isPrimaryClient && n && wl(e.remoteStore, s),
    a
  );
}
async function pd(e, t, n) {
  const r = Eo(e),
    s = r.Fa.get(t),
    i = r.Ma.get(s.targetId);
  if (i.length > 1)
    return (
      r.Ma.set(
        s.targetId,
        i.filter(e => !bc(e, t))
      ),
      void r.Fa.delete(t)
    );
  r.isPrimaryClient
    ? (r.sharedClientState.removeLocalQueryTarget(s.targetId),
      r.sharedClientState.isActiveQueryTarget(s.targetId) ||
        (await Xh(r.localStore, s.targetId, !1)
          .then(() => {
            r.sharedClientState.clearQueryState(s.targetId), n && _l(r.remoteStore, s.targetId), Id(r, s.targetId);
          })
          .catch(Xo)))
    : (Id(r, s.targetId), await Xh(r.localStore, s.targetId, !0));
}
async function gd(e, t) {
  const n = Eo(e),
    r = n.Fa.get(t),
    s = n.Ma.get(r.targetId);
  n.isPrimaryClient && 1 === s.length && (n.sharedClientState.removeLocalQueryTarget(r.targetId), _l(n.remoteStore, r.targetId));
}
async function md(e, t, n) {
  const r = (function (e) {
    const t = Eo(e);
    return (
      (t.remoteStore.remoteSyncer.applySuccessfulWrite = _d.bind(null, t)),
      (t.remoteStore.remoteSyncer.rejectFailedWrite = bd.bind(null, t)),
      t
    );
  })(e);
  try {
    const e = await (function (e, t) {
      const n = Eo(e),
        r = Vo.now(),
        s = t.reduce((e, t) => e.add(t.key), Fc());
      let i, o;
      return n.persistence
        .runTransaction('Locally write mutations', 'readwrite', e => {
          let a = Nc(),
            c = Fc();
          return n.cs
            .getEntries(e, s)
            .next(e => {
              (a = e),
                a.forEach((e, t) => {
                  t.isValidDocument() || (c = c.add(e));
                });
            })
            .next(() => n.localDocuments.getOverlayedDocuments(e, a))
            .next(s => {
              i = s;
              const o = [];
              for (const e of t) {
                const t = cu(e, i.get(e.key).overlayedDocument);
                null != t && o.push(new lu(e.key, t, Ba(t.value.mapValue), nu.exists(!0)));
              }
              return n.mutationQueue.addMutationBatch(e, r, o, t);
            })
            .next(t => {
              o = t;
              const r = t.applyToLocalDocumentSet(i, c);
              return n.documentOverlayCache.saveOverlays(e, t.batchId, r);
            });
        })
        .then(() => ({ batchId: o.batchId, changes: Oc(i) }));
    })(r.localStore, t);
    r.sharedClientState.addPendingMutation(e.batchId),
      (function (e, t, n) {
        let r = e.Ba[e.currentUser.toKey()];
        r || (r = new aa(Uo)), (r = r.insert(t, n)), (e.Ba[e.currentUser.toKey()] = r);
      })(r, e.batchId, n),
      await Nd(r, e.changes),
      await Pl(r.remoteStore);
  } catch (e) {
    const t = Gl(e, 'Failed to persist write');
    n.reject(t);
  }
}
async function yd(e, t) {
  const n = Eo(e);
  try {
    const e = await Wh(n.localStore, t);
    t.targetChanges.forEach((e, t) => {
      const r = n.Na.get(t);
      r &&
        (To(e.addedDocuments.size + e.modifiedDocuments.size + e.removedDocuments.size <= 1),
        e.addedDocuments.size > 0
          ? (r.va = !0)
          : e.modifiedDocuments.size > 0
          ? To(r.va)
          : e.removedDocuments.size > 0 && (To(r.va), (r.va = !1)));
    }),
      await Nd(n, e, t);
  } catch (e) {
    await Xo(e);
  }
}
function vd(e, t, n) {
  const r = Eo(e);
  if ((r.isPrimaryClient && 0 === n) || (!r.isPrimaryClient && 1 === n)) {
    const e = [];
    r.Fa.forEach((n, r) => {
      const s = r.view.Z_(t);
      s.snapshot && e.push(s.snapshot);
    }),
      (function (e, t) {
        const n = Eo(e);
        n.onlineState = t;
        let r = !1;
        n.queries.forEach((e, n) => {
          for (const e of n.j_) e.Z_(t) && (r = !0);
        }),
          r && td(n);
      })(r.eventManager, t),
      e.length && r.Ca.d_(e),
      (r.onlineState = t),
      r.isPrimaryClient && r.sharedClientState.setOnlineState(t);
  }
}
async function wd(e, t, n) {
  const r = Eo(e);
  r.sharedClientState.updateQueryState(t, 'rejected', n);
  const s = r.Na.get(t),
    i = s && s.key;
  if (i) {
    let e = new aa(Ho.comparator);
    e = e.insert(i, $a.newNoDocument(i, jo.min()));
    const n = Fc().add(i),
      s = new Nu(jo.min(), new Map(), new aa(Uo), e, n);
    await yd(r, s), (r.Oa = r.Oa.remove(i)), r.Na.delete(t), Ad(r);
  } else
    await Xh(r.localStore, t, !1)
      .then(() => Id(r, t, n))
      .catch(Xo);
}
async function _d(e, t) {
  const n = Eo(e),
    r = t.batch.batchId;
  try {
    const e = await (function (e, t) {
      const n = Eo(e);
      return n.persistence.runTransaction('Acknowledge batch', 'readwrite-primary', e => {
        const r = t.batch.keys(),
          s = n.cs.newChangeBuffer({ trackRemovals: !0 });
        return (function (e, t, n, r) {
          const s = n.batch,
            i = s.keys();
          let o = Jo.resolve();
          return (
            i.forEach(e => {
              o = o
                .next(() => r.getEntry(t, e))
                .next(t => {
                  const i = n.docVersions.get(e);
                  To(null !== i),
                    t.version.compareTo(i) < 0 &&
                      (s.applyToRemoteDocument(t, n), t.isValidDocument() && (t.setReadTime(n.commitVersion), r.addEntry(t)));
                });
            }),
            o.next(() => e.mutationQueue.removeMutationBatch(t, s))
          );
        })(n, e, t, s)
          .next(() => s.apply(e))
          .next(() => n.mutationQueue.performConsistencyCheck(e))
          .next(() => n.documentOverlayCache.removeOverlaysForBatchId(e, r, t.batch.batchId))
          .next(() =>
            n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(
              e,
              (function (e) {
                let t = Fc();
                for (let n = 0; n < e.mutationResults.length; ++n)
                  e.mutationResults[n].transformResults.length > 0 && (t = t.add(e.batch.mutations[n].key));
                return t;
              })(t)
            )
          )
          .next(() => n.localDocuments.getDocuments(e, r));
      });
    })(n.localStore, t);
    Ed(n, r, null), Td(n, r), n.sharedClientState.updateMutationState(r, 'acknowledged'), await Nd(n, e);
  } catch (e) {
    await Xo(e);
  }
}
async function bd(e, t, n) {
  const r = Eo(e);
  try {
    const e = await (function (e, t) {
      const n = Eo(e);
      return n.persistence.runTransaction('Reject batch', 'readwrite-primary', e => {
        let r;
        return n.mutationQueue
          .lookupMutationBatch(e, t)
          .next(t => (To(null !== t), (r = t.keys()), n.mutationQueue.removeMutationBatch(e, t)))
          .next(() => n.mutationQueue.performConsistencyCheck(e))
          .next(() => n.documentOverlayCache.removeOverlaysForBatchId(e, r, t))
          .next(() => n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e, r))
          .next(() => n.localDocuments.getDocuments(e, r));
      });
    })(r.localStore, t);
    Ed(r, t, n), Td(r, t), r.sharedClientState.updateMutationState(t, 'rejected', n), await Nd(r, e);
  } catch (n) {
    await Xo(n);
  }
}
function Td(e, t) {
  (e.ka.get(t) || []).forEach(e => {
    e.resolve();
  }),
    e.ka.delete(t);
}
function Ed(e, t, n) {
  const r = Eo(e);
  let s = r.Ba[r.currentUser.toKey()];
  if (s) {
    const e = s.get(t);
    e && (n ? e.reject(n) : e.resolve(), (s = s.remove(t))), (r.Ba[r.currentUser.toKey()] = s);
  }
}
function Id(e, t, n = null) {
  e.sharedClientState.removeLocalQueryTarget(t);
  for (const r of e.Ma.get(t)) e.Fa.delete(r), n && e.Ca.$a(r, n);
  e.Ma.delete(t),
    e.isPrimaryClient &&
      e.La.gr(t).forEach(t => {
        e.La.containsKey(t) || Sd(e, t);
      });
}
function Sd(e, t) {
  e.xa.delete(t.path.canonicalString());
  const n = e.Oa.get(t);
  null !== n && (_l(e.remoteStore, n), (e.Oa = e.Oa.remove(t)), e.Na.delete(n), Ad(e));
}
function Cd(e, t, n) {
  for (const r of n)
    r instanceof id
      ? (e.La.addReference(r.key, t), kd(e, r))
      : r instanceof od
      ? (yo('SyncEngine', 'Document no longer in limbo: ' + r.key), e.La.removeReference(r.key, t), e.La.containsKey(r.key) || Sd(e, r.key))
      : bo();
}
function kd(e, t) {
  const n = t.key,
    r = n.path.canonicalString();
  e.Oa.get(n) || e.xa.has(r) || (yo('SyncEngine', 'New document in limbo: ' + n), e.xa.add(r), Ad(e));
}
function Ad(e) {
  for (; e.xa.size > 0 && e.Oa.size < e.maxConcurrentLimboResolutions; ) {
    const t = e.xa.values().next().value;
    e.xa.delete(t);
    const n = new Ho($o.fromString(t)),
      r = e.qa.next();
    e.Na.set(r, new ud(n)), (e.Oa = e.Oa.insert(n, r)), wl(e.remoteStore, new ph(wc(mc(n.path)), r, 'TargetPurposeLimboResolution', Zo.oe));
  }
}
async function Nd(e, t, n) {
  const r = Eo(e),
    s = [],
    i = [],
    o = [];
  r.Fa.isEmpty() ||
    (r.Fa.forEach((e, a) => {
      o.push(
        r.Ka(a, t, n).then(e => {
          var t;
          if ((e || n) && r.isPrimaryClient) {
            const s = e
              ? !e.fromCache
              : null === (t = null == n ? void 0 : n.targetChanges.get(a.targetId)) || void 0 === t
              ? void 0
              : t.current;
            r.sharedClientState.updateQueryState(a.targetId, s ? 'current' : 'not-current');
          }
          if (e) {
            s.push(e);
            const t = $h.Wi(a.targetId, e);
            i.push(t);
          }
        })
      );
    }),
    await Promise.all(o),
    r.Ca.d_(s),
    await (async function (e, t) {
      const n = Eo(e);
      try {
        await n.persistence.runTransaction('notifyLocalViewChanges', 'readwrite', e =>
          Jo.forEach(t, t =>
            Jo.forEach(t.$i, r => n.persistence.referenceDelegate.addReference(e, t.targetId, r)).next(() =>
              Jo.forEach(t.Ui, r => n.persistence.referenceDelegate.removeReference(e, t.targetId, r))
            )
          )
        );
      } catch (e) {
        if (!Yo(e)) throw e;
        yo('LocalStore', 'Failed to update sequence numbers: ' + e);
      }
      for (const e of t) {
        const t = e.targetId;
        if (!e.fromCache) {
          const e = n.os.get(t),
            r = e.snapshotVersion,
            s = e.withLastLimboFreeSnapshotVersion(r);
          n.os = n.os.insert(t, s);
        }
      }
    })(r.localStore, i));
}
async function Rd(e, t) {
  const n = Eo(e);
  if (!n.currentUser.isEqual(t)) {
    yo('SyncEngine', 'User change. New user:', t.toKey());
    const e = await Gh(n.localStore, t);
    (n.currentUser = t),
      (function (e, t) {
        e.ka.forEach(e => {
          e.forEach(e => {
            e.reject(new So(Io.CANCELLED, t));
          });
        }),
          e.ka.clear();
      })(n, "'waitForPendingWrites' promise is rejected due to a user change."),
      n.sharedClientState.handleUserChange(t, e.removedBatchIds, e.addedBatchIds),
      await Nd(n, e.hs);
  }
}
function Dd(e, t) {
  const n = Eo(e),
    r = n.Na.get(t);
  if (r && r.va) return Fc().add(r.key);
  {
    let e = Fc();
    const r = n.Ma.get(t);
    if (!r) return e;
    for (const t of r) {
      const r = n.Fa.get(t);
      e = e.unionWith(r.view.Va);
    }
    return e;
  }
}
function Od(e) {
  const t = Eo(e);
  return (
    (t.remoteStore.remoteSyncer.applyRemoteEvent = yd.bind(null, t)),
    (t.remoteStore.remoteSyncer.getRemoteKeysForTarget = Dd.bind(null, t)),
    (t.remoteStore.remoteSyncer.rejectListen = wd.bind(null, t)),
    (t.Ca.d_ = Zl.bind(null, t.eventManager)),
    (t.Ca.$a = ed.bind(null, t.eventManager)),
    t
  );
}
class Pd {
  constructor() {
    (this.kind = 'memory'), (this.synchronizeTabs = !1);
  }
  async initialize(e) {
    (this.serializer = ul(e.databaseInfo.databaseId)),
      (this.sharedClientState = this.Wa(e)),
      (this.persistence = this.Ga(e)),
      await this.persistence.start(),
      (this.localStore = this.za(e)),
      (this.gcScheduler = this.ja(e, this.localStore)),
      (this.indexBackfillerScheduler = this.Ha(e, this.localStore));
  }
  ja(e, t) {
    return null;
  }
  Ha(e, t) {
    return null;
  }
  za(e) {
    return (function (e, t, n, r) {
      return new Hh(e, t, n, r);
    })(this.persistence, new zh(), e.initialUser, this.serializer);
  }
  Ga(e) {
    return new Fh(jh.Zr, this.serializer);
  }
  Wa(e) {
    return new Zh();
  }
  async terminate() {
    var e, t;
    null === (e = this.gcScheduler) || void 0 === e || e.stop(),
      null === (t = this.indexBackfillerScheduler) || void 0 === t || t.stop(),
      this.sharedClientState.shutdown(),
      await this.persistence.shutdown();
  }
}
Pd.provider = { build: () => new Pd() };
class xd extends Pd {
  constructor(e) {
    super(), (this.cacheSizeBytes = e);
  }
  ja(e, t) {
    To(this.persistence.referenceDelegate instanceof Bh);
    const n = this.persistence.referenceDelegate.garbageCollector;
    return new Ih(n, e.asyncQueue, t);
  }
  Ga(e) {
    const t = void 0 !== this.cacheSizeBytes ? _h.withCacheSize(this.cacheSizeBytes) : _h.DEFAULT;
    return new Fh(e => Bh.Zr(e, t), this.serializer);
  }
}
class Ld {
  async initialize(e, t) {
    this.localStore ||
      ((this.localStore = e.localStore),
      (this.sharedClientState = e.sharedClientState),
      (this.datastore = this.createDatastore(t)),
      (this.remoteStore = this.createRemoteStore(t)),
      (this.eventManager = this.createEventManager(t)),
      (this.syncEngine = this.createSyncEngine(t, !e.synchronizeTabs)),
      (this.sharedClientState.onlineStateHandler = e => vd(this.syncEngine, e, 1)),
      (this.remoteStore.remoteSyncer.handleCredentialChange = Rd.bind(null, this.syncEngine)),
      await (async function (e, t) {
        const n = Eo(e);
        t ? (n.L_.delete(2), await yl(n)) : t || (n.L_.add(2), await vl(n), n.q_.set('Unknown'));
      })(this.remoteStore, this.syncEngine.isPrimaryClient));
  }
  createEventManager(e) {
    return new Jl();
  }
  createDatastore(e) {
    const t = ul(e.databaseInfo.databaseId),
      n = (function (e) {
        return new al(e);
      })(e.databaseInfo);
    return (function (e, t, n, r) {
      return new pl(e, t, n, r);
    })(e.authCredentials, e.appCheckCredentials, n, t);
  }
  createRemoteStore(e) {
    return (function (e, t, n, r, s) {
      return new ml(e, t, n, r, s);
    })(this.localStore, this.datastore, e.asyncQueue, e => vd(this.syncEngine, e, 0), tl.D() ? new tl() : new el());
  }
  createSyncEngine(e, t) {
    return (function (e, t, n, r, s, i, o) {
      const a = new hd(e, t, n, r, s, i);
      return o && (a.Qa = !0), a;
    })(this.localStore, this.remoteStore, this.eventManager, this.sharedClientState, e.initialUser, e.maxConcurrentLimboResolutions, t);
  }
  async terminate() {
    var e, t;
    await (async function (e) {
      const t = Eo(e);
      yo('RemoteStore', 'RemoteStore shutting down.'), t.L_.add(5), await vl(t), t.k_.shutdown(), t.q_.set('Unknown');
    })(this.remoteStore),
      null === (e = this.datastore) || void 0 === e || e.terminate(),
      null === (t = this.eventManager) || void 0 === t || t.terminate();
  }
}
Ld.provider = { build: () => new Ld() };
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Md {
  constructor(e) {
    (this.observer = e), (this.muted = !1);
  }
  next(e) {
    this.muted || (this.observer.next && this.Ya(this.observer.next, e));
  }
  error(e) {
    this.muted || (this.observer.error ? this.Ya(this.observer.error, e) : vo('Uncaught Error in snapshot listener:', e.toString()));
  }
  Za() {
    this.muted = !0;
  }
  Ya(e, t) {
    setTimeout(() => {
      this.muted || e(t);
    }, 0);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Ud {
  constructor(e, t, n, r, s) {
    (this.authCredentials = e),
      (this.appCheckCredentials = t),
      (this.asyncQueue = n),
      (this.databaseInfo = r),
      (this.user = fo.UNAUTHENTICATED),
      (this.clientId = Mo.newId()),
      (this.authCredentialListener = () => Promise.resolve()),
      (this.appCheckCredentialListener = () => Promise.resolve()),
      (this._uninitializedComponentsProvider = s),
      this.authCredentials.start(n, async e => {
        yo('FirestoreClient', 'Received user=', e.uid), await this.authCredentialListener(e), (this.user = e);
      }),
      this.appCheckCredentials.start(
        n,
        e => (yo('FirestoreClient', 'Received new app check token=', e), this.appCheckCredentialListener(e, this.user))
      );
  }
  get configuration() {
    return {
      asyncQueue: this.asyncQueue,
      databaseInfo: this.databaseInfo,
      clientId: this.clientId,
      authCredentials: this.authCredentials,
      appCheckCredentials: this.appCheckCredentials,
      initialUser: this.user,
      maxConcurrentLimboResolutions: 100,
    };
  }
  setCredentialChangeListener(e) {
    this.authCredentialListener = e;
  }
  setAppCheckTokenChangeListener(e) {
    this.appCheckCredentialListener = e;
  }
  terminate() {
    this.asyncQueue.enterRestrictedMode();
    const e = new Co();
    return (
      this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async () => {
        try {
          this._onlineComponents && (await this._onlineComponents.terminate()),
            this._offlineComponents && (await this._offlineComponents.terminate()),
            this.authCredentials.shutdown(),
            this.appCheckCredentials.shutdown(),
            e.resolve();
        } catch (t) {
          const n = Gl(t, 'Failed to shutdown persistence');
          e.reject(n);
        }
      }),
      e.promise
    );
  }
}
async function Fd(e, t) {
  e.asyncQueue.verifyOperationInProgress(), yo('FirestoreClient', 'Initializing OfflineComponentProvider');
  const n = e.configuration;
  await t.initialize(n);
  let r = n.initialUser;
  e.setCredentialChangeListener(async e => {
    r.isEqual(e) || (await Gh(t.localStore, e), (r = e));
  }),
    t.persistence.setDatabaseDeletedListener(() => e.terminate()),
    (e._offlineComponents = t);
}
async function Vd(e, t) {
  e.asyncQueue.verifyOperationInProgress();
  const n = await (async function (e) {
    if (!e._offlineComponents)
      if (e._uninitializedComponentsProvider) {
        yo('FirestoreClient', 'Using user provided OfflineComponentProvider');
        try {
          await Fd(e, e._uninitializedComponentsProvider._offline);
        } catch (t) {
          const n = t;
          if (
            !(function (e) {
              return 'FirebaseError' === e.name
                ? e.code === Io.FAILED_PRECONDITION || e.code === Io.UNIMPLEMENTED
                : !('undefined' != typeof DOMException && e instanceof DOMException) || 22 === e.code || 20 === e.code || 11 === e.code;
            })(n)
          )
            throw n;
          wo('Error using user provided cache. Falling back to memory cache: ' + n), await Fd(e, new Pd());
        }
      } else yo('FirestoreClient', 'Using default OfflineComponentProvider'), await Fd(e, new xd(void 0));
    return e._offlineComponents;
  })(e);
  yo('FirestoreClient', 'Initializing OnlineComponentProvider'),
    await t.initialize(n, e.configuration),
    e.setCredentialChangeListener(e => $l(t.remoteStore, e)),
    e.setAppCheckTokenChangeListener((e, n) => $l(t.remoteStore, n)),
    (e._onlineComponents = t);
}
async function jd(e) {
  return (
    e._onlineComponents ||
      (e._uninitializedComponentsProvider
        ? (yo('FirestoreClient', 'Using user provided OnlineComponentProvider'), await Vd(e, e._uninitializedComponentsProvider._online))
        : (yo('FirestoreClient', 'Using default OnlineComponentProvider'), await Vd(e, new Ld()))),
    e._onlineComponents
  );
}
async function Bd(e) {
  const t = await jd(e),
    n = t.eventManager;
  return (
    (n.onListen = ld.bind(null, t.syncEngine)),
    (n.onUnlisten = pd.bind(null, t.syncEngine)),
    (n.onFirstRemoteStoreListen = dd.bind(null, t.syncEngine)),
    (n.onLastRemoteStoreUnlisten = gd.bind(null, t.syncEngine)),
    n
  );
}
function $d(e, t, n = {}) {
  const r = new Co();
  return (
    e.asyncQueue.enqueueAndForget(async () =>
      (function (e, t, n, r, s) {
        const i = new Md({
            next: n => {
              i.Za(),
                t.enqueueAndForget(() =>
                  (async function (e, t) {
                    const n = Eo(e),
                      r = t.query;
                    let s = 3;
                    const i = n.queries.get(r);
                    if (i) {
                      const e = i.j_.indexOf(t);
                      e >= 0 && (i.j_.splice(e, 1), 0 === i.j_.length ? (s = t.J_() ? 0 : 1) : !i.H_() && t.J_() && (s = 2));
                    }
                    switch (s) {
                      case 0:
                        return n.queries.delete(r), n.onUnlisten(r, !0);
                      case 1:
                        return n.queries.delete(r), n.onUnlisten(r, !1);
                      case 2:
                        return n.onLastRemoteStoreUnlisten(r);
                      default:
                        return;
                    }
                  })(e, o)
                ),
                n.fromCache && 'server' === r.source
                  ? s.reject(
                      new So(
                        Io.UNAVAILABLE,
                        'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)'
                      )
                    )
                  : s.resolve(n);
            },
            error: e => s.reject(e),
          }),
          o = new sd(n, i, { includeMetadataChanges: !0, _a: !0 });
        return (async function (e, t) {
          const n = Eo(e);
          let r = 3;
          const s = t.query;
          let i = n.queries.get(s);
          i ? !i.H_() && t.J_() && (r = 2) : ((i = new Xl()), (r = t.J_() ? 0 : 1));
          try {
            switch (r) {
              case 0:
                i.z_ = await n.onListen(s, !0);
                break;
              case 1:
                i.z_ = await n.onListen(s, !1);
                break;
              case 2:
                await n.onFirstRemoteStoreListen(s);
            }
          } catch (e) {
            const n = Gl(e, `Initialization of query '${Ec(t.query)}' failed`);
            return void t.onError(n);
          }
          n.queries.set(s, i), i.j_.push(t), t.Z_(n.onlineState), i.z_ && t.X_(i.z_) && td(n);
        })(e, o);
      })(await Bd(e), e.asyncQueue, t, n, r)
    ),
    r.promise
  );
  /**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
}
function qd(e) {
  const t = {};
  return void 0 !== e.timeoutSeconds && (t.timeoutSeconds = e.timeoutSeconds), t;
  /**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
}
const zd = new Map();
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Hd(e, t, n) {
  if (!n) throw new So(Io.INVALID_ARGUMENT, `Function ${e}() cannot be called with an empty ${t}.`);
}
function Gd(e) {
  if (!Ho.isDocumentKey(e))
    throw new So(
      Io.INVALID_ARGUMENT,
      `Invalid document reference. Document references must have an even number of segments, but ${e} has ${e.length}.`
    );
}
function Kd(e) {
  if (Ho.isDocumentKey(e))
    throw new So(
      Io.INVALID_ARGUMENT,
      `Invalid collection reference. Collection references must have an odd number of segments, but ${e} has ${e.length}.`
    );
}
function Wd(e) {
  if (void 0 === e) return 'undefined';
  if (null === e) return 'null';
  if ('string' == typeof e) return e.length > 20 && (e = `${e.substring(0, 20)}...`), JSON.stringify(e);
  if ('number' == typeof e || 'boolean' == typeof e) return '' + e;
  if ('object' == typeof e) {
    if (e instanceof Array) return 'an array';
    {
      const t = (function (e) {
        return e.constructor ? e.constructor.name : null;
      })(e);
      return t ? `a custom ${t} object` : 'an object';
    }
  }
  return 'function' == typeof e ? 'a function' : bo();
}
function Qd(e, t) {
  if (('_delegate' in e && (e = e._delegate), !(e instanceof t))) {
    if (t.name === e.constructor.name)
      throw new So(
        Io.INVALID_ARGUMENT,
        'Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?'
      );
    {
      const n = Wd(e);
      throw new So(Io.INVALID_ARGUMENT, `Expected type '${t.name}', but it was: ${n}`);
    }
  }
  return e;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Xd {
  constructor(e) {
    var t, n;
    if (void 0 === e.host) {
      if (void 0 !== e.ssl) throw new So(Io.INVALID_ARGUMENT, "Can't provide ssl option if host option is not set");
      (this.host = 'firestore.googleapis.com'), (this.ssl = !0);
    } else (this.host = e.host), (this.ssl = null === (t = e.ssl) || void 0 === t || t);
    if (
      ((this.credentials = e.credentials),
      (this.ignoreUndefinedProperties = !!e.ignoreUndefinedProperties),
      (this.localCache = e.localCache),
      void 0 === e.cacheSizeBytes)
    )
      this.cacheSizeBytes = 41943040;
    else {
      if (-1 !== e.cacheSizeBytes && e.cacheSizeBytes < 1048576)
        throw new So(Io.INVALID_ARGUMENT, 'cacheSizeBytes must be at least 1048576');
      this.cacheSizeBytes = e.cacheSizeBytes;
    }
    (function (e, t, n, r) {
      if (!0 === t && !0 === r) throw new So(Io.INVALID_ARGUMENT, `${e} and ${n} cannot be used together.`);
    })(
      'experimentalForceLongPolling',
      e.experimentalForceLongPolling,
      'experimentalAutoDetectLongPolling',
      e.experimentalAutoDetectLongPolling
    ),
      (this.experimentalForceLongPolling = !!e.experimentalForceLongPolling),
      this.experimentalForceLongPolling
        ? (this.experimentalAutoDetectLongPolling = !1)
        : void 0 === e.experimentalAutoDetectLongPolling
        ? (this.experimentalAutoDetectLongPolling = !0)
        : (this.experimentalAutoDetectLongPolling = !!e.experimentalAutoDetectLongPolling),
      (this.experimentalLongPollingOptions = qd(null !== (n = e.experimentalLongPollingOptions) && void 0 !== n ? n : {})),
      (function (e) {
        if (void 0 !== e.timeoutSeconds) {
          if (isNaN(e.timeoutSeconds))
            throw new So(Io.INVALID_ARGUMENT, `invalid long polling timeout: ${e.timeoutSeconds} (must not be NaN)`);
          if (e.timeoutSeconds < 5)
            throw new So(Io.INVALID_ARGUMENT, `invalid long polling timeout: ${e.timeoutSeconds} (minimum allowed value is 5)`);
          if (e.timeoutSeconds > 30)
            throw new So(Io.INVALID_ARGUMENT, `invalid long polling timeout: ${e.timeoutSeconds} (maximum allowed value is 30)`);
        }
      })(
        /**
         * @license
         * Copyright 2020 Google LLC
         *
         * Licensed under the Apache License, Version 2.0 (the "License");
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         *   http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */ this.experimentalLongPollingOptions
      ),
      (this.useFetchStreams = !!e.useFetchStreams);
  }
  isEqual(e) {
    return (
      this.host === e.host &&
      this.ssl === e.ssl &&
      this.credentials === e.credentials &&
      this.cacheSizeBytes === e.cacheSizeBytes &&
      this.experimentalForceLongPolling === e.experimentalForceLongPolling &&
      this.experimentalAutoDetectLongPolling === e.experimentalAutoDetectLongPolling &&
      (function (e, t) {
        return e.timeoutSeconds === t.timeoutSeconds;
      })(this.experimentalLongPollingOptions, e.experimentalLongPollingOptions) &&
      this.ignoreUndefinedProperties === e.ignoreUndefinedProperties &&
      this.useFetchStreams === e.useFetchStreams
    );
  }
}
class Jd {
  constructor(e, t, n, r) {
    (this._authCredentials = e),
      (this._appCheckCredentials = t),
      (this._databaseId = n),
      (this._app = r),
      (this.type = 'firestore-lite'),
      (this._persistenceKey = '(lite)'),
      (this._settings = new Xd({})),
      (this._settingsFrozen = !1),
      (this._terminateTask = 'notTerminated');
  }
  get app() {
    if (!this._app) throw new So(Io.FAILED_PRECONDITION, "Firestore was not initialized using the Firebase SDK. 'app' is not available");
    return this._app;
  }
  get _initialized() {
    return this._settingsFrozen;
  }
  get _terminated() {
    return 'notTerminated' !== this._terminateTask;
  }
  _setSettings(e) {
    if (this._settingsFrozen)
      throw new So(
        Io.FAILED_PRECONDITION,
        'Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.'
      );
    (this._settings = new Xd(e)),
      void 0 !== e.credentials &&
        (this._authCredentials = (function (e) {
          if (!e) return new Ao();
          switch (e.type) {
            case 'firstParty':
              return new Oo(e.sessionIndex || '0', e.iamToken || null, e.authTokenFactory || null);
            case 'provider':
              return e.client;
            default:
              throw new So(Io.INVALID_ARGUMENT, 'makeAuthCredentialsProvider failed due to invalid credential type');
          }
        })(e.credentials));
  }
  _getSettings() {
    return this._settings;
  }
  _freezeSettings() {
    return (this._settingsFrozen = !0), this._settings;
  }
  _delete() {
    return 'notTerminated' === this._terminateTask && (this._terminateTask = this._terminate()), this._terminateTask;
  }
  async _restart() {
    'notTerminated' === this._terminateTask ? await this._terminate() : (this._terminateTask = 'notTerminated');
  }
  toJSON() {
    return { app: this._app, databaseId: this._databaseId, settings: this._settings };
  }
  _terminate() {
    return (
      (function (e) {
        const t = zd.get(e);
        t && (yo('ComponentProvider', 'Removing Datastore'), zd.delete(e), t.terminate());
      })(this),
      Promise.resolve()
    );
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Yd {
  constructor(e, t, n) {
    (this.converter = t), (this._query = n), (this.type = 'query'), (this.firestore = e);
  }
  withConverter(e) {
    return new Yd(this.firestore, e, this._query);
  }
}
class Zd {
  constructor(e, t, n) {
    (this.converter = t), (this._key = n), (this.type = 'document'), (this.firestore = e);
  }
  get _path() {
    return this._key.path;
  }
  get id() {
    return this._key.path.lastSegment();
  }
  get path() {
    return this._key.path.canonicalString();
  }
  get parent() {
    return new ef(this.firestore, this.converter, this._key.path.popLast());
  }
  withConverter(e) {
    return new Zd(this.firestore, e, this._key);
  }
}
class ef extends Yd {
  constructor(e, t, n) {
    super(e, t, mc(n)), (this._path = n), (this.type = 'collection');
  }
  get id() {
    return this._query.path.lastSegment();
  }
  get path() {
    return this._query.path.canonicalString();
  }
  get parent() {
    const e = this._path.popLast();
    return e.isEmpty() ? null : new Zd(this.firestore, null, new Ho(e));
  }
  withConverter(e) {
    return new ef(this.firestore, e, this._path);
  }
}
function tf(e, t, ...n) {
  if (((e = le(e)), Hd('collection', 'path', t), e instanceof Jd)) {
    const r = $o.fromString(t, ...n);
    return Kd(r), new ef(e, null, r);
  }
  {
    if (!(e instanceof Zd || e instanceof ef))
      throw new So(
        Io.INVALID_ARGUMENT,
        'Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore'
      );
    const r = e._path.child($o.fromString(t, ...n));
    return Kd(r), new ef(e.firestore, null, r);
  }
}
function nf(e, t, ...n) {
  if (((e = le(e)), 1 === arguments.length && (t = Mo.newId()), Hd('doc', 'path', t), e instanceof Jd)) {
    const r = $o.fromString(t, ...n);
    return Gd(r), new Zd(e, null, new Ho(r));
  }
  {
    if (!(e instanceof Zd || e instanceof ef))
      throw new So(
        Io.INVALID_ARGUMENT,
        'Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore'
      );
    const r = e._path.child($o.fromString(t, ...n));
    return Gd(r), new Zd(e.firestore, e instanceof ef ? e.converter : null, new Ho(r));
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class rf {
  constructor(e = Promise.resolve()) {
    (this.Pu = []),
      (this.Iu = !1),
      (this.Tu = []),
      (this.Eu = null),
      (this.du = !1),
      (this.Au = !1),
      (this.Ru = []),
      (this.t_ = new hl(this, 'async_queue_retry')),
      (this.Vu = () => {
        const e = cl();
        e && yo('AsyncQueue', 'Visibility state changed to ' + e.visibilityState), this.t_.jo();
      }),
      (this.mu = e);
    const t = cl();
    t && 'function' == typeof t.addEventListener && t.addEventListener('visibilitychange', this.Vu);
  }
  get isShuttingDown() {
    return this.Iu;
  }
  enqueueAndForget(e) {
    this.enqueue(e);
  }
  enqueueAndForgetEvenWhileRestricted(e) {
    this.fu(), this.gu(e);
  }
  enterRestrictedMode(e) {
    if (!this.Iu) {
      (this.Iu = !0), (this.Au = e || !1);
      const t = cl();
      t && 'function' == typeof t.removeEventListener && t.removeEventListener('visibilitychange', this.Vu);
    }
  }
  enqueue(e) {
    if ((this.fu(), this.Iu)) return new Promise(() => {});
    const t = new Co();
    return this.gu(() => (this.Iu && this.Au ? Promise.resolve() : (e().then(t.resolve, t.reject), t.promise))).then(() => t.promise);
  }
  enqueueRetryable(e) {
    this.enqueueAndForget(() => (this.Pu.push(e), this.pu()));
  }
  async pu() {
    if (0 !== this.Pu.length) {
      try {
        await this.Pu[0](), this.Pu.shift(), this.t_.reset();
      } catch (e) {
        if (!Yo(e)) throw e;
        yo('AsyncQueue', 'Operation failed with retryable error: ' + e);
      }
      this.Pu.length > 0 && this.t_.Go(() => this.pu());
    }
  }
  gu(e) {
    const t = this.mu.then(
      () => (
        (this.du = !0),
        e()
          .catch(e => {
            (this.Eu = e), (this.du = !1);
            const t = (function (e) {
              let t = e.message || '';
              return e.stack && (t = e.stack.includes(e.message) ? e.stack : e.message + '\n' + e.stack), t;
            })(
              /**
               * @license
               * Copyright 2017 Google LLC
               *
               * Licensed under the Apache License, Version 2.0 (the "License");
               * you may not use this file except in compliance with the License.
               * You may obtain a copy of the License at
               *
               *   http://www.apache.org/licenses/LICENSE-2.0
               *
               * Unless required by applicable law or agreed to in writing, software
               * distributed under the License is distributed on an "AS IS" BASIS,
               * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
               * See the License for the specific language governing permissions and
               * limitations under the License.
               */ e
            );
            throw (vo('INTERNAL UNHANDLED ERROR: ', t), e);
          })
          .then(e => ((this.du = !1), e))
      )
    );
    return (this.mu = t), t;
  }
  enqueueAfterDelay(e, t, n) {
    this.fu(), this.Ru.indexOf(e) > -1 && (t = 0);
    const r = Hl.createAndSchedule(this, e, t, n, e => this.yu(e));
    return this.Tu.push(r), r;
  }
  fu() {
    this.Eu && bo();
  }
  verifyOperationInProgress() {}
  async wu() {
    let e;
    do {
      (e = this.mu), await e;
    } while (e !== this.mu);
  }
  Su(e) {
    for (const t of this.Tu) if (t.timerId === e) return !0;
    return !1;
  }
  bu(e) {
    return this.wu().then(() => {
      this.Tu.sort((e, t) => e.targetTimeMs - t.targetTimeMs);
      for (const t of this.Tu) if ((t.skipDelay(), 'all' !== e && t.timerId === e)) break;
      return this.wu();
    });
  }
  Du(e) {
    this.Ru.push(e);
  }
  yu(e) {
    const t = this.Tu.indexOf(e);
    this.Tu.splice(t, 1);
  }
}
class sf extends Jd {
  constructor(e, t, n, r) {
    super(e, t, n, r),
      (this.type = 'firestore'),
      (this._queue = new rf()),
      (this._persistenceKey = (null == r ? void 0 : r.name) || '[DEFAULT]');
  }
  async _terminate() {
    if (this._firestoreClient) {
      const e = this._firestoreClient.terminate();
      (this._queue = new rf(e)), (this._firestoreClient = void 0), await e;
    }
  }
}
function of(e) {
  if (e._terminated) throw new So(Io.FAILED_PRECONDITION, 'The client has already been terminated.');
  return (
    e._firestoreClient ||
      (function (e) {
        var t, n, r;
        const s = e._freezeSettings(),
          i = (function (e, t, n, r) {
            return new Ta(
              e,
              t,
              n,
              r.host,
              r.ssl,
              r.experimentalForceLongPolling,
              r.experimentalAutoDetectLongPolling,
              qd(r.experimentalLongPollingOptions),
              r.useFetchStreams
            );
          })(e._databaseId, (null === (t = e._app) || void 0 === t ? void 0 : t.options.appId) || '', e._persistenceKey, s);
        e._componentsProvider ||
          ((null === (n = s.localCache) || void 0 === n ? void 0 : n._offlineComponentProvider) &&
            (null === (r = s.localCache) || void 0 === r ? void 0 : r._onlineComponentProvider) &&
            (e._componentsProvider = { _offline: s.localCache._offlineComponentProvider, _online: s.localCache._onlineComponentProvider })),
          (e._firestoreClient = new Ud(
            e._authCredentials,
            e._appCheckCredentials,
            e._queue,
            i,
            e._componentsProvider &&
              (function (e) {
                const t = null == e ? void 0 : e._online.build();
                return { _offline: null == e ? void 0 : e._offline.build(t), _online: t };
              })(e._componentsProvider)
          ));
      })(
        /**
         * @license
         * Copyright 2020 Google LLC
         *
         * Licensed under the Apache License, Version 2.0 (the "License");
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         *   http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */ e
      ),
    e._firestoreClient
  );
}
class af {
  constructor(e) {
    this._byteString = e;
  }
  static fromBase64String(e) {
    try {
      return new af(pa.fromBase64String(e));
    } catch (e) {
      throw new So(Io.INVALID_ARGUMENT, 'Failed to construct data from Base64 string: ' + e);
    }
  }
  static fromUint8Array(e) {
    return new af(pa.fromUint8Array(e));
  }
  toBase64() {
    return this._byteString.toBase64();
  }
  toUint8Array() {
    return this._byteString.toUint8Array();
  }
  toString() {
    return 'Bytes(base64: ' + this.toBase64() + ')';
  }
  isEqual(e) {
    return this._byteString.isEqual(e._byteString);
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class cf {
  constructor(...e) {
    for (let t = 0; t < e.length; ++t)
      if (0 === e[t].length) throw new So(Io.INVALID_ARGUMENT, 'Invalid field name at argument $(i + 1). Field names must not be empty.');
    this._internalPath = new zo(e);
  }
  isEqual(e) {
    return this._internalPath.isEqual(e._internalPath);
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class uf {
  constructor(e) {
    this._methodName = e;
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class hf {
  constructor(e, t) {
    if (!isFinite(e) || e < -90 || e > 90) throw new So(Io.INVALID_ARGUMENT, 'Latitude must be a number between -90 and 90, but was: ' + e);
    if (!isFinite(t) || t < -180 || t > 180)
      throw new So(Io.INVALID_ARGUMENT, 'Longitude must be a number between -180 and 180, but was: ' + t);
    (this._lat = e), (this._long = t);
  }
  get latitude() {
    return this._lat;
  }
  get longitude() {
    return this._long;
  }
  isEqual(e) {
    return this._lat === e._lat && this._long === e._long;
  }
  toJSON() {
    return { latitude: this._lat, longitude: this._long };
  }
  _compareTo(e) {
    return Uo(this._lat, e._lat) || Uo(this._long, e._long);
  }
}
/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class lf {
  constructor(e) {
    this._values = (e || []).map(e => e);
  }
  toArray() {
    return this._values.map(e => e);
  }
  isEqual(e) {
    return (function (e, t) {
      if (e.length !== t.length) return !1;
      for (let n = 0; n < e.length; ++n) if (e[n] !== t[n]) return !1;
      return !0;
    })(this._values, e._values);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const df = /^__.*__$/;
class ff {
  constructor(e, t, n) {
    (this.data = e), (this.fieldMask = t), (this.fieldTransforms = n);
  }
  toMutation(e, t) {
    return null !== this.fieldMask
      ? new lu(e, this.data, this.fieldMask, t, this.fieldTransforms)
      : new hu(e, this.data, t, this.fieldTransforms);
  }
}
class pf {
  constructor(e, t, n) {
    (this.data = e), (this.fieldMask = t), (this.fieldTransforms = n);
  }
  toMutation(e, t) {
    return new lu(e, this.data, this.fieldMask, t, this.fieldTransforms);
  }
}
function gf(e) {
  switch (e) {
    case 0:
    case 2:
    case 1:
      return !0;
    case 3:
    case 4:
      return !1;
    default:
      throw bo();
  }
}
class mf {
  constructor(e, t, n, r, s, i) {
    (this.settings = e),
      (this.databaseId = t),
      (this.serializer = n),
      (this.ignoreUndefinedProperties = r),
      void 0 === s && this.vu(),
      (this.fieldTransforms = s || []),
      (this.fieldMask = i || []);
  }
  get path() {
    return this.settings.path;
  }
  get Cu() {
    return this.settings.Cu;
  }
  Fu(e) {
    return new mf(
      Object.assign(Object.assign({}, this.settings), e),
      this.databaseId,
      this.serializer,
      this.ignoreUndefinedProperties,
      this.fieldTransforms,
      this.fieldMask
    );
  }
  Mu(e) {
    var t;
    const n = null === (t = this.path) || void 0 === t ? void 0 : t.child(e),
      r = this.Fu({ path: n, xu: !1 });
    return r.Ou(e), r;
  }
  Nu(e) {
    var t;
    const n = null === (t = this.path) || void 0 === t ? void 0 : t.child(e),
      r = this.Fu({ path: n, xu: !1 });
    return r.vu(), r;
  }
  Lu(e) {
    return this.Fu({ path: void 0, xu: !0 });
  }
  Bu(e) {
    return Af(e, this.settings.methodName, this.settings.ku || !1, this.path, this.settings.qu);
  }
  contains(e) {
    return void 0 !== this.fieldMask.find(t => e.isPrefixOf(t)) || void 0 !== this.fieldTransforms.find(t => e.isPrefixOf(t.field));
  }
  vu() {
    if (this.path) for (let e = 0; e < this.path.length; e++) this.Ou(this.path.get(e));
  }
  Ou(e) {
    if (0 === e.length) throw this.Bu('Document fields must not be empty');
    if (gf(this.Cu) && df.test(e)) throw this.Bu('Document fields cannot begin and end with "__"');
  }
}
class yf {
  constructor(e, t, n) {
    (this.databaseId = e), (this.ignoreUndefinedProperties = t), (this.serializer = n || ul(e));
  }
  Qu(e, t, n, r = !1) {
    return new mf(
      { Cu: e, methodName: t, qu: n, path: zo.emptyPath(), xu: !1, ku: r },
      this.databaseId,
      this.serializer,
      this.ignoreUndefinedProperties
    );
  }
}
function vf(e) {
  const t = e._freezeSettings(),
    n = ul(e._databaseId);
  return new yf(e._databaseId, !!t.ignoreUndefinedProperties, n);
}
function wf(e, t, n, r, s, i = {}) {
  const o = e.Qu(i.merge || i.mergeFields ? 2 : 0, t, n, s);
  If('Data must be an object, but it was:', o, r);
  const a = Tf(r, o);
  let c, u;
  if (i.merge) (c = new da(o.fieldMask)), (u = o.fieldTransforms);
  else if (i.mergeFields) {
    const e = [];
    for (const r of i.mergeFields) {
      const s = Sf(t, r, n);
      if (!o.contains(s))
        throw new So(Io.INVALID_ARGUMENT, `Field '${s}' is specified in your field mask but missing from your input data.`);
      Nf(e, s) || e.push(s);
    }
    (c = new da(e)), (u = o.fieldTransforms.filter(e => c.covers(e.field)));
  } else (c = null), (u = o.fieldTransforms);
  return new ff(new ja(a), c, u);
}
class _f extends uf {
  _toFieldTransform(e) {
    if (2 !== e.Cu)
      throw 1 === e.Cu
        ? e.Bu(`${this._methodName}() can only appear at the top level of your update data`)
        : e.Bu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);
    return e.fieldMask.push(e.path), null;
  }
  isEqual(e) {
    return e instanceof _f;
  }
}
function bf(e, t) {
  if (Ef((e = le(e)))) return If('Unsupported field value:', t, e), Tf(e, t);
  if (e instanceof uf)
    return (
      (function (e, t) {
        if (!gf(t.Cu)) throw t.Bu(`${e._methodName}() can only be used with update() and set()`);
        if (!t.path) throw t.Bu(`${e._methodName}() is not currently supported inside arrays`);
        const n = e._toFieldTransform(t);
        n && t.fieldTransforms.push(n);
      })(e, t),
      null
    );
  if (void 0 === e && t.ignoreUndefinedProperties) return null;
  if ((t.path && t.fieldMask.push(t.path), e instanceof Array)) {
    if (t.settings.xu && 4 !== t.Cu) throw t.Bu('Nested arrays are not supported');
    return (function (e, t) {
      const n = [];
      let r = 0;
      for (const s of e) {
        let e = bf(s, t.Lu(r));
        null == e && (e = { nullValue: 'NULL_VALUE' }), n.push(e), r++;
      }
      return { arrayValue: { values: n } };
    })(e, t);
  }
  return (function (e, t) {
    if (null === (e = le(e))) return { nullValue: 'NULL_VALUE' };
    if ('number' == typeof e) return $c(t.serializer, e);
    if ('boolean' == typeof e) return { booleanValue: e };
    if ('string' == typeof e) return { stringValue: e };
    if (e instanceof Date) {
      const n = Vo.fromDate(e);
      return { timestampValue: qu(t.serializer, n) };
    }
    if (e instanceof Vo) {
      const n = new Vo(e.seconds, 1e3 * Math.floor(e.nanoseconds / 1e3));
      return { timestampValue: qu(t.serializer, n) };
    }
    if (e instanceof hf) return { geoPointValue: { latitude: e.latitude, longitude: e.longitude } };
    if (e instanceof af) return { bytesValue: zu(t.serializer, e._byteString) };
    if (e instanceof Zd) {
      const n = t.databaseId,
        r = e.firestore._databaseId;
      if (!r.isEqual(n))
        throw t.Bu(
          `Document reference is for database ${r.projectId}/${r.database} but should be for database ${n.projectId}/${n.database}`
        );
      return { referenceValue: Ku(e.firestore._databaseId || t.databaseId, e._key.path) };
    }
    if (e instanceof lf)
      return (function (e, t) {
        return {
          mapValue: {
            fields: {
              __type__: { stringValue: '__vector__' },
              value: {
                arrayValue: {
                  values: e.toArray().map(e => {
                    if ('number' != typeof e) throw t.Bu('VectorValues must only contain numeric values.');
                    return jc(t.serializer, e);
                  }),
                },
              },
            },
          },
        };
      })(e, t);
    throw t.Bu(`Unsupported field value: ${Wd(e)}`);
  })(e, t);
}
function Tf(e, t) {
  const n = {};
  return (
    oa(e)
      ? t.path && t.path.length > 0 && t.fieldMask.push(t.path)
      : ia(e, (e, r) => {
          const s = bf(r, t.Mu(e));
          null != s && (n[e] = s);
        }),
    { mapValue: { fields: n } }
  );
}
function Ef(e) {
  return !(
    'object' != typeof e ||
    null === e ||
    e instanceof Array ||
    e instanceof Date ||
    e instanceof Vo ||
    e instanceof hf ||
    e instanceof af ||
    e instanceof Zd ||
    e instanceof uf ||
    e instanceof lf
  );
}
function If(e, t, n) {
  if (
    !Ef(n) ||
    !(function (e) {
      return 'object' == typeof e && null !== e && (Object.getPrototypeOf(e) === Object.prototype || null === Object.getPrototypeOf(e));
    })(n)
  ) {
    const r = Wd(n);
    throw 'an object' === r ? t.Bu(e + ' a custom object') : t.Bu(e + ' ' + r);
  }
}
function Sf(e, t, n) {
  if ((t = le(t)) instanceof cf) return t._internalPath;
  if ('string' == typeof t) return kf(e, t);
  throw Af('Field path arguments must be of type string or ', e, !1, void 0, n);
}
const Cf = new RegExp('[~\\*/\\[\\]]');
function kf(e, t, n) {
  if (t.search(Cf) >= 0) throw Af(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`, e, !1, void 0, n);
  try {
    return new cf(...t.split('.'))._internalPath;
  } catch (r) {
    throw Af(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`, e, !1, void 0, n);
  }
}
function Af(e, t, n, r, s) {
  const i = r && !r.isEmpty(),
    o = void 0 !== s;
  let a = `Function ${t}() called with invalid data`;
  n && (a += ' (via `toFirestore()`)'), (a += '. ');
  let c = '';
  return (
    (i || o) && ((c += ' (found'), i && (c += ` in field ${r}`), o && (c += ` in document ${s}`), (c += ')')),
    new So(Io.INVALID_ARGUMENT, a + e + c)
  );
}
function Nf(e, t) {
  return e.some(e => e.isEqual(t));
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Rf {
  constructor(e, t, n, r, s) {
    (this._firestore = e), (this._userDataWriter = t), (this._key = n), (this._document = r), (this._converter = s);
  }
  get id() {
    return this._key.path.lastSegment();
  }
  get ref() {
    return new Zd(this._firestore, this._converter, this._key);
  }
  exists() {
    return null !== this._document;
  }
  data() {
    if (this._document) {
      if (this._converter) {
        const e = new Df(this._firestore, this._userDataWriter, this._key, this._document, null);
        return this._converter.fromFirestore(e);
      }
      return this._userDataWriter.convertValue(this._document.data.value);
    }
  }
  get(e) {
    if (this._document) {
      const t = this._document.data.field(Of('DocumentSnapshot.get', e));
      if (null !== t) return this._userDataWriter.convertValue(t);
    }
  }
}
class Df extends Rf {
  data() {
    return super.data();
  }
}
function Of(e, t) {
  return 'string' == typeof t ? kf(e, t) : t instanceof cf ? t._internalPath : t._delegate._internalPath;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Pf {
  convertValue(e, t = 'none') {
    switch (Sa(e)) {
      case 0:
        return null;
      case 1:
        return e.booleanValue;
      case 2:
        return ya(e.integerValue || e.doubleValue);
      case 3:
        return this.convertTimestamp(e.timestampValue);
      case 4:
        return this.convertServerTimestamp(e, t);
      case 5:
        return e.stringValue;
      case 6:
        return this.convertBytes(va(e.bytesValue));
      case 7:
        return this.convertReference(e.referenceValue);
      case 8:
        return this.convertGeoPoint(e.geoPointValue);
      case 9:
        return this.convertArray(e.arrayValue, t);
      case 11:
        return this.convertObject(e.mapValue, t);
      case 10:
        return this.convertVectorValue(e.mapValue);
      default:
        throw bo();
    }
  }
  convertObject(e, t) {
    return this.convertObjectMap(e.fields, t);
  }
  convertObjectMap(e, t = 'none') {
    const n = {};
    return (
      ia(e, (e, r) => {
        n[e] = this.convertValue(r, t);
      }),
      n
    );
  }
  convertVectorValue(e) {
    var t, n, r;
    const s =
      null ===
        (r = null === (n = null === (t = e.fields) || void 0 === t ? void 0 : t.value.arrayValue) || void 0 === n ? void 0 : n.values) ||
      void 0 === r
        ? void 0
        : r.map(e => ya(e.doubleValue));
    return new lf(s);
  }
  convertGeoPoint(e) {
    return new hf(ya(e.latitude), ya(e.longitude));
  }
  convertArray(e, t) {
    return (e.values || []).map(e => this.convertValue(e, t));
  }
  convertServerTimestamp(e, t) {
    switch (t) {
      case 'previous':
        const n = _a(e);
        return null == n ? null : this.convertValue(n, t);
      case 'estimate':
        return this.convertTimestamp(ba(e));
      default:
        return null;
    }
  }
  convertTimestamp(e) {
    const t = ma(e);
    return new Vo(t.seconds, t.nanos);
  }
  convertDocumentKey(e, t) {
    const n = $o.fromString(e);
    To(fh(n));
    const r = new Ea(n.get(1), n.get(3)),
      s = new Ho(n.popFirst(5));
    return (
      r.isEqual(t) ||
        vo(
          `Document ${s} contains a document reference within a different database (${r.projectId}/${r.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`
        ),
      s
    );
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class xf {
  constructor(e, t) {
    (this.hasPendingWrites = e), (this.fromCache = t);
  }
  isEqual(e) {
    return this.hasPendingWrites === e.hasPendingWrites && this.fromCache === e.fromCache;
  }
}
class Lf extends Rf {
  constructor(e, t, n, r, s, i) {
    super(e, t, n, r, i), (this._firestore = e), (this._firestoreImpl = e), (this.metadata = s);
  }
  exists() {
    return super.exists();
  }
  data(e = {}) {
    if (this._document) {
      if (this._converter) {
        const t = new Mf(this._firestore, this._userDataWriter, this._key, this._document, this.metadata, null);
        return this._converter.fromFirestore(t, e);
      }
      return this._userDataWriter.convertValue(this._document.data.value, e.serverTimestamps);
    }
  }
  get(e, t = {}) {
    if (this._document) {
      const n = this._document.data.field(Of('DocumentSnapshot.get', e));
      if (null !== n) return this._userDataWriter.convertValue(n, t.serverTimestamps);
    }
  }
}
class Mf extends Lf {
  data(e = {}) {
    return super.data(e);
  }
}
class Uf {
  constructor(e, t, n, r) {
    (this._firestore = e),
      (this._userDataWriter = t),
      (this._snapshot = r),
      (this.metadata = new xf(r.hasPendingWrites, r.fromCache)),
      (this.query = n);
  }
  get docs() {
    const e = [];
    return this.forEach(t => e.push(t)), e;
  }
  get size() {
    return this._snapshot.docs.size;
  }
  get empty() {
    return 0 === this.size;
  }
  forEach(e, t) {
    this._snapshot.docs.forEach(n => {
      e.call(
        t,
        new Mf(
          this._firestore,
          this._userDataWriter,
          n.key,
          n,
          new xf(this._snapshot.mutatedKeys.has(n.key), this._snapshot.fromCache),
          this.query.converter
        )
      );
    });
  }
  docChanges(e = {}) {
    const t = !!e.includeMetadataChanges;
    if (t && this._snapshot.excludesMetadataChanges)
      throw new So(
        Io.INVALID_ARGUMENT,
        'To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().'
      );
    return (
      (this._cachedChanges && this._cachedChangesIncludeMetadataChanges === t) ||
        ((this._cachedChanges = (function (e, t) {
          if (e._snapshot.oldDocs.isEmpty()) {
            let t = 0;
            return e._snapshot.docChanges.map(n => {
              const r = new Mf(
                e._firestore,
                e._userDataWriter,
                n.doc.key,
                n.doc,
                new xf(e._snapshot.mutatedKeys.has(n.doc.key), e._snapshot.fromCache),
                e.query.converter
              );
              return n.doc, { type: 'added', doc: r, oldIndex: -1, newIndex: t++ };
            });
          }
          {
            let n = e._snapshot.oldDocs;
            return e._snapshot.docChanges
              .filter(e => t || 3 !== e.type)
              .map(t => {
                const r = new Mf(
                  e._firestore,
                  e._userDataWriter,
                  t.doc.key,
                  t.doc,
                  new xf(e._snapshot.mutatedKeys.has(t.doc.key), e._snapshot.fromCache),
                  e.query.converter
                );
                let s = -1,
                  i = -1;
                return (
                  0 !== t.type && ((s = n.indexOf(t.doc.key)), (n = n.delete(t.doc.key))),
                  1 !== t.type && ((n = n.add(t.doc)), (i = n.indexOf(t.doc.key))),
                  { type: Ff(t.type), doc: r, oldIndex: s, newIndex: i }
                );
              });
          }
        })(this, t)),
        (this._cachedChangesIncludeMetadataChanges = t)),
      this._cachedChanges
    );
  }
}
function Ff(e) {
  switch (e) {
    case 0:
      return 'added';
    case 2:
    case 3:
      return 'modified';
    case 1:
      return 'removed';
    default:
      return bo();
  }
}
class Vf extends Pf {
  constructor(e) {
    super(), (this.firestore = e);
  }
  convertBytes(e) {
    return new af(e);
  }
  convertReference(e) {
    const t = this.convertDocumentKey(e, this.firestore._databaseId);
    return new Zd(this.firestore, null, t);
  }
}
function jf(e) {
  e = Qd(e, Yd);
  const t = Qd(e.firestore, sf),
    n = of(t),
    r = new Vf(t);
  return (
    (function (e) {
      if ('L' === e.limitType && 0 === e.explicitOrderBy.length)
        throw new So(Io.UNIMPLEMENTED, 'limitToLast() queries require specifying at least one orderBy() clause');
    })(e._query),
    $d(n, e._query).then(n => new Uf(t, r, e, n))
  );
}
function Bf(e, t, n, ...r) {
  e = Qd(e, Zd);
  const s = Qd(e.firestore, sf),
    i = vf(s);
  let o;
  return (
    (o =
      'string' == typeof (t = le(t)) || t instanceof cf
        ? (function (e, t, n, r, s, i) {
            const o = e.Qu(1, t, n),
              a = [Sf(t, r, n)],
              c = [s];
            if (i.length % 2 != 0)
              throw new So(
                Io.INVALID_ARGUMENT,
                `Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`
              );
            for (let e = 0; e < i.length; e += 2) a.push(Sf(t, i[e])), c.push(i[e + 1]);
            const u = [],
              h = ja.empty();
            for (let e = a.length - 1; e >= 0; --e)
              if (!Nf(u, a[e])) {
                const t = a[e];
                let n = c[e];
                n = le(n);
                const r = o.Nu(t);
                if (n instanceof _f) u.push(t);
                else {
                  const e = bf(n, r);
                  null != e && (u.push(t), h.set(t, e));
                }
              }
            const l = new da(u);
            return new pf(h, l, o.fieldTransforms);
          })(i, 'updateDoc', e._key, t, n, r)
        : (function (e, t, n, r) {
            const s = e.Qu(1, t, n);
            If('Data must be an object, but it was:', s, r);
            const i = [],
              o = ja.empty();
            ia(r, (e, r) => {
              const a = kf(t, e, n);
              r = le(r);
              const c = s.Nu(a);
              if (r instanceof _f) i.push(a);
              else {
                const e = bf(r, c);
                null != e && (i.push(a), o.set(a, e));
              }
            });
            const a = new da(i);
            return new pf(o, a, s.fieldTransforms);
          })(i, 'updateDoc', e._key, t)),
    zf(s, [o.toMutation(e._key, nu.exists(!0))])
  );
}
function $f(e) {
  return zf(Qd(e.firestore, sf), [new gu(e._key, nu.none())]);
}
function qf(e, t) {
  const n = Qd(e.firestore, sf),
    r = nf(e),
    s = (function (e, t) {
      let n;
      return (n = e ? e.toFirestore(t) : t), n;
    })(e.converter, t);
  return zf(n, [wf(vf(e.firestore), 'addDoc', r._key, s, null !== e.converter, {}).toMutation(r._key, nu.exists(!1))]).then(() => r);
}
function zf(e, t) {
  return (function (e, t) {
    const n = new Co();
    return (
      e.asyncQueue.enqueueAndForget(async () =>
        md(
          await (function (e) {
            return jd(e).then(e => e.syncEngine);
          })(e),
          t,
          n
        )
      ),
      n.promise
    );
  })(of(e), t);
}
!(function (e, t = !0) {
  !(function (e) {
    po = e;
  })(St),
    _t(
      new de(
        'firestore',
        (e, { instanceIdentifier: n, options: r }) => {
          const s = e.getProvider('app').getImmediate(),
            i = new sf(
              new Ro(e.getProvider('auth-internal')),
              new xo(e.getProvider('app-check-internal')),
              (function (e, t) {
                if (!Object.prototype.hasOwnProperty.apply(e.options, ['projectId']))
                  throw new So(Io.INVALID_ARGUMENT, '"projectId" not provided in firebase.initializeApp.');
                return new Ea(e.options.projectId, t);
              })(s, n),
              s
            );
          return (r = Object.assign({ useFetchStreams: t }, r)), i._setSettings(r), i;
        },
        'PUBLIC'
      ).setMultipleInstances(!0)
    ),
    At(lo, '4.7.4', e),
    At(lo, '4.7.4', 'esm2017');
})();
const Hf = Ct({
    apiKey: 'AIzaSyCGaJKzrUv_TgD97QLt-ydGPBbpCyCnrEw',
    authDomain: 'peg-2035.firebaseapp.com',
    projectId: 'peg-2035',
    storageBucket: 'peg-2035.appspot.com',
    messagingSenderId: '1039825199205',
    appId: '1:1039825199205:web:44d7dfd0f6f970c0ee668c',
    measurementId: 'G-FE9PXQ6LLX',
  }),
  Gf = (function (e) {
    const t = 'string' == typeof e ? e : '(default)',
      n = bt('object' == typeof e ? e : kt(), 'firestore').getImmediate({ identifier: t });
    if (!n._initialized) {
      const e = X('firestore');
      e &&
        (function (e, t, n, r = {}) {
          var s;
          const i = (e = Qd(e, Jd))._getSettings(),
            o = `${t}:${n}`;
          if (
            ('firestore.googleapis.com' !== i.host &&
              i.host !== o &&
              wo('Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.'),
            e._setSettings(Object.assign(Object.assign({}, i), { host: o, ssl: !1 })),
            r.mockUserToken)
          ) {
            let t, n;
            if ('string' == typeof r.mockUserToken) (t = r.mockUserToken), (n = fo.MOCK_USER);
            else {
              t = ee(r.mockUserToken, null === (s = e._app) || void 0 === s ? void 0 : s.options.projectId);
              const i = r.mockUserToken.sub || r.mockUserToken.user_id;
              if (!i) throw new So(Io.INVALID_ARGUMENT, "mockUserToken must contain 'sub' or 'user_id' field!");
              n = new fo(i);
            }
            e._authCredentials = new No(new ko(t, n));
          }
        })(n, ...e);
    }
    return n;
  })(Hf),
  Kf = (function (e = kt()) {
    const t = bt(e, 'auth');
    if (t.isInitialized()) return t.getImmediate();
    const n =
        /**
         * @license
         * Copyright 2020 Google LLC
         *
         * Licensed under the Apache License, Version 2.0 (the "License");
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         *   http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */
        (function (e, t) {
          const n = bt(e, 'auth');
          if (n.isInitialized()) {
            const e = n.getImmediate();
            if (oe(n.getOptions(), null != t ? t : {})) return e;
            Ht(e, 'already-initialized');
          }
          return n.initialize({ options: t });
        })(e, { popupRedirectResolver: vs, persistence: [Pr, mr, vr] }),
      r = Y('authTokenSyncURL');
    if (r && 'boolean' == typeof isSecureContext && isSecureContext) {
      const e = new URL(r, location.origin);
      if (location.origin === e.origin) {
        const t =
          ((s = e.toString()),
          async e => {
            const t = e && (await e.getIdTokenResult()),
              n = t && (new Date().getTime() - Date.parse(t.issuedAtTime)) / 1e3;
            if (n && n > Ts) return;
            const r = null == t ? void 0 : t.token;
            Es !== r && ((Es = r), await fetch(s, { method: r ? 'POST' : 'DELETE', headers: r ? { Authorization: `Bearer ${r}` } : {} }));
          });
        !(function (e, t, n) {
          le(e).beforeAuthStateChanged(t, n);
        })(n, t, () => t(n.currentUser)),
          (function (e, t, n, r) {
            le(e).onIdTokenChanged(t, n, r);
          })(n, e => t(e));
      }
    }
    var s;
    const i = Q('auth');
    return i && Jn(n, `http://${i}`), n;
  })(Hf),
  Wf = (function (e = kt(), t) {
    const n = bt((e = le(e)), Xi).getImmediate({ identifier: t }),
      r = X('storage');
    return (
      r &&
        (function (e, t, n, r = {}) {
          !(function (e, t, n, r = {}) {
            (e.host = `${t}:${n}`), (e._protocol = 'http');
            const { mockUserToken: s } = r;
            s && (e._overrideAuthToken = 'string' == typeof s ? s : ee(s, e.app.options.projectId));
          })(e, t, n, r);
        })(n, ...r),
      n
    );
  })(Hf),
  Qf = B(null),
  Xf = ((Jf = () => null !== Qf.get()), new U.Computed(Jf, Yf));
var Jf, Yf;
const Zf = async () => {
    const e = new or();
    try {
      const t = await Br(Kf, e);
      Qf.set(t.user), console.log('LOUD', t.user, Qf.get(), Xf.get());
    } catch (e) {
      console.error('Error signing in with Google:', e);
    }
  },
  ep = async () => {
    try {
      Kf.signOut();
    } catch (e) {
      console.error('Error signing out:', e);
    }
  };
!(function (e, t, n, r) {
  le(e).onAuthStateChanged(t, n, r);
})(Kf, e => {
  e ? Qf.set(e) : Qf.set(null);
});
const tp = B(null),
  np = async () => {
    const e = tp.get();
    if (e) {
      const r = Ji(((t = Wf), (n = `uploads/${e.name}`), Hi((t = le(t)), n)), e);
      r.on(
        'state_changed',
        e => {
          const t = (e.bytesTransferred / e.totalBytes) * 100;
          console.log(`Upload is ${t}% done`);
        },
        e => {
          console.error('Upload failed:', e);
        },
        () => {
          (function (e) {
            return qi((e = le(e)));
          })(r.snapshot.ref).then(e => {
            console.log('File available at:', e);
          });
        }
      );
    }
    var t, n;
  };
var rp = function (e, t, n, r) {
  for (
    var s, i = arguments.length, o = i < 3 ? t : null === r ? (r = Object.getOwnPropertyDescriptor(t, n)) : r, a = e.length - 1;
    a >= 0;
    a--
  )
    (s = e[a]) && (o = (i < 3 ? s(o) : i > 3 ? s(t, n, o) : s(t, n)) || o);
  return i > 3 && o && Object.defineProperty(t, n, o), o;
};
let sp = class extends r {
  async uploadFile(e) {
    const t = e.target,
      n = t.files ? t.files[0] : null;
    n ? (tp.set(n), await np(), console.log('Uploaded ', n)) : console.log('No file selected or user not authenticated.');
  }
  render() {
    return s`
      <div>
        <input type="file" @change="${this.uploadFile}"/>
      </div>
    `;
  }
};
(sp.styles = t`
    :host {
      display: block;
      border: solid 1px darkblue;
      margin: 10px;
      padding: 16px;
    }
    input {
      display: block;
      margin-bottom: 10px;
    }
  `),
  (sp = rp([n('my-upload-component')], sp));
const ip = tf(Gf, 'projects');
var op = function (e, t, n, r) {
  for (
    var s, i = arguments.length, o = i < 3 ? t : null === r ? (r = Object.getOwnPropertyDescriptor(t, n)) : r, a = e.length - 1;
    a >= 0;
    a--
  )
    (s = e[a]) && (o = (i < 3 ? s(o) : i > 3 ? s(t, n, o) : s(t, n)) || o);
  return i > 3 && o && Object.defineProperty(t, n, o), o;
};
let ap = class extends r {
  constructor() {
    super(...arguments), (this.projects = []);
  }
  connectedCallback() {
    super.connectedCallback(), this.loadProjects();
  }
  async loadProjects() {
    this.projects = await (async () => (await jf(ip)).docs.map(e => ({ id: e.id, ...e.data() })))();
  }
  async handleCreate() {
    if (this.shadowRoot) {
      const e = this.shadowRoot.getElementById('name').value,
        t = this.shadowRoot.getElementById('dueDate').value,
        n = parseInt(this.shadowRoot.getElementById('wordCount').value);
      await (async e => {
        console.log('Document successfully written with ID:', e);
        try {
          if (!e.name || !e.dueDate || 'number' != typeof e.wordCount)
            throw new Error('Invalid project data. Ensure name, dueDate, and wordCount are provided.');
          const t = await qf(ip, e);
          return console.log('Document successfully written with ID:', t.id), t;
        } catch (e) {
          throw (console.error('Error creating project:', e), new Error(`Failed to create project: ${e.message}`));
        }
      })({ name: e, dueDate: t, wordCount: n }),
        this.loadProjects();
    }
  }
  async handleUpdate(e) {
    const t = { wordCount: parseInt(prompt('New word count:', '0') || '0') };
    await (async (e, t) => {
      const n = nf(ip, e);
      return await Bf(n, t);
    })(e, t),
      console.log(e),
      this.loadProjects();
  }
  async handleDelete(e) {
    await (async e => {
      const t = nf(ip, e);
      return await $f(t);
    })(e),
      console.log(e),
      this.loadProjects();
  }
  render() {
    return s`
      <p>The create should not be required because automagically created whenever a user is promoted to a player</p>
      <h3>Create New Projects</h3>
      <input id="name" placeholder="Projects Name" />
      <input id="dueDate" type="date" placeholder="Due Date" />
      <input id="wordCount" type="number" placeholder="Word Count" />
      <button @click="${this.handleCreate}">Create Projects</button>

      <h3>Projects List</h3>
      <ul>
        ${this.projects.map(
          e => s`
          <li>
            ${e.name} - Due: ${e.dueDate} - Words: ${e.wordCount}
            <button @click="${() => this.handleUpdate(e.id)}">Update</button>
            <button @click="${() => this.handleDelete(e.id)}">Delete</button>
          </li>
        `
        )}
      </ul>
    `;
  }
};
(ap.styles = t`
    :host {
      display: block;
      border: solid 2px darkred;
      margin: 10px;
      padding: 16px;
    }
    input {
      display: block;
      margin-bottom: 10px;
      button { margin: 5px; }
      input { margin: 5px; }
    }
  `),
  op([i()], ap.prototype, 'projects', void 0),
  (ap = op([n('user-projects')], ap));
const cp = tf(Gf, 'electives');
var up = function (e, t, n, r) {
  for (
    var s, i = arguments.length, o = i < 3 ? t : null === r ? (r = Object.getOwnPropertyDescriptor(t, n)) : r, a = e.length - 1;
    a >= 0;
    a--
  )
    (s = e[a]) && (o = (i < 3 ? s(o) : i > 3 ? s(t, n, o) : s(t, n)) || o);
  return i > 3 && o && Object.defineProperty(t, n, o), o;
};
let hp = class extends r {
  constructor() {
    super(...arguments), (this.electives = []);
  }
  connectedCallback() {
    super.connectedCallback(), this.loadElectives();
  }
  async loadElectives() {
    this.electives = await (async () => (await jf(cp)).docs.map(e => ({ id: e.id, ...e.data() })))();
  }
  async handleCreate() {
    if (this.shadowRoot) {
      const e = this.shadowRoot.getElementById('name').value,
        t = this.shadowRoot.getElementById('screenShot').value,
        n = this.shadowRoot.getElementById('creationDate').value,
        r = parseInt(this.shadowRoot.getElementById('points').value);
      await (async e => {
        console.log('Document successfully written with ID:', e);
        try {
          if (!e.name || !e.creationDate || 'number' != typeof e.points)
            throw new Error('Invalid elective data. Ensure name, dueDate, and points are provided.');
          const t = await qf(cp, e);
          return console.log('Document successfully written with ID:', t.id), t;
        } catch (e) {
          throw (console.error('Error creating elective:', e), new Error(`Failed to create elective: ${e.message}`));
        }
      })({ name: e, screenShot: t, creationDate: n, points: r }),
        this.loadElectives();
    }
  }
  async handleUpdate(e) {
    const t = { points: parseInt(prompt('Points:', '0') || '0') };
    await (async (e, t) => {
      const n = nf(cp, e);
      return await Bf(n, t);
    })(e, t),
      console.log(e),
      this.loadElectives();
  }
  async handleDelete(e) {
    await (async e => {
      const t = nf(cp, e);
      return await $f(t);
    })(e),
      console.log(e),
      this.loadElectives();
  }
  render() {
    return s`
      <h3>Create New Elective</h3>
      <input id="name" placeholder="Name" />
      <input id="screenShot" placeholder="ScreenShot URL" />
      <input id="creationDate" type="date" placeholder="Creation Date" />
      <input id="points" type="number" placeholder="Points Awarded" />
      <button @click="${this.handleCreate}">Create Electives</button>

      <h3>Electives List</h3>
      <ul>
        ${this.electives.map(
          e => s`
          <li>
            ${e.name} - Due: ${e.creationDate} ${e.screenShot ? '"' + e.screenShot + '": Screen Shot' : ' '}- Points: ${e.points}
            <button @click="${() => this.handleUpdate(e.id)}">Update</button>
            <button @click="${() => this.handleDelete(e.id)}">Delete</button>
          </li>
        `
        )}
      </ul>
    `;
  }
};
(hp.styles = t`
    :host {
      display: block;
      border: solid 1px darkorange;
      margin: 10px;
      padding: 16px;
    }
    input {
      display: block;
      margin-bottom: 10px;
      button { margin: 5px; }
      input { margin: 5px; }
    }
  `),
  up([i()], hp.prototype, 'electives', void 0),
  (hp = up([n('electives-admin')], hp));
const lp = tf(Gf, 'project');
var dp = function (e, t, n, r) {
  for (
    var s, i = arguments.length, o = i < 3 ? t : null === r ? (r = Object.getOwnPropertyDescriptor(t, n)) : r, a = e.length - 1;
    a >= 0;
    a--
  )
    (s = e[a]) && (o = (i < 3 ? s(o) : i > 3 ? s(t, n, o) : s(t, n)) || o);
  return i > 3 && o && Object.defineProperty(t, n, o), o;
};
let fp = class extends r {
  constructor() {
    super(...arguments), (this.projects = []);
  }
  connectedCallback() {
    super.connectedCallback(), this.loadProject();
  }
  async loadProject() {
    this.projects = await (async () => (await jf(lp)).docs.map(e => ({ id: e.id, ...e.data() })))();
  }
  async handleCreate() {
    if (this.shadowRoot) {
      const e = this.shadowRoot.getElementById('name').value,
        t = this.shadowRoot.getElementById('dueDate').value,
        n = parseInt(this.shadowRoot.getElementById('wordCount').value);
      await (async e => {
        console.log('Document successfully written with ID:', e);
        try {
          if (!e.name || !e.dueDate || 'number' != typeof e.wordCount)
            throw new Error('Invalid project data. Ensure name, dueDate, and wordCount are provided.');
          const t = await qf(lp, e);
          return console.log('Document successfully written with ID:', t.id), t;
        } catch (e) {
          throw (console.error('Error creating project:', e), new Error(`Failed to create project: ${e.message}`));
        }
      })({ name: e, dueDate: t, wordCount: n }),
        this.loadProject();
    }
  }
  async handleUpdate(e) {
    const t = { wordCount: parseInt(prompt('New word count:', '0') || '0') };
    await (async (e, t) => {
      const n = nf(lp, e);
      return await Bf(n, t);
    })(e, t),
      console.log(e),
      this.loadProject();
  }
  async handleDelete(e) {
    await (async e => {
      const t = nf(lp, e);
      return await $f(t);
    })(e),
      console.log(e),
      this.loadProject();
  }
  render() {
    return s`
      <h3>Create New Project</h3>
      <input id="name" placeholder="Project Name" />
      <input id="dueDate" type="date" placeholder="Due Date" />
      <input id="wordCount" type="number" placeholder="Word Count" />
      <button @click="${this.handleCreate}">Create Project</button>

      <h3>Project List</h3>
      <ul>
        ${this.projects.map(
          e => s`
          <li>
            ${e.name} - Due: ${e.dueDate} - Words: ${e.wordCount}
            <button @click="${() => this.handleUpdate(e.id)}">Update</button>
            <button @click="${() => this.handleDelete(e.id)}">Delete</button>
          </li>
        `
        )}
      </ul>
    `;
  }
};
(fp.styles = t`
    :host {
      display: block;
      border: solid 1px red;
      margin: 10px;
      padding: 16px;
    }
    input {
      display: block;
      margin-bottom: 10px;
      button { margin: 5px; }
      input { margin: 5px; }
    }
  `),
  dp([i()], fp.prototype, 'projects', void 0),
  (fp = dp([n('a-project')], fp));
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var pp = function (e, t, n, r) {
  for (
    var s, i = arguments.length, o = i < 3 ? t : null === r ? (r = Object.getOwnPropertyDescriptor(t, n)) : r, a = e.length - 1;
    a >= 0;
    a--
  )
    (s = e[a]) && (o = (i < 3 ? s(o) : i > 3 ? s(t, n, o) : s(t, n)) || o);
  return i > 3 && o && Object.defineProperty(t, n, o), o;
};
let gp = class extends (function (e) {
  return !0 === e[F]
    ? (console.warn('SignalWatcher should not be applied to the same class more than once.'), e)
    : class extends e {
        constructor() {
          super(...arguments), (this._$St = new U.State(0)), (this._$Si = !1), (this._$So = !0), (this._$Sh = new Set());
        }
        _$Sl() {
          if (void 0 !== this._$Su) return;
          this._$Sv = new U.Computed(() => {
            this._$St.get(), super.performUpdate();
          });
          const e = (this._$Su = new U.subtle.Watcher(function () {
            const e = j.get(this);
            void 0 !== e && (!1 === e._$Si && e.requestUpdate(), this.watch());
          }));
          j.set(e, this), V.register(this, { watcher: e, signal: this._$Sv }), e.watch(this._$Sv);
        }
        _$Sp() {
          void 0 !== this._$Su && (this._$Su.unwatch(this._$Sv), (this._$Sv = void 0), (this._$Su = void 0));
        }
        performUpdate() {
          this.isUpdatePending && (this._$Sl(), (this._$Si = !0), this._$St.set(this._$St.get() + 1), (this._$Si = !1), this._$Sv.get());
        }
        update(e) {
          try {
            this._$So ? ((this._$So = !1), super.update(e)) : this._$Sh.forEach(e => e.commit());
          } finally {
            (this.isUpdatePending = !1), this._$Sh.clear();
          }
        }
        requestUpdate(e, t, n) {
          (this._$So = !0), super.requestUpdate(e, t, n);
        }
        connectedCallback() {
          super.connectedCallback(), this.requestUpdate();
        }
        disconnectedCallback() {
          super.disconnectedCallback(),
            queueMicrotask(() => {
              !1 === this.isConnected && this._$Sp();
            });
        }
        _(e) {
          this._$Sh.add(e);
          const t = this._$So;
          this.requestUpdate(), (this._$So = t);
        }
        m(e) {
          this._$Sh.delete(e);
        }
      };
})(r) {
  render() {
    return s`
      <div>
        ${
          Xf.get()
            ? s`<p>Welcome, ${Qf.get()?.displayName}</p>
          <button @click="${ep}">Sign Out</button>
          <h1>PEG - Portfolio Electives Game</h1>
          <my-upload-component></my-upload-component>
          <user-projects></user-projects>
          <a-project></a-project>
          <electives-admin></electives-admin>
          `
            : s`<button @click="${Zf}">Sign in with Google</button>`
        }
      </div>

    `;
  }
};
(gp.styles = t`
    :host {
      display: block;
      border: solid 1px gray;
      padding: 16px;
      max-width: 800px;
    }
  `),
  (gp = pp([n('peg-app')], gp));
export { gp as PegApp };
