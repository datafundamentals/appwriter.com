import{i as e,r as t,t as o,f as a,x as i}from"./auth-5Jcf1-eo.js";import{a as l}from"./electives-_lAmuQAN.js";import"./upload-DPbCruYq.js";var n=function(e,t,o,a){for(var i,l=arguments.length,n=l<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,o):a,s=e.length-1;s>=0;s--)(i=e[s])&&(n=(l<3?i(n):l>3?i(t,o,n):i(t,o))||n);return l>3&&n&&Object.defineProperty(t,o,n),n};let s=class extends a{constructor(){super(...arguments),this.electives=[]}connectedCallback(){super.connectedCallback(),this.loadElectives()}async loadElectives(){this.electives=await l()}navigateToPage(e){const t=e.target.value;t&&(window.location.href=`/electives/${t}/`)}render(){return i`
      <select @change=${this.navigateToPage}>
        <option value="">Navigate to an Elective</option>
        ${this.electives.map((e=>i`<option value="${e.id}">${e.name}</option>`))}
      </select>
    `}};s.styles=e`
    :host {
      display: block;
      margin: 5px;
      padding: 5px;
    }
  `,n([t()],s.prototype,"electives",void 0),s=n([o("peg-bundle-elective-menu")],s);export{s as PegBundleElectiveMenu};
