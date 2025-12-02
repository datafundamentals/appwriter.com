var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@df/ui-lit/df-chat-widget';
let DfChatApp = class DfChatApp extends LitElement {
    static { this.styles = css `
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: clamp(1.5rem, 4vw, 3rem);
      background: radial-gradient(circle at top, rgba(59, 130, 246, 0.12), transparent 55%),
        var(--md-sys-color-surface, #f8fafc);
      box-sizing: border-box;
    }

    .shell {
      width: min(440px, 100%);
      display: flex;
      justify-content: center;
    }
  `; }
    render() {
        return html `
      <div class="shell">
        <df-chat-widget heading="df chat"></df-chat-widget>
      </div>
    `;
    }
};
DfChatApp = __decorate([
    customElement('df-chat-app')
], DfChatApp);
export { DfChatApp };
//# sourceMappingURL=df-chat-app.js.map