!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.FFmpegWASM=t():e.FFmpegWASM=t()}(self,(()=>(()=>{"use strict";var e={m:{},d:(t,r)=>{for(var s in r)e.o(r,s)&&!e.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:r[s]})},u:e=>e+".ffmpeg.js"};e.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),e.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),e.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var t;e.g.importScripts&&(t=e.g.location+"");var r=e.g.document;if(!t&&r&&(r.currentScript&&(t=r.currentScript.src),!t)){var s=r.getElementsByTagName("script");if(s.length)for(var a=s.length-1;a>-1&&!t;)t=s[a--].src}if(!t)throw new Error("Automatic publicPath is not supported in this browser");t=t.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),e.p=t})(),e.b=document.baseURI||self.location.href;var t,r={};e.r(r),e.d(r,{FFmpeg:()=>i}),function(e){e.LOAD="LOAD",e.EXEC="EXEC",e.WRITE_FILE="WRITE_FILE",e.READ_FILE="READ_FILE",e.DELETE_FILE="DELETE_FILE",e.RENAME="RENAME",e.CREATE_DIR="CREATE_DIR",e.LIST_DIR="LIST_DIR",e.DELETE_DIR="DELETE_DIR",e.ERROR="ERROR",e.DOWNLOAD="DOWNLOAD",e.PROGRESS="PROGRESS",e.LOG="LOG"}(t||(t={}));const s=(()=>{let e=0;return()=>e++})(),a=(new Error("unknown message type"),new Error("ffmpeg is not loaded, call `await ffmpeg.load()` first")),o=new Error("called FFmpeg.terminate()");new Error("failed to import ffmpeg-core.js");class i{#e=null;#t={};#r={};#s=[];#a=[];loaded=!1;#o=()=>{this.#e&&(this.#e.onmessage=({data:{id:e,type:r,data:s}})=>{switch(r){case t.LOAD:this.loaded=!0,this.#t[e](s);break;case t.EXEC:case t.WRITE_FILE:case t.READ_FILE:case t.DELETE_FILE:case t.RENAME:case t.CREATE_DIR:case t.LIST_DIR:case t.DELETE_DIR:this.#t[e](s);break;case t.LOG:this.#s.forEach((e=>e(s)));break;case t.PROGRESS:this.#a.forEach((e=>e(s)));break;case t.ERROR:this.#r[e](s)}delete this.#t[e],delete this.#r[e]})};#i=({type:e,data:t},r=[])=>this.#e?new Promise(((a,o)=>{const i=s();this.#e&&this.#e.postMessage({id:i,type:e,data:t},r),this.#t[i]=a,this.#r[i]=o})):Promise.reject(a);on(e,t){"log"===e?this.#s.push(t):"progress"===e&&this.#a.push(t)}off(e,t){"log"===e?this.#s=this.#s.filter((e=>e!==t)):"progress"===e&&(this.#a=this.#a.filter((e=>e!==t)))}load=(r={})=>(this.#e||(this.#e=new Worker(new URL(e.p+e.u(814),e.b),{type:void 0}),this.#o()),this.#i({type:t.LOAD,data:r}));exec=(e,r=-1)=>this.#i({type:t.EXEC,data:{args:e,timeout:r}});terminate=()=>{const e=Object.keys(this.#r);for(const t of e)this.#r[t](o),delete this.#r[t],delete this.#t[t];this.#e&&(this.#e.terminate(),this.#e=null,this.loaded=!1)};writeFile=(e,r)=>{const s=[];return r instanceof Uint8Array&&s.push(r.buffer),this.#i({type:t.WRITE_FILE,data:{path:e,data:r}},s)};readFile=(e,r="binary")=>this.#i({type:t.READ_FILE,data:{path:e,encoding:r}});deleteFile=e=>this.#i({type:t.DELETE_FILE,data:{path:e}});rename=(e,r)=>this.#i({type:t.RENAME,data:{oldPath:e,newPath:r}});createDir=e=>this.#i({type:t.CREATE_DIR,data:{path:e}});listDir=e=>this.#i({type:t.LIST_DIR,data:{path:e}});deleteDir=e=>this.#i({type:t.DELETE_DIR,data:{path:e}})}return r})()));
//# sourceMappingURL=ffmpeg.js.map