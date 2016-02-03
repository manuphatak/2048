import * as React from 'react';
import {createDevTools} from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';


const logMonitor = <LogMonitor theme='tomorrow'/>;

export default createDevTools(
    <DockMonitor
        toggleVisibilityKey='ctrl-h'
        changePositionKey='ctrl-q'>
        {logMonitor}
    </DockMonitor>
);