import{e as t,x as e,i as r,u as o,s as i,a as p,b as a,t as s,r as n}from"./auth-4w4T72xN.js";import"./a-project-ynEgnjNy.js";import"./players-admin-DvuzsGpr.js";import"./electives-BohN4Fgs.js";
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var l=function(t,e,r,o){for(var i,p=arguments.length,a=p<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,r):o,s=t.length-1;s>=0;s--)(i=t[s])&&(a=(p<3?i(a):p>3?i(e,r,a):i(e,r))||a);return p>3&&a&&Object.defineProperty(e,r,a),a};let c=class extends(t(n)){render(){return e`
      <div>
        ${r.get()?e`<p>Welcome, ${o.get()?.displayName}</p>
              <button @click="${i}">Sign Out</button>
              <a-project></a-project>`:e`<button @click="${p}">Sign in with Google</button>`}
      </div>
    `}};c.styles=a`
    :host {
      display: block;
      padding: 16px;
      max-width: 800px;
    }
  `,c=l([s("peg-app")],c);export{c as PegApp};
