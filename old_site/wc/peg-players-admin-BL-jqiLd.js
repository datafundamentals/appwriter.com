import{c as a,d as r,g as e,i as s,r as t,t as l,f as i,x as n}from"./auth-5Jcf1-eo.js";const p=a(r,"players");var o=function(a,r,e,s){for(var t,l=arguments.length,i=l<3?r:null===s?s=Object.getOwnPropertyDescriptor(r,e):s,n=a.length-1;n>=0;n--)(t=a[n])&&(i=(l<3?t(i):l>3?t(r,e,i):t(r,e))||i);return l>3&&i&&Object.defineProperty(r,e,i),i};let d=class extends i{constructor(){super(...arguments),this.players=[]}connectedCallback(){super.connectedCallback(),this.loadPlayers()}async loadPlayers(){this.players=await(async()=>(await e(p)).docs.map((a=>({id:a.id,...a.data()}))))()}render(){return n`


      <h3>Players List</h3>
      <ul>
        ${this.players.map((a=>n`
            <li>
              ${a.displayName} - ${a.userId}
            </li>
          `))}
      </ul>
    `}};d.styles=s`
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
