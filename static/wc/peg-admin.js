import{e,x as t,i as r,u as a,a as i,b as n,t as s,r as o}from"./auth-4w4T72xN.js";import"./players-admin-DvuzsGpr.js";
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var p=function(e,t,r,a){for(var i,n=arguments.length,s=n<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,r):a,o=e.length-1;o>=0;o--)(i=e[o])&&(s=(n<3?i(s):n>3?i(t,r,s):i(t,r))||s);return n>3&&s&&Object.defineProperty(t,r,s),s};let l=class extends(e(o)){render(){return t`
      <div>
        ${r.get()?t`<p>Welcome, ${a.get()?.displayName}</p>
              <players-admin></players-admin>`:t`<button @click="${i}">Sign in with Google</button>`}
      </div>
    `}};l.styles=n`
    :host {
      display: block;
      border: solid 1px gray;
      padding: 16px;
      max-width: 800px;
    }
  `,l=p([s("peg-admin")],l);export{l as PegAdmin};
