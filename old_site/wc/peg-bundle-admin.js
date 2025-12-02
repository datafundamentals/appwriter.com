import{j as e,x as t,k as r,l as a,m as n,i,t as s,f as l}from"./auth-5Jcf1-eo.js";import"./peg-players-admin-BL-jqiLd.js";
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var p=function(e,t,r,a){for(var n,i=arguments.length,s=i<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,r):a,l=e.length-1;l>=0;l--)(n=e[l])&&(s=(i<3?n(s):i>3?n(t,r,s):n(t,r))||s);return i>3&&s&&Object.defineProperty(t,r,s),s};let o=class extends(e(l)){render(){return t`
      <div>
        ${r.get()?t`<p>Welcome, ${a.get()?.displayName}</p>
              <players-admin></players-admin>`:t`<button @click="${n}">Sign in with Google</button>`}
      </div>
    `}};o.styles=i`
    :host {
      display: block;
      border: solid 1px gray;
      padding: 16px;
      max-width: 800px;
    }
  `,o=p([s("peg-bundle-admin")],o);export{o as PegBundleAdmin};
