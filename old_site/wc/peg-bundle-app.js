import{c as e,d as t,a as i,g as a,b as o,u as l,e as r,i as s,r as n,t as d,f as c,x as p,h as m,j as h,k as u,l as g,s as y,m as v}from"./auth-5Jcf1-eo.js";import"./awr-upload-link-C_S2919y.js";import"./peg-players-admin-BL-jqiLd.js";import"./peg-bundle-electives-admin.js";import{g as f}from"./electives-_lAmuQAN.js";import"./awr-resource-documenter-B4jJ5FZJ.js";import"./upload-DPbCruYq.js";const j=e(t,"project");var b=function(e,t,i,a){for(var o,l=arguments.length,r=l<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a,s=e.length-1;s>=0;s--)(o=e[s])&&(r=(l<3?o(r):l>3?o(t,i,r):o(t,i))||r);return l>3&&r&&Object.defineProperty(t,i,r),r};let U=class extends c{constructor(){super(...arguments),this.projects=[],this.electivesOptions=[],this.editingProjectId=null,this.formData={name:"",points:"",screenshotUrl:"",videoUrl:"",markdown:"",deploymentUrl:"",electives:[]}}firstUpdated(){this.loadProject(),this.loadElectives()}async loadProject(){this.projects=await(async()=>(await a(j)).docs.map((e=>({id:e.id,...e.data()}))))()}async loadElectives(){this.electivesOptions=await f()}handleInputChange(e){const t=e.target;if("electives"===t.id){const e=Array.from(t.selectedOptions).map((e=>e.value));this.formData={...this.formData,electives:e}}else this.formData={...this.formData,[t.id]:t.value}}async handleCreateOrUpdate(){const{name:e,points:t,screenshotUrl:a,videoUrl:r,markdown:s,deploymentUrl:n,electives:d}=this.formData,c={name:e,points:parseInt(t,10),screenshotUrl:a,videoUrl:r,markdown:s,deploymentUrl:n,electives:d};this.editingProjectId?(await(async(e,t)=>{const i=o(j,e);return await l(i,t)})(this.editingProjectId,c),this.editingProjectId=null):await(async e=>{try{const t=await i(j,e);return console.log("Document successfully written with ID:",t.id),t}catch(e){throw console.error("Error creating project:",e),new Error(`Failed to create project: ${e.message}`)}})(c),this.clearForm(),this.loadProject()}async handleEdit(e){const t=this.projects.find((t=>t.id===e));t&&(this.editingProjectId=e,this.formData={name:t.name||"",points:t.points?.toString()||"",screenshotUrl:t.screenshotUrl||"",videoUrl:t.videoUrl||"",markdown:t.markdown||"",deploymentUrl:t.deploymentUrl||"",electives:t.electives||[]})}async handleDelete(e){await(async e=>{const t=o(j,e);return await r(t)})(e),this.loadProject()}handleImageUrlUpdate(e,t){this.formData={...this.formData,[e]:t}}handleAutoResize(e){const t=e.target;if("md-outlined-text-field"===t.tagName.toLowerCase()){const e=t.shadowRoot?.querySelector("textarea");e&&(e.style.width="500px",e.style.height="auto",e.style.height=`${e.scrollHeight}px`)}}clearForm(){this.formData={name:"",points:"",screenshotUrl:"",videoUrl:"",markdown:"",deploymentUrl:"",electives:[]}}render(){return p`
      <h3>${this.editingProjectId?"Edit Project":"Create New Project"}</h3>
      <md-outlined-text-field id="name" label="Project Name" value="${this.formData.name}"
                            @input="${this.handleInputChange}">
      </md-outlined-text-field>
      <md-outlined-text-field label="Points" id="points" type="number" placeholder="Points"
                            value="${this.formData.points}"
                            @input="${this.handleInputChange}">
      </md-outlined-text-field>
      <uploaded-link
        collectionName="player"
        documentName="project"
        formFieldName="Screen Shot"
        @image-url-updated="${e=>this.handleImageUrlUpdate("screenshotUrl",e.detail.imageUrl)}">
      </uploaded-link>
      <uploaded-link
        collectionName="player"
        documentName="project"
        formFieldName="Video Demo"
        @image-url-updated="${e=>this.handleImageUrlUpdate("videoUrl",e.detail.imageUrl)}">
      </uploaded-link>
      <uploaded-link
        collectionName="player"
        documentName="project"
        formFieldName="Deployment Link"
        @image-url-updated="${e=>this.handleImageUrlUpdate("deploymentUrl",e.detail.imageUrl)}">
      </uploaded-link>
      <md-outlined-text-field
        id="markdown"
        label="Project Markdown"
        type="textarea"
        placeholder="Paste in Markdown text"
        value="${this.formData.markdown}"
        @input="${e=>{this.handleInputChange(e),this.handleAutoResize(e)}}"
      ></md-outlined-text-field>
      <awr-resource-documenter></awr-resource-documenter>
      <div id="electiveUpdater">TRY MEl</div>
      <label for="chosenElectivesList">ChosenElectives</label>
      <md-list id="chosenElectivesList" style="max-width: 300px;">
        ${this.electivesOptions.map((e=>p`
            ${this.formData.electives.includes(e.id)?p`
                <md-list-item
                  @click="${()=>this.shadowRoot.getElementById("electiveUpdater").textContent=e.name}">
                  ${e.name}
                </md-list-item>
              `:""}
          `))}
      </md-list>

      <br>
      <label for="electives">Electives - Choose All</label>
      <select id="electives" multiple @change="${this.handleInputChange}">
        ${this.electivesOptions.map((e=>p`
            <option value="${e.id}" ?selected="${this.formData.electives.includes(e.id)}">
              ${e.name}
            </option>`))}
      </select>
      <md-fab @click="${this.handleCreateOrUpdate}" label="Submit"
              aria-label=${this.editingProjectId?"Update Project":"Create Project"}>
        <md-icon slot="icon">^</md-icon>
      </md-fab>
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
    `}};U.styles=s`
    :host {
      display: block;
      margin: 10px;
      padding: 16px;
      --md-list-container-color: #f4fbfa;
      --md-list-item-label-text-color: #161d1d;
      --md-list-item-supporting-text-color: #3f4948;
      --md-list-item-trailing-supporting-text-color: #3f4948;
      --md-list-item-label-text-font: system-ui;
      --md-list-item-supporting-text-font: system-ui;
      --md-list-item-trailing-supporting-text-font: system-ui;
    }

    input, textarea, select {
      display: block;
      margin-bottom: 10px;
      border-radius: 5px;
    }

    md-list {
      border: solid 1px;
      margin: 3px;
      padding: 3px;
      border-radius: 5px;
    }

    button {
      margin: 5px;
    }
  `,b([n()],U.prototype,"projects",void 0),b([n()],U.prototype,"electivesOptions",void 0),b([n()],U.prototype,"editingProjectId",void 0),b([n()],U.prototype,"formData",void 0),U=b([d("peg-player")],U);const w=m(null);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var x=function(e,t,i,a){for(var o,l=arguments.length,r=l<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a,s=e.length-1;s>=0;s--)(o=e[s])&&(r=(l<3?o(r):l>3?o(t,i,r):o(t,i))||r);return l>3&&r&&Object.defineProperty(t,i,r),r};let $=class extends(h(c)){constructor(){super(...arguments),this.playerGraph=w.get()}render(){return p`
      <div>
        ${u.get()?p`<p>Welcome, ${g.get()?.displayName}</p>
          <button @click="${y}">Sign Out</button>
          ${this.playerGraph?p`
            <div>${this.playerGraph.user.displayName}</div>`:""}
          <peg-player></peg-player>`:p`
            <button @click="${v}">Sign in with Google</button>`}
      </div>
    `}};$.styles=s`
    :host {
      display: block;
      padding: 16px;
      max-width: 800px;
    }
  `,x([n()],$.prototype,"playerGraph",void 0),$=x([d("peg-bundle-app")],$);export{$ as PegBundleApp};
