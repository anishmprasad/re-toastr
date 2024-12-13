"use strict";var P=Object.defineProperty;var I=(n,o,t)=>o in n?P(n,o,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[o]=t;var a=(n,o,t)=>I(n,typeof o!="symbol"?o+"":o,t);Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});const M=require("react-dom"),k=require("react"),p=require("react-spring");function q(n){const o=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(n){for(const t in n)if(t!=="default"){const e=Object.getOwnPropertyDescriptor(n,t);Object.defineProperty(o,t,e.get?e:{enumerable:!0,get:()=>n[t]})}}return o.default=n,Object.freeze(o)}const s=q(k);function D(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var c={},E;function B(){if(E)return c;E=1;var n=M;return c.createRoot=n.createRoot,c.hydrateRoot=n.hydrateRoot,c}var F=B();const L=D(F),Y=({id:n,title:o,onClose:t,close:e})=>s.createElement("div",{id:n,className:"Toaster__alert"},typeof o=="string"?s.createElement("div",{className:"Toaster__alert_text"},o):s.cloneElement(o,{onClose:t}),t&&e&&s.createElement($,{onClose:t})),$=({onClose:n})=>s.createElement("button",{className:"Toaster__alert_close",type:"button","aria-label":"Close",onClick:n},"X");function z(n,o){const t=s.useRef();s.useEffect(()=>{t.current=n},[n]),s.useEffect(()=>{function e(){t.current&&t.current()}if(o!==null){let r=setTimeout(e,o);return()=>clearTimeout(r)}},[o])}const V={top:"top","top-left":"top-left","top-right":"top-right",bottom:"bottom","bottom-left":"bottom-left","bottom-right":"bottom-right"},W=n=>{let o={display:"flex",flexDirection:"column",alignItems:"center"};return n.includes("right")?o.alignItems="flex-end":n.includes("left")&&(o.alignItems="flex-start"),o},X=({id:n,message:o,position:t,onRequestRemove:e,requestClose:r=!1,duration:i=3e4,onClose:f=!0})=>{const l=s.useRef(null),[v,g]=s.useState(i),[b,T]=s.useState(!0),_=t==="top-left"||t==="top-right"||t==="top";z(m,v);const R={config:{mass:1,tension:185,friction:26},from:{opacity:1,height:0,transform:`translateY(${_?"-100%":0}) scale(1)`},enter:()=>d=>d({opacity:1,height:l.current.getBoundingClientRect().height,transform:"translateY(0) scale(1)"}),leave:{opacity:0,height:0,transform:"translateY(0 scale(0.9)"},onRest:x},N=p.useTransition(b,null,R),O=s.useMemo(()=>W(t),[t]);function w(){g(null)}function C(){g(i)}function x(){b||e()}function m(){T(!1)}s.useEffect(()=>{r&&T(!1)},[r]);function A(){return typeof o=="string"||s.isValidElement(o)?s.createElement(Y,{id:n,title:o,onClose:m,close:f}):typeof o=="function"?o({id:n,onClose:m}):null}return s.createElement(s.Fragment,null,N.map(({key:d,item:j,props:h})=>j&&s.createElement(p.animated.div,{key:d,className:"Toaster__message",onMouseEnter:w,onMouseLeave:C,style:{opacity:h.opacity,height:h.height,...O}},s.createElement(p.animated.div,{style:{transform:h.transform,pointerEvents:"auto"},ref:l,className:"Toaster__message-wrapper"},A()))))},G={top:[],"top-left":[],"top-right":[],"bottom-left":[],bottom:[],"bottom-right":[]},u=class u extends s.Component{constructor(t){super(t);a(this,"state",G);a(this,"notify",(t,e)=>{const r=this.createToastState(t,e),{position:i}=r,f=i.includes("top");return this.setState(l=>({...l,[i]:f?[r,...l[i]]:[...l[i],r]})),{id:r.id,position:r.position}});a(this,"closeAll",()=>{Object.keys(this.state).forEach(t=>{const e=t;this.state[e].forEach(i=>{this.closeToast(i.id,e)})})});a(this,"createToastState",(t,e)=>{const r=++u.idCounter,i=e.hasOwnProperty("position")&&typeof e.position=="string"?e.position:"top";return{id:r,message:t,position:i,showing:!0,duration:typeof e.duration>"u"?5e3:e.duration,onRequestRemove:()=>this.removeToast(String(r),i),type:e.type,onClose:e.close}});a(this,"closeToast",(t,e)=>{this.setState(r=>({...r,[e]:r[e].map(i=>i.id!==t?i:{...i,requestClose:!0})}))});a(this,"removeToast",(t,e)=>{this.setState(r=>({...r,[e]:r[e].filter(i=>i.id!==t)}))});a(this,"getStyle",t=>{let e={maxWidth:"560px",position:"fixed",zIndex:105500,pointerEvents:"none"};return(t==="top"||t==="bottom")&&(e.margin="0 auto",e.textAlign="center"),t.includes("top")&&(e.top=0),t.includes("bottom")&&(e.bottom=0),t.includes("left")||(e.right=0),t.includes("right")||(e.left=0),e});t.notify(this.notify,this.closeAll,this.closeToast)}render(){return Object.keys(this.state).map(t=>{const e=t,r=this.state[e];return s.createElement("span",{key:t,className:"Toaster__manager-"+e,style:this.getStyle(e)},r.map(i=>s.createElement(X,{position:e,key:i.id,...i})))})}};a(u,"idCounter",0);let y=u;const H=typeof window<"u"&&typeof window.document<"u",S="toast";class J{constructor(){a(this,"createNotification",()=>{});a(this,"removeAll",()=>{});a(this,"closeToast",()=>{});a(this,"closeAll",()=>{this.removeAll&&this.removeAll()});a(this,"bindNotify",(o,t,e)=>{this.createNotification=o,this.removeAll=t,this.closeToast=e});a(this,"notify",(o,t={})=>{if(this.createNotification)return this.createNotification(o,t)});a(this,"close",(o,t)=>{this.closeToast&&this.closeToast(o,t)});if(!H)return;let o;const t=document.getElementById(S);if(t)o=t;else{const r=document.createElement("div");r.id=S,r.className="Toaster",document.body!=null&&document.body.appendChild(r),o=r}L.createRoot(o).render(s.createElement(y,{notify:this.bindNotify}))}}const K=new J;exports.Position=V;exports.default=K;