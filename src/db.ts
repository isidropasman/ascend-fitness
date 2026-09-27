import type{AppData}from'./types';
const DB='ascend-db',STORE='state',KEY='app',DB_VERSION=2;
function openDB():Promise<IDBDatabase>{return new Promise((resolve,reject)=>{const r=indexedDB.open(DB,DB_VERSION);r.onupgradeneeded=()=>{if(!r.result.objectStoreNames.contains(STORE))r.result.createObjectStore(STORE)};r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error)})}
function tx<T>(mode:IDBTransactionMode,fn:(s:IDBObjectStore)=>IDBRequest<T>):Promise<T>{return openDB().then(db=>new Promise((resolve,reject)=>{const t=db.transaction(STORE,mode),r=fn(t.objectStore(STORE));r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);t.oncomplete=()=>db.close()}))}
export async function readState():Promise<AppData|null>{try{return await tx('readonly',s=>s.get(KEY))||null}catch{return null}}
export async function writeState(data:AppData){try{await tx('readwrite',s=>s.put(data,KEY))}catch{}}
export type BackupEnvelope={format:'ascend-backup';schemaVersion:number;exportedAt:string;data:AppData};
export function makeBackup(data:AppData):BackupEnvelope{return{format:'ascend-backup',schemaVersion:DB_VERSION,exportedAt:new Date().toISOString(),data}}
export function parseBackup(raw:string):AppData{const x=JSON.parse(raw);if(x?.format==='ascend-backup'&&x?.data)return x.data;if(x?.sessions&&x?.settings)return x;throw new Error('invalid_backup')}
