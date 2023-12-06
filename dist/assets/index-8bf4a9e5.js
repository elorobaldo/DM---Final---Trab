(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function o(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(n){if(n.ep)return;n.ep=!0;const r=o(n);fetch(n.href,r)}})();"serviceWorker"in navigator&&window.addEventListener("load",async()=>{try{let e;e=await navigator.serviceWorker.register("/sw.js",{type:"module"}),console.log("Service worker registrada! 😎",e)}catch(e){console.log("😥 Service worker registro falhou: ",e)}});const D=(e,t)=>t.some(o=>e instanceof o);let E,w;function L(){return E||(E=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function M(){return w||(w=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const I=new WeakMap,y=new WeakMap,B=new WeakMap,f=new WeakMap,b=new WeakMap;function x(e){const t=new Promise((o,i)=>{const n=()=>{e.removeEventListener("success",r),e.removeEventListener("error",a)},r=()=>{o(c(e.result)),n()},a=()=>{i(e.error),n()};e.addEventListener("success",r),e.addEventListener("error",a)});return t.then(o=>{o instanceof IDBCursor&&I.set(o,e)}).catch(()=>{}),b.set(t,e),t}function P(e){if(y.has(e))return;const t=new Promise((o,i)=>{const n=()=>{e.removeEventListener("complete",r),e.removeEventListener("error",a),e.removeEventListener("abort",a)},r=()=>{o(),n()},a=()=>{i(e.error||new DOMException("AbortError","AbortError")),n()};e.addEventListener("complete",r),e.addEventListener("error",a),e.addEventListener("abort",a)});y.set(e,t)}let h={get(e,t,o){if(e instanceof IDBTransaction){if(t==="done")return y.get(e);if(t==="objectStoreNames")return e.objectStoreNames||B.get(e);if(t==="store")return o.objectStoreNames[1]?void 0:o.objectStore(o.objectStoreNames[0])}return c(e[t])},set(e,t,o){return e[t]=o,!0},has(e,t){return e instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in e}};function C(e){h=e(h)}function S(e){return e===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...o){const i=e.call(p(this),t,...o);return B.set(i,t.sort?t.sort():[t]),c(i)}:M().includes(e)?function(...t){return e.apply(p(this),t),c(I.get(this))}:function(...t){return c(e.apply(p(this),t))}}function O(e){return typeof e=="function"?S(e):(e instanceof IDBTransaction&&P(e),D(e,L())?new Proxy(e,h):e)}function c(e){if(e instanceof IDBRequest)return x(e);if(f.has(e))return f.get(e);const t=O(e);return t!==e&&(f.set(e,t),b.set(t,e)),t}const p=e=>b.get(e);function j(e,t,{blocked:o,upgrade:i,blocking:n,terminated:r}={}){const a=indexedDB.open(e,t),d=c(a);return i&&a.addEventListener("upgradeneeded",s=>{i(c(a.result),s.oldVersion,s.newVersion,c(a.transaction),s)}),o&&a.addEventListener("blocked",s=>o(s.oldVersion,s.newVersion,s)),d.then(s=>{r&&s.addEventListener("close",()=>r()),n&&s.addEventListener("versionchange",l=>n(l.oldVersion,l.newVersion,l))}).catch(()=>{}),d}const k=["get","getKey","getAll","getAllKeys","count"],A=["put","add","delete","clear"],g=new Map;function v(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&typeof t=="string"))return;if(g.get(t))return g.get(t);const o=t.replace(/FromIndex$/,""),i=t!==o,n=A.includes(o);if(!(o in(i?IDBIndex:IDBObjectStore).prototype)||!(n||k.includes(o)))return;const r=async function(a,...d){const s=this.transaction(a,n?"readwrite":"readonly");let l=s.store;return i&&(l=l.index(d.shift())),(await Promise.all([l[o](...d),n&&s.done]))[0]};return g.set(t,r),r}C(e=>({...e,get:(t,o,i)=>v(t,o)||e.get(t,o,i),has:(t,o)=>!!v(t,o)||e.has(t,o)}));let m;window.addEventListener("DOMContentLoaded",async e=>{V(),document.getElementById("btnCadastro").addEventListener("click",T),document.getElementById("btnCarregar").addEventListener("click",$),document.getElementById("btnDeletar").addEventListener("click",deletar)});async function T(){let e=document.getElementById("latitude").value,t=document.getElementById("longitude").value,o=document.getElementById("descricao").value,i=document.getElementById("horario").value,n=document.getElementById("avaliacao").value,r=document.getElementById("endereco").value;const a=await m.transaction("localizacao","readwrite"),d=a.objectStore("localizacao");try{await d.add({endereco:r,latitude:e,horario:i,descricao:o,avaliacao:n,longitude:t}),await a.done,z(),alert("Anotação cadastrada com sucesso!"),console.log("Registro adicionado com sucesso!")}catch(s){console.error("Erro ao Cadastrar registro:",s),a.abort()}}async function V(){try{m=await j("banco",1,{upgrade(e,t,o,i){switch(t){case 0:case 1:e.createObjectStore("localizacao",{keyPath:"descricao"}).createIndex("id","id"),u("banco de dados criado!")}}}),u("banco de dados aberto!")}catch(e){u("Erro ao criar/abrir banco: "+e.message)}}async function $(){m==null&&console.log("O banco de dados está fechado.");const o=await(await(await m.transaction("localizacao","readonly")).objectStore("localizacao")).getAll();if(o){const i=o.map(n=>`<div class="listando">
                   
                    <p>Nome Açaiteria: ${n.descricao}</p>
                    <p>Horario Funcionamento: ${n.horario} </p>
                    <p>Avaliação do Local: ${n.avaliacao}</p>
                    <p>Endereço: ${n.endereco}</p>
                    <p>Localização</p>
                    <iframe id="mapa" src="http://maps.google.com/maps?q=${n.latitude},${n.longitude}&z=16&output=embed" frameborder="0" scrolling="no" style="width: 300px; height: 300px;"></iframe>
                            <style>.mapouter{position:relative;height:300px;width:300px;background:#fff;} .maprouter a{color:#fff !important;position:absolute !important;top:0 !important;z-index:0 !important;}</style>
                            <style>.gmap_canvas{overflow:hidden;height:300px;width:300px}.gmap_canvas iframe{position:relative;z-index:2}</style>
                    

                   </div>`);u(i.join(" "))}}function z(){document.getElementById("latitude").value="",document.getElementById("longitude").value="",document.getElementById("horario").value="",document.getElementById("descricao").value="",document.getElementById("avaliacao").value="",document.getElementById("endereco").value=""}const N=document.getElementById("localizacao"),W=()=>{const e=document.getElementById("mapa");let t,o;t=latitude,o=longitude,e.src=`http://maps.google.com/maps?q=${t},${o}&z=16&output=embed`},F=e=>{let t;switch(e.code){case 0:t="Erro desconhecido";break;case 1:t="Permissão negada!";break;case 2:t="Captura de posição indisponível!";break;case 3:t="Tempo de solicitação excedido!";break}console.log("Ocorreu um erro: "+t)};N.addEventListener("click",()=>{navigator.geolocation.watchPosition(W,F)});function u(e){document.getElementById("informacao").innerHTML=e}
