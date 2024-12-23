import { i as e, n as r, t, r as o, x as l } from './property-1hI2sKkM.js';
var n = function (e, r, t, o) {
  for (
    var l, n = arguments.length, s = n < 3 ? r : null === o ? (o = Object.getOwnPropertyDescriptor(r, t)) : o, p = e.length - 1;
    p >= 0;
    p--
  )
    (l = e[p]) && (s = (n < 3 ? l(s) : n > 3 ? l(r, t, s) : l(r, t)) || s);
  return n > 3 && s && Object.defineProperty(r, t, s), s;
};
let s = class extends o {
  constructor() {
    super(...arguments), (this.name = 'World');
  }
  render() {
    return l`
      <p>These would be the listed electives!</p>
      <h1>${this.sayHello(this.name)}!</h1>
    `;
  }
  sayHello(e) {
    return `Electives ${e}`;
  }
};
(s.styles = e`
    :host {
      display: block;
      border: solid 1px green;
      margin: 10px;
      padding: 16px;
    }
    p, h1 {
      color: green;
    }

  `),
  n([r()], s.prototype, 'name', void 0),
  (s = n([t('peg-bundle-elective-menu')], s));
export { s as ElectiveMenu };
