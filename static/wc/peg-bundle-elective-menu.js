import{i as e,f as t,t as a,r as o,x as i}from"./auth-CQzytyle.js";import{a as n}from"./electives-BIoKeor6.js";var s=function(e,t,a,o){for(var i,n=arguments.length,s=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,a):o,l=e.length-1;l>=0;l--)(i=e[l])&&(s=(n<3?i(s):n>3?i(t,a,s):i(t,a))||s);return n>3&&s&&Object.defineProperty(t,a,s),s};let l=class extends o{constructor(){super(...arguments),this.electives=[]}connectedCallback(){super.connectedCallback(),this.loadElectives()}async loadElectives(){this.electives=await n()}navigateToPage(e){const t=e.target.value;t&&(window.location.href=`/electives/${t}/`)}render(){return i`
      <select @change=${this.navigateToPage}>
        <option value="">Navigate to an Elective</option>
        ${this.electives.map((e=>i`<option value="${e.id}">${e.name}</option>`))}
      </select>
    `}};l.styles=e`
    :host {
      display: block;
      margin: 5px;
      padding: 5px;
    }
  `,s([t()],l.prototype,"electives",void 0),l=s([a("peg-bundle-elective-menu")],l);export{l as PegBundleElectiveMenu};
