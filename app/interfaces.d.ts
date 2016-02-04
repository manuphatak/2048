///<reference path='../node_modules/immutable/dist/immutable.d.ts'/>

declare module Redux {
    function createStore(reducer:Reducer, initialState?:any, enhancer?:any):Store;
}
interface  Window {
    devToolsExtension?: any
}
declare const require:{
    <T>(path:string): T;
    (paths:string[], callback:(...modules:any[]) => void): void;
    ensure:(paths:string[], callback:(require:<T>(path:string) => T) => void) => void;
};