function Cr(e,t){const n=Object.create(null),a=e.split(",");for(let o=0;o<a.length;o++)n[a[o]]=!0;return t?o=>!!n[o.toLowerCase()]:o=>!!n[o]}const Ie={},Rn=[],Tt=()=>{},Qd=()=>!1,Aa=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&(e.charCodeAt(2)>122||e.charCodeAt(2)<97),Mr=e=>e.startsWith("onUpdate:"),qe=Object.assign,jr=(e,t)=>{const n=e.indexOf(t);n>-1&&e.splice(n,1)},Fd=Object.prototype.hasOwnProperty,he=(e,t)=>Fd.call(e,t),ee=Array.isArray,ra=e=>_o(e)==="[object Map]",Hd=e=>_o(e)==="[object Set]",oe=e=>typeof e=="function",ce=e=>typeof e=="string",mo=e=>typeof e=="symbol",Pe=e=>e!==null&&typeof e=="object",pi=e=>(Pe(e)||oe(e))&&oe(e.then)&&oe(e.catch),zd=Object.prototype.toString,_o=e=>zd.call(e),Ud=e=>_o(e).slice(8,-1),Wd=e=>_o(e)==="[object Object]",Jr=e=>ce(e)&&e!=="NaN"&&e[0]!=="-"&&""+parseInt(e,10)===e,la=Cr(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),fo=e=>{const t=Object.create(null);return n=>t[n]||(t[n]=e(n))},Gd=/-(\w)/g,dt=fo(e=>e.replace(Gd,(t,n)=>n?n.toUpperCase():"")),Kd=/\B([A-Z])/g,zn=fo(e=>e.replace(Kd,"-$1").toLowerCase()),wa=fo(e=>e.charAt(0).toUpperCase()+e.slice(1)),Co=fo(e=>e?`on${wa(e)}`:""),mn=(e,t)=>!Object.is(e,t),Mo=(e,t)=>{for(let n=0;n<e.length;n++)e[n](t)},ao=(e,t,n)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,value:n})},Xd=e=>{const t=parseFloat(e);return isNaN(t)?e:t},Zd=e=>{const t=ce(e)?Number(e):NaN;return isNaN(t)?e:t};let Cl;const cr=()=>Cl||(Cl=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function go(e){if(ee(e)){const t={};for(let n=0;n<e.length;n++){const a=e[n],o=ce(a)?n0(a):go(a);if(o)for(const l in o)t[l]=o[l]}return t}else if(ce(e)||Pe(e))return e}const Yd=/;(?![^(]*\))/g,e0=/:([^]+)/,t0=/\/\*[^]*?\*\//g;function n0(e){const t={};return e.replace(t0,"").split(Yd).forEach(n=>{if(n){const a=n.split(e0);a.length>1&&(t[a[0].trim()]=a[1].trim())}}),t}function bo(e){let t="";if(ce(e))t=e;else if(ee(e))for(let n=0;n<e.length;n++){const a=bo(e[n]);a&&(t+=a+" ")}else if(Pe(e))for(const n in e)e[n]&&(t+=n+" ");return t.trim()}function u3(e){if(!e)return null;let{class:t,style:n}=e;return t&&!ce(t)&&(e.class=bo(t)),n&&(e.style=go(n)),e}const a0="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",o0=Cr(a0);function vi(e){return!!e||e===""}let Ze;class r0{constructor(t=!1){this.detached=t,this._active=!0,this.effects=[],this.cleanups=[],this.parent=Ze,!t&&Ze&&(this.index=(Ze.scopes||(Ze.scopes=[])).push(this)-1)}get active(){return this._active}run(t){if(this._active){const n=Ze;try{return Ze=this,t()}finally{Ze=n}}}on(){Ze=this}off(){Ze=this.parent}stop(t){if(this._active){let n,a;for(n=0,a=this.effects.length;n<a;n++)this.effects[n].stop();for(n=0,a=this.cleanups.length;n<a;n++)this.cleanups[n]();if(this.scopes)for(n=0,a=this.scopes.length;n<a;n++)this.scopes[n].stop(!0);if(!this.detached&&this.parent&&!t){const o=this.parent.scopes.pop();o&&o!==this&&(this.parent.scopes[this.index]=o,o.index=this.index)}this.parent=void 0,this._active=!1}}}function l0(e,t=Ze){t&&t.active&&t.effects.push(e)}function hi(){return Ze}function s0(e){Ze&&Ze.cleanups.push(e)}const Br=e=>{const t=new Set(e);return t.w=0,t.n=0,t},mi=e=>(e.w&Xt)>0,_i=e=>(e.n&Xt)>0,i0=({deps:e})=>{if(e.length)for(let t=0;t<e.length;t++)e[t].w|=Xt},c0=e=>{const{deps:t}=e;if(t.length){let n=0;for(let a=0;a<t.length;a++){const o=t[a];mi(o)&&!_i(o)?o.delete(e):t[n++]=o,o.w&=~Xt,o.n&=~Xt}t.length=n}},oo=new WeakMap;let aa=0,Xt=1;const ur=30;let _t;const pn=Symbol(""),dr=Symbol("");class Nr{constructor(t,n=null,a){this.fn=t,this.scheduler=n,this.active=!0,this.deps=[],this.parent=void 0,l0(this,a)}run(){if(!this.active)return this.fn();let t=_t,n=Gt;for(;t;){if(t===this)return;t=t.parent}try{return this.parent=_t,_t=this,Gt=!0,Xt=1<<++aa,aa<=ur?i0(this):Ml(this),this.fn()}finally{aa<=ur&&c0(this),Xt=1<<--aa,_t=this.parent,Gt=n,this.parent=void 0,this.deferStop&&this.stop()}}stop(){_t===this?this.deferStop=!0:this.active&&(Ml(this),this.onStop&&this.onStop(),this.active=!1)}}function Ml(e){const{deps:t}=e;if(t.length){for(let n=0;n<t.length;n++)t[n].delete(e);t.length=0}}let Gt=!0;const fi=[];function Un(){fi.push(Gt),Gt=!1}function Wn(){const e=fi.pop();Gt=e===void 0?!0:e}function We(e,t,n){if(Gt&&_t){let a=oo.get(e);a||oo.set(e,a=new Map);let o=a.get(n);o||a.set(n,o=Br()),gi(o)}}function gi(e,t){let n=!1;aa<=ur?_i(e)||(e.n|=Xt,n=!mi(e)):n=!e.has(_t),n&&(e.add(_t),_t.deps.push(e))}function xt(e,t,n,a,o,l){const s=oo.get(e);if(!s)return;let c=[];if(t==="clear")c=[...s.values()];else if(n==="length"&&ee(e)){const d=Number(a);s.forEach((u,p)=>{(p==="length"||!mo(p)&&p>=d)&&c.push(u)})}else switch(n!==void 0&&c.push(s.get(n)),t){case"add":ee(e)?Jr(n)&&c.push(s.get("length")):(c.push(s.get(pn)),ra(e)&&c.push(s.get(dr)));break;case"delete":ee(e)||(c.push(s.get(pn)),ra(e)&&c.push(s.get(dr)));break;case"set":ra(e)&&c.push(s.get(pn));break}if(c.length===1)c[0]&&pr(c[0]);else{const d=[];for(const u of c)u&&d.push(...u);pr(Br(d))}}function pr(e,t){const n=ee(e)?e:[...e];for(const a of n)a.computed&&jl(a);for(const a of n)a.computed||jl(a)}function jl(e,t){(e!==_t||e.allowRecurse)&&(e.scheduler?e.scheduler():e.run())}function u0(e,t){var n;return(n=oo.get(e))==null?void 0:n.get(t)}const d0=Cr("__proto__,__v_isRef,__isVue"),bi=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!=="arguments"&&e!=="caller").map(e=>Symbol[e]).filter(mo)),Jl=p0();function p0(){const e={};return["includes","indexOf","lastIndexOf"].forEach(t=>{e[t]=function(...n){const a=de(this);for(let l=0,s=this.length;l<s;l++)We(a,"get",l+"");const o=a[t](...n);return o===-1||o===!1?a[t](...n.map(de)):o}}),["push","pop","shift","unshift","splice"].forEach(t=>{e[t]=function(...n){Un();const a=de(this)[t].apply(this,n);return Wn(),a}}),e}function v0(e){const t=de(this);return We(t,"has",e),t.hasOwnProperty(e)}class Ei{constructor(t=!1,n=!1){this._isReadonly=t,this._shallow=n}get(t,n,a){const o=this._isReadonly,l=this._shallow;if(n==="__v_isReactive")return!o;if(n==="__v_isReadonly")return o;if(n==="__v_isShallow")return l;if(n==="__v_raw")return a===(o?l?I0:Ai:l?Li:yi).get(t)||Object.getPrototypeOf(t)===Object.getPrototypeOf(a)?t:void 0;const s=ee(t);if(!o){if(s&&he(Jl,n))return Reflect.get(Jl,n,a);if(n==="hasOwnProperty")return v0}const c=Reflect.get(t,n,a);return(mo(n)?bi.has(n):d0(n))||(o||We(t,"get",n),l)?c:Je(c)?s&&Jr(n)?c:c.value:Pe(c)?o?nn(c):Ia(c):c}}class ki extends Ei{constructor(t=!1){super(!1,t)}set(t,n,a,o){let l=t[n];if(!this._shallow){const d=Mn(l);if(!ro(a)&&!Mn(a)&&(l=de(l),a=de(a)),!ee(t)&&Je(l)&&!Je(a))return d?!1:(l.value=a,!0)}const s=ee(t)&&Jr(n)?Number(n)<t.length:he(t,n),c=Reflect.set(t,n,a,o);return t===de(o)&&(s?mn(a,l)&&xt(t,"set",n,a):xt(t,"add",n,a)),c}deleteProperty(t,n){const a=he(t,n);t[n];const o=Reflect.deleteProperty(t,n);return o&&a&&xt(t,"delete",n,void 0),o}has(t,n){const a=Reflect.has(t,n);return(!mo(n)||!bi.has(n))&&We(t,"has",n),a}ownKeys(t){return We(t,"iterate",ee(t)?"length":pn),Reflect.ownKeys(t)}}class h0 extends Ei{constructor(t=!1){super(!0,t)}set(t,n){return!0}deleteProperty(t,n){return!0}}const m0=new ki,_0=new h0,f0=new ki(!0),$r=e=>e,Eo=e=>Reflect.getPrototypeOf(e);function Ba(e,t,n=!1,a=!1){e=e.__v_raw;const o=de(e),l=de(t);n||(mn(t,l)&&We(o,"get",t),We(o,"get",l));const{has:s}=Eo(o),c=a?$r:n?Hr:ha;if(s.call(o,t))return c(e.get(t));if(s.call(o,l))return c(e.get(l));e!==o&&e.get(t)}function Na(e,t=!1){const n=this.__v_raw,a=de(n),o=de(e);return t||(mn(e,o)&&We(a,"has",e),We(a,"has",o)),e===o?n.has(e):n.has(e)||n.has(o)}function $a(e,t=!1){return e=e.__v_raw,!t&&We(de(e),"iterate",pn),Reflect.get(e,"size",e)}function Bl(e){e=de(e);const t=de(this);return Eo(t).has.call(t,e)||(t.add(e),xt(t,"add",e,e)),this}function Nl(e,t){t=de(t);const n=de(this),{has:a,get:o}=Eo(n);let l=a.call(n,e);l||(e=de(e),l=a.call(n,e));const s=o.call(n,e);return n.set(e,t),l?mn(t,s)&&xt(n,"set",e,t):xt(n,"add",e,t),this}function $l(e){const t=de(this),{has:n,get:a}=Eo(t);let o=n.call(t,e);o||(e=de(e),o=n.call(t,e)),a&&a.call(t,e);const l=t.delete(e);return o&&xt(t,"delete",e,void 0),l}function Ql(){const e=de(this),t=e.size!==0,n=e.clear();return t&&xt(e,"clear",void 0,void 0),n}function Qa(e,t){return function(a,o){const l=this,s=l.__v_raw,c=de(s),d=t?$r:e?Hr:ha;return!e&&We(c,"iterate",pn),s.forEach((u,p)=>a.call(o,d(u),d(p),l))}}function Fa(e,t,n){return function(...a){const o=this.__v_raw,l=de(o),s=ra(l),c=e==="entries"||e===Symbol.iterator&&s,d=e==="keys"&&s,u=o[e](...a),p=n?$r:t?Hr:ha;return!t&&We(l,"iterate",d?dr:pn),{next(){const{value:h,done:m}=u.next();return m?{value:h,done:m}:{value:c?[p(h[0]),p(h[1])]:p(h),done:m}},[Symbol.iterator](){return this}}}}function Bt(e){return function(...t){return e==="delete"?!1:e==="clear"?void 0:this}}function g0(){const e={get(l){return Ba(this,l)},get size(){return $a(this)},has:Na,add:Bl,set:Nl,delete:$l,clear:Ql,forEach:Qa(!1,!1)},t={get(l){return Ba(this,l,!1,!0)},get size(){return $a(this)},has:Na,add:Bl,set:Nl,delete:$l,clear:Ql,forEach:Qa(!1,!0)},n={get(l){return Ba(this,l,!0)},get size(){return $a(this,!0)},has(l){return Na.call(this,l,!0)},add:Bt("add"),set:Bt("set"),delete:Bt("delete"),clear:Bt("clear"),forEach:Qa(!0,!1)},a={get(l){return Ba(this,l,!0,!0)},get size(){return $a(this,!0)},has(l){return Na.call(this,l,!0)},add:Bt("add"),set:Bt("set"),delete:Bt("delete"),clear:Bt("clear"),forEach:Qa(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach(l=>{e[l]=Fa(l,!1,!1),n[l]=Fa(l,!0,!1),t[l]=Fa(l,!1,!0),a[l]=Fa(l,!0,!0)}),[e,n,t,a]}const[b0,E0,k0,y0]=g0();function Qr(e,t){const n=t?e?y0:k0:e?E0:b0;return(a,o,l)=>o==="__v_isReactive"?!e:o==="__v_isReadonly"?e:o==="__v_raw"?a:Reflect.get(he(n,o)&&o in a?n:a,o,l)}const L0={get:Qr(!1,!1)},A0={get:Qr(!1,!0)},w0={get:Qr(!0,!1)},yi=new WeakMap,Li=new WeakMap,Ai=new WeakMap,I0=new WeakMap;function T0(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function D0(e){return e.__v_skip||!Object.isExtensible(e)?0:T0(Ud(e))}function Ia(e){return Mn(e)?e:Fr(e,!1,m0,L0,yi)}function wi(e){return Fr(e,!1,f0,A0,Li)}function nn(e){return Fr(e,!0,_0,w0,Ai)}function Fr(e,t,n,a,o){if(!Pe(e)||e.__v_raw&&!(t&&e.__v_isReactive))return e;const l=o.get(e);if(l)return l;const s=D0(e);if(s===0)return e;const c=new Proxy(e,s===2?a:n);return o.set(e,c),c}function On(e){return Mn(e)?On(e.__v_raw):!!(e&&e.__v_isReactive)}function Mn(e){return!!(e&&e.__v_isReadonly)}function ro(e){return!!(e&&e.__v_isShallow)}function Ii(e){return On(e)||Mn(e)}function de(e){const t=e&&e.__v_raw;return t?de(t):e}function Ti(e){return ao(e,"__v_skip",!0),e}const ha=e=>Pe(e)?Ia(e):e,Hr=e=>Pe(e)?nn(e):e;function zr(e){Gt&&_t&&(e=de(e),gi(e.dep||(e.dep=Br())))}function Ur(e,t){e=de(e);const n=e.dep;n&&pr(n)}function Je(e){return!!(e&&e.__v_isRef===!0)}function H(e){return Di(e,!1)}function je(e){return Di(e,!0)}function Di(e,t){return Je(e)?e:new P0(e,t)}class P0{constructor(t,n){this.__v_isShallow=n,this.dep=void 0,this.__v_isRef=!0,this._rawValue=n?t:de(t),this._value=n?t:ha(t)}get value(){return zr(this),this._value}set value(t){const n=this.__v_isShallow||ro(t)||Mn(t);t=n?t:de(t),mn(t,this._rawValue)&&(this._rawValue=t,this._value=n?t:ha(t),Ur(this))}}function vn(e){return Je(e)?e.value:e}const R0={get:(e,t,n)=>vn(Reflect.get(e,t,n)),set:(e,t,n,a)=>{const o=e[t];return Je(o)&&!Je(n)?(o.value=n,!0):Reflect.set(e,t,n,a)}};function Pi(e){return On(e)?e:new Proxy(e,R0)}class O0{constructor(t){this.dep=void 0,this.__v_isRef=!0;const{get:n,set:a}=t(()=>zr(this),()=>Ur(this));this._get=n,this._set=a}get value(){return this._get()}set value(t){this._set(t)}}function Ri(e){return new O0(e)}class S0{constructor(t,n,a){this._object=t,this._key=n,this._defaultValue=a,this.__v_isRef=!0}get value(){const t=this._object[this._key];return t===void 0?this._defaultValue:t}set value(t){this._object[this._key]=t}get dep(){return u0(de(this._object),this._key)}}class V0{constructor(t){this._getter=t,this.__v_isRef=!0,this.__v_isReadonly=!0}get value(){return this._getter()}}function Gn(e,t,n){return Je(e)?e:oe(e)?new V0(e):Pe(e)&&arguments.length>1?x0(e,t,n):H(e)}function x0(e,t,n){const a=e[t];return Je(a)?a:new S0(e,t,n)}class q0{constructor(t,n,a,o){this._setter=n,this.dep=void 0,this.__v_isRef=!0,this.__v_isReadonly=!1,this._dirty=!0,this.effect=new Nr(t,()=>{this._dirty||(this._dirty=!0,Ur(this))}),this.effect.computed=this,this.effect.active=this._cacheable=!o,this.__v_isReadonly=a}get value(){const t=de(this);return zr(t),(t._dirty||!t._cacheable)&&(t._dirty=!1,t._value=t.effect.run()),t._value}set value(t){this._setter(t)}}function C0(e,t,n=!1){let a,o;const l=oe(e);return l?(a=e,o=Tt):(a=e.get,o=e.set),new q0(a,o,l||!o,n)}function Kt(e,t,n,a){let o;try{o=a?e(...a):e()}catch(l){Ta(l,t,n)}return o}function st(e,t,n,a){if(oe(e)){const l=Kt(e,t,n,a);return l&&pi(l)&&l.catch(s=>{Ta(s,t,n)}),l}const o=[];for(let l=0;l<e.length;l++)o.push(st(e[l],t,n,a));return o}function Ta(e,t,n,a=!0){const o=t?t.vnode:null;if(t){let l=t.parent;const s=t.proxy,c=n;for(;l;){const u=l.ec;if(u){for(let p=0;p<u.length;p++)if(u[p](e,s,c)===!1)return}l=l.parent}const d=t.appContext.config.errorHandler;if(d){Kt(d,null,10,[e,s,c]);return}}M0(e,n,o,a)}function M0(e,t,n,a=!0){console.error(e)}let ma=!1,vr=!1;const Be=[];let It=0;const Sn=[];let Vt=null,sn=0;const Oi=Promise.resolve();let Wr=null;function Ct(e){const t=Wr||Oi;return e?t.then(this?e.bind(this):e):t}function j0(e){let t=It+1,n=Be.length;for(;t<n;){const a=t+n>>>1,o=Be[a],l=_a(o);l<e||l===e&&o.pre?t=a+1:n=a}return t}function ko(e){(!Be.length||!Be.includes(e,ma&&e.allowRecurse?It+1:It))&&(e.id==null?Be.push(e):Be.splice(j0(e.id),0,e),Si())}function Si(){!ma&&!vr&&(vr=!0,Wr=Oi.then(Vi))}function J0(e){const t=Be.indexOf(e);t>It&&Be.splice(t,1)}function B0(e){ee(e)?Sn.push(...e):(!Vt||!Vt.includes(e,e.allowRecurse?sn+1:sn))&&Sn.push(e),Si()}function Fl(e,t,n=ma?It+1:0){for(;n<Be.length;n++){const a=Be[n];if(a&&a.pre){if(e&&a.id!==e.uid)continue;Be.splice(n,1),n--,a()}}}function lo(e){if(Sn.length){const t=[...new Set(Sn)];if(Sn.length=0,Vt){Vt.push(...t);return}for(Vt=t,Vt.sort((n,a)=>_a(n)-_a(a)),sn=0;sn<Vt.length;sn++)Vt[sn]();Vt=null,sn=0}}const _a=e=>e.id==null?1/0:e.id,N0=(e,t)=>{const n=_a(e)-_a(t);if(n===0){if(e.pre&&!t.pre)return-1;if(t.pre&&!e.pre)return 1}return n};function Vi(e){vr=!1,ma=!0,Be.sort(N0);try{for(It=0;It<Be.length;It++){const t=Be[It];t&&t.active!==!1&&Kt(t,null,14)}}finally{It=0,Be.length=0,lo(),ma=!1,Wr=null,(Be.length||Sn.length)&&Vi()}}function $0(e,t,...n){if(e.isUnmounted)return;const a=e.vnode.props||Ie;let o=n;const l=t.startsWith("update:"),s=l&&t.slice(7);if(s&&s in a){const p=`${s==="modelValue"?"model":s}Modifiers`,{number:h,trim:m}=a[p]||Ie;m&&(o=n.map(_=>ce(_)?_.trim():_)),h&&(o=n.map(Xd))}let c,d=a[c=Co(t)]||a[c=Co(dt(t))];!d&&l&&(d=a[c=Co(zn(t))]),d&&st(d,e,6,o);const u=a[c+"Once"];if(u){if(!e.emitted)e.emitted={};else if(e.emitted[c])return;e.emitted[c]=!0,st(u,e,6,o)}}function xi(e,t,n=!1){const a=t.emitsCache,o=a.get(e);if(o!==void 0)return o;const l=e.emits;let s={},c=!1;if(!oe(e)){const d=u=>{const p=xi(u,t,!0);p&&(c=!0,qe(s,p))};!n&&t.mixins.length&&t.mixins.forEach(d),e.extends&&d(e.extends),e.mixins&&e.mixins.forEach(d)}return!l&&!c?(Pe(e)&&a.set(e,null),null):(ee(l)?l.forEach(d=>s[d]=null):qe(s,l),Pe(e)&&a.set(e,s),s)}function yo(e,t){return!e||!Aa(t)?!1:(t=t.slice(2).replace(/Once$/,""),he(e,t[0].toLowerCase()+t.slice(1))||he(e,zn(t))||he(e,t))}let lt=null,qi=null;function so(e){const t=lt;return lt=e,qi=e&&e.type.__scopeId||null,t}function Q0(e,t=lt,n){if(!t||e._n)return e;const a=(...o)=>{a._d&&ns(-1);const l=so(t);let s;try{s=e(...o)}finally{so(l),a._d&&ns(1)}return s};return a._n=!0,a._c=!0,a._d=!0,a}function jo(e){const{type:t,vnode:n,proxy:a,withProxy:o,props:l,propsOptions:[s],slots:c,attrs:d,emit:u,render:p,renderCache:h,data:m,setupState:_,ctx:g,inheritAttrs:E}=e;let w,y;const T=so(e);try{if(n.shapeFlag&4){const I=o||a,M=I;w=mt(p.call(M,I,h,l,_,m,g)),y=d}else{const I=t;w=mt(I.length>1?I(l,{attrs:d,slots:c,emit:u}):I(l,null)),y=t.props?d:F0(d)}}catch(I){ua.length=0,Ta(I,e,1),w=Re(ct)}let k=w;if(y&&E!==!1){const I=Object.keys(y),{shapeFlag:M}=k;I.length&&M&7&&(s&&I.some(Mr)&&(y=H0(y,s)),k=Zt(k,y))}return n.dirs&&(k=Zt(k),k.dirs=k.dirs?k.dirs.concat(n.dirs):n.dirs),n.transition&&(k.transition=n.transition),w=k,so(T),w}const F0=e=>{let t;for(const n in e)(n==="class"||n==="style"||Aa(n))&&((t||(t={}))[n]=e[n]);return t},H0=(e,t)=>{const n={};for(const a in e)(!Mr(a)||!(a.slice(9)in t))&&(n[a]=e[a]);return n};function z0(e,t,n){const{props:a,children:o,component:l}=e,{props:s,children:c,patchFlag:d}=t,u=l.emitsOptions;if(t.dirs||t.transition)return!0;if(n&&d>=0){if(d&1024)return!0;if(d&16)return a?Hl(a,s,u):!!s;if(d&8){const p=t.dynamicProps;for(let h=0;h<p.length;h++){const m=p[h];if(s[m]!==a[m]&&!yo(u,m))return!0}}}else return(o||c)&&(!c||!c.$stable)?!0:a===s?!1:a?s?Hl(a,s,u):!0:!!s;return!1}function Hl(e,t,n){const a=Object.keys(t);if(a.length!==Object.keys(e).length)return!0;for(let o=0;o<a.length;o++){const l=a[o];if(t[l]!==e[l]&&!yo(n,l))return!0}return!1}function U0({vnode:e,parent:t},n){for(;t&&t.subTree===e;)(e=t.vnode).el=n,t=t.parent}const Ci="components";function tt(e,t){return G0(Ci,e,!0,t)||e}const W0=Symbol.for("v-ndc");function G0(e,t,n=!0,a=!1){const o=lt||Ce;if(o){const l=o.type;if(e===Ci){const c=Bp(l,!1);if(c&&(c===t||c===dt(t)||c===wa(dt(t))))return l}const s=zl(o[e]||l[e],t)||zl(o.appContext[e],t);return!s&&a?l:s}}function zl(e,t){return e&&(e[t]||e[dt(t)]||e[wa(dt(t))])}const K0=e=>e.__isSuspense;function Mi(e,t){t&&t.pendingBranch?ee(e)?t.effects.push(...e):t.effects.push(e):B0(e)}function Gr(e,t){return Kr(e,null,t)}const Ha={};function ue(e,t,n){return Kr(e,t,n)}function Kr(e,t,{immediate:n,deep:a,flush:o,onTrack:l,onTrigger:s}=Ie){var c;const d=hi()===((c=Ce)==null?void 0:c.scope)?Ce:null;let u,p=!1,h=!1;if(Je(e)?(u=()=>e.value,p=ro(e)):On(e)?(u=()=>e,a=!0):ee(e)?(h=!0,p=e.some(I=>On(I)||ro(I)),u=()=>e.map(I=>{if(Je(I))return I.value;if(On(I))return Tn(I);if(oe(I))return Kt(I,d,2)})):oe(e)?t?u=()=>Kt(e,d,2):u=()=>{if(!(d&&d.isUnmounted))return m&&m(),st(e,d,3,[_])}:u=Tt,t&&a){const I=u;u=()=>Tn(I())}let m,_=I=>{m=T.onStop=()=>{Kt(I,d,4),m=T.onStop=void 0}},g;if(Bn)if(_=Tt,t?n&&st(t,d,3,[u(),h?[]:void 0,_]):u(),o==="sync"){const I=Qp();g=I.__watcherHandles||(I.__watcherHandles=[])}else return Tt;let E=h?new Array(e.length).fill(Ha):Ha;const w=()=>{if(T.active)if(t){const I=T.run();(a||p||(h?I.some((M,O)=>mn(M,E[O])):mn(I,E)))&&(m&&m(),st(t,d,3,[I,E===Ha?void 0:h&&E[0]===Ha?[]:E,_]),E=I)}else T.run()};w.allowRecurse=!!t;let y;o==="sync"?y=w:o==="post"?y=()=>He(w,d&&d.suspense):(w.pre=!0,d&&(w.id=d.uid),y=()=>ko(w));const T=new Nr(u,y);t?n?w():E=T.run():o==="post"?He(T.run.bind(T),d&&d.suspense):T.run();const k=()=>{T.stop(),d&&d.scope&&jr(d.scope.effects,T)};return g&&g.push(k),k}function X0(e,t,n){const a=this.proxy,o=ce(e)?e.includes(".")?ji(a,e):()=>a[e]:e.bind(a,a);let l;oe(t)?l=t:(l=t.handler,n=t);const s=Ce;Jn(this);const c=Kr(o,l.bind(a),n);return s?Jn(s):hn(),c}function ji(e,t){const n=t.split(".");return()=>{let a=e;for(let o=0;o<n.length&&a;o++)a=a[n[o]];return a}}function Tn(e,t){if(!Pe(e)||e.__v_skip||(t=t||new Set,t.has(e)))return e;if(t.add(e),Je(e))Tn(e.value,t);else if(ee(e))for(let n=0;n<e.length;n++)Tn(e[n],t);else if(Hd(e)||ra(e))e.forEach(n=>{Tn(n,t)});else if(Wd(e))for(const n in e)Tn(e[n],t);return e}function wt(e,t,n,a){const o=e.dirs,l=t&&t.dirs;for(let s=0;s<o.length;s++){const c=o[s];l&&(c.oldValue=l[s].value);let d=c.dir[a];d&&(Un(),st(d,n,8,[e.el,c,e,t]),Wn())}}const zt=Symbol("_leaveCb"),za=Symbol("_enterCb");function Ji(){const e={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return fe(()=>{e.isMounted=!0}),Zr(()=>{e.isUnmounting=!0}),e}const at=[Function,Array],Bi={mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:at,onEnter:at,onAfterEnter:at,onEnterCancelled:at,onBeforeLeave:at,onLeave:at,onAfterLeave:at,onLeaveCancelled:at,onBeforeAppear:at,onAppear:at,onAfterAppear:at,onAppearCancelled:at},Z0={name:"BaseTransition",props:Bi,setup(e,{slots:t}){const n=Xn(),a=Ji();let o;return()=>{const l=t.default&&Xr(t.default(),!0);if(!l||!l.length)return;let s=l[0];if(l.length>1){for(const E of l)if(E.type!==ct){s=E;break}}const c=de(e),{mode:d}=c;if(a.isLeaving)return Jo(s);const u=Ul(s);if(!u)return Jo(s);const p=fa(u,c,a,n);ga(u,p);const h=n.subTree,m=h&&Ul(h);let _=!1;const{getTransitionKey:g}=u.type;if(g){const E=g();o===void 0?o=E:E!==o&&(o=E,_=!0)}if(m&&m.type!==ct&&(!cn(u,m)||_)){const E=fa(m,c,a,n);if(ga(m,E),d==="out-in")return a.isLeaving=!0,E.afterLeave=()=>{a.isLeaving=!1,n.update.active!==!1&&n.update()},Jo(s);d==="in-out"&&u.type!==ct&&(E.delayLeave=(w,y,T)=>{const k=Ni(a,m);k[String(m.key)]=m,w[zt]=()=>{y(),w[zt]=void 0,delete p.delayedLeave},p.delayedLeave=T})}return s}}},Y0=Z0;function Ni(e,t){const{leavingVNodes:n}=e;let a=n.get(t.type);return a||(a=Object.create(null),n.set(t.type,a)),a}function fa(e,t,n,a){const{appear:o,mode:l,persisted:s=!1,onBeforeEnter:c,onEnter:d,onAfterEnter:u,onEnterCancelled:p,onBeforeLeave:h,onLeave:m,onAfterLeave:_,onLeaveCancelled:g,onBeforeAppear:E,onAppear:w,onAfterAppear:y,onAppearCancelled:T}=t,k=String(e.key),I=Ni(n,e),M=($,x)=>{$&&st($,a,9,x)},O=($,x)=>{const J=x[1];M($,x),ee($)?$.every(X=>X.length<=1)&&J():$.length<=1&&J()},G={mode:l,persisted:s,beforeEnter($){let x=c;if(!n.isMounted)if(o)x=E||c;else return;$[zt]&&$[zt](!0);const J=I[k];J&&cn(e,J)&&J.el[zt]&&J.el[zt](),M(x,[$])},enter($){let x=d,J=u,X=p;if(!n.isMounted)if(o)x=w||d,J=y||u,X=T||p;else return;let N=!1;const te=$[za]=De=>{N||(N=!0,De?M(X,[$]):M(J,[$]),G.delayedLeave&&G.delayedLeave(),$[za]=void 0)};x?O(x,[$,te]):te()},leave($,x){const J=String(e.key);if($[za]&&$[za](!0),n.isUnmounting)return x();M(h,[$]);let X=!1;const N=$[zt]=te=>{X||(X=!0,x(),te?M(g,[$]):M(_,[$]),$[zt]=void 0,I[J]===e&&delete I[J])};I[J]=e,m?O(m,[$,N]):N()},clone($){return fa($,t,n,a)}};return G}function Jo(e){if(Da(e))return e=Zt(e),e.children=null,e}function Ul(e){return Da(e)?e.children?e.children[0]:void 0:e}function ga(e,t){e.shapeFlag&6&&e.component?ga(e.component.subTree,t):e.shapeFlag&128?(e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)):e.transition=t}function Xr(e,t=!1,n){let a=[],o=0;for(let l=0;l<e.length;l++){let s=e[l];const c=n==null?s.key:String(n)+String(s.key!=null?s.key:l);s.type===Ye?(s.patchFlag&128&&o++,a=a.concat(Xr(s.children,t,c))):(t||s.type!==ct)&&a.push(c!=null?Zt(s,{key:c}):s)}if(o>1)for(let l=0;l<a.length;l++)a[l].patchFlag=-2;return a}/*! #__NO_SIDE_EFFECTS__ */function C(e,t){return oe(e)?qe({name:e.name},t,{setup:e}):e}const sa=e=>!!e.type.__asyncLoader;/*! #__NO_SIDE_EFFECTS__ */function v(e){oe(e)&&(e={loader:e});const{loader:t,loadingComponent:n,errorComponent:a,delay:o=200,timeout:l,suspensible:s=!0,onError:c}=e;let d=null,u,p=0;const h=()=>(p++,d=null,m()),m=()=>{let _;return d||(_=d=t().catch(g=>{if(g=g instanceof Error?g:new Error(String(g)),c)return new Promise((E,w)=>{c(g,()=>E(h()),()=>w(g),p+1)});throw g}).then(g=>_!==d&&d?d:(g&&(g.__esModule||g[Symbol.toStringTag]==="Module")&&(g=g.default),u=g,g)))};return C({name:"AsyncComponentWrapper",__asyncLoader:m,get __asyncResolved(){return u},setup(){const _=Ce;if(u)return()=>Bo(u,_);const g=T=>{d=null,Ta(T,_,13,!a)};if(s&&_.suspense||Bn)return m().then(T=>()=>Bo(T,_)).catch(T=>(g(T),()=>a?Re(a,{error:T}):null));const E=H(!1),w=H(),y=H(!!o);return o&&setTimeout(()=>{y.value=!1},o),l!=null&&setTimeout(()=>{if(!E.value&&!w.value){const T=new Error(`Async component timed out after ${l}ms.`);g(T),w.value=T}},l),m().then(()=>{E.value=!0,_.parent&&Da(_.parent.vnode)&&ko(_.parent.update)}).catch(T=>{g(T),w.value=T}),()=>{if(E.value&&u)return Bo(u,_);if(w.value&&a)return Re(a,{error:w.value});if(n&&!y.value)return Re(n)}}})}function Bo(e,t){const{ref:n,props:a,children:o,ce:l}=t.vnode,s=Re(e,a,o);return s.ref=n,s.ce=l,delete t.vnode.ce,s}const Da=e=>e.type.__isKeepAlive;function ep(e,t){$i(e,"a",t)}function tp(e,t){$i(e,"da",t)}function $i(e,t,n=Ce){const a=e.__wdc||(e.__wdc=()=>{let o=n;for(;o;){if(o.isDeactivated)return;o=o.parent}return e()});if(Lo(t,a,n),n){let o=n.parent;for(;o&&o.parent;)Da(o.parent.vnode)&&np(a,t,n,o),o=o.parent}}function np(e,t,n,a){const o=Lo(t,e,a,!0);Kn(()=>{jr(a[t],o)},n)}function Lo(e,t,n=Ce,a=!1){if(n){const o=n[e]||(n[e]=[]),l=t.__weh||(t.__weh=(...s)=>{if(n.isUnmounted)return;Un(),Jn(n);const c=st(t,n,e,s);return hn(),Wn(),c});return a?o.unshift(l):o.push(l),l}}const Mt=e=>(t,n=Ce)=>(!Bn||e==="sp")&&Lo(e,(...a)=>t(...a),n),ap=Mt("bm"),fe=Mt("m"),op=Mt("bu"),Qi=Mt("u"),Zr=Mt("bum"),Kn=Mt("um"),rp=Mt("sp"),lp=Mt("rtg"),sp=Mt("rtc");function ip(e,t=Ce){Lo("ec",e,t)}const hr=e=>e?ac(e)?al(e)||e.proxy:hr(e.parent):null,ia=qe(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>hr(e.parent),$root:e=>hr(e.root),$emit:e=>e.emit,$options:e=>Yr(e),$forceUpdate:e=>e.f||(e.f=()=>ko(e.update)),$nextTick:e=>e.n||(e.n=Ct.bind(e.proxy)),$watch:e=>X0.bind(e)}),No=(e,t)=>e!==Ie&&!e.__isScriptSetup&&he(e,t),cp={get({_:e},t){const{ctx:n,setupState:a,data:o,props:l,accessCache:s,type:c,appContext:d}=e;let u;if(t[0]!=="$"){const _=s[t];if(_!==void 0)switch(_){case 1:return a[t];case 2:return o[t];case 4:return n[t];case 3:return l[t]}else{if(No(a,t))return s[t]=1,a[t];if(o!==Ie&&he(o,t))return s[t]=2,o[t];if((u=e.propsOptions[0])&&he(u,t))return s[t]=3,l[t];if(n!==Ie&&he(n,t))return s[t]=4,n[t];mr&&(s[t]=0)}}const p=ia[t];let h,m;if(p)return t==="$attrs"&&We(e,"get",t),p(e);if((h=c.__cssModules)&&(h=h[t]))return h;if(n!==Ie&&he(n,t))return s[t]=4,n[t];if(m=d.config.globalProperties,he(m,t))return m[t]},set({_:e},t,n){const{data:a,setupState:o,ctx:l}=e;return No(o,t)?(o[t]=n,!0):a!==Ie&&he(a,t)?(a[t]=n,!0):he(e.props,t)||t[0]==="$"&&t.slice(1)in e?!1:(l[t]=n,!0)},has({_:{data:e,setupState:t,accessCache:n,ctx:a,appContext:o,propsOptions:l}},s){let c;return!!n[s]||e!==Ie&&he(e,s)||No(t,s)||(c=l[0])&&he(c,s)||he(a,s)||he(ia,s)||he(o.config.globalProperties,s)},defineProperty(e,t,n){return n.get!=null?e._.accessCache[t]=0:he(n,"value")&&this.set(e,t,n.value,null),Reflect.defineProperty(e,t,n)}};function Wl(e){return ee(e)?e.reduce((t,n)=>(t[n]=null,t),{}):e}let mr=!0;function up(e){const t=Yr(e),n=e.proxy,a=e.ctx;mr=!1,t.beforeCreate&&Gl(t.beforeCreate,e,"bc");const{data:o,computed:l,methods:s,watch:c,provide:d,inject:u,created:p,beforeMount:h,mounted:m,beforeUpdate:_,updated:g,activated:E,deactivated:w,beforeDestroy:y,beforeUnmount:T,destroyed:k,unmounted:I,render:M,renderTracked:O,renderTriggered:G,errorCaptured:$,serverPrefetch:x,expose:J,inheritAttrs:X,components:N,directives:te,filters:De}=t;if(u&&dp(u,a,null),s)for(const ne in s){const U=s[ne];oe(U)&&(a[ne]=U.bind(n))}if(o){const ne=o.call(n,n);Pe(ne)&&(e.data=Ia(ne))}if(mr=!0,l)for(const ne in l){const U=l[ne],Se=oe(U)?U.bind(n,n):oe(U.get)?U.get.bind(n,n):Tt,yt=!oe(U)&&oe(U.set)?U.set.bind(n):Tt,nt=L({get:Se,set:yt});Object.defineProperty(a,ne,{enumerable:!0,configurable:!0,get:()=>nt.value,set:Me=>nt.value=Me})}if(c)for(const ne in c)Fi(c[ne],a,n,ne);if(d){const ne=oe(d)?d.call(n):d;Reflect.ownKeys(ne).forEach(U=>{it(U,ne[U])})}p&&Gl(p,e,"c");function z(ne,U){ee(U)?U.forEach(Se=>ne(Se.bind(n))):U&&ne(U.bind(n))}if(z(ap,h),z(fe,m),z(op,_),z(Qi,g),z(ep,E),z(tp,w),z(ip,$),z(sp,O),z(lp,G),z(Zr,T),z(Kn,I),z(rp,x),ee(J))if(J.length){const ne=e.exposed||(e.exposed={});J.forEach(U=>{Object.defineProperty(ne,U,{get:()=>n[U],set:Se=>n[U]=Se})})}else e.exposed||(e.exposed={});M&&e.render===Tt&&(e.render=M),X!=null&&(e.inheritAttrs=X),N&&(e.components=N),te&&(e.directives=te)}function dp(e,t,n=Tt){ee(e)&&(e=_r(e));for(const a in e){const o=e[a];let l;Pe(o)?"default"in o?l=me(o.from||a,o.default,!0):l=me(o.from||a):l=me(o),Je(l)?Object.defineProperty(t,a,{enumerable:!0,configurable:!0,get:()=>l.value,set:s=>l.value=s}):t[a]=l}}function Gl(e,t,n){st(ee(e)?e.map(a=>a.bind(t.proxy)):e.bind(t.proxy),t,n)}function Fi(e,t,n,a){const o=a.includes(".")?ji(n,a):()=>n[a];if(ce(e)){const l=t[e];oe(l)&&ue(o,l)}else if(oe(e))ue(o,e.bind(n));else if(Pe(e))if(ee(e))e.forEach(l=>Fi(l,t,n,a));else{const l=oe(e.handler)?e.handler.bind(n):t[e.handler];oe(l)&&ue(o,l,e)}}function Yr(e){const t=e.type,{mixins:n,extends:a}=t,{mixins:o,optionsCache:l,config:{optionMergeStrategies:s}}=e.appContext,c=l.get(t);let d;return c?d=c:!o.length&&!n&&!a?d=t:(d={},o.length&&o.forEach(u=>io(d,u,s,!0)),io(d,t,s)),Pe(t)&&l.set(t,d),d}function io(e,t,n,a=!1){const{mixins:o,extends:l}=t;l&&io(e,l,n,!0),o&&o.forEach(s=>io(e,s,n,!0));for(const s in t)if(!(a&&s==="expose")){const c=pp[s]||n&&n[s];e[s]=c?c(e[s],t[s]):t[s]}return e}const pp={data:Kl,props:Xl,emits:Xl,methods:oa,computed:oa,beforeCreate:$e,created:$e,beforeMount:$e,mounted:$e,beforeUpdate:$e,updated:$e,beforeDestroy:$e,beforeUnmount:$e,destroyed:$e,unmounted:$e,activated:$e,deactivated:$e,errorCaptured:$e,serverPrefetch:$e,components:oa,directives:oa,watch:hp,provide:Kl,inject:vp};function Kl(e,t){return t?e?function(){return qe(oe(e)?e.call(this,this):e,oe(t)?t.call(this,this):t)}:t:e}function vp(e,t){return oa(_r(e),_r(t))}function _r(e){if(ee(e)){const t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function $e(e,t){return e?[...new Set([].concat(e,t))]:t}function oa(e,t){return e?qe(Object.create(null),e,t):t}function Xl(e,t){return e?ee(e)&&ee(t)?[...new Set([...e,...t])]:qe(Object.create(null),Wl(e),Wl(t??{})):t}function hp(e,t){if(!e)return t;if(!t)return e;const n=qe(Object.create(null),e);for(const a in t)n[a]=$e(e[a],t[a]);return n}function Hi(){return{app:null,config:{isNativeTag:Qd,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let mp=0;function _p(e,t){return function(a,o=null){oe(a)||(a=qe({},a)),o!=null&&!Pe(o)&&(o=null);const l=Hi(),s=new WeakSet;let c=!1;const d=l.app={_uid:mp++,_component:a,_props:o,_container:null,_context:l,_instance:null,version:Fp,get config(){return l.config},set config(u){},use(u,...p){return s.has(u)||(u&&oe(u.install)?(s.add(u),u.install(d,...p)):oe(u)&&(s.add(u),u(d,...p))),d},mixin(u){return l.mixins.includes(u)||l.mixins.push(u),d},component(u,p){return p?(l.components[u]=p,d):l.components[u]},directive(u,p){return p?(l.directives[u]=p,d):l.directives[u]},mount(u,p,h){if(!c){const m=Re(a,o);return m.appContext=l,p&&t?t(m,u):e(m,u,h),c=!0,d._container=u,u.__vue_app__=d,al(m.component)||m.component.proxy}},unmount(){c&&(e(null,d._container),delete d._container.__vue_app__)},provide(u,p){return l.provides[u]=p,d},runWithContext(u){co=d;try{return u()}finally{co=null}}};return d}}let co=null;function it(e,t){if(Ce){let n=Ce.provides;const a=Ce.parent&&Ce.parent.provides;a===n&&(n=Ce.provides=Object.create(a)),n[e]=t}}function me(e,t,n=!1){const a=Ce||lt;if(a||co){const o=a?a.parent==null?a.vnode.appContext&&a.vnode.appContext.provides:a.parent.provides:co._context.provides;if(o&&e in o)return o[e];if(arguments.length>1)return n&&oe(t)?t.call(a&&a.proxy):t}}function fp(e,t,n,a=!1){const o={},l={};ao(l,Ao,1),e.propsDefaults=Object.create(null),zi(e,t,o,l);for(const s in e.propsOptions[0])s in o||(o[s]=void 0);n?e.props=a?o:wi(o):e.type.props?e.props=o:e.props=l,e.attrs=l}function gp(e,t,n,a){const{props:o,attrs:l,vnode:{patchFlag:s}}=e,c=de(o),[d]=e.propsOptions;let u=!1;if((a||s>0)&&!(s&16)){if(s&8){const p=e.vnode.dynamicProps;for(let h=0;h<p.length;h++){let m=p[h];if(yo(e.emitsOptions,m))continue;const _=t[m];if(d)if(he(l,m))_!==l[m]&&(l[m]=_,u=!0);else{const g=dt(m);o[g]=fr(d,c,g,_,e,!1)}else _!==l[m]&&(l[m]=_,u=!0)}}}else{zi(e,t,o,l)&&(u=!0);let p;for(const h in c)(!t||!he(t,h)&&((p=zn(h))===h||!he(t,p)))&&(d?n&&(n[h]!==void 0||n[p]!==void 0)&&(o[h]=fr(d,c,h,void 0,e,!0)):delete o[h]);if(l!==c)for(const h in l)(!t||!he(t,h))&&(delete l[h],u=!0)}u&&xt(e,"set","$attrs")}function zi(e,t,n,a){const[o,l]=e.propsOptions;let s=!1,c;if(t)for(let d in t){if(la(d))continue;const u=t[d];let p;o&&he(o,p=dt(d))?!l||!l.includes(p)?n[p]=u:(c||(c={}))[p]=u:yo(e.emitsOptions,d)||(!(d in a)||u!==a[d])&&(a[d]=u,s=!0)}if(l){const d=de(n),u=c||Ie;for(let p=0;p<l.length;p++){const h=l[p];n[h]=fr(o,d,h,u[h],e,!he(u,h))}}return s}function fr(e,t,n,a,o,l){const s=e[n];if(s!=null){const c=he(s,"default");if(c&&a===void 0){const d=s.default;if(s.type!==Function&&!s.skipFactory&&oe(d)){const{propsDefaults:u}=o;n in u?a=u[n]:(Jn(o),a=u[n]=d.call(null,t),hn())}else a=d}s[0]&&(l&&!c?a=!1:s[1]&&(a===""||a===zn(n))&&(a=!0))}return a}function Ui(e,t,n=!1){const a=t.propsCache,o=a.get(e);if(o)return o;const l=e.props,s={},c=[];let d=!1;if(!oe(e)){const p=h=>{d=!0;const[m,_]=Ui(h,t,!0);qe(s,m),_&&c.push(..._)};!n&&t.mixins.length&&t.mixins.forEach(p),e.extends&&p(e.extends),e.mixins&&e.mixins.forEach(p)}if(!l&&!d)return Pe(e)&&a.set(e,Rn),Rn;if(ee(l))for(let p=0;p<l.length;p++){const h=dt(l[p]);Zl(h)&&(s[h]=Ie)}else if(l)for(const p in l){const h=dt(p);if(Zl(h)){const m=l[p],_=s[h]=ee(m)||oe(m)?{type:m}:qe({},m);if(_){const g=ts(Boolean,_.type),E=ts(String,_.type);_[0]=g>-1,_[1]=E<0||g<E,(g>-1||he(_,"default"))&&c.push(h)}}}const u=[s,c];return Pe(e)&&a.set(e,u),u}function Zl(e){return e[0]!=="$"}function Yl(e){const t=e&&e.toString().match(/^\s*(function|class) (\w+)/);return t?t[2]:e===null?"null":""}function es(e,t){return Yl(e)===Yl(t)}function ts(e,t){return ee(t)?t.findIndex(n=>es(n,e)):oe(t)&&es(t,e)?0:-1}const Wi=e=>e[0]==="_"||e==="$stable",el=e=>ee(e)?e.map(mt):[mt(e)],bp=(e,t,n)=>{if(t._n)return t;const a=Q0((...o)=>el(t(...o)),n);return a._c=!1,a},Gi=(e,t,n)=>{const a=e._ctx;for(const o in e){if(Wi(o))continue;const l=e[o];if(oe(l))t[o]=bp(o,l,a);else if(l!=null){const s=el(l);t[o]=()=>s}}},Ki=(e,t)=>{const n=el(t);e.slots.default=()=>n},Ep=(e,t)=>{if(e.vnode.shapeFlag&32){const n=t._;n?(e.slots=de(t),ao(t,"_",n)):Gi(t,e.slots={})}else e.slots={},t&&Ki(e,t);ao(e.slots,Ao,1)},kp=(e,t,n)=>{const{vnode:a,slots:o}=e;let l=!0,s=Ie;if(a.shapeFlag&32){const c=t._;c?n&&c===1?l=!1:(qe(o,t),!n&&c===1&&delete o._):(l=!t.$stable,Gi(t,o)),s=t}else t&&(Ki(e,t),s={default:1});if(l)for(const c in o)!Wi(c)&&s[c]==null&&delete o[c]};function uo(e,t,n,a,o=!1){if(ee(e)){e.forEach((m,_)=>uo(m,t&&(ee(t)?t[_]:t),n,a,o));return}if(sa(a)&&!o)return;const l=a.shapeFlag&4?al(a.component)||a.component.proxy:a.el,s=o?null:l,{i:c,r:d}=e,u=t&&t.r,p=c.refs===Ie?c.refs={}:c.refs,h=c.setupState;if(u!=null&&u!==d&&(ce(u)?(p[u]=null,he(h,u)&&(h[u]=null)):Je(u)&&(u.value=null)),oe(d))Kt(d,c,12,[s,p]);else{const m=ce(d),_=Je(d);if(m||_){const g=()=>{if(e.f){const E=m?he(h,d)?h[d]:p[d]:d.value;o?ee(E)&&jr(E,l):ee(E)?E.includes(l)||E.push(l):m?(p[d]=[l],he(h,d)&&(h[d]=p[d])):(d.value=[l],e.k&&(p[e.k]=d.value))}else m?(p[d]=s,he(h,d)&&(h[d]=s)):_&&(d.value=s,e.k&&(p[e.k]=s))};s?(g.id=-1,He(g,n)):g()}}}let Nt=!1;const Ua=e=>/svg/.test(e.namespaceURI)&&e.tagName!=="foreignObject",Wa=e=>e.nodeType===8;function yp(e){const{mt:t,p:n,o:{patchProp:a,createText:o,nextSibling:l,parentNode:s,remove:c,insert:d,createComment:u}}=e,p=(k,I)=>{if(!I.hasChildNodes()){n(null,k,I),lo(),I._vnode=k;return}Nt=!1,h(I.firstChild,k,null,null,null),lo(),I._vnode=k,Nt&&console.error("Hydration completed but contains mismatches.")},h=(k,I,M,O,G,$=!1)=>{const x=Wa(k)&&k.data==="[",J=()=>E(k,I,M,O,G,x),{type:X,ref:N,shapeFlag:te,patchFlag:De}=I;let we=k.nodeType;I.el=k,De===-2&&($=!1,I.dynamicChildren=null);let z=null;switch(X){case jn:we!==3?I.children===""?(d(I.el=o(""),s(k),k),z=k):z=J():(k.data!==I.children&&(Nt=!0,k.data=I.children),z=l(k));break;case ct:T(k)?(z=l(k),y(I.el=k.content.firstChild,k,M)):we!==8||x?z=J():z=l(k);break;case ca:if(x&&(k=l(k),we=k.nodeType),we===1||we===3){z=k;const ne=!I.children.length;for(let U=0;U<I.staticCount;U++)ne&&(I.children+=z.nodeType===1?z.outerHTML:z.data),U===I.staticCount-1&&(I.anchor=z),z=l(z);return x?l(z):z}else J();break;case Ye:x?z=g(k,I,M,O,G,$):z=J();break;default:if(te&1)(we!==1||I.type.toLowerCase()!==k.tagName.toLowerCase())&&!T(k)?z=J():z=m(k,I,M,O,G,$);else if(te&6){I.slotScopeIds=G;const ne=s(k);if(x?z=w(k):Wa(k)&&k.data==="teleport start"?z=w(k,k.data,"teleport end"):z=l(k),t(I,ne,null,M,O,Ua(ne),$),sa(I)){let U;x?(U=Re(Ye),U.anchor=z?z.previousSibling:ne.lastChild):U=k.nodeType===3?nc(""):Re("div"),U.el=k,I.component.subTree=U}}else te&64?we!==8?z=J():z=I.type.hydrate(k,I,M,O,G,$,e,_):te&128&&(z=I.type.hydrate(k,I,M,O,Ua(s(k)),G,$,e,h))}return N!=null&&uo(N,null,O,I),z},m=(k,I,M,O,G,$)=>{$=$||!!I.dynamicChildren;const{type:x,props:J,patchFlag:X,shapeFlag:N,dirs:te,transition:De}=I,we=x==="input"||x==="option";if(we||X!==-1){te&&wt(I,null,M,"created");let z=!1;if(T(k)){z=Xi(O,De)&&M&&M.vnode.props&&M.vnode.props.appear;const U=k.content.firstChild;z&&De.beforeEnter(U),y(U,k,M),I.el=k=U}if(J)if(we||!$||X&48)for(const U in J)(we&&(U.endsWith("value")||U==="indeterminate")||Aa(U)&&!la(U)||U[0]===".")&&a(k,U,null,J[U],!1,void 0,M);else J.onClick&&a(k,"onClick",null,J.onClick,!1,void 0,M);let ne;if((ne=J&&J.onVnodeBeforeMount)&&ot(ne,M,I),te&&wt(I,null,M,"beforeMount"),((ne=J&&J.onVnodeMounted)||te||z)&&Mi(()=>{ne&&ot(ne,M,I),z&&De.enter(k),te&&wt(I,null,M,"mounted")},O),N&16&&!(J&&(J.innerHTML||J.textContent))){let U=_(k.firstChild,I,k,M,O,G,$);for(;U;){Nt=!0;const Se=U;U=U.nextSibling,c(Se)}}else N&8&&k.textContent!==I.children&&(Nt=!0,k.textContent=I.children)}return k.nextSibling},_=(k,I,M,O,G,$,x)=>{x=x||!!I.dynamicChildren;const J=I.children,X=J.length;for(let N=0;N<X;N++){const te=x?J[N]:J[N]=mt(J[N]);if(k)k=h(k,te,O,G,$,x);else{if(te.type===jn&&!te.children)continue;Nt=!0,n(null,te,M,null,O,G,Ua(M),$)}}return k},g=(k,I,M,O,G,$)=>{const{slotScopeIds:x}=I;x&&(G=G?G.concat(x):x);const J=s(k),X=_(l(k),I,J,M,O,G,$);return X&&Wa(X)&&X.data==="]"?l(I.anchor=X):(Nt=!0,d(I.anchor=u("]"),J,X),X)},E=(k,I,M,O,G,$)=>{if(Nt=!0,I.el=null,$){const X=w(k);for(;;){const N=l(k);if(N&&N!==X)c(N);else break}}const x=l(k),J=s(k);return c(k),n(null,I,J,x,M,O,Ua(J),G),x},w=(k,I="[",M="]")=>{let O=0;for(;k;)if(k=l(k),k&&Wa(k)&&(k.data===I&&O++,k.data===M)){if(O===0)return l(k);O--}return k},y=(k,I,M)=>{const O=I.parentNode;O&&O.replaceChild(k,I);let G=M;for(;G;)G.vnode.el===I&&(G.vnode.el=G.subTree.el=k),G=G.parent},T=k=>k.nodeType===1&&k.tagName.toLowerCase()==="template";return[p,h]}const He=Mi;function Lp(e){return Ap(e,yp)}function Ap(e,t){const n=cr();n.__VUE__=!0;const{insert:a,remove:o,patchProp:l,createElement:s,createText:c,createComment:d,setText:u,setElementText:p,parentNode:h,nextSibling:m,setScopeId:_=Tt,insertStaticContent:g}=e,E=(f,b,A,D=null,R=null,S=null,Q=!1,q=null,B=!!b.dynamicChildren)=>{if(f===b)return;f&&!cn(f,b)&&(D=P(f),Me(f,R,S,!0),f=null),b.patchFlag===-2&&(B=!1,b.dynamicChildren=null);const{type:V,ref:Z,shapeFlag:W}=b;switch(V){case jn:w(f,b,A,D);break;case ct:y(f,b,A,D);break;case ca:f==null&&T(b,A,D,Q);break;case Ye:N(f,b,A,D,R,S,Q,q,B);break;default:W&1?M(f,b,A,D,R,S,Q,q,B):W&6?te(f,b,A,D,R,S,Q,q,B):(W&64||W&128)&&V.process(f,b,A,D,R,S,Q,q,B,j)}Z!=null&&R&&uo(Z,f&&f.ref,S,b||f,!b)},w=(f,b,A,D)=>{if(f==null)a(b.el=c(b.children),A,D);else{const R=b.el=f.el;b.children!==f.children&&u(R,b.children)}},y=(f,b,A,D)=>{f==null?a(b.el=d(b.children||""),A,D):b.el=f.el},T=(f,b,A,D)=>{[f.el,f.anchor]=g(f.children,b,A,D,f.el,f.anchor)},k=({el:f,anchor:b},A,D)=>{let R;for(;f&&f!==b;)R=m(f),a(f,A,D),f=R;a(b,A,D)},I=({el:f,anchor:b})=>{let A;for(;f&&f!==b;)A=m(f),o(f),f=A;o(b)},M=(f,b,A,D,R,S,Q,q,B)=>{Q=Q||b.type==="svg",f==null?O(b,A,D,R,S,Q,q,B):x(f,b,R,S,Q,q,B)},O=(f,b,A,D,R,S,Q,q)=>{let B,V;const{type:Z,props:W,shapeFlag:Y,transition:ae,dirs:se}=f;if(B=f.el=s(f.type,S,W&&W.is,W),Y&8?p(B,f.children):Y&16&&$(f.children,B,null,D,R,S&&Z!=="foreignObject",Q,q),se&&wt(f,null,D,"created"),G(B,f,f.scopeId,Q,D),W){for(const Ee in W)Ee!=="value"&&!la(Ee)&&l(B,Ee,null,W[Ee],S,f.children,D,R,Ve);"value"in W&&l(B,"value",null,W.value),(V=W.onVnodeBeforeMount)&&ot(V,D,f)}se&&wt(f,null,D,"beforeMount");const ye=Xi(R,ae);ye&&ae.beforeEnter(B),a(B,b,A),((V=W&&W.onVnodeMounted)||ye||se)&&He(()=>{V&&ot(V,D,f),ye&&ae.enter(B),se&&wt(f,null,D,"mounted")},R)},G=(f,b,A,D,R)=>{if(A&&_(f,A),D)for(let S=0;S<D.length;S++)_(f,D[S]);if(R){let S=R.subTree;if(b===S){const Q=R.vnode;G(f,Q,Q.scopeId,Q.slotScopeIds,R.parent)}}},$=(f,b,A,D,R,S,Q,q,B=0)=>{for(let V=B;V<f.length;V++){const Z=f[V]=q?Ut(f[V]):mt(f[V]);E(null,Z,b,A,D,R,S,Q,q)}},x=(f,b,A,D,R,S,Q)=>{const q=b.el=f.el;let{patchFlag:B,dynamicChildren:V,dirs:Z}=b;B|=f.patchFlag&16;const W=f.props||Ie,Y=b.props||Ie;let ae;A&&rn(A,!1),(ae=Y.onVnodeBeforeUpdate)&&ot(ae,A,b,f),Z&&wt(b,f,A,"beforeUpdate"),A&&rn(A,!0);const se=R&&b.type!=="foreignObject";if(V?J(f.dynamicChildren,V,q,A,D,se,S):Q||U(f,b,q,null,A,D,se,S,!1),B>0){if(B&16)X(q,b,W,Y,A,D,R);else if(B&2&&W.class!==Y.class&&l(q,"class",null,Y.class,R),B&4&&l(q,"style",W.style,Y.style,R),B&8){const ye=b.dynamicProps;for(let Ee=0;Ee<ye.length;Ee++){const xe=ye[Ee],vt=W[xe],kn=Y[xe];(kn!==vt||xe==="value")&&l(q,xe,vt,kn,R,f.children,A,D,Ve)}}B&1&&f.children!==b.children&&p(q,b.children)}else!Q&&V==null&&X(q,b,W,Y,A,D,R);((ae=Y.onVnodeUpdated)||Z)&&He(()=>{ae&&ot(ae,A,b,f),Z&&wt(b,f,A,"updated")},D)},J=(f,b,A,D,R,S,Q)=>{for(let q=0;q<b.length;q++){const B=f[q],V=b[q],Z=B.el&&(B.type===Ye||!cn(B,V)||B.shapeFlag&70)?h(B.el):A;E(B,V,Z,null,D,R,S,Q,!0)}},X=(f,b,A,D,R,S,Q)=>{if(A!==D){if(A!==Ie)for(const q in A)!la(q)&&!(q in D)&&l(f,q,A[q],null,Q,b.children,R,S,Ve);for(const q in D){if(la(q))continue;const B=D[q],V=A[q];B!==V&&q!=="value"&&l(f,q,V,B,Q,b.children,R,S,Ve)}"value"in D&&l(f,"value",A.value,D.value)}},N=(f,b,A,D,R,S,Q,q,B)=>{const V=b.el=f?f.el:c(""),Z=b.anchor=f?f.anchor:c("");let{patchFlag:W,dynamicChildren:Y,slotScopeIds:ae}=b;ae&&(q=q?q.concat(ae):ae),f==null?(a(V,A,D),a(Z,A,D),$(b.children,A,Z,R,S,Q,q,B)):W>0&&W&64&&Y&&f.dynamicChildren?(J(f.dynamicChildren,Y,A,R,S,Q,q),(b.key!=null||R&&b===R.subTree)&&Zi(f,b,!0)):U(f,b,A,Z,R,S,Q,q,B)},te=(f,b,A,D,R,S,Q,q,B)=>{b.slotScopeIds=q,f==null?b.shapeFlag&512?R.ctx.activate(b,A,D,Q,B):De(b,A,D,R,S,Q,B):we(f,b,B)},De=(f,b,A,D,R,S,Q)=>{const q=f.component=qp(f,D,R);if(Da(f)&&(q.ctx.renderer=j),Cp(q),q.asyncDep){if(R&&R.registerDep(q,z),!f.el){const B=q.subTree=Re(ct);y(null,B,b,A)}return}z(q,f,b,A,R,S,Q)},we=(f,b,A)=>{const D=b.component=f.component;if(z0(f,b,A))if(D.asyncDep&&!D.asyncResolved){ne(D,b,A);return}else D.next=b,J0(D.update),D.update();else b.el=f.el,D.vnode=b},z=(f,b,A,D,R,S,Q)=>{const q=()=>{if(f.isMounted){let{next:Z,bu:W,u:Y,parent:ae,vnode:se}=f,ye=Z,Ee;rn(f,!1),Z?(Z.el=se.el,ne(f,Z,Q)):Z=se,W&&Mo(W),(Ee=Z.props&&Z.props.onVnodeBeforeUpdate)&&ot(Ee,ae,Z,se),rn(f,!0);const xe=jo(f),vt=f.subTree;f.subTree=xe,E(vt,xe,h(vt.el),P(vt),f,R,S),Z.el=xe.el,ye===null&&U0(f,xe.el),Y&&He(Y,R),(Ee=Z.props&&Z.props.onVnodeUpdated)&&He(()=>ot(Ee,ae,Z,se),R)}else{let Z;const{el:W,props:Y}=b,{bm:ae,m:se,parent:ye}=f,Ee=sa(b);if(rn(f,!1),ae&&Mo(ae),!Ee&&(Z=Y&&Y.onVnodeBeforeMount)&&ot(Z,ye,b),rn(f,!0),W&&pe){const xe=()=>{f.subTree=jo(f),pe(W,f.subTree,f,R,null)};Ee?b.type.__asyncLoader().then(()=>!f.isUnmounted&&xe()):xe()}else{const xe=f.subTree=jo(f);E(null,xe,A,D,f,R,S),b.el=xe.el}if(se&&He(se,R),!Ee&&(Z=Y&&Y.onVnodeMounted)){const xe=b;He(()=>ot(Z,ye,xe),R)}(b.shapeFlag&256||ye&&sa(ye.vnode)&&ye.vnode.shapeFlag&256)&&f.a&&He(f.a,R),f.isMounted=!0,b=A=D=null}},B=f.effect=new Nr(q,()=>ko(V),f.scope),V=f.update=()=>B.run();V.id=f.uid,rn(f,!0),V()},ne=(f,b,A)=>{b.component=f;const D=f.vnode.props;f.vnode=b,f.next=null,gp(f,b.props,D,A),kp(f,b.children,A),Un(),Fl(f),Wn()},U=(f,b,A,D,R,S,Q,q,B=!1)=>{const V=f&&f.children,Z=f?f.shapeFlag:0,W=b.children,{patchFlag:Y,shapeFlag:ae}=b;if(Y>0){if(Y&128){yt(V,W,A,D,R,S,Q,q,B);return}else if(Y&256){Se(V,W,A,D,R,S,Q,q,B);return}}ae&8?(Z&16&&Ve(V,R,S),W!==V&&p(A,W)):Z&16?ae&16?yt(V,W,A,D,R,S,Q,q,B):Ve(V,R,S,!0):(Z&8&&p(A,""),ae&16&&$(W,A,D,R,S,Q,q,B))},Se=(f,b,A,D,R,S,Q,q,B)=>{f=f||Rn,b=b||Rn;const V=f.length,Z=b.length,W=Math.min(V,Z);let Y;for(Y=0;Y<W;Y++){const ae=b[Y]=B?Ut(b[Y]):mt(b[Y]);E(f[Y],ae,A,null,R,S,Q,q,B)}V>Z?Ve(f,R,S,!0,!1,W):$(b,A,D,R,S,Q,q,B,W)},yt=(f,b,A,D,R,S,Q,q,B)=>{let V=0;const Z=b.length;let W=f.length-1,Y=Z-1;for(;V<=W&&V<=Y;){const ae=f[V],se=b[V]=B?Ut(b[V]):mt(b[V]);if(cn(ae,se))E(ae,se,A,null,R,S,Q,q,B);else break;V++}for(;V<=W&&V<=Y;){const ae=f[W],se=b[Y]=B?Ut(b[Y]):mt(b[Y]);if(cn(ae,se))E(ae,se,A,null,R,S,Q,q,B);else break;W--,Y--}if(V>W){if(V<=Y){const ae=Y+1,se=ae<Z?b[ae].el:D;for(;V<=Y;)E(null,b[V]=B?Ut(b[V]):mt(b[V]),A,se,R,S,Q,q,B),V++}}else if(V>Y)for(;V<=W;)Me(f[V],R,S,!0),V++;else{const ae=V,se=V,ye=new Map;for(V=se;V<=Y;V++){const Xe=b[V]=B?Ut(b[V]):mt(b[V]);Xe.key!=null&&ye.set(Xe.key,V)}let Ee,xe=0;const vt=Y-se+1;let kn=!1,Vl=0;const Yn=new Array(vt);for(V=0;V<vt;V++)Yn[V]=0;for(V=ae;V<=W;V++){const Xe=f[V];if(xe>=vt){Me(Xe,R,S,!0);continue}let At;if(Xe.key!=null)At=ye.get(Xe.key);else for(Ee=se;Ee<=Y;Ee++)if(Yn[Ee-se]===0&&cn(Xe,b[Ee])){At=Ee;break}At===void 0?Me(Xe,R,S,!0):(Yn[At-se]=V+1,At>=Vl?Vl=At:kn=!0,E(Xe,b[At],A,null,R,S,Q,q,B),xe++)}const xl=kn?wp(Yn):Rn;for(Ee=xl.length-1,V=vt-1;V>=0;V--){const Xe=se+V,At=b[Xe],ql=Xe+1<Z?b[Xe+1].el:D;Yn[V]===0?E(null,At,A,ql,R,S,Q,q,B):kn&&(Ee<0||V!==xl[Ee]?nt(At,A,ql,2):Ee--)}}},nt=(f,b,A,D,R=null)=>{const{el:S,type:Q,transition:q,children:B,shapeFlag:V}=f;if(V&6){nt(f.component.subTree,b,A,D);return}if(V&128){f.suspense.move(b,A,D);return}if(V&64){Q.move(f,b,A,j);return}if(Q===Ye){a(S,b,A);for(let W=0;W<B.length;W++)nt(B[W],b,A,D);a(f.anchor,b,A);return}if(Q===ca){k(f,b,A);return}if(D!==2&&V&1&&q)if(D===0)q.beforeEnter(S),a(S,b,A),He(()=>q.enter(S),R);else{const{leave:W,delayLeave:Y,afterLeave:ae}=q,se=()=>a(S,b,A),ye=()=>{W(S,()=>{se(),ae&&ae()})};Y?Y(S,se,ye):ye()}else a(S,b,A)},Me=(f,b,A,D=!1,R=!1)=>{const{type:S,props:Q,ref:q,children:B,dynamicChildren:V,shapeFlag:Z,patchFlag:W,dirs:Y}=f;if(q!=null&&uo(q,null,A,f,!0),Z&256){b.ctx.deactivate(f);return}const ae=Z&1&&Y,se=!sa(f);let ye;if(se&&(ye=Q&&Q.onVnodeBeforeUnmount)&&ot(ye,b,f),Z&6)Lt(f.component,A,D);else{if(Z&128){f.suspense.unmount(A,D);return}ae&&wt(f,null,b,"beforeUnmount"),Z&64?f.type.remove(f,b,A,R,j,D):V&&(S!==Ye||W>0&&W&64)?Ve(V,b,A,!1,!0):(S===Ye&&W&384||!R&&Z&16)&&Ve(B,b,A),D&&Ke(f)}(se&&(ye=Q&&Q.onVnodeUnmounted)||ae)&&He(()=>{ye&&ot(ye,b,f),ae&&wt(f,null,b,"unmounted")},A)},Ke=f=>{const{type:b,el:A,anchor:D,transition:R}=f;if(b===Ye){Dt(A,D);return}if(b===ca){I(f);return}const S=()=>{o(A),R&&!R.persisted&&R.afterLeave&&R.afterLeave()};if(f.shapeFlag&1&&R&&!R.persisted){const{leave:Q,delayLeave:q}=R,B=()=>Q(A,S);q?q(f.el,S,B):B()}else S()},Dt=(f,b)=>{let A;for(;f!==b;)A=m(f),o(f),f=A;o(b)},Lt=(f,b,A)=>{const{bum:D,scope:R,update:S,subTree:Q,um:q}=f;D&&Mo(D),R.stop(),S&&(S.active=!1,Me(Q,f,b,A)),q&&He(q,b),He(()=>{f.isUnmounted=!0},b),b&&b.pendingBranch&&!b.isUnmounted&&f.asyncDep&&!f.asyncResolved&&f.suspenseId===b.pendingId&&(b.deps--,b.deps===0&&b.resolve())},Ve=(f,b,A,D=!1,R=!1,S=0)=>{for(let Q=S;Q<f.length;Q++)Me(f[Q],b,A,D,R)},P=f=>f.shapeFlag&6?P(f.component.subTree):f.shapeFlag&128?f.suspense.next():m(f.anchor||f.el),F=(f,b,A)=>{f==null?b._vnode&&Me(b._vnode,null,null,!0):E(b._vnode||null,f,b,null,null,null,A),Fl(),lo(),b._vnode=f},j={p:E,um:Me,m:nt,r:Ke,mt:De,mc:$,pc:U,pbc:J,n:P,o:e};let K,pe;return t&&([K,pe]=t(j)),{render:F,hydrate:K,createApp:_p(F,K)}}function rn({effect:e,update:t},n){e.allowRecurse=t.allowRecurse=n}function Xi(e,t){return(!e||e&&!e.pendingBranch)&&t&&!t.persisted}function Zi(e,t,n=!1){const a=e.children,o=t.children;if(ee(a)&&ee(o))for(let l=0;l<a.length;l++){const s=a[l];let c=o[l];c.shapeFlag&1&&!c.dynamicChildren&&((c.patchFlag<=0||c.patchFlag===32)&&(c=o[l]=Ut(o[l]),c.el=s.el),n||Zi(s,c)),c.type===jn&&(c.el=s.el)}}function wp(e){const t=e.slice(),n=[0];let a,o,l,s,c;const d=e.length;for(a=0;a<d;a++){const u=e[a];if(u!==0){if(o=n[n.length-1],e[o]<u){t[a]=o,n.push(a);continue}for(l=0,s=n.length-1;l<s;)c=l+s>>1,e[n[c]]<u?l=c+1:s=c;u<e[n[l]]&&(l>0&&(t[a]=n[l-1]),n[l]=a)}}for(l=n.length,s=n[l-1];l-- >0;)n[l]=s,s=t[s];return n}const Ip=e=>e.__isTeleport,Ye=Symbol.for("v-fgt"),jn=Symbol.for("v-txt"),ct=Symbol.for("v-cmt"),ca=Symbol.for("v-stc"),ua=[];let ft=null;function Tp(e=!1){ua.push(ft=e?null:[])}function Dp(){ua.pop(),ft=ua[ua.length-1]||null}let ba=1;function ns(e){ba+=e}function Yi(e){return e.dynamicChildren=ba>0?ft||Rn:null,Dp(),ba>0&&ft&&ft.push(e),e}function d3(e,t,n,a,o,l){return Yi(tc(e,t,n,a,o,l,!0))}function Pp(e,t,n,a,o){return Yi(Re(e,t,n,a,o,!0))}function gr(e){return e?e.__v_isVNode===!0:!1}function cn(e,t){return e.type===t.type&&e.key===t.key}const Ao="__vInternal",ec=({key:e})=>e??null,no=({ref:e,ref_key:t,ref_for:n})=>(typeof e=="number"&&(e=""+e),e!=null?ce(e)||Je(e)||oe(e)?{i:lt,r:e,k:t,f:!!n}:e:null);function tc(e,t=null,n=null,a=0,o=null,l=e===Ye?0:1,s=!1,c=!1){const d={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&ec(t),ref:t&&no(t),scopeId:qi,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetAnchor:null,staticCount:0,shapeFlag:l,patchFlag:a,dynamicProps:o,dynamicChildren:null,appContext:null,ctx:lt};return c?(tl(d,n),l&128&&e.normalize(d)):n&&(d.shapeFlag|=ce(n)?8:16),ba>0&&!s&&ft&&(d.patchFlag>0||l&6)&&d.patchFlag!==32&&ft.push(d),d}const Re=Rp;function Rp(e,t=null,n=null,a=0,o=null,l=!1){if((!e||e===W0)&&(e=ct),gr(e)){const c=Zt(e,t,!0);return n&&tl(c,n),ba>0&&!l&&ft&&(c.shapeFlag&6?ft[ft.indexOf(e)]=c:ft.push(c)),c.patchFlag|=-2,c}if(Np(e)&&(e=e.__vccOpts),t){t=Op(t);let{class:c,style:d}=t;c&&!ce(c)&&(t.class=bo(c)),Pe(d)&&(Ii(d)&&!ee(d)&&(d=qe({},d)),t.style=go(d))}const s=ce(e)?1:K0(e)?128:Ip(e)?64:Pe(e)?4:oe(e)?2:0;return tc(e,t,n,a,o,s,l,!0)}function Op(e){return e?Ii(e)||Ao in e?qe({},e):e:null}function Zt(e,t,n=!1){const{props:a,ref:o,patchFlag:l,children:s}=e,c=t?Sp(a||{},t):a;return{__v_isVNode:!0,__v_skip:!0,type:e.type,props:c,key:c&&ec(c),ref:t&&t.ref?n&&o?ee(o)?o.concat(no(t)):[o,no(t)]:no(t):o,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:s,target:e.target,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==Ye?l===-1?16:l|16:l,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:e.transition,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&Zt(e.ssContent),ssFallback:e.ssFallback&&Zt(e.ssFallback),el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce}}function nc(e=" ",t=0){return Re(jn,null,e,t)}function p3(e,t){const n=Re(ca,null,e);return n.staticCount=t,n}function v3(e="",t=!1){return t?(Tp(),Pp(ct,null,e)):Re(ct,null,e)}function mt(e){return e==null||typeof e=="boolean"?Re(ct):ee(e)?Re(Ye,null,e.slice()):typeof e=="object"?Ut(e):Re(jn,null,String(e))}function Ut(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:Zt(e)}function tl(e,t){let n=0;const{shapeFlag:a}=e;if(t==null)t=null;else if(ee(t))n=16;else if(typeof t=="object")if(a&65){const o=t.default;o&&(o._c&&(o._d=!1),tl(e,o()),o._c&&(o._d=!0));return}else{n=32;const o=t._;!o&&!(Ao in t)?t._ctx=lt:o===3&&lt&&(lt.slots._===1?t._=1:(t._=2,e.patchFlag|=1024))}else oe(t)?(t={default:t,_ctx:lt},n=32):(t=String(t),a&64?(n=16,t=[nc(t)]):n=8);e.children=t,e.shapeFlag|=n}function Sp(...e){const t={};for(let n=0;n<e.length;n++){const a=e[n];for(const o in a)if(o==="class")t.class!==a.class&&(t.class=bo([t.class,a.class]));else if(o==="style")t.style=go([t.style,a.style]);else if(Aa(o)){const l=t[o],s=a[o];s&&l!==s&&!(ee(l)&&l.includes(s))&&(t[o]=l?[].concat(l,s):s)}else o!==""&&(t[o]=a[o])}return t}function ot(e,t,n,a=null){st(e,t,7,[n,a])}const Vp=Hi();let xp=0;function qp(e,t,n){const a=e.type,o=(t?t.appContext:e.appContext)||Vp,l={uid:xp++,vnode:e,type:a,parent:t,appContext:o,root:null,next:null,subTree:null,effect:null,update:null,scope:new r0(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(o.provides),accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Ui(a,o),emitsOptions:xi(a,o),emit:null,emitted:null,propsDefaults:Ie,inheritAttrs:a.inheritAttrs,ctx:Ie,data:Ie,props:Ie,attrs:Ie,slots:Ie,refs:Ie,setupState:Ie,setupContext:null,attrsProxy:null,slotsProxy:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return l.ctx={_:l},l.root=t?t.root:l,l.emit=$0.bind(null,l),e.ce&&e.ce(l),l}let Ce=null;const Xn=()=>Ce||lt;let nl,yn,as="__VUE_INSTANCE_SETTERS__";(yn=cr()[as])||(yn=cr()[as]=[]),yn.push(e=>Ce=e),nl=e=>{yn.length>1?yn.forEach(t=>t(e)):yn[0](e)};const Jn=e=>{nl(e),e.scope.on()},hn=()=>{Ce&&Ce.scope.off(),nl(null)};function ac(e){return e.vnode.shapeFlag&4}let Bn=!1;function Cp(e,t=!1){Bn=t;const{props:n,children:a}=e.vnode,o=ac(e);fp(e,n,o,t),Ep(e,a);const l=o?Mp(e,t):void 0;return Bn=!1,l}function Mp(e,t){const n=e.type;e.accessCache=Object.create(null),e.proxy=Ti(new Proxy(e.ctx,cp));const{setup:a}=n;if(a){const o=e.setupContext=a.length>1?Jp(e):null;Jn(e),Un();const l=Kt(a,e,0,[e.props,o]);if(Wn(),hn(),pi(l)){if(l.then(hn,hn),t)return l.then(s=>{os(e,s,t)}).catch(s=>{Ta(s,e,0)});e.asyncDep=l}else os(e,l,t)}else oc(e,t)}function os(e,t,n){oe(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:Pe(t)&&(e.setupState=Pi(t)),oc(e,n)}let rs;function oc(e,t,n){const a=e.type;if(!e.render){if(!t&&rs&&!a.render){const o=a.template||Yr(e).template;if(o){const{isCustomElement:l,compilerOptions:s}=e.appContext.config,{delimiters:c,compilerOptions:d}=a,u=qe(qe({isCustomElement:l,delimiters:c},s),d);a.render=rs(o,u)}}e.render=a.render||Tt}{Jn(e),Un();try{up(e)}finally{Wn(),hn()}}}function jp(e){return e.attrsProxy||(e.attrsProxy=new Proxy(e.attrs,{get(t,n){return We(e,"get","$attrs"),t[n]}}))}function Jp(e){const t=n=>{e.exposed=n||{}};return{get attrs(){return jp(e)},slots:e.slots,emit:e.emit,expose:t}}function al(e){if(e.exposed)return e.exposeProxy||(e.exposeProxy=new Proxy(Pi(Ti(e.exposed)),{get(t,n){if(n in t)return t[n];if(n in ia)return ia[n](e)},has(t,n){return n in t||n in ia}}))}function Bp(e,t=!0){return oe(e)?e.displayName||e.name:e.name||t&&e.__name}function Np(e){return oe(e)&&"__vccOpts"in e}const L=(e,t)=>C0(e,t,Bn);function i(e,t,n){const a=arguments.length;return a===2?Pe(t)&&!ee(t)?gr(t)?Re(e,null,[t]):Re(e,t):Re(e,null,t):(a>3?n=Array.prototype.slice.call(arguments,2):a===3&&gr(n)&&(n=[n]),Re(e,t,n))}const $p=Symbol.for("v-scx"),Qp=()=>me($p),Fp="3.3.13",Hp="http://www.w3.org/2000/svg",un=typeof document<"u"?document:null,ls=un&&un.createElement("template"),zp={insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{const t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,a)=>{const o=t?un.createElementNS(Hp,e):un.createElement(e,n?{is:n}:void 0);return e==="select"&&a&&a.multiple!=null&&o.setAttribute("multiple",a.multiple),o},createText:e=>un.createTextNode(e),createComment:e=>un.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>un.querySelector(e),setScopeId(e,t){e.setAttribute(t,"")},insertStaticContent(e,t,n,a,o,l){const s=n?n.previousSibling:t.lastChild;if(o&&(o===l||o.nextSibling))for(;t.insertBefore(o.cloneNode(!0),n),!(o===l||!(o=o.nextSibling)););else{ls.innerHTML=a?`<svg>${e}</svg>`:e;const c=ls.content;if(a){const d=c.firstChild;for(;d.firstChild;)c.appendChild(d.firstChild);c.removeChild(d)}t.insertBefore(c,n)}return[s?s.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}},$t="transition",ea="animation",Nn=Symbol("_vtc"),Yt=(e,{slots:t})=>i(Y0,lc(e),t);Yt.displayName="Transition";const rc={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String},Up=Yt.props=qe({},Bi,rc),ln=(e,t=[])=>{ee(e)?e.forEach(n=>n(...t)):e&&e(...t)},ss=e=>e?ee(e)?e.some(t=>t.length>1):e.length>1:!1;function lc(e){const t={};for(const N in e)N in rc||(t[N]=e[N]);if(e.css===!1)return t;const{name:n="v",type:a,duration:o,enterFromClass:l=`${n}-enter-from`,enterActiveClass:s=`${n}-enter-active`,enterToClass:c=`${n}-enter-to`,appearFromClass:d=l,appearActiveClass:u=s,appearToClass:p=c,leaveFromClass:h=`${n}-leave-from`,leaveActiveClass:m=`${n}-leave-active`,leaveToClass:_=`${n}-leave-to`}=e,g=Wp(o),E=g&&g[0],w=g&&g[1],{onBeforeEnter:y,onEnter:T,onEnterCancelled:k,onLeave:I,onLeaveCancelled:M,onBeforeAppear:O=y,onAppear:G=T,onAppearCancelled:$=k}=t,x=(N,te,De)=>{Ht(N,te?p:c),Ht(N,te?u:s),De&&De()},J=(N,te)=>{N._isLeaving=!1,Ht(N,h),Ht(N,_),Ht(N,m),te&&te()},X=N=>(te,De)=>{const we=N?G:T,z=()=>x(te,N,De);ln(we,[te,z]),is(()=>{Ht(te,N?d:l),Rt(te,N?p:c),ss(we)||cs(te,a,E,z)})};return qe(t,{onBeforeEnter(N){ln(y,[N]),Rt(N,l),Rt(N,s)},onBeforeAppear(N){ln(O,[N]),Rt(N,d),Rt(N,u)},onEnter:X(!1),onAppear:X(!0),onLeave(N,te){N._isLeaving=!0;const De=()=>J(N,te);Rt(N,h),ic(),Rt(N,m),is(()=>{N._isLeaving&&(Ht(N,h),Rt(N,_),ss(I)||cs(N,a,w,De))}),ln(I,[N,De])},onEnterCancelled(N){x(N,!1),ln(k,[N])},onAppearCancelled(N){x(N,!0),ln($,[N])},onLeaveCancelled(N){J(N),ln(M,[N])}})}function Wp(e){if(e==null)return null;if(Pe(e))return[$o(e.enter),$o(e.leave)];{const t=$o(e);return[t,t]}}function $o(e){return Zd(e)}function Rt(e,t){t.split(/\s+/).forEach(n=>n&&e.classList.add(n)),(e[Nn]||(e[Nn]=new Set)).add(t)}function Ht(e,t){t.split(/\s+/).forEach(a=>a&&e.classList.remove(a));const n=e[Nn];n&&(n.delete(t),n.size||(e[Nn]=void 0))}function is(e){requestAnimationFrame(()=>{requestAnimationFrame(e)})}let Gp=0;function cs(e,t,n,a){const o=e._endId=++Gp,l=()=>{o===e._endId&&a()};if(n)return setTimeout(l,n);const{type:s,timeout:c,propCount:d}=sc(e,t);if(!s)return a();const u=s+"end";let p=0;const h=()=>{e.removeEventListener(u,m),l()},m=_=>{_.target===e&&++p>=d&&h()};setTimeout(()=>{p<d&&h()},c+1),e.addEventListener(u,m)}function sc(e,t){const n=window.getComputedStyle(e),a=g=>(n[g]||"").split(", "),o=a(`${$t}Delay`),l=a(`${$t}Duration`),s=us(o,l),c=a(`${ea}Delay`),d=a(`${ea}Duration`),u=us(c,d);let p=null,h=0,m=0;t===$t?s>0&&(p=$t,h=s,m=l.length):t===ea?u>0&&(p=ea,h=u,m=d.length):(h=Math.max(s,u),p=h>0?s>u?$t:ea:null,m=p?p===$t?l.length:d.length:0);const _=p===$t&&/\b(transform|all)(,|$)/.test(a(`${$t}Property`).toString());return{type:p,timeout:h,propCount:m,hasTransform:_}}function us(e,t){for(;e.length<t.length;)e=e.concat(e);return Math.max(...t.map((n,a)=>ds(n)+ds(e[a])))}function ds(e){return e==="auto"?0:Number(e.slice(0,-1).replace(",","."))*1e3}function ic(){return document.body.offsetHeight}function Kp(e,t,n){const a=e[Nn];a&&(t=(t?[t,...a]:[...a]).join(" ")),t==null?e.removeAttribute("class"):n?e.setAttribute("class",t):e.className=t}const Xp=Symbol("_vod"),Zp=Symbol("");function Yp(e,t,n){const a=e.style,o=ce(n);if(n&&!o){if(t&&!ce(t))for(const l in t)n[l]==null&&br(a,l,"");for(const l in n)br(a,l,n[l])}else{const l=a.display;if(o){if(t!==n){const s=a[Zp];s&&(n+=";"+s),a.cssText=n}}else t&&e.removeAttribute("style");Xp in e&&(a.display=l)}}const ps=/\s*!important$/;function br(e,t,n){if(ee(n))n.forEach(a=>br(e,t,a));else if(n==null&&(n=""),t.startsWith("--"))e.setProperty(t,n);else{const a=ev(e,t);ps.test(n)?e.setProperty(zn(a),n.replace(ps,""),"important"):e[a]=n}}const vs=["Webkit","Moz","ms"],Qo={};function ev(e,t){const n=Qo[t];if(n)return n;let a=dt(t);if(a!=="filter"&&a in e)return Qo[t]=a;a=wa(a);for(let o=0;o<vs.length;o++){const l=vs[o]+a;if(l in e)return Qo[t]=l}return t}const hs="http://www.w3.org/1999/xlink";function tv(e,t,n,a,o){if(a&&t.startsWith("xlink:"))n==null?e.removeAttributeNS(hs,t.slice(6,t.length)):e.setAttributeNS(hs,t,n);else{const l=o0(t);n==null||l&&!vi(n)?e.removeAttribute(t):e.setAttribute(t,l?"":n)}}function nv(e,t,n,a,o,l,s){if(t==="innerHTML"||t==="textContent"){a&&s(a,o,l),e[t]=n??"";return}const c=e.tagName;if(t==="value"&&c!=="PROGRESS"&&!c.includes("-")){e._value=n;const u=c==="OPTION"?e.getAttribute("value"):e.value,p=n??"";u!==p&&(e.value=p),n==null&&e.removeAttribute(t);return}let d=!1;if(n===""||n==null){const u=typeof e[t];u==="boolean"?n=vi(n):n==null&&u==="string"?(n="",d=!0):u==="number"&&(n=0,d=!0)}try{e[t]=n}catch{}d&&e.removeAttribute(t)}function av(e,t,n,a){e.addEventListener(t,n,a)}function ov(e,t,n,a){e.removeEventListener(t,n,a)}const ms=Symbol("_vei");function rv(e,t,n,a,o=null){const l=e[ms]||(e[ms]={}),s=l[t];if(a&&s)s.value=a;else{const[c,d]=lv(t);if(a){const u=l[t]=cv(a,o);av(e,c,u,d)}else s&&(ov(e,c,s,d),l[t]=void 0)}}const _s=/(?:Once|Passive|Capture)$/;function lv(e){let t;if(_s.test(e)){t={};let a;for(;a=e.match(_s);)e=e.slice(0,e.length-a[0].length),t[a[0].toLowerCase()]=!0}return[e[2]===":"?e.slice(3):zn(e.slice(2)),t]}let Fo=0;const sv=Promise.resolve(),iv=()=>Fo||(sv.then(()=>Fo=0),Fo=Date.now());function cv(e,t){const n=a=>{if(!a._vts)a._vts=Date.now();else if(a._vts<=n.attached)return;st(uv(a,n.value),t,5,[a])};return n.value=e,n.attached=iv(),n}function uv(e,t){if(ee(t)){const n=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0},t.map(a=>o=>!o._stopped&&a&&a(o))}else return t}const fs=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)>96&&e.charCodeAt(2)<123,dv=(e,t,n,a,o=!1,l,s,c,d)=>{t==="class"?Kp(e,a,o):t==="style"?Yp(e,n,a):Aa(t)?Mr(t)||rv(e,t,n,a,s):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):pv(e,t,a,o))?nv(e,t,a,l,s,c,d):(t==="true-value"?e._trueValue=a:t==="false-value"&&(e._falseValue=a),tv(e,t,a,o))};function pv(e,t,n,a){if(a)return!!(t==="innerHTML"||t==="textContent"||t in e&&fs(t)&&oe(n));if(t==="spellcheck"||t==="draggable"||t==="translate"||t==="form"||t==="list"&&e.tagName==="INPUT"||t==="type"&&e.tagName==="TEXTAREA")return!1;if(t==="width"||t==="height"){const o=e.tagName;if(o==="IMG"||o==="VIDEO"||o==="CANVAS"||o==="SOURCE")return!1}return fs(t)&&ce(n)?!1:t in e}const cc=new WeakMap,uc=new WeakMap,po=Symbol("_moveCb"),gs=Symbol("_enterCb"),dc={name:"TransitionGroup",props:qe({},Up,{tag:String,moveClass:String}),setup(e,{slots:t}){const n=Xn(),a=Ji();let o,l;return Qi(()=>{if(!o.length)return;const s=e.moveClass||`${e.name||"v"}-move`;if(!gv(o[0].el,n.vnode.el,s))return;o.forEach(mv),o.forEach(_v);const c=o.filter(fv);ic(),c.forEach(d=>{const u=d.el,p=u.style;Rt(u,s),p.transform=p.webkitTransform=p.transitionDuration="";const h=u[po]=m=>{m&&m.target!==u||(!m||/transform$/.test(m.propertyName))&&(u.removeEventListener("transitionend",h),u[po]=null,Ht(u,s))};u.addEventListener("transitionend",h)})}),()=>{const s=de(e),c=lc(s);let d=s.tag||Ye;o=l,l=t.default?Xr(t.default()):[];for(let u=0;u<l.length;u++){const p=l[u];p.key!=null&&ga(p,fa(p,c,a,n))}if(o)for(let u=0;u<o.length;u++){const p=o[u];ga(p,fa(p,c,a,n)),cc.set(p,p.el.getBoundingClientRect())}return Re(d,null,l)}}},vv=e=>delete e.mode;dc.props;const hv=dc;function mv(e){const t=e.el;t[po]&&t[po](),t[gs]&&t[gs]()}function _v(e){uc.set(e,e.el.getBoundingClientRect())}function fv(e){const t=cc.get(e),n=uc.get(e),a=t.left-n.left,o=t.top-n.top;if(a||o){const l=e.el.style;return l.transform=l.webkitTransform=`translate(${a}px,${o}px)`,l.transitionDuration="0s",e}}function gv(e,t,n){const a=e.cloneNode(),o=e[Nn];o&&o.forEach(c=>{c.split(/\s+/).forEach(d=>d&&a.classList.remove(d))}),n.split(/\s+/).forEach(c=>c&&a.classList.add(c)),a.style.display="none";const l=t.nodeType===1?t:t.parentNode;l.appendChild(a);const{hasTransform:s}=sc(a);return l.removeChild(a),s}const bv=qe({patchProp:dv},zp);let Ho,bs=!1;function Ev(){return Ho=bs?Ho:Lp(bv),bs=!0,Ho}const kv=(...e)=>{const t=Ev().createApp(...e),{mount:n}=t;return t.mount=a=>{const o=yv(a);if(o)return n(o,!0,o instanceof SVGElement)},t};function yv(e){return ce(e)?document.querySelector(e):e}const Lv="modulepreload",Av=function(e){return"/"+e},Es={},r=function(t,n,a){let o=Promise.resolve();if(n&&n.length>0){const l=document.getElementsByTagName("link");o=Promise.all(n.map(s=>{if(s=Av(s),s in Es)return;Es[s]=!0;const c=s.endsWith(".css"),d=c?'[rel="stylesheet"]':"";if(!!a)for(let h=l.length-1;h>=0;h--){const m=l[h];if(m.href===s&&(!c||m.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${s}"]${d}`))return;const p=document.createElement("link");if(p.rel=c?"stylesheet":Lv,c||(p.as="script",p.crossOrigin=""),p.href=s,document.head.appendChild(p),c)return new Promise((h,m)=>{p.addEventListener("load",h),p.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${s}`)))})}))}return o.then(()=>t()).catch(l=>{const s=new Event("vite:preloadError",{cancelable:!0});if(s.payload=l,window.dispatchEvent(s),!s.defaultPrevented)throw l})},wv={"v-8daa1a0e":()=>r(()=>import("./index.html-glGlA7dD.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-79fdd481":()=>r(()=>import("./home.html-6VwLL_Xj.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-0e503981":()=>r(()=>import("./slide.html-FqCU7K_6.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-74bc627b":()=>r(()=>import("./index.html-7OgNJFnG.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-2d0a870d":()=>r(()=>import("./index.html-GEmS86Sx.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-7c2196ed":()=>r(()=>import("./home.html-Hmfq7MaP.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-50a4c495":()=>r(()=>import("./slide.html-g_Bm7_fi.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-7d72c4ac":()=>r(()=>import("./index.html-3VjWJVg3.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-7e25fb5f":()=>r(()=>import("./index.html-v0lOdfq6.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-fffb8e28":()=>r(()=>import("./index.html-tW7R-bWQ.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-4c863446":()=>r(()=>import("./disable.html-B7rhzPzg.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-bf720700":()=>r(()=>import("./encrypt.html-EmPQNNmJ.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-0978b044":()=>r(()=>import("./markdown.html-zsRNMGqp.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-4eaf9f84":()=>r(()=>import("./page.html-xD20Eghc.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-2250a72e":()=>r(()=>import("./study.html-Si3e5F6n.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-14f73021":()=>r(()=>import("./index.html-2GmhDH1q.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-076107ee":()=>r(()=>import("./skill.html-vKDNx-oo.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-ef7dd9f0":()=>r(()=>import("./index.html-PP751Qpz.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-1559ca3e":()=>r(()=>import("./index.html-UVq_nMMK.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-acebc5a4":()=>r(()=>import("./mermaid.html-aes0yst7.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-30c465ed":()=>r(()=>import("./zuosi.html-G035h4j3.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-1e6b6908":()=>r(()=>import("./cert-cmm.html-3TF5WKYF.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-c1340c6e":()=>r(()=>import("./cert-dengbao.html-2tHHg1L-.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-d21282e8":()=>r(()=>import("./cert-iso27001.html-MtRbDxyH.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-fb605120":()=>r(()=>import("./dev-x-overview.html-8gI5fnna.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-0d4f9864":()=>r(()=>import("./dev-cron-x-tools.html-CFEVqUUU.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-f8115f44":()=>r(()=>import("./dev-cron-x-usage.html-mvHmNCk4.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-9fc6e360":()=>r(()=>import("./adapter.html-KIbXal7c.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-23dca26c":()=>r(()=>import("./bridge.html-yExV8il8.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-6e251184":()=>r(()=>import("./builder.html-MUDPwW8Z.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-2b152058":()=>r(()=>import("./command.html-IQw85Xpb.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-cf7f7ed0":()=>r(()=>import("./composite.html-aO-KwH-V.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-3b93eb64":()=>r(()=>import("./decorator.html-Q-pNF6-p.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-2014e344":()=>r(()=>import("./end.html-BUoUdH7h.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-8e59b74e":()=>r(()=>import("./facade.html-S-tN5pUf.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-05c85d75":()=>r(()=>import("./factory.html-THBD54Vl.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-5a65fcf4":()=>r(()=>import("./flyweight.html-rKCmwbBT.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-26071b05":()=>r(()=>import("./interpreter.html-uvxmTNdW.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-660b0285":()=>r(()=>import("./iterator.html-Un3Hpurf.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-fd9681c0":()=>r(()=>import("./mediator.html-C2NcPYgm.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-5aed6ba6":()=>r(()=>import("./memento.html-riMUf-uj.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-72940dc6":()=>r(()=>import("./observer.html-_dCWGkbi.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-7dc0f6dd":()=>r(()=>import("./prototype.html-c_sBd6oS.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-1902a411":()=>r(()=>import("./proxy.html-IsagYYUE.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-d8e95536":()=>r(()=>import("./responsibility.html-lq2egMPT.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-72c7365c":()=>r(()=>import("./seven-principles.html-IDqmedfb.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-60256d6b":()=>r(()=>import("./single.html-woOISnU-.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-7a5d87ce":()=>r(()=>import("./state.html-bUX4w84F.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-5d8882a0":()=>r(()=>import("./strategy.html-j5sIrS2C.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-4b4aaf4e":()=>r(()=>import("./summary.html-7JBNqn3x.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-4a6785aa":()=>r(()=>import("./template-method.html-2mlu74e9.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-32e615c6":()=>r(()=>import("./thought.html-UMq6h7AT.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-379fc8cc":()=>r(()=>import("./uml-class-diagram.html-AfyERZgW.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-6a6fd891":()=>r(()=>import("./visitor.html-ykhvNag_.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-34f9e282":()=>r(()=>import("./dev-lean-enterprise.html-JP-bHv-N.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-190f0eba":()=>r(()=>import("./dev-pratice-ddd.html-zbJK2-X0.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-d1bc46ac":()=>r(()=>import("./dev-pratice-tdd.html-jUJBwgOp.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-67e67766":()=>r(()=>import("./dev-th-agile-kanban.html-dLgBziK9.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-4ad012fb":()=>r(()=>import("./dev-th-agile-scrum.html-NtH0zg2u.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-0ff14b76":()=>r(()=>import("./dev-th-agile-xp.html-n5zhrQ-L.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-a29da770":()=>r(()=>import("./dev-th-agile.html-mCfsS5rE.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-dbe78e54":()=>r(()=>import("./dev-th-waterfall-model.html-9UXYi9bU.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-c419387c":()=>r(()=>import("./dev-th-waterfall-vwxh.html-UGEuvPkC.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-853d39a8":()=>r(()=>import("./dev-workflow.html-MgJXGZK5.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-ec1da6c6":()=>r(()=>import("./dev-x-overview.html-4T75974u.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-771d6280":()=>r(()=>import("./dev-agpl.html-t0hJgR4V.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-31ef009c":()=>r(()=>import("./dev-knowledge.html-5400rEOP.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-ff56eec2":()=>r(()=>import("./dev-mulan.html-bvGRIaRT.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-6c02a35d":()=>r(()=>import("./dev-opensource.html-JjUNKpg8.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-349120b4":()=>r(()=>import("./dev-x-overview.html-FIJGKRg9.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-afbcd392":()=>r(()=>import("./dev-package-x-apache-common.html-O4sk-QOL.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-aab2d5b2":()=>r(()=>import("./dev-package-x-google-guava.html-VfNeLbP4.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-b40d6c2e":()=>r(()=>import("./dev-package-x-hu-tool.html-x3rLNydr.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-743e64ee":()=>r(()=>import("./dev-package-x-json.html-_kCIv7OD.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-3389ec7d":()=>r(()=>import("./dev-package-x-log.html-Y94gSyfm.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-dbb17486":()=>r(()=>import("./dev-package-x-lombok.html-Yra135Bg.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-6fef71b0":()=>r(()=>import("./dev-package-x-mapstruct.html-eX0Dzohe.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-14eb65ee":()=>r(()=>import("./dev-package-x-others.html-v25NnBw6.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-14db18d0":()=>r(()=>import("./dev-package-x-overview.html-VZtu3vUc.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-ec231282":()=>r(()=>import("./dev-package-x-spring-util.html-f4s5Rb1p.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-079fbb4c":()=>r(()=>import("./10_bridge.html-ZpHAVq42.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-ac9cd224":()=>r(()=>import("./11_compsite.html-ZJnLpTSu.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-0861c992":()=>r(()=>import("./12_decorator.html-H3VKTrIE.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-08c5b901":()=>r(()=>import("./13_flyweight.html-aHaGC9SZ.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-594613fd":()=>r(()=>import("./14_proxy.html-Lr_y8v2X.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-53fd68e9":()=>r(()=>import("./15_chain.html-Zy6TAlmg.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-78fccfb6":()=>r(()=>import("./16_strategy.html-FA6_d7fh.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-01b09d50":()=>r(()=>import("./17_template.html-ALbzrqkN.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-a1d88988":()=>r(()=>import("./18_command.html-7LxeNlhN.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-2086f614":()=>r(()=>import("./19_observer.html-GXC6i6IP.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-4082a728":()=>r(()=>import("./1_overview.html-dA6OcxpM.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-79fb4142":()=>r(()=>import("./20_visitor.html-RQe9fHE6.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-dbe1e3c4":()=>r(()=>import("./21_state.html-gqY9aB-J.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-76fef118":()=>r(()=>import("./22_interpreter.html-rTnS5Ot7.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-557eeeb7":()=>r(()=>import("./23_iterator.html-TG-KE201.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-6af7d4da":()=>r(()=>import("./24_mediator.html-RhMwUMLh.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-5864771c":()=>r(()=>import("./25_memento.html-Ei00GN0R.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-0ea3ab36":()=>r(()=>import("./2_singleton.html-bT1eWkMl.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-fe55a6b4":()=>r(()=>import("./3_simple_factory.html-k9o4sPDD.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-29c0178e":()=>r(()=>import("./4_factory_method.html-kMZYf7pz.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-0cae1790":()=>r(()=>import("./5_abstract_factory.html-jHkgIJs2.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-263c5511":()=>r(()=>import("./6_builder.html-mzPBfJZN.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-6ea76909":()=>r(()=>import("./7_prototype.html-DyE-xsy7.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-4934c82e":()=>r(()=>import("./8_facade.html-weIaE3lh.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-0dcd2eba":()=>r(()=>import("./9_adapter.html-qF4sITn1.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-69efa1be":()=>r(()=>import("./dev-protocol-dns.html-jxceVkGA.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-0eb434c0":()=>r(()=>import("./dev-protocol-http.html--6Jue33A.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-0ec3b421":()=>r(()=>import("./dev-protocol-ip.html-JIJLAbXP.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-7edab2fb":()=>r(()=>import("./dev-protocol-network-basic.html-9BIGT_wY.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-110a0ad4":()=>r(()=>import("./dev-protocol-osi7.html-gA3c9r1r.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-d4cca062":()=>r(()=>import("./dev-protocol-overview.html-DO9x1uVP.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-129596a2":()=>r(()=>import("./dev-protocol-tcpip.html-Kf64nd7D.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-b5b65d28":()=>r(()=>import("./dev-protocol-tool-netstat.html-WE-G5IsJ.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-04359808":()=>r(()=>import("./dev-protocol-tool-tcpdump.html-gLAZ3lVA.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-4f1b6e86":()=>r(()=>import("./dev-protocol-tool-wireshark.html-VbXgYqeF.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-ca4160ee":()=>r(()=>import("./dev-protocol-udp.html-tISn5n78.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-78a32a9b":()=>r(()=>import("./dev-protocol-url.html-YYrYxCrk.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-565d93a1":()=>r(()=>import("./dev-refactor-if-else.html-qaoPxPTS.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-0fac4647":()=>r(()=>import("./dev-refactor-not-null.html-0xYF0PAz.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-4a3fd089":()=>r(()=>import("./dev-regex-all.html-vBhxqZ_G.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-a3c5a762":()=>r(()=>import("./dev-regex-tools.html-mEdMUf6r.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-24c4e449":()=>r(()=>import("./dev-regex-usage.html-mEkOrU1Q.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-adc57e62":()=>r(()=>import("./dev-security-overview.html-iAKi47hC.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-c516bfa4":()=>r(()=>import("./dev-security-x-click-hijack.html-Vy-kJ_-Z.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-2a4571a2":()=>r(()=>import("./dev-security-x-csrf.html-9oA7v2jS.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-3f273922":()=>r(()=>import("./dev-security-x-ddos.html-nvWwHdI6.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-1f68b428":()=>r(()=>import("./dev-security-x-injection.html-Zsgquj6m.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-6c74dbc9":()=>r(()=>import("./dev-security-x-owasp.html-zAQXs1C2.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-73004147":()=>r(()=>import("./dev-security-x-xss.html-jItrUP7J.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-b5ecb7da":()=>r(()=>import("./dev-security-y-pentest-workflow.html-bu5DDJON.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-68df3270":()=>r(()=>import("./dev-security-y-pratice.html-Fkvu9VdC.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-05b27368":()=>r(()=>import("./dev-microservice-kangwei.html-AEtb5_Bd.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-b8bf9bb8":()=>r(()=>import("./dev-th-acid.html-G0rLiXlk.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-7ad57090":()=>r(()=>import("./dev-th-base.html-FSLaYJcB.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-32401b5f":()=>r(()=>import("./dev-th-cap.html-4XyeQrAM.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-ec5223b4":()=>r(()=>import("./dev-th-solid.html-1YHmdAL3.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-48dcdeca":()=>r(()=>import("./dev-x-overview.html-nqQ2LyAy.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-c8f78faa":()=>r(()=>import("./dev-usage-exe-package.html-mO7Td_gF.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-220e54fa":()=>r(()=>import("./dev-usage-export-pdf.html-a0zNKMxr.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-49814f88":()=>r(()=>import("./dev-usage-flotjs.html-iHsBx_JO.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-11a0893e":()=>r(()=>import("./dev-usage-input-password.html-PE51WDZo.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-5a66bf78":()=>r(()=>import("./dev-usage-jar-readfile.html-BaC13WAY.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-2aaf51e5":()=>r(()=>import("./dev-usage-newObj.html-9kSydIl9.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-3c11b823":()=>r(()=>import("./dev-usage-overview.html-2AndUF4w.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-aa1adf3c":()=>r(()=>import("./dev-usage-zkfinger.html-Cphv-X-G.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-6fe3b808":()=>r(()=>import("./elasticsearch-awesome-es.html-nnWweyJ8.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-0246065e":()=>r(()=>import("./elasticsearch-backup.html-N3dpXjHS.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-4777caa4":()=>r(()=>import("./elasticsearch-wrapper-query.html-djAUGpJH.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-a1d46856":()=>r(()=>import("./elasticsearch-x-agg-bucket.html-f14cIIIT.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-369c8bcf":()=>r(()=>import("./elasticsearch-x-agg-metric.html-hDD0wNvg.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-e559e6c6":()=>r(()=>import("./elasticsearch-x-agg-pipeline.html-10HTT4y4.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-8fab6454":()=>r(()=>import("./elasticsearch-x-dsl-com.html-assAL1e6.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-36621528":()=>r(()=>import("./elasticsearch-x-dsl-full-text.html-vjfSYRn7.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-f0ae5462":()=>r(()=>import("./elasticsearch-x-dsl-term.html-4SvOf4IH.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-48e1eb34":()=>r(()=>import("./elasticsearch-x-index-mapping.html-K36jhbUd.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-39bc0b56":()=>r(()=>import("./elasticsearch-x-index-template.html-0BNWuLOF.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-52fe07ec":()=>r(()=>import("./elasticsearch-x-install.html-7lEK6f67.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-4ea016f8":()=>r(()=>import("./elasticsearch-x-introduce-1.html-CDKoRGyi.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-4b3665ba":()=>r(()=>import("./elasticsearch-x-introduce-2.html-aMvo41Ni.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-3ce741b4":()=>r(()=>import("./elasticsearch-x-usage.html-vTxrjO81.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-7643df78":()=>r(()=>import("./elasticsearch-y-peformance.html-GQjBVpwh.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-188cfa74":()=>r(()=>import("./elasticsearch-y-th-1.html-Ok41YWKi.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-1a41d313":()=>r(()=>import("./elasticsearch-y-th-2.html-wi3geRC_.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-1bf6abb2":()=>r(()=>import("./elasticsearch-y-th-3.html-YXzwRM9f.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-1dab8451":()=>r(()=>import("./elasticsearch-y-th-4.html-gO8ACRxk.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-0499355a":()=>r(()=>import("./elasticsearch-z-hello.html-odPVPXU4.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-49b42386":()=>r(()=>import("./elasticsearch-z-meituan.html-wR5obdAv.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-af627080":()=>r(()=>import("./elasticsearch-z-tencent.html-sn267-0f.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-91bb51f6":()=>r(()=>import("./elasticsearch.html-ENhkwujj.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-55e7b16c":()=>r(()=>import("./mongo-performance-improve.html-K6xU4dBR.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-ef2d670e":()=>r(()=>import("./mongo-performance-model.html-cym0ASnv.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-ec480f68":()=>r(()=>import("./mongo-x-basic.html-9Tx_aQDF.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-8a9f438c":()=>r(()=>import("./mongo-x-ecosystem.html-3LMQ9Dlv.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-70752795":()=>r(()=>import("./mongo-x-usage-1.html-n53ESJca.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-722a0034":()=>r(()=>import("./mongo-x-usage-2.html-nB6YJLdl.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-73ded8d3":()=>r(()=>import("./mongo-x-usage-3.html-4g8nLVzV.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-7593b172":()=>r(()=>import("./mongo-x-usage-4.html-VAh4DT27.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-77488a11":()=>r(()=>import("./mongo-x-usage-5.html-CtyzgHJ1.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-2480ea03":()=>r(()=>import("./mongo-y-arch.html-dZtovREe.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-53709252":()=>r(()=>import("./mongo-y-cache.html-WZ7slQss.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-375e0411":()=>r(()=>import("./mongo-y-checkpoint.html-5TJGWDq3.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-3d4bda3e":()=>r(()=>import("./mongo-y-doc.html-X7wN8nyc.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-3492596a":()=>r(()=>import("./mongo-y-ds.html-BWsTbd_b.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-ab09914c":()=>r(()=>import("./mongo-y-introduce.html-fjDGuCJs.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-85ec592c":()=>r(()=>import("./mongo-y-page.html--VsF9YC9.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-6d3a7b71":()=>r(()=>import("./mongo-y-trans.html-4pVfT-MM.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-3fbdde98":()=>r(()=>import("./mongo-z-backup.html-IZoiFIcs.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-08c634e6":()=>r(()=>import("./mongo-z-index.html-BIhu_ZsZ.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-edb6b08a":()=>r(()=>import("./mongo-z-rep.html-yD8n1GIC.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-5cd21616":()=>r(()=>import("./mongo-z-sharding.html-ApEMvK5q.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-3f190cd0":()=>r(()=>import("./mongo.html-iAgc_Fi-.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-336c63aa":()=>r(()=>import("./postgresql-replace.html-W62kIX8I.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-78ae1878":()=>r(()=>import("./db-redis-data-type-enc.html-RAJIZbLk.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-7e45f676":()=>r(()=>import("./db-redis-data-type-special.html-2LJUKw1w.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-efe11898":()=>r(()=>import("./db-redis-data-type-stream.html-NUBmHM-g.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-17e9eeee":()=>r(()=>import("./db-redis-data-types.html-8FmVaZxL.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-a6abd662":()=>r(()=>import("./db-redis-introduce.html-r-GE2BKI.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-40aecaab":()=>r(()=>import("./db-redis-overview.html-N2ega4AD.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-70bb63fe":()=>r(()=>import("./db-redis-x-cache.html-bhOkS5Vj.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-49dcf7ee":()=>r(()=>import("./db-redis-x-cluster.html-Bkk_vs7e.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-6e4afc4c":()=>r(()=>import("./db-redis-x-copy.html-_oU8dhSQ.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-0092b9e9":()=>r(()=>import("./db-redis-x-event.html-M9RIep-s.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-74cb7293":()=>r(()=>import("./db-redis-x-performance.html-wKRhz5pT.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-cba71f5a":()=>r(()=>import("./db-redis-x-pub-sub.html-HdwTpo06.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-41f8b388":()=>r(()=>import("./db-redis-x-rdb-aof.html-ThVrJLk8.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-1d4cc7ae":()=>r(()=>import("./db-redis-x-redis-ds.html-U-Nf0ye4.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-60238604":()=>r(()=>import("./db-redis-x-redis-object.html-ev2bEVT6.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-1a5b038b":()=>r(()=>import("./db-redis-x-sentinel.html-Y4qs4vk1.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-5e95129b":()=>r(()=>import("./db-redis-x-trans.html-Hmz_k0sE.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-4e459d68":()=>r(()=>import("./db-redis-x-version-lastest.html-7C2OA_VK.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-60ddbe48":()=>r(()=>import("./db-redis-y-monitor.html-yUrDzDxv.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-469a0776":()=>r(()=>import("./db-redis-y-mt-1.html-rKotgTZc.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-7914a5ba":()=>r(()=>import("./db-redis-y-weibo.html-KA6A5xI2.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-59725a96":()=>r(()=>import("./db-redis-z-mianshi.html-jbeg4wQ5.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-0189ba9b":()=>r(()=>import("./sql-db-howitworks.html-v20cuWFj.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-ce8499bc":()=>r(()=>import("./sql-db-theory-concept.html-JqxQ5eHi.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-294c800a":()=>r(()=>import("./sql-db-theory-design.html-2JD6j0Q0.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-4d8be846":()=>r(()=>import("./sql-db-theory.html-LJbUdvNN.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-b520a2fa":()=>r(()=>import("./sql-db.html-AfOhZLnf.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-479dfaa4":()=>r(()=>import("./sql-lan-leetcode.html--gKg-a3U.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-ed93b2c8":()=>r(()=>import("./sql-lan-optimize.html-ZP4mcu8p.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-0ca05f63":()=>r(()=>import("./sql-lan-pratice.html-_Uatjfs3.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-3ed84ea8":()=>r(()=>import("./sql-lan.html-L7qWigv2.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-6b7f2f62":()=>r(()=>import("./sql-mysql-b-tree.html-s-_Kk3jP.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-52116296":()=>r(()=>import("./sql-mysql-devide.html-h1yZjig9.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-42f2422e":()=>r(()=>import("./sql-mysql-engine.html-KFD2SpNY.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-a73fe49c":()=>r(()=>import("./sql-mysql-execute.html-ID4qJwww.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-402977d4":()=>r(()=>import("./sql-mysql-index-improve-mt.html-BUjrQ5h_.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-58dc037c":()=>r(()=>import("./sql-mysql-mvcc.html-wzadlFbP.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-089cd992":()=>r(()=>import("./sql-mysql-overview.html-lXjkETIe.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-363dead7":()=>r(()=>import("./sql-mysql-performance.html-dWr8ABbg.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-05b20410":()=>r(()=>import("./sql-mysql-slave.html-oDfdfbZU.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-e35854d0":()=>r(()=>import("./sql-mysql-sql-advisor-mt.html-cZPpf7rH.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-af64b6d8":()=>r(()=>import("./sql-mysql-sql-costmodel-mt.html-unQ2GXOc.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-0ede1ea6":()=>r(()=>import("./sql-mysql-sql-parser.html-gxQyB6wo.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-1aacba26":()=>r(()=>import("./sql-mysql-theory.html-TOGdmx8Q.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-593b73d8":()=>r(()=>import("./sql-mysql-xunjian-mt.html-9uoRvkBX.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-6d3be62a":()=>r(()=>import("./sql-oracle-overview.html-fW_hL5Zs.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-38bdd5fc":()=>r(()=>import("./java-advanced-spi.html-tcomYTU-.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-3c09b854":()=>r(()=>import("./java-basic-lan-basic.html-FvrP0rBl.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-d23382d2":()=>r(()=>import("./java-basic-lan-sum.html-UZziEf2v.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-29e9d384":()=>r(()=>import("./java-basic-oop.html-NFu2M7p0.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-291e8560":()=>r(()=>import("./java-basic-x-annotation.html-B3US0hOX.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-63ce1cd4":()=>r(()=>import("./java-basic-x-exception.html-x7zmIS4X.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-189f4acc":()=>r(()=>import("./java-basic-x-generic.html--esPZEbE.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-58387c38":()=>r(()=>import("./java-basic-x-reflection.html-0_7wQWhS.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-44ff8903":()=>r(()=>import("./java-collection-ArrayList.html-ms1cmpo5.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-f973debe":()=>r(()=>import("./java-collection-LinkedList.html-tD_aYY5f.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-07c1af0d":()=>r(()=>import("./java-collection-PriorityQueue.html-7r3VPcE1.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-c7a49100":()=>r(()=>import("./java-collection-Queue_Stack.html-ekKd2O75.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-f1a93e4e":()=>r(()=>import("./java-collection-all.html-aEcNmd_s.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-77c7f0b5":()=>r(()=>import("./java-map-HashMap_HashSet.html--Zw0W_CW.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-d718a9b2":()=>r(()=>import("./java-map-LinkedHashMap_LinkedHashSet.html-hlUEZ80H.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-7068a5d5":()=>r(()=>import("./java-map-TreeMap_TreeSet.html-DtjJf87w.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-e6e1587c":()=>r(()=>import("./java-map-WeakHashMap.html-WheNDwMz.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-3593583a":()=>r(()=>import("./java-io-aio.html-2jjyBjB-.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-0f81c6ab":()=>r(()=>import("./java-io-basic-category.html-kZOKMpCL.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-91590982":()=>r(()=>import("./java-io-basic-code-inputstream.html-BMXXgeco.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-c2e41070":()=>r(()=>import("./java-io-basic-code-outputstream.html-aMB2JDtE.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-dd6781f0":()=>r(()=>import("./java-io-basic-design-pattern.html-M0upuokY.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-1c8d45c8":()=>r(()=>import("./java-io-basic-usage.html-H2Bkn52R.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-4d1780c2":()=>r(()=>import("./java-io-bio.html-eTpk22ZJ.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-47bd7701":()=>r(()=>import("./java-io-model.html-lRh5VldI.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-6eb505c1":()=>r(()=>import("./java-io-nio-netty.html-czy0qW2X.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-74aca148":()=>r(()=>import("./java-io-nio-select-epoll.html-yrnsXr4D.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-ad7d3fdc":()=>r(()=>import("./java-io-nio-zerocopy.html-l0DynVCz.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-2ba59b36":()=>r(()=>import("./java-io-nio.html-G_h_MUNE.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-b17b64a2":()=>r(()=>import("./java-io-overview.html-CXK3JcKR.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-56bca9f0":()=>r(()=>import("./java-8-up-overview.html-aDnojZ_b.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-e9fdae4c":()=>r(()=>import("./java10.html-TcN6qXYR.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-e693fd0e":()=>r(()=>import("./java11.html-OBLHUFuM.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-13927007":()=>r(()=>import("./java12-17.html-50rBPhnc.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-e32a4bd0":()=>r(()=>import("./java12.html-1ZFkcYXC.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-dfc09a92":()=>r(()=>import("./java13.html-evhJnxAO.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-dc56e954":()=>r(()=>import("./java14.html-8fnQPvmY.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-d8ed3816":()=>r(()=>import("./java15.html-Hig9XlX7.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-d58386d8":()=>r(()=>import("./java16.html-BKqFQfSB.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-d219d59a":()=>r(()=>import("./java17.html-3OIRehR2.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-0c4bedb4":()=>r(()=>import("./java8-anno-repeat.html-9DQHIQ4z.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-cb1c4026":()=>r(()=>import("./java8-default.html-eJlkkYMi.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-0dbdd390":()=>r(()=>import("./java8-javafx.html-rep6bdDy.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-59da0611":()=>r(()=>import("./java8-jre.html-IE9RZrIl.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-d4064cb0":()=>r(()=>import("./java8-localdatetime.html-TCegtxrw.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-42fc1938":()=>r(()=>import("./java8-optional.html-QeWv3GgF.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-0db1e401":()=>r(()=>import("./java8-others.html-tsgw1WV2.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-3292fb2e":()=>r(()=>import("./java8-permgen.html-E1726XXO.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-462b5b61":()=>r(()=>import("./java8-stampedlock.html-js4kuNgT.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-c32bfbf8":()=>r(()=>import("./java8-stream.html-YTEvxoSO.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-364af0e6":()=>r(()=>import("./java8-type-anno.html-GhA_EIIX.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-23c3b54a":()=>r(()=>import("./java8-type.html-KWF7JgEW.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-b5dd4e3e":()=>r(()=>import("./java8.html-yy1BBJrJ.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-76d5ebe5":()=>r(()=>import("./java9-11.html-Jeugh3vh.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-b2739d00":()=>r(()=>import("./java9.html-MnEynNlH.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-526554b6":()=>r(()=>import("./java-jvm-agent-arthas.html-jxtROsNO.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-2c8cebb5":()=>r(()=>import("./java-jvm-agent-usage.html-Jghv7tT-.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-0620a7ea":()=>r(()=>import("./java-jvm-class-enhancer.html-FPXDwqGj.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-d2220394":()=>r(()=>import("./java-jvm-class.html-njaoDE76.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-2e496290":()=>r(()=>import("./java-jvm-classload.html-M_SHIz2G.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-1ce727c4":()=>r(()=>import("./java-jvm-cms-gc.html-EwjTvAmC.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-18eedada":()=>r(()=>import("./java-jvm-debug-idea.html-0fAyGrgT.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-5ebaefb4":()=>r(()=>import("./java-jvm-debug-tools-linux.html-a0z0P4p9.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-3f7ab1cc":()=>r(()=>import("./java-jvm-debug-tools-list.html-V8T2TQJL.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-2c851e53":()=>r(()=>import("./java-jvm-gc-g1.html-bUE4seZI.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-ccc0a742":()=>r(()=>import("./java-jvm-gc-zgc.html-pX9zq1te.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-134b39c8":()=>r(()=>import("./java-jvm-gc.html-sv3wFrWJ.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-070878a4":()=>r(()=>import("./java-jvm-jmm.html-f2JYfnGi.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-d1b45d9a":()=>r(()=>import("./java-jvm-oom-offheap.html-5bDj7ug2.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-175b530c":()=>r(()=>import("./java-jvm-oom-tool.html-7u38nCpO.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-783acf81":()=>r(()=>import("./java-jvm-oom.html-tATzX5Lt.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-7980977e":()=>r(()=>import("./java-jvm-param.html-2pq9GD5T.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-05ae10ef":()=>r(()=>import("./java-jvm-struct.html-y_3NIHQ5.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-64225912":()=>r(()=>import("./java-jvm-thread-dump.html-0Jx5RcT_.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-c35eedb8":()=>r(()=>import("./java-jvm-x-introduce.html-x-wK6K1s.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-16edf7b6":()=>r(()=>import("./java-jvm-x-overview.html-s9glhdis.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-5253f255":()=>r(()=>import("./awesome-java.html-2IKASFyN.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-a489f7dc":()=>r(()=>import("./better-java.html-C9ZQeYfi.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-2720156a":()=>r(()=>import("./01.html--PfTerrC.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-4014464e":()=>r(()=>import("./java-thread-x-juc-AtomicInteger.html-h4aU8RVu.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-55712db9":()=>r(()=>import("./java-thread-x-juc-collection-BlockingQueue.html-5jPEacif.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-0e60e6be":()=>r(()=>import("./java-thread-x-juc-collection-ConcurrentHashMap.html-y8peu_xx.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-37193a74":()=>r(()=>import("./java-thread-x-juc-collection-ConcurrentLinkedQueue.html-MyQYGVNH.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-616b765e":()=>r(()=>import("./java-thread-x-juc-collection-CopyOnWriteArrayList.html-_lUsbTVZ.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-6a09898a":()=>r(()=>import("./java-thread-x-juc-executor-ForkJoinPool.html-XL5IC0jG.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-4289cd2a":()=>r(()=>import("./java-thread-x-juc-executor-FutureTask.html-Uji8p6NM.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-b49ab68c":()=>r(()=>import("./java-thread-x-juc-executor-ScheduledThreadPoolExecutor.html-BkXaPkme.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-3344b079":()=>r(()=>import("./java-thread-x-juc-executor-ThreadPoolExecutor.html-4srF7FlU.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-29327e8d":()=>r(()=>import("./java-thread-x-juc-overview.html-62F1Afg0.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-5852c0a4":()=>r(()=>import("./java-thread-x-juc-tool-countdownlatch.html-DkjaaVgq.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-6d0d4f46":()=>r(()=>import("./java-thread-x-juc-tool-cyclicbarrier.html-et_7XuJq.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-5bebca2c":()=>r(()=>import("./java-thread-x-juc-tool-exchanger.html-KUxrpWV6.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-99933d00":()=>r(()=>import("./java-thread-x-juc-tool-phaser.html-M2latQlZ.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-277d5092":()=>r(()=>import("./java-thread-x-juc-tool-semaphore.html-fWNQMU3i.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-0d37dc6f":()=>r(()=>import("./java-thread-x-key-final.html-YGjE5lEV.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-0cb2d779":()=>r(()=>import("./java-thread-x-key-synchronized.html-nZgHnNa3.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-6dbf2df1":()=>r(()=>import("./java-thread-x-key-volatile.html-m6f5QOj3.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-7a75b5c4":()=>r(()=>import("./java-thread-x-lock-AbstractQueuedSynchronizer.html-TI7yfi33.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-5e3906d9":()=>r(()=>import("./java-thread-x-lock-LockSupport.html-tjf9HmjW.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-5f3a45a5":()=>r(()=>import("./java-thread-x-lock-ReentrantLock.html-96lEwt14.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-680a9b6e":()=>r(()=>import("./java-thread-x-lock-ReentrantReadWriteLock.html-42uZVAzV.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-15b7a148":()=>r(()=>import("./java-thread-x-lock-all.html-RXSXB53G.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-1549f7bc":()=>r(()=>import("./java-thread-x-overview.html-3D_MzWT7.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-53ba6f7e":()=>r(()=>import("./java-thread-x-theorty.html-wOkWpl5k.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-9ba68da0":()=>r(()=>import("./java-thread-x-thread-basic.html-shijIdUh.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-b7b80514":()=>r(()=>import("./java-thread-x-threadlocal.html-nGf3P-rB.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-7ec73772":()=>r(()=>import("./01.html-x2IlVHlv.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-24ff8d05":()=>r(()=>import("./overview.html-touXJO95.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-36a31b6e":()=>r(()=>import("./01.html-F5ZvHYbZ.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-22a65513":()=>r(()=>import("./alg-basic-array.html-rH0_z10m.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-5abdef58":()=>r(()=>import("./alg-basic-graph-aoe.html-b5TYT-2G.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-25cc54b8":()=>r(()=>import("./alg-basic-graph-bfs-dfs.html-dnSMYmUL.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-5d6c8a12":()=>r(()=>import("./alg-basic-graph-min-distance.html-ExHwddaX.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-ca42b324":()=>r(()=>import("./alg-basic-graph-min-tree.html-Xytn4vQH.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-03dcd98c":()=>r(()=>import("./alg-basic-graph-topo-sort.html-EMnSmnbz.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-1a33d184":()=>r(()=>import("./alg-basic-graph.html-4oHoG8f4.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-1ba9c2cc":()=>r(()=>import("./alg-basic-hashtable.html-ZM_JY6nE.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-17ccac6e":()=>r(()=>import("./alg-basic-linklist.html-7_avYWg2.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-b6f2d1a6":()=>r(()=>import("./alg-basic-overview.html-Ybg3sJ5Q.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-65370d32":()=>r(()=>import("./alg-basic-stack_queue.html-MvqcxVYo.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-31709ef9":()=>r(()=>import("./alg-basic-tree-balance.html-nXSyMy7F.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-e33b5360":()=>r(()=>import("./alg-basic-tree-hafman.html-L_p_zRuI.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-53875b8f":()=>r(()=>import("./alg-basic-tree-redblack.html-E5gSsQ8A.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-46fae135":()=>r(()=>import("./alg-basic-tree-search.html-y7V7f52Q.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-7e737b03":()=>r(()=>import("./alg-basic-tree-trie.html-aGIHx0x0.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-7ead82b0":()=>r(()=>import("./alg-basic-tree.html-zibFK5qL.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-2ca438ac":()=>r(()=>import("./alg-core-backtracking.html-qFmJ59It.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-be269f54":()=>r(()=>import("./alg-core-devide-two.html-umjCxogF.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-496c7e61":()=>r(()=>import("./alg-core-divide-and-conquer.html-z2TGy1sS.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-37a513a9":()=>r(()=>import("./alg-core-dynamic.html-zmobi26q.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-7e2afeaa":()=>r(()=>import("./alg-core-greedy.html-vBnIAAzr.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-08212d9e":()=>r(()=>import("./alg-core-overview.html-fGYC0CuV.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-96c4e2bc":()=>r(()=>import("./alg-core-search.html-CB3xkKyf.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-6d52f585":()=>r(()=>import("./alg-domain-bigdata-bloom-filter.html-yjbhgTpR.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-38904d9d":()=>r(()=>import("./alg-domain-bigdata-bucket.html-p2lcz5fB.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-7cf660e4":()=>r(()=>import("./alg-domain-bigdata-db-index.html-aF72wp2b.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-36343a0f":()=>r(()=>import("./alg-domain-bigdata-devide-and-hash.html-n-UTCRIC.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-650615b0":()=>r(()=>import("./alg-domain-bigdata-map-reduce.html-a63N2R12.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-31be9fbf":()=>r(()=>import("./alg-domain-bigdata-outsort.html-0sr0OARb.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-26e927ee":()=>r(()=>import("./alg-domain-bigdata-overview.html-sqERdWWO.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-76fe11a5":()=>r(()=>import("./alg-domain-char-match-bf.html-tOCsmw48.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-fa200404":()=>r(()=>import("./alg-domain-char-match-bm.html-SNikMzo7.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-2138fc8a":()=>r(()=>import("./alg-domain-char-match-kmp.html-mL0dEsD6.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-122bd9a8":()=>r(()=>import("./alg-domain-char-match-st.html-h_GbYUz7.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-332ed69c":()=>r(()=>import("./alg-domain-char-match.html-CRrAKIh0.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-36312da3":()=>r(()=>import("./alg-domain-distribute-overview.html-1HrhrTgk.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-1a357338":()=>r(()=>import("./alg-domain-distribute-x-consistency-hash.html-yogbVF4G.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-3eae9060":()=>r(()=>import("./alg-domain-distribute-x-paxos.html-zh61BiFq.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-7734c40a":()=>r(()=>import("./alg-domain-distribute-x-raft.html-Zbwq_wlx.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-a8291ce0":()=>r(()=>import("./alg-domain-distribute-x-zab.html-FE4pQyBa.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-213f690a":()=>r(()=>import("./alg-domain-id-snowflake.html-X9rufHzA.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-04283655":()=>r(()=>import("./alg-domain-load-balance.html-MBvNhFHU.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-35074d01":()=>r(()=>import("./alg-domain-machine.html-wskIZkhK.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-cedcc65e":()=>r(()=>import("./alg-domain-overview.html-HRca0QFk.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-0cdb1ad2":()=>r(()=>import("./alg-domain-security-degist.html-4b3xvrIV.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-1c134478":()=>r(()=>import("./alg-domain-security-secure.html-4ZjOTOIE.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-584451c1":()=>r(()=>import("./alg-domain-security-sm.html-MhP8z1tL.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-76f8c038":()=>r(()=>import("./alg-domain-suggest.html-TV0Ew_7Y.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-722b3cb8":()=>r(()=>import("./alg-other-mind.html-9qyvWjyH.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-3bdd9fde":()=>r(()=>import("./alg-sort-overview.html-FKBHFmtj.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-1845fb09":()=>r(()=>import("./alg-sort-x-bubble.html-YXFqkSa_.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-0a7bdf2a":()=>r(()=>import("./alg-sort-x-bucket.html-nodmZcBl.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-722b4f8e":()=>r(()=>import("./alg-sort-x-fast.html-lZCR9y8I.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-601746ae":()=>r(()=>import("./alg-sort-x-heap.html-gsk8Y-ac.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-389c7e08":()=>r(()=>import("./alg-sort-x-insert.html-pL7pXLbO.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-588630e5":()=>r(()=>import("./alg-sort-x-merge.html-5Ct2WvLn.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-ae687ece":()=>r(()=>import("./alg-sort-x-radix.html-dFp2wsl7.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-12a17ece":()=>r(()=>import("./alg-sort-x-select.html-jYou6lEE.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-c5e41c26":()=>r(()=>import("./alg-sort-x-shell.html-g_y6gKHe.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-04990b56":()=>r(()=>import("./code-style-alibaba.html-RZJS0naX.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-c0e64272":()=>r(()=>import("./code-style-google.html-4px6RXwR.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-4a5192c2":()=>r(()=>import("./code-style-twitter.html-TQhpf1eH.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-377ff110":()=>r(()=>import("./dev-x-overview.html-NyrjVRP3.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-5db483f2":()=>r(()=>import("./dev-qt-code-style-1.html-HB0wy73X.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-5a4ad2b4":()=>r(()=>import("./dev-qt-code-style-2.html-0Mz46IIa.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-404ec9ab":()=>r(()=>import("./dev-qt-code-style.html-7jNxpL-p.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-49af03c3":()=>r(()=>import("./dev-qt-overview.html-bHvE-KmP.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-73731470":()=>r(()=>import("./dev-qt-sonarlint.html-IRNWn8is.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-3b419dbb":()=>r(()=>import("./dev-qt-spotbugs.html-ByYwMI-K.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-44b73af2":()=>r(()=>import("./dev-ut-springboot2.html-TJrhrtax.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-b5b2dbc2":()=>r(()=>import("./dev-ut-unit-test.html-Tm4nEJEQ.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-c9c030e6":()=>r(()=>import("./dev-ut-x-junit-idea.html-4kFvr8Wc.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-2f9ed901":()=>r(()=>import("./dev-ut-x-junit.html-B7BHXAtE.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-6610f2c8":()=>r(()=>import("./dev-ut-x-junit5.html-93EyvJM5.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-0ec30915":()=>r(()=>import("./dev-ut-x-mockito.html-wkT0d4Sx.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-3706649a":()=>r(()=>import("./404.html-quGzIEax.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-2d0aa3fe":()=>r(()=>import("./index.html-kE-YhhyT.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-3903e063":()=>r(()=>import("./index.html-pRVIGQ6a.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-1891b76b":()=>r(()=>import("./index.html-hbTlmVYS.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-c5b06a54":()=>r(()=>import("./index.html-b1f6d5Hp.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-114ea066":()=>r(()=>import("./index.html-XzABWps0.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-57f4af54":()=>r(()=>import("./index.html-rORloYOh.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-406294c2":()=>r(()=>import("./index.html-61jECjP3.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-08467114":()=>r(()=>import("./index.html-9U-ZlmW7.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-25c9a30a":()=>r(()=>import("./index.html-8ejxDea3.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-7165b58c":()=>r(()=>import("./index.html-mSoTLvH5.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-5659c422":()=>r(()=>import("./index.html-1XBha9gW.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-20af53f3":()=>r(()=>import("./index.html-AnActwc8.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-6edae1e4":()=>r(()=>import("./index.html-vOBuYXXF.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-c3ef996e":()=>r(()=>import("./index.html-c3gw7yYc.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-269071d9":()=>r(()=>import("./index.html-86z84Krq.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-48805d09":()=>r(()=>import("./index.html-bvCOMugE.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-2d0a81d8":()=>r(()=>import("./index.html-X9QljHZy.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-1f5734f3":()=>r(()=>import("./index.html-pYcmDSBH.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-274e014c":()=>r(()=>import("./index.html-Ttxh5DdT.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-84085c0e":()=>r(()=>import("./index.html-eGcxDtDn.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-5112dfa6":()=>r(()=>import("./index.html-gmG8OD1L.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-51c4def8":()=>r(()=>import("./index.html-l1CBPhrM.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-696b0c9a":()=>r(()=>import("./index.html-n4ud7iHO.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-ffb97496":()=>r(()=>import("./index.html-UPzB-lsF.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-14c69af4":()=>r(()=>import("./index.html-5shiWcSp.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-16722c46":()=>r(()=>import("./index.html-L64wfYKW.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-9828af56":()=>r(()=>import("./index.html-uVI_oldS.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-2b9e3a1e":()=>r(()=>import("./index.html-FXff7Dng.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-6cec0ebc":()=>r(()=>import("./index.html-6RoNdIuq.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-53c5f3b8":()=>r(()=>import("./index.html-N9Si8IpH.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-211a2a4e":()=>r(()=>import("./index.html-53SbjLfd.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-48579df1":()=>r(()=>import("./index.html-XkuCPY5J.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-27762a11":()=>r(()=>import("./index.html-t_7c0Nb2.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-3a02344a":()=>r(()=>import("./index.html-WfU_Ke3m.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-69afbe6c":()=>r(()=>import("./index.html-rwo5OPyn.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-6f103f63":()=>r(()=>import("./index.html-_z17MZn1.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-5bb56591":()=>r(()=>import("./index.html-ZnGYCht1.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-19b50ae4":()=>r(()=>import("./index.html-vl5dFaRH.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-17602aee":()=>r(()=>import("./index.html-Ix-3Nr-R.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-f3741e7e":()=>r(()=>import("./index.html-5vcqCZuN.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-17f21722":()=>r(()=>import("./index.html-f1ajJc3i.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-26e3eac3":()=>r(()=>import("./index.html-usfteALD.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-e867e24a":()=>r(()=>import("./index.html-DGzzOmmD.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-577684b5":()=>r(()=>import("./index.html-buIlavm4.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-5bc93818":()=>r(()=>import("./index.html-Qm9xh5Jo.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-744d024e":()=>r(()=>import("./index.html-oEK-9UcZ.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-e52c881c":()=>r(()=>import("./index.html-fwpvsUzf.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-154dc4c4":()=>r(()=>import("./index.html-j6f3ki_7.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-01560935":()=>r(()=>import("./index.html-syouD7jS.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-03d57386":()=>r(()=>import("./index.html-EagarWuw.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-83e1f92e":()=>r(()=>import("./index.html-YvrvBfW9.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-506407f4":()=>r(()=>import("./index.html-bGpzKQP_.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-37a8c5a0":()=>r(()=>import("./index.html-y6U7Wifi.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-0379cba1":()=>r(()=>import("./index.html-nQOgZRU-.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-ad1708ba":()=>r(()=>import("./index.html-gU7WX6bC.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-1e447d61":()=>r(()=>import("./index.html-kVcC8l6S.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-0e743c94":()=>r(()=>import("./index.html-aseK3O-8.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-484552dc":()=>r(()=>import("./index.html-OvAFS1du.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-5fed750f":()=>r(()=>import("./index.html-E65Ox2cu.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-a378ad66":()=>r(()=>import("./index.html-6OnCadmL.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-41590e77":()=>r(()=>import("./index.html-d8-zegcq.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-7b167472":()=>r(()=>import("./index.html-sw-jGZ9I.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-503f41d6":()=>r(()=>import("./index.html-hMcg_eOZ.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-6dd3fb2d":()=>r(()=>import("./index.html-y-rCF_Y6.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-50a76998":()=>r(()=>import("./index.html-Mpq0kShK.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-75abdec8":()=>r(()=>import("./index.html-aHsgF4vR.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-0a7437b0":()=>r(()=>import("./index.html-P6-pSFLU.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-7365137c":()=>r(()=>import("./index.html-HW14RBNz.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-300e8674":()=>r(()=>import("./index.html-4a-Z8KAr.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-05b88e01":()=>r(()=>import("./index.html-QFE4fZd_.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-5f9463c4":()=>r(()=>import("./index.html-vmN8aC7k.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-149ec160":()=>r(()=>import("./index.html-kehIil8E.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-7ef0488a":()=>r(()=>import("./index.html-EJ5EIXaY.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-094082c0":()=>r(()=>import("./index.html-XNA5ah8p.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-b5fd4516":()=>r(()=>import("./index.html-uIJX6Te5.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-60078044":()=>r(()=>import("./index.html-YuV_HMsQ.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-1f2550e8":()=>r(()=>import("./index.html-UuI0ezsT.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-ce1020a8":()=>r(()=>import("./index.html-cgT-6cq4.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-74f11498":()=>r(()=>import("./index.html-pE8fNNh0.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-3485b34a":()=>r(()=>import("./index.html-eQNa2-AF.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-ebdc3094":()=>r(()=>import("./index.html-zCFC01Pr.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-66f1a1a4":()=>r(()=>import("./index.html-96oDCjCo.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-009d76c4":()=>r(()=>import("./index.html-2I6wgMiQ.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-07ff869f":()=>r(()=>import("./index.html-1jX7R4g2.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-7189e1c4":()=>r(()=>import("./index.html-u6W5YbPX.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-244cf499":()=>r(()=>import("./index.html-waNYqjjc.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-c7024be8":()=>r(()=>import("./index.html-Ibx-D3m5.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-e692110a":()=>r(()=>import("./index.html-u5iuIXo2.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-0fdf2423":()=>r(()=>import("./index.html-VTg8zEK2.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-dc224880":()=>r(()=>import("./index.html-cl7Hi-KV.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-d3e06898":()=>r(()=>import("./index.html-0OPPRJ-_.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-3264112b":()=>r(()=>import("./index.html-wrkzcPx7.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-ce1c513e":()=>r(()=>import("./index.html-7qd3AB7W.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-0f3580c2":()=>r(()=>import("./index.html-t05xsR5f.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-7d214bb7":()=>r(()=>import("./index.html-MIc1BOND.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-ca845d2c":()=>r(()=>import("./index.html-QFHKEctM.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-6909452a":()=>r(()=>import("./index.html-ipd8Z4Ub.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-508ef528":()=>r(()=>import("./index.html-F24I-oKk.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-5571eef5":()=>r(()=>import("./index.html-UQfdyjFV.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-6eaa757a":()=>r(()=>import("./index.html-zUbfanWB.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-791f1092":()=>r(()=>import("./index.html-Y7L1rSiQ.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-20002c0c":()=>r(()=>import("./index.html-Bd48zwDc.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-9b4441e8":()=>r(()=>import("./index.html-lhxrZk5X.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-1af4e242":()=>r(()=>import("./index.html-_MUC_mAD.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-5decfa84":()=>r(()=>import("./index.html-IAG9q1Cc.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-c57c504e":()=>r(()=>import("./index.html-Toka5wWM.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-613ebf84":()=>r(()=>import("./index.html-paEsXu6a.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-42e1ac2a":()=>r(()=>import("./index.html-TVClPalE.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-08d15826":()=>r(()=>import("./index.html-nWoCLXsL.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-bb4bcc98":()=>r(()=>import("./index.html-yIM1JoFF.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-13770b26":()=>r(()=>import("./index.html-XzX3kzzx.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-3eb7880e":()=>r(()=>import("./index.html-4cB6peZa.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-4e636242":()=>r(()=>import("./index.html-gVERbTFB.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-200bf6bc":()=>r(()=>import("./index.html--SYW8pNy.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-fe7b1fa2":()=>r(()=>import("./index.html-aeOVijeK.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-3d7e901c":()=>r(()=>import("./index.html-sts6y33R.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-1c6b640a":()=>r(()=>import("./index.html-ZMYErw-w.js"),__vite__mapDeps([])).then(({data:e})=>e),"v-075c6c62":()=>r(()=>import("./index.html-zEJUxK6f.js"),__vite__mapDeps([])).then(({data:e})=>e)},Iv=JSON.parse('{"base":"/","lang":"en-US","title":"Gavin James","description":"Gavin James个人博客, VuePress搭建, 使用了 Vdoing 主题, 学习Java, Web, 框架, 微服务, 工具, 前端等相关知识, 记录生活和技术路程, 同时分享编程技巧。","head":[["meta",{"name":"baidu-site-verification","content":"code-fLaULewlcT"}],["meta",{"name":"keywords","content":"Gavin个人博客, VuePress搭建, 学习Java、Web、框架、微服务、工具、前端等相关知识, 记录生活和技术路程。"}]],"locales":{"/":{"lang":"zh-CN"},"/en/":{"lang":"en-US"}}}');var Tv=([e,t,n])=>e==="meta"&&t.name?`${e}.${t.name}`:["title","base"].includes(e)?e:e==="template"&&t.id?`${e}.${t.id}`:JSON.stringify([e,t,n]),Dv=e=>{const t=new Set,n=[];return e.forEach(a=>{const o=Tv(a);t.has(o)||(t.add(o),n.push(a))}),n},Pv=e=>e[0]==="/"?e:`/${e}`,pc=e=>e[e.length-1]==="/"||e.endsWith(".html")?e:`${e}/`,an=e=>/^(https?:)?\/\//.test(e),Rv=/.md((\?|#).*)?$/,Ea=(e,t="/")=>!!(an(e)||e.startsWith("/")&&!e.startsWith(t)&&!Rv.test(e)),vc=e=>/^[a-z][a-z0-9+.-]*:/.test(e),Zn=e=>Object.prototype.toString.call(e)==="[object Object]",wo=e=>e[e.length-1]==="/"?e.slice(0,-1):e,hc=e=>e[0]==="/"?e.slice(1):e,Ov=(e,t)=>{const n=Object.keys(e).sort((a,o)=>{const l=o.split("/").length-a.split("/").length;return l!==0?l:o.length-a.length});for(const a of n)if(t.startsWith(a))return a;return"/"};const mc={"v-8daa1a0e":v(()=>r(()=>import("./index.html-tM9LUljz.js"),__vite__mapDeps([0,1]))),"v-79fdd481":v(()=>r(()=>import("./home.html-0-ZontNc.js"),__vite__mapDeps([2,1]))),"v-0e503981":v(()=>r(()=>import("./slide.html-tjspY4Y1.js"),__vite__mapDeps([3,4,1]))),"v-74bc627b":v(()=>r(()=>import("./index.html-GFLlJ4Kz.js"),__vite__mapDeps([5,1]))),"v-2d0a870d":v(()=>r(()=>import("./index.html-XibBTTfK.js"),__vite__mapDeps([6,1]))),"v-7c2196ed":v(()=>r(()=>import("./home.html-unxxK7JT.js"),__vite__mapDeps([7,1]))),"v-50a4c495":v(()=>r(()=>import("./slide.html-8HCz7e-W.js"),__vite__mapDeps([8,4,1]))),"v-7d72c4ac":v(()=>r(()=>import("./index.html-35Q99Bg7.js"),__vite__mapDeps([9,1]))),"v-7e25fb5f":v(()=>r(()=>import("./index.html-gZ8oHE72.js"),__vite__mapDeps([10,1]))),"v-fffb8e28":v(()=>r(()=>import("./index.html-cjTH_B_e.js"),__vite__mapDeps([11,1]))),"v-4c863446":v(()=>r(()=>import("./disable.html-lDmBqull.js"),__vite__mapDeps([12,1]))),"v-bf720700":v(()=>r(()=>import("./encrypt.html-YqQuwIJL.js"),__vite__mapDeps([13,1]))),"v-0978b044":v(()=>r(()=>import("./markdown.html-P3vCVt-D.js"),__vite__mapDeps([14,1]))),"v-4eaf9f84":v(()=>r(()=>import("./page.html-ZL-lcy1g.js"),__vite__mapDeps([15,1]))),"v-2250a72e":v(()=>r(()=>import("./study.html-PGrDS0Kh.js"),__vite__mapDeps([16,1]))),"v-14f73021":v(()=>r(()=>import("./index.html-0L7KFe3H.js"),__vite__mapDeps([17,1]))),"v-076107ee":v(()=>r(()=>import("./skill.html-P9f2Ag3q.js"),__vite__mapDeps([18,1]))),"v-ef7dd9f0":v(()=>r(()=>import("./index.html-_V_-GZux.js"),__vite__mapDeps([19,1]))),"v-1559ca3e":v(()=>r(()=>import("./index.html-RhKGz673.js"),__vite__mapDeps([20,1]))),"v-acebc5a4":v(()=>r(()=>import("./mermaid.html-J0zQaCts.js"),__vite__mapDeps([21,1]))),"v-30c465ed":v(()=>r(()=>import("./zuosi.html-tpgKBF7r.js"),__vite__mapDeps([22,1]))),"v-1e6b6908":v(()=>r(()=>import("./cert-cmm.html-pjUA3Nhx.js"),__vite__mapDeps([23,1]))),"v-c1340c6e":v(()=>r(()=>import("./cert-dengbao.html-wH0NCdCw.js"),__vite__mapDeps([24,1]))),"v-d21282e8":v(()=>r(()=>import("./cert-iso27001.html-It5CtTp8.js"),__vite__mapDeps([25,1]))),"v-fb605120":v(()=>r(()=>import("./dev-x-overview.html-RZAWZ-Qo.js"),__vite__mapDeps([26,1]))),"v-0d4f9864":v(()=>r(()=>import("./dev-cron-x-tools.html-h6vSMoli.js"),__vite__mapDeps([27,1]))),"v-f8115f44":v(()=>r(()=>import("./dev-cron-x-usage.html-MMESHwzz.js"),__vite__mapDeps([28,1]))),"v-9fc6e360":v(()=>r(()=>import("./adapter.html-Rt6pYFkI.js"),__vite__mapDeps([29,1]))),"v-23dca26c":v(()=>r(()=>import("./bridge.html-Ra8cSfXB.js"),__vite__mapDeps([30,1]))),"v-6e251184":v(()=>r(()=>import("./builder.html-OJ-crT_r.js"),__vite__mapDeps([31,1]))),"v-2b152058":v(()=>r(()=>import("./command.html-qIx2rLfR.js"),__vite__mapDeps([32,1]))),"v-cf7f7ed0":v(()=>r(()=>import("./composite.html-NJ1YzZSJ.js"),__vite__mapDeps([33,1]))),"v-3b93eb64":v(()=>r(()=>import("./decorator.html-e9728-sB.js"),__vite__mapDeps([34,1]))),"v-2014e344":v(()=>r(()=>import("./end.html-mGL447jj.js"),__vite__mapDeps([35,1]))),"v-8e59b74e":v(()=>r(()=>import("./facade.html-RCaDx-Wv.js"),__vite__mapDeps([36,1]))),"v-05c85d75":v(()=>r(()=>import("./factory.html-nn2FXbeL.js"),__vite__mapDeps([37,1]))),"v-5a65fcf4":v(()=>r(()=>import("./flyweight.html-mRT0i-53.js"),__vite__mapDeps([38,1]))),"v-26071b05":v(()=>r(()=>import("./interpreter.html-Xg7u0xGT.js"),__vite__mapDeps([39,1]))),"v-660b0285":v(()=>r(()=>import("./iterator.html-tkF4Ia1f.js"),__vite__mapDeps([40,1]))),"v-fd9681c0":v(()=>r(()=>import("./mediator.html-oh0NhSZr.js"),__vite__mapDeps([41,1]))),"v-5aed6ba6":v(()=>r(()=>import("./memento.html-gF04iLO2.js"),__vite__mapDeps([42,1]))),"v-72940dc6":v(()=>r(()=>import("./observer.html-xHbMuWyf.js"),__vite__mapDeps([43,1]))),"v-7dc0f6dd":v(()=>r(()=>import("./prototype.html--tMQN74u.js"),__vite__mapDeps([44,1]))),"v-1902a411":v(()=>r(()=>import("./proxy.html-myGyBPp6.js"),__vite__mapDeps([45,1]))),"v-d8e95536":v(()=>r(()=>import("./responsibility.html-WFympJRW.js"),__vite__mapDeps([46,1]))),"v-72c7365c":v(()=>r(()=>import("./seven-principles.html-aUhNHF5a.js"),__vite__mapDeps([47,1]))),"v-60256d6b":v(()=>r(()=>import("./single.html-pqj0IvkC.js"),__vite__mapDeps([48,1]))),"v-7a5d87ce":v(()=>r(()=>import("./state.html-MxVIU119.js"),__vite__mapDeps([49,1]))),"v-5d8882a0":v(()=>r(()=>import("./strategy.html-x4e9j7mW.js"),__vite__mapDeps([50,1]))),"v-4b4aaf4e":v(()=>r(()=>import("./summary.html-dx7PdJWK.js"),__vite__mapDeps([51,1]))),"v-4a6785aa":v(()=>r(()=>import("./template-method.html-EYX1Itlh.js"),__vite__mapDeps([52,1]))),"v-32e615c6":v(()=>r(()=>import("./thought.html-zJxhIQqB.js"),__vite__mapDeps([53,1]))),"v-379fc8cc":v(()=>r(()=>import("./uml-class-diagram.html-pR3xCVLC.js"),__vite__mapDeps([54,1]))),"v-6a6fd891":v(()=>r(()=>import("./visitor.html-e8XFknk8.js"),__vite__mapDeps([55,1]))),"v-34f9e282":v(()=>r(()=>import("./dev-lean-enterprise.html-v8XC9Twp.js"),__vite__mapDeps([56,1]))),"v-190f0eba":v(()=>r(()=>import("./dev-pratice-ddd.html-nAqX9QTb.js"),__vite__mapDeps([57,1]))),"v-d1bc46ac":v(()=>r(()=>import("./dev-pratice-tdd.html-ILfiuqv8.js"),__vite__mapDeps([58,1]))),"v-67e67766":v(()=>r(()=>import("./dev-th-agile-kanban.html-TsSrdXoa.js"),__vite__mapDeps([59,1]))),"v-4ad012fb":v(()=>r(()=>import("./dev-th-agile-scrum.html-VUkYyl6y.js"),__vite__mapDeps([60,1]))),"v-0ff14b76":v(()=>r(()=>import("./dev-th-agile-xp.html-AkqMixiG.js"),__vite__mapDeps([61,1]))),"v-a29da770":v(()=>r(()=>import("./dev-th-agile.html-zviaipaf.js"),__vite__mapDeps([62,1]))),"v-dbe78e54":v(()=>r(()=>import("./dev-th-waterfall-model.html-zg8zFv5X.js"),__vite__mapDeps([63,1]))),"v-c419387c":v(()=>r(()=>import("./dev-th-waterfall-vwxh.html-P6D-XDuY.js"),__vite__mapDeps([64,1]))),"v-853d39a8":v(()=>r(()=>import("./dev-workflow.html-eW4nGZe-.js"),__vite__mapDeps([65,1]))),"v-ec1da6c6":v(()=>r(()=>import("./dev-x-overview.html-ULQxANyn.js"),__vite__mapDeps([66,1]))),"v-771d6280":v(()=>r(()=>import("./dev-agpl.html-jFSmpj4X.js"),__vite__mapDeps([67,1]))),"v-31ef009c":v(()=>r(()=>import("./dev-knowledge.html-Y5J-AA72.js"),__vite__mapDeps([68,1]))),"v-ff56eec2":v(()=>r(()=>import("./dev-mulan.html-KyQcKW6d.js"),__vite__mapDeps([69,1]))),"v-6c02a35d":v(()=>r(()=>import("./dev-opensource.html-OQIfVNpd.js"),__vite__mapDeps([70,1]))),"v-349120b4":v(()=>r(()=>import("./dev-x-overview.html-zlk3OFzh.js"),__vite__mapDeps([71,1]))),"v-afbcd392":v(()=>r(()=>import("./dev-package-x-apache-common.html-DRHAjQND.js"),__vite__mapDeps([72,1]))),"v-aab2d5b2":v(()=>r(()=>import("./dev-package-x-google-guava.html-FI6-X3pl.js"),__vite__mapDeps([73,1]))),"v-b40d6c2e":v(()=>r(()=>import("./dev-package-x-hu-tool.html-uaIaGtMI.js"),__vite__mapDeps([74,1]))),"v-743e64ee":v(()=>r(()=>import("./dev-package-x-json.html-TYozJYAA.js"),__vite__mapDeps([75,1]))),"v-3389ec7d":v(()=>r(()=>import("./dev-package-x-log.html-YGWgjASy.js"),__vite__mapDeps([76,1]))),"v-dbb17486":v(()=>r(()=>import("./dev-package-x-lombok.html-bJKLc6mK.js"),__vite__mapDeps([77,1]))),"v-6fef71b0":v(()=>r(()=>import("./dev-package-x-mapstruct.html-p1ckVdIq.js"),__vite__mapDeps([78,1]))),"v-14eb65ee":v(()=>r(()=>import("./dev-package-x-others.html-t-IMEoRs.js"),__vite__mapDeps([79,1]))),"v-14db18d0":v(()=>r(()=>import("./dev-package-x-overview.html-BkPc8wM-.js"),__vite__mapDeps([80,1]))),"v-ec231282":v(()=>r(()=>import("./dev-package-x-spring-util.html-A2tBmEwJ.js"),__vite__mapDeps([81,1]))),"v-079fbb4c":v(()=>r(()=>import("./10_bridge.html-LHHNnj6e.js"),__vite__mapDeps([82,1]))),"v-ac9cd224":v(()=>r(()=>import("./11_compsite.html-F9B2e6H5.js"),__vite__mapDeps([83,1]))),"v-0861c992":v(()=>r(()=>import("./12_decorator.html-sWD3mH_y.js"),__vite__mapDeps([84,1]))),"v-08c5b901":v(()=>r(()=>import("./13_flyweight.html-qLJ6sShW.js"),__vite__mapDeps([85,1]))),"v-594613fd":v(()=>r(()=>import("./14_proxy.html-15XG_lSD.js"),__vite__mapDeps([86,1]))),"v-53fd68e9":v(()=>r(()=>import("./15_chain.html-flF-abd_.js"),__vite__mapDeps([87,1]))),"v-78fccfb6":v(()=>r(()=>import("./16_strategy.html-b6lVtM-N.js"),__vite__mapDeps([88,1]))),"v-01b09d50":v(()=>r(()=>import("./17_template.html-3Dm7fs6q.js"),__vite__mapDeps([89,1]))),"v-a1d88988":v(()=>r(()=>import("./18_command.html-2dIxyrps.js"),__vite__mapDeps([90,1]))),"v-2086f614":v(()=>r(()=>import("./19_observer.html-xmUVz7kL.js"),__vite__mapDeps([91,1]))),"v-4082a728":v(()=>r(()=>import("./1_overview.html-u30P4rqt.js"),__vite__mapDeps([92,1]))),"v-79fb4142":v(()=>r(()=>import("./20_visitor.html-TBhbfhP8.js"),__vite__mapDeps([93,1]))),"v-dbe1e3c4":v(()=>r(()=>import("./21_state.html-vXPmvOi9.js"),__vite__mapDeps([94,1]))),"v-76fef118":v(()=>r(()=>import("./22_interpreter.html-TZAKAxur.js"),__vite__mapDeps([95,1]))),"v-557eeeb7":v(()=>r(()=>import("./23_iterator.html-1YDwgILh.js"),__vite__mapDeps([96,1]))),"v-6af7d4da":v(()=>r(()=>import("./24_mediator.html-xVlBYu8P.js"),__vite__mapDeps([97,1]))),"v-5864771c":v(()=>r(()=>import("./25_memento.html-iJeWixxz.js"),__vite__mapDeps([98,1]))),"v-0ea3ab36":v(()=>r(()=>import("./2_singleton.html-YXq5y6XM.js"),__vite__mapDeps([99,1]))),"v-fe55a6b4":v(()=>r(()=>import("./3_simple_factory.html-WYZ9XJp8.js"),__vite__mapDeps([100,1]))),"v-29c0178e":v(()=>r(()=>import("./4_factory_method.html-iYl3kG90.js"),__vite__mapDeps([101,1]))),"v-0cae1790":v(()=>r(()=>import("./5_abstract_factory.html-aYmwnZfx.js"),__vite__mapDeps([102,1]))),"v-263c5511":v(()=>r(()=>import("./6_builder.html-FJtiwlak.js"),__vite__mapDeps([103,1]))),"v-6ea76909":v(()=>r(()=>import("./7_prototype.html-yVPs2mYD.js"),__vite__mapDeps([104,1]))),"v-4934c82e":v(()=>r(()=>import("./8_facade.html-hBQ_67ua.js"),__vite__mapDeps([105,1]))),"v-0dcd2eba":v(()=>r(()=>import("./9_adapter.html-GOsz9XRF.js"),__vite__mapDeps([106,1]))),"v-69efa1be":v(()=>r(()=>import("./dev-protocol-dns.html-ZssHz9rq.js"),__vite__mapDeps([107,1]))),"v-0eb434c0":v(()=>r(()=>import("./dev-protocol-http.html-yHHnTeCz.js"),__vite__mapDeps([108,1]))),"v-0ec3b421":v(()=>r(()=>import("./dev-protocol-ip.html-jgggDMgv.js"),__vite__mapDeps([109,1]))),"v-7edab2fb":v(()=>r(()=>import("./dev-protocol-network-basic.html-sXYrOcgp.js"),__vite__mapDeps([110,1]))),"v-110a0ad4":v(()=>r(()=>import("./dev-protocol-osi7.html-AQ96ff4V.js"),__vite__mapDeps([111,1]))),"v-d4cca062":v(()=>r(()=>import("./dev-protocol-overview.html-TDRWDMsO.js"),__vite__mapDeps([112,1]))),"v-129596a2":v(()=>r(()=>import("./dev-protocol-tcpip.html-QArjGx3C.js"),__vite__mapDeps([113,1]))),"v-b5b65d28":v(()=>r(()=>import("./dev-protocol-tool-netstat.html-yRw2BfZV.js"),__vite__mapDeps([114,1]))),"v-04359808":v(()=>r(()=>import("./dev-protocol-tool-tcpdump.html-8nVfauQk.js"),__vite__mapDeps([115,1]))),"v-4f1b6e86":v(()=>r(()=>import("./dev-protocol-tool-wireshark.html-57Ir1pE9.js"),__vite__mapDeps([116,1]))),"v-ca4160ee":v(()=>r(()=>import("./dev-protocol-udp.html-KF4GjVJ2.js"),__vite__mapDeps([117,1]))),"v-78a32a9b":v(()=>r(()=>import("./dev-protocol-url.html-wjoYmqws.js"),__vite__mapDeps([118,1]))),"v-565d93a1":v(()=>r(()=>import("./dev-refactor-if-else.html-zD-ifWIR.js"),__vite__mapDeps([119,1]))),"v-0fac4647":v(()=>r(()=>import("./dev-refactor-not-null.html-sAmFyuDX.js"),__vite__mapDeps([120,1]))),"v-4a3fd089":v(()=>r(()=>import("./dev-regex-all.html-K0ff2dXc.js"),__vite__mapDeps([121,1]))),"v-a3c5a762":v(()=>r(()=>import("./dev-regex-tools.html-GxJhIU-5.js"),__vite__mapDeps([122,1]))),"v-24c4e449":v(()=>r(()=>import("./dev-regex-usage.html-rTScysfy.js"),__vite__mapDeps([123,1]))),"v-adc57e62":v(()=>r(()=>import("./dev-security-overview.html-StfEB3Fq.js"),__vite__mapDeps([124,1]))),"v-c516bfa4":v(()=>r(()=>import("./dev-security-x-click-hijack.html-9cNQO2x_.js"),__vite__mapDeps([125,1]))),"v-2a4571a2":v(()=>r(()=>import("./dev-security-x-csrf.html-cRsOtw6X.js"),__vite__mapDeps([126,1]))),"v-3f273922":v(()=>r(()=>import("./dev-security-x-ddos.html-Bjr59_RM.js"),__vite__mapDeps([127,1]))),"v-1f68b428":v(()=>r(()=>import("./dev-security-x-injection.html-oZES03Np.js"),__vite__mapDeps([128,1]))),"v-6c74dbc9":v(()=>r(()=>import("./dev-security-x-owasp.html-dHEvgMT_.js"),__vite__mapDeps([129,1]))),"v-73004147":v(()=>r(()=>import("./dev-security-x-xss.html-nuSCtEmI.js"),__vite__mapDeps([130,1]))),"v-b5ecb7da":v(()=>r(()=>import("./dev-security-y-pentest-workflow.html-Y6eGnvZ8.js"),__vite__mapDeps([131,1]))),"v-68df3270":v(()=>r(()=>import("./dev-security-y-pratice.html-XTzFyQD6.js"),__vite__mapDeps([132,1]))),"v-05b27368":v(()=>r(()=>import("./dev-microservice-kangwei.html-OLBYShnh.js"),__vite__mapDeps([133,1]))),"v-b8bf9bb8":v(()=>r(()=>import("./dev-th-acid.html-5QACYqhV.js"),__vite__mapDeps([134,1]))),"v-7ad57090":v(()=>r(()=>import("./dev-th-base.html--wQ8-SYQ.js"),__vite__mapDeps([135,1]))),"v-32401b5f":v(()=>r(()=>import("./dev-th-cap.html--h9U-Rx2.js"),__vite__mapDeps([136,1]))),"v-ec5223b4":v(()=>r(()=>import("./dev-th-solid.html-1xHU3xpy.js"),__vite__mapDeps([137,1]))),"v-48dcdeca":v(()=>r(()=>import("./dev-x-overview.html-MZY1d4wb.js"),__vite__mapDeps([138,1]))),"v-c8f78faa":v(()=>r(()=>import("./dev-usage-exe-package.html-HF4-Asrd.js"),__vite__mapDeps([139,1]))),"v-220e54fa":v(()=>r(()=>import("./dev-usage-export-pdf.html-b2RSbMEO.js"),__vite__mapDeps([140,1]))),"v-49814f88":v(()=>r(()=>import("./dev-usage-flotjs.html-d0ATXUVr.js"),__vite__mapDeps([141,1]))),"v-11a0893e":v(()=>r(()=>import("./dev-usage-input-password.html-H_sBy1Pf.js"),__vite__mapDeps([142,1]))),"v-5a66bf78":v(()=>r(()=>import("./dev-usage-jar-readfile.html-p1uYtW_P.js"),__vite__mapDeps([143,1]))),"v-2aaf51e5":v(()=>r(()=>import("./dev-usage-newObj.html-66v0Vh-B.js"),__vite__mapDeps([144,1]))),"v-3c11b823":v(()=>r(()=>import("./dev-usage-overview.html-bprphO7l.js"),__vite__mapDeps([145,1]))),"v-aa1adf3c":v(()=>r(()=>import("./dev-usage-zkfinger.html-58VhFriv.js"),__vite__mapDeps([146,1]))),"v-6fe3b808":v(()=>r(()=>import("./elasticsearch-awesome-es.html-WBUwroUc.js"),__vite__mapDeps([147,1]))),"v-0246065e":v(()=>r(()=>import("./elasticsearch-backup.html-FZaEOwt2.js"),__vite__mapDeps([148,1]))),"v-4777caa4":v(()=>r(()=>import("./elasticsearch-wrapper-query.html-A-ZV4Sfm.js"),__vite__mapDeps([149,1]))),"v-a1d46856":v(()=>r(()=>import("./elasticsearch-x-agg-bucket.html-BqjF2am3.js"),__vite__mapDeps([150,1]))),"v-369c8bcf":v(()=>r(()=>import("./elasticsearch-x-agg-metric.html-P6zKkeFH.js"),__vite__mapDeps([151,1]))),"v-e559e6c6":v(()=>r(()=>import("./elasticsearch-x-agg-pipeline.html-nwZVY_Rh.js"),__vite__mapDeps([152,1]))),"v-8fab6454":v(()=>r(()=>import("./elasticsearch-x-dsl-com.html-HY77lDTy.js"),__vite__mapDeps([153,1]))),"v-36621528":v(()=>r(()=>import("./elasticsearch-x-dsl-full-text.html-FYPd6zJ6.js"),__vite__mapDeps([154,1]))),"v-f0ae5462":v(()=>r(()=>import("./elasticsearch-x-dsl-term.html-phUQ8XWM.js"),__vite__mapDeps([155,1]))),"v-48e1eb34":v(()=>r(()=>import("./elasticsearch-x-index-mapping.html-JBCNHKEc.js"),__vite__mapDeps([156,1]))),"v-39bc0b56":v(()=>r(()=>import("./elasticsearch-x-index-template.html-cu7x_hdZ.js"),__vite__mapDeps([157,1]))),"v-52fe07ec":v(()=>r(()=>import("./elasticsearch-x-install.html-6M5PkChZ.js"),__vite__mapDeps([158,1]))),"v-4ea016f8":v(()=>r(()=>import("./elasticsearch-x-introduce-1.html-SaMofbiD.js"),__vite__mapDeps([159,1]))),"v-4b3665ba":v(()=>r(()=>import("./elasticsearch-x-introduce-2.html-m8QFthED.js"),__vite__mapDeps([160,1]))),"v-3ce741b4":v(()=>r(()=>import("./elasticsearch-x-usage.html-dcOSw6T4.js"),__vite__mapDeps([161,1]))),"v-7643df78":v(()=>r(()=>import("./elasticsearch-y-peformance.html-MoFr7QsH.js"),__vite__mapDeps([162,1]))),"v-188cfa74":v(()=>r(()=>import("./elasticsearch-y-th-1.html-9pOQ25Qo.js"),__vite__mapDeps([163,1]))),"v-1a41d313":v(()=>r(()=>import("./elasticsearch-y-th-2.html-VW-WZD9o.js"),__vite__mapDeps([164,1]))),"v-1bf6abb2":v(()=>r(()=>import("./elasticsearch-y-th-3.html-LY_wn-06.js"),__vite__mapDeps([165,1]))),"v-1dab8451":v(()=>r(()=>import("./elasticsearch-y-th-4.html-jz6aoOA8.js"),__vite__mapDeps([166,1]))),"v-0499355a":v(()=>r(()=>import("./elasticsearch-z-hello.html-mLu1S_Zb.js"),__vite__mapDeps([167,1]))),"v-49b42386":v(()=>r(()=>import("./elasticsearch-z-meituan.html-z-e3u6q6.js"),__vite__mapDeps([168,1]))),"v-af627080":v(()=>r(()=>import("./elasticsearch-z-tencent.html-8Ce3aSn5.js"),__vite__mapDeps([169,1]))),"v-91bb51f6":v(()=>r(()=>import("./elasticsearch.html-g_lLlc56.js"),__vite__mapDeps([170,1]))),"v-55e7b16c":v(()=>r(()=>import("./mongo-performance-improve.html-OWtjb-X_.js"),__vite__mapDeps([171,1]))),"v-ef2d670e":v(()=>r(()=>import("./mongo-performance-model.html-qTwgZ9g5.js"),__vite__mapDeps([172,1]))),"v-ec480f68":v(()=>r(()=>import("./mongo-x-basic.html-pL5w97Bu.js"),__vite__mapDeps([173,1]))),"v-8a9f438c":v(()=>r(()=>import("./mongo-x-ecosystem.html-dhSexzHJ.js"),__vite__mapDeps([174,1]))),"v-70752795":v(()=>r(()=>import("./mongo-x-usage-1.html-B-6CFtG9.js"),__vite__mapDeps([175,1]))),"v-722a0034":v(()=>r(()=>import("./mongo-x-usage-2.html-SaQBa5Go.js"),__vite__mapDeps([176,1]))),"v-73ded8d3":v(()=>r(()=>import("./mongo-x-usage-3.html-lCPfOjiD.js"),__vite__mapDeps([177,1]))),"v-7593b172":v(()=>r(()=>import("./mongo-x-usage-4.html-p30uuQ1P.js"),__vite__mapDeps([178,1]))),"v-77488a11":v(()=>r(()=>import("./mongo-x-usage-5.html-yCiRKdKw.js"),__vite__mapDeps([179,1]))),"v-2480ea03":v(()=>r(()=>import("./mongo-y-arch.html-4ZD9wAHM.js"),__vite__mapDeps([180,1]))),"v-53709252":v(()=>r(()=>import("./mongo-y-cache.html-geREZS6W.js"),__vite__mapDeps([181,1]))),"v-375e0411":v(()=>r(()=>import("./mongo-y-checkpoint.html-Jx9noSRq.js"),__vite__mapDeps([182,1]))),"v-3d4bda3e":v(()=>r(()=>import("./mongo-y-doc.html-Zgrs4rZZ.js"),__vite__mapDeps([183,1]))),"v-3492596a":v(()=>r(()=>import("./mongo-y-ds.html-Zf2yKMQh.js"),__vite__mapDeps([184,1]))),"v-ab09914c":v(()=>r(()=>import("./mongo-y-introduce.html-sW0OAuA8.js"),__vite__mapDeps([185,1]))),"v-85ec592c":v(()=>r(()=>import("./mongo-y-page.html-ehXspk4d.js"),__vite__mapDeps([186,1]))),"v-6d3a7b71":v(()=>r(()=>import("./mongo-y-trans.html-_L9FlB-3.js"),__vite__mapDeps([187,1]))),"v-3fbdde98":v(()=>r(()=>import("./mongo-z-backup.html-Af86UiRG.js"),__vite__mapDeps([188,1]))),"v-08c634e6":v(()=>r(()=>import("./mongo-z-index.html-DrTCWHQA.js"),__vite__mapDeps([189,1]))),"v-edb6b08a":v(()=>r(()=>import("./mongo-z-rep.html-34kVdVW3.js"),__vite__mapDeps([190,1]))),"v-5cd21616":v(()=>r(()=>import("./mongo-z-sharding.html-MQVD2n1r.js"),__vite__mapDeps([191,1]))),"v-3f190cd0":v(()=>r(()=>import("./mongo.html-dvYvZsY5.js"),__vite__mapDeps([192,1]))),"v-336c63aa":v(()=>r(()=>import("./postgresql-replace.html-PwaNCRK-.js"),__vite__mapDeps([193,1]))),"v-78ae1878":v(()=>r(()=>import("./db-redis-data-type-enc.html-ja9_A6MY.js"),__vite__mapDeps([194,1]))),"v-7e45f676":v(()=>r(()=>import("./db-redis-data-type-special.html-tokWQvoF.js"),__vite__mapDeps([195,1]))),"v-efe11898":v(()=>r(()=>import("./db-redis-data-type-stream.html-OzmKFJwI.js"),__vite__mapDeps([196,1]))),"v-17e9eeee":v(()=>r(()=>import("./db-redis-data-types.html-bUIYWq9z.js"),__vite__mapDeps([197,1]))),"v-a6abd662":v(()=>r(()=>import("./db-redis-introduce.html-liWQYnXv.js"),__vite__mapDeps([198,1]))),"v-40aecaab":v(()=>r(()=>import("./db-redis-overview.html-fmLWp1iK.js"),__vite__mapDeps([199,1]))),"v-70bb63fe":v(()=>r(()=>import("./db-redis-x-cache.html-7w3Jaa3N.js"),__vite__mapDeps([200,1]))),"v-49dcf7ee":v(()=>r(()=>import("./db-redis-x-cluster.html-GtLwduRj.js"),__vite__mapDeps([201,1]))),"v-6e4afc4c":v(()=>r(()=>import("./db-redis-x-copy.html-wCidnfuM.js"),__vite__mapDeps([202,1]))),"v-0092b9e9":v(()=>r(()=>import("./db-redis-x-event.html-0IXaZjrP.js"),__vite__mapDeps([203,1]))),"v-74cb7293":v(()=>r(()=>import("./db-redis-x-performance.html-V4rrVcao.js"),__vite__mapDeps([204,1]))),"v-cba71f5a":v(()=>r(()=>import("./db-redis-x-pub-sub.html-aKhXjq-s.js"),__vite__mapDeps([205,1]))),"v-41f8b388":v(()=>r(()=>import("./db-redis-x-rdb-aof.html-nIw4BXJl.js"),__vite__mapDeps([206,1]))),"v-1d4cc7ae":v(()=>r(()=>import("./db-redis-x-redis-ds.html-89iC6WsE.js"),__vite__mapDeps([207,1]))),"v-60238604":v(()=>r(()=>import("./db-redis-x-redis-object.html-5hGH_jcS.js"),__vite__mapDeps([208,1]))),"v-1a5b038b":v(()=>r(()=>import("./db-redis-x-sentinel.html-LaTOsjvr.js"),__vite__mapDeps([209,1]))),"v-5e95129b":v(()=>r(()=>import("./db-redis-x-trans.html-ltPyaTJ3.js"),__vite__mapDeps([210,1]))),"v-4e459d68":v(()=>r(()=>import("./db-redis-x-version-lastest.html-kQZPTSAf.js"),__vite__mapDeps([211,1]))),"v-60ddbe48":v(()=>r(()=>import("./db-redis-y-monitor.html-VIL8SArJ.js"),__vite__mapDeps([212,1]))),"v-469a0776":v(()=>r(()=>import("./db-redis-y-mt-1.html-q6xLQc9i.js"),__vite__mapDeps([213,1]))),"v-7914a5ba":v(()=>r(()=>import("./db-redis-y-weibo.html-1o4fTQ0d.js"),__vite__mapDeps([214,1]))),"v-59725a96":v(()=>r(()=>import("./db-redis-z-mianshi.html-HDcT6hl9.js"),__vite__mapDeps([215,1]))),"v-0189ba9b":v(()=>r(()=>import("./sql-db-howitworks.html-430TKSy0.js"),__vite__mapDeps([216,1]))),"v-ce8499bc":v(()=>r(()=>import("./sql-db-theory-concept.html-hXrqKvFv.js"),__vite__mapDeps([217,1]))),"v-294c800a":v(()=>r(()=>import("./sql-db-theory-design.html-R2fe6cPv.js"),__vite__mapDeps([218,1]))),"v-4d8be846":v(()=>r(()=>import("./sql-db-theory.html-Ei1ncshU.js"),__vite__mapDeps([219,1]))),"v-b520a2fa":v(()=>r(()=>import("./sql-db.html-lOGCEDNJ.js"),__vite__mapDeps([220,1]))),"v-479dfaa4":v(()=>r(()=>import("./sql-lan-leetcode.html-TrKKs2bV.js"),__vite__mapDeps([221,1]))),"v-ed93b2c8":v(()=>r(()=>import("./sql-lan-optimize.html-ml7wh2-3.js"),__vite__mapDeps([222,1]))),"v-0ca05f63":v(()=>r(()=>import("./sql-lan-pratice.html-0qLo-pB0.js"),__vite__mapDeps([223,1]))),"v-3ed84ea8":v(()=>r(()=>import("./sql-lan.html-YD8EoteO.js"),__vite__mapDeps([224,1]))),"v-6b7f2f62":v(()=>r(()=>import("./sql-mysql-b-tree.html-0opSpCKe.js"),__vite__mapDeps([225,1]))),"v-52116296":v(()=>r(()=>import("./sql-mysql-devide.html-rT4ni576.js"),__vite__mapDeps([226,1]))),"v-42f2422e":v(()=>r(()=>import("./sql-mysql-engine.html-X3zglDcd.js"),__vite__mapDeps([227,1]))),"v-a73fe49c":v(()=>r(()=>import("./sql-mysql-execute.html-Mmb_pRx6.js"),__vite__mapDeps([228,1]))),"v-402977d4":v(()=>r(()=>import("./sql-mysql-index-improve-mt.html-gUOCdOwy.js"),__vite__mapDeps([229,1]))),"v-58dc037c":v(()=>r(()=>import("./sql-mysql-mvcc.html-KR0WPTY_.js"),__vite__mapDeps([230,1]))),"v-089cd992":v(()=>r(()=>import("./sql-mysql-overview.html-QzAbPLBh.js"),__vite__mapDeps([231,1]))),"v-363dead7":v(()=>r(()=>import("./sql-mysql-performance.html-reAEUPXY.js"),__vite__mapDeps([232,1]))),"v-05b20410":v(()=>r(()=>import("./sql-mysql-slave.html-4GM3J5Ce.js"),__vite__mapDeps([233,1]))),"v-e35854d0":v(()=>r(()=>import("./sql-mysql-sql-advisor-mt.html-GZi_qOC7.js"),__vite__mapDeps([234,1]))),"v-af64b6d8":v(()=>r(()=>import("./sql-mysql-sql-costmodel-mt.html-xWJcSyPH.js"),__vite__mapDeps([235,1]))),"v-0ede1ea6":v(()=>r(()=>import("./sql-mysql-sql-parser.html-vr8iuua8.js"),__vite__mapDeps([236,1]))),"v-1aacba26":v(()=>r(()=>import("./sql-mysql-theory.html-YP-QcO0h.js"),__vite__mapDeps([237,1]))),"v-593b73d8":v(()=>r(()=>import("./sql-mysql-xunjian-mt.html-Fq7bXqZP.js"),__vite__mapDeps([238,1]))),"v-6d3be62a":v(()=>r(()=>import("./sql-oracle-overview.html-AQUPFsM8.js"),__vite__mapDeps([239,1]))),"v-38bdd5fc":v(()=>r(()=>import("./java-advanced-spi.html-OCA_887H.js"),__vite__mapDeps([240,1]))),"v-3c09b854":v(()=>r(()=>import("./java-basic-lan-basic.html-SD329ZLz.js"),__vite__mapDeps([241,1]))),"v-d23382d2":v(()=>r(()=>import("./java-basic-lan-sum.html-sUecsAQM.js"),__vite__mapDeps([242,1]))),"v-29e9d384":v(()=>r(()=>import("./java-basic-oop.html-bPysY-wI.js"),__vite__mapDeps([243,1]))),"v-291e8560":v(()=>r(()=>import("./java-basic-x-annotation.html-SwWFUZxj.js"),__vite__mapDeps([244,1]))),"v-63ce1cd4":v(()=>r(()=>import("./java-basic-x-exception.html-ec5SlcuI.js"),__vite__mapDeps([245,1]))),"v-189f4acc":v(()=>r(()=>import("./java-basic-x-generic.html-vcMdiXt9.js"),__vite__mapDeps([246,1]))),"v-58387c38":v(()=>r(()=>import("./java-basic-x-reflection.html-FdPkcznX.js"),__vite__mapDeps([247,1]))),"v-44ff8903":v(()=>r(()=>import("./java-collection-ArrayList.html-njm6CTjQ.js"),__vite__mapDeps([248,1]))),"v-f973debe":v(()=>r(()=>import("./java-collection-LinkedList.html-6m0ZAxKh.js"),__vite__mapDeps([249,1]))),"v-07c1af0d":v(()=>r(()=>import("./java-collection-PriorityQueue.html-uHZvmTEc.js"),__vite__mapDeps([250,1]))),"v-c7a49100":v(()=>r(()=>import("./java-collection-Queue_Stack.html-RjYKz7dJ.js"),__vite__mapDeps([251,1]))),"v-f1a93e4e":v(()=>r(()=>import("./java-collection-all.html-EkiaBgLw.js"),__vite__mapDeps([252,1]))),"v-77c7f0b5":v(()=>r(()=>import("./java-map-HashMap_HashSet.html-03-WFEQf.js"),__vite__mapDeps([253,1]))),"v-d718a9b2":v(()=>r(()=>import("./java-map-LinkedHashMap_LinkedHashSet.html-xkU-Ow48.js"),__vite__mapDeps([254,1]))),"v-7068a5d5":v(()=>r(()=>import("./java-map-TreeMap_TreeSet.html-K1njIbcO.js"),__vite__mapDeps([255,1]))),"v-e6e1587c":v(()=>r(()=>import("./java-map-WeakHashMap.html-s8EkoYvR.js"),__vite__mapDeps([256,1]))),"v-3593583a":v(()=>r(()=>import("./java-io-aio.html-i7WmpOI6.js"),__vite__mapDeps([257,1]))),"v-0f81c6ab":v(()=>r(()=>import("./java-io-basic-category.html-d6Z_uj73.js"),__vite__mapDeps([258,1]))),"v-91590982":v(()=>r(()=>import("./java-io-basic-code-inputstream.html-YMCU2GNG.js"),__vite__mapDeps([259,1]))),"v-c2e41070":v(()=>r(()=>import("./java-io-basic-code-outputstream.html-lzMBkAxw.js"),__vite__mapDeps([260,1]))),"v-dd6781f0":v(()=>r(()=>import("./java-io-basic-design-pattern.html-FDedPZBm.js"),__vite__mapDeps([261,1]))),"v-1c8d45c8":v(()=>r(()=>import("./java-io-basic-usage.html-vSq5PJu9.js"),__vite__mapDeps([262,1]))),"v-4d1780c2":v(()=>r(()=>import("./java-io-bio.html-HZeSLZ17.js"),__vite__mapDeps([263,1]))),"v-47bd7701":v(()=>r(()=>import("./java-io-model.html-tjSkvzGZ.js"),__vite__mapDeps([264,1]))),"v-6eb505c1":v(()=>r(()=>import("./java-io-nio-netty.html-pSsy7bOz.js"),__vite__mapDeps([265,1]))),"v-74aca148":v(()=>r(()=>import("./java-io-nio-select-epoll.html-JmVwyJE1.js"),__vite__mapDeps([266,1]))),"v-ad7d3fdc":v(()=>r(()=>import("./java-io-nio-zerocopy.html-2cQP3cmS.js"),__vite__mapDeps([267,1]))),"v-2ba59b36":v(()=>r(()=>import("./java-io-nio.html-BqeuTqPe.js"),__vite__mapDeps([268,1]))),"v-b17b64a2":v(()=>r(()=>import("./java-io-overview.html-e7nsc7Cg.js"),__vite__mapDeps([269,1]))),"v-56bca9f0":v(()=>r(()=>import("./java-8-up-overview.html-9maU2MiA.js"),__vite__mapDeps([270,1]))),"v-e9fdae4c":v(()=>r(()=>import("./java10.html-gVJb2ZOH.js"),__vite__mapDeps([271,1]))),"v-e693fd0e":v(()=>r(()=>import("./java11.html-aOA_Gzff.js"),__vite__mapDeps([272,1]))),"v-13927007":v(()=>r(()=>import("./java12-17.html-nKSfV1Vg.js"),__vite__mapDeps([273,1]))),"v-e32a4bd0":v(()=>r(()=>import("./java12.html-DV__dxMr.js"),__vite__mapDeps([274,1]))),"v-dfc09a92":v(()=>r(()=>import("./java13.html-o0OZNf7x.js"),__vite__mapDeps([275,1]))),"v-dc56e954":v(()=>r(()=>import("./java14.html-7bPBldnm.js"),__vite__mapDeps([276,1]))),"v-d8ed3816":v(()=>r(()=>import("./java15.html-VVi04tUh.js"),__vite__mapDeps([277,1]))),"v-d58386d8":v(()=>r(()=>import("./java16.html-_3hNwrkg.js"),__vite__mapDeps([278,1]))),"v-d219d59a":v(()=>r(()=>import("./java17.html-juhlAkxS.js"),__vite__mapDeps([279,1]))),"v-0c4bedb4":v(()=>r(()=>import("./java8-anno-repeat.html-J4iiQOyJ.js"),__vite__mapDeps([280,1]))),"v-cb1c4026":v(()=>r(()=>import("./java8-default.html-eLsf6OGF.js"),__vite__mapDeps([281,1]))),"v-0dbdd390":v(()=>r(()=>import("./java8-javafx.html-kpLIKrgR.js"),__vite__mapDeps([282,1]))),"v-59da0611":v(()=>r(()=>import("./java8-jre.html-2VHR85aE.js"),__vite__mapDeps([283,1]))),"v-d4064cb0":v(()=>r(()=>import("./java8-localdatetime.html-asAcei7b.js"),__vite__mapDeps([284,1]))),"v-42fc1938":v(()=>r(()=>import("./java8-optional.html-YaY9kr2P.js"),__vite__mapDeps([285,1]))),"v-0db1e401":v(()=>r(()=>import("./java8-others.html-I90IruRB.js"),__vite__mapDeps([286,1]))),"v-3292fb2e":v(()=>r(()=>import("./java8-permgen.html-gOihflFb.js"),__vite__mapDeps([287,1]))),"v-462b5b61":v(()=>r(()=>import("./java8-stampedlock.html-tLTw7ulL.js"),__vite__mapDeps([288,1]))),"v-c32bfbf8":v(()=>r(()=>import("./java8-stream.html-edaNquTH.js"),__vite__mapDeps([289,1]))),"v-364af0e6":v(()=>r(()=>import("./java8-type-anno.html-Bgjx4opU.js"),__vite__mapDeps([290,1]))),"v-23c3b54a":v(()=>r(()=>import("./java8-type.html-KxaAb6vI.js"),__vite__mapDeps([291,1]))),"v-b5dd4e3e":v(()=>r(()=>import("./java8.html-QlnOmJIE.js"),__vite__mapDeps([292,1]))),"v-76d5ebe5":v(()=>r(()=>import("./java9-11.html-6LBgLVtW.js"),__vite__mapDeps([293,1]))),"v-b2739d00":v(()=>r(()=>import("./java9.html-9UvKqWeA.js"),__vite__mapDeps([294,1]))),"v-526554b6":v(()=>r(()=>import("./java-jvm-agent-arthas.html-ya5sE-AV.js"),__vite__mapDeps([295,1]))),"v-2c8cebb5":v(()=>r(()=>import("./java-jvm-agent-usage.html-Za-L5P0R.js"),__vite__mapDeps([296,1]))),"v-0620a7ea":v(()=>r(()=>import("./java-jvm-class-enhancer.html-g-8BRClv.js"),__vite__mapDeps([297,1]))),"v-d2220394":v(()=>r(()=>import("./java-jvm-class.html-7GW-Pw58.js"),__vite__mapDeps([298,1]))),"v-2e496290":v(()=>r(()=>import("./java-jvm-classload.html-cOO13IxT.js"),__vite__mapDeps([299,1]))),"v-1ce727c4":v(()=>r(()=>import("./java-jvm-cms-gc.html--5sh2Tqw.js"),__vite__mapDeps([300,1]))),"v-18eedada":v(()=>r(()=>import("./java-jvm-debug-idea.html-bEYJH-Eq.js"),__vite__mapDeps([301,1]))),"v-5ebaefb4":v(()=>r(()=>import("./java-jvm-debug-tools-linux.html-cfxrbU2T.js"),__vite__mapDeps([302,1]))),"v-3f7ab1cc":v(()=>r(()=>import("./java-jvm-debug-tools-list.html-DDQLVLCe.js"),__vite__mapDeps([303,1]))),"v-2c851e53":v(()=>r(()=>import("./java-jvm-gc-g1.html-ClCKybL-.js"),__vite__mapDeps([304,1]))),"v-ccc0a742":v(()=>r(()=>import("./java-jvm-gc-zgc.html-PsSvVBjH.js"),__vite__mapDeps([305,1]))),"v-134b39c8":v(()=>r(()=>import("./java-jvm-gc.html-hkYFcPEu.js"),__vite__mapDeps([306,1]))),"v-070878a4":v(()=>r(()=>import("./java-jvm-jmm.html-e2IWt7CN.js"),__vite__mapDeps([307,1]))),"v-d1b45d9a":v(()=>r(()=>import("./java-jvm-oom-offheap.html-kLmhgPq8.js"),__vite__mapDeps([308,1]))),"v-175b530c":v(()=>r(()=>import("./java-jvm-oom-tool.html-8KbYo8Qx.js"),__vite__mapDeps([309,1]))),"v-783acf81":v(()=>r(()=>import("./java-jvm-oom.html-vTUJfl_4.js"),__vite__mapDeps([310,1]))),"v-7980977e":v(()=>r(()=>import("./java-jvm-param.html-ls_xhCAI.js"),__vite__mapDeps([311,1]))),"v-05ae10ef":v(()=>r(()=>import("./java-jvm-struct.html-GADlRemZ.js"),__vite__mapDeps([312,1]))),"v-64225912":v(()=>r(()=>import("./java-jvm-thread-dump.html-GdUPAiBo.js"),__vite__mapDeps([313,1]))),"v-c35eedb8":v(()=>r(()=>import("./java-jvm-x-introduce.html-zg8yov33.js"),__vite__mapDeps([314,1]))),"v-16edf7b6":v(()=>r(()=>import("./java-jvm-x-overview.html-Eh9PACBA.js"),__vite__mapDeps([315,1]))),"v-5253f255":v(()=>r(()=>import("./awesome-java.html-y-tY_A9e.js"),__vite__mapDeps([316,1]))),"v-a489f7dc":v(()=>r(()=>import("./better-java.html-vGdVQqbK.js"),__vite__mapDeps([317,1]))),"v-2720156a":v(()=>r(()=>import("./01.html-R3m9Xkok.js"),__vite__mapDeps([318,1]))),"v-4014464e":v(()=>r(()=>import("./java-thread-x-juc-AtomicInteger.html-NRT6o8BB.js"),__vite__mapDeps([319,1]))),"v-55712db9":v(()=>r(()=>import("./java-thread-x-juc-collection-BlockingQueue.html-RUdRsz_w.js"),__vite__mapDeps([320,1]))),"v-0e60e6be":v(()=>r(()=>import("./java-thread-x-juc-collection-ConcurrentHashMap.html-tb-XFfgy.js"),__vite__mapDeps([321,1]))),"v-37193a74":v(()=>r(()=>import("./java-thread-x-juc-collection-ConcurrentLinkedQueue.html-cW1y2js4.js"),__vite__mapDeps([322,1]))),"v-616b765e":v(()=>r(()=>import("./java-thread-x-juc-collection-CopyOnWriteArrayList.html-m382atXh.js"),__vite__mapDeps([323,1]))),"v-6a09898a":v(()=>r(()=>import("./java-thread-x-juc-executor-ForkJoinPool.html-6FMW_Jwk.js"),__vite__mapDeps([324,1]))),"v-4289cd2a":v(()=>r(()=>import("./java-thread-x-juc-executor-FutureTask.html-MH2f7RGK.js"),__vite__mapDeps([325,1]))),"v-b49ab68c":v(()=>r(()=>import("./java-thread-x-juc-executor-ScheduledThreadPoolExecutor.html-JS5WMjOo.js"),__vite__mapDeps([326,1]))),"v-3344b079":v(()=>r(()=>import("./java-thread-x-juc-executor-ThreadPoolExecutor.html-RlXynxLc.js"),__vite__mapDeps([327,1]))),"v-29327e8d":v(()=>r(()=>import("./java-thread-x-juc-overview.html-7mXNaD4J.js"),__vite__mapDeps([328,1]))),"v-5852c0a4":v(()=>r(()=>import("./java-thread-x-juc-tool-countdownlatch.html-yD5Psk5o.js"),__vite__mapDeps([329,1]))),"v-6d0d4f46":v(()=>r(()=>import("./java-thread-x-juc-tool-cyclicbarrier.html-AIBWTBZm.js"),__vite__mapDeps([330,1]))),"v-5bebca2c":v(()=>r(()=>import("./java-thread-x-juc-tool-exchanger.html-ka-Poxh8.js"),__vite__mapDeps([331,1]))),"v-99933d00":v(()=>r(()=>import("./java-thread-x-juc-tool-phaser.html-nDtT03IU.js"),__vite__mapDeps([332,1]))),"v-277d5092":v(()=>r(()=>import("./java-thread-x-juc-tool-semaphore.html-FsJCU5r0.js"),__vite__mapDeps([333,1]))),"v-0d37dc6f":v(()=>r(()=>import("./java-thread-x-key-final.html-fQDo7Tib.js"),__vite__mapDeps([334,1]))),"v-0cb2d779":v(()=>r(()=>import("./java-thread-x-key-synchronized.html-SEGq52Yg.js"),__vite__mapDeps([335,1]))),"v-6dbf2df1":v(()=>r(()=>import("./java-thread-x-key-volatile.html-_mYSGnfZ.js"),__vite__mapDeps([336,1]))),"v-7a75b5c4":v(()=>r(()=>import("./java-thread-x-lock-AbstractQueuedSynchronizer.html-0V-aToVn.js"),__vite__mapDeps([337,1]))),"v-5e3906d9":v(()=>r(()=>import("./java-thread-x-lock-LockSupport.html-r2pfXncc.js"),__vite__mapDeps([338,1]))),"v-5f3a45a5":v(()=>r(()=>import("./java-thread-x-lock-ReentrantLock.html-RnwEI0NP.js"),__vite__mapDeps([339,1]))),"v-680a9b6e":v(()=>r(()=>import("./java-thread-x-lock-ReentrantReadWriteLock.html-Jl7GdRXA.js"),__vite__mapDeps([340,1]))),"v-15b7a148":v(()=>r(()=>import("./java-thread-x-lock-all.html-0cGoff4e.js"),__vite__mapDeps([341,1]))),"v-1549f7bc":v(()=>r(()=>import("./java-thread-x-overview.html-kppgTkRu.js"),__vite__mapDeps([342,1]))),"v-53ba6f7e":v(()=>r(()=>import("./java-thread-x-theorty.html-vQwD6RFz.js"),__vite__mapDeps([343,1]))),"v-9ba68da0":v(()=>r(()=>import("./java-thread-x-thread-basic.html-0iSlNGH2.js"),__vite__mapDeps([344,1]))),"v-b7b80514":v(()=>r(()=>import("./java-thread-x-threadlocal.html-NHva8cE_.js"),__vite__mapDeps([345,1]))),"v-7ec73772":v(()=>r(()=>import("./01.html-U4g1r2O7.js"),__vite__mapDeps([346,1]))),"v-24ff8d05":v(()=>r(()=>import("./overview.html-wfitwHqY.js"),__vite__mapDeps([347,1]))),"v-36a31b6e":v(()=>r(()=>import("./01.html-jIlgzaFC.js"),__vite__mapDeps([348,1]))),"v-22a65513":v(()=>r(()=>import("./alg-basic-array.html-a9W_RR22.js"),__vite__mapDeps([349,1]))),"v-5abdef58":v(()=>r(()=>import("./alg-basic-graph-aoe.html-mqZ-dZTa.js"),__vite__mapDeps([350,1]))),"v-25cc54b8":v(()=>r(()=>import("./alg-basic-graph-bfs-dfs.html-y1qKxx_o.js"),__vite__mapDeps([351,1]))),"v-5d6c8a12":v(()=>r(()=>import("./alg-basic-graph-min-distance.html-T3rBK5HJ.js"),__vite__mapDeps([352,1]))),"v-ca42b324":v(()=>r(()=>import("./alg-basic-graph-min-tree.html-vkSsoWd8.js"),__vite__mapDeps([353,1]))),"v-03dcd98c":v(()=>r(()=>import("./alg-basic-graph-topo-sort.html-2gWZr8lX.js"),__vite__mapDeps([354,1]))),"v-1a33d184":v(()=>r(()=>import("./alg-basic-graph.html-tYIKHhE1.js"),__vite__mapDeps([355,1]))),"v-1ba9c2cc":v(()=>r(()=>import("./alg-basic-hashtable.html-5rut5vhi.js"),__vite__mapDeps([356,1]))),"v-17ccac6e":v(()=>r(()=>import("./alg-basic-linklist.html-t0YO-TbX.js"),__vite__mapDeps([357,1]))),"v-b6f2d1a6":v(()=>r(()=>import("./alg-basic-overview.html-o09E8Ww3.js"),__vite__mapDeps([358,1]))),"v-65370d32":v(()=>r(()=>import("./alg-basic-stack_queue.html-SQ6H5WWp.js"),__vite__mapDeps([359,1]))),"v-31709ef9":v(()=>r(()=>import("./alg-basic-tree-balance.html-FGu3m185.js"),__vite__mapDeps([360,1]))),"v-e33b5360":v(()=>r(()=>import("./alg-basic-tree-hafman.html-pGXHFuyt.js"),__vite__mapDeps([361,1]))),"v-53875b8f":v(()=>r(()=>import("./alg-basic-tree-redblack.html-uDSrUDZE.js"),__vite__mapDeps([362,1]))),"v-46fae135":v(()=>r(()=>import("./alg-basic-tree-search.html-9yP63kxn.js"),__vite__mapDeps([363,1]))),"v-7e737b03":v(()=>r(()=>import("./alg-basic-tree-trie.html-pXcx8Pus.js"),__vite__mapDeps([364,1]))),"v-7ead82b0":v(()=>r(()=>import("./alg-basic-tree.html-N-HQLo1D.js"),__vite__mapDeps([365,1]))),"v-2ca438ac":v(()=>r(()=>import("./alg-core-backtracking.html-Ajj5jxD0.js"),__vite__mapDeps([366,1]))),"v-be269f54":v(()=>r(()=>import("./alg-core-devide-two.html-TNZIVuan.js"),__vite__mapDeps([367,1]))),"v-496c7e61":v(()=>r(()=>import("./alg-core-divide-and-conquer.html-agCA6HA6.js"),__vite__mapDeps([368,1]))),"v-37a513a9":v(()=>r(()=>import("./alg-core-dynamic.html--HzbCFFm.js"),__vite__mapDeps([369,1]))),"v-7e2afeaa":v(()=>r(()=>import("./alg-core-greedy.html-X2hCZICe.js"),__vite__mapDeps([370,1]))),"v-08212d9e":v(()=>r(()=>import("./alg-core-overview.html--W5lm_XA.js"),__vite__mapDeps([371,1]))),"v-96c4e2bc":v(()=>r(()=>import("./alg-core-search.html-jUc4Lf6V.js"),__vite__mapDeps([372,1]))),"v-6d52f585":v(()=>r(()=>import("./alg-domain-bigdata-bloom-filter.html-g6mHWX8o.js"),__vite__mapDeps([373,1]))),"v-38904d9d":v(()=>r(()=>import("./alg-domain-bigdata-bucket.html-heniS8ag.js"),__vite__mapDeps([374,1]))),"v-7cf660e4":v(()=>r(()=>import("./alg-domain-bigdata-db-index.html-U8DqkFeS.js"),__vite__mapDeps([375,1]))),"v-36343a0f":v(()=>r(()=>import("./alg-domain-bigdata-devide-and-hash.html-aFWDA_jq.js"),__vite__mapDeps([376,1]))),"v-650615b0":v(()=>r(()=>import("./alg-domain-bigdata-map-reduce.html-hGBbWR4L.js"),__vite__mapDeps([377,1]))),"v-31be9fbf":v(()=>r(()=>import("./alg-domain-bigdata-outsort.html-0hOA9T_1.js"),__vite__mapDeps([378,1]))),"v-26e927ee":v(()=>r(()=>import("./alg-domain-bigdata-overview.html-hW0qzGNn.js"),__vite__mapDeps([379,1]))),"v-76fe11a5":v(()=>r(()=>import("./alg-domain-char-match-bf.html-BM5XZOnU.js"),__vite__mapDeps([380,1]))),"v-fa200404":v(()=>r(()=>import("./alg-domain-char-match-bm.html-APZ6KjJO.js"),__vite__mapDeps([381,1]))),"v-2138fc8a":v(()=>r(()=>import("./alg-domain-char-match-kmp.html-hGSZp9yl.js"),__vite__mapDeps([382,1]))),"v-122bd9a8":v(()=>r(()=>import("./alg-domain-char-match-st.html-w5m60I5z.js"),__vite__mapDeps([383,1]))),"v-332ed69c":v(()=>r(()=>import("./alg-domain-char-match.html-76BfVdzc.js"),__vite__mapDeps([384,1]))),"v-36312da3":v(()=>r(()=>import("./alg-domain-distribute-overview.html-aj6BdG5z.js"),__vite__mapDeps([385,1]))),"v-1a357338":v(()=>r(()=>import("./alg-domain-distribute-x-consistency-hash.html-tZ3JHbtd.js"),__vite__mapDeps([386,1]))),"v-3eae9060":v(()=>r(()=>import("./alg-domain-distribute-x-paxos.html-Bu7F8JEA.js"),__vite__mapDeps([387,1]))),"v-7734c40a":v(()=>r(()=>import("./alg-domain-distribute-x-raft.html-GVGkveOK.js"),__vite__mapDeps([388,1]))),"v-a8291ce0":v(()=>r(()=>import("./alg-domain-distribute-x-zab.html-sH4hxCbc.js"),__vite__mapDeps([389,1]))),"v-213f690a":v(()=>r(()=>import("./alg-domain-id-snowflake.html-enxhQHD_.js"),__vite__mapDeps([390,1]))),"v-04283655":v(()=>r(()=>import("./alg-domain-load-balance.html-UhphiYBV.js"),__vite__mapDeps([391,1]))),"v-35074d01":v(()=>r(()=>import("./alg-domain-machine.html-JsPco2UY.js"),__vite__mapDeps([392,1]))),"v-cedcc65e":v(()=>r(()=>import("./alg-domain-overview.html-m6vIInIX.js"),__vite__mapDeps([393,1]))),"v-0cdb1ad2":v(()=>r(()=>import("./alg-domain-security-degist.html-WtDZyrve.js"),__vite__mapDeps([394,1]))),"v-1c134478":v(()=>r(()=>import("./alg-domain-security-secure.html-vVZ6NCIH.js"),__vite__mapDeps([395,1]))),"v-584451c1":v(()=>r(()=>import("./alg-domain-security-sm.html-XbXXb_5q.js"),__vite__mapDeps([396,1]))),"v-76f8c038":v(()=>r(()=>import("./alg-domain-suggest.html-YYKmWjXp.js"),__vite__mapDeps([397,1]))),"v-722b3cb8":v(()=>r(()=>import("./alg-other-mind.html-sWsq7Uam.js"),__vite__mapDeps([398,1]))),"v-3bdd9fde":v(()=>r(()=>import("./alg-sort-overview.html-zazEHA__.js"),__vite__mapDeps([399,1]))),"v-1845fb09":v(()=>r(()=>import("./alg-sort-x-bubble.html-8SSG0rC9.js"),__vite__mapDeps([400,1]))),"v-0a7bdf2a":v(()=>r(()=>import("./alg-sort-x-bucket.html-fl_eAFHG.js"),__vite__mapDeps([401,1]))),"v-722b4f8e":v(()=>r(()=>import("./alg-sort-x-fast.html-UA6hlWEd.js"),__vite__mapDeps([402,1]))),"v-601746ae":v(()=>r(()=>import("./alg-sort-x-heap.html-Jgi6pCj4.js"),__vite__mapDeps([403,1]))),"v-389c7e08":v(()=>r(()=>import("./alg-sort-x-insert.html-AOMI292_.js"),__vite__mapDeps([404,1]))),"v-588630e5":v(()=>r(()=>import("./alg-sort-x-merge.html-YLLAlhK7.js"),__vite__mapDeps([405,1]))),"v-ae687ece":v(()=>r(()=>import("./alg-sort-x-radix.html-8SlkNE05.js"),__vite__mapDeps([406,1]))),"v-12a17ece":v(()=>r(()=>import("./alg-sort-x-select.html-rJvW1QR2.js"),__vite__mapDeps([407,1]))),"v-c5e41c26":v(()=>r(()=>import("./alg-sort-x-shell.html-mzdggzAX.js"),__vite__mapDeps([408,1]))),"v-04990b56":v(()=>r(()=>import("./code-style-alibaba.html-YN19KmJR.js"),__vite__mapDeps([409,1]))),"v-c0e64272":v(()=>r(()=>import("./code-style-google.html-5emy93Rv.js"),__vite__mapDeps([410,1]))),"v-4a5192c2":v(()=>r(()=>import("./code-style-twitter.html-GN1FRiyz.js"),__vite__mapDeps([411,1]))),"v-377ff110":v(()=>r(()=>import("./dev-x-overview.html-08D2SF2m.js"),__vite__mapDeps([412,1]))),"v-5db483f2":v(()=>r(()=>import("./dev-qt-code-style-1.html-d73PQwmW.js"),__vite__mapDeps([413,1]))),"v-5a4ad2b4":v(()=>r(()=>import("./dev-qt-code-style-2.html-rHeX_vLB.js"),__vite__mapDeps([414,1]))),"v-404ec9ab":v(()=>r(()=>import("./dev-qt-code-style.html-uzsOEvmy.js"),__vite__mapDeps([415,1]))),"v-49af03c3":v(()=>r(()=>import("./dev-qt-overview.html-HWKRzGV-.js"),__vite__mapDeps([416,1]))),"v-73731470":v(()=>r(()=>import("./dev-qt-sonarlint.html-ofqVrZR0.js"),__vite__mapDeps([417,1]))),"v-3b419dbb":v(()=>r(()=>import("./dev-qt-spotbugs.html-5W7NnKgH.js"),__vite__mapDeps([418,1]))),"v-44b73af2":v(()=>r(()=>import("./dev-ut-springboot2.html-RIjqqKvd.js"),__vite__mapDeps([419,1]))),"v-b5b2dbc2":v(()=>r(()=>import("./dev-ut-unit-test.html-1wX5Ev0P.js"),__vite__mapDeps([420,1]))),"v-c9c030e6":v(()=>r(()=>import("./dev-ut-x-junit-idea.html-qVGWyVIC.js"),__vite__mapDeps([421,1]))),"v-2f9ed901":v(()=>r(()=>import("./dev-ut-x-junit.html-Lc5QO3Ag.js"),__vite__mapDeps([422,1]))),"v-6610f2c8":v(()=>r(()=>import("./dev-ut-x-junit5.html-QRte0Oas.js"),__vite__mapDeps([423,1]))),"v-0ec30915":v(()=>r(()=>import("./dev-ut-x-mockito.html-sXt9xT6m.js"),__vite__mapDeps([424,1]))),"v-3706649a":v(()=>r(()=>import("./404.html-vNq1DkXx.js"),__vite__mapDeps([425,1]))),"v-2d0aa3fe":v(()=>r(()=>import("./index.html-SSyDXsi_.js"),__vite__mapDeps([426,1]))),"v-3903e063":v(()=>r(()=>import("./index.html-WCv-LAnb.js"),__vite__mapDeps([427,1]))),"v-1891b76b":v(()=>r(()=>import("./index.html-RFtjSV3g.js"),__vite__mapDeps([428,1]))),"v-c5b06a54":v(()=>r(()=>import("./index.html-pkUx6trV.js"),__vite__mapDeps([429,1]))),"v-114ea066":v(()=>r(()=>import("./index.html-LEaM6-Q3.js"),__vite__mapDeps([430,1]))),"v-57f4af54":v(()=>r(()=>import("./index.html-yCAw7PpE.js"),__vite__mapDeps([431,1]))),"v-406294c2":v(()=>r(()=>import("./index.html-R448zsqN.js"),__vite__mapDeps([432,1]))),"v-08467114":v(()=>r(()=>import("./index.html-K_8PZGu5.js"),__vite__mapDeps([433,1]))),"v-25c9a30a":v(()=>r(()=>import("./index.html-Vba3lDnw.js"),__vite__mapDeps([434,1]))),"v-7165b58c":v(()=>r(()=>import("./index.html-SIbn9uRQ.js"),__vite__mapDeps([435,1]))),"v-5659c422":v(()=>r(()=>import("./index.html-X2fn3wlz.js"),__vite__mapDeps([436,1]))),"v-20af53f3":v(()=>r(()=>import("./index.html-IzlxxbKu.js"),__vite__mapDeps([437,1]))),"v-6edae1e4":v(()=>r(()=>import("./index.html-K1dEtymV.js"),__vite__mapDeps([438,1]))),"v-c3ef996e":v(()=>r(()=>import("./index.html-6IRrijug.js"),__vite__mapDeps([439,1]))),"v-269071d9":v(()=>r(()=>import("./index.html-HVpQeczN.js"),__vite__mapDeps([440,1]))),"v-48805d09":v(()=>r(()=>import("./index.html-LUn7PvnP.js"),__vite__mapDeps([441,1]))),"v-2d0a81d8":v(()=>r(()=>import("./index.html-WY461CgL.js"),__vite__mapDeps([442,1]))),"v-1f5734f3":v(()=>r(()=>import("./index.html-PsV8rlvB.js"),__vite__mapDeps([443,1]))),"v-274e014c":v(()=>r(()=>import("./index.html-g-oKa7DQ.js"),__vite__mapDeps([444,1]))),"v-84085c0e":v(()=>r(()=>import("./index.html-HolpTFnv.js"),__vite__mapDeps([445,1]))),"v-5112dfa6":v(()=>r(()=>import("./index.html-OEbhfrsS.js"),__vite__mapDeps([446,1]))),"v-51c4def8":v(()=>r(()=>import("./index.html-f4YDHn8c.js"),__vite__mapDeps([447,1]))),"v-696b0c9a":v(()=>r(()=>import("./index.html-UpfwNIMh.js"),__vite__mapDeps([448,1]))),"v-ffb97496":v(()=>r(()=>import("./index.html-2US7WoLl.js"),__vite__mapDeps([449,1]))),"v-14c69af4":v(()=>r(()=>import("./index.html-TqyjlKhW.js"),__vite__mapDeps([450,1]))),"v-16722c46":v(()=>r(()=>import("./index.html-HHuDapPk.js"),__vite__mapDeps([451,1]))),"v-9828af56":v(()=>r(()=>import("./index.html-ori9Wupd.js"),__vite__mapDeps([452,1]))),"v-2b9e3a1e":v(()=>r(()=>import("./index.html-NfMIQAqy.js"),__vite__mapDeps([453,1]))),"v-6cec0ebc":v(()=>r(()=>import("./index.html-D7jR0_EC.js"),__vite__mapDeps([454,1]))),"v-53c5f3b8":v(()=>r(()=>import("./index.html-Kzcd6BVh.js"),__vite__mapDeps([455,1]))),"v-211a2a4e":v(()=>r(()=>import("./index.html-Rai1__8h.js"),__vite__mapDeps([456,1]))),"v-48579df1":v(()=>r(()=>import("./index.html-3f6fhn8j.js"),__vite__mapDeps([457,1]))),"v-27762a11":v(()=>r(()=>import("./index.html-pUMpvhGO.js"),__vite__mapDeps([458,1]))),"v-3a02344a":v(()=>r(()=>import("./index.html-XVINPx-d.js"),__vite__mapDeps([459,1]))),"v-69afbe6c":v(()=>r(()=>import("./index.html-cbqxiDed.js"),__vite__mapDeps([460,1]))),"v-6f103f63":v(()=>r(()=>import("./index.html-y6IHTHhP.js"),__vite__mapDeps([461,1]))),"v-5bb56591":v(()=>r(()=>import("./index.html-lzVvC_iF.js"),__vite__mapDeps([462,1]))),"v-19b50ae4":v(()=>r(()=>import("./index.html-chQfP7WD.js"),__vite__mapDeps([463,1]))),"v-17602aee":v(()=>r(()=>import("./index.html-OeX7Loc1.js"),__vite__mapDeps([464,1]))),"v-f3741e7e":v(()=>r(()=>import("./index.html-JTCOa45_.js"),__vite__mapDeps([465,1]))),"v-17f21722":v(()=>r(()=>import("./index.html-pKJQFNkg.js"),__vite__mapDeps([466,1]))),"v-26e3eac3":v(()=>r(()=>import("./index.html-f6dxpypK.js"),__vite__mapDeps([467,1]))),"v-e867e24a":v(()=>r(()=>import("./index.html-iHD1JwsB.js"),__vite__mapDeps([468,1]))),"v-577684b5":v(()=>r(()=>import("./index.html-bZ_4r5Mg.js"),__vite__mapDeps([469,1]))),"v-5bc93818":v(()=>r(()=>import("./index.html-4GBvRQYX.js"),__vite__mapDeps([470,1]))),"v-744d024e":v(()=>r(()=>import("./index.html-sHAS9e0l.js"),__vite__mapDeps([471,1]))),"v-e52c881c":v(()=>r(()=>import("./index.html-joJ9yDMx.js"),__vite__mapDeps([472,1]))),"v-154dc4c4":v(()=>r(()=>import("./index.html-6JQJc57K.js"),__vite__mapDeps([473,1]))),"v-01560935":v(()=>r(()=>import("./index.html-_hXKOg4f.js"),__vite__mapDeps([474,1]))),"v-03d57386":v(()=>r(()=>import("./index.html-xt0Kt0Z-.js"),__vite__mapDeps([475,1]))),"v-83e1f92e":v(()=>r(()=>import("./index.html-Tjq6cL_X.js"),__vite__mapDeps([476,1]))),"v-506407f4":v(()=>r(()=>import("./index.html--jeEJiGM.js"),__vite__mapDeps([477,1]))),"v-37a8c5a0":v(()=>r(()=>import("./index.html-ZhCaM90r.js"),__vite__mapDeps([478,1]))),"v-0379cba1":v(()=>r(()=>import("./index.html-GGbb1Buj.js"),__vite__mapDeps([479,1]))),"v-ad1708ba":v(()=>r(()=>import("./index.html-4S1dD8Zy.js"),__vite__mapDeps([480,1]))),"v-1e447d61":v(()=>r(()=>import("./index.html-oRLrvwSl.js"),__vite__mapDeps([481,1]))),"v-0e743c94":v(()=>r(()=>import("./index.html-FH4oLKU1.js"),__vite__mapDeps([482,1]))),"v-484552dc":v(()=>r(()=>import("./index.html-xqljp3SV.js"),__vite__mapDeps([483,1]))),"v-5fed750f":v(()=>r(()=>import("./index.html-tzzR8sAM.js"),__vite__mapDeps([484,1]))),"v-a378ad66":v(()=>r(()=>import("./index.html-VpxdxFXn.js"),__vite__mapDeps([485,1]))),"v-41590e77":v(()=>r(()=>import("./index.html-JMI6AzFe.js"),__vite__mapDeps([486,1]))),"v-7b167472":v(()=>r(()=>import("./index.html-9BEvxZ19.js"),__vite__mapDeps([487,1]))),"v-503f41d6":v(()=>r(()=>import("./index.html-uxhD0WCd.js"),__vite__mapDeps([488,1]))),"v-6dd3fb2d":v(()=>r(()=>import("./index.html-52fMRDiw.js"),__vite__mapDeps([489,1]))),"v-50a76998":v(()=>r(()=>import("./index.html-Qm1IcQCc.js"),__vite__mapDeps([490,1]))),"v-75abdec8":v(()=>r(()=>import("./index.html-aX6SapTO.js"),__vite__mapDeps([491,1]))),"v-0a7437b0":v(()=>r(()=>import("./index.html-33DJP_DL.js"),__vite__mapDeps([492,1]))),"v-7365137c":v(()=>r(()=>import("./index.html-U7dAWp9v.js"),__vite__mapDeps([493,1]))),"v-300e8674":v(()=>r(()=>import("./index.html-wjF-TG2o.js"),__vite__mapDeps([494,1]))),"v-05b88e01":v(()=>r(()=>import("./index.html-Yum0tQAR.js"),__vite__mapDeps([495,1]))),"v-5f9463c4":v(()=>r(()=>import("./index.html-6xKsH41i.js"),__vite__mapDeps([496,1]))),"v-149ec160":v(()=>r(()=>import("./index.html-6NgffCTC.js"),__vite__mapDeps([497,1]))),"v-7ef0488a":v(()=>r(()=>import("./index.html-EVHcfxsQ.js"),__vite__mapDeps([498,1]))),"v-094082c0":v(()=>r(()=>import("./index.html-dNOHOuuD.js"),__vite__mapDeps([499,1]))),"v-b5fd4516":v(()=>r(()=>import("./index.html-0BiFCbxi.js"),__vite__mapDeps([500,1]))),"v-60078044":v(()=>r(()=>import("./index.html-MvPwNKaF.js"),__vite__mapDeps([501,1]))),"v-1f2550e8":v(()=>r(()=>import("./index.html-ZklSa3Tj.js"),__vite__mapDeps([502,1]))),"v-ce1020a8":v(()=>r(()=>import("./index.html-Kp0NaIuC.js"),__vite__mapDeps([503,1]))),"v-74f11498":v(()=>r(()=>import("./index.html-Vs87Vb9Y.js"),__vite__mapDeps([504,1]))),"v-3485b34a":v(()=>r(()=>import("./index.html-_xv81-H6.js"),__vite__mapDeps([505,1]))),"v-ebdc3094":v(()=>r(()=>import("./index.html-I1lAeSOY.js"),__vite__mapDeps([506,1]))),"v-66f1a1a4":v(()=>r(()=>import("./index.html-hZmI9eBb.js"),__vite__mapDeps([507,1]))),"v-009d76c4":v(()=>r(()=>import("./index.html-0GVPwS8q.js"),__vite__mapDeps([508,1]))),"v-07ff869f":v(()=>r(()=>import("./index.html-9PbBjUXo.js"),__vite__mapDeps([509,1]))),"v-7189e1c4":v(()=>r(()=>import("./index.html-76YF36D2.js"),__vite__mapDeps([510,1]))),"v-244cf499":v(()=>r(()=>import("./index.html-IXrTRVJV.js"),__vite__mapDeps([511,1]))),"v-c7024be8":v(()=>r(()=>import("./index.html-bI_5vT-1.js"),__vite__mapDeps([512,1]))),"v-e692110a":v(()=>r(()=>import("./index.html-0xt2WcbM.js"),__vite__mapDeps([513,1]))),"v-0fdf2423":v(()=>r(()=>import("./index.html-YNRe7twq.js"),__vite__mapDeps([514,1]))),"v-dc224880":v(()=>r(()=>import("./index.html-uHbVATMd.js"),__vite__mapDeps([515,1]))),"v-d3e06898":v(()=>r(()=>import("./index.html-qZz_RZSv.js"),__vite__mapDeps([516,1]))),"v-3264112b":v(()=>r(()=>import("./index.html-mLvSAlKa.js"),__vite__mapDeps([517,1]))),"v-ce1c513e":v(()=>r(()=>import("./index.html-ChkEpTnp.js"),__vite__mapDeps([518,1]))),"v-0f3580c2":v(()=>r(()=>import("./index.html-K6lErHtp.js"),__vite__mapDeps([519,1]))),"v-7d214bb7":v(()=>r(()=>import("./index.html-RYSY_obK.js"),__vite__mapDeps([520,1]))),"v-ca845d2c":v(()=>r(()=>import("./index.html-pP5YtHu9.js"),__vite__mapDeps([521,1]))),"v-6909452a":v(()=>r(()=>import("./index.html-XVoTQwy3.js"),__vite__mapDeps([522,1]))),"v-508ef528":v(()=>r(()=>import("./index.html-Th2GWegd.js"),__vite__mapDeps([523,1]))),"v-5571eef5":v(()=>r(()=>import("./index.html-0emvUjTI.js"),__vite__mapDeps([524,1]))),"v-6eaa757a":v(()=>r(()=>import("./index.html-rgdGhEb6.js"),__vite__mapDeps([525,1]))),"v-791f1092":v(()=>r(()=>import("./index.html-x9ZscbyY.js"),__vite__mapDeps([526,1]))),"v-20002c0c":v(()=>r(()=>import("./index.html-U_UqXHpW.js"),__vite__mapDeps([527,1]))),"v-9b4441e8":v(()=>r(()=>import("./index.html-aSqcZkPu.js"),__vite__mapDeps([528,1]))),"v-1af4e242":v(()=>r(()=>import("./index.html-yKD8zzLL.js"),__vite__mapDeps([529,1]))),"v-5decfa84":v(()=>r(()=>import("./index.html-mrjqXM10.js"),__vite__mapDeps([530,1]))),"v-c57c504e":v(()=>r(()=>import("./index.html-jbSaBfgQ.js"),__vite__mapDeps([531,1]))),"v-613ebf84":v(()=>r(()=>import("./index.html-g6QHt3no.js"),__vite__mapDeps([532,1]))),"v-42e1ac2a":v(()=>r(()=>import("./index.html-XE92Kvqf.js"),__vite__mapDeps([533,1]))),"v-08d15826":v(()=>r(()=>import("./index.html-Cs_8u7uM.js"),__vite__mapDeps([534,1]))),"v-bb4bcc98":v(()=>r(()=>import("./index.html-Au_q2U3v.js"),__vite__mapDeps([535,1]))),"v-13770b26":v(()=>r(()=>import("./index.html-ebT7amBR.js"),__vite__mapDeps([536,1]))),"v-3eb7880e":v(()=>r(()=>import("./index.html-qu8aCEvm.js"),__vite__mapDeps([537,1]))),"v-4e636242":v(()=>r(()=>import("./index.html-Qa6HM1HW.js"),__vite__mapDeps([538,1]))),"v-200bf6bc":v(()=>r(()=>import("./index.html-Bve9KdC7.js"),__vite__mapDeps([539,1]))),"v-fe7b1fa2":v(()=>r(()=>import("./index.html-HbdOIyhK.js"),__vite__mapDeps([540,1]))),"v-3d7e901c":v(()=>r(()=>import("./index.html-VhgrMVlV.js"),__vite__mapDeps([541,1]))),"v-1c6b640a":v(()=>r(()=>import("./index.html-KNujEZak.js"),__vite__mapDeps([542,1]))),"v-075c6c62":v(()=>r(()=>import("./index.html-Ne8x3D_C.js"),__vite__mapDeps([543,1])))};var Sv=Symbol(""),_c=Symbol(""),Vv=nn({key:"",path:"",title:"",lang:"",frontmatter:{},headers:[]}),ie=()=>{const e=me(_c);if(!e)throw new Error("pageData() is called without provider.");return e},fc=Symbol(""),be=()=>{const e=me(fc);if(!e)throw new Error("usePageFrontmatter() is called without provider.");return e},gc=Symbol(""),xv=()=>{const e=me(gc);if(!e)throw new Error("usePageHead() is called without provider.");return e},qv=Symbol(""),bc=Symbol(""),Ec=()=>{const e=me(bc);if(!e)throw new Error("usePageLang() is called without provider.");return e},kc=Symbol(""),Cv=()=>{const e=me(kc);if(!e)throw new Error("usePageLayout() is called without provider.");return e},Mv=H(wv),ol=Symbol(""),Et=()=>{const e=me(ol);if(!e)throw new Error("useRouteLocale() is called without provider.");return e},Dn=H(Iv),yc=()=>Dn,Lc=Symbol(""),_n=()=>{const e=me(Lc);if(!e)throw new Error("useSiteLocaleData() is called without provider.");return e},jv=Symbol(""),Jv="Layout",Bv="NotFound",Ot=Ia({resolveLayouts:e=>e.reduce((t,n)=>({...t,...n.layouts}),{}),resolvePageData:async e=>{const t=Mv.value[e];return await(t==null?void 0:t())??Vv},resolvePageFrontmatter:e=>e.frontmatter,resolvePageHead:(e,t,n)=>{const a=ce(t.description)?t.description:n.description,o=[...ee(t.head)?t.head:[],...n.head,["title",{},e],["meta",{name:"description",content:a}]];return Dv(o)},resolvePageHeadTitle:(e,t)=>[e.title,t.title].filter(n=>!!n).join(" | "),resolvePageLang:(e,t)=>e.lang||t.lang||"en-US",resolvePageLayout:(e,t)=>{let n;if(e.path){const a=e.frontmatter.layout;ce(a)?n=a:n=Jv}else n=Bv;return t[n]},resolveRouteLocale:(e,t)=>Ov(e,t),resolveSiteLocaleData:(e,t)=>({...e,...e.locales[t]})}),Io=C({name:"ClientOnly",setup(e,t){const n=H(!1);return fe(()=>{n.value=!0}),()=>{var a,o;return n.value?(o=(a=t.slots).default)==null?void 0:o.call(a):null}}}),Ac=C({name:"Content",props:{pageKey:{type:String,required:!1,default:""}},setup(e){const t=ie(),n=L(()=>mc[e.pageKey||t.value.key]);return()=>n.value?i(n.value):i("div","404 Not Found")}}),pt=(e={})=>e,Ae=e=>an(e)?e:`/${hc(e)}`;const Nv={};/*!
  * vue-router v4.2.5
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */const wn=typeof window<"u";function $v(e){return e.__esModule||e[Symbol.toStringTag]==="Module"}const ge=Object.assign;function zo(e,t){const n={};for(const a in t){const o=t[a];n[a]=gt(o)?o.map(e):e(o)}return n}const da=()=>{},gt=Array.isArray,Qv=/\/$/,Fv=e=>e.replace(Qv,"");function Uo(e,t,n="/"){let a,o={},l="",s="";const c=t.indexOf("#");let d=t.indexOf("?");return c<d&&c>=0&&(d=-1),d>-1&&(a=t.slice(0,d),l=t.slice(d+1,c>-1?c:t.length),o=e(l)),c>-1&&(a=a||t.slice(0,c),s=t.slice(c,t.length)),a=Wv(a??t,n),{fullPath:a+(l&&"?")+l+s,path:a,query:o,hash:s}}function Hv(e,t){const n=t.query?e(t.query):"";return t.path+(n&&"?")+n+(t.hash||"")}function ks(e,t){return!t||!e.toLowerCase().startsWith(t.toLowerCase())?e:e.slice(t.length)||"/"}function zv(e,t,n){const a=t.matched.length-1,o=n.matched.length-1;return a>-1&&a===o&&$n(t.matched[a],n.matched[o])&&wc(t.params,n.params)&&e(t.query)===e(n.query)&&t.hash===n.hash}function $n(e,t){return(e.aliasOf||e)===(t.aliasOf||t)}function wc(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(const n in e)if(!Uv(e[n],t[n]))return!1;return!0}function Uv(e,t){return gt(e)?ys(e,t):gt(t)?ys(t,e):e===t}function ys(e,t){return gt(t)?e.length===t.length&&e.every((n,a)=>n===t[a]):e.length===1&&e[0]===t}function Wv(e,t){if(e.startsWith("/"))return e;if(!e)return t;const n=t.split("/"),a=e.split("/"),o=a[a.length-1];(o===".."||o===".")&&a.push("");let l=n.length-1,s,c;for(s=0;s<a.length;s++)if(c=a[s],c!==".")if(c==="..")l>1&&l--;else break;return n.slice(0,l).join("/")+"/"+a.slice(s-(s===a.length?1:0)).join("/")}var ka;(function(e){e.pop="pop",e.push="push"})(ka||(ka={}));var pa;(function(e){e.back="back",e.forward="forward",e.unknown=""})(pa||(pa={}));function Gv(e){if(!e)if(wn){const t=document.querySelector("base");e=t&&t.getAttribute("href")||"/",e=e.replace(/^\w+:\/\/[^\/]+/,"")}else e="/";return e[0]!=="/"&&e[0]!=="#"&&(e="/"+e),Fv(e)}const Kv=/^[^#]+#/;function Xv(e,t){return e.replace(Kv,"#")+t}function Zv(e,t){const n=document.documentElement.getBoundingClientRect(),a=e.getBoundingClientRect();return{behavior:t.behavior,left:a.left-n.left-(t.left||0),top:a.top-n.top-(t.top||0)}}const To=()=>({left:window.pageXOffset,top:window.pageYOffset});function Yv(e){let t;if("el"in e){const n=e.el,a=typeof n=="string"&&n.startsWith("#"),o=typeof n=="string"?a?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!o)return;t=Zv(o,e)}else t=e;"scrollBehavior"in document.documentElement.style?window.scrollTo(t):window.scrollTo(t.left!=null?t.left:window.pageXOffset,t.top!=null?t.top:window.pageYOffset)}function Ls(e,t){return(history.state?history.state.position-t:-1)+e}const Er=new Map;function e1(e,t){Er.set(e,t)}function t1(e){const t=Er.get(e);return Er.delete(e),t}let n1=()=>location.protocol+"//"+location.host;function Ic(e,t){const{pathname:n,search:a,hash:o}=t,l=e.indexOf("#");if(l>-1){let c=o.includes(e.slice(l))?e.slice(l).length:1,d=o.slice(c);return d[0]!=="/"&&(d="/"+d),ks(d,"")}return ks(n,e)+a+o}function a1(e,t,n,a){let o=[],l=[],s=null;const c=({state:m})=>{const _=Ic(e,location),g=n.value,E=t.value;let w=0;if(m){if(n.value=_,t.value=m,s&&s===g){s=null;return}w=E?m.position-E.position:0}else a(_);o.forEach(y=>{y(n.value,g,{delta:w,type:ka.pop,direction:w?w>0?pa.forward:pa.back:pa.unknown})})};function d(){s=n.value}function u(m){o.push(m);const _=()=>{const g=o.indexOf(m);g>-1&&o.splice(g,1)};return l.push(_),_}function p(){const{history:m}=window;m.state&&m.replaceState(ge({},m.state,{scroll:To()}),"")}function h(){for(const m of l)m();l=[],window.removeEventListener("popstate",c),window.removeEventListener("beforeunload",p)}return window.addEventListener("popstate",c),window.addEventListener("beforeunload",p,{passive:!0}),{pauseListeners:d,listen:u,destroy:h}}function As(e,t,n,a=!1,o=!1){return{back:e,current:t,forward:n,replaced:a,position:window.history.length,scroll:o?To():null}}function o1(e){const{history:t,location:n}=window,a={value:Ic(e,n)},o={value:t.state};o.value||l(a.value,{back:null,current:a.value,forward:null,position:t.length-1,replaced:!0,scroll:null},!0);function l(d,u,p){const h=e.indexOf("#"),m=h>-1?(n.host&&document.querySelector("base")?e:e.slice(h))+d:n1()+e+d;try{t[p?"replaceState":"pushState"](u,"",m),o.value=u}catch(_){console.error(_),n[p?"replace":"assign"](m)}}function s(d,u){const p=ge({},t.state,As(o.value.back,d,o.value.forward,!0),u,{position:o.value.position});l(d,p,!0),a.value=d}function c(d,u){const p=ge({},o.value,t.state,{forward:d,scroll:To()});l(p.current,p,!0);const h=ge({},As(a.value,d,null),{position:p.position+1},u);l(d,h,!1),a.value=d}return{location:a,state:o,push:c,replace:s}}function r1(e){e=Gv(e);const t=o1(e),n=a1(e,t.state,t.location,t.replace);function a(l,s=!0){s||n.pauseListeners(),history.go(l)}const o=ge({location:"",base:e,go:a,createHref:Xv.bind(null,e)},t,n);return Object.defineProperty(o,"location",{enumerable:!0,get:()=>t.location.value}),Object.defineProperty(o,"state",{enumerable:!0,get:()=>t.state.value}),o}function l1(e){return typeof e=="string"||e&&typeof e=="object"}function Tc(e){return typeof e=="string"||typeof e=="symbol"}const St={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0},Dc=Symbol("");var ws;(function(e){e[e.aborted=4]="aborted",e[e.cancelled=8]="cancelled",e[e.duplicated=16]="duplicated"})(ws||(ws={}));function Qn(e,t){return ge(new Error,{type:e,[Dc]:!0},t)}function Pt(e,t){return e instanceof Error&&Dc in e&&(t==null||!!(e.type&t))}const Is="[^/]+?",s1={sensitive:!1,strict:!1,start:!0,end:!0},i1=/[.+*?^${}()[\]/\\]/g;function c1(e,t){const n=ge({},s1,t),a=[];let o=n.start?"^":"";const l=[];for(const u of e){const p=u.length?[]:[90];n.strict&&!u.length&&(o+="/");for(let h=0;h<u.length;h++){const m=u[h];let _=40+(n.sensitive?.25:0);if(m.type===0)h||(o+="/"),o+=m.value.replace(i1,"\\$&"),_+=40;else if(m.type===1){const{value:g,repeatable:E,optional:w,regexp:y}=m;l.push({name:g,repeatable:E,optional:w});const T=y||Is;if(T!==Is){_+=10;try{new RegExp(`(${T})`)}catch(I){throw new Error(`Invalid custom RegExp for param "${g}" (${T}): `+I.message)}}let k=E?`((?:${T})(?:/(?:${T}))*)`:`(${T})`;h||(k=w&&u.length<2?`(?:/${k})`:"/"+k),w&&(k+="?"),o+=k,_+=20,w&&(_+=-8),E&&(_+=-20),T===".*"&&(_+=-50)}p.push(_)}a.push(p)}if(n.strict&&n.end){const u=a.length-1;a[u][a[u].length-1]+=.7000000000000001}n.strict||(o+="/?"),n.end?o+="$":n.strict&&(o+="(?:/|$)");const s=new RegExp(o,n.sensitive?"":"i");function c(u){const p=u.match(s),h={};if(!p)return null;for(let m=1;m<p.length;m++){const _=p[m]||"",g=l[m-1];h[g.name]=_&&g.repeatable?_.split("/"):_}return h}function d(u){let p="",h=!1;for(const m of e){(!h||!p.endsWith("/"))&&(p+="/"),h=!1;for(const _ of m)if(_.type===0)p+=_.value;else if(_.type===1){const{value:g,repeatable:E,optional:w}=_,y=g in u?u[g]:"";if(gt(y)&&!E)throw new Error(`Provided param "${g}" is an array but it is not repeatable (* or + modifiers)`);const T=gt(y)?y.join("/"):y;if(!T)if(w)m.length<2&&(p.endsWith("/")?p=p.slice(0,-1):h=!0);else throw new Error(`Missing required param "${g}"`);p+=T}}return p||"/"}return{re:s,score:a,keys:l,parse:c,stringify:d}}function u1(e,t){let n=0;for(;n<e.length&&n<t.length;){const a=t[n]-e[n];if(a)return a;n++}return e.length<t.length?e.length===1&&e[0]===80?-1:1:e.length>t.length?t.length===1&&t[0]===80?1:-1:0}function d1(e,t){let n=0;const a=e.score,o=t.score;for(;n<a.length&&n<o.length;){const l=u1(a[n],o[n]);if(l)return l;n++}if(Math.abs(o.length-a.length)===1){if(Ts(a))return 1;if(Ts(o))return-1}return o.length-a.length}function Ts(e){const t=e[e.length-1];return e.length>0&&t[t.length-1]<0}const p1={type:0,value:""},v1=/[a-zA-Z0-9_]/;function h1(e){if(!e)return[[]];if(e==="/")return[[p1]];if(!e.startsWith("/"))throw new Error(`Invalid path "${e}"`);function t(_){throw new Error(`ERR (${n})/"${u}": ${_}`)}let n=0,a=n;const o=[];let l;function s(){l&&o.push(l),l=[]}let c=0,d,u="",p="";function h(){u&&(n===0?l.push({type:0,value:u}):n===1||n===2||n===3?(l.length>1&&(d==="*"||d==="+")&&t(`A repeatable param (${u}) must be alone in its segment. eg: '/:ids+.`),l.push({type:1,value:u,regexp:p,repeatable:d==="*"||d==="+",optional:d==="*"||d==="?"})):t("Invalid state to consume buffer"),u="")}function m(){u+=d}for(;c<e.length;){if(d=e[c++],d==="\\"&&n!==2){a=n,n=4;continue}switch(n){case 0:d==="/"?(u&&h(),s()):d===":"?(h(),n=1):m();break;case 4:m(),n=a;break;case 1:d==="("?n=2:v1.test(d)?m():(h(),n=0,d!=="*"&&d!=="?"&&d!=="+"&&c--);break;case 2:d===")"?p[p.length-1]=="\\"?p=p.slice(0,-1)+d:n=3:p+=d;break;case 3:h(),n=0,d!=="*"&&d!=="?"&&d!=="+"&&c--,p="";break;default:t("Unknown state");break}}return n===2&&t(`Unfinished custom RegExp for param "${u}"`),h(),s(),o}function m1(e,t,n){const a=c1(h1(e.path),n),o=ge(a,{record:e,parent:t,children:[],alias:[]});return t&&!o.record.aliasOf==!t.record.aliasOf&&t.children.push(o),o}function _1(e,t){const n=[],a=new Map;t=Rs({strict:!1,end:!0,sensitive:!1},t);function o(p){return a.get(p)}function l(p,h,m){const _=!m,g=f1(p);g.aliasOf=m&&m.record;const E=Rs(t,p),w=[g];if("alias"in p){const k=typeof p.alias=="string"?[p.alias]:p.alias;for(const I of k)w.push(ge({},g,{components:m?m.record.components:g.components,path:I,aliasOf:m?m.record:g}))}let y,T;for(const k of w){const{path:I}=k;if(h&&I[0]!=="/"){const M=h.record.path,O=M[M.length-1]==="/"?"":"/";k.path=h.record.path+(I&&O+I)}if(y=m1(k,h,E),m?m.alias.push(y):(T=T||y,T!==y&&T.alias.push(y),_&&p.name&&!Ps(y)&&s(p.name)),g.children){const M=g.children;for(let O=0;O<M.length;O++)l(M[O],y,m&&m.children[O])}m=m||y,(y.record.components&&Object.keys(y.record.components).length||y.record.name||y.record.redirect)&&d(y)}return T?()=>{s(T)}:da}function s(p){if(Tc(p)){const h=a.get(p);h&&(a.delete(p),n.splice(n.indexOf(h),1),h.children.forEach(s),h.alias.forEach(s))}else{const h=n.indexOf(p);h>-1&&(n.splice(h,1),p.record.name&&a.delete(p.record.name),p.children.forEach(s),p.alias.forEach(s))}}function c(){return n}function d(p){let h=0;for(;h<n.length&&d1(p,n[h])>=0&&(p.record.path!==n[h].record.path||!Pc(p,n[h]));)h++;n.splice(h,0,p),p.record.name&&!Ps(p)&&a.set(p.record.name,p)}function u(p,h){let m,_={},g,E;if("name"in p&&p.name){if(m=a.get(p.name),!m)throw Qn(1,{location:p});E=m.record.name,_=ge(Ds(h.params,m.keys.filter(T=>!T.optional).map(T=>T.name)),p.params&&Ds(p.params,m.keys.map(T=>T.name))),g=m.stringify(_)}else if("path"in p)g=p.path,m=n.find(T=>T.re.test(g)),m&&(_=m.parse(g),E=m.record.name);else{if(m=h.name?a.get(h.name):n.find(T=>T.re.test(h.path)),!m)throw Qn(1,{location:p,currentLocation:h});E=m.record.name,_=ge({},h.params,p.params),g=m.stringify(_)}const w=[];let y=m;for(;y;)w.unshift(y.record),y=y.parent;return{name:E,path:g,params:_,matched:w,meta:b1(w)}}return e.forEach(p=>l(p)),{addRoute:l,resolve:u,removeRoute:s,getRoutes:c,getRecordMatcher:o}}function Ds(e,t){const n={};for(const a of t)a in e&&(n[a]=e[a]);return n}function f1(e){return{path:e.path,redirect:e.redirect,name:e.name,meta:e.meta||{},aliasOf:void 0,beforeEnter:e.beforeEnter,props:g1(e),children:e.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in e?e.components||null:e.component&&{default:e.component}}}function g1(e){const t={},n=e.props||!1;if("component"in e)t.default=n;else for(const a in e.components)t[a]=typeof n=="object"?n[a]:n;return t}function Ps(e){for(;e;){if(e.record.aliasOf)return!0;e=e.parent}return!1}function b1(e){return e.reduce((t,n)=>ge(t,n.meta),{})}function Rs(e,t){const n={};for(const a in e)n[a]=a in t?t[a]:e[a];return n}function Pc(e,t){return t.children.some(n=>n===e||Pc(e,n))}const Rc=/#/g,E1=/&/g,k1=/\//g,y1=/=/g,L1=/\?/g,Oc=/\+/g,A1=/%5B/g,w1=/%5D/g,Sc=/%5E/g,I1=/%60/g,Vc=/%7B/g,T1=/%7C/g,xc=/%7D/g,D1=/%20/g;function rl(e){return encodeURI(""+e).replace(T1,"|").replace(A1,"[").replace(w1,"]")}function P1(e){return rl(e).replace(Vc,"{").replace(xc,"}").replace(Sc,"^")}function kr(e){return rl(e).replace(Oc,"%2B").replace(D1,"+").replace(Rc,"%23").replace(E1,"%26").replace(I1,"`").replace(Vc,"{").replace(xc,"}").replace(Sc,"^")}function R1(e){return kr(e).replace(y1,"%3D")}function O1(e){return rl(e).replace(Rc,"%23").replace(L1,"%3F")}function S1(e){return e==null?"":O1(e).replace(k1,"%2F")}function vo(e){try{return decodeURIComponent(""+e)}catch{}return""+e}function V1(e){const t={};if(e===""||e==="?")return t;const a=(e[0]==="?"?e.slice(1):e).split("&");for(let o=0;o<a.length;++o){const l=a[o].replace(Oc," "),s=l.indexOf("="),c=vo(s<0?l:l.slice(0,s)),d=s<0?null:vo(l.slice(s+1));if(c in t){let u=t[c];gt(u)||(u=t[c]=[u]),u.push(d)}else t[c]=d}return t}function Os(e){let t="";for(let n in e){const a=e[n];if(n=R1(n),a==null){a!==void 0&&(t+=(t.length?"&":"")+n);continue}(gt(a)?a.map(l=>l&&kr(l)):[a&&kr(a)]).forEach(l=>{l!==void 0&&(t+=(t.length?"&":"")+n,l!=null&&(t+="="+l))})}return t}function x1(e){const t={};for(const n in e){const a=e[n];a!==void 0&&(t[n]=gt(a)?a.map(o=>o==null?null:""+o):a==null?a:""+a)}return t}const q1=Symbol(""),Ss=Symbol(""),Do=Symbol(""),ll=Symbol(""),yr=Symbol("");function ta(){let e=[];function t(a){return e.push(a),()=>{const o=e.indexOf(a);o>-1&&e.splice(o,1)}}function n(){e=[]}return{add:t,list:()=>e.slice(),reset:n}}function Wt(e,t,n,a,o){const l=a&&(a.enterCallbacks[o]=a.enterCallbacks[o]||[]);return()=>new Promise((s,c)=>{const d=h=>{h===!1?c(Qn(4,{from:n,to:t})):h instanceof Error?c(h):l1(h)?c(Qn(2,{from:t,to:h})):(l&&a.enterCallbacks[o]===l&&typeof h=="function"&&l.push(h),s())},u=e.call(a&&a.instances[o],t,n,d);let p=Promise.resolve(u);e.length<3&&(p=p.then(d)),p.catch(h=>c(h))})}function Wo(e,t,n,a){const o=[];for(const l of e)for(const s in l.components){let c=l.components[s];if(!(t!=="beforeRouteEnter"&&!l.instances[s]))if(C1(c)){const u=(c.__vccOpts||c)[t];u&&o.push(Wt(u,n,a,l,s))}else{let d=c();o.push(()=>d.then(u=>{if(!u)return Promise.reject(new Error(`Couldn't resolve component "${s}" at "${l.path}"`));const p=$v(u)?u.default:u;l.components[s]=p;const m=(p.__vccOpts||p)[t];return m&&Wt(m,n,a,l,s)()}))}}return o}function C1(e){return typeof e=="object"||"displayName"in e||"props"in e||"__vccOpts"in e}function Lr(e){const t=me(Do),n=me(ll),a=L(()=>t.resolve(vn(e.to))),o=L(()=>{const{matched:d}=a.value,{length:u}=d,p=d[u-1],h=n.matched;if(!p||!h.length)return-1;const m=h.findIndex($n.bind(null,p));if(m>-1)return m;const _=Vs(d[u-2]);return u>1&&Vs(p)===_&&h[h.length-1].path!==_?h.findIndex($n.bind(null,d[u-2])):m}),l=L(()=>o.value>-1&&B1(n.params,a.value.params)),s=L(()=>o.value>-1&&o.value===n.matched.length-1&&wc(n.params,a.value.params));function c(d={}){return J1(d)?t[vn(e.replace)?"replace":"push"](vn(e.to)).catch(da):Promise.resolve()}return{route:a,href:L(()=>a.value.href),isActive:l,isExactActive:s,navigate:c}}const M1=C({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"}},useLink:Lr,setup(e,{slots:t}){const n=Ia(Lr(e)),{options:a}=me(Do),o=L(()=>({[xs(e.activeClass,a.linkActiveClass,"router-link-active")]:n.isActive,[xs(e.exactActiveClass,a.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive}));return()=>{const l=t.default&&t.default(n);return e.custom?l:i("a",{"aria-current":n.isExactActive?e.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:o.value},l)}}}),j1=M1;function J1(e){if(!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)&&!e.defaultPrevented&&!(e.button!==void 0&&e.button!==0)){if(e.currentTarget&&e.currentTarget.getAttribute){const t=e.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(t))return}return e.preventDefault&&e.preventDefault(),!0}}function B1(e,t){for(const n in t){const a=t[n],o=e[n];if(typeof a=="string"){if(a!==o)return!1}else if(!gt(o)||o.length!==a.length||a.some((l,s)=>l!==o[s]))return!1}return!0}function Vs(e){return e?e.aliasOf?e.aliasOf.path:e.path:""}const xs=(e,t,n)=>e??t??n,N1=C({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(e,{attrs:t,slots:n}){const a=me(yr),o=L(()=>e.route||a.value),l=me(Ss,0),s=L(()=>{let u=vn(l);const{matched:p}=o.value;let h;for(;(h=p[u])&&!h.components;)u++;return u}),c=L(()=>o.value.matched[s.value]);it(Ss,L(()=>s.value+1)),it(q1,c),it(yr,o);const d=H();return ue(()=>[d.value,c.value,e.name],([u,p,h],[m,_,g])=>{p&&(p.instances[h]=u,_&&_!==p&&u&&u===m&&(p.leaveGuards.size||(p.leaveGuards=_.leaveGuards),p.updateGuards.size||(p.updateGuards=_.updateGuards))),u&&p&&(!_||!$n(p,_)||!m)&&(p.enterCallbacks[h]||[]).forEach(E=>E(u))},{flush:"post"}),()=>{const u=o.value,p=e.name,h=c.value,m=h&&h.components[p];if(!m)return qs(n.default,{Component:m,route:u});const _=h.props[p],g=_?_===!0?u.params:typeof _=="function"?_(u):_:null,w=i(m,ge({},g,t,{onVnodeUnmounted:y=>{y.component.isUnmounted&&(h.instances[p]=null)},ref:d}));return qs(n.default,{Component:w,route:u})||w}}});function qs(e,t){if(!e)return null;const n=e(t);return n.length===1?n[0]:n}const qc=N1;function $1(e){const t=_1(e.routes,e),n=e.parseQuery||V1,a=e.stringifyQuery||Os,o=e.history,l=ta(),s=ta(),c=ta(),d=je(St);let u=St;wn&&e.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const p=zo.bind(null,P=>""+P),h=zo.bind(null,S1),m=zo.bind(null,vo);function _(P,F){let j,K;return Tc(P)?(j=t.getRecordMatcher(P),K=F):K=P,t.addRoute(K,j)}function g(P){const F=t.getRecordMatcher(P);F&&t.removeRoute(F)}function E(){return t.getRoutes().map(P=>P.record)}function w(P){return!!t.getRecordMatcher(P)}function y(P,F){if(F=ge({},F||d.value),typeof P=="string"){const A=Uo(n,P,F.path),D=t.resolve({path:A.path},F),R=o.createHref(A.fullPath);return ge(A,D,{params:m(D.params),hash:vo(A.hash),redirectedFrom:void 0,href:R})}let j;if("path"in P)j=ge({},P,{path:Uo(n,P.path,F.path).path});else{const A=ge({},P.params);for(const D in A)A[D]==null&&delete A[D];j=ge({},P,{params:h(A)}),F.params=h(F.params)}const K=t.resolve(j,F),pe=P.hash||"";K.params=p(m(K.params));const f=Hv(a,ge({},P,{hash:P1(pe),path:K.path})),b=o.createHref(f);return ge({fullPath:f,hash:pe,query:a===Os?x1(P.query):P.query||{}},K,{redirectedFrom:void 0,href:b})}function T(P){return typeof P=="string"?Uo(n,P,d.value.path):ge({},P)}function k(P,F){if(u!==P)return Qn(8,{from:F,to:P})}function I(P){return G(P)}function M(P){return I(ge(T(P),{replace:!0}))}function O(P){const F=P.matched[P.matched.length-1];if(F&&F.redirect){const{redirect:j}=F;let K=typeof j=="function"?j(P):j;return typeof K=="string"&&(K=K.includes("?")||K.includes("#")?K=T(K):{path:K},K.params={}),ge({query:P.query,hash:P.hash,params:"path"in K?{}:P.params},K)}}function G(P,F){const j=u=y(P),K=d.value,pe=P.state,f=P.force,b=P.replace===!0,A=O(j);if(A)return G(ge(T(A),{state:typeof A=="object"?ge({},pe,A.state):pe,force:f,replace:b}),F||j);const D=j;D.redirectedFrom=F;let R;return!f&&zv(a,K,j)&&(R=Qn(16,{to:D,from:K}),nt(K,K,!0,!1)),(R?Promise.resolve(R):J(D,K)).catch(S=>Pt(S)?Pt(S,2)?S:yt(S):U(S,D,K)).then(S=>{if(S){if(Pt(S,2))return G(ge({replace:b},T(S.to),{state:typeof S.to=="object"?ge({},pe,S.to.state):pe,force:f}),F||D)}else S=N(D,K,!0,b,pe);return X(D,K,S),S})}function $(P,F){const j=k(P,F);return j?Promise.reject(j):Promise.resolve()}function x(P){const F=Dt.values().next().value;return F&&typeof F.runWithContext=="function"?F.runWithContext(P):P()}function J(P,F){let j;const[K,pe,f]=Q1(P,F);j=Wo(K.reverse(),"beforeRouteLeave",P,F);for(const A of K)A.leaveGuards.forEach(D=>{j.push(Wt(D,P,F))});const b=$.bind(null,P,F);return j.push(b),Ve(j).then(()=>{j=[];for(const A of l.list())j.push(Wt(A,P,F));return j.push(b),Ve(j)}).then(()=>{j=Wo(pe,"beforeRouteUpdate",P,F);for(const A of pe)A.updateGuards.forEach(D=>{j.push(Wt(D,P,F))});return j.push(b),Ve(j)}).then(()=>{j=[];for(const A of f)if(A.beforeEnter)if(gt(A.beforeEnter))for(const D of A.beforeEnter)j.push(Wt(D,P,F));else j.push(Wt(A.beforeEnter,P,F));return j.push(b),Ve(j)}).then(()=>(P.matched.forEach(A=>A.enterCallbacks={}),j=Wo(f,"beforeRouteEnter",P,F),j.push(b),Ve(j))).then(()=>{j=[];for(const A of s.list())j.push(Wt(A,P,F));return j.push(b),Ve(j)}).catch(A=>Pt(A,8)?A:Promise.reject(A))}function X(P,F,j){c.list().forEach(K=>x(()=>K(P,F,j)))}function N(P,F,j,K,pe){const f=k(P,F);if(f)return f;const b=F===St,A=wn?history.state:{};j&&(K||b?o.replace(P.fullPath,ge({scroll:b&&A&&A.scroll},pe)):o.push(P.fullPath,pe)),d.value=P,nt(P,F,j,b),yt()}let te;function De(){te||(te=o.listen((P,F,j)=>{if(!Lt.listening)return;const K=y(P),pe=O(K);if(pe){G(ge(pe,{replace:!0}),K).catch(da);return}u=K;const f=d.value;wn&&e1(Ls(f.fullPath,j.delta),To()),J(K,f).catch(b=>Pt(b,12)?b:Pt(b,2)?(G(b.to,K).then(A=>{Pt(A,20)&&!j.delta&&j.type===ka.pop&&o.go(-1,!1)}).catch(da),Promise.reject()):(j.delta&&o.go(-j.delta,!1),U(b,K,f))).then(b=>{b=b||N(K,f,!1),b&&(j.delta&&!Pt(b,8)?o.go(-j.delta,!1):j.type===ka.pop&&Pt(b,20)&&o.go(-1,!1)),X(K,f,b)}).catch(da)}))}let we=ta(),z=ta(),ne;function U(P,F,j){yt(P);const K=z.list();return K.length?K.forEach(pe=>pe(P,F,j)):console.error(P),Promise.reject(P)}function Se(){return ne&&d.value!==St?Promise.resolve():new Promise((P,F)=>{we.add([P,F])})}function yt(P){return ne||(ne=!P,De(),we.list().forEach(([F,j])=>P?j(P):F()),we.reset()),P}function nt(P,F,j,K){const{scrollBehavior:pe}=e;if(!wn||!pe)return Promise.resolve();const f=!j&&t1(Ls(P.fullPath,0))||(K||!j)&&history.state&&history.state.scroll||null;return Ct().then(()=>pe(P,F,f)).then(b=>b&&Yv(b)).catch(b=>U(b,P,F))}const Me=P=>o.go(P);let Ke;const Dt=new Set,Lt={currentRoute:d,listening:!0,addRoute:_,removeRoute:g,hasRoute:w,getRoutes:E,resolve:y,options:e,push:I,replace:M,go:Me,back:()=>Me(-1),forward:()=>Me(1),beforeEach:l.add,beforeResolve:s.add,afterEach:c.add,onError:z.add,isReady:Se,install(P){const F=this;P.component("RouterLink",j1),P.component("RouterView",qc),P.config.globalProperties.$router=F,Object.defineProperty(P.config.globalProperties,"$route",{enumerable:!0,get:()=>vn(d)}),wn&&!Ke&&d.value===St&&(Ke=!0,I(o.location).catch(pe=>{}));const j={};for(const pe in St)Object.defineProperty(j,pe,{get:()=>d.value[pe],enumerable:!0});P.provide(Do,F),P.provide(ll,wi(j)),P.provide(yr,d);const K=P.unmount;Dt.add(P),P.unmount=function(){Dt.delete(P),Dt.size<1&&(u=St,te&&te(),te=null,d.value=St,Ke=!1,ne=!1),K()}}};function Ve(P){return P.reduce((F,j)=>F.then(()=>x(j)),Promise.resolve())}return Lt}function Q1(e,t){const n=[],a=[],o=[],l=Math.max(t.matched.length,e.matched.length);for(let s=0;s<l;s++){const c=t.matched[s];c&&(e.matched.find(u=>$n(u,c))?a.push(c):n.push(c));const d=e.matched[s];d&&(t.matched.find(u=>$n(u,d))||o.push(d))}return[n,a,o]}function Ne(){return me(Do)}function kt(){return me(ll)}var Qe=Uint8Array,Pn=Uint16Array,F1=Int32Array,Cc=new Qe([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Mc=new Qe([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),H1=new Qe([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),jc=function(e,t){for(var n=new Pn(31),a=0;a<31;++a)n[a]=t+=1<<e[a-1];for(var o=new F1(n[30]),a=1;a<30;++a)for(var l=n[a];l<n[a+1];++l)o[l]=l-n[a]<<5|a;return{b:n,r:o}},Jc=jc(Cc,2),Bc=Jc.b,z1=Jc.r;Bc[28]=258,z1[258]=28;var U1=jc(Mc,0),W1=U1.b,Ar=new Pn(32768);for(var Le=0;Le<32768;++Le){var Qt=(Le&43690)>>1|(Le&21845)<<1;Qt=(Qt&52428)>>2|(Qt&13107)<<2,Qt=(Qt&61680)>>4|(Qt&3855)<<4,Ar[Le]=((Qt&65280)>>8|(Qt&255)<<8)>>1}var va=function(e,t,n){for(var a=e.length,o=0,l=new Pn(t);o<a;++o)e[o]&&++l[e[o]-1];var s=new Pn(t);for(o=1;o<t;++o)s[o]=s[o-1]+l[o-1]<<1;var c;if(n){c=new Pn(1<<t);var d=15-t;for(o=0;o<a;++o)if(e[o])for(var u=o<<4|e[o],p=t-e[o],h=s[e[o]-1]++<<p,m=h|(1<<p)-1;h<=m;++h)c[Ar[h]>>d]=u}else for(c=new Pn(a),o=0;o<a;++o)e[o]&&(c[o]=Ar[s[e[o]-1]++]>>15-e[o]);return c},Pa=new Qe(288);for(var Le=0;Le<144;++Le)Pa[Le]=8;for(var Le=144;Le<256;++Le)Pa[Le]=9;for(var Le=256;Le<280;++Le)Pa[Le]=7;for(var Le=280;Le<288;++Le)Pa[Le]=8;var Nc=new Qe(32);for(var Le=0;Le<32;++Le)Nc[Le]=5;var G1=va(Pa,9,1),K1=va(Nc,5,1),Go=function(e){for(var t=e[0],n=1;n<e.length;++n)e[n]>t&&(t=e[n]);return t},ht=function(e,t,n){var a=t/8|0;return(e[a]|e[a+1]<<8)>>(t&7)&n},Ko=function(e,t){var n=t/8|0;return(e[n]|e[n+1]<<8|e[n+2]<<16)>>(t&7)},X1=function(e){return(e+7)/8|0},sl=function(e,t,n){return(t==null||t<0)&&(t=0),(n==null||n>e.length)&&(n=e.length),new Qe(e.subarray(t,n))},Z1=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],rt=function(e,t,n){var a=new Error(t||Z1[e]);if(a.code=e,Error.captureStackTrace&&Error.captureStackTrace(a,rt),!n)throw a;return a},Y1=function(e,t,n,a){var o=e.length,l=a?a.length:0;if(!o||t.f&&!t.l)return n||new Qe(0);var s=!n,c=s||t.i!=2,d=t.i;s&&(n=new Qe(o*3));var u=function(pe){var f=n.length;if(pe>f){var b=new Qe(Math.max(f*2,pe));b.set(n),n=b}},p=t.f||0,h=t.p||0,m=t.b||0,_=t.l,g=t.d,E=t.m,w=t.n,y=o*8;do{if(!_){p=ht(e,h,1);var T=ht(e,h+1,3);if(h+=3,T)if(T==1)_=G1,g=K1,E=9,w=5;else if(T==2){var O=ht(e,h,31)+257,G=ht(e,h+10,15)+4,$=O+ht(e,h+5,31)+1;h+=14;for(var x=new Qe($),J=new Qe(19),X=0;X<G;++X)J[H1[X]]=ht(e,h+X*3,7);h+=G*3;for(var N=Go(J),te=(1<<N)-1,De=va(J,N,1),X=0;X<$;){var we=De[ht(e,h,te)];h+=we&15;var k=we>>4;if(k<16)x[X++]=k;else{var z=0,ne=0;for(k==16?(ne=3+ht(e,h,3),h+=2,z=x[X-1]):k==17?(ne=3+ht(e,h,7),h+=3):k==18&&(ne=11+ht(e,h,127),h+=7);ne--;)x[X++]=z}}var U=x.subarray(0,O),Se=x.subarray(O);E=Go(U),w=Go(Se),_=va(U,E,1),g=va(Se,w,1)}else rt(1);else{var k=X1(h)+4,I=e[k-4]|e[k-3]<<8,M=k+I;if(M>o){d&&rt(0);break}c&&u(m+I),n.set(e.subarray(k,M),m),t.b=m+=I,t.p=h=M*8,t.f=p;continue}if(h>y){d&&rt(0);break}}c&&u(m+131072);for(var yt=(1<<E)-1,nt=(1<<w)-1,Me=h;;Me=h){var z=_[Ko(e,h)&yt],Ke=z>>4;if(h+=z&15,h>y){d&&rt(0);break}if(z||rt(2),Ke<256)n[m++]=Ke;else if(Ke==256){Me=h,_=null;break}else{var Dt=Ke-254;if(Ke>264){var X=Ke-257,Lt=Cc[X];Dt=ht(e,h,(1<<Lt)-1)+Bc[X],h+=Lt}var Ve=g[Ko(e,h)&nt],P=Ve>>4;Ve||rt(3),h+=Ve&15;var Se=W1[P];if(P>3){var Lt=Mc[P];Se+=Ko(e,h)&(1<<Lt)-1,h+=Lt}if(h>y){d&&rt(0);break}c&&u(m+131072);var F=m+Dt;if(m<Se){var j=l-Se,K=Math.min(Se,F);for(j+m<0&&rt(3);m<K;++m)n[m]=a[j+m]}for(;m<F;++m)n[m]=n[m-Se]}}t.l=_,t.p=Me,t.b=m,t.f=p,_&&(p=1,t.m=E,t.d=g,t.n=w)}while(!p);return m!=n.length&&s?sl(n,0,m):n.subarray(0,m)},e2=new Qe(0),t2=function(e,t){return((e[0]&15)!=8||e[0]>>4>7||(e[0]<<8|e[1])%31)&&rt(6,"invalid zlib data"),(e[1]>>5&1)==+!t&&rt(6,"invalid zlib data: "+(e[1]&32?"need":"unexpected")+" dictionary"),(e[1]>>3&4)+2};function n2(e,t){return Y1(e.subarray(t2(e,t&&t.dictionary),-4),{i:2},t&&t.out,t&&t.dictionary)}var Cs=typeof TextEncoder<"u"&&new TextEncoder,wr=typeof TextDecoder<"u"&&new TextDecoder,a2=0;try{wr.decode(e2,{stream:!0}),a2=1}catch{}var o2=function(e){for(var t="",n=0;;){var a=e[n++],o=(a>127)+(a>223)+(a>239);if(n+o>e.length)return{s:t,r:sl(e,n-1)};o?o==3?(a=((a&15)<<18|(e[n++]&63)<<12|(e[n++]&63)<<6|e[n++]&63)-65536,t+=String.fromCharCode(55296|a>>10,56320|a&1023)):o&1?t+=String.fromCharCode((a&31)<<6|e[n++]&63):t+=String.fromCharCode((a&15)<<12|(e[n++]&63)<<6|e[n++]&63):t+=String.fromCharCode(a)}};function r2(e,t){if(t){for(var n=new Qe(e.length),a=0;a<e.length;++a)n[a]=e.charCodeAt(a);return n}if(Cs)return Cs.encode(e);for(var o=e.length,l=new Qe(e.length+(e.length>>1)),s=0,c=function(p){l[s++]=p},a=0;a<o;++a){if(s+5>l.length){var d=new Qe(s+8+(o-a<<1));d.set(l),l=d}var u=e.charCodeAt(a);u<128||t?c(u):u<2048?(c(192|u>>6),c(128|u&63)):u>55295&&u<57344?(u=65536+(u&1047552)|e.charCodeAt(++a)&1023,c(240|u>>18),c(128|u>>12&63),c(128|u>>6&63),c(128|u&63)):(c(224|u>>12),c(128|u>>6&63),c(128|u&63))}return sl(l,0,s)}function l2(e,t){if(t){for(var n="",a=0;a<e.length;a+=16384)n+=String.fromCharCode.apply(null,e.subarray(a,a+16384));return n}else{if(wr)return wr.decode(e);var o=o2(e),l=o.s,n=o.r;return n.length&&rt(8),l}}const re=({name:e="",color:t="currentColor"},{slots:n})=>{var a;return i("svg",{xmlns:"http://www.w3.org/2000/svg",class:["icon",`${e}-icon`],viewBox:"0 0 1024 1024",fill:t,"aria-label":`${e} icon`},(a=n.default)==null?void 0:a.call(n))};re.displayName="IconBase";const $c=({size:e=48,stroke:t=4,wrapper:n=!0,height:a=2*e})=>{const o=i("svg",{xmlns:"http://www.w3.org/2000/svg",width:e,height:e,preserveAspectRatio:"xMidYMid",viewBox:"25 25 50 50"},[i("animateTransform",{attributeName:"transform",type:"rotate",dur:"2s",keyTimes:"0;1",repeatCount:"indefinite",values:"0;360"}),i("circle",{cx:"50",cy:"50",r:"20",fill:"none",stroke:"currentColor","stroke-width":t,"stroke-linecap":"round"},[i("animate",{attributeName:"stroke-dasharray",dur:"1.5s",keyTimes:"0;0.5;1",repeatCount:"indefinite",values:"1,200;90,200;1,200"}),i("animate",{attributeName:"stroke-dashoffset",dur:"1.5s",keyTimes:"0;0.5;1",repeatCount:"indefinite",values:"0;-35px;-125px"})])]);return n?i("div",{class:"loading-icon-wrapper",style:`display:flex;align-items:center;justify-content:center;height:${a}px`},o):o};$c.displayName="LoadingIcon";const Qc=(e,{slots:t})=>{var n;return(n=t.default)==null?void 0:n.call(t)},s2=e=>[/\((ipad);[-\w),; ]+apple/i,/applecoremedia\/[\w.]+ \((ipad)/i,/\b(ipad)\d\d?,\d\d?[;\]].+ios/i].some(t=>t.test(e)),i2=e=>[/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,/cfnetwork\/.+darwin/i].some(t=>t.test(e)),c2=e=>[/(mac os x) ?([\w. ]*)/i,/(macintosh|mac_powerpc\b)(?!.+haiku)/i].some(t=>t.test(e)),il=(e="")=>{if(e){if(typeof e=="number")return new Date(e);const t=Date.parse(e.toString());if(!Number.isNaN(t))return new Date(t)}return null},Po=(e,t)=>{let n=1;for(let a=0;a<e.length;a++)n+=e.charCodeAt(a),n+=n<<10,n^=n>>6;return n+=n<<3,n^=n>>11,n%t},Fc=Array.isArray,u2=e=>typeof e=="function",d2=e=>typeof e=="string";var cl=e=>/^(https?:)?\/\//.test(e),p2=/.md((\?|#).*)?$/,v2=(e,t="/")=>!!(cl(e)||e.startsWith("/")&&!e.startsWith(t)&&!p2.test(e)),Hc=e=>Object.prototype.toString.call(e)==="[object Object]";function h2(){const e=H(!1);return Xn()&&fe(()=>{e.value=!0}),e}function m2(e){return h2(),L(()=>!!e())}const Xo=e=>typeof e=="number",qt=e=>typeof e=="string",en=(e,t)=>qt(e)&&e.startsWith(t),Ln=(e,t)=>qt(e)&&e.endsWith(t),fn=Object.entries,_2=Object.fromEntries,Ge=Object.keys,f2=e=>(e.endsWith(".md")&&(e=`${e.slice(0,-3)}.html`),!e.endsWith("/")&&!e.endsWith(".html")&&(e=`${e}.html`),e=e.replace(/(^|\/)(?:README|index).html$/i,"$1"),e),zc=e=>{const[t,n=""]=e.split("#");return t?`${f2(t)}${n?`#${n}`:""}`:e},Ms=e=>Hc(e)&&qt(e.name),ya=(e,t=!1)=>e?Fc(e)?e.map(n=>qt(n)?{name:n}:Ms(n)?n:null).filter(n=>n!==null):qt(e)?[{name:e}]:Ms(e)?[e]:(console.error(`Expect "author" to be \`AuthorInfo[] | AuthorInfo | string[] | string ${t?"":"| false"} | undefined\`, but got`,e),[]):[],Uc=(e,t)=>{if(e){if(Fc(e)&&e.every(qt))return e;if(qt(e))return[e];console.error(`Expect ${t||"value"} to be \`string[] | string | undefined\`, but got`,e)}return[]},Wc=e=>Uc(e,"category"),Gc=e=>Uc(e,"tag"),Ra=e=>en(e,"/");let g2=class{constructor(){this.messageElements={};const t="message-container",n=document.getElementById(t);n?this.containerElement=n:(this.containerElement=document.createElement("div"),this.containerElement.id=t,document.body.appendChild(this.containerElement))}pop(t,n=2e3){const a=document.createElement("div"),o=Date.now();return a.className="message move-in",a.innerHTML=t,this.containerElement.appendChild(a),this.messageElements[o]=a,n>0&&setTimeout(()=>{this.close(o)},n),o}close(t){if(t){const n=this.messageElements[t];n.classList.remove("move-in"),n.classList.add("move-out"),n.addEventListener("animationend",()=>{n.remove(),delete this.messageElements[t]})}else Ge(this.messageElements).forEach(n=>this.close(Number(n)))}destroy(){document.body.removeChild(this.containerElement)}};const Kc=/#.*$/u,b2=e=>{const t=Kc.exec(e);return t?t[0]:""},js=e=>decodeURI(e).replace(Kc,"").replace(/(index)?\.html$/i,"").replace(/(README|index)?\.md$/i,""),Xc=(e,t)=>{if(t===void 0)return!1;const n=js(e.path),a=js(t),o=b2(t);return o?o===e.hash&&(!a||n===a):n===a},Js=e=>{const t=atob(e);return l2(n2(r2(t,!0)))},E2=e=>cl(e)?e:`https://github.com/${e}`,Zc=e=>!cl(e)||/github\.com/.test(e)?"GitHub":/bitbucket\.org/.test(e)?"Bitbucket":/gitlab\.com/.test(e)?"GitLab":/gitee\.com/.test(e)?"Gitee":null,Fn=(e,...t)=>{const n=e.resolve(...t),a=n.matched[n.matched.length-1];if(!(a!=null&&a.redirect))return n;const{redirect:o}=a,l=u2(o)?o(n):o,s=d2(l)?{path:l}:l;return Fn(e,{hash:n.hash,query:n.query,params:n.params,...s})},k2=e=>{var t;if(!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)&&!e.defaultPrevented&&!(e.button!==void 0&&e.button!==0)&&!(e.currentTarget&&((t=e.currentTarget.getAttribute("target"))!=null&&t.match(/\b_blank\b/i))))return e.preventDefault(),!0},Oe=({to:e="",class:t="",...n},{slots:a})=>{var c;const o=Ne(),l=zc(e),s=(d={})=>k2(d)?o.push(e).catch():Promise.resolve();return i("a",{...n,class:["vp-link",t],href:en(l,"/")?Ae(l):l,onClick:s},(c=a.default)==null?void 0:c.call(a))};Oe.displayName="VPLink";const Yc=()=>i(re,{name:"github"},()=>i("path",{d:"M511.957 21.333C241.024 21.333 21.333 240.981 21.333 512c0 216.832 140.544 400.725 335.574 465.664 24.49 4.395 32.256-10.07 32.256-23.083 0-11.69.256-44.245 0-85.205-136.448 29.61-164.736-64.64-164.736-64.64-22.315-56.704-54.4-71.765-54.4-71.765-44.587-30.464 3.285-29.824 3.285-29.824 49.195 3.413 75.179 50.517 75.179 50.517 43.776 75.008 114.816 53.333 142.762 40.79 4.523-31.66 17.152-53.377 31.19-65.537-108.971-12.458-223.488-54.485-223.488-242.602 0-53.547 19.114-97.323 50.517-131.67-5.035-12.33-21.93-62.293 4.779-129.834 0 0 41.258-13.184 134.912 50.346a469.803 469.803 0 0 1 122.88-16.554c41.642.213 83.626 5.632 122.88 16.554 93.653-63.488 134.784-50.346 134.784-50.346 26.752 67.541 9.898 117.504 4.864 129.834 31.402 34.347 50.474 78.123 50.474 131.67 0 188.586-114.73 230.016-224.042 242.09 17.578 15.232 33.578 44.672 33.578 90.454v135.85c0 13.142 7.936 27.606 32.854 22.87C862.25 912.597 1002.667 728.747 1002.667 512c0-271.019-219.648-490.667-490.71-490.667z"}));Yc.displayName="GitHubIcon";const eu=()=>i(re,{name:"gitlab"},()=>i("path",{d:"M229.333 78.688C223.52 62 199.895 62 193.895 78.688L87.958 406.438h247.5c-.188 0-106.125-327.75-106.125-327.75zM33.77 571.438c-4.875 15 .563 31.687 13.313 41.25l464.812 345L87.77 406.438zm301.5-165 176.813 551.25 176.812-551.25zm655.125 165-54-165-424.312 551.25 464.812-345c12.938-9.563 18.188-26.25 13.5-41.25zM830.27 78.688c-5.812-16.688-29.437-16.688-35.437 0l-106.125 327.75h247.5z"}));eu.displayName="GitLabIcon";const tu=()=>i(re,{name:"gitee"},()=>i("path",{d:"M512 992C246.92 992 32 777.08 32 512S246.92 32 512 32s480 214.92 480 480-214.92 480-480 480zm242.97-533.34H482.39a23.7 23.7 0 0 0-23.7 23.7l-.03 59.28c0 13.08 10.59 23.7 23.7 23.7h165.96a23.7 23.7 0 0 1 23.7 23.7v11.85a71.1 71.1 0 0 1-71.1 71.1H375.71a23.7 23.7 0 0 1-23.7-23.7V423.11a71.1 71.1 0 0 1 71.1-71.1h331.8a23.7 23.7 0 0 0 23.7-23.7l.06-59.25a23.73 23.73 0 0 0-23.7-23.73H423.11a177.78 177.78 0 0 0-177.78 177.75v331.83c0 13.08 10.62 23.7 23.7 23.7h349.62a159.99 159.99 0 0 0 159.99-159.99V482.33a23.7 23.7 0 0 0-23.7-23.7z"}));tu.displayName="GiteeIcon";const nu=()=>i(re,{name:"bitbucket"},()=>i("path",{d:"M575.256 490.862c6.29 47.981-52.005 85.723-92.563 61.147-45.714-20.004-45.714-92.562-1.133-113.152 38.29-23.442 93.696 7.424 93.696 52.005zm63.451-11.996c-10.276-81.152-102.29-134.839-177.152-101.156-47.433 21.138-79.433 71.424-77.129 124.562 2.853 69.705 69.157 126.866 138.862 120.576S647.3 548.571 638.708 478.83zm136.558-309.723c-25.161-33.134-67.986-38.839-105.728-45.13-106.862-17.151-216.576-17.7-323.438 1.134-35.438 5.706-75.447 11.996-97.719 43.996 36.572 34.304 88.576 39.424 135.424 45.129 84.553 10.862 171.447 11.447 256 .585 47.433-5.705 99.987-10.276 135.424-45.714zm32.585 591.433c-16.018 55.99-6.839 131.438-66.304 163.986-102.29 56.576-226.304 62.867-338.87 42.862-59.43-10.862-129.135-29.696-161.72-85.723-14.3-54.858-23.442-110.848-32.585-166.84l3.438-9.142 10.276-5.157c170.277 112.567 408.576 112.567 579.438 0 26.844 8.01 6.84 40.558 6.29 60.014zm103.424-549.157c-19.42 125.148-41.728 249.71-63.415 374.272-6.29 36.572-41.728 57.162-71.424 72.558-106.862 53.724-231.424 62.866-348.562 50.286-79.433-8.558-160.585-29.696-225.134-79.433-30.28-23.443-30.28-63.415-35.986-97.134-20.005-117.138-42.862-234.277-57.161-352.585 6.839-51.42 64.585-73.728 107.447-89.71 57.16-21.138 118.272-30.866 178.87-36.571 129.134-12.58 261.157-8.01 386.304 28.562 44.581 13.13 92.563 31.415 122.844 69.705 13.714 17.7 9.143 40.01 6.29 60.014z"}));nu.displayName="BitbucketIcon";const au=()=>i(re,{name:"source"},()=>i("path",{d:"M601.92 475.2c0 76.428-8.91 83.754-28.512 99.594-14.652 11.88-43.956 14.058-78.012 16.434-18.81 1.386-40.392 2.97-62.172 6.534-18.612 2.97-36.432 9.306-53.064 17.424V299.772c37.818-21.978 63.36-62.766 63.36-109.692 0-69.894-56.826-126.72-126.72-126.72S190.08 120.186 190.08 190.08c0 46.926 25.542 87.714 63.36 109.692v414.216c-37.818 21.978-63.36 62.766-63.36 109.692 0 69.894 56.826 126.72 126.72 126.72s126.72-56.826 126.72-126.72c0-31.086-11.286-59.598-29.7-81.576 13.266-9.504 27.522-17.226 39.996-19.206 16.038-2.574 32.868-3.762 50.688-5.148 48.312-3.366 103.158-7.326 148.896-44.55 61.182-49.698 74.25-103.158 75.24-187.902V475.2h-126.72zM316.8 126.72c34.848 0 63.36 28.512 63.36 63.36s-28.512 63.36-63.36 63.36-63.36-28.512-63.36-63.36 28.512-63.36 63.36-63.36zm0 760.32c-34.848 0-63.36-28.512-63.36-63.36s28.512-63.36 63.36-63.36 63.36 28.512 63.36 63.36-28.512 63.36-63.36 63.36zM823.68 158.4h-95.04V63.36h-126.72v95.04h-95.04v126.72h95.04v95.04h126.72v-95.04h95.04z"}));au.displayName="SourceIcon";const ut=(e,t)=>{var a;const n=(a=(t==null?void 0:t._instance)||Xn())==null?void 0:a.appContext.components;return n?e in n||dt(e)in n||wa(dt(e))in n:!1},y2=()=>m2(()=>typeof window<"u"&&window.navigator&&"userAgent"in window.navigator),ou=()=>{const e=y2();return L(()=>e.value&&/\b(?:Android|iPhone)/i.test(navigator.userAgent))},jt=e=>{const t=Et();return L(()=>e[t.value])};function Bs(e,t){var n;const a=je();return Gr(()=>{a.value=e()},{...t,flush:(n=t==null?void 0:t.flush)!=null?n:"sync"}),nn(a)}function Ro(e,t){let n,a,o;const l=H(!0),s=()=>{l.value=!0,o()};ue(e,s,{flush:"sync"});const c=typeof t=="function"?t:t.get,d=typeof t=="function"?void 0:t.set,u=Ri((p,h)=>(a=p,o=h,{get(){return l.value&&(n=c(),l.value=!1),a(),n},set(m){d==null||d(m)}}));return Object.isExtensible(u)&&(u.trigger=s),u}function gn(e){return hi()?(s0(e),!0):!1}function ze(e){return typeof e=="function"?e():vn(e)}const Oa=typeof window<"u"&&typeof document<"u";typeof WorkerGlobalScope<"u"&&globalThis instanceof WorkerGlobalScope;const L2=Object.prototype.toString,A2=e=>L2.call(e)==="[object Object]",tn=()=>{},Ir=w2();function w2(){var e,t;return Oa&&((e=window==null?void 0:window.navigator)==null?void 0:e.userAgent)&&(/iP(ad|hone|od)/.test(window.navigator.userAgent)||((t=window==null?void 0:window.navigator)==null?void 0:t.maxTouchPoints)>2&&/iPad|Macintosh/.test(window==null?void 0:window.navigator.userAgent))}function ul(e,t){function n(...a){return new Promise((o,l)=>{Promise.resolve(e(()=>t.apply(this,a),{fn:t,thisArg:this,args:a})).then(o).catch(l)})}return n}const ru=e=>e();function I2(e,t={}){let n,a,o=tn;const l=c=>{clearTimeout(c),o(),o=tn};return c=>{const d=ze(e),u=ze(t.maxWait);return n&&l(n),d<=0||u!==void 0&&u<=0?(a&&(l(a),a=null),Promise.resolve(c())):new Promise((p,h)=>{o=t.rejectOnCancel?h:p,u&&!a&&(a=setTimeout(()=>{n&&l(n),a=null,p(c())},u)),n=setTimeout(()=>{a&&l(a),a=null,p(c())},d)})}}function T2(e,t=!0,n=!0,a=!1){let o=0,l,s=!0,c=tn,d;const u=()=>{l&&(clearTimeout(l),l=void 0,c(),c=tn)};return h=>{const m=ze(e),_=Date.now()-o,g=()=>d=h();return u(),m<=0?(o=Date.now(),g()):(_>m&&(n||!s)?(o=Date.now(),g()):t&&(d=new Promise((E,w)=>{c=a?w:E,l=setTimeout(()=>{o=Date.now(),s=!0,E(g()),u()},Math.max(0,m-_))})),!n&&!l&&(l=setTimeout(()=>s=!0,m)),s=!1,d)}}function D2(e=ru){const t=H(!0);function n(){t.value=!1}function a(){t.value=!0}const o=(...l)=>{t.value&&e(...l)};return{isActive:nn(t),pause:n,resume:a,eventFilter:o}}function P2(e){let t;function n(){return t||(t=e()),t}return n.reset=async()=>{const a=t;t=void 0,a&&await a},n}function R2(e){return e||Xn()}function O2(...e){if(e.length!==1)return Gn(...e);const t=e[0];return typeof t=="function"?nn(Ri(()=>({get:t,set:tn}))):H(t)}function S2(e,t=200,n={}){return ul(I2(t,n),e)}function V2(e,t=200,n=!1,a=!0,o=!1){return ul(T2(t,n,a,o),e)}function x2(e,t,n={}){const{eventFilter:a=ru,...o}=n;return ue(e,ul(a,t),o)}function q2(e,t,n={}){const{eventFilter:a,...o}=n,{eventFilter:l,pause:s,resume:c,isActive:d}=D2(a);return{stop:x2(e,t,{...o,eventFilter:l}),pause:s,resume:c,isActive:d}}function Oo(e,t=!0,n){const a=R2(n);a?fe(e,a):t?e():Ct(e)}function C2(e,t,n={}){const{immediate:a=!0}=n,o=H(!1);let l=null;function s(){l&&(clearTimeout(l),l=null)}function c(){o.value=!1,s()}function d(...u){s(),o.value=!0,l=setTimeout(()=>{o.value=!1,l=null,e(...u)},ze(t))}return a&&(o.value=!0,Oa&&d()),gn(c),{isPending:nn(o),start:d,stop:c}}function ho(e=!1,t={}){const{truthyValue:n=!0,falsyValue:a=!1}=t,o=Je(e),l=H(e);function s(c){if(arguments.length)return l.value=c,l.value;{const d=ze(n);return l.value=l.value===d?ze(a):d,l.value}}return o?s:[l,s]}function et(e){var t;const n=ze(e);return(t=n==null?void 0:n.$el)!=null?t:n}const bt=Oa?window:void 0,lu=Oa?window.document:void 0,su=Oa?window.navigator:void 0;function Te(...e){let t,n,a,o;if(typeof e[0]=="string"||Array.isArray(e[0])?([n,a,o]=e,t=bt):[t,n,a,o]=e,!t)return tn;Array.isArray(n)||(n=[n]),Array.isArray(a)||(a=[a]);const l=[],s=()=>{l.forEach(p=>p()),l.length=0},c=(p,h,m,_)=>(p.addEventListener(h,m,_),()=>p.removeEventListener(h,m,_)),d=ue(()=>[et(t),ze(o)],([p,h])=>{if(s(),!p)return;const m=A2(h)?{...h}:h;l.push(...n.flatMap(_=>a.map(g=>c(p,_,g,m))))},{immediate:!0,flush:"post"}),u=()=>{d(),s()};return gn(u),u}let Ns=!1;function M2(e,t,n={}){const{window:a=bt,ignore:o=[],capture:l=!0,detectIframe:s=!1}=n;if(!a)return;Ir&&!Ns&&(Ns=!0,Array.from(a.document.body.children).forEach(m=>m.addEventListener("click",tn)),a.document.documentElement.addEventListener("click",tn));let c=!0;const d=m=>o.some(_=>{if(typeof _=="string")return Array.from(a.document.querySelectorAll(_)).some(g=>g===m.target||m.composedPath().includes(g));{const g=et(_);return g&&(m.target===g||m.composedPath().includes(g))}}),p=[Te(a,"click",m=>{const _=et(e);if(!(!_||_===m.target||m.composedPath().includes(_))){if(m.detail===0&&(c=!d(m)),!c){c=!0;return}t(m)}},{passive:!0,capture:l}),Te(a,"pointerdown",m=>{const _=et(e);c=!d(m)&&!!(_&&!m.composedPath().includes(_))},{passive:!0}),s&&Te(a,"blur",m=>{setTimeout(()=>{var _;const g=et(e);((_=a.document.activeElement)==null?void 0:_.tagName)==="IFRAME"&&!(g!=null&&g.contains(a.document.activeElement))&&t(m)},0)})].filter(Boolean);return()=>p.forEach(m=>m())}function j2(){const e=H(!1);return Xn()&&fe(()=>{e.value=!0}),e}function Sa(e){const t=j2();return L(()=>(t.value,!!e()))}function iu(e,t={}){const{window:n=bt}=t,a=Sa(()=>n&&"matchMedia"in n&&typeof n.matchMedia=="function");let o;const l=H(!1),s=u=>{l.value=u.matches},c=()=>{o&&("removeEventListener"in o?o.removeEventListener("change",s):o.removeListener(s))},d=Gr(()=>{a.value&&(c(),o=n.matchMedia(ze(e)),"addEventListener"in o?o.addEventListener("change",s):o.addListener(s),l.value=o.matches)});return gn(()=>{d(),c(),o=void 0}),l}function $s(e,t={}){const{controls:n=!1,navigator:a=su}=t,o=Sa(()=>a&&"permissions"in a);let l;const s=typeof e=="string"?{name:e}:e,c=H(),d=()=>{l&&(c.value=l.state)},u=P2(async()=>{if(o.value){if(!l)try{l=await a.permissions.query(s),Te(l,"change",d),d()}catch{c.value="prompt"}return l}});return u(),n?{state:c,isSupported:o,query:u}:c}function J2(e={}){const{navigator:t=su,read:n=!1,source:a,copiedDuring:o=1500,legacy:l=!1}=e,s=Sa(()=>t&&"clipboard"in t),c=$s("clipboard-read"),d=$s("clipboard-write"),u=L(()=>s.value||l),p=H(""),h=H(!1),m=C2(()=>h.value=!1,o);function _(){s.value&&c.value!=="denied"?t.clipboard.readText().then(y=>{p.value=y}):p.value=w()}u.value&&n&&Te(["copy","cut"],_);async function g(y=ze(a)){u.value&&y!=null&&(s.value&&d.value!=="denied"?await t.clipboard.writeText(y):E(y),p.value=y,h.value=!0,m.start())}function E(y){const T=document.createElement("textarea");T.value=y??"",T.style.position="absolute",T.style.opacity="0",document.body.appendChild(T),T.select(),document.execCommand("copy"),T.remove()}function w(){var y,T,k;return(k=(T=(y=document==null?void 0:document.getSelection)==null?void 0:y.call(document))==null?void 0:T.toString())!=null?k:""}return{isSupported:u,text:p,copied:h,copy:g}}const Ga=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},Ka="__vueuse_ssr_handlers__",B2=N2();function N2(){return Ka in Ga||(Ga[Ka]=Ga[Ka]||{}),Ga[Ka]}function $2(e,t){return B2[e]||t}function Q2(e){return e==null?"any":e instanceof Set?"set":e instanceof Map?"map":e instanceof Date?"date":typeof e=="boolean"?"boolean":typeof e=="string"?"string":typeof e=="object"?"object":Number.isNaN(e)?"any":"number"}const F2={boolean:{read:e=>e==="true",write:e=>String(e)},object:{read:e=>JSON.parse(e),write:e=>JSON.stringify(e)},number:{read:e=>Number.parseFloat(e),write:e=>String(e)},any:{read:e=>e,write:e=>String(e)},string:{read:e=>e,write:e=>String(e)},map:{read:e=>new Map(JSON.parse(e)),write:e=>JSON.stringify(Array.from(e.entries()))},set:{read:e=>new Set(JSON.parse(e)),write:e=>JSON.stringify(Array.from(e))},date:{read:e=>new Date(e),write:e=>e.toISOString()}},Qs="vueuse-storage";function bn(e,t,n,a={}){var o;const{flush:l="pre",deep:s=!0,listenToStorageChanges:c=!0,writeDefaults:d=!0,mergeDefaults:u=!1,shallow:p,window:h=bt,eventFilter:m,onError:_=x=>{console.error(x)},initOnMounted:g}=a,E=(p?je:H)(typeof t=="function"?t():t);if(!n)try{n=$2("getDefaultStorage",()=>{var x;return(x=bt)==null?void 0:x.localStorage})()}catch(x){_(x)}if(!n)return E;const w=ze(t),y=Q2(w),T=(o=a.serializer)!=null?o:F2[y],{pause:k,resume:I}=q2(E,()=>M(E.value),{flush:l,deep:s,eventFilter:m});return h&&c&&Oo(()=>{Te(h,"storage",$),Te(h,Qs,G),g&&$()}),g||$(),E;function M(x){try{if(x==null)n.removeItem(e);else{const J=T.write(x),X=n.getItem(e);X!==J&&(n.setItem(e,J),h&&h.dispatchEvent(new CustomEvent(Qs,{detail:{key:e,oldValue:X,newValue:J,storageArea:n}})))}}catch(J){_(J)}}function O(x){const J=x?x.newValue:n.getItem(e);if(J==null)return d&&w!=null&&n.setItem(e,T.write(w)),w;if(!x&&u){const X=T.read(J);return typeof u=="function"?u(X,w):y==="object"&&!Array.isArray(X)?{...w,...X}:X}else return typeof J!="string"?J:T.read(J)}function G(x){$(x.detail)}function $(x){if(!(x&&x.storageArea!==n)){if(x&&x.key==null){E.value=w;return}if(!(x&&x.key!==e)){k();try{(x==null?void 0:x.newValue)!==T.write(E.value)&&(E.value=O(x))}catch(J){_(J)}finally{x?Ct(I):I()}}}}}function H2(e){return iu("(prefers-color-scheme: dark)",e)}function z2(e,t,n={}){const{window:a=bt,...o}=n;let l;const s=Sa(()=>a&&"ResizeObserver"in a),c=()=>{l&&(l.disconnect(),l=void 0)},d=L(()=>Array.isArray(e)?e.map(h=>et(h)):[et(e)]),u=ue(d,h=>{if(c(),s.value&&a){l=new ResizeObserver(t);for(const m of h)m&&l.observe(m,o)}},{immediate:!0,flush:"post",deep:!0}),p=()=>{c(),u()};return gn(p),{isSupported:s,stop:p}}function U2(e,t={width:0,height:0},n={}){const{window:a=bt,box:o="content-box"}=n,l=L(()=>{var h,m;return(m=(h=et(e))==null?void 0:h.namespaceURI)==null?void 0:m.includes("svg")}),s=H(t.width),c=H(t.height),{stop:d}=z2(e,([h])=>{const m=o==="border-box"?h.borderBoxSize:o==="content-box"?h.contentBoxSize:h.devicePixelContentBoxSize;if(a&&l.value){const _=et(e);if(_){const g=a.getComputedStyle(_);s.value=Number.parseFloat(g.width),c.value=Number.parseFloat(g.height)}}else if(m){const _=Array.isArray(m)?m:[m];s.value=_.reduce((g,{inlineSize:E})=>g+E,0),c.value=_.reduce((g,{blockSize:E})=>g+E,0)}else s.value=h.contentRect.width,c.value=h.contentRect.height},n);Oo(()=>{const h=et(e);h&&(s.value="offsetWidth"in h?h.offsetWidth:t.width,c.value="offsetHeight"in h?h.offsetHeight:t.height)});const u=ue(()=>et(e),h=>{s.value=h?t.width:0,c.value=h?t.height:0});function p(){d(),u()}return{width:s,height:c,stop:p}}const Fs=["fullscreenchange","webkitfullscreenchange","webkitendfullscreen","mozfullscreenchange","MSFullscreenChange"];function dl(e,t={}){const{document:n=lu,autoExit:a=!1}=t,o=L(()=>{var y;return(y=et(e))!=null?y:n==null?void 0:n.querySelector("html")}),l=H(!1),s=L(()=>["requestFullscreen","webkitRequestFullscreen","webkitEnterFullscreen","webkitEnterFullScreen","webkitRequestFullScreen","mozRequestFullScreen","msRequestFullscreen"].find(y=>n&&y in n||o.value&&y in o.value)),c=L(()=>["exitFullscreen","webkitExitFullscreen","webkitExitFullScreen","webkitCancelFullScreen","mozCancelFullScreen","msExitFullscreen"].find(y=>n&&y in n||o.value&&y in o.value)),d=L(()=>["fullScreen","webkitIsFullScreen","webkitDisplayingFullscreen","mozFullScreen","msFullscreenElement"].find(y=>n&&y in n||o.value&&y in o.value)),u=["fullscreenElement","webkitFullscreenElement","mozFullScreenElement","msFullscreenElement"].find(y=>n&&y in n),p=Sa(()=>o.value&&n&&s.value!==void 0&&c.value!==void 0&&d.value!==void 0),h=()=>u?(n==null?void 0:n[u])===o.value:!1,m=()=>{if(d.value){if(n&&n[d.value]!=null)return n[d.value];{const y=o.value;if((y==null?void 0:y[d.value])!=null)return!!y[d.value]}}return!1};async function _(){if(!(!p.value||!l.value)){if(c.value)if((n==null?void 0:n[c.value])!=null)await n[c.value]();else{const y=o.value;(y==null?void 0:y[c.value])!=null&&await y[c.value]()}l.value=!1}}async function g(){if(!p.value||l.value)return;m()&&await _();const y=o.value;s.value&&(y==null?void 0:y[s.value])!=null&&(await y[s.value](),l.value=!0)}async function E(){await(l.value?_():g())}const w=()=>{const y=m();(!y||y&&h())&&(l.value=y)};return Te(n,Fs,w,!1),Te(()=>et(o),Fs,w,!1),a&&gn(_),{isSupported:p,isFullscreen:l,enter:g,exit:_,toggle:E}}function Zo(e){return typeof Window<"u"&&e instanceof Window?e.document.documentElement:typeof Document<"u"&&e instanceof Document?e.documentElement:e}function m3(e,t,n={}){const{window:a=bt}=n;return bn(e,t,a==null?void 0:a.localStorage,n)}function cu(e){const t=window.getComputedStyle(e);if(t.overflowX==="scroll"||t.overflowY==="scroll"||t.overflowX==="auto"&&e.clientWidth<e.scrollWidth||t.overflowY==="auto"&&e.clientHeight<e.scrollHeight)return!0;{const n=e.parentNode;return!n||n.tagName==="BODY"?!1:cu(n)}}function W2(e){const t=e||window.event,n=t.target;return cu(n)?!1:t.touches.length>1?!0:(t.preventDefault&&t.preventDefault(),!1)}const Xa=new WeakMap;function pl(e,t=!1){const n=H(t);let a=null,o;ue(O2(e),c=>{const d=Zo(ze(c));if(d){const u=d;Xa.get(u)||Xa.set(u,o),n.value&&(u.style.overflow="hidden")}},{immediate:!0});const l=()=>{const c=Zo(ze(e));!c||n.value||(Ir&&(a=Te(c,"touchmove",d=>{W2(d)},{passive:!1})),c.style.overflow="hidden",n.value=!0)},s=()=>{var c;const d=Zo(ze(e));!d||!n.value||(Ir&&(a==null||a()),d.style.overflow=(c=Xa.get(d))!=null?c:"",Xa.delete(d),n.value=!1)};return gn(s),L({get(){return n.value},set(c){c?l():s()}})}function uu(e,t,n={}){const{window:a=bt}=n;return bn(e,t,a==null?void 0:a.sessionStorage,n)}let G2=0;function K2(e,t={}){const n=H(!1),{document:a=lu,immediate:o=!0,manual:l=!1,id:s=`vueuse_styletag_${++G2}`}=t,c=H(e);let d=()=>{};const u=()=>{if(!a)return;const h=a.getElementById(s)||a.createElement("style");h.isConnected||(h.id=s,t.media&&(h.media=t.media),a.head.appendChild(h)),!n.value&&(d=ue(c,m=>{h.textContent=m},{immediate:!0}),n.value=!0)},p=()=>{!a||!n.value||(d(),a.head.removeChild(a.getElementById(s)),n.value=!1)};return o&&!l&&Oo(u),l||gn(p),{id:s,css:c,unload:p,load:u,isLoaded:nn(n)}}function X2(e={}){const{window:t=bt,behavior:n="auto"}=e;if(!t)return{x:H(0),y:H(0)};const a=H(t.scrollX),o=H(t.scrollY),l=L({get(){return a.value},set(c){scrollTo({left:c,behavior:n})}}),s=L({get(){return o.value},set(c){scrollTo({top:c,behavior:n})}});return Te(t,"scroll",()=>{a.value=t.scrollX,o.value=t.scrollY},{capture:!1,passive:!0}),{x:l,y:s}}function Z2(e={}){const{window:t=bt,initialWidth:n=Number.POSITIVE_INFINITY,initialHeight:a=Number.POSITIVE_INFINITY,listenOrientation:o=!0,includeScrollbar:l=!0}=e,s=H(n),c=H(a),d=()=>{t&&(l?(s.value=t.innerWidth,c.value=t.innerHeight):(s.value=t.document.documentElement.clientWidth,c.value=t.document.documentElement.clientHeight))};if(d(),Oo(d),Te("resize",d,{passive:!0}),o){const u=iu("(orientation: portrait)");ue(u,()=>d())}return{width:s,height:c}}const du=({type:e="info",text:t="",vertical:n,color:a},{slots:o})=>{var l;return i("span",{class:["vp-badge",e,{diy:a}],style:{verticalAlign:n??!1,backgroundColor:a??!1}},((l=o.default)==null?void 0:l.call(o))||t)};du.displayName="Badge";var Y2=C({name:"FontIcon",props:{icon:{type:String,default:""},color:{type:String,default:""},size:{type:[String,Number],default:""}},setup(e){const t=L(()=>{const a=["font-icon icon"],o=`iconfont icon-${e.icon}`;return a.push(o),a}),n=L(()=>{const a={};return e.color&&(a.color=e.color),e.size&&(a["font-size"]=Number.isNaN(Number(e.size))?e.size:`${e.size}px`),Ge(a).length?a:null});return()=>e.icon?i("span",{key:e.icon,class:t.value,style:n.value}):null}});const pu=()=>i(re,{name:"back-to-top"},()=>[i("path",{d:"M512 843.2c-36.2 0-66.4-13.6-85.8-21.8-10.8-4.6-22.6 3.6-21.8 15.2l7 102c.4 6.2 7.6 9.4 12.6 5.6l29-22c3.6-2.8 9-1.8 11.4 2l41 64.2c3 4.8 10.2 4.8 13.2 0l41-64.2c2.4-3.8 7.8-4.8 11.4-2l29 22c5 3.8 12.2.6 12.6-5.6l7-102c.8-11.6-11-20-21.8-15.2-19.6 8.2-49.6 21.8-85.8 21.8z"}),i("path",{d:"m795.4 586.2-96-98.2C699.4 172 513 32 513 32S324.8 172 324.8 488l-96 98.2c-3.6 3.6-5.2 9-4.4 14.2L261.2 824c1.8 11.4 14.2 17 23.6 10.8L419 744s41.4 40 94.2 40c52.8 0 92.2-40 92.2-40l134.2 90.8c9.2 6.2 21.6.6 23.6-10.8l37-223.8c.4-5.2-1.2-10.4-4.8-14zM513 384c-34 0-61.4-28.6-61.4-64s27.6-64 61.4-64c34 0 61.4 28.6 61.4 64S547 384 513 384z"})]);pu.displayName="BackToTopIcon";var eh={"/en/":{backToTop:"Back to top"},"/":{backToTop:"返回顶部"}},th=C({name:"BackToTop",props:{threshold:{type:Number,default:100},noProgress:Boolean},setup(e){const t=be(),n=jt(eh),a=je(),{height:o}=U2(a),{height:l}=Z2(),{y:s}=X2(),c=L(()=>t.value.backToTop!==!1&&s.value>e.threshold),d=L(()=>s.value/(o.value-l.value)*100);return fe(()=>{a.value=document.body}),()=>i(Yt,{name:"fade"},()=>c.value?i("button",{type:"button",class:"vp-back-to-top-button","aria-label":n.value.backToTop,"data-balloon-pos":"left",onClick:()=>{window.scrollTo({top:0,behavior:"smooth"})}},[e.noProgress?null:i("span",{class:"vp-scroll-progress",role:"progressbar","aria-labelledby":"loadinglabel","aria-valuenow":d.value},i("svg",i("circle",{cx:"50%",cy:"50%",style:{"stroke-dasharray":`calc(${Math.PI*d.value}% - ${4*Math.PI}px) calc(${Math.PI*100}% - ${4*Math.PI}px)`}}))),i(pu)]):null)}});const nh=pt({enhance:({app:e})=>{ut("Badge")||e.component("Badge",du),ut("FontIcon")||e.component("FontIcon",Y2)},setup:()=>{K2(`@import url("//at.alicdn.com/t/c/font_3921653_dm12jkxmd1c.css");
`)},rootComponents:[()=>i(th,{})]});function ah(e,t,n){var a,o,l;t===void 0&&(t=50),n===void 0&&(n={});var s=(a=n.isImmediate)!=null&&a,c=(o=n.callback)!=null&&o,d=n.maxWait,u=Date.now(),p=[];function h(){if(d!==void 0){var _=Date.now()-u;if(_+t>=d)return d-_}return t}var m=function(){var _=[].slice.call(arguments),g=this;return new Promise(function(E,w){var y=s&&l===void 0;if(l!==void 0&&clearTimeout(l),l=setTimeout(function(){if(l=void 0,u=Date.now(),!s){var k=e.apply(g,_);c&&c(k),p.forEach(function(I){return(0,I.resolve)(k)}),p=[]}},h()),y){var T=e.apply(g,_);return c&&c(T),E(T)}p.push({resolve:E,reject:w})})};return m.cancel=function(_){l!==void 0&&clearTimeout(l),p.forEach(function(g){return(0,g.reject)(_)}),p=[]},m}const oh=({headerLinkSelector:e,headerAnchorSelector:t,delay:n,offset:a=5})=>{const o=Ne(),s=ah(()=>{var E,w;const c=Math.max(window.scrollY,document.documentElement.scrollTop,document.body.scrollTop);if(Math.abs(c-0)<a){Hs(o,"");return}const u=window.innerHeight+c,p=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight),h=Math.abs(p-u)<a,m=Array.from(document.querySelectorAll(e)),g=Array.from(document.querySelectorAll(t)).filter(y=>m.some(T=>T.hash===y.hash));for(let y=0;y<g.length;y++){const T=g[y],k=g[y+1],I=c>=(((E=T.parentElement)==null?void 0:E.offsetTop)??0)-a,M=!k||c<(((w=k.parentElement)==null?void 0:w.offsetTop)??0)-a;if(!(I&&M))continue;const G=decodeURIComponent(o.currentRoute.value.hash),$=decodeURIComponent(T.hash);if(G===$)return;if(h){for(let x=y+1;x<g.length;x++)if(G===decodeURIComponent(g[x].hash))return}Hs(o,$);return}},n);fe(()=>{window.addEventListener("scroll",s)}),Zr(()=>{window.removeEventListener("scroll",s)})},Hs=async(e,t)=>{const{scrollBehavior:n}=e.options;e.options.scrollBehavior=void 0,await e.replace({query:e.currentRoute.value.query,hash:t}).finally(()=>e.options.scrollBehavior=n)},rh=".vp-sidebar-link, .toc-link",lh=".header-anchor",sh=200,ih=5,ch=pt({setup(){oh({headerLinkSelector:rh,headerAnchorSelector:lh,delay:sh,offset:ih})}});let vu=e=>ce(e.title)?{title:e.title}:null;const hu=Symbol(""),uh=e=>{vu=e},dh=()=>me(hu),ph=e=>{e.provide(hu,vu)};var vh={"/en/":{title:"Catalog",empty:"No catalog"},"/":{title:"目录",empty:"暂无目录"}},hh=C({name:"AutoCatalog",props:{base:{type:String,default:""},level:{type:Number,default:3},index:Boolean,hideHeading:Boolean},setup(e){const t=dh(),n=jt(vh),a=ie(),o=Ne(),l=yc(),s=H(o.getRoutes().map(({meta:u,path:p})=>{const h=t(u);if(!h)return null;const m=p.split("/").length;return{level:Ln(p,"/")?m-2:m-1,base:p.replace(/\/[^/]+\/?$/,"/"),path:p,...h}}).filter(u=>Hc(u)&&ce(u.title))),c=()=>{const u=e.base?Pv(pc(e.base)):a.value.path.replace(/\/[^/]+$/,"/"),p=u.split("/").length-2,h=[];return s.value.filter(({level:m,path:_})=>{if(!en(_,u)||_===u)return!1;if(u==="/"){const g=Ge(l.value.locales).filter(E=>E!=="/");if(_==="/404.html"||g.some(E=>en(_,E)))return!1}return m-p<=e.level&&(Ln(_,".html")&&!Ln(_,"/index.html")||Ln(_,"/"))}).sort(({title:m,level:_,path:g,order:E},{title:w,level:y,path:T,order:k})=>_-y||(Ln(g,"/")?-1:Ln(T,"/")?1:Xo(E)?Xo(k)?E>0?k>0?E-k:-1:k<0?E-k:1:E:Xo(k)?k:m.localeCompare(w))).forEach(m=>{var E;const{base:_,level:g}=m;switch(g-p){case 1:h.push(m);break;case 2:{const w=h.find(y=>y.path===_);w&&(w.children??(w.children=[])).push(m);break}default:{const w=h.find(y=>y.path===_.replace(/\/[^/]+\/$/,"/"));if(w){const y=(E=w.children)==null?void 0:E.find(T=>T.path===_);y&&(y.children??(y.children=[])).push(m)}}}}),h},d=L(()=>c());return()=>{const u=d.value.some(p=>p.children);return i("div",{class:["vp-catalog-wrapper",{index:e.index}]},[e.hideHeading?null:i("h2",{class:"vp-catalog-main-title"},n.value.title),d.value.length?i(e.index?"ol":"ul",{class:["vp-catalogs",{deep:u}]},d.value.map(({children:p=[],title:h,path:m,content:_})=>{const g=i(Oe,{class:"vp-catalog-title",to:m},()=>_?i(_):h);return i("li",{class:"vp-catalog"},u?[i("h3",{id:h,class:["vp-catalog-child-title",{"has-children":p.length}]},[i("a",{href:`#${h}`,class:"header-anchor","aria-hidden":!0},"#"),g]),p.length?i(e.index?"ol":"ul",{class:"vp-child-catalogs"},p.map(({children:E=[],content:w,path:y,title:T})=>i("li",{class:"vp-child-catalog"},[i("div",{class:["vp-catalog-sub-title",{"has-children":E.length}]},[i("a",{href:`#${T}`,class:"header-anchor"},"#"),i(Oe,{class:"vp-catalog-title",to:y},()=>w?i(w):T)]),E.length?i(e.index?"ol":"div",{class:e.index?"vp-sub-catalogs":"vp-sub-catalogs-wrapper"},E.map(({content:k,path:I,title:M})=>e.index?i("li",{class:"vp-sub-catalog"},i(Oe,{to:I},()=>k?i(k):M)):i(Oe,{class:"vp-sub-catalog-link",to:I},()=>k?i(k):M))):null]))):null]:i("div",{class:"vp-catalog-child-title"},g))})):i("p",{class:"vp-empty-catalog"},n.value.empty)])}}}),mh=pt({enhance:({app:e})=>{ph(e),ut("AutoCatalog",e)||e.component("AutoCatalog",hh)}});const _h=i("svg",{class:"external-link-icon",xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",focusable:"false",x:"0px",y:"0px",viewBox:"0 0 100 100",width:"15",height:"15"},[i("path",{fill:"currentColor",d:"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"}),i("polygon",{fill:"currentColor",points:"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"})]),mu=C({name:"ExternalLinkIcon",props:{locales:{type:Object,required:!1,default:()=>({})}},setup(e){const t=Et(),n=L(()=>e.locales[t.value]??{openInNewWindow:"open in new window"});return()=>i("span",[_h,i("span",{class:"external-link-icon-sr-only"},n.value.openInNewWindow)])}});var fh={};const gh=fh,bh=pt({enhance({app:e}){e.component("ExternalLinkIcon",i(mu,{locales:gh}))}});/**
 * NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress
 * @license MIT
 */const ve={settings:{minimum:.08,easing:"ease",speed:200,trickle:!0,trickleRate:.02,trickleSpeed:800,barSelector:'[role="bar"]',parent:"body",template:'<div class="bar" role="bar"></div>'},status:null,set:e=>{const t=ve.isStarted();e=Yo(e,ve.settings.minimum,1),ve.status=e===1?null:e;const n=ve.render(!t),a=n.querySelector(ve.settings.barSelector),o=ve.settings.speed,l=ve.settings.easing;return n.offsetWidth,Eh(s=>{Za(a,{transform:"translate3d("+zs(e)+"%,0,0)",transition:"all "+o+"ms "+l}),e===1?(Za(n,{transition:"none",opacity:"1"}),n.offsetWidth,setTimeout(function(){Za(n,{transition:"all "+o+"ms linear",opacity:"0"}),setTimeout(function(){ve.remove(),s()},o)},o)):setTimeout(()=>s(),o)}),ve},isStarted:()=>typeof ve.status=="number",start:()=>{ve.status||ve.set(0);const e=()=>{setTimeout(()=>{ve.status&&(ve.trickle(),e())},ve.settings.trickleSpeed)};return ve.settings.trickle&&e(),ve},done:e=>!e&&!ve.status?ve:ve.inc(.3+.5*Math.random()).set(1),inc:e=>{let t=ve.status;return t?(typeof e!="number"&&(e=(1-t)*Yo(Math.random()*t,.1,.95)),t=Yo(t+e,0,.994),ve.set(t)):ve.start()},trickle:()=>ve.inc(Math.random()*ve.settings.trickleRate),render:e=>{if(ve.isRendered())return document.getElementById("nprogress");Us(document.documentElement,"nprogress-busy");const t=document.createElement("div");t.id="nprogress",t.innerHTML=ve.settings.template;const n=t.querySelector(ve.settings.barSelector),a=e?"-100":zs(ve.status||0),o=document.querySelector(ve.settings.parent);return Za(n,{transition:"all 0 linear",transform:"translate3d("+a+"%,0,0)"}),o!==document.body&&Us(o,"nprogress-custom-parent"),o==null||o.appendChild(t),t},remove:()=>{Ws(document.documentElement,"nprogress-busy"),Ws(document.querySelector(ve.settings.parent),"nprogress-custom-parent");const e=document.getElementById("nprogress");e&&kh(e)},isRendered:()=>!!document.getElementById("nprogress")},Yo=(e,t,n)=>e<t?t:e>n?n:e,zs=e=>(-1+e)*100,Eh=function(){const e=[];function t(){const n=e.shift();n&&n(t)}return function(n){e.push(n),e.length===1&&t()}}(),Za=function(){const e=["Webkit","O","Moz","ms"],t={};function n(s){return s.replace(/^-ms-/,"ms-").replace(/-([\da-z])/gi,function(c,d){return d.toUpperCase()})}function a(s){const c=document.body.style;if(s in c)return s;let d=e.length;const u=s.charAt(0).toUpperCase()+s.slice(1);let p;for(;d--;)if(p=e[d]+u,p in c)return p;return s}function o(s){return s=n(s),t[s]??(t[s]=a(s))}function l(s,c,d){c=o(c),s.style[c]=d}return function(s,c){for(const d in c){const u=c[d];u!==void 0&&Object.prototype.hasOwnProperty.call(c,d)&&l(s,d,u)}}}(),_u=(e,t)=>(typeof e=="string"?e:vl(e)).indexOf(" "+t+" ")>=0,Us=(e,t)=>{const n=vl(e),a=n+t;_u(n,t)||(e.className=a.substring(1))},Ws=(e,t)=>{const n=vl(e);if(!_u(e,t))return;const a=n.replace(" "+t+" "," ");e.className=a.substring(1,a.length-1)},vl=e=>(" "+(e.className||"")+" ").replace(/\s+/gi," "),kh=e=>{e&&e.parentNode&&e.parentNode.removeChild(e)},yh=()=>{fe(()=>{const e=Ne(),t=new Set;t.add(e.currentRoute.value.path),e.beforeEach(n=>{t.has(n.path)||ve.start()}),e.afterEach(n=>{t.add(n.path),ve.done()})})},Lh=pt({setup(){yh()}}),Ah=JSON.parse(`{"encrypt":{"config":{"/guide/encrypt.html":["$2a$10$nsCxodPrJJxcFGryXj2ns.Qtrbb.MaL6IXIjP.o0Ulsv6bsmpSESG"]}},"author":{"name":"gavin-james","url":"http://www.gavin-james.xyz"},"logo":"/logo.svg","repo":"gavin-james/gavin-james.github.io","docsDir":"src","fullscreen":true,"pageInfo":["Author","Original","Date","Category","Tag","ReadingTime"],"blog":{"medias":{"BiliBili":"https://space.bilibili.com/442466482","Gitee":"https://gitee.com/gavin-james","GitHub":"https://github.com/gavin-james","Gitlab":"https://gitlab.com/gavin-james","QQ":"http://wpa.qq.com/msgrd?v=3&uin=2495539878&site=qq&menu=yes"}},"locales":{"/en/":{"lang":"en-US","navbarLocales":{"langName":"English","selectLangAriaLabel":"Select language"},"metaLocales":{"author":"Author","date":"Writing Date","origin":"Original","views":"Page views","category":"Category","tag":"Tag","readingTime":"Reading Time","words":"Words","toc":"On This Page","prev":"Prev","next":"Next","lastUpdated":"Last update","contributors":"Contributors","editLink":"Edit this page on GitHub","print":"Print"},"blogLocales":{"article":"Articles","articleList":"Article List","category":"Category","tag":"Tag","timeline":"Timeline","timelineTitle":"Yesterday Once More!","all":"All","intro":"Personal Intro","star":"Star","empty":"No $text"},"paginationLocales":{"prev":"Prev","next":"Next","navigate":"Jump to","action":"Go","errorText":"Please enter a number between 1 and $page !"},"outlookLocales":{"themeColor":"Theme Color","darkmode":"Theme Mode","fullscreen":"Full Screen"},"encryptLocales":{"iconLabel":"Page Encrypted","placeholder":"Enter password","remember":"Remember password","errorHint":"Please enter the correct password!"},"routeLocales":{"skipToContent":"Skip to main content","notFoundTitle":"Page not found","notFoundMsg":["There’s nothing here.","How did we get here?","That’s a Four-Oh-Four.","Looks like we've got some broken links."],"back":"Go back","home":"Take me home","openInNewWindow":"Open in new window"},"navbar":["/",{"text":"Demo","icon":"discover","link":"/demo/"},{"text":"Posts","icon":"edit","prefix":"/posts/","children":[{"text":"Apple","icon":"edit","prefix":"apple/","children":[{"text":"Apple1","icon":"edit","link":"1"},{"text":"Apple2","icon":"edit","link":"2"},"3","4"]},{"text":"Banana","icon":"edit","prefix":"banana/","children":[{"text":"Banana 1","icon":"edit","link":"1"},{"text":"Banana 2","icon":"edit","link":"2"},"3","4"]},{"text":"Cherry","icon":"edit","link":"cherry"},{"text":"Dragon Fruit","icon":"edit","link":"dragonfruit"},"tomato","strawberry"]},{"text":"V2 Docs","icon":"note","link":"https://theme-hope.vuejs.press/"}],"sidebar":{"/":["",{"icon":"discover","text":"Demo","prefix":"demo/","link":"demo/","children":"structure"},{"text":"Articles","icon":"note","prefix":"posts/","children":"structure"},"intro","slides"]},"footer":"本文章大部分来自pdai:地址https://www.pdai.tech","displayFooter":true,"blog":{"description":"编程之八字真言：1、专2、静3、谦4、筹5、悟6、慎7、透8、恒。","intro":"/intro.html"}},"/":{"lang":"zh-CN","navbarLocales":{"langName":"简体中文","selectLangAriaLabel":"选择语言"},"metaLocales":{"author":"作者","date":"写作日期","origin":"原创","views":"访问量","category":"分类","tag":"标签","readingTime":"阅读时间","words":"字数","toc":"此页内容","prev":"上一页","next":"下一页","lastUpdated":"上次编辑于","contributors":"贡献者","editLink":"在 GitHub 上编辑此页","print":"打印"},"blogLocales":{"article":"文章","articleList":"文章列表","category":"分类","tag":"标签","timeline":"时间轴","timelineTitle":"昨日不在","all":"全部","intro":"个人介绍","star":"收藏","empty":"$text 为空"},"paginationLocales":{"prev":"上一页","next":"下一页","navigate":"跳转到","action":"前往","errorText":"请输入 1 到 $page 之前的页码！"},"outlookLocales":{"themeColor":"主题色","darkmode":"外观","fullscreen":"全屏"},"encryptLocales":{"iconLabel":"文章已加密","placeholder":"输入密码","remember":"记住密码","errorHint":"请输入正确的密码"},"routeLocales":{"skipToContent":"跳至主要內容","notFoundTitle":"页面不存在","notFoundMsg":["这里什么也没有","我们是怎么来到这儿的？","这 是 四 零 四 !","看起来你访问了一个失效的链接"],"back":"返回上一页","home":"带我回家","openInNewWindow":"Open in new window"},"navbar":[{"text":"首页","icon":"homepage","link":"/"},{"text":"导航","icon":"manage_fill","link":"/resource/"},{"text":"Java","icon":"java","prefix":"/java/","children":[{"text":"Java","icon":"language-java","children":[{"text":"java-基础","icon":"edit","link":"basic/java-basic-oop.md"},{"text":"java-集合","icon":"edit","link":"collection/java-collection-all.md"},{"text":"java-并发","icon":"edit","link":"thread/java-thread-x-overview.md"},{"text":"java-IO","icon":"IO","link":"io/java-io-overview.md"},{"text":"java-新特性","icon":"edit","link":"javaup/java-8-up-overview.md"},{"text":"java-JVM","icon":"edit","link":"jvm/java-jvm-x-overview.md"},{"text":"java-其他","icon":"edit","link":"others/awesome-java.md"}]}]},{"text":"数据库","icon":"db","prefix":"/db/","children":[{"text":"数据库基础和原理","children":[{"text":"数据库原理","link":"sql/sql-db.md"},{"text":"SQL语言","link":"sql-lan/sql-lan.md"}]},{"text":"SQL数据库","children":[{"text":"MySQL","icon":"mysql","link":"sql-mysql/sql-mysql-overview.md"},{"text":"Oracle","icon":"oracle","link":"sql-oracle/sql-oracle-overview.md"}]},{"text":"NOSQL数据库","children":[{"text":"Redis","icon":"redis","link":"nosql-redis/db-redis-overview.md"},{"text":"MongoDB","icon":"mongodb","link":"nosql-mongo/mongo.md"},{"text":"ElasticSearch","icon":"elasticsearch","link":"nosql-es/elasticsearch.md"}]}]},{"text":"开发","icon":"shebeikaifa","prefix":"/develop/","children":[{"text":"开发理论与基础","children":[{"text":"开发原则(SOLID)","link":"spec/dev-th-solid.md"},{"text":"分布式理论(CAP)","link":"spec/dev-th-cap.md"},{"text":"分布式理论(BASE)","link":"spec/dev-th-base.md"},{"text":"事务理论(ACID)","link":"spec/dev-th-acid.md"},{"text":"微服务基础(康威定律)","link":"spec/dev-microservice-kangwei.md"},{"text":"常用类详解","link":"package/dev-package-x-overview.md"},{"text":"正则表达式","link":"regex/dev-regex-all.md"},{"text":"CRON表达式","link":"cron/dev-cron-x-usage.md"},{"text":"网络协议和工具","link":"protocol/dev-protocol-overview.md"},{"text":"安全相关","link":"security/dev-security-overview.md"}]},{"text":"开发流程","prefix":"dev-agile/","children":[{"text":"软件生命周期与传统模式","link":"dev-th-waterfall-model.md"},{"text":"结合测试演化的过程模型","link":"dev-th-waterfall-vwxh.md"},{"text":"敏捷开发项目管理理论","link":"dev-th-agile.md"},{"text":"敏捷之极限编程(XP)","link":"dev-th-agile-xp.md"},{"text":"敏捷之Scrum & Kanban","link":"dev-th-agile-scrum.md"},{"text":"敏捷实践之测试驱动开发","link":"dev-pratice-tdd.md"}]},{"text":"质量保障","prefix":"quality-assurance/","children":[{"text":"单元测试","link":"ut/dev-ut-unit-test.md"},{"text":"统一风格","link":"ut/dev-qt-code-style.md"},{"text":"质量管理","link":"ut/dev-qt-sonarlint.md"},{"text":"代码规范","link":"code-style/dev-x-overview.md"}]},{"text":"代码重构","prefix":"refactor/","children":[{"text":"重构技巧相关","link":"dev-refactor-if-else.md"}]},{"text":"设计模式","prefix":"design/","children":[{"text":"设计模式详解","link":"thought.md"}]},{"text":"算法和数据结构","prefix":"algorithms-structures/","children":[{"text":"数据结构","link":"alg-basic/alg-basic-overview.md"},{"text":"常见排序算法","link":"alg-sort/alg-sort-overview.md"},{"text":"算法思想","link":"alg-core/alg-core-overview.md"},{"text":"领域算法","link":"alg-domain/alg-domain-overview.md"},{"text":"其他相关","link":"alg-other/alg-other-mind.md"}]},{"text":"开源协议","prefix":"opensource/","children":[{"text":"常见软件开源协议详解","link":"dev-opensource.md"},{"text":"知识共享许可协议","link":"dev-knowledge.md"},{"text":"国产开源木兰协议","link":"dev-mulan.md"}]},{"text":"系统认证","prefix":"certificate/","children":[{"text":"CMMI 认证","link":"cert-cmm.md"},{"text":"等级保护认证","link":"cert-dengbao.md"},{"text":"ISO27001认证","link":"cert-iso27001.md"}]}]},{"text":"框架","icon":"manage","prefix":"/framework/","children":[{"text":"Spring生态","icon":"spring","children":[{"text":"Spring-Framework","icon":"bxl-spring-boot","link":"spring/01.md"},{"text":"SpringBoot","icon":"bxl-spring-boot","link":"spring/01"},{"text":"SpringCloud","icon":"bxl-spring-boot","link":"spring/01"}]},{"text":"管理","children":[{"text":"Git","icon":"edit","link":"base/01.md"},{"text":"Maven","icon":"edit","link":"base/01.md"},{"text":"Gradle","icon":"edit","link":"base/01.md"}]},{"text":"部署","children":[{"text":"Linux","icon":"","link":"spring/01.md"},{"text":"Docker","icon":"","link":"docker/01.md"},{"text":"Jenkins","icon":"","link":"spring/01.md"}]}]},{"text":"架构","icon":"jiagousheji","prefix":"/framework/","children":[{"text":"管理","children":[{"text":"Git","icon":"edit","link":"base/01.md"},{"text":"Maven","icon":"edit","link":"base/01.md"},{"text":"Gradle","icon":"edit","link":"base/01.md"}]},{"text":"部署","children":[{"text":"Linux","icon":"","link":"spring/01.md"},{"text":"Docker","icon":"","link":"docker/01.md"},{"text":"Jenkins","icon":"","link":"spring/01.md"}]}]},{"text":"工具","icon":"tools","prefix":"/tool/","children":[{"text":"管理","children":[{"text":"Git","icon":"edit","link":"git/overview.md"},{"text":"Maven","icon":"edit","link":"base/01.md"},{"text":"Gradle","icon":"edit","link":"gradle/01.md"}]},{"text":"部署","children":[{"text":"Linux","icon":"","link":"spring/01.md"},{"text":"Docker","icon":"","link":"docker/01.md"},{"text":"Jenkins","icon":"","link":"spring/01.md"}]}]},{"text":"前端","icon":"web3","prefix":"/front/","children":[{"text":"Html","children":[{"text":"Git","icon":"edit","link":"base/01.md"},{"text":"Maven","icon":"edit","link":"base/01.md"},{"text":"Gradle","icon":"edit","link":"base/01.md"}]},{"text":"JavaScript","children":[{"text":"Linux","icon":"","link":"spring/01.md"},{"text":"Docker","icon":"","link":"docker/01.md"},{"text":"Jenkins","icon":"","link":"spring/01.md"}]},{"text":"CSS","children":[{"text":"Linux","icon":"","link":"spring/01.md"},{"text":"Docker","icon":"","link":"docker/01.md"},{"text":"Jenkins","icon":"","link":"spring/01.md"}]},{"text":"React","children":[{"text":"Linux","icon":"","link":"spring/01.md"},{"text":"Docker","icon":"","link":"docker/01.md"},{"text":"Jenkins","icon":"","link":"spring/01.md"}]},{"text":"Vue","children":[{"text":"Linux","icon":"","link":"spring/01.md"},{"text":"Docker","icon":"","link":"docker/01.md"},{"text":"Jenkins","icon":"","link":"spring/01.md"}]},{"text":"UniApp","children":[{"text":"Linux","icon":"","link":"spring/01.md"},{"text":"Docker","icon":"","link":"docker/01.md"},{"text":"Jenkins","icon":"","link":"spring/01.md"}]}]},{"text":"更多","icon":"more","prefix":"/more/","children":[{"text":"管理","children":[{"text":"Git","icon":"edit","link":"base/01.md"},{"text":"Maven","icon":"edit","link":"base/01.md"},{"text":"Gradle","icon":"edit","link":"base/01.md"}]},{"text":"部署","children":[{"text":"Linux","icon":"","link":"spring/01.md"},{"text":"Docker","icon":"","link":"docker/01.md"},{"text":"Jenkins","icon":"","link":"spring/01.md"}]}]},{"text":"关于","icon":"people","prefix":"/about/","children":[{"text":"管理","children":[{"text":"Git","icon":"edit","link":"base/01.md"},{"text":"Maven","icon":"edit","link":"base/01.md"},{"text":"Gradle","icon":"edit","link":"base/01.md"}]},{"text":"部署","children":[{"text":"Linux","icon":"","link":"spring/01.md"},{"text":"Docker","icon":"","link":"docker/01.md"},{"text":"Jenkins","icon":"","link":"spring/01.md"}]}]}],"sidebar":{"/java/":[{"text":"Java基础","prefix":"basic/","collapsible":true,"children":["java-basic-oop","java-basic-lan-basic","java-basic-lan-sum","java-basic-x-generic","java-basic-x-annotation","java-basic-x-exception","java-basic-x-reflection","java-advanced-spi"]},{"text":"Java集合","prefix":"collection/","collapsible":true,"children":["java-collection-all","java-collection-ArrayList","java-collection-LinkedList","java-collection-Queue&Stack","java-collection-PriorityQueue","java-map-HashMap&HashSet","java-map-LinkedHashMap&LinkedHashSet","java-map-TreeMap&TreeSet","java-map-WeakHashMap"]},{"text":"Java多线程与并发","prefix":"thread/","collapsible":true,"children":["java-thread-x-overview","java-thread-x-theorty","java-thread-x-thread-basic","java-thread-x-lock-all","java-thread-x-key-synchronized","java-thread-x-key-volatile","java-thread-x-key-final","java-thread-x-juc-overview","java-thread-x-juc-AtomicInteger","java-thread-x-lock-LockSupport","java-thread-x-lock-AbstractQueuedSynchronizer","java-thread-x-lock-ReentrantLock","java-thread-x-lock-ReentrantReadWriteLock","java-thread-x-juc-collection-ConcurrentHashMap","java-thread-x-juc-collection-CopyOnWriteArrayList","java-thread-x-juc-collection-ConcurrentLinkedQueue","java-thread-x-juc-collection-BlockingQueue","java-thread-x-juc-executor-FutureTask","java-thread-x-juc-executor-ThreadPoolExecutor","java-thread-x-juc-executor-ScheduledThreadPoolExecutor","java-thread-x-juc-executor-ForkJoinPool","java-thread-x-juc-tool-countdownlatch","java-thread-x-juc-tool-cyclicbarrier","java-thread-x-juc-tool-semaphore","java-thread-x-juc-tool-phaser","java-thread-x-juc-tool-exchanger","java-thread-x-threadlocal"]},{"text":"Java IO/NIO/AIO","prefix":"io/","collapsible":true,"children":["java-io-overview","java-io-basic-category","java-io-basic-design-pattern","java-io-basic-code-inputstream","java-io-basic-code-outputstream","java-io-basic-usage","java-io-model","java-io-bio","java-io-nio","java-io-nio-select-epoll","java-io-aio","java-io-nio-netty","java-io-nio-zerocopy"]},{"text":"Java 新特性","prefix":"javaup/","collapsible":true,"children":["java8","java8-stream","java8-optional","java8-default","java8-type-anno","java8-anno-repeat","java8-type","java8-jre","java8-permgen","java8-stampedlock","java8-localdatetime","java8-javafx","java8-others","java-8-up-overview","java9-11","java12-17","java9","java10","java11","java12","java13","java14","java15","java16","java17"]},{"text":"Java JVM","prefix":"jvm/","collapsible":true,"children":["java-jvm-x-overview","java-jvm-class","java-jvm-class-enhancer","java-jvm-classload","java-jvm-struct","java-jvm-x-introduce","java-jvm-jmm","java-jvm-gc","java-jvm-gc-g1","java-jvm-gc-zgc","java-jvm-cms-gc","java-jvm-param","java-jvm-oom","java-jvm-oom-offheap","java-jvm-thread-dump","java-jvm-debug-tools-linux","java-jvm-debug-tools-list","java-jvm-oom-tool","java-jvm-agent-arthas","java-jvm-debug-idea","java-jvm-agent-usage"]},{"text":"Java 其他","prefix":"others/","collapsible":true,"children":["awesome-java","better-java"]}],"/develop/":[{"text":"开发理论与基础","collapsible":true,"children":[{"text":"开发理论","prefix":"spec/","collapsible":true,"children":["dev-x-overview","dev-th-solid","dev-th-cap","dev-th-base","dev-th-acid","dev-microservice-kangwei"]},{"text":"开发常用类库","prefix":"package/","collapsible":true,"children":["dev-package-x-overview","dev-package-x-apache-common","dev-package-x-google-guava","dev-package-x-hu-tool","dev-package-x-spring-util","dev-package-x-log","dev-package-x-json","dev-package-x-lombok","dev-package-x-mapstruct","dev-package-x-others"]},{"text":"正则表达式","prefix":"regex/","collapsible":true,"children":["dev-regex-all","dev-regex-usage","dev-regex-tools"]},{"text":"CRON表达式","prefix":"cron/","collapsible":true,"children":["dev-cron-x-usage","dev-cron-x-tools"]},{"text":"网络协议","prefix":"protocol/","collapsible":true,"children":["dev-protocol-overview","dev-protocol-network-basic","dev-protocol-osi7","dev-protocol-ip","dev-protocol-tcpip","dev-protocol-udp","dev-protocol-http","dev-protocol-dns","dev-protocol-url","dev-protocol-tool-netstat","dev-protocol-tool-tcpdump","dev-protocol-tool-wireshark"]},{"text":"安全相关","prefix":"security/","collapsible":true,"children":["dev-security-overview","dev-security-x-owasp","dev-security-x-injection","dev-security-x-csrf","dev-security-x-xss","dev-security-x-ddos","dev-security-x-click-hijack","dev-security-y-pratice","dev-security-y-pentest-workflow"]}]},{"text":"开发流程","prefix":"dev-agile/","collapsible":true,"children":["dev-x-overview","dev-th-waterfall-model","dev-th-waterfall-vwxh","dev-th-agile","dev-th-agile-xp","dev-th-agile-scrum","dev-th-agile-kanban","dev-pratice-tdd","dev-pratice-ddd","dev-workflow","dev-lean-enterprise"]},{"text":"重构技巧","prefix":"refactor/","collapsible":true,"children":["dev-refactor-if-else","dev-refactor-not-null"]},{"text":"质量保障","prefix":"quality-assurance/","collapsible":true,"children":[{"text":"单元测试","prefix":"ut/","collapsible":true,"children":["dev-qt-overview","dev-ut-unit-test","dev-ut-x-junit","dev-ut-x-junit5","dev-ut-x-mockito","dev-ut-x-junit-idea","dev-ut-springboot2"]},{"text":"统一风格","prefix":"ut/","collapsible":true,"children":["dev-qt-code-style","dev-qt-code-style-2","dev-qt-code-style-1"]},{"text":"代码质量","prefix":"ut/","collapsible":true,"children":["dev-qt-sonarlint","dev-qt-spotbugs"]},{"text":"代码规范","prefix":"code-style/","collapsible":true,"children":["dev-x-overview","code-style-alibaba","code-style-google","code-style-twitter"]}]},{"text":"设计模式","prefix":"design/","collapsible":true,"children":["thought","seven-principles","uml-class-diagram","summary",{"text":"创建型模式","collapsible":true,"children":["single","factory","prototype","builder"]},{"text":"结构型模式","collapsible":true,"children":["adapter","bridge","decorator","composite","facade","flyweight","proxy"]},{"text":"行为型模式","collapsible":true,"children":["template-method","command","visitor","iterator","observer","mediator","memento","interpreter","state","strategy","responsibility"]},"end"]},{"text":"算法和数据结构","collapsible":true,"prefix":"algorithms-structures/","children":[{"text":"数据结构基础","prefix":"alg-basic/","collapsible":true,"children":["alg-basic-overview","alg-basic-array","alg-basic-linklist","alg-basic-hashtable","alg-basic-stack_queue","alg-basic-tree","alg-basic-tree-search","alg-basic-tree-balance","alg-basic-tree-redblack","alg-basic-tree-hafman","alg-basic-tree-trie","alg-basic-graph","alg-basic-graph-bfs-dfs","alg-basic-graph-min-tree","alg-basic-graph-min-distance","alg-basic-graph-topo-sort","alg-basic-graph-aoe"]},{"text":"常见排序算法","prefix":"alg-sort/","collapsible":true,"children":["alg-sort-overview","alg-sort-x-bubble","alg-sort-x-fast","alg-sort-x-insert","alg-sort-x-shell","alg-sort-x-select","alg-sort-x-heap","alg-sort-x-merge","alg-sort-x-bucket","alg-sort-x-radix"]},{"text":"算法思想","prefix":"alg-core/","collapsible":true,"children":["alg-core-overview","alg-core-divide-and-conquer","alg-core-dynamic","alg-core-greedy","alg-core-devide-two","alg-core-search","alg-core-backtracking"]},{"text":"领域算法","prefix":"alg-domain/","collapsible":true,"children":["alg-domain-overview","alg-domain-security-degist","alg-domain-security-secure","alg-domain-security-sm","alg-domain-char-match","alg-domain-char-match-bf","alg-domain-char-match-kmp","alg-domain-char-match-bm","alg-domain-char-match-st","alg-domain-bigdata-overview","alg-domain-bigdata-devide-and-hash","alg-domain-bigdata-bloom-filter","alg-domain-bigdata-bucket","alg-domain-bigdata-db-index","alg-domain-bigdata-outsort","alg-domain-bigdata-map-reduce","alg-domain-distribute-overview","alg-domain-distribute-x-consistency-hash","alg-domain-distribute-x-paxos","alg-domain-distribute-x-raft","alg-domain-distribute-x-zab","alg-domain-id-snowflake","alg-domain-load-balance","alg-domain-suggest","alg-domain-machine"]},{"text":"其他算法相关","collapsible":true,"prefix":"alg-other/","children":["alg-other-mind"]}]},{"text":"开源协议","collapsible":true,"prefix":"opensource/","children":["dev-x-overview","dev-opensource","dev-agpl","dev-knowledge","dev-mulan"]},{"text":"系统认证","collapsible":true,"prefix":"certificate/","children":["dev-x-overview","cert-cmm","cert-dengbao","cert-iso27001"]},{"text":"随手记","collapsible":true,"prefix":"usage/","children":["dev-usage-overview","dev-usage-newObj","dev-usage-exe-package","dev-usage-jar-readfile","dev-usage-input-password","dev-usage-export-pdf","dev-usage-flotjs","dev-usage-zkfinger"]}],"/db/":[{"text":"数据库基础和原理","prefix":"sql/","collapsible":true,"children":["sql-db","sql-db-howitworks","sql-db-theory-concept","sql-db-theory-design","sql-db-theory"]},{"text":"SQL语言","prefix":"sql-lan/","collapsible":true,"children":["sql-lan","sql-lan-pratice","sql-lan-leetcode","sql-lan-optimize"]},{"text":"SQL-MySQL","prefix":"sql-mysql/","collapsible":true,"children":["sql-mysql-overview","sql-mysql-theory","sql-mysql-engine","sql-mysql-b-tree","sql-mysql-performance","sql-mysql-devide","sql-mysql-slave","sql-mysql-mvcc","sql-mysql-execute","sql-mysql-sql-parser","sql-mysql-index-improve-mt","sql-mysql-sql-advisor-mt","sql-mysql-sql-costmodel-mt","sql-mysql-xunjian-mt"]},{"text":"NoSQL-Redis","prefix":"nosql-redis/","collapsible":true,"children":["db-redis-overview","db-redis-introduce","db-redis-data-types","db-redis-data-type-special","db-redis-data-type-stream","db-redis-x-redis-object","db-redis-x-redis-ds","db-redis-data-type-enc","db-redis-x-rdb-aof","db-redis-x-pub-sub","db-redis-x-event","db-redis-x-trans","db-redis-x-copy","db-redis-x-sentinel","db-redis-x-cluster","db-redis-x-cache","db-redis-x-version-lastest","db-redis-y-monitor","db-redis-x-performance","db-redis-y-weibo","db-redis-y-mt-1","db-redis-z-mianshi"]},{"text":"NoSQL-MongoDB","prefix":"nosql-mongo/","collapsible":true,"children":["mongo","mongo-x-basic","mongo-x-ecosystem","mongo-x-usage-1","mongo-x-usage-2","mongo-x-usage-3","mongo-x-usage-4","mongo-x-usage-5","mongo-y-arch","mongo-y-introduce","mongo-y-ds","mongo-y-page","mongo-y-checkpoint","mongo-y-trans","mongo-y-cache","mongo-z-index","mongo-z-rep","mongo-z-sharding","mongo-z-backup","mongo-performance-model","mongo-y-doc","mongo-performance-improve","postgresql-replace"]},{"text":"NoSQL-ElasticSearch","prefix":"nosql-es/","collapsible":true,"children":["elasticsearch","elasticsearch-x-introduce-1","elasticsearch-x-introduce-2","elasticsearch-x-install","elasticsearch-x-usage","elasticsearch-x-index-mapping","elasticsearch-x-index-template","elasticsearch-x-dsl-com","elasticsearch-x-dsl-full-text","elasticsearch-x-dsl-term","elasticsearch-x-agg-bucket","elasticsearch-x-agg-metric","elasticsearch-x-agg-pipeline","elasticsearch-y-th-1","elasticsearch-y-th-2","elasticsearch-y-th-3","elasticsearch-y-th-4","elasticsearch-y-peformance","elasticsearch-z-hello","elasticsearch-z-tencent","elasticsearch-z-meituan","elasticsearch-awesome-es","elasticsearch-wrapper-query","elasticsearch-backup"]}],"/tool/":[{"text":"git基础","prefix":"git/","collapsible":true,"children":["overview"]}]},"footer":"本文章大部分来自pdai:地址https://www.pdai.tech","displayFooter":true,"blog":{"description":"编程之八字真言：1、专2、静3、谦4、筹5、悟6、慎7、透8、恒。","intro":"/intro.html"}}}}`),wh=H(Ah),fu=()=>wh,gu=Symbol(""),Ih=()=>{const e=me(gu);if(!e)throw new Error("useThemeLocaleData() is called without provider.");return e},Th=(e,t)=>{const{locales:n,...a}=e;return{...a,...n==null?void 0:n[t]}},Dh=pt({enhance({app:e}){const t=fu(),n=e._context.provides[ol],a=L(()=>Th(t.value,n.value));e.provide(gu,a),Object.defineProperties(e.config.globalProperties,{$theme:{get(){return t.value}},$themeLocale:{get(){return a.value}}})}});var Ph={"/en/":{copy:"Copy code",copied:"Copied",hint:"Copied successfully"},"/":{copy:"复制代码",copied:"已复制",hint:"复制成功"}},Rh=['.theme-hope-content div[class*="language-"] pre'];const Oh=800,Sh=2e3,Vh=Ph,xh=!1,qh=Rh,Gs=!1,er=new Map,Ch=()=>{const{copy:e}=J2({legacy:!0}),t=jt(Vh),n=ie(),a=ou(),o=c=>{if(!c.hasAttribute("copy-code-registered")){const d=document.createElement("button");d.type="button",d.classList.add("copy-code-button"),d.innerHTML='<div class="copy-icon" />',d.setAttribute("aria-label",t.value.copy),d.setAttribute("data-copied",t.value.copied),c.parentElement&&c.parentElement.insertBefore(d,c),c.setAttribute("copy-code-registered","")}},l=()=>Ct().then(()=>new Promise(c=>{setTimeout(()=>{qh.forEach(d=>{document.querySelectorAll(d).forEach(o)}),c()},Oh)})),s=(c,d,u)=>{let{innerText:p=""}=d;/language-(shellscript|shell|bash|sh|zsh)/.test(c.classList.toString())&&(p=p.replace(/^ *(\$|>) /gm,"")),e(p).then(()=>{u.classList.add("copied"),clearTimeout(er.get(u));const h=setTimeout(()=>{u.classList.remove("copied"),u.blur(),er.delete(u)},Sh);er.set(u,h)})};fe(()=>{(!a.value||Gs)&&l(),Te("click",c=>{const d=c.target;if(d.matches('div[class*="language-"] > button.copy')){const u=d.parentElement,p=d.nextElementSibling;p&&s(u,p,d)}else if(d.matches('div[class*="language-"] div.copy-icon')){const u=d.parentElement,p=u.parentElement,h=u.nextElementSibling;h&&s(p,h,u)}}),ue(()=>n.value.path,()=>{(!a.value||Gs)&&l()})})};var Mh=pt({setup:()=>{Ch()}}),jh={"/en/":{author:"Copyright by :author",license:"License under :license",link:":link"},"/":{author:"著作权归:author所有",license:"基于:license协议",link:"原文链接：:link"}};const tr="http://www.gavin-james.com",Jh=()=>{const e=be(),t=jt(jh),n=ie(),a=L(()=>!!e.value.copy||e.value.copy!==!1&&!0),o=L(()=>Zn(e.value.copy)?e.value.copy:null),l=L(()=>{var h;return((h=o.value)==null?void 0:h.disableCopy)??!1}),s=L(()=>{var h;return a.value?((h=o.value)==null?void 0:h.disableSelection)??!1:!1}),c=L(()=>{var h;return a.value?((h=o.value)==null?void 0:h.maxLength)??0:0}),d=L(()=>{var h;return((h=o.value)==null?void 0:h.triggerLength)??10}),u=()=>{const{author:h="",license:m=""}=n.value.copyright,{author:_,license:g,link:E}=t.value;return[h?_.replace(":author",h):"",m?g.replace(":license",m):"",E.replace(":link",`${wo(an(tr)?tr:`https://${tr}`)}${n.value.path}`)].filter(w=>w).join(`
`)},p=h=>{const m=getSelection();if(m){const _=m.getRangeAt(0);if(a.value){const g=_.toString().length;if(l.value||c.value&&g>c.value)return h.preventDefault();if(g>=d.value){h.preventDefault();const E=u(),w=document.createElement("div");w.appendChild(m.getRangeAt(0).cloneContents()),h.clipboardData&&(h.clipboardData.setData("text/html",`${w.innerHTML}<hr><div class="copyright">${E.replace(/\\n/g,"<br>")}</div>`),h.clipboardData.setData("text/plain",`${m.getRangeAt(0).cloneContents().textContent||""}
------
${E}`))}}}};fe(()=>{const h=document.querySelector("#app");Te(h,"copy",p),Gr(()=>{h.style.userSelect=s.value?"none":"auto"})})};var Bh=pt({setup:()=>{Jh()}});const bu=({active:e=!1},{slots:t})=>{var n;return i("div",{class:["code-group-item",{active:e}],"aria-selected":e},(n=t.default)==null?void 0:n.call(t))};bu.displayName="CodeGroupItem";const Nh=C({name:"CodeGroup",slots:Object,setup(e,{slots:t}){const n=H(-1),a=je([]),o=(c=n.value)=>{n.value=c<a.value.length-1?c+1:0,a.value[n.value].focus()},l=(c=n.value)=>{n.value=c>0?c-1:a.value.length-1,a.value[n.value].focus()},s=(c,d)=>{c.key===" "||c.key==="Enter"?(c.preventDefault(),n.value=d):c.key==="ArrowRight"?(c.preventDefault(),o(d)):c.key==="ArrowLeft"&&(c.preventDefault(),l(d))};return()=>{var d;const c=(((d=t.default)==null?void 0:d.call(t))||[]).filter(u=>u.type.name==="CodeGroupItem").map(u=>(u.props===null&&(u.props={}),u));return c.length===0?null:(n.value<0||n.value>c.length-1?(n.value=c.findIndex(u=>"active"in u.props),n.value===-1&&(n.value=0)):c.forEach((u,p)=>{u.props.active=p===n.value}),i("div",{class:"code-group"},[i("div",{class:"code-group-nav"},c.map((u,p)=>{const h=p===n.value;return i("button",{type:"button",ref:m=>{m&&(a.value[p]=m)},class:["code-group-nav-tab",{active:h}],"aria-pressed":h,"aria-expanded":h,onClick:()=>{n.value=p},onKeydown:m=>s(m,p)},u.props.title)})),c]))}}}),Eu=({title:e,desc:t="",logo:n,background:a,color:o,link:l})=>{const s=[n?i("img",{class:"vp-card-logo",src:Ae(n),loading:"lazy","no-view":""}):null,i("div",{class:"vp-card-content"},[i("div",{class:"vp-card-title",innerHTML:e}),i("hr"),i("div",{class:"vp-card-desc",innerHTML:t})])],c={};return a&&(c.background=a),o&&(c.color=o),l?Ea(l)?i("a",{class:"vp-card",href:l,target:"_blank",style:c},s):i(Oe,{to:l,class:"vp-card",style:c},()=>s):i("div",{class:"vp-card",style:c},s)};Eu.displayName="VPCard";const Ya=bn("VUEPRESS_CODE_TAB_STORE",{});var $h=C({name:"CodeTabs",props:{active:{type:Number,default:0},data:{type:Array,required:!0},id:{type:String,required:!0},tabId:{type:String,default:""}},slots:Object,setup(e,{slots:t}){const n=H(e.active),a=je([]),o=()=>{e.tabId&&(Ya.value[e.tabId]=e.data[n.value].id)},l=(u=n.value)=>{n.value=u<a.value.length-1?u+1:0,a.value[n.value].focus()},s=(u=n.value)=>{n.value=u>0?u-1:a.value.length-1,a.value[n.value].focus()},c=(u,p)=>{u.key===" "||u.key==="Enter"?(u.preventDefault(),n.value=p):u.key==="ArrowRight"?(u.preventDefault(),l()):u.key==="ArrowLeft"&&(u.preventDefault(),s()),e.tabId&&(Ya.value[e.tabId]=e.data[n.value].id)},d=()=>{if(e.tabId){const u=e.data.findIndex(({id:p})=>Ya.value[e.tabId]===p);if(u!==-1)return u}return e.active};return fe(()=>{n.value=d(),ue(()=>Ya.value[e.tabId],(u,p)=>{if(e.tabId&&u!==p){const h=e.data.findIndex(({id:m})=>m===u);h!==-1&&(n.value=h)}})}),()=>e.data.length?i("div",{class:"vp-code-tabs"},[i("div",{class:"vp-code-tabs-nav",role:"tablist"},e.data.map(({id:u},p)=>{const h=p===n.value;return i("button",{type:"button",ref:m=>{m&&(a.value[p]=m)},class:["vp-code-tab-nav",{active:h}],role:"tab","aria-controls":`codetab-${e.id}-${p}`,"aria-selected":h,onClick:()=>{n.value=p,o()},onKeydown:m=>c(m,p)},t[`title${p}`]({value:u,isActive:h}))})),e.data.map(({id:u},p)=>{const h=p===n.value;return i("div",{class:["vp-code-tab",{active:h}],id:`codetab-${e.id}-${p}`,role:"tabpanel","aria-expanded":h},[i("div",{class:"vp-code-tab-title"},t[`title${p}`]({value:u,isActive:h})),t[`tab${p}`]({value:u,isActive:h})])})]):null}});const Qh='<svg class="codepen-icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M123.429 668L468 897.714V692.571L277.143 565.143zM88 585.714L198.286 512 88 438.286v147.428zm468 312L900.571 668 746.857 565.143 556 692.57v205.143zM512 616l155.429-104L512 408 356.571 512zM277.143 458.857L468 331.43V126.286L123.429 356zM825.714 512L936 585.714V438.286zm-78.857-53.143L900.571 356 556 126.286v205.143zM1024 356v312q0 23.429-19.429 36.571l-468 312Q524.571 1024 512 1024t-24.571-7.429l-468-312Q0 691.43 0 668V356q0-23.429 19.429-36.571l468-312Q499.429 0 512 0t24.571 7.429l468 312Q1024 332.57 1024 356z"/></svg>',Fh='<svg class="jsfiddle-icon" viewBox="0 0 1170 1024" xmlns="http://www.w3.org/2000/svg"><path d="M1028.571 441.143q63.429 26.286 102.572 83.143t39.143 126.571q0 93.714-67.429 160.286T940 877.714q-2.286 0-6.571-.285t-6-.286H232q-97.143-5.714-164.571-71.714T0 645.143q0-62.857 31.429-116t84-84q-6.858-22.286-6.858-46.857 0-65.715 46.858-112T269.143 240q54.286 0 98.286 33.143 42.857-88 127.142-141.714t186.572-53.715q94.857 0 174.857 46t126.571 124.857 46.572 172q0 3.429-.286 10.286t-.286 10.286zm-761.142 152q0 69.714 48 110.286T434.286 744q78.285 0 137.143-56.571-9.143-11.429-27.143-32.286t-24.857-28.857q-38.286 37.143-82.286 37.143-31.429 0-53.429-19.143t-22-50q0-30.286 22-49.715T436 525.143q25.143 0 48.286 12T526 568.57t37.143 42.858 39.428 46.857 44 42.857T702 732.57t69.429 12q69.142 0 116.857-40.857T936 594.857q0-69.143-48-109.714T769.714 444.57Q688 444.571 632 500l53.143 61.714q37.714-36.571 81.143-36.571 29.714 0 52.571 18.857t22.857 48q0 32.571-21.143 52.286T766.857 664q-24.571 0-47.143-12t-41.143-31.429-37.428-42.857-39.714-46.857T557.143 488 502 456.571t-67.714-12q-69.715 0-118.286 40.286t-48.571 108.286z"/></svg>',Hh='<svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M512 74.667C270.933 74.667 74.667 270.933 74.667 512S270.933 949.333 512 949.333 949.333 753.067 949.333 512 753.067 74.667 512 74.667zm0 810.666C307.2 885.333 138.667 716.8 138.667 512S307.2 138.667 512 138.667 885.333 307.2 885.333 512 716.8 885.333 512 885.333z"/><path d="M708.267 465.067 473.6 330.667c-8.533-4.267-17.067-6.4-25.6-6.4-29.867 0-53.333 23.466-53.333 53.333v268.8c0 8.533 2.133 19.2 6.4 25.6 10.666 17.067 27.733 27.733 46.933 27.733 8.533 0 17.067-2.133 25.6-6.4l234.667-134.4c8.533-4.266 14.933-10.666 19.2-19.2 6.4-12.8 8.533-27.733 4.266-40.533-2.133-14.933-10.666-25.6-23.466-34.133zM458.667 627.2V396.8L661.333 512 458.667 627.2z"/></svg>';var zh={useBabel:!1,jsLib:[],cssLib:[],codepenLayout:"left",codepenEditors:"101",babel:"https://unpkg.com/@babel/standalone/babel.min.js",vue:"https://unpkg.com/vue/dist/vue.global.prod.js",react:"https://unpkg.com/react/umd/react.production.min.js",reactDOM:"https://unpkg.com/react-dom/umd/react-dom.production.min.js"};const nr=zh,Ks={html:{types:["html","slim","haml","md","markdown","vue"],map:{html:"none",vue:"none",md:"markdown"}},js:{types:["js","javascript","coffee","coffeescript","ts","typescript","ls","livescript"],map:{js:"none",javascript:"none",coffee:"coffeescript",ls:"livescript",ts:"typescript"}},css:{types:["css","less","sass","scss","stylus","styl"],map:{css:"none",styl:"stylus"}}},Uh=(e,t,n)=>{const a=document.createElement(e);return Zn(t)&&Ge(t).forEach(o=>{if(o.indexOf("data"))a[o]=t[o];else{const l=o.replace("data","");a.dataset[l]=t[o]}}),n&&n.forEach(o=>{a.appendChild(o)}),a},hl=e=>({...nr,...e,jsLib:Array.from(new Set([...nr.jsLib||[],...e.jsLib||[]])),cssLib:Array.from(new Set([...nr.cssLib||[],...e.cssLib||[]]))}),Vn=(e,t)=>{if(e[t]!==void 0)return e[t];const n=new Promise(a=>{var l;const o=document.createElement("script");o.src=t,(l=document.querySelector("body"))==null||l.appendChild(o),o.onload=()=>{a()}});return e[t]=n,n},Wh=(e,t)=>{if(t.css&&Array.from(e.childNodes).every(n=>n.nodeName!=="STYLE")){const n=Uh("style",{innerHTML:t.css});e.appendChild(n)}},Gh=(e,t,n)=>{const a=n.getScript();if(a&&Array.from(t.childNodes).every(o=>o.nodeName!=="SCRIPT")){const o=document.createElement("script");o.appendChild(document.createTextNode(`{const document=window.document.querySelector('#${e} .vp-code-demo-display').shadowRoot;
${a}}`)),t.appendChild(o)}},Kh=e=>{const t=Ge(e),n={html:[],js:[],css:[],isLegal:!1};return["html","js","css"].forEach(a=>{const o=t.filter(l=>Ks[a].types.includes(l));if(o.length){const l=o[0];n[a]=[e[l].replace(/^\n|\n$/g,""),Ks[a].map[l]||l]}}),n.isLegal=(!n.html.length||n.html[1]==="none")&&(!n.js.length||n.js[1]==="none")&&(!n.css.length||n.css[1]==="none"),n},ku=e=>e.replace(/<br \/>/g,"<br>").replace(/<((\S+)[^<]*?)\s+\/>/g,"<$1></$2>"),yu=e=>`<div id="app">
${ku(e)}
</div>`,Xh=e=>`${e.replace("export default ","const $reactApp = ").replace(/App\.__style__(\s*)=(\s*)`([\s\S]*)?`/,"")};
ReactDOM.createRoot(document.getElementById("app")).render(React.createElement($reactApp))`,Zh=e=>e.replace(/export\s+default\s*\{(\n*[\s\S]*)\n*\}\s*;?$/u,"Vue.createApp({$1}).mount('#app')").replace(/export\s+default\s*define(Async)?Component\s*\(\s*\{(\n*[\s\S]*)\n*\}\s*\)\s*;?$/u,"Vue.createApp({$1}).mount('#app')").trim(),Lu=e=>`(function(exports){var module={};module.exports=exports;${e};return module.exports.__esModule?module.exports.default:module.exports;})({})`,Yh=(e,t)=>{const n=hl(t),a=e.js[0]||"";return{...n,html:ku(e.html[0]||""),js:a,css:e.css[0]||"",isLegal:e.isLegal,getScript:()=>{var o;return n.useBabel?((o=window.Babel.transform(a,{presets:["es2015"]}))==null?void 0:o.code)||"":a}}},e4=/<template>([\s\S]+)<\/template>/u,t4=/<script(\s*lang=(['"])(.*?)\2)?>([\s\S]+)<\/script>/u,n4=/<style(\s*lang=(['"])(.*?)\2)?\s*(?:scoped)?>([\s\S]+)<\/style>/u,a4=(e,t)=>{const n=hl(t),a=e.html[0]||"",o=e4.exec(a),l=t4.exec(a),s=n4.exec(a),c=o?o[1].replace(/^\n|\n$/g,""):"",[d="",u=""]=l?[l[4].replace(/^\n|\n$/g,""),l[3]]:[],[p="",h=""]=s?[s[4].replace(/^\n|\n$/g,""),s[3]]:[],m=u===""&&(h===""||h==="css");return{...n,html:yu(c),js:Zh(d),css:p,isLegal:m,jsLib:[n.vue,...n.jsLib],getScript:()=>{var g,E;const _=t.useBabel?((E=(g=window.Babel)==null?void 0:g.transform(d,{presets:["es2015"]}))==null?void 0:E.code)||"":d.replace(/export\s+default/u,"return");return`const app=window.document.createElement('div');document.firstElementChild.appendChild(app);const appOptions=${Lu(_)};appOptions.template=\`${c.replace("`",'\\`"')}\`;window.Vue.createApp(appOptions).mount(app);`}}},o4=(e,t)=>{const n=hl(t);return{...n,html:yu(""),js:Xh(e.js[0]||""),css:e.css[0]||(e.js[0]?e.js[0].replace(/App\.__style__(?:\s*)=(?:\s*)`([\s\S]*)?`/,"$1").trim():""),isLegal:e.isLegal,jsLib:[n.react,n.reactDOM,...n.jsLib],jsx:!0,getScript:()=>{var o,l;const a=((l=(o=window.Babel)==null?void 0:o.transform(e.js[0]||"",{presets:["es2015","react"]}))==null?void 0:l.code)||"";return`window.ReactDOM.createRoot(document.firstElementChild).render(window.React.createElement(${Lu(a)}))`}}},xn={},r4=e=>Promise.all([Vn(xn,e.babel),Vn(xn,e.react),Vn(xn,e.reactDOM)]),l4=e=>{const t=[Vn(xn,e.vue)];return e.useBabel&&t.push(Vn(xn,e.babel)),Promise.all(t)},s4=e=>e.useBabel?Vn(xn,e.babel):Promise.resolve();var i4=C({name:"CodeDemo",props:{id:{type:String,required:!0},type:{type:String,default:"normal"},title:{type:String,default:""},config:{type:String,default:""},code:{type:String,required:!0}},slots:Object,setup(e,{slots:t}){const[n,a]=ho(!1),o=je(),l=je(),s=H("0"),c=H(!1),d=L(()=>JSON.parse(e.config?Js(e.config):"{}")),u=L(()=>{const g=JSON.parse(Js(e.code));return Kh(g)}),p=L(()=>e.type==="react"?o4(u.value,d.value):e.type==="vue"?a4(u.value,d.value):Yh(u.value,d.value)),h=L(()=>p.value.isLegal),m=(g=!1)=>{const E=o.value.attachShadow({mode:"open"}),w=document.createElement("div");w.classList.add("code-demo-app"),E.appendChild(w),h.value?(g&&(w.innerHTML=p.value.html),Wh(E,p.value),Gh(e.id,E,p.value),s.value="0"):s.value="auto",c.value=!0},_=()=>{switch(e.type){case"react":return r4(p.value).then(()=>m());case"vue":return l4(p.value).then(()=>m());default:return s4(p.value).then(()=>m(!0))}};return Te("beforeprint",()=>{a(!0)}),fe(()=>{setTimeout(()=>{_()},800)}),()=>{var g;return i("div",{class:"vp-code-demo",id:e.id},[i("div",{class:"vp-code-demo-header"},[p.value.isLegal?i("button",{type:"button",title:"toggle","aria-hidden":!0,class:["vp-code-demo-toggle-button",n.value?"down":"end"],onClick:()=>{s.value=n.value?"0":`${l.value.clientHeight+13.8}px`,a()}}):null,e.title?i("span",{class:"vp-code-demo-title"},decodeURIComponent(e.title)):null,p.value.isLegal&&p.value.jsfiddle!==!1?i("form",{class:"code-demo-jsfiddle",target:"_blank",action:"https://jsfiddle.net/api/post/library/pure/",method:"post"},[i("input",{type:"hidden",name:"html",value:p.value.html}),i("input",{type:"hidden",name:"js",value:p.value.js}),i("input",{type:"hidden",name:"css",value:p.value.css}),i("input",{type:"hidden",name:"wrap",value:"1"}),i("input",{type:"hidden",name:"panel_js",value:"3"}),i("input",{type:"hidden",name:"resources",value:[...p.value.cssLib,...p.value.jsLib].join(",")}),i("button",{type:"submit",class:"jsfiddle-button",innerHTML:Fh,"aria-label":"JSFiddle","data-balloon-pos":"up"})]):null,!p.value.isLegal||p.value.codepen!==!1?i("form",{class:"code-demo-codepen",target:"_blank",action:"https://codepen.io/pen/define",method:"post"},[i("input",{type:"hidden",name:"data",value:JSON.stringify({html:p.value.html,js:p.value.js,css:p.value.css,js_external:p.value.jsLib.join(";"),css_external:p.value.cssLib.join(";"),layout:p.value.codepenLayout,html_pre_processor:u.value?u.value.html[1]:"none",js_pre_processor:u.value?u.value.js[1]:p.value.jsx?"babel":"none",css_pre_processor:u.value?u.value.css[1]:"none",editors:p.value.codepenEditors})}),i("button",{type:"submit",innerHTML:Qh,class:"codepen-button","aria-label":"Codepen","data-balloon-pos":"up"})]):null]),c.value?null:i($c,{class:"vp-code-demo-loading"}),i("div",{ref:o,class:"vp-code-demo-display",style:{display:h.value&&c.value?"block":"none"}}),i("div",{class:"vp-code-demo-code-wrapper",style:{height:s.value}},i("div",{ref:l,class:"vp-code-demo-codes"},(g=t.default)==null?void 0:g.call(t)))])}}}),c4=C({name:"MdDemo",props:{id:{type:String,required:!0},title:{type:String,default:""}},slots:Object,setup(e,{slots:t}){const[n,a]=ho(!1),o=je(),l=H("0");return Te("beforeprint",()=>{a(!0)}),()=>{var s,c;return i("div",{class:"vp-md-demo",id:e.id},[i("div",{class:"vp-md-demo-header"},[i("button",{type:"button",title:"toggle","aria-hidden":!0,class:["vp-md-demo-toggle-button",n.value?"down":"end"],onClick:()=>{l.value=n.value?"0":`${o.value.clientHeight+13.8}px`,a()}}),e.title?decodeURIComponent(e.title):null]),i("div",{class:"vp-md-demo-display"},(s=t.default)==null?void 0:s.call(t)),i("div",{class:"vp-md-demo-code-wrapper",style:{height:l.value}},i("div",{ref:o,class:"vp-md-demo-codes"},(c=t.code)==null?void 0:c.call(t)))])}}});const u4=()=>{Te("beforeprint",()=>{document.querySelectorAll("details").forEach(e=>{e.open=!0})})},Au=({title:e="",link:t})=>i("div",{class:"vp-playground"},[i("div",{class:"vp-playground-header"},[e?i("div",{class:"vp-playground-title"},decodeURIComponent(e)):null,i("div",{class:"vp-playground-actions"},[i("a",{class:"vp-playground-action",href:decodeURIComponent(t),target:"_blank",innerHTML:Hh})])]),i("div",{class:"vp-playground-container"},i("iframe",{src:decodeURIComponent(t)}))]);Au.displayName="Playground";const ar=bn("VUEPRESS_TAB_STORE",{});var d4=C({name:"Tabs",props:{active:{type:Number,default:0},data:{type:Array,required:!0},id:{type:String,required:!0},tabId:{type:String,default:""}},slots:Object,setup(e,{slots:t}){const n=H(e.active),a=je([]),o=()=>{e.tabId&&(ar.value[e.tabId]=e.data[n.value].id)},l=(u=n.value)=>{n.value=u<a.value.length-1?u+1:0,a.value[n.value].focus()},s=(u=n.value)=>{n.value=u>0?u-1:a.value.length-1,a.value[n.value].focus()},c=(u,p)=>{u.key===" "||u.key==="Enter"?(u.preventDefault(),n.value=p):u.key==="ArrowRight"?(u.preventDefault(),l()):u.key==="ArrowLeft"&&(u.preventDefault(),s()),o()},d=()=>{if(e.tabId){const u=e.data.findIndex(({id:p})=>ar.value[e.tabId]===p);if(u!==-1)return u}return e.active};return fe(()=>{n.value=d(),ue(()=>ar.value[e.tabId],(u,p)=>{if(e.tabId&&u!==p){const h=e.data.findIndex(({id:m})=>m===u);h!==-1&&(n.value=h)}})}),()=>e.data.length?i("div",{class:"vp-tabs"},[i("div",{class:"vp-tabs-nav",role:"tablist"},e.data.map(({id:u},p)=>{const h=p===n.value;return i("button",{type:"button",ref:m=>{m&&(a.value[p]=m)},class:["vp-tab-nav",{active:h}],role:"tab","aria-controls":`tab-${e.id}-${p}`,"aria-selected":h,onClick:()=>{n.value=p,o()},onKeydown:m=>c(m,p)},t[`title${p}`]({value:u,isActive:h}))})),e.data.map(({id:u},p)=>{const h=p===n.value;return i("div",{class:["vp-tab",{active:h}],id:`tab-${e.id}-${p}`,role:"tabpanel","aria-expanded":h},[i("div",{class:"vp-tab-title"},t[`title${p}`]({value:u,isActive:h})),t[`tab${p}`]({value:u,isActive:h})])})]):null}});const p4=pt({enhance:({app:e})=>{ut("VPCard",e)||e.component("VPCard",Eu),e.component("CodeTabs",$h),ut("CodeGroup",e)||e.component("CodeGroup",Nh),ut("CodeGroupItem",e)||e.component("CodeGroupItem",bu),e.component("CodeDemo",i4),e.component("MdDemo",c4),e.component("Playground",Au),e.component("Tabs",d4)},setup:()=>{u4()}});let v4={};const wu=Symbol(""),h4=()=>me(wu),m4=e=>{e.provide(wu,v4)};var _4={"/en/":{closeTitle:"Close",downloadTitle:"Download Image",fullscreenTitle:"Switch to full screen",zoomTitle:"Zoom in/out",arrowPrevTitle:"Prev (Arrow Left)",arrowNextTitle:"Next (Arrow Right)"},"/":{closeTitle:"关闭",downloadTitle:"下载图片",fullscreenTitle:"切换全屏",zoomTitle:"缩放",arrowPrevTitle:"上一个 (左箭头)",arrowNextTitle:"下一个 (右箭头)"}};const f4=".theme-hope-content :not(a) > img:not([no-view])",g4=_4,b4=800,E4='<div class="photo-swipe-loading"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" preserveAspectRatio="xMidYMid" viewBox="25 25 50 50"><animateTransform attributeName="transform" type="rotate" dur="2s" keyTimes="0;1" repeatCount="indefinite" values="0;360"></animateTransform><circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"><animate attributeName="stroke-dasharray" dur="1.5s" keyTimes="0;0.5;1" repeatCount="indefinite" values="1,200;90,200;1,200"></animate><animate attributeName="stroke-dashoffset" dur="1.5s" keyTimes="0;0.5;1" repeatCount="indefinite" values="0;-35px;-125px"></animate></circle></svg></div>',k4=e=>ce(e)?Array.from(document.querySelectorAll(e)):e.map(t=>Array.from(document.querySelectorAll(t))).flat(),Iu=e=>new Promise((t,n)=>{e.complete?t({type:"image",element:e,src:e.src,width:e.naturalWidth,height:e.naturalHeight,alt:e.alt,msrc:e.src}):(e.onload=()=>t(Iu(e)),e.onerror=a=>n(a))}),y4=()=>{const e=jt(g4),t=be(),n=ie(),{isSupported:a,toggle:o}=dl(),l=h4();let s;const c=L(()=>t.value.photoSwipe===!1?!1:t.value.photoSwipe||f4),d=p=>{p.on("uiRegister",()=>{a&&p.ui.registerElement({name:"fullscreen",order:7,isButton:!0,html:'<svg class="pswp__icn" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M249.5 270.833H437v-75H212a37.5 37.5 0 0 0-37.5 37.5v225h75v-187.5zm-37.5 600h225v-75H249.5v-187.5h-75v225a37.5 37.5 0 0 0 37.5 37.5zm637.5-37.5v-225h-75v187.5H587v75h225a37.5 37.5 0 0 0 37.5-37.5zM587 270.833h187.5v187.5h75v-225a37.5 37.5 0 0 0-37.5-37.5H587v75z"/></svg>',onClick:()=>{o()}}),p.ui.registerElement({name:"download",order:8,isButton:!0,tagName:"a",html:{isCustomSVG:!0,inner:'<path d="M20.5 14.3 17.1 18V10h-2.2v7.9l-3.4-3.6L10 16l6 6.1 6-6.1-1.5-1.6ZM23 23H9v2h14" id="pswp__icn-download"/>',outlineID:"pswp__icn-download"},onInit:(h,m)=>{h.setAttribute("download",""),h.setAttribute("target","_blank"),h.setAttribute("rel","noopener"),m.on("change",()=>{h.setAttribute("href",m.currSlide.data.src)})}}),p.ui.registerElement({name:"bulletsIndicator",className:"photo-swipe-bullets-indicator",appendTo:"wrapper",onInit:(h,m)=>{const _=[];let g=-1;for(let E=0;E<m.getNumItems();E++){const w=document.createElement("div");w.className="photo-swipe-bullet",w.onclick=y=>{m.goTo(_.indexOf(y.target))},_.push(w),h.appendChild(w)}m.on("change",()=>{g>=0&&_[g].classList.remove("active"),_[m.currIndex].classList.add("active"),g=m.currIndex})}})})},u=async()=>{if(c.value)return Promise.all([r(()=>import("./photoswipe.esm-i2ohwMnJ.js"),__vite__mapDeps([])),Ct().then(()=>new Promise(p=>setTimeout(p,b4)).then(()=>k4(c.value)))]).then(([{default:p},h])=>{const m=h.map(_=>({html:E4,element:_,msrc:_.src}));h.forEach((_,g)=>{const E=()=>{s=new p({preloaderDelay:0,showHideAnimationType:"zoom",...e.value,...l,dataSource:m,index:g,closeOnVerticalDrag:!0,wheelToZoom:!1}),d(s),s.addFilter("thumbEl",()=>_),s.addFilter("placeholderSrc",()=>_.src),s.init()};_.style.cursor="zoom-in",_.addEventListener("click",()=>{E()}),_.addEventListener("keypress",({key:w})=>{w==="Enter"&&E()})}),h.forEach((_,g)=>{Iu(_).then(E=>{m.splice(g,1,E),s==null||s.refreshSlideContent(g)})})})};fe(()=>{Te("wheel",()=>{s==null||s.close()}),ue(()=>n.value.path,u,{immediate:!0})})};var L4=pt({enhance:({app:e})=>{m4(e)},setup:()=>{y4()}}),Xs={"/en/":{word:"About $word words",less1Minute:"Less than 1 minute",time:"About $time min"},"/":{word:"约 $word 字",less1Minute:"小于 1 分钟",time:"大约 $time 分钟"}};const Tu=()=>{const e=ie();return L(()=>e.value.readingTime??null)},Tr=typeof Xs>"u"?null:Xs,Du=(e,t)=>{const{minutes:n,words:a}=e,{less1Minute:o,word:l,time:s}=t;return{time:n<1?o:s.replace("$time",Math.round(n).toString()),words:l.replace("$word",a.toString())}},Zs={words:"",time:""},Pu=()=>Tr?jt(Tr):L(()=>null),A4=()=>{if(typeof Tr>"u")return L(()=>Zs);const e=Tu(),t=Pu();return L(()=>e.value&&t.value?Du(e.value,t.value):Zs)},Jt=()=>fu(),le=()=>Ih(),En=()=>L(()=>!!Jt().value.pure);var Ys=C({name:"EmptyComponent",setup:()=>()=>null});const w4="719px",I4="1440px",T4="false",ml={mobileBreakPoint:w4,pcBreakPoint:I4,enableThemeColor:T4},_l={"/demo/":[],"/posts/":[]},Ru=e=>{const{icon:t="",color:n,size:a}=e,o={};return n&&(o.color=n),a&&(o.height=Number.isNaN(Number(a))?a:`${a}px`),an(t)?i("img",{class:"icon",src:t,"no-view":"",style:o}):Ra(t)?i("img",{class:"icon",src:Ae(t),"aria-hidden":"","no-view":"",style:o}):i(tt("FontIcon"),e)};Ru.displayName="HopeIcon";var Fe=Ru;const Va=()=>{const e=Ne(),t=kt();return n=>{if(n)if(Ra(n))t.path!==n&&e.push(n);else if(vc(n))window&&window.open(n);else{const a=t.path.slice(0,t.path.lastIndexOf("/"));e.push(`${a}/${encodeURI(n)}`)}}},Ou=()=>{const e=le(),t=be();return L(()=>{const{author:n}=t.value;return n?ya(n):n===!1?[]:ya(e.value.author,!1)})},D4=()=>{const e=be();return L(()=>Wc(e.value.category).map(t=>{var n,a;return{name:t,path:((a=(n=me(Symbol.for("categoryMap")))==null?void 0:n.value.map[t])==null?void 0:a.path)||""}}))},P4=()=>{const e=be();return L(()=>Gc(e.value.tag).map(t=>{var n,a;return{name:t,path:((a=(n=me(Symbol.for("tagMap")))==null?void 0:n.value.map[t])==null?void 0:a.path)||""}}))},R4=()=>{const e=be(),t=ie();return L(()=>{const n=il(e.value.date);if(n)return n;const{createdTime:a}=t.value.git||{};return a?new Date(a):null})},O4=()=>{const e=le(),t=ie(),n=be(),a=Ou(),o=D4(),l=P4(),s=R4(),c=Tu(),d=A4(),u=L(()=>({author:a.value,category:o.value,date:s.value,localizedDate:t.value.localizedDate,tag:l.value,isOriginal:n.value.isOriginal||!1,readingTime:c.value,readingTimeLocale:d.value,pageview:"pageview"in n.value?n.value.pageview:!0})),p=L(()=>"pageInfo"in n.value?n.value.pageInfo:"pageInfo"in e.value?e.value.pageInfo:null);return{info:u,items:p}},{mobileBreakPoint:S4,pcBreakPoint:V4}=ml,ei=e=>e.endsWith("px")?Number(e.slice(0,-2)):null,xa=()=>{const e=H(!1),t=H(!1),n=()=>{e.value=window.innerWidth<=(ei(S4)??719),t.value=window.innerWidth>=(ei(V4)??1440)};return fe(()=>{n(),Te("resize",n,!1),Te("orientationchange",n,!1)}),{isMobile:e,isPC:t}},Su=Symbol(""),qa=()=>{const e=me(Su);if(!e)throw new Error("useDarkmode() is called without provider.");return e},x4=e=>{const t=Jt(),n=H2(),a=bn("vuepress-theme-hope-scheme","auto"),o=L(()=>t.value.darkmode||"switch"),l=L(()=>{const c=o.value;return c==="disable"?!1:c==="enable"?!0:c==="auto"?n.value:c==="toggle"?a.value==="dark":a.value==="dark"||a.value==="auto"&&n.value}),s=L(()=>{const c=o.value;return c==="switch"||c==="toggle"});e.provide(Su,{canToggle:s,config:o,isDarkmode:l,status:a}),Object.defineProperties(e.config.globalProperties,{$isDarkmode:{get:()=>l.value}})},q4=()=>{const{isDarkmode:e}=qa(),t=(n=e.value)=>document.documentElement.setAttribute("data-theme",n?"dark":"light");fe(()=>{ue(e,t,{immediate:!0})})};var Ue=C({name:"AutoLink",inheritAttrs:!1,props:{config:{type:Object,required:!0},exact:Boolean,noExternalLinkIcon:Boolean},emits:["focusout"],slots:Object,setup(e,{attrs:t,emit:n,slots:a}){const o=kt(),l=yc(),s=Gn(e,"config"),c=L(()=>an(s.value.link)),d=L(()=>!c.value&&vc(s.value.link)),u=L(()=>s.value.target||(c.value?"_blank":void 0)),p=L(()=>u.value==="_blank"),h=L(()=>!c.value&&!d.value&&!p.value),m=L(()=>s.value.rel||(p.value?"noopener noreferrer":void 0)),_=L(()=>s.value.ariaLabel||s.value.text),g=L(()=>{if(e.exact)return!1;const w=Ge(l.value.locales);return w.length?w.every(y=>y!==s.value.link):s.value.link!=="/"}),E=L(()=>h.value?s.value.activeMatch?new RegExp(s.value.activeMatch).test(o.path):g.value?en(o.path,s.value.link):o.path===s.value.link:!1);return()=>{const{before:w,after:y,default:T}=a,{text:k,icon:I,link:M}=s.value;return h.value?i(Oe,{to:M,"aria-label":_.value,...t,class:["nav-link",{active:E.value},t.class],onFocusout:()=>n("focusout")},()=>T?T():[w?w():i(Fe,{icon:I}),k,y==null?void 0:y()]):i("a",{href:M,rel:m.value,target:u.value,"aria-label":_.value,...t,class:["nav-link",t.class],onFocusout:()=>n("focusout")},T?T():[w?w():i(Fe,{icon:I}),k,e.noExternalLinkIcon?null:i(mu),y==null?void 0:y()])}}});const Hn=(e,t,n=!1)=>"activeMatch"in t?new RegExp(t.activeMatch).test(e.path):Xc(e,t.link)?!0:t.children&&!n?t.children.some(a=>Hn(e,a)):!1,Vu=(e,t)=>t.type==="group"?t.children.some(n=>n.type==="group"?Vu(e,n):n.type==="page"&&Hn(e,n,!0))||"prefix"in t&&Xc(e,t.prefix):!1,xu=(e,t)=>ce(e.link)?i(Ue,{...t,config:e}):i("p",t,[i(Fe,{icon:e.icon}),e.text]),qu=e=>{const t=kt();return e?i("ul",{class:"vp-sidebar-sub-headers"},e.map(n=>i("li",{class:"vp-sidebar-sub-header"},[xu(n,{class:["vp-sidebar-link","vp-heading",{active:Hn(t,n,!0)}]}),qu(n.children)]))):null};var ke=(e=>(e.type="y",e.title="t",e.shortTitle="s",e.icon="i",e.author="a",e.date="d",e.localizedDate="l",e.category="c",e.tag="g",e.isEncrypted="n",e.isOriginal="o",e.readingTime="r",e.excerpt="e",e.sticky="u",e.cover="v",e.index="I",e.order="O",e))(ke||{}),Cu=(e=>(e.article="a",e.home="h",e.slide="s",e.page="p",e))(Cu||{});const dn=(e="",t="")=>Ra(t)?t:`${pc(e)}${t}`,qn=(e,t,n=!1)=>{let a=Fn(e,zc(encodeURI(t)));a.name==="404"&&(a=Fn(e,t));const{fullPath:o,meta:l,name:s}=a;return{text:!n&&l[ke.shortTitle]?l[ke.shortTitle]:l[ke.title]||t,link:s==="404"?t:o,...l[ke.icon]?{icon:l[ke.icon]}:{}}},C4=(e,t)=>{const n=ie();return{type:"heading",text:e.title,link:`${n.value.path}#${e.slug}`,children:fl(e.children,t)}},fl=(e,t)=>t>0?e.map(n=>C4(n,t-1)):[],Mu=e=>{const t=ie();return fl(t.value.headers,e)},Dr=(e,t,n="")=>{const a=Ne(),o=ie(),l=(s,c=n)=>{var u;const d=ce(s)?qn(a,dn(c,s)):s.link?{...s,...Ea(s.link)?{}:{link:qn(a,dn(c,s.link)).link}}:s;if("children"in d){const p=dn(c,d.prefix),h=d.children==="structure"?_l[p]:d.children;return{type:"group",...d,prefix:p,children:h.map(m=>l(m,p))}}return{type:"page",...d,children:d.link===o.value.path?fl(((u=o.value.headers[0])==null?void 0:u.level)===1?o.value.headers[0].children:o.value.headers,t):[]}};return e.map(s=>l(s))},M4=(e,t)=>{const n=ie(),a=Ge(e).sort((o,l)=>l.length-o.length);for(const o of a)if(en(decodeURI(n.value.path),o)){const l=e[o];return l?Dr(l==="structure"?_l[o]:l==="heading"?Mu(t):l,t,o):[]}return console.warn(`${n.value.path} is missing sidebar config.`),[]},j4=(e,t)=>{const n=Et();return e===!1?[]:e==="heading"?Mu(t):e==="structure"?Dr(_l[n.value],t,n.value):ee(e)?Dr(e,t):Zn(e)?M4(e,t):[]},ju=Symbol(""),J4=()=>{const e=be(),t=le(),n=ie(),a=L(()=>e.value.home?!1:e.value.sidebar??t.value.sidebar??"structure"),o=L(()=>e.value.headerDepth??t.value.headerDepth??2),l=Ro(()=>[a.value,o.value,n.value.path,null],()=>j4(a.value,o.value));it(ju,l)},gl=()=>{const e=me(ju);if(!e)throw new Error("useSidebarItems() is called without provider.");return e};var B4=C({name:"PageFooter",setup(){const e=be(),t=le(),n=Ou(),a=L(()=>{const{copyright:s,footer:c}=e.value;return c!==!1&&!!(s||c||t.value.displayFooter)}),o=L(()=>{const{footer:s}=e.value;return s===!1?!1:ce(s)?s:t.value.footer||""}),l=L(()=>"copyright"in e.value?e.value.copyright:"copyright"in t.value?t.value.copyright:n.value.length?`Copyright © ${new Date().getFullYear()} ${n.value[0].name}`:!1);return()=>a.value?i("footer",{class:"vp-footer-wrapper"},[o.value?i("div",{class:"vp-footer",innerHTML:o.value}):null,l.value?i("div",{class:"vp-copyright",innerHTML:l.value}):null]):null}}),Ju=C({name:"NavbarDropdownLink",props:{config:{type:Object,required:!0}},slots:Object,setup(e,{slots:t}){const n=ie(),a=Gn(e,"config"),o=L(()=>a.value.ariaLabel||a.value.text),l=H(!1);ue(()=>n.value.path,()=>{l.value=!1});const s=c=>{c.detail===0&&(l.value=!l.value)};return()=>{var c;return i("div",{class:["dropdown-wrapper",{open:l.value}]},[i("button",{type:"button",class:"dropdown-title","aria-label":o.value,onClick:s},[((c=t.title)==null?void 0:c.call(t))||i("span",{class:"title"},[i(Fe,{icon:a.value.icon}),e.config.text]),i("span",{class:"arrow"}),i("ul",{class:"nav-dropdown"},a.value.children.map((d,u)=>{const p=u===a.value.children.length-1;return i("li",{class:"dropdown-item"},"children"in d?[i("h4",{class:"dropdown-subtitle"},d.link?i(Ue,{config:d,onFocusout:()=>{d.children.length===0&&p&&(l.value=!1)}}):i("span",d.text)),i("ul",{class:"dropdown-subitem-wrapper"},d.children.map((h,m)=>i("li",{class:"dropdown-subitem"},i(Ue,{config:h,onFocusout:()=>{m===d.children.length-1&&p&&(l.value=!1)}}))))]:i(Ue,{config:d,onFocusout:()=>{p&&(l.value=!1)}}))}))])])}}});const Bu=()=>i(re,{name:"i18n"},()=>[i("path",{d:"M379.392 460.8 494.08 575.488l-42.496 102.4L307.2 532.48 138.24 701.44l-71.68-72.704L234.496 460.8l-45.056-45.056c-27.136-27.136-51.2-66.56-66.56-108.544h112.64c7.68 14.336 16.896 27.136 26.112 35.84l45.568 46.08 45.056-45.056C382.976 312.32 409.6 247.808 409.6 204.8H0V102.4h256V0h102.4v102.4h256v102.4H512c0 70.144-37.888 161.28-87.04 210.944L378.88 460.8zM576 870.4 512 1024H409.6l256-614.4H768l256 614.4H921.6l-64-153.6H576zM618.496 768h196.608L716.8 532.48 618.496 768z"})]);Bu.displayName="I18nIcon";const Nu=(e,t,n="")=>ce(t)?qn(e,dn(n,t)):"children"in t?{...t,...t.link&&!Ea(t.link)?qn(e,dn(n,t.link)):{},children:t.children.map(a=>Nu(e,a,dn(n,t.prefix)))}:{...t,link:Ea(t.link)?t.link:qn(e,dn(n,t.link)).link},$u=()=>{const e=le(),t=Ne(),n=()=>(e.value.navbar||[]).map(a=>Nu(t,a));return Ro(()=>e.value.navbar,()=>n())},N4=()=>{const e=Ne(),t=kt(),n=Et(),a=_n(),o=Jt(),l=le();return Ro(()=>t.path,()=>{const s=Ge(a.value.locales),c=fn(o.value.extraLocales??{});if(s.length<2&&!c.length)return null;const{path:d,fullPath:u}=t,{navbarLocales:p}=l.value;return{text:"",ariaLabel:p==null?void 0:p.selectLangAriaLabel,children:[...s.map(h=>{var y,T,k;const m=((y=a.value.locales)==null?void 0:y[h])??{},_=((T=o.value.locales)==null?void 0:T[h])??{},g=m.lang||"",E=((k=_.navbarLocales)==null?void 0:k.langName)??g;let w;if(g===a.value.lang)w=d;else{const I=d.replace(n.value,h);w=e.getRoutes().some(M=>M.path===I)?u.replace(d,I):_.home??h}return{text:E,link:w}}),...c.map(([h,m])=>({text:h,link:m.replace(":route",t.path.replace(n.value,""))}))]}})},$4=()=>{const e=le(),t=L(()=>e.value.repo||null),n=L(()=>t.value?E2(t.value):null),a=L(()=>t.value?Zc(t.value):null),o=L(()=>n.value?e.value.repoLabel??(a.value===null?"Source":a.value):null);return L(()=>!n.value||!o.value||e.value.repoDisplay===!1?null:{type:a.value||"Source",label:o.value,link:n.value})};var Q4=C({name:"LanguageDropdown",setup(){const e=N4();return()=>e.value?i("div",{class:"nav-item"},i(Ju,{class:"i18n-dropdown",config:e.value},{title:()=>{var t;return i(Bu,{"aria-label":(t=e.value)==null?void 0:t.ariaLabel,style:{width:"1rem",height:"1rem",verticalAlign:"middle"}})}})):null}}),F4=C({name:"NavScreenDropdown",props:{config:{type:Object,required:!0}},setup(e){const t=ie(),n=Gn(e,"config"),a=L(()=>n.value.ariaLabel||n.value.text),o=H(!1);ue(()=>t.value.path,()=>{o.value=!1});const l=(s,c)=>c[c.length-1]===s;return()=>[i("button",{type:"button",class:["nav-screen-dropdown-title",{active:o.value}],"aria-label":a.value,onClick:()=>{o.value=!o.value}},[i("span",{class:"title"},[i(Fe,{icon:n.value.icon}),e.config.text]),i("span",{class:["arrow",o.value?"down":"end"]})]),i("ul",{class:["nav-screen-dropdown",{hide:!o.value}]},n.value.children.map(s=>i("li",{class:"dropdown-item"},"children"in s?[i("h4",{class:"dropdown-subtitle"},s.link?i(Ue,{config:s,onFocusout:()=>{l(s,n.value.children)&&s.children.length===0&&(o.value=!1)}}):i("span",s.text)),i("ul",{class:"dropdown-subitem-wrapper"},s.children.map(c=>i("li",{class:"dropdown-subitem"},i(Ue,{config:c,onFocusout:()=>{l(c,s.children)&&l(s,n.value.children)&&(o.value=!1)}}))))]:i(Ue,{config:s,onFocusout:()=>{l(s,n.value.children)&&(o.value=!1)}}))))]}}),H4=C({name:"NavScreenLinks",setup(){const e=$u();return()=>e.value.length?i("nav",{class:"nav-screen-links"},e.value.map(t=>i("div",{class:"navbar-links-item"},"children"in t?i(F4,{config:t}):i(Ue,{config:t})))):null}});const Qu=()=>i(re,{name:"dark"},()=>i("path",{d:"M524.8 938.667h-4.267a439.893 439.893 0 0 1-313.173-134.4 446.293 446.293 0 0 1-11.093-597.334A432.213 432.213 0 0 1 366.933 90.027a42.667 42.667 0 0 1 45.227 9.386 42.667 42.667 0 0 1 10.24 42.667 358.4 358.4 0 0 0 82.773 375.893 361.387 361.387 0 0 0 376.747 82.774 42.667 42.667 0 0 1 54.187 55.04 433.493 433.493 0 0 1-99.84 154.88 438.613 438.613 0 0 1-311.467 128z"}));Qu.displayName="DarkIcon";const Fu=()=>i(re,{name:"light"},()=>i("path",{d:"M952 552h-80a40 40 0 0 1 0-80h80a40 40 0 0 1 0 80zM801.88 280.08a41 41 0 0 1-57.96-57.96l57.96-58a41.04 41.04 0 0 1 58 58l-58 57.96zM512 752a240 240 0 1 1 0-480 240 240 0 0 1 0 480zm0-560a40 40 0 0 1-40-40V72a40 40 0 0 1 80 0v80a40 40 0 0 1-40 40zm-289.88 88.08-58-57.96a41.04 41.04 0 0 1 58-58l57.96 58a41 41 0 0 1-57.96 57.96zM192 512a40 40 0 0 1-40 40H72a40 40 0 0 1 0-80h80a40 40 0 0 1 40 40zm30.12 231.92a41 41 0 0 1 57.96 57.96l-57.96 58a41.04 41.04 0 0 1-58-58l58-57.96zM512 832a40 40 0 0 1 40 40v80a40 40 0 0 1-80 0v-80a40 40 0 0 1 40-40zm289.88-88.08 58 57.96a41.04 41.04 0 0 1-58 58l-57.96-58a41 41 0 0 1 57.96-57.96z"}));Fu.displayName="LightIcon";const Hu=()=>i(re,{name:"auto"},()=>i("path",{d:"M512 992C246.92 992 32 777.08 32 512S246.92 32 512 32s480 214.92 480 480-214.92 480-480 480zm0-840c-198.78 0-360 161.22-360 360 0 198.84 161.22 360 360 360s360-161.16 360-360c0-198.78-161.22-360-360-360zm0 660V212c165.72 0 300 134.34 300 300 0 165.72-134.28 300-300 300z"}));Hu.displayName="AutoIcon";const zu=()=>i(re,{name:"enter-fullscreen"},()=>i("path",{d:"M762.773 90.24h-497.28c-96.106 0-174.4 78.293-174.4 174.4v497.28c0 96.107 78.294 174.4 174.4 174.4h497.28c96.107 0 175.04-78.293 174.4-174.4V264.64c0-96.213-78.186-174.4-174.4-174.4zm-387.2 761.173H215.04c-21.867 0-40.427-17.92-41.067-41.066V649.92c0-22.507 17.92-40.427 40.427-40.427 11.307 0 21.227 4.694 28.48 11.947 7.253 7.253 11.947 17.92 11.947 28.48v62.293l145.28-145.28c15.893-15.893 41.813-15.893 57.706 0 15.894 15.894 15.894 41.814 0 57.707l-145.28 145.28h62.294c22.506 0 40.426 17.92 40.426 40.427s-17.173 41.066-39.68 41.066zM650.24 165.76h160.427c21.866 0 40.426 17.92 41.066 41.067v160.426c0 22.507-17.92 40.427-40.426 40.427-11.307 0-21.227-4.693-28.48-11.947-7.254-7.253-11.947-17.92-11.947-28.48v-62.186L625.6 450.347c-15.893 15.893-41.813 15.893-57.707 0-15.893-15.894-15.893-41.814 0-57.707l145.28-145.28H650.88c-22.507 0-40.427-17.92-40.427-40.427s17.174-41.173 39.787-41.173z"}));zu.displayName="EnterFullScreenIcon";const Uu=()=>i(re,{name:"cancel-fullscreen"},()=>i("path",{d:"M778.468 78.62H247.922c-102.514 0-186.027 83.513-186.027 186.027V795.08c0 102.514 83.513 186.027 186.027 186.027h530.432c102.514 0 186.71-83.513 186.026-186.027V264.647C964.494 162.02 880.981 78.62 778.468 78.62zM250.88 574.35h171.122c23.324 0 43.122 19.115 43.804 43.805v171.121c0 24.008-19.114 43.122-43.122 43.122-12.06 0-22.641-5.006-30.378-12.743s-12.743-19.115-12.743-30.379V722.83L224.597 877.91c-16.953 16.952-44.6 16.952-61.553 0-16.953-16.954-16.953-44.602 0-61.554L318.009 661.39h-66.446c-24.007 0-43.122-19.114-43.122-43.122 0-24.12 18.432-43.918 42.439-43.918zm521.899-98.873H601.657c-23.325 0-43.122-19.114-43.805-43.804V260.55c0-24.007 19.115-43.122 43.122-43.122 12.06 0 22.642 5.007 30.379 12.743s12.743 19.115 12.743 30.38v66.445l154.965-154.965c16.953-16.953 44.601-16.953 61.554 0 16.953 16.953 16.953 44.6 0 61.554L705.536 388.55h66.446c24.007 0 43.122 19.115 43.122 43.122.114 24.007-18.318 43.804-42.325 43.804z"}));Uu.displayName="CancelFullScreenIcon";const Wu=()=>i(re,{name:"outlook"},()=>[i("path",{d:"M224 800c0 9.6 3.2 44.8 6.4 54.4 6.4 48-48 76.8-48 76.8s80 41.6 147.2 0 134.4-134.4 38.4-195.2c-22.4-12.8-41.6-19.2-57.6-19.2C259.2 716.8 227.2 761.6 224 800zM560 675.2l-32 51.2c-51.2 51.2-83.2 32-83.2 32 25.6 67.2 0 112-12.8 128 25.6 6.4 51.2 9.6 80 9.6 54.4 0 102.4-9.6 150.4-32l0 0c3.2 0 3.2-3.2 3.2-3.2 22.4-16 12.8-35.2 6.4-44.8-9.6-12.8-12.8-25.6-12.8-41.6 0-54.4 60.8-99.2 137.6-99.2 6.4 0 12.8 0 22.4 0 12.8 0 38.4 9.6 48-25.6 0-3.2 0-3.2 3.2-6.4 0-3.2 3.2-6.4 3.2-6.4 6.4-16 6.4-16 6.4-19.2 9.6-35.2 16-73.6 16-115.2 0-105.6-41.6-198.4-108.8-268.8C704 396.8 560 675.2 560 675.2zM224 419.2c0-28.8 22.4-51.2 51.2-51.2 28.8 0 51.2 22.4 51.2 51.2 0 28.8-22.4 51.2-51.2 51.2C246.4 470.4 224 448 224 419.2zM320 284.8c0-22.4 19.2-41.6 41.6-41.6 22.4 0 41.6 19.2 41.6 41.6 0 22.4-19.2 41.6-41.6 41.6C339.2 326.4 320 307.2 320 284.8zM457.6 208c0-12.8 12.8-25.6 25.6-25.6 12.8 0 25.6 12.8 25.6 25.6 0 12.8-12.8 25.6-25.6 25.6C470.4 233.6 457.6 220.8 457.6 208zM128 505.6C128 592 153.6 672 201.6 736c28.8-60.8 112-60.8 124.8-60.8-16-51.2 16-99.2 16-99.2l316.8-422.4c-48-19.2-99.2-32-150.4-32C297.6 118.4 128 291.2 128 505.6zM764.8 86.4c-22.4 19.2-390.4 518.4-390.4 518.4-22.4 28.8-12.8 76.8 22.4 99.2l9.6 6.4c35.2 22.4 80 12.8 99.2-25.6 0 0 6.4-12.8 9.6-19.2 54.4-105.6 275.2-524.8 288-553.6 6.4-19.2-3.2-32-19.2-32C777.6 76.8 771.2 80 764.8 86.4z"})]);Wu.displayName="OutlookIcon";var Gu=C({name:"AppearanceSwitch",setup(){const{config:e,isDarkmode:t,status:n}=qa(),a=En(),o=()=>{e.value==="switch"?n.value={light:"dark",dark:"auto",auto:"light"}[n.value]:n.value=n.value==="light"?"dark":"light"},l=async s=>{if(!(document.startViewTransition&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches&&!a.value)||!s){o();return}const c=s.clientX,d=s.clientY,u=Math.hypot(Math.max(c,innerWidth-c),Math.max(d,innerHeight-d)),p=t.value;await document.startViewTransition(async()=>{o(),await Ct()}).ready,t.value!==p&&document.documentElement.animate({clipPath:t.value?[`circle(${u}px at ${c}px ${d}px)`,`circle(0px at ${c}px ${d}px)`]:[`circle(0px at ${c}px ${d}px)`,`circle(${u}px at ${c}px ${d}px)`]},{duration:400,pseudoElement:t.value?"::view-transition-old(root)":"::view-transition-new(root)"})};return()=>i("button",{type:"button",id:"appearance-switch",onClick:l},[i(Hu,{style:{display:n.value==="auto"?"block":"none"}}),i(Qu,{style:{display:n.value==="dark"?"block":"none"}}),i(Fu,{style:{display:n.value==="light"?"block":"none"}})])}}),z4=C({name:"AppearanceMode",setup(){const e=le(),{canToggle:t}=qa(),n=L(()=>e.value.outlookLocales.darkmode);return()=>t.value?i("div",{class:"appearance-wrapper"},[i("label",{class:"appearance-title",for:"appearance-switch"},n.value),i(Gu)]):null}});const or="VUEPRESS_THEME_COLOR";var U4=C({name:"ThemeColorPicker",props:{themeColor:{type:Object,required:!0}},setup(e){const t=(n="")=>{const a=document.documentElement.classList,o=Ge(e.themeColor);if(!n){localStorage.removeItem(or),a.remove(...o);return}a.remove(...o.filter(l=>l!==n)),a.add(n),localStorage.setItem(or,n)};return fe(()=>{const n=localStorage.getItem(or);n&&t(n)}),()=>i("ul",{id:"theme-color-picker"},[i("li",i("span",{class:"theme-color",onClick:()=>t()})),fn(e.themeColor).map(([n,a])=>i("li",i("span",{style:{background:a},onClick:()=>t(n)})))])}});const Cn=ml.enableThemeColor==="true",W4=Cn?_2(fn(ml).filter(([e])=>e.startsWith("theme-"))):{};var G4=C({name:"ThemeColor",setup(){const e=le(),t=L(()=>e.value.outlookLocales.themeColor);return()=>Cn?i("div",{class:"theme-color-wrapper"},[i("label",{class:"theme-color-title",for:"theme-color-picker"},t.value),i(U4,{themeColor:W4})]):null}}),Ku=C({name:"ToggleFullScreenButton",setup(){const e=le(),{isSupported:t,isFullscreen:n,toggle:a}=dl(),o=L(()=>e.value.outlookLocales.fullscreen);return()=>t?i("div",{class:"full-screen-wrapper"},[i("label",{class:"full-screen-title",for:"full-screen-switch"},o.value),i("button",{type:"button",id:"full-screen-switch",class:"full-screen",ariaPressed:n.value,onClick:()=>a()},n.value?i(Uu):i(zu))]):null}}),Xu=C({name:"OutlookSettings",setup(){const e=Jt(),t=En(),n=L(()=>!t.value&&e.value.fullscreen);return()=>i(Io,()=>[Cn?i(G4):null,i(z4),n.value?i(Ku):null])}}),K4=C({name:"NavScreen",props:{show:Boolean},emits:["close"],slots:Object,setup(e,{emit:t,slots:n}){const a=ie(),{isMobile:o}=xa(),l=je(),s=pl(l);return fe(()=>{l.value=document.body,ue(o,c=>{!c&&e.show&&(s.value=!1,t("close"))}),ue(()=>a.value.path,()=>{s.value=!1,t("close")})}),Kn(()=>{s.value=!1}),()=>i(Yt,{name:"fade",onEnter:()=>{s.value=!0},onAfterLeave:()=>{s.value=!1}},()=>{var c,d;return e.show?i("div",{id:"nav-screen"},i("div",{class:"vp-nav-screen-container"},[(c=n.before)==null?void 0:c.call(n),i(H4),i("div",{class:"vp-outlook-wrapper"},i(Xu)),(d=n.after)==null?void 0:d.call(n)])):null})}}),X4=C({name:"NavbarBrand",setup(){const e=Et(),t=_n(),n=le(),a=L(()=>n.value.home||e.value),o=L(()=>t.value.title),l=L(()=>n.value.navTitle??o.value),s=L(()=>n.value.logo?Ae(n.value.logo):null),c=L(()=>n.value.logoDark?Ae(n.value.logoDark):null);return()=>i(Oe,{to:a.value,class:"vp-brand"},()=>[s.value?i("img",{class:["vp-nav-logo",{light:!!c.value}],src:s.value,"aria-hidden":""}):null,c.value?i("img",{class:["vp-nav-logo dark"],src:c.value,"aria-hidden":""}):null,l.value?i("span",{class:["vp-site-name",{"hide-in-pad":s.value&&n.value.hideSiteNameOnMobile!==!1}]},l.value):null])}}),Z4=C({name:"NavbarLinks",setup(){const e=$u();return()=>e.value.length?i("nav",{class:"vp-nav-links"},e.value.map(t=>i("div",{class:"nav-item hide-in-mobile"},"children"in t?i(Ju,{config:t}):i(Ue,{config:t})))):null}}),Y4=C({name:"RepoLink",components:{BitbucketIcon:nu,GiteeIcon:tu,GitHubIcon:Yc,GitLabIcon:eu,SourceIcon:au},setup(){const e=$4();return()=>e.value?i("div",{class:"nav-item vp-repo"},i("a",{class:"vp-repo-link",href:e.value.link,target:"_blank",rel:"noopener noreferrer","aria-label":e.value.label},i(tt(`${e.value.type}Icon`),{style:{width:"1.25rem",height:"1.25rem",verticalAlign:"middle"}}))):null}});const Zu=({active:e=!1},{emit:t})=>i("button",{type:"button",class:["vp-toggle-navbar-button",{"is-active":e}],"aria-label":"Toggle Navbar","aria-expanded":e,"aria-controls":"nav-screen",onClick:()=>t("toggle")},i("span",[i("span",{class:"vp-top"}),i("span",{class:"vp-middle"}),i("span",{class:"vp-bottom"})]));Zu.displayName="ToggleNavbarButton";var em=Zu;const Pr=(e,{emit:t})=>i("button",{type:"button",class:"vp-toggle-sidebar-button",title:"Toggle Sidebar",onClick:()=>t("toggle")},i("span",{class:"icon"}));Pr.displayName="ToggleSidebarButton",Pr.emits=["toggle"];var tm=Pr,nm=C({name:"OutlookButton",setup(){const{isSupported:e}=dl(),t=Jt(),n=En(),a=ie(),{canToggle:o}=qa(),l=H(!1),s=L(()=>!n.value&&t.value.fullscreen&&e);return ue(()=>a.value.path,()=>{l.value=!1}),()=>o.value||s.value||Cn?i("div",{class:"nav-item hide-in-mobile"},o.value&&!s.value&&!Cn?i(Gu):s.value&&!o.value&&!Cn?i(Ku):i("button",{type:"button",class:["outlook-button",{open:l.value}],tabindex:"-1","aria-hidden":!0},[i(Wu),i("div",{class:"outlook-dropdown"},i(Xu))])):null}}),am=C({name:"NavBar",emits:["toggleSidebar"],slots:Object,setup(e,{emit:t,slots:n}){const a=le(),{isMobile:o}=xa(),l=H(!1),s=L(()=>{const{navbarAutoHide:p="mobile"}=a.value;return p!=="none"&&(p==="always"||o.value)}),c=L(()=>a.value.navbarLayout||{start:["Brand"],center:["Links"],end:["Language","Repo","Outlook","Search"]}),d={Brand:X4,Language:Q4,Links:Z4,Repo:Y4,Outlook:nm,Search:ut("Docsearch")?tt("Docsearch"):ut("SearchBox")?tt("SearchBox"):Ys},u=p=>d[p]??(ut(p)?tt(p):Ys);return()=>{var p,h,m,_,g,E;return[i("header",{id:"navbar",class:["vp-navbar",{"auto-hide":s.value,"hide-icon":a.value.navbarIcon===!1}]},[i("div",{class:"vp-navbar-start"},[i(tm,{onToggle:()=>{l.value&&(l.value=!1),t("toggleSidebar")}}),(p=n.startBefore)==null?void 0:p.call(n),(c.value.start||[]).map(w=>i(u(w))),(h=n.startAfter)==null?void 0:h.call(n)]),i("div",{class:"vp-navbar-center"},[(m=n.centerBefore)==null?void 0:m.call(n),(c.value.center||[]).map(w=>i(u(w))),(_=n.centerAfter)==null?void 0:_.call(n)]),i("div",{class:"vp-navbar-end"},[(g=n.endBefore)==null?void 0:g.call(n),(c.value.end||[]).map(w=>i(u(w))),(E=n.endAfter)==null?void 0:E.call(n),i(em,{active:l.value,onToggle:()=>{l.value=!l.value}})])]),i(K4,{show:l.value,onClose:()=>{l.value=!1}},{before:()=>{var w;return(w=n.screenTop)==null?void 0:w.call(n)},after:()=>{var w;return(w=n.screenBottom)==null?void 0:w.call(n)}})]}}}),om=C({name:"SidebarChild",props:{config:{type:Object,required:!0}},setup(e){const t=kt();return()=>[xu(e.config,{class:["vp-sidebar-link",`vp-sidebar-${e.config.type}`,{active:Hn(t,e.config,!0)}],exact:!0}),qu(e.config.children)]}}),rm=C({name:"SidebarGroup",props:{config:{type:Object,required:!0},open:{type:Boolean,required:!0}},emits:["toggle"],setup(e,{emit:t}){const n=kt(),a=L(()=>Hn(n,e.config)),o=L(()=>Hn(n,e.config,!0));return()=>{const{collapsible:l,children:s=[],icon:c,prefix:d,link:u,text:p}=e.config;return i("section",{class:"vp-sidebar-group"},[i(l?"button":"p",{class:["vp-sidebar-heading",{clickable:l||u,exact:o.value,active:a.value}],...l?{type:"button",onClick:()=>t("toggle"),onKeydown:h=>{h.key==="Enter"&&t("toggle")}}:{}},[i(Fe,{icon:c}),u?i(Ue,{class:"vp-sidebar-title",config:{text:p,link:u},noExternalLinkIcon:!0}):i("span",{class:"vp-sidebar-title"},p),l?i("span",{class:["vp-arrow",e.open?"down":"end"]}):null]),e.open||!l?i(Yu,{key:d,config:s}):null])}}}),Yu=C({name:"SidebarLinks",props:{config:{type:Array,required:!0}},setup(e){const t=kt(),n=H(-1),a=o=>{n.value=o===n.value?-1:o};return ue(()=>t.path,()=>{const o=e.config.findIndex(l=>Vu(t,l));n.value=o},{immediate:!0,flush:"post"}),()=>i("ul",{class:"vp-sidebar-links"},e.config.map((o,l)=>i("li",o.type==="group"?i(rm,{config:o,open:l===n.value,onToggle:()=>a(l)}):i(om,{config:o}))))}}),lm=C({name:"SideBar",slots:Object,setup(e,{slots:t}){const n=kt(),a=le(),o=gl(),l=je();return fe(()=>{ue(()=>n.hash,s=>{const c=document.querySelector(`.vp-sidebar a.vp-sidebar-link[href="${n.path}${s}"]`);if(!c)return;const{top:d,height:u}=l.value.getBoundingClientRect(),{top:p,height:h}=c.getBoundingClientRect();p<d?c.scrollIntoView(!0):p+h>d+u&&c.scrollIntoView(!1)},{immediate:!0})}),()=>{var s,c,d;return i("aside",{ref:l,id:"sidebar",class:["vp-sidebar",{"hide-icon":a.value.sidebarIcon===!1}]},[(s=t.top)==null?void 0:s.call(t),((c=t.default)==null?void 0:c.call(t))||i(Yu,{config:o.value}),(d=t.bottom)==null?void 0:d.call(t)])}}}),bl=C({name:"CommonWrapper",props:{containerClass:{type:String,default:""},noNavbar:Boolean,noSidebar:Boolean,noToc:Boolean},slots:Object,setup(e,{slots:t}){const n=Ne(),a=ie(),o=be(),l=le(),{isMobile:s,isPC:c}=xa(),[d,u]=ho(!1),[p,h]=ho(!1),m=gl(),_=H(!1),g=L(()=>e.noNavbar||o.value.navbar===!1||l.value.navbar===!1?!1:!!(a.value.title||l.value.logo||l.value.repo||l.value.navbar)),E=L(()=>e.noSidebar?!1:o.value.sidebar!==!1&&m.value.length!==0&&!o.value.home),w=L(()=>e.noToc||o.value.home?!1:o.value.toc||l.value.toc!==!1&&o.value.toc!==!1),y={x:0,y:0},T=O=>{y.x=O.changedTouches[0].clientX,y.y=O.changedTouches[0].clientY},k=O=>{const G=O.changedTouches[0].clientX-y.x,$=O.changedTouches[0].clientY-y.y;Math.abs(G)>Math.abs($)*1.5&&Math.abs(G)>40&&(G>0&&y.x<=80?u(!0):u(!1))},I=()=>window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0;let M=0;return Te("scroll",V2(()=>{const O=I();O<=58||O<M?_.value=!1:M+200<O&&!d.value&&(_.value=!0),M=O},300,!0)),ue(s,O=>{O||u(!1)}),fe(()=>{const O=pl(document.body);ue(d,$=>{O.value=$});const G=n.afterEach(()=>{u(!1)});Kn(()=>{O.value=!1,G()})}),()=>i(ut("GlobalEncrypt")?tt("GlobalEncrypt"):Qc,()=>i("div",{class:["theme-container",{"no-navbar":!g.value,"no-sidebar":!E.value&&!(t.sidebar||t.sidebarTop||t.sidebarBottom),"has-toc":w.value,"hide-navbar":_.value,"sidebar-collapsed":!s.value&&!c.value&&p.value,"sidebar-open":s.value&&d.value},e.containerClass,o.value.containerClass||""],onTouchStart:T,onTouchEnd:k},[g.value?i(am,{onToggleSidebar:()=>u()},{startBefore:()=>{var O;return(O=t.navbarStartBefore)==null?void 0:O.call(t)},startAfter:()=>{var O;return(O=t.navbarStartAfter)==null?void 0:O.call(t)},centerBefore:()=>{var O;return(O=t.navbarCenterBefore)==null?void 0:O.call(t)},centerAfter:()=>{var O;return(O=t.navbarCenterAfter)==null?void 0:O.call(t)},endBefore:()=>{var O;return(O=t.navbarEndBefore)==null?void 0:O.call(t)},endAfter:()=>{var O;return(O=t.navbarEndAfter)==null?void 0:O.call(t)},screenTop:()=>{var O;return(O=t.navScreenTop)==null?void 0:O.call(t)},screenBottom:()=>{var O;return(O=t.navScreenBottom)==null?void 0:O.call(t)}}):null,i(Yt,{name:"fade"},()=>d.value?i("div",{class:"vp-sidebar-mask",onClick:()=>u(!1)}):null),i(Yt,{name:"fade"},()=>s.value?null:i("div",{class:"toggle-sidebar-wrapper",onClick:()=>h()},i("span",{class:["arrow",p.value?"end":"start"]}))),i(lm,{},{...t.sidebar?{default:()=>t.sidebar()}:{},top:()=>{var O;return(O=t.sidebarTop)==null?void 0:O.call(t)},bottom:()=>{var O;return(O=t.sidebarBottom)==null?void 0:O.call(t)}}),t.default(),i(B4)]))}}),_e=C({name:"DropTransition",props:{type:{type:String,default:"single"},delay:{type:Number,default:0},duration:{type:Number,default:.25},appear:Boolean},slots:Object,setup(e,{slots:t}){const n=o=>{o.style.transition=`transform ${e.duration}s ease-in-out ${e.delay}s, opacity ${e.duration}s ease-in-out ${e.delay}s`,o.style.transform="translateY(-20px)",o.style.opacity="0"},a=o=>{o.style.transform="translateY(0)",o.style.opacity="1"};return()=>i(e.type==="single"?Yt:hv,{name:"drop",appear:e.appear,onAppear:n,onAfterAppear:a,onEnter:n,onAfterEnter:a,onBeforeLeave:n},()=>t.default())}});const Rr=({custom:e})=>i(Ac,{class:["theme-hope-content",{custom:e}]});Rr.displayName="MarkdownContent",Rr.props={custom:Boolean};var El=Rr;const ed=()=>i(re,{name:"author"},()=>i("path",{d:"M649.6 633.6c86.4-48 147.2-144 147.2-249.6 0-160-128-288-288-288s-288 128-288 288c0 108.8 57.6 201.6 147.2 249.6-121.6 48-214.4 153.6-240 288-3.2 9.6 0 19.2 6.4 25.6 3.2 9.6 12.8 12.8 22.4 12.8h704c9.6 0 19.2-3.2 25.6-12.8 6.4-6.4 9.6-16 6.4-25.6-25.6-134.4-121.6-240-243.2-288z"}));ed.displayName="AuthorIcon";const td=()=>i(re,{name:"calendar"},()=>i("path",{d:"M716.4 110.137c0-18.753-14.72-33.473-33.472-33.473-18.753 0-33.473 14.72-33.473 33.473v33.473h66.993v-33.473zm-334.87 0c0-18.753-14.72-33.473-33.473-33.473s-33.52 14.72-33.52 33.473v33.473h66.993v-33.473zm468.81 33.52H716.4v100.465c0 18.753-14.72 33.473-33.472 33.473a33.145 33.145 0 01-33.473-33.473V143.657H381.53v100.465c0 18.753-14.72 33.473-33.473 33.473a33.145 33.145 0 01-33.473-33.473V143.657H180.6A134.314 134.314 0 0046.66 277.595v535.756A134.314 134.314 0 00180.6 947.289h669.74a134.36 134.36 0 00133.94-133.938V277.595a134.314 134.314 0 00-133.94-133.938zm33.473 267.877H147.126a33.145 33.145 0 01-33.473-33.473c0-18.752 14.72-33.473 33.473-33.473h736.687c18.752 0 33.472 14.72 33.472 33.473a33.145 33.145 0 01-33.472 33.473z"}));td.displayName="CalendarIcon";const nd=()=>i(re,{name:"category"},()=>i("path",{d:"M148.41 106.992h282.176c22.263 0 40.31 18.048 40.31 40.31V429.48c0 22.263-18.047 40.31-40.31 40.31H148.41c-22.263 0-40.311-18.047-40.311-40.31V147.302c0-22.263 18.048-40.31 40.311-40.31zM147.556 553.478H429.73c22.263 0 40.311 18.048 40.311 40.31v282.176c0 22.263-18.048 40.312-40.31 40.312H147.555c-22.263 0-40.311-18.049-40.311-40.312V593.79c0-22.263 18.048-40.311 40.31-40.311zM593.927 106.992h282.176c22.263 0 40.31 18.048 40.31 40.31V429.48c0 22.263-18.047 40.31-40.31 40.31H593.927c-22.263 0-40.311-18.047-40.311-40.31V147.302c0-22.263 18.048-40.31 40.31-40.31zM730.22 920.502H623.926c-40.925 0-74.22-33.388-74.22-74.425V623.992c0-41.038 33.387-74.424 74.425-74.424h222.085c41.038 0 74.424 33.226 74.424 74.067v114.233c0 10.244-8.304 18.548-18.547 18.548s-18.548-8.304-18.548-18.548V623.635c0-20.388-16.746-36.974-37.33-36.974H624.13c-20.585 0-37.331 16.747-37.331 37.33v222.086c0 20.585 16.654 37.331 37.126 37.331H730.22c10.243 0 18.547 8.304 18.547 18.547 0 10.244-8.304 18.547-18.547 18.547z"}));nd.displayName="CategoryIcon";const ad=()=>i(re,{name:"print"},()=>i("path",{d:"M819.2 364.8h-44.8V128c0-17.067-14.933-32-32-32H281.6c-17.067 0-32 14.933-32 32v236.8h-44.8C145.067 364.8 96 413.867 96 473.6v192c0 59.733 49.067 108.8 108.8 108.8h44.8V896c0 17.067 14.933 32 32 32h460.8c17.067 0 32-14.933 32-32V774.4h44.8c59.733 0 108.8-49.067 108.8-108.8v-192c0-59.733-49.067-108.8-108.8-108.8zM313.6 160h396.8v204.8H313.6V160zm396.8 704H313.6V620.8h396.8V864zM864 665.6c0 25.6-19.2 44.8-44.8 44.8h-44.8V588.8c0-17.067-14.933-32-32-32H281.6c-17.067 0-32 14.933-32 32v121.6h-44.8c-25.6 0-44.8-19.2-44.8-44.8v-192c0-25.6 19.2-44.8 44.8-44.8h614.4c25.6 0 44.8 19.2 44.8 44.8v192z"}));ad.displayName="PrintIcon";const od=()=>i(re,{name:"tag"},()=>i("path",{d:"M939.902 458.563L910.17 144.567c-1.507-16.272-14.465-29.13-30.737-30.737L565.438 84.098h-.402c-3.215 0-5.726 1.005-7.634 2.913l-470.39 470.39a10.004 10.004 0 000 14.164l365.423 365.424c1.909 1.908 4.42 2.913 7.132 2.913s5.223-1.005 7.132-2.913l470.39-470.39c2.01-2.11 3.014-5.023 2.813-8.036zm-240.067-72.121c-35.458 0-64.286-28.828-64.286-64.286s28.828-64.285 64.286-64.285 64.286 28.828 64.286 64.285-28.829 64.286-64.286 64.286z"}));od.displayName="TagIcon";const rd=()=>i(re,{name:"timer"},()=>i("path",{d:"M799.387 122.15c4.402-2.978 7.38-7.897 7.38-13.463v-1.165c0-8.933-7.38-16.312-16.312-16.312H256.33c-8.933 0-16.311 7.38-16.311 16.312v1.165c0 5.825 2.977 10.874 7.637 13.592 4.143 194.44 97.22 354.963 220.201 392.763-122.204 37.542-214.893 196.511-220.2 389.397-4.661 5.049-7.638 11.651-7.638 19.03v5.825h566.49v-5.825c0-7.379-2.849-13.981-7.509-18.9-5.049-193.016-97.867-351.985-220.2-389.527 123.24-37.67 216.446-198.453 220.588-392.892zM531.16 450.445v352.632c117.674 1.553 211.787 40.778 211.787 88.676H304.097c0-48.286 95.149-87.382 213.728-88.676V450.445c-93.077-3.107-167.901-81.297-167.901-177.093 0-8.803 6.99-15.793 15.793-15.793 8.803 0 15.794 6.99 15.794 15.793 0 80.261 63.69 145.635 142.01 145.635s142.011-65.374 142.011-145.635c0-8.803 6.99-15.793 15.794-15.793s15.793 6.99 15.793 15.793c0 95.019-73.789 172.82-165.96 177.093z"}));rd.displayName="TimerIcon";const ld=()=>i(re,{name:"word"},()=>[i("path",{d:"M518.217 432.64V73.143A73.143 73.143 0 01603.43 1.097a512 512 0 01419.474 419.474 73.143 73.143 0 01-72.046 85.212H591.36a73.143 73.143 0 01-73.143-73.143z"}),i("path",{d:"M493.714 566.857h340.297a73.143 73.143 0 0173.143 85.577A457.143 457.143 0 11371.566 117.76a73.143 73.143 0 0185.577 73.143v339.383a36.571 36.571 0 0036.571 36.571z"})]);ld.displayName="WordIcon";const on=()=>{const e=le();return L(()=>e.value.metaLocales)};var sm=C({name:"AuthorInfo",inheritAttrs:!1,props:{author:{type:Array,required:!0},pure:Boolean},setup(e){const t=on();return()=>e.author.length?i("span",{class:"page-author-info","aria-label":`${t.value.author}${e.pure?"":"🖊"}`,...e.pure?{}:{"data-balloon-pos":"down"}},[i(ed),i("span",e.author.map(n=>n.url?i("a",{class:"page-author-item",href:n.url,target:"_blank",rel:"noopener noreferrer"},n.name):i("span",{class:"page-author-item"},n.name))),i("span",{property:"author",content:e.author.map(n=>n.name).join(", ")})]):null}}),im=C({name:"CategoryInfo",inheritAttrs:!1,props:{category:{type:Array,required:!0},pure:Boolean},setup(e){const t=Ne(),n=ie(),a=on(),o=(l,s="")=>{s&&n.value.path!==s&&(l.preventDefault(),t.push(s))};return()=>e.category.length?i("span",{class:"page-category-info","aria-label":`${a.value.category}${e.pure?"":"🌈"}`,...e.pure?{}:{"data-balloon-pos":"down"}},[i(nd),e.category.map(({name:l,path:s})=>i("span",{class:["page-category-item",{[`category${Po(l,9)}`]:!e.pure,clickable:s}],role:s?"navigation":"",onClick:c=>o(c,s)},l)),i("meta",{property:"articleSection",content:e.category.map(({name:l})=>l).join(",")})]):null}}),cm=C({name:"DateInfo",inheritAttrs:!1,props:{date:{type:Object,default:null},localizedDate:{type:String,default:""},pure:Boolean},setup(e){const t=Ec(),n=on();return()=>e.date?i("span",{class:"page-date-info","aria-label":`${n.value.date}${e.pure?"":"📅"}`,...e.pure?{}:{"data-balloon-pos":"down"}},[i(td),i("span",i(Io,()=>e.localizedDate||e.date.toLocaleDateString(t.value))),i("meta",{property:"datePublished",content:e.date.toISOString()||""})]):null}}),um=C({name:"OriginalInfo",inheritAttrs:!1,props:{isOriginal:Boolean},setup(e){const t=on();return()=>e.isOriginal?i("span",{class:"page-original-info"},t.value.origin):null}}),dm=C({name:"ReadingTimeInfo",inheritAttrs:!1,props:{readingTime:{type:Object,default:()=>null},readingTimeLocale:{type:Object,default:()=>null},pure:Boolean},setup(e){const t=on(),n=L(()=>{if(!e.readingTime)return null;const{minutes:a}=e.readingTime;return a<1?"PT1M":`PT${Math.round(a)}M`});return()=>{var a,o;return(a=e.readingTimeLocale)!=null&&a.time?i("span",{class:"page-reading-time-info","aria-label":`${t.value.readingTime}${e.pure?"":"⌛"}`,...e.pure?{}:{"data-balloon-pos":"down"}},[i(rd),i("span",(o=e.readingTimeLocale)==null?void 0:o.time),i("meta",{property:"timeRequired",content:n.value})]):null}}}),pm=C({name:"TagInfo",inheritAttrs:!1,props:{tag:{type:Array,default:()=>[]},pure:Boolean},setup(e){const t=Ne(),n=ie(),a=on(),o=(l,s="")=>{s&&n.value.path!==s&&(l.preventDefault(),t.push(s))};return()=>e.tag.length?i("span",{class:"page-tag-info","aria-label":`${a.value.tag}${e.pure?"":"🏷"}`,...e.pure?{}:{"data-balloon-pos":"down"}},[i(od),e.tag.map(({name:l,path:s})=>i("span",{class:["page-tag-item",{[`tag${Po(l,9)}`]:!e.pure,clickable:s}],role:s?"navigation":"",onClick:c=>o(c,s)},l)),i("meta",{property:"keywords",content:e.tag.map(({name:l})=>l).join(",")})]):null}}),vm=C({name:"ReadTimeInfo",inheritAttrs:!1,props:{readingTime:{type:Object,default:()=>null},readingTimeLocale:{type:Object,default:()=>null},pure:Boolean},setup(e){const t=on();return()=>{var n,a,o;return(n=e.readingTimeLocale)!=null&&n.words?i("span",{class:"page-word-info","aria-label":`${t.value.words}${e.pure?"":"🔠"}`,...e.pure?{}:{"data-balloon-pos":"down"}},[i(ld),i("span",(a=e.readingTimeLocale)==null?void 0:a.words),i("meta",{property:"wordCount",content:(o=e.readingTime)==null?void 0:o.words})]):null}}}),sd=C({name:"PageInfo",components:{AuthorInfo:sm,CategoryInfo:im,DateInfo:cm,OriginalInfo:um,PageViewInfo:()=>null,ReadingTimeInfo:dm,TagInfo:pm,WordInfo:vm},props:{items:{type:[Array,Boolean],default:()=>["Author","Original","Date","PageView","ReadingTime","Category","Tag"]},info:{type:Object,required:!0}},setup(e){const t=En();return()=>e.items?i("div",{class:"page-info"},e.items.map(n=>i(tt(`${n}Info`),{...e.info,pure:t.value}))):null}}),hm=C({name:"PrintButton",setup(){const e=Jt(),t=le();return()=>e.value.print===!1?null:i("button",{type:"button",class:"print-button",title:t.value.metaLocales.print,onClick:()=>{window.print()}},i(ad))}});const mm=({title:e,level:t,slug:n})=>i(Oe,{to:`#${n}`,class:["toc-link",`level${t}`]},()=>e),Or=(e,t)=>{const n=kt();return e.length&&t>0?i("ul",{class:"toc-list"},e.map(a=>{const o=Or(a.children,t-1);return[i("li",{class:["toc-item",{active:n.hash===`#${a.slug}`}]},mm(a)),o?i("li",o):null]})):null};var id=C({name:"TOC",props:{items:{type:Array,default:()=>[]},headerDepth:{type:Number,default:2}},slots:Object,setup(e,{slots:t}){const n=kt(),a=ie(),o=on(),l=je(),s=H("-1.7rem"),c=u=>{var p;(p=l.value)==null||p.scrollTo({top:u,behavior:"smooth"})},d=()=>{if(l.value){const u=document.querySelector(".toc-item.active");u?s.value=`${u.getBoundingClientRect().top-l.value.getBoundingClientRect().top+l.value.scrollTop}px`:s.value="-1.7rem"}else s.value="-1.7rem"};return fe(()=>{ue(()=>n.hash,u=>{if(l.value){const p=document.querySelector(`#toc a.toc-link[href$="${u}"]`);if(!p)return;const{top:h,height:m}=l.value.getBoundingClientRect(),{top:_,height:g}=p.getBoundingClientRect();_<h?c(l.value.scrollTop+_-h):_+g>h+m&&c(l.value.scrollTop+_+g-h-m)}}),ue(()=>n.fullPath,d,{flush:"post",immediate:!0})}),()=>{var p,h;const u=e.items.length?Or(e.items,e.headerDepth):a.value.headers?Or(a.value.headers,e.headerDepth):null;return u?i("div",{class:"toc-place-holder"},[i("aside",{id:"toc"},[(p=t.before)==null?void 0:p.call(t),i("div",{class:"toc-header"},[o.value.toc,i(hm)]),i("div",{class:"toc-wrapper",ref:l},[u,i("div",{class:"toc-marker",style:{top:s.value}})]),(h=t.after)==null?void 0:h.call(t)])]):null}}}),kl=C({name:"SkipLink",props:{content:{type:String,default:"main-content"}},setup(e){const t=ie(),n=le(),a=je(),o=({target:l})=>{const s=document.querySelector(l.hash);if(s){const c=()=>{s.removeAttribute("tabindex"),s.removeEventListener("blur",c)};s.setAttribute("tabindex","-1"),s.addEventListener("blur",c),s.focus(),window.scrollTo(0,0)}};return fe(()=>{ue(()=>t.value.path,()=>a.value.focus())}),()=>[i("span",{ref:a,tabindex:"-1"}),i("a",{href:`#${e.content}`,class:"vp-skip-link sr-only",onClick:o},n.value.routeLocales.skipToContent)]}});let rr=null,na=null;const _m={wait:()=>rr,pending:()=>{rr=new Promise(e=>na=e)},resolve:()=>{na==null||na(),rr=null,na=null}},cd=()=>_m;var ud=C({name:"FadeSlideY",slots:Object,setup(e,{slots:t}){const{resolve:n,pending:a}=cd();return()=>i(Yt,{name:"fade-slide-y",mode:"out-in",onBeforeEnter:n,onBeforeLeave:a},()=>{var o;return(o=t.default)==null?void 0:o.call(t)})}});const fm=(e,t)=>{const n=e.replace(t,"/").split("/"),a=[];let o=wo(t);return n.forEach((l,s)=>{s!==n.length-1?(o+=`${l}/`,a.push({link:o,name:l||"Home"})):l!==""&&(o+=l,a.push({link:o,name:l}))}),a},dd=(e,{slots:t})=>{var h,m;const{bgImage:n,bgImageDark:a,bgImageStyle:o,color:l,description:s,image:c,imageDark:d,header:u,features:p=[]}=e;return i("div",{class:"vp-feature-wrapper"},[n?i("div",{class:["vp-feature-bg",{light:a}],style:[{"background-image":`url(${n})`},o]}):null,a?i("div",{class:"vp-feature-bg dark",style:[{"background-image":`url(${a})`},o]}):null,i("div",{class:"vp-feature",style:l?{color:l}:{}},[((h=t.image)==null?void 0:h.call(t,e))||[c?i("img",{class:["vp-feature-image",{light:d}],src:Ae(c),alt:u}):null,d?i("img",{class:"vp-feature-image dark",src:Ae(d),alt:u}):null],((m=t.info)==null?void 0:m.call(t,e))||[u?i("h2",{class:"vp-feature-header"},u):null,s?i("p",{class:"vp-feature-description",innerHTML:s}):null],p.length?i("div",{class:"vp-features"},p.map(({icon:_,title:g,details:E,link:w})=>{const y=[i("h3",{class:"vp-feature-title"},[i(Fe,{icon:_}),i("span",{innerHTML:g})]),i("p",{class:"vp-feature-details",innerHTML:E})];return w?Ea(w)?i("a",{class:"vp-feature-item link",href:w,"aria-label":g,target:"_blank"},y):i(Oe,{class:"vp-feature-item link",to:w,"aria-label":g},()=>y):i("div",{class:"vp-feature-item"},y)})):null])])};dd.displayName="FeaturePanel";var ti=dd;const pd=e=>{const{icon:t="",color:n,size:a}=e,o={};return n&&(o.color=n),a&&(o.height=Number.isNaN(Number(a))?a:`${a}px`),an(t)?i("img",{class:"icon",src:t,"no-view":"",style:o}):Ra(t)?i("img",{class:"icon",src:Ae(t),"aria-hidden":"","no-view":"",style:o}):i(tt("FontIcon"),e)};pd.displayName="HopeIcon";var gm=pd,bm=C({name:"HeroInfo",slots:Object,setup(e,{slots:t}){const n=be(),a=_n(),o=L(()=>n.value.heroFullScreen??!1),l=L(()=>{const{heroText:u,tagline:p}=n.value;return{text:u??a.value.title??"Hello",tagline:p??a.value.description??"",isFullScreen:o.value}}),s=L(()=>{const{heroText:u,heroImage:p,heroImageDark:h,heroAlt:m,heroImageStyle:_}=n.value;return{image:p?Ae(p):null,imageDark:h?Ae(h):null,heroStyle:_,alt:m||u||"hero image",isFullScreen:o.value}}),c=L(()=>{const{bgImage:u,bgImageDark:p,bgImageStyle:h}=n.value;return{image:qt(u)?Ae(u):null,imageDark:qt(p)?Ae(p):null,bgStyle:h,isFullScreen:o.value}}),d=L(()=>n.value.actions??[]);return()=>{var u,p,h;return i("header",{class:["vp-hero-info-wrapper",{fullscreen:o.value}]},[((u=t.heroBg)==null?void 0:u.call(t,c.value))||[c.value.image?i("div",{class:["vp-hero-mask",{light:c.value.imageDark}],style:[{"background-image":`url(${c.value.image})`},c.value.bgStyle]}):null,c.value.imageDark?i("div",{class:"vp-hero-mask dark",style:[{"background-image":`url(${c.value.imageDark})`},c.value.bgStyle]}):null],i("div",{class:"vp-hero-info"},[((p=t.heroImage)==null?void 0:p.call(t,s.value))||i(_e,{appear:!0,type:"group"},()=>[s.value.image?i("img",{key:"light",class:["vp-hero-image",{light:s.value.imageDark}],style:s.value.heroStyle,src:s.value.image,alt:s.value.alt}):null,s.value.imageDark?i("img",{key:"dark",class:"vp-hero-image dark",style:s.value.heroStyle,src:s.value.imageDark,alt:s.value.alt}):null]),((h=t.heroInfo)==null?void 0:h.call(t,l.value))??i("div",{class:"vp-hero-infos"},[l.value.text?i(_e,{appear:!0,delay:.04},()=>i("h1",{id:"main-title"},l.value.text)):null,l.value.tagline?i(_e,{appear:!0,delay:.08},()=>i("p",{id:"main-description",innerHTML:l.value.tagline})):null,d.value.length?i(_e,{appear:!0,delay:.12},()=>i("p",{class:"vp-hero-actions"},d.value.map(m=>i(Ue,{class:["vp-hero-action",m.type||"default"],config:m,noExternalLinkIcon:!0},m.icon?{before:()=>i(gm,{icon:m.icon})}:{})))):null])])])}}});const vd=(e,{slots:t})=>{var m,_,g;const{bgImage:n,bgImageDark:a,bgImageStyle:o,color:l,description:s,image:c,imageDark:d,header:u,highlights:p=[],type:h="un-order"}=e;return i("div",{class:"vp-highlight-wrapper",style:l?{color:l}:{}},[n?i("div",{class:["vp-highlight-bg",{light:a}],style:[{"background-image":`url(${n})`},o]}):null,a?i("div",{class:"vp-highlight-bg dark",style:[{"background-image":`url(${a})`},o]}):null,i("div",{class:"vp-highlight"},[((m=t.image)==null?void 0:m.call(t,e))||[c?i("img",{class:["vp-highlight-image",{light:d}],src:Ae(c),alt:u}):null,d?i("img",{class:"vp-highlight-image dark",src:Ae(d),alt:u}):null],((_=t.info)==null?void 0:_.call(t,e))||[i("div",{class:"vp-highlight-info-wrapper"},i("div",{class:"vp-highlight-info"},[u?i("h2",{class:"vp-highlight-header",innerHTML:u}):null,s?i("p",{class:"vp-highlight-description",innerHTML:s}):null,((g=t.highlights)==null?void 0:g.call(t,p))||i(h==="order"?"ol":h==="no-order"?"dl":"ul",{class:"vp-highlights"},p.map(({icon:E,title:w,details:y,link:T})=>{const k=[i(h==="no-order"?"dt":"h3",{class:"vp-highlight-title"},[E?i(Fe,{class:"vp-highlight-icon",icon:E}):null,i("span",{innerHTML:w})]),y?i(h==="no-order"?"dd":"p",{class:"vp-highlight-details",innerHTML:y}):null];return i(h==="no-order"?"div":"li",{class:["vp-highlight-item-wrapper",{link:T}]},T?v2(T)?i("a",{class:"vp-highlight-item link",href:T,"aria-label":w,target:"_blank"},k):i(Oe,{class:"vp-highlight-item link",to:T,"aria-label":w},()=>k):i("div",{class:"vp-highlight-item"},k))}))]))]])])};vd.displayName="HighlightPanel";var Em=vd,km=C({name:"HomePage",slots:Object,setup(e,{slots:t}){const n=En(),a=be(),o=L(()=>{const{features:s}=a.value;return ee(s)?s:null}),l=L(()=>{const{highlights:s}=a.value;return ee(s)?s:null});return()=>{var s,c,d,u;return i("main",{id:"main-content",class:["vp-project-home ",{pure:n.value}],"aria-labelledby":a.value.heroText===null?"":"main-title"},[(s=t.top)==null?void 0:s.call(t),i(bm),((c=l.value)==null?void 0:c.map(p=>"features"in p?i(ti,p):i(Em,p)))||(o.value?i(_e,{appear:!0,delay:.24},()=>i(ti,{features:o.value})):null),(d=t.center)==null?void 0:d.call(t),i(_e,{appear:!0,delay:.32},()=>i(El)),(u=t.bottom)==null?void 0:u.call(t)])}}}),ym=C({name:"BreadCrumb",setup(){const e=Ne(),t=ie(),n=Et(),a=be(),o=le(),l=je([]),s=L(()=>(a.value.breadcrumb||a.value.breadcrumb!==!1&&o.value.breadcrumb!==!1)&&l.value.length>1),c=L(()=>a.value.breadcrumbIcon||a.value.breadcrumbIcon!==!1&&o.value.breadcrumbIcon!==!1),d=()=>{const u=e.getRoutes(),p=fm(t.value.path,n.value).map(({link:h,name:m})=>{const _=u.find(g=>g.path===h);if(_){const{meta:g,path:E}=Fn(e,_.path);return{title:g[ke.shortTitle]||g[ke.title]||m,icon:g[ke.icon],path:E}}return null}).filter(h=>h!==null);p.length>1&&(l.value=p)};return fe(()=>{ue(()=>t.value.path,d,{immediate:!0})}),()=>i("nav",{class:["vp-breadcrumb",{disable:!s.value}]},s.value?i("ol",{vocab:"https://schema.org/",typeof:"BreadcrumbList"},l.value.map((u,p)=>i("li",{class:{"is-active":l.value.length-1===p},property:"itemListElement",typeof:"ListItem"},[i(Oe,{to:u.path,property:"item",typeof:"WebPage"},()=>[c.value?i(Fe,{icon:u.icon}):null,i("span",{property:"name"},u.title||"Unknown")]),i("meta",{property:"position",content:p+1})]))):[])}});const ni=e=>{const t=Ne();return e===!1?!1:ce(e)?qn(t,e,!0):Zn(e)?e:null},Sr=(e,t,n)=>{const a=e.findIndex(o=>o.link===t);if(a!==-1){const o=e[a+n];return o!=null&&o.link?o:null}for(const o of e)if(o.children){const l=Sr(o.children,t,n);if(l)return l}return null};var Lm=C({name:"PageNav",setup(){const e=le(),t=be(),n=gl(),a=ie(),o=Va(),l=L(()=>{const c=ni(t.value.prev);return c===!1?null:c||(e.value.prevLink===!1?null:Sr(n.value,a.value.path,-1))}),s=L(()=>{const c=ni(t.value.next);return c===!1?null:c||(e.value.nextLink===!1?null:Sr(n.value,a.value.path,1))});return Te("keydown",c=>{c.altKey&&(c.key==="ArrowRight"?s.value&&(o(s.value.link),c.preventDefault()):c.key==="ArrowLeft"&&l.value&&(o(l.value.link),c.preventDefault()))}),()=>l.value||s.value?i("nav",{class:"vp-page-nav"},[l.value?i(Ue,{class:"prev",config:l.value},()=>{var c,d;return[i("div",{class:"hint"},[i("span",{class:"arrow start"}),e.value.metaLocales.prev]),i("div",{class:"link"},[i(Fe,{icon:(c=l.value)==null?void 0:c.icon}),(d=l.value)==null?void 0:d.text])]}):null,s.value?i(Ue,{class:"next",config:s.value},()=>{var c,d;return[i("div",{class:"hint"},[e.value.metaLocales.next,i("span",{class:"arrow end"})]),i("div",{class:"link"},[(c=s.value)==null?void 0:c.text,i(Fe,{icon:(d=s.value)==null?void 0:d.icon})])]}):null]):null}});const Am={GitHub:":repo/edit/:branch/:path",GitLab:":repo/-/edit/:branch/:path",Gitee:":repo/edit/:branch/:path",Bitbucket:":repo/src/:branch/:path?mode=edit&spa=0&at=:branch&fileviewer=file-view-default"},wm=({docsRepo:e,docsBranch:t,docsDir:n,filePathRelative:a,editLinkPattern:o})=>{if(!a)return null;const l=Zc(e);let s;return o?s=o:l!==null&&(s=Am[l]),s?s.replace(/:repo/,an(e)?e:`https://github.com/${e}`).replace(/:branch/,t).replace(/:path/,hc(`${wo(n)}/${a}`)):null},Im=()=>{const e=le(),t=ie(),n=be();return L(()=>{const{repo:a,docsRepo:o=a,docsBranch:l="main",docsDir:s="",editLink:c,editLinkPattern:d=""}=e.value;if(!(n.value.editLink??c??!0)||!o)return null;const u=wm({docsRepo:o,docsBranch:l,docsDir:s,editLinkPattern:d,filePathRelative:t.value.filePathRelative});return u?{text:e.value.metaLocales.editLink,link:u}:null})},Tm=()=>{const e=_n(),t=le(),n=ie(),a=be();return L(()=>{var o,l;return!(a.value.lastUpdated??t.value.lastUpdated??!0)||!((o=n.value.git)!=null&&o.updatedTime)?null:new Date((l=n.value.git)==null?void 0:l.updatedTime).toLocaleString(e.value.lang)})},Dm=()=>{const e=le(),t=ie(),n=be();return L(()=>{var a;return n.value.contributors??e.value.contributors??!0?((a=t.value.git)==null?void 0:a.contributors)??null:null})};var Pm=C({name:"PageTitle",setup(){const e=ie(),t=be(),n=le(),{info:a,items:o}=O4();return()=>i("div",{class:"vp-page-title"},[i("h1",[n.value.titleIcon===!1?null:i(Fe,{icon:t.value.icon}),e.value.title]),i(sd,{info:a.value,...o.value===null?{}:{items:o.value}}),i("hr")])}});const hd=()=>i(re,{name:"edit"},()=>[i("path",{d:"M430.818 653.65a60.46 60.46 0 0 1-50.96-93.281l71.69-114.012 7.773-10.365L816.038 80.138A60.46 60.46 0 0 1 859.225 62a60.46 60.46 0 0 1 43.186 18.138l43.186 43.186a60.46 60.46 0 0 1 0 86.373L588.879 565.55l-8.637 8.637-117.466 68.234a60.46 60.46 0 0 1-31.958 11.229z"}),i("path",{d:"M728.802 962H252.891A190.883 190.883 0 0 1 62.008 771.98V296.934a190.883 190.883 0 0 1 190.883-192.61h267.754a60.46 60.46 0 0 1 0 120.92H252.891a69.962 69.962 0 0 0-69.098 69.099V771.98a69.962 69.962 0 0 0 69.098 69.098h475.911A69.962 69.962 0 0 0 797.9 771.98V503.363a60.46 60.46 0 1 1 120.922 0V771.98A190.883 190.883 0 0 1 728.802 962z"})]);hd.displayName="EditIcon";var Rm=C({name:"PageMeta",setup(){const e=le(),t=Im(),n=Tm(),a=Dm();return()=>{const{metaLocales:o}=e.value;return i("footer",{class:"page-meta"},[t.value?i("div",{class:"meta-item edit-link"},i(Ue,{class:"label",config:t.value},{before:()=>i(hd)})):null,i("div",{class:"meta-item git-info"},[n.value?i("div",{class:"update-time"},[i("span",{class:"label"},`${o.lastUpdated}: `),i(Io,()=>i("span",{class:"info"},n.value))]):null,a.value&&a.value.length?i("div",{class:"contributors"},[i("span",{class:"label"},`${o.contributors}: `),a.value.map(({email:l,name:s},c)=>[i("span",{class:"contributor",title:`email: ${l}`},s),c!==a.value.length-1?",":""])]):null])])}}}),Om=C({name:"NormalPage",slots:Object,setup(e,{slots:t}){const n=be(),a=ie(),{isDarkmode:o}=qa(),l=le(),s=L(()=>n.value.toc||n.value.toc!==!1&&l.value.toc!==!1);return()=>i("main",{id:"main-content",class:"vp-page"},i(ut("LocalEncrypt")?tt("LocalEncrypt"):Qc,()=>{var c,d,u,p;return[(c=t.top)==null?void 0:c.call(t),n.value.cover?i("img",{class:"page-cover",src:Ae(n.value.cover),alt:a.value.title,"no-view":""}):null,i(ym),i(Pm),s.value?i(id,{headerDepth:n.value.headerDepth??l.value.headerDepth??2},{before:()=>{var h;return(h=t.tocBefore)==null?void 0:h.call(t)},after:()=>{var h;return(h=t.tocAfter)==null?void 0:h.call(t)}}):null,(d=t.contentBefore)==null?void 0:d.call(t),i(El),(u=t.contentAfter)==null?void 0:u.call(t),i(Rm),i(Lm),ut("CommentService")?i(tt("CommentService"),{darkmode:o.value}):null,(p=t.bottom)==null?void 0:p.call(t)]}))}}),Sm=C({name:"Layout",slots:Object,setup(e,{slots:t}){const n=Jt(),a=le(),o=ie(),l=be(),{isMobile:s}=xa(),c=L(()=>{var d,u;return((d=a.value.blog)==null?void 0:d.sidebarDisplay)||((u=n.value.blog)==null?void 0:u.sidebarDisplay)||"mobile"});return()=>[i(kl),i(bl,{},{default:()=>{var d;return((d=t.default)==null?void 0:d.call(t))||(l.value.home?i(km):i(ud,()=>i(Om,{key:o.value.path},{top:()=>{var u;return(u=t.top)==null?void 0:u.call(t)},bottom:()=>{var u;return(u=t.bottom)==null?void 0:u.call(t)},contentBefore:()=>{var u;return(u=t.contentBefore)==null?void 0:u.call(t)},contentAfter:()=>{var u;return(u=t.contentAfter)==null?void 0:u.call(t)},tocBefore:()=>{var u;return(u=t.tocBefore)==null?void 0:u.call(t)},tocAfter:()=>{var u;return(u=t.tocAfter)==null?void 0:u.call(t)}})))},...c.value!=="none"?{navScreenBottom:()=>i(tt("BloggerInfo"))}:{},...!s.value&&c.value==="always"?{sidebar:()=>i(tt("BloggerInfo"))}:{}})]}}),Vm=C({name:"NotFoundHint",setup(){const e=le(),t=()=>{const n=e.value.routeLocales.notFoundMsg;return n[Math.floor(Math.random()*n.length)]};return()=>i("div",{class:"not-found-hint"},[i("p",{class:"error-code"},"404"),i("h1",{class:"error-title"},e.value.routeLocales.notFoundTitle),i("p",{class:"error-hint"},t())])}}),xm=C({name:"NotFound",slots:Object,setup(e,{slots:t}){const n=Et(),a=le(),{navigate:o}=Lr({to:a.value.home??n.value});return()=>[i(kl),i(bl,{noSidebar:!0},()=>{var l;return i("main",{id:"main-content",class:"vp-page not-found"},((l=t.default)==null?void 0:l.call(t))||[i(Vm),i("div",{class:"actions"},[i("button",{type:"button",class:"action-button",onClick:()=>{window.history.go(-1)}},a.value.routeLocales.back),i("button",{type:"button",class:"action-button",onClick:()=>o()},a.value.routeLocales.home)])])})]}});const qm={BiliBili:'<svg xmlns="http://www.w3.org/2000/svg" class="icon bilibili-icon" viewBox="0 0 1024 1024"><circle cx="512" cy="512" r="512" fill="#1296db"/><path fill="#fff" d="M745.363 177.725a47 47 0 0 1 0 66.3L702.5 286.85h44A141 141 0 0 1 887 427.512v281.25a141 141 0 0 1-141 140.626H277.25A141 141 0 0 1 137 708.763v-281.25a141 141 0 0 1 141-141h43.725l-42.788-42.825a47 47 0 1 1 66.263-66.3l99.45 99.45c2.963 2.962 5.438 6.187 7.425 9.637h120.487c1.988-3.45 4.5-6.75 7.463-9.675l99.413-99.45a47 47 0 0 1 66.3 0zm1.012 203.25h-468.75a47 47 0 0 0-46.763 43.388l-.112 3.525v281.25c0 24.712 19.125 44.962 43.387 46.724l3.488.15h468.75a47 47 0 0 0 46.763-43.387l.112-3.487v-281.25c0-26-21-47-47-46.876zm-375 93.75c26 0 47 21 47 47v47a47 47 0 1 1-93.75 0V521.6c0-26 21-47 47-47zm281.25 0c26 0 47 21 47 47v47a47 47 0 1 1-93.75 0V521.6c0-26 21-47 47-47z"/></svg>',Gitee:'<svg xmlns="http://www.w3.org/2000/svg" class="icon gitee-icon" viewBox="0 0 1024 1024"><circle cx="512" cy="512" r="512" fill="#C71D23"/><path fill="#fff" d="M772.953 454.723H480.17v.006a25.46 25.46 0 0 0-25.46 25.453l-.025 63.649a25.46 25.46 0 0 0 25.46 25.466l178.242-.007a25.46 25.46 0 0 1 25.459 25.46v12.73c0 42.18-34.198 76.378-76.378 76.378H365.583a25.46 25.46 0 0 1-25.46-25.46V416.533h-.006c0-42.18 34.192-76.378 76.378-76.378h356.388v-.013a25.46 25.46 0 0 0 25.46-25.446l.057-63.65h.013a25.46 25.46 0 0 0-25.46-25.471l-356.432.012c-105.453 0-190.946 85.493-190.946 190.946v356.433a25.46 25.46 0 0 0 25.46 25.46H626.56c94.913 0 171.852-76.94 171.852-171.852V480.182a25.46 25.46 0 0 0-25.46-25.46z"/></svg>',GitHub:'<svg xmlns="http://www.w3.org/2000/svg" class="icon github-icon" viewBox="0 0 1024 1024"><circle cx="512" cy="512" r="512" fill="#171515"/><path fill="#fff" d="M509.423 146.442c-200.317 0-362.756 162.42-362.756 362.8 0 160.266 103.936 296.24 248.109 344.217 18.139 3.327 24.76-7.872 24.76-17.486 0-8.613-.313-31.427-.49-61.702-100.912 21.923-122.205-48.63-122.205-48.63-16.495-41.91-40.28-53.067-40.28-53.067-32.937-22.51 2.492-22.053 2.492-22.053 36.407 2.566 55.568 37.386 55.568 37.386 32.362 55.438 84.907 39.43 105.58 30.143 3.296-23.444 12.667-39.43 23.032-48.498-80.557-9.156-165.246-40.28-165.246-179.297 0-39.604 14.135-71.988 37.342-97.348-3.731-9.178-16.18-46.063 3.556-96.009 0 0 30.46-9.754 99.76 37.19 28.937-8.048 59.97-12.071 90.823-12.211 30.807.14 61.843 4.165 90.822 12.21 69.26-46.944 99.663-37.189 99.663-37.189 19.792 49.946 7.34 86.831 3.61 96.01 23.25 25.359 37.29 57.742 37.29 97.347 0 139.366-84.82 170.033-165.637 179.013 13.026 11.2 24.628 33.342 24.628 67.182 0 48.498-.445 87.627-.445 99.521 0 9.702 6.535 20.988 24.945 17.444 144.03-48.067 247.881-183.95 247.881-344.175 0-200.378-162.442-362.798-362.802-362.798z"/></svg>',Gitlab:'<svg xmlns="http://www.w3.org/2000/svg" class="icon gitlab-icon" viewBox="0 0 1024 1024"><circle cx="512" cy="512" r="512" fill="#E8F0FF"/><path fill="#E24329" d="m512 808 110-340H402z"/><path fill="#FC6D26" d="M512 808 402 468H247z"/><path fill="#E24329" d="M247 468h155l-67-204c-4-11-19-11-22 0z"/><path fill="#FC6D26" d="m512 808 110-340h156z"/><path fill="#FCA326" d="m778 468 33 104c3 10-1 19-9 25L512 808z"/><path fill="#E24329" d="M778 468H622l68-204c3-11 18-11 21 0z"/><path fill="#FCA326" d="M512 808 222 597c-8-5-12-16-9-25l34-104z"/></svg>',QQ:'<svg xmlns="http://www.w3.org/2000/svg" class="icon qq-icon" viewBox="0 0 1024 1024"><circle cx="512" cy="512" r="512" fill="#5eaade"/><path fill="#fff" d="M805.25 585.542c-15-48.188-32.25-88.688-58.781-154.97 4.125-174.093-68.25-314.905-234.938-314.905-168.562 0-239.344 143.625-234.844 314.906-26.625 66.375-43.78 106.594-58.78 154.969-31.876 102.656-21.563 145.125-13.688 146.062 16.875 2.063 65.718-77.25 65.718-77.25 0 45.938 23.625 105.844 74.813 149.063-24.75 7.593-80.344 28.03-67.125 50.437 10.688 18.094 183.938 11.531 233.906 5.906 49.969 5.625 223.219 12.188 233.906-5.906 13.22-22.312-42.468-42.844-67.125-50.437 51.188-43.313 74.813-103.22 74.813-149.063 0 0 48.844 79.313 65.719 77.25 7.969-1.031 18.281-43.5-13.594-146.062z"/></svg>'},Cm={category:{"/":{path:"/category/",map:{使用指南:{path:"/category/%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97/",keys:["v-4eaf9f84","v-fffb8e28","v-4c863446","v-bf720700","v-0978b044"]},资源导航:{path:"/category/%E8%B5%84%E6%BA%90%E5%AF%BC%E8%88%AA/",keys:["v-ef7dd9f0"]},系统认证:{path:"/category/%E7%B3%BB%E7%BB%9F%E8%AE%A4%E8%AF%81/",keys:["v-d21282e8","v-c1340c6e","v-1e6b6908","v-fb605120"]},开发理论:{path:"/category/%E5%BC%80%E5%8F%91%E7%90%86%E8%AE%BA/",keys:["v-05b27368","v-b8bf9bb8","v-7ad57090","v-32401b5f","v-ec5223b4","v-48dcdeca","v-0d4f9864","v-f8115f44","v-a3c5a762","v-24c4e449","v-4a3fd089","v-b5ecb7da","v-68df3270","v-c516bfa4","v-3f273922","v-73004147","v-2a4571a2","v-1f68b428","v-6c74dbc9","v-adc57e62","v-4f1b6e86","v-04359808","v-b5b65d28","v-78a32a9b","v-69efa1be","v-0eb434c0","v-ca4160ee","v-129596a2","v-0ec3b421","v-110a0ad4","v-7edab2fb","v-d4cca062"]},设计模式:{path:"/category/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/",keys:["v-2014e344","v-d8e95536","v-5d8882a0","v-7a5d87ce","v-26071b05","v-5aed6ba6","v-fd9681c0","v-72940dc6","v-660b0285","v-6a6fd891","v-2b152058","v-4a6785aa","v-1902a411","v-5a65fcf4","v-8e59b74e","v-cf7f7ed0","v-3b93eb64","v-23dca26c","v-9fc6e360","v-6e251184","v-7dc0f6dd","v-05c85d75","v-60256d6b","v-4b4aaf4e","v-379fc8cc","v-72c7365c","v-32e615c6"]},开发流程:{path:"/category/%E5%BC%80%E5%8F%91%E6%B5%81%E7%A8%8B/",keys:["v-34f9e282","v-853d39a8","v-190f0eba","v-d1bc46ac","v-67e67766","v-4ad012fb","v-0ff14b76","v-a29da770","v-c419387c","v-dbe78e54","v-ec1da6c6"]},开源协议:{path:"/category/%E5%BC%80%E6%BA%90%E5%8D%8F%E8%AE%AE/",keys:["v-ff56eec2","v-31ef009c","v-771d6280","v-6c02a35d","v-349120b4"]},常用开发库:{path:"/category/%E5%B8%B8%E7%94%A8%E5%BC%80%E5%8F%91%E5%BA%93/",keys:["v-14eb65ee","v-6fef71b0","v-dbb17486","v-743e64ee","v-3389ec7d","v-ec231282","v-b40d6c2e","v-aab2d5b2","v-afbcd392","v-14db18d0"]},重构技巧:{path:"/category/%E9%87%8D%E6%9E%84%E6%8A%80%E5%B7%A7/",keys:["v-0fac4647","v-565d93a1"]},开发:{path:"/category/%E5%BC%80%E5%8F%91/",keys:["v-aa1adf3c","v-49814f88","v-220e54fa","v-11a0893e","v-5a66bf78","v-c8f78faa","v-2aaf51e5","v-3c11b823"]},"NoSQL ElasticSearch":{path:"/category/nosql-elasticsearch/",keys:["v-0246065e","v-4777caa4","v-6fe3b808","v-49b42386","v-af627080","v-0499355a","v-7643df78","v-1dab8451","v-1bf6abb2","v-1a41d313","v-188cfa74","v-e559e6c6","v-369c8bcf","v-a1d46856","v-f0ae5462","v-36621528","v-8fab6454","v-39bc0b56","v-48e1eb34","v-3ce741b4","v-52fe07ec","v-4b3665ba","v-4ea016f8","v-91bb51f6"]},"NoSQL MongoDB":{path:"/category/nosql-mongodb/",keys:["v-336c63aa","v-55e7b16c","v-3d4bda3e","v-ef2d670e","v-3fbdde98","v-5cd21616","v-edb6b08a","v-08c634e6","v-53709252","v-6d3a7b71","v-375e0411","v-85ec592c","v-3492596a","v-ab09914c","v-2480ea03","v-77488a11","v-7593b172","v-73ded8d3","v-722a0034","v-70752795","v-8a9f438c","v-ec480f68","v-3f190cd0"]},"NoSQL Redis":{path:"/category/nosql-redis/",keys:["v-59725a96","v-469a0776","v-7914a5ba","v-74cb7293","v-60ddbe48","v-4e459d68","v-70bb63fe","v-49dcf7ee","v-1a5b038b","v-6e4afc4c","v-5e95129b","v-0092b9e9","v-cba71f5a","v-41f8b388","v-78ae1878","v-1d4cc7ae","v-60238604","v-efe11898","v-7e45f676","v-17e9eeee","v-a6abd662","v-40aecaab"]},数据库原理:{path:"/category/%E6%95%B0%E6%8D%AE%E5%BA%93%E5%8E%9F%E7%90%86/",keys:["v-4d8be846","v-294c800a","v-ce8499bc","v-0189ba9b","v-b520a2fa"]},SQL语言:{path:"/category/sql%E8%AF%AD%E8%A8%80/",keys:["v-ed93b2c8","v-479dfaa4","v-0ca05f63","v-3ed84ea8"]},"SQL MySQL":{path:"/category/sql-mysql/",keys:["v-593b73d8","v-af64b6d8","v-e35854d0","v-402977d4","v-0ede1ea6","v-a73fe49c","v-58dc037c","v-05b20410","v-52116296","v-363dead7","v-6b7f2f62","v-42f2422e","v-1aacba26","v-089cd992"]},"Java 基础":{path:"/category/java-%E5%9F%BA%E7%A1%80/",keys:["v-38bdd5fc","v-58387c38","v-63ce1cd4","v-291e8560","v-189f4acc","v-d23382d2","v-3c09b854","v-29e9d384"]},"Java 集合":{path:"/category/java-%E9%9B%86%E5%90%88/",keys:["v-e6e1587c","v-7068a5d5","v-d718a9b2","v-77c7f0b5","v-07c1af0d","v-c7a49100","v-f973debe","v-44ff8903","v-f1a93e4e"]},"Java IO/NIO/AIO":{path:"/category/java-ionioaio/",keys:["v-ad7d3fdc","v-6eb505c1","v-3593583a","v-74aca148","v-2ba59b36","v-4d1780c2","v-47bd7701","v-1c8d45c8","v-c2e41070","v-91590982","v-dd6781f0","v-0f81c6ab","v-b17b64a2"]},"Java 新特性":{path:"/category/java-%E6%96%B0%E7%89%B9%E6%80%A7/",keys:["v-d219d59a","v-d58386d8","v-d8ed3816","v-dc56e954","v-dfc09a92","v-e32a4bd0","v-e693fd0e","v-e9fdae4c","v-b2739d00","v-13927007","v-76d5ebe5","v-56bca9f0","v-0db1e401","v-0dbdd390","v-d4064cb0","v-462b5b61","v-3292fb2e","v-59da0611","v-23c3b54a","v-0c4bedb4","v-364af0e6","v-cb1c4026","v-42fc1938","v-c32bfbf8","v-b5dd4e3e"]},"Java JVM":{path:"/category/java-jvm/",keys:["v-2c8cebb5","v-18eedada","v-526554b6","v-175b530c","v-3f7ab1cc","v-5ebaefb4","v-64225912","v-d1b45d9a","v-783acf81","v-7980977e","v-1ce727c4","v-ccc0a742","v-2c851e53","v-134b39c8","v-070878a4","v-c35eedb8","v-05ae10ef","v-0620a7ea","v-d2220394","v-16edf7b6"]},"Java 其他":{path:"/category/java-%E5%85%B6%E4%BB%96/",keys:["v-a489f7dc","v-5253f255"]},"Java 多线程":{path:"/category/java-%E5%A4%9A%E7%BA%BF%E7%A8%8B/",keys:["v-b7b80514","v-5bebca2c","v-99933d00","v-277d5092","v-6d0d4f46","v-5852c0a4","v-6a09898a","v-b49ab68c","v-3344b079","v-4289cd2a","v-55712db9","v-37193a74","v-616b765e","v-0e60e6be","v-680a9b6e","v-5f3a45a5","v-7a75b5c4","v-5e3906d9","v-4014464e","v-29327e8d","v-0d37dc6f","v-6dbf2df1","v-0cb2d779","v-15b7a148","v-9ba68da0","v-53ba6f7e","v-1549f7bc"]},算法和数据结构:{path:"/category/%E7%AE%97%E6%B3%95%E5%92%8C%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84/",keys:["v-722b3cb8","v-35074d01","v-76f8c038","v-04283655","v-213f690a","v-a8291ce0","v-7734c40a","v-3eae9060","v-1a357338","v-36312da3","v-650615b0","v-31be9fbf","v-7cf660e4","v-38904d9d","v-6d52f585","v-36343a0f","v-26e927ee","v-122bd9a8","v-fa200404","v-2138fc8a","v-76fe11a5","v-332ed69c","v-584451c1","v-1c134478","v-0cdb1ad2","v-cedcc65e","v-2ca438ac","v-96c4e2bc","v-be269f54","v-7e2afeaa","v-37a513a9","v-496c7e61","v-08212d9e","v-ae687ece","v-0a7bdf2a","v-588630e5","v-601746ae","v-12a17ece","v-c5e41c26","v-389c7e08","v-722b4f8e","v-1845fb09","v-3bdd9fde","v-5abdef58","v-03dcd98c","v-5d6c8a12","v-ca42b324","v-25cc54b8","v-1a33d184","v-7e737b03","v-e33b5360","v-53875b8f","v-31709ef9","v-46fae135","v-7ead82b0","v-65370d32","v-1ba9c2cc","v-17ccac6e","v-22a65513","v-b6f2d1a6"]},代码规范:{path:"/category/%E4%BB%A3%E7%A0%81%E8%A7%84%E8%8C%83/",keys:["v-4a5192c2","v-c0e64272","v-04990b56","v-377ff110"]},质量保障:{path:"/category/%E8%B4%A8%E9%87%8F%E4%BF%9D%E9%9A%9C/",keys:["v-3b419dbb","v-73731470","v-5db483f2","v-5a4ad2b4","v-404ec9ab","v-44b73af2","v-c9c030e6","v-0ec30915","v-6610f2c8","v-2f9ed901","v-b5b2dbc2","v-49af03c3"]}}},"/en/":{path:"/en/category/",map:{}}},tag:{"/":{path:"/tag/",map:{禁用:{path:"/tag/%E7%A6%81%E7%94%A8/",keys:["v-4c863446"]},文章加密:{path:"/tag/%E6%96%87%E7%AB%A0%E5%8A%A0%E5%AF%86/",keys:["v-bf720700"]},Markdown:{path:"/tag/markdown/",keys:["v-0978b044"]},页面配置:{path:"/tag/%E9%A1%B5%E9%9D%A2%E9%85%8D%E7%BD%AE/",keys:["v-4eaf9f84"]},使用指南:{path:"/tag/%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97/",keys:["v-4eaf9f84"]},资源导航:{path:"/tag/%E8%B5%84%E6%BA%90%E5%AF%BC%E8%88%AA/",keys:["v-ef7dd9f0"]},认证:{path:"/tag/%E8%AE%A4%E8%AF%81/",keys:["v-d21282e8","v-c1340c6e","v-1e6b6908","v-fb605120"]},CRON表达式:{path:"/tag/cron%E8%A1%A8%E8%BE%BE%E5%BC%8F/",keys:["v-0d4f9864","v-f8115f44"]},设计模式:{path:"/tag/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/",keys:["v-2014e344","v-d8e95536","v-5d8882a0","v-7a5d87ce","v-26071b05","v-5aed6ba6","v-fd9681c0","v-72940dc6","v-660b0285","v-6a6fd891","v-2b152058","v-4a6785aa","v-1902a411","v-5a65fcf4","v-8e59b74e","v-cf7f7ed0","v-3b93eb64","v-23dca26c","v-9fc6e360","v-6e251184","v-7dc0f6dd","v-05c85d75","v-60256d6b","v-4b4aaf4e","v-379fc8cc","v-72c7365c","v-32e615c6"]},开发流程:{path:"/tag/%E5%BC%80%E5%8F%91%E6%B5%81%E7%A8%8B/",keys:["v-34f9e282","v-853d39a8","v-190f0eba","v-d1bc46ac","v-67e67766","v-4ad012fb","v-0ff14b76","v-a29da770","v-c419387c","v-dbe78e54","v-ec1da6c6"]},协议:{path:"/tag/%E5%8D%8F%E8%AE%AE/",keys:["v-ff56eec2","v-31ef009c","v-771d6280","v-6c02a35d","v-349120b4"]},常用开发库:{path:"/tag/%E5%B8%B8%E7%94%A8%E5%BC%80%E5%8F%91%E5%BA%93/",keys:["v-14eb65ee","v-6fef71b0","v-dbb17486","v-743e64ee","v-3389ec7d","v-ec231282","v-b40d6c2e","v-aab2d5b2","v-afbcd392","v-14db18d0"]},网络协议:{path:"/tag/%E7%BD%91%E7%BB%9C%E5%8D%8F%E8%AE%AE/",keys:["v-4f1b6e86","v-04359808","v-b5b65d28","v-78a32a9b","v-69efa1be","v-0eb434c0","v-ca4160ee","v-129596a2","v-0ec3b421","v-110a0ad4","v-7edab2fb","v-d4cca062"]},常见重构技巧:{path:"/tag/%E5%B8%B8%E8%A7%81%E9%87%8D%E6%9E%84%E6%8A%80%E5%B7%A7/",keys:["v-0fac4647","v-565d93a1"]},正则表达式:{path:"/tag/%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F/",keys:["v-a3c5a762","v-24c4e449","v-4a3fd089"]},安全相关:{path:"/tag/%E5%AE%89%E5%85%A8%E7%9B%B8%E5%85%B3/",keys:["v-b5ecb7da","v-68df3270","v-c516bfa4","v-3f273922","v-73004147","v-2a4571a2","v-1f68b428","v-6c74dbc9","v-adc57e62"]},开发理论:{path:"/tag/%E5%BC%80%E5%8F%91%E7%90%86%E8%AE%BA/",keys:["v-05b27368","v-b8bf9bb8","v-7ad57090","v-32401b5f","v-ec5223b4","v-48dcdeca"]},随手记:{path:"/tag/%E9%9A%8F%E6%89%8B%E8%AE%B0/",keys:["v-aa1adf3c","v-49814f88","v-220e54fa","v-11a0893e","v-5a66bf78","v-c8f78faa","v-2aaf51e5","v-3c11b823"]},"NoSQL ElasticSearch":{path:"/tag/nosql-elasticsearch/",keys:["v-0246065e","v-4777caa4","v-6fe3b808","v-49b42386","v-af627080","v-0499355a","v-7643df78","v-1dab8451","v-1bf6abb2","v-1a41d313","v-188cfa74","v-e559e6c6","v-369c8bcf","v-a1d46856","v-f0ae5462","v-36621528","v-8fab6454","v-39bc0b56","v-48e1eb34","v-3ce741b4","v-52fe07ec","v-4b3665ba","v-4ea016f8","v-91bb51f6"]},"NoSQL MongoDB":{path:"/tag/nosql-mongodb/",keys:["v-336c63aa","v-55e7b16c","v-3d4bda3e","v-ef2d670e","v-3fbdde98","v-5cd21616","v-edb6b08a","v-08c634e6","v-53709252","v-6d3a7b71","v-375e0411","v-85ec592c","v-3492596a","v-ab09914c","v-2480ea03","v-77488a11","v-7593b172","v-73ded8d3","v-722a0034","v-70752795","v-8a9f438c","v-ec480f68","v-3f190cd0"]},"NoSQL Redis":{path:"/tag/nosql-redis/",keys:["v-59725a96","v-469a0776","v-7914a5ba","v-74cb7293","v-60ddbe48","v-4e459d68","v-70bb63fe","v-49dcf7ee","v-1a5b038b","v-6e4afc4c","v-5e95129b","v-0092b9e9","v-cba71f5a","v-41f8b388","v-78ae1878","v-1d4cc7ae","v-60238604","v-efe11898","v-7e45f676","v-17e9eeee","v-a6abd662","v-40aecaab"]},数据库原理:{path:"/tag/%E6%95%B0%E6%8D%AE%E5%BA%93%E5%8E%9F%E7%90%86/",keys:["v-4d8be846","v-294c800a","v-ce8499bc","v-0189ba9b","v-b520a2fa"]},SQL语言:{path:"/tag/sql%E8%AF%AD%E8%A8%80/",keys:["v-ed93b2c8","v-479dfaa4","v-0ca05f63","v-3ed84ea8"]},"SQL MySQL":{path:"/tag/sql-mysql/",keys:["v-593b73d8","v-af64b6d8","v-e35854d0","v-402977d4","v-0ede1ea6","v-a73fe49c","v-58dc037c","v-05b20410","v-52116296","v-363dead7","v-6b7f2f62","v-42f2422e","v-1aacba26","v-089cd992"]},"Java 基础":{path:"/tag/java-%E5%9F%BA%E7%A1%80/",keys:["v-38bdd5fc","v-58387c38","v-63ce1cd4","v-291e8560","v-189f4acc","v-d23382d2","v-3c09b854","v-29e9d384"]},"Java 集合":{path:"/tag/java-%E9%9B%86%E5%90%88/",keys:["v-e6e1587c","v-7068a5d5","v-d718a9b2","v-77c7f0b5","v-07c1af0d","v-c7a49100","v-f973debe","v-44ff8903","v-f1a93e4e"]},"Java IO/NIO/AIO":{path:"/tag/java-ionioaio/",keys:["v-ad7d3fdc","v-6eb505c1","v-3593583a","v-74aca148","v-2ba59b36","v-4d1780c2","v-47bd7701","v-1c8d45c8","v-c2e41070","v-91590982","v-dd6781f0","v-0f81c6ab","v-b17b64a2"]},"Java 新特性":{path:"/tag/java-%E6%96%B0%E7%89%B9%E6%80%A7/",keys:["v-d219d59a","v-d58386d8","v-d8ed3816","v-dc56e954","v-dfc09a92","v-e32a4bd0","v-e693fd0e","v-e9fdae4c","v-b2739d00","v-13927007","v-76d5ebe5","v-56bca9f0","v-0db1e401","v-0dbdd390","v-d4064cb0","v-462b5b61","v-3292fb2e","v-59da0611","v-23c3b54a","v-0c4bedb4","v-364af0e6","v-cb1c4026","v-42fc1938","v-c32bfbf8","v-b5dd4e3e"]},"Java JVM":{path:"/tag/java-jvm/",keys:["v-2c8cebb5","v-18eedada","v-526554b6","v-175b530c","v-3f7ab1cc","v-5ebaefb4","v-64225912","v-d1b45d9a","v-783acf81","v-7980977e","v-1ce727c4","v-ccc0a742","v-2c851e53","v-134b39c8","v-070878a4","v-c35eedb8","v-05ae10ef","v-0620a7ea","v-d2220394","v-16edf7b6"]},"Java 其他":{path:"/tag/java-%E5%85%B6%E4%BB%96/",keys:["v-a489f7dc","v-5253f255"]},"Java 多线程":{path:"/tag/java-%E5%A4%9A%E7%BA%BF%E7%A8%8B/",keys:["v-b7b80514","v-5bebca2c","v-99933d00","v-277d5092","v-6d0d4f46","v-5852c0a4","v-6a09898a","v-b49ab68c","v-3344b079","v-4289cd2a","v-55712db9","v-37193a74","v-616b765e","v-0e60e6be","v-680a9b6e","v-5f3a45a5","v-7a75b5c4","v-5e3906d9","v-4014464e","v-29327e8d","v-0d37dc6f","v-6dbf2df1","v-0cb2d779","v-15b7a148","v-9ba68da0","v-53ba6f7e","v-1549f7bc"]},数据结构:{path:"/tag/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84/",keys:["v-5abdef58","v-03dcd98c","v-5d6c8a12","v-ca42b324","v-25cc54b8","v-1a33d184","v-7e737b03","v-e33b5360","v-53875b8f","v-31709ef9","v-46fae135","v-7ead82b0","v-65370d32","v-1ba9c2cc","v-17ccac6e","v-22a65513","v-b6f2d1a6"]},算法思想:{path:"/tag/%E7%AE%97%E6%B3%95%E6%80%9D%E6%83%B3/",keys:["v-2ca438ac","v-96c4e2bc","v-be269f54","v-7e2afeaa","v-37a513a9","v-496c7e61","v-08212d9e"]},领域算法:{path:"/tag/%E9%A2%86%E5%9F%9F%E7%AE%97%E6%B3%95/",keys:["v-35074d01","v-76f8c038","v-04283655","v-213f690a","v-a8291ce0","v-7734c40a","v-3eae9060","v-1a357338","v-36312da3","v-650615b0","v-31be9fbf","v-7cf660e4","v-38904d9d","v-6d52f585","v-36343a0f","v-26e927ee","v-122bd9a8","v-fa200404","v-2138fc8a","v-76fe11a5","v-332ed69c","v-584451c1","v-1c134478","v-0cdb1ad2","v-cedcc65e"]},其他:{path:"/tag/%E5%85%B6%E4%BB%96/",keys:["v-722b3cb8"]},排序算法:{path:"/tag/%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95/",keys:["v-ae687ece","v-0a7bdf2a","v-588630e5","v-601746ae","v-12a17ece","v-c5e41c26","v-389c7e08","v-722b4f8e","v-1845fb09","v-3bdd9fde"]},代码规范:{path:"/tag/%E4%BB%A3%E7%A0%81%E8%A7%84%E8%8C%83/",keys:["v-4a5192c2","v-c0e64272","v-04990b56","v-377ff110"]},代码质量:{path:"/tag/%E4%BB%A3%E7%A0%81%E8%B4%A8%E9%87%8F/",keys:["v-3b419dbb","v-73731470","v-5db483f2","v-5a4ad2b4","v-404ec9ab","v-44b73af2","v-c9c030e6","v-0ec30915","v-6610f2c8","v-2f9ed901","v-b5b2dbc2","v-49af03c3"]}}},"/en/":{path:"/en/tag/",map:{}}}},Mm={article:{"/":{path:"/article/",keys:["v-4eaf9f84","v-076107ee","v-36a31b6e","v-079fbb4c","v-ac9cd224","v-0861c992","v-08c5b901","v-594613fd","v-53fd68e9","v-78fccfb6","v-01b09d50","v-a1d88988","v-2086f614","v-4082a728","v-79fb4142","v-dbe1e3c4","v-76fef118","v-557eeeb7","v-6af7d4da","v-5864771c","v-0ea3ab36","v-fe55a6b4","v-29c0178e","v-0cae1790","v-263c5511","v-6ea76909","v-4934c82e","v-0dcd2eba","v-6d3be62a","v-0e503981","v-74bc627b","v-7d72c4ac","v-7e25fb5f","v-fffb8e28","v-4c863446","v-bf720700","v-0978b044","v-2250a72e","v-14f73021","v-acebc5a4","v-30c465ed","v-2e496290","v-2720156a","v-7ec73772","v-24ff8d05","v-0246065e","v-4777caa4","v-6fe3b808","v-49b42386","v-af627080","v-0499355a","v-7643df78","v-1dab8451","v-1bf6abb2","v-1a41d313","v-188cfa74","v-e559e6c6","v-369c8bcf","v-a1d46856","v-f0ae5462","v-36621528","v-8fab6454","v-39bc0b56","v-48e1eb34","v-3ce741b4","v-52fe07ec","v-4b3665ba","v-4ea016f8","v-91bb51f6","v-336c63aa","v-55e7b16c","v-3d4bda3e","v-ef2d670e","v-3fbdde98","v-5cd21616","v-edb6b08a","v-08c634e6","v-53709252","v-6d3a7b71","v-375e0411","v-85ec592c","v-3492596a","v-ab09914c","v-2480ea03","v-77488a11","v-7593b172","v-73ded8d3","v-722a0034","v-70752795","v-8a9f438c","v-ec480f68","v-3f190cd0","v-59725a96","v-469a0776","v-7914a5ba","v-74cb7293","v-60ddbe48","v-4e459d68","v-70bb63fe","v-49dcf7ee","v-1a5b038b","v-6e4afc4c","v-5e95129b","v-0092b9e9","v-cba71f5a","v-41f8b388","v-78ae1878","v-1d4cc7ae","v-60238604","v-efe11898","v-7e45f676","v-17e9eeee","v-a6abd662","v-40aecaab","v-593b73d8","v-af64b6d8","v-e35854d0","v-402977d4","v-0ede1ea6","v-a73fe49c","v-58dc037c","v-05b20410","v-52116296","v-363dead7","v-6b7f2f62","v-42f2422e","v-1aacba26","v-089cd992","v-ed93b2c8","v-479dfaa4","v-0ca05f63","v-4d8be846","v-3ed84ea8","v-294c800a","v-ce8499bc","v-0189ba9b","v-b520a2fa","v-a489f7dc","v-5253f255","v-2c8cebb5","v-18eedada","v-526554b6","v-175b530c","v-3f7ab1cc","v-5ebaefb4","v-64225912","v-d1b45d9a","v-783acf81","v-7980977e","v-1ce727c4","v-ccc0a742","v-2c851e53","v-134b39c8","v-070878a4","v-c35eedb8","v-05ae10ef","v-0620a7ea","v-d2220394","v-16edf7b6","v-d219d59a","v-d58386d8","v-d8ed3816","v-dc56e954","v-dfc09a92","v-e32a4bd0","v-e693fd0e","v-e9fdae4c","v-b2739d00","v-13927007","v-76d5ebe5","v-56bca9f0","v-0db1e401","v-0dbdd390","v-d4064cb0","v-462b5b61","v-3292fb2e","v-59da0611","v-23c3b54a","v-0c4bedb4","v-364af0e6","v-cb1c4026","v-42fc1938","v-c32bfbf8","v-b5dd4e3e","v-ad7d3fdc","v-6eb505c1","v-3593583a","v-74aca148","v-2ba59b36","v-4d1780c2","v-47bd7701","v-1c8d45c8","v-c2e41070","v-91590982","v-dd6781f0","v-0f81c6ab","v-b17b64a2","v-b7b80514","v-5bebca2c","v-99933d00","v-277d5092","v-6d0d4f46","v-5852c0a4","v-6a09898a","v-b49ab68c","v-3344b079","v-4289cd2a","v-55712db9","v-37193a74","v-616b765e","v-0e60e6be","v-680a9b6e","v-5f3a45a5","v-7a75b5c4","v-5e3906d9","v-4014464e","v-29327e8d","v-0d37dc6f","v-6dbf2df1","v-0cb2d779","v-15b7a148","v-9ba68da0","v-53ba6f7e","v-1549f7bc","v-e6e1587c","v-7068a5d5","v-d718a9b2","v-77c7f0b5","v-07c1af0d","v-c7a49100","v-f973debe","v-44ff8903","v-f1a93e4e","v-38bdd5fc","v-58387c38","v-63ce1cd4","v-291e8560","v-189f4acc","v-d23382d2","v-4a5192c2","v-3c09b854","v-c0e64272","v-29e9d384","v-04990b56","v-377ff110","v-2014e344","v-d8e95536","v-5d8882a0","v-7a5d87ce","v-26071b05","v-5aed6ba6","v-fd9681c0","v-72940dc6","v-660b0285","v-6a6fd891","v-2b152058","v-4a6785aa","v-1902a411","v-5a65fcf4","v-8e59b74e","v-cf7f7ed0","v-3b93eb64","v-23dca26c","v-9fc6e360","v-6e251184","v-7dc0f6dd","v-05c85d75","v-60256d6b","v-4b4aaf4e","v-379fc8cc","v-72c7365c","v-32e615c6","v-d21282e8","v-c1340c6e","v-1e6b6908","v-fb605120","v-ff56eec2","v-31ef009c","v-771d6280","v-6c02a35d","v-349120b4","v-722b3cb8","v-35074d01","v-76f8c038","v-04283655","v-213f690a","v-a8291ce0","v-7734c40a","v-3eae9060","v-1a357338","v-36312da3","v-650615b0","v-31be9fbf","v-7cf660e4","v-38904d9d","v-6d52f585","v-36343a0f","v-26e927ee","v-122bd9a8","v-fa200404","v-2138fc8a","v-76fe11a5","v-332ed69c","v-584451c1","v-1c134478","v-0cdb1ad2","v-cedcc65e","v-2ca438ac","v-96c4e2bc","v-be269f54","v-7e2afeaa","v-37a513a9","v-496c7e61","v-08212d9e","v-ae687ece","v-0a7bdf2a","v-588630e5","v-601746ae","v-12a17ece","v-c5e41c26","v-389c7e08","v-722b4f8e","v-1845fb09","v-3bdd9fde","v-5abdef58","v-03dcd98c","v-5d6c8a12","v-ca42b324","v-25cc54b8","v-1a33d184","v-7e737b03","v-e33b5360","v-53875b8f","v-31709ef9","v-46fae135","v-7ead82b0","v-65370d32","v-1ba9c2cc","v-17ccac6e","v-22a65513","v-b6f2d1a6","v-34f9e282","v-853d39a8","v-190f0eba","v-d1bc46ac","v-67e67766","v-4ad012fb","v-0ff14b76","v-a29da770","v-c419387c","v-dbe78e54","v-ec1da6c6","v-05b27368","v-b8bf9bb8","v-7ad57090","v-32401b5f","v-ec5223b4","v-48dcdeca","v-aa1adf3c","v-49814f88","v-220e54fa","v-11a0893e","v-5a66bf78","v-c8f78faa","v-2aaf51e5","v-3c11b823","v-0fac4647","v-0d4f9864","v-565d93a1","v-f8115f44","v-a3c5a762","v-24c4e449","v-4a3fd089","v-b5ecb7da","v-68df3270","v-c516bfa4","v-3f273922","v-73004147","v-2a4571a2","v-1f68b428","v-6c74dbc9","v-adc57e62","v-4f1b6e86","v-04359808","v-b5b65d28","v-78a32a9b","v-69efa1be","v-0eb434c0","v-ca4160ee","v-129596a2","v-0ec3b421","v-110a0ad4","v-7edab2fb","v-d4cca062","v-3b419dbb","v-73731470","v-5db483f2","v-5a4ad2b4","v-404ec9ab","v-44b73af2","v-c9c030e6","v-0ec30915","v-6610f2c8","v-2f9ed901","v-b5b2dbc2","v-14eb65ee","v-49af03c3","v-6fef71b0","v-dbb17486","v-743e64ee","v-3389ec7d","v-ec231282","v-b40d6c2e","v-aab2d5b2","v-afbcd392","v-14db18d0","v-ef7dd9f0"]},"/en/":{path:"/en/article/",keys:["v-50a4c495"]}},star:{"/":{path:"/star/",keys:["v-4eaf9f84"]},"/en/":{path:"/en/star/",keys:[]}},timeline:{"/":{path:"/timeline/",keys:["v-076107ee","v-36a31b6e","v-079fbb4c","v-ac9cd224","v-0861c992","v-08c5b901","v-594613fd","v-53fd68e9","v-78fccfb6","v-01b09d50","v-a1d88988","v-2086f614","v-4082a728","v-79fb4142","v-dbe1e3c4","v-76fef118","v-557eeeb7","v-6af7d4da","v-5864771c","v-0ea3ab36","v-fe55a6b4","v-29c0178e","v-0cae1790","v-263c5511","v-6ea76909","v-4934c82e","v-0dcd2eba","v-6d3be62a","v-0e503981","v-74bc627b","v-7d72c4ac","v-7e25fb5f","v-fffb8e28","v-4c863446","v-bf720700","v-0978b044","v-2250a72e","v-14f73021","v-acebc5a4","v-30c465ed","v-2e496290","v-2720156a","v-7ec73772","v-24ff8d05","v-0246065e","v-4777caa4","v-6fe3b808","v-49b42386","v-af627080","v-0499355a","v-7643df78","v-1dab8451","v-1bf6abb2","v-1a41d313","v-188cfa74","v-e559e6c6","v-369c8bcf","v-a1d46856","v-f0ae5462","v-36621528","v-8fab6454","v-39bc0b56","v-48e1eb34","v-3ce741b4","v-52fe07ec","v-4b3665ba","v-4ea016f8","v-91bb51f6","v-336c63aa","v-55e7b16c","v-3d4bda3e","v-ef2d670e","v-3fbdde98","v-5cd21616","v-edb6b08a","v-08c634e6","v-53709252","v-6d3a7b71","v-375e0411","v-85ec592c","v-3492596a","v-ab09914c","v-2480ea03","v-77488a11","v-7593b172","v-73ded8d3","v-722a0034","v-70752795","v-8a9f438c","v-ec480f68","v-3f190cd0","v-59725a96","v-469a0776","v-7914a5ba","v-74cb7293","v-60ddbe48","v-4e459d68","v-70bb63fe","v-49dcf7ee","v-1a5b038b","v-6e4afc4c","v-5e95129b","v-0092b9e9","v-cba71f5a","v-41f8b388","v-78ae1878","v-1d4cc7ae","v-60238604","v-efe11898","v-7e45f676","v-17e9eeee","v-a6abd662","v-40aecaab","v-593b73d8","v-af64b6d8","v-e35854d0","v-402977d4","v-0ede1ea6","v-a73fe49c","v-58dc037c","v-05b20410","v-52116296","v-363dead7","v-6b7f2f62","v-42f2422e","v-1aacba26","v-089cd992","v-ed93b2c8","v-479dfaa4","v-0ca05f63","v-4d8be846","v-3ed84ea8","v-294c800a","v-ce8499bc","v-0189ba9b","v-b520a2fa","v-a489f7dc","v-5253f255","v-2c8cebb5","v-18eedada","v-526554b6","v-175b530c","v-3f7ab1cc","v-5ebaefb4","v-64225912","v-d1b45d9a","v-783acf81","v-7980977e","v-1ce727c4","v-ccc0a742","v-2c851e53","v-134b39c8","v-070878a4","v-c35eedb8","v-05ae10ef","v-0620a7ea","v-d2220394","v-16edf7b6","v-d219d59a","v-d58386d8","v-d8ed3816","v-dc56e954","v-dfc09a92","v-e32a4bd0","v-e693fd0e","v-e9fdae4c","v-b2739d00","v-13927007","v-76d5ebe5","v-56bca9f0","v-0db1e401","v-0dbdd390","v-d4064cb0","v-462b5b61","v-3292fb2e","v-59da0611","v-23c3b54a","v-0c4bedb4","v-364af0e6","v-cb1c4026","v-42fc1938","v-c32bfbf8","v-b5dd4e3e","v-ad7d3fdc","v-6eb505c1","v-3593583a","v-74aca148","v-2ba59b36","v-4d1780c2","v-47bd7701","v-1c8d45c8","v-c2e41070","v-91590982","v-dd6781f0","v-0f81c6ab","v-b17b64a2","v-b7b80514","v-5bebca2c","v-99933d00","v-277d5092","v-6d0d4f46","v-5852c0a4","v-6a09898a","v-b49ab68c","v-3344b079","v-4289cd2a","v-55712db9","v-37193a74","v-616b765e","v-0e60e6be","v-680a9b6e","v-5f3a45a5","v-7a75b5c4","v-5e3906d9","v-4014464e","v-29327e8d","v-0d37dc6f","v-6dbf2df1","v-0cb2d779","v-15b7a148","v-9ba68da0","v-53ba6f7e","v-1549f7bc","v-e6e1587c","v-7068a5d5","v-d718a9b2","v-77c7f0b5","v-07c1af0d","v-c7a49100","v-f973debe","v-44ff8903","v-f1a93e4e","v-38bdd5fc","v-58387c38","v-63ce1cd4","v-291e8560","v-189f4acc","v-d23382d2","v-4a5192c2","v-3c09b854","v-c0e64272","v-29e9d384","v-04990b56","v-377ff110","v-4eaf9f84","v-2014e344","v-d8e95536","v-5d8882a0","v-7a5d87ce","v-26071b05","v-5aed6ba6","v-fd9681c0","v-72940dc6","v-660b0285","v-6a6fd891","v-2b152058","v-4a6785aa","v-1902a411","v-5a65fcf4","v-8e59b74e","v-cf7f7ed0","v-3b93eb64","v-23dca26c","v-9fc6e360","v-6e251184","v-7dc0f6dd","v-05c85d75","v-60256d6b","v-4b4aaf4e","v-379fc8cc","v-72c7365c","v-32e615c6","v-d21282e8","v-c1340c6e","v-1e6b6908","v-fb605120","v-ff56eec2","v-31ef009c","v-771d6280","v-6c02a35d","v-349120b4","v-722b3cb8","v-35074d01","v-76f8c038","v-04283655","v-213f690a","v-a8291ce0","v-7734c40a","v-3eae9060","v-1a357338","v-36312da3","v-650615b0","v-31be9fbf","v-7cf660e4","v-38904d9d","v-6d52f585","v-36343a0f","v-26e927ee","v-122bd9a8","v-fa200404","v-2138fc8a","v-76fe11a5","v-332ed69c","v-584451c1","v-1c134478","v-0cdb1ad2","v-cedcc65e","v-2ca438ac","v-96c4e2bc","v-be269f54","v-7e2afeaa","v-37a513a9","v-496c7e61","v-08212d9e","v-ae687ece","v-0a7bdf2a","v-588630e5","v-601746ae","v-12a17ece","v-c5e41c26","v-389c7e08","v-722b4f8e","v-1845fb09","v-3bdd9fde","v-5abdef58","v-03dcd98c","v-5d6c8a12","v-ca42b324","v-25cc54b8","v-1a33d184","v-7e737b03","v-e33b5360","v-53875b8f","v-31709ef9","v-46fae135","v-7ead82b0","v-65370d32","v-1ba9c2cc","v-17ccac6e","v-22a65513","v-b6f2d1a6","v-34f9e282","v-853d39a8","v-190f0eba","v-d1bc46ac","v-67e67766","v-4ad012fb","v-0ff14b76","v-a29da770","v-c419387c","v-dbe78e54","v-ec1da6c6","v-05b27368","v-b8bf9bb8","v-7ad57090","v-32401b5f","v-ec5223b4","v-48dcdeca","v-aa1adf3c","v-49814f88","v-220e54fa","v-11a0893e","v-5a66bf78","v-c8f78faa","v-2aaf51e5","v-3c11b823","v-0fac4647","v-0d4f9864","v-565d93a1","v-f8115f44","v-a3c5a762","v-24c4e449","v-4a3fd089","v-b5ecb7da","v-68df3270","v-c516bfa4","v-3f273922","v-73004147","v-2a4571a2","v-1f68b428","v-6c74dbc9","v-adc57e62","v-4f1b6e86","v-04359808","v-b5b65d28","v-78a32a9b","v-69efa1be","v-0eb434c0","v-ca4160ee","v-129596a2","v-0ec3b421","v-110a0ad4","v-7edab2fb","v-d4cca062","v-3b419dbb","v-73731470","v-5db483f2","v-5a4ad2b4","v-404ec9ab","v-44b73af2","v-c9c030e6","v-0ec30915","v-6610f2c8","v-2f9ed901","v-b5b2dbc2","v-14eb65ee","v-49af03c3","v-6fef71b0","v-dbb17486","v-743e64ee","v-3389ec7d","v-ec231282","v-b40d6c2e","v-aab2d5b2","v-afbcd392","v-14db18d0","v-ef7dd9f0"]},"/en/":{path:"/en/timeline/",keys:["v-50a4c495"]}}},ai=H(Cm),md=(e="")=>{const t=ie(),n=Ne(),a=Et();return L(()=>{var d;const o=e||((d=be().value.blog)==null?void 0:d.key)||"";if(!o)return console.warn("useBlogCategory: key not found"),{path:"/",map:{}};const l=n.getRoutes();if(!ai.value[o])throw new Error(`useBlogCategory: key ${o} is invalid`);const s=ai.value[o][a.value],c={path:s.path,map:{}};for(const u in s.map){const p=s.map[u];c.map[u]={path:p.path,items:[]};for(const h of p.keys){const m=l.find(({name:_})=>_===h);if(m){const _=Fn(n,m.path);c.map[u].items.push({path:_.path,info:_.meta})}}t.value.path===p.path&&(c.currentItems=c.map[u].items)}return c})},oi=H(Mm),So=(e="")=>{const t=Ne(),n=Et();return L(()=>{var c;const a=e||((c=be().value.blog)==null?void 0:c.key)||"";if(!a)return console.warn("useBlogType: key not found"),{path:"/",items:[]};if(!oi.value[a])throw new Error(`useBlogType: key ${e} is invalid`);const o=t.getRoutes(),l=oi.value[a][n.value],s={path:l.path,items:[]};for(const d of l.keys){const u=o.find(({name:p})=>p===d);if(u){const p=Fn(t,u.path);s.items.push({path:p.path,info:p.meta})}}return s})};var jm=[];const _d=Symbol.for("categoryMap"),Ca=()=>{const e=me(_d);if(!e)throw new Error("useCategoryMap() is called without provider.");return e},Jm=()=>{const e=md("category");it(_d,e)},Ma=()=>{const e=Jt(),t=le();return L(()=>({...e.value.blog,...t.value.blog}))},fd=Symbol.for("tagMap"),ja=()=>{const e=me(fd);if(!e)throw new Error("useTagMap() is called without provider.");return e},Bm=()=>{const e=md("tag");it(fd,e)},Nm=e=>{const t=le();return L(()=>{const{[ke.author]:n}=e.value;return n?ya(n):n===!1?[]:ya(t.value.author,!1)})},$m=e=>{const t=Ca();return L(()=>Wc(e.value[ke.category]).map(n=>({name:n,path:t.value.map[n].path})))},Qm=e=>{const t=ja();return L(()=>Gc(e.value[ke.tag]).map(n=>({name:n,path:t.value.map[n].path})))},Fm=e=>L(()=>{const{[ke.date]:t}=e.value;return il(t)}),Hm=e=>{const t=Gn(e,"info"),n=Ma(),a=Nm(t),o=$m(t),l=Qm(t),s=Fm(t),c=Pu(),d=L(()=>({author:a.value,category:o.value,date:s.value,localizedDate:t.value[ke.localizedDate]||"",tag:l.value,isOriginal:t.value[ke.isOriginal]||!1,readingTime:t.value[ke.readingTime]||null,readingTimeLocale:t.value[ke.readingTime]&&c.value?Du(t.value[ke.readingTime],c.value):null,pageview:e.path})),u=L(()=>n.value.articleInfo);return{info:d,items:u}},gd=Symbol(""),Ja=()=>{const e=me(gd);if(!e)throw new Error("useArticles() is called without provider.");return e},zm=()=>{const e=So("article");it(gd,e)},bd=Symbol(""),yl=()=>{const e=me(bd);if(!e)throw new Error("useStars() is called without provider.");return e},Um=()=>{const e=So("star");it(bd,e)},Ed=Symbol(""),Ll=()=>{const e=me(Ed);if(!e)throw new Error("useTimelines() is called without provider.");return e},Wm=()=>{const e=So("timeline"),t=L(()=>{const n=[];return e.value.items.forEach(({info:a,path:o})=>{const l=il(a[ke.date]),s=l==null?void 0:l.getFullYear(),c=l?l.getMonth()+1:null,d=l==null?void 0:l.getDate();s&&c&&d&&((!n[0]||n[0].year!==s)&&n.unshift({year:s,items:[]}),n[0].items.push({date:`${c}/${d}`,info:a,path:o}))}),{...e.value,config:n.reverse()}});it(Ed,t)},Gm=()=>{zm(),Jm(),Um(),Bm(),Wm()};var Km=C({name:"SocialMedia",setup(){const e=Ma(),t=En(),n=L(()=>{const a=e.value.medias;return a?fn(a).map(([o,l])=>({name:o,icon:qm[o],url:l})):[]});return()=>n.value.length?i("div",{class:"vp-social-medias"},n.value.map(({name:a,icon:o,url:l})=>i("a",{class:"vp-social-media",href:l,rel:"noopener noreferrer",target:"_blank","aria-label":a,...t.value?{}:{"data-balloon-pos":"up"},innerHTML:o}))):null}}),Al=C({name:"BloggerInfo",setup(){const e=Ma(),t=_n(),n=le(),a=Ja(),o=Ca(),l=ja(),s=Ll(),c=Va(),d=L(()=>{var m;return e.value.name||((m=ya(n.value.author)[0])==null?void 0:m.name)||t.value.title}),u=L(()=>e.value.avatar||n.value.logo),p=L(()=>n.value.blogLocales),h=L(()=>e.value.intro);return()=>{const{article:m,category:_,tag:g,timeline:E}=p.value,w=[[a.value.path,a.value.items.length,m],[o.value.path,Ge(o.value.map).length,_],[l.value.path,Ge(l.value.map).length,g],[s.value.path,s.value.items.length,E]];return i("div",{class:"vp-blogger-info",vocab:"https://schema.org/",typeof:"Person"},[i("div",{class:"vp-blogger",...h.value?{style:{cursor:"pointer"},"aria-label":p.value.intro,"data-balloon-pos":"down",role:"link",onClick:()=>c(h.value)}:{}},[u.value?i("img",{class:["vp-blogger-avatar",{round:e.value.roundAvatar}],src:Ae(u.value),property:"image",alt:"Blogger Avatar",loading:"lazy"}):null,d.value?i("div",{class:"vp-blogger-name",property:"name"},d.value):null,e.value.description?i("div",{class:"vp-blogger-description",innerHTML:e.value.description}):null,h.value?i("meta",{property:"url",content:Ae(h.value)}):null]),i("div",{class:"vp-blog-counts"},w.map(([y,T,k])=>i(Oe,{class:"vp-blog-count",to:y},()=>[i("div",{class:"count"},T),i("div",k)]))),i(Km)])}}});const wl=()=>i(re,{name:"category"},()=>i("path",{d:"M148.41 106.992h282.176c22.263 0 40.31 18.048 40.31 40.31V429.48c0 22.263-18.047 40.31-40.31 40.31H148.41c-22.263 0-40.311-18.047-40.311-40.31V147.302c0-22.263 18.048-40.31 40.311-40.31zM147.556 553.478H429.73c22.263 0 40.311 18.048 40.311 40.31v282.176c0 22.263-18.048 40.312-40.31 40.312H147.555c-22.263 0-40.311-18.049-40.311-40.312V593.79c0-22.263 18.048-40.311 40.31-40.311zM593.927 106.992h282.176c22.263 0 40.31 18.048 40.31 40.31V429.48c0 22.263-18.047 40.31-40.31 40.31H593.927c-22.263 0-40.311-18.047-40.311-40.31V147.302c0-22.263 18.048-40.31 40.31-40.31zM730.22 920.502H623.926c-40.925 0-74.22-33.388-74.22-74.425V623.992c0-41.038 33.387-74.424 74.425-74.424h222.085c41.038 0 74.424 33.226 74.424 74.067v114.233c0 10.244-8.304 18.548-18.547 18.548s-18.548-8.304-18.548-18.548V623.635c0-20.388-16.746-36.974-37.33-36.974H624.13c-20.585 0-37.331 16.747-37.331 37.33v222.086c0 20.585 16.654 37.331 37.126 37.331H730.22c10.243 0 18.547 8.304 18.547 18.547 0 10.244-8.304 18.547-18.547 18.547z"}));wl.displayName="CategoryIcon";const Il=()=>i(re,{name:"tag"},()=>i("path",{d:"M939.902 458.563L910.17 144.567c-1.507-16.272-14.465-29.13-30.737-30.737L565.438 84.098h-.402c-3.215 0-5.726 1.005-7.634 2.913l-470.39 470.39a10.004 10.004 0 000 14.164l365.423 365.424c1.909 1.908 4.42 2.913 7.132 2.913s5.223-1.005 7.132-2.913l470.39-470.39c2.01-2.11 3.014-5.023 2.813-8.036zm-240.067-72.121c-35.458 0-64.286-28.828-64.286-64.286s28.828-64.285 64.286-64.285 64.286 28.828 64.286 64.285-28.829 64.286-64.286 64.286z"}));Il.displayName="TagIcon";const Tl=()=>i(re,{name:"timeline"},()=>i("path",{d:"M511.997 70.568c-243.797 0-441.429 197.633-441.429 441.435 0 243.797 197.632 441.429 441.43 441.429S953.431 755.8 953.431 512.002c0-243.796-197.637-441.434-441.435-441.434zm150.158 609.093-15.605 15.61c-8.621 8.615-22.596 8.615-31.215 0L472.197 552.126c-4.95-4.944-4.34-14.888-4.34-24.677V247.14c0-12.19 9.882-22.07 22.07-22.07h22.07c12.19 0 22.07 9.882 22.07 22.07v273.218l128.088 128.088c8.62 8.62 8.62 22.595 0 31.215zm0 0"}));Tl.displayName="TimelineIcon";const kd=()=>i(re,{name:"slides"},()=>i("path",{d:"M896 170.667v426.666a85.333 85.333 0 0 1-85.333 85.334h-256v61.184l192.597 115.584-43.861 73.13-148.736-89.173v95.275h-85.334v-95.318l-148.736 89.216-43.861-73.13 192.597-115.627v-61.141h-256A85.333 85.333 0 0 1 128 597.333V170.667H85.333V85.333h853.334v85.334H896zm-682.667 0v426.666h597.334V170.667H213.333zM426.667 512h-85.334V341.333h85.334V512zm128 0h-85.334V256h85.334v256zm128 0h-85.334V384h85.334v128z"}));kd.displayName="SlideIcon";const yd=()=>i(re,{name:"sticky"},()=>[i("path",{d:"m381.3 733.8l-161.9 118c-5.9 4.5-13.2 6.6-20.1 6.6-8.7 0-17.7-3.4-24.3-10-12.2-12.2-13.9-31.3-3.5-45.2l144.5-195.5-113.6-112.9c-11.1-11.1-13.2-28.4-5.5-42 5.5-8.7 52.1-76.4 155.5-51 1.8 0.3 3.5 0.3 5.6 0.7 4.2 0.3 9 0.7 14.2 1.7 21.9 3.5 60.8-13.9 94.5-42.7 32.3-27.5 53.1-59.4 53.1-81.6 0-5.2 0-10.8-0.3-16-0.7-20.8-2.1-52.8 21.5-76.4 28.1-28.1 72.9-30.6 103.9-5.2 0.6 0.3 1 1 1.7 1.7 16.7 16.3 187.5 187.2 189.3 188.9 14.5 14.6 22.9 34.4 22.9 55.3 0 20.8-8 40.2-22.9 54.8-23.7 23.6-56 22.6-77.1 21.6-4.9 0-10.5-0.4-15.7-0.4-20.8 0-45.8 14.6-70.5 41.3-34.3 37.5-55.5 85.8-53.8 107.7 0.7 6.9 2.1 19.1 2.4 20.8 25 101.4-42.7 147.6-50.7 152.8-13.9 8.4-31.6 6.3-42.7-4.8l-112.1-112.2z"})]);yd.displayName="StickyIcon";const Vo=()=>i(re,{name:"article"},()=>i("path",{d:"M853.333 938.667H170.667A42.667 42.667 0 0 1 128 896V128a42.667 42.667 0 0 1 42.667-42.667h682.666A42.667 42.667 0 0 1 896 128v768a42.667 42.667 0 0 1-42.667 42.667zm-42.666-85.334V170.667H213.333v682.666h597.334zM298.667 256h170.666v170.667H298.667V256zm0 256h426.666v85.333H298.667V512zm0 170.667h426.666V768H298.667v-85.333zm256-384h170.666V384H554.667v-85.333z"}));Vo.displayName="ArticleIcon";const Ld=()=>i(re,{name:"book"},()=>i("path",{d:"M256 853.333h426.667A85.333 85.333 0 0 0 768 768V256a85.333 85.333 0 0 0-85.333-85.333H469.333a42.667 42.667 0 0 1 0-85.334h213.334A170.667 170.667 0 0 1 853.333 256v512a170.667 170.667 0 0 1-170.666 170.667H213.333A42.667 42.667 0 0 1 170.667 896V128a42.667 42.667 0 0 1 42.666-42.667h128A42.667 42.667 0 0 1 384 128v304.256l61.653-41.088a42.667 42.667 0 0 1 47.36 0l61.654 41.045V256A42.667 42.667 0 0 1 640 256v256a42.667 42.667 0 0 1-66.347 35.499l-104.32-69.547-104.32 69.547A42.667 42.667 0 0 1 298.667 512V170.667H256v682.666z"}));Ld.displayName="BookIcon";const Ad=()=>i(re,{name:"link"},()=>i("path",{d:"M460.8 584.533c17.067 17.067 17.067 42.667 0 59.734-17.067 17.066-42.667 17.066-59.733 0-85.334-85.334-85.334-217.6 0-302.934L554.667 192C640 110.933 776.533 110.933 857.6 196.267c81.067 81.066 81.067 213.333 0 294.4l-68.267 64c0-34.134-4.266-68.267-17.066-102.4l21.333-21.334c51.2-46.933 55.467-128 4.267-179.2s-128-55.466-179.2-4.266c-4.267 0-4.267 4.266-4.267 4.266L465.067 401.067c-51.2 51.2-51.2 132.266-4.267 183.466m123.733-183.466C601.6 384 627.2 384 644.267 401.067c85.333 85.333 85.333 217.6 0 302.933l-153.6 149.333C405.333 934.4 268.8 934.4 187.733 849.067c-81.066-81.067-81.066-213.334 0-294.4l68.267-64c0 34.133 4.267 72.533 17.067 102.4L251.733 614.4C204.8 665.6 204.8 746.667 256 793.6c51.2 46.933 123.733 46.933 174.933 0l149.334-149.333c51.2-51.2 51.2-128 0-179.2-12.8-17.067-17.067-46.934 4.266-64z"}));Ad.displayName="LinkIcon";const wd=()=>i(re,{name:"project"},()=>i("path",{d:"M987.456 425.152H864V295.296a36.48 36.48 0 0 0-36.544-36.544h-360l-134.08-128.256A9.344 9.344 0 0 0 327.04 128H36.48A36.48 36.48 0 0 0 0 164.544v676.608a36.48 36.48 0 0 0 36.544 36.544h797.76a36.672 36.672 0 0 0 33.92-22.848L1021.44 475.52a36.48 36.48 0 0 0-33.92-50.304zM82.304 210.304h215.424l136.64 130.752h347.328v84.096H198.848A36.672 36.672 0 0 0 164.928 448L82.304 652.8V210.304zM808.32 795.456H108.544l118.08-292.608h699.904L808.32 795.52z"}));wd.displayName="ProjectIcon";const Id=()=>i(re,{name:"friend"},()=>i("path",{d:"M860.16 213.333A268.373 268.373 0 0 0 512 186.027a267.52 267.52 0 0 0-348.16 404.48L428.8 855.893a118.613 118.613 0 0 0 166.4 0l264.96-265.386a267.52 267.52 0 0 0 0-377.174zM800 531.627l-264.96 264.96a32.427 32.427 0 0 1-46.08 0L224 530.347a183.04 183.04 0 0 1 0-256 182.187 182.187 0 0 1 256 0 42.667 42.667 0 0 0 60.587 0 182.187 182.187 0 0 1 256 0 183.04 183.04 0 0 1 3.413 256z"}));Id.displayName="FriendIcon";const Vr=()=>i(re,{name:"slide-down"},()=>i("path",{d:"M108.775 312.23c13.553 0 27.106 3.734 39.153 11.806l375.205 250.338 363.641-252.808c32.587-21.624 76.499-12.83 98.123 19.757 21.685 32.467 12.95 76.56-19.576 98.184l-402.854 278.89c-23.733 15.901-54.694 15.962-78.547.12L69.501 442.097c-32.647-21.685-41.441-65.777-19.817-98.304 13.734-20.54 36.201-31.563 59.09-31.563Z"}));Vr.displayName="SlideDownIcon";const Td=()=>i("svg",{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",class:"empty-icon",viewBox:"0 0 1024 1024",innerHTML:'<defs><linearGradient id="f" x1="512.342" y1="2266.13" x2="512.342" y2="666.063" gradientUnits="userSpaceOnUse"><stop offset=".919" stop-color="#e6e6e6" stop-opacity="0"/><stop offset="1" stop-color="#e6e6e6"/></linearGradient><linearGradient id="g" x1="528.912" y1="774" x2="388.088" y2="612" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ccc"/><stop offset="1" stop-color="#e6e6e6" stop-opacity="0"/></linearGradient><linearGradient id="h" x1="213.219" y1="721.704" x2="251.313" y2="683.61" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#d7d7d7"/><stop offset=".485" stop-color="#fafafa"/><stop offset="1" stop-color="#fafafa"/></linearGradient><linearGradient id="i" x1="724.813" y1="821.718" x2="768.656" y2="777.876" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ccc"/><stop offset="1" stop-color="#fafafa"/></linearGradient><linearGradient id="a" x1="513.493" y1="714.594" x2="471.007" y2="544.188" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#999"/><stop offset="1" stop-color="#ccc"/></linearGradient><linearGradient id="b" x1="440.156" y1="564.031" x2="508.594" y2="495.594" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ccc"/><stop offset="1" stop-color="#f0f0f0"/></linearGradient><linearGradient id="l" x1="660.988" y1="754.156" x2="608.637" y2="544.188" xlink:href="#a"/><linearGradient id="m" x1="479.188" y1="774.219" x2="649.782" y2="603.625" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#b3b3b3"/><stop offset="1" stop-color="#e6e6e6"/></linearGradient><linearGradient id="n" x1="447.121" y1="774.219" x2="394.661" y2="563.813" xlink:href="#a"/><linearGradient id="o" x1="494" y1="597" x2="628" y2="463" xlink:href="#b"/><linearGradient id="d" x1="610.485" y1="604.938" x2="697.298" y2="518.125" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ccc"/><stop offset="1" stop-color="#fff"/></linearGradient><linearGradient id="p" x1="457.438" y1="619.25" x2="353.469" y2="619.25" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#e6e6e6" stop-opacity="0"/><stop offset="1" stop-color="#e6e6e6"/></linearGradient><linearGradient id="q" x1="542.734" y1="674.25" x2="615.672" y2="601.313" xlink:href="#b"/><linearGradient id="c" x1="627.933" y1="358.938" x2="685.192" y2="422.531" gradientUnits="userSpaceOnUse"><stop offset=".4" stop-color="#e6e6e6" stop-opacity=".4"/><stop offset=".443" stop-color="#fff"/><stop offset=".6" stop-color="#ccc"/></linearGradient><linearGradient id="r" x1="618.547" y1="422.531" x2="681.547" y2="359.531" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#e6e6e6"/><stop offset=".761" stop-color="#fff"/><stop offset="1" stop-color="#f0f0f0"/></linearGradient><linearGradient id="s" x1="625" y1="441.5" x2="697" y2="369.5" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ccc"/><stop offset=".761" stop-color="#fff"/><stop offset="1" stop-color="#f0f0f0"/></linearGradient><linearGradient id="t" x1="627.681" y1="361.438" x2="692.257" y2="433.156" xlink:href="#c"/><linearGradient id="u" x1="561.414" y1="735.438" x2="573.149" y2="688.375" xlink:href="#d"/><linearGradient id="v" x1="405" y1="485.875" x2="440" y2="450.875" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ccc"/><stop offset="1" stop-color="#fff" stop-opacity=".702"/></linearGradient><linearGradient id="w" x1="404.61" y1="486.906" x2="441.86" y2="449.656" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ccc"/><stop offset=".495" stop-color="#ccc" stop-opacity=".702"/><stop offset=".498" stop-color="#ccc"/><stop offset="1" stop-color="#fff" stop-opacity=".302"/></linearGradient><radialGradient id="e" cx="329.297" cy="647.578" r="8.172" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fafafa"/><stop offset="1.2" stop-color="#e6e6e6"/></radialGradient><radialGradient id="j" cx="802.297" cy="673.578" r="8.172" xlink:href="#e"/><radialGradient id="k" cx="774.844" cy="642.75" r="5.531" xlink:href="#e"/></defs><path d="M512.33 666.07c441.828 0 800 358.18 800 800.03s-358.172 800.02-800 800.02-800-358.18-800-800.02 358.17-800.03 800-800.03z" style="fill:url(#f);fill-rule:evenodd"/><path d="m272 694 242-82 131 119-188 43z" style="fill:url(#g);fill-rule:evenodd"/><path fill="#b3b3b3" fill-rule="evenodd" d="M232.391 723.534a2.4 2.4 0 0 1 2.4 2.4v17.725a2.4 2.4 0 0 1-4.8 0v-17.725a2.4 2.4 0 0 1 2.4-2.4z"/><path d="M232.255 676.559c10.33 0 17.067 15.408 18.7 28.493 1.619 12.942-2.372 23.694-18.7 23.694-16.878 0-20.213-10.733-18.7-23.694 1.633-14.061 8.37-28.493 18.7-28.493z" style="fill:url(#h);fill-rule:evenodd"/><path fill="#b3b3b3" fill-rule="evenodd" d="M745.853 826h.938a2.4 2.4 0 0 1 2.4 2.4v22.238a2.4 2.4 0 0 1-2.4 2.4h-.938a2.4 2.4 0 0 1-2.4-2.4V828.4a2.4 2.4 0 0 1 2.4-2.4z"/><path d="M746.727 830.3c-19.438 0-23.278-9.326-21.541-20.59a34.467 34.467 0 0 1 3.289-10.369 16.628 16.628 0 0 1 0-9.112c2.889-12.327 12.059-20.911 18.356-20.911 6.56 0 15.468 9.1 18.356 20.911a14.589 14.589 0 0 1-.335 9.217 34.36 34.36 0 0 1 3.419 10.264c1.861 11.243-2.735 20.59-21.544 20.59z" style="fill:url(#i);fill-rule:evenodd"/><path fill="#ccc" fill-rule="evenodd" d="M328.841 654.562a6.571 6.571 0 0 0-5.2-5.027q-4.107-.952-.034-2.045a6.571 6.571 0 0 0 5.027-5.2q.952-4.109 2.045-.035a6.569 6.569 0 0 0 5.2 5.027q4.109.954.035 2.045a6.569 6.569 0 0 0-5.027 5.2q-.955 4.108-2.046.035z"/><path d="M328.383 653.73a6.567 6.567 0 0 0-5.2-5.027q-4.109-.954-.035-2.045a6.568 6.568 0 0 0 5.027-5.2q.954-4.107 2.046-.034a6.568 6.568 0 0 0 5.2 5.027q4.107.952.035 2.045a6.568 6.568 0 0 0-5.027 5.2q-.954 4.104-2.046.034z" style="fill:url(#e);fill-rule:evenodd"/><path fill="#ccc" fill-rule="evenodd" d="M801.841 680.562a6.571 6.571 0 0 0-5.2-5.027q-4.107-.952-.034-2.045a6.571 6.571 0 0 0 5.027-5.2q.952-4.109 2.045-.035a6.569 6.569 0 0 0 5.2 5.027q4.108.954.035 2.045a6.569 6.569 0 0 0-5.027 5.2q-.955 4.108-2.046.035z"/><path d="M801.383 679.73a6.567 6.567 0 0 0-5.2-5.027q-4.108-.954-.035-2.045a6.568 6.568 0 0 0 5.027-5.2q.954-4.107 2.046-.034a6.568 6.568 0 0 0 5.2 5.027q4.107.952.035 2.045a6.568 6.568 0 0 0-5.027 5.2q-.954 4.104-2.046.034z" style="fill:url(#j);fill-rule:evenodd"/><path d="M774.21 646.9a4.446 4.446 0 0 0-3.517-3.4q-2.778-.643-.023-1.383a4.443 4.443 0 0 0 3.4-3.517q.645-2.778 1.383-.023a4.443 4.443 0 0 0 3.517 3.4q2.778.645.023 1.383a4.446 4.446 0 0 0-3.4 3.517q-.645 2.78-1.383.023z" style="fill:url(#k);fill-rule:evenodd"/><path d="m385.6 714.6.158-150.658L598.9 544.174l-.158 150.658z" style="fill:url(#a);fill-rule:evenodd"/><path d="m385.474 564.031 214.763-19.383-36.171-49.067-215.559 17.634z" style="fill:url(#b);fill-rule:evenodd"/><path d="m598.744 694.832.156-150.658 71.975 59.319-.158 150.658z" style="fill:url(#l);fill-rule:evenodd"/><path d="m457.064 774.209.158-150.658 214.691-19.914-.158 150.663z" style="fill:url(#m);fill-rule:evenodd"/><path d="m384.566 714.459.158-150.659 72.5 59.75-.158 150.658z" style="fill:url(#n);fill-rule:evenodd"/><path d="M494 640s75.357-58.4 42-83-38.887 1.663-37 14 53.847 12.465 54-26c.2-49.979 75-125 75-125" style="fill:none;stroke-width:3px;stroke-dasharray:12 6;stroke:url(#o);fill-rule:evenodd"/><path d="m670.275 604.939-72.041-59.9 38.476-26.909 72.86 58.159z" style="fill:url(#d);fill-rule:evenodd"/><path d="m425.5 674.383-72.042-59.9 31.109-50.347 72.86 58.16z" style="fill:url(#p);fill-rule:evenodd"/><path d="m487.918 674.235 214.482-22.57-31.1-50.346-215.309 20.833z" style="fill:url(#q);fill-rule:evenodd"/><path style="fill:#fff;fill-rule:evenodd" d="m697.363 358.927-69.58 62.511-12.035 1.082z"/><path d="m697.363 358.927-69.58 62.511-12.035 1.082z" style="fill:url(#c);fill-rule:evenodd"/><path d="M615.748 422.52 604 413l92.089-53.46" style="fill:url(#r);fill-rule:evenodd"/><path d="m625 432 12 18 60-89" style="fill:url(#s);fill-rule:evenodd"/><path d="m626.98 421.335-2.471 11.828 70.918-71.735" style="fill:#fff;fill-rule:evenodd"/><path d="m626.98 421.335-2.471 11.828 70.918-71.735" style="fill:url(#t);fill-rule:evenodd"/><path d="m494.814 735.44 21.293-2.1v-6.613l-13.4 1.319v-6.965l10.977-1.08v-6.613l-10.977 1.08v-6.084l12.917-1.27v-6.525l-20.808 2.047v32.8zM521 732.863l7.054-.694v-11.241a106.361 106.361 0 0 0-1.014-11.274l.176-.017 2.645 7.586 4.453 11.553 4.32-.425 4.408-12.424 2.733-8.116.177-.018a111.811 111.811 0 0 0-1.014 11.474v11.241l7.185-.707V697l-8.552.841-5.025 14.646c-.618 1.956-1.147 4.08-1.808 6.173l-.22.022c-.617-1.968-1.146-3.987-1.808-5.818l-5.2-13.639-8.508.837v32.8zm37.213-3.661 7.891-.776v-10.889l3.835-.377c6.922-.681 12.961-4.714 12.961-12.517 0-8.111-5.951-10.082-13.181-9.371l-11.504 1.128v32.8zm7.891-17.881v-9.478l3.218-.316c3.792-.373 5.908.565 5.908 3.871 0 3.218-1.852 5.208-5.687 5.585zM594 725.682l7.891-.777v-26.274l8.905-.876v-6.524l-25.657 2.524v6.524l8.861-.871v26.274zm27.991-2.754 7.847-.772v-11.594l9.919-22.18-8.244.811-2.733 7.542c-.925 2.56-1.807 4.939-2.733 7.587l-.176.018c-.926-2.466-1.764-4.676-2.645-7.058l-2.734-7-8.375.824 9.874 20.233v11.594z" style="fill:url(#u);fill-rule:evenodd"/><path fill="#ccc" fill-rule="evenodd" d="M408.938 457.309a17.5 17.5 0 0 0 21.374 26.725 17.5 17.5 0 1 1-16.306-30.955 17.442 17.442 0 0 0-5.068 4.23z"/><circle cx="422.5" cy="468.375" r="17.5" style="fill:url(#v)"/><path fill="#ccc" fill-rule="evenodd" d="M391.76 451.5c-2.358 4.419 9.827 15.52 27.215 24.8 15.131 8.071 29.212 12.1 34.166 10.093-4.191 2.772-18.943-1.24-34.86-9.73-17.388-9.275-29.573-20.376-27.215-24.8a2.96 2.96 0 0 1 1.585-1.3 2.606 2.606 0 0 0-.891.937z"/><path d="M418.975 476.29c-17.388-9.275-29.573-20.376-27.215-24.8s18.363-.484 35.751 8.791 29.572 20.376 27.215 24.8-18.364.483-35.751-8.791zm31.634 5.732c1.824-3.42-8.789-12.642-23.7-20.6s-28.486-11.633-30.31-8.213 8.789 12.642 23.7 20.6 28.486 11.633 30.31 8.213zm-36.645-29.008-2.775 1.452.032 1.751 28.637 14.183.266-4.559z" style="fill:url(#w);fill-rule:evenodd"/><g class="people"><path style="fill:#f8cfad;fill-rule:evenodd" d="m612.131 676.5 1.362 3.532 3.255-2.324-1.361-3.532zM629.131 665.5l1.362 3.532 3.255-2.324-1.361-3.532z"/><path style="fill:#141a33;fill-rule:evenodd" d="m617.764 678.184-3.162-.078a11.028 11.028 0 0 0-1.034 3.454c-.258 2.006-1.177 5-.449 5.367 1.5 2.659 4.118-.215 4.118-.215s2.187-2.848 1.925-5.265c-.106-.973-1.181-1.869-1.398-3.263zM633.781 665.855l3.019.945a11.008 11.008 0 0 1-.137 3.6c-.4 1.981-.179 4.166-.986 4.277-2.283 2.03-3.827-1.533-3.827-1.533s-1.473-2.456-.444-4.659c.412-.88 1.718-1.385 2.375-2.63z"/><path style="fill:#f0c5a8;fill-rule:evenodd" d="M599.935 592.534s10.293 9.761 11.95 7.564 3.536-3.463-6.758-13.65z"/><path style="fill:#f8cfad;fill-rule:evenodd" d="M611.3 596.361c1.674-1.105 11.5 7.048 14.5 11.774s-12.705-4.36-14.632-6.776-1.54-3.893.132-4.998z"/><path style="fill:#f8cfad;fill-rule:evenodd" d="M621.815 607.988s1.809 2.549 2.433 1.756 2.475-1.064 2.449-1.138.1-.819 1.288-2.331-3.8-3.632-5.81-.494a2.556 2.556 0 0 0-.36 2.207z"/><path fill="#232c57" fill-rule="evenodd" d="M598 617s14.968-5.618 17 7a150.235 150.235 0 0 1 2 22s12.666 11.836 16 19c0 0-4.753-1.629-4 2 0 0-18.132-14.647-19-19s-9.148-18.716-12-31z"/><path d="M589 622s14.968-5.618 17 7a150.235 150.235 0 0 1 2 22s4.666 17.836 8 25c0 0-4.753-1.629-4 2 0 0-10.132-20.647-11-25s-9.148-18.716-12-31z" style="fill:#292966;fill-rule:evenodd"/><path style="fill:#f0c5a8;fill-rule:evenodd" d="M585.626 597.7s-10.292 9.761-11.95 7.563-3.536-3.463 6.758-13.65z"/><path style="fill:#f8cfad;fill-rule:evenodd" d="M574.259 601.529c-1.675-1.105-11.5 7.049-14.5 11.774s12.7-4.36 14.631-6.775 1.543-3.894-.131-4.999z"/><path style="fill:#f0c5a8;fill-rule:evenodd" d="M591.715 577.752s-.606 1.681 1.48 3.716-3.615 5.307-4.645 2.85-.48-2.716-.48-2.716z"/><path style="fill:#f8cfad;fill-rule:evenodd" d="M583.527 574.123c-.839 1.043.491 3.873 1.453 5.449s2.749 2.833 3.364 2.428 4.088-2.657 4-4-.228-3.4-.228-3.4 2.562-1.641 2.154-2.916-2.916-.154-2.916-.154a15.853 15.853 0 0 0-.227-2.224c-.189-.929-6.887-1.445-7.827 2.6s.558 1.805.227 2.217z"/><path fill="#232c57" fill-rule="evenodd" d="M584.227 567.758c2.1-.885 7.2-3.684 10.125.318s.842 4.385.989 5.294-1.894 5.69-1.341 6.63-3.865.8-4.657-1.179-2.844-.539-2.227-1.224-1.3-4.456-2.916-2.154a9.252 9.252 0 0 0 .309-1.38c-.115.192.259-3.257-.673-1.32s-2.1 1.037-3.069.762-1.8-1.118-1.071-1.689c.023-.016 2.436-3.172 4.531-4.058z"/><path d="M589 585c-2.584-.47-10.055.362-13 13 0 0 1.9 3.349 5 4s6 21 6 21 24.016 11.06 27-3c-.07-13.826-8-21-8-21s5.829-3.2 5-6-8.016-10.153-11-10-6 0-6 0-2.416 2.47-5 2z" style="fill:#f6bb07;fill-rule:evenodd"/><path style="fill:#f8cfad;fill-rule:evenodd" d="M563.284 612.581s-.986 2.965-1.814 2.389-2.678-.3-2.675-.374-.333-.755-1.912-1.854 2.577-4.583 5.414-2.167a2.551 2.551 0 0 1 .987 2.006z"/></g>'});Td.displayName="EmptyIcon";const Dd=()=>i(re,{name:"lock"},()=>i("path",{d:"M787.168 952.268H236.832c-30.395 0-55.033-24.638-55.033-55.033V429.45c0-30.395 24.638-55.034 55.033-55.034h82.55V264.35c0-106.38 86.238-192.618 192.618-192.618S704.618 157.97 704.618 264.35v110.066h82.55c30.395 0 55.033 24.639 55.033 55.034v467.785c0 30.395-24.639 55.033-55.033 55.033zM484.483 672.046v115.122h55.034V672.046c31.99-11.373 55.033-41.605 55.033-77.496 0-45.592-36.958-82.55-82.55-82.55s-82.55 36.958-82.55 82.55c0 35.89 23.042 66.123 55.033 77.496zM622.067 264.35c0-60.788-49.28-110.067-110.067-110.067s-110.067 49.28-110.067 110.067v110.066h220.135V264.35z"}));Dd.displayName="LockIcon";var Xm=C({name:"ArticleItem",props:{info:{type:Object,required:!0},path:{type:String,required:!0}},slots:Object,setup(e,{slots:t}){const n=Gn(e,"info"),{info:a,items:o}=Hm(e);return()=>{var m,_,g;const{[ke.title]:l,[ke.type]:s,[ke.isEncrypted]:c=!1,[ke.cover]:d,[ke.excerpt]:u,[ke.sticky]:p}=n.value,h=a.value;return i("div",{class:"vp-article-wrapper"},i("article",{class:"vp-article-item",vocab:"https://schema.org/",typeof:"Article"},[((m=t.cover)==null?void 0:m.call(t,{cover:d}))||(d?[i("img",{class:"vp-article-cover",src:Ae(d),loading:"lazy"}),i("meta",{property:"image",content:Ae(d)})]:[]),p?i(yd):null,i(Oe,{to:e.path},()=>{var E;return((E=t.title)==null?void 0:E.call(t,{title:l,isEncrypted:c,type:s}))||i("header",{class:"vp-article-title"},[c?i(Dd):null,s===Cu.slide?i(kd):null,i("span",{property:"headline"},l)])}),((_=t.excerpt)==null?void 0:_.call(t,{excerpt:u}))||(u?i("div",{class:"vp-article-excerpt",innerHTML:u}):null),i("hr",{class:"vp-article-hr"}),((g=t.info)==null?void 0:g.call(t,{info:h}))||i(sd,{info:h,...o.value?{items:o.value}:{}})]))}}}),Zm=C({name:"Pagination",props:{total:{type:Number,default:10},perPage:{type:Number,default:10},current:{type:Number,default:1}},emits:["updateCurrentPage"],setup(e,{emit:t}){let n;const a=le(),o=H(""),l=L(()=>a.value.paginationLocales),s=L(()=>Math.ceil(e.total/e.perPage)),c=L(()=>!!s.value&&s.value!==1),d=L(()=>s.value<7?!1:e.current>4),u=L(()=>s.value<7?!1:e.current<s.value-3),p=L(()=>{const{current:_}=e;let g=1,E=s.value;const w=[];s.value>=7&&(_<=4&&_<s.value-3?(g=1,E=5):_>4&&_>=s.value-3?(E=s.value,g=s.value-4):s.value>7&&(g=_-2,E=_+2));for(let y=g;y<=E;y++)w.push(y);return w}),h=_=>t("updateCurrentPage",_),m=_=>{const g=parseInt(_);g<=s.value&&g>0?h(g):n.pop(`<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path d="M64 512a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z" fill="#FA5151"/><path d="m557.3 512 113.1-113.1c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L512 466.7 398.9 353.6c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L466.7 512 353.6 625.1c-12.5 12.5-12.5 32.8 0 45.3 6.2 6.2 14.4 9.4 22.6 9.4s16.4-3.1 22.6-9.4L512 557.3l113.1 113.1c6.2 6.2 14.4 9.4 22.6 9.4s16.4-3.1 22.6-9.4c12.5-12.5 12.5-32.8 0-45.3L557.3 512z" fill="#FFF"/></svg>${l.value.errorText.replace(/\$page/g,s.value.toString())}`)};return fe(()=>{n=new g2}),()=>i("div",{class:"vp-pagination"},c.value?i("nav",{class:"vp-pagination-list"},[i("div",{class:"vp-pagination-number "},[e.current>1?i("div",{class:"prev",role:"navigation",unselectable:"on",onClick:()=>h(e.current-1)},l.value.prev):null,d.value?[i("div",{role:"navigation",onClick:()=>h(1)},1),i("div",{class:"ellipsis"},"...")]:null,p.value.map(_=>i("div",{key:_,class:{active:e.current===_},role:"navigation",onClick:()=>h(_)},_)),u.value?[i("div",{class:"ellipsis"},"..."),i("div",{role:"navigation",onClick:()=>h(s.value)},s.value)]:null,e.current<s.value?i("div",{class:"next",role:"navigation",unselectable:"on",onClick:()=>h(e.current+1)},l.value.next):null]),i("div",{class:"vp-pagination-nav"},[i("label",{for:"navigation-text"},`${l.value.navigate}: `),i("input",{id:"navigation-text",value:o.value,onInput:({target:_})=>{o.value=_.value},onKeydown:_=>{_.key==="Enter"&&(_.preventDefault(),m(o.value))}}),i("button",{class:"vp-pagination-button",role:"navigation",title:l.value.action,onClick:()=>m(o.value)},l.value.action)])]):[])}}),Dl=C({name:"ArticleList",props:{items:{type:Array,default:()=>[]}},setup(e){const t=kt(),n=Ne(),a=Ma(),o=H(1),l=L(()=>a.value.articlePerPage||10),s=L(()=>e.items.slice((o.value-1)*l.value,o.value*l.value)),c=async d=>{o.value=d;const u={...t.query};!(u.page===d.toString()||d===1&&!u.page)&&(d===1?delete u.page:u.page=d.toString(),await n.push({path:t.path,query:u}))};return fe(()=>{const{page:d}=t.query;console.log("mounted"),c(d?Number(d):1),ue(o,()=>{const u=document.querySelector("#article-list").getBoundingClientRect().top+window.scrollY;setTimeout(()=>{window.scrollTo(0,u)},100)})}),()=>i("div",{id:"article-list",class:"vp-article-list",role:"feed"},s.value.length?[...s.value.map(({info:d,path:u},p)=>i(_e,{appear:!0,delay:p*.04},()=>i(Xm,{key:u,info:d,path:u}))),i(Zm,{current:o.value,perPage:l.value,total:e.items.length,onUpdateCurrentPage:c})]:i(Td))}}),Pd=C({name:"CategoryList",setup(){const e=ie(),t=Ca();return()=>i("ul",{class:"vp-category-list"},fn(t.value.map).sort(([,n],[,a])=>a.items.length-n.items.length).map(([n,{path:a,items:o}])=>i("li",{class:["vp-category",`vp-category${Po(n,9)}`,{active:a===e.value.path}]},i(Oe,{to:a},()=>[n,i("span",{class:"count"},o.length)]))))}}),Rd=C({name:"TagList",setup(){const e=be(),t=ja(),n=a=>{var o;return a===((o=e.value.blog)==null?void 0:o.name)};return()=>i("ul",{class:"tag-list-wrapper"},fn(t.value.map).sort(([,a],[,o])=>o.items.length-a.items.length).map(([a,{path:o,items:l}])=>i("li",{class:["tag",`tag${Po(a,9)}`,{active:n(a)}]},i(Oe,{to:o},()=>[a,i("span",{class:"tag-num"},l.length)]))))}}),Ym=C({name:"TimelineList",setup(){const e=le(),t=Ll(),n=Va(),a=L(()=>e.value.blogLocales.timeline);return()=>i("div",{class:"timeline-list-wrapper"},[i("div",{class:"timeline-list-title",onClick:()=>n(t.value.path)},[i(Tl),i("span",{class:"num"},t.value.items.length),a.value]),i("hr"),i("div",{class:"timeline-content"},i("ul",{class:"timeline-list"},t.value.config.map(({year:o,items:l},s)=>i(_e,{appear:!0,delay:.08*(s+1)},()=>i("li",[i("h3",{class:"timeline-year"},o),i("ul",{class:"timeline-year-wrapper"},l.map(({date:c,info:d,path:u})=>i("li",{class:"timeline-item"},[i("span",{class:"timeline-date"},c),i(Oe,{class:"timeline-title",to:u},()=>d[ke.title])])))])))))])}});const e6={article:Vo,category:wl,tag:Il,timeline:Tl};var Od=C({name:"InfoList",setup(){const e=le(),t=Ja(),n=Ca(),a=L(()=>Ge(n.value.map).length),o=yl(),l=ja(),s=L(()=>Ge(l.value.map).length),c=Va(),d=H("article"),u=L(()=>e.value.blogLocales);return()=>i("div",{class:"vp-blog-infos"},[i("div",{class:"vp-blog-type-switcher"},fn(e6).map(([p,h])=>i("button",{type:"button",class:"vp-blog-type-button",onClick:()=>{d.value=p}},i("div",{class:["icon-wrapper",{active:d.value===p}],"aria-label":u.value[p],"data-balloon-pos":"up"},i(h))))),i(_e,()=>d.value==="article"?i("div",{class:"vp-star-article-wrapper"},[i("div",{class:"title",onClick:()=>c(t.value.path)},[i(Vo),i("span",{class:"num"},t.value.items.length),u.value.article]),i("hr"),o.value.items.length?i("ul",{class:"vp-star-articles"},o.value.items.map(({info:p,path:h},m)=>i(_e,{appear:!0,delay:.08*(m+1)},()=>i("li",{class:"vp-star-article"},i(Oe,{to:h},()=>p[ke.title]))))):i("div",{class:"vp-star-article-empty"},u.value.empty.replace("$text",u.value.star))]):d.value==="category"?i("div",{class:"vp-category-wrapper"},[a.value?[i("div",{class:"title",onClick:()=>c(n.value.path)},[i(wl),i("span",{class:"num"},a.value),u.value.category]),i("hr"),i(_e,{delay:.04},()=>i(Pd))]:i("div",{class:"vp-category-empty"},u.value.empty.replace("$text",u.value.category))]):d.value==="tag"?i("div",{class:"vp-tag-wrapper"},[s.value?[i("div",{class:"title",onClick:()=>c(l.value.path)},[i(Il),i("span",{class:"num"},s.value),u.value.tag]),i("hr"),i(_e,{delay:.04},()=>i(Rd))]:i("div",{class:"vp-tag-empty"},u.value.empty.replace("$text",u.value.tag))]):i(_e,()=>i(Ym)))])}}),xo=C({name:"BlogWrapper",slots:Object,setup(e,{slots:t}){const{isMobile:n}=xa();return()=>[i(kl),i(bl,{noSidebar:!0,noToc:!0},{default:()=>t.default(),navScreenBottom:()=>i(Al),...n.value?{sidebar:()=>i(Od)}:{}})]}});const Sd=()=>i("aside",{class:"vp-blog-info-wrapper"},[i(_e,()=>i(Al)),i(_e,{delay:.04},()=>i(Od))]);Sd.displayName="InfoPanel";var qo=Sd,t6=C({name:"BlogPage",setup(){const e=ie(),t=be(),n=Ca(),a=ja();return()=>{const{key:o="",name:l=""}=t.value.blog||{},s=l?o==="category"?n.value.map[l].items:o==="tag"?a.value.map[l].items:[]:[];return i(xo,()=>i("div",{class:"vp-page vp-blog"},i("div",{class:"blog-page-wrapper"},[i("main",{id:"main-content",class:"vp-blog-main"},[i(_e,()=>o==="category"?i(Pd):o==="tag"?i(Rd):null),l?i(_e,{appear:!0,delay:.24},()=>i(Dl,{key:e.value.path,items:s})):null]),i(_e,{delay:.16},()=>i(qo,{key:"blog"}))])))}}});const n6="//theme-hope-assets.vuejs.press/hero/default.jpg";var a6=C({name:"BlogHero",slots:Object,setup(e,{slots:t}){const n=be(),a=_n(),o=je(),l=L(()=>n.value.heroFullScreen??!1),s=L(()=>{const{heroText:d,heroImage:u,heroImageDark:p,heroAlt:h,heroImageStyle:m,tagline:_}=n.value;return{text:d??a.value.title??"Hello",image:u?Ae(u):null,imageDark:p?Ae(p):null,heroStyle:m,alt:h||d||"hero image",tagline:_??"",isFullScreen:l.value}}),c=L(()=>{const{bgImage:d,bgImageDark:u,bgImageStyle:p}=n.value;return{image:ce(d)?Ae(d):d===!1?null:n6,imageDark:ce(u)?Ae(u):null,bgStyle:p,isFullScreen:l.value}});return()=>{var d,u;return n.value.hero===!1?null:i("div",{ref:o,class:["vp-blog-hero",{fullscreen:l.value,"no-bg":!c.value.image}]},[((d=t.heroBg)==null?void 0:d.call(t,c.value))||[c.value.image?i("div",{class:["vp-blog-mask",{light:c.value.imageDark}],style:[{background:`url(${c.value.image}) center/cover no-repeat`},c.value.bgStyle]}):null,c.value.imageDark?i("div",{class:"vp-blog-mask dark",style:[{background:`url(${c.value.imageDark}) center/cover no-repeat`},c.value.bgStyle]}):null],((u=t.heroInfo)==null?void 0:u.call(t,s.value))||[i(_e,{appear:!0,type:"group",delay:.04},()=>[s.value.image?i("img",{key:"light",class:["vp-blog-hero-image",{light:s.value.imageDark}],style:s.value.heroStyle,src:s.value.image,alt:s.value.alt}):null,s.value.imageDark?i("img",{key:"dark",class:"vp-blog-hero-image dark",style:s.value.heroStyle,src:s.value.imageDark,alt:s.value.alt}):null]),i(_e,{appear:!0,delay:.08},()=>s.value.text?i("h1",{class:"vp-blog-hero-title"},s.value.text):null),i(_e,{appear:!0,delay:.12},()=>s.value.tagline?i("p",{class:"vp-blog-hero-description",innerHTML:s.value.tagline}):null)],s.value.isFullScreen?i("button",{type:"button",class:"slide-down-button",onClick:()=>{window.scrollTo({top:o.value.clientHeight,behavior:"smooth"})}},[i(Vr),i(Vr)]):null])}}});const o6=["link","article","book","project","friend"];var r6=C({name:"ProjectPanel",components:{ArticleIcon:Vo,BookIcon:Ld,FriendIcon:Id,LinkIcon:Ad,ProjectIcon:wd},props:{items:{type:Array,required:!0}},setup(e){const t=En(),n=Va(),a=(o="",l="icon")=>o6.includes(o)?i(tt(`${o}-icon`)):an(o)?i("img",{class:"vp-project-image",src:o,alt:l}):Ra(o)?i("img",{class:"vp-project-image",src:Ae(o),alt:l}):i(Fe,{icon:o});return()=>i("div",{class:"vp-project-panel"},e.items.map(({icon:o,link:l,name:s,desc:c},d)=>i("div",{class:["vp-project-card",{[`project${d%9}`]:!t.value}],onClick:()=>n(l)},[a(o,s),i("div",{class:"vp-project-name"},s),i("div",{class:"vp-project-desc"},c)])))}}),l6=C({name:"BlogHome",setup(){const e=Ja(),t=be(),n=L(()=>t.value.projects??[]);return()=>i("div",{class:"vp-page vp-blog"},[i(a6),i("div",{class:"blog-page-wrapper"},[i("main",{id:"main-content",class:"vp-blog-main"},[n.value.length?i(_e,{appear:!0,delay:.16},()=>i(r6,{items:n.value})):null,i(_e,{appear:!0,delay:.24},()=>i(Dl,{items:e.value.items}))]),i(_e,{appear:!0,delay:.16},()=>i(qo,{key:"blog"}))]),i(_e,{appear:!0,delay:.28},()=>i(El))])}});const Vd=()=>i(xo,()=>i(l6));Vd.displayName="BlogHomeLayout";var s6=Vd,i6=C({name:"ArticleType",setup(){const e=ie(),t=Et(),n=le(),a=Ja(),o=yl(),l=L(()=>{const s=n.value.blogLocales;return[{text:s.all,path:a.value.path},{text:s.star,path:o.value.path},...jm.map(({key:c,path:d})=>({text:s[c],path:d.replace(/^\//,t.value)}))]});return()=>i("ul",{class:"vp-article-type-wrapper"},l.value.map(s=>i("li",{class:["vp-article-type",{active:s.path===e.value.path}]},i(Oe,{to:s.path},()=>s.text))))}}),c6=C({name:"BlogPage",setup(){const e=So(),t=be(),n=ie(),a=Ja(),o=yl(),l=L(()=>{const{key:s="",type:c}=t.value.blog||{};return s==="star"?o.value.items:c==="type"&&s?e.value.items:a.value.items});return()=>i(xo,()=>i("div",{class:"vp-page vp-blog"},i("div",{class:"blog-page-wrapper"},[i("main",{id:"main-content",class:"vp-blog-main"},[i(_e,()=>i(i6)),i(_e,{appear:!0,delay:.24},()=>i(Dl,{key:n.value.path,items:l.value}))]),i(_e,{delay:.16},()=>i(qo,{key:"blog"}))])))}}),u6=C({name:"TimelineItems",setup(){const e=Ma(),t=le(),n=Ll(),a=L(()=>e.value.timeline||t.value.blogLocales.timelineTitle),o=L(()=>n.value.config.map(({year:l})=>({title:l.toString(),level:2,slug:l.toString(),children:[]})));return()=>i("div",{class:"timeline-wrapper"},i("ul",{class:"timeline-content"},[i(_e,()=>i("li",{class:"motto"},a.value)),i(id,{items:o.value}),n.value.config.map(({year:l,items:s},c)=>i(_e,{appear:!0,delay:.08*(c+1),type:"group"},()=>[i("h3",{key:"title",id:l,class:"timeline-year-title"},i("span",l)),i("li",{key:"content",class:"timeline-year-list"},[i("ul",{class:"timeline-year-wrapper"},s.map(({date:d,info:u,path:p})=>i("li",{class:"timeline-item"},[i("span",{class:"timeline-date"},d),i(Oe,{class:"timeline-title",to:p},()=>u[ke.title])])))])]))]))}});const xd=()=>i(xo,()=>i("div",{class:"vp-page vp-blog"},i("div",{class:"blog-page-wrapper"},[i("main",{id:"main-content",class:"vp-blog-main"},[i(_e,{appear:!0,delay:.24},()=>i(u6))]),i(_e,{delay:.16},()=>i(qo,{key:"blog"}))])));xd.displayName="Timeline";var d6=xd;const An="./ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""),lr=Array.from({length:64},(e,t)=>t),eo=e=>Array(e).fill(-1),Ft=[...eo(46),0,1,...lr.slice(54,64),...eo(7),...lr.slice(2,28),...eo(6),...lr.slice(28,54),...eo(5)],ri=[608135816,2242054355,320440878,57701188,2752067618,698298832,137296536,3964562569,1160258022,953160567,3193202383,887688300,3232508343,3380367581,1065670069,3041331479,2450970073,2306472731],li=[3509652390,2564797868,805139163,3491422135,3101798381,1780907670,3128725573,4046225305,614570311,3012652279,134345442,2240740374,1667834072,1901547113,2757295779,4103290238,227898511,1921955416,1904987480,2182433518,2069144605,3260701109,2620446009,720527379,3318853667,677414384,3393288472,3101374703,2390351024,1614419982,1822297739,2954791486,3608508353,3174124327,2024746970,1432378464,3864339955,2857741204,1464375394,1676153920,1439316330,715854006,3033291828,289532110,2706671279,2087905683,3018724369,1668267050,732546397,1947742710,3462151702,2609353502,2950085171,1814351708,2050118529,680887927,999245976,1800124847,3300911131,1713906067,1641548236,4213287313,1216130144,1575780402,4018429277,3917837745,3693486850,3949271944,596196993,3549867205,258830323,2213823033,772490370,2760122372,1774776394,2652871518,566650946,4142492826,1728879713,2882767088,1783734482,3629395816,2517608232,2874225571,1861159788,326777828,3124490320,2130389656,2716951837,967770486,1724537150,2185432712,2364442137,1164943284,2105845187,998989502,3765401048,2244026483,1075463327,1455516326,1322494562,910128902,469688178,1117454909,936433444,3490320968,3675253459,1240580251,122909385,2157517691,634681816,4142456567,3825094682,3061402683,2540495037,79693498,3249098678,1084186820,1583128258,426386531,1761308591,1047286709,322548459,995290223,1845252383,2603652396,3431023940,2942221577,3202600964,3727903485,1712269319,422464435,3234572375,1170764815,3523960633,3117677531,1434042557,442511882,3600875718,1076654713,1738483198,4213154764,2393238008,3677496056,1014306527,4251020053,793779912,2902807211,842905082,4246964064,1395751752,1040244610,2656851899,3396308128,445077038,3742853595,3577915638,679411651,2892444358,2354009459,1767581616,3150600392,3791627101,3102740896,284835224,4246832056,1258075500,768725851,2589189241,3069724005,3532540348,1274779536,3789419226,2764799539,1660621633,3471099624,4011903706,913787905,3497959166,737222580,2514213453,2928710040,3937242737,1804850592,3499020752,2949064160,2386320175,2390070455,2415321851,4061277028,2290661394,2416832540,1336762016,1754252060,3520065937,3014181293,791618072,3188594551,3933548030,2332172193,3852520463,3043980520,413987798,3465142937,3030929376,4245938359,2093235073,3534596313,375366246,2157278981,2479649556,555357303,3870105701,2008414854,3344188149,4221384143,3956125452,2067696032,3594591187,2921233993,2428461,544322398,577241275,1471733935,610547355,4027169054,1432588573,1507829418,2025931657,3646575487,545086370,48609733,2200306550,1653985193,298326376,1316178497,3007786442,2064951626,458293330,2589141269,3591329599,3164325604,727753846,2179363840,146436021,1461446943,4069977195,705550613,3059967265,3887724982,4281599278,3313849956,1404054877,2845806497,146425753,1854211946,1266315497,3048417604,3681880366,3289982499,290971e4,1235738493,2632868024,2414719590,3970600049,1771706367,1449415276,3266420449,422970021,1963543593,2690192192,3826793022,1062508698,1531092325,1804592342,2583117782,2714934279,4024971509,1294809318,4028980673,1289560198,2221992742,1669523910,35572830,157838143,1052438473,1016535060,1802137761,1753167236,1386275462,3080475397,2857371447,1040679964,2145300060,2390574316,1461121720,2956646967,4031777805,4028374788,33600511,2920084762,1018524850,629373528,3691585981,3515945977,2091462646,2486323059,586499841,988145025,935516892,3367335476,2599673255,2839830854,265290510,3972581182,2759138881,3795373465,1005194799,847297441,406762289,1314163512,1332590856,1866599683,4127851711,750260880,613907577,1450815602,3165620655,3734664991,3650291728,3012275730,3704569646,1427272223,778793252,1343938022,2676280711,2052605720,1946737175,3164576444,3914038668,3967478842,3682934266,1661551462,3294938066,4011595847,840292616,3712170807,616741398,312560963,711312465,1351876610,322626781,1910503582,271666773,2175563734,1594956187,70604529,3617834859,1007753275,1495573769,4069517037,2549218298,2663038764,504708206,2263041392,3941167025,2249088522,1514023603,1998579484,1312622330,694541497,2582060303,2151582166,1382467621,776784248,2618340202,3323268794,2497899128,2784771155,503983604,4076293799,907881277,423175695,432175456,1378068232,4145222326,3954048622,3938656102,3820766613,2793130115,2977904593,26017576,3274890735,3194772133,1700274565,1756076034,4006520079,3677328699,720338349,1533947780,354530856,688349552,3973924725,1637815568,332179504,3949051286,53804574,2852348879,3044236432,1282449977,3583942155,3416972820,4006381244,1617046695,2628476075,3002303598,1686838959,431878346,2686675385,1700445008,1080580658,1009431731,832498133,3223435511,2605976345,2271191193,2516031870,1648197032,4164389018,2548247927,300782431,375919233,238389289,3353747414,2531188641,2019080857,1475708069,455242339,2609103871,448939670,3451063019,1395535956,2413381860,1841049896,1491858159,885456874,4264095073,4001119347,1565136089,3898914787,1108368660,540939232,1173283510,2745871338,3681308437,4207628240,3343053890,4016749493,1699691293,1103962373,3625875870,2256883143,3830138730,1031889488,3479347698,1535977030,4236805024,3251091107,2132092099,1774941330,1199868427,1452454533,157007616,2904115357,342012276,595725824,1480756522,206960106,497939518,591360097,863170706,2375253569,3596610801,1814182875,2094937945,3421402208,1082520231,3463918190,2785509508,435703966,3908032597,1641649973,2842273706,3305899714,1510255612,2148256476,2655287854,3276092548,4258621189,236887753,3681803219,274041037,1734335097,3815195456,3317970021,1899903192,1026095262,4050517792,356393447,2410691914,3873677099,3682840055,3913112168,2491498743,4132185628,2489919796,1091903735,1979897079,3170134830,3567386728,3557303409,857797738,1136121015,1342202287,507115054,2535736646,337727348,3213592640,1301675037,2528481711,1895095763,1721773893,3216771564,62756741,2142006736,835421444,2531993523,1442658625,3659876326,2882144922,676362277,1392781812,170690266,3921047035,1759253602,3611846912,1745797284,664899054,1329594018,3901205900,3045908486,2062866102,2865634940,3543621612,3464012697,1080764994,553557557,3656615353,3996768171,991055499,499776247,1265440854,648242737,3940784050,980351604,3713745714,1749149687,3396870395,4211799374,3640570775,1161844396,3125318951,1431517754,545492359,4268468663,3499529547,1437099964,2702547544,3433638243,2581715763,2787789398,1060185593,1593081372,2418618748,4260947970,69676912,2159744348,86519011,2512459080,3838209314,1220612927,3339683548,133810670,1090789135,1078426020,1569222167,845107691,3583754449,4072456591,1091646820,628848692,1613405280,3757631651,526609435,236106946,48312990,2942717905,3402727701,1797494240,859738849,992217954,4005476642,2243076622,3870952857,3732016268,765654824,3490871365,2511836413,1685915746,3888969200,1414112111,2273134842,3281911079,4080962846,172450625,2569994100,980381355,4109958455,2819808352,2716589560,2568741196,3681446669,3329971472,1835478071,660984891,3704678404,4045999559,3422617507,3040415634,1762651403,1719377915,3470491036,2693910283,3642056355,3138596744,1364962596,2073328063,1983633131,926494387,3423689081,2150032023,4096667949,1749200295,3328846651,309677260,2016342300,1779581495,3079819751,111262694,1274766160,443224088,298511866,1025883608,3806446537,1145181785,168956806,3641502830,3584813610,1689216846,3666258015,3200248200,1692713982,2646376535,4042768518,1618508792,1610833997,3523052358,4130873264,2001055236,3610705100,2202168115,4028541809,2961195399,1006657119,2006996926,3186142756,1430667929,3210227297,1314452623,4074634658,4101304120,2273951170,1399257539,3367210612,3027628629,1190975929,2062231137,2333990788,2221543033,2438960610,1181637006,548689776,2362791313,3372408396,3104550113,3145860560,296247880,1970579870,3078560182,3769228297,1714227617,3291629107,3898220290,166772364,1251581989,493813264,448347421,195405023,2709975567,677966185,3703036547,1463355134,2715995803,1338867538,1343315457,2802222074,2684532164,233230375,2599980071,2000651841,3277868038,1638401717,4028070440,3237316320,6314154,819756386,300326615,590932579,1405279636,3267499572,3150704214,2428286686,3959192993,3461946742,1862657033,1266418056,963775037,2089974820,2263052895,1917689273,448879540,3550394620,3981727096,150775221,3627908307,1303187396,508620638,2975983352,2726630617,1817252668,1876281319,1457606340,908771278,3720792119,3617206836,2455994898,1729034894,1080033504,976866871,3556439503,2881648439,1522871579,1555064734,1336096578,3548522304,2579274686,3574697629,3205460757,3593280638,3338716283,3079412587,564236357,2993598910,1781952180,1464380207,3163844217,3332601554,1699332808,1393555694,1183702653,3581086237,1288719814,691649499,2847557200,2895455976,3193889540,2717570544,1781354906,1676643554,2592534050,3230253752,1126444790,2770207658,2633158820,2210423226,2615765581,2414155088,3127139286,673620729,2805611233,1269405062,4015350505,3341807571,4149409754,1057255273,2012875353,2162469141,2276492801,2601117357,993977747,3918593370,2654263191,753973209,36408145,2530585658,25011837,3520020182,2088578344,530523599,2918365339,1524020338,1518925132,3760827505,3759777254,1202760957,3985898139,3906192525,674977740,4174734889,2031300136,2019492241,3983892565,4153806404,3822280332,352677332,2297720250,60907813,90501309,3286998549,1016092578,2535922412,2839152426,457141659,509813237,4120667899,652014361,1966332200,2975202805,55981186,2327461051,676427537,3255491064,2882294119,3433927263,1307055953,942726286,933058658,2468411793,3933900994,4215176142,1361170020,2001714738,2830558078,3274259782,1222529897,1679025792,2729314320,3714953764,1770335741,151462246,3013232138,1682292957,1483529935,471910574,1539241949,458788160,3436315007,1807016891,3718408830,978976581,1043663428,3165965781,1927990952,4200891579,2372276910,3208408903,3533431907,1412390302,2931980059,4132332400,1947078029,3881505623,4168226417,2941484381,1077988104,1320477388,886195818,18198404,3786409e3,2509781533,112762804,3463356488,1866414978,891333506,18488651,661792760,1628790961,3885187036,3141171499,876946877,2693282273,1372485963,791857591,2686433993,3759982718,3167212022,3472953795,2716379847,445679433,3561995674,3504004811,3574258232,54117162,3331405415,2381918588,3769707343,4154350007,1140177722,4074052095,668550556,3214352940,367459370,261225585,2610173221,4209349473,3468074219,3265815641,314222801,3066103646,3808782860,282218597,3406013506,3773591054,379116347,1285071038,846784868,2669647154,3771962079,3550491691,2305946142,453669953,1268987020,3317592352,3279303384,3744833421,2610507566,3859509063,266596637,3847019092,517658769,3462560207,3443424879,370717030,4247526661,2224018117,4143653529,4112773975,2788324899,2477274417,1456262402,2901442914,1517677493,1846949527,2295493580,3734397586,2176403920,1280348187,1908823572,3871786941,846861322,1172426758,3287448474,3383383037,1655181056,3139813346,901632758,1897031941,2986607138,3066810236,3447102507,1393639104,373351379,950779232,625454576,3124240540,4148612726,2007998917,544563296,2244738638,2330496472,2058025392,1291430526,424198748,50039436,29584100,3605783033,2429876329,2791104160,1057563949,3255363231,3075367218,3463963227,1469046755,985887462],qd=[1332899944,1700884034,1701343084,1684370003,1668446532,1869963892],xr=(e,t)=>{if(t<=0||t>e.length)throw Error(`Illegal len: ${t}`);let n=0,a,o;const l=[];for(;n<t;){if(a=e[n++]&255,l.push(An[a>>2&63]),a=(a&3)<<4,n>=t){l.push(An[a&63]);break}if(o=e[n++]&255,a|=o>>4&15,l.push(An[a&63]),a=(o&15)<<2,n>=t){l.push(An[a&63]);break}o=e[n++]&255,a|=o>>6&3,l.push(An[a&63]),l.push(An[o&63])}return l.join("")},p6=(e,t)=>{if(t<=0)throw Error(`Illegal len: ${t}`);const n=e.length;let a=0,o=0,l,s,c,d,u,p;const h=[];for(;a<n-1&&o<t&&(p=e.charCodeAt(a++),l=p<Ft.length?Ft[p]:-1,p=e.charCodeAt(a++),s=p<Ft.length?Ft[p]:-1,!(l==-1||s==-1||(u=l<<2>>>0,u|=(s&48)>>4,h.push(String.fromCharCode(u)),++o>=t||a>=n)||(p=e.charCodeAt(a++),c=p<Ft.length?Ft[p]:-1,c==-1)||(u=(s&15)<<4>>>0,u|=(c&60)>>2,h.push(String.fromCharCode(u)),++o>=t||a>=n)));)p=e.charCodeAt(a++),d=p<Ft.length?Ft[p]:-1,u=(c&3)<<6>>>0,u|=d,h.push(String.fromCharCode(u)),++o;return h.map(m=>m.charCodeAt(0))},v6=(e,t)=>{let n=null;for(typeof e=="number"&&(n=e,e=()=>null);n!==null||(n=e())!==null;)n<128?t(n&127):n<2048?(t(n>>6&31|192),t(n&63|128)):n<65536?(t(n>>12&15|224),t(n>>6&63|128),t(n&63|128)):(t(n>>18&7|240),t(n>>12&63|128),t(n>>6&63|128),t(n&63|128)),n=null},h6=(e,t)=>{let n,a=null;for(;(n=a!==null?a:e())!==null;){if(n>=55296&&n<=57343&&(a=e())!==null&&a>=56320&&a<=57343){t((n-55296)*1024+a-56320+65536),a=null;continue}t(n)}a!==null&&t(a)},m6=(e,t)=>{h6(e,function(n){v6(n,t)})},_6=typeof process<"u"&&process&&typeof process.nextTick=="function"?typeof setImmediate=="function"?setImmediate:process.nextTick:setTimeout,f6=e=>{const t=[];let n=0;return m6(()=>n>=e.length?null:e.charCodeAt(n++),a=>{t.push(a)}),t},La=(e,t,n,a)=>{let o,l=e[t],s=e[t+1];return l^=n[0],o=a[l>>>24],o+=a[256|l>>16&255],o^=a[512|l>>8&255],o+=a[768|l&255],s^=o^n[1],o=a[s>>>24],o+=a[256|s>>16&255],o^=a[512|s>>8&255],o+=a[768|s&255],l^=o^n[2],o=a[l>>>24],o+=a[256|l>>16&255],o^=a[512|l>>8&255],o+=a[768|l&255],s^=o^n[3],o=a[s>>>24],o+=a[256|s>>16&255],o^=a[512|s>>8&255],o+=a[768|s&255],l^=o^n[4],o=a[l>>>24],o+=a[256|l>>16&255],o^=a[512|l>>8&255],o+=a[768|l&255],s^=o^n[5],o=a[s>>>24],o+=a[256|s>>16&255],o^=a[512|s>>8&255],o+=a[768|s&255],l^=o^n[6],o=a[l>>>24],o+=a[256|l>>16&255],o^=a[512|l>>8&255],o+=a[768|l&255],s^=o^n[7],o=a[s>>>24],o+=a[256|s>>16&255],o^=a[512|s>>8&255],o+=a[768|s&255],l^=o^n[8],o=a[l>>>24],o+=a[256|l>>16&255],o^=a[512|l>>8&255],o+=a[768|l&255],s^=o^n[9],o=a[s>>>24],o+=a[256|s>>16&255],o^=a[512|s>>8&255],o+=a[768|s&255],l^=o^n[10],o=a[l>>>24],o+=a[256|l>>16&255],o^=a[512|l>>8&255],o+=a[768|l&255],s^=o^n[11],o=a[s>>>24],o+=a[256|s>>16&255],o^=a[512|s>>8&255],o+=a[768|s&255],l^=o^n[12],o=a[l>>>24],o+=a[256|l>>16&255],o^=a[512|l>>8&255],o+=a[768|l&255],s^=o^n[13],o=a[s>>>24],o+=a[256|s>>16&255],o^=a[512|s>>8&255],o+=a[768|s&255],l^=o^n[14],o=a[l>>>24],o+=a[256|l>>16&255],o^=a[512|l>>8&255],o+=a[768|l&255],s^=o^n[15],o=a[s>>>24],o+=a[256|s>>16&255],o^=a[512|s>>8&255],o+=a[768|s&255],l^=o^n[16],e[t]=s^n[17],e[t+1]=l,e},In=(e,t)=>{let n=0;for(let a=0;a<4;++a)n=n<<8|e[t]&255,t=(t+1)%e.length;return{key:n,offp:t}},si=(e,t,n)=>{const a=t.length,o=n.length;let l=0,s=[0,0],c;for(let d=0;d<a;d++)c=In(e,l),l=c.offp,t[d]=t[d]^c.key;for(let d=0;d<a;d+=2)s=La(s,0,t,n),t[d]=s[0],t[d+1]=s[1];for(let d=0;d<o;d+=2)s=La(s,0,t,n),n[d]=s[0],n[d+1]=s[1]},g6=(e,t,n,a)=>{const o=n.length,l=a.length;let s=0,c=[0,0],d;for(let u=0;u<o;u++)d=In(t,s),s=d.offp,n[u]=n[u]^d.key;s=0;for(let u=0;u<o;u+=2)d=In(e,s),s=d.offp,c[0]^=d.key,d=In(e,s),s=d.offp,c[1]^=d.key,c=La(c,0,n,a),n[u]=c[0],n[u+1]=c[1];for(let u=0;u<l;u+=2)d=In(e,s),s=d.offp,c[0]^=d.key,d=In(e,s),s=d.offp,c[1]^=d.key,c=La(c,0,n,a),a[u]=c[0],a[u+1]=c[1]},ii=(e,t,n,a,o)=>{const l=qd.slice(),s=l.length;if(n<4||n>31){const m=new Error(`Illegal number of rounds (4-31): ${n}`);if(a===!1)return Promise.reject(m);throw m}if(t.length!==16){const m=new Error(`Illegal salt length: ${t.length} != 16`);if(a===!1)return Promise.reject(m);throw m}n=1<<n>>>0;let c,d,u=0,p;Int32Array?(c=new Int32Array(ri),d=new Int32Array(li)):(c=ri.slice(),d=li.slice()),g6(t,e,c,d);const h=()=>{if(o&&o(u/n),u<n){const m=Date.now();for(;u<n&&(u=u+1,si(e,c,d),si(t,c,d),!(Date.now()-m>100)););}else{for(u=0;u<64;u++)for(p=0;p<s>>1;p++)La(l,p<<1,c,d);const m=[];for(u=0;u<s;u++)m.push((l[u]>>24&255)>>>0),m.push((l[u]>>16&255)>>>0),m.push((l[u]>>8&255)>>>0),m.push((l[u]&255)>>>0);return a===!1?Promise.resolve(m):m}if(a===!1)return new Promise(m=>_6(()=>{h().then(m)}))};if(a===!1)return h();{let m;for(;;)if(typeof(m=h())<"u")return m||[]}},b6=e=>{var t;try{const{crypto:n,msCrypto:a}=window,o=new Uint32Array(e);return(t=n||a)==null||t.getRandomValues(o),Array.from(o)}catch{throw Error("WebCryptoAPI is not available")}},E6=(e=10)=>{if(typeof e!="number")throw Error("Illegal arguments: "+typeof e);e<4?e=4:e>31&&(e=31);const t=[];return t.push("$2a$"),e<10&&t.push("0"),t.push(e.toString()),t.push("$"),t.push(xr(b6(16),16)),t.join("")};function k6(e,t,n,a){if(typeof e!="string"||typeof t!="string"){const _=new Error("Invalid string / salt: Not a string");if(n===!1)return Promise.reject(_);throw _}let o,l;if(t.charAt(0)!=="$"||t.charAt(1)!=="2"){const _=new Error("Invalid salt version: "+t.substring(0,2));if(n===!1)return Promise.reject(_);throw _}if(t.charAt(2)==="$")o="\0",l=3;else{if(o=t.charAt(2),o!=="a"&&o!=="b"&&o!=="y"||t.charAt(3)!=="$"){const _=Error("Invalid salt revision: "+t.substring(2,4));if(n===!1)return Promise.reject(_);throw _}l=4}if(t.charAt(l+2)>"$"){const _=new Error("Missing salt rounds");if(n===!1)return Promise.reject(_);throw _}const s=parseInt(t.substring(l,l+1),10)*10,c=parseInt(t.substring(l+1,l+2),10),d=s+c,u=t.substring(l+3,l+25);e+=o>="a"?"\0":"";const p=f6(e),h=p6(u,16),m=_=>{const g=[];return g.push("$2"),o>="a"&&g.push(o),g.push("$"),d<10&&g.push("0"),g.push(d.toString()),g.push("$"),g.push(xr(h,h.length)),g.push(xr(_,qd.length*4-1)),g.join("")};return n===!1?ii(p,h,d,!1,a).then(_=>m(_)):m(ii(p,h,d,!0,a))}const y6=(e,t=10)=>{if(typeof t=="number"&&(t=E6(t)),typeof e!="string"||typeof t!="string")throw Error("Illegal arguments: "+typeof e+", "+typeof t);return k6(e,t,!0)},qr=(e,t)=>{if(typeof e!="string"||typeof t!="string")throw Error("Illegal arguments: "+typeof e+", "+typeof t);return t.length!==60?!1:y6(e,t.substring(0,t.length-31))===t},Cd=()=>i(re,{name:"lock"},()=>i("path",{d:"M787.168 952.268H236.832c-30.395 0-55.033-24.638-55.033-55.033V429.45c0-30.395 24.638-55.034 55.033-55.034h82.55V264.35c0-106.38 86.238-192.618 192.618-192.618S704.618 157.97 704.618 264.35v110.066h82.55c30.395 0 55.033 24.639 55.033 55.034v467.785c0 30.395-24.639 55.033-55.033 55.033zM484.483 672.046v115.122h55.034V672.046c31.99-11.373 55.033-41.605 55.033-77.496 0-45.592-36.958-82.55-82.55-82.55s-82.55 36.958-82.55 82.55c0 35.89 23.042 66.123 55.033 77.496zM622.067 264.35c0-60.788-49.28-110.067-110.067-110.067s-110.067 49.28-110.067 110.067v110.066h220.135V264.35z"}));Cd.displayName="LockIcon";var Md=C({name:"PasswordModal",props:{full:Boolean},emits:["verify"],setup(e,{emit:t}){const n=be(),a=le(),o=H(""),l=H(!1),s=H(!1),c=L(()=>a.value.encryptLocales);let d=null;const u=()=>{d&&clearTimeout(d),l.value=!1,t("verify",o.value,s.value),Ct().then(()=>{l.value=!0,d=setTimeout(()=>{l.value=!1},1e3)})};return()=>i("div",{class:["vp-decrypt-layer",{expand:e.full||n.value.home}]},i("div",{class:"vp-decrypt-modal"},[i("div",{class:["vp-decrypt-hint",{tried:l.value}]},l.value?c.value.errorHint:i(Cd,{"aria-label":c.value.iconLabel})),i("div",{class:"vp-decrypt-input"},[i("input",{type:"password",value:o.value,placeholder:c.value.placeholder,onInput:({target:p})=>{o.value=p.value},onKeydown:({key:p})=>{p==="Enter"&&u()}})]),i("div",{class:"vp-remember-password"},[i("input",{type:"checkbox",value:s.value,onChange:()=>s.value=!s.value}),c.value.remember]),i("button",{type:"button",class:"vp-decrypt-submit",onClick:()=>u()},"OK")]))}});const jd=()=>{const e=Jt();return L(()=>e.value.encrypt||{})},ci="VUEPRESS_HOPE_GLOBAL_TOKEN",L6=()=>{const e=jd(),t=bn(ci,""),n=uu(ci,""),a=L(()=>{const{global:l=!1,admin:s=[]}=e.value;return l&&s.length>0}),o=L(()=>{if(a.value){if(t.value)return e.value.admin.some(l=>qr(t.value,l));if(n.value)return e.value.admin.some(l=>qr(n.value,l))}return!1});return{isEncrypted:a,isDecrypted:o,validate:(l,s=!1)=>{(s?t:n).value=l}}},sr=(e="",t)=>!!e&&qr(e,t),ui="VUEPRESS_HOPE_PATH_TOKEN",A6=()=>{const e=ie(),t=jd(),n=bn(ui,{}),a=uu(ui,{}),o=s=>Zn(t.value.config)?Ge(t.value.config).filter(c=>en(decodeURI(s),c)).sort((c,d)=>d.length-c.length):[],l=s=>{const c=o(s);if(c.length>0){const{config:d={}}=t.value;return{isEncrypted:!0,isDecrypted:c.some(u=>n.value[u]&&d[u].some(p=>sr(n.value[u],p))||a.value[u]&&d[u].some(p=>sr(a.value[u],p)))}}return{isDecrypted:!1,isEncrypted:!1}};return{status:L(()=>l(e.value.path)),getStatus:l,validate:(s,c=!1)=>{const{config:d={}}=t.value,u=o(e.value.path);for(const p of u)if(d[p].filter(h=>sr(s,h))){(c?n:a).value[p]=s;break}}}};var w6=C({name:"GlobalEncrypt",slots:Object,setup(e,{slots:t}){const{isDecrypted:n,isEncrypted:a,validate:o}=L6(),l=H(!1);return fe(()=>{l.value=!0}),()=>i(ud,()=>a.value?l.value?n.value?t.default():i(Md,{full:!0,onVerify:o}):null:t.default())}}),I6=C({name:"LocalEncrypt",slots:Object,setup(e,{slots:t}){const{status:n,validate:a}=A6(),o=H(!1);return fe(()=>{o.value=!0}),()=>{const{isEncrypted:l,isDecrypted:s}=n.value;return l?o.value?s?t.default():i(Md,{full:!0,onVerify:a}):null:t.default()}}});uh(e=>{const t=e.t,n=e.I!==!1,a=e.i;return n?{title:t,content:a?()=>[i(Fe,{icon:a}),t]:null,order:e.O,index:e.I}:null});const T6=pt({enhance:({app:e,router:t})=>{const{scrollBehavior:n}=t.options;t.options.scrollBehavior=async(...a)=>(await cd().wait(),n(...a)),x4(e),e.component("HopeIcon",Fe),e.component("VPLink",Oe),e.component("BloggerInfo",Al),e.component("GlobalEncrypt",w6),e.component("LocalEncrypt",I6)},setup:()=>{q4(),J4(),Gm()},layouts:{Layout:Sm,NotFound:xm,BlogCategory:t6,BlogHome:s6,BlogType:c6,Timeline:d6}}),D6=()=>i(re,{name:"heading"},()=>i("path",{d:"M250.4 704.6H64V595.4h202.4l26.2-166.6H94V319.6h214.4L352 64h127.8l-43.6 255.4h211.2L691 64h126.2l-43.6 255.4H960v109.2H756.2l-24.6 166.6H930v109.2H717L672 960H545.8l43.6-255.4H376.6L333 960H206.8l43.6-255.4zm168.4-276L394 595.4h211.2l24.6-166.6h-211z"}));D6.displayName="HeadingIcon";const P6=()=>i(re,{name:"heart"},()=>i("path",{d:"M1024 358.156C1024 195.698 892.3 64 729.844 64c-86.362 0-164.03 37.218-217.844 96.49C458.186 101.218 380.518 64 294.156 64 131.698 64 0 195.698 0 358.156 0 444.518 37.218 522.186 96.49 576H96l320 320c32 32 64 64 96 64s64-32 96-64l320-320h-.49c59.272-53.814 96.49-131.482 96.49-217.844zM841.468 481.232 517.49 805.49a2981.962 2981.962 0 0 1-5.49 5.48c-1.96-1.95-3.814-3.802-5.49-5.48L182.532 481.234C147.366 449.306 128 405.596 128 358.156 128 266.538 202.538 192 294.156 192c47.44 0 91.15 19.366 123.076 54.532L512 350.912l94.768-104.378C638.696 211.366 682.404 192 729.844 192 821.462 192 896 266.538 896 358.156c0 47.44-19.368 91.15-54.532 123.076z"}));P6.displayName="HeartIcon";const R6=()=>i(re,{name:"history"},()=>i("path",{d:"M512 1024a512 512 0 1 1 512-512 512 512 0 0 1-512 512zm0-896a384 384 0 1 0 384 384 384 384 0 0 0-384-384zm192 448H512a64 64 0 0 1-64-64V320a64 64 0 0 1 128 0v128h128a64 64 0 0 1 0 128z"}));R6.displayName="HistoryIcon";const O6=()=>i(re,{name:"title"},()=>i("path",{d:"M512 256c70.656 0 134.656 28.672 180.992 75.008A254.933 254.933 0 0 1 768 512c0 83.968-41.024 157.888-103.488 204.48C688.96 748.736 704 788.48 704 832c0 105.984-86.016 192-192 192-106.048 0-192-86.016-192-192h128a64 64 0 1 0 128 0 64 64 0 0 0-64-64 255.19 255.19 0 0 1-181.056-75.008A255.403 255.403 0 0 1 256 512c0-83.968 41.024-157.824 103.488-204.544C335.04 275.264 320 235.584 320 192A192 192 0 0 1 512 0c105.984 0 192 85.952 192 192H576a64.021 64.021 0 0 0-128 0c0 35.328 28.672 64 64 64zM384 512c0 70.656 57.344 128 128 128s128-57.344 128-128-57.344-128-128-128-128 57.344-128 128z"}));O6.displayName="TitleIcon";const Pl=()=>i(re,{name:"search"},()=>i("path",{d:"M192 480a256 256 0 1 1 512 0 256 256 0 0 1-512 0m631.776 362.496-143.2-143.168A318.464 318.464 0 0 0 768 480c0-176.736-143.264-320-320-320S128 303.264 128 480s143.264 320 320 320a318.016 318.016 0 0 0 184.16-58.592l146.336 146.368c12.512 12.48 32.768 12.48 45.28 0 12.48-12.512 12.48-32.768 0-45.28"}));Pl.displayName="SearchIcon";const Jd=()=>i("svg",{xmlns:"http://www.w3.org/2000/svg",width:"32",height:"32",preserveAspectRatio:"xMidYMid",viewBox:"0 0 100 100"},[i("circle",{cx:"28",cy:"75",r:"11",fill:"currentColor"},i("animate",{attributeName:"fill-opacity",begin:"0s",dur:"1s",keyTimes:"0;0.2;1",repeatCount:"indefinite",values:"0;1;1"})),i("path",{fill:"none",stroke:"#88baf0","stroke-width":"10",d:"M28 47a28 28 0 0 1 28 28"},i("animate",{attributeName:"stroke-opacity",begin:"0.1s",dur:"1s",keyTimes:"0;0.2;1",repeatCount:"indefinite",values:"0;1;1"})),i("path",{fill:"none",stroke:"#88baf0","stroke-width":"10",d:"M28 25a50 50 0 0 1 50 50"},i("animate",{attributeName:"stroke-opacity",begin:"0.2s",dur:"1s",keyTimes:"0;0.2;1",repeatCount:"indefinite",values:"0;1;1"}))]);Jd.displayName="LoadingIcon";const Bd=({hint:e})=>i("div",{class:"search-pro-result-wrapper loading"},[i(Jd),e]);Bd.displayName="SearchLoading";const S6='<svg width="20" height="20" viewBox="0 0 20 20"><path d="M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z" stroke="currentColor" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>';var V6={},x6={"/en/":{cancel:"Cancel",placeholder:"Search",search:"Search",searching:"Searching",defaultTitle:"Documentation",select:"to select",navigate:"to navigate",autocomplete:"to autocomplete",exit:"to exit",queryHistory:"Search History",resultHistory:"Result History",emptyHistory:"Empty Search History",emptyResult:"No results found",loading:"Loading search indexes..."},"/":{cancel:"取消",placeholder:"搜索",search:"搜索",searching:"搜索中",defaultTitle:"文档",select:"选择",navigate:"切换",autocomplete:"自动补全",exit:"关闭",queryHistory:"搜索历史",resultHistory:"历史结果",emptyHistory:"无搜索历史",emptyResult:"没有找到结果",loading:"正在加载搜索索引..."}},q6={searchDelay:150,suggestDelay:0,queryHistoryCount:5,resultHistoryCount:5,hotKeys:[{key:"k",ctrl:!0},{key:"/",ctrl:!0}],worker:"search-pro.worker.js"};const Rl=q6,_3=V6,Nd=Rl.hotKeys,Ol=x6;new URL("data:application/javascript;base64,aW1wb3J0e3NlYXJjaCBhcyBDLGdldFN0b3JlZEZpZWxkcyBhcyBSLGF1dG9TdWdnZXN0IGFzIFQsbG9hZEpTT05JbmRleCBhcyB3fWZyb20ic2xpbXNlYXJjaCI7aW1wb3J0ICQgZnJvbSJAdGVtcC9zZWFyY2gtcHJvL2luZGV4IjtpbXBvcnR7ZW50cmllcyBhcyBFfWZyb20idnVlcHJlc3Mtc2hhcmVkL2NsaWVudCI7Y29uc3QgeD0obCxlKT0+e2NvbnN0IG49bC50b0xvd2VyQ2FzZSgpLHM9ZS50b0xvd2VyQ2FzZSgpLG89W107bGV0IHQ9MCxyPTA7Y29uc3QgaT0oYyxnPSExKT0+e2xldCBwPSIiO3I9PT0wP3A9Yy5sZW5ndGg+MjA/YOKApiAke2Muc2xpY2UoLTIwKX1gOmM6Zz9wPWMubGVuZ3RoK3I+MTAwP2Ake2Muc2xpY2UoMCwxMDAtcil94oCmIGA6YzpwPWMubGVuZ3RoPjIwP2Ake2Muc2xpY2UoMCwyMCl9IOKApiAke2Muc2xpY2UoLTIwKX1gOmMscCYmby5wdXNoKHApLHIrPXAubGVuZ3RoLGd8fChvLnB1c2goWyJtYXJrIixlXSkscis9ZS5sZW5ndGgscj49MTAwJiZvLnB1c2goIiDigKYiKSl9O2xldCBoPW4uaW5kZXhPZihzLHQpO2lmKGg9PT0tMSlyZXR1cm4gbnVsbDtmb3IoO2g+PTA7KXtjb25zdCBjPWgrcy5sZW5ndGg7aWYoaShsLnNsaWNlKHQsaCkpLHQ9YyxyPjEwMClicmVhaztoPW4uaW5kZXhPZihzLHQpfXJldHVybiByPDEwMCYmaShsLnNsaWNlKHQpLCEwKSxvfSxTPS9bXHU0ZTAwLVx1OWZhNV0vZyxNPShsPXt9KT0+KHtmdXp6eTouMixwcmVmaXg6ITAscHJvY2Vzc1Rlcm06ZT0+e2NvbnN0IG49ZS5tYXRjaChTKXx8W10scz1lLnJlcGxhY2UoUywiIikudG9Mb3dlckNhc2UoKTtyZXR1cm4gcz9bcywuLi5uXTpbLi4ubl19LC4uLmx9KSxGPShsLGUpPT5lLmNvbnRlbnRzLnJlZHVjZSgobixbLHNdKT0+bitzLDApLWwuY29udGVudHMucmVkdWNlKChuLFssc10pPT5uK3MsMCksXz0obCxlKT0+TWF0aC5tYXgoLi4uZS5jb250ZW50cy5tYXAoKFssbl0pPT5uKSktTWF0aC5tYXgoLi4ubC5jb250ZW50cy5tYXAoKFssbl0pPT5uKSksTz0obCxlLG49e30pPT57Y29uc3Qgcz17fTtyZXR1cm4gQyhlLGwsTSh7Ym9vc3Q6e2g6Mix0OjEsYzo0fSwuLi5ufSkpLmZvckVhY2gobz0+e2NvbnN0e2lkOnQsdGVybXM6cixzY29yZTppfT1vLGg9dC5pbmNsdWRlcygiQCIpLGM9dC5pbmNsdWRlcygiIyIpLFtnLHBdPXQuc3BsaXQoL1sjQF0vKSxtPXIuc29ydCgodSxhKT0+dS5sZW5ndGgtYS5sZW5ndGgpLmZpbHRlcigodSxhKT0+ci5zbGljZShhKzEpLmV2ZXJ5KGY9PiFmLmluY2x1ZGVzKHUpKSkse2NvbnRlbnRzOmR9PXNbZ10/Pz17dGl0bGU6IiIsY29udGVudHM6W119O2lmKGgpZC5wdXNoKFt7dHlwZToiY3VzdG9tRmllbGQiLGtleTpnLGluZGV4OnAsZGlzcGxheTptLm1hcCh1PT5vLmMubWFwKGE9PngoYSx1KSkpLmZsYXQoKS5maWx0ZXIodT0+dSE9PW51bGwpfSxpXSk7ZWxzZXtjb25zdCB1PW0ubWFwKGE9Pngoby5oLGEpKS5maWx0ZXIoYT0+YSE9PW51bGwpO2lmKHUubGVuZ3RoJiZkLnB1c2goW3t0eXBlOmM/ImhlYWRpbmciOiJ0aXRsZSIsa2V5OmcsLi4uYyYme2FuY2hvcjpwfSxkaXNwbGF5OnV9LGldKSwidCJpbiBvKWZvcihjb25zdCBhIG9mIG8udCl7Y29uc3QgZj1tLm1hcCh5PT54KGEseSkpLmZpbHRlcih5PT55IT09bnVsbCk7Zi5sZW5ndGgmJmQucHVzaChbe3R5cGU6InRleHQiLGtleTpnLC4uLmMmJnthbmNob3I6cH0sZGlzcGxheTpmfSxpXSl9fX0pLEUocykuc29ydCgoWyxvXSxbLHRdKT0+U0VBUkNIX1BST19TT1JUX1NUUkFURUdZPT09InRvdGFsIj9GKG8sdCk6XyhvLHQpKS5tYXAoKFtvLHt0aXRsZTp0LGNvbnRlbnRzOnJ9XSk9PntpZighdCl7Y29uc3QgaT1SKGUsbyk7aSYmKHQ9aS5oKX1yZXR1cm57dGl0bGU6dCxjb250ZW50czpyLm1hcCgoW2ldKT0+aSl9fSl9LGs9KGwsZSxuPXt9KT0+VChlLGwsTShuKSkubWFwKCh7c3VnZ2VzdGlvbjpzfSk9PnMpO3NlbGYub25tZXNzYWdlPWFzeW5jKHtkYXRhOnt0eXBlOmw9ImFsbCIscXVlcnk6ZSxsb2NhbGU6bixvcHRpb25zOnN9fSk9Pntjb25zdHtkZWZhdWx0Om99PWF3YWl0ICRbbl0oKSx0PXcobyx7ZmllbGRzOlsiaCIsInQiLCJjIl0sc3RvcmVGaWVsZHM6WyJoIiwidCIsImMiXX0pO2w9PT0ic3VnZ2VzdCI/c2VsZi5wb3N0TWVzc2FnZShrKGUsdCxzKSk6bD09PSJzZWFyY2giP3NlbGYucG9zdE1lc3NhZ2UoTyhlLHQscykpOnNlbGYucG9zdE1lc3NhZ2Uoe3N1Z2dlc3Rpb25zOmsoZSx0LHMpLHJlc3VsdHM6TyhlLHQscyl9KX07Ci8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcAo=",import.meta.url);let C6={};const $d=Symbol(""),M6=()=>me($d),j6=e=>{e.provide($d,C6)},J6=()=>{const e=new Worker(`/${Rl.worker}`,{}),t=[];return e.addEventListener("message",({data:n})=>{const{resolve:a}=t.shift();a(n)}),{search:n=>new Promise((a,o)=>{e.postMessage(n),t.push({resolve:a,reject:o})}),terminate:()=>{e.terminate(),t.forEach(({reject:n})=>n(new Error("Worker has been terminated.")))}}},B6=(e,t=!1)=>{const n=H(0),a=L(()=>e.value[n.value]),o=()=>{n.value=n.value>0?n.value-1:e.value.length-1},l=()=>{n.value=n.value<e.value.length-1?n.value+1:0};return ue(e,()=>{t||(n.value=0)}),{index:n,item:a,prev:o,next:l}},Sl=Symbol(""),N6=()=>{const e=H(!1);it(Sl,e)},$6=e=>e instanceof Element?document.activeElement===e&&(["TEXTAREA","SELECT","INPUT"].includes(e.tagName)||e.hasAttribute("contenteditable")):!1,Q6=e=>Nd.some(t=>{const{key:n,ctrl:a=!1,shift:o=!1,alt:l=!1,meta:s=!1}=t;return n===e.key&&a===e.ctrlKey&&o===e.shiftKey&&l===e.altKey&&s===e.metaKey}),F6='<svg width="15" height="15" aria-label="Enter key" role="img"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2"><path d="M12 3.53088v3c0 1-1 2-2 2H4M7 11.53088l-3-3 3-3"></path></g></svg>',H6='<svg width="15" height="15" aria-label="Arrow down" role="img"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2"><path d="M7.5 3.5v8M10.5 8.5l-3 3-3-3"></path></g></svg>',z6='<svg width="15" height="15" aria-label="Arrow up" role="img"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2"><path d="M7.5 11.5v-8M10.5 6.5l-3-3-3 3"></path></g></svg>',U6='<svg width="15" height="15" aria-label="Escape key" role="img"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2"><path d="M13.6167 8.936c-.1065.3583-.6883.962-1.4875.962-.7993 0-1.653-.9165-1.653-2.1258v-.5678c0-1.2548.7896-2.1016 1.653-2.1016.8634 0 1.3601.4778 1.4875 1.0724M9 6c-.1352-.4735-.7506-.9219-1.46-.8972-.7092.0246-1.344.57-1.344 1.2166s.4198.8812 1.3445.9805C8.465 7.3992 8.968 7.9337 9 8.5c.032.5663-.454 1.398-1.4595 1.398C6.6593 9.898 6 9 5.963 8.4851m-1.4748.5368c-.2635.5941-.8099.876-1.5443.876s-1.7073-.6248-1.7073-2.204v-.4603c0-1.0416.721-2.131 1.7073-2.131.9864 0 1.6425 1.031 1.5443 2.2492h-2.956"></path></g></svg>',W6=e=>{const t=H([]);{const n=M6(),a=Et();fe(()=>{const o=S2(c=>{c?l({type:"suggest",query:c,locale:a.value,options:n}).then(d=>{t.value=d.length?en(d[0],c)&&!d[0].slice(c.length).includes(" ")?d:[c,...d]:[]}).catch(d=>{console.error(d)}):t.value=[]},Rl.suggestDelay),{search:l,terminate:s}=J6();ue([e,a],()=>o(e.value),{immediate:!0}),Kn(()=>{s()})})}return{suggestions:t}},ir=Nd[0];var G6=C({name:"SearchBox",setup(){const e=jt(Ol),t=me(Sl),n=H(!1),a=L(()=>ir?[(n.value?["⌃","⇧","⌥","⌘"]:["Ctrl","Shift","Alt","Win"]).filter((o,l)=>ir[["ctrl","shift","alt","meta"][l]]),ir.key.toUpperCase()]:null);return Te("keydown",o=>{!t.value&&Q6(o)&&!$6(o.target)&&(o.preventDefault(),t.value=!0)}),fe(()=>{const{userAgent:o}=navigator;n.value=c2(o)||i2(o)||s2(o)}),()=>[i("button",{type:"button",class:"search-pro-button","aria-label":e.value.search,onClick:()=>{t.value=!0}},[i(Pl),i("div",{class:"search-pro-placeholder"},e.value.search),a.value?i("div",{class:"search-pro-key-hints"},a.value.map(o=>i("kbd",{class:"search-pro-key"},o))):null])]}});const K6=v({loader:()=>r(()=>import("./SearchResult-WU77dDE7.js"),__vite__mapDeps([])),loadingComponent:()=>{const e=jt(Ol);return i(Bd,{hint:e.value.loading})}});var X6=C({name:"SearchModal",setup(){const e=me(Sl),t=_n(),n=ou(),a=jt(Ol),o=H(""),{suggestions:l}=W6(o),s=H(!1),{index:c,prev:d,next:u}=B6(l),p=je(),h=je(),m=(_=c.value)=>{o.value=l.value[_],s.value=!1};return Te("keydown",_=>{s.value?_.key==="ArrowUp"?d():_.key==="ArrowDown"?u():_.key==="Enter"?m():_.key==="Escape"&&(s.value=!1):_.key==="Escape"&&(e.value=!1)}),fe(()=>{const _=pl(document.body);ue(e,async g=>{var E;_.value=g,g&&(await Ct(),(E=p.value)==null||E.focus())}),M2(h,()=>{s.value=!1}),Kn(()=>{_.value=!1})}),()=>e.value?i("div",{class:"search-pro-modal-wrapper"},[i("div",{class:"search-pro-mask",onClick:()=>{e.value=!1,o.value=""}}),i("div",{class:"search-pro-modal"},[i("div",{class:"search-pro-box"},[i("form",[i("label",{for:"search-pro","aria-label":a.value.search},i(Pl)),i("input",{ref:p,type:"search",class:"search-pro-input",id:"search-pro",placeholder:a.value.placeholder,spellcheck:"false",autocapitalize:"off",autocomplete:"off",autocorrect:"off",name:`${t.value.title}-search`,value:o.value,"aria-controls":"search-pro-results",onKeydown:_=>{const{key:g}=_;l.value.length&&(g==="Tab"?(m(),_.preventDefault()):(g==="ArrowDown"||g==="ArrowUp"||g==="Escape")&&_.preventDefault())},onInput:({target:_})=>{o.value=_.value,s.value=!0,c.value=0}}),o.value?i("button",{type:"reset",class:"search-pro-clear-button",innerHTML:S6,onClick:()=>{o.value=""}}):null,s.value&&l.value.length?i("ul",{class:"search-pro-suggestions",ref:h},l.value.map((_,g)=>i("li",{class:["search-pro-suggestion",{active:g===c.value}],onClick:()=>{m(g)}},[i("kbd",{class:"search-pro-auto-complete",title:`Tab ${a.value.autocomplete}`},"Tab"),_]))):null]),i("button",{type:"button",class:"search-pro-close-button",onClick:()=>{e.value=!1,o.value=""}},a.value.cancel)]),i(K6,{query:o.value,isFocusing:!s.value,onClose:()=>{e.value=!1},onUpdateQuery:_=>{o.value=_}}),n.value?null:i("div",{class:"search-pro-hints"},[i("span",{class:"search-pro-hint"},[i("kbd",{innerHTML:F6}),a.value.select]),i("span",{class:"search-pro-hint"},[i("kbd",{innerHTML:z6}),i("kbd",{innerHTML:H6}),a.value.navigate]),i("span",{class:"search-pro-hint"},[i("kbd",{innerHTML:U6}),a.value.exit])])])]):null}}),Z6=pt({enhance({app:e}){j6(e),e.component("SearchBox",G6)},setup(){N6()},rootComponents:[X6]});const to=[Nv,nh,ch,mh,bh,Lh,Dh,Mh,Bh,p4,L4,T6,Z6],Y6=[["v-8daa1a0e","/",{y:"h",t:"主页",i:"home"},["/README.md"]],["v-79fdd481","/home.html",{y:"h",t:"项目主页",i:"home"},[":md"]],["v-0e503981","/slide.html",{d:168791737e4,e:`<!-- markdownlint-disable MD024 MD033 -->
<p>@slidestart</p>
<!-- .slide: data-transition="slide" -->
<h2> 幻灯片演示</h2>
<!-- .element: class="r-fit-text" -->
<p>一个简单的幻灯片演示与各种小贴士。</p>
<!-- .element: class="r-fit-text" -->
<blockquote>
<p>作者 Mr.Hope. 请滚动鼠标滚轮进入下一页</p>
</blockquote>
<hr>
<h2> 标注幻灯片</h2>
<!-- .element: class="r-fit-text" -->`,r:{minutes:4.5,words:1349},y:"s",t:"幻灯片页",i:"slides"},[":md"]],["v-74bc627b","/about/",{d:168791737e4,e:`<h1> 数据库</h1>
`,r:{minutes:.01,words:3},y:"a",t:"数据库"},["/about/README.md"]],["v-2d0a870d","/en/",{y:"h",t:"博客主页",i:"home"},["/en/README.md"]],["v-7c2196ed","/en/home.html",{y:"h",t:"项目主页",i:"home"},[":md"]],["v-50a4c495","/en/slide.html",{d:168791737e4,e:`<!-- markdownlint-disable MD024 MD033 -->
<p>@slidestart</p>
<!-- .slide: data-transition="slide" -->
<h2> 幻灯片演示</h2>
<!-- .element: class="r-fit-text" -->
<p>一个简单的幻灯片演示与各种小贴士。</p>
<!-- .element: class="r-fit-text" -->
<blockquote>
<p>作者 Mr.Hope. 请滚动鼠标滚轮进入下一页</p>
</blockquote>
<hr>
<h2> 标注幻灯片</h2>
<!-- .element: class="r-fit-text" -->`,r:{minutes:4.5,words:1349},y:"s",t:"幻灯片页",i:"slides"},[":md"]],["v-7d72c4ac","/framework/",{d:168791737e4,y:"a",t:""},["/framework/README.md"]],["v-7e25fb5f","/front/",{d:168791737e4,y:"a",t:""},["/front/README.md"]],["v-fffb8e28","/guide/",{d:168791737e4,c:["使用指南"],e:`<h2> 目录</h2>
<ul>
<li>
<p><a href="/guide/markdown.html" target="blank">Markdown 展示</a></p>
</li>
<li>
<p><a href="/guide/page.html" target="blank">页面展示</a></p>
</li>
<li>
<p><a href="/guide/disable.html" target="blank">禁用展示</a></p>
</li>
<li>
<p><a href="/guide/encrypt.html" target="blank">加密展示</a></p>
</li>
</ul>`,r:{minutes:.13,words:40},y:"a",t:"主要功能与配置演示",i:"creative"},["/guide/README.md"]],["v-4c863446","/guide/disable.html",{d:168791737e4,c:["使用指南"],g:["禁用"],e:`<p>你可以通过设置页面的 Frontmatter，在页面禁用功能与布局。</p>
`,r:{minutes:.42,words:126},y:"a",t:"布局与功能禁用",i:"config",O:3},[":md"]],["v-bf720700","/guide/encrypt.html",{d:168791737e4,c:["使用指南"],g:["文章加密"],n:!0,r:{minutes:.52,words:156},y:"a",t:"密码加密的文章",i:"lock"},[":md"]],["v-0978b044","/guide/markdown.html",{d:168791737e4,c:["使用指南"],g:["Markdown"],e:`<p>VuePress 主要从 Markdown 文件生成页面。因此，你可以使用它轻松生成文档或博客站点。</p>
<p>你应该创建和编写 Markdown 文件，以便 VuePress 可以根据文件结构将它们转换为不同的页面。</p>
`,r:{minutes:3.58,words:1073},y:"a",t:"Markdown 展示",i:"markdown",O:2},[":md"]],["v-4eaf9f84","/guide/page.html",{a:"Ms.Hope",d:15778368e5,l:"2020年1月1日",c:["使用指南"],g:["页面配置","使用指南"],u:!0,e:`<p><code>more</code> 注释之前的内容被视为文章摘要。</p>
`,r:{minutes:1.46,words:438},y:"a",t:"页面配置",i:"page",O:1},[":md"]],["v-2250a72e","/me/study.html",{d:168791737e4,e:`<h2> 自我提升九大招</h2>
<ol>
<li>
<p>早睡半小时，早起10分钟</p>
<p>许多人晚睡的原因，其实都是在刷手机。从今天开始，不把手机带上床，早睡半小时，第二天就会精神饱满。把第二天的闹钟往前调10分钟，早起10分钟做些你想做的事，读书、锻炼、做早餐，都会给你带来意想不到的提升。</p>
</li>
<li>
<p>坚持运动</p>
<p>运动是治愈一切的良药。那些长期坚持运动的人，都在不同程度地变好看、变自律、变优秀、变健康。开始运动吧，从多散步十分钟或者每天做10个俯卧撑开始，循序渐进，踏踏实实地完成运动任务，你一定会越来越好。</p>
</li>
<li>
<p>欣赏别人的优点，警醒自己的缺点</p>
<p>老话说，取他人之长，补己之短。学会用欣赏的眼光看他人，汲取他人身上的闪光点。当你看到别人的缺点时，也要警醒自己身上是否有和他相似的缺点。要记得，我们所做的所有事都是为了提升自我，而不是贬低他人。</p>
</li>
<li>
<p>坚持读书</p>
<p>阅读是自我提升最便捷的方式。如果你经常迷茫、时常焦虑，尝试静下心来读书吧，由内而外，让书籍的知识慢慢渗透，久而久之，看问题的角度变广了，做事情的方法更灵活了，你会爱上自己的改变。</p>
</li>
<li>
<p>在失败中总结经验</p>
<p>人生就是起起伏伏，想要成功，必会经历失败。不要因为一次、两次失败就郁郁寡欢，相比成功而言，失败反而能给我们更多启发和教训。在失败中总结经验，不断调整自己的思维和行为，前方的路才会越走越顺。</p>
</li>
<li>
<p>注意仪容仪表，干净清爽最重要</p>
<p>每个人都是先从外表认识他人的，你的内在再丰富，邋遢的外表也会让人望而却步。可以不精致，但不能不干净。每天都要认真清洁自己，穿合适的衣服，干净清爽的形象会为你加分许多。</p>
</li>
<li>
<p>练习专注力</p>
<p>练习在一段时间内专注于一件事，会让你做事更有效率。开始时，不妨先试着定下10-15分钟的闹钟，在这段时间里专注于一件事，慢慢提升专注力。</p>
</li>
<li>
<p>遇到困难，想办法解决而不是抱怨</p>
<p>遇到困难时，不要只想着抱怨。越是艰难，越是要勇于攀爬，因为每一步不好走的路，都是上坡路。当你开始着手想办法的时候，就会发现，很多事没你想象的那么难。再难的事，也总有解决办法。最难的，是你不敢踏出第一步的心。</p>
</li>
<li>
<p>每晚复盘、反思</p>
<p>睡前15分钟，回忆一下当天发生的事、见过的人，反思自己的行为是否妥当，是否有浪费时间，是否相对昨天有所进步。不断地复盘自己，像医生一样，先检查出自己身上的缺点、弱点，再一个个拔除治疗。复盘会成为你自我提升路上最好的帮手。</p>
</li>
</ol>`,r:{minutes:2.79,words:838},y:"a",t:""},[":md"]],["v-14f73021","/more/",{d:168791737e4,y:"a",t:""},["/more/README.md"]],["v-076107ee","/more/skill.html",{d:1703050584e3,e:`<p>如何编写无法维护的代码<br>
让自己稳拿铁饭碗 😉<br>
-- Roedy Green<br>
（老码农翻译，略有删节）<br>
简介<br>
永远不要（把自己遇到的问题）归因于（他人的）恶意，这恰恰说明了（你自己的）无能。 -- 拿破仑</p>
<p>为了造福大众，在Java编程领域创造就业机会，兄弟我在此传授大师们的秘籍。这些大师写的代码极其难以维护，后继者就是想对它做最简单的修改都需要花上数年时间。而且，如果你能对照秘籍潜心修炼，你甚至可以给自己弄个铁饭碗，因为除了你之外，没人能维护你写的代码。再而且，如果你能练就秘籍中的全部招式，那么连你自己都无法维护你的代码了！</p>
`,r:{minutes:44.72,words:13417},y:"a",t:""},[":md"]],["v-ef7dd9f0","/resource/",{d:1549152e6,l:"2019年2月3日",c:["资源导航"],g:["资源导航"],e:`<h1> 资源导航</h1>
<h2> 常用搜索</h2>
`,r:{minutes:11.57,words:3470},y:"a",t:"资源导航"},["/resource/README.md"]],["v-1559ca3e","/tool/",{y:"h",t:"主页",i:"home"},["/tool/README.md"]],["v-acebc5a4","/tool/mermaid.html",{d:168791737e4,e:`<h1> 流程图</h1>
<h3> 默认节点</h3>
<div class="language-mermaid line-numbers-mode" data-ext="mermaid"><pre class="language-mermaid"><code><span class="token keyword">flowchart</span> LR
    id
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,r:{minutes:8.97,words:2692},y:"a",t:"流程图"},[":md"]],["v-30c465ed","/tool/zuosi.html",{d:168791737e4,e:`<p>今天给大家分享一波 Java 中的代码作死小技巧，熟练掌握这些小技巧后，保证能让你写出同事看不懂的代码~</p>
<p>至于为啥要写出同事看不懂的代码，我发现好处还是挺多的，简单举几个例子：</p>
<ul>
<li>同事无法轻易修改你的代码，避免团队协作不当引入 bug</li>
<li>塑造个人能力的不可替代性，规避被辞退的风险</li>
<li>代码 review 时，帮助同事治疗好多年的低血压</li>
</ul>
<figure><img src="https://mmbiz.qpic.cn/mmbiz_jpg/zpom4BeZSicZeTVUxgBubfoibv2iaNJ9WVGWUfL1YLpd2wjiaZc31YwzaG1WYJvYEfmZBjPuQvZAXrCMYIfqoKYOfQ/640?wx_fmt=jpeg&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1" alt="图片" tabindex="0" loading="lazy"><figcaption>图片</figcaption></figure>`,r:{minutes:9.28,words:2783},y:"a",t:""},[":md"]],["v-1e6b6908","/develop/certificate/cert-cmm.html",{d:15660864e5,l:"2019年8月18日",c:["系统认证"],g:["认证"],e:`<h1> 能力成熟度模型集成认证 - CMMI</h1>
<blockquote>
<p>能力成熟度模型集成认证 - CMMI。</p>
</blockquote>
<h2> 什么是软件过程</h2>
<blockquote>
<p>在开发产品或构建系统时，遵循一系列可预测的步骤（即路线图）是非常重要的，它有助于及时交付高质量的产品。软件开发中所遵循的路线图称为“软件过程”。过程是活动的集合，活动是任务的集合。</p>
</blockquote>
<p>软件过程有3层含义：</p>
<ul>
<li>一是个体含义，即指软件产品或系统在生存周期中的某一类活动的集合，如软件开发过程、软件管理过程等；</li>
<li>二是整体含义，即指软件产品或系统在所有上述含义下的软件过程的总体；</li>
<li>三是工程含义，即指解决软件过程的工程，应用软件的原则、方法来构造软件过程模型，并结合软件产品的具体要求进行实例化，以及在用户环境下的运作，以此进一步提高软件的生产率，降低成本。</li>
</ul>`,r:{minutes:11.3,words:3391},y:"a",t:"能力成熟度模型集成认证 - CMMI"},[":md"]],["v-c1340c6e","/develop/certificate/cert-dengbao.html",{d:15661728e5,l:"2019年8月19日",c:["系统认证"],g:["认证"],e:`<h1> 信息安全等级保护认证</h1>
<blockquote>
<p>随着国内对网络安全的逐步重视，以及《网络安全法》的出台， 在金融、电力、广电、医疗、教育等行业，主管单位明确要求从业机构的信息系统（APP）要开展等级保护工作。落实到企业，包含等级保护认证和每年的护网活动等。</p>
</blockquote>
<h2> 什么是等级保护？</h2>
<p>在中国，信息安全等级保护广义上为涉及到该工作的标准、产品、系统、信息等均依据等级保护思想的安全工作；狭义上一般指信息系统（APP）安全等级保护。</p>
<p>信息安全等级保护：</p>
<ul>
<li>对信息系统分等级进行安全保护和监管；</li>
<li>对信息安全产品的使用实行分等级管理；</li>
<li>对信息安全事件实行分等级响应、处置。</li>
</ul>`,r:{minutes:5.51,words:1652},y:"a",t:"信息安全等级保护认证"},[":md"]],["v-d21282e8","/develop/certificate/cert-iso27001.html",{d:15662592e5,l:"2019年8月20日",c:["系统认证"],g:["认证"],e:`<h1> 信息安全管理认证 - ISO27001</h1>
<blockquote>
<p>信息安全管理认证 - ISO27001详解。</p>
</blockquote>
<h2> ISO27001起源和发展</h2>
<p>信息安全管理实用规则ISO/IEC27001的前身为英国的BS7799标准，该标准由英国标准协会（BSI）于1995年2月提出，并于1995年5月修订而成的。1999年BSI重新修改了该标准。BS7799分为两个部分：</p>
<p>BS7799-1，信息安全管理实施规则</p>
<p>BS7799-2，信息安全管理体系规范。</p>
<p>第一部分对信息安全管理给出建议，供负责在其组织启动、实施或维护安全的人员使用；第二部分说明了建立、实施和文件化信息安全管理体系（ISMS）的要求，规定了根据独立组织的需要应实施安全控制的要求。</p>`,r:{minutes:6.6,words:1981},y:"a",t:"信息安全管理认证 - ISO27001"},[":md"]],["v-fb605120","/develop/certificate/dev-x-overview.html",{d:1566e9,l:"2019年8月17日",c:["系统认证"],g:["认证"],e:`<h1> ♥常见企业开发和系统认证♥</h1>
<blockquote>
<p>常见企业开发和系统认证详解。</p>
</blockquote>
<h2> 相关文章</h2>
<blockquote>
<p>常见企业开发和系统认证相关文章。</p>
</blockquote>
<ul>
<li>能力成熟度模型集成认证 - CMMI
<ul>
<li>在美国国防部的支持下，1987年，卡内基·梅隆大学软件工程研究所率先推出了软件工程评估项目的研究成果--软件过程能力成熟度模型（Capability Maturity Model of Software，即CMM），其研究目的是提供一种评价软件承接方能力的方法，同时它可帮助软件组织改进其软件过程。CMM是对软件组织进化阶段的描述，随着软件组织定义、实施、测量、控制和改进其软件过程，软件组织的能力经过这些阶段逐步提高。该能力成熟度模型使软件组织能够较容易的确定其当前过程的成熟度并识别其软件过程执行中的薄弱环节，确定对软件质量和过程改进最为关键的几个问题，从而形成对其过程的改进策略。软件组织只要关注并认真实施一组有限的关键实践活动，就能稳步的改善其全组织的软件过程，使全组织的软件过程能力持续增长。</li>
</ul>
</li>
<li>信息安全等级保护认证
<ul>
<li>随着国内对网络安全的逐步重视，以及《网络安全法》的出台， 在金融、电力、广电、医疗、教育等行业，主管单位明确要求从业机构的信息系统（APP）要开展等级保护工作。落实到企业，包含等级保护认证和每年的护网活动等。</li>
</ul>
</li>
<li>信息安全管理认证 - ISO27001
<ul>
<li>信息安全管理实用规则ISO/IEC27001的前身为英国的BS7799标准，该标准由英国标准协会（BSI）于1995年2月提出，并于1995年5月修订而成的。1999年BSI重新修改了该标准。BS7799分为两个部分:BS7799-1，信息安全管理实施规则; BS7799-2，信息安全管理体系规范。第一部分对信息安全管理给出建议，供负责在其组织启动、实施或维护安全的人员使用；第二部分说明了建立、实施和文件化信息安全管理体系（ISMS）的要求，规定了根据独立组织的需要应实施安全控制的要求。</li>
</ul>
</li>
</ul>`,r:{minutes:2.13,words:639},y:"a",t:"♥常见企业开发和系统认证♥"},[":md"]],["v-0d4f9864","/develop/cron/dev-cron-x-tools.html",{d:15561504e5,l:"2019年4月25日",c:["开发理论"],g:["CRON表达式"],e:`<h1> CRON生成和校验工具</h1>
<blockquote>
<p>本文主要总结常用的在线CRON生成和校验工具，从而高效的写出正确的表达式。</p>
</blockquote>
<h2> CRON生成和校验工具</h2>
<blockquote>
<p>生成和校验工具</p>
</blockquote>
<p><a href="https://www.bejson.com/othertools/cron/" target="_blank" rel="noopener noreferrer">https://www.bejson.com/othertools/cron/</a></p>`,r:{minutes:.4,words:121},y:"a",t:"CRON生成和校验工具"},[":md"]],["v-f8115f44","/develop/cron/dev-cron-x-usage.html",{d:1556064e6,l:"2019年4月24日",c:["开发理论"],g:["CRON表达式"],e:`<h1> CRON表达式介绍和使用</h1>
<blockquote>
<p>定时任务和CRON表达式在开发中使用也非常广泛，本文整理了CRON表达式和常见使用例子。</p>
</blockquote>
<h2> 什么是Cron</h2>
<blockquote>
<p>来自<a href="https://baike.baidu.com/item/cron/10952601" target="_blank" rel="noopener noreferrer">百度百科在新窗口打开</a></p>
</blockquote>
<p>计划任务，是任务在约定的时间执行已经计划好的工作，这是表面的意思。在Linux中，我们经常用到 cron 服务器来完成这项工作。cron服务器可以根据配置文件约定的时间来执行特定的任务。</p>`,r:{minutes:5.95,words:1786},y:"a",t:"CRON表达式介绍和使用"},[":md"]],["v-9fc6e360","/develop/design/adapter.html",{d:15713568e5,l:"2019年10月18日",c:["设计模式"],g:["设计模式"],e:`<h2> 基本介绍</h2>
<p>在现实生活中，经常出现两个对象因接口不兼容而不能在一起工作的实例，这时需要第三者进行适配。例如，讲中文的人同讲英文的人对话时需要一个翻译，用直流电的笔记本电脑接交流电源时需要一个电源适配器，用计算机访问照相机的 SD 内存卡时需要一个读卡器等。</p>
<p>在软件设计中也可能出现：需要开发的具有某种业务功能的组件在现有的组件库中已经存在，但它们与当前系统的接口规范不兼容，如果重新开发这些组件成本又很高，这时用适配器模式能很好地解决这些问题。</p>
<p><strong>适配器模式</strong>（Adapter Pattern）将某个类的接口转换成客户端期望的另一个接口表示，主的目的是兼容性，让原本因接口不匹配不能一起工作的两个类可以协同工作。其别名为包装器（Wrapper）。</p>`,r:{minutes:9,words:2701},y:"a",t:"结构型适配器模式"},[":md"]],["v-23dca26c","/develop/design/bridge.html",{d:15715296e5,l:"2019年10月20日",c:["设计模式"],g:["设计模式"],e:`<h2> 桥接模式基本介绍</h2>
<p>在现实生活中，某些类具有两个或多个维度的变化，如图形既可按形状分，又可按颜色分。如何设计类似于 Photoshop 这样的软件，能画不同形状和不同颜色的图形呢？如果用继承方式，m 种形状和 n 种颜色的图形就有 m×n 种，不但对应的子类很多，而且扩展困难。</p>
<p>当然，这样的例子还有很多，如不同颜色和字体的文字、不同品牌和功率的汽车、不同性别和职业的男女、支持不同平台和不同文件格式的媒体播放器等。如果用桥接模式就能很好地解决这些问题。</p>
<p><strong>桥接模式</strong>（Bridge Pattern）是指：将实现与抽象放在两个不同的类层次中，使两个层次可以独立改变，是一种结构型设计模式。</p>`,r:{minutes:7.66,words:2297},y:"a",t:"结构型桥接模式"},[":md"]],["v-6e251184","/develop/design/builder.html",{d:1571184e6,l:"2019年10月16日",c:["设计模式"],g:["设计模式"],e:`<h2> 建造者模式基本介绍</h2>
<p>在软件开发过程中有时需要创建一个复杂的对象，这个复杂对象通常由多个子部件按一定的步骤组合而成。例如，计算机是由 CPU、主板、内存、硬盘、显卡、机箱、显示器、键盘、鼠标等部件组装而成的，采购员不可能自己去组装计算机，而是将计算机的配置要求告诉计算机销售公司，计算机销售公司安排技术人员去组装计算机，然后再交给要买计算机的采购员。</p>
<p>生活中这样的例子很多，如游戏中的不同角色，其性别、个性、能力、脸型、体型、服装、发型等特性都有所差异；还有汽车中的方向盘、发动机、车架、轮胎等部件也多种多样；每封电子邮件的发件人、收件人、主题、内容、附件等内容也各不相同。</p>`,r:{minutes:8.9,words:2671},y:"a",t:"创建型建造者模式"},[":md"]],["v-2b152058","/develop/design/command.html",{d:15728256e5,l:"2019年11月4日",c:["设计模式"],g:["设计模式"],e:`<h2> 命令模式基本介绍</h2>
<p>在软件开发系统中，「方法的请求者」与「方法的实现者」之间经常存在紧密的耦合关系，这不利于软件功能的扩展与维护。例如，想对方法进行「撤销、重做、记录」等处理都很不方便，因此「如何将方法的请求者与实现者解耦？」变得很重要，命令模式就能很好地解决这个问题。</p>
<p><strong>命令模式</strong>（Command Pattern）：在软件设计中，我们经常需要向某些对象发送请求，但是并不知道请求的接收者是谁，也不知道被请求的操作是哪个，我们只需在程序运行时指定具体的请求接收者即可，此时，可以使用命令模式来进行设计。</p>
<p>命名模式使得 <strong>请求发送者与请求接收者消除彼此之间的耦合</strong>，让对象之间的调用关系更加灵活，实现解耦。</p>`,r:{minutes:9.42,words:2825},y:"a",t:"行为型命令模式"},[":md"]],["v-cf7f7ed0","/develop/design/composite.html",{d:15718752e5,l:"2019年10月24日",c:["设计模式"],g:["设计模式"],e:`<h2> 组合模式基本介绍</h2>
<p>在现实生活中，存在很多「部分-整体」的关系，例如，大学中的部门与学院、总公司中的部门与分公司、学习用品中的书与书包、生活用品中的衣服与衣柜、以及厨房中的锅碗瓢盆等。在软件开发中也是这样，例如，文件系统中的文件与文件夹、窗体程序中的简单控件与容器控件等。对这些简单对象与复合对象的处理，如果用组合模式来实现会很方便。</p>
<p><strong>组合模式</strong>（Composite Pattern），又叫 <strong>部分整体模式</strong>，它创建了对象组的树形结构，将对象组合成树状结构以表示「整体-部分」的层次关系，属于结构型模式。</p>`,r:{minutes:8.43,words:2530},y:"a",t:"结构型组合模式"},[":md"]],["v-3b93eb64","/develop/design/decorator.html",{d:15717024e5,l:"2019年10月22日",c:["设计模式"],g:["设计模式"],e:`<h2> 装饰器模式的定义与特点</h2>
<p>上班族大多都有睡懒觉的习惯，每天早上上班时间都很紧张，于是很多人为了多睡一会，就会用方便的方式解决早餐问题。有些人早餐可能会吃煎饼，煎饼中可以加鸡蛋，也可以加香肠，但是不管怎么「加码」，都还是一个煎饼。在现实生活中，常常需要对现有产品增加新的功能或美化其外观，如房子装修、相片加相框等，都是装饰器模式。</p>
<p>在软件开发过程中，有时想用一些现存的组件。这些组件可能只是完成了一些核心功能。但在不改变其结构的情况下，可以动态地扩展其功能。所有这些都可以釆用装饰器模式来实现。</p>
<p><strong>装饰器模式</strong>（Decorator Pattern）的定义：指 <strong>在不改变现有对象结构的情况下，动态地给该对象增加一些职责</strong>（即增加其额外功能）的模式，它属于对象结构型模式，也体现了开闭原则（OCP）。</p>`,r:{minutes:7.24,words:2171},y:"a",t:"结构型装饰者模式"},[":md"]],["v-2014e344","/develop/design/end.html",{d:157464e7,l:"2019年11月25日",c:["设计模式"],g:["设计模式"],e:`<h2> 总结</h2>
<p>23 种设计模式表格总结：</p>
<h3> 创建型设计模式</h3>
<p>简单来说就是用来创建对象的</p>
<table>
<thead>
<tr>
<th>设计模式</th>
<th>分类</th>
<th>简述</th>
<th>一句话归纳</th>
<th>目的</th>
<th>生活案例</th>
</tr>
</thead>
<tbody>
<tr>
<td>工厂模式（Factory Pattern）</td>
<td>不同条件下创建不同实例</td>
<td>工厂生产物品</td>
<td>产品标准化，生产更高效</td>
<td>封装创建细节</td>
<td>实体工厂</td>
</tr>
<tr>
<td>单例模式（Singleton Pattern）</td>
<td>保证一个类仅有一个实例，并且提供一个全局访问点</td>
<td>世上只有一个我</td>
<td>保证独一无二</td>
<td>CEO</td>
<td></td>
</tr>
<tr>
<td>原型模式（Prototype Pattern）</td>
<td>通过拷贝原型创建新的对象</td>
<td>拔一根猴毛，吹出千万个</td>
<td>高效创建对象</td>
<td>克隆</td>
<td></td>
</tr>
<tr>
<td>建造者模式（Builder Pattern）</td>
<td>用来创建复杂的复合对象</td>
<td>高配中配和低配，想选哪配就哪配</td>
<td>开放个性配置步骤</td>
<td>选配</td>
<td></td>
</tr>
</tbody>
</table>`,r:{minutes:4.5,words:1350},y:"a",t:"设计模式总结"},[":md"]],["v-8e59b74e","/develop/design/facade.html",{d:1572048e6,l:"2019年10月26日",c:["设计模式"],g:["设计模式"],e:`<h2> 外观模式基本介绍</h2>
<p>现实生活中，常常存在办事较复杂的例子，如办房产证或注册一家公司，有时要同多个部门联系，这时要是有一个综合部门能解决一切手续问题就好了。</p>
<p>软件设计也是这样，当一个系统的功能越来越强，子系统会越来越多，客户对系统的访问也变得越来越复杂。这时如果系统内部发生改变，客户端也要跟着改变，这违背了「开闭原则」，也违背了「迪米特法则」，所以有必要为多个子系统提供一个统一的接口，从而降低系统的耦合度，这就是外观模式的目标。</p>
<p><strong>外观模式</strong>（Facade Pattern），也叫 <strong>过程模式</strong>、<strong>门面模式</strong>，是一种通过为多个复杂的子系统提供一个一致的接口，而使这些子系统更加容易被访问的模式。该模式对外有一个统一接口，外部应用程序不用关心内部子系统的具体细节，这样会大大降低应用程序的复杂度，提高了程序的可维护性。</p>`,r:{minutes:7.67,words:2300},y:"a",t:"结构型外观模式"},[":md"]],["v-05c85d75","/develop/design/factory.html",{d:15708384e5,l:"2019年10月12日",c:["设计模式"],g:["设计模式"],e:`<h2> 工厂模式概述</h2>
<blockquote>
<p>工厂模式很重要，后面的很多架构设计，都是工厂模式联合着其它设计模式使用。</p>
</blockquote>
<p>一般情况下，工厂模式分为三种更加细分的类型：简单工厂、工厂方法和抽象工厂。不过，在 GOF 的《设计模式》一书中，它将简单工厂模式看作是工厂方法模式的一种特例，所以工厂模式只被分成了工厂方法和抽象工厂两类。实际上，前面一种分类方法更加常见，所以，在今天的讲解中，我们沿用第一种分类方法。</p>
<p>在这三种细分的工厂模式中，简单工厂、工厂方法原理比较简单，在实际的项目中也比较常用。而抽象工厂的原理稍微复杂点，在实际的项目中相对也不常用。</p>`,r:{minutes:26.74,words:8023},y:"a",t:"创建型工厂模式"},[":md"]],["v-5a65fcf4","/develop/design/flyweight.html",{d:15722208e5,l:"2019年10月28日",c:["设计模式"],g:["设计模式"],e:`<h2> 享元模式基本介绍</h2>
<p>在面向对象程序设计过程中，有时会面临要创建大量相同或相似对象实例的问题。创建那么多的对象将会耗费很多的系统资源，它是系统性能提高的一个瓶颈。</p>
<p>例如，围棋和五子棋中的黑白棋子，图像中的坐标点或颜色，局域网中的路由器、交换机和集线器，教室里的桌子和凳子等。这些对象有很多相似的地方，如果能把它们相同的部分提取出来共享，则能节省大量的系统资源，这就是享元模式的产生背景。</p>
<p><strong>享元模式</strong>（Flyweight Pattern） 也叫 <strong>蝇量模式</strong>: 运用共享技术有效地支持大量细粒度的对象。</p>`,r:{minutes:10.93,words:3279},y:"a",t:"结构型享元模式"},[":md"]],["v-26071b05","/develop/design/interpreter.html",{d:15738624e5,l:"2019年11月16日",c:["设计模式"],g:["设计模式"],e:`<h2> 解释器模式基本介绍</h2>
<p>在编译原理中，一个算术表达式通过词法分析器形成词法单元，而后这些词法单元再通过语法分析器构建语法分析树，最终形成一颗抽象的语法分析树。这里的词法分析器和语法分析器都可以看做是解释器。</p>
<p><strong>解释器模式</strong>（Interpreter Pattern）：是指给定一个语言（表达式），定义它的文法的一种表示，并定义一个解释器，使用该解释器来解释语言中的句子（表达式）。这种模式实现了文法表达式处理的接口，该接口解释一个特定的上下文。</p>
<p>这里提到的文法和句子的概念同编译原理中的描述相同，<mark>文法</mark> 指语言的语法规则，而 <mark>句子</mark> 是语言集中的元素。例如，汉语中的句子有很多，「我是中国人」是其中的一个句子，可以用一棵语法树来直观地描述语言中的句子。</p>`,r:{minutes:7.46,words:2238},y:"a",t:"行为型解释器模式"},[":md"]],["v-660b0285","/develop/design/iterator.html",{d:15731712e5,l:"2019年11月8日",c:["设计模式"],g:["设计模式"],e:`<h2> 迭代器模式基本介绍</h2>
<p>迭代器模式在生活中应用的比较广泛，比如：物流系统中的传送带，不管传送的是什么物品，都会被打包成一个个箱子，并且有一个统一的二维码。这样我们不需要关心箱子里是什么，在分发时只需要一个个检查发送的目的地即可。再比如，我们平时乘坐交通工具，都是统一刷卡或者刷脸进站，而不需要关心是男性还是女性、是残疾人还是正常人等信息。</p>
<p><strong>迭代器模式</strong>（Iterator Pattern）是常用的设计模式，属于行为型模式。</p>
<p>如果我们的集合元素是用不同的方式实现的，有数组，还有 Java 的集合类，或者还有其他方式，当客户端要遍历这些集合元素的时候就要使用多种遍历方式，而且还会暴露元素的内部结构，可以考虑使用迭代器模式解决。</p>`,r:{minutes:7.41,words:2222},y:"a",t:"行为型迭代器模式"},[":md"]],["v-fd9681c0","/develop/design/mediator.html",{d:15735168e5,l:"2019年11月12日",c:["设计模式"],g:["设计模式"],e:`<h2> 中介者模式基本介绍</h2>
<p><strong>中介者模式</strong>（Mediator Pattern）又叫 <strong>调停模式</strong>，它是迪米特法则的典型应用。用一个 <strong>中介对象来封装一系列的对象交互</strong>。中介者使各个对象不需要显式地相互引用，从而使其 <strong>耦合松散</strong>，而且可以独立地改变它们之间的交互。</p>
<p>中介者模式属于行为型模式，使代码易于维护。</p>
<p>在现实生活中，常常会出现好多对象之间存在复杂的交互关系，这种交互关系常常是「网状结构」，它要求每个对象都必须知道它需要交互的对象。例如，每个人必须记住他（她）所有朋友的电话；而且，朋友中如果有人的电话修改了，他（她）必须让其他所有的朋友一起修改，这叫作「牵一发而动全身」，非常复杂。</p>`,r:{minutes:7.51,words:2253},y:"a",t:"行为型中介模式"},[":md"]],["v-5aed6ba6","/develop/design/memento.html",{d:15736896e5,l:"2019年11月14日",c:["设计模式"],g:["设计模式"],e:`<h2> 备忘录模式基本介绍</h2>
<p><strong>备忘录模式</strong>（Memento Pattern）又叫 <strong>快照模式</strong>，在 <strong>不破坏封装性的前提下</strong>，捕获 <strong>一个对象的内部状态</strong>，并在该对象之外保存这个状态。这样以后就 <strong>可将该对象恢复到原先保存的状态</strong>。</p>
<p>备忘录模式属于行为型模式。</p>
<p>可以这里理解备忘录模式：现实生活中的备忘录是用来记录某些要去做的事情，或者是记录已经达成的共同意见的事情，以防忘记了。而在软件层面，备忘录模式有着相同的含义，备忘录对象主要用来记录一个对象的某种状态，或者某些数据，当要做回退时，可以从备忘录对象里获取原来的数据进行恢复操作。</p>`,r:{minutes:5.62,words:1685},y:"a",t:"行为型备忘录模式"},[":md"]],["v-72940dc6","/develop/design/observer.html",{d:1573344e6,l:"2019年11月10日",c:["设计模式"],g:["设计模式"],e:`<h2> 观察者模式基本介绍</h2>
<p>在现实世界中，许多对象并不是独立存在的，其中一个对象的行为发生改变可能会导致一个或者多个其他对象的行为也发生改变。例如，某种商品的物价上涨时会导致部分商家高兴，而消费者伤心；还有，当我们开车到交叉路口时，遇到红灯会停，遇到绿灯会行。这样的例子还有很多，例如，股票价格与股民、微信公众号与微信用户、气象局的天气预报与听众、小偷与警察等。</p>
<p><strong>观察者模式</strong>（Observer Pattern）的定义：指多个对象间存在一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都得到通知并被自动更新。这种模式有时又称作发布-订阅模式、模型-视图模式，它是对象行为型模式。</p>`,r:{minutes:8.5,words:2551},y:"a",t:"行为型观察者模式"},[":md"]],["v-7dc0f6dd","/develop/design/prototype.html",{d:15710112e5,l:"2019年10月14日",c:["设计模式"],g:["设计模式"],e:`<h2> 原型模式基本介绍</h2>
<p>在有些系统中，存在大量相同或相似对象的创建问题，如果用传统的构造函数来创建对象，会比较复杂且耗时耗资源，用原型模式生成对象就很高效，就像孙悟空拔下猴毛轻轻一吹就变出很多孙悟空一样简单。</p>
<p><strong>原型模式</strong>（Prototype Pattern）是指：用原型实例指定创建对象的种类，并且通过拷贝这些原型，创建新的对象。</p>
<p>原型模式是一种创建型设计模式，允许一个对象再创建另外一个可定制的对象，无需知道如何创建的细节。</p>
<p>工作原理是：通过将一个原型对象传给那个要发动创建的对象，这个要发动创建的对象通过请求原型对象拷贝它们自己来实施创建，即 <code>对象.clone()</code>。</p>`,r:{minutes:7.91,words:2374},y:"a",t:"创建型原型模式"},[":md"]],["v-1902a411","/develop/design/proxy.html",{d:15723936e5,l:"2019年10月30日",c:["设计模式"],g:["设计模式"],e:`<h2> 代理模式的基本介绍</h2>
<p>在有些情况下，一个客户不能或者不想直接访问另一个对象，这时需要找一个中介帮忙完成某项任务，这个中介就是代理对象。例如，购买火车票不一定要去火车站买，可以通过 12306 网站或者去火车票代售点买。又如找女朋友、找保姆、找工作等都可以通过找中介完成。</p>
<p>在软件设计中，使用代理模式的例子也很多，例如，要访问的远程对象比较大（如视频或大图像等），其下载要花很多时间。还有因为安全原因需要屏蔽客户端直接访问真实对象，如某单位的内部数据库等。</p>
<p><strong>代理模式</strong>（Proxy Pattern）：为一个对象提供一个替身，以控制对这个对象的访问。即通过代理对象访问目标对象。这样做的好处是：可以在目标对象实现的基础上，增强额外的功能操作，即扩展目标对象的功能。</p>`,r:{minutes:12,words:3600},y:"a",t:"结构型代理模式"},[":md"]],["v-d8e95536","/develop/design/responsibility.html",{d:15743808e5,l:"2019年11月22日",c:["设计模式"],g:["设计模式"],e:`<h2> 职责链模式基本介绍</h2>
<p>在现实生活中，一个事件需要经过多个对象处理是很常见的场景。例如，采购审批流程、请假流程等。公司员工请假，可批假的领导有部门负责人、副总经理、总经理等，但每个领导能批准的天数不同，员工必须根据需要请假的天数去找不同的领导签名，也就是说员工必须记住每个领导的姓名、电话和地址等信息，这无疑增加了难度。</p>
<p>在计算机软硬件中也有相关例子，如总线网中数据报传送，每台计算机根据目标地址是否同自己的地址相同来决定是否接收；还有异常处理中，处理程序根据异常的类型决定自己是否处理该异常；还有 Struts2 的拦截器、JSP 和 Servlet 的 Filter 等，所有这些都可以考虑使用职责链模式来实现。</p>`,r:{minutes:8.26,words:2478},y:"a",t:"行为型职责链模式"},[":md"]],["v-72c7365c","/develop/design/seven-principles.html",{d:15701472e5,l:"2019年10月4日",c:["设计模式"],g:["设计模式"],e:`<h2> 设计模式七大原则</h2>
<p>设计模式原则，其实就是程序员在编程时，应当遵守的原则，也是各种设计模式的基础（即：设计模式为什么 这样设计的依据）。</p>
<p>设计模式常用的七大原则有：</p>
<ul>
<li>单一职责原则</li>
<li>接口隔离原则</li>
<li>依赖倒转（倒置）原则</li>
<li>里氏替换原则</li>
<li>开闭原则</li>
<li>迪米特法则</li>
<li>合成复用原则</li>
</ul>
<h2> 单一职责原则（SRP）</h2>
<h3> 基本介绍</h3>
<p><strong>单一职责原则</strong>（Single Responsibility Principle，SRP）又称单一功能原则，由罗伯特·C.马丁（Robert C. Martin）于《敏捷软件开发：原则、模式和实践》一书中提出的。这里的职责是指类变化的原因，单一职责原则规定一个类应该有且仅有一个引起它变化的原因，否则类应该被拆分（There should never be more than one reason for a class to change）。</p>`,r:{minutes:32.4,words:9719},y:"a",t:"七大原则"},[":md"]],["v-60256d6b","/develop/design/single.html",{d:15706656e5,l:"2019年10月10日",c:["设计模式"],g:["设计模式"],e:`<h2> 单例设计模式介绍</h2>
<p>在计算机系统中，还有 Windows 的回收站、操作系统中的文件系统、多线程中的线程池、显卡的驱动程序对象、打印机的后台处理服务、应用程序的日志对象、数据库的连接池、网站的计数器、Web 应用的配置对象、应用程序中的对话框、系统中的缓存等常常被设计成单例。</p>
<p>所谓类的 <strong>单例设计模式</strong>，就是 <strong>采取一定的方法保证在整个的软件系统中，对某个类只能存在一个对象实例</strong>，并且该类只提供一个取得其对象实例的方法（静态方法）。</p>
<p>比如 Hibernate 的 SessionFactory，它充当数据存储源的代理，并负责创建 Session 对象。SessionFactory 并不是轻量级的，一般情况下，一个项目通常只需要一个 SessionFactory 就够，这是就会使用到单例模式。</p>`,r:{minutes:26.75,words:8025},y:"a",t:"创建型单例模式"},[":md"]],["v-7a5d87ce","/develop/design/state.html",{d:15740352e5,l:"2019年11月18日",c:["设计模式"],g:["设计模式"],e:`<h2> 状态模式基本介绍</h2>
<p>在软件开发过程中，应用程序中的部分对象可能会根据不同的情况做出不同的行为，我们把这种对象称为有状态的对象，而把影响对象行为的一个或多个动态变化的属性称为状态。当有状态的对象与外部事件产生互动时，其内部状态就会发生改变，从而使其行为也发生改变。如人都有高兴和伤心的时候，不同的情绪有不同的行为，当然外界也会影响其情绪变化。</p>
<p>对这种有状态的对象编程，传统的解决方案是：将这些所有可能发生的情况全都考虑到，然后使用 if-else 或 switch-case 语句来做状态判断，再进行不同情况的处理。但是显然这种做法对复杂的状态判断存在天然弊端，条件判断语句会过于臃肿，可读性差，且不具备扩展性，维护难度也大。且增加新的状态时要添加新的 if-else 语句，这违背了「开闭原则」，不利于程序的扩展。</p>`,r:{minutes:11.65,words:3496},y:"a",t:"行为型状态模式"},[":md"]],["v-5d8882a0","/develop/design/strategy.html",{d:1574208e6,l:"2019年11月20日",c:["设计模式"],g:["设计模式"],e:`<h2> 策略模式基本介绍</h2>
<p>在现实生活中常常遇到实现某种目标存在多种策略可供选择的情况，例如，出行旅游可以乘坐飞机、乘坐火车、骑自行车或自己开私家车等，超市促销可以釆用打折、送商品、送积分等方法。</p>
<p>在软件开发中也常常遇到类似的情况，当实现某一个功能存在多种算法或者策略，我们可以根据环境或者条件的不同选择不同的算法或者策略来完成该功能，如数据排序策略有冒泡排序、选择排序、插入排序、二叉树排序等。</p>
<p>如果使用多重条件转移语句实现（即硬编码），不但使条件语句变得很复杂，而且增加、删除或更换算法要修改原代码，不易维护，违背开闭原则。如果采用策略模式就能很好解决该问题。</p>`,r:{minutes:9.62,words:2885},y:"a",t:"行为型策略模式"},[":md"]],["v-4b4aaf4e","/develop/design/summary.html",{d:15704928e5,l:"2019年10月8日",c:["设计模式"],g:["设计模式"],e:`<h2> 掌握设计模式的层次</h2>
<ul>
<li>第 1 层：刚开始学编程不久，听说过什么是设计模式</li>
<li>第 2 层：有很长时间的编程经验，自己写了很多代码，其中用到了设计模式，但是自己却不知道</li>
<li>第 3 层：学习过了设计模式，发现自己已经在使用了，并且发现了一些新的模式挺好用的</li>
<li>第 4 层：阅读了很多别人写的源码和框架，在其中看到别人设计模式，并且能够领会设计模式的精妙和带来的 好处</li>
<li>第 5 层：代码写着写着，自己都没有意识到使用了设计模式，并且熟练的写了出来</li>
</ul>
<h2> 设计模式介绍</h2>
<p>设计模式是程序员在面对同类软件工程设计问题所总结出来的有用的经验，<strong>模式不是代码</strong>，而是 <strong>某类问题的通用解决方案</strong>，设计模式（Design pattern）代表了最佳的实践。这些解决方案是众多软件开发人员经过相当长的一段时间的试验和错误总结出来的。</p>`,r:{minutes:9.06,words:2719},y:"a",t:"设计模式概述"},[":md"]],["v-4a6785aa","/develop/design/template-method.html",{d:15726528e5,l:"2019年11月2日",c:["设计模式"],g:["设计模式"],e:`<h2> 模板方法模式基本介绍</h2>
<p>在面向对象程序设计过程中，程序员常常会遇到这种情况：设计一个系统时知道了算法所需的关键步骤，而且确定了这些步骤的执行顺序，但某些步骤的具体实现还未知，或者说某些步骤的实现与具体的环境相关。</p>
<p>例如，去银行办理业务一般要经过以下4个流程：取号、排队、办理具体业务、对银行工作人员进行评分等，其中取号、排队和对银行工作人员进行评分的业务对每个客户是一样的，可以在父类中实现，但是办理具体业务却因人而异，它可能是存款、取款或者转账等，可以延迟到子类中实现。</p>
<p>这样的例子在生活中还有很多，例如，一个人每天会起床、吃饭、做事、睡觉等，其中「做事」的内容每天可能不同。我们把这些规定了流程或格式的实例定义成模板，允许使用者根据自己的需求去更新它，例如，简历模板、论文模板、Word 中模板文件等。</p>`,r:{minutes:6.95,words:2084},y:"a",t:"行为型模板方法模式"},[":md"]],["v-32e615c6","/develop/design/thought.html",{d:15699744e5,l:"2019年10月2日",c:["设计模式"],g:["设计模式"],e:`<h2> 基于接口而非实现编程</h2>
<p>这个原则非常重要，是一种非常有效的提高代码质量的手段，在平时的开发中特别经常被用到。</p>
<h3> 如何解读原则中的「接口」二字</h3>
<p>「基于接口而非实现编程」这条原则的英文描述是：「Program to an interface, not an implementation」。我们理解这条原则的时候，千万不要一开始就与具体的编程语言挂钩，局限在编程语言的「接口」语法中（比如 Java 中的 interface 接口语法）。这条原则最早出现于 1994 年 GoF 的《设计模式》这本书，它先于很多编程语言而诞生（比如 Java 语言），是一条比较抽象、泛化的设计思想。</p>`,r:{minutes:30.93,words:9279},y:"a",t:"设计思想"},[":md"]],["v-379fc8cc","/develop/design/uml-class-diagram.html",{d:157032e7,l:"2019年10月6日",c:["设计模式"],g:["设计模式"],e:`<h2> UML 基本介绍</h2>
<p>997 年 UML 被国际对象管理组织（OMG）采纳为面向对象的建模语言的国际标准。它的特点是 <strong>简单、统一、图形化、能表达软件设计中的动态与静态信息</strong>。</p>
<p>UML：Unified modeling language UML (统一建模语言)，是一种用于软件系统分析和设计的语言工具，它用于帮助软件开发人员进行思考和记录思路的结果。</p>
<p>UML 本身是一套符号的规定，就像数学符号和化学符号一样，这些符号用于描述软件模型中的各个元素和他 们之间的关系，比如类、接口、实现、泛化、依赖、组合、聚合等，如右图：</p>`,r:{minutes:12.38,words:3715},y:"a",t:"UML类图"},[":md"]],["v-6a6fd891","/develop/design/visitor.html",{d:15729984e5,l:"2019年11月6日",c:["设计模式"],g:["设计模式"],e:`<h2> 访问者模式基本介绍</h2>
<p>在现实生活中，有些集合对象存在多种不同的元素，且每种元素也存在多种不同的访问者和处理方式。例如，公园中存在多个景点，也存在多个游客，不同的游客对同一个景点的评价可能不同；医院医生开的处方单中包含多种药元素，査看它的划价员和药房工作人员对它的处理方式也不同，划价员根据处方单上面的药品名和数量进行划价，药房工作人员根据处方单的内容进行抓药。</p>
<p>这样的例子还有很多，例如，电影或电视剧中的人物角色，不同的观众对他们的评价也不同；还有顾客在商场购物时放在「购物车」中的商品，顾客主要关心所选商品的性价比，而收银员关心的是商品的价格和数量。</p>
`,r:{minutes:8.53,words:2560},y:"a",t:"行为型访问者模式"},[":md"]],["v-34f9e282","/develop/dev-agile/dev-lean-enterprise.html",{d:15602976e5,l:"2019年6月12日",c:["开发流程"],g:["开发流程"],e:`<h1> 精益企业 - 从组织的角度: 集成精益，敏捷，DevOPS等</h1>
<blockquote>
<p>Lean Enterprise （精益企业）是指一个产品系列价值流的不同部门同心协力消除浪费，并且按照顾客要求，来拉动生产。本文主要基于Scaled Agile, Inc. (SAI)公司的SAFe的框架（SAFe for Lean Enterprises）向你介绍精益企业的7个核心，并站在更高的视野层级上看敏捷和devops的位置，可以给你更多的启发。</p>
</blockquote>
<h2> 精益企业全局</h2>
<blockquote>
<p>Lean Enterprise （精益企业）:一个产品系列价值流的不同部门同心协力消除浪费，并且按照顾客要求，来拉动生产。这个阶段性任务一结束，整个企业立即分析结果，并启动下一个改善计划。</p>
</blockquote>`,r:{minutes:8.34,words:2503},y:"a",t:"精益企业 - 从组织的角度: 集成精益，敏捷，DevOPS等"},[":md"]],["v-190f0eba","/develop/dev-agile/dev-pratice-ddd.html",{d:15601248e5,l:"2019年6月10日",c:["开发流程"],g:["开发流程"],e:`<h1> 敏捷开发 - 开发实践：领域驱动开发(DDD）</h1>
<blockquote>
<p>TBD</p>
</blockquote>
`,r:{minutes:.1,words:30},y:"a",t:"敏捷开发 - 开发实践：领域驱动开发(DDD）"},[":md"]],["v-d1bc46ac","/develop/dev-agile/dev-pratice-tdd.html",{d:15600384e5,l:"2019年6月9日",c:["开发流程"],g:["开发流程"],e:`<h1> 敏捷开发 - 开发实践：测试驱动开发(TDD）</h1>
<blockquote>
<p>测试驱动开发(Test Driven Development, 简称TDD)是敏捷开发中的一项核心实践和技术，也是一种设计方法论。TDD的原理是在开发功能代码之前，先编写单元测试用例代码，测试代码确定需要编写什么产品代码。TDD的基本思路就是通过测试来推动整个开发的进行，但测试驱动开发并不只是单纯的测试工作，而是把需求分析，设计，质量控制量化的过程。TDD首先考虑使用需求（对象、功能、过程、接口等），主要是编写测试用例框架对功能的过程和接口进行设计，而测试框架可以持续进行验证。本主要介绍TDD的基础和实践案例，以及很多团队无法使用TDD方式开发的一些思考。</p>
</blockquote>`,r:{minutes:13.57,words:4070},y:"a",t:"敏捷开发 - 开发实践：测试驱动开发(TDD）"},[":md"]],["v-67e67766","/develop/dev-agile/dev-th-agile-kanban.html",{d:1559952e6,l:"2019年6月8日",c:["开发流程"],g:["开发流程"],e:`<h1> 敏捷开发 - 面向过程管理：Kanban方式</h1>
<blockquote>
<p>看板本身源于日本丰田公司对精益制造的实践，后延伸到敏捷开发领域；它的核心是JIT（Just In Time）: “让正确的物资，在正确的时间，流动到正确的地方，数量是刚刚好的数量。” 本文主要介绍看板的定义，核心实践以及在研发领域的实践等。</p>
</blockquote>
<h2> 什么是Kanban</h2>
<blockquote>
<p>看板本身源于日本丰田公司对精益制造的实践，后延伸到敏捷开发领域；这里之所以要学习原始含义，是很多开发者并不明白看板的核心，即JIT（Just In Time）: “让正确的物资，在正确的时间，流动到正确的地方，数量是刚刚好的数量。”</p>
</blockquote>`,r:{minutes:16.83,words:5049},y:"a",t:"敏捷开发 - 面向过程管理：Kanban方式"},[":md"]],["v-4ad012fb","/develop/dev-agile/dev-th-agile-scrum.html",{d:15598656e5,l:"2019年6月7日",c:["开发流程"],g:["开发流程"],e:`<h1> 敏捷开发 - 面向过程管理：Scrum方式</h1>
<blockquote>
<p><strong>Scrum是迭代式增量软件开发过程</strong>，是敏捷方法论中的重要框架之一，通常用于敏捷软件开发。Scrum包括了一系列实践和预定义角色的过程骨架。Scrum中的主要角色包括同项目经理类似的Scrum Master角色负责维护过程和任务，Product Owner代表利益所有者，Developer Team包括了所有开发人员。</p>
</blockquote>
<h2> 什么是Scrum?</h2>
<blockquote>
<p><strong>Scrum是迭代式增量软件开发过程</strong>，是敏捷方法论中的重要框架之一，通常用于敏捷软件开发。Scrum包括了一系列实践和预定义角色的过程骨架。Scrum中的主要角色包括同项目经理类似的Scrum Master角色负责维护过程和任务，Product Owner代表利益所有者，Developer Team包括了所有开发人员。</p>
</blockquote>`,r:{minutes:18.88,words:5665},y:"a",t:"敏捷开发 - 面向过程管理：Scrum方式"},[":md"]],["v-0ff14b76","/develop/dev-agile/dev-th-agile-xp.html",{d:15596928e5,l:"2019年6月5日",c:["开发流程"],g:["开发流程"],e:`<h1> 敏捷开发 - 面向工程管理：极限编程（XP)</h1>
<blockquote>
<p>极限编程（ExtremeProgramming，简称XP）是由KentBeck在1996年提出的，是一种软件工程方法学，是敏捷软件开发中可能是最富有成效的几种方法学之一。XP是一种近螺旋式的开发方法，它将复杂的开发过程分解为一个个相对比较简单的小周期；通过积极的交流、反馈以及其它一系列的方法，开发人员和客户可以非常清楚开发进度、变化、待解决的问题和潜在的困难等，并根据实际情况及时地调整开发过程。极限编程透过引入<strong>基本价值、原则、实践方法</strong>等概念来达到降低变更成本的目的。</p>
</blockquote>`,r:{minutes:14.43,words:4329},y:"a",t:"敏捷开发 - 面向工程管理：极限编程（XP)"},[":md"]],["v-a29da770","/develop/dev-agile/dev-th-agile.html",{d:15596064e5,l:"2019年6月4日",c:["开发流程"],g:["开发流程"],e:`<h1> 敏捷开发 - 敏捷软件开发理论及流程</h1>
<blockquote>
<p>敏捷开发以用户的需求进化为核心，采用迭代、循序渐进的方法进行软件开发。在敏捷开发中，软件项目在构建初期被切分成多个子项目，各个子项目的成果都经过测试，具备可视、可集成和可运行使用的特征。换言之，就是把一个大项目分为多个相互联系，但也可独立运行的小项目，并分别完成，在此过程中软件一直处于可使用状态。</p>
</blockquote>
<h2> 什么是敏捷软件开发</h2>
<blockquote>
<p>敏捷开发以用户的需求进化为核心，采用迭代、循序渐进的方法进行软件开发。在敏捷开发中，软件项目在构建初期被切分成多个子项目，各个子项目的成果都经过测试，具备可视、可集成和可运行使用的特征。换言之，就是把一个大项目分为多个相互联系，但也可独立运行的小项目，并分别完成，在此过程中软件一直处于可使用状态。</p>
</blockquote>`,r:{minutes:4.87,words:1462},y:"a",t:"敏捷开发 - 敏捷软件开发理论及流程"},[":md"]],["v-dbe78e54","/develop/dev-agile/dev-th-waterfall-model.html",{d:15594336e5,l:"2019年6月2日",c:["开发流程"],g:["开发流程"],e:`<h1> 传统模式 - 软件开发生命周期与过程模型(瀑布模型，原型模型和螺旋模型等）</h1>
<blockquote>
<p>软件生命周期(Software Life Cycle,SLC)是软件的产生直到报废或停止使用的生命周期。软件生命周期内有<strong>问题定义、可行性分析、总体描述、系统设计、编码、调试和测试、验收与运行、维护升级</strong>等阶段。那么如何将上述软件开发过程方法化呢？这就是过程模型。过程模型（Process Models） 意图解决软件过程中的混乱，将软件开发过程中的沟通、计划、建模、构建和部署等活动（activities）有效地组织了起来。<strong>他们之间的线性（linear）、迭代（iterative）、演进（evolutionary）和平行（parallel）关系会产生不同的模型</strong>。常见的过程模型包括：瀑布模型、原型模型、增量模型、螺旋模型等。</p>
</blockquote>`,r:{minutes:17.58,words:5274},y:"a",t:"传统模式 - 软件开发生命周期与过程模型(瀑布模型，原型模型和螺旋模型等）"},[":md"]],["v-c419387c","/develop/dev-agile/dev-th-waterfall-vwxh.html",{d:155952e7,l:"2019年6月3日",c:["开发流程"],g:["开发流程"],e:`<h1> 传统模式 - 结合软件测试的过程模型演化:V模型,W模型,X模型等</h1>
<blockquote>
<p>对于前文软件开发生命周期的实现，为保障软件质量，将测试工作凸显出来（通过前文介绍的线性（linear）、迭代（iterative）、演进（evolutionary）和平行（parallel）等方式），结合测试又演化出了针对测试的过程模型，主要有V模型,W模型,X模型,H模型等。</p>
</blockquote>
<h2> 概述</h2>
<blockquote>
<p>对于前文软件开发生命周期的实现，为保障软件质量，将测试工作凸显出来（通过通过前文介绍的线性（linear）、迭代（iterative）、演进（evolutionary）和平行（parallel）等方式），又演化出了针对测试的过程模型，主要有V模型,W模型,X模型,H模型等。</p>
</blockquote>`,r:{minutes:10.83,words:3249},y:"a",t:"传统模式 - 结合软件测试的过程模型演化:V模型,W模型,X模型等"},[":md"]],["v-853d39a8","/develop/dev-agile/dev-workflow.html",{d:15602112e5,l:"2019年6月11日",c:["开发流程"],g:["开发流程"],e:`<h1> 典型的中小团队开发流程详解</h1>
<blockquote>
<p>一直想总结一个比较完善的开发流程，但是各个公司的规模，文化和开发方式有很大的差异；后期会加入其它公司的研发流程。</p>
</blockquote>
<h2> 相关讨论</h2>
<p>在知乎上找到一个关于软件研发的流程的讨论，好几个回答实在是太精彩了，程序员在某些黑色幽默上还是有很大的默契的，这说明在研发问题上除非非常规范的大公司，其它大多数公司的研发流程是会被身处其中的研发人员所吐槽的；知乎的讨论 <a href="https://www.zhihu.com/question/20003204" target="_blank" rel="noopener noreferrer">https://www.zhihu.com/question/20003204</a></p>`,r:{minutes:1.25,words:376},y:"a",t:"典型的中小团队开发流程详解"},[":md"]],["v-ec1da6c6","/develop/dev-agile/dev-x-overview.html",{d:15593472e5,l:"2019年6月1日",c:["开发流程"],g:["开发流程"],e:`<h1> ♥软件开发模式知识体系详解♥</h1>
<blockquote>
<p>软件工程理论和开发模式知识体系详解。</p>
</blockquote>
<h2> 相关文章</h2>
<blockquote>
<p>软件开发模式相关文章。</p>
</blockquote>
<ul>
<li>传统模式 - 软件开发生命周期与过程模型(瀑布模型，原型模型和螺旋模型等）
<ul>
<li>软件生命周期(Software Life Cycle,SLC)是软件的产生直到报废或停止使用的生命周期。软件生命周期内有<strong>问题定义、可行性分析、总体描述、系统设计、编码、调试和测试、验收与运行、维护升级</strong>等阶段。那么如何将上述软件开发过程方法化呢？这就是过程模型。过程模型（Process Models） 意图解决软件过程中的混乱，将软件开发过程中的沟通、计划、建模、构建和部署等活动（activities）有效地组织了起来。<strong>他们之间的线性（linear）、迭代（iterative）、演进（evolutionary）和平行（parallel）关系会产生不同的模型</strong>。常见的过程模型包括：瀑布模型、原型模型、增量模型、螺旋模型等。</li>
</ul>
</li>
<li>传统模式 - 结合软件测试的过程模型演化:V模型,W模型,X模型等
<ul>
<li>对于前文软件开发生命周期的实现，为保障软件质量，将测试工作凸显出来（通过前文介绍的线性（linear）、迭代（iterative）、演进（evolutionary）和平行（parallel）等方式），结合测试又演化出了针对测试的过程模型，主要有V模型,W模型,X模型,H模型等。</li>
</ul>
</li>
<li>敏捷开发 - 敏捷软件开发理论及流程
<ul>
<li>敏捷开发以用户的需求进化为核心，采用迭代、循序渐进的方法进行软件开发。在敏捷开发中，软件项目在构建初期被切分成多个子项目，各个子项目的成果都经过测试，具备可视、可集成和可运行使用的特征。换言之，就是把一个大项目分为多个相互联系，但也可独立运行的小项目，并分别完成，在此过程中软件一直处于可使用状态。</li>
</ul>
</li>
<li>敏捷开发 - 面向工程管理：极限编程（XP)
<ul>
<li>极限编程（ExtremeProgramming，简称XP）是由KentBeck在1996年提出的，是一种软件工程方法学，是敏捷软件开发中可能是最富有成效的几种方法学之一。XP是一种近螺旋式的开发方法，它将复杂的开发过程分解为一个个相对比较简单的小周期；通过积极的交流、反馈以及其它一系列的方法，开发人员和客户可以非常清楚开发进度、变化、待解决的问题和潜在的困难等，并根据实际情况及时地调整开发过程。极限编程透过引入<strong>基本价值、原则、实践方法</strong>等概念来达到降低变更成本的目的。</li>
</ul>
</li>
<li>敏捷开发 - 面向过程管理：Scrum方式
<ul>
<li><strong>Scrum是迭代式增量软件开发过程</strong>，是敏捷方法论中的重要框架之一，通常用于敏捷软件开发。Scrum包括了一系列实践和预定义角色的过程骨架。Scrum中的主要角色包括同项目经理类似的Scrum Master角色负责维护过程和任务，Product Owner代表利益所有者，Developer Team包括了所有开发人员。</li>
</ul>
</li>
<li>敏捷开发 - 面向过程管理：Kanban方式
<ul>
<li>看板本身源于日本丰田公司对精益制造的实践，后延伸到敏捷开发领域；它的核心是JIT（Just In Time）: “让正确的物资，在正确的时间，流动到正确的地方，数量是刚刚好的数量。” 本文主要介绍看板的定义，核心实践以及在研发领域的实践等。</li>
</ul>
</li>
<li>敏捷开发 - 开发实践：测试驱动开发(TDD）
<ul>
<li>测试驱动开发(Test Driven Development, 简称TDD)是敏捷开发中的一项核心实践和技术，也是一种设计方法论。TDD的原理是在开发功能代码之前，先编写单元测试用例代码，测试代码确定需要编写什么产品代码。TDD的基本思路就是通过测试来推动整个开发的进行，但测试驱动开发并不只是单纯的测试工作，而是把需求分析，设计，质量控制量化的过程。TDD首先考虑使用需求（对象、功能、过程、接口等），主要是编写测试用例框架对功能的过程和接口进行设计，而测试框架可以持续进行验证。本主要介绍TDD的基础和实践案例，以及很多团队无法使用TDD方式开发的一些思考。</li>
</ul>
</li>
<li>敏捷开发 - 开发实践：领域驱动开发(DDD）
<ul>
<li>TODO</li>
</ul>
</li>
<li>典型的中小团队开发流程详解
<ul>
<li>通过典型的中小团队开发流程谈谈我对常见的敏捷开发流程的理解。</li>
</ul>
</li>
<li>精益企业 - 从组织的角度: 集成精益，敏捷，DevOPS等
<ul>
<li>Lean Enterprise （精益企业）是指一个产品系列价值流的不同部门同心协力消除浪费，并且按照顾客要求，来拉动生产。本文主要基于Scaled Agile, Inc. (SAI)公司的SAFe的框架（SAFe for Lean Enterprises）向你介绍精益企业的7个核心，并站在更高的视野层级上看敏捷和devops的位置，可以给你更多的启发。</li>
</ul>
</li>
</ul>`,r:{minutes:4.69,words:1408},y:"a",t:"♥软件开发模式知识体系详解♥"},[":md"]],["v-771d6280","/develop/opensource/dev-agpl.html",{d:15657408e5,l:"2019年8月14日",c:["开源协议"],g:["协议"],e:`<h1> AGPL v3 开源协议（慎用）</h1>
<blockquote>
<p>AGPL 是 GPL 的一个补充, 在GPL 的基础上加了一些限制。GPL 的约束生效前提是该软件"发布"，有的公司就使用 GPL 组件编写web 系统，但是不发布系统，只用这个系统在线提供服务，这样就避免了开源系统代码。而 AGPL 要求如果云服务(即 saas )用到的代码是该许可证，那云服务的代码也必须开源。</p>
</blockquote>
<h2> 什么是 copyleft 许可证？</h2>
<p>Copyleft许可证执行了Stallman在其GNU宣言中首先支持的原则。在20世纪60年代，开发人员公开共享所有帮助他人的源代码是很常见的，这创造了一种社区和协作的感觉。到了20世纪80年代，随着组织开始在其源代码上应用版权，这一趋势不再受欢迎。Copyleft与Copyright(版权)相反，它强制执行使用、修改和重新分发任何具有Copyleft许可证（如GPL）的源代码的权利。</p>`,r:{minutes:3.54,words:1062},y:"a",t:"AGPL v3 开源协议（慎用）"},[":md"]],["v-31ef009c","/develop/opensource/dev-knowledge.html",{d:15658272e5,l:"2019年8月15日",c:["开源协议"],g:["协议"],e:`<h1> 知识共享许可协议文本</h1>
<blockquote>
<p>本文主要介绍知识共享许可协议，及本站遵守的多数站点会采用的知识共享协议CC BY-NC-SA 4.0协议，即署名-非商业性使用-相同方式共享协议。</p>
</blockquote>
<h2> 知识共享许可协议文本</h2>
<p>下面分别说明我们所提供的六种主要的许可协议。这些许可协议从限制最严格的许可协议开始，以限制最宽松的许可协议结束，按从严至宽的顺序列出。六种许可协议规定了他人根据许可协议可以享有的一系列基本权利，知晓这些权利是非常有益的。另外，我们列出了一些需要考虑的问题，以供您在选择许可协议之前参考。</p>`,r:{minutes:4.09,words:1228},y:"a",t:"知识共享许可协议文本"},[":md"]],["v-ff56eec2","/develop/opensource/dev-mulan.html",{d:15659136e5,l:"2019年8月16日",c:["开源协议"],g:["协议"],e:`<h1> 国产开源：木兰许可协议系列</h1>
<blockquote>
<p>伴随着国际形势的变迁，<strong>越来越多组织申明将遵循美国出口管制法律的约束，并且蔓延到了开源领域</strong>；关于国内开源生态如何自立，做到在逼不得已无法与国际接轨的情况下能够健康发展的措施也被提上议程，木兰系列许可证系列由此诞生。木兰系列许可证系列（包含“木兰宽松许可证”和“木兰公共许可证”等），均由北京大学作为牵头单位，依托全国信标委云计算标准工作组和中国开源云联盟，联合开源生态圈产学研优势团队和个体、尤其是开源法务和律师，起草、修订并发布。<strong>其中Mulan PSL 是国内首个被OSI认定的“国产开源软件协议</strong>。</p>
</blockquote>`,r:{minutes:21.43,words:6428},y:"a",t:"国产开源：木兰许可协议系列"},[":md"]],["v-6c02a35d","/develop/opensource/dev-opensource.html",{d:15656544e5,l:"2019年8月13日",c:["开源协议"],g:["协议"],e:`<h1> 常见软件开源协议详解</h1>
<blockquote>
<p>开源不等于免费！为了加速我们的开发，我们会使用开源的软件和源码； 为避免商业风险，需要在使用时了解第三方如软件协议，版本，和已知CVE风险等；本文旨在从开源软件再发布过程使用权限的角度入手，总结各个常见开源协议的异同，方便理解。</p>
</blockquote>
<h2> 什么是开源协议</h2>
<p>大部分人都希望作品能够被多数人分享查阅。这样不仅提高自己业界的知名度，同时也方便了需要的人为开源做出了贡献。但是代码一旦被贴出来，任何人都可以看到并获取，之后发生的事情你就无法控制了。所以为了公开分享你的代码，同时又让你对代码保留一定权利，在作品中声明一个许可协议是非常有必要的。有协议和没声明协议的裸代码是有非常重要区别的，一般作品当中没声明协议的默认为Copy right的，也就是版权保留。此种情况表明他人没有任何授权，不得复制分发修改使用等等。有了协议的声明，在未来你的维权上面会方便很多，让你的作品在分享的同时保留了自身的一些权利。</p>`,r:{minutes:14.74,words:4423},y:"a",t:"常见软件开源协议详解"},[":md"]],["v-349120b4","/develop/opensource/dev-x-overview.html",{d:1565568e6,l:"2019年8月12日",c:["开源协议"],g:["协议"],e:`<h1> ♥开源协议知识体系详解♥</h1>
<blockquote>
<p>开源协议知识体系详解。</p>
</blockquote>
<h2> 相关文章</h2>
<blockquote>
<p>开源协议相关文章。</p>
</blockquote>
<ul>
<li>常见软件开源协议详解
<ul>
<li>开源不等于免费！为了加速我们的开发，我们会使用开源的软件和源码； 为避免商业风险，需要在使用时了解第三方如软件协议，版本，和已知CVE风险等；本文旨在从开源软件再发布过程使用权限的角度入手，总结各个常见开源协议的异同，方便理解。</li>
</ul>
</li>
<li>AGPL v3 开源协议（慎用）
<ul>
<li>AGPL 是 GPL 的一个补充, 在GPL 的基础上加了一些限制。GPL 的约束生效前提是该软件"发布"，有的公司就使用 GPL 组件编写web 系统，但是不发布系统，只用这个系统在线提供服务，这样就避免了开源系统代码。而 AGPL 要求如果云服务(即 saas )用到的代码是该许可证，那云服务的代码也必须开源。</li>
</ul>
</li>
<li>知识共享许可协议文本
<ul>
<li>本文主要介绍知识共享许可协议，及本站遵守的多数站点会采用的知识共享协议CC BY-NC-SA 4.0协议，即署名-非商业性使用-相同方式共享协议。</li>
</ul>
</li>
<li>国产开源：木兰许可协议系列
<ul>
<li>伴随着国际形势的变迁，<strong>越来越多组织申明将遵循美国出口管制法律的约束，并且蔓延到了开源领域</strong>；关于国内开源生态如何自立，做到在逼不得已无法与国际接轨的情况下能够健康发展的措施也被提上议程，木兰系列许可证系列由此诞生。木兰系列许可证系列（包含“木兰宽松许可证”和“木兰公共许可证”等），均由北京大学作为牵头单位，依托全国信标委云计算标准工作组和中国开源云联盟，联合开源生态圈产学研优势团队和个体、尤其是开源法务和律师，起草、修订并发布。<strong>其中Mulan PSL 是国内首个被OSI认定的“国产开源软件协议</strong>。</li>
</ul>
</li>
</ul>`,r:{minutes:1.91,words:574},y:"a",t:"♥开源协议知识体系详解♥"},[":md"]],["v-afbcd392","/develop/package/dev-package-x-apache-common.html",{d:15522624e5,l:"2019年3月11日",c:["常用开发库"],g:["常用开发库"],e:`<h1> Apache Common包</h1>
<blockquote>
<p>Apache common不仅被成千上万开源工具使用，更是学习Java编程比较好的代码参考工具，效率工具。</p>
</blockquote>
<h2> Apache Common包简介</h2>
<p>Apache Commons是对JDK的拓展，包含了很多开源的工具，用于解决平时编程经常会遇到的问题，减少重复劳动。官网网址:<a href="http://commons.apache.org" target="_blank" rel="noopener noreferrer">http://commons.apache.org</a></p>`,r:{minutes:6.22,words:1866},y:"a",t:"Apache Common包"},[":md"]],["v-aab2d5b2","/develop/package/dev-package-x-google-guava.html",{d:15523488e5,l:"2019年3月12日",c:["常用开发库"],g:["常用开发库"],e:`<h1> Google Guava包</h1>
<blockquote>
<p>Google出品的common包，我比较常用的比如Guava缓存等。</p>
</blockquote>
<h2> Google Guava简介</h2>
<p>Guava工程包含了若干被Google的 Java项目广泛依赖 的核心库，例如：集合 [collections] 、缓存 [caching] 、原生类型支持 [primitives support] 、并发库 [concurrency libraries] 、通用注解 [common annotations] 、字符串处理 [string processing] 、I/O 等等。 所有这些工具每天都在被Google的工程师应用在产品服务中。</p>`,r:{minutes:3.55,words:1065},y:"a",t:"Google Guava包"},[":md"]],["v-b40d6c2e","/develop/package/dev-package-x-hu-tool.html",{d:15524352e5,l:"2019年3月13日",c:["常用开发库"],g:["常用开发库"],e:`<h1> Hutool包</h1>
<blockquote>
<p>Hutool作为后起之秀，功能上也比较全。但是要注意一点，它的开源协议是：中国第一个开源协议<a href="http://license.coscl.org.cn/MulanPSL" target="_blank" rel="noopener noreferrer">木兰宽松许可证, 第1版在新窗口打开</a>，对此在商业项目中需要谨慎些，在个人项目无所谓。</p>
</blockquote>
<h2> 简介</h2>
<p>Hutool是一个小而全的Java工具类库，通过静态方法封装，降低相关API的学习成本，提高工作效率，使Java拥有函数式语言般的优雅，让Java语言也可以“甜甜的”。</p>`,r:{minutes:3.58,words:1074},y:"a",t:"Hutool包"},[":md"]],["v-743e64ee","/develop/package/dev-package-x-json.html",{d:15526944e5,l:"2019年3月16日",c:["常用开发库"],g:["常用开发库"],e:`<h1> JSON库详解</h1>
<blockquote>
<p>JSON应用非常广泛，对于Java常用的JSON库要完全掌握; 其中考虑到FastJson代码质量，漏洞，坑等等，应该尽量避免使用。</p>
</blockquote>
<h2> JSON简介</h2>
<h3> JSON是什么</h3>
<ul>
<li>JSON 指的是 JavaScript 对象表示法（JavaScript Object Notation）</li>
<li>JSON 是轻量级的文本数据交换格式</li>
<li>JSON 独立于语言：JSON 使用 Javascript语法来描述数据对象，但是 JSON 仍然独立于语言和平台。JSON 解析器和 JSON 库支持许多不同的编程语言。 目前非常多的动态（PHP，JSP，.NET）编程语言都支持JSON。</li>
<li>JSON 具有自我描述性，更易理解</li>
</ul>`,r:{minutes:9.81,words:2943},y:"a",t:"JSON库详解"},[":md"]],["v-3389ec7d","/develop/package/dev-package-x-log.html",{d:1552608e6,l:"2019年3月15日",c:["常用开发库"],g:["常用开发库"],e:`<h1> 日志类库详解</h1>
<blockquote>
<p>Java日志库是最能体现Java库在进化中的渊源关系的，在理解时重点理解日志框架本身和日志门面，以及比较好的实践等。要关注其历史渊源和设计（比如桥接），而具体在使用时查询接口即可， 否则会陷入JUL(Java Util Log), JCL(Commons Logging), Log4j, SLF4J, Logback，Log4j2傻傻分不清楚的境地。</p>
</blockquote>
<h2> 日志库简介</h2>
<blockquote>
<p>我认为全面理解日志库需要从下面三个角度去理解：</p>
</blockquote>`,r:{minutes:19.03,words:5710},y:"a",t:"日志类库详解"},[":md"]],["v-dbb17486","/develop/package/dev-package-x-lombok.html",{d:15527808e5,l:"2019年3月17日",c:["常用开发库"],g:["常用开发库"],e:`<h1> Lombok工具库详解</h1>
<blockquote>
<p>Lombok是一款非常实用Java工具，可用来帮助开发人员消除Java的冗长代码，尤其是对于简单的Java对象（POJO）。实际上我并不推荐使用Lombok（不主动使用它）, 但是因为它有着很大的使用量，我们仍然有必要掌握它，不仅知道如何使用和它解决的问题，还要知道它的坑。</p>
</blockquote>
<h2> Lombok的引入</h2>
<p>我们通常需要编写大量代码才能使类变得有用。如以下内容：</p>
<ul>
<li><code>toString()</code>方法</li>
<li><code>hashCode()</code> and <code>equals()</code>方法</li>
<li><code>Getter</code> and <code>Setter</code> 方法</li>
<li>构造函数</li>
</ul>`,r:{minutes:15.69,words:4706},y:"a",t:"Lombok工具库详解"},[":md"]],["v-6fef71b0","/develop/package/dev-package-x-mapstruct.html",{d:15528672e5,l:"2019年3月18日",c:["常用开发库"],g:["常用开发库"],e:`<h1> MapStruct工具库详解</h1>
<blockquote>
<p>MapStruct是一款非常实用Java工具，主要用于解决对象之间的拷贝问题，比如PO/DTO/VO/QueryParam之间的转换问题。区别于BeanUtils这种通过反射，它通过编译器编译生成常规方法，将可以很大程度上提升效率。全面的官方手册可以参考<a href="https://mapstruct.org/documentation/stable/reference/pdf/mapstruct-reference-guide.pdf" target="_blank" rel="noopener noreferrer">官方文档PDF在新窗口打开</a>。</p>
</blockquote>`,r:{minutes:14.03,words:4209},y:"a",t:"MapStruct工具库详解"},[":md"]],["v-14eb65ee","/develop/package/dev-package-x-others.html",{d:15529536e5,l:"2019年3月19日",c:["常用开发库"],g:["常用开发库"],e:`<h1> 其它常用类库</h1>
<blockquote>
<p>其它常用类库体系很庞大，但是工具类的原则是只需要查找会使用即可。</p>
</blockquote>
<h2> 常用类库资源</h2>
<p>想了解哪个常用类库用的最多？ 看这里搜索吧: <a href="https://mvnrepository.com/open-source" target="_blank" rel="noopener noreferrer">Maven 仓库在新窗口打开</a></p>
<figure><img src="https://www.pdai.tech/images/develop/package/dev-package-others-1.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>`,r:{minutes:.49,words:148},y:"a",t:"其它常用类库"},[":md"]],["v-14db18d0","/develop/package/dev-package-x-overview.html",{d:1552176e6,l:"2019年3月10日",c:["常用开发库"],g:["常用开发库"],e:`<h1> ♥常用开发库知识体系详解♥</h1>
<blockquote>
<p>在开发应用时正确使用一些开源第三方工具包可以极大的提升开发效率，本章主要介绍运用极为广泛的工具包，比如Apache Common，Google Guava，Hutool等。</p>
</blockquote>
<h2> 相关文章</h2>
<ul>
<li>常用类库 - Apache Common包
<ul>
<li>工具类第一选择1 - Apache common包不仅被成千上万开源工具使用，更是学习Java编程比较好的代码参考工具，效率工具。</li>
</ul>
</li>
<li>常用类库 - Google Guava包
<ul>
<li>工具类第一选择2- Google出品，必属精品。</li>
</ul>
</li>
<li>常用类库 - Hutool包
<ul>
<li>国产的工具类库，优点是比较全，也比较实用；选它要注意下它的协议是中国第一个开源协议<a href="http://license.coscl.org.cn/MulanPSL" target="_blank" rel="noopener noreferrer">木兰宽松许可证, 第1版在新窗口打开</a>，商业型项目最好咨询下相关法务部门。</li>
</ul>
</li>
<li>常用类库 - Spring常用工具类
<ul>
<li>Spring作为常用的开发框架，在Spring框架应用中，排在ApacheCommon，Guava, Huool等通用库后，第二优先级可以考虑使用Spring-core-xxx.jar中的util包。</li>
</ul>
</li>
<li>常用类库 - 日志相关类库详解
<ul>
<li>Java日志库是最能体现Java库在进化中的渊源关系的，在理解时重点理解日志框架本身和日志门面，以及比较好的实践等。要关注其历史渊源和设计（比如桥接），而具体在使用时查询接口即可。</li>
</ul>
</li>
<li>常用类库 - JSON类库详解
<ul>
<li>JSON应用非常广泛，对常用对FastJson，Jackson和Gson作了具体阐述；其中考虑到FastJson代码质量，漏洞，坑等等，应该尽量避免使用。</li>
</ul>
</li>
<li>常用类库 - Lombok工具库详解
<ul>
<li>Lombok是一款非常实用Java工具，可用来帮助开发人员消除Java的冗长代码，尤其是对于简单的Java对象（POJO）。实际上我并不推荐使用Lombok（不主动使用它）, 但是因为它有着很大的使用量，我们仍然有必要掌握它，不仅知道如何使用和它解决的问题，还要知道它的坑。</li>
</ul>
</li>
<li>常用类库 - MapStruct工具库详解
<ul>
<li>MapStruct是一款非常实用Java工具，主要用于解决对象之间的拷贝问题，比如PO/DTO/VO/QueryParam之间的转换问题。区别于BeanUtils这种通过反射，它通过编译器编译生成常规方法，将可以很大程度上提升效率。</li>
</ul>
</li>
<li>常用类库 - 其它常用类库
<ul>
<li>其它常用类库体系很庞大，但是工具类的原则是只需要查找会使用即可。</li>
</ul>
</li>
</ul>`,r:{minutes:2.23,words:669},y:"a",t:"♥常用开发库知识体系详解♥"},[":md"]],["v-ec231282","/develop/package/dev-package-x-spring-util.html",{d:15525216e5,l:"2019年3月14日",c:["常用开发库"],g:["常用开发库"],e:`<h1> Spring常用工具类</h1>
<blockquote>
<p>Spring作为常用的开发框架，在Spring框架应用中，排在ApacheCommon，Guava, Huool等通用库后，第二优先级可以考虑使用Spring-core-xxx.jar中的util包。（提醒读者：对于工具类，要站在高一点的角度知道有哪些，而不是只看到代码... 用的时候具体看下即可)</p>
</blockquote>
<h2> 内置的resouce类型</h2>
<ul>
<li>UrlResource</li>
<li>ClassPathResource</li>
<li>FileSystemResource</li>
<li>ServletContextResource</li>
<li>InputStreamResource</li>
<li>ByteArrayResource</li>
<li>EncodedResource 也就是Resource加上encoding, 可以认为是有编码的资源</li>
<li>VfsResource(在jboss里经常用到, 相应还有 工具类 VfsUtils)</li>
<li>org.springframework.util.xml.ResourceUtils 用于处理表达资源字符串前缀描述资源的工具. 如: "classpath:". 有 getURL, getFile, isFileURL, isJarURL, extractJarFileURL</li>
</ul>`,r:{minutes:2.59,words:778},y:"a",t:"Spring常用工具类"},[":md"]],["v-079fbb4c","/develop/pattern/10_bridge.html",{d:1690160698e3,e:`<h1> 结构型 - 桥接(Bridge)</h1>
`,r:{minutes:.02,words:6},y:"a",t:"结构型 - 桥接(Bridge)"},[":md"]],["v-ac9cd224","/develop/pattern/11_compsite.html",{d:1690160698e3,e:`<h1> 结构型 - 组合(Composite)</h1>
`,r:{minutes:.02,words:6},y:"a",t:"结构型 - 组合(Composite)"},[":md"]],["v-0861c992","/develop/pattern/12_decorator.html",{d:1690160698e3,e:`<h1> 结构型 - 装饰(Decorator)</h1>
`,r:{minutes:.02,words:6},y:"a",t:"结构型 - 装饰(Decorator)"},[":md"]],["v-08c5b901","/develop/pattern/13_flyweight.html",{d:1690160698e3,e:`<h1> 结构型 - 享元(Flyweight)</h1>
`,r:{minutes:.02,words:6},y:"a",t:"结构型 - 享元(Flyweight)"},[":md"]],["v-594613fd","/develop/pattern/14_proxy.html",{d:1690160698e3,e:`<h1> 结构型 - 代理(Proxy)</h1>
`,r:{minutes:.02,words:6},y:"a",t:"结构型 - 代理(Proxy)"},[":md"]],["v-53fd68e9","/develop/pattern/15_chain.html",{d:1690160698e3,e:`<h1> 行为型 - 责任链(Chain Of Responsibility)</h1>
`,r:{minutes:.03,words:9},y:"a",t:"行为型 - 责任链(Chain Of Responsibility)"},[":md"]],["v-78fccfb6","/develop/pattern/16_strategy.html",{d:1690160698e3,e:`<h1> 行为型 - 策略(Strategy)</h1>
`,r:{minutes:.02,words:6},y:"a",t:"行为型 - 策略(Strategy)"},[":md"]],["v-01b09d50","/develop/pattern/17_template.html",{d:1690160698e3,e:`<h1> 行为型 - 模板方法(Template Method)</h1>
`,r:{minutes:.03,words:9},y:"a",t:"行为型 - 模板方法(Template Method)"},[":md"]],["v-a1d88988","/develop/pattern/18_command.html",{d:1690160698e3,e:`<h1> 行为型 - 命令模式(Command)</h1>
`,r:{minutes:.03,words:8},y:"a",t:"行为型 - 命令模式(Command)"},[":md"]],["v-2086f614","/develop/pattern/19_observer.html",{d:1690160698e3,e:`<h1> 行为型 - 观察者(Observer)</h1>
`,r:{minutes:.02,words:7},y:"a",t:"行为型 - 观察者(Observer)"},[":md"]],["v-4082a728","/develop/pattern/1_overview.html",{d:1690160698e3,e:`<h1> ♥设计模式知识体系详解♥</h1>
`,r:{minutes:.03,words:10},y:"a",t:"♥设计模式知识体系详解♥"},[":md"]],["v-79fb4142","/develop/pattern/20_visitor.html",{d:1690160698e3,e:`<h1> 行为型 - 访问者(Visitor)</h1>
`,r:{minutes:.02,words:7},y:"a",t:"行为型 - 访问者(Visitor)"},[":md"]],["v-dbe1e3c4","/develop/pattern/21_state.html",{d:1690160698e3,e:`<h1> 行为型 - 状态(State)</h1>
`,r:{minutes:.02,words:6},y:"a",t:"行为型 - 状态(State)"},[":md"]],["v-76fef118","/develop/pattern/22_interpreter.html",{d:1690160698e3,e:`<h1> 行为型 - 解释器(Interpreter)</h1>
`,r:{minutes:.02,words:7},y:"a",t:"行为型 - 解释器(Interpreter)"},[":md"]],["v-557eeeb7","/develop/pattern/23_iterator.html",{d:1690160698e3,e:`<h1> 行为型 - 迭代器(Iterator)</h1>
`,r:{minutes:.02,words:7},y:"a",t:"行为型 - 迭代器(Iterator)"},[":md"]],["v-6af7d4da","/develop/pattern/24_mediator.html",{d:1690160698e3,e:`<h1> 行为型 - 中介者(Mediator)</h1>
`,r:{minutes:.02,words:7},y:"a",t:"行为型 - 中介者(Mediator)"},[":md"]],["v-5864771c","/develop/pattern/25_memento.html",{d:1690160698e3,e:`<h1> 行为型 - 备忘录(Memento)</h1>
`,r:{minutes:.02,words:7},y:"a",t:"行为型 - 备忘录(Memento)"},[":md"]],["v-0ea3ab36","/develop/pattern/2_singleton.html",{d:1690160698e3,e:`<h1> 创建型 - 单例模式(Singleton pattern)</h1>
`,r:{minutes:.03,words:9},y:"a",t:"创建型 - 单例模式(Singleton pattern)"},[":md"]],["v-fe55a6b4","/develop/pattern/3_simple_factory.html",{d:1690160698e3,e:`<h1> 创建型 - 简单工厂(Simple Factory)</h1>
`,r:{minutes:.03,words:9},y:"a",t:"创建型 - 简单工厂(Simple Factory)"},[":md"]],["v-29c0178e","/develop/pattern/4_factory_method.html",{d:1690160698e3,e:`<h1> 创建型 - 工厂方法(Factory Method)</h1>
`,r:{minutes:.03,words:9},y:"a",t:"创建型 - 工厂方法(Factory Method)"},[":md"]],["v-0cae1790","/develop/pattern/5_abstract_factory.html",{d:1690160698e3,e:`<h1> 创建型 - 抽象工厂(Abstract Factory)</h1>
`,r:{minutes:.03,words:9},y:"a",t:"创建型 - 抽象工厂(Abstract Factory)"},[":md"]],["v-263c5511","/develop/pattern/6_builder.html",{d:1690160698e3,e:`<h1> 创建型 - 生成器(Builder)</h1>
`,r:{minutes:.02,words:7},y:"a",t:"创建型 - 生成器(Builder)"},[":md"]],["v-6ea76909","/develop/pattern/7_prototype.html",{d:1690160698e3,e:`<h1> 创建型 - 原型模式(Prototype)</h1>
`,r:{minutes:.03,words:8},y:"a",t:"创建型 - 原型模式(Prototype)"},[":md"]],["v-4934c82e","/develop/pattern/8_facade.html",{d:1690160698e3,e:`<h1> 结构型 - 外观(Facade)</h1>
`,r:{minutes:.02,words:6},y:"a",t:"结构型 - 外观(Facade)"},[":md"]],["v-0dcd2eba","/develop/pattern/9_adapter.html",{d:1690160698e3,e:`<h1> 结构型 - 适配器(Adapter)</h1>
`,r:{minutes:.02,words:7},y:"a",t:"结构型 - 适配器(Adapter)"},[":md"]],["v-69efa1be","/develop/protocol/dev-protocol-dns.html",{d:15545952e5,l:"2019年4月7日",c:["开发理论"],g:["网络协议"],e:`<h1> DNS 相关详解</h1>
<blockquote>
<p>DNS的核心工作就是将域名翻译成计算机IP地址, 它是基于UDP协议实现的，本文将具体阐述DNS相关的概念，解析，调度原理（负载均衡和区域调度）等DNS相关的所有知识点。</p>
</blockquote>
<h2> DNS简介</h2>
<p>域名系统并不像电话号码通讯录那么简单，通讯录主要是单个个体在使用，同一个名字出现在不同个体的通讯录里并不会出现问题，但域名是群体中所有人都在用的，必须要保持唯一性。为了达到唯一性的目的，因特网在命名的时候采用了层次结构的命名方法。每一个域名（本文只讨论英文域名）都是一个标号序列（labels），用字母（A-Z，a-z，大小写等价）、数字（0-9）和连接符（-）组成，标号序列总长度不能超过255个字符，它由点号分割成一个个的标号（label），每个标号应该在63个字符之内，每个标号都可以看成一个层次的域名。级别最低的域名写在左边，级别最高的域名写在右边。域名服务主要是基于UDP实现的，服务器的端口号为53。</p>`,r:{minutes:25.45,words:7636},y:"a",t:"DNS 相关详解"},[":md"]],["v-0eb434c0","/develop/protocol/dev-protocol-http.html",{d:15545088e5,l:"2019年4月6日",c:["开发理论"],g:["网络协议"],e:`<h1> HTTP 协议详解</h1>
<blockquote>
<p>HTTP 协议详解，web开发必备。</p>
</blockquote>
<figure><img src="https://www.pdai.tech/images/protocol_http_0.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>
<h2> 一 、基础概念</h2>
<h3> URL</h3>
<p>URI 包含 URL 和 URN，目前 WEB 只有 URL 比较流行，所以见到的基本都是 URL。</p>`,r:{minutes:27.95,words:8384},y:"a",t:"HTTP 协议详解"},[":md"]],["v-0ec3b421","/develop/protocol/dev-protocol-ip.html",{d:15542496e5,l:"2019年4月3日",c:["开发理论"],g:["网络协议"],e:`<h1> IP相关协议详解</h1>
<blockquote>
<p><strong>本文是网络基础第三篇</strong>，主要阐述：</p>
<ul>
<li><code>IP协议</code>（在网络层）及其配套协议（在数据链路层的<code>ARP协议</code>，在网络层的<code>ICMP，IGMP协议</code>）等</li>
<li>IPV6详解</li>
<li>网络地址转换 NAT等。</li>
</ul>
</blockquote>
<h2> IP 及配套协议详解</h2>
<p>因为网络层是整个互联网的核心，因此应当让网络层尽可能简单。网络层向上只提供简单灵活的、无连接的、尽最大努力交互的数据报服务。</p>`,r:{minutes:11.15,words:3345},y:"a",t:"IP相关协议详解"},[":md"]],["v-7edab2fb","/develop/protocol/dev-protocol-network-basic.html",{d:15540768e5,l:"2019年4月1日",c:["开发理论"],g:["网络协议"],e:`<h1> 计算机网络基础部分梳理</h1>
<blockquote>
<p>思考再三，决定在网络系列增加网络基础的章节, 因为它对网络部分的知识体系构建有很大的帮助。<strong>网络基础分三部分内容</strong>，本文是<strong>第一部分</strong>主要来源于大学的课程《计算机网络(第五版)》知识点梳理，内容整理自<a href="https://www.cnblogs.com/googny/p/3682280.html" target="_blank" rel="noopener noreferrer">这里在新窗口打开</a>, 但是作了调整和优化; 不得不说这本书作者谢希忍画的PPT还是挺棒的。</p>
</blockquote>`,r:{minutes:47.14,words:14141},y:"a",t:"计算机网络基础部分梳理"},[":md"]],["v-110a0ad4","/develop/protocol/dev-protocol-osi7.html",{d:15541632e5,l:"2019年4月2日",c:["开发理论"],g:["网络协议"],e:`<h1> 7层协议，4层，5层</h1>
<blockquote>
<p>本文是理解 <strong>网络基础的第二篇</strong>，我觉的一定要有全局框架观，构建全局观时建议分三步：第一步，理解全局的网络层次；第二步，理解每一层次中的常见的网络设备及功能；第三步，理解每一层中的常见协议。在此基础上，将其它知识点放置在相应的层次（很多网络上的零散知识点是没法帮你构筑完整的知识体系的，推荐你完整的看一本关于网络的书籍来构筑基础）。</p>
</blockquote>
<h2> 第一步：理解全局网络层次</h2>
<p>首先要全局上理解 <code>7层协议，4层，5层</code>的对应关系。</p>`,r:{minutes:19.47,words:5840},y:"a",t:"7层协议，4层，5层"},[":md"]],["v-d4cca062","/develop/protocol/dev-protocol-overview.html",{d:15539904e5,l:"2019年3月31日",c:["开发理论"],g:["网络协议"],e:`<h1> ♥网络协议和工具知识体系详解♥</h1>
<blockquote>
<p>网络基础，尤其是网络协议（TCP/IP协议栈为主）在网络开发中极为重要，本系列带你梳理<strong>网络基础和协议相关的知识体系</strong>。</p>
</blockquote>
<h2> 如何学习</h2>
<blockquote>
<p><strong>第一步：学习计算机网络基础</strong>；构筑任何基础体系之前，需要学习这个专题的整体知识点（最好是一本完整的书），这里主要基于<code>《计算机网络(第五版)》</code>知识点梳理，不得不说这本书作者<strong>谢希仁</strong>画的PPT还是挺棒的。网络基础分三部分内容，主要包含如下：</p>
</blockquote>`,r:{minutes:3.88,words:1165},y:"a",t:"♥网络协议和工具知识体系详解♥"},[":md"]],["v-129596a2","/develop/protocol/dev-protocol-tcpip.html",{d:1554336e6,l:"2019年4月4日",c:["开发理论"],g:["网络协议"],e:`<h1> TCP 协议详解</h1>
<blockquote>
<p>TCP是一个巨复杂的协议，关于TCP这个协议的细节，我还是推荐你去看W.Richard Stevens的<a href="https://book.douban.com/subject/1088054/" target="_blank" rel="noopener noreferrer">《TCP/IP 详解 卷1：协议》在新窗口打开</a>。全网上讲TCP/IP的文章众多，多数是皮毛；本文梳理自 左耳朵耗子的文章<a href="https://coolshell.cn/articles/11564.html" target="_blank" rel="noopener noreferrer">《TCP 的那些事儿》在新窗口打开</a>，来帮助大家理解TCP/IP, 其中引用的图片在<a href="http://www.tcpipguide.com/buy.htm?free" target="_blank" rel="noopener noreferrer">这里在新窗口打开</a>。</p>
</blockquote>`,r:{minutes:38.29,words:11488},y:"a",t:"TCP 协议详解"},[":md"]],["v-b5b65d28","/develop/protocol/dev-protocol-tool-netstat.html",{d:1554768e6,l:"2019年4月9日",c:["开发理论"],g:["网络协议"],e:`<h1> netstat查看服务及监听端口详解</h1>
<blockquote>
<p>在Linux使用过程中，需要了解当前系统开放了哪些端口，并且要查看开放这些端口的具体进程和用户，可以通过netstat命令进行简单查询.</p>
</blockquote>
<h2> netstat的参数</h2>
<p>netstat命令各个参数说明如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token parameter variable">-a</span>   或–all                             显示所有连线中的Socket。
<span class="token parameter variable">-A</span>                                       <span class="token operator">&lt;</span>网络类型<span class="token operator">&gt;</span>或–<span class="token operator">&lt;</span>网络类型<span class="token operator">&gt;</span> 列出该网络类型连线中的相关地址。
<span class="token parameter variable">-c</span>   或–continuous               持续列出网络状态。
<span class="token parameter variable">-C</span> 或–cache                       显示路由器配置的快取信息。
<span class="token parameter variable">-e</span>  或–extend                     显示网络其他相关信息。
<span class="token parameter variable">-F</span>  或 –fib                          显示FIB。
<span class="token parameter variable">-g</span>  或–groups                     显示多重广播功能群组组员名单。
<span class="token parameter variable">-h</span>  或–help                        在线帮助。
<span class="token parameter variable">-i</span>   或–interfaces                 显示网络界面信息表单。
<span class="token parameter variable">-l</span>  或–listening                    显示监控中的服务器的Socket。
<span class="token parameter variable">-M</span>   或–masquerade           显示伪装的网络连线。
<span class="token parameter variable">-n</span>  或–numeric                   直接使用IP地址，而不通过域名服务器。
<span class="token parameter variable">-N</span>   或–netlink或–symbolic  显示网络硬件外围设备的符号连接名称。
<span class="token parameter variable">-o</span>  或–timers                      显示计时器。
<span class="token parameter variable">-p</span>   或–programs                显示正在使用Socket的程序识别码和程序名称。
<span class="token parameter variable">-r</span>  或–route                        显示 Routing Table。
<span class="token parameter variable">-s</span>  或–statistice 显示网络工作信息统计表。
<span class="token parameter variable">-t</span>  或–tcp 显示TCP 传输协议的连线状况。
-u或–udp 显示UDP传输协议的连线状况。
-v或–verbose 显示指令执行过程。
<span class="token parameter variable">-V</span> 或–version 显示版本信息。
-w或–raw 显示RAW传输协议的连线状况。
-x或–unix 此参数的效果和指定”-A unix”参数相同。
–ip或–inet 此参数的效果和指定”-A inet”参数相同。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,r:{minutes:10.41,words:3122},y:"a",t:"netstat查看服务及监听端口详解"},[":md"]],["v-04359808","/develop/protocol/dev-protocol-tool-tcpdump.html",{d:15548544e5,l:"2019年4月10日",c:["开发理论"],g:["网络协议"],e:`<h1> 网络抓包神器 tcpdump 使用详解</h1>
<blockquote>
<p>tcpdump 是一款强大的网络抓包工具，它使用 libpcap 库来抓取网络数据包，这个库在几乎在所有的 Linux/Unix 中都有。熟悉 tcpdump 的使用能够帮助你分析调试网络数据，本文将通过一个个具体的示例来介绍它在不同场景下的使用方法。不管你是系统管理员，程序员，云原生工程师还是 yaml 工程师，掌握 tcpdump 的使用都能让你如虎添翼，升职加薪。</p>
</blockquote>
<h2> 基本语法和使用方法</h2>
<h3> 常用参数</h3>
<p>tcpdump 的常用参数如下：</p>`,r:{minutes:17.76,words:5329},y:"a",t:"网络抓包神器 tcpdump 使用详解"},[":md"]],["v-4f1b6e86","/develop/protocol/dev-protocol-tool-wireshark.html",{d:15549408e5,l:"2019年4月11日",c:["开发理论"],g:["网络协议"],e:`<h1> Wireshark介绍及抓包分析</h1>
<blockquote>
<p>Wireshark（前称Ethereal）是一个网络封包分析软件.网络管理员使用Wireshark来检测网络问题，网络安全工程师使用Wireshark来检查资讯安全相关问题，开发者使用Wireshark来为新的通讯协定除错，普通使用者使用Wireshark来学习网络协定的相关知识。</p>
</blockquote>
<h2> Wireshark的背景</h2>
<p>Wireshark（前称Ethereal）是一个网络封包分析软件。网络封包分析软件的功能是撷取网络封包，并尽可能显示出最为详细的网络封包资料。Wireshark使用WinPCAP作为接口，直接与网卡进行数据报文交换。</p>`,r:{minutes:11.21,words:3363},y:"a",t:"Wireshark介绍及抓包分析"},[":md"]],["v-ca4160ee","/develop/protocol/dev-protocol-udp.html",{d:15544224e5,l:"2019年4月5日",c:["开发理论"],g:["网络协议"],e:`<h1> UDP 协议详解</h1>
<blockquote>
<p>基于TCP和UDP的协议非常广泛，所以也有必要对UDP协议进行详解。</p>
</blockquote>
<h2> UDP概述</h2>
<p>UDP(User Datagram Protocol)即用户数据报协议，在网络中它与TCP协议一样用于处理数据包，是一种无连接的协议。在OSI模型中，在第四层——传输层，处于IP协议的上一层。UDP用来支持那些需要在计算机之间传输数据的网络应用。包括网络视频会议系统在内的众多的客户/服务器模式的网络应用都需要使用UDP协议。UDP协议从问世至今已经被使用了很多年，虽然其最初的光彩已经被一些类似协议所掩盖，但是即使是在今天UDP仍然不失为一项非常实用和可行的网络传输层协议。UDP报文没有可靠性保证、顺序保证和流量控制字段等，可靠性较差。但是正因为UDP协议的控制选项较少，在数据传输过程中延迟小、数据传输效率高，适合对可靠性要求不高的应用程序，或者可以保障可靠性的应用程序，如DNS、TFTP、SNMP等。</p>`,r:{minutes:6.25,words:1874},y:"a",t:"UDP 协议详解"},[":md"]],["v-78a32a9b","/develop/protocol/dev-protocol-url.html",{d:15546816e5,l:"2019年4月8日",c:["开发理论"],g:["网络协议"],e:`<h1> 输入URL 到页面加载过程详解</h1>
<blockquote>
<p>本文主要两个目的:</p>
<ul>
<li><strong>第一</strong>，将前面涉及网络协议特别是<code>TCP协议</code>和<code>HTTP协议</code>，<code>DNS解析</code>等等知识点贯穿；</li>
<li><strong>第二</strong>，在此基础上介绍<code>浏览器渲染过程</code>，以及为<code>Web优化</code>提供基础。</li>
</ul>
</blockquote>
<h2> 地址栏输入URL</h2>
<blockquote>
<p>URL : Uniform / Universal Resource Locator ， 即统一资源定位符。它实际上就是网站网址。浏览器就是靠URL来查找资源位置。</p>
</blockquote>`,r:{minutes:11.88,words:3563},y:"a",t:"输入URL 到页面加载过程详解"},[":md"]],["v-565d93a1","/develop/refactor/dev-refactor-if-else.html",{d:15561504e5,l:"2019年4月25日",c:["重构技巧"],g:["常见重构技巧"],e:`<h1> 常见重构技巧 - 去除多余的if else</h1>
<blockquote>
<p>最为常见的是代码中使用很多的if/else，或者switch/case；如何重构呢？方法特别多，本文带你学习其中的技巧。</p>
</blockquote>
<h2> 出现if/else和switch/case的场景</h2>
<p>通常业务代码会包含这样的逻辑：每种条件下会有不同的处理逻辑。比如两个数a和b之间可以通过不同的操作符（+，-，*，/）进行计算，初学者通常会这么写：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">calculate</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span> b<span class="token punctuation">,</span> <span class="token class-name">String</span> operator<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> result <span class="token operator">=</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token constant">MIN_VALUE</span><span class="token punctuation">;</span>
 
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token string">"add"</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>operator<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        result <span class="token operator">=</span> a <span class="token operator">+</span> b<span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token string">"multiply"</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>operator<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        result <span class="token operator">=</span> a <span class="token operator">*</span> b<span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token string">"divide"</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>operator<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        result <span class="token operator">=</span> a <span class="token operator">/</span> b<span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token string">"subtract"</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>operator<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        result <span class="token operator">=</span> a <span class="token operator">-</span> b<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> result<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,r:{minutes:6.3,words:1889},y:"a",t:"常见重构技巧 - 去除多余的if else"},[":md"]],["v-0fac4647","/develop/refactor/dev-refactor-not-null.html",{d:15562368e5,l:"2019年4月26日",c:["重构技巧"],g:["常见重构技巧"],e:`<h1> 常见重构技巧 - 去除不必要的!=</h1>
<blockquote>
<p>项目中会存在大量判空代码，多么丑陋繁冗！如何避免这种情况？我们是否滥用了判空呢？</p>
</blockquote>
<h2> 场景一：null无意义之常规判断空</h2>
<ul>
<li>通常是这样的</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">xxxMethod</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>key<span class="token operator">!=</span><span class="token keyword">null</span><span class="token operator">&amp;&amp;</span><span class="token operator">!</span><span class="token string">""</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">// do something</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,r:{minutes:4.51,words:1354},y:"a",t:"常见重构技巧 - 去除不必要的!="},[":md"]],["v-4a3fd089","/develop/regex/dev-regex-all.html",{d:15558048e5,l:"2019年4月21日",c:["开发理论"],g:["正则表达式"],e:`<h1> 知识点学习</h1>
<blockquote>
<p>正则表达式用于文本内容的查找和替换, 通常了解下，具体使用的时候查看下即可。</p>
</blockquote>
<h2> 常用</h2>
<p><strong>Java</strong></p>
<div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">Pattern</span> p_script <span class="token operator">=</span> <span class="token class-name">Pattern</span><span class="token punctuation">.</span><span class="token function">compile</span><span class="token punctuation">(</span><span class="token string">"正则表达式"</span><span class="token punctuation">,</span> <span class="token class-name">Pattern</span><span class="token punctuation">.</span><span class="token constant">CASE_INSENSITIVE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Matcher</span> m_script <span class="token operator">=</span> p_script<span class="token punctuation">.</span><span class="token function">matcher</span><span class="token punctuation">(</span>content<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">while</span> <span class="token punctuation">(</span>m_script<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 找到匹配内容，进行后续事情</span>
  <span class="token class-name">String</span> strAid <span class="token operator">=</span> m_script<span class="token punctuation">.</span><span class="token function">group</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,r:{minutes:9.62,words:2887},y:"a",t:"知识点学习"},[":md"]],["v-a3c5a762","/develop/regex/dev-regex-tools.html",{d:15559776e5,l:"2019年4月23日",c:["开发理论"],g:["正则表达式"],e:`<h1> 在线工具汇总</h1>
<blockquote>
<p>本文主要总结常用的在线正则表达式相关的工具，从而高效的写出正确的表达式。</p>
</blockquote>
<h2> 工具一：可视化理解正则</h2>
<blockquote>
<p>该工具主要帮助你理解你的正则表达式</p>
</blockquote>
<ul>
<li><a href="https://jex.im/regulex" target="_blank" rel="noopener noreferrer">正则表达式工具-Regulex在新窗口打开</a></li>
<li>以 <strong>正浮点数</strong> 为例子：<code>^[1-9]\\d*\\.\\d*|0\\.\\d*[1-9]\\d*|0?\\.0+|0$</code>, 你将可以非常直观的看到它的流程：</li>
</ul>`,r:{minutes:.78,words:235},y:"a",t:"在线工具汇总"},[":md"]],["v-24c4e449","/develop/regex/dev-regex-usage.html",{d:15558912e5,l:"2019年4月22日",c:["开发理论"],g:["正则表达式"],e:`<h1> 常用正则表达式</h1>
<blockquote>
<p>在学习了正则表达式知识点之后，通常使用正则表达式推荐你本文总结的常用的正则表达式，能覆盖80%的应用场景，如果没有通过再下一篇的工具自己写和校验。</p>
</blockquote>
<h2> 校验数字的表达式</h2>
<ul>
<li>数字：<code>^[0-9]*$</code></li>
<li>n位的数字：<code>^\\d{n}$</code></li>
<li>至少n位的数字：<code>^\\d{n,}$</code></li>
<li>m-n位的数字：<code>^\\d{m,n}$</code></li>
<li>零和非零开头的数字：<code>^(0|[1-9][0-9]*)$</code></li>
<li>非零开头的最多带两位小数的数字：<code>^([1-9][0-9]*)+(\\.[0-9]{1,2})?$</code></li>
<li>带1-2位小数的正数或负数：<code>^(\\-)?\\d+(\\.\\d{1,2})$</code></li>
<li>正数、负数、和小数：<code>^(\\-|\\+)?\\d+(\\.\\d+)?$</code></li>
<li>有两位小数的正实数：<code>^[0-9]+(\\.[0-9]{2})?$</code></li>
<li>有1~3位小数的正实数：<code>^[0-9]+(\\.[0-9]{1,3})?$</code></li>
<li>非零的正整数：<code>^[1-9]\\d*$ 或 ^([1-9][0-9]*){1,3}$</code> 或 <code>^\\+?[1-9][0-9]*$</code></li>
<li>非零的负整数：<code>^\\-[1-9][]0-9"*$</code> 或 <code>^-[1-9]\\d*$</code></li>
<li>非负整数：<code>^\\d+$</code> 或 <code>^[1-9]\\d*|0$</code></li>
<li>非正整数：<code>^-[1-9]\\d*|0$</code> 或 <code>^((-\\d+)|(0+))$</code></li>
<li>非负浮点数：<code>^\\d+(\\.\\d+)?$</code> 或 <code>^[1-9]\\d*\\.\\d*|0\\.\\d*[1-9]\\d*|0?\\.0+|0$</code></li>
<li>非正浮点数：<code>^((-\\d+(\\.\\d+)?)|(0+(\\.0+)?))$</code> 或 <code>^(-([1-9]\\d*\\.\\d*|0\\.\\d*[1-9]\\d*))|0?\\.0+|0$</code></li>
<li>正浮点数：<code>^[1-9]\\d*\\.\\d*|0\\.\\d*[1-9]\\d*$</code> 或 <code>^(([0-9]+\\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\\.+ [0-9]+)|([0-9]*[1-9][0-9]*))$</code></li>
<li>负浮点数：<code>^-([1-9]\\d*\\.\\d*|0\\.\\d*[1-9]\\d*)$</code> 或 <code>^(-(([0-9]+\\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\\.[0-9]+)|([0-9]*[1-9][0-9]*)))$</code></li>
<li>浮点数：<code>^(-?\\d+)(\\.\\d+)?$</code> 或 <code>^-?([1-9]\\d*\\.\\d*|0\\.\\d*[1-9]\\d*|0?\\.0+|0)$</code></li>
</ul>`,r:{minutes:5.75,words:1724},y:"a",t:"常用正则表达式"},[":md"]],["v-adc57e62","/develop/security/dev-security-overview.html",{d:15550272e5,l:"2019年4月12日",c:["开发理论"],g:["安全相关"],e:`<h1> ♥开发安全相关知识体系详解♥</h1>
<blockquote>
<p>开发安全是极为重要的一个话题，本系列带你梳理开发安全相关的知识体系。</p>
</blockquote>
<h2> 如何学习</h2>
<blockquote>
<p><strong>第一步：业内趋势和常见漏洞</strong>；在学习安全需要总体了解安全趋势和常见的Web漏洞，首推了解OWASP，因为它代表着业内Web安全漏洞的趋势</p>
</blockquote>
<ul>
<li>开发安全 - OWASP Top 10
<ul>
<li>OWASP（开放式web应用程序安全项目）关注web应用程序的安全。OWASP这个项目最有名的，也许就是它的"十大安全隐患列表"。这个列表不但总结了web应用程序最可能、最常见、最危险的十大安全隐患，还包括了如何消除这些隐患的建议。（另外，OWASP还有一些辅助项目和指南来帮助IT公司和开发团队来规范应用程序开发流程和测试流程，提高web产品的安全性。）这个"十大"差不多每隔三年更新一次。。</li>
</ul>
</li>
</ul>`,r:{minutes:3.49,words:1046},y:"a",t:"♥开发安全相关知识体系详解♥"},[":md"]],["v-c516bfa4","/develop/security/dev-security-x-click-hijack.html",{d:15555456e5,l:"2019年4月18日",c:["开发理论"],g:["安全相关"],e:`<h1> 点击劫持详解</h1>
<blockquote>
<p>点击劫持其实是一种视觉上的欺骗手段，攻击者将一个透明的、不可见的iframe覆盖在一个网页上，通过调整iframe页面位置，诱使用户在页面上进行操作，在不知情的情况下用户的点击恰好是点击在iframe页面的一些功能按钮上。</p>
</blockquote>
<h2> 点击劫持简介</h2>
<blockquote>
<p>点击劫持是一种恶意技术，欺骗网络用户点击与用户认为他们点击的内容不同的内容，从而可能在点击看似无害的网页时泄露机密信息。〜维基百科</p>
</blockquote>
<p>点击劫持攻击基本上意味着欺骗用户通过框架页面点击某些东西来执行一些恶意攻击，比如，当攻击者在窗口中使用透明iframe诱骗用户点击CTA（例如按钮或链接）到另一个具有相同外观窗口的服务器时发生攻击。从某种意义上说，攻击者劫持了原始服务器的点击并将其发送到另一台服务器。这是对访问者本身和服务器的攻击。</p>`,r:{minutes:8.89,words:2667},y:"a",t:"点击劫持详解"},[":md"]],["v-2a4571a2","/develop/security/dev-security-x-csrf.html",{d:15552864e5,l:"2019年4月15日",c:["开发理论"],g:["安全相关"],e:`<h1> CSRF 详解</h1>
<blockquote>
<p>CSRF(Cross-site request forgery跨站请求伪造，也被称成为“one click attack”或者session riding，通常缩写为CSRF或者XSRF，是一种对网站的恶意利用。</p>
</blockquote>
<h2> CSRF 简介</h2>
<p>CSRF（Cross Site Request Forgery, 跨站域请求伪造）是一种网络的攻击方式，它在 2007 年曾被列为互联网 20 大安全隐患之一。其他安全隐患，比如 SQL 脚本注入，跨站域脚本攻击等在近年来已经逐渐为众人熟知，很多网站也都针对他们进行了防御。然而，对于大多数人来说，CSRF 却依然是一个陌生的概念。即便是大名鼎鼎的 Gmail, 在 2007 年底也存在着 CSRF 漏洞，从而被黑客攻击而使 Gmail 的用户造成巨大的损失。</p>`,r:{minutes:15.55,words:4664},y:"a",t:"CSRF 详解"},[":md"]],["v-3f273922","/develop/security/dev-security-x-ddos.html",{d:15554592e5,l:"2019年4月17日",c:["开发理论"],g:["安全相关"],e:`<h1> DDoS 详解</h1>
<blockquote>
<p>分布式拒绝服务攻击(英文意思是Distributed Denial of Service，简称DDoS)是指处于不同位置的多个攻击者同时向一个或数个目标发动攻击，或者一个攻击者控制了位于不同位置的多台机器并利用这些机器对受害者同时实施攻击。由于攻击的发出点是分布在不同地方的，这类攻击称为分布式拒绝服务攻击，其中的攻击者可以有多个。</p>
</blockquote>
<h2> 攻击简介</h2>
<p>DDoS攻击模型的四种角色：</p>
<ul>
<li>黑客（Intruder/Attacker/Client）   黑客操作主机的接口，向Master发送各种命令。</li>
<li>主控端（Master/Handler）   监听Intruder的命令，向各个Daemon发送攻击命令。</li>
<li>守护进程端（Daemon/Slave/Agent/Zombie/Bot/Server）   接收和响应来自Master的攻击命令，是真正攻击前锋。</li>
<li>受害者（Victim）被攻击的目标主机。</li>
</ul>`,r:{minutes:39.51,words:11852},y:"a",t:"DDoS 详解"},[":md"]],["v-1f68b428","/develop/security/dev-security-x-injection.html",{d:15552e8,l:"2019年4月14日",c:["开发理论"],g:["安全相关"],e:`<h1> 注入攻击详解</h1>
<blockquote>
<p>注入攻击最为常见的攻击方式，作为开发而言必须完全避免; 本文会介绍常见的几种注入方式，比如：<code>SQL 注入</code>, <code>xPath 注入</code>, <code>命令注入</code>, <code>LDAP注入</code>, <code>CLRF注入</code>, <code>Host头注入</code>, <code>Email头注入</code>等等，总结来看其本质其实是一样的，且防御措施也大同小异，具体看下面的内容。</p>
</blockquote>
<h2> SQL 注入</h2>
`,r:{minutes:9.92,words:2977},y:"a",t:"注入攻击详解"},[":md"]],["v-6c74dbc9","/develop/security/dev-security-x-owasp.html",{d:15551136e5,l:"2019年4月13日",c:["开发理论"],g:["安全相关"],e:`<h1> OWASP Top 10</h1>
<blockquote>
<p>在学习安全需要总体了解安全趋势和常见的Web漏洞，首推了解OWASP，因为它代表着业内Web安全漏洞的趋势。</p>
</blockquote>
<h2> OWASP简介</h2>
<p>OWASP（开放式web应用程序安全项目）关注web应用程序的安全。OWASP这个项目最有名的，也许就是它的"十大安全隐患列表"。这个列表不但总结了web应用程序最可能、最常见、最危险的十大安全隐患，还包括了如何消除这些隐患的建议。（另外，OWASP还有一些辅助项目和指南来帮助IT公司和开发团队来规范应用程序开发流程和测试流程，提高web产品的安全性。）这个"十大"差不多每隔三年更新一次。</p>`,r:{minutes:37.41,words:11224},y:"a",t:"OWASP Top 10"},[":md"]],["v-73004147","/develop/security/dev-security-x-xss.html",{d:15553728e5,l:"2019年4月16日",c:["开发理论"],g:["安全相关"],e:`<h1> XSS 详解</h1>
<blockquote>
<p>XSS是跨站脚本攻击(Cross Site Scripting)，为不和层叠样式表(Cascading Style Sheets, CSS)的缩写混淆，故将跨站脚本攻击缩写为XSS。恶意攻击者往Web页面里插入恶意Script代码，当用户浏览该页之时，嵌入其中Web里面的Script代码会被执行，从而达到恶意攻击用户的目的。</p>
</blockquote>
<h2> XSS 简介</h2>
<p>举一个简单的例子，就是留言板。我们知道留言板通常的任务就是把用户留言的内容展示出来。正常情况下，用户的留言都是正常的语言文字，留言板显示的内容也就没毛病。然而这个时候如果有人不按套路出牌，在留言内容中丢进去一行</p>`,r:{minutes:12.48,words:3743},y:"a",t:"XSS 详解"},[":md"]],["v-b5ecb7da","/develop/security/dev-security-y-pentest-workflow.html",{d:15557184e5,l:"2019年4月20日",c:["开发理论"],g:["安全相关"],e:`<h1> 渗透测试流程示例</h1>
<blockquote>
<p>在应用程序上线之前，都会进行多次内部或者外部的渗透测试。对于开发而言，有必要了解下渗透测试的整体流程，从而知己知彼，避免一些开发中的问题。</p>
</blockquote>
<h2> 渗透测试简介</h2>
<h3> 渗透测试是什么</h3>
<p>渗透测试就是利用我们所掌握的渗透知识，对网站进行一步一步的渗透，发现其中存在的漏洞和隐藏的风险，然后撰写一篇测试报告，提供给我们的客户。客户根据我们撰写的测试报告，对网站进行漏洞修补，以防止黑客的入侵！</p>
<h3> 渗透测试和入侵的区别</h3>
<p>和入侵的区别是，渗透测试的前提是我们得经过用户的授权，才可以对网站进行渗透。如果我们没有经过客户的授权而对一个网站进行渗透测试的话，这是违法的。2017年的6.1日我国颁布了<a href="https://baike.baidu.com/item/%E4%B8%AD%E5%8D%8E%E4%BA%BA%E6%B0%91%E5%85%B1%E5%92%8C%E5%9B%BD%E7%BD%91%E7%BB%9C%E5%AE%89%E5%85%A8%E6%B3%95/16843044?fromtitle=%E7%BD%91%E7%BB%9C%E5%AE%89%E5%85%A8%E6%B3%95&amp;fromid=12291792&amp;fr=aladdin" target="_blank" rel="noopener noreferrer">《网络安全法》在新窗口打开</a>，对网络犯罪有了法律约束。</p>`,r:{minutes:11.19,words:3357},y:"a",t:"渗透测试流程示例"},[":md"]],["v-68df3270","/develop/security/dev-security-y-pratice.html",{d:1555632e6,l:"2019年4月19日",c:["开发理论"],g:["安全相关"],e:`<h1> Web安全测试平台(DVWA)</h1>
<blockquote>
<p>DVWA（Damn Vulnerable Web Application）是一个用来进行安全脆弱性鉴定的PHP/MySQL Web应用，旨在为安全专业人员测试自己的专业技能和工具提供合法的环境，帮助web开发者更好的理解web应用安全防范的过程。</p>
</blockquote>
<h2> DVMA介绍</h2>
<ul>
<li><a href="http://www.dvwa.co.uk/" target="_blank" rel="noopener noreferrer">DVWA官网在新窗口打开</a></li>
<li><a href="https://github.com/ethicalhack3r/DVWA" target="_blank" rel="noopener noreferrer">DVWA Github在新窗口打开</a></li>
</ul>`,r:{minutes:2.58,words:774},y:"a",t:"Web安全测试平台(DVWA)"},[":md"]],["v-05b27368","/develop/spec/dev-microservice-kangwei.html",{d:155736e7,l:"2019年5月9日",c:["开发理论"],g:["开发理论"],e:`<h1> 微服务基础 - 康威定律</h1>
<blockquote>
<p>微服务这个概念很早就提出了， 真正火起来是在2016年左右，而康威定律(Conway's Law)就是微服务理论基础。本文整理自肥侠的文章, 帮助大家理解微服务理论体系。</p>
</blockquote>
<h2> 概述</h2>
<p>微服务是最近非常火热的新概念，大家都在追，也都觉得很对，但是似乎没有很充足的理论基础说明这是正确的，给人的感觉是 不明觉厉 。前段时间看了Mike Amundsen《远距离条件下的康威定律——分布式世界中实现团队构建》（是Design RESTful API的作者）在InfoQ上的一个分享，觉得很有帮助，结合自己的一些思考，整理了该演讲的内容。</p>`,r:{minutes:11.99,words:3596},y:"a",t:"微服务基础 - 康威定律"},[":md"]],["v-b8bf9bb8","/develop/spec/dev-th-acid.html",{d:15572736e5,l:"2019年5月8日",c:["开发理论"],g:["开发理论"],e:`<h1> 事务理论 - ACID</h1>
<blockquote>
<p>事务的四个基本特性: <strong>Atomicity（原子性）</strong>：事务是一个不可分割的整体，事务内所有操作要么全做成功，要么全失败。<strong>Consistency（一致性）</strong>：务执行前后，数据从一个状态到另一个状态必须是一致的（A向B转账，不能出现A扣了钱，B却没收到）。<strong>Isolation（隔离性）</strong>： 多个并发事务之间相互隔离，不能互相干扰。<strong>Durability（持久性）</strong>：事务完成后，对数据库的更改是永久保存的，不能回滚。</p>
</blockquote>`,r:{minutes:1.47,words:442},y:"a",t:"事务理论 - ACID"},[":md"]],["v-7ad57090","/develop/spec/dev-th-base.html",{d:15571872e5,l:"2019年5月7日",c:["开发理论"],g:["开发理论"],e:`<h1> 分布式理论 - BASE</h1>
<blockquote>
<p>BASE是“Basically Available, Soft state, Eventually consistent(基本可用、软状态、最终一致性)”的首字母缩写。其中的软状态和最终一致性这两种技巧擅于对付存在分区的场合，并因此提高了可用性。</p>
</blockquote>
<h2> 什么是BASE</h2>
<blockquote>
<p>eBay 的架构师 Dan Pritchett 源于对大规模分布式系统的实践总结，在 ACM 上发表文章提出 BASE 理论，BASE 理论是对 CAP 理论的延伸，核心思想是即使无法做到强一致性（Strong Consistency，CAP 的一致性就是强一致性），但应用可以采用适合的方式达到最终一致性（Eventual Consitency）。</p>
</blockquote>`,r:{minutes:2.18,words:655},y:"a",t:"分布式理论 - BASE"},[":md"]],["v-32401b5f","/develop/spec/dev-th-cap.html",{d:15571872e5,l:"2019年5月7日",c:["开发理论"],g:["开发理论"],e:`<h1> 分布式理论 - CAP</h1>
<blockquote>
<p>CAP理论是分布式系统、特别是分布式存储领域中被讨论的最多的理论。其中C代表一致性 (Consistency)，A代表可用性 (Availability)，P代表分区容错性 (Partition tolerance)。CAP理论告诉我们C、A、P三者不能同时满足，最多只能满足其中两个。</p>
</blockquote>
<h2> CAP 理论简介</h2>
<p>CAP理论是分布式系统、特别是分布式存储领域中被讨论的最多的理论。其中C代表一致性 (Consistency)，A代表可用性 (Availability)，P代表分区容错性 (Partition tolerance)。CAP理论告诉我们C、A、P三者不能同时满足，最多只能满足其中两个。</p>`,r:{minutes:3.11,words:933},y:"a",t:"分布式理论 - CAP"},[":md"]],["v-ec5223b4","/develop/spec/dev-th-solid.html",{d:15571008e5,l:"2019年5月6日",c:["开发理论"],g:["开发理论"],e:`<h1> 软件开发中的原则 - SOLID</h1>
<blockquote>
<p>在软件开发中，前人对软件系统的设计和开发总结了一些原则和模式， 不管用什么语言做开发，都将对我们系统设计和开发提供指导意义。本文主要将总结这些常见的原则，和具体阐述意义。</p>
</blockquote>
<h2> 开发原则SOILD</h2>
<blockquote>
<p>面向对象的基本原则(solid)是五个，但是在经常被提到的除了这五个之外还有 <code>迪米特法则</code>和<code>合成复用原则</code>等， 所以在常见的文章中有表示写六大或七大原则的； 除此之外我还将给出一些其它相关书籍和互联网上出现的原则；</p>
</blockquote>`,r:{minutes:20.07,words:6021},y:"a",t:"软件开发中的原则 - SOLID"},[":md"]],["v-48dcdeca","/develop/spec/dev-x-overview.html",{d:15570144e5,l:"2019年5月5日",c:["开发理论"],g:["开发理论"],e:`<h1> ♥常见开发理论♥</h1>
<blockquote>
<p>开源协议知识体系详解。</p>
</blockquote>
<h2> 相关文章</h2>
<blockquote>
<p>常见开发理论相关文章。</p>
</blockquote>
<ul>
<li>软件开发中的原则 - SOLID
<ul>
<li>在软件开发中，前人对软件系统的设计和开发总结了一些原则和模式， 不管用什么语言做开发，都将对我们系统设计和开发提供指导意义。本文主要将总结这些常见的原则，和具体阐述意义。</li>
</ul>
</li>
<li>分布式理论 - CAP
<ul>
<li>CAP理论是分布式系统、特别是分布式存储领域中被讨论的最多的理论。其中C代表一致性 (Consistency)，A代表可用性 (Availability)，P代表分区容错性 (Partition tolerance)。CAP理论告诉我们C、A、P三者不能同时满足，最多只能满足其中两个。</li>
</ul>
</li>
<li>分布式理论 - BASE
<ul>
<li>BASE是“Basically Available, Soft state, Eventually consistent(基本可用、软状态、最终一致性)”的首字母缩写。其中的软状态和最终一致性这两种技巧擅于对付存在分区的场合，并因此提高了可用性。</li>
</ul>
</li>
<li>事务理论 - ACID
<ul>
<li>一个事务有四个基本特性，也就是我们常说的（ACID）：<strong>Atomicity（原子性）</strong>：事务是一个不可分割的整体，事务内所有操作要么全做成功，要么全失败。<strong>Consistency（一致性）</strong>：务执行前后，数据从一个状态到另一个状态必须是一致的（A向B转账，不能出现A扣了钱，B却没收到）。<strong>Isolation（隔离性）</strong>： 多个并发事务之间相互隔离，不能互相干扰。<strong>Durability（持久性）</strong>：事务完成后，对数据库的更改是永久保存的，不能回滚。</li>
</ul>
</li>
<li>微服务基础 - 康威定律
<ul>
<li>微服务这个概念很早就提出了， 真正火起来是在2016年左右，而康威定律(Conway's Law)就是微服务理论基础。本文整理自肥侠的文章, 帮助大家理解微服务理论体系。</li>
</ul>
</li>
</ul>`,r:{minutes:1.72,words:515},y:"a",t:"♥常见开发理论♥"},[":md"]],["v-c8f78faa","/develop/usage/dev-usage-exe-package.html",{d:1556496e6,l:"2019年4月29日",c:["开发"],g:["随手记"],e:`<h1> Windows 打包EXE部署</h1>
<blockquote>
<p>打包内容: Java，MySQL，Springboot JAR + 第三方dll组件。</p>
</blockquote>
<blockquote>
<p>对于一些简单的WEB应用，使用诸如java,SQL,JAR/WAR期望将其统一打包成一个EXE安装包进行安装，并将其注册为Windows的服务。</p>
</blockquote>
<blockquote>
<p>2019-03-14 JWS在新版本中要收费，我去他大爷的。配置起来这么麻烦，远不及winsw.</p>
</blockquote>
<h2> 准备</h2>`,r:{minutes:6.47,words:1941},y:"a",t:"Windows 打包EXE部署"},[":md"]],["v-220e54fa","/develop/usage/dev-usage-export-pdf.html",{d:15567552e5,l:"2019年5月2日",c:["开发"],g:["随手记"],e:`<h1> Itext PDF 导出</h1>
<blockquote>
<p>给我的文档系统添加了导出，本文记录PDF填坑小结。</p>
</blockquote>
<h2> PDF导出的实现</h2>
<h3> 导出流</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"export"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">exportPdfNew</span><span class="token punctuation">(</span><span class="token class-name">String</span> mdContent<span class="token punctuation">,</span> <span class="token class-name">String</span> type<span class="token punctuation">,</span> <span class="token class-name">HttpServletResponse</span> response<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	response<span class="token punctuation">.</span><span class="token function">reset</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	response<span class="token punctuation">.</span><span class="token function">setContentType</span><span class="token punctuation">(</span><span class="token string">"multipart/form-data"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token class-name">String</span> title <span class="token operator">=</span> <span class="token string">"file"</span><span class="token punctuation">;</span>
	<span class="token class-name">String</span> author <span class="token operator">=</span> <span class="token string">"gavin"</span><span class="token punctuation">;</span>
	<span class="token class-name">String</span> mdFileContent <span class="token operator">=</span> <span class="token string">""</span><span class="token punctuation">;</span>

	<span class="token class-name">ServletOutputStream</span> out <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
	<span class="token keyword">try</span> <span class="token punctuation">{</span>
		<span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> fileBytes <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
		
		<span class="token class-name">String</span> htmlFile <span class="token operator">=</span> <span class="token class-name">StringEscapeUtils</span><span class="token punctuation">.</span><span class="token function">unescapeHtml4</span><span class="token punctuation">(</span>mdContent<span class="token punctuation">)</span><span class="token punctuation">;</span>
		
		<span class="token class-name">String</span> cleanedHtmlFile <span class="token operator">=</span> htmlFile<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token string">"&lt;img"</span><span class="token punctuation">,</span> <span class="token string">"&lt;img style=\\"display:inline-block;width:100%;max-width:650px;\\" "</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		cleanedHtmlFile <span class="token operator">=</span> <span class="token function">cleanHtml</span><span class="token punctuation">(</span>cleanedHtmlFile<span class="token punctuation">)</span><span class="token punctuation">;</span>
		fileBytes <span class="token operator">=</span> <span class="token function">convert</span><span class="token punctuation">(</span>author<span class="token punctuation">,</span> cleanedHtmlFile<span class="token punctuation">)</span><span class="token punctuation">;</span>
		response<span class="token punctuation">.</span><span class="token function">setHeader</span><span class="token punctuation">(</span><span class="token string">"Content-Disposition"</span><span class="token punctuation">,</span>
				<span class="token string">"inline; filename=\\""</span> <span class="token operator">+</span> title <span class="token operator">+</span> <span class="token string">"_"</span> <span class="token operator">+</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">".pdf\\""</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			
		out <span class="token operator">=</span> response<span class="token punctuation">.</span><span class="token function">getOutputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		out<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>fileBytes<span class="token punctuation">)</span><span class="token punctuation">;</span>
		out<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		out<span class="token punctuation">.</span><span class="token function">flush</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,r:{minutes:3.3,words:989},y:"a",t:"Itext PDF 导出"},[":md"]],["v-49814f88","/develop/usage/dev-usage-flotjs.html",{d:15568416e5,l:"2019年5月3日",c:["开发"],g:["随手记"],e:`<h1> FlotJS 画图</h1>
<blockquote>
<p>在一个项目中使用了flotJS, 填坑小结。</p>
</blockquote>
<h2> Demo页面</h2>
<blockquote>
<p>它的官网貌似都已经关闭了，无人维护了。</p>
</blockquote>
<h2> 总体文档参考</h2>
<p>Flot chart学习笔记 <a href="https://www.cnblogs.com/GunYi/p/4076935.html" target="_blank" rel="noopener noreferrer">https://www.cnblogs.com/GunYi/p/4076935.html</a></p>`,r:{minutes:.32,words:96},y:"a",t:"FlotJS 画图"},[":md"]],["v-11a0893e","/develop/usage/dev-usage-input-password.html",{d:15566688e5,l:"2019年5月1日",c:["开发"],g:["随手记"],e:`<h1> Input Password防止自动填充</h1>
<blockquote>
<p>在项目中常需要修改或者填写密码，假设浏览器已经记住密码，常会通过autocomplete=off设置防止自动填充type=password的字段。但是大多数情况这样设置是无效的。</p>
</blockquote>
<h2> 防止Password 自动填充</h2>
<p>autocomplete的含义，官网参考如下:</p>
<p><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete#Values" target="_blank" rel="noopener noreferrer">https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete#Values</a></p>`,r:{minutes:2.01,words:602},y:"a",t:"Input Password防止自动填充"},[":md"]],["v-5a66bf78","/develop/usage/dev-usage-jar-readfile.html",{d:15565824e5,l:"2019年4月30日",c:["开发"],g:["随手记"],e:`<h1> 从jar包中读取资源文件</h1>
<blockquote>
<p>最近做的一些导出项目，需要使用图片资源，字体资源，证书，其它文件等；由于编译为jar并部署的，通常需要读取jar中的资源； 本文只要记录读取资源并通过jar方式运行和在开发IDE中运行的一致性。</p>
</blockquote>
<h2> 常规使用</h2>
<h3> 常规使用 - 绝对路径</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Resource</span> <span class="token punctuation">{</span>  
    <span class="token keyword">public</span>  <span class="token keyword">void</span> <span class="token function">getResource</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">{</span>  
        <span class="token class-name">File</span> file<span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span><span class="token string">"D:\\\\res.txt"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
        <span class="token class-name">BufferedReader</span> br<span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">BufferedReader</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">FileReader</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
        <span class="token class-name">String</span> s<span class="token operator">=</span><span class="token string">""</span><span class="token punctuation">;</span>  
        <span class="token keyword">while</span><span class="token punctuation">(</span><span class="token punctuation">(</span>s<span class="token operator">=</span>br<span class="token punctuation">.</span><span class="token function">readLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token operator">!=</span><span class="token keyword">null</span><span class="token punctuation">)</span>  
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>  
    <span class="token punctuation">}</span>  
<span class="token punctuation">}</span>     
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,r:{minutes:4.01,words:1204},y:"a",t:"从jar包中读取资源文件"},[":md"]],["v-2aaf51e5","/develop/usage/dev-usage-newObj.html",{d:15564096e5,l:"2019年4月28日",c:["开发"],g:["随手记"],e:`<h1> Java 创建对象的四种方法</h1>
<blockquote>
<p>Java 创建对象的四种方法</p>
</blockquote>
<ul>
<li>Java 创建对象的四种方法
<ul>
<li><a href="#%E4%BD%BF%E7%94%A8new-%E6%96%B9%E5%BC%8F%E5%88%9B%E5%BB%BA%E5%AF%B9%E8%B1%A1">使用new 方式创建对象</a></li>
<li><a href="#%E4%BD%BF%E7%94%A8%E5%8F%8D%E5%B0%84%E6%9C%BA%E5%88%B6">使用反射机制</a></li>
<li><a href="#%E5%BA%8F%E5%88%97%E5%8C%96%E5%92%8C%E5%8F%8D%E5%BA%8F%E5%88%97%E5%8C%96%E5%88%9B%E5%BB%BA%E5%AF%B9%E8%B1%A1">序列化和反序列化创建对象</a></li>
<li><a href="#%E6%B7%B1%E6%8B%B7%E8%B4%9D">深拷贝</a></li>
<li><a href="#%E5%8F%82%E8%80%83">参考</a></li>
</ul>
</li>
</ul>`,r:{minutes:2.12,words:637},y:"a",t:"Java 创建对象的四种方法"},[":md"]],["v-3c11b823","/develop/usage/dev-usage-overview.html",{d:15563232e5,l:"2019年4月27日",c:["开发"],g:["随手记"],e:`<h1> 开发随手记 - Overview</h1>
`,r:{minutes:.06,words:17},y:"a",t:"开发随手记 - Overview"},[":md"]],["v-aa1adf3c","/develop/usage/dev-usage-zkfinger.html",{d:1556928e6,l:"2019年5月4日",c:["开发"],g:["随手记"],e:`<h1> 指纹自动登录实战</h1>
<blockquote>
<p>在一个项目中需要指纹登录系统，比如自助的仓库管理系统，用户自己刷指纹开门，系统检测到这一行为进行自动登录系统；用户接下来可以在系统中刷RFID进行借取操作。</p>
</blockquote>
<h2> 准备工作</h2>
<p>采购的是中控一体机，刷卡指纹等</p>
<h2> B/S端调用</h2>
<h2> 服务端调用</h2>
<h3> jacob</h3>
<p><a href="https://mvnrepository.com/artifact/net.sf.jacob-project/jacob" target="_blank" rel="noopener noreferrer">https://mvnrepository.com/artifact/net.sf.jacob-project/jacob</a></p>`,r:{minutes:1.64,words:492},y:"a",t:"指纹自动登录实战"},[":md"]],["v-6fe3b808","/db/nosql-es/elasticsearch-awesome-es.html",{d:16604352e5,l:"2022年8月14日",c:["NoSQL ElasticSearch"],g:["NoSQL ElasticSearch"],e:`<h1> ES详解 - 资料：Awesome Elasticsearch</h1>
<blockquote>
<p>本文来自 <a href="https://github.com/dzharii/awesome-elasticsearch" target="_blank" rel="noopener noreferrer">GitHub Awesome Elasticsearch 项目在新窗口打开</a>, 搜集ElasticSearch相关的优秀资料。</p>
</blockquote>
<h1> General</h1>
<h2> Elastic Stack</h2>
<ul>
<li><a href="https://www.elastic.co/" target="_blank" rel="noopener noreferrer">Elasticsearch在新窗口打开</a> official website</li>
<li><a href="https://www.elastic.co/products/logstash" target="_blank" rel="noopener noreferrer">Logstash在新窗口打开</a> is a data pipeline that helps you process logs and other event data from a variety of systems</li>
<li><a href="https://www.elastic.co/products/kibana" target="_blank" rel="noopener noreferrer">Kibana在新窗口打开</a> is a data analysis tool that helps to visualize your data; <a href="https://www.elastic.co/guide/en/kibana/current/discover.html" target="_blank" rel="noopener noreferrer">Kibana Manual docs在新窗口打开</a></li>
<li><a href="https://www.elastic.co/products/beats" target="_blank" rel="noopener noreferrer">beats在新窗口打开</a> is the platform for building lightweight, open source data shippers for many types of data you want to enrich with Logstash, search and analyze in Elasticsearch, and visualize in Kibana.</li>
</ul>`,r:{minutes:13.53,words:4058},y:"a",t:"ES详解 - 资料：Awesome Elasticsearch"},[":md"]],["v-0246065e","/db/nosql-es/elasticsearch-backup.html",{d:1660608e6,l:"2022年8月16日",c:["NoSQL ElasticSearch"],g:["NoSQL ElasticSearch"],e:`<h1> ElasticSearch - 备份和迁移</h1>
<h2> 方案</h2>
<h3> 离线方案</h3>
<ul>
<li>Snapshot</li>
<li>Reindex</li>
<li>Logstash</li>
<li>ElasticSearch-dump</li>
<li>ElasticSearch-Exporter</li>
</ul>
<h3> 增量备份方案</h3>
<ul>
<li>logstash</li>
</ul>
<h2> 使用快照进行备份</h2>
<h3> 配置信息</h3>
<p>注册前要注意配置文件加上: elasticsearch.yml</p>`,r:{minutes:1.24,words:371},y:"a",t:"ElasticSearch - 备份和迁移"},[":md"]],["v-4777caa4","/db/nosql-es/elasticsearch-wrapper-query.html",{d:16605216e5,l:"2022年8月15日",c:["NoSQL ElasticSearch"],g:["NoSQL ElasticSearch"],e:`<h1> ElasticSearch - WrapperQuery</h1>
<blockquote>
<p>在工作中遇到ElasticSearch版本升级时出现Java High Level接口变更导致的兼容性问题: 之前使用的是2.4.x，考虑性能和功能的增强，需要更换为6.4.x; 2.4.x中我们使用DSL语句直接查询(数据的不确定性和方便动态建立查询规则等因素)，而新的ES Java 高阶API中去掉了相关接口的支持。 此文主要记录通过 ES Wrapper Query实现对6.x版本中 Java high-level transport client对json DSL查询对支持。</p>
</blockquote>`,r:{minutes:1.27,words:380},y:"a",t:"ElasticSearch - WrapperQuery"},[":md"]],["v-a1d46856","/db/nosql-es/elasticsearch-x-agg-bucket.html",{d:16594848e5,l:"2022年8月3日",c:["NoSQL ElasticSearch"],g:["NoSQL ElasticSearch"],e:`<h1> ES详解 - 聚合：聚合查询之Bucket聚合详解</h1>
<blockquote>
<p>除了查询之外，最常用的聚合了，ElasticSearch提供了三种聚合方式： <strong>桶聚合（Bucket Aggregation)</strong>，<strong>指标聚合（Metric Aggregation)</strong> 和 <strong>管道聚合（Pipline Aggregation)</strong>。本文主要讲讲<strong>桶聚合（Bucket Aggregation)</strong>。</p>
</blockquote>
<h2> 聚合的引入</h2>`,r:{minutes:8.63,words:2589},y:"a",t:"ES详解 - 聚合：聚合查询之Bucket聚合详解"},[":md"]],["v-369c8bcf","/db/nosql-es/elasticsearch-x-agg-metric.html",{d:16595712e5,l:"2022年8月4日",c:["NoSQL ElasticSearch"],g:["NoSQL ElasticSearch"],e:`<h1> ES详解 - 聚合：聚合查询之Metric聚合详解</h1>
<blockquote>
<p>前文主要讲了 ElasticSearch提供的三种聚合方式之<strong>桶聚合（Bucket Aggregation)</strong>，本文主要讲讲<strong>指标聚合（Metric Aggregation)</strong>。</p>
</blockquote>
<h2> 如何理解metric聚合</h2>
<blockquote>
<p>在<a href="">bucket聚合</a>中，我画了一张图辅助你构筑体系，那么metric聚合又如何理解呢？</p>
</blockquote>`,r:{minutes:5.91,words:1772},y:"a",t:"ES详解 - 聚合：聚合查询之Metric聚合详解"},[":md"]],["v-e559e6c6","/db/nosql-es/elasticsearch-x-agg-pipeline.html",{d:16596576e5,l:"2022年8月5日",c:["NoSQL ElasticSearch"],g:["NoSQL ElasticSearch"],e:`<h1> ES详解 - 聚合：聚合查询之Pipline聚合详解</h1>
<blockquote>
<p>前文主要讲了 ElasticSearch提供的三种聚合方式之指标聚合（Metric Aggregation)，本文主要讲讲管道聚合（Pipeline Aggregation)。简单而言就是让上一步的聚合结果成为下一个聚合的输入，这就是管道。</p>
</blockquote>
<h2> 如何理解pipeline聚合</h2>
<blockquote>
<p>如何理解管道聚合呢？最重要的是要站在设计者角度看这个功能的要实现的目的：让上一步的聚合结果成为下一个聚合的输入，这就是管道。</p>
</blockquote>`,r:{minutes:3.97,words:1190},y:"a",t:"ES详解 - 聚合：聚合查询之Pipline聚合详解"},[":md"]],["v-8fab6454","/db/nosql-es/elasticsearch-x-dsl-com.html",{d:16592256e5,l:"2022年7月31日",c:["NoSQL ElasticSearch"],g:["NoSQL ElasticSearch"],e:`<h1> ES详解 - 查询：DSL查询之复合查询详解</h1>
<blockquote>
<p>在查询中会有多种条件组合的查询，在ElasticSearch中叫复合查询。它提供了5种复合查询方式：<strong>bool query(布尔查询)</strong>、<strong>boosting query(提高查询)</strong>、<strong>constant_score（固定分数查询）</strong>、<strong>dis_max(最佳匹配查询）</strong>、<strong>function_score(函数查询）</strong>。</p>
</blockquote>`,r:{minutes:6.67,words:2002},y:"a",t:"ES详解 - 查询：DSL查询之复合查询详解"},[":md"]],["v-36621528","/db/nosql-es/elasticsearch-x-dsl-full-text.html",{d:1659312e6,l:"2022年8月1日",c:["NoSQL ElasticSearch"],g:["NoSQL ElasticSearch"],e:`<h1> ES详解 - 查询：DSL查询之全文搜索详解</h1>
<blockquote>
<p>DSL查询极为常用的是对文本进行搜索，我们叫全文搜索，本文主要对全文搜索进行详解。</p>
</blockquote>
<h2> 写在前面:谈谈如何从官网学习</h2>
<p>提示</p>
<p>很多读者在看官方文档学习时存在一个误区，以DSL中full text查询为例，其实内容是非常多的， 没有取舍/没重点去阅读， 要么需要花很多时间，要么头脑一片浆糊。所以这里重点谈谈我的理解。</p>
<p>一些理解：</p>
<ul>
<li>第一点：<strong>全局观</strong>，即我们现在学习内容在整个体系的哪个位置？</li>
</ul>`,r:{minutes:7.38,words:2213},y:"a",t:"ES详解 - 查询：DSL查询之全文搜索详解"},[":md"]],["v-f0ae5462","/db/nosql-es/elasticsearch-x-dsl-term.html",{d:16593984e5,l:"2022年8月2日",c:["NoSQL ElasticSearch"],g:["NoSQL ElasticSearch"],e:`<h1> ES详解 - 查询：DSL查询之Term详解</h1>
<blockquote>
<p>DSL查询另一种极为常用的是对词项进行搜索，官方文档中叫”term level“查询，本文主要对term level搜索进行详解。</p>
</blockquote>
<h2> Term查询引入</h2>
<p>如前文所述，查询分基于文本查询和基于词项的查询:</p>
<figure><img src="https://www.pdai.tech/images/db/es/es-dsl-full-text-3.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>`,r:{minutes:2.47,words:741},y:"a",t:"ES详解 - 查询：DSL查询之Term详解"},[":md"]],["v-48e1eb34","/db/nosql-es/elasticsearch-x-index-mapping.html",{d:16590528e5,l:"2022年7月29日",c:["NoSQL ElasticSearch"],g:["NoSQL ElasticSearch"],e:`<h1> ES详解 - 索引：索引管理详解</h1>
<blockquote>
<p>了解基本使用后，我们从索引操作的角度看看如何对索引进行管理。</p>
</blockquote>
<h2> 索引管理的引入</h2>
<p>我们在前文中增加文档时，如下的语句会动态创建一个customer的index：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>PUT /customer/_doc/1
<span class="token punctuation">{</span>
  <span class="token string">"name"</span><span class="token builtin class-name">:</span> <span class="token string">"John Doe"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,r:{minutes:2.95,words:884},y:"a",t:"ES详解 - 索引：索引管理详解"},[":md"]],["v-39bc0b56","/db/nosql-es/elasticsearch-x-index-template.html",{d:16591392e5,l:"2022年7月30日",c:["NoSQL ElasticSearch"],g:["NoSQL ElasticSearch"],e:`<h1> ES详解 - 索引：索引模板(Index Template)详解</h1>
<blockquote>
<p>前文介绍了索引的一些操作，特别是手动创建索引，但是批量和脚本化必然需要提供一种模板方式快速构建和管理索引，这就是本文要介绍的索引模板(Index Template)，它是一种告诉Elasticsearch在创建索引时如何配置索引的方法。为了更好的复用性，在7.8中还引入了组件模板。</p>
</blockquote>
<h2> 索引模板</h2>
<blockquote>
<p>索引模板是一种告诉Elasticsearch在创建索引时如何配置索引的方法。</p>
</blockquote>`,r:{minutes:3.41,words:1023},y:"a",t:"ES详解 - 索引：索引模板(Index Template)详解"},[":md"]],["v-52fe07ec","/db/nosql-es/elasticsearch-x-install.html",{d:165888e7,l:"2022年7月27日",c:["NoSQL ElasticSearch"],g:["NoSQL ElasticSearch"],e:`<h1> ES详解 - 安装：ElasticSearch和Kibana安装</h1>
<blockquote>
<p>了解完ElasticSearch基础和Elastic Stack生态后，我们便可以开始学习使用ElastiSearch了。所以本文主要介绍ElasticSearch和Kibana的安装。</p>
</blockquote>
<h2> 官网相关教程</h2>
<blockquote>
<p>安装ElasticSearch还是先要看下官方网站。</p>
</blockquote>
<ul>
<li><a href="https://www.elastic.co/cn/" target="_blank" rel="noopener noreferrer">官方网站在新窗口打开</a></li>
<li><a href="https://www.elastic.co/guide/cn/elasticsearch/guide/current/running-elasticsearch.html" target="_blank" rel="noopener noreferrer">官方2.x中文教程中安装教程在新窗口打开</a></li>
<li><a href="https://www.elastic.co/cn/downloads/elasticsearch" target="_blank" rel="noopener noreferrer">官方ElasticSearch下载地址在新窗口打开</a></li>
<li><a href="https://www.elastic.co/cn/downloads/kibana" target="_blank" rel="noopener noreferrer">官方Kibana下载地址在新窗口打开</a></li>
</ul>`,r:{minutes:6.33,words:1899},y:"a",t:"ES详解 - 安装：ElasticSearch和Kibana安装"},[":md"]],["v-4ea016f8","/db/nosql-es/elasticsearch-x-introduce-1.html",{d:16587072e5,l:"2022年7月25日",c:["NoSQL ElasticSearch"],g:["NoSQL ElasticSearch"],e:`<h1> ES详解 - 认知：ElasticSearch基础概念</h1>
<blockquote>
<p>在学习ElasticSearch之前，先简单了解下ES流行度，使用背景，以及相关概念等。</p>
</blockquote>
<h2> 为什么需要学习ElasticSearch</h2>
<blockquote>
<p>根据<a href="https://db-engines.com/en/ranking" target="_blank" rel="noopener noreferrer">DB Engine的排名在新窗口打开</a>显示，ElasticSearch是最受欢迎的企业级搜索引擎。</p>
</blockquote>`,r:{minutes:6.7,words:2011},y:"a",t:"ES详解 - 认知：ElasticSearch基础概念"},[":md"]],["v-4b3665ba","/db/nosql-es/elasticsearch-x-introduce-2.html",{d:16587936e5,l:"2022年7月26日",c:["NoSQL ElasticSearch"],g:["NoSQL ElasticSearch"],e:`<h1> ES详解 - 认知：Elastic Stack生态和场景方案</h1>
<blockquote>
<p>在了解ElaticSearch之后，我们还要了解Elastic背后的生态即我们常说的ELK；与此同时，还会给你展示ElasticSearch的案例场景，让你在学习ES前对它有个全局的印象。</p>
</blockquote>
<h2> Elastic Stack生态</h2>
<blockquote>
<p>Beats + Logstash + ElasticSearch + Kibana</p>
</blockquote>
<p>如下是我从官方博客中找到图，这张图展示了ELK生态以及基于ELK的场景（最上方）</p>`,r:{minutes:5.5,words:1650},y:"a",t:"ES详解 - 认知：Elastic Stack生态和场景方案"},[":md"]],["v-3ce741b4","/db/nosql-es/elasticsearch-x-usage.html",{d:16589664e5,l:"2022年7月28日",c:["NoSQL ElasticSearch"],g:["NoSQL ElasticSearch"],e:`<h1> ES详解 - 入门：查询和聚合的基础使用</h1>
<blockquote>
<p>安装完ElasticSearch 和 Kibana后，为了快速上手，我们通过官网GitHub提供的一个数据进行入门学习，主要包括<strong>查询数据</strong>和<strong>聚合数据</strong>。</p>
</blockquote>
<h2> 入门：从索引文档开始</h2>
<ul>
<li>索引一个文档</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>PUT /customer/_doc/1
<span class="token punctuation">{</span>
  <span class="token string">"name"</span><span class="token builtin class-name">:</span> <span class="token string">"John Doe"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,r:{minutes:4.45,words:1336},y:"a",t:"ES详解 - 入门：查询和聚合的基础使用"},[":md"]],["v-7643df78","/db/nosql-es/elasticsearch-y-peformance.html",{d:16600896e5,l:"2022年8月10日",c:["NoSQL ElasticSearch"],g:["NoSQL ElasticSearch"],e:`<h1> ES详解 - 优化：ElasticSearch性能优化详解</h1>
<blockquote>
<p>Elasticsearch 作为一个开箱即用的产品，在生产环境上线之后，我们其实不一定能确保其的性能和稳定性。如何根据实际情况提高服务的性能，其实有很多技巧。这章我们分享从实战经验中总结出来的 elasticsearch 性能优化，主要从硬件配置优化、索引优化设置、查询方面优化、数据结构优化、集群架构优化等方面讲解。</p>
</blockquote>
<h2> 硬件配置优化</h2>
<blockquote>
<p>升级硬件设备配置一直都是提高服务能力最快速有效的手段，在系统层面能够影响应用性能的一般包括三个因素：CPU、内存和 IO，可以从这三方面进行 ES 的性能优化工作。</p>
</blockquote>`,r:{minutes:25.03,words:7510},y:"a",t:"ES详解 - 优化：ElasticSearch性能优化详解"},[":md"]],["v-188cfa74","/db/nosql-es/elasticsearch-y-th-1.html",{d:1659744e6,l:"2022年8月6日",c:["NoSQL ElasticSearch"],g:["NoSQL ElasticSearch"],e:`<h1> ES详解 - 原理：从图解构筑对ES原理的初步认知</h1>
<blockquote>
<p>在学习ElasticSearch原理时，我推荐你先通过官方博客中的一篇图解文章(虽然是基于2.x版本）来构筑对ES的初步认知（这种认识是体系上的快速认知）。</p>
</blockquote>
<h2> 前言</h2>
<p>本文先自上而下，后自底向上的介绍ElasticSearch的底层工作原理，试图回答以下问题：</p>
<ul>
<li>为什么我的搜索 <code>*foo-bar*</code> 无法匹配 <code>foo-bar</code> ？</li>
<li>为什么增加更多的文件会压缩索引（Index）？</li>
<li>为什么ElasticSearch占用很多内存？</li>
</ul>`,r:{minutes:8.13,words:2439},y:"a",t:"ES详解 - 原理：从图解构筑对ES原理的初步认知"},[":md"]],["v-1a41d313","/db/nosql-es/elasticsearch-y-th-2.html",{d:16598304e5,l:"2022年8月7日",c:["NoSQL ElasticSearch"],g:["NoSQL ElasticSearch"],e:`<h1> ES详解 - 原理：ES原理知识点补充和整体结构</h1>
<blockquote>
<p>通过上文图解了解了ES整体的原理后，我们便可以基于此知识体系下梳理下ES的整体结构以及相关的知识点，这将帮助你更好的理解ElasticSearch索引文档和搜索文档的原理。</p>
</blockquote>
<h2> ElasticSearch整体结构</h2>
<blockquote>
<p>通过上文，在通过图解了解了ES整体的原理后，我们梳理下ES的整体结构</p>
</blockquote>
<figure><img src="https://www.pdai.tech/images/db/es/es-th-2-3.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>`,r:{minutes:5.79,words:1737},y:"a",t:"ES详解 - 原理：ES原理知识点补充和整体结构"},[":md"]],["v-1bf6abb2","/db/nosql-es/elasticsearch-y-th-3.html",{d:16599168e5,l:"2022年8月8日",c:["NoSQL ElasticSearch"],g:["NoSQL ElasticSearch"],e:`<h1> ES详解 - 原理：ES原理之索引文档流程详解</h1>
<blockquote>
<p>ElasticSearch中最重要原理是文档的索引和文档的读取，本文带你理解ES文档的索引过程。</p>
</blockquote>
<h2> 文档索引步骤顺序</h2>
<h3> 单个文档</h3>
<p>新建单个文档所需要的步骤顺序：</p>
<figure><img src="https://www.pdai.tech/images/db/es/es-th-2-4.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>`,r:{minutes:20.15,words:6045},y:"a",t:"ES详解 - 原理：ES原理之索引文档流程详解"},[":md"]],["v-1dab8451","/db/nosql-es/elasticsearch-y-th-4.html",{d:16600032e5,l:"2022年8月9日",c:["NoSQL ElasticSearch"],g:["NoSQL ElasticSearch"],e:`<h1> ES详解 - 原理：ES原理之读取文档流程详解</h1>
<blockquote>
<p>ElasticSearch中最重要原理是文档的索引和文档的读取，前文介绍了索引文档流程，本文带你理解ES文档的读取过程。</p>
</blockquote>
<h2> 文档查询步骤顺序</h2>
<blockquote>
<p>先看下整体的查询流程</p>
</blockquote>
<h3> 单个文档</h3>
<p>以下是从主分片或者副本分片检索文档的步骤顺序：</p>
<figure><img src="https://www.pdai.tech/images/db/es/es-th-2-21.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>`,r:{minutes:17.93,words:5380},y:"a",t:"ES详解 - 原理：ES原理之读取文档流程详解"},[":md"]],["v-0499355a","/db/nosql-es/elasticsearch-z-hello.html",{d:1660176e6,l:"2022年8月11日",c:["NoSQL ElasticSearch"],g:["NoSQL ElasticSearch"],e:`<h1> 大厂实践 - 哈啰：记录一次ElasticSearch的查询性能优化</h1>
<blockquote>
<p>再分享一篇哈啰单车技术团队对ElasticSearch的查询性能优化的分析文章。</p>
</blockquote>
<h2> 问题: 慢查询</h2>
<p>搜索平台的公共集群，由于业务众多，对业务的es查询语法缺少约束，导致问题频发。业务可能写了一个巨大的查询直接把集群打挂掉，但是我们平台人力投入有限，也不可能一条条去审核业务的es查询语法，只能通过后置的手段去保证整个集群的稳定性，通过slowlog分析等，下图中cpu已经100%了。</p>
<figure><img src="https://www.pdai.tech/images/db/es/es-hello-1.jfif" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>`,r:{minutes:8.32,words:2497},y:"a",t:"大厂实践 - 哈啰：记录一次ElasticSearch的查询性能优化"},[":md"]],["v-49b42386","/db/nosql-es/elasticsearch-z-meituan.html",{d:16603488e5,l:"2022年8月13日",c:["NoSQL ElasticSearch"],g:["NoSQL ElasticSearch"],e:`<h1> 大厂实践 - 美团：美团外卖搜索基于Elasticsearch的优化实践</h1>
<blockquote>
<p>美团外卖搜索工程团队在Elasticsearch的优化实践中，基于Location-Based Service（LBS）业务场景对Elasticsearch的查询性能进行优化。该优化基于Run-Length Encoding（RLE）设计了一款高效的倒排索引结构，使检索耗时（TP99）降低了84%。本文从问题分析、技术选型、优化方案等方面进行阐述，并给出最终灰度验证的结论。</p>
</blockquote>
<h2> 1. 前言</h2>
<p>最近十年，Elasticsearch 已经成为了最受欢迎的开源检索引擎，其作为离线数仓、近线检索、B端检索的经典基建，已沉淀了大量的实践案例及优化总结。然而在高并发、高可用、大数据量的 C 端场景，目前可参考的资料并不多。因此，我们希望通过分享在外卖搜索场景下的优化实践，能为大家提供 Elasticsearch 优化思路上的一些借鉴。</p>`,r:{minutes:24.07,words:7221},y:"a",t:"大厂实践 - 美团：美团外卖搜索基于Elasticsearch的优化实践"},[":md"]],["v-af627080","/db/nosql-es/elasticsearch-z-tencent.html",{d:16602624e5,l:"2022年8月12日",c:["NoSQL ElasticSearch"],g:["NoSQL ElasticSearch"],e:`<h1> 大厂实践 - 腾讯：腾讯万亿级 Elasticsearch 技术实践</h1>
<blockquote>
<p>腾讯在ES优化上非常具备参考价值，本文来源于腾讯相关团队的技术分享。Elasticsearch 在腾讯内部广泛应用于日志实时分析、结构化数据分析、全文检索等场景，目前单集群规模达到千级节点、万亿级吞吐，同时腾讯联合 Elastic 公司在腾讯云上提供了内核增强版 ES 云服务。海量规模、丰富的应用场景推动着腾讯对原生 ES 进行持续的高可用、高性能、低成本等全方位优化。本次分享主要剖析腾讯对 Elasticsearch 海量规模下的内核优化与实践，希望能和广大 ES 爱好者共同探讨推动 ES 技术的发展。</p>
</blockquote>`,r:{minutes:30.99,words:9298},y:"a",t:"大厂实践 - 腾讯：腾讯万亿级 Elasticsearch 技术实践"},[":md"]],["v-91bb51f6","/db/nosql-es/elasticsearch.html",{d:16586208e5,l:"2022年7月24日",c:["NoSQL ElasticSearch"],g:["NoSQL ElasticSearch"],e:`<h1> ♥ElasticSearch知识体系详解♥</h1>
<blockquote>
<p>本系列主要对ElasticSearch知识体系进行详解。</p>
</blockquote>
<h2> 知识体系</h2>
<p><em>相关文章</em></p>
<blockquote>
<p>首先，我们通过学习ElasticSearch的概念基础，了解Elastic Stack生态和场景方案。</p>
</blockquote>
<ul>
<li>ES详解 - 认知：ElasticSearch基础概念
<ul>
<li>在学习ElasticSearch之前，先简单了解下ES流行度，使用背景，以及相关概念等</li>
</ul>
</li>
<li>ES详解 - 认知：Elastic Stack生态和场景方案
<ul>
<li>在了解ElaticSearch之后，我们还要了解Elastic背后的生态即我们常说的ELK；与此同时，还会给你展示ElasticSearch的案例场景，让你在学习ES前对它有个全局的印象。</li>
</ul>
</li>
</ul>`,r:{minutes:5.29,words:1586},y:"a",t:"♥ElasticSearch知识体系详解♥"},[":md"]],["v-55e7b16c","/db/nosql-mongo/mongo-performance-improve.html",{d:1658448e6,l:"2022年7月22日",c:["NoSQL MongoDB"],g:["NoSQL MongoDB"],e:`<h1> Mongo进阶 - 性能：查询聚合优化</h1>
<blockquote>
<p>在MongoDB中通过查询聚合语句分析定位慢查询/聚合分析。</p>
</blockquote>
<h2> 问题描述</h2>
<p>执行BI服务的接口， 发现返回一天的记录需要10s左右，这明显是有问题: <img src="https://www.pdai.tech/images/mongo/osa_app_event.png" alt="img" loading="lazy"></p>
<h2> 问题分析</h2>
<h3> 定位慢查询</h3>
<p>为了定位查询，需要查看当前mongo profile的级别, profile的级别有0|1|2，分别代表意思: 0代表关闭，1代表记录慢命令，2代表全部</p>`,r:{minutes:10.07,words:3021},y:"a",t:"Mongo进阶 - 性能：查询聚合优化"},[":md"]],["v-ef2d670e","/db/nosql-mongo/mongo-performance-model.html",{d:16582752e5,l:"2022年7月20日",c:["NoSQL MongoDB"],g:["NoSQL MongoDB"],e:`<h1> Mongo进阶 - 系统设计：数据模型</h1>
`,r:{minutes:.07,words:21},y:"a",t:"Mongo进阶 - 系统设计：数据模型"},[":md"]],["v-ec480f68","/db/nosql-mongo/mongo-x-basic.html",{d:165672e7,l:"2022年7月2日",c:["NoSQL MongoDB"],g:["NoSQL MongoDB"],e:`<h1> Mongo入门 - MongoDB基础概念</h1>
<blockquote>
<p>在学习MongoDB之前先简单了解相关概念。</p>
</blockquote>
<h2> 什么是NoSQL？</h2>
<p>NoSQL是一种非关系型DMS，不需要固定的架构，可以避免joins链接，并且易于扩展。NoSQL数据库用于具有庞大数据存储需求的分布式数据存储。NoSQL用于大数据和实时Web应用程序。例如，像Twitter，Facebook，Google这样的大型公司，每天可能产生TB级的用户数据。</p>
<p>NoSQL数据库代表“<strong>不仅仅是SQL</strong>”或“不是SQL”。虽然NoRELNoSQL会是一个更好的名词。Carl Strozz在1998年引入了NoSQL概念。</p>`,r:{minutes:6.43,words:1928},y:"a",t:"Mongo入门 - MongoDB基础概念"},[":md"]],["v-8a9f438c","/db/nosql-mongo/mongo-x-ecosystem.html",{d:16568064e5,l:"2022年7月3日",c:["NoSQL MongoDB"],g:["NoSQL MongoDB"],e:`<h1> Mongo入门 - MongoDB整体生态</h1>
<blockquote>
<p>很多人在学习Mongo时仅仅围绕着数据库功能，围绕着CRUD和聚合操作，但是MongoDB其实已经基本形成了它自身的生态了。我们在学习一项技能时一定要跳出使用的本身，要从高一点的格局上了解整个生态，这样会对你构筑知识体系有很大的帮助。</p>
</blockquote>
<h2> 整体生态</h2>
<figure><img src="https://www.pdai.tech/images/db/mongo/mongo-y-echo-11.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>`,r:{minutes:2.81,words:842},y:"a",t:"Mongo入门 - MongoDB整体生态"},[":md"]],["v-70752795","/db/nosql-mongo/mongo-x-usage-1.html",{d:16568928e5,l:"2022年7月4日",c:["NoSQL MongoDB"],g:["NoSQL MongoDB"],e:`<h1> Mongo入门 - 基本使用：安装和CRUD</h1>
<blockquote>
<p>在理解MongoDB基础概念后，本文将介绍MongoDB的安装和最基本的CURD操作。</p>
</blockquote>
<h2> MongoDB安装</h2>
<blockquote>
<p>MongoDB的安装比较简单，这里主要给出官方的下载地址，以及官方安装文档的地址，方便大家直达。</p>
</blockquote>
<h3> 一些参考文档</h3>
<ul>
<li><strong>官网下载</strong></li>
</ul>
<p><a href="https://www.mongodb.com/try/download/community" target="_blank" rel="noopener noreferrer">官网下载在新窗口打开</a></p>`,r:{minutes:8.28,words:2485},y:"a",t:"Mongo入门 - 基本使用：安装和CRUD"},[":md"]],["v-722a0034","/db/nosql-mongo/mongo-x-usage-2.html",{d:16569792e5,l:"2022年7月5日",c:["NoSQL MongoDB"],g:["NoSQL MongoDB"],e:`<h1> Mongo入门 - 基本使用：索引和聚合</h1>
<blockquote>
<p>在了解MongoDB的基本CRUD操作后，常用的其它操作还有对字段的索引以及对字段的聚合操作。</p>
</blockquote>
<h2> 聚合 - Aggregation Pipline</h2>
<blockquote>
<p>类似于将SQL中的group by + order by + left join ... 等操作管道化。</p>
</blockquote>
<h3> 常规使用</h3>
<ul>
<li>图例理解</li>
</ul>
<figure><img src="https://www.pdai.tech/images/db/mongo/mongo-x-usage-11.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>`,r:{minutes:5.96,words:1787},y:"a",t:"Mongo入门 - 基本使用：索引和聚合"},[":md"]],["v-73ded8d3","/db/nosql-mongo/mongo-x-usage-3.html",{d:16570656e5,l:"2022年7月6日",c:["NoSQL MongoDB"],g:["NoSQL MongoDB"],e:`<h1> Mongo入门 - 基本使用：效率工具</h1>
<blockquote>
<p>本文将主要介绍常用的MongoDB的工具，这些工具可以极大程度的提升你的效率。</p>
</blockquote>
<h2> 官方MongoDB Compass</h2>
<blockquote>
<p>推荐使用MongoDB Compass，所以详细截几个图给大家看看。</p>
</blockquote>
<p>MongoDB Compass Community由MongoDB开发人员开发，这意味着更高的可靠性和兼容性。它为MongoDB提供GUI mongodb工具，以探索数据库交互；具有完整的CRUD功能并提供可视方式。借助内置模式可视化，用户可以分析文档并显示丰富的结构。为了监控服务器的负载，它提供了数据库操作的实时统计信息。就像MongoDB一样，Compass也有两个版本，一个是Enterprise（付费），社区可以免费使用。适用于Linux，Mac或Windows。<a href="https://www.mongodb.com/try/download/compass" target="_blank" rel="noopener noreferrer">官网下载地址在新窗口打开</a></p>`,r:{minutes:2.75,words:824},y:"a",t:"Mongo入门 - 基本使用：效率工具"},[":md"]],["v-7593b172","/db/nosql-mongo/mongo-x-usage-4.html",{d:1657152e6,l:"2022年7月7日",c:["NoSQL MongoDB"],g:["NoSQL MongoDB"],e:`<h1> Mongo入门 - 基本使用：Java API</h1>
<blockquote>
<p>本文为低优先级，只是向你介绍下MongoDB提供的原生的JavaAPI；而大多数公司使用Spring框架，会使用Spring Data对MongoDB原生API的封装，比如JPA，MongoTemplate等。</p>
</blockquote>
<h2> MongoDB Driver</h2>
<div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token comment">&lt;!-- https://mvnrepository.com/artifact/org.mongodb/mongo-java-driver --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.mongodb<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>mongo-java-driver<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>3.12.6<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,r:{minutes:.85,words:255},y:"a",t:"Mongo入门 - 基本使用：Java API"},[":md"]],["v-77488a11","/db/nosql-mongo/mongo-x-usage-5.html",{d:16572384e5,l:"2022年7月8日",c:["NoSQL MongoDB"],g:["NoSQL MongoDB"],e:`<h1> Mongo入门 - 基本使用：Spring集成</h1>
<blockquote>
<p>本文为主要介绍Spring Data对MongoDB原生API的封装，比如Spring-data-mongo，MongoTemplate等。以及原生API和Spring data系列之间的关系。</p>
</blockquote>
<h2> Spring Data 与 MongoDB</h2>
<blockquote>
<p>在初学使用者而言，常会分不清Spring-data-jpa, spring-data-mongo, springboot-data-mongo-starter以及mongo-driver之间的关联关系， 本节将带你理解它们之间的关系。</p>
</blockquote>`,r:{minutes:1.52,words:455},y:"a",t:"Mongo入门 - 基本使用：Spring集成"},[":md"]],["v-2480ea03","/db/nosql-mongo/mongo-y-arch.html",{d:16573248e5,l:"2022年7月9日",c:["NoSQL MongoDB"],g:["NoSQL MongoDB"],e:`<h1> Mongo进阶 - MongoDB体系结构</h1>
<blockquote>
<p>上面章节已经对MongoDB生态中工具以及使用有了基础，后续文章我们将开始理解MongoDB是如何支撑这些功能的。我们将从最基本的MongoDB的体系结构开始介绍，主要包括<code>MongoDB的包结构</code>，<code>MongoDB的数据逻辑结构</code>，<code>MongoDB的数据文件结构</code>。其中围绕着MongoDB的数据文件结构，将为我们后续介绍MongoDB的存储引擎详解打下基础。</p>
</blockquote>
<h2> MongoDB包组件结构</h2>`,r:{minutes:6.37,words:1912},y:"a",t:"Mongo进阶 - MongoDB体系结构"},[":md"]],["v-53709252","/db/nosql-mongo/mongo-y-cache.html",{d:16578432e5,l:"2022年7月15日",c:["NoSQL MongoDB"],g:["NoSQL MongoDB"],e:`<h1> Mongo进阶 - WT引擎：缓存机制</h1>
<blockquote>
<p>WT 在设计 LRU Cache 时采用分段扫描标记和 hazard pointer 的淘汰机制，在 WT 内部称这种机制叫 eviction Cache 或者 WT Cache，其设计目标是充分利用现代计算机超大内存容量来提高事务读写并发。</p>
</blockquote>
<h2> 为什么会需要理解eviction cache</h2>
<p>从mongoDB 3.0版本引入WiredTiger存储引擎(以下称为WT)以来，一直有同学反应在高速写入数据时WT引擎会间歇性写挂起，有时候写延迟达到了几十秒，这确实是个严重的问题。引起这类问题的关键在于WT的LRU cache的设计模型，WT在设计LRU cache时采用分段扫描标记和hazardpointer的淘汰机制，在WT内部称这种机制叫eviction cache或者WT cache，其设计目标是充分利用现代计算机超大内存容量来提高事务读写并发。在高速不间断写时内存操作是非常快的，但是内存中的数据最终必须写入到磁盘上，将页数据（page）由内存中写入磁盘上是需要写入时间，必定会和应用程序的高速不间断写产生竞争，这在任何数据库存储引擎都是无法避免的，只是由于WT利用大内存和写无锁的特性，让这种不平衡现象更加显著。下图是一位网名叫chszs同学对mongoDB 3.0和3.2版本测试高速写遇到的hang现象.</p>`,r:{minutes:20.43,words:6129},y:"a",t:"Mongo进阶 - WT引擎：缓存机制"},[":md"]],["v-375e0411","/db/nosql-mongo/mongo-y-checkpoint.html",{d:16576704e5,l:"2022年7月13日",c:["NoSQL MongoDB"],g:["NoSQL MongoDB"],e:`<h1> Mongo进阶 - WT引擎：checkpoint原理</h1>
<blockquote>
<p>Checkpoint主要有两个目的: 一是将内存里面发生修改的数据写到数据文件进行持久化保存，确保数据一致性；二是实现数据库在某个时刻意外发生故障，再次启动时，缩短数据库的恢复时间，WiredTiger存储引擎中的Checkpoint模块就是来实现这个功能的。</p>
</blockquote>
<h2> 为什么要理解Checkpoint</h2>
<p>总的来说，Checkpoint主要有两个目的：</p>
<ul>
<li>一是将内存里面发生修改的数据写到数据文件进行持久化保存，确保数据一致性；</li>
<li>二是实现数据库在某个时刻意外发生故障，再次启动时，缩短数据库的恢复时间，WiredTiger存储引擎中的Checkpoint模块就是来实现这个功能的。</li>
</ul>`,r:{minutes:4.69,words:1406},y:"a",t:"Mongo进阶 - WT引擎：checkpoint原理"},[":md"]],["v-3d4bda3e","/db/nosql-mongo/mongo-y-doc.html",{d:16583616e5,l:"2022年7月21日",c:["NoSQL MongoDB"],g:["NoSQL MongoDB"],e:`<h1> Mongo进阶 - 系统设计：模式构建</h1>
<blockquote>
<p>MongoDB使用文档数据模型具有内在的灵活性，允许数据模型支持你的应用程序需求, 灵活性也可能导致模式比它们应有样子的更复杂。这涉及到如何在MongoDB中设计数据库模式（schema），有一个严峻的现实，大多数性能问题都可以追溯到糟糕的模式设计。</p>
</blockquote>
<h2> 前言</h2>
<p>当涉及MongoDB时，一个经常被问到的问题是“我如何在MongoDB中为我的应用程序构造模式（schema）？”老实说，这要看情况而定。你的应用程序读操作比写操作多吗？从数据库中读取时需要将哪些数据放在一起？有哪些性能因素需要考虑？文档有多大？它们今后会变成多大？你预计数据会如何增长和扩展？</p>`,r:{minutes:50.36,words:15107},y:"a",t:"Mongo进阶 - 系统设计：模式构建"},[":md"]],["v-3492596a","/db/nosql-mongo/mongo-y-ds.html",{d:16574976e5,l:"2022年7月11日",c:["NoSQL MongoDB"],g:["NoSQL MongoDB"],e:`<h1> Mongo进阶 - WT引擎：数据结构</h1>
<blockquote>
<p>MongoDB的WiredTiger存储引擎背后采用了什么样的数据结构呢？本文将从<code>常见引擎数据结构</code>，<code>典型B-Tree数据结构</code>，<code>磁盘数据结构</code>, <code>内存数据结构</code>, <code>Page数据结构</code>等方面详解介绍。</p>
</blockquote>
<h2> 存储引擎及常见数据结构</h2>
<p>存储引擎要做的事情无外乎是将磁盘上的数据读到内存并返回给应用，或者将应用修改的数据由内存写到磁盘上。如何设计一种高效的数据结构和算法是所有存储引擎要考虑的根本问题，目前大多数流行的存储引擎是基于B-Tree或LSM(Log Structured Merge) Tree这两种数据结构来设计的。</p>`,r:{minutes:7.12,words:2136},y:"a",t:"Mongo进阶 - WT引擎：数据结构"},[":md"]],["v-ab09914c","/db/nosql-mongo/mongo-y-introduce.html",{d:16574112e5,l:"2022年7月10日",c:["NoSQL MongoDB"],g:["NoSQL MongoDB"],e:`<h1> Mongo进阶 - 原理和WiredTiger引擎</h1>
<p>WiredTiger从被MongoDB收购到成为MongoDB的默认存储引擎的一年半得到了迅猛的发展，也逐步被外部熟知。WiredTiger（以下简称WT）是一个优秀的单机数据库存储引擎，它拥有诸多的特性，既支持BTree索引，也支持LSM Tree索引，支持行存储和列存储，实现ACID级别事务、支持大到4G的记录等。WT的产生不是因为这些特性，而是和计算机发展的现状息息相关。</p>
<p>现代计算机近20年来CPU的计算能力和内存容量飞速发展，但磁盘的访问速度并没有得到相应的提高，WT就是在这样的一个情况下研发出来，它设计了充分利用CPU并行计算的内存模型的无锁并行框架，使得WT引擎在多核CPU上的表现优于其他存储引擎。针对磁盘存储特性，WT实现了一套基于BLOCK/Extent的友好的磁盘访问算法，使得WT在数据压缩和磁盘I/O访问上优势明显。实现了基于snapshot技术的ACID事务，snapshot技术大大简化了WT的事务模型，摒弃了传统的事务锁隔离又同时能保证事务的ACID。WT根据现代内存容量特性实现了一种基于Hazard Pointer 的LRU cache模型，充分利用了内存容量的同时又能拥有很高的事务读写并发。</p>`,r:{minutes:1.47,words:440},y:"a",t:"Mongo进阶 - 原理和WiredTiger引擎"},[":md"]],["v-85ec592c","/db/nosql-mongo/mongo-y-page.html",{d:1657584e6,l:"2022年7月12日",c:["NoSQL MongoDB"],g:["NoSQL MongoDB"],e:`<h1> Mongo进阶 - WT引擎：Page生命周期</h1>
<blockquote>
<p>通过前文我们了解到数据以page为单位加载到cache; 有必要系统的分析一页page的生命周期、状态以及相关参数的配置，这对后续MongoDB的性能调优和故障问题的定位和解决有帮助。</p>
</blockquote>
<h2> 为什么要了解Page生命周期</h2>
<p>通过前文我们了解到数据以page为单位加载到cache、cache里面又会生成各种不同类型的page及为不同类型的page分配不同大小的内存、eviction触发机制和reconcile动作都发生在page上、page大小持续增加时会被分割成多个小page，所有这些操作都是围绕一个page来完成的。</p>`,r:{minutes:7.07,words:2122},y:"a",t:"Mongo进阶 - WT引擎：Page生命周期"},[":md"]],["v-6d3a7b71","/db/nosql-mongo/mongo-y-trans.html",{d:16577568e5,l:"2022年7月14日",c:["NoSQL MongoDB"],g:["NoSQL MongoDB"],e:`<h1> Mongo进阶 - WT引擎：事务实现</h1>
<blockquote>
<p>在本文中，我们主要针对WT引擎的事务来展开分析，来看看它的事务是如何实现的。</p>
</blockquote>
<h2> 理解本文需要有哪些基础</h2>
<blockquote>
<p>以下是基础，可以参考本网张其它文章。</p>
</blockquote>
<ul>
<li>什么是事务？</li>
<li>什么是ACID？</li>
<li>什么是MVCC？</li>
<li>什么是事务快照？</li>
<li>什么是redo log?</li>
</ul>
<h2> WT的事务构造</h2>
<p>知道了基本的事务概念和ACID后，来看看WT引擎是怎么来实现事务和ACID的。要了解实现先要知道它的事务的构造和使用相关的技术，WT在实现事务的时使用主要是使用了三个技术：<code>snapshot(事务快照)</code>、<code>MVCC (多版本并发控制)</code>和<code>redo log(重做日志)</code>，为了实现这三个技术，它还定义了一个基于这三个技术的事务对象和<strong>全局事务管理器</strong>。事务对象描述如下</p>`,r:{minutes:22.17,words:6652},y:"a",t:"Mongo进阶 - WT引擎：事务实现"},[":md"]],["v-3fbdde98","/db/nosql-mongo/mongo-z-backup.html",{d:16581888e5,l:"2022年7月19日",c:["NoSQL MongoDB"],g:["NoSQL MongoDB"],e:`<h1> Mongo进阶 - DB核心：备份恢复</h1>
<blockquote>
<p>mongoexport/mongoimport导入/导出的是JSON格式，而mongodump/mongorestore导入/导出的是BSON格式</p>
</blockquote>
<h2> MongoDB的备份恢复</h2>
<blockquote>
<p>mongoexport/mongoimport导入/导出的是JSON格式，而mongodump/mongorestore导入/导出的是BSON格式。</p>
</blockquote>
<p>JSON可读性强但体积较大，BSON则是二进制文件，体积小但对人类几乎没有可读性。</p>`,r:{minutes:1.17,words:352},y:"a",t:"Mongo进阶 - DB核心：备份恢复"},[":md"]],["v-08c634e6","/db/nosql-mongo/mongo-z-index.html",{d:16579296e5,l:"2022年7月16日",c:["NoSQL MongoDB"],g:["NoSQL MongoDB"],e:`<h1> Mongo进阶 - DB核心：索引实现</h1>
<ul>
<li><a href="https://docs.mongodb.com/manual/indexes/" target="_blank" rel="noopener noreferrer">MongoDB 索引在新窗口打开</a></li>
</ul>
<p><a href="https://mongoing.com/archives/2789" target="_blank" rel="noopener noreferrer">https://mongoing.com/archives/2789</a></p>
`,r:{minutes:.11,words:33},y:"a",t:"Mongo进阶 - DB核心：索引实现"},[":md"]],["v-edb6b08a","/db/nosql-mongo/mongo-z-rep.html",{d:1658016e6,l:"2022年7月17日",c:["NoSQL MongoDB"],g:["NoSQL MongoDB"],e:`<h1> Mongo进阶 - DB核心：复制集</h1>
<blockquote>
<p>在实际的生产环境中，我们需要考虑<strong>数据冗余和高可靠性</strong>，即通过在不同的机器上保存副本来保证数据的不会因为单点损坏而丢失；能够随时应对数据丢失、机器损坏带来的风险。MongoDB的复制集就是用来解决这个问题的，一组复制集就是一组mongod实例掌管同一个数据集，实例可以在不同的机器上面。实例中包含一个主导，接受客户端所有的写入操作，其他都是副本实例，从主服务器上获得数据并保持同步。</p>
</blockquote>
<h2> 为什么要引入复制集？</h2>
<blockquote>
<p>保证数据在生产部署时的<strong>冗余和可靠性</strong>，通过在不同的机器上保存副本来保证数据的不会因为单点损坏而丢失。能够随时应对数据丢失、机器损坏带来的风险。换一句话来说，还能提高读取能力，用户的读取服务器和写入服务器在不同的地方，而且，由不同的服务器为不同的用户提供服务，提高整个系统的负载。</p>
</blockquote>`,r:{minutes:16.78,words:5034},y:"a",t:"Mongo进阶 - DB核心：复制集"},[":md"]],["v-5cd21616","/db/nosql-mongo/mongo-z-sharding.html",{d:16581024e5,l:"2022年7月18日",c:["NoSQL MongoDB"],g:["NoSQL MongoDB"],e:`<h1> Mongo进阶 - DB核心：分片Sharding</h1>
<blockquote>
<p>分片（sharding）是MongoDB通过水平扩展将数据集分布在不同的服务器上来提高自己的存储容量和吞吐量。和MySQL分区方案相比，MongoDB的最大区别在于它几乎能自动完成所有事情，只要告诉MongoDB要分配数据，它就能自动维护数据在不同服务器之间的均衡。</p>
</blockquote>
<h2> 为什么要引入分片</h2>
<p>高数据量和吞吐量的数据库应用会对单机的性能造成较大压力, 大的查询量会将单机的CPU耗尽, 大的数据量对单机的存储压力较大, 最终会耗尽系统的内存而将压力转移到磁盘IO上。</p>`,r:{minutes:7.53,words:2258},y:"a",t:"Mongo进阶 - DB核心：分片Sharding"},[":md"]],["v-3f190cd0","/db/nosql-mongo/mongo.html",{d:16566336e5,l:"2022年7月1日",c:["NoSQL MongoDB"],g:["NoSQL MongoDB"],e:`<h1> ♥MongoDB教程 - Mongo知识体系详解♥</h1>
<blockquote>
<p>本系列将给大家构建MongoDB全局知识体系。</p>
</blockquote>
<h2> 知识体系</h2>
<p>MongoDB学习引入</p>
<figure><img src="https://www.pdai.tech/images/db/mongo/mongo-x-basic-0.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>
<p>MongoDB生态</p>
<figure><img src="https://www.pdai.tech/images/db/mongo/mongo-y-echo-11.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>`,r:{minutes:5.01,words:1504},y:"a",t:"♥MongoDB教程 - Mongo知识体系详解♥"},[":md"]],["v-336c63aa","/db/nosql-mongo/postgresql-replace.html",{d:16585344e5,l:"2022年7月23日",c:["NoSQL MongoDB"],g:["NoSQL MongoDB"],e:`<h1> MongoDB 替换方案之PostgreSQL</h1>
<blockquote>
<p>MongoDB 宣布其开源许可证从 GNU AGPLv3 切换到 Server Side Public License (SSPL), SSPL 明确要求托管 MongoDB 实例的云计算公司要么获取商业许可证要么向社区开源其服务代码。导致了一些商业公司为了规避风险，弃用MongoDB转而投入其它NoSQL方案。本文主要调研PostgreSQL替换MongoDB方案。</p>
</blockquote>
<h2> 关于MongoDB V3版本证书</h2>
<blockquote>
<p>MongoDB 宣布其开源许可证从 GNU AGPLv3 切换到 Server Side Public License (SSPL)。新许可证将适用于新版本的 MongoDB Community Server 以及打过补丁的旧版本。AGPLv3 和 SSPL 在自由使用、自由修改和重新分发代码上没有区别。</p>
</blockquote>`,r:{minutes:10.17,words:3051},y:"a",t:"MongoDB 替换方案之PostgreSQL"},[":md"]],["v-78ae1878","/db/nosql-redis/db-redis-data-type-enc.html",{d:16553376e5,l:"2022年6月16日",c:["NoSQL Redis"],g:["NoSQL Redis"],e:`<h1> Redis进阶 - 数据结构：redis对象与编码(底层结构)对应关系详解</h1>
<blockquote>
<p>在学习完<a href="">底层数据结构</a>之后，我们终于可以结合前文内容阐述redis对象及编码之间的关系了。</p>
</blockquote>
<h2> redis对象与编码(底层结构)对应关系引入</h2>
<p>在对<a href="">对象机制详解</a> 和 <a href="">底层数据结构</a> 有了初步认识之后，我们便可以继续理解它们是怎么对应的：</p>
<figure><img src="https://www.pdai.tech/images/db/redis/db-redis-object-2-4.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>`,r:{minutes:8.08,words:2423},y:"a",t:"Redis进阶 - 数据结构：redis对象与编码(底层结构)对应关系详解"},[":md"]],["v-7e45f676","/db/nosql-redis/db-redis-data-type-special.html",{d:1654992e6,l:"2022年6月12日",c:["NoSQL Redis"],g:["NoSQL Redis"],e:`<h1> Redis入门 - 数据类型：3种特殊类型详解</h1>
<blockquote>
<p>Redis除了上文中5种基础数据类型，还有三种特殊的数据类型，分别是 <strong>HyperLogLogs</strong>（基数统计）， <strong>Bitmaps</strong> (位图) 和 <strong>geospatial</strong> （地理位置）。</p>
</blockquote>
<h2> HyperLogLogs（基数统计）</h2>
<blockquote>
<p>Redis 2.8.9 版本更新了 Hyperloglog 数据结构！</p>
</blockquote>`,r:{minutes:4.75,words:1425},y:"a",t:"Redis入门 - 数据类型：3种特殊类型详解"},[":md"]],["v-efe11898","/db/nosql-redis/db-redis-data-type-stream.html",{d:16550784e5,l:"2022年6月13日",c:["NoSQL Redis"],g:["NoSQL Redis"],e:`<h1> Redis入门 - 数据类型：Stream详解</h1>
<blockquote>
<p>Redis5.0 中还增加了一个数据类型Stream，它借鉴了Kafka的设计，是一个新的强大的支持多播的可持久化的消息队列。</p>
</blockquote>
<h2> 为什么会设计Stream</h2>
<blockquote>
<p>Redis5.0 中还增加了一个数据结构Stream，从字面上看是流类型，但其实从功能上看，应该是Redis对消息队列（MQ，Message Queue）的完善实现。</p>
</blockquote>
<p>用过Redis做消息队列的都了解，基于Reids的消息队列实现有很多种，例如：</p>`,r:{minutes:16.84,words:5052},y:"a",t:"Redis入门 - 数据类型：Stream详解"},[":md"]],["v-17e9eeee","/db/nosql-redis/db-redis-data-types.html",{d:16549056e5,l:"2022年6月11日",c:["NoSQL Redis"],g:["NoSQL Redis"],e:`<h1> Redis入门 - 数据类型：5种基础数据类型详解</h1>
<blockquote>
<p>Redis所有的key（键）都是字符串。我们在谈基础数据结构时，讨论的是存储值的数据类型，主要包括常见的5种数据类型，分别是：String、List、Set、Zset、Hash</p>
</blockquote>
<h2> Redis数据结构简介</h2>
<blockquote>
<p>Redis基础文章非常多，关于基础数据结构类型，我推荐你先看下<a href="https://redis.io/topics/data-types" target="_blank" rel="noopener noreferrer">官方网站内容在新窗口打开</a>，然后再看下面的小结</p>
</blockquote>`,r:{minutes:7.89,words:2368},y:"a",t:"Redis入门 - 数据类型：5种基础数据类型详解"},[":md"]],["v-a6abd662","/db/nosql-redis/db-redis-introduce.html",{d:16548192e5,l:"2022年6月10日",c:["NoSQL Redis"],g:["NoSQL Redis"],e:`<h1> Redis入门 - Redis概念和基础</h1>
<blockquote>
<p>Redis是一种支持key-value等多种数据结构的存储系统。可用于缓存，事件发布或订阅，高速队列等场景。支持网络，提供字符串，哈希，列表，队列，集合结构直接存取，基于内存，可持久化。</p>
</blockquote>
<h2> 什么是Redis</h2>
<p>Redis是一款内存高速缓存数据库。Redis全称为：<strong>Remote Dictionary Server</strong>（远程数据服务），使用C语言编写，Redis是一个key-value存储系统（键值存储系统），支持丰富的数据类型，如：String、list、set、zset、hash。</p>`,r:{minutes:5.76,words:1729},y:"a",t:"Redis入门 - Redis概念和基础"},[":md"]],["v-40aecaab","/db/nosql-redis/db-redis-overview.html",{d:16547328e5,l:"2022年6月9日",c:["NoSQL Redis"],g:["NoSQL Redis"],e:`<h1> ♥Redis教程 - Redis知识体系详解♥</h1>
<blockquote>
<p>本系列主要对Redis知识体系进行详解。</p>
</blockquote>
<h2> 知识体系</h2>
<p><em>知识体系</em></p>
<figure><img src="https://www.pdai.tech/images/db/redis/db-redis-overview.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>
<p><em>相关文章</em></p>`,r:{minutes:7.21,words:2164},y:"a",t:"♥Redis教程 - Redis知识体系详解♥"},[":md"]],["v-70bb63fe","/db/nosql-redis/db-redis-x-cache.html",{d:16560288e5,l:"2022年6月24日",c:["NoSQL Redis"],g:["NoSQL Redis"],e:`<h1> Redis进阶 - 缓存问题：一致性, 穿击, 穿透, 雪崩, 污染等</h1>
<blockquote>
<p>Redis最常用的一个场景就是作为缓存，本文主要探讨Redis作为缓存，在实践中可能会有哪些问题？比如一致性, 穿击, 穿透, 雪崩, 污染等。</p>
</blockquote>
<h2> 为什么要理解Redis缓存问题</h2>
<p>在高并发的业务场景下，数据库大多数情况都是用户并发访问最薄弱的环节。所以，就需要使用redis做一个缓冲操作，让请求先访问到redis，而不是直接访问Mysql等数据库。这样可以大大缓解数据库的压力。</p>
<p>当缓存库出现时，必须要考虑如下问题：</p>`,r:{minutes:14.7,words:4410},y:"a",t:"Redis进阶 - 缓存问题：一致性, 穿击, 穿透, 雪崩, 污染等"},[":md"]],["v-49dcf7ee","/db/nosql-redis/db-redis-x-cluster.html",{d:16559424e5,l:"2022年6月23日",c:["NoSQL Redis"],g:["NoSQL Redis"],e:`<h1> Redis进阶 - 高可拓展：分片技术（Redis Cluster）详解</h1>
<blockquote>
<p>前面两篇文章，<a href="">主从复制</a>和<a href="">哨兵机制</a>保障了高可用，就读写分离而言虽然slave节点扩展了主从的读并发能力，但是<strong>写能力</strong>和<strong>存储能力</strong>是无法进行扩展，就只能是master节点能够承载的上限。如果面对海量数据那么必然需要构建master（主节点分片)之间的集群，同时必然需要吸收高可用（主从复制和哨兵机制）能力，即每个master分片节点还需要有slave节点，这是分布式系统中典型的纵向扩展（集群的分片技术）的体现；所以在Redis 3.0版本中对应的设计就是Redis Cluster。</p>
</blockquote>`,r:{minutes:29.26,words:8779},y:"a",t:"Redis进阶 - 高可拓展：分片技术（Redis Cluster）详解"},[":md"]],["v-6e4afc4c","/db/nosql-redis/db-redis-x-copy.html",{d:16557696e5,l:"2022年6月21日",c:["NoSQL Redis"],g:["NoSQL Redis"],e:`<h1> Redis进阶 - 高可用：主从复制详解</h1>
<blockquote>
<p>我们知道要避免单点故障，即保证高可用，便需要冗余（副本）方式提供集群服务。而Redis 提供了主从库模式，以保证数据副本的一致，主从库之间采用的是读写分离的方式。本文主要阐述Redis的主从复制。</p>
</blockquote>
<h2> 主从复制概述</h2>
<blockquote>
<p>主从复制，是指将一台Redis服务器的数据，复制到其他的Redis服务器。前者称为主节点(master)，后者称为从节点(slave)；数据的复制是单向的，只能由主节点到从节点。</p>
</blockquote>`,r:{minutes:15.68,words:4704},y:"a",t:"Redis进阶 - 高可用：主从复制详解"},[":md"]],["v-0092b9e9","/db/nosql-redis/db-redis-x-event.html",{d:16555968e5,l:"2022年6月19日",c:["NoSQL Redis"],g:["NoSQL Redis"],e:`<h1> Redis进阶 - 事件：Redis事件机制详解</h1>
<blockquote>
<p>Redis 采用事件驱动机制来处理大量的网络IO。它并没有使用 libevent 或者 libev 这样的成熟开源方案，而是自己实现一个非常简洁的事件驱动库 ae_event。</p>
</blockquote>
<h2> 事件机制</h2>
<blockquote>
<p>Redis中的事件驱动库只关注网络IO，以及定时器。</p>
</blockquote>
<p>该事件库处理下面两类事件：</p>
<ul>
<li><strong>文件事件</strong>(file event)：用于处理 Redis 服务器和客户端之间的网络IO。</li>
<li><strong>时间事件</strong>(time eveat)：Redis 服务器中的一些操作（比如serverCron函数）需要在给定的时间点执行，而时间事件就是处理这类定时操作的。</li>
</ul>`,r:{minutes:17.42,words:5227},y:"a",t:"Redis进阶 - 事件：Redis事件机制详解"},[":md"]],["v-74cb7293","/db/nosql-redis/db-redis-x-performance.html",{d:1656288e6,l:"2022年6月27日",c:["NoSQL Redis"],g:["NoSQL Redis"],e:`<h1> Redis进阶 - 性能调优：Redis性能调优详解</h1>
<blockquote>
<p>Redis 的性能问题，涉及到的知识点非常广，几乎涵盖了 CPU、内存、网络、甚至磁盘的方方面面；同时还需要对上文中一些基础或底层有详细的了解。针对Redis的性能调优，这里整理分享一篇水滴与银弹（公众号）的文章，这篇文章可以帮助你构筑Redis性能调优的知识体系。</p>
</blockquote>
<h2> 前言</h2>
<blockquote>
<p>Redis 作为优秀的内存数据库，其拥有非常高的性能，单个实例的 OPS 能够达到 10W 左右。但也正因此如此，当我们在使用 Redis 时，如果发现操作延迟变大的情况，就会与我们的预期不符。</p>
</blockquote>`,r:{minutes:40.71,words:12213},y:"a",t:"Redis进阶 - 性能调优：Redis性能调优详解"},[":md"]],["v-cba71f5a","/db/nosql-redis/db-redis-x-pub-sub.html",{d:16555104e5,l:"2022年6月18日",c:["NoSQL Redis"],g:["NoSQL Redis"],e:`<h1> Redis进阶 - 消息传递：发布订阅模式详解</h1>
<blockquote>
<p>Redis 发布订阅(pub/sub)是一种消息通信模式：发送者(pub)发送消息，订阅者(sub)接收消息。</p>
</blockquote>
<h2> Redis发布订阅简介</h2>
<blockquote>
<p>Redis 发布订阅(pub/sub)是一种消息通信模式：发送者(pub)发送消息，订阅者(sub)接收消息。</p>
</blockquote>
<p>Redis 的 SUBSCRIBE 命令可以让客户端订阅任意数量的频道， 每当有新信息发送到被订阅的频道时， 信息就会被发送给所有订阅指定频道的客户端。</p>`,r:{minutes:8.21,words:2464},y:"a",t:"Redis进阶 - 消息传递：发布订阅模式详解"},[":md"]],["v-41f8b388","/db/nosql-redis/db-redis-x-rdb-aof.html",{d:1655424e6,l:"2022年6月17日",c:["NoSQL Redis"],g:["NoSQL Redis"],e:`<h1> Redis进阶 - 持久化：RDB和AOF机制详解</h1>
<blockquote>
<p>为了防止数据丢失以及服务重启时能够恢复数据，Redis支持数据的持久化，主要分为两种方式，分别是RDB和AOF; 当然实际场景下还会使用这两种的混合模式。</p>
</blockquote>
<h2> Redis持久化简介</h2>
<blockquote>
<p>从两个点，我们来了解下Redis持久化</p>
</blockquote>
<ul>
<li><strong>为什么需要持久化</strong>？</li>
</ul>
<p>Redis是个基于内存的数据库。那服务一旦宕机，内存中的数据将全部丢失。通常的解决方案是从后端数据库恢复这些数据，但后端数据库有性能瓶颈，如果是大数据量的恢复，1、会对数据库带来巨大的压力，2、数据库的性能不如Redis。导致程序响应慢。所以对Redis来说，实现数据的持久化，避免从后端数据库中恢复数据，是至关重要的。</p>`,r:{minutes:24.94,words:7482},y:"a",t:"Redis进阶 - 持久化：RDB和AOF机制详解"},[":md"]],["v-1d4cc7ae","/db/nosql-redis/db-redis-x-redis-ds.html",{d:16552512e5,l:"2022年6月15日",c:["NoSQL Redis"],g:["NoSQL Redis"],e:`<h1> Redis进阶 - 数据结构：底层数据结构详解</h1>
<blockquote>
<p>我们在前文已经阐述了<a href="">Redis 5种基础数据类型详解</a>，分别是字符串(string)、列表(list)、哈希(hash)、集合(set)、有序集合(zset)；那么这些基础类型的底层是如何实现的呢？Redis的每种对象其实都由<strong>对象结构(redisObject)</strong> 与 <strong>对应编码的数据结构</strong>组合而成, 前文是第一部分<a href="">对象机制详解</a>, 本文主要介绍<strong>底层数据结构</strong> 部分。（在这特别提下，大多数人构建知识体系去读源码是不太现实的，这时候我认为更为重要的是，理解为何会出现这样的设计，知道它解决了什么问题，然后对应了解相关知识点，最终在一些应用场景时可以以此来通过调整存储的类型进一步提升优化性能）。</p>
</blockquote>`,r:{minutes:29.01,words:8702},y:"a",t:"Redis进阶 - 数据结构：底层数据结构详解"},[":md"]],["v-60238604","/db/nosql-redis/db-redis-x-redis-object.html",{d:16551648e5,l:"2022年6月14日",c:["NoSQL Redis"],g:["NoSQL Redis"],e:`<h1> Redis进阶 - 数据结构：对象机制详解</h1>
<blockquote>
<p>我们在前文已经阐述了<a href="">Redis 5种基础数据类型详解</a>，分别是字符串(string)、列表(list)、哈希(hash)、集合(set)、有序集合(zset)，以及5.0版本中<a href="">Redis Stream结构详解</a>；那么这些基础类型的底层是如何实现的呢？Redis的每种对象其实都由<strong>对象结构(redisObject)</strong> 与 <strong>对应编码的数据结构</strong>组合而成, 本文主要介绍<strong>对象结构(redisObject)</strong> 部分。</p>
</blockquote>`,r:{minutes:8.09,words:2428},y:"a",t:"Redis进阶 - 数据结构：对象机制详解"},[":md"]],["v-1a5b038b","/db/nosql-redis/db-redis-x-sentinel.html",{d:1655856e6,l:"2022年6月22日",c:["NoSQL Redis"],g:["NoSQL Redis"],e:`<h1> Redis进阶 - 高可用：哨兵机制（Redis Sentinel）详解</h1>
<blockquote>
<p>在上文主从复制的基础上，如果注节点出现故障该怎么办呢？ 在 Redis 主从集群中，哨兵机制是实现主从库自动切换的关键机制，它有效地解决了主从复制模式下故障转移的问题。</p>
</blockquote>
<h2> 哨兵机制（Redis Sentinel）</h2>
<blockquote>
<p>Redis Sentinel，即Redis哨兵，在Redis 2.8版本开始引入。哨兵的核心功能是主节点的自动故障转移。</p>
</blockquote>
<p>下图是一个典型的哨兵集群监控的逻辑图：</p>`,r:{minutes:6.4,words:1921},y:"a",t:"Redis进阶 - 高可用：哨兵机制（Redis Sentinel）详解"},[":md"]],["v-5e95129b","/db/nosql-redis/db-redis-x-trans.html",{d:16556832e5,l:"2022年6月20日",c:["NoSQL Redis"],g:["NoSQL Redis"],e:`<h1> Redis进阶 - 事务：Redis事务详解</h1>
<blockquote>
<p>Redis 事务的本质是一组命令的集合。事务支持一次执行多个命令，一个事务中所有命令都会被序列化。在事务执行过程，会按照顺序串行化执行队列中的命令，其他客户端提交的命令请求不会插入到事务执行命令序列中。</p>
</blockquote>
<h2> 什么是Redis事务</h2>
<p>Redis 事务的本质是一组命令的集合。事务支持一次执行多个命令，一个事务中所有命令都会被序列化。在事务执行过程，会按照顺序串行化执行队列中的命令，其他客户端提交的命令请求不会插入到事务执行命令序列中。</p>
<p>总结说：redis事务就是一次性、顺序性、排他性的执行一个队列中的一系列命令。</p>`,r:{minutes:9.03,words:2708},y:"a",t:"Redis进阶 - 事务：Redis事务详解"},[":md"]],["v-4e459d68","/db/nosql-redis/db-redis-x-version-lastest.html",{d:16561152e5,l:"2022年6月25日",c:["NoSQL Redis"],g:["NoSQL Redis"],e:`<h1> Redis进阶 - 版本特性: Redis4.0、5.0、6.0特性整理</h1>
<blockquote>
<p>在学习Redis知识体系时，我们难免会需要查看版本实现之间的差异，本文主要整理Redis较为新的版本的特性。</p>
</blockquote>
<h2> Redis 4</h2>
<h3> 模块系统</h3>
<p>Redis 4.0 发生的最大变化就是加入了模块系统， 这个系统可以让用户通过自己编写的代码来扩展和实现 Redis 本身并不具备的功能，因为模块系统是通过高层次 API 实现的， 它与 Redis 内核本身完全分离、互不干扰， 所以用户可以在有需要的情况下才启用这个功能。目前已经有人使用这个功能开发了各种各样的模块， 比如 Redis Labs 开发的一些模块就可以在 <a href="http://redismodules.com" target="_blank" rel="noopener noreferrer">http://redismodules.com</a> 看到。模块功能使得用户可以将 Redis 用作基础设施， 并在上面构建更多功能， 这给 Redis 带来了无数新的可能性。</p>`,r:{minutes:18.67,words:5600},y:"a",t:"Redis进阶 - 版本特性: Redis4.0、5.0、6.0特性整理"},[":md"]],["v-60ddbe48","/db/nosql-redis/db-redis-y-monitor.html",{d:16562016e5,l:"2022年6月26日",c:["NoSQL Redis"],g:["NoSQL Redis"],e:`<h1> Redis进阶 - 运维监控：Redis的监控详解</h1>
<blockquote>
<p>Redis实战中包含开发，集群 和 运维，Redis用的好不好，如何让它更好，这是运维要做的；本文主要在 <strong>Redis自身状态及命令</strong>，<strong>可视化监控工具</strong>，以及<strong>Redis监控体系</strong>等方面帮助你构建对redis运维/监控体系的认知，它是性能优化的前提。</p>
</blockquote>
<h2> 如何理解Redis监控呢</h2>
<blockquote>
<p>Redis运维和监控的意义不言而喻，我认为主要从如下三方面去构建认知体系:</p>
</blockquote>`,r:{minutes:29.98,words:8995},y:"a",t:"Redis进阶 - 运维监控：Redis的监控详解"},[":md"]],["v-469a0776","/db/nosql-redis/db-redis-y-mt-1.html",{d:16564608e5,l:"2022年6月29日",c:["NoSQL Redis"],g:["NoSQL Redis"],e:`<h1> Redis大厂经验 - 美团：Redis 高负载下的中断优化</h1>
<blockquote>
<p>本文是美团技术团队在Redis日访问量到达万亿次级别时出现网卡丢包问题的优化。文章中涉及很多会涉及内核相关的知识，不了解的可以简单看下，但是分析的思路和一步一步解决问题的方式是值得很多开发者学习的。</p>
</blockquote>
<h2> 背景</h2>
<p>2017年年初以来，随着Redis产品的用户量越来越大，接入服务越来越多，再加上美团点评Memcache和Redis两套缓存融合，Redis服务端的总体请求量从年初最开始日访问量百亿次级别上涨到高峰时段的万亿次级别，给运维和架构团队都带来了极大的挑战。</p>`,r:{minutes:27.74,words:8321},y:"a",t:"Redis大厂经验 - 美团：Redis 高负载下的中断优化"},[":md"]],["v-7914a5ba","/db/nosql-redis/db-redis-y-weibo.html",{d:16563744e5,l:"2022年6月28日",c:["NoSQL Redis"],g:["NoSQL Redis"],e:`<h1> Redis大厂经验 - 微博：万亿级日访问量下，Redis在微博的9年优化历程</h1>
<blockquote>
<p>再分享一篇微博使用redis的经验的文章，因为Redis在微博内部分布在各个应用场景，比如像现在春晚必争的“红包飞”活动，还有像粉丝数、用户数、阅读数、转评赞、评论盖楼、广告推荐、负反馈、音乐榜单等等都有用到Redis；我们可以通过大厂使用redis的经验来强化对redis使用上的认知。</p>
</blockquote>
<h2> Redis在微博的应用场景</h2>
<blockquote>
<p>Redis在微博内部分布在各个应用场景，比如像现在春晚必争的“红包飞”活动，还有像粉丝数、用户数、阅读数、转评赞、评论盖楼、广告推荐、负反馈、音乐榜单等等都有用到Redis。</p>
</blockquote>`,r:{minutes:18.21,words:5462},y:"a",t:"Redis大厂经验 - 微博：万亿级日访问量下，Redis在微博的9年优化历程"},[":md"]],["v-59725a96","/db/nosql-redis/db-redis-z-mianshi.html",{d:16565472e5,l:"2022年6月30日",c:["NoSQL Redis"],g:["NoSQL Redis"],e:`<h1> Redis面试 - redis问题总结</h1>
<blockquote>
<p>Redis 面试会有哪些问题呢？或者学完整个体系，如何去用问题测试自己的理解呢？</p>
</blockquote>
<h2> 常规问题</h2>
<ul>
<li>什么是redis，为什么要使用它</li>
<li>redis一般有哪些使用场景</li>
<li>redis为什么快</li>
</ul>
<h2> 数据类型和数据结构</h2>
<ul>
<li>redis有哪些数据类型</li>
<li>redis数据类型有哪些命令</li>
<li>谈谈redis的对象机制（redisObject)</li>
<li>redis数据类型有哪些底层数据结构</li>
<li>为什么要设计sds？</li>
<li>一个字符串类型的值能存储最大容量是多少？512M</li>
<li>为什么会设计Stream</li>
<li>Stream用在什么样场景</li>
<li>消息ID的设计是否考虑了时间回拨的问题</li>
</ul>`,r:{minutes:4.49,words:1348},y:"a",t:"Redis面试 - redis问题总结"},[":md"]],["v-0189ba9b","/db/sql/sql-db-howitworks.html",{d:16529184e5,l:"2022年5月19日",c:["数据库原理"],g:["数据库原理"],e:`<h1> SQL DB - 关系型数据库是如何工作的</h1>
<blockquote>
<p>很多人在学习数据库时都是孤立的学习知识点，这样是很难将所有知识点串起来深入理解；强烈推荐你学习两篇文章：<a href="https://dsf.berkeley.edu/papers/fntdb07-architecture.pdf" target="_blank" rel="noopener noreferrer">Architecture of a Database System在新窗口打开</a>以及<a href="http://coding-geek.com/how-databases-work" target="_blank" rel="noopener noreferrer">How does a relational database work在新窗口打开</a>；本文主要在第二篇基础上翻译并梳理，如果你英文不好的话，可以通过本文帮助你构筑数据库体系的基础。再啰嗦下，<strong>这篇文章关注的不是知识点，而是知识点之间的关联</strong>。</p>
</blockquote>`,r:{minutes:55.4,words:16621},y:"a",t:"SQL DB - 关系型数据库是如何工作的"},[":md"]],["v-ce8499bc","/db/sql/sql-db-theory-concept.html",{d:16530048e5,l:"2022年5月20日",c:["数据库原理"],g:["数据库原理"],e:`<h1> SQL DB - 关系型数据库设计理论</h1>
<blockquote>
<p>在上文了解数据库如何工作后，本节介绍如何将一个<strong>关系模型</strong>（基于表的数据模型）合理的转化为<strong>数据表</strong>和<strong>关系表</strong>，以及确定<strong>主外键</strong>的。这便是数据库设计理论基础，包括术语，函数依赖，范式等理论基础。</p>
</blockquote>
<h2> 重要的术语</h2>
<blockquote>
<p>关系模型是一种基于表的数据模型，以下为关系学生信息，该表有很多不足之处，本文研究内容就是如何改进它：</p>
</blockquote>`,r:{minutes:6.03,words:1810},y:"a",t:"SQL DB - 关系型数据库设计理论"},[":md"]],["v-294c800a","/db/sql/sql-db-theory-design.html",{d:16530912e5,l:"2022年5月21日",c:["数据库原理"],g:["数据库原理"],e:`<h1> SQL DB - 关系型数据库设计流程</h1>
<blockquote>
<p>在上文知道如何设计表和健后，让我们再看看整个的<strong>数据库设计的标准流程</strong>吧，主要包括<code>需求分析</code>, <code>概念结构设计</code>, <code>逻辑结构设计</code> , <code>物理设计</code>, <code>实施阶段</code>和<code>运行和维护阶段</code>这6个阶段，其中最重要的是<code>逻辑结构设计</code>。</p>
</blockquote>
<h2> 规范设计的6个阶段</h2>
<blockquote>
<p>按照规范设计的方法，考虑数据库及其应用系统开发全过程，将数据库设计分为以下6个阶段</p>
</blockquote>`,r:{minutes:17.29,words:5188},y:"a",t:"SQL DB - 关系型数据库设计流程"},[":md"]],["v-4d8be846","/db/sql/sql-db-theory.html",{d:16531776e5,l:"2022年5月22日",c:["数据库原理"],g:["数据库原理"],e:`<h1> SQL DB - 数据库系统核心知识点</h1>
<blockquote>
<p>基于上篇数据库如何工作的基础之上，我们再来梳理下数据库系统中有哪些重要的知识点，包括：事务，并发一致性，封锁，隔离级别，多版本并发控制等。</p>
</blockquote>
<h2> 一、事务</h2>
<h3> 概念</h3>
<p>事务指的是满足 ACID 特性的一组操作，可以通过 Commit 提交一个事务，也可以使用 Rollback 进行回滚。</p>
<figure><img src="https://www.pdai.tech/images/pics/185b9c49-4c13-4241-a848-fbff85c03a64.png" alt="image" tabindex="0" loading="lazy"><figcaption>image</figcaption></figure>`,r:{minutes:12.69,words:3807},y:"a",t:"SQL DB - 数据库系统核心知识点"},[":md"]],["v-b520a2fa","/db/sql/sql-db.html",{d:1652832e6,l:"2022年5月18日",c:["数据库原理"],g:["数据库原理"],e:`<h1> ♥数据库基础和SQL知识体系详解♥</h1>
<blockquote>
<p>本系列主要介绍数据库相关的知识体系。</p>
</blockquote>
<h2> 知识体系结构</h2>
<figure><img src="https://www.pdai.tech/images/db/db.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>
<h3> 数据库基础与理论</h3>
<p><em>相关文章</em></p>
<blockquote>
<p><strong>A. 了解数据库基础和理论知识</strong>：在学习数据库之前，不要一上来就是SQL语句；这里建议从数据结构开始切入到数据库，然后再理解数据库是如何工作的，紧接着理解数据库系统的原理知识点和相关知识体系。</p>
</blockquote>`,r:{minutes:2.5,words:751},y:"a",t:"♥数据库基础和SQL知识体系详解♥"},[":md"]],["v-479dfaa4","/db/sql-lan/sql-lan-leetcode.html",{d:16533504e5,l:"2022年5月24日",c:["SQL语言"],g:["SQL语言"],e:`<h1> SQL语言 - SQL题目进阶</h1>
<blockquote>
<p>接下来，通过Leetcode上的SQL题目进行进阶吧。</p>
</blockquote>
<h2> 相关题目</h2>
<h3> 595. Big Countries</h3>
<p><a href="https://leetcode.com/problems/big-countries/description/" target="_blank" rel="noopener noreferrer">https://leetcode.com/problems/big-countries/description/</a></p>`,r:{minutes:6.76,words:2029},y:"a",t:"SQL语言 - SQL题目进阶"},[":md"]],["v-ed93b2c8","/db/sql-lan/sql-lan-optimize.html",{d:16534368e5,l:"2022年5月25日",c:["SQL语言"],g:["SQL语言"],e:`<h1> SQL语言 - SQL语句优化</h1>
<blockquote>
<p>最后，再总结一些SQL语句的优化建议。</p>
</blockquote>
<h2> 负向查询不能使用索引</h2>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">select</span> name <span class="token keyword">from</span> <span class="token keyword">user</span> <span class="token keyword">where</span> id <span class="token operator">not</span> <span class="token operator">in</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,r:{minutes:1.58,words:474},y:"a",t:"SQL语言 - SQL语句优化"},[":md"]],["v-0ca05f63","/db/sql-lan/sql-lan-pratice.html",{d:1653264e6,l:"2022年5月23日",c:["SQL语言"],g:["SQL语言"],e:`<h1> SQL语言 - SQL语句练习</h1>
<blockquote>
<p>在上文学习了SQL的基本语法以后，本文将通过最经典的“教师-学生-成绩”表来帮助你练习SQL。</p>
</blockquote>
<h2> 构建如下表结构</h2>
<blockquote>
<p>还有一个Grade表，在如下的练习中体现</p>
</blockquote>
<figure><img src="https://www.pdai.tech/images/mysql/db-sql-learn-1.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>`,r:{minutes:8.5,words:2551},y:"a",t:"SQL语言 - SQL语句练习"},[":md"]],["v-3ed84ea8","/db/sql-lan/sql-lan.html",{d:16531776e5,l:"2022年5月22日",c:["SQL语言"],g:["SQL语言"],e:`<h1> SQL语言 - SQL语法基础</h1>
<blockquote>
<p>本文包含了所有SQL语言的基础语法，并用例子的方式向你展示。</p>
</blockquote>
<h2> 基础</h2>
<p>模式定义了数据如何存储、存储什么样的数据以及数据如何分解等信息，数据库和表都有模式。</p>
<p>主键的值不允许修改，也不允许复用(不能使用已经删除的主键值赋给新数据行的主键)。</p>
<p>SQL(Structured Query Language)，标准 SQL 由 ANSI 标准委员会管理，从而称为 ANSI SQL。各个 DBMS 都有自己的实现，如 PL/SQL、Transact-SQL 等。</p>`,r:{minutes:13.36,words:4009},y:"a",t:"SQL语言 - SQL语法基础"},[":md"]],["v-6b7f2f62","/db/sql-mysql/sql-mysql-b-tree.html",{d:16537824e5,l:"2022年5月29日",c:["SQL MySQL"],g:["SQL MySQL"],e:`<h1> MySQL - 索引(B+树)</h1>
<p><a href="https://www.cnblogs.com/xiaoxi/p/6894610.html" target="_blank" rel="noopener noreferrer">https://www.cnblogs.com/xiaoxi/p/6894610.html</a></p>
<h3> B+ Tree 原理</h3>
<h4> 1. 数据结构</h4>
<p>B Tree 指的是 Balance Tree，也就是平衡树。平衡树是一颗查找树，并且所有叶子节点位于同一层。</p>
<p>B+ Tree 是基于 B Tree 和叶子节点顺序访问指针进行实现，它具有 B Tree 的平衡性，并且通过顺序访问指针来提高区间查询的性能。</p>`,r:{minutes:6.85,words:2055},y:"a",t:"MySQL - 索引(B+树)"},[":md"]],["v-52116296","/db/sql-mysql/sql-mysql-devide.html",{d:16539552e5,l:"2022年5月31日",c:["SQL MySQL"],g:["SQL MySQL"],e:`<h1> MySQL - 分表分库</h1>
<h2> 水平切分</h2>
<p>水平切分又称为 Sharding，它是将同一个表中的记录拆分到多个结构相同的表中。</p>
<p>当一个表的数据不断增多时，Sharding 是必然的选择，它可以将数据分布到集群的不同节点上，从而缓存单个数据库的压力。</p>
<figure><img src="https://www.pdai.tech/images/mysql/63c2909f-0c5f-496f-9fe5-ee9176b31aba.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>`,r:{minutes:1.42,words:426},y:"a",t:"MySQL - 分表分库"},[":md"]],["v-42f2422e","/db/sql-mysql/sql-mysql-engine.html",{d:1653696e6,l:"2022年5月28日",c:["SQL MySQL"],g:["SQL MySQL"],e:`<h1> MySQL - 存储引擎</h1>
<blockquote>
<p>本文主要介绍MySQL中的存储引擎。</p>
</blockquote>
<h2> InnoDB</h2>
<p>是 MySQL 默认的事务型存储引擎，<strong>只有在需要它不支持的特性时，才考虑使用其它存储引擎</strong>。</p>
<p>实现了四个标准的隔离级别，默认级别是可重复读(REPEATABLE READ)。在可重复读隔离级别下，通过多版本并发控制(MVCC)+ 间隙锁(Next-Key Locking)防止幻影读。</p>
<p>主索引是聚簇索引，在索引中保存了数据，从而避免直接读取磁盘，因此对查询性能有很大的提升。</p>`,r:{minutes:2.34,words:701},y:"a",t:"MySQL - 存储引擎"},[":md"]],["v-a73fe49c","/db/sql-mysql/sql-mysql-execute.html",{d:16542144e5,l:"2022年6月3日",c:["SQL MySQL"],g:["SQL MySQL"],e:`<h1> MySQL - 一条 SQL 的执行过程详解</h1>
<blockquote>
<p>天天和数据库打交道，一天能写上几十条 SQL 语句，但你知道我们的系统是如何和数据库交互的吗？MySQL 如何帮我们存储数据、又是如何帮我们管理事务？....是不是感觉真的除了写几个 「select * from dual」外基本脑子一片空白？这篇文章就将带你走进 MySQL 的世界，让你彻底了解系统到底是如何和 MySQL 交互的，MySQL 在接受到我们发送的 SQL 语句时又分别做了哪些事情。</p>
</blockquote>
<h2> 前言</h2>
<p>天天和数据库打交道，一天能写上几十条 SQL 语句，但你知道我们的系统是如何和数据库交互的吗？MySQL 如何帮我们存储数据、又是如何帮我们管理事务？....是不是感觉真的除了写几个 「select * from dual」外基本脑子一片空白？这篇文章就将带你走进 MySQL 的世界，让你彻底了解系统到底是如何和 MySQL 交互的，MySQL 在接受到我们发送的 SQL 语句时又分别做了哪些事情。</p>`,r:{minutes:20.76,words:6229},y:"a",t:"MySQL - 一条 SQL 的执行过程详解"},[":md"]],["v-402977d4","/db/sql-mysql/sql-mysql-index-improve-mt.html",{d:16543872e5,l:"2022年6月5日",c:["SQL MySQL"],g:["SQL MySQL"],e:`<h1> 大厂实践 - 美团: MySQL索引原理及慢查询优化</h1>
<blockquote>
<p>目前常用的 SQL 优化方式包括但不限于：业务层优化、SQL逻辑优化、索引优化等。其中索引优化通常通过调整索引或新增索引从而达到 SQL 优化的目的，索引优化往往可以在短时间内产生非常巨大的效果。本文旨在以开发工程师的角度来解释数据库索引的原理和如何优化慢查询。</p>
</blockquote>
<h2> 背景</h2>
<p>MySQL凭借着出色的性能、低廉的成本、丰富的资源，已经成为绝大多数互联网公司的首选关系型数据库。虽然性能出色，但所谓“好马配好鞍”，如何能够更好的使用它，已经成为开发工程师的必修课，我们经常会从职位描述上看到诸如“精通MySQL”、“SQL语句优化”、“了解数据库原理”等要求。我们知道一般的应用系统，读写比例在10:1左右，而且插入操作和一般的更新操作很少出现性能问题，遇到最多的，也是最容易出问题的，还是一些复杂的查询操作，所以查询语句的优化显然是重中之重。</p>`,r:{minutes:23.27,words:6982},y:"a",t:"大厂实践 - 美团: MySQL索引原理及慢查询优化"},[":md"]],["v-58dc037c","/db/sql-mysql/sql-mysql-mvcc.html",{d:1654128e6,l:"2022年6月2日",c:["SQL MySQL"],g:["SQL MySQL"],e:`<h1> MySQL - MySQL InnoDB的MVCC实现机制</h1>
<blockquote>
<p>MySQL 中InnoDB中实现了事务（多版本并发控制MVCC+锁）， 其中通过MVCC解决隔离性问题。具体而言，<strong>MVCC就是为了实现读-写冲突不加锁</strong>，而这个读指的就是<strong>快照读</strong>, 而非当前读，当<strong>前读实际上是一种加锁的操作，是悲观锁的实现</strong>; 这里转一篇文章带你理解InnoDB中MVCC的实现机制。</p>
</blockquote>
<h2> 前提概要</h2>
<h3> 什么是MVCC?</h3>`,r:{minutes:15.75,words:4724},y:"a",t:"MySQL - MySQL InnoDB的MVCC实现机制"},[":md"]],["v-089cd992","/db/sql-mysql/sql-mysql-overview.html",{d:16535232e5,l:"2022年5月26日",c:["SQL MySQL"],g:["SQL MySQL"],e:`<h1> ♥MySQL知识体系详解♥</h1>
<blockquote>
<p>本系列主要对MySQL知识体系梳理。</p>
</blockquote>
<blockquote>
<p>提示</p>
<p>MySQL这个系列还没有完善的整理，后续有时间会重新梳理下。</p>
</blockquote>
<h2> 知识体系</h2>
<p><em>相关文章</em></p>
<blockquote>
<p><strong>C. 掌握MySQL数据库</strong>：在理解了SQL语言后，开始进阶MySQL相关的知识点吧（在开始前，建议你完整看一本MySQl相关的书，作为你的知识体系基础）；这里不会讲如何安装MySQL或者如何使用，因为这是容易的，而是会关注一些有助于我们构建MySQL相关知识体系的知识点等。</p>
</blockquote>`,r:{minutes:4.16,words:1247},y:"a",t:"♥MySQL知识体系详解♥"},[":md"]],["v-363dead7","/db/sql-mysql/sql-mysql-performance.html",{d:16538688e5,l:"2022年5月30日",c:["SQL MySQL"],g:["SQL MySQL"],e:`<h1> MySQL - 性能优化</h1>
<h2> 使用 Explain 进行分析</h2>
<p>Explain 用来分析 SELECT 查询语句，开发人员可以通过分析 Explain 结果来优化查询语句。</p>
<p>比较重要的字段有:</p>
<ul>
<li>select_type : 查询类型，有简单查询、联合查询、子查询等</li>
<li>key : 使用的索引</li>
<li>rows : 扫描的行数</li>
</ul>
<h2> 优化数据访问</h2>
<h3> 1. 减少请求的数据量</h3>
<ul>
<li>只返回必要的列: 最好不要使用 SELECT * 语句。</li>
<li>只返回必要的行: 使用 LIMIT 语句来限制返回的数据。</li>
<li>缓存重复查询的数据: 使用缓存可以避免在数据库中进行查询，特别在要查询的数据经常被重复查询时，缓存带来的查询性能提升将会是非常明显的。</li>
</ul>`,r:{minutes:2.09,words:628},y:"a",t:"MySQL - 性能优化"},[":md"]],["v-05b20410","/db/sql-mysql/sql-mysql-slave.html",{d:16540416e5,l:"2022年6月1日",c:["SQL MySQL"],g:["SQL MySQL"],e:`<h1> MySQL - 主从复制与读写分离</h1>
<h2> 主从复制</h2>
<p>主要涉及三个线程: binlog 线程、I/O 线程和 SQL 线程。</p>
<ul>
<li><strong>binlog 线程</strong> : 负责将主服务器上的数据更改写入二进制日志中。</li>
<li><strong>I/O 线程</strong> : 负责从主服务器上读取二进制日志，并写入从服务器的中继日志中。</li>
<li><strong>SQL 线程</strong> : 负责读取中继日志并重放其中的 SQL 语句。</li>
</ul>
<figure><img src="https://www.pdai.tech/images/mysql/master-slave.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>`,r:{minutes:.92,words:275},y:"a",t:"MySQL - 主从复制与读写分离"},[":md"]],["v-e35854d0","/db/sql-mysql/sql-mysql-sql-advisor-mt.html",{d:16544736e5,l:"2022年6月6日",c:["SQL MySQL"],g:["SQL MySQL"],e:`<h1> 大厂实践 - 美团: SQL优化工具SQLAdvisor开源</h1>
<blockquote>
<p>正如你在前文中看到的可以通过调整索引或新增索引的索引优化方式，从而达到 SQL 优化的目的。如果能够将索引优化转化成工具化、标准化的流程，减少人工介入的工作量，无疑会大大提高DBA的工作效率。本文主要介绍SQL优化的开源工具SQLAdvisor。</p>
</blockquote>
<h2> 背景</h2>
<p>在数据库运维过程中，优化 SQL 是 DBA 团队的日常任务。例行 SQL 优化，不仅可以提升程序性能，还能够降低线上故障的概率。</p>
<p>目前常用的 SQL 优化方式包括但不限于：业务层优化、SQL逻辑优化、索引优化等。其中索引优化通常通过调整索引或新增索引从而达到 SQL 优化的目的。索引优化往往可以在短时间内产生非常巨大的效果。如果能够将索引优化转化成工具化、标准化的流程，减少人工介入的工作量，无疑会大大提高DBA的工作效率。</p>`,r:{minutes:6.94,words:2083},y:"a",t:"大厂实践 - 美团: SQL优化工具SQLAdvisor开源"},[":md"]],["v-af64b6d8","/db/sql-mysql/sql-mysql-sql-costmodel-mt.html",{d:165456e7,l:"2022年6月7日",c:["SQL MySQL"],g:["SQL MySQL"],e:`<h1> 大厂实践 - 美团: 基于代价的慢查询优化建议</h1>
<blockquote>
<p>前文我们介绍了优化慢查询最直接有效的方法就是选用一个查询效率高的索引。关于高效率的索引推荐，主要在日常工作中，基于经验规则的推荐随处可见，对于简单的SQL，如<code>select * from sync_test1 where name like 'Bobby%'</code>，直接添加索引IX(name) 就可以取得不错的效果；但对于稍微复杂点的SQL，如<code>select * from sync_test1 where name like 'Bobby%' and dt &gt; '2021-07-06'</code>，到底选择IX(name)、IX(dt)、IX(dt,name) 还是IX(name,dt)，该方法也无法给出准确的回答。更别说像多表Join、子查询这样复杂的场景了。所以采用基于代价的推荐来解决该问题会更加普适，因为基于代价的方法使用了和数据库优化器相同的方式，去量化评估所有的可能性，选出的是执行SQL耗费代价最小的索引。</p>
</blockquote>`,r:{minutes:22.01,words:6602},y:"a",t:"大厂实践 - 美团: 基于代价的慢查询优化建议"},[":md"]],["v-0ede1ea6","/db/sql-mysql/sql-mysql-sql-parser.html",{d:16543008e5,l:"2022年6月4日",c:["SQL MySQL"],g:["SQL MySQL"],e:`<h1> MySQL - MySQL中SQL是如何解析的</h1>
<blockquote>
<p>前文我们分享了一篇文章学习一条SQL是如何在数据库中执行的，其中有一个阶段是SQL的解析。这个阶段对于更全面的SQL优化功能；多维度的慢查询分析；辅助故障分析等有很大帮助。本文主要介绍一篇美团技术团队关于SQL解析和应用的文章，希望能给一些启示。</p>
</blockquote>
<h2> 背景</h2>
<p>数据库作为核心的基础组件，是需要重点保护的对象。任何一个线上的不慎操作，都有可能给数据库带来严重的故障，从而给业务造成巨大的损失。为了避免这种损失，一般会在管理上下功夫。比如为研发人员制定数据库开发规范；新上线的SQL，需要DBA进行审核；维护操作需要经过领导审批等等。而且如果希望能够有效地管理这些措施，需要有效的数据库培训，还需要DBA细心的进行SQL审核。很多中小型创业公司，可以通过设定规范、进行培训、完善审核流程来管理数据库。</p>`,r:{minutes:12.64,words:3791},y:"a",t:"MySQL - MySQL中SQL是如何解析的"},[":md"]],["v-1aacba26","/db/sql-mysql/sql-mysql-theory.html",{d:16536096e5,l:"2022年5月27日",c:["SQL MySQL"],g:["SQL MySQL"],e:`<h1> MySQL - 数据类型</h1>
<blockquote>
<p>本文主要整理MySQL中数据字段类型。</p>
</blockquote>
<h2> 字段类型</h2>
<h3> 整型</h3>
<p>TINYINT, SMALLINT, MEDIUMINT, INT, BIGINT 分别使用 8, 16, 24, 32, 64 位存储空间，一般情况下越小的列越好。</p>
<p>INT(11) 中的数字只是规定了交互工具显示字符的个数，对于存储和计算来说是没有意义的。</p>
<h3> 浮点数</h3>
<p>FLOAT 和 DOUBLE 为浮点类型，DECIMAL 为高精度小数类型。CPU 原生支持浮点运算，但是不支持 DECIMAl 类型的计算，因此 DECIMAL 的计算比浮点类型需要更高的代价。</p>`,r:{minutes:5.65,words:1695},y:"a",t:"MySQL - 数据类型"},[":md"]],["v-593b73d8","/db/sql-mysql/sql-mysql-xunjian-mt.html",{d:16546464e5,l:"2022年6月8日",c:["SQL MySQL"],g:["SQL MySQL"],e:`<h1> 大厂实践 - 美团: MySQL数据库巡检系统的设计与应用</h1>
<blockquote>
<p>巡检工作是保障系统平稳有效运行必不可少的一个环节，目的是能及时发现系统中存在的隐患。我们生活中也随处可见各种巡检，比如电力巡检、消防检查等，正是这些巡检工作，我们才能在稳定的环境下进行工作、生活。巡检对于数据库或者其他IT系统来说也同样至关重要，特别是在降低风险、提高服务稳定性方面起到了非常关键作用。本文介绍了美团MySQL数据库巡检系统的框架和巡检内容，希望能够帮助大家了解什么是数据库巡检，美团的巡检系统架构是如何设计的，以及巡检系统是如何保障MySQL服务稳定运行的。</p>
</blockquote>`,r:{minutes:9.43,words:2829},y:"a",t:"大厂实践 - 美团: MySQL数据库巡检系统的设计与应用"},[":md"]],["v-6d3be62a","/db/sql-oracle/sql-oracle-overview.html",{d:1690160698e3,e:`<h1> ♥Oracle知识体系详解♥</h1>
`,r:{minutes:.02,words:7},y:"a",t:"♥Oracle知识体系详解♥"},[":md"]],["v-38bdd5fc","/java/basic/java-advanced-spi.html",{d:16444512e5,l:"2022年2月10日",c:["Java 基础"],g:["Java 基础"],e:`<h1> SPI机制详解</h1>
<blockquote>
<p>SPI（Service Provider Interface），是JDK内置的一种 服务提供发现机制，可以用来启用框架扩展和替换组件，主要是被框架的开发人员使用。</p>
</blockquote>
<p>SPI（Service Provider Interface），是JDK内置的一种 服务提供发现机制，可以用来启用框架扩展和替换组件，主要是被框架的开发人员使用，比如java.sql.Driver接口，其他不同厂商可以针对同一接口做出不同的实现，MySQL和PostgreSQL都有不同的实现提供给用户，而Java的SPI机制可以为某个接口寻找服务实现。Java中SPI机制主要思想是将装配的控制权移到程序之外，在模块化设计中这个机制尤其重要，其核心思想就是 <strong>解耦</strong>。</p>`,r:{minutes:20.14,words:6041},y:"a",t:"SPI机制详解"},[":md"]],["v-3c09b854","/java/basic/java-basic-lan-basic.html",{d:16439328e5,l:"2022年2月4日",c:["Java 基础"],g:["Java 基础"],e:`<h1> 知识点</h1>
<blockquote>
<p>本文主要对Java基础知识点进行总结。</p>
</blockquote>
<h2> 数据类型</h2>
<h3> 包装类型</h3>
<p>八个基本类型:</p>
<ul>
<li>boolean/1</li>
<li>byte/8</li>
<li>char/16</li>
<li>short/16</li>
<li>int/32</li>
<li>float/32</li>
<li>long/64</li>
<li>double/64</li>
</ul>
<p>基本类型都有对应的包装类型，基本类型与其对应的包装类型之间的赋值使用自动装箱与拆箱完成。</p>`,r:{minutes:25.29,words:7587},y:"a",t:"知识点"},[":md"]],["v-d23382d2","/java/basic/java-basic-lan-sum.html",{d:16440192e5,l:"2022年2月5日",c:["Java 基础"],g:["Java 基础"],e:`<h1> 图谱 &amp; Q/A</h1>
<blockquote>
<p>本文主要对Java基础知识体系小结，同时结合一些Q&amp;A进行理解。</p>
</blockquote>
<h2> 参考文档</h2>
<ul>
<li>Thinking in Java (Java 编程思想) Gitbook中文文档 <a href="https://java.quanke.name/" target="_blank" rel="noopener noreferrer">https://java.quanke.name/</a></li>
<li>Thinking in Java (Java 编程思想) Github <a href="https://github.com/quanke/think-in-java" target="_blank" rel="noopener noreferrer">https://github.com/quanke/think-in-java</a></li>
<li>Thinking in Java (Java 编程思想) Gitbook2 <a href="https://www.gitbook.com/book/wizardforcel/thinking-in-java/details" target="_blank" rel="noopener noreferrer">https://www.gitbook.com/book/wizardforcel/thinking-in-java/details</a></li>
</ul>`,r:{minutes:18.42,words:5527},y:"a",t:"图谱 & Q/A"},[":md"]],["v-29e9d384","/java/basic/java-basic-oop.html",{d:16438464e5,l:"2022年2月3日",c:["Java 基础"],g:["Java 基础"],e:`<h1> 面向对象</h1>
<blockquote>
<p>本文主要介绍Java OOP 面向对象基础和相关类图。</p>
</blockquote>
<h2> 三大特性</h2>
<h3> 封装</h3>
<p>利用抽象数据类型将数据和基于数据的操作封装在一起，使其构成一个不可分割的独立实体。数据被保护在抽象数据类型的内部，尽可能地隐藏内部的细节，只保留一些对外接口使之与外部发生联系。用户无需知道对象内部的细节，但可以通过对象对外提供的接口来访问该对象。</p>
<p>优点:</p>
<ul>
<li>减少耦合: 可以独立地开发、测试、优化、使用、理解和修改</li>
<li>减轻维护的负担: 可以更容易被程序员理解，并且在调试的时候可以不影响其他模块</li>
<li>有效地调节性能: 可以通过剖析确定哪些模块影响了系统的性能</li>
<li>提高软件的可重用性</li>
<li>降低了构建大型系统的风险: 即使整个系统不可用，但是这些独立的模块却有可能是可用的</li>
</ul>`,r:{minutes:4.97,words:1490},y:"a",t:"面向对象"},[":md"]],["v-291e8560","/java/basic/java-basic-x-annotation.html",{d:1644192e6,l:"2022年2月7日",c:["Java 基础"],g:["Java 基础"],e:`<h1> 注解机制详解</h1>
<blockquote>
<p>注解是JDK1.5版本开始引入的一个特性，用于对代码进行说明，可以对包、类、接口、字段、方法参数、局部变量等进行注解。它是框架学习和设计者必须掌握的基础。</p>
</blockquote>
<h2> 注解基础</h2>
<p>注解是JDK1.5版本开始引入的一个特性，用于对代码进行说明，可以对包、类、接口、字段、方法参数、局部变量等进行注解。它主要的作用有以下四方面：</p>
<ul>
<li>生成文档，通过代码里标识的元数据生成javadoc文档。</li>
<li>编译检查，通过代码里标识的元数据让编译器在编译期间进行检查验证。</li>
<li>编译时动态处理，编译时通过代码里标识的元数据动态处理，例如动态生成代码。</li>
<li>运行时动态处理，运行时通过代码里标识的元数据动态处理，例如使用反射注入实例。</li>
</ul>`,r:{minutes:17.93,words:5380},y:"a",t:"注解机制详解"},[":md"]],["v-63ce1cd4","/java/basic/java-basic-x-exception.html",{d:16442784e5,l:"2022年2月8日",c:["Java 基础"],g:["Java 基础"],e:`<h1> 异常机制详解</h1>
<blockquote>
<p>Java异常是Java提供的一种识别及响应错误的一致性机制，java异常机制可以使程序中异常处理代码和正常业务代码分离，保证程序代码更加优雅，并提高程序健壮性。本文综合多篇文章后，总结了Java 异常的相关知识，希望可以提升你对Java中异常的认知效率。</p>
</blockquote>
<h2> 异常的层次结构</h2>
<p>异常指不期而至的各种状况，如：文件找不到、网络连接失败、非法参数等。异常是一个事件，它发生在程序运行期间，干扰了正常的指令流程。Java通 过API中Throwable类的众多子类描述各种不同的异常。因而，Java异常都是对象，是Throwable子类的实例，描述了出现在一段编码中的 错误条件。当条件生成时，错误将引发异常。</p>`,r:{minutes:29.32,words:8795},y:"a",t:"异常机制详解"},[":md"]],["v-189f4acc","/java/basic/java-basic-x-generic.html",{d:16441056e5,l:"2022年2月6日",c:["Java 基础"],g:["Java 基础"],e:`<h1> 泛型机制详解</h1>
<blockquote>
<p>Java泛型这个特性是从JDK 1.5才开始加入的，因此为了兼容之前的版本，Java泛型的实现采取了“<strong>伪泛型</strong>”的策略，即Java在语法上支持泛型，但是在编译阶段会进行所谓的“<strong>类型擦除</strong>”（Type Erasure），将所有的泛型表示（尖括号中的内容）都替换为具体的类型（其对应的原生态类型），就像完全没有泛型一样。本文综合多篇文章后，总结了Java 泛型的相关知识，希望可以提升你对Java中泛型的认知效率。</p>
</blockquote>
<h2> 为什么会引入泛型</h2>`,r:{minutes:31.73,words:9519},y:"a",t:"泛型机制详解"},[":md"]],["v-58387c38","/java/basic/java-basic-x-reflection.html",{d:16443648e5,l:"2022年2月9日",c:["Java 基础"],g:["Java 基础"],e:`<h1> 反射机制详解</h1>
<blockquote>
<p>JAVA反射机制是在运行状态中，对于任意一个类，都能够知道这个类的所有属性和方法；对于任意一个对象，都能够调用它的任意一个方法和属性；这种动态获取的信息以及动态调用对象的方法的功能称为java语言的反射机制。Java反射机制在框架设计中极为广泛，需要深入理解。本文综合多篇文章后，总结了Java 反射的相关知识，希望可以提升你对Java中反射的认知效率。</p>
</blockquote>
<h2> 反射基础</h2>
<p>RTTI（Run-Time Type Identification）运行时类型识别。在《Thinking in Java》一书第十四章中有提到，其作用是在运行时识别一个对象的类型和类的信息。主要有两种方式：一种是“传统的”RTTI，它假定我们在编译时已经知道了所有的类型；另一种是“反射”机制，它允许我们在运行时发现和使用类的信息。</p>`,r:{minutes:33.8,words:10141},y:"a",t:"反射机制详解"},[":md"]],["v-44ff8903","/java/collection/java-collection-ArrayList.html",{d:1644624e6,l:"2022年2月12日",c:["Java 集合"],g:["Java 集合"],e:`<h1> Collection - ArrayList 源码解析</h1>
<blockquote>
<p>本文主要对Collection - ArrayList进行源码解析。</p>
</blockquote>
<h2> 概述</h2>
<p><em>ArrayList</em>实现了<em>List</em>接口，是顺序容器，即元素存放的数据与放进去的顺序相同，允许放入<code>null</code>元素，底层通过<strong>数组实现</strong>。除该类未实现同步外，其余跟<em>Vector</em>大致相同。每个<em>ArrayList</em>都有一个容量(capacity)，表示底层数组的实际大小，容器内存储元素的个数不能多于当前容量。当向容器中添加元素时，如果容量不足，容器会自动增大底层数组的大小。前面已经提过，Java泛型只是编译器提供的语法糖，所以这里的数组是一个Object数组，以便能够容纳任何类型的对象。</p>`,r:{minutes:8.67,words:2601},y:"a",t:"Collection - ArrayList 源码解析"},[":md"]],["v-f973debe","/java/collection/java-collection-LinkedList.html",{d:16447104e5,l:"2022年2月13日",c:["Java 集合"],g:["Java 集合"],e:`<h1> Collection - LinkedList源码解析</h1>
<blockquote>
<p>本文主要对Collection - LinkedList进行源码解析。</p>
</blockquote>
<h2> 概述</h2>
<p><em>LinkedList</em>同时实现了<em>List</em>接口和<em>Deque</em>接口，也就是说它既可以看作一个顺序容器，又可以看作一个队列(<em>Queue</em>)，同时又可以看作一个栈(<em>Stack</em>)。这样看来，<em>LinkedList</em>简直就是个全能冠军。当你需要使用栈或者队列时，可以考虑使用<em>LinkedList</em>，一方面是因为Java官方已经声明不建议使用<em>Stack</em>类，更遗憾的是，Java里根本没有一个叫做<em>Queue</em>的类(它是个接口名字)。关于栈或队列，现在的首选是<em>ArrayDeque</em>，它有着比<em>LinkedList</em>(当作栈或队列使用时)有着更好的性能。</p>`,r:{minutes:12.63,words:3788},y:"a",t:"Collection - LinkedList源码解析"},[":md"]],["v-07c1af0d","/java/collection/java-collection-PriorityQueue.html",{d:16448832e5,l:"2022年2月15日",c:["Java 集合"],g:["Java 集合"],e:`<h1> Collection - PriorityQueue源码解析</h1>
<blockquote>
<p>本文主要对Collection - PriorityQueue进行源码解析。</p>
</blockquote>
<h2> 概述</h2>
<p>前面以Java <em>ArrayDeque</em>为例讲解了<em>Stack</em>和<em>Queue</em>，其实还有一种特殊的队列叫做<em>PriorityQueue</em>，即优先队列。<strong>优先队列的作用是能保证每次取出的元素都是队列中权值最小的</strong>(Java的优先队列每次取最小元素，C++的优先队列每次取最大元素)。这里牵涉到了大小关系，<strong>元素大小的评判可以通过元素本身的自然顺序(*natural ordering*)，也可以通过构造时传入的比较器</strong>(<em>Comparator</em>，类似于C++的仿函数)。</p>`,r:{minutes:5.65,words:1694},y:"a",t:"Collection - PriorityQueue源码解析"},[":md"]],["v-c7a49100","/java/collection/java-collection-Queue_Stack.html",{d:16447968e5,l:"2022年2月14日",c:["Java 集合"],g:["Java 集合"],e:`<h1> Collection - Stack &amp; Queue 源码解析</h1>
<blockquote>
<p>本文主要对Collection - Stack &amp; Queue进行源码解析。</p>
</blockquote>
<h2> Stack &amp; Queue概述</h2>
<p>Java里有一个叫做<em>Stack</em>的类，却没有叫做<em>Queue</em>的类(它是个接口名字)。当需要使用栈时，Java已不推荐使用<em>Stack</em>，而是推荐使用更高效的<em>ArrayDeque</em>；既然<em>Queue</em>只是一个接口，当需要使用队列时也就首选<em>ArrayDeque</em>了(次选是<em>LinkedList</em>)。</p>`,r:{minutes:6.98,words:2095},y:"a",t:"Collection - Stack & Queue 源码解析"},["/java/collection/java-collection-Queue&Stack.html","/java/collection/java-collection-Queue&Stack.md"]],["v-f1a93e4e","/java/collection/java-collection-all.html",{d:16445376e5,l:"2022年2月11日",c:["Java 集合"],g:["Java 集合"],e:`<h1> Collection 类关系图</h1>
<blockquote>
<p>本文主要介绍JDK中Collection和Map相关知识体系，后续章节将对主要对类进行源码解读。</p>
</blockquote>
<h2> 知识体系结构</h2>
<figure><img src="https://www.pdai.tech/images/java_collections_overview.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>
<h2> 介绍</h2>
<p>容器，就是可以容纳其他Java对象的对象。*Java Collections Framework(JCF)*为Java开发者提供了通用的容器，其始于JDK 1.2，优点是:</p>`,r:{minutes:2.24,words:671},y:"a",t:"Collection 类关系图"},[":md"]],["v-77c7f0b5","/java/collection/java-map-HashMap_HashSet.html",{d:16449696e5,l:"2022年2月16日",c:["Java 集合"],g:["Java 集合"],e:`<h1> Map - HashSet &amp; HashMap 源码解析</h1>
<blockquote>
<p>本文主要对Map - HashSet &amp; HashMap进行源码解析。</p>
</blockquote>
<h2> Java7 HashMap</h2>
<h3> 概述</h3>
<p>之所以把<em>HashSet</em>和<em>HashMap</em>放在一起讲解，是因为二者在Java里有着相同的实现，前者仅仅是对后者做了一层包装，也就是说<em>HashSet</em>里面有一个<em>HashMap</em>(适配器模式)。因此本文将重点分析<em>HashMap</em>。</p>`,r:{minutes:10.22,words:3066},y:"a",t:"Map - HashSet & HashMap 源码解析"},["/java/collection/java-map-HashMap&HashSet.html","/java/collection/java-map-HashMap&HashSet.md"]],["v-d718a9b2","/java/collection/java-map-LinkedHashMap_LinkedHashSet.html",{d:1645056e6,l:"2022年2月17日",c:["Java 集合"],g:["Java 集合"],e:`<h1> Map - LinkedHashSet&amp;Map源码解析</h1>
<blockquote>
<p>本文主要对Map - LinkedHashSet&amp;Map 源码解析。</p>
</blockquote>
<h2> Java 7 - LinkedHashSet&amp;Map</h2>
<h3> 总体介绍</h3>
<p>如果你已看过前面关于<em>HashSet</em>和<em>HashMap</em>，以及<em>TreeSet</em>和<em>TreeMap</em>的讲解，一定能够想到本文将要讲解的<em>LinkedHashSet</em>和<em>LinkedHashMap</em>其实也是一回事。<em>LinkedHashSet</em>和<em>LinkedHashMap</em>在Java里也有着相同的实现，前者仅仅是对后者做了一层包装，也就是说<strong>LinkedHashSet里面有一个LinkedHashMap(适配器模式)</strong>。因此本文将重点分析<em>LinkedHashMap</em>。</p>`,r:{minutes:6.15,words:1844},y:"a",t:"Map - LinkedHashSet&Map源码解析"},["/java/collection/java-map-LinkedHashMap&LinkedHashSet.html","/java/collection/java-map-LinkedHashMap&LinkedHashSet.md"]],["v-7068a5d5","/java/collection/java-map-TreeMap_TreeSet.html",{d:16451424e5,l:"2022年2月18日",c:["Java 集合"],g:["Java 集合"],e:`<h1> Map - TreeSet &amp; TreeMap 源码解析</h1>
<blockquote>
<p>本文主要对Map - TreeSet &amp; TreeMap 源码解析。</p>
</blockquote>
<h2> Java 7 - TreeSet &amp; TreeMap</h2>
<h3> 总体介绍</h3>
<p>之所以把<em>TreeSet</em>和<em>TreeMap</em>放在一起讲解，是因为二者在Java里有着相同的实现，前者仅仅是对后者做了一层包装，也就是说<strong><em>TreeSet*里面有一个*TreeMap</em>(适配器模式)</strong>。因此本文将重点分析<em>TreeMap</em>。</p>`,r:{minutes:11.03,words:3310},y:"a",t:"Map - TreeSet & TreeMap 源码解析"},["/java/collection/java-map-TreeMap&TreeSet.html","/java/collection/java-map-TreeMap&TreeSet.md"]],["v-e6e1587c","/java/collection/java-map-WeakHashMap.html",{d:16452288e5,l:"2022年2月19日",c:["Java 集合"],g:["Java 集合"],e:`<h1> Map - WeakHashMap源码解析</h1>
<blockquote>
<p>本文主要对Map - WeakHashMap源码解析 源码解析。</p>
</blockquote>
<h2> Java 7- WeakHashMap</h2>
<h3> 总体介绍</h3>
<p>在Java集合框架系列文章的最后，笔者打算介绍一个特殊的成员: <em>WeakHashMap</em>，从名字可以看出它是某种 <em>Map</em>。它的特殊之处在于 <em>WeakHashMap</em> 里的<code>entry</code>可能会被GC自动删除，即使程序员没有调用<code>remove()</code>或者<code>clear()</code>方法。</p>`,r:{minutes:3.53,words:1060},y:"a",t:"Map - WeakHashMap源码解析"},[":md"]],["v-3593583a","/java/io/java-io-aio.html",{d:1648512e6,l:"2022年3月29日",c:["Java IO/NIO/AIO"],g:["Java IO/NIO/AIO"],e:`<h1> Java AIO - 异步IO详解</h1>
<blockquote>
<p>本文主要对异步IO和Java中对AIO的支持详解。</p>
</blockquote>
<h2> 异步IO</h2>
<p>上面两篇文章中，我们分别讲解了阻塞式同步IO、非阻塞式同步IO、多路复用IO 这三种IO模型，以及JAVA对于这三种IO模型的支持。重点说明了IO模型是由操作系统提供支持，且这三种IO模型都是同步IO，都是采用的“应用程序不询问我，我绝不会主动通知”的方式。</p>
<p>异步IO则是采用“订阅-通知”模式: 即应用程序向操作系统注册IO监听，然后继续做自己的事情。当操作系统发生IO事件，并且准备好数据后，在主动通知应用程序，触发相应的函数:</p>`,r:{minutes:11.03,words:3308},y:"a",t:"Java AIO - 异步IO详解"},[":md"]],["v-0f81c6ab","/java/io/java-io-basic-category.html",{d:16477344e5,l:"2022年3月20日",c:["Java IO/NIO/AIO"],g:["Java IO/NIO/AIO"],e:`<h1> Java IO - 分类(传输，操作)</h1>
<blockquote>
<p>本文主要从<code>传输方式</code>和<code>数据操作</code>两个方面分析Java IO的分类。</p>
</blockquote>
<h2> IO理解分类 - 从传输方式上</h2>
<p>从数据传输方式或者说是运输方式角度看，可以将 IO 类分为:</p>
<ul>
<li>字节流</li>
<li>字符流</li>
</ul>
<p><code>字节</code>是个计算机看的，<code>字符</code>才是给人看的</p>
<h3> 字节流</h3>
<p>(整体结构如下，部分派生类有缺失)</p>`,r:{minutes:2.18,words:653},y:"a",t:"Java IO - 分类(传输，操作)"},[":md"]],["v-91590982","/java/io/java-io-basic-code-inputstream.html",{d:16479072e5,l:"2022年3月22日",c:["Java IO/NIO/AIO"],g:["Java IO/NIO/AIO"],e:`<h1> Java IO - 源码: InputStream</h1>
<blockquote>
<p>本文主要从<strong>JDK 11 源码</strong>角度分析InputStream。</p>
</blockquote>
<h2> InputStream 类实现关系</h2>
<blockquote>
<p>InputStream是输入字节流，具体的实现类层次结构如下：</p>
</blockquote>
<figure><img src="https://www.pdai.tech/images/io/io-inputstream-1.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>`,r:{minutes:14.2,words:4261},y:"a",t:"Java IO - 源码: InputStream"},[":md"]],["v-c2e41070","/java/io/java-io-basic-code-outputstream.html",{d:16479936e5,l:"2022年3月23日",c:["Java IO/NIO/AIO"],g:["Java IO/NIO/AIO"],e:`<h1> Java IO - 源码: OutputStream</h1>
<blockquote>
<p>本文主要从JDK 11源码角度分析 OutputStream。</p>
</blockquote>
<h2> OutputStream 类实现关系</h2>
<blockquote>
<p>OutputStream是输出字节流，具体的实现类层次结构如下：</p>
</blockquote>
<figure><img src="https://www.pdai.tech/images/io/io-outputstream-1.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>`,r:{minutes:6.22,words:1866},y:"a",t:"Java IO - 源码: OutputStream"},[":md"]],["v-dd6781f0","/java/io/java-io-basic-design-pattern.html",{d:16478208e5,l:"2022年3月21日",c:["Java IO/NIO/AIO"],g:["Java IO/NIO/AIO"],e:`<h1> Java IO - 设计模式(装饰者模式)</h1>
<blockquote>
<p>Java I/O 使用了装饰者模式来实现。</p>
</blockquote>
<h2> 装饰者模式</h2>
<p>请参考<a href="">装饰者模式详解</a></p>
<p>装饰者(Decorator)和具体组件(ConcreteComponent)都继承自组件(Component)，具体组件的方法实现不需要依赖于其它对象，而装饰者组合了一个组件，这样它可以装饰其它装饰者或者具体组件。所谓装饰，就是把这个装饰者套在被装饰者之上，从而动态扩展被装饰者的功能。装饰者的方法有一部分是自己的，这属于它的功能，然后调用被装饰者的方法实现，从而也保留了被装饰者的功能。可以看到，具体组件应当是装饰层次的最低层，因为只有具体组件的方法实现不需要依赖于其它对象。</p>`,r:{minutes:1.34,words:402},y:"a",t:"Java IO - 设计模式(装饰者模式)"},[":md"]],["v-1c8d45c8","/java/io/java-io-basic-usage.html",{d:164808e7,l:"2022年3月24日",c:["Java IO/NIO/AIO"],g:["Java IO/NIO/AIO"],e:`<h1> Java IO - 常见类使用</h1>
<blockquote>
<p>本文主要介绍Java IO常见类的使用，包括：磁盘操作，字节操作，字符操作，对象操作和网络操作。</p>
</blockquote>
<h2> IO常见类的使用</h2>
<p>Java 的 I/O 大概可以分成以下几类:</p>
<ul>
<li>磁盘操作: File</li>
<li>字节操作: InputStream 和 OutputStream</li>
<li>字符操作: Reader 和 Writer</li>
<li>对象操作: Serializable</li>
<li>网络操作: Socket</li>
</ul>`,r:{minutes:2.93,words:878},y:"a",t:"Java IO - 常见类使用"},[":md"]],["v-4d1780c2","/java/io/java-io-bio.html",{d:16482528e5,l:"2022年3月26日",c:["Java IO/NIO/AIO"],g:["Java IO/NIO/AIO"],e:`<h1> Java IO - BIO 详解</h1>
<blockquote>
<p>BIO就是: blocking IO。最容易理解、最容易实现的IO工作方式，应用程序向操作系统请求网络IO操作，这时应用程序会一直等待；另一方面，操作系统收到请求后，也会等待，直到网络上有数据传到监听端口；操作系统在收集数据后，会把数据发送给应用程序；最后应用程序受到数据，并解除等待状态。</p>
</blockquote>
<h2> 几个重要概念</h2>
<ul>
<li><code>阻塞IO</code> 和 <code>非阻塞IO</code></li>
</ul>
<p>这两个概念是<code>程序级别</code>的。主要描述的是程序请求操作系统IO操作后，如果IO资源没有准备好，那么程序该如何处理的问题: 前者等待；后者继续执行(并且使用线程一直轮询，直到有IO资源准备好了)</p>`,r:{minutes:9.88,words:2963},y:"a",t:"Java IO - BIO 详解"},[":md"]],["v-47bd7701","/java/io/java-io-model.html",{d:16481664e5,l:"2022年3月25日",c:["Java IO/NIO/AIO"],g:["Java IO/NIO/AIO"],e:`<h1> IO 模型 - Unix IO 模型</h1>
<blockquote>
<p>本文主要简要介绍 Unix I/O 5种模型，并对5大模型比较，并重点为后续章节解释IO多路复用做铺垫。</p>
</blockquote>
<h2> Unix IO 模型简介</h2>
<p>一个输入操作通常包括两个阶段:</p>
<ul>
<li>等待数据准备好</li>
<li>从内核向进程复制数据</li>
</ul>
<p>对于一个套接字上的输入操作，第一步通常涉及等待数据从网络中到达。当所等待分组到达时，它被复制到内核中的某个缓冲区。第二步就是把数据从内核缓冲区复制到应用进程缓冲区。</p>
`,r:{minutes:6.24,words:1872},y:"a",t:"IO 模型 - Unix IO 模型"},[":md"]],["v-6eb505c1","/java/io/java-io-nio-netty.html",{d:16485984e5,l:"2022年3月30日",c:["Java IO/NIO/AIO"],g:["Java IO/NIO/AIO"],e:`<h1> Java N(A)IO - 框架: Netty</h1>
<blockquote>
<p>Netty是一个高性能、异步事件驱动的NIO框架，提供了对TCP、UDP和文件传输的支持。作为当前最流行的NIO框架，Netty在互联网领域、大数据分布式计算领域、游戏行业、通信行业等获得了广泛的应用，一些业界著名的开源组件也基于Netty构建，比如RPC框架、zookeeper等。</p>
</blockquote>
<h2> NIO框架</h2>
<p>目前流行的NIO框架非常的多。在论坛上、互联网上大家讨论和使用最多的有以下几种:</p>
<ul>
<li>原生JAVA NIO框架:</li>
</ul>`,r:{minutes:3.11,words:934},y:"a",t:"Java N(A)IO - 框架: Netty"},[":md"]],["v-74aca148","/java/io/java-io-nio-select-epoll.html",{d:16484256e5,l:"2022年3月28日",c:["Java IO/NIO/AIO"],g:["Java IO/NIO/AIO"],e:`<h1> Java NIO - IO多路复用详解</h1>
<blockquote>
<p>本文主要对IO多路复用，Ractor模型以及Java NIO对其的支持。</p>
</blockquote>
<h2> 现实场景</h2>
<p>我们试想一下这样的现实场景:</p>
<p>一个餐厅同时有100位客人到店，当然到店后第一件要做的事情就是点菜。但是问题来了，餐厅老板为了节约人力成本目前只有一位大堂服务员拿着唯一的一本菜单等待客人进行服务。</p>
<ul>
<li>那么最笨(但是最简单)的方法是(方法A)，无论有多少客人等待点餐，服务员都把仅有的一份菜单递给其中一位客人，然后站在客人身旁等待这个客人完成点菜过程。在记录客人点菜内容后，把点菜记录交给后堂厨师。然后是第二位客人。。。。然后是第三位客人。很明显，只有脑袋被门夹过的老板，才会这样设置服务流程。因为随后的80位客人，再等待超时后就会离店(还会给差评)。</li>
<li>于是还有一种办法(方法B)，老板马上新雇佣99名服务员，同时印制99本新的菜单。每一名服务员手持一本菜单负责一位客人(关键不只在于服务员，还在于菜单。因为没有菜单客人也无法点菜)。在客人点完菜后，记录点菜内容交给后堂厨师(当然为了更高效，后堂厨师最好也有100名)。这样每一位客人享受的就是VIP服务咯，当然客人不会走，但是人力成本可是一个大头哦(亏死你)。</li>
<li>另外一种办法(方法C)，就是改进点菜的方式，当客人到店后，自己申请一本菜单。想好自己要点的才后，就呼叫服务员。服务员站在自己身边后记录客人的菜单内容。将菜单递给厨师的过程也要进行改进，并不是每一份菜单记录好以后，都要交给后堂厨师。服务员可以记录号多份菜单后，同时交给厨师就行了。那么这种方式，对于老板来说人力成本是最低的；对于客人来说，虽然不再享受VIP服务并且要进行一定的等待，但是这些都是可接受的；对于服务员来说，基本上她的时间都没有浪费，基本上被老板压杆了最后一滴油水。</li>
</ul>`,r:{minutes:30.65,words:9194},y:"a",t:"Java NIO - IO多路复用详解"},[":md"]],["v-ad7d3fdc","/java/io/java-io-nio-zerocopy.html",{d:16486848e5,l:"2022年3月31日",c:["Java IO/NIO/AIO"],g:["Java IO/NIO/AIO"],e:`<h1> Java NIO - 零拷贝实现</h1>
<blockquote>
<p>这里转一篇Java NIO 零拷贝的实现文章，在此之前建议先理解什么是Linux中零拷贝，可以先看这篇文章。本文从源码着手分析了 Java NIO 对零拷贝的实现，主要包括基于内存映射（mmap）方式的 MappedByteBuffer 以及基于 sendfile 方式的 FileChannel。最后在篇末简单的阐述了一下 Netty 中的零拷贝机制，以及 RocketMQ 和 Kafka 两种消息队列在零拷贝实现方式上的区别。</p>
</blockquote>
<h2> Java NIO零拷贝</h2>
`,r:{minutes:16.78,words:5033},y:"a",t:"Java NIO - 零拷贝实现"},[":md"]],["v-2ba59b36","/java/io/java-io-nio.html",{d:16483392e5,l:"2022年3月27日",c:["Java IO/NIO/AIO"],g:["Java IO/NIO/AIO"],e:`<h1> Java NIO - 基础详解</h1>
<blockquote>
<p>新的输入/输出 (NIO) 库是在 JDK 1.4 中引入的，弥补了原来的 I/O 的不足，提供了高速的、面向块的 I/O。</p>
</blockquote>
<p>Standard IO是对字节流的读写，在进行IO之前，首先创建一个流对象，流对象进行读写操作都是按字节 ，一个字节一个字节的来读或写。而NIO把IO抽象成块，类似磁盘的读写，每次IO操作的单位都是一个块，块被读入内存之后就是一个byte[]，NIO一次可以读或写多个字节。</p>
<h2> 流与块</h2>
<p>I/O 与 NIO 最重要的区别是数据打包和传输的方式，I/O 以流的方式处理数据，而 NIO 以块的方式处理数据。</p>`,r:{minutes:8.08,words:2423},y:"a",t:"Java NIO - 基础详解"},[":md"]],["v-b17b64a2","/java/io/java-io-overview.html",{d:1647648e6,l:"2022年3月19日",c:["Java IO/NIO/AIO"],g:["Java IO/NIO/AIO"],e:`<h1> ♥Java IO知识体系详解♥</h1>
<blockquote>
<p>本文主要梳理Java IO/NIO/AIO的知识体系。</p>
</blockquote>
<h2> 知识体系</h2>
<figure><img src="https://www.pdai.tech/images/io/java-io-overview2.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>
<h2> 相关文章</h2>
<blockquote>
<p><strong>A. Java进阶 - IO框架之知识体系</strong>：首先了解下Java IO框架包含什么，同时推荐下如何学习IO框架。</p>
</blockquote>`,r:{minutes:3.13,words:940},y:"a",t:"♥Java IO知识体系详解♥"},[":md"]],["v-56bca9f0","/java/javaup/java-8-up-overview.html",{d:16498944e5,l:"2022年4月14日",c:["Java 新特性"],g:["Java 新特性"],e:`<h1> ♥Java8+特性知识体系详解♥</h1>
<blockquote>
<p>本系列主要介绍Java8以上所有版本特性知识体系详解。</p>
</blockquote>
<h2> 重点知识</h2>
<blockquote>
<p>Java现在发布的版本很快，每年两个，但是真正会被大规模使用的是三年一个的TLS版本。</p>
</blockquote>
<ul>
<li>每3年发布一个TLS，长期维护版本。意味着Java 8 ，Java 11， Java 17 才可能被大规模使用。</li>
<li>每年发布两个正式版本，分别是3月份和9月份。</li>
</ul>
<h2> 版本详解</h2>`,r:{minutes:10.04,words:3011},y:"a",t:"♥Java8+特性知识体系详解♥"},[":md"]],["v-e9fdae4c","/java/javaup/java10.html",{d:165024e7,l:"2022年4月18日",c:["Java 新特性"],g:["Java 新特性"],e:`<h1> Java 10 新特性概述</h1>
<blockquote>
<p>作为当今使用最广泛的编程语言之一的 Java 在 2018 年 3 月 21 日发布了第十个大版本。为了更快地迭代、更好地跟进社区反馈，Java 语言版本发布周期调整为每隔 6 个月发布一次。Java 10 是这一新规则之后，采用新发布周期的第一个大版本。Java 10 版本带来了很多新特性，其中最备受广大开发者关注的莫过于局部变量类型推断。除此之外，还有其他包括垃圾收集器改善、GC 改进、性能提升、线程管控等一批新特性。本文主要针对 Java 10 中的新特性展开介绍，希望读者能从本文的介绍中快速了解 Java 10 带来的变化。</p>
</blockquote>`,r:{minutes:16.25,words:4876},y:"a",t:"Java 10 新特性概述"},[":md"]],["v-e693fd0e","/java/javaup/java11.html",{d:16503264e5,l:"2022年4月19日",c:["Java 新特性"],g:["Java 新特性"],e:`<h1> Java 11 新特性概述</h1>
<blockquote>
<p>Java 11 在 2018 年 9 月 25 日正式发布，之前在 Java 10 新特性介绍 中介绍过，为了加快的版本迭代、跟进社区反馈，Java 的版本发布周期调整为每六个月一次——即每半年发布一个大版本，每个季度发布一个中间特性版本，并且做出不会跳票的承诺。通过这样的方式，Java 开发团队能够将一些重要特性尽早的合并到 Java Release 版本中，以便快速得到开发者的反馈，避免出现类似 Java 9 发布时的两次延期的情况。</p>
</blockquote>
<p>按照官方介绍，新的版本发布周期将会严格按照时间节点，于每年的 3 月和 9 月发布，Java 11 发布的时间节点也正好处于 Java 8 免费更新到期的前夕。与 Java 9 和 Java 10 这两个被称为”功能性的版本”不同，Java 11 仅将提供长期支持服务（LTS, Long-Term-Support），还将作为 Java 平台的默认支持版本，并且会提供技术支持直至 2023 年 9 月，对应的补丁和安全警告等支持将持续至 2026 年。</p>`,r:{minutes:17.33,words:5198},y:"a",t:"Java 11 新特性概述"},[":md"]],["v-13927007","/java/javaup/java12-17.html",{d:16500672e5,l:"2022年4月16日",c:["Java 新特性"],g:["Java 新特性"],e:`<h1> Java 11 升Java 17 重要特性必读</h1>
<blockquote>
<p>JDK 17 在 2021 年 9 月 14 号正式发布了！根据发布的规划，这次发布的 JDK 17 是一个长期维护的版本（LTS)。SpingFramework 6 和SpringBoot 3中默认将使用JDK 17，所以JDK 17必将是使用较广泛的版本; 而从上个LTS版本JDK11到JDK17有哪些重要特性需要掌握呢？本文帮助你梳理Java 11 升Java 17 重要特性。</p>
</blockquote>
<h2> 升级JDK17概述</h2>
<blockquote>
<p>这里帮你梳理为何JDK 17将会是一个极为重要的版本以及如何去理解它。</p>
</blockquote>`,r:{minutes:33.16,words:9948},y:"a",t:"Java 11 升Java 17 重要特性必读"},[":md"]],["v-e32a4bd0","/java/javaup/java12.html",{d:16504128e5,l:"2022年4月20日",c:["Java 新特性"],g:["Java 新特性"],e:`<h1> Java 12 新特性概述</h1>
<blockquote>
<p>JDK12 在 2019 年 3 月 19 号正式发布，不同于JDK11，JDK12并不是一个LTS版本。作为一个中间版本，JDK12版本特性增加较少。 2017年宣布的加速发布节奏要求每六个月发布一次功能，每季度更新一次，每三年发布一次长期支持（LTS）更新版本（或每六个版本一次）。</p>
</blockquote>
<h2> 知识体系</h2>
<figure><img src="https://www.pdai.tech/images/java/java-12.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>`,r:{minutes:6.42,words:1925},y:"a",t:"Java 12 新特性概述"},[":md"]],["v-dfc09a92","/java/javaup/java13.html",{d:16504992e5,l:"2022年4月21日",c:["Java 新特性"],g:["Java 新特性"],e:`<h1> Java 13 新特性概述</h1>
<blockquote>
<p>Java 13 已如期于 9 月 17 日正式发布，此次更新是继半年前 Java 12 这大版本发布之后的一次常规版本更新，在这一版中，主要带来了 ZGC 增强、更新 Socket 实现、Switch 表达式更新等方面的改动、增强。本文主要针对 Java 13 中主要的新特性展开介绍，带你快速了解 Java 13 带来的不同体验。</p>
</blockquote>
<h2> 知识体系</h2>
<figure><img src="https://www.pdai.tech/images/java/java-13.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>`,r:{minutes:13.07,words:3920},y:"a",t:"Java 13 新特性概述"},[":md"]],["v-dc56e954","/java/javaup/java14.html",{d:16505856e5,l:"2022年4月22日",c:["Java 新特性"],g:["Java 新特性"],e:`<h1> Java 14 新特性概述</h1>
<blockquote>
<p>Java 14 已如期于 2020 年 3 月 17 日正式发布，此次更新是继半年前 Java 13 这大版本发布之后的又一次常规版本更新，即便在全球疫情如此严峻形势下，依然保持每六个月的版本更新频率，为大家及时带来改进和增强，这一点值得点赞。在这一版中，主要带来了 ZGC 增强、instanceof 增强、Switch 表达式更新为标准版等方面的改动、增强和新功能。本文主要介绍 Java 14 中的主要新特性，带您快速了解 Java 14 带来了哪些不一样的体验和便利。</p>
</blockquote>
<h2> 知识体系</h2>`,r:{minutes:21.38,words:6413},y:"a",t:"Java 14 新特性概述"},[":md"]],["v-d8ed3816","/java/javaup/java15.html",{d:1650672e6,l:"2022年4月23日",c:["Java 新特性"],g:["Java 新特性"],e:`<h1> Java 15 新特性概述</h1>
<blockquote>
<p>JDK 15 在 2020 年 9 月 15 号正式发布了！根据发布的规划，这次发布的 JDK 15 将是一个短期的过度版，只会被 Oracle 支持（维护）6 个月，直到明年 3 月的 JDK 16 发布此版本将停止维护。而 Oracle 下一个长期支持版（LTS 版）会在明年的 9 月份候发布（Java 17），LTS 版每 3 年发布一个，上一次长期支持版是 18 年 9 月发布的 JDK 11。</p>
</blockquote>
<h2> 知识体系</h2>
<figure><img src="https://www.pdai.tech/images/java/java-15.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>`,r:{minutes:18.84,words:5651},y:"a",t:"Java 15 新特性概述"},[":md"]],["v-d58386d8","/java/javaup/java16.html",{d:16507584e5,l:"2022年4月24日",c:["Java 新特性"],g:["Java 新特性"],e:`<h1> Java 16 新特性概述</h1>
<blockquote>
<p>JDK 16 在 2021 年 3 月 16 号发布！根据发布的规划，这次发布的 JDK 17 是一个长期维护的版本（LTS)。Java 16 提供了数千个<strong>性能</strong>、<strong>稳定性</strong>和<strong>安全性</strong>更新，以及 <strong>17 个 JEP</strong>（JDK 增强提案），进一步改进了 Java 语言和平台，以帮助开发人员提高工作效率。</p>
</blockquote>
<h2> 知识体系</h2>
<figure><img src="https://www.pdai.tech/images/java/java-16.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>`,r:{minutes:19.75,words:5926},y:"a",t:"Java 16 新特性概述"},[":md"]],["v-d219d59a","/java/javaup/java17.html",{d:16508448e5,l:"2022年4月25日",c:["Java 新特性"],g:["Java 新特性"],e:`<h1> Java 17 新特性概述</h1>
<blockquote>
<p>JDK 17 在 2021 年 9 月 14 号正式发布了！根据发布的规划，这次发布的 JDK 17 是一个长期维护的版本（LTS)。Java 17 提供了数千个<strong>性能</strong>、<strong>稳定性</strong>和<strong>安全性</strong>更新，以及 <strong>14 个 JEP</strong>（JDK 增强提案），进一步改进了 Java 语言和平台，以帮助开发人员提高工作效率。JDK 17 包括新的语言增强、库更新、对新 Apple (Mx CPU)计算机的支持、旧功能的删除和弃用，并努力确保今天编写的 Java 代码在未来的 JDK 版本中继续工作而不会发生变化。它还提供语言功能预览和孵化 API，以收集 Java 社区的反馈。</p>
</blockquote>`,r:{minutes:12.81,words:3843},y:"a",t:"Java 17 新特性概述"},[":md"]],["v-0c4bedb4","/java/javaup/java8-anno-repeat.html",{d:16492032e5,l:"2022年4月6日",c:["Java 新特性"],g:["Java 新特性"],e:`<h1> Java 8 - 重复注解</h1>
<blockquote>
<p>理解Java 8 重复注解需理解几个问题:</p>
<ul>
<li>Jdk8之前对重复注解是怎么做的?</li>
<li>Jdk8对重复注解添加了什么支持?</li>
</ul>
</blockquote>
<h2> 什么是重复注解</h2>
<p>允许在同一申明类型(类，属性，或方法)的多次使用同一个注解</p>
<h3> JDK8之前</h3>
<p>java 8之前也有重复使用注解的解决方案，但可读性不是很好，比如下面的代码:</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token annotation punctuation">@interface</span> <span class="token class-name">Authority</span> <span class="token punctuation">{</span>
     <span class="token class-name">String</span> <span class="token function">role</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token annotation punctuation">@interface</span> <span class="token class-name">Authorities</span> <span class="token punctuation">{</span>
    <span class="token class-name">Authority</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RepeatAnnotationUseOldVersion</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Authorities</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token annotation punctuation">@Authority</span><span class="token punctuation">(</span>role<span class="token operator">=</span><span class="token string">"Admin"</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token annotation punctuation">@Authority</span><span class="token punctuation">(</span>role<span class="token operator">=</span><span class="token string">"Manager"</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">doSomeThing</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,r:{minutes:1.18,words:355},y:"a",t:"Java 8 - 重复注解"},[":md"]],["v-cb1c4026","/java/javaup/java8-default.html",{d:16490304e5,l:"2022年4月4日",c:["Java 新特性"],g:["Java 新特性"],e:`<h1> Java 8 - 默认方法</h1>
<blockquote>
<p>理解Java 8 默认方法需理解几个问题:</p>
<ul>
<li>为什么会出现默认方法?</li>
<li>接口中出现默认方法，且类可以实现多接口的，那和抽象类有啥区别?</li>
<li>多重实现的默认方法冲突怎么办?</li>
</ul>
</blockquote>
<h2> 什么是默认方法，为什么要有默认方法</h2>
<h3> 先上例子</h3>
<p>一个接口A，Clazz类实现了接口A。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">A</span> <span class="token punctuation">{</span>
    <span class="token keyword">default</span> <span class="token keyword">void</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
       <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Calling A.foo()"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Clazz</span> <span class="token keyword">implements</span> <span class="token class-name">A</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span><span class="token punctuation">{</span>
       <span class="token class-name">Clazz</span> clazz <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Clazz</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       clazz<span class="token punctuation">.</span><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//调用A.foo()</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,r:{minutes:4.38,words:1315},y:"a",t:"Java 8 - 默认方法"},[":md"]],["v-0dbdd390","/java/javaup/java8-javafx.html",{d:16497216e5,l:"2022年4月12日",c:["Java 新特性"],g:["Java 新特性"],e:`<h1> Java 8 - JavaFx 2.0</h1>
<blockquote>
<p>JavaFX主要致力于富客户端开发，以弥补swing的缺陷，主要提供图形库与media库，支持audio,video,graphics,animation,3D等，同时采用现代化的css方式支持界面设计。同时又采用XUI方式以XML方式设计UI界面，达到显示与逻辑的分离。与android这方面确实有点相似性。</p>
</blockquote>
<h2> JavaFX历史</h2>
<p>跟java在服务器端和web端成绩相比，桌面一直是java的软肋，于是Sun公司在2008年推出JavaFX，弥补桌面软件的缺陷，请看下图JavaFX一路走过来的改进</p>`,r:{minutes:4.19,words:1258},y:"a",t:"Java 8 - JavaFx 2.0"},[":md"]],["v-59da0611","/java/javaup/java8-jre.html",{d:1649376e6,l:"2022年4月8日",c:["Java 新特性"],g:["Java 新特性"],e:`<h1> Java 8 - JRE精简</h1>
<blockquote>
<p>理解Java8 JRE精简需理解几个问题:</p>
<ul>
<li>为什么精简Java8 JRE，及好处是啥?</li>
<li>在不同平台上如何编译等?</li>
</ul>
</blockquote>
<p>Oracle公司如期发布了Java 8正式版！没有让广大javaer失望。对于一个人来说，18岁是人生的转折点，从稚嫩走向成熟，法律意味着你是完全民事行为能力人，不再收益于未成年人保护法，到今年为止，java也走过了18年，java8是一个新的里程碑，带来了前所未有的诸多特性，lambda表达式，Stream API，新的Date time api，多核并发支持，重大安全问题改进等，相信java会越来越好，丰富的类库以及庞大的开源生态环境是其他语言所不具备的，说起丰富的类库，很多同学就吐槽了，java该减肥了，确实是该减肥，java8有个很好的特性，即JEP161(<a href="http://openjdk.java.net/jeps/161" target="_blank" rel="noopener noreferrer">http://openjdk.java.net/jeps/161</a> ),该特性定义了Java SE平台规范的一些子集，使java应用程序不需要整个JRE平台即可部署和运行在小型设备上。开发人员可以基于目标硬件的可用资源选择一个合适的JRE运行环境。</p>`,r:{minutes:3.36,words:1007},y:"a",t:"Java 8 - JRE精简"},[":md"]],["v-d4064cb0","/java/javaup/java8-localdatetime.html",{d:16496352e5,l:"2022年4月11日",c:["Java 新特性"],g:["Java 新特性"],e:`<h1> Java 8 - LocalDate/LocalDateTime</h1>
<blockquote>
<p>理解时间和日期库需要理解如下问题:</p>
<ul>
<li>Java8之前的Date有哪些槽点?</li>
<li>Java8之前使用哪些常用的第三方时间库?</li>
<li>Java8关于时间和日期有哪些类和方法，变比Java8之前它的特点是什么?</li>
<li>其它语言时间库?</li>
</ul>
</blockquote>
<h2> Java8之前的Date有哪些槽点</h2>
<blockquote>
<p>Tiago Fernandez做过一次投票，选举最烂的JAVA API，排第一的EJB2.X，第二的就是日期API。</p>
</blockquote>`,r:{minutes:10.1,words:3030},y:"a",t:"Java 8 - LocalDate/LocalDateTime"},[":md"]],["v-42fc1938","/java/javaup/java8-optional.html",{d:1648944e6,l:"2022年4月3日",c:["Java 新特性"],g:["Java 新特性"],e:`<h1> Java 8 - Optional类深度解析</h1>
<blockquote>
<p>对Java 8 Optional类进行深度解析。</p>
</blockquote>
<blockquote>
<p>身为一名Java程序员，大家可能都有这样的经历: 调用一个方法得到了返回值却不能直接将返回值作为参数去调用别的方法。我们首先要判断这个返回值是否为null，只有在非空的前提下才能将其作为其他方法的参数。这正是一些类似Guava的外部API试图解决的问题。一些JVM编程语言比如Scala、Ceylon等已经将对在核心API中解决了这个问题。在我的前一篇文章中，介绍了Scala是如何解决了这个问题。</p>
</blockquote>`,r:{minutes:9,words:2700},y:"a",t:"Java 8 - Optional类深度解析"},[":md"]],["v-0db1e401","/java/javaup/java8-others.html",{d:1649808e6,l:"2022年4月13日",c:["Java 新特性"],g:["Java 新特性"],e:`<h1> Java 8 - 其它更新: 字符串，base64,...</h1>
<blockquote>
<p>本文对Java 8 其它更新介绍和解读。</p>
</blockquote>
<h2> 处理数值</h2>
<p>Java8添加了对无符号数的额外支持。Java中的数值总是有符号的，例如，让我们来观察Integer:</p>
<p>int可表示最多2 ** 32个数。Java中的数值默认为有符号的，所以最后一个二进制数字表示符号(0为正数，1为负数)。所以从十进制的0开始，最大的有符号正整数为2 ** 31 - 1。</p>
<p>你可以通过Integer.MAX_VALUE来访问它:</p>`,r:{minutes:8.36,words:2509},y:"a",t:"Java 8 - 其它更新: 字符串，base64,..."},[":md"]],["v-3292fb2e","/java/javaup/java8-permgen.html",{d:16494624e5,l:"2022年4月9日",c:["Java 新特性"],g:["Java 新特性"],e:`<h1> Java 8 - 移除Permgen</h1>
<blockquote>
<p>本文主要介绍PermGen space，及Java 8 - 移除Permgen。</p>
</blockquote>
<blockquote>
<p>很多开发者都在其系统中见过“java.lang.OutOfMemoryError: PermGen space”这一问题。这往往是由类加载器相关的内存泄漏以及新类加载器的创建导致的，通常出现于代码热部署时。相对于正式产品，该问题在开发机上出现的频率更高，在产品中最常见的“问题”是默认值太低了。常用的解决方法是将其设置为256MB或更高。</p>
</blockquote>`,r:{minutes:6.92,words:2076},y:"a",t:"Java 8 - 移除Permgen"},[":md"]],["v-462b5b61","/java/javaup/java8-stampedlock.html",{d:16495488e5,l:"2022年4月10日",c:["Java 新特性"],g:["Java 新特性"],e:`<h1> Java 8 - StampedLock</h1>
<blockquote>
<p>本文将从synchronized、Lock到Java8新增的StampedLock进行对比分析，相信StampedLock不会让大家失望。</p>
</blockquote>
<h2> synchronized</h2>
<p>在java5之前，实现同步主要是使用synchronized。它是Java语言的关键字，当它用来修饰一个方法或者一个代码块的时候，能够保证在同一时刻最多只有一个线程执行该段代码。</p>
<p>有四种不同的同步块:</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>实例方法
静态方法
实例方法中的同步块
静态方法中的同步块
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,r:{minutes:6.12,words:1835},y:"a",t:"Java 8 - StampedLock"},[":md"]],["v-c32bfbf8","/java/javaup/java8-stream.html",{d:16488576e5,l:"2022年4月2日",c:["Java 新特性"],g:["Java 新特性"],e:`<h1> Java 8 - 函数编程(lambda表达式)</h1>
<blockquote>
<p>我们关心的是如何写出好代码，而不是符合函数编程风格的代码。</p>
</blockquote>
<h2> 简介</h2>
<blockquote>
<p>在Java世界里面，面向对象还是主流思想，对于习惯了面向对象编程的开发者来说，抽象的概念并不陌生。面向对象编程是对数据进行抽象，而函数式编程是对行为进行抽象。现实世界中，数据和行为并存，程序也是如此，因此这两种编程方式我们都得学。</p>
</blockquote>
<blockquote>
<p>这种新的抽象方式还有其他好处。很多人不总是在编写性能优先的代码，对于这些人来说，函数式编程带来的好处尤为明显。程序员能编写出更容易阅读的代码——这种代码更多地表达了业务逻辑，而不是从机制上如何实现。易读的代码也易于维护、更可靠、更不容易出错。</p>
</blockquote>`,r:{minutes:15.53,words:4658},y:"a",t:"Java 8 - 函数编程(lambda表达式)"},[":md"]],["v-364af0e6","/java/javaup/java8-type-anno.html",{d:16491168e5,l:"2022年4月5日",c:["Java 新特性"],g:["Java 新特性"],e:`<h1> Java 8 - 类型注解</h1>
<blockquote>
<p>理解Java 8 类型注解需理解几个问题:</p>
<ul>
<li>注解在JDK哪个版本中出现的，可以在哪些地方用注解?</li>
<li>什么是类型注解?</li>
<li>类型注解的作用是什么?</li>
<li>为什么会出现类型注解(JSR308)?</li>
</ul>
</blockquote>
<h2> 什么是类型注解</h2>
<blockquote>
<p>注解大家都知道，从java5开始加入这一特性，发展到现在已然是遍地开花，在很多框架中得到了广泛的使用，用来简化程序中的配置。那充满争议的类型注解究竟是什么? 复杂还是便捷?</p>
</blockquote>`,r:{minutes:4.39,words:1318},y:"a",t:"Java 8 - 类型注解"},[":md"]],["v-23c3b54a","/java/javaup/java8-type.html",{d:16492896e5,l:"2022年4月7日",c:["Java 新特性"],g:["Java 新特性"],e:`<h1> Java 8 - 类型推断优化</h1>
<blockquote>
<p>理解Java 8 类型推断需理解几个问题:</p>
<ul>
<li>什么是泛型</li>
<li>Java7对泛型推断做了哪些优化</li>
<li>Java8对此有做了哪些优化</li>
</ul>
</blockquote>
<h2> 简单理解泛型</h2>
<p>泛型是Java SE 1.5的新特性，泛型的本质是参数化类型，也就是说所操作的数据类型被指定为一个参数。通俗点将就是“类型的变量”。这种类型变量可以用在类、接口和方法的创建中。</p>
<p>理解Java泛型最简单的方法是把它看成一种便捷语法，能节省你某些Java类型转换(casting)上的操作:</p>`,r:{minutes:3.72,words:1116},y:"a",t:"Java 8 - 类型推断优化"},[":md"]],["v-b5dd4e3e","/java/javaup/java8.html",{d:16487712e5,l:"2022年4月1日",c:["Java 新特性"],g:["Java 新特性"],e:`<h1> ♥Java8特性知识体系详解♥</h1>
<blockquote>
<p>Java 8 新特性详解汇总。</p>
<ul>
<li>Java 新特性的增加都是来源于 JSR或者JEP</li>
<li>JSR论坛: <a href="https://jcp.org/en/jsr/detail?id=335" target="_blank" rel="noopener noreferrer">https://jcp.org/en/jsr/detail?id=335</a></li>
</ul>
</blockquote>
<h2> 知识体系</h2>
<figure><img src="https://www.pdai.tech/images/java/java8-overview.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>`,r:{minutes:3.96,words:1189},y:"a",t:"♥Java8特性知识体系详解♥"},[":md"]],["v-76d5ebe5","/java/javaup/java9-11.html",{d:16499808e5,l:"2022年4月15日",c:["Java 新特性"],g:["Java 新特性"],e:`<h1> Java 8 升Java 11 重要特性必读</h1>
<blockquote>
<p>Java 11 在 2018 年 9 月 25 日正式发布！根据发布的规划，JDK 11 是一个长期维护的版本（LTS); 本文帮助你梳理Java 8 升Java 11 重要特性。</p>
</blockquote>
<h2> 升级JDK11概述</h2>
<blockquote>
<p>这里帮你梳理为何JDK 11会是一个极为重要的版本以及如何去理解它。</p>
</blockquote>
<h4> JDK 10后版本发布规则？</h4>
<p>Java 11 已于 2018 年 9 月 25 日正式发布，之前在 Java 10 新特性介绍 中介绍过，为了加快的版本迭代、跟进社区反馈，Java 的版本发布周期调整为每六个月一次——即每半年发布一个大版本，每个季度发布一个中间特性版本，并且做出不会跳票的承诺。通过这样的方式，Java 开发团队能够将一些重要特性尽早的合并到 Java Release 版本中，以便快速得到开发者的反馈，避免出现类似 Java 9 发布时的两次延期的情况。</p>`,r:{minutes:24.64,words:7392},y:"a",t:"Java 8 升Java 11 重要特性必读"},[":md"]],["v-b2739d00","/java/javaup/java9.html",{d:16501536e5,l:"2022年4月17日",c:["Java 新特性"],g:["Java 新特性"],e:`<h1> Java 9 新特性概述</h1>
<blockquote>
<p>Java 9 正式发布于 2017 年 9 月 21 日。作为 Java8 之后 3 年半才发布的新版本，Java 9 带来了很多重大的变化。其中最重要的改动是 Java 平台模块系统的引入。除此之外，还有一些新的特性。本文对 Java9 中包含的新特性做了概括性的介绍，可以帮助你快速了解 Java 9。</p>
</blockquote>
<h2> 知识体系</h2>
<figure><img src="https://www.pdai.tech/images/java/java-9.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>`,r:{minutes:13.77,words:4132},y:"a",t:"Java 9 新特性概述"},[":md"]],["v-526554b6","/java/jvm/java-jvm-agent-arthas.html",{d:16524e8,l:"2022年5月13日",c:["Java JVM"],g:["Java JVM"],e:`<h1> 调试排错 - Java 问题排查之应用在线调试Arthas</h1>
<blockquote>
<p>本文主要介绍Alibaba开源的Java诊断工具，开源到现在已经几万个点赞了，深受开发者喜爱。</p>
</blockquote>
<h2> Arthas简介</h2>
<blockquote>
<p>在学习Arthas之前，推荐先看上一篇美团技术团队的<a href="">Java 动态调试技术原理及实践</a>，这样你会对它最底层技术有个了解。可以看下文中最后有个对比图：Greys(Arthas也是基于它做的二次开发)和Java-debug-tool。</p>
</blockquote>`,r:{minutes:14.05,words:4214},y:"a",t:"调试排错 - Java 问题排查之应用在线调试Arthas"},[":md"]],["v-2c8cebb5","/java/jvm/java-jvm-agent-usage.html",{d:16525728e5,l:"2022年5月15日",c:["Java JVM"],g:["Java JVM"],e:`<h1> 调试排错 - Java动态调试技术原理</h1>
<blockquote>
<p>本文转载自 美团技术团队胡健的<a href="https://tech.meituan.com/2019/11/07/java-dynamic-debugging-technology.html" target="_blank" rel="noopener noreferrer">Java 动态调试技术原理及实践在新窗口打开</a>, 通过学习java agent方式进行动态调试了解目前很多大厂开源的一些基于此的调试工具。</p>
</blockquote>
<h2> 简介</h2>
<p>断点调试是我们最常使用的调试手段，它可以获取到方法执行过程中的变量信息，并可以观察到方法的执行路径。但断点调试会在断点位置停顿，使得整个应用停止响应。在线上停顿应用是致命的，动态调试技术给了我们创造新的调试模式的想象空间。本文将研究Java语言中的动态调试技术，首先概括Java动态调试所涉及的技术基础，接着介绍我们在Java动态调试领域的思考及实践，通过结合实际业务场景，设计并实现了一种具备动态性的断点调试工具Java-debug-tool，显著提高了故障排查效率。</p>`,r:{minutes:30.68,words:9204},y:"a",t:"调试排错 - Java动态调试技术原理"},[":md"]],["v-0620a7ea","/java/jvm/java-jvm-class-enhancer.html",{d:1651104e6,l:"2022年4月28日",c:["Java JVM"],g:["Java JVM"],e:`<h1> JVM 基础 - 字节码的增强技术</h1>
<blockquote>
<p>在上文中，着重介绍了字节码的结构，这为我们了解字节码增强技术的实现打下了基础。字节码增强技术就是一类对现有字节码进行修改或者动态生成全新字节码文件的技术。接下来，我们将从最直接操纵字节码的实现方式开始深入进行剖析。</p>
</blockquote>
<h2> 字节码增强技术</h2>
<p>在上文中，着重介绍了字节码的结构，这为我们了解字节码增强技术的实现打下了基础。字节码增强技术就是一类对现有字节码进行修改或者动态生成全新字节码文件的技术。接下来，我们将从最直接操纵字节码的实现方式开始深入进行剖析</p>`,r:{minutes:17.04,words:5113},y:"a",t:"JVM 基础 - 字节码的增强技术"},[":md"]],["v-d2220394","/java/jvm/java-jvm-class.html",{d:16510176e5,l:"2022年4月27日",c:["Java JVM"],g:["Java JVM"],e:`<h1> JVM 基础 - 类字节码详解</h1>
<blockquote>
<p>源代码通过编译器编译为字节码，再通过类加载子系统进行加载到JVM中运行。</p>
</blockquote>
<h2> 多语言编译为字节码在JVM运行</h2>
<p>计算机是不能直接运行java代码的，必须要先运行java虚拟机，再由java虚拟机运行编译后的java代码。这个编译后的java代码，就是本文要介绍的java字节码。</p>
<p>为什么jvm不能直接运行java代码呢，这是因为在cpu层面看来计算机中所有的操作都是一个个指令的运行汇集而成的，java是高级语言，只有人类才能理解其逻辑，计算机是无法识别的，所以java代码必须要先编译成字节码文件，jvm才能正确识别代码转换后的指令并将其运行。</p>`,r:{minutes:13.82,words:4147},y:"a",t:"JVM 基础 - 类字节码详解"},[":md"]],["v-2e496290","/java/jvm/java-jvm-classload.html",{d:168791737e4,e:`<h1> JVM 基础 - Java 类加载机制</h1>
<blockquote>
<p>这篇文章将带你深入理解Java 类加载机制。</p>
</blockquote>
<h2> 类的生命周期</h2>
<p>其中类加载的过程包括了<code>加载</code>、<code>验证</code>、<code>准备</code>、<code>解析</code>、<code>初始化</code>五个阶段。在这五个阶段中，<code>加载</code>、<code>验证</code>、<code>准备</code>和<code>初始化</code>这四个阶段发生的顺序是确定的，<em>而<code>解析</code>阶段则不一定，它在某些情况下可以在初始化阶段之后开始，这是为了支持Java语言的运行时绑定(也成为动态绑定或晚期绑定)</em>。另外注意这里的几个阶段是按顺序开始，而不是按顺序进行或完成，因为这些阶段通常都是互相交叉地混合进行的，通常在一个阶段执行的过程中调用或激活另一个阶段。</p>`,r:{minutes:15.47,words:4642},y:"a",t:"JVM 基础 - Java 类加载机制"},[":md"]],["v-1ce727c4","/java/jvm/java-jvm-cms-gc.html",{d:16517088e5,l:"2022年5月5日",c:["Java JVM"],g:["Java JVM"],e:`<h1> GC - Java 垃圾回收器之CMS GC问题分析与解决</h1>
<blockquote>
<p>本文整理自<a href="https://tech.meituan.com/2020/11/12/java-9-cms-gc.html" target="_blank" rel="noopener noreferrer">美团技术团队在新窗口打开</a>, 这篇文章将可以帮助你构建CMS GC相关问题解决的知识体系，分享给你。</p>
</blockquote>
<h2> 1. 写在前面</h2>
<blockquote>
<p>本文主要针对 Hotspot VM 中“CMS + ParNew”组合的一些使用场景进行总结。重点通过部分源码对根因进行分析以及对排查方法进行总结，排查过程会省略较多，另外本文专业术语较多，有一定的阅读门槛，如未介绍清楚，还请自行查阅相关材料。</p>
</blockquote>`,r:{minutes:70.92,words:21276},y:"a",t:"GC - Java 垃圾回收器之CMS GC问题分析与解决"},[":md"]],["v-18eedada","/java/jvm/java-jvm-debug-idea.html",{d:16524864e5,l:"2022年5月14日",c:["Java JVM"],g:["Java JVM"],e:`<h1> 调试排错 - Java 问题排查之使用IDEA本地调试和远程调试</h1>
<blockquote>
<p>Debug用来追踪代码的运行流程，通常在程序运行过程中出现异常，启用Debug模式可以分析定位异常发生的位置，以及在运行过程中参数的变化；并且在实际的排错过程中，还会用到Remote Debug。IDEA 相比 Eclipse/STS效率更高，本文主要介绍基于IDEA的Debug和Remote Debug的技巧。</p>
</blockquote>
<h2> Debug开篇</h2>
<blockquote>
<p>首先看下IDEA中Debug模式下的界面。</p>
</blockquote>`,r:{minutes:14.38,words:4315},y:"a",t:"调试排错 - Java 问题排查之使用IDEA本地调试和远程调试"},[":md"]],["v-5ebaefb4","/java/jvm/java-jvm-debug-tools-linux.html",{d:16521408e5,l:"2022年5月10日",c:["Java JVM"],g:["Java JVM"],e:`<h1> 调试排错 - Java 问题排查之Linux命令</h1>
<blockquote>
<p>Java 在线问题排查主要分两篇：本文是第一篇，通过linux常用命令排查。</p>
</blockquote>
<h2> 文本操作</h2>
<h3> 文本查找 - grep</h3>
<p>grep常用命令：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 基本使用</span>
<span class="token function">grep</span> yoursearchkeyword f.txt     <span class="token comment">#文件查找</span>
<span class="token function">grep</span> <span class="token string">'KeyWord otherKeyWord'</span> f.txt cpf.txt <span class="token comment">#多文件查找, 含空格加引号</span>
<span class="token function">grep</span> <span class="token string">'KeyWord'</span> /home/admin <span class="token parameter variable">-r</span> <span class="token parameter variable">-n</span> <span class="token comment">#目录下查找所有符合关键字的文件</span>
<span class="token function">grep</span> <span class="token string">'keyword'</span> /home/admin <span class="token parameter variable">-r</span> <span class="token parameter variable">-n</span> <span class="token parameter variable">-i</span> <span class="token comment"># -i 忽略大小写</span>
<span class="token function">grep</span> <span class="token string">'KeyWord'</span> /home/admin <span class="token parameter variable">-r</span> <span class="token parameter variable">-n</span> <span class="token parameter variable">--include</span> *.<span class="token punctuation">{</span>vm,java<span class="token punctuation">}</span> <span class="token comment">#指定文件后缀</span>
<span class="token function">grep</span> <span class="token string">'KeyWord'</span> /home/admin <span class="token parameter variable">-r</span> <span class="token parameter variable">-n</span> <span class="token parameter variable">--exclude</span> *.<span class="token punctuation">{</span>vm,java<span class="token punctuation">}</span> <span class="token comment">#反匹配</span>

<span class="token comment"># cat + grep</span>
<span class="token function">cat</span> f.txt <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-i</span> keyword <span class="token comment"># 查找所有keyword且不分大小写  </span>
<span class="token function">cat</span> f.txt <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-c</span> <span class="token string">'KeyWord'</span> <span class="token comment"># 统计Keyword次数</span>

<span class="token comment"># seq + grep</span>
<span class="token function">seq</span> <span class="token number">10</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token number">5</span> <span class="token parameter variable">-A</span> <span class="token number">3</span>    <span class="token comment">#上匹配</span>
<span class="token function">seq</span> <span class="token number">10</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token number">5</span> <span class="token parameter variable">-B</span> <span class="token number">3</span>    <span class="token comment">#下匹配</span>
<span class="token function">seq</span> <span class="token number">10</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token number">5</span> <span class="token parameter variable">-C</span> <span class="token number">3</span>    <span class="token comment">#上下匹配，平时用这个就妥了</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,r:{minutes:11.13,words:3340},y:"a",t:"调试排错 - Java 问题排查之Linux命令"},[":md"]],["v-3f7ab1cc","/java/jvm/java-jvm-debug-tools-list.html",{d:16522272e5,l:"2022年5月11日",c:["Java JVM"],g:["Java JVM"],e:`<h1> 调试排错 - Java 问题排查之工具单</h1>
<blockquote>
<p>Java 在线问题排查主要分两篇：本文是第二篇，通过java调试/排查工具进行问题定位。</p>
</blockquote>
<h2> Java 调试入门工具</h2>
<h3> jps</h3>
<blockquote>
<p>jps是jdk提供的一个查看当前java进程的小工具， 可以看做是JavaVirtual Machine Process Status Tool的缩写。</p>
</blockquote>
<p>jps常用命令</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>jps <span class="token comment"># 显示进程的ID 和 类的名称</span>
jps –l <span class="token comment"># 输出输出完全的包名，应用主类名，jar的完全路径名 </span>
jps –v <span class="token comment"># 输出jvm参数</span>
jps –q <span class="token comment"># 显示java进程号</span>
jps <span class="token parameter variable">-m</span> <span class="token comment"># main 方法</span>
jps <span class="token parameter variable">-l</span> xxx.xxx.xx.xx <span class="token comment"># 远程查看 </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,r:{minutes:7.48,words:2243},y:"a",t:"调试排错 - Java 问题排查之工具单"},[":md"]],["v-2c851e53","/java/jvm/java-jvm-gc-g1.html",{d:1651536e6,l:"2022年5月3日",c:["Java JVM"],g:["Java JVM"],e:`<h1> GC - Java 垃圾回收器之G1详解</h1>
<blockquote>
<p>G1垃圾回收器是在Java7 update 4之后引入的一个新的垃圾回收器。同优秀的CMS垃圾回收器一样，G1也是关注最小时延的垃圾回收器，也同样适合大尺寸堆内存的垃圾收集，官方在ZGC还没有出现时也推荐使用G1来代替选择CMS。G1最大的特点是引入分区的思路，弱化了分代的概念，合理利用垃圾收集各个周期的资源，解决了其他收集器甚至CMS的众多缺陷。</p>
</blockquote>
<h2> 1. 概述</h2>
<p>G1垃圾回收器是在Java7 update 4之后引入的一个新的垃圾回收器。G1是一个分代的，增量的，并行与并发的标记-复制垃圾回收器。它的设计目标是为了适应现在不断扩大的内存和不断增加的处理器数量，进一步降低暂停时间（pause time），同时兼顾良好的吞吐量。G1回收器和CMS比起来，有以下不同：</p>`,r:{minutes:33.23,words:9968},y:"a",t:"GC - Java 垃圾回收器之G1详解"},[":md"]],["v-ccc0a742","/java/jvm/java-jvm-gc-zgc.html",{d:16516224e5,l:"2022年5月4日",c:["Java JVM"],g:["Java JVM"],e:`<h1> GC - Java 垃圾回收器之ZGC详解</h1>
<blockquote>
<p>ZGC（The Z Garbage Collector）是JDK 11中推出的一款低延迟垃圾回收器, 是JDK 11+ 最为重要的更新之一，适用于<strong>大内存低延迟</strong>服务的内存管理和回收。在梳理相关知识点时，发现美团技术团队分享的文章<a href="https://tech.meituan.com/2020/08/06/new-zgc-practice-in-meituan.html" target="_blank" rel="noopener noreferrer">新一代垃圾回收器ZGC的探索与实践在新窗口打开</a>比较完善（包含G1收集器停顿时间瓶颈，原理，优化等）, 这里分享给你，帮你构建ZGC相关的知识体系。</p>
</blockquote>`,r:{minutes:21.91,words:6574},y:"a",t:"GC - Java 垃圾回收器之ZGC详解"},[":md"]],["v-134b39c8","/java/jvm/java-jvm-gc.html",{d:16514496e5,l:"2022年5月2日",c:["Java JVM"],g:["Java JVM"],e:`<h1> GC - Java 垃圾回收基础知识</h1>
<blockquote>
<p>垃圾收集主要是针对堆和方法区进行；程序计数器、虚拟机栈和本地方法栈这三个区域属于线程私有的，只存在于线程的生命周期内，线程结束之后也会消失，因此不需要对这三个区域进行垃圾回收。</p>
</blockquote>
<h2> 判断一个对象是否可被回收</h2>
<h3> 1. 引用计数算法</h3>
<p>给对象添加一个引用计数器，当对象增加一个引用时计数器加 1，引用失效时计数器减 1。引用计数为 0 的对象可被回收。</p>
<p>两个对象出现循环引用的情况下，此时引用计数器永远不为 0，导致无法对它们进行回收。</p>`,r:{minutes:17.21,words:5163},y:"a",t:"GC - Java 垃圾回收基础知识"},[":md"]],["v-070878a4","/java/jvm/java-jvm-jmm.html",{d:16513632e5,l:"2022年5月1日",c:["Java JVM"],g:["Java JVM"],e:`<h1> JVM 基础 - Java 内存模型详解</h1>
<blockquote>
<p>本文主要转载自 Info 上<a href="https://www.infoq.cn/article/java_memory_model/" target="_blank" rel="noopener noreferrer">深入理解Java内存模型在新窗口打开</a>, 作者程晓明。这篇文章对JMM讲的很清楚了，大致分三部分：重排序与顺序一致性；三个同步原语（lock，volatile，final）的内存语义，重排序规则及在处理器中的实现；java 内存模型的设计，及其与处理器内存模型和顺序一致性内存模型的关系。</p>
</blockquote>`,r:{minutes:36.38,words:10913},y:"a",t:"JVM 基础 - Java 内存模型详解"},[":md"]],["v-d1b45d9a","/java/jvm/java-jvm-oom-offheap.html",{d:1651968e6,l:"2022年5月8日",c:["Java JVM"],g:["Java JVM"],e:`<h1> 调试排错 - Java 内存分析之堆外内存</h1>
<blockquote>
<p>Java 堆外内存分析相对来说是复杂的，美团技术团队的<a href="https://tech.meituan.com/2019/01/03/spring-boot-native-memory-leak.html" target="_blank" rel="noopener noreferrer">Spring Boot引起的“堆外内存泄漏”排查及经验总结在新窗口打开</a>可以为很多Native Code内存泄漏/占用提供方向性指引。</p>
</blockquote>
<h2> 背景</h2>`,r:{minutes:9.56,words:2867},y:"a",t:"调试排错 - Java 内存分析之堆外内存"},[":md"]],["v-175b530c","/java/jvm/java-jvm-oom-tool.html",{d:16523136e5,l:"2022年5月12日",c:["Java JVM"],g:["Java JVM"],e:`<h1> 调试排错 - Java 问题排查之JVM可视化工具</h1>
<blockquote>
<p>本文主要梳理常见的JVM可视化的分析工具，主要包括JConsole, Visual VM, Vusial GC, JProfile 和 MAT等。</p>
</blockquote>
<h2> JConsole</h2>
<blockquote>
<p>Jconsole （Java Monitoring and Management Console），JDK自带的基于JMX的可视化监视、管理工具。 官方文档可以参考<a href="https://docs.oracle.com/javase/8/docs/technotes/guides/management/jconsole.html" target="_blank" rel="noopener noreferrer">这里在新窗口打开</a></p>
</blockquote>`,r:{minutes:5.65,words:1696},y:"a",t:"调试排错 - Java 问题排查之JVM可视化工具"},[":md"]],["v-783acf81","/java/jvm/java-jvm-oom.html",{d:16518816e5,l:"2022年5月7日",c:["Java JVM"],g:["Java JVM"],e:`<h1> 调试排错 - Java 内存分析之堆内存和MetaSpace内存</h1>
<blockquote>
<p>本文以两个简单的例子(<code>堆内存溢出</code>和<code>MetaSpace (元数据) 内存溢出</code>）解释Java 内存溢出的分析过程。</p>
</blockquote>
<h2> 常见的内存溢出问题(内存和MetaSpace内存)</h2>
<blockquote>
<p>常见的内存溢出问题(内存和MetaSpace内存)。</p>
</blockquote>
<h3> Java 堆内存溢出</h3>
<p>Java 堆内存（Heap Memory)主要有两种形式的错误：</p>`,r:{minutes:4.76,words:1428},y:"a",t:"调试排错 - Java 内存分析之堆内存和MetaSpace内存"},[":md"]],["v-7980977e","/java/jvm/java-jvm-param.html",{d:16517952e5,l:"2022年5月6日",c:["Java JVM"],g:["Java JVM"],e:`<h1> 调试排错 - JVM 调优参数</h1>
<blockquote>
<p>本文对JVM涉及的常见的调优参数和垃圾回收参数进行阐述。</p>
</blockquote>
<h3> jvm参数</h3>
<ul>
<li>-Xms</li>
</ul>
<p>堆最小值</p>
<ul>
<li>-Xmx</li>
</ul>
<p>堆最大堆值。-Xms与-Xmx 的单位默认字节都是以k、m做单位的。</p>
<p>通常这两个配置参数相等，避免每次空间不足，动态扩容带来的影响。</p>
<ul>
<li>-Xmn</li>
</ul>
<p>新生代大小</p>
<ul>
<li>-Xss</li>
</ul>`,r:{minutes:6.2,words:1860},y:"a",t:"调试排错 - JVM 调优参数"},[":md"]],["v-05ae10ef","/java/jvm/java-jvm-struct.html",{d:16511904e5,l:"2022年4月29日",c:["Java JVM"],g:["Java JVM"],e:`<h1> JVM 基础 - JVM 内存结构</h1>
<blockquote>
<p>本文主要对JVM 内存结构进行讲解，注意不要和Java内存模型混淆了。原先这里放了一篇我自己整理的文章，最近看到<strong>海星的javakeeper公众号</strong>整理的文章，整理的很好。所以替换为他的文章，以方便你构筑JVM内存结构的知识体系。</p>
</blockquote>
<figure><img src="https://www.pdai.tech/images/jvm/jvm/007S8ZIlly1gg9kuge8ovj32150tt7cd.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>`,r:{minutes:49.65,words:14896},y:"a",t:"JVM 基础 - JVM 内存结构"},[":md"]],["v-64225912","/java/jvm/java-jvm-thread-dump.html",{d:16520544e5,l:"2022年5月9日",c:["Java JVM"],g:["Java JVM"],e:`<h1> 调试排错 - Java 线程分析之线程Dump分析</h1>
<blockquote>
<p>Thread Dump是非常有用的诊断Java应用问题的工具。</p>
</blockquote>
<h2> Thread Dump介绍</h2>
<h3> 什么是Thread Dump</h3>
<p>Thread Dump是非常有用的诊断Java应用问题的工具。每一个Java虚拟机都有及时生成所有线程在某一点状态的thread-dump的能力，虽然各个 Java虚拟机打印的thread dump略有不同，但是 大多都提供了当前活动线程的快照，及JVM中所有Java线程的堆栈跟踪信息，堆栈信息一般包含完整的类名及所执行的方法，如果可能的话还有源代码的行数。</p>`,r:{minutes:18.92,words:5677},y:"a",t:"调试排错 - Java 线程分析之线程Dump分析"},[":md"]],["v-c35eedb8","/java/jvm/java-jvm-x-introduce.html",{d:16512768e5,l:"2022年4月30日",c:["Java JVM"],g:["Java JVM"],e:`<h1> JVM 基础 - Java 内存模型引入</h1>
<blockquote>
<p>很多人都无法区分Java内存模型和JVM内存结构，以及Java内存模型与物理内存之间的关系。本文从堆栈角度引入JMM，然后介绍JMM和物理内存之间的关系, 为后面<code>JMM详解</code>, <code>JVM 内存结构详解</code>, <code>Java 对象模型详解</code>等铺垫。</p>
</blockquote>
<h2> JMM引入</h2>
<h3> 从堆栈说起</h3>
<p>JVM内部使用的Java内存模型在线程栈和堆之间划分内存。 此图从逻辑角度说明了Java内存模型：</p>`,r:{minutes:10.74,words:3222},y:"a",t:"JVM 基础 - Java 内存模型引入"},[":md"]],["v-16edf7b6","/java/jvm/java-jvm-x-overview.html",{d:16509312e5,l:"2022年4月26日",c:["Java JVM"],g:["Java JVM"],e:`<h1> ♥JVM相关知识体系详解♥</h1>
<blockquote>
<p>本系列将给大家构建JVM核心知识点全局知识体系。</p>
</blockquote>
<h2> 知识体系</h2>
<figure><img src="https://www.pdai.tech/images/jvm/jvm-overview.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>
<h2> 学习要点</h2>
<blockquote>
<p>不同的虚拟机实现方式上也有差别，如果没有特别指出，这里的JVM指的是sun的HotSpot；不同的JDK版本略有差别，这里主要以1.8为主，具体差异请看各个章节中详解。下图主要表示的逻辑关系，用来将所有知识点放到一张图里，帮助你理解。</p>
</blockquote>`,r:{minutes:6.94,words:2081},y:"a",t:"♥JVM相关知识体系详解♥"},[":md"]],["v-5253f255","/java/others/awesome-java.html",{d:16526592e5,l:"2022年5月16日",c:["Java 其他"],g:["Java 其他"],e:`<h1> Java资源大全中文版</h1>
<p>Awesome 系列虽然挺全，但基本只对收录的资源做了极为简要的介绍，如果有更详细的中文介绍，对相应开发者的帮助会更大。这也是我们发起这个开源项目的初衷。</p>
<h2> 古董级工具</h2>
<p><em>这些工具伴随着Java一起出现，在各自辉煌之后还在一直使用。</em></p>
<ul>
<li><a href="http://www.importnew.com/apache-ant/" target="_blank" rel="noopener noreferrer">Apache Ant</a>：基于XML的构建管理工具。<a href="http://ant.apache.org/" target="_blank" rel="noopener noreferrer">官网</a></li>
<li><a href="http://www.importnew.com/cglib/" target="_blank" rel="noopener noreferrer">cglib</a>：字节码生成库。<a href="https://github.com/cglib/cglib" target="_blank" rel="noopener noreferrer">官网</a></li>
<li><a href="http://www.importnew.com/glassfish/" target="_blank" rel="noopener noreferrer">GlassFish</a>：应用服务器，由Oracle赞助支持的Java EE参考实现。<a href="https://glassfish.java.net/" target="_blank" rel="noopener noreferrer">官网</a></li>
<li><a href="http://www.importnew.com/hudson/" target="_blank" rel="noopener noreferrer">Hudson</a>：持续集成服务器，目前仍在活跃开发。<a href="http://hudson-ci.org/" target="_blank" rel="noopener noreferrer">官网</a></li>
<li><a href="http://www.importnew.com/javaserver-faces/" target="_blank" rel="noopener noreferrer">JavaServer Faces</a>：Mojarra是JSF标准的一个开源实现，由Oracle开发。<a href="https://javaserverfaces.java.net/" target="_blank" rel="noopener noreferrer">官网</a></li>
<li><a href="http://www.importnew.com/javaserver-pages/" target="_blank" rel="noopener noreferrer">JavaServer Pages</a>：支持自定义标签库的网站通用模板库。<a href="https://jsp.java.net/" target="_blank" rel="noopener noreferrer">官网</a></li>
<li><a href="http://www.importnew.com/liquibase/" target="_blank" rel="noopener noreferrer">Liquibase</a>：与具体数据库独立的追踪、管理和应用数据库Scheme变化的工具。<a href="http://www.liquibase.org/" target="_blank" rel="noopener noreferrer">官网</a></li>
</ul>`,r:{minutes:31.18,words:9355},y:"a",t:"Java资源大全中文版"},[":md"]],["v-a489f7dc","/java/others/better-java.html",{d:16527456e5,l:"2022年5月17日",c:["Java 其他"],g:["Java 其他"],e:`<h1> Better Java</h1>
<p>Java 虽作为最流行的编程语言之一，但是似乎并没有什么人很享受用它。好吧，Java 确实是这样的一门编程语言，从最近发布不久的 Java 8 开始，为了更好的使用 Java，我决定收集一些库，实践和工具等相关资料。“更好” 是主观的，所以推荐使用我所说的建议的某些部分，而不是一下子全部按照这些建议来做。请尽情添加其他意见并提交 PR。</p>
<h2> Style</h2>
<p>Java 传统的代码风格是被用来编写非常复杂的企业级 JavaBean。新的代码风格看起来会更加整洁，更加正确，并且更加简单。</p>
<h3> Structs</h3>`,r:{minutes:24.81,words:7443},y:"a",t:"Better Java"},[":md"]],["v-2720156a","/java/spring/01.html",{d:168791737e4,y:"a",t:""},[":md"]],["v-4014464e","/java/thread/java-thread-x-juc-AtomicInteger.html",{d:16460064e5,l:"2022年2月28日",c:["Java 多线程"],g:["Java 多线程"],e:`<h1> JUC原子类: CAS, Unsafe和原子类详解</h1>
<blockquote>
<p>JUC中多数类是通过volatile和CAS来实现的，CAS本质上提供的是一种无锁方案，而Synchronized和Lock是互斥锁方案; java原子类本质上使用的是CAS，而CAS底层是通过Unsafe类实现的。所以本章将对CAS, Unsafe和原子类详解。</p>
</blockquote>
<h2> 带着BAT大厂的面试问题去理解</h2>
<blockquote>
<p>提示</p>
<p>请带着这些问题继续后文，会很大程度上帮助你更好的理解相关知识点。</p>
</blockquote>`,r:{minutes:17.94,words:5383},y:"a",t:"JUC原子类: CAS, Unsafe和原子类详解"},[":md"]],["v-55712db9","/java/thread/java-thread-x-juc-collection-BlockingQueue.html",{d:16466976e5,l:"2022年3月8日",c:["Java 多线程"],g:["Java 多线程"],e:`<h1> JUC集合: BlockingQueue详解</h1>
<blockquote>
<p>JUC里的 BlockingQueue 接口表示一个线程安放入和提取实例的队列。本文将给你演示如何使用这个 BlockingQueue，不会讨论如何在 Java 中实现一个你自己的 BlockingQueue。</p>
</blockquote>
<h2> 带着BAT大厂的面试问题去理解</h2>
<blockquote>
<p>提示</p>
<p>请带着这些问题继续后文，会很大程度上帮助你更好的理解相关知识点。</p>
</blockquote>
<ul>
<li>什么是BlockingDeque?</li>
<li>BlockingQueue大家族有哪些? ArrayBlockingQueue, DelayQueue, LinkedBlockingQueue, SynchronousQueue...</li>
<li>BlockingQueue适合用在什么样的场景?</li>
<li>BlockingQueue常用的方法?</li>
<li>BlockingQueue插入方法有哪些? 这些方法(<code>add(o)</code>,<code>offer(o)</code>,<code>put(o)</code>,<code>offer(o, timeout, timeunit)</code>)的区别是什么?</li>
<li>BlockingDeque 与BlockingQueue有何关系，请对比下它们的方法?</li>
<li>BlockingDeque适合用在什么样的场景?</li>
<li>BlockingDeque大家族有哪些?</li>
<li>BlockingDeque 与BlockingQueue实现例子?</li>
</ul>`,r:{minutes:11.16,words:3347},y:"a",t:"JUC集合: BlockingQueue详解"},[":md"]],["v-0e60e6be","/java/thread/java-thread-x-juc-collection-ConcurrentHashMap.html",{d:16464384e5,l:"2022年3月5日",c:["Java 多线程"],g:["Java 多线程"],e:`<h1> JUC集合: ConcurrentHashMap详解</h1>
<blockquote>
<p>JDK1.7之前的ConcurrentHashMap使用分段锁机制实现，JDK1.8则使用数组+链表+红黑树数据结构和CAS原子操作实现ConcurrentHashMap；本文将分别介绍这两种方式的实现方案及其区别。</p>
</blockquote>
<h2> 带着BAT大厂的面试问题去理解</h2>
<blockquote>
<p>提示</p>
<p>请带着这些问题继续后文，会很大程度上帮助你更好的理解相关知识点。</p>
</blockquote>
<ul>
<li>为什么HashTable慢? 它的并发度是什么? 那么ConcurrentHashMap并发度是什么?</li>
<li>ConcurrentHashMap在JDK1.7和JDK1.8中实现有什么差别? JDK1.8解決了JDK1.7中什么问题</li>
<li>ConcurrentHashMap JDK1.7实现的原理是什么? 分段锁机制</li>
<li>ConcurrentHashMap JDK1.8实现的原理是什么? 数组+链表+红黑树，CAS</li>
<li>ConcurrentHashMap JDK1.7中Segment数(concurrencyLevel)默认值是多少? 为何一旦初始化就不可再扩容?</li>
<li>ConcurrentHashMap JDK1.7说说其put的机制?</li>
<li>ConcurrentHashMap JDK1.7是如何扩容的? rehash(注：segment 数组不能扩容，扩容是 segment 数组某个位置内部的数组 HashEntry&lt;K,V&gt;[] 进行扩容)</li>
<li>ConcurrentHashMap JDK1.8是如何扩容的? tryPresize</li>
<li>ConcurrentHashMap JDK1.8链表转红黑树的时机是什么? 临界值为什么是8?</li>
<li>ConcurrentHashMap JDK1.8是如何进行数据迁移的? transfer</li>
</ul>`,r:{minutes:30.13,words:9039},y:"a",t:"JUC集合: ConcurrentHashMap详解"},[":md"]],["v-37193a74","/java/thread/java-thread-x-juc-collection-ConcurrentLinkedQueue.html",{d:16466112e5,l:"2022年3月7日",c:["Java 多线程"],g:["Java 多线程"],e:`<h1> JUC集合: ConcurrentLinkedQueue详解</h1>
<blockquote>
<p>ConcurerntLinkedQueue一个基于链接节点的无界线程安全队列。此队列按照 FIFO(先进先出)原则对元素进行排序。队列的头部是队列中时间最长的元素。队列的尾部 是队列中时间最短的元素。新的元素插入到队列的尾部，队列获取操作从队列头部获得元素。当多个线程共享访问一个公共 collection 时，ConcurrentLinkedQueue是一个恰当的选择。此队列不允许使用null元素。</p>
</blockquote>
<h2> 带着BAT大厂的面试问题去理解</h2>`,r:{minutes:12.04,words:3611},y:"a",t:"JUC集合: ConcurrentLinkedQueue详解"},[":md"]],["v-616b765e","/java/thread/java-thread-x-juc-collection-CopyOnWriteArrayList.html",{d:16465248e5,l:"2022年3月6日",c:["Java 多线程"],g:["Java 多线程"],e:`<h1> JUC集合: CopyOnWriteArrayList详解</h1>
<blockquote>
<p>CopyOnWriteArrayList是ArrayList 的一个线程安全的变体，其中所有可变操作(add、set 等等)都是通过对底层数组进行一次新的拷贝来实现的。COW模式的体现。</p>
</blockquote>
<h2> 带着BAT大厂的面试问题去理解</h2>
<blockquote>
<p>提示</p>
<p>请带着这些问题继续后文，会很大程度上帮助你更好的理解相关知识点。</p>
</blockquote>
<ul>
<li>请先说说非并发集合中Fail-fast机制?</li>
<li>再为什么说ArrayList查询快而增删慢?</li>
<li>对比ArrayList说说CopyOnWriteArrayList的增删改查实现原理? COW基于拷贝</li>
<li>再说下弱一致性的迭代器原理是怎么样的? <code>COWIterator&lt;E&gt;</code></li>
<li>CopyOnWriteArrayList为什么并发安全且性能比Vector好?</li>
<li>CopyOnWriteArrayList有何缺陷，说说其应用场景?</li>
</ul>`,r:{minutes:10.86,words:3259},y:"a",t:"JUC集合: CopyOnWriteArrayList详解"},[":md"]],["v-6a09898a","/java/thread/java-thread-x-juc-executor-ForkJoinPool.html",{d:16470432e5,l:"2022年3月12日",c:["Java 多线程"],g:["Java 多线程"],e:`<h1> JUC线程池: Fork/Join框架详解</h1>
<blockquote>
<p>ForkJoinPool 是JDK 7加入的一个线程池类。Fork/Join 技术是分治算法(Divide-and-Conquer)的并行实现，它是一项可以获得良好的并行性能的简单且高效的设计技术。目的是为了帮助我们更好地利用多处理器带来的好处，使用所有可用的运算能力来提升应用的性能。</p>
</blockquote>
<h2> 带着BAT大厂的面试问题去理解Fork/Join框架</h2>
<blockquote>
<p>提示</p>
<p>请带着这些问题继续后文，会很大程度上帮助你更好的理解Fork/Join框架。</p>
</blockquote>`,r:{minutes:46.96,words:14089},y:"a",t:"JUC线程池: Fork/Join框架详解"},[":md"]],["v-4289cd2a","/java/thread/java-thread-x-juc-executor-FutureTask.html",{d:1646784e6,l:"2022年3月9日",c:["Java 多线程"],g:["Java 多线程"],e:`<h1> JUC线程池: FutureTask详解</h1>
<blockquote>
<p>Future 表示了一个任务的生命周期，是一个可取消的异步运算，可以把它看作是一个异步操作的结果的占位符，它将在未来的某个时刻完成，并提供对其结果的访问。在并发包中许多异步任务类都继承自Future，其中最典型的就是 FutureTask。</p>
</blockquote>
<h2> 带着BAT大厂的面试问题去理解FutureTask</h2>
<blockquote>
<p>提示</p>
<p>请带着这些问题继续后文，会很大程度上帮助你更好的理解FutureTask。</p>
</blockquote>`,r:{minutes:12.3,words:3689},y:"a",t:"JUC线程池: FutureTask详解"},[":md"]],["v-b49ab68c","/java/thread/java-thread-x-juc-executor-ScheduledThreadPoolExecutor.html",{d:16469568e5,l:"2022年3月11日",c:["Java 多线程"],g:["Java 多线程"],e:`<h1> JUC线程池: ScheduledThreadPoolExecutor详解</h1>
<blockquote>
<p>在很多业务场景中，我们可能需要周期性的运行某项任务来获取结果，比如周期数据统计，定时发送数据等。在并发包出现之前，Java 早在1.3就提供了 Timer 类(只需要了解，目前已渐渐被 ScheduledThreadPoolExecutor 代替)来适应这些业务场景。随着业务量的不断增大，我们可能需要多个工作线程运行任务来尽可能的增加产品性能，或者是需要更高的灵活性来控制和监控这些周期业务。这些都是 ScheduledThreadPoolExecutor 诞生的必然性。</p>
</blockquote>`,r:{minutes:10.97,words:3291},y:"a",t:"JUC线程池: ScheduledThreadPoolExecutor详解"},[":md"]],["v-3344b079","/java/thread/java-thread-x-juc-executor-ThreadPoolExecutor.html",{d:16468704e5,l:"2022年3月10日",c:["Java 多线程"],g:["Java 多线程"],e:`<h1> JUC线程池: ThreadPoolExecutor详解</h1>
<blockquote>
<p>本文主要对ThreadPoolExecutor详解。</p>
</blockquote>
<h2> 带着BAT大厂的面试问题去理解</h2>
<blockquote>
<p>提示</p>
<p>请带着这些问题继续后文，会很大程度上帮助你更好的理解相关知识点。</p>
</blockquote>
<ul>
<li>为什么要有线程池?</li>
<li>Java是实现和管理线程池有哪些方式? 请简单举例如何使用。</li>
<li>为什么很多公司不允许使用Executors去创建线程池? 那么推荐怎么使用呢?</li>
<li>ThreadPoolExecutor有哪些核心的配置参数? 请简要说明</li>
<li>ThreadPoolExecutor可以创建哪是哪三种线程池呢?</li>
<li>当队列满了并且worker的数量达到maxSize的时候，会怎么样?</li>
<li>说说ThreadPoolExecutor有哪些RejectedExecutionHandler策略? 默认是什么策略?</li>
<li>简要说下线程池的任务执行机制? execute –&gt; addWorker –&gt;runworker (getTask)</li>
<li>线程池中任务是如何提交的?</li>
<li>线程池中任务是如何关闭的?</li>
<li>在配置线程池的时候需要考虑哪些配置因素?</li>
<li>如何监控线程池的状态?</li>
</ul>`,r:{minutes:24.89,words:7467},y:"a",t:"JUC线程池: ThreadPoolExecutor详解"},[":md"]],["v-29327e8d","/java/thread/java-thread-x-juc-overview.html",{d:164592e7,l:"2022年2月27日",c:["Java 多线程"],g:["Java 多线程"],e:`<h1> JUC - 类汇总和学习指南</h1>
<blockquote>
<p>提示</p>
<p>本文对J.U.C进行知识体系解读，后续的文章还针对<strong>几乎所有的核心的类</strong>以及常用的<code>工具类</code>作了详细的解读; <strong>如果没有时间详细阅读相关章节，可以跟着本文站在一定的高度了解JUC下包的设计和实现</strong>；同时对重要的章节提供跳转链接，您可以链接过去详读。</p>
</blockquote>
<h2> 带着BAT大厂的面试问题去理解</h2>
<blockquote>
<p>提示</p>
<p>请带着这些问题继续后文，会很大程度上帮助你更好的理解相关知识点。</p>
</blockquote>`,r:{minutes:13.57,words:4072},y:"a",t:"JUC - 类汇总和学习指南"},[":md"]],["v-5852c0a4","/java/thread/java-thread-x-juc-tool-countdownlatch.html",{d:16471296e5,l:"2022年3月13日",c:["Java 多线程"],g:["Java 多线程"],e:`<h1> JUC工具类: CountDownLatch详解</h1>
<blockquote>
<p>CountDownLatch底层也是由AQS，用来同步一个或多个任务的常用并发工具类，强制它们等待由其他任务执行的一组操作完成。</p>
</blockquote>
<h2> 带着BAT大厂的面试问题去理解</h2>
<blockquote>
<p>提示</p>
<p>请带着这些问题继续后文，会很大程度上帮助你更好的理解相关知识点。</p>
</blockquote>
<ul>
<li>什么是CountDownLatch?</li>
<li>CountDownLatch底层实现原理?</li>
<li>CountDownLatch一次可以唤醒几个任务? 多个</li>
<li>CountDownLatch有哪些主要方法? await(),countDown()</li>
<li>CountDownLatch适用于什么场景?</li>
<li>写道题：实现一个容器，提供两个方法，add，size 写两个线程，线程1添加10个元素到容器中，线程2实现监控元素的个数，当个数到5个时，线程2给出提示并结束? 使用CountDownLatch 代替wait notify 好处。</li>
</ul>`,r:{minutes:10.68,words:3203},y:"a",t:"JUC工具类: CountDownLatch详解"},[":md"]],["v-6d0d4f46","/java/thread/java-thread-x-juc-tool-cyclicbarrier.html",{d:1647216e6,l:"2022年3月14日",c:["Java 多线程"],g:["Java 多线程"],e:`<h1> JUC工具类: CyclicBarrier详解</h1>
<blockquote>
<p>CyclicBarrier底层是基于ReentrantLock和AbstractQueuedSynchronizer来实现的, 在理解的时候最好和CountDownLatch放在一起理解(相见本文分析)。</p>
</blockquote>
<h2> 带着BAT大厂的面试问题去理解</h2>
<blockquote>
<p>提示</p>
<p>请带着这些问题继续后文，会很大程度上帮助你更好的理解相关知识点。</p>
</blockquote>
<ul>
<li>什么是CyclicBarrier?</li>
<li>CyclicBarrier底层实现原理?</li>
<li>CountDownLatch和CyclicBarrier对比?</li>
<li>CyclicBarrier的核心函数有哪些?</li>
<li>CyclicBarrier适用于什么场景?</li>
</ul>`,r:{minutes:10.78,words:3235},y:"a",t:"JUC工具类: CyclicBarrier详解"},[":md"]],["v-5bebca2c","/java/thread/java-thread-x-juc-tool-exchanger.html",{d:16474752e5,l:"2022年3月17日",c:["Java 多线程"],g:["Java 多线程"],e:`<h1> JUC工具类: Exchanger详解</h1>
<blockquote>
<p>Exchanger是用于线程协作的工具类, 主要用于两个线程之间的数据交换。</p>
</blockquote>
<h2> 带着BAT大厂的面试问题去理解Exchanger</h2>
<blockquote>
<p>提示</p>
<p>请带着这些问题继续后文，会很大程度上帮助你更好的理解Exchanger。</p>
</blockquote>
<ul>
<li>Exchanger主要解决什么问题?</li>
<li>对比SynchronousQueue，为什么说Exchanger可被视为 SynchronousQueue 的双向形式?</li>
<li>Exchanger在不同的JDK版本中实现有什么差别?</li>
<li>Exchanger实现机制?</li>
<li>Exchanger已经有了slot单节点，为什么会加入arena node数组? 什么时候会用到数组?</li>
<li>arena可以确保不同的slot在arena中是不会相冲突的，那么是怎么保证的呢?</li>
<li>什么是伪共享，Exchanger中如何体现的?</li>
<li>Exchanger实现举例</li>
</ul>`,r:{minutes:16.97,words:5091},y:"a",t:"JUC工具类: Exchanger详解"},[":md"]],["v-99933d00","/java/thread/java-thread-x-juc-tool-phaser.html",{d:16473888e5,l:"2022年3月16日",c:["Java 多线程"],g:["Java 多线程"],e:`<h1> JUC工具类: Phaser详解</h1>
<blockquote>
<p>Phaser是JDK 7新增的一个同步辅助类，它可以实现CyclicBarrier和CountDownLatch类似的功能，而且它支持对任务的动态调整，并支持分层结构来达到更高的吞吐量。</p>
</blockquote>
<h2> 带着BAT大厂的面试问题去理解Phaser工具</h2>
<blockquote>
<p>提示</p>
<p>请带着这些问题继续后文，会很大程度上帮助你更好的理解Phaser工具。</p>
</blockquote>
<ul>
<li>Phaser主要用来解决什么问题?</li>
<li>Phaser与CyclicBarrier和CountDownLatch的区别是什么?</li>
<li>如果用CountDownLatch来实现Phaser的功能应该怎么实现?</li>
<li>Phaser运行机制是什么样的?</li>
<li>给一个Phaser使用的示例?</li>
</ul>`,r:{minutes:12.53,words:3759},y:"a",t:"JUC工具类: Phaser详解"},[":md"]],["v-277d5092","/java/thread/java-thread-x-juc-tool-semaphore.html",{d:16473024e5,l:"2022年3月15日",c:["Java 多线程"],g:["Java 多线程"],e:`<h1> JUC工具类: Semaphore详解</h1>
<blockquote>
<p>Semaphore底层是基于AbstractQueuedSynchronizer来实现的。Semaphore称为计数信号量，它允许n个任务同时访问某个资源，可以将信号量看做是在向外分发使用资源的许可证，只有成功获取许可证，才能使用资源。</p>
</blockquote>
<h2> 带着BAT大厂的面试问题去理解</h2>
<blockquote>
<p>提示</p>
<p>请带着这些问题继续后文，会很大程度上帮助你更好的理解相关知识点。</p>
</blockquote>
<ul>
<li>什么是Semaphore?</li>
<li>Semaphore内部原理?</li>
<li>Semaphore常用方法有哪些? 如何实现线程同步和互斥的?</li>
<li>Semaphore适合用在什么场景?</li>
<li>单独使用Semaphore是不会使用到AQS的条件队列?</li>
<li>Semaphore中申请令牌(acquire)、释放令牌(release)的实现?</li>
<li>Semaphore初始化有10个令牌，11个线程同时各调用1次acquire方法，会发生什么?</li>
<li>Semaphore初始化有10个令牌，一个线程重复调用11次acquire方法，会发生什么?</li>
<li>Semaphore初始化有1个令牌，1个线程调用一次acquire方法，然后调用两次release方法，之后另外一个线程调用acquire(2)方法，此线程能够获取到足够的令牌并继续运行吗?</li>
<li>Semaphore初始化有2个令牌，一个线程调用1次release方法，然后一次性获取3个令牌，会获取到吗?</li>
</ul>`,r:{minutes:10.11,words:3033},y:"a",t:"JUC工具类: Semaphore详解"},[":md"]],["v-0d37dc6f","/java/thread/java-thread-x-key-final.html",{d:16458336e5,l:"2022年2月26日",c:["Java 多线程"],g:["Java 多线程"],e:`<h1> 关键字: final详解</h1>
<blockquote>
<p>final 关键字看上去简单，但是真正深入理解的人可以说少之又少，读完本文你就知道我在说什么了。本文将常规的用法简化，提出一些用法和深入的思考。</p>
</blockquote>
<h2> 带着BAT大厂的面试问题去理解final</h2>
<blockquote>
<p>提示</p>
<p>请带着这些问题继续后文，会很大程度上帮助你更好的理解final。</p>
</blockquote>
<ul>
<li>所有的final修饰的字段都是编译期常量吗?</li>
<li>如何理解private所修饰的方法是隐式的final?</li>
<li>说说final类型的类如何拓展? 比如String是final类型，我们想写个MyString复用所有String中方法，同时增加一个新的toMyString()的方法，应该如何做?</li>
<li>final方法可以被重载吗? 可以</li>
<li>父类的final方法能不能够被子类重写? 不可以</li>
<li>说说final域重排序规则?</li>
<li>说说final的原理?</li>
<li>使用 final 的限制条件和局限性?</li>
<li>看本文最后的一个思考题</li>
</ul>`,r:{minutes:14.09,words:4228},y:"a",t:"关键字: final详解"},[":md"]],["v-0cb2d779","/java/thread/java-thread-x-key-synchronized.html",{d:16456608e5,l:"2022年2月24日",c:["Java 多线程"],g:["Java 多线程"],e:`<h1> 关键字: synchronized详解</h1>
<blockquote>
<p>在C程序代码中我们可以利用操作系统提供的互斥锁来实现同步块的互斥访问及线程的阻塞及唤醒等工作。在Java中除了提供Lock API外还在语法层面上提供了synchronized关键字来实现互斥同步原语, 本文将对synchronized关键字详细分析。</p>
</blockquote>
<h2> 带着BAT大厂的面试问题去理解Synchronized</h2>
<blockquote>
<p>提示</p>
<p>请带着这些问题继续后文，会很大程度上帮助你更好的理解synchronized。</p>
</blockquote>`,r:{minutes:25,words:7499},y:"a",t:"关键字: synchronized详解"},[":md"]],["v-6dbf2df1","/java/thread/java-thread-x-key-volatile.html",{d:16457472e5,l:"2022年2月25日",c:["Java 多线程"],g:["Java 多线程"],e:`<h1> 关键字: volatile详解</h1>
<blockquote>
<p>相比Sychronized(重量级锁，对系统性能影响较大)，volatile提供了另一种解决可见性和有序性问题的方案。</p>
</blockquote>
<h2> 带着BAT大厂的面试问题去理解volatile</h2>
<blockquote>
<p>提示</p>
<p>请带着这些问题继续后文，会很大程度上帮助你更好的理解volatile。</p>
</blockquote>
<ul>
<li>volatile关键字的作用是什么?</li>
<li>volatile能保证原子性吗?</li>
<li>之前32位机器上共享的long和double变量的为什么要用volatile? 现在64位机器上是否也要设置呢?</li>
<li>i++为什么不能保证原子性?</li>
<li>volatile是如何实现可见性的? 内存屏障。</li>
<li>volatile是如何实现有序性的? happens-before等</li>
<li>说下volatile的应用场景?</li>
</ul>`,r:{minutes:15.56,words:4669},y:"a",t:"关键字: volatile详解"},[":md"]],["v-7a75b5c4","/java/thread/java-thread-x-lock-AbstractQueuedSynchronizer.html",{d:16461792e5,l:"2022年3月2日",c:["Java 多线程"],g:["Java 多线程"],e:`<h1> JUC锁: 锁核心类AQS详解</h1>
<blockquote>
<p>AbstractQueuedSynchronizer抽象类是核心，需要重点掌握。它提供了一个基于FIFO队列，可以用于构建锁或者其他相关同步装置的基础框架。</p>
</blockquote>
<h2> 带着BAT大厂的面试问题去理解</h2>
<blockquote>
<p>提示</p>
<p>请带着这些问题继续后文，会很大程度上帮助你更好的理解相关知识点。</p>
</blockquote>
<ul>
<li>什么是AQS? 为什么它是核心?</li>
<li>AQS的核心思想是什么? 它是怎么实现的? 底层数据结构等</li>
<li>AQS有哪些核心的方法?</li>
<li>AQS定义什么样的资源获取方式? AQS定义了两种资源获取方式：<code>独占</code>(只有一个线程能访问执行，又根据是否按队列的顺序分为<code>公平锁</code>和<code>非公平锁</code>，如<code>ReentrantLock</code>) 和<code>共享</code>(多个线程可同时访问执行，如<code>Semaphore</code>、<code>CountDownLatch</code>、 <code>CyclicBarrier</code> )。<code>ReentrantReadWriteLock</code>可以看成是组合式，允许多个线程同时对某一资源进行读。</li>
<li>AQS底层使用了什么样的设计模式? 模板</li>
<li>AQS的应用示例?</li>
</ul>`,r:{minutes:34.25,words:10274},y:"a",t:"JUC锁: 锁核心类AQS详解"},[":md"]],["v-5e3906d9","/java/thread/java-thread-x-lock-LockSupport.html",{d:16460928e5,l:"2022年3月1日",c:["Java 多线程"],g:["Java 多线程"],e:`<h1> JUC锁: LockSupport详解</h1>
<blockquote>
<p>LockSupport是锁中的基础，是一个提供锁机制的工具类，所以先对其进行分析。</p>
</blockquote>
<h2> 带着BAT大厂的面试问题去理解</h2>
<blockquote>
<p>提示</p>
<p>请带着这些问题继续后文，会很大程度上帮助你更好的理解相关知识点。</p>
</blockquote>
<ul>
<li>为什么LockSupport也是核心基础类? AQS框架借助于两个类：Unsafe(提供CAS操作)和LockSupport(提供park/unpark操作)</li>
<li>写出分别通过wait/notify和LockSupport的park/unpark实现同步?</li>
<li>LockSupport.park()会释放锁资源吗? 那么Condition.await()呢?</li>
<li>Thread.sleep()、Object.wait()、Condition.await()、LockSupport.park()的区别? 重点</li>
<li>如果在wait()之前执行了notify()会怎样?</li>
<li>如果在park()之前执行了unpark()会怎样?</li>
</ul>`,r:{minutes:11.65,words:3495},y:"a",t:"JUC锁: LockSupport详解"},[":md"]],["v-5f3a45a5","/java/thread/java-thread-x-lock-ReentrantLock.html",{d:16462656e5,l:"2022年3月3日",c:["Java 多线程"],g:["Java 多线程"],e:`<h1> JUC锁: ReentrantLock详解</h1>
<blockquote>
<p>可重入锁ReentrantLock的底层是通过AbstractQueuedSynchronizer实现，所以先要学习上一章节AbstractQueuedSynchronizer详解。</p>
</blockquote>
<h2> 带着BAT大厂的面试问题去理解</h2>
<blockquote>
<p>提示</p>
<p>请带着这些问题继续后文，会很大程度上帮助你更好的理解相关知识点。</p>
</blockquote>
<ul>
<li>什么是可重入，什么是可重入锁? 它用来解决什么问题?</li>
<li>ReentrantLock的核心是AQS，那么它怎么来实现的，继承吗? 说说其类内部结构关系。</li>
<li>ReentrantLock是如何实现公平锁的?</li>
<li>ReentrantLock是如何实现非公平锁的?</li>
<li>ReentrantLock默认实现的是公平还是非公平锁?</li>
<li>使用ReentrantLock实现公平和非公平锁的示例?</li>
<li>ReentrantLock和Synchronized的对比?</li>
</ul>`,r:{minutes:8.52,words:2557},y:"a",t:"JUC锁: ReentrantLock详解"},[":md"]],["v-680a9b6e","/java/thread/java-thread-x-lock-ReentrantReadWriteLock.html",{d:1646352e6,l:"2022年3月4日",c:["Java 多线程"],g:["Java 多线程"],e:`<h1> JUC锁: ReentrantReadWriteLock详解</h1>
<blockquote>
<p>ReentrantReadWriteLock表示可重入读写锁，ReentrantReadWriteLock中包含了两种锁，读锁ReadLock和写锁WriteLock，可以通过这两种锁实现线程间的同步。</p>
</blockquote>
<h2> 带着BAT大厂的面试问题去理解</h2>
<blockquote>
<p>提示</p>
<p>请带着这些问题继续后文，会很大程度上帮助你更好的理解相关知识点。</p>
</blockquote>
<ul>
<li>为了有了ReentrantLock还需要ReentrantReadWriteLock?</li>
<li>ReentrantReadWriteLock底层实现原理?</li>
<li>ReentrantReadWriteLock底层读写状态如何设计的? 高16位为读锁，低16位为写锁</li>
<li>读锁和写锁的最大数量是多少?</li>
<li>本地线程计数器ThreadLocalHoldCounter是用来做什么的?</li>
<li>缓存计数器HoldCounter是用来做什么的?</li>
<li>写锁的获取与释放是怎么实现的?</li>
<li>读锁的获取与释放是怎么实现的?</li>
<li>RentrantReadWriteLock为什么不支持锁升级?</li>
<li>什么是锁的升降级? RentrantReadWriteLock为什么不支持锁升级?</li>
</ul>`,r:{minutes:16.2,words:4860},y:"a",t:"JUC锁: ReentrantReadWriteLock详解"},[":md"]],["v-15b7a148","/java/thread/java-thread-x-lock-all.html",{d:16455744e5,l:"2022年2月23日",c:["Java 多线程"],g:["Java 多线程"],e:`<h1> Java并发 - Java中所有的锁</h1>
<blockquote>
<p>Java提供了种类丰富的锁，每种锁因其特性的不同，在适当的场景下能够展现出非常高的效率。本文旨在对锁相关源码（本文中的源码来自JDK 8和Netty 3.10.6）、使用场景进行举例，为读者介绍主流锁的知识点，以及不同的锁的适用场景。</p>
</blockquote>
<h2> 前言</h2>
<p>Java提供了种类丰富的锁，每种锁因其特性的不同，在适当的场景下能够展现出非常高的效率。本文旨在对锁相关源码（本文中的源码来自JDK 8和Netty 3.10.6）、使用场景进行举例，为读者介绍主流锁的知识点，以及不同的锁的适用场景。</p>`,r:{minutes:13.55,words:4066},y:"a",t:"Java并发 - Java中所有的锁"},[":md"]],["v-1549f7bc","/java/thread/java-thread-x-overview.html",{d:16453152e5,l:"2022年2月20日",c:["Java 多线程"],g:["Java 多线程"],e:`<h1> ♥Java并发知识体系详解♥</h1>
<blockquote>
<p>Java 并发相关知识体系详解，包含理论基础，线程基础，synchronized，volatile，final关键字, JUC框架等内容。</p>
</blockquote>
<h2> 知识体系</h2>
<figure><img src="https://www.pdai.tech/images/java/java-concurrent-overview-1.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>`,r:{minutes:12.51,words:3752},y:"a",t:"♥Java并发知识体系详解♥"},[":md"]],["v-53ba6f7e","/java/thread/java-thread-x-theorty.html",{d:16454016e5,l:"2022年2月21日",c:["Java 多线程"],g:["Java 多线程"],e:`<h1> Java 并发 - 理论基础</h1>
<blockquote>
<p>本文从理论的角度引入并发安全问题以及JMM应对并发问题的原理。</p>
</blockquote>
<h2> 带着BAT大厂的面试问题去理解</h2>
<blockquote>
<p>提示</p>
<p>请带着这些问题继续后文，会很大程度上帮助你更好的理解并发理论基础。</p>
</blockquote>
<ul>
<li>多线程的出现是要解决什么问题的?</li>
<li>线程不安全是指什么? 举例说明</li>
<li>并发出现线程不安全的本质什么? 可见性，原子性和有序性。</li>
<li>Java是怎么解决并发问题的? 3个关键字，JMM和8个Happens-Before</li>
<li>线程安全是不是非真即假? 不是</li>
<li>线程安全有哪些实现思路?</li>
<li>如何理解并发和并行的区别?</li>
</ul>`,r:{minutes:19.41,words:5823},y:"a",t:"Java 并发 - 理论基础"},[":md"]],["v-9ba68da0","/java/thread/java-thread-x-thread-basic.html",{d:1645488e6,l:"2022年2月22日",c:["Java 多线程"],g:["Java 多线程"],e:`<h1> Java 并发 - 线程基础</h1>
<blockquote>
<p>本文主要概要性的介绍线程的基础，为后面的章节深入介绍Java并发的知识提供基础。</p>
</blockquote>
<h2> 带着BAT大厂的面试问题去理解</h2>
<blockquote>
<p>提示</p>
<p>请带着这些问题继续后文，会很大程度上帮助你更好的理解线程基础。</p>
</blockquote>
<ul>
<li>线程有哪几种状态? 分别说明从一种状态到另一种状态转变有哪些方式?</li>
<li>通常线程有哪几种使用方式?</li>
<li>基础线程机制有哪些?</li>
<li>线程的中断方式有哪些?</li>
<li>线程的互斥同步方式有哪些? 如何比较和选择?</li>
<li>线程之间有哪些协作方式?</li>
</ul>`,r:{minutes:11.57,words:3472},y:"a",t:"Java 并发 - 线程基础"},[":md"]],["v-b7b80514","/java/thread/java-thread-x-threadlocal.html",{d:16475616e5,l:"2022年3月18日",c:["Java 多线程"],g:["Java 多线程"],e:`<h1> Java 并发 - ThreadLocal详解</h1>
<blockquote>
<p>ThreadLocal是通过线程隔离的方式防止任务在共享资源上产生冲突, 线程本地存储是一种自动化机制，可以为使用相同变量的每个不同线程都创建不同的存储。</p>
</blockquote>
<h2> 带着BAT大厂的面试问题去理解</h2>
<blockquote>
<p>提示</p>
<p>请带着这些问题继续后文，会很大程度上帮助你更好的理解相关知识点。</p>
</blockquote>
<ul>
<li>什么是ThreadLocal? 用来解决什么问题的?</li>
<li>说说你对ThreadLocal的理解</li>
<li>ThreadLocal是如何实现线程隔离的?</li>
<li>为什么ThreadLocal会造成内存泄露? 如何解决</li>
<li>还有哪些使用ThreadLocal的应用场景?</li>
</ul>`,r:{minutes:12.69,words:3806},y:"a",t:"Java 并发 - ThreadLocal详解"},[":md"]],["v-7ec73772","/tool/docker/01.html",{d:168791737e4,e:`<p>docker</p>
`,r:{minutes:0,words:1},y:"a",t:""},[":md"]],["v-24ff8d05","/tool/git/overview.html",{d:168791737e4,e:`<h1> git 教程</h1>
`,r:{minutes:.01,words:3},y:"a",t:"git 教程"},[":md"]],["v-36a31b6e","/tool/gradle/01.html",{d:169753443e4,e:`<p>[TOC]</p>
<h1> 1、Gradle是什么</h1>
<h2> 1.1 简介</h2>
<p>Gradle是一个基于Apache Ant和Apache Maven概念的项目自动化构建开源工具;<a href="https://docs.gradle.org/current/userguide/userguide.html" target="_blank" rel="noopener noreferrer">官网</a></p>
<ul>
<li>Gradle是一个基于JVM的构建工具</li>
<li>是一款通用灵活的构建工具</li>
<li>支持maven， Ivy仓库</li>
<li>支持传递性依赖管理，而不需要远程仓库或者是pom.xml和ivy.xml配置文件</li>
<li>基于Groovy，build脚本使用Groovy编写</li>
<li>它使用一种基于Groovy的特定领域语言(DSL)来声明项目设置</li>
<li>目前也增加了基于Kotlin语言的kotlin-based DSL，抛弃了基于XML的各种繁琐配置</li>
<li>面向Java应用为主。当前其支持的语言C++、Java、Groovy、Kotlin、Scala和Swift，计划未来将支持更多的语言</li>
<li>gradle对多工程的构建支持很出色，工程依赖是gradle的第一功能</li>
<li>gradle支持局部构建</li>
<li>支持多方式依赖管理：包括从maven远程仓库、nexus私服、ivy仓库以及本地文件系统的jars或者dirs</li>
<li>gradle是第一个构建集成工具，与ant、maven、ivy有良好的相容相关性</li>
<li>轻松迁移：gradle适用于任何结构的工程，你可以在同一个开发平台平行构建原工程和gradle工程。通常要求写相关测试，以保证开发的插件的相似性，这种迁移可以减少破坏性，尽可能的可靠。这也是重构的最佳实践</li>
<li>gradle的整体设计是以作为一种语言为导向的，而非成为一个严格死板的框架</li>
<li>免费开源</li>
</ul>`,r:{minutes:30.1,words:9031},y:"a",t:"1、Gradle是什么"},[":md"]],["v-22a65513","/develop/algorithms-structures/alg-basic/alg-basic-array.html",{d:15604704e5,l:"2019年6月14日",c:["算法和数据结构"],g:["数据结构"],e:`<h1> 线性表 - 数组和矩阵</h1>
<blockquote>
<p>数组是一种连续存储线性结构，元素类型相同，大小相等，数组是多维的，通过使用整型索引值来访问他们的元素，数组尺寸不能改变。</p>
</blockquote>
<h2> 知识点</h2>
<p>数组的优点:</p>
<ul>
<li>存取速度快</li>
</ul>
<p>数组的缺点:</p>
<ul>
<li>事先必须知道数组的长度</li>
<li>插入删除元素很慢</li>
<li>空间通常是有限制的</li>
<li>需要大块连续的内存块</li>
<li>插入删除元素的效率很低</li>
</ul>
<p>JDK中关于ArrayList的实现，请参考:</p>`,r:{minutes:6.73,words:2018},y:"a",t:"线性表 - 数组和矩阵"},[":md"]],["v-5abdef58","/develop/algorithms-structures/alg-basic/alg-basic-graph-aoe.html",{d:15617664e5,l:"2019年6月29日",c:["算法和数据结构"],g:["数据结构"],e:`<h1> 图 - AOE &amp; 关键路径</h1>
<blockquote>
<p>关键路径在项目管理计算工期等方面有广泛等应用，提升工期就是所见缩减所有关键路径上的工期，并且在实现时需要应用到之前拓扑排序的算法(前提: 有向无环图，有依赖关系)。</p>
</blockquote>
<h2> 关键路径相关名词</h2>
<p>相关术语:</p>
<ul>
<li><code>AOV网络(Activity On Vertex Network)</code>: 有向图，用顶点表示活动，用弧表示活动的先后顺序</li>
<li><code>AOE网络(Activity On Edge)</code>: 有向图，用顶点表示事件，用弧表示活动，用权值表示活动消耗时间(带权的有向无环图)</li>
<li><code>活动</code>: 业务逻辑中的行为，用边表示</li>
<li><code>事件</code>: 活动的结果或者触发条件</li>
<li><code>关键路径</code>: 具有最大路径长度(权重)的路径，可能不止一条</li>
<li><code>活动的两个属性</code>: e(i)最早开始时间，l(i)最晚开始时间</li>
<li><code>事件的两个属性</code>: ve(j)最早开始时间，vl(j)最晚开始时间</li>
</ul>`,r:{minutes:2.53,words:760},y:"a",t:"图 - AOE & 关键路径"},[":md"]],["v-25cc54b8","/develop/algorithms-structures/alg-basic/alg-basic-graph-bfs-dfs.html",{d:15614208e5,l:"2019年6月25日",c:["算法和数据结构"],g:["数据结构"],e:`<h1> 图 - 遍历(BFS &amp; DFS)</h1>
<blockquote>
<p>图的深度优先搜索(Depth First Search)，和树的先序遍历比较类似; 广度优先搜索算法(Breadth First Search)，又称为"宽度优先搜索"或"横向优先搜索"。</p>
</blockquote>
<h2> 深度优先搜索</h2>
<h3> 深度优先搜索介绍</h3>
<p>它的思想: 假设初始状态是图中所有顶点均未被访问，则从某个顶点v出发，首先访问该顶点，然后依次从它的各个未被访问的邻接点出发深度优先搜索遍历图，直至图中所有和v有路径相通的顶点都被访问到。 若此时尚有其他顶点未被访问到，则另选一个未被访问的顶点作起始点，重复上述过程，直至图中所有顶点都被访问到为止。</p>`,r:{minutes:17.98,words:5395},y:"a",t:"图 - 遍历(BFS & DFS)"},[":md"]],["v-5d6c8a12","/develop/algorithms-structures/alg-basic/alg-basic-graph-min-distance.html",{d:15615936e5,l:"2019年6月27日",c:["算法和数据结构"],g:["数据结构"],e:`<h1> 图 - 最短路径(Dijkstra &amp; Frolyd)</h1>
<blockquote>
<p>最短路径有着广泛的应用，比如地图两点间距离计算，公交查询系统，路由选择等。</p>
</blockquote>
<h2> 最短路径介绍</h2>
<p>最短路径问题是图论研究中的一个经典算法问题，旨在寻找图(由结点和路径组成的)中两结点之间的最短路径。最短路径不一定是经过边最少的路径，但在这些最短路径中，长度最短的那一条路径上只有一条边，且它的权值在从源点出发的所有边的权值最小。</p>
<p>从图中某一顶点(称为源点)到达另一顶点(称为终点)的路径可能不止一条，如何找到一条路径使得沿此路径上各边上的权值总和达到最小，例: 公交查询系统。</p>`,r:{minutes:3.61,words:1082},y:"a",t:"图 - 最短路径(Dijkstra & Frolyd)"},[":md"]],["v-ca42b324","/develop/algorithms-structures/alg-basic/alg-basic-graph-min-tree.html",{d:15615072e5,l:"2019年6月26日",c:["算法和数据结构"],g:["数据结构"],e:`<h1> 图 - 最小生成树(Prim &amp; Kruskal)</h1>
<blockquote>
<p>Kruskal算法是从最小权重边着手，将森林里的树逐渐合并；prim算法是从顶点出发，在根结点的基础上建起一棵树。</p>
</blockquote>
<h2> 最小生成树相关名词</h2>
<ul>
<li><code>连通图</code>: 在无向图中，若任意两个顶点vivi与vjvj都有路径相通，则称该无向图为连通图。</li>
<li><code>强连通图</code>: 在有向图中，若任意两个顶点vivi与vjvj都有路径相通，则称该有向图为强连通图。</li>
<li><code>连通网</code>: 在连通图中，若图的边具有一定的意义，每一条边都对应着一个数，称为权；权代表着连接连个顶点的代价，称这种连通图叫做连通网。</li>
<li><code>生成树</code>: 一个连通图的生成树是指一个连通子图，它含有图中全部n个顶点，但只有足以构成一棵树的n-1条边。一颗有n个顶点的生成树有且仅有n-1条边，如果生成树中再添加一条边，则必定成环。</li>
<li><code>最小生成树</code>: 在连通网的所有生成树中，所有边的代价和最小的生成树，称为最小生成树。</li>
</ul>`,r:{minutes:2.76,words:828},y:"a",t:"图 - 最小生成树(Prim & Kruskal)"},[":md"]],["v-03dcd98c","/develop/algorithms-structures/alg-basic/alg-basic-graph-topo-sort.html",{d:156168e7,l:"2019年6月28日",c:["算法和数据结构"],g:["数据结构"],e:`<h1> 图 - 拓扑排序(Topological sort)</h1>
<blockquote>
<p>拓扑排序主要用来解决有向图中的依赖解析(dependency resolution)问题。</p>
</blockquote>
<h2> 拓扑排序介绍</h2>
<p>对于任何有向图而言，其拓扑排序为其所有结点的一个线性排序(对于同一个有向图而言可能存在多个这样的结点排序)。该排序满足这样的条件——对于图中的任意两个结点u和v，若存在一条有向边从u指向v，则在拓扑排序中u一定出现在v前面。</p>
<p>例如一个有向无环图如下:</p>
<figure><img src="https://www.pdai.tech/images/alg/alg-graph-topo-sort-1.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>`,r:{minutes:4.07,words:1222},y:"a",t:"图 - 拓扑排序(Topological sort)"},[":md"]],["v-1a33d184","/develop/algorithms-structures/alg-basic/alg-basic-graph.html",{d:15613344e5,l:"2019年6月24日",c:["算法和数据结构"],g:["数据结构"],e:`<h1> 图 - 基础和Overview</h1>
<blockquote>
<p>图(Graph)是由顶点和连接顶点的边构成的离散结构。在计算机科学中，图是最灵活的数据结构之一，很多问题都可以使用图模型进行建模求解。例如: 生态环境中不同物种的相互竞争、人与人之间的社交与关系网络、化学上用图区分结构不同但分子式相同的同分异构体、分析计算机网络的拓扑结构确定两台计算机是否可以通信、找到两个城市之间的最短路径等等。</p>
</blockquote>
<h2> 图的基础</h2>
<h3> 定义</h3>
<p>图(Graph)是由顶点的有穷非空集合和顶点之间边的集合组成，通常表示为: G(V,E)，其中，G表示一个图，V是图G中顶点的集合，E是图G中边的集合。</p>`,r:{minutes:9.28,words:2783},y:"a",t:"图 - 基础和Overview"},[":md"]],["v-1ba9c2cc","/develop/algorithms-structures/alg-basic/alg-basic-hashtable.html",{d:15606432e5,l:"2019年6月16日",c:["算法和数据结构"],g:["数据结构"],e:`<h1> 线性表(散列) - 哈希表</h1>
<blockquote>
<p>散列表（Hash table，也叫哈希表），是根据关键码值(Key value)而直接进行访问的数据结构。也就是说，它通过把关键码值映射到表中一个位置来访问记录，以加快查找的速度。这个映射函数叫做散列函数，存放记录的数组叫做散列表。</p>
</blockquote>
<h2> 哈希表相关题目</h2>
<p>哈希表使用 O(N) 空间复杂度存储数据，并且以 O(1) 时间复杂度求解问题。</p>
<ul>
<li>Java 中的 <strong>HashSet</strong> 用于存储一个集合，可以查找元素是否在集合中。如果元素有穷，并且范围不大，那么可以用一个布尔数组来存储一个元素是否存在。例如对于只有小写字符的元素，就可以用一个长度为 26 的布尔数组来存储一个字符集合，使得空间复杂度降低为 O(1)。</li>
<li>Java 中的 <strong>HashMap</strong> 主要用于映射关系，从而把两个元素联系起来。HashMap 也可以用来对元素进行计数统计，此时键为元素，值为计数。和 HashSet 类似，如果元素有穷并且范围不大，可以用整型数组来进行统计。在对一个内容进行压缩或者其它转换时，利用 HashMap 可以把原始内容和转换后的内容联系起来。例如在一个简化 url 的系统中 <a href="https://leetcode.com/problems/encode-and-decode-tinyurl/description/" target="_blank" rel="noopener noreferrer">Leetcdoe : 535. Encode and Decode TinyURL (Medium)在新窗口打开</a>，利用 HashMap 就可以存储精简后的 url 到原始 url 的映射，使得不仅可以显示简化的 url，也可以根据简化的 url 得到原始 url 从而定位到正确的资源。</li>
</ul>`,r:{minutes:3.23,words:970},y:"a",t:"线性表(散列) - 哈希表"},[":md"]],["v-17ccac6e","/develop/algorithms-structures/alg-basic/alg-basic-linklist.html",{d:15605568e5,l:"2019年6月15日",c:["算法和数据结构"],g:["数据结构"],e:`<h1> 线性表 - 链表</h1>
<blockquote>
<p>n个节点离散分配，彼此通过指针相连，每个节点只有一个前驱节点，每个节点只有一个后续节点，首节点没有前驱节点，尾节点没有后续节点。确定一个链表我们只需要头指针，通过头指针就可以把整个链表都能推出来。</p>
</blockquote>
<h2> 知识点</h2>
<h3> 优缺点</h3>
<p>链表优点</p>
<ul>
<li>空间没有限制</li>
<li>插入删除元素很快</li>
</ul>
<p>链表缺点 存取速度很慢</p>
<h3> 分类</h3>
<ul>
<li>单向链表 一个节点指向下一个节点。</li>
<li>双向链表 一个节点有两个指针域。</li>
<li>循环链表 能通过任何一个节点找到其他所有的节点，将两种(双向/单向)链表的最后一个结点指向第一个结点从而实现循环。</li>
</ul>`,r:{minutes:5.64,words:1693},y:"a",t:"线性表 - 链表"},[":md"]],["v-b6f2d1a6","/develop/algorithms-structures/alg-basic/alg-basic-overview.html",{d:1560384e6,l:"2019年6月13日",c:["算法和数据结构"],g:["数据结构"],e:`<h1> ♥数据结构基础知识体系详解♥</h1>
<p>提示</p>
<p>对于数据结构这种基础内容，在构建其知识体系时要避免自己再造轮子，需要高一点层次整体上去理解它(格局要大一点，不要盯着代码)，要了解算法思想，性能及适用场景，用一些工具和别人梳理的结果帮助自己构建知识体系等。</p>
<h2> 知识体系</h2>
<p><em>知识体系系统性梳理</em></p>
<figure><img src="https://www.pdai.tech/images/alg/alg-overview-x.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>`,r:{minutes:8.95,words:2685},y:"a",t:"♥数据结构基础知识体系详解♥"},[":md"]],["v-65370d32","/develop/algorithms-structures/alg-basic/alg-basic-stack_queue.html",{d:15607296e5,l:"2019年6月17日",c:["算法和数据结构"],g:["数据结构"],e:`<h1> 线性表 - 栈和队列</h1>
<blockquote>
<p>数组和链表都是线性存储结构的基础，栈和队列都是线性存储结构的应用。</p>
</blockquote>
<h2> 知识点</h2>
<h3> 栈 - LIFO</h3>
<p>示意图</p>
<figure><img src="https://www.pdai.tech/images/alg/alg-stack-1.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>
<p>实现</p>
<ul>
<li>使用数组实现的叫<code>静态栈</code></li>
<li>使用链表实现的叫<code>动态栈</code></li>
</ul>`,r:{minutes:3.21,words:963},y:"a",t:"线性表 - 栈和队列"},[":md"]],["v-31709ef9","/develop/algorithms-structures/alg-basic/alg-basic-tree-balance.html",{d:15609888e5,l:"2019年6月20日",c:["算法和数据结构"],g:["数据结构"],e:`<h1> 树 - 平衡二叉树(AVL)</h1>
<blockquote>
<p>平衡二叉树（Balanced Binary Tree）具有以下性质：它是一棵空树或它的左右两个子树的高度差的绝对值不超过1，并且左右两个子树都是一棵平衡二叉树。平衡二叉树的常用实现方法有红黑树、AVL、替罪羊树、Treap、伸展树等。 最小二叉平衡树的节点的公式如下 F(n)=F(n-1)+F(n-2)+1 这个类似于一个递归的数列，可以参考Fibonacci数列，1是根节点，F(n-1)是左子树的节点数量，F(n-2)是右子树的节点数量。</p>
</blockquote>
<h2> 什么是AVL树</h2>
`,r:{minutes:19.07,words:5721},y:"a",t:"树 - 平衡二叉树(AVL)"},[":md"]],["v-e33b5360","/develop/algorithms-structures/alg-basic/alg-basic-tree-hafman.html",{d:15611616e5,l:"2019年6月22日",c:["算法和数据结构"],g:["数据结构"],e:`<h1> 树 - 哈夫曼树(Huffman Tree)</h1>
<blockquote>
<p>哈夫曼又称最优二叉树, 是一种带权路径长度最短的二叉树。(注意带权路径WPL是指叶子节点，很多网上的文章有误导)</p>
</blockquote>
<h2> 哈夫曼树相关名词</h2>
<p>先看一棵哈夫曼树: (哈夫曼树推理是通过叶子节点，所以理解的时候需要忽略非叶子节点，很多文章在这点上有误导)</p>
<figure><img src="https://www.pdai.tech/images/alg/alg-tree-hafman-1.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>`,r:{minutes:7.13,words:2138},y:"a",t:"树 - 哈夫曼树(Huffman Tree)"},[":md"]],["v-53875b8f","/develop/algorithms-structures/alg-basic/alg-basic-tree-redblack.html",{d:15610752e5,l:"2019年6月21日",c:["算法和数据结构"],g:["数据结构"],e:`<h1> 树 - 红黑树(R-B Tree)</h1>
<blockquote>
<p>红黑树（Red Black Tree） 是一种自平衡二叉查找树，是在计算机科学中用到的一种数据结构，典型的用途是实现关联数组，是平衡二叉树和AVL树的折中。</p>
</blockquote>
<p>提示</p>
<p>红黑树的讲解在<a href="">JDK TreeMap&amp;TreeSet源码解读</a>中有详细的展示 。这里再补充一些其它内容。</p>
<h2> 为什么要有红黑树</h2>
<p>我们在上一篇博客认识到了平衡二叉树(AVLTree)，了解到AVL树的性质，其实平衡二叉树最大的作用就是查找,AVL树的查找、插入和删除在平均和最坏情况下都是O(logn)。AVL树的效率就是高在这个地方。如果在AVL树中插入或删除节点后，使得高度之差大于1。此时，AVL树的平衡状态就被破坏，它就不再是一棵二叉树；为了让它重新维持在一个平衡状态，就需要对其进行旋转处理, 那么创建一颗平衡二叉树的成本其实不小. 这个时候就有人开始思考，并且提出了红黑树的理论，那么红黑树到底比AVL树好在哪里?</p>`,r:{minutes:2.34,words:701},y:"a",t:"树 - 红黑树(R-B Tree)"},[":md"]],["v-46fae135","/develop/algorithms-structures/alg-basic/alg-basic-tree-search.html",{d:15609024e5,l:"2019年6月19日",c:["算法和数据结构"],g:["数据结构"],e:`<h1> 树 - 二叉搜索树(BST)</h1>
<blockquote>
<p>本文主要介绍 二叉树中最基本的二叉查找树（Binary Search Tree），（又：二叉搜索树，二叉排序树）它或者是一棵空树，或者是具有下列性质的二叉树： 若它的左子树不空，则左子树上所有结点的值均小于它的根结点的值； 若它的右子树不空，则右子树上所有结点的值均大于它的根结点的值； 它的左、右子树也分别为二叉排序树。</p>
</blockquote>
<h2> BST的定义</h2>
<p>在二叉查找树中:</p>
<ul>
<li>若任意节点的左子树不空，则左子树上所有结点的值均小于它的根结点的值；</li>
<li>任意节点的右子树不空，则右子树上所有结点的值均大于它的根结点的值；</li>
<li>任意节点的左、右子树也分别为二叉查找树。</li>
<li>没有键值相等的节点。</li>
</ul>`,r:{minutes:16.78,words:5033},y:"a",t:"树 - 二叉搜索树(BST)"},[":md"]],["v-7e737b03","/develop/algorithms-structures/alg-basic/alg-basic-tree-trie.html",{d:1561248e6,l:"2019年6月23日",c:["算法和数据结构"],g:["数据结构"],e:`<h1> 树 - 前缀树(Trie Tree)</h1>
<blockquote>
<p>Trie，又称字典树、单词查找树或键树，是一种树形结构，是一种哈希树的变种。典型应用是用于统计，排序和保存大量的字符串（但不仅限于字符串），所以经常被搜索引擎系统用于文本词频统计。它的优点是：利用字符串的公共前缀来减少查询时间，最大限度地减少无谓的字符串比较，查询效率比哈希树高。</p>
</blockquote>
<h2> 什么是前缀树</h2>
<p>在计算机科学中，trie，又称前缀树或字典树，是一种有序树，用于保存关联数组，其中的键通常是字符串。与二叉查找树不同，键不是直接保存在节点中，而是由节点在树中的位置决定。一个节点的所有子孙都有相同的前缀，也就是这个节点对应的字符串，而根节点对应空字符串。一般情况下，不是所有的节点都有对应的值，只有叶子节点和部分内部节点所对应的键才有相关的值。</p>`,r:{minutes:8.17,words:2451},y:"a",t:"树 - 前缀树(Trie Tree)"},[":md"]],["v-7ead82b0","/develop/algorithms-structures/alg-basic/alg-basic-tree.html",{d:1560816e6,l:"2019年6月18日",c:["算法和数据结构"],g:["数据结构"],e:`<h1> 树 - 基础和Overview</h1>
<blockquote>
<p>树在数据结构中至关重要，这里展示树的整体知识体系结构和几种常见树类型。</p>
</blockquote>
<h2> 知识体系结构</h2>
<figure><img src="https://www.pdai.tech/images/alg/alg-tree-0.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>
<h2> 树</h2>
<p>树是一种数据结构，它是n(n&gt;=0)个节点的有限集。n=0时称为空树。n&gt;0时，有限集的元素构成一个具有层次感的数据结构。</p>`,r:{minutes:11.08,words:3323},y:"a",t:"树 - 基础和Overview"},[":md"]],["v-2ca438ac","/develop/algorithms-structures/alg-core/alg-core-backtracking.html",{d:15632352e5,l:"2019年7月16日",c:["算法和数据结构"],g:["算法思想"],e:`<h1> 算法思想 - 回溯算法</h1>
<blockquote>
<p>Backtracking(回溯)属于 DFS, 本文主要介绍算法中Backtracking算法的思想。回溯算法实际上一个类似枚举的搜索尝试过程，主要是在搜索尝试过程中寻找问题的解，当发现已不满足求解条件时，就“回溯”返回，尝试别的路径。回溯法是一种选优搜索法，按选优条件向前搜索，以达到目标。但当探索到某一步时，发现原先选择并不优或达不到目标，就退回一步重新选择，这种走不通就退回再走的技术为回溯法</p>
</blockquote>
<h2> Backtracking</h2>
<ul>
<li>普通 DFS 主要用在 <strong>可达性问题</strong> ，这种问题只需要执行到特点的位置然后返回即可。</li>
<li>而 Backtracking 主要用于求解 <strong>排列组合</strong> 问题，例如有 { 'a','b','c' } 三个字符，求解所有由这三个字符排列得到的字符串，这种问题在执行到特定的位置返回之后还会继续执行求解过程。</li>
</ul>`,r:{minutes:9.84,words:2953},y:"a",t:"算法思想 - 回溯算法"},[":md"]],["v-be269f54","/develop/algorithms-structures/alg-core/alg-core-devide-two.html",{d:15630624e5,l:"2019年7月14日",c:["算法和数据结构"],g:["算法思想"],e:`<h1> 算法思想 - 二分法</h1>
<blockquote>
<p>本文主要介绍算法思想中分治算法重要的二分法，比如二分查找；二分查找也称折半查找（Binary Search），它是一种效率较高的查找方法。但是，折半查找要求线性表必须采用顺序存储结构，而且表中元素按关键字有序排列。</p>
</blockquote>
<h2> 二分查找</h2>
<h3> 正常实现</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">binarySearch</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> nums<span class="token punctuation">,</span> <span class="token keyword">int</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> l <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> h <span class="token operator">=</span> nums<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>l <span class="token operator">&lt;=</span> h<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> m <span class="token operator">=</span> l <span class="token operator">+</span> <span class="token punctuation">(</span>h <span class="token operator">-</span> l<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>nums<span class="token punctuation">[</span>m<span class="token punctuation">]</span> <span class="token operator">==</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> m<span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>nums<span class="token punctuation">[</span>m<span class="token punctuation">]</span> <span class="token operator">&gt;</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            h <span class="token operator">=</span> m <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            l <span class="token operator">=</span> m <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,r:{minutes:5.54,words:1663},y:"a",t:"算法思想 - 二分法"},[":md"]],["v-496c7e61","/develop/algorithms-structures/alg-core/alg-core-divide-and-conquer.html",{d:15628032e5,l:"2019年7月11日",c:["算法和数据结构"],g:["算法思想"],e:`<h1> 算法思想 - 分治算法</h1>
<blockquote>
<p>分治算法的基本思想是将一个规模为N的问题分解为K个规模较小的子问题，这些子问题相互独立且与原问题性质相同。求出子问题的解，就可得到原问题的解。</p>
</blockquote>
<h2> 分治相关题目</h2>
<h3> 给表达式加括号</h3>
<p><a href="https://leetcode.com/problems/different-ways-to-add-parentheses/description/" target="_blank" rel="noopener noreferrer">241. Different Ways to Add Parentheses (Medium)在新窗口打开</a></p>`,r:{minutes:.71,words:214},y:"a",t:"算法思想 - 分治算法"},[":md"]],["v-37a513a9","/develop/algorithms-structures/alg-core/alg-core-dynamic.html",{d:15628896e5,l:"2019年7月12日",c:["算法和数据结构"],g:["算法思想"],e:`<h1> 算法思想 - 动态规划算法</h1>
<blockquote>
<p>动态规划算法通常用于求解具有某种最优性质的问题。在这类问题中，可能会有许多可行解。每一个解都对应于一个值，我们希望找到具有最优值的解。动态规划算法与分治法类似，其基本思想也是将待求解问题分解成若干个子问题，先求解子问题，然后从这些子问题的解得到原问题的解。动态规划算法在算法思想中是极为重要的，需要重点掌握。</p>
</blockquote>
<h2> 动态规划相关题目</h2>
<p>递归和动态规划都是将原问题拆成多个子问题然后求解，他们之间最本质的区别是，动态规划保存了子问题的解，避免重复计算。</p>
<h3> 斐波那契数列</h3>`,r:{minutes:24.28,words:7285},y:"a",t:"算法思想 - 动态规划算法"},[":md"]],["v-7e2afeaa","/develop/algorithms-structures/alg-core/alg-core-greedy.html",{d:1562976e6,l:"2019年7月13日",c:["算法和数据结构"],g:["算法思想"],e:`<h1> 算法思想 - 贪心算法</h1>
<blockquote>
<p>本文主要介绍算法中贪心算法的思想: 保证每次操作都是局部最优的，并且最后得到的结果是全局最优的。</p>
</blockquote>
<h2> 贪心思想相关题目</h2>
<h3> 分配饼干</h3>
<p><a href="https://leetcode.com/problems/assign-cookies/description/" target="_blank" rel="noopener noreferrer">455. Assign Cookies (Easy)在新窗口打开</a></p>
<div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code>Input: [1,2], [1,2,3]
Output: 2

Explanation: You have 2 children and 3 cookies. The greed factors of 2 children are 1, 2.
You have 3 cookies and their sizes are big enough to gratify all of the children,
You need to output 2.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,r:{minutes:6.62,words:1987},y:"a",t:"算法思想 - 贪心算法"},[":md"]],["v-08212d9e","/develop/algorithms-structures/alg-core/alg-core-overview.html",{d:15627168e5,l:"2019年7月10日",c:["算法和数据结构"],g:["算法思想"],e:`<h1> ♥算法思想知识体系详解♥</h1>
<blockquote>
<p>我们通过理解算法背后常用的算法思想，进行归纳总结，并通过leetcode练习来辅助理解和提升.</p>
</blockquote>
<h2> 算法思想详解</h2>
<p><em>相关文章</em></p>
<ul>
<li>算法思想 - 分治算法
<ul>
<li>分治算法的基本思想是将一个规模为N的问题分解为K个规模较小的子问题，这些子问题相互独立且与原问题性质相同。求出子问题的解，就可得到原问题的解</li>
</ul>
</li>
<li>算法思想 - 动态规划算法
<ul>
<li>动态规划算法通常用于求解具有某种最优性质的问题。在这类问题中，可能会有许多可行解。每一个解都对应于一个值，我们希望找到具有最优值的解。动态规划算法与分治法类似，其基本思想也是将待求解问题分解成若干个子问题，先求解子问题，然后从这些子问题的解得到原问题的解</li>
</ul>
</li>
<li>算法思想 - 贪心算法
<ul>
<li>本文主要介绍算法中贪心算法的思想: 保证每次操作都是局部最优的，并且最后得到的结果是全局最优的</li>
</ul>
</li>
<li>算法思想 - 二分法
<ul>
<li>本文主要介绍算法思想中分治算法重要的二分法，比如二分查找；二分查找也称折半查找（Binary Search），它是一种效率较高的查找方法。但是，折半查找要求线性表必须采用顺序存储结构，而且表中元素按关键字有序排列。</li>
</ul>
</li>
<li>算法思想 - 搜索算法
<ul>
<li>本文主要介绍算法中搜索算法的思想，主要包含BFS，DFS</li>
</ul>
</li>
<li>算法思想 - 回溯算法
<ul>
<li>Backtracking(回溯)属于 DFS, 本文主要介绍算法中Backtracking算法的思想。回溯算法实际上一个类似枚举的搜索尝试过程，主要是在搜索尝试过程中寻找问题的解，当发现已不满足求解条件时，就“回溯”返回，尝试别的路径。回溯法是一种选优搜索法，按选优条件向前搜索，以达到目标。但当探索到某一步时，发现原先选择并不优或达不到目标，就退回一步重新选择，这种走不通就退回再走的技术为回溯法</li>
</ul>
</li>
</ul>`,r:{minutes:2.06,words:619},y:"a",t:"♥算法思想知识体系详解♥"},[":md"]],["v-96c4e2bc","/develop/algorithms-structures/alg-core/alg-core-search.html",{d:15631488e5,l:"2019年7月15日",c:["算法和数据结构"],g:["算法思想"],e:`<h1> 算法思想 - 搜索算法</h1>
<blockquote>
<p>本文主要介绍算法中搜索算法的思想，主要包含BFS，DFS。</p>
</blockquote>
<h2> 搜索相关题目</h2>
<p>深度优先搜索和广度优先搜索广泛运用于树和图中，但是它们的应用远远不止如此。</p>
<h3> BFS</h3>
<figure><img src="https://www.pdai.tech/images/pics/4ff355cf-9a7f-4468-af43-e5b02038facc.jpg" alt="image" tabindex="0" loading="lazy"><figcaption>image</figcaption></figure>`,r:{minutes:8.36,words:2507},y:"a",t:"算法思想 - 搜索算法"},[":md"]],["v-6d52f585","/develop/algorithms-structures/alg-domain/alg-domain-bigdata-bloom-filter.html",{d:1564272e6,l:"2019年7月28日",c:["算法和数据结构"],g:["领域算法"],e:`<h1> 大数据处理 - Bitmap &amp; Bloom Filter</h1>
<blockquote>
<p>布隆过滤器有着广泛的应用，对于大量数据的“存不存在”的问题在空间上有明显优势，但是在判断存不存在是有一定的错误率(false positive)，也就是说，有可能把不属于这个集合的元素误认为属于这个集合(False Positive)，但不会把属于这个集合的元素误认为不属于这个集合(False Negative)。</p>
</blockquote>
<h2> 布隆过滤器由来</h2>
<p>布隆在1970年提出了布隆过滤器(Bloom Filter)，是一个很长的二进制向量(可以想象成一个序列)和一系列随机映射函数(hash function)。可用于判断一个元素是否在一个集合中，查询效率很高(1-N，最优能逼近于1)。通常应用在一些需要快速判断某个元素是否属于集合，但是并不严格要求100%正确的场合。</p>`,r:{minutes:15.58,words:4675},y:"a",t:"大数据处理 - Bitmap & Bloom Filter"},[":md"]],["v-38904d9d","/develop/algorithms-structures/alg-domain/alg-domain-bigdata-bucket.html",{d:15643584e5,l:"2019年7月29日",c:["算法和数据结构"],g:["领域算法"],e:`<h1> 大数据处理 - 双层桶划分</h1>
<blockquote>
<p>本文主要介绍大数据处理之分桶处理。</p>
</blockquote>
<h2> 分桶法简介</h2>
<p>其实本质上还是分而治之的思想，重在“分”的技巧上！</p>
<ul>
<li><code>适用范围</code>: 第k大，中位数，不重复或重复的数字</li>
<li><code>基本原理及要点</code>: 因为元素范围很大，不能利用直接寻址表，所以通过多次划分，逐步确定范围，然后最后在一个可以接受的范围内进行。</li>
</ul>
<h2> 相关题目</h2>
<h3> 2.5亿个整数中找出不重复的整数的个数，内存空间不足以容纳这2.5亿个整数。</h3>`,r:{minutes:2.9,words:870},y:"a",t:"大数据处理 - 双层桶划分"},[":md"]],["v-7cf660e4","/develop/algorithms-structures/alg-domain/alg-domain-bigdata-db-index.html",{d:15644448e5,l:"2019年7月30日",c:["算法和数据结构"],g:["领域算法"],e:`<h1> 大数据处理 - Trie树/数据库/倒排索引</h1>
<blockquote>
<p>大数据处理处理思想之 Trie树/数据库/倒排索引, 本文主要梳理下思路。</p>
</blockquote>
<h2> Trie树</h2>
<blockquote>
<p>Trie树的介绍和实现请参考 <a href="">树 - 前缀树(Trie)</a></p>
</blockquote>
<ul>
<li><code>适用范围</code>: 数据量大，重复多，但是数据种类小可以放入内存</li>
<li><code>基本原理及要点</code>: 实现方式，节点孩子的表示方式</li>
<li><code>扩展</code>: 压缩实现。</li>
</ul>`,r:{minutes:2.48,words:743},y:"a",t:"大数据处理 - Trie树/数据库/倒排索引"},[":md"]],["v-36343a0f","/develop/algorithms-structures/alg-domain/alg-domain-bigdata-devide-and-hash.html",{d:15641856e5,l:"2019年7月27日",c:["算法和数据结构"],g:["领域算法"],e:`<h1> 大数据处理 - 分治/hash/排序</h1>
<blockquote>
<p>大数据处理思路: 分而治之/Hash映射 + Hash_map统计 + 堆/快速/归并排序。</p>
</blockquote>
<h2> 思路简介</h2>
<blockquote>
<p>分而治之/hash映射 + hash统计 + 堆/快速/归并排序，说白了，就是先映射，而后统计，最后排序:</p>
</blockquote>
<ul>
<li><code>分而治之/hash映射</code>: 针对数据太大，内存受限，只能是: 把大文件化成(取模映射)小文件，即16字方针: 大而化小，各个击破，缩小规模，逐个解决</li>
<li><code>hash_map统计</code>: 当大文件转化了小文件，那么我们便可以采用常规的hash_map(ip，value)来进行频率统计。</li>
<li><code>堆/快速排序</code>: 统计完了之后，便进行排序(可采取堆排序)，得到次数最多的IP。</li>
</ul>`,r:{minutes:12.93,words:3879},y:"a",t:"大数据处理 - 分治/hash/排序"},[":md"]],["v-650615b0","/develop/algorithms-structures/alg-domain/alg-domain-bigdata-map-reduce.html",{d:15646176e5,l:"2019年8月1日",c:["算法和数据结构"],g:["领域算法"],e:`<h1> 大数据处理 - Map &amp; Reduce</h1>
<blockquote>
<p>MapReduce是一种计算模型, 本质上是<code>分治/hash_map/归并排序</code>这种方式在分布式下的延伸。</p>
</blockquote>
<h2> Map &amp; Reduce简介</h2>
<p>MapReduce是一种计算模型，简单的说就是将大批量的工作(数据)分解(MAP)执行，然后再将结果合并成最终结果(REDUCE)。这样做的好处是可以在任务被分解后，可以通过大量机器进行并行计算，减少整个操作的时间。但如果你要我再通俗点介绍，那么，说白了，Mapreduce的原理就是一个归并排序。</p>`,r:{minutes:1.07,words:322},y:"a",t:"大数据处理 - Map & Reduce"},[":md"]],["v-31be9fbf","/develop/algorithms-structures/alg-domain/alg-domain-bigdata-outsort.html",{d:15645312e5,l:"2019年7月31日",c:["算法和数据结构"],g:["领域算法"],e:`<h1> 大数据处理 - 外（磁盘文件）排序</h1>
<blockquote>
<p>在编程珠玑中，描述了三种外部磁盘文件排序的解决方法，分别是</p>
<ul>
<li><strong>位图排序法</strong> - 在待排序文件中不含重复数的情况下，位图排序法是最高效的</li>
<li><strong>外排多路归并法</strong> - 在更一般的情况下，外排多路归并法具有通用性</li>
<li><strong>多通道排序法</strong> 所以本文主要介绍前两种。</li>
</ul>
</blockquote>
<h2> 外排序介绍</h2>
<blockquote>
<p>外排序, 即借助外部存储进行排序.</p>
</blockquote>`,r:{minutes:5.99,words:1798},y:"a",t:"大数据处理 - 外（磁盘文件）排序"},[":md"]],["v-26e927ee","/develop/algorithms-structures/alg-domain/alg-domain-bigdata-overview.html",{d:15640992e5,l:"2019年7月26日",c:["算法和数据结构"],g:["领域算法"],e:`<h1> 大数据处理 - Overview</h1>
<blockquote>
<p>本文主要介绍大数据处理的一些思路。</p>
</blockquote>
<h2> 何谓海量数据处理?</h2>
<p>所谓海量数据处理，无非就是基于海量数据上的存储、处理、操作。何谓海量，就是数据量太大，所以导致要么是无法在较短时间内迅速解决，要么是数据太大，导致无法一次性装入内存。</p>
<p>那解决办法呢?</p>
<ul>
<li><code>针对时间</code>: 我们可以采用巧妙的算法搭配合适的数据结构，如Bloom filter/Hash/bit-map/堆/数据库或倒排索引/trie树；</li>
<li><code>针对空间</code>: 无非就一个办法: 大而化小，分而治之(hash映射);</li>
<li><code>集群|分布式</code>: 通俗点来讲，单机就是处理装载数据的机器有限(只要考虑cpu，内存，硬盘的数据交互); 而集群适合分布式处理，并行计算(更多考虑节点和节点间的数据交互)。</li>
</ul>`,r:{minutes:2.9,words:869},y:"a",t:"大数据处理 - Overview"},[":md"]],["v-76fe11a5","/develop/algorithms-structures/alg-domain/alg-domain-char-match-bf.html",{d:15637536e5,l:"2019年7月22日",c:["算法和数据结构"],g:["领域算法"],e:`<h1> 字符串匹配 - 模式预处理：朴素算法（Naive)(暴力破解)</h1>
<blockquote>
<p>朴素的字符串匹配算法又称为<strong>暴力匹配算法</strong>（Brute Force Algorithm），最为简单的字符串匹配算法。</p>
</blockquote>
<h2> 算法简介</h2>
<blockquote>
<p>朴素的字符串匹配算法又称为暴力匹配算法（Brute Force Algorithm），它的主要特点是：</p>
</blockquote>
<ul>
<li>没有预处理阶段；</li>
<li>滑动窗口总是后移 1 位；</li>
<li>对模式中的字符的比较顺序不限定，可以从前到后，也可以从后到前；</li>
<li>匹配阶段需要 O((n - m + 1)m) 的时间复杂度；</li>
<li>需要 2n 次的字符比较；</li>
</ul>`,r:{minutes:2.21,words:663},y:"a",t:"字符串匹配 - 模式预处理：朴素算法（Naive)(暴力破解)"},[":md"]],["v-fa200404","/develop/algorithms-structures/alg-domain/alg-domain-char-match-bm.html",{d:15639264e5,l:"2019年7月24日",c:["算法和数据结构"],g:["领域算法"],e:`<h1> 字符串匹配 - 模式预处理：BM 算法 (Boyer-Moore)</h1>
<blockquote>
<p>各种文本编辑器的"查找"功能（Ctrl+F），大多采用Boyer-Moore算法，效率非常高。</p>
</blockquote>
<h2> 算法简介</h2>
<blockquote>
<p>在 1977 年，Robert S. Boyer (Stanford Research Institute) 和 J Strother Moore (Xerox Palo Alto Research Center) 共同发表了文章《A Fast String Searching Algorithm》，介绍了一种新的快速字符串匹配算法。这种算法在逻辑上相对于现有的算法有了显著的改进，它对要搜索的字符串进行倒序的字符比较，并且当字符比较不匹配时无需对整个模式串再进行搜索。</p>
</blockquote>`,r:{minutes:7.53,words:2259},y:"a",t:"字符串匹配 - 模式预处理：BM 算法 (Boyer-Moore)"},[":md"]],["v-2138fc8a","/develop/algorithms-structures/alg-domain/alg-domain-char-match-kmp.html",{d:156384e7,l:"2019年7月23日",c:["算法和数据结构"],g:["领域算法"],e:`<h1> 字符串匹配 - 模式预处理：KMP 算法（Knuth-Morris-Pratt）</h1>
<blockquote>
<p>Knuth-Morris-Pratt算法（简称KMP）是最常用的字符串匹配算法之一。</p>
</blockquote>
<h2> 算法简介</h2>
<blockquote>
<p>如下算法解释主要来源于这里，但是通常很难阅读完全，我推荐你直接进入下一节 <strong>图例解释部分</strong>。</p>
</blockquote>
<p>我们来观察一下朴素的字符串匹配算法的操作过程。如下图（a）中所描述，在模式 P = ababaca 和文本 T 的匹配过程中，模板的一个特定位移 s，q = 5 个字符已经匹配成功，但模式 P 的第 6 个字符不能与相应的文本字符匹配。</p>`,r:{minutes:8.93,words:2679},y:"a",t:"字符串匹配 - 模式预处理：KMP 算法（Knuth-Morris-Pratt）"},[":md"]],["v-122bd9a8","/develop/algorithms-structures/alg-domain/alg-domain-char-match-st.html",{d:15640128e5,l:"2019年7月25日",c:["算法和数据结构"],g:["领域算法"],e:`<h1> 字符串匹配 - 文本预处理：后缀树（Suffix Tree）</h1>
<blockquote>
<p>上述字符串匹配算法(朴素的字符串匹配算法, KMP 算法, Boyer-Moore算法)均是通过对<strong>模式（Pattern）字符串进行预处理</strong>的方式来加快搜索速度。对 Pattern 进行预处理的最优复杂度为 O(m)，其中 m 为 Pattern 字符串的长度。那么，有没有对文本（Text）进行预处理的算法呢？本文即将介绍一种<strong>对 Text 进行预处理</strong>的字符串匹配算法：后缀树（Suffix Tree）。</p>
</blockquote>`,r:{minutes:17.82,words:5345},y:"a",t:"字符串匹配 - 文本预处理：后缀树（Suffix Tree）"},[":md"]],["v-332ed69c","/develop/algorithms-structures/alg-domain/alg-domain-char-match.html",{d:15636672e5,l:"2019年7月21日",c:["算法和数据结构"],g:["领域算法"],e:`<h1> 字符串匹配 - Overview</h1>
<blockquote>
<p>字符串匹配(String Matchiing)也称字符串搜索(String Searching)是字符串算法中重要的一种，是指从一个大字符串或文本中找到模式串出现的位置。</p>
</blockquote>
<h2> 字符串匹配概念</h2>
<blockquote>
<p>字符串匹配问题的形式定义：</p>
</blockquote>
<ul>
<li>文本（Text）是一个长度为 n 的数组 T[1..n]；</li>
<li>模式（Pattern）是一个长度为 m 且 m≤n 的数组 P[1..m]；</li>
<li>T 和 P 中的元素都属于有限的字母表 Σ 表；</li>
<li>如果 0≤s≤n-m，并且 T[s+1..s+m] = P[1..m]，即对 1≤j≤m，有 T[s+j] = P[j]，则说模式 P 在文本 T 中出现且位移为 s，且称 s 是一个有效位移（Valid Shift）。</li>
</ul>`,r:{minutes:2.26,words:679},y:"a",t:"字符串匹配 - Overview"},[":md"]],["v-36312da3","/develop/algorithms-structures/alg-domain/alg-domain-distribute-overview.html",{d:1564704e6,l:"2019年8月2日",c:["算法和数据结构"],g:["领域算法"],e:`<h1> 分布式算法 - Overview</h1>
<blockquote>
<p>本文总结下常见的分布式算法，主要是分布式中的一致性算法。</p>
</blockquote>
<h2> 常见的分布式算法</h2>
<ul>
<li>分布式算法 - 一致性Hash算法
<ul>
<li>一致性Hash算法是个经典算法，Hash环的引入是为解决<code>单调性(Monotonicity)</code>的问题；虚拟节点的引入是为了解决<code>平衡性(Balance)</code>问题</li>
</ul>
</li>
<li>分布式算法 - Paxos算法
<ul>
<li>Paxos算法是Lamport宗师提出的一种基于消息传递的分布式一致性算法，使其获得2013年图灵奖。自Paxos问世以来就持续垄断了分布式一致性算法，Paxos这个名词几乎等同于分布式一致性, 很多分布式一致性算法都由Paxos演变而来</li>
</ul>
</li>
<li>分布式算法 - Raft算法
<ul>
<li>Paxos是出了名的难懂，而Raft正是为了探索一种更易于理解的一致性算法而产生的。它的首要设计目的就是易于理解，所以在选主的冲突处理等方式上它都选择了非常简单明了的解决方案</li>
</ul>
</li>
<li>分布式算法 - ZAB算法
<ul>
<li>ZAB 协议全称：Zookeeper Atomic Broadcast（Zookeeper 原子广播协议）, 它应该是所有一致性协议中生产环境中应用最多的了。为什么呢？因为他是为 Zookeeper 设计的分布式一致性协议！</li>
</ul>
</li>
<li>分布式算法 - Snowflake算法
<ul>
<li>Snowflake，雪花算法是由Twitter开源的分布式ID生成算法，以划分命名空间的方式将 64-bit位分割成多个部分，每个部分代表不同的含义。这种就是将64位划分为不同的段，每段代表不同的涵义，基本就是时间戳、机器ID和序列数。为什么如此重要？因为它提供了一种ID生成及生成的思路，当然这种方案就是需要考虑时钟回拨的问题以及做一些 buffer的缓冲设计提高性能。</li>
</ul>
</li>
</ul>`,r:{minutes:1.72,words:517},y:"a",t:"分布式算法 - Overview"},[":md"]],["v-1a357338","/develop/algorithms-structures/alg-domain/alg-domain-distribute-x-consistency-hash.html",{d:15647904e5,l:"2019年8月3日",c:["算法和数据结构"],g:["领域算法"],e:`<h1> 分布式算法 - 一致性Hash算法</h1>
<blockquote>
<p>一致性Hash算法是个经典算法，Hash环的引入是为解决<code>单调性(Monotonicity)</code>的问题；虚拟节点的引入是为了解决<code>平衡性(Balance)</code>问题。</p>
</blockquote>
<h2> 一致性Hash算法引入</h2>
<p>在分布式集群中，对机器的添加删除，或者机器故障后自动脱离集群这些操作是分布式集群管理最基本的功能。如果采用常用的hash(object)%N算法，那么在有机器添加或者删除后，很多原有的数据就无法找到了，这样严重的违反了单调性原则。</p>`,r:{minutes:6.82,words:2045},y:"a",t:"分布式算法 - 一致性Hash算法"},[":md"]],["v-3eae9060","/develop/algorithms-structures/alg-domain/alg-domain-distribute-x-paxos.html",{d:15648768e5,l:"2019年8月4日",c:["算法和数据结构"],g:["领域算法"],e:`<h1> 分布式算法 - Paxos算法</h1>
<blockquote>
<p>Paxos算法是Lamport宗师提出的一种基于消息传递的分布式一致性算法，使其获得2013年图灵奖。自Paxos问世以来就持续垄断了分布式一致性算法，Paxos这个名词几乎等同于分布式一致性, 很多分布式一致性算法都由Paxos演变而来。</p>
</blockquote>
<h2> Paxos算法简介</h2>
<p>Paxos算法是Lamport宗师提出的一种基于消息传递的分布式一致性算法，使其获得2013年图灵奖。</p>
<p>Paxos由Lamport于1998年在《The Part-Time Parliament》论文中首次公开，最初的描述使用希腊的一个小岛Paxos作为比喻，描述了Paxos小岛中通过决议的流程，并以此命名这个算法，但是这个描述理解起来比较有挑战性。后来在2001年，Lamport觉得同行不能理解他的幽默感，于是重新发表了朴实的算法描述版本《Paxos Made Simple》。</p>`,r:{minutes:7.83,words:2349},y:"a",t:"分布式算法 - Paxos算法"},[":md"]],["v-7734c40a","/develop/algorithms-structures/alg-domain/alg-domain-distribute-x-raft.html",{d:15649632e5,l:"2019年8月5日",c:["算法和数据结构"],g:["领域算法"],e:`<h1> 分布式算法 - Raft算法</h1>
<blockquote>
<p>Paxos是出了名的难懂，而Raft正是为了探索一种更易于理解的一致性算法而产生的。它的首要设计目的就是易于理解，所以在选主的冲突处理等方式上它都选择了非常简单明了的解决方案。</p>
</blockquote>
<h2> 推荐阅读</h2>
<p>提示</p>
<p>强烈推荐通过如下资料学习raft。</p>
<ul>
<li><a href="https://raft.github.io/" target="_blank" rel="noopener noreferrer">raft.github.io在新窗口打开</a></li>
</ul>`,r:{minutes:14.13,words:4240},y:"a",t:"分布式算法 - Raft算法"},[":md"]],["v-a8291ce0","/develop/algorithms-structures/alg-domain/alg-domain-distribute-x-zab.html",{d:15650496e5,l:"2019年8月6日",c:["算法和数据结构"],g:["领域算法"],e:`<h1> 分布式算法 - ZAB算法</h1>
<blockquote>
<p>ZAB 协议全称：Zookeeper Atomic Broadcast（Zookeeper 原子广播协议）, 它应该是所有一致性协议中生产环境中应用最多的了。为什么呢？因为它是为 Zookeeper 设计的分布式一致性协议！</p>
</blockquote>
<p><a href="">什么是 ZAB 协议？ ZAB 协议介绍</a><a href="">消息广播</a><a href="">崩溃恢复</a><a href="">数据同步</a><a href="">总结</a><a href="">参考文章</a></p>`,r:{minutes:6.94,words:2081},y:"a",t:"分布式算法 - ZAB算法"},[":md"]],["v-213f690a","/develop/algorithms-structures/alg-domain/alg-domain-id-snowflake.html",{d:1565136e6,l:"2019年8月7日",c:["算法和数据结构"],g:["领域算法"],e:`<h1> 分布式算法 - Snowflake算法</h1>
<blockquote>
<p>Snowflake，雪花算法是由Twitter开源的分布式ID生成算法，以划分命名空间的方式将 64-bit位分割成多个部分，每个部分代表不同的含义。这种就是将64位划分为不同的段，每段代表不同的涵义，基本就是时间戳、机器ID和序列数。为什么如此重要？因为它提供了一种ID生成及生成的思路，当然这种方案就是需要考虑时钟回拨的问题以及做一些 buffer的缓冲设计提高性能。</p>
</blockquote>
<h2> 雪花算法-Snowflake</h2>
<p>Snowflake，雪花算法是由Twitter开源的分布式ID生成算法，以划分命名空间的方式将 64-bit位分割成多个部分，每个部分代表不同的含义。而 Java中64bit的整数是Long类型，所以在 Java 中 SnowFlake 算法生成的 ID 就是 long 来存储的。</p>`,r:{minutes:6.55,words:1964},y:"a",t:"分布式算法 - Snowflake算法"},[":md"]],["v-04283655","/develop/algorithms-structures/alg-domain/alg-domain-load-balance.html",{d:15652224e5,l:"2019年8月8日",c:["算法和数据结构"],g:["领域算法"],e:`<h1> 负载均衡算法 - 汇总</h1>
<blockquote>
<p>本文主要介绍常用的负载均衡算法和Nginx中支持的负载均衡算法。</p>
</blockquote>
<h2> 常见的负载均衡算法</h2>
<p>常见的负载均衡算法包含:</p>
<ul>
<li>轮询法(Round Robin)</li>
<li>加权轮询法(Weight Round Robin)</li>
<li>平滑加权轮询法(Smooth Weight Round Robin)</li>
<li>随机法(Random)</li>
<li>加权随机法(Weight Random)</li>
<li>源地址哈希法(Hash)</li>
<li>最小连接数法(Least Connections)</li>
</ul>`,r:{minutes:4.33,words:1300},y:"a",t:"负载均衡算法 - 汇总"},[":md"]],["v-35074d01","/develop/algorithms-structures/alg-domain/alg-domain-machine.html",{d:15653952e5,l:"2019年8月10日",c:["算法和数据结构"],g:["领域算法"],e:`<h1> 数据挖掘 - 10大算法汇总</h1>
<blockquote>
<p>国际权威的学术组织the IEEE International Conference on Data Mining (ICDM) 2006年12月评选出了数据挖掘领域的十大经典算法: C4.5, k-Means, SVM, Apriori, EM, PageRank, AdaBoost, kNN, Naive Bayes, and CART。</p>
</blockquote>
<h2> 推荐学习</h2>
<ul>
<li>博客园@刘建平Pinard 的<a href="https://www.cnblogs.com/pinard/" target="_blank" rel="noopener noreferrer">机器学习，数据挖掘系列在新窗口打开</a></li>
</ul>`,r:{minutes:5.77,words:1730},y:"a",t:"数据挖掘 - 10大算法汇总"},[":md"]],["v-cedcc65e","/develop/algorithms-structures/alg-domain/alg-domain-overview.html",{d:15633216e5,l:"2019年7月17日",c:["算法和数据结构"],g:["领域算法"],e:`<h1> ♥一些领域算法知识体系♥</h1>
<blockquote>
<p>本系列主要总结下常见的某些领域的算法。</p>
</blockquote>
<h2> 知识体系</h2>
<p><em>知识体系系统性梳理</em></p>
<figure><img src="https://www.pdai.tech/images/alg/alg-domain-2.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>
<p><em>相关文章</em></p>
<blockquote>
<p><strong>A. 领域算法 梳理知识点</strong>：在了解基础算法之后，我们还要学习和了解在不同专业领域有哪些特有的算法。这里不一定要求复杂度，而是要有知识面以及解决问题的思路。</p>
</blockquote>`,r:{minutes:7.58,words:2274},y:"a",t:"♥一些领域算法知识体系♥"},[":md"]],["v-0cdb1ad2","/develop/algorithms-structures/alg-domain/alg-domain-security-degist.html",{d:1563408e6,l:"2019年7月18日",c:["算法和数据结构"],g:["领域算法"],e:`<h1> 安全算法 - 摘要算法</h1>
<blockquote>
<p>本文主要介绍安全算法 - 摘要算法相关的内容。消息摘要算法的主要特征是加密过程不需要密钥，并且经过加密的数据无法被解密，目前可以解密逆向的只有CRC32算法，只有输入相同的明文数据经过相同的消息摘要算法才能得到相同的密文。消息摘要算法不存在密钥的管理与分发问题，适合于分布式网络上使用。</p>
</blockquote>
<h2> 摘要算法简介</h2>
<ul>
<li>消息摘要算法的主要特征是加密过程不需要密钥，并且经过加密的数据无法被解密</li>
<li>只有输入相同的明文数据经过相同的消息摘要算法才能得到相同的密文</li>
<li>消息摘要算法主要应用在“数字签名”领域，作为对明文的摘要算法</li>
<li>著名的摘要算法有RSA公司的MD5算法和SHA-1算法及其大量的变体</li>
</ul>`,r:{minutes:7.2,words:2161},y:"a",t:"安全算法 - 摘要算法"},[":md"]],["v-1c134478","/develop/algorithms-structures/alg-domain/alg-domain-security-secure.html",{d:15634944e5,l:"2019年7月19日",c:["算法和数据结构"],g:["领域算法"],e:`<h1> 安全算法 - 加密算法</h1>
<blockquote>
<p>本文主要介绍安全算法之加密算法。 数据加密的基本过程就是对原来为明文的文件或数据按某种算法进行处理，使其成为不可读的一段代码为“密文”，使其只能在输入相应的密钥之后才能显示出原容，通过这样的途径来达到保护数据不被非法人窃取、阅读的目的。 该过程的逆过程为解密，即将该编码信息转化为其原来数据的过程。</p>
</blockquote>
<h2> 加密算法简介</h2>
<ul>
<li>加密技术包括两个元素: 加密算法和密钥。</li>
<li>加密算法是将普通的文本(或者可以理解的信息)与一串数字(密钥)的结合，产生不可理解的密文的步骤。</li>
<li>密钥是用来对数据进行编码和解码的一种算法。</li>
<li>在安全保密中，可通过适当的密钥加密技术和管理机制来保证网络的信息通讯安全。</li>
</ul>`,r:{minutes:8.22,words:2466},y:"a",t:"安全算法 - 加密算法"},[":md"]],["v-584451c1","/develop/algorithms-structures/alg-domain/alg-domain-security-sm.html",{d:15635808e5,l:"2019年7月20日",c:["算法和数据结构"],g:["领域算法"],e:`<h1> 安全算法 - 国密算法</h1>
<blockquote>
<p>国密即国家密码局认定的国产密码算法。主要有SM1，SM2，SM3，SM4，SM7, SM9。</p>
</blockquote>
<h2> 国密算法分类</h2>
<blockquote>
<p>国家标准官方网站如下：<a href="http://openstd.samr.gov.cn/bzgk/gb/" target="_blank" rel="noopener noreferrer">http://openstd.samr.gov.cn/bzgk/gb/</a></p>
</blockquote>
<ul>
<li>SM1 <strong>为对称加密</strong>。其加密强度与AES相当。该算法不公开，调用该算法时，需要通过<strong>加密芯片的接口进行调用</strong>。</li>
<li>SM2 <strong>非对称加密</strong>，基于ECC。该算法已公开。由于该算法基于ECC，故其签名速度与秘钥生成速度都快于RSA。ECC 256位（SM2采用的就是ECC 256位的一种）安全强度比RSA 2048位高，但运算速度快于RSA。</li>
<li>SM3 <strong>消息摘要</strong>。可以用MD5作为对比理解。该算法已公开。校验结果为256位。</li>
<li>SM4 无线局域网标准的<strong>分组数据算法</strong>。对称加密，密钥长度和分组长度均为128位。</li>
<li>SM7 是一种分组密码算法，分组长度为128比特，密钥长度为128比特。SM7适用于非接触式IC卡，应用包括身份识别类应用(门禁卡、工作证、参赛证)，票务类应用(大型赛事门票、展会门票)，支付与通卡类应用（积分消费卡、校园一卡通、企业一卡通等）。</li>
<li>SM9 不需要申请数字证书，适用于互联网应用的各种新兴应用的安全保障。如基于云技术的密码服务、电子邮件安全、智能终端保护、物联网安全、云存储安全等等。这些安全应用可采用手机号码或邮件地址作为公钥，实现数据加密、身份认证、通话加密、通道加密等安全应用，并具有使用方便，易于部署的特点，从而开启了普及密码算法的大门。</li>
</ul>`,r:{minutes:11.65,words:3494},y:"a",t:"安全算法 - 国密算法"},[":md"]],["v-76f8c038","/develop/algorithms-structures/alg-domain/alg-domain-suggest.html",{d:15653088e5,l:"2019年8月9日",c:["算法和数据结构"],g:["领域算法"],e:`<h1> 推荐算法 - 汇总</h1>
<blockquote>
<p>本文主要对推荐算法整体知识点做汇总，做到总体的理解；深入理解需要再看专业的材料。</p>
</blockquote>
<h2> 推荐算法的意义</h2>
<p>推荐根据用户兴趣和行为特点，向用户推荐所需的信息或商品，帮助用户在海量信息中快速发现真正所需的商品，提高用户黏性，促进信息点击和商品销售。</p>
<ul>
<li>帮助用户找到想要的商品(新闻/音乐/……)，发掘长尾</li>
</ul>
<p>帮用户找到想要的东西，谈何容易。商品茫茫多，甚至是我们自己，也经常点开淘宝，面对眼花缭乱的打折活动不知道要买啥。在经济学中，有一个著名理论叫长尾理论(The Long Tail)。套用在互联网领域中，指的就是最热的那一小部分资源将得到绝大部分的关注，而剩下的很大一部分资源却鲜少有人问津。这不仅造成了资源利用上的浪费，也让很多口味偏小众的用户无法找到自己感兴趣的内容。</p>`,r:{minutes:20.32,words:6097},y:"a",t:"推荐算法 - 汇总"},[":md"]],["v-722b3cb8","/develop/algorithms-structures/alg-other/alg-other-mind.html",{d:15654816e5,l:"2019年8月11日",c:["算法和数据结构"],g:["其他"],e:`<h1> 头脑风暴题目</h1>
<blockquote>
<p>通常大公司招人的时候除了考察专业知识，算法之外，还会通过智力题来考察面试者的智力和潜力； 本章节主要收集常见的头脑风暴题。</p>
</blockquote>
<h2> 智力题</h2>
<h4> 智力题1(海盗分金币)——海盗分金币</h4>
<p>5个海盗抢得100枚金币后，讨论如何进行公正分配。他们商定的分配原则是:</p>
<ul>
<li>(1)抽签确定各人的分配顺序号码(1，2，3，4，5)；</li>
<li>(2)由抽到1号签的海盗提出分配方案，然后5人进行表决，如果方案得到超过半数的人同意，就按照他的方案进行分配，否则就将1号扔进大海喂鲨鱼；</li>
<li>(3)如果1号被扔进大海，则由2号提出分配方案，然后由剩余的4人进行表决，当且仅当超过半数的人同意时，才会按照他的提案进行分配，否则也将被扔入大海；</li>
<li>(4)依此类推。</li>
</ul>`,r:{minutes:10.36,words:3107},y:"a",t:"头脑风暴题目"},[":md"]],["v-3bdd9fde","/develop/algorithms-structures/alg-sort/alg-sort-overview.html",{d:15618528e5,l:"2019年6月30日",c:["算法和数据结构"],g:["排序算法"],e:`<h1> ♥常见排序算法知识体系详解♥</h1>
<blockquote>
<p>本章主要介绍排序总结。</p>
</blockquote>
<h2> 知识体系文章</h2>
<p><em>知识体系系统性梳理</em></p>
<figure><img src="https://www.pdai.tech/images/alg/alg-sort-overview-1.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>
<p><em>相关文章</em></p>
<blockquote>
<p><strong>A. 常见排序概要</strong>：重点理解几个排序之间的对比，时间和空间复杂度，以及应用。PS：越简单越要提高认知效率，做到战略上藐视战术上重视。</p>
</blockquote>`,r:{minutes:4.34,words:1302},y:"a",t:"♥常见排序算法知识体系详解♥"},[":md"]],["v-1845fb09","/develop/algorithms-structures/alg-sort/alg-sort-x-bubble.html",{d:15619392e5,l:"2019年7月1日",c:["算法和数据结构"],g:["排序算法"],e:`<h1> 排序 - 冒泡排序(Bubble Sort)</h1>
<blockquote>
<p>最简单和最基本的排序。</p>
</blockquote>
<h2> 冒泡排序介绍</h2>
<p>它是一种较简单的排序算法。它会遍历若干次要排序的数列，每次遍历时，它都会从前往后依次的比较相邻两个数的大小；如果前者比后者大，则交换它们的位置。这样，一次遍历之后，最大的元素就在数列的末尾！ 采用相同的方法再次遍历时，第二大的元素就被排列在最大元素之前。重复此操作，直到整个数列都有序为止！</p>
<h2> 冒泡排序实现</h2>
<p>下面以数列{20,40,30,10,60,50}为例，演示它的冒泡排序过程(如下图)。</p>`,r:{minutes:3.21,words:962},y:"a",t:"排序 - 冒泡排序(Bubble Sort)"},[":md"]],["v-0a7bdf2a","/develop/algorithms-structures/alg-sort/alg-sort-x-bucket.html",{d:1562544e6,l:"2019年7月8日",c:["算法和数据结构"],g:["排序算法"],e:`<h1> 排序 - 桶排序(Bucket Sort)</h1>
<blockquote>
<p>桶排序(Bucket Sort)的原理很简单，将数组分到有限数量的桶子里。每个桶子再个别排序（有可能再使用别的排序算法或是以递归方式继续使用桶排序进行排序）。</p>
</blockquote>
<h2> 桶排序介绍</h2>
<p>假设待排序的数组a中共有N个整数，并且已知数组a中数据的范围[0, MAX)。在桶排序时，创建容量为MAX的桶数组r，并将桶数组元素都初始化为0；将容量为MAX的桶数组中的每一个单元都看作一个"桶"。</p>
<p>在排序时，逐个遍历数组a，将数组a的值，作为"桶数组r"的下标。当a中数据被读取时，就将桶的值加1。例如，读取到数组a[3]=5，则将r[5]的值+1。</p>`,r:{minutes:2.4,words:719},y:"a",t:"排序 - 桶排序(Bucket Sort)"},[":md"]],["v-722b4f8e","/develop/algorithms-structures/alg-sort/alg-sort-x-fast.html",{d:15620256e5,l:"2019年7月2日",c:["算法和数据结构"],g:["排序算法"],e:`<h1> 排序 - 快速排序(Quick Sort)</h1>
<blockquote>
<p>快速排序(Quick Sort)使用分治法算法思想。</p>
</blockquote>
<h2> 快速排序介绍</h2>
<p>它的基本思想是: 选择一个基准数，通过一趟排序将要排序的数据分割成独立的两部分；其中一部分的所有数据都比另外一部分的所有数据都要小。然后，再按此方法对这两部分数据分别进行快速排序，整个排序过程可以递归进行，以此达到整个数据变成有序序列。</p>
<h2> 快速排序实现</h2>
<ul>
<li>从数列中挑出一个基准值。</li>
<li>将所有比基准值小的摆放在基准前面，所有比基准值大的摆在基准的后面(相同的数可以到任一边)；在这个分区退出之后，该基准就处于数列的中间位置。</li>
<li>递归地把"基准值前面的子数列"和"基准值后面的子数列"进行排序。</li>
</ul>`,r:{minutes:3.92,words:1177},y:"a",t:"排序 - 快速排序(Quick Sort)"},[":md"]],["v-601746ae","/develop/algorithms-structures/alg-sort/alg-sort-x-heap.html",{d:15623712e5,l:"2019年7月6日",c:["算法和数据结构"],g:["排序算法"],e:`<h1> 排序 - 堆排序(Heap Sort)</h1>
<blockquote>
<p>堆排序是指利用堆这种数据结构所设计的一种排序算法。堆是一个近似完全二叉树的结构，并同时满足堆积的性质：即子结点的键值或索引总是小于（或者大于）它的父节点。</p>
</blockquote>
<h2> 堆排序介绍</h2>
<p>学习堆排序之前，有必要了解堆！若读者不熟悉堆，建议先了解堆(建议可以通过二叉堆，左倾堆，斜堆，二项堆或斐波那契堆等文章进行了解)，然后再来学习本章。</p>
<p>我们知道，堆分为"最大堆"和"最小堆"。最大堆通常被用来进行"升序"排序，而最小堆通常被用来进行"降序"排序。 鉴于最大堆和最小堆是对称关系，理解其中一种即可。本文将对最大堆实现的升序排序进行详细说明。</p>`,r:{minutes:8.81,words:2644},y:"a",t:"排序 - 堆排序(Heap Sort)"},[":md"]],["v-389c7e08","/develop/algorithms-structures/alg-sort/alg-sort-x-insert.html",{d:1562112e6,l:"2019年7月3日",c:["算法和数据结构"],g:["排序算法"],e:`<h1> 排序 - 插入排序(Insertion Sort)</h1>
<blockquote>
<p>本文主要介绍插入排序。</p>
</blockquote>
<h2> 插入排序介绍</h2>
<p>直接插入排序(Straight Insertion Sort)的基本思想是: 把n个待排序的元素看成为一个有序表和一个无序表。开始时有序表中只包含1个元素，无序表中包含有n-1个元素，排序过程中每次从无序表中取出第一个元素，将它插入到有序表中的适当位置，使之成为新的有序表，重复n-1次可完成排序过程。</p>
<h2> 插入排序实现</h2>
<p>下面选取直接插入排序的一个中间过程对其进行说明。假设{20,30,40,10,60,50}中的前3个数已经排列过，是有序的了；接下来对10进行排列。示意图如下:</p>`,r:{minutes:2.43,words:730},y:"a",t:"排序 - 插入排序(Insertion Sort)"},[":md"]],["v-588630e5","/develop/algorithms-structures/alg-sort/alg-sort-x-merge.html",{d:15624576e5,l:"2019年7月7日",c:["算法和数据结构"],g:["排序算法"],e:`<h1> 排序 - 归并排序(Merge Sort)</h1>
<blockquote>
<p>将两个的有序数列合并成一个有序数列，我们称之为"归并"。归并排序(Merge Sort)就是利用归并思想对数列进行排序。</p>
</blockquote>
<h2> 归并排序介绍</h2>
<p>根据具体的实现，归并排序包括"从上往下"和"从下往上"2种方式。</p>
<h3> 从下往上的归并排序</h3>
<p>将待排序的数列分成若干个长度为1的子数列，然后将这些数列两两合并；得到若干个长度为2的有序数列，再将这些数列两两合并；得到若干个长度为4的有序数列，再将它们两两合并；直接合并成一个数列为止。这样就得到了我们想要的排序结果。(参考下面的图片)</p>`,r:{minutes:5.73,words:1718},y:"a",t:"排序 - 归并排序(Merge Sort)"},[":md"]],["v-ae687ece","/develop/algorithms-structures/alg-sort/alg-sort-x-radix.html",{d:15626304e5,l:"2019年7月9日",c:["算法和数据结构"],g:["排序算法"],e:`<h1> 排序 - 基数排序(Radix Sort)</h1>
<blockquote>
<p>基数排序(Radix Sort)是桶排序的扩展.</p>
</blockquote>
<h2> 基数排序介绍</h2>
<p>它的基本思想是: 将整数按位数切割成不同的数字，然后按每个位数分别比较。 具体做法是: 将所有待比较数值统一为同样的数位长度，数位较短的数前面补零。然后，从最低位开始，依次进行一次排序。这样从最低位排序一直到最高位排序完成以后, 数列就变成一个有序序列。</p>
<h2> 基数排序实现</h2>
<p>通过基数排序对数组{53, 3, 542, 748, 14, 214, 154, 63, 616}，它的示意图如下:</p>`,r:{minutes:3.17,words:950},y:"a",t:"排序 - 基数排序(Radix Sort)"},[":md"]],["v-12a17ece","/develop/algorithms-structures/alg-sort/alg-sort-x-select.html",{d:15622848e5,l:"2019年7月5日",c:["算法和数据结构"],g:["排序算法"],e:`<h1> 排序 - 选择排序(Selection sort)</h1>
<blockquote>
<p>选择排序(Selection sort)是一种简单直观的排序算法。</p>
</blockquote>
<h2> 选择排序介绍</h2>
<p>它的基本思想是: 首先在未排序的数列中找到最小(or最大)元素，然后将其存放到数列的起始位置；接着，再从剩余未排序的元素中继续寻找最小(or最大)元素，然后放到已排序序列的末尾。以此类推，直到所有元素均排序完毕。</p>
<h2> 选择排序实现</h2>
<p>下面以数列{20,40,30,10,60,50}为例，演示它的选择排序过程(如下图)。</p>`,r:{minutes:3.5,words:1051},y:"a",t:"排序 - 选择排序(Selection sort)"},[":md"]],["v-c5e41c26","/develop/algorithms-structures/alg-sort/alg-sort-x-shell.html",{d:15621984e5,l:"2019年7月4日",c:["算法和数据结构"],g:["排序算法"],e:`<h1> 排序 - Shell排序(Shell Sort)</h1>
<blockquote>
<p>希尔排序(Shell Sort)是插入排序的一种，它是针对直接插入排序算法的改进。</p>
</blockquote>
<h2> 希尔排序介绍</h2>
<p>希尔排序实质上是一种分组插入方法。它的基本思想是: 对于n个待排序的数列，取一个小于n的整数gap(gap被称为步长)将待排序元素分成若干个组子序列，所有距离为gap的倍数的记录放在同一个组中；然后，对各组内的元素进行直接插入排序。 这一趟排序完成之后，每一个组的元素都是有序的。然后减小gap的值，并重复执行上述的分组和排序。重复这样的操作，当gap=1时，整个数列就是有序的。</p>`,r:{minutes:4.5,words:1349},y:"a",t:"排序 - Shell排序(Shell Sort)"},[":md"]],["v-04990b56","/develop/quality-assurance/code-style/code-style-alibaba.html",{d:16438464e5,l:"2022年2月3日",c:["代码规范"],g:["代码规范"],e:`<h1> 阿里巴巴 Java 开发手册</h1>
<h2> 前言</h2>
<p>《Java开发手册》是阿里巴巴和开课吧技术团队的集体智慧结晶和经验总结，经历了多次大规模一线实战的检验及不断完善，公开到业界后，众多社区开发者踊跃参与打磨完善，系统化地整理成册，当前的最新版本是黄山版。现代软件行业的高速发展对开发者的综合素质要求越来越高，因为不仅是编程知识点，其它维度的知识点也会影响到软件的最终交付质量。比如：五花八门的错误码会人为地增加排查问题的难度；数据库的表结构和索引设计缺陷带来的系统架构缺陷或性能风险；工程结构混乱导致后续项目维护艰难；没有鉴权的漏洞代码容易被黑客攻击等。所以本手册以Java开发者为中心视角，划分为编程规约、异常日志、单元测试、安全规约、MySQL数据库、工程结构、设计规约七个维度，再根据内容特征，细分成若干二级子目录。此外，依据约束力强弱及故障敏感性，规约依次分为<span style="color: red;">【强制】</span>、<span style="color: #FEB409;">【推荐】</span>、<span style="color: #64822E;">【参考】</span>三大类。在延伸的信息中，“说明”对规约做了适当扩展和解释；“<span style="color: #64822E;">正例</span>”提倡什么样的编码和实现方式；“<span style="color: red;">反例</span>”说明需要提防的雷区，以及真实的错误案例。</p>`,r:{minutes:126.74,words:38021},y:"a",t:"阿里巴巴 Java 开发手册"},[":md"]],["v-c0e64272","/develop/quality-assurance/code-style/code-style-google.html",{d:16439328e5,l:"2022年2月4日",c:["代码规范"],g:["代码规范"],e:`<h1> Google Java 编程风格指南</h1>
<blockquote>
<p>转载并翻译自 <a href="https://google.github.io/styleguide/javaguide.html" target="_blank" rel="noopener noreferrer">https://google.github.io/styleguide/javaguide.html</a>。个人英语水平有限，应以原文档为标准。<!--more--></p>
</blockquote>
<h2> 简介</h2>
<p>本文档是 Google Java 语言编程规范的 <strong>完整</strong> 定义。一个 Java 源文件当且仅当遵守本规范时，才可被描述为 Google 风格。</p>`,r:{minutes:28.34,words:8501},y:"a",t:"Google Java 编程风格指南"},[":md"]],["v-4a5192c2","/develop/quality-assurance/code-style/code-style-twitter.html",{d:16440192e5,l:"2022年2月5日",c:["代码规范"],g:["代码规范"],e:`<h1> Twitter Java Style Guide</h1>
<blockquote>
<p>本文是Twitter的Java代码规范。</p>
</blockquote>
<p>The intention of this guide is to provide a set of conventions that encourage good code. It is the distillation of many combined man-years of software engineering and Java development experience. While some suggestions are more strict than others, you should always practice good judgement.</p>`,r:{minutes:18.85,words:5655},y:"a",t:"Twitter Java Style Guide"},[":md"]],["v-377ff110","/develop/quality-assurance/code-style/dev-x-overview.html",{d:164376e7,l:"2022年2月2日",c:["代码规范"],g:["代码规范"],e:`<h1> ♥常见企业级代码规范♥</h1>
<blockquote>
<p>常见企业级代码规范详解。</p>
</blockquote>
<h2> 相关文章</h2>
<blockquote>
<p>常见企业级代码规范相关文章。</p>
</blockquote>
<ul>
<li>阿里巴巴 Java 开发手册
<ul>
<li>《阿里巴巴 Java 开发手册》是阿里巴巴集团技术团队的集体经验总结，经历了多次大规模一线实战的检验及不断的完善，反馈给广大开发者。现代软件行业的高速发展对开发者的综合素质要求越来越高，因为不仅是编程知识点，其它维度的知识点也会影响到软件的最终交付质量。比如: 数据库的表结构和索引设计缺陷可能带来软件上的架构缺陷或性能风险；工程结构混乱导致后续维护艰难；没有鉴权的漏洞代码易被黑客攻击等等。所以本手册以 Java 开发者为中心视角，划分为编程规约、异常日志、MySQL 数据库、工程结构、安全规约五大块，再根据内容特征，细分成若干二级子目录。根据约束力强弱及故障敏感性，规约依次分为强制、推荐、参考三大类。对于规约条目的延伸信息中，“说明”对内容做了引申和解释；“正例”提倡什么样的编码和实现方式；“反例”说明需要提防的雷区，以及真实的错误案例。</li>
</ul>
</li>
<li>Google Java 编程风格指南
<ul>
<li>Google 出品的 《<a href="https://google.github.io/styleguide/javaguide.html" target="_blank" rel="noopener noreferrer">Google Java Code Style在新窗口打开</a>》，由<a href="https://github.com/fantasticmao" target="_blank" rel="noopener noreferrer">fantasticmao在新窗口打开</a>翻译，对应<a href="https://github.com/fantasticmao/google-java-style-guide-zh_cn" target="_blank" rel="noopener noreferrer">github仓库在新窗口打开</a>。</li>
</ul>
</li>
<li>Twitter Java Style Guide
<ul>
<li>本文是Twitter的Java代码规范。</li>
</ul>
</li>
</ul>`,r:{minutes:1.5,words:450},y:"a",t:"♥常见企业级代码规范♥"},[":md"]],["v-5db483f2","/develop/quality-assurance/ut/dev-qt-code-style-1.html",{d:15537312e5,l:"2019年3月28日",c:["质量保障"],g:["代码质量"],e:`<h1> 静态样式检查详解</h1>
<blockquote>
<p>统一样式检查规范里，最为常用的统一样式工具是checkstyle插件，本文将介绍常用的统一风格的措施之<strong>静态样式检查</strong>。</p>
</blockquote>
<h2> 统一样式检查</h2>
<blockquote>
<p>在标准化的统一样式检查规范里，最为常用的统一样式工具是checkstyle插件，而不是国内阿里的代码规约插件。</p>
</blockquote>
<ul>
<li><strong>下载插件</strong></li>
</ul>
<figure><img src="https://www.pdai.tech/images/develop/ut/dev-qt-9.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>`,r:{minutes:15.07,words:4521},y:"a",t:"静态样式检查详解"},[":md"]],["v-5a4ad2b4","/develop/quality-assurance/ut/dev-qt-code-style-2.html",{d:15536448e5,l:"2019年3月27日",c:["质量保障"],g:["代码质量"],e:`<h1> 统一命名规范详解</h1>
<blockquote>
<p>好的代码本身就是注释, 所以我们需要统一命名风格，本文将介绍常用的统一风格的措施之<strong>统一命名规范</strong>。</p>
</blockquote>
<h2> 统一命名风格</h2>
<blockquote>
<p>好的代码本身就是注释, 所以我们需要统一命名风格。</p>
</blockquote>
<p>在本文中，将从大到小，从外到内，总结Java编程中的命名规范。文中将会涉及到日常工作中常见的命名示例，如包命名，类命名，接口命名，方法命名，变量命名，常类命名，抽象类命名，异常类命名以及扩展类命名等。我将按照项目工程目录结构，从包，类(接口，抽象类，异常类)，方法，变量和常量的顺序展开介绍。</p>`,r:{minutes:19.09,words:5728},y:"a",t:"统一命名规范详解"},[":md"]],["v-404ec9ab","/develop/quality-assurance/ut/dev-qt-code-style.html",{d:15535584e5,l:"2019年3月26日",c:["质量保障"],g:["代码质量"],e:`<h1> 统一代码格式化详解</h1>
<blockquote>
<p>项目的代码通常是一个团队共同完成的，要保障代码质量的首要前提就是统一代码的风格，本文将介绍常用的统一风格的措施之<strong>统一代码格式化</strong>。</p>
</blockquote>
<h2> 统一代码格式化</h2>
<blockquote>
<p>统一风格的第一条，就是要统一代码的格式化，因为不同人提交的代码格式化不一样将导致merge代码造成大几率的冲突；而统一的代码风格无论是对于项目可维护性，还是降低merge冲突都是极为重要的。</p>
</blockquote>
<p>通常是两种方式：一种方式是，强制使用同样的IDE工具；另外一个更为常见的是，使用同一种代码格式规范。</p>`,r:{minutes:2.14,words:642},y:"a",t:"统一代码格式化详解"},[":md"]],["v-49af03c3","/develop/quality-assurance/ut/dev-qt-overview.html",{d:15529536e5,l:"2019年3月19日",c:["质量保障"],g:["代码质量"],e:`<h1> ♥代码质量保障知识体系详解♥</h1>
<blockquote>
<p>本系列主要针对如何保障开发侧代码质量，包含单元测试及实现，以及常用的控制团队开发中代码质量的方式，比如代码风格，命名规范，静态代码检查等。</p>
</blockquote>
<h3> 相关文章</h3>
<blockquote>
<p><strong>B1. 开发之单元测试</strong>：单元测试是从开发侧保证软件质量的第一步，本章将具体介绍单元测试相关的内容和工具，比如Junit，Mockito等。</p>
</blockquote>
<ul>
<li>单元测试：浅谈单元测试
<ul>
<li>单元测试（unit testing），是指对软件中的最小可测试单元进行检查和验证。这是基础，所以围绕着单元测试，我从网上搜集和总结了相关的概念，以助你完善体系。</li>
</ul>
</li>
<li>单元测试：Junit4 详解
<ul>
<li>JUint是Java编程语言的单元测试框架，用于编写和运行可重复的自动化测试。本文主要针对Junit4要点进行梳理总结。</li>
</ul>
</li>
<li>单元测试：Junit5 详解
<ul>
<li>JUnit 5是JUnit的下一代。目标是为JVM上的开发人员端测试创建一个最新的基础。这包括专注于Java 8及更高版本，以及启用许多不同风格的测试。</li>
</ul>
</li>
<li>单元测试：Mockito 详解
<ul>
<li>Mock通常是指，在测试一个对象A时，我们构造一些假的对象来模拟与A之间的交互，而这些Mock对象的行为是我们事先设定且符合预期。通过这些Mock对象来测试A在正常逻辑，异常逻辑或压力情况下工作是否正常。而Mockito是最流行的Java mock框架之一。</li>
</ul>
</li>
<li>单元测试：IDEA下单元测试详解
<ul>
<li>工欲善其事必先利其器，我们在写单元测试一定要使用工具，这将能大幅度提升编码的效率。本文以IDEA为例，看看如何利用插件提升效率。</li>
</ul>
</li>
<li>单元测试 - SpringBoot2+Mockito实战
<ul>
<li>在真实的开发中，我们通常是使用SpringBoot的，目前SpringBoot是v2.4.x的版本（SpringBoot 2.2.2.RELEASE之前默认是使用 JUnit4，之后版本默认使用Junit5）；所以我们写个基于SpringBoot2.4+H2的内存库的简单例子，同时加点必要的单元测试。</li>
</ul>
</li>
</ul>`,r:{minutes:3.28,words:983},y:"a",t:"♥代码质量保障知识体系详解♥"},[":md"]],["v-73731470","/develop/quality-assurance/ut/dev-qt-sonarlint.html",{d:15538176e5,l:"2019年3月29日",c:["质量保障"],g:["代码质量"],e:`<h1> Sonarlint插件详解</h1>
<blockquote>
<p>在提交代码前，为提升代码质量还需要使用一些静态代码工具检查代码质量，最为常用的是Sonar；在本地IDE中可以配置Sonarlint插件进行检查。</p>
</blockquote>
<h2> Sonar是什么？</h2>
<blockquote>
<p>Sonar是一个用于代码质量管理的开源平台，用于管理源代码的质量 通过插件形式，可以支持包括java,C#,C/C++,PL/SQL,Cobol,JavaScrip,Groovy等等二十几种编程语言的代码质量管理与检测</p>
</blockquote>
<p>Sonar可以从以下七个维度检测代码质量，而作为开发人员至少需要处理前5种代码质量问题</p>`,r:{minutes:3.85,words:1155},y:"a",t:"Sonarlint插件详解"},[":md"]],["v-3b419dbb","/develop/quality-assurance/ut/dev-qt-spotbugs.html",{d:1553904e6,l:"2019年3月30日",c:["质量保障"],g:["代码质量"],e:`<h1> SpotBugs插件详解</h1>
<blockquote>
<p>SpotBugs是Findbugs的继任者（Findbugs已经于2016年后不再维护），用于对代码进行静态分析，查找相关的漏洞；在本地IDE中可以配置SpotBugs插件进行检查。</p>
</blockquote>
<h2> SpotBugs</h2>
<blockquote>
<p>SpotBugs是Findbugs的继任者（Findbugs已经于2016年后不再维护），用于对代码进行静态分析，查找相关的漏洞; 它是一款自由软件，按照GNU Lesser General Public License 的条款发布。</p>
</blockquote>`,r:{minutes:2.86,words:859},y:"a",t:"SpotBugs插件详解"},[":md"]],["v-44b73af2","/develop/quality-assurance/ut/dev-ut-springboot2.html",{d:1553472e6,l:"2019年3月25日",c:["质量保障"],g:["代码质量"],e:`<h1> SpringBoot2+H2+Mockito实战</h1>
<blockquote>
<p>在真实的开发中，我们通常是使用SpringBoot的，目前SpringBoot是v2.4.x的版本（SpringBoot 2.2.2.RELEASE之前默认是使用 JUnit4，之后版本默认使用Junit5）；所以我们写个基于SpringBoot2.4+H2的内存库的简单例子，同时加点必要的单元测试。</p>
</blockquote>
<h2> 为何H2会被用来做单元测试</h2>
<p>一个 Junit单元测试的流程包括</p>
<ul>
<li>初始化数据</li>
<li>执行测试</li>
<li>销毁数据</li>
</ul>`,r:{minutes:4.58,words:1375},y:"a",t:"SpringBoot2+H2+Mockito实战"},[":md"]],["v-b5b2dbc2","/develop/quality-assurance/ut/dev-ut-unit-test.html",{d:155304e7,l:"2019年3月20日",c:["质量保障"],g:["代码质量"],e:`<h1> 浅谈单元测试</h1>
<blockquote>
<p>单元测试（unit testing），是指对软件中的最小可测试单元进行检查和验证。这是基础，所以围绕着单元测试，我从网上搜集和总结了相关的概念，以助你完善体系。</p>
</blockquote>
<h2> 什么是单元测试？</h2>
<blockquote>
<p>来自百度百科。</p>
</blockquote>
<p>单元测试（unit testing），是指对软件中的最小可测试单元进行检查和验证。对于单元测试中单元的含义，一般来说，要根据实际情况去判定其具体含义，如C语言中单元指一个函数，Java里单元指一个类，图形化的软件中可以指一个窗口或一个菜单等。总的来说，单元就是人为规定的最小的被测功能模块。单元测试是在软件开发过程中要进行的最低级别的测试活动，软件的独立单元将在与程序的其他部分相隔离的情况下进行测试。</p>`,r:{minutes:8.42,words:2526},y:"a",t:"浅谈单元测试"},[":md"]],["v-c9c030e6","/develop/quality-assurance/ut/dev-ut-x-junit-idea.html",{d:15533856e5,l:"2019年3月24日",c:["质量保障"],g:["代码质量"],e:`<h1> IDEA下单元测试详解</h1>
<blockquote>
<p>工欲善其事必先利其器，我们在写单元测试一定要使用工具，这将能大幅度提升编码的效率。本文以IDEA为例，看看如何利用插件提升效率。</p>
</blockquote>
<h2> 场景准备</h2>
<p>准备一个待测试的类, 其中还包含着错误。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>gavin<span class="token punctuation">.</span>james<span class="token punctuation">.</span>junit4<span class="token punctuation">.</span>module</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Calculator</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">int</span> result <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * add.
     *
     * <span class="token keyword">@param</span> <span class="token parameter">operand1</span> first param
     * <span class="token keyword">@param</span> <span class="token parameter">operand2</span> second param
     * <span class="token keyword">@return</span> sum
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">int</span> operand1<span class="token punctuation">,</span> <span class="token keyword">int</span> operand2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        result <span class="token operator">=</span> operand1 <span class="token operator">+</span> operand2<span class="token punctuation">;</span>
        <span class="token keyword">return</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">subtract</span><span class="token punctuation">(</span><span class="token keyword">int</span> operand1<span class="token punctuation">,</span> <span class="token keyword">int</span> operand2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        result <span class="token operator">=</span> operand1 <span class="token operator">-</span> operand2<span class="token punctuation">;</span>
        <span class="token keyword">return</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">multiple</span><span class="token punctuation">(</span><span class="token keyword">int</span> operand1<span class="token punctuation">,</span> <span class="token keyword">int</span> operand2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        result <span class="token operator">=</span> operand1 <span class="token operator">*</span> operand2<span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token punctuation">;</span> <span class="token punctuation">;</span> <span class="token punctuation">)</span> <span class="token punctuation">{</span>                    <span class="token comment">//死循环</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">divide</span><span class="token punctuation">(</span><span class="token keyword">int</span> operand1<span class="token punctuation">,</span> <span class="token keyword">int</span> operand2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        result <span class="token operator">=</span> operand1 <span class="token operator">/</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">getResult</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,r:{minutes:1.69,words:507},y:"a",t:"IDEA下单元测试详解"},[":md"]],["v-2f9ed901","/develop/quality-assurance/ut/dev-ut-x-junit.html",{d:15531264e5,l:"2019年3月21日",c:["质量保障"],g:["代码质量"],e:`<h1> JUnit4 详解</h1>
<blockquote>
<p>JUint是Java编程语言的单元测试框架，用于编写和运行可重复的自动化测试。本文主要针对Junit4要点进行梳理总结。</p>
</blockquote>
<h2> 什么是JUnit？</h2>
<p>JUint是Java编程语言的单元测试框架，用于编写和运行可重复的自动化测试。</p>
<h2> JUnit特点？</h2>
<p>JUnit 是一个开放的资源框架，用于编写和运行测试。</p>
<ul>
<li>提供注解来识别测试方法。</li>
<li>提供断言来测试预期结果。</li>
<li>JUnit 测试允许你编写代码更快，并能提高质量。</li>
<li>JUnit 优雅简洁。没那么复杂，花费时间较少。</li>
<li>JUnit测试可以自动运行并且检查自身结果并提供即时反馈。所以也没有必要人工梳理测试结果的报告。</li>
<li>JUnit测试可以被组织为测试套件，包含测试用例，甚至其他的测试套件。</li>
<li>JUnit在一个条中显示进度。如果运行良好则是绿色；如果运行失败，则变成红色。</li>
</ul>`,r:{minutes:13.49,words:4047},y:"a",t:"JUnit4 详解"},[":md"]],["v-6610f2c8","/develop/quality-assurance/ut/dev-ut-x-junit5.html",{d:15532128e5,l:"2019年3月22日",c:["质量保障"],g:["代码质量"],e:`<h1> Junit5 详解</h1>
<blockquote>
<p>JUnit 5是JUnit的下一代。目标是为JVM上的开发人员端测试创建一个最新的基础。这包括专注于Java 8及更高版本，以及启用许多不同风格的测试。</p>
</blockquote>
<h2> 官方资料</h2>
<blockquote>
<p>最好的资料依然在Junit官方网站，以下我帮你总结下Junit相关的官方网址。</p>
</blockquote>
<ul>
<li>官网地址</li>
</ul>
<p><a href="https://junit.org/junit5/" target="_blank" rel="noopener noreferrer">https://junit.org/junit5/</a></p>`,r:{minutes:15.73,words:4719},y:"a",t:"Junit5 详解"},[":md"]],["v-0ec30915","/develop/quality-assurance/ut/dev-ut-x-mockito.html",{d:15532992e5,l:"2019年3月23日",c:["质量保障"],g:["代码质量"],e:`<h1> Mockito 详解</h1>
<blockquote>
<p>Mock通常是指，在测试一个对象A时，我们构造一些假的对象来模拟与A之间的交互，而这些Mock对象的行为是我们事先设定且符合预期。通过这些Mock对象来测试A在正常逻辑，异常逻辑或压力情况下工作是否正常。而Mockito是最流行的Java mock框架之一。</p>
</blockquote>
<h2> 什么是 Mock 测试</h2>
<blockquote>
<p>Mock通常是指，在测试一个对象A时，我们构造一些假的对象来模拟与A之间的交互，而这些Mock对象的行为是我们事先设定且符合预期。通过这些Mock对象来测试A在正常逻辑，异常逻辑或压力情况下工作是否正常。</p>
</blockquote>`,r:{minutes:11.56,words:3467},y:"a",t:"Mockito 详解"},[":md"]],["v-3706649a","/404.html",{y:"p",t:""},[]],["v-2d0aa3fe","/me/",{y:"p",t:"Me"},[]],["v-3903e063","/develop/certificate/",{y:"p",t:"Certificate"},[]],["v-1891b76b","/develop/",{y:"p",t:"Develop"},[]],["v-c5b06a54","/develop/cron/",{y:"p",t:"Cron"},[]],["v-114ea066","/develop/design/",{y:"p",t:"Design"},[]],["v-57f4af54","/develop/dev-agile/",{y:"p",t:"Dev Agile"},[]],["v-406294c2","/develop/opensource/",{y:"p",t:"Opensource"},[]],["v-08467114","/develop/package/",{y:"p",t:"Package"},[]],["v-25c9a30a","/develop/pattern/",{y:"p",t:"Pattern"},[]],["v-7165b58c","/develop/protocol/",{y:"p",t:"Protocol"},[]],["v-5659c422","/develop/refactor/",{y:"p",t:"Refactor"},[]],["v-20af53f3","/develop/regex/",{y:"p",t:"Regex"},[]],["v-6edae1e4","/develop/security/",{y:"p",t:"Security"},[]],["v-c3ef996e","/develop/spec/",{y:"p",t:"Spec"},[]],["v-269071d9","/develop/usage/",{y:"p",t:"Usage"},[]],["v-48805d09","/db/nosql-es/",{y:"p",t:"Nosql Es"},[]],["v-2d0a81d8","/db/",{y:"p",t:"Db"},[]],["v-1f5734f3","/db/nosql-mongo/",{y:"p",t:"Nosql Mongo"},[]],["v-274e014c","/db/nosql-redis/",{y:"p",t:"Nosql Redis"},[]],["v-84085c0e","/db/sql/",{y:"p",t:"Sql"},[]],["v-5112dfa6","/db/sql-lan/",{y:"p",t:"Sql Lan"},[]],["v-51c4def8","/db/sql-mysql/",{y:"p",t:"Sql Mysql"},[]],["v-696b0c9a","/db/sql-oracle/",{y:"p",t:"Sql Oracle"},[]],["v-ffb97496","/java/basic/",{y:"p",t:"Basic"},[]],["v-14c69af4","/java/",{y:"p",t:"Java"},[]],["v-16722c46","/java/collection/",{y:"p",t:"Collection"},[]],["v-9828af56","/java/io/",{y:"p",t:"Io"},[]],["v-2b9e3a1e","/java/javaup/",{y:"p",t:"Javaup"},[]],["v-6cec0ebc","/java/jvm/",{y:"p",t:"Jvm"},[]],["v-53c5f3b8","/java/others/",{y:"p",t:"Others"},[]],["v-211a2a4e","/java/spring/",{y:"p",t:"Spring"},[]],["v-48579df1","/java/thread/",{y:"p",t:"Thread"},[]],["v-27762a11","/tool/docker/",{y:"p",t:"Docker"},[]],["v-3a02344a","/tool/git/",{y:"p",t:"Git"},[]],["v-69afbe6c","/tool/gradle/",{y:"p",t:"Gradle"},[]],["v-6f103f63","/develop/algorithms-structures/alg-basic/",{y:"p",t:"Alg Basic"},[]],["v-5bb56591","/develop/algorithms-structures/",{y:"p",t:"Algorithms Structures"},[]],["v-19b50ae4","/develop/algorithms-structures/alg-core/",{y:"p",t:"Alg Core"},[]],["v-17602aee","/develop/algorithms-structures/alg-domain/",{y:"p",t:"Alg Domain"},[]],["v-f3741e7e","/develop/algorithms-structures/alg-other/",{y:"p",t:"Alg Other"},[]],["v-17f21722","/develop/algorithms-structures/alg-sort/",{y:"p",t:"Alg Sort"},[]],["v-26e3eac3","/develop/quality-assurance/code-style/",{y:"p",t:"Code Style"},[]],["v-e867e24a","/develop/quality-assurance/",{y:"p",t:"Quality Assurance"},[]],["v-577684b5","/develop/quality-assurance/ut/",{y:"p",t:"Ut"},[]],["v-5bc93818","/category/",{y:"p",t:"分类",I:!1},[]],["v-744d024e","/tag/",{y:"p",t:"标签",I:!1},[]],["v-e52c881c","/article/",{y:"p",t:"文章",I:!1},[]],["v-154dc4c4","/star/",{y:"p",t:"收藏",I:!1},[]],["v-01560935","/timeline/",{y:"p",t:"时间轴",I:!1},[]],["v-03d57386","/category/%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97/",{y:"p",t:"使用指南 分类",I:!1},["/category/使用指南/"]],["v-83e1f92e","/tag/%E7%A6%81%E7%94%A8/",{y:"p",t:"标签: 禁用",I:!1},["/tag/禁用/"]],["v-506407f4","/en/article/",{y:"p",t:"Articles",I:!1},[]],["v-37a8c5a0","/en/star/",{y:"p",t:"Star",I:!1},[]],["v-0379cba1","/en/timeline/",{y:"p",t:"Timeline",I:!1},[]],["v-ad1708ba","/category/%E8%B5%84%E6%BA%90%E5%AF%BC%E8%88%AA/",{y:"p",t:"资源导航 分类",I:!1},["/category/资源导航/"]],["v-1e447d61","/tag/%E6%96%87%E7%AB%A0%E5%8A%A0%E5%AF%86/",{y:"p",t:"标签: 文章加密",I:!1},["/tag/文章加密/"]],["v-0e743c94","/category/%E7%B3%BB%E7%BB%9F%E8%AE%A4%E8%AF%81/",{y:"p",t:"系统认证 分类",I:!1},["/category/系统认证/"]],["v-484552dc","/tag/markdown/",{y:"p",t:"标签: Markdown",I:!1},[]],["v-5fed750f","/category/%E5%BC%80%E5%8F%91%E7%90%86%E8%AE%BA/",{y:"p",t:"开发理论 分类",I:!1},["/category/开发理论/"]],["v-a378ad66","/tag/%E9%A1%B5%E9%9D%A2%E9%85%8D%E7%BD%AE/",{y:"p",t:"标签: 页面配置",I:!1},["/tag/页面配置/"]],["v-41590e77","/category/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/",{y:"p",t:"设计模式 分类",I:!1},["/category/设计模式/"]],["v-7b167472","/tag/%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97/",{y:"p",t:"标签: 使用指南",I:!1},["/tag/使用指南/"]],["v-503f41d6","/category/%E5%BC%80%E5%8F%91%E6%B5%81%E7%A8%8B/",{y:"p",t:"开发流程 分类",I:!1},["/category/开发流程/"]],["v-6dd3fb2d","/tag/%E8%B5%84%E6%BA%90%E5%AF%BC%E8%88%AA/",{y:"p",t:"标签: 资源导航",I:!1},["/tag/资源导航/"]],["v-50a76998","/category/%E5%BC%80%E6%BA%90%E5%8D%8F%E8%AE%AE/",{y:"p",t:"开源协议 分类",I:!1},["/category/开源协议/"]],["v-75abdec8","/tag/%E8%AE%A4%E8%AF%81/",{y:"p",t:"标签: 认证",I:!1},["/tag/认证/"]],["v-0a7437b0","/category/%E5%B8%B8%E7%94%A8%E5%BC%80%E5%8F%91%E5%BA%93/",{y:"p",t:"常用开发库 分类",I:!1},["/category/常用开发库/"]],["v-7365137c","/tag/cron%E8%A1%A8%E8%BE%BE%E5%BC%8F/",{y:"p",t:"标签: CRON表达式",I:!1},["/tag/cron表达式/"]],["v-300e8674","/category/%E9%87%8D%E6%9E%84%E6%8A%80%E5%B7%A7/",{y:"p",t:"重构技巧 分类",I:!1},["/category/重构技巧/"]],["v-05b88e01","/tag/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/",{y:"p",t:"标签: 设计模式",I:!1},["/tag/设计模式/"]],["v-5f9463c4","/category/%E5%BC%80%E5%8F%91/",{y:"p",t:"开发 分类",I:!1},["/category/开发/"]],["v-149ec160","/tag/%E5%BC%80%E5%8F%91%E6%B5%81%E7%A8%8B/",{y:"p",t:"标签: 开发流程",I:!1},["/tag/开发流程/"]],["v-7ef0488a","/category/nosql-elasticsearch/",{y:"p",t:"NoSQL ElasticSearch 分类",I:!1},[]],["v-094082c0","/tag/%E5%8D%8F%E8%AE%AE/",{y:"p",t:"标签: 协议",I:!1},["/tag/协议/"]],["v-b5fd4516","/category/nosql-mongodb/",{y:"p",t:"NoSQL MongoDB 分类",I:!1},[]],["v-60078044","/tag/%E5%B8%B8%E7%94%A8%E5%BC%80%E5%8F%91%E5%BA%93/",{y:"p",t:"标签: 常用开发库",I:!1},["/tag/常用开发库/"]],["v-1f2550e8","/category/nosql-redis/",{y:"p",t:"NoSQL Redis 分类",I:!1},[]],["v-ce1020a8","/tag/%E7%BD%91%E7%BB%9C%E5%8D%8F%E8%AE%AE/",{y:"p",t:"标签: 网络协议",I:!1},["/tag/网络协议/"]],["v-74f11498","/category/%E6%95%B0%E6%8D%AE%E5%BA%93%E5%8E%9F%E7%90%86/",{y:"p",t:"数据库原理 分类",I:!1},["/category/数据库原理/"]],["v-3485b34a","/tag/%E5%B8%B8%E8%A7%81%E9%87%8D%E6%9E%84%E6%8A%80%E5%B7%A7/",{y:"p",t:"标签: 常见重构技巧",I:!1},["/tag/常见重构技巧/"]],["v-ebdc3094","/category/sql%E8%AF%AD%E8%A8%80/",{y:"p",t:"SQL语言 分类",I:!1},["/category/sql语言/"]],["v-66f1a1a4","/tag/%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F/",{y:"p",t:"标签: 正则表达式",I:!1},["/tag/正则表达式/"]],["v-009d76c4","/category/sql-mysql/",{y:"p",t:"SQL MySQL 分类",I:!1},[]],["v-07ff869f","/tag/%E5%AE%89%E5%85%A8%E7%9B%B8%E5%85%B3/",{y:"p",t:"标签: 安全相关",I:!1},["/tag/安全相关/"]],["v-7189e1c4","/category/java-%E5%9F%BA%E7%A1%80/",{y:"p",t:"Java 基础 分类",I:!1},["/category/java-基础/"]],["v-244cf499","/tag/%E5%BC%80%E5%8F%91%E7%90%86%E8%AE%BA/",{y:"p",t:"标签: 开发理论",I:!1},["/tag/开发理论/"]],["v-c7024be8","/category/java-%E9%9B%86%E5%90%88/",{y:"p",t:"Java 集合 分类",I:!1},["/category/java-集合/"]],["v-e692110a","/tag/%E9%9A%8F%E6%89%8B%E8%AE%B0/",{y:"p",t:"标签: 随手记",I:!1},["/tag/随手记/"]],["v-0fdf2423","/category/java-ionioaio/",{y:"p",t:"Java IO/NIO/AIO 分类",I:!1},[]],["v-dc224880","/tag/nosql-elasticsearch/",{y:"p",t:"标签: NoSQL ElasticSearch",I:!1},[]],["v-d3e06898","/category/java-%E6%96%B0%E7%89%B9%E6%80%A7/",{y:"p",t:"Java 新特性 分类",I:!1},["/category/java-新特性/"]],["v-3264112b","/tag/nosql-mongodb/",{y:"p",t:"标签: NoSQL MongoDB",I:!1},[]],["v-ce1c513e","/category/java-jvm/",{y:"p",t:"Java JVM 分类",I:!1},[]],["v-0f3580c2","/tag/nosql-redis/",{y:"p",t:"标签: NoSQL Redis",I:!1},[]],["v-7d214bb7","/category/java-%E5%85%B6%E4%BB%96/",{y:"p",t:"Java 其他 分类",I:!1},["/category/java-其他/"]],["v-ca845d2c","/tag/%E6%95%B0%E6%8D%AE%E5%BA%93%E5%8E%9F%E7%90%86/",{y:"p",t:"标签: 数据库原理",I:!1},["/tag/数据库原理/"]],["v-6909452a","/category/java-%E5%A4%9A%E7%BA%BF%E7%A8%8B/",{y:"p",t:"Java 多线程 分类",I:!1},["/category/java-多线程/"]],["v-508ef528","/tag/sql%E8%AF%AD%E8%A8%80/",{y:"p",t:"标签: SQL语言",I:!1},["/tag/sql语言/"]],["v-5571eef5","/category/%E7%AE%97%E6%B3%95%E5%92%8C%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84/",{y:"p",t:"算法和数据结构 分类",I:!1},["/category/算法和数据结构/"]],["v-6eaa757a","/tag/sql-mysql/",{y:"p",t:"标签: SQL MySQL",I:!1},[]],["v-791f1092","/category/%E4%BB%A3%E7%A0%81%E8%A7%84%E8%8C%83/",{y:"p",t:"代码规范 分类",I:!1},["/category/代码规范/"]],["v-20002c0c","/tag/java-%E5%9F%BA%E7%A1%80/",{y:"p",t:"标签: Java 基础",I:!1},["/tag/java-基础/"]],["v-9b4441e8","/category/%E8%B4%A8%E9%87%8F%E4%BF%9D%E9%9A%9C/",{y:"p",t:"质量保障 分类",I:!1},["/category/质量保障/"]],["v-1af4e242","/tag/java-%E9%9B%86%E5%90%88/",{y:"p",t:"标签: Java 集合",I:!1},["/tag/java-集合/"]],["v-5decfa84","/en/category/",{y:"p",t:"Category",I:!1},[]],["v-c57c504e","/tag/java-ionioaio/",{y:"p",t:"标签: Java IO/NIO/AIO",I:!1},[]],["v-613ebf84","/tag/java-%E6%96%B0%E7%89%B9%E6%80%A7/",{y:"p",t:"标签: Java 新特性",I:!1},["/tag/java-新特性/"]],["v-42e1ac2a","/tag/java-jvm/",{y:"p",t:"标签: Java JVM",I:!1},[]],["v-08d15826","/tag/java-%E5%85%B6%E4%BB%96/",{y:"p",t:"标签: Java 其他",I:!1},["/tag/java-其他/"]],["v-bb4bcc98","/tag/java-%E5%A4%9A%E7%BA%BF%E7%A8%8B/",{y:"p",t:"标签: Java 多线程",I:!1},["/tag/java-多线程/"]],["v-13770b26","/tag/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84/",{y:"p",t:"标签: 数据结构",I:!1},["/tag/数据结构/"]],["v-3eb7880e","/tag/%E7%AE%97%E6%B3%95%E6%80%9D%E6%83%B3/",{y:"p",t:"标签: 算法思想",I:!1},["/tag/算法思想/"]],["v-4e636242","/tag/%E9%A2%86%E5%9F%9F%E7%AE%97%E6%B3%95/",{y:"p",t:"标签: 领域算法",I:!1},["/tag/领域算法/"]],["v-200bf6bc","/tag/%E5%85%B6%E4%BB%96/",{y:"p",t:"标签: 其他",I:!1},["/tag/其他/"]],["v-fe7b1fa2","/tag/%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95/",{y:"p",t:"标签: 排序算法",I:!1},["/tag/排序算法/"]],["v-3d7e901c","/tag/%E4%BB%A3%E7%A0%81%E8%A7%84%E8%8C%83/",{y:"p",t:"标签: 代码规范",I:!1},["/tag/代码规范/"]],["v-1c6b640a","/tag/%E4%BB%A3%E7%A0%81%E8%B4%A8%E9%87%8F/",{y:"p",t:"标签: 代码质量",I:!1},["/tag/代码质量/"]],["v-075c6c62","/en/tag/",{y:"p",t:"Tag",I:!1},[]]];var di=C({name:"Vuepress",setup(){const e=Cv();return()=>i(e.value)}}),e3=()=>Y6.reduce((e,[t,n,a,o])=>(e.push({name:t,path:n,component:di,meta:a},{path:n.endsWith("/")?n+"index.html":n.substring(0,n.length-5),redirect:n},...o.map(l=>({path:l===":md"?n.substring(0,n.length-5)+".md":l,redirect:n}))),e),[{name:"404",path:"/:catchAll(.*)",component:di}]),t3=r1,n3=()=>{const e=$1({history:t3(wo("/")),routes:e3(),scrollBehavior:(t,n,a)=>a||(t.hash?{el:t.hash}:{top:0})});return e.beforeResolve(async(t,n)=>{var a;(t.path!==n.path||n===St)&&([t.meta._data]=await Promise.all([Ot.resolvePageData(t.name),(a=mc[t.name])==null?void 0:a.__asyncLoader()]))}),e},a3=e=>{e.component("ClientOnly",Io),e.component("Content",Ac)},o3=(e,t,n)=>{const a=Bs(()=>t.currentRoute.value.path),o=Bs(()=>Ot.resolveRouteLocale(Dn.value.locales,a.value)),l=Ro(a,()=>t.currentRoute.value.meta._data),s=L(()=>Ot.resolveLayouts(n)),c=L(()=>Ot.resolveSiteLocaleData(Dn.value,o.value)),d=L(()=>Ot.resolvePageFrontmatter(l.value)),u=L(()=>Ot.resolvePageHeadTitle(l.value,c.value)),p=L(()=>Ot.resolvePageHead(u.value,d.value,c.value)),h=L(()=>Ot.resolvePageLang(l.value,c.value)),m=L(()=>Ot.resolvePageLayout(l.value,s.value));return e.provide(Sv,s),e.provide(_c,l),e.provide(fc,d),e.provide(qv,u),e.provide(gc,p),e.provide(bc,h),e.provide(kc,m),e.provide(ol,o),e.provide(Lc,c),Object.defineProperties(e.config.globalProperties,{$frontmatter:{get:()=>d.value},$head:{get:()=>p.value},$headTitle:{get:()=>u.value},$lang:{get:()=>h.value},$page:{get:()=>l.value},$routeLocale:{get:()=>o.value},$site:{get:()=>Dn.value},$siteLocale:{get:()=>c.value},$withBase:{get:()=>Ae}}),{layouts:s,pageData:l,pageFrontmatter:d,pageHead:p,pageHeadTitle:u,pageLang:h,pageLayout:m,routeLocale:o,siteData:Dn,siteLocaleData:c}},r3=()=>{const e=xv(),t=Ec(),n=H([]),a=()=>{e.value.forEach(l=>{const s=l3(l);s&&n.value.push(s)})},o=()=>{document.documentElement.lang=t.value,n.value.forEach(l=>{l.parentNode===document.head&&document.head.removeChild(l)}),n.value.splice(0,n.value.length),e.value.forEach(l=>{const s=s3(l);s!==null&&(document.head.appendChild(s),n.value.push(s))})};it(jv,o),fe(()=>{a(),o(),ue(()=>e.value,o)})},l3=([e,t,n=""])=>{const a=Object.entries(t).map(([c,d])=>ce(d)?`[${c}=${JSON.stringify(d)}]`:d===!0?`[${c}]`:"").join(""),o=`head > ${e}${a}`;return Array.from(document.querySelectorAll(o)).find(c=>c.innerText===n)||null},s3=([e,t,n])=>{if(!ce(e))return null;const a=document.createElement(e);return Zn(t)&&Object.entries(t).forEach(([o,l])=>{ce(l)?a.setAttribute(o,l):l===!0&&a.setAttribute(o,"")}),ce(n)&&a.appendChild(document.createTextNode(n)),a},i3=kv,c3=async()=>{var n;const e=i3({name:"VuepressApp",setup(){var a;r3();for(const o of to)(a=o.setup)==null||a.call(o);return()=>[i(qc),...to.flatMap(({rootComponents:o=[]})=>o.map(l=>i(l)))]}}),t=n3();a3(e),o3(e,t,to);for(const a of to)await((n=a.enhance)==null?void 0:n.call(a,{app:e,router:t,siteData:Dn}));return e.use(t),{app:e,router:t}};c3().then(({app:e,router:t})=>{t.isReady().then(()=>{e.mount("#app")})});export{O6 as A,D6 as B,P6 as C,je as D,fe as E,Kn as F,ce as G,_3 as H,Zn as I,jt as J,Rl as K,S2 as L,J6 as O,M6 as R,tc as a,nc as b,d3 as c,c3 as createVueApp,Re as d,v3 as e,p3 as f,Op as g,C as h,Ne as i,Et as j,Ol as k,H as l,L as m,u3 as n,Tp as o,Te as p,ue as q,tt as r,i as s,Gn as t,m3 as u,R6 as v,Q0 as w,S6 as x,Oe as y,Bd as z};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/index.html-tM9LUljz.js","assets/plugin-vue_export-helper-x3n3nnut.js","assets/home.html-0-ZontNc.js","assets/slide.html-tjspY4Y1.js","assets/logo-vXLA1BkH.js","assets/index.html-GFLlJ4Kz.js","assets/index.html-XibBTTfK.js","assets/home.html-unxxK7JT.js","assets/slide.html-8HCz7e-W.js","assets/index.html-35Q99Bg7.js","assets/index.html-gZ8oHE72.js","assets/index.html-cjTH_B_e.js","assets/disable.html-lDmBqull.js","assets/encrypt.html-YqQuwIJL.js","assets/markdown.html-P3vCVt-D.js","assets/page.html-ZL-lcy1g.js","assets/study.html-PGrDS0Kh.js","assets/index.html-0L7KFe3H.js","assets/skill.html-P9f2Ag3q.js","assets/index.html-_V_-GZux.js","assets/index.html-RhKGz673.js","assets/mermaid.html-J0zQaCts.js","assets/zuosi.html-tpgKBF7r.js","assets/cert-cmm.html-pjUA3Nhx.js","assets/cert-dengbao.html-wH0NCdCw.js","assets/cert-iso27001.html-It5CtTp8.js","assets/dev-x-overview.html-RZAWZ-Qo.js","assets/dev-cron-x-tools.html-h6vSMoli.js","assets/dev-cron-x-usage.html-MMESHwzz.js","assets/adapter.html-Rt6pYFkI.js","assets/bridge.html-Ra8cSfXB.js","assets/builder.html-OJ-crT_r.js","assets/command.html-qIx2rLfR.js","assets/composite.html-NJ1YzZSJ.js","assets/decorator.html-e9728-sB.js","assets/end.html-mGL447jj.js","assets/facade.html-RCaDx-Wv.js","assets/factory.html-nn2FXbeL.js","assets/flyweight.html-mRT0i-53.js","assets/interpreter.html-Xg7u0xGT.js","assets/iterator.html-tkF4Ia1f.js","assets/mediator.html-oh0NhSZr.js","assets/memento.html-gF04iLO2.js","assets/observer.html-xHbMuWyf.js","assets/prototype.html--tMQN74u.js","assets/proxy.html-myGyBPp6.js","assets/responsibility.html-WFympJRW.js","assets/seven-principles.html-aUhNHF5a.js","assets/single.html-pqj0IvkC.js","assets/state.html-MxVIU119.js","assets/strategy.html-x4e9j7mW.js","assets/summary.html-dx7PdJWK.js","assets/template-method.html-EYX1Itlh.js","assets/thought.html-zJxhIQqB.js","assets/uml-class-diagram.html-pR3xCVLC.js","assets/visitor.html-e8XFknk8.js","assets/dev-lean-enterprise.html-v8XC9Twp.js","assets/dev-pratice-ddd.html-nAqX9QTb.js","assets/dev-pratice-tdd.html-ILfiuqv8.js","assets/dev-th-agile-kanban.html-TsSrdXoa.js","assets/dev-th-agile-scrum.html-VUkYyl6y.js","assets/dev-th-agile-xp.html-AkqMixiG.js","assets/dev-th-agile.html-zviaipaf.js","assets/dev-th-waterfall-model.html-zg8zFv5X.js","assets/dev-th-waterfall-vwxh.html-P6D-XDuY.js","assets/dev-workflow.html-eW4nGZe-.js","assets/dev-x-overview.html-ULQxANyn.js","assets/dev-agpl.html-jFSmpj4X.js","assets/dev-knowledge.html-Y5J-AA72.js","assets/dev-mulan.html-KyQcKW6d.js","assets/dev-opensource.html-OQIfVNpd.js","assets/dev-x-overview.html-zlk3OFzh.js","assets/dev-package-x-apache-common.html-DRHAjQND.js","assets/dev-package-x-google-guava.html-FI6-X3pl.js","assets/dev-package-x-hu-tool.html-uaIaGtMI.js","assets/dev-package-x-json.html-TYozJYAA.js","assets/dev-package-x-log.html-YGWgjASy.js","assets/dev-package-x-lombok.html-bJKLc6mK.js","assets/dev-package-x-mapstruct.html-p1ckVdIq.js","assets/dev-package-x-others.html-t-IMEoRs.js","assets/dev-package-x-overview.html-BkPc8wM-.js","assets/dev-package-x-spring-util.html-A2tBmEwJ.js","assets/10_bridge.html-LHHNnj6e.js","assets/11_compsite.html-F9B2e6H5.js","assets/12_decorator.html-sWD3mH_y.js","assets/13_flyweight.html-qLJ6sShW.js","assets/14_proxy.html-15XG_lSD.js","assets/15_chain.html-flF-abd_.js","assets/16_strategy.html-b6lVtM-N.js","assets/17_template.html-3Dm7fs6q.js","assets/18_command.html-2dIxyrps.js","assets/19_observer.html-xmUVz7kL.js","assets/1_overview.html-u30P4rqt.js","assets/20_visitor.html-TBhbfhP8.js","assets/21_state.html-vXPmvOi9.js","assets/22_interpreter.html-TZAKAxur.js","assets/23_iterator.html-1YDwgILh.js","assets/24_mediator.html-xVlBYu8P.js","assets/25_memento.html-iJeWixxz.js","assets/2_singleton.html-YXq5y6XM.js","assets/3_simple_factory.html-WYZ9XJp8.js","assets/4_factory_method.html-iYl3kG90.js","assets/5_abstract_factory.html-aYmwnZfx.js","assets/6_builder.html-FJtiwlak.js","assets/7_prototype.html-yVPs2mYD.js","assets/8_facade.html-hBQ_67ua.js","assets/9_adapter.html-GOsz9XRF.js","assets/dev-protocol-dns.html-ZssHz9rq.js","assets/dev-protocol-http.html-yHHnTeCz.js","assets/dev-protocol-ip.html-jgggDMgv.js","assets/dev-protocol-network-basic.html-sXYrOcgp.js","assets/dev-protocol-osi7.html-AQ96ff4V.js","assets/dev-protocol-overview.html-TDRWDMsO.js","assets/dev-protocol-tcpip.html-QArjGx3C.js","assets/dev-protocol-tool-netstat.html-yRw2BfZV.js","assets/dev-protocol-tool-tcpdump.html-8nVfauQk.js","assets/dev-protocol-tool-wireshark.html-57Ir1pE9.js","assets/dev-protocol-udp.html-KF4GjVJ2.js","assets/dev-protocol-url.html-wjoYmqws.js","assets/dev-refactor-if-else.html-zD-ifWIR.js","assets/dev-refactor-not-null.html-sAmFyuDX.js","assets/dev-regex-all.html-K0ff2dXc.js","assets/dev-regex-tools.html-GxJhIU-5.js","assets/dev-regex-usage.html-rTScysfy.js","assets/dev-security-overview.html-StfEB3Fq.js","assets/dev-security-x-click-hijack.html-9cNQO2x_.js","assets/dev-security-x-csrf.html-cRsOtw6X.js","assets/dev-security-x-ddos.html-Bjr59_RM.js","assets/dev-security-x-injection.html-oZES03Np.js","assets/dev-security-x-owasp.html-dHEvgMT_.js","assets/dev-security-x-xss.html-nuSCtEmI.js","assets/dev-security-y-pentest-workflow.html-Y6eGnvZ8.js","assets/dev-security-y-pratice.html-XTzFyQD6.js","assets/dev-microservice-kangwei.html-OLBYShnh.js","assets/dev-th-acid.html-5QACYqhV.js","assets/dev-th-base.html--wQ8-SYQ.js","assets/dev-th-cap.html--h9U-Rx2.js","assets/dev-th-solid.html-1xHU3xpy.js","assets/dev-x-overview.html-MZY1d4wb.js","assets/dev-usage-exe-package.html-HF4-Asrd.js","assets/dev-usage-export-pdf.html-b2RSbMEO.js","assets/dev-usage-flotjs.html-d0ATXUVr.js","assets/dev-usage-input-password.html-H_sBy1Pf.js","assets/dev-usage-jar-readfile.html-p1uYtW_P.js","assets/dev-usage-newObj.html-66v0Vh-B.js","assets/dev-usage-overview.html-bprphO7l.js","assets/dev-usage-zkfinger.html-58VhFriv.js","assets/elasticsearch-awesome-es.html-WBUwroUc.js","assets/elasticsearch-backup.html-FZaEOwt2.js","assets/elasticsearch-wrapper-query.html-A-ZV4Sfm.js","assets/elasticsearch-x-agg-bucket.html-BqjF2am3.js","assets/elasticsearch-x-agg-metric.html-P6zKkeFH.js","assets/elasticsearch-x-agg-pipeline.html-nwZVY_Rh.js","assets/elasticsearch-x-dsl-com.html-HY77lDTy.js","assets/elasticsearch-x-dsl-full-text.html-FYPd6zJ6.js","assets/elasticsearch-x-dsl-term.html-phUQ8XWM.js","assets/elasticsearch-x-index-mapping.html-JBCNHKEc.js","assets/elasticsearch-x-index-template.html-cu7x_hdZ.js","assets/elasticsearch-x-install.html-6M5PkChZ.js","assets/elasticsearch-x-introduce-1.html-SaMofbiD.js","assets/elasticsearch-x-introduce-2.html-m8QFthED.js","assets/elasticsearch-x-usage.html-dcOSw6T4.js","assets/elasticsearch-y-peformance.html-MoFr7QsH.js","assets/elasticsearch-y-th-1.html-9pOQ25Qo.js","assets/elasticsearch-y-th-2.html-VW-WZD9o.js","assets/elasticsearch-y-th-3.html-LY_wn-06.js","assets/elasticsearch-y-th-4.html-jz6aoOA8.js","assets/elasticsearch-z-hello.html-mLu1S_Zb.js","assets/elasticsearch-z-meituan.html-z-e3u6q6.js","assets/elasticsearch-z-tencent.html-8Ce3aSn5.js","assets/elasticsearch.html-g_lLlc56.js","assets/mongo-performance-improve.html-OWtjb-X_.js","assets/mongo-performance-model.html-qTwgZ9g5.js","assets/mongo-x-basic.html-pL5w97Bu.js","assets/mongo-x-ecosystem.html-dhSexzHJ.js","assets/mongo-x-usage-1.html-B-6CFtG9.js","assets/mongo-x-usage-2.html-SaQBa5Go.js","assets/mongo-x-usage-3.html-lCPfOjiD.js","assets/mongo-x-usage-4.html-p30uuQ1P.js","assets/mongo-x-usage-5.html-yCiRKdKw.js","assets/mongo-y-arch.html-4ZD9wAHM.js","assets/mongo-y-cache.html-geREZS6W.js","assets/mongo-y-checkpoint.html-Jx9noSRq.js","assets/mongo-y-doc.html-Zgrs4rZZ.js","assets/mongo-y-ds.html-Zf2yKMQh.js","assets/mongo-y-introduce.html-sW0OAuA8.js","assets/mongo-y-page.html-ehXspk4d.js","assets/mongo-y-trans.html-_L9FlB-3.js","assets/mongo-z-backup.html-Af86UiRG.js","assets/mongo-z-index.html-DrTCWHQA.js","assets/mongo-z-rep.html-34kVdVW3.js","assets/mongo-z-sharding.html-MQVD2n1r.js","assets/mongo.html-dvYvZsY5.js","assets/postgresql-replace.html-PwaNCRK-.js","assets/db-redis-data-type-enc.html-ja9_A6MY.js","assets/db-redis-data-type-special.html-tokWQvoF.js","assets/db-redis-data-type-stream.html-OzmKFJwI.js","assets/db-redis-data-types.html-bUIYWq9z.js","assets/db-redis-introduce.html-liWQYnXv.js","assets/db-redis-overview.html-fmLWp1iK.js","assets/db-redis-x-cache.html-7w3Jaa3N.js","assets/db-redis-x-cluster.html-GtLwduRj.js","assets/db-redis-x-copy.html-wCidnfuM.js","assets/db-redis-x-event.html-0IXaZjrP.js","assets/db-redis-x-performance.html-V4rrVcao.js","assets/db-redis-x-pub-sub.html-aKhXjq-s.js","assets/db-redis-x-rdb-aof.html-nIw4BXJl.js","assets/db-redis-x-redis-ds.html-89iC6WsE.js","assets/db-redis-x-redis-object.html-5hGH_jcS.js","assets/db-redis-x-sentinel.html-LaTOsjvr.js","assets/db-redis-x-trans.html-ltPyaTJ3.js","assets/db-redis-x-version-lastest.html-kQZPTSAf.js","assets/db-redis-y-monitor.html-VIL8SArJ.js","assets/db-redis-y-mt-1.html-q6xLQc9i.js","assets/db-redis-y-weibo.html-1o4fTQ0d.js","assets/db-redis-z-mianshi.html-HDcT6hl9.js","assets/sql-db-howitworks.html-430TKSy0.js","assets/sql-db-theory-concept.html-hXrqKvFv.js","assets/sql-db-theory-design.html-R2fe6cPv.js","assets/sql-db-theory.html-Ei1ncshU.js","assets/sql-db.html-lOGCEDNJ.js","assets/sql-lan-leetcode.html-TrKKs2bV.js","assets/sql-lan-optimize.html-ml7wh2-3.js","assets/sql-lan-pratice.html-0qLo-pB0.js","assets/sql-lan.html-YD8EoteO.js","assets/sql-mysql-b-tree.html-0opSpCKe.js","assets/sql-mysql-devide.html-rT4ni576.js","assets/sql-mysql-engine.html-X3zglDcd.js","assets/sql-mysql-execute.html-Mmb_pRx6.js","assets/sql-mysql-index-improve-mt.html-gUOCdOwy.js","assets/sql-mysql-mvcc.html-KR0WPTY_.js","assets/sql-mysql-overview.html-QzAbPLBh.js","assets/sql-mysql-performance.html-reAEUPXY.js","assets/sql-mysql-slave.html-4GM3J5Ce.js","assets/sql-mysql-sql-advisor-mt.html-GZi_qOC7.js","assets/sql-mysql-sql-costmodel-mt.html-xWJcSyPH.js","assets/sql-mysql-sql-parser.html-vr8iuua8.js","assets/sql-mysql-theory.html-YP-QcO0h.js","assets/sql-mysql-xunjian-mt.html-Fq7bXqZP.js","assets/sql-oracle-overview.html-AQUPFsM8.js","assets/java-advanced-spi.html-OCA_887H.js","assets/java-basic-lan-basic.html-SD329ZLz.js","assets/java-basic-lan-sum.html-sUecsAQM.js","assets/java-basic-oop.html-bPysY-wI.js","assets/java-basic-x-annotation.html-SwWFUZxj.js","assets/java-basic-x-exception.html-ec5SlcuI.js","assets/java-basic-x-generic.html-vcMdiXt9.js","assets/java-basic-x-reflection.html-FdPkcznX.js","assets/java-collection-ArrayList.html-njm6CTjQ.js","assets/java-collection-LinkedList.html-6m0ZAxKh.js","assets/java-collection-PriorityQueue.html-uHZvmTEc.js","assets/java-collection-Queue_Stack.html-RjYKz7dJ.js","assets/java-collection-all.html-EkiaBgLw.js","assets/java-map-HashMap_HashSet.html-03-WFEQf.js","assets/java-map-LinkedHashMap_LinkedHashSet.html-xkU-Ow48.js","assets/java-map-TreeMap_TreeSet.html-K1njIbcO.js","assets/java-map-WeakHashMap.html-s8EkoYvR.js","assets/java-io-aio.html-i7WmpOI6.js","assets/java-io-basic-category.html-d6Z_uj73.js","assets/java-io-basic-code-inputstream.html-YMCU2GNG.js","assets/java-io-basic-code-outputstream.html-lzMBkAxw.js","assets/java-io-basic-design-pattern.html-FDedPZBm.js","assets/java-io-basic-usage.html-vSq5PJu9.js","assets/java-io-bio.html-HZeSLZ17.js","assets/java-io-model.html-tjSkvzGZ.js","assets/java-io-nio-netty.html-pSsy7bOz.js","assets/java-io-nio-select-epoll.html-JmVwyJE1.js","assets/java-io-nio-zerocopy.html-2cQP3cmS.js","assets/java-io-nio.html-BqeuTqPe.js","assets/java-io-overview.html-e7nsc7Cg.js","assets/java-8-up-overview.html-9maU2MiA.js","assets/java10.html-gVJb2ZOH.js","assets/java11.html-aOA_Gzff.js","assets/java12-17.html-nKSfV1Vg.js","assets/java12.html-DV__dxMr.js","assets/java13.html-o0OZNf7x.js","assets/java14.html-7bPBldnm.js","assets/java15.html-VVi04tUh.js","assets/java16.html-_3hNwrkg.js","assets/java17.html-juhlAkxS.js","assets/java8-anno-repeat.html-J4iiQOyJ.js","assets/java8-default.html-eLsf6OGF.js","assets/java8-javafx.html-kpLIKrgR.js","assets/java8-jre.html-2VHR85aE.js","assets/java8-localdatetime.html-asAcei7b.js","assets/java8-optional.html-YaY9kr2P.js","assets/java8-others.html-I90IruRB.js","assets/java8-permgen.html-gOihflFb.js","assets/java8-stampedlock.html-tLTw7ulL.js","assets/java8-stream.html-edaNquTH.js","assets/java8-type-anno.html-Bgjx4opU.js","assets/java8-type.html-KxaAb6vI.js","assets/java8.html-QlnOmJIE.js","assets/java9-11.html-6LBgLVtW.js","assets/java9.html-9UvKqWeA.js","assets/java-jvm-agent-arthas.html-ya5sE-AV.js","assets/java-jvm-agent-usage.html-Za-L5P0R.js","assets/java-jvm-class-enhancer.html-g-8BRClv.js","assets/java-jvm-class.html-7GW-Pw58.js","assets/java-jvm-classload.html-cOO13IxT.js","assets/java-jvm-cms-gc.html--5sh2Tqw.js","assets/java-jvm-debug-idea.html-bEYJH-Eq.js","assets/java-jvm-debug-tools-linux.html-cfxrbU2T.js","assets/java-jvm-debug-tools-list.html-DDQLVLCe.js","assets/java-jvm-gc-g1.html-ClCKybL-.js","assets/java-jvm-gc-zgc.html-PsSvVBjH.js","assets/java-jvm-gc.html-hkYFcPEu.js","assets/java-jvm-jmm.html-e2IWt7CN.js","assets/java-jvm-oom-offheap.html-kLmhgPq8.js","assets/java-jvm-oom-tool.html-8KbYo8Qx.js","assets/java-jvm-oom.html-vTUJfl_4.js","assets/java-jvm-param.html-ls_xhCAI.js","assets/java-jvm-struct.html-GADlRemZ.js","assets/java-jvm-thread-dump.html-GdUPAiBo.js","assets/java-jvm-x-introduce.html-zg8yov33.js","assets/java-jvm-x-overview.html-Eh9PACBA.js","assets/awesome-java.html-y-tY_A9e.js","assets/better-java.html-vGdVQqbK.js","assets/01.html-R3m9Xkok.js","assets/java-thread-x-juc-AtomicInteger.html-NRT6o8BB.js","assets/java-thread-x-juc-collection-BlockingQueue.html-RUdRsz_w.js","assets/java-thread-x-juc-collection-ConcurrentHashMap.html-tb-XFfgy.js","assets/java-thread-x-juc-collection-ConcurrentLinkedQueue.html-cW1y2js4.js","assets/java-thread-x-juc-collection-CopyOnWriteArrayList.html-m382atXh.js","assets/java-thread-x-juc-executor-ForkJoinPool.html-6FMW_Jwk.js","assets/java-thread-x-juc-executor-FutureTask.html-MH2f7RGK.js","assets/java-thread-x-juc-executor-ScheduledThreadPoolExecutor.html-JS5WMjOo.js","assets/java-thread-x-juc-executor-ThreadPoolExecutor.html-RlXynxLc.js","assets/java-thread-x-juc-overview.html-7mXNaD4J.js","assets/java-thread-x-juc-tool-countdownlatch.html-yD5Psk5o.js","assets/java-thread-x-juc-tool-cyclicbarrier.html-AIBWTBZm.js","assets/java-thread-x-juc-tool-exchanger.html-ka-Poxh8.js","assets/java-thread-x-juc-tool-phaser.html-nDtT03IU.js","assets/java-thread-x-juc-tool-semaphore.html-FsJCU5r0.js","assets/java-thread-x-key-final.html-fQDo7Tib.js","assets/java-thread-x-key-synchronized.html-SEGq52Yg.js","assets/java-thread-x-key-volatile.html-_mYSGnfZ.js","assets/java-thread-x-lock-AbstractQueuedSynchronizer.html-0V-aToVn.js","assets/java-thread-x-lock-LockSupport.html-r2pfXncc.js","assets/java-thread-x-lock-ReentrantLock.html-RnwEI0NP.js","assets/java-thread-x-lock-ReentrantReadWriteLock.html-Jl7GdRXA.js","assets/java-thread-x-lock-all.html-0cGoff4e.js","assets/java-thread-x-overview.html-kppgTkRu.js","assets/java-thread-x-theorty.html-vQwD6RFz.js","assets/java-thread-x-thread-basic.html-0iSlNGH2.js","assets/java-thread-x-threadlocal.html-NHva8cE_.js","assets/01.html-U4g1r2O7.js","assets/overview.html-wfitwHqY.js","assets/01.html-jIlgzaFC.js","assets/alg-basic-array.html-a9W_RR22.js","assets/alg-basic-graph-aoe.html-mqZ-dZTa.js","assets/alg-basic-graph-bfs-dfs.html-y1qKxx_o.js","assets/alg-basic-graph-min-distance.html-T3rBK5HJ.js","assets/alg-basic-graph-min-tree.html-vkSsoWd8.js","assets/alg-basic-graph-topo-sort.html-2gWZr8lX.js","assets/alg-basic-graph.html-tYIKHhE1.js","assets/alg-basic-hashtable.html-5rut5vhi.js","assets/alg-basic-linklist.html-t0YO-TbX.js","assets/alg-basic-overview.html-o09E8Ww3.js","assets/alg-basic-stack_queue.html-SQ6H5WWp.js","assets/alg-basic-tree-balance.html-FGu3m185.js","assets/alg-basic-tree-hafman.html-pGXHFuyt.js","assets/alg-basic-tree-redblack.html-uDSrUDZE.js","assets/alg-basic-tree-search.html-9yP63kxn.js","assets/alg-basic-tree-trie.html-pXcx8Pus.js","assets/alg-basic-tree.html-N-HQLo1D.js","assets/alg-core-backtracking.html-Ajj5jxD0.js","assets/alg-core-devide-two.html-TNZIVuan.js","assets/alg-core-divide-and-conquer.html-agCA6HA6.js","assets/alg-core-dynamic.html--HzbCFFm.js","assets/alg-core-greedy.html-X2hCZICe.js","assets/alg-core-overview.html--W5lm_XA.js","assets/alg-core-search.html-jUc4Lf6V.js","assets/alg-domain-bigdata-bloom-filter.html-g6mHWX8o.js","assets/alg-domain-bigdata-bucket.html-heniS8ag.js","assets/alg-domain-bigdata-db-index.html-U8DqkFeS.js","assets/alg-domain-bigdata-devide-and-hash.html-aFWDA_jq.js","assets/alg-domain-bigdata-map-reduce.html-hGBbWR4L.js","assets/alg-domain-bigdata-outsort.html-0hOA9T_1.js","assets/alg-domain-bigdata-overview.html-hW0qzGNn.js","assets/alg-domain-char-match-bf.html-BM5XZOnU.js","assets/alg-domain-char-match-bm.html-APZ6KjJO.js","assets/alg-domain-char-match-kmp.html-hGSZp9yl.js","assets/alg-domain-char-match-st.html-w5m60I5z.js","assets/alg-domain-char-match.html-76BfVdzc.js","assets/alg-domain-distribute-overview.html-aj6BdG5z.js","assets/alg-domain-distribute-x-consistency-hash.html-tZ3JHbtd.js","assets/alg-domain-distribute-x-paxos.html-Bu7F8JEA.js","assets/alg-domain-distribute-x-raft.html-GVGkveOK.js","assets/alg-domain-distribute-x-zab.html-sH4hxCbc.js","assets/alg-domain-id-snowflake.html-enxhQHD_.js","assets/alg-domain-load-balance.html-UhphiYBV.js","assets/alg-domain-machine.html-JsPco2UY.js","assets/alg-domain-overview.html-m6vIInIX.js","assets/alg-domain-security-degist.html-WtDZyrve.js","assets/alg-domain-security-secure.html-vVZ6NCIH.js","assets/alg-domain-security-sm.html-XbXXb_5q.js","assets/alg-domain-suggest.html-YYKmWjXp.js","assets/alg-other-mind.html-sWsq7Uam.js","assets/alg-sort-overview.html-zazEHA__.js","assets/alg-sort-x-bubble.html-8SSG0rC9.js","assets/alg-sort-x-bucket.html-fl_eAFHG.js","assets/alg-sort-x-fast.html-UA6hlWEd.js","assets/alg-sort-x-heap.html-Jgi6pCj4.js","assets/alg-sort-x-insert.html-AOMI292_.js","assets/alg-sort-x-merge.html-YLLAlhK7.js","assets/alg-sort-x-radix.html-8SlkNE05.js","assets/alg-sort-x-select.html-rJvW1QR2.js","assets/alg-sort-x-shell.html-mzdggzAX.js","assets/code-style-alibaba.html-YN19KmJR.js","assets/code-style-google.html-5emy93Rv.js","assets/code-style-twitter.html-GN1FRiyz.js","assets/dev-x-overview.html-08D2SF2m.js","assets/dev-qt-code-style-1.html-d73PQwmW.js","assets/dev-qt-code-style-2.html-rHeX_vLB.js","assets/dev-qt-code-style.html-uzsOEvmy.js","assets/dev-qt-overview.html-HWKRzGV-.js","assets/dev-qt-sonarlint.html-ofqVrZR0.js","assets/dev-qt-spotbugs.html-5W7NnKgH.js","assets/dev-ut-springboot2.html-RIjqqKvd.js","assets/dev-ut-unit-test.html-1wX5Ev0P.js","assets/dev-ut-x-junit-idea.html-qVGWyVIC.js","assets/dev-ut-x-junit.html-Lc5QO3Ag.js","assets/dev-ut-x-junit5.html-QRte0Oas.js","assets/dev-ut-x-mockito.html-sXt9xT6m.js","assets/404.html-vNq1DkXx.js","assets/index.html-SSyDXsi_.js","assets/index.html-WCv-LAnb.js","assets/index.html-RFtjSV3g.js","assets/index.html-pkUx6trV.js","assets/index.html-LEaM6-Q3.js","assets/index.html-yCAw7PpE.js","assets/index.html-R448zsqN.js","assets/index.html-K_8PZGu5.js","assets/index.html-Vba3lDnw.js","assets/index.html-SIbn9uRQ.js","assets/index.html-X2fn3wlz.js","assets/index.html-IzlxxbKu.js","assets/index.html-K1dEtymV.js","assets/index.html-6IRrijug.js","assets/index.html-HVpQeczN.js","assets/index.html-LUn7PvnP.js","assets/index.html-WY461CgL.js","assets/index.html-PsV8rlvB.js","assets/index.html-g-oKa7DQ.js","assets/index.html-HolpTFnv.js","assets/index.html-OEbhfrsS.js","assets/index.html-f4YDHn8c.js","assets/index.html-UpfwNIMh.js","assets/index.html-2US7WoLl.js","assets/index.html-TqyjlKhW.js","assets/index.html-HHuDapPk.js","assets/index.html-ori9Wupd.js","assets/index.html-NfMIQAqy.js","assets/index.html-D7jR0_EC.js","assets/index.html-Kzcd6BVh.js","assets/index.html-Rai1__8h.js","assets/index.html-3f6fhn8j.js","assets/index.html-pUMpvhGO.js","assets/index.html-XVINPx-d.js","assets/index.html-cbqxiDed.js","assets/index.html-y6IHTHhP.js","assets/index.html-lzVvC_iF.js","assets/index.html-chQfP7WD.js","assets/index.html-OeX7Loc1.js","assets/index.html-JTCOa45_.js","assets/index.html-pKJQFNkg.js","assets/index.html-f6dxpypK.js","assets/index.html-iHD1JwsB.js","assets/index.html-bZ_4r5Mg.js","assets/index.html-4GBvRQYX.js","assets/index.html-sHAS9e0l.js","assets/index.html-joJ9yDMx.js","assets/index.html-6JQJc57K.js","assets/index.html-_hXKOg4f.js","assets/index.html-xt0Kt0Z-.js","assets/index.html-Tjq6cL_X.js","assets/index.html--jeEJiGM.js","assets/index.html-ZhCaM90r.js","assets/index.html-GGbb1Buj.js","assets/index.html-4S1dD8Zy.js","assets/index.html-oRLrvwSl.js","assets/index.html-FH4oLKU1.js","assets/index.html-xqljp3SV.js","assets/index.html-tzzR8sAM.js","assets/index.html-VpxdxFXn.js","assets/index.html-JMI6AzFe.js","assets/index.html-9BEvxZ19.js","assets/index.html-uxhD0WCd.js","assets/index.html-52fMRDiw.js","assets/index.html-Qm1IcQCc.js","assets/index.html-aX6SapTO.js","assets/index.html-33DJP_DL.js","assets/index.html-U7dAWp9v.js","assets/index.html-wjF-TG2o.js","assets/index.html-Yum0tQAR.js","assets/index.html-6xKsH41i.js","assets/index.html-6NgffCTC.js","assets/index.html-EVHcfxsQ.js","assets/index.html-dNOHOuuD.js","assets/index.html-0BiFCbxi.js","assets/index.html-MvPwNKaF.js","assets/index.html-ZklSa3Tj.js","assets/index.html-Kp0NaIuC.js","assets/index.html-Vs87Vb9Y.js","assets/index.html-_xv81-H6.js","assets/index.html-I1lAeSOY.js","assets/index.html-hZmI9eBb.js","assets/index.html-0GVPwS8q.js","assets/index.html-9PbBjUXo.js","assets/index.html-76YF36D2.js","assets/index.html-IXrTRVJV.js","assets/index.html-bI_5vT-1.js","assets/index.html-0xt2WcbM.js","assets/index.html-YNRe7twq.js","assets/index.html-uHbVATMd.js","assets/index.html-qZz_RZSv.js","assets/index.html-mLvSAlKa.js","assets/index.html-ChkEpTnp.js","assets/index.html-K6lErHtp.js","assets/index.html-RYSY_obK.js","assets/index.html-pP5YtHu9.js","assets/index.html-XVoTQwy3.js","assets/index.html-Th2GWegd.js","assets/index.html-0emvUjTI.js","assets/index.html-rgdGhEb6.js","assets/index.html-x9ZscbyY.js","assets/index.html-U_UqXHpW.js","assets/index.html-aSqcZkPu.js","assets/index.html-yKD8zzLL.js","assets/index.html-mrjqXM10.js","assets/index.html-jbSaBfgQ.js","assets/index.html-g6QHt3no.js","assets/index.html-XE92Kvqf.js","assets/index.html-Cs_8u7uM.js","assets/index.html-Au_q2U3v.js","assets/index.html-ebT7amBR.js","assets/index.html-qu8aCEvm.js","assets/index.html-Qa6HM1HW.js","assets/index.html-Bve9KdC7.js","assets/index.html-HbdOIyhK.js","assets/index.html-VhgrMVlV.js","assets/index.html-KNujEZak.js","assets/index.html-Ne8x3D_C.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}