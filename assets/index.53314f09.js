var e=Object.defineProperty,t=Object.defineProperties,o=Object.getOwnPropertyDescriptors,n=Object.getOwnPropertySymbols,a=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable,s=(t,o,n)=>o in t?e(t,o,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[o]=n,c=(e,t)=>{for(var o in t||(t={}))a.call(t,o)&&s(e,o,t[o]);if(n)for(var o of n(t))r.call(t,o)&&s(e,o,t[o]);return e},l=(e,n)=>t(e,o(n));import{ah as u,aj as d,h as i,aI as p,aw as m,d as f,x as v,A as h,r as E,aN as y,m as b,aO as T,aP as w,w as g,aQ as S,aR as L,aS as k,aT as N,ag as A,a9 as C,an as M,aD as P,k as x,L as D,_ as F,n as O,i as R,C as I,J as _,K,U as Y,aU as j}from"./index.13804650.js";import{t as U,i as B}from"./event.e664c4c7.js";const H=e=>Array.from(e.querySelectorAll('a[href],button:not([disabled]),button:not([hidden]),:not([tabindex="-1"]),input:not([disabled]),input:not([type="hidden"]),select:not([disabled]),textarea:not([disabled])')).filter((e=>G(e)&&(e=>"fixed"!==getComputedStyle(e).position&&null!==e.offsetParent)(e))),G=e=>{if(e.tabIndex>0||0===e.tabIndex&&null!==e.getAttribute("tabIndex"))return!0;if(e.disabled)return!1;switch(e.nodeName){case"A":return!!e.href&&"ignore"!==e.rel;case"INPUT":return!("hidden"===e.type||"file"===e.type);case"BUTTON":case"SELECT":case"TEXTAREA":return!0;default:return!1}},J=function(e,t,...o){let n;n=t.includes("mouse")||t.includes("click")?"MouseEvents":t.includes("key")?"KeyboardEvent":"HTMLEvents";const a=document.createEvent(n);return a.initEvent(t,...o),e.dispatchEvent(a),e};let W;const z=e=>["",...d].includes(e);var $=(e=>(e[e.TEXT=1]="TEXT",e[e.CLASS=2]="CLASS",e[e.STYLE=4]="STYLE",e[e.PROPS=8]="PROPS",e[e.FULL_PROPS=16]="FULL_PROPS",e[e.HYDRATE_EVENTS=32]="HYDRATE_EVENTS",e[e.STABLE_FRAGMENT=64]="STABLE_FRAGMENT",e[e.KEYED_FRAGMENT=128]="KEYED_FRAGMENT",e[e.UNKEYED_FRAGMENT=256]="UNKEYED_FRAGMENT",e[e.NEED_PATCH=512]="NEED_PATCH",e[e.DYNAMIC_SLOTS=1024]="DYNAMIC_SLOTS",e[e.HOISTED=-1]="HOISTED",e[e.BAIL=-2]="BAIL",e))($||{});const q=e=>{const t=i(e)?e:[e],o=[];return t.forEach((e=>{i(e)?o.push(...q(e)):p(e)&&i(e.children)?o.push(...q(e.children)):o.push(e)})),o};var X={name:"en",el:{colorpicker:{confirm:"OK",clear:"Clear",defaultLabel:"color picker",description:"current color is {color}. press enter to select a new color."},datepicker:{now:"Now",today:"Today",cancel:"Cancel",clear:"Clear",confirm:"OK",dateTablePrompt:"Use the arrow keys and enter to select the day of the month",monthTablePrompt:"Use the arrow keys and enter to select the month",yearTablePrompt:"Use the arrow keys and enter to select the year",selectedDate:"Selected date",selectDate:"Select date",selectTime:"Select time",startDate:"Start Date",startTime:"Start Time",endDate:"End Date",endTime:"End Time",prevYear:"Previous Year",nextYear:"Next Year",prevMonth:"Previous Month",nextMonth:"Next Month",year:"",month1:"January",month2:"February",month3:"March",month4:"April",month5:"May",month6:"June",month7:"July",month8:"August",month9:"September",month10:"October",month11:"November",month12:"December",week:"week",weeks:{sun:"Sun",mon:"Mon",tue:"Tue",wed:"Wed",thu:"Thu",fri:"Fri",sat:"Sat"},weeksFull:{sun:"Sunday",mon:"Monday",tue:"Tuesday",wed:"Wednesday",thu:"Thursday",fri:"Friday",sat:"Saturday"},months:{jan:"Jan",feb:"Feb",mar:"Mar",apr:"Apr",may:"May",jun:"Jun",jul:"Jul",aug:"Aug",sep:"Sep",oct:"Oct",nov:"Nov",dec:"Dec"}},inputNumber:{decrease:"decrease number",increase:"increase number"},select:{loading:"Loading",noMatch:"No matching data",noData:"No data",placeholder:"Select"},dropdown:{toggleDropdown:"Toggle Dropdown"},cascader:{noMatch:"No matching data",loading:"Loading",placeholder:"Select",noData:"No data"},pagination:{goto:"Go to",pagesize:"/page",total:"Total {total}",pageClassifier:"",deprecationWarning:"Deprecated usages detected, please refer to the el-pagination documentation for more details"},dialog:{close:"Close this dialog"},drawer:{close:"Close this dialog"},messagebox:{title:"Message",confirm:"OK",cancel:"Cancel",error:"Illegal input",close:"Close this dialog"},upload:{deleteTip:"press delete to remove",delete:"Delete",preview:"Preview",continue:"Continue"},slider:{defaultLabel:"slider between {min} and {max}",defaultRangeStartLabel:"pick start value",defaultRangeEndLabel:"pick end value"},table:{emptyText:"No Data",confirmFilter:"Confirm",resetFilter:"Reset",clearFilter:"All",sumText:"Sum"},tree:{emptyText:"No Data"},transfer:{noMatch:"No matching data",noData:"No data",titles:["List 1","List 2"],filterPlaceholder:"Enter keyword",noCheckedFormat:"{total} items",hasCheckedFormat:"{checked}/{total} checked"},image:{error:"FAILED"},pageHeader:{title:"Back"},popconfirm:{confirmButtonText:"Yes",cancelButtonText:"No"}}};const V=e=>(t,o)=>Q(t,o,v(e)),Q=(e,t,o)=>y(o,e,e).replace(/\{(\w+)\}/g,((e,o)=>{var n;return`${null!=(n=null==t?void 0:t[o])?n:`{${o}}`}`})),Z=()=>{const e=m("locale");return(e=>({lang:f((()=>v(e).name)),locale:h(e)?e:E(e),t:V(e)}))(f((()=>e.value||X)))},ee=e=>{h(e)||U("[useLockscreen]","You need to pass a ref param to this function");const t=b("popup"),o=T((()=>t.bm("parent","hidden")));if(!u||w(document.body,o.value))return;let n=0,a=!1,r="0";const s=()=>{setTimeout((()=>{N(document.body,o.value),a&&(document.body.style.width=r)}),200)};g(e,(e=>{if(!e)return void s();a=!w(document.body,o.value),a&&(r=document.body.style.width),n=(e=>{var t;if(!u)return 0;if(void 0!==W)return W;const o=document.createElement("div");o.className=`${e}-scrollbar__wrap`,o.style.visibility="hidden",o.style.width="100px",o.style.position="absolute",o.style.top="-9999px",document.body.appendChild(o);const n=o.offsetWidth;o.style.overflow="scroll";const a=document.createElement("div");a.style.width="100%",o.appendChild(a);const r=a.offsetWidth;return null==(t=o.parentNode)||t.removeChild(o),W=n-r,W})(t.namespace.value);const c=document.documentElement.clientHeight<document.body.scrollHeight,l=S(document.body,"overflowY");n>0&&(c||"scroll"===l)&&a&&(document.body.style.width=`calc(100% - ${n}px)`),L(document.body,o.value)})),k((()=>s()))},te=e=>{if(!e)return{onClick:A,onMousedown:A,onMouseup:A};let t=!1,o=!1;return{onClick:n=>{t&&o&&e(n),t=o=!1},onMousedown:e=>{t=e.target===e.currentTarget},onMouseup:e=>{o=e.target===e.currentTarget}}};let oe=[];const ne=e=>{const t=e;t.key===P.esc&&oe.forEach((e=>e(t)))},ae={cancelable:!0,bubbles:!1},re={cancelable:!0,bubbles:!1},se=Symbol("elFocusTrap"),ce=E(),le=E(0),ue=E(0);let de=0;const ie=e=>{const t=[],o=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode:e=>{const t="INPUT"===e.tagName&&"hidden"===e.type;return e.disabled||e.hidden||t?NodeFilter.FILTER_SKIP:e.tabIndex>=0||e===document.activeElement?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}});for(;o.nextNode();)t.push(o.currentNode);return t},pe=(e,t)=>{for(const o of e)if(!me(o,t))return o},me=(e,t)=>{if("hidden"===getComputedStyle(e).visibility)return!0;for(;e;){if(t&&e===t)return!1;if("none"===getComputedStyle(e).display)return!0;e=e.parentElement}return!1},fe=(e,t)=>{if(e&&e.focus){const o=document.activeElement;e.focus({preventScroll:!0}),ue.value=window.performance.now(),e!==o&&(e=>e instanceof HTMLInputElement&&"select"in e)(e)&&t&&e.select()}};function ve(e,t){const o=[...e],n=e.indexOf(t);return-1!==n&&o.splice(n,1),o}const he=(()=>{let e=[];return{push:t=>{const o=e[0];o&&t!==o&&o.pause(),e=ve(e,t),e.unshift(t)},remove:t=>{var o,n;e=ve(e,t),null==(n=null==(o=e[0])?void 0:o.resume)||n.call(o)}}})(),Ee=()=>{ce.value="pointer",le.value=window.performance.now()},ye=()=>{ce.value="keyboard",le.value=window.performance.now()},be=e=>new CustomEvent("focus-trap.focusout-prevented",l(c({},re),{detail:e}));var Te=F(x({name:"ElFocusTrap",inheritAttrs:!1,props:{loop:Boolean,trapped:Boolean,focusTrapEl:Object,focusStartEl:{type:[Object,String],default:"first"}},emits:["focusAfterTrapped","focusAfterReleased","focusin","focusout","focusout-prevented","release-requested"],setup(e,{emit:t}){const o=E();let n,a;const{focusReason:r}=(C((()=>{0===de&&(document.addEventListener("mousedown",Ee),document.addEventListener("touchstart",Ee),document.addEventListener("keydown",ye)),de++})),M((()=>{de--,de<=0&&(document.removeEventListener("mousedown",Ee),document.removeEventListener("touchstart",Ee),document.removeEventListener("keydown",ye))})),{focusReason:ce,lastUserFocusTimestamp:le,lastAutomatedFocusTimestamp:ue});var s;s=o=>{e.trapped&&!d.paused&&t("release-requested",o)},C((()=>{0===oe.length&&document.addEventListener("keydown",ne),u&&oe.push(s)})),M((()=>{oe=oe.filter((e=>e!==s)),0===oe.length&&u&&document.removeEventListener("keydown",ne)}));const d={paused:!1,pause(){this.paused=!0},resume(){this.paused=!1}},i=o=>{if(!e.loop&&!e.trapped)return;if(d.paused)return;const{key:n,altKey:a,ctrlKey:s,metaKey:c,currentTarget:l,shiftKey:u}=o,{loop:i}=e,p=n===P.tab&&!a&&!s&&!c,m=document.activeElement;if(p&&m){const e=l,[n,a]=(e=>{const t=ie(e);return[pe(t,e),pe(t.reverse(),e)]})(e);if(n&&a)if(u||m!==a){if(u&&[n,e].includes(m)){const e=be({focusReason:r.value});t("focusout-prevented",e),e.defaultPrevented||(o.preventDefault(),i&&fe(a,!0))}}else{const e=be({focusReason:r.value});t("focusout-prevented",e),e.defaultPrevented||(o.preventDefault(),i&&fe(n,!0))}else if(m===e){const e=be({focusReason:r.value});t("focusout-prevented",e),e.defaultPrevented||o.preventDefault()}}};D(se,{focusTrapRef:o,onKeydown:i}),g((()=>e.focusTrapEl),(e=>{e&&(o.value=e)}),{immediate:!0}),g([o],(([e],[t])=>{e&&(e.addEventListener("keydown",i),e.addEventListener("focusin",f),e.addEventListener("focusout",h)),t&&(t.removeEventListener("keydown",i),t.removeEventListener("focusin",f),t.removeEventListener("focusout",h))}));const p=e=>{t("focusAfterTrapped",e)},m=e=>t("focusAfterReleased",e),f=r=>{const s=v(o);if(!s)return;const c=r.target,l=r.relatedTarget,u=c&&s.contains(c);if(!e.trapped){l&&s.contains(l)||(n=l)}u&&t("focusin",r),d.paused||e.trapped&&(u?a=c:fe(a,!0))},h=n=>{const s=v(o);if(!d.paused&&s)if(e.trapped){const o=n.relatedTarget;B(o)||s.contains(o)||setTimeout((()=>{if(!d.paused&&e.trapped){const e=be({focusReason:r.value});t("focusout-prevented",e),e.defaultPrevented||fe(a,!0)}}),0)}else{const e=n.target;e&&s.contains(e)||t("focusout",n)}};function y(){return t=this,a=null,r=function*(){yield O();const t=v(o);if(t){he.push(d);const o=t.contains(document.activeElement)?n:document.activeElement;if(n=o,!t.contains(o)){const n=new Event("focus-trap.focus-after-trapped",ae);t.addEventListener("focus-trap.focus-after-trapped",p),t.dispatchEvent(n),n.defaultPrevented||O((()=>{let n=e.focusStartEl;R(n)||(fe(n),document.activeElement!==n&&(n="first")),"first"===n&&((e,t=!1)=>{const o=document.activeElement;for(const n of e)if(fe(n,t),document.activeElement!==o)return})(ie(t),!0),document.activeElement!==o&&"container"!==n||fe(t)}))}}},new Promise(((e,o)=>{var n=e=>{try{c(r.next(e))}catch(t){o(t)}},s=e=>{try{c(r.throw(e))}catch(t){o(t)}},c=t=>t.done?e(t.value):Promise.resolve(t.value).then(n,s);c((r=r.apply(t,a)).next())}));var t,a,r}function b(){const e=v(o);if(e){e.removeEventListener("focus-trap.focus-after-trapped",p);const t=new CustomEvent("focus-trap.focus-after-released",l(c({},ae),{detail:{focusReason:r.value}}));e.addEventListener("focus-trap.focus-after-released",m),e.dispatchEvent(t),t.defaultPrevented||"keyboard"!=r.value&&le.value>ue.value||fe(null!=n?n:document.body,!0),e.removeEventListener("focus-trap.focus-after-released",p),he.remove(d)}}return C((()=>{e.trapped&&y(),g((()=>e.trapped),(e=>{e?y():b()}))})),M((()=>{e.trapped&&b()})),{onKeydown:i}}}),[["render",function(e,t,o,n,a,r){return I(e.$slots,"default",{handleKeydown:e.onKeydown})}],["__file","/home/runner/work/element-plus/element-plus/packages/components/focus-trap/src/focus-trap.vue"]]);const we=x({name:"ElOverlay",props:_({mask:{type:Boolean,default:!0},customMaskEvent:{type:Boolean,default:!1},overlayClass:{type:K([String,Array,Object])},zIndex:{type:K([String,Number])}}),emits:{click:e=>e instanceof MouseEvent},setup(e,{slots:t,emit:o}){const n=b("overlay"),{onClick:a,onMousedown:r,onMouseup:s}=te(e.customMaskEvent?void 0:e=>{o("click",e)});return()=>e.mask?Y("div",{class:[n.b(),e.overlayClass],style:{zIndex:e.zIndex},onClick:a,onMousedown:r,onMouseup:s},[I(t,"default")],$.STYLE|$.CLASS|$.PROPS,["onClick","onMouseup","onMousedown"]):j("div",{class:e.overlayClass,style:{zIndex:e.zIndex,position:"fixed",top:"0px",right:"0px",bottom:"0px",left:"0px"}},[I(t,"default")])}});export{Te as E,se as F,we as a,ee as b,te as c,q as f,z as i,H as o,J as t,Z as u};