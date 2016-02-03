import * as React from 'react';
import {Provider} from 'react-redux';


export default class AppRootProduction extends React.Component<any, any> {
    public render() {
        const {store} = this.props;
        return (
            <Provider store={store}>
                <App />
            </Provider>
        );
    }
}