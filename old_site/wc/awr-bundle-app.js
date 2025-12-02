import{j as e,x as t,k as r,l as o,s as a,m as n,i as s,r as l,t as i,f as d}from"./auth-5Jcf1-eo.js";import"./awr-upload-link-C_S2919y.js";import"./awr-resource-documenter-B4jJ5FZJ.js";import"./upload-DPbCruYq.js";class c{handleFieldUpdate(e,t,r){console.log(`Field updated: ${e} = ${t}`,r.name)}handleStateConcern(e,t){console.log(`State concern handled: ${e} with action ${t}`)}appendToImages(e,t){t.images||(t.images=[]),e&&t.images.push(e)}}
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var p=function(e,t,r,o){for(var a,n=arguments.length,s=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o,l=e.length-1;l>=0;l--)(a=e[l])&&(s=(n<3?a(s):n>3?a(t,r,s):a(t,r))||s);return n>3&&s&&Object.defineProperty(t,r,s),s};let u=class extends(e(d)){constructor(){super(...arguments),this.webPageResourceHandler=new c}render(){return t`
      <div>
        ${r.get()?t`<p>Welcome, ${o.get()?.displayName}</p>
          <button @click="${a}">Sign Out</button>
          <!-- this is now how a resource documenter should be called, with a handler appropriate for the situation-->
          <awr-resource-documenter .handlers=${this.webPageResourceHandler}></awr-resource-documenter>`:t`
            <button @click="${n}">Sign in with Google</button>`}
      </div>
    `}};u.styles=s`
    :host {
      display: block;
      padding: 16px;
      max-width: 800px;
    }
  `,p([l()],u.prototype,"webPageResourceHandler",void 0),u=p([i("awr-bundle-app")],u);export{u as AwrBundleApp};
