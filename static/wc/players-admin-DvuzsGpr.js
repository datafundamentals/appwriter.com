import{d as a,f as r,h as s,b as e,c as t,t as l,r as i,x as n}from"./auth-4w4T72xN.js";const p=a(r,"players");var o=function(a,r,s,e){for(var t,l=arguments.length,i=l<3?r:null===e?e=Object.getOwnPropertyDescriptor(r,s):e,n=a.length-1;n>=0;n--)(t=a[n])&&(i=(l<3?t(i):l>3?t(r,s,i):t(r,s))||i);return l>3&&i&&Object.defineProperty(r,s,i),i};let d=class extends i{constructor(){super(...arguments),this.players=[]}connectedCallback(){super.connectedCallback(),this.loadPlayers()}async loadPlayers(){this.players=await(async()=>(await s(p)).docs.map((a=>({id:a.id,...a.data()}))))()}render(){return n`


      <h3>Players List</h3>
      <ul>
        ${this.players.map((a=>n`
            <li>
              ${a.displayName} - ${a.userId}
            </li>
          `))}
      </ul>
    `}};d.styles=e`
    :host {
      display: block;
      border: solid 2px darkred;
      margin: 10px;
      padding: 16px;
    }
    input {
      display: block;
      margin-bottom: 10px;
      button {
        margin: 5px;
      }
      input {
        margin: 5px;
      }
    }
  `,o([t()],d.prototype,"players",void 0),d=o([l("players-admin")],d);
