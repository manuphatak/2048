import * as React from 'react';
import {Provider} from 'react-redux';
import App from './App';
import DevTools from './DevTools';

export default class AppRoot extends React.Component<any, any> {
    public render() {
        const {store} = this.props;
        return (
            <Provider store={store}>
                <div>
                    <App />

                    <DevTools />
                </div>

            </Provider>
        );
    }
}