import{i as e,r as t,t as o,f as a,x as i}from"./auth-5Jcf1-eo.js";import{a as n,c as l,u as s,d as r}from"./electives-_lAmuQAN.js";import"./awr-upload-link-C_S2919y.js";import"./upload-DPbCruYq.js";var c=function(e,t,o,a){for(var i,n=arguments.length,l=n<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,o):a,s=e.length-1;s>=0;s--)(i=e[s])&&(l=(n<3?i(l):n>3?i(t,o,l):i(t,o))||l);return n>3&&l&&Object.defineProperty(t,o,l),l};let d=class extends a{constructor(){super(...arguments),this.electives=[],this.fileName="No screenshot chosen"}connectedCallback(){super.connectedCallback(),this.loadElectives()}async loadElectives(){this.electives=await n()}async handleCreate(){if(this.shadowRoot){const e=this.shadowRoot.getElementById("name").value,t="(this.shadowRoot.getElementById('screenShot') as HTMLInputElement).value;",o=this.shadowRoot.getElementById("creationDate").value,a=parseInt(this.shadowRoot.getElementById("points").value);await l({name:e,screenShot:t,creationDate:o,points:a}),this.loadElectives()}}async handleUpdate(e){const t={points:parseInt(prompt("Points:","0")||"0")};await s(e,t),console.log(e),this.loadElectives()}async handleDelete(e){await r(e),console.log(e),this.loadElectives()}render(){return i`
      <h3>You Probbaly Dont Want to Create New Elective Here</h3>
      <p>Problem is, i think this competes with the 'src/util/synchElectives' functionality so you better test both and eliminate one - i think the other is dominant??? Check and see</p>
      <p> On the other hand, some portion of this may be useful. Again, more research before taking action.</p>
      <input id="name" placeholder="Name" />
      <input id="creationDate" type="date" placeholder="Creation Date" />
      <input id="points" type="number" placeholder="Points Awarded" />

      <input id="uploaded" placeholder="UploadedURL" />
      <uploaded-link collectionName="elective" documentName="bar" formFieldName="yada" ></uploaded-link>
      <button @click="${this.handleCreate}">Create Electives</button>

      <h3>Electives List</h3>
      <ul>
        ${this.electives.map((e=>i`
            <li>
              ${e.name} - Due: ${e.creationDate}
              ${e.screenShot?'"'+e.screenShot+'": Screen Shot':" "}- Points: ${e.points}
              <button @click="${()=>this.handleUpdate(e.id)}">Update</button>
              <button @click="${()=>this.handleDelete(e.id)}">Delete</button>
            </li>
          `))}
      </ul>
      <ul>
        ${this.electives.map((e=>i`
            <li><a href="/electives/${e.id}" >${e.name} </a>
            </li>
          `))}
      </ul>
    `}};d.styles=e`
    :host {
      display: block;
      border: solid 20px darkorange;
      border-radius: 5px;
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
  `,c([t()],d.prototype,"electives",void 0),c([t()],d.prototype,"fileName",void 0),d=c([o("peg-bundle-electives-admin")],d);export{d as PegBundleElectivesAdmin};
