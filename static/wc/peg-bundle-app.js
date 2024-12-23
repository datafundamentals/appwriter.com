import{c as e,d as t,a as r,g as a,b as o,u as i,e as s,r as n,x as l,i as c,t as d,n as h,f as p,E as m,h as v,j as f,k as u,l as b,s as y,m as g}from"./auth-CQzytyle.js";import{_ as x,e as w,a as _,E as C,m as I,o as k}from"./peg-bundle-electives-admin-CBfXx4yf.js";import"./peg-players-admin-D8J_3siM.js";import{g as A}from"./electives-BIoKeor6.js";const P=e(t,"project");
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class $ extends n{connectedCallback(){super.connectedCallback(),this.setAttribute("aria-hidden","true")}render(){return l`<span class="shadow"></span>`}}
/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const z=c`:host,.shadow,.shadow::before,.shadow::after{border-radius:inherit;inset:0;position:absolute;transition-duration:inherit;transition-property:inherit;transition-timing-function:inherit}:host{display:flex;pointer-events:none;transition-property:box-shadow,opacity}.shadow::before,.shadow::after{content:"";transition-property:box-shadow,opacity;--_level: var(--md-elevation-level, 0);--_shadow-color: var(--md-elevation-shadow-color, var(--md-sys-color-shadow, #000))}.shadow::before{box-shadow:0px calc(1px*(clamp(0,var(--_level),1) + clamp(0,var(--_level) - 3,1) + 2*clamp(0,var(--_level) - 4,1))) calc(1px*(2*clamp(0,var(--_level),1) + clamp(0,var(--_level) - 2,1) + clamp(0,var(--_level) - 4,1))) 0px var(--_shadow-color);opacity:.3}.shadow::after{box-shadow:0px calc(1px*(clamp(0,var(--_level),1) + clamp(0,var(--_level) - 1,1) + 2*clamp(0,var(--_level) - 2,3))) calc(1px*(3*clamp(0,var(--_level),2) + 2*clamp(0,var(--_level) - 2,3))) calc(1px*(clamp(0,var(--_level),4) + 2*clamp(0,var(--_level) - 4,1))) var(--_shadow-color);opacity:.15}
`
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */;let U=class extends ${};U.styles=[z],U=x([d("md-elevation")],U);
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const E=Symbol("attachableController");let N;N=new MutationObserver((e=>{for(const t of e)t.target[E]?.hostConnected()}));class D{get htmlFor(){return this.host.getAttribute("for")}set htmlFor(e){null===e?this.host.removeAttribute("for"):this.host.setAttribute("for",e)}get control(){return this.host.hasAttribute("for")?this.htmlFor&&this.host.isConnected?this.host.getRootNode().querySelector(`#${this.htmlFor}`):null:this.currentControl||this.host.parentElement}set control(e){e?this.attach(e):this.detach()}constructor(e,t){this.host=e,this.onControlChange=t,this.currentControl=null,e.addController(this),e[E]=this,N?.observe(e,{attributeFilter:["for"]})}attach(e){e!==this.currentControl&&(this.setCurrentControl(e),this.host.removeAttribute("for"))}detach(){this.setCurrentControl(null),this.host.setAttribute("for","")}hostConnected(){this.setCurrentControl(this.control)}hostDisconnected(){this.setCurrentControl(null)}setCurrentControl(e){this.onControlChange(this.currentControl,e),this.currentControl=e}}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const R=["focusin","focusout","pointerdown"];class j extends n{constructor(){super(...arguments),this.visible=!1,this.inward=!1,this.attachableController=new D(this,this.onControlChange.bind(this))}get htmlFor(){return this.attachableController.htmlFor}set htmlFor(e){this.attachableController.htmlFor=e}get control(){return this.attachableController.control}set control(e){this.attachableController.control=e}attach(e){this.attachableController.attach(e)}detach(){this.attachableController.detach()}connectedCallback(){super.connectedCallback(),this.setAttribute("aria-hidden","true")}handleEvent(e){if(!e[S]){switch(e.type){default:return;case"focusin":this.visible=this.control?.matches(":focus-visible")??!1;break;case"focusout":case"pointerdown":this.visible=!1}e[S]=!0}}onControlChange(e,t){for(const r of R)e?.removeEventListener(r,this),t?.addEventListener(r,this)}update(e){e.has("visible")&&this.dispatchEvent(new Event("visibility-changed")),super.update(e)}}x([h({type:Boolean,reflect:!0})],j.prototype,"visible",void 0),x([h({type:Boolean,reflect:!0})],j.prototype,"inward",void 0);const S=Symbol("handledByFocusRing"),T=c`:host{animation-delay:0s,calc(var(--md-focus-ring-duration, 600ms)*.25);animation-duration:calc(var(--md-focus-ring-duration, 600ms)*.25),calc(var(--md-focus-ring-duration, 600ms)*.75);animation-timing-function:cubic-bezier(0.2, 0, 0, 1);box-sizing:border-box;color:var(--md-focus-ring-color, var(--md-sys-color-secondary, #625b71));display:none;pointer-events:none;position:absolute}:host([visible]){display:flex}:host(:not([inward])){animation-name:outward-grow,outward-shrink;border-end-end-radius:calc(var(--md-focus-ring-shape-end-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));border-end-start-radius:calc(var(--md-focus-ring-shape-end-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));border-start-end-radius:calc(var(--md-focus-ring-shape-start-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));border-start-start-radius:calc(var(--md-focus-ring-shape-start-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));inset:calc(-1*var(--md-focus-ring-outward-offset, 2px));outline:var(--md-focus-ring-width, 3px) solid currentColor}:host([inward]){animation-name:inward-grow,inward-shrink;border-end-end-radius:calc(var(--md-focus-ring-shape-end-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border-end-start-radius:calc(var(--md-focus-ring-shape-end-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border-start-end-radius:calc(var(--md-focus-ring-shape-start-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border-start-start-radius:calc(var(--md-focus-ring-shape-start-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border:var(--md-focus-ring-width, 3px) solid currentColor;inset:var(--md-focus-ring-inward-offset, 0px)}@keyframes outward-grow{from{outline-width:0}to{outline-width:var(--md-focus-ring-active-width, 8px)}}@keyframes outward-shrink{from{outline-width:var(--md-focus-ring-active-width, 8px)}}@keyframes inward-grow{from{border-width:0}to{border-width:var(--md-focus-ring-active-width, 8px)}}@keyframes inward-shrink{from{border-width:var(--md-focus-ring-active-width, 8px)}}@media(prefers-reduced-motion){:host{animation:none}}
`
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */;
/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let O=class extends j{};O.styles=[T],O=x([d("md-focus-ring")],O);var L;!function(e){e[e.INACTIVE=0]="INACTIVE",e[e.TOUCH_DELAY=1]="TOUCH_DELAY",e[e.HOLDING=2]="HOLDING",e[e.WAITING_FOR_CLICK=3]="WAITING_FOR_CLICK"}(L||(L={}));const F=["click","contextmenu","pointercancel","pointerdown","pointerenter","pointerleave","pointerup"],G=window.matchMedia("(forced-colors: active)");class M extends n{constructor(){super(...arguments),this.disabled=!1,this.hovered=!1,this.pressed=!1,this.rippleSize="",this.rippleScale="",this.initialSize=0,this.state=L.INACTIVE,this.checkBoundsAfterContextMenu=!1,this.attachableController=new D(this,this.onControlChange.bind(this))}get htmlFor(){return this.attachableController.htmlFor}set htmlFor(e){this.attachableController.htmlFor=e}get control(){return this.attachableController.control}set control(e){this.attachableController.control=e}attach(e){this.attachableController.attach(e)}detach(){this.attachableController.detach()}connectedCallback(){super.connectedCallback(),this.setAttribute("aria-hidden","true")}render(){const e={hovered:this.hovered,pressed:this.pressed};return l`<div class="surface ${_(e)}"></div>`}update(e){e.has("disabled")&&this.disabled&&(this.hovered=!1,this.pressed=!1),super.update(e)}handlePointerenter(e){this.shouldReactToEvent(e)&&(this.hovered=!0)}handlePointerleave(e){this.shouldReactToEvent(e)&&(this.hovered=!1,this.state!==L.INACTIVE&&this.endPressAnimation())}handlePointerup(e){if(this.shouldReactToEvent(e)){if(this.state!==L.HOLDING)return this.state===L.TOUCH_DELAY?(this.state=L.WAITING_FOR_CLICK,void this.startPressAnimation(this.rippleStartEvent)):void 0;this.state=L.WAITING_FOR_CLICK}}async handlePointerdown(e){if(this.shouldReactToEvent(e)){if(this.rippleStartEvent=e,!this.isTouch(e))return this.state=L.WAITING_FOR_CLICK,void this.startPressAnimation(e);this.checkBoundsAfterContextMenu&&!this.inBounds(e)||(this.checkBoundsAfterContextMenu=!1,this.state=L.TOUCH_DELAY,await new Promise((e=>{setTimeout(e,150)})),this.state===L.TOUCH_DELAY&&(this.state=L.HOLDING,this.startPressAnimation(e)))}}handleClick(){this.disabled||(this.state!==L.WAITING_FOR_CLICK?this.state===L.INACTIVE&&(this.startPressAnimation(),this.endPressAnimation()):this.endPressAnimation())}handlePointercancel(e){this.shouldReactToEvent(e)&&this.endPressAnimation()}handleContextmenu(){this.disabled||(this.checkBoundsAfterContextMenu=!0,this.endPressAnimation())}determineRippleSize(){const{height:e,width:t}=this.getBoundingClientRect(),r=Math.max(e,t),a=Math.max(.35*r,75),o=Math.floor(.2*r),i=Math.sqrt(t**2+e**2)+10;this.initialSize=o,this.rippleScale=""+(i+a)/o,this.rippleSize=`${o}px`}getNormalizedPointerEventCoords(e){const{scrollX:t,scrollY:r}=window,{left:a,top:o}=this.getBoundingClientRect(),i=t+a,s=r+o,{pageX:n,pageY:l}=e;return{x:n-i,y:l-s}}getTranslationCoordinates(e){const{height:t,width:r}=this.getBoundingClientRect(),a={x:(r-this.initialSize)/2,y:(t-this.initialSize)/2};let o;return o=e instanceof PointerEvent?this.getNormalizedPointerEventCoords(e):{x:r/2,y:t/2},o={x:o.x-this.initialSize/2,y:o.y-this.initialSize/2},{startPoint:o,endPoint:a}}startPressAnimation(e){if(!this.mdRoot)return;this.pressed=!0,this.growAnimation?.cancel(),this.determineRippleSize();const{startPoint:t,endPoint:r}=this.getTranslationCoordinates(e),a=`${t.x}px, ${t.y}px`,o=`${r.x}px, ${r.y}px`;this.growAnimation=this.mdRoot.animate({top:[0,0],left:[0,0],height:[this.rippleSize,this.rippleSize],width:[this.rippleSize,this.rippleSize],transform:[`translate(${a}) scale(1)`,`translate(${o}) scale(${this.rippleScale})`]},{pseudoElement:"::after",duration:450,easing:C.STANDARD,fill:"forwards"})}async endPressAnimation(){this.rippleStartEvent=void 0,this.state=L.INACTIVE;const e=this.growAnimation;let t=1/0;"number"==typeof e?.currentTime?t=e.currentTime:e?.currentTime&&(t=e.currentTime.to("ms").value),t>=225?this.pressed=!1:(await new Promise((e=>{setTimeout(e,225-t)})),this.growAnimation===e&&(this.pressed=!1))}shouldReactToEvent(e){if(this.disabled||!e.isPrimary)return!1;if(this.rippleStartEvent&&this.rippleStartEvent.pointerId!==e.pointerId)return!1;if("pointerenter"===e.type||"pointerleave"===e.type)return!this.isTouch(e);const t=1===e.buttons;return this.isTouch(e)||t}inBounds({x:e,y:t}){const{top:r,left:a,bottom:o,right:i}=this.getBoundingClientRect();return e>=a&&e<=i&&t>=r&&t<=o}isTouch({pointerType:e}){return"touch"===e}async handleEvent(e){if(!G?.matches)switch(e.type){case"click":this.handleClick();break;case"contextmenu":this.handleContextmenu();break;case"pointercancel":this.handlePointercancel(e);break;case"pointerdown":await this.handlePointerdown(e);break;case"pointerenter":this.handlePointerenter(e);break;case"pointerleave":this.handlePointerleave(e);break;case"pointerup":this.handlePointerup(e)}}onControlChange(e,t){for(const r of F)e?.removeEventListener(r,this),t?.addEventListener(r,this)}}x([h({type:Boolean,reflect:!0})],M.prototype,"disabled",void 0),x([p()],M.prototype,"hovered",void 0),x([p()],M.prototype,"pressed",void 0),x([w(".surface")],M.prototype,"mdRoot",void 0);
/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const B=c`:host{display:flex;margin:auto;pointer-events:none}:host([disabled]){display:none}@media(forced-colors: active){:host{display:none}}:host,.surface{border-radius:inherit;position:absolute;inset:0;overflow:hidden}.surface{-webkit-tap-highlight-color:rgba(0,0,0,0)}.surface::before,.surface::after{content:"";opacity:0;position:absolute}.surface::before{background-color:var(--md-ripple-hover-color, var(--md-sys-color-on-surface, #1d1b20));inset:0;transition:opacity 15ms linear,background-color 15ms linear}.surface::after{background:radial-gradient(closest-side, var(--md-ripple-pressed-color, var(--md-sys-color-on-surface, #1d1b20)) max(100% - 70px, 65%), transparent 100%);transform-origin:center center;transition:opacity 375ms linear}.hovered::before{background-color:var(--md-ripple-hover-color, var(--md-sys-color-on-surface, #1d1b20));opacity:var(--md-ripple-hover-opacity, 0.08)}.pressed::after{opacity:var(--md-ripple-pressed-opacity, 0.12);transition-duration:105ms}
`
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */;let H=class extends M{};H.styles=[B],H=x([d("md-ripple")],H);
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const K=I(n);class V extends K{constructor(){super(...arguments),this.size="medium",this.label="",this.lowered=!1}render(){const{ariaLabel:e}=this;return l`
      <button
        class="fab ${_(this.getRenderClasses())}"
        aria-label=${e||m}>
        <md-elevation part="elevation"></md-elevation>
        <md-focus-ring part="focus-ring"></md-focus-ring>
        <md-ripple class="ripple"></md-ripple>
        ${this.renderTouchTarget()} ${this.renderIcon()} ${this.renderLabel()}
      </button>
    `}getRenderClasses(){const e=!!this.label;return{lowered:this.lowered,small:"small"===this.size&&!e,large:"large"===this.size&&!e,extended:e}}renderTouchTarget(){return l`<div class="touch-target"></div>`}renderLabel(){return this.label?l`<span class="label">${this.label}</span>`:""}renderIcon(){const{ariaLabel:e}=this;return l`<span class="icon">
      <slot
        name="icon"
        aria-hidden=${e||this.label?"true":m}>
        <span></span>
      </slot>
    </span>`}}V.shadowRootOptions={mode:"open",delegatesFocus:!0},x([h({reflect:!0})],V.prototype,"size",void 0),x([h()],V.prototype,"label",void 0),x([h({type:Boolean})],V.prototype,"lowered",void 0);
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class W extends V{constructor(){super(...arguments),this.variant="surface"}getRenderClasses(){return{...super.getRenderClasses(),primary:"primary"===this.variant,secondary:"secondary"===this.variant,tertiary:"tertiary"===this.variant}}}x([h()],W.prototype,"variant",void 0);
/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const q=c`:host{--_container-color: var(--md-fab-container-color, var(--md-sys-color-surface-container-high, #ece6f0));--_container-elevation: var(--md-fab-container-elevation, 3);--_container-height: var(--md-fab-container-height, 56px);--_container-shadow-color: var(--md-fab-container-shadow-color, var(--md-sys-color-shadow, #000));--_container-width: var(--md-fab-container-width, 56px);--_focus-container-elevation: var(--md-fab-focus-container-elevation, 3);--_focus-icon-color: var(--md-fab-focus-icon-color, var(--md-sys-color-primary, #6750a4));--_hover-container-elevation: var(--md-fab-hover-container-elevation, 4);--_hover-icon-color: var(--md-fab-hover-icon-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-color: var(--md-fab-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-opacity: var(--md-fab-hover-state-layer-opacity, 0.08);--_icon-color: var(--md-fab-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-size: var(--md-fab-icon-size, 24px);--_lowered-container-color: var(--md-fab-lowered-container-color, var(--md-sys-color-surface-container-low, #f7f2fa));--_lowered-container-elevation: var(--md-fab-lowered-container-elevation, 1);--_lowered-focus-container-elevation: var(--md-fab-lowered-focus-container-elevation, 1);--_lowered-hover-container-elevation: var(--md-fab-lowered-hover-container-elevation, 2);--_lowered-pressed-container-elevation: var(--md-fab-lowered-pressed-container-elevation, 1);--_pressed-container-elevation: var(--md-fab-pressed-container-elevation, 3);--_pressed-icon-color: var(--md-fab-pressed-icon-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-color: var(--md-fab-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-opacity: var(--md-fab-pressed-state-layer-opacity, 0.12);--_focus-label-text-color: var(--md-fab-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_hover-label-text-color: var(--md-fab-hover-label-text-color, var(--md-sys-color-primary, #6750a4));--_label-text-color: var(--md-fab-label-text-color, var(--md-sys-color-primary, #6750a4));--_label-text-font: var(--md-fab-label-text-font, var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-fab-label-text-line-height, var(--md-sys-typescale-label-large-line-height, 1.25rem));--_label-text-size: var(--md-fab-label-text-size, var(--md-sys-typescale-label-large-size, 0.875rem));--_label-text-weight: var(--md-fab-label-text-weight, var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)));--_large-container-height: var(--md-fab-large-container-height, 96px);--_large-container-width: var(--md-fab-large-container-width, 96px);--_large-icon-size: var(--md-fab-large-icon-size, 36px);--_pressed-label-text-color: var(--md-fab-pressed-label-text-color, var(--md-sys-color-primary, #6750a4));--_primary-container-color: var(--md-fab-primary-container-color, var(--md-sys-color-primary-container, #eaddff));--_primary-focus-icon-color: var(--md-fab-primary-focus-icon-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-focus-label-text-color: var(--md-fab-primary-focus-label-text-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-hover-icon-color: var(--md-fab-primary-hover-icon-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-hover-label-text-color: var(--md-fab-primary-hover-label-text-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-hover-state-layer-color: var(--md-fab-primary-hover-state-layer-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-icon-color: var(--md-fab-primary-icon-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-label-text-color: var(--md-fab-primary-label-text-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-pressed-icon-color: var(--md-fab-primary-pressed-icon-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-pressed-label-text-color: var(--md-fab-primary-pressed-label-text-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-pressed-state-layer-color: var(--md-fab-primary-pressed-state-layer-color, var(--md-sys-color-on-primary-container, #21005d));--_secondary-container-color: var(--md-fab-secondary-container-color, var(--md-sys-color-secondary-container, #e8def8));--_secondary-focus-icon-color: var(--md-fab-secondary-focus-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-focus-label-text-color: var(--md-fab-secondary-focus-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-hover-icon-color: var(--md-fab-secondary-hover-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-hover-label-text-color: var(--md-fab-secondary-hover-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-hover-state-layer-color: var(--md-fab-secondary-hover-state-layer-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-icon-color: var(--md-fab-secondary-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-label-text-color: var(--md-fab-secondary-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-pressed-icon-color: var(--md-fab-secondary-pressed-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-pressed-label-text-color: var(--md-fab-secondary-pressed-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-pressed-state-layer-color: var(--md-fab-secondary-pressed-state-layer-color, var(--md-sys-color-on-secondary-container, #1d192b));--_small-container-height: var(--md-fab-small-container-height, 40px);--_small-container-width: var(--md-fab-small-container-width, 40px);--_small-icon-size: var(--md-fab-small-icon-size, 24px);--_tertiary-container-color: var(--md-fab-tertiary-container-color, var(--md-sys-color-tertiary-container, #ffd8e4));--_tertiary-focus-icon-color: var(--md-fab-tertiary-focus-icon-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-focus-label-text-color: var(--md-fab-tertiary-focus-label-text-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-hover-icon-color: var(--md-fab-tertiary-hover-icon-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-hover-label-text-color: var(--md-fab-tertiary-hover-label-text-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-hover-state-layer-color: var(--md-fab-tertiary-hover-state-layer-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-icon-color: var(--md-fab-tertiary-icon-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-label-text-color: var(--md-fab-tertiary-label-text-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-pressed-icon-color: var(--md-fab-tertiary-pressed-icon-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-pressed-label-text-color: var(--md-fab-tertiary-pressed-label-text-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-pressed-state-layer-color: var(--md-fab-tertiary-pressed-state-layer-color, var(--md-sys-color-on-tertiary-container, #31111d));--_container-shape-start-start: var(--md-fab-container-shape-start-start, var(--md-fab-container-shape, var(--md-sys-shape-corner-large, 16px)));--_container-shape-start-end: var(--md-fab-container-shape-start-end, var(--md-fab-container-shape, var(--md-sys-shape-corner-large, 16px)));--_container-shape-end-end: var(--md-fab-container-shape-end-end, var(--md-fab-container-shape, var(--md-sys-shape-corner-large, 16px)));--_container-shape-end-start: var(--md-fab-container-shape-end-start, var(--md-fab-container-shape, var(--md-sys-shape-corner-large, 16px)));--_large-container-shape-start-start: var(--md-fab-large-container-shape-start-start, var(--md-fab-large-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));--_large-container-shape-start-end: var(--md-fab-large-container-shape-start-end, var(--md-fab-large-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));--_large-container-shape-end-end: var(--md-fab-large-container-shape-end-end, var(--md-fab-large-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));--_large-container-shape-end-start: var(--md-fab-large-container-shape-end-start, var(--md-fab-large-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));--_small-container-shape-start-start: var(--md-fab-small-container-shape-start-start, var(--md-fab-small-container-shape, var(--md-sys-shape-corner-medium, 12px)));--_small-container-shape-start-end: var(--md-fab-small-container-shape-start-end, var(--md-fab-small-container-shape, var(--md-sys-shape-corner-medium, 12px)));--_small-container-shape-end-end: var(--md-fab-small-container-shape-end-end, var(--md-fab-small-container-shape, var(--md-sys-shape-corner-medium, 12px)));--_small-container-shape-end-start: var(--md-fab-small-container-shape-end-start, var(--md-fab-small-container-shape, var(--md-sys-shape-corner-medium, 12px)));cursor:pointer}:host([size=small][touch-target=wrapper]){margin:max(0px,48px - var(--_small-container-height))}.fab{cursor:inherit}.fab .icon ::slotted(*){color:var(--_icon-color)}.fab:focus{color:var(--_focus-icon-color)}.fab:hover{color:var(--_hover-icon-color)}.fab:active{color:var(--_pressed-icon-color)}.fab.primary{background-color:var(--_primary-container-color);--md-ripple-hover-color: var(--_primary-hover-state-layer-color);--md-ripple-pressed-color: var(--_primary-pressed-state-layer-color)}.fab.primary .icon ::slotted(*){color:var(--_primary-icon-color)}.fab.primary:focus{color:var(--_primary-focus-icon-color)}.fab.primary:hover{color:var(--_primary-hover-icon-color)}.fab.primary:active{color:var(--_primary-pressed-icon-color)}.fab.primary .label{color:var(--_primary-label-text-color)}.fab:hover .fab.primary .label{color:var(--_primary-hover-label-text-color)}.fab:focus .fab.primary .label{color:var(--_primary-focus-label-text-color)}.fab:active .fab.primary .label{color:var(--_primary-pressed-label-text-color)}.fab.secondary{background-color:var(--_secondary-container-color);--md-ripple-hover-color: var(--_secondary-hover-state-layer-color);--md-ripple-pressed-color: var(--_secondary-pressed-state-layer-color)}.fab.secondary .icon ::slotted(*){color:var(--_secondary-icon-color)}.fab.secondary:focus{color:var(--_secondary-focus-icon-color)}.fab.secondary:hover{color:var(--_secondary-hover-icon-color)}.fab.secondary:active{color:var(--_secondary-pressed-icon-color)}.fab.secondary .label{color:var(--_secondary-label-text-color)}.fab:hover .fab.secondary .label{color:var(--_secondary-hover-label-text-color)}.fab:focus .fab.secondary .label{color:var(--_secondary-focus-label-text-color)}.fab:active .fab.secondary .label{color:var(--_secondary-pressed-label-text-color)}.fab.tertiary{background-color:var(--_tertiary-container-color);--md-ripple-hover-color: var(--_tertiary-hover-state-layer-color);--md-ripple-pressed-color: var(--_tertiary-pressed-state-layer-color)}.fab.tertiary .icon ::slotted(*){color:var(--_tertiary-icon-color)}.fab.tertiary:focus{color:var(--_tertiary-focus-icon-color)}.fab.tertiary:hover{color:var(--_tertiary-hover-icon-color)}.fab.tertiary:active{color:var(--_tertiary-pressed-icon-color)}.fab.tertiary .label{color:var(--_tertiary-label-text-color)}.fab:hover .fab.tertiary .label{color:var(--_tertiary-hover-label-text-color)}.fab:focus .fab.tertiary .label{color:var(--_tertiary-focus-label-text-color)}.fab:active .fab.tertiary .label{color:var(--_tertiary-pressed-label-text-color)}.fab.extended slot span{padding-inline-start:4px}.fab.small{width:var(--_small-container-width);height:var(--_small-container-height)}.fab.small .icon ::slotted(*){width:var(--_small-icon-size);height:var(--_small-icon-size);font-size:var(--_small-icon-size)}.fab.small,.fab.small .ripple{border-start-start-radius:var(--_small-container-shape-start-start);border-start-end-radius:var(--_small-container-shape-start-end);border-end-start-radius:var(--_small-container-shape-end-start);border-end-end-radius:var(--_small-container-shape-end-end)}.fab.small md-focus-ring{--md-focus-ring-shape-start-start: var(--_small-container-shape-start-start);--md-focus-ring-shape-start-end: var(--_small-container-shape-start-end);--md-focus-ring-shape-end-end: var(--_small-container-shape-end-end);--md-focus-ring-shape-end-start: var(--_small-container-shape-end-start)}
`,Y=c`@media(forced-colors: active){.fab{border:1px solid ButtonText}.fab.extended{padding-inline-start:15px;padding-inline-end:19px}md-focus-ring{--md-focus-ring-outward-offset: 3px}}
`,X=c`:host{--md-ripple-hover-opacity: var(--_hover-state-layer-opacity);--md-ripple-pressed-opacity: var(--_pressed-state-layer-opacity);display:inline-flex;-webkit-tap-highlight-color:rgba(0,0,0,0)}:host([size=medium][touch-target=wrapper]){margin:max(0px,48px - var(--_container-height))}:host([size=large][touch-target=wrapper]){margin:max(0px,48px - var(--_large-container-height))}.fab,.icon,.icon ::slotted(*){display:flex}.fab{align-items:center;justify-content:center;vertical-align:middle;padding:0;position:relative;height:var(--_container-height);transition-property:background-color;border-width:0px;outline:none;z-index:0;text-transform:inherit;--md-elevation-level: var(--_container-elevation);--md-elevation-shadow-color: var(--_container-shadow-color);background-color:var(--_container-color);--md-ripple-hover-color: var(--_hover-state-layer-color);--md-ripple-pressed-color: var(--_pressed-state-layer-color)}.fab.extended{width:inherit;box-sizing:border-box;padding-inline-start:16px;padding-inline-end:20px}.fab:not(.extended){width:var(--_container-width)}.fab.large{width:var(--_large-container-width);height:var(--_large-container-height)}.fab.large .icon ::slotted(*){width:var(--_large-icon-size);height:var(--_large-icon-size);font-size:var(--_large-icon-size)}.fab.large,.fab.large .ripple{border-start-start-radius:var(--_large-container-shape-start-start);border-start-end-radius:var(--_large-container-shape-start-end);border-end-start-radius:var(--_large-container-shape-end-start);border-end-end-radius:var(--_large-container-shape-end-end)}.fab.large md-focus-ring{--md-focus-ring-shape-start-start: var(--_large-container-shape-start-start);--md-focus-ring-shape-start-end: var(--_large-container-shape-start-end);--md-focus-ring-shape-end-end: var(--_large-container-shape-end-end);--md-focus-ring-shape-end-start: var(--_large-container-shape-end-start)}.fab:focus{--md-elevation-level: var(--_focus-container-elevation)}.fab:hover{--md-elevation-level: var(--_hover-container-elevation)}.fab:active{--md-elevation-level: var(--_pressed-container-elevation)}.fab.lowered{background-color:var(--_lowered-container-color);--md-elevation-level: var(--_lowered-container-elevation)}.fab.lowered:focus{--md-elevation-level: var(--_lowered-focus-container-elevation)}.fab.lowered:hover{--md-elevation-level: var(--_lowered-hover-container-elevation)}.fab.lowered:active{--md-elevation-level: var(--_lowered-pressed-container-elevation)}.fab .label{color:var(--_label-text-color)}.fab:hover .fab .label{color:var(--_hover-label-text-color)}.fab:focus .fab .label{color:var(--_focus-label-text-color)}.fab:active .fab .label{color:var(--_pressed-label-text-color)}.label{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-family:var(--_label-text-font);font-size:var(--_label-text-size);line-height:var(--_label-text-line-height);font-weight:var(--_label-text-weight)}.fab.extended .icon ::slotted(*){margin-inline-end:12px}.ripple{overflow:hidden}.ripple,md-elevation{z-index:-1}.touch-target{position:absolute;top:50%;height:48px;left:50%;width:48px;transform:translate(-50%, -50%)}:host([touch-target=none]) .touch-target{display:none}md-elevation,.fab{transition-duration:280ms;transition-timing-function:cubic-bezier(0.2, 0, 0, 1)}.fab,.ripple{border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end)}md-focus-ring{--md-focus-ring-shape-start-start: var(--_container-shape-start-start);--md-focus-ring-shape-start-end: var(--_container-shape-start-end);--md-focus-ring-shape-end-end: var(--_container-shape-end-end);--md-focus-ring-shape-end-start: var(--_container-shape-end-start)}.icon ::slotted(*){width:var(--_icon-size);height:var(--_icon-size);font-size:var(--_icon-size)}
`
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */;
/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let J=class extends W{};J.styles=[X,q,Y],J=x([d("md-fab")],J);
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class Q extends n{render(){return l`<slot></slot>`}connectedCallback(){super.connectedCallback();"false"!==this.getAttribute("aria-hidden")?this.setAttribute("aria-hidden","true"):this.removeAttribute("aria-hidden")}}
/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Z=c`:host{font-size:var(--md-icon-size, 24px);width:var(--md-icon-size, 24px);height:var(--md-icon-size, 24px);color:inherit;font-variation-settings:inherit;font-weight:400;font-family:var(--md-icon-font, Material Symbols Outlined);display:inline-flex;font-style:normal;place-items:center;place-content:center;line-height:1;overflow:hidden;letter-spacing:normal;text-transform:none;user-select:none;white-space:nowrap;word-wrap:normal;flex-shrink:0;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale}::slotted(svg){fill:currentColor}::slotted(*){height:100%;width:100%}
`
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */;let ee=class extends Q{};
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
function te(e,t=ne){const r=oe(e,t);return r&&(r.tabIndex=0,r.focus()),r}function re(e,t=ne){const r=function(e,t=ne){for(let r=e.length-1;r>=0;r--){const a=e[r];if(t(a))return a}return null}(e,t);return r&&(r.tabIndex=0,r.focus()),r}function ae(e,t=ne){for(let r=0;r<e.length;r++){const a=e[r];if(0===a.tabIndex&&t(a))return{item:a,index:r}}return null}function oe(e,t=ne){for(const r of e)if(t(r))return r;return null}function ie(e,t,r=ne,a=!0){if(t){const o=function(e,t,r=ne,a=!0){for(let o=1;o<e.length;o++){const i=(o+t)%e.length;if(i<t&&!a)return null;const s=e[i];if(r(s))return s}return e[t]?e[t]:null}(e,t.index,r,a);return o&&(o.tabIndex=0,o.focus()),o}return te(e,r)}function se(e,t,r=ne,a=!0){if(t){const o=function(e,t,r=ne,a=!0){for(let o=1;o<e.length;o++){const i=(t-o+e.length)%e.length;if(i>t&&!a)return null;const s=e[i];if(r(s))return s}return e[t]?e[t]:null}(e,t.index,r,a);return o&&(o.tabIndex=0,o.focus()),o}return re(e,r)}function ne(e){return!e.disabled}
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ee.styles=[Z],ee=x([d("md-icon")],ee);const le={ArrowDown:"ArrowDown",ArrowLeft:"ArrowLeft",ArrowUp:"ArrowUp",ArrowRight:"ArrowRight",Home:"Home",End:"End"};class ce{constructor(e){this.handleKeydown=e=>{const t=e.key;if(e.defaultPrevented||!this.isNavigableKey(t))return;const r=this.items;if(!r.length)return;const a=ae(r,this.isActivatable);e.preventDefault();const o=this.isRtl();let i=null;switch(t){case le.ArrowDown:case o?le.ArrowLeft:le.ArrowRight:i=ie(r,a,this.isActivatable,this.wrapNavigation());break;case le.ArrowUp:case o?le.ArrowRight:le.ArrowLeft:i=se(r,a,this.isActivatable,this.wrapNavigation());break;case le.Home:i=te(r,this.isActivatable);break;case le.End:i=re(r,this.isActivatable)}i&&a&&a.item!==i&&(a.item.tabIndex=-1)},this.onDeactivateItems=()=>{const e=this.items;for(const t of e)this.deactivateItem(t)},this.onRequestActivation=e=>{this.onDeactivateItems();const t=e.target;this.activateItem(t),t.focus()},this.onSlotchange=()=>{const e=this.items;let t=!1;for(const r of e){!(!r.disabled&&r.tabIndex>-1)||t?r.tabIndex=-1:(t=!0,r.tabIndex=0)}if(t)return;const r=oe(e,this.isActivatable);r&&(r.tabIndex=0)};const{isItem:t,getPossibleItems:r,isRtl:a,deactivateItem:o,activateItem:i,isNavigableKey:s,isActivatable:n,wrapNavigation:l}=e;this.isItem=t,this.getPossibleItems=r,this.isRtl=a,this.deactivateItem=o,this.activateItem=i,this.isNavigableKey=s,this.isActivatable=n,this.wrapNavigation=l??(()=>!0)}get items(){const e=this.getPossibleItems(),t=[];for(const r of e){if(this.isItem(r)){t.push(r);continue}const e=r.item;e&&this.isItem(e)&&t.push(e)}return t}activateNextItem(){const e=this.items,t=ae(e,this.isActivatable);return t&&(t.item.tabIndex=-1),ie(e,t,this.isActivatable,this.wrapNavigation())}activatePreviousItem(){const e=this.items,t=ae(e,this.isActivatable);return t&&(t.item.tabIndex=-1),se(e,t,this.isActivatable,this.wrapNavigation())}}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const de=new Set(Object.values(le));class he extends n{get items(){return this.listController.items}constructor(){super(),this.listController=new ce({isItem:e=>e.hasAttribute("md-list-item"),getPossibleItems:()=>this.slotItems,isRtl:()=>"rtl"===getComputedStyle(this).direction,deactivateItem:e=>{e.tabIndex=-1},activateItem:e=>{e.tabIndex=0},isNavigableKey:e=>de.has(e),isActivatable:e=>!e.disabled&&"text"!==e.type}),this.internals=this.attachInternals(),this.internals.role="list",this.addEventListener("keydown",this.listController.handleKeydown)}render(){return l`
      <slot
        @deactivate-items=${this.listController.onDeactivateItems}
        @request-activation=${this.listController.onRequestActivation}
        @slotchange=${this.listController.onSlotchange}>
      </slot>
    `}activateNextItem(){return this.listController.activateNextItem()}activatePreviousItem(){return this.listController.activatePreviousItem()}}x([k({flatten:!0})],he.prototype,"slotItems",void 0);
