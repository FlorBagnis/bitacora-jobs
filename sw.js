/* Bitácora Jobs - service worker: muestra avisos push (el texto llega cifrado y se abre solo en este dispositivo) */
function idb(){return new Promise(function(ok,no){var q=indexedDB.open("postulaciones-sw",1);q.onupgradeneeded=function(){q.result.createObjectStore("kv")};q.onsuccess=function(){ok(q.result)};q.onerror=function(){no(q.error)}})}
async function getKey(){var d=await idb();return new Promise(function(ok){var q=d.transaction("kv").objectStore("kv").get("k");q.onsuccess=function(){ok(q.result||"")};q.onerror=function(){ok("")}})}
function s2b(s){var b=atob(s),u=new Uint8Array(b.length);for(var i=0;i<b.length;i++)u[i]=b.charCodeAt(i);return u}
function s2k(s){s=s.replace(/-/g,"+").replace(/_/g,"/");while(s.length%4)s+="=";return s2b(s)}
async function dec(p,k){var key=await crypto.subtle.importKey("raw",s2k(k),"AES-GCM",false,["decrypt"]);var pt=await crypto.subtle.decrypt({name:"AES-GCM",iv:s2b(p.iv)},key,s2b(p.ct));return JSON.parse(new TextDecoder().decode(pt))}
self.addEventListener("install",function(){self.skipWaiting()});
self.addEventListener("activate",function(e){e.waitUntil(self.clients.claim())});
self.addEventListener("push",function(e){e.waitUntil((async function(){
 var t="Bitácora Jobs",b="Tenés un aviso. Abrí la app para verlo.";
 try{var d=e.data?e.data.json():{};var k=await getKey();if(d.blob&&k){var o=await dec(d.blob,k);t=o.t||t;b=o.b||b}}catch(_){}
 await self.registration.showNotification(t,{body:b,icon:"icon-192.png",badge:"icon-192.png"})})())});
self.addEventListener("notificationclick",function(e){e.notification.close();
 e.waitUntil(self.clients.matchAll({type:"window",includeUncontrolled:true}).then(function(L){for(var i=0;i<L.length;i++){if("focus" in L[i])return L[i].focus()}return self.clients.openWindow("./")}))});
