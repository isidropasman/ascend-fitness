import type{AppData}from'./types';
const DB='ascend-db',STORE='state',KEY='app';
function openDB():Promise<IDBDatabase>{return new Promise((resolve,reject)=>{const r=indexedDB.open(DB,1);r.onupgradeneeded=()=>{if(!r.result.objectStoreNames.contains(STORE))r.result.createObjectStore(STORE)};r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error)})}
export async function readState():Promise<AppData|null>{try{const db=await openDB();return await new Promise((resolve,reject)=>{const t=db.transaction(STORE,'readonly').objectStore(STORE).get(KEY);t.onsuccess=()=>resolve(t.result||null);t.onerror=()=>reject(t.error)})}catch{return null}}
export async function writeState(data:AppData){try{const db=await openDB();await new Promise<void>((resolve,reject)=>{const t=db.transaction(STORE,'readwrite');t.objectStore(STORE).put(data,KEY);t.oncomplete=()=>resolve();t.onerror=()=>reject(t.error)})}catch{}}
