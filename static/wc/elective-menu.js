import{b as e,h as t,t as a,c as i,j as o,x as s}from"./electives-BnuCE6Ks.js";var n=function(e,t,a,i){for(var o,s=arguments.length,n=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i,c=e.length-1;c>=0;c--)(o=e[c])&&(n=(s<3?o(n):s>3?o(t,a,n):o(t,a))||n);return s>3&&n&&Object.defineProperty(t,a,n),n};let c=class extends i{constructor(){super(...arguments),this.electives=[]}connectedCallback(){super.connectedCallback(),this.loadElectives()}async loadElectives(){this.electives=await o()}navigateToPage(e){const t=e.target.value;t&&(window.location.href=`/electives/${t}/`)}render(){return s`
      <select @change=${this.navigateToPage}>
        <option value="">Navigate to an Elective</option>
        ${this.electives.map((e=>s`<option value="${e.id}">${e.name}</option>`))}
      </select>
    `}};c.styles=e`
    :host {
      display: block;
      margin: 5px;
      padding: 5px;
    }
  `,n([t()],c.prototype,"electives",void 0),c=n([a("elective-menu")],c);export{c as ElectiveMenu};
