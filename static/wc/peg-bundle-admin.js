import{j as e,x as t,k as r,l as a,m as n,i,t as l,r as p}from"./auth-CQzytyle.js";import"./peg-players-admin-D8J_3siM.js";
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var s=function(e,t,r,a){for(var n,i=arguments.length,l=i<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,r):a,p=e.length-1;p>=0;p--)(n=e[p])&&(l=(i<3?n(l):i>3?n(t,r,l):n(t,r))||l);return i>3&&l&&Object.defineProperty(t,r,l),l};let o=class extends(e(p)){render(){return t`
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
  `,o=s([l("peg-bundle-admin")],o);export{o as PegBundleAdmin};
