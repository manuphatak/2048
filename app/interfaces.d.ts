///<reference path='../node_modules/immutable/dist/immutable.d.ts'/>
declare module Redux {
    function createStore(reducer: Reducer, initialState?: any, enhancer?: any): Store;
}
interface  Window {
    devToolsExtension?: any;
}

interface NodeModule {
    hot?: any;
}