/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const pe=c`:host{background:var(--md-list-container-color, var(--md-sys-color-surface, #fef7ff));color:unset;display:flex;flex-direction:column;outline:none;padding:8px 0;position:relative}
`
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */;let me=class extends he{};me.styles=[pe],me=x([d("md-list")],me);var ve=function(e,t,r,a){for(var o,i=arguments.length,s=i<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,r):a,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(i<3?o(s):i>3?o(t,r,s):o(t,r))||s);return i>3&&s&&Object.defineProperty(t,r,s),s};let fe=class extends n{constructor(){super(),this.formData={name:"",image:"",video:"",app:"",markdown:""},this.resourceGraph={name:"",images:[],videos:[],app:void 0,markdown:""}}handleInputChange(e){const t=e.target,r=t.name,a=t.value;if(t.id,"images"===r||"videos"===r||"app"===r)try{console.log("WOULDA SET SOME VALUE SOMEWHERE "+a)}catch{console.error(`Invalid URL provided for ${r}: ${a}`),this.resourceGraph[r]=void 0}else this.resourceGraph[r]=a,this.formData={...this.formData,[t.id]:t.value};this.requestUpdate()}handleImageUrlUpdate(e,t){console.log(e,t)}handleAutoResize(e){const t=e.target;if("md-outlined-text-field"===t.tagName.toLowerCase()){const e=t.shadowRoot?.querySelector("textarea");e&&(e.style.width="500px",e.style.height="auto",e.style.height=`${e.scrollHeight}px`)}}clearForm(){this.formData={name:"",image:"",video:"",app:"",markdown:""}}render(){return l`
      <div id="name">${this.formData.name?this.formData.name:"Name Here"}
      </div>
      <uploaded-link
        collectionName="player"
        documentName="project"
        formFieldName="Screen Shot"
        @image-url-updated="${e=>this.handleImageUrlUpdate("image",e.detail.imageUrl)}">
      </uploaded-link>
      <uploaded-link
        collectionName="player"
        documentName="project"
        formFieldName="Video Demo"
        @image-url-updated="${e=>this.handleImageUrlUpdate("video",e.detail.imageUrl)}">
      </uploaded-link>
      <uploaded-link
        collectionName="player"
        documentName="project"
        formFieldName="Deployment Link"
        @image-url-updated="${e=>this.handleImageUrlUpdate("app",e.detail.imageUrl)}">
      </uploaded-link>
      <md-outlined-text-field
        id="markdown"
        label="Markdown"
        type="textarea"
        placeholder="Paste in Markdown text"
        value="${this.formData.markdown}"
        @input="${e=>{this.handleInputChange(e),this.handleAutoResize(e)}}"
      ></md-outlined-text-field>
    `}};fe.styles=c`
    :host {
      display: block;
      margin: 10px;
      padding: 16px;
      border: solid 5px green;
      border-radius: 20px;
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
  `,ve([p()],fe.prototype,"formData",void 0),ve([p()],fe.prototype,"resourceGraph",void 0),fe=ve([d("awr-resource-documenter")],fe);var ue=function(e,t,r,a){for(var o,i=arguments.length,s=i<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,r):a,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(i<3?o(s):i>3?o(t,r,s):o(t,r))||s);return i>3&&s&&Object.defineProperty(t,r,s),s};let be=class extends n{constructor(){super(...arguments),this.projects=[],this.electivesOptions=[],this.editingProjectId=null,this.formData={name:"",points:"",screenshotUrl:"",videoUrl:"",markdown:"",deploymentUrl:"",electives:[]}}firstUpdated(){this.loadProject(),this.loadElectives()}async loadProject(){this.projects=await(async()=>(await a(P)).docs.map((e=>({id:e.id,...e.data()}))))()}async loadElectives(){this.electivesOptions=await A()}handleInputChange(e){const t=e.target;if("electives"===t.id){const e=Array.from(t.selectedOptions).map((e=>e.value));this.formData={...this.formData,electives:e}}else this.formData={...this.formData,[t.id]:t.value}}async handleCreateOrUpdate(){const{name:e,points:t,screenshotUrl:a,videoUrl:s,markdown:n,deploymentUrl:l,electives:c}=this.formData,d={name:e,points:parseInt(t,10),screenshotUrl:a,videoUrl:s,markdown:n,deploymentUrl:l,electives:c};this.editingProjectId?(await(async(e,t)=>{const r=o(P,e);return await i(r,t)})(this.editingProjectId,d),this.editingProjectId=null):await(async e=>{try{const t=await r(P,e);return console.log("Document successfully written with ID:",t.id),t}catch(e){throw console.error("Error creating project:",e),new Error(`Failed to create project: ${e.message}`)}})(d),this.clearForm(),this.loadProject()}async handleEdit(e){const t=this.projects.find((t=>t.id===e));t&&(this.editingProjectId=e,this.formData={name:t.name||"",points:t.points?.toString()||"",screenshotUrl:t.screenshotUrl||"",videoUrl:t.videoUrl||"",markdown:t.markdown||"",deploymentUrl:t.deploymentUrl||"",electives:t.electives||[]})}async handleDelete(e){await(async e=>{const t=o(P,e);return await s(t)})(e),this.loadProject()}handleImageUrlUpdate(e,t){this.formData={...this.formData,[e]:t}}handleAutoResize(e){const t=e.target;if("md-outlined-text-field"===t.tagName.toLowerCase()){const e=t.shadowRoot?.querySelector("textarea");e&&(e.style.width="500px",e.style.height="auto",e.style.height=`${e.scrollHeight}px`)}}clearForm(){this.formData={name:"",points:"",screenshotUrl:"",videoUrl:"",markdown:"",deploymentUrl:"",electives:[]}}render(){return l`
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
        ${this.electivesOptions.map((e=>l`
            ${this.formData.electives.includes(e.id)?l`
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
        ${this.electivesOptions.map((e=>l`
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
        ${this.projects.map((e=>l`
            <li>
              ${e.name} - Points: ${e.points} - Screenshot: ${e.screenshotUrl}
              <button @click="${()=>this.handleEdit(e.id)}">Edit</button>
              <button @click="${()=>this.handleDelete(e.id)}">Delete</button>
            </li>
          `))}
      </ul>
    `}};be.styles=c`
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
  `,ue([p()],be.prototype,"projects",void 0),ue([p()],be.prototype,"electivesOptions",void 0),ue([p()],be.prototype,"editingProjectId",void 0),ue([p()],be.prototype,"formData",void 0),be=ue([d("peg-player")],be);const ye=v(null);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ge=function(e,t,r,a){for(var o,i=arguments.length,s=i<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,r):a,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(i<3?o(s):i>3?o(t,r,s):o(t,r))||s);return i>3&&s&&Object.defineProperty(t,r,s),s};let xe=class extends(f(n)){constructor(){super(...arguments),this.playerGraph=ye.get()}render(){return l`
      <div>
        ${u.get()?l`<p>Welcome, ${b.get()?.displayName}</p>
          <button @click="${y}">Sign Out</button>
          ${this.playerGraph?l`
            <div>${this.playerGraph.user.displayName}</div>`:""}
          <peg-player></peg-player>`:l`
            <button @click="${g}">Sign in with Google</button>`}
      </div>
    `}};xe.styles=c`
    :host {
      display: block;
      padding: 16px;
      max-width: 800px;
    }
  `,ge([p()],xe.prototype,"playerGraph",void 0),xe=ge([d("peg-bundle-app")],xe);export{xe as PegBundleApp};
