import{b as e,c as t,t as a,r as o,x as i}from"./auth-4w4T72xN.js";import{g as s}from"./electives-BohN4Fgs.js";var n=function(e,t,a,o){for(var i,s=arguments.length,n=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,a):o,c=e.length-1;c>=0;c--)(i=e[c])&&(n=(s<3?i(n):s>3?i(t,a,n):i(t,a))||n);return s>3&&n&&Object.defineProperty(t,a,n),n};let c=class extends o{constructor(){super(...arguments),this.electives=[]}connectedCallback(){super.connectedCallback(),this.loadElectives()}async loadElectives(){this.electives=await s()}navigateToPage(e){const t=e.target.value;t&&(window.location.href=`/electives/${t}/`)}render(){return i`
      <select @change=${this.navigateToPage}>
        <option value="">Navigate to an Elective</option>
        ${this.electives.map((e=>i`<option value="${e.id}">${e.name}</option>`))}
      </select>
    `}};c.styles=e`
    :host {
      display: block;
      margin: 5px;
      padding: 5px;
    }
  `,n([t()],c.prototype,"electives",void 0),c=n([a("elective-menu")],c);export{c as ElectiveMenu};
