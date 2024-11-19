import{r as e,i as t,o as a,G as o,s as i,a as n,b as s,t as l,c as r,f as c,u as d,x as p,d as h,e as u,g as m,h as g,j as v,k as y,l as f,m as b,n as w,p as $,q as x,v as j,w as P,y as D,z as U,A as k}from"./electives-BnuCE6Ks.js";const E=e(null),I=t((()=>null!==E.get())),O=async()=>{const e=new o;try{const t=await i(n,e);E.set(t.user),console.log("LOUD",t.user,E.get(),I.get())}catch(e){console.error("Error signing in with Google:",e)}},C=async()=>{try{n.signOut()}catch(e){console.error("Error signing out:",e)}};a(n,(e=>{e?E.set(e):E.set(null)}));var S=function(e,t,a,o){for(var i,n=arguments.length,s=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,a):o,l=e.length-1;l>=0;l--)(i=e[l])&&(s=(n<3?i(s):n>3?i(t,a,s):i(t,a))||s);return n>3&&s&&Object.defineProperty(t,a,s),s};let N=class extends r{async uploadFile(e){const t=e.target,a=t.files?t.files[0]:null;a?(c.set(a),await d(),console.log("Uploaded ",a)):console.log("No file selected or user not authenticated.")}render(){return p`
      <div>
        <input type="file" @change="${this.uploadFile}" />
      </div>
    `}};N.styles=s`
    :host {
      display: block;
      border: solid 1px darkblue;
      margin: 10px;
      padding: 16px;
    }
    input {
      display: block;
      margin-bottom: 10px;
    }
  `,N=S([l("my-upload-component")],N);const L=h(u,"players");var F=function(e,t,a,o){for(var i,n=arguments.length,s=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,a):o,l=e.length-1;l>=0;l--)(i=e[l])&&(s=(n<3?i(s):n>3?i(t,a,s):i(t,a))||s);return n>3&&s&&Object.defineProperty(t,a,s),s};let G=class extends r{constructor(){super(...arguments),this.players=[]}connectedCallback(){super.connectedCallback(),this.loadPlayers()}async loadPlayers(){this.players=await(async()=>(await m(L)).docs.map((e=>({id:e.id,...e.data()}))))()}render(){return p`


      <h3>Players List</h3>
      <ul>
        ${this.players.map((e=>p`
            <li>
              ${e.displayName} - ${e.userId}
            </li>
          `))}
      </ul>
    `}};G.styles=s`
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
  `,F([g()],G.prototype,"players",void 0),G=F([l("players-admin")],G);var R=function(e,t,a,o){for(var i,n=arguments.length,s=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,a):o,l=e.length-1;l>=0;l--)(i=e[l])&&(s=(n<3?i(s):n>3?i(t,a,s):i(t,a))||s);return n>3&&s&&Object.defineProperty(t,a,s),s};let z=class extends r{constructor(){super(...arguments),this.electives=[],this.fileName="No screenshot chosen"}async uploadFile(e){const t=e.target,a=t.files?t.files[0]:null;a?(this.fileName=a?a.name:"No screenshot chosen",c.set(a),await d(),console.log("Uploaded ",a)):console.log("No file selected or user not authenticated.")}connectedCallback(){super.connectedCallback(),this.loadElectives()}async loadElectives(){this.electives=await v()}async handleCreate(){if(this.shadowRoot){const e=this.shadowRoot.getElementById("name").value,t="(this.shadowRoot.getElementById('screenShot') as HTMLInputElement).value;",a=this.shadowRoot.getElementById("creationDate").value,o=parseInt(this.shadowRoot.getElementById("points").value);await y({name:e,screenShot:t,creationDate:a,points:o}),this.loadElectives()}}async handleUpdate(e){const t={points:parseInt(prompt("Points:","0")||"0")};await f(e,t),console.log(e),this.loadElectives()}async handleDelete(e){await b(e),console.log(e),this.loadElectives()}render(){return p`
      <h3>Create New Elective</h3>
      <input id="name" placeholder="Name" />
      <div class="file-input-wrapper">
        <!-- Custom button label -->
        <label class="file-label">
          Select Screenshot to Upload
          <input type="file" class="file-input" @change="${this.uploadFile}" />
        </label>
        <!-- Display the selected file name or default message -->
        <span class="file-name">${this.fileName}</span>
      </div>
      <input id="creationDate" type="date" placeholder="Creation Date" />
      <input id="points" type="number" placeholder="Points Awarded" />
      <button @click="${this.handleCreate}">Create Electives</button>

      <h3>Electives List</h3>
      <ul>
        ${this.electives.map((e=>p`
            <li>
              ${e.name} - Due: ${e.creationDate}
              ${e.screenShot?'"'+e.screenShot+'": Screen Shot':" "}- Points: ${e.points}
              <button @click="${()=>this.handleUpdate(e.id)}">Update</button>
              <button @click="${()=>this.handleDelete(e.id)}">Delete</button>
            </li>
          `))}
      </ul>
      <ul>
        ${this.electives.map((e=>p`
            <li><a href="/electives/${e.id}" >${e.name} </a>
            </li>
          `))}
      </ul>
    `}};z.styles=s`
    :host {
      display: block;
      border: solid 1px darkorange;
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
    .file-input-wrapper {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
    }

    .file-label {
      background-color: lightgrey;
      color: black;
      padding: 8px 12px;
      border-radius: 4px;
      cursor: pointer;
      margin-right: 10px;
      font-size: 14px;
      white-space: nowrap;
    }

    .file-input {
      display: none; /* Hide the default file input */
    }

    .file-name {
      font-size: 14px;
      color: #666;
    }
  `,R([g()],z.prototype,"electives",void 0),R([g()],z.prototype,"fileName",void 0),z=R([l("electives-admin")],z);var B=function(e,t,a,o){for(var i,n=arguments.length,s=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,a):o,l=e.length-1;l>=0;l--)(i=e[l])&&(s=(n<3?i(s):n>3?i(t,a,s):i(t,a))||s);return n>3&&s&&Object.defineProperty(t,a,s),s};const A=$(w({apiKey:"AIzaSyCGaJKzrUv_TgD97QLt-ydGPBbpCyCnrEw",authDomain:"peg-2035.firebaseapp.com",projectId:"peg-2035",storageBucket:"peg-2035.appspot.com",messagingSenderId:"1039825199205",appId:"1:1039825199205:web:44d7dfd0f6f970c0ee668c",measurementId:"G-FE9PXQ6LLX"}));let T=class extends r{constructor(){super(),this.electives=[],this.electives=[]}connectedCallback(){super.connectedCallback(),this.fetchElectives()}async fetchElectives(){try{const e=await m(h(A,"electives"));this.electives=e.docs.map((e=>e.id))}catch(e){console.error("Error fetching electives:",e)}}navigateToPage(e){const t=e.target.value;t&&(window.location.href=`/electives/${t}/`)}render(){return p`
      <select @change=${this.navigateToPage}>
        <option value="">-- Select an elective --</option>
        ${this.electives.map((e=>p`<option value="${e}">${e}</option>`))}
      </select>
    `}};T.styles=s`
    select {
      font-size: 16px;
      padding: 5px;
    }
  `,B([g()],T.prototype,"electives",void 0),T=B([l("elective-dropdown")],T);const M=h(u,"project");var H=function(e,t,a,o){for(var i,n=arguments.length,s=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,a):o,l=e.length-1;l>=0;l--)(i=e[l])&&(s=(n<3?i(s):n>3?i(t,a,s):i(t,a))||s);return n>3&&s&&Object.defineProperty(t,a,s),s};let K=class extends r{constructor(){super(...arguments),this.projects=[],this.electivesOptions=[],this.editingProjectId=null,this.formData={name:"",points:"",screenshotUrl:"",videoUrl:"",markdown:"",deploymentUrl:"",electives:[]}}firstUpdated(){this.loadProject(),this.loadElectives()}async loadProject(){this.projects=await(async()=>(await m(M)).docs.map((e=>({id:e.id,...e.data()}))))()}async loadElectives(){this.electivesOptions=await U()}handleInputChange(e){const t=e.target;"electives"===t.id?this.formData.electives=Array.from(t.selectedOptions).map((e=>e.value)):this.formData={...this.formData,[t.id]:t.value}}async handleCreateOrUpdate(){const{name:e,points:t,screenshotUrl:a,videoUrl:o,markdown:i,deploymentUrl:n,electives:s}=this.formData,l={name:e,points:parseInt(t,10),screenshotUrl:a,videoUrl:o,markdown:i,deploymentUrl:n,electives:s};this.editingProjectId?(await(async(e,t)=>{const a=j(M,e);return await P(a,t)})(this.editingProjectId,l),this.editingProjectId=null):await(async e=>{try{const t=await x(M,e);return console.log("Document successfully written with ID:",t.id),t}catch(e){throw console.error("Error creating project:",e),new Error(`Failed to create project: ${e.message}`)}})(l),this.clearForm(),this.loadProject()}async handleEdit(e){const t=this.projects.find((t=>t.id===e));t&&(this.editingProjectId=e,this.formData={name:t.name||"",points:t.points?.toString()||"",screenshotUrl:t.screenshotUrl||"",videoUrl:t.videoUrl||"",markdown:t.markdown||"",deploymentUrl:t.deploymentUrl||"",electives:t.electives||[]})}async handleDelete(e){await(async e=>{const t=j(M,e);return await D(t)})(e),this.loadProject()}clearForm(){this.formData={name:"",points:"",screenshotUrl:"",videoUrl:"",markdown:"",deploymentUrl:"",electives:[]}}render(){return p`
      <h3>${this.editingProjectId?"Edit Project":"Create New Project"}</h3>
      <input id="name" placeholder="Project Name" .value="${this.formData.name}" @input="${this.handleInputChange}" />
      <input id="points" type="number" placeholder="Points" .value="${this.formData.points}" @input="${this.handleInputChange}" />
      <input id="screenshotUrl" placeholder="Screenshot URL" .value="${this.formData.screenshotUrl}" @input="${this.handleInputChange}" />
      <input id="videoUrl" placeholder="Video URL" .value="${this.formData.videoUrl}" @input="${this.handleInputChange}" />
      <textarea id="markdown" placeholder="Markdown" .value="${this.formData.markdown}" @input="${this.handleInputChange}"></textarea>
      <input id="deploymentUrl" placeholder="Deployment URL" .value="${this.formData.deploymentUrl}" @input="${this.handleInputChange}" />

      <!-- Multi-select dropdown for electives -->
      <label for="electives">Electives</label>
      <select id="electives" multiple @change="${this.handleInputChange}">
        ${this.electivesOptions.map((e=>p`<option value="${e.id}" ?selected="${this.formData.electives.includes(e.id)}">${e.name}</option>`))}
      </select>

      <button @click="${this.handleCreateOrUpdate}">
        ${this.editingProjectId?"Update Project":"Create Project"}
      </button>

      <h3>Project List</h3>
      <ul>
        ${this.projects.map((e=>p`
            <li>
              ${e.name} - Points: ${e.points} - Screenshot: ${e.screenshotUrl}
              <button @click="${()=>this.handleEdit(e.id)}">Edit</button>
              <button @click="${()=>this.handleDelete(e.id)}">Delete</button>
            </li>
          `))}
      </ul>
    `}};K.styles=s`
    :host {
      display: block;
      border: solid 1px red;
      margin: 10px;
      padding: 16px;
    }
    input, textarea, select {
      display: block;
      margin-bottom: 10px;
    }
    button {
      margin: 5px;
    }
  `,H([g()],K.prototype,"projects",void 0),H([g()],K.prototype,"electivesOptions",void 0),H([g()],K.prototype,"editingProjectId",void 0),H([g()],K.prototype,"formData",void 0),K=H([l("a-project")],K);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var Q=function(e,t,a,o){for(var i,n=arguments.length,s=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,a):o,l=e.length-1;l>=0;l--)(i=e[l])&&(s=(n<3?i(s):n>3?i(t,a,s):i(t,a))||s);return n>3&&s&&Object.defineProperty(t,a,s),s};let X=class extends(k(r)){render(){return p`
      <div>
        ${I.get()?p`<p>Welcome, ${E.get()?.displayName}</p>
              <button @click="${C}">Sign Out</button>
              <h1>PEG - Portfolio Electives Game</h1>
              <my-upload-component></my-upload-component>
              <players-admin></players-admin>
              <a-project></a-project>
          <elective-dropdown></elective-dropdown>
          <electives-admin></electives-admin> `:p`<button @click="${O}">Sign in with Google</button>`}
      </div>
    `}};X.styles=s`
    :host {
      display: block;
      border: solid 1px gray;
      padding: 16px;
      max-width: 800px;
    }
  `,X=Q([l("peg-app")],X);export{X as PegApp};
