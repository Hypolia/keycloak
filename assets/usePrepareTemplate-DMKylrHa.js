import{D as y,r as p}from"./index-BsrAdSp_.js";import{c as E}from"./useGetClassName-BRJ2lEef.js";HTMLElement.prototype.prepend||(HTMLElement.prototype.prepend=function(e){if(typeof e=="string")throw new Error("Error with HTMLElement.prototype.appendFirst polyfill");this.insertBefore(e,this.firstChild)});function d(e){const t=document.createElement((()=>{switch(e.type){case"css":return"link";case"javascript":return"script"}})()),s=new y;return t.addEventListener("load",()=>s.resolve()),Object.assign(t,(()=>{switch(e.type){case"css":return{href:e.href,type:"text/css",rel:"stylesheet",media:"screen,print"};case"javascript":return{src:e.src,type:"text/javascript"}}})()),document.getElementsByTagName("head")[0][(()=>{switch(e.type){case"javascript":return"appendChild";case"css":return(()=>{switch(e.position){case"append":return"appendChild";case"prepend":return"prepend"}})()}})()](t),{prLoaded:s.pr,remove:()=>t.remove()}}function w(e){const{doFetchDefaultThemeResources:t,styles:s=[],scripts:n=[],htmlClassName:a,bodyClassName:u}=e,[m,f]=p.useReducer(()=>!0,!t);return p.useEffect(()=>{if(!t)return;let i=!1;const c=[];return(async()=>{for(const r of[...s].reverse()){const{prLoaded:o,remove:h}=d({type:"css",position:"prepend",href:r});if(c.push(h),await o,i)return}f()})(),n.forEach(r=>{const{remove:o}=d({type:"javascript",src:r});c.push(o)}),()=>{i=!0,c.forEach(r=>r())}},[]),l({target:"html",className:a}),l({target:"body",className:u}),{isReady:m}}function l(e){const{target:t,className:s}=e;p.useEffect(()=>{if(s===void 0)return;const n=document.getElementsByTagName(t)[0].classList,a=E(s).split(" ");return n.add(...a),()=>{n.remove(...a)}},[s])}export{w as u};
